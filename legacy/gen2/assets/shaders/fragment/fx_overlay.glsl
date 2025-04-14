uniform sampler2D tDiffuse;
uniform sampler2D image;
uniform float opacity;
uniform vec2 offset;
uniform vec2 scale;

varying vec2 vUv;
varying vec2 vUvScaled;

/*
** Hue, saturation, luminance
*/

vec3 RGBToHSL(vec3 color)
{
	vec3 hsl; // init to 0 to avoid warnings ? (and reverse if + remove first part)

	float fmin = min(min(color.r, color.g), color.b);    //Min. value of RGB
	float fmax = max(max(color.r, color.g), color.b);    //Max. value of RGB
	float delta = fmax - fmin;             //Delta RGB value

	hsl.z = (fmax + fmin) / 2.0; // Luminance

	if (delta == 0.0)		//This is a gray, no chroma...
	{
		hsl.x = 0.0;	// Hue
		hsl.y = 0.0;	// Saturation
	}
	else                                    //Chromatic data...
	{
		if (hsl.z < 0.5)
			hsl.y = delta / (fmax + fmin); // Saturation
		else
			hsl.y = delta / (2.0 - fmax - fmin); // Saturation

		float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
		float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
		float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

		if (color.r == fmax )
			hsl.x = deltaB - deltaG; // Hue
		else if (color.g == fmax)
			hsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue
		else if (color.b == fmax)
			hsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue

		if (hsl.x < 0.0)
			hsl.x += 1.0; // Hue
		else if (hsl.x > 1.0)
			hsl.x -= 1.0; // Hue
	}

	return hsl;
}

float HueToRGB(float f1, float f2, float hue)
{
	if (hue < 0.0)
		hue += 1.0;
	else if (hue > 1.0)
		hue -= 1.0;
	float res;
	if ((6.0 * hue) < 1.0)
		res = f1 + (f2 - f1) * 6.0 * hue;
	else if ((2.0 * hue) < 1.0)
		res = f2;
	else if ((3.0 * hue) < 2.0)
		res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
	else
		res = f1;
	return res;
}

vec3 HSLToRGB(vec3 hsl)
{
	vec3 rgb;

	if (hsl.y == 0.0)
		rgb = vec3(hsl.z); // Luminance
	else
	{
		float f2;

		if (hsl.z < 0.5)
			f2 = hsl.z * (1.0 + hsl.y);
		else
			f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);

		float f1 = 2.0 * hsl.z - f2;

		rgb.r = HueToRGB(f1, f2, hsl.x + (1.0/3.0));
		rgb.g = HueToRGB(f1, f2, hsl.x);
		rgb.b= HueToRGB(f1, f2, hsl.x - (1.0/3.0));
	}

	return rgb;
}

void main() {

	vec2 coord = (vUvScaled - vec2(0.5, 0.5) - offset) / scale + vec2(0.5, 0.5);

	vec4 pixel = texture2D( image, coord );
	vec3 texel = pixel.rgb;
	float alpha = pixel.a;

	vec3 bg = texture2D( tDiffuse, vUvScaled ).rgb;

	vec2 inside = step(vec2(0.0, 0.0), coord) * (1.0 - step(vec2(1.0, 1.0), coord));

#if OVERLAY_BLEND==0 //none
	alpha = 1.0;
#elif OVERLAY_BLEND==1 //normal
	texel = texel;
#elif OVERLAY_BLEND==2 //add
	texel = min(bg + texel, 1.0);
#elif OVERLAY_BLEND==3 //subtract
	texel = max(bg - texel, 0.0);
#elif OVERLAY_BLEND==4 //multiply
	texel = bg * texel;
#elif OVERLAY_BLEND==5 //lighten
	texel = max(bg, texel);
#elif OVERLAY_BLEND==6 //darken
	texel = min(bg, texel);
#elif OVERLAY_BLEND==7 //hue
	vec3 hsl = RGBToHSL(bg);
	texel = HSLToRGB(vec3(RGBToHSL(texel).r, hsl.g, hsl.b));
#elif OVERLAY_BLEND==8 //saturation
	vec3 hsl = RGBToHSL(bg);
	texel = HSLToRGB(vec3(hsl.r, RGBToHSL(texel).g, hsl.b));
#elif OVERLAY_BLEND==9 //color
	vec3 hsl = RGBToHSL(texel);
	texel = HSLToRGB(vec3(hsl.r, hsl.g, RGBToHSL(bg).b));
#elif OVERLAY_BLEND==10 //luminosity
	vec3 hsl = RGBToHSL(bg);
	texel = HSLToRGB(vec3(hsl.r, hsl.g, RGBToHSL(texel).b));
#endif

	gl_FragColor = vec4(mix(bg, texel, inside.x * inside.y * opacity * alpha), 1.0);

}
