uniform sampler2D tDiffuse;

varying vec2 vUvScaled;

void main() {

    vec4 cl = texture2D(tDiffuse, vUvScaled);

    gl_FragColor = vec4(1.0 - cl.r,
                        1.0 - cl.g,
                        1.0 - cl.b,
                        cl.a);

}
