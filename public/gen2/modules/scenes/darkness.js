this.save = function(i) {
    var t = {
        intensity: CM.hemiLight.intensity
    };
    PZ.archive.addFileString(i, JSON.stringify(t))
}
,
this.load = function(i) {
    if (CM.hemiLight.intensity = 0,
    void 0 !== i) {
        var t = PZ.archive.getFileString(i);
        if (void 0 !== t) {
            var e = JSON.parse(t);
            CM.hemiLight.intensity = e.intensity || 0
        }
    }
}
,
this.unload = function() {
    CM.hemiLight.intensity = 1
}
,
this.select = function(i) {
    PZ.editor.generateTitle({
        title: "Darkness"
    }).appendTo(i),
    PZ.editor.generateDescription({
        content: "This scene disables the default lighting in the scene so it can be manually lit."
    }).appendTo(i),
    PZ.editor.generateInput({
        title: "Ambient light",
        get: function() {
            return CM.hemiLight.intensity
        },
        set: function(i) {
            CM.hemiLight.intensity = i
        },
        vmax: 1,
        vmin: 0,
        vstep: .1,
        decimals: 1,
        dragstep: .01
    }).appendTo(i)
}
,
this.update = function() {}
,
this.resize = function() {}
;
