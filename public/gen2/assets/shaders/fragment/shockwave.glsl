// Based on https://www.shadertoy.com/view/lsySzd
//
// "Volumetric explosion" by Duke
//-------------------------------------------------------------------------------------
// Based on "Supernova remnant" (https://www.shadertoy.com/view/MdKXzc)
// and other previous shaders
// otaviogood's "Alien Beacon" (https://www.shadertoy.com/view/ld2SzK)
// and Shane's "Cheap Cloud Flythrough" (https://www.shadertoy.com/view/Xsc3R4) shaders
// Some ideas came from other shaders from this wonderful site
// Press 1-2-3 to zoom in and zoom out.
// License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
//-------------------------------------------------------------------------------------
//
// And based on https://www.shadertoy.com/view/XlcGRn
//
// "Space Elevator" by dr2 - 2016
// License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
//
// And based on https://www.shadertoy.com/view/4djSRW
//
// Hash without Sine
// Creative Commons Attribution-ShareAlike 4.0 International Public License
// Created by David Hoskins.
//
// With varous small tweaks to have the effect play nice against a colorful background,
// keeping the black smoky look.
//

uniform float time;
uniform float opacity;
uniform vec3 color;
uniform sampler2D noise_0;
uniform sampler2D noise_1;

uniform float seed;
uniform float noise;
uniform float zoom;

varying vec2 vUv;

// Explosion colors
const vec3 veDensityBeg  = vec3(0.1,0.1,0.1);
const vec3 veDensityEnd  = vec3(0.1,0.1,0.1);
const vec3 veMediaCenter = vec3(0.1,0.1,0.1);
const vec3 veMediaEdge   = vec3(0.1,0.1,0.1);

// Default
const bool veBOTH         = false;
const bool veLEFT         = true;
const bool veLOW_QUALITY  = false;
const bool veDITHERING    = false;

//float time = mod(time * 0.2, 1.);

//-------------------
#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(.1031, .1030, .0973)
#define HASHSCALE4 vec4(1031, .1030, .0973, .1099)

#define pi 3.14159265

vec4 texture(sampler2D s, vec2 p) {
    return texture2D(s, p);
}
vec4 texture(sampler2D s, vec2 p, float b) {
    return texture2D(s, p, b);
}

// iq's noise
float veNoise( in vec3 x) {
	vec3 p = floor(x);
	vec3 f = fract(x);
	f = f * f * (3.0 - 2.0 * f);
	vec2 uv = (p.xy + vec2(37.0, 17.0) * p.z) + f.xy;
	vec2 rg = texture(noise_0, (uv + 0.5) / 256.0, 100.0).yx;
	return 1. - 0.82 * mix(rg.x, rg.y, f.z);
}

float veFBM(vec3 p) {
	return veNoise(p * .06125) * .5 + veNoise(p * .125) * .25
			+ veNoise(p * .25) * .125 + veNoise(p * .4) * .2;
}

float veSphere(vec3 p, float r) {
	return length(p) - r * 1.4 * time;
}

//==============================================================
// otaviogood's noise from https://www.shadertoy.com/view/ld2SzK
//--------------------------------------------------------------
// This spiral noise works by successively adding and rotating sin waves while increasing frequency.
// It should work the same on all computers since it's not based on a hash function like some other noises.
// It can be much faster than other noise functions if you're ok with some repetition.
const float veNudge = 100.3 * 4.;	// size of perpendicular vector
float veNormalizer = 1.0 / sqrt(1.0 + veNudge * veNudge);	// pythagorean theorem on that perpendicular to maintain scale

float veSpiralNoiseC(vec3 p) {
	float n = 1.5 - 1. * time; // noise amount
	float iter = 2.0;
	for (int i = 0; i < 8; i++) {
		// add sin and cos scaled inverse with the frequency
		n += -abs(sin(p.y * iter) + cos(p.x * iter)) / iter; // abs for a ridged look
		// rotate by adding perpendicular and scaling down
		p.xy += vec2(p.y, -p.x) * veNudge;
		p.xy *= veNormalizer;
		// rotate on other axis
		p.xz += vec2(p.z, -p.x) * veNudge;
		p.xz *= veNormalizer;
		// increase the frequency
		iter *= 1.733733;
	}
	return n;
}

float veVolumetricExplosion(vec3 p) {
	float fin = veSphere(p, 4.);
	if (veLOW_QUALITY) {
		fin += veNoise(p * 12.5) * .2;
	} else {
		fin += veFBM(p * 50.);
	}

	fin += veSpiralNoiseC(p.zxy * 0.4132 + 333. * seed) * noise; //1.25;

	return fin;
}

float veMap(vec3 p) {
	float VolExplosion = veVolumetricExplosion(p * 2.) * 0.5; // scale
	return VolExplosion;
}
//--------------------------------------------------------------

// assign color to the media
vec3 veComputeColor(float density, float radius) {
	// color based on density alone, gives impression of occlusion within
	// the media
	vec3 result = mix(veDensityBeg, veDensityEnd, 1. - density);

	// color added to the media
	vec3 colCenter = 7. * veMediaCenter;
	vec3 colEdge = 1.5 * veMediaEdge;
	result *= mix(colCenter, colEdge, min((radius + .05) / .9, 1.15));

	return result;
}

