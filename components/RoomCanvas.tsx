"use client";

import { useEffect, useRef } from "react";

// Blends the three Blender passes (room ambience, desk lamp, moonlight) in linear light.
// The lamp and the moon are separate textures, so their brightness can move on its own:
// the lamp flickers a little, and lightning makes the moon pass spike.
export type LightState = { flash: number };

const VERT = `attribute vec2 p;varying vec2 uv;void main(){uv=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;varying vec2 uv;
uniform sampler2D uBase,uLamp,uMoon;uniform float uLampG,uMoonG,uExp;
vec3 lin(vec3 c){return pow(c,vec3(2.2));}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){
  vec4 b=texture2D(uBase,uv);
  vec3 l=lin(b.rgb)+lin(texture2D(uLamp,uv).rgb)*uLampG+lin(texture2D(uMoon,uv).rgb)*uMoonG;
  vec3 c=pow(aces(l*uExp),vec3(1./2.2));
  gl_FragColor=vec4(c*b.a,b.a);
}`;

function load(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}

export function RoomCanvas({ light }: { light?: React.MutableRefObject<LightState> }) {
  const own = useRef<LightState>({ flash: 0 });
  const state = light ?? own;
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const gl = c.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return;
    let raf = 0;
    let dead = false;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const srcs = ["/room/base.webp", "/room/lamp.jpg", "/room/moon.jpg"];
    Promise.all(srcs.map(load)).then((imgs) => {
      if (dead) return;
      c.width = imgs[0].naturalWidth;
      c.height = imgs[0].naturalHeight;
      gl.viewport(0, 0, c.width, c.height);
      ["uBase", "uLamp", "uMoon"].forEach((name, i) => {
        const t = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgs[i]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.uniform1i(U(name), i);
      });
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const draw = (t: number) => {
        const s = t / 1000;
        // the lamp breathes a few percent; lightning spikes the moon pass and decays
        const lamp = 1 + (reduce ? 0 : 0.025 * Math.sin(s * 1.7) + 0.012 * Math.sin(s * 9.1 + 1));
        state.current.flash *= 0.9;
        const moon = 0.5 + state.current.flash * 3.2;
        gl.uniform1f(U("uLampG"), lamp);
        gl.uniform1f(U("uMoonG"), moon);
        gl.uniform1f(U("uExp"), 1.25);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!reduce) raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
    });

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
    };
  }, [state]);

  return <canvas ref={ref} className="plate" aria-label="A desk at night by a rainy window: a small TV, a VCR, a stack of labelled video tapes, a desk lamp and a plant." role="img" />;
}
