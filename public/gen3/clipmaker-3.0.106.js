const PZTOOLVERSION = "3.0.106";
var CM = new PZ.ui.editor;
CM.name = "Clipmaker";
var BG = {};
async function initTool() {
    CM.setUpEditor();
    let t = await CM.getCreationFromUrl();
    CM.init(t),
    CM.enabled = !0
}
CM.setUpEditor = function(e) {
    CM.playback = new PZ.ui.playback(CM),
    CM.playback.loop = !0;
    let t = CM.createMainWindow()
      , i = new PZ.ui.ad(CM)
      , a = [{
        title: "new (ctrl-m)",
        icon: "new",
        fn: function() {
            CM.new()
        }
    }, {
        title: "open (ctrl-o)",
        icon: "load",
        fn: function() {
            CM.open()
        }
    }, {
        title: "save (ctrl-s)",
        icon: "save",
        fn: function() {
            CM.save()
        }
    }, {
        separator: !0
    }, {
        title: "undo (ctrl-z)",
        icon: "undo",
        fn: function() {
            CM.history.undo()
        }
    }, {
        title: "redo (ctrl-y)",
        icon: "redo",
        fn: function() {
            CM.history.redo()
        }
    }]
      , r = new PZ.ui.toolbar(CM,a)
      , o = new PZ.ui.timeline(CM);
    o.tracks.videoTrackSize = 30,
    o.tracks.audioTrackSize = 50,
    o.timeFormat = 2,
    o.zoom = .3;
    let s = new PZ.ui.edit(CM,{
        childFilter: e => e instanceof PZ.propertyList,
        keyframePanel: o.keyframes
    });
    s.title = "Sequence",
    s.icon = "sequence",
    CM.onSequenceChanged.watch( () => {
        let e = new PZ.objectList;
        e.push(CM.sequence),
        s.objects = e
    }
    );
    let n = new PZ.ui.edit(CM,{
        childFilter: e => e instanceof PZ.propertyList || e instanceof PZ.object || e instanceof PZ.objectList && e.type === PZ.property.dynamic,
        emptyMessage: "select a clip",
        showListItemButtons: !1,
        keyframePanel: o.keyframes
    });
    n.title = "Edit",
    n.icon = "edit2",
    n.objects = o.tracks.selection;
    let c = new PZ.ui.edit(CM,{
        childFilter: e => e instanceof PZ.objectList && e.type === PZ.object3d,
        columnLayout: 1,
        showListItemButtons: !1,
        emptyMessage: "select a clip",
        objectFilter: e => !!e.object.objects,
        objectMap: e => e.object.objects
    })
      , l = new PZ.ui.edit(CM,{
        childFilter: e => !(e instanceof PZ.objectList) || e.type !== PZ.object3d,
        keyframePanel: o.keyframes
    })
      , p = new PZ.ui.splitPanel(CM,c,l,.4);
    p.title = "Objects",
    p.icon = "objects",
    c.objects = o.tracks.selection,
    l.objects = c.selection;
    let d = new PZ.ui.edit(CM,{
        childFilter: e => e instanceof PZ.objectList && e.type === PZ.effect,
        columnLayout: 1,
        showListItemButtons: !1,
        emptyMessage: "select a clip",
        objectFilter: e => !!e.object.effects,
        objectMap: e => e.object.effects
    })
      , f = new PZ.ui.edit(CM,{
        childFilter: e => !(e instanceof PZ.objectList) || e.type !== PZ.effect,
        keyframePanel: o.keyframes
    })
      , y = new PZ.ui.splitPanel(CM,d,f,.4);
    y.title = "Effects",
    y.icon = "fx",
    d.objects = o.tracks.selection,
    f.objects = d.selection;
    let u = [new PZ.ui.media(CM), s, n, p, y, new PZ.ui.export(CM), new PZ.ui.about(CM)];
    let k = new PZ.ui.elevator(CM,u)
      , b = new PZ.ui.viewport(CM,{
        helper3dObjects: c.selection,
        widget3dObjects: c.selection,
        widget2dObjects: o.tracks.selection
    });
    b.objects = o.tracks.selection,
    b.edit = !0;
    let m, h = [{
        title: "editing camera (c)",
        icon: "camera",
        key: "c",
        observable: b.onEditChanged,
        update: function(e) {
            let t = b.edit ? "#8a2828" : "#acacac";
            e.children[0].style.fill = t
        },
        fn: function() {
            b.edit = !b.edit
        }
    }, {
        title: "layer transform controls (t)",
        icon: "transform",
        key: "t",
        observable: b.widget2d ? b.widget2d.onEditChanged : void 0,
        update: function(e) {
            let t = b.widget2d.edit ? "#8a2828" : "#acacac";
            e.children[0].style.fill = t
        },
        fn: function() {
            b.widget2d.edit = !b.widget2d.edit
        }
    }, {
        separator: !0
    }, {
        title: "start (home)",
        icon: "start",
        key: "Home",
        fn: function() {
            this.editor.playback.speed = 0,
            this.editor.playback.currentFrame = 0
        }
    }, {
        title: "skip frames back",
        key: "ArrowLeft",
        modifierMask: PZ.ui.toolbar.SHIFT,
        fn: function() {
            this.editor.playback.speed = 0,
            this.editor.playback.currentFrame = Math.max(this.editor.playback.currentFrame - 5, 0)
        }
    }, {
        title: "previous frame",
        icon: "prevframe",
        key: "ArrowLeft",
        modifierMask: 0,
        fn: function() {
            this.editor.playback.speed = 0,
            this.editor.playback.currentFrame = Math.max(this.editor.playback.currentFrame - 1, 0)
        }
    }, {
        title: "play (space)",
        icon: "play",
        key: " ",
        observable: CM.playback.onSpeedChanged,
        update: function(e) {
            let t = 0 !== this.editor.playback.speed
              , i = t ? "pause" : "play"
              , a = t ? "#8a2828" : "#acacac";
            PZ.ui.switchIcon(e.children[0], i),
            e.children[0].style.fill = a
        },
        fn: function() {
            var e = 0 === this.editor.playback.speed ? 1 : 0;
            this.editor.playback.speed = e
        }
    }, {
        title: "next frame",
        icon: "nextframe",
        key: "ArrowRight",
        modifierMask: 0,
        fn: function() {
            this.editor.playback.speed = 0,
            this.editor.playback.currentFrame = Math.max(Math.min(this.editor.playback.currentFrame + 1, this.editor.playback.totalFrames - 1), 0)
        }
    }, {
        title: "skip frames forward",
        key: "ArrowRight",
        modifierMask: PZ.ui.toolbar.SHIFT,
        fn: function() {
            this.editor.playback.speed = 0,
            this.editor.playback.currentFrame = Math.max(Math.min(this.editor.playback.currentFrame + 5, this.editor.playback.totalFrames - 1), 0)
        }
    }, {
        title: "end (end)",
        icon: "end",
        key: "End",
        fn: function() {
            this.editor.playback.speed = 0,
            this.editor.playback.currentFrame = this.editor.playback.totalFrames - 1
        }
    }, {
        title: "reverse++",
        key: "j",
        fn: function() {
            this.editor.playback.speed = this.editor.playback.speed - .25
        }
    }, {
        title: "stop",
        key: "k",
        fn: function() {
            this.editor.playback.speed = 0
        }
    }, {
        title: "forward++",
        key: "l",
        fn: function() {
            this.editor.playback.speed = this.editor.playback.speed + .25
        }
    }, {
        separator: !0
    }, {
        title: "loop (ctrl-l)",
        icon: "loop",
        key: "l",
        modifierMask: PZ.ui.toolbar.CTRL,
        observable: CM.playback.onLoopChanged,
        update: function(e, t) {
            let i = this.editor.playback.loop ? "#8a2828" : "#acacac";
            e.children[0].style.fill = i
        },
        fn: function() {
            this.editor.playback.loop = !this.editor.playback.loop
        }
    }, {
        title: "toggle marker",
        key: "m",
        fn: function() {
            let e = new PZ.ui.properties(this.editor)
              , t = this.editor.playback.currentFrame;
            this.editor.history.startOperation(),
            e.toggleKeyframe(this.editor.sequence.properties.markers, t),
            this.editor.history.finishOperation()
        }
    }, {
        title: "previous marker",
        key: "ArrowLeft",
        modifierMask: PZ.ui.toolbar.CTRL,
        fn: function() {
            let e = this.editor.sequence.properties.markers
              , t = this.editor.playback.currentFrame
              , i = e.frameOffset
              , a = e.getClosestKeyframeIndex(t);
            a < 0 || (e.keyframes[a].frame >= t && e.keyframes[a - 1] && (a -= 1),
            this.editor.playback.currentFrame = e.keyframes[a].frame + i)
        }
    }, {
        title: "next marker",
        key: "ArrowRight",
        modifierMask: PZ.ui.toolbar.CTRL,
        fn: function() {
            let e = this.editor.sequence.properties.markers
              , t = this.editor.playback.currentFrame
              , i = e.frameOffset
              , a = e.getClosestKeyframeIndex(t);
            a < 0 || (e.keyframes[a].frame <= t && e.keyframes[a + 1] && (a += 1),
            this.editor.playback.currentFrame = e.keyframes[a].frame + i)
        }
    }, {
        title: "graph",
        key: "g",
        icon: "interp_1",
        modifierMask: PZ.ui.toolbar.CTRL,
        fn: function() {
            let e = CM.createWindow({
                title: "Graph editor"
            })
              , t = new PZ.ui.graphEditor(e.editor);
            e.setPanel(t),
            e.enabled = !0
        }
    }], P = new PZ.ui.toolbar(CM,h), M = new PZ.ui.audioMeter(CM), C = new PZ.ui.splitPanel(CM,r,k,0,0);
    m = e && e.hasSubscription ? b : new PZ.ui.splitPanel(CM,i,b,0,0);
    let w = new PZ.ui.splitPanel(CM,o,M,1,1)
      , j = new PZ.ui.splitPanel(CM,P,w,0,0)
      , Z = new PZ.ui.splitPanel(CM,m,j,.65,0)
      , g = new PZ.ui.splitPanel(CM,C,Z,.3,1);
    t.setPanel(g)
}
,
CM.defaultProject = {
    sequence: {
        properties: {
            resolution: [1920, 1080],
            rate: 30
        },
        length: 180,
        videoTracks: [{
            type: 0,
            clips: [{
                type: 0,
                start: 0,
                length: 180,
                offset: 0,
                relativeRate: 1,
                media: null,
                link: null,
                properties: {
                    name: "Scene"
                },
                object: {
                    type: 4,
                    effects: [],
                    objects: [{
                        type: 6,
                        objectType: 1
                    }]
                }
            }]
        }],
        audioTracks: [{
            type: 1,
            clips: []
        }]
    },
    assets: [],
    media: [{
        properties: {
            name: "3D Scene",
            icon: "objects"
        },
        preset: !0,
        assets: [],
        data: [{
            type: 0,
            clips: [{
                start: 0,
                length: 180,
                offset: 0,
                type: 0,
                link: null,
                properties: {
                    name: "Scene"
                },
                object: {
                    type: 4,
                    effects: [],
                    objects: [{
                        type: 6,
                        objectType: 1
                    }]
                }
            }]
        }],
        baseType: "track"
    }, {
        properties: {
            name: "Adjustment",
            icon: "fx"
        },
        preset: !0,
        assets: [],
        data: [{
            type: 0,
            clips: [{
                start: 0,
                length: 180,
                offset: 0,
                type: 0,
                link: null,
                properties: {
                    name: "Adjustment"
                },
                object: {
                    type: 1,
                    effects: []
                }
            }]
        }],
        baseType: "track"
    }, {
        properties: {
            name: "Text",
            icon: "text"
        },
        preset: !0,
        assets: [],
        data: [{
            type: 0,
            clips: [{
                start: 0,
                length: 180,
                offset: 0,
                type: 0,
                link: null,
                properties: {
                    name: "Text"
                },
                object: {
                    type: 7,
                    objects: [],
                    effects: []
                }
            }]
        }],
        baseType: "track"
    }, {
        properties: {
            name: "Preset shape",
            icon: "shape"
        },
        assets: [],
        preset: !0,
        data: [{
            type: 0,
            clips: [{
                start: 0,
                length: 180,
                offset: 0,
                type: 0,
                link: null,
                properties: {
                    name: "Shape"
                },
                object: {
                    type: 8,
                    objects: [],
                    effects: []
                }
            }]
        }],
        baseType: "track"
    }, {
        properties: {
            name: "Shape",
            icon: "shape"
        },
        assets: [],
        preset: !0,
        data: [{
            type: 0,
            clips: [{
                start: 0,
                length: 180,
                offset: 0,
                type: 0,
                link: null,
                properties: {
                    name: "Shape"
                },
                object: {
                    type: 6,
                    objects: [],
                    effects: []
                }
            }]
        }],
        baseType: "track"
    }, {
        properties: {
            name: "Composite",
            icon: "layers"
        },
        assets: [],
        preset: !0,
        data: [{
            type: 0,
            clips: [{
                start: 0,
                length: 180,
                offset: 0,
                type: 0,
                link: null,
                properties: {
                    name: "Composite"
                },
                object: {
                    type: 2,
                    objects: [],
                    effects: []
                }
            }]
        }],
        baseType: "track"
    }]
},
BG.defaultProject = {
    sequence: {
        properties: {
            resolution: [1920, 1080],
            rate: 1
        },
        length: 1,
        videoTracks: [{
            clips: [{
                start: 0,
                length: 1,
                offset: 0,
                type: 0,
                link: null,
                object: {
                    type: 2,
                    properties: {
                        name: "Image"
                    },
                    objects: [],
                    effects: []
                }
            }]
        }],
        audioTracks: []
    },
    assets: {},
    media: []
};
