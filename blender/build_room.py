"""Builds the rainy-night desk scene and renders the still used by the website.

Run:  blender -b -P blender/build_room.py
Outputs:
  public/room/still.jpg      the rendered desk (window, TV, VCR, tapes, lamp, plant)
  public/room/hotspots.json  2D positions (0-1 of the image) of screen / tapes / buttons
Everything is made from primitives, so there are no external assets to license.
"""
import bpy, json, math, os, random
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "room")
os.makedirs(OUT, exist_ok=True)
W, H = 1920, 1080

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
engines = [e.identifier for e in scene.render.bl_rna.properties["engine"].enum_items]
scene.render.engine = "BLENDER_EEVEE" if "BLENDER_EEVEE" in engines else "BLENDER_EEVEE_NEXT"
scene.render.resolution_x, scene.render.resolution_y = W, H
scene.render.image_settings.file_format = "JPEG"
scene.render.image_settings.quality = 90
transforms = [v.identifier for v in scene.view_settings.bl_rna.properties["view_transform"].enum_items]
scene.view_settings.view_transform = "AgX" if "AgX" in transforms else "Filmic"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0.9


def mat(name, color, rough=0.5, metal=0.0, emit=None, emit_strength=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*emit, 1)
        b.inputs["Emission Strength"].default_value = emit_strength
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


# ---- materials ---------------------------------------------------------------
wall = mat("wall", (0.05, 0.07, 0.09), 0.9)
wood = mat("wood", (0.20, 0.11, 0.06), 0.45)
frame = mat("frame", (0.03, 0.04, 0.05), 0.5)
plastic = mat("tvplastic", (0.10, 0.10, 0.11), 0.35)
dark = mat("dark", (0.01, 0.01, 0.012), 0.4)
black = mat("black", (0.005, 0.005, 0.006), 0.3)
cream = mat("cream", (0.85, 0.80, 0.68), 0.7)
screen_m = mat("screen", (0.02, 0.05, 0.04), 0.1, emit=(0.35, 0.9, 0.6), emit_strength=0.12)
led = mat("led", (0, 0, 0), 0.3, emit=(0.2, 1, 0.3), emit_strength=6)
sky_m = mat("sky", (0, 0, 0), 1, emit=(0.05, 0.09, 0.2), emit_strength=0.8)
lamp_shell = mat("lampshell", (0.04, 0.06, 0.05), 0.4, metal=0.6)
lamp_glow = mat("lampglow", (1, 0.8, 0.5), 0.2, emit=(1, 0.7, 0.35), emit_strength=18)
leaf = mat("leaf", (0.05, 0.22, 0.09), 0.6)
pot = mat("pot", (0.45, 0.2, 0.12), 0.7)

# ---- room ---------------------------------------------------------------------
# wall with a real opening for the window (x +-3.6, z 0.9..3.85)
box("wallL", (-8.3, 2.2, 3.0), (9.4, 0.2, 12), wall)
box("wallR", (8.3, 2.2, 3.0), (9.4, 0.2, 12), wall)
box("wallT", (0, 2.2, 5.9), (7.2, 0.2, 4.1), wall)
box("wallB", (0, 2.2, 0.45), (7.2, 0.2, 0.9), wall)
box("floor", (0, 0, -0.05), (30, 12, 0.1), wall)
box("sky", (0, 3.0, 2.3), (7.6, 0.05, 3.6), sky_m)

# night city outside the window: dark towers with lit windows
random.seed(7)
tower = mat("tower", (0.01, 0.015, 0.03), 0.9)
x = -3.5
while x < 3.5:
    w = random.uniform(0.25, 0.6)
    h = random.uniform(0.9, 2.7)
    box("bld", (x + w / 2, 2.85, 0.75 + h / 2), (w, 0.2, h), tower)
    for _ in range(int(h * w * 18)):
        wx = x + random.uniform(0.04, w - 0.04)
        wz = 0.78 + random.uniform(0.05, h - 0.05)
        box("win", (wx, 2.73, wz), (0.035, 0.01, 0.05),
            mat("w", (0, 0, 0), 1, emit=(1, 0.8, 0.45), emit_strength=random.uniform(2, 8)))
    x += w + 0.03

for name, loc, size in [
    ("fT", (0, 2.08, 3.95), (7.6, 0.3, 0.2)), ("fB", (0, 2.08, 0.8), (7.6, 0.3, 0.2)),
    ("fL", (-3.7, 2.08, 2.4), (0.2, 0.3, 3.35)), ("fR", (3.7, 2.08, 2.4), (0.2, 0.3, 3.35)),
    ("mid1", (-1.25, 2.08, 2.4), (0.12, 0.25, 3.3)), ("mid2", (1.25, 2.08, 2.4), (0.12, 0.25, 3.3)),
    ("mid3", (0, 2.08, 2.5), (7.4, 0.25, 0.1)),
]:
    box(name, loc, size, frame)

box("desk", (0, -0.2, 0.6), (14, 2.6, 0.12), wood, bevel=0.01)
box("deskfront", (0, -1.45, 0.05), (14, 0.1, 1.1), wood)

# ---- TV -----------------------------------------------------------------------
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

