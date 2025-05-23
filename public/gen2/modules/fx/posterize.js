this.shaderfile = "fx_posterize",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    gamma: [{
        frame: 1,
        value: .6,
        tweenfn: 0
    }],
    regions: [{
        frame: 1,
        value: 8,
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
        gamma: {
            type: "f",
            value: .6
        },
        regions: {
            type: "f",
            value: 8
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
        title: "Gamma",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.gamma)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.gamma)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        decimals: 2,
        dragstep: .001
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Colors",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.regions)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.regions)
        },
        vmax: 1e3,
        vmin: 1,
        vstep: .1,
        decimals: 1,
        dragstep: .01
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, e),
    this.pass.uniforms.gamma.value = TWEEN.getValue(this.keyframeProps.gamma, e),
    this.pass.uniforms.regions.value = TWEEN.getValue(this.keyframeProps.regions, e))
}
,
this.resize = function() {}
;
