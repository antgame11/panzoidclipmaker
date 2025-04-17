this.uniforms = {
    color: {
        type: "c",
        value: new THREE.Color(16777215)
    },
    time: {
        type: "f",
        value: 0
    },
    zoom: {
        type: "f",
        value: 0
    },
    seed: {
        type: "f",
        value: 0
    },
    noise: {
        type: "f",
        value: 0
    },
    noise_0: {
        type: "t",
        value: null
    },
    noise_1: {
        type: "t",
        value: null
    },
    opacity: {
        type: "f",
        value: 1
    }
},
this.save = function(e, r) {
    var t = {
        normalProps: e.material.normalProps,
        keyframeProps: e.material.keyframeProps
    };
    PZ.archive.addFileString(r, JSON.stringify(t))
}
,
this.load = function(e, r) {
    e.material = PZ.shaders.load("shockwave", this.uniforms);
    var t = e.material;
    t.keyframeProps = {
        color: [{
            frame: 1,
            value: new THREE.Color(PZ.random.color()),
            tweenfn: 0
        }],
        time: [{
            frame: 1,
            value: 0,
            tweenfn: 0
        }],
        opacity: [{
            frame: 1,
            value: 1,
            tweenfn: 0
        }]
    };
    var o = new THREE.TextureLoader;
    if (t.uniforms.noise_0.value = o.load("assets/textures/noise/bw64.png"),
    t.normalProps = {
        zoom: PZ.random.number(2, 6),
        noise: PZ.random.number(0, 2),
        seed: PZ.random.number(0, 100, !0),
        transparent: 0,
        blending: 1
    },
    "string" == typeof r) {
        var n = PZ.archive.getFileString(r);
        if (void 0 !== n) {
            var a = JSON.parse(n);
            PZ.extend(t.normalProps, a.normalProps),
            $.extend(t.keyframeProps, a.keyframeProps),
            PZ.keyframes.toColor(t.keyframeProps.color)
        }
    } else
        "object" == typeof r && (PZ.extend(t.normalProps, r.material.normalProps),
        t.keyframeProps = PZ.keyframes.cloneProps(r.material.keyframeProps),
        PZ.keyframes.toColor(t.keyframeProps.color));
    t.uniforms.zoom.value = t.normalProps.zoom,
    t.uniforms.noise.value = t.normalProps.noise,
    t.uniforms.seed.value = t.normalProps.seed,
    t.transparent = 1 === e.material.normalProps.transparent,
    t.blending = e.material.normalProps.blending
}
,
this.unload = function(e) {
    PZ.shaders.unload("shockwave"),
    null !== e.material && (e.material.dispose(),
    e.material = null)
}
,
this.select = function(e, r) {
    var t = e.material;
    PZ.editor.generateColorPicker({
        title: "Color",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericColorGet(e, this.keyframeProps.color)
        },
        set: function(e, r) {
            return PZ.keyframes.genericColorSet(e, r, this.keyframeProps.color)
        },
        hasalpha: !1
    }, t).appendTo(r),
    PZ.editor.generateInput({
        title: "Time",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.time)
        },
        set: function(e, r) {
            return PZ.keyframes.genericValueSet(e, r, this.keyframeProps.time)
        },
        vmax: 1e4,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, t).appendTo(r),
    PZ.editor.generateInput({
        title: "Distance",
        get: function() {
            return this.normalProps.zoom
        },
        set: function(e) {
            this.normalProps.zoom = e,
            this.uniforms.zoom.value = e
        },
        vmax: 100,
        vmin: -100,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, t).appendTo(r),
    PZ.editor.generateInput({
        title: "Seed",
        get: function() {
            return this.normalProps.seed
        },
        set: function(e) {
            this.normalProps.seed = e,
            this.uniforms.seed.value = e
        },
        vmax: 20,
        vmin: 0,
        vstep: .01,
        dragstep: .01,
        decimals: 2
    }, t).appendTo(r),
    PZ.editor.generateInput({
        title: "Noise",
        get: function() {
            return this.normalProps.noise
        },
        set: function(e) {
            this.normalProps.noise = e,
            this.uniforms.noise.value = e
        },
        vmax: 30,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 3
    }, t).appendTo(r);
    var o = PZ.editor.generatePlaceholder();
    PZ.editor.generateDropdown({
        title: "Transparency",
        get: function() {
            return 1 == this.normalProps.transparent ? o.show() : o.hide(),
            this.normalProps.transparent
        },
        set: function(e) {
            this.normalProps.transparent = e,
            this.transparent = 1 === e,
            1 == this.normalProps.transparent ? o.show() : o.hide()
        },
        items: "off;on"
    }, t).appendTo(r),
    PZ.editor.generateInput({
        title: "Opacity",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.opacity)
        },
        set: function(e, r) {
            return PZ.keyframes.genericValueSet(e, r, this.keyframeProps.opacity)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, t).appendTo(o),
    PZ.editor.generateDropdown({
        title: "Blending mode",
        get: function() {
            return this.normalProps.blending
        },
        set: function(e) {
            this.normalProps.blending = e,
            this.blending = e
        },
        items: "none;normal;additive;subtractive;multiply"
    }, t).appendTo(o),
    o.appendTo(r)
}
,
this.update = function(e) {
    var r = e.material;
    r.uniforms.color.value.copy(TWEEN.getValue(r.keyframeProps.color, CM.currentFrame)),
    r.uniforms.time.value = TWEEN.getValue(r.keyframeProps.time, CM.currentFrame),
    r.uniforms.opacity.value = TWEEN.getValue(r.keyframeProps.opacity, CM.currentFrame)
}
;
