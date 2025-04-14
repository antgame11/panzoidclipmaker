uniform sampler2D tDiffuse;
uniform vec2 uvScale;
uniform float multiplier;
uniform vec2 offset;

varying vec2 vUv;

void main() {

	vec2 map = mod((vUv - vec2(0.5, 0.5) + offset) * multiplier + vec2(0.5, 0.5), vec2(1.0, 1.0));

	vec4 texel = texture2D( tDiffuse, map * uvScale );
	gl_FragColor = texel;

}
