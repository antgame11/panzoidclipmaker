this.shaderfile = "fx_wavy",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    amount: [{
        frame: 1,
        value: 3,
        tweenfn: 0
    }],
    size: [{
        frame: 1,
        value: 25,
        tweenfn: 0
    }],
    time: [{
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
        amount: {
            type: "f",
            value: 3
        },
        size: {
            type: "f",
            value: 25
        },
        time: {
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
    PZ.editor.generateInput({
        title: "Amount",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.amount)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.amount)
        },
        vmax: 50,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .05
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Density",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.size)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.size)
        },
        vmax: 200,
        vmin: 0,
        vstep: .2,
        decimals: 2,
        dragstep: .1
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Time",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.time)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.time)
        },
        vmax: 1e4,
        vmin: 0,
        vstep: .2,
        decimals: 2,
        dragstep: .1
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.uniforms.amount.value = TWEEN.getValue(this.keyframeProps.amount, e),
    this.pass.uniforms.size.value = TWEEN.getValue(this.keyframeProps.size, e),
    this.pass.uniforms.time.value = TWEEN.getValue(this.keyframeProps.time, e),
    this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && 0 !== this.pass.uniforms.amount.value)
}
,
this.resize = function(e, t) {}
;
