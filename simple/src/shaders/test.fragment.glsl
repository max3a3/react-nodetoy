// Created with NodeToy | Three.js r149

// <node_builder>

// uniforms

// attributes

// varys
varying vec2 nodeVary0;
// vars
vec2 nodeVar0;
float nodeVar1;
vec3 nodeVar2;
// codes
vec3 mod2D289_YHmzUPZAkje6(vec3 x) {
	return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod2D289_YHmzUPZAkje6(vec2 x) {
	return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute_YHmzUPZAkje6(vec3 x) {
	return mod2D289_YHmzUPZAkje6(((x * 34.0) + 1.0) * x);
}

float snoise_YHmzUPZAkje6(vec2 v) {
	const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
	vec2 i = floor(v + dot(v, C.yy));
	vec2 x0 = v - i + dot(i, C.xx);
	vec2 i1;
	i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
	vec4 x12 = x0.xyxy + C.xxzz;
	x12.xy -= i1;
	i = mod2D289_YHmzUPZAkje6(i);
	vec3 p = permute_YHmzUPZAkje6(permute_YHmzUPZAkje6(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
	vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
	m = m * m;
	m = m * m;
	vec3 x = 2.0 * fract(p * C.www) - 1.0;
	vec3 h = abs(x) - 0.5;
	vec3 ox = floor(x + 0.5);
	vec3 a0 = x - ox;
	m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
	vec3 g;
	g.x = a0.x * x0.x + h.x * x0.y;
	g.yz = a0.yz * x12.xz + h.yz * x12.yw;
	return 130.0 * dot(m, g);
}
float customFn_ANako0IQZEFF(vec2 uv, float scale) {

	float noise = snoise_YHmzUPZAkje6(uv * scale);

	noise = noise * 0.5 + 0.5;
	return noise;

}

// variables
// </node_builder>

#ifndef FLAT_SHADED

varying vec3 vNormal;

#endif

#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2(const in float x) {
	return x * x;
}
vec3 pow2(const in vec3 x) {
	return x * x;
}
float pow3(const in float x) {
	return x * x * x;
}
float pow4(const in float x) {
	float x2 = x * x;
	return x2 * x2;
}
float max3(const in vec3 v) {
	return max(max(v.x, v.y), v.z);
}
float average(const in vec3 v) {
	return dot(v, vec3(0.3333333));
}

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand(const in vec2 uv) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot(uv.xy, vec2(a, b)), sn = mod(dt, PI);

	return fract(sin(sn) * c);

}

#ifdef HIGH_PRECISION
float precisionSafeLength(vec3 v) {
	return length(v);
}
#else
float precisionSafeLength(vec3 v) {
	float maxComponent = max3(abs(v));
	return length(v / maxComponent) * maxComponent;
}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};

vec3 transformDirection(in vec3 dir, in mat4 matrix) {

	return normalize((matrix * vec4(dir, 0.0)).xyz);

}

vec3 inverseTransformDirection(in vec3 dir, in mat4 matrix) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize((vec4(dir, 0.0) * matrix).xyz);

}

mat3 transposeMat3(const in mat3 m) {

	mat3 tmp;

	tmp[0] = vec3(m[0].x, m[1].x, m[2].x);
	tmp[1] = vec3(m[0].y, m[1].y, m[2].y);
	tmp[2] = vec3(m[0].z, m[1].z, m[2].z);

	return tmp;

}

float luminance(const in vec3 rgb) {

	// assumes rgb is in linear color space with sRGB primaries and D65 white point

	const vec3 weights = vec3(0.2126729, 0.7151522, 0.0721750);

	return dot(weights, rgb);

}

bool isPerspectiveMatrix(mat4 m) {

	return m[2][3] == -1.0;

}

vec2 equirectUv(in vec3 dir) {

	// dir is assumed to be unit length

	float u = atan(dir.z, dir.x) * RECIPROCAL_PI2 + 0.5;

	float v = asin(clamp(dir.y, -1.0, 1.0)) * RECIPROCAL_PI + 0.5;

	return vec2(u, v);

}

#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
vec3 dithering(vec3 color) {
		//Calculate grid position
	float grid_position = rand(gl_FragCoord.xy);

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
	vec3 dither_shift_RGB = vec3(0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0);

		//modify shift according to grid position.
	dither_shift_RGB = mix(2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position);

		//shift the color by dither_shift
	return color + dither_shift_RGB;
}

#endif

#if defined( USE_COLOR_ALPHA )

varying vec4 vColor;

#elif defined( USE_COLOR )

varying vec3 vColor;

#endif

#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )

varying vec2 vUv;

#endif

#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

varying vec2 vUv2;

#endif

#ifdef USE_MAP

uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

uniform sampler2D alphaMap;

#endif

#ifdef USE_ALPHATEST
uniform float alphaTest;
#endif

#ifdef USE_AOMAP

uniform sampler2D aoMap;
uniform float aoMapIntensity;

#endif

#ifdef USE_LIGHTMAP

uniform sampler2D lightMap;
uniform float lightMapIntensity;

#endif

#ifdef USE_ENVMAP

uniform float envMapIntensity;
uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
	#else
uniform sampler2D envMap;
	#endif

#endif

#ifdef USE_ENVMAP

uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

varying vec3 vWorldPosition;
uniform float refractionRatio;
	#else
varying vec3 vReflect;
	#endif

#endif

#ifdef USE_FOG

uniform vec3 fogColor;
varying float vFogDepth;

	#ifdef FOG_EXP2

uniform float fogDensity;

	#else

uniform float fogNear;
uniform float fogFar;

	#endif

#endif

#ifdef USE_SPECULARMAP

uniform sampler2D specularMap;

#endif

#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

uniform float logDepthBufFC;
varying float vFragDepth;
varying float vIsPerspective;

#endif

#if NUM_CLIPPING_PLANES > 0

varying vec3 vClipPosition;

uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];

#endif

void main() {

#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#pragma unroll_loop_start
	for(int i = 0; i < UNION_CLIPPING_PLANES; i++) {

		plane = clippingPlanes[i];
		if(dot(vClipPosition, plane.xyz) > plane.w)
			discard;

	}
	#pragma unroll_loop_end

	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

	bool clipped = true;

		#pragma unroll_loop_start
	for(int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i++) {

		plane = clippingPlanes[i];
		clipped = (dot(vClipPosition, plane.xyz) > plane.w) && clipped;

	}
		#pragma unroll_loop_end

	if(clipped)
		discard;

	#endif

#endif

	vec4 diffuseColor = vec4(0.0);

#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2(vFragDepth) * logDepthBufFC * 0.5;

#endif

#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D(map, vUv);

	#ifdef DECODE_VIDEO_TEXTURE

		// inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)

	sampledDiffuseColor = vec4(mix(pow(sampledDiffuseColor.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), sampledDiffuseColor.rgb * 0.0773993808, vec3(lessThanEqual(sampledDiffuseColor.rgb, vec3(0.04045)))), sampledDiffuseColor.w);

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif

#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif

	nodeVar0 = (nodeVary0 * vec2(1, 1) + vec2(0, 0));
	nodeVar1 = customFn_ANako0IQZEFF(nodeVar0, 4.0);
	nodeVar2 = (nodeVar1 * vec3(1, 1, 1));

	diffuseColor = vec4(nodeVar2, 1.0);

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D(alphaMap, vUv).g;

#endif

#ifdef USE_ALPHATEST

	if(diffuseColor.a < alphaTest)
		discard;

#endif

	float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D(specularMap, vUv);
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif

	ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D(lightMap, vUv2);
	reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

	reflectedLight.indirectDiffuse += vec3(1.0);

	#endif

	// modulation

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

	vec3 cameraToFrag;

	if(isOrthographic) {

		cameraToFrag = normalize(vec3(-viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2]));

	} else {

		cameraToFrag = normalize(vWorldPosition - cameraPosition);

	}

		// Transforming Normal Vectors with the Inverse Transformation
	vec3 worldNormal = inverseTransformDirection(normal, viewMatrix);

		#ifdef ENVMAP_MODE_REFLECTION

	vec3 reflectVec = reflect(cameraToFrag, worldNormal);

		#else

	vec3 reflectVec = refract(cameraToFrag, worldNormal, refractionRatio);

		#endif

	#else

	vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

	vec4 envColor = textureCube(envMap, vec3(flipEnvMap * reflectVec.x, reflectVec.yz));

	#else

	vec4 envColor = vec4(0.0);

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

	outgoingLight = mix(outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity);

	#elif defined( ENVMAP_BLENDING_MIX )

	outgoingLight = mix(outgoingLight, envColor.xyz, specularStrength * reflectivity);

	#elif defined( ENVMAP_BLENDING_ADD )

	outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif

#ifdef OPAQUE
	diffuseColor.a = 1.0;
#endif

// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
	diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif

	gl_FragColor = vec4(outgoingLight, diffuseColor.a);

#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);

#endif

	gl_FragColor = linearToOutputTexel(gl_FragColor);

#ifdef USE_FOG

	#ifdef FOG_EXP2

	float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);

	#else

	float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);

	#endif

	gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);

#endif

#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif

#ifdef DITHERING

	gl_FragColor.rgb = dithering(gl_FragColor.rgb);

#endif

}
