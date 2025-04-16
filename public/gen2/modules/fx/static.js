this.shaderfile = "fx_static",
this.normalProps = {
    blending: 1
},
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    size: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    amount: [{
        frame: 1,
        value: .5,
        tweenfn: 0
    }]
},
this.load = function(e) {
    if (this.pass = new THREE.ShaderPass(PZ.shaders.load(this.shaderfile, {
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
        size: {
            type: "f",
            value: 1
        },
        amount: {
            type: "f",
            value: .5
        },
        time: {
            type: "f",
            value: 0
        }
    }),"tDiffuse"),
    this.pass.material.premultipliedAlpha = !0,
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var s = JSON.parse(t);
            PZ.extend(this.normalProps, s.normalProps),
            $.extend(this.keyframeProps, s.keyframeProps)
        }
    }
    this.pass.material.defines = {
        NOISE_BLEND: this.normalProps.blending
    }
}
,
this.save = function(e) {
    var t = {
        normalProps: this.normalProps,
        keyframeProps: this.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(t))
}
,
this.clone = function() {
    var e = new this.constructor;
    return PZ.extend(e.normalProps, this.normalProps),
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
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
        title: "Blending mode",
        get: function(e) {
            return this.normalProps.blending
        },
        set: function(e, t) {
            this.normalProps.blending = e,
            this.pass.material.defines.NOISE_BLEND = this.normalProps.blending,
            this.pass.material.needsUpdate = !0
        },
        items: "none;add;subtract;multiply"
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Size",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.size)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.size)
        },
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        decimals: 0,
        dragstep: .1
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
    this.pass && (this.pass.uniforms.amount.value = TWEEN.getValue(this.keyframeProps.amount, e),
    this.pass.uniforms.size.value = TWEEN.getValue(this.keyframeProps.size, e),
    this.pass.uniforms.time.value = e,
    this.pass.enabled = TWEEN.getValue(this.keyframeProps.enabled, e) && 0 !== this.pass.uniforms.amount.value)
}
,
this.resize = function(e, t) {
    this.pass.uniforms.resolution.value.set(e, t)
}
;
