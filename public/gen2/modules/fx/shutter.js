this.shaderfile = "fx_shutter",
this.mode = 1,
this.keyframeProps = {
    color: [{
        frame: 1,
        value: new THREE.Color(0),
        tweenfn: 0
    }],
    opacity: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    covered: [{
        frame: 1,
        value: .25,
        tweenfn: 0
    }],
    angle: [{
        frame: 1,
        value: .5 * Math.PI,
        tweenfn: 0
    }],
    fade: [{
        frame: 1,
        value: .001,
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
        color: {
            type: "v3",
            value: new THREE.Vector3(0,0,0)
        },
        opacity: {
            type: "f",
            value: 1
        },
        covered: {
            type: "f",
            value: .25
        },
        angle: {
            type: "f",
            value: 0
        },
        fade: {
            type: "f",
            value: .5 * Math.PI
        }
    }),"tDiffuse"),
    this.pass.material.premultipliedAlpha = !0,
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var r = JSON.parse(t);
            void 0 !== r.mode && (this.mode = r.mode,
            delete r.mode),
            $.extend(this.keyframeProps, r),
            PZ.keyframes.toColor(this.keyframeProps.color)
        }
    }
    this.pass.material.defines = {
        SHUTTER_TYPE: 2 & this.mode,
        SHUTTER_SIDE: 1 & this.mode
    }
}
,
this.save = function(e) {
    this.keyframeProps.mode = this.mode;
    var t = this.keyframeProps;
    PZ.archive.addFileString(e, JSON.stringify(t)),
    delete this.keyframeProps.mode
}
,
this.clone = function() {
    var e = new this.constructor;
    return e.mode = this.mode,
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
        title: "Mode",
        get: function(e) {
            return this.mode
        },
        set: function(e, t) {
            this.mode = e,
            this.pass.material.defines.SHUTTER_TYPE = 2 & e,
            this.pass.material.defines.SHUTTER_SIDE = 1 & e,
            this.pass.material.needsUpdate = !0
        },
        items: "linear;linear doublesided;radial"
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
        title: "Opacity",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.opacity)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.opacity)
        },
        vmax: 1,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .01
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Cover",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.covered)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.covered)
        },
        vmax: 1,
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
            return PZ.keyframes.genericRotationGet(e, this.keyframeProps.angle)
        },
        set: function(e, t) {
            return PZ.keyframes.genericRotationSet(e, t, this.keyframeProps.angle)
        },
        vmax: 1e3,
        vmin: 0,
        vstep: 1,
        decimals: 1,
        dragstep: .5
    }, t).appendTo(e),
    PZ.editor.generateInput({
        title: "Fade",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.fade)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.fade)
        },
        vmax: 1,
        vmin: 0,
        vstep: .005,
        decimals: 3,
        dragstep: .001
    }, t).appendTo(e)
}
,
this.update = function(e) {
    if (this.pass) {
        var t = TWEEN.getValue(this.keyframeProps.color, e);
        this.pass.uniforms.color.value.set(t.r, t.g, t.b),
        this.pass.uniforms.opacity.value = TWEEN.getValue(this.keyframeProps.opacity, e),
        this.pass.uniforms.covered.value = TWEEN.getValue(this.keyframeProps.covered, e),
        this.pass.uniforms.angle.value = TWEEN.getValue(this.keyframeProps.angle, e),
        this.pass.uniforms.fade.value = TWEEN.getValue(this.keyframeProps.fade, e),
        this.pass.enabled = 0 !== this.pass.uniforms.opacity.value
    }
}
,
this.resize = function(e, t) {
    this.pass.uniforms.resolution.value.set(e, t)
}
;
