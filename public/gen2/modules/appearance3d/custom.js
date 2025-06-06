this.save = function(e, r) {
    var a = {
        normalProps: e.material.normalProps,
        keyframeProps: e.material.keyframeProps
    };
    PZ.archive.addFileString(r, JSON.stringify(a)),
    null !== e.material.map && null !== e.material.map.image && (CM.templates.saveWaiting++,
    PZ.textures.save(e.material.map.image, r + "_img0", function() {
        CM.templates.saveWaiting--,
        CM.templates.saveComplete()
    }, 0 !== e.material.normalProps.transparent)),
    null !== e.material.normalMap && null !== e.material.normalMap.image && (CM.templates.saveWaiting++,
    PZ.textures.save(e.material.normalMap.image, r + "_img1", function() {
        CM.templates.saveWaiting--,
        CM.templates.saveComplete()
    }, !0))
}
,
this.load = function(e, r, a) {
    e.material = new THREE.MeshStandardMaterial;
    var t = e.material;
    if (t.keyframeProps = {
        color: [{
            frame: 1,
            value: new THREE.Color(16777215),
            tweenfn: 0
        }],
        emissive: [{
            frame: 1,
            value: new THREE.Color(0),
            tweenfn: 0
        }],
        opacity: [{
            frame: 1,
            value: 1,
            tweenfn: 0
        }]
    },
    t.normalProps = {},
    t.normalProps.metalness = .5,
    t.normalProps.roughness = .5,
    t.normalProps.normalScale = 1,
    t.normalProps.repeat = new THREE.Vector2(1,1),
    t.normalProps.reflection = 0,
    t.normalProps.transparent = 0,
    t.normalProps.side = 0,
    t.normalProps.blending = 1,
    a && t.normalProps.repeat.set(.05, .05),
    "string" == typeof r) {
        var n = PZ.archive.getFileString(r);
        if (void 0 !== n) {
            var o = JSON.parse(n);
            PZ.extend(t.normalProps, o.normalProps),
            $.extend(t.keyframeProps, o.keyframeProps),
            PZ.keyframes.toColor(t.keyframeProps.color),
            PZ.keyframes.toColor(t.keyframeProps.emissive)
        }
        PZ.textures.load(r + "_img0", function(e) {
            t.map = new THREE.Texture(e),
            t.map.wrapS = t.map.wrapT = THREE.RepeatWrapping,
            t.map.repeat.copy(t.normalProps.repeat),
            t.map.needsUpdate = !0,
            t.needsUpdate = !0
        }),
        PZ.textures.load(r + "_img1", function(e) {
            t.normalMap = new THREE.Texture(e),
            t.normalMap.wrapS = t.normalMap.wrapT = THREE.RepeatWrapping,
            t.normalMap.repeat.copy(t.normalProps.repeat),
            t.normalMap.needsUpdate = !0,
            t.needsUpdate = !0
        })
    } else
        "object" == typeof r && (PZ.extend(t.normalProps, r.material.normalProps),
        t.keyframeProps = PZ.keyframes.cloneProps(r.material.keyframeProps),
        PZ.keyframes.toColor(t.keyframeProps.color),
        PZ.keyframes.toColor(t.keyframeProps.emissive),
        r.material.map && (t.map = new THREE.Texture(PZ.textures.clone(r.material.map.image)),
        t.map.wrapS = t.map.wrapT = THREE.RepeatWrapping,
        t.map.repeat.copy(t.normalProps.repeat),
        t.map.needsUpdate = !0,
        t.needsUpdate = !0),
        r.material.normalMap && (t.normalMap = new THREE.Texture(PZ.textures.clone(r.material.normalMap.image)),
        t.normalMap.wrapS = t.normalMap.wrapT = THREE.RepeatWrapping,
        t.normalMap.repeat.copy(t.normalProps.repeat),
        t.normalMap.needsUpdate = !0,
        t.needsUpdate = !0));
    t.roughness = t.normalProps.roughness,
    t.metalness = t.normalProps.metalness,
    t.transparent = 1 === t.normalProps.transparent,
    t.side = t.normalProps.side,
    t.blending = t.normalProps.blending,
    t.normalScale.set(t.normalProps.normalScale, t.normalProps.normalScale),
    this.initReflection(e)
}
,
this.unload = function(e) {
    null !== e.material && (null !== e.material.map && null !== e.material.map.image && PZ.textures.unload(e.material.map.image),
    null !== e.material.normalMap && null !== e.material.normalMap.image && PZ.textures.unload(e.material.normalMap.image),
    1 === e.material.normalProps.reflection && (e.material.normalProps.reflection = 0,
    this.initReflection(e)),
    e.material.dispose(),
    e.material = null)
}
,
this.select = function(e, r) {
    var a = e.material;
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
    }, a).appendTo(r),
    PZ.editor.generateColorPicker({
        title: "Emissive",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericColorGet(e, this.keyframeProps.emissive)
        },
        set: function(e, r) {
            return PZ.keyframes.genericColorSet(e, r, this.keyframeProps.emissive)
        },
        hasalpha: !1
    }, a).appendTo(r),
    PZ.editor.generateInput({
        title: "Roughness",
        get: function() {
            return this.normalProps.roughness
        },
        set: function(e) {
            this.normalProps.roughness = e,
            this.roughness = e
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, a).appendTo(r),
    PZ.editor.generateInput({
        title: "Metalness",
        get: function() {
            return this.normalProps.metalness
        },
        set: function(e) {
            this.normalProps.metalness = e,
            this.metalness = e
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, a).appendTo(r),
    PZ.editor.generateSpacer().appendTo(r),
    PZ.editor.generateFileUpload({
        title: "Texture",
        accept: "image/*",
        set: function(e) {
            e.files && e.files[0] && PZ.textures.load(e.files[0], function(e) {
                null !== a.map && (PZ.textures.unload(a.map.image),
                a.map.dispose(),
                a.map = null),
                a.map = new THREE.Texture(e),
                a.map.wrapS = a.map.wrapT = THREE.RepeatWrapping,
                a.map.repeat.copy(a.normalProps.repeat),
                a.map.needsUpdate = !0,
                a.needsUpdate = !0
            })
        }
    }, a).appendTo(r);
    var t = PZ.editor.generatePlaceholder();
    PZ.editor.generateDropdown({
        title: "Transparency",
        get: function() {
            return 1 == this.normalProps.transparent ? t.show() : t.hide(),
            this.normalProps.transparent
        },
        set: function(e) {
            this.normalProps.transparent = e,
            this.transparent = 1 === e,
            1 == this.normalProps.transparent ? t.show() : t.hide()
        },
        items: "off;on"
    }, a).appendTo(r),
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
    }, a).appendTo(t),
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
    }, a).appendTo(t),
    t.appendTo(r),
    PZ.editor.generateDropdown({
        title: "Render side",
        get: function() {
            return this.normalProps.side
        },
        set: function(e) {
            this.normalProps.side = e,
            this.side = e
        },
        items: "front;back;both"
    }, a).appendTo(r),
    PZ.editor.generateFileUpload({
        title: "Normal map",
        accept: "image/*",
        set: function(e) {
            e.files && e.files[0] && PZ.textures.load(e.files[0], function(e) {
                null !== a.normalMap && (PZ.textures.unload(a.normalMap.image),
                a.normalMap.dispose(),
                a.normalMap = null),
                a.normalMap = new THREE.Texture(e),
                a.normalMap.wrapS = a.normalMap.wrapT = THREE.RepeatWrapping,
                a.normalMap.repeat.copy(a.normalProps.repeat),
                a.normalMap.needsUpdate = !0,
                a.needsUpdate = !0
            })
        }
    }, a).appendTo(r),
    PZ.editor.generateInput({
        title: "Normal scale",
        get: function() {
            return this.normalProps.normalScale
        },
        set: function(e) {
            this.normalProps.normalScale = e,
            this.normalScale.set(e, e)
        },
        vmax: 2,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, a).appendTo(r),
    PZ.editor.generateDualInput({
        title: "Repeat",
        subtitle1: "u",
        subtitle2: "v",
        vmax: 1e4,
        vmin: 0,
        vstep: .1,
        decimals: 3,
        dragstep: .001,
        get: function() {
            return a.normalProps.repeat
        },
        set: function(e, r) {
            switch (r) {
            case 0:
                a.normalProps.repeat.x = e;
                break;
            case 1:
                a.normalProps.repeat.y = e
            }
            null !== a.map && a.map.repeat.copy(a.normalProps.repeat),
            null !== a.normalMap && a.normalMap.repeat.copy(a.normalProps.repeat)
        }
    }, a).appendTo(r),
    PZ.editor.generateSpacer().appendTo(r),
    PZ.editor.generateDropdown({
        title: "Reflection",
        get: function() {
            return a.normalProps.reflection
        },
        set: function(r) {
            a.normalProps.reflection = r,
            this.initReflection(e)
        },
        items: "off;on"
    }, this).appendTo(r)
}
,
this.update = function(e) {
    var r = e.material;
    r.color.copy(TWEEN.getValue(r.keyframeProps.color, CM.currentFrame)),
    r.emissive.copy(TWEEN.getValue(r.keyframeProps.emissive, CM.currentFrame)),
    r.opacity = TWEEN.getValue(r.keyframeProps.opacity, CM.currentFrame)
}
,
this.initReflection = function(e) {
    var r = e.material;
    if (1 === r.normalProps.reflection)
        CM.reflection ? CM.reflection.refs.push(e) : (CM.reflection = {},
        CM.reflection.refs = [e],
        CM.reflection.mirrorCubeCamera = new THREE.CubeCamera(.1,5e3,256),
        CM.reflection.mirrorCubeCamera.traverse(function(e) {
            e.layers.set(10)
        }),
        CM.scene.add(CM.reflection.mirrorCubeCamera)),
        r.envMap = CM.reflection.mirrorCubeCamera.renderTarget.texture,
        r.needsUpdate = !0;
    else {
        if (CM.reflection) {
            for (var a = 0; a < CM.reflection.refs.length; a++)
                if (CM.reflection.refs[a] === e) {
                    CM.reflection.refs.splice(a, 1);
                    break
                }
            0 === CM.reflection.refs.length && (CM.scene.remove(r.mirrorCubeCamera),
            CM.reflection.mirrorCubeCamera.renderTarget.dispose(),
            CM.reflection.mirrorCubeCamera = null,
            CM.reflection = null)
        }
        r.envMap = null,
        r.needsUpdate = !0
    }
}
;
