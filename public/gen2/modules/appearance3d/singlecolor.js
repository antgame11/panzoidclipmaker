this.save = function(e, r) {
    var a = {
        keyframeProps: e.material.keyframeProps
    };
    PZ.archive.addFileString(r, JSON.stringify(a))
}
,
this.load = function(e, r) {
    if (e.material = new THREE.MeshBasicMaterial({
        color: 16777215
    }),
    e.material.keyframeProps = {
        color: [{
            frame: 1,
            value: new THREE.Color(16777215),
            tweenfn: 0
        }]
    },
    "string" == typeof r) {
        var a = PZ.archive.getFileString(r);
        if (void 0 !== a) {
            var o = JSON.parse(a);
            $.extend(e.material.keyframeProps, o.keyframeProps),
            PZ.keyframes.toColor(e.material.keyframeProps.color)
        }
    } else
        "object" == typeof r && (e.material.keyframeProps = PZ.keyframes.cloneProps(r.material.keyframeProps),
        PZ.keyframes.toColor(e.material.keyframeProps.color))
}
,
this.unload = function(e) {
    null !== e.material && (e.material.dispose(),
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
    }, a).appendTo(r)
}
,
this.update = function(e) {
    var r = e.material;
    r.color.copy(TWEEN.getValue(r.keyframeProps.color, CM.currentFrame))
}
;
