this.shaderfile = "fx_colorcorrection",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    powRGB: [{
        frame: 1,
        value: new THREE.Vector3(1,1,1),
        tweenfn: 0
    }],
    mulRGB: [{
        frame: 1,
        value: new THREE.Vector3(.8,.8,.8),
        tweenfn: 0
    }],
    addRGB: [{
        frame: 1,
        value: new THREE.Vector3(.08,.08,.08),
        tweenfn: 0
    }]
},
this.load = function(e) {
    if (this.pass = new THREE.ShaderPass(PZ.shaders.load(this.shaderfile, {
        tDiffuse: {
            type: "t",
            value: null
        },
        uvScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        },
        powRGB: {
            type: "v3",
            value: new THREE.Vector3(1,1,1)
        },
        mulRGB: {
            type: "v3",
            value: new THREE.Vector3(.8,.8,.8)
        },
        addRGB: {
            type: "v3",
            value: new THREE.Vector3(.08,.08,.08)
        }
    }),"tDiffuse"),
    this.pass.material.transparent = !0,
    this.pass.material.premultipliedAlpha = !0,
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        void 0 !== t && ($.extend(this.keyframeProps, JSON.parse(t)),
        PZ.keyframes.toVector3(this.keyframeProps.powRGB),
        PZ.keyframes.toVector3(this.keyframeProps.mulRGB),
        PZ.keyframes.toVector3(this.keyframeProps.addRGB))
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
    PZ.editor.generateTriInput({
        title: "Power",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.powRGB)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.powRGB)
        },
        vmax: 100,
        vmin: 0,
        vstep: .1,
        decimals: 2
    }, t).appendTo(e),
    PZ.editor.generateTriInput({
        title: "Multiply",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.mulRGB)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.mulRGB)
        },
        vmax: 100,
        vmin: 0,
        vstep: .1,
        decimals: 2
    }, t).appendTo(e),
    PZ.editor.generateTriInput({
        title: "Add",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.addRGB)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.addRGB)
        },
        vmax: 1,
        vmin: -1,
        vstep: .01,
        decimals: 2
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, e),
    this.pass.uniforms.powRGB.value.copy(TWEEN.getValue(this.keyframeProps.powRGB, e)),
    this.pass.uniforms.mulRGB.value.copy(TWEEN.getValue(this.keyframeProps.mulRGB, e)),
    this.pass.uniforms.addRGB.value.copy(TWEEN.getValue(this.keyframeProps.addRGB, e)))
}
,
this.resize = function() {}
;
