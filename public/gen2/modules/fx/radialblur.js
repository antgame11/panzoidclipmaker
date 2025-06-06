this.shaderfile = "fx_radialblur",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    decay: [{
        frame: 1,
        value: .9,
        tweenfn: 0
    }],
    density: [{
        frame: 1,
        value: .5,
        tweenfn: 0
    }],
    weight: [{
        frame: 1,
        value: .09,
        tweenfn: 0
    }],
    center: [{
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
        decay: {
            type: "f",
            value: .97
        },
        density: {
            type: "f",
            value: .5
        },
        weight: {
            type: "f",
            value: .09
        },
        center: {
            type: "v2",
            value: new THREE.Vector2(0,0)
        }
    }),"tDiffuse"),
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        void 0 !== t && ($.extend(this.keyframeProps, JSON.parse(t)),
        PZ.keyframes.toVector2(this.keyframeProps.center))
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
        title: "Decay",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.decay)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.decay)
        },
        vmax: 1,
        vmin: 0,
        vstep: .05,
        decimals: 3,
        dragstep: .001
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Density",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.density)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.density)
        },
        vmax: 1,
        vmin: 0,
        vstep: .05,
        decimals: 3,
        dragstep: .001
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Weight",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.weight)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.weight)
        },
        vmax: 1,
        vmin: 0,
        vstep: .05,
        decimals: 3,
        dragstep: .001
    }, t).appendTo(e),
    PZ.editor.generateDualInput({
        title: "Center",
        keyframed: !0,
        tweens: !0,
        subtitle1: "x",
        subtitle2: "y",
        get: function(e) {
            return PZ.keyframes.genericVector2Get(e, this.keyframeProps.center)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector2Set(e, t, this.keyframeProps.center)
        },
        vmax: 1,
        vmin: -1,
        vstep: .05,
        dragstep: .001,
        decimals: 3
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, e),
    this.pass.uniforms.decay.value = TWEEN.getValue(this.keyframeProps.decay, e),
    this.pass.uniforms.density.value = TWEEN.getValue(this.keyframeProps.density, e),
    this.pass.uniforms.weight.value = TWEEN.getValue(this.keyframeProps.weight, e),
    this.pass.uniforms.center.value.copy(TWEEN.getValue(this.keyframeProps.center, e)))
}
,
this.resize = function() {}
;
