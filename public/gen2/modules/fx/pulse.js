this.shaderfile = "fx_pulse",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    time: [{
        frame: 1,
        value: 0,
        tweenfn: 0
    }, {
        frame: 15,
        value: 1,
        tweenfn: 1
    }],
    amplitude: [{
        frame: 1,
        value: 300,
        tweenfn: 0
    }],
    size: [{
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
        time: {
            type: "f",
            value: 0
        },
        amplitude: {
            type: "f",
            value: 300
        },
        size: {
            type: "f",
            value: .5
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
        title: "Time",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.time)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.time)
        },
        vmax: 5e3,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .01
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Amplitude",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.amplitude)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.amplitude)
        },
        vmax: 1e3,
        vmin: 0,
        vstep: .1,
        decimals: 1,
        dragstep: .5
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
        vmax: 2,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .001
    }, t).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.uniforms.time.value = TWEEN.getValue(this.keyframeProps.time, e),
    this.pass.uniforms.amplitude.value = TWEEN.getValue(this.keyframeProps.amplitude, e),
    this.pass.uniforms.size.value = TWEEN.getValue(this.keyframeProps.size, e),
    this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && this.pass.uniforms.time.value % 1 != 0)
}
,
this.resize = function(e, t) {
    this.pass.uniforms.resolution.value.set(e, t)
}
;
