//Noise JS
!function(t){function r(t){function r(t,r,o){this.x=t,this.y=r,this.z=o}r.prototype.dot2=function(t,r){return this.x*t+this.y*r},r.prototype.dot3=function(t,r,o){return this.x*t+this.y*r+this.z*o},this.grad3=[new r(1,1,0),new r(-1,1,0),new r(1,-1,0),new r(-1,-1,0),new r(1,0,1),new r(-1,0,1),new r(1,0,-1),new r(-1,0,-1),new r(0,1,1),new r(0,-1,1),new r(0,1,-1),new r(0,-1,-1)],this.p=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],this.perm=new Array(512),this.gradP=new Array(512),this.seed(t||0)}function o(t){return t*t*t*(t*(6*t-15)+10)}function e(t,r,o){return(1-o)*t+o*r}r.prototype.seed=function(t){t>0&&t<1&&(t*=65536),(t=Math.floor(t))<256&&(t|=t<<8);for(var r=this.p,o=0;o<256;o++){var e;e=1&o?r[o]^255&t:r[o]^t>>8&255;var n=this.perm,i=this.gradP;n[o]=n[o+256]=e,i[o]=i[o+256]=this.grad3[e%12]}};var n=.5*(Math.sqrt(3)-1),i=(3-Math.sqrt(3))/6,a=1/6;r.prototype.simplex2=function(t,r){var o,e,a,h,d,s=(t+r)*n,p=Math.floor(t+s),f=Math.floor(r+s),u=(p+f)*i,v=t-p+u,l=r-f+u;v>l?(h=1,d=0):(h=0,d=1);var w=v-h+i,y=l-d+i,M=v-1+2*i,c=l-1+2*i;p&=255,f&=255;var m=this.perm,g=this.gradP,x=g[p+m[f]],P=g[p+h+m[f+d]],q=g[p+1+m[f+1]],z=.5-v*v-l*l;o=z<0?0:(z*=z)*z*x.dot2(v,l);var A=.5-w*w-y*y;e=A<0?0:(A*=A)*A*P.dot2(w,y);var N=.5-M*M-c*c;return a=N<0?0:(N*=N)*N*q.dot2(M,c),70*(o+e+a)},r.prototype.simplex3=function(t,r,o){var e,n,i,h,d,s,p,f,u,v,l=(t+r+o)*(1/3),w=Math.floor(t+l),y=Math.floor(r+l),M=Math.floor(o+l),c=(w+y+M)*a,m=t-w+c,g=r-y+c,x=o-M+c;m>=g?g>=x?(d=1,s=0,p=0,f=1,u=1,v=0):m>=x?(d=1,s=0,p=0,f=1,u=0,v=1):(d=0,s=0,p=1,f=1,u=0,v=1):g<x?(d=0,s=0,p=1,f=0,u=1,v=1):m<x?(d=0,s=1,p=0,f=0,u=1,v=1):(d=0,s=1,p=0,f=1,u=1,v=0);var P=m-d+a,q=g-s+a,z=x-p+a,A=m-f+2*a,N=g-u+2*a,b=x-v+2*a,j=m-1+.5,k=g-1+.5,B=x-1+.5;w&=255,y&=255,M&=255;var C=this.perm,D=this.gradP,E=D[w+C[y+C[M]]],F=D[w+d+C[y+s+C[M+p]]],G=D[w+f+C[y+u+C[M+v]]],H=D[w+1+C[y+1+C[M+1]]],I=.5-m*m-g*g-x*x;e=I<0?0:(I*=I)*I*E.dot3(m,g,x);var J=.5-P*P-q*q-z*z;n=J<0?0:(J*=J)*J*F.dot3(P,q,z);var K=.5-A*A-N*N-b*b;i=K<0?0:(K*=K)*K*G.dot3(A,N,b);var L=.5-j*j-k*k-B*B;return h=L<0?0:(L*=L)*L*H.dot3(j,k,B),32*(e+n+i+h)},r.prototype.perlin2=function(t,r){var n=Math.floor(t),i=Math.floor(r);t-=n,r-=i,n&=255,i&=255;var a=this.perm,h=this.gradP,d=h[n+a[i]].dot2(t,r),s=h[n+a[i+1]].dot2(t,r-1),p=h[n+1+a[i]].dot2(t-1,r),f=h[n+1+a[i+1]].dot2(t-1,r-1),u=o(t);return e(e(d,p,u),e(s,f,u),o(r))},r.prototype.perlin3=function(t,r,n){var i=Math.floor(t),a=Math.floor(r),h=Math.floor(n);t-=i,r-=a,n-=h,i&=255,a&=255,h&=255;var d=this.perm,s=this.gradP,p=s[i+d[a+d[h]]].dot3(t,r,n),f=s[i+d[a+d[h+1]]].dot3(t,r,n-1),u=s[i+d[a+1+d[h]]].dot3(t,r-1,n),v=s[i+d[a+1+d[h+1]]].dot3(t,r-1,n-1),l=s[i+1+d[a+d[h]]].dot3(t-1,r,n),w=s[i+1+d[a+d[h+1]]].dot3(t-1,r,n-1),y=s[i+1+d[a+1+d[h]]].dot3(t-1,r-1,n),M=s[i+1+d[a+1+d[h+1]]].dot3(t-1,r-1,n-1),c=o(t),m=o(r),g=o(n);return e(e(e(p,l,c),e(f,w,c),g),e(e(u,y,c),e(v,M,c),g),m)},t.Noise=r}("undefined"==typeof module?this:module.exports);


