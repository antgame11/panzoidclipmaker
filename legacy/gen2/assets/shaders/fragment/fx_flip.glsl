uniform sampler2D tDiffuse;
uniform vec2 uvScale;

uniform float h;
uniform float v;

varying vec2 vUv;

void main()
{
  vec2 uv = vUv;

  //horizontal
  uv.x = mod(h * uv.x, 1.0);

  //vertical
  uv.y = mod(v * uv.y, 1.0);

  gl_FragColor = texture2D(tDiffuse, uv * uvScale);
}
