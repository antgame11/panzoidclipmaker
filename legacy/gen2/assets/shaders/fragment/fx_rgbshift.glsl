uniform sampler2D tDiffuse;
uniform vec2 uvScale;
uniform float amount;
uniform float angle;

varying vec2 vUv;

void main() {

    vec2 offset = amount * vec2( cos(angle), sin(angle));
    vec4 cr = texture2D(tDiffuse, (vUv + offset) * uvScale);
    vec4 cga = texture2D(tDiffuse, vUv * uvScale);
    vec4 cb = texture2D(tDiffuse, (vUv - offset) * uvScale);
    gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);

}
