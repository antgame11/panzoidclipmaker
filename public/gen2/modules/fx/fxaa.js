this.shaderfile = "fx_fxaa",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
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
        resolution: {
            type: "v2",
            value: new THREE.Vector2(1,1)
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
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, e))
}
,
this.resize = function(e, t, s) {
    this.pass.uniforms.resolution.value.set(1 / e / s, 1 / t / s)
}
;