# ---- VCR ----------------------------------------------------------------------
box("vcr", (-3.1, -0.3, 0.88), (2.3, 1.4, 0.4), plastic, bevel=0.03)
box("vcrslot", (-3.35, -1.0, 0.9), (1.2, 0.03, 0.14), black)
box("vcrdisp", (-2.45, -1.0, 0.9), (0.45, 0.03, 0.12),
    mat("disp", (0, 0, 0), 0.2, emit=(0.3, 1, 0.5), emit_strength=3))
eject = box("eject", (-2.95, -1.01, 0.8), (0.14, 0.03, 0.07), mat("ej", (0.2, 0.2, 0.22), 0.4))
slot_pos = (-3.35, -1.02, 0.9)

# ---- tape stack ---------------------------------------------------------------
tape_pos = []
colors = [(0.88, 0.7, 0.29), (0.85, 0.38, 0.3), (0.3, 0.56, 0.85), (0.35, 0.72, 0.52), (0.69, 0.45, 0.84)]
offsets = [0.0, 0.1, -0.07, 0.05, -0.03]
for i in range(5):
    z = 0.71 + (4 - i) * 0.215
    cx = 3.15 + offsets[i]
    box(f"tape{i + 1}", (cx, -0.4, z), (2.05, 1.06, 0.2), black, bevel=0.012)
    box(f"label{i + 1}", (cx, -0.4 - 0.535, z), (1.7, 0.01, 0.16), cream)
    box(f"stripe{i + 1}", (cx - 0.78, -0.4 - 0.542, z), (0.12, 0.01, 0.16), mat(f"s{i}", colors[i], 0.5))
    tape_pos.append((cx, -0.4 - 0.54, z))

# ---- lamp ---------------------------------------------------------------------
cyl("lampbase", (4.15, 0.3, 0.7), 0.28, 0.08, lamp_shell)
box("lamparm1", (4.1, 0.3, 1.5), (0.06, 0.06, 1.6), lamp_shell)
box("lamparm2", (3.8, 0.3, 2.3), (0.9, 0.06, 0.06), lamp_shell)
cyl("lamphead", (3.35, 0.3, 2.2), 0.28, 0.35, lamp_shell, rot=(0, math.radians(100), 0))
cyl("lampglow", (3.25, 0.3, 2.1), 0.22, 0.05, lamp_glow, rot=(0, math.radians(100), 0))

# ---- plant --------------------------------------------------------------------
cyl("pot", (-4.1, 0.3, 0.95), 0.32, 0.5, pot)
for i in range(9):
    a = i / 9 * math.tau
    bpy.ops.mesh.primitive_uv_sphere_add(
        location=(-4.1 + math.cos(a) * 0.22, 0.3 + math.sin(a) * 0.22, 1.5 + (i % 3) * 0.18), radius=0.2)
    o = bpy.context.active_object
    o.scale = (0.25, 0.1, 0.55)
    o.rotation_euler = (0, math.cos(a) * 0.7, a)
    o.data.materials.append(leaf)

cyl("mug", (-0.9, -1.0, 0.76), 0.16, 0.22, cream)


# ---- lights -------------------------------------------------------------------
def light(kind, loc, energy, color, size=1.0):
    bpy.ops.object.light_add(type=kind, location=loc)
    l = bpy.context.active_object
    l.data.energy = energy
    l.data.color = color
    if kind == "AREA":
        l.data.size = size
    return l


light("POINT", (3.2, -0.1, 2.0), 700, (1.0, 0.72, 0.4))
light("AREA", (0, -0.6, 1.6), 140, (0.4, 1.0, 0.7), 1.8)
light("AREA", (0, 2.5, 2.4), 260, (0.25, 0.4, 0.9), 6)
scene.world = bpy.data.worlds.new("w")
scene.world.use_nodes = True
scene.world.node_tree.nodes["Background"].inputs[0].default_value = (0.01, 0.015, 0.03, 1)

# ---- camera -------------------------------------------------------------------
bpy.ops.object.camera_add(location=(0, -10.4, 2.35), rotation=(math.radians(88.5), 0, 0))
cam = bpy.context.active_object
cam.data.lens = 32
scene.camera = cam
bpy.context.view_layer.update()


def proj(p):
    v = world_to_camera_view(scene, cam, Vector(p))
    return [round(v.x, 4), round(1 - v.y, 4)]


spots = {
    "screen": [proj(c) for c in SCREEN_CORNERS],  # TL, TR, BL, BR
    "tapes": [proj(p) for p in tape_pos],
    "buttons": [proj(p) for p in button_pos],
    "eject": proj(eject.location),
    "slot": proj(slot_pos),
    "window": [proj(c) for c in [(-3.6, 1.9, 3.85), (3.6, 1.9, 3.85), (-3.6, 1.9, 0.9), (3.6, 1.9, 0.9)]],
}
with open(os.path.join(OUT, "hotspots.json"), "w") as f:
    json.dump(spots, f, indent=1)

scene.render.filepath = os.path.join(OUT, "still.jpg")
bpy.ops.render.render(write_still=True)
print("DONE", scene.render.filepath)
