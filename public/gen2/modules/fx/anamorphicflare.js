this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    amount: [{
        frame: 1,
        value: .8,
        tweenfn: 0
    }],
    strength: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    radius: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    threshold: [{
        frame: 1,
        value: .5,
        tweenfn: 0
    }],
    inner: [{
        frame: 1,
        value: new THREE.Color(16777215),
        tweenfn: 0
    }],
    outer: [{
        frame: 1,
        value: new THREE.Color(16777215),
        tweenfn: 0
    }]
},
THREE.LuminosityHighPassShader || (THREE.LuminosityHighPassShader = {
    shaderID: "luminosityHighPass",
    uniforms: {
        uvScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        },
        tDiffuse: {
            type: "t",
            value: null
        },
        luminosityThreshold: {
            type: "f",
            value: 1
        },
        smoothWidth: {
            type: "f",
            value: 1
        },
        defaultColor: {
            type: "c",
            value: new THREE.Color(0)
        },
        defaultOpacity: {
            type: "f",
            value: 0
        }
    },
    vertexShader: ["uniform vec2 uvScale;", "varying vec2 vUv;", "varying vec2 vUvScaled;", "void main() {", "vUv = uv / uvScale;", "vUvScaled = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUvScaled;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUvScaled );", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float v = dot( texel.xyz, luma );", "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")
}),
THREE.ALFPass || (THREE.ALFPass = function(t, e, r, i) {
    THREE.Pass.call(this),
    this.strength = void 0 !== e ? e : 1,
    this.radius = r,
    this.threshold = i,
    this.resolution = void 0 !== t ? new THREE.Vector2(t.x,t.y) : new THREE.Vector2(256,256),
    this.uniforms = {
        uvScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        }
    };
    var a = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
    };
    this.renderTargetsHorizontal = [],
    this.renderTargetsVertical = [],
    this.nMips = 5;
    var o = Math.round(this.resolution.x / 2)
      , s = this.resolution.y;
    this.renderTargetBright = new THREE.WebGLRenderTarget(o,s,a),
    this.renderTargetBright.texture.generateMipmaps = !1;
    for (h = 0; h < this.nMips; h++) {
        var n = new THREE.WebGLRenderTarget(o,s,a);
        n.texture.generateMipmaps = !1,
        this.renderTargetsHorizontal.push(n),
        (n = new THREE.WebGLRenderTarget(o,s,a)).texture.generateMipmaps = !1,
        this.renderTargetsVertical.push(n),
        o = Math.round(o / 2)
    }
    void 0 === THREE.LuminosityHighPassShader && console.error("THREE.ALFPass relies on THREE.LuminosityHighPassShader");
    var l = THREE.LuminosityHighPassShader;
    this.highPassUniforms = THREE.UniformsUtils.clone(l.uniforms),
    this.highPassUniforms.luminosityThreshold.value = i,
    this.highPassUniforms.smoothWidth.value = .01,
    this.highPassUniforms.uvScale.value.copy(this.uniforms.uvScale.value),
    this.materialHighPassFilter = new THREE.ShaderMaterial({
        uniforms: this.highPassUniforms,
        vertexShader: l.vertexShader,
        fragmentShader: l.fragmentShader,
        defines: {}
    }),
    this.separableBlurMaterials = [];
    for (var u = [3, 5, 7, 9, 11], o = Math.round(this.resolution.x / 2), s = this.resolution.y, h = 0; h < this.nMips; h++)
        this.separableBlurMaterials.push(this.getSeperableBlurMaterial(u[h])),
        this.separableBlurMaterials[h].uniforms.texSize.value = new THREE.Vector2(o,s),
        o = Math.round(o / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips),
    this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture,
    this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture,
    this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture,
    this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture,
    this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture,
    this.compositeMaterial.uniforms.bloomStrength.value = e,
    this.compositeMaterial.uniforms.bloomRadius.value = .1,
    this.compositeMaterial.needsUpdate = !0;
    var m = [1, .8, .6, .4, .2];
    this.compositeMaterial.uniforms.bloomFactors.value = m,
    this.bloomTintColors = [new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1)],
    this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors,
    void 0 === THREE.CopyShader && console.error("THREE.BloomPass relies on THREE.CopyShader");
    var f = THREE.CopyShader;
    this.copyUniforms = THREE.UniformsUtils.clone(f.uniforms),
    this.copyUniforms.opacity.value = 1,
    this.materialCopy = new THREE.ShaderMaterial({
        uniforms: this.copyUniforms,
        vertexShader: f.vertexShader,
        fragmentShader: f.fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
    }),
    this.enabled = !0,
    this.needsSwap = !1,
    this.oldClearColor = new THREE.Color,
    this.oldClearAlpha = 1,
    this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
    this.scene = new THREE.Scene,
    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),
    this.scene.add(this.quad)
}
,
THREE.ALFPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
    constructor: THREE.ALFPass,
    dispose: function() {
        for (t = 0; t < this.renderTargetsHorizontal.length(); t++)
            this.renderTargetsHorizontal[t].dispose();
        for (var t = 0; t < this.renderTargetsVertical.length(); t++)
            this.renderTargetsVertical[t].dispose();
        this.renderTargetBright.dispose()
    },
    setSize: function(t, e) {
        var r = Math.round(t / 2)
          , i = e;
        this.renderTargetBright.setSize(r, i);
        for (var a = 0; a < this.nMips; a++)
            this.renderTargetsHorizontal[a].setSize(r, i),
            this.renderTargetsVertical[a].setSize(r, i),
            this.separableBlurMaterials[a].uniforms.texSize.value = new THREE.Vector2(r,i),
            r = Math.round(r / 2),
            i = Math.round(i)
    },
    render: function(t, e, r, i, a) {
        this.oldClearColor.copy(t.getClearColor()),
        this.oldClearAlpha = t.getClearAlpha();
        var o = t.autoClear;
        t.autoClear = !1,
        t.setClearColor(new THREE.Color(0,0,0), 0),
        a && t.context.disable(t.context.STENCIL_TEST),
        this.highPassUniforms.tDiffuse.value = r.texture,
        this.highPassUniforms.luminosityThreshold.value = this.threshold,
        this.quad.material = this.materialHighPassFilter,
        t.render(this.scene, this.camera, this.renderTargetBright, !0);
        for (var s = this.renderTargetBright, n = 0; n < this.nMips; n++)
            this.quad.material = this.separableBlurMaterials[n],
            this.separableBlurMaterials[n].uniforms.colorTexture.value = s.texture,
            this.separableBlurMaterials[n].uniforms.direction.value = THREE.ALFPass.BlurDirectionX,
            t.render(this.scene, this.camera, this.renderTargetsHorizontal[n], !0),
            this.separableBlurMaterials[n].uniforms.colorTexture.value = this.renderTargetsHorizontal[n].texture,
            this.separableBlurMaterials[n].uniforms.direction.value = THREE.ALFPass.BlurDirectionY,
            t.render(this.scene, this.camera, this.renderTargetsVertical[n], !0),
            s = this.renderTargetsVertical[n];
        this.quad.material = this.compositeMaterial,
        this.compositeMaterial.uniforms.bloomStrength.value = this.strength,
        this.compositeMaterial.uniforms.bloomRadius.value = this.radius,
        this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors,
        t.render(this.scene, this.camera, this.renderTargetsHorizontal[0], !0),
        this.quad.material = this.materialCopy,
        this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture,
        a && t.context.enable(t.context.STENCIL_TEST),
        t.render(this.scene, this.camera, r, !1),
        t.setClearColor(this.oldClearColor, this.oldClearAlpha),
        t.autoClear = o
    },
    getSeperableBlurMaterial: function(t) {
        return new THREE.ShaderMaterial({
            defines: {
                KERNEL_RADIUS: t,
                SIGMA: t
            },
            uniforms: {
                colorTexture: {
                    value: null
                },
                texSize: {
                    value: new THREE.Vector2(.5,.5)
                },
                direction: {
                    value: new THREE.Vector2(.5,.5)
                }
            },
            vertexShader: "varying vec2 vUv;\n  \t\t\t\tvoid main() {\n  \t\t\t\t\tvUv = uv;\n  \t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  \t\t\t\t}",
            fragmentShader: "#include <common>  \t\t\t\tvarying vec2 vUv;\n  \t\t\t\tuniform sampler2D colorTexture;\n  \t\t\t\tuniform vec2 texSize;  \t\t\t\tuniform vec2 direction;  \t\t\t\t  \t\t\t\tfloat gaussianPdf(in float x, in float sigma) {  \t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;  \t\t\t\t}  \t\t\t\tvoid main() {\n  \t\t\t\t\tvec2 invSize = 1.0 / texSize;  \t\t\t\t\tfloat fSigma = float(SIGMA);  \t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);  \t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;  \t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {  \t\t\t\t\t\tfloat x = float(i);  \t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);  \t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;  \t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;  \t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;  \t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;  \t\t\t\t\t\tweightSum += 2.0 * w;  \t\t\t\t\t}  \t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n  \t\t\t\t}"
        })
    },
    getCompositeMaterial: function(t) {
        return new THREE.ShaderMaterial({
            defines: {
                NUM_MIPS: t
            },
            uniforms: {
                blurTexture1: {
                    value: null
                },
                blurTexture2: {
                    value: null
                },
                blurTexture3: {
                    value: null
                },
                blurTexture4: {
                    value: null
                },
                blurTexture5: {
                    value: null
                },
                dirtTexture: {
                    value: null
                },
                bloomStrength: {
                    value: 1
                },
                bloomFactors: {
                    value: null
                },
                bloomTintColors: {
                    value: null
                },
                bloomRadius: {
                    value: 0
                }
            },
            vertexShader: "varying vec2 vUv;\n  \t\t\t\tvoid main() {\n  \t\t\t\t\tvUv = uv;\n  \t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  \t\t\t\t}",
            fragmentShader: "varying vec2 vUv;  \t\t\t\tuniform sampler2D blurTexture1;  \t\t\t\tuniform sampler2D blurTexture2;  \t\t\t\tuniform sampler2D blurTexture3;  \t\t\t\tuniform sampler2D blurTexture4;  \t\t\t\tuniform sampler2D blurTexture5;  \t\t\t\tuniform sampler2D dirtTexture;  \t\t\t\tuniform float bloomStrength;  \t\t\t\tuniform float bloomRadius;  \t\t\t\tuniform float bloomFactors[NUM_MIPS];  \t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];  \t\t\t\t  \t\t\t\tfloat lerpBloomFactor(const in float factor) {   \t\t\t\t\tfloat mirrorFactor = 1.2 - factor;  \t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);  \t\t\t\t}  \t\t\t\t  \t\t\t\tvoid main() {  \t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +   \t\t\t\t\t \t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +   \t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +   \t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +   \t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );  \t\t\t\t}"
        })
    }
}),
THREE.ALFPass.BlurDirectionX = new THREE.Vector2(1,0),
THREE.ALFPass.BlurDirectionY = new THREE.Vector2(0,1)),
this.load = function(t) {
    if (this.pass = new THREE.ALFPass(new THREE.Vector2(1,1),1.5,.4,.85),
    "string" == typeof t) {
        var e = PZ.archive.getFileString(t);
        void 0 !== e && ($.extend(this.keyframeProps, JSON.parse(e)),
        PZ.keyframes.toColor(this.keyframeProps.inner),
        PZ.keyframes.toColor(this.keyframeProps.outer))
    }
}
,
this.save = function(t) {
    var e = this.keyframeProps;
    PZ.archive.addFileString(t, JSON.stringify(e))
}
,
this.clone = function() {
    var t = new this.constructor;
    return t.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    t
}
,
this.unload = function(t) {}
,
this.select = function(t) {
    var e = this;
    PZ.editor.generateDropdown({
        title: "Enabled",
        keyframed: !0,
        tweens: !1,
        get: function(t) {
            return PZ.keyframes.genericValueGet(t, this.keyframeProps.enabled)
        },
        set: function(t, e) {
            return PZ.keyframes.genericValueSet(t, e, this.keyframeProps.enabled)
        },
        items: "off;on"
    }, e).appendTo(t),
    PZ.editor.generateInput({
        title: "Amount",
        keyframed: !0,
        tweens: !0,
        get: function(t) {
            return PZ.keyframes.genericValueGet(t, this.keyframeProps.amount)
        },
        set: function(t, e) {
            return PZ.keyframes.genericValueSet(t, e, this.keyframeProps.amount)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        decimals: 2,
        dragstep: .001
    }, e).appendTo(t),
    PZ.editor.generateColorPicker({
        title: "Inner glow",
        keyframed: !0,
        tweens: !0,
        get: function(t) {
            return PZ.keyframes.genericColorGet(t, this.keyframeProps.inner)
        },
        set: function(t, e) {
            return PZ.keyframes.genericColorSet(t, e, this.keyframeProps.inner)
        },
        hasalpha: !1
    }, e).appendTo(t),
    PZ.editor.generateColorPicker({
        title: "Outer glow",
        keyframed: !0,
        tweens: !0,
        get: function(t) {
            return PZ.keyframes.genericColorGet(t, this.keyframeProps.outer)
        },
        set: function(t, e) {
            return PZ.keyframes.genericColorSet(t, e, this.keyframeProps.outer)
        },
        hasalpha: !1
    }, e).appendTo(t),
    PZ.editor.generateInput({
        title: "Strength",
        keyframed: !0,
        tweens: !0,
        get: function(t) {
            return PZ.keyframes.genericValueGet(t, this.keyframeProps.strength)
        },
        set: function(t, e) {
            return PZ.keyframes.genericValueSet(t, e, this.keyframeProps.strength)
        },
        vmax: 3,
        vmin: 0,
        vstep: .01,
        decimals: 2,
        dragstep: .001
    }, e).appendTo(t),
    PZ.editor.generateInput({
        title: "Radius",
        keyframed: !0,
        tweens: !0,
        get: function(t) {
            return PZ.keyframes.genericValueGet(t, this.keyframeProps.radius)
        },
        set: function(t, e) {
            return PZ.keyframes.genericValueSet(t, e, this.keyframeProps.radius)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        decimals: 2,
        dragstep: .001
    }, e).appendTo(t),
    PZ.editor.generateInput({
        title: "Threshold",
        keyframed: !0,
        tweens: !0,
        get: function(t) {
            return PZ.keyframes.genericValueGet(t, this.keyframeProps.threshold)
        },
        set: function(t, e) {
            return PZ.keyframes.genericValueSet(t, e, this.keyframeProps.threshold)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        decimals: 2,
        dragstep: .001
    }, e).appendTo(t)
}
,
this.update = function(t) {
    if (this.pass) {
        this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, t),
        this.pass.copyUniforms.opacity.value = TWEEN.getValue(this.keyframeProps.amount, t),
        this.pass.strength = TWEEN.getValue(this.keyframeProps.strength, t),
        this.pass.radius = TWEEN.getValue(this.keyframeProps.radius, t),
        this.pass.threshold = TWEEN.getValue(this.keyframeProps.threshold, t);
        var e = TWEEN.getValue(this.keyframeProps.inner, t);
        this.pass.bloomTintColors[0].set(e.r, e.g, e.b),
        this.pass.bloomTintColors[1].set(e.r, e.g, e.b),
        this.pass.bloomTintColors[2].set(e.r, e.g, e.b),
        e = TWEEN.getValue(this.keyframeProps.outer, t),
        this.pass.bloomTintColors[3].set(e.r, e.g, e.b),
        this.pass.bloomTintColors[4].set(e.r, e.g, e.b)
    }
}
,
this.resize = function(t, e, r) {
    this.pass.setSize(Math.round(t * r), Math.round(e * r))
}
;
