uniform sampler2D tDiffuse;
uniform vec2 uvScale;
uniform float amount;
uniform float time;
uniform float size;

varying vec2 vUv;


void main()
{
  vec2 uv = vUv;

  uv.y += sin((uv.x - 0.5) * size + time * 0.5) * amount / 100.0 * sin(uv.y * 3.1415927);
  uv.y = min(uv.y, 1.0);

  vec4 texColor = texture2D(tDiffuse, uv * uvScale);

  gl_FragColor = texColor;
}
