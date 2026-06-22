import { useEffect, useRef } from 'react';

const hexToRgba = hex => {
  const r = parseInt(hex.slice(1,3), 16) / 255;
  const g = parseInt(hex.slice(3,5), 16) / 255;
  const b = parseInt(hex.slice(5,7), 16) / 255;
  return [r, g, b, 1.0];
};

const DEFAULT_COLORS = [
  '#7C0A1A',
  '#FF8E7A',
  '#E2725B',
  '#FF4500',
  '#FFD1BA',
  '#3D2314',
  '#C19A6B',
  '#E6D7C3',
  '#FFA500',
  '#F5D061',
  '#E1AD01',
  '#FFF4A3',
  '#F5F5DC',
  '#4B5320',
  '#6B8E23',
  '#8A9A86',
  '#BACBB6',
  '#50C878',
  '#B2EBF2',
  '#87CEEB',
  '#4169E1',
  '#E6E6FA',
  '#000080',
  '#E0B0FF',
  '#FF00FF',
  '#FF6EC7',
  '#FF007F',
  '#800020',
  '#FFD1DC',
  '#FFC0CB',
  '#FFFFFF',
].map(hexToRgba);

const BlobGradient = ({
  colors = DEFAULT_COLORS,   // [[r,g,b,a], ...] 0~1 범위
  numBlobs = 33,
  blobRadius = 0.15,
  gaussianFactor = 0.8,
  initialSpeed = 0.5,
  velocityNoise = 0.0005,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const NUM_BLOBS = numBlobs;

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main(void) {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform vec2  u_centers[${NUM_BLOBS}];
      uniform vec4  u_colors[${NUM_BLOBS}];
      uniform float u_radius;
      uniform float u_gaussianFactor;
      void main(void) {
        float sumWeight = 0.0;
        vec4  blendedColor = vec4(0.0);
        for (int i = 0; i < ${NUM_BLOBS}; i++) {
          float d = distance(v_uv, u_centers[i]);
          float w = exp(-u_gaussianFactor * (d * d) / (u_radius * u_radius));
          blendedColor += w * u_colors[i];
          sumWeight    += w;
        }
        blendedColor /= sumWeight;
        gl_FragColor  = blendedColor;
      }
    `;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { console.warn('WebGL not supported'); return; }

    // resize
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.max(1, Math.round(parent.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(parent.clientHeight * dpr));
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas.parentElement);
    resizeCanvas();

    // shader compile
    const compileShader = (src, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // locations
    const aPositionLoc     = gl.getAttribLocation(program, 'a_position');
    const uCentersLoc      = Array.from({ length: NUM_BLOBS }, (_, i) => gl.getUniformLocation(program, `u_centers[${i}]`));
    const uColorsLoc       = Array.from({ length: NUM_BLOBS }, (_, i) => gl.getUniformLocation(program, `u_colors[${i}]`));
    const uRadiusLoc       = gl.getUniformLocation(program, 'u_radius');
    const uGaussianLoc     = gl.getUniformLocation(program, 'u_gaussianFactor');

    // fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // blob state
    const blobPositions  = Array.from({ length: NUM_BLOBS }, () => [Math.random(), Math.random()]);
    const blobVelocities = Array.from({ length: NUM_BLOBS }, () => [
      (Math.random() - 0.5) * initialSpeed,
      (Math.random() - 0.5) * initialSpeed,
    ]);

    gl.uniform1f(uRadiusLoc, blobRadius);
    gl.uniform1f(uGaussianLoc, gaussianFactor);

    let lastTime = 0;
    const render = (now) => {
      now *= 0.001;
      const dt = now - (lastTime || now);
      lastTime = now;

      for (let i = 0; i < NUM_BLOBS; i++) {
        blobVelocities[i][0] += (Math.random() - 0.5) * velocityNoise;
        blobVelocities[i][1] += (Math.random() - 0.5) * velocityNoise;
        blobPositions[i][0]  += blobVelocities[i][0] * dt;
        blobPositions[i][1]  += blobVelocities[i][1] * dt;

        for (let c = 0; c < 2; c++) {
          if (blobPositions[i][c] < 0) { blobPositions[i][c] = 0; blobVelocities[i][c] *= -1; }
          if (blobPositions[i][c] > 1) { blobPositions[i][c] = 1; blobVelocities[i][c] *= -1; }
        }
      }

      for (let i = 0; i < NUM_BLOBS; i++) {
        gl.uniform2fv(uCentersLoc[i], blobPositions[i]);
        gl.uniform4fv(uColorsLoc[i],  colors[i % colors.length]);
      }

      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`.trim()}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default BlobGradient;