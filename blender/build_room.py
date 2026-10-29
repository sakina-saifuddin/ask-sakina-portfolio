"""Rainy-night desk scene, rendered in Cycles as separate light passes.

Run:  blender -b -P blender/build_room.py            (full quality)
      PREVIEW=1 blender -b -P blender/build_room.py  (fast, half-res, for tuning)
      ONLY=base|lamp|moon|city  limits which passes render.

Outputs in public/room/:
  base.webp   room lit only by ambient + TV glow (alpha = window hole)
  lamp.jpg    light contributed by the desk lamp only
  moon.jpg    light contributed by the moon through the window only
  far.webp / near.webp   the city, split into depth layers for parallax
  hotspots.json          2D positions (0-1 of the image) for the interactive bits
The website blends base + lamp + moon in a WebGL shader, in linear light.
Everything is built from primitives and procedural textures: no external assets.
"""
import bpy, json, math, os, random
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

PREVIEW = bool(os.environ.get("PREVIEW"))
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "room")
if PREVIEW:
    OUT = os.path.join(OUT, "_preview")
os.makedirs(OUT, exist_ok=True)
W, H = (960, 540) if PREVIEW else (1600, 900)
S_BASE, S_LIGHT, S_CITY = (24, 24, 8) if PREVIEW else (256, 128, 24)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.render.resolution_x, scene.render.resolution_y = W, H
scene.render.resolution_percentage = 100
cy = scene.cycles
cy.use_denoising = True
cy.denoiser = "OPENIMAGEDENOISE"
cy.use_adaptive_sampling = True
cy.adaptive_threshold = 0.04
cy.max_bounces = 6
cy.volume_bounces = 1
cy.volume_step_rate = 1.5
cy.device = "CPU"
try:  # use a GPU when there is one
    prefs = bpy.context.preferences.addons["cycles"].preferences
    for kind in ("OPTIX", "CUDA", "HIP", "ONEAPI"):
        try:
            prefs.compute_device_type = kind
            prefs.refresh_devices() if hasattr(prefs, "refresh_devices") else prefs.get_devices()
            gpus = [d for d in prefs.devices if d.type != "CPU"]
            if gpus:
                for d in prefs.devices:
                    d.use = d.type != "CPU"
                cy.device = "GPU"
                print("USING GPU", kind, [d.name for d in gpus])
                break
        except Exception:
            continue
except Exception as e:
    print("gpu setup skipped", e)

scene.view_settings.view_transform = "Standard"  # the shader does the final blend + tone
scene.view_settings.look = "None"
scene.render.film_transparent = True


# ---- helpers -----------------------------------------------------------------
def principled(m):
    return m.node_tree.nodes["Principled BSDF"]


def mat(name, color, rough=0.5, metal=0.0, emit=None, emit_strength=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = principled(m)
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*emit, 1)
        b.inputs["Emission Strength"].default_value = emit_strength
    return m


