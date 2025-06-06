this.save = function(a, e) {
    var r = {
        normalProps: a.material.normalProps
    };
    PZ.archive.addFileString(e, JSON.stringify(r))
}
,
this.load = function(a, e, r) {
    if (a.material = new THREE.MeshStandardMaterial({
        color: 16777215,
        roughness: .3,
        metalness: .8
    }),
    a.material.normalProps = {},
    a.material.normalProps.repeat = 1,
    r && (a.material.normalProps.repeat = .05),
    "string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var n = JSON.parse(t);
            PZ.extend(a.material.normalProps, n.normalProps)
        }
    } else
        "object" == typeof e && PZ.extend(a.material.normalProps, e.material.normalProps);
    var o = new THREE.TextureLoader;
    a.material.map = o.load("assets/textures/object/alien_d.bmp", function(e) {
        e.wrapS = e.wrapT = THREE.RepeatWrapping,
        e.repeat.set(a.material.normalProps.repeat, a.material.normalProps.repeat)
    }),
    a.material.normalMap = o.load("assets/textures/object/alien_n.bmp", function(e) {
        e.wrapS = e.wrapT = THREE.RepeatWrapping,
        e.repeat.set(a.material.normalProps.repeat, a.material.normalProps.repeat)
    })
}
,
this.unload = function(a) {
    null !== a.material && (a.material.dispose(),
    a.material = null)
}
,
this.select = function(a, e) {
    var r = a.material;
    PZ.editor.generateInput({
        title: "Repeat",
        get: function() {
            return r.normalProps.repeat
        },
        set: function(a) {
            r.normalProps.repeat = a,
            null !== r.map && r.map.repeat.set(r.normalProps.repeat, r.normalProps.repeat)
        },
        vmax: 1e4,
        vmin: 0,
        vstep: .1,
        decimals: 3,
        dragstep: .001
    }, r).appendTo(e)
}
,
this.update = function(a) {}
;