bool veRaySphereIntersect(vec3 org, vec3 dir, out float near, out float far) {
	float b = dot(dir, org);
	float c = dot(org, org) - 8. * 4. * time;
	float delta = b * b - c;
	if (delta < 0.0)
		return false;
	float deltasqrt = sqrt(delta);
	near = -b - deltasqrt;
	far = -b + deltasqrt;
	return far > 0.0;
}

const vec4 vecHashA4 = vec4(0., 1., 57., 58.);
const vec3 vecHashA3 = vec3(1., 57., 113.);
const float vecHashM = 43758.54;

vec4 veHashv4f(float p) {
	return fract(sin(p + vecHashA4) * vecHashM);
}

float veNoisefv2(vec2 p) {
	vec4 t;
	vec2 ip, fp;
	ip = floor(p);
	fp = fract(p);
	fp = fp * fp * (3. - 2. * fp);
	t = veHashv4f(dot(ip, vecHashA3.xy));
	return mix(mix(t.x, t.y, fp.x), mix(t.z, t.w, fp.x), fp.y);
}

float veNoisefv3(vec3 p) {
	vec4 t1, t2;
	vec3 ip, fp;
	float q;
	ip = floor(p);
	fp = fract(p);
	fp = fp * fp * (3. - 2. * fp);
	q = dot(ip, vecHashA3);
	t1 = veHashv4f(q);
	t2 = veHashv4f(q + vecHashA3.z);
	return mix(mix(mix(t1.x, t1.y, fp.x), mix(t1.z, t1.w, fp.x), fp.y),
			mix(mix(t2.x, t2.y, fp.x), mix(t2.z, t2.w, fp.x), fp.y), fp.z);
}

float veFbm3(vec3 p) {
	float f, a;
	f = 0.;
	a = 1.;
	for (int i = 0; i < 5; i++) {
		f += a * veNoisefv3(p);
		a *= 0.5;
		p *= 2.;
	}
	return f;
}

float veFbmn(vec3 p, vec3 n) {
	vec3 s;
	float a;
	s = vec3(0.);
	a = 1.;
	for (int i = 0; i < 5; i++) {
		s += a * vec3(veNoisefv2(p.yz), veNoisefv2(p.zx), veNoisefv2(p.xy));
		a *= 0.5;
		p *= 2.;
	}
	return dot(s, abs(n));
}

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
//  1 out, 1 in...
float hash11(float p) {
	vec3 p3 = fract(vec3(p) * HASHSCALE1);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract((p3.x + p3.y) * p3.z);
}

//----------------------------------------------------------------------------------------
//  1 out, 2 in...
float hash12(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * HASHSCALE1);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract((p3.x + p3.y) * p3.z);
}

//----------------------------------------------------------------------------------------
//  1 out, 3 in...
float hash13(vec3 p3) {
	p3 = fract(p3 * HASHSCALE1);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract((p3.x + p3.y) * p3.z);
}

