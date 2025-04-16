this.normalProps = {
    seed: 58,
    texture: "grass"
},
this.keyframeProps = {
    color: [{
        frame: 1,
        value: new THREE.Color(5738668),
        tweenfn: 0
    }]
},
this.presetTextures = ["grass", "brick", "diamond", "dirt", "grass2", "lapis", "stonebrick", "stone", "tnt"],
this.ImprovedNoise = function() {
    function e(e) {
        return e * e * e * (e * (6 * e - 15) + 10)
    }
    function r(e, r, t) {
        return r + e * (t - r)
    }
    function t(e, r, t, s) {
        var o = 15 & e
          , a = o < 8 ? r : t
          , i = o < 4 ? t : 12 == o || 14 == o ? r : s;
        return (0 == (1 & o) ? a : -a) + (0 == (2 & o) ? i : -i)
    }
    for (var s = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180], o = 0; o < 256; o++)
        s[256 + o] = s[o];
    return {
        noise: function(o, a, i) {
            var n = ~~o
              , l = ~~a
              , h = ~~i
              , c = 255 & n
              , f = 255 & l
              , m = 255 & h
              , v = (o -= n) - 1
              , x = (a -= l) - 1
              , p = (i -= h) - 1
              , y = e(o)
              , g = e(a)
              , u = e(i)
              , E = s[c] + f
              , d = s[E] + m
              , C = s[E + 1] + m
              , P = s[c + 1] + f
              , T = s[P] + m
              , M = s[P + 1] + m;
            return r(u, r(g, r(y, t(s[d], o, a, i), t(s[T], v, a, i)), r(y, t(s[C], o, x, i), t(s[M], v, x, i))), r(g, r(y, t(s[d + 1], o, a, p), t(s[T + 1], v, a, i - 1)), r(y, t(s[C + 1], o, x, p), t(s[M + 1], v, x, p))))
        }
    }
}
,
this.generateHeight = function(e, r) {
    for (var t = [], s = new this.ImprovedNoise, o = e * r, a = 2, i = this.normalProps.seed, n = 0; n < 4; n++) {
        if (0 == n)
            for (l = 0; l < o; l++)
                t[l] = 0;
        for (var l = 0; l < o; l++) {
            var h = l % e
              , c = l / e | 0;
            t[l] += s.noise(h / a, c / a, i) * a
        }
        a *= 4
    }
    return t
}
,
this.regenerateland = function() {
    var e = new THREE.Color(16777215)
      , r = new THREE.Color(5263440)
      , t = new THREE.Matrix4
      , s = this.generateHeight(200, 200)
      , o = function(e, r) {
        return .2 * s[e + 200 * r] | 0
    }
      , a = new THREE.PlaneGeometry(10,10);
    a.faces[0].vertexColors = [e, r, e],
    a.faces[1].vertexColors = [r, r, e],
    a.faceVertexUvs[0][0][0].y = .5,
    a.faceVertexUvs[0][0][2].y = .5,
    a.faceVertexUvs[0][1][2].y = .5,
    a.rotateY(Math.PI / 2),
    a.translate(5, 0, 0);
    var i = new THREE.PlaneGeometry(10,10);
    i.faces[0].vertexColors = [e, r, e],
    i.faces[1].vertexColors = [r, r, e],
    i.faceVertexUvs[0][0][0].y = .5,
    i.faceVertexUvs[0][0][2].y = .5,
    i.faceVertexUvs[0][1][2].y = .5,
    i.rotateY(-Math.PI / 2),
    i.translate(-5, 0, 0);
    var n = new THREE.PlaneGeometry(10,10);
    n.faces[0].vertexColors = [e, e, e],
    n.faces[1].vertexColors = [e, e, e],
    n.faceVertexUvs[0][0][1].y = .5,
    n.faceVertexUvs[0][1][0].y = .5,
    n.faceVertexUvs[0][1][1].y = .5,
    n.rotateX(-Math.PI / 2),
    n.translate(0, 5, 0);
    var l = new THREE.PlaneGeometry(10,10);
    l.faces[0].vertexColors = [e, e, e],
    l.faces[1].vertexColors = [e, e, e],
    l.faceVertexUvs[0][0][1].y = .5,
    l.faceVertexUvs[0][1][0].y = .5,
    l.faceVertexUvs[0][1][1].y = .5,
    l.rotateX(-Math.PI / 2),
    l.rotateY(Math.PI / 2),
    l.translate(0, 5, 0);
    var h = new THREE.PlaneGeometry(10,10);
    h.faces[0].vertexColors = [e, r, e],
    h.faces[1].vertexColors = [r, r, e],
    h.faceVertexUvs[0][0][0].y = .5,
    h.faceVertexUvs[0][0][2].y = .5,
    h.faceVertexUvs[0][1][2].y = .5,
    h.translate(0, 0, 5);
    var c = new THREE.PlaneGeometry(10,10);
    c.faces[0].vertexColors = [e, r, e],
    c.faces[1].vertexColors = [r, r, e],
    c.faceVertexUvs[0][0][0].y = .5,
    c.faceVertexUvs[0][0][2].y = .5,
    c.faceVertexUvs[0][1][2].y = .5,
    c.rotateY(Math.PI),
    c.translate(0, 0, -5);
    for (var f = new THREE.Geometry, m = (new THREE.Mesh,
    0); m < 200; m++)
        for (var v = 0; v < 200; v++) {
            var x = o(v, m);
            t.makeTranslation(10 * v - 1e3, 10 * x, 10 * m - 1e3);
            var p = o(v + 1, m)
              , y = o(v - 1, m)
              , g = o(v, m + 1)
              , u = o(v, m - 1)
              , E = o(v + 1, m + 1)
              , d = o(v - 1, m + 1)
              , C = o(v + 1, m - 1)
              , P = o(v - 1, m - 1)
              , T = y > x || u > x || P > x ? 0 : 1
              , M = y > x || g > x || d > x ? 0 : 1
              , H = p > x || g > x || E > x ? 0 : 1
              , k = p > x || u > x || C > x ? 0 : 1;
            if (T + H > M + k ? ((R = l.faces[0].vertexColors)[0] = 0 === M ? r : e,
            R[1] = 0 === H ? r : e,
            R[2] = 0 === T ? r : e,
            (R = l.faces[1].vertexColors)[0] = 0 === H ? r : e,
            R[1] = 0 === k ? r : e,
            R[2] = 0 === T ? r : e,
            f.merge(l, t)) : ((R = n.faces[0].vertexColors)[0] = 0 === T ? r : e,
            R[1] = 0 === M ? r : e,
            R[2] = 0 === k ? r : e,
            (R = n.faces[1].vertexColors)[0] = 0 === M ? r : e,
            R[1] = 0 === H ? r : e,
            R[2] = 0 === k ? r : e,
            f.merge(n, t)),
            (p != x && p != x + 1 || 0 == v) && ((R = a.faces[0].vertexColors)[0] = E > p && v > 0 ? r : e,
            R[2] = C > p && v > 0 ? r : e,
            (R = a.faces[1].vertexColors)[2] = C > p && v > 0 ? r : e,
            f.merge(a, t)),
            (y != x && y != x + 1 || 199 == v) && ((R = i.faces[0].vertexColors)[0] = P > y && v < 199 ? r : e,
            R[2] = d > y && v < 199 ? r : e,
            (R = i.faces[1].vertexColors)[2] = d > y && v < 199 ? r : e,
            f.merge(i, t)),
            (g != x && g != x + 1 || 199 == m) && ((R = h.faces[0].vertexColors)[0] = d > g && m < 199 ? r : e,
            R[2] = E > g && m < 199 ? r : e,
            (R = h.faces[1].vertexColors)[2] = E > g && m < 199 ? r : e,
            f.merge(h, t)),
            u != x && u != x + 1 || 0 == m) {
                var R = c.faces[0].vertexColors;
                R[0] = C > u && m > 0 ? r : e,
                R[2] = P > u && m > 0 ? r : e,
                (R = c.faces[1].vertexColors)[2] = P > u && m > 0 ? r : e,
                f.merge(c, t)
            }
        }
    this.mesh.geometry && this.mesh.geometry.dispose(),
    this.mesh.geometry = f,
    this.mesh.geometry.buffersNeedUpdate = !0
}
,
this.save = function(e) {
    var r = {
        normalProps: this.normalProps,
        keyframeProps: this.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(r))
}
,
this.load = function(e) {
    if (void 0 !== e) {
        var r = PZ.archive.getFileString(e);
        if (void 0 !== r) {
            var t = JSON.parse(r);
            PZ.extend(this.normalProps, t.normalProps),
            $.extend(this.keyframeProps, t.keyframeProps),
            PZ.keyframes.toColor(this.keyframeProps.color)
        }
    }
    CM.hemiLight.intensity = 0,
    CM.scene.fog = new THREE.FogExp2(5738668,.0015),
    this.skygeometry = new THREE.BoxGeometry(2500,2500,2500),
    this.skymaterial = new THREE.MeshBasicMaterial({
        color: 5738668,
        side: THREE.BackSide,
        fog: !1
    }),
    this.skybox = new THREE.Mesh(this.skygeometry,this.skymaterial),
    this.skybox.layers.enable(10),
    CM.scene.add(this.skybox);
    var s = (new THREE.TextureLoader).load("assets/textures/blocks/" + this.normalProps.texture + ".png");
    s.magFilter = THREE.NearestFilter,
    s.minFilter = THREE.LinearMipMapLinearFilter,
    this.mesh = new THREE.Mesh(new THREE.Geometry,new THREE.MeshLambertMaterial({
        map: s,
        vertexColors: THREE.VertexColors
    })),
    this.mesh.receiveShadow = !0,
    CM.scene.add(this.mesh),
    this.regenerateland(),
    this.ambientLight = new THREE.AmbientLight(6710886),
    CM.scene.add(this.ambientLight),
    this.sunlight = new THREE.DirectionalLight(16777215,.5),
    this.sunlight.position.set(1, 1, .5).normalize(),
    CM.scene.add(this.sunlight)
}
,
this.unload = function() {
    CM.scene.remove(this.sunlight),
    CM.scene.remove(this.ambientLight),
    CM.updateMaterials(),
    CM.scene.remove(this.skybox),
    CM.scene.remove(this.mesh),
    this.mesh = null,
    this.landgeometry = null,
    CM.hemiLight.intensity = 1,
    CM.hemiLight.color.setHex(16777215),
    CM.hemiLight.groundColor.setHex(16777215),
    CM.scene.fog = null,
    CM.updateMaterials()
}
,
this.select = function(e) {
    PZ.editor.generateTitle({
        title: "Blocks"
    }).appendTo(e),
    PZ.editor.generateColorPicker({
        title: "Sky color",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericColorGet(e, this.keyframeProps.color)
        },
        set: function(e, r) {
            return PZ.keyframes.genericColorSet(e, r, this.keyframeProps.color)
        },
        hasalpha: !1
    }, this).appendTo(e),
    PZ.editor.generateDropdown({
        title: "Ground texture",
        items: this.presetTextures.join(";"),
        get: function() {
            return 0
        },
        set: function(e) {
            var r = this.mesh.material;
            null !== r.map && (r.map.dispose(),
            r.map = null),
            this.normalProps.texture = this.presetTextures[e];
            var t = new THREE.TextureLoader;
            r.map = t.load("assets/textures/blocks/" + this.presetTextures[e] + ".png"),
            r.map.magFilter = THREE.NearestFilter,
            r.map.minFilter = THREE.LinearMipMapLinearFilter
        }
    }, this).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateInput({
        title: "Generation seed",
        get: function() {
            return this.normalProps.seed
        },
        set: function(e) {
            this.normalProps.seed = e,
            this.regenerateland()
        },
        vmax: 1e5,
        vmin: 0,
        vstep: 1,
        dragstep: .01
    }, this).appendTo(e)
}
,
this.update = function() {
    var e = TWEEN.getValue(this.keyframeProps.color, CM.currentFrame);
    this.skymaterial.color.copy(e),
    CM.scene.fog.color.copy(e),
    this.sunlight.color.copy(e)
}
;
