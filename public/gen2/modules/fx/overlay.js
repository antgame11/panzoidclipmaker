this.shaderfile = "fx_overlay",
this.normalProps = {
    blending: 1
},
this.keyframeProps = {
    offset: [{
        frame: 1,
        value: new THREE.Vector2(0,0),
        tweenfn: 0
    }],
    scale: [{
        frame: 1,
        value: new THREE.Vector2(1,1),
        tweenfn: 0
    }],
    opacity: [{
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
        image: {
            type: "t",
            value: null
        },
        offset: {
            type: "v2",
            value: new THREE.Vector2(0,0)
        },
        scale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        },
        opacity: {
            type: "f",
            value: 1
        }
    }),"tDiffuse"),
    "string" == typeof e) {
        var s = PZ.archive.getFileString(e);
        if (void 0 !== s) {
            var t = JSON.parse(s);
            PZ.extend(this.normalProps, t.normalProps),
            $.extend(this.keyframeProps, t.keyframeProps),
            PZ.keyframes.toVector2(this.keyframeProps.scale),
            PZ.keyframes.toVector2(this.keyframeProps.offset)
        }
        a = this.pass;
        PZ.textures.load(e + "_img0", function(e) {
            a.uniforms.image.value = new THREE.Texture(e),
            a.uniforms.image.value.needsUpdate = !0,
            a.material.needsUpdate = !0
        })
    } else if ("object" == typeof e) {
        var a = this.pass;
        e.pass.uniforms.image.value && (a.uniforms.image.value = new THREE.Texture(PZ.textures.clone(e.pass.uniforms.image.value.image)),
        a.uniforms.image.value.minFilter = THREE.LinearFilter,
        a.uniforms.image.value.magFilter = THREE.LinearFilter,
        a.uniforms.image.value.needsUpdate = !0,
        a.material.needsUpdate = !0)
    }
    this.pass.material.defines = {
        OVERLAY_BLEND: this.normalProps.blending
    }
}
,
this.save = function(e) {
    var s = {
        normalProps: this.normalProps,
        keyframeProps: this.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(s)),
    null !== this.pass.uniforms.image.value && (CM.templates.saveWaiting++,
    PZ.textures.save(this.pass.uniforms.image.value.image, e + "_img0", function() {
        CM.templates.saveWaiting--,
        CM.templates.saveComplete()
    }, 0 !== this.normalProps.blending))
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
    null !== this.pass.uniforms.image.value && PZ.textures.unload(this.pass.uniforms.image.value.image),
    PZ.shaders.unload(this.shaderfile)
}
,
this.select = function(e) {
    var s = this;
    PZ.editor.generateFileUpload({
        title: "Image",
        accept: "image/*",
        set: function(e) {
            e.files && e.files[0] && PZ.textures.load(e.files[0], function(e) {
                null !== s.pass.uniforms.image.value && (PZ.textures.unload(s.pass.uniforms.image.value.image),
                s.pass.uniforms.image.value.dispose(),
                s.pass.uniforms.image.value = null),
                s.pass.uniforms.image.value = new THREE.Texture(e),
                s.pass.uniforms.image.value.minFilter = THREE.LinearFilter,
                s.pass.uniforms.image.value.magFilter = THREE.LinearFilter,
                s.pass.uniforms.image.value.needsUpdate = !0,
                s.pass.material.needsUpdate = !0
            })
        }
    }, s).appendTo(e),
    PZ.editor.generateDropdown({
        title: "Blending mode",
        get: function(e) {
            return this.normalProps.blending
        },
        set: function(e, s) {
            this.normalProps.blending = e,
            this.pass.material.defines.OVERLAY_BLEND = this.normalProps.blending,
            this.pass.material.needsUpdate = !0
        },
        items: "none;normal;add;subtract;multiply;lighten;darken;hue;saturation;color;luminosity"
    }, s).appendTo(e),
    PZ.editor.generateDualInput({
        title: "Offset",
        keyframed: !0,
        tweens: !0,
        subtitle1: "x",
        subtitle2: "y",
        get: function(e) {
            return PZ.keyframes.genericVector2Get(e, this.keyframeProps.offset)
        },
        set: function(e, s) {
            return PZ.keyframes.genericVector2Set(e, s, this.keyframeProps.offset)
        },
        vmax: 1e3,
        vmin: -1e3,
        vstep: .05,
        dragstep: .001,
        decimals: 3
    }, s).appendTo(e),
    PZ.editor.generateDualInput({
        title: "Scale",
        keyframed: !0,
        tweens: !0,
        subtitle1: "x",
        subtitle2: "y",
        get: function(e) {
            return PZ.keyframes.genericVector2Get(e, this.keyframeProps.scale)
        },
        set: function(e, s) {
            return PZ.keyframes.genericVector2Set(e, s, this.keyframeProps.scale)
        },
        vmax: 10,
        vmin: -10,
        vstep: .05,
        dragstep: .001,
        decimals: 3
    }, s).appendTo(e),
    PZ.editor.generateInput({
        title: "Opacity",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.opacity)
        },
        set: function(e, s) {
            return PZ.keyframes.genericValueSet(e, s, this.keyframeProps.opacity)
        },
        vmax: 1,
        vmin: 0,
        vstep: .1,
        decimals: 2,
        dragstep: .01
    }, s).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.uniforms.opacity.value = TWEEN.getValue(this.keyframeProps.opacity, e),
    this.pass.uniforms.scale.value.copy(TWEEN.getValue(this.keyframeProps.scale, e)),
    this.pass.uniforms.offset.value.copy(TWEEN.getValue(this.keyframeProps.offset, e)),
    this.pass.enabled = 0 !== this.pass.uniforms.opacity.value)
}
,
this.resize = function(e, s) {}
;
