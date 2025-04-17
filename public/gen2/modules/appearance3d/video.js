var videoFrameEvent = "oncanplaythrough";
navigator.userAgent.indexOf("Edge") > -1 && (videoFrameEvent = "onseeked"),
this.save = function(e, a) {
    var r = {
        normalProps: e.material.normalProps,
        keyframeProps: e.material.keyframeProps
    };
    PZ.archive.addFileString(a, JSON.stringify(r))
}
,
this.load = function(e, a, r) {
    if (e.material = new THREE.MeshBasicMaterial({
        color: 16777215
    }),
    e.material.keyframeProps = {
        color: [{
            frame: 1,
            value: new THREE.Color(16777215),
            tweenfn: 0
        }],
        opacity: [{
            frame: 1,
            value: 1,
            tweenfn: 0
        }]
    },
    e.material.normalProps = {},
    e.material.normalProps.startOffset = 0,
    e.material.normalProps.startTime = 0,
    e.material.normalProps.repeat = new THREE.Vector2(1,1),
    e.material.normalProps.transparent = 0,
    e.material.normalProps.blending = 1,
    r && e.material.normalProps.repeat.set(.05, .05),
    "string" == typeof a) {
        var t = PZ.archive.getFileString(a);
        if (void 0 !== t) {
            var o = JSON.parse(t);
            PZ.extend(e.material.normalProps, o.normalProps),
            $.extend(e.material.keyframeProps, o.keyframeProps),
            PZ.keyframes.toColor(e.material.keyframeProps.color)
        }
    } else
        "object" == typeof a && (PZ.extend(e.material.normalProps, a.material.normalProps),
        e.material.keyframeProps = PZ.keyframes.cloneProps(a.material.keyframeProps),
        PZ.keyframes.toColor(e.material.keyframeProps.color));
    e.material.videoel = document.createElement("video"),
    e.material.map = new THREE.Texture(e.material.videoel),
    e.material.map.minFilter = THREE.LinearFilter,
    e.material.map.magFilter = THREE.LinearFilter,
    e.material.map.format = THREE.RGBFormat,
    e.material.map.generateMipmaps = !1,
    e.material.map.repeat.copy(e.material.normalProps.repeat),
    e.material.transparent = 1 === e.material.normalProps.transparent,
    e.material.blending = e.material.normalProps.blending
}
,
this.unload = function(e) {
    null !== e.material && (e.material.dispose(),
    e.material = null)
}
,
this.select = function(e, a) {
    var r = e.material;
    PZ.editor.generateFileUpload({
        title: "Video",
        accept: "video/*",
        set: function(a) {
            if (a.files && a.files[0]) {
                var t = a.files[0]
                  , o = t.type
                  , i = r.videoel.canPlayType(o);
                if ("no" === (i = "" === i ? "no" : i))
                    return;
                e.fileURL && URL.revokeObjectURL(e.fileURL),
                e.fileURL = URL.createObjectURL(t),
                r.videoel.autoplay = !1,
                r.videoel.preload = "auto",
                r.videoel.muted = !0,
                r.videoel.src = e.fileURL
            }
        }
    }, r).appendTo(a),
    PZ.editor.generateInput({
        title: "Start time (seconds)",
        get: function() {
            return this.normalProps.startTime
        },
        set: function(e) {
            this.normalProps.startTime = e
        },
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        decimals: 2,
        dragstep: .01
    }, r).appendTo(a),
    PZ.editor.generateInput({
        title: "Start offset (seconds)",
        get: function() {
            return this.normalProps.startOffset
        },
        set: function(e) {
            this.normalProps.startOffset = e
        },
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        decimals: 2,
        dragstep: .01
    }, r).appendTo(a),
    PZ.editor.generateColorPicker({
        title: "Color",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericColorGet(e, this.keyframeProps.color)
        },
        set: function(e, a) {
            return PZ.keyframes.genericColorSet(e, a, this.keyframeProps.color)
        },
        hasalpha: !1
    }, r).appendTo(a);
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
    }, r).appendTo(a),
    PZ.editor.generateInput({
        title: "Opacity",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.opacity)
        },
        set: function(e, a) {
            return PZ.keyframes.genericValueSet(e, a, this.keyframeProps.opacity)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        dragstep: .001,
        decimals: 2
    }, r).appendTo(t),
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
    }, r).appendTo(t),
    t.appendTo(a),
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
            return r.normalProps.repeat
        },
        set: function(e, a) {
            switch (a) {
            case 0:
                r.normalProps.repeat.x = e;
                break;
            case 1:
                r.normalProps.repeat.y = e
            }
            null !== r.map && r.map.repeat.copy(r.normalProps.repeat)
        }
    }, r).appendTo(a)
}
,
this.update = function(e, a) {
    if (e.material.color.copy(TWEEN.getValue(e.material.keyframeProps.color, CM.currentFrame)),
    e.material.opacity = TWEEN.getValue(e.material.keyframeProps.opacity, CM.currentFrame),
    a) {
        if ("" === e.material.videoel.src)
            return;
        CM.download.waitingPrepare++,
        e.material.videoel[videoFrameEvent] = function() {
            e.material.videoel[videoFrameEvent] = null,
            e.material.map.needsUpdate = !0,
            CM.download.waitingPrepare--,
            CM.download.finishVideoFrame()
        }
        ,
        e.material.videoel.currentTime = Math.max(e.material.normalProps.startOffset + CM.currentTime - e.material.normalProps.startTime, 0)
    } else
        !1 === CM.enablePlayFrames ? !1 === e.material.videoel.paused && e.material.videoel.pause() : Math.floor(CM.currentFrame) >= e.material.normalProps.startTime * CM.frameRate && !0 === e.material.videoel.paused && (e.material.videoel.currentTime = e.material.normalProps.startOffset,
        e.material.videoel.play()),
        e.material.videoel.readyState === e.material.videoel.HAVE_ENOUGH_DATA && (!1 === CM.enablePlayFrames && (e.material.videoel.currentTime = Math.max(e.material.normalProps.startOffset + CM.currentTime - e.material.normalProps.startTime, 0)),
        e.material.map.needsUpdate = !0)
}
;
