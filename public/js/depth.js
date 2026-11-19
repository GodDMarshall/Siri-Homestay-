/* 2.5D depth parallax: a photograph plus its depth map, rendered with WebGL.
   Near things move more than far things as the pointer moves or the page scrolls,
   which reads as a slow camera move through the real scene. Falls back to the
   plain <img> whenever WebGL is missing or motion is reduced. */
(function () {
  'use strict';
  var reduce = document.documentElement.classList.contains('reduce-motion');

  var VERT = 'attribute vec2 p; varying vec2 v; void main(){ v = p * 0.5 + 0.5; v.y = 1.0 - v.y; gl_Position = vec4(p, 0.0, 1.0); }';
  var FRAG = [
    'precision mediump float;',
    'uniform sampler2D img; uniform sampler2D dep;',
    'uniform vec2 scale; uniform vec2 shift; uniform vec2 focus; uniform vec2 move; uniform float push;',
    'varying vec2 v;',
    'void main(){',
    '  vec2 uv = (v - 0.5) * scale + 0.5 + shift;',            // object-fit: cover
    '  float d = texture2D(dep, uv).r;',
    '  vec2 c = uv - focus;',
    '  uv = focus + c / (1.0 + push * (0.25 + d * 0.9));',      // dolly in: near grows faster
    '  uv += move * (d - 0.45);',                                 // parallax shift
    '  uv = clamp(uv, 0.002, 0.998);',
    '  gl_FragColor = texture2D(img, uv);',
    '}'].join('\n');

  function loadImage(src) {
    return new Promise(function (res, rej) { var i = new Image(); i.decoding = 'async'; i.onload = function () { res(i); }; i.onerror = rej; i.src = src; });
  }

  function DepthView(host, opts) {
    this.host = host; this.o = opts;
    this.move = [0, 0]; this.target = [0, 0]; this.push = 0; this.pushTarget = 0; this.t0 = performance.now();
    this.visible = true; this.alive = true;
  }
  DepthView.prototype.init = function () {
    var self = this, o = this.o;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    var gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
    if (!gl) return Promise.reject(new Error('no webgl'));
    this.canvas = canvas; this.gl = gl;
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return Promise.reject(new Error('link'));
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = {};
    ['img', 'dep', 'scale', 'shift', 'focus', 'move', 'push'].forEach(function (n) { self.u[n] = gl.getUniformLocation(prog, n); });
    var big = window.innerWidth > 900 || window.devicePixelRatio > 1.5;
    return Promise.all([loadImage(big ? o.src : (o.small || o.src)), loadImage(o.depth)]).then(function (imgs) {
      if (!self.alive) return;
      self.iw = imgs[0].naturalWidth; self.ih = imgs[0].naturalHeight;
      [imgs[0], imgs[1]].forEach(function (im, i) {
        var t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
      });
      gl.uniform1i(self.u.img, 0); gl.uniform1i(self.u.dep, 1);
      var f = o.focus || [0.5, 0.5]; gl.uniform2f(self.u.focus, f[0], f[1]);
      self.host.appendChild(canvas);
      self.resize();
      self.bind();
      requestAnimationFrame(function () { self.host.classList.add('is-live'); });
      self.loop();
    });
  };
  DepthView.prototype.resize = function () {
    var r = this.host.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    this.canvas.width = w; this.canvas.height = h;
    this.gl.viewport(0, 0, w, h);
    // cover: scale the sampled UV range so the image fills the box
    var boxA = r.width / r.height, imgA = this.iw / this.ih, sx = 1, sy = 1;
    if (boxA > imgA) sy = imgA / boxA; else sx = boxA / imgA;
    var f = this.o.focus || [0.5, 0.5];
    // keep the focus point in view when cropping
    var shx = (f[0] - 0.5) * (1 - sx), shy = (f[1] - 0.5) * (1 - sy);
    this.gl.uniform2f(this.u.scale, sx * 0.94, sy * 0.94);  // 6% headroom so parallax never shows an edge
    this.gl.uniform2f(this.u.shift, shx, shy);
  };
  DepthView.prototype.bind = function () {
    var self = this, s = this.o.strength || 1;
    this.onMove = function (e) {
      var r = self.host.getBoundingClientRect();
      self.target = [((e.clientX - r.left) / r.width - 0.5) * 0.028 * s, ((e.clientY - r.top) / r.height - 0.5) * 0.02 * s];
    };
    window.addEventListener('pointermove', this.onMove, { passive: true });
    this.onResize = function () { self.resize(); };
    window.addEventListener('resize', this.onResize);
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(function (en) { self.visible = en[0].isIntersecting; if (self.visible) self.loop(); });
      this.io.observe(this.host);
    }
  };
  DepthView.prototype.setPush = function (p) { this.pushTarget = p; };
  DepthView.prototype.loop = function () {
    var self = this;
    if (this.raf || !this.alive) return;
    function frame(t) {
      self.raf = 0;
      if (!self.visible || !self.alive || document.hidden) return;
      var k = (t - self.t0) / 1000;
      // slow autonomous drift so touch screens get the depth too
      var drift = [Math.sin(k * 0.23) * 0.007, Math.cos(k * 0.17) * 0.004];
      self.move[0] += (self.target[0] + drift[0] - self.move[0]) * 0.06;
      self.move[1] += (self.target[1] + drift[1] - self.move[1]) * 0.06;
      self.push += (self.pushTarget - self.push) * 0.08;
      var gl = self.gl;
      gl.uniform2f(self.u.move, self.move[0], self.move[1]);
      gl.uniform1f(self.u.push, self.push);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      self.raf = requestAnimationFrame(frame);
    }
    this.raf = requestAnimationFrame(frame);
  };
  DepthView.prototype.destroy = function () {
    this.alive = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('resize', this.onResize);
    if (this.io) this.io.disconnect();
    var ext = this.gl && this.gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext();
    if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  };

  window.SH = window.SH || {};
  SH.DepthView = DepthView;
  SH.depthAvailable = !reduce && (function () { try { var c = document.createElement('canvas'); return !!c.getContext('webgl'); } catch (e) { return false; } })();

  // Auto-start for [data-depth] elements (the home hero).
  if (!SH.depthAvailable) return;
  document.querySelectorAll('[data-depth]').forEach(function (host) {
    var o; try { o = JSON.parse(host.getAttribute('data-depth')); } catch (e) { return; }
    if (!o.depth) return;
    var view = new DepthView(host, o);
    view.init().then(function () {
      // Scrolling past the hero dollies the camera forward a little.
      if (SH.scenes) SH.scenes.push(function () {
        var r = host.getBoundingClientRect();
        view.setPush(Math.min(1, Math.max(0, -r.top / r.height)) * 0.35);
      });
    }).catch(function () { /* keep the photo */ });
  });
})();
