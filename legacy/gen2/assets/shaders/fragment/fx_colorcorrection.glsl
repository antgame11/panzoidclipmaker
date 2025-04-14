
uniform sampler2D tDiffuse;
uniform vec3 powRGB;
uniform vec3 mulRGB;
uniform vec3 addRGB;

varying vec2 vUvScaled;

void main()
{

  gl_FragColor = texture2D( tDiffuse, vUvScaled );
  gl_FragColor.rgb = mulRGB * pow( ( gl_FragColor.rgb + addRGB ), powRGB );

}
