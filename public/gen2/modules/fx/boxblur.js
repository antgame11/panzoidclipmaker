this.shaderfile = "fx_boxblur",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    delta: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }]
},
THREE.BoxBlurPass || (THREE.BoxBlurPass = function(e, t) {
    this.material_h = e,
    this.material_v = e.clone(),
    this.material_h.transparent = !0,
    this.material_h.premultipliedAlpha = !0,
    this.material_v.transparent = !0,
    this.material_v.premultipliedAlpha = !0,
    this.material_h.defines = {
        BLUR_DIR: 0
    },
    this.material_v.defines = {
        BLUR_DIR: 1
    },
    this.uniforms = this.material_h.uniforms = this.material_v.uniforms,
    this.renderToScreen = !1,
    this.enabled = !0,
    this.needsSwap = !1,
    this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
    this.scene = new THREE.Scene,
    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),
    this.scene.add(this.quad)
}
,
THREE.BoxBlurPass.prototype = {
    render: function(e, t, s, a) {
        this.quad.material = this.material_v,
        this.uniforms.tDiffuse.value = s.texture,
        e.render(this.scene, this.camera, t, a),
        this.quad.material = this.material_h,
        this.uniforms.tDiffuse.value = t.texture,
        e.render(this.scene, this.camera, s, a)
    }
}),
this.load = function(e) {
    if (this.pass = new THREE.BoxBlurPass(PZ.shaders.load(this.shaderfile, {
        tDiffuse: {
            type: "t",
            value: null
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        },
        uvScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        },
        delta: {
            type: "f",
            value: 1
        }
    }),"tDiffuse"),
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        void 0 !== t && $.extend(this.keyframeProps, JSON.parse(t))
    }
}
,
this.save = function(e) {
    var t = this.keyframeProps;
    PZ.archive.addFileString(e, JSON.stringify(t))
}
,
this.clone = function() {
    var e = new this.constructor;
    return e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    e
}
,
this.unload = function(e) {
    PZ.shaders.unload(this.shaderfile)
}
,
this.select = function(e) {
    var t = this;
    PZ.editor.generateDropdown({
        title: "Enabled",
        keyframed: !0,
        tweens: !1,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.enabled)
        },
        set: function(e, t) {
            return PZ.keyframes.genericDropDownSet(e, t, this.keyframeProps.enabled)
        },
        items: "off;on"
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Delta",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.delta)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.delta)
        },
        vmax: 10,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .005
    }, t).appendTo(e)
}
,
this.update = function(e) {
    if (this.pass) {
        var t = TWEEN.getValue(this.keyframeProps.delta, e);
        this.pass.uniforms.delta.value = t,
        this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && 0 !== t
    }
}
,
this.resize = function(e, t) {
    this.pass.uniforms.resolution.value.set(e, t)
}
;
