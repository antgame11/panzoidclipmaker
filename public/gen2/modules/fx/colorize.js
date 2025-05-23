this.shaderfile = "fx_colorize",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    color: [{
        frame: 1,
        value: new THREE.Color(1,0,0),
        tweenfn: 0
    }],
    amount: [{
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
        color: {
            type: "v3",
            value: new THREE.Vector3(1,0,0)
        },
        amount: {
            type: "f",
            value: 1
        }
    }),"tDiffuse"),
    this.pass.material.premultipliedAlpha = !0,
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        void 0 !== t && ($.extend(this.keyframeProps, JSON.parse(t)),
        PZ.keyframes.toColor(this.keyframeProps.color))
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
    PZ.editor.generateColorPicker({
        title: "Color",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericColorGet(e, this.keyframeProps.color)
        },
        set: function(e, t) {
            return PZ.keyframes.genericColorSet(e, t, this.keyframeProps.color)
        },
        hasalpha: !1
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
        vmax: 1,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .01
    }, t).appendTo(e)
}
,
this.update = function(e) {
    if (this.pass) {
        var t = TWEEN.getValue(this.keyframeProps.color, e);
        this.pass.uniforms.color.value.set(t.r, t.g, t.b),
        this.pass.uniforms.amount.value = TWEEN.getValue(this.keyframeProps.amount, e),
        this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && 0 !== this.pass.uniforms.amount.value
    }
}
,
this.resize = function() {}
;
