this.shaderfile = "fx_duplicate",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    multiplier: [{
        frame: 1,
        value: 3,
        tweenfn: 0
    }],
    offset: [{
        frame: 1,
        value: new THREE.Vector2(0,0),
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
        multiplier: {
            type: "f",
            value: 3
        },
        offset: {
            type: "v2",
            value: new THREE.Vector2(0,0)
        }
    }),"tDiffuse"),
    this.pass.material.premultipliedAlpha = !0,
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        void 0 !== t && ($.extend(this.keyframeProps, JSON.parse(t)),
        PZ.keyframes.toVector2(this.keyframeProps.offset))
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
        title: "Multiplier",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.multiplier)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.multiplier)
        },
        vmax: 500,
        vmin: .001,
        vstep: .01,
        decimals: 3,
        dragstep: .005
    }, t).appendTo(e),
    PZ.editor.generateDualInput({
        title: "Offset",
        keyframed: !0,
        tweens: !0,
        subtitle1: "x",
        subtitle2: "y",
        get: function(e) {
            return PZ.keyframes.genericVector2Get(e, this.keyframeProps.offset)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector2Set(e, t, this.keyframeProps.offset)
        },
        vmax: 1e3,
        vmin: -1e3,
        vstep: .05,
        dragstep: .001,
        decimals: 3
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.uniforms.multiplier.value = TWEEN.getValue(this.keyframeProps.multiplier, e),
    this.pass.uniforms.offset.value.copy(TWEEN.getValue(this.keyframeProps.offset, e)),
    this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && (1 !== this.pass.uniforms.multiplier.value || 0 !== this.pass.uniforms.offset.value.x || 0 !== this.pass.uniforms.offset.value.y))
}
,
this.resize = function() {}
;