//----------------------------------------------------------------------------------------
//  2 out, 1 in...
vec2 hash21(float p) {
	vec3 p3 = fract(vec3(p) * HASHSCALE3);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract(vec2((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y));
}

//----------------------------------------------------------------------------------------
///  2 out, 2 in...
vec2 hash22(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract(vec2((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y));
}

//----------------------------------------------------------------------------------------
///  2 out, 3 in...
vec2 hash23(vec3 p3) {
	p3 = fract(p3 * HASHSCALE3);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract(vec2((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y));
}

//----------------------------------------------------------------------------------------
//  3 out, 1 in...
vec3 hash31(float p) {
	vec3 p3 = fract(vec3(p) * HASHSCALE3);
	p3 += dot(p3, p3.yzx + 19.19);
	return fract(
			vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

//----------------------------------------------------------------------------------------
///  3 out, 2 in...
vec3 hash32(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
	p3 += dot(p3, p3.yxz + 19.19);
	return fract(
			vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

//----------------------------------------------------------------------------------------
///  3 out, 3 in...
vec3 hash33(vec3 p3) {
	p3 = fract(p3 * HASHSCALE3);
	p3 += dot(p3, p3.yxz + 19.19);
	return fract(
			vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

//----------------------------------------------------------------------------------------
// 4 out, 1 in...
vec4 hash41(float p) {
	vec4 p4 = fract(vec4(p) * HASHSCALE4);
	p4 += dot(p4, p4.wzxy + 19.19);
	return fract(
			vec4((p4.x + p4.y) * p4.z, (p4.x + p4.z) * p4.y, (p4.y + p4.z) * p4.w,
					(p4.z + p4.w) * p4.x));

}

//----------------------------------------------------------------------------------------
// 4 out, 2 in...
vec4 hash42(vec2 p) {
	vec4 p4 = fract(vec4(p.xyxy) * HASHSCALE4);
	p4 += dot(p4, p4.wzxy + 19.19);
	return fract(
			vec4((p4.x + p4.y) * p4.z, (p4.x + p4.z) * p4.y, (p4.y + p4.z) * p4.w,
					(p4.z + p4.w) * p4.x));
}

//----------------------------------------------------------------------------------------
// 4 out, 3 in...
vec4 hash43(vec3 p) {
	vec4 p4 = fract(vec4(p.xyzx) * HASHSCALE4);
	p4 += dot(p4, p4.wzxy + 19.19);
	return fract(
			vec4((p4.x + p4.y) * p4.z, (p4.x + p4.z) * p4.y, (p4.y + p4.z) * p4.w,
					(p4.z + p4.w) * p4.x));
}

//----------------------------------------------------------------------------------------
// 4 out, 4 in...
vec4 hash44(vec4 p4) {
	p4 = fract(p4 * HASHSCALE4);
	p4 += dot(p4, p4.wzxy + 19.19);
	return fract(
			vec4((p4.x + p4.y) * p4.z, (p4.x + p4.z) * p4.y, (p4.y + p4.z) * p4.w,
					(p4.z + p4.w) * p4.x));
}

// From iq's website
float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
	vec3 pa = p - a, ba = b - a;
	float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
	return length(pa - ba * h) - r;
}
float parabola(float x, float k) {
	return pow(4.0 * x * (1.0 - x), k);
}
vec4 parabola(vec4 x, float k) {
	return pow(4.0 * x * (1.0 - x), vec4(k));
}
vec3 parabola(vec3 x, float k) {
	return pow(4.0 * x * (1.0 - x), vec3(k));
}
float pcurve(float x, float a, float b) {
	float k = pow(a + b, a + b) / (pow(a, a) * pow(b, b));
	return k * pow(x, a) * pow(1.0 - x, b);
}


void main()
{
	vec2 uv = vUv; //fragCoord / iResolution.xy;

	// ro: ray origin
	// rd: direction of the ray
	// vec3 rd = normalize(vec3((fragCoord.xy - 0.5 * iResolution.xy) / iResolution.y, 1.));
  vec3 rd = normalize(vec3(vUv - vec2(0.5), 1.));
	vec3 ro = vec3(0., 0., -zoom);

	// ld, td: local, total density
	// w: weighting factor
	float ld = 0., td = 0., w = 0.;

	// t: length of the ray
	// d: distance function
	float density = 1., t = 0.;
	const float h = 0.1;
	vec4 sum = vec4(0.0);
	float min_dist = 0.0, max_dist = 0.0;

	if (veRaySphereIntersect(ro, rd, min_dist, max_dist))
    {
		t = min_dist * step(t, min_dist);

		// raymarch loop
		for (int i = 0; i < 86; i++)
        {
			if (veLOW_QUALITY && i >= 56) {
				break;
			}
			vec3 pos = ro + t * rd;

            // Loop break conditions.
			if (td > 0.99 || t > max_dist)
				break;

            // evaluate distance function
			float d = veMap(pos);
			if (veLEFT) {
				d = abs(d) + 0.07;
			}

            // change this string to control density
			d = max(d, 0.000003);	//0.03

            // point light calculations
			vec3 ldst = vec3(0.0) - pos;
			float lDist = max(length(ldst), 0.00000001);

			// bloom
			vec3 halo = color / exp(pow(lDist, 0.2) * 0.008);
			sum.rgb += (halo * 0.0333 * smoothstep(0.6, 0.3, time));
			if (d < h) {
				// compute local density
				ld = h - d;
				// compute weighting factor
				w = (1. - td) * ld;
				// accumulate density
				td += w + 1. / 2000.;
				vec4 col = vec4(veComputeColor(td, lDist), td);
				// emission
				sum += sum.a * vec4(sum.rgb, 0.0) * 0.4 * lDist * lDist;
				// uniform scale density
				col.a *= 0.2;
				// colour by alpha
				col.rgb *= col.a;
				// alpha blend in contribution
				sum = sum + col * (1.0 - sum.a) * smoothstep(0.6, 0.3, time);
			}

			td += 1. / 70.;

			if (veDITHERING) {
				// idea from https://www.shadertoy.com/view/lsj3Dw
				vec2 uvd = uv;
				uvd.y *= 120.;
				uvd.x *= 280.;
				float sine = sin(4. * time + uvd.y * 4.0);
				vec2 texUV = vec2(uvd.y, -uvd.x + 0.5 * sine);
				vec4 tex = texture(noise_1, texUV);
				d = abs(d) * (.8 + 0.08 * tex.r);
			}

			// trying to optimize step size
			if (veLOW_QUALITY) {
				t += max(d * 0.25, 0.01);
			} else {
				t += max(d * 0.08 * max(min(length(ldst), d), 2.0), 0.01);
			}
		}

		// simple scattering
		if (veLOW_QUALITY) {
			sum *= 1. / exp(ld * 0.2) * 0.9;
		} else {
			sum *= 1. / exp(ld * 0.2) * 0.8;
		}

		sum = clamp(sum, 0.0, 1.0);
		sum.xyz = sum.xyz * sum.xyz * (3.0 - 2.0 * sum.xyz);
	}

  gl_FragColor = vec4(sum.xyz, opacity);
}
