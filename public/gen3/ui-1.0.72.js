const PZUIVERSION = "1.0.72";
THREE.EditorControls = function(e, t) {
    t = void 0 !== t ? t : document,
    this.enabled = !0,
    this.center = new THREE.Vector3,
    this.panSpeed = .001,
    this.zoomSpeed = .001,
    this.rotationSpeed = .005;
    var i = this
      , s = new THREE.Vector3
      , n = {
        NONE: -1,
        ROTATE: 0,
        ZOOM: 1,
        PAN: 2
    }
      , r = n.NONE
      , a = this.center
      , o = new THREE.Matrix3
      , l = new THREE.Vector2
      , h = new THREE.Vector2
      , c = new THREE.Spherical
      , p = {
        type: "change"
    };
    function d(e) {
        !1 !== i.enabled && (0 === e.button ? r = n.ROTATE : 1 === e.button ? r = n.ZOOM : 2 === e.button && (r = n.PAN),
        h.set(e.clientX, e.clientY),
        document.addEventListener("mousemove", u, !1),
        document.addEventListener("mouseup", m, !1))
    }
    function u(e) {
        if (e.preventDefault(),
        !1 !== i.enabled) {
            l.set(e.clientX, e.clientY);
            var t = l.x - h.x
              , s = l.y - h.y;
            r === n.ROTATE ? i.rotate(new THREE.Vector3(-t * i.rotationSpeed,-s * i.rotationSpeed,0)) : r === n.ZOOM ? i.zoom(new THREE.Vector3(0,0,s)) : r === n.PAN && i.pan(new THREE.Vector3(-t,s,0)),
            h.set(e.clientX, e.clientY)
        }
    }
    function m(e) {
        document.removeEventListener("mousemove", u, !1),
        document.removeEventListener("mouseup", m, !1),
        r = n.NONE
    }
    function f(e) {
        e.preventDefault(),
        i.zoom(new THREE.Vector3(0,0,e.deltaY))
    }
    function y(e) {
        e.preventDefault()
    }
    this.focus = function(t) {
        var s = (new THREE.Box3).setFromObject(t);
        e.lookAt(a.copy(s.getCenter())),
        i.dispatchEvent(p)
    }
    ,
    this.pan = function(t) {
        var s = e.position.distanceTo(a);
        t.multiplyScalar(s * i.panSpeed),
        t.applyMatrix3(o.getNormalMatrix(e.matrix)),
        e.position.add(t),
        a.add(t),
        i.dispatchEvent(p)
    }
    ,
    this.zoom = function(t) {
        var s = e.position.distanceTo(a);
        t.multiplyScalar(s * i.zoomSpeed),
        t.length() > s || (t.applyMatrix3(o.getNormalMatrix(e.matrix)),
        e.position.add(t),
        i.dispatchEvent(p))
    }
    ,
    this.rotate = function(t) {
        s.copy(e.position).sub(a),
        c.setFromVector3(s),
        c.theta += t.x,
        c.phi += t.y,
        c.makeSafe(),
        s.setFromSpherical(c),
        e.position.copy(a).add(s),
        e.lookAt(a),
        i.dispatchEvent(p)
    }
    ,
    this.dispose = function() {
        t.removeEventListener("contextmenu", y, !1),
        t.removeEventListener("mousedown", d, !1),
        t.removeEventListener("wheel", f, !1),
        t.removeEventListener("mousemove", u, !1),
        t.removeEventListener("mouseup", m, !1),
        t.removeEventListener("mouseout", m, !1),
        t.removeEventListener("dblclick", m, !1),
        t.removeEventListener("touchstart", x, !1),
        t.removeEventListener("touchmove", P, !1)
    }
    ,
    t.addEventListener("contextmenu", y, !1),
    t.addEventListener("mousedown", d, !1),
    t.addEventListener("wheel", f, !1);
    var g = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
      , b = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
      , v = null;
    function x(e) {
        if (!1 !== i.enabled) {
            switch (e.touches.length) {
            case 1:
                g[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                g[1].set(e.touches[0].pageX, e.touches[0].pageY, 0);
                break;
            case 2:
                g[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                g[1].set(e.touches[1].pageX, e.touches[1].pageY, 0),
                v = g[0].distanceTo(g[1])
            }
            b[0].copy(g[0]),
            b[1].copy(g[1])
        }
    }
    function P(e) {
        if (!1 !== i.enabled) {
            switch (e.preventDefault(),
            e.stopPropagation(),
            e.touches.length) {
            case 1:
                g[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                g[1].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                i.rotate(g[0].sub(r(g[0], b)).multiplyScalar(-i.rotationSpeed));
                break;
            case 2:
                g[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                g[1].set(e.touches[1].pageX, e.touches[1].pageY, 0);
                var t = g[0].distanceTo(g[1]);
                i.zoom(new THREE.Vector3(0,0,v - t)),
                v = t;
                var s = g[0].clone().sub(r(g[0], b))
                  , n = g[1].clone().sub(r(g[1], b));
                s.x = -s.x,
                n.x = -n.x,
                i.pan(s.add(n).multiplyScalar(.5))
            }
            b[0].copy(g[0]),
            b[1].copy(g[1])
        }
        function r(e, t) {
            var i = t[0];
            for (var s in t)
                i.distanceTo(e) > t[s].distanceTo(e) && (i = t[s]);
            return i
        }
    }
    t.addEventListener("touchstart", x, !1),
    t.addEventListener("touchmove", P, !1)
}
,
THREE.EditorControls.prototype = Object.create(THREE.EventDispatcher.prototype),
THREE.EditorControls.prototype.constructor = THREE.EditorControls,
function() {
    "use strict";
    var e = function(e) {
        THREE.MeshBasicMaterial.call(this),
        this.depthTest = !1,
        this.depthWrite = !1,
        this.side = THREE.FrontSide,
        this.transparent = !0,
        this.setValues(e),
        this.oldColor = this.color.clone(),
        this.oldOpacity = this.opacity,
        this.highlight = function(e) {
            e ? (this.color.setRGB(1, 1, 0),
            this.opacity = 1) : (this.color.copy(this.oldColor),
            this.opacity = this.oldOpacity)
        }
    };
    (e.prototype = Object.create(THREE.MeshBasicMaterial.prototype)).constructor = e;
    var t = function(e) {
        THREE.LineBasicMaterial.call(this),
        this.depthTest = !1,
        this.depthWrite = !1,
        this.transparent = !0,
        this.linewidth = 1,
        this.setValues(e),
        this.oldColor = this.color.clone(),
        this.oldOpacity = this.opacity,
        this.highlight = function(e) {
            e ? (this.color.setRGB(1, 1, 0),
            this.opacity = 1) : (this.color.copy(this.oldColor),
            this.opacity = this.oldOpacity)
        }
    };
    (t.prototype = Object.create(THREE.LineBasicMaterial.prototype)).constructor = t;
    var i = new e({
        visible: !1,
        transparent: !1
    });
    THREE.TransformGizmo = function() {
        this.init = function() {
            THREE.Object3D.call(this),
            this.handles = new THREE.Object3D,
            this.pickers = new THREE.Object3D,
            this.planes = new THREE.Object3D,
            this.add(this.handles),
            this.add(this.pickers),
            this.add(this.planes);
            var e = new THREE.PlaneBufferGeometry(50,50,2,2)
              , t = new THREE.MeshBasicMaterial({
                visible: !1,
                side: THREE.DoubleSide
            })
              , i = {
                XY: new THREE.Mesh(e,t),
                YZ: new THREE.Mesh(e,t),
                XZ: new THREE.Mesh(e,t),
                XYZE: new THREE.Mesh(e,t)
            };
            for (var s in this.activePlane = i.XYZE,
            i.YZ.rotation.set(0, Math.PI / 2, 0),
            i.XZ.rotation.set(-Math.PI / 2, 0, 0),
            i)
                i[s].name = s,
                this.planes.add(i[s]),
                this.planes[s] = i[s];
            var n = function(e, t) {
                for (var i in e)
                    for (s = e[i].length; s--; ) {
                        var n = e[i][s][0]
                          , r = e[i][s][1]
                          , a = e[i][s][2];
                        n.name = i,
                        r && n.position.set(r[0], r[1], r[2]),
                        a && n.rotation.set(a[0], a[1], a[2]),
                        t.add(n)
                    }
            };
            n(this.handleGizmos, this.handles),
            n(this.pickerGizmos, this.pickers),
            this.traverse(function(e) {
                if (e instanceof THREE.Mesh) {
                    e.updateMatrix();
                    var t = e.geometry.clone();
                    t.applyMatrix(e.matrix),
                    e.geometry = t,
                    e.position.set(0, 0, 0),
                    e.rotation.set(0, 0, 0),
                    e.scale.set(1, 1, 1)
                }
            })
        }
        ,
        this.highlight = function(e) {
            this.traverse(function(t) {
                t.material && t.material.highlight && (t.name === e ? t.material.highlight(!0) : t.material.highlight(!1))
            })
        }
    }
    ,
    THREE.TransformGizmo.prototype = Object.create(THREE.Object3D.prototype),
    THREE.TransformGizmo.prototype.constructor = THREE.TransformGizmo,
    THREE.TransformGizmo.prototype.update = function(e, t) {
        var i = new THREE.Vector3(0,0,0)
          , s = new THREE.Vector3(0,1,0)
          , n = new THREE.Matrix4;
        this.traverse(function(r) {
            -1 !== r.name.search("E") ? r.quaternion.setFromRotationMatrix(n.lookAt(t, i, s)) : -1 === r.name.search("X") && -1 === r.name.search("Y") && -1 === r.name.search("Z") || r.quaternion.setFromEuler(e)
        })
    }
    ,
    THREE.TransformGizmoTranslate = function() {
        THREE.TransformGizmo.call(this);
        var s = new THREE.Geometry
          , n = new THREE.Mesh(new THREE.CylinderGeometry(0,.05,.2,12,1,!1));
        n.position.y = .5,
        n.updateMatrix(),
        s.merge(n.geometry, n.matrix);
        var r = new THREE.BufferGeometry;
        r.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0],3));
        var a = new THREE.BufferGeometry;
        a.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 1, 0],3));
        var o = new THREE.BufferGeometry;
        o.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 1],3)),
        this.handleGizmos = {
            X: [[new THREE.Mesh(s,new e({
                color: 16711680
            })), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(r,new t({
                color: 16711680
            }))]],
            Y: [[new THREE.Mesh(s,new e({
                color: 65280
            })), [0, .5, 0]], [new THREE.Line(a,new t({
                color: 65280
            }))]],
            Z: [[new THREE.Mesh(s,new e({
                color: 255
            })), [0, 0, .5], [Math.PI / 2, 0, 0]], [new THREE.Line(o,new t({
                color: 255
            }))]],
            XYZ: [[new THREE.Mesh(new THREE.OctahedronGeometry(.1,0),new e({
                color: 16777215,
                opacity: .25
            })), [0, 0, 0], [0, 0, 0]]],
            XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.29,.29),new e({
                color: 16776960,
                opacity: .25
            })), [.15, .15, 0]]],
            YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.29,.29),new e({
                color: 65535,
                opacity: .25
            })), [0, .15, .15], [0, Math.PI / 2, 0]]],
            XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.29,.29),new e({
                color: 16711935,
                opacity: .25
            })), [.15, 0, .15], [-Math.PI / 2, 0, 0]]]
        },
        this.pickerGizmos = {
            X: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),i), [.6, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),i), [0, .6, 0]]],
            Z: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),i), [0, 0, .6], [Math.PI / 2, 0, 0]]],
            XYZ: [[new THREE.Mesh(new THREE.OctahedronGeometry(.2,0),i)]],
            XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),i), [.2, .2, 0]]],
            YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),i), [0, .2, .2], [0, Math.PI / 2, 0]]],
            XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),i), [.2, 0, .2], [-Math.PI / 2, 0, 0]]]
        },
        this.setActivePlane = function(e, t) {
            var i = new THREE.Matrix4;
            t.applyMatrix4(i.getInverse(i.extractRotation(this.planes.XY.matrixWorld))),
            "X" === e && (this.activePlane = this.planes.XY,
            Math.abs(t.y) > Math.abs(t.z) && (this.activePlane = this.planes.XZ)),
            "Y" === e && (this.activePlane = this.planes.XY,
            Math.abs(t.x) > Math.abs(t.z) && (this.activePlane = this.planes.YZ)),
            "Z" === e && (this.activePlane = this.planes.XZ,
            Math.abs(t.x) > Math.abs(t.y) && (this.activePlane = this.planes.YZ)),
            "XYZ" === e && (this.activePlane = this.planes.XYZE),
            "XY" === e && (this.activePlane = this.planes.XY),
            "YZ" === e && (this.activePlane = this.planes.YZ),
            "XZ" === e && (this.activePlane = this.planes.XZ)
        }
        ,
        this.init()
    }
    ,
    THREE.TransformGizmoTranslate.prototype = Object.create(THREE.TransformGizmo.prototype),
    THREE.TransformGizmoTranslate.prototype.constructor = THREE.TransformGizmoTranslate,
    THREE.TransformGizmoRotate = function() {
        THREE.TransformGizmo.call(this);
        var e = function(e, t, i) {
            var s = new THREE.BufferGeometry
              , n = [];
            i = i || 1;
            for (var r = 0; r <= 64 * i; ++r)
                "x" === t && n.push(0, Math.cos(r / 32 * Math.PI) * e, Math.sin(r / 32 * Math.PI) * e),
                "y" === t && n.push(Math.cos(r / 32 * Math.PI) * e, 0, Math.sin(r / 32 * Math.PI) * e),
                "z" === t && n.push(Math.sin(r / 32 * Math.PI) * e, Math.cos(r / 32 * Math.PI) * e, 0);
            return s.addAttribute("position", new THREE.Float32BufferAttribute(n,3)),
            s
        };
        this.handleGizmos = {
            X: [[new THREE.Line(new e(1,"x",.5),new t({
                color: 16711680
            }))]],
            Y: [[new THREE.Line(new e(1,"y",.5),new t({
                color: 65280
            }))]],
            Z: [[new THREE.Line(new e(1,"z",.5),new t({
                color: 255
            }))]],
            E: [[new THREE.Line(new e(1.25,"z",1),new t({
                color: 13421568
            }))]],
            XYZE: [[new THREE.Line(new e(1,"z",1),new t({
                color: 7895160
            }))]]
        },
        this.pickerGizmos = {
            X: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1,.12,4,12,Math.PI),i), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1,.12,4,12,Math.PI),i), [0, 0, 0], [Math.PI / 2, 0, 0]]],
            Z: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1,.12,4,12,Math.PI),i), [0, 0, 0], [0, 0, -Math.PI / 2]]],
            E: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1.25,.12,2,24),i)]],
            XYZE: [[new THREE.Mesh(new THREE.Geometry)]]
        },
        this.setActivePlane = function(e) {
            "E" === e && (this.activePlane = this.planes.XYZE),
            "X" === e && (this.activePlane = this.planes.YZ),
            "Y" === e && (this.activePlane = this.planes.XZ),
            "Z" === e && (this.activePlane = this.planes.XY)
        }
        ,
        this.update = function(e, t) {
            THREE.TransformGizmo.prototype.update.apply(this, arguments);
            this.handles,
            this.pickers;
            var i = new THREE.Matrix4
              , s = new THREE.Euler(0,0,1)
              , n = new THREE.Quaternion
              , r = new THREE.Vector3(1,0,0)
              , a = new THREE.Vector3(0,1,0)
              , o = new THREE.Vector3(0,0,1)
              , l = new THREE.Quaternion
              , h = new THREE.Quaternion
              , c = new THREE.Quaternion
              , p = t.clone();
            s.copy(this.planes.XY.rotation),
            n.setFromEuler(s),
            i.makeRotationFromQuaternion(n).getInverse(i),
            p.applyMatrix4(i),
            this.traverse(function(e) {
                n.setFromEuler(s),
                "X" === e.name && (l.setFromAxisAngle(r, Math.atan2(-p.y, p.z)),
                n.multiplyQuaternions(n, l),
                e.quaternion.copy(n)),
                "Y" === e.name && (h.setFromAxisAngle(a, Math.atan2(p.x, p.z)),
                n.multiplyQuaternions(n, h),
                e.quaternion.copy(n)),
                "Z" === e.name && (c.setFromAxisAngle(o, Math.atan2(p.y, p.x)),
                n.multiplyQuaternions(n, c),
                e.quaternion.copy(n))
            })
        }
        ,
        this.init()
    }
    ,
    THREE.TransformGizmoRotate.prototype = Object.create(THREE.TransformGizmo.prototype),
    THREE.TransformGizmoRotate.prototype.constructor = THREE.TransformGizmoRotate,
    THREE.TransformGizmoScale = function() {
        THREE.TransformGizmo.call(this);
        var s = new THREE.Geometry
          , n = new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125));
        n.position.y = .5,
        n.updateMatrix(),
        s.merge(n.geometry, n.matrix);
        var r = new THREE.BufferGeometry;
        r.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0],3));
        var a = new THREE.BufferGeometry;
        a.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 1, 0],3));
        var o = new THREE.BufferGeometry;
        o.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 1],3)),
        this.handleGizmos = {
            X: [[new THREE.Mesh(s,new e({
                color: 16711680
            })), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(r,new t({
                color: 16711680
            }))]],
            Y: [[new THREE.Mesh(s,new e({
                color: 65280
            })), [0, .5, 0]], [new THREE.Line(a,new t({
                color: 65280
            }))]],
            Z: [[new THREE.Mesh(s,new e({
                color: 255
            })), [0, 0, .5], [Math.PI / 2, 0, 0]], [new THREE.Line(o,new t({
                color: 255
            }))]],
            XYZ: [[new THREE.Mesh(new THREE.BoxBufferGeometry(.125,.125,.125),new e({
                color: 16777215,
                opacity: .25
            }))]]
        },
        this.pickerGizmos = {
            X: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),i), [.6, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),i), [0, .6, 0]]],
            Z: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),i), [0, 0, .6], [Math.PI / 2, 0, 0]]],
            XYZ: [[new THREE.Mesh(new THREE.BoxBufferGeometry(.4,.4,.4),i)]]
        },
        this.setActivePlane = function(e, t) {
            var i = new THREE.Matrix4;
            t.applyMatrix4(i.getInverse(i.extractRotation(this.planes.XY.matrixWorld))),
            "X" === e && (this.activePlane = this.planes.XY,
            Math.abs(t.y) > Math.abs(t.z) && (this.activePlane = this.planes.XZ)),
            "Y" === e && (this.activePlane = this.planes.XY,
            Math.abs(t.x) > Math.abs(t.z) && (this.activePlane = this.planes.YZ)),
            "Z" === e && (this.activePlane = this.planes.XZ,
            Math.abs(t.x) > Math.abs(t.y) && (this.activePlane = this.planes.YZ)),
            "XYZ" === e && (this.activePlane = this.planes.XYZE)
        }
        ,
        this.init()
    }
    ,
    THREE.TransformGizmoScale.prototype = Object.create(THREE.TransformGizmo.prototype),
    THREE.TransformGizmoScale.prototype.constructor = THREE.TransformGizmoScale,
    THREE.TransformControls = function(e, t) {
        THREE.Object3D.call(this),
        t = void 0 !== t ? t : document,
        this.object = void 0,
        this.visible = !1,
        this.translationSnap = null,
        this.rotationSnap = null,
        this.space = "world",
        this.size = 1,
        this.axis = null;
        var i = this
          , s = "translate"
          , n = !1
          , r = {
            translate: new THREE.TransformGizmoTranslate,
            rotate: new THREE.TransformGizmoRotate,
            scale: new THREE.TransformGizmoScale
        };
        for (var a in r) {
            var o = r[a];
            o.visible = a === s,
            this.add(o)
        }
        var l = {
            type: "change"
        }
          , h = {
            type: "mouseDown"
        }
          , c = {
            type: "mouseUp",
            mode: s
        }
          , p = {
            type: "objectChange"
        }
          , d = new THREE.Raycaster
          , u = new THREE.Vector2
          , m = new THREE.Vector3
          , f = new THREE.Vector3
          , y = new THREE.Vector3
          , g = new THREE.Vector3
          , b = 1
          , v = new THREE.Matrix4
          , x = new THREE.Vector3
          , P = new THREE.Matrix4
          , k = new THREE.Vector3
          , E = new THREE.Quaternion
          , w = new THREE.Vector3(1,0,0)
          , C = new THREE.Vector3(0,1,0)
          , z = new THREE.Vector3(0,0,1)
          , T = new THREE.Quaternion
          , Z = new THREE.Quaternion
          , _ = new THREE.Quaternion
          , j = new THREE.Quaternion
          , S = new THREE.Quaternion
          , L = new THREE.Vector3
          , A = new THREE.Vector3
          , M = new THREE.Matrix4
          , F = new THREE.Matrix4
          , O = new THREE.Vector3
          , I = new THREE.Vector3
          , R = new THREE.Euler
          , D = new THREE.Matrix4
          , N = new THREE.Vector3
          , B = new THREE.Euler;
        function H(e) {
            if (void 0 !== i.object && !0 !== n && (void 0 === e.button || 0 === e.button)) {
                var t = Y(e.changedTouches ? e.changedTouches[0] : e, r[s].pickers.children)
                  , a = null;
                t && (a = t.object.name,
                e.preventDefault()),
                i.axis !== a && (i.axis = a,
                i.update(),
                i.dispatchEvent(l))
            }
        }
        function K(e) {
            if (void 0 !== i.object && !0 !== n && (void 0 === e.button || 0 === e.button)) {
                var t = e.changedTouches ? e.changedTouches[0] : e;
                if (0 === t.button || void 0 === t.button) {
                    var a = Y(t, r[s].pickers.children);
                    if (a) {
                        e.preventDefault(),
                        e.stopPropagation(),
                        i.dispatchEvent(h),
                        i.axis = a.object.name,
                        i.update(),
                        x.copy(N).sub(I).normalize(),
                        r[s].setActivePlane(i.axis, x);
                        var o = Y(t, [r[s].activePlane]);
                        o && (L.copy(i.object.position),
                        A.copy(i.object.scale),
                        M.extractRotation(i.object.matrix),
                        D.extractRotation(i.object.matrixWorld),
                        F.extractRotation(i.object.parent.matrixWorld),
                        O.setFromMatrixScale(P.getInverse(i.object.parent.matrixWorld)),
                        f.copy(o.point))
                    }
                }
                n = !0
            }
        }
        function q(e) {
            if (void 0 !== i.object && null !== i.axis && !1 !== n && (void 0 === e.button || 0 === e.button)) {
                var t = Y(e.changedTouches ? e.changedTouches[0] : e, [r[s].activePlane]);
                !1 !== t && (e.preventDefault(),
                e.stopPropagation(),
                m.copy(t.point),
                "translate" === s ? (m.sub(f),
                m.multiply(O),
                "local" === i.space && (m.applyMatrix4(P.getInverse(D)),
                -1 === i.axis.search("X") && (m.x = 0),
                -1 === i.axis.search("Y") && (m.y = 0),
                -1 === i.axis.search("Z") && (m.z = 0),
                m.applyMatrix4(M),
                i.object.position.copy(L),
                i.object.position.add(m)),
                "world" !== i.space && -1 === i.axis.search("XYZ") || (-1 === i.axis.search("X") && (m.x = 0),
                -1 === i.axis.search("Y") && (m.y = 0),
                -1 === i.axis.search("Z") && (m.z = 0),
                m.applyMatrix4(P.getInverse(F)),
                i.object.position.copy(L),
                i.object.position.add(m)),
                null !== i.translationSnap && ("local" === i.space && i.object.position.applyMatrix4(P.getInverse(D)),
                -1 !== i.axis.search("X") && (i.object.position.x = Math.round(i.object.position.x / i.translationSnap) * i.translationSnap),
                -1 !== i.axis.search("Y") && (i.object.position.y = Math.round(i.object.position.y / i.translationSnap) * i.translationSnap),
                -1 !== i.axis.search("Z") && (i.object.position.z = Math.round(i.object.position.z / i.translationSnap) * i.translationSnap),
                "local" === i.space && i.object.position.applyMatrix4(D))) : "scale" === s ? (m.sub(f),
                m.multiply(O),
                "local" === i.space && ("XYZ" === i.axis ? (b = 1 + m.y / Math.max(A.x, A.y, A.z),
                i.object.scale.x = A.x * b,
                i.object.scale.y = A.y * b,
                i.object.scale.z = A.z * b) : (m.applyMatrix4(P.getInverse(D)),
                "X" === i.axis && (i.object.scale.x = A.x * (1 + m.x / A.x)),
                "Y" === i.axis && (i.object.scale.y = A.y * (1 + m.y / A.y)),
                "Z" === i.axis && (i.object.scale.z = A.z * (1 + m.z / A.z))))) : "rotate" === s && (m.sub(I),
                m.multiply(O),
                k.copy(f).sub(I),
                k.multiply(O),
                "E" === i.axis ? (m.applyMatrix4(P.getInverse(v)),
                k.applyMatrix4(P.getInverse(v)),
                y.set(Math.atan2(m.z, m.y), Math.atan2(m.x, m.z), Math.atan2(m.y, m.x)),
                g.set(Math.atan2(k.z, k.y), Math.atan2(k.x, k.z), Math.atan2(k.y, k.x)),
                E.setFromRotationMatrix(P.getInverse(F)),
                S.setFromAxisAngle(x, y.z - g.z),
                T.setFromRotationMatrix(D),
                E.multiplyQuaternions(E, S),
                E.multiplyQuaternions(E, T),
                i.object.quaternion.copy(E)) : "XYZE" === i.axis ? (S.setFromEuler(m.clone().cross(k).normalize()),
                E.setFromRotationMatrix(P.getInverse(F)),
                Z.setFromAxisAngle(S, -m.clone().angleTo(k)),
                T.setFromRotationMatrix(D),
                E.multiplyQuaternions(E, Z),
                E.multiplyQuaternions(E, T),
                i.object.quaternion.copy(E)) : "local" === i.space ? (m.applyMatrix4(P.getInverse(D)),
                k.applyMatrix4(P.getInverse(D)),
                y.set(Math.atan2(m.z, m.y), Math.atan2(m.x, m.z), Math.atan2(m.y, m.x)),
                g.set(Math.atan2(k.z, k.y), Math.atan2(k.x, k.z), Math.atan2(k.y, k.x)),
                T.setFromRotationMatrix(M),
                null !== i.rotationSnap ? (Z.setFromAxisAngle(w, Math.round((y.x - g.x) / i.rotationSnap) * i.rotationSnap),
                _.setFromAxisAngle(C, Math.round((y.y - g.y) / i.rotationSnap) * i.rotationSnap),
                j.setFromAxisAngle(z, Math.round((y.z - g.z) / i.rotationSnap) * i.rotationSnap)) : (Z.setFromAxisAngle(w, y.x - g.x),
                _.setFromAxisAngle(C, y.y - g.y),
                j.setFromAxisAngle(z, y.z - g.z)),
                "X" === i.axis && T.multiplyQuaternions(T, Z),
                "Y" === i.axis && T.multiplyQuaternions(T, _),
                "Z" === i.axis && T.multiplyQuaternions(T, j),
                i.object.quaternion.copy(T)) : "world" === i.space && (y.set(Math.atan2(m.z, m.y), Math.atan2(m.x, m.z), Math.atan2(m.y, m.x)),
                g.set(Math.atan2(k.z, k.y), Math.atan2(k.x, k.z), Math.atan2(k.y, k.x)),
                E.setFromRotationMatrix(P.getInverse(F)),
                null !== i.rotationSnap ? (Z.setFromAxisAngle(w, Math.round((y.x - g.x) / i.rotationSnap) * i.rotationSnap),
                _.setFromAxisAngle(C, Math.round((y.y - g.y) / i.rotationSnap) * i.rotationSnap),
                j.setFromAxisAngle(z, Math.round((y.z - g.z) / i.rotationSnap) * i.rotationSnap)) : (Z.setFromAxisAngle(w, y.x - g.x),
                _.setFromAxisAngle(C, y.y - g.y),
                j.setFromAxisAngle(z, y.z - g.z)),
                T.setFromRotationMatrix(D),
                "X" === i.axis && E.multiplyQuaternions(E, Z),
                "Y" === i.axis && E.multiplyQuaternions(E, _),
                "Z" === i.axis && E.multiplyQuaternions(E, j),
                E.multiplyQuaternions(E, T),
                i.object.quaternion.copy(E))),
                i.update(),
                i.dispatchEvent(l),
                i.dispatchEvent(p))
            }
        }
        function V(e) {
            e.preventDefault(),
            void 0 !== e.button && 0 !== e.button || (n && null !== i.axis && (c.mode = s,
            i.dispatchEvent(c)),
            n = !1,
            "TouchEvent"in window && e instanceof TouchEvent ? (i.axis = null,
            i.update(),
            i.dispatchEvent(l)) : H(e))
        }
        function Y(i, s) {
            var n = t.getBoundingClientRect()
              , r = (i.clientX - n.left) / n.width
              , a = (i.clientY - n.top) / n.height;
            u.set(2 * r - 1, -2 * a + 1),
            d.setFromCamera(u, e);
            var o = d.intersectObjects(s, !0);
            return !!o[0] && o[0]
        }
        t.addEventListener("mousedown", K, !1),
        t.addEventListener("touchstart", K, !1),
        t.addEventListener("mousemove", H, !1),
        t.addEventListener("touchmove", H, !1),
        t.addEventListener("mousemove", q, !1),
        t.addEventListener("touchmove", q, !1),
        t.addEventListener("mouseup", V, !1),
        t.addEventListener("mouseout", V, !1),
        t.addEventListener("touchend", V, !1),
        t.addEventListener("touchcancel", V, !1),
        t.addEventListener("touchleave", V, !1),
        this.dispose = function() {
            t.removeEventListener("mousedown", K),
            t.removeEventListener("touchstart", K),
            t.removeEventListener("mousemove", H),
            t.removeEventListener("touchmove", H),
            t.removeEventListener("mousemove", q),
            t.removeEventListener("touchmove", q),
            t.removeEventListener("mouseup", V),
            t.removeEventListener("mouseout", V),
            t.removeEventListener("touchend", V),
            t.removeEventListener("touchcancel", V),
            t.removeEventListener("touchleave", V)
        }
        ,
        this.attach = function(e) {
            this.object = e,
            this.visible = !0,
            this.update()
        }
        ,
        this.detach = function() {
            this.object = void 0,
            this.visible = !1,
            this.axis = null
        }
        ,
        this.getMode = function() {
            return s
        }
        ,
        this.setMode = function(e) {
            for (var t in "scale" === (s = e || s) && (i.space = "local"),
            r)
                r[t].visible = t === s;
            this.update(),
            i.dispatchEvent(l)
        }
        ,
        this.setTranslationSnap = function(e) {
            i.translationSnap = e
        }
        ,
        this.setRotationSnap = function(e) {
            i.rotationSnap = e
        }
        ,
        this.setSize = function(e) {
            i.size = e,
            this.update(),
            i.dispatchEvent(l)
        }
        ,
        this.setSpace = function(e) {
            i.space = e,
            this.update(),
            i.dispatchEvent(l)
        }
        ,
        this.update = function() {
            void 0 !== i.object && (i.object.updateMatrixWorld(),
            I.setFromMatrixPosition(i.object.matrixWorld),
            R.setFromRotationMatrix(P.extractRotation(i.object.matrixWorld)),
            e.updateMatrixWorld(),
            N.setFromMatrixPosition(e.matrixWorld),
            B.setFromRotationMatrix(P.extractRotation(e.matrixWorld)),
            b = I.distanceTo(N) / 6 * i.size,
            this.position.copy(I),
            this.scale.set(b, b, b),
            x.copy(N).sub(I).normalize(),
            "local" === i.space ? r[s].update(R, x) : "world" === i.space && r[s].update(new THREE.Euler, x),
            r[s].highlight(i.axis))
        }
    }
    ,
    THREE.TransformControls.prototype = Object.create(THREE.Object3D.prototype),
    THREE.TransformControls.prototype.constructor = THREE.TransformControls
}(),
PZ.ui = PZ.ui || {};
const PZ_ICONS = "pz.icons29.svg";
PZ.ui.generateIcon = function(e) {
    let t = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      , i = document.createElementNS("http://www.w3.org/2000/svg", "use");
    return i.setAttributeNS("http://www.w3.org/1999/xlink", "href", PZ_ICONS + "#" + e),
    t.appendChild(i),
    t
}
,
PZ.ui.switchIcon = function(e, t) {
    e.children[0].setAttribute("href", PZ_ICONS + "#" + t)
}
,
PZ.dateString = function(e) {
    return e.toLocaleDateString(void 0, {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}
,
PZ.ui.ad = function(e) {
    PZ.ui.panel.call(this, e),
    this.el = document.createElement("div"),
    this.el.setAttribute("tabindex", "0"),
    this.el.classList.add("editorpanel"),
    this.el.style = "text-align: center",
    this.el.style.backgroundColor = "#242424",
    this.minWidth = 90,
    this.minHeight = 90,
    this.initialized = !1
}
,
PZ.ui.ad.prototype.resize = function() {
    if (!this.initialized) {
        let e = "Panzoid_tool_970x90_728x90_468x60_320x50_300x75";
        this.el.id = e,
        this.initialized = !0
    }
}
,
PZ.ui.audioMeter = function(e) {
    PZ.ui.panel.call(this, e),
    this.el.style = "background-color: #242424;",
    this.canDuplicate = !0,
    this.minWidth = 45,
    this.minHeight = 45,
    this.peak = 0,
    this.analyzer = e.playback.audioDst,
    this.analyzer.fftSize = 1024,
    this.audioData = new Uint8Array(this.analyzer.fftSize),
    this.create(),
    this._updateFn = this.update.bind(this),
    this.animFrameReq = requestAnimationFrame(this._updateFn)
}
,
PZ.ui.audioMeter.prototype.create = function() {
    this.channelEl = document.createElement("div"),
    this.channelEl.style = "background:linear-gradient(to top, green, yellow 90%, red);position:absolute;left:4px;top:4px;bottom:4px;right:4px;",
    this.ampEl = document.createElement("div"),
    this.ampEl.style = "position:absolute;top:0;left:0;right:0;height:100%;transform-origin:top;background-color:#111;opacity:0.95",
    this.peakEl = document.createElement("div"),
    this.peakEl.style = "position:absolute;width:100%;height:1px;bottom:0;background-color:#cece62;",
    this.channelEl.appendChild(this.ampEl),
    this.channelEl.appendChild(this.peakEl),
    this.el.appendChild(this.channelEl)
}
,
PZ.ui.audioMeter.prototype.resize = function() {}
,
PZ.ui.audioMeter.prototype.update = function() {
    this.animFrameReq = requestAnimationFrame(this._updateFn),
    this.analyzer.getByteTimeDomainData(this.audioData);
    let e = 0
      , t = 0;
    for (var i = 0; i < this.audioData.length; i++) {
        let s = 2 * Math.abs(this.audioData[i] / 256 - .5);
        t += s * s,
        e = Math.max(e, s)
    }
    t = Math.sqrt(t / this.audioData.length),
    this.ampEl.style.transform = "scaleY(" + (1 - t) + ")",
    this.peak = Math.max(e, this.peak - .01 / Math.exp(this.peak)),
    this.peakEl.style.bottom = 100 * this.peak + "%"
}
,
PZ.ui.editor = function() {
    PZ.observable.defineObservableProp(this, "sequence", "onSequenceChanged"),
    PZ.observable.defineObservableProp(this, "project", "onProjectChanged"),
    this.project = null,
    this.sequence = null,
    this.onProjectChanged.watch(function() {
        this.project && (this.project.assets.onAssetRemoved.watch(this.assetRemoved.bind(this)),
        this.sequence = this.project.sequence)
    }
    .bind(this)),
    PZ.observable.defineObservableProp(this, "enabled", "onEnabledChanged"),
    this.onEnabledChanged.watch( () => {
        this.windows.forEach(e => e.enabled = this.enabled),
        this.playback.enabled = this.enabled
    }
    ),
    this.windows = [],
    this.history = new PZ.ui.history(this),
    this.recovery = new PZ.ui.recovery(this),
    this.errorList = [],
    window.addEventListener("error", this.onError.bind(this)),
    window.addEventListener("unhandledrejection", this.onError.bind(this)),
    this.ui = {}
}
,
PZ.ui.editor.prototype.onError = function(e) {
    this.errorList.push(e.reason || e.error || e)
}
,
PZ.ui.editor.prototype.sendDiagnostics = function() {
    let e = ""
      , t = t => e += t + "\n";
    try {
        for (let e = 0; e < this.errorList.length; e++) {
            let i = this.errorList[e];
            t(i.stack || i.message)
        }
        this.errorList = []
    } catch (e) {
        t("Could not log errors: " + e.message)
    }
    try {
        t(JSON.stringify(this.project))
    } catch (e) {
        t("Could not log project: " + e.message)
    }
    try {
        PZ.api("/feedback/diagnostics", "post", {
            feedbackSource: 0,
            feedbackType: 9,
            feedbackCategory: 0,
            toolVersion: PZVERSION,
            message: e
        })
    } catch (e) {}
}
,
PZ.ui.editor.prototype.assetRemoved = function(e) {
    this.history.pushCommand(this.project.assets.restore.bind(this.project.assets), e)
}
,
PZ.ui.editor.prototype.createMainWindow = function() {
    let e = document.getElementById("panecontainer")
      , t = this.createWindow(e);
    return this.fileInput = document.createElement("input"),
    this.fileInput.setAttribute("type", "file"),
    this.fileInput.setAttribute("tabindex", "-1"),
    this.fileInput.style = "height:0px;width:0px;overflow:hidden;",
    e.appendChild(this.fileInput),
    t
}
,
PZ.ui.editor.prototype.createWindow = function(e) {
    var t = new PZ.ui.window(this,e);
    return t.window.onbeforeunload = function(e) {
        if (this.project && this.project.ui.dirty) {
            var t, i;
            for (i = 0; i < this.windows.length; i++)
                if (this.windows[i].window === e.currentTarget) {
                    t = this.windows[i];
                    break
                }
            return !1 !== t.secondary && void 0
        }
    }
    .bind(this),
    t.window.onunload = function(e) {
        var t, i;
        for (i = 0; i < this.windows.length; i++)
            if (this.windows[i].window === e.currentTarget) {
                t = this.windows[i];
                break
            }
        !1 === t.secondary ? (this.project = null,
        this.closeAllWindows()) : this.windows.splice(i, 1)
    }
    .bind(this),
    t.window.onkeydown = this.keydown.bind(this),
    window.enabled = this.enabled,
    this.windows.push(t),
    t
}
,
PZ.ui.editor.prototype.closeAllWindows = function() {
    for (var e = 0; e < this.windows.length; e++)
        this.windows[e].secondary && this.windows[e].window.close()
}
,
PZ.ui.editor.prototype.keydown = function(e) {
    if (!e.ctrlKey)
        return;
    if (PZ.ui.toolbar.prototype.shouldIgnoreKeydown(e.target, e.key))
        return;
    let t = e.key.toLowerCase();
    if ("n" === t || "m" === t)
        this.new();
    else if ("o" === t)
        this.open();
    else if ("s" === t)
        this.save(e.shiftKey);
    else if ("z" === t)
        this.history.undo();
    else {
        if ("y" !== t)
            return;
        this.history.redo()
    }
    e.preventDefault()
}
,
PZ.ui.editor.prototype.showFilePicker = function(e, t, i) {
    this.fileInput.value = null,
    this.fileInput.onchange = e,
    t ? this.fileInput.setAttribute("accept", t) : this.fileInput.removeAttribute("accept"),
    this.fileInput.setAttribute("multiple", !!i),
    this.fileInput.click()
}
,
PZ.ui.editor.prototype.init = function(e) {
    try {
        if (!e) {
            let t = this.recovery.load();
            t && ((e = new PZ.project).load(t),
            e.ui.dirty = !0)
        }
        if (e)
            return void (this.project = e)
    } catch (e) {}
    this.new()
}
,
PZ.ui.editor.prototype.confirmIfDirty = function() {
    return !this.project || !this.project.ui.dirty || window.confirm("Your unsaved changes will be lost. Continue?")
}
,
PZ.ui.editor.prototype.loadProject = async function(e) {
    let t = await PZ.project.load(e)
      , i = new PZ.project;
    return t.media.splice(0, 0, ...this.defaultProject.media),
    i.load(t, e),
    i
}
,
PZ.ui.editor.prototype.new = function() {
    if (!this.confirmIfDirty())
        return;
    var e = JSON.parse(JSON.stringify(this.defaultProject));
    let t = new PZ.project;
    t.load(e),
    this.project = t
}
,
PZ.ui.editor.prototype.open = function() {
    this.confirmIfDirty() && this.showFilePicker(async e => {
        let t = e.currentTarget.files;
        if (t && t[0]) {
            let e = new PZ.archive;
            await e.untar(t[0]),
            this.project = await this.loadProject(e)
        }
    }
    , ".pz")
}
,
PZ.ui.editor.prototype.save = async function(e) {
    let t = new PZ.archive;
    await PZ.project.save(t, this.project),
    e || this.project.assets.saveAll(t),
    await PZ.file.getQuota();
    let i = await t.tar();
    i && (PZ.downloadBlob = i,
    PZ.downloadFilename = "project.pz"),
    hiddenframe("/download.html"),
    this.project.ui.dirty = !1
}
,
PZ.ui.editor.prototype.getCreationFromUrl = async function() {
    let e = new PZ.ui.query(location.search)
      , t = parseInt(e.keys.c) || 0;
    if (sessionStorage.getItem("loadTemplate") && sessionStorage.removeItem("loadTemplate"),
    !t)
        return;
    let i = await fetch(PZ.blobOrigin + "/creations/" + t + ".pz");
    if (200 === i.status) {
        let e = await i.blob()
          , t = new PZ.archive;
        return await t.untar(e),
        await this.loadProject(t)
    }
}
,
PZ.ui.window = function(e, t) {
    if (this.editor = e,
    t instanceof Node)
        this.window = window,
        this.el = t,
        this.secondary = !1;
    else {
        if (this.options = {
            title: "Panzoid",
            width: 600,
            height: 400
        },
        Object.assign(this.options, t),
        this.window = window.open("", "", "width=" + this.options.width + ",height=" + this.options.height),
        !this.window)
            return;
        let e = this.window.document.head;
        const i = this.editor.windows[0].window.location.href.split("/");
        i.pop();
        let s = i.join("/")
          , n = this.editor.windows[0].window.document.head.querySelectorAll('link[rel="stylesheet"]');
        for (let t = 0; t < n.length; t++) {
            const i = n[t].getAttribute("href")
              , r = i.startsWith("https://") ? i : s + "/" + i.split("/").pop();
            let a = this.window.document.createElement("link");
            e.appendChild(a),
            a.setAttribute("rel", "stylesheet"),
            a.setAttribute("href", r)
        }
        let r = this.window.document.createElement("title");
        e.appendChild(r),
        r.innerText = this.options.title,
        this.el = this.window.document.body,
        this.secondary = !0
    }
    this.el.addEventListener("keydown", function(e) {
        if (!e.altKey && "Backquote" === e.code) {
            let t = this.window.document.activeElement;
            if (!t || !t.pz_panel)
                return;
            let i = t.pz_panel;
            if (e.ctrlKey && e.shiftKey) {
                let e = new i.constructor(this.editor);
                new PZ.ui.window(this.editor).setPanel(e)
            } else
                this.oldPanel ? (this.panel = null,
                i.oldParent.appendChild(i.el),
                delete i.oldParent,
                this.setPanel(this.oldPanel),
                delete this.oldPanel) : (i.oldParent = i.el.parentElement,
                this.oldPanel = this.panel,
                this.setPanel(i)),
                i.el.focus();
            e.preventDefault()
        }
    }
    .bind(this)),
    this.el.addEventListener("contextmenu", function(e) {
        "INPUT" !== e.target.tagName && e.preventDefault()
    }),
    this.window.addEventListener("resize", function() {
        clearTimeout(this.resizeTimeout),
        this.resizeTimeout = setTimeout(this.resize.bind(this), 500)
    }
    .bind(this)),
    this.window.addEventListener("unload", function() {
        this.panel.enabled = !1
    }
    .bind(this)),
    this.el.innerHTML = "",
    this.el.classList.add("editorwindow"),
    this.panel = null,
    PZ.observable.defineObservableProp(this, "enabled", "onEnabledChanged"),
    this.onEnabledChanged.watch( () => {
        this.panel && (this.panel.enabled = this.enabled)
    }
    )
}
,
PZ.ui.window.prototype.resize = function() {
    this.panel.resize()
}
,
PZ.ui.window.prototype.setPanel = function(e) {
    this.panel && this.panel.el.remove(),
    this.panel = e,
    this.panel.enabled = this.enabled,
    this.panel.el.style.top = 0,
    this.panel.el.style.left = 0,
    this.panel.el.style.width = "100%",
    this.panel.el.style.height = "100%",
    this.el.appendChild(this.panel.el),
    this.panel.window = this,
    this.panel.resize()
}
,
PZ.ui.panel = function(e) {
    this.editor = e,
    this.minHeight = 1,
    this.minWidth = 1,
    this.canDuplicate = !1,
    this.canClose = !1,
    PZ.observable.defineObservableProp(this, "enabled", "onEnabledChanged"),
    this.enabled = !1,
    this.el = document.createElement("div"),
    this.el.setAttribute("tabindex", "0"),
    this.el.classList.add("editorpanel"),
    this.el.pz_panel = this
}
,
PZ.ui.panel.prototype = {
    resize() {},
    unload() {}
},
PZ.ui.panel.nav = class extends PZ.ui.panel {
    constructor(e) {
        super(e),
        this.currentPage = null,
        this.pageBackStack = []
    }
    navigate(e, t) {
        t && this.pageBackStack.push(this.currentPage),
        this.currentPage && this.currentPage.remove(),
        this.currentPage = e || this.pageBackStack.pop(),
        this.el.appendChild(this.currentPage),
        this.currentPage.pz_activate && this.currentPage.pz_activate(),
        this.resize()
    }
    createBackButton(e) {
        var t = document.createElement("button")
          , i = PZ.ui.generateIcon("back");
        return t.appendChild(i),
        t.classList.add("backbutton"),
        t.setAttribute("title", "Back"),
        t.onclick = ( () => {
            e && !e.call(this) || this.navigate()
        }
        ),
        t
    }
    createPage(e, t, i) {
        let s = document.createElement("div");
        if (e) {
            let n = PZ.ui.controls.legacy.generateTitle({
                title: e
            });
            t && n.insertBefore(this.createBackButton(i), n.firstElementChild),
            s.appendChild(n)
        }
        return s
    }
}
,
PZ.fixedStack = function(e) {
    this.stack = new Array(e),
    this.length = 0,
    this.idx = 0
}
,
PZ.fixedStack.prototype.clear = function() {
    let e = this.stack.length;
    this.stack = new Array(e),
    this.length = 0,
    this.idx = 0
}
,
PZ.fixedStack.prototype.push = function(e) {
    this.stack[this.idx] = e,
    this.length = Math.min(this.stack.length, this.length + 1),
    this.idx = (this.idx + 1) % this.stack.length
}
,
PZ.fixedStack.prototype.pop = function() {
    if (!this.length)
        return;
    this.idx = ( (e, t) => (e % t + t) % t)(this.idx - 1, this.stack.length),
    this.length -= 1;
    let e = this.stack[this.idx];
    return this.stack[this.idx] = null,
    e
}
,
PZ.ui.splitPanel = function(e, t, i, s, n) {
    PZ.ui.panel.call(this, e),
    this.el = document.createElement("div"),
    this.el.style = "position: absolute;",
    this.splitEl = document.createElement("div"),
    this.splitEl.style = "position:absolute",
    this.el.appendChild(this.splitEl),
    this.drag = new PZ.ui.drag(this.splitEl,this.dragStart,this.drag,this.dragUpdate,this.dragEnd,this),
    this.onEnabledChanged.watch( () => {
        this.panels[0].enabled = this.enabled,
        this.panels[1].enabled = this.enabled
    }
    ),
    this.options = {
        splitSize: 3,
        ratio: .5,
        direction: -1
    },
    this.options.direction = void 0 === n ? -1 : n,
    this.splitSize = 3,
    this.ratio = s,
    this.panels = new Array(2),
    this.panels[0] = t,
    this.el.appendChild(t.el),
    this.panels[1] = i,
    this.el.appendChild(i.el),
    this.minHeight = this.panels[0].minHeight + this.panels[1].minHeight,
    this.minWidth = this.panels[0].minWidth + this.panels[1].minWidth
}
,
PZ.ui.splitPanel.prototype.resize = function() {
    if (this.direction = this.options.direction,
    -1 === this.options.direction && (this.direction = this.el.clientWidth > this.el.clientHeight ? 1 : 0),
    0 === this.direction) {
        let e = this.el.clientHeight
          , t = .5 * this.splitSize
          , i = e * this.ratio - t
          , s = e * this.ratio + t;
        i < this.panels[0].minHeight && (s = (i = this.panels[0].minHeight) + 2 * t),
        e - s < this.panels[1].minHeight && (i = (s = e - this.panels[1].minHeight) - 2 * t),
        this.splitEl.style.height = this.splitSize + "px",
        this.splitEl.style.width = "100%",
        this.splitEl.style.cursor = "ns-resize",
        this.splitEl.style.top = i + "px",
        this.splitEl.style.left = 0,
        this.panels[0].el.style.left = 0,
        this.panels[1].el.style.left = 0,
        this.panels[0].el.style.width = "100%",
        this.panels[1].el.style.width = "100%",
        this.panels[0].el.style.top = 0,
        this.panels[0].el.style.height = i + "px",
        this.panels[0].el.style.bottom = "",
        this.panels[1].el.style.top = s + "px",
        this.panels[1].el.style.height = "",
        this.panels[1].el.style.bottom = 0
    } else {
        let e = this.el.clientWidth
          , t = .5 * this.splitSize
          , i = e * this.ratio - t
          , s = e * this.ratio + t;
        i < this.panels[0].minWidth && (s = (i = this.panels[0].minWidth) + 2 * t),
        e - s < this.panels[1].minWidth && (i = (s = e - this.panels[1].minWidth) - 2 * t),
        this.splitEl.style.height = "100%",
        this.splitEl.style.width = this.splitSize + "px",
        this.splitEl.style.cursor = "ew-resize",
        this.splitEl.style.top = 0,
        this.splitEl.style.left = i + "px",
        this.panels[0].el.style.top = 0,
        this.panels[1].el.style.top = 0,
        this.panels[0].el.style.height = "100%",
        this.panels[1].el.style.height = "100%",
        this.panels[0].el.style.left = 0,
        this.panels[0].el.style.width = i + "px",
        this.panels[0].el.style.right = "",
        this.panels[1].el.style.left = s + "px",
        this.panels[1].el.style.width = "",
        this.panels[1].el.style.right = 0
    }
    this.panels[0].resize(),
    this.panels[1].resize()
}
,
PZ.ui.splitPanel.prototype.dragStart = function(e) {
    this.lastPt = {
        x: e.pageX,
        y: e.pageY
    },
    this.currentPt = {
        x: e.pageX,
        y: e.pageY
    }
}
,
PZ.ui.splitPanel.prototype.drag = function(e) {
    this.currentPt.x = e.pageX,
    this.currentPt.y = e.pageY
}
,
PZ.ui.splitPanel.prototype.dragUpdate = function() {
    let e = this.ctx;
    if (0 === e.direction) {
        let t = this.currentPt.y - this.lastPt.y;
        e.panels[0].el.style.height = parseFloat(e.panels[0].el.style.height) + t + "px",
        e.splitEl.style.top = parseFloat(e.splitEl.style.top) + t + "px",
        e.panels[1].el.style.top = parseFloat(e.panels[1].el.style.top) + t + "px",
        e.ratio = (parseFloat(e.panels[0].el.style.height) + .5 * e.splitSize) / e.el.clientHeight
    } else {
        let t = this.currentPt.x - this.lastPt.x;
        e.panels[0].el.style.width = parseFloat(e.panels[0].el.style.width) + t + "px",
        e.splitEl.style.left = parseFloat(e.splitEl.style.left) + t + "px",
        e.panels[1].el.style.left = parseFloat(e.panels[1].el.style.left) + t + "px",
        e.ratio = (parseFloat(e.panels[0].el.style.width) + .5 * e.splitSize) / e.el.clientWidth
    }
    this.lastPt.x = this.currentPt.x,
    this.lastPt.y = this.currentPt.y
}
,
PZ.ui.splitPanel.prototype.dragEnd = function(e) {
    this.ctx.resize()
}
,
PZ.ui.elevator = class extends PZ.ui.panel {
    constructor(e, t) {
        super(e),
        this.el = document.createElement("div"),
        this.el.style = "position: absolute;",
        this.el.pz_panel = this,
        this.minWidth = 200,
        this.minHeight = 100,
        this.panels = t,
        this.create(),
        this.onEnabledChanged.watch( () => {
            this.activePanel.enabled = this.enabled,
            this.tabLock(!this.enabled)
        }
        ),
        this.changeTab(this.tabcontainer.children[0])
    }
    resize() {
        for (var e = 0; e < this.panels.length; e++)
            this.panels[e] === this.activePanel ? this.panels[e].resize() : this.panels[e].needsResize = !0
    }
    buttonKeyDown(e) {
        let t = e.currentTarget;
        "ArrowUp" === e.key ? t.previousElementSibling && (t.removeAttribute("tabindex"),
        t.previousElementSibling.setAttribute("tabindex", 0),
        t.previousElementSibling.focus()) : "ArrowDown" === e.key ? t.nextElementSibling && (t.removeAttribute("tabindex"),
        t.nextElementSibling.setAttribute("tabindex", 0),
        t.nextElementSibling.focus()) : "Enter" === e.key && t.click()
    }
    selectionChanged() {
        for (var e = this.sequence.ui.selection, t = this.tabcontainer.getElementsByClassName("selected")[0], i = 0; i < this.tabcontainer.children.length; i++) {
            var s = this.tabcontainer.children[i];
            if (s.pz_tab.selectionChanged)
                s.pz_tab.selectionChanged(e) ? (s.classList.remove("nocontext"),
                s.pz_tab.hideIfNoContext && (s.style.display = "")) : (s.classList.add("nocontext"),
                s.pz_tab.hideIfNoContext && (s.style.display = "none")),
                t === s && this.changeTab(s)
        }
    }
    create() {
        this.container = document.createElement("div"),
        this.container.classList.add("elevator"),
        this.el.appendChild(this.container);
        var e = document.createElement("button");
        e.setAttribute("title", "Menu"),
        e.appendChild(PZ.ui.generateIcon("menu")),
        e.children[0].style.top = "4px",
        e.onclick = this.buttonClick.bind(this),
        this.container.appendChild(e),
        this.tabcontainer = document.createElement("div"),
        this.tabcontainer.classList.add("elevatortabs", "noselect"),
        this.container.appendChild(this.tabcontainer);
        var t = document.createElement("div");
        t.classList.add("elevatorcontrols"),
        this.el.appendChild(t);
        for (var i = 0; i < this.panels.length; i++) {
            let e = this.panels[i].el;
            e.style.width = "100%",
            e.style.height = "100%",
            e.style.display = "none",
            t.appendChild(e);
            let s = document.createElement("a");
            s.setAttribute("title", this.panels[i].title),
            s.pz_tab = this.panels[i],
            s.pz_tab.editor = this.editor,
            s.pz_container = e,
            s.onclick = this.buttonClick.bind(this),
            s.onkeydown = this.buttonKeyDown,
            s.ondragenter = ( () => {
                s.pz_changeTimeout = setTimeout( () => s.click(), 200)
            }
            ),
            s.ondragleave = ( () => {
                clearTimeout(s.pz_changeTimeout)
            }
            ),
            this.panels[i].needsResize = !0;
            let n = PZ.ui.generateIcon(this.panels[i].icon);
            s.appendChild(n);
            let r = document.createElement("span");
            r.innerText = this.panels[i].title,
            s.appendChild(r),
            this.tabcontainer.appendChild(s)
        }
    }
    toggle(e) {
        var t = this.container.classList.contains("open");
        (t = void 0 !== e ? e : !t) ? (this.container.classList.add("open"),
        this.tabcontainer.style.overflowY = "auto") : (this.container.classList.remove("open"),
        this.tabcontainer.style.overflowY = "")
    }
    buttonClick(e) {
        let t = e.currentTarget;
        !0 !== t.disabled && (t.pz_tab ? (this.changeTab(t),
        this.toggle(!1)) : this.toggle())
    }
    changeTab(e) {
        var t = this.tabcontainer.getElementsByClassName("selected")[0];
        t && (t.classList.remove("selected"),
        t.pz_container.style.display = "none",
        t.pz_tab.unfocus && t.pz_tab.unfocus(),
        t.pz_tab.hasFocus = !1),
        e.classList.add("selected"),
        e.pz_container.style.display = "block";
        let i = this.tabcontainer.querySelector('*[tabindex="0"]');
        i && i.removeAttribute("tabindex"),
        e.setAttribute("tabindex", "0"),
        e.pz_tab.needsCreate && (e.pz_tab.create(),
        e.pz_tab.needsCreate = !1),
        e.pz_tab.needsResize && (e.pz_tab.resize(),
        e.pz_tab.needsResize = !1),
        this.activePanel && (this.activePanel.enabled = !1),
        this.activePanel = e.pz_tab,
        this.activePanel.enabled = this.enabled,
        this.activePanel.el.focus()
    }
    tabLock(e) {
        let t = this.container.children[1].children
          , i = e ? "hidden" : "";
        Array.prototype.forEach.call(t, e => {
            e.classList.contains("selected") || (e.style.visibility = i)
        }
        )
    }
}
,
PZ.ui.edit = function(e, t) {
    PZ.ui.panel.call(this, e),
    this.title = "Edit",
    this.icon = "tree",
    this.minHeight = 20,
    this.minWidth = 20,
    this.propertyOps = new PZ.ui.properties(this.editor),
    this.propertyListEls = [],
    this._updateFn = this.update.bind(this),
    this.onEnabledChanged.watch( () => {
        this.enabled ? this.animFrameReq = requestAnimationFrame(this._updateFn) : cancelAnimationFrame(this.animFrameReq),
        this.options.keyframePanel && (this.options.keyframePanel.objects = this.enabled ? this.objects : null),
        this.enabled && this.objectsNeedUpdate && (this.objectsChanged(),
        this.objectsNeedUpdate = !1)
    }
    ),
    PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
    this.objects = null,
    this.objectsNeedUpdate = !1,
    this.objectsChanged_bound = ( () => {
        this.enabled ? this.objectsChanged() : this.objectsNeedUpdate = !0
    }
    ),
    this.onObjectsChanged.watch(e => {
        e && e.onListChanged.unwatch(this.objectsChanged_bound),
        this.objects && this.objects.onListChanged.watch(this.objectsChanged_bound),
        this.objectsChanged_bound()
    }
    ),
    this.selection = new PZ.objectList,
    this.options = {
        skipTopParent: !1,
        childFilter: () => !0,
        skipSingleChildren: !0,
        collapseLists: !0,
        showPropertyControls: !0,
        showListItemButtons: !0,
        alwaysShowListItemButtons: !0,
        hideAllListItemButtons: !1,
        columnLayout: 0,
        defaultColumnWidth: void 0,
        emptyMessage: "select an object",
        objectFilter: e => !0,
        objectMap: e => e,
        objectLimit: 10,
        hideAnimateToggle: !1,
        selectionFilter: e => !0
    },
    Object.assign(this.options, t),
    this.el.style.overflow = "auto",
    this.el.classList.add("noselect"),
    this.create()
}
,
PZ.ui.edit.prototype = {
    constructor: PZ.ui.edit,
    createObject(e) {
        let t = this.editor.project.addressLookup(e.newParentAddress);
        void 0 === e.newIdx && (e.newIdx = t.length);
        let i = e.baseType.create(e.subType);
        t.splice(e.newIdx, 0, i),
        i.loading = i.load(e.data),
        this.editor.history.pushCommand(PZ.ui.edit.prototype.deleteObject.bind(this), {
            oldParentAddress: e.newParentAddress,
            oldIdx: e.newIdx
        })
    },
    moveObject(e) {
        let t = this.editor.project.addressLookup(e.oldParentAddress)
          , i = this.editor.project.addressLookup(e.newParentAddress)
          , s = t.splice(e.oldIdx, 1)[0];
        void 0 === e.newIdx && (e.newIdx = i.length),
        i.splice(e.newIdx, 0, s),
        e.oldParentAddress = t.getAddress(),
        e.newParentAddress = i.getAddress(),
        this.editor.history.pushCommand(PZ.ui.edit.prototype.moveObject.bind(this), {
            oldParentAddress: e.newParentAddress,
            oldIdx: e.newIdx,
            newParentAddress: e.oldParentAddress,
            newIdx: e.oldIdx
        })
    },
    deleteObject(e) {
        let t = this.editor.project.addressLookup(e.oldParentAddress)
          , i = t[e.oldIdx];
        i.unload(),
        t.splice(e.oldIdx, 1),
        this.editor.history.pushCommand(PZ.ui.edit.prototype.createObject.bind(this), {
            newParentAddress: e.oldParentAddress,
            newIdx: e.oldIdx,
            baseType: t.type,
            subType: i.type,
            data: i
        })
    },
    generateAdd: function(e, t) {
        let i = {
            top: this.el.scrollTop,
            left: this.el.scrollLeft
        };
        this.el.firstElementChild.style.display = "none";
        let s = document.createElement("div");
        s.style = "height: 100%; display: grid; grid-template-rows: min-content min-content auto;";
        let n = PZ.ui.objectTypes.get(e.type)
          , r = {
            shouldSort: !0,
            threshold: .45,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [{
                name: "name",
                weight: .6
            }, {
                name: "desc",
                weight: .4
            }]
        }
          , a = new Fuse(n,r)
          , o = new Map
          , l = ""
          , h = document.createElement("button");
        h.classList.add("proprow", "propbutton", "noselect"),
        h.innerText = "Cancel",
        h.onclick = ( () => {
            s.remove(),
            this.el.firstElementChild.style.display = "",
            this.el.scrollTop = i.top,
            this.el.scrollLeft = i.left
        }
        ),
        s.appendChild(h);
        let c = document.createElement("input");
        (c = document.createElement("input")).setAttribute("type", "text"),
        c.setAttribute("placeholder", "type to filter"),
        c.classList.add("pz-filterbox"),
        s.appendChild(c),
        h.onkeydown = function(e) {
            "Escape" === e.key || "Enter" === e.key ? h.click() : (c.focus(),
            c.dispatchEvent(new KeyboardEvent(e.type,e))),
            e.stopPropagation()
        }
        ,
        c.onkeyup = (e => {
            let t = c.value;
            if (t !== l) {
                for (l = t; p.children.length; )
                    p.children[0].classList.remove("active"),
                    p.children[0].remove();
                "" !== t ? (a.search(t).forEach(e => !e.category && p.appendChild(o.get(e))),
                p.firstElementChild && p.firstElementChild.classList.add("active")) : n.forEach(e => p.appendChild(o.get(e)))
            }
        }
        ),
        c.onkeydown = (e => {
            var t = s.lastElementChild;
            if ("ArrowUp" === e.key) {
                e.preventDefault();
                let i = t.querySelector(".active");
                i || (i = t.firstElementChild),
                i.classList.remove("active"),
                "LI" !== (i = i.previousElementSibling || t.lastElementChild).tagName && (i = i.previousElementSibling || t.lastElementChild),
                i.classList.add("active"),
                i.scrollIntoViewIfNeeded(!1)
            } else if ("ArrowDown" === e.key) {
                e.preventDefault();
                let i = t.querySelector(".active");
                i || (i = t.lastElementChild),
                i.classList.remove("active"),
                "LI" !== (i = i.nextElementSibling || t.firstElementChild).tagName && (i = i.nextElementSibling),
                i.classList.add("active"),
                i.scrollIntoViewIfNeeded(!1)
            } else if ("Escape" === e.key)
                h.click();
            else {
                if ("Enter" !== e.key)
                    return;
                {
                    let i = t.querySelector(".active");
                    if (!i)
                        return;
                    i.dispatchEvent(new MouseEvent("click",{
                        ctrlKey: e.ctrlKey
                    }))
                }
            }
            e.stopPropagation()
        }
        );
        let p = document.createElement("ul");
        p.classList.add("pz-options", "noselect"),
        p.style = "overflow-y: auto;",
        s.appendChild(p);
        let d = t => {
            let i = document.createElement("li")
              , s = document.createTextNode(t.name);
            if (i.appendChild(s),
            t.desc) {
                let e = document.createElement("span");
                e.innerText = t.desc,
                i.appendChild(e)
            }
            return i.pz_item = t,
            i.onclick = (async t => {
                let i = t.currentTarget.pz_item;
                if (i.list && (!i.hidelist || t.ctrlKey))
                    return n = i.list,
                    a = new Fuse(n,r),
                    o = new Map,
                    l = "",
                    c.value = "",
                    void m();
                let s = i.data;
                "function" == typeof s && (s = await s.call(this)),
                this.editor.history.startOperation(),
                e instanceof PZ.objectSingleton && e.length > 0 && this.deleteObject({
                    oldParentAddress: e.getAddress(),
                    oldIdx: 0
                }),
                this.createObject({
                    newParentAddress: e.getAddress(),
                    baseType: e.type,
                    subType: i.type,
                    data: s
                }),
                this.editor.history.finishOperation(),
                h.click()
            }
            ),
            i.onmousedown = (e => e.preventDefault()),
            i
        }
          , u = e => {
            let t = document.createElement("span");
            return t.innerText = e.name,
            t
        }
          , m = () => {
            p.innerHTML = "";
            for (var e = 0; e < n.length; e++) {
                let t, i = n[e];
                t = !0 === i.category ? p.appendChild(u(i)) : p.appendChild(d(i)),
                o.set(i, t)
            }
        }
        ;
        m(),
        this.el.appendChild(s),
        c.focus(),
        t.stopPropagation()
    },
    generateChildrenList: function(e, t) {
        t instanceof PZ.object && (t = [t]),
        e.classList.add("parent");
        let i = document.createElement("ul");
        i.pz_paddingLevel = e.parentElement.pz_paddingLevel + 15;
        for (let e = 0; e < t.length; e++)
            this.generateListItem(i, t[e]);
        e.parentElement.insertBefore(i, e.nextElementSibling)
    },
    generateObjectList: function(e, t) {
        e.classList.add("parent");
        let i = document.createElement("ul");
        if (i.pz_paddingLevel = e.parentElement.pz_paddingLevel + 15,
        this.options.showPropertyControls && (t.type === PZ.property || t.type === PZ.property.dynamic)) {
            this.propertyListEls.push(i);
            let e = new PZ.ui.controls(this.editor,t);
            e.el = i,
            i.pz_controls = e
        }
        i.pz_objectAdded = ( (e, t) => {
            this.generateListItem(i, e, t)
        }
        ),
        i.pz_objectRemoved = ( (e, t) => {
            let s = Array.prototype.filter.call(i.children, e => "LI" === e.tagName);
            this.unloadListItem(s[t])
        }
        ),
        i.pz_object = t,
        t.onObjectAdded.watch(i.pz_objectAdded),
        t.onObjectRemoved.watch(i.pz_objectRemoved);
        for (let e = 0; e < t.length; e++)
            this.generateListItem(i, t[e]);
        e.parentElement.insertBefore(i, e.nextElementSibling)
    },
    generatePropertyList: function(e, t) {
        e.classList.add("parent");
        let i = document.createElement("ul");
        i.pz_paddingLevel = e.parentElement.pz_paddingLevel + 15,
        this.options.showPropertyControls && this.propertyListEls.push(i);
        let s = new PZ.ui.controls(this.editor,t);
        s.el = i,
        i.pz_controls = s,
        i.pz_listChanged = ( () => {
            for (; i.children.length; )
                this.unloadListItem(i.children[0]);
            for (let e of t)
                !1 !== e.definition.visible && !1 !== e.visible && this.generateListItem(i, e)
        }
        ),
        i.pz_object = t,
        t.onListChanged.watch(i.pz_listChanged, !0),
        e.parentElement.insertBefore(i, e.nextElementSibling)
    },
    generateButton: function(e) {
        let t = document.createElement("button")
          , i = PZ.ui.generateIcon(e);
        return i.style = "width:17px;height:17px;fill:#ccc;",
        t.classList.add("actionbutton"),
        t.appendChild(i),
        t
    },
    renameClick: function(e) {
        let t = e.currentTarget;
        if (t.classList.contains("editing"))
            return;
        let i = t.pz_object.properties.name;
        t.classList.add("editing");
        let s = t.children[0];
        Array.prototype.forEach.call(s.children, e => e.style.display = "none");
        s.getElementsByTagName("span")[0];
        let n = document.createElement("input");
        n.classList.add("pz-inputbox", "rename");
        let r = i.get()
          , a = () => {
            let e = n.value;
            n.remove(),
            Array.prototype.forEach.call(s.children, e => e.style.display = ""),
            t.classList.remove("editing"),
            e !== r && (this.editor.history.startOperation(),
            this.propertyOps.setValue({
                property: i.getAddress(),
                value: e,
                oldValue: r
            }),
            this.editor.history.finishOperation())
        }
        ;
        n.onmousedown = n.onclick = n.ontouchstart = function(e) {
            e.stopPropagation()
        }
        ,
        n.onkeydown = function(e) {
            "Enter" === e.key ? (this.blur(),
            e.preventDefault()) : "Escape" === e.key && (this.value = r,
            this.blur(),
            e.preventDefault()),
            e.stopPropagation()
        }
        ,
        n.onblur = function(e) {
            a()
        }
        ,
        n.value = r,
        s.appendChild(n),
        n.focus(),
        e.preventDefault()
    },
    collapseClick: function(e) {
        let t = this.parentElement.parentElement;
        this.classList.contains("collapsed") ? (this.classList.remove("collapsed"),
        t.nextElementSibling.style.display = "") : (this.classList.add("collapsed"),
        t.nextElementSibling.style.display = "none"),
        e.stopPropagation()
    },
    generateItemCommands: function(e, t) {
        let i = e.children[1]
          , s = i.firstElementChild;
        if (!(t instanceof PZ.property || this.options.hideAllListItemButtons))
            if (i.classList.add("actions"),
            t instanceof PZ.propertyList) {
                let e = this.generateButton("reset");
                e.title = "reset",
                e.onclick = (e => {
                    this.editor.history.startOperation(),
                    this.propertyOps.resetAll(t),
                    this.editor.history.finishOperation()
                }
                ),
                i.insertBefore(e, s)
            } else if (t instanceof PZ.objectList) {
                if (PZ.ui.objectTypes.has(t.type) && t.parent instanceof PZ.property == !1) {
                    let e = t instanceof PZ.objectSingleton ? "change" : "add"
                      , n = this.generateButton(e);
                    n.title = e,
                    n.onclick = this.generateAdd.bind(this, t),
                    i.insertBefore(n, s)
                }
            } else if (t.parent && t.parent instanceof PZ.objectList && this.options.showListItemButtons) {
                if (!(t.parent instanceof PZ.objectSingleton)) {
                    let e = this.generateButton("duplicate");
                    e.title = "clone",
                    e.onclick = (e => {
                        let t = e.currentTarget.parentElement.parentElement.pz_object;
                        if (!(t.parent instanceof PZ.objectList))
                            return;
                        let i = t.getAddress()
                          , s = {
                            newParentAddress: i,
                            newIdx: i.pop() + 1,
                            baseType: t.parent.type,
                            subType: t.type,
                            data: JSON.parse(JSON.stringify(t))
                        };
                        this.editor.history.startOperation(),
                        this.createObject(s),
                        this.editor.history.finishOperation(),
                        e.stopPropagation()
                    }
                    ),
                    i.insertBefore(e, s)
                }
                let e = this.generateButton("remove");
                e.title = "delete",
                e.onclick = (e => {
                    let t = e.currentTarget.parentElement.parentElement.pz_object;
                    if (!(t.parent instanceof PZ.objectList))
                        return;
                    let i = t.getAddress()
                      , s = {
                        oldParentAddress: i,
                        oldIdx: i.pop()
                    };
                    this.editor.history.startOperation(),
                    this.deleteObject(s),
                    this.editor.history.finishOperation(),
                    e.stopPropagation()
                }
                ),
                i.insertBefore(e, s)
            }
    },
    generateListItem: function(e, t, i) {
        let s = document.createElement("li");
        s.style.gridTemplateColumns = this.columnTemplate;
        let n = !0;
        s.pz_object = t;
        let r = document.createElement("div");
        r.style.paddingLeft = e.pz_paddingLevel + "px";
        let a = document.createElement("span");
        a.style.pointerEvents = "none",
        r.appendChild(a),
        s.appendChild(r);
        let o = document.createElement("div");
        s.appendChild(o),
        this.generateItemCommands(s, t);
        let l = Array.prototype.filter.call(e.children, e => "LI" === e.tagName);
        if (e.insertBefore(s, l[i]),
        t instanceof PZ.object && this.item_drag.addElts(s),
        t.properties && t.properties.name && (s.pz_renamed = ( () => {
            a.innerText = t.properties.name.get(),
            a.title = a.innerText
        }
        ),
        t.properties.name.onChanged.watch(s.pz_renamed, !0),
        t.properties.name.definition.readOnly || (s.oncontextmenu = this.renameClick.bind(this))),
        t instanceof PZ.property && (t.definition.name && (a.innerText = t.definition.name,
        a.title = a.innerText),
        this.options.showPropertyControls && (PZ.ui.controls.createControls(s, t, this.options.hideAnimateToggle),
        t.onAnimatedChanged && (s.pz_animatedChanged = ( () => {
            r.getElementsByClassName("actionbutton")[0].remove(),
            o.innerHTML = "",
            PZ.ui.controls.createControls(s, t, this.options.hideAnimateToggle)
        }
        ),
        t.onAnimatedChanged.watch(s.pz_animatedChanged)),
        t.onChanged))) {
            let e = s.getElementsByClassName("editbox")[0];
            s.pz_changed = e.pz_update.bind(e);
            let i = void 0 !== t.value;
            t.onChanged.watch(s.pz_changed, i)
        }
        if (t instanceof PZ.propertyList)
            a.innerText = "Properties",
            a.title = a.innerText,
            this.generatePropertyList(s, t);
        else if (t instanceof PZ.objectList)
            a.innerText = t.name,
            a.title = a.innerText,
            this.generateObjectList(s, t);
        else {
            let e = (t.children || []).filter(this.options.childFilter).filter(e => !1 !== e.visible);
            1 !== e.length || !this.options.skipSingleChildren || e[0]instanceof PZ.object ? e.length > 0 ? this.generateChildrenList(s, e) : n = !1 : (e[0]instanceof PZ.objectList ? this.generateObjectList(s, e[0]) : this.generatePropertyList(s, e[0]),
            this.generateItemCommands(s, e[0]))
        }
        if (n) {
            let e = document.createElement("button");
            e.innerText = "⯆",
            e.classList.add("collapse"),
            e.setAttribute("tabindex", "-1"),
            e.onclick = this.collapseClick,
            r.insertBefore(e, r.firstElementChild),
            t instanceof PZ.property.dynamic.group && (e.classList.add("collapsed"),
            s.nextElementSibling.style.display = "none")
        } else
            r.style.paddingLeft = parseFloat(r.style.paddingLeft) + 20 + "px";
        return s
    },
    unloadListItem: function(e) {
        let t = e.nextElementSibling;
        if (t && "UL" === t.tagName) {
            for (; t.children.length; )
                this.unloadListItem(t.children[0]);
            t.pz_objectAdded && (t.pz_object.onObjectAdded.unwatch(t.pz_objectAdded),
            t.pz_object.onObjectRemoved.unwatch(t.pz_objectRemoved)),
            t.pz_listChanged && t.pz_object.onListChanged.unwatch(t.pz_listChanged),
            this.options.showPropertyControls && (t.pz_object instanceof PZ.propertyList || t.pz_object instanceof PZ.objectList && (t.pz_object.type === PZ.property || t.pz_object.type === PZ.property.dynamic)) && this.propertyListEls.splice(this.propertyListEls.indexOf(t), 1),
            t.remove()
        }
        e.pz_animatedChanged && e.pz_object.onAnimatedChanged.unwatch(e.pz_animatedChanged),
        e.pz_changed && e.pz_object.onChanged.unwatch(e.pz_changed),
        e.pz_renamed && e.pz_object.properties.name.onChanged.unwatch(e.pz_renamed),
        e.classList.contains("selected") && this.selection.splice(this.selection.indexOf(e.pz_object), 1),
        e.remove()
    },
    objectsChanged: function() {
        for (; this.list.children.length; )
            this.unloadListItem(this.list.children[0]);
        this.emptyMessage.nextElementSibling && (this.emptyMessage.nextElementSibling.remove(),
        this.el.firstElementChild.style.display = "");
        let e = (this.objects || []).filter(this.options.objectFilter).map(this.options.objectMap);
        if (e.length) {
            this.emptyMessage.style.display = "none";
            for (let t = 0; t < e.length; t++) {
                this.generateListItem(this.list, e[t]).classList.add("toplevel")
            }
        } else
            this.emptyMessage.style.display = ""
    },
    create: function() {
        let e = document.createElement("div");
        e.style.position = "relative",
        this.list = document.createElement("ul"),
        this.list.pz_paddingLevel = 0,
        this.list.classList.add("tree"),
        e.appendChild(this.list),
        0 === this.options.columnLayout && (this.columnAdjust = document.createElement("div"),
        this.columnAdjust.classList.add("columnadjust"),
        e.appendChild(this.columnAdjust),
        this.column_drag = new PZ.ui.drag(this.columnAdjust,this.columnDragStart,this.columnDrag,this.columnDragUpdate,null,this)),
        this.item_drag = new PZ.ui.drag([],this.itemDragStart,this.itemDrag,this.itemDragUpdate,this.itemDragEnd,this),
        this.el.appendChild(e),
        this.emptyMessage = document.createElement("div"),
        this.emptyMessage.classList.add("empty", "noselect"),
        this.emptyMessage.innerText = this.options.emptyMessage,
        this.el.appendChild(this.emptyMessage),
        this.el.addEventListener("keydown", this.keydown.bind(this))
    },
    keydown: async function(e) {
        if (PZ.ui.toolbar.prototype.shouldIgnoreKeydown(e.target, e.key))
            return;
        if ("Delete" === e.key || "Del" === e.key || "Backspace" === e.key) {
            e.stopPropagation();
            let t = this.el.querySelectorAll(".selected");
            this.editor.history.startOperation();
            for (let e = 0; e < t.length; e++) {
                let i = t[e].pz_object.getAddress()
                  , s = i.pop();
                this.deleteObject({
                    oldParentAddress: i,
                    oldIdx: s
                })
            }
            this.editor.history.finishOperation()
        }
        if (!e.ctrlKey)
            return;
        let t = e.key.toLowerCase();
        if ("c" === t || "x" === t) {
            if (!this.selection.length)
                return;
            let e = new PZ.package(this.selection)
              , i = JSON.stringify([e]);
            if (navigator.clipboard.writeText(i),
            "x" === t) {
                let e = this.el.querySelectorAll(".selected");
                this.editor.history.startOperation();
                for (let t = 0; t < e.length; t++) {
                    let i = e[t].pz_object.getAddress()
                      , s = i.pop();
                    this.deleteObject({
                        oldParentAddress: i,
                        oldIdx: s
                    })
                }
                this.editor.history.finishOperation()
            }
        } else if ("v" === t) {
            let t = await navigator.clipboard.readText()
              , i = [];
            try {
                i = JSON.parse(t)
            } catch (e) {}
            let s, n = e => {
                let t, s, n = e.getAddress();
                e instanceof PZ.objectList || (e = e.parent,
                t = n.pop() + 1),
                s = e.type;
                for (let r = i.length - 1; r >= 0; r--)
                    if (PZ.object.getType(i[r].baseType) === e.type) {
                        let a = i.splice(r, 1)[0].data;
                        for (let i = 0; i < a.length; i++)
                            e instanceof PZ.objectSingleton && e.length > 0 && this.deleteObject({
                                oldParentAddress: n,
                                oldIdx: 0
                            }),
                            this.createObject({
                                newParentAddress: n,
                                baseType: s,
                                subType: a[i].type,
                                data: a[i],
                                newIdx: t ? t++ : void 0
                            })
                    }
            }
            ;
            this.editor.history.startOperation(),
            s = this.selection.length ? this.selection : Array.from(this.list.children).map(e => e.pz_object);
            for (let e = 0; e < s.length; e++) {
                let t = s[e];
                if (t instanceof PZ.object)
                    for (let e = 0; e < t.children.length; e++)
                        t.children[e]instanceof PZ.objectList && n(t.children[e]);
                (t instanceof PZ.objectList || t.parent instanceof PZ.objectList) && n(t)
            }
            this.editor.history.finishOperation()
        }
    },
    update: function() {
        this.animFrameReq = requestAnimationFrame(this._updateFn);
        let e = this.editor.playback.currentFrame;
        for (let t = 0; t < this.propertyListEls.length; t++)
            this.updatePropertyList(this.propertyListEls[t], e)
    },
    updatePropertyList: function(e, t) {
        for (let i = 0; i < e.children.length; i++) {
            let s = e.children[i]
              , n = s.pz_object;
            if (n instanceof PZ.property.dynamic == !1)
                continue;
            let r = t - n.frameOffset;
            (s.getElementsByClassName("editbox")[0].pz_update(r),
            n.animated) && s.children[1].children[0].pz_update(r)
        }
    },
    setColumnTemplate: function(e) {
        let t = this.list.getElementsByTagName("li");
        for (let i = 0; i < t.length; i++)
            t[i].style.gridTemplateColumns = e;
        this.columnTemplate = e
    },
    selectItems: function() {
        let e = this.list.getElementsByClassName("selected");
        e = Array.from(e).map(e => e.pz_object),
        this.selection.splice(0, this.selection.length, ...e)
    },
    deselectItems: function() {
        let e = this.list.getElementsByClassName("selected");
        for (; e.length; )
            e[0].classList.remove("selected")
    },
    columnDragStart: function(e) {
        this.startPt = e.pageX,
        this.currentPt = e.pageX,
        this.startScroll = this.ctx.el.scrollLeft,
        this.startLeft = this.ctx.columnAdjust.offsetLeft
    },
    columnDrag: function(e) {
        this.currentPt = e.pageX
    },
    columnDragUpdate: function() {
        let e = this.currentPt - this.startPt + (this.ctx.el.scrollLeft - this.startScroll)
          , t = Math.max(this.startLeft + e, 10);
        this.ctx.columnAdjust.style.left = t + "px";
        let i = t + "px auto";
        this.ctx.setColumnTemplate(i)
    },
    itemDragStart: function(e) {
        if (this.item = e.currentTarget,
        e.currentTarget !== e.srcElement && e.currentTarget !== e.srcElement.parentElement)
            return !1;
        if (this.ctx.el.focus(),
        this.item.classList.contains("toplevel"))
            return !1;
        if (this.item.classList.contains("selected"))
            this.originalState = !0;
        else {
            this.originalState = !1;
            let t = this.ctx.el.getElementsByClassName("selected")[0];
            e.shiftKey && t && t.pz_object.baseTypeString !== this.item.pz_object.baseTypeString || this.ctx.options.selectionFilter(this.item.pz_object) && (e.shiftKey || this.ctx.deselectItems(),
            this.item.classList.add("selected"))
        }
        this.startPt = e.pageY,
        this.origin = this.ctx.el.getBoundingClientRect().top,
        this.moved = !1,
        this.ctx.columnAdjust && (this.ctx.columnAdjust.style.pointerEvents = "none"),
        this.indicatorEl = document.createElement("div"),
        this.indicatorEl.style = "background-color:#ffffff;opacity:0.25;width:100%;position:relative;pointer-events:none;"
    },
    itemDrag: function(e) {
        this.currentPt = e.pageY,
        this.target = e.target
    },
    itemDragUpdate: function() {
        if (!this.moved && Math.abs(this.currentPt - this.startPt) < 5)
            return;
        this.moved = !0,
        this.indicatorEl.remove(),
        this.operation = 0;
        let e = 4;
        for (; this.target && "LI" !== this.target.tagName && e-- > 0; )
            this.target = this.target.parentElement;
        if (!this.target || !this.target.pz_object || this.target === this.item)
            return;
        let t = !1
          , i = !1;
        if (this.target.nextElementSibling && this.target.nextElementSibling.pz_object instanceof PZ.objectList && this.item.pz_object instanceof this.target.nextElementSibling.pz_object.type && (this.target.nextElementSibling.pz_object instanceof PZ.objectSingleton && 0 !== this.target.nextElementSibling.pz_object.length || (t = !0)),
        this.target.parentElement.pz_object instanceof PZ.objectList && this.item.pz_object instanceof this.target.parentElement.pz_object.type && (this.target.parentElement.pz_object instanceof PZ.objectSingleton || (i = !0)),
        !t && !i)
            return;
        let s = 1 / (1 * t + 2 * i)
          , n = (this.currentPt - this.origin - (this.target.offsetTop - this.ctx.el.scrollTop)) / this.target.offsetHeight;
        if (i) {
            if (n < s)
                return this.target.parentElement.insertBefore(this.indicatorEl, this.target),
                this.indicatorEl.style.height = "3px",
                this.indicatorEl.style.marginTop = "-3px",
                this.indicatorEl.style.top = "1px",
                void (this.operation = 1);
            if (1 - n < s)
                return this.target.parentElement.insertBefore(this.indicatorEl, this.target.nextElementSibling),
                this.indicatorEl.style.height = "3px",
                this.indicatorEl.style.marginTop = "-3px",
                this.indicatorEl.style.top = "1px",
                void (this.operation = 2)
        }
        t && (this.target.parentElement.insertBefore(this.indicatorEl, this.target),
        this.indicatorEl.style.height = this.target.offsetHeight + "px",
        this.indicatorEl.style.marginTop = -this.target.offsetHeight + "px",
        this.indicatorEl.style.top = this.target.offsetHeight + "px",
        this.operation = 3)
    },
    itemDragEnd: function(e) {
        if (this.ctx.columnAdjust && (this.ctx.columnAdjust.style.pointerEvents = ""),
        this.indicatorEl.remove(),
        e.shiftKey && !1 === this.moved && !0 === this.originalState && this.item.classList.remove("selected"),
        this.ctx.selectItems(),
        this.target && this.operation) {
            let t, i, s = this.item.pz_object;
            if (e.altKey)
                t = this.ctx.createObject,
                i = {
                    baseType: s.parent.type,
                    subType: s.type,
                    data: s
                };
            else {
                t = this.ctx.moveObject;
                let e = s.getAddress();
                i = {
                    oldParentAddress: e,
                    oldIdx: e.pop()
                }
            }
            if (3 === this.operation) {
                let e = this.target.nextElementSibling;
                i.newParentAddress = e.pz_object.getAddress()
            } else {
                let e = this.target.parentElement;
                i.newParentAddress = e.pz_object.getAddress();
                let t = Array.prototype.filter.call(e.children, e => "LI" === e.tagName && e !== this.item);
                i.newIdx = t.indexOf(this.target),
                2 === this.operation && (i.newIdx += 1)
            }
            if (t === this.ctx.moveObject) {
                let e = [...i.oldParentAddress, i.oldIdx]
                  , t = i.newParentAddress;
                if (e.every( (e, i) => e === t[i]))
                    return
            }
            this.ctx.editor.history.startOperation(),
            t.call(this.ctx, i),
            this.ctx.editor.history.finishOperation()
        }
    },
    resize() {
        this.columnTemplate || (void 0 === this.options.defaultColumnWidth && (this.options.defaultColumnWidth = .5 * this.el.clientWidth + "px"),
        2 === this.options.columnLayout ? this.setColumnTemplate("auto auto") : 1 === this.options.columnLayout ? this.setColumnTemplate("minmax(0, auto) min-content") : (this.columnAdjust.style.left = this.options.defaultColumnWidth,
        this.setColumnTemplate(this.options.defaultColumnWidth + " auto")))
    }
},
PZ.ui.edit.importOBJ = async function() {
    let e, t = (e = await new Promise( (e, t) => {
        this.editor.showFilePicker(e, ".obj")
    }
    )).currentTarget.files;
    if (!t || !t[0])
        return;
    let i = new FileReader
      , s = t[0].name;
    e = await new Promise( (e, s) => {
        i.onload = e,
        i.readAsText(t[0])
    }
    );
    try {
        let t = (new THREE.OBJLoader).parse(e.target.result)
          , i = {
            properties: {
                name: s
            },
            objects: []
        };
        for (let e = 0; e < t.children.length; e++) {
            let s = {
                type: 0,
                objectType: 99,
                properties: {
                    name: t.name || "Geometry",
                    geometryProperties: {}
                }
            };
            var n = new Blob([JSON.stringify(t.children[e].geometry)],{
                type: "application/json"
            })
              , r = await this.editor.project.assets.createFromFile(PZ.asset.type.GEOMETRY, n);
            s.properties.geometryProperties.customGeometry = r,
            i.objects.push(s)
        }
        return i
    } catch (e) {
        console.log(e)
    }
}
,
PZ.ui.edit.importImage = async function() {
    let e, t = (e = await new Promise( (e, t) => {
        this.editor.showFilePicker(e, "image/*")
    }
    )).currentTarget.files;
    if (!t || !t[0])
        return;
    let i = await this.editor.project.assets.createFromFile(PZ.asset.type.IMAGE, t[0])
      , s = new Image;
    return await new Promise(function(e, t) {
        s.onload = async function() {
            var t = this.width
              , s = this.height;
            if (0 === t || 0 === s)
                return void e();
            let n = {
                effects: [],
                properties: {
                    childProperties: {
                        image: i.key
                    },
                    resolution: [t, s]
                }
            };
            this.onload = null,
            e(n)
        }
        ,
        s.src = i.url
    }
    )
}
,
PZ.ui = PZ.ui || {},
PZ.ui.edit = PZ.ui.edit || {},
PZ.ui.objectTypes = new Map,
PZ.ui.objectTypes.set(PZ.effect, [{
    name: "LAYER",
    category: !0
}, {
    name: "Color Overlay",
    desc: "Blends a solid color over opaque areas.",
    type: "coloroverlay"
}, {
    name: "Gradient Overlay",
    desc: "Blends a gradient over opaque areas.",
    type: "gradientoverlay"
}, {
    name: "Image Overlay",
    desc: "Blends an image over opaque areas.",
    type: "overlay"
}, {
    name: "COLOR",
    category: !0
}, {
    name: "Negative",
    desc: "Inverts colors.",
    type: "negative"
}, {
    name: "Saturation",
    desc: "Adjust color saturation and create grayscale effects.",
    type: "grayscale"
}, {
    name: "Brightness + Contrast",
    desc: "Adjust image brightness and contrast.",
    type: "brightnesscontrast"
}, {
    name: "Color Grading",
    desc: "Adjust the grading of shadows, midtones, and highlights.",
    type: "colorgrading"
}, {
    name: "Color Adjustment",
    desc: "Add, multiply, and exponentiate colors to adjust appearance.",
    type: "colorcorrection"
}, {
    name: "Colorize",
    desc: "Changes the hue of the image.",
    type: "colorize"
}, {
    name: "Posterize",
    desc: "Reduces the number of colors.",
    type: "posterize"
}, {
    name: "Chroma Key",
    desc: "Masks the image based on color.",
    type: "chromakey"
}, {
    name: "Luma Key",
    desc: "Masks the image based on brightness.",
    type: "lumakey"
}, {
    name: "Technicolor",
    desc: "Simulates a classic movie color process.",
    type: "technicolor"
}, {
    name: "Color Shift",
    desc: "Shift all of the hue values of the image.",
    type: "hueshift"
}, {
    name: "Exposure",
    desc: "Simulates adjusting image exposure.",
    type: "exposure"
}, {
    name: "Cube LUT",
    desc: "Applies a preset Cube LUT file to remap colors.",
    type: "cubelut"
}, {
    name: "ENHANCE",
    category: !0
}, {
    name: "Antialiasing",
    desc: "Softens jagged, sharp edges.",
    type: "fxaa"
}, {
    name: "Bloom",
    desc: "Adds a glowing effect to bright areas.",
    type: "bloom"
}, {
    name: "Anamorphic Lens Flare",
    desc: "Creates horizontal flares from bright areas.",
    type: "anamorphicflare"
}, {
    name: "Edge Detection",
    desc: "Applies a Sobel filter to emphasize edges.",
    type: "edgedetection"
}, {
    name: "DISTORT",
    category: !0
}, {
    name: "RGB Shift",
    desc: "Shifts color channels apart.",
    type: "rgbshift"
}, {
    name: "Fisheye",
    desc: "Simulates a fisheye lens.",
    type: "fisheye"
}, {
    name: "Pulse",
    desc: "Distorts radially outward in a ripple pattern.",
    type: "pulse"
}, {
    name: "Wavy",
    desc: "Distorts vertically in a wavy pattern.",
    type: "wavy"
}, {
    name: "Pixelated",
    desc: "Reduces image resolution with large pixels.",
    type: "pixelated"
}, {
    name: "Swirl",
    desc: "Distorts in a spiral pattern.",
    type: "swirl"
}, {
    name: "Static",
    desc: "Creates grainy, noisy distortion.",
    type: "static"
}, {
    name: "Glitch",
    desc: "Simulates glitches by randomly displacing portions of the image.",
    type: "glitch"
}, {
    name: "Displacement Map",
    desc: "Uses a map to displace portions of the image.",
    type: "displacementmap"
}, {
    name: "Twitch",
    desc: "Combines various effects to create a chaotic distortion effect.",
    type: 0,
    data: {
        type: 0,
        properties: {
            name: "Twitch (beta v1)",
            enabled: {
                animated: !1,
                keyframes: [{
                    value: 1,
                    frame: 0,
                    tween: 1
                }]
            }
        },
        customProperties: [{
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "Amount"
            },
            animated: !1,
            keyframes: [{
                value: .3,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "Speed"
            },
            animated: !1,
            keyframes: [{
                value: 2,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "RGB Shift amount"
            },
            animated: !1,
            keyframes: [{
                value: 24,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "RGB Shift tendency"
            },
            animated: !1,
            keyframes: [{
                value: 10,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "Slide amount"
            },
            animated: !1,
            keyframes: [{
                value: .5,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "Slide tendency"
            },
            animated: !1,
            keyframes: [{
                value: 10,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "Blur amount"
            },
            animated: !1,
            keyframes: [{
                value: 2,
                frame: 0,
                tween: 1
            }]
        }, {
            type: {
                custom: !0,
                dynamic: !0,
                type: 0,
                value: 0
            },
            properties: {
                name: "Blur tendency"
            },
            animated: !1,
            keyframes: [{
                value: 10,
                frame: 0,
                tween: 1
            }]
        }],
        objects: [{
            type: "rgbshift",
            properties: {
                name: "RGB Shift",
                enabled: {
                    animated: !1,
                    keyframes: [{
                        value: 1,
                        frame: 0,
                        tween: 1
                    }]
                },
                amount: {
                    animated: !0,
                    expression: 'var amt = properties["Amount"];\namt *= properties["RGB Shift amount"];\nvar spd = properties["Speed"];\nspd *= properties["RGB Shift tendency"];\namt * shake(time, spd, 1, 0, 2)'
                },
                angle: {
                    animated: !1,
                    keyframes: [{
                        value: 1.55,
                        frame: 0,
                        tween: 1
                    }]
                }
            }
        }, {
            type: "directionalblur",
            properties: {
                name: "Directional Blur",
                enabled: {
                    animated: !1,
                    keyframes: [{
                        value: 1,
                        frame: 0,
                        tween: 1
                    }]
                },
                delta: {
                    animated: !0,
                    expression: 'var amt = properties["Amount"];\namt *= properties["Blur amount"];\nvar spd = properties["Speed"];\nspd *= properties["Blur tendency"];\namt * shake(time, spd * 10, 1, 0, 2)'
                },
                direction: {
                    animated: !1,
                    keyframes: [{
                        value: 1.55,
                        frame: 0,
                        tween: 1
                    }]
                }
            }
        }, {
            type: "brightnesscontrast",
            properties: {
                name: "Brightness + Contrast",
                enabled: {
                    animated: !1,
                    keyframes: [{
                        value: 1,
                        frame: 0,
                        tween: 1
                    }]
                },
                brightness: {
                    animated: !0,
                    expression: 'var amt = properties["Amount"];\nvar spd = properties["Speed"];\namt * shake(time, spd * 5, 0.1, 1, 1)'
                },
                contrast: {
                    animated: !1,
                    keyframes: [{
                        value: 1,
                        frame: 0,
                        tween: 1
                    }]
                }
            }
        }, {
            type: "transform",
            properties: {
                name: "Transform",
                enabled: {
                    animated: !1,
                    keyframes: [{
                        value: 1,
                        frame: 0,
                        tween: 1
                    }]
                },
                cameraType: 0,
                cameraPosition: {
                    animated: !0,
                    expression: 'var amt = properties["Amount"];\namt *= properties["Slide amount"];\nvar spd = properties["Speed"];\nspd *= properties["Slide tendency"];\nvar slide = amt * shake(time, spd, 50, 0, 2);\n[0,slide,0]'
                },
                cameraRotation: {
                    animated: !1,
                    keyframes: [{
                        value: [0, 0, 0],
                        frame: 0,
                        tween: 1
                    }]
                },
                imagePosition: {
                    animated: !1,
                    keyframes: [{
                        value: [0, 0, 0],
                        frame: 0,
                        tween: 1
                    }]
                },
                imageRotation: {
                    animated: !1,
                    keyframes: [{
                        value: [0, 0, 0],
                        frame: 0,
                        tween: 1
                    }]
                },
                imageScale: {
                    animated: !1,
                    keyframes: [{
                        value: [1, 1],
                        frame: 0,
                        tween: 1
                    }]
                }
            }
        }]
    }
}, {
    name: "Pixel Sort",
    desc: "Rearranges pixels based on relative brightness.",
    type: "pixelsort"
}, {
    name: "Scan Lines",
    desc: "Simulates scan lines.",
    type: "scanlines"
}, {
    name: "BLUR + SHARPEN",
    category: !0
}, {
    name: "Box Blur",
    desc: "Blurs the image using a fast blur technique.",
    type: "boxblur"
}, {
    name: "Gaussian Blur",
    desc: "Blurs the image using a higher quality blur technique.",
    type: "gaussianblur"
}, {
    name: "Radial Blur",
    desc: "Blurs radially from a specified point.",
    type: "radialblur"
}, {
    name: "Directional Blur",
    desc: "Blurs the image in a single direction.",
    type: "directionalblur"
}, {
    name: "Sharpen",
    desc: "Sharpens the image.",
    type: "sharpen"
}, {
    name: "FRAMING",
    category: !0
}, {
    name: "Crop",
    desc: "Trims the edges of the image.",
    type: "crop"
}, {
    name: "Transform",
    desc: "Applies 3d transformation to the image.",
    type: "transform"
}, {
    name: "Mask",
    desc: "Mask a part of the image to be transparent.",
    type: "mask"
}, {
    name: "Shutter",
    desc: "Simulates a camera shutter for cover and fade effects.",
    type: "shutter"
}, {
    name: "Duplicate",
    desc: "Creates a grid of image copies.",
    type: "duplicate"
}, {
    name: "Mirror",
    desc: "Uses reflection to create a symmetrical image.",
    type: "mirror"
}, {
    name: "Flip",
    desc: "Flips the image in the specified directions.",
    type: "flip"
}, {
    name: "Shake",
    desc: "Simulates a shaking camera by transforming the image.",
    type: "shake"
}, {
    name: "MISC",
    category: !0
}, {
    name: "Group",
    desc: "Meta-effect for object management.",
    type: 0
}, {
    name: "Shader",
    desc: "Custom shader effect.",
    type: 1
}]),
PZ.ui.objectTypes.set(PZ.object3d, [{
    name: "OBJECTS",
    category: !0
}, {
    name: "Shape",
    desc: "Primitive object such as a box or sphere.",
    type: 0,
    list: [{
        name: "Box",
        type: 0,
        data: {
            objectType: 1
        }
    }, {
        name: "Cylinder",
        type: 0,
        data: {
            objectType: 2
        }
    }, {
        name: "Rectangle",
        type: 0,
        data: {
            objectType: 3
        }
    }, {
        name: "Circle",
        type: 0,
        data: {
            objectType: 4
        }
    }, {
        name: "Sphere",
        type: 0,
        data: {
            objectType: 5
        }
    }, {
        name: "Donut",
        type: 0,
        data: {
            objectType: 6
        }
    }, {
        name: "Wire",
        type: 0,
        data: {
            objectType: 7
        }
    }]
}, {
    name: "Text",
    desc: "Custom 3D text.",
    type: 1
}, {
    name: "Light",
    desc: "Creates light and shadows in a scene.",
    type: 3,
    hidelist: !0,
    list: [{
        name: "Spot light",
        type: 3,
        data: {
            objectType: 1
        }
    }, {
        name: "Point light",
        type: 3,
        data: {
            objectType: 2
        }
    }, {
        name: "Directional light",
        type: 3,
        data: {
            objectType: 3
        }
    }, {
        name: "Hemisphere light",
        type: 3,
        data: {
            objectType: 4
        }
    }]
}, {
    name: "Particles",
    desc: "A system of many animated sprites.",
    type: 4
}, {
    name: "Group",
    desc: "Meta-object for combining objects into one.",
    type: 5
}, {
    name: "Camera",
    desc: "Defines what is visible in the rendered image.",
    type: 6,
    list: [{
        name: "Perspective camera (3d)",
        type: 6,
        data: {
            objectType: 1
        }
    }, {
        name: "Orthographic camera (2d)",
        type: 6,
        data: {
            objectType: 2
        }
    }]
}, {
    name: "Model",
    desc: "Import an OBJ object file.",
    type: 5,
    data: PZ.ui.edit.importOBJ
}]),
PZ.ui.objectTypes.set(PZ.property.dynamic, [{
    name: "Number",
    type: {
        custom: !0,
        dynamic: !0,
        type: PZ.property.type.NUMBER
    }
}, {
    name: "2D Vector",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "X",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Y",
            type: PZ.property.type.NUMBER,
            value: 0
        }],
        type: PZ.property.type.VECTOR2
    }
}, {
    name: "3D Vector",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "X",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Y",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Z",
            type: PZ.property.type.NUMBER,
            value: 0
        }],
        type: PZ.property.type.VECTOR3
    }
}, {
    name: "4D Vector",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "X",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Y",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Z",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "W",
            type: PZ.property.type.NUMBER,
            value: 0
        }],
        type: PZ.property.type.VECTOR4
    }
}, {
    name: "Color",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "R",
            type: PZ.property.type.NUMBER,
            value: 1,
            min: 0,
            max: 1
        }, {
            dynamic: !0,
            name: "G",
            type: PZ.property.type.NUMBER,
            value: 1,
            min: 0,
            max: 1
        }, {
            dynamic: !0,
            name: "B",
            type: PZ.property.type.NUMBER,
            value: 1,
            min: 0,
            max: 1
        }],
        type: PZ.property.type.COLOR
    }
}]),
PZ.ui.objectTypes.set(PZ.property, [{
    name: "STATIC",
    category: !0
}, {
    name: "Number",
    type: {
        custom: !0,
        type: PZ.property.type.NUMBER,
        value: 0
    }
}, {
    name: "Image",
    type: {
        custom: !0,
        type: PZ.property.type.ASSET,
        assetType: PZ.asset.type.IMAGE,
        accept: "image/*",
        value: null
    }
}, {
    name: "DYNAMIC",
    category: !0
}, {
    name: "Number",
    type: {
        custom: !0,
        dynamic: !0,
        type: PZ.property.type.NUMBER
    }
}, {
    name: "2D Vector",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "X",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Y",
            type: PZ.property.type.NUMBER,
            value: 0
        }],
        type: PZ.property.type.VECTOR2
    }
}, {
    name: "3D Vector",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "X",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Y",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Z",
            type: PZ.property.type.NUMBER,
            value: 0
        }],
        type: PZ.property.type.VECTOR3
    }
}, {
    name: "4D Vector",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "X",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Y",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "Z",
            type: PZ.property.type.NUMBER,
            value: 0
        }, {
            dynamic: !0,
            name: "W",
            type: PZ.property.type.NUMBER,
            value: 0
        }],
        type: PZ.property.type.VECTOR4
    }
}, {
    name: "Color",
    type: {
        custom: !0,
        group: !0,
        dynamic: !0,
        objects: [{
            dynamic: !0,
            name: "R",
            type: PZ.property.type.NUMBER,
            value: 1,
            min: 0,
            max: 1
        }, {
            dynamic: !0,
            name: "G",
            type: PZ.property.type.NUMBER,
            value: 1,
            min: 0,
            max: 1
        }, {
            dynamic: !0,
            name: "B",
            type: PZ.property.type.NUMBER,
            value: 1,
            min: 0,
            max: 1
        }],
        type: PZ.property.type.COLOR
    }
}]),
PZ.ui.objectTypes.set(PZ.material, [{
    name: "Single Color",
    type: "singlecolor"
}, {
    name: "Image",
    type: "texture"
}, {
    name: "Video",
    type: "video"
}, {
    name: "Custom Material",
    type: "custom"
}]),
PZ.ui.objectTypes.set(PZ.layer, [{
    name: "LAYERS",
    category: !0
}, {
    name: "Image",
    desc: "Import an image.",
    type: 3,
    data: PZ.ui.edit.importImage
}, {
    name: "Text",
    desc: "Custom text.",
    type: 7
}, {
    name: "Preset Shape",
    desc: "Simple preset shapes.",
    type: 8
}, {
    name: "Shape",
    desc: "Arbitrary 2D bezier shape.",
    type: 6
}, {
    name: "Adjustment",
    desc: "A meta-layer used to add effects to lower layers.",
    type: 1
}, {
    name: "Composite",
    desc: "A meta-layer used to composite child layers.",
    type: 2
}, {
    name: "Scene",
    desc: "Render 3D objects.",
    type: 4
}]),
PZ.ui.objectTypes.set(PZ.shape, [{
    name: "Group",
    type: 0
}, {
    name: "Path",
    type: 1
}]),
PZ.ui.objectTypes.set(PZ.draw, [{
    name: "Fill",
    type: 0
}, {
    name: "Stroke",
    type: 1
}]),
PZ.ui.controls = function(e, t) {
    this.editor = e,
    this.propertyOps = new PZ.ui.properties(this.editor),
    this.properties = t
}
,
PZ.editor = {},
PZ.editor.showEaseDropDown = function(e) {
    var t = PZ.editor.easeDropDown;
    if (void 0 === PZ.editor.easeDropDown) {
        (t = PZ.editor.easeDropDown = document.createElement("ul")).classList.add("pz-dropdown"),
        t.setAttribute("tabindex", "-1"),
        t.onkeydown = function(e) {
            if ("Escape" === e.key)
                this.blur(),
                e.preventDefault();
            else if ("Enter" === e.key) {
                let t = Array.from(this.parentElement.children).findIndex(e => e.classList.contains("pz-active"));
                this.pz_input.pz_set(t),
                this.blur(),
                e.preventDefault()
            } else if ("ArrowUp" === e.key || "ArrowDown" === e.key) {
                let s = Array.from(this.parentElement.children).findIndex(e => e.classList.contains("pz-active"))
                  , n = this.parentElement.children[s];
                "ArrowUp" === e.key ? s -= 1 : s += 1;
                var i = this.parentElement.children[s];
                if (!i)
                    return;
                n.classList.remove("pz-active"),
                i.classList.add("pz-active"),
                t.pz_scrollTo(s),
                e.preventDefault()
            }
        }
        ,
        t.pz_scrollTo = function(e) {
            var t = this.children[0].offsetHeight
              , i = this.scrollTop;
            (t * e < i || t * (e + 1) > i + this.scrollHeight) && (this.scrollTop = t * e)
        }
        ;
        for (var i = 0; i < PZ.tween.easingList.length; i++) {
            let e = document.createElement("li")
              , s = PZ.ui.generateIcon("ease_" + i);
            e.appendChild(s);
            let n = document.createElement("span");
            n.innerText = PZ.tween.easingList[i].name,
            e.appendChild(n),
            e.onmouseenter = function() {
                Array.from(this.parentElement.children).forEach(e => e.classList.remove("pz-active")),
                this.classList.add("pz-active")
            }
            ,
            e.onclick = function() {
                let e = Array.prototype.indexOf.call(this.parentElement.children, this);
                this.parentElement.pz_input.pz_set(e),
                this.parentElement.blur()
            }
            ,
            t.appendChild(e)
        }
        t.onblur = function() {
            this.remove(),
            e.focus()
        }
    }
    document.body.appendChild(t);
    var s = t.offsetWidth
      , n = t.offsetHeight
      , r = t.ownerDocument
      , a = r.documentElement.clientWidth
      , o = r.documentElement.clientHeight
      , l = e.getBoundingClientRect();
    let h = l.top
      , c = l.left;
    h += l.height,
    c -= Math.min(l.left, l.left + s > a && a > s ? Math.abs(l.left + s - a) : 0),
    h -= Math.min(l.top, l.top + n > o && o > n ? Math.abs(n + l.height - 0) : 0),
    t.style.top = h + "px",
    t.style.left = c + "px",
    Array.from(t.children).forEach(e => e.classList.remove("pz-active")),
    t.children[e.pz_value].classList.add("pz-active"),
    t.pz_scrollTo(e.pz_value),
    t.pz_input = e,
    t.focus()
}
,
PZ.editor.showFontDropDown = function(e) {
    var t = PZ.editor.fontDropDown;
    if (void 0 === PZ.editor.fontDropDown) {
        (t = PZ.editor.fontDropDown = document.createElement("ul")).classList.add("pz-dropdown"),
        t.setAttribute("tabindex", "-1"),
        t.style = "width: auto",
        t.onkeydown = function(e) {
            if ("Escape" === e.key)
                this.blur(),
                e.preventDefault();
            else if ("Enter" === e.key) {
                let t = Array.from(this.parentElement.children).findIndex(e => e.classList.contains("pz-active"));
                this.pz_input.pz_set(t),
                this.blur(),
                e.preventDefault()
            } else if ("ArrowUp" === e.key || "ArrowDown" === e.key) {
                let s = Array.from(this.parentElement.children).findIndex(e => e.classList.contains("pz-active"))
                  , n = this.parentElement.children[s];
                "ArrowUp" === e.key ? s -= 1 : s += 1;
                var i = this.parentElement.children[s];
                if (!i)
                    return;
                n.classList.remove("pz-active"),
                i.classList.add("pz-active"),
                t.pz_scrollTo(s),
                e.preventDefault()
            }
        }
        ,
        t.pz_scrollTo = function(e) {
            var t = this.children[0].offsetHeight
              , i = this.scrollTop;
            (t * e < i || t * (e + 1) > i + this.scrollHeight) && (this.scrollTop = t * e)
        }
        ;
        for (var i = 0; i < PZ.asset.font.preset.length + 1; i++) {
            let e = document.createElement("li")
              , s = document.createElement("span");
            s.style = "background-image: url('fonts.png');width:200px;height:25px;display:block;",
            s.style.backgroundPositionY = -25 * i + "px",
            e.appendChild(s),
            e.onmouseenter = function() {
                Array.from(this.parentElement.children).forEach(e => e.classList.remove("pz-active")),
                this.classList.add("pz-active")
            }
            ,
            e.onclick = function() {
                let e = Array.prototype.indexOf.call(this.parentElement.children, this);
                this.parentElement.pz_input.pz_set(e),
                this.parentElement.blur()
            }
            ,
            t.appendChild(e)
        }
        t.onblur = function() {
            this.remove(),
            e.focus()
        }
    }
    document.body.appendChild(t);
    var s = t.offsetWidth
      , n = t.offsetHeight
      , r = t.ownerDocument
      , a = r.documentElement.clientWidth
      , o = r.documentElement.clientHeight
      , l = e.getBoundingClientRect();
    let h = l.top
      , c = l.left;
    h += l.height,
    c -= Math.min(l.left, l.left + s > a && a > s ? Math.abs(l.left + s - a) : 0),
    h -= Math.min(l.top, l.top + n > o && o > n ? Math.abs(n + l.height - 0) : 0),
    t.style.top = h + "px",
    t.style.left = c + "px",
    Array.from(t.children).forEach(e => e.classList.remove("pz-active")),
    t.children[e.pz_value].classList.add("pz-active"),
    t.pz_scrollTo(e.pz_value),
    t.pz_input = e,
    t.focus()
}
,
PZ.ui.controls.previousKeyframeClick = function() {
    let e = this.parentElement.parentElement.parentElement
      , t = e.pz_object
      , i = e.parentElement.pz_controls
      , s = t.frameOffset
      , n = i.editor.playback.currentFrame - s
      , r = t.getPreviousKeyframe(n);
    r && (i.editor.playback.currentFrame = r.frame + s)
}
,
PZ.ui.controls.nextKeyframeClick = function() {
    let e = this.parentElement.parentElement.parentElement
      , t = e.pz_object
      , i = e.parentElement.pz_controls
      , s = t.frameOffset
      , n = i.editor.playback.currentFrame - s
      , r = t.getNextKeyframe(n);
    r && (i.editor.playback.currentFrame = r.frame + s)
}
,
PZ.ui.controls.keyframeToggleClick = function() {
    let e = this.parentElement.parentElement.parentElement
      , t = e.pz_object
      , i = e.parentElement.pz_controls
      , s = i.editor.playback.currentFrame - t.frameOffset;
    i.editor.history.startOperation(),
    i.propertyOps.toggleKeyframe(t, s),
    i.editor.history.finishOperation()
}
,
PZ.ui.controls.createKeyframeControls = function(e) {
    let t = document.createElement("div");
    t.style = "height: 27px; margin-bottom: 5px;";
    let i = document.createElement("button");
    i.classList.add("pz-tweens"),
    i.title = "interpolation",
    i.pz_value = 0,
    i.onclick = function() {
        let e = i;
        e.pz_set(0 === e.pz_value ? 1 : 0)
    }
    ;
    let s = PZ.ui.generateIcon("interp_0");
    s.style = "width:35px;height:23px;pointer-events:none",
    i.appendChild(s);
    let n = document.createElement("button");
    n.classList.add("pz-tweens"),
    n.title = "easing",
    n.pz_value = 0,
    n.onclick = function() {
        PZ.editor.showEaseDropDown(n)
    }
    ;
    let r = PZ.ui.generateIcon("ease_1");
    r.style = "width:35px;height:23px;pointer-events:none",
    n.appendChild(r),
    i.pz_set = function(e) {
        this.pz_update(e << 8, !0);
        let t = this.parentElement.parentElement.parentElement
          , s = t.pz_object
          , r = t.parentElement.pz_controls
          , a = r.editor.playback.currentFrame - s.frameOffset;
        if (r.editor.history.startOperation(),
        s instanceof PZ.property.dynamic.group)
            for (let e = 0; e < s.objects.length; e++)
                s.objects[e].hasKeyframe(a) && r.propertyOps.setTween({
                    property: s.objects[e].getAddress(),
                    frame: a,
                    tween: i.pz_value << 8 | n.pz_value
                });
        else
            r.propertyOps.setTween({
                property: s.getAddress(),
                frame: a,
                tween: i.pz_value << 8 | n.pz_value
            });
        r.editor.history.finishOperation()
    }
    ,
    i.pz_update = function(e, t) {
        !1 === t ? this.style.visibility = "hidden" : (this.pz_value = e >> 8,
        this.style.visibility = "visible",
        PZ.ui.switchIcon(this.children[0], "interp_" + this.pz_value))
    }
    ,
    n.pz_set = function(e) {
        this.pz_update(e, !0);
        let t = this.parentElement.parentElement.parentElement
          , s = t.pz_object
          , r = t.parentElement.pz_controls
          , a = r.editor.playback.currentFrame - s.frameOffset;
        if (r.editor.history.startOperation(),
        s instanceof PZ.property.dynamic.group)
            for (let e = 0; e < s.objects.length; e++)
                s.objects[e].hasKeyframe(a) && r.propertyOps.setTween({
                    property: s.objects[e].getAddress(),
                    frame: a,
                    tween: i.pz_value << 8 | n.pz_value
                });
        else
            r.propertyOps.setTween({
                property: s.getAddress(),
                frame: a,
                tween: i.pz_value << 8 | n.pz_value
            });
        r.editor.history.finishOperation()
    }
    ,
    n.pz_update = function(e, t) {
        !1 === t ? this.style.visibility = "hidden" : (this.pz_value = 255 & e,
        this.style.visibility = "visible",
        PZ.ui.switchIcon(this.children[0], "ease_" + this.pz_value))
    }
    ,
    e.interpolated || (i.style.display = "none",
    n.style.display = "none");
    let a = document.createElement("button");
    a.classList.add("actionbutton"),
    a.style = "margin-top:3px;margin-right:5px;vertical-align:top;",
    a.title = "previous keyframe",
    a.onclick = PZ.ui.controls.previousKeyframeClick;
    let o = PZ.ui.generateIcon("prevkf");
    o.style = "width:17px;height:17px;fill:#ccc;stroke-width:10px;pointer-events:none",
    a.appendChild(o);
    let l = document.createElement("button");
    l.classList.add("actionbutton"),
    l.style = "margin-top:3px;margin-right:5px;vertical-align:top;",
    l.title = "add keyframe",
    l.onclick = PZ.ui.controls.keyframeToggleClick;
    let h = PZ.ui.generateIcon("keyframe");
    h.style = "width:17px;height:17px;fill:none;stroke-width:10px;stroke:#ccc;pointer-events:none",
    l.appendChild(h);
    let c = document.createElement("button");
    c.classList.add("actionbutton"),
    c.style = "margin-top:3px;margin-right:5px;vertical-align:top;",
    c.title = "next keyframe",
    c.onclick = PZ.ui.controls.nextKeyframeClick;
    let p = PZ.ui.generateIcon("nextkf");
    return p.style = "width:17px;height:17px;fill:#ccc;stroke-width:10px;pointer-events:none",
    c.appendChild(p),
    t.appendChild(a),
    t.appendChild(l),
    t.appendChild(c),
    t.appendChild(i),
    t.appendChild(n),
    t.pz_update = function(e) {
        let t = this.parentElement.parentElement.pz_object
          , s = "none"
          , r = "add keyframe"
          , a = -1
          , o = !1;
        if (t instanceof PZ.property.dynamic.group)
            for (let i = 0; i < t.objects.length; i++) {
                let n = t.objects[i].getKeyframe(e);
                if (n)
                    if (o) {
                        if (n.tween !== a) {
                            a = -1,
                            o = !1;
                            break
                        }
                    } else
                        s = "#ccc",
                        r = "delete keyframe",
                        a = n.tween,
                        o = !0
            }
        else {
            let i = t.getKeyframe(e);
            i && (s = "#ccc",
            r = "delete keyframe",
            a = i.tween,
            o = t.definition.interpolated)
        }
        this.children[1].title = r,
        this.children[1].children[0].style.fill = s,
        i.pz_update(a, o),
        n.pz_update(a, o)
    }
    ,
    t
}
,
PZ.ui.controls.createExpressionControls = function(e) {
    let t = document.createElement("div");
    t.style = "margin-top: 5px";
    let i = document.createElement("textarea");
    i.setAttribute("wrap", "off"),
    i.setAttribute("spellcheck", "false"),
    i.style = "width: 240px; height: 40px;",
    i.classList.add("pz-inputbox"),
    t.appendChild(i);
    let s = document.createElement("div");
    t.appendChild(s);
    let n = document.createElement("button");
    n.classList.add("actionbutton"),
    n.title = "open expression editor";
    let r = PZ.ui.generateIcon("code");
    r.style = "fill:#ccc;width:17px;height:17px;",
    n.appendChild(r),
    n.onclick = ( () => {
        let i = t.parentElement.parentElement.parentElement.pz_controls.editor.createWindow({
            title: "Expression"
        })
          , s = new PZ.ui.expression(i.editor,{
            property: e
        });
        i.setPanel(s),
        s.create()
    }
    ),
    s.appendChild(n);
    let a = document.createElement("button");
    a.classList.add("actionbutton"),
    a.style.display = "none",
    a.title = "show error";
    let o = PZ.ui.generateIcon("error");
    return o.style = "fill:#ccc;width:17px;height:17px;",
    a.appendChild(o),
    a.onclick = ( () => {
        alert(e.expression.error)
    }
    ),
    s.appendChild(a),
    i.onchange = function() {
        let s = t.parentElement.parentElement.parentElement.pz_controls;
        s.editor.history.startOperation(),
        s.propertyOps.setExpression({
            property: e.getAddress(),
            expression: i.value
        }),
        s.editor.history.finishOperation()
    }
    ,
    i.onkeydown = function(e) {
        return "Enter" != e.key || !e.ctrlKey || (this.blur(),
        !1)
    }
    ,
    e.onExpressionChanged.watch( () => {
        e.expression && (i.value = e.expression.source,
        e.expression.error ? a.style.display = "" : a.style.display = "none")
    }
    , !0),
    t
}
,
PZ.ui.controls.stopwatchClick = function(e) {
    let t = this.parentElement.parentElement.pz_object
      , i = this.parentElement.parentElement.parentElement.pz_controls
      , s = i.editor.playback.currentFrame - t.frameOffset;
    i.editor.history.startOperation(),
    i.propertyOps.toggleAnimation(t, s, e.altKey),
    i.editor.history.finishOperation()
}
,
PZ.ui.controls.createControls = function(e, t, i) {
    let s, n = e.children[0], r = e.children[1];
    if (t instanceof PZ.property.dynamic) {
        var a = document.createElement("button");
        a.classList.add("actionbutton"),
        a.style = "margin-right: 5px; vertical-align: bottom;",
        a.title = "toggle animation";
        var o = PZ.ui.generateIcon("stopwatch");
        if (o.style = "fill:#2a2a2a;width:17px;height:17px;",
        a.appendChild(o),
        a.onclick = PZ.ui.controls.stopwatchClick,
        t.animated) {
            let e = 40 * PZ.stringHash(t.definition.name || "") % 360;
            o.style.fill = `hsl(${e}, 60%, 45%)`
        }
        n.insertBefore(a, n.getElementsByTagName("span")[0]),
        (t.hideAnimateToggle || i) && (a.style.display = "none")
    }
    if (t.animated && null === t.expression) {
        let e = PZ.ui.controls.createKeyframeControls(t);
        r.appendChild(e)
    }
    PZ.property.dynamic.group;
    switch (t.definition.type) {
    case PZ.property.type.NUMBER:
        s = PZ.ui.controls.generateInput(t);
        break;
    case PZ.property.type.VECTOR3:
        s = PZ.ui.controls.generateInput3(t);
        break;
    case PZ.property.type.VECTOR2:
        s = PZ.ui.controls.generateInput2(t);
        break;
    case PZ.property.type.COLOR:
        s = PZ.ui.controls.generateColorInput(t);
        break;
    case PZ.property.type.OPTION:
        s = PZ.ui.controls.generateOptionInput(t);
        break;
    case PZ.property.type.TEXT:
        s = PZ.ui.controls.generateTextInput(t);
        break;
    case PZ.property.type.GRADIENT:
        s = PZ.ui.controls.generateGradientInput(t);
        break;
    case PZ.property.type.CURVE:
        s = PZ.ui.controls.generateCurveInput(t);
        break;
    case PZ.property.type.ASSET:
        let e = t.definition.assetType;
        s = e === PZ.asset.type.FONT ? PZ.ui.controls.generateFontInput(t) : e === PZ.asset.type.IMAGE && t.definition.items ? PZ.ui.controls.generateTextureInput(t) : PZ.ui.controls.generateFileInput(t);
        break;
    case PZ.property.type.VECTOR4:
        s = PZ.ui.controls.generateInput4(t);
        break;
    case PZ.property.type.LIST:
        s = PZ.ui.controls.generateListInput(t);
        break;
    case PZ.property.type.SHADER:
        s = PZ.ui.controls.generateShaderInput(t)
    }
    if (Array.isArray(s))
        for (let e = 0; e < s.length; e++)
            r.appendChild(s[e]);
    else
        r.appendChild(s);
    if (t.animated && t.expression) {
        let e = PZ.ui.controls.createExpressionControls(t);
        r.appendChild(e)
    }
}
,
PZ.ui.controls.valueChanged = function() {
    let e = this.parentElement.pz_object
      , t = this.parentElement.parentElement.pz_controls;
    t.editor.history.startOperation(),
    t.propertyOps.toggleAnimation(e),
    t.editor.history.finishOperation()
}
,
PZ.ui.controls.editStart = function(e, t) {
    let i = this.parentElement
      , s = i.closest("ul").pz_controls;
    s.editor.history.startOperation();
    let n = s.editor.playback.currentFrame - e.frameOffset;
    if (i.pz_frame = n,
    i.pz_oldValue = JSON.parse(JSON.stringify(e.get(n))),
    e.definition.linkRatio && !t) {
        let e = i.pz_oldValue.slice()
          , t = parseFloat(this.innerText);
        if (0 !== t) {
            for (let i = 0; i < e.length; i++)
                e[i] /= t;
            i.pz_normalized = e
        }
    }
    if (e instanceof PZ.property.dynamic.group)
        for (let t = 0; t < e.objects.length; t++)
            s.propertyOps.startEdit(e.objects[t], n);
    else
        s.propertyOps.startEdit(e, n)
}
,
PZ.ui.controls.editFinish = function(e, t) {
    let i = this.parentElement
      , s = i.closest("ul").pz_controls
      , n = i.pz_frame
      , r = i.pz_oldValue;
    delete i.pz_frame,
    delete i.pz_oldValue,
    delete i.pz_normalized,
    s.propertyOps.setValue({
        property: e.getAddress(),
        frame: n,
        oldValue: r
    }),
    t ? s.editor.history.discardOperation() : s.editor.history.finishOperation()
}
,
PZ.ui.controls.generateInputSpace = function(e) {
    let t = document.createElement("span");
    return t.innerText = e.definition.spaceChar || ",",
    t.style.color = "#999",
    t
}
,
PZ.ui.controls.generateInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = e.definition.readOnly || e.animated && e.expression || e instanceof PZ.property.dynamic && !e.animated && e.keyframes.length > 1
      , s = {
        min: e.definition.min,
        max: e.definition.max,
        step: e.definition.step,
        decimals: e.definition.decimals,
        readOnly: i
    }
      , n = new PZ.ui.input(s);
    t.appendChild(n.el),
    n.editStart = PZ.ui.controls.editStart.bind(n.el, e),
    n.editFinish = PZ.ui.controls.editFinish.bind(n.el, e);
    return n.changed = function() {
        t.closest("li").parentElement.pz_controls;
        let i = t.pz_frame
          , s = e.definition.scaleFactor || 1
          , r = n.value * s;
        e.set(r, i)
    }
    ,
    t.pz_update = function(t) {
        let i = e.definition.scaleFactor || 1
          , s = e.get(t);
        n.update(s / i)
    }
    ,
    t
}
,
PZ.ui.controls.generateInput2 = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = {
        min: e.definition.min,
        max: e.definition.max,
        step: e.definition.step,
        decimals: e.definition.decimals,
        readOnly: e.definition.readOnly || e.animated && e.expression
    }
      , s = new PZ.ui.input(i)
      , n = new PZ.ui.input(i);
    t.appendChild(s.el),
    t.appendChild(PZ.ui.controls.generateInputSpace(e)),
    t.appendChild(n.el),
    s.editStart = PZ.ui.controls.editStart.bind(s.el, e),
    n.editStart = PZ.ui.controls.editStart.bind(n.el, e),
    s.editFinish = PZ.ui.controls.editFinish.bind(s.el, e),
    n.editFinish = PZ.ui.controls.editFinish.bind(n.el, e);
    let r = function(i, r, a) {
        t.parentElement.parentElement.parentElement.pz_controls;
        let o = t.pz_frame;
        t.pz_normalized && (s.set(i * t.pz_normalized[0]),
        n.set(i * t.pz_normalized[1]));
        let l = e.definition.scaleFactor || 1;
        (i = new Array(2))[0] = s.value * l,
        i[1] = n.value * l,
        e.set(i, o)
    };
    return s.changed = r,
    n.changed = r,
    t.pz_update = function(t) {
        let i = e.definition.scaleFactor || 1
          , r = e.get(t);
        s.update(r[0] / i),
        n.update(r[1] / i)
    }
    ,
    t
}
,
PZ.ui.controls.generateInput3 = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = {
        min: e.definition.min,
        max: e.definition.max,
        step: e.definition.step,
        decimals: e.definition.decimals,
        readOnly: e.definition.readOnly || e.animated && e.expression
    }
      , s = new PZ.ui.input(i)
      , n = new PZ.ui.input(i)
      , r = new PZ.ui.input(i);
    t.appendChild(s.el),
    t.appendChild(PZ.ui.controls.generateInputSpace(e)),
    t.appendChild(n.el),
    t.appendChild(PZ.ui.controls.generateInputSpace(e)),
    t.appendChild(r.el),
    s.editStart = PZ.ui.controls.editStart.bind(s.el, e),
    n.editStart = PZ.ui.controls.editStart.bind(n.el, e),
    r.editStart = PZ.ui.controls.editStart.bind(r.el, e),
    s.editFinish = PZ.ui.controls.editFinish.bind(s.el, e),
    n.editFinish = PZ.ui.controls.editFinish.bind(n.el, e),
    r.editFinish = PZ.ui.controls.editFinish.bind(r.el, e);
    let a = function(i) {
        t.parentElement.parentElement.parentElement.pz_controls;
        let a = t.pz_frame;
        t.pz_normalized && (s.set(i * t.pz_normalized[0]),
        n.set(i * t.pz_normalized[1]),
        r.set(i * t.pz_normalized[2]));
        let o = e.definition.scaleFactor || 1;
        (i = new Array(3))[0] = s.value * o,
        i[1] = n.value * o,
        i[2] = r.value * o,
        e.set(i, a)
    };
    return s.changed = a,
    n.changed = a,
    r.changed = a,
    t.pz_update = function(t) {
        let i = e.definition.scaleFactor || 1
          , a = e.get(t);
        s.update(a[0] / i),
        n.update(a[1] / i),
        r.update(a[2] / i)
    }
    ,
    t
}
,
PZ.ui.controls.generateInput4 = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = {
        min: e.definition.min,
        max: e.definition.max,
        step: e.definition.step,
        decimals: e.definition.decimals,
        readOnly: e.definition.readOnly || e.animated && e.expression
    }
      , s = new PZ.ui.input(i)
      , n = new PZ.ui.input(i)
      , r = new PZ.ui.input(i)
      , a = new PZ.ui.input(i);
    t.appendChild(s.el),
    t.appendChild(PZ.ui.controls.generateInputSpace(e)),
    t.appendChild(n.el),
    t.appendChild(PZ.ui.controls.generateInputSpace(e)),
    t.appendChild(r.el),
    t.appendChild(PZ.ui.controls.generateInputSpace(e)),
    t.appendChild(a.el),
    s.editStart = PZ.ui.controls.editStart.bind(s.el, e),
    n.editStart = PZ.ui.controls.editStart.bind(n.el, e),
    r.editStart = PZ.ui.controls.editStart.bind(r.el, e),
    a.editStart = PZ.ui.controls.editStart.bind(a.el, e),
    s.editFinish = PZ.ui.controls.editFinish.bind(s.el, e),
    n.editFinish = PZ.ui.controls.editFinish.bind(n.el, e),
    r.editFinish = PZ.ui.controls.editFinish.bind(r.el, e),
    a.editFinish = PZ.ui.controls.editFinish.bind(a.el, e);
    let o = function(i) {
        t.parentElement.parentElement.parentElement.pz_controls;
        let o = t.pz_frame;
        t.pz_normalized && (s.set(i * t.pz_normalized[0]),
        n.set(i * t.pz_normalized[1]),
        r.set(i * t.pz_normalized[2]),
        a.set(i * t.pz_normalized[3]));
        let l = e.definition.scaleFactor || 1;
        (i = new Array(4))[0] = s.value * l,
        i[1] = n.value * l,
        i[2] = r.value * l,
        i[3] = a.value * l,
        e.set(i, o)
    };
    return s.changed = o,
    n.changed = o,
    r.changed = o,
    a.changed = o,
    t.pz_update = function(t) {
        let i = e.definition.scaleFactor || 1
          , o = e.get(t);
        s.update(o[0] / i),
        n.update(o[1] / i),
        r.update(o[2] / i),
        a.update(o[3] / i)
    }
    ,
    t
}
,
PZ.ui.controls.generateTextInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    var i = document.createElement("input");
    return i.style = "width:200px;",
    i.classList.add("pz-inputbox"),
    i.onchange = function() {
        let s = t.parentElement.parentElement.parentElement.pz_controls.editor.playback.currentFrame;
        PZ.ui.controls.editStart.call(this, e),
        e.set(i.value, s),
        PZ.ui.controls.editFinish.call(this, e)
    }
    ,
    i.onkeydown = function(e) {
        return "Enter" != e.key || (this.blur(),
        !1)
    }
    ,
    t.appendChild(i),
    t.pz_update = function(t) {
        let s;
        if (e instanceof PZ.property.dynamic) {
            let i = e.getKeyframe(t);
            s = i ? i.value : null
        } else
            s = e.get(t);
        document.activeElement !== i && (i.style.visibility = null === s ? "hidden" : "visible",
        i.value = s)
    }
    ,
    t
}
,
PZ.ui.controls.generateColorInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox"),
    t.style = "line-height:0";
    let i = {
        readOnly: e.definition.readOnly || e.animated && e.expression
    }
      , s = new PZ.ui.colorPicker(i);
    s.el.style.verticalAlign = "middle",
    t.appendChild(s.el),
    s.editStart = PZ.ui.controls.editStart.bind(s.el, e),
    s.editFinish = PZ.ui.controls.editFinish.bind(s.el, e);
    if (s.changed = function() {
        t.parentElement.parentElement.parentElement.pz_controls;
        let i = t.pz_frame;
        e.set(s.value, i)
    }
    ,
    t.pz_update = function(t) {
        let i = e.get(t);
        s.update(i)
    }
    ,
    !i.readOnly) {
        let i = document.createElement("button");
        i.style = "margin-left: 10px;",
        i.title = "eyedropper",
        i.classList.add("actionbutton"),
        i.onclick = function() {
            document.body.style.cursor = "crosshair",
            document.addEventListener("click", s => {
                if (document.body.style.cursor = "",
                "CANVAS" === s.target.tagName) {
                    let n = s.target.parentElement.pz_panel;
                    if (!n || !n.renderer)
                        return;
                    let r = n.pickColor(s.layerX, s.layerY);
                    PZ.ui.controls.editStart.call(i, e),
                    e.set(r, t.pz_frame),
                    PZ.ui.controls.editFinish.call(i, e)
                }
                s.preventDefault(),
                s.stopImmediatePropagation()
            }
            , {
                capture: !0,
                once: !0
            })
        }
        ;
        let s = PZ.ui.generateIcon("eyedropper");
        s.style = "width: 17px; height:17px; fill: #ccc;",
        i.appendChild(s),
        t.appendChild(i)
    }
    return t
}
,
PZ.ui.controls.generateOptionInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    var i = document.createElement("select");
    i.classList.add("pz-inputbox"),
    (e.definition.readOnly || e.animated && e.expression) && i.setAttribute("disabled", "true"),
    i.onchange = function() {
        t.parentElement.parentElement.parentElement.pz_controls;
        PZ.ui.controls.editStart.call(this, e);
        let s = t.pz_frame;
        e.set(i.selectedIndex, s),
        PZ.ui.controls.editFinish.call(this, e)
    }
    ;
    var s = e.definition.items;
    "string" == typeof s && (s = s.split(";"));
    for (var n = 0; n < s.length; ++n) {
        let e = document.createElement("option");
        e.innerText = s[n],
        i.appendChild(e)
    }
    return t.appendChild(i),
    t.pz_update = function(t) {
        let s = e.get(t);
        document.activeElement !== i && (i.selectedIndex = s)
    }
    ,
    t
}
,
PZ.ui.controls.generateGradientInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = new PZ.ui.gradientPicker({});
    t.appendChild(i.el),
    i.editStart = PZ.ui.controls.editStart.bind(i.el, e),
    i.editFinish = PZ.ui.controls.editFinish.bind(i.el, e);
    return i.changed = function() {
        e.set(i.value)
    }
    ,
    t.pz_update = function() {
        let t = e.get();
        i.update(t)
    }
    ,
    t
}
,
PZ.ui.controls.generateCurveInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = new PZ.ui.curvePicker({});
    t.appendChild(i.el),
    i.editStart = PZ.ui.controls.editStart.bind(i.el, e),
    i.editFinish = PZ.ui.controls.editFinish.bind(i.el, e);
    return i.changed = function() {
        e.set(i.value)
    }
    ,
    t.pz_update = function() {
        let t = e.get();
        i.update(t)
    }
    ,
    t
}
,
PZ.ui.controls.generateFontInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = document.createElement("button");
    i.classList.add("pz-tweens"),
    i.title = "font",
    i.style = "height:auto",
    i.onclick = ( () => PZ.editor.showFontDropDown(i)),
    i.pz_value = 0;
    let s = document.createElement("span");
    s.style = "display:block; width:200px; height:25px; margin:1px; background-image:url('fonts.png')",
    i.appendChild(s),
    i.pz_set = function(t) {
        this.pz_value = t;
        let i = null;
        if (t !== PZ.asset.font.preset.length) {
            let s = e.parentProject.assets
              , n = "/assets/fonts/2d/" + PZ.asset.font.preset[t] + ".ttf";
            i = s.createFromPreset(PZ.asset.type.FONT, n).key
        }
        PZ.ui.controls.editStart.call(this, e),
        e.set(i),
        PZ.ui.controls.editFinish.call(this, e)
    }
    ,
    i.pz_update = function() {
        let e = this.pz_value;
        i.children[0].style.backgroundPositionY = -25 * e + "px"
    }
    ,
    t.appendChild(i);
    let n = PZ.ui.controls.generateFileInput(e);
    return n.style.display = "none",
    t.pz_update = function() {
        let t = e.get()
          , s = PZ.asset.font.preset.length;
        if (t && t.startsWith("/")) {
            n.style.display = "none";
            let e = /([^\/]+)\.ttf/gm.exec(t);
            s = PZ.asset.font.preset.indexOf(e[1])
        } else
            n.style.display = "",
            n.pz_update();
        i.pz_value = s,
        i.pz_update()
    }
    ,
    [t, n]
}
,
PZ.ui.controls.generateTextureInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    var i = document.createElement("select");
    i.classList.add("pz-inputbox"),
    i.onchange = function() {
        t.parentElement.parentElement.parentElement.pz_controls;
        let i = this.selectedIndex
          , s = null;
        if (i !== e.definition.items.length) {
            let t = e.parentProject.assets
              , n = e.definition.baseUrl + e.definition.items[i] + ".png";
            s = t.createFromPreset(PZ.asset.type.IMAGE, n).key
        }
        PZ.ui.controls.editStart.call(this, e),
        e.set(s),
        PZ.ui.controls.editFinish.call(this, e)
    }
    ;
    for (var s = e.definition.items, n = 0; n < s.length; ++n) {
        let e = document.createElement("option");
        e.innerText = s[n],
        i.appendChild(e)
    }
    let r = document.createElement("option");
    r.innerText = "custom",
    i.appendChild(r),
    t.appendChild(i);
    let a = PZ.ui.controls.generateFileInput(e);
    return a.style.display = "none",
    t.pz_update = function() {
        let t = e.get()
          , s = e.definition.items.length;
        if (t && t.startsWith("/")) {
            a.style.display = "none";
            let i = /([^\/]+)\.png/gm.exec(t);
            s = e.definition.items.indexOf(i[1])
        } else
            a.style.display = "",
            a.pz_update();
        i.selectedIndex = s
    }
    ,
    [t, a]
}
,
PZ.ui.controls.generateListInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    var i = document.createElement("select");
    i.classList.add("pz-inputbox"),
    i.onchange = function() {
        t.parentElement.parentElement.parentElement.pz_controls;
        PZ.ui.controls.editStart.call(this, e);
        let s = t.pz_frame
          , n = i.children[i.selectedIndex].pz_value;
        e.set(n, s),
        PZ.ui.controls.editFinish.call(this, e)
    }
    ;
    for (var s = e.definition.items, n = 0; n < s.length; n++) {
        let e = document.createElement("option");
        e.innerText = s[n].name,
        e.pz_value = s[n].value,
        i.appendChild(e)
    }
    return t.appendChild(i),
    t.pz_update = function(t) {
        let n = e.get(t);
        document.activeElement !== i && (i.selectedIndex = s.findIndex(e => e.value === n))
    }
    ,
    t
}
,
PZ.ui.controls.generateFileInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = document.createElement("input");
    i.setAttribute("type", "file"),
    i.setAttribute("tabindex", "-1"),
    e.definition.accept && i.setAttribute("accept", e.definition.accept),
    e.definition.multiple && i.setAttribute("multiple", "true"),
    i.style = "height:0px;width:0px;overflow:hidden;display:block;position: absolute;",
    i.onchange = async function() {
        if (i.files && i.files[0]) {
            let t = e.parentProject.assets
              , s = await t.createFromFile(e.definition.assetType, i.files[0]);
            PZ.ui.controls.editStart.call(this, e),
            e.set(s.key),
            PZ.ui.controls.editFinish.call(this, e)
        }
    }
    ;
    let s = document.createElement("button");
    s.classList.add("actionbutton"),
    s.title = "choose file...";
    let n = PZ.ui.generateIcon("load");
    n.style = "fill:#ccc;width:17px;height:17px;",
    s.appendChild(n),
    s.onclick = ( () => i.click());
    let r = document.createElement("button");
    r.classList.add("actionbutton"),
    r.title = "delete";
    let a = PZ.ui.generateIcon("remove");
    a.style = "fill:#ccc;width:17px;height:17px;",
    r.appendChild(a),
    r.onclick = ( () => {
        PZ.ui.controls.editStart.call(i, e),
        e.set(null),
        PZ.ui.controls.editFinish.call(i, e)
    }
    );
    let o = document.createElement("span");
    return o.style = "color: #999;",
    e.definition.readOnly || (o.style.verticalAlign = "middle",
    t.style.lineHeight = "0",
    t.appendChild(i),
    t.appendChild(s),
    t.appendChild(r)),
    t.appendChild(o),
    t.pz_update = function() {
        let t = e.get();
        if (null === t)
            r.style.display = "none",
            o.innerText = "(none)",
            o.title = "";
        else {
            r.style.display = "";
            let i = e.parentProject.assets.list[t]
              , s = (e, t) => e.length > t ? e.substr(0, t - 3) + "..." : e
              , n = i.filename || i.key;
            o.innerText = s(n, 20),
            o.title = n
        }
    }
    ,
    t
}
,
PZ.ui.controls.generateShaderInput = function(e) {
    let t = document.createElement("div");
    t.classList.add("editbox");
    let i = document.createElement("button");
    i.classList.add("actionbutton"),
    i.title = "open expression editor";
    let s = PZ.ui.generateIcon("code");
    return s.style = "fill:#ccc;width:17px;height:17px;",
    i.appendChild(s),
    i.onclick = ( () => {
        let i = t.parentElement.parentElement.parentElement.pz_controls.editor.createWindow({
            title: "Shader"
        })
          , s = new PZ.ui.shader(i.editor,{
            property: e
        });
        i.setPanel(s),
        s.create()
    }
    ),
    t.appendChild(i),
    t.pz_update = function() {}
    ,
    t
}
,
PZ.ui.controls.getExactTimeString = function(e) {
    var t = e / 60
      , i = Math.floor(t / 60);
    return t = Math.floor(t % 60),
    e %= 60,
    ("0" + i).slice(-2) + ":" + ("0" + t).slice(-2) + ":" + ("0" + e.toFixed(3)).slice(-6)
}
,
PZ.ui.controls.getTimeString = function(e) {
    if (void 0 === e || isNaN(e) || e === 1 / 0)
        return "calculating...";
    var t = ""
      , i = Math.floor(e / 60 / 60)
      , s = Math.floor(e / 60) % 60
      , n = Math.floor(e) % 60;
    return t += i > 0 ? i + " hour" + (i > 1 ? "s" : "") : s > 0 ? s + " minute" + (s > 1 ? "s" : "") : n > 3 ? n + " seconds" : "a few seconds"
}
,
PZ.ui.controls.legacy = {
    generateSpacer() {
        let e = document.createElement("div");
        return e.classList.add("proprow", "spacer"),
        e
    },
    generateTitle(e) {
        let t = document.createElement("div");
        t.classList.add("proprow", "proptitle", "noselect"),
        t.style = "text-overflow: ellipsis;overflow: hidden;white-space: nowrap;padding-right: 5px;";
        let i = document.createElement("span");
        return i.classList.add("proplabel"),
        i.innerText = e.title,
        i.title = e.title,
        i.style = "font-size:18px;font-weight:bold;",
        t.appendChild(i),
        t
    },
    generateDescription(e, t) {
        let i = document.createElement("div");
        i.classList.add("proprow", "noselect");
        let s = document.createElement("span");
        return i.appendChild(s),
        i.pz_update = ( () => {
            s.innerHTML = e.get ? e.get.call(t) : e.content
        }
        ),
        i.pz_update(),
        i
    },
    generateValue(e, t) {
        let i = document.createElement("div");
        i.classList.add("proprow", "noselect"),
        i.style = "background-color:rgb(45, 45, 45)";
        let s = document.createElement("span");
        s.innerText = e.title,
        i.appendChild(s);
        let n = document.createElement("span");
        return n.style = "white-space: nowrap",
        i.appendChild(n),
        i.pz_update = ( () => {
            n.innerHTML = e.get ? e.get.call(t) : e.content
        }
        ),
        i.pz_update(),
        i
    },
    generateDropdown(e, t) {
        let i = document.createElement("div");
        i.classList.add("proprow", "noselect");
        let s = document.createElement("span");
        s.innerText = e.title,
        i.appendChild(s);
        let n = document.createElement("div")
          , r = document.createElement("select");
        return r.classList.add("pz-inputbox"),
        r.onchange = ( () => {
            e.set.call(t, r.selectedIndex)
        }
        ),
        n.appendChild(r),
        i.appendChild(n),
        e.items.split(";").forEach(e => {
            let t = document.createElement("option");
            t.innerText = e,
            r.appendChild(t)
        }
        ),
        i.pz_update = ( () => {
            r.selectedIndex = e.get.call(t)
        }
        ),
        i.pz_update(),
        i
    },
    generateButton(e, t) {
        let i = document.createElement("button");
        i.classList.add("proprow", "propbutton", "noselect"),
        i.onclick = e.clickfn.bind(t);
        let s = document.createElement("span");
        return s.innerText = e.title,
        i.appendChild(s),
        i
    },
    generateTextInput(e, t) {
        let i = document.createElement("div");
        i.classList.add("proprow", "noselect");
        let s = document.createElement("span");
        s.innerText = e.title,
        i.appendChild(s);
        let n = document.createElement("input");
        return n.classList.add("pz-inputbox"),
        n.style = "width: 250px;",
        n.onchange = ( () => {
            e.set.call(t, n.value)
        }
        ),
        n.onkeydown = function(e) {
            return "Enter" !== e.key || (this.blur(),
            !1)
        }
        ,
        i.appendChild(n),
        i.pz_update = ( () => {
            n.value = e.get.call(t)
        }
        ),
        i.pz_update(),
        i
    },
    generateTextArea(e, t) {
        let i = document.createElement("div");
        i.classList.add("proprow", "noselect");
        let s = document.createElement("span");
        s.innerText = e.title,
        i.appendChild(s);
        let n = document.createElement("textarea");
        return n.classList.add("pz-inputbox"),
        n.style = "width: 250px;",
        n.setAttribute("rows", "3"),
        n.onchange = ( () => {
            e.set.call(t, n.value)
        }
        ),
        i.appendChild(n),
        i.pz_update = ( () => {
            n.value = e.get.call(t)
        }
        ),
        i.pz_update(),
        i
    },
    generateProgressbar(e, t) {
        let i = document.createElement("div");
        i.classList.add("proprow", "noselect");
        let s = document.createElement("div");
        s.classList.add("pz-progress");
        let n = document.createElement("span");
        return s.appendChild(n),
        i.appendChild(s),
        i.pz_update = function() {
            n.style.width = e.get.call(t) + "%"
        }
        ,
        i.pz_update(),
        i
    }
},
PZ.ui.viewport = function(e, t) {
    PZ.ui.panel.call(this, e),
    this.canDuplicate = !0,
    this.layer = null,
    this.scene = null,
    this.lastFrame = -1,
    this._renderFn = this.render.bind(this),
    this.onEnabledChanged.watch( () => {
        this.enabled ? this.animFrameReq = requestAnimationFrame(this._renderFn) : cancelAnimationFrame(this.animFrameReq)
    }
    ),
    PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
    this.objects = null,
    this.objectsChanged_bound = this.objectsChanged.bind(this),
    this.onObjectsChanged.watch(e => {
        e && e.onListChanged.unwatch(this.objectsChanged_bound),
        this.objects ? this.objects.onListChanged.watch(this.objectsChanged_bound, !0) : this.objectsChanged()
    }
    ),
    this.options = Object.assign({}, t),
    this.create(),
    this.initRenderer() && (this.widget2d = new PZ.ui.widget2d(this),
    this.widget3d = new PZ.ui.widget3d(this),
    this.helper3d = new PZ.ui.helper3d(this),
    this.editor.onSequenceChanged.watch(this.sequenceChanged.bind(this), !0),
    PZ.observable.defineObservableProp(this, "edit", "onEditChanged", !0),
    this.onEditChanged.watch(this.editChanged.bind(this), !0))
}
,
PZ.ui.viewport.prototype.sequenceChanged = function() {
    this.sequence = this.editor.sequence,
    this.sequence && (this.compositor.sequence = this.sequence,
    this.sequence.properties.resolution.onChanged.watch(this.resize.bind(this), !0))
}
,
PZ.ui.viewport.prototype.editChanged = function() {
    this.edit && this.scene ? (this.renderer.autoClear = !0,
    this.renderer.setClearColor(0, 1),
    this.controls.enabled = !0,
    this.renderMode = !0) : (this.renderer.autoClear = !1,
    this.controls.enabled = !1,
    this.renderMode = !1)
}
,
PZ.ui.viewport.prototype.objectsChanged = function() {
    let e = null
      , t = this.objects.filter(e => e.object instanceof PZ.layer.scene);
    1 === t.length && (e = t[0].object),
    e ? (this.layer = e,
    this.scene = e.threeObj,
    this.scene.add(this.threeObj)) : this.layer && (this.layer = null,
    this.scene.remove(this.threeObj),
    this.scene = null),
    this.edit = this.edit
}
,
PZ.ui.viewport.prototype.create = function() {
    this.el.style = "background-color: #1d1d1d;",
    this.el.addEventListener("keydown", this.keydown.bind(this)),
    this.canvas = document.createElement("canvas"),
    this.canvas.style.position = "absolute",
    this.el.appendChild(this.canvas)
}
,
PZ.ui.viewport.prototype.initRenderer = function() {
    try {
        this.renderer = new THREE.WebGLRenderer({
            alpha: !1,
            canvas: this.canvas
        }),
        this.renderer.setClearColor(0, 1),
        this.renderer.shadowMap.enabled = !0,
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap,
        this.compositor = new PZ.compositor(this.renderer,this.canvas.width,this.canvas.height)
    } catch (t) {
        var e = document.createElement("div");
        return e.classList.add("empty", "noselect"),
        e.innerHTML = '<h3>There was a problem starting WebGL.</h3><br><span>Refresh to try again or find out how to get WebGL <a style="color:inherit;text-decoration:underline;" target="_blank" href="https://get.webgl.org">here</a>.</span>',
        e.style = "padding:2%;color:#ccc;background-color:#111;pointer-events: all;",
        this.el.appendChild(e),
        this.canvas.remove(),
        !1
    }
    return this.camera = new THREE.PerspectiveCamera(60,1,.1,5e3),
    this.camera.position.set(0, 30, 80),
    this.camera.lookAt(new THREE.Vector3(0,0,0)),
    this.camera.layers.enable(1),
    this.controls = new THREE.EditorControls(this.camera,this.canvas),
    this.threeObj = new THREE.Object3D,
    this.grid = new THREE.GridHelper(200,10,new THREE.Color(13421772),new THREE.Color(3355443)),
    this.grid.layers.set(1),
    this.threeObj.add(this.grid),
    !0
}
,
PZ.ui.viewport.prototype.keydown = function(e) {
    "c" === e.key && (e.stopPropagation(),
    this.edit = !this.edit)
}
,
PZ.ui.viewport.prototype.resize = function() {
    if (!this.sequence)
        return;
    let e = this.sequence.properties.resolution.get()
      , t = e[0]
      , i = e[1]
      , s = this.el.getBoundingClientRect()
      , n = Math.min(s.width / t, s.height / i)
      , r = Math.round(t * n)
      , a = Math.round(i * n);
    this.canvas.style.width = r + "px",
    this.canvas.style.height = a + "px",
    this.canvas.style.left = .5 * (s.width - r) + "px",
    this.canvas.style.top = .5 * (s.height - a) + "px";
    let o = Math.round(r * window.devicePixelRatio)
      , l = Math.round(a * window.devicePixelRatio);
    this.renderer.setDrawingBufferSize(o, l, 1),
    this.compositor.setSize(this.canvas.width, this.canvas.height),
    this.camera.aspect = this.canvas.width / this.canvas.height,
    this.camera.updateProjectionMatrix(),
    this.widget2d.resize()
}
,
PZ.ui.viewport.prototype.unload = function() {
    this.enabled = !1,
    this.compositor.unload(),
    this.renderer.dispose()
}
,
PZ.ui.viewport.prototype.render = function() {
    this.animFrameReq = requestAnimationFrame(this._renderFn);
    let e = this.editor.playback.currentFrame;
    this.widget2d.update(e),
    this.widget3d.update(e),
    this._render()
}
,
PZ.ui.viewport.prototype._render = function() {
    let e = this.editor.playback.currentFrame;
    this.renderMode ? (this.layer.update(e - this.layer.parent.start),
    this.renderer.render(this.scene, this.camera),
    this.lastFrame = -1) : (this.compositor.renderSequence(e),
    this.lastFrame = e)
}
,
PZ.ui.viewport.prototype.pickColor = function(e, t) {
    let i = this.renderer.context
      , s = new Uint8Array(4);
    return e = Math.round(e / parseFloat(this.canvas.style.width) * i.drawingBufferWidth),
    t = Math.round((1 - t / parseFloat(this.canvas.style.height)) * i.drawingBufferHeight),
    this._render(),
    i.readPixels(e, t, 1, 1, i.RGBA, i.UNSIGNED_BYTE, s),
    [s[0] / 255, s[1] / 255, s[2] / 255]
}
,
PZ.ui.drag = function(e, t, i, s, n, r) {
    this.start = t,
    this.move = i,
    this.update = s,
    this.end = n,
    this.globalCtx = r,
    this.dragging = !1,
    this.enableTouch = !0,
    this.enableMouse = !0,
    this.initialMove = !0,
    this.finalUpdate = !0,
    this.startfn_bound = this.startfn.bind(this),
    this.addElts(e)
}
,
PZ.ui.drag.prototype.addElts = function(e) {
    Array.isArray(e) || e instanceof NodeList || (e = [e]);
    for (var t = 0; t < e.length; t++)
        this.enableMouse && e[t].addEventListener("mousedown", this.startfn_bound),
        this.enableTouch && e[t].addEventListener("touchstart", this.startfn_bound, {
            passive: !1
        })
}
,
PZ.ui.drag.prototype.convertTouchEvent = function(e) {
    let t = {
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        target: e.target,
        currentTarget: e.currentTarget,
        stopPropagation: () => e.stopPropagation(),
        preventDefault: () => e.preventDefault()
    }
      , i = e.touches[0];
    return i && (t.screenX = i.screenX,
    t.screenY = i.screenY,
    t.clientX = i.clientX,
    t.clientY = i.clientY,
    t.pageX = i.pageX,
    t.pageY = i.pageY),
    t
}
,
PZ.ui.drag.prototype.createDragContext = function() {
    return {
        ctx: this.globalCtx,
        drag: this
    }
}
,
PZ.ui.drag.prototype.startfn = function(e) {
    if (this.dragging)
        return;
    let t = this.createDragContext();
    if (this.start) {
        if (!1 === this.start.call(t, e))
            return
    }
    this.dragging = !0,
    e.preventDefault(),
    this.startDragging(t, e)
}
,
PZ.ui.drag.prototype.startDragging = function(e, t) {
    var i = t.currentTarget.ownerDocument;
    this.move && (this.movefn_bound = this.movefn.bind(this, e),
    i.addEventListener("mousemove", this.movefn_bound),
    i.addEventListener("touchmove", this.movefn_bound, {
        passive: !1
    })),
    this.endfn_bound = this.endfn.bind(this, e),
    i.addEventListener("mouseup", this.endfn_bound),
    i.addEventListener("touchend", this.endfn_bound, {
        passive: !1
    }),
    i.addEventListener("touchcancel", this.endfn_bound, {
        passive: !1
    }),
    i.addEventListener("keydown", this.endfn_bound),
    this.initialMove && this.move.call(e, t),
    this.update && (this.updatefn_bound = this.updatefn.bind(this, e),
    this.reqId = requestAnimationFrame(this.updatefn_bound))
}
,
PZ.ui.drag.prototype.movefn = function(e, t) {
    t.preventDefault(),
    this.move.call(e, t)
}
,
PZ.ui.drag.prototype.updatefn = function(e) {
    this.update.call(e),
    this.reqId = requestAnimationFrame(this.updatefn_bound)
}
,
PZ.ui.drag.prototype.endfn = function(e, t) {
    t.type.startsWith("key") && "Escape" !== t.key || (t.preventDefault(),
    this.dragging = !1,
    this.stopDragging(e, t),
    this.end && this.end.call(e, t))
}
,
PZ.ui.drag.prototype.stopDragging = function(e, t) {
    var i = t.currentTarget.ownerDocument || t.currentTarget;
    this.movefn_bound && (i.removeEventListener("mousemove", this.movefn_bound),
    i.removeEventListener("touchmove", this.movefn_bound),
    this.movefn_bound = null),
    this.reqId && (cancelAnimationFrame(this.reqId),
    this.updatefn_bound = null),
    i.removeEventListener("mouseup", this.endfn_bound),
    i.removeEventListener("touchend", this.endfn_bound),
    i.removeEventListener("touchcancel", this.endfn_bound),
    i.removeEventListener("keydown", this.endfn_bound),
    this.endfn_bound = null,
    this.finalUpdate && this.update.call(e)
}
,
PZ.ui.input = function(e) {
    this.el = document.createElement("span"),
    this.el.classList.add("pzinput"),
    this.el.classList.add("noselect"),
    e.readOnly ? this.el.classList.add("readOnly") : (this.el.setAttribute("tabindex", "0"),
    this.el.setAttribute("contenteditable", "true")),
    this.editing = !1,
    this.initialValue = null,
    this.value = null,
    this.editStart = null,
    this.editFinish = null,
    this.changed = null,
    this.drag = new PZ.ui.drag(this.el,this.dragStart,this.drag,this.dragUpdate,this.dragEnd,this),
    this.max = Number.POSITIVE_INFINITY,
    this.min = Number.NEGATIVE_INFINITY,
    this.decimals = 2,
    this.step = 1,
    Object.keys(e).forEach(t => void 0 === e[t] && delete e[t]),
    Object.assign(this, e),
    this.el.addEventListener("focus", this.focus.bind(this)),
    this.el.addEventListener("blur", this.blur.bind(this)),
    this.el.addEventListener("keydown", this.keydown.bind(this))
}
,
PZ.ui.input.prototype.focus = function() {
    this.editing = !0,
    this.initialValue = parseFloat(this.el.innerText),
    this.el.classList.add("edit"),
    this.el.classList.remove("noselect"),
    document.execCommand("selectAll", !1, null),
    this.editStart.call(this.el, this.noLink),
    delete this.noLink
}
,
PZ.ui.input.prototype.blur = function() {
    this.editing = !1,
    this.el.classList.remove("edit"),
    this.el.classList.add("noselect"),
    window.getSelection().removeAllRanges();
    let e = parseFloat(this.el.innerText);
    this.setValue(Number.isNaN(e) ? this.initialValue : e),
    this.editFinish.call(this.el, this.value === this.initialValue)
}
,
PZ.ui.input.prototype.keydown = function(e) {
    if ("Enter" === e.key)
        this.el.blur();
    else if ("Escape" === e.key)
        this.el.innerText = "",
        this.el.blur();
    else if ("ArrowUp" === e.key) {
        let e = parseFloat(this.el.innerText);
        this.setValue(e + this.step)
    } else if ("ArrowDown" === e.key) {
        let e = parseFloat(this.el.innerText);
        this.setValue(e - this.step)
    } else if ("PageUp" === e.key) {
        let e = parseFloat(this.el.innerText);
        this.setValue(e + 10 * this.step)
    } else if ("PageDown" === e.key) {
        let e = parseFloat(this.el.innerText);
        this.setValue(e - 10 * this.step)
    } else if ("ArrowLeft" !== e.key && "ArrowRight" !== e.key)
        return !0;
    return !1
}
,
PZ.ui.input.prototype.dragStart = function(e) {
    if (this.ctx.editing)
        return !1;
    document.activeElement.blur(),
    this.ctx.editStart.call(this.ctx.el, e.altKey);
    let t = this.ctx.el.getBoundingClientRect();
    this.origin = {
        x: t.left,
        y: t.top
    },
    this.currentPt = {
        x: e.pageX - this.origin.x,
        y: e.pageY - this.origin.y
    },
    this.startPt = {
        x: this.currentPt.x,
        y: this.currentPt.y
    },
    this.shiftKey = e.shiftKey,
    this.ctrlKey = e.ctrlKey,
    this.moved = !1,
    this.initialValue = parseFloat(this.ctx.el.innerText),
    this.value = this.initialValue,
    document.body.style.cursor = "move"
}
,
PZ.ui.input.prototype.drag = function(e) {
    this.currentPt.x = e.pageX - this.origin.x,
    this.currentPt.y = e.pageY - this.origin.y,
    this.shiftKey = e.shiftKey,
    this.ctrlKey = e.ctrlKey
}
,
PZ.ui.input.prototype.dragUpdate = function() {
    let e = this.currentPt.x - this.startPt.x - (this.currentPt.y - this.startPt.y);
    this.startPt.x = this.currentPt.x,
    this.startPt.y = this.currentPt.y,
    Math.abs(e) > 2 && (this.moved = !0),
    this.moved && (this.value += e * this.ctx.step * .01 * (this.shiftKey ? 10 : 1) * (this.ctrlKey ? .1 : 1),
    this.ctx.setValue(this.value))
}
,
PZ.ui.input.prototype.dragEnd = function(e) {
    this.ctx.editFinish.call(this.ctx.el, !this.moved || this.value === this.initialValue),
    !1 === this.moved && (this.ctx.noLink = e.altKey,
    this.ctx.el.focus()),
    document.body.style.cursor = ""
}
,
PZ.ui.input.prototype.update = function(e, t) {
    this.editing && !t || (this.value = e,
    this.el.innerText = e.toFixed(this.decimals))
}
,
PZ.ui.input.prototype.precisionRound = function(e) {
    let t = Math.pow(10, this.decimals);
    return e = Math.round(e * t) / t
}
,
PZ.ui.input.prototype.set = function(e) {
    e = Math.min(this.max, Math.max(this.min, e)),
    e = this.precisionRound(e),
    this.update(e, !0)
}
,
PZ.ui.input.prototype.setValue = function(e) {
    let t = this.value;
    this.set(e),
    this.changed && this.changed(e, t)
}
,
PZ.ui.colorPicker = function(e, t) {
    this.el = document.createElement("button"),
    this.el.classList.add("pz-inputbox", "noselect"),
    this.el.title = "color",
    this.el.style = "width: 30px; height: 20px; display: inline-block;",
    e.readOnly && this.el.setAttribute("disabled", "true"),
    this.editing = !1,
    this.alpha = !1,
    this.initialValue = null,
    this.value = null,
    this.editStart = null,
    this.editFinish = null,
    this.changed = null,
    this.saturationValueDrag = new PZ.ui.drag([],this.dragStart,this.drag,this.slDragUpdate,null,this),
    this.hueDrag = new PZ.ui.drag([],this.dragStart,this.drag,this.hDragUpdate,null,this),
    this.alphaDrag = new PZ.ui.drag([],this.dragStart,this.drag,this.aDragUpdate,null,this),
    Object.assign(this, e),
    this.el.pz_click = ( () => this.open()),
    this.el.addEventListener("click", this.el.pz_click)
}
,
PZ.ui.colorPicker.prototype.hsvToRgb = function(e, t, i) {
    let s, n, r, a, o, l, h, c;
    switch (l = i * (1 - t),
    h = i * (1 - (o = 6 * e - (a = Math.floor(6 * e))) * t),
    c = i * (1 - (1 - o) * t),
    a % 6) {
    case 0:
        s = i,
        n = c,
        r = l;
        break;
    case 1:
        s = h,
        n = i,
        r = l;
        break;
    case 2:
        s = l,
        n = i,
        r = c;
        break;
    case 3:
        s = l,
        n = h,
        r = i;
        break;
    case 4:
        s = c,
        n = l,
        r = i;
        break;
    case 5:
        s = i,
        n = l,
        r = h
    }
    return [s, n, r]
}
,
PZ.ui.colorPicker.prototype.rgbToHsv = function(e) {
    let t, i = e[0], s = e[1], n = e[2], r = Math.max(i, s, n), a = Math.min(i, s, n), o = r - a, l = 0 === r ? 0 : o / r, h = r;
    switch (r) {
    case a:
        t = 0;
        break;
    case i:
        t = s - n + o * (s < n ? 6 : 0),
        t /= 6 * o;
        break;
    case s:
        t = n - i + 2 * o,
        t /= 6 * o;
        break;
    case n:
        t = i - s + 4 * o,
        t /= 6 * o
    }
    return [t, l, h]
}
,
PZ.ui.colorPicker.prototype.colorToStyle = function(e) {
    return 4 === e.length ? "rgba(" + Math.floor(255 * e[0]) + ", " + Math.floor(255 * e[1]) + ", " + Math.floor(255 * e[2]) + ", " + e[3].toFixed(3) + ")" : "rgb(" + Math.floor(255 * e[0]) + ", " + Math.floor(255 * e[1]) + ", " + Math.floor(255 * e[2]) + ")"
}
,
PZ.ui.colorPicker.prototype.styleToColor = function(e) {
    let t = e.slice(e.indexOf("(") + 1, -1).split(",").map(e => parseFloat(e));
    return t[0] /= 255,
    t[1] /= 255,
    t[2] /= 255,
    t[3] = t[3] || 1,
    t = t.slice(0, this.alpha ? 4 : 3)
}
,
PZ.ui.colorPicker.prototype.positionPicker = function() {
    var e = this.picker.offsetWidth
      , t = this.picker.offsetHeight
      , i = this.picker.ownerDocument
      , s = i.documentElement.clientWidth
      , n = i.documentElement.clientHeight
      , r = this.el.getBoundingClientRect();
    let a = r.top
      , o = r.left;
    a += r.height,
    o -= Math.min(r.left, r.left + e > s && s > e ? Math.abs(r.left + e - s) : 0),
    a -= Math.min(r.top, r.top + t > n && n > t ? Math.abs(t + r.height) : 0),
    this.picker.style.top = a + "px",
    this.picker.style.left = o + "px"
}
,
PZ.ui.colorPicker.prototype.open = function() {
    this.picker = document.createElement("div"),
    this.picker.style = "width: 470px; height: 250px; padding: 5px; position: absolute; background-color: #2a2a2a; outline: 0; border: 1px solid #384668;",
    this.picker.setAttribute("tabindex", "0"),
    this.picker.pz_focusout = (e => {
        let t = e.relatedTarget;
        for (let e = 0; e < 3; e++) {
            if (t === this.picker)
                return;
            if (!t)
                break;
            t = t.parentElement
        }
        this.close()
    }
    ),
    this.picker.addEventListener("focusout", this.picker.pz_focusout),
    this.picker.addEventListener("keydown", e => {
        if ("Escape" === e.key || "Enter" === e.key)
            return this.close("Escape" === e.key),
            void e.preventDefault();
        this.el.dispatchEvent(new KeyboardEvent(e.type,e))
    }
    );
    let e = document.createElement("div");
    e.style = "width: 250px; height: 250px; position: absolute; left: 5px; top: 5px;",
    e.pz_value = [0, 0];
    let t = document.createElement("div");
    t.style = "position:absolute; width: 6px; height: 6px; margin-bottom: -4px; margin-left: -4px; pointer-events: none; border: 1px solid #aaa; border-radius: 50%;",
    e.appendChild(t),
    this.picker.appendChild(e),
    this.saturationValueDrag.addElts(e),
    e.pz_update = (i => {
        e.style.background = "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)), hsl(" + 360 * i[0] + ", 100%, 50%)",
        t.style.left = 100 * i[1] + "%",
        t.style.bottom = 100 * i[2] + "%"
    }
    );
    let i = document.createElement("div");
    i.style = "width: 25px; height: 250px; position: absolute; left: 260px; top: 5px; background: linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);",
    i.pz_value = 0;
    let s, n = document.createElement("div");
    if (n.style = "position: absolute; width: 100%; height: 6px; margin-top: -3px; box-sizing: border-box; border: 1px solid #aaa;",
    i.appendChild(n),
    this.picker.appendChild(i),
    this.hueDrag.addElts(i),
    i.pz_update = (e => {
        n.style.top = 100 * e[0] + "%"
    }
    ),
    this.alpha) {
        (s = document.createElement("div")).style = "width: 25px; height: 250px; position: absolute; left: 290px; top: 5px;";
        let e = document.createElement("div");
        e.style = "position: absolute; width: 100%; height: 6px; margin-bottom: -3px; box-sizing: border-box; border: 1px solid #aaa;",
        s.appendChild(e),
        s.pz_value = 1,
        this.picker.appendChild(s),
        this.alphaDrag.addElts(s),
        s.pz_update = (t => {
            s.pz_value = t[3];
            let i = "rgba(" + 255 * t[0] + ", " + 255 * t[1] + ", " + 255 * t[2];
            s.style.background = "linear-gradient(to bottom, " + i + ", 1) 0%, " + i + ", 0) 100%)",
            e.style.bottom = 100 * t[3] + "%"
        }
        ),
        this.picker.style.width = "500px"
    }
    let r = document.createElement("div");
    r.style = "position: absolute; top: 5px; right: 5px; width: 185px; bottom: 5px;";
    let a = document.createElement("div");
    a.style = "position: absolute; left: 0; right: 50%; height: 25px;",
    a.style.backgroundColor = this.colorToStyle(this.value),
    a.onclick = (e => {
        this.setValue(this.initialValue.slice()),
        this.picker.pz_update(this.value)
    }
    ),
    r.appendChild(a);
    let o = document.createElement("div");
    o.style = "position: absolute; left: 50%; right: 0; height: 25px;",
    r.appendChild(o);
    let l = document.createElement("div");
    l.style = "position: absolute; top: 30px; left: 0; right: 0; height: 185px; display: grid; grid-template: repeat(auto-fit, minmax(25px, 1fr)) / repeat(auto-fit, minmax(25px, 1fr)); grid-gap: 4px;";
    let h = e => {
        let t = e.currentTarget.pz_color;
        this.alpha ? (t.length = 4,
        t[3] = t[3] || 1) : t.length = 3,
        this.setValue(t),
        this.picker.pz_update(this.value)
    }
    ;
    for (let e = PZ.ui.colorPicker.recentColors.length - 1; e >= 0; e--) {
        let t = (e + PZ.ui.colorPicker.recentColors.idx) % PZ.ui.colorPicker.recentColors.length
          , i = PZ.ui.colorPicker.recentColors.stack[t]
          , s = document.createElement("div");
        s.style.backgroundColor = this.colorToStyle(i),
        s.onclick = h,
        s.pz_color = i,
        l.appendChild(s)
    }
    r.appendChild(l);
    let c = document.createElement("input");
    c.classList.add("pz-inputbox"),
    c.setAttribute("spellcheck", "false"),
    c.style = "position: absolute; bottom: 0; left: 0; width: 100%;",
    c.onkeydown = (e => {
        "Enter" === e.key && this.picker.focus(),
        e.stopPropagation()
    }
    ),
    c.onblur = (e => {
        let t = document.createElement("div");
        t.style.color = e.currentTarget.value;
        let i = t.style.color;
        i && this.setValue(this.styleToColor(i)),
        this.picker.pz_update(this.value)
    }
    ),
    c.pz_update = (e => {
        c.value = this.colorToStyle(e)
    }
    ),
    r.appendChild(c),
    this.picker.appendChild(r),
    this.picker.pz_update = (t => {
        let n;
        t ? (n = this.rgbToHsv(t),
        i.pz_value = Math.min(Math.max(n[0], 0), 1),
        e.pz_value[0] = Math.min(Math.max(n[1], 0), 1),
        e.pz_value[1] = Math.min(Math.max(n[2], 0), 1),
        this.alpha && (s.pz_value = t[3])) : n = [i.pz_value, e.pz_value[0], e.pz_value[1]],
        e.pz_update(n),
        i.pz_update(n),
        this.alpha && s.pz_update(this.value),
        c.pz_update(this.value),
        o.style.backgroundColor = this.colorToStyle(this.value)
    }
    ),
    this.picker.pz_set = ( () => {
        let t = this.hsvToRgb(i.pz_value, e.pz_value[0], e.pz_value[1]);
        this.value[0] = t[0],
        this.value[1] = t[1],
        this.value[2] = t[2],
        this.alpha && (this.value[3] = s.pz_value),
        this.setValue(this.value),
        this.picker.pz_update()
    }
    ),
    this.alpha ? (this.value.length = 4,
    this.value[3] = "number" == typeof this.value[3] ? this.value[3] : 1) : this.value.length = 3,
    this.picker.pz_update(this.value),
    this.initialValue = this.value.slice(),
    this.editing = !0,
    this.editStart.call(this.el),
    this.el.removeEventListener("click", this.el.pz_click),
    document.body.appendChild(this.picker),
    this.positionPicker(),
    this.picker.focus()
}
,
PZ.ui.colorPicker.prototype.close = function(e) {
    if (this.editing = !1,
    this.picker.removeEventListener("focusout", this.picker.pz_focusout),
    this.picker.remove(),
    this.picker = null,
    this.el.addEventListener("click", this.el.pz_click),
    this.el.focus(),
    e)
        this.setValue(this.initialValue);
    else {
        PZ.ui.colorPicker.recentColors.stack.find(e => e.every( (e, t) => this.value[t] === e)) || PZ.ui.colorPicker.recentColors.push(this.value.slice())
    }
    this.editFinish.call(this.el, e)
}
,
PZ.ui.colorPicker.prototype.dragStart = function(e) {
    this.control = e.currentTarget,
    this.origin = this.control.getBoundingClientRect(),
    this.currentPt = {
        x: 0,
        y: 0
    },
    this.elPt = {
        x: 0,
        y: 0
    },
    this.ctx.picker.focus()
}
,
PZ.ui.colorPicker.prototype.drag = function(e) {
    this.currentPt.x = e.pageX,
    this.currentPt.y = e.pageY,
    this.shiftKey = e.shiftKey,
    this.ctrlKey = e.ctrlKey
}
,
PZ.ui.colorPicker.prototype.dragUpdate = function() {
    this.elPt.x = Math.min(Math.max((this.currentPt.x - this.origin.left) / this.origin.width, 0), 1),
    this.elPt.y = Math.min(Math.max((this.currentPt.y - this.origin.top) / this.origin.height, 0), 1)
}
,
PZ.ui.colorPicker.prototype.slDragUpdate = function() {
    this.ctx.dragUpdate.call(this),
    this.control.pz_value[0] = this.elPt.x,
    this.control.pz_value[1] = 1 - this.elPt.y,
    this.ctx.picker.pz_set()
}
,
PZ.ui.colorPicker.prototype.hDragUpdate = function() {
    this.ctx.dragUpdate.call(this),
    this.control.pz_value = this.elPt.y,
    this.ctx.picker.pz_set()
}
,
PZ.ui.colorPicker.prototype.aDragUpdate = function() {
    this.ctx.dragUpdate.call(this),
    this.control.pz_value = 1 - this.elPt.y,
    this.ctx.picker.pz_set()
}
,
PZ.ui.colorPicker.prototype.update = function(e, t) {
    this.editing && !t || (this.value = e,
    this.el.style.backgroundColor = this.colorToStyle(e))
}
,
PZ.ui.colorPicker.prototype.setValue = function(e) {
    let t = this.value;
    this.update(e, !0),
    this.changed && this.changed(e, t)
}
,
PZ.ui.colorPicker.recentColors = new PZ.fixedStack(36);
for (let e = 0; e < 12; e++) {
    let e = PZ.random.color();
    PZ.ui.colorPicker.recentColors.push(e)
}
for (let e = 0; e < 6; e++) {
    let t = PZ.ui.colorPicker.prototype.hsvToRgb(0, 0, e / 5);
    PZ.ui.colorPicker.recentColors.push(t)
}
for (let e = 17; e >= 0; e--) {
    let t = PZ.ui.colorPicker.prototype.hsvToRgb(e / 18, 1, 1);
    PZ.ui.colorPicker.recentColors.push(t)
}
PZ.ui.gradientPicker = class {
    constructor(e) {
        this.el = document.createElement("div"),
        this.el.style = "padding: 5px; width: 245px; box-sizing: border-box; margin: 0;";
        let t = document.createElement("button");
        t.classList.add("pz-inputbox", "noselect"),
        t.style = "width: 100%; height:30px; display: block;",
        this.el.appendChild(t);
        let i = document.createElement("div");
        i.style = "width: 100%; height: 15px; margin-top: 5px; position: relative;",
        this.el.appendChild(i),
        this.editing = !1,
        this.initialValue = null,
        this.editStart = null,
        this.editFinish = null,
        this.changed = null,
        this.ptDrag = new PZ.ui.drag([],this.ptDragStart,this.ptDrag,this.ptDragUpdate,this.ptDragEnd,this),
        Object.assign(this, e),
        t.pz_update = (e => {
            let i;
            if (1 === e.length)
                i = e[0].color;
            else {
                i = "linear-gradient(to right, ";
                for (let t = 0; t < e.length; t++)
                    t > 0 && (i += ", "),
                    i += e[t].color,
                    i += " ",
                    i += 100 * e[t].position,
                    i += "%";
                i += ")"
            }
            t.style.background = i
        }
        ),
        i.pz_update = (e => {
            i.innerHTML = "";
            for (let s = 0; s < e.length; s++) {
                let n = e[s]
                  , r = document.createElement("button");
                r.style = "display: block; width: 10px; height: 10px; position: absolute; border: 1px solid #1b1b1b; box-sizing: border-box; margin-left: -5px;",
                r.style.left = 100 * n.position + "%",
                0 !== s && r.setAttribute("tabindex", "-1");
                let a = this.styleToColor(n.color);
                r.addEventListener("click", e => {
                    r.pz_ignoreClick && (r.pz_ignoreClick = !1,
                    e.stopImmediatePropagation())
                }
                ),
                new PZ.ui.colorPicker({
                    el: r,
                    alpha: !0,
                    editStart: () => {
                        this.editing = !0,
                        this.editStart.call(this.el)
                    }
                    ,
                    editFinish: () => {
                        this.editFinish.call(this.el),
                        this.editing = !1
                    }
                    ,
                    changed: e => {
                        n.color = "rgba(" + 255 * e[0] + ", " + 255 * e[1] + ", " + 255 * e[2] + ", " + e[3] + ")",
                        this.changed && this.changed(this.value),
                        t.pz_update(this.value)
                    }
                }).update(a),
                this.ptDrag.addElts(r),
                r.addEventListener("keydown", this.ptKeydown.bind(this)),
                r.addEventListener("contextmenu", this.ptContextMenu.bind(this)),
                i.appendChild(r)
            }
        }
        ),
        this.el.pz_update = ( () => {
            let e = this.value;
            t.pz_update(e),
            i.pz_update(e)
        }
        ),
        t.addEventListener("click", this.click.bind(this))
    }
    styleToColor(e, t) {
        t = t || 255;
        let i = e.slice(e.indexOf("(") + 1, -1).split(",").map(e => parseFloat(e));
        return i[0] /= t,
        i[1] /= t,
        i[2] /= t,
        i
    }
    click(e) {
        let t = 0;
        if (void 0 !== e.pageX) {
            let i = e.currentTarget.getBoundingClientRect();
            t = Math.min(Math.max((e.pageX - i.x) / i.width, 0), 1)
        }
        let i, s = 0;
        for (; s < this.value.length && this.value[s].position < t; )
            s++;
        if (1 === this.value.length)
            i = this.value[0].color;
        else if (0 === s)
            i = this.value[0].color;
        else if (s === this.value.length)
            i = this.value[this.value.length - 1].color;
        else {
            let e = this.value[s - 1]
              , n = this.styleToColor(e.color, 1)
              , r = this.value[s]
              , a = this.styleToColor(r.color, 1)
              , o = (t - e.position) / (r.position - e.position);
            i = "rgba(";
            for (let e = 0; e < 4; e++)
                e > 0 && (i += ", "),
                i += n[e] + o * (a[e] - n[e]);
            i += ")"
        }
        let n = {
            position: t,
            color: i
        };
        this.editStart.call(this.el),
        this.value.splice(s, 0, n),
        this.changed && this.changed(this.value),
        this.editFinish.call(this.el),
        this.update(this.value)
    }
    ptContextMenu(e) {
        if (e.preventDefault(),
        this.value.length <= 1)
            return;
        let t = e.currentTarget;
        t.focus(),
        this.editStart.call(this.el);
        let i = Array.prototype.indexOf.call(t.parentElement.children, t);
        this.value.splice(i, 1),
        this.changed && this.changed(this.value),
        this.editFinish.call(this.el),
        this.update(this.value)
    }
    ptKeydown(e) {
        if ("Delete" === e.key || "Backspace" === e.key)
            this.ptContextMenu(e);
        else if ("ArrowUp" === e.key || "ArrowDown" === e.key) {
            let t = e.currentTarget
              , i = "ArrowDown" === e.key ? t.nextElementSibling : t.previousElementSibling;
            i && (t.setAttribute("tabindex", "-1"),
            i.removeAttribute("tabindex"),
            i.focus()),
            e.preventDefault(),
            e.stopPropagation()
        } else
            "ArrowLeft" !== e.key && "ArrowRight" !== e.key || (e.preventDefault(),
            e.stopPropagation())
    }
    ptDragStart(e) {
        this.el = e.currentTarget,
        this.pt = this.ctx.value[Array.prototype.indexOf.call(this.el.parentElement.children, this.el)],
        this.control = this.el.parentElement,
        this.origin = this.control.getBoundingClientRect(),
        this.startPt = e.pageX,
        this.currentPt = 0,
        this.moved = !1,
        this.initialValue = this.pt.position,
        this.el.focus(),
        Array.from(this.control.children).forEach(e => e.setAttribute("tabindex", "-1")),
        this.el.removeAttribute("tabindex"),
        this.el.pz_ignoreClick = !1,
        this.ctx.editing = !0,
        this.ctx.editStart.call(this.ctx.el)
    }
    ptDrag(e) {
        this.currentPt = e.pageX
    }
    ptDragUpdate() {
        let e = this.initialValue + (this.currentPt - this.startPt) / this.origin.width;
        e = Math.min(Math.max(e, 0), 1),
        Math.abs(this.currentPt - this.startPt) > 2 && (this.moved = !0),
        this.moved && (this.pt.position = e,
        this.el.style.left = 100 * e + "%",
        this.ctx.value.sort( (e, t) => e.position - t.position),
        this.ctx.changed && this.ctx.changed(this.ctx.value),
        this.ctx.el.firstElementChild.pz_update(this.ctx.value))
    }
    ptDragEnd(e) {
        this.ctx.editFinish.call(this.ctx.el, !this.moved),
        this.ctx.editing = !1,
        this.moved && (this.el.pz_ignoreClick = !0,
        this.ctx.el.pz_update())
    }
    update(e, t) {
        this.editing && !t || (this.value = e,
        this.el.pz_update())
    }
}
,
PZ.ui.curvePicker = class {
    constructor(e) {
        this.el = document.createElement("div"),
        this.el.style = "padding: 5px; width: 245px; box-sizing: border-box; margin: 0;";
        let t = document.createElement("button");
        t.classList.add("pz-inputbox", "noselect"),
        t.style = "width: 100%; height:30px; display: block;",
        this.el.appendChild(t);
        let i = document.createElement("div");
        i.style = "width: 100%; height: 15px; margin-top: 5px; position: relative;",
        this.el.appendChild(i),
        this.editing = !1,
        this.initialValue = null,
        this.editStart = null,
        this.editFinish = null,
        this.changed = null,
        this.ptDrag = new PZ.ui.drag([],this.ptDragStart,this.ptDrag,this.ptDragUpdate,this.ptDragEnd,this),
        Object.assign(this, e),
        t.pz_update = (e => {
            let i;
            if (1 === e.length)
                i = e[0].color;
            else {
                i = "linear-gradient(to right, ";
                for (let t = 0; t < e.length; t++)
                    t > 0 && (i += ", "),
                    i += e[t].color,
                    i += " ",
                    i += 100 * e[t].position,
                    i += "%";
                i += ")"
            }
            t.style.background = i
        }
        ),
        i.pz_update = (e => {
            i.innerHTML = "";
            for (let s = 0; s < e.length; s++) {
                let n = e[s]
                  , r = document.createElement("button");
                r.style = "display: block; width: 10px; height: 10px; position: absolute; border: 1px solid #1b1b1b; box-sizing: border-box; margin-left: -5px;",
                r.style.left = 100 * n.position + "%",
                0 !== s && r.setAttribute("tabindex", "-1");
                let a = this.styleToColor(n.color);
                r.addEventListener("click", e => {
                    r.pz_ignoreClick && (r.pz_ignoreClick = !1,
                    e.stopImmediatePropagation())
                }
                ),
                new PZ.ui.colorPicker({
                    el: r,
                    alpha: !0,
                    editStart: () => {
                        this.editing = !0,
                        this.editStart.call(this.el)
                    }
                    ,
                    editFinish: () => {
                        this.editFinish.call(this.el),
                        this.editing = !1
                    }
                    ,
                    changed: e => {
                        n.color = "rgba(" + 255 * e[0] + ", " + 255 * e[1] + ", " + 255 * e[2] + ", " + e[3] + ")",
                        this.changed && this.changed(this.value),
                        t.pz_update(this.value)
                    }
                }).update(a),
                this.ptDrag.addElts(r),
                r.addEventListener("keydown", this.ptKeydown.bind(this)),
                r.addEventListener("contextmenu", this.ptContextMenu.bind(this)),
                i.appendChild(r)
            }
        }
        ),
        this.el.pz_update = ( () => {
            let e = this.value;
            t.pz_update(e),
            i.pz_update(e)
        }
        ),
        t.addEventListener("click", this.click.bind(this))
    }
    styleToColor(e, t) {
        t = t || 255;
        let i = e.slice(e.indexOf("(") + 1, -1).split(",").map(e => parseFloat(e));
        return i[0] /= t,
        i[1] /= t,
        i[2] /= t,
        i
    }
    click(e) {
        let t = 0;
        if (void 0 !== e.pageX) {
            let i = e.currentTarget.getBoundingClientRect();
            t = Math.min(Math.max((e.pageX - i.x) / i.width, 0), 1)
        }
        let i, s = 0;
        for (; s < this.value.length && this.value[s].position < t; )
            s++;
        if (1 === this.value.length)
            i = this.value[0].color;
        else if (0 === s)
            i = this.value[0].color;
        else if (s === this.value.length)
            i = this.value[this.value.length - 1].color;
        else {
            let e = this.value[s - 1]
              , n = this.styleToColor(e.color, 1)
              , r = this.value[s]
              , a = this.styleToColor(r.color, 1)
              , o = (t - e.position) / (r.position - e.position);
            i = "rgba(";
            for (let e = 0; e < 4; e++)
                e > 0 && (i += ", "),
                i += n[e] + o * (a[e] - n[e]);
            i += ")"
        }
        let n = {
            position: t,
            color: i
        };
        this.editStart.call(this.el),
        this.value.splice(s, 0, n),
        this.changed && this.changed(this.value),
        this.editFinish.call(this.el),
        this.update(this.value)
    }
    ptContextMenu(e) {
        if (e.preventDefault(),
        this.value.length <= 1)
            return;
        let t = e.currentTarget;
        t.focus(),
        this.editStart.call(this.el);
        let i = Array.prototype.indexOf.call(t.parentElement.children, t);
        this.value.splice(i, 1),
        this.changed && this.changed(this.value),
        this.editFinish.call(this.el),
        this.update(this.value)
    }
    ptKeydown(e) {
        if ("Delete" === e.key || "Backspace" === e.key)
            this.ptContextMenu(e);
        else if ("ArrowUp" === e.key || "ArrowDown" === e.key) {
            let t = e.currentTarget
              , i = "ArrowDown" === e.key ? t.nextElementSibling : t.previousElementSibling;
            i && (t.setAttribute("tabindex", "-1"),
            i.removeAttribute("tabindex"),
            i.focus()),
            e.preventDefault(),
            e.stopPropagation()
        } else
            "ArrowLeft" !== e.key && "ArrowRight" !== e.key || (e.preventDefault(),
            e.stopPropagation())
    }
    ptDragStart(e) {
        this.el = e.currentTarget,
        this.pt = this.ctx.value[Array.prototype.indexOf.call(this.el.parentElement.children, this.el)],
        this.control = this.el.parentElement,
        this.origin = this.control.getBoundingClientRect(),
        this.startPt = e.pageX,
        this.currentPt = 0,
        this.moved = !1,
        this.initialValue = this.pt.position,
        this.el.focus(),
        Array.from(this.control.children).forEach(e => e.setAttribute("tabindex", "-1")),
        this.el.removeAttribute("tabindex"),
        this.el.pz_ignoreClick = !1,
        this.ctx.editing = !0,
        this.ctx.editStart.call(this.ctx.el)
    }
    ptDrag(e) {
        this.currentPt = e.pageX
    }
    ptDragUpdate() {
        let e = this.initialValue + (this.currentPt - this.startPt) / this.origin.width;
        e = Math.min(Math.max(e, 0), 1),
        Math.abs(this.currentPt - this.startPt) > 2 && (this.moved = !0),
        this.moved && (this.pt.position = e,
        this.el.style.left = 100 * e + "%",
        this.ctx.value.sort( (e, t) => e.position - t.position),
        this.ctx.changed && this.ctx.changed(this.ctx.value),
        this.ctx.el.firstElementChild.pz_update(this.ctx.value))
    }
    ptDragEnd(e) {
        this.ctx.editFinish.call(this.ctx.el, !this.moved),
        this.ctx.editing = !1,
        this.moved && (this.el.pz_ignoreClick = !0,
        this.ctx.el.pz_update())
    }
    update(e, t) {
        this.editing && !t || (this.value = e,
        this.el.pz_update())
    }
}
,
PZ.ui.history = function(e) {
    this.editor = e,
    e.onProjectChanged.watch(this.projectChanged.bind(this))
}
,
PZ.ui.history.command = function(e, t) {
    this.fn = e,
    this.params = t
}
,
PZ.ui.history.command.prototype.execute = function() {
    this.fn(this.params)
}
,
PZ.ui.history.prototype.projectChanged = function() {
    this.project = this.editor.project,
    this.undoStack = new PZ.fixedStack(100),
    this.redoStack = new PZ.fixedStack(100),
    this.operation = null,
    this.isUndoOperation = !1
}
,
PZ.ui.history.prototype.startOperation = function() {
    this.operation = []
}
,
PZ.ui.history.prototype.pushCommand = function(e, t) {
    this.operation.push(new PZ.ui.history.command(e,t))
}
,
PZ.ui.history.prototype.pushSingleCommand = function(e, t) {
    null === this.operation ? (this.startOperation(),
    this.pushCommand(e, t),
    this.finishOperation()) : this.pushCommand(e, t)
}
,
PZ.ui.history.prototype.discardOperation = function() {
    for (let e = this.operation.length - 1; e >= 0; e--)
        this.operation[e].execute();
    this.operation = null
}
,
PZ.ui.history.prototype.finishOperation = function(e) {
    this.operation.length ? (!0 === e ? this.redoStack.push(this.operation) : (this.undoStack.push(this.operation),
    this.redoStack.length && !1 !== e && this.redoStack.clear()),
    this.operation = null,
    this.project.ui.onChanged.update()) : this.operation = null
}
,
PZ.ui.history.prototype.undo = function() {
    if (this.undoStack.length && null === this.operation) {
        var e = this.undoStack.pop();
        this.startOperation();
        for (var t = e.length - 1; t >= 0; t--)
            e[t].execute();
        this.finishOperation(!0)
    }
}
,
PZ.ui.history.prototype.redo = function() {
    if (this.redoStack.length && null === this.operation) {
        var e = this.redoStack.pop();
        this.startOperation();
        for (var t = e.length - 1; t >= 0; t--)
            e[t].execute();
        this.finishOperation(!1)
    }
}
,
PZ.ui.recovery = function(e) {
    this.editor = e,
    e.onProjectChanged.watch(this.projectChanged.bind(this))
}
,
PZ.ui.recovery.prototype.load = function() {
    let e = localStorage.getItem("backup");
    if (e)
        return JSON.parse(e)
}
,
PZ.ui.recovery.prototype.projectChanged = function() {
    this.cleanUp(),
    this.project = this.editor.project,
    this.project && this.project.ui.onChanged.watch(this.projectModified.bind(this), !0)
}
,
PZ.ui.recovery.prototype.projectModified = function() {
    this.backUp()
}
,
PZ.ui.recovery.prototype.backUp = function() {
    try {
        const e = JSON.stringify(this.project);
        e.length <= 2097152 && localStorage.setItem("backup", e)
    } catch (e) {}
}
,
PZ.ui.recovery.prototype.cleanUp = function() {
    localStorage.removeItem("backup")
}
,
PZ.ui.playback = function(e) {
    this.editor = e,
    this.audioCtx = new AudioContext,
    this.audioDst = this.audioCtx.createAnalyser(),
    this.audioDst.connect(this.audioCtx.destination),
    Object.defineProperties(this, {
        enabled: {
            get() {
                return this._enabled
            },
            set(e) {
                this._enabled !== e && (this._enabled = e,
                e ? this.animFrameReq = requestAnimationFrame(this._updateFn) : cancelAnimationFrame(this.animFrameReq))
            }
        },
        currentTime: {
            get() {
                return this.currentFrame / this._sequence.properties.rate.get()
            }
        },
        totalFrames: {
            get() {
                return this._sequence.length
            }
        },
        totalTime: {
            get() {
                return this._sequence.length / this._sequence.properties.rate.get()
            }
        },
        frameRate: {
            get() {
                return this._sequence.properties.rate.get()
            }
        },
        currentFrame: {
            get() {
                return this._currentFrame
            },
            set(e) {
                this._exactFrame = e,
                this._currentFrame = Math.round(e)
            }
        }
    }),
    this._updateFn = this.update.bind(this),
    this._enabled = !1,
    PZ.observable.defineObservableProp(this, "speed", "onSpeedChanged"),
    this.speed = 0,
    PZ.observable.defineObservableProp(this, "loop", "onLoopChanged"),
    this.loop = !1,
    this._sequence = null,
    this._currentFrame = 0,
    this._exactFrame = 0,
    this._speed = 0,
    this.lastFrame = 0,
    this.syncSchedule = null,
    this.editor.onSequenceChanged.watch(this.sequenceChanged.bind(this), !0)
}
,
PZ.ui.playback.prototype.sequenceChanged = function() {
    if (this._sequence = this.editor.sequence,
    this.speed = 0,
    this.currentFrame = 0,
    this._sequence) {
        for (let e = 0; e < this._sequence.audioSchedules.length; e++)
            this.scheduleCreated(this._sequence.audioSchedules[e]);
        this._sequence.ui.onScheduleCreated.watch(this.scheduleCreated.bind(this)),
        this._sequence.ui.onScheduleUnloaded.watch(this.scheduleUnloaded.bind(this))
    }
}
,
PZ.ui.playback.prototype.scheduleCreated = function(e) {
    1 === e.type && ("suspended" === this.audioCtx.state && this.audioCtx.resume(),
    e.sourceNode = this.audioCtx.createMediaElementSource(e.el),
    e.panNode = this.audioCtx.createStereoPanner(),
    e.gainNode = this.audioCtx.createGain(),
    e.sourceNode.connect(e.gainNode),
    e.gainNode.connect(e.panNode),
    e.panNode.connect(this.audioDst))
}
,
PZ.ui.playback.prototype.scheduleUnloaded = function(e) {
    this.syncSchedule === e && (this.syncSchedule = null),
    e.sourceNode && (e.sourceNode.disconnect(),
    e.gainNode.disconnect(),
    e.panNode.disconnect()),
    0 === this._sequence.audioSchedules.length && "running" === this.audioCtx.state && this.audioCtx.suspend()
}
,
PZ.ui.playback.prototype.updateSchedule = function(e, t) {
    let i = this.frameRate;
    if (e.currentItem) {
        if (e.texture && e.el.readyState === e.el.HAVE_ENOUGH_DATA && (e.texture.needsUpdate = !0),
        e.el) {
            var s = this._exactFrame - e.currentItem.start
              , n = e.currentItem.clip.properties.time.get(s);
            if (s < 0)
                return e.playing && (e.el.pause(),
                e.playing = !1,
                this.syncSchedule === e && (this.syncSchedule = null)),
                void (e.el.readyState === e.el.HAVE_ENOUGH_DATA && (e.el.currentTime = e.currentItem.clip.properties.time.get(0)));
            if (t > 0) {
                if (e.sourceNode) {
                    let t;
                    t = e.currentItem.clip.object.properties.volume.get(s),
                    e.gainNode.gain.value = t,
                    t = e.currentItem.clip.object.properties.pan.get(s),
                    e.panNode.pan.value = t
                }
                if (e.playing) {
                    let r = e.el.currentTime - n
                      , a = e.currentItem.clip.properties.time.get(s + t)
                      , o = .5;
                    if (Math.abs(r) < o) {
                        let s = (a - n) / t * i * this.speed
                          , o = r - e.oldTimeDiff
                          , l = (Math.max(40 * o, 1),
                        s);
                        Math.abs(e.el.playbackRate - l) > .01 && (e.el.playbackRate = l),
                        e.el.muted = !(e.el instanceof Audio)
                    } else
                        e.el.currentTime = a,
                        e.el.muted = e.el instanceof Audio;
                    e.oldTimeDiff = r
                } else
                    e.el.play(),
                    e.playing = !0,
                    e.oldTimeDiff = 0,
                    null === this.syncSchedule && (this.syncSchedule = e)
            } else
                e.playing ? (e.el.pause(),
                e.playing = !1,
                this.syncSchedule === e && (this.syncSchedule = null)) : e.el.readyState === e.el.HAVE_ENOUGH_DATA && (e.el.currentTime = n)
        }
    } else
        e.el && e.playing && (e.el.pause(),
        e.playing = !1),
        this.syncSchedule === e && (this.syncSchedule = null)
}
,
PZ.ui.playback.prototype.update = function(e) {
    this.animFrameReq = requestAnimationFrame(this._updateFn);
    var t = .001 * (e - this.lastFrame) * this.frameRate * this.speed;
    if (this.lastFrame = e,
    this.syncSchedule && this.syncSchedule.currentItem && !this.syncSchedule.currentItem.clip.properties.time.animated) {
        let e = this.syncSchedule.currentItem.clip
          , t = e.properties.time.keyframes[0].value
          , i = e.length / (e.properties.time.keyframes[1].value - t) / this.frameRate;
        this._exactFrame = e.start + (this.syncSchedule.el.currentTime - t) * this.frameRate * i
    } else
        this._exactFrame += t;
    if (this._exactFrame >= this.totalFrames || this._exactFrame < 0)
        if (this.loop && 0 !== this.speed) {
            let e = (e, t) => (e % t + t) % t;
            this._exactFrame = e(this._exactFrame, this.totalFrames) || 0
        } else
            this._exactFrame = Math.max(Math.min(this._exactFrame, this.totalFrames - 1), 0),
            this.speed = 0;
    this._currentFrame = Math.round(this._exactFrame),
    this._sequence.update(this.currentFrame);
    for (var i = 0; i < this._sequence.audioSchedules.length; i++)
        this._sequence.audioSchedules[i].update(this.currentFrame, this.frameRate),
        this.updateSchedule(this._sequence.audioSchedules[i], t);
    for (i = 0; i < this._sequence.videoSchedules.length; i++)
        this._sequence.videoSchedules[i].update(this.currentFrame, this.frameRate),
        this.updateSchedule(this._sequence.videoSchedules[i], t)
}
,
PZ.ui.properties = function(e) {
    this.editor = e
}
,
PZ.ui.properties.prototype.resetAll = function(e) {
    for (let t of e)
        this.reset(t)
}
,
PZ.ui.properties.prototype.reset = function(e) {
    if (e instanceof PZ.property.dynamic.group) {
        for (let t = 0; t < e.objects.length; t++)
            this.reset(e.objects[t]);
        return
    }
    let t = e.getAddress();
    if (e instanceof PZ.property.dynamic.keyframes) {
        if (e.animated) {
            for (let i = e.keyframes.length - 1; i > 0; i--) {
                let s = {
                    property: t,
                    frame: e.keyframes[i].frame
                };
                this.deleteKeyframe(s)
            }
            let i = {
                property: t,
                animated: !1
            };
            this.setAnimated(i)
        }
        let i = {
            property: t,
            oldFrame: e.keyframes[0].frame,
            newFrame: 0
        };
        this.moveKeyframe(i)
    }
    let i = e.getDefaultValue();
    "function" == typeof i && (i = i(e));
    let s = {
        property: e.getAddress(),
        frame: 0,
        value: i
    };
    this.setValue(s)
}
,
PZ.ui.properties.prototype.toggleAnimation = function(e, t, i, s) {
    if (void 0 === s)
        s = !e.animated;
    else if (s === e.animated)
        return;
    if (e instanceof PZ.property.dynamic.group && (!s || !i) && (s || !e.expression)) {
        for (let n = 0; n < e.objects.length; n++)
            this.toggleAnimation(e.objects[n], t, i, s);
        return
    }
    let n = e.getAddress();
    if (s) {
        if (i) {
            let i = {
                property: n,
                expression: JSON.stringify(e.get(t))
            };
            this.setExpression(i)
        } else if (1 === e.keyframes.length) {
            let i = {
                property: n,
                oldFrame: e.keyframes[0].frame,
                newFrame: t
            };
            this.moveKeyframe(i)
        }
    } else {
        let i, s, r, a;
        if (e.definition.staticBehavior === PZ.property.dynamic.staticBehavior.LINEAR ? (a = e.getParentOfType(PZ.clip).length,
        s = e.get(0),
        r = e.get(a)) : i = e.get(t),
        e.expression) {
            let e = {
                property: n,
                expression: null
            };
            this.setExpression(e)
        }
        if (e.keyframes) {
            for (let t = e.keyframes.length - 1; t >= 0; t--) {
                let i = {
                    property: n,
                    frame: e.keyframes[t].frame
                };
                this.deleteKeyframe(i)
            }
            if (e.definition.staticBehavior === PZ.property.dynamic.staticBehavior.LINEAR) {
                let e;
                e = {
                    property: n,
                    data: new PZ.keyframe(s,0)
                },
                this.createKeyframe(e),
                e = {
                    property: n,
                    data: new PZ.keyframe(r,a)
                },
                this.createKeyframe(e)
            } else {
                let t;
                t = {
                    property: n,
                    data: new PZ.keyframe(i,0,e.defaultTween)
                },
                this.createKeyframe(t)
            }
        }
    }
    let r = {
        property: n,
        animated: s
    };
    this.setAnimated(r)
}
,
PZ.ui.properties.prototype.toggleKeyframe = function(e, t, i) {
    if (void 0 === i)
        i = !e.hasKeyframe(t);
    else if (!e.animated || i === e.hasKeyframe(t))
        return;
    if (e instanceof PZ.property.dynamic.group)
        for (let s = 0; s < e.objects.length; s++)
            this.toggleKeyframe(e.objects[s], t, i);
    else if (i) {
        let i, s;
        if (i = e.definition.allowEmpty ? e.definition.defaultValue(e, t) : e.get(t),
        e.interpolated) {
            let i = e.getClosestKeyframeIndex(t)
              , n = e.keyframes[i];
            n.frame < t && i < e.keyframes.length - 1 && (n = e.keyframes[i + 1]),
            s = n.tween
        } else
            s = 0;
        this.createKeyframe({
            property: e.getAddress(),
            data: new PZ.keyframe(i,t,s)
        })
    } else {
        if (!e.definition.allowEmpty && e.keyframes.length <= 1)
            return;
        this.deleteKeyframe({
            property: e.getAddress(),
            frame: t
        })
    }
}
,
PZ.ui.properties.prototype.startEdit = function(e, t) {
    if (e.animated) {
        let i = e.getClosestKeyframeIndex(t)
          , s = e.keyframes[i];
        if (s && s.frame !== t) {
            let n = e.get(t);
            s.frame < t && i < e.keyframes.length - 1 && (s = e.keyframes[i - 1]),
            this.createKeyframe({
                property: e.getAddress(),
                data: new PZ.keyframe(n,t,s.tween)
            })
        }
    }
}
,
PZ.ui.properties.prototype.setAnimated = function(e) {
    this.editor.project.addressLookup(e.property).animated = e.animated,
    this.editor.history.pushCommand(PZ.ui.properties.prototype.setAnimated.bind(this), {
        property: e.property,
        animated: !e.animated
    })
}
,
PZ.ui.properties.prototype.setValue = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = e.oldValue;
    if (void 0 === i && (i = JSON.parse(JSON.stringify(t.get(e.frame)))),
    void 0 !== e.value && t.set(e.value, e.frame),
    this.editor.history.pushCommand(PZ.ui.properties.prototype.setValue.bind(this), {
        property: e.property,
        frame: e.frame,
        value: i
    }),
    t instanceof PZ.property.dynamic.group)
        for (let i = 0; i < t.objects.length; i++) {
            let s = t.objects[i].getClosestKeyframeIndex(e.frame)
              , n = t.objects[i].keyframes[s];
            t.objects[i].onKeyframeChanged.update(n)
        }
    else if (t instanceof PZ.property.dynamic.keyframes) {
        let i = t.getClosestKeyframeIndex(e.frame)
          , s = t.keyframes[i];
        t.onKeyframeChanged.update(s)
    }
}
,
PZ.ui.properties.prototype.setControlPoints = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = t.getKeyframe(e.frame);
    void 0 === e.oldControlPoints && (e.oldControlPoints = [i.controlPoints[0].slice(), i.controlPoints[1].slice()]),
    void 0 !== e.controlPoints && (i.controlPoints[0][0] = e.controlPoints[0][0],
    i.controlPoints[0][1] = e.controlPoints[0][1],
    i.controlPoints[1][0] = e.controlPoints[1][0],
    i.controlPoints[1][1] = e.controlPoints[1][1]),
    this.editor.history.pushCommand(PZ.ui.properties.prototype.setControlPoints.bind(this), {
        property: e.property,
        frame: e.frame,
        controlPoints: e.oldControlPoints
    }),
    t.onKeyframeChanged.update(i)
}
,
PZ.ui.properties.prototype.setTween = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = t.getKeyframe(e.frame)
      , s = i.tween;
    i.tween = e.tween,
    this.editor.history.pushCommand(PZ.ui.properties.prototype.setTween.bind(this), {
        property: e.property,
        frame: e.frame,
        tween: s
    }),
    t.onKeyframeChanged.update(i)
}
,
PZ.ui.properties.prototype.setContinuousTangent = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = t.getKeyframe(e.frame)
      , s = i.continuousTangent;
    if (s !== e.continuous) {
        if (i.continuousTangent = e.continuous,
        i.continuousTangent) {
            let t = i.controlPoints[0].slice()
              , s = i.controlPoints[1].slice()
              , n = Math.sqrt(t[0] * t[0] + t[1] * t[1])
              , r = Math.atan2(t[1], t[0]) + Math.PI;
            s[0] = n * Math.cos(r),
            s[1] = n * Math.sin(r),
            this.setControlPoints({
                property: e.property,
                frame: e.frame,
                controlPoints: [t, s]
            })
        }
        this.editor.history.pushCommand(PZ.ui.properties.prototype.setContinuousTangent.bind(this), {
            property: e.property,
            frame: e.frame,
            continuous: s
        }),
        t.onKeyframeChanged.update(i)
    }
}
,
PZ.ui.properties.prototype.setExpression = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = null;
    t.expression && (i = t.expression.source),
    t.expression = e.expression ? new PZ.expression(e.expression) : null,
    this.editor.history.pushSingleCommand(PZ.ui.properties.prototype.setExpression.bind(this), {
        property: e.property,
        expression: i
    })
}
,
PZ.ui.properties.prototype.pasteKeyframes = function(e, t, i) {
    if (!t.length)
        return;
    let s = e.getAddress();
    for (let n = 0; n < t.length; n++) {
        t[n].frame += i,
        e.getKeyframe(t[n].frame) && this.deleteKeyframe({
            property: s,
            frame: t[n].frame
        }),
        this.createKeyframe({
            property: s,
            data: t[n]
        })
    }
}
,
PZ.ui.properties.prototype.createKeyframe = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = new PZ.keyframe;
    i.load(e.data);
    let s = t.addKeyframe(i);
    this.editor.history.pushCommand(PZ.ui.properties.prototype.deleteKeyframe.bind(this), {
        property: e.property,
        frame: e.data.frame
    }),
    t.onKeyframeCreated.update(i, s)
}
,
PZ.ui.properties.prototype.deleteKeyframe = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = t.deleteKeyframe(e.frame);
    if (!i)
        return;
    let s = {
        property: e.property,
        data: i
    };
    this.editor.history.pushCommand(PZ.ui.properties.prototype.createKeyframe.bind(this), s),
    t.onKeyframeDeleted.update(i)
}
,
PZ.ui.properties.prototype.moveKeyframe = function(e) {
    let t = this.editor.project.addressLookup(e.property)
      , i = t.getKeyframeUnsorted(e.oldFrame);
    i.frame = e.newFrame,
    this.editor.history.pushCommand(PZ.ui.properties.prototype.moveKeyframe.bind(this), {
        property: e.property,
        oldFrame: e.newFrame,
        newFrame: e.oldFrame
    }),
    t.sortKeyframes(),
    t.onKeyframeMoved.update(e, i)
}
,
PZ.ui.properties.prototype.startMove = function(e, t) {
    let i = e.getAddress()
      , s = [];
    for (let e = 0; e < t; e++) {
        let e = {
            property: i,
            oldFrame: 0,
            newFrame: 0
        };
        s.push(e)
    }
    return s
}
,
PZ.ui.properties.prototype.finishMove = function(e, t, i, s) {
    e.sortKeyframes();
    for (let i = e.keyframes.length - 2; i >= 0; i--) {
        let s = e.keyframes[i]
          , n = e.keyframes[i + 1];
        if (s.frame === n.frame) {
            let n;
            n = t.has(s) ? e.deleteKeyframeIdx(i + 1) : e.deleteKeyframeIdx(i);
            let r = {
                property: e.getAddress(),
                data: n
            };
            this.editor.history.pushCommand(PZ.ui.properties.prototype.createKeyframe.bind(this), r),
            e.onKeyframeDeleted.update(n)
        }
    }
    for (let t = 0; t < i.length; t++)
        this.editor.history.pushCommand(PZ.ui.properties.prototype.moveKeyframe.bind(this), i[t]),
        e.onKeyframeMoved.update(i[t], s.get(i[t]))
}
,
PZ.ui.media = class extends PZ.ui.panel.nav {
    constructor(e, t) {
        super(e),
        this.title = "Media",
        this.icon = "project",
        this.newid = 1,
        this.id = 0,
        this.lists = [],
        this.onResized = new PZ.observable,
        this.options = {
            showProjectMedia: !0
        },
        Object.assign(this.options, t),
        this.el.style.overflowY = "auto",
        this.create()
    }
    create() {
        this.navigate(this.createMainPage());
        var e = new PZ.ui.query(location.search);
        parseInt(e.keys.c)
    }
    createMainPage() {
        let e = this.createPage();
        new PZ.ui.media.search(this),
        new PZ.ui.media.list.missing(this);
        if (this.options.showProjectMedia) {
            new PZ.ui.media.list.project(this)
        }
        new PZ.ui.media.list.community(this);
        return e
    }
    resize() {
        this.onResized.update()
    }
    createMedia(e) {
        let t = new PZ.media;
        this.editor.project.media.splice(e.address[1], 0, t),
        t.loading = t.load(e.data),
        this.editor.history.pushCommand(PZ.ui.media.prototype.deleteMedia.bind(this), {
            address: e.address
        })
    }
    moveMedia(e) {
        this.editor.history.pushCommand(PZ.ui.media.prototype.moveMedia.bind(this), {
            oldAddress: e.newAddress,
            newAddress: e.oldAddress
        })
    }
    deleteMedia(e) {
        let t = this.editor.project.media[e.address[1]];
        t.unload(),
        this.editor.project.media.splice(e.address[1], 1),
        this.editor.history.pushCommand(PZ.ui.media.prototype.createMedia.bind(this), {
            address: e.address,
            data: JSON.parse(JSON.stringify(t))
        })
    }
    async importCreation(e) {
        var t = await PZ.api("/creations/" + e, "get")
          , i = await t.json()
          , s = await fetch(PZ.blobOrigin + "/creations/" + e + ".pz")
          , n = await s.blob()
          , r = await this.importProject(n);
        return r.title = i.title,
        r.thumbnail = PZ.blobOrigin + "/creation-thumbnails/" + e + ".jpg",
        r
    }
    async importFile(e) {
        let t;
        return e.type.startsWith("video") || e.type.startsWith("audio") ? t = this.importAV(e) : e.type.startsWith("image") ? t = this.importImage(e) : e.name.endsWith(".pz") && (t = this.importProject(e)),
        t
    }
    async importProject(e) {
        let t = new PZ.archive;
        await t.untar(e);
        let i = await PZ.project.load(t);
        this.editor.project.assets.loadAll(i.assets, t);
        let s = []
          , n = Object.keys(i.assets);
        for (let e = 0; e < n.length; e++)
            s.push(n[e]);
        let r = {
            properties: {},
            data: [],
            baseType: "track",
            assets: s
        };
        return r.data.push(...i.sequence.videoTracks),
        r.data.push(...i.sequence.audioTracks),
        r.properties.name = e.name,
        r.properties.icon = "sequence",
        r
    }
    async importAV(e) {
        let t = await this.editor.project.assets.createFromFile(PZ.asset.type.AV, e)
          , i = await this.loadVideo(t)
          , s = await this.loadAudio(t);
        if (!i && !s)
            return null;
        let n = {
            properties: {},
            data: [],
            baseType: "track",
            assets: [t.key]
        };
        if (i) {
            n.thumbnail = i.thumbnail,
            delete i.thumbnail;
            let e = {
                type: 0,
                clips: [i]
            };
            n.data.push(e)
        }
        if (s) {
            let e = {
                type: 1,
                clips: [s]
            };
            n.data.push(e)
        }
        return i && s && (i.link = 0,
        s.link = 0),
        n.properties.name = e.name,
        n.properties.icon = "wave",
        n
    }
    async importImage(e) {
        let t = await this.editor.project.assets.createFromFile(PZ.asset.type.IMAGE, e);
        var i = await this.loadImage(t);
        if (!i)
            return null;
        var s = {
            properties: {},
            data: [],
            baseType: "track",
            assets: [t.key]
        };
        s.thumbnail = i.thumbnail,
        delete i.thumbnail;
        let n = {
            type: 0,
            clips: [i]
        };
        return s.data.push(n),
        s.properties.name = e.name,
        s.properties.icon = "sequence",
        s
    }
    generateThumbnail(e, t, i) {
        var s = document.createElement("canvas");
        return s.width = t,
        s.height = i,
        s.getContext("2d").drawImage(e, 0, 0, t, i),
        new Promise(function(e, t) {
            s.toBlob ? s.toBlob(e) : e(s.msToBlob())
        }
        )
    }
    loadVideo(e) {
        var t = document.createElement("video")
          , i = t.canPlayType(e.file.type);
        if ("no" !== (i = "" === i ? "no" : i))
            return new Promise(function(i, s) {
                async function n() {
                    var t = Math.floor(30 * this.duration)
                      , s = this.videoWidth
                      , n = this.videoHeight;
                    if (0 !== s && 0 !== n) {
                        e.length = this.duration;
                        var r = Math.min(330 / s, 186 / n)
                          , a = await PZ.ui.media.prototype.generateThumbnail(this, Math.round(s * r), Math.round(n * r))
                          , o = {
                            type: 0,
                            start: 0,
                            length: t,
                            offset: 0,
                            properties: {
                                name: e.filename,
                                media: e.key
                            },
                            object: {
                                type: 0,
                                effects: [],
                                properties: {
                                    resolution: [s, n]
                                }
                            },
                            thumbnail: a
                        };
                        this.onseeked = null,
                        i(o)
                    } else
                        i()
                }
                t.onloadedmetadata = t.onloadeddata = function() {
                    this.onseeked = n,
                    this.currentTime = .1 * this.duration,
                    this.onloadedmetadata = null,
                    this.onloadeddata = null
                }
                ,
                t.preload = "metadata",
                t.src = e.url
            }
            )
    }
    loadImage(e) {
        var t = new Image;
        return new Promise(function(i, s) {
            t.onload = async function() {
                var t = this.width
                  , s = this.height;
                if (0 !== t && 0 !== s) {
                    var n = Math.min(330 / t, 186 / s)
                      , r = await PZ.ui.media.prototype.generateThumbnail(this, Math.round(t * n), Math.round(s * n))
                      , a = {
                        type: 0,
                        start: 0,
                        length: 150,
                        offset: 0,
                        properties: {
                            name: e.filename
                        },
                        object: {
                            type: 3,
                            effects: [],
                            properties: {
                                childProperties: {
                                    image: e.key
                                },
                                resolution: [t, s]
                            }
                        },
                        thumbnail: r
                    };
                    this.onload = null,
                    i(a)
                } else
                    i()
            }
            ,
            t.src = e.url
        }
        )
    }
    loadAudio(e) {
        var t = document.createElement("audio")
          , i = t.canPlayType(e.file.type);
        if ("no" !== (i = "" === i ? "no" : i))
            return new Promise(function(i, s) {
                t.onloadeddata = function() {
                    var s = Math.floor(30 * t.duration);
                    e.length = this.duration;
                    var n = {
                        type: 1,
                        start: 0,
                        length: s,
                        offset: 0,
                        properties: {
                            name: e.filename,
                            media: e.key
                        }
                    };
                    this.onloadeddata = null,
                    t = null,
                    i(n)
                }
                ,
                t.preload = "metadata",
                t.src = e.url
            }
            )
    }
}
,
PZ.ui.media.list = function(e) {
    this.media = e,
    this.editor = e.editor,
    this.el = document.createElement("div"),
    this.el.classList.add("media-list"),
    this.el.classList.add("noselect"),
    this.el.pz_zoom = 150,
    this.el.style = "grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); width: 100%;",
    this.el.addEventListener("wheel", PZ.ui.media.list.prototype.mouseWheel),
    e.lists.push(this),
    e.el.appendChild(this.el)
}
,
PZ.ui.media.list.prototype.mouseWheel = function(e) {
    !0 === e.ctrlKey && (e.deltaY < 0 ? this.pz_zoom += 5 : e.deltaY > 0 && (this.pz_zoom -= 5),
    this.style.gridTemplateColumns = "repeat(auto-fill, " + this.pz_zoom + "px)",
    e.preventDefault())
}
,
PZ.ui.media.list.prototype.createItem = function(e) {
    e || (e = "div");
    let t = document.createElement(e);
    t.classList.add("media-item");
    let i = document.createElement("div");
    i.classList.add("media-item-img"),
    t.appendChild(i);
    let s = document.createElement("div");
    return s.classList.add("media-item-title"),
    s.innerText = "Loading...",
    t.appendChild(s),
    t
}
,
PZ.ui.media.list.missing = function(e) {
    this.title = new PZ.ui.media.title(e),
    this.title.nameEl.innerText = "Missing assets",
    e.el.appendChild(this.title.el);
    let t = PZ.ui.media.list.missing.prototype.locateFiles.bind(this);
    this.title.createButton("Locate", "project", () => {
        this.editor.showFilePicker(t, "", !0)
    }
    ),
    PZ.ui.media.list.call(this, e),
    this.el.style.gridTemplateColumns = "repeat(auto-fill, 100%)",
    this.el.style.minHeight = "0",
    this.assets = null,
    this.searchQuery = "",
    this.searchTimeout = null,
    this.editor.onProjectChanged.watch(this.projectChanged.bind(this), !0)
}
,
PZ.ui.media.list.missing.prototype.locateFiles = async function(e) {
    let t = e.currentTarget.files;
    for (let e = 0; e < t.length; e++)
        await this.assets.locate(t[e])
}
,
PZ.ui.media.list.missing.prototype.projectChanged = function() {
    this.media.editor.project ? (this.assets = this.media.editor.project.assets,
    this.assets.onAssetCreated.watch(this.assetsChanged.bind(this)),
    this.assets.onAssetRemoved.watch(this.assetsChanged.bind(this))) : this.assets = null,
    this.assetsChanged()
}
,
PZ.ui.media.list.missing.prototype.assetsChanged = function() {
    if (this.el.innerHTML = "",
    this.assets) {
        let e = Object.keys(this.assets.list);
        for (let t = 0; t < e.length; t++) {
            let i = this.assets.list[e[t]];
            if (i.source === PZ.asset.source.FILE && !i.file) {
                let e = this.createItem(i);
                this.el.appendChild(e)
            }
        }
    }
    let e = this.el.children.length;
    this.title.nameEl.innerText = "Missing assets (" + e + ")",
    0 === e ? (this.title.el.style.display = "none",
    this.el.style.display = "none") : (this.title.el.style.display = "",
    this.el.style.display = "")
}
,
PZ.ui.media.list.missing.prototype.search = function(e) {}
,
PZ.ui.media.list.missing.prototype.createItem = function(e) {
    var t = PZ.ui.media.list.prototype.createItem.call(this);
    let i = t.children[0]
      , s = t.children[1];
    return i.remove(),
    t.title = e.title,
    s.innerText = e.filename || e.sha256,
    t.classList.add("mediaitem"),
    t
}
,
PZ.ui.media.list.community = function(e) {
    this.title = new PZ.ui.media.title(e),
    this.title.nameEl.innerText = "Community media",
    this.hidden = true,
    e.el.appendChild(this.title.el),
    PZ.ui.media.list.call(this, e),
    this.searchQuery = "",
    this.searchTimeout = null,
    this.redrawList("")
}
,
PZ.ui.media.list.community.prototype.search = function(e) {
    clearTimeout(this.searchTimeout),
    this.searchQuery = e,
    this.el.innerHTML = "",
    this.searchTimeout = setTimeout(this.redrawList.bind(this, e), 1e3)
}
,
PZ.ui.media.list.community.prototype.createItem = function(e) {
    var t = PZ.ui.media.list.prototype.createItem.call(this, "a");
    let i = t.children[0]
      , s = t.children[1];
    var n = document.createElement("img");
    return n.setAttribute("draggable", !1),
    n.src = PZ.blobOrigin + "/creation-thumbnails/" + e.creationId + ".jpg",
    n.title = e.title,
    n.style.width = "100%",
    i.appendChild(n),
    t.title = e.title,
    s.innerText = e.title,
    t.classList.add("mediaitem"),
    t.setAttribute("draggable", "true"),
    t.setAttribute("href", "?c=" + e.creationId),
    this.clickfn && (t.style = "cursor:default;",
    t.onclick = this.clickfn),
    t
}
,
PZ.ui.media.list.community.prototype.createItems = function(e) {
    for (let t = 0; t < e.length; t++) {
        let i = this.createItem(e[t]);
        this.el.appendChild(i)
    }
}
,
PZ.ui.media.list.community.prototype.loadCreationsList = async function(e) {
    try {
        var t = await PZ.api("/creations" + e, "get");
        if (200 === t.status)
            return await t.json()
    } catch (e) {}
}
,
PZ.ui.media.list.community.prototype.redrawList = async function(e) {
    // if (e !== this.searchQuery)
    //     return;
    // let t = "?pageSize=12&page=" + Math.round(25 * Math.random()).toString();
    // "" !== e && (t = "?pageSize=12&section=4&query=" + encodeURIComponent(e)),
    // this.el.innerHTML = "";
    // let i = await this.loadCreationsList(t);
    // if (i && i.length)
    //     this.createItems(i);
    // else {
    //     let e = document.createElement("div");
    //     e.classList.add("empty", "noselect"),
    //     e.innerText = i ? "no results" : "couldn't load media",
    //     this.el.appendChild(e)
    // }
}
,
PZ.ui.media.list.project = function(e) {
    this.title = new PZ.ui.media.title(e),
    this.title.nameEl.innerText = "Project media",
    e.el.appendChild(this.title.el);
    let t = PZ.ui.media.list.project.prototype.importFiles.bind(this);
    this.title.createButton("Import", "add", () => {
        this.editor.showFilePicker(t, "video/*,audio/*,image/*,.pz", !0)
    }
    ),
    PZ.ui.media.list.call(this, e),
    this.editor.onProjectChanged.watch(this.projectChanged.bind(this), !0),
    this.searchTimeout = null,
    this.el.setAttribute("tabindex", "-1"),
    this.el.ondragover = this.dragOver.bind(this),
    this.el.ondrop = this.drop.bind(this),
    e.el.onkeydown = this.keydown.bind(this),
    this.el.onclick = this.click.bind(this),
    this.drag = {},
    this.touchDrag = new PZ.ui.drag([],this.touchDragStart,this.touchDrag,this.touchDragUpdate,this.touchDragEnd,this),
    this.touchDrag.enableMouse = !1
}
,
PZ.ui.media.list.project.prototype.projectChanged = function() {
    let e = this.editor.project;
    e && (e.media.onObjectAdded.watch(this.mediaCreated.bind(this)),
    e.media.onObjectRemoved.watch(this.mediaDeleted.bind(this))),
    this.redrawList()
}
,
PZ.ui.media.list.project.prototype.mediaCreated = function(e, t) {
    let i = this.createItem(e, this.fuse);
    this.el.insertBefore(i, this.el.children[t])
}
,
PZ.ui.media.list.project.prototype.mediaDeleted = function(e, t) {
    this.el.children[t].remove()
}
,
PZ.ui.media.list.project.prototype.importFiles = function(e) {
    let t = e.currentTarget.files;
    this.editor.history.startOperation();
    for (let e = 0; e < t.length; e++) {
        let i = this.media.importFile(t[e])
          , s = {
            address: [1, this.editor.project.media.length],
            data: i
        };
        this.media.createMedia(s)
    }
    this.editor.history.finishOperation()
}
,
PZ.ui.media.list.project.prototype.search = function(e) {
    if ("" === e) {
        for (let e = 0; e < this.el.children.length; e++)
            this.el.children[e].style.display = "";
        return
    }
    for (let e = 0; e < this.el.children.length; e++)
        this.el.children[e].style.display = "none";
    let t = this.fuse.search(e);
    for (let e = 0; e < t.length; e++)
        t[e].el.style.display = ""
}
,
PZ.ui.media.list.project.prototype.createItem = function(e, t) {
    var i = PZ.ui.media.list.prototype.createItem.call(this);
    i.onmousedown = this.mouseDown.bind(this),
    i.onmouseup = this.mouseUp.bind(this),
    i.ondragstart = this.dragStart.bind(this),
    i.ondragend = this.dragEnd.bind(this),
    this.touchDrag.addElts(i);
    return e.onLoaded.watch(function() {
        if (!e.loaded)
            return;
        let s = i.children[0];
        if (i.children[1].innerText = e.properties.name.get(),
        i.title = e.properties.name.get(),
        e.thumbnail) {
            var n = document.createElement("img");
            n.style.width = "100%",
            n.src = "string" == typeof e.thumbnail ? e.thumbnail : URL.createObjectURL(e.thumbnail),
            delete e.thumbnail,
            s.appendChild(n)
        } else {
            let t = e.properties.icon.get();
            s.appendChild(PZ.ui.generateIcon(t))
        }
        t.list.push({
            title: e.properties.name.get(),
            el: i
        }),
        i.pz_object = e,
        i.setAttribute("draggable", "true")
    }, !0),
    i
}
,
PZ.ui.media.list.project.prototype.redrawList = function(e) {
    this.el.innerHTML = "";
    this.fuse = new Fuse([],{
        keys: ["title"]
    });
    let t = this.editor.project;
    if (t)
        for (let e = 0; e < t.media.length; e++) {
            let i = this.createItem(t.media[e], this.fuse);
            this.el.appendChild(i)
        }
}
,
PZ.ui.media.list.project.prototype.dragOver = function(e) {
    e.preventDefault(),
    e.dataTransfer.dropEffect = "copy"
}
,
PZ.ui.media.list.project.prototype.drop = function(e) {
    e.preventDefault(),
    this.editor.history.startOperation();
    for (let t = 0; t < e.dataTransfer.files.length; t++) {
        let i = this.media.importFile(e.dataTransfer.files[t])
          , s = {
            address: [1, this.editor.project.media.length],
            data: i
        };
        this.media.createMedia(s)
    }
    e.dataTransfer.items;
    var t = e.dataTransfer.getData("text");
    let i = /videoeditor\?c=(\d+)/gm.exec(t)
      , s = i ? i[1] : null;
    if (s) {
        s = parseInt(s);
        let e = this.media.importCreation(s)
          , t = {
            address: [1, this.editor.project.media.length],
            data: e
        };
        this.media.createMedia(t)
    }
    this.editor.history.finishOperation()
}
,
PZ.ui.media.list.project.prototype.keydown = async function(e) {
    if ("Delete" === e.key || "Del" === e.key) {
        e.stopPropagation();
        let t = this.el.querySelectorAll(".selected");
        this.editor.history.startOperation(),
        this.deleteMedia(t),
        this.editor.history.finishOperation()
    }
    if (e.ctrlKey)
        if ("c" === e.key || "x" === e.key) {
            let t = Array.from(this.el.querySelectorAll(".selected"), e => e.pz_object)
              , i = JSON.stringify(t);
            if (navigator.clipboard.writeText(i),
            "x" === e.key) {
                let e = this.el.querySelectorAll(".selected");
                this.editor.history.startOperation(),
                this.deleteMedia(e),
                this.editor.history.finishOperation()
            }
        } else if ("v" === e.key) {
            let t = await navigator.clipboard.readText()
              , i = [];
            try {
                i = JSON.parse(t)
            } catch (e) {}
            for (let e = 0; e < i.length; e++) {
                let t = new PZ.media;
                t.loading = t.load(i[e]),
                this.editor.project.media.push(t)
            }
        }
}
,
PZ.ui.media.list.project.prototype.click = function(e) {
    e.srcElement === this.el && this.deselectAll()
}
,
PZ.ui.media.list.project.prototype.mouseDown = function(e) {
    var t = e.currentTarget;
    this.el.focus(),
    t.classList.contains("selected") ? this.drag.originalState = !0 : (this.drag.originalState = !1,
    e.shiftKey || this.deselectAll(),
    t.classList.add("selected"))
}
,
PZ.ui.media.list.project.prototype.mouseUp = function(e) {
    var t = e.currentTarget;
    e.shiftKey && !0 === this.drag.originalState && t.classList.remove("selected")
}
,
PZ.ui.media.list.project.prototype.dragStart = function(e) {
    this.editor.draggingData = [];
    var t = e.currentTarget.parentElement.getElementsByClassName("selected");
    for (let e = 0; e < t.length; e++)
        this.editor.draggingData.push(t[e].pz_object);
    e.dataTransfer.setData("text", "clip"),
    e.dataTransfer.setDragImage && e.dataTransfer.setDragImage(this.mediaDragImage, -30, -30)
}
,
PZ.ui.media.list.project.prototype.dragEnd = function(e) {
    this.editor.draggingData = null
}
,
PZ.ui.media.list.project.prototype.touchDragStart = function(e) {}
,
PZ.ui.media.list.project.prototype.touchDrag = function(e) {}
,
PZ.ui.media.list.project.prototype.touchDragUpdate = function(e) {}
,
PZ.ui.media.list.project.prototype.touchDragEnd = function(e) {}
,
PZ.ui.media.list.project.prototype.deselectAll = function() {
    let e = this.el.getElementsByClassName("selected");
    for (; e.length; )
        e[0].classList.remove("selected")
}
,
PZ.ui.media.list.project.prototype.deleteMedia = function(e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t];
        if (!0 === i.pz_object.preset)
            continue;
        var s = {
            address: [1, Array.prototype.indexOf.call(i.parentElement.children, i)]
        };
        this.media.deleteMedia(s)
    }
}
,
PZ.ui.media.list.project.prototype.mediaDragImage = new Image,
PZ.ui.media.list.project.prototype.mediaDragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAAGFBMVEUAAAD///8AAAD///8zMzMdHR0REREsLCzNVxa9AAAAAnRSTlMAAQGU/a4AAABJSURBVBjTYxBggAMgm9kYARgYmJXgQJkkngscODOgmokJIBIGUJ4ZyAg1GM8UxFMlyEPoQzMTB0B1iznEnVBgBPYD6Txs/hMAAD9lHPOTSUlDAAAAAElFTkSuQmCC",
PZ.ui.media.search = function(e) {
    this.media = e,
    this.editor = e.editor,
    this.el = document.createElement("div"),
    this.el.style = "padding: 4px;",
    this.searchText = "",
    this.textEl = document.createElement("input"),
    this.textEl.setAttribute("type", "text"),
    this.textEl.setAttribute("placeholder", "search media"),
    this.textEl.classList.add("pz-filterbox"),
    this.el.appendChild(this.textEl),
    this.textEl.onkeyup = this.keyUp.bind(this),
    this.textEl.onkeydown = this.keyDown.bind(this),
    this.media.el.appendChild(this.el)
}
,
PZ.ui.media.search.prototype.search = function() {
    let e = this.textEl.value;
    if (this.searchText !== e) {
        this.searchText = e;
        for (let t = 0; t < this.media.lists.length; t++)
            this.media.lists[t].search(e)
    }
}
,
PZ.ui.media.search.prototype.keyUp = function(e) {
    this.search()
}
,
PZ.ui.media.search.prototype.keyDown = function(e) {
    "Escape" === e.key && (this.textEl.value = "")
}
,
PZ.ui.media.title = function(e) {
    this.media = e,
    this.create()
}
,
PZ.ui.media.title.prototype.createButton = function(e, t, i) {
    let s = document.createElement("button");
    s.appendChild(PZ.ui.generateIcon(t)),
    s.firstElementChild.style = "width:18px;height:18px;fill:#acacac;vertical-align: bottom;",
    s.title = e,
    s.classList.add("actionbutton"),
    s.style = "width:auto;height:auto;float:right;color:#acacac;font-size:16px;font-family:inherit;margin-top:-2px;",
    s.onclick = i;
    let n = document.createElement("span");
    n.innerText = e,
    n.style = "margin-left:5px;vertical-align:top;",
    s.appendChild(n),
    this.el.appendChild(s)
}
,
PZ.ui.media.title.prototype.create = function() {
    this.el = document.createElement("div"),
    this.el.classList.add("media-title"),
    this.el.classList.add("noselect"),
    this.nameEl = document.createElement("span"),
    this.nameEl.innerText = "Media",
    this.el.appendChild(this.nameEl)
}
,
PZ.ui.media.title.old = function() {
    this.createButton("Upload", "upload", function() {}),
    this.createButton("Filter", "filter", function() {})
}
,
PZ.ui.timeline = function(e) {
    PZ.ui.panel.call(this, e),
    this.canDuplicate = !0,
    this.el.style = "background-color: #2a2a2a;",
    this.zoom = 1,
    this.scroll = 0,
    this.selectionStart = 0,
    this.selectionLength = 0,
    this.timeFormat = 0,
    this._updateFn = this.update.bind(this),
    this.onEnabledChanged.watch( () => {
        this.enabled ? this.animFrameReq = requestAnimationFrame(this._updateFn) : cancelAnimationFrame(this.animFrameReq)
    }
    ),
    this.create(),
    this.keyframes = new PZ.ui.timeline.keyframes(this),
    this.tracks = new PZ.ui.timeline.tracks(this),
    this.editor.onSequenceChanged.watch(this.sequenceChanged.bind(this), !0),
    this.tracks.selection.onListChanged.watch(this.selectionChanged.bind(this), !0)
}
,
PZ.ui.timeline.prototype.sequenceChanged = function() {
    if (this.sequence = this.editor.sequence,
    this.sequence) {
        let e = this.sequence.properties;
        e.rate.onChanged.watch(this.updateZoom.bind(this, null, null), !0),
        e.markers.onKeyframeCreated.watch(this.redrawMarkers.bind(this), !0),
        e.markers.onKeyframeDeleted.watch(this.redrawMarkers.bind(this))
    }
}
,
PZ.ui.timeline.prototype.redrawMarkers = function() {
    for (let e = 0; e < this.markers.length; e++)
        this.markers[e].remove();
    this.markers = [];
    let e = this.sequence.properties.markers.keyframes;
    for (let i = 0; i < e.length; i++) {
        var t = document.createElement("div");
        t.style = "color:rgb(112, 194, 157); font-size:14px; position: absolute; pointer-events: none; top:50%; height:50%; padding-left: 5px;border-left: 1px dashed rgb(112, 194, 157);",
        t.pz_marker = e[i],
        this.timerule.appendChild(t),
        this.markers.push(t)
    }
}
,
PZ.ui.timeline.prototype.selectionChanged = function() {
    var e = this.tracks.selection;
    if (0 !== e.length) {
        for (var t = Number.POSITIVE_INFINITY, i = 0, s = 0; s < e.length; s++)
            t = Math.min(t, e[s].start),
            i = Math.max(i, e[s].start + e[s].length);
        this.selectionStart = t,
        this.selectionLength = Math.max(i - t, 0),
        this.selectionShadow.style.display = "",
        this.selectionShadow.style.left = this.frameToPx(this.selectionStart) + "px",
        this.selectionShadow.style.width = this.frameToPx(this.selectionLength) + "px"
    } else
        this.selectionShadow.style.display = "none"
}
,
PZ.ui.timeline.prototype.create = function() {
    var e = this;
    this.el.onkeydown = this.keydown.bind(this),
    this.el.addEventListener("wheel", this.mouseWheel.bind(this));
    var t = document.createElement("div")
      , i = document.createElement("div");
    i.style = "position:absolute;top:0;left:0;height:35px;width:200px;background-color: #1D1D1D;",
    this.timestamp = document.createElement("span"),
    this.timestamp.style = "color:#ccc;display:block;line-height:30px;width:100%;padding-left:10px;box-sizing:border-box",
    i.oncontextmenu = function() {
        return e.timeFormat = (e.timeFormat + 1) % 3,
        !1
    }
    ,
    i.appendChild(this.timestamp),
    t.appendChild(i),
    this.timerule = document.createElement("div"),
    this.timerule_drag = new PZ.ui.drag(this.timerule,function(t) {
        e.el.focus(),
        this.origin = e.tracks.container.getBoundingClientRect().left
    }
    ,function(e) {
        this.currentPt = e.pageX - this.origin
    }
    ,function() {
        var t = this.currentPt + e.scroll;
        e.setFrame(t)
    }
    ),
    this.timerule_drag.initialMove = !0,
    this.timerule_drag.finalUpdate = !0,
    this.timerule.style = "position: absolute;left: 200px;top: 0;height: 35px;overflow: hidden;background-color: rgb(36, 36, 36);",
    t.appendChild(this.timerule),
    this.timelabels = [],
    this.markers = [],
    this.el.appendChild(t),
    this.selectionShadow = document.createElement("div"),
    this.selectionShadow.style = "position:absolute; bottom:0; height:2px; width: 0; left: 0; background-color: #526183; opacity: 0.8",
    this.timerule.appendChild(this.selectionShadow),
    this.scrollBar = document.createElement("div"),
    this.scrollBar.style = "position:absolute;bottom:0;height:20px;right:20px;left:200px;overflow-x:scroll;overflow-y:hidden;",
    this.scrollBar.onscroll = function() {
        e.scroll = this.scrollLeft
    }
    ;
    var s = document.createElement("div");
    s.style = "height:1px",
    this.scrollBar.appendChild(s),
    this.el.appendChild(this.scrollBar),
    this.markermask = document.createElement("div"),
    this.markermask.style = "position:absolute;left:200px;top:0;overflow:hidden;pointer-events:none;",
    this.cursor = document.createElement("div"),
    this.cursor.style = "position: absolute; left: 0; width:1px; height:100%; background-color: rgb(183, 30, 30); pointer-events:none;",
    this.markermask.appendChild(this.cursor),
    this.el.appendChild(this.markermask)
}
,
PZ.ui.timeline.prototype.timeUnits = [1, 5, 15, 300, 1800],
PZ.ui.timeline.prototype.update = function() {
    this.animFrameReq = requestAnimationFrame(this._updateFn),
    this.timestamp.innerText = this.formatTime(this.editor.playback.currentTime);
    var e, t = 200 * this.zoom;
    let i = 1 / this.zoom
      , s = Math.min(Math.max(Math.floor(Math.log10(.5 * i)) + 1, 0), 4);
    var n = (e = this.timeUnits[s]) * Math.pow(2, Math.floor(Math.log2(i / e)))
      , r = t * n * 2
      , a = this.scrollBar.scrollLeft
      , o = -a % r;
    for (let e = 0; e < this.timelabels.length; e++) {
        let t = this.timelabels[e];
        t.style.left = o + e * r + "px",
        t.style.width = .5 * r + "px",
        t.innerText = this.formatTime((e + Math.floor(a / r)) * n)
    }
    for (let e = 0; e < this.markers.length; e++) {
        let t = this.markers[e];
        t.style.left = this.frameToPx(t.pz_marker.frame) - a + "px",
        t.innerText = t.pz_marker.value
    }
    this.cursor.style.left = this.frameToPx(this.editor.playback.currentFrame) - a + "px",
    0 !== this.editor.playback.speed && this.scrollToShow(this.frameToPx(this.editor.playback.currentFrame)),
    this.selectionShadow.style.left = this.frameToPx(this.selectionStart) - a + "px",
    this.keyframes.update(),
    this.tracks.update()
}
,
PZ.ui.timeline.prototype.resize = function() {
    var e = this.scrollBar
      , t = e.offsetHeight - e.clientHeight;
    this.markermask.style.right = t + "px",
    this.markermask.style.bottom = t + "px",
    this.timerule.style.right = t + "px",
    this.scrollBar.style.height = t + "px",
    this.scrollBar.style.right = t + "px",
    this.tracks.el.style.bottom = t + "px";
    let i = this.timerule.clientWidth
      , s = Math.ceil(i / 200);
    this.timelabels.splice(s).forEach(e => e.remove()),
    this.timelabels.length = s;
    for (var n = 0; n < this.timelabels.length; n++)
        if (!this.timelabels[n]) {
            let e = document.createElement("div");
            e.classList.add("timelabel"),
            this.timerule.insertBefore(e, this.timerule.firstElementChild),
            this.timelabels[n] = e
        }
    this.sequence && (this.keyframes.zoom(),
    this.tracks.zoom()),
    this.tracks.verticalZoom()
}
,
PZ.ui.timeline.prototype.formatTime = function(e) {
    if (0 === this.timeFormat) {
        var t = e / 60
          , i = Math.floor(t / 60);
        return t = Math.floor(t % 60),
        e %= 60,
        ("0" + i).slice(-2) + ":" + ("0" + t).slice(-2) + ":" + ("0" + e.toFixed(3)).slice(-6)
    }
    if (1 === this.timeFormat) {
        var s = this.editor.playback.frameRate
          , n = Math.round(e * s) % s;
        t = e / 60,
        i = Math.floor(t / 60);
        return t = Math.floor(t % 60),
        e = Math.floor(e % 60),
        ("0" + i).slice(-2) + ":" + ("0" + t).slice(-2) + ":" + ("0" + e).slice(-2) + ":" + ("0" + n).slice(-2)
    }
    return Math.round(e * this.editor.playback.frameRate)
}
,
PZ.ui.timeline.prototype.pxToFrame = function(e) {
    return e * this.editor.playback.frameRate / 400 / this.zoom
}
,
PZ.ui.timeline.prototype.frameToPx = function(e) {
    return e / this.editor.playback.frameRate * 400 * this.zoom
}
,
PZ.ui.timeline.prototype.keepInView = function(e) {
    var t = this.scrollBar
      , i = this.scrollBar.clientWidth
      , s = 0;
    (e -= t.scrollLeft) - 50 < 0 ? s = e - 50 : e - i + 50 > 0 && (s = e - i + 50),
    t.scrollLeft += s / 5
}
,
PZ.ui.timeline.prototype.scrollToShow = function(e) {
    var t = this.scrollBar
      , i = this.scrollBar.clientWidth
      , s = Math.floor(e / i)
      , n = e - t.scrollLeft;
    (n < 0 || n > i) && (t.scrollLeft = s * i)
}
,
PZ.ui.timeline.prototype.setFrame = function(e) {
    this.keepInView(e);
    let t = Math.round(this.pxToFrame(e))
      , i = this.editor.playback.totalFrames;
    this.editor.playback.speed = 0,
    this.editor.playback.currentFrame = Math.max(Math.min(t, i - 1), 0)
}
,
PZ.ui.timeline.prototype.updateZoom = function(e, t) {
    e = e || this.zoom,
    t = t || 0;
    var i = this.zoom
      , s = this.scrollBar.scrollLeft;
    this.zoom = e;
    var n = (s + t) * (this.zoom / i) - t;
    this.scrollBar.scrollLeft = n;
    var r = this.frameToPx(this.editor.playback.totalFrames);
    this.scrollBar.children[0].style.width = r + "px",
    this.selectionShadow.style.left = this.frameToPx(this.selectionStart) + "px",
    this.selectionShadow.style.width = this.frameToPx(this.selectionLength) + "px",
    this.keyframes.zoom(),
    this.tracks.zoom()
}
,
PZ.ui.timeline.prototype.keydown = function(e) {
    if ("\\" === e.key) {
        e.stopPropagation();
        var t = this.editor.playback.totalFrames;
        if (0 === t)
            return;
        var i = this.scrollBar.clientWidth * this.zoom / this.frameToPx(t);
        this.updateZoom(i, 0)
    } else if ("-" === e.key) {
        e.stopPropagation();
        var s = this.frameToPx(this.editor.playback.currentFrame) - this.tracks.container.scrollLeft;
        this.updateZoom(this.zoom / 1.03125, s)
    } else if ("=" === e.key) {
        e.stopPropagation();
        s = this.frameToPx(this.editor.playback.currentFrame) - this.tracks.container.scrollLeft;
        this.updateZoom(1.03125 * this.zoom, s)
    } else
        e.ctrlKey && "v" === e.key && (this.keyframes.keydown(e),
        this.tracks.keydown(e))
}
,
PZ.ui.timeline.prototype.mouseWheel = function(e) {
    if (!0 === e.ctrlKey) {
        var t = e.pageX - this.scrollBar.getBoundingClientRect().left;
        e.deltaY < 0 ? this.updateZoom(1.03125 * this.zoom, t) : e.deltaY > 0 && this.updateZoom(this.zoom / 1.03125, t),
        e.preventDefault()
    } else {
        var i = e.shiftKey ? e.deltaY : e.deltaX;
        0 !== i && (this.scrollBar.scrollLeft += i,
        e.preventDefault())
    }
}
,
PZ.ui.timeline.keyframes = function(e, t) {
    this.timeline = e,
    this.properties = null,
    PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
    this.objects = null,
    this.objectsChanged_bound = this.objectsChanged.bind(this),
    this.onObjectsChanged.watch(e => {
        e && e.onListChanged.unwatch(this.objectsChanged_bound),
        this.objects ? this.objects.onListChanged.watch(this.objectsChanged_bound, !0) : this.objectsChanged()
    }
    ),
    this.propertyOps = new PZ.ui.properties(this.timeline.editor),
    this.options = {
        objectFilter: e => !0,
        objectMap: e => e
    },
    Object.assign(this.options, t),
    this.selectNewKeyframes = !1,
    this.create()
}
,
PZ.ui.timeline.keyframes.prototype.create = function() {
    var e = this.timeline;
    this.el = document.createElement("div"),
    this.el.style = "position: absolute; left: 0; right: 0; height: 60px; top: 35px;outline:0",
    this.el.setAttribute("tabindex", -1),
    this.el.onkeydown = this.keydown.bind(this),
    e.el.insertBefore(this.el, e.el.lastElementChild),
    this.resize = document.createElement("div"),
    this.resize.style = "width:100%;height:3px;position:absolute;top:95px;cursor:ns-resize;background-color:#222;",
    this.resize_drag = new PZ.ui.drag(this.resize,function(t) {
        this.startHeight = parseFloat(e.keyframes.el.style.height),
        this.startPt = t.pageY
    }
    ,function(e) {
        this.newHeight = this.startHeight + e.pageY - this.startPt
    }
    ,function() {
        var t = 20 * Math.max(Math.round(this.newHeight / 20), 1);
        e.keyframes.el.style.height = t + "px",
        e.keyframes.resize.style.top = t + 35 + "px",
        e.tracks.el.style.top = t + 3 + 35 + "px"
    }
    ),
    e.el.insertBefore(this.resize, e.el.lastElementChild),
    this.labels = document.createElement("div"),
    this.labels.style = "position: absolute;left: 0;top: 0px;width: 200px;height:100%;overflow: hidden;",
    this.el.appendChild(this.labels),
    this.container = document.createElement("div"),
    this.container.style = "position: absolute;top: 0px;right: 0;left: 200px;height: 100%;overflow: hidden;overflow-y: scroll;",
    this.container.pz_labels = this.labels,
    this.container.onscroll = function() {
        e.keyframes.labels.scrollTop = this.scrollTop
    }
    ,
    this.container_drag = new PZ.ui.drag(this.container,this.containerDragStart,this.containerDrag,this.containerDragUpdate,this.containerDragEnd,this),
    this.keyframe_drag = new PZ.ui.drag([],this.keyframeDragStart,this.keyframeDrag,this.keyframeDragUpdate,this.keyframeDragEnd,this),
    this.keyframe_drag.initialMove = !0,
    this.keyframe_drag.finalUpdate = !0,
    this.el.appendChild(this.container)
}
,
PZ.ui.timeline.keyframes.prototype.objectsChanged = function() {
    for (; this.container.children.length; ) {
        let e = this.container.children[0];
        e.pz_offsetChanged && this.timeline.sequence.ui.onClipMoved.unwatch(e.pz_offsetChanged),
        this.unloadKeyframeTrack(e)
    }
    if (this.objects)
        for (let e = 0; e < this.objects.length; e++) {
            let t = this.createKeyframeTrack(this.container, this.objects[e])
              , i = t.pz_object.tryGetParentOfType(PZ.clip);
            i && (t.pz_offset = i.start,
            t.pz_offsetChanged = this.objectOffsetChanged.bind(this, t, i),
            this.timeline.sequence.ui.onClipMoved.watch(t.pz_offsetChanged))
        }
}
,
PZ.ui.timeline.keyframes.prototype.createKeyframeTrack = function(e, t) {
    if (t instanceof PZ.property.static)
        return;
    let i = document.createElement("div");
    i.style = "height:20px;line-height:20px;color: #848484;font-size: 15px;box-sizing: border-box;padding: 0 5px;",
    i.style.display = "none",
    i.classList.add("noselect"),
    e.pz_labels.appendChild(i);
    let s = document.createElement("div");
    s.classList.add("kftrack"),
    s.style.display = "none",
    s.pz_label = i,
    s.pz_object = t;
    let n = Math.max(this.container.clientWidth, parseFloat(this.timeline.scrollBar.firstElementChild.style.width));
    s.style.width = n + "px",
    s.style.height = "20px",
    e.appendChild(s);
    let r = e => {
        i.innerText = e || t.properties.name.get(),
        i.title = i.innerText;
        let n = 40 * PZ.stringHash(i.innerText || "") % 360;
        s.pz_color = `hsl(${n}, 40%, 45%)`,
        s.pz_borderColor = `hsl(${n}, 40%, 60%)`,
        this.updateKeyframeColors(s)
    }
    ;
    t.properties && t.properties.name ? (i.pz_nameChanged = r,
    t.properties.name.onChanged.watch(i.pz_nameChanged, !0)) : r(t.definition ? t.definition.name : "Object"),
    t instanceof PZ.property.dynamic.keyframes && (s.pz_keyframeCreated = this.trackKeyframeCreated.bind(this, s),
    s.pz_keyframeDeleted = this.trackKeyframeDeleted.bind(this, s),
    s.pz_keyframeMoved = this.trackKeyframeMoved.bind(this, s),
    s.pz_animatedChanged = this.trackAnimatedChanged.bind(this, s, t),
    t.onKeyframeCreated.watch(s.pz_keyframeCreated),
    t.onKeyframeDeleted.watch(s.pz_keyframeDeleted),
    t.onKeyframeMoved.watch(s.pz_keyframeMoved),
    t.onAnimatedChanged.watch(s.pz_animatedChanged, !0));
    let a = t.children || [];
    (a = a.filter(e => e instanceof PZ.propertyList || e instanceof PZ.objectList && (e.type === PZ.property.dynamic || e.type === PZ.property) || e instanceof PZ.objectSingleton || e instanceof PZ.object)).reverse();
    for (let e = 0; e < a.length; e++)
        this.createTrackList(s, a[e]);
    return this.updateTrackColors(this.container),
    s
}
,
PZ.ui.timeline.keyframes.prototype.unloadKeyframeTrack = function(e) {
    for (; e.nextElementSibling && !e.nextElementSibling.classList.contains("kftrack"); )
        this.unloadTrackList(e.nextElementSibling);
    if (e.pz_object instanceof PZ.property.dynamic.keyframes)
        for (; e.children.length; )
            this.removeKeyframe(e, e.children[0].pz_object);
    e.pz_keyframeCreated && (e.pz_object.onKeyframeCreated.unwatch(e.pz_keyframeCreated),
    e.pz_object.onKeyframeDeleted.unwatch(e.pz_keyframeDeleted),
    e.pz_object.onKeyframeMoved.unwatch(e.pz_keyframeMoved),
    e.pz_object.onAnimatedChanged.unwatch(e.pz_animatedChanged)),
    e.pz_label.remove(),
    e.remove(),
    this.updateTrackColors(this.container)
}
,
PZ.ui.timeline.keyframes.prototype.createTrackList = function(e, t) {
    let i = document.createElement("div");
    i.style.display = "contents";
    let s = document.createElement("div");
    s.style.display = "contents",
    s.pz_labels = i,
    s.pz_parent = e,
    s.pz_object = t;
    let n = () => {
        for (; s.children.length; )
            this.unloadKeyframeTrack(s.children[0]);
        if (t instanceof PZ.object)
            this.createKeyframeTrack(s, t);
        else if (Array.isArray(t))
            for (let e = 0; e < t.length; e++)
                this.createKeyframeTrack(s, t[e]);
        else
            for (let e of t)
                this.createKeyframeTrack(s, e)
    }
    ;
    s.pz_object.onListChanged && (s.pz_listChanged = n,
    s.pz_object.onListChanged.watch(s.pz_listChanged)),
    n(),
    e.pz_label.parentElement.insertBefore(i, e.pz_label.nextElementSibling),
    e.parentElement.insertBefore(s, e.nextElementSibling)
}
,
PZ.ui.timeline.keyframes.prototype.unloadTrackList = function(e) {
    for (; e.children.length; )
        this.unloadKeyframeTrack(e.children[0]);
    e.pz_listChanged && e.pz_object.onListChanged.unwatch(e.pz_listChanged),
    e.pz_labels.remove(),
    e.remove()
}
,
PZ.ui.timeline.keyframes.prototype.objectOffsetChanged = function(e, t) {
    if (t.start !== e.pz_offset) {
        let i = t.start - e.pz_offset;
        e.pz_offset = t.start;
        let s = this.container.getElementsByClassName("keyframe");
        for (let e = 0; e < s.length; e++)
            s[e].pz_frame += i;
        this.zoom()
    }
}
,
PZ.ui.timeline.keyframes.prototype.trackKeyframeCreated = function(e, t) {
    this.addKeyframe(e, t)
}
,
PZ.ui.timeline.keyframes.prototype.trackKeyframeDeleted = function(e, t) {
    this.removeKeyframe(e, t)
}
,
PZ.ui.timeline.keyframes.prototype.trackKeyframeMoved = function(e, t, i) {
    "none" !== e.style.display && (this.removeKeyframe(e, i),
    this.addKeyframe(e, i))
}
,
PZ.ui.timeline.keyframes.prototype.trackAnimatedChanged = function(e, t) {
    if (t.animated && !t.expression)
        for (let i = 0; i < t.keyframes.length; i++)
            this.addKeyframe(e, t.keyframes[i]);
    else
        for (let i = 0; i < t.keyframes.length; i++)
            this.removeKeyframe(e, t.keyframes[i])
}
,
PZ.ui.timeline.keyframes.prototype.addKeyframe = function(e, t) {
    let i = e.firstElementChild
      , s = t instanceof PZ.keyframe ? t.absoluteFrame : t.pz_frame;
    for (; i && !(i.pz_frame >= s); )
        i = i.nextElementSibling;
    if (null === i || i.pz_frame !== s) {
        0 === e.children.length && (e.style.display = "",
        e.pz_label.style.display = "",
        this.updateTrackColors(this.container));
        let n = this.createKeyframe(!(t instanceof PZ.keyframe));
        n.pz_frame = s,
        n.style.left = this.timeline.frameToPx(s) + "px",
        e.insertBefore(n, i),
        this.keyframe_drag.addElts(n),
        this.updateKeyframeColor(n),
        i = n
    }
    this.selectNewKeyframes && i.classList.add("selected"),
    t instanceof PZ.keyframe ? i.pz_object = t : i.pz_children.push(t);
    let n = e.parentElement.pz_parent;
    return n && (i.pz_parent = this.addKeyframe(n, i)),
    i
}
,
PZ.ui.timeline.keyframes.prototype.removeKeyframe = function(e, t) {
    if (!t)
        return;
    let i = null;
    for (let s = 0; s < e.children.length; s++) {
        if ((i = e.children[s]).pz_object === t) {
            this.unloadKeyframe(i),
            i.remove(),
            0 === e.children.length && (e.style.display = "none",
            e.pz_label.style.display = "none",
            this.updateTrackColors(this.container));
            break
        }
        0
    }
    if (i)
        for (; i.pz_parent; ) {
            t = i,
            e = (i = i.pz_parent).parentElement;
            let s = i.pz_children.indexOf(t);
            0,
            i.pz_children.splice(s, 1),
            0 === i.pz_children.length && (this.unloadKeyframe(i),
            i.remove()),
            0 === e.children.length && (e.style.display = "none",
            e.pz_label.style.display = "none",
            this.updateTrackColors(this.container))
        }
}
,
PZ.ui.timeline.keyframes.prototype.createKeyframe = function(e) {
    let t = document.createElement("div");
    return t.classList.add("keyframe"),
    e || t.classList.add("kfobject"),
    t.pz_frame = 0,
    e ? t.pz_children = [] : t.pz_object = null,
    t
}
,
PZ.ui.timeline.keyframes.prototype.unloadKeyframe = function(e) {}
,
PZ.ui.timeline.keyframes.prototype.snap = function(e, t) {
    if (t) {
        var i = this.timeline.frameToPx(this.timeline.editor.playback.currentFrame);
        if (Math.abs(i - e) < 10)
            return this.timeline.editor.playback.currentFrame;
        let t = this.timeline.sequence.properties.markers.keyframes;
        for (var s = 0; s < t.length; s++) {
            let i = this.timeline.frameToPx(t[s].frame)
              , n = Math.abs(i - e);
            if (n < 10 && n > 0)
                return t[s].frame
        }
        let n = this.container.getElementsByClassName("kfobject");
        for (s = 0; s < n.length; s++) {
            if (n[s].classList.contains("selected"))
                continue;
            let t = parseFloat(n[s].style.left);
            if (Math.abs(t - e) < 10)
                return n[s].pz_object.frame + n[s].parentElement.pz_object.frameOffset
        }
    }
    return Math.round(this.timeline.pxToFrame(e))
}
,
PZ.ui.timeline.keyframes.prototype.keydown = async function(e) {
    if ("Delete" === e.key || "Del" === e.key || "Backspace" === e.key) {
        e.stopPropagation();
        var t = this.container.querySelectorAll(".kfobject.selected");
        this.timeline.editor.history.startOperation(),
        this.deleteKeyframes(t),
        this.timeline.editor.history.finishOperation()
    } else if ("ArrowLeft" === e.key || "ArrowRight" === e.key)
        e.ctrlKey;
    else if ("c" !== e.key && "x" !== e.key || !e.ctrlKey) {
        if ("v" === e.key && e.ctrlKey) {
            e.stopPropagation();
            let t = await navigator.clipboard.readText()
              , i = [];
            try {
                i = JSON.parse(t)
            } catch (e) {}
            for (let e = 0; e < i.length; e++) {
                if ("propertyList" !== i[e].baseType)
                    return;
                i[e].minFrame = Number.POSITIVE_INFINITY;
                let t = Object.keys(i[e].data);
                for (let s = 0; s < t.length; s++) {
                    let n = i[e].data[t[s]];
                    if (!n.length)
                        continue;
                    let r = n[0];
                    i[e].minFrame = Math.min(i[e].minFrame, r.frame)
                }
            }
            let s = this.timeline.editor.playback.currentFrame;
            this.timeline.editor.history.startOperation();
            let n = this.container.getElementsByClassName("kftrack");
            for (let e = 0; e < n.length; e++) {
                if (!(n[e].pz_object instanceof PZ.property.dynamic.keyframes) || "none" === n[e].style.display)
                    continue;
                let t = n[e].pz_object
                  , r = t.frameOffset;
                for (let e = 0; e < i.length; e++) {
                    let n = i[e].data
                      , a = s - i[e].minFrame - r
                      , o = n[t.definition.name];
                    o && (this.propertyOps.pasteKeyframes(t, o, a),
                    delete n[t.definition.name])
                }
            }
            this.timeline.editor.history.finishOperation()
        }
    } else {
        e.stopPropagation();
        let i = {}
          , s = this.container.getElementsByClassName("kftrack");
        for (let e = 0; e < s.length; e++) {
            let t = s[e]
              , n = Array.from(t.getElementsByClassName("kfobject selected"));
            n.length && (i[t.pz_object.definition.name] = n.map(e => e.pz_object))
        }
        let n = new PZ.package(i,"propertyList")
          , r = JSON.stringify([n]);
        if (navigator.clipboard.writeText(r),
        "x" === e.key) {
            t = this.container.querySelectorAll(".kfobject.selected");
            this.timeline.editor.history.startOperation(),
            this.deleteKeyframes(t),
            this.timeline.editor.history.finishOperation()
        }
    }
}
,
PZ.ui.timeline.keyframes.prototype.selectKeyframe = function(e, t) {
    if (t = t || 3,
    e.classList.add("selected"),
    e.pz_children && 1 & t)
        for (let t = 0; t < e.pz_children.length; t++)
            this.selectKeyframe(e.pz_children[t], 1);
    e.pz_parent && 2 & t && this.selectKeyframe(e.pz_parent, 2)
}
,
PZ.ui.timeline.keyframes.prototype.deselectKeyframe = function(e, t) {
    if (t = t || 3,
    e.classList.remove("selected"),
    e.pz_children && 1 & t)
        for (let t = 0; t < e.pz_children.length; t++)
            this.deselectKeyframe(e.pz_children[t], 1);
    e.pz_parent && 2 & t && this.deselectKeyframe(e.pz_parent, 2)
}
,
PZ.ui.timeline.keyframes.prototype.deselectAll = function() {
    for (var e = this.container.getElementsByClassName("selected"); e.length; )
        e[0].classList.remove("selected")
}
,
PZ.ui.timeline.keyframes.prototype.deleteKeyframes = function(e) {
    for (var t = 0; t < e.length; t++) {
        let i = e[t].parentElement.pz_object;
        if (1 === i.keyframes.length && !i.definition.allowEmpty)
            continue;
        let s = e[t].pz_object
          , n = {
            property: i.getAddress(),
            frame: s.frame
        };
        this.propertyOps.deleteKeyframe(n)
    }
}
,
PZ.ui.timeline.keyframes.prototype.updateKeyframeColor = function(e) {
    e.style.backgroundColor = e.parentElement.pz_color,
    e.style.border = "1px solid " + e.parentElement.pz_borderColor
}
,
PZ.ui.timeline.keyframes.prototype.updateKeyframeColors = function(e) {
    for (let t = 0; t < e.children.length; t++)
        this.updateKeyframeColor(e.children[t])
}
,
PZ.ui.timeline.keyframes.prototype.updateTrackColors = function(e, t) {
    const i = ["#343434", "#3f3f3f"]
      , s = ["#2e2e2e", "#3b3b3b"];
    t = t || 0;
    for (let n = 0; n < e.children.length; n++) {
        let r = e.children[n];
        "none" !== r.style.display && ("contents" === r.style.display ? t = this.updateTrackColors(r, t) : (r.style.backgroundColor = i[t],
        r.pz_label.style.backgroundColor = s[t],
        t = (t + 1) % i.length))
    }
    return t
}
,
PZ.ui.timeline.keyframes.prototype.zoom = function() {
    let e = this.container.getElementsByClassName("kftrack");
    for (var t = Math.max(this.container.clientWidth, parseFloat(this.timeline.scrollBar.firstElementChild.style.width)), i = 0; i < e.length; i++)
        e[i].style.width = t + "px";
    let s = this.container.getElementsByClassName("keyframe");
    for (let e = 0; e < s.length; e++) {
        let t = s[e].pz_frame
          , i = this.timeline.frameToPx(t);
        s[e].style.left = i + "px"
    }
}
,
PZ.ui.timeline.keyframes.prototype.update = function() {
    this.container.scrollLeft = this.timeline.scrollBar.scrollLeft
}
,
PZ.ui.timeline.keyframes.prototype.containerDragStart = function(e) {
    this.ctx.el.focus();
    var t = this.ctx.container
      , i = t.getBoundingClientRect();
    if (this.origin = {
        x: i.left,
        y: i.top
    },
    this.containerSize = {
        x: t.scrollWidth,
        y: t.scrollHeight
    },
    this.currentPt = {
        x: e.pageX - this.origin.x,
        y: e.pageY - this.origin.y
    },
    2 === e.button) {
        let t = this.ctx.timeline
          , i = this.currentPt.x + t.scroll;
        return t.setFrame(i),
        e.preventDefault(),
        !1
    }
    this.startPt = {
        x: (this.currentPt.x + t.scrollLeft) / this.ctx.timeline.zoom,
        y: this.currentPt.y + t.scrollTop
    },
    this.trackTops = new Map,
    this.kftracks = [];
    let s = (e, t) => {
        for (let i = 0; i < e.children.length; i++) {
            let n = e.children[i];
            "none" !== n.style.display && ("contents" === n.style.display ? t = s(n, t) : (this.trackTops.set(n, t),
            this.kftracks.push(n),
            n.pz_top = t,
            t += parseFloat(n.style.height)))
        }
        return t
    }
    ;
    s(t, 0),
    this.selectEl = document.createElement("div"),
    this.selectEl.style = "border: 1px dashed rgb(151, 151, 151);position:absolute;display:none;",
    this.ctx.container.appendChild(this.selectEl),
    this.moved = !1,
    this.addOnly = e.shiftKey
}
,
PZ.ui.timeline.keyframes.prototype.containerDrag = function(e) {
    this.currentPt.x = e.pageX - this.origin.x,
    this.currentPt.y = e.pageY - this.origin.y
}
,
PZ.ui.timeline.keyframes.prototype.containerDragUpdate = function() {
    var e = this.ctx.container
      , t = (this.currentPt.x + e.scrollLeft) / this.ctx.timeline.zoom
      , i = this.currentPt.y + e.scrollTop
      , s = Math.min(t, this.startPt.x) * this.ctx.timeline.zoom
      , n = Math.min(i, this.startPt.y)
      , r = Math.abs(t - this.startPt.x) * this.ctx.timeline.zoom
      , a = Math.abs(i - this.startPt.y);
    if (r + a > 2 && !1 === this.moved && (this.moved = !0,
    this.selectEl.style.display = ""),
    this.selectEl.style.left = s + "px",
    this.selectEl.style.top = n + "px",
    this.selectEl.style.width = r + "px",
    this.selectEl.style.height = a + "px",
    this.addOnly || this.ctx.deselectAll(),
    !1 !== this.moved) {
        var o = this.kftracks;
        for (let e = 0; e < o.length; e++) {
            let i = parseFloat(o[e].style.height);
            var l = o[e].pz_top;
            if (!(l + i < n || n + a < l))
                for (var h = 0; h < o[e].children.length; h++) {
                    var c = o[e].children[h];
                    s <= (t = parseFloat(c.style.left)) && t <= s + r && this.ctx.selectKeyframe(c)
                }
        }
    }
}
,
PZ.ui.timeline.keyframes.prototype.containerDragEnd = function(e) {
    this.selectEl.remove()
}
,
PZ.ui.timeline.keyframes.prototype.keyframeDragStart = function(e) {
    this.ctx.el.focus(),
    this.guideEl = document.createElement("div"),
    this.guideEl.style = "width:1px; background-color: #a6a6a6; opacity: 0.5; height:100%; position:absolute;",
    this.ctx.timeline.markermask.appendChild(this.guideEl);
    let t = this.ctx.container;
    var i = t.getBoundingClientRect();
    this.origin = {
        x: i.left,
        y: i.top
    },
    this.currentPt = {
        x: (e.pageX - this.origin.x) / this.ctx.timeline.zoom
    },
    this.kf = e.currentTarget,
    this.frameOffset = 0;
    let s = this.kf.parentElement.pz_object.tryGetParentOfType(PZ.clip);
    s && (this.frameOffset = s.start),
    this.startFrame = this.kf.pz_frame,
    this.lastFrame = this.startFrame,
    this.deltaFrames = 0,
    this.kf.classList.contains("selected") ? this.originalState = !0 : (this.originalState = !1,
    e.shiftKey || this.ctx.deselectAll(),
    this.ctx.selectKeyframe(this.kf)),
    this.offset = (parseFloat(this.kf.style.left) - t.scrollLeft) / this.ctx.timeline.zoom - this.currentPt.x,
    this.moved = !1,
    this.kftracks = Array.from(this.ctx.container.getElementsByClassName("kftrack")),
    this.kfproxies = [],
    this.kfobjects = [],
    e.stopPropagation(),
    this.ctx.timeline.editor.history.startOperation()
}
,
PZ.ui.timeline.keyframes.prototype.keyframeDrag = function(e) {
    this.currentPt.x = e.pageX - this.origin.x,
    this.snap = !e.shiftKey,
    this.altKey = e.altKey
}
,
PZ.ui.timeline.keyframes.prototype.keyframeDragUpdate = function() {
    var e = this.ctx.container
      , t = (this.currentPt.x + e.scrollLeft) / this.ctx.timeline.zoom + this.offset;
    this.ctx.timeline.keepInView(t * this.ctx.timeline.zoom);
    var i = this.ctx.snap(t * this.ctx.timeline.zoom, this.snap);
    this.guideEl.style.left = this.ctx.timeline.frameToPx(i) - e.scrollLeft + "px",
    this.deltaFrames = i - this.lastFrame,
    this.lastFrame = i,
    0 !== this.deltaFrames && !1 === this.moved && (this.moved = !0,
    this.clone = this.altKey,
    this.ctx.initProxies.call(this, this.clone),
    this.clone || this.ctx.startMoving(this.kftracks));
    for (let e = 0; e < this.kfobjects.length; e++) {
        let t = this.kfobjects[e];
        t.pz_object.frame = Math.round(t.pz_object.frame + this.deltaFrames)
    }
    for (let e = 0; e < this.kfproxies.length; e++) {
        let t = this.kfproxies[e]
          , i = this.ctx.timeline.frameToPx(t.pz_object.frame + this.frameOffset);
        t.style.left = i + "px"
    }
}
,
PZ.ui.timeline.keyframes.prototype.keyframeDragEnd = function(e, t) {
    if (this.guideEl.parentElement.removeChild(this.guideEl),
    e.shiftKey && !1 === this.moved && !0 === this.originalState && this.ctx.deselectKeyframe(this.kf),
    !0 === this.moved) {
        let e = this.lastFrame - this.startFrame > 0;
        this.ctx.selectNewKeyframes = !0,
        this.clone ? this.ctx.cloneKeyframes(this.kfobjects) : this.ctx.finishMoving(this.kftracks, e),
        this.ctx.selectNewKeyframes = !1,
        this.ctx.unloadProxies.call(this)
    }
    this.ctx.timeline.editor.history.finishOperation()
}
,
PZ.ui.timeline.keyframes.prototype.cloneKeyframes = function(e) {
    for (var t = 0; t < e.length; t++) {
        let i = e[t].parentElement.pz_object
          , s = i.getAddress()
          , n = JSON.parse(JSON.stringify(e[t].pz_object));
        i.hasKeyframe(n.frame) && this.propertyOps.deleteKeyframe({
            property: s,
            frame: n.frame
        }),
        this.propertyOps.createKeyframe({
            property: s,
            data: n
        })
    }
}
,
PZ.ui.timeline.keyframes.prototype.initProxies = function(e) {
    let t = (e, i, s) => {
        let n = document.createElement("div");
        n.classList.add("keyframe", "selected", "kfproxy"),
        n.pz_object = i,
        s || (n.classList.add("kfobject"),
        n.pz_oldFrame = i.frame,
        this.kfobjects.push(n)),
        e.parentElement.pz_parent && t(e.parentElement.pz_parent, i, !0),
        this.kfproxies.push(n),
        e.appendChild(n),
        this.ctx.updateKeyframeColor(n)
    }
      , i = Array.from(this.ctx.container.getElementsByClassName("kfobject selected"));
    for (let s = 0; s < i.length; s++) {
        let n = i[s].pz_object
          , r = i[s].parentElement;
        e && (n = JSON.parse(JSON.stringify(n))),
        t(r, n),
        this.ctx.deselectKeyframe(i[s]),
        e || this.ctx.removeKeyframe(r, n)
    }
}
,
PZ.ui.timeline.keyframes.prototype.unloadProxies = function() {
    for (let e = 0; e < this.kfproxies.length; e++)
        this.kfproxies[e].remove()
}
,
PZ.ui.timeline.keyframes.prototype.startMoving = function(e) {
    for (let t = 0; t < e.length; t++) {
        let i = e[t].pz_object
          , s = e[t].getElementsByClassName("kfproxy kfobject");
        if (!s.length)
            continue;
        let n = this.propertyOps.startMove(i, s.length);
        e[t].pz_paramList = n
    }
}
,
PZ.ui.timeline.keyframes.prototype.finishMoving = function(e, t) {
    for (let i = 0; i < e.length; i++) {
        let s = e[i].pz_paramList;
        if (!s)
            continue;
        delete e[i].pz_paramList;
        let n = e[i].pz_object
          , r = Array.from(e[i].querySelectorAll(".kfobject.kfproxy"));
        t && r.reverse();
        let a = new Map;
        for (let e = 0; e < r.length; e++) {
            let t = r[e].pz_oldFrame
              , i = r[e].pz_object.frame;
            s[e].oldFrame = i,
            s[e].newFrame = t,
            a.set(s[e], r[e].pz_object)
        }
        let o = new Set(r.map(e => e.pz_object));
        this.propertyOps.finishMove(n, o, s, a)
    }
}
,
PZ.ui.timeline.tracks = function(e) {
    this.timeline = e,
    this.selection = new PZ.objectList,
    this.videoTrackSize = 40,
    this.audioTrackSize = 40,
    this.create(),
    this.sequence = null,
    this.timeline.editor.onSequenceChanged.watch(this.sequenceChanged.bind(this), !0),
    this.mediaDragCtx = null,
    this.initialResize = !1,
    this.zoomUpdateRef = null
}
,
PZ.ui.timeline.tracks.prototype.sequenceChanged = function() {
    this.deselectClips(),
    this.selectClips();
    let e = this.timeline.editor.sequence;
    this.sequence = e,
    this.redraw(),
    e && (e.ui.onClipCreated.watch(this.clipCreated.bind(this)),
    e.ui.onClipDeleted.watch(this.clipDeleted.bind(this)),
    e.ui.onClipMoved.watch(this.clipMoved.bind(this)),
    e.ui.onTrackCreated.watch(this.trackCreated.bind(this)),
    e.ui.onTrackDeleted.watch(this.trackDeleted.bind(this)))
}
,
PZ.ui.timeline.tracks.prototype.create = function() {
    var e = this.timeline;
    this.el = document.createElement("div"),
    this.el.style = "position: absolute; top: 98px; bottom:0; left: 0; right: 0;outline:0;",
    this.el.setAttribute("tabindex", "-1"),
    this.el.onkeydown = this.keydown.bind(this),
    this.el.ondragenter = this.mediaDragEnter.bind(this),
    this.el.ondragleave = this.mediaDragLeave.bind(this),
    this.el.ondragover = this.mediaDragOver.bind(this),
    this.el.ondrop = this.mediaDrop.bind(this),
    e.el.insertBefore(this.el, e.el.lastElementChild),
    this.labels = document.createElement("div"),
    this.labels.style = "position: absolute;left: 0;top: 0;width: 200px;bottom:0;overflow: hidden;",
    this.el.appendChild(this.labels),
    this.container = document.createElement("div"),
    this.container.style = "position:absolute;top:0;bottom:0;right:0;left:200px;overflow-x:hidden;overflow-y:hidden;";
    var t = this.mouseWheel.bind(this);
    this.videoLabels = document.createElement("div"),
    this.videoLabels.style = "box-sizing: border-box; top: 0; left: 0; position: absolute; width: 200px; overflow-y: hidden;",
    this.videoLabels.addEventListener("wheel", t),
    this.labels.appendChild(this.videoLabels),
    this.audioLabels = document.createElement("div"),
    this.audioLabels.style = "box-sizing: border-box; bottom: 0; left: 0; position: absolute; width: 200px; overflow-y: hidden;",
    this.audioLabels.addEventListener("wheel", t),
    this.labels.appendChild(this.audioLabels),
    this.videoContainer = document.createElement("div"),
    this.videoContainer.style = "overflow-y: scroll; overflow-x: hidden; left: 0; right: 0; top: 0; position: absolute;",
    this.videoContainer.scrollBottom = 0,
    this.videoContainer.onscroll = function(t) {
        e.tracks.videoLabels.scrollTop = this.scrollTop,
        this.scrollBottom = this.totalHeight - this.boundHeight - this.scrollTop
    }
    ,
    this.videoContainer.addEventListener("wheel", t),
    this.container.appendChild(this.videoContainer),
    this.audioContainer = document.createElement("div"),
    this.audioContainer.style = "overflow-y: scroll; overflow-x: hidden; left: 0; right: 0; bottom: 0; position: absolute;",
    this.audioContainer.onscroll = function() {
        e.tracks.audioLabels.scrollTop = this.scrollTop
    }
    ,
    this.audioContainer.addEventListener("wheel", t),
    this.container.appendChild(this.audioContainer),
    this.waveformContainer = document.createElement("canvas"),
    this.waveformContainer.style = "left: 0; position: absolute; pointer-events: none;",
    this.container.appendChild(this.waveformContainer),
    this.waveform = new PZ.ui.waveform(this.timeline,this.waveformContainer),
    this.container_drag = new PZ.ui.drag(this.container,this.containerDragStart,this.containerDrag,this.containerDragUpdate,this.containerDragEnd,this),
    this.clip_drag = new PZ.ui.drag([],this.clipDragStart,this.clipDrag,this.clipDragUpdate,this.clipDragEnd,this),
    this.clip_drag.initialMove = !0,
    this.clip_drag.finalUpdate = !0,
    this.handle_drag = new PZ.ui.drag([],this.handleDragStart,this.handleDrag,this.handleDragUpdate,this.handleDragEnd,this),
    this.handle_drag.initialMove = !0,
    this.handle_drag.finalUpdate = !0,
    this.el.appendChild(this.container),
    this.resize = document.createElement("div"),
    this.resize.style = "width:100%;height:4px;position:absolute;cursor:ns-resize; box-sizing:border-box; border-bottom: 1px solid rgb(33, 33, 33); border-top: 1px solid rgb(33, 33, 33);",
    this.resize_drag = new PZ.ui.drag(this.resize,function(t) {
        this.maxHeight = e.tracks.el.clientHeight - 4,
        this.startHeight = parseFloat(e.tracks.videoContainer.style.height),
        this.startPt = t.pageY
    }
    ,function(e) {
        this.newHeight = this.startHeight + e.pageY - this.startPt
    }
    ,function() {
        var t = Math.min(Math.max(this.newHeight, 0), this.maxHeight);
        e.tracks.setContainerSplit(t),
        e.tracks.verticalZoom()
    }
    ,function() {}
    ),
    this.resize_drag.initialMove = !0,
    this.resize_drag.finalUpdate = !0,
    this.el.appendChild(this.resize)
}
,
PZ.ui.timeline.tracks.prototype.mouseWheel = function(e) {
    var t, i = this;
    if (e.ctrlKey) {
        if (0 !== (t = e.shiftKey ? 0 : e.deltaY))
            if (e.currentTarget === i.videoLabels) {
                i.videoTrackSize = t < 0 ? Math.min(100, i.videoTrackSize + 5) : Math.max(20, i.videoTrackSize - 5);
                for (var s = 0; s < i.videoContainer.children.length; s++)
                    i.videoContainer.children[s].style.height = i.videoTrackSize + "px",
                    i.videoLabels.children[s].style.height = i.videoTrackSize + "px";
                i.verticalZoom(),
                e.preventDefault(),
                e.stopPropagation()
            } else if (e.currentTarget === i.audioLabels) {
                i.audioTrackSize = t < 0 ? Math.min(100, i.audioTrackSize + 5) : Math.max(20, i.audioTrackSize - 5);
                for (s = 0; s < i.audioContainer.children.length; s++)
                    i.audioContainer.children[s].style.height = i.audioTrackSize + "px",
                    i.audioLabels.children[s].style.height = i.audioTrackSize + "px";
                i.verticalZoom(),
                e.preventDefault(),
                e.stopPropagation()
            }
    } else
        0 !== (t = e.shiftKey ? 0 : e.deltaY) && (e.currentTarget === i.videoLabels || e.currentTarget === i.videoContainer ? i.videoContainer.scrollTop += Math.sign(t) * i.videoTrackSize * .5 : e.currentTarget !== i.audioLabels && e.currentTarget !== i.audioContainer || (i.audioContainer.scrollTop += Math.sign(t) * i.audioTrackSize * .5),
        e.preventDefault(),
        e.stopPropagation())
}
,
PZ.ui.timeline.tracks.prototype.redraw = function() {
    this.videoLabels.innerHTML = "",
    this.audioLabels.innerHTML = "",
    this.videoContainer.innerHTML = "",
    this.audioContainer.innerHTML = "";
    let e = this.sequence;
    if (e) {
        for (var t = 0; t < e.videoTracks.length; t++) {
            var i = e.videoTracks[t]
              , s = this.createTrackLabel(i, 0, t);
            this.videoLabels.appendChild(s);
            for (var n = this.createTrackElement(i, 0), r = 0; r < i.clips.length; r++) {
                var a = this.createClipElement(i.clips[r]);
                n.appendChild(a)
            }
            this.videoContainer.appendChild(n)
        }
        for (t = 0; t < e.audioTracks.length; t++) {
            i = e.audioTracks[t],
            s = this.createTrackLabel(i, 1, t);
            this.audioLabels.appendChild(s);
            for (n = this.createTrackElement(i, 1),
            r = 0; r < i.clips.length; r++) {
                a = this.createClipElement(i.clips[r]);
                n.appendChild(a)
            }
            this.audioContainer.appendChild(n)
        }
        var o = this.container.querySelectorAll(".clip");
        this.clip_drag.addElts(o);
        var l = this.container.querySelectorAll(".clip > .handle");
        this.handle_drag.addElts(l),
        this.zoom(),
        this.verticalZoom()
    }
}
,
PZ.ui.timeline.tracks.prototype.createClipElement = function(e) {
    var t = document.createElement("div");
    t.classList.add("clip"),
    t.pz_object = e,
    this.clip_drag.addElts(t),
    t.oncontextmenu = this.clipContextMenu.bind(this);
    var i = document.createElement("div");
    i.style = "position: absolute; left:3px; top:0px; color: #2c323f;white-space: nowrap;",
    t.pz_renamed = ( () => {
        i.innerText = e.properties.name.get(),
        t.title = i.innerText
    }
    ),
    e.properties.name.onChanged.watch(t.pz_renamed, !0),
    t.appendChild(i);
    var s = document.createElement("div");
    s.classList.add("handle"),
    s.style = "left:0;border-left-width:3px",
    t.appendChild(s);
    var n = document.createElement("div");
    return n.classList.add("handle"),
    n.style = "right:0;border-right-width:3px",
    t.appendChild(n),
    this.handle_drag.addElts(s),
    this.handle_drag.addElts(n),
    t
}
,
PZ.ui.timeline.tracks.prototype.createTrackElement = function(e, t) {
    var i = document.createElement("div");
    return i.style = "position:absolute; background-color: rgb(39, 39, 39); box-sizing: border-box;",
    i.pz_object = e,
    0 === t ? (i.style.borderTop = "1px solid rgb(33, 33, 33)",
    i.style.height = this.videoTrackSize + "px") : (i.style.borderBottom = "1px solid rgb(33, 33, 33)",
    i.style.height = this.audioTrackSize + "px"),
    i
}
,
PZ.ui.timeline.tracks.prototype.createTrackLabel = function(e, t, i) {
    let s = document.createElement("div");
    s.style = "display: grid; grid-template-columns: 1fr auto auto;align-items:center;color: #848484;font-size: 15px;box-sizing: border-box;padding: 0px 5px; position:absolute; width:100%; background-color: rgb(43, 43, 43); border-right: 1px solid rgb(33, 33, 33);";
    let n = document.createElement("span");
    if (n.classList.add("noselect"),
    n.style = "vertical-align: top",
    s.appendChild(n),
    0 === t) {
        s.style.borderTop = "1px solid rgb(33, 33, 33)",
        s.style.height = this.videoTrackSize + "px";
        let t = document.createElement("button");
        t.title = e.enabled ? "disable track" : "enable track",
        t.style = "width: 16px;height: 16px;vertical-align:inherit;",
        t.classList.add("actionbutton");
        let i = PZ.ui.generateIcon("visible");
        i.style = "width: 16px;height: 16px;",
        i.style.fill = e.enabled ? "#ccc" : "#8a2828",
        t.appendChild(i),
        t.onclick = ( () => {
            e.enabled = !e.enabled,
            t.title = e.enabled ? "disable track" : "enable track",
            i.style.fill = e.enabled ? "#ccc" : "#8a2828"
        }
        ),
        s.appendChild(t)
    } else
        s.style.borderBottom = "1px solid rgb(33, 33, 33)",
        s.style.height = this.audioTrackSize + "px";
    let r = document.createElement("button");
    r.title = "delete track",
    r.style = "width: 16px;height: 16px;vertical-align:inherit;",
    r.classList.add("actionbutton");
    let a = PZ.ui.generateIcon("remove");
    return a.style = "width: 16px;height: 16px;fill: #ccc;",
    r.appendChild(a),
    r.onclick = ( () => {
        let i = {
            type: t,
            oldTrackIdx: e.getAddress().pop()
        };
        this.timeline.editor.history.startOperation();
        for (let t = e.clips.length - 1; t >= 0; t--)
            this.deleteClip({
                type: i.type,
                oldTrackIdx: i.oldTrackIdx,
                oldIdx: t
            });
        this.deleteTrack(i),
        this.timeline.editor.history.finishOperation()
    }
    ),
    s.appendChild(r),
    s
}
,
PZ.ui.timeline.tracks.prototype.createClipProxy = function() {}
,
PZ.ui.timeline.tracks.prototype.snap = function(e, t) {
    var i = 15
      , s = e;
    function n(t) {
        var n = Math.abs(t - e);
        n < i && (i = n,
        s = t)
    }
    let r = this.sequence;
    if (t) {
        n(0),
        n(this.timeline.frameToPx(this.timeline.editor.playback.currentFrame));
        let e = r.properties.markers.keyframes;
        for (var a = 0; a < e.length; a++) {
            n(this.timeline.frameToPx(e[a].frame))
        }
        for (a = 0; a < r.videoTracks.length; a++)
            for (var o = r.videoTracks[a], l = 0; l < o.clips.length; l++) {
                var h = o.clips[l];
                n(this.timeline.frameToPx(h.start)),
                n(this.timeline.frameToPx(h.start + h.length))
            }
        for (a = 0; a < r.audioTracks.length; a++)
            for (o = r.audioTracks[a],
            l = 0; l < o.clips.length; l++) {
                h = o.clips[l];
                n(this.timeline.frameToPx(h.start)),
                n(this.timeline.frameToPx(h.start + h.length))
            }
    }
    return Math.round(this.timeline.pxToFrame(s))
}
,
PZ.ui.timeline.tracks.prototype.keydown = async function(e) {
    if ("Delete" === e.key || "Del" === e.key || "Backspace" === e.key) {
        e.stopPropagation();
        var t = this.container.querySelectorAll(".clip.selected");
        this.timeline.editor.history.startOperation(),
        this.deleteClips(t),
        this.timeline.editor.history.finishOperation(),
        this.selectClips(),
        this.zoom()
    } else if ("c" !== e.key && "x" !== e.key || !e.ctrlKey) {
        if ("v" === e.key && e.ctrlKey) {
            e.stopPropagation();
            let t = await navigator.clipboard.readText()
              , s = [];
            try {
                s = JSON.parse(t)
            } catch (e) {}
            let n = this.timeline.editor.playback.currentFrame
              , {track_proxies: r, clip_proxies: a} = this.createProxiesFromFragments(s, n);
            if (!r.length)
                return;
            for (var i = 0; i < a.length; i++) {
                let e = a[i];
                (0 === e.pz_type ? this.videoContainer : this.audioContainer).children[e.pz_trackOffset].appendChild(e)
            }
            for (i = 0; i < a.length; i++) {
                let e = a[i]
                  , t = this.timeline.frameToPx(e.pz_start);
                e.style.left = t + "px";
                let s = this.timeline.frameToPx(e.pz_length);
                e.style.width = s + "px"
            }
            this.timeline.editor.history.startOperation(),
            this.insertTrackProxies(r),
            this.moveClipProxies(a, !0, !1),
            this.timeline.editor.history.finishOperation();
            for (i = 0; i < a.length; i++)
                a[i].remove();
            this.verticalZoom(),
            this.timeline.updateZoom()
        } else if ("c" === e.key) {
            e.stopPropagation();
            t = this.container.querySelectorAll(".clip.selected");
            this.timeline.editor.history.startOperation(),
            this.splitClips(t),
            this.timeline.editor.history.finishOperation(),
            this.selectClips(),
            this.zoom()
        } else if ("u" === e.key) {
            e.stopPropagation();
            t = this.container.querySelectorAll(".clip.selected");
            this.timeline.editor.history.startOperation(),
            this.unlinkClips(t),
            this.timeline.editor.history.finishOperation()
        } else if ("l" === e.key) {
            e.stopPropagation();
            t = this.container.querySelectorAll(".clip.selected");
            this.timeline.editor.history.startOperation(),
            this.linkClips(t),
            this.timeline.editor.history.finishOperation()
        }
    } else {
        e.stopPropagation();
        let i = [];
        for (let e = 0; e < this.videoContainer.children.length; e++) {
            let t = Array.from(this.videoContainer.children[e].getElementsByClassName("selected"));
            if (!t.length)
                continue;
            let s = new PZ.track.video;
            s.clips = s.children[0] = new PZ.objectList,
            s.clips.push(...t.map(e => e.pz_object)),
            i.push(s)
        }
        for (let e = 0; e < this.audioContainer.children.length; e++) {
            let t = Array.from(this.audioContainer.children[e].getElementsByClassName("selected"));
            if (!t.length)
                continue;
            let s = new PZ.track.audio;
            s.clips = s.children[0] = new PZ.objectList,
            s.clips.push(...t.map(e => e.pz_object)),
            i.push(s)
        }
        let s = new PZ.package(i,"track")
          , n = JSON.stringify([s]);
        if (navigator.clipboard.writeText(n),
        "x" === e.key) {
            var t = this.container.querySelectorAll(".clip.selected");
            this.timeline.editor.history.startOperation(),
            this.deleteClips(t),
            this.timeline.editor.history.finishOperation(),
            this.selectClips(),
            this.zoom()
        }
    }
}
,
PZ.ui.timeline.tracks.prototype.setContainerSplit = function(e) {
    this.resize.style.top = e + "px",
    this.videoLabels.style.height = e + "px",
    this.audioLabels.style.top = e + 4 + "px",
    this.videoContainer.style.height = e + "px",
    this.audioContainer.style.top = e + 4 + "px",
    this.waveformContainer.style.top = e + 4 + "px"
}
,
PZ.ui.timeline.tracks.prototype.verticalZoom = function() {
    if (!this.initialResize && this.el.clientHeight > 0) {
        let e = this.el.getBoundingClientRect()
          , t = this.videoTrackSize / (this.videoTrackSize + this.audioTrackSize);
        this.setContainerSplit(e.height * t - 2),
        this.initialResize = !0
    }
    var e = this.videoContainer
      , t = this.videoLabels;
    let i = e.getBoundingClientRect();
    for (var s = i.height, n = 0, r = 0; r < e.children.length; r++) {
        var a = e.children[r];
        n += parseFloat(a.style.height)
    }
    n = Math.max(n, s),
    e.totalHeight = n,
    e.boundHeight = i.height;
    let o = Math.max(0, Math.min(e.scrollBottom, n - s))
      , l = n - s - o
      , h = window.devicePixelRatio;
    l = Math.round(l * h) / h;
    for (r = 0; r < e.children.length; r++) {
        a = e.children[r];
        var c = t.children[r];
        n -= parseFloat(a.style.height),
        a.style.top = n + "px",
        c && (c.style.top = n + "px",
        c.children[0].innerText = "V" + (r + 1))
    }
    e.scrollBottom = o,
    e.scrollTop = l,
    e = this.audioContainer,
    t = this.audioLabels,
    n = 0;
    for (r = 0; r < e.children.length; r++) {
        a = e.children[r],
        c = t.children[r];
        a.style.top = n + "px",
        c && (c.style.top = n + "px",
        c.children[0].innerText = "A" + (r + 1)),
        n += parseFloat(a.style.height)
    }
    this.waveformContainer.width = this.audioContainer.clientWidth,
    this.waveformContainer.height = this.audioContainer.clientHeight
}
,
PZ.ui.timeline.tracks.prototype.zoom = function() {
    for (var e = Math.max(this.videoContainer.clientWidth, this.timeline.frameToPx(this.timeline.editor.playback.totalFrames)), t = this.videoContainer.children, i = 0; i < t.length; i++) {
        this.resizeTrack(t[i], e);
        for (var s = 0; s < t[i].children.length; s++)
            this.resizeClip(t[i].children[s])
    }
    for (t = this.audioContainer.children,
    i = 0; i < t.length; i++) {
        this.resizeTrack(t[i], e);
        for (s = 0; s < t[i].children.length; s++)
            this.resizeClip(t[i].children[s])
    }
}
,
PZ.ui.timeline.tracks.prototype.resizeTrack = function(e, t) {
    t = t || Math.max(this.videoContainer.clientWidth, this.timeline.frameToPx(this.timeline.editor.playback.totalFrames)),
    e.style.width = t + "px"
}
,
PZ.ui.timeline.tracks.prototype.resizeClip = function(e) {
    var t = e.pz_object;
    e.style.left = this.timeline.frameToPx(t.start) + "px",
    e.style.width = this.timeline.frameToPx(t.length) + "px";
    var i = Math.min(50, .2 * parseFloat(e.style.width)) + "px"
      , s = e.getElementsByClassName("handle");
    s.length > 0 && (s[0].style.width = i,
    s[1].style.width = i)
}
,
PZ.ui.timeline.tracks.prototype.selectClips = function() {
    let e = this.container.getElementsByClassName("clip selected");
    e = Array.from(e).map(e => e.pz_object),
    this.selection.splice(0, this.selection.length, ...e)
}
,
PZ.ui.timeline.tracks.prototype.deselectClips = function() {
    for (var e = this.container.getElementsByClassName("clip selected"); e.length; )
        e[0].classList.remove("selected")
}
,
PZ.ui.timeline.tracks.prototype.deselectHandles = function() {
    for (var e = this.container.getElementsByClassName("handle selected"); e.length; )
        e[0].classList.remove("selected")
}
,
PZ.ui.timeline.tracks.prototype.insertTrackProxies = function(e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t]
          , s = i.parentElement === this.videoContainer ? 0 : 1
          , n = Array.prototype.indexOf.call(i.parentElement.children, i);
        if (i.remove(),
        i.children.length > 0) {
            var r = {
                type: s,
                newTrackIdx: n,
                data: null
            };
            this.createTrack(r);
            for (var a = (0 === s ? this.videoContainer : this.audioContainer).children[r.newTrackIdx]; i.firstElementChild; )
                a.appendChild(i.firstElementChild)
        }
    }
}
,
PZ.ui.timeline.tracks.prototype.moveClipProxies = function(e, t, i) {
    i && e.reverse();
    let s = new Map;
    for (var n = 0; n < e.length; n++) {
        for (var r = e[n], a = Math.round(this.timeline.pxToFrame(parseFloat(r.style.left))), o = Math.round(this.timeline.pxToFrame(parseFloat(r.style.width))), l = r.parentElement, h = Array.prototype.indexOf.call(l.parentElement.children, l), c = l.parentElement === this.videoContainer ? 0 : 1, p = 0, d = 0; d < l.children.length; d++) {
            if ((y = l.children[d]) !== r.pz_clip || t) {
                if (y.classList.contains("proxy"))
                    break;
                if (a <= y.pz_object.start)
                    break
            } else
                p = -1
        }
        if (d += p,
        r.type = c,
        r.trackIdx = h,
        r.idx = d,
        t) {
            var u = {
                type: c,
                newTrackIdx: h,
                newIdx: d,
                start: a,
                length: o,
                data: r.pz_object
            };
            if (this.createClip(u),
            this.linkAfterCreation(u, s),
            i)
                for (let t = 0; t < n; t++)
                    e[t].trackIdx.type === c && e[t].trackIdx === h && e[t].idx++
        } else {
            var m = r.pz_clip
              , f = m.parentElement;
            u = {
                type: c,
                oldTrackIdx: Array.prototype.indexOf.call(f.parentElement.children, f),
                oldIdx: Array.prototype.indexOf.call(f.children, m),
                newTrackIdx: h,
                newIdx: d,
                start: a,
                length: o,
                offset: r.pz_offset,
                scale: r.pz_scale,
                timeStart: r.pz_timeStart,
                timeEnd: r.pz_timeEnd
            };
            this.moveClip(u)
        }
    }
    i && e.reverse();
    for (p = [[], []],
    n = 0; n < e.length; n++) {
        r = e[n],
        a = Math.round(this.timeline.pxToFrame(parseFloat(r.style.left))),
        o = Math.round(this.timeline.pxToFrame(parseFloat(r.style.width))),
        l = r.parentElement;
        var y, g = r.trackIdx, b = (c = r.type,
        r.idx + (p[c][g] || 0));
        if (b > 0 && (y = l.pz_object.clips[b - 1]).start + y.length > a) {
            u = {
                type: c,
                oldTrackIdx: g,
                oldIdx: b - 1,
                length: a - y.start
            };
            if (y.properties.time.animated || (u.timeEnd = y.properties.time.get(u.length)),
            y.start + y.length > a + o) {
                let e = {
                    type: c,
                    newTrackIdx: g,
                    newIdx: ++b,
                    start: a + o,
                    length: y.start + y.length - (a + o),
                    offset: a + o - y.start,
                    data: y
                };
                p[c][g] = 1 + (0 | p[c][g]),
                this.createClip(e);
                let t = {
                    type: e.type,
                    oldTrackIdx: e.newTrackIdx,
                    oldIdx: e.newIdx,
                    start: e.start,
                    length: e.length,
                    offset: e.offset
                };
                this.moveClip(t),
                this.linkAfterCreation(e, s)
            }
            y.start < a ? this.moveClip(u) : (p[c][g] = (0 | p[c][g]) - 1,
            this.unlinkBeforeDeletion(u),
            this.deleteClip(u))
        }
        for (; y = l.pz_object.clips[++b]; )
            if (y.start + y.length <= a + o) {
                u = {
                    type: c,
                    oldTrackIdx: g,
                    oldIdx: b--
                };
                p[c][g] = (p[c][g] || 0) - 1,
                this.unlinkBeforeDeletion(u),
                this.deleteClip(u)
            } else {
                if (!(y.start < a + o))
                    break;
                {
                    let e = {
                        type: c,
                        oldTrackIdx: g,
                        oldIdx: b,
                        start: a + o,
                        length: y.start + y.length - (a + o),
                        offset: a + o - y.start
                    };
                    this.moveClip(e)
                }
            }
    }
}
,
PZ.ui.timeline.tracks.prototype.deleteClips = function(e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t]
          , s = i.parentElement
          , n = {
            type: s.parentElement === this.videoContainer ? 0 : 1,
            oldTrackIdx: Array.prototype.indexOf.call(s.parentElement.children, s),
            oldIdx: Array.prototype.indexOf.call(i.parentElement.children, i)
        };
        this.unlinkBeforeDeletion(n),
        this.deleteClip(n)
    }
}
,
PZ.ui.timeline.tracks.prototype.splitClips = function(e) {
    for (var t = new Map, i = 0; i < e.length; i++) {
        var s = e[i]
          , n = s.parentElement
          , r = n.parentElement === this.videoContainer ? 0 : 1
          , a = Array.prototype.indexOf.call(n.parentElement.children, n)
          , o = Array.prototype.indexOf.call(s.parentElement.children, s)
          , l = this.timeline.editor.playback.currentFrame - s.pz_object.start;
        if (!(l < 0 || l >= s.pz_object.length)) {
            var h = {
                type: r,
                oldTrackIdx: a,
                oldIdx: o,
                length: l
            }
              , c = {
                type: r,
                oldTrackIdx: a,
                newTrackIdx: a,
                newIdx: o + 1,
                oldIdx: o + 1,
                start: s.pz_object.start + l,
                length: s.pz_object.length - l,
                offset: -l,
                data: s.pz_object
            };
            if (!s.pz_object.properties.time.animated) {
                let e = s.pz_object.properties.time.get(h.length);
                h.timeEnd = e,
                c.timeStart = e
            }
            this.createClip(c),
            this.moveClip(c),
            this.moveClip(h),
            this.linkAfterCreation(c, t)
        }
    }
}
,
PZ.ui.timeline.tracks.prototype.linkClips = function(e) {
    if (!(e.length <= 1))
        for (var t = this.sequence.clipLinks.generateKey(), i = 0; i < e.length; i++) {
            var s = e[i].pz_object
              , n = {
                clip: s.getAddress(),
                link: t
            };
            null !== s.link && this.unlinkClip(n),
            this.linkClip(n)
        }
}
,
PZ.ui.timeline.tracks.prototype.linkAfterCreation = function(e, t) {
    var i = [0, e.type + 1, e.newTrackIdx, 0, e.newIdx]
      , s = e.data.link;
    if (void 0 !== s && null !== s) {
        t.has(s) || t.set(s, this.sequence.clipLinks.generateKey());
        var n = {
            clip: i,
            link: t.get(s)
        };
        this.linkClip(n)
    }
}
,
PZ.ui.timeline.tracks.prototype.unlinkClips = function(e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t].pz_object;
        if (null !== i.link) {
            var s = {
                clip: i.getAddress()
            };
            let e = i.link.key;
            this.unlinkClip(s),
            this.cleanUpLink(e)
        }
    }
}
,
PZ.ui.timeline.tracks.prototype.unlinkBeforeDeletion = function(e) {
    var t = [0, e.type + 1, e.oldTrackIdx, 0, e.oldIdx]
      , i = this.sequence.addressLookup(t, 1);
    if (void 0 === i.link || null === i.link)
        return;
    let s = i.link.key;
    this.unlinkClip({
        clip: t
    }),
    this.cleanUpLink(s)
}
,
PZ.ui.timeline.tracks.prototype.updateSequenceLength = function() {
    for (var e = this.sequence, t = 0, i = 0; i < e.videoTracks.length; i++) {
        (n = (s = e.videoTracks[i]).clips[s.clips.length - 1]) && (t = Math.max(t, n.start + n.length))
    }
    for (i = 0; i < e.audioTracks.length; i++) {
        var s, n;
        (n = (s = e.audioTracks[i]).clips[s.clips.length - 1]) && (t = Math.max(t, n.start + n.length))
    }
    e.length = t
}
,
PZ.ui.timeline.tracks.prototype.update = function() {
    var e = this.timeline.scrollBar.scrollLeft;
    this.videoContainer.scrollLeft = e,
    this.audioContainer.scrollLeft = e,
    this.waveform.render()
}
,
PZ.ui.timeline.tracks.prototype.addressToEl = function(e) {
    var t, i, s = 2;
    for (1 === e[1] ? t = this.videoContainer : 2 === e[1] && (t = this.audioContainer); void 0 !== (i = e[s]); )
        t = t.children[i],
        s += 2;
    return t
}
,
PZ.ui.timeline.tracks.prototype.containerDragStart = function(e) {
    this.ctx.el.focus();
    var t = this.ctx.container
      , i = t.getBoundingClientRect();
    if (this.origin = {
        x: i.left,
        y: i.top
    },
    this.containerSize = {
        x: t.scrollWidth,
        y: t.scrollHeight
    },
    this.currentPt = {
        x: e.pageX - this.origin.x,
        y: e.pageY - this.origin.y
    },
    2 === e.button) {
        let t = this.ctx.timeline
          , i = this.currentPt.x + t.scroll;
        return t.setFrame(i),
        e.preventDefault(),
        !1
    }
    var s = this.ctx.timeline.scrollBar.scrollLeft;
    this.startPt = {
        x: (this.currentPt.x + s) / this.ctx.timeline.zoom,
        y: this.currentPt.y
    },
    this.selectEl = document.createElement("div"),
    this.selectEl.style = "border: 1px dashed rgb(151, 151, 151);position:absolute; display:none;",
    t.appendChild(this.selectEl),
    this.ctx.deselectHandles(),
    this.moved = !1,
    this.addOnly = e.shiftKey,
    this.altHeld = e.altKey
}
,
PZ.ui.timeline.tracks.prototype.containerDrag = function(e) {
    this.ctx.container;
    this.currentPt.x = e.pageX - this.origin.x,
    this.currentPt.y = e.pageY - this.origin.y
}
,
PZ.ui.timeline.tracks.prototype.containerDragUpdate = function() {
    var e = this.ctx.timeline.scrollBar.scrollLeft
      , t = (this.currentPt.x + e) / this.ctx.timeline.zoom
      , i = this.currentPt.y
      , s = Math.min(t, this.startPt.x) * this.ctx.timeline.zoom
      , n = Math.min(i, this.startPt.y)
      , r = Math.abs(t - this.startPt.x) * this.ctx.timeline.zoom
      , a = Math.abs(i - this.startPt.y);
    function o(e) {
        for (var t = e.children, i = parseFloat(e.style.top) - e.scrollTop, o = 0; o < t.length; o++) {
            var l = i + parseFloat(t[o].style.top);
            if (!(l + parseFloat(t[o].style.height) < n || n + a < l))
                for (var h = 0; h < t[o].children.length; h++) {
                    var c = t[o].children[h]
                      , p = parseFloat(c.style.left)
                      , d = parseFloat(c.style.left) + parseFloat(c.style.width);
                    if (s <= d && p <= s + r) {
                        if (c.classList.contains("selected"))
                            continue;
                        if (!this.altHeld && c.pz_object.link)
                            for (var u = c.pz_object.link, m = 0; m < u.clips.length; m++)
                                this.ctx.addressToEl(u.clips[m].getAddress()).classList.add("selected");
                        else
                            c.classList.add("selected")
                    }
                }
        }
    }
    r + a > 2 && !1 === this.moved && (this.moved = !0,
    this.selectEl.style.display = ""),
    this.selectEl.style.left = s - e + "px",
    this.selectEl.style.top = n + "px",
    this.selectEl.style.width = r + "px",
    this.selectEl.style.height = a + "px",
    this.addOnly || this.ctx.deselectClips(),
    !1 !== this.moved && (o.call(this, this.ctx.videoContainer),
    o.call(this, this.ctx.audioContainer))
}
,
PZ.ui.timeline.tracks.prototype.containerDragEnd = function(e) {
    this.selectEl.remove(),
    this.ctx.selectClips(),
    this.ctx.zoom()
}
,
PZ.ui.timeline.tracks.prototype.createTrack = function(e) {
    var t = this.timeline.sequence
      , i = 0 === e.type ? t.videoTracks : t.audioTracks;
    let s = PZ.track.create(e.type);
    i.splice(e.newTrackIdx, 0, s),
    s.load(e.data),
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.deleteTrack.bind(this), {
        type: e.type,
        oldTrackIdx: e.newTrackIdx
    }),
    t.ui.onTrackCreated.update(e)
}
,
PZ.ui.timeline.tracks.prototype.trackCreated = function(e) {
    var t, i, s, n = this.timeline.sequence;
    0 === e.type ? (t = this.videoContainer,
    i = this.videoLabels,
    s = n.videoTracks) : (t = this.audioContainer,
    i = this.audioLabels,
    s = n.audioTracks);
    var r = s[e.newTrackIdx]
      , a = this.createTrackElement(r, e.type)
      , o = this.createTrackLabel(r, e.type, e.newTrackIdx);
    t.insertBefore(a, t.children[e.newTrackIdx]),
    i.insertBefore(o, i.children[e.newTrackIdx]),
    this.verticalZoom(),
    this.zoom()
}
,
PZ.ui.timeline.tracks.prototype.deleteTrack = function(e) {
    var t = this.timeline.sequence
      , i = (0 === e.type ? t.videoTracks : t.audioTracks).splice(e.oldTrackIdx, 1)[0];
    i.unload(),
    this.updateSequenceLength(),
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.createTrack.bind(this), {
        type: e.type,
        newTrackIdx: e.oldTrackIdx,
        data: i.toJSON()
    }),
    t.ui.onTrackDeleted.update(e)
}
,
PZ.ui.timeline.tracks.prototype.trackDeleted = function(e) {
    var t, i;
    0 === e.type ? (t = this.videoContainer,
    i = this.videoLabels) : (t = this.audioContainer,
    i = this.audioLabels);
    var s = t.children[e.oldTrackIdx]
      , n = i.children[e.oldTrackIdx];
    s.remove(),
    n.remove(),
    this.verticalZoom(),
    this.zoom()
}
,
PZ.ui.timeline.tracks.prototype.clipDragStart = function(e) {
    if (e.ctrlKey)
        return !1;
    this.ctx.el.focus();
    var t = this.ctx.container.getBoundingClientRect();
    if (this.origin = {
        x: t.left,
        y: t.top
    },
    this.currentPt = {
        x: (e.pageX - this.origin.x) / this.ctx.timeline.zoom
    },
    this.clip = e.currentTarget,
    this.clip.classList.contains("selected"))
        this.originalState = !0;
    else {
        this.originalState = !1,
        e.shiftKey || this.ctx.deselectHandles();
        let t = new Map
          , n = this.ctx.container.getElementsByClassName("clip selected");
        for (let i = 0; i < n.length; i++)
            t.set(n[i], {
                newState: e.shiftKey ? 1 : 0,
                idx: i
            });
        if (!e.altKey && this.clip.pz_object.link)
            for (var i = this.clip.pz_object.link, s = 0; s < i.clips.length; s++) {
                let e = this.ctx.addressToEl(i.clips[s].getAddress());
                e.classList.contains("selected") ? t.get(e).newState = 1 : (e.classList.add("selected"),
                t.set(e, {
                    newState: 2
                }))
            }
        else
            this.clip.classList.contains("selected") ? t.get(this.clip).newState = 1 : (this.clip.classList.add("selected"),
            t.set(this.clip, {
                newState: 2
            }));
        n = Array.from(this.ctx.container.getElementsByClassName("clip selected"));
        let r = 0;
        for (let e = 0; e < n.length; e++) {
            let i = t.get(n[e]);
            0 === i.newState ? (this.ctx.selection.splice(i.idx + r, 1),
            n[e].classList.remove("selected"),
            r -= 1) : 2 === i.newState && (this.ctx.selection.splice(e + r, 0, n[e].pz_object),
            r += 1)
        }
    }
    var n = this.clip.parentElement
      , r = Array.prototype.indexOf.call(n.parentElement.children, n);
    function a(e) {
        var t = document.createElement("div");
        t.classList.add("clip"),
        t.classList.add("proxy"),
        t.pz_clip = e,
        t.pz_object = e.pz_object,
        t.pz_type = 0,
        t.pz_start = e.pz_object.start,
        t.pz_length = e.pz_object.length,
        t.pz_offset = e.pz_object.offset;
        var i = document.createElement("div");
        return i.style = "position: absolute; left:3px; top:0px; color: #2c323f; white-space: nowrap;",
        i.innerText = e.innerText,
        t.appendChild(i),
        t.style.border = "1px solid black",
        t.style.opacity = "0.5",
        t.style.zIndex = "9999",
        t
    }
    function o(e, t) {
        for (var i, s = e.children.length, n = 0; n < s; n++) {
            var r = e.children[n].getElementsByClassName("clip selected");
            if (0 !== r.length) {
                var o = (i = void 0,
                (i = document.createElement("div")).style = "height:40px; position:absolute; box-sizing: border-box;",
                i);
                e.appendChild(o),
                this.track_proxies.push(o);
                for (var l = 0; l < r.length; l++) {
                    this.minFrame = Math.min(this.minFrame, r[l].pz_object.start),
                    this.minTrackOffset = Math.min(this.minTrackOffset, n - t),
                    this.maxTrackOffset = Math.max(this.maxTrackOffset, n - t);
                    var h = a(r[l]);
                    h.pz_trackOffset = n - t,
                    h.pz_type = e === this.ctx.videoContainer ? 0 : 1,
                    h.style.display = "none",
                    r[l].parentElement.appendChild(h),
                    this.clip_proxies.push(h)
                }
            }
        }
    }
    n.parentElement === this.ctx.videoContainer ? (this.videoTrackIndex = r,
    this.audioTrackIndex = 0) : (this.videoTrackIndex = 0,
    this.audioTrackIndex = r),
    this.createOnly = !1,
    this.minFrame = Number.MAX_SAFE_INTEGER,
    this.minTrackOffset = 0,
    this.maxTrackOffset = 0,
    this.matchTrackIndices = !1,
    this.track_proxies = [],
    this.clip_proxies = [],
    o.call(this, this.ctx.videoContainer, this.videoTrackIndex),
    o.call(this, this.ctx.audioContainer, this.audioTrackIndex),
    this.ctx.zoom(),
    this.ctx.verticalZoom(),
    this.offset = (parseFloat(this.clip.style.left) - this.ctx.timeline.scrollBar.scrollLeft) / this.ctx.timeline.zoom - this.currentPt.x,
    this.start = this.clip.pz_object.start,
    this.moved = !1,
    e.stopPropagation()
}
,
PZ.ui.timeline.tracks.prototype.clipDrag = function(e) {
    this.currentPt.x = e.pageX - this.origin.x,
    this.currentPt.y = e.pageY - this.origin.y,
    this.snap = !e.shiftKey
}
,
PZ.ui.timeline.tracks.prototype.clipDragUpdate = function() {
    var e = this.ctx.container
      , t = (this.currentPt.x + this.ctx.timeline.scrollBar.scrollLeft) / this.ctx.timeline.zoom;
    this.ctx.timeline.keepInView(t * this.ctx.timeline.zoom),
    t += this.offset;
    var i = this.ctx.snap(t * this.ctx.timeline.zoom, this.snap);
    this.deltaFrames = i - this.start,
    this.deltaFrames = Math.max(this.deltaFrames, -this.minFrame);
    var s = !1
      , n = function(e, t) {
        var i;
        for (e += (t = this.ctx.videoContainer).scrollTop,
        i = 1; i < t.children.length; i++) {
            var s = t.children[i];
            if (e > parseFloat(s.style.top) + parseFloat(s.style.height))
                break
        }
        return i - 1
    }
    .call(this, this.currentPt.y)
      , r = function(e, t) {
        var i;
        for (t = this.ctx.audioContainer,
        e -= parseFloat(t.style.top),
        e += t.scrollTop,
        i = 1; i < t.children.length; i++) {
            var s = t.children[i];
            if (e < parseFloat(s.style.top))
                break
        }
        return i - 1
    }
    .call(this, this.currentPt.y);
    if (this.videoTrackIndex !== n || this.audioTrackIndex !== r) {
        if (s = !0,
        this.matchTrackIndices) {
            var a = Math.max(n, r);
            this.videoTrackIndex = a,
            this.audioTrackIndex = a
        } else
            this.videoTrackIndex = n,
            this.audioTrackIndex = r;
        var o = this.ctx.videoContainer
          , l = this.ctx.audioContainer;
        this.videoTrackIndex = Math.max(-this.minTrackOffset, Math.min(this.videoTrackIndex, o.children.length - this.maxTrackOffset - 1)),
        this.audioTrackIndex = Math.max(-this.minTrackOffset, Math.min(this.audioTrackIndex, l.children.length - this.maxTrackOffset - 1))
    }
    if ((0 !== this.deltaFrames || !1 !== s) && !1 === this.moved) {
        this.moved = !0;
        for (var h = 0; h < this.clip_proxies.length; h++)
            this.clip_proxies[h].style.display = ""
    }
    if (!1 !== this.moved) {
        for (h = 0; h < this.clip_proxies.length; h++) {
            var c;
            0 === (d = this.clip_proxies[h]).pz_type ? (e = this.ctx.videoContainer,
            c = this.videoTrackIndex) : (e = this.ctx.audioContainer,
            c = this.audioTrackIndex);
            var p = d.pz_trackOffset + c;
            d.remove(),
            e.children[p].appendChild(d)
        }
        for (h = 0; h < this.clip_proxies.length; h++) {
            var d, u = (d = this.clip_proxies[h]).pz_start + this.deltaFrames, m = this.ctx.timeline.frameToPx(u);
            d.style.left = m + "px";
            var f = d.pz_length
              , y = this.ctx.timeline.frameToPx(f);
            d.style.width = y + "px"
        }
    }
}
,
PZ.ui.timeline.tracks.prototype.clipDragEnd = function(e) {
    if (e.shiftKey && !1 === this.moved && !0 === this.originalState) {
        let s = new Map
          , n = this.ctx.container.getElementsByClassName("clip selected");
        for (let t = 0; t < n.length; t++)
            s.set(n[t], {
                newState: e.shiftKey ? 1 : 0,
                idx: t
            });
        if (!e.altKey && this.clip.pz_object.link)
            for (var t = this.clip.pz_object.link, i = 0; i < t.clips.length; i++) {
                let e = this.ctx.addressToEl(t.clips[i].getAddress());
                e.classList.contains("selected") && (s.get(e).newState = 0)
            }
        else
            this.clip.classList.contains("selected") && (s.get(this.clip).newState = 0);
        n = Array.from(this.ctx.container.getElementsByClassName("clip selected"));
        let r = 0;
        for (let e = 0; e < n.length; e++) {
            let t = s.get(n[e]);
            0 === t.newState ? (this.ctx.selection.splice(t.idx + r, 1),
            n[e].classList.remove("selected"),
            r -= 1) : 2 === t.newState && (this.ctx.selection.splice(e + r, 0, n[e].pz_object),
            r += 1)
        }
    }
    this.ctx.timeline.editor.history.startOperation(),
    this.ctx.insertTrackProxies(this.track_proxies),
    this.moved && (e.ctrlKey ? e.altKey && this.ctx.insertClipProxies(this.clip_proxies) : this.ctx.moveClipProxies(this.clip_proxies, this.createOnly || e.altKey, this.deltaFrames > 0)),
    this.ctx.timeline.editor.history.finishOperation();
    for (i = 0; i < this.clip_proxies.length; i++)
        this.clip_proxies[i].remove();
    this.ctx.verticalZoom(),
    this.ctx.timeline.updateZoom()
}
,
PZ.ui.timeline.tracks.prototype.clipContextMenu = function(e) {
    let t = e.currentTarget;
    if (t.classList.contains("pz-listitem-edit"))
        return;
    var i = t.children[0];
    let s = t.pz_object.properties.name
      , n = s.get();
    var r = document.createElement("input");
    t.classList.add("pz-listitem-edit");
    let a = () => {
        var e = r.value;
        if (r.remove(),
        i.style.display = "",
        t.classList.remove("pz-listitem-edit"),
        e !== n) {
            let t = new PZ.ui.properties(this.timeline.editor);
            this.timeline.editor.history.startOperation(),
            t.setValue({
                property: s.getAddress(),
                value: e,
                oldValue: n
            }),
            this.timeline.editor.history.finishOperation()
        }
    }
    ;
    r.onmousedown = r.onclick = r.ontouchstart = function(e) {
        e.stopPropagation()
    }
    ,
    r.onkeydown = function(e) {
        "Enter" === e.key ? (this.blur(),
        e.preventDefault()) : "Escape" === e.key && (this.value = n,
        this.blur(),
        e.preventDefault()),
        e.stopPropagation()
    }
    ,
    r.onblur = function(e) {
        a()
    }
    ,
    i.style.display = "none",
    r.value = n,
    t.appendChild(r),
    r.focus(),
    e.preventDefault(),
    e.stopPropagation()
}
,
PZ.ui.timeline.tracks.prototype.moveClip = function(e) {
    void 0 === e.newTrackIdx && (e.newTrackIdx = e.oldTrackIdx),
    void 0 === e.newIdx && (e.newIdx = e.oldIdx);
    var t, i, s, n, r = this.timeline.sequence, a = 0 === e.type ? r.videoTracks : r.audioTracks, o = a[e.oldTrackIdx], l = a[e.newTrackIdx];
    if (e.oldTrackIdx !== e.newTrackIdx || e.oldIdx !== e.newIdx) {
        var h = o.clips.splice(e.oldIdx, 1)[0];
        l.clips.splice(e.newIdx, 0, h)
    }
    var c = l.clips[e.newIdx];
    if (void 0 !== e.start && (t = c.start,
    c.start = e.start),
    void 0 !== e.length && (i = c.length,
    c.length = e.length,
    c.properties.time.animated || (c.properties.time.keyframes[1].frame = c.length)),
    void 0 !== e.offset && 0 !== e.offset) {
        if (c.forEachItemOfType(PZ.property.dynamic.keyframes, t => t.shiftKeyframes(e.offset)),
        !c.properties.time.animated) {
            if (void 0 === e.timeStart) {
                0;
                let t = c.getParentOfType(PZ.sequence).properties.rate.get();
                e.timeStart = c.properties.time.keyframes[0].value,
                e.timeStart -= e.offset / t
            }
            c.properties.time.keyframes[0].frame = 0,
            c.properties.time.keyframes[1].frame = c.length
        }
        e.offset = -e.offset
    }
    void 0 !== e.scale && 1 !== e.scale && (c.forEachItemOfType(PZ.property.dynamic.keyframes, t => t.scaleKeyframes(e.scale)),
    c.properties.time.animated || (c.properties.time.keyframes[0].frame = 0,
    c.properties.time.keyframes[1].frame = c.length),
    e.scale = 1 / e.scale),
    void 0 !== e.timeStart && (s = c.properties.time.keyframes[0].value,
    c.properties.time.keyframes[0].value = e.timeStart),
    void 0 !== e.timeEnd && (n = c.properties.time.keyframes[1].value,
    c.properties.time.keyframes[1].value = e.timeEnd),
    e.newIdx + 1 === l.clips.length && this.updateSequenceLength(),
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.moveClip.bind(this), {
        type: e.type,
        oldTrackIdx: e.newTrackIdx,
        oldIdx: e.newIdx,
        newTrackIdx: e.oldTrackIdx,
        newIdx: e.oldIdx,
        start: t,
        length: i,
        offset: e.offset,
        scale: e.scale,
        timeStart: s,
        timeEnd: n
    }),
    r.ui.onClipMoved.update(e),
    PZ.schedule.analyzeSequence(r)
}
,
PZ.ui.timeline.tracks.prototype.clipMoved = function(e) {
    var t = 0 === e.type ? this.videoContainer : this.audioContainer
      , i = t.children[e.oldTrackIdx].children[e.oldIdx];
    if (e.oldTrackIdx !== e.newTrackIdx || e.oldIdx !== e.newIdx) {
        var s = t.children[e.newTrackIdx];
        i.remove(),
        s.insertBefore(i, s.children[e.newIdx])
    }
    this.resizeClip(i)
}
,
PZ.ui.timeline.tracks.prototype.createClip = function(e) {
    var t = this.timeline.sequence
      , i = (0 === e.type ? t.videoTracks : t.audioTracks)[e.newTrackIdx]
      , s = PZ.clip.create(e.type, e.data.object ? e.data.object.type : 0);
    i.clips.splice(e.newIdx, 0, s),
    s.loading = s.load(e.data),
    s.start = e.start,
    s.length = e.length,
    e.newIdx + 1 === i.clips.length && this.updateSequenceLength(),
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.deleteClip.bind(this), {
        type: e.type,
        oldTrackIdx: e.newTrackIdx,
        oldIdx: e.newIdx
    }),
    t.ui.onClipCreated.update(e),
    PZ.schedule.analyzeSequence(t)
}
,
PZ.ui.timeline.tracks.prototype.clipCreated = function(e) {
    var t = this.timeline.sequence
      , i = (0 === e.type ? t.videoTracks : t.audioTracks)[e.newTrackIdx].clips[e.newIdx]
      , s = (0 === e.type ? this.videoContainer : this.audioContainer).children[e.newTrackIdx]
      , n = this.createClipElement(i);
    s.insertBefore(n, s.children[e.newIdx]),
    this.resizeClip(n)
}
,
PZ.ui.timeline.tracks.prototype.deleteClip = function(e) {
    var t = this.timeline.sequence
      , i = (0 === e.type ? t.videoTracks : t.audioTracks)[e.oldTrackIdx];
    let s = i.clips[e.oldIdx];
    s.unload(),
    i.clips.splice(e.oldIdx, 1),
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.createClip.bind(this), {
        type: e.type,
        newTrackIdx: e.oldTrackIdx,
        newIdx: e.oldIdx,
        start: s.start,
        length: s.length,
        data: JSON.parse(JSON.stringify(s))
    }),
    e.oldIdx === i.clips.length && this.updateSequenceLength(),
    t.ui.onClipDeleted.update(e),
    PZ.schedule.analyzeSequence(t)
}
,
PZ.ui.timeline.tracks.prototype.clipDeleted = function(e) {
    (0 === e.type ? this.videoContainer : this.audioContainer).children[e.oldTrackIdx].children[e.oldIdx].remove()
}
,
PZ.ui.timeline.tracks.prototype.linkClip = function(e) {
    var t = this.timeline.sequence
      , i = t.addressLookup(e.clip, 1);
    i.link = t.clipLinks.link(e.link, i),
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.unlinkClip.bind(this), {
        clip: e.clip
    })
}
,
PZ.ui.timeline.tracks.prototype.unlinkClip = function(e) {
    var t = this.timeline.sequence
      , i = t.addressLookup(e.clip, 1)
      , s = i.link.key;
    t.clipLinks.unlink(s, i),
    i.link = null,
    this.timeline.editor.history.pushCommand(PZ.ui.timeline.tracks.prototype.linkClip.bind(this), {
        clip: e.clip,
        link: s
    })
}
,
PZ.ui.timeline.tracks.prototype.cleanUpLink = function(e) {
    let t = this.timeline.sequence.clipLinks.links[e];
    t && 1 === t.clips.length && this.unlinkClip({
        clip: t.clips[0].getAddress()
    })
}
,
PZ.ui.timeline.tracks.prototype.handleDragStart = function(e) {
    this.ctx.el.focus();
    var t = this.ctx.container.getBoundingClientRect();
    if (this.origin = {
        x: t.left,
        y: t.top
    },
    this.currentPt = {
        x: (e.pageX - this.origin.x) / this.ctx.timeline.zoom
    },
    this.clip = e.currentTarget.parentElement,
    this.handle = e.currentTarget,
    this.isRightHandle = 0 === parseFloat(this.handle.style.right),
    this.handle.classList.contains("selected"))
        this.originalState = !0;
    else if (this.originalState = !1,
    e.shiftKey || (this.ctx.deselectClips(),
    this.ctx.deselectHandles()),
    !e.altKey && this.clip.pz_object.link)
        for (var i = this.clip.pz_object.link, s = this.isRightHandle ? 2 : 1, n = 0; n < i.clips.length; n++) {
            (o = this.ctx.addressToEl(i.clips[n].getAddress())).children[s].classList.add("selected")
        }
    else
        this.handle.classList.add("selected");
    this.rate = this.ctx.timeline.sequence.properties.rate.get(),
    this.adjustTime = !e.ctrlKey && !this.clip.pz_object.properties.time.animated,
    this.rateStretch = e.ctrlKey;
    var r = this.ctx.container.getElementsByClassName("handle selected");
    this.selected_handles = [],
    this.clip_proxies = [];
    for (n = 0; n < r.length; n++) {
        var a = r[n]
          , o = a.parentElement
          , l = 0 === parseFloat(a.style.right)
          , h = o.getElementsByClassName("handle selected")
          , c = h[0] === a ? h[1] : h[0];
        if (l || !c) {
            var p = document.createElement("div");
            p.classList.add("clip"),
            p.classList.add("proxy"),
            p.pz_clip = o,
            p.pz_object = o.pz_object,
            p.style.left = o.style.left,
            p.style.width = o.style.width,
            p.style.border = "2px solid black",
            p.style.opacity = "0.5",
            p.style.cursor = "ew-resize",
            p.style.display = "none",
            p.style.padding = "0",
            p.style.zIndex = "9999",
            p.pz_start = o.pz_object.start,
            p.pz_length = o.pz_object.length,
            p.pz_offset = 0,
            this.adjustTime ? (p.pz_timeStart = o.pz_object.properties.time.keyframes[0].value,
            p.pz_timeEnd = o.pz_object.properties.time.keyframes[1].value) : p.pz_scale = 1,
            o.parentElement.appendChild(p),
            this.clip_proxies.push(p);
            var d = {};
            if (d.proxy = p,
            d.handle = a,
            d.isRightHandle = l,
            this.selected_handles.push(d),
            c) {
                var u = {};
                u.proxy = p,
                u.handle = c,
                u.isRightHandle = !1,
                this.selected_handles.push(u)
            }
            p.leftHandle = !l || !!c,
            p.rightHandle = l
        }
    }
    var m = parseFloat(this.clip.style.left);
    this.isRightHandle && (m += parseFloat(this.clip.style.width)),
    this.offset = (m - this.ctx.timeline.scrollBar.scrollLeft) / this.ctx.timeline.zoom - this.currentPt.x,
    this.moved = !1,
    this.lastFrame = null,
    e.stopPropagation()
}
,
PZ.ui.timeline.tracks.prototype.handleDrag = function(e) {
    this.currentPt.x = e.pageX - this.origin.x,
    this.snap = !e.shiftKey
}
,
PZ.ui.timeline.tracks.prototype.handleDragUpdate = function() {
    var e = (this.currentPt.x + this.ctx.timeline.scrollBar.scrollLeft) / this.ctx.timeline.zoom;
    e += this.offset,
    this.ctx.timeline.keepInView(e * this.ctx.timeline.zoom);
    var t, i = this.ctx.snap(e * this.ctx.timeline.zoom, this.snap);
    if (0 !== (t = this.isRightHandle ? i - this.clip.pz_object.start - this.clip.pz_object.length : i - this.clip.pz_object.start) && !1 === this.moved) {
        this.moved = !0;
        for (var s = 0; s < this.clip_proxies.length; s++)
            this.clip_proxies[s].style.display = ""
    }
    if (!1 !== this.moved) {
        var n = t;
        for (s = 0; s < this.clip_proxies.length; s++) {
            var r = this.clip_proxies[s]
              , a = 0
              , o = 0;
            if (this.adjustTime) {
                if (r.leftHandle) {
                    let e = r.pz_object.properties.time.keyframes[0].value * this.rate;
                    a = n = Math.max(n, -e, -r.pz_object.start)
                }
                if (r.rightHandle) {
                    let e = r.pz_object.properties.time.keyframes[1].value * this.rate;
                    o = n = Math.min(n, r.pz_object.mediaLength - e)
                }
            } else
                r.leftHandle && (a = n = Math.max(n, -r.pz_object.start)),
                r.rightHandle && (o = n);
            n = Math.min(n, r.pz_object.length + o - 1),
            n = Math.max(n, -r.pz_object.length + a + 1)
        }
        for (s = 0; s < this.clip_proxies.length; s++) {
            (r = this.clip_proxies[s]).pz_start = r.pz_object.start,
            r.pz_length = r.pz_object.length,
            r.leftHandle && (r.pz_start += n,
            r.pz_length -= n,
            this.adjustTime && (r.pz_offset = -n,
            r.pz_timeStart = r.pz_object.properties.time.keyframes[0].value,
            r.pz_timeStart += n / this.rate)),
            r.rightHandle && (r.pz_length += n,
            this.adjustTime && (r.pz_timeEnd = r.pz_object.properties.time.keyframes[1].value,
            r.pz_timeEnd += n / this.rate)),
            this.rateStretch && (r.pz_scale = r.pz_length / r.pz_object.length);
            var l = this.ctx.timeline.frameToPx(r.pz_start)
              , h = this.ctx.timeline.frameToPx(r.pz_length);
            r.style.left = l + "px",
            r.style.width = h + "px"
        }
    }
}
,
PZ.ui.timeline.tracks.prototype.handleDragEnd = function(e) {
    if (e.shiftKey && !1 === this.moved && !0 === this.originalState)
        if (!e.altKey && this.clip.pz_object.link)
            for (var t = this.clip.pz_object.link, i = this.isRightHandle ? 2 : 1, s = 0; s < t.clips.length; s++) {
                this.ctx.addressToEl(t.clips[s].getAddress()).children[i].classList.remove("selected")
            }
        else
            this.handle.classList.remove("selected");
    this.ctx.timeline.editor.history.startOperation(),
    this.moved && this.ctx.moveClipProxies(this.clip_proxies),
    this.ctx.timeline.editor.history.finishOperation();
    for (s = 0; s < this.clip_proxies.length; s++)
        this.clip_proxies[s].remove();
    this.ctx.selectClips(),
    this.ctx.zoom()
}
,
PZ.ui.timeline.tracks.prototype.mediaDragOver = function(e) {
    e.preventDefault(),
    this.mediaDragCtx ? (e.dataTransfer.dropEffect = "copy",
    this.clip_drag.move.call(this.mediaDragCtx, e)) : e.dataTransfer.dropEffect = "none"
}
,
PZ.ui.timeline.tracks.prototype.createProxiesFromFragments = function(e, t) {
    let i = {
        track_proxies: [],
        clip_proxies: [],
        maxTrackOffset: 0
    };
    Number.POSITIVE_INFINITY;
    for (let t = 0; t < e.length; t++) {
        if ("track" !== e[t].baseType)
            return i;
        e[t].minFrame = Number.POSITIVE_INFINITY,
        e[t].maxFrame = 0;
        let n = e[t].data;
        for (var s = 0; s < n.length; s++) {
            let i = n[s].clips;
            if (!i.length)
                continue;
            let r = i[0];
            e[t].minFrame = Math.min(e[t].minFrame, r.start);
            let a = i[i.length - 1];
            e[t].maxFrame = Math.max(e[t].maxFrame, a.start + a.length)
        }
    }
    function n(e) {
        var t = document.createElement("div");
        t.classList.add("clip"),
        t.classList.add("proxy"),
        t.pz_object = e;
        var i = document.createElement("div");
        return i.style = "position: absolute; left:3px; top:0px; color: #1c2e55; white-space: nowrap;",
        i.innerText = e.properties.name || "Clip",
        t.appendChild(i),
        t.style.border = "1px solid black",
        t.style.opacity = "0.5",
        t.style.zIndex = "9999",
        t
    }
    function r() {
        var e = document.createElement("div");
        return e.style = "height:40px; position:absolute; box-sizing: border-box;",
        e
    }
    let a = 0
      , o = 0;
    for (var l = 0; l < e.length; l++) {
        let r = e[l].data
          , c = t - e[l].minFrame
          , p = e[l].maxFrame - e[l].minFrame
          , d = 0
          , u = 0;
        for (s = 0; s < r.length; s++) {
            let e = r[s];
            0 === e.type && (i.maxTrackOffset = Math.max(i.maxTrackOffset, d));
            for (var h = 0; h < e.clips.length; h++) {
                let t = e.clips[h]
                  , s = n(t);
                s.pz_trackOffset = 0 === e.type ? d : u,
                s.pz_start = t.start + c,
                s.pz_length = t.length,
                s.pz_offset = t.offset,
                s.pz_type = e.type,
                s.pz_object = t,
                s.style.display = "none",
                i.clip_proxies.push(s)
            }
            0 === e.type ? d++ : u++
        }
        a = Math.max(a, d),
        o = Math.max(o, u),
        t += p
    }
    for (l = 0; l < a; l++) {
        var c = r();
        this.timeline.tracks.videoContainer.appendChild(c),
        i.track_proxies.push(c)
    }
    for (l = 0; l < o; l++) {
        c = r();
        this.timeline.tracks.audioContainer.appendChild(c),
        i.track_proxies.push(c)
    }
    return i
}
,
PZ.ui.timeline.tracks.prototype.mediaDragEnter = function(e) {
    e.preventDefault();
    let t = this.timeline.editor.draggingData;
    if (!t)
        return;
    if (this.mediaDragCtx)
        return void this.mediaDragCtx.refCount++;
    const i = this.clip_drag.createDragContext();
    let {track_proxies: s, clip_proxies: n, maxTrackOffset: r} = this.createProxiesFromFragments(t, 0);
    if (s.length) {
        i.refCount = 1,
        i.track_proxies = s,
        i.clip_proxies = n,
        i.minFrame = 0,
        i.minTrackOffset = 0,
        i.maxTrackOffset = r,
        i.createOnly = !0,
        i.matchTrackIndices = !0;
        var a = this.container.getBoundingClientRect();
        i.origin = {
            x: a.left,
            y: a.top
        },
        i.currentPt = {
            x: (e.pageX - i.origin.x) / this.timeline.zoom
        },
        this.timeline.tracks.verticalZoom(),
        this.timeline.tracks.zoom(),
        i.offset = 0,
        i.start = 0,
        i.moved = !1,
        i.videoTrackIndex = -1,
        i.audioTrackIndex = -1,
        e.stopPropagation(),
        this.mediaDragCtx = i,
        this.clip_drag.startDragging(i, e)
    }
}
,
PZ.ui.timeline.tracks.prototype.mediaDragLeave = function(e) {
    if (e.preventDefault(),
    !this.mediaDragCtx)
        return;
    if (this.mediaDragCtx.refCount--,
    0 !== this.mediaDragCtx.refCount)
        return;
    let t = this.mediaDragCtx;
    this.clip_drag.stopDragging(t, e);
    for (var i = 0; i < t.track_proxies.length; i++)
        t.track_proxies[i].remove();
    for (i = 0; i < t.clip_proxies.length; i++)
        t.clip_proxies[i].remove();
    this.mediaDragCtx = null
}
,
PZ.ui.timeline.tracks.prototype.mediaDrop = function(e) {
    e.preventDefault(),
    this.mediaDragCtx.refCount = 0;
    let t = this.mediaDragCtx;
    this.clip_drag.stopDragging(t, e),
    t.deltaFrames = 0,
    this.clip_drag.end.call(t, e),
    this.mediaDragCtx = null
}
,
PZ.ui.toolbar = function(e, t) {
    PZ.ui.panel.call(this, e),
    this.el.style = "background-color: #242424;padding: 5px;text-align: center;",
    this.el.classList.add("toolbarpanel"),
    this.minWidth = 40,
    this.minHeight = 40,
    this.enabled = !0,
    this.buttons = t,
    this.create()
}
,
PZ.ui.toolbar.SHIFT = 4,
PZ.ui.toolbar.CTRL = 2,
PZ.ui.toolbar.ALT = 1,
PZ.ui.toolbar.prototype.resize = function() {}
,
PZ.ui.toolbar.prototype.create = function() {
    for (var e = 0; e < this.buttons.length; e++)
        if (this.buttons[e].separator) {
            var t = document.createElement("span");
            t.style = "width:15px;display:inline-block;height:25px;",
            this.el.appendChild(t)
        } else if (this.buttons[e].icon) {
            var i = document.createElement("button");
            i.title = this.buttons[e].title,
            i.cmd = this.buttons[e],
            i.onclick = this.click.bind(this);
            var s = PZ.ui.generateIcon(this.buttons[e].icon);
            s.style = "fill:rgb(172, 172, 172);width:25px;height:25px;pointer-events:none",
            i.appendChild(s),
            this.buttons[e].observable && this.buttons[e].observable.watch(this.buttons[e].update.bind(this, i), !0),
            this.el.appendChild(i)
        }
    document.addEventListener("keydown", this.keydown.bind(this))
}
,
PZ.ui.toolbar.prototype.click = function(e) {
    e.currentTarget.cmd.fn.call(this)
}
,
PZ.ui.toolbar.prototype.shouldIgnoreKeydown = function(e, t) {
    var i = e.tagName;
    return !("INPUT" !== i && "SELECT" !== i && "TEXTAREA" !== i && !e.isContentEditable) || "BUTTON" === i && ("Enter" === t || " " === t)
}
,
PZ.ui.toolbar.prototype.keydown = function(e) {
    if (!this.shouldIgnoreKeydown(e.target, e.key) && this.enabled)
        for (var t = e.shiftKey << 2 | e.ctrlKey << 1 | e.altKey << 0, i = 0; i < this.buttons.length; i++) {
            var s = this.buttons[i];
            if (s.key && s.key === e.key) {
                if ((s.modifierMask || 0) === t)
                    return s.fn.call(this),
                    e.preventDefault(),
                    void e.stopPropagation()
            }
        }
}
,
PZ.ui.waveform = function(e, t) {
    this.timeline = e,
    this.canvas = t,
    this.needsUpdate = !0,
    this.prevScrollLeft = -1,
    this.prevScrollTop = -1,
    this.bufferCache = new WeakMap
}
,
PZ.ui.waveform.prototype.analyzeBuffer = function(e, t, i) {
    if (!e)
        return;
    let s = e.sampleRate / i.pointsPerSec
      , n = e.length
      , r = Math.floor(n / s)
      , a = i.minBuf.length
      , o = new Int8Array(i.minBuf.length + r)
      , l = new Int8Array(i.maxBuf.length + r);
    o.set(i.minBuf),
    l.set(i.maxBuf),
    i.minBuf = o,
    i.maxBuf = l;
    let h = [];
    for (var c = 0; c < e.numberOfChannels; c++)
        h.push(new Float32Array(s));
    let p = 1 / e.numberOfChannels;
    for (var d = 0; d < r; d++) {
        var u = 0
          , m = 0
          , f = d * s;
        for (c = 0; c < e.numberOfChannels; c++)
            e.copyFromChannel(h[c], c, f);
        for (var y = 0; y < s; y++) {
            let t = 0;
            for (c = 0; c < e.numberOfChannels; c++)
                t += h[c][y] * p;
            u = Math.min(t, u),
            m = Math.max(t, m)
        }
        o[a + d] = 127 * u,
        l[a + d] = 127 * m
    }
}
,
PZ.ui.waveform.prototype.decodeSegment = async function(e) {
    var t = await PZ.av.remux(e);
    if (e.startOffset = Math.max(e.startTime - t.offset, 0),
    !t.buffer)
        return null;
    return await new Promise(function(e, i) {
        var s = new AudioContext;
        s.decodeAudioData(t.buffer, function(t) {
            s.close(),
            e(t)
        }, function(t) {
            s.close(),
            e()
        })
    }
    )
}
,
PZ.ui.waveform.prototype.analyze = function(e) {
    return new Promise( (t, i) => {
        let s = this.bufferCache.get(e)
          , n = this
          , r = {
            getVideoFrame: async function() {
                let i = {
                    file: {
                        name: e.filename || "audio.ogg",
                        data: e.file
                    },
                    startTime: 0,
                    duration: 15,
                    typeMask: 2
                };
                for (; ; ) {
                    let e = await n.decodeSegment(i);
                    if (!e)
                        break;
                    if (n.analyzeBuffer(e, i, s),
                    e.duration < i.duration)
                        break;
                    i.startTime += i.duration
                }
                return PZ.av.stop(),
                t(),
                await new Promise(function() {}
                )
            }
        };
        PZ.av.encode(r, {
            width: 426,
            height: 240,
            rate: 30,
            quality: 2,
            format: "mkv_vp8_opus",
            start: 0,
            length: 1
        })
    }
    )
}
,
PZ.ui.waveform.prototype.analyzeMedia = async function(e) {
    if (!e)
        return;
    let t = {
        pointsPerSec: 200,
        minBuf: new Int8Array(0),
        maxBuf: new Int8Array(0)
    };
    for (this.bufferCache.set(e, t); this.analyzeLoading; )
        await this.analyzeLoading;
    this.analyzeLoading = this.analyze(e),
    await this.analyzeLoading,
    this.analyzeLoading = null
}
,
PZ.ui.waveform.prototype.renderClip = function(e, t) {
    if (t.classList.contains("proxy"))
        return;
    var i = this.bufferCache.get(t.pz_object.media.asset);
    if (!i)
        return void this.analyzeMedia(t.pz_object.media.asset);
    if (!i.pointsPerSec)
        return;
    let s = Math.max(this.timeline.scrollBar.scrollLeft - parseFloat(t.style.left), 0) + 1
      , n = Math.min(this.canvas.width, parseFloat(t.style.width) - s) - 2;
    if (n < 1)
        return;
    let r = t.pz_object.properties.time.get(0)
      , a = t.pz_object.properties.time.get(t.pz_object.length)
      , o = Math.floor(r * i.pointsPerSec)
      , l = Math.floor((a - r) * i.pointsPerSec) / (parseFloat(t.style.width) - 2) * 1;
    for (var h = s; h < s + n; h += 1) {
        var c = Math.floor(l * h) + o;
        let t = 0
          , s = 0;
        for (var p = 0; p < l; p++)
            t = Math.max(t, i.maxBuf[c + p]),
            s = Math.min(s, i.minBuf[c + p]);
        var d = Math.abs(t - s);
        e.fillRect(h, 256 - d, 1, d)
    }
}
,
PZ.ui.waveform.prototype.renderTrack = function(e, t) {
    for (var i = t.children, s = 0; s < i.length; s++)
        e.save(),
        e.translate(parseFloat(i[s].style.left), 0),
        this.renderClip(e, i[s]),
        e.restore()
}
,
PZ.ui.waveform.prototype.render = function() {
    if (this.needsUpdate) {
        var e = this.canvas.getContext("2d");
        e.clearRect(0, 0, this.canvas.width, this.canvas.height),
        e.fillStyle = "#242d42",
        e.save(),
        e.translate(-this.timeline.scrollBar.scrollLeft, -this.timeline.tracks.audioContainer.scrollTop);
        for (var t = this.timeline.tracks.audioContainer.children, i = 0; i < t.length; i++)
            e.save(),
            e.translate(0, parseFloat(t[i].style.top) + 1),
            e.scale(1, (parseFloat(t[i].style.height) - 2) / 256),
            this.renderTrack(e, t[i]),
            e.restore();
        e.restore()
    }
}
,
PZ.ui.feedback = class extends PZ.ui.panel.nav {
    constructor(e) {
        super(e),
        this.title = "Feedback",
        this.icon = "feedback",
        this.el.style.backgroundColor = "#2a2a2a",
        this.feedback = {
            type: 0,
            message: ""
        },
        this.lastSent = null,
        this.el.style.overflowY = "auto",
        this.create()
    }
    create() {
        this.navigate(this.createMainPage())
    }
    createMainPage() {
        let e = this.createPage("What do you think?")
          , t = this;
        var i, s;
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your feedback is always appreciated and is used to improve the app."
        })),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Type",
            items: "Suggestion;Problem;Comment;Question",
            get: function() {
                return t.feedback.type
            },
            set: function(e) {
                t.feedback.type = e,
                i.style.display = 3 === e ? "" : "none",
                s.style.display = 3 !== e ? "" : "none"
            }
        })),
        s = document.createElement("div"),
        e.appendChild(s),
        s.appendChild(PZ.ui.controls.legacy.generateTextArea({
            title: "Feedback",
            get: function() {
                return t.feedback.message
            },
            set: function(e) {
                t.feedback.message = e
            }
        })),
        s.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        s.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Send your feedback",
            clickfn: function() {
                if (t.feedback.message.length < 10)
                    return;
                if (t.feedback.message.length > 1500)
                    return;
                if (null !== t.lastSent && Date.now() - t.lastSent < 1e4)
                    return;
                t.lastSent = Date.now();
                t.editor.sendDiagnostics(),
                PZ.api("/feedback", "post", {
                    feedbackSource: 0,
                    feedbackType: t.feedback.type,
                    feedbackCategory: 0,
                    toolVersion: PZVERSION,
                    message: t.feedback.message
                }).then(function() {
                    t.navigate(t.createSuccessPage())
                }, function() {
                    t.navigate(t.createFailurePage())
                })
            }
        })),
        (i = e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: 'Please <a target="_blank" href="/discussions">create a discussion</a> to ask your questions as we cannot respond directly to feedback.'
        }))).style.display = "none",
        e
    }
    createSuccessPage() {
        let e = this.createPage("Feedback sent");
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: 'Thanks! Your feedback was sent.<br /><br />Still need help? <a target="_blank" href="/discussions">Create a discussion</a> if you have questions or need assistance.'
        })),
        e
    }
    createFailurePage() {
        let e = this.createPage("Feedback error");
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Sorry, your feedback could not be sent. Please try again later."
        })),
        e
    }
}
,
PZ.ui.about = class extends PZ.ui.panel {
    constructor(e, t) {
        super(e),
        this.title = "About",
        this.icon = "about",
        this.el.style.backgroundColor = "#2a2a2a",
        this.options = {
            recentChanges: [],
            olderChanges: []
        },
        Object.assign(this.options, t),
        this.el.style.overflowY = "auto",
        this.create()
    }
    create() {
        this.el.appendChild(PZ.ui.controls.legacy.generateTitle({
            title: this.editor.name
        })),
        this.el.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: 'Copyright 2019 Panzoid<br><a target="_blank" href="/about/terms">Terms</a> · <a target="_blank" href="/about/privacy">Privacy</a>'
        })),
        this.el.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        this.el.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: this.editor.name + " " + PZTOOLVERSION + "<br>Core " + PZVERSION + "<br>UI 1.0.72"
        })),
        this.el.lastElementChild.style.color = "#aaa"
    }
}
,
PZ.ui.widget3d = function(e) {
    this.mode = PZ.ui.widget3d.mode.POSITION,
    this.viewport = e,
    this.editor = e.editor,
    this.propertyOps = new PZ.ui.properties(this.editor),
    this.controls = null,
    this.threeObj = null,
    this.position = null,
    this.rotation = null,
    this.scale = null,
    PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
    this.objects = null,
    this.objectsChanged_bound = this.objectsChanged.bind(this),
    this.onObjectsChanged.watch(e => {
        e && e.onListChanged.unwatch(this.objectsChanged_bound),
        this.objects ? this.objects.onListChanged.watch(this.objectsChanged_bound, !0) : this.objectsChanged()
    }
    ),
    this.create(),
    this.viewport.options.widget3dObjects && (this.objects = this.viewport.options.widget3dObjects)
}
,
PZ.ui.widget3d.mode = {
    POSITION: 0,
    ROTATION: 1,
    SCALE: 2,
    NONE: 3
},
PZ.ui.widget3d.prototype.objectsChanged = function() {
    let e, t = !1;
    if (this.threeObj = null,
    this.position = null,
    this.rotation = null,
    this.scale = null,
    this.objects && 1 === this.objects.length && this.objects[0]instanceof PZ.object3d && (e = this.objects[0]),
    e && e.threeObj) {
        let i = e.properties;
        for (let e of i) {
            let i = e.definition.name;
            if ("Position" === i)
                this.position = e;
            else if ("Rotation" === i)
                this.rotation = e;
            else {
                if ("Scale" !== i)
                    continue;
                this.scale = e
            }
            t = !0
        }
        t && (this.threeObj = e.threeObj)
    }
    this.updateMode()
}
,
PZ.ui.widget3d.prototype.create = function() {
    this.controls = new THREE.TransformControls(this.viewport.camera,this.viewport.canvas),
    this.controls.traverse(function(e) {
        e.layers.set(1),
        e.material && (e.material.fog = !1)
    }),
    this.controls.setSpace("world"),
    this.viewport.threeObj.add(this.controls),
    this.viewport.el.addEventListener("keydown", this.keydown.bind(this)),
    this.controls.addEventListener("mouseDown", this.dragStart.bind(this)),
    this.controls.addEventListener("objectChange", this.drag.bind(this)),
    this.controls.addEventListener("mouseUp", this.dragEnd.bind(this))
}
,
PZ.ui.widget3d.prototype.keydown = function(e) {
    "1" === e.key ? this.mode = PZ.ui.widget3d.mode.POSITION : "2" === e.key ? this.mode = PZ.ui.widget3d.mode.ROTATION : "3" === e.key ? this.mode = PZ.ui.widget3d.mode.SCALE : "4" === e.key && (this.mode = PZ.ui.widget3d.mode.NONE),
    this.updateMode()
}
,
PZ.ui.widget3d.prototype.updateMode = function() {
    if (this.controls.detach(),
    this.mode === PZ.ui.widget3d.mode.POSITION)
        this.controls.setMode("translate");
    else if (this.mode === PZ.ui.widget3d.mode.ROTATION)
        this.controls.setMode("rotate");
    else {
        if (this.mode !== PZ.ui.widget3d.mode.SCALE)
            return;
        this.controls.setMode("scale")
    }
    this.threeObj && this.controls.attach(this.threeObj)
}
,
PZ.ui.widget3d.prototype.dragStart = function() {
    this.mode === PZ.ui.widget3d.mode.POSITION ? (this.property = this.position,
    this.objectProperty = this.controls.object.position) : this.mode === PZ.ui.widget3d.mode.ROTATION ? (this.property = this.rotation,
    this.objectProperty = this.controls.object.rotation) : this.mode === PZ.ui.widget3d.mode.SCALE && (this.property = this.scale,
    this.objectProperty = this.controls.object.scale),
    this.frame = this.editor.playback.currentFrame - this.position.frameOffset,
    this.editor.history.startOperation(),
    this.propertyOps.startEdit(this.property, this.frame),
    this.initialValue = this.property.get(this.frame),
    this.dragging = !0
}
,
PZ.ui.widget3d.prototype.drag = function() {
    let e = [this.objectProperty.x, this.objectProperty.y, this.objectProperty.z];
    this.property.set(e, this.frame)
}
,
PZ.ui.widget3d.prototype.dragEnd = function() {
    this.dragging = !1,
    this.propertyOps.setValue({
        property: this.property.getAddress(),
        frame: this.frame,
        oldValue: this.initialValue
    }),
    this.editor.history.finishOperation()
}
,
PZ.ui.widget3d.prototype.update = function() {
    this.threeObj && !0 == !this.dragging && this.controls.update()
}
,
PZ.ui.widget2d = function(e) {
    this.viewport = e,
    this.editor = e.editor,
    this.properties = null,
    this.propertyOps = new PZ.ui.properties(this.editor),
    this.position = null,
    this.rotation = null,
    this.resolution = null,
    this.size = null,
    this.ratio = 1,
    PZ.observable.defineObservableProp(this, "edit", "onEditChanged", !0),
    this.onEditChanged.watch( () => {
        this.el.style.display = this.position && this.edit ? "" : "none"
    }
    ),
    PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
    this.objects = null,
    this.objectsChanged_bound = this.objectsChanged.bind(this),
    this.onObjectsChanged.watch(e => {
        e && e.onListChanged.unwatch(this.objectsChanged_bound),
        this.objects ? this.objects.onListChanged.watch(this.objectsChanged_bound, !0) : this.objectsChanged()
    }
    ),
    this.create(),
    this.viewport.options.widget2dObjects && (this.objects = this.viewport.options.widget2dObjects)
}
,
PZ.ui.widget2d.prototype.objectsChanged = function() {
    let e = null;
    this.position = null,
    this.rotation = null,
    this.resolution = null,
    this.scale = null,
    this.objects && 1 === this.objects.length && this.objects[0]instanceof PZ.clip.video && (e = this.objects[0].object),
    e && (this.position = e.properties.position,
    this.rotation = e.properties.rotation,
    this.resolution = e.properties.resolution,
    this.scale = e.properties.scale),
    this.edit = this.edit
}
,
PZ.ui.widget2d.prototype.create = function() {
    this.el = document.createElement("div"),
    this.el.style = "left:50%;top:50%;position:absolute;border:1px solid #ccc;outline:1px solid #666;cursor:move;transform-origin:center;",
    this.el.style.display = "none",
    this.drag = new PZ.ui.drag(this.el,this.dragStart,this.drag,this.dragUpdate,this.dragEnd,this);
    let e = "position:absolute;width:10px;height:10px;background-color:#ccc;border:1px solid #555;cursor:move;"
      , t = Array.from(new Array(8), () => document.createElement("div"));
    t[0].style = e + "left:-7px;top:-7px;",
    t[0].pz_theta = 135,
    t[1].style = e + "left:50%;margin-left:-7px;top:-7px;",
    t[1].pz_theta = 90,
    t[2].style = e + "right:-7px;top:-7px;",
    t[2].pz_theta = 45,
    t[3].style = e + "left:-7px;top:50%;margin-top:-7px;",
    t[3].pz_theta = 180,
    t[4].style = e + "right:-7px;top:50%;margin-top:-7px;",
    t[4].pz_theta = 0,
    t[5].style = e + "left:-7px;bottom:-7px;",
    t[5].pz_theta = 225,
    t[6].style = e + "left:50%;margin-left:-7px;bottom:-7px;",
    t[6].pz_theta = 270,
    t[7].style = e + "right:-7px;bottom:-7px;",
    t[7].pz_theta = 315,
    this.handleDrag = new PZ.ui.drag(t,this.resizeDragStart,this.resizeDrag,this.resizeDragUpdate,this.resizeDragEnd,this),
    t.forEach(e => this.el.appendChild(e));
    let i = document.createElement("div");
    i.style = e + "left:50%;margin-left:-7px;top:-25px;border-radius:7px;",
    i.pz_theta = 90,
    i.pz_rotate = !0,
    this.handleDrag.addElts(i),
    this.el.appendChild(i),
    this.viewport.el.appendChild(this.el)
}
,
PZ.ui.widget2d.prototype.update = function(e) {
    if (!this.resolution)
        return;
    e -= this.position.frameOffset;
    parseFloat(this.viewport.canvas.style.left),
    parseFloat(this.viewport.canvas.style.top);
    let t, i, s, n = "";
    i = (t = this.resolution.get())[0],
    s = t[1],
    i *= (t = this.scale.get(e))[0] * this.ratio,
    s *= t[1] * this.ratio,
    i = Math.abs(i),
    s = Math.abs(s),
    this.el.style.width = i + "px",
    this.el.style.height = s + "px",
    this.el.style.left = t = this.position.get(e),
    n += " translate(" + (t[0] * this.ratio - .5 * i) + "px, " + (-t[1] * this.ratio - .5 * s) + "px)",
    n += " rotate(" + -(t = this.rotation.get(e)) + "rad)",
    this.el.style.transform = n
}
,
PZ.ui.widget2d.prototype.dragStart = function(e) {
    this.property = this.ctx.position,
    this.frame = this.ctx.editor.playback.currentFrame - this.property.frameOffset,
    this.initialValue = this.property.get(this.frame).slice(),
    this.currentPt = {
        x: e.pageX,
        y: e.pageY
    },
    this.startPt = {
        x: this.currentPt.x,
        y: this.currentPt.y
    },
    this.ctx.editor.history.startOperation(),
    this.ctx.propertyOps.startEdit(this.property, this.frame)
}
,
PZ.ui.widget2d.prototype.drag = function(e) {
    this.currentPt.x = e.pageX,
    this.currentPt.y = e.pageY,
    this.shiftKey = e.shiftKey,
    this.ctrlKey = e.ctrlKey
}
,
PZ.ui.widget2d.prototype.dragUpdate = function() {
    let e = this.currentPt.x - this.startPt.x
      , t = this.currentPt.y - this.startPt.y
      , i = new Array(2);
    i[0] = this.initialValue[0] + e / this.ctx.ratio,
    i[1] = this.initialValue[1] - t / this.ctx.ratio,
    this.property.set(i, this.frame)
}
,
PZ.ui.widget2d.prototype.dragEnd = function(e, t) {
    this.ctx.propertyOps.setValue({
        property: this.property.getAddress(),
        frame: this.frame,
        oldValue: this.initialValue
    }),
    t ? this.ctx.editor.history.discardOperation() : this.ctx.editor.history.finishOperation()
}
,
PZ.ui.widget2d.prototype.resizeDragStart = function(e) {
    e.shiftKey || e.currentTarget.pz_rotate ? this.property = this.ctx.rotation : this.property = this.ctx.scale,
    this.frame = this.ctx.editor.playback.currentFrame - this.property.frameOffset,
    this.initialValue = this.property.get(this.frame),
    Array.isArray(this.initialValue) && (this.initialValue = this.initialValue.slice());
    let t = e.currentTarget.pz_theta / 180 * Math.PI;
    var i = this.ctx.viewport.canvas.getBoundingClientRect();
    let s = this.ctx.position.get(this.frame)
      , n = this.ctx.rotation.get(this.frame)
      , r = this.ctx.resolution.get(this.frame)
      , a = this.ctx.scale.get(this.frame)
      , o = r[0] * a[0]
      , l = r[1] * a[1];
    this.direction = new THREE.Vector2(Math.abs(Math.round(Math.cos(t))),Math.abs(Math.round(Math.sin(t)))),
    this.guide = new THREE.Vector2(o * Math.cos(t + n),-l * Math.sin(t + n)).normalize(),
    this.center = new THREE.Vector2(i.left + .5 * i.width + s[0] * this.ctx.ratio,i.top + .5 * i.height - s[1] * this.ctx.ratio),
    this.currentPt = new THREE.Vector2(e.pageX,e.pageY).sub(this.center),
    this.initialPos = this.currentPt.dot(this.guide),
    this.initialRot = -Math.atan2(this.currentPt.y, this.currentPt.x),
    this.direction.multiply(new THREE.Vector2(a[0],a[1])),
    this.direction.multiplyScalar(1 / this.initialPos),
    this.ctx.editor.history.startOperation(),
    this.ctx.propertyOps.startEdit(this.property, this.frame),
    e.stopPropagation()
}
,
PZ.ui.widget2d.prototype.resizeDrag = function(e) {
    this.currentPt.x = e.pageX - this.center.x,
    this.currentPt.y = e.pageY - this.center.y,
    this.shiftKey = e.shiftKey,
    this.ctrlKey = e.ctrlKey
}
,
PZ.ui.widget2d.prototype.resizeDragUpdate = function() {
    let e;
    if (this.property === this.ctx.scale) {
        let t = this.currentPt.dot(this.guide);
        (e = new Array(2))[0] = this.initialValue[0] + this.direction.x * (t - this.initialPos),
        e[1] = this.initialValue[1] + this.direction.y * (t - this.initialPos)
    } else {
        let t = -Math.atan2(this.currentPt.y, this.currentPt.x);
        e = this.initialValue + t - this.initialRot
    }
    this.property.set(e, this.frame)
}
,
PZ.ui.widget2d.prototype.resizeDragEnd = function(e, t) {
    this.ctx.propertyOps.setValue({
        property: this.property.getAddress(),
        frame: this.frame,
        oldValue: this.initialValue
    }),
    t ? this.ctx.editor.history.discardOperation() : this.ctx.editor.history.finishOperation()
}
,
PZ.ui.widget2d.prototype.resize = function() {
    let e = this.editor.sequence.properties.resolution.get();
    this.ratio = parseFloat(this.viewport.canvas.style.width) / e[0]
}
,
PZ.ui.helper3d = function(e) {
    this.viewport = e,
    this.editor = e.editor,
    this.object = null,
    this.helper = null,
    PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
    this.objects = null,
    this.objectsChanged_bound = this.objectsChanged.bind(this),
    this.onObjectsChanged.watch(e => {
        e && e.onListChanged.unwatch(this.objectsChanged_bound),
        this.objects ? this.objects.onListChanged.watch(this.objectsChanged_bound, !0) : this.objectsChanged()
    }
    ),
    this.viewport.options.helper3dObjects && (this.objects = this.viewport.options.helper3dObjects)
}
,
PZ.ui.helper3d.prototype.objectsChanged = function() {
    let e;
    if (this.helper && (this.viewport.threeObj.remove(this.helper),
    this.helper = null),
    this.objects && 1 === this.objects.length && this.objects[0]instanceof PZ.object3d && (e = this.objects[0]),
    e)
        if (e instanceof PZ.object3d.camera)
            this.helper = new THREE.CameraHelper(e.threeObj),
            this.helper.layers.set(1),
            this.viewport.threeObj.add(this.helper);
        else if (e instanceof PZ.object3d.light) {
            switch (e.objectType) {
            case 1:
                this.helper = new THREE.SpotLightHelper(e.threeObj),
                this.helper.children[0].layers.set(1),
                this.helper.children[0].onBeforeRender = function() {
                    this.parent.update()
                }
                ;
                break;
            case 2:
                this.helper = new THREE.PointLightHelper(e.threeObj,5),
                this.helper.layers.set(1),
                this.helper.onBeforeRender = function() {
                    this.update()
                }
                ;
                break;
            case 3:
                this.helper = new THREE.DirectionalLightHelper(e.threeObj,5),
                this.helper.children[0].layers.set(1),
                this.helper.children[1].layers.set(1),
                this.helper.children[0].onBeforeRender = function() {
                    this.parent.update()
                }
                ;
                break;
            case 4:
                this.helper = new THREE.HemisphereLightHelper(e.threeObj,5),
                this.helper.children[0].layers.set(1),
                this.helper.children[0].onBeforeRender = function() {
                    this.parent.update()
                }
            }
            this.viewport.threeObj.add(this.helper)
        } else
            this.helper = new THREE.BoxHelper(e.threeObj),
            this.helper.layers.set(1),
            this.helper.onBeforeRender = function() {
                this.update()
            }
            ,
            this.viewport.threeObj.add(this.helper)
}
,
PZ.ui.export = class extends PZ.ui.panel.nav {
    constructor(e, t) {
        super(e),
        this.title = "Export",
        this.icon = "export",
        this.cloudExport = new PZ.ui.export.cloud(this),
        this.deviceExport = new PZ.ui.export.device(this),
        this.frameExport = new PZ.ui.export.frame(this),
        Object.assign(this, t),
        this.create()
    }
    create() {
        this.imageExportOnly ? this.navigate(this.frameExport.createOptionsPage(!0)) : this.navigate(this.createMainPage())
    }
    createMainPage() {
        let e = this.createPage("Export project");
        var t = document.createElement("button");
        t.classList.add("pz-option");
        var i = PZ.ui.generateIcon("pc");
        i.style = "fill:#ccc;width:60px;height:60px;flex: 0 0 60px;margin-right: 10px",
        t.appendChild(i);
        var s = document.createElement("div");
        s.style = "display:inline-block",
        s.appendChild(document.createTextNode("Device render"));
        var n = document.createElement("span");
        n.innerText = "Render your video on your device.",
        s.appendChild(n),
        t.appendChild(s),
        t.onclick = function() {
            this.navigate(this.deviceExport.createOptionsPage(), !0)
        }
        .bind(this),
        e.appendChild(t);
        var r = document.createElement("button");
        r.classList.add("pz-option");
        var a = PZ.ui.generateIcon("image");
        a.style = "fill:#ccc;width:60px;height:60px;flex: 0 0 60px;margin-right: 10px",
        r.appendChild(a);
        var o = document.createElement("div");
        o.style = "display:inline-block",
        o.appendChild(document.createTextNode("Single frame capture"));
        var l = document.createElement("span");
        return l.innerText = "Save a single frame as an image.",
        o.appendChild(l),
        r.appendChild(o),
        r.onclick = function() {
            this.navigate(this.frameExport.createOptionsPage(), !0)
        }
        .bind(this),
        e.appendChild(r),
        e
    }
}
,
PZ.ui.export.resolutions = [new THREE.Vector2(426,240), new THREE.Vector2(640,360), new THREE.Vector2(854,480), new THREE.Vector2(1280,720), new THREE.Vector2(1920,1080), new THREE.Vector2(2560,1440), new THREE.Vector2(3840,2160)],
PZ.ui.export.cloud = class {
    constructor(e) {
        this.export = e,
        this.editor = this.export.editor,
        this.CLOUD_FORMATS = ["mp4_h264_aac", "mkv_vp8_vorbis", "webm_vp8_vorbis", "mkv_vp9_opus", "webm_vp9_opus"],
        this.params = null,
        this.pageCache = {}
    }
    updateQuote() {
        this.cloudCredits = void 0,
        this.cloudPrice = void 0,
        this.cloudTotalEl.pz_update(),
        this.quoteLoading = new Promise(async (e, t) => {
            var i = await PZ.api("/renders/quote", "post", this.params)
              , s = await i.json();
            this.cloudPrice = s.price,
            this.cloudCredits = s.credits,
            this.cloudToken = s.token,
            this.cloudCreditsEl.pz_update(),
            this.cloudTotalEl.pz_update(),
            this.cloudTotalEl.style.display = 0 === this.cloudPrice ? "none" : "",
            e()
        }
        )
    }
    createOptionsPage() {
        let e = this.export.createPage("Cloud render", !0, () => (this.editor.project.ui.onChanged.unwatch(this.updateProject_bound),
        this.export.onEnabledChanged.unwatch(this.updateEnabled_bound),
        this.cloudPaymentPage = null,
        !0));
        this.params = {
            version: PZVERSION,
            width: 1920,
            height: 1080,
            rate: 30,
            quality: 2,
            format: "mp4_h264_aac",
            start: 0,
            length: 0,
            frames: 0
        },
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Resolution",
            items: "426x240 (240p);640x360 (360p);854x480 (480p);1280x720 (720p);1920x1080 (1080p);2560x1440 (2k);3840x2160 (4k)",
            get: function() {
                return 4
            },
            set: function(e) {
                this.params.width = PZ.ui.export.resolutions[e].x,
                this.params.height = PZ.ui.export.resolutions[e].y,
                this.updateQuote()
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Frame rate",
            items: "30;60",
            get: function() {
                return 0
            },
            set: function(e) {
                this.params.rate = 0 === e ? 30 : 60,
                this.updateProject_bound()
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Quality",
            items: "very low;low;good;high;very high",
            get: function() {
                return 2
            },
            set: function(e) {
                this.params.quality = e,
                this.updateQuote()
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Format",
            items: ".mp4 (h.264/aac);.mkv (vp8/vorbis);.webm (vp8/vorbis);.mkv (vp9/opus);.webm (vp9/opus)",
            get: function() {
                return 0
            },
            set: function(e) {
                this.params.format = this.CLOUD_FORMATS[e],
                this.updateQuote()
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        this.cloudCreditsEl = e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Render credits:",
            get: function() {
                return void 0 === this.cloudCredits ? "" : this.cloudCredits.toFixed(0)
            }
        }, this)),
        this.cloudTotalEl = e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Total:",
            get: function() {
                return void 0 === this.cloudPrice ? "" : "$" + this.cloudPrice.toFixed(2)
            }
        }, this)),
        this.cloudTotalEl.style.display = "none",
        e.appendChild(PZ.ui.controls.legacy.generateSpacer());
        let t = e.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Next",
            clickfn: async function() {
                return t.disabled = !0,
                this.editor.project.ui.onChanged.unwatch(this.updateProject_bound),
                this.export.onEnabledChanged.unwatch(this.updateEnabled_bound),
                await PZ.account.getCurrent() ? (await this.quoteLoading,
                0 === this.cloudPrice ? (t.disabled = !1,
                this.pageCache.services = this.pageCache.services || this.createServicesPage(),
                void this.export.navigate(this.pageCache.services, !0)) : (t.disabled = !1,
                this.pageCache.payment = this.pageCache.payment || this.createPaymentPage(),
                void this.export.navigate(this.pageCache.payment, !0))) : (t.disabled = !1,
                void this.export.navigate(this.createLoginPage(), !0))
            }
        }, this));
        return e.pz_activate = ( () => {
            this.updateProject_bound = ( () => {
                let e = this.params.rate / this.editor.sequence.properties.rate.get();
                this.params.length = this.editor.sequence.length * e;
                let t = this.editor.sequence.properties.motionBlur.get();
                this.params.frames = t ? Math.ceil(this.editor.sequence.properties.motionBlurSamples.integrate(this.editor.sequence.length)) : this.params.length,
                this.updateQuote()
            }
            ),
            this.updateEnabled_bound = ( () => {
                this.export.enabled ? this.editor.project.ui.onChanged.watch(this.updateProject_bound, !0) : this.editor.project.ui.onChanged.unwatch(this.updateProject_bound)
            }
            ),
            this.export.onEnabledChanged.watch(this.updateEnabled_bound, !0)
        }
        ),
        e
    }
    createLoginPage() {
        let e = this.export.createPage("Cloud render", !0);
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Please log in to use this feature!"
        })),
        e
    }
    createPaymentPage() {
        let e = this.export.createPage("Payment", !0, null, !0);
        var t = this;
        let i = document.createElement("div");
        i.appendChild(PZ.ui.generateIcon("loading")),
        i.classList.add("loading"),
        e.appendChild(i);
        let s = document.createElement("div");
        s.style.display = "none",
        e.appendChild(s);
        new Promise(async (n, r) => {
            let a = await PZ.api("/payments/clienttoken", "get");
            a.status;
            let o = await a.text();
            s.style.backgroundColor = "#ddd",
            s.style.padding = "10px 5px";
            let l = await braintree.dropin.create({
                authorization: o,
                container: s,
                paypal: {
                    flow: "vault"
                }
            });
            i.remove(),
            s.style.display = "";
            e.appendChild(PZ.ui.controls.legacy.generateSpacer());
            let h = e.appendChild(PZ.ui.controls.legacy.generateButton({
                title: "Next",
                clickfn: async function() {
                    h.disabled = !0,
                    l.requestPaymentMethod().then(function(e) {
                        h.disabled = !1,
                        t.cloudPaymentNonce = e.nonce,
                        t.pageCache.services = t.pageCache.services || t.createServicesPage(),
                        t.export.navigate(t.pageCache.services, !0)
                    }).catch(function(e) {
                        t.export.navigate(t.createErrorPage(), !0)
                    })
                }
            }))
        }
        );
        return e
    }
    createServicesPage() {
        let e = this
          , t = this.export.createPage("Destinations", !0, null, !0)
          , i = document.createElement("div");
        i.appendChild(PZ.ui.generateIcon("loading")),
        i.classList.add("loading"),
        t.appendChild(i);
        let s = e => {
            let t, i, s, n = document.createElement("div");
            n.style = "display: grid; padding: 10px; grid-template-columns: 22px auto 1fr 25px; grid-column-gap: 10px; border-bottom: 1px solid #242424;";
            const r = () => {
                e.enabled && e.params.validate() ? (t.setAttribute("aria-checked", "true"),
                i.style.display = "",
                s.style.display = "") : (t.setAttribute("aria-checked", "false"),
                i.style.display = "none",
                s.style.display = "none")
            }
              , a = !e;
            let o;
            (t = document.createElement("button")).setAttribute("role", "checkbox"),
            t.setAttribute("aria-checked", a),
            t.disabled = !e,
            t.title = "toggle destination",
            t.style = "width: 18px; height: 18px; align-self: center; border: 2px solid #ccc; box-sizing: content-box;",
            (i = PZ.ui.generateIcon("check")).style = "fill: #ccc; width: 18px; height: 18px;",
            i.style.display = a ? "" : "none",
            t.appendChild(i),
            t.onclick = ( () => {
                if (e)
                    if (e.params.validate())
                        e.enabled = !e.enabled,
                        r();
                    else {
                        e.enabled = !0;
                        let t = PZ.ui.export[e.connectionType];
                        this.export.navigate(t.createOptionsPage(this.export, e, r), !0)
                    }
            }
            ),
            n.appendChild(t),
            e ? ((o = document.createElement("img")).setAttribute("src", "/img/sso/" + e.connectionType + ".svg"),
            o.title = e.connectionType,
            o.style = "width:50px; height:50px; padding: 5px") : ((o = PZ.ui.generateIcon("download")).title = "Download",
            o.style = "width:40px; height:40px; padding:10px; fill: #ccc"),
            n.appendChild(o);
            const l = e ? e.accountName : "Download";
            let h = document.createElement("div");
            if (h.title = l,
            h.innerText = l,
            h.style = "color: #ccc; font-size: 18px; align-self: center; overflow: hidden; text-overflow: ellipsis;",
            n.appendChild(h),
            e) {
                (s = document.createElement("button")).title = "edit destination options",
                s.style = "display: none; flex-grow: 1; align-self: center; text-align: right;";
                let t = PZ.ui.generateIcon("edit2");
                t.style = "width: 25px; height: 25px; fill: #ccc;",
                s.appendChild(t),
                s.onclick = ( () => {
                    let t = PZ.ui.export[e.connectionType];
                    this.export.navigate(t.createOptionsPage(this.export, e, r), !0)
                }
                ),
                n.appendChild(s)
            }
            return n
        }
        ;
        new Promise(async (n, r) => {
            this.connections = null;
            try {
                let e = await PZ.api("/connections", "get");
                e.ok && (this.connections = await e.json(),
                this.connections = this.connections.filter(e => "YouTube" === e.connectionType))
            } catch (e) {}
            if (i.remove(),
            t.appendChild(s()),
            this.connections && this.connections.length > 0)
                for (let e = 0; e < this.connections.length; e++) {
                    let i = PZ.ui.export[this.connections[e].connectionType];
                    this.connections[e].enabled = !1,
                    this.connections[e].params = i.createParams();
                    let n = s(this.connections[e]);
                    t.appendChild(n)
                }
            else {
                let e = document.createElement("div");
                if (e.style = "padding: 10px; color: #ccc;",
                this.connections) {
                    const t = await PZ.account.getCurrent();
                    e.innerHTML = `<a href="/users/${t.name}/connections" target="_blank" style="color:#ccc; text-decoration: underline;">Connect an account</a> to use it as a destination.`
                } else
                    e.innerHTML = "There was a problem loading your connections.";
                t.appendChild(e)
            }
            t.appendChild(PZ.ui.controls.legacy.generateSpacer());
            t.appendChild(PZ.ui.controls.legacy.generateButton({
                title: "Next",
                clickfn: function() {
                    e.export.navigate(e.createConfirmationPage(), !0)
                }
            }))
        }
        );
        return t
    }
    createConfirmationPage() {
        let e = this.export.createPage("Confirmation", !0);
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Resolution",
            get: function() {
                return this.params.width + "x" + this.params.height
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Frame rate",
            get: function() {
                return this.params.rate
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Quality",
            get: function() {
                return ["very low", "low", "good", "high", "very high"][this.params.quality]
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Format",
            get: function() {
                return this.params.format
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Length",
            get: function() {
                return PZ.ui.controls.getExactTimeString(this.params.length / this.params.rate)
            }
        }, this));
        const t = this.connections.filter(e => !0 === e.enabled && !0 === e.params.validate()).length;
        return t > 0 && (e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Upload destinations",
            get: function() {
                return t
            }
        }, this))),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Render credits:",
            get: function() {
                return this.cloudCredits.toFixed(0)
            }
        }, this)),
        0 !== this.cloudPrice && e.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Total:",
            get: function() {
                return "$" + this.cloudPrice.toFixed(2)
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: 'By clicking Start you agree to Panzoid\'s <a href="/about/terms" target="_blank" style="color:#aaa">terms of service</a>.'
        })),
        e.lastElementChild.style.fontSize = "14px",
        e.lastElementChild.style.color = "#aaa",
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Start",
            clickfn: async function() {
                0 === this.params.length ? this.export.navigate(this.createErrorPage("Your project is empty.")) : this.export.navigate(this.createProgressPage(), !0)
            }
        }, this)),
        e
    }
    createProgressPage(e) {
        let t, i = this.export.createPage("Uploading...", !0, () => (clearInterval(t),
        this.uploadCleanUp(),
        !0)), s = new PZ.upload;
        i.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your project assets are being uploaded. Please stay on this page to ensure your browser continues to process your project."
        }));
        var n = performance.now();
        this.upload(s).then(e => {
            clearInterval(t),
            e ? this.export.navigate(this.createFinishedPage(e)) : this.export.navigate(this.createErrorPage())
        }
        ).catch(e => {
            this.export.navigate(this.createErrorPage()),
            s.sendDiagnostics(e)
        }
        );
        let r = i.appendChild(PZ.ui.controls.legacy.generateProgressbar({
            get: function() {
                return 0 === s.uploadSize ? 0 : s.bytesUploaded / s.uploadSize * 100
            }
        }, this))
          , a = i.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Time left:",
            get: function() {
                var e = s.uploadSize - s.bytesUploaded
                  , t = (performance.now() - n) / 1e3
                  , i = e / (s.bytesUploaded / t);
                return PZ.ui.controls.getTimeString(i)
            }
        }, this));
        return t = setInterval(function() {
            a.pz_update(),
            r.pz_update()
        }
        .bind(this), 1e3),
        i
    }
    createFinishedPage(e) {
        let t = this.export.createPage("Upload complete", !0, () => (this.export.pageBackStack.splice(2),
        this.uploadCleanUp(),
        !0));
        return t.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your render has started! Track its progress with the link below."
        })),
        t.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        t.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Track render progress",
            clickfn: function() {
                open("/renders/" + e, "_blank")
            }
        }, this)),
        t.lastElementChild.style.cursor = "pointer",
        t
    }
    createErrorPage(e) {
        let t = this.export.createPage("Upload error", !0, () => (this.export.pageBackStack.splice(2),
        this.uploadCleanUp(),
        !0));
        return t.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: e || "Unfortunately, your upload could not be completed. Please try again later. Sorry about that."
        })),
        t
    }
    async upload(e) {
        let t;
        if (200 !== (t = await PZ.api("/renders", "post", {
            token: this.cloudToken,
            nonce: this.cloudPaymentNonce,
            uploads: this.connections.filter(e => !0 === e.enabled && !0 === e.params.validate()).map(e => ({
                serviceConnectionId: e.connectionId,
                uploadParams: e.params
            }))
        })).status)
            return null;
        var i = await t.text();
        await e.uploadProject(this.editor.project, i);
        let s = new Headers;
        await PZ.account.getCurrent();
        return s.append("x-csrf-token", PZ.account.csrf),
        200 !== (t = await e.fetchWithRetry(PZ.apiOrigin + "/renders/" + i, {
            method: "put",
            headers: s,
            credentials: "include"
        })).status ? null : i
    }
    uploadCleanUp() {
        this.editor.enabled = !0,
        this.editor.playback.enabled = !0
    }
}
,
PZ.ui.export.device = class {
    constructor(e) {
        this.export = e,
        this.editor = this.export.editor,
        this.DEVICE_FORMATS = ["mkv_vp8_opus", "webm_vp8_opus"],
        this.params = null
    }
    createOptionsPage() {
        let e = this.export.createPage("Device render", !0, () => (this.editor.sequence.onLengthChanged.unwatch(this.updateLength_bound),
        !0));
        return this.params = {
            width: 1920,
            height: 1080,
            rate: 30,
            quality: 2,
            format: "mkv_vp8_opus",
            start: 0,
            length: 0
        },
        this.updateLength_bound = function() {
            let e = this.params.rate / this.editor.sequence.properties.rate.get();
            this.params.length = this.editor.sequence.length * e
        }
        .bind(this),
        this.editor.sequence.onLengthChanged.watch(this.updateLength_bound, !0),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Resolution",
            items: "426x240 (240p);640x360 (360p);854x480 (480p);1280x720 (720p);1920x1080 (1080p);2560x1440 (2k);3840x2160 (4k)",
            get: function() {
                return 4
            },
            set: function(e) {
                this.params.width = PZ.ui.export.resolutions[e].x,
                this.params.height = PZ.ui.export.resolutions[e].y
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Frame rate",
            items: "30;60",
            get: function() {
                return 0
            },
            set: function(e) {
                this.params.rate = 0 === e ? 30 : 60;
                let t = this.params.rate / this.editor.sequence.properties.rate.get();
                this.params.length = this.editor.sequence.length * t
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Quality",
            items: "very low (fast);low;good;very good;extreme (slow)",
            get: function() {
                return 2
            },
            set: function(e) {
                this.params.quality = e
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Format",
            items: ".mkv (vp8/opus);.webm (vp8/opus)",
            get: function() {
                return 0
            },
            set: function(e) {
                this.params.format = this.DEVICE_FORMATS[e]
            }
        }, this)),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Start",
            clickfn: async function() {
                this.editor.sequence.onLengthChanged.unwatch(this.updateLength_bound),
                this.export.navigate(this.createProgressPage(), !0)
            }
        }, this)),
        e
    }
    createProgressPage() {
        this.editor.enabled = !1,
        this.editor.playback.enabled = !1;
        let e, t = new PZ.export(this.editor.sequence,this.params), i = this.export.createPage("Rendering...", !0, () => (clearInterval(e),
        PZ.av.stop(),
        t.unload(),
        this.renderCleanUp(),
        !0));
        i.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your video is being rendered. Please stay on this page to ensure your browser continues to process the video."
        }));
        var s = performance.now();
        let n;
        this.render(t).catch(function(e) {
            n = e.message
        }).then(function(i) {
            clearInterval(e),
            void 0 === i ? (n = n || "Output was empty.",
            this.export.navigate(this.createErrorPage(n))) : (PZ.downloadBlob = i,
            PZ.downloadFilename = this.params.format.startsWith("mkv") ? "video.mkv" : "video.webm",
            this.export.navigate(this.createFinishedPage())),
            t.unload()
        }
        .bind(this));
        let r = i.appendChild(PZ.ui.controls.legacy.generateProgressbar({
            get: function() {
                return 0 === t.framesRendered ? 0 : t.framesRendered / t.totalFrames * 100
            }
        }, this))
          , a = i.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Time left:",
            get: function() {
                var e = (performance.now() - s) / 1e3 / t.framesRendered
                  , i = (t.totalFrames - t.framesRendered) * e;
                return PZ.ui.controls.getTimeString(i)
            }
        }, this));
        return e = window.setInterval(function() {
            r.pz_update(),
            a.pz_update()
        }, 1e3),
        i
    }
    createFinishedPage() {
        let e = this.export.createPage("Render complete", !0, () => (this.renderCleanUp(),
        !0));
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your render is finished! Click below to download."
        })),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Download your video",
            clickfn: function() {
                hiddenframe("/download.html")
            }
        }, this)),
        e.lastElementChild.style.cursor = "pointer",
        e
    }
    createErrorPage(e) {
        let t = this.export.createPage("Render error", !0, () => (this.renderCleanUp(),
        !0));
        return t.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: 'Unfortunately, your render could not be completed. Sorry about that.<span style="display:block;margin-top:20px;color:#666">Error: ' + e + "</span>"
        })),
        t
    }
    async render(e) {
        return await PZ.file.getQuota(),
        await PZ.av.encode(e, this.params)
    }
    renderCleanUp() {
        PZ.downloadBlob = null,
        PZ.file.cleanUp(),
        this.editor.enabled = !0,
        this.editor.playback.enabled = !0
    }
}
,
PZ.ui.export.frame = class {
    constructor(e) {
        this.export = e,
        this.editor = this.export.editor,
        this.FRAME_FORMATS = ["png", "jpg", "webp"],
        this.params = null
    }
    createOptionsPage(e) {
        let t = this.export.createPage("Image render", !e, () => !0);
        return this.params = {
            width: 1920,
            height: 1080,
            rate: 0,
            quality: 1,
            format: "png",
            start: 0,
            length: 1
        },
        t.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Format",
            items: ".png;.jpg;.webp",
            get: function() {
                return 0
            },
            set: function(e) {
                this.params.format = this.FRAME_FORMATS[e]
            }
        }, this)),
        t.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Quality",
            items: "very low;low;good;very good;best",
            get: function() {
                return 4
            },
            set: function(e) {
                this.params.quality = e / 4
            }
        }, this)),
        t.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        t.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Start",
            clickfn: async function() {
                let e = this.editor.sequence.properties.resolution.get();
                this.params.start = this.editor.playback.currentFrame,
                this.params.width = e[0],
                this.params.height = e[1],
                this.export.navigate(this.createProgressPage(), !0)
            }
        }, this)),
        t
    }
    createProgressPage() {
        this.editor.enabled = !1,
        this.editor.playback.enabled = !1;
        let e, t = new PZ.export(this.editor.sequence,this.params), i = this.export.createPage("Rendering...", !0, () => (clearInterval(e),
        t.unload(),
        this.renderCleanUp(),
        !0));
        i.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your image is being rendered. Please stay on this page to ensure your browser continues to process the image."
        }));
        var s = performance.now();
        this.render(t).then(function(i) {
            clearInterval(e),
            void 0 === i ? this.export.navigate(this.createErrorPage()) : (PZ.downloadBlob = i,
            PZ.downloadFilename = "image." + this.params.format,
            this.export.navigate(this.createFinishedPage())),
            t.unload()
        }
        .bind(this));
        let n = i.appendChild(PZ.ui.controls.legacy.generateProgressbar({
            get: function() {
                return 0 === t.framesRendered ? 0 : t.framesRendered / t.totalFrames * 100
            }
        }, this))
          , r = i.appendChild(PZ.ui.controls.legacy.generateValue({
            title: "Time left:",
            get: function() {
                var e = (performance.now() - s) / 1e3 / t.framesRendered
                  , i = (t.totalFrames - t.framesRendered) * e;
                return PZ.ui.controls.getTimeString(i)
            }
        }, this));
        return e = window.setInterval(function() {
            n.pz_update(),
            r.pz_update()
        }, 1e3),
        i
    }
    createFinishedPage() {
        let e = this.export.createPage("Render complete", !0, () => (this.renderCleanUp(),
        !0));
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Your render is finished! Click below to download."
        })),
        e.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        e.appendChild(PZ.ui.controls.legacy.generateButton({
            title: "Download your image",
            clickfn: function() {
                hiddenframe("/download.html")
            }
        }, this)),
        e.lastElementChild.style.cursor = "pointer",
        e
    }
    createErrorPage() {
        let e = this.export.createPage("Render error", !0, () => (this.renderCleanUp(),
        !0));
        return e.appendChild(PZ.ui.controls.legacy.generateDescription({
            content: "Unfortunately, your render could not be completed. Sorry about that."
        })),
        e
    }
    async render(e) {
        return await PZ.imageEncoder.encode(e, this.params)
    }
    renderCleanUp() {
        PZ.downloadBlob = null,
        this.editor.enabled = !0,
        this.editor.playback.enabled = !0
    }
}
,
PZ.ui.export.YouTube = class {
    static createParams() {
        return new PZ.ui.export.YouTube.params
    }
    static createOptionsPage(e, t, i) {
        let s = e.createPage(`YouTube Options: ${t.accountName}`, !0);
        const n = t.params;
        return s.appendChild(PZ.ui.controls.legacy.generateTextInput({
            title: "Title",
            get: function() {
                return n.title
            },
            set: function(e) {
                n.title = e,
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateTextArea({
            title: "Description",
            get: function() {
                return n.description
            },
            set: function(e) {
                n.description = e,
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateTextInput({
            title: "Tags",
            get: function() {
                return n.tags.join(",")
            },
            set: function(e) {
                n.tags = e.split(","),
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Category",
            items: PZ.ui.export.YouTube.categories.map(e => e.name).join(";"),
            get: function() {
                return PZ.ui.export.YouTube.categories.findIndex(e => e.id === n.categoryId)
            },
            set: function(e) {
                n.categoryId = PZ.ui.export.YouTube.categories[e].id,
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateSpacer()),
        s.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Privacy",
            items: PZ.ui.export.YouTube.privacyOptions.join(";"),
            get: function() {
                return PZ.ui.export.YouTube.privacyOptions.indexOf(n.privacyStatus)
            },
            set: function(e) {
                n.privacyStatus = PZ.ui.export.YouTube.privacyOptions[e],
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "License",
            items: PZ.ui.export.YouTube.licenseOptions.map(e => e.name).join(";"),
            get: function() {
                return PZ.ui.export.YouTube.licenseOptions.findIndex(e => e.id === n.license)
            },
            set: function(e) {
                n.license = PZ.ui.export.YouTube.licenseOptions[e].id,
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Emeddable",
            items: "no;yes",
            get: function() {
                return n.embeddable ? 1 : 0
            },
            set: function(e) {
                n.embeddable = !!e,
                i()
            }
        }, this)),
        s.appendChild(PZ.ui.controls.legacy.generateDropdown({
            title: "Public stats viewable",
            items: "no;yes",
            get: function() {
                return n.publicStatsViewable ? 1 : 0
            },
            set: function(e) {
                n.publicStatsViewable = !!e,
                i()
            }
        }, this)),
        s
    }
}
,
PZ.ui.export.YouTube.categories = [{
    id: 2,
    name: "Cars & Vehicles"
}, {
    id: 23,
    name: "Comedy"
}, {
    id: 27,
    name: "Education"
}, {
    id: 24,
    name: "Entertainment"
}, {
    id: 1,
    name: "Film & Animation"
}, {
    id: 20,
    name: "Gaming"
}, {
    id: 26,
    name: "How-to & Style"
}, {
    id: 10,
    name: "Music"
}, {
    id: 25,
    name: "News & Politics"
}, {
    id: 29,
    name: "Non-profits & Activism"
}, {
    id: 22,
    name: "People & Blogs"
}, {
    id: 15,
    name: "Pets & Animals"
}, {
    id: 28,
    name: "Science & Technology"
}, {
    id: 17,
    name: "Sport"
}, {
    id: 19,
    name: "Travel & Events"
}],
PZ.ui.export.YouTube.privacyOptions = ["public", "private", "unlisted"],
PZ.ui.export.YouTube.licenseOptions = [{
    id: "youtube",
    name: "Standard YouTube License"
}, {
    id: "creativeCommon",
    name: "Creative Commons License"
}],
PZ.ui.export.YouTube.params = class {
    constructor() {
        this.title = "",
        this.description = "",
        this.tags = [],
        this.categoryId = 22,
        this.privacyStatus = "public",
        this.publishAt = void 0,
        this.license = "youtube",
        this.embeddable = !0,
        this.publicStatsViewable = !0
    }
    validate() {
        return !(0 === this.title.length || this.title.length > 100 || this.title.includes("<") || this.title.includes(">")) && (!(this.description.length > 5e3 || this.description.includes("<") || this.description.includes(">")) && (!(this.tags.map(e => e.includes(" ") ? `"${e}"` : e).join(",").length > 500) && (void 0 === this.publishAt || "private" === this.privacyStatus)))
    }
}
,
PZ.ui.query = function(e) {
    void 0 !== e && this.parse(e)
}
,
PZ.ui.query.prototype.parse = function(e) {
    this.keys = {};
    for (var t = e.substring(1).split("&", 10), i = 0; i < t.length; i++) {
        var s = t[i].split("=", 2);
        s[0] && (this.keys[s[0]] = decodeURIComponent(s[1]))
    }
}
,
PZ.ui.query.prototype.toString = function() {
    for (var e = [], t = Object.keys(this.keys), i = 0; i < t.length; i++) {
        var s = t[i]
          , n = this.keys[s];
        n && e.push(encodeURIComponent(s) + "=" + encodeURIComponent(n))
    }
    var r = "?" + e.join("&");
    return 1 === r.length && (r = ""),
    r
}
,
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.CodeFlask = t()
}(this, function() {
    "use strict";
    const e = "\n.codeflask {\n  background: #2a2a2a;\n  color: #ccc;\n}\n\n.codeflask .token.punctuation {\n  color: #999;\n}\n\n.codeflask .token.keyword {\n  color: #7e8fb9;\n}\n\n.codeflask .token.operator {\n  color: #7eb993;\n}\n\n.codeflask .token.string {\n  color: #b97e7e;\n}\n\n.codeflask .token.comment {\n  color: #777;\n}\n\n.codeflask .token.function {\n  color: #7e8fb9;\n}\n\n.codeflask .token.boolean {\n  color: #7e8fb9;\n}\n\n.codeflask .token.number {\n  color: #7e8fb9;\n}\n\n.codeflask .token.selector {\n  color: #7e8fb9;\n}\n\n.codeflask .token.property {\n  color: #7e8fb9;\n}\n\n.codeflask .token.tag {\n  color: #7e8fb9;\n}\n\n.codeflask .token.attr-value {\n  color: #7e8fb9;\n}\n";
    var t, i, s;
    const n = `\n  .codeflask {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n  }\n\n  .codeflask, .codeflask * {\n    box-sizing: border-box;\n  }\n\n  .codeflask__pre {\n    pointer-events: none;\n    z-index: 3;\n    overflow: hidden;\n  }\n\n  .codeflask__textarea {\n    background: none;\n    border: none;\n    color: ${t = "caret-color",
    i = "#000",
    (CSS ? CSS.supports(t, i) : (s = (s = t).split("-").filter(e => !!e).map(e => e[0].toUpperCase() + e.substr(1)).join(""))[0].toLowerCase() + s.substr(1)in document.body.style) ? "#2a2a2a" : "#ccc"};\n    z-index: 1;\n    resize: none;\n    font-family: 'Source Code Pro',monospace;\n    -webkit-appearance: pre;\n    caret-color: #9e9e9e;\n    z-index: 2;\n    width: 100%;\n    height: 100%;\n  }\n\n  .codeflask--has-line-numbers .codeflask__textarea {\n    width: calc(100% - 40px);\n  }\n\n  .codeflask__code {\n    display: block;\n    font-family: 'Source Code Pro',monospace;\n    overflow: hidden;\n  }\n\n  .codeflask__flatten {\n    padding: 10px;\n    font-size: 13px;\n    line-height: 20px;\n    white-space: pre;\n    position: absolute;\n    top: 0;\n    left: 0;\n    overflow: auto;\n    margin: 0 !important;\n    outline: none;\n    text-align: left;\n  }\n\n  .codeflask--has-line-numbers .codeflask__flatten {\n    width: calc(100% - 40px);\n    left: 40px;\n  }\n\n  .codeflask__line-highlight {\n    position: absolute;\n    top: 10px;\n    left: 0;\n    width: 100%;\n    height: 20px;\n    background: rgba(0,0,0,0.1);\n    z-index: 1;\n  }\n\n  .codeflask__lines {\n    padding: 10px 4px;\n    font-size: 12px;\n    line-height: 20px;\n    font-family: 'Cousine', monospace;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 40px;\n    height: 100%;\n    text-align: right;\n    color: #8b8b8b;\n    z-index: 2;\n    background-color: #1d1d1d;\n  }\n\n  .codeflask__lines__line {\n    display: block;\n  }\n\n  .codeflask.codeflask--has-line-numbers {\n    padding-left: 40px;\n  }\n\n  .codeflask.codeflask--has-line-numbers:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 40px;\n    height: 100%;\n    background: #1f1f1f;\n    z-index: 1;\n  }\n`;
    function r(e, t, i) {
        const s = t || "codeflask-style"
          , n = i || document.head;
        if (!e)
            return !1;
        if (document.getElementById(s))
            return !0;
        const r = document.createElement("style");
        return r.innerHTML = e,
        r.id = s,
        n.appendChild(r),
        !0
    }
    const a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
    };
    function o(e) {
        return String(e).replace(/[&<>"'`=\/]/g, function(e) {
            return a[e]
        })
    }
    var l = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var h, c = (function(e) {
        var t = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
          , i = function() {
            var e = /\blang(?:uage)?-([\w-]+)\b/i
              , i = 0
              , s = t.Prism = {
                manual: t.Prism && t.Prism.manual,
                disableWorkerMessageHandler: t.Prism && t.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function(e) {
                        return e instanceof n ? new n(e.type,s.util.encode(e.content),e.alias) : "Array" === s.util.type(e) ? e.map(s.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++i
                        }),
                        e.__id
                    },
                    clone: function(e, t) {
                        var i = s.util.type(e);
                        switch (t = t || {},
                        i) {
                        case "Object":
                            if (t[s.util.objId(e)])
                                return t[s.util.objId(e)];
                            var n = {};
                            for (var r in t[s.util.objId(e)] = n,
                            e)
                                e.hasOwnProperty(r) && (n[r] = s.util.clone(e[r], t));
                            return n;
                        case "Array":
                            if (t[s.util.objId(e)])
                                return t[s.util.objId(e)];
                            n = [];
                            return t[s.util.objId(e)] = n,
                            e.forEach(function(e, i) {
                                n[i] = s.util.clone(e, t)
                            }),
                            n
                        }
                        return e
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var i = s.util.clone(s.languages[e]);
                        for (var n in t)
                            i[n] = t[n];
                        return i
                    },
                    insertBefore: function(e, t, i, n) {
                        var r = (n = n || s.languages)[e];
                        if (2 == arguments.length) {
                            for (var a in i = arguments[1])
                                i.hasOwnProperty(a) && (r[a] = i[a]);
                            return r
                        }
                        var o = {};
                        for (var l in r)
                            if (r.hasOwnProperty(l)) {
                                if (l == t)
                                    for (var a in i)
                                        i.hasOwnProperty(a) && (o[a] = i[a]);
                                o[l] = r[l]
                            }
                        return s.languages.DFS(s.languages, function(t, i) {
                            i === n[e] && t != e && (this[t] = o)
                        }),
                        n[e] = o
                    },
                    DFS: function(e, t, i, n) {
                        for (var r in n = n || {},
                        e)
                            e.hasOwnProperty(r) && (t.call(e, r, e[r], i || r),
                            "Object" !== s.util.type(e[r]) || n[s.util.objId(e[r])] ? "Array" !== s.util.type(e[r]) || n[s.util.objId(e[r])] || (n[s.util.objId(e[r])] = !0,
                            s.languages.DFS(e[r], t, r, n)) : (n[s.util.objId(e[r])] = !0,
                            s.languages.DFS(e[r], t, null, n)))
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    s.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function(e, t, i) {
                    var n = {
                        callback: i,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    s.hooks.run("before-highlightall", n);
                    for (var r, a = n.elements || e.querySelectorAll(n.selector), o = 0; r = a[o++]; )
                        s.highlightElement(r, !0 === t, n.callback)
                },
                highlightElement: function(i, n, r) {
                    for (var a, o, l = i; l && !e.test(l.className); )
                        l = l.parentNode;
                    l && (a = (l.className.match(e) || [, ""])[1].toLowerCase(),
                    o = s.languages[a]),
                    i.className = i.className.replace(e, "").replace(/\s+/g, " ") + " language-" + a,
                    i.parentNode && (l = i.parentNode,
                    /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + a));
                    var h = {
                        element: i,
                        language: a,
                        grammar: o,
                        code: i.textContent
                    };
                    if (s.hooks.run("before-sanity-check", h),
                    !h.code || !h.grammar)
                        return h.code && (s.hooks.run("before-highlight", h),
                        h.element.textContent = h.code,
                        s.hooks.run("after-highlight", h)),
                        void s.hooks.run("complete", h);
                    if (s.hooks.run("before-highlight", h),
                    n && t.Worker) {
                        var c = new Worker(s.filename);
                        c.onmessage = function(e) {
                            h.highlightedCode = e.data,
                            s.hooks.run("before-insert", h),
                            h.element.innerHTML = h.highlightedCode,
                            r && r.call(h.element),
                            s.hooks.run("after-highlight", h),
                            s.hooks.run("complete", h)
                        }
                        ,
                        c.postMessage(JSON.stringify({
                            language: h.language,
                            code: h.code,
                            immediateClose: !0
                        }))
                    } else
                        h.highlightedCode = s.highlight(h.code, h.grammar, h.language),
                        s.hooks.run("before-insert", h),
                        h.element.innerHTML = h.highlightedCode,
                        r && r.call(i),
                        s.hooks.run("after-highlight", h),
                        s.hooks.run("complete", h)
                },
                highlight: function(e, t, i) {
                    var r = {
                        code: e,
                        grammar: t,
                        language: i
                    };
                    return s.hooks.run("before-tokenize", r),
                    r.tokens = s.tokenize(r.code, r.grammar),
                    s.hooks.run("after-tokenize", r),
                    n.stringify(s.util.encode(r.tokens), r.language)
                },
                matchGrammar: function(e, t, i, n, r, a, o) {
                    var l = s.Token;
                    for (var h in i)
                        if (i.hasOwnProperty(h) && i[h]) {
                            if (h == o)
                                return;
                            var c = i[h];
                            c = "Array" === s.util.type(c) ? c : [c];
                            for (var p = 0; p < c.length; ++p) {
                                var d = c[p]
                                  , u = d.inside
                                  , m = !!d.lookbehind
                                  , f = !!d.greedy
                                  , y = 0
                                  , g = d.alias;
                                if (f && !d.pattern.global) {
                                    var b = d.pattern.toString().match(/[imuy]*$/)[0];
                                    d.pattern = RegExp(d.pattern.source, b + "g")
                                }
                                d = d.pattern || d;
                                for (var v = n, x = r; v < t.length; x += t[v].length,
                                ++v) {
                                    var P = t[v];
                                    if (t.length > e.length)
                                        return;
                                    if (!(P instanceof l)) {
                                        if (f && v != t.length - 1) {
                                            if (d.lastIndex = x,
                                            !(T = d.exec(e)))
                                                break;
                                            for (var k = T.index + (m ? T[1].length : 0), E = T.index + T[0].length, w = v, C = x, z = t.length; w < z && (C < E || !t[w].type && !t[w - 1].greedy); ++w)
                                                k >= (C += t[w].length) && (++v,
                                                x = C);
                                            if (t[v]instanceof l)
                                                continue;
                                            Z = w - v,
                                            P = e.slice(x, C),
                                            T.index -= x
                                        } else {
                                            d.lastIndex = 0;
                                            var T = d.exec(P)
                                              , Z = 1
                                        }
                                        if (T) {
                                            m && (y = T[1] ? T[1].length : 0);
                                            E = (k = T.index + y) + (T = T[0].slice(y)).length;
                                            var _ = P.slice(0, k)
                                              , j = P.slice(E)
                                              , S = [v, Z];
                                            _ && (++v,
                                            x += _.length,
                                            S.push(_));
                                            var L = new l(h,u ? s.tokenize(T, u) : T,g,T,f);
                                            if (S.push(L),
                                            j && S.push(j),
                                            Array.prototype.splice.apply(t, S),
                                            1 != Z && s.matchGrammar(e, t, i, v, x, !0, h),
                                            a)
                                                break
                                        } else if (a)
                                            break
                                    }
                                }
                            }
                        }
                },
                tokenize: function(e, t, i) {
                    var n = [e]
                      , r = t.rest;
                    if (r) {
                        for (var a in r)
                            t[a] = r[a];
                        delete t.rest
                    }
                    return s.matchGrammar(e, n, t, 0, 0, !1),
                    n
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var i = s.hooks.all;
                        i[e] = i[e] || [],
                        i[e].push(t)
                    },
                    run: function(e, t) {
                        var i = s.hooks.all[e];
                        if (i && i.length)
                            for (var n, r = 0; n = i[r++]; )
                                n(t)
                    }
                }
            }
              , n = s.Token = function(e, t, i, s, n) {
                this.type = e,
                this.content = t,
                this.alias = i,
                this.length = 0 | (s || "").length,
                this.greedy = !!n
            }
            ;
            if (n.stringify = function(e, t, i) {
                if ("string" == typeof e)
                    return e;
                if ("Array" === s.util.type(e))
                    return e.map(function(i) {
                        return n.stringify(i, t, e)
                    }).join("");
                var r = {
                    type: e.type,
                    content: n.stringify(e.content, t, i),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: i
                };
                if (e.alias) {
                    var a = "Array" === s.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(r.classes, a)
                }
                s.hooks.run("wrap", r);
                var o = Object.keys(r.attributes).map(function(e) {
                    return e + '="' + (r.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                }).join(" ");
                return "<" + r.tag + ' class="' + r.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + r.content + "</" + r.tag + ">"
            }
            ,
            !t.document)
                return t.addEventListener ? (s.disableWorkerMessageHandler || t.addEventListener("message", function(e) {
                    var i = JSON.parse(e.data)
                      , n = i.language
                      , r = i.code
                      , a = i.immediateClose;
                    t.postMessage(s.highlight(r, s.languages[n], n)),
                    a && t.close()
                }, !1),
                t.Prism) : t.Prism;
            var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
            return r && (s.filename = r.src,
            s.manual || r.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(s.highlightAll) : window.setTimeout(s.highlightAll, 16) : document.addEventListener("DOMContentLoaded", s.highlightAll))),
            t.Prism
        }();
        e.exports && (e.exports = i),
        void 0 !== l && (l.Prism = i),
        i.languages.markup = {
            comment: /<!--[\s\S]*?-->/,
            prolog: /<\?[\s\S]+?\?>/,
            doctype: /<!DOCTYPE[\s\S]+?>/i,
            cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
            tag: {
                pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                greedy: !0,
                inside: {
                    tag: {
                        pattern: /^<\/?[^\s>\/]+/i,
                        inside: {
                            punctuation: /^<\/?/,
                            namespace: /^[^\s>\/:]+:/
                        }
                    },
                    "attr-value": {
                        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                        inside: {
                            punctuation: [/^=/, {
                                pattern: /(^|[^\\])["']/,
                                lookbehind: !0
                            }]
                        }
                    },
                    punctuation: /\/?>/,
                    "attr-name": {
                        pattern: /[^\s>\/]+/,
                        inside: {
                            namespace: /^[^\s>\/:]+:/
                        }
                    }
                }
            },
            entity: /&#?[\da-z]{1,8};/i
        },
        i.languages.markup.tag.inside["attr-value"].inside.entity = i.languages.markup.entity,
        i.hooks.add("wrap", function(e) {
            "entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"))
        }),
        i.languages.xml = i.languages.markup,
        i.languages.html = i.languages.markup,
        i.languages.mathml = i.languages.markup,
        i.languages.svg = i.languages.markup,
        i.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
                pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
                inside: {
                    rule: /@[\w-]+/
                }
            },
            url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
            selector: /[^{}\s][^{};]*?(?=\s*\{)/,
            string: {
                pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
            },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /\B!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:]/
        },
        i.languages.css.atrule.inside.rest = i.languages.css,
        i.languages.markup && (i.languages.insertBefore("markup", "tag", {
            style: {
                pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
                lookbehind: !0,
                inside: i.languages.css,
                alias: "language-css",
                greedy: !0
            }
        }),
        i.languages.insertBefore("inside", "attr-value", {
            "style-attr": {
                pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                inside: {
                    "attr-name": {
                        pattern: /^\s*style/i,
                        inside: i.languages.markup.tag.inside
                    },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    "attr-value": {
                        pattern: /.+/i,
                        inside: i.languages.css
                    }
                },
                alias: "language-css"
            }
        }, i.languages.markup.tag)),
        i.languages.clike = {
            comment: [{
                pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                lookbehind: !0
            }, {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: !0,
                greedy: !0
            }],
            string: {
                pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: !0
            },
            "class-name": {
                pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
                lookbehind: !0,
                inside: {
                    punctuation: /[.\\]/
                }
            },
            keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
            boolean: /\b(?:true|false)\b/,
            function: /[a-z0-9_]+(?=\()/i,
            number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
            operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
            punctuation: /[{}[\];(),.:]/
        },
        i.languages.javascript = i.languages.extend("clike", {
            keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
            number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
            function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
            operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
        }),
        i.languages.insertBefore("javascript", "keyword", {
            regex: {
                pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
                lookbehind: !0,
                greedy: !0
            },
            "function-variable": {
                pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
                alias: "function"
            },
            constant: /\b[A-Z][A-Z\d_]*\b/
        }),
        i.languages.insertBefore("javascript", "string", {
            "template-string": {
                pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
                greedy: !0,
                inside: {
                    interpolation: {
                        pattern: /\${[^}]+}/,
                        inside: {
                            "interpolation-punctuation": {
                                pattern: /^\${|}$/,
                                alias: "punctuation"
                            },
                            rest: null
                        }
                    },
                    string: /[\s\S]+/
                }
            }
        }),
        i.languages.javascript["template-string"].inside.interpolation.inside.rest = i.languages.javascript,
        i.languages.markup && i.languages.insertBefore("markup", "tag", {
            script: {
                pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                lookbehind: !0,
                inside: i.languages.javascript,
                alias: "language-javascript",
                greedy: !0
            }
        }),
        i.languages.js = i.languages.javascript,
        i.languages.glsl = i.languages.extend("clike", {
            comment: [/\/\*[\s\S]*?\*\//, /\/\/(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/],
            number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ulf]*/i,
            keyword: /\b(?:attribute|const|uniform|varying|buffer|shared|coherent|volatile|restrict|readonly|writeonly|atomic_uint|layout|centroid|flat|smooth|noperspective|patch|sample|break|continue|do|for|while|switch|case|default|if|else|subroutine|in|out|inout|float|double|int|void|bool|true|false|invariant|precise|discard|return|d?mat[234](?:x[234])?|[ibdu]?vec[234]|uint|lowp|mediump|highp|precision|[iu]?sampler[123]D|[iu]?samplerCube|sampler[12]DShadow|samplerCubeShadow|[iu]?sampler[12]DArray|sampler[12]DArrayShadow|[iu]?sampler2DRect|sampler2DRectShadow|[iu]?samplerBuffer|[iu]?sampler2DMS(?:Array)?|[iu]?samplerCubeArray|samplerCubeArrayShadow|[iu]?image[123]D|[iu]?image2DRect|[iu]?imageCube|[iu]?imageBuffer|[iu]?image[12]DArray|[iu]?imageCubeArray|[iu]?image2DMS(?:Array)?|struct|common|partition|active|asm|class|union|enum|typedef|template|this|resource|goto|inline|noinline|public|static|extern|external|interface|long|short|half|fixed|unsigned|superp|input|output|hvec[234]|fvec[234]|sampler3DRect|filter|sizeof|cast|namespace|using)\b/
        }),
        i.languages.insertBefore("glsl", "comment", {
            preprocessor: {
                pattern: /(^[ \t]*)#(?:(?:define|undef|if|ifdef|ifndef|else|elif|endif|error|pragma|extension|version|line)\b)?/m,
                lookbehind: !0,
                alias: "builtin"
            }
        }),
        "undefined" != typeof self && self.Prism && self.document && document.querySelector && (self.Prism.fileHighlight = function() {
            var e = {
                js: "javascript",
                py: "python",
                rb: "ruby",
                ps1: "powershell",
                psm1: "powershell",
                sh: "bash",
                bat: "batch",
                h: "c",
                tex: "latex"
            };
            Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t) {
                for (var s, n = t.getAttribute("data-src"), r = t, a = /\blang(?:uage)?-([\w-]+)\b/i; r && !a.test(r.className); )
                    r = r.parentNode;
                if (r && (s = (t.className.match(a) || [, ""])[1]),
                !s) {
                    var o = (n.match(/\.(\w+)$/) || [, ""])[1];
                    s = e[o] || o
                }
                var l = document.createElement("code");
                l.className = "language-" + s,
                t.textContent = "",
                l.textContent = "Loading…",
                t.appendChild(l);
                var h = new XMLHttpRequest;
                h.open("GET", n, !0),
                h.onreadystatechange = function() {
                    4 == h.readyState && (h.status < 400 && h.responseText ? (l.textContent = h.responseText,
                    i.highlightElement(l)) : h.status >= 400 ? l.textContent = "✖ Error " + h.status + " while fetching file: " + h.statusText : l.textContent = "✖ Error: File does not exist or is empty")
                }
                ,
                h.send(null)
            }),
            i.plugins.toolbar && i.plugins.toolbar.registerButton("download-file", function(e) {
                var t = e.element.parentNode;
                if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-src") && t.hasAttribute("data-download-link")) {
                    var i = t.getAttribute("data-src")
                      , s = document.createElement("a");
                    return s.textContent = t.getAttribute("data-download-link-label") || "Download",
                    s.setAttribute("download", ""),
                    s.href = i,
                    s
                }
            })
        }
        ,
        document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight))
    }(h = {
        exports: {}
    }, h.exports),
    h.exports);
    return class {
        constructor(e, t) {
            if (!e)
                throw Error("CodeFlask expects a parameter which is Element or a String selector");
            if (!t)
                throw Error("CodeFlask expects an object containing options as second parameter");
            if (e.nodeType)
                this.editorRoot = e;
            else {
                const t = document.querySelector(e);
                t && (this.editorRoot = t)
            }
            this.opts = t,
            this.startEditor()
        }
        startEditor() {
            if (!r(n, null, this.opts.styleParent))
                throw Error("Failed to inject CodeFlask CSS.");
            this.createWrapper(),
            this.createTextarea(),
            this.createPre(),
            this.createCode(),
            this.runOptions(),
            this.listenTextarea(),
            this.populateDefault(),
            this.updateCode(this.code)
        }
        createWrapper() {
            this.code = this.editorRoot.innerHTML,
            this.editorRoot.innerHTML = "",
            this.elWrapper = this.createElement("div", this.editorRoot),
            this.elWrapper.classList.add("codeflask")
        }
        createTextarea() {
            this.elTextarea = this.createElement("textarea", this.elWrapper),
            this.elTextarea.classList.add("codeflask__textarea", "codeflask__flatten")
        }
        createPre() {
            this.elPre = this.createElement("pre", this.elWrapper),
            this.elPre.classList.add("codeflask__pre", "codeflask__flatten")
        }
        createCode() {
            this.elCode = this.createElement("code", this.elPre),
            this.elCode.classList.add("codeflask__code", `language-${this.opts.language || "html"}`)
        }
        createLineNumbers() {
            this.elLineNumbers = this.createElement("div", this.elWrapper),
            this.elLineNumbers.classList.add("codeflask__lines"),
            this.setLineNumber()
        }
        createElement(e, t) {
            const i = document.createElement(e);
            return t.appendChild(i),
            i
        }
        runOptions() {
            this.opts.rtl = this.opts.rtl || !1,
            this.opts.tabSize = this.opts.tabSize || 2,
            this.opts.enableAutocorrect = this.opts.enableAutocorrect || !1,
            this.opts.lineNumbers = this.opts.lineNumbers || !1,
            this.opts.defaultTheme = !1 !== this.opts.defaultTheme,
            this.opts.areaId = this.opts.areaId || null,
            this.opts.ariaLabelledby = this.opts.ariaLabelledby || null,
            this.opts.readonly = this.opts.readonly || null,
            "boolean" != typeof this.opts.handleTabs && (this.opts.handleTabs = !0),
            !0 === this.opts.rtl && (this.elTextarea.setAttribute("dir", "rtl"),
            this.elPre.setAttribute("dir", "rtl")),
            !1 === this.opts.enableAutocorrect && (this.elTextarea.setAttribute("spellcheck", "false"),
            this.elTextarea.setAttribute("autocapitalize", "off"),
            this.elTextarea.setAttribute("autocomplete", "off"),
            this.elTextarea.setAttribute("autocorrect", "off")),
            this.opts.lineNumbers && (this.elWrapper.classList.add("codeflask--has-line-numbers"),
            this.createLineNumbers()),
            this.opts.defaultTheme && r(e, "theme-default", this.opts.styleParent),
            this.opts.areaId && this.elTextarea.setAttribute("id", this.opts.areaId),
            this.opts.ariaLabelledby && this.elTextarea.setAttribute("aria-labelledby", this.opts.ariaLabelledby),
            this.opts.readonly && this.enableReadonlyMode()
        }
        updateLineNumbersCount() {
            let e = "";
            for (let t = 1; t <= this.lineNumber; t++)
                e += `<span class="codeflask__lines__line">${t}</span>`;
            this.elLineNumbers.innerHTML = e
        }
        listenTextarea() {
            this.elTextarea.addEventListener("input", e => {
                this.code = e.target.value,
                this.elCode.innerHTML = o(e.target.value),
                this.highlight(),
                setTimeout( () => {
                    this.runUpdate(),
                    this.setLineNumber()
                }
                , 1)
            }
            ),
            this.elTextarea.addEventListener("keydown", e => {
                this.handleTabs(e),
                this.handleSelfClosingCharacters(e),
                this.handleNewLineIndentation(e)
            }
            ),
            this.elTextarea.addEventListener("scroll", e => {
                this.elPre.style.transform = `translate3d(-${e.target.scrollLeft}px, -${e.target.scrollTop}px, 0)`,
                this.elLineNumbers && (this.elLineNumbers.style.transform = `translate3d(0, -${e.target.scrollTop}px, 0)`)
            }
            )
        }
        handleTabs(e) {
            if (this.opts.handleTabs) {
                if (9 !== e.keyCode)
                    return;
                e.preventDefault(),
                e.keyCode;
                const t = this.elTextarea.selectionStart
                  , i = this.elTextarea.selectionEnd
                  , s = `${this.code.substring(0, t)}${" ".repeat(this.opts.tabSize)}${this.code.substring(i)}`;
                this.updateCode(s),
                this.elTextarea.selectionEnd = i + this.opts.tabSize
            }
        }
        handleSelfClosingCharacters(e) {
            const t = e.key;
            if (["(", "[", "{", "<"].includes(t))
                switch (t) {
                case "(":
                    this.closeCharacter(")");
                    break;
                case "[":
                    this.closeCharacter("]");
                    break;
                case "{":
                    this.closeCharacter("}");
                    break;
                case "<":
                    this.closeCharacter(">")
                }
        }
        setLineNumber() {
            this.lineNumber = this.code.split("\n").length,
            this.opts.lineNumbers && this.updateLineNumbersCount()
        }
        handleNewLineIndentation(e) {
            e.keyCode
        }
        closeCharacter(e) {
            const t = this.elTextarea.selectionStart
              , i = this.elTextarea.selectionEnd
              , s = `${this.code.substring(0, t)}${e}${this.code.substring(i)}`;
            this.updateCode(s),
            this.elTextarea.selectionEnd = i
        }
        updateCode(e) {
            this.code = e,
            this.elTextarea.value = e,
            this.elCode.innerHTML = o(e),
            this.highlight(),
            this.setLineNumber(),
            setTimeout(this.runUpdate.bind(this), 1)
        }
        updateLanguage(e) {
            const t = this.opts.language;
            this.elCode.classList.remove(`language-${t}`),
            this.elCode.classList.add(`language-${e}`),
            this.opts.language = e,
            this.highlight()
        }
        addLanguage(e, t) {
            c.languages[e] = t
        }
        populateDefault() {
            this.updateCode(this.code)
        }
        highlight() {
            c.highlightElement(this.elCode, !1)
        }
        onUpdate(e) {
            if (e && "[object Function]" !== {}.toString.call(e))
                throw Error("CodeFlask expects callback of type Function");
            this.updateCallBack = e
        }
        getCode() {
            return this.code
        }
        runUpdate() {
            this.updateCallBack && this.updateCallBack(this.code)
        }
        enableReadonlyMode() {
            this.elTextarea.setAttribute("readonly", !0)
        }
        disableReadonlyMode() {
            this.elTextarea.removeAttribute("readonly")
        }
    }
}),
PZ.ui.expression = function(e, t) {
    PZ.ui.panel.call(this, e),
    this.el.style = "background-color: #242424;",
    this.canDuplicate = !0,
    this.minWidth = 45,
    this.minHeight = 45,
    this.property = t.property,
    this.propertyOps = new PZ.ui.properties(this.editor),
    this.object = this.property.parentObject,
    this.parentChangedHandler = ( () => {
        this.object.parent || (this.el.innerHTML = "")
    }
    ),
    this.object.onParentChanged.watch(this.parentChangedHandler)
}
,
PZ.ui.expression.prototype.create = function() {
    this.editEl = document.createElement("div"),
    this.editEl.style = "position: absolute; left: 0; right: 0; top: 0; bottom: 20px;",
    this.el.appendChild(this.editEl),
    this.statusEl = document.createElement("div"),
    this.statusEl.style = "font-family: 'Source Code Pro', monospace; position: absolute; bottom: 0; left:0; right: 0; height: 20px; color: #aaa; background: #111; font-size: 14px; padding: 2px; box-sizing: border-box;",
    this.el.appendChild(this.statusEl),
    this.codeFlask = new CodeFlask(this.editEl,{
        styleParent: this.el.ownerDocument.head,
        language: "js",
        lineNumbers: !0
    }),
    this.expressionChangedHandler = ( () => {
        let e = ""
          , t = "";
        this.property.expression && (e = this.property.expression.source,
        this.property.expression.error && (t = this.property.expression.error)),
        this.selfTriggered ? (this.selfTriggered = !1,
        this.statusEl.innerText = t) : (this.codeFlask.updateCode(e),
        this.statusEl.innerText = t)
    }
    ),
    this.property.onExpressionChanged.watch(this.expressionChangedHandler, !0),
    this.codeFlask.elTextarea.addEventListener("keydown", e => {
        e.ctrlKey && "Enter" === e.key && (this.editor.history.startOperation(),
        this.propertyOps.setExpression({
            property: this.property.getAddress(),
            expression: this.codeFlask.getCode()
        }),
        this.editor.history.finishOperation(),
        this.selfTriggered = !0)
    }
    )
}
,
PZ.ui.expression.prototype.resize = function() {}
,
PZ.ui.expression.prototype.unload = function() {}
,
PZ.ui.shader = function(e, t) {
    PZ.ui.panel.call(this, e),
    this.el.style = "background-color: #242424;",
    this.canDuplicate = !0,
    this.minWidth = 45,
    this.minHeight = 45,
    this.property = t.property,
    this.propertyOps = new PZ.ui.properties(this.editor),
    this.object = this.property.parentObject,
    this.parentChangedHandler = ( () => {
        this.object.parent || (this.el.innerHTML = "")
    }
    ),
    this.object.onParentChanged.watch(this.parentChangedHandler),
    this.shaderErrorHandler = (e => {
        this.statusEl.innerText = e,
        this.statusEl.title = e
    }
    ),
    this.object.onShaderError.watch(this.shaderErrorHandler)
}
,
PZ.ui.shader.prototype.create = function() {
    this.editEl = document.createElement("div"),
    this.editEl.style = "position: absolute; left: 0; right: 0; top: 0; bottom: 20px;",
    this.el.appendChild(this.editEl),
    this.statusEl = document.createElement("div"),
    this.statusEl.style = "font-family: 'Source Code Pro', monospace; position: absolute; bottom: 0; left:0; right: 0; height: 20px; color: #aaa; background: #111; font-size: 14px; padding: 2px; box-sizing: border-box;",
    this.el.appendChild(this.statusEl),
    this.codeFlask = new CodeFlask(this.editEl,{
        styleParent: this.el.ownerDocument.head,
        language: "glsl",
        lineNumbers: !0
    }),
    this.shaderChangedHandler = ( () => {
        let e = "";
        e = this.property.get(),
        this.selfTriggered ? (this.selfTriggered = !1,
        this.statusEl.innerText = "",
        this.statusEl.title = "") : (this.codeFlask.updateCode(e),
        this.statusEl.innerText = "",
        this.statusEl.title = "")
    }
    ),
    this.property.onChanged.watch(this.shaderChangedHandler, !0),
    this.codeFlask.elTextarea.addEventListener("keydown", e => {
        e.ctrlKey && "Enter" === e.key && (this.editor.history.startOperation(),
        this.propertyOps.setValue({
            property: this.property.getAddress(),
            value: this.codeFlask.getCode()
        }),
        this.editor.history.finishOperation(),
        this.selfTriggered = !0)
    }
    )
}
,
PZ.ui.shader.prototype.resize = function() {}
,
PZ.ui.shader.prototype.unload = function() {}
;
const SVGNS = "http://www.w3.org/2000/svg";
PZ.ui.graph = class extends PZ.ui.panel {
    constructor(e, t) {
        super(e),
        this.title = "Graph",
        this.icon = "project",
        this.propertyOps = new PZ.ui.properties(this.editor),
        PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
        this.objects = null,
        this.objectAdded_bound = this.objectAdded.bind(this),
        this.objectRemoved_bound = this.objectRemoved.bind(this),
        this.onObjectsChanged.watch(e => {
            e && (e.onObjectAdded.unwatch(this.objectAdded_bound),
            e.onObjectRemoved.unwatch(this.objectRemoved_bound)),
            this.objects ? (this.objects.onObjectAdded.watch(this.objectAdded_bound),
            this.objects.onObjectRemoved.watch(this.objectRemoved_bound)) : this.objectsChanged()
        }
        ),
        this.selection = new PZ.objectList,
        this.properties = new PZ.objectList(null,Object),
        this.options = {
            curveLineWidth: 2,
            keyframeSize: 8,
            handleSize: 8,
            cursorLineWidth: 1,
            shapeRendering: "auto"
        },
        this.width = 1,
        this.height = 1,
        this.centerX = 0,
        this.centerY = 0,
        this.zoomX = 1,
        this.zoomY = 1,
        Object.assign(this.options, t),
        this._updateFn = this.update.bind(this),
        this.onEnabledChanged.watch( () => {
            this.enabled ? this.animFrameReq = requestAnimationFrame(this._updateFn) : cancelAnimationFrame(this.animFrameReq)
        }
        ),
        this.selectNewKeyframes = !1,
        this.create()
    }
    updateViewBox() {
        let e = this.centerX - .5 * this.width * this.zoomX
          , t = this.centerY - .5 * this.height * this.zoomY
          , i = this.width * this.zoomX
          , s = this.height * this.zoomY;
        this.svg.setAttributeNS(null, "viewBox", e + " " + t + " " + i + " " + s),
        this.cursor.setAttributeNS(null, "y1", this.centerY - .5 * this.height * this.zoomY),
        this.cursor.setAttributeNS(null, "y2", this.centerY + .5 * this.height * this.zoomY),
        this.xGrid.update(),
        this.yGrid.update();
        for (let e = 2; e < this.svg.children.length - 1; e++) {
            let t = this.svg.children[e]
              , i = t.children[0]
              , s = t.children[1]
              , n = t.children[2];
            this.updateCurve(i.firstElementChild, null, s.firstElementChild.pz_object),
            this.updateCurve(i.lastElementChild, s.lastElementChild.pz_object, null);
            for (let e = 0; e < s.children.length; e++)
                this.updateKeyframe(s.children[e]);
            for (let e = 0; e < n.children.length; e++)
                this.updateHandles(n.children[e])
        }
    }
    createGraph() {
        this.svg = document.createElementNS(SVGNS, "svg"),
        this.svg.setAttributeNS(null, "preserveAspectRatio", "none"),
        this.svg.setAttributeNS(null, "width", "100%"),
        this.svg.setAttributeNS(null, "height", "100%"),
        this.svg.setAttributeNS(null, "shape-rendering", this.options.shapeRendering),
        this.el.appendChild(this.svg)
    }
    createCursor() {
        let e = document.createElementNS(SVGNS, "g");
        e.setAttributeNS(null, "fill", "none"),
        e.setAttributeNS(null, "stroke", "#ff0000aa"),
        e.setAttributeNS(null, "stroke-width", this.options.cursorLineWidth + "px"),
        e.style.pointerEvents = "none",
        this.svg.appendChild(e),
        this.cursor = document.createElementNS(SVGNS, "line"),
        this.cursor.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        e.appendChild(this.cursor)
    }
    mouseWheel(e) {
        let t = 1;
        e.deltaY < 0 ? t = .95 : e.deltaY > 0 && (t = 1.05),
        e.ctrlKey || (this.zoomX *= t),
        e.shiftKey || (this.zoomY *= t),
        this.updateViewBox(),
        e.preventDefault()
    }
    keyframeDragStart(e) {
        this.ctx.el.focus();
        let t = this.ctx.svg
          , i = t.getBoundingClientRect();
        this.origin = {
            x: i.left,
            y: i.top
        },
        this.currentPt = {
            x: e.pageX - this.origin.x,
            y: e.pageY - this.origin.y
        },
        this.startPt = {
            x: this.currentPt.x,
            y: this.currentPt.y
        },
        this.kf = e.currentTarget,
        this.startFrame = this.kf.pz_object.absoluteFrame,
        this.lastFrame = this.startFrame,
        this.deltaFrames = 0,
        this.startValue = this.kf.pz_object.value,
        this.lastValue = this.startValue,
        this.deltaUnits = 0,
        this.kf.classList.contains("selected") ? this.originalState = !0 : (this.originalState = !1,
        e.shiftKey || this.ctx.deselectAllKeyframes(),
        this.ctx.selectKeyframe(this.kf));
        let s = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
          , n = this.ctx.centerY - .5 * this.ctx.height * this.ctx.zoomY;
        this.offset = {
            x: this.currentPt.x - (this.startFrame - s) / this.ctx.zoomX,
            y: this.currentPt.y - (-this.startValue - n) / this.ctx.zoomY
        },
        this.moved = !1,
        this.keyframeEls = Array.from(t.getElementsByClassName("selected")),
        this.keyframeEls.forEach(e => e.pz_oldFrame = e.pz_object.frame),
        this.keyframeEls.forEach(e => e.pz_oldValue = e.pz_object.value),
        e.stopPropagation(),
        this.ctx.editor.history.startOperation()
    }
    keyframeDrag(e) {
        this.currentPt.x = e.pageX - this.origin.x,
        this.currentPt.y = e.pageY - this.origin.y,
        this.updateFrame = !e.ctrlKey,
        this.updateValue = !e.shiftKey
    }
    keyframeDragUpdate() {
        if (!this.moved && Math.abs(this.currentPt.x - this.startPt.x) + Math.abs(this.currentPt.y - this.startPt.y) < 4)
            return;
        this.moved = !0;
        this.ctx.svg;
        let e = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
          , t = this.ctx.centerY - .5 * this.ctx.height * this.ctx.zoomY
          , i = (this.currentPt.x - this.offset.x) * this.ctx.zoomX + e
          , s = -((this.currentPt.y - this.offset.y) * this.ctx.zoomY + t);
        this.deltaFrames = i - this.lastFrame,
        this.lastFrame = i,
        this.deltaUnits = s - this.lastValue,
        this.lastValue = s;
        for (let e = 0; e < this.keyframeEls.length; e++) {
            let t = this.keyframeEls[e]
              , n = t.pz_object
              , r = t.parentElement.parentElement.pz_valueScale;
            this.updateFrame && (n.frame = Math.round(t.pz_oldFrame + (i - this.startFrame))),
            this.updateValue && (n.value = t.pz_oldValue + (s - this.startValue) / r);
            let a = t.previousElementSibling ? t.previousElementSibling.pz_object : null
              , o = t.nextElementSibling ? t.nextElementSibling.pz_object : null;
            this.ctx.updateKeyframe(t),
            this.ctx.updateHandles(t.pz_handles),
            this.ctx.updateCurve(t.pz_curveLeft, a, n),
            this.ctx.updateCurve(t.pz_curveRight, n, o)
        }
    }
    keyframeDragEnd(e) {
        if (e.shiftKey && !1 === this.moved && !0 === this.originalState && this.ctx.deselectKeyframe(this.kf),
        !0 === this.moved) {
            let e = this.lastFrame - this.startFrame > 0;
            this.ctx.selectNewKeyframes = !0,
            this.ctx.finishMovingKeyframes(e),
            this.ctx.selectNewKeyframes = !1
        }
        this.ctx.editor.history.finishOperation()
    }
    finishMovingKeyframes(e) {
        let t = this.svg.children;
        for (let i = 0; i < t.length; i++) {
            let s = Array.from(t[i].querySelectorAll(".selected"));
            if (!s.length)
                continue;
            e && s.reverse();
            let n = t[i].pz_object
              , r = this.propertyOps.startMove(n, s.length)
              , a = new Map;
            for (let e = 0; e < s.length; e++) {
                let t = s[e].pz_oldFrame
                  , i = s[e].pz_object.frame;
                r[e].oldFrame = i,
                r[e].newFrame = t,
                a.set(r[e], s[e].pz_object)
            }
            let o = new Set(s.map(e => e.pz_object));
            this.propertyOps.finishMove(n, o, r, a);
            for (let e = 0; e < r.length; e++) {
                let t = s[e].pz_oldValue
                  , i = s[e].pz_object.frame;
                this.editor.history.pushCommand(PZ.ui.properties.prototype.setValue.bind(this), {
                    property: r[e].property,
                    value: t,
                    frame: i
                })
            }
        }
    }
    handleDragStart(e) {
        this.ctx.el.focus();
        let t = this.ctx.svg
          , i = t.getBoundingClientRect();
        this.origin = {
            x: i.left,
            y: i.top
        },
        this.currentPt = {
            x: e.pageX - this.origin.x,
            y: e.pageY - this.origin.y
        },
        this.startPt = {
            x: this.currentPt.x,
            y: this.currentPt.y
        },
        this.handle = e.currentTarget,
        this.cpIdx = this.handle.parentElement.children[0] == this.handle ? 0 : 1;
        let s = this.handle.parentElement.pz_object;
        this.startFrame = s.controlPoints[this.cpIdx][0] + s.frame,
        this.lastFrame = this.startFrame,
        this.deltaFrames = 0,
        this.startValue = s.controlPoints[this.cpIdx][1] + s.value,
        this.lastValue = this.startValue,
        this.deltaUnits = 0;
        let n = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
          , r = this.ctx.centerY - .5 * this.ctx.height * this.ctx.zoomY;
        this.offset = {
            x: this.currentPt.x - (this.startFrame - n) / this.ctx.zoomX,
            y: this.currentPt.y - (-this.startValue - r) / this.ctx.zoomY
        },
        this.moved = !1,
        this.keyframeEls = Array.from(t.getElementsByClassName("selected")),
        this.keyframeEls.forEach(e => e.pz_oldControlPoints = JSON.parse(JSON.stringify(e.pz_object.controlPoints))),
        e.stopPropagation(),
        this.ctx.editor.history.startOperation()
    }
    handleDrag(e) {
        this.currentPt.x = e.pageX - this.origin.x,
        this.currentPt.y = e.pageY - this.origin.y,
        this.breakTangent = e.shiftKey
    }
    handleDragUpdate() {
        if (!this.moved && Math.abs(this.currentPt.x - this.startPt.x) + Math.abs(this.currentPt.y - this.startPt.y) < 4)
            return;
        this.moved = !0;
        this.ctx.svg;
        let e = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
          , t = this.ctx.centerY - .5 * this.ctx.height * this.ctx.zoomY
          , i = (this.currentPt.x - this.offset.x) * this.ctx.zoomX + e
          , s = -((this.currentPt.y - this.offset.y) * this.ctx.zoomY + t);
        this.deltaFrames = i - this.lastFrame,
        this.lastFrame = i,
        this.deltaUnits = s - this.lastValue,
        this.lastValue = s;
        for (let e = 0; e < this.keyframeEls.length; e++) {
            let t = this.keyframeEls[e]
              , n = t.pz_object
              , r = t.parentElement.parentElement.pz_valueScale
              , a = n.controlPoints[this.cpIdx]
              , o = t.pz_oldControlPoints[this.cpIdx][0] + (i - this.startFrame);
            if (0 === this.cpIdx ? a[0] = Math.min(o, 0) : a[0] = Math.max(o, 0),
            a[1] = t.pz_oldControlPoints[this.cpIdx][1] + (s - this.startValue) / r,
            n.continuousTangent && !this.breakTangent) {
                let e = n.controlPoints[1 & ~this.cpIdx]
                  , t = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2))
                  , i = Math.atan2(a[1], a[0]) + Math.PI;
                e[0] = t * Math.cos(i),
                e[1] = t * Math.sin(i)
            }
            let l = t.previousElementSibling ? t.previousElementSibling.pz_object : null
              , h = t.nextElementSibling ? t.nextElementSibling.pz_object : null;
            this.ctx.updateHandles(t.pz_handles),
            this.ctx.updateCurve(t.pz_curveLeft, l, n),
            this.ctx.updateCurve(t.pz_curveRight, n, h)
        }
    }
    handleDragEnd(e) {
        !0 === this.moved && this.ctx.finishMovingHandles(this.breakTangent),
        this.ctx.editor.history.finishOperation()
    }
    finishMovingHandles(e) {
        let t = this.svg.children;
        for (let i = 0; i < t.length; i++) {
            let s = Array.from(t[i].querySelectorAll(".selected"));
            if (!s.length)
                continue;
            let n = t[i].pz_object.getAddress();
            for (let t = 0; t < s.length; t++) {
                let i = s[t]
                  , r = i.pz_object;
                if (e && r.continuousTangent) {
                    let e = {
                        property: n,
                        frame: r.frame,
                        continuous: !1
                    };
                    this.propertyOps.setContinuousTangent(e)
                }
                this.editor.history.pushCommand(PZ.ui.properties.prototype.setControlPoints.bind(this), {
                    property: n,
                    frame: r.frame,
                    controlPoints: i.pz_oldControlPoints
                })
            }
        }
    }
    onKeyframeCreated(e, t) {
        let i = this.createKeyframe(t)
          , s = e.children[1]
          , n = t.frame
          , r = s.firstElementChild;
        for (; r && !(r.pz_object.frame >= n); )
            r = r.nextElementSibling;
        s.insertBefore(i, r),
        this.updateKeyframe(i);
        let a = e.children[0]
          , o = i.previousElementSibling
          , l = i.nextElementSibling;
        o ? l ? (i.pz_curveLeft = this.createCurve(),
        i.pz_curveRight = l.pz_curveLeft,
        o.pz_curveRight = i.pz_curveLeft,
        a.insertBefore(i.pz_curveLeft, i.pz_curveRight),
        this.updateCurve(i.pz_curveLeft, o.pz_object, i.pz_object),
        this.updateCurve(i.pz_curveRight, i.pz_object, l.pz_object)) : (i.pz_curveLeft = o.pz_curveRight,
        i.pz_curveRight = this.createCurve(),
        a.appendChild(i.pz_curveRight),
        this.updateCurve(i.pz_curveLeft, o.pz_object, i.pz_object),
        this.updateCurve(i.pz_curveRight, i.pz_object, null)) : l ? (i.pz_curveLeft = this.createCurve(),
        i.pz_curveRight = l.pz_curveLeft,
        a.insertBefore(i.pz_curveLeft, i.pz_curveRight),
        this.updateCurve(i.pz_curveLeft, null, i.pz_object),
        this.updateCurve(i.pz_curveRight, i.pz_object, l.pz_object)) : (i.pz_curveLeft = this.createCurve(null, i.pz_object),
        i.pz_curveRight = this.createCurve(i.pz_object, null),
        a.appendChild(i.pz_curveLeft),
        a.appendChild(i.pz_curveRight),
        this.updateCurve(i.pz_curveLeft, null, i.pz_object),
        this.updateCurve(i.pz_curveRight, i.pz_object, null)),
        this.selectNewKeyframes && this.selectKeyframe(i)
    }
    onKeyframeDeleted(e, t) {
        let i = e.children[1].firstElementChild;
        for (; i && i.pz_object !== t; )
            i = i.nextElementSibling;
        if (!i)
            return;
        let s = i.previousElementSibling
          , n = i.nextElementSibling;
        s ? (i.pz_curveRight.remove(),
        n ? (n.pz_curveLeft = s.pz_curveRight,
        this.updateCurve(i.pz_curveLeft, s.pz_object, n.pz_object)) : this.updateCurve(i.pz_curveLeft, s.pz_object, null)) : (i.pz_curveLeft.remove(),
        n ? this.updateCurve(i.pz_curveRight, null, n.pz_object) : i.pz_curveRight.remove()),
        i.pz_handles && i.pz_handles.remove(),
        i.remove()
    }
    onKeyframeMoved(e, t, i) {
        this.onKeyframeDeleted(e, i),
        this.onKeyframeCreated(e, i)
    }
    onKeyframeChanged(e, t) {
        let i = e.children[1].firstElementChild;
        for (; i && i.pz_object !== t; )
            i = i.nextElementSibling;
        if (!i)
            return;
        let s = i.previousElementSibling ? i.previousElementSibling.pz_object : null
          , n = i.pz_object
          , r = i.nextElementSibling ? i.nextElementSibling.pz_object : null;
        this.updateKeyframe(i),
        this.updateCurve(i.pz_curveLeft, s, n),
        this.updateCurve(i.pz_curveRight, n, r),
        i.pz_handles && this.updateHandles(i.pz_handles)
    }
    createHandles(e) {
        let t = document.createElementNS(SVGNS, "g");
        t.pz_object = e;
        let i = document.createElementNS(SVGNS, "ellipse");
        i.setAttributeNS(null, "fill", "#ccc"),
        i.setAttributeNS(null, "stroke", "transparent"),
        i.setAttributeNS(null, "stroke-width", 2 * this.options.handleSize + "px"),
        i.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        this.handle_drag.addElts(i),
        t.appendChild(i);
        let s = document.createElementNS(SVGNS, "ellipse");
        s.setAttributeNS(null, "fill", "#ccc"),
        s.setAttributeNS(null, "stroke", "transparent"),
        s.setAttributeNS(null, "stroke-width", 2 * this.options.handleSize + "px"),
        s.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        this.handle_drag.addElts(s),
        t.appendChild(s);
        let n = document.createElementNS(SVGNS, "line");
        n.setAttributeNS(null, "fill", "none"),
        n.setAttributeNS(null, "stroke", "#ccc"),
        n.setAttributeNS(null, "stroke-width", "1px"),
        n.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        n.style.pointerEvents = "none",
        t.appendChild(n);
        let r = document.createElementNS(SVGNS, "line");
        return r.setAttributeNS(null, "fill", "none"),
        r.setAttributeNS(null, "stroke", "#ccc"),
        r.setAttributeNS(null, "stroke-width", "1px"),
        r.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        r.style.pointerEvents = "none",
        t.appendChild(r),
        t
    }
    updateHandles(e) {
        let t = e.pz_object
          , i = e.parentElement.parentElement.pz_valueScale;
        const s = this.options.handleSize;
        e.style.transform = `translate(${t.frame}px, ${-t.value * i}px)`;
        let n = e.children[0];
        n.setAttributeNS(null, "rx", .5 * s * this.zoomX),
        n.setAttributeNS(null, "ry", .5 * s * this.zoomY),
        n.setAttributeNS(null, "cx", t.controlPoints[0][0]),
        n.setAttributeNS(null, "cy", -t.controlPoints[0][1] * i);
        let r = e.children[1];
        r.setAttributeNS(null, "rx", .5 * s * this.zoomX),
        r.setAttributeNS(null, "ry", .5 * s * this.zoomY),
        r.setAttributeNS(null, "cx", t.controlPoints[1][0]),
        r.setAttributeNS(null, "cy", -t.controlPoints[1][1] * i);
        let a = e.children[2];
        a.setAttributeNS(null, "x1", "0"),
        a.setAttributeNS(null, "y1", "0"),
        a.setAttributeNS(null, "x2", t.controlPoints[0][0]),
        a.setAttributeNS(null, "y2", -t.controlPoints[0][1] * i);
        let o = e.children[3];
        o.setAttributeNS(null, "x1", "0"),
        o.setAttributeNS(null, "y1", "0"),
        o.setAttributeNS(null, "x2", t.controlPoints[1][0]),
        o.setAttributeNS(null, "y2", -t.controlPoints[1][1] * i)
    }
    createKeyframe(e) {
        let t = document.createElementNS(SVGNS, "rect");
        return t.setAttributeNS(null, "fill", "#000"),
        t.setAttributeNS(null, "stroke", "transparent"),
        t.setAttributeNS(null, "stroke-width", 2 * this.options.keyframeSize + "px"),
        t.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        t.pz_object = e,
        t.pz_curveLeft = null,
        t.pz_curveRight = null,
        t.pz_handles = null,
        this.keyframe_drag.addElts(t),
        t
    }
    updateKeyframe(e) {
        let t = e.pz_object
          , i = e.parentElement.parentElement.pz_valueScale;
        const s = this.options.keyframeSize;
        e.setAttributeNS(null, "width", s * this.zoomX),
        e.setAttributeNS(null, "height", s * this.zoomY),
        e.setAttributeNS(null, "x", t.frame - .5 * s * this.zoomX),
        e.setAttributeNS(null, "y", -t.value * i - .5 * s * this.zoomY)
    }
    selectKeyframe(e) {
        e.classList.contains("selected") || (e.pz_handles = this.createHandles(e.pz_object),
        e.parentElement.parentElement.children[2].appendChild(e.pz_handles),
        this.updateHandles(e.pz_handles),
        e.classList.add("selected"),
        e.setAttributeNS(null, "fill", "#ccc"))
    }
    deselectKeyframe(e) {
        e.classList.contains("selected") && (e.pz_handles.remove(),
        e.pz_handles = null,
        e.classList.remove("selected"),
        e.setAttributeNS(null, "fill", "#000"))
    }
    deselectAllKeyframes() {
        let e = this.svg.getElementsByClassName("selected");
        for (; e.length; )
            this.deselectKeyframe(e[0])
    }
    createCurve(e, t) {
        let i = document.createElementNS(SVGNS, "path");
        return i.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        i
    }
    updateCurve(e, t, i) {
        let s, n, r, a, o = e.parentElement.parentElement.pz_valueScale, l = e.parentElement.parentElement.pz_frameOffset;
        if (t)
            s = `${t.frame} ${-t.value * o}`;
        else {
            s = `${Math.min(this.centerX - l - .5 * this.width * this.zoomX, i.frame)} ${-i.value * o}`
        }
        if (i)
            a = `${i.frame} ${-i.value * o}`;
        else {
            a = `${Math.max(this.centerX - l + .5 * this.width * this.zoomX, t.frame)} ${-t.value * o}`
        }
        if (t && i && i.tween >> 8) {
            let l = PZ.tween.correctCurve(t, i);
            n = `${t.controlPoints[1][0] * l + t.frame} ${-t.controlPoints[1][1] * o * l - t.value * o}`,
            r = `${i.controlPoints[0][0] * l + i.frame} ${-i.controlPoints[0][1] * o * l - i.value * o}`,
            e.setAttributeNS(null, "d", `M ${s} C ${n}, ${r}, ${a}`)
        } else
            e.setAttributeNS(null, "d", `M ${s} L ${a}`)
    }
    redrawAllKeyframes(e) {
        let t = e.pz_object
          , i = e.children[1];
        for (; i.firstChild; )
            i.firstChild.remove();
        let s = e.children[0];
        for (; s.firstChild; )
            s.firstChild.remove();
        for (let i = 0; i < t.keyframes.length; i++) {
            let s = t.keyframes[i];
            this.onKeyframeCreated(e, s)
        }
    }
    createProperty(e) {
        let t = document.createElementNS(SVGNS, "g");
        t.pz_object = e,
        t.pz_frameOffset = 0,
        t.pz_valueScale = 1 / (e.definition.scaleFactor || 1);
        let i = document.createElementNS(SVGNS, "g");
        i.setAttributeNS(null, "fill", "none"),
        i.setAttributeNS(null, "stroke-width", this.options.curveLineWidth + "px"),
        t.appendChild(i);
        let s = t => {
            t = t || e.properties.name.get();
            let s = `hsl(${40 * PZ.stringHash(t || "") % 360}, 40%, 45%)`;
            i.setAttributeNS(null, "stroke", s)
        }
        ;
        e.properties && e.properties.name ? (t.pz_nameChanged = s,
        e.properties.name.onChanged.watch(t.pz_nameChanged, !0)) : s(e.definition ? e.definition.name : "Object");
        let n = document.createElementNS(SVGNS, "g");
        t.appendChild(n);
        let r = document.createElementNS(SVGNS, "g");
        t.appendChild(r),
        t.pz_keyframeCreated = this.onKeyframeCreated.bind(this, t),
        e.onKeyframeCreated.watch(t.pz_keyframeCreated),
        t.el_keyframeDeleted = this.onKeyframeDeleted.bind(this, t),
        e.onKeyframeDeleted.watch(t.el_keyframeDeleted),
        t.pz_keyframeMoved = this.onKeyframeMoved.bind(this, t),
        e.onKeyframeMoved.watch(t.pz_keyframeMoved),
        t.pz_keyframeChanged = this.onKeyframeChanged.bind(this, t),
        e.onKeyframeChanged.watch(t.pz_keyframeChanged);
        let a = e.tryGetParentOfType(PZ.clip);
        return a && (t.pz_sequence = a.getParentOfType(PZ.sequence),
        t.pz_clipMoved = ( () => {
            let e = a.start;
            t.pz_frameOffset = e,
            t.setAttributeNS(null, "transform", `translate(${e} 0)`),
            this.updateViewBox()
        }
        ),
        t.pz_sequence.ui.onClipMoved.watch(t.pz_clipMoved, !0)),
        this.redrawAllKeyframes(t),
        t
    }
    unloadProperty(e) {
        let t = e.pz_object;
        e.pz_nameChanged && t.properties.name.onChanged.unwatch(e.pz_nameChanged),
        t.onKeyframeCreated.unwatch(e.pz_keyframeCreated),
        t.onKeyframeDeleted.unwatch(e.pz_keyframeDeleted),
        t.onKeyframeMoved.unwatch(e.pz_keyframeMoved),
        t.onKeyframeChanged.unwatch(e.pz_keyframeChanged),
        e.pz_clipMoved && e.pz_sequence.ui.onClipMoved.unwatch(e.pz_clipMoved)
    }
    objectAdded(e) {
        if (!(e instanceof PZ.property.dynamic.keyframes))
            return;
        let t = this.createProperty(e);
        this.svg.insertBefore(t, this.svg.lastElementChild)
    }
    objectRemoved(e) {
        for (let t = 0; t < this.svg.children.length; t++) {
            let i = this.svg.children[t];
            if (i.pz_object === e) {
                this.unloadProperty(i),
                i.remove();
                break
            }
        }
    }
    objectsChanged() {
        if (this.objects)
            for (let e = 0; e < this.objects.length; e++)
                this.createProperty(this.objects[e])
    }
    create() {
        this.createGraph(),
        this.xGrid = new PZ.ui.graph.grid(this),
        this.yGrid = new PZ.ui.graph.grid(this,{
            dimension: 1
        }),
        this.createCursor(),
        this.el.addEventListener("wheel", this.mouseWheel.bind(this)),
        this.svg_drag = new PZ.ui.drag(this.el,function(e) {
            this.ctx.el.focus();
            let t = this.ctx.svg.getBoundingClientRect();
            if (this.origin = {
                x: t.left,
                y: t.top
            },
            this.button = e.button,
            this.startPt = {
                x: e.pageX - this.origin.x,
                y: e.pageY - this.origin.y
            },
            this.currentPt = {
                x: 0,
                y: 0
            },
            0 === this.button) {
                this.selectEl = document.createElementNS(SVGNS, "rect"),
                this.selectEl.setAttributeNS(null, "fill", "none"),
                this.selectEl.setAttributeNS(null, "stroke", "#ccc"),
                this.selectEl.setAttributeNS(null, "stroke-width", "1"),
                this.selectEl.setAttributeNS(null, "stroke-dasharray", "3"),
                this.selectEl.setAttributeNS(null, "vector-effect", "non-scaling-stroke");
                let t = this.ctx.svg.lastElementChild;
                t.insertBefore(this.selectEl, t.lastElementChild);
                let i = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
                  , s = this.ctx.centerY - .5 * this.ctx.height * this.ctx.zoomY;
                this.startX = this.startPt.x * this.ctx.zoomX + i,
                this.startY = this.startPt.y * this.ctx.zoomY + s,
                this.multiSelect = e.shiftKey
            }
        }
        ,function(e) {
            this.currentPt.x = e.pageX - this.origin.x,
            this.currentPt.y = e.pageY - this.origin.y
        }
        ,function() {
            if (0 === this.button) {
                let e = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
                  , t = this.ctx.centerY - .5 * this.ctx.height * this.ctx.zoomY
                  , i = this.currentPt.x * this.ctx.zoomX + e
                  , s = this.currentPt.y * this.ctx.zoomY + t
                  , n = Math.min(this.startX, i)
                  , r = Math.min(this.startY, s)
                  , a = Math.abs(this.startX - i)
                  , o = Math.abs(this.startY - s);
                this.selectEl.setAttributeNS(null, "x", n),
                this.selectEl.setAttributeNS(null, "y", r),
                this.selectEl.setAttributeNS(null, "width", a),
                this.selectEl.setAttributeNS(null, "height", o);
                for (let e = 2; e < this.ctx.svg.children.length - 1; e++) {
                    let t = this.ctx.svg.children[e].children[1]
                      , i = this.ctx.svg.children[e].pz_frameOffset;
                    for (let e = 0; e < t.children.length; e++) {
                        let s = t.children[e]
                          , l = parseFloat(s.getAttribute("x")) + i + .5 * parseFloat(s.getAttribute("width"))
                          , h = parseFloat(s.getAttribute("y")) + .5 * parseFloat(s.getAttribute("height"));
                        l >= n && l < n + a && h >= r && h < r + o ? this.ctx.selectKeyframe(s) : this.multiSelect || this.ctx.deselectKeyframe(s)
                    }
                }
            } else if (1 === this.button)
                this.ctx.centerX -= (this.currentPt.x - this.startPt.x) * this.ctx.zoomX,
                this.ctx.centerY -= (this.currentPt.y - this.startPt.y) * this.ctx.zoomY,
                this.startPt.x = this.currentPt.x,
                this.startPt.y = this.currentPt.y,
                this.ctx.updateViewBox();
            else if (2 === this.button) {
                let e = this.ctx.centerX - .5 * this.ctx.width * this.ctx.zoomX
                  , t = this.currentPt.x * this.ctx.zoomX + e
                  , i = Math.round(t)
                  , s = this.ctx.editor.playback.totalFrames;
                this.ctx.editor.playback.speed = 0,
                this.ctx.editor.playback.currentFrame = Math.max(Math.min(i, s - 1), 0)
            }
        }
        ,function(e) {
            0 === this.button && this.selectEl.remove()
        }
        ,this),
        this.el.addEventListener("contextmenu", e => e.preventDefault()),
        this.el.addEventListener("keydown", this.keydown.bind(this)),
        this.keyframe_drag = new PZ.ui.drag([],this.keyframeDragStart,this.keyframeDrag,this.keyframeDragUpdate,this.keyframeDragEnd,this),
        this.handle_drag = new PZ.ui.drag([],this.handleDragStart,this.handleDrag,this.handleDragUpdate,this.handleDragEnd,this)
    }
    update() {
        this.animFrameReq = requestAnimationFrame(this._updateFn),
        this.cursor.setAttributeNS(null, "x1", this.editor.playback.currentFrame),
        this.cursor.setAttributeNS(null, "x2", this.editor.playback.currentFrame)
    }
    resize() {
        this.width = this.el.clientWidth,
        this.height = this.el.clientHeight,
        this.xGrid.resize(),
        this.yGrid.resize(),
        this.updateViewBox()
    }
    deleteKeyframes(e) {
        for (var t = 0; t < e.length; t++) {
            let i = e[t].parentElement.parentElement.pz_object;
            if (1 === i.keyframes.length && !i.definition.allowEmpty)
                continue;
            let s = e[t].pz_object
              , n = {
                property: i.getAddress(),
                frame: s.frame
            };
            this.propertyOps.deleteKeyframe(n)
        }
    }
    toggleContinuousTangents(e) {
        for (var t = 0; t < e.length; t++) {
            let i = e[t].parentElement.parentElement.pz_object
              , s = e[t].pz_object
              , n = {
                property: i.getAddress(),
                frame: s.frame,
                continuous: !s.continuousTangent
            };
            this.propertyOps.setContinuousTangent(n)
        }
    }
    toggleInterpolation(e) {
        for (var t = 0; t < e.length; t++) {
            let i = e[t].parentElement.parentElement.pz_object
              , s = e[t].pz_object
              , n = s.tween;
            n = 255 & n | (1 & ~(n >> 8)) << 8;
            let r = {
                property: i.getAddress(),
                frame: s.frame,
                tween: n
            };
            this.propertyOps.setTween(r)
        }
    }
    resetHandles(e) {
        const t = [[-10, 0], [10, 0]];
        for (var i = 0; i < e.length; i++) {
            let s = e[i].parentElement.parentElement.pz_object
              , n = e[i].pz_object
              , r = {
                property: s.getAddress(),
                frame: n.frame,
                controlPoints: t
            };
            this.propertyOps.setControlPoints(r)
        }
    }
    async keydown(e) {
        if ("=" === e.key || "+" === e.key) {
            e.stopPropagation();
            const t = .95;
            e.ctrlKey || (this.zoomX *= t),
            e.shiftKey || (this.zoomY *= t),
            this.updateViewBox()
        } else if ("-" === e.key || "_" === e.key) {
            e.stopPropagation();
            const t = 1.05;
            e.ctrlKey || (this.zoomX *= t),
            e.shiftKey || (this.zoomY *= t),
            this.updateViewBox()
        } else if ("\\" === e.key) {
            e.stopPropagation();
            let t = Number.POSITIVE_INFINITY
              , i = Number.NEGATIVE_INFINITY
              , s = Number.POSITIVE_INFINITY
              , n = Number.NEGATIVE_INFINITY;
            for (let e = 2; e < this.svg.children.length - 1; e++) {
                let r = this.svg.children[e].children[1]
                  , a = this.svg.children[e].pz_frameOffset;
                for (let e = 0; e < r.children.length; e++) {
                    let o = r.children[e]
                      , l = parseFloat(o.getAttribute("x")) + a + .5 * parseFloat(o.getAttribute("width"))
                      , h = parseFloat(o.getAttribute("y")) + .5 * parseFloat(o.getAttribute("height"));
                    t = Math.min(t, l),
                    i = Math.max(i, l),
                    s = Math.min(s, h),
                    n = Math.max(n, h)
                }
            }
            if (t === Number.POSITIVE_INFINITY)
                return;
            this.centerX = .5 * (t + i),
            this.centerY = .5 * (s + n),
            i - t > 0 && (this.zoomX = 1.3 * (i - t) / this.width),
            n - s > 0 && (this.zoomY = 1.3 * (n - s) / this.height),
            this.updateViewBox()
        } else if ("Delete" === e.key || "Del" === e.key || "Backspace" === e.key) {
            e.stopPropagation();
            var t = this.svg.querySelectorAll(".selected");
            this.editor.history.startOperation(),
            this.deleteKeyframes(t),
            this.editor.history.finishOperation()
        } else if ("t" === e.key) {
            e.stopPropagation();
            t = this.svg.querySelectorAll(".selected");
            this.editor.history.startOperation(),
            this.toggleContinuousTangents(t),
            this.editor.history.finishOperation()
        } else if ("i" === e.key) {
            e.stopPropagation();
            t = this.svg.querySelectorAll(".selected");
            this.editor.history.startOperation(),
            this.toggleInterpolation(t),
            this.editor.history.finishOperation()
        } else if ("r" === e.key) {
            e.stopPropagation();
            t = this.svg.querySelectorAll(".selected");
            this.editor.history.startOperation(),
            this.resetHandles(t),
            this.editor.history.finishOperation()
        } else if ("c" !== e.key && "x" !== e.key || !e.ctrlKey) {
            if ("v" === e.key && e.ctrlKey) {
                e.stopPropagation();
                let t = await navigator.clipboard.readText()
                  , i = [];
                try {
                    i = JSON.parse(t)
                } catch (e) {}
                for (let e = 0; e < i.length; e++) {
                    if ("propertyList" !== i[e].baseType)
                        return;
                    i[e].minFrame = Number.POSITIVE_INFINITY;
                    let t = Object.keys(i[e].data);
                    for (let s = 0; s < t.length; s++) {
                        let n = i[e].data[t[s]];
                        if (!n.length)
                            continue;
                        let r = n[0];
                        i[e].minFrame = Math.min(i[e].minFrame, r.frame)
                    }
                }
                let s = this.editor.playback.currentFrame;
                this.editor.history.startOperation();
                for (let e = 2; e < this.svg.children.length - 1; e++) {
                    let t = this.svg.children[e].pz_object
                      , n = t.frameOffset;
                    for (let e = 0; e < i.length; e++) {
                        let r = i[e].data
                          , a = s - i[e].minFrame - n
                          , o = r[t.definition.name];
                        o && (this.propertyOps.pasteKeyframes(t, o, a),
                        delete r[t.definition.name])
                    }
                }
                this.editor.history.finishOperation()
            }
        } else {
            e.stopPropagation();
            let i = {};
            for (let e = 2; e < this.svg.children.length - 1; e++) {
                let t = this.svg.children[e]
                  , s = Array.from(t.children[1].getElementsByClassName("selected"));
                s.length && (i[t.pz_object.definition.name] = s.map(e => e.pz_object))
            }
            let s = new PZ.package(i,"propertyList")
              , n = JSON.stringify([s]);
            if (navigator.clipboard.writeText(n),
            "x" === e.key) {
                t = this.svg.querySelectorAll(".selected");
                this.editor.history.startOperation(),
                this.deleteKeyframes(t),
                this.editor.history.finishOperation()
            }
        }
    }
}
,
PZ.ui.graph.grid = class {
    constructor(e, t) {
        this.graph = e,
        this.numGridLines = 0,
        this.numTexts = 0,
        this.options = {
            gridUnit: 20,
            lineWidth: 1,
            dimension: 0,
            textSize: 10
        },
        Object.assign(this.options, t),
        this.create()
    }
    create() {
        this.el = document.createElementNS(SVGNS, "g"),
        this.el.setAttributeNS(null, "stroke-width", this.options.lineWidth + "px"),
        this.graph.svg.appendChild(this.el)
    }
    createGridLine() {
        let e = document.createElementNS(SVGNS, "line");
        return e.setAttributeNS(null, "vector-effect", "non-scaling-stroke"),
        e
    }
    createText() {
        let e = document.createElementNS(SVGNS, "text");
        return this.el.setAttributeNS(null, "fill", "#666"),
        e.style = `font-size: ${this.options.textSize}; font-family: 'Source Code Pro'; color: #666`,
        e
    }
    update() {
        if (0 === this.options.dimension) {
            let e = this.options.gridUnit * Math.pow(2, Math.ceil(Math.log2(this.graph.zoomX)))
              , t = this.graph.centerX - .5 * this.graph.width * this.graph.zoomX;
            t = Math.round(t / e);
            this.graph.width,
            this.graph.zoomX;
            let i = .5 * this.graph.height * this.graph.zoomY;
            for (let s = 0; s < this.numGridLines; s++) {
                let n, r = this.el.children[s], a = (t + s) * e;
                if (s + t & 1)
                    n = "#333333";
                else {
                    n = "#1e1e1e";
                    let e = this.el.children[this.numGridLines + (s >> 1)];
                    e.setAttributeNS(null, "x", a / this.graph.zoomX + 5),
                    e.setAttributeNS(null, "y", this.graph.centerY / this.graph.zoomY + .5 * this.graph.height - 5),
                    e.style.transform = `scale(${this.graph.zoomX}, ${this.graph.zoomY})`,
                    e.textContent = a.toString()
                }
                r.setAttributeNS(null, "x1", a),
                r.setAttributeNS(null, "y1", this.graph.centerY + i),
                r.setAttributeNS(null, "x2", a),
                r.setAttributeNS(null, "y2", this.graph.centerY - i),
                r.setAttributeNS(null, "stroke", n)
            }
        } else {
            let e = this.options.gridUnit * Math.pow(2, Math.ceil(Math.log2(this.graph.zoomY)))
              , t = this.graph.centerY - .5 * this.graph.height * this.graph.zoomY;
            t = Math.round(t / e);
            this.graph.height,
            this.graph.zoomY;
            let i = .5 * this.graph.width * this.graph.zoomX;
            for (let s = 0; s < this.numGridLines; s++) {
                let n, r = this.el.children[s], a = (t + s) * e;
                if (s + t & 1)
                    n = "#333333";
                else {
                    n = "#1e1e1e";
                    let e = this.el.children[this.numGridLines + (s >> 1)];
                    e.setAttributeNS(null, "y", a / this.graph.zoomY - 5),
                    e.setAttributeNS(null, "x", this.graph.centerX / this.graph.zoomX - .5 * this.graph.width + 5),
                    e.style.transform = `scale(${this.graph.zoomX}, ${this.graph.zoomY})`,
                    e.textContent = -a
                }
                r.setAttributeNS(null, "y1", a),
                r.setAttributeNS(null, "x1", this.graph.centerX + i),
                r.setAttributeNS(null, "y2", a),
                r.setAttributeNS(null, "x2", this.graph.centerX - i),
                r.setAttributeNS(null, "stroke", n)
            }
        }
    }
    resize() {
        for (0 === this.options.dimension ? this.numGridLines = Math.ceil(this.graph.width / this.options.gridUnit) : this.numGridLines = Math.ceil(this.graph.height / this.options.gridUnit),
        this.numTexts = Math.ceil(.5 * this.numGridLines); this.el.firstElementChild; )
            this.el.firstElementChild.remove();
        for (let e = 0; e < this.numGridLines; e++)
            this.el.appendChild(this.createGridLine());
        for (let e = 0; e < this.numTexts; e++)
            this.el.appendChild(this.createText())
    }
}
,
PZ.ui.graphEditor = class extends PZ.ui.splitPanel {
    constructor(e, t) {
        let i = new PZ.ui.edit(e,{
            columnLayout: 2,
            showPropertyControls: !1,
            hideAllListItemButtons: !0,
            selectionFilter: e => e instanceof PZ.property.dynamic.keyframes
        })
          , s = new PZ.ui.graph(e);
        if (e.sequence) {
            let t = new PZ.objectList;
            t.push(e.sequence),
            i.enabled = !0,
            i.objects = t
        }
        s.objects = i.selection,
        super(e, i, s, .33, 1),
        this.title = "Graph editor",
        this.icon = "project",
        PZ.observable.defineObservableProp(this, "objects", "onObjectsChanged"),
        this.objects = null,
        this.onObjectsChanged.watch( () => {
            i.objects = this.objects
        }
        )
    }
}
,
PZ.compatibility = class {
    constructor(e) {
        this.version = e
    }
    static check(e) {
        let t = PZ.compatibility.getBuildNumber(e);
        if (t < PZ.compatibility.getBuildNumber() || 0 === t)
            return !0
    }
    static getCurrentVersion() {
        return "dev" === PZVERSION ? "1.0.101" : PZVERSION
    }
    static getBuildNumber(e) {
        return void 0 === e && (e = PZ.compatibility.getCurrentVersion()),
        null === e ? 21 : "dev" === e ? 96 : "1.0.18" === e ? 45 : parseInt(e.split(".")[2])
    }
    upgrade(e) {
        let t = PZ.compatibility.getBuildNumber(this.version);
        t < 22 && this.core22(e),
        t < 38 && this.core38(e),
        t < 43 && this.core43(e),
        t < 60 && this.core60(e),
        t < 64 && this.core64(e),
        t < 84 && this.core84(e),
        t < 96 && this.core96(e),
        t < 101 && this.core101(e)
    }
    core22(e) {
        let t = e.sequence
          , i = t.clipLinks.links;
        for (let e in i)
            for (let t of i[e].clips)
                t.splice(0, 0, 0),
                t[1] += 1,
                t.splice(3, 0, 0);
        let s = e => {
            e.forEach(e => {
                e.properties.name = e.name,
                delete e.name
            }
            ),
            e.objects && s(e.objects)
        }
          , n = t.audioTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), [])
          , r = t.videoTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), []).concat(n);
        for (let e = 0; e < r.length; e++) {
            if (r[e].properties = {
                name: r[e].name
            },
            0 === r[e].type && r[e].object && r[e].object.effects) {
                let t = r[e].object.effects;
                for (let e = 0; e < t.length; e++) {
                    let i = t[e];
                    "gradientoverlay" === i.type ? (i.properties.gradientType = i.properties.type,
                    delete i.properties.type) : "radialblur" === i.type ? i.properties.overbright = !0 : "radialblur2" === i.type && (i.type = "radialblur")
                }
            }
            0 === r[e].type && r[e].object && 4 === r[e].object.type ? (r[e].object.objects = r[e].object.group.objects,
            s(r[e].object.objects)) : 0 === r[e].type && r[e].object && 5 === r[e].object.type ? (r[e].object.type = 7,
            r[e].object.objects = [{
                type: 0,
                properties: {
                    position: r[e].object.properties.position,
                    rotation: r[e].object.properties.rotation,
                    scale: r[e].object.properties.scale
                },
                operations: [{
                    type: 0,
                    properties: {
                        color: r[e].object.properties.childProperties.color
                    }
                }, {
                    type: 1,
                    properties: {
                        opacity: {
                            animated: !1,
                            keyframes: [{
                                value: 0,
                                frame: 0,
                                tween: 1
                            }]
                        }
                    }
                }]
            }],
            delete r[e].object.properties.position,
            delete r[e].object.properties.rotation,
            delete r[e].object.properties.scale,
            delete r[e].object.properties.childProperties.color,
            delete r[e].object.properties.resolution) : 0 === r[e].type && r[e].object && r[e].object.type >= 6 && (r[e].object.objects = [r[e].object.group],
            s(r[e].object.objects))
        }
    }
    core38(e) {
        let t = e => {
            e.forEach(e => {
                void 0 !== e.customGeometry && (e.properties.customGeometry = e.customGeometry,
                delete e.customGeometry)
            }
            ),
            e.objects && t(e.objects)
        }
          , i = e.sequence.videoTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), []);
        for (let e = 0; e < i.length; e++)
            !i[e].object || 4 !== i[e].object.type && 2 !== i[e].object.type || t(i[e].object.objects)
    }
    core43(e) {
        let t = e.sequence;
        for (let e = 0; e < t.videoTracks.length; e++)
            t.videoTracks[e].type = 0;
        for (let e = 0; e < t.audioTracks.length; e++)
            t.audioTracks[e].type = 1;
        let i = t.audioTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), [])
          , s = t.videoTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), []).concat(i);
        for (let e = 0; e < s.length; e++)
            void 0 !== s[e].media && (s[e].properties.media = s[e].media,
            delete s.media)
    }
    core60(e) {
        for (let t = e.media.length - 1; t >= 0; t--) {
            let i = e.media[t];
            i ? (i.properties = {
                name: i.title,
                icon: i.icon
            },
            delete i.title,
            delete i.icon) : e.media.splice(t, 1)
        }
    }
    core64(e) {
        let t = e.sequence
          , i = t.properties.rate
          , s = t.audioTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), [])
          , n = t.videoTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), []).concat(s)
          , r = (e, t) => {
            for (let i = 0; i < e.keyframes.length; i++)
                e.keyframes[i].frame += t
        }
          , a = (e, t) => {
            for (let i in e) {
                let s = e[i];
                "object" == typeof s && s && (void 0 !== s.animated && Array.isArray(s.keyframes) ? r(s, t) : a(s, t))
            }
        }
        ;
        for (let e = 0; e < n.length; e++) {
            a(n[e], -n[e].offset);
            let t = [];
            t[0] = {
                frame: 0,
                value: n[e].offset / i,
                tween: 1
            },
            t[1] = {
                frame: n[e].length,
                value: (n[e].offset + n[e].length) / i,
                tween: 1
            },
            n[e].properties.time = {
                animated: !1,
                keyframes: t
            }
        }
    }
    core84(e) {
        let t = e.sequence;
        const i = void 0 !== t.properties.motionBlurSamples ? t.properties.motionBlurSamples : 16;
        t.properties.motionBlurSamples = {
            animated: !1,
            keyframes: [{
                value: i,
                frame: 0,
                tween: 1
            }]
        };
        const s = void 0 !== t.properties.motionBlurShutter ? t.properties.motionBlurShutter : .5;
        t.properties.motionBlurShutter = {
            animated: !1,
            keyframes: [{
                value: s,
                frame: 0,
                tween: 1
            }]
        }
    }
    core96(e) {
        let t = e.sequence.videoTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), [])
          , i = e => {
            for (let t = 0; t < e.objects.length; t++) {
                let s = e.objects[t];
                if (5 !== s.type) {
                    if (s.material && "custom" === s.material.type && s.material.properties && s.material.properties.repeat) {
                        let e = s.material.properties.repeat;
                        s.material.properties.repeat = JSON.parse(`{"objects":[{"animated":false,"keyframes":[{"value":${e[0]},"frame":0,"tween":1,"controlPoints":[[-10,0],[10,0]]}]},{"animated":false,"keyframes":[{"value":${e[1]},"frame":0,"tween":1,"controlPoints":[[-10,0],[10,0]]}]}]}`)
                    }
                } else
                    i(s)
            }
        }
        ;
        for (let e = 0; e < t.length; e++)
            t[e].object && 4 === t[e].object.type && i(t[e].object)
    }
    core101(e) {
        let t = e.sequence.videoTracks.map(e => e.clips).reduce( (e, t) => e.concat(t), [])
          , i = e => {
            for (let t = 0; t < e.objects.length; t++) {
                let s = e.objects[t];
                if (5 !== s.type) {
                    if (s.material && "texture" === s.material.type && s.material.properties && s.material.properties.repeat) {
                        let e = s.material.properties.repeat;
                        if (Array.isArray(e)) {
                            const t = [1, 1];
                            "number" == typeof e[0] && (t[0] = e[0]),
                            "number" == typeof e[1] && (t[1] = e[1]),
                            s.material.properties.repeat = JSON.parse(`{"objects":[{"animated":false,"keyframes":[{"value":${t[0]},"frame":0,"tween":1,"controlPoints":[[-10,0],[10,0]]}]},{"animated":false,"keyframes":[{"value":${t[1]},"frame":0,"tween":1,"controlPoints":[[-10,0],[10,0]]}]}]}`)
                        } else if ("object" == typeof e)
                            if (void 0 !== e.objects) {
                                let e = (e, t) => {
                                    e && 0 === e.keyframes.length && e.keyframes.push(JSON.parse(`{"value":${t},"frame":0,"tween":1,"controlPoints":[[-10,0],[10,0]]}`))
                                }
                                ;
                                e(s.material.properties.repeat.objects[0], 1),
                                e(s.material.properties.repeat.objects[1], 1),
                                e(s.material.properties.offset.objects[0], 0),
                                e(s.material.properties.offset.objects[1], 0),
                                e(s.material.properties.center.objects[0], 0),
                                e(s.material.properties.center.objects[1], 0),
                                e(s.material.properties.rotation, 0)
                            } else if (void 0 !== e.keyframes) {
                                const t = e.animated;
                                s.material.properties.repeat = JSON.parse(`{"objects":[{"animated":${t},"keyframes":[]},{"animated":${t},"keyframes":[]}]}`);
                                const i = e.keyframes
                                  , n = s.material.properties.repeat.objects[0].keyframes
                                  , r = s.material.properties.repeat.objects[1].keyframes;
                                for (let e = 0; e < i.length; e++) {
                                    const t = i[e].value
                                      , s = i[e].frame
                                      , a = i[e].tween
                                      , o = i[e].controlPoints ? JSON.stringify(i[e].controlPoints) : "[[-10,0],[10,0]]";
                                    n.push(JSON.parse(`{"value":${t[0]},"frame":${s},"tween":${a},"controlPoints":${o}}`)),
                                    r.push(JSON.parse(`{"value":${t[1]},"frame":${s},"tween":${a},"controlPoints":${o}}`))
                                }
                            }
                    }
                } else
                    i(s)
            }
        }
        ;
        for (let e = 0; e < t.length; e++)
            t[e].object && 4 === t[e].object.type && i(t[e].object)
    }
}
,
PZ.compatibility.CM2 = function(e) {
    this.archive = e,
    this.project = JSON.parse(JSON.stringify(CM.defaultProject)),
    this.project.media = [],
    this.sequence = this.project.sequence
}
,
PZ.compatibility.CM2.check = function(e) {
    return e.fileExists("objects")
}
,
PZ.compatibility.CM2.prototype.load = async function() {
    return this.sequence.videoTracks[0].clips[0].object.objects = [],
    this.fonts = {},
    this.textures = {},
    this.hemiLightIntensity = 1,
    this.loadBasics(),
    this.loadCamera(),
    await this.loadScene(),
    this.loadHemiLight(),
    await this.loadObjects(),
    await this.loadEffects(),
    await this.loadAudio(),
    delete this.fonts,
    delete this.textures,
    delete this.hemiLightIntensity,
    this.project
}
,
PZ.compatibility.CM2.prototype.createAssetFromFile = async function(e, t) {
    let i = JSON.parse(JSON.stringify((new PZ.asset).toJSON()));
    return i.type = e,
    i.source = PZ.asset.source.FILE,
    i.sha256 = await PZ.asset.hash(t),
    i.filename = t.name || "",
    i.size = t.size,
    this.project.assets[i.sha256] = i,
    this.archive.addFile(i.sha256, t),
    i
}
,
PZ.compatibility.CM2.prototype.createAssetFromPreset = function(e, t) {
    let i = JSON.parse(JSON.stringify((new PZ.asset).toJSON()));
    return i.type = e,
    i.url = t,
    i.source = PZ.asset.source.PRESET,
    i.external = !0,
    this.project.assets[i.url] = i,
    i
}
,
PZ.compatibility.CM2.prototype.loadBasics = function() {
    var e = this.archive.getFileString("basics");
    if (void 0 === e)
        return;
    var t = JSON.parse(e);
    let i = this.sequence.properties;
    i.resolution = [t.frameWidth, t.frameHeight],
    i.rate = t.frameRate,
    this.sequence.length = t.totalFrames,
    this.sequence.videoTracks[0].clips[0].length = t.totalFrames
}
,
PZ.compatibility.CM2.prototype.migrateProperties = function(e, t) {
    e.properties = {};
    let i = {
        emissive: !0,
        color: !0,
        groundColor: !0,
        inner: !0,
        outer: !0
    };
    function s(e) {
        if ("object" != typeof e || null === e)
            return e;
        let t = []
          , i = Object.keys(e);
        for (let s = 0; s < i.length; s++)
            t.push(e[i[s]]);
        return t
    }
    function n(e, n, r) {
        let a = n[r];
        if (t) {
            let i = t(r);
            if (Array.isArray(i)) {
                let t = i[0];
                r = i[1],
                e[t] || (e[t] = {}),
                e = e[t]
            } else
                "string" == typeof i && (r = i)
        }
        if (Array.isArray(a) && a[0] && void 0 !== a[0].frame) {
            e[r] = {
                animated: a.length > 1,
                keyframes: []
            };
            for (let t = 0; t < a.length; t++) {
                let n = a[t];
                n.frame = n.frame - 1,
                n.tween = n.tweenfn,
                delete n.tweenfn,
                !0 === i[r] && "number" == typeof n.value ? n.value = [(n.value >> 16) / 255, (n.value >> 8 & 255) / 255, (255 & n.value) / 255] : n.value = s(n.value),
                e[r].keyframes.push(n)
            }
        } else
            void 0 !== a && (e[r] = s(a))
    }
    function r(e, t) {
        let i = Object.keys(t);
        for (let s = 0; s < i.length; s++)
            n(e, t, i[s])
    }
    void 0 !== e.keyframeProps && (r(e.properties, e.keyframeProps),
    delete e.keyframeProps),
    void 0 !== e.normalProps && (r(e.properties, e.normalProps),
    delete e.normalProps)
}
,
PZ.compatibility.CM2.prototype.loadObject = async function(e, t) {
    var i = this.archive.getFileString(t);
    if (void 0 === i)
        return;
    var s = JSON.parse(i);
    let n;
    if (t.startsWith("fx")) {
        if (void 0 === s.keyframeProps)
            s = {
                keyframeProps: s
            };
        if ("shutter" === e) {
            let e = s.keyframeProps.mode;
            e = void 0 === e ? 1 : e,
            s.normalProps = {
                mode: e
            },
            delete s.keyframeProps.mode
        }
    }
    if (s.type = e,
    t.includes("appearance") && s.normalProps && s.normalProps.repeat) {
        let e = [1, 1];
        "object" == typeof s.normalProps.repeat ? (e[0] = s.normalProps.repeat.x,
        e[1] = s.normalProps.repeat.y) : e[0] = e[1] = s.normalProps.repeat,
        delete s.normalProps.repeat,
        void 0 === s.keyframeProps && (s.keyframeProps = {}),
        s.keyframeProps.repeat = [{
            frame: 1,
            value: {
                x: e[0],
                y: e[1]
            },
            tweenfn: 1
        }]
    }
    if (0 === e) {
        if (0 === s.objectType)
            return;
        if (99 === s.objectType) {
            if (!(a = this.archive.getFileBlob(t + "_geometry")))
                return;
            var r = await this.createAssetFromFile(PZ.asset.type.GEOMETRY, a);
            s.normalProps.customGeometry = r.sha256
        }
        3 === s.objectType || 6 === s.objectType ? delete s.normalProps.size.z : 4 !== s.objectType && 5 !== s.objectType || (s.normalProps.size = s.normalProps.size.x),
        1 === s.objectType || 3 === s.objectType ? delete s.normalProps.detail : 2 !== s.objectType && 4 !== s.objectType || (s.normalProps.detail = s.normalProps.detail.x),
        2 !== s.objectType && delete s.normalProps.openEnded,
        7 !== s.objectType && (delete s.normalProps.loops,
        delete s.normalProps.thickness),
        99 === s.objectType && (delete s.normalProps.size,
        delete s.normalProps.detail),
        delete s.normalProps.thetaRange,
        delete s.normalProps.phiRange,
        delete s.normalProps.arc,
        n = function(e) {
            let t = "";
            switch (s.objectType) {
            case 1:
                t = "box_";
                break;
            case 2:
                t = "cylinder_";
                break;
            case 3:
                t = "rect_";
                break;
            case 4:
                t = "circle_";
                break;
            case 5:
                t = "sphere_";
                break;
            case 6:
                t = "donut_";
                break;
            case 7:
                t = "path_"
            }
            return "position" !== e && "rotation" !== e && "scale" !== e && "name" !== e ? ["geometryProperties", e = t + e] : void 0
        }
    } else if (1 === e) {
        if (this.archive.fileExists("font_" + s.normalProps.font)) {
            var a = this.archive.getFileBlob("font_" + s.normalProps.font);
            r = await this.createAssetFromFile(PZ.asset.type.FONT, a);
            this.fonts[s.normalProps.font] = r.sha256
        } else if (PZ.asset.font.preset.includes(s.normalProps.font)) {
            var o = "/assets/fonts/2d/" + s.normalProps.font + ".ttf";
            r = this.createAssetFromPreset(PZ.asset.type.FONT, o);
            this.fonts[s.normalProps.font] = r.url
        }
        s.normalProps.font = this.fonts[s.normalProps.font] || null,
        n = function(e) {
            if ("bevelsize" === e)
                return "bevelSize"
        }
    } else if (2 === e)
        n = function(e) {
            return "lidrotation" === e ? ["modelProperties", "lidrotation"] : e
        }
        ;
    else {
        if ("darkness" === e)
            return void (this.hemiLightIntensity = s.intensity);
        if ("sky" === e)
            s.textures = s.textures || [];
        else if ("duplicate" === e)
            for (let e = 0; e < s.keyframeProps.multiplier.length; e++) {
                let t = s.keyframeProps.multiplier[e].value;
                s.keyframeProps.multiplier[e].value = [t, t]
            }
        else if ("flip" === e) {
            let e = [0, 1, 1]
              , t = [1, 0, 1];
            s.keyframeProps.horizontal = [],
            s.keyframeProps.vertical = [];
            for (let i = 0; i < s.keyframeProps.mode.length; i++) {
                let n = s.keyframeProps.mode[i];
                s.keyframeProps.horizontal.push(Object.assign({}, n)),
                s.keyframeProps.horizontal[i].value = t[n.value],
                s.keyframeProps.vertical.push(Object.assign({}, n)),
                s.keyframeProps.vertical[i].value = e[n.value]
            }
            delete s.keyframeProps.mode
        } else if ("overlay" === e) {
            let e = ["BLEND_SRC", "BLEND_SRC_OVER", "BLEND_PLUS", "BLEND_MINUS", "BLEND_MULTIPLY", "BLEND_LIGHTEN", "BLEND_DARKEN", "BLEND_HUE", "BLEND_SATURATION", "BLEND_COLOR", "BLEND_LUMINOSITY"];
            s.normalProps.blending = e[s.normalProps.blending],
            s.normalProps.repeat = 0
        } else if ("radialblur" === e)
            s.normalProps = {
                overbright: 1
            };
        else if ("rgbshift" === e) {
            let e = this.sequence.properties.resolution
              , t = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
            for (let e = 0; e < s.keyframeProps.amount.length; e++)
                s.keyframeProps.amount[e].value *= t
        }
    }
    if (await this.loadTextures(s, t),
    s.appearanceObj && (s.material = await this.loadObject(s.appearanceObj, t + "_appearance"),
    delete s.appearanceObj),
    this.migrateProperties(s, n),
    s.objects)
        for (var l = 0; l < s.objects.length; l++)
            s.objects[l] = await this.loadObject(s.objects[l], t + "_" + l);
    return s
}
,
PZ.compatibility.CM2.prototype.loadTexture = async function(e) {
    if (e.startsWith("data:image/")) {
        var t = await fetch(e)
          , i = await t.blob();
        return (r = await this.createAssetFromFile(PZ.asset.type.IMAGE, i)).sha256
    }
    var s;
    if (void 0 === (i = this.archive.getFileBlob(e)))
        return null;
    if (70 === i.size && (s = await async function(e) {
        return new Promise(function(t, i) {
            var s = new FileReader;
            s.onload = function(e) {
                t(e.target.result)
            }
            ,
            s.readAsText(e)
        }
        )
    }(i)).startsWith("MaGiC0")) {
        s = s.substring(6);
        var n = this.archive.getFileBlob(s);
        if (n) {
            var r = await this.createAssetFromFile(PZ.asset.type.IMAGE, n);
            this.textures[s] = r.sha256
        }
        return this.textures[s]
    }
    return (r = await this.createAssetFromFile(PZ.asset.type.IMAGE, i)).sha256
}
,
PZ.compatibility.CM2.prototype.loadPresetTexture = function(e) {
    return this.createAssetFromPreset(PZ.asset.type.IMAGE, e).url
}
,
PZ.compatibility.CM2.prototype.loadTextures = async function(e, t) {
    if (4 === e.type) {
        if (e.normalProps.texture) {
            var i = "/assets/textures/particles/" + e.normalProps.texture + ".png";
            return void (e.normalProps.texture = this.loadPresetTexture(i))
        }
        var s;
        e.image ? (s = e.image,
        delete e.image) : s = t + "_img",
        e.normalProps.texture = await this.loadTexture(s)
    } else if (t.startsWith("fx"))
        this.archive.fileExists(t + "_img0") && (e.normalProps.texture = await this.loadTexture(t + "_img0"));
    else if (t.indexOf("appearance") >= 0)
        this.archive.fileExists(t + "_img") && (e.normalProps.texture = await this.loadTexture(t + "_img")),
        this.archive.fileExists(t + "_img0") && (e.normalProps.texture = await this.loadTexture(t + "_img0")),
        this.archive.fileExists(t + "_img1") && (e.normalProps.normalMap = await this.loadTexture(t + "_img1"));
    else if ("sceneobject" === t) {
        e.textures = [];
        for (var n = 0; n < 6; n++)
            this.archive.fileExists(t + "_img" + n) && (e.textures[n] = await this.loadTexture(t + "_img1"))
    }
}
,
PZ.compatibility.CM2.prototype.loadScene = async function() {
    var e = this.archive.getFileString("scenes");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        if (t.src) {
            "outdoor" === t.src && (t.src = "sky");
            var i = this.sequence.videoTracks[0].clips[0].object.objects
              , s = await this.loadObject(t.src, "sceneobject");
            s && i.push(s)
        }
    }
}
,
PZ.compatibility.CM2.prototype.loadObjects = async function() {
    var e = this.archive.getFileString("objects");
    if (void 0 !== e)
        for (var t = JSON.parse(e), i = this.sequence.videoTracks[0].clips[0].object.objects, s = 0; s < t.length; s++) {
            var n = await this.loadObject(t[s], "object" + s);
            n && i.push(n)
        }
}
,
PZ.compatibility.CM2.prototype.loadEffects = async function() {
    var e = this.archive.getFileString("fx");
    if (void 0 !== e)
        for (var t = JSON.parse(e), i = this.sequence.videoTracks[0].clips[0].object.effects, s = 0; s < t.length; s++)
            i.push(await this.loadObject(t[s], "fx" + s))
}
,
PZ.compatibility.CM2.prototype.loadCamera = function() {
    var e = this.archive.getFileString("camsequence");
    if (void 0 === e)
        return;
    var t = JSON.parse(e)
      , i = {
        type: 6
    };
    i.objectType = (t.projectionMode || 0) + 1,
    i.keyframeProps = t.keyframeProps;
    this.migrateProperties(i, function(e) {
        return "shake" === e ? "shakeAmplitude" : "shakespeed" === e ? "shakeSpeed" : e
    }),
    t.shakeSettings && (i.properties.shake = {
        mode: t.shakeMode,
        amplitude: [t.shakeSettings.x.amplitude, t.shakeSettings.y.amplitude, t.shakeSettings.z.amplitude, t.shakeSettings.tilt.amplitude],
        frequency: [t.shakeSettings.x.scale, t.shakeSettings.y.scale, t.shakeSettings.z.scale, t.shakeSettings.tilt.scale],
        phase: [t.shakeSettings.x.phase, t.shakeSettings.y.phase, t.shakeSettings.z.phase, t.shakeSettings.tilt.phase],
        noise: [t.shakeSettings.x.noise, t.shakeSettings.y.noise, t.shakeSettings.z.noise, t.shakeSettings.tilt.noise],
        smooth: [t.shakeSettings.x.smooth ? 1 : 0, t.shakeSettings.y.smooth ? 1 : 0, t.shakeSettings.z.smooth ? 1 : 0, t.shakeSettings.tilt.smooth ? 1 : 0]
    }),
    this.sequence.videoTracks[0].clips[0].object.objects.push(i)
}
,
PZ.compatibility.CM2.prototype.loadHemiLight = function() {
    if (0 !== this.hemiLightIntensity) {
        var e = {
            type: 3,
            objectType: 4
        };
        e.keyframeProps = {
            intensity: [{
                frame: 0,
                value: this.hemiLightIntensity,
                tweenfn: 1
            }]
        },
        this.sequence.videoTracks[0].clips[0].object.objects.push(e)
    }
}
,
PZ.compatibility.CM2.prototype.loadAudio = async function() {
    var e = this.archive.getFileBlob("audio_file", {
        type: "audio/*"
    });
    if (void 0 === e && (e = this.archive.getFileBlob("audio_mp3", {
        type: "audio/*"
    })),
    !e)
        return;
    var t = await this.createAssetFromFile(PZ.asset.type.AV, e)
      , i = this.archive.getFileString("audio");
    if (void 0 === i)
        return;
    var s = JSON.parse(i);
    s = s.properties,
    this.sequence.clipLinks = {
        links: {
            0: {
                clips: [[0, 1, 0, 0, 0], [0, 2, 0, 0, 0]]
            }
        },
        seed: 1
    },
    this.sequence.videoTracks[0].clips[0].link = 0;
    var n = {
        type: 1,
        properties: {
            name: "Audio"
        },
        link: 0
    };
    this.sequence.audioTracks[0].clips.push(n),
    n.start = 0,
    n.length = this.sequence.length,
    n.properties.media = t.sha256;
    let r = this.sequence.properties.rate
      , a = [];
    if (a[0] = {
        frame: 0,
        value: s.startOffset / r,
        tween: 1
    },
    a[1] = {
        frame: n.length,
        value: (s.startOffset + n.length) / r,
        tween: 1
    },
    n.properties.time = {
        animated: !1,
        keyframes: a
    },
    n.object = {},
    n.object.keyframeProps = s.keyframeProps || {},
    0 === s.volumeMode || void 0 === s.volumeMode) {
        var o = [];
        n.object.keyframeProps.volume = o;
        var l = {
            frame: 1,
            value: 1,
            tweenfn: 1
        };
        if (o.push(l),
        s.fadeIn > 0) {
            l.value = 0;
            var h = Math.round(s.fadeIn * r) + 1;
            o.push({
                frame: h,
                value: 1,
                tweenfn: 1
            })
        }
        if (s.fadeOut > 0) {
            var c = this.sequence.length - 1 + 1
              , p = c - Math.round(s.fadeOut * r) + 1;
            o.push({
                frame: p,
                value: 1,
                tweenfn: 1
            }),
            o.push({
                frame: c,
                value: 0,
                tweenfn: 1
            })
        }
    } else
        for (let e = 0; e < n.object.keyframeProps.volume.length; e++)
            n.object.keyframeProps.volume[e].value /= 100;
    this.migrateProperties(n.object)
}
,
PZ.compatibility.BG4 = function(e) {
    this.archive = e,
    this.project = JSON.parse(JSON.stringify(CM.defaultProject)),
    this.sequence = this.project.sequence
}
,
PZ.compatibility.BG4.check = function(e) {
    return e.fileExists("layers")
}
,
PZ.compatibility.BG4.prototype.load = async function() {
    return this.project
}
,
PZ.ui.playbackDebug = function(e) {
    PZ.ui.panel.call(this, e),
    this.graphX = 0,
    this.create(),
    this._updateFn = this.update.bind(this),
    this.animFrameReq = requestAnimationFrame(this._updateFn)
}
,
PZ.ui.playbackDebug.prototype.create = function() {
    this.canvas = document.createElement("canvas"),
    this.canvas.width = 4,
    this.canvas.height = 4,
    this.el.appendChild(this.canvas)
}
,
PZ.ui.playbackDebug.prototype.resize = function() {
    this.canvas.width = this.el.clientWidth,
    this.canvas.height = this.el.clientHeight
}
,
PZ.ui.playbackDebug.prototype.printLine = function(e, t) {
    e.fillText(t, 0, 16),
    e.translate(0, 16)
}
,
PZ.ui.playbackDebug.prototype.calculateDesync = function(e) {
    var t = e.currentItem.offset / this.editor.playback.frameRate;
    return e.el.currentTime - t - this.editor.playback.currentTime
}
,
PZ.ui.playbackDebug.prototype.update = function() {
    this.animFrameReq = requestAnimationFrame(this._updateFn);
    var e = 0
      , t = 0
      , i = this.canvas.getContext("2d");
    i.clearRect(0, 0, this.canvas.width, .5 * this.canvas.height),
    i.save(),
    i.fillStyle = "#ccc",
    i.font = "16px Source Code Pro";
    for (var s = 0; s < this.editor.sequence.videoSchedules.length; s++) {
        var n = this.editor.sequence.videoSchedules[s];
        if (this.printLine(i, "video schedule " + s),
        n.el && n.currentItem) {
            var r = this.calculateDesync(n);
            this.printLine(i, "  playback rate: " + n.el.playbackRate),
            this.printLine(i, "  desync (ms): " + Math.round(1e3 * r)),
            this.printLine(i, "  desync (frames): " + Math.round(r * this.editor.playback.frameRate)),
            e += Math.abs(r),
            t++
        }
    }
    for (s = 0; s < this.editor.sequence.audioSchedules.length; s++) {
        n = this.editor.sequence.audioSchedules[s];
        if (this.printLine(i, "audio schedule " + s),
        n.el && n.currentItem) {
            r = this.calculateDesync(n);
            this.printLine(i, "  playback rate: " + n.el.playbackRate),
            this.printLine(i, "  desync (ms): " + Math.round(1e3 * r)),
            this.printLine(i, "  desync (frames): " + Math.round(r * this.editor.playback.frameRate)),
            e += Math.abs(r),
            t++
        }
    }
    i.restore(),
    e /= t,
    i.fillStyle = "black",
    i.fillRect(this.graphX, .5 * this.canvas.height, 1, .5 * this.canvas.height),
    i.fillStyle = "red",
    i.fillRect(this.graphX, this.canvas.height - .5 * this.canvas.height * e - 1, 1, 1),
    this.graphX = (this.graphX + 1) % (this.canvas.width || 1)
}
;
