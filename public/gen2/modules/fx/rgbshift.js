this.shaderfile = "fx_rgbshift",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    amount: [{
        frame: 1,
        value: .005,
        tweenfn: 0
    }],
    angle: [{
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
            value: .005
        },
        angle: {
            type: "f",
            value: 0
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
        title: "Amount",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.amount)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.amount)
        },
        vmax: 100,
        vmin: 0,
        vstep: .01,
        decimals: 3,
        dragstep: .001
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Angle",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.angle)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.angle)
        },
        vmax: 100,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .01
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.uniforms.amount.value = TWEEN.getValue(this.keyframeProps.amount, e),
    this.pass.uniforms.angle.value = TWEEN.getValue(this.keyframeProps.angle, e),
    this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && 0 !== this.pass.uniforms.amount.value)
}
,
this.resize = function() {}
;
