this.shaderfile = "fx_pixelated",
this.keyframeProps = {
    enabled: [{
        frame: 1,
        value: 1,
        tweenfn: 0
    }],
    size: [{
        frame: 1,
        value: new THREE.Vector2(16,9),
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
            type: "v2",
            value: new THREE.Vector2(16,9)
        }
    }),"tDiffuse"),
    this.pass.material.premultipliedAlpha = !0,
    "string" == typeof e) {
        var s = PZ.archive.getFileString(e);
        void 0 !== s && ($.extend(this.keyframeProps, JSON.parse(s)),
        PZ.keyframes.toVector2(this.keyframeProps.size))
    }
}
,
this.save = function(e) {
    var s = this.keyframeProps;
    PZ.archive.addFileString(e, JSON.stringify(s))
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
    var s = this;
    PZ.editor.generateDropdown({
        title: "Enabled",
        keyframed: !0,
        tweens: !1,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.enabled)
        },
        set: function(e, s) {
            return PZ.keyframes.genericDropDownSet(e, s, this.keyframeProps.enabled)
        },
        items: "off;on"
    }, s).appendTo(e),
    PZ.editor.generateDualInput({
        title: "Pixel size",
        keyframed: !0,
        tweens: !0,
        subtitle1: "width",
        subtitle2: "height",
        get: function(e) {
            return PZ.keyframes.genericVector2Get(e, this.keyframeProps.size)
        },
        set: function(e, s) {
            return PZ.keyframes.genericVector2Set(e, s, this.keyframeProps.size)
        },
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        dragstep: .1,
        decimals: 0
    }, s).appendTo(e)
}
,
this.update = function(e) {
    this.pass && (this.pass.uniforms.size.value = TWEEN.getValue(this.keyframeProps.size, e),
    this.pass.enabled = 1 === TWEEN.getValue(this.keyframeProps.enabled, e) && (1 !== this.pass.uniforms.size.value.x || 1 !== this.pass.uniforms.size.value.y))
}
,
this.resize = function(e, s) {
    this.pass.uniforms.resolution.value.set(e, s)
}
;
