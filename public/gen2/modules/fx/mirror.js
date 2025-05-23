this.shaderfile = "fx_mirror",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    mode: [{
        frame: 1,
        value: 0,
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
        left: {
            type: "f",
            value: 2
        },
        right: {
            type: "f",
            value: 0
        },
        top: {
            type: "f",
            value: 0
        },
        bottom: {
            type: "f",
            value: 0
        }
    }),"tDiffuse"),
    this.pass.material.premultipliedAlpha = !0,
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
    PZ.editor.generateDropdown({
        title: "Mode",
        keyframed: !0,
        tweens: !1,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.mode)
        },
        set: function(e, t) {
            return PZ.keyframes.genericDropDownSet(e, t, this.keyframeProps.mode)
        },
        items: "left;right;top;bottom;left + top;right + top;left + bottom;right + bottom"
    }, t).appendTo(e)
}
,
this.update = function(e) {
    if (this.pass) {
        this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, e);
        var t = TWEEN.getValue(this.keyframeProps.mode, e);
        this.pass.uniforms.left.value = 0 === t || 4 === t || 6 === t ? 2 : 0,
        this.pass.uniforms.right.value = 1 === t || 5 === t || 7 === t ? 2 : 0,
        this.pass.uniforms.top.value = 2 === t || 4 === t || 5 === t ? 2 : 0,
        this.pass.uniforms.bottom.value = 3 === t || 6 === t || 7 === t ? 2 : 0
    }
}
,
this.resize = function(e, t) {}
;
