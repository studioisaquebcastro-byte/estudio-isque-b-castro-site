// Tiny raw-WebGL poster effect (no library): liquid ripple + bulge + RGB split that follows the pointer.
// It samples the poster image, and cross-fades to the live preview video once that is playing.
const VERT = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;
uniform sampler2D uA,uB;uniform vec2 uMouse;uniform float uHover,uTime,uMix,uAspect;varying vec2 v;
vec3 split(sampler2D t,vec2 u,float s){return vec3(texture2D(t,u+vec2(s,0.)).r,texture2D(t,u).g,texture2D(t,u-vec2(s,0.)).b);}
void main(){
  vec2 d=v-uMouse;d.x*=uAspect;float dist=length(d);
  float ripple=sin(dist*30.-uTime*4.5)*exp(-dist*4.5);
  vec2 off=normalize(d+1e-5)*ripple*.016*uHover;
  off-=d*exp(-dist*6.)*.16*uHover;
  off.x/=uAspect;
  vec2 u=(v+off-.5)*(1.-.035*uHover)+.5;
  float s=.0045*uHover*(1.+ripple*2.);
  gl_FragColor=vec4(mix(split(uA,u,s),split(uB,u,s),uMix),1.);
}`;

export class PosterFX {
  constructor(host, canvas, img, video) {
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) throw new Error('no webgl');
    Object.assign(this, { host, canvas, img, video, gl, hover: 0, target: 0, mix: 0, mx: 0.5, my: 0.5, tx: 0.5, ty: 0.5, raf: 0, hasImg: false });
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link failed');
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // one oversized triangle
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = {}; for (const n of ['uA', 'uB', 'uMouse', 'uHover', 'uTime', 'uMix', 'uAspect']) this.u[n] = gl.getUniformLocation(prog, n);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    this.texA = this.tex(0); this.texB = this.tex(1);
    gl.uniform1i(this.u.uA, 0); gl.uniform1i(this.u.uB, 1);
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.dead = true; this.stop(); });
    this.loop = this.loop.bind(this);
    if (img.complete && img.naturalWidth) this.uploadImg(); else img.addEventListener('load', () => this.uploadImg(), { once: true });
  }
  tex(unit) {
    const { gl } = this, t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([21, 17, 14, 255]));
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
    return t;
  }
  uploadImg() {
    const { gl } = this;
    try { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.texA); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img); this.hasImg = true; } catch (e) { this.dead = true; }
  }
  resize() {
    const r = this.canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; this.gl.viewport(0, 0, w, h); }
    this.gl.uniform1f(this.u.uAspect, r.width / r.height);
  }
  move(e) {
    const r = this.canvas.getBoundingClientRect();
    this.tx = (e.clientX - r.left) / r.width; this.ty = 1 - (e.clientY - r.top) / r.height;
  }
  enter(e) { if (this.dead || !this.hasImg) return; this.target = 1; this.resize(); this.move(e); if (!this.raf) { this.mx = this.tx; this.my = this.ty; this.raf = requestAnimationFrame(this.loop); } }
  leave() { this.target = 0; }
  stop() { cancelAnimationFrame(this.raf); this.raf = 0; this.hover = 0; this.host.classList.remove('is-gl'); }
  loop(t) {
    const { gl, u, video } = this;
    this.hover += (this.target - this.hover) * 0.085;
    this.mx += (this.tx - this.mx) * 0.12; this.my += (this.ty - this.my) * 0.12;
    const live = video && video.readyState >= 2 && !video.paused;
    if (live) { try { gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.texB); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video); this.hasVid = true; } catch (e) { this.hasVid = false; } }
    this.mix += (((live && this.hasVid) ? 1 : 0) - this.mix) * 0.1;
    gl.uniform2f(u.uMouse, this.mx, this.my); gl.uniform1f(u.uHover, this.hover); gl.uniform1f(u.uTime, t / 1000); gl.uniform1f(u.uMix, this.mix);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.host.classList.add('is-gl');
    if (this.target === 0 && this.hover < 0.004) { this.mix = 0; return this.stop(); }
    this.raf = requestAnimationFrame(this.loop);
  }
}