var DEBUG = !0;
var ctx;
var data;
this.save = function(t) {
    var e = {
        skymode: this.skymode,
        landmode: this.landmode,
        seed: this.seed,
        noisescale: this.noisescale,
        heightscale: this.heightscale
    };
    if (PZ.archive.addFileString(t, JSON.stringify(e)),
    -1 === this.skymode)
        for (var i = 0; i < 6; i++) {
            var s = this.materials[i];
            null !== s.map && null !== s.image && (CM.templates.saveWaiting++,
            PZ.imageToArray(s.map.image, function(e, i) {
                PZ.archive.addFile(t + "_img" + e, new Uint8Array(i)),
                CM.templates.saveWaiting--,
                CM.templates.saveComplete()
            }
            .bind(null, i)))
        }
}
,
this.load = function(t) {
    if (CM.scene.fog = new THREE.FogExp2(16777215,.001),
    CM.updateMaterials(),
    this.skygeometry = new THREE.BoxGeometry(2500,2500,2500),
    this.land = null,
    this.landmaterial = null,
    this.landgeometry = null,
    this.materials = [],
    this.materials.push(new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        fog: !1
    })),
    this.materials.push(new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        fog: !1
    })),
    this.materials.push(new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        fog: !1
    })),
    this.materials.push(new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        fog: !1
    })),
    this.materials.push(new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        fog: !1
    })),
    this.materials.push(new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        fog: !1
    })),
    this.sunlight = new THREE.DirectionalLight(16777215,1),
    this.sunlight.castShadow = !0,
    this.sunlight.shadow.mapSize.width = 2048,
    this.sunlight.shadow.mapSize.height = 2048,
    this.sunlight.shadow.camera.near = 100,
    this.sunlight.shadow.camera.far = 2500,
    this.sunlight.shadow.camera.fov = 50,
    this.sunlight.shadow.bias = 1e-4,
    CM.scene.add(this.sunlight),
    CM.updateMaterials(),
    this.skymaterial = new THREE.MultiMaterial(this.materials),
    this.skybox = new THREE.Mesh(this.skygeometry,this.skymaterial),
    this.skybox.layers.enable(10),
    CM.scene.add(this.skybox),
    void 0 !== t) {
        var e = PZ.archive.getFileString(t);
        if (void 0 !== e)
            var i = JSON.parse(e);
        for (var s = 0; s < 6; s++) {
            var o = PZ.archive.getFileBlob(t + "_img" + s);
            if (void 0 !== o) {
                var a = this.materials[s]
                  , n = new Image;
                n.onload = function(t, e) {
                    t.map = new THREE.Texture(e.srcElement),
                    t.map.needsUpdate = !0,
                    t.needsUpdate = !0
                }
                .bind(null, a),
                a.objURL = URL.createObjectURL(o),
                n.src = a.objURL
            }
        }
    }
    this.skymode = i ? i.skymode : PZ.random.number(1, 12, !0),
    this.seed = i ? i.seed : PZ.random.number(1, 500, !0),
    this.noisescale = i ? i.noisescale : 6,
    this.heightscale = i ? i.heightscale : 20,
    this.landmode = i ? i.landmode : 0,
    this.updateSky(),
    ctx = this
    this.updateLand()
}
,
this.unload = function() {
    CM.scene.remove(this.sunlight),
    CM.updateMaterials(),
    CM.scene.remove(this.skybox),
    this.land && CM.scene.remove(this.land),
    this.skymaterial = null,
    this.skygeometry = null,
    this.materials && (this.materials = null),
    this.landmaterial = null,
    this.landgeometry = null,
    CM.hemiLight.intensity = 1,
    CM.hemiLight.color.setHex(16777215),
    CM.hemiLight.groundColor.setHex(16777215),
    CM.scene.fog = null,
    CM.updateMaterials()
}
,
this.CUSTOMINDEX = 13,
this.props = {
    sky: {
        title: "Sky",
        items: "off;cloudy light rays;dark stormy;full moon;sunset;thick clouds water;tropical sunny day;space;tron;mars;mercury;underworld;above the clouds;custom",
        get: function() {
            return -1 === this.skymode ? this.CUSTOMINDEX : this.skymode
        },
        set: function(t) {
            t === this.CUSTOMINDEX ? (this.$custom.show(),
            this.skymode = -1) : (this.$custom.hide(),
            this.skymode = t),
            this.updateSky()
        }
    },
    custom_left: {
        title: "Left",
        accept: "image/*",
        set: function(t) {
            this.fileUploadFn(t, this.materials[0])
        }
    },
    custom_right: {
        title: "Right",
        accept: "image/*",
        set: function(t) {
            this.fileUploadFn(t, this.materials[1])
        }
    },
    custom_top: {
        title: "Top",
        accept: "image/*",
        set: function(t) {
            this.fileUploadFn(t, this.materials[2])
        }
    },
    custom_bottom: {
        title: "Bottom",
        accept: "image/*",
        set: function(t) {
            this.fileUploadFn(t, this.materials[3])
        }
    },
    custom_front: {
        title: "Front",
        accept: "image/*",
        set: function(t) {
            this.fileUploadFn(t, this.materials[4])
        }
    },
    custom_back: {
        title: "Back",
        accept: "image/*",
        set: function(t) {
            this.fileUploadFn(t, this.materials[5])
        }
    },
    fogColor: void 0,
    hemiSkyColor: void 0,
    hemiGroundColor: void 0,
    hemiIntensity: void 0,
    directionalColor: void 0,
    directionalPosition: void 0,
    directionalIntensity: void 0,
    printData: void 0,
    land: {
        title: "Land",
        items: "off;flat;terrain",
        get: function() {
            return this.landmode
        },
        set: function(t) {
            ctx.landmode = t,
            ctx.updateLand()
        }
    }
    // fog: {
    //     title: "Fog",
    //     items: "off;light;heavy",
    //     set: function(t) {
    //         if (t == "light") {
    //             CM.scene.fog.density = 0.001
    //         } else if (t == "off") {
    //             CM.scene.fog.density = 0
    //         } else if (t == "heavy") {
    //             CM.scene.fog.density = 0.01
    //         }
    //     }
    // }
},
this.select = function(t) {
    var e = this;
    PZ.editor.generateTitle({
        title: "Outdoor"
    }).appendTo(t),
    PZ.editor.generateDropdown(e.props.sky, e).appendTo(t),
    e.$custom = PZ.editor.generatePlaceholder().appendTo(t).hide(),
    PZ.editor.generateFileUpload(e.props.custom_left, e).appendTo(e.$custom),
    PZ.editor.generateFileUpload(e.props.custom_right, e).appendTo(e.$custom),
    PZ.editor.generateFileUpload(e.props.custom_top, e).appendTo(e.$custom),
    PZ.editor.generateFileUpload(e.props.custom_bottom, e).appendTo(e.$custom),
    PZ.editor.generateFileUpload(e.props.custom_front, e).appendTo(e.$custom),
    PZ.editor.generateFileUpload(e.props.custom_back, e).appendTo(e.$custom),
    PZ.editor.generateSpacer().appendTo(t),
    PZ.editor.generateDropdown(e.props.land, e).appendTo(t),
    PZ.editor.generateInput({
        title: "Generation seed",
        get: function() {
            if (this.seed == undefined) {
                this.seed = 69
            }
            return this.seed
        },
        set: function(e) {
            this.seed = e,
            this.updateLand()
        },
        vmax: 10000000000,
        vmin: 0,
        vstep: 1,
        dragstep: .01
    },this).appendTo(t)
    PZ.editor.generateInput({
        title: "Noise Scale",
        get: function() {
            if (this.seed == undefined) {
                this.noisescale = 69
            }
            return this.noisescale
        },
        set: function(e) {
            this.noisescale = e,
            this.updateLand()
        },
        vmax: 10000000000,
        vmin: 0,
        vstep: 1,
        dragstep: .01
    },this).appendTo(t)
    PZ.editor.generateInput({
        title: "Height Scale",
        get: function() {
            if (this.seed == undefined) {
                this.heightscale = 69
            }
            return this.heightscale
        },
        set: function(e) {
            this.heightscale = e,
            this.updateLand()
        },
        vmax: 10000000000,
        vmin: 0,
        vstep: 1,
        dragstep: .01
    },this).appendTo(t)
}
,
this.updateLand = function() {
    console.log(this.landmode)
    switch (this.landmode) {
    case 0:
        CM.scene.remove(this.land)
        this.land && (CM.scene.remove(this.land),
        this.land = null);
        break;
    case 1: {
        console.log("outdoor 1")
        CM.scene.remove(this.land)
        this.landgeometry = new THREE.PlaneGeometry(400,400)
        this.landmaterial = new THREE.MeshPhongMaterial({
            ambient: 197379,
            specular: 0,
            color: 16777215,
            map: THREE.ImageUtils.loadTexture("assets/textures/outdoor/herbe_3.png")
        })
        this.landmaterial.map.wrapS = this.landmaterial.map.wrapT = THREE.RepeatWrapping
        this.landmaterial.map.repeat.set(5, 5)
        this.land = new THREE.Mesh(this.landgeometry,this.landmaterial)
        this.land.rotation.x = -Math.PI / 2
        CM.scene.add(this.land)
        break;
    }
        case 2: {
            console.log("outdoor 2")
            CM.scene.remove(this.land)
            const width = 1000;
            const height = 1000;
            const segments = 100;
            const seed = this.seed;
            const noiseGen = new Noise(seed);
            this.landgeometry = new THREE.PlaneGeometry(width, height, segments, segments);
            for (let i = 0; i < this.landgeometry.vertices.length; i++) {
                const vertex = this.landgeometry.vertices[i];
                const noiseScale = this.noisescale/1000
                const heightScale = this.heightscale
                vertex.z = noiseGen.perlin2(vertex.x * noiseScale, vertex.y * noiseScale) * heightScale;
            }
        
            this.landgeometry.computeVertexNormals();
            this.landmaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0x000000,
                map: THREE.ImageUtils.loadTexture("assets/textures/outdoor/herbe_3.png")
            });
        
            this.landmaterial.map.wrapS = this.landmaterial.map.wrapT = THREE.RepeatWrapping;
            this.landmaterial.map.repeat.set(5, 5);
            this.land = new THREE.Mesh(this.landgeometry, this.landmaterial);
            this.land.rotation.x = -Math.PI / 2;
            CM.scene.add(this.land);
            break;
        }
        
        
    }
    
}
,
this.updateSky = function() {
    for (var t = 0; t < 6; t++)
        this.materials[t].map && (this.materials[t].map.dispose(),
        this.materials[t].map = null);
    var e = "";
    switch (this.skymode) {
    default:
        return this.sunlight.intensity = 0,
        CM.hemiLight.color.setHex(16777215),
        CM.hemiLight.groundColor.setHex(16777215),
        void (CM.hemiLight.intensity = .2);
    case 1:
        e = "CloudyLightRays",
        CM.scene.fog.color.setHex(4935506),
        this.sunlight.position.set(496.2, 219.9, -348.5),
        this.sunlight.color.setHex(16377810),
        this.sunlight.intensity = 1.2,
        CM.hemiLight.color.setHex(15263976),
        CM.hemiLight.groundColor.setHex(11326951),
        CM.hemiLight.intensity = .4;
        break;
    case 2:
        e = "DarkStormy",
        CM.scene.fog.color.setHex(1974564),
        this.sunlight.position.set(-297.9, 107.7, -10.8),
        this.sunlight.color.setHex(13946824),
        this.sunlight.intensity = .4,
        CM.hemiLight.color.setHex(15263976),
        CM.hemiLight.groundColor.setHex(5201266),
        CM.hemiLight.intensity = .4;
        break;
    case 3:
        e = "FullMoon",
        CM.scene.fog.color.setHex(1975077),
        this.sunlight.position.set(453.5, 156.8, -164.8),
        this.sunlight.color.setHex(16711422),
        this.sunlight.intensity = .4,
        CM.hemiLight.color.setHex(0),
        CM.hemiLight.groundColor.setHex(10396374),
        CM.hemiLight.intensity = .2;
        break;
    case 4:
        e = "SunSet",
        CM.scene.fog.color.setHex(4145988),
        this.sunlight.position.set(472, 33.6, -221.5),
        this.sunlight.color.setHex(15650387),
        this.sunlight.intensity = 1.8,
        CM.hemiLight.color.setHex(9350350),
        CM.hemiLight.groundColor.setHex(9738401),
        CM.hemiLight.intensity = .2;
        break;
    case 5:
        e = "ThickCloudsWater",
        CM.scene.fog.color.setHex(8610121),
        this.sunlight.position.set(458.8778481214596, 251.87787218355768, -501.37746196377486),
        this.sunlight.color.setHex(15780483),
        this.sunlight.intensity = 1.2,
        CM.hemiLight.color.setHex(15263976),
        CM.hemiLight.groundColor.setHex(6721505),
        CM.hemiLight.intensity = .4;
        break;
    case 6:
        e = "TropicalSunnyDay",
        CM.scene.fog.color.setHex(16514297),
        this.sunlight.position.set(-231.1, 236.3, -643.6205049825829),
        this.sunlight.color.setHex(16777215),
        this.sunlight.intensity = 1.2,
        CM.hemiLight.color.setHex(15263976),
        CM.hemiLight.groundColor.setHex(6525861),
        CM.hemiLight.intensity = .9;
        break;
    case 7:
        e = "stars",
        CM.scene.fog.color.setHex(0),
        this.sunlight.position.set(-.0002102294643322545, 277.5, .0001848400020773877),
        this.sunlight.color.setHex(13421772),
        this.sunlight.intensity = 0,
        CM.hemiLight.color.setHex(16777215),
        CM.hemiLight.groundColor.setHex(16777215),
        CM.hemiLight.intensity = .6;
        break;
    case 8:
        e = "tron",
        CM.scene.fog.color.setHex(2431494),
        this.sunlight.position.set(40.492785285191374, -858.699027292143, -40.4),
        this.sunlight.color.setHex(16238388),
        this.sunlight.intensity = 1.8,
        CM.hemiLight.color.setHex(15921752),
        CM.hemiLight.groundColor.setHex(0),
        CM.hemiLight.intensity = .7;
        break;
    case 9:
        e = "mars",
        CM.scene.fog.color.setHex(10770472),
        this.sunlight.position.set(-609.1061678483015, 279.61876296644726, 641.2560101232201),
        this.sunlight.color.setHex(16041888),
        this.sunlight.intensity = 1,
        CM.hemiLight.color.setHex(15187321),
        CM.hemiLight.groundColor.setHex(12096575),
        CM.hemiLight.intensity = .7;
        break;
    case 10:
        e = "mercury",
        CM.scene.fog.color.setHex(4133942),
        this.sunlight.position.set(-.0008729216198492796, 883.4919228703098, .00013625646178184976),
        this.sunlight.color.setHex(14206126),
        this.sunlight.intensity = 1,
        CM.hemiLight.color.setHex(15899976),
        CM.hemiLight.groundColor.setHex(9242889),
        CM.hemiLight.intensity = .8;
        break;
    case 11:
        e = "hell",
        CM.scene.fog.color.setHex(1835266),
        this.sunlight.position.set(.0007196086560147312, -696.5, 12591127644092392e-22),
        this.sunlight.color.setHex(13765644),
        this.sunlight.intensity = 1,
        CM.hemiLight.color.setHex(15526360),
        CM.hemiLight.groundColor.setHex(8259078),
        CM.hemiLight.intensity = .9;
        break;
    case 12:
        e = "clouds",
        CM.scene.fog.color.setHex(16098816),
        this.sunlight.position.set(-431.3, 276.4, 443.2),
        this.sunlight.color.setHex(16777215),
        this.sunlight.intensity = 1,
        CM.hemiLight.color.setHex(15612680),
        CM.hemiLight.groundColor.setHex(15618866),
        CM.hemiLight.intensity = .7
    }
    if ("" !== e) {
        var i = "assets/textures/sky/"
          , s = new THREE.TextureLoader;
        this.materials[0].map = s.load(i + e + "/left.png"),
        this.materials[1].map = s.load(i + e + "/right.png"),
        this.materials[2].map = s.load(i + e + "/up.png"),
        this.materials[3].map = s.load(i + e + "/down.png"),
        this.materials[4].map = s.load(i + e + "/front.png"),
        this.materials[5].map = s.load(i + e + "/back.png")
    }
}
,
this.fileUploadFn = function(t, e) {
    if (t.files && t.files[0]) {
        var i = new FileReader;
        i.onload = function(t) {
            var i = new Image;
            i.onload = function(t) {
                e.map && (e.map.dispose(),
                e.map = null),
                e.objURL && (URL.revokeObjectURL(e.objURL),
                delete e.objURL),
                e.map = new THREE.Texture(this),
                e.map.needsUpdate = !0
            }
            ,
            i.src = t.target.result
        }
        ,
        i.readAsDataURL(t.files[0])
    }
}
,
this.update = function() {
    !0 === CM.renderMode ? this.skybox.position.copy(CM.renderCamera.position) : this.skybox.position.copy(CM.camera.position)
}
,
this.resize = function() {}
;