def textured(name, c1, c2, scale, bump_scale, bump_str, rough, stretch=(1, 1, 1), tint_scale=None):
    """Colour variation + fine bump from noise: plaster, carpet, wood, terracotta."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    b = principled(m)
    b.inputs["Roughness"].default_value = rough
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = nt.nodes.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = stretch
    nt.links.new(tc.outputs["Object"], mp.inputs["Vector"])
    n1 = nt.nodes.new("ShaderNodeTexNoise")
    n1.inputs["Scale"].default_value = tint_scale or scale
    n1.inputs["Detail"].default_value = 6
    nt.links.new(mp.outputs["Vector"], n1.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (*c1, 1)
    ramp.color_ramp.elements[1].color = (*c2, 1)
    nt.links.new(n1.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], b.inputs["Base Color"])
    n2 = nt.nodes.new("ShaderNodeTexNoise")
    n2.inputs["Scale"].default_value = bump_scale
    n2.inputs["Detail"].default_value = 10
    nt.links.new(mp.outputs["Vector"], n2.inputs["Vector"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = bump_str
    bump.inputs["Distance"].default_value = 0.02
    nt.links.new(n2.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], b.inputs["Normal"])
    return m


def box(name, loc, size, m, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = (size[0] / 2, size[1] / 2, size[2] / 2)
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        bv = o.modifiers.new("bevel", "BEVEL")
        bv.width = bevel
        bv.segments = 3
    o.data.materials.append(m)
    return o


def cyl(name, loc, r, d, m, rot=(0, 0, 0), verts=32):
    bpy.ops.mesh.primitive_cylinder_add(location=loc, radius=r, depth=d, vertices=verts, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    o.data.materials.append(m)
    return o


def cable(name, pts, m, r=0.028):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = r
    cu.bevel_resolution = 3
    sp = cu.splines.new("BEZIER")
    sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p
        bp.handle_left_type = bp.handle_right_type = "AUTO"
    o = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(o)
    cu.materials.append(m)
    return o


def aim(obj, target):
    d = Vector(target) - obj.location
    obj.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


# ---- materials ---------------------------------------------------------------
wall = textured("wall", (0.045, 0.06, 0.08), (0.085, 0.10, 0.125), 1.6, 220, 0.35, 0.92)
carpet = textured("carpet", (0.035, 0.04, 0.06), (0.06, 0.07, 0.095), 3, 900, 0.9, 1.0)
rug = textured("rug", (0.20, 0.05, 0.04), (0.33, 0.10, 0.07), 14, 700, 0.8, 1.0)
wood = textured("wood", (0.13, 0.065, 0.032), (0.24, 0.125, 0.06), 5, 45, 0.5, 0.42, stretch=(0.15, 3.0, 3.0), tint_scale=3)
frame_m = textured("frame", (0.02, 0.028, 0.035), (0.045, 0.055, 0.065), 9, 80, 0.3, 0.5)
plastic = textured("tvplastic", (0.07, 0.07, 0.075), (0.12, 0.12, 0.13), 40, 400, 0.15, 0.4)
dark = mat("dark", (0.01, 0.01, 0.012), 0.4)
black = mat("black", (0.004, 0.004, 0.005), 0.3)
cable_m = mat("cable", (0.01, 0.01, 0.012), 0.35)
cream = mat("cream", (0.86, 0.81, 0.69), 0.75)
ink = mat("ink", (0.04, 0.035, 0.03), 0.8)
screen_m = mat("screen", (0.02, 0.05, 0.04), 0.1, emit=(0.35, 0.9, 0.6), emit_strength=0.1)
led = mat("led", (0, 0, 0), 0.3, emit=(0.2, 1, 0.3), emit_strength=6)
lamp_shell = mat("lampshell", (0.05, 0.07, 0.06), 0.35, metal=0.7)
lamp_glow = mat("lampglow", (1, 0.8, 0.5), 0.2, emit=(1, 0.7, 0.35), emit_strength=22)
leaf_a = textured("leafa", (0.03, 0.16, 0.06), (0.07, 0.3, 0.1), 6, 60, 0.25, 0.5)
leaf_b = textured("leafb", (0.02, 0.12, 0.05), (0.05, 0.22, 0.08), 5, 60, 0.25, 0.55)
pot = textured("pot", (0.30, 0.12, 0.07), (0.52, 0.24, 0.14), 7, 150, 0.7, 0.8)
soil = mat("soil", (0.02, 0.012, 0.008), 1.0)
sky_m = bpy.data.materials.new("sky")
sky_m.use_nodes = True
nt = sky_m.node_tree
nt.nodes.clear()
tc = nt.nodes.new("ShaderNodeTexCoord")
sep = nt.nodes.new("ShaderNodeSeparateXYZ")
ramp = nt.nodes.new("ShaderNodeValToRGB")
em = nt.nodes.new("ShaderNodeEmission")
outn = nt.nodes.new("ShaderNodeOutputMaterial")
nt.links.new(tc.outputs["Generated"], sep.inputs["Vector"])
nt.links.new(sep.outputs["Z"], ramp.inputs["Fac"])
ramp.color_ramp.elements[0].position = 0.0
ramp.color_ramp.elements[0].color = (0.30, 0.16, 0.14, 1)   # warm horizon haze
ramp.color_ramp.elements[1].position = 1.0
ramp.color_ramp.elements[1].color = (0.015, 0.03, 0.09, 1)  # deep night
nt.links.new(ramp.outputs["Color"], em.inputs["Color"])
em.inputs["Strength"].default_value = 1.2
nt.links.new(em.outputs["Emission"], outn.inputs["Surface"])

# ---- room --------------------------------------------------------------------
box("wallL", (-8.3, 2.2, 3.0), (9.4, 0.2, 12), wall)
box("wallR", (8.3, 2.2, 3.0), (9.4, 0.2, 12), wall)
box("wallT", (0, 2.2, 5.9), (7.2, 0.2, 4.1), wall)
box("wallB", (0, 2.2, 0.45), (7.2, 0.2, 0.9), wall)
box("floor", (0, 0, -0.05), (30, 12, 0.1), carpet)
box("ceiling", (0, -1, 6.4), (30, 12, 0.2), wall)
box("rug", (0.3, -3.4, 0.012), (9.5, 3.8, 0.024), rug)
box("rugborder", (0.3, -3.4, 0.03), (9.0, 3.3, 0.02), mat("rb", (0.07, 0.02, 0.02), 1.0))
box("skirt", (0, 2.08, 0.15), (30, 0.06, 0.3), frame_m)

city = {"far": [], "near": [], "sky": []}
sky = box("sky", (0, 4.6, 2.3), (13, 0.05, 6.2), sky_m)
city["sky"].append(sky)
random.seed(7)
farm = mat("farbld", (0.02, 0.025, 0.05), 0.9)
nearm = mat("nearbld", (0.008, 0.012, 0.028), 0.9)
x = -6.0
while x < 6.0:  # distant skyline, softer
    w, h = random.uniform(0.35, 0.8), random.uniform(1.0, 3.2)
    city["far"].append(box("fbld", (x + w / 2, 4.2, 0.4 + h / 2), (w, 0.2, h), farm))
    for _ in range(int(h * w * 10)):
        city["far"].append(box("fw", (x + random.uniform(0.05, w - 0.05), 4.08, 0.45 + random.uniform(0.05, h - 0.05)),
                               (0.04, 0.01, 0.05), mat("w", (0, 0, 0), 1, emit=(1, 0.75, 0.45), emit_strength=random.uniform(1.5, 5))))
    x += w + 0.05
x = -4.4
while x < 4.4:  # near towers, crisp with more lit windows
    w, h = random.uniform(0.3, 0.7), random.uniform(0.8, 2.5)
    city["near"].append(box("bld", (x + w / 2, 2.85, 0.75 + h / 2), (w, 0.2, h), nearm))
    for _ in range(int(h * w * 18)):
        city["near"].append(box("win", (x + random.uniform(0.04, w - 0.04), 2.73, 0.78 + random.uniform(0.05, h - 0.05)),
                                (0.035, 0.01, 0.05), mat("w", (0, 0, 0), 1, emit=(1, 0.8, 0.45), emit_strength=random.uniform(2, 8))))
    x += w + 0.14
# a red aircraft light on a near tower
city["near"].append(cyl("beacon", (1.9, 2.7, 3.35), 0.03, 0.03, mat("beacon", (0, 0, 0), 0.3, emit=(1, 0.1, 0.1), emit_strength=25), rot=(math.pi / 2, 0, 0)))
for lst in city.values():
    for o in lst:
        o.visible_shadow = False  # let the moon through

for name, loc, size in [
    ("fT", (0, 2.08, 3.95), (7.6, 0.3, 0.2)), ("fB", (0, 2.08, 0.8), (7.6, 0.3, 0.2)),
    ("fL", (-3.7, 2.08, 2.4), (0.2, 0.3, 3.35)), ("fR", (3.7, 2.08, 2.4), (0.2, 0.3, 3.35)),
    ("mid1", (-1.25, 2.08, 2.4), (0.12, 0.25, 3.3)), ("mid2", (1.25, 2.08, 2.4), (0.12, 0.25, 3.3)),
    ("mid3", (0, 2.08, 2.5), (7.4, 0.25, 0.1)),
]:
    box(name, loc, size, frame_m, bevel=0.01)
box("sill", (0, 1.8, 0.88), (7.8, 0.5, 0.06), frame_m)

# desk
box("desk", (0, -0.2, 0.6), (14, 2.6, 0.12), wood, bevel=0.012)
box("deskfront", (0, -1.45, 0.05), (14, 0.1, 1.1), wood)
box("deskback", (0, 1.05, 0.05), (14, 0.06, 1.1), dark)

# framed print on the right wall + wall outlets
box("printframe", (6.3, 2.08, 3.0), (1.4, 0.05, 1.9), frame_m, bevel=0.02)
box("print", (6.3, 2.045, 3.0), (1.2, 0.02, 1.7), mat("prt", (0.45, 0.2, 0.15), 0.8))
box("print2", (6.3, 2.035, 2.7), (1.2, 0.02, 0.7), mat("prt2", (0.08, 0.1, 0.16), 0.8))
for ox, oz in ((-5.0, 1.15), (5.0, 1.15)):
    box("outlet", (ox, 2.07, oz), (0.2, 0.03, 0.3), cream, bevel=0.01)

# ---- TV ----------------------------------------------------------------------
TV_Y = -0.25
box("tv", (0, TV_Y, 1.55), (2.9, 1.9, 1.8), plastic, bevel=0.06)
box("tvbezel", (-0.2, TV_Y - 0.97, 1.6), (2.05, 0.05, 1.55), black, bevel=0.03)
box("screen", (-0.2, TV_Y - 1.0, 1.6), (1.9, 0.02, 1.43), screen_m)
SCREEN_CORNERS = [(-0.2 + sx * 0.95, TV_Y - 1.01, 1.6 + sz * 0.715) for sz in (1, -1) for sx in (-1, 1)]
btn_mat = mat("btn", (0.18, 0.18, 0.2), 0.3)
button_pos = []
for i in range(5):
    p = (1.12, TV_Y - 0.97, 2.2 - i * 0.28)
    cyl(f"tvbtn{i + 1}", p, 0.085, 0.05, btn_mat, rot=(math.pi / 2, 0, 0))
    button_pos.append(p)
for i in range(8):
    box("grille", (1.12, TV_Y - 0.97, 1.05 - i * 0.07), (0.45, 0.02, 0.02), dark)
cyl("led", (1.12, TV_Y - 0.97, 0.45), 0.03, 0.03, led, rot=(math.pi / 2, 0, 0))
box("tvfoot1", (-1.0, TV_Y, 0.66), (0.4, 1.4, 0.06), black)
box("tvfoot2", (1.0, TV_Y, 0.66), (0.4, 1.4, 0.06), black)

# ---- VCR ---------------------------------------------------------------------
box("vcr", (-3.1, -0.3, 0.88), (2.3, 1.4, 0.4), plastic, bevel=0.03)
box("vcrslot", (-3.35, -1.0, 0.9), (1.2, 0.03, 0.14), black)
box("vcrdisp", (-2.45, -1.0, 0.9), (0.45, 0.03, 0.12), mat("disp", (0, 0, 0), 0.2, emit=(0.3, 1, 0.5), emit_strength=3))
eject = box("eject", (-2.95, -1.01, 0.8), (0.14, 0.03, 0.07), mat("ej", (0.2, 0.2, 0.22), 0.4))
for i in range(4):
    box("vcrbtn", (-2.45 + i * 0.12, -1.01, 0.78), (0.07, 0.02, 0.05), mat("vb", (0.15, 0.15, 0.17), 0.4))
slot_pos = (-3.35, -1.02, 0.9)

# ---- tape stack with spine titles ---------------------------------------------
tape_pos = []
colors = [(0.88, 0.7, 0.29), (0.85, 0.38, 0.3), (0.3, 0.56, 0.85), (0.35, 0.72, 0.52), (0.69, 0.45, 0.84)]
titles = ["ABOUT ME", "WORK 2021-NOW", "PROJECTS", "TOOLS & STACK", "SAY HELLO"]
offsets = [0.0, 0.1, -0.07, 0.05, -0.03]
for i in range(5):
    z = 0.71 + (4 - i) * 0.215
    cx = 3.15 + offsets[i]
    box(f"tape{i + 1}", (cx, -0.4, z), (2.05, 1.06, 0.2), black, bevel=0.012)
    box(f"label{i + 1}", (cx, -0.4 - 0.535, z), (1.7, 0.01, 0.16), cream)
    box(f"stripe{i + 1}", (cx - 0.78, -0.4 - 0.542, z), (0.12, 0.01, 0.16), mat(f"s{i}", colors[i], 0.5))
    bpy.ops.object.text_add(location=(cx - 0.6, -0.4 - 0.546, z - 0.045), rotation=(math.pi / 2, 0, 0))
    t = bpy.context.active_object
    t.data.body = titles[i]
    t.data.size = 0.105
    t.data.space_character = 1.1
    t.data.materials.append(ink)
    tape_pos.append((cx, -0.4 - 0.54, z))

# ---- lamp --------------------------------------------------------------------
cyl("lampbase", (4.15, 0.3, 0.7), 0.28, 0.08, lamp_shell)
box("lamparm1", (4.1, 0.3, 1.5), (0.06, 0.06, 1.6), lamp_shell)
box("lamparm2", (3.8, 0.3, 2.3), (0.9, 0.06, 0.06), lamp_shell)
cyl("lamphead", (3.35, 0.3, 2.2), 0.28, 0.35, lamp_shell, rot=(0, math.radians(100), 0))
cyl("lampglow", (3.25, 0.3, 2.1), 0.22, 0.05, lamp_glow, rot=(0, math.radians(100), 0))
bpy.ops.mesh.primitive_uv_sphere_add(location=(3.22, 0.3, 2.08), radius=0.1)
bpy.context.active_object.data.materials.append(lamp_glow)

# ---- plant -------------------------------------------------------------------
random.seed(3)
bpy.ops.mesh.primitive_cone_add(location=(-4.1, 0.3, 0.97), radius1=0.34, radius2=0.27, depth=0.55, vertices=40)
bpy.context.active_object.data.materials.append(pot)
cyl("potrim", (-4.1, 0.3, 1.27), 0.31, 0.07, pot)
cyl("soil", (-4.1, 0.3, 1.285), 0.26, 0.03, soil)
for i in range(34):
    a = random.uniform(0, math.tau)
    tilt = random.uniform(0.25, 1.05)
    ln = random.uniform(0.5, 0.95)
    base = Vector((-4.1 + math.cos(a) * 0.05, 0.3 + math.sin(a) * 0.05, 1.3))
    tip = Vector((base.x + math.cos(a) * math.sin(tilt) * ln, base.y + math.sin(a) * math.sin(tilt) * ln, base.z + math.cos(tilt) * ln))
    mid = (base + tip) / 2
    cable(f"stem{i}", [base, mid + Vector((0, 0, 0.03)), tip], leaf_b, r=0.008)
    bpy.ops.mesh.primitive_uv_sphere_add(location=tip, radius=0.2, segments=24, ring_count=12)
    o = bpy.context.active_object
    o.scale = (0.2, 0.05, 0.42)
    o.rotation_euler = (random.uniform(-0.3, 0.3), tilt * (1 if math.cos(a) > 0 else -1) * 0.6 + random.uniform(-0.2, 0.2), a)
    o.data.materials.append(leaf_a if i % 2 else leaf_b)

cyl("mug", (-0.9, -1.0, 0.76), 0.16, 0.22, cream)

# ---- cables behind the desk ----------------------------------------------------
cable("c_tv", [(-1.3, 0.7, 1.0), (-1.4, 1.0, 0.72), (-2.6, 1.0, 0.68), (-4.6, 1.9, 0.9), (-5.0, 2.0, 1.1)], cable_m)
cable("c_vcr", [(-3.4, 0.4, 0.88), (-3.8, 0.9, 0.7), (-4.4, 1.0, 0.68)], cable_m, 0.022)
cable("c_tv2", [(1.2, 0.7, 1.0), (1.8, 1.0, 0.7), (3.4, 1.4, 0.66), (4.8, 2.0, 0.9), (5.0, 2.0, 1.1)], cable_m)
cable("c_lamp", [(4.15, 0.3, 0.74), (4.5, 0.8, 0.68), (5.0, 1.8, 0.9), (5.0, 2.0, 1.1)], cable_m, 0.02)
box("strip", (-2.0, 1.0, 0.72), (0.8, 0.18, 0.08), black, bevel=0.015)


# ---- lights ------------------------------------------------------------------
def make_light(kind, name, loc, energy, color, **kw):
    bpy.ops.object.light_add(type=kind, location=loc)
    l = bpy.context.active_object
    l.name = name
    l.data.energy = energy
    l.data.color = color
    for k, v in kw.items():
        setattr(l.data, k, v)
    return l


lamp_spot = make_light("SPOT", "lampspot", (3.15, 0.28, 2.05), 14000, (1.0, 0.68, 0.36), spot_size=math.radians(78), spot_blend=0.65, shadow_soft_size=0.12)
aim(lamp_spot, (2.0, -0.8, 0.7))
lamp_fill = make_light("POINT", "lampfill", (3.2, 0.2, 2.0), 260, (1.0, 0.7, 0.4), shadow_soft_size=0.25)
moon = make_light("SUN", "moon", (0, 8, 6), 2.4, (0.45, 0.62, 1.0), angle=math.radians(1.5))
aim(moon, (0.2, 0.0, 0.9))
tv_spill = make_light("AREA", "tvspill", (-0.2, -0.9, 1.6), 150, (0.4, 1.0, 0.7), size=1.9)
aim(tv_spill, (-0.2, -3.5, 0.9))
tv_back = make_light("AREA", "tvfill", (0, -3, 3.2), 70, (0.5, 0.6, 0.9), size=5)  # soft ambient from the room
aim(tv_back, (0, 0, 0.8))

# dust in the air, so the lamp cone and the moonbeam read as light shafts
vol = box("dust", (0, -0.4, 2.8), (16, 5.2, 5.6), dark)
vol.display_type = "WIRE"
vol.visible_shadow = False
vm = bpy.data.materials.new("vol")
vm.use_nodes = True
vn = vm.node_tree
vn.nodes.clear()
pv = vn.nodes.new("ShaderNodeVolumePrincipled")
pv.inputs["Density"].default_value = 0.03
pv.inputs["Anisotropy"].default_value = 0.55
vo = vn.nodes.new("ShaderNodeOutputMaterial")
vn.links.new(pv.outputs["Volume"], vo.inputs["Volume"])
vol.data.materials.clear()
vol.data.materials.append(vm)

scene.world = bpy.data.worlds.new("w")
scene.world.use_nodes = True
bg = scene.world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.02, 0.03, 0.06, 1)
bg.inputs[1].default_value = 1.0

# ---- camera ------------------------------------------------------------------
bpy.ops.object.camera_add(location=(0, -10.4, 2.35), rotation=(math.radians(88.5), 0, 0))
cam = bpy.context.active_object
cam.data.lens = 32
cam.data.dof.use_dof = True
cam.data.dof.focus_distance = 10.4
cam.data.dof.aperture_fstop = 7.0
scene.camera = cam
bpy.context.view_layer.update()


def proj(p):
    v = world_to_camera_view(scene, cam, Vector(p))
    return [round(v.x, 4), round(1 - v.y, 4)]


spots = {
    "screen": [proj(c) for c in SCREEN_CORNERS],
    "tapes": [proj(p) for p in tape_pos],
    "buttons": [proj(p) for p in button_pos],
    "eject": proj(eject.location),
    "slot": proj(slot_pos),
    "window": [proj(c) for c in [(-3.6, 1.9, 3.85), (3.6, 1.9, 3.85), (-3.6, 1.9, 0.9), (3.6, 1.9, 0.9)]],
}
with open(os.path.join(OUT, "hotspots.json"), "w") as f:
    json.dump(spots, f, indent=1)

# ---- passes ------------------------------------------------------------------
emissive = {}
for m in bpy.data.materials:
    if m.use_nodes and "Principled BSDF" in m.node_tree.nodes:
        i = principled(m).inputs.get("Emission Strength")
        if i is not None and i.default_value > 0:
            emissive[m] = i.default_value
lights = {"lamp": [lamp_spot, lamp_fill], "moon": [moon], "base": [tv_spill, tv_back]}
all_lights = [l for v in lights.values() for l in v]
energies = {l.name: l.data.energy for l in all_lights}
city_objs = [o for v in city.values() for o in v]
non_city = [o for o in bpy.data.objects if o not in city_objs and o.type != "CAMERA"]
webp_ok = "WEBP" in [e.identifier for e in scene.render.image_settings.bl_rna.properties["file_format"].enum_items]


def set_emission(on):
    for m, s in emissive.items():
        principled(m).inputs["Emission Strength"].default_value = s if on else 0.0
    sky_m.node_tree.nodes["Emission"].inputs["Strength"].default_value = 1.2 if on else 0.0


def render(name, which, samples, ext, ambient=True, only_city=None, emission=True):
    scene.cycles.samples = samples
    for l in all_lights:
        l.data.energy = energies[l.name] if l in which else 0.0
    bg.inputs[1].default_value = 1.0 if ambient else 0.0
    set_emission(emission)
    for o in non_city:
        o.hide_render = only_city is not None
    for o in city_objs:
        # In the room passes the city must light the room but stay out of the camera's view
        # (so the window is a transparent hole the page fills with parallax layers).
        o.visible_camera = only_city is not None
        o.hide_render = only_city is not None and o not in only_city
    if ext == "webp" and webp_ok:
        scene.render.image_settings.file_format = "WEBP"
        scene.render.image_settings.color_mode = "RGBA"
        scene.render.image_settings.quality = 90
        path = f"{name}.webp"
    elif ext == "webp":
        scene.render.image_settings.file_format = "PNG"
        scene.render.image_settings.color_mode = "RGBA"
        path = f"{name}.png"
    else:
        scene.render.image_settings.file_format = "JPEG"
        scene.render.image_settings.color_mode = "RGB"
        scene.render.image_settings.quality = 92
        path = f"{name}.jpg"
    scene.render.filepath = os.path.join(OUT, path)
    bpy.context.view_layer.update()
    bpy.ops.render.render(write_still=True)
    print("RENDERED", path)


only = os.environ.get("ONLY", "")
if not only or "city" in only:
    render("far", [], S_CITY, "webp", ambient=False, only_city=city["sky"] + city["far"])
    render("near", [], S_CITY, "webp", ambient=False, only_city=city["near"])
if not only or "base" in only:
    render("base", lights["base"], S_BASE, "webp")
if not only or "lamp" in only:
    render("lamp", lights["lamp"], S_LIGHT, "jpg", ambient=False, emission=False)
if not only or "moon" in only:
    render("moon", lights["moon"], S_LIGHT, "jpg", ambient=False, emission=False)
print("DONE")
