this.save = function(a, e) {
    var t = {
        normalProps: a.material.normalProps
    };
    PZ.archive.addFileString(e, JSON.stringify(t)),
    null !== a.material.map && null !== a.material.map.image && (CM.templates.saveWaiting++,
    PZ.textures.save(a.material.map.image, e + "_img", function() {
        CM.templates.saveWaiting--,
        CM.templates.saveComplete()
    }, !1))
}
,
this.load = function(a, e, t) {
    if (a.material = new THREE.MeshBasicMaterial({
        color: 16777215
    }),
    a.material.normalProps = {},
    a.material.normalProps.repeat = new THREE.Vector2(1,1),
    a.material.normalProps.side = 0,
    t && a.material.normalProps.repeat.set(.05, .05),
    "string" == typeof e) {
        var r = PZ.archive.getFileString(e);
        if (void 0 !== r) {
            var i = JSON.parse(r);
            PZ.extend(a.material.normalProps, i.normalProps)
        }
        PZ.textures.load(e + "_img", function(e) {
            a.material.map = new THREE.Texture(e),
            a.material.map.wrapS = a.material.map.wrapT = THREE.RepeatWrapping,
            a.material.map.repeat.copy(a.material.normalProps.repeat),
            a.material.map.needsUpdate = !0,
            a.material.needsUpdate = !0
        })
    } else
        "object" == typeof e && (PZ.extend(a.material.normalProps, e.material.normalProps),
        e.material.map && (a.material.map = new THREE.Texture(PZ.textures.clone(e.material.map.image)),
        a.material.map.wrapS = a.material.map.wrapT = THREE.RepeatWrapping,
        a.material.map.repeat.copy(a.material.normalProps.repeat),
        a.material.map.needsUpdate = !0,
        a.material.needsUpdate = !0));
    a.material.side = a.material.normalProps.side
}
,
this.unload = function(a) {
    null !== a.material && (null !== a.material.map && null !== a.material.map.image && PZ.textures.unload(a.material.map.image),
    a.material.dispose(),
    a.material = null)
}
,
this.select = function(a, e) {
    var t = a.material;
    PZ.editor.generateFileUpload({
        title: "Image",
        accept: "image/*",
        set: function(a) {
            a.files && a.files[0] && PZ.textures.load(a.files[0], function(a) {
                null !== t.map && (PZ.textures.unload(t.map.image),
                t.map.dispose(),
                t.map = null),
                t.map = new THREE.Texture(a),
                t.map.wrapS = t.map.wrapT = THREE.RepeatWrapping,
                t.map.repeat.copy(t.normalProps.repeat),
                t.map.needsUpdate = !0,
                t.needsUpdate = !0
            })
        }
    }, t).appendTo(e),
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
            return t.normalProps.repeat
        },
        set: function(a, e) {
            switch (e) {
            case 0:
                t.normalProps.repeat.x = a;
                break;
            case 1:
                t.normalProps.repeat.y = a
            }
            null !== t.map && t.map.repeat.copy(t.normalProps.repeat)
        }
    }, t).appendTo(e),
    PZ.editor.generateDropdown({
        title: "Render side",
        get: function() {
            return this.normalProps.side
        },
        set: function(a) {
            this.normalProps.side = a,
            this.side = a
        },
        items: "front;back;both"
    }, t).appendTo(e)
}
,
this.update = function(a) {}
;
