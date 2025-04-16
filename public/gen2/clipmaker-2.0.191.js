"use strict";
function initTool() {
    $(window).resize(function() {
        clearTimeout(CM.resizeTimeout),
        CM.resizeTimeout = setTimeout(function() {
            CM.enableRenderLoop && CM.resizeViewport()
        }, 500)
    }),
    window.setTimeout(function() {
        $(window).on("beforeunload", function() {
            return "If you leave this page, unsaved changes will be lost."
        })
    }, 6e4),
    CM.setUpEditor(),
    CM.init()
}
function trackEngagement(e) {
    function t() {
        if (b >= v) {
            const t = Math.round(b / 1e3);
            navigator.sendBeacon(`${PZ.apiOrigin}/creations/engagement`, JSON.stringify({
                id: e,
                source: "cm2",
                duration: t
            })),
            b = 0
        }
    }
    function r() {
        P || (P = Date.now()),
        E || T || (x = Date.now(),
        n()),
        clearTimeout(M)
    }
    function a() {
        P && (b += x - P,
        P = null,
        x = null,
        i())
    }
    function n() {
        clearTimeout(w),
        w = setTimeout(s, f)
    }
    function i() {
        clearTimeout(M),
        M = setTimeout(o, m)
    }
    function s() {
        a()
    }
    function o() {
        t()
    }
    function l() {
        t(),
        c()
    }
    function c() {
        clearTimeout(C),
        C = setTimeout(l, g)
    }
    function p() {
        const e = window.CM.setPlayPause;
        window.CM.setPlayPause = function(t) {
            e(t),
            t !== E && (t ? (E = !0,
            r(),
            clearTimeout(w)) : (E = !1,
            r()))
        }
    }
    function h() {
        const e = () => {
            a(),
            t()
        }
        ;
        window.addEventListener("beforeunload", e),
        window.addEventListener("visibilitychange", () => {
            "hidden" === document.visibilityState && e()
        }
        )
    }
    function u() {
        ["click", "touchstart", "wheel", "keydown"].forEach(e => {
            y.forEach(t => {
                t.addEventListener(e, r, {
                    passive: !0,
                    capture: !0
                })
            }
            )
        }
        ),
        y.forEach(e => {
            e.addEventListener("mousedown", () => {
                T = !0,
                r(),
                clearTimeout(w)
            }
            , {
                passive: !0,
                capture: !0
            }),
            window.addEventListener("mousemove", e => {
                !e.buttons && T && (T = !1),
                T && r()
            }
            , {
                passive: !0
            }),
            window.addEventListener("mouseup", () => {
                T && (T = !1,
                r())
            }
            , {
                passive: !0
            })
        }
        ),
        y.forEach(e => {
            e.addEventListener("touchstart", () => {
                T = !0,
                r(),
                clearTimeout(w)
            }
            , {
                passive: !0,
                capture: !0
            }),
            window.addEventListener("touchmove", () => {
                T && r()
            }
            , {
                passive: !0
            }),
            window.addEventListener("touchend", () => {
                T && (T = !1,
                r())
            }
            , {
                passive: !0
            })
        }
        )
    }
    function d() {
        u(),
        h(),
        c(),
        p()
    }
    const f = 5e3
      , m = 6e4
      , g = 12e5
      , v = 1e3
      , y = ["#c_main", "#controls > div:nth-child(2)", "#controls > div:nth-child(3)", "#controls > div:nth-child(4)", "#controls > div:nth-child(5)", "#controls > div:nth-child(6)", "#controls > div:nth-child(7)", "#previewbottom"].map(e => Array.from(document.querySelectorAll(e))).flat();
    let b = 0
      , P = null
      , x = null
      , w = null
      , M = null
      , C = null
      , T = !1
      , E = !1;
    "complete" === document.readyState || "interactive" === document.readyState ? d() : document.addEventListener("DOMContentLoaded", d)
}
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports && "object" == typeof module ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e, t) {
    function r(t, r, a, n) {
        for (var i = [], s = 0; s < t.length; s++) {
            var o = t[s];
            if (o) {
                var l = tinycolor(o)
                  , c = l.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += tinycolor.equals(r, o) ? " sp-thumb-active" : "";
                var p = l.toString(n.preferredFormat || "rgb")
                  , h = g ? "background-color:" + l.toRgbString() : "filter:" + l.toFilter();
                i.push('<span title="' + p + '" data-color="' + l.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + h + ';" /></span>')
            } else {
                i.push(e("<div />").append(e('<span data-color="" style="background-color:transparent;" class="sp-clear-display"></span>').attr("title", n.noColorSelectedText)).html())
            }
        }
        return "<div class='sp-cf " + a + "'>" + i.join("") + "</div>"
    }
    function a() {
        for (var e = 0; e < f.length; e++)
            f[e] && f[e].hide()
    }
    function n(t, r) {
        var a = e.extend({}, d, t);
        return a.callbacks = {
            move: c(a.move, r),
            change: c(a.change, r),
            show: c(a.show, r),
            hide: c(a.hide, r),
            beforeShow: c(a.beforeShow, r)
        },
        a
    }
    function i(i, o) {
        function c() {
            if (z.showPaletteOnly && (z.showPalette = !0),
            He.text(z.showPaletteOnly ? z.togglePaletteMoreText : z.togglePaletteLessText),
            z.palette) {
                le = z.palette.slice(0),
                ce = e.isArray(le[0]) ? le : [le],
                pe = {};
                for (var t = 0; t < ce.length; t++)
                    for (var r = 0; r < ce[t].length; r++) {
                        var a = tinycolor(ce[t][r]).toRgbString();
                        pe[a] = !0
                    }
            }
            ye.toggleClass("sp-flat", B),
            ye.toggleClass("sp-input-disabled", !z.showInput),
            ye.toggleClass("sp-alpha-enabled", z.showAlpha),
            ye.toggleClass("sp-clear-enabled", Ge),
            ye.toggleClass("sp-buttons-disabled", !z.showButtons),
            ye.toggleClass("sp-palette-buttons-disabled", !z.togglePaletteOnly),
            ye.toggleClass("sp-palette-disabled", !z.showPalette),
            ye.toggleClass("sp-palette-only", z.showPaletteOnly),
            ye.toggleClass("sp-initial-disabled", !z.showInitial),
            ye.addClass(z.className).addClass(z.containerClassName),
            A()
        }
        function d() {
            if (_ && window.localStorage) {
                try {
                    var t = window.localStorage[_].split(",#");
                    t.length > 1 && (delete window.localStorage[_],
                    e.each(t, function(e, t) {
                        b(t)
                    }))
                } catch (e) {}
                try {
                    he = window.localStorage[_].split(";")
                } catch (e) {}
            }
        }
        function b(t) {
            if (N) {
                var r = tinycolor(t).toRgbString();
                if (!pe[r] && -1 === e.inArray(r, he))
                    for (he.push(r); he.length > ue; )
                        he.shift();
                if (_ && window.localStorage)
                    try {
                        window.localStorage[_] = he.join(";")
                    } catch (e) {}
            }
        }
        function P() {
            var e = [];
            if (z.showPalette)
                for (var t = 0; t < he.length; t++) {
                    var r = tinycolor(he[t]).toRgbString();
                    pe[r] || e.push(he[t])
                }
            return e.reverse().slice(0, z.maxSelectionSize)
        }
        function x() {
            var t = H()
              , a = e.map(ce, function(e, a) {
                return r(e, t, "sp-palette-row sp-palette-row-" + a, z)
            });
            d(),
            he && a.push(r(P(), t, "sp-palette-row sp-palette-row-selection", z)),
            Se.html(a.join(""))
        }
        function w() {
            if (z.showInitial) {
                var e = ze
                  , t = H();
                Oe.html(r([e, t], t, "sp-palette-row-initial", z))
            }
        }
        function M() {
            (Q <= 0 || X <= 0 || K <= 0) && A(),
            Y = !0,
            ye.addClass(de),
            fe = null,
            ge.trigger("dragstart.spectrum", [H()])
        }
        function C() {
            Y = !1,
            ye.removeClass(de),
            ge.trigger("dragstop.spectrum", [H()])
        }
        function T() {
            var e = ke.val();
            if (null !== e && "" !== e || !Ge) {
                var t = tinycolor(e);
                t.isValid() ? (Z(t),
                I(),
                $()) : ke.addClass("sp-validation-error")
            } else
                Z(null),
                I(),
                $()
        }
        function E() {
            q ? R() : k()
        }
        function k() {
            var t = e.Event("beforeShow.spectrum");
            q ? A() : (ge.trigger(t, [H()]),
            !1 === V.beforeShow(H()) || t.isDefaultPrevented() || (a(),
            q = !0,
            e(me).on("keydown.spectrum", S),
            e(me).on("click.spectrum", O),
            e(window).on("resize.spectrum", W),
            Le.addClass("sp-active"),
            ye.appendTo(e("body")),
            A(),
            U(),
            ze = H(),
            w(),
            V.show(ze),
            ge.trigger("show.spectrum", [ze])))
        }
        function S(e) {
            27 === e.keyCode && R()
        }
        function O(e) {
            2 != e.button && (Y || (Ne ? $(!0) : j(),
            R()))
        }
        function R() {
            q && !B && (q = !1,
            e(me).off("keydown.spectrum", S),
            e(me).off("click.spectrum", O),
            e(window).off("resize.spectrum", W),
            Le.removeClass("sp-active"),
            ye.detach(),
            V.hide(H()),
            ge.trigger("hide.spectrum", [H()]))
        }
        function j() {
            Z(ze, !0),
            $(!0)
        }
        function Z(e, t) {
            if (tinycolor.equals(e, H()))
                U();
            else {
                var r, a;
                !e && Ge ? _e = !0 : (_e = !1,
                a = (r = tinycolor(e)).toHsv(),
                ne = a.h % 360 / 360,
                ie = a.s,
                se = a.v,
                oe = a.a),
                U(),
                r && r.isValid() && !t && (Be = z.preferredFormat || r.getFormat())
            }
        }
        function H(e) {
            return e = e || {},
            Ge && _e ? null : tinycolor.fromRatio({
                h: ne,
                s: ie,
                v: se,
                a: Math.round(1e3 * oe) / 1e3
            }, {
                format: e.format || Be
            })
        }
        function F() {
            return !ke.hasClass("sp-validation-error")
        }
        function I() {
            U(),
            V.move(H()),
            ge.trigger("move.spectrum", [H()])
        }
        function U() {
            ke.removeClass("sp-validation-error"),
            L();
            var e = tinycolor.fromRatio({
                h: ne,
                s: 1,
                v: 1
            });
            Pe.css("background-color", e.toHexString());
            var t = Be;
            oe < 1 && (0 !== oe || "name" !== t) && ("hex" !== t && "hex3" !== t && "hex6" !== t && "name" !== t || (t = "rgb"));
            var r = H({
                format: t
            })
              , a = "";
            if (Ae.removeClass("sp-clear-display"),
            Ae.css("background-color", "transparent"),
            !r && Ge)
                Ae.addClass("sp-clear-display");
            else {
                var n = r.toHexString()
                  , i = r.toRgbString();
                if (g || 1 === r.alpha ? Ae.css("background-color", i) : (Ae.css("background-color", "transparent"),
                Ae.css("filter", r.toFilter())),
                z.showAlpha) {
                    var s = r.toRgb();
                    s.a = 0;
                    var o = tinycolor(s).toRgbString()
                      , l = "linear-gradient(left, " + o + ", " + n + ")";
                    m ? Ce.css("filter", tinycolor(o).toFilter({
                        gradientType: 1
                    }, n)) : (Ce.css("background", "-webkit-" + l),
                    Ce.css("background", "-moz-" + l),
                    Ce.css("background", "-ms-" + l),
                    Ce.css("background", "linear-gradient(to right, " + o + ", " + n + ")"))
                }
                a = r.toString(t)
            }
            z.showInput && ke.val(a),
            z.showPalette && x(),
            w()
        }
        function L() {
            var e = ie
              , t = se;
            if (Ge && _e)
                Ee.hide(),
                Me.hide(),
                xe.hide();
            else {
                Ee.show(),
                Me.show(),
                xe.show();
                var r = e * X
                  , a = Q - t * Q;
                r = Math.max(-J, Math.min(X - J, r - J)),
                a = Math.max(-J, Math.min(Q - J, a - J)),
                xe.css({
                    top: a + "px",
                    left: r + "px"
                });
                var n = oe * te;
                Ee.css({
                    left: n - re / 2 + "px"
                });
                var i = ne * K;
                Me.css({
                    top: i - ae + "px"
                })
            }
        }
        function $(e) {
            var t = H()
              , r = ""
              , a = !tinycolor.equals(t, ze);
            t && (r = t.toString(Be),
            b(t)),
            Fe && ge.val(r),
            e && a && (V.change(t),
            ge.trigger("change", [t]))
        }
        function A() {
            q && (X = Pe.width(),
            Q = Pe.height(),
            J = xe.height(),
            ee = we.width(),
            K = we.height(),
            ae = Me.height(),
            te = Te.width(),
            re = Ee.width(),
            B || (ye.css("position", "absolute"),
            z.offset ? ye.offset(z.offset) : ye.offset(s(ye, $e))),
            L(),
            z.showPalette && x(),
            ge.trigger("reflow.spectrum"))
        }
        function D() {
            R(),
            ve = !0,
            ge.attr("disabled", !0),
            $e.addClass("sp-disabled")
        }
        var z = n(o, i)
          , B = z.flat
          , N = z.showSelectionPalette
          , _ = z.localStorageKey
          , G = z.theme
          , V = z.callbacks
          , W = h(A, 10)
          , q = !1
          , Y = !1
          , X = 0
          , Q = 0
          , J = 0
          , K = 0
          , ee = 0
          , te = 0
          , re = 0
          , ae = 0
          , ne = 0
          , ie = 0
          , se = 0
          , oe = 1
          , le = []
          , ce = []
          , pe = {}
          , he = z.selectionPalette.slice(0)
          , ue = z.maxSelectionSize
          , de = "sp-dragging"
          , fe = null
          , me = i.ownerDocument
          , ge = (me.body,
        e(i))
          , ve = !1
          , ye = e(y, me).addClass(G)
          , be = ye.find(".sp-picker-container")
          , Pe = ye.find(".sp-color")
          , xe = ye.find(".sp-dragger")
          , we = ye.find(".sp-hue")
          , Me = ye.find(".sp-slider")
          , Ce = ye.find(".sp-alpha-inner")
          , Te = ye.find(".sp-alpha")
          , Ee = ye.find(".sp-alpha-handle")
          , ke = ye.find(".sp-input")
          , Se = ye.find(".sp-palette")
          , Oe = ye.find(".sp-initial")
          , Re = ye.find(".sp-cancel")
          , je = ye.find(".sp-clear")
          , Ze = ye.find(".sp-choose")
          , He = ye.find(".sp-palette-toggle")
          , Fe = ge.is("input")
          , Ie = Fe && "color" === ge.attr("type") && u()
          , Ue = Fe && !B
          , Le = Ue ? e(v).addClass(G).addClass(z.className).addClass(z.replacerClassName) : e([])
          , $e = Ue ? Le : ge
          , Ae = Le.find(".sp-preview-inner")
          , De = z.color || Fe && ge.val()
          , ze = !1
          , Be = z.preferredFormat
          , Ne = !z.showButtons || z.clickoutFiresChange
          , _e = !De
          , Ge = z.allowEmpty && !Ie;
        !function() {
            function t(t) {
                return t.data && t.data.ignore ? (Z(e(t.target).closest(".sp-thumb-el").data("color")),
                I()) : (Z(e(t.target).closest(".sp-thumb-el").data("color")),
                I(),
                z.hideAfterPaletteSelect ? ($(!0),
                R()) : $()),
                !1
            }
            m && ye.find("*:not(input)").attr("unselectable", "on"),
            c(),
            Ue && ge.after(Le).hide(),
            Ge || je.hide(),
            B && ge.after(ye).hide(),
            d(),
            $e.on("click.spectrum touchstart.spectrum", function(t) {
                ve || E(),
                t.stopPropagation(),
                e(t.target).is("input") || t.preventDefault()
            }),
            (ge.is(":disabled") || !0 === z.disabled) && D(),
            ye.click(l),
            ke.change(T),
            ke.on("paste", function() {
                setTimeout(T, 1)
            }),
            ke.keydown(function(e) {
                13 == e.keyCode && T()
            }),
            Re.text(z.cancelText),
            Re.on("click.spectrum", function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                j(),
                R()
            }),
            je.attr("title", z.clearText),
            je.on("click.spectrum", function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                _e = !0,
                I(),
                B && $(!0)
            }),
            Ze.text(z.chooseText),
            Ze.on("click.spectrum", function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                m && ke.is(":focus") && ke.trigger("change"),
                F() && ($(!0),
                R())
            }),
            He.text(z.showPaletteOnly ? z.togglePaletteMoreText : z.togglePaletteLessText),
            He.on("click.spectrum", function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                z.showPaletteOnly = !z.showPaletteOnly,
                z.showPaletteOnly || B || ye.css("left", "-=" + (be.outerWidth(!0) + 5)),
                c()
            }),
            p(Te, function(e, t, r) {
                oe = e / te,
                _e = !1,
                r.shiftKey && (oe = Math.round(10 * oe) / 10),
                I()
            }, M, C),
            p(we, function(e, t) {
                ne = parseFloat(t / K),
                _e = !1,
                z.showAlpha || (oe = 1),
                I()
            }, M, C),
            p(Pe, function(e, t, r) {
                if (r.shiftKey) {
                    if (!fe) {
                        var a = ie * X
                          , n = Q - se * Q
                          , i = Math.abs(e - a) > Math.abs(t - n);
                        fe = i ? "x" : "y"
                    }
                } else
                    fe = null;
                var s = !fe || "x" === fe
                  , o = !fe || "y" === fe;
                s && (ie = parseFloat(e / X)),
                o && (se = parseFloat((Q - t) / Q)),
                _e = !1,
                z.showAlpha || (oe = 1),
                I()
            }, M, C),
            De ? (Z(De),
            U(),
            Be = z.preferredFormat || tinycolor(De).format,
            b(De)) : U(),
            B && k();
            var r = m ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            Se.on(r, ".sp-thumb-el", t),
            Oe.on(r, ".sp-thumb-el:nth-child(1)", {
                ignore: !0
            }, t)
        }();
        var Ve = {
            show: k,
            hide: R,
            toggle: E,
            reflow: A,
            option: function(r, a) {
                return r === t ? e.extend({}, z) : a === t ? z[r] : (z[r] = a,
                "preferredFormat" === r && (Be = z.preferredFormat),
                void c())
            },
            enable: function() {
                ve = !1,
                ge.attr("disabled", !1),
                $e.removeClass("sp-disabled")
            },
            disable: D,
            offset: function(e) {
                z.offset = e,
                A()
            },
            set: function(e) {
                Z(e),
                $()
            },
            get: H,
            destroy: function() {
                ge.show(),
                $e.off("click.spectrum touchstart.spectrum"),
                ye.remove(),
                Le.remove(),
                f[Ve.id] = null
            },
            container: ye
        };
        return Ve.id = f.push(Ve) - 1,
        Ve
    }
    function s(t, r) {
        var a = t.outerWidth()
          , n = t.outerHeight()
          , i = r.outerHeight()
          , s = t[0].ownerDocument
          , o = s.documentElement
          , l = o.clientWidth + e(s).scrollLeft()
          , c = o.clientHeight + e(s).scrollTop()
          , p = r.offset()
          , h = p.left
          , u = p.top;
        return u += i,
        h -= Math.min(h, h + a > l && l > a ? Math.abs(h + a - l) : 0),
        u -= Math.min(u, u + n > c && c > n ? Math.abs(n + i - 0) : 0),
        {
            top: u,
            bottom: p.bottom,
            left: h,
            right: p.right,
            width: p.width,
            height: p.height
        }
    }
    function o() {}
    function l(e) {
        e.stopPropagation()
    }
    function c(e, t) {
        var r = Array.prototype.slice
          , a = r.call(arguments, 2);
        return function() {
            return e.apply(t, a.concat(r.call(arguments)))
        }
    }
    function p(t, r, a, n) {
        function i(e) {
            e.stopPropagation && e.stopPropagation(),
            e.preventDefault && e.preventDefault(),
            e.returnValue = !1
        }
        function s(e) {
            if (c) {
                if (m && l.documentMode < 9 && !e.button)
                    return o();
                var a = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0]
                  , n = a && a.pageX || e.pageX
                  , s = a && a.pageY || e.pageY
                  , f = Math.max(0, Math.min(n - p.left, u))
                  , g = Math.max(0, Math.min(s - p.top, h));
                d && i(e),
                r.apply(t, [f, g, e])
            }
        }
        function o() {
            c && (e(l).off(f),
            e(l.body).removeClass("sp-dragging"),
            setTimeout(function() {
                n.apply(t, arguments)
            }, 0)),
            c = !1
        }
        r = r || function() {}
        ,
        a = a || function() {}
        ,
        n = n || function() {}
        ;
        var l = document
          , c = !1
          , p = {}
          , h = 0
          , u = 0
          , d = "ontouchstart"in window
          , f = {};
        f.selectstart = i,
        f.dragstart = i,
        f["touchmove mousemove"] = s,
        f["touchend mouseup"] = o,
        e(t).on("touchstart mousedown", function(r) {
            (r.which ? 3 == r.which : 2 == r.button) || c || !1 !== a.apply(t, arguments) && (c = !0,
            h = e(t).height(),
            u = e(t).width(),
            p = e(t).offset(),
            e(l).on(f),
            e(l.body).addClass("sp-dragging"),
            s(r),
            i(r))
        })
    }
    function h(e, t, r) {
        var a;
        return function() {
            var n = this
              , i = arguments;
            r && clearTimeout(a),
            !r && a || (a = setTimeout(function() {
                a = null,
                e.apply(n, i)
            }, t))
        }
    }
    function u() {
        return e.fn.spectrum.inputTypeColorSupport()
    }
    var d = {
        beforeShow: o,
        move: o,
        change: o,
        show: o,
        hide: o,
        color: !1,
        flat: !1,
        showInput: !1,
        allowEmpty: !1,
        showButtons: !0,
        clickoutFiresChange: !0,
        showInitial: !1,
        showPalette: !1,
        showPaletteOnly: !1,
        hideAfterPaletteSelect: !1,
        togglePaletteOnly: !1,
        showSelectionPalette: !0,
        localStorageKey: !1,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: !1,
        className: "",
        containerClassName: "",
        replacerClassName: "",
        showAlpha: !1,
        theme: "sp-light",
        palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
        selectionPalette: [],
        disabled: !1,
        offset: null
    }
      , f = []
      , m = !!/msie/i.exec(window.navigator.userAgent)
      , g = function() {
        function e(e, t) {
            return !!~("" + e).indexOf(t)
        }
        var t = document.createElement("div").style;
        return t.cssText = "background-color:rgba(0,0,0,.5)",
        e(t.backgroundColor, "rgba") || e(t.backgroundColor, "hsla")
    }()
      , v = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join("")
      , y = function() {
        var e = "";
        if (m)
            for (var t = 1; t <= 6; t++)
                e += "<div class='sp-" + t + "'></div>";
        return ["<div class='sp-container'>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "<div class='sp-palette-button-container sp-cf'>", "<button type='button' class='sp-palette-toggle'></button>", "</div>", "</div>", "<div class='sp-picker-container'>", "<div class='sp-top sp-cf'>", "<div class='sp-fill'></div>", "<div class='sp-top-inner'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-clear sp-clear-display'>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", e, "</div>", "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", "</div>", "<div class='sp-input-container sp-cf'>", "<input class='sp-input' type='text' spellcheck='false'  />", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-button-container sp-cf'>", "<a class='sp-cancel' href='#'></a>", "<button type='button' class='sp-choose'></button>", "</div>", "</div>", "</div>"].join("")
    }();
    e.fn.spectrum = function(t, r) {
        if ("string" == typeof t) {
            var a = this
              , n = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var r = f[e(this).data("spectrum.id")];
                if (r) {
                    var i = r[t];
                    if (!i)
                        throw new Error("Spectrum: no such method: '" + t + "'");
                    "get" == t ? a = r.get() : "container" == t ? a = r.container : "option" == t ? a = r.option.apply(r, n) : "destroy" == t ? (r.destroy(),
                    e(this).removeData("spectrum.id")) : i.apply(r, n)
                }
            }),
            a
        }
        return this.spectrum("destroy").each(function() {
            var r = i(this, e.extend({}, e(this).data(), t));
            e(this).data("spectrum.id", r.id)
        })
    }
    ,
    e.fn.spectrum.load = !0,
    e.fn.spectrum.loadOpts = {},
    e.fn.spectrum.draggable = p,
    e.fn.spectrum.defaults = d,
    e.fn.spectrum.inputTypeColorSupport = function t() {
        if (void 0 === t._cachedResult) {
            var r = e("<input type='color'/>")[0];
            t._cachedResult = "color" === r.type && "" !== r.value
        }
        return t._cachedResult
    }
    ,
    e.spectrum = {},
    e.spectrum.localization = {},
    e.spectrum.palettes = {},
    e.fn.spectrum.processNativeColorInputs = function() {
        var t = e("input[type=color]");
        t.length && !u() && t.spectrum({
            preferredFormat: "hex6"
        })
    }
    ,
    function() {
        function e(e) {
            var r = {
                r: 0,
                g: 0,
                b: 0
            }
              , n = 1
              , s = !1
              , o = !1;
            return "string" == typeof e && (e = j(e)),
            "object" == typeof e && (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b") ? (r = t(e.r, e.g, e.b),
            s = !0,
            o = "%" === String(e.r).substr(-1) ? "prgb" : "rgb") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("v") ? (e.s = S(e.s),
            e.v = S(e.v),
            r = i(e.h, e.s, e.v),
            s = !0,
            o = "hsv") : e.hasOwnProperty("h") && e.hasOwnProperty("s") && e.hasOwnProperty("l") && (e.s = S(e.s),
            e.l = S(e.l),
            r = a(e.h, e.s, e.l),
            s = !0,
            o = "hsl"),
            e.hasOwnProperty("a") && (n = e.a)),
            n = x(n),
            {
                ok: s,
                format: e.format || o,
                r: L(255, $(r.r, 0)),
                g: L(255, $(r.g, 0)),
                b: L(255, $(r.b, 0)),
                a: n
            }
        }
        function t(e, t, r) {
            return {
                r: 255 * w(e, 255),
                g: 255 * w(t, 255),
                b: 255 * w(r, 255)
            }
        }
        function r(e, t, r) {
            e = w(e, 255),
            t = w(t, 255),
            r = w(r, 255);
            var a, n, i = $(e, t, r), s = L(e, t, r), o = (i + s) / 2;
            if (i == s)
                a = n = 0;
            else {
                var l = i - s;
                switch (n = o > .5 ? l / (2 - i - s) : l / (i + s),
                i) {
                case e:
                    a = (t - r) / l + (t < r ? 6 : 0);
                    break;
                case t:
                    a = (r - e) / l + 2;
                    break;
                case r:
                    a = (e - t) / l + 4
                }
                a /= 6
            }
            return {
                h: a,
                s: n,
                l: o
            }
        }
        function a(e, t, r) {
            function a(e, t, r) {
                return r < 0 && (r += 1),
                r > 1 && (r -= 1),
                r < 1 / 6 ? e + 6 * (t - e) * r : r < .5 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e
            }
            var n, i, s;
            if (e = w(e, 360),
            t = w(t, 100),
            r = w(r, 100),
            0 === t)
                n = i = s = r;
            else {
                var o = r < .5 ? r * (1 + t) : r + t - r * t
                  , l = 2 * r - o;
                n = a(l, o, e + 1 / 3),
                i = a(l, o, e),
                s = a(l, o, e - 1 / 3)
            }
            return {
                r: 255 * n,
                g: 255 * i,
                b: 255 * s
            }
        }
        function n(e, t, r) {
            e = w(e, 255),
            t = w(t, 255),
            r = w(r, 255);
            var a, n, i = $(e, t, r), s = L(e, t, r), o = i, l = i - s;
            if (n = 0 === i ? 0 : l / i,
            i == s)
                a = 0;
            else {
                switch (i) {
                case e:
                    a = (t - r) / l + (t < r ? 6 : 0);
                    break;
                case t:
                    a = (r - e) / l + 2;
                    break;
                case r:
                    a = (e - t) / l + 4
                }
                a /= 6
            }
            return {
                h: a,
                s: n,
                v: o
            }
        }
        function i(e, t, r) {
            e = 6 * w(e, 360),
            t = w(t, 100),
            r = w(r, 100);
            var a = I.floor(e)
              , n = e - a
              , i = r * (1 - t)
              , s = r * (1 - n * t)
              , o = r * (1 - (1 - n) * t)
              , l = a % 6;
            return {
                r: 255 * [r, s, i, i, o, r][l],
                g: 255 * [o, r, r, s, i, i][l],
                b: 255 * [i, i, o, r, r, s][l]
            }
        }
        function s(e, t, r, a) {
            var n = [k(U(e).toString(16)), k(U(t).toString(16)), k(U(r).toString(16))];
            return a && n[0].charAt(0) == n[0].charAt(1) && n[1].charAt(0) == n[1].charAt(1) && n[2].charAt(0) == n[2].charAt(1) ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0) : n.join("")
        }
        function o(e, t, r, a) {
            return [k(O(a)), k(U(e).toString(16)), k(U(t).toString(16)), k(U(r).toString(16))].join("")
        }
        function l(e, t) {
            t = 0 === t ? 0 : t || 10;
            var r = D(e).toHsl();
            return r.s -= t / 100,
            r.s = M(r.s),
            D(r)
        }
        function c(e, t) {
            t = 0 === t ? 0 : t || 10;
            var r = D(e).toHsl();
            return r.s += t / 100,
            r.s = M(r.s),
            D(r)
        }
        function p(e) {
            return D(e).desaturate(100)
        }
        function h(e, t) {
            t = 0 === t ? 0 : t || 10;
            var r = D(e).toHsl();
            return r.l += t / 100,
            r.l = M(r.l),
            D(r)
        }
        function u(e, t) {
            t = 0 === t ? 0 : t || 10;
            var r = D(e).toRgb();
            return r.r = $(0, L(255, r.r - U(-t / 100 * 255))),
            r.g = $(0, L(255, r.g - U(-t / 100 * 255))),
            r.b = $(0, L(255, r.b - U(-t / 100 * 255))),
            D(r)
        }
        function d(e, t) {
            t = 0 === t ? 0 : t || 10;
            var r = D(e).toHsl();
            return r.l -= t / 100,
            r.l = M(r.l),
            D(r)
        }
        function f(e, t) {
            var r = D(e).toHsl()
              , a = (U(r.h) + t) % 360;
            return r.h = a < 0 ? 360 + a : a,
            D(r)
        }
        function m(e) {
            var t = D(e).toHsl();
            return t.h = (t.h + 180) % 360,
            D(t)
        }
        function g(e) {
            var t = D(e).toHsl()
              , r = t.h;
            return [D(e), D({
                h: (r + 120) % 360,
                s: t.s,
                l: t.l
            }), D({
                h: (r + 240) % 360,
                s: t.s,
                l: t.l
            })]
        }
        function v(e) {
            var t = D(e).toHsl()
              , r = t.h;
            return [D(e), D({
                h: (r + 90) % 360,
                s: t.s,
                l: t.l
            }), D({
                h: (r + 180) % 360,
                s: t.s,
                l: t.l
            }), D({
                h: (r + 270) % 360,
                s: t.s,
                l: t.l
            })]
        }
        function y(e) {
            var t = D(e).toHsl()
              , r = t.h;
            return [D(e), D({
                h: (r + 72) % 360,
                s: t.s,
                l: t.l
            }), D({
                h: (r + 216) % 360,
                s: t.s,
                l: t.l
            })]
        }
        function b(e, t, r) {
            t = t || 6,
            r = r || 30;
            var a = D(e).toHsl()
              , n = 360 / r
              , i = [D(e)];
            for (a.h = (a.h - (n * t >> 1) + 720) % 360; --t; )
                a.h = (a.h + n) % 360,
                i.push(D(a));
            return i
        }
        function P(e, t) {
            t = t || 6;
            for (var r = D(e).toHsv(), a = r.h, n = r.s, i = r.v, s = [], o = 1 / t; t--; )
                s.push(D({
                    h: a,
                    s: n,
                    v: i
                })),
                i = (i + o) % 1;
            return s
        }
        function x(e) {
            return e = parseFloat(e),
            (isNaN(e) || e < 0 || e > 1) && (e = 1),
            e
        }
        function w(e, t) {
            T(e) && (e = "100%");
            var r = E(e);
            return e = L(t, $(0, parseFloat(e))),
            r && (e = parseInt(e * t, 10) / 100),
            I.abs(e - t) < 1e-6 ? 1 : e % t / parseFloat(t)
        }
        function M(e) {
            return L(1, $(0, e))
        }
        function C(e) {
            return parseInt(e, 16)
        }
        function T(e) {
            return "string" == typeof e && -1 != e.indexOf(".") && 1 === parseFloat(e)
        }
        function E(e) {
            return "string" == typeof e && -1 != e.indexOf("%")
        }
        function k(e) {
            return 1 == e.length ? "0" + e : "" + e
        }
        function S(e) {
            return e <= 1 && (e = 100 * e + "%"),
            e
        }
        function O(e) {
            return Math.round(255 * parseFloat(e)).toString(16)
        }
        function R(e) {
            return C(e) / 255
        }
        function j(e) {
            e = e.replace(Z, "").replace(H, "").toLowerCase();
            var t = !1;
            if (z[e])
                e = z[e],
                t = !0;
            else if ("transparent" == e)
                return {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                    format: "name"
                };
            var r;
            return (r = N.rgb.exec(e)) ? {
                r: r[1],
                g: r[2],
                b: r[3]
            } : (r = N.rgba.exec(e)) ? {
                r: r[1],
                g: r[2],
                b: r[3],
                a: r[4]
            } : (r = N.hsl.exec(e)) ? {
                h: r[1],
                s: r[2],
                l: r[3]
            } : (r = N.hsla.exec(e)) ? {
                h: r[1],
                s: r[2],
                l: r[3],
                a: r[4]
            } : (r = N.hsv.exec(e)) ? {
                h: r[1],
                s: r[2],
                v: r[3]
            } : (r = N.hsva.exec(e)) ? {
                h: r[1],
                s: r[2],
                v: r[3],
                a: r[4]
            } : (r = N.hex8.exec(e)) ? {
                a: R(r[1]),
                r: C(r[2]),
                g: C(r[3]),
                b: C(r[4]),
                format: t ? "name" : "hex8"
            } : (r = N.hex6.exec(e)) ? {
                r: C(r[1]),
                g: C(r[2]),
                b: C(r[3]),
                format: t ? "name" : "hex"
            } : !!(r = N.hex3.exec(e)) && {
                r: C(r[1] + "" + r[1]),
                g: C(r[2] + "" + r[2]),
                b: C(r[3] + "" + r[3]),
                format: t ? "name" : "hex"
            }
        }
        var Z = /^[\s,#]+/
          , H = /\s+$/
          , F = 0
          , I = Math
          , U = I.round
          , L = I.min
          , $ = I.max
          , A = I.random
          , D = function(t, r) {
            if (t = t || "",
            r = r || {},
            t instanceof D)
                return t;
            if (!(this instanceof D))
                return new D(t,r);
            var a = e(t);
            this._originalInput = t,
            this._r = a.r,
            this._g = a.g,
            this._b = a.b,
            this._a = a.a,
            this._roundA = U(1e3 * this._a) / 1e3,
            this._format = r.format || a.format,
            this._gradientType = r.gradientType,
            this._r < 1 && (this._r = U(this._r)),
            this._g < 1 && (this._g = U(this._g)),
            this._b < 1 && (this._b = U(this._b)),
            this._ok = a.ok,
            this._tc_id = F++
        };
        D.prototype = {
            isDark: function() {
                return this.getBrightness() < 128
            },
            isLight: function() {
                return !this.isDark()
            },
            isValid: function() {
                return this._ok
            },
            getOriginalInput: function() {
                return this._originalInput
            },
            getFormat: function() {
                return this._format
            },
            getAlpha: function() {
                return this._a
            },
            getBrightness: function() {
                var e = this.toRgb();
                return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3
            },
            setAlpha: function(e) {
                return this._a = x(e),
                this._roundA = U(1e3 * this._a) / 1e3,
                this
            },
            toHsv: function() {
                var e = n(this._r, this._g, this._b);
                return {
                    h: 360 * e.h,
                    s: e.s,
                    v: e.v,
                    a: this._a
                }
            },
            toHsvString: function() {
                var e = n(this._r, this._g, this._b)
                  , t = U(360 * e.h)
                  , r = U(100 * e.s)
                  , a = U(100 * e.v);
                return 1 == this._a ? "hsv(" + t + ", " + r + "%, " + a + "%)" : "hsva(" + t + ", " + r + "%, " + a + "%, " + this._roundA + ")"
            },
            toHsl: function() {
                var e = r(this._r, this._g, this._b);
                return {
                    h: 360 * e.h,
                    s: e.s,
                    l: e.l,
                    a: this._a
                }
            },
            toHslString: function() {
                var e = r(this._r, this._g, this._b)
                  , t = U(360 * e.h)
                  , a = U(100 * e.s)
                  , n = U(100 * e.l);
                return 1 == this._a ? "hsl(" + t + ", " + a + "%, " + n + "%)" : "hsla(" + t + ", " + a + "%, " + n + "%, " + this._roundA + ")"
            },
            toHex: function(e) {
                return s(this._r, this._g, this._b, e)
            },
            toHexString: function(e) {
                return "#" + this.toHex(e)
            },
            toHex8: function() {
                return o(this._r, this._g, this._b, this._a)
            },
            toHex8String: function() {
                return "#" + this.toHex8()
            },
            toRgb: function() {
                return {
                    r: U(this._r),
                    g: U(this._g),
                    b: U(this._b),
                    a: this._a
                }
            },
            toRgbString: function() {
                return 1 == this._a ? "rgb(" + U(this._r) + ", " + U(this._g) + ", " + U(this._b) + ")" : "rgba(" + U(this._r) + ", " + U(this._g) + ", " + U(this._b) + ", " + this._roundA + ")"
            },
            toPercentageRgb: function() {
                return {
                    r: U(100 * w(this._r, 255)) + "%",
                    g: U(100 * w(this._g, 255)) + "%",
                    b: U(100 * w(this._b, 255)) + "%",
                    a: this._a
                }
            },
            toPercentageRgbString: function() {
                return 1 == this._a ? "rgb(" + U(100 * w(this._r, 255)) + "%, " + U(100 * w(this._g, 255)) + "%, " + U(100 * w(this._b, 255)) + "%)" : "rgba(" + U(100 * w(this._r, 255)) + "%, " + U(100 * w(this._g, 255)) + "%, " + U(100 * w(this._b, 255)) + "%, " + this._roundA + ")"
            },
            toName: function() {
                return 0 === this._a ? "transparent" : !(this._a < 1) && (B[s(this._r, this._g, this._b, !0)] || !1)
            },
            toFilter: function(e) {
                var t = "#" + o(this._r, this._g, this._b, this._a)
                  , r = t
                  , a = this._gradientType ? "GradientType = 1, " : "";
                return e && (r = D(e).toHex8String()),
                "progid:DXImageTransform.Microsoft.gradient(" + a + "startColorstr=" + t + ",endColorstr=" + r + ")"
            },
            toString: function(e) {
                var t = !!e;
                e = e || this._format;
                var r = !1
                  , a = this._a < 1 && this._a >= 0;
                return t || !a || "hex" !== e && "hex6" !== e && "hex3" !== e && "name" !== e ? ("rgb" === e && (r = this.toRgbString()),
                "prgb" === e && (r = this.toPercentageRgbString()),
                "hex" !== e && "hex6" !== e || (r = this.toHexString()),
                "hex3" === e && (r = this.toHexString(!0)),
                "hex8" === e && (r = this.toHex8String()),
                "name" === e && (r = this.toName()),
                "hsl" === e && (r = this.toHslString()),
                "hsv" === e && (r = this.toHsvString()),
                r || this.toHexString()) : "name" === e && 0 === this._a ? this.toName() : this.toRgbString()
            },
            _applyModification: function(e, t) {
                var r = e.apply(null, [this].concat([].slice.call(t)));
                return this._r = r._r,
                this._g = r._g,
                this._b = r._b,
                this.setAlpha(r._a),
                this
            },
            lighten: function() {
                return this._applyModification(h, arguments)
            },
            brighten: function() {
                return this._applyModification(u, arguments)
            },
            darken: function() {
                return this._applyModification(d, arguments)
            },
            desaturate: function() {
                return this._applyModification(l, arguments)
            },
            saturate: function() {
                return this._applyModification(c, arguments)
            },
            greyscale: function() {
                return this._applyModification(p, arguments)
            },
            spin: function() {
                return this._applyModification(f, arguments)
            },
            _applyCombination: function(e, t) {
                return e.apply(null, [this].concat([].slice.call(t)))
            },
            analogous: function() {
                return this._applyCombination(b, arguments)
            },
            complement: function() {
                return this._applyCombination(m, arguments)
            },
            monochromatic: function() {
                return this._applyCombination(P, arguments)
            },
            splitcomplement: function() {
                return this._applyCombination(y, arguments)
            },
            triad: function() {
                return this._applyCombination(g, arguments)
            },
            tetrad: function() {
                return this._applyCombination(v, arguments)
            }
        },
        D.fromRatio = function(e, t) {
            if ("object" == typeof e) {
                var r = {};
                for (var a in e)
                    e.hasOwnProperty(a) && (r[a] = "a" === a ? e[a] : S(e[a]));
                e = r
            }
            return D(e, t)
        }
        ,
        D.equals = function(e, t) {
            return !(!e || !t) && D(e).toRgbString() == D(t).toRgbString()
        }
        ,
        D.random = function() {
            return D.fromRatio({
                r: A(),
                g: A(),
                b: A()
            })
        }
        ,
        D.mix = function(e, t, r) {
            r = 0 === r ? 0 : r || 50;
            var a, n = D(e).toRgb(), i = D(t).toRgb(), s = r / 100, o = 2 * s - 1, l = i.a - n.a, c = 1 - (a = ((a = o * l == -1 ? o : (o + l) / (1 + o * l)) + 1) / 2), p = {
                r: i.r * a + n.r * c,
                g: i.g * a + n.g * c,
                b: i.b * a + n.b * c,
                a: i.a * s + n.a * (1 - s)
            };
            return D(p)
        }
        ,
        D.readability = function(e, t) {
            var r = D(e)
              , a = D(t)
              , n = r.toRgb()
              , i = a.toRgb()
              , s = r.getBrightness()
              , o = a.getBrightness()
              , l = Math.max(n.r, i.r) - Math.min(n.r, i.r) + Math.max(n.g, i.g) - Math.min(n.g, i.g) + Math.max(n.b, i.b) - Math.min(n.b, i.b);
            return {
                brightness: Math.abs(s - o),
                color: l
            }
        }
        ,
        D.isReadable = function(e, t) {
            var r = D.readability(e, t);
            return r.brightness > 125 && r.color > 500
        }
        ,
        D.mostReadable = function(e, t) {
            for (var r = null, a = 0, n = !1, i = 0; i < t.length; i++) {
                var s = D.readability(e, t[i])
                  , o = s.brightness > 125 && s.color > 500
                  , l = s.brightness / 125 * 3 + s.color / 500;
                (o && !n || o && n && l > a || !o && !n && l > a) && (n = o,
                a = l,
                r = D(t[i]))
            }
            return r
        }
        ;
        var z = D.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "0ff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "00f",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            burntsienna: "ea7e5d",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "0ff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "f0f",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            rebeccapurple: "663399",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        }
          , B = D.hexNames = function(e) {
            var t = {};
            for (var r in e)
                e.hasOwnProperty(r) && (t[e[r]] = r);
            return t
        }(z)
          , N = function() {
            var e = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)"
              , t = "[\\s|\\(]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")\\s*\\)?"
              , r = "[\\s|\\(]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")[,|\\s]+(" + e + ")\\s*\\)?";
            return {
                rgb: new RegExp("rgb" + t),
                rgba: new RegExp("rgba" + r),
                hsl: new RegExp("hsl" + t),
                hsla: new RegExp("hsla" + r),
                hsv: new RegExp("hsv" + t),
                hsva: new RegExp("hsva" + r),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            }
        }();
        window.tinycolor = D
    }(),
    e(function() {
        e.fn.spectrum.load && e.fn.spectrum.processNativeColorInputs()
    })
}),
function(e) {
    function t(e, t) {
        return e.position - t.position
    }
    function r(e, t) {
        return "function" == typeof e.bind ? e.bind(t) : function() {
            e.apply(t, arguments)
        }
    }
    function a(t, a) {
        this.$el = t,
        this.$el.css("position", "relative"),
        this.opts = a;
        var n = e("<div class='gradientPicker-preview'></div>");
        this.$el.append(n),
        this.$disp = n;
        var s = e("<div class='gradientPicker-ctrlPts'></div>");
        this.$el.append(s),
        this.$ctrlPtContainer = s,
        this.updatePreview = r(this.updatePreview, this),
        this.controlPoints = [],
        this.ctrlPtConfig = new i(this.$el,a);
        for (var o = 0; o < a.controlPoints.length; ++o) {
            var l = this.createCtrlPt(a.controlPoints[o]);
            this.controlPoints.push(l)
        }
        this.destroyed = r(this.destroyed, this),
        this.$el.on("destroyed", this.destroyed),
        this.previewClicked = r(this.previewClicked, this),
        n.click(this.previewClicked),
        this.updatePreview()
    }
    function n(t, a, n, i) {
        this.$el = e("<div class='gradientPicker-ctrlPt'></div>"),
        t.append(this.$el),
        this.$parentEl = t,
        this.configView = i,
        "string" == typeof a ? (a = a.split(" "),
        this.position = parseFloat(a[1]) / 100,
        this.color = a[0]) : (this.position = a.position,
        this.color = a.color),
        this.listener = n,
        this.outerWidth = this.$el.outerWidth(),
        this.$el.css("background-color", this.color);
        var s = 234 * this.position;
        this.$el.css("left", s),
        this.drag = r(this.drag, this),
        this.stop = r(this.stop, this),
        this.start = r(this.start, this),
        this.clicked = r(this.clicked, this),
        this.colorChanged = r(this.colorChanged, this),
        this.$el[0].onclick = this.clicked,
        this.$el.drag("start", this.start).drag("end", this.stop).drag(this.drag)
    }
    function i(t, a) {
        this.$el = e('<div class="gradientPicker-ptConfig" style="visibility: hidden"></div>'),
        t.append(this.$el);
        var n = e('<input type="text" id="cp_colorsel" />');
        this.$el.append(n);
        var i = e("<div class='gradientPicker-close'></div>").text("delete");
        this.$el.append(i),
        this.colorChanged = r(this.colorChanged, this),
        this.closed = r(this.closed, this),
        this.removeClicked = r(this.removeClicked, this),
        this.hide = r(this.hide, this),
        n.spectrum({
            flat: !1,
            showInput: !0,
            showInitial: !0,
            allowEmpty: !1,
            showAlpha: !0,
            disabled: !1,
            showPalette: !0,
            clickoutFiresChange: !0,
            preferredFormat: "RGBA",
            hide: this.closed,
            change: this.colorChanged
        }),
        this.$cpicker = n,
        this.opts = a,
        this.visible = !1,
        i.click(this.removeClicked)
    }
    new Image;
    e.event.special.destroyed || (e.event.special.destroyed = {
        remove: function(e) {
            e.handler && e.handler()
        }
    }),
    a.prototype = {
        createCtrlPt: function(e) {
            return new n(this.$ctrlPtContainer,e,this,this.ctrlPtConfig)
        },
        destroyed: function() {
            e(document).unbind("click", this.docClicked)
        },
        updateOptions: function(t) {
            e.extend(this.opts, t);
            for (r = 0; r < this.controlPoints.length; ++r)
                this.controlPoints[r].$el.remove();
            this.controlPoints = [];
            for (var r = 0; r < t.controlPoints.length; ++r) {
                var a = this.createCtrlPt(t.controlPoints[r]);
                this.controlPoints.push(a)
            }
            this.updatePreview(!1)
        },
        updatePreview: function(e) {
            var r = [];
            this.controlPoints.sort(t);
            for (var a = 0; a < this.controlPoints.length; ++a) {
                var n = this.controlPoints[a];
                r.push({
                    position: n.position,
                    color: n.color
                })
            }
            var i = this._generatePreviewStyles();
            this.$disp.css("background", i),
            e && this.opts.change(r, i)
        },
        removeControlPoint: function(e) {
            var t = this.controlPoints.indexOf(e);
            -1 != t && (this.controlPoints.splice(t, 1),
            e.$el.remove())
        },
        previewClicked: function(r) {
            for (var a, n = r.offsetX / e(r.target).outerWidth(), i = 0; i < this.controlPoints.length; i++) {
                if (0 === i && this.controlPoints[i].position > n) {
                    a = this.controlPoints[i].color;
                    break
                }
                if (this.controlPoints[i].position <= n)
                    if (i === this.controlPoints.length - 1)
                        a = this.controlPoints[i].color;
                    else {
                        var s = tinycolor(this.controlPoints[i].color)
                          , o = tinycolor(this.controlPoints[i + 1].color)
                          , l = (n - this.controlPoints[i].position) / (this.controlPoints[i + 1].position - this.controlPoints[i].position);
                        a = tinycolor({
                            r: s._r + l * (o._r - s._r),
                            g: s._g + l * (o._g - s._g),
                            b: s._b + l * (o._b - s._b),
                            a: s._a + l * (o._a - s._a)
                        }).toRgbString()
                    }
            }
            void 0 === a && (a = "rgba(0,0,0,1.0)");
            var c = this.createCtrlPt({
                position: n,
                color: a
            });
            this.controlPoints.push(c),
            this.controlPoints.sort(t)
        },
        _generatePreviewStyles: function() {
            if (1 === this.controlPoints.length)
                return this.controlPoints[0].color;
            for (var e = "linear-gradient(to right, ", t = !0, r = 0; r < this.controlPoints.length; ++r) {
                var a = this.controlPoints[r];
                t ? t = !1 : e += ", ",
                e += a.color + " " + (100 * a.position | 0) + "%"
            }
            return e += ")"
        }
    },
    n.prototype = {
        drag: function(e, t) {
            var r = Math.min(t.limit.right, Math.max(t.limit.left, t.offsetX)) - t.limit.left;
            this.$el.css("left", r),
            this.position = r / (this.$parentEl.width() - this.$el.outerWidth()),
            this.listener.updatePreview(!1)
        },
        start: function(e, t) {
            t.limit = this.$parentEl.offset(),
            t.limit.right = t.limit.left + this.$parentEl.outerWidth() - this.$el.outerWidth()
        },
        stop: function(e, t) {
            this.listener.updatePreview(!0)
        },
        clicked: function(e) {
            return this.configView.show(this.$el.position(), this.color, this),
            e.stopPropagation(),
            !1
        },
        colorChanged: function(e, t) {
            this.color = e,
            this.$el.css("background-color", this.color),
            t && this.listener.updatePreview(!0)
        },
        removeClicked: function() {
            this.listener.removeControlPoint(this),
            this.listener.updatePreview(!0)
        }
    },
    i.prototype = {
        show: function(t, r, a) {
            this.visible = !0,
            this.listener = a,
            this.$el.css("visibility", "visible"),
            this.$cpicker.spectrum("set", r),
            this.$el.css("left", Math.min(t.left, a.$parentEl.width() - this.$el.outerWidth())),
            e(document).on("click", this.hide)
        },
        hide: function() {
            this.visible && (this.$el.css("visibility", "hidden"),
            this.visible = !1,
            e(document).off("click", this.hide))
        },
        closed: function(e) {
            this.listener.colorChanged(e.toRgbString(), !0)
        },
        colorChanged: function(e) {
            this.listener.colorChanged(e.toRgbString())
        },
        removeClicked: function() {
            this.listener.removeClicked(),
            this.hide()
        }
    };
    var s = {
        init: function(t) {
            t = e.extend({
                controlPoints: ["#FFF 0%", "#000 100%"],
                type: "linear",
                fillDirection: "left",
                generateStyles: !1,
                change: function() {}
            }, t),
            this.each(function() {
                var r = e(this)
                  , n = new a(r,t);
                r.data("gradientPicker-sel", n)
            })
        },
        update: function(t) {
            this.each(function() {
                var r = e(this).data("gradientPicker-sel");
                null != r && r.updateOptions(t)
            })
        }
    };
    e.fn.gradientPicker = function(e, t) {
        "string" == typeof e && "init" !== e ? s[e].call(this, t) : (t = e,
        s.init.call(this, t))
    }
}(jQuery),
function(e) {
    var t, r, a, n = !1, i = !1, s = function(e, t) {
        e > t.data("max") ? e = t.data("max") : e < t.data("min") && (e = t.data("min")),
        e = e.toFixed(t.data("decimals")),
        t.val(e),
        t.data("change") && t.data("change")(e)
    }, o = {
        i_mousedown: function(n) {
            var s = this;
            i || (t = n.screenX,
            r = n.screenY,
            a = Number(s.val()),
            e(window).on("mousemove", s.data("w_mousemove")),
            s.on("mouseup", s.data("i_mouseup")),
            n.stopPropagation(),
            n.preventDefault())
        },
        i_focus: function(t) {
            var r = this;
            i = !0,
            e(window).off("mousemove", r.data("w_mousemove")),
            r.prop("readonly", !1),
            r.removeClass("pzinput-normal"),
            r.addClass("pzinput-edit"),
            r.select(),
            r.on("blur", r.data("i_blur")),
            r.on("keydown", r.data("i_keydown"))
        },
        i_mouseup: function() {
            var t = this;
            i = !0,
            e(window).off("mousemove", t.data("w_mousemove")),
            t.off("mouseup", t.data("i_mousemove")),
            t.prop("readonly", !1),
            t.removeClass("pzinput-normal"),
            t.addClass("pzinput-edit"),
            t.select(),
            t.on("blur", t.data("i_blur")),
            t.on("keydown", t.data("i_keydown"))
        },
        w_mousemove: function(i) {
            var o = this;
            if (!1 === n) {
                if (Math.abs(i.screenX - t - i.screenY + r) < 3)
                    return;
                o.off("mouseup", o.data("i_mouseup")),
                e(window).on("mouseup", o.data("w_mouseup")),
                e("body").css("cursor", "move"),
                n = !0
            }
            s(a + (i.screenX - t - i.screenY + r) * o.data("dragstep") * (i.shiftKey ? 2.5 : 1) * (i.ctrlKey ? .25 : 1), o)
        },
        i_blur: function() {
            var e = this;
            isNaN(Number(e.val())) ? s(e.data("min"), e) : s(Number(e.val()), e),
            e.off("blur", e.data("i_blur")),
            e.off("keydown", e.data("i_keydown")),
            i = !1,
            e.prop("readonly", !0),
            e.removeClass("pzinput-edit"),
            e.addClass("pzinput-normal"),
            e.addClass("noselect")
        },
        w_mouseup: function() {
            var t = this;
            e(window).off("mousemove", t.data("w_mousemove")),
            e(window).off("mouseup", t.data("w_mouseup")),
            e("body").css("cursor", "auto"),
            n = !1,
            t.blur()
        },
        i_keydown: function(e) {
            var t = this;
            if ("Enter" === e.key || "Escape" === e.key)
                t.blur();
            else if ("ArrowUp" === e.key)
                s(Number(t.val()) + t.data("step"), t);
            else if ("ArrowDown" === e.key)
                s(Number(t.val()) - t.data("step"), t);
            else if ("PageUp" === e.key)
                s(Number(t.val()) + t.data("bigstep"), t);
            else {
                if ("PageDown" !== e.key)
                    return !0;
                s(Number(t.val()) - t.data("bigstep"), t)
            }
            return !1
        },
        i_wheel: function(e) {
            var t = this;
            s(Number(t.val()) + e.originalEvent.wheelDelta * t.data("dragstep"), t)
        }
    };
    e.fn.pzinput = function(e) {
        var t = this;
        return t.data("i_mousedown", o.i_mousedown.bind(this)),
        t.data("i_focus", o.i_focus.bind(this)),
        t.data("i_mouseup", o.i_mouseup.bind(this)),
        t.data("w_mousemove", o.w_mousemove.bind(this)),
        t.data("i_blur", o.i_blur.bind(this)),
        t.data("w_mouseup", o.w_mouseup.bind(this)),
        t.data("i_keydown", o.i_keydown.bind(this)),
        t.on("mousedown", t.data("i_mousedown")),
        t.on("focus", t.data("i_focus")),
        t.prop("readonly", !0),
        t.addClass("pzinput-normal"),
        t.data("max", e && e.max ? e.max : 10),
        t.data("min", e && e.min ? e.min : 0),
        t.data("decimals", e && e.decimals ? e.decimals : 0),
        t.data("step", e && e.step ? e.step : (t.data("max") - t.data("min")) / 50),
        t.data("bigstep", e && e.bigstep ? e.bigstep : e && e.step ? 10 * e.step : (t.data("max") - t.data("min")) / 10),
        t.data("dragstep", e && e.dragstep ? e.dragstep : e && e.step ? e.step / 10 : (t.data("max") - t.data("min")) / (1.5 * Math.min(window.screen.availHeight, window.screen.availWidth))),
        s(Number(t.val()), t),
        t.data("change", e && e.change ? e.change : null),
        t
    }
}(jQuery),
function(e) {
    e.fn.drag = function(t, r, a) {
        var n = "string" == typeof t ? t : ""
          , i = e.isFunction(t) ? t : e.isFunction(r) ? r : null;
        return 0 !== n.indexOf("drag") && (n = "drag" + n),
        a = (t == i ? r : a) || {},
        i ? this.bind(n, a, i) : this.trigger(n)
    }
    ;
    var t = e.event
      , r = t.special
      , a = r.drag = {
        defaults: {
            which: 1,
            distance: 0,
            not: ":input",
            handle: null,
            relative: !1,
            drop: !0,
            click: !1
        },
        datakey: "dragdata",
        noBubble: !0,
        add: function(t) {
            var r = e.data(this, a.datakey)
              , n = t.data || {};
            r.related += 1,
            e.each(a.defaults, function(e, t) {
                void 0 !== n[e] && (r[e] = n[e])
            })
        },
        remove: function() {
            e.data(this, a.datakey).related -= 1
        },
        setup: function() {
            if (!e.data(this, a.datakey)) {
                var r = e.extend({
                    related: 0
                }, a.defaults);
                e.data(this, a.datakey, r),
                t.add(this, "touchstart mousedown", a.init, r),
                this.attachEvent && this.attachEvent("ondragstart", a.dontstart)
            }
        },
        teardown: function() {
            (e.data(this, a.datakey) || {}).related || (e.removeData(this, a.datakey),
            t.remove(this, "touchstart mousedown", a.init),
            a.textselect(!0),
            this.detachEvent && this.detachEvent("ondragstart", a.dontstart))
        },
        init: function(n) {
            if (!a.touched) {
                var i, s = n.data;
                if (!(0 != n.which && s.which > 0 && n.which != s.which) && !e(n.target).is(s.not) && (!s.handle || e(n.target).closest(s.handle, n.currentTarget).length) && (a.touched = "touchstart" == n.type ? this : null,
                s.propagates = 1,
                s.mousedown = this,
                s.interactions = [a.interaction(this, s)],
                s.target = n.target,
                s.pageX = n.pageX,
                s.pageY = n.pageY,
                s.dragging = null,
                i = a.hijack(n, "draginit", s),
                s.propagates))
                    return (i = a.flatten(i)) && i.length && (s.interactions = [],
                    e.each(i, function() {
                        s.interactions.push(a.interaction(this, s))
                    })),
                    s.propagates = s.interactions.length,
                    !1 !== s.drop && r.drop && r.drop.handler(n, s),
                    a.textselect(!1),
                    a.touched ? t.add(a.touched, "touchmove touchend", a.handler, s) : t.add(document, "mousemove mouseup", a.handler, s),
                    !(!a.touched || s.live) && void 0
            }
        },
        interaction: function(t, r) {
            var n = e(t)[r.relative ? "position" : "offset"]() || {
                top: 0,
                left: 0
            };
            return {
                drag: t,
                callback: new a.callback,
                droppable: [],
                offset: n
            }
        },
        handler: function(n) {
            var i = n.data;
            switch (n.type) {
            case !i.dragging && "touchmove":
                n.preventDefault();
            case !i.dragging && "mousemove":
                if (Math.pow(n.pageX - i.pageX, 2) + Math.pow(n.pageY - i.pageY, 2) < Math.pow(i.distance, 2))
                    break;
                n.target = i.target,
                a.hijack(n, "dragstart", i),
                i.propagates && (i.dragging = !0);
            case "touchmove":
                n.preventDefault();
            case "mousemove":
                if (i.dragging) {
                    if (a.hijack(n, "drag", i),
                    i.propagates) {
                        !1 !== i.drop && r.drop && r.drop.handler(n, i);
                        break
                    }
                    n.type = "mouseup"
                }
            case "touchend":
            case "mouseup":
            default:
                a.touched ? t.remove(a.touched, "touchmove touchend", a.handler) : t.remove(document, "mousemove mouseup", a.handler),
                i.dragging && (!1 !== i.drop && r.drop && r.drop.handler(n, i),
                a.hijack(n, "dragend", i)),
                a.textselect(!0),
                !1 === i.click && i.dragging && e.data(i.mousedown, "suppress.click", (new Date).getTime() + 5),
                i.dragging = a.touched = !1
            }
        },
        hijack: function(r, n, i, s, o) {
            if (i) {
                var l, c, p, h = {
                    event: r.originalEvent,
                    type: r.type
                }, u = n.indexOf("drop") ? "drag" : "drop", d = s || 0, f = isNaN(s) ? i.interactions.length : s;
                r.type = n,
                r.originalEvent = null,
                i.results = [];
                do {
                    if (c = i.interactions[d]) {
                        if ("dragend" !== n && c.cancelled)
                            continue;
                        p = a.properties(r, i, c),
                        c.results = [],
                        e(o || c[u] || i.droppable).each(function(s, o) {
                            if (p.target = o,
                            r.isPropagationStopped = function() {
                                return !1
                            }
                            ,
                            !1 === (l = o ? t.dispatch.call(o, r, p) : null) ? ("drag" == u && (c.cancelled = !0,
                            i.propagates -= 1),
                            "drop" == n && (c[u][s] = null)) : "dropinit" == n && c.droppable.push(a.element(l) || o),
                            "dragstart" == n && (c.proxy = e(a.element(l) || c.drag)[0]),
                            c.results.push(l),
                            delete r.result,
                            "dropinit" !== n)
                                return l
                        }),
                        i.results[d] = a.flatten(c.results),
                        "dropinit" == n && (c.droppable = a.flatten(c.droppable)),
                        "dragstart" != n || c.cancelled || p.update()
                    }
                } while (++d < f);
                return r.type = h.type,
                r.originalEvent = h.event,
                a.flatten(i.results)
            }
        },
        properties: function(e, t, r) {
            var n = r.callback;
            return n.drag = r.drag,
            n.proxy = r.proxy || r.drag,
            n.startX = t.pageX,
            n.startY = t.pageY,
            n.deltaX = e.pageX - t.pageX,
            n.deltaY = e.pageY - t.pageY,
            n.originalX = r.offset.left,
            n.originalY = r.offset.top,
            n.offsetX = n.originalX + n.deltaX,
            n.offsetY = n.originalY + n.deltaY,
            n.drop = a.flatten((r.drop || []).slice()),
            n.available = a.flatten((r.droppable || []).slice()),
            n
        },
        element: function(e) {
            if (e && (e.jquery || 1 == e.nodeType))
                return e
        },
        flatten: function(t) {
            return e.map(t, function(t) {
                return t && t.jquery ? e.makeArray(t) : t && t.length ? a.flatten(t) : t
            })
        },
        textselect: function(t) {
            e(document)[t ? "unbind" : "bind"]("selectstart", a.dontstart).css("MozUserSelect", t ? "" : "none"),
            document.unselectable = t ? "off" : "on"
        },
        dontstart: function() {
            return !1
        },
        callback: function() {}
    };
    a.callback.prototype = {
        update: function() {
            r.drop && this.available.length && e.each(this.available, function(e) {
                r.drop.locate(this, e)
            })
        }
    };
    var n = t.dispatch;
    t.dispatch = function(t) {
        if (!(e.data(this, "suppress." + t.type) - (new Date).getTime() > 0))
            return n.apply(this, arguments);
        e.removeData(this, "suppress." + t.type)
    }
    ;
    var i = t.fixHooks.touchstart = t.fixHooks.touchmove = t.fixHooks.touchend = t.fixHooks.touchcancel = {
        props: "clientX clientY pageX pageY screenX screenY".split(" "),
        filter: function(t, r) {
            if (r) {
                var a = r.touches && r.touches[0] || r.changedTouches && r.changedTouches[0] || null;
                a && e.each(i.props, function(e, r) {
                    t[r] = a[r]
                })
            }
            return t
        }
    };
    r.draginit = r.dragstart = r.dragend = a
}(jQuery),
THREE.OBJLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this.materials = null,
    this.regexp = {
        vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
        face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
        face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
        face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
        object_pattern: /^[og]\s*(.+)?/,
        smoothing_pattern: /^s\s+(\d+|on|off)/,
        material_library_pattern: /^mtllib /,
        material_use_pattern: /^usemtl /
    }
}
,
THREE.OBJLoader.prototype = {
    constructor: THREE.OBJLoader,
    load: function(e, t, r, a) {
        var n = this
          , i = new THREE.XHRLoader(n.manager);
        i.setPath(this.path),
        i.load(e, function(e) {
            t(n.parse(e))
        }, r, a)
    },
    setPath: function(e) {
        this.path = e
    },
    setMaterials: function(e) {
        this.materials = e
    },
    _createParserState: function() {
        var e = {
            objects: [],
            object: {},
            vertices: [],
            normals: [],
            uvs: [],
            materialLibraries: [],
            startObject: function(e, t) {
                if (this.object && !1 === this.object.fromDeclaration)
                    return this.object.name = e,
                    void (this.object.fromDeclaration = !1 !== t);
                this.object && "function" == typeof this.object._finalize && this.object._finalize();
                var r = this.object && "function" == typeof this.object.currentMaterial ? this.object.currentMaterial() : void 0;
                if (this.object = {
                    name: e || "",
                    fromDeclaration: !1 !== t,
                    geometry: {
                        vertices: [],
                        normals: [],
                        uvs: []
                    },
                    materials: [],
                    smooth: !0,
                    startMaterial: function(e, t) {
                        var r = this._finalize(!1);
                        r && (r.inherited || r.groupCount <= 0) && this.materials.splice(r.index, 1);
                        var a = {
                            index: this.materials.length,
                            name: e || "",
                            mtllib: Array.isArray(t) && t.length > 0 ? t[t.length - 1] : "",
                            smooth: void 0 !== r ? r.smooth : this.smooth,
                            groupStart: void 0 !== r ? r.groupEnd : 0,
                            groupEnd: -1,
                            groupCount: -1,
                            inherited: !1,
                            clone: function(e) {
                                return {
                                    index: "number" == typeof e ? e : this.index,
                                    name: this.name,
                                    mtllib: this.mtllib,
                                    smooth: this.smooth,
                                    groupStart: this.groupEnd,
                                    groupEnd: -1,
                                    groupCount: -1,
                                    inherited: !1
                                }
                            }
                        };
                        return this.materials.push(a),
                        a
                    },
                    currentMaterial: function() {
                        if (this.materials.length > 0)
                            return this.materials[this.materials.length - 1]
                    },
                    _finalize: function(e) {
                        var t = this.currentMaterial();
                        return t && -1 === t.groupEnd && (t.groupEnd = this.geometry.vertices.length / 3,
                        t.groupCount = t.groupEnd - t.groupStart,
                        t.inherited = !1),
                        !1 !== e && 0 === this.materials.length && this.materials.push({
                            name: "",
                            smooth: this.smooth
                        }),
                        t
                    }
                },
                r && r.name && "function" == typeof r.clone) {
                    var a = r.clone(0);
                    a.inherited = !0,
                    this.object.materials.push(a)
                }
                this.objects.push(this.object)
            },
            finalize: function() {
                this.object && "function" == typeof this.object._finalize && this.object._finalize()
            },
            parseVertexIndex: function(e, t) {
                var r = parseInt(e, 10);
                return 3 * (r >= 0 ? r - 1 : r + t / 3)
            },
            parseNormalIndex: function(e, t) {
                var r = parseInt(e, 10);
                return 3 * (r >= 0 ? r - 1 : r + t / 3)
            },
            parseUVIndex: function(e, t) {
                var r = parseInt(e, 10);
                return 2 * (r >= 0 ? r - 1 : r + t / 2)
            },
            addVertex: function(e, t, r) {
                var a = this.vertices
                  , n = this.object.geometry.vertices;
                n.push(a[e + 0]),
                n.push(a[e + 1]),
                n.push(a[e + 2]),
                n.push(a[t + 0]),
                n.push(a[t + 1]),
                n.push(a[t + 2]),
                n.push(a[r + 0]),
                n.push(a[r + 1]),
                n.push(a[r + 2])
            },
            addVertexLine: function(e) {
                var t = this.vertices
                  , r = this.object.geometry.vertices;
                r.push(t[e + 0]),
                r.push(t[e + 1]),
                r.push(t[e + 2])
            },
            addNormal: function(e, t, r) {
                var a = this.normals
                  , n = this.object.geometry.normals;
                n.push(a[e + 0]),
                n.push(a[e + 1]),
                n.push(a[e + 2]),
                n.push(a[t + 0]),
                n.push(a[t + 1]),
                n.push(a[t + 2]),
                n.push(a[r + 0]),
                n.push(a[r + 1]),
                n.push(a[r + 2])
            },
            addUV: function(e, t, r) {
                var a = this.uvs
                  , n = this.object.geometry.uvs;
                n.push(a[e + 0]),
                n.push(a[e + 1]),
                n.push(a[t + 0]),
                n.push(a[t + 1]),
                n.push(a[r + 0]),
                n.push(a[r + 1])
            },
            addUVLine: function(e) {
                var t = this.uvs
                  , r = this.object.geometry.uvs;
                r.push(t[e + 0]),
                r.push(t[e + 1])
            },
            addFace: function(e, t, r, a, n, i, s, o, l, c, p, h) {
                var u, d = this.vertices.length, f = this.parseVertexIndex(e, d), m = this.parseVertexIndex(t, d), g = this.parseVertexIndex(r, d);
                if (void 0 === a ? this.addVertex(f, m, g) : (u = this.parseVertexIndex(a, d),
                this.addVertex(f, m, u),
                this.addVertex(m, g, u)),
                void 0 !== n) {
                    var v = this.uvs.length;
                    f = this.parseUVIndex(n, v),
                    m = this.parseUVIndex(i, v),
                    g = this.parseUVIndex(s, v),
                    void 0 === a ? this.addUV(f, m, g) : (u = this.parseUVIndex(o, v),
                    this.addUV(f, m, u),
                    this.addUV(m, g, u))
                }
                if (void 0 !== l) {
                    var y = this.normals.length;
                    f = this.parseNormalIndex(l, y),
                    m = l === c ? f : this.parseNormalIndex(c, y),
                    g = l === p ? f : this.parseNormalIndex(p, y),
                    void 0 === a ? this.addNormal(f, m, g) : (u = this.parseNormalIndex(h, y),
                    this.addNormal(f, m, u),
                    this.addNormal(m, g, u))
                }
            },
            addLineGeometry: function(e, t) {
                this.object.geometry.type = "Line";
                for (var r = this.vertices.length, a = this.uvs.length, n = 0, i = e.length; n < i; n++)
                    this.addVertexLine(this.parseVertexIndex(e[n], r));
                for (var s = 0, i = t.length; s < i; s++)
                    this.addUVLine(this.parseUVIndex(t[s], a))
            }
        };
        return e.startObject("", !1),
        e
    },
    parse: function(e) {
        console.time("OBJLoader");
        var t = this._createParserState();
        -1 !== e.indexOf("\r\n") && (e = e.replace("\r\n", "\n"));
        for (var r = e.split("\n"), a = "", n = "", i = "", s = [], o = "function" == typeof "".trimLeft, l = 0, c = r.length; l < c; l++)
            if (a = r[l],
            a = o ? a.trimLeft() : a.trim(),
            0 !== a.length && "#" !== (n = a.charAt(0)))
                if ("v" === n)
                    if (" " === (i = a.charAt(1)) && null !== (s = this.regexp.vertex_pattern.exec(a)))
                        t.vertices.push(parseFloat(s[1]), parseFloat(s[2]), parseFloat(s[3]));
                    else if ("n" === i && null !== (s = this.regexp.normal_pattern.exec(a)))
                        t.normals.push(parseFloat(s[1]), parseFloat(s[2]), parseFloat(s[3]));
                    else {
                        if ("t" !== i || null === (s = this.regexp.uv_pattern.exec(a)))
                            throw new Error("Unexpected vertex/normal/uv line: '" + a + "'");
                        t.uvs.push(parseFloat(s[1]), parseFloat(s[2]))
                    }
                else if ("f" === n)
                    if (null !== (s = this.regexp.face_vertex_uv_normal.exec(a)))
                        t.addFace(s[1], s[4], s[7], s[10], s[2], s[5], s[8], s[11], s[3], s[6], s[9], s[12]);
                    else if (null !== (s = this.regexp.face_vertex_uv.exec(a)))
                        t.addFace(s[1], s[3], s[5], s[7], s[2], s[4], s[6], s[8]);
                    else if (null !== (s = this.regexp.face_vertex_normal.exec(a)))
                        t.addFace(s[1], s[3], s[5], s[7], void 0, void 0, void 0, void 0, s[2], s[4], s[6], s[8]);
                    else {
                        if (null === (s = this.regexp.face_vertex.exec(a)))
                            throw new Error("Unexpected face line: '" + a + "'");
                        t.addFace(s[1], s[2], s[3], s[4])
                    }
                else if ("l" === n) {
                    var p = a.substring(1).trim().split(" ")
                      , h = []
                      , u = [];
                    if (-1 === a.indexOf("/"))
                        h = p;
                    else
                        for (var d = 0, f = p.length; d < f; d++) {
                            var m = p[d].split("/");
                            "" !== m[0] && h.push(m[0]),
                            "" !== m[1] && u.push(m[1])
                        }
                    t.addLineGeometry(h, u)
                } else if (null !== (s = this.regexp.object_pattern.exec(a))) {
                    var g = s[0].substr(1).trim();
                    t.startObject(g)
                } else if (this.regexp.material_use_pattern.test(a))
                    t.object.startMaterial(a.substring(7).trim(), t.materialLibraries);
                else if (this.regexp.material_library_pattern.test(a))
                    t.materialLibraries.push(a.substring(7).trim());
                else {
                    if (null === (s = this.regexp.smoothing_pattern.exec(a))) {
                        if ("\0" === a)
                            continue;
                        throw new Error("Unexpected line: '" + a + "'")
                    }
                    var v = s[1].trim().toLowerCase();
                    t.object.smooth = "1" === v || "on" === v,
                    (S = t.object.currentMaterial()) && (S.smooth = t.object.smooth)
                }
        t.finalize();
        var y = new THREE.Group;
        y.materialLibraries = [].concat(t.materialLibraries);
        for (var l = 0, c = t.objects.length; l < c; l++) {
            var b = t.objects[l]
              , P = b.geometry
              , x = b.materials
              , w = "Line" === P.type;
            if (0 !== P.vertices.length) {
                var M = new THREE.BufferGeometry;
                M.addAttribute("position", new THREE.BufferAttribute(new Float32Array(P.vertices),3)),
                P.normals.length > 0 ? M.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(P.normals),3)) : M.computeVertexNormals(),
                P.uvs.length > 0 && M.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(P.uvs),2));
                for (var C = [], T = 0, E = x.length; T < E; T++) {
                    var k = x[T]
                      , S = void 0;
                    if (null !== this.materials && (S = this.materials.create(k.name),
                    w && S && !(S instanceof THREE.LineBasicMaterial))) {
                        var O = new THREE.LineBasicMaterial;
                        O.copy(S),
                        S = O
                    }
                    S || ((S = w ? new THREE.LineBasicMaterial : new THREE.MeshPhongMaterial).name = k.name),
                    S.shading = k.smooth ? THREE.SmoothShading : THREE.FlatShading,
                    C.push(S)
                }
                var R;
                if (C.length > 1) {
                    for (var T = 0, E = x.length; T < E; T++) {
                        k = x[T];
                        M.addGroup(k.groupStart, k.groupCount, T)
                    }
                    var j = new THREE.MultiMaterial(C);
                    R = w ? new THREE.Line(M,j) : new THREE.Mesh(M,j)
                } else
                    R = w ? new THREE.Line(M,C[0]) : new THREE.Mesh(M,C[0]);
                R.name = b.name,
                y.add(R)
            }
        }
        return console.timeEnd("OBJLoader"),
        y
    }
},
THREE.EditorControls = function(e, t) {
    function r(e) {
        if (!1 !== n.enabled) {
            e.preventDefault(),
            p.set(e.clientX, e.clientY);
            var t = p.x - h.x
              , r = p.y - h.y;
            o === s.ROTATE ? n.rotate(new THREE.Vector3(.005 * -t,.005 * -r,0)) : o === s.ZOOM ? n.zoom(new THREE.Vector3(0,0,r)) : o === s.PAN && n.pan(new THREE.Vector3(-t,r,0)),
            h.set(e.clientX, e.clientY)
        }
    }
    function a(e) {
        t.removeEventListener("mousemove", r, !1),
        t.removeEventListener("mouseup", a, !1),
        t.removeEventListener("mouseout", a, !1),
        t.removeEventListener("dblclick", a, !1),
        o = s.NONE
    }
    t = void 0 !== t ? t : document,
    this.enabled = !0,
    this.center = new THREE.Vector3;
    var n = this
      , i = new THREE.Vector3
      , s = {
        NONE: -1,
        ROTATE: 0,
        ZOOM: 1,
        PAN: 2
    }
      , o = s.NONE
      , l = this.center
      , c = new THREE.Matrix3
      , p = new THREE.Vector2
      , h = new THREE.Vector2
      , u = {
        type: "change"
    };
    this.focus = function(t, r) {
        var a = new THREE.Vector3;
        if (t.matrixWorld.decompose(l, new THREE.Quaternion, a),
        r && t.geometry) {
            a = (a.x + a.y + a.z) / 3,
            l.add(t.geometry.boundingSphere.center.clone().multiplyScalar(a));
            var i = t.geometry.boundingSphere.radius * a
              , s = e.position.clone().sub(l).normalize().multiplyScalar(2 * i);
            e.position.copy(l).add(s)
        }
        e.lookAt(l),
        n.dispatchEvent(u)
    }
    ,
    this.pan = function(t) {
        c.getNormalMatrix(e.matrix),
        t.applyMatrix3(c),
        t.multiplyScalar(.001 * i.copy(l).sub(e.position).length()),
        e.position.add(t),
        l.add(t),
        n.dispatchEvent(u)
    }
    ,
    this.zoom = function(t) {
        c.getNormalMatrix(e.matrix),
        t.applyMatrix3(c),
        t.multiplyScalar(.001 * i.copy(l).sub(e.position).length()),
        e.position.add(t),
        n.dispatchEvent(u)
    }
    ,
    this.rotate = function(t) {
        i.copy(e.position).sub(l);
        var r = Math.atan2(i.x, i.z)
          , a = Math.atan2(Math.sqrt(i.x * i.x + i.z * i.z), i.y);
        r += t.x,
        a += t.y;
        a = Math.max(1e-6, Math.min(Math.PI - 1e-6, a));
        var s = i.length();
        i.x = s * Math.sin(a) * Math.sin(r),
        i.y = s * Math.cos(a),
        i.z = s * Math.sin(a) * Math.cos(r),
        e.position.copy(l).add(i),
        e.lookAt(l),
        n.dispatchEvent(u)
    }
    ,
    t.addEventListener("contextmenu", function(e) {
        e.preventDefault()
    }, !1),
    t.addEventListener("mousedown", function(e) {
        !1 !== n.enabled && (e.preventDefault(),
        0 === e.button ? o = s.ROTATE : 1 === e.button ? o = s.ZOOM : 2 === e.button && (o = s.PAN),
        h.set(e.clientX, e.clientY),
        t.addEventListener("mousemove", r, !1),
        t.addEventListener("mouseup", a, !1),
        t.addEventListener("mouseout", a, !1),
        t.addEventListener("dblclick", a, !1))
    }, !1),
    t.addEventListener("wheel", function(e) {
        var t = 0;
        e.wheelDelta ? t = -e.wheelDelta : e.detail && (t = 10 * e.detail),
        n.zoom(new THREE.Vector3(0,0,t))
    }, !1);
    new THREE.Vector3;
    var d = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
      , f = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
      , m = null;
    t.addEventListener("touchstart", function(e) {
        if (!1 !== n.enabled) {
            switch (e.touches.length) {
            case 1:
                d[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                d[1].set(e.touches[0].pageX, e.touches[0].pageY, 0);
                break;
            case 2:
                d[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                d[1].set(e.touches[1].pageX, e.touches[1].pageY, 0),
                m = d[0].distanceTo(d[1])
            }
            f[0].copy(d[0]),
            f[1].copy(d[1])
        }
    }, !1),
    t.addEventListener("touchmove", function(e) {
        if (!1 !== n.enabled) {
            e.preventDefault(),
            e.stopPropagation();
            var t = function(e, t) {
                var r = t[0];
                for (var a in t)
                    r.distanceTo(e) > t[a].distanceTo(e) && (r = t[a]);
                return r
            };
            switch (e.touches.length) {
            case 1:
                d[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                d[1].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                n.rotate(d[0].sub(t(d[0], f)).multiplyScalar(-.005));
                break;
            case 2:
                d[0].set(e.touches[0].pageX, e.touches[0].pageY, 0),
                d[1].set(e.touches[1].pageX, e.touches[1].pageY, 0),
                distance = d[0].distanceTo(d[1]),
                n.zoom(new THREE.Vector3(0,0,m - distance)),
                m = distance;
                var r = d[0].clone().sub(t(d[0], f))
                  , a = d[1].clone().sub(t(d[1], f));
                r.x = -r.x,
                a.x = -a.x,
                n.pan(r.add(a).multiplyScalar(.5))
            }
            f[0].copy(d[0]),
            f[1].copy(d[1])
        }
    }, !1)
}
,
THREE.EditorControls.prototype = Object.create(THREE.EventDispatcher.prototype),
THREE.CopyShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null
        },
        uvScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        },
        opacity: {
            type: "f",
            value: 1
        }
    },
    vertexShader: ["uniform vec2 uvScale;", "varying vec2 vUv;", "varying vec2 vUvScaled;", "void main() {", "vUv = uv / uvScale;", "vUvScaled = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "varying vec2 vUvScaled;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")
},
THREE.CompositePass = function(e, t) {
    this.material = e,
    this.uniforms = e.uniforms,
    this.material.transparent = !0,
    this.material.premultipliedAlpha = !0,
    this.renderToScreen = !1,
    this.enabled = !0,
    this.needsSwap = !0,
    this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
    this.scene = new THREE.Scene
}
,
THREE.CompositePass.prototype = {
    resize: function(e, t) {
        this.camera = new THREE.OrthographicCamera(.5 * -e,.5 * e,.5 * t,.5 * -t,0,1)
    },
    render: function(e, t, r, a, n) {
        t.render(e, this.camera, r, n)
    }
},
THREE.RenderPass = function(e, t, r, a, n) {
    this.scene = e,
    this.camera = t,
    this.overrideMaterial = r,
    this.clearColor = a,
    this.clearAlpha = void 0 !== n ? n : 1,
    this.enabled = !0,
    this.clear = !0,
    this.needsSwap = !1
}
,
THREE.RenderPass.prototype = {
    render: function(e, t, r, a) {
        this.scene.overrideMaterial = this.overrideMaterial,
        e.render(this.scene, this.camera, t, a),
        this.scene.overrideMaterial = null
    }
},
THREE.ShaderPass = function(e, t) {
    this.textureID = void 0 !== t ? t : "tDiffuse",
    this.material = e,
    this.uniforms = e.uniforms,
    this.material.transparent = !0,
    this.renderToScreen = !1,
    this.enabled = !0,
    this.needsSwap = !0,
    this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
    this.scene = new THREE.Scene,
    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),
    this.scene.add(this.quad)
}
,
THREE.ShaderPass.prototype = {
    render: function(e, t, r, a) {
        r && (this.uniforms[this.textureID].value = r.texture),
        this.quad.material = this.material,
        this.renderToScreen ? e.render(this.scene, this.camera) : e.render(this.scene, this.camera, t, a)
    }
},
function() {
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
    var r = new e({
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
              , r = {
                XY: new THREE.Mesh(e,t),
                YZ: new THREE.Mesh(e,t),
                XZ: new THREE.Mesh(e,t),
                XYZE: new THREE.Mesh(e,t)
            };
            this.activePlane = r.XYZE,
            r.YZ.rotation.set(0, Math.PI / 2, 0),
            r.XZ.rotation.set(-Math.PI / 2, 0, 0);
            for (var a in r)
                r[a].name = a,
                this.planes.add(r[a]),
                this.planes[a] = r[a];
            var n = function(e, t) {
                for (var r in e)
                    for (a = e[r].length; a--; ) {
                        var n = e[r][a][0]
                          , i = e[r][a][1]
                          , s = e[r][a][2];
                        n.name = r,
                        i && n.position.set(i[0], i[1], i[2]),
                        s && n.rotation.set(s[0], s[1], s[2]),
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
        var r = new THREE.Vector3(0,0,0)
          , a = new THREE.Vector3(0,1,0)
          , n = new THREE.Matrix4;
        this.traverse(function(i) {
            -1 !== i.name.search("E") ? i.quaternion.setFromRotationMatrix(n.lookAt(t, r, a)) : -1 === i.name.search("X") && -1 === i.name.search("Y") && -1 === i.name.search("Z") || i.quaternion.setFromEuler(e)
        })
    }
    ,
    THREE.TransformGizmoTranslate = function() {
        THREE.TransformGizmo.call(this);
        var a = new THREE.Geometry
          , n = new THREE.Mesh(new THREE.CylinderGeometry(0,.05,.2,12,1,!1));
        n.position.y = .5,
        n.updateMatrix(),
        a.merge(n.geometry, n.matrix);
        var i = new THREE.BufferGeometry;
        i.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0],3));
        var s = new THREE.BufferGeometry;
        s.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 1, 0],3));
        var o = new THREE.BufferGeometry;
        o.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 1],3)),
        this.handleGizmos = {
            X: [[new THREE.Mesh(a,new e({
                color: 16711680
            })), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(i,new t({
                color: 16711680
            }))]],
            Y: [[new THREE.Mesh(a,new e({
                color: 65280
            })), [0, .5, 0]], [new THREE.Line(s,new t({
                color: 65280
            }))]],
            Z: [[new THREE.Mesh(a,new e({
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
            X: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),r), [.6, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),r), [0, .6, 0]]],
            Z: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),r), [0, 0, .6], [Math.PI / 2, 0, 0]]],
            XYZ: [[new THREE.Mesh(new THREE.OctahedronGeometry(.2,0),r)]],
            XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),r), [.2, .2, 0]]],
            YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),r), [0, .2, .2], [0, Math.PI / 2, 0]]],
            XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),r), [.2, 0, .2], [-Math.PI / 2, 0, 0]]]
        },
        this.setActivePlane = function(e, t) {
            var r = new THREE.Matrix4;
            t.applyMatrix4(r.getInverse(r.extractRotation(this.planes.XY.matrixWorld))),
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
        var e = function(e, t, r) {
            var a = new THREE.BufferGeometry
              , n = [];
            r = r || 1;
            for (var i = 0; i <= 64 * r; ++i)
                "x" === t && n.push(0, Math.cos(i / 32 * Math.PI) * e, Math.sin(i / 32 * Math.PI) * e),
                "y" === t && n.push(Math.cos(i / 32 * Math.PI) * e, 0, Math.sin(i / 32 * Math.PI) * e),
                "z" === t && n.push(Math.sin(i / 32 * Math.PI) * e, Math.cos(i / 32 * Math.PI) * e, 0);
            return a.addAttribute("position", new THREE.Float32BufferAttribute(n,3)),
            a
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
            X: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1,.12,4,12,Math.PI),r), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1,.12,4,12,Math.PI),r), [0, 0, 0], [Math.PI / 2, 0, 0]]],
            Z: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1,.12,4,12,Math.PI),r), [0, 0, 0], [0, 0, -Math.PI / 2]]],
            E: [[new THREE.Mesh(new THREE.TorusBufferGeometry(1.25,.12,2,24),r)]],
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
            var r = new THREE.Matrix4
              , a = new THREE.Euler(0,0,1)
              , n = new THREE.Quaternion
              , i = new THREE.Vector3(1,0,0)
              , s = new THREE.Vector3(0,1,0)
              , o = new THREE.Vector3(0,0,1)
              , l = new THREE.Quaternion
              , c = new THREE.Quaternion
              , p = new THREE.Quaternion
              , h = t.clone();
            a.copy(this.planes.XY.rotation),
            n.setFromEuler(a),
            r.makeRotationFromQuaternion(n).getInverse(r),
            h.applyMatrix4(r),
            this.traverse(function(e) {
                n.setFromEuler(a),
                "X" === e.name && (l.setFromAxisAngle(i, Math.atan2(-h.y, h.z)),
                n.multiplyQuaternions(n, l),
                e.quaternion.copy(n)),
                "Y" === e.name && (c.setFromAxisAngle(s, Math.atan2(h.x, h.z)),
                n.multiplyQuaternions(n, c),
                e.quaternion.copy(n)),
                "Z" === e.name && (p.setFromAxisAngle(o, Math.atan2(h.y, h.x)),
                n.multiplyQuaternions(n, p),
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
        var a = new THREE.Geometry
          , n = new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125));
        n.position.y = .5,
        n.updateMatrix(),
        a.merge(n.geometry, n.matrix);
        var i = new THREE.BufferGeometry;
        i.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0],3));
        var s = new THREE.BufferGeometry;
        s.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 1, 0],3));
        var o = new THREE.BufferGeometry;
        o.addAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 1],3)),
        this.handleGizmos = {
            X: [[new THREE.Mesh(a,new e({
                color: 16711680
            })), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(i,new t({
                color: 16711680
            }))]],
            Y: [[new THREE.Mesh(a,new e({
                color: 65280
            })), [0, .5, 0]], [new THREE.Line(s,new t({
                color: 65280
            }))]],
            Z: [[new THREE.Mesh(a,new e({
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
            X: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),r), [.6, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),r), [0, .6, 0]]],
            Z: [[new THREE.Mesh(new THREE.CylinderBufferGeometry(.2,0,1,4,1,!1),r), [0, 0, .6], [Math.PI / 2, 0, 0]]],
            XYZ: [[new THREE.Mesh(new THREE.BoxBufferGeometry(.4,.4,.4),r)]]
        },
        this.setActivePlane = function(e, t) {
            var r = new THREE.Matrix4;
            t.applyMatrix4(r.getInverse(r.extractRotation(this.planes.XY.matrixWorld))),
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
        function r(e) {
            if (void 0 !== o.object && !0 !== c && (void 0 === e.button || 0 === e.button)) {
                var t = s(e.changedTouches ? e.changedTouches[0] : e, p[l].pickers.children)
                  , r = null;
                t && (r = t.object.name,
                e.preventDefault()),
                o.axis !== r && (o.axis = r,
                o.update(),
                o.dispatchEvent(d))
            }
        }
        function a(e) {
            if (void 0 !== o.object && !0 !== c && (void 0 === e.button || 0 === e.button)) {
                var t = e.changedTouches ? e.changedTouches[0] : e;
                if (0 === t.button || void 0 === t.button) {
                    var r = s(t, p[l].pickers.children);
                    if (r) {
                        e.preventDefault(),
                        e.stopPropagation(),
                        o.dispatchEvent(f),
                        o.axis = r.object.name,
                        o.update(),
                        T.copy(G).sub(B).normalize(),
                        p[l].setActivePlane(o.axis, T);
                        var a = s(t, [p[l].activePlane]);
                        a && (L.copy(o.object.position),
                        $.copy(o.object.scale),
                        A.extractRotation(o.object.matrix),
                        _.extractRotation(o.object.matrixWorld),
                        D.extractRotation(o.object.parent.matrixWorld),
                        z.setFromMatrixScale(E.getInverse(o.object.parent.matrixWorld)),
                        P.copy(a.point))
                    }
                }
                c = !0
            }
        }
        function n(e) {
            if (void 0 !== o.object && null !== o.axis && !1 !== c && (void 0 === e.button || 0 === e.button)) {
                var t = s(e.changedTouches ? e.changedTouches[0] : e, [p[l].activePlane]);
                !1 !== t && (e.preventDefault(),
                e.stopPropagation(),
                b.copy(t.point),
                "translate" === l ? (b.sub(P),
                b.multiply(z),
                "local" === o.space && (b.applyMatrix4(E.getInverse(_)),
                -1 === o.axis.search("X") && (b.x = 0),
                -1 === o.axis.search("Y") && (b.y = 0),
                -1 === o.axis.search("Z") && (b.z = 0),
                b.applyMatrix4(A),
                o.object.position.copy(L),
                o.object.position.add(b)),
                "world" !== o.space && -1 === o.axis.search("XYZ") || (-1 === o.axis.search("X") && (b.x = 0),
                -1 === o.axis.search("Y") && (b.y = 0),
                -1 === o.axis.search("Z") && (b.z = 0),
                b.applyMatrix4(E.getInverse(D)),
                o.object.position.copy(L),
                o.object.position.add(b)),
                null !== o.translationSnap && ("local" === o.space && o.object.position.applyMatrix4(E.getInverse(_)),
                -1 !== o.axis.search("X") && (o.object.position.x = Math.round(o.object.position.x / o.translationSnap) * o.translationSnap),
                -1 !== o.axis.search("Y") && (o.object.position.y = Math.round(o.object.position.y / o.translationSnap) * o.translationSnap),
                -1 !== o.axis.search("Z") && (o.object.position.z = Math.round(o.object.position.z / o.translationSnap) * o.translationSnap),
                "local" === o.space && o.object.position.applyMatrix4(_))) : "scale" === l ? (b.sub(P),
                b.multiply(z),
                "local" === o.space && ("XYZ" === o.axis ? (M = 1 + b.y / Math.max($.x, $.y, $.z),
                o.object.scale.x = $.x * M,
                o.object.scale.y = $.y * M,
                o.object.scale.z = $.z * M) : (b.applyMatrix4(E.getInverse(_)),
                "X" === o.axis && (o.object.scale.x = $.x * (1 + b.x / $.x)),
                "Y" === o.axis && (o.object.scale.y = $.y * (1 + b.y / $.y)),
                "Z" === o.axis && (o.object.scale.z = $.z * (1 + b.z / $.z))))) : "rotate" === l && (b.sub(B),
                b.multiply(z),
                k.copy(P).sub(B),
                k.multiply(z),
                "E" === o.axis ? (b.applyMatrix4(E.getInverse(C)),
                k.applyMatrix4(E.getInverse(C)),
                x.set(Math.atan2(b.z, b.y), Math.atan2(b.x, b.z), Math.atan2(b.y, b.x)),
                w.set(Math.atan2(k.z, k.y), Math.atan2(k.x, k.z), Math.atan2(k.y, k.x)),
                S.setFromRotationMatrix(E.getInverse(D)),
                U.setFromAxisAngle(T, x.z - w.z),
                Z.setFromRotationMatrix(_),
                S.multiplyQuaternions(S, U),
                S.multiplyQuaternions(S, Z),
                o.object.quaternion.copy(S)) : "XYZE" === o.axis ? (U.setFromEuler(b.clone().cross(k).normalize()),
                S.setFromRotationMatrix(E.getInverse(D)),
                H.setFromAxisAngle(U, -b.clone().angleTo(k)),
                Z.setFromRotationMatrix(_),
                S.multiplyQuaternions(S, H),
                S.multiplyQuaternions(S, Z),
                o.object.quaternion.copy(S)) : "local" === o.space ? (b.applyMatrix4(E.getInverse(_)),
                k.applyMatrix4(E.getInverse(_)),
                x.set(Math.atan2(b.z, b.y), Math.atan2(b.x, b.z), Math.atan2(b.y, b.x)),
                w.set(Math.atan2(k.z, k.y), Math.atan2(k.x, k.z), Math.atan2(k.y, k.x)),
                Z.setFromRotationMatrix(A),
                null !== o.rotationSnap ? (H.setFromAxisAngle(O, Math.round((x.x - w.x) / o.rotationSnap) * o.rotationSnap),
                F.setFromAxisAngle(R, Math.round((x.y - w.y) / o.rotationSnap) * o.rotationSnap),
                I.setFromAxisAngle(j, Math.round((x.z - w.z) / o.rotationSnap) * o.rotationSnap)) : (H.setFromAxisAngle(O, x.x - w.x),
                F.setFromAxisAngle(R, x.y - w.y),
                I.setFromAxisAngle(j, x.z - w.z)),
                "X" === o.axis && Z.multiplyQuaternions(Z, H),
                "Y" === o.axis && Z.multiplyQuaternions(Z, F),
                "Z" === o.axis && Z.multiplyQuaternions(Z, I),
                o.object.quaternion.copy(Z)) : "world" === o.space && (x.set(Math.atan2(b.z, b.y), Math.atan2(b.x, b.z), Math.atan2(b.y, b.x)),
                w.set(Math.atan2(k.z, k.y), Math.atan2(k.x, k.z), Math.atan2(k.y, k.x)),
                S.setFromRotationMatrix(E.getInverse(D)),
                null !== o.rotationSnap ? (H.setFromAxisAngle(O, Math.round((x.x - w.x) / o.rotationSnap) * o.rotationSnap),
                F.setFromAxisAngle(R, Math.round((x.y - w.y) / o.rotationSnap) * o.rotationSnap),
                I.setFromAxisAngle(j, Math.round((x.z - w.z) / o.rotationSnap) * o.rotationSnap)) : (H.setFromAxisAngle(O, x.x - w.x),
                F.setFromAxisAngle(R, x.y - w.y),
                I.setFromAxisAngle(j, x.z - w.z)),
                Z.setFromRotationMatrix(_),
                "X" === o.axis && S.multiplyQuaternions(S, H),
                "Y" === o.axis && S.multiplyQuaternions(S, F),
                "Z" === o.axis && S.multiplyQuaternions(S, I),
                S.multiplyQuaternions(S, Z),
                o.object.quaternion.copy(S))),
                o.update(),
                o.dispatchEvent(d),
                o.dispatchEvent(g))
            }
        }
        function i(e) {
            e.preventDefault(),
            void 0 !== e.button && 0 !== e.button || (c && null !== o.axis && (m.mode = l,
            o.dispatchEvent(m)),
            c = !1,
            "TouchEvent"in window && e instanceof TouchEvent ? (o.axis = null,
            o.update(),
            o.dispatchEvent(d)) : r(e))
        }
        function s(r, a) {
            var n = t.getBoundingClientRect()
              , i = (r.clientX - n.left) / n.width
              , s = (r.clientY - n.top) / n.height;
            y.set(2 * i - 1, -2 * s + 1),
            v.setFromCamera(y, e);
            var o = v.intersectObjects(a, !0);
            return !!o[0] && o[0]
        }
        THREE.Object3D.call(this),
        t = void 0 !== t ? t : document,
        this.object = void 0,
        this.visible = !1,
        this.translationSnap = null,
        this.rotationSnap = null,
        this.space = "world",
        this.size = 1,
        this.axis = null;
        var o = this
          , l = "translate"
          , c = !1
          , p = {
            translate: new THREE.TransformGizmoTranslate,
            rotate: new THREE.TransformGizmoRotate,
            scale: new THREE.TransformGizmoScale
        };
        for (var h in p) {
            var u = p[h];
            u.visible = h === l,
            this.add(u)
        }
        var d = {
            type: "change"
        }
          , f = {
            type: "mouseDown"
        }
          , m = {
            type: "mouseUp",
            mode: l
        }
          , g = {
            type: "objectChange"
        }
          , v = new THREE.Raycaster
          , y = new THREE.Vector2
          , b = new THREE.Vector3
          , P = new THREE.Vector3
          , x = new THREE.Vector3
          , w = new THREE.Vector3
          , M = 1
          , C = new THREE.Matrix4
          , T = new THREE.Vector3
          , E = new THREE.Matrix4
          , k = new THREE.Vector3
          , S = new THREE.Quaternion
          , O = new THREE.Vector3(1,0,0)
          , R = new THREE.Vector3(0,1,0)
          , j = new THREE.Vector3(0,0,1)
          , Z = new THREE.Quaternion
          , H = new THREE.Quaternion
          , F = new THREE.Quaternion
          , I = new THREE.Quaternion
          , U = new THREE.Quaternion
          , L = new THREE.Vector3
          , $ = new THREE.Vector3
          , A = new THREE.Matrix4
          , D = new THREE.Matrix4
          , z = new THREE.Vector3
          , B = new THREE.Vector3
          , N = new THREE.Euler
          , _ = new THREE.Matrix4
          , G = new THREE.Vector3
          , V = new THREE.Euler;
        t.addEventListener("mousedown", a, !1),
        t.addEventListener("touchstart", a, !1),
        t.addEventListener("mousemove", r, !1),
        t.addEventListener("touchmove", r, !1),
        t.addEventListener("mousemove", n, !1),
        t.addEventListener("touchmove", n, !1),
        t.addEventListener("mouseup", i, !1),
        t.addEventListener("mouseout", i, !1),
        t.addEventListener("touchend", i, !1),
        t.addEventListener("touchcancel", i, !1),
        t.addEventListener("touchleave", i, !1),
        this.dispose = function() {
            t.removeEventListener("mousedown", a),
            t.removeEventListener("touchstart", a),
            t.removeEventListener("mousemove", r),
            t.removeEventListener("touchmove", r),
            t.removeEventListener("mousemove", n),
            t.removeEventListener("touchmove", n),
            t.removeEventListener("mouseup", i),
            t.removeEventListener("mouseout", i),
            t.removeEventListener("touchend", i),
            t.removeEventListener("touchcancel", i),
            t.removeEventListener("touchleave", i)
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
            return l
        }
        ,
        this.setMode = function(e) {
            "scale" === (l = e || l) && (o.space = "local");
            for (var t in p)
                p[t].visible = t === l;
            this.update(),
            o.dispatchEvent(d)
        }
        ,
        this.setTranslationSnap = function(e) {
            o.translationSnap = e
        }
        ,
        this.setRotationSnap = function(e) {
            o.rotationSnap = e
        }
        ,
        this.setSize = function(e) {
            o.size = e,
            this.update(),
            o.dispatchEvent(d)
        }
        ,
        this.setSpace = function(e) {
            o.space = e,
            this.update(),
            o.dispatchEvent(d)
        }
        ,
        this.update = function() {
            void 0 !== o.object && (o.object.updateMatrixWorld(),
            B.setFromMatrixPosition(o.object.matrixWorld),
            N.setFromRotationMatrix(E.extractRotation(o.object.matrixWorld)),
            e.updateMatrixWorld(),
            G.setFromMatrixPosition(e.matrixWorld),
            V.setFromRotationMatrix(E.extractRotation(e.matrixWorld)),
            M = B.distanceTo(G) / 6 * o.size,
            this.position.copy(B),
            this.scale.set(M, M, M),
            T.copy(G).sub(B).normalize(),
            "local" === o.space ? p[l].update(N, T) : "world" === o.space && p[l].update(new THREE.Euler, T),
            p[l].highlight(o.axis))
        }
    }
    ,
    THREE.TransformControls.prototype = Object.create(THREE.Object3D.prototype),
    THREE.TransformControls.prototype.constructor = THREE.TransformControls
}(),
THREE.TTFLoader = function(e) {
    this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager,
    this.reversed = !1
}
,
THREE.TTFLoader.prototype.load = function(e, t, r, a) {
    var n = this
      , i = new THREE.XHRLoader(this.manager);
    i.setResponseType("arraybuffer"),
    i.load(e, function(e) {
        void 0 !== t && t(n.parse(e))
    }, r, a)
}
,
THREE.TTFLoader.prototype.parse = function(e) {
    function t(e) {
        var t, r = [];
        e.forEach(function(e) {
            "m" === e.type.toLowerCase() ? (t = [e],
            r.push(t)) : "z" !== e.type.toLowerCase() && t.push(e)
        });
        var a = [];
        return r.forEach(function(e) {
            n = {
                type: "m",
                x: e[e.length - 1].x,
                y: e[e.length - 1].y
            };
            a.push(n);
            for (var t = e.length - 1; t > 0; t--) {
                var r = e[t]
                  , n = {
                    type: r.type
                };
                void 0 !== r.x2 && void 0 !== r.y2 ? (n.x1 = r.x2,
                n.y1 = r.y2,
                n.x2 = r.x1,
                n.y2 = r.y1) : void 0 !== r.x1 && void 0 !== r.y1 && (n.x1 = r.x1,
                n.y1 = r.y1),
                n.x = e[t - 1].x,
                n.y = e[t - 1].y,
                a.push(n)
            }
        }),
        a
    }
    return "undefined" == typeof opentype ? (console.warn("TTFLoader requires opentype.js Make sure it's included before using the loader"),
    null) : function(e, r) {
        for (var a = Math.round, n = {}, i = 1e5 / (72 * (e.unitsPerEm || 2048)), s = 0; s < e.glyphs.length; s++) {
            var o = e.glyphs.glyphs[s];
            if (void 0 !== o.unicode) {
                var l = {
                    ha: a(o.advanceWidth * i),
                    x_min: a(o.xMin * i),
                    x_max: a(o.xMax * i),
                    o: ""
                };
                r && (o.path.commands = t(o.path.commands)),
                o.path.commands.forEach(function(e, t) {
                    "c" === e.type.toLowerCase() && (e.type = "b"),
                    l.o += e.type.toLowerCase() + " ",
                    void 0 !== e.x && void 0 !== e.y && (l.o += a(e.x * i) + " " + a(e.y * i) + " "),
                    void 0 !== e.x1 && void 0 !== e.y1 && (l.o += a(e.x1 * i) + " " + a(e.y1 * i) + " "),
                    void 0 !== e.x2 && void 0 !== e.y2 && (l.o += a(e.x2 * i) + " " + a(e.y2 * i) + " ")
                }),
                n[String.fromCharCode(o.unicode)] = l
            }
        }
        return {
            glyphs: n,
            familyName: e.familyName || e.tables.name.fontFamily.en,
            ascender: a(e.ascender * i),
            descender: a(e.descender * i),
            underlinePosition: e.tables.post.underlinePosition,
            underlineThickness: e.tables.post.underlineThickness,
            boundingBox: {
                xMin: e.tables.head.xMin,
                xMax: e.tables.head.xMax,
                yMin: e.tables.head.yMin,
                yMax: e.tables.head.yMax
            },
            resolution: 1e3,
            original_font_information: e.tables.name
        }
    }(opentype.parse(e), this.reversed)
}
,
PZ.downloadBlob = null,
PZ.imageToBlob = function(e, t) {
    var r = document.createElement("canvas");
    r.width = e.width,
    r.height = e.height,
    r.getContext("2d").drawImage(e, 0, 0),
    PZ.canvasToBlob(r, t, !0)
}
,
PZ.imageToArray = function(e, t, r) {
    var a = document.createElement("canvas");
    a.width = e.width,
    a.height = e.height;
    var n = a.getContext("2d");
    if (n.drawImage(e, 0, 0),
    r) {
        for (var i = n.getImageData(0, 0, a.width, a.height), s = 0; s < i.length && !(i.data[s + 3] < 255); s += 4)
            ;
        s >= i.length && (r = !1)
    }
    PZ.canvasToArray(a, t, r)
}
,
PZ.canvasToArray = function(e, t, r) {
    PZ.canvasToBlob(e, function(e) {
        var r = new FileReader;
        r.onload = function(e) {
            t(e.target.result)
        }
        ,
        r.readAsArrayBuffer(e)
    }, r)
}
,
PZ.canvasToBlob = function(e, t, r, a, n) {
    if (a || (a = r ? "image/png" : "image/jpeg"),
    n || (n = .85),
    void 0 !== e.toBlob)
        e.toBlob(t, a, n);
    else if (void 0 !== e.msToBlob)
        t(e.msToBlob());
    else {
        for (var i = e.toDataURL(a, n), s = atob(i.substring(22)), o = new Uint8Array(s.length), l = 0, c = s.length; l < c; ++l)
            o[l] = s.charCodeAt(l);
        t(new Blob([o],a))
    }
}
,
PZ.extend = function(e, t) {
    for (var r in t)
        if ("object" == typeof e[r] && !1 === Array.isArray(e[r]))
            for (var a in t[r])
                !1 !== t[r].hasOwnProperty(a) && (e[r][a] = t[r][a]);
        else
            e[r] = t[r]
}
,
PZ.getParameterByName = function(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
    return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
}
,
PZ.editor = {},
PZ.editor.generateSpacer = function() {
    return $("<div>", {
        class: "proprow spacer"
    })
}
,
PZ.editor.generatePlaceholder = function() {
    return $("<div>")
}
,
PZ.editor.generateTitle = function(e) {
    var t = $("<div>", {
        class: "proprow proptitle noselect"
    });
    if (t.append($("<span>", {
        class: "proplabel"
    }).append(e.title).css("font-size", "18px").css("font-weight", "bold")),
    e.randomize) {
        var r = $("<div>", {
            class: "propcol"
        })
          , a = $("<a>", {
            style: "cursor:pointer;margin:0;",
            title: "randomize"
        }).on("click", e.randomize);
        PZ.editor.generateIcon("random").attr("style", "width:30px;height:30px;fill:#ccc;pointer-events:none").appendTo(a);
        r.append(a),
        t.append(r)
    }
    return t
}
,
PZ.editor.generateDescription = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect",
        style: "padding: 10px 10px;cursor:default;"
    })
      , a = $("<span>").appendTo(r);
    return r.on("update", function() {
        var r = e.get ? e.get.call(t) : e.content;
        a.html(r)
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.showEaseDropDown = function(e) {
    var t = PZ.editor.easeDropDown;
    if (void 0 === PZ.editor.easeDropDown) {
        t = PZ.editor.easeDropDown = $("<ul>", {
            class: "pz-dropdown",
            tabindex: "-1"
        }).keydown(function(e) {
            if (27 === e.which)
                $(this).blur(),
                e.preventDefault();
            else if (13 === e.which)
                $(this).data("input").set($(this).children(".pz-active").first().index()),
                $(this).blur(),
                e.preventDefault();
            else if (38 === e.which) {
                var r = (a = $(this).children(".pz-active")).prev();
                if (!r.length)
                    return;
                a.removeClass("pz-active"),
                r.addClass("pz-active"),
                t.scrollTo(r.index()),
                e.preventDefault()
            } else if (40 === e.which) {
                var a = $(this).children(".pz-active")
                  , n = a.next();
                if (!n.length)
                    return;
                a.removeClass("pz-active"),
                n.addClass("pz-active"),
                t.scrollTo(n.index()),
                e.preventDefault()
            }
        }),
        $.extend(PZ.editor.easeDropDown, {
            scrollTo: function(e) {
                var t = this.children().first().outerHeight()
                  , r = this.scrollTop();
                (t * e < r || t * (e + 1) > r + this.innerHeight()) && this.scrollTop(t * e)
            }
        });
        for (var r = 0; r < TWEEN.EasingList.length; r++)
            PZ.editor.easeDropDown.append($("<li>").append(PZ.editor.generateIcon("ease_" + r)).append($("<span>").append(TWEEN.EasingList[r].name)).mouseenter(function() {
                $(this).addClass("pz-active").siblings().removeClass("pz-active")
            }).click(function() {
                $(this).parent().data("input").set($(this).index()),
                $(this).parent().blur()
            }));
        PZ.editor.easeDropDown.on("blur", function() {
            $(this).hide()
        }),
        $("body").append(PZ.editor.easeDropDown)
    }
    PZ.editor.easeDropDown.show();
    var a = PZ.editor.easeDropDown.outerWidth()
      , n = PZ.editor.easeDropDown.outerHeight()
      , i = e.outerHeight()
      , s = PZ.editor.easeDropDown[0].ownerDocument
      , o = s.documentElement
      , l = o.clientWidth + $(s).scrollLeft()
      , c = o.clientHeight + $(s).scrollTop()
      , p = e.offset();
    p.top += i,
    p.left -= Math.min(p.left, p.left + a > l && l > a ? Math.abs(p.left + a - l) : 0),
    p.top -= Math.min(p.top, p.top + n > c && c > n ? Math.abs(n + i - 0) : 0),
    PZ.editor.easeDropDown.offset(p),
    PZ.editor.easeDropDown.children(".pz-active").removeClass("pz-active"),
    PZ.editor.easeDropDown.children().eq(e.value).addClass("pz-active"),
    t.scrollTo(e.value),
    PZ.editor.easeDropDown.data("input", e),
    PZ.editor.easeDropDown.focus()
}
,
PZ.editor.showFontDropDown = function(e) {
    var t = PZ.editor.fontDropDown;
    if (void 0 === PZ.editor.fontDropDown) {
        t = PZ.editor.fontDropDown = $("<ul>", {
            class: "pz-dropdown",
            tabindex: "-1",
            style: "width:auto;"
        }).keydown(function(e) {
            if (27 === e.which)
                $(this).blur(),
                e.preventDefault();
            else if (13 === e.which)
                $(this).data("input").set($(this).children(".pz-active").first().index()),
                $(this).blur(),
                e.preventDefault();
            else if (38 === e.which) {
                var r = (a = $(this).children(".pz-active")).prev();
                if (!r.length)
                    return;
                a.removeClass("pz-active"),
                r.addClass("pz-active"),
                t.scrollTo(r.index()),
                e.preventDefault()
            } else if (40 === e.which) {
                var a = $(this).children(".pz-active")
                  , n = a.next();
                if (!n.length)
                    return;
                a.removeClass("pz-active"),
                n.addClass("pz-active"),
                t.scrollTo(n.index()),
                e.preventDefault()
            }
        }),
        $.extend(PZ.editor.fontDropDown, {
            scrollTo: function(e) {
                var t = this.children().first().outerHeight()
                  , r = this.scrollTop();
                (t * e < r || t * (e + 1) > r + this.innerHeight()) && this.scrollTop(t * e)
            }
        });
        for (var r = 0; r < PZ.fonts.preset.length + 1; r++)
            PZ.editor.fontDropDown.append($("<li>").append($("<span>", {
                style: "background-image: url('fonts.png');width:200px;height:25px;display:block;"
            }).css("backgroundPositionY", -25 * r)).mouseenter(function() {
                $(this).addClass("pz-active").siblings().removeClass("pz-active")
            }).click(function() {
                $(this).parent().data("input").set($(this).index()),
                $(this).parent().blur()
            }));
        PZ.editor.fontDropDown.on("blur", function() {
            $(this).hide()
        }),
        $("body").append(PZ.editor.fontDropDown)
    }
    PZ.editor.fontDropDown.show();
    var a = PZ.editor.fontDropDown.outerWidth()
      , n = PZ.editor.fontDropDown.outerHeight()
      , i = e.outerHeight()
      , s = PZ.editor.fontDropDown[0].ownerDocument
      , o = s.documentElement
      , l = o.clientWidth + $(s).scrollLeft()
      , c = o.clientHeight + $(s).scrollTop()
      , p = e.offset();
    p.top += i,
    p.left -= Math.min(p.left, p.left + a > l && l > a ? Math.abs(p.left + a - l) : 0),
    p.top -= Math.min(p.top, p.top + n > c && c > n ? Math.abs(n + i - 0) : 0),
    PZ.editor.fontDropDown.offset(p),
    PZ.editor.fontDropDown.children(".pz-active").removeClass("pz-active"),
    PZ.editor.fontDropDown.children().eq(e.value).addClass("pz-active"),
    t.scrollTo(e.value),
    PZ.editor.fontDropDown.data("input", e),
    PZ.editor.fontDropDown.focus()
}
,
PZ.editor.generateKeyframeToolbar = function(e, t) {
    if (PZ.keyframes.noFrames)
        return r = $("<div>", {
            style: "display:none;"
        });
    var r = $("<div>", {
        class: "editbox",
        style: "height:32px"
    })
      , a = $("<a>", {
        class: "pz-tweens",
        title: "interpolation"
    }).click(function() {
        var e = a;
        e.set(0 === e.value ? 1 : 0)
    });
    PZ.editor.generateIcon("interp_0").attr("style", "width:35px;height:23px;pointer-events:none").appendTo(a);
    var n = $("<a>", {
        class: "pz-tweens",
        title: "easing"
    }).click(function() {
        PZ.editor.showEaseDropDown(n)
    });
    $.extend(a, {
        set: function(r) {
            this.update(r << 8, !0),
            e.set.call(t, a.value << 8 | n.value, -1)
        },
        update: function(e, t) {
            var r = this;
            !1 === t ? r.css("visibility", "hidden") : (r.value = e >> 8,
            r.css("visibility", "visible"),
            PZ.editor.switchIcon(r.children().first(), "interp_" + r.value))
        },
        value: 0
    }),
    $.extend(n, {
        set: function(r) {
            this.update(r, !0),
            e.set.call(t, a.value << 8 | n.value, -1)
        },
        update: function(e, t) {
            var r = this;
            !1 === t ? r.css("visibility", "hidden") : (r.value = 255 & e,
            r.css("visibility", "visible"),
            PZ.editor.switchIcon(r.children().first(), "ease_" + r.value))
        },
        value: 0
    }),
    PZ.editor.generateIcon("ease_1").attr("style", "width:35px;height:23px;pointer-events:none").appendTo(n),
    e.tweens && (r.append(a),
    r.append(n));
    var i = $("<a>", {
        style: "display: inline-block;margin-top:5px;margin-left:10px;vertical-align:top;cursor: pointer;",
        title: "add keyframe"
    }).click(function() {
        e.set.call(t),
        r.parent().parent().triggerHandler("update")
    }).appendTo(r)
      , s = PZ.editor.generateIcon("add").attr("style", "width:17px;height:17px;fill:#ccc;pointer-events:none").appendTo(i);
    return r.on("update", function(e, t) {
        var r = void 0 !== t;
        PZ.editor.switchIcon(s, r ? "remove" : "add"),
        r ? -1 === t ? (i.css("visibility", "hidden"),
        a.update(0, !1),
        n.update(0, !1)) : (i.css("visibility", "visible"),
        i.attr("title", "delete keyframe"),
        a.update(t, !0),
        n.update(t, !0)) : (i.css("visibility", "visible"),
        i.attr("title", "add keyframe"),
        a.update(0, !1),
        n.update(0, !1))
    }),
    r
}
,
PZ.editor.generateInput = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    if (r.append($("<span>", {
        class: "proplabel"
    }).append(e.title)),
    void 0 !== e.keyframed) {
        r.attr("kf", "1");
        var n = PZ.editor.generateKeyframeToolbar(e, t);
        n.appendTo(a)
    }
    var i = $("<input>", {
        class: "pzinput"
    });
    return a.append(i),
    r.append(a),
    i.pzinput({
        change: function(r) {
            e.set.call(t, parseFloat(r), 0)
        },
        max: e.vmax,
        min: e.vmin,
        step: e.vstep,
        decimals: e.decimals,
        dragstep: e.dragstep
    }),
    r.on("update", function() {
        var r = e.get.call(t);
        if (void 0 === r)
            i.css("visibility", "hidden"),
            void 0 !== n && n.triggerHandler("update");
        else {
            if (e.keyframed) {
                var a = r.frame === PZ.keyframes.getFrame() ? r.tweenfn : void 0;
                n.triggerHandler("update", a),
                r = r.value
            }
            i.val(r.toFixed(e.decimals)),
            i.css("visibility", "visible")
        }
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateGradientPicker = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    r.append($("<span>", {
        class: "proplabel"
    }).append(e.title));
    var n = $("<div>");
    return a.append(n),
    r.append(a),
    n.gradientPicker({
        change: function(r, a) {
            e.set.call(t, r.slice())
        },
        generateStyles: "false"
    }),
    r.on("update", function() {
        n.gradientPicker("update", {
            controlPoints: e.get.call(t).slice()
        })
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateFileUpload = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    r.append($("<span>", {
        class: "proplabel"
    }).append(e.title));
    var n = $("<a>", {
        style: "margin: 3px 0;display: inline-block;cursor: pointer;"
    }).append("select").on("click", function() {
        i.trigger("click")
    })
      , i = $("<input>", {
        type: "file",
        style: "height:0px;width:0px;overflow:hidden;"
    }).change(function(r) {
        e.set.call(t, this)
    });
    return e.accept && i.attr("accept", e.accept),
    e.multiple && i.attr("multiple", "true"),
    r.append(i),
    a.append(n),
    r.append(a),
    r
}
,
PZ.editor.generateDualInput = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    if (r.append($("<span>", {
        class: "proplabel"
    }).append(e.title)),
    void 0 !== e.keyframed) {
        r.attr("kf", "1");
        var n = PZ.editor.generateKeyframeToolbar(e, t);
        n.appendTo(a)
    }
    var i = $("<input>", {
        class: "pzinput"
    })
      , s = $("<input>", {
        class: "pzinput"
    })
      , o = $("<div>", {
        style: "text-align:right"
    });
    return o.append($("<div>").append(e.subtitle1 + " ").append(i)),
    o.append($("<div>").append(e.subtitle2 + " ").append(s)),
    a.append(o),
    r.append(a),
    e.positionButtons && (r.append($("<a>", {
        class: "positionButton pointerButton",
        title: "position with cursor"
    }).click(function() {
        null !== draggingObject && (draggingObject = null),
        $("#c_backgrounder").css("cursor", "crosshair"),
        positioningCrosshair = !0,
        positioningFunction = function(e, t) {
            $input.val(e),
            s.val(t),
            updatefn1(e),
            updatefn2(t),
            positioningCrosshair = !1,
            $("#c_backgrounder").css("cursor", "default")
        }
    })),
    r.append($("<a>", {
        class: "positionButton centerButton",
        title: "move to center"
    }).click(function() {
        null !== draggingObject && (draggingObject = null),
        positioningCrosshair = !1,
        $input.val(Math.floor(.5 * fullImgWidth)),
        s.val(Math.floor(.5 * fullImgHeight)),
        updatefn1(Math.floor(.5 * fullImgWidth)),
        updatefn2(Math.floor(.5 * fullImgHeight))
    }))),
    i.pzinput({
        change: function(r) {
            e.set.call(t, parseFloat(r), 0)
        },
        max: e.vmax,
        min: e.vmin,
        step: e.vstep,
        decimals: e.decimals,
        dragstep: e.dragstep
    }),
    s.pzinput({
        change: function(r) {
            e.set.call(t, parseFloat(r), 1)
        },
        max: e.vmax,
        min: e.vmin,
        step: e.vstep,
        decimals: e.decimals,
        dragstep: e.dragstep
    }),
    r.on("update", function() {
        var r = e.get.call(t);
        if (void 0 === r)
            o.css("visibility", "hidden"),
            void 0 !== n && n.triggerHandler("update");
        else {
            if (e.keyframed) {
                var a = r.frame === PZ.keyframes.getFrame() ? r.tweenfn : void 0;
                n.triggerHandler("update", a),
                r = r.value
            }
            i.val(r.x.toFixed(e.decimals)),
            s.val(r.y.toFixed(e.decimals)),
            o.css("visibility", "visible")
        }
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateTriInput = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    if (r.append($("<span>", {
        class: "proplabel"
    }).append(e.title)),
    void 0 !== e.keyframed) {
        r.attr("kf", "1");
        var n = PZ.editor.generateKeyframeToolbar(e, t);
        n.appendTo(a)
    }
    var i = $("<div>", {
        class: "editbox"
    })
      , s = $("<input>", {
        class: "pzinput"
    }).appendTo(i)
      , o = $("<input>", {
        class: "pzinput"
    }).appendTo(i)
      , l = $("<input>", {
        class: "pzinput"
    }).appendTo(i);
    return a.append(i),
    r.append(a),
    s.pzinput({
        change: function(r) {
            e.set.call(t, parseFloat(r), 0)
        },
        max: e.vmax,
        min: e.vmin,
        step: e.vstep,
        decimals: e.decimals,
        dragstep: e.dragstep
    }),
    o.pzinput({
        change: function(r) {
            e.set.call(t, parseFloat(r), 1)
        },
        max: e.vmax,
        min: e.vmin,
        step: e.vstep,
        decimals: e.decimals,
        dragstep: e.dragstep
    }),
    l.pzinput({
        change: function(r) {
            e.set.call(t, parseFloat(r), 2)
        },
        max: e.vmax,
        min: e.vmin,
        step: e.vstep,
        decimals: e.decimals,
        dragstep: e.dragstep
    }),
    r.on("update", function() {
        var r = e.get.call(t);
        if (void 0 === r)
            i.css("visibility", "hidden"),
            void 0 !== n && n.triggerHandler("update");
        else {
            if (e.keyframed) {
                var a = r.frame === PZ.keyframes.getFrame() ? r.tweenfn : void 0;
                n.triggerHandler("update", a),
                r = r.value
            }
            s.val(r.x.toFixed(e.decimals)),
            o.val(r.y.toFixed(e.decimals)),
            l.val(r.z.toFixed(e.decimals)),
            i.css("visibility", "visible")
        }
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateItemSelector = function(e, t) {
    var r = $("<div>").attr("style", "position:absolute;left: 0;right: 0;top: 0;bottom: 0;background-color:#1d1d1d;")
      , a = {
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
      , n = ""
      , i = $("<ul>", {
        class: "pz-options",
        style: "overflow-y:auto;left:0;right:0;bottom:0;position:absolute;top:69px;"
    });
    i.data("fuse", new Fuse(e.items,a));
    var s = $("<a>", {
        class: "proprow propbutton noselect",
        tabindex: "0"
    }).append("Cancel").click(function() {
        r.detach(),
        i.siblings("ul").remove(),
        i.show(),
        o.val(""),
        n = "",
        i.children(".active").removeClass("active"),
        i.children().attr("style", "")
    }).on("keydown", function(e) {
        e.stopPropagation(),
        "Escape" === e.key ? s.trigger("click") : "Enter" === e.key ? s.trigger("click") : (o.focus(),
        o[0].dispatchEvent(new KeyboardEvent(e.type,e)))
    })
      , o = $("<input>", {
        type: "text",
        placeholder: "type to filter",
        class: "proprow noselect pz-inputbox",
        style: "border: 0; padding:5px; margin: 1px 0; outline-color: #ccc; box-sizing:border-box; width:100%;background-color: #2a2a2a;"
    }).on("keyup", function(e) {
        var t = $(this).val();
        if (t !== n) {
            n = t;
            var a = r.children("ul").last()
              , i = a.data("fuse");
            if (a.children(".active").removeClass("active"),
            "" !== t) {
                var s = i.search($(this).val());
                a.children().hide();
                for (var o = 0; o < s.length; o++)
                    s[o].category || s[o].$el.show();
                a.children(":visible").first().addClass("active")
            } else
                a.children().attr("style", "")
        }
    }).on("keydown", function(e) {
        var t = r.children("ul").last();
        if ("ArrowUp" === e.key) {
            if (e.preventDefault(),
            0 === (a = t.children(".active").first()).length)
                return (a = t.children("li:visible").first()).addClass("active"),
                void a[0].scrollIntoViewIfNeeded(!1);
            a.removeClass("active"),
            0 === (a = a.prevAll("li:visible").first()).length && (a = t.children("li:visible").last()),
            a.addClass("active"),
            a[0].scrollIntoViewIfNeeded(!1)
        } else if ("ArrowDown" === e.key) {
            e.preventDefault();
            var a = t.children(".active").first();
            if (0 === a.length)
                return (a = t.children("li:visible").first()).addClass("active"),
                void a[0].scrollIntoViewIfNeeded(!1);
            a.removeClass("active"),
            0 === (a = a.nextAll("li:visible").first()).length && (a = t.children("li:visible").first()),
            a.addClass("active"),
            a[0].scrollIntoViewIfNeeded(!1)
        } else if ("Escape" === e.key)
            s.trigger("click");
        else if ("Enter" === e.key) {
            var n = t.children("li.active").first()[0];
            n && n.dispatchEvent(new MouseEvent("click",{
                ctrlKey: e.ctrlKey
            }))
        }
    });
    r.append(s),
    r.append(o),
    r.append(i);
    for (var l = 0; l < e.items.length; l++)
        if (!0 === e.items[l].category)
            i.append($("<span>").append(e.items[l].name));
        else {
            var c = $("<li>").append(e.items[l].name).append($("<span>").text(e.items[l].desc)).data("item", e.items[l]).click(function(r) {
                r.stopPropagation();
                var n = $(this).index()
                  , l = e.items[n];
                if (!l.list || l.hidelist && !r.ctrlKey)
                    e.addfn.call(t, n, 0),
                    s.trigger("click");
                else {
                    i.hide();
                    var p = $("<ul>", {
                        class: "pz-options",
                        style: "top: 66px"
                    }).insertAfter(i);
                    p.data("fuse", new Fuse(l.list,a));
                    for (var h = 0; h < l.list.length; h++)
                        o.val(""),
                        c = $("<li>").append(l.list[h].name).click(function() {
                            e.addfn.call(t, n, $(this).index()),
                            s.trigger("click")
                        }),
                        p.append(c),
                        l.list[h].$el = c
                }
            }).mousedown(function(e) {
                e.preventDefault()
            });
            i.append(c),
            e.items[l].$el = c
        }
    return r
}
,
PZ.editor.generateDropdownAdd = function(e, t) {
    var r = this.generateItemSelector(e, t)
      , a = $("<a>", {
        class: "proprow propbutton noselect",
        tabindex: "0"
    }).append(PZ.editor.generateIcon("add").attr("style", "display:inline-block;margin-right:10px;position:relative;top:2px;fill:#ccc;width:15px;height:15px;pointer-events:none")).append($("<span>").append(e.title)).on("keydown", function(e) {
        "Enter" === e.key && a.trigger("click")
    }).click(function() {
        a.parent().append(r),
        r.children().first().focus()
    });
    return a
}
,
PZ.editor.generateDropdown = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    r.append($("<span>", {
        class: "proplabel"
    }).append(e.title));
    var n = $("<select>", {
        class: "pz-inputbox"
    }).change(function() {
        e.set.call(t, parseInt(this.value) - 1, 0)
    });
    if (void 0 !== e.keyframed) {
        r.attr("kf", "1");
        var i = PZ.editor.generateKeyframeToolbar(e, t);
        i.appendTo(a)
    }
    a.append(n),
    r.append(a);
    for (var s = e.items.split(";"), o = 0; o < s.length; ++o)
        n.append($("<option>", {
            value: o + 1
        }).append(s[o]));
    return r.on("update", function() {
        var r = e.get.call(t);
        if (void 0 === r)
            n.css("visibility", "hidden"),
            void 0 !== i && i.triggerHandler("update");
        else {
            if (e.keyframed) {
                var a = r.frame === PZ.keyframes.getFrame() ? r.tweenfn : void 0;
                i.triggerHandler("update", a),
                r = r.value
            }
            n.prop("selectedIndex", r),
            n.css("visibility", "visible")
        }
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateButton = function(e, t) {
    return $("<a>", {
        class: "proprow propbutton noselect",
        tabindex: "0"
    }).append($("<span>").append(e.title)).on("click", e.clickfn.bind(t))
}
,
PZ.editor.generateFontPicker = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    r.append($("<span>", {
        class: "proplabel"
    }).append(e.title));
    var n = $("<a>", {
        class: "pz-tweens",
        title: "font",
        style: "height:auto"
    }).append($("<span>", {
        style: "display:block; width:200px; height:25px; margin:1px; background-image:url('fonts.png')"
    })).click(function() {
        PZ.editor.showFontDropDown(n)
    });
    return $.extend(n, {
        set: function(r) {
            this.value = r,
            e.set.call(t, r),
            this.update()
        },
        update: function() {
            n.children().first().css("backgroundPositionY", -25 * this.value)
        },
        value: 0
    }),
    a.append(n),
    r.append(a),
    r.on("update", function() {
        var r = e.get.call(t);
        n.value = r,
        n.update()
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateTextInput = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<input>", {
        style: "box-sizing:border-box;width:100%;display:block;margin:auto;margin: 5px 0;padding:5px;",
        class: "pz-inputbox"
    }).on("change", function() {
        e.set.call(t, this.value)
    }).on("keydown", function(e) {
        return 13 != e.which || (this.blur(),
        !1)
    });
    return r.on("update", function() {
        a.val(e.get.call(t))
    }),
    r.triggerHandler("update"),
    r.append(a),
    r
}
,
PZ.editor.generateTextArea = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<textarea>", {
        rows: "9",
        class: "pz-textarea"
    }).on("change", function() {
        e.set.call(t, this.value)
    }).appendTo(r);
    return r.on("update", function() {
        a.val(e.get.call(t))
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateColorPicker = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<div>", {
        class: "propcol"
    });
    r.append($("<span>", {
        class: "proplabel"
    }).append(e.title));
    var n = $("<input>", {
        type: "text"
    });
    if (void 0 !== e.keyframed) {
        r.attr("kf", "1");
        var i = PZ.editor.generateKeyframeToolbar(e, t);
        i.appendTo(a)
    }
    var s = $("<div>").append(n);
    return a.append(s),
    r.append(a),
    n.spectrum({
        flat: !1,
        showInput: !0,
        showInitial: !0,
        allowEmpty: !1,
        showAlpha: e.hasalpha,
        disabled: !1,
        showPalette: !0,
        clickoutFiresChange: !0,
        preferredFormat: "RGBA",
        change: function(r) {
            e.set.call(t, r)
        }
    }),
    r.on("update", function() {
        n.spectrum("set", e.get.call(t))
    }),
    r.on("update", function() {
        var r = e.get.call(t);
        if (void 0 === r)
            s.css("visibility", "hidden"),
            void 0 !== i && i.triggerHandler("update");
        else {
            if (e.keyframed) {
                var a = r.frame === PZ.keyframes.getFrame() ? r.tweenfn : void 0;
                i.triggerHandler("update", a),
                r = r.value.getHexString()
            }
            n.spectrum("set", r),
            s.css("visibility", "visible")
        }
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateList = function(e) {
    return $("<ul>", {
        class: "pz-listbox"
    })
}
,
PZ.editor.generateListItem = function(e) {
    var t = $("<li>");
    return e.isgroup && t.attr("group", "1"),
    t.click(e.selectfn),
    t.append($("<span>").text("unnamed object")),
    t.append($("<a>", {
        title: "delete"
    }).append(PZ.editor.generateIcon("remove").attr("style", "width:15px;height:15px;fill:#ccc;pointer-events:none;")).click(e.deletefn)),
    e.clonefn && t.append($("<a>", {
        title: "duplicate"
    }).append(PZ.editor.generateIcon("duplicate").attr("style", "width:15px;height:15px;fill:#ccc;pointer-events:none;")).click(e.clonefn)),
    e.fxfn && t.append($("<a>", {
        title: "add effect"
    }).append(PZ.editor.generateIcon("addeffect").attr("style", "width:15px;height:15px;fill:#ccc;pointer-events:none;")).click(e.fxfn)),
    t
}
,
PZ.editor.generateProgressbar = function(e, t) {
    var r = $("<div>", {
        class: "proprow noselect"
    })
      , a = $("<span>");
    return r.append($("<div>", {
        class: "pz-progress"
    }).append(a)),
    r.on("update", function() {
        a.css("width", e.get.call(t) + "%")
    }),
    r.triggerHandler("update"),
    r
}
,
PZ.editor.generateIcon = function(e) {
    var t = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      , r = document.createElementNS("http://www.w3.org/2000/svg", "use");
    return r.setAttributeNS("http://www.w3.org/1999/xlink", "href", "pz.icons10.svg#" + e),
    t.appendChild(r),
    $(t)
}
,
PZ.editor.switchIcon = function(e, t) {
    e.children().first().attr("href", "pz.icons10.svg#" + t)
}
,
PZ.editor.elevator_init = function(e, t, r) {
    $("<a>", {
        title: "Menu"
    }).append(PZ.editor.generateIcon("menu")).click(!0, PZ.editor.elevator_button).prependTo("#elevator");
    for (var a = 0; a < e.length; a++)
        $("<a>", {
            title: e[a].title
        }).append(PZ.editor.generateIcon(e[a].sprite)).append($("<span>").text(e[a].title)).appendTo("#elevatortabs"),
        $("#controls").append($("<div>").hide());
    $("#elevatortabs a").click(!1, PZ.editor.elevator_button),
    PZ.editor.elevator_changetab(0)
}
,
PZ.editor.elevator_open = function() {
    $("#elevator").addClass("open"),
    $("#elevatortabs").css("overflow-y", "auto")
}
,
PZ.editor.elevator_close = function() {
    $("#elevator").removeClass("open"),
    $("#elevatortabs").css("overflow-y", "hidden")
}
,
PZ.editor.elevator_button = function(e) {
    if (!0 !== this.disabled) {
        var t = $(e.delegateTarget).index();
        !0 === e.data ? $("#elevator").width() < 100 ? PZ.editor.elevator_open() : PZ.editor.elevator_close() : (PZ.editor.elevator_changetab(t),
        PZ.editor.elevator_close())
    }
}
,
PZ.editor.elevator_changetab = function(e) {
    var t = $("#elevatortabs a.el-selected");
    t.index() !== e && (t.removeClass("el-selected"),
    $("#elevator a").eq(e + 1).addClass("el-selected"),
    $("#controls").children().hide(),
    $("#controls").children().eq(e).show(),
    $("#elevatortabs").animate({
        scrollTop: 50 * (e - 1) + "px"
    }, 100, "swing"),
    void 0 === $("#controls").children().eq(e).data("loaded") && ($("#elevator").trigger("tabload", [e, $("#controls").children().eq(e)]),
    $("#controls").children().eq(e).data("loaded", !0)),
    $("#elevator").trigger("tabchanged", e))
}
,
PZ.editor.elevator_tablock = function(e, t) {
    $("#elevator a").eq(e + 1).siblings().css("visibility", !0 === t ? "collapse" : "visible")
}
,
PZ.editor.elevator_unloadtab = function(e) {
    $("#controls").children().eq(e).children().remove(),
    $("#controls").children().eq(e).removeData("loaded")
}
,
PZ.random = {},
PZ.random.number = function(e, t, r) {
    var a = Math.random() * (t - e + (r ? 1 : 0)) + e;
    return r && (a = Math.floor(a)),
    a
}
,
PZ.random.normal = function(e, t) {
    for (var r = 0, a = 0; a < 5; a++)
        r += Math.random();
    return t * (r - 2.5) / 2.5 + e
}
,
PZ.random.color = function(e) {
    var t = "rgba(";
    return t += this.number(0, 255, !0) + ", " + this.number(0, 255, !0) + ", " + this.number(0, 255, !0) + ", " + (e ? this.number(0, 1) : 1),
    t += ")"
}
,
PZ.random.grayColor = function(e) {
    var t = "rgba("
      , r = this.number(0, 255, !0);
    return t += r + ", " + r + ", " + r + ", " + (e ? this.number(0, 1) : 1),
    t += ")"
}
,
PZ.feedback = {
    type: 0,
    message: "",
    lastSent: null
},
PZ.feedback.select = function(e) {
    var t = this;
    PZ.editor.generateTitle({
        title: "What do you think?"
    }).appendTo(e),
    PZ.editor.generateDescription({
        content: "Your feedback is always appreciated and is used to improve the app."
    }).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e);
    var r, a, n, i, s;
    r = PZ.editor.generateDropdown({
        title: "Type",
        items: "Suggestion;Problem;Comment;Question",
        get: function() {
            return t.type
        },
        set: function(e) {
            t.type = e,
            3 === e ? (a.hide(),
            n.show()) : (a.show(),
            n.hide())
        }
    }).appendTo(e),
    a = PZ.editor.generatePlaceholder().appendTo(e),
    PZ.editor.generateTextArea({
        get: function() {
            return t.message
        },
        set: function(e) {
            t.message = e
        }
    }).appendTo(a),
    PZ.editor.generateSpacer().appendTo(a),
    PZ.editor.generateButton({
        title: "Send your feedback",
        clickfn: function() {
            if (!(t.message.length < 10 || t.message.length > 1500 || null !== t.lastSent && Date.now() - t.lastSent < 1e4)) {
                t.lastSent = Date.now(),
                r.hide(),
                a.hide();
                var e = 0;
                "undefined" == typeof BG && (e = void 0 === CM ? 2 : 1),
                PZ.api("/feedback", "post", {
                    feedbackSource: e,
                    feedbackType: t.type,
                    feedbackCategory: 0,
                    toolVersion: "2.0.191",
                    message: t.message
                }).then(function() {
                    i.show()
                }, function() {
                    s.show()
                })
            }
        }
    }).appendTo(a),
    n = PZ.editor.generateDescription({
        content: 'Please <a target="_blank" href="/discussions">create a discussion</a> to ask your questions as we cannot respond directly to feedback.'
    }).hide().appendTo(e),
    i = PZ.editor.generatePlaceholder().hide().appendTo(e),
    PZ.editor.generateDescription({
        content: 'Thanks! Your feedback was sent.<br /><br />Still need help? <a target="_blank" href="/discussions">Create a discussion</a> if you have questions or need assistance.'
    }).appendTo(i),
    PZ.editor.generateSpacer().appendTo(i),
    PZ.editor.generateButton({
        title: "Send more feedback",
        clickfn: function() {
            t.type = 0,
            t.message = "",
            r.trigger("update"),
            a.children().trigger("update"),
            r.show(),
            a.show(),
            i.hide()
        }
    }).appendTo(i),
    s = PZ.editor.generateDescription({
        content: "Sorry, your feedback could not be sent. Please try again later."
    }).hide().appendTo(s)
}
,
PZ.shaders = {
    materials: {},
    vertexShader: THREE.CopyShader.vertexShader
},
PZ.shaders.load = function(e, t, r, a, n) {
    var i = "assets/shaders/fragment/" + e + ".glsl";
    return PZ.shaders.materials[e] ? PZ.shaders.materials[e].ref += 1 : void 0 !== n ? (PZ.shaders.materials[e] = {},
    PZ.shaders.materials[e].shader = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(t),
        vertexShader: PZ.shaders.vertexShader,
        fragmentShader: n,
        transparent: void 0 === r,
        lights: void 0 !== a
    }),
    PZ.shaders.materials[e].ref = 1) : $.ajax({
        url: i + "?v=2.0.191",
        dataType: "text",
        async: !1,
        cache: !0,
        success: function(n) {
            PZ.shaders.materials[e] = {},
            PZ.shaders.materials[e].shader = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(t),
                vertexShader: PZ.shaders.vertexShader,
                fragmentShader: n,
                transparent: void 0 !== r,
                lights: void 0 !== a
            }),
            PZ.shaders.materials[e].ref = 1
        }
    }),
    PZ.shaders.materials[e].shader.clone()
}
,
PZ.shaders.unload = function(e) {
    PZ.shaders.materials[e].ref -= 1,
    PZ.shaders.materials[e].ref <= 0 && (PZ.shaders.materials[e].shader.dispose(),
    delete PZ.shaders.materials[e])
}
,
PZ.keyframes = {},
PZ.keyframes.update = null,
PZ.keyframes.getFrame = null,
PZ.keyframes.get = function(e, t) {
    void 0 === t && (t = this.getFrame());
    for (var r = 0; r < e.length; r++) {
        if (e[r].frame == Math.floor(t))
            return e[r];
        if (e[r].frame > t)
            break
    }
}
,
PZ.keyframes.get2 = function(e, t) {
    return 1 === e.length ? e[0] : this.get(e, t)
}
,
PZ.keyframes.getValue = function(e, t) {
    var r = this.get(e, t);
    if (void 0 !== r)
        return r.value
}
,
PZ.keyframes.delete = function(e, t) {
    if (void 0 === t && (t = this.getFrame()),
    1 !== e.length) {
        for (var r = 0; r < e.length; r++)
            e[r].frame == Math.floor(t) && e.splice(r, 1);
        PZ.keyframes.update()
    }
}
,
PZ.keyframes.add = function(e, t, r) {
    void 0 === t && (t = this.getFrame());
    for (var a = {
        frame: t = Math.floor(t),
        value: TWEEN.getValue(e, t),
        tweenfn: r ? 0 : e[0].tweenfn || 1
    }, n = 0; n < e.length; n++)
        if (e[n].frame > t)
            return e.splice(n, 0, a),
            void PZ.keyframes.update();
    e.push(a),
    PZ.keyframes.update()
}
,
PZ.keyframes.clone = function(e) {
    var t = {};
    return t.frame = e.frame,
    t.tweenfn = e.tweenfn,
    "object" == typeof e.value ? t.value = e.value.clone() : t.value = e.value,
    t
}
,
PZ.keyframes.cloneAll = function(e) {
    for (var t = [], r = 0; r < e.length; r++)
        t.push(this.clone(e[r]));
    return t
}
,
PZ.keyframes.cloneProps = function(e) {
    var t = {};
    for (var r in e)
        t[r] = this.cloneAll(e[r]);
    return t
}
,
PZ.keyframes.sort = function(e, t) {
    return e.frame < t.frame ? -1 : e.frame > t.frame ? 1 : 0
}
,
PZ.keyframes.translate = function(e, t) {
    for (var r = 0; r < e.length; r++)
        e[r].frame += t
}
,
PZ.keyframes.translateAll = function(e, t) {
    for (var r in e)
        this.translate(e[r], t)
}
,
PZ.keyframes.toVector3 = function(e, t) {
    for (var r = new THREE.Vector3(.001,.001,.001), a = 0; a < e.length; a++)
        e[a].value = (new THREE.Vector3).copy(e[a].value),
        !0 === t && e[a].value.max(r)
}
,
PZ.keyframes.toVector2 = function(e) {
    for (var t = 0; t < e.length; t++)
        e[t].value = (new THREE.Vector2).copy(e[t].value)
}
,
PZ.keyframes.toColor = function(e) {
    for (var t = 0; t < e.length; t++) {
        var r = e[t].value;
        e[t].value = "number" == typeof r ? new THREE.Color(r) : (new THREE.Color).copy(r)
    }
}
,
PZ.keyframes.genericValueGet = function(e, t) {
    if (1 === t.length) {
        var r = PZ.keyframes.clone(t[0]);
        return r.tweenfn = -1,
        r
    }
    return PZ.keyframes.get(t)
}
,
PZ.keyframes.genericValueSet = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    if (void 0 === e)
        void 0 === a ? PZ.keyframes.add(r) : PZ.keyframes.delete(r);
    else
        switch (a = a || r[0],
        t) {
        case 0:
            a.value = e;
            break;
        default:
            a.tweenfn = e
        }
}
,
PZ.keyframes.genericDropDownSet = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    if (void 0 === e)
        void 0 === a ? PZ.keyframes.add(r, void 0, !0) : PZ.keyframes.delete(r);
    else
        switch (a = a || r[0],
        t) {
        case 0:
            a.value = e;
            break;
        default:
            a.tweenfn = e
        }
}
,
PZ.keyframes.genericColorGet = PZ.keyframes.genericValueGet,
PZ.keyframes.genericColorSet = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    void 0 === e ? void 0 === a ? PZ.keyframes.add(r) : PZ.keyframes.delete(r) : (a = a || r[0],
    void 0 === t ? a.value.setStyle(e) : a.tweenfn = e)
}
,
PZ.keyframes.genericVector2Get = PZ.keyframes.genericValueGet,
PZ.keyframes.genericVector3Get = PZ.keyframes.genericValueGet,
PZ.keyframes.genericVector2Set = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    if (void 0 === e)
        void 0 === a ? PZ.keyframes.add(r) : PZ.keyframes.delete(r);
    else
        switch (a = a || r[0],
        t) {
        case 0:
            a.value.x = e;
            break;
        case 1:
            a.value.y = e;
            break;
        default:
            a.tweenfn = e
        }
}
,
PZ.keyframes.genericVector3Set = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    if (void 0 === e)
        void 0 === a ? PZ.keyframes.add(r) : PZ.keyframes.delete(r);
    else
        switch (a = a || r[0],
        t) {
        case 0:
            a.value.x = e;
            break;
        case 1:
            a.value.y = e;
            break;
        case 2:
            a.value.z = e;
            break;
        default:
            a.tweenfn = e
        }
}
,
PZ.keyframes.genericRotationGet = function(e, t) {
    var r;
    return 1 === t.length ? (r = PZ.keyframes.clone(t[0])).tweenfn = -1 : void 0 !== (r = PZ.keyframes.get(t)) && (r = PZ.keyframes.clone(r)),
    void 0 !== r && (r.value = r.value / Math.PI * 180),
    r
}
,
PZ.keyframes.genericRotationSet = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    if (void 0 === e)
        void 0 === a ? PZ.keyframes.add(r) : PZ.keyframes.delete(r);
    else
        switch (a = a || r[0],
        t) {
        case 0:
            a.value = e * Math.PI / 180;
            break;
        default:
            a.tweenfn = e
        }
}
,
PZ.keyframes.genericRotation3Get = function(e, t) {
    var r;
    return 1 === t.length ? (r = PZ.keyframes.clone(t[0])).tweenfn = -1 : void 0 !== (r = PZ.keyframes.get(t)) && (r = PZ.keyframes.clone(r)),
    void 0 !== r && r.value.set(r.value.x / Math.PI * 180, r.value.y / Math.PI * 180, r.value.z / Math.PI * 180),
    r
}
,
PZ.keyframes.genericRotation3Set = function(e, t, r) {
    var a = PZ.keyframes.get(r);
    if (void 0 === e)
        void 0 === a ? PZ.keyframes.add(r) : PZ.keyframes.delete(r);
    else
        switch (a = a || r[0],
        t) {
        case 0:
            a.value.x = e * Math.PI / 180;
            break;
        case 1:
            a.value.y = e * Math.PI / 180;
            break;
        case 2:
            a.value.z = e * Math.PI / 180;
            break;
        default:
            a.tweenfn = e
        }
}
;
var TWEEN = TWEEN || {
    getValue: function(e, t) {
        for (var r, a, n = 0; n < e.length; n++) {
            if (e[n].frame === t)
                return "object" == typeof e[n].value ? e[n].value.clone() : e[n].value;
            if (e[n].frame < t)
                r = n;
            else if (e[n].frame > t) {
                void 0 === r ? r = n : a = n;
                break
            }
        }
        if (void 0 === a || null === TWEEN.EasingList[255 & e[a].tweenfn].fn)
            return "object" == typeof e[r].value ? e[r].value.clone() : e[r].value;
        var i = e[a].frame - e[r].frame
          , s = TWEEN.EasingList[255 & e[a].tweenfn].fn((t - e[r].frame) / i);
        if (e[a].tweenfn >> 8 == 1) {
            var o, l;
            return o = r ? r - 1 : 0,
            l = a < e.length - 1 ? a + 1 : a,
            TWEEN.Interpolation.Utils.CatmullRom(e[o].value, e[r].value, e[a].value, e[l].value, s)
        }
        return TWEEN.Interpolation.Utils.Linear(e[r].value, e[a].value, s)
    }
};
TWEEN.Easing = {
    Linear: {
        None: function(e) {
            return e
        }
    },
    Quadratic: {
        In: function(e) {
            return e * e
        },
        Out: function(e) {
            return e * (2 - e)
        },
        InOut: function(e) {
            return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
        }
    },
    Cubic: {
        In: function(e) {
            return e * e * e
        },
        Out: function(e) {
            return --e * e * e + 1
        },
        InOut: function(e) {
            return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
        }
    },
    Quartic: {
        In: function(e) {
            return e * e * e * e
        },
        Out: function(e) {
            return 1 - --e * e * e * e
        },
        InOut: function(e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
        }
    },
    Quintic: {
        In: function(e) {
            return e * e * e * e * e
        },
        Out: function(e) {
            return --e * e * e * e * e + 1
        },
        InOut: function(e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
        }
    },
    Sinusoidal: {
        In: function(e) {
            return 1 - Math.cos(e * Math.PI / 2)
        },
        Out: function(e) {
            return Math.sin(e * Math.PI / 2)
        },
        InOut: function(e) {
            return .5 * (1 - Math.cos(Math.PI * e))
        }
    },
    Exponential: {
        In: function(e) {
            return 0 === e ? 0 : Math.pow(1024, e - 1)
        },
        Out: function(e) {
            return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
        },
        InOut: function(e) {
            return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        }
    },
    Circular: {
        In: function(e) {
            return 1 - Math.sqrt(1 - e * e)
        },
        Out: function(e) {
            return Math.sqrt(1 - --e * e)
        },
        InOut: function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }
    },
    Elastic: {
        In: function(e) {
            var t, r = .1;
            return 0 === e ? 0 : 1 === e ? 1 : (!r || r < 1 ? (r = 1,
            t = .1) : t = .4 * Math.asin(1 / r) / (2 * Math.PI),
            -r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / .4))
        },
        Out: function(e) {
            var t, r = .1;
            return 0 === e ? 0 : 1 === e ? 1 : (!r || r < 1 ? (r = 1,
            t = .1) : t = .4 * Math.asin(1 / r) / (2 * Math.PI),
            r * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / .4) + 1)
        },
        InOut: function(e) {
            var t, r = .1;
            return 0 === e ? 0 : 1 === e ? 1 : (!r || r < 1 ? (r = 1,
            t = .1) : t = .4 * Math.asin(1 / r) / (2 * Math.PI),
            (e *= 2) < 1 ? r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / .4) * -.5 : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / .4) * .5 + 1)
        }
    },
    Back: {
        In: function(e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        },
        Out: function(e) {
            var t = 1.70158;
            return --e * e * ((t + 1) * e + t) + 1
        },
        InOut: function(e) {
            var t = 2.5949095;
            return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * .5 : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
        }
    },
    Bounce: {
        In: function(e) {
            return 1 - TWEEN.Easing.Bounce.Out(1 - e)
        },
        Out: function(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        },
        InOut: function(e) {
            return e < .5 ? .5 * TWEEN.Easing.Bounce.In(2 * e) : .5 * TWEEN.Easing.Bounce.Out(2 * e - 1) + .5
        }
    }
},
TWEEN.EasingList = [{
    name: "none",
    fn: null
}, {
    name: "linear",
    fn: TWEEN.Easing.Linear.None
}, {
    name: "quadratic in",
    fn: TWEEN.Easing.Quadratic.In
}, {
    name: "quadratic out",
    fn: TWEEN.Easing.Quadratic.Out
}, {
    name: "quadratic in-out",
    fn: TWEEN.Easing.Quadratic.InOut
}, {
    name: "cubic in",
    fn: TWEEN.Easing.Cubic.In
}, {
    name: "cubic out",
    fn: TWEEN.Easing.Cubic.Out
}, {
    name: "cubic in-out",
    fn: TWEEN.Easing.Cubic.InOut
}, {
    name: "quartic in",
    fn: TWEEN.Easing.Quartic.In
}, {
    name: "quartic out",
    fn: TWEEN.Easing.Quartic.Out
}, {
    name: "quartic in-out",
    fn: TWEEN.Easing.Quartic.InOut
}, {
    name: "quintic in",
    fn: TWEEN.Easing.Quintic.In
}, {
    name: "quintic out",
    fn: TWEEN.Easing.Quintic.Out
}, {
    name: "quintic in-out",
    fn: TWEEN.Easing.Quintic.InOut
}, {
    name: "sinusoidal in",
    fn: TWEEN.Easing.Sinusoidal.In
}, {
    name: "sinusoidal out",
    fn: TWEEN.Easing.Sinusoidal.Out
}, {
    name: "sinusoidal in-out",
    fn: TWEEN.Easing.Sinusoidal.InOut
}, {
    name: "exponential in",
    fn: TWEEN.Easing.Exponential.In
}, {
    name: "exponential out",
    fn: TWEEN.Easing.Exponential.Out
}, {
    name: "exponential in-out",
    fn: TWEEN.Easing.Exponential.InOut
}, {
    name: "circular in",
    fn: TWEEN.Easing.Circular.In
}, {
    name: "circular out",
    fn: TWEEN.Easing.Circular.Out
}, {
    name: "circular in-out",
    fn: TWEEN.Easing.Circular.InOut
}, {
    name: "elastic in",
    fn: TWEEN.Easing.Elastic.In
}, {
    name: "elastic out",
    fn: TWEEN.Easing.Elastic.Out
}, {
    name: "elastic in-out",
    fn: TWEEN.Easing.Elastic.InOut
}, {
    name: "back in",
    fn: TWEEN.Easing.Back.In
}, {
    name: "back out",
    fn: TWEEN.Easing.Back.Out
}, {
    name: "back in-out",
    fn: TWEEN.Easing.Back.InOut
}, {
    name: "bounce in",
    fn: TWEEN.Easing.Bounce.In
}, {
    name: "bounce out",
    fn: TWEEN.Easing.Bounce.Out
}, {
    name: "bounce in-out",
    fn: TWEEN.Easing.Bounce.InOut
}],
TWEEN.Interpolation = {
    Utils: {
        Linear: function(e, t, r) {
            return "object" == typeof e ? e.clone().lerp(t, r) : (t - e) * r + e
        },
        CatmullRom: function(e, t, r, a, n) {
            var i = n * n
              , s = n * i;
            if ("object" == typeof e) {
                for (var o = new e.constructor, l = Object.keys(e), c = 0; c < l.length; c++) {
                    var p = l[c]
                      , h = .5 * (r[p] - e[p])
                      , u = .5 * (a[p] - t[p]);
                    o[p] = (2 * t[p] - 2 * r[p] + h + u) * s + (-3 * t[p] + 3 * r[p] - 2 * h - u) * i + h * n + t[p]
                }
                return o
            }
            return (2 * t - 2 * r + (h = .5 * (r - e)) + (u = .5 * (a - t))) * s + (-3 * t + 3 * r - 2 * h - u) * i + h * n + t
        }
    }
},
PZ.archive = {
    files: [],
    worker: null
},
PZ.archive.tar = function(e) {
    var t = ["-cvzf", "output/out", "pz"];
    this.callWorker(!1, t, e)
}
,
PZ.archive.untar = function(e, t) {
    var r = ["-xvzf", "/blob/" + (e.name || "blob.pz"), "-C", "/"];
    this.callWorker(e, r, t)
}
,
PZ.archive.callWorker = function(e, t, r) {
    this.worker = new Worker("bsdtar/worker4.js"),
    this.worker.onerror = function(e) {
        PZ.archive.worker.terminate(),
        PZ.archive.worker = null,
        r()
    }
    ,
    this.worker.onmessage = function(a) {
        var n = a.data;
        if ("ready" === n.type)
            PZ.archive.worker.postMessage({
                type: "command",
                arguments: t,
                files: PZ.archive.files,
                wfiles: e ? [e] : [],
                useDevFile: !1 === e,
                inputDirectory: e ? "input" : "pz",
                outputDirectory: e ? "pz" : "output"
            });
        else if ("stdout" === n.type)
            ;
        else if ("done" === n.type)
            if (PZ.archive.worker.terminate(),
            PZ.archive.worker = null,
            !1 !== e)
                PZ.archive.files = n.data,
                r();
            else {
                var i;
                n.file ? i = n.file : n.data.length > 0 && (i = n.data[0].data) && (i = new Blob([i],{
                    type: "application/octet-stream"
                })),
                r(i)
            }
    }
}
,
PZ.archive.fileExists = function(e) {
    for (var t = 0; t < this.files.length; t++)
        if (this.files[t].name === e)
            return !0;
    return !1
}
,
PZ.archive.getFile = function(e) {
    for (var t = 0; t < this.files.length; t++)
        if (this.files[t].name === e)
            return this.files.splice(t, 1)[0]
}
,
PZ.archive.getFileBlob = function(e, t) {
    var r = this.getFile(e);
    if (void 0 !== r)
        return void 0 === t && (t = {
            type: ""
        }),
        new Blob([r.data],t)
}
,
PZ.archive.getFileString = function(e) {
    var t = this.getFile(e);
    if (void 0 !== t) {
        for (var r = new Uint8Array(t.data), a = "", n = 0, i = r.length; n < i; n++)
            a += String.fromCharCode(r[n]);
        return a
    }
}
,
PZ.archive.getFileStringUTF8 = function(e) {
    var t = this.getFile(e);
    if (void 0 !== t) {
        var r, a, n, i, s, o, l = new Uint8Array(t.data);
        for (r = "",
        n = l.length,
        a = 0; a < n; )
            switch ((i = l[a++]) >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                r += String.fromCharCode(i);
                break;
            case 12:
            case 13:
                s = l[a++],
                r += String.fromCharCode((31 & i) << 6 | 63 & s);
                break;
            case 14:
                s = l[a++],
                o = l[a++],
                r += String.fromCharCode((15 & i) << 12 | (63 & s) << 6 | (63 & o) << 0)
            }
        return r
    }
}
,
PZ.archive.addFile = function(e, t) {
    this.files.push({
        name: e,
        data: t
    })
}
,
PZ.archive.addFileString = function(e, t) {
    for (var r = [], a = 0; a < t.length; a++) {
        var n = t.charCodeAt(a);
        n < 128 ? r.push(n) : n < 2048 ? r.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || n >= 57344 ? r.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (a++,
        n = 65536 + ((1023 & n) << 10 | 1023 & t.charCodeAt(a)),
        r.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
    }
    var i = Uint8Array.from(r);
    this.addFile(e, i)
}
,
PZ.widget3d = {
    keyObject: null,
    threeObj: null,
    property: null,
    mode: "position",
    controls: null
},
PZ.widget3d.init = function() {
    this.controls = new THREE.TransformControls(CM.camera,CM.renderCanv),
    this.controls.traverse(function(e) {
        e.layers.set(1),
        e.material && (e.material.fog = !1)
    }),
    this.controls.setSpace("world"),
    CM.scene.add(this.controls);
    var e = this;
    $(document).keydown(function(t) {
        var r = t.target
          , a = t.target.tagName;
        if ("INPUT" !== a && "SELECT" !== a && "TEXTAREA" !== a && !r.isContentEditable) {
            if (49 === t.which || 97 === t.which)
                e.mode = "position",
                e.controls.setMode("translate");
            else if (50 === t.which || 98 === t.which)
                e.mode = "rotation",
                e.controls.setMode("rotate");
            else if (51 === t.which || 99 === t.which)
                e.mode = "scale",
                e.controls.setMode("scale");
            else {
                if (52 !== t.which && 100 !== t.which)
                    return;
                e.mode = ""
            }
            e.update()
        }
    }),
    this.controls.addEventListener("objectChange", this.change.bind(this)),
    this.controls.addEventListener("mouseDown", function() {
        CM.controls.enabled = !1
    }),
    this.controls.addEventListener("mouseUp", function() {
        CM.controls.enabled = !0,
        $("#controls div:visible .proprow[kf='1']").each(function() {
            $(this).triggerHandler("update")
        })
    })
}
,
PZ.widget3d.change = function(e) {
    this.property && ("position" === this.mode ? this.property.value.copy(this.controls.object.position) : "rotation" === this.mode ? this.property.value.copy(this.controls.object.rotation) : this.property.value.copy(this.controls.object.scale))
}
,
PZ.widget3d.update = function() {
    this.controls.detach(),
    null !== this.threeObj && "" !== this.mode && !0 !== CM.enablePlayFrames && !0 !== CM.renderMode && this.controls.attach(this.threeObj)
}
,
PZ.widget3d.updateFrame = function(e) {
    null !== this.threeObj && "" !== this.mode && !0 !== CM.enablePlayFrames && (void 0 === this.keyObject[this.mode] ? this.property = void 0 : this.property = PZ.keyframes.get2(this.keyObject[this.mode], e),
    void 0 !== this.property ? this.controls.attach(this.threeObj) : this.controls.detach())
}
,
PZ.av = {
    hasThreads: !1,
    sharedHeap: null,
    syncBuffer: null,
    syncArray: null,
    currentFrame: 0,
    audioBuffer: null,
    bufferStartSample: 0,
    currentSample: 0,
    totalFrames: 0,
    totalSamples: 0,
    worker: null,
    timerStart: 0,
    timeLoading: 0,
    timeRendering: 0,
    timeTotal: 0
},
PZ.av.decode = function(e, t) {
    var r = new Worker("av/worker6.js");
    r.onerror = function(e) {
        r.terminate(),
        t()
    }
    ,
    r.onmessage = function(a) {
        var n = a.data;
        if ("ready" === n.type)
            [].push(),
            this.postMessage({
                type: "command",
                options: {
                    decode: !0
                },
                files: [{
                    name: "input",
                    data: e
                }]
            }, [e]);
        else if ("stdout" === n.type)
            ;
        else if ("done" === n.type) {
            r.terminate();
            var i, s;
            n.data.length > 0 && (i = n.data[0].data,
            s = n.data[1].data),
            t(i, s)
        }
    }
}
,
PZ.av.encode = function(e, t, r, a) {
    function n(e, t, r) {
        if (PZ.av.timeRendering += performance.now() - PZ.av.timerStart,
        e) {
            r = Math.min(PZ.av.totalSamples - PZ.av.currentSample, t.num);
            var a = [];
            PZ.av.hasThreads ? (a[0] = new Float32Array(PZ.av.sharedHeap,t.xfer_ptrs[0],r),
            a[1] = new Float32Array(PZ.av.sharedHeap,t.xfer_ptrs[1],r)) : (a[0] = new Float32Array(t.xfer_buffer,t.xfer_ptrs[0],r),
            a[1] = new Float32Array(t.xfer_buffer,t.xfer_ptrs[1],r));
            for (var n = 0; n < 2; n++)
                PZ.av.audioBuffer.copyFromChannel(a[n], n, PZ.av.currentSample - PZ.av.bufferStartSample);
            PZ.av.currentSample += r
        }
        if (PZ.av.hasThreads)
            return PZ.av.syncArray[0] = r,
            void Atomics.wake(PZ.av.syncArray, 0, 1);
        PZ.av.worker.postMessage({
            type: "callback",
            ret: r,
            xfer_buffer: t.xfer_buffer
        }, [t.xfer_buffer])
    }
    console.log("Video: " + e.frameWidth + "x" + e.frameHeight + " " + e.frameRate + "fps " + e.videoBitrate + "b/s"),
    console.log("Encoder: cpu_used: " + e.cpu_used + " deadline: " + e.deadline + " lag_in_frames: " + e.lag_in_frames),
    PZ.av.timeTotal = performance.now();
    var i = e.frameWidth * e.frameHeight * 4;
    PZ.av.hasThreads && (PZ.av.syncBuffer = new SharedArrayBuffer(4),
    PZ.av.syncArray = new Int32Array(PZ.av.syncBuffer,0,1)),
    PZ.av.totalFrames = e.totalFrames,
    PZ.av.currentFrame = 0,
    PZ.av.startFrame = e.startFrame,
    PZ.av.totalSamples = Math.floor(e.totalFrames / e.frameRate * 48e3),
    PZ.av.currentSample = 0,
    PZ.av.audioBuffer = null,
    PZ.av.bufferStartSample = 0,
    PZ.av.timeLoading = performance.now(),
    PZ.av.worker = new Worker("av/worker6.js"),
    PZ.av.worker.onerror = function(e) {
        a(),
        PZ.av.stop()
    }
    ,
    PZ.av.worker.onmessage = function(s) {
        var o = s.data;
        if ("video" === o.type) {
            if (PZ.av.timerStart = performance.now(),
            PZ.av.currentFrame >= PZ.av.totalFrames)
                return void n(!1, o, 0);
            var l = PZ.av.currentFrame + PZ.av.startFrame;
            if (PZ.av.hasThreads) {
                c = new Uint8Array(PZ.av.sharedHeap,o.xfer_ptrs[0],i);
                t(c, l, n.bind(this, !1, null, 1))
            } else {
                var c = new Uint8Array(o.xfer_buffer,o.xfer_ptrs[0],i);
                t(c, l, n.bind(this, !1, o, 1))
            }
            PZ.av.currentFrame += 1
        } else if ("audio" === o.type) {
            if (PZ.av.timerStart = performance.now(),
            PZ.av.currentSample >= PZ.av.totalSamples)
                return void n(!1, o, 0);
            if (null === PZ.av.audioBuffer || PZ.av.bufferStartSample + PZ.av.audioBuffer.length <= PZ.av.currentSample) {
                function p(e) {
                    PZ.av.audioBuffer = e,
                    PZ.av.bufferStartSample = PZ.av.currentSample,
                    n(!0, o)
                }
                r(PZ.av.currentSample, o.num, p)
            } else
                n(!0, o)
        } else if ("read" === o.type)
            PZ.av.readOutput(o);
        else if ("write" === o.type)
            PZ.av.writeOutput(o);
        else if ("buffer" === o.type)
            PZ.av.sharedHeap = o.buffer;
        else if ("remux" === o.type) {
            var h;
            o.data.length > 0 && (h = o.data[0].data),
            PZ.av.remuxCallback(h, o.offset)
        } else if ("ready" === o.type)
            PZ.av.timeLoading = performance.now() - PZ.av.timeLoading,
            PZ.av.hasThreads ? this.postMessage({
                type: "command",
                syncBuffer: PZ.av.syncBuffer,
                options: e
            }, [PZ.av.syncBuffer]) : this.postMessage({
                type: "command",
                options: e
            });
        else if ("stdout" === o.type)
            ;
        else if ("done" === o.type) {
            PZ.av.stop();
            var u;
            o.file ? (u = o.file,
            console.log("Output size: " + u.size / 1024 / 1024 + " MB")) : o.data.length > 0 && (u = o.data[0].data,
            1 === e.haveVideo && u && (console.log("Output size: " + u.byteLength / 1024 / 1024 + " MB"),
            u = new Blob([u],{
                type: "video/webm"
            }))),
            a(u)
        }
    }
}
,
PZ.av.remux = function(e, t) {
    PZ.av.remuxCallback = t,
    PZ.av.worker.postMessage({
        type: "remux",
        options: e
    })
}
,
PZ.av.stop = function() {
    PZ.av.timeTotal = performance.now() - this.timeTotal,
    console.log("Time loading: " + this.timeLoading),
    console.log("Time rendering: " + this.timeRendering),
    console.log("Time total: " + this.timeTotal),
    null !== this.worker && (this.worker.terminate(),
    this.worker.onmessage = null,
    this.worker.onerror = null,
    this.worker = null),
    this.audioBuffer = null,
    this.sharedHeap = null,
    this.syncBuffer = null,
    this.syncArray = null
}
,
PZ.av.getProgress = function() {
    return null === this.worker ? 0 : (this.currentFrame - 1) / this.totalFrames * 100
}
,
PZ.av.getTimeRemaining = function() {
    var e = this.currentFrame - 1
      , t = "calculating...";
    if (e > 1) {
        var r = (performance.now() - this.timeTotal) / 1e3 / e
          , a = (this.totalFrames - e) * r;
        t = "";
        var n = Math.floor(a / 60 / 60)
          , i = Math.floor(a / 60) % 60
          , s = Math.floor(a) % 60;
        t += n > 0 ? n + " hour" + (n > 1 ? "s" : "") : i > 0 ? i + " minute" + (i > 1 ? "s" : "") : s > 5 ? s + " seconds" : "a few seconds"
    }
    return t
}
,
PZ.av.readOutput = function(e) {
    var t = new Uint8Array(PZ.av.sharedHeap,e.offset,e.length);
    PZ.file.read(t, e.position, function() {
        PZ.av.syncArray[0] = e.length,
        Atomics.wake(PZ.av.syncArray, 0, 1)
    })
}
,
PZ.av.writeOutput = function(e) {
    var t = new Uint8Array(PZ.av.sharedHeap,e.offset,e.length);
    PZ.file.write(t, e.position, function() {
        PZ.av.syncArray[0] = e.length,
        Atomics.wake(PZ.av.syncArray, 0, 1)
    })
}
,
PZ.file = {},
PZ.file.getQuota = function(e, t) {
    void 0 === t && (t = 104857600);
    try {
        navigator.webkitPersistentStorage.requestQuota(t, function(t) {
            e()
        }, function(t) {
            e()
        })
    } catch (t) {
        e()
    }
}
,
PZ.file.cleanUp = function() {
    try {
        webkitRequestFileSystem(PERSISTENT, 0, function(e) {
            e.root.getFile("out", null, function(e) {
                e.remove(function() {})
            })
        })
    } catch (e) {}
}
,
PZ.file.start = function(e) {
    window.webkitRequestFileSystem ? (PZ.file.fileWriter_init(e),
    PZ.file.read = PZ.file.fileWriter_read,
    PZ.file.write = PZ.file.fileWriter_write) : window.IDBMutableFile && (PZ.file.mutableFile_init(e),
    PZ.file.read = PZ.file.mutableFile_read,
    PZ.file.write = PZ.file.mutableFile_write)
}
,
PZ.file.write = null,
PZ.file.finish = function() {
    this.fileEntry && this.fileEntry.remove(function() {}, function() {})
}
,
PZ.file.fileWriter_init = function(e) {
    webkitRequestFileSystem(TEMPORARY, 1073741824, function(t) {
        t.root.getFile("video.mp4", {
            create: !0
        }, function(t) {
            PZ.file.fileEntry = t,
            e()
        }, function(e) {})
    }, function(e) {})
}
,
PZ.file.fileWriter_read = function(e, t, r) {
    this.fileEntry.file(function(a) {
        var n = new FileReader;
        n.onload = function(t) {
            e.set(new Uint8Array(t.target.result)),
            r()
        }
        ,
        n.readAsArrayBuffer(a.slice(t, t + e.length))
    })
}
,
PZ.file.fileWriter_write = function(e, t, r) {
    this.fileEntry.createWriter(function(a) {
        a.seek(t),
        a.onwriteend = function(e) {
            r()
        }
        ;
        var n = new Blob([e]);
        a.write(n)
    })
}
,
PZ.file.mutableFile_init = function(e) {
    indexedDB.open("renderstorage").onsuccess = function() {
        this.result.mozCreateFileHandle("video.mp4", "video/mp4").onsuccess = function() {
            PZ.file.fileHandle = this.result,
            e()
        }
    }
}
,
PZ.file.mutableFile_read = function(e, t, r) {
    var a = this.fileHandle.open("readonly");
    a.location = t,
    a.readAsArrayBuffer(e.length).onsuccess = function() {
        e.set(new Uint8Array(this.result)),
        r()
    }
}
,
PZ.file.mutableFile_write = function(e, t, r) {
    var a = this.fileHandle.open("readwrite")
      , n = new ArrayBuffer(e.length);
    new Uint8Array(n).set(e),
    a.location = t,
    a.write(n).onsuccess = function() {
        r()
    }
}
,
PZ.file.blob_init = function() {}
,
PZ.file.blob_read = function(e, t, r) {}
,
PZ.file.blob_write = function(e, t, r) {}
,
PZ.textures = {
    list: []
},
PZ.textures.checkMagic = function(e) {
    for (var t = new Uint8Array(e,0,6), r = "", a = 0, n = t.length; a < n; a++)
        r += String.fromCharCode(t[a]);
    return "MaGiC0" === r
}
,
PZ.textures.getHashString = function(e) {
    for (var t = new Uint8Array(e,6), r = "", a = 0, n = t.length; a < n; a++)
        r += String.fromCharCode(t[a]);
    return r
}
,
PZ.textures.find = function(e) {
    for (var t = 0; t < this.list.length; t++)
        if (this.list[t].hash === e)
            return this.list[t]
}
,
PZ.textures.hashAndAdd = function(e, t) {
    crypto.subtle.digest("SHA-256", new Uint8Array(e)).then(function(r) {
        for (var a = [], n = new Uint32Array(r), i = 0; i < n.length; i++) {
            var s = ("00000000" + n[i].toString(16)).slice(-8);
            a.push(s)
        }
        var o = a.join("")
          , l = new Blob([e]);
        PZ.textures.add(l, o, t)
    })
}
,
PZ.textures.add = function(e, t, r) {
    var a = this.find(t);
    if (a)
        return a.ref++,
        void r(a.image);
    var n = URL.createObjectURL(e)
      , i = new Image;
    PZ.textures.list.push({
        hash: t,
        image: i,
        url: n,
        ref: 1
    }),
    i.onload = function(e) {
        r(i)
    }
    ,
    i.src = n
}
,
PZ.textures.clone = function(e) {
    for (var t = 0; t < this.list.length; t++) {
        var r = this.list[t];
        if (r.image === e)
            return r.ref++,
            e
    }
}
,
PZ.textures.load = function(e, t) {
    if ("string" == typeof e)
        if (e.startsWith("data:image/")) {
            var r = e.indexOf(";base64,") + ";base64,".length;
            e = window.atob(e.substring(r));
            for (var a = new Uint8Array(new ArrayBuffer(e.length)), n = 0; n < a.length; n++)
                a[n] = e.charCodeAt(n);
            this.hashAndAdd(a.buffer, t)
        } else {
            if (void 0 === (e = PZ.archive.getFile(e)))
                return;
            if (!0 === this.checkMagic(e.data)) {
                var i = this.getHashString(e.data)
                  , s = PZ.archive.getFileBlob(i);
                this.add(s, i, t)
            } else
                this.hashAndAdd(e.data, t)
        }
    else {
        var o = new FileReader
          , l = this;
        o.onload = function(e) {
            l.hashAndAdd(e.target.result, t)
        }
        ,
        o.readAsArrayBuffer(e)
    }
}
,
PZ.textures.unload = function(e) {
    for (var t = 0; t < this.list.length; t++) {
        var r = this.list[t];
        r.image === e && --r.ref <= 0 && (URL.revokeObjectURL(r.url),
        this.list.splice(t, 1))
    }
}
,
PZ.textures.save = function(e, t, r, a) {
    for (var n = 0; n < this.list.length; n++) {
        var i = this.list[n];
        if (i.image === e) {
            if (PZ.archive.addFileString(t, "MaGiC0" + i.hash),
            !1 === PZ.archive.fileExists(i.hash)) {
                PZ.archive.addFile(i.hash, null);
                var s = PZ.archive.files[PZ.archive.files.length - 1];
                PZ.imageToArray(i.image, function(e) {
                    s.data = new Uint8Array(e),
                    r()
                }, a)
            } else
                r();
            return
        }
    }
    r()
}
,
function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).opentype = e()
    }
}(function() {
    return function e(t, r, a) {
        function n(s, o) {
            if (!r[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!o && l)
                        return l(s, !0);
                    if (i)
                        return i(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND",
                    c
                }
                var p = r[s] = {
                    exports: {}
                };
                t[s][0].call(p.exports, function(e) {
                    var r = t[s][1][e];
                    return n(r || e)
                }, p, p.exports, e, t, r, a)
            }
            return r[s].exports
        }
        for (var i = "function" == typeof require && require, s = 0; s < a.length; s++)
            n(a[s]);
        return n
    }({
        1: [function(e, t, r) {
            function a() {
                this.table = new Uint16Array(16),
                this.trans = new Uint16Array(288)
            }
            function n(e, t) {
                this.source = e,
                this.sourceIndex = 0,
                this.tag = 0,
                this.bitcount = 0,
                this.dest = t,
                this.destLen = 0,
                this.ltree = new a,
                this.dtree = new a
            }
            function i(e, t, r, a) {
                var n, i;
                for (n = 0; n < r; ++n)
                    e[n] = 0;
                for (n = 0; n < 30 - r; ++n)
                    e[n + r] = n / r | 0;
                for (i = a,
                n = 0; n < 30; ++n)
                    t[n] = i,
                    i += 1 << e[n]
            }
            function s(e, t, r, a) {
                var n, i;
                for (n = 0; n < 16; ++n)
                    e.table[n] = 0;
                for (n = 0; n < a; ++n)
                    e.table[t[r + n]]++;
                for (e.table[0] = 0,
                i = 0,
                n = 0; n < 16; ++n)
                    C[n] = i,
                    i += e.table[n];
                for (n = 0; n < a; ++n)
                    t[r + n] && (e.trans[C[t[r + n]]++] = n)
            }
            function o(e) {
                e.bitcount-- || (e.tag = e.source[e.sourceIndex++],
                e.bitcount = 7);
                var t = 1 & e.tag;
                return e.tag >>>= 1,
                t
            }
            function l(e, t, r) {
                if (!t)
                    return r;
                for (; e.bitcount < 24; )
                    e.tag |= e.source[e.sourceIndex++] << e.bitcount,
                    e.bitcount += 8;
                var a = e.tag & 65535 >>> 16 - t;
                return e.tag >>>= t,
                e.bitcount -= t,
                a + r
            }
            function c(e, t) {
                for (; e.bitcount < 24; )
                    e.tag |= e.source[e.sourceIndex++] << e.bitcount,
                    e.bitcount += 8;
                var r = 0
                  , a = 0
                  , n = 0
                  , i = e.tag;
                do {
                    a = 2 * a + (1 & i),
                    i >>>= 1,
                    ++n,
                    r += t.table[n],
                    a -= t.table[n]
                } while (a >= 0);
                return e.tag = i,
                e.bitcount -= n,
                t.trans[r + a]
            }
            function p(e, t, r) {
                var a, n, i, o, p, h;
                for (a = l(e, 5, 257),
                n = l(e, 5, 1),
                i = l(e, 4, 4),
                o = 0; o < 19; ++o)
                    M[o] = 0;
                for (o = 0; o < i; ++o) {
                    var u = l(e, 3, 0);
                    M[x[o]] = u
                }
                for (s(w, M, 0, 19),
                p = 0; p < a + n; ) {
                    var d = c(e, w);
                    switch (d) {
                    case 16:
                        var f = M[p - 1];
                        for (h = l(e, 2, 3); h; --h)
                            M[p++] = f;
                        break;
                    case 17:
                        for (h = l(e, 3, 3); h; --h)
                            M[p++] = 0;
                        break;
                    case 18:
                        for (h = l(e, 7, 11); h; --h)
                            M[p++] = 0;
                        break;
                    default:
                        M[p++] = d
                    }
                }
                s(t, M, 0, a),
                s(r, M, a, n)
            }
            function h(e, t, r) {
                for (; ; ) {
                    var a = c(e, t);
                    if (256 === a)
                        return d;
                    if (a < 256)
                        e.dest[e.destLen++] = a;
                    else {
                        var n, i, s, o;
                        for (n = l(e, v[a -= 257], y[a]),
                        i = c(e, r),
                        o = s = e.destLen - l(e, b[i], P[i]); o < s + n; ++o)
                            e.dest[e.destLen++] = e.dest[o]
                    }
                }
            }
            function u(e) {
                for (var t, r, a; e.bitcount > 8; )
                    e.sourceIndex--,
                    e.bitcount -= 8;
                if (t = e.source[e.sourceIndex + 1],
                t = 256 * t + e.source[e.sourceIndex],
                r = e.source[e.sourceIndex + 3],
                r = 256 * r + e.source[e.sourceIndex + 2],
                t !== (65535 & ~r))
                    return f;
                for (e.sourceIndex += 4,
                a = t; a; --a)
                    e.dest[e.destLen++] = e.source[e.sourceIndex++];
                return e.bitcount = 0,
                d
            }
            var d = 0
              , f = -3
              , m = new a
              , g = new a
              , v = new Uint8Array(30)
              , y = new Uint16Array(30)
              , b = new Uint8Array(30)
              , P = new Uint16Array(30)
              , x = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
              , w = new a
              , M = new Uint8Array(320)
              , C = new Uint16Array(16);
            !function(e, t) {
                var r;
                for (r = 0; r < 7; ++r)
                    e.table[r] = 0;
                for (e.table[7] = 24,
                e.table[8] = 152,
                e.table[9] = 112,
                r = 0; r < 24; ++r)
                    e.trans[r] = 256 + r;
                for (r = 0; r < 144; ++r)
                    e.trans[24 + r] = r;
                for (r = 0; r < 8; ++r)
                    e.trans[168 + r] = 280 + r;
                for (r = 0; r < 112; ++r)
                    e.trans[176 + r] = 144 + r;
                for (r = 0; r < 5; ++r)
                    t.table[r] = 0;
                for (t.table[5] = 32,
                r = 0; r < 32; ++r)
                    t.trans[r] = r
            }(m, g),
            i(v, y, 4, 3),
            i(b, P, 2, 1),
            v[28] = 0,
            y[28] = 258,
            t.exports = function(e, t) {
                var r, a, i = new n(e,t);
                do {
                    switch (r = o(i),
                    l(i, 2, 0)) {
                    case 0:
                        a = u(i);
                        break;
                    case 1:
                        a = h(i, m, g);
                        break;
                    case 2:
                        p(i, i.ltree, i.dtree),
                        a = h(i, i.ltree, i.dtree);
                        break;
                    default:
                        a = f
                    }
                    if (a !== d)
                        throw new Error("Data error")
                } while (!r);
                return i.destLen < i.dest.length ? "function" == typeof i.dest.slice ? i.dest.slice(0, i.destLen) : i.dest.subarray(0, i.destLen) : i.dest
            }
        }
        , {}],
        2: [function(e, t, r) {
            function a(e, t, r, a, n) {
                return Math.pow(1 - n, 3) * e + 3 * Math.pow(1 - n, 2) * n * t + 3 * (1 - n) * Math.pow(n, 2) * r + Math.pow(n, 3) * a
            }
            function n() {
                this.x1 = Number.NaN,
                this.y1 = Number.NaN,
                this.x2 = Number.NaN,
                this.y2 = Number.NaN
            }
            n.prototype.isEmpty = function() {
                return isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2)
            }
            ,
            n.prototype.addPoint = function(e, t) {
                "number" == typeof e && ((isNaN(this.x1) || isNaN(this.x2)) && (this.x1 = e,
                this.x2 = e),
                e < this.x1 && (this.x1 = e),
                e > this.x2 && (this.x2 = e)),
                "number" == typeof t && ((isNaN(this.y1) || isNaN(this.y2)) && (this.y1 = t,
                this.y2 = t),
                t < this.y1 && (this.y1 = t),
                t > this.y2 && (this.y2 = t))
            }
            ,
            n.prototype.addX = function(e) {
                this.addPoint(e, null)
            }
            ,
            n.prototype.addY = function(e) {
                this.addPoint(null, e)
            }
            ,
            n.prototype.addBezier = function(e, t, r, n, i, s, o, l) {
                var c = [e, t]
                  , p = [r, n]
                  , h = [i, s]
                  , u = [o, l];
                this.addPoint(e, t),
                this.addPoint(o, l);
                for (var d = 0; d <= 1; d++) {
                    var f = 6 * c[d] - 12 * p[d] + 6 * h[d]
                      , m = -3 * c[d] + 9 * p[d] - 9 * h[d] + 3 * u[d]
                      , g = 3 * p[d] - 3 * c[d];
                    if (0 !== m) {
                        var v = Math.pow(f, 2) - 4 * g * m;
                        if (!(v < 0)) {
                            var y = (-f + Math.sqrt(v)) / (2 * m);
                            0 < y && y < 1 && (0 === d && this.addX(a(c[d], p[d], h[d], u[d], y)),
                            1 === d && this.addY(a(c[d], p[d], h[d], u[d], y)));
                            var b = (-f - Math.sqrt(v)) / (2 * m);
                            0 < b && b < 1 && (0 === d && this.addX(a(c[d], p[d], h[d], u[d], b)),
                            1 === d && this.addY(a(c[d], p[d], h[d], u[d], b)))
                        }
                    } else {
                        if (0 === f)
                            continue;
                        var P = -g / f;
                        0 < P && P < 1 && (0 === d && this.addX(a(c[d], p[d], h[d], u[d], P)),
                        1 === d && this.addY(a(c[d], p[d], h[d], u[d], P)))
                    }
                }
            }
            ,
            n.prototype.addQuad = function(e, t, r, a, n, i) {
                var s = e + 2 / 3 * (r - e)
                  , o = t + 2 / 3 * (a - t)
                  , l = s + 1 / 3 * (n - e)
                  , c = o + 1 / 3 * (i - t);
                this.addBezier(e, t, s, o, l, c, n, i)
            }
            ,
            r.BoundingBox = n
        }
        , {}],
        3: [function(e, t, r) {
            r.fail = function(e) {
                throw new Error(e)
            }
            ,
            r.argument = function(e, t) {
                e || r.fail(t)
            }
            ,
            r.assert = r.argument
        }
        , {}],
        4: [function(e, t, r) {
            r.line = function(e, t, r, a, n) {
                e.beginPath(),
                e.moveTo(t, r),
                e.lineTo(a, n),
                e.stroke()
            }
        }
        , {}],
        5: [function(e, t, r) {
            function a(e) {
                this.font = e
            }
            function n(e) {
                this.cmap = e
            }
            function i(e, t) {
                this.encoding = e,
                this.charset = t
            }
            function s(e) {
                var t;
                switch (e.version) {
                case 1:
                    this.names = r.standardNames.slice();
                    break;
                case 2:
                    for (this.names = new Array(e.numberOfGlyphs),
                    t = 0; t < e.numberOfGlyphs; t++)
                        e.glyphNameIndex[t] < r.standardNames.length ? this.names[t] = r.standardNames[e.glyphNameIndex[t]] : this.names[t] = e.names[e.glyphNameIndex[t] - r.standardNames.length];
                    break;
                case 2.5:
                    for (this.names = new Array(e.numberOfGlyphs),
                    t = 0; t < e.numberOfGlyphs; t++)
                        this.names[t] = r.standardNames[t + e.glyphNameIndex[t]];
                    break;
                case 3:
                    this.names = []
                }
            }
            var o = [".notdef", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "endash", "dagger", "daggerdbl", "periodcentered", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "questiondown", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "emdash", "AE", "ordfeminine", "Lslash", "Oslash", "OE", "ordmasculine", "ae", "dotlessi", "lslash", "oslash", "oe", "germandbls", "onesuperior", "logicalnot", "mu", "trademark", "Eth", "onehalf", "plusminus", "Thorn", "onequarter", "divide", "brokenbar", "degree", "thorn", "threequarters", "twosuperior", "registered", "minus", "eth", "multiply", "threesuperior", "copyright", "Aacute", "Acircumflex", "Adieresis", "Agrave", "Aring", "Atilde", "Ccedilla", "Eacute", "Ecircumflex", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Ntilde", "Oacute", "Ocircumflex", "Odieresis", "Ograve", "Otilde", "Scaron", "Uacute", "Ucircumflex", "Udieresis", "Ugrave", "Yacute", "Ydieresis", "Zcaron", "aacute", "acircumflex", "adieresis", "agrave", "aring", "atilde", "ccedilla", "eacute", "ecircumflex", "edieresis", "egrave", "iacute", "icircumflex", "idieresis", "igrave", "ntilde", "oacute", "ocircumflex", "odieresis", "ograve", "otilde", "scaron", "uacute", "ucircumflex", "udieresis", "ugrave", "yacute", "ydieresis", "zcaron", "exclamsmall", "Hungarumlautsmall", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "266 ff", "onedotenleader", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "isuperior", "lsuperior", "msuperior", "nsuperior", "osuperior", "rsuperior", "ssuperior", "tsuperior", "ff", "ffi", "ffl", "parenleftinferior", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "exclamdownsmall", "centoldstyle", "Lslashsmall", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "Dotaccentsmall", "Macronsmall", "figuredash", "hypheninferior", "Ogoneksmall", "Ringsmall", "Cedillasmall", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "zerosuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall", "001.000", "001.001", "001.002", "001.003", "Black", "Bold", "Book", "Light", "Medium", "Regular", "Roman", "Semibold"]
              , l = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quoteright", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "quoteleft", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdown", "cent", "sterling", "fraction", "yen", "florin", "section", "currency", "quotesingle", "quotedblleft", "guillemotleft", "guilsinglleft", "guilsinglright", "fi", "fl", "", "endash", "dagger", "daggerdbl", "periodcentered", "", "paragraph", "bullet", "quotesinglbase", "quotedblbase", "quotedblright", "guillemotright", "ellipsis", "perthousand", "", "questiondown", "", "grave", "acute", "circumflex", "tilde", "macron", "breve", "dotaccent", "dieresis", "", "ring", "cedilla", "", "hungarumlaut", "ogonek", "caron", "emdash", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "AE", "", "ordfeminine", "", "", "", "", "Lslash", "Oslash", "OE", "ordmasculine", "", "", "", "", "", "ae", "", "", "", "dotlessi", "", "", "lslash", "oslash", "oe", "germandbls"]
              , c = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "space", "exclamsmall", "Hungarumlautsmall", "", "dollaroldstyle", "dollarsuperior", "ampersandsmall", "Acutesmall", "parenleftsuperior", "parenrightsuperior", "twodotenleader", "onedotenleader", "comma", "hyphen", "period", "fraction", "zerooldstyle", "oneoldstyle", "twooldstyle", "threeoldstyle", "fouroldstyle", "fiveoldstyle", "sixoldstyle", "sevenoldstyle", "eightoldstyle", "nineoldstyle", "colon", "semicolon", "commasuperior", "threequartersemdash", "periodsuperior", "questionsmall", "", "asuperior", "bsuperior", "centsuperior", "dsuperior", "esuperior", "", "", "isuperior", "", "", "lsuperior", "msuperior", "nsuperior", "osuperior", "", "", "rsuperior", "ssuperior", "tsuperior", "", "ff", "fi", "fl", "ffi", "ffl", "parenleftinferior", "", "parenrightinferior", "Circumflexsmall", "hyphensuperior", "Gravesmall", "Asmall", "Bsmall", "Csmall", "Dsmall", "Esmall", "Fsmall", "Gsmall", "Hsmall", "Ismall", "Jsmall", "Ksmall", "Lsmall", "Msmall", "Nsmall", "Osmall", "Psmall", "Qsmall", "Rsmall", "Ssmall", "Tsmall", "Usmall", "Vsmall", "Wsmall", "Xsmall", "Ysmall", "Zsmall", "colonmonetary", "onefitted", "rupiah", "Tildesmall", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "exclamdownsmall", "centoldstyle", "Lslashsmall", "", "", "Scaronsmall", "Zcaronsmall", "Dieresissmall", "Brevesmall", "Caronsmall", "", "Dotaccentsmall", "", "", "Macronsmall", "", "", "figuredash", "hypheninferior", "", "", "Ogoneksmall", "Ringsmall", "Cedillasmall", "", "", "", "onequarter", "onehalf", "threequarters", "questiondownsmall", "oneeighth", "threeeighths", "fiveeighths", "seveneighths", "onethird", "twothirds", "", "", "zerosuperior", "onesuperior", "twosuperior", "threesuperior", "foursuperior", "fivesuperior", "sixsuperior", "sevensuperior", "eightsuperior", "ninesuperior", "zeroinferior", "oneinferior", "twoinferior", "threeinferior", "fourinferior", "fiveinferior", "sixinferior", "seveninferior", "eightinferior", "nineinferior", "centinferior", "dollarinferior", "periodinferior", "commainferior", "Agravesmall", "Aacutesmall", "Acircumflexsmall", "Atildesmall", "Adieresissmall", "Aringsmall", "AEsmall", "Ccedillasmall", "Egravesmall", "Eacutesmall", "Ecircumflexsmall", "Edieresissmall", "Igravesmall", "Iacutesmall", "Icircumflexsmall", "Idieresissmall", "Ethsmall", "Ntildesmall", "Ogravesmall", "Oacutesmall", "Ocircumflexsmall", "Otildesmall", "Odieresissmall", "OEsmall", "Oslashsmall", "Ugravesmall", "Uacutesmall", "Ucircumflexsmall", "Udieresissmall", "Yacutesmall", "Thornsmall", "Ydieresissmall"]
              , p = [".notdef", ".null", "nonmarkingreturn", "space", "exclam", "quotedbl", "numbersign", "dollar", "percent", "ampersand", "quotesingle", "parenleft", "parenright", "asterisk", "plus", "comma", "hyphen", "period", "slash", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", "equal", "greater", "question", "at", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bracketleft", "backslash", "bracketright", "asciicircum", "underscore", "grave", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "braceleft", "bar", "braceright", "asciitilde", "Adieresis", "Aring", "Ccedilla", "Eacute", "Ntilde", "Odieresis", "Udieresis", "aacute", "agrave", "acircumflex", "adieresis", "atilde", "aring", "ccedilla", "eacute", "egrave", "ecircumflex", "edieresis", "iacute", "igrave", "icircumflex", "idieresis", "ntilde", "oacute", "ograve", "ocircumflex", "odieresis", "otilde", "uacute", "ugrave", "ucircumflex", "udieresis", "dagger", "degree", "cent", "sterling", "section", "bullet", "paragraph", "germandbls", "registered", "copyright", "trademark", "acute", "dieresis", "notequal", "AE", "Oslash", "infinity", "plusminus", "lessequal", "greaterequal", "yen", "mu", "partialdiff", "summation", "product", "pi", "integral", "ordfeminine", "ordmasculine", "Omega", "ae", "oslash", "questiondown", "exclamdown", "logicalnot", "radical", "florin", "approxequal", "Delta", "guillemotleft", "guillemotright", "ellipsis", "nonbreakingspace", "Agrave", "Atilde", "Otilde", "OE", "oe", "endash", "emdash", "quotedblleft", "quotedblright", "quoteleft", "quoteright", "divide", "lozenge", "ydieresis", "Ydieresis", "fraction", "currency", "guilsinglleft", "guilsinglright", "fi", "fl", "daggerdbl", "periodcentered", "quotesinglbase", "quotedblbase", "perthousand", "Acircumflex", "Ecircumflex", "Aacute", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave", "Oacute", "Ocircumflex", "apple", "Ograve", "Uacute", "Ucircumflex", "Ugrave", "dotlessi", "circumflex", "tilde", "macron", "breve", "dotaccent", "ring", "cedilla", "hungarumlaut", "ogonek", "caron", "Lslash", "lslash", "Scaron", "scaron", "Zcaron", "zcaron", "brokenbar", "Eth", "eth", "Yacute", "yacute", "Thorn", "thorn", "minus", "multiply", "onesuperior", "twosuperior", "threesuperior", "onehalf", "onequarter", "threequarters", "franc", "Gbreve", "gbreve", "Idotaccent", "Scedilla", "scedilla", "Cacute", "cacute", "Ccaron", "ccaron", "dcroat"];
            a.prototype.charToGlyphIndex = function(e) {
                var t = e.charCodeAt(0)
                  , r = this.font.glyphs;
                if (!r)
                    return null;
                for (var a = 0; a < r.length; a += 1)
                    for (var n = r.get(a), i = 0; i < n.unicodes.length; i += 1)
                        if (n.unicodes[i] === t)
                            return a
            }
            ,
            n.prototype.charToGlyphIndex = function(e) {
                return this.cmap.glyphIndexMap[e.charCodeAt(0)] || 0
            }
            ,
            i.prototype.charToGlyphIndex = function(e) {
                var t = e.charCodeAt(0)
                  , r = this.encoding[t];
                return this.charset.indexOf(r)
            }
            ,
            s.prototype.nameToGlyphIndex = function(e) {
                return this.names.indexOf(e)
            }
            ,
            s.prototype.glyphIndexToName = function(e) {
                return this.names[e]
            }
            ,
            r.cffStandardStrings = o,
            r.cffStandardEncoding = l,
            r.cffExpertEncoding = c,
            r.standardNames = p,
            r.DefaultEncoding = a,
            r.CmapEncoding = n,
            r.CffEncoding = i,
            r.GlyphNames = s,
            r.addGlyphNames = function(e) {
                for (var t, r = e.tables.cmap.glyphIndexMap, a = Object.keys(r), n = 0; n < a.length; n += 1) {
                    var i = a[n]
                      , s = r[i];
                    (t = e.glyphs.get(s)).addUnicode(parseInt(i))
                }
                for (n = 0; n < e.glyphs.length; n += 1)
                    t = e.glyphs.get(n),
                    e.cffEncoding ? t.name = e.cffEncoding.charset[n] : e.glyphNames.names && (t.name = e.glyphNames.glyphIndexToName(n))
            }
        }
        , {}],
        6: [function(e, t, r) {
            function a(e) {
                (e = e || {}).empty || (c.checkArgument(e.familyName, "When creating a new Font object, familyName is required."),
                c.checkArgument(e.styleName, "When creating a new Font object, styleName is required."),
                c.checkArgument(e.unitsPerEm, "When creating a new Font object, unitsPerEm is required."),
                c.checkArgument(e.ascender, "When creating a new Font object, ascender is required."),
                c.checkArgument(e.descender, "When creating a new Font object, descender is required."),
                c.checkArgument(e.descender < 0, "Descender should be negative (e.g. -512)."),
                this.names = {
                    fontFamily: {
                        en: e.familyName || " "
                    },
                    fontSubfamily: {
                        en: e.styleName || " "
                    },
                    fullName: {
                        en: e.fullName || e.familyName + " " + e.styleName
                    },
                    postScriptName: {
                        en: e.postScriptName || e.familyName + e.styleName
                    },
                    designer: {
                        en: e.designer || " "
                    },
                    designerURL: {
                        en: e.designerURL || " "
                    },
                    manufacturer: {
                        en: e.manufacturer || " "
                    },
                    manufacturerURL: {
                        en: e.manufacturerURL || " "
                    },
                    license: {
                        en: e.license || " "
                    },
                    licenseURL: {
                        en: e.licenseURL || " "
                    },
                    version: {
                        en: e.version || "Version 0.1"
                    },
                    description: {
                        en: e.description || " "
                    },
                    copyright: {
                        en: e.copyright || " "
                    },
                    trademark: {
                        en: e.trademark || " "
                    }
                },
                this.unitsPerEm = e.unitsPerEm || 1e3,
                this.ascender = e.ascender,
                this.descender = e.descender,
                this.createdTimestamp = e.createdTimestamp,
                this.tables = {
                    os2: {
                        usWeightClass: e.weightClass || this.usWeightClasses.MEDIUM,
                        usWidthClass: e.widthClass || this.usWidthClasses.MEDIUM,
                        fsSelection: e.fsSelection || this.fsSelectionValues.REGULAR
                    }
                }),
                this.supported = !0,
                this.glyphs = new o.GlyphSet(this,e.glyphs || []),
                this.encoding = new s.DefaultEncoding(this),
                this.substitution = new l(this),
                this.tables = this.tables || {}
            }
            var n = e("./path")
              , i = e("./tables/sfnt")
              , s = e("./encoding")
              , o = e("./glyphset")
              , l = e("./substitution")
              , c = e("./util");
            a.prototype.hasChar = function(e) {
                return null !== this.encoding.charToGlyphIndex(e)
            }
            ,
            a.prototype.charToGlyphIndex = function(e) {
                return this.encoding.charToGlyphIndex(e)
            }
            ,
            a.prototype.charToGlyph = function(e) {
                var t = this.charToGlyphIndex(e)
                  , r = this.glyphs.get(t);
                return r || (r = this.glyphs.get(0)),
                r
            }
            ,
            a.prototype.stringToGlyphs = function(e) {
                for (var t = [], r = 0; r < e.length; r += 1) {
                    var a = e[r];
                    t.push(this.charToGlyph(a))
                }
                return t
            }
            ,
            a.prototype.nameToGlyphIndex = function(e) {
                return this.glyphNames.nameToGlyphIndex(e)
            }
            ,
            a.prototype.nameToGlyph = function(e) {
                var t = this.nameToGlyphIndex(e)
                  , r = this.glyphs.get(t);
                return r || (r = this.glyphs.get(0)),
                r
            }
            ,
            a.prototype.glyphIndexToName = function(e) {
                return this.glyphNames.glyphIndexToName ? this.glyphNames.glyphIndexToName(e) : ""
            }
            ,
            a.prototype.getKerningValue = function(e, t) {
                e = e.index || e,
                t = t.index || t;
                var r = this.getGposKerningValue;
                return r ? r(e, t) : this.kerningPairs[e + "," + t] || 0
            }
            ,
            a.prototype.forEachGlyph = function(e, t, r, a, n, i) {
                t = void 0 !== t ? t : 0,
                r = void 0 !== r ? r : 0,
                a = void 0 !== a ? a : 72;
                for (var s = void 0 === (n = n || {}).kerning || n.kerning, o = 1 / this.unitsPerEm * a, l = this.stringToGlyphs(e), c = 0; c < l.length; c += 1) {
                    var p = l[c];
                    i(p, t, r, a, n),
                    p.advanceWidth && (t += p.advanceWidth * o),
                    s && c < l.length - 1 && (t += this.getKerningValue(p, l[c + 1]) * o),
                    n.letterSpacing ? t += n.letterSpacing * a : n.tracking && (t += n.tracking / 1e3 * a)
                }
            }
            ,
            a.prototype.getPath = function(e, t, r, a, i) {
                var s = new n.Path;
                return this.forEachGlyph(e, t, r, a, i, function(e, t, r, a) {
                    var n = e.getPath(t, r, a);
                    s.extend(n)
                }),
                s
            }
            ,
            a.prototype.getPaths = function(e, t, r, a, n) {
                var i = [];
                return this.forEachGlyph(e, t, r, a, n, function(e, t, r, a) {
                    var n = e.getPath(t, r, a);
                    i.push(n)
                }),
                i
            }
            ,
            a.prototype.draw = function(e, t, r, a, n, i) {
                this.getPath(t, r, a, n, i).draw(e)
            }
            ,
            a.prototype.drawPoints = function(e, t, r, a, n, i) {
                this.forEachGlyph(t, r, a, n, i, function(t, r, a, n) {
                    t.drawPoints(e, r, a, n)
                })
            }
            ,
            a.prototype.drawMetrics = function(e, t, r, a, n, i) {
                this.forEachGlyph(t, r, a, n, i, function(t, r, a, n) {
                    t.drawMetrics(e, r, a, n)
                })
            }
            ,
            a.prototype.getEnglishName = function(e) {
                var t = this.names[e];
                if (t)
                    return t.en
            }
            ,
            a.prototype.validate = function() {
                function e(e, t) {
                    e || r.push(t)
                }
                function t(t) {
                    var r = a.getEnglishName(t);
                    e(r && r.trim().length > 0, "No English " + t + " specified.")
                }
                var r = []
                  , a = this;
                t("fontFamily"),
                t("weightName"),
                t("manufacturer"),
                t("copyright"),
                t("version"),
                e(this.unitsPerEm > 0, "No unitsPerEm specified.")
            }
            ,
            a.prototype.toTables = function() {
                return i.fontToTable(this)
            }
            ,
            a.prototype.toBuffer = function() {
                return console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."),
                this.toArrayBuffer()
            }
            ,
            a.prototype.toArrayBuffer = function() {
                for (var e = this.toTables().encode(), t = new ArrayBuffer(e.length), r = new Uint8Array(t), a = 0; a < e.length; a++)
                    r[a] = e[a];
                return t
            }
            ,
            a.prototype.download = function(t) {
                var r = this.getEnglishName("fontFamily")
                  , a = this.getEnglishName("fontSubfamily");
                t = t || r.replace(/\s/g, "") + "-" + a + ".otf";
                var n = this.toArrayBuffer();
                if (c.isBrowser())
                    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem,
                    window.requestFileSystem(window.TEMPORARY, n.byteLength, function(e) {
                        e.root.getFile(t, {
                            create: !0
                        }, function(e) {
                            e.createWriter(function(t) {
                                var r = new DataView(n)
                                  , a = new Blob([r],{
                                    type: "font/opentype"
                                });
                                t.write(a),
                                t.addEventListener("writeend", function() {
                                    location.href = e.toURL()
                                }, !1)
                            })
                        })
                    }, function(e) {
                        throw new Error(e.name + ": " + e.message)
                    });
                else {
                    var i = e("fs")
                      , s = c.arrayBufferToNodeBuffer(n);
                    i.writeFileSync(t, s)
                }
            }
            ,
            a.prototype.fsSelectionValues = {
                ITALIC: 1,
                UNDERSCORE: 2,
                NEGATIVE: 4,
                OUTLINED: 8,
                STRIKEOUT: 16,
                BOLD: 32,
                REGULAR: 64,
                USER_TYPO_METRICS: 128,
                WWS: 256,
                OBLIQUE: 512
            },
            a.prototype.usWidthClasses = {
                ULTRA_CONDENSED: 1,
                EXTRA_CONDENSED: 2,
                CONDENSED: 3,
                SEMI_CONDENSED: 4,
                MEDIUM: 5,
                SEMI_EXPANDED: 6,
                EXPANDED: 7,
                EXTRA_EXPANDED: 8,
                ULTRA_EXPANDED: 9
            },
            a.prototype.usWeightClasses = {
                THIN: 100,
                EXTRA_LIGHT: 200,
                LIGHT: 300,
                NORMAL: 400,
                MEDIUM: 500,
                SEMI_BOLD: 600,
                BOLD: 700,
                EXTRA_BOLD: 800,
                BLACK: 900
            },
            r.Font = a
        }
        , {
            "./encoding": 5,
            "./glyphset": 8,
            "./path": 12,
            "./substitution": 13,
            "./tables/sfnt": 32,
            "./util": 34,
            fs: void 0
        }],
        7: [function(e, t, r) {
            function a(e, t) {
                var r = t || {
                    commands: []
                };
                return {
                    configurable: !0,
                    get: function() {
                        return "function" == typeof r && (r = r()),
                        r
                    },
                    set: function(e) {
                        r = e
                    }
                }
            }
            function n(e) {
                this.bindConstructorValues(e)
            }
            var i = e("./check")
              , s = e("./draw")
              , o = e("./path");
            n.prototype.bindConstructorValues = function(e) {
                this.index = e.index || 0,
                this.name = e.name || null,
                this.unicode = e.unicode || void 0,
                this.unicodes = e.unicodes || void 0 !== e.unicode ? [e.unicode] : [],
                e.xMin && (this.xMin = e.xMin),
                e.yMin && (this.yMin = e.yMin),
                e.xMax && (this.xMax = e.xMax),
                e.yMax && (this.yMax = e.yMax),
                e.advanceWidth && (this.advanceWidth = e.advanceWidth),
                Object.defineProperty(this, "path", a(0, e.path))
            }
            ,
            n.prototype.addUnicode = function(e) {
                0 === this.unicodes.length && (this.unicode = e),
                this.unicodes.push(e)
            }
            ,
            n.prototype.getBoundingBox = function() {
                return this.path.getBoundingBox()
            }
            ,
            n.prototype.getPath = function(e, t, r, a) {
                e = void 0 !== e ? e : 0,
                t = void 0 !== t ? t : 0,
                a = void 0 !== a ? a : {
                    xScale: 1,
                    yScale: 1
                },
                r = void 0 !== r ? r : 72;
                for (var n = 1 / this.path.unitsPerEm * r, i = a.xScale * n, s = a.yScale * n, l = new o.Path, c = this.path.commands, p = 0; p < c.length; p += 1) {
                    var h = c[p];
                    "M" === h.type ? l.moveTo(e + h.x * i, t + -h.y * s) : "L" === h.type ? l.lineTo(e + h.x * i, t + -h.y * s) : "Q" === h.type ? l.quadraticCurveTo(e + h.x1 * i, t + -h.y1 * s, e + h.x * i, t + -h.y * s) : "C" === h.type ? l.curveTo(e + h.x1 * i, t + -h.y1 * s, e + h.x2 * i, t + -h.y2 * s, e + h.x * i, t + -h.y * s) : "Z" === h.type && l.closePath()
                }
                return l
            }
            ,
            n.prototype.getContours = function() {
                if (void 0 === this.points)
                    return [];
                for (var e = [], t = [], r = 0; r < this.points.length; r += 1) {
                    var a = this.points[r];
                    t.push(a),
                    a.lastPointOfContour && (e.push(t),
                    t = [])
                }
                return i.argument(0 === t.length, "There are still points left in the current contour."),
                e
            }
            ,
            n.prototype.getMetrics = function() {
                for (var e = this.path.commands, t = [], r = [], a = 0; a < e.length; a += 1) {
                    var n = e[a];
                    "Z" !== n.type && (t.push(n.x),
                    r.push(n.y)),
                    "Q" !== n.type && "C" !== n.type || (t.push(n.x1),
                    r.push(n.y1)),
                    "C" === n.type && (t.push(n.x2),
                    r.push(n.y2))
                }
                var i = {
                    xMin: Math.min.apply(null, t),
                    yMin: Math.min.apply(null, r),
                    xMax: Math.max.apply(null, t),
                    yMax: Math.max.apply(null, r),
                    leftSideBearing: this.leftSideBearing
                };
                return isFinite(i.xMin) || (i.xMin = 0),
                isFinite(i.xMax) || (i.xMax = this.advanceWidth),
                isFinite(i.yMin) || (i.yMin = 0),
                isFinite(i.yMax) || (i.yMax = 0),
                i.rightSideBearing = this.advanceWidth - i.leftSideBearing - (i.xMax - i.xMin),
                i
            }
            ,
            n.prototype.draw = function(e, t, r, a, n) {
                this.getPath(t, r, a, n).draw(e)
            }
            ,
            n.prototype.drawPoints = function(e, t, r, a) {
                function n(t, r, a, n) {
                    var i = 2 * Math.PI;
                    e.beginPath();
                    for (var s = 0; s < t.length; s += 1)
                        e.moveTo(r + t[s].x * n, a + t[s].y * n),
                        e.arc(r + t[s].x * n, a + t[s].y * n, 2, 0, i, !1);
                    e.closePath(),
                    e.fill()
                }
                t = void 0 !== t ? t : 0,
                r = void 0 !== r ? r : 0,
                a = void 0 !== a ? a : 24;
                for (var i = 1 / this.path.unitsPerEm * a, s = [], o = [], l = this.path, c = 0; c < l.commands.length; c += 1) {
                    var p = l.commands[c];
                    void 0 !== p.x && s.push({
                        x: p.x,
                        y: -p.y
                    }),
                    void 0 !== p.x1 && o.push({
                        x: p.x1,
                        y: -p.y1
                    }),
                    void 0 !== p.x2 && o.push({
                        x: p.x2,
                        y: -p.y2
                    })
                }
                e.fillStyle = "blue",
                n(s, t, r, i),
                e.fillStyle = "red",
                n(o, t, r, i)
            }
            ,
            n.prototype.drawMetrics = function(e, t, r, a) {
                var n;
                t = void 0 !== t ? t : 0,
                r = void 0 !== r ? r : 0,
                a = void 0 !== a ? a : 24,
                n = 1 / this.path.unitsPerEm * a,
                e.lineWidth = 1,
                e.strokeStyle = "black",
                s.line(e, t, -1e4, t, 1e4),
                s.line(e, -1e4, r, 1e4, r);
                var i = this.xMin || 0
                  , o = this.yMin || 0
                  , l = this.xMax || 0
                  , c = this.yMax || 0
                  , p = this.advanceWidth || 0;
                e.strokeStyle = "blue",
                s.line(e, t + i * n, -1e4, t + i * n, 1e4),
                s.line(e, t + l * n, -1e4, t + l * n, 1e4),
                s.line(e, -1e4, r + -o * n, 1e4, r + -o * n),
                s.line(e, -1e4, r + -c * n, 1e4, r + -c * n),
                e.strokeStyle = "green",
                s.line(e, t + p * n, -1e4, t + p * n, 1e4)
            }
            ,
            r.Glyph = n
        }
        , {
            "./check": 3,
            "./draw": 4,
            "./path": 12
        }],
        8: [function(e, t, r) {
            function a(e, t, r) {
                Object.defineProperty(e, t, {
                    get: function() {
                        return e.path,
                        e[r]
                    },
                    set: function(t) {
                        e[r] = t
                    },
                    enumerable: !0,
                    configurable: !0
                })
            }
            function n(e, t) {
                if (this.font = e,
                this.glyphs = {},
                Array.isArray(t))
                    for (var r = 0; r < t.length; r++)
                        this.glyphs[r] = t[r];
                this.length = t && t.length || 0
            }
            var i = e("./glyph");
            n.prototype.get = function(e) {
                return "function" == typeof this.glyphs[e] && (this.glyphs[e] = this.glyphs[e]()),
                this.glyphs[e]
            }
            ,
            n.prototype.push = function(e, t) {
                this.glyphs[e] = t,
                this.length++
            }
            ,
            r.GlyphSet = n,
            r.glyphLoader = function(e, t) {
                return new i.Glyph({
                    index: t,
                    font: e
                })
            }
            ,
            r.ttfGlyphLoader = function(e, t, r, n, s, o) {
                return function() {
                    var l = new i.Glyph({
                        index: t,
                        font: e
                    });
                    return l.path = function() {
                        r(l, n, s);
                        var t = o(e.glyphs, l);
                        return t.unitsPerEm = e.unitsPerEm,
                        t
                    }
                    ,
                    a(l, "xMin", "_xMin"),
                    a(l, "xMax", "_xMax"),
                    a(l, "yMin", "_yMin"),
                    a(l, "yMax", "_yMax"),
                    l
                }
            }
            ,
            r.cffGlyphLoader = function(e, t, r, a) {
                return function() {
                    var n = new i.Glyph({
                        index: t,
                        font: e
                    });
                    return n.path = function() {
                        var t = r(e, n, a);
                        return t.unitsPerEm = e.unitsPerEm,
                        t
                    }
                    ,
                    n
                }
            }
        }
        , {
            "./glyph": 7
        }],
        9: [function(e, t, r) {
            function a(e, t) {
                for (var r = 0, a = e.length - 1; r <= a; ) {
                    var n = r + a >>> 1
                      , i = e[n].tag;
                    if (i === t)
                        return n;
                    i < t ? r = n + 1 : a = n - 1
                }
                return -r - 1
            }
            var n = e("./check")
              , i = {
                searchTag: a,
                binSearch: function(e, t) {
                    for (var r = 0, a = e.length - 1; r <= a; ) {
                        var n = r + a >>> 1
                          , i = e[n];
                        if (i === t)
                            return n;
                        i < t ? r = n + 1 : a = n - 1
                    }
                    return -r - 1
                },
                getScriptNames: function() {
                    var e = this.getGsubTable();
                    return e ? e.scripts.map(function(e) {
                        return e.tag
                    }) : []
                },
                getScriptTable: function(e, t) {
                    var r = this.getGsubTable(t);
                    if (r) {
                        var n = r.scripts
                          , i = a(r.scripts, e);
                        if (i >= 0)
                            return n[i].script;
                        var s = {
                            tag: e,
                            script: {
                                defaultLangSys: {
                                    reserved: 0,
                                    reqFeatureIndex: 65535,
                                    featureIndexes: []
                                },
                                langSysRecords: []
                            }
                        };
                        return n.splice(-1 - i, 0, s.script),
                        s
                    }
                },
                getLangSysTable: function(e, t, r) {
                    var n = this.getScriptTable(e, r);
                    if (n) {
                        if ("DFLT" === t)
                            return n.defaultLangSys;
                        var i = a(n.langSysRecords, t);
                        if (i >= 0)
                            return n.langSysRecords[i].langSys;
                        if (r) {
                            var s = {
                                tag: t,
                                langSys: {
                                    reserved: 0,
                                    reqFeatureIndex: 65535,
                                    featureIndexes: []
                                }
                            };
                            return n.langSysRecords.splice(-1 - i, 0, s),
                            s.langSys
                        }
                    }
                },
                getFeatureTable: function(e, t, r, a) {
                    var i = this.getLangSysTable(e, t, a);
                    if (i) {
                        for (var s, o = i.featureIndexes, l = this.font.tables.gsub.features, c = 0; c < o.length; c++)
                            if ((s = l[o[c]]).tag === r)
                                return s.feature;
                        if (a) {
                            var p = l.length;
                            return n.assert(0 === p || r >= l[p - 1].tag, "Features must be added in alphabetical order."),
                            s = {
                                tag: r,
                                feature: {
                                    params: 0,
                                    lookupListIndexes: []
                                }
                            },
                            l.push(s),
                            o.push(p),
                            s.feature
                        }
                    }
                },
                getLookupTable: function(e, t, r, a, n) {
                    var i = this.getFeatureTable(e, t, r, n);
                    if (i) {
                        for (var s, o = i.lookupListIndexes, l = this.font.tables.gsub.lookups, c = 0; c < o.length; c++)
                            if ((s = l[o[c]]).lookupType === a)
                                return s;
                        if (n) {
                            s = {
                                lookupType: a,
                                lookupFlag: 0,
                                subtables: [],
                                markFilteringSet: void 0
                            };
                            var p = l.length;
                            return l.push(s),
                            o.push(p),
                            s
                        }
                    }
                },
                expandCoverage: function(e) {
                    if (1 === e.format)
                        return e.glyphs;
                    for (var t = [], r = e.ranges, a = 0; a < r; a++)
                        for (var n = r[a], i = n.start, s = n.end, o = i; o <= s; o++)
                            t.push(o);
                    return t
                }
            };
            t.exports = i
        }
        , {
            "./check": 3
        }],
        10: [function(e, t, r) {
            function a(t, r) {
                e("fs").readFile(t, function(e, t) {
                    if (e)
                        return r(e.message);
                    r(null, g.nodeBufferToArrayBuffer(t))
                })
            }
            function n(e, t) {
                var r = new XMLHttpRequest;
                r.open("get", e, !0),
                r.responseType = "arraybuffer",
                r.onload = function() {
                    return 200 !== r.status ? t("Font could not be loaded: " + r.statusText) : t(null, r.response)
                }
                ,
                r.send()
            }
            function i(e, t) {
                for (var r = [], a = 12, n = 0; n < t; n += 1) {
                    var i = d.getTag(e, a)
                      , s = d.getULong(e, a + 4)
                      , o = d.getULong(e, a + 8)
                      , l = d.getULong(e, a + 12);
                    r.push({
                        tag: i,
                        checksum: s,
                        offset: o,
                        length: l,
                        compression: !1
                    }),
                    a += 16
                }
                return r
            }
            function s(e, t) {
                for (var r = [], a = 44, n = 0; n < t; n += 1) {
                    var i, s = d.getTag(e, a), o = d.getULong(e, a + 4), l = d.getULong(e, a + 8), c = d.getULong(e, a + 12);
                    i = l < c && "WOFF",
                    r.push({
                        tag: s,
                        offset: o,
                        compression: i,
                        compressedLength: l,
                        originalLength: c
                    }),
                    a += 20
                }
                return r
            }
            function o(e, t) {
                if ("WOFF" === t.compression) {
                    var r = new Uint8Array(e.buffer,t.offset + 2,t.compressedLength - 2)
                      , a = new Uint8Array(t.originalLength);
                    if (c(r, a),
                    a.byteLength !== t.originalLength)
                        throw new Error("Decompression error: " + t.tag + " decompressed length doesn't match recorded length");
                    return {
                        data: new DataView(a.buffer,0),
                        offset: 0
                    }
                }
                return {
                    data: e,
                    offset: t.offset
                }
            }
            function l(e) {
                var t, r, a, n = new h.Font({
                    empty: !0
                }), l = new DataView(e,0), c = [], u = d.getTag(l, 0);
                if (u === String.fromCharCode(0, 1, 0, 0))
                    n.outlinesFormat = "truetype",
                    c = i(l, a = d.getUShort(l, 4));
                else if ("OTTO" === u)
                    n.outlinesFormat = "cff",
                    c = i(l, a = d.getUShort(l, 4));
                else {
                    if ("wOFF" !== u)
                        throw new Error("Unsupported OpenType signature " + u);
                    var f = d.getTag(l, 4);
                    if (f === String.fromCharCode(0, 1, 0, 0))
                        n.outlinesFormat = "truetype";
                    else {
                        if ("OTTO" !== f)
                            throw new Error("Unsupported OpenType flavor " + u);
                        n.outlinesFormat = "cff"
                    }
                    c = s(l, a = d.getUShort(l, 12))
                }
                for (var m, g, F, I, U, L, $, A, D, z, B = 0; B < a; B += 1) {
                    var N, _ = c[B];
                    switch (_.tag) {
                    case "cmap":
                        N = o(l, _),
                        n.tables.cmap = v.parse(N.data, N.offset),
                        n.encoding = new p.CmapEncoding(n.tables.cmap);
                        break;
                    case "fvar":
                        g = _;
                        break;
                    case "head":
                        N = o(l, _),
                        n.tables.head = M.parse(N.data, N.offset),
                        n.unitsPerEm = n.tables.head.unitsPerEm,
                        t = n.tables.head.indexToLocFormat;
                        break;
                    case "hhea":
                        N = o(l, _),
                        n.tables.hhea = C.parse(N.data, N.offset),
                        n.ascender = n.tables.hhea.ascender,
                        n.descender = n.tables.hhea.descender,
                        n.numberOfHMetrics = n.tables.hhea.numberOfHMetrics;
                        break;
                    case "hmtx":
                        L = _;
                        break;
                    case "ltag":
                        N = o(l, _),
                        r = k.parse(N.data, N.offset);
                        break;
                    case "maxp":
                        N = o(l, _),
                        n.tables.maxp = O.parse(N.data, N.offset),
                        n.numGlyphs = n.tables.maxp.numGlyphs;
                        break;
                    case "name":
                        D = _;
                        break;
                    case "OS/2":
                        N = o(l, _),
                        n.tables.os2 = j.parse(N.data, N.offset);
                        break;
                    case "post":
                        N = o(l, _),
                        n.tables.post = Z.parse(N.data, N.offset),
                        n.glyphNames = new p.GlyphNames(n.tables.post);
                        break;
                    case "glyf":
                        F = _;
                        break;
                    case "loca":
                        A = _;
                        break;
                    case "CFF ":
                        m = _;
                        break;
                    case "kern":
                        $ = _;
                        break;
                    case "GPOS":
                        I = _;
                        break;
                    case "GSUB":
                        U = _;
                        break;
                    case "meta":
                        z = _
                    }
                }
                var G = o(l, D);
                if (n.tables.name = R.parse(G.data, G.offset, r),
                n.names = n.tables.name,
                F && A) {
                    var V = 0 === t
                      , W = o(l, A)
                      , q = S.parse(W.data, W.offset, n.numGlyphs, V)
                      , Y = o(l, F);
                    n.glyphs = P.parse(Y.data, Y.offset, q, n)
                } else {
                    if (!m)
                        throw new Error("Font doesn't contain TrueType or CFF outlines.");
                    var X = o(l, m);
                    y.parse(X.data, X.offset, n)
                }
                var Q = o(l, L);
                if (T.parse(Q.data, Q.offset, n.numberOfHMetrics, n.numGlyphs, n.glyphs),
                p.addGlyphNames(n),
                $) {
                    var J = o(l, $);
                    n.kerningPairs = E.parse(J.data, J.offset)
                } else
                    n.kerningPairs = {};
                if (I) {
                    var K = o(l, I);
                    x.parse(K.data, K.offset, n)
                }
                if (U) {
                    var ee = o(l, U);
                    n.tables.gsub = w.parse(ee.data, ee.offset)
                }
                if (g) {
                    var te = o(l, g);
                    n.tables.fvar = b.parse(te.data, te.offset, n.names)
                }
                if (z) {
                    var re = o(l, z);
                    n.tables.meta = H.parse(re.data, re.offset),
                    n.metas = n.tables.meta
                }
                return n
            }
            var c = e("tiny-inflate")
              , p = e("./encoding")
              , h = e("./font")
              , u = e("./glyph")
              , d = e("./parse")
              , f = e("./bbox")
              , m = e("./path")
              , g = e("./util")
              , v = e("./tables/cmap")
              , y = e("./tables/cff")
              , b = e("./tables/fvar")
              , P = e("./tables/glyf")
              , x = e("./tables/gpos")
              , w = e("./tables/gsub")
              , M = e("./tables/head")
              , C = e("./tables/hhea")
              , T = e("./tables/hmtx")
              , E = e("./tables/kern")
              , k = e("./tables/ltag")
              , S = e("./tables/loca")
              , O = e("./tables/maxp")
              , R = e("./tables/name")
              , j = e("./tables/os2")
              , Z = e("./tables/post")
              , H = e("./tables/meta");
            r._parse = d,
            r.Font = h.Font,
            r.Glyph = u.Glyph,
            r.Path = m.Path,
            r.BoundingBox = f.BoundingBox,
            r.parse = l,
            r.load = function(e, t) {
                ("undefined" == typeof window ? a : n)(e, function(e, r) {
                    if (e)
                        return t(e);
                    var a;
                    try {
                        a = l(r)
                    } catch (e) {
                        return t(e, null)
                    }
                    return t(null, a)
                })
            }
            ,
            r.loadSync = function(t) {
                var r = e("fs").readFileSync(t);
                return l(g.nodeBufferToArrayBuffer(r))
            }
        }
        , {
            "./bbox": 2,
            "./encoding": 5,
            "./font": 6,
            "./glyph": 7,
            "./parse": 11,
            "./path": 12,
            "./tables/cff": 15,
            "./tables/cmap": 16,
            "./tables/fvar": 17,
            "./tables/glyf": 18,
            "./tables/gpos": 19,
            "./tables/gsub": 20,
            "./tables/head": 21,
            "./tables/hhea": 22,
            "./tables/hmtx": 23,
            "./tables/kern": 24,
            "./tables/loca": 25,
            "./tables/ltag": 26,
            "./tables/maxp": 27,
            "./tables/meta": 28,
            "./tables/name": 29,
            "./tables/os2": 30,
            "./tables/post": 31,
            "./util": 34,
            fs: void 0,
            "tiny-inflate": 1
        }],
        11: [function(e, t, r) {
            function a(e, t) {
                return e.getUint16(t, !1)
            }
            function n(e, t) {
                this.data = e,
                this.offset = t,
                this.relativeOffset = 0
            }
            var i = e("./check");
            r.getByte = function(e, t) {
                return e.getUint8(t)
            }
            ,
            r.getCard8 = r.getByte,
            r.getUShort = r.getCard16 = a,
            r.getShort = function(e, t) {
                return e.getInt16(t, !1)
            }
            ,
            r.getULong = function(e, t) {
                return e.getUint32(t, !1)
            }
            ,
            r.getFixed = function(e, t) {
                return e.getInt16(t, !1) + e.getUint16(t + 2, !1) / 65535
            }
            ,
            r.getTag = function(e, t) {
                for (var r = "", a = t; a < t + 4; a += 1)
                    r += String.fromCharCode(e.getInt8(a));
                return r
            }
            ,
            r.getOffset = function(e, t, r) {
                for (var a = 0, n = 0; n < r; n += 1)
                    a <<= 8,
                    a += e.getUint8(t + n);
                return a
            }
            ,
            r.getBytes = function(e, t, r) {
                for (var a = [], n = t; n < r; n += 1)
                    a.push(e.getUint8(n));
                return a
            }
            ,
            r.bytesToString = function(e) {
                for (var t = "", r = 0; r < e.length; r += 1)
                    t += String.fromCharCode(e[r]);
                return t
            }
            ;
            var s = {
                byte: 1,
                uShort: 2,
                short: 2,
                uLong: 4,
                fixed: 4,
                longDateTime: 8,
                tag: 4
            };
            n.prototype.parseByte = function() {
                var e = this.data.getUint8(this.offset + this.relativeOffset);
                return this.relativeOffset += 1,
                e
            }
            ,
            n.prototype.parseChar = function() {
                var e = this.data.getInt8(this.offset + this.relativeOffset);
                return this.relativeOffset += 1,
                e
            }
            ,
            n.prototype.parseCard8 = n.prototype.parseByte,
            n.prototype.parseUShort = function() {
                var e = this.data.getUint16(this.offset + this.relativeOffset);
                return this.relativeOffset += 2,
                e
            }
            ,
            n.prototype.parseCard16 = n.prototype.parseUShort,
            n.prototype.parseSID = n.prototype.parseUShort,
            n.prototype.parseOffset16 = n.prototype.parseUShort,
            n.prototype.parseShort = function() {
                var e = this.data.getInt16(this.offset + this.relativeOffset);
                return this.relativeOffset += 2,
                e
            }
            ,
            n.prototype.parseF2Dot14 = function() {
                var e = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
                return this.relativeOffset += 2,
                e
            }
            ,
            n.prototype.parseULong = function() {
                var e = r.getULong(this.data, this.offset + this.relativeOffset);
                return this.relativeOffset += 4,
                e
            }
            ,
            n.prototype.parseFixed = function() {
                var e = r.getFixed(this.data, this.offset + this.relativeOffset);
                return this.relativeOffset += 4,
                e
            }
            ,
            n.prototype.parseString = function(e) {
                var t = this.data
                  , r = this.offset + this.relativeOffset
                  , a = "";
                this.relativeOffset += e;
                for (var n = 0; n < e; n++)
                    a += String.fromCharCode(t.getUint8(r + n));
                return a
            }
            ,
            n.prototype.parseTag = function() {
                return this.parseString(4)
            }
            ,
            n.prototype.parseLongDateTime = function() {
                var e = r.getULong(this.data, this.offset + this.relativeOffset + 4);
                return e -= 2082844800,
                this.relativeOffset += 8,
                e
            }
            ,
            n.prototype.parseVersion = function() {
                var e = a(this.data, this.offset + this.relativeOffset)
                  , t = a(this.data, this.offset + this.relativeOffset + 2);
                return this.relativeOffset += 4,
                e + t / 4096 / 10
            }
            ,
            n.prototype.skip = function(e, t) {
                void 0 === t && (t = 1),
                this.relativeOffset += s[e] * t
            }
            ,
            n.prototype.parseOffset16List = n.prototype.parseUShortList = function(e) {
                void 0 === e && (e = this.parseUShort());
                for (var t = new Array(e), r = this.data, a = this.offset + this.relativeOffset, n = 0; n < e; n++)
                    t[n] = r.getUint16(a),
                    a += 2;
                return this.relativeOffset += 2 * e,
                t
            }
            ,
            n.prototype.parseList = function(e, t) {
                t || (t = e,
                e = this.parseUShort());
                for (var r = new Array(e), a = 0; a < e; a++)
                    r[a] = t.call(this);
                return r
            }
            ,
            n.prototype.parseRecordList = function(e, t) {
                t || (t = e,
                e = this.parseUShort());
                for (var r = new Array(e), a = Object.keys(t), n = 0; n < e; n++) {
                    for (var i = {}, s = 0; s < a.length; s++) {
                        var o = a[s]
                          , l = t[o];
                        i[o] = l.call(this)
                    }
                    r[n] = i
                }
                return r
            }
            ,
            n.prototype.parseStruct = function(e) {
                if ("function" == typeof e)
                    return e.call(this);
                for (var t = Object.keys(e), r = {}, a = 0; a < t.length; a++) {
                    var n = t[a]
                      , i = e[n];
                    r[n] = i.call(this)
                }
                return r
            }
            ,
            n.prototype.parsePointer = function(e) {
                var t = this.parseOffset16();
                if (t > 0)
                    return new n(this.data,this.offset + t).parseStruct(e)
            }
            ,
            n.prototype.parseListOfLists = function(e) {
                for (var t = this.parseOffset16List(), r = t.length, a = this.relativeOffset, n = new Array(r), i = 0; i < r; i++) {
                    var s = t[i];
                    if (0 !== s)
                        if (this.relativeOffset = s,
                        e) {
                            for (var o = this.parseOffset16List(), l = new Array(o.length), c = 0; c < o.length; c++)
                                this.relativeOffset = s + o[c],
                                l[c] = e.call(this);
                            n[i] = l
                        } else
                            n[i] = this.parseUShortList();
                    else
                        n[i] = void 0
                }
                return this.relativeOffset = a,
                n
            }
            ,
            n.prototype.parseCoverage = function() {
                var e = this.offset + this.relativeOffset
                  , t = this.parseUShort()
                  , r = this.parseUShort();
                if (1 === t)
                    return {
                        format: 1,
                        glyphs: this.parseUShortList(r)
                    };
                if (2 === t) {
                    for (var a = new Array(r), n = 0; n < r; n++)
                        a[n] = {
                            start: this.parseUShort(),
                            end: this.parseUShort(),
                            index: this.parseUShort()
                        };
                    return {
                        format: 2,
                        ranges: a
                    }
                }
                i.assert(!1, "0x" + e.toString(16) + ": Coverage format must be 1 or 2.")
            }
            ,
            n.prototype.parseClassDef = function() {
                var e = this.offset + this.relativeOffset
                  , t = this.parseUShort();
                return 1 === t ? {
                    format: 1,
                    startGlyph: this.parseUShort(),
                    classes: this.parseUShortList()
                } : 2 === t ? {
                    format: 2,
                    ranges: this.parseRecordList({
                        start: n.uShort,
                        end: n.uShort,
                        classId: n.uShort
                    })
                } : void i.assert(!1, "0x" + e.toString(16) + ": ClassDef format must be 1 or 2.")
            }
            ,
            n.list = function(e, t) {
                return function() {
                    return this.parseList(e, t)
                }
            }
            ,
            n.recordList = function(e, t) {
                return function() {
                    return this.parseRecordList(e, t)
                }
            }
            ,
            n.pointer = function(e) {
                return function() {
                    return this.parsePointer(e)
                }
            }
            ,
            n.tag = n.prototype.parseTag,
            n.byte = n.prototype.parseByte,
            n.uShort = n.offset16 = n.prototype.parseUShort,
            n.uShortList = n.prototype.parseUShortList,
            n.struct = n.prototype.parseStruct,
            n.coverage = n.prototype.parseCoverage,
            n.classDef = n.prototype.parseClassDef;
            var o = {
                reserved: n.uShort,
                reqFeatureIndex: n.uShort,
                featureIndexes: n.uShortList
            };
            n.prototype.parseScriptList = function() {
                return this.parsePointer(n.recordList({
                    tag: n.tag,
                    script: n.pointer({
                        defaultLangSys: n.pointer(o),
                        langSysRecords: n.recordList({
                            tag: n.tag,
                            langSys: n.pointer(o)
                        })
                    })
                }))
            }
            ,
            n.prototype.parseFeatureList = function() {
                return this.parsePointer(n.recordList({
                    tag: n.tag,
                    feature: n.pointer({
                        featureParams: n.offset16,
                        lookupListIndexes: n.uShortList
                    })
                }))
            }
            ,
            n.prototype.parseLookupList = function(e) {
                return this.parsePointer(n.list(n.pointer(function() {
                    var t = this.parseUShort();
                    i.argument(1 <= t && t <= 8, "GSUB lookup type " + t + " unknown.");
                    var r = this.parseUShort()
                      , a = 16 & r;
                    return {
                        lookupType: t,
                        lookupFlag: r,
                        subtables: this.parseList(n.pointer(e[t])),
                        markFilteringSet: a ? this.parseUShort() : void 0
                    }
                })))
            }
            ,
            r.Parser = n
        }
        , {
            "./check": 3
        }],
        12: [function(e, t, r) {
            function a() {
                this.commands = [],
                this.fill = "black",
                this.stroke = null,
                this.strokeWidth = 1
            }
            var n = e("./bbox");
            a.prototype.moveTo = function(e, t) {
                this.commands.push({
                    type: "M",
                    x: e,
                    y: t
                })
            }
            ,
            a.prototype.lineTo = function(e, t) {
                this.commands.push({
                    type: "L",
                    x: e,
                    y: t
                })
            }
            ,
            a.prototype.curveTo = a.prototype.bezierCurveTo = function(e, t, r, a, n, i) {
                this.commands.push({
                    type: "C",
                    x1: e,
                    y1: t,
                    x2: r,
                    y2: a,
                    x: n,
                    y: i
                })
            }
            ,
            a.prototype.quadTo = a.prototype.quadraticCurveTo = function(e, t, r, a) {
                this.commands.push({
                    type: "Q",
                    x1: e,
                    y1: t,
                    x: r,
                    y: a
                })
            }
            ,
            a.prototype.close = a.prototype.closePath = function() {
                this.commands.push({
                    type: "Z"
                })
            }
            ,
            a.prototype.extend = function(e) {
                if (e.commands)
                    e = e.commands;
                else if (e instanceof n.BoundingBox) {
                    var t = e;
                    return this.moveTo(t.x1, t.y1),
                    this.lineTo(t.x2, t.y1),
                    this.lineTo(t.x2, t.y2),
                    this.lineTo(t.x1, t.y2),
                    void this.close()
                }
                Array.prototype.push.apply(this.commands, e)
            }
            ,
            a.prototype.getBoundingBox = function() {
                for (var e = new n.BoundingBox, t = 0, r = 0, a = 0, i = 0, s = 0; s < this.commands.length; s++) {
                    var o = this.commands[s];
                    switch (o.type) {
                    case "M":
                        e.addPoint(o.x, o.y),
                        t = a = o.x,
                        r = i = o.y;
                        break;
                    case "L":
                        e.addPoint(o.x, o.y),
                        a = o.x,
                        i = o.y;
                        break;
                    case "Q":
                        e.addQuad(a, i, o.x1, o.y1, o.x, o.y),
                        a = o.x,
                        i = o.y;
                        break;
                    case "C":
                        e.addBezier(a, i, o.x1, o.y1, o.x2, o.y2, o.x, o.y),
                        a = o.x,
                        i = o.y;
                        break;
                    case "Z":
                        a = t,
                        i = r;
                        break;
                    default:
                        throw new Error("Unexpected path commmand " + o.type)
                    }
                }
                return e.isEmpty() && e.addPoint(0, 0),
                e
            }
            ,
            a.prototype.draw = function(e) {
                e.beginPath();
                for (var t = 0; t < this.commands.length; t += 1) {
                    var r = this.commands[t];
                    "M" === r.type ? e.moveTo(r.x, r.y) : "L" === r.type ? e.lineTo(r.x, r.y) : "C" === r.type ? e.bezierCurveTo(r.x1, r.y1, r.x2, r.y2, r.x, r.y) : "Q" === r.type ? e.quadraticCurveTo(r.x1, r.y1, r.x, r.y) : "Z" === r.type && e.closePath()
                }
                this.fill && (e.fillStyle = this.fill,
                e.fill()),
                this.stroke && (e.strokeStyle = this.stroke,
                e.lineWidth = this.strokeWidth,
                e.stroke())
            }
            ,
            a.prototype.toPathData = function(e) {
                function t(t) {
                    return Math.round(t) === t ? "" + Math.round(t) : t.toFixed(e)
                }
                function r() {
                    for (var e = "", r = 0; r < arguments.length; r += 1) {
                        var a = arguments[r];
                        a >= 0 && r > 0 && (e += " "),
                        e += t(a)
                    }
                    return e
                }
                e = void 0 !== e ? e : 2;
                for (var a = "", n = 0; n < this.commands.length; n += 1) {
                    var i = this.commands[n];
                    "M" === i.type ? a += "M" + r(i.x, i.y) : "L" === i.type ? a += "L" + r(i.x, i.y) : "C" === i.type ? a += "C" + r(i.x1, i.y1, i.x2, i.y2, i.x, i.y) : "Q" === i.type ? a += "Q" + r(i.x1, i.y1, i.x, i.y) : "Z" === i.type && (a += "Z")
                }
                return a
            }
            ,
            a.prototype.toSVG = function(e) {
                var t = '<path d="';
                return t += this.toPathData(e),
                t += '"',
                this.fill && "black" !== this.fill && (null === this.fill ? t += ' fill="none"' : t += ' fill="' + this.fill + '"'),
                this.stroke && (t += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"'),
                t += "/>"
            }
            ,
            a.prototype.toDOMElement = function(e) {
                var t = this.toPathData(e)
                  , r = document.createElementNS("http://www.w3.org/2000/svg", "path");
                return r.setAttribute("d", t),
                r
            }
            ,
            r.Path = a
        }
        , {
            "./bbox": 2
        }],
        13: [function(e, t, r) {
            function a(e, t) {
                var r = e.length;
                if (r !== t.length)
                    return !1;
                for (var a = 0; a < r; a++)
                    if (e[a] !== t[a])
                        return !1;
                return !0
            }
            function n(e, t, r) {
                for (var a = e.subtables, n = 0; n < a.length; n++) {
                    var i = a[n];
                    if (i.substFormat === t)
                        return i
                }
                if (r)
                    return a.push(r),
                    r
            }
            var i = e("./check")
              , s = e("./layout")
              , o = function(e) {
                this.font = e
            };
            (o.prototype = s).getGsubTable = function(e) {
                var t = this.font.tables.gsub;
                return !t && e && (this.font.tables.gsub = t = {
                    version: 1,
                    scripts: [{
                        tag: "DFLT",
                        script: {
                            defaultLangSys: {
                                reserved: 0,
                                reqFeatureIndex: 65535,
                                featureIndexes: []
                            },
                            langSysRecords: []
                        }
                    }],
                    features: [],
                    lookups: []
                }),
                t
            }
            ,
            o.prototype.getSingle = function(e, t, r) {
                var a = []
                  , n = this.getLookupTable(t, r, e, 1);
                if (!n)
                    return a;
                for (var i = n.subtables, s = 0; s < i.length; s++) {
                    var o, l = i[s], c = this.expandCoverage(l.coverage);
                    if (1 === l.substFormat) {
                        var p = l.deltaGlyphId;
                        for (o = 0; o < c.length; o++) {
                            var h = c[o];
                            a.push({
                                sub: h,
                                by: h + p
                            })
                        }
                    } else {
                        var u = l.substitute;
                        for (o = 0; o < c.length; o++)
                            a.push({
                                sub: c[o],
                                by: u[o]
                            })
                    }
                }
                return a
            }
            ,
            o.prototype.getAlternates = function(e, t, r) {
                var a = []
                  , n = this.getLookupTable(t, r, e, 3);
                if (!n)
                    return a;
                for (var i = n.subtables, s = 0; s < i.length; s++)
                    for (var o = i[s], l = this.expandCoverage(o.coverage), c = o.alternateSets, p = 0; p < l.length; p++)
                        a.push({
                            sub: l[p],
                            by: c[p]
                        });
                return a
            }
            ,
            o.prototype.getLigatures = function(e, t, r) {
                var a = []
                  , n = this.getLookupTable(t, r, e, 4);
                if (!n)
                    return [];
                for (var i = n.subtables, s = 0; s < i.length; s++)
                    for (var o = i[s], l = this.expandCoverage(o.coverage), c = o.ligatureSets, p = 0; p < l.length; p++)
                        for (var h = l[p], u = c[p], d = 0; d < u.length; d++) {
                            var f = u[d];
                            a.push({
                                sub: [h].concat(f.components),
                                by: f.ligGlyph
                            })
                        }
                return a
            }
            ,
            o.prototype.addSingle = function(e, t, r, a) {
                var s = n(this.getLookupTable(r, a, e, 1, !0), 2, {
                    substFormat: 2,
                    coverage: {
                        format: 1,
                        glyphs: []
                    },
                    substitute: []
                });
                i.assert(1 === s.coverage.format, "Ligature: unable to modify coverage table format " + s.coverage.format);
                var o = t.sub
                  , l = this.binSearch(s.coverage.glyphs, o);
                l < 0 && (l = -1 - l,
                s.coverage.glyphs.splice(l, 0, o),
                s.substitute.splice(l, 0, 0)),
                s.substitute[l] = t.by
            }
            ,
            o.prototype.addAlternate = function(e, t, r, a) {
                var s = n(this.getLookupTable(r, a, e, 3, !0), 1, {
                    substFormat: 1,
                    coverage: {
                        format: 1,
                        glyphs: []
                    },
                    alternateSets: []
                });
                i.assert(1 === s.coverage.format, "Ligature: unable to modify coverage table format " + s.coverage.format);
                var o = t.sub
                  , l = this.binSearch(s.coverage.glyphs, o);
                l < 0 && (l = -1 - l,
                s.coverage.glyphs.splice(l, 0, o),
                s.alternateSets.splice(l, 0, 0)),
                s.alternateSets[l] = t.by
            }
            ,
            o.prototype.addLigature = function(e, t, r, n) {
                r = r || "DFLT",
                n = n || "DFLT";
                var s = this.getLookupTable(r, n, e, 4, !0)
                  , o = s.subtables[0];
                o || (o = {
                    substFormat: 1,
                    coverage: {
                        format: 1,
                        glyphs: []
                    },
                    ligatureSets: []
                },
                s.subtables[0] = o),
                i.assert(1 === o.coverage.format, "Ligature: unable to modify coverage table format " + o.coverage.format);
                var l = t.sub[0]
                  , c = t.sub.slice(1)
                  , p = {
                    ligGlyph: t.by,
                    components: c
                }
                  , h = this.binSearch(o.coverage.glyphs, l);
                if (h >= 0) {
                    for (var u = o.ligatureSets[h], d = 0; d < u.length; d++)
                        if (a(u[d].components, c))
                            return;
                    u.push(p)
                } else
                    h = -1 - h,
                    o.coverage.glyphs.splice(h, 0, l),
                    o.ligatureSets.splice(h, 0, [p])
            }
            ,
            o.prototype.getFeature = function(e, t, r) {
                if (t = t || "DFLT",
                r = r || "DFLT",
                /ss\d\d/.test(e))
                    return this.getSingle(e, t, r);
                switch (e) {
                case "aalt":
                case "salt":
                    return this.getSingle(e, t, r).concat(this.getAlternates(e, t, r));
                case "dlig":
                case "liga":
                case "rlig":
                    return this.getLigatures(e, t, r)
                }
            }
            ,
            o.prototype.add = function(e, t, r, a) {
                if (r = r || "DFLT",
                a = a || "DFLT",
                /ss\d\d/.test(e))
                    return this.addSingle(e, t, r, a);
                switch (e) {
                case "aalt":
                case "salt":
                    return "number" == typeof t.by ? this.addSingle(e, t, r, a) : this.addAlternate(e, t, r, a);
                case "dlig":
                case "liga":
                case "rlig":
                    return this.addLigature(e, t, r, a)
                }
            }
            ,
            t.exports = o
        }
        , {
            "./check": 3,
            "./layout": 9
        }],
        14: [function(e, t, r) {
            function a(e, t, r) {
                var a;
                for (a = 0; a < t.length; a += 1) {
                    var n = t[a];
                    this[n.name] = n.value
                }
                if (this.tableName = e,
                this.fields = t,
                r) {
                    var i = Object.keys(r);
                    for (a = 0; a < i.length; a += 1) {
                        var s = i[a]
                          , o = r[s];
                        void 0 !== this[s] && (this[s] = o)
                    }
                }
            }
            function n(e, t, r) {
                void 0 === r && (r = t.length);
                var a = new Array(t.length + 1);
                a[0] = {
                    name: e + "Count",
                    type: "USHORT",
                    value: r
                };
                for (var n = 0; n < t.length; n++)
                    a[n + 1] = {
                        name: e + n,
                        type: "USHORT",
                        value: t[n]
                    };
                return a
            }
            function i(e, t, r) {
                var a = t.length
                  , n = new Array(a + 1);
                n[0] = {
                    name: e + "Count",
                    type: "USHORT",
                    value: a
                };
                for (var i = 0; i < a; i++)
                    n[i + 1] = {
                        name: e + i,
                        type: "TABLE",
                        value: r(t[i], i)
                    };
                return n
            }
            function s(e, t, r) {
                var a = t.length
                  , n = [];
                n[0] = {
                    name: e + "Count",
                    type: "USHORT",
                    value: a
                };
                for (var i = 0; i < a; i++)
                    n = n.concat(r(t[i], i));
                return n
            }
            function o(e) {
                1 === e.format ? a.call(this, "coverageTable", [{
                    name: "coverageFormat",
                    type: "USHORT",
                    value: 1
                }].concat(n("glyph", e.glyphs))) : h.assert(!1, "Can't create coverage table format 2 yet.")
            }
            function l(e) {
                a.call(this, "scriptListTable", s("scriptRecord", e, function(e, t) {
                    var r = e.script
                      , i = r.defaultLangSys;
                    return h.assert(!!i, "Unable to write GSUB: script " + e.tag + " has no default language system."),
                    [{
                        name: "scriptTag" + t,
                        type: "TAG",
                        value: e.tag
                    }, {
                        name: "script" + t,
                        type: "TABLE",
                        value: new a("scriptTable",[{
                            name: "defaultLangSys",
                            type: "TABLE",
                            value: new a("defaultLangSys",[{
                                name: "lookupOrder",
                                type: "USHORT",
                                value: 0
                            }, {
                                name: "reqFeatureIndex",
                                type: "USHORT",
                                value: i.reqFeatureIndex
                            }].concat(n("featureIndex", i.featureIndexes)))
                        }].concat(s("langSys", r.langSysRecords, function(e, t) {
                            var r = e.langSys;
                            return [{
                                name: "langSysTag" + t,
                                type: "TAG",
                                value: e.tag
                            }, {
                                name: "langSys" + t,
                                type: "TABLE",
                                value: new a("langSys",[{
                                    name: "lookupOrder",
                                    type: "USHORT",
                                    value: 0
                                }, {
                                    name: "reqFeatureIndex",
                                    type: "USHORT",
                                    value: r.reqFeatureIndex
                                }].concat(n("featureIndex", r.featureIndexes)))
                            }]
                        })))
                    }]
                }))
            }
            function c(e) {
                a.call(this, "featureListTable", s("featureRecord", e, function(e, t) {
                    var r = e.feature;
                    return [{
                        name: "featureTag" + t,
                        type: "TAG",
                        value: e.tag
                    }, {
                        name: "feature" + t,
                        type: "TABLE",
                        value: new a("featureTable",[{
                            name: "featureParams",
                            type: "USHORT",
                            value: r.featureParams
                        }].concat(n("lookupListIndex", r.lookupListIndexes)))
                    }]
                }))
            }
            function p(e, t) {
                a.call(this, "lookupListTable", i("lookup", e, function(e) {
                    var r = t[e.lookupType];
                    return h.assert(!!r, "Unable to write GSUB lookup type " + e.lookupType + " tables."),
                    new a("lookupTable",[{
                        name: "lookupType",
                        type: "USHORT",
                        value: e.lookupType
                    }, {
                        name: "lookupFlag",
                        type: "USHORT",
                        value: e.lookupFlag
                    }].concat(i("subtable", e.subtables, r)))
                }))
            }
            var h = e("./check")
              , u = e("./types").encode
              , d = e("./types").sizeOf;
            a.prototype.encode = function() {
                return u.TABLE(this)
            }
            ,
            a.prototype.sizeOf = function() {
                return d.TABLE(this)
            }
            ,
            (o.prototype = Object.create(a.prototype)).constructor = o,
            (l.prototype = Object.create(a.prototype)).constructor = l,
            (c.prototype = Object.create(a.prototype)).constructor = c,
            (p.prototype = Object.create(a.prototype)).constructor = p,
            r.Record = r.Table = a,
            r.Coverage = o,
            r.ScriptList = l,
            r.FeatureList = c,
            r.LookupList = p,
            r.ushortList = n,
            r.tableList = i,
            r.recordList = s
        }
        , {
            "./check": 3,
            "./types": 33
        }],
        15: [function(e, t, r) {
            function a(e, t) {
                if (e === t)
                    return !0;
                if (Array.isArray(e) && Array.isArray(t)) {
                    if (e.length !== t.length)
                        return !1;
                    for (var r = 0; r < e.length; r += 1)
                        if (!a(e[r], t[r]))
                            return !1;
                    return !0
                }
                return !1
            }
            function n(e, t, r) {
                var a, n, i, s = [], o = [], l = Z.getCard16(e, t);
                if (0 !== l) {
                    var c = Z.getByte(e, t + 2);
                    n = t + (l + 1) * c + 2;
                    var p = t + 3;
                    for (a = 0; a < l + 1; a += 1)
                        s.push(Z.getOffset(e, p, c)),
                        p += c;
                    i = n + s[l]
                } else
                    i = t + 2;
                for (a = 0; a < s.length - 1; a += 1) {
                    var h = Z.getBytes(e, n + s[a], n + s[a + 1]);
                    r && (h = r(h)),
                    o.push(h)
                }
                return {
                    objects: o,
                    startOffset: t,
                    endOffset: i
                }
            }
            function i(e) {
                for (var t = "", r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "E", "E-", null, "-"]; ; ) {
                    var a = e.parseByte()
                      , n = a >> 4
                      , i = 15 & a;
                    if (15 === n)
                        break;
                    if (t += r[n],
                    15 === i)
                        break;
                    t += r[i]
                }
                return parseFloat(t)
            }
            function s(e, t) {
                var r, a, n, s;
                if (28 === t)
                    return r = e.parseByte(),
                    a = e.parseByte(),
                    r << 8 | a;
                if (29 === t)
                    return r = e.parseByte(),
                    a = e.parseByte(),
                    n = e.parseByte(),
                    s = e.parseByte(),
                    r << 24 | a << 16 | n << 8 | s;
                if (30 === t)
                    return i(e);
                if (t >= 32 && t <= 246)
                    return t - 139;
                if (t >= 247 && t <= 250)
                    return r = e.parseByte(),
                    256 * (t - 247) + r + 108;
                if (t >= 251 && t <= 254)
                    return r = e.parseByte(),
                    256 * -(t - 251) - r - 108;
                throw new Error("Invalid b0 " + t)
            }
            function o(e) {
                for (var t = {}, r = 0; r < e.length; r += 1) {
                    var a, n = e[r][0], i = e[r][1];
                    if (a = 1 === i.length ? i[0] : i,
                    t.hasOwnProperty(n))
                        throw new Error("Object " + t + " already has key " + n);
                    t[n] = a
                }
                return t
            }
            function l(e, t, r) {
                t = void 0 !== t ? t : 0;
                var a = new Z.Parser(e,t)
                  , n = []
                  , i = [];
                for (r = void 0 !== r ? r : e.length; a.relativeOffset < r; ) {
                    var l = a.parseByte();
                    l <= 21 ? (12 === l && (l = 1200 + a.parseByte()),
                    n.push([l, i]),
                    i = []) : i.push(s(a, l))
                }
                return o(n)
            }
            function c(e, t) {
                return t = t <= 390 ? R.cffStandardStrings[t] : e[t - 391]
            }
            function p(e, t, r) {
                for (var a = {}, n = 0; n < t.length; n += 1) {
                    var i = t[n]
                      , s = e[i.op];
                    void 0 === s && (s = void 0 !== i.value ? i.value : null),
                    "SID" === i.type && (s = c(r, s)),
                    a[i.name] = s
                }
                return a
            }
            function h(e, t) {
                var r = {};
                return r.formatMajor = Z.getCard8(e, t),
                r.formatMinor = Z.getCard8(e, t + 1),
                r.size = Z.getCard8(e, t + 2),
                r.offsetSize = Z.getCard8(e, t + 3),
                r.startOffset = t,
                r.endOffset = t + 4,
                r
            }
            function u(e, t) {
                return p(l(e, 0, e.byteLength), I, t)
            }
            function d(e, t, r, a) {
                return p(l(e, t, r), U, a)
            }
            function f(e, t, r, a) {
                var n, i, s, o = new Z.Parser(e,t);
                r -= 1;
                var l = [".notdef"]
                  , p = o.parseCard8();
                if (0 === p)
                    for (n = 0; n < r; n += 1)
                        i = o.parseSID(),
                        l.push(c(a, i));
                else if (1 === p)
                    for (; l.length <= r; )
                        for (i = o.parseSID(),
                        s = o.parseCard8(),
                        n = 0; n <= s; n += 1)
                            l.push(c(a, i)),
                            i += 1;
                else {
                    if (2 !== p)
                        throw new Error("Unknown charset format " + p);
                    for (; l.length <= r; )
                        for (i = o.parseSID(),
                        s = o.parseCard16(),
                        n = 0; n <= s; n += 1)
                            l.push(c(a, i)),
                            i += 1
                }
                return l
            }
            function m(e, t, r) {
                var a, n, i = {}, s = new Z.Parser(e,t), o = s.parseCard8();
                if (0 === o) {
                    var l = s.parseCard8();
                    for (a = 0; a < l; a += 1)
                        i[n = s.parseCard8()] = a
                } else {
                    if (1 !== o)
                        throw new Error("Unknown encoding format " + o);
                    var c = s.parseCard8();
                    for (n = 1,
                    a = 0; a < c; a += 1)
                        for (var p = s.parseCard8(), h = s.parseCard8(), u = p; u <= p + h; u += 1)
                            i[u] = n,
                            n += 1
                }
                return new R.CffEncoding(i,r)
            }
            function g(e, t, r) {
                function a(e, t) {
                    m && p.closePath(),
                    p.moveTo(e, t),
                    m = !0
                }
                function n() {
                    h.length % 2 != 0 && !d && (f = h.shift() + e.nominalWidthX),
                    u += h.length >> 1,
                    h.length = 0,
                    d = !0
                }
                function i(r) {
                    for (var y, b, P, x, w, M, C, T, E, k, S, O, R = 0; R < r.length; ) {
                        var j = r[R];
                        switch (R += 1,
                        j) {
                        case 1:
                        case 3:
                            n();
                            break;
                        case 4:
                            h.length > 1 && !d && (f = h.shift() + e.nominalWidthX,
                            d = !0),
                            v += h.pop(),
                            a(g, v);
                            break;
                        case 5:
                            for (; h.length > 0; )
                                g += h.shift(),
                                v += h.shift(),
                                p.lineTo(g, v);
                            break;
                        case 6:
                            for (; h.length > 0 && (g += h.shift(),
                            p.lineTo(g, v),
                            0 !== h.length); )
                                v += h.shift(),
                                p.lineTo(g, v);
                            break;
                        case 7:
                            for (; h.length > 0 && (v += h.shift(),
                            p.lineTo(g, v),
                            0 !== h.length); )
                                g += h.shift(),
                                p.lineTo(g, v);
                            break;
                        case 8:
                            for (; h.length > 0; )
                                s = g + h.shift(),
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                g = l + h.shift(),
                                v = c + h.shift(),
                                p.curveTo(s, o, l, c, g, v);
                            break;
                        case 10:
                            w = h.pop() + e.subrsBias,
                            (M = e.subrs[w]) && i(M);
                            break;
                        case 11:
                            return;
                        case 12:
                            switch (j = r[R],
                            R += 1,
                            j) {
                            case 35:
                                s = g + h.shift(),
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                C = l + h.shift(),
                                T = c + h.shift(),
                                E = C + h.shift(),
                                k = T + h.shift(),
                                S = E + h.shift(),
                                O = k + h.shift(),
                                g = S + h.shift(),
                                v = O + h.shift(),
                                h.shift(),
                                p.curveTo(s, o, l, c, C, T),
                                p.curveTo(E, k, S, O, g, v);
                                break;
                            case 34:
                                s = g + h.shift(),
                                o = v,
                                l = s + h.shift(),
                                c = o + h.shift(),
                                C = l + h.shift(),
                                T = c,
                                E = C + h.shift(),
                                k = c,
                                S = E + h.shift(),
                                O = v,
                                g = S + h.shift(),
                                p.curveTo(s, o, l, c, C, T),
                                p.curveTo(E, k, S, O, g, v);
                                break;
                            case 36:
                                s = g + h.shift(),
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                C = l + h.shift(),
                                T = c,
                                E = C + h.shift(),
                                k = c,
                                S = E + h.shift(),
                                O = k + h.shift(),
                                g = S + h.shift(),
                                p.curveTo(s, o, l, c, C, T),
                                p.curveTo(E, k, S, O, g, v);
                                break;
                            case 37:
                                s = g + h.shift(),
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                C = l + h.shift(),
                                T = c + h.shift(),
                                E = C + h.shift(),
                                k = T + h.shift(),
                                S = E + h.shift(),
                                O = k + h.shift(),
                                Math.abs(S - g) > Math.abs(O - v) ? g = S + h.shift() : v = O + h.shift(),
                                p.curveTo(s, o, l, c, C, T),
                                p.curveTo(E, k, S, O, g, v);
                                break;
                            default:
                                console.log("Glyph " + t.index + ": unknown operator 1200" + j),
                                h.length = 0
                            }
                            break;
                        case 14:
                            h.length > 0 && !d && (f = h.shift() + e.nominalWidthX,
                            d = !0),
                            m && (p.closePath(),
                            m = !1);
                            break;
                        case 18:
                            n();
                            break;
                        case 19:
                        case 20:
                            n(),
                            R += u + 7 >> 3;
                            break;
                        case 21:
                            h.length > 2 && !d && (f = h.shift() + e.nominalWidthX,
                            d = !0),
                            v += h.pop(),
                            a(g += h.pop(), v);
                            break;
                        case 22:
                            h.length > 1 && !d && (f = h.shift() + e.nominalWidthX,
                            d = !0),
                            a(g += h.pop(), v);
                            break;
                        case 23:
                            n();
                            break;
                        case 24:
                            for (; h.length > 2; )
                                s = g + h.shift(),
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                g = l + h.shift(),
                                v = c + h.shift(),
                                p.curveTo(s, o, l, c, g, v);
                            g += h.shift(),
                            v += h.shift(),
                            p.lineTo(g, v);
                            break;
                        case 25:
                            for (; h.length > 6; )
                                g += h.shift(),
                                v += h.shift(),
                                p.lineTo(g, v);
                            s = g + h.shift(),
                            o = v + h.shift(),
                            l = s + h.shift(),
                            c = o + h.shift(),
                            g = l + h.shift(),
                            v = c + h.shift(),
                            p.curveTo(s, o, l, c, g, v);
                            break;
                        case 26:
                            for (h.length % 2 && (g += h.shift()); h.length > 0; )
                                s = g,
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                g = l,
                                v = c + h.shift(),
                                p.curveTo(s, o, l, c, g, v);
                            break;
                        case 27:
                            for (h.length % 2 && (v += h.shift()); h.length > 0; )
                                s = g + h.shift(),
                                o = v,
                                l = s + h.shift(),
                                c = o + h.shift(),
                                g = l + h.shift(),
                                v = c,
                                p.curveTo(s, o, l, c, g, v);
                            break;
                        case 28:
                            y = r[R],
                            b = r[R + 1],
                            h.push((y << 24 | b << 16) >> 16),
                            R += 2;
                            break;
                        case 29:
                            w = h.pop() + e.gsubrsBias,
                            (M = e.gsubrs[w]) && i(M);
                            break;
                        case 30:
                            for (; h.length > 0 && (s = g,
                            o = v + h.shift(),
                            l = s + h.shift(),
                            c = o + h.shift(),
                            g = l + h.shift(),
                            v = c + (1 === h.length ? h.shift() : 0),
                            p.curveTo(s, o, l, c, g, v),
                            0 !== h.length); )
                                s = g + h.shift(),
                                o = v,
                                l = s + h.shift(),
                                c = o + h.shift(),
                                v = c + h.shift(),
                                g = l + (1 === h.length ? h.shift() : 0),
                                p.curveTo(s, o, l, c, g, v);
                            break;
                        case 31:
                            for (; h.length > 0 && (s = g + h.shift(),
                            o = v,
                            l = s + h.shift(),
                            c = o + h.shift(),
                            v = c + h.shift(),
                            g = l + (1 === h.length ? h.shift() : 0),
                            p.curveTo(s, o, l, c, g, v),
                            0 !== h.length); )
                                s = g,
                                o = v + h.shift(),
                                l = s + h.shift(),
                                c = o + h.shift(),
                                g = l + h.shift(),
                                v = c + (1 === h.length ? h.shift() : 0),
                                p.curveTo(s, o, l, c, g, v);
                            break;
                        default:
                            j < 32 ? console.log("Glyph " + t.index + ": unknown operator " + j) : j < 247 ? h.push(j - 139) : j < 251 ? (y = r[R],
                            R += 1,
                            h.push(256 * (j - 247) + y + 108)) : j < 255 ? (y = r[R],
                            R += 1,
                            h.push(256 * -(j - 251) - y - 108)) : (y = r[R],
                            b = r[R + 1],
                            P = r[R + 2],
                            x = r[R + 3],
                            R += 4,
                            h.push((y << 24 | b << 16 | P << 8 | x) / 65536))
                        }
                    }
                }
                var s, o, l, c, p = new H.Path, h = [], u = 0, d = !1, f = e.defaultWidthX, m = !1, g = 0, v = 0;
                return i(r),
                t.advanceWidth = f,
                p
            }
            function v(e) {
                return e.length < 1240 ? 107 : e.length < 33900 ? 1131 : 32768
            }
            function y(e, t) {
                var r, a = R.cffStandardStrings.indexOf(e);
                return a >= 0 && (r = a),
                (a = t.indexOf(e)) >= 0 ? r = a + R.cffStandardStrings.length : (r = R.cffStandardStrings.length + t.length,
                t.push(e)),
                r
            }
            function b() {
                return new F.Record("Header",[{
                    name: "major",
                    type: "Card8",
                    value: 1
                }, {
                    name: "minor",
                    type: "Card8",
                    value: 0
                }, {
                    name: "hdrSize",
                    type: "Card8",
                    value: 4
                }, {
                    name: "major",
                    type: "Card8",
                    value: 1
                }])
            }
            function P(e) {
                var t = new F.Record("Name INDEX",[{
                    name: "names",
                    type: "INDEX",
                    value: []
                }]);
                t.names = [];
                for (var r = 0; r < e.length; r += 1)
                    t.names.push({
                        name: "name_" + r,
                        type: "NAME",
                        value: e[r]
                    });
                return t
            }
            function x(e, t, r) {
                for (var n = {}, i = 0; i < e.length; i += 1) {
                    var s = e[i]
                      , o = t[s.name];
                    void 0 === o || a(o, s.value) || ("SID" === s.type && (o = y(o, r)),
                    n[s.op] = {
                        name: s.name,
                        type: s.type,
                        value: o
                    })
                }
                return n
            }
            function w(e, t) {
                var r = new F.Record("Top DICT",[{
                    name: "dict",
                    type: "DICT",
                    value: {}
                }]);
                return r.dict = x(I, e, t),
                r
            }
            function M(e) {
                var t = new F.Record("Top DICT INDEX",[{
                    name: "topDicts",
                    type: "INDEX",
                    value: []
                }]);
                return t.topDicts = [{
                    name: "topDict_0",
                    type: "TABLE",
                    value: e
                }],
                t
            }
            function C(e) {
                var t = new F.Record("String INDEX",[{
                    name: "strings",
                    type: "INDEX",
                    value: []
                }]);
                t.strings = [];
                for (var r = 0; r < e.length; r += 1)
                    t.strings.push({
                        name: "string_" + r,
                        type: "STRING",
                        value: e[r]
                    });
                return t
            }
            function T() {
                return new F.Record("Global Subr INDEX",[{
                    name: "subrs",
                    type: "INDEX",
                    value: []
                }])
            }
            function E(e, t) {
                for (var r = new F.Record("Charsets",[{
                    name: "format",
                    type: "Card8",
                    value: 0
                }]), a = 0; a < e.length; a += 1) {
                    var n = y(e[a], t);
                    r.fields.push({
                        name: "glyph_" + a,
                        type: "SID",
                        value: n
                    })
                }
                return r
            }
            function k(e) {
                var t = []
                  , r = e.path;
                t.push({
                    name: "width",
                    type: "NUMBER",
                    value: e.advanceWidth
                });
                for (var a = 0, n = 0, i = 0; i < r.commands.length; i += 1) {
                    var s, o, l = r.commands[i];
                    if ("Q" === l.type) {
                        l = {
                            type: "C",
                            x: l.x,
                            y: l.y,
                            x1: 1 / 3 * a + 2 / 3 * l.x1,
                            y1: 1 / 3 * n + 2 / 3 * l.y1,
                            x2: 1 / 3 * l.x + 2 / 3 * l.x1,
                            y2: 1 / 3 * l.y + 2 / 3 * l.y1
                        }
                    }
                    if ("M" === l.type)
                        s = Math.round(l.x - a),
                        o = Math.round(l.y - n),
                        t.push({
                            name: "dx",
                            type: "NUMBER",
                            value: s
                        }),
                        t.push({
                            name: "dy",
                            type: "NUMBER",
                            value: o
                        }),
                        t.push({
                            name: "rmoveto",
                            type: "OP",
                            value: 21
                        }),
                        a = Math.round(l.x),
                        n = Math.round(l.y);
                    else if ("L" === l.type)
                        s = Math.round(l.x - a),
                        o = Math.round(l.y - n),
                        t.push({
                            name: "dx",
                            type: "NUMBER",
                            value: s
                        }),
                        t.push({
                            name: "dy",
                            type: "NUMBER",
                            value: o
                        }),
                        t.push({
                            name: "rlineto",
                            type: "OP",
                            value: 5
                        }),
                        a = Math.round(l.x),
                        n = Math.round(l.y);
                    else if ("C" === l.type) {
                        var c = Math.round(l.x1 - a)
                          , p = Math.round(l.y1 - n)
                          , h = Math.round(l.x2 - l.x1)
                          , u = Math.round(l.y2 - l.y1);
                        s = Math.round(l.x - l.x2),
                        o = Math.round(l.y - l.y2),
                        t.push({
                            name: "dx1",
                            type: "NUMBER",
                            value: c
                        }),
                        t.push({
                            name: "dy1",
                            type: "NUMBER",
                            value: p
                        }),
                        t.push({
                            name: "dx2",
                            type: "NUMBER",
                            value: h
                        }),
                        t.push({
                            name: "dy2",
                            type: "NUMBER",
                            value: u
                        }),
                        t.push({
                            name: "dx",
                            type: "NUMBER",
                            value: s
                        }),
                        t.push({
                            name: "dy",
                            type: "NUMBER",
                            value: o
                        }),
                        t.push({
                            name: "rrcurveto",
                            type: "OP",
                            value: 8
                        }),
                        a = Math.round(l.x),
                        n = Math.round(l.y)
                    }
                }
                return t.push({
                    name: "endchar",
                    type: "OP",
                    value: 14
                }),
                t
            }
            function S(e) {
                for (var t = new F.Record("CharStrings INDEX",[{
                    name: "charStrings",
                    type: "INDEX",
                    value: []
                }]), r = 0; r < e.length; r += 1) {
                    var a = e.get(r)
                      , n = k(a);
                    t.charStrings.push({
                        name: a.name,
                        type: "CHARSTRING",
                        value: n
                    })
                }
                return t
            }
            function O(e, t) {
                var r = new F.Record("Private DICT",[{
                    name: "dict",
                    type: "DICT",
                    value: {}
                }]);
                return r.dict = x(U, e, t),
                r
            }
            var R = e("../encoding")
              , j = e("../glyphset")
              , Z = e("../parse")
              , H = e("../path")
              , F = e("../table")
              , I = [{
                name: "version",
                op: 0,
                type: "SID"
            }, {
                name: "notice",
                op: 1,
                type: "SID"
            }, {
                name: "copyright",
                op: 1200,
                type: "SID"
            }, {
                name: "fullName",
                op: 2,
                type: "SID"
            }, {
                name: "familyName",
                op: 3,
                type: "SID"
            }, {
                name: "weight",
                op: 4,
                type: "SID"
            }, {
                name: "isFixedPitch",
                op: 1201,
                type: "number",
                value: 0
            }, {
                name: "italicAngle",
                op: 1202,
                type: "number",
                value: 0
            }, {
                name: "underlinePosition",
                op: 1203,
                type: "number",
                value: -100
            }, {
                name: "underlineThickness",
                op: 1204,
                type: "number",
                value: 50
            }, {
                name: "paintType",
                op: 1205,
                type: "number",
                value: 0
            }, {
                name: "charstringType",
                op: 1206,
                type: "number",
                value: 2
            }, {
                name: "fontMatrix",
                op: 1207,
                type: ["real", "real", "real", "real", "real", "real"],
                value: [.001, 0, 0, .001, 0, 0]
            }, {
                name: "uniqueId",
                op: 13,
                type: "number"
            }, {
                name: "fontBBox",
                op: 5,
                type: ["number", "number", "number", "number"],
                value: [0, 0, 0, 0]
            }, {
                name: "strokeWidth",
                op: 1208,
                type: "number",
                value: 0
            }, {
                name: "xuid",
                op: 14,
                type: [],
                value: null
            }, {
                name: "charset",
                op: 15,
                type: "offset",
                value: 0
            }, {
                name: "encoding",
                op: 16,
                type: "offset",
                value: 0
            }, {
                name: "charStrings",
                op: 17,
                type: "offset",
                value: 0
            }, {
                name: "private",
                op: 18,
                type: ["number", "offset"],
                value: [0, 0]
            }]
              , U = [{
                name: "subrs",
                op: 19,
                type: "offset",
                value: 0
            }, {
                name: "defaultWidthX",
                op: 20,
                type: "number",
                value: 0
            }, {
                name: "nominalWidthX",
                op: 21,
                type: "number",
                value: 0
            }];
            r.parse = function(e, t, r) {
                r.tables.cff = {};
                var a = n(e, n(e, h(e, t).endOffset, Z.bytesToString).endOffset)
                  , i = n(e, a.endOffset, Z.bytesToString)
                  , s = n(e, i.endOffset);
                r.gsubrs = s.objects,
                r.gsubrsBias = v(r.gsubrs);
                var o = u(new DataView(new Uint8Array(a.objects[0]).buffer), i.objects);
                r.tables.cff.topDict = o;
                var l = t + o.private[1]
                  , c = d(e, l, o.private[0], i.objects);
                if (r.defaultWidthX = c.defaultWidthX,
                r.nominalWidthX = c.nominalWidthX,
                0 !== c.subrs) {
                    var p = n(e, l + c.subrs);
                    r.subrs = p.objects,
                    r.subrsBias = v(r.subrs)
                } else
                    r.subrs = [],
                    r.subrsBias = 0;
                var y = n(e, t + o.charStrings);
                r.nGlyphs = y.objects.length;
                var b = f(e, t + o.charset, r.nGlyphs, i.objects);
                0 === o.encoding ? r.cffEncoding = new R.CffEncoding(R.cffStandardEncoding,b) : 1 === o.encoding ? r.cffEncoding = new R.CffEncoding(R.cffExpertEncoding,b) : r.cffEncoding = m(e, t + o.encoding, b),
                r.encoding = r.encoding || r.cffEncoding,
                r.glyphs = new j.GlyphSet(r);
                for (var P = 0; P < r.nGlyphs; P += 1) {
                    var x = y.objects[P];
                    r.glyphs.push(P, j.cffGlyphLoader(r, P, g, x))
                }
            }
            ,
            r.make = function(e, t) {
                for (var r, a = new F.Table("CFF ",[{
                    name: "header",
                    type: "RECORD"
                }, {
                    name: "nameIndex",
                    type: "RECORD"
                }, {
                    name: "topDictIndex",
                    type: "RECORD"
                }, {
                    name: "stringIndex",
                    type: "RECORD"
                }, {
                    name: "globalSubrIndex",
                    type: "RECORD"
                }, {
                    name: "charsets",
                    type: "RECORD"
                }, {
                    name: "charStringsIndex",
                    type: "RECORD"
                }, {
                    name: "privateDict",
                    type: "RECORD"
                }]), n = 1 / t.unitsPerEm, i = {
                    version: t.version,
                    fullName: t.fullName,
                    familyName: t.familyName,
                    weight: t.weightName,
                    fontBBox: t.fontBBox || [0, 0, 0, 0],
                    fontMatrix: [n, 0, 0, n, 0, 0],
                    charset: 999,
                    encoding: 0,
                    charStrings: 999,
                    private: [0, 999]
                }, s = {}, o = [], l = 1; l < e.length; l += 1)
                    r = e.get(l),
                    o.push(r.name);
                var c = [];
                a.header = b(),
                a.nameIndex = P([t.postScriptName]);
                var p = w(i, c);
                a.topDictIndex = M(p),
                a.globalSubrIndex = T(),
                a.charsets = E(o, c),
                a.charStringsIndex = S(e),
                a.privateDict = O(s, c),
                a.stringIndex = C(c);
                var h = a.header.sizeOf() + a.nameIndex.sizeOf() + a.topDictIndex.sizeOf() + a.stringIndex.sizeOf() + a.globalSubrIndex.sizeOf();
                return i.charset = h,
                i.encoding = 0,
                i.charStrings = i.charset + a.charsets.sizeOf(),
                i.private[1] = i.charStrings + a.charStringsIndex.sizeOf(),
                p = w(i, c),
                a.topDictIndex = M(p),
                a
            }
        }
        , {
            "../encoding": 5,
            "../glyphset": 8,
            "../parse": 11,
            "../path": 12,
            "../table": 14
        }],
        16: [function(e, t, r) {
            function a(e, t) {
                var r;
                t.parseUShort(),
                e.length = t.parseULong(),
                e.language = t.parseULong();
                var a;
                for (e.groupCount = a = t.parseULong(),
                e.glyphIndexMap = {},
                r = 0; r < a; r += 1)
                    for (var n = t.parseULong(), i = t.parseULong(), s = t.parseULong(), o = n; o <= i; o += 1)
                        e.glyphIndexMap[o] = s,
                        s++
            }
            function n(e, t, r, a, n) {
                var i;
                e.length = t.parseUShort(),
                e.language = t.parseUShort();
                var s;
                e.segCount = s = t.parseUShort() >> 1,
                t.skip("uShort", 3),
                e.glyphIndexMap = {};
                var o = new l.Parser(r,a + n + 14)
                  , c = new l.Parser(r,a + n + 16 + 2 * s)
                  , p = new l.Parser(r,a + n + 16 + 4 * s)
                  , h = new l.Parser(r,a + n + 16 + 6 * s)
                  , u = a + n + 16 + 8 * s;
                for (i = 0; i < s - 1; i += 1)
                    for (var d, f = o.parseUShort(), m = c.parseUShort(), g = p.parseShort(), v = h.parseUShort(), y = m; y <= f; y += 1)
                        0 !== v ? (u = h.offset + h.relativeOffset - 2,
                        u += v,
                        u += 2 * (y - m),
                        0 !== (d = l.getUShort(r, u)) && (d = d + g & 65535)) : d = y + g & 65535,
                        e.glyphIndexMap[y] = d
            }
            function i(e, t, r) {
                e.segments.push({
                    end: t,
                    start: t,
                    delta: -(t - r),
                    offset: 0
                })
            }
            function s(e) {
                e.segments.push({
                    end: 65535,
                    start: 65535,
                    delta: 1,
                    offset: 0
                })
            }
            var o = e("../check")
              , l = e("../parse")
              , c = e("../table");
            r.parse = function(e, t) {
                var r, i = {};
                i.version = l.getUShort(e, t),
                o.argument(0 === i.version, "cmap table version should be 0."),
                i.numTables = l.getUShort(e, t + 2);
                var s = -1;
                for (r = i.numTables - 1; r >= 0; r -= 1) {
                    var c = l.getUShort(e, t + 4 + 8 * r)
                      , p = l.getUShort(e, t + 4 + 8 * r + 2);
                    if (3 === c && (0 === p || 1 === p || 10 === p)) {
                        s = l.getULong(e, t + 4 + 8 * r + 4);
                        break
                    }
                }
                if (-1 === s)
                    return null;
                var h = new l.Parser(e,t + s);
                if (i.format = h.parseUShort(),
                12 === i.format)
                    a(i, h);
                else {
                    if (4 !== i.format)
                        throw new Error("Only format 4 and 12 cmap tables are supported.");
                    n(i, h, e, t, s)
                }
                return i
            }
            ,
            r.make = function(e) {
                var t, r = new c.Table("cmap",[{
                    name: "version",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "numTables",
                    type: "USHORT",
                    value: 1
                }, {
                    name: "platformID",
                    type: "USHORT",
                    value: 3
                }, {
                    name: "encodingID",
                    type: "USHORT",
                    value: 1
                }, {
                    name: "offset",
                    type: "ULONG",
                    value: 12
                }, {
                    name: "format",
                    type: "USHORT",
                    value: 4
                }, {
                    name: "length",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "language",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "segCountX2",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "searchRange",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "entrySelector",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "rangeShift",
                    type: "USHORT",
                    value: 0
                }]);
                for (r.segments = [],
                t = 0; t < e.length; t += 1) {
                    for (var a = e.get(t), n = 0; n < a.unicodes.length; n += 1)
                        i(r, a.unicodes[n], t);
                    r.segments = r.segments.sort(function(e, t) {
                        return e.start - t.start
                    })
                }
                s(r);
                var o;
                o = r.segments.length,
                r.segCountX2 = 2 * o,
                r.searchRange = 2 * Math.pow(2, Math.floor(Math.log(o) / Math.log(2))),
                r.entrySelector = Math.log(r.searchRange / 2) / Math.log(2),
                r.rangeShift = r.segCountX2 - r.searchRange;
                var l = []
                  , p = []
                  , h = []
                  , u = []
                  , d = [];
                for (t = 0; t < o; t += 1) {
                    var f = r.segments[t];
                    l = l.concat({
                        name: "end_" + t,
                        type: "USHORT",
                        value: f.end
                    }),
                    p = p.concat({
                        name: "start_" + t,
                        type: "USHORT",
                        value: f.start
                    }),
                    h = h.concat({
                        name: "idDelta_" + t,
                        type: "SHORT",
                        value: f.delta
                    }),
                    u = u.concat({
                        name: "idRangeOffset_" + t,
                        type: "USHORT",
                        value: f.offset
                    }),
                    void 0 !== f.glyphId && (d = d.concat({
                        name: "glyph_" + t,
                        type: "USHORT",
                        value: f.glyphId
                    }))
                }
                return r.fields = r.fields.concat(l),
                r.fields.push({
                    name: "reservedPad",
                    type: "USHORT",
                    value: 0
                }),
                r.fields = r.fields.concat(p),
                r.fields = r.fields.concat(h),
                r.fields = r.fields.concat(u),
                r.fields = r.fields.concat(d),
                r.length = 14 + 2 * l.length + 2 + 2 * p.length + 2 * h.length + 2 * u.length + 2 * d.length,
                r
            }
        }
        , {
            "../check": 3,
            "../parse": 11,
            "../table": 14
        }],
        17: [function(e, t, r) {
            function a(e, t) {
                var r = JSON.stringify(e)
                  , a = 256;
                for (var n in t) {
                    var i = parseInt(n);
                    if (i && !(i < 256)) {
                        if (JSON.stringify(t[n]) === r)
                            return i;
                        a <= i && (a = i + 1)
                    }
                }
                return t[a] = e,
                a
            }
            function n(e, t, r) {
                var n = a(t.name, r);
                return [{
                    name: "tag_" + e,
                    type: "TAG",
                    value: t.tag
                }, {
                    name: "minValue_" + e,
                    type: "FIXED",
                    value: t.minValue << 16
                }, {
                    name: "defaultValue_" + e,
                    type: "FIXED",
                    value: t.defaultValue << 16
                }, {
                    name: "maxValue_" + e,
                    type: "FIXED",
                    value: t.maxValue << 16
                }, {
                    name: "flags_" + e,
                    type: "USHORT",
                    value: 0
                }, {
                    name: "nameID_" + e,
                    type: "USHORT",
                    value: n
                }]
            }
            function i(e, t, r) {
                var a = {}
                  , n = new c.Parser(e,t);
                return a.tag = n.parseTag(),
                a.minValue = n.parseFixed(),
                a.defaultValue = n.parseFixed(),
                a.maxValue = n.parseFixed(),
                n.skip("uShort", 1),
                a.name = r[n.parseUShort()] || {},
                a
            }
            function s(e, t, r, n) {
                for (var i = [{
                    name: "nameID_" + e,
                    type: "USHORT",
                    value: a(t.name, n)
                }, {
                    name: "flags_" + e,
                    type: "USHORT",
                    value: 0
                }], s = 0; s < r.length; ++s) {
                    var o = r[s].tag;
                    i.push({
                        name: "axis_" + e + " " + o,
                        type: "FIXED",
                        value: t.coordinates[o] << 16
                    })
                }
                return i
            }
            function o(e, t, r, a) {
                var n = {}
                  , i = new c.Parser(e,t);
                n.name = a[i.parseUShort()] || {},
                i.skip("uShort", 1),
                n.coordinates = {};
                for (var s = 0; s < r.length; ++s)
                    n.coordinates[r[s].tag] = i.parseFixed();
                return n
            }
            var l = e("../check")
              , c = e("../parse")
              , p = e("../table");
            r.make = function(e, t) {
                var r = new p.Table("fvar",[{
                    name: "version",
                    type: "ULONG",
                    value: 65536
                }, {
                    name: "offsetToData",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "countSizePairs",
                    type: "USHORT",
                    value: 2
                }, {
                    name: "axisCount",
                    type: "USHORT",
                    value: e.axes.length
                }, {
                    name: "axisSize",
                    type: "USHORT",
                    value: 20
                }, {
                    name: "instanceCount",
                    type: "USHORT",
                    value: e.instances.length
                }, {
                    name: "instanceSize",
                    type: "USHORT",
                    value: 4 + 4 * e.axes.length
                }]);
                r.offsetToData = r.sizeOf();
                for (var a = 0; a < e.axes.length; a++)
                    r.fields = r.fields.concat(n(a, e.axes[a], t));
                for (var i = 0; i < e.instances.length; i++)
                    r.fields = r.fields.concat(s(i, e.instances[i], e.axes, t));
                return r
            }
            ,
            r.parse = function(e, t, r) {
                var a = new c.Parser(e,t)
                  , n = a.parseULong();
                l.argument(65536 === n, "Unsupported fvar table version.");
                var s = a.parseOffset16();
                a.skip("uShort", 1);
                for (var p = a.parseUShort(), h = a.parseUShort(), u = a.parseUShort(), d = a.parseUShort(), f = [], m = 0; m < p; m++)
                    f.push(i(e, t + s + m * h, r));
                for (var g = [], v = t + s + p * h, y = 0; y < u; y++)
                    g.push(o(e, v + y * d, f, r));
                return {
                    axes: f,
                    instances: g
                }
            }
        }
        , {
            "../check": 3,
            "../parse": 11,
            "../table": 14
        }],
        18: [function(e, t, r) {
            function a(e, t, r, a, n) {
                var i;
                return (t & a) > 0 ? (i = e.parseByte(),
                0 == (t & n) && (i = -i),
                i = r + i) : i = (t & n) > 0 ? r : r + e.parseShort(),
                i
            }
            function n(e, t, r) {
                var n = new h.Parser(t,r);
                e.numberOfContours = n.parseShort(),
                e._xMin = n.parseShort(),
                e._yMin = n.parseShort(),
                e._xMax = n.parseShort(),
                e._yMax = n.parseShort();
                var i, s;
                if (e.numberOfContours > 0) {
                    var o, l = e.endPointIndices = [];
                    for (o = 0; o < e.numberOfContours; o += 1)
                        l.push(n.parseUShort());
                    for (e.instructionLength = n.parseUShort(),
                    e.instructions = [],
                    o = 0; o < e.instructionLength; o += 1)
                        e.instructions.push(n.parseByte());
                    var p = l[l.length - 1] + 1;
                    for (i = [],
                    o = 0; o < p; o += 1)
                        if (s = n.parseByte(),
                        i.push(s),
                        (8 & s) > 0)
                            for (var u = n.parseByte(), d = 0; d < u; d += 1)
                                i.push(s),
                                o += 1;
                    if (c.argument(i.length === p, "Bad flags."),
                    l.length > 0) {
                        var f, m = [];
                        if (p > 0) {
                            for (o = 0; o < p; o += 1)
                                s = i[o],
                                (f = {}).onCurve = !!(1 & s),
                                f.lastPointOfContour = l.indexOf(o) >= 0,
                                m.push(f);
                            var g = 0;
                            for (o = 0; o < p; o += 1)
                                s = i[o],
                                (f = m[o]).x = a(n, s, g, 2, 16),
                                g = f.x;
                            var v = 0;
                            for (o = 0; o < p; o += 1)
                                s = i[o],
                                (f = m[o]).y = a(n, s, v, 4, 32),
                                v = f.y
                        }
                        e.points = m
                    } else
                        e.points = []
                } else if (0 === e.numberOfContours)
                    e.points = [];
                else {
                    e.isComposite = !0,
                    e.points = [],
                    e.components = [];
                    for (var y = !0; y; ) {
                        i = n.parseUShort();
                        var b = {
                            glyphIndex: n.parseUShort(),
                            xScale: 1,
                            scale01: 0,
                            scale10: 0,
                            yScale: 1,
                            dx: 0,
                            dy: 0
                        };
                        (1 & i) > 0 ? (2 & i) > 0 ? (b.dx = n.parseShort(),
                        b.dy = n.parseShort()) : b.matchedPoints = [n.parseUShort(), n.parseUShort()] : (2 & i) > 0 ? (b.dx = n.parseChar(),
                        b.dy = n.parseChar()) : b.matchedPoints = [n.parseByte(), n.parseByte()],
                        (8 & i) > 0 ? b.xScale = b.yScale = n.parseF2Dot14() : (64 & i) > 0 ? (b.xScale = n.parseF2Dot14(),
                        b.yScale = n.parseF2Dot14()) : (128 & i) > 0 && (b.xScale = n.parseF2Dot14(),
                        b.scale01 = n.parseF2Dot14(),
                        b.scale10 = n.parseF2Dot14(),
                        b.yScale = n.parseF2Dot14()),
                        e.components.push(b),
                        y = !!(32 & i)
                    }
                }
            }
            function i(e, t) {
                for (var r = [], a = 0; a < e.length; a += 1) {
                    var n = e[a]
                      , i = {
                        x: t.xScale * n.x + t.scale01 * n.y + t.dx,
                        y: t.scale10 * n.x + t.yScale * n.y + t.dy,
                        onCurve: n.onCurve,
                        lastPointOfContour: n.lastPointOfContour
                    };
                    r.push(i)
                }
                return r
            }
            function s(e) {
                for (var t = [], r = [], a = 0; a < e.length; a += 1) {
                    var n = e[a];
                    r.push(n),
                    n.lastPointOfContour && (t.push(r),
                    r = [])
                }
                return c.argument(0 === r.length, "There are still points left in the current contour."),
                t
            }
            function o(e) {
                var t = new u.Path;
                if (!e)
                    return t;
                for (var r = s(e), a = 0; a < r.length; a += 1) {
                    var n, i, o = r[a], l = o[0], c = o[o.length - 1];
                    l.onCurve ? (n = null,
                    i = !0) : (n = l = c.onCurve ? c : {
                        x: (l.x + c.x) / 2,
                        y: (l.y + c.y) / 2
                    },
                    i = !1),
                    t.moveTo(l.x, l.y);
                    for (var p = i ? 1 : 0; p < o.length; p += 1) {
                        var h = o[p]
                          , d = 0 === p ? l : o[p - 1];
                        if (d.onCurve && h.onCurve)
                            t.lineTo(h.x, h.y);
                        else if (d.onCurve && !h.onCurve)
                            n = h;
                        else if (d.onCurve || h.onCurve) {
                            if (d.onCurve || !h.onCurve)
                                throw new Error("Invalid state.");
                            t.quadraticCurveTo(n.x, n.y, h.x, h.y),
                            n = null
                        } else {
                            var f = {
                                x: (d.x + h.x) / 2,
                                y: (d.y + h.y) / 2
                            };
                            t.quadraticCurveTo(d.x, d.y, f.x, f.y),
                            n = h
                        }
                    }
                    l !== c && (n ? t.quadraticCurveTo(n.x, n.y, l.x, l.y) : t.lineTo(l.x, l.y))
                }
                return t.closePath(),
                t
            }
            function l(e, t) {
                if (t.isComposite)
                    for (var r = 0; r < t.components.length; r += 1) {
                        var a = t.components[r]
                          , n = e.get(a.glyphIndex);
                        if (n.getPath(),
                        n.points) {
                            var s;
                            if (void 0 === a.matchedPoints)
                                s = i(n.points, a);
                            else {
                                if (a.matchedPoints[0] > t.points.length - 1 || a.matchedPoints[1] > n.points.length - 1)
                                    throw Error("Matched points out of range in " + t.name);
                                var l = t.points[a.matchedPoints[0]]
                                  , c = n.points[a.matchedPoints[1]]
                                  , p = {
                                    xScale: a.xScale,
                                    scale01: a.scale01,
                                    scale10: a.scale10,
                                    yScale: a.yScale,
                                    dx: 0,
                                    dy: 0
                                };
                                c = i([c], p)[0],
                                p.dx = l.x - c.x,
                                p.dy = l.y - c.y,
                                s = i(n.points, p)
                            }
                            t.points = t.points.concat(s)
                        }
                    }
                return o(t.points)
            }
            var c = e("../check")
              , p = e("../glyphset")
              , h = e("../parse")
              , u = e("../path");
            r.parse = function(e, t, r, a) {
                var i, s = new p.GlyphSet(a);
                for (i = 0; i < r.length - 1; i += 1) {
                    var o = r[i];
                    o !== r[i + 1] ? s.push(i, p.ttfGlyphLoader(a, i, n, e, t + o, l)) : s.push(i, p.glyphLoader(a, i))
                }
                return s
            }
        }
        , {
            "../check": 3,
            "../glyphset": 8,
            "../parse": 11,
            "../path": 12
        }],
        19: [function(e, t, r) {
            function a(e, t) {
                for (var r = new c.Parser(e,t), a = r.parseUShort(), n = [], i = 0; i < a; i++)
                    n[r.parseTag()] = {
                        offset: r.parseUShort()
                    };
                return n
            }
            function n(e, t) {
                var r = new c.Parser(e,t)
                  , a = r.parseUShort()
                  , n = r.parseUShort();
                if (1 === a)
                    return r.parseUShortList(n);
                if (2 === a) {
                    for (var i = []; n--; )
                        for (var s = r.parseUShort(), o = r.parseUShort(), l = r.parseUShort(), p = s; p <= o; p++)
                            i[l++] = p;
                    return i
                }
            }
            function i(e, t) {
                var r = new c.Parser(e,t)
                  , a = r.parseUShort();
                if (1 === a) {
                    var n = r.parseUShort()
                      , i = r.parseUShort()
                      , s = r.parseUShortList(i);
                    return function(e) {
                        return s[e - n] || 0
                    }
                }
                if (2 === a) {
                    for (var o = r.parseUShort(), l = [], p = [], h = [], u = 0; u < o; u++)
                        l[u] = r.parseUShort(),
                        p[u] = r.parseUShort(),
                        h[u] = r.parseUShort();
                    return function(e) {
                        for (var t = 0, r = l.length - 1; t < r; ) {
                            var a = t + r + 1 >> 1;
                            e < l[a] ? r = a - 1 : t = a
                        }
                        return l[t] <= e && e <= p[t] ? h[t] || 0 : 0
                    }
                }
            }
            function s(e, t) {
                var r, a = new c.Parser(e,t), s = a.parseUShort(), o = n(e, t + a.parseUShort()), l = a.parseUShort(), p = a.parseUShort();
                if (4 === l && 0 === p) {
                    var h = {};
                    if (1 === s) {
                        for (var u = a.parseUShort(), d = [], f = a.parseOffset16List(u), m = 0; m < u; m++) {
                            var g = f[m]
                              , v = h[g];
                            if (!v) {
                                v = {},
                                a.relativeOffset = g;
                                for (var y = a.parseUShort(); y--; ) {
                                    var b = a.parseUShort();
                                    l && (r = a.parseShort()),
                                    p && a.parseShort(),
                                    v[b] = r
                                }
                            }
                            d[o[m]] = v
                        }
                        return function(e, t) {
                            var r = d[e];
                            if (r)
                                return r[t]
                        }
                    }
                    if (2 === s) {
                        for (var P = a.parseUShort(), x = a.parseUShort(), w = a.parseUShort(), M = a.parseUShort(), C = i(e, t + P), T = i(e, t + x), E = [], k = 0; k < w; k++)
                            for (var S = E[k] = [], O = 0; O < M; O++)
                                l && (r = a.parseShort()),
                                p && a.parseShort(),
                                S[O] = r;
                        var R = {};
                        for (k = 0; k < o.length; k++)
                            R[o[k]] = 1;
                        return function(e, t) {
                            if (R[e]) {
                                var r = C(e)
                                  , a = T(t)
                                  , n = E[r];
                                return n ? n[a] : void 0
                            }
                        }
                    }
                }
            }
            function o(e, t) {
                var r = new c.Parser(e,t)
                  , a = r.parseUShort()
                  , n = r.parseUShort()
                  , i = 16 & n
                  , o = r.parseUShort()
                  , l = r.parseOffset16List(o)
                  , p = {
                    lookupType: a,
                    lookupFlag: n,
                    markFilteringSet: i ? r.parseUShort() : -1
                };
                if (2 === a) {
                    for (var h = [], u = 0; u < o; u++)
                        h.push(s(e, t + l[u]));
                    p.getKerningValue = function(e, t) {
                        for (var r = h.length; r--; ) {
                            var a = h[r](e, t);
                            if (void 0 !== a)
                                return a
                        }
                        return 0
                    }
                }
                return p
            }
            var l = e("../check")
              , c = e("../parse");
            r.parse = function(e, t, r) {
                var n = new c.Parser(e,t)
                  , i = n.parseFixed();
                l.argument(1 === i, "Unsupported GPOS table version."),
                a(e, t + n.parseUShort()),
                a(e, t + n.parseUShort());
                var s = n.parseUShort();
                n.relativeOffset = s;
                for (var p = n.parseUShort(), h = n.parseOffset16List(p), u = t + s, d = 0; d < p; d++) {
                    var f = o(e, u + h[d]);
                    2 !== f.lookupType || r.getGposKerningValue || (r.getGposKerningValue = f.getKerningValue)
                }
            }
        }
        , {
            "../check": 3,
            "../parse": 11
        }],
        20: [function(e, t, r) {
            var a = e("../check")
              , n = e("../parse").Parser
              , i = new Array(9)
              , s = e("../table");
            i[1] = function() {
                var e = this.offset + this.relativeOffset
                  , t = this.parseUShort();
                return 1 === t ? {
                    substFormat: 1,
                    coverage: this.parsePointer(n.coverage),
                    deltaGlyphId: this.parseUShort()
                } : 2 === t ? {
                    substFormat: 2,
                    coverage: this.parsePointer(n.coverage),
                    substitute: this.parseOffset16List()
                } : void a.assert(!1, "0x" + e.toString(16) + ": lookup type 1 format must be 1 or 2.")
            }
            ,
            i[2] = function() {
                var e = this.parseUShort();
                return a.argument(1 === e, "GSUB Multiple Substitution Subtable identifier-format must be 1"),
                {
                    substFormat: e,
                    coverage: this.parsePointer(n.coverage),
                    sequences: this.parseListOfLists()
                }
            }
            ,
            i[3] = function() {
                var e = this.parseUShort();
                return a.argument(1 === e, "GSUB Alternate Substitution Subtable identifier-format must be 1"),
                {
                    substFormat: e,
                    coverage: this.parsePointer(n.coverage),
                    alternateSets: this.parseListOfLists()
                }
            }
            ,
            i[4] = function() {
                var e = this.parseUShort();
                return a.argument(1 === e, "GSUB ligature table identifier-format must be 1"),
                {
                    substFormat: e,
                    coverage: this.parsePointer(n.coverage),
                    ligatureSets: this.parseListOfLists(function() {
                        return {
                            ligGlyph: this.parseUShort(),
                            components: this.parseUShortList(this.parseUShort() - 1)
                        }
                    })
                }
            }
            ;
            var o = {
                sequenceIndex: n.uShort,
                lookupListIndex: n.uShort
            };
            i[5] = function() {
                var e = this.offset + this.relativeOffset
                  , t = this.parseUShort();
                if (1 === t)
                    return {
                        substFormat: t,
                        coverage: this.parsePointer(n.coverage),
                        ruleSets: this.parseListOfLists(function() {
                            var e = this.parseUShort()
                              , t = this.parseUShort();
                            return {
                                input: this.parseUShortList(e - 1),
                                lookupRecords: this.parseRecordList(t, o)
                            }
                        })
                    };
                if (2 === t)
                    return {
                        substFormat: t,
                        coverage: this.parsePointer(n.coverage),
                        classDef: this.parsePointer(n.classDef),
                        classSets: this.parseListOfLists(function() {
                            var e = this.parseUShort()
                              , t = this.parseUShort();
                            return {
                                classes: this.parseUShortList(e - 1),
                                lookupRecords: this.parseRecordList(t, o)
                            }
                        })
                    };
                if (3 === t) {
                    var r = this.parseUShort()
                      , i = this.parseUShort();
                    return {
                        substFormat: t,
                        coverages: this.parseList(r, n.pointer(n.coverage)),
                        lookupRecords: this.parseRecordList(i, o)
                    }
                }
                a.assert(!1, "0x" + e.toString(16) + ": lookup type 5 format must be 1, 2 or 3.")
            }
            ,
            i[6] = function() {
                var e = this.offset + this.relativeOffset
                  , t = this.parseUShort();
                return 1 === t ? {
                    substFormat: 1,
                    coverage: this.parsePointer(n.coverage),
                    chainRuleSets: this.parseListOfLists(function() {
                        return {
                            backtrack: this.parseUShortList(),
                            input: this.parseUShortList(this.parseShort() - 1),
                            lookahead: this.parseUShortList(),
                            lookupRecords: this.parseRecordList(o)
                        }
                    })
                } : 2 === t ? {
                    substFormat: 2,
                    coverage: this.parsePointer(n.coverage),
                    backtrackClassDef: this.parsePointer(n.classDef),
                    inputClassDef: this.parsePointer(n.classDef),
                    lookaheadClassDef: this.parsePointer(n.classDef),
                    chainClassSet: this.parseListOfLists(function() {
                        return {
                            backtrack: this.parseUShortList(),
                            input: this.parseUShortList(this.parseShort() - 1),
                            lookahead: this.parseUShortList(),
                            lookupRecords: this.parseRecordList(o)
                        }
                    })
                } : 3 === t ? {
                    substFormat: 3,
                    backtrackCoverage: this.parseList(n.pointer(n.coverage)),
                    inputCoverage: this.parseList(n.pointer(n.coverage)),
                    lookaheadCoverage: this.parseList(n.pointer(n.coverage)),
                    lookupRecords: this.parseRecordList(o)
                } : void a.assert(!1, "0x" + e.toString(16) + ": lookup type 6 format must be 1, 2 or 3.")
            }
            ,
            i[7] = function() {
                var e = this.parseUShort();
                a.argument(1 === e, "GSUB Extension Substitution subtable identifier-format must be 1");
                var t = this.parseUShort()
                  , r = new n(this.data,this.offset + this.parseULong());
                return {
                    substFormat: 1,
                    lookupType: t,
                    extension: i[t].call(r)
                }
            }
            ,
            i[8] = function() {
                var e = this.parseUShort();
                return a.argument(1 === e, "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),
                {
                    substFormat: e,
                    coverage: this.parsePointer(n.coverage),
                    backtrackCoverage: this.parseList(n.pointer(n.coverage)),
                    lookaheadCoverage: this.parseList(n.pointer(n.coverage)),
                    substitutes: this.parseUShortList()
                }
            }
            ;
            var l = new Array(9);
            l[1] = function(e) {
                return 1 === e.substFormat ? new s.Table("substitutionTable",[{
                    name: "substFormat",
                    type: "USHORT",
                    value: 1
                }, {
                    name: "coverage",
                    type: "TABLE",
                    value: new s.Coverage(e.coverage)
                }, {
                    name: "deltaGlyphID",
                    type: "USHORT",
                    value: e.deltaGlyphId
                }]) : new s.Table("substitutionTable",[{
                    name: "substFormat",
                    type: "USHORT",
                    value: 2
                }, {
                    name: "coverage",
                    type: "TABLE",
                    value: new s.Coverage(e.coverage)
                }].concat(s.ushortList("substitute", e.substitute)))
            }
            ,
            l[3] = function(e) {
                return a.assert(1 === e.substFormat, "Lookup type 3 substFormat must be 1."),
                new s.Table("substitutionTable",[{
                    name: "substFormat",
                    type: "USHORT",
                    value: 1
                }, {
                    name: "coverage",
                    type: "TABLE",
                    value: new s.Coverage(e.coverage)
                }].concat(s.tableList("altSet", e.alternateSets, function(e) {
                    return new s.Table("alternateSetTable",s.ushortList("alternate", e))
                })))
            }
            ,
            l[4] = function(e) {
                return a.assert(1 === e.substFormat, "Lookup type 4 substFormat must be 1."),
                new s.Table("substitutionTable",[{
                    name: "substFormat",
                    type: "USHORT",
                    value: 1
                }, {
                    name: "coverage",
                    type: "TABLE",
                    value: new s.Coverage(e.coverage)
                }].concat(s.tableList("ligSet", e.ligatureSets, function(e) {
                    return new s.Table("ligatureSetTable",s.tableList("ligature", e, function(e) {
                        return new s.Table("ligatureTable",[{
                            name: "ligGlyph",
                            type: "USHORT",
                            value: e.ligGlyph
                        }].concat(s.ushortList("component", e.components, e.components.length + 1)))
                    }))
                })))
            }
            ,
            r.parse = function(e, t) {
                var r = new n(e,t = t || 0)
                  , s = r.parseVersion();
                return a.argument(1 === s, "Unsupported GSUB table version."),
                {
                    version: s,
                    scripts: r.parseScriptList(),
                    features: r.parseFeatureList(),
                    lookups: r.parseLookupList(i)
                }
            }
            ,
            r.make = function(e) {
                return new s.Table("GSUB",[{
                    name: "version",
                    type: "ULONG",
                    value: 65536
                }, {
                    name: "scripts",
                    type: "TABLE",
                    value: new s.ScriptList(e.scripts)
                }, {
                    name: "features",
                    type: "TABLE",
                    value: new s.FeatureList(e.features)
                }, {
                    name: "lookups",
                    type: "TABLE",
                    value: new s.LookupList(e.lookups,l)
                }])
            }
        }
        , {
            "../check": 3,
            "../parse": 11,
            "../table": 14
        }],
        21: [function(e, t, r) {
            var a = e("../check")
              , n = e("../parse")
              , i = e("../table");
            r.parse = function(e, t) {
                var r = {}
                  , i = new n.Parser(e,t);
                return r.version = i.parseVersion(),
                r.fontRevision = Math.round(1e3 * i.parseFixed()) / 1e3,
                r.checkSumAdjustment = i.parseULong(),
                r.magicNumber = i.parseULong(),
                a.argument(1594834165 === r.magicNumber, "Font header has wrong magic number."),
                r.flags = i.parseUShort(),
                r.unitsPerEm = i.parseUShort(),
                r.created = i.parseLongDateTime(),
                r.modified = i.parseLongDateTime(),
                r.xMin = i.parseShort(),
                r.yMin = i.parseShort(),
                r.xMax = i.parseShort(),
                r.yMax = i.parseShort(),
                r.macStyle = i.parseUShort(),
                r.lowestRecPPEM = i.parseUShort(),
                r.fontDirectionHint = i.parseShort(),
                r.indexToLocFormat = i.parseShort(),
                r.glyphDataFormat = i.parseShort(),
                r
            }
            ,
            r.make = function(e) {
                var t = Math.round((new Date).getTime() / 1e3) + 2082844800
                  , r = t;
                return e.createdTimestamp && (r = e.createdTimestamp + 2082844800),
                new i.Table("head",[{
                    name: "version",
                    type: "FIXED",
                    value: 65536
                }, {
                    name: "fontRevision",
                    type: "FIXED",
                    value: 65536
                }, {
                    name: "checkSumAdjustment",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "magicNumber",
                    type: "ULONG",
                    value: 1594834165
                }, {
                    name: "flags",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "unitsPerEm",
                    type: "USHORT",
                    value: 1e3
                }, {
                    name: "created",
                    type: "LONGDATETIME",
                    value: r
                }, {
                    name: "modified",
                    type: "LONGDATETIME",
                    value: t
                }, {
                    name: "xMin",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "yMin",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "xMax",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "yMax",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "macStyle",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "lowestRecPPEM",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "fontDirectionHint",
                    type: "SHORT",
                    value: 2
                }, {
                    name: "indexToLocFormat",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "glyphDataFormat",
                    type: "SHORT",
                    value: 0
                }],e)
            }
        }
        , {
            "../check": 3,
            "../parse": 11,
            "../table": 14
        }],
        22: [function(e, t, r) {
            var a = e("../parse")
              , n = e("../table");
            r.parse = function(e, t) {
                var r = {}
                  , n = new a.Parser(e,t);
                return r.version = n.parseVersion(),
                r.ascender = n.parseShort(),
                r.descender = n.parseShort(),
                r.lineGap = n.parseShort(),
                r.advanceWidthMax = n.parseUShort(),
                r.minLeftSideBearing = n.parseShort(),
                r.minRightSideBearing = n.parseShort(),
                r.xMaxExtent = n.parseShort(),
                r.caretSlopeRise = n.parseShort(),
                r.caretSlopeRun = n.parseShort(),
                r.caretOffset = n.parseShort(),
                n.relativeOffset += 8,
                r.metricDataFormat = n.parseShort(),
                r.numberOfHMetrics = n.parseUShort(),
                r
            }
            ,
            r.make = function(e) {
                return new n.Table("hhea",[{
                    name: "version",
                    type: "FIXED",
                    value: 65536
                }, {
                    name: "ascender",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "descender",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "lineGap",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "advanceWidthMax",
                    type: "UFWORD",
                    value: 0
                }, {
                    name: "minLeftSideBearing",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "minRightSideBearing",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "xMaxExtent",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "caretSlopeRise",
                    type: "SHORT",
                    value: 1
                }, {
                    name: "caretSlopeRun",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "caretOffset",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "reserved1",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "reserved2",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "reserved3",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "reserved4",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "metricDataFormat",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "numberOfHMetrics",
                    type: "USHORT",
                    value: 0
                }],e)
            }
        }
        , {
            "../parse": 11,
            "../table": 14
        }],
        23: [function(e, t, r) {
            var a = e("../parse")
              , n = e("../table");
            r.parse = function(e, t, r, n, i) {
                for (var s, o, l = new a.Parser(e,t), c = 0; c < n; c += 1) {
                    c < r && (s = l.parseUShort(),
                    o = l.parseShort());
                    var p = i.get(c);
                    p.advanceWidth = s,
                    p.leftSideBearing = o
                }
            }
            ,
            r.make = function(e) {
                for (var t = new n.Table("hmtx",[]), r = 0; r < e.length; r += 1) {
                    var a = e.get(r)
                      , i = a.advanceWidth || 0
                      , s = a.leftSideBearing || 0;
                    t.fields.push({
                        name: "advanceWidth_" + r,
                        type: "USHORT",
                        value: i
                    }),
                    t.fields.push({
                        name: "leftSideBearing_" + r,
                        type: "SHORT",
                        value: s
                    })
                }
                return t
            }
        }
        , {
            "../parse": 11,
            "../table": 14
        }],
        24: [function(e, t, r) {
            function a(e) {
                var t = {};
                e.skip("uShort");
                var r = e.parseUShort();
                i.argument(0 === r, "Unsupported kern sub-table version."),
                e.skip("uShort", 2);
                var a = e.parseUShort();
                e.skip("uShort", 3);
                for (var n = 0; n < a; n += 1) {
                    var s = e.parseUShort()
                      , o = e.parseUShort()
                      , l = e.parseShort();
                    t[s + "," + o] = l
                }
                return t
            }
            function n(e) {
                var t = {};
                e.skip("uShort"),
                e.parseULong() > 1 && console.warn("Only the first kern subtable is supported."),
                e.skip("uLong");
                var r = 255 & e.parseUShort();
                if (e.skip("uShort"),
                0 === r) {
                    var a = e.parseUShort();
                    e.skip("uShort", 3);
                    for (var n = 0; n < a; n += 1) {
                        var i = e.parseUShort()
                          , s = e.parseUShort()
                          , o = e.parseShort();
                        t[i + "," + s] = o
                    }
                }
                return t
            }
            var i = e("../check")
              , s = e("../parse");
            r.parse = function(e, t) {
                var r = new s.Parser(e,t)
                  , i = r.parseUShort();
                if (0 === i)
                    return a(r);
                if (1 === i)
                    return n(r);
                throw new Error("Unsupported kern table version (" + i + ").")
            }
        }
        , {
            "../check": 3,
            "../parse": 11
        }],
        25: [function(e, t, r) {
            var a = e("../parse");
            r.parse = function(e, t, r, n) {
                for (var i = new a.Parser(e,t), s = n ? i.parseUShort : i.parseULong, o = [], l = 0; l < r + 1; l += 1) {
                    var c = s.call(i);
                    n && (c *= 2),
                    o.push(c)
                }
                return o
            }
        }
        , {
            "../parse": 11
        }],
        26: [function(e, t, r) {
            var a = e("../check")
              , n = e("../parse")
              , i = e("../table");
            r.make = function(e) {
                for (var t = new i.Table("ltag",[{
                    name: "version",
                    type: "ULONG",
                    value: 1
                }, {
                    name: "flags",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "numTags",
                    type: "ULONG",
                    value: e.length
                }]), r = "", a = 12 + 4 * e.length, n = 0; n < e.length; ++n) {
                    var s = r.indexOf(e[n]);
                    s < 0 && (s = r.length,
                    r += e[n]),
                    t.fields.push({
                        name: "offset " + n,
                        type: "USHORT",
                        value: a + s
                    }),
                    t.fields.push({
                        name: "length " + n,
                        type: "USHORT",
                        value: e[n].length
                    })
                }
                return t.fields.push({
                    name: "stringPool",
                    type: "CHARARRAY",
                    value: r
                }),
                t
            }
            ,
            r.parse = function(e, t) {
                var r = new n.Parser(e,t)
                  , i = r.parseULong();
                a.argument(1 === i, "Unsupported ltag table version."),
                r.skip("uLong", 1);
                for (var s = r.parseULong(), o = [], l = 0; l < s; l++) {
                    for (var c = "", p = t + r.parseUShort(), h = r.parseUShort(), u = p; u < p + h; ++u)
                        c += String.fromCharCode(e.getInt8(u));
                    o.push(c)
                }
                return o
            }
        }
        , {
            "../check": 3,
            "../parse": 11,
            "../table": 14
        }],
        27: [function(e, t, r) {
            var a = e("../parse")
              , n = e("../table");
            r.parse = function(e, t) {
                var r = {}
                  , n = new a.Parser(e,t);
                return r.version = n.parseVersion(),
                r.numGlyphs = n.parseUShort(),
                1 === r.version && (r.maxPoints = n.parseUShort(),
                r.maxContours = n.parseUShort(),
                r.maxCompositePoints = n.parseUShort(),
                r.maxCompositeContours = n.parseUShort(),
                r.maxZones = n.parseUShort(),
                r.maxTwilightPoints = n.parseUShort(),
                r.maxStorage = n.parseUShort(),
                r.maxFunctionDefs = n.parseUShort(),
                r.maxInstructionDefs = n.parseUShort(),
                r.maxStackElements = n.parseUShort(),
                r.maxSizeOfInstructions = n.parseUShort(),
                r.maxComponentElements = n.parseUShort(),
                r.maxComponentDepth = n.parseUShort()),
                r
            }
            ,
            r.make = function(e) {
                return new n.Table("maxp",[{
                    name: "version",
                    type: "FIXED",
                    value: 20480
                }, {
                    name: "numGlyphs",
                    type: "USHORT",
                    value: e
                }])
            }
        }
        , {
            "../parse": 11,
            "../table": 14
        }],
        28: [function(e, t, r) {
            var a = e("../types").decode
              , n = e("../check")
              , i = e("../parse")
              , s = e("../table");
            r.parse = function(e, t) {
                var r = new i.Parser(e,t)
                  , s = r.parseULong();
                n.argument(1 === s, "Unsupported META table version."),
                r.parseULong(),
                r.parseULong();
                for (var o = r.parseULong(), l = {}, c = 0; c < o; c++) {
                    var p = r.parseTag()
                      , h = r.parseULong()
                      , u = r.parseULong()
                      , d = a.UTF8(e, t + h, u);
                    l[p] = d
                }
                return l
            }
            ,
            r.make = function(e) {
                var t = Object.keys(e).length
                  , r = ""
                  , a = 16 + 12 * t
                  , n = new s.Table("meta",[{
                    name: "version",
                    type: "ULONG",
                    value: 1
                }, {
                    name: "flags",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "offset",
                    type: "ULONG",
                    value: a
                }, {
                    name: "numTags",
                    type: "ULONG",
                    value: t
                }]);
                for (var i in e) {
                    var o = r.length;
                    r += e[i],
                    n.fields.push({
                        name: "tag " + i,
                        type: "TAG",
                        value: i
                    }),
                    n.fields.push({
                        name: "offset " + i,
                        type: "ULONG",
                        value: a + o
                    }),
                    n.fields.push({
                        name: "length " + i,
                        type: "ULONG",
                        value: e[i].length
                    })
                }
                return n.fields.push({
                    name: "stringPool",
                    type: "CHARARRAY",
                    value: r
                }),
                n
            }
        }
        , {
            "../check": 3,
            "../parse": 11,
            "../table": 14,
            "../types": 33
        }],
        29: [function(e, t, r) {
            function a(e, t, r) {
                switch (e) {
                case 0:
                    if (65535 === t)
                        return "und";
                    if (r)
                        return r[t];
                    break;
                case 1:
                    return m[t];
                case 3:
                    return v[t]
                }
            }
            function n(e, t, r) {
                switch (e) {
                case 0:
                    return y;
                case 1:
                    return P[r] || b[t];
                case 3:
                    if (1 === t || 10 === t)
                        return y
                }
            }
            function i(e) {
                var t = {};
                for (var r in e)
                    t[e[r]] = parseInt(r);
                return t
            }
            function s(e, t, r, a, n, i) {
                return new d.Record("NameRecord",[{
                    name: "platformID",
                    type: "USHORT",
                    value: e
                }, {
                    name: "encodingID",
                    type: "USHORT",
                    value: t
                }, {
                    name: "languageID",
                    type: "USHORT",
                    value: r
                }, {
                    name: "nameID",
                    type: "USHORT",
                    value: a
                }, {
                    name: "length",
                    type: "USHORT",
                    value: n
                }, {
                    name: "offset",
                    type: "USHORT",
                    value: i
                }])
            }
            function o(e, t) {
                var r = e.length
                  , a = t.length - r + 1;
                e: for (var n = 0; n < a; n++)
                    for (; n < a; n++) {
                        for (var i = 0; i < r; i++)
                            if (t[n + i] !== e[i])
                                continue e;
                        return n
                    }
                return -1
            }
            function l(e, t) {
                var r = o(e, t);
                if (r < 0) {
                    r = t.length;
                    for (var a = 0, n = e.length; a < n; ++a)
                        t.push(e[a])
                }
                return r
            }
            var c = e("../types")
              , p = c.decode
              , h = c.encode
              , u = e("../parse")
              , d = e("../table")
              , f = ["copyright", "fontFamily", "fontSubfamily", "uniqueID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "manufacturerURL", "designerURL", "license", "licenseURL", "reserved", "preferredFamily", "preferredSubfamily", "compatibleFullName", "sampleText", "postScriptFindFontName", "wwsFamily", "wwsSubfamily"]
              , m = {
                0: "en",
                1: "fr",
                2: "de",
                3: "it",
                4: "nl",
                5: "sv",
                6: "es",
                7: "da",
                8: "pt",
                9: "no",
                10: "he",
                11: "ja",
                12: "ar",
                13: "fi",
                14: "el",
                15: "is",
                16: "mt",
                17: "tr",
                18: "hr",
                19: "zh-Hant",
                20: "ur",
                21: "hi",
                22: "th",
                23: "ko",
                24: "lt",
                25: "pl",
                26: "hu",
                27: "es",
                28: "lv",
                29: "se",
                30: "fo",
                31: "fa",
                32: "ru",
                33: "zh",
                34: "nl-BE",
                35: "ga",
                36: "sq",
                37: "ro",
                38: "cz",
                39: "sk",
                40: "si",
                41: "yi",
                42: "sr",
                43: "mk",
                44: "bg",
                45: "uk",
                46: "be",
                47: "uz",
                48: "kk",
                49: "az-Cyrl",
                50: "az-Arab",
                51: "hy",
                52: "ka",
                53: "mo",
                54: "ky",
                55: "tg",
                56: "tk",
                57: "mn-CN",
                58: "mn",
                59: "ps",
                60: "ks",
                61: "ku",
                62: "sd",
                63: "bo",
                64: "ne",
                65: "sa",
                66: "mr",
                67: "bn",
                68: "as",
                69: "gu",
                70: "pa",
                71: "or",
                72: "ml",
                73: "kn",
                74: "ta",
                75: "te",
                76: "si",
                77: "my",
                78: "km",
                79: "lo",
                80: "vi",
                81: "id",
                82: "tl",
                83: "ms",
                84: "ms-Arab",
                85: "am",
                86: "ti",
                87: "om",
                88: "so",
                89: "sw",
                90: "rw",
                91: "rn",
                92: "ny",
                93: "mg",
                94: "eo",
                128: "cy",
                129: "eu",
                130: "ca",
                131: "la",
                132: "qu",
                133: "gn",
                134: "ay",
                135: "tt",
                136: "ug",
                137: "dz",
                138: "jv",
                139: "su",
                140: "gl",
                141: "af",
                142: "br",
                143: "iu",
                144: "gd",
                145: "gv",
                146: "ga",
                147: "to",
                148: "el-polyton",
                149: "kl",
                150: "az",
                151: "nn"
            }
              , g = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 5,
                11: 1,
                12: 4,
                13: 0,
                14: 6,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 2,
                20: 4,
                21: 9,
                22: 21,
                23: 3,
                24: 29,
                25: 29,
                26: 29,
                27: 29,
                28: 29,
                29: 0,
                30: 0,
                31: 4,
                32: 7,
                33: 25,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 29,
                39: 29,
                40: 0,
                41: 5,
                42: 7,
                43: 7,
                44: 7,
                45: 7,
                46: 7,
                47: 7,
                48: 7,
                49: 7,
                50: 4,
                51: 24,
                52: 23,
                53: 7,
                54: 7,
                55: 7,
                56: 7,
                57: 27,
                58: 7,
                59: 4,
                60: 4,
                61: 4,
                62: 4,
                63: 26,
                64: 9,
                65: 9,
                66: 9,
                67: 13,
                68: 13,
                69: 11,
                70: 10,
                71: 12,
                72: 17,
                73: 16,
                74: 14,
                75: 15,
                76: 18,
                77: 19,
                78: 20,
                79: 22,
                80: 30,
                81: 0,
                82: 0,
                83: 0,
                84: 4,
                85: 28,
                86: 28,
                87: 28,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                128: 0,
                129: 0,
                130: 0,
                131: 0,
                132: 0,
                133: 0,
                134: 0,
                135: 7,
                136: 4,
                137: 26,
                138: 0,
                139: 0,
                140: 0,
                141: 0,
                142: 0,
                143: 28,
                144: 0,
                145: 0,
                146: 0,
                147: 0,
                148: 6,
                149: 0,
                150: 0,
                151: 0
            }
              , v = {
                1078: "af",
                1052: "sq",
                1156: "gsw",
                1118: "am",
                5121: "ar-DZ",
                15361: "ar-BH",
                3073: "ar",
                2049: "ar-IQ",
                11265: "ar-JO",
                13313: "ar-KW",
                12289: "ar-LB",
                4097: "ar-LY",
                6145: "ary",
                8193: "ar-OM",
                16385: "ar-QA",
                1025: "ar-SA",
                10241: "ar-SY",
                7169: "aeb",
                14337: "ar-AE",
                9217: "ar-YE",
                1067: "hy",
                1101: "as",
                2092: "az-Cyrl",
                1068: "az",
                1133: "ba",
                1069: "eu",
                1059: "be",
                2117: "bn",
                1093: "bn-IN",
                8218: "bs-Cyrl",
                5146: "bs",
                1150: "br",
                1026: "bg",
                1027: "ca",
                3076: "zh-HK",
                5124: "zh-MO",
                2052: "zh",
                4100: "zh-SG",
                1028: "zh-TW",
                1155: "co",
                1050: "hr",
                4122: "hr-BA",
                1029: "cs",
                1030: "da",
                1164: "prs",
                1125: "dv",
                2067: "nl-BE",
                1043: "nl",
                3081: "en-AU",
                10249: "en-BZ",
                4105: "en-CA",
                9225: "en-029",
                16393: "en-IN",
                6153: "en-IE",
                8201: "en-JM",
                17417: "en-MY",
                5129: "en-NZ",
                13321: "en-PH",
                18441: "en-SG",
                7177: "en-ZA",
                11273: "en-TT",
                2057: "en-GB",
                1033: "en",
                12297: "en-ZW",
                1061: "et",
                1080: "fo",
                1124: "fil",
                1035: "fi",
                2060: "fr-BE",
                3084: "fr-CA",
                1036: "fr",
                5132: "fr-LU",
                6156: "fr-MC",
                4108: "fr-CH",
                1122: "fy",
                1110: "gl",
                1079: "ka",
                3079: "de-AT",
                1031: "de",
                5127: "de-LI",
                4103: "de-LU",
                2055: "de-CH",
                1032: "el",
                1135: "kl",
                1095: "gu",
                1128: "ha",
                1037: "he",
                1081: "hi",
                1038: "hu",
                1039: "is",
                1136: "ig",
                1057: "id",
                1117: "iu",
                2141: "iu-Latn",
                2108: "ga",
                1076: "xh",
                1077: "zu",
                1040: "it",
                2064: "it-CH",
                1041: "ja",
                1099: "kn",
                1087: "kk",
                1107: "km",
                1158: "quc",
                1159: "rw",
                1089: "sw",
                1111: "kok",
                1042: "ko",
                1088: "ky",
                1108: "lo",
                1062: "lv",
                1063: "lt",
                2094: "dsb",
                1134: "lb",
                1071: "mk",
                2110: "ms-BN",
                1086: "ms",
                1100: "ml",
                1082: "mt",
                1153: "mi",
                1146: "arn",
                1102: "mr",
                1148: "moh",
                1104: "mn",
                2128: "mn-CN",
                1121: "ne",
                1044: "nb",
                2068: "nn",
                1154: "oc",
                1096: "or",
                1123: "ps",
                1045: "pl",
                1046: "pt",
                2070: "pt-PT",
                1094: "pa",
                1131: "qu-BO",
                2155: "qu-EC",
                3179: "qu",
                1048: "ro",
                1047: "rm",
                1049: "ru",
                9275: "smn",
                4155: "smj-NO",
                5179: "smj",
                3131: "se-FI",
                1083: "se",
                2107: "se-SE",
                8251: "sms",
                6203: "sma-NO",
                7227: "sms",
                1103: "sa",
                7194: "sr-Cyrl-BA",
                3098: "sr",
                6170: "sr-Latn-BA",
                2074: "sr-Latn",
                1132: "nso",
                1074: "tn",
                1115: "si",
                1051: "sk",
                1060: "sl",
                11274: "es-AR",
                16394: "es-BO",
                13322: "es-CL",
                9226: "es-CO",
                5130: "es-CR",
                7178: "es-DO",
                12298: "es-EC",
                17418: "es-SV",
                4106: "es-GT",
                18442: "es-HN",
                2058: "es-MX",
                19466: "es-NI",
                6154: "es-PA",
                15370: "es-PY",
                10250: "es-PE",
                20490: "es-PR",
                3082: "es",
                1034: "es",
                21514: "es-US",
                14346: "es-UY",
                8202: "es-VE",
                2077: "sv-FI",
                1053: "sv",
                1114: "syr",
                1064: "tg",
                2143: "tzm",
                1097: "ta",
                1092: "tt",
                1098: "te",
                1054: "th",
                1105: "bo",
                1055: "tr",
                1090: "tk",
                1152: "ug",
                1058: "uk",
                1070: "hsb",
                1056: "ur",
                2115: "uz-Cyrl",
                1091: "uz",
                1066: "vi",
                1106: "cy",
                1160: "wo",
                1157: "sah",
                1144: "ii",
                1130: "yo"
            }
              , y = "utf-16"
              , b = {
                0: "macintosh",
                1: "x-mac-japanese",
                2: "x-mac-chinesetrad",
                3: "x-mac-korean",
                6: "x-mac-greek",
                7: "x-mac-cyrillic",
                9: "x-mac-devanagai",
                10: "x-mac-gurmukhi",
                11: "x-mac-gujarati",
                12: "x-mac-oriya",
                13: "x-mac-bengali",
                14: "x-mac-tamil",
                15: "x-mac-telugu",
                16: "x-mac-kannada",
                17: "x-mac-malayalam",
                18: "x-mac-sinhalese",
                19: "x-mac-burmese",
                20: "x-mac-khmer",
                21: "x-mac-thai",
                22: "x-mac-lao",
                23: "x-mac-georgian",
                24: "x-mac-armenian",
                25: "x-mac-chinesesimp",
                26: "x-mac-tibetan",
                27: "x-mac-mongolian",
                28: "x-mac-ethiopic",
                29: "x-mac-ce",
                30: "x-mac-vietnamese",
                31: "x-mac-extarabic"
            }
              , P = {
                15: "x-mac-icelandic",
                17: "x-mac-turkish",
                18: "x-mac-croatian",
                24: "x-mac-ce",
                25: "x-mac-ce",
                26: "x-mac-ce",
                27: "x-mac-ce",
                28: "x-mac-ce",
                30: "x-mac-icelandic",
                37: "x-mac-romanian",
                38: "x-mac-ce",
                39: "x-mac-ce",
                40: "x-mac-ce",
                143: "x-mac-inuit",
                146: "x-mac-gaelic"
            };
            r.parse = function(e, t, r) {
                for (var i = {}, s = new u.Parser(e,t), o = s.parseUShort(), l = s.parseUShort(), c = s.offset + s.parseUShort(), h = 0; h < l; h++) {
                    var d = s.parseUShort()
                      , m = s.parseUShort()
                      , g = s.parseUShort()
                      , v = s.parseUShort()
                      , b = f[v] || v
                      , P = s.parseUShort()
                      , x = s.parseUShort()
                      , w = a(d, g, r)
                      , M = n(d, m, g);
                    if (void 0 !== M && void 0 !== w) {
                        var C;
                        if (C = M === y ? p.UTF16(e, c + x, P) : p.MACSTRING(e, c + x, P, M)) {
                            var T = i[b];
                            void 0 === T && (T = i[b] = {}),
                            T[w] = C
                        }
                    }
                }
                return 1 === o && s.parseUShort(),
                i
            }
            ,
            r.make = function(e, t) {
                var r, a = [], o = {}, c = i(f);
                for (var p in e) {
                    var u = c[p];
                    if (void 0 === u && (u = p),
                    r = parseInt(u),
                    isNaN(r))
                        throw new Error('Name table entry "' + p + '" does not exist, see nameTableNames for complete list.');
                    o[r] = e[p],
                    a.push(r)
                }
                for (var y = i(m), b = i(v), P = [], x = [], w = 0; w < a.length; w++) {
                    var M = o[r = a[w]];
                    for (var C in M) {
                        var T = M[C]
                          , E = 1
                          , k = y[C]
                          , S = g[k]
                          , O = n(E, S, k)
                          , R = h.MACSTRING(T, O);
                        void 0 === R && (E = 0,
                        (k = t.indexOf(C)) < 0 && (k = t.length,
                        t.push(C)),
                        S = 4,
                        R = h.UTF16(T));
                        var j = l(R, x);
                        P.push(s(E, S, k, r, R.length, j));
                        var Z = b[C];
                        if (void 0 !== Z) {
                            var H = h.UTF16(T)
                              , F = l(H, x);
                            P.push(s(3, 1, Z, r, H.length, F))
                        }
                    }
                }
                P.sort(function(e, t) {
                    return e.platformID - t.platformID || e.encodingID - t.encodingID || e.languageID - t.languageID || e.nameID - t.nameID
                });
                for (var I = new d.Table("name",[{
                    name: "format",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "count",
                    type: "USHORT",
                    value: P.length
                }, {
                    name: "stringOffset",
                    type: "USHORT",
                    value: 6 + 12 * P.length
                }]), U = 0; U < P.length; U++)
                    I.fields.push({
                        name: "record_" + U,
                        type: "RECORD",
                        value: P[U]
                    });
                return I.fields.push({
                    name: "strings",
                    type: "LITERAL",
                    value: x
                }),
                I
            }
        }
        , {
            "../parse": 11,
            "../table": 14,
            "../types": 33
        }],
        30: [function(e, t, r) {
            var a = e("../parse")
              , n = e("../table")
              , i = [{
                begin: 0,
                end: 127
            }, {
                begin: 128,
                end: 255
            }, {
                begin: 256,
                end: 383
            }, {
                begin: 384,
                end: 591
            }, {
                begin: 592,
                end: 687
            }, {
                begin: 688,
                end: 767
            }, {
                begin: 768,
                end: 879
            }, {
                begin: 880,
                end: 1023
            }, {
                begin: 11392,
                end: 11519
            }, {
                begin: 1024,
                end: 1279
            }, {
                begin: 1328,
                end: 1423
            }, {
                begin: 1424,
                end: 1535
            }, {
                begin: 42240,
                end: 42559
            }, {
                begin: 1536,
                end: 1791
            }, {
                begin: 1984,
                end: 2047
            }, {
                begin: 2304,
                end: 2431
            }, {
                begin: 2432,
                end: 2559
            }, {
                begin: 2560,
                end: 2687
            }, {
                begin: 2688,
                end: 2815
            }, {
                begin: 2816,
                end: 2943
            }, {
                begin: 2944,
                end: 3071
            }, {
                begin: 3072,
                end: 3199
            }, {
                begin: 3200,
                end: 3327
            }, {
                begin: 3328,
                end: 3455
            }, {
                begin: 3584,
                end: 3711
            }, {
                begin: 3712,
                end: 3839
            }, {
                begin: 4256,
                end: 4351
            }, {
                begin: 6912,
                end: 7039
            }, {
                begin: 4352,
                end: 4607
            }, {
                begin: 7680,
                end: 7935
            }, {
                begin: 7936,
                end: 8191
            }, {
                begin: 8192,
                end: 8303
            }, {
                begin: 8304,
                end: 8351
            }, {
                begin: 8352,
                end: 8399
            }, {
                begin: 8400,
                end: 8447
            }, {
                begin: 8448,
                end: 8527
            }, {
                begin: 8528,
                end: 8591
            }, {
                begin: 8592,
                end: 8703
            }, {
                begin: 8704,
                end: 8959
            }, {
                begin: 8960,
                end: 9215
            }, {
                begin: 9216,
                end: 9279
            }, {
                begin: 9280,
                end: 9311
            }, {
                begin: 9312,
                end: 9471
            }, {
                begin: 9472,
                end: 9599
            }, {
                begin: 9600,
                end: 9631
            }, {
                begin: 9632,
                end: 9727
            }, {
                begin: 9728,
                end: 9983
            }, {
                begin: 9984,
                end: 10175
            }, {
                begin: 12288,
                end: 12351
            }, {
                begin: 12352,
                end: 12447
            }, {
                begin: 12448,
                end: 12543
            }, {
                begin: 12544,
                end: 12591
            }, {
                begin: 12592,
                end: 12687
            }, {
                begin: 43072,
                end: 43135
            }, {
                begin: 12800,
                end: 13055
            }, {
                begin: 13056,
                end: 13311
            }, {
                begin: 44032,
                end: 55215
            }, {
                begin: 55296,
                end: 57343
            }, {
                begin: 67840,
                end: 67871
            }, {
                begin: 19968,
                end: 40959
            }, {
                begin: 57344,
                end: 63743
            }, {
                begin: 12736,
                end: 12783
            }, {
                begin: 64256,
                end: 64335
            }, {
                begin: 64336,
                end: 65023
            }, {
                begin: 65056,
                end: 65071
            }, {
                begin: 65040,
                end: 65055
            }, {
                begin: 65104,
                end: 65135
            }, {
                begin: 65136,
                end: 65279
            }, {
                begin: 65280,
                end: 65519
            }, {
                begin: 65520,
                end: 65535
            }, {
                begin: 3840,
                end: 4095
            }, {
                begin: 1792,
                end: 1871
            }, {
                begin: 1920,
                end: 1983
            }, {
                begin: 3456,
                end: 3583
            }, {
                begin: 4096,
                end: 4255
            }, {
                begin: 4608,
                end: 4991
            }, {
                begin: 5024,
                end: 5119
            }, {
                begin: 5120,
                end: 5759
            }, {
                begin: 5760,
                end: 5791
            }, {
                begin: 5792,
                end: 5887
            }, {
                begin: 6016,
                end: 6143
            }, {
                begin: 6144,
                end: 6319
            }, {
                begin: 10240,
                end: 10495
            }, {
                begin: 40960,
                end: 42127
            }, {
                begin: 5888,
                end: 5919
            }, {
                begin: 66304,
                end: 66351
            }, {
                begin: 66352,
                end: 66383
            }, {
                begin: 66560,
                end: 66639
            }, {
                begin: 118784,
                end: 119039
            }, {
                begin: 119808,
                end: 120831
            }, {
                begin: 1044480,
                end: 1048573
            }, {
                begin: 65024,
                end: 65039
            }, {
                begin: 917504,
                end: 917631
            }, {
                begin: 6400,
                end: 6479
            }, {
                begin: 6480,
                end: 6527
            }, {
                begin: 6528,
                end: 6623
            }, {
                begin: 6656,
                end: 6687
            }, {
                begin: 11264,
                end: 11359
            }, {
                begin: 11568,
                end: 11647
            }, {
                begin: 19904,
                end: 19967
            }, {
                begin: 43008,
                end: 43055
            }, {
                begin: 65536,
                end: 65663
            }, {
                begin: 65856,
                end: 65935
            }, {
                begin: 66432,
                end: 66463
            }, {
                begin: 66464,
                end: 66527
            }, {
                begin: 66640,
                end: 66687
            }, {
                begin: 66688,
                end: 66735
            }, {
                begin: 67584,
                end: 67647
            }, {
                begin: 68096,
                end: 68191
            }, {
                begin: 119552,
                end: 119647
            }, {
                begin: 73728,
                end: 74751
            }, {
                begin: 119648,
                end: 119679
            }, {
                begin: 7040,
                end: 7103
            }, {
                begin: 7168,
                end: 7247
            }, {
                begin: 7248,
                end: 7295
            }, {
                begin: 43136,
                end: 43231
            }, {
                begin: 43264,
                end: 43311
            }, {
                begin: 43312,
                end: 43359
            }, {
                begin: 43520,
                end: 43615
            }, {
                begin: 65936,
                end: 65999
            }, {
                begin: 66e3,
                end: 66047
            }, {
                begin: 66208,
                end: 66271
            }, {
                begin: 127024,
                end: 127135
            }];
            r.unicodeRanges = i,
            r.getUnicodeRange = function(e) {
                for (var t = 0; t < i.length; t += 1) {
                    var r = i[t];
                    if (e >= r.begin && e < r.end)
                        return t
                }
                return -1
            }
            ,
            r.parse = function(e, t) {
                var r = {}
                  , n = new a.Parser(e,t);
                r.version = n.parseUShort(),
                r.xAvgCharWidth = n.parseShort(),
                r.usWeightClass = n.parseUShort(),
                r.usWidthClass = n.parseUShort(),
                r.fsType = n.parseUShort(),
                r.ySubscriptXSize = n.parseShort(),
                r.ySubscriptYSize = n.parseShort(),
                r.ySubscriptXOffset = n.parseShort(),
                r.ySubscriptYOffset = n.parseShort(),
                r.ySuperscriptXSize = n.parseShort(),
                r.ySuperscriptYSize = n.parseShort(),
                r.ySuperscriptXOffset = n.parseShort(),
                r.ySuperscriptYOffset = n.parseShort(),
                r.yStrikeoutSize = n.parseShort(),
                r.yStrikeoutPosition = n.parseShort(),
                r.sFamilyClass = n.parseShort(),
                r.panose = [];
                for (var i = 0; i < 10; i++)
                    r.panose[i] = n.parseByte();
                return r.ulUnicodeRange1 = n.parseULong(),
                r.ulUnicodeRange2 = n.parseULong(),
                r.ulUnicodeRange3 = n.parseULong(),
                r.ulUnicodeRange4 = n.parseULong(),
                r.achVendID = String.fromCharCode(n.parseByte(), n.parseByte(), n.parseByte(), n.parseByte()),
                r.fsSelection = n.parseUShort(),
                r.usFirstCharIndex = n.parseUShort(),
                r.usLastCharIndex = n.parseUShort(),
                r.sTypoAscender = n.parseShort(),
                r.sTypoDescender = n.parseShort(),
                r.sTypoLineGap = n.parseShort(),
                r.usWinAscent = n.parseUShort(),
                r.usWinDescent = n.parseUShort(),
                r.version >= 1 && (r.ulCodePageRange1 = n.parseULong(),
                r.ulCodePageRange2 = n.parseULong()),
                r.version >= 2 && (r.sxHeight = n.parseShort(),
                r.sCapHeight = n.parseShort(),
                r.usDefaultChar = n.parseUShort(),
                r.usBreakChar = n.parseUShort(),
                r.usMaxContent = n.parseUShort()),
                r
            }
            ,
            r.make = function(e) {
                return new n.Table("OS/2",[{
                    name: "version",
                    type: "USHORT",
                    value: 3
                }, {
                    name: "xAvgCharWidth",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "usWeightClass",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "usWidthClass",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "fsType",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "ySubscriptXSize",
                    type: "SHORT",
                    value: 650
                }, {
                    name: "ySubscriptYSize",
                    type: "SHORT",
                    value: 699
                }, {
                    name: "ySubscriptXOffset",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "ySubscriptYOffset",
                    type: "SHORT",
                    value: 140
                }, {
                    name: "ySuperscriptXSize",
                    type: "SHORT",
                    value: 650
                }, {
                    name: "ySuperscriptYSize",
                    type: "SHORT",
                    value: 699
                }, {
                    name: "ySuperscriptXOffset",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "ySuperscriptYOffset",
                    type: "SHORT",
                    value: 479
                }, {
                    name: "yStrikeoutSize",
                    type: "SHORT",
                    value: 49
                }, {
                    name: "yStrikeoutPosition",
                    type: "SHORT",
                    value: 258
                }, {
                    name: "sFamilyClass",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "bFamilyType",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bSerifStyle",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bWeight",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bProportion",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bContrast",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bStrokeVariation",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bArmStyle",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bLetterform",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bMidline",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "bXHeight",
                    type: "BYTE",
                    value: 0
                }, {
                    name: "ulUnicodeRange1",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "ulUnicodeRange2",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "ulUnicodeRange3",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "ulUnicodeRange4",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "achVendID",
                    type: "CHARARRAY",
                    value: "XXXX"
                }, {
                    name: "fsSelection",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "usFirstCharIndex",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "usLastCharIndex",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "sTypoAscender",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "sTypoDescender",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "sTypoLineGap",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "usWinAscent",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "usWinDescent",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "ulCodePageRange1",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "ulCodePageRange2",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "sxHeight",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "sCapHeight",
                    type: "SHORT",
                    value: 0
                }, {
                    name: "usDefaultChar",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "usBreakChar",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "usMaxContext",
                    type: "USHORT",
                    value: 0
                }],e)
            }
        }
        , {
            "../parse": 11,
            "../table": 14
        }],
        31: [function(e, t, r) {
            var a = e("../encoding")
              , n = e("../parse")
              , i = e("../table");
            r.parse = function(e, t) {
                var r, i = {}, s = new n.Parser(e,t);
                switch (i.version = s.parseVersion(),
                i.italicAngle = s.parseFixed(),
                i.underlinePosition = s.parseShort(),
                i.underlineThickness = s.parseShort(),
                i.isFixedPitch = s.parseULong(),
                i.minMemType42 = s.parseULong(),
                i.maxMemType42 = s.parseULong(),
                i.minMemType1 = s.parseULong(),
                i.maxMemType1 = s.parseULong(),
                i.version) {
                case 1:
                    i.names = a.standardNames.slice();
                    break;
                case 2:
                    for (i.numberOfGlyphs = s.parseUShort(),
                    i.glyphNameIndex = new Array(i.numberOfGlyphs),
                    r = 0; r < i.numberOfGlyphs; r++)
                        i.glyphNameIndex[r] = s.parseUShort();
                    for (i.names = [],
                    r = 0; r < i.numberOfGlyphs; r++)
                        if (i.glyphNameIndex[r] >= a.standardNames.length) {
                            var o = s.parseChar();
                            i.names.push(s.parseString(o))
                        }
                    break;
                case 2.5:
                    for (i.numberOfGlyphs = s.parseUShort(),
                    i.offset = new Array(i.numberOfGlyphs),
                    r = 0; r < i.numberOfGlyphs; r++)
                        i.offset[r] = s.parseChar()
                }
                return i
            }
            ,
            r.make = function() {
                return new i.Table("post",[{
                    name: "version",
                    type: "FIXED",
                    value: 196608
                }, {
                    name: "italicAngle",
                    type: "FIXED",
                    value: 0
                }, {
                    name: "underlinePosition",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "underlineThickness",
                    type: "FWORD",
                    value: 0
                }, {
                    name: "isFixedPitch",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "minMemType42",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "maxMemType42",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "minMemType1",
                    type: "ULONG",
                    value: 0
                }, {
                    name: "maxMemType1",
                    type: "ULONG",
                    value: 0
                }])
            }
        }
        , {
            "../encoding": 5,
            "../parse": 11,
            "../table": 14
        }],
        32: [function(e, t, r) {
            function a(e) {
                return Math.log(e) / Math.log(2) | 0
            }
            function n(e) {
                for (; e.length % 4 != 0; )
                    e.push(0);
                for (var t = 0, r = 0; r < e.length; r += 4)
                    t += (e[r] << 24) + (e[r + 1] << 16) + (e[r + 2] << 8) + e[r + 3];
                return t %= Math.pow(2, 32)
            }
            function i(e, t, r, a) {
                return new p.Record("Table Record",[{
                    name: "tag",
                    type: "TAG",
                    value: void 0 !== e ? e : ""
                }, {
                    name: "checkSum",
                    type: "ULONG",
                    value: void 0 !== t ? t : 0
                }, {
                    name: "offset",
                    type: "ULONG",
                    value: void 0 !== r ? r : 0
                }, {
                    name: "length",
                    type: "ULONG",
                    value: void 0 !== a ? a : 0
                }])
            }
            function s(e) {
                var t = new p.Table("sfnt",[{
                    name: "version",
                    type: "TAG",
                    value: "OTTO"
                }, {
                    name: "numTables",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "searchRange",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "entrySelector",
                    type: "USHORT",
                    value: 0
                }, {
                    name: "rangeShift",
                    type: "USHORT",
                    value: 0
                }]);
                t.tables = e,
                t.numTables = e.length;
                var r = Math.pow(2, a(t.numTables));
                t.searchRange = 16 * r,
                t.entrySelector = a(r),
                t.rangeShift = 16 * t.numTables - t.searchRange;
                for (var s = [], o = [], l = t.sizeOf() + i().sizeOf() * t.numTables; l % 4 != 0; )
                    l += 1,
                    o.push({
                        name: "padding",
                        type: "BYTE",
                        value: 0
                    });
                for (var h = 0; h < e.length; h += 1) {
                    var u = e[h];
                    c.argument(4 === u.tableName.length, "Table name" + u.tableName + " is invalid.");
                    var d = u.sizeOf()
                      , f = i(u.tableName, n(u.encode()), l, d);
                    for (s.push({
                        name: f.tag + " Table Record",
                        type: "RECORD",
                        value: f
                    }),
                    o.push({
                        name: u.tableName + " table",
                        type: "RECORD",
                        value: u
                    }),
                    l += d,
                    c.argument(!isNaN(l), "Something went wrong calculating the offset."); l % 4 != 0; )
                        l += 1,
                        o.push({
                            name: "padding",
                            type: "BYTE",
                            value: 0
                        })
                }
                return s.sort(function(e, t) {
                    return e.value.tag > t.value.tag ? 1 : -1
                }),
                t.fields = t.fields.concat(s),
                t.fields = t.fields.concat(o),
                t
            }
            function o(e, t, r) {
                for (var a = 0; a < t.length; a += 1) {
                    var n = e.charToGlyphIndex(t[a]);
                    if (n > 0)
                        return e.glyphs.get(n).getMetrics()
                }
                return r
            }
            function l(e) {
                for (var t = 0, r = 0; r < e.length; r += 1)
                    t += e[r];
                return t / e.length
            }
            var c = e("../check")
              , p = e("../table")
              , h = e("./cmap")
              , u = e("./cff")
              , d = e("./head")
              , f = e("./hhea")
              , m = e("./hmtx")
              , g = e("./ltag")
              , v = e("./maxp")
              , y = e("./name")
              , b = e("./os2")
              , P = e("./post")
              , x = e("./gsub")
              , w = e("./meta");
            r.computeCheckSum = n,
            r.make = s,
            r.fontToTable = function(e) {
                for (var t, r = [], a = [], i = [], c = [], p = [], M = [], C = [], T = 0, E = 0, k = 0, S = 0, O = 0, R = 0; R < e.glyphs.length; R += 1) {
                    var j = e.glyphs.get(R)
                      , Z = 0 | j.unicode;
                    if (isNaN(j.advanceWidth))
                        throw new Error("Glyph " + j.name + " (" + R + "): advanceWidth is not a number.");
                    (t > Z || void 0 === t) && Z > 0 && (t = Z),
                    T < Z && (T = Z);
                    var H = b.getUnicodeRange(Z);
                    if (H < 32)
                        E |= 1 << H;
                    else if (H < 64)
                        k |= 1 << H - 32;
                    else if (H < 96)
                        S |= 1 << H - 64;
                    else {
                        if (!(H < 123))
                            throw new Error("Unicode ranges bits > 123 are reserved for internal usage");
                        O |= 1 << H - 96
                    }
                    if (".notdef" !== j.name) {
                        var F = j.getMetrics();
                        r.push(F.xMin),
                        a.push(F.yMin),
                        i.push(F.xMax),
                        c.push(F.yMax),
                        M.push(F.leftSideBearing),
                        C.push(F.rightSideBearing),
                        p.push(j.advanceWidth)
                    }
                }
                var I = {
                    xMin: Math.min.apply(null, r),
                    yMin: Math.min.apply(null, a),
                    xMax: Math.max.apply(null, i),
                    yMax: Math.max.apply(null, c),
                    advanceWidthMax: Math.max.apply(null, p),
                    advanceWidthAvg: l(p),
                    minLeftSideBearing: Math.min.apply(null, M),
                    maxLeftSideBearing: Math.max.apply(null, M),
                    minRightSideBearing: Math.min.apply(null, C)
                };
                I.ascender = e.ascender,
                I.descender = e.descender;
                var U = d.make({
                    flags: 3,
                    unitsPerEm: e.unitsPerEm,
                    xMin: I.xMin,
                    yMin: I.yMin,
                    xMax: I.xMax,
                    yMax: I.yMax,
                    lowestRecPPEM: 3,
                    createdTimestamp: e.createdTimestamp
                })
                  , L = f.make({
                    ascender: I.ascender,
                    descender: I.descender,
                    advanceWidthMax: I.advanceWidthMax,
                    minLeftSideBearing: I.minLeftSideBearing,
                    minRightSideBearing: I.minRightSideBearing,
                    xMaxExtent: I.maxLeftSideBearing + (I.xMax - I.xMin),
                    numberOfHMetrics: e.glyphs.length
                })
                  , $ = v.make(e.glyphs.length)
                  , A = b.make({
                    xAvgCharWidth: Math.round(I.advanceWidthAvg),
                    usWeightClass: e.tables.os2.usWeightClass,
                    usWidthClass: e.tables.os2.usWidthClass,
                    usFirstCharIndex: t,
                    usLastCharIndex: T,
                    ulUnicodeRange1: E,
                    ulUnicodeRange2: k,
                    ulUnicodeRange3: S,
                    ulUnicodeRange4: O,
                    fsSelection: e.tables.os2.fsSelection,
                    sTypoAscender: I.ascender,
                    sTypoDescender: I.descender,
                    sTypoLineGap: 0,
                    usWinAscent: I.yMax,
                    usWinDescent: Math.abs(I.yMin),
                    ulCodePageRange1: 1,
                    sxHeight: o(e, "xyvw", {
                        yMax: Math.round(I.ascender / 2)
                    }).yMax,
                    sCapHeight: o(e, "HIKLEFJMNTZBDPRAGOQSUVWXY", I).yMax,
                    usDefaultChar: e.hasChar(" ") ? 32 : 0,
                    usBreakChar: e.hasChar(" ") ? 32 : 0
                })
                  , D = m.make(e.glyphs)
                  , z = h.make(e.glyphs)
                  , B = e.getEnglishName("fontFamily")
                  , N = e.getEnglishName("fontSubfamily")
                  , _ = B + " " + N
                  , G = e.getEnglishName("postScriptName");
                G || (G = B.replace(/\s/g, "") + "-" + N);
                var V = {};
                for (var W in e.names)
                    V[W] = e.names[W];
                V.uniqueID || (V.uniqueID = {
                    en: e.getEnglishName("manufacturer") + ":" + _
                }),
                V.postScriptName || (V.postScriptName = {
                    en: G
                }),
                V.preferredFamily || (V.preferredFamily = e.names.fontFamily),
                V.preferredSubfamily || (V.preferredSubfamily = e.names.fontSubfamily);
                var q = []
                  , Y = y.make(V, q)
                  , X = q.length > 0 ? g.make(q) : void 0
                  , Q = P.make()
                  , J = u.make(e.glyphs, {
                    version: e.getEnglishName("version"),
                    fullName: _,
                    familyName: B,
                    weightName: N,
                    postScriptName: G,
                    unitsPerEm: e.unitsPerEm,
                    fontBBox: [0, I.yMin, I.ascender, I.advanceWidthMax]
                })
                  , K = e.metas && Object.keys(e.metas).length > 0 ? w.make(e.metas) : void 0
                  , ee = [U, L, $, A, Y, z, Q, J, D];
                X && ee.push(X),
                e.tables.gsub && ee.push(x.make(e.tables.gsub)),
                K && ee.push(K);
                var te = s(ee)
                  , re = n(te.encode())
                  , ae = te.fields
                  , ne = !1;
                for (R = 0; R < ae.length; R += 1)
                    if ("head table" === ae[R].name) {
                        ae[R].value.checkSumAdjustment = 2981146554 - re,
                        ne = !0;
                        break
                    }
                if (!ne)
                    throw new Error("Could not find head table with checkSum to adjust.");
                return te
            }
        }
        , {
            "../check": 3,
            "../table": 14,
            "./cff": 15,
            "./cmap": 16,
            "./gsub": 20,
            "./head": 21,
            "./hhea": 22,
            "./hmtx": 23,
            "./ltag": 26,
            "./maxp": 27,
            "./meta": 28,
            "./name": 29,
            "./os2": 30,
            "./post": 31
        }],
        33: [function(e, t, r) {
            function a(e) {
                return function() {
                    return e
                }
            }
            var n = e("./check")
              , i = {}
              , s = {}
              , o = {};
            s.BYTE = function(e) {
                return n.argument(e >= 0 && e <= 255, "Byte value should be between 0 and 255."),
                [e]
            }
            ,
            o.BYTE = a(1),
            s.CHAR = function(e) {
                return [e.charCodeAt(0)]
            }
            ,
            o.CHAR = a(1),
            s.CHARARRAY = function(e) {
                for (var t = [], r = 0; r < e.length; r += 1)
                    t[r] = e.charCodeAt(r);
                return t
            }
            ,
            o.CHARARRAY = function(e) {
                return e.length
            }
            ,
            s.USHORT = function(e) {
                return [e >> 8 & 255, 255 & e]
            }
            ,
            o.USHORT = a(2),
            s.SHORT = function(e) {
                return e >= 32768 && (e = -(65536 - e)),
                [e >> 8 & 255, 255 & e]
            }
            ,
            o.SHORT = a(2),
            s.UINT24 = function(e) {
                return [e >> 16 & 255, e >> 8 & 255, 255 & e]
            }
            ,
            o.UINT24 = a(3),
            s.ULONG = function(e) {
                return [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
            }
            ,
            o.ULONG = a(4),
            s.LONG = function(e) {
                return e >= 2147483648 && (e = -(4294967296 - e)),
                [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
            }
            ,
            o.LONG = a(4),
            s.FIXED = s.ULONG,
            o.FIXED = o.ULONG,
            s.FWORD = s.SHORT,
            o.FWORD = o.SHORT,
            s.UFWORD = s.USHORT,
            o.UFWORD = o.USHORT,
            s.LONGDATETIME = function(e) {
                return [0, 0, 0, 0, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
            }
            ,
            o.LONGDATETIME = a(8),
            s.TAG = function(e) {
                return n.argument(4 === e.length, "Tag should be exactly 4 ASCII characters."),
                [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]
            }
            ,
            o.TAG = a(4),
            s.Card8 = s.BYTE,
            o.Card8 = o.BYTE,
            s.Card16 = s.USHORT,
            o.Card16 = o.USHORT,
            s.OffSize = s.BYTE,
            o.OffSize = o.BYTE,
            s.SID = s.USHORT,
            o.SID = o.USHORT,
            s.NUMBER = function(e) {
                return e >= -107 && e <= 107 ? [e + 139] : e >= 108 && e <= 1131 ? (e -= 108,
                [247 + (e >> 8), 255 & e]) : e >= -1131 && e <= -108 ? (e = -e - 108,
                [251 + (e >> 8), 255 & e]) : e >= -32768 && e <= 32767 ? s.NUMBER16(e) : s.NUMBER32(e)
            }
            ,
            o.NUMBER = function(e) {
                return s.NUMBER(e).length
            }
            ,
            s.NUMBER16 = function(e) {
                return [28, e >> 8 & 255, 255 & e]
            }
            ,
            o.NUMBER16 = a(3),
            s.NUMBER32 = function(e) {
                return [29, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
            }
            ,
            o.NUMBER32 = a(5),
            s.REAL = function(e) {
                var t = e.toString()
                  , r = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t);
                if (r) {
                    var a = parseFloat("1e" + ((r[2] ? +r[2] : 0) + r[1].length));
                    t = (Math.round(e * a) / a).toString()
                }
                var n, i, s = "";
                for (n = 0,
                i = t.length; n < i; n += 1) {
                    var o = t[n];
                    s += "e" === o ? "-" === t[++n] ? "c" : "b" : "." === o ? "a" : "-" === o ? "e" : o
                }
                var l = [30];
                for (n = 0,
                i = (s += 1 & s.length ? "f" : "ff").length; n < i; n += 2)
                    l.push(parseInt(s.substr(n, 2), 16));
                return l
            }
            ,
            o.REAL = function(e) {
                return s.REAL(e).length
            }
            ,
            s.NAME = s.CHARARRAY,
            o.NAME = o.CHARARRAY,
            s.STRING = s.CHARARRAY,
            o.STRING = o.CHARARRAY,
            i.UTF8 = function(e, t, r) {
                for (var a = [], n = r, i = 0; i < n; i++,
                t += 1)
                    a[i] = e.getUint8(t);
                return String.fromCharCode.apply(null, a)
            }
            ,
            i.UTF16 = function(e, t, r) {
                for (var a = [], n = r / 2, i = 0; i < n; i++,
                t += 2)
                    a[i] = e.getUint16(t);
                return String.fromCharCode.apply(null, a)
            }
            ,
            s.UTF16 = function(e) {
                for (var t = [], r = 0; r < e.length; r += 1) {
                    var a = e.charCodeAt(r);
                    t[t.length] = a >> 8 & 255,
                    t[t.length] = 255 & a
                }
                return t
            }
            ,
            o.UTF16 = function(e) {
                return 2 * e.length
            }
            ;
            var l = {
                "x-mac-croatian": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ",
                "x-mac-cyrillic": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю",
                "x-mac-gaelic": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ",
                "x-mac-greek": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­",
                "x-mac-icelandic": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
                "x-mac-inuit": "ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł",
                "x-mac-ce": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",
                macintosh: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
                "x-mac-romanian": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
                "x-mac-turkish": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"
            };
            i.MACSTRING = function(e, t, r, a) {
                var n = l[a];
                if (void 0 !== n) {
                    for (var i = "", s = 0; s < r; s++) {
                        var o = e.getUint8(t + s);
                        i += o <= 127 ? String.fromCharCode(o) : n[127 & o]
                    }
                    return i
                }
            }
            ;
            var c, p = "function" == typeof WeakMap && new WeakMap, h = function(e) {
                if (!c) {
                    c = {};
                    for (var t in l)
                        c[t] = new String(t)
                }
                var r = c[e];
                if (void 0 !== r) {
                    if (p) {
                        var a = p.get(r);
                        if (void 0 !== a)
                            return a
                    }
                    var n = l[e];
                    if (void 0 !== n) {
                        for (var i = {}, s = 0; s < n.length; s++)
                            i[n.charCodeAt(s)] = s + 128;
                        return p && p.set(r, i),
                        i
                    }
                }
            };
            s.MACSTRING = function(e, t) {
                var r = h(t);
                if (void 0 !== r) {
                    for (var a = [], n = 0; n < e.length; n++) {
                        var i = e.charCodeAt(n);
                        if (i >= 128 && void 0 === (i = r[i]))
                            return;
                        a[n] = i
                    }
                    return a
                }
            }
            ,
            o.MACSTRING = function(e, t) {
                var r = s.MACSTRING(e, t);
                return void 0 !== r ? r.length : 0
            }
            ,
            s.INDEX = function(e) {
                var t, r = 1, a = [r], n = [];
                for (t = 0; t < e.length; t += 1) {
                    var i = s.OBJECT(e[t]);
                    Array.prototype.push.apply(n, i),
                    r += i.length,
                    a.push(r)
                }
                if (0 === n.length)
                    return [0, 0];
                var o = []
                  , l = 1 + Math.floor(Math.log(r) / Math.log(2)) / 8 | 0
                  , c = [void 0, s.BYTE, s.USHORT, s.UINT24, s.ULONG][l];
                for (t = 0; t < a.length; t += 1) {
                    var p = c(a[t]);
                    Array.prototype.push.apply(o, p)
                }
                return Array.prototype.concat(s.Card16(e.length), s.OffSize(l), o, n)
            }
            ,
            o.INDEX = function(e) {
                return s.INDEX(e).length
            }
            ,
            s.DICT = function(e) {
                for (var t = [], r = Object.keys(e), a = r.length, n = 0; n < a; n += 1) {
                    var i = parseInt(r[n], 0)
                      , o = e[i];
                    t = (t = t.concat(s.OPERAND(o.value, o.type))).concat(s.OPERATOR(i))
                }
                return t
            }
            ,
            o.DICT = function(e) {
                return s.DICT(e).length
            }
            ,
            s.OPERATOR = function(e) {
                return e < 1200 ? [e] : [12, e - 1200]
            }
            ,
            s.OPERAND = function(e, t) {
                var r = [];
                if (Array.isArray(t))
                    for (var a = 0; a < t.length; a += 1)
                        n.argument(e.length === t.length, "Not enough arguments given for type" + t),
                        r = r.concat(s.OPERAND(e[a], t[a]));
                else if ("SID" === t)
                    r = r.concat(s.NUMBER(e));
                else if ("offset" === t)
                    r = r.concat(s.NUMBER32(e));
                else if ("number" === t)
                    r = r.concat(s.NUMBER(e));
                else {
                    if ("real" !== t)
                        throw new Error("Unknown operand type " + t);
                    r = r.concat(s.REAL(e))
                }
                return r
            }
            ,
            s.OP = s.BYTE,
            o.OP = o.BYTE;
            var u = "function" == typeof WeakMap && new WeakMap;
            s.CHARSTRING = function(e) {
                if (u) {
                    var t = u.get(e);
                    if (void 0 !== t)
                        return t
                }
                for (var r = [], a = e.length, n = 0; n < a; n += 1) {
                    var i = e[n];
                    r = r.concat(s[i.type](i.value))
                }
                return u && u.set(e, r),
                r
            }
            ,
            o.CHARSTRING = function(e) {
                return s.CHARSTRING(e).length
            }
            ,
            s.OBJECT = function(e) {
                var t = s[e.type];
                return n.argument(void 0 !== t, "No encoding function for type " + e.type),
                t(e.value)
            }
            ,
            o.OBJECT = function(e) {
                var t = o[e.type];
                return n.argument(void 0 !== t, "No sizeOf function for type " + e.type),
                t(e.value)
            }
            ,
            s.TABLE = function(e) {
                var t, r = [], a = e.fields.length, i = [], o = [];
                for (t = 0; t < a; t += 1) {
                    var l = e.fields[t]
                      , c = s[l.type];
                    n.argument(void 0 !== c, "No encoding function for field type " + l.type + " (" + l.name + ")");
                    var p = e[l.name];
                    void 0 === p && (p = l.value);
                    var h = c(p);
                    "TABLE" === l.type ? (o.push(r.length),
                    r = r.concat([0, 0]),
                    i.push(h)) : r = r.concat(h)
                }
                for (t = 0; t < i.length; t += 1) {
                    var u = o[t]
                      , d = r.length;
                    n.argument(d < 65536, "Table " + e.tableName + " too big."),
                    r[u] = d >> 8,
                    r[u + 1] = 255 & d,
                    r = r.concat(i[t])
                }
                return r
            }
            ,
            o.TABLE = function(e) {
                for (var t = 0, r = e.fields.length, a = 0; a < r; a += 1) {
                    var i = e.fields[a]
                      , s = o[i.type];
                    n.argument(void 0 !== s, "No sizeOf function for field type " + i.type + " (" + i.name + ")");
                    var l = e[i.name];
                    void 0 === l && (l = i.value),
                    t += s(l),
                    "TABLE" === i.type && (t += 2)
                }
                return t
            }
            ,
            s.RECORD = s.TABLE,
            o.RECORD = o.TABLE,
            s.LITERAL = function(e) {
                return e
            }
            ,
            o.LITERAL = function(e) {
                return e.length
            }
            ,
            r.decode = i,
            r.encode = s,
            r.sizeOf = o
        }
        , {
            "./check": 3
        }],
        34: [function(e, t, r) {
            r.isBrowser = function() {
                return "undefined" != typeof window
            }
            ,
            r.isNode = function() {
                return "undefined" == typeof window
            }
            ,
            r.nodeBufferToArrayBuffer = function(e) {
                for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), a = 0; a < e.length; ++a)
                    r[a] = e[a];
                return t
            }
            ,
            r.arrayBufferToNodeBuffer = function(e) {
                for (var t = new Buffer(e.byteLength), r = new Uint8Array(e), a = 0; a < t.length; ++a)
                    t[a] = r[a];
                return t
            }
            ,
            r.checkArgument = function(e, t) {
                if (!e)
                    throw t
            }
        }
        , {}]
    }, {}, [10])(10)
}),
PZ.fonts = {
    list: [],
    parse: null
},
PZ.fonts.preset = ["absender", "adolphus", "aero matics", "another typewriter", "arual", "asenine", "baloo bhaina", "bebas", "bloody", "boston traffic", "carton six", "clemente pd", "droid sans", "fascinate inline", "griffy", "hamburger heaven", "inconsolata", "indie flower", "lobster", "nova oval", "old newspaper types", "orbitron", "permanent marker", "playfair display", "smudgestick", "the bold font", "timeless", "vt323"],
PZ.fonts.oldPreset = ["army rangers", "astro 867", "bebas", "blackout", "cheri", "chinese takeaway", "corpulent caps brk", "deanna", "duality", "ethnocentric rg", "fff forward", "fightthis", "hydrogen whiskey", "jandles", "kindergarten", "magic school one", "medabots", "minercraftory", "nasalization rg", "olivers barney", "pricedown bl", "ptf nordic rnd", "quadrangle", "radio stars", "reconstruct", "rexlia rg", "sf archery black", "sui generis rg", "squealer", "steelfish rg", "subatomic tsoonami", "teen", "vipnagorgialla", "world of water", "youre gone", "zekton rg"],
PZ.fonts.get = function(e) {
    for (var t = 0; t < this.list.length; t++)
        if (this.list[t].name === e)
            return this.list[t];
    return null
}
,
PZ.fonts.parseComplete = function(e) {
    for (var t = 0; t < e.callbacks.length; t++)
        e.callbacks[t](e.name, e.parsed),
        e.references++;
    delete e.callbacks,
    e.loaded = !0
}
,
PZ.fonts.load = function(e, t) {
    var r = this;
    if ("string" == typeof e) {
        if (null !== (s = r.get(e)))
            return void (!0 === s.loaded ? (s.references++,
            setTimeout(t, 0, s.name, s.parsed)) : s.callbacks.push(t));
        for (n = 0; n < r.preset.length; n++)
            if (r.preset[n] === e)
                return (s = {}).loaded = !1,
                s.references = 0,
                s.name = e,
                s.callbacks = [t],
                r.list.push(s),
                (i = new XMLHttpRequest).onload = function(t) {
                    200 === this.status ? (s.file = t.target.response,
                    r.parse(s, PZ.fonts.parseComplete.bind(r, s))) : r.unload(e)
                }
                ,
                i.onerror = function(t) {
                    r.unload(e)
                }
                ,
                i.open("GET", "assets/fonts/2d/" + e + ".ttf"),
                i.responseType = "blob",
                void i.send();
        var a = PZ.archive.getFile("font_" + e);
        if (void 0 !== a)
            (s = {}).loaded = !1,
            s.references = 0,
            s.name = e,
            s.callbacks = [t],
            s.file = new Blob([a.data]),
            r.list.push(s),
            r.parse(s, PZ.fonts.parseComplete.bind(r, s));
        else
            for (var n = 0; n < this.oldPreset.length; n++)
                if (this.oldPreset[n] === e) {
                    (s = {}).loaded = !1,
                    s.references = 0,
                    s.name = e,
                    s.callbacks = [t],
                    r.list.push(s);
                    var i = new XMLHttpRequest;
                    i.onload = function(e) {
                        200 === this.status && (s.file = e.target.response,
                        r.parse(s, PZ.fonts.parseComplete.bind(r, s)))
                    }
                    ,
                    i.open("GET", "assets/fonts/3d/" + e + ".json"),
                    i.responseType = "blob",
                    i.send()
                }
    } else {
        var s = {};
        s.loaded = !1,
        s.references = 0,
        s.callbacks = [t],
        s.file = e,
        r.list.push(s),
        r.parse(s, PZ.fonts.parseComplete.bind(r, s))
    }
}
,
PZ.fonts.save = function(e, t) {
    for (var r = 0; r < this.preset.length; r++)
        if (this.preset[r] === e)
            return void t();
    if (!1 === PZ.archive.fileExists("font_" + e)) {
        var a = this.get(e);
        if (null === a)
            return void t();
        PZ.archive.addFile("font_" + e, null);
        var n = PZ.archive.files[PZ.archive.files.length - 1]
          , i = new FileReader;
        i.onload = function(e) {
            n.data = new Uint8Array(e.target.result),
            t()
        }
        ,
        i.readAsArrayBuffer(a.file)
    } else
        t()
}
,
PZ.fonts.unload = function(e) {
    for (var t = 0; t < this.list.length; t++)
        if (this.list[t].name === e) {
            --this.list[t].references <= 0 && this.list.splice(t, 1);
            break
        }
}
,
PZ.loadingObject = function() {
    this.$listitem = null
}
,
PZ.loadingObject.prototype.pass = {
    enabled: !1
},
PZ.loadingObject.prototype.keyframeProps = null,
PZ.loadingObject.prototype.fx = [],
PZ.loadingObject.prototype.render = PZ.loadingObject.prototype.update = PZ.loadingObject.prototype.resize = PZ.loadingObject.prototype.unload = function() {}
,
PZ.loadingObject.prototype.select = function(e) {}
,
function(e) {
    function t() {
        console.log.apply(console, arguments)
    }
    function r(e, t) {
        var r;
        this.list = e,
        this.options = t = t || {};
        for (r in s)
            s.hasOwnProperty(r) && ("boolean" == typeof s[r] ? this.options[r] = r in t ? t[r] : s[r] : this.options[r] = t[r] || s[r])
    }
    function a(e, t, r) {
        var i, s, o, l, c, p;
        if (t) {
            if (-1 !== (o = t.indexOf(".")) ? (i = t.slice(0, o),
            s = t.slice(o + 1)) : i = t,
            null !== (l = e[i]) && void 0 !== l)
                if (s || "string" != typeof l && "number" != typeof l)
                    if (n(l))
                        for (c = 0,
                        p = l.length; c < p; c++)
                            a(l[c], s, r);
                    else
                        s && a(l, s, r);
                else
                    r.push(l)
        } else
            r.push(e);
        return r
    }
    function n(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    function i(e, t) {
        t = t || {},
        this.options = t,
        this.options.location = t.location || i.defaultOptions.location,
        this.options.distance = "distance"in t ? t.distance : i.defaultOptions.distance,
        this.options.threshold = "threshold"in t ? t.threshold : i.defaultOptions.threshold,
        this.options.maxPatternLength = t.maxPatternLength || i.defaultOptions.maxPatternLength,
        this.pattern = t.caseSensitive ? e : e.toLowerCase(),
        this.patternLen = e.length,
        this.patternLen <= this.options.maxPatternLength && (this.matchmask = 1 << this.patternLen - 1,
        this.patternAlphabet = this._calculatePatternAlphabet())
    }
    var s = {
        id: null,
        caseSensitive: !1,
        include: [],
        shouldSort: !0,
        searchFn: i,
        sortFn: function(e, t) {
            return e.score - t.score
        },
        getFn: a,
        keys: [],
        verbose: !1,
        tokenize: !1,
        matchAllTokens: !1,
        tokenSeparator: / +/g,
        minMatchCharLength: 1,
        findAllMatches: !1
    };
    r.VERSION = "2.6.0",
    r.prototype.set = function(e) {
        return this.list = e,
        e
    }
    ,
    r.prototype.search = function(e) {
        return this.options.verbose && t("\nSearch term:", e, "\n"),
        this.pattern = e,
        this.results = [],
        this.resultMap = {},
        this._keyMap = null,
        this._prepareSearchers(),
        this._startSearch(),
        this._computeScore(),
        this._sort(),
        this._format()
    }
    ,
    r.prototype._prepareSearchers = function() {
        var e = this.options
          , t = this.pattern
          , r = e.searchFn
          , a = t.split(e.tokenSeparator)
          , n = 0
          , i = a.length;
        if (this.options.tokenize)
            for (this.tokenSearchers = []; n < i; n++)
                this.tokenSearchers.push(new r(a[n],e));
        this.fullSeacher = new r(t,e)
    }
    ,
    r.prototype._startSearch = function() {
        var e, t, r, a, n = this.options.getFn, i = this.list, s = i.length, o = this.options.keys, l = o.length, c = null;
        if ("string" == typeof i[0])
            for (r = 0; r < s; r++)
                this._analyze("", i[r], r, r);
        else
            for (this._keyMap = {},
            r = 0; r < s; r++)
                for (c = i[r],
                a = 0; a < l; a++) {
                    if ("string" != typeof (e = o[a])) {
                        if (t = 1 - e.weight || 1,
                        this._keyMap[e.name] = {
                            weight: t
                        },
                        e.weight <= 0 || e.weight > 1)
                            throw new Error("Key weight has to be > 0 and <= 1");
                        e = e.name
                    } else
                        this._keyMap[e] = {
                            weight: 1
                        };
                    this._analyze(e, n(c, e, []), c, r)
                }
    }
    ,
    r.prototype._analyze = function(e, r, a, i) {
        var s, o, l, c, p, h, u, d, f, m, g, v, y, b, P, x = this.options, w = !1;
        if (void 0 !== r && null !== r) {
            o = [];
            var M = 0;
            if ("string" == typeof r) {
                if (s = r.split(x.tokenSeparator),
                x.verbose && t("---------\nKey:", e),
                this.options.tokenize) {
                    for (b = 0; b < this.tokenSearchers.length; b++) {
                        for (d = this.tokenSearchers[b],
                        x.verbose && t("Pattern:", d.pattern),
                        f = [],
                        v = !1,
                        P = 0; P < s.length; P++) {
                            m = s[P];
                            var C = {};
                            (g = d.search(m)).isMatch ? (C[m] = g.score,
                            w = !0,
                            v = !0,
                            o.push(g.score)) : (C[m] = 1,
                            this.options.matchAllTokens || o.push(1)),
                            f.push(C)
                        }
                        v && M++,
                        x.verbose && t("Token scores:", f)
                    }
                    for (c = o[0],
                    h = o.length,
                    b = 1; b < h; b++)
                        c += o[b];
                    c /= h,
                    x.verbose && t("Token score average:", c)
                }
                u = this.fullSeacher.search(r),
                x.verbose && t("Full text score:", u.score),
                p = u.score,
                void 0 !== c && (p = (p + c) / 2),
                x.verbose && t("Score average:", p),
                y = !this.options.tokenize || !this.options.matchAllTokens || M >= this.tokenSearchers.length,
                x.verbose && t("Check Matches", y),
                (w || u.isMatch) && y && ((l = this.resultMap[i]) ? l.output.push({
                    key: e,
                    score: p,
                    matchedIndices: u.matchedIndices
                }) : (this.resultMap[i] = {
                    item: a,
                    output: [{
                        key: e,
                        score: p,
                        matchedIndices: u.matchedIndices
                    }]
                },
                this.results.push(this.resultMap[i])))
            } else if (n(r))
                for (b = 0; b < r.length; b++)
                    this._analyze(e, r[b], a, i)
        }
    }
    ,
    r.prototype._computeScore = function() {
        var e, r, a, n, i, s, o, l, c = this._keyMap, p = this.results;
        for (this.options.verbose && t("\n\nComputing score:\n"),
        e = 0; e < p.length; e++) {
            for (a = 0,
            i = (n = p[e].output).length,
            o = 1,
            r = 0; r < i; r++)
                l = n[r].score * (s = c ? c[n[r].key].weight : 1),
                1 !== s ? o = Math.min(o, l) : (a += l,
                n[r].nScore = l);
            p[e].score = 1 === o ? a / i : o,
            this.options.verbose && t(p[e])
        }
    }
    ,
    r.prototype._sort = function() {
        var e = this.options;
        e.shouldSort && (e.verbose && t("\n\nSorting...."),
        this.results.sort(e.sortFn))
    }
    ,
    r.prototype._format = function() {
        var e, r, a, n, i, s = this.options, o = s.getFn, l = [], c = this.results, p = s.include;
        for (s.verbose && t("\n\nOutput:\n\n", c),
        n = s.id ? function(e) {
            c[e].item = o(c[e].item, s.id, [])[0]
        }
        : function() {}
        ,
        i = function(e) {
            var t, r, a, n, i, s = c[e];
            if (p.length > 0) {
                if (t = {
                    item: s.item
                },
                -1 !== p.indexOf("matches"))
                    for (a = s.output,
                    t.matches = [],
                    r = 0; r < a.length; r++)
                        i = {
                            indices: (n = a[r]).matchedIndices
                        },
                        n.key && (i.key = n.key),
                        t.matches.push(i);
                -1 !== p.indexOf("score") && (t.score = c[e].score)
            } else
                t = s.item;
            return t
        }
        ,
        r = 0,
        a = c.length; r < a; r++)
            n(r),
            e = i(r),
            l.push(e);
        return l
    }
    ,
    i.defaultOptions = {
        location: 0,
        distance: 100,
        threshold: .6,
        maxPatternLength: 32
    },
    i.prototype._calculatePatternAlphabet = function() {
        var e = {}
          , t = 0;
        for (t = 0; t < this.patternLen; t++)
            e[this.pattern.charAt(t)] = 0;
        for (t = 0; t < this.patternLen; t++)
            e[this.pattern.charAt(t)] |= 1 << this.pattern.length - t - 1;
        return e
    }
    ,
    i.prototype._bitapScore = function(e, t) {
        var r = e / this.patternLen
          , a = Math.abs(this.options.location - t);
        return this.options.distance ? r + a / this.options.distance : a ? 1 : r
    }
    ,
    i.prototype.search = function(e) {
        var t, r, a, n, i, s, o, l, c, p, h, u, d, f, m, g, v, y, b, P, x, w, M, C = this.options;
        if (e = C.caseSensitive ? e : e.toLowerCase(),
        this.pattern === e)
            return {
                isMatch: !0,
                score: 0,
                matchedIndices: [[0, e.length - 1]]
            };
        if (this.patternLen > C.maxPatternLength) {
            if (y = e.match(new RegExp(this.pattern.replace(C.tokenSeparator, "|"))),
            b = !!y)
                for (x = [],
                t = 0,
                w = y.length; t < w; t++)
                    M = y[t],
                    x.push([e.indexOf(M), M.length - 1]);
            return {
                isMatch: b,
                score: b ? .5 : 1,
                matchedIndices: x
            }
        }
        for (n = C.findAllMatches,
        i = C.location,
        a = e.length,
        s = C.threshold,
        o = e.indexOf(this.pattern, i),
        P = [],
        t = 0; t < a; t++)
            P[t] = 0;
        for (-1 != o && (s = Math.min(this._bitapScore(0, o), s),
        -1 != (o = e.lastIndexOf(this.pattern, i + this.patternLen)) && (s = Math.min(this._bitapScore(0, o), s))),
        o = -1,
        g = 1,
        v = [],
        p = this.patternLen + a,
        t = 0; t < this.patternLen; t++) {
            for (l = 0,
            c = p; l < c; )
                this._bitapScore(t, i + c) <= s ? l = c : p = c,
                c = Math.floor((p - l) / 2 + l);
            for (p = c,
            h = Math.max(1, i - c + 1),
            u = n ? a : Math.min(i + c, a) + this.patternLen,
            (d = Array(u + 2))[u + 1] = (1 << t) - 1,
            r = u; r >= h; r--)
                if ((m = this.patternAlphabet[e.charAt(r - 1)]) && (P[r - 1] = 1),
                d[r] = 0 === t ? (d[r + 1] << 1 | 1) & m : (d[r + 1] << 1 | 1) & m | (f[r + 1] | f[r]) << 1 | 1 | f[r + 1],
                d[r] & this.matchmask && (g = this._bitapScore(t, r - 1)) <= s) {
                    if (s = g,
                    o = r - 1,
                    v.push(o),
                    !(o > i))
                        break;
                    h = Math.max(1, 2 * i - o)
                }
            if (this._bitapScore(t + 1, i) > s)
                break;
            f = d
        }
        return x = this._getMatchedIndices(P),
        {
            isMatch: o >= 0,
            score: 0 === g ? .001 : g,
            matchedIndices: x
        }
    }
    ,
    i.prototype._getMatchedIndices = function(e) {
        for (var t, r = [], a = -1, n = -1, i = 0, s = e.length; i < s; i++)
            (t = e[i]) && -1 === a ? a = i : t || -1 === a || ((n = i - 1) - a + 1 >= this.options.minMatchCharLength && r.push([a, n]),
            a = -1);
        return e[i - 1] && i - 1 - a + 1 >= this.options.minMatchCharLength && r.push([a, i - 1]),
        r
    }
    ,
    "object" == typeof exports ? module.exports = r : "function" == typeof define && define.amd ? define(function() {
        return r
    }) : e.Fuse = r
}(this),
PZ.layer = function() {
    this.parent = null,
    this.fx = [],
    this.layerProps = new PZ.compositor.layerProps,
    this.animFrameReq = null,
    this._needsUpdate = !1,
    Object.defineProperty(this, "needsUpdate", {
        set: function(e) {
            e ? (this._needsUpdate = !0,
            this.parent && (this.parent.needsUpdate = !0)) : this._needsUpdate = !1
        },
        get: function() {
            return !0
        }
    }),
    this.scene = new THREE.Scene,
    this.group = new THREE.Object3D,
    this.scene.add(this.group),
    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1),null),
    this.group.add(this.quad),
    this.fxListObject = $("<ul>"),
    this.fxListObject.data("objects", this.fx)
}
,
PZ.layer.prototype.clearOpacity = 0,
PZ.layer.prototype.isLayer = !0,
PZ.sdf = function(e, t, r, a) {
    this.width = e,
    this.height = t,
    this.range = r,
    this.texture = a
}
,
PZ.layer.prototype.pick = function(e) {
    var t = null;
    if (this.objects)
        for (var r = 0; r < this.objects.length && !(t = this.objects[r].pick(e)); r++)
            ;
    else {
        var a = e.clone();
        a.sub(this.layerProps.position),
        a.rotateAround(new THREE.Vector2, -this.layerProps.rotation);
        var n = this.layerProps.size.clone().multiplyScalar(.5);
        -n.x < a.x && a.x < n.x && -n.y < a.y && a.y < n.y && (t = this)
    }
    return t
}
,
PZ.layer.prototype.loadFx = function(e) {
    var t = PZ.archive.getFileString(e + "_fx");
    if (void 0 !== t)
        for (var r = JSON.parse(t), a = 0; a < r.length; a++)
            BG.fx.addObject.call(this, r[a], e + "_fx" + a)
}
,
PZ.layer.prototype.saveFx = function(e) {
    var t = [];
    if (0 !== this.fx.length) {
        for (var r = 0; r < this.fx.length; r++)
            t.push(this.fx[r].src),
            this.fx[r].save(e + "_fx" + r);
        PZ.archive.addFileString(e + "_fx", JSON.stringify(t))
    }
}
,
PZ.layer.prototype.cloneFx = function(e) {
    for (var t = 0; t < e.fx.length; t++)
        BG.fx.addObject.call(this, e.fx[t])
}
,
PZ.layer.prototype.unloadFx = function() {
    for (var e = 0; e < this.fx.length; e++)
        this.fx[e].unload()
}
,
PZ.layer.prototype.resizeFx = function(e, t, r) {
    for (var a = 0; a < this.fx.length; a++)
        this.fx[a].resize(e, t, r)
}
,
PZ.layer.prototype.updateSDF = function(e, t, r, a, n) {
    var i = this;
    return new Promise(function(s, o) {
        function l() {
            var n = performance.now();
            PZ.sdfPass.uniforms.resolution.value.set(e * a, t * a),
            PZ.sdfPass.uniforms.uvScale.value.set(c / e / a, 1),
            PZ.sdfPass.uniforms.uvOffset.value.set(d, 0),
            PZ.sdfPass.uniforms.tDiffuse.value = r,
            PZ.sdfPass.renderToScreen = !0,
            PZ.sdfPass.render(u);
            var o = p.getContext("2d")
              , g = o.getImageData(d, 0, c, t * a)
              , v = new Uint8Array(g.data.buffer)
              , y = u.context;
            y.readPixels(0, 0, c, t * a, y.RGBA, y.UNSIGNED_BYTE, v),
            o.putImageData(g, d, 0),
            h.needsUpdate = !0,
            f++,
            m += performance.now() - n,
            (d += c) < e * a ? i.animFrameReq = requestAnimationFrame(l) : (i.animFrameReq = null,
            u.dispose(),
            PZ.sdfInUse = !1,
            s())
        }
        PZ.sdfPass || (PZ.sdfPass = new THREE.ShaderPass(PZ.shaders.load("fx_sdf", {
            tDiffuse: {
                type: "t",
                value: null
            },
            uvScale: {
                type: "v2",
                value: new THREE.Vector2(1,1)
            },
            uvOffset: {
                type: "v2",
                value: new THREE.Vector2(0,0)
            },
            resolution: {
                type: "v2",
                value: new THREE.Vector2(1,1)
            }
        }))),
        a = Math.min(Math.min(a, BG.frameWidth * a / e), BG.frameHeight * a / t),
        n || (n = Math.floor(Math.sqrt(e * e + t * t) / 10)),
        e += n,
        t += n,
        PZ.sdfInUse = !0,
        PZ.sdfPass.material.defines.RANGE = (n * a).toFixed(1),
        PZ.sdfPass.material.needsUpdate = !0;
        var c = 675e6 / t / Math.pow(n, 2) / Math.pow(a, 3);
        c = Math.floor(Math.min(c, e * a));
        var p = document.createElement("canvas");
        p.width = e * a,
        p.height = t * a;
        var h = new THREE.Texture(p);
        h.minFilter = h.magFilter = THREE.LinearFilter,
        h.format = THREE.RGBAFormat,
        h.generateMipmaps = !1,
        h.needsUpdate = !0,
        i.sdf && i.sdf.texture && (p.getContext("2d").drawImage(i.sdf.texture.image, 0, 0, p.width, p.height),
        i.sdf.texture.dispose());
        var u = new THREE.WebGLRenderer({
            preserveDrawingBuffer: !0
        });
        u.setSize(c, t * a);
        var d = 0;
        i.sdf = new PZ.sdf(e,t,n,h);
        var f = 0
          , m = 0;
        null !== i.animFrameReq && cancelAnimationFrame(i.animFrameReq),
        i.animFrameReq = requestAnimationFrame(l)
    }
    )
}
,
PZ.layer.prototype.setBlendingMode = function(e) {
    switch (this.quad.material.blending = THREE.CustomBlending,
    this.quad.material.blendEquation = THREE.AddEquation,
    e) {
    case 0:
        this.quad.material.blendSrc = THREE.OneFactor,
        this.quad.material.blendDst = THREE.ZeroFactor;
        break;
    case 1:
        this.quad.material.blendSrc = THREE.OneFactor,
        this.quad.material.blendDst = THREE.OneMinusSrcAlphaFactor;
        break;
    case 2:
        this.quad.material.blendSrc = THREE.OneFactor,
        this.quad.material.blendDst = THREE.OneFactor;
        break;
    case 3:
        this.quad.material.blendEquation = THREE.ReverseSubtractEquation,
        this.quad.material.blendSrc = THREE.OneFactor,
        this.quad.material.blendDst = THREE.OneFactor;
        break;
    case 4:
        this.quad.material.blendSrc = THREE.DstColorFactor,
        this.quad.material.blendDst = THREE.OneMinusSrcAlphaFactor
    }
}
,
PZ.layer.prototype.layerCtrls = {
    position: {
        title: "Position",
        subtitle1: "x",
        subtitle2: "y",
        get: function() {
            return this.layerProps.position
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.layerProps.position.x = e;
                break;
            case 1:
                this.layerProps.position.y = e
            }
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1
    },
    size: {
        title: "Size",
        subtitle1: "width",
        subtitle2: "height",
        get: function() {
            return this.layerProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.layerProps.size.x = e;
                break;
            case 1:
                this.layerProps.size.y = e
            }
        },
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        decimals: 0,
        dragstep: 1
    },
    rotation: {
        title: "Rotation",
        get: function() {
            return this.layerProps.rotation / Math.PI * 180
        },
        set: function(e) {
            this.layerProps.rotation = e * Math.PI / 180
        },
        vmax: 360,
        vmin: -360,
        vstep: 1
    },
    opacity: {
        title: "Opacity",
        get: function() {
            return this.layerProps.opacity
        },
        set: function(e) {
            this.layerProps.opacity = e
        },
        vmax: 1,
        vmin: 0,
        vstep: .1,
        dragstep: .01,
        decimals: 2
    },
    blending: {
        title: "Blending mode",
        items: "none;normal;add;subtract;multiply",
        get: function() {
            return this.layerProps.blendingMode
        },
        set: function(e) {
            this.layerProps.blendingMode = e,
            this.setBlendingMode(e)
        }
    }
},
PZ.compositor = function(e, t, r) {
    this.renderer = e;
    var a = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: !1
    }
      , n = new THREE.WebGLRenderTarget(t,r,a);
    this.renderTarget1 = n,
    this.renderTarget2 = n.clone(),
    this.renderTarget3 = n.clone(),
    this.writeBuffer = this.renderTarget1,
    this.readBuffer = this.renderTarget2,
    this.readBuffer.scissorTest = !0,
    this.writeBuffer.scissorTest = !0,
    this.screenBuffer = this.renderTarget3,
    this.groupBuffer = null,
    this.swapSize = new THREE.Vector2,
    this.copyPass = new THREE.ShaderPass(new THREE.ShaderMaterial(THREE.CopyShader)),
    this.compositePass = new THREE.CompositePass(new THREE.ShaderMaterial(THREE.CopyShader)),
    this.mixPass = new THREE.ShaderPass(new THREE.ShaderMaterial(THREE.MixShader))
}
,
PZ.compositor.layerProps = function() {
    this.position = new THREE.Vector2(0,0),
    this.size = new THREE.Vector2(0,0),
    this.resolution = new THREE.Vector2(1,1),
    this.rotation = 0,
    this.opacity = 1,
    this.blendingMode = 1
}
,
PZ.compositor.prototype = {
    swapBuffers: function() {
        var e = this.readBuffer;
        this.readBuffer = this.writeBuffer,
        this.writeBuffer = e
    },
    swapScreenBuffer: function() {
        var e = this.screenBuffer;
        this.screenBuffer = this.groupBuffer,
        this.groupBuffer = e
    },
    render: function(e) {
        if (e.objects) {
            var t = this.groupBuffer;
            this.groupBuffer = e.buffer,
            this.renderer.setClearAlpha(e.clearOpacity),
            this.renderer.clearTarget(this.groupBuffer, !0, !0, !0),
            this.renderer.setClearAlpha(0);
            for (l = e.objects.length - 1; l >= 0; l--)
                e.objects[l].skip || this.render(e.objects[l]);
            e.buffer = this.groupBuffer,
            e.texture = e.buffer.texture,
            this.groupBuffer = t
        }
        if (this.groupBuffer && this.swapScreenBuffer(),
        e.layerProps) {
            var r = e.layerProps
              , a = e.fx
              , n = e.scene;
            this.renderer.clearTarget(this.readBuffer, !0, !0, !0),
            this.renderer.clearTarget(this.writeBuffer, !0, !0, !0);
            var i = Math.min(r.resolution.x / this.swapSize.x, 1)
              , s = Math.min(r.resolution.y / this.swapSize.y, 1);
            if (this.readBuffer.scissor.set(0, 0, Math.ceil(r.resolution.x * this.ratio) + 2, Math.ceil(r.resolution.y * this.ratio) + 2),
            this.writeBuffer.scissor.set(0, 0, Math.ceil(r.resolution.x * this.ratio) + 2, Math.ceil(r.resolution.y * this.ratio) + 2),
            e.texture instanceof THREE.Texture)
                this.copyPass.uniforms.uvScale.value.set(i, s),
                this.copyPass.uniforms.tDiffuse.value = e.texture,
                this.copyPass.render(this.renderer, this.readBuffer, null, !1);
            else {
                if (!e.pass)
                    return;
                e.pass.uniforms && e.pass.uniforms.uvScale.value.set(i, s),
                e.pass.render(this.renderer, this.readBuffer, null, !1)
            }
            var o, l, c = a ? a.length : 0;
            for (l = 0; l < c; l++)
                (o = a[l].pass) ? o.enabled && (o.uniforms.uvScale && o.uniforms.uvScale.value.set(i, s),
                o.render(this.renderer, this.writeBuffer, this.readBuffer, !1),
                o.needsSwap && this.swapBuffers()) : a[l].quad.renderOrder = c * a[l].order + l + a[l].order;
            n.background = this.screenBuffer.texture,
            n.children[0].children[0].material.uniforms.tDiffuse.value = this.readBuffer.texture,
            n.children[0].children[0].material.uniforms.uvScale.value.set(1 / i, 1 / s),
            n.children[0].children[0].renderOrder = c,
            this.compositePass.render(n, this.renderer, this.groupBuffer)
        }
    },
    reset: function(e) {
        void 0 === e && (e = this.renderTarget1.clone()).setSize(window.innerWidth, window.innerHeight),
        this.screenBuffer = e
    },
    setSize: function(e, t, r) {
        var a = this.renderTarget1.clone();
        a.setSize(Math.round(e * r), Math.round(t * r)),
        this.compositePass.resize(e, t),
        this.reset(a),
        this.ratio = r,
        this.updateSwapSize()
    },
    findMaxSize: function(e, t) {
        if (e.max(t.layerProps.resolution),
        t.objects)
            for (var r = 0; r < t.objects.length; r++)
                this.findMaxSize(e, t.objects[r]);
        return e
    },
    updateSwapSize: function() {
        if (this.mainLayer) {
            var e = this.findMaxSize(new THREE.Vector2(0,0), this.mainLayer);
            this.swapSize.copy(e),
            e.multiplyScalar(this.ratio),
            e.round(),
            e.x === this.readBuffer.width && e.y === this.readBuffer.height || (this.readBuffer = this.readBuffer.clone(),
            this.readBuffer.setSize(e.x, e.y),
            this.writeBuffer = this.readBuffer.clone())
        }
    }
},
THREE.Pass = function() {
    this.enabled = !0,
    this.needsSwap = !0,
    this.clear = !1,
    this.renderToScreen = !1
}
,
Object.assign(THREE.Pass.prototype, {
    setSize: function(e, t) {},
    render: function(e, t, r, a, n) {
        console.error("THREE.Pass: .render() must be implemented in derived pass.")
    }
});
var CM = {
    frameWidth: 1920,
    frameHeight: 1080,
    frameRate: 30,
    ratio: 1,
    aspect: 1920 / 1080,
    currentFrame: 1,
    totalFrames: 180,
    get currentTime() {
        return (CM.currentFrame - 1) / CM.frameRate
    },
    get totalTime() {
        return CM.totalFrames / CM.frameRate
    },
    playSpeed: 1,
    resolution: new THREE.Vector2(1,1),
    enableRenderLoop: !0,
    enablePlayFrames: !1,
    timeelapsed: 0,
    renderMode: !1,
    timelineObjects: {
        scene: null,
        objects: null,
        fx: null,
        camera: null
    },
    tabActive: 0,
    preRender: []
};
CM.setUpEditor = function() {
    CM.timeline.init(),
    CM.timeline.update(),
    $("#elevator").on("tabload", function(e, t, r) {
        switch (t) {
        case 0:
            CM.templates.select($(r));
            break;
        case 1:
            CM.basics.select($(r));
            break;
        case 2:
            CM.scenes.select($(r));
            break;
        case 3:
            CM.objects.select($(r));
            break;
        case 4:
            CM.fx.select($(r));
            break;
        case 5:
            CM.camsequence.select($(r));
            break;
        case 6:
            CM.audio.select($(r));
            break;
        case 7:
            CM.download.select($(r));
            break;
        case 8:
            CM.about($(r));
            break;
        case 9:
            PZ.feedback.select($(r))
        }
    }),
    PZ.editor.elevator_init([{
        title: "Project",
        sprite: "templates"
    }, {
        title: "Basics",
        sprite: "basics"
    }, {
        title: "Scene",
        sprite: "scene"
    }, {
        title: "Objects",
        sprite: "objects"
    }, {
        title: "FX",
        sprite: "fx"
    }, {
        title: "Camera",
        sprite: "camera"
    }, {
        title: "Audio + Music",
        sprite: "music"
    }, {
        title: "Download",
        sprite: "download"
    }, {
        title: "About",
        sprite: "about"
    }]),
    $("#elevator").on("tabchanged", function(e, t) {
        switch (CM.camera.layers.set(0),
        CM.camera.layers.enable(1),
        PZ.widget3d.threeObj = null,
        CM.timeline.keyObject = null,
        t) {
        case 2:
            CM.timeline.keyObject = CM.scenes.object && CM.scenes.object.keyframeProps ? CM.scenes.object.keyframeProps : null;
            break;
        case 3:
            CM.objects.selected && (CM.timeline.keyObject = CM.objects.selected.keyObject,
            PZ.widget3d.threeObj = CM.objects.selected.threeObj,
            PZ.widget3d.keyObject = CM.objects.selected.keyObject),
            CM.camera.layers.enable(2);
            break;
        case 4:
            CM.timeline.keyObject = null === CM.fx.selected ? null : CM.fx.selected.keyframeProps;
            break;
        case 5:
            PZ.widget3d.threeObj = CM.renderCamera,
            PZ.widget3d.keyObject = CM.camsequence.keyframeProps,
            CM.timeline.keyObject = CM.camsequence.keyframeProps,
            CM.camera.layers.enable(3);
            break;
        case 6:
            CM.timeline.keyObject = CM.audio.keyframeProps
        }
        CM.timeline.update(),
        PZ.widget3d.update()
    })
}
,
CM.init = function() {
    CM.renderCanv = document.getElementById("c_main"),
    PZ.keyframes.getFrame = function() {
        return CM.currentFrame
    }
    ;
    try {
        CM.renderer = new THREE.WebGLRenderer({
            alpha: !0,
            preserveDrawingBuffer: !0,
            canvas: CM.renderCanv
        })
    } catch (e) {
        return $(window).unbind("beforeunload"),
        void $("<div>", {
            class: "disabled noselect"
        }).append($("<span>").attr("style", "padding:2%;top:35%;width:96%;").append('<h3>There was a problem starting WebGL.</h3><br>Refresh to try again or find out how to get WebGL <a style="color:inherit;" target="_blank" href="https://get.webgl.org">here</a>.')).appendTo($("#panecontainer"))
    }
    CM.scene = new THREE.Scene,
    CM.camera = new THREE.PerspectiveCamera(60,CM.aspect,.1,5e3),
    CM.camera.position.set(50, 30, 50),
    CM.camera.lookAt(new THREE.Vector3(0,0,0)),
    CM.camera.layers.enable(1),
    CM.renderCamera = new THREE.PerspectiveCamera(60,CM.aspect,.1,5e3),
    CM.scene.add(CM.renderCamera),
    CM.camsequence.helper = new THREE.CameraHelper(CM.renderCamera),
    CM.camsequence.helper.layers.set(3),
    CM.scene.add(CM.camsequence.helper),
    CM.objects.boxHelper = new THREE.BoxHelper,
    CM.objects.boxHelper.layers.set(2),
    CM.scene.add(CM.objects.boxHelper),
    CM.objects.emptyObject = new THREE.Object3D,
    CM.objects.emptyObject.geometry = new THREE.BufferGeometry,
    CM.objects.emptyObject.geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]),3)),
    CM.hemiLight = new THREE.HemisphereLight(16777215,16777215,1),
    CM.scene.add(CM.hemiLight),
    CM.renderer.setClearColor(0, 1),
    CM.renderer.shadowMap.enabled = !0,
    CM.renderer.shadowMap.type = THREE.PCFSoftShadowMap,
    CM.compositor = new PZ.compositor(CM.renderer,CM.renderCanv.width,CM.renderCanv.height),
    CM.layers.main = new CM.layers.scene3d,
    CM.compositor.mainLayer = CM.layers.main,
    CM.layers.main.fx = CM.fx.objects,
    CM.layers.main.resize(CM.frameWidth, CM.frameHeight, CM.ratio),
    CM.layers.main.load(),
    $(CM.renderCanv).css("position", "absolute"),
    CM.resizeViewport(),
    CM.controls = new THREE.EditorControls(CM.camera,CM.renderer.domElement),
    PZ.widget3d.init(CM.controls),
    CM.gridHelper = new THREE.GridHelper(100,10,new THREE.Color(13421772),new THREE.Color(3355443)),
    CM.gridHelper.layers.set(1),
    CM.scene.add(CM.gridHelper),
    CM.audio.init(),
    CM.objects.createUI(),
    CM.fx.createUI(),
    CM.templates.init(),
    CM.render()
}
,
CM.render = function(e, t) {
    CM.enableRenderLoop && (CM.enablePlayFrames && (CM.timeline.updateFrame(),
    CM.currentFrame += (CM.audio.ctx.currentTime - CM.timeelapsed) * CM.frameRate * CM.playSpeed,
    CM.timeelapsed = CM.audio.ctx.currentTime,
    CM.currentFrame > CM.totalFrames && (CM.currentFrame = 1,
    CM.audio.stop(),
    CM.audio.play())),
    CM.animFrameReq = requestAnimationFrame(CM.render)),
    t || CM.updateScene(),
    CM.reflection && (CM.reflection.mirrorCubeCamera.updateCubeMap(CM.renderer, CM.scene),
    CM.reflection.mirrorCubeCamera.renderTarget.texture.needsUpdate = !0),
    CM.renderMode || t ? (CM.layers.main.update(),
    CM.compositor.render(CM.layers.main)) : CM.renderer.render(CM.scene, CM.camera)
}
,
CM.updateScene = function(e) {
    CM.camsequence.updateFrame(),
    null !== CM.scenes.object && CM.scenes.object.update();
    for (var t = 0; t < CM.objects.objects.length; t++)
        CM.objects.objects[t].updateFrame(e);
    if (CM.audio.updateFrame(),
    CM.renderMode || !0 === e)
        for (t = 0; t < CM.fx.objects.length; t++)
            CM.fx.objects[t].update(CM.currentFrame);
    else
        CM.renderCamera.updateMatrixWorld(),
        CM.objects.updateHelpers(),
        PZ.widget3d.updateFrame(CM.currentFrame)
}
,
CM.resizeViewport = function(e, t) {
    if (void 0 === e) {
        var r = $("#panecontainer")
          , a = $("#previewpane")
          , n = $("#editorpane");
        r.width() > r.height() ? (a.css("bottom", "0"),
        n.css("right", "auto"),
        n.css("width", Math.min(.5 * r.width(), 447)),
        n.css("top", "0"),
        n.css("border-right", "3px solid #111"),
        n.css("border-top", "0"),
        a.css("left", n.width() + 3)) : (a.css("left", "0"),
        a.css("bottom", "50%"),
        n.css("right", "0"),
        n.css("width", "auto"),
        n.css("top", "50%"),
        n.css("border-right", "0"),
        n.css("border-top", "3px solid #111"));
        var i = a.height() - $("#previewtop").outerHeight() - $("#previewbottom").outerHeight();
        i * CM.aspect > a.width() ? (CM.renderCanv.width = a.width(),
        CM.renderCanv.height = CM.renderCanv.width / CM.aspect) : (CM.renderCanv.height = i,
        CM.renderCanv.width = CM.renderCanv.height * CM.aspect),
        $(CM.renderCanv).css("top", .5 * (i - CM.renderCanv.height) + $("#previewtop").outerHeight()),
        $(CM.renderCanv).css("left", .5 * (a.width() - CM.renderCanv.width))
    } else
        CM.renderCanv.width = e,
        CM.renderCanv.height = t;
    CM.ratio = CM.renderCanv.width / CM.frameWidth,
    CM.camsequence.updateCamera(),
    CM.renderer.setViewport(0, 0, CM.renderCanv.width, CM.renderCanv.height),
    CM.compositor.setSize(CM.frameWidth, CM.frameHeight, CM.ratio),
    null !== CM.layers.main && CM.layers.main.resize(CM.frameWidth, CM.frameHeight, CM.ratio),
    CM.resolution.set(CM.renderCanv.width, CM.renderCanv.height)
}
,
CM.rebuildShaders = function() {
    for (var e = 0; e < objectsProps.length; e++)
        objectsProps[e].type < 3 && null !== objectsProps[e].threeObj && (objectsProps[e].threeObj.material.needsUpdate = !0)
}
,
CM.updateMaterials = function() {
    CM.scene.traverse(function(e) {
        if (e.material && (e.material.needsUpdate = !0,
        e.material instanceof THREE.MeshFaceMaterial))
            for (var t = 0; t < e.material.materials.length; t++)
                e.material.materials[t].needsUpdate = !0
    })
}
,
CM.setRenderMode = function(e) {
    e ? (CM.renderer.autoClear = !1,
    CM.controls.enabled = !1) : (CM.renderer.autoClear = !0,
    CM.controls.enabled = !0),
    PZ.widget3d.update()
}
,
CM.toggleRenderMode = function() {
    CM.renderMode = !CM.renderMode,
    CM.setRenderMode(CM.renderMode)
}
,
CM.setPlayPause = function(e) {
    e !== CM.enablePlayFrames && (!1 === e ? (CM.audio.stop(),
    CM.enablePlayFrames = !1,
    CM.currentFrame = Math.floor(CM.currentFrame),
    CM.timeline.updateFrame(),
    $("#controls .proprow[kf='1']").each(function() {
        $(this).triggerHandler("update")
    }),
    CM.timeline.$hideeditor.hide()) : (CM.timeline.$hideeditor.show(),
    CM.timeelapsed = CM.audio.ctx.currentTime,
    CM.audio.play(),
    CM.enablePlayFrames = !0),
    PZ.widget3d.update(),
    PZ.editor.switchIcon(CM.timeline.$playpause, e ? "pause" : "play"),
    CM.timeline.$playpause.toggleClass("iconactive", e))
}
,
CM.getBase64Image = function(e) {
    if (!e)
        return null;
    var t = document.createElement("canvas");
    return t.width = e.width,
    t.height = e.height,
    t.getContext("2d").drawImage(e, 0, 0),
    t.toDataURL("image/png")
}
,
CM.appearance = {
    objects: {},
    list: [{
        name: "single color",
        file: "singlecolor"
    }, {
        name: "image",
        file: "texture"
    }, {
        name: "metal",
        file: "metal"
    }, {
        name: "wood",
        file: "wood"
    }, {
        name: "brick",
        file: "brick"
    }, {
        name: "alien",
        file: "alien"
    }, {
        name: "video",
        file: "video"
    }, {
        name: "shockwave [alpha]",
        file: "shockwave"
    }, {
        name: "custom",
        file: "custom"
    }],
    _string: "",
    get string() {
        return "" !== this._string ? this._string : (this.concatList(),
        this._string)
    }
},
CM.appearance.load = function(e) {
    var t = this;
    this.objects[e] ? t.objects[e].refcount += 1 : $.ajax({
        url: "modules/appearance3d/" + e + ".js?v=2.0.191",
        dataType: "text",
        cache: !0,
        async: !1,
        success: function(r) {
            var a = new Function(r);
            t.objects[e] = new a,
            t.objects[e].refcount = 1
        }
    })
}
,
CM.appearance.unload = function(e) {
    void 0 !== this.objects[e] && (this.objects[e].refcount -= 1,
    this.objects[e].refcount <= 0 && (this.objects[e] = null,
    delete this.objects[e]))
}
,
CM.appearance.getIndex = function(e) {
    for (var t = 0; t < this.list.length; t++)
        if (this.list[t].file === e)
            return t;
    return -1
}
,
CM.appearance.concatList = function() {
    for (var e = !1, t = 0; t < this.list.length; t++)
        e && (this._string += ";"),
        this._string += this.list[t].name,
        e = !0
}
,
CM.templates = {
    newid: 1,
    id: 0,
    submit: {
        tool: 1,
        title: "",
        description: "",
        category: 0
    },
    ctrlState: 0,
    ctrlCancel: !1,
    xhr: null,
    thumbnailBlob: null,
    templateBlob: null,
    saveWaiting: 0,
    relatedList: null
},
CM.templates.select = function(e) {
    this.insertlocation = e,
    this.relatedList = PZ.editor.generatePlaceholder(),
    this.selectMain(e),
    this.$hidectrls = $("<div>", {
        class: "disabled noselect"
    }).hide().appendTo("#panecontainer"),
    this.$hidemsg = $("<span>").appendTo(this.$hidectrls)
}
,
CM.templates.selectMain = function() {
    var e = this.insertlocation;
    this.relatedList.detach(),
    e.empty(),
    PZ.editor.elevator_tablock(0, !1);
    var t = document.createElement("div");
    t.style.cssText = `\n    display: flex;\n    gap: 5px;\n    padding: 5px;\n    background-color: #222;\n  `,
    e.append(t),
    PZ.editor.generateButton({
        title: "New",
        clickfn: function() {
            location.href = "?c="
        }
    }).appendTo(t),
    PZ.editor.generateButton({
        title: "Load",
        clickfn: this.loadButton
    }, this).appendTo(t),
    PZ.editor.generateButton({
        title: "Save",
        clickfn: this.saveButton
    }, this).appendTo(t),
    Array.from(t.children).forEach(function(e) {
        e.style.borderRadius = "5px"
    }),
    e.append(this.relatedList)
}
,
CM.templates.selectResult = function(e, t) {
    var r = this.insertlocation;
    if (this.relatedList.detach(),
    r.empty(),
    this.$hidectrls.hide(),
    PZ.editor.elevator_tablock(0, !0),
    $(CM.renderCanv).detach(),
    CM.timeline.disable(!0),
    1 === e) {
        PZ.editor.generateTitle({
            title: "Publish to creations"
        }).appendTo(r),
        PZ.editor.generateDescription({
            content: "Your creation was uploaded! Click below to view it."
        }).appendTo(r);
        var a = PZ.editor.generateButton({
            title: "Open creation page",
            clickfn: function() {
                return open("/creations/" + this.newid, "_blank"),
                !1
            }
        }, this).css("cursor", "pointer");
        a[0].href = "/creations/" + this.newid,
        a[0].target = "_blank",
        a.appendTo(r),
        PZ.editor.generateSpacer().appendTo(r),
        PZ.editor.generateButton({
            title: "Return to editing",
            clickfn: function() {
                this.finish(),
                this.selectMain()
            }
        }, this).appendTo(r)
    } else if (0 === e) {
        window.open("/download.html")
        this.selectMain()
        setTimeout(() => {
            this.finish()
        }, 1000);

    //     PZ.editor.generateTitle({
    //         title: "Save your project"
    //     }).appendTo(r);
    
    //     PZ.editor.generateDescription({
    //         content: "Your save file is ready! Click below to download."
    //     }).appendTo(r);
    
    //     PZ.editor.generateButton({
    //         title: "Download project file",
    //         clickfn: function() {
    //             window.open("/download.html");
    //         }
    //     }, this).css("cursor", "pointer").appendTo(r);
    
    //     PZ.editor.generateSpacer().appendTo(r);
    
    //     PZ.editor.generateButton({
    //         title: "Return to editing",
    //         clickfn: function() {
    //             this.finish();
    //             this.selectMain();
    //         }
    //     }, this).appendTo(r);
    // } else {
    //     PZ.editor.generateTitle({
    //         title: "Save/load your project"
    //     }).appendTo(r);
    
    //     void 0 === t && (t = "Unfortunately, something went wrong when processing your project. The problem has been reported in order to resolve this issue. Sorry about that.");
    
    //     PZ.editor.generateDescription({
    //         content: t
    //     }).appendTo(r);
    
    //     PZ.editor.generateSpacer().appendTo(r);
    
    //     -1 === e
    //         ? PZ.editor.generateButton({
    //             title: "Return to editing",
    //             clickfn: function() {
    //                 this.finish();
    //                 this.selectMain();
    //             }
    //         }, this).appendTo(r)
    //         : PZ.editor.generateButton({
    //             title: "Go back",
    //             clickfn: function() {
    //                 this.finish();
    //                 this.selectSubmit();
    //             }
    //         }, this).appendTo(r);
 }
}    
,
CM.templates.selectSubmit = function() {
    var e = this.insertlocation;
    this.relatedList.detach(),
    e.empty(),
    PZ.editor.elevator_tablock(0, !0),
    PZ.editor.generateTitle({
        title: "Publish to creations"
    }).appendTo(e),
    this.$submit = PZ.editor.generatePlaceholder().appendTo(e),
    PZ.editor.generateDescription({
        content: "Enter some information about your creation and set the current frame where you would like your creation's thumbnail to be."
    }).appendTo(this.$submit);
    var t = PZ.editor.generateTextInput({
        get: function() {
            return this.submit.title || ""
        },
        set: function(e) {
            this.submit.title = e
        }
    }, this);
    t[0].children[0].setAttribute("title", "Your creation title"),
    t[0].children[0].setAttribute("placeholder", "Your creation title"),
    t.appendTo(this.$submit);
    var r = PZ.editor.generateTextArea({
        get: function() {
            return this.submit.description || ""
        },
        set: function(e) {
            this.submit.description = e
        }
    }, this);
    r[0].children[0].setAttribute("title", "Your creation description"),
    r[0].children[0].setAttribute("placeholder", "Your creation description"),
    r.appendTo(this.$submit),
    PZ.editor.generateButton({
        title: "Submit creation",
        clickfn: this.submitButton
    }, this).appendTo(this.$submit),
    PZ.editor.generateButton({
        title: "Cancel",
        clickfn: function() {
            this.selectMain()
        }
    }, this).appendTo(this.$submit),
    this.$working = PZ.editor.generatePlaceholder().hide().appendTo(e),
    PZ.editor.generateDescription({
        content: "Your creation is being uploaded. Please stay on this tab to ensure your browser continues to process it."
    }).appendTo(this.$working),
    this.$progress = PZ.editor.generateProgressbar({
        get: function() {
            return this.percentDone
        }
    }, this).appendTo(this.$working),
    PZ.editor.generateButton({
        title: "Cancel upload",
        clickfn: function() {
            this.ctrlCancel = !0,
            null !== PZ.archive.worker && (PZ.archive.worker.terminate(),
            PZ.archive.worker = null),
            null !== CM.templates.xhr && (CM.templates.xhr.abort(),
            CM.templates.xhr = null),
            this.finish(),
            this.selectSubmit()
        }
    }, this).appendTo(this.$working)
}
,
CM.templates.loadTemplateInfo = function(e) {
    if (e) {
        try {
            trackEngagement(parseInt(e))
        } catch (e) {
            console.error(e)
        }
        var t = this.relatedList
          , r = document.createElement("div");
        t[0].parentElement.insertBefore(r, t[0]),
        PZ.api("/creations/" + e + "?source=cm2", "get").then(function(e) {
            200 === e.status && e.json().then(function(e) {
                var t = e.title
                  , a = e.description
                  , n = e.user
                  , i = n.display || n.name
                  , s = e.views
                  , o = new Date(e.createdAt)
                  , l = e.likes
                  , c = e.selfLiked
                  , p = document.createElement("div");
                p.style.cssText = `\n            padding: 15px;\n            background-color: #222;\n            border-radius: 10px;\n            margin: 5px;\n            color: #eee;\n            font-family: 'Open Sans', sans-serif;\n          `;
                var h = document.createElement("h2");
                h.textContent = t,
                h.style.cssText = `\n            margin: 0 0 10px 0;\n            font-size: 24px;\n          `,
                p.appendChild(h);
                var u = document.createElement("div");
                u.style.cssText = `\n            margin-bottom: 10px;\n            font-size: 14px;\n            color: #ccc;\n          `,
                u.textContent = s.toLocaleString() + " views • " + o.toLocaleDateString(void 0, {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                p.appendChild(u);
                var d = document.createElement("div");
                d.style.cssText = `\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n          `;
                var f = document.createElement("a");
                f.href = "/creations/search?q=user:" + encodeURIComponent(n.name),
                f.target = "_blank",
                f.style.cssText = `\n            line-height: 0;\n            text-decoration: none;\n          `;
                var m;
                n.userAvatarId ? ((m = document.createElement("img")).src = PZ.blobOrigin + "/avatars/" + n.userAvatarId + "_30.jpg",
                m.alt = i,
                m.style.cssText = `\n              width: 30px;\n              height: 30px;\n              border-radius: 50%;\n              margin-right: 10px;\n            `) : ((m = document.createElement("div")).style.cssText = `\n              width: 30px;\n              height: 30px;\n              background-color: #333;\n              border-radius: 50%;\n              margin-right: 10px;\n              text-align: center;\n              line-height: 30px;\n              color: #aaa;\n              text-decoration: none;\n            `,
                m.textContent = i[0]),
                f.appendChild(m),
                d.appendChild(f);
                var g = document.createElement("a");
                g.href = "/creations/search?q=user:" + encodeURIComponent(n.name),
                g.target = "_blank",
                g.textContent = i,
                g.style.cssText = `\n            text-decoration: none;\n            color: #ccc;\n            font-weight: bold;\n          `,
                d.appendChild(g),
                p.appendChild(d);
                var v = document.createElement("button");
                v.title = "Like",
                v.style.cssText = `\n            display: flex;\n            align-items: center;\n            background-color: #333;\n            border: none;\n            border-radius: 20px;\n            padding: 5px 15px;\n            margin-bottom: 10px;\n            cursor: pointer;\n            transition: background-color 0.3s;\n          `;
                var y = `\n            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${c ? "red" : "none"}" stroke="${c ? "red" : "white"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>\n            </svg>\n          `
                  , b = document.createElement("span");
                b.textContent = l.toLocaleString(),
                b.style.marginLeft = "5px",
                b.style.color = "#fff",
                b.style.fontSize = "16px",
                v.innerHTML = y,
                v.appendChild(b);
                var P = function(e) {
                    v.querySelector("svg").style.fill = e ? "red" : "none",
                    v.querySelector("svg").style.stroke = e ? "red" : "white"
                };
                if (v.onclick = function() {
                    if (PZ.account.currentUser) {
                        var t = c ? "DELETE" : "POST"
                          , r = `/creations/${e.creationId}/actions${c ? "/like" : ""}`
                          , a = c ? null : {
                            actionType: 0
                        };
                        P(!c),
                        PZ.api(r, t, a).then(e => {
                            e.ok ? (l += (c = !c) ? 1 : -1,
                            b.textContent = l.toLocaleString(),
                            P(c)) : P(c)
                        }
                        ).catch(e => console.error("Error:", e))
                    }
                }
                ,
                p.appendChild(v),
                a) {
                    var x = document.createElement("div")
                      , w = document.createElement("p")
                      , M = document.createElement("button")
                      , C = a
                      , T = a.slice(0, 150) + (a.length > 150 ? "..." : "")
                      , E = !1;
                    w.textContent = T,
                    w.style.cssText = `\n              margin: 0 0 10px 0;\n              font-size: 14px;\n              line-height: 1.4;\n              white-space: break-spaces;\n              overflow-wrap: break-word;\n            `,
                    M.textContent = "Show more",
                    M.style.cssText = `\n              background: none;\n              border: none;\n              color: #ccc;\n              text-decoration: underline;\n              padding: 0;\n              font: inherit;\n              cursor: pointer;\n              outline: inherit;\n            `,
                    M.onclick = function() {
                        E = !E,
                        w.textContent = E ? C : T,
                        M.textContent = E ? "Show less" : "Show more"
                    }
                    ,
                    x.appendChild(w),
                    a.length > 150 && x.appendChild(M),
                    p.appendChild(x)
                }
                r.appendChild(p)
            })
        })
    }
}
,
CM.templates.selectRelated = function(e) {
    const t = this;
    e = e || 0;
    const r = t.relatedList[0];
    let a = 0
      , n = !1
      , i = !0
      , s = null
      , o = null;
    const l = () => {
        const e = document.createElement("div");
        e.style.cssText = `\n      display: flex;\n      width: 100%;\n      margin-top: 10px;\n      padding: 0 5px;\n      gap: 8px;\n      box-sizing: border-box;\n      opacity: 0.5;\n      pointer-events: none;\n      flex-direction: column;\n    `;
        e.hidden = true;
        const t = document.createElement("div");
        t.hidden = true;
        t.style.cssText = `\n      width: 168px;\n      height: 94px;\n      background-color: #444;\n      border-radius: 10px;\n      flex-shrink: 0;\n      animation: pulse 1.5s infinite;\n    `;
        const r = document.createElement("div");
        r.hidden = true;
        return r.style.cssText = `\n      width: 168px;\n      height: 16px;\n      background-color: #555;\n      margin-top: 5px;\n      border-radius: 4px;\n      animation: pulse 1.5s infinite;\n    `,
        // e.appendChild(t),
        // e.appendChild(r),
        e
    }
      , c = document.createElement("style");
    c.innerHTML = `\n    @keyframes pulse {\n      0% { opacity: 1; }\n      50% { opacity: 0.4; }\n      100% { opacity: 1; }\n    }\n    .creation-title {\n      font-family: 'Open Sans', sans-serif;\n      font-size: 16px;\n      color: #ddd;\n      text-decoration: none;\n      overflow: hidden;\n      word-wrap: break-word;\n    }\n    .creation-stats {\n      font-size: 12px;\n      color: #aaa;\n      margin-top: 4px;\n    }\n    .creation-user {\n      font-size: 12px;\n      color: #aaa;\n      margin-top: 2px;\n    }\n    .new-badge {\n      background-color: #444;\n      color: #fff;\n      padding: 2px 6px;\n      border-radius: 8px;\n      font-size: 12px;\n      display: inline-block;\n      margin-top: 4px;\n      width: min-content;\n    }\n  `,
    document.head.appendChild(c);
    const p = []
      , h = new Intl.NumberFormat(void 0,{
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1
    })
      , u = new Intl.RelativeTimeFormat(void 0,{
        numeric: "auto"
    })
      , d = e => {
        const t = [60, 3600, 86400, 604800, 2592e3, 31536e3, 1 / 0]
          , r = ["second", "minute", "hour", "day", "week", "month", "year"]
          , a = Math.round((e - Date.now()) / 1e3)
          , n = t.findIndex(e => e > Math.abs(a))
          , i = n ? t[n - 1] : 1;
        return u.format(Math.floor(a / i), r[n])
    }
      , f = t => {
        if (!n && i) {
            n = !0;
            for (let e = 0; e < 12; e++) {
                const e = l();
                r.appendChild(e)
            }
            var c = e ? `/creations?section=6&pageSize=12&page=${t}&query=${e}` : `/creations?pageSize=12&page=${t}`;
            PZ.api(c, "get").then(function(l) {
                200 === l.status ? l.json().then(function(t) {
                    for (let e = 0; e < 12; e++)
                        r.lastChild && r.lastChild.matches('div[style*="opacity: 0.5"]') && r.removeChild(r.lastChild);
                    0 === t.length && (i = !1),
                    p.push(...t.map(e => e.creationId));
                    const l = t => {
                        var r = p.indexOf(t.creationId);
                        navigator.sendBeacon(`${PZ.apiOrigin}/creations/click`, JSON.stringify({
                            id: t.creationId,
                            source: e ? "related" : "trending",
                            relatedId: e || void 0,
                            position: r,
                            negativeSamples: Array.from({
                                length: p.length
                            }, (e, t) => t).filter(e => e !== r).sort( () => Math.random() - .5).slice(0, 5).map(e => [e, p[e]])
                        }))
                    }
                    ;
                    t.forEach( (e, t) => {
                        const a = document.createElement("div");
                        a.style.cssText = `\n                  display: flex;\n                  flex-direction: column;\n                  width: 100%;\n                  margin-top: 10px;\n                  padding: 0 5px;\n                  gap: 8px;\n                  box-sizing: border-box;\n                `;
                        a.hidden = true;
                        const n = document.createElement("a");
                        n.href = `${window.parent && window.parent.location.pathname || window.location.pathname}?c=${e.creationId}`,
                        n.target = "_top",
                        n.style.cssText = `\n                  text-decoration: none;\n                  color: inherit;\n                  display: flex;\n                  gap: 6px;\n                `,
                        n.onclick = ( () => l(e));
                        const i = document.createElement("div");
                        i.style.cssText = `\n                  display: flex;\n                  width: 168px;\n                  height: 94px;\n                  background-color: #222;\n                  border-radius: 10px;\n                  overflow: hidden;\n                  flex-shrink: 0;\n                `;
                        const s = document.createElement("img");
                        s.width = 330,
                        s.height = 186,
                        s.style.cssText = `\n                  width: 168px;\n                  height: 94px;\n                  margin: 0;\n                  object-fit: cover;\n                `,
                        s.loading = "lazy",
                        s.title = e.title,
                        s.dataset.t = e.creationId,
                        s.src = `${PZ.blobOrigin}/creation-thumbnails/${e.creationId}.jpg`,
                        i.appendChild(s);
                        const o = document.createElement("div");
                        o.style.cssText = `\n                  display: flex;\n                  flex-direction: column;\n                  width: 100%;\n                  font-family: 'Open Sans', sans-serif;\n                  overflow: hidden;\n                `;
                        const c = document.createElement("div");
                        c.className = "creation-title",
                        c.textContent = e.title.length > 50 ? e.title.substring(0, 47) + "..." : e.title,
                        c.title = e.title;
                        const p = document.createElement("div");
                        p.className = "creation-user",
                        p.textContent = e.user.display || e.user.name;
                        const u = document.createElement("div");
                        u.className = "creation-stats";
                        const f = new Date(e.createdAt)
                          , m = h.format(e.views)
                          , g = d(f);
                        u.textContent = `${m} views • ${g}`,
                        n.appendChild(i),
                        o.appendChild(c),
                        o.appendChild(p),
                        o.appendChild(u),
                        n.appendChild(o),
                        a.appendChild(n);
                        const v = new Date;
                        if (v.setDate(v.getDate() - 14),
                        new Date(e.createdAt) > v) {
                            const e = document.createElement("div");
                            e.className = "new-badge",
                            e.textContent = "New",
                            o.appendChild(e)
                        }
                        r.appendChild(a)
                    }
                    ),
                    i && (o && r.removeChild(o),
                    (o = document.createElement("div")).id = "sentinel",
                    r.appendChild(o),
                    s.observe(o)),
                    a += 1,
                    n = !1
                }).catch( () => {
                    console.error("Failed to parse JSON response."),
                    n = !1
                }
                ) : (console.error(`Failed to load page ${t}. Status: ${l.status}`),
                n = !1)
            }).catch( () => {
                console.error(`Network error while loading page ${t}.`),
                n = !1
            }
            )
        }
    }
    ;
    s || (s = new IntersectionObserver(e => {
        e.forEach(e => {
            e.isIntersecting && i && !n && f(a)
        }
        )
    }
    ,{
        rootMargin: "20%",
        root: r.parentElement.parentElement
    })),
    f(a)
}
,
CM.templates.control = function(e) {
    var t = CM.templates
      , r = t.ctrlState;
    if (!0 !== t.ctrlCancel)
        if (0 === r)
            PZ.archive.files.length > 0 ? t.loadObjects(e) : t.selectResult(-1);
        else if (1 === r) {
            if (void 0 === e)
                return void t.selectResult(-1);
            PZ.downloadBlob = e,
            PZ.downloadFilename = "clipmaker_project.pz",
            t.selectResult(0)
        } else if (2 === r) {
            if (t.percentDone = 40,
            t.$progress.triggerHandler("update"),
            void 0 === e)
                return void t.selectResult(-2);
            if (CM.templates.thumbnailBlob = e,
            CM.templates.thumbnailBlob.size > 262144)
                return void t.selectResult(-2, "Your creation exceeds the size limit. Please remove large items to upload your creation.");
            t.ctrlState = 3,
            t.save(t.control)
        } else if (3 === r) {
            if (t.percentDone = 80,
            t.$progress.triggerHandler("update"),
            void 0 === e)
                return void t.selectResult(-2);
            if (CM.templates.templateBlob = e,
            CM.templates.templateBlob.size > 5242880)
                return void t.selectResult(-2, "Your creation exceeds the size limit. Please remove large items to upload your creation.");
            t.ctrlState = 4,
            t.submitSend()
        } else if (4 === r)
            if (201 === e.status)
                e.text().then(function(e) {
                    t.newid = parseInt(e),
                    t.selectResult(1)
                });
            else {
                var a = function(e) {
                    var r = e.toString();
                    (0 === r.length || r.length > 200) && (r = "Unfortunately, your creation could not be uploaded. Please try again later."),
                    t.selectResult(-2, r)
                };
                e.text().then(a, a)
            }
}
,
CM.templates.init = function() {
    var e;
    if (sessionStorage.getItem("loadTemplate"))
        e = sessionStorage.getItem("loadTemplate"),
        sessionStorage.removeItem("loadTemplate"),
        e = parseInt(e);
    else if (location.search)
        try {
            e = parseInt(new URL(location.href).searchParams.get("c"))
        } catch (e) {}
    this.loadTemplateInfo(e),
    this.selectRelated(e),
    e && (e = parseInt(e),
    this.$hidemsg.text("loading..."),
    this.$hidectrls.show(),
    CM.templates.ctrlCancel = !1,
    CM.templates.ctrlState = 0,
    fetch(PZ.blobOrigin + "/creations/" + e + ".pz", {
        method: "get",
        cache: "default"
    }).then(function(t) {
        200 === t.status ? t.blob().then(function(t) {
            CM.templates.load(t, e)
        }) : CM.template.control()
    }))
}
,
CM.templates.loadButton = function() {
    CM.templates.$loadinput || (CM.templates.$loadinput = $("<input>", {
        type: "file"
    }).change(function() {
        var e = this;
        if (e.files && e.files[0]) {
            if (!e.files[0].name.endsWith(".pz"))
                return void CM.templates.selectResult(-1, "The selected file is not a Clipmaker project file. Please choose a .pz project file.");
            CM.templates.$hidemsg.text("loading..."),
            CM.templates.$hidectrls.show(),
            CM.templates.ctrlCancel = !1,
            CM.templates.ctrlState = 0,
            CM.templates.load(e.files[0])
        }
    })),
    CM.templates.$loadinput[0].value = null,
    CM.templates.$loadinput.trigger("click")
}
,
CM.templates.saveButton = function() {
    this.$hidemsg.text("saving..."),
    this.$hidectrls.show(),
    this.ctrlCancel = !1,
    this.ctrlState = 1,
    this.save()
}
,
CM.save = function() {
    CM.templates.saveButton()
}
,
CM.templates.submitButton = function() {
    this.submit.title.length < 6 ? this.selectResult(-2, "Your creation's title is too short.") : (CM.timeline.disable(!0),
    this.percentDone = 10,
    this.$progress.triggerHandler("update"),
    this.$submit.hide(),
    this.$working.show(),
    this.ctrlCancel = !1,
    this.ctrlState = 2,
    this.renderThumbnail())
}
,
CM.templates.renderThumbnail = function() {
    $(CM.renderCanv).detach(),
    CM.resizeViewport(660, 372),
    CM.enableRenderLoop = !1,
    cancelAnimationFrame(CM.animFrameReq),
    CM.setRenderMode(!0),
    CM.download.finishVideoFrame = function() {
        if (!(this.waitingPrepare > 0)) {
            CM.render(null, !0);
            var e = document.createElement("canvas");
            e.width = 330,
            e.height = 186,
            e.getContext("2d").drawImage(CM.renderCanv, 0, 0, 330, 186),
            PZ.canvasToBlob(e, CM.templates.control)
        }
    }
    ,
    CM.download.waitingPrepare = 1,
    CM.updateScene(!0),
    CM.download.waitingPrepare--,
    CM.download.finishVideoFrame()
}
,
CM.templates.submitSend = function() {
    var e = this
      , t = new FormData;
    t.append("title", e.submit.title),
    t.append("description", e.submit.description),
    t.append("toolId", e.submit.tool),
    t.append("categoryId", e.submit.category),
    t.append("inspiredId", e.id),
    t.append("project", e.templateBlob),
    t.append("thumbnail", e.thumbnailBlob),
    PZ.api("/creations", "post", t).then(e.control).catch(e.control)
}
,
CM.templates.save = function() {
    PZ.archive.files = [],
    CM.enableRenderLoop = !1,
    cancelAnimationFrame(CM.animFrameReq),
    PZ.archive.addFileString("id", this.id.toString());
    var e = {
        tool: "CM",
        version: "2.0.191"
    };
    PZ.archive.addFileString("pz", JSON.stringify(e)),
    this.saveWaiting = 1,
    CM.basics.save(),
    CM.scenes.save(),
    CM.objects.save(),
    CM.fx.save(),
    CM.camsequence.save(),
    CM.audio.save(),
    this.saveWaiting--,
    CM.templates.saveComplete()
}
,
CM.templates.saveComplete = function() {
    this.saveWaiting > 0 || PZ.file.getQuota(PZ.archive.tar.bind(PZ.archive, CM.templates.control))
}
,
CM.templates.load = function(e, t) {
    PZ.archive.files = [],
    CM.enableRenderLoop = !1,
    cancelAnimationFrame(CM.animFrameReq),
    PZ.archive.untar(e, CM.templates.control.bind(CM.templates, t))
}
,
CM.templates.loadObjects = function(e) {
    this.id = e || parseInt(PZ.archive.getFileString("id")) || 0,
    CM.basics.load(),
    CM.scenes.load(),
    CM.objects.load(),
    CM.fx.load(),
    CM.camsequence.load(),
    CM.audio.load(),
    PZ.editor.elevator_unloadtab(1),
    PZ.editor.elevator_unloadtab(5),
    PZ.editor.elevator_unloadtab(6),
    this.$hidectrls.hide(),
    CM.enableRenderLoop = !0,
    CM.render()
}
,
CM.templates.finish = function() {
    PZ.downloadBlob = null,
    PZ.archive.files = [],
    PZ.file.cleanUp(),
    CM.templates.templateBlob = null,
    CM.templates.thumbnailBlob = null,
    CM.timeline.disable(!1),
    0 === $(CM.renderCanv).parent().length && ($("#previewpane").append(CM.renderCanv),
    CM.resizeViewport()),
    CM.setRenderMode(CM.renderMode),
    CM.enableRenderLoop = !0,
    CM.render()
}
,
CM.basics = {},
CM.basics.load = function() {
    var e = PZ.archive.getFileString("basics");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        CM.frameWidth = t.frameWidth,
        CM.frameHeight = t.frameHeight,
        CM.frameRate = t.frameRate,
        CM.totalFrames = t.totalFrames,
        CM.timeline.setFrame(1),
        CM.timeline.update()
    }
}
,
CM.basics.save = function() {
    var e = {
        frameWidth: CM.frameWidth,
        frameHeight: CM.frameHeight,
        frameRate: CM.frameRate,
        totalFrames: CM.totalFrames
    };
    PZ.archive.addFileString("basics", JSON.stringify(e))
}
,
CM.basics.resolutions = [new THREE.Vector2(3840,2160), new THREE.Vector2(2560,1440), new THREE.Vector2(1920,1080), new THREE.Vector2(1280,720), new THREE.Vector2(854,480), new THREE.Vector2(640,360), new THREE.Vector2(426,240)],
CM.basics.props = {
    resolution: {
        title: "Video resolution",
        get: function() {
            for (var e = 0; e < this.resolutions.length; e++)
                if (CM.frameWidth === this.resolutions[e].x && CM.frameHeight === this.resolutions[e].y)
                    return e;
            return this.resolutions.length
        },
        set: function(e) {
            e >= this.resolutions.length ? (this.$customres.triggerHandler("update"),
            this.$customres.show()) : (this.$customres.hide(),
            CM.frameWidth = this.resolutions[e].x,
            CM.frameHeight = this.resolutions[e].y),
            CM.aspect != CM.frameWidth / CM.frameHeight && (CM.aspect = CM.frameWidth / CM.frameHeight,
            CM.camera.aspect = CM.aspect,
            CM.camera.updateProjectionMatrix(),
            CM.resizeViewport())
        },
        items: "3840x2160 (4k);2560x1440 (2k);1920x1080 (1080p);1280x720 (720p);854x480 (480p);640x360 (360p);426x240 (240p);custom"
    },
    customres: {
        title: "Custom resolution",
        subtitle1: "width",
        subtitle2: "height",
        get: function() {
            return new THREE.Vector2(CM.frameWidth,CM.frameHeight)
        },
        set: function(e, t) {
            0 === t ? CM.frameWidth = e : CM.frameHeight = e,
            CM.aspect = CM.frameWidth / CM.frameHeight,
            CM.resizeViewport()
        },
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        decimals: 0,
        dragstep: 1
    },
    framerate: {
        title: "Frame rate",
        get: function() {
            return 60 === CM.frameRate ? 1 : 0
        },
        set: function(e) {
            var t = CM.totalFrames / CM.frameRate;
            switch (e) {
            case 0:
                CM.download.multiplyRate = 1;
                break;
            case 1:
                CM.download.multiplyRate = .5
            }
            CM.totalFrames = t * CM.frameRate,
            CM.currentFrame > CM.totalFrames && (CM.currentFrame = CM.totalFrames),
            CM.timeline.update(),
            CM.timeline.scheduleRedraw()
        },
        items: "30;60"
    },
    videolength: {
        title: "Length (seconds)",
        get: function() {
            return CM.totalFrames / CM.frameRate
        },
        set: function(e) {
            CM.totalFrames = Math.floor(e * CM.frameRate),
            CM.timeline.setFrame(Math.min(CM.currentFrame, CM.totalFrames)),
            CM.timeline.update(),
            CM.timeline.scheduleRedraw()
        },
        vmax: 5e3,
        vmin: .1,
        decimals: 1,
        vstep: 1,
        dragstep: .01
    }
},
CM.basics.select = function(e) {
    var t = this;
    PZ.editor.generateTitle({
        title: "Basic settings"
    }).appendTo(e),
    PZ.editor.generateDropdown(t.props.resolution, t).appendTo(e),
    t.$customres = PZ.editor.generateDualInput(t.props.customres, t).hide().appendTo(e),
    PZ.editor.generateDropdown(t.props.framerate, t).appendTo(e),
    PZ.editor.generateInput(t.props.videolength, t).appendTo(e)
}
,
CM.scenes = {
    object: null,
    src: "",
    insertlocation: null,
    list2d: [{
        name: "Upload a Video",
        src: "video"
    }, {
        name: "Upload an Image",
        src: "image"
    }],
    list3d: [{
        name: "Outdoor",
        desc: "Various outdoor environments.",
        src: "outdoor"
    }, {
        name: "Blocks",
        desc: "Customizable block world.",
        src: "blocks"
    }, {
        name: "Darkness",
        desc: "Disables default scene lighting.",
        src: "darkness"
    }]
},
CM.scenes.load = function() {
    var e = PZ.archive.getFileString("scenes");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        this.src = t.src,
        this.change(this.src, "sceneobject")
    }
}
,
CM.scenes.save = function() {
    var e = {
        src: this.src
    };
    PZ.archive.addFileString("scenes", JSON.stringify(e)),
    null !== this.object && this.object.save("sceneobject")
}
,
CM.scenes.select = function(e) {
    var t = this;
    "object" == typeof e ? t.insertlocation = e : !0 === e && (CM.timeline.keyObject = null !== t.object && void 0 !== this.object.keyframeProps ? this.object.keyframeProps : null,
    CM.timeline.update());
    var r = t.insertlocation;
    if (null !== r)
        if (r.empty(),
        null !== t.object)
            PZ.editor.generateButton({
                title: "Choose something else",
                clickfn: function() {
                    t.change()
                }
            }).appendTo(r),
            t.object.select(r);
        else {
            PZ.editor.generateTitle({
                title: "Choose a scene"
            }).appendTo(r);
            for (var a = $("<ul>", {
                class: "pz-options"
            }), n = 0; n < t.list3d.length; n++)
                a.append($("<li>").append(t.list3d[n].name).append($("<span>").text(t.list3d[n].desc)).click(function() {
                    CM.scenes.change(t.list3d[$(this).index()].src)
                }));
            a.appendTo(r)
        }
}
,
CM.scenes.change = function(e, t) {
    if (null !== this.object) {
        try {
            this.object.unload()
        } catch (e) {}
        this.object = null,
        this.src = ""
    }
    void 0 !== e && "" !== e ? (null !== this.insertlocation && this.insertlocation.empty(),
    $.ajax({
        url: "modules/scenes/" + e + ".js?v=2.0.191",
        dataType: "text",
        cache: !0,
        success: function(r) {
            try {
                var a = new Function(r);
                CM.scenes.object = new a,
                CM.scenes.object.load(t),
                CM.scenes.src = e,
                CM.scenes.select(void 0 === t)
            } catch (e) {
                CM.scenes.change()
            }
        },
        error: function() {
            CM.scenes.select(void 0 === t)
        }
    })) : this.select(void 0 === t)
}
,
CM.objects = {
    objects: [],
    selected: null,
    listObject: null,
    selectLocation: null,
    drag: {},
    list: [{
        name: "Shape",
        desc: "Primitive object such as a box or sphere.",
        list: [{
            name: "Box"
        }, {
            name: "Cylinder"
        }, {
            name: "Rectangle"
        }, {
            name: "Circle"
        }, {
            name: "Sphere"
        }, {
            name: "Donut"
        }, {
            name: "Wire"
        }]
    }, {
        name: "Text",
        desc: "Custom 3D text."
    }, {
        name: "Model",
        desc: "Preset complex object.",
        list: [{
            name: "AK47"
        }, {
            name: "Mystery box"
        }]
    }, {
        name: "Light",
        desc: "Creates light and shadows in a scene.",
        hidelist: !0,
        list: [{
            name: "Spot light"
        }, {
            name: "Point light"
        }, {
            name: "Directional light"
        }]
    }, {
        name: "Particles",
        desc: "A system of many animated sprites."
    }, {
        name: "Group",
        desc: "Meta-object for combining objects into one."
    }, {
        name: "Custom Object",
        desc: "Import an OBJ object file."
    }]
},
CM.objects.updateHelpers = function() {
    this.selected && this.boxHelper.update(this.selected.threeObj)
}
,
CM.objects.createUI = function() {
    this.listObject = PZ.editor.generateList({}),
    this.listObject.data("objects", this.objects),
    this.listObject.data("group", CM.scene),
    this.listObject.css("height", .25 * $("#panecontainer").height())
}
,
CM.objects.load = function() {
    var e = PZ.archive.getFileString("objects");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        this.deleteAll();
        for (var r = 0; r < t.length; r++)
            this.addObject(t[r], "object" + r)
    }
}
,
CM.objects.save = function() {
    for (var e = [], t = 0; t < this.objects.length; t++)
        this.objects[t]instanceof CM.objects.shape ? e.push(0) : this.objects[t]instanceof CM.objects.text3d ? e.push(1) : this.objects[t]instanceof CM.objects.model ? e.push(2) : this.objects[t]instanceof CM.objects.light ? e.push(3) : this.objects[t]instanceof CM.objects.particles ? e.push(4) : this.objects[t]instanceof CM.objects.group && e.push(5),
        this.objects[t].save("object" + t);
    PZ.archive.addFileString("objects", JSON.stringify(e))
}
,
CM.objects.select = function(e) {
    e.css({
        height: "100%",
        width: "100%"
    }),
    PZ.editor.generateDropdownAdd({
        title: "Add Object",
        items: this.list,
        addfn: function(e, t) {
            e > 5 ? this.importOBJ() : this.addObject(e, t + 1)
        }
    }, this).appendTo(e),
    this.listObject.appendTo(e),
    this.$resizehandle = $("<div>", {
        style: "width:100%;height:5px;position:absolute;cursor:ns-resize;"
    }).drag("start", function(e, t) {
        t.startHeight = CM.objects.listObject.height(),
        t.top = CM.objects.listObject.position().top
    }).drag(function(e, t) {
        var r = Math.max(Math.min(t.startHeight + t.deltaY, 1200), 100);
        CM.objects.listObject.css("height", r),
        $(this).css("top", t.top + r),
        CM.objects.selectLocation.css("top", t.top + r + 6)
    }).css("top", this.listObject.position().top + this.listObject.height()).appendTo(e),
    this.selectLocation = PZ.editor.generatePlaceholder().attr("style", "overflow-y:auto;position:absolute;bottom:0;left:0;right:0;").css("top", this.listObject.position().top + this.listObject.height() + 6).appendTo(e)
}
,
CM.objects.importOBJ = function() {
    $("<input>", {
        type: "file",
        style: "height:0px;width:0px;overflow:hidden;"
    }).change(function(e) {
        if (this.files && this.files[0]) {
            var t = new FileReader
              , r = this.files[0].name;
            t.onload = function(e) {
                var t = new THREE.OBJLoader;
                try {
                    var a = t.parse(e.target.result)
                      , n = CM.objects.addObject(5);
                    n.props.name.set.call(n, r),
                    n.regroup(!0),
                    n.threeObj = a,
                    n.regroup(),
                    n.listObject.data("group", a);
                    for (var i = 0; i < a.children.length; i++)
                        CM.objects.addObject.call(n, 0, a.children[i])
                } catch (e) {
                    console.log(e)
                }
            }
            ,
            t.readAsText(this.files[0])
        }
    }).trigger("click")
}
,
CM.objects.addObject = function(e, t) {
    var r;
    if ("number" == typeof e)
        switch (e) {
        case 0:
            r = new CM.objects.shape;
            break;
        case 1:
            r = new CM.objects.text3d;
            break;
        case 2:
            r = new CM.objects.model;
            break;
        case 3:
            r = new CM.objects.light;
            break;
        case 4:
            r = new CM.objects.particles;
            break;
        case 5:
            r = new CM.objects.group
        }
    else
        r = e.clone(),
        t = e;
    var a = PZ.editor.generateListItem({
        selectfn: CM.objects.itemSelect,
        deletefn: CM.objects.itemDelete,
        clonefn: CM.objects.itemClone,
        isgroup: r instanceof CM.objects.group
    }).drag("start", CM.objects.itemDragStart).drag(CM.objects.itemDrag, {
        click: !0,
        distance: 2
    }).drag("end", CM.objects.itemDragEnd);
    return this.objects.push(r),
    r.$listitem = a,
    a.appendTo(this.listObject),
    r.load(t),
    r
}
,
CM.objects.selectObject = function(e) {
    this.selected !== e && (this.boxHelper.visible = !1,
    this.selected && this.selected.helper && (this.selected.helper.visible = !1),
    this.selected = e,
    this.selectLocation.empty(),
    CM.timeline.keyObject = null,
    PZ.widget3d.threeObj = null,
    PZ.widget3d.keyObject = null,
    null !== e && (e.select(this.selectLocation),
    CM.timeline.keyObject = e.keyObject,
    PZ.widget3d.threeObj = e.threeObj,
    PZ.widget3d.keyObject = e.keyObject,
    this.boxHelper.update(this.emptyObject),
    this.boxHelper.visible = !0,
    e.helper && (e.helper.visible = !0)),
    CM.timeline.update(),
    PZ.widget3d.update())
}
,
CM.objects.containsSelected = function(e) {
    if (this.selected === e)
        return !0;
    if (e instanceof CM.objects.group)
        for (var t = 0; t < e.objects.length; t++)
            if (this.containsSelected(e.objects[t]))
                return !0;
    return !1
}
,
CM.objects.deleteObject = function(e) {
    this.containsSelected(e) && this.selectObject(null),
    e.unload()
}
,
CM.objects.deleteAll = function() {
    null !== this.selected && this.selectObject(null),
    this.listObject.children().remove();
    for (var e = 0; e < this.objects.length; e++)
        this.objects[e].unload();
    this.objects.splice(0, this.objects.length)
}
,
CM.objects.cloneObject = function(e) {
    this.addObject(e)
}
,
CM.objects.itemSelect = function() {
    var e = $(this);
    e.hasClass("pz-listitem-selected") ? (e.removeClass("pz-listitem-selected"),
    CM.objects.selectObject(null)) : (CM.objects.listObject.find(".pz-listitem-selected").removeClass("pz-listitem-selected"),
    e.addClass("pz-listitem-selected"),
    CM.objects.selectObject(e.parent().data("objects")[e.prevAll("li").length]))
}
,
CM.objects.itemDelete = function(e) {
    var t = $(this).parent();
    CM.objects.deleteObject(t.parent().data("objects").splice(t.prevAll("li").length, 1)[0]),
    t.remove(),
    e.stopPropagation()
}
,
CM.objects.itemClone = function(e) {
    var t = $(this).parent();
    CM.objects.cloneObject(t.parent().data("objects")[t.prevAll("li").length]),
    e.stopPropagation()
}
,
CM.objects.itemDragStart = function(e, t) {
    CM.objects.drag.height = CM.objects.listObject.find("li").first().outerHeight(),
    CM.objects.drag.drag = t.drag,
    CM.objects.drag.timer = setInterval(CM.objects.itemDropCheck, 20)
}
,
CM.objects.itemDrag = function(e, t) {
    CM.objects.drag.pageY = e.pageY
}
,
CM.objects.itemDropCheck = function() {
    var e, t = CM.objects.listObject.find("li"), r = CM.objects.drag.pageY, a = CM.objects.drag.height;
    return t.attr("style", ""),
    t.each(function(t, n) {
        if (n !== CM.objects.drag.drag) {
            var i = $(n)
              , s = i.offset()
              , o = void 0 !== i.attr("group")
              , l = a * (o ? .3333 : .5);
            if (r >= s.top && r < s.top + a) {
                if (r - s.top < l && i.prevAll("li")[0] !== CM.objects.drag.drag)
                    i.attr("style", "border-top: 1px dashed #aaa");
                else if (r > a + s.top - l && i.nextAll("li")[0] !== CM.objects.drag.drag)
                    i.attr("style", "border-bottom: 1px dashed #aaa");
                else {
                    if (!0 !== o)
                        return !0;
                    i.attr("style", "border: 1px dashed #aaa")
                }
                return e = i,
                !1
            }
        }
    }),
    e
}
,
CM.objects.itemDragEnd = function(e, t) {
    CM.objects.drag.timer = clearInterval(CM.objects.drag.timer);
    var r = CM.objects.itemDropCheck();
    if (void 0 !== r) {
        var a = r.attr("style");
        r.attr("style", "");
        var n = $(t.drag);
        if (r[0] !== n[0]) {
            if (void 0 !== n.attr("group")) {
                if (n.next().find(r).length > 0)
                    return;
                n = n.add(n.next())
            }
            var i = n.first().prevAll("li").length
              , s = n.parent().data("objects").splice(i, 1)[0];
            n.detach();
            var o = r.prevAll("li").length;
            a.startsWith("border-top") ? (r.parent().data("objects").splice(o, 0, s),
            n.insertBefore(r)) : a.startsWith("border-bottom") ? (r.parent().data("objects").splice(o + 1, 0, s),
            void 0 !== r.attr("group") && (r = r.next()),
            n.insertAfter(r)) : (r.next().data("objects").push(s),
            r.next().append(n)),
            s.regroup()
        }
    }
}
,
CM.objects.light = function() {
    this.threeObj = null,
    this.helper = null,
    this.objectType = 1,
    this.keyframeProps = {
        position: [{
            frame: 1,
            value: new THREE.Vector3(0,10,0),
            tweenfn: 257
        }],
        target: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        color: [{
            frame: 1,
            value: new THREE.Color(1,1,1),
            tweenfn: 1
        }],
        intensity: [{
            frame: 1,
            value: 1,
            tweenfn: 1
        }],
        angle: [{
            frame: 1,
            value: 60,
            tweenfn: 1
        }]
    },
    this.keyObject = this.keyframeProps
}
,
CM.objects.light.prototype.props = {
    position: {
        title: "Position",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.position)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.position)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    target: {
        title: "Target",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.target)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.target)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    color: {
        title: "Color",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericColorGet(e, this.keyframeProps.color)
        },
        set: function(e, t) {
            return PZ.keyframes.genericColorSet(e, t, this.keyframeProps.color)
        },
        hasalpha: !1
    },
    intensity: {
        title: "Intensity",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.intensity)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.intensity)
        },
        vmax: 100,
        vmin: 0,
        vstep: 1,
        decimals: 1,
        dragstep: .01
    },
    angle: {
        title: "Angle",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.angle)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.angle)
        },
        vmax: 90,
        vmin: 0,
        vstep: 1
    }
},
CM.objects.light.prototype.save = function(e) {
    var t = {
        objectType: this.objectType,
        keyframeProps: this.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(t))
}
,
CM.objects.light.prototype.load = function(e) {
    if ("string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var r = JSON.parse(t);
            this.objectType = r.objectType,
            $.extend(this.keyframeProps, r.keyframeProps),
            PZ.keyframes.toVector3(this.keyframeProps.position),
            PZ.keyframes.toVector3(this.keyframeProps.target),
            PZ.keyframes.toColor(this.keyframeProps.color)
        }
    } else
        "number" == typeof e && (this.objectType = e);
    this.changeObjectType(this.objectType)
}
,
CM.objects.light.prototype.clone = function() {
    var e = new this.constructor;
    return e.objectType = this.objectType,
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    e.keyObject = e.keyframeProps,
    e
}
,
CM.objects.light.prototype.unload = function() {
    this.regroup(!0),
    CM.updateMaterials()
}
,
CM.objects.light.prototype.updateFrame = function() {
    this.threeObj.position.copy(TWEEN.getValue(this.keyframeProps.position, CM.currentFrame)),
    void 0 !== this.threeObj.target && (this.threeObj.target.position.copy(TWEEN.getValue(this.keyframeProps.target, CM.currentFrame)),
    this.threeObj.target.updateMatrixWorld()),
    this.threeObj.color.copy(TWEEN.getValue(this.keyframeProps.color, CM.currentFrame)),
    this.threeObj.intensity = TWEEN.getValue(this.keyframeProps.intensity, CM.currentFrame),
    void 0 !== this.threeObj.angle && (this.threeObj.angle = TWEEN.getValue(this.keyframeProps.angle, CM.currentFrame) * Math.PI / 180),
    this.helper.update()
}
,
CM.objects.light.prototype.changeObjectType = function(e) {
    switch (this.objectType = e,
    this.objectType) {
    case 1:
        this.$listitem.children("span").text("Light"),
        this.threeObj = new THREE.SpotLight(16777215,1,0,Math.PI / 3,.5,1),
        this.helper = new THREE.SpotLightHelper(this.threeObj),
        this.helper.children[0].layers.set(2);
        break;
    case 2:
        this.$listitem.children("span").text("Light: Point"),
        this.threeObj = new THREE.PointLight(16777215,1,0),
        this.helper = new THREE.PointLightHelper(this.threeObj,5),
        this.helper.layers.set(2);
        break;
    case 3:
        this.$listitem.children("span").text("Light: Directional"),
        this.threeObj = new THREE.DirectionalLight(16777215,1),
        this.helper = new THREE.DirectionalLightHelper(this.threeObj,5),
        this.helper.children[0].layers.set(2),
        this.helper.children[1].layers.set(2)
    }
    this.helper.visible = !1,
    this.threeObj.castShadow = !0,
    this.threeObj.shadow.mapSize.height = 1024,
    this.threeObj.shadow.mapSize.width = 1024,
    this.threeObj.shadow.camera.near = 5,
    this.threeObj.shadow.camera.far = 1500,
    this.threeObj.shadow.camera.fov = 60,
    this.threeObj.shadow.bias = 0,
    this.regroup(),
    CM.updateMaterials()
}
,
CM.objects.light.prototype.regroup = function(e) {
    this.threeObj && (this.threeObj.parent && (this.threeObj.parent.remove(this.threeObj),
    this.helper.parent.remove(this.helper)),
    e || (this.$listitem.parent().data("group").add(this.threeObj),
    this.$listitem.parent().data("group").add(this.helper),
    this.threeObj.layers.mask = this.threeObj.parent.layers.mask))
}
,
CM.objects.light.prototype.select = function(e) {
    var t = this;
    switch (t.insertlocation = e,
    t.objectType) {
    case 1:
        PZ.editor.generateTitle({
            title: "Light"
        }).appendTo(e),
        PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
        PZ.editor.generateTriInput(t.props.target, t).appendTo(e),
        PZ.editor.generateColorPicker(t.props.color, t).appendTo(e),
        PZ.editor.generateInput(t.props.intensity, t).appendTo(e),
        PZ.editor.generateInput(t.props.angle, t).appendTo(e);
        break;
    case 2:
        PZ.editor.generateTitle({
            title: "Point light"
        }).appendTo(e),
        PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
        PZ.editor.generateInput(t.props.intensity, t).appendTo(e),
        PZ.editor.generateColorPicker(t.props.color, t).appendTo(e);
        break;
    case 3:
        PZ.editor.generateTitle({
            title: "Directional light"
        }).appendTo(e),
        PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
        PZ.editor.generateTriInput(t.props.target, t).appendTo(e),
        PZ.editor.generateColorPicker(t.props.color, t).appendTo(e),
        PZ.editor.generateInput(t.props.intensity, t).appendTo(e)
    }
}
,
CM.objects.model = function() {
    this.threeObj = null,
    this.objectType = 0,
    this.keyframeProps = {},
    this.keyObject = null,
    this.normalProps = {},
    this.normalProps.positionMode = 0
}
,
CM.objects.model.prototype.props = {
    lidrotation: {
        title: "Lid open",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.lidrotation)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.lidrotation)
        },
        vmax: 100,
        vmin: 0,
        vstep: 5,
        decimals: 1,
        dragstep: .1
    },
    position: {
        title: "Position",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.position)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.position)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    rotation: {
        title: "Rotation",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericRotation3Get(e, this.keyframeProps.rotation)
        },
        set: function(e, t) {
            return PZ.keyframes.genericRotation3Set(e, t, this.keyframeProps.rotation)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    scale: {
        title: "Scale",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.scale)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.scale)
        },
        vmax: 1e3,
        vmin: .001,
        vstep: .1,
        dragstep: .001,
        decimals: 3
    }
},
CM.objects.model.prototype.clone = function() {
    var e = new this.constructor;
    return e.objectType = this.objectType,
    PZ.extend(e.normalProps, this.normalProps),
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    e
}
,
CM.objects.model.prototype.load = function(e) {
    if ("string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var r = JSON.parse(t);
            this.objectType = r.objectType,
            $.extend(this.normalProps, r.normalProps),
            $.extend(this.keyframeProps, r.keyframeProps),
            PZ.keyframes.toVector3(this.keyframeProps.position),
            PZ.keyframes.toVector3(this.keyframeProps.rotation),
            PZ.keyframes.toVector3(this.keyframeProps.scale, !0)
        }
    } else if ("number" == typeof e)
        switch (this.objectType = e,
        this.objectType) {
        case 1:
            this.keyframeProps = {
                position: [{
                    frame: 1,
                    value: new THREE.Vector3(0,0,0),
                    tweenfn: 257
                }],
                rotation: [{
                    frame: 1,
                    value: new THREE.Vector3(0,0,0),
                    tweenfn: 257
                }],
                scale: [{
                    frame: 1,
                    value: new THREE.Vector3(1,1,1),
                    tweenfn: 257
                }]
            };
            break;
        case 2:
            this.keyframeProps = {
                lidrotation: [{
                    frame: 1,
                    value: 0,
                    tweenfn: 1
                }],
                position: [{
                    frame: 1,
                    value: new THREE.Vector3(0,0,0),
                    tweenfn: 257
                }],
                rotation: [{
                    frame: 1,
                    value: new THREE.Vector3(0,0,0),
                    tweenfn: 257
                }],
                scale: [{
                    frame: 1,
                    value: new THREE.Vector3(1,1,1),
                    tweenfn: 257
                }]
            }
        }
    this.keyObject = this.keyframeProps,
    this.changeObjectType(this.objectType, e)
}
,
CM.objects.model.prototype.save = function(e) {
    var t = this
      , r = {
        objectType: t.objectType,
        normalProps: t.normalProps,
        keyframeProps: t.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(r))
}
,
CM.objects.model.prototype.unload = function() {
    this.regroup(!0)
}
,
CM.objects.model.prototype.regroup = function(e) {
    this.threeObj && (this.threeObj.parent && this.threeObj.parent.remove(this.threeObj),
    e || (this.$listitem.parent().data("group").add(this.threeObj),
    this.threeObj.layers.mask = this.threeObj.parent.layers.mask))
}
,
CM.objects.model.prototype.updateFrame = function() {
    this.threeObj && (this.threeObj.position.copy(TWEEN.getValue(this.keyframeProps.position, CM.currentFrame)),
    this.threeObj.rotation.setFromVector3(TWEEN.getValue(this.keyframeProps.rotation, CM.currentFrame)),
    this.threeObj.scale.copy(TWEEN.getValue(this.keyframeProps.scale, CM.currentFrame))),
    this.lidobj && this.lidobj.rotation.set(.032 * TWEEN.getValue(this.keyframeProps.lidrotation, CM.currentFrame), 0, 0)
}
,
CM.objects.model.prototype.changeObjectType = function(e, t) {
    var r = this;
    switch (r.objectType = e,
    this.objectType) {
    case 1:
        r.objectName = "AK47",
        (a = new THREE.JSONLoader).load("assets/models/ak/ak.json", function(e) {
            var t = new THREE.TextureLoader
              , a = new THREE.MeshPhongMaterial({
                map: t.load("assets/models/ak/ak_m.jpg"),
                normalMap: t.load("assets/models/ak/ak_n.jpg"),
                specularMap: t.load("assets/models/ak/ak_s.jpg"),
                specular: 16777215
            })
              , n = new THREE.Mesh(e,a);
            n.scale.set(5, 5, 5),
            r.threeObj = new THREE.Group,
            r.threeObj.add(n),
            r.regroup()
        });
        break;
    case 2:
        r.objectName = "Mystery box";
        var a = new THREE.TextureLoader
          , n = new THREE.JSONLoader
          , i = new THREE.JSONLoader;
        n.load("assets/models/mysterybox/base.json", function(e) {
            i.load("assets/models/mysterybox/lid.json", function(t) {
                var n = new THREE.MeshPhongMaterial({
                    map: a.load("assets/models/mysterybox/base_m.png"),
                    normalMap: a.load("assets/models/mysterybox/base_n.jpg"),
                    specularMap: a.load("assets/models/mysterybox/base_s.png"),
                    specular: 16777215,
                    shininess: 20
                })
                  , i = new THREE.MeshPhongMaterial({
                    map: a.load("assets/models/mysterybox/lid_m.png"),
                    normalMap: a.load("assets/models/mysterybox/lid_n.jpg"),
                    specularMap: a.load("assets/models/mysterybox/lid_s.png"),
                    specular: 16777215
                })
                  , s = new THREE.Mesh(e,n)
                  , o = new THREE.Mesh(t,i);
                r.lidobj = o,
                s.scale.set(5, 5, 5),
                s.position.set(0, -4.7, 0),
                o.scale.set(5, 5, 5),
                o.position.set(0, 13.7, 6),
                r.threeObj = new THREE.Group,
                r.threeObj.add(s),
                r.threeObj.add(o),
                r.$listitem.parent().data("group").add(r.threeObj)
            })
        })
    }
    r.$listitem.children("span").text("Model: " + r.objectName)
}
,
CM.objects.model.prototype.select = function(e) {
    var t = this;
    t.insertlocation = e,
    PZ.editor.generateTitle({
        title: t.objectName
    }).appendTo(e),
    2 === t.objectType && (PZ.editor.generateInput(t.props.lidrotation, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e)),
    PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.rotation, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.scale, t).appendTo(e)
}
,
CM.objects.particles = function() {
    this.threeObj = null,
    this.colorCanvas = null,
    this.keyframeProps = {
        time: []
    },
    this.keyObject = this.keyframeProps,
    this.normalProps = {},
    this.normalProps.number = 0,
    this.normalProps.rate = 0,
    this.normalProps.lifetime = 0,
    this.normalProps.accel = new THREE.Vector3(0,0,0),
    this.normalProps.pdist = 0,
    this.normalProps.ipos = new THREE.Vector3(0,0,0),
    this.normalProps.pspread = new THREE.Vector3(0,0,0),
    this.normalProps.iradius = 0,
    this.normalProps.rspread = 0,
    this.normalProps.vdist = 0,
    this.normalProps.ivel = new THREE.Vector3(0,0,0),
    this.normalProps.vspread = new THREE.Vector3(0,0,0),
    this.normalProps.irvel = 0,
    this.normalProps.rvspread = 0,
    this.normalProps.iang = 0,
    this.normalProps.aspread = 0,
    this.normalProps.angvel = 0,
    this.normalProps.avspread = 0,
    this.normalProps.color = [],
    this.normalProps.size = [],
    this.normalProps.blending = 0,
    this.normalProps.texture = "artsy"
}
,
CM.objects.particles.prototype.presetTextures = ["artsy", "bar_blur", "circle_sft2", "circle_soft", "circle_soft3", "circle_soft4", "clumpy_blurry", "dots", "flash1", "flash2", "flash3", "misc", "nebula", "plume", "plume2", "plume3", "plume4", "ring", "ring_blur", "ring_partial", "skull", "smokey", "splash", "splotch1", "splotch2", "spots", "squae_soft_blob", "square_soft", "squiggles", "star1", "star2", "star3", "tentacles", "tribal", "twisted", "waterfall"],
CM.objects.particles.prototype.vertexShader = ["uniform vec2 resolution;", "uniform float time;", "uniform float rate;", "uniform float lifetime;", "uniform vec3 accel;", "uniform float vdist;", "uniform vec3 ivel;", "uniform vec3 vspread;", "uniform float pdist;", "uniform vec3 ipos;", "uniform vec3 pspread;", "uniform float iang;", "uniform float aspread;", "uniform float angvel;", "uniform float avspread;", "uniform sampler2D color;", "uniform sampler2D size;", "attribute float pid;", "varying vec4 vColor;", "varying float vAngle;", "float rand(vec2 n) { ", "return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);", "}", "void main()", "{", "float delay = pid / rate;", "float ptime = mod(time - delay, lifetime);", "float count = floor((time - delay) / lifetime) + 1.0;", "vColor = step(delay, time) * texture2D(color, vec2(ptime / lifetime, 0.0));", "float scale = texture2D(size, vec2(ptime / lifetime, 0.0)).r;", "float a = iang + (-0.5 + rand(vec2(pid*count, pid)) ) * aspread;", "float avel = angvel + avspread * (rand(vec2(pid*count, 10.0)) - 0.5);", "vAngle = avel*ptime + a;", "#if PDIST==0", "vec3 p = ( vec3(-0.5) + ", "  vec3(rand(vec2(pid*count, 1.0)), rand(vec2(pid*count, 2.0)), rand(vec2(pid*count, 3.0))) )", "  * pspread;", "#else", "float phi = rand(vec2(pid*count, 1.0)) * 6.28319;", "float theta = rand(vec2(pid*count, 2.0)) * 3.14159 * pspread.z;", "float rad = (rand(vec2(pid*count, 3.0)) - 0.5) * pspread.y + pspread.x;", "vec3 p = rad * vec3(sin(phi)*cos(theta), sin(phi)*sin(theta), cos(phi));", "#endif", "#if VDIST==0", "vec3 v = ivel + ( vec3(-0.5) + ", "  vec3(rand(vec2(pid*count, 3.0)), rand(vec2(pid*count, 2.0)), rand(vec2(pid*count, 1.0))) )", "  * vspread;", "#else", "vec3 v = (ivel.x + (rand(vec2(pid*count, 3.0)) - 0.5) * vspread.x) * normalize(p);", "#endif", "vec3 pos = accel*ptime*ptime*0.5 + v*ptime + p + ipos;", "vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0 );", "gl_PointSize = scale * resolution.x * 50.0 / length( mvPosition.xyz );", "gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
CM.objects.particles.prototype.fragmentShader = ["uniform sampler2D texture;", "varying vec4 vColor;", "varying float vAngle;", "void main()", "{", "float x = gl_PointCoord.x - 0.5;", "float y = 1.0 - gl_PointCoord.y - 0.5;", "float c = cos(-vAngle);", "float s = sin(-vAngle);", "vec2 rotatedUV = vec2(c * x + s * y + 0.5, c * y - s * x + 0.5);", "vec4 tcolor = texture2D( texture,  rotatedUV );", "gl_FragColor = tcolor * vColor;", "}"].join("\n"),
CM.objects.particles.prototype.props = {
    time: {
        title: "Time",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.time)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.time)
        },
        vmax: 1e4,
        vmin: -1,
        vstep: .01,
        decimals: 2,
        dragstep: .01
    },
    color: {
        title: "Color",
        get: function() {
            return this.normalProps.color
        },
        set: function(e) {
            this.normalProps.color = e,
            this.redrawgradient(this.colorCanvas, this.normalProps.color),
            this.material.uniforms.color.value.needsUpdate = !0
        }
    },
    size: {
        title: "Size",
        get: function() {
            return this.normalProps.size
        },
        set: function(e) {
            this.normalProps.size = e,
            this.redrawgradient(this.sizeCanvas, this.normalProps.size),
            this.material.uniforms.size.needsUpdate = !0,
            this.material.uniforms.size.value.needsUpdate = !0
        }
    },
    number: {
        title: "Number of particles",
        get: function() {
            return this.normalProps.number
        },
        set: function(e) {
            this.normalProps.number = e,
            this.updateNumber()
        },
        vmax: 1e5,
        vmin: 1,
        vstep: 1
    },
    rate: {
        title: "Emitter rate",
        get: function() {
            return this.normalProps.rate
        },
        set: function(e) {
            this.normalProps.rate = e,
            this.material.uniforms.rate.value = e
        },
        vmax: 1e4,
        vmin: 1,
        vstep: 1
    },
    lifetime: {
        title: "Particle lifetime",
        get: function() {
            return this.normalProps.lifetime
        },
        set: function(e) {
            this.normalProps.lifetime = e,
            this.material.uniforms.lifetime.value = e
        },
        dragstep: .001,
        decimals: 2,
        vmax: 1e3,
        vmin: .01,
        vstep: 1
    },
    pdist: {
        title: "Position mode",
        items: "box;sphere;disk",
        get: function() {
            return this.normalProps.pdist > 0 ? (this.$pspread.hide(),
            this.$iradius.attr("style", ""),
            this.$rspread.attr("style", "")) : (this.$pspread.attr("style", ""),
            this.$iradius.hide(),
            this.$rspread.hide()),
            this.normalProps.pdist
        },
        set: function(e) {
            this.normalProps.pdist = e,
            this.material.defines.PDIST = 0 === e ? 0 : 1,
            this.material.needsUpdate = !0,
            e > 0 ? (this.material.uniforms.pspread.value.x = this.normalProps.iradius,
            this.material.uniforms.pspread.value.y = this.normalProps.rspread,
            this.material.uniforms.pspread.value.z = 1 === e ? 1 : 0,
            this.$pspread.hide(),
            this.$iradius.attr("style", ""),
            this.$rspread.attr("style", "")) : (this.material.uniforms.pspread.value.copy(this.normalProps.pspread),
            this.$pspread.attr("style", ""),
            this.$iradius.hide(),
            this.$rspread.hide())
        }
    },
    ipos: {
        title: "Position",
        get: function() {
            return this.normalProps.ipos
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.ipos.x = e;
                break;
            case 1:
                this.normalProps.ipos.y = e;
                break;
            case 2:
                this.normalProps.ipos.z = e
            }
            this.material.uniforms.ipos.value.copy(this.normalProps.ipos)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1
    },
    pspread: {
        title: "Spread",
        get: function() {
            return this.normalProps.pspread
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.pspread.x = e;
                break;
            case 1:
                this.normalProps.pspread.y = e;
                break;
            case 2:
                this.normalProps.pspread.z = e
            }
            this.material.uniforms.pspread.value.copy(this.normalProps.pspread)
        },
        vmax: 1e4,
        vmin: 0,
        vstep: 1
    },
    iradius: {
        title: "Radius",
        get: function() {
            return this.normalProps.iradius
        },
        set: function(e) {
            this.normalProps.iradius = e,
            this.material.uniforms.pspread.value.x = e
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1
    },
    rspread: {
        title: "Spread",
        get: function() {
            return this.normalProps.rspread
        },
        set: function(e) {
            this.normalProps.rspread = e,
            this.material.uniforms.pspread.value.y = e
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1
    },
    vdist: {
        title: "Speed mode",
        items: "box;sphere",
        get: function() {
            return this.normalProps.vdist > 0 ? (this.$ivel.hide(),
            this.$vspread.hide(),
            this.$irvel.attr("style", ""),
            this.$rvspread.attr("style", "")) : (this.$ivel.attr("style", ""),
            this.$vspread.attr("style", ""),
            this.$irvel.hide(),
            this.$rvspread.hide()),
            this.normalProps.vdist
        },
        set: function(e) {
            this.normalProps.vdist = e,
            this.material.defines.VDIST = e,
            this.material.needsUpdate = !0,
            e > 0 ? (this.material.uniforms.ivel.value.x = this.normalProps.irvel,
            this.material.uniforms.vspread.value.x = this.normalProps.rvspread,
            this.$ivel.hide(),
            this.$vspread.hide(),
            this.$irvel.attr("style", ""),
            this.$rvspread.attr("style", "")) : (this.material.uniforms.ivel.value.copy(this.normalProps.ivel),
            this.material.uniforms.vspread.value.copy(this.normalProps.vspread),
            this.$ivel.attr("style", ""),
            this.$vspread.attr("style", ""),
            this.$irvel.hide(),
            this.$rvspread.hide())
        }
    },
    ivel: {
        title: "Speed",
        get: function() {
            return this.normalProps.ivel
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.ivel.x = e;
                break;
            case 1:
                this.normalProps.ivel.y = e;
                break;
            case 2:
                this.normalProps.ivel.z = e
            }
            this.material.uniforms.ivel.value.copy(this.normalProps.ivel)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1
    },
    vspread: {
        title: "Spread",
        get: function() {
            return this.normalProps.vspread
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.vspread.x = e;
                break;
            case 1:
                this.normalProps.vspread.y = e;
                break;
            case 2:
                this.normalProps.vspread.z = e
            }
            this.material.uniforms.vspread.value.copy(this.normalProps.vspread)
        },
        vmax: 1e4,
        vmin: 0,
        vstep: 1
    },
    irvel: {
        title: "Speed",
        get: function() {
            return this.normalProps.irvel
        },
        set: function(e) {
            this.normalProps.irvel = e,
            this.material.uniforms.ivel.value.x = e
        },
        vmax: 1e4,
        vmin: -1e3,
        vstep: 1
    },
    rvspread: {
        title: "Spread",
        get: function() {
            return this.normalProps.rvspread
        },
        set: function(e) {
            this.normalProps.rvspread = e,
            this.material.uniforms.vspread.value.x = e
        },
        vmax: 1e4,
        vmin: 0,
        vstep: 1
    },
    accel: {
        title: "Gravity",
        get: function() {
            return this.normalProps.accel
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.accel.x = e;
                break;
            case 1:
                this.normalProps.accel.y = e;
                break;
            case 2:
                this.normalProps.accel.z = e
            }
            this.material.uniforms.accel.value.copy(this.normalProps.accel)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1
    },
    iang: {
        title: "Rotation",
        get: function() {
            return this.normalProps.iang
        },
        set: function(e) {
            this.normalProps.iang = e,
            this.material.uniforms.iang.value = e / 180 * Math.PI
        },
        vmax: 360,
        vmin: 0,
        vstep: 1
    },
    aspread: {
        title: "Spread",
        get: function() {
            return this.normalProps.aspread
        },
        set: function(e) {
            this.normalProps.aspread = e,
            this.material.uniforms.aspread.value = e / 180 * Math.PI
        },
        vmax: 360,
        vmin: 0,
        vstep: 1
    },
    angvel: {
        title: "Rotation speed",
        get: function() {
            return this.normalProps.angvel
        },
        set: function(e) {
            this.normalProps.angvel = e,
            this.material.uniforms.angvel.value = e / 180 * Math.PI
        },
        vmax: 1e3,
        vmin: -1e3,
        vstep: 1
    },
    avspread: {
        title: "Spread",
        get: function() {
            return this.normalProps.avspread
        },
        set: function(e) {
            this.normalProps.avspread = e,
            this.material.uniforms.avspread.value = e / 180 * Math.PI
        },
        vmax: 1e3,
        vmin: -1e3,
        vstep: 1
    },
    blending: {
        title: "Blending mode",
        items: "normal;add",
        get: function() {
            return this.normalProps.blending
        },
        set: function(e) {
            this.normalProps.blending = e,
            this.material.blending = e + 1
        }
    },
    texture: {
        title: "Texture",
        items: CM.objects.particles.prototype.presetTextures.join(";") + ";custom",
        get: function() {
            var e = CM.objects.particles.prototype.presetTextures.indexOf(this.normalProps.texture);
            return e >= 0 ? (this.$customtexture.hide(),
            e) : (this.$customtexture.attr("style", ""),
            CM.objects.particles.prototype.presetTextures.length)
        },
        set: function(e) {
            if (e >= CM.objects.particles.prototype.presetTextures.length)
                this.$customtexture.attr("style", "");
            else {
                this.$customtexture.hide(),
                this.normalProps.texture = CM.objects.particles.prototype.presetTextures[e];
                var t = this.material.uniforms.texture;
                null !== t.value && (PZ.textures.unload(t.value.image),
                t.value.dispose(),
                t.value = null);
                var r = new THREE.TextureLoader;
                t.value = r.load("assets/textures/particles/" + this.normalProps.texture + ".png")
            }
        }
    },
    customtexture: {
        title: "Custom texture",
        accept: "image/*",
        set: function(e) {
            this.normalProps.texture = "";
            var t = this.material.uniforms.texture;
            e.files && e.files[0] && PZ.textures.load(e.files[0], function(e) {
                null !== t.value && (PZ.textures.unload(t.value.image),
                t.value.dispose(),
                t.value = null),
                t.value = new THREE.Texture(e),
                t.value.needsUpdate = !0
            })
        }
    }
},
CM.objects.particles.prototype.redrawgradient = function(e, t) {
    for (var r = e.getContext("2d"), a = r.createLinearGradient(0, 0, e.width, 0), n = 0; n < t.length; n++)
        a.addColorStop(t[n].position, t[n].color);
    r.clearRect(0, 0, e.width, e.height),
    r.fillStyle = a,
    r.fillRect(0, 0, e.width, e.height)
}
,
CM.objects.particles.prototype.load = function(e) {
    if (this.$listitem.children("span").text("Particles"),
    this.colorCanvas = document.createElement("canvas"),
    this.colorCanvas.width = 32,
    this.colorCanvas.height = 1,
    this.sizeCanvas = document.createElement("canvas"),
    this.sizeCanvas.width = 32,
    this.sizeCanvas.height = 1,
    this.material = new THREE.ShaderMaterial({
        uniforms: {
            resolution: {
                type: "v2",
                value: CM.resolution
            },
            texture: {
                type: "t",
                value: null
            },
            color: {
                type: "t",
                value: new THREE.Texture(this.colorCanvas)
            },
            size: {
                type: "t",
                value: new THREE.Texture(this.sizeCanvas)
            },
            time: {
                type: "f",
                value: 0
            },
            rate: {
                type: "f",
                value: 0
            },
            lifetime: {
                type: "f",
                value: 0
            },
            accel: {
                type: "v3",
                value: new THREE.Vector3
            },
            vdist: {
                type: "f",
                value: 0
            },
            ivel: {
                type: "v3",
                value: new THREE.Vector3
            },
            vspread: {
                type: "v3",
                value: new THREE.Vector3
            },
            pdist: {
                type: "f",
                value: 0
            },
            ipos: {
                type: "v3",
                value: new THREE.Vector3
            },
            pspread: {
                type: "v3",
                value: new THREE.Vector3
            },
            iang: {
                type: "f",
                value: 0
            },
            aspread: {
                type: "f",
                value: 0
            },
            angvel: {
                type: "f",
                value: 0
            },
            avspread: {
                type: "f",
                value: 0
            }
        },
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        transparent: !0,
        depthTest: !0,
        depthWrite: !1
    }),
    this.threeObj = new THREE.Points(new THREE.BufferGeometry,this.material),
    this.threeObj.frustumCulled = !1,
    "string" == typeof e) {
        var t, r = PZ.archive.getFileString(e);
        if (void 0 !== r) {
            var a = JSON.parse(r);
            t = a.image,
            PZ.extend(this.normalProps, a.normalProps),
            $.extend(this.keyframeProps, a.keyframeProps)
        }
        var n = this.material.uniforms.texture;
        PZ.textures.load(t || e + "_img", function(e) {
            n.value = new THREE.Texture(e),
            n.value.needsUpdate = !0
        })
    } else
        "object" == typeof e ? null !== e.material.uniforms.texture.value && ((n = this.material.uniforms.texture).value = new THREE.Texture(PZ.textures.clone(e.material.uniforms.texture.value.image)),
        n.value.needsUpdate = !0) : this.randomize();
    this.updateProps(),
    this.regroup()
}
,
CM.objects.particles.prototype.randomize = function() {
    var e = this.normalProps
      , t = PZ.random.number(1, 4, !0);
    e.color = [];
    for (a = 0; a < t; a++)
        e.color.push({
            position: PZ.random.number(0, 1),
            color: PZ.random.color(0 === a && t > 1 || a === t - 1)
        });
    var r = PZ.random.number(1, 4, !0);
    e.size = [];
    for (var a = 0; a < r; a++)
        e.size.push({
            position: PZ.random.number(0, 1),
            color: PZ.random.grayColor()
        });
    e.number = PZ.random.number(1, 1e3, !0),
    e.rate = Math.round(PZ.random.number(.1, 3) * e.number),
    PZ.random.number(0, 1) > .5 ? e.lifetime = e.number / e.rate : e.lifetime = PZ.random.normal(CM.totalTime, .5 * CM.totalTime),
    this.keyframeProps.time.splice(0, this.keyframeProps.time.length);
    var n = 0;
    PZ.random.number(0, 1) > .3 && (n = e.number / e.rate),
    this.keyframeProps.time.push({
        frame: 1,
        value: n,
        tweenfn: 1
    }),
    this.keyframeProps.time.push({
        frame: CM.totalFrames,
        value: n + CM.totalTime * PZ.random.number(.1, 3),
        tweenfn: PZ.random.number(0, 1) > .9 ? PZ.random.number(2, 31, !0) : 1
    }),
    e.pdist = PZ.random.number(0, 2, !0);
    var i = 500 * PZ.random.number(0, 2, !0);
    0 === e.pdist ? e.pspread.set(PZ.random.normal(i, 300), PZ.random.normal(i, 300), PZ.random.normal(i, 300)) : (e.iradius = PZ.random.normal(i, 300),
    e.rspread = PZ.random.number(1, 2 * e.iradius)),
    e.vdist = PZ.random.number(0, 1, !0),
    0 === e.vdist ? (e.ivel.set(PZ.random.normal(0, 100), PZ.random.normal(0, 100), PZ.random.normal(0, 100)),
    e.vspread.set(Math.abs(PZ.random.normal(0, 100)), Math.abs(PZ.random.normal(0, 100)), Math.abs(PZ.random.normal(0, 100)))) : (e.irvel = PZ.random.normal(100, 200),
    e.rvspread = Math.abs(PZ.random.normal(0, 100))),
    PZ.random.number(0, 1) > .3 ? e.accel.set(PZ.random.normal(0, 100), PZ.random.normal(0, 100), PZ.random.normal(0, 100)) : e.accel.set(0, 0, 0),
    e.iang = PZ.random.number(0, 359),
    PZ.random.number(0, 1) > .2 ? e.aspread = PZ.random.number(0, 359) : e.aspread = 0,
    PZ.random.number(0, 1) > .4 ? (e.angvel = PZ.random.normal(0, 20),
    e.avspread = Math.abs(PZ.random.normal(0, 200))) : (e.angvel = 0,
    e.avspread = 0),
    e.blending = PZ.random.number(0, 1, !0),
    e.texture = this.presetTextures[PZ.random.number(0, this.presetTextures.length - 1, !0)]
}
,
CM.objects.particles.prototype.updateProps = function() {
    var e = this.material.uniforms
      , t = this.normalProps;
    if (this.redrawgradient(this.colorCanvas, t.color),
    this.redrawgradient(this.sizeCanvas, t.size),
    e.color.value.needsUpdate = !0,
    e.size.value.needsUpdate = !0,
    this.updateNumber(),
    e.rate.value = t.rate,
    e.lifetime.value = t.lifetime,
    e.ipos.value.copy(t.ipos),
    this.material.defines.PDIST = 0 === t.pdist ? 0 : 1,
    t.pdist > 0 ? (e.pspread.value.x = t.iradius,
    e.pspread.value.y = t.rspread,
    e.pspread.value.z = 1 === t.pdist ? 1 : 0) : e.pspread.value.copy(t.pspread),
    this.material.defines.VDIST = t.vdist,
    t.vdist > 0 ? (e.ivel.value.x = t.irvel,
    e.vspread.value.x = t.rvspread) : (e.ivel.value.copy(t.ivel),
    e.vspread.value.copy(t.vspread)),
    e.accel.value.copy(t.accel),
    e.iang.value = t.iang / 180 * Math.PI,
    e.aspread.value = t.aspread / 180 * Math.PI,
    e.angvel.value = t.angvel / 180 * Math.PI,
    e.avspread.value = t.avspread / 180 * Math.PI,
    this.material.blending = t.blending + 1,
    "" !== t.texture) {
        var r = e.texture;
        null !== r.value && (PZ.textures.unload(r.value.image),
        r.value.dispose(),
        r.value = null);
        var a = new THREE.TextureLoader;
        r.value = a.load("assets/textures/particles/" + t.texture + ".png")
    }
    this.material.needsUpdate = !0
}
,
CM.objects.particles.prototype.clone = function() {
    var e = new this.constructor;
    return PZ.extend(e.normalProps, this.normalProps),
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    e.keyObject = e.keyframeProps,
    e
}
,
CM.objects.particles.prototype.updateNumber = function() {
    null !== this.threeObj.geometry && this.threeObj.geometry.dispose();
    for (var e = new Float32Array(3 * this.normalProps.number), t = new Float32Array(this.normalProps.number), r = 0; r < this.normalProps.number; r++)
        t[r] = r,
        e[3 * r] = 0,
        e[3 * r + 1] = 0,
        e[3 * r + 2] = 0;
    this.threeObj.geometry = new THREE.BufferGeometry,
    this.threeObj.geometry.addAttribute("position", new THREE.BufferAttribute(e,3)),
    this.threeObj.geometry.addAttribute("pid", new THREE.BufferAttribute(t,1)),
    this.threeObj.geometry.buffersNeedUpdate = !0
}
,
CM.objects.particles.prototype.save = function(e) {
    var t = this
      , r = {
        normalProps: t.normalProps,
        keyframeProps: t.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(r));
    var a = t.material.uniforms.texture;
    "" === t.normalProps.texture && null !== a.value && (CM.templates.saveWaiting++,
    PZ.textures.save(a.value.image, e + "_img", function() {
        CM.templates.saveWaiting--,
        CM.templates.saveComplete()
    }, !0))
}
,
CM.objects.particles.prototype.unload = function() {
    var e = this.material.uniforms.texture;
    null !== e.value && PZ.textures.unload(e.value.image),
    this.regroup(!0)
}
,
CM.objects.particles.prototype.regroup = function(e) {
    this.threeObj && (this.threeObj.parent && this.threeObj.parent.remove(this.threeObj),
    e || (this.$listitem.parent().data("group").add(this.threeObj),
    this.threeObj.layers.mask = this.threeObj.parent.layers.mask))
}
,
CM.objects.particles.prototype.updateFrame = function() {
    this.material.uniforms.time.value = TWEEN.getValue(this.keyframeProps.time, CM.currentFrame)
}
,
CM.objects.particles.prototype.select = function(e) {
    var t = this;
    PZ.editor.generateTitle({
        title: "Particles",
        randomize: function() {
            t.randomize(),
            t.updateProps(),
            CM.timeline.update(),
            e.children(".proprow").trigger("update")
        }
    }).appendTo(e),
    PZ.editor.generateInput(t.props.time, t).appendTo(e),
    PZ.editor.generateGradientPicker(t.props.color, t).appendTo(e),
    PZ.editor.generateGradientPicker(t.props.size, t).appendTo(e),
    PZ.editor.generateInput(t.props.number, t).appendTo(e),
    PZ.editor.generateInput(t.props.rate, t).appendTo(e),
    PZ.editor.generateInput(t.props.lifetime, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    t.$pspread = PZ.editor.generateTriInput(t.props.pspread, t),
    t.$iradius = PZ.editor.generateInput(t.props.iradius, t).hide(),
    t.$rspread = PZ.editor.generateInput(t.props.rspread, t).hide(),
    PZ.editor.generateDropdown(t.props.pdist, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.ipos, t).appendTo(e),
    t.$pspread.appendTo(e),
    t.$iradius.appendTo(e),
    t.$rspread.appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    t.$ivel = PZ.editor.generateTriInput(t.props.ivel, t),
    t.$vspread = PZ.editor.generateTriInput(t.props.vspread, t),
    t.$irvel = PZ.editor.generateInput(t.props.irvel, t).hide(),
    t.$rvspread = PZ.editor.generateInput(t.props.rvspread, t).hide(),
    PZ.editor.generateDropdown(t.props.vdist, t).appendTo(e),
    t.$ivel.appendTo(e),
    t.$vspread.appendTo(e),
    t.$irvel.appendTo(e),
    t.$rvspread.appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateTriInput(t.props.accel, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateInput(t.props.iang, t).appendTo(e),
    PZ.editor.generateInput(t.props.aspread, t).appendTo(e),
    PZ.editor.generateInput(t.props.angvel, t).appendTo(e),
    PZ.editor.generateInput(t.props.avspread, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    t.$customtexture = PZ.editor.generateFileUpload(t.props.customtexture, t).hide(),
    PZ.editor.generateDropdown(t.props.blending, t).appendTo(e),
    PZ.editor.generateDropdown(t.props.texture, t).appendTo(e),
    t.$customtexture.appendTo(e)
}
,
CM.objects.shape = function() {
    this.threeObj = null,
    this.objectType = 0,
    this.keyframeProps = {
        position: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        rotation: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        scale: [{
            frame: 1,
            value: new THREE.Vector3(1,1,1),
            tweenfn: 257
        }]
    },
    this.keyObject = null,
    this.normalProps = {},
    this.normalProps.size = new THREE.Vector3(10,10,10),
    this.normalProps.detail = new THREE.Vector2(10,10),
    this.normalProps.thetaRange = new THREE.Vector2(0,2 * Math.PI),
    this.normalProps.phiRange = new THREE.Vector2(0,Math.PI),
    this.normalProps.arc = 2 * Math.PI,
    this.normalProps.thickness = 2,
    this.normalProps.loops = 5,
    this.normalProps.openEnded = !1,
    this.appearanceObj = "singlecolor"
}
,
CM.objects.shape.prototype.props = {
    box_size: {
        title: "Size",
        subtitle1: "width",
        subtitle2: "height",
        subtitle3: "depth",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.size.x = e;
                break;
            case 1:
                this.normalProps.size.y = e;
                break;
            case 2:
                this.normalProps.size.z = e
            }
            this.updateProps()
        }
    },
    cylinder_size: {
        title: "Size",
        subtitle1: "top radius",
        subtitle2: "bottom radius",
        subtitle3: "height",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.size.x = e;
                break;
            case 1:
                this.normalProps.size.y = e;
                break;
            case 2:
                this.normalProps.size.z = e
            }
            this.updateProps()
        }
    },
    cylinder_detail: {
        title: "Detail",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.detail.x
        },
        set: function(e) {
            this.normalProps.detail.x = e,
            this.updateProps()
        }
    },
    cylinder_open: {
        title: "Open ended",
        items: "false;true",
        get: function() {
            return this.normalProps.openEnded
        },
        set: function(e) {
            this.normalProps.openEnded = e,
            this.updateProps()
        }
    },
    rect_size: {
        title: "Size",
        subtitle1: "width",
        subtitle2: "height",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.size.x = e;
                break;
            case 1:
                this.normalProps.size.y = e
            }
            this.updateProps()
        }
    },
    circle_radius: {
        title: "Radius",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size.x
        },
        set: function(e) {
            this.normalProps.size.x = e,
            this.updateProps()
        }
    },
    circle_detail: {
        title: "Detail",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.detail.x
        },
        set: function(e) {
            this.normalProps.detail.x = e,
            this.updateProps()
        }
    },
    sphere_radius: {
        title: "Radius",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size.x
        },
        set: function(e) {
            this.normalProps.size.x = e,
            this.updateProps()
        }
    },
    sphere_detail: {
        title: "Detail",
        subtitle1: "horizontal",
        subtitle2: "vertical",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.detail
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.detail.x = e;
                break;
            case 1:
                this.normalProps.detail.y = e
            }
            this.updateProps()
        }
    },
    donut_size: {
        title: "Size",
        subtitle1: "radius",
        subtitle2: "tube radius",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.size.x = e;
                break;
            case 1:
                this.normalProps.size.y = e
            }
            this.updateProps()
        }
    },
    donut_detail: {
        title: "Detail",
        subtitle1: "inner",
        subtitle2: "outer",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.detail
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.detail.x = e;
                break;
            case 1:
                this.normalProps.detail.y = e
            }
            this.updateProps()
        }
    },
    path_size: {
        title: "Size",
        subtitle1: "horizontal",
        subtitle2: "vertical",
        vmax: 1e4,
        vmin: 0,
        vstep: 1,
        get: function() {
            return this.normalProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.size.x = e;
                break;
            case 1:
                this.normalProps.size.y = e
            }
            this.updateProps()
        }
    },
    path_stretch: {
        title: "Stetch",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.size.z
        },
        set: function(e) {
            this.normalProps.size.z = e,
            this.updateProps()
        }
    },
    path_thickness: {
        title: "Thickness",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.thickness
        },
        set: function(e) {
            this.normalProps.thickness = e,
            this.updateProps()
        }
    },
    path_loops: {
        title: "Loops",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.loops
        },
        set: function(e) {
            this.normalProps.loops = e,
            this.updateProps()
        }
    },
    path_detail: {
        title: "Detail",
        subtitle1: "inner",
        subtitle2: "outer",
        vmax: 1e4,
        vmin: 1,
        vstep: 1,
        get: function() {
            return this.normalProps.detail
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.detail.x = e;
                break;
            case 1:
                this.normalProps.detail.y = e
            }
            this.updateProps()
        }
    },
    position: {
        title: "Position",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.position)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.position)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    rotation: {
        title: "Rotation",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericRotation3Get(e, this.keyframeProps.rotation)
        },
        set: function(e, t) {
            return PZ.keyframes.genericRotation3Set(e, t, this.keyframeProps.rotation)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    scale: {
        title: "Scale",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.scale)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.scale)
        },
        vmax: 1e3,
        vmin: .001,
        vstep: .1,
        dragstep: .001,
        decimals: 3
    },
    appearance: {
        title: "Appearance",
        get: function() {
            return CM.appearance.getIndex(this.appearanceObj)
        },
        items: CM.appearance.string,
        set: function(e) {
            CM.appearance.objects[this.appearanceObj].unload(this.threeObj),
            CM.appearance.unload(this.appearanceObj),
            this.appearanceObj = CM.appearance.list[e].file,
            this.appearancePlaceholder.empty(),
            CM.appearance.load(this.appearanceObj),
            CM.appearance.objects[this.appearanceObj].load(this.threeObj),
            CM.appearance.objects[this.appearanceObj].select(this.threeObj, this.appearancePlaceholder),
            this.keyObject = $.extend({}, this.keyframeProps, this.threeObj.material.keyframeProps),
            CM.timeline.keyObject = this.keyObject,
            CM.timeline.update(),
            this.appearancePlaceholder.parent().scrollTop(this.appearancePlaceholder.parent().height())
        }
    }
},
CM.objects.shape.prototype.clone = function() {
    var e = new this.constructor;
    return e.objectType = this.objectType,
    PZ.extend(e.normalProps, this.normalProps),
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    e.appearanceObj = this.appearanceObj,
    e
}
,
CM.objects.shape.prototype.load = function(e) {
    if ("string" == typeof e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var r = JSON.parse(t);
            this.objectType = r.objectType,
            this.appearanceObj = r.appearanceObj,
            PZ.extend(this.normalProps, r.normalProps),
            $.extend(this.keyframeProps, r.keyframeProps),
            PZ.keyframes.toVector3(this.keyframeProps.position),
            PZ.keyframes.toVector3(this.keyframeProps.rotation),
            PZ.keyframes.toVector3(this.keyframeProps.scale, !0)
        }
    } else if ("number" == typeof e)
        this.objectType = e;
    else if ("object" == typeof e && e instanceof CM.objects.shape == !1)
        return this.objectType = 99,
        void this.changeObjectType(this.objectType, 0, e);
    0 !== this.objectType ? this.changeObjectType(this.objectType, e) : this.$listitem.children("[title='delete']").trigger("click")
}
,
CM.objects.shape.prototype.save = function(e) {
    var t = this;
    t.threeObj && CM.appearance.objects[t.appearanceObj].save(t.threeObj, e + "_appearance"),
    99 === t.objectType && PZ.archive.addFileString(e + "_geometry", JSON.stringify(t.threeObj.geometry.toJSON()));
    var r = {
        objectType: t.objectType,
        normalProps: t.normalProps,
        appearanceObj: t.appearanceObj,
        keyframeProps: t.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(r))
}
,
CM.objects.shape.prototype.unload = function() {
    this.threeObj && (CM.appearance.objects[this.appearanceObj].unload(this.threeObj),
    CM.appearance.unload(this.appearanceObj),
    this.regroup(!0))
}
,
CM.objects.shape.prototype.regroup = function(e) {
    this.threeObj && (this.threeObj.parent && this.threeObj.parent.remove(this.threeObj),
    e || (this.$listitem.parent().data("group").add(this.threeObj),
    this.threeObj.layers.mask = this.threeObj.parent.layers.mask))
}
,
CM.objects.shape.prototype.updateFrame = function(e) {
    this.threeObj.position.copy(TWEEN.getValue(this.keyframeProps.position, CM.currentFrame)),
    this.threeObj.rotation.setFromVector3(TWEEN.getValue(this.keyframeProps.rotation, CM.currentFrame)),
    this.threeObj.scale.copy(TWEEN.getValue(this.keyframeProps.scale, CM.currentFrame)),
    CM.appearance.objects[this.appearanceObj].update(this.threeObj, e)
}
,
CM.objects.shape.prototype.updateProps = function() {
    switch (this.threeObj.geometry && this.threeObj.geometry.dispose(),
    this.objectType) {
    case 1:
        this.threeObj.geometry = new THREE.BoxGeometry(this.normalProps.size.x,this.normalProps.size.y,this.normalProps.size.z);
        break;
    case 2:
        this.threeObj.geometry = new THREE.CylinderGeometry(this.normalProps.size.x,this.normalProps.size.y,this.normalProps.size.z,this.normalProps.detail.x,1,this.normalProps.openEnded);
        break;
    case 3:
        this.threeObj.geometry = new THREE.PlaneGeometry(this.normalProps.size.x,this.normalProps.size.y);
        break;
    case 4:
        this.threeObj.geometry = new THREE.CircleGeometry(this.normalProps.size.x,this.normalProps.detail.x,this.normalProps.thetaRange.x,this.normalProps.thetaRange.y);
        break;
    case 5:
        this.threeObj.geometry = new THREE.SphereGeometry(this.normalProps.size.x,this.normalProps.detail.x,this.normalProps.detail.y,this.normalProps.thetaRange.x,this.normalProps.thetaRange.y,this.normalProps.phiRange.x,this.normalProps.phiRange.y);
        break;
    case 6:
        this.threeObj.geometry = new THREE.TorusGeometry(this.normalProps.size.x,this.normalProps.size.y,this.normalProps.detail.x,this.normalProps.detail.y,this.normalProps.arc);
        break;
    case 7:
        for (var e = [], t = 0; t < this.normalProps.loops * this.normalProps.detail.y; t++)
            e.push(new THREE.Vector3(this.normalProps.size.x * Math.cos(2 * Math.PI * t / this.normalProps.detail.y),this.normalProps.size.y * Math.sin(2 * Math.PI * t / this.normalProps.detail.y),this.normalProps.size.z * t / this.normalProps.detail.y));
        for (var r = new THREE.CatmullRomCurve3(e), a = {
            steps: 10 * this.normalProps.detail.y,
            bevelEnabled: !1,
            extrudePath: r
        }, n = [], i = this.normalProps.thickness, t = 0; t < this.normalProps.detail.x; t++) {
            var s = t / this.normalProps.detail.x * 2 * Math.PI;
            n.push(new THREE.Vector2(Math.cos(s) * i,Math.sin(s) * i))
        }
        var o = new THREE.Shape(n);
        this.threeObj.geometry = new THREE.ExtrudeGeometry(o,a),
        this.threeObj.geometry.computeFaceNormals(),
        this.threeObj.geometry.computeVertexNormals()
    }
    this.threeObj.geometry.center(),
    this.threeObj.geometry.buffersNeedUpdate = !0
}
,
CM.objects.shape.prototype.changeObjectType = function(e, t, r) {
    this.objectType = e;
    var a = this.$listitem.children("span");
    switch (this.objectType) {
    case 1:
        a.text("Shape: Box");
        break;
    case 2:
        a.text("Shape: Cylinder");
        break;
    case 3:
        a.text("Shape: Rectangle");
        break;
    case 4:
        a.text("Shape: Circle");
        break;
    case 5:
        a.text("Shape: Sphere");
        break;
    case 6:
        a.text("Shape: Donut");
        break;
    case 7:
        a.text("Shape: Wire");
        break;
    case 99:
        if (void 0 !== r)
            this.normalProps.name = r.name || "imported geometry",
            this.threeObj = r;
        else if ("string" == typeof t) {
            var n = PZ.archive.getFileString(t + "_geometry");
            if (void 0 !== n) {
                var r = (new THREE.BufferGeometryLoader).parse(JSON.parse(n));
                this.threeObj = new THREE.Mesh(r,null),
                this.regroup()
            }
        }
        a.text("Shape: " + this.normalProps.name.substring(0, 25))
    }
    null === this.threeObj && (this.threeObj = new THREE.Mesh(new THREE.Geometry,null),
    this.updateProps(),
    this.regroup()),
    this.threeObj.castShadow = !0,
    this.threeObj.receiveShadow = !0,
    CM.appearance.load(this.appearanceObj),
    "string" == typeof t ? t += "_appearance" : "object" == typeof t && (t = t.threeObj),
    CM.appearance.objects[this.appearanceObj].load(this.threeObj, t),
    this.keyObject = $.extend({}, this.keyframeProps, this.threeObj.material.keyframeProps)
}
,
CM.objects.shape.prototype.select = function(e) {
    var t = this;
    switch (t.insertlocation = e,
    t.objectType) {
    case 1:
        PZ.editor.generateTitle({
            title: "Box"
        }).appendTo(e),
        PZ.editor.generateTriInput(t.props.box_size, t).appendTo(e);
        break;
    case 2:
        PZ.editor.generateTitle({
            title: "Cylinder"
        }).appendTo(e),
        PZ.editor.generateTriInput(t.props.cylinder_size, t).appendTo(e),
        PZ.editor.generateInput(t.props.cylinder_detail, t).appendTo(e),
        PZ.editor.generateDropdown(t.props.cylinder_open, t).appendTo(e);
        break;
    case 3:
        PZ.editor.generateTitle({
            title: "Rectangle"
        }).appendTo(e),
        PZ.editor.generateDualInput(t.props.rect_size, t).appendTo(e);
        break;
    case 4:
        PZ.editor.generateTitle({
            title: "Circle"
        }).appendTo(e),
        PZ.editor.generateInput(t.props.circle_radius, t).appendTo(e),
        PZ.editor.generateInput(t.props.circle_detail, t).appendTo(e);
        break;
    case 5:
        PZ.editor.generateTitle({
            title: "Sphere"
        }).appendTo(e),
        PZ.editor.generateInput(t.props.sphere_radius, t).appendTo(e),
        PZ.editor.generateDualInput(t.props.sphere_detail, t).appendTo(e);
        break;
    case 6:
        PZ.editor.generateTitle({
            title: "Donut"
        }).appendTo(e),
        PZ.editor.generateDualInput(t.props.donut_size, t).appendTo(e),
        PZ.editor.generateDualInput(t.props.donut_detail, t).appendTo(e);
        break;
    case 7:
        PZ.editor.generateTitle({
            title: "Wire"
        }).appendTo(e),
        PZ.editor.generateDualInput(t.props.path_size, t).appendTo(e),
        PZ.editor.generateInput(t.props.path_stretch, t).appendTo(e),
        PZ.editor.generateInput(t.props.path_thickness, t).appendTo(e),
        PZ.editor.generateInput(t.props.path_loops, t).appendTo(e),
        PZ.editor.generateDualInput(t.props.path_detail, t).appendTo(e);
        break;
    case 99:
        PZ.editor.generateTitle({
            title: "Custom Object"
        }).appendTo(e)
    }
    99 !== t.objectType && PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.rotation, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.scale, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateDropdown(t.props.appearance, t).appendTo(e),
    t.appearancePlaceholder = PZ.editor.generatePlaceholder().appendTo(e),
    CM.appearance.objects[t.appearanceObj].select(t.threeObj, t.appearancePlaceholder)
}
,
CM.objects.text3d = function() {
    this.threeObj = null,
    this.keyframeProps = {
        position: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        rotation: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        scale: [{
            frame: 1,
            value: new THREE.Vector3(1,1,1),
            tweenfn: 257
        }]
    },
    this.keyObject = this.keyframeProps,
    this.normalProps = {},
    this.normalProps.size = new THREE.Vector2(20,3),
    this.normalProps.detail = 5,
    this.normalProps.bevel = !1,
    this.normalProps.bevelsize = new THREE.Vector2(.1,.5),
    this.normalProps.font = "bebas",
    this.normalProps.text = "clipmaker",
    this.normalProps.positionMode = 0,
    this.appearanceObj = "singlecolor"
}
,
CM.objects.text3d.prototype.props = {
    text: {
        get: function() {
            return this.normalProps.text
        },
        set: function(e) {
            this.normalProps.text = e,
            this.$listitem.children("span").text("Text: " + e.substr(0, 25)),
            this.updateProps()
        }
    },
    font: {
        title: "Font",
        get: function() {
            var e = PZ.fonts.preset.indexOf(this.normalProps.font);
            return e >= 0 ? (this.$customfont.hide(),
            e) : (this.$customfont.attr("style", ""),
            PZ.fonts.preset.length)
        },
        set: function(e) {
            if (e >= PZ.fonts.preset.length)
                this.$customfont.attr("style", "");
            else {
                this.$customfont.hide();
                var t = this;
                PZ.fonts.load(PZ.fonts.preset[e], function(e, r) {
                    PZ.fonts.unload(t.normalProps.font),
                    t.normalProps.font = e,
                    t.updateProps()
                })
            }
        }
    },
    fupload: {
        title: "Custom font",
        set: function(e) {
            if (e.files && e.files[0]) {
                var t = this;
                PZ.fonts.load(e.files[0], function(e, r) {
                    PZ.fonts.unload(t.normalProps.font),
                    t.normalProps.font = e,
                    t.updateProps()
                })
            }
        }
    },
    size: {
        title: "Size",
        subtitle1: "height",
        subtitle2: "thickness",
        get: function() {
            return this.normalProps.size
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.size.x = e;
                break;
            case 1:
                this.normalProps.size.y = e
            }
            this.updateProps()
        },
        vmax: 200,
        vmin: 1,
        vstep: 1
    },
    detail: {
        title: "Detail",
        get: function() {
            return this.normalProps.detail
        },
        set: function(e) {
            this.normalProps.detail = e,
            this.updateProps()
        },
        vmax: 200,
        vmin: 1,
        vstep: 1
    },
    bevel: {
        title: "Bevel",
        items: "off;on",
        get: function() {
            return Number(this.normalProps.bevel)
        },
        set: function(e) {
            this.normalProps.bevel = 1 === e,
            this.updateProps()
        }
    },
    bevelsize: {
        title: "Bevel size",
        subtitle1: "size",
        subtitle2: "thickness",
        get: function() {
            return this.normalProps.bevelsize
        },
        set: function(e, t) {
            switch (t) {
            case 0:
                this.normalProps.bevelsize.x = e;
                break;
            case 1:
                this.normalProps.bevelsize.y = e
            }
            this.updateProps()
        },
        vmax: 200,
        vmin: .1,
        vstep: .1,
        decimals: 1
    },
    center: {
        title: "Center point",
        items: "center;left;right;top;bottom;front;back",
        get: function() {
            return Number(this.normalProps.positionMode)
        },
        set: function(e) {
            this.normalProps.positionMode = e,
            this.updateProps()
        }
    },
    position: {
        title: "Position",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.position)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.position)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    rotation: {
        title: "Rotation",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericRotation3Get(e, this.keyframeProps.rotation)
        },
        set: function(e, t) {
            return PZ.keyframes.genericRotation3Set(e, t, this.keyframeProps.rotation)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    scale: {
        title: "Scale",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.scale)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.scale)
        },
        vmax: 1e3,
        vmin: .001,
        vstep: .1,
        dragstep: .001,
        decimals: 3
    },
    appearance: {
        title: "Appearance",
        get: function() {
            return CM.appearance.getIndex(this.appearanceObj)
        },
        items: CM.appearance.string,
        set: function(e) {
            CM.appearance.objects[this.appearanceObj].unload(this.threeObj),
            CM.appearance.unload(this.appearanceObj),
            this.appearanceObj = CM.appearance.list[e].file,
            this.appearancePlaceholder.empty(),
            CM.appearance.load(this.appearanceObj),
            CM.appearance.objects[this.appearanceObj].load(this.threeObj, void 0, !0),
            CM.appearance.objects[this.appearanceObj].select(this.threeObj, this.appearancePlaceholder),
            this.keyObject = $.extend({}, this.keyframeProps, this.threeObj.material.keyframeProps),
            CM.timeline.keyObject = this.keyObject,
            CM.timeline.update(),
            this.appearancePlaceholder.parent().scrollTop(this.appearancePlaceholder.parent().height())
        }
    }
},
CM.objects.text3d.prototype.updateProps = function() {
    this.threeObj.geometry.dispose(),
    this.threeObj.geometry = new THREE.TextGeometry(this.normalProps.text,{
        size: this.normalProps.size.x,
        height: this.normalProps.size.y,
        curveSegments: this.normalProps.detail,
        font: PZ.fonts.get(this.normalProps.font).parsed,
        bevelEnabled: this.normalProps.bevel,
        bevelThickness: this.normalProps.bevelsize.x,
        bevelSize: this.normalProps.bevelsize.y,
        material: 0,
        extrudeMaterial: 1
    }),
    this.threeObj.geometry.buffersNeedUpdate = !0,
    this.center()
}
,
CM.objects.text3d.prototype.load = function(e) {
    if (void 0 !== e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var r = JSON.parse(t);
            this.appearanceObj = r.appearanceObj,
            PZ.extend(this.normalProps, r.normalProps),
            $.extend(this.keyframeProps, r.keyframeProps),
            PZ.keyframes.toVector3(this.keyframeProps.position),
            PZ.keyframes.toVector3(this.keyframeProps.rotation),
            PZ.keyframes.toVector3(this.keyframeProps.scale, !0)
        }
    }
    var a = this;
    PZ.fonts.load(a.normalProps.font, a.updateProps.bind(this)),
    a.$listitem.children("span").text("Text: " + a.normalProps.text),
    a.threeObj = new THREE.Mesh(new THREE.Geometry,null),
    CM.appearance.load(a.appearanceObj),
    "string" == typeof e ? e += "_appearance" : "object" == typeof e && (e = e.threeObj),
    CM.appearance.objects[a.appearanceObj].load(a.threeObj, e, !0),
    a.keyObject = $.extend({}, a.keyframeProps, a.threeObj.material.keyframeProps),
    a.center(),
    a.threeObj.castShadow = !0,
    a.threeObj.receiveShadow = !0,
    a.regroup()
}
,
CM.objects.text3d.prototype.clone = function() {
    var e = new this.constructor;
    return PZ.extend(e.normalProps, this.normalProps),
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps),
    e.appearanceObj = this.appearanceObj,
    e
}
,
CM.objects.text3d.prototype.save = function(e) {
    var t = this;
    CM.appearance.objects[t.appearanceObj].save(t.threeObj, e + "_appearance");
    var r = {
        normalProps: t.normalProps,
        appearanceObj: t.appearanceObj,
        keyframeProps: t.keyframeProps
    };
    PZ.archive.addFileString(e, JSON.stringify(r)),
    CM.templates.saveWaiting++,
    PZ.fonts.save(this.normalProps.font, function() {
        CM.templates.saveWaiting--,
        CM.templates.saveComplete()
    })
}
,
CM.objects.text3d.prototype.unload = function() {
    this.threeObj && (CM.appearance.objects[this.appearanceObj].unload(this.threeObj),
    CM.appearance.unload(this.appearanceObj),
    PZ.fonts.unload(this.normalProps.font),
    this.regroup(!0))
}
,
CM.objects.text3d.prototype.regroup = function(e) {
    this.threeObj && (this.threeObj.parent && this.threeObj.parent.remove(this.threeObj),
    e || (this.$listitem.parent().data("group").add(this.threeObj),
    this.threeObj.layers.mask = this.threeObj.parent.layers.mask))
}
,
CM.objects.text3d.prototype.updateFrame = function(e) {
    this.threeObj && (this.threeObj.position.copy(TWEEN.getValue(this.keyframeProps.position, CM.currentFrame)),
    this.threeObj.rotation.setFromVector3(TWEEN.getValue(this.keyframeProps.rotation, CM.currentFrame)),
    this.threeObj.scale.copy(TWEEN.getValue(this.keyframeProps.scale, CM.currentFrame)),
    CM.appearance.objects[this.appearanceObj].update(this.threeObj, e))
}
,
CM.objects.text3d.prototype.center = function() {
    this.threeObj.geometry.computeBoundingBox();
    var e = this.threeObj.geometry.boundingBox
      , t = new THREE.Vector3;
    switch (t.addVectors(e.min, e.max),
    t.multiplyScalar(-.5),
    this.normalProps.positionMode) {
    case 1:
        t.x -= t.x;
        break;
    case 2:
        t.x += t.x;
        break;
    case 3:
        t.y += t.y;
        break;
    case 4:
        t.y -= t.y;
        break;
    case 5:
        t.z += t.z;
        break;
    case 6:
        t.z -= t.z
    }
    this.threeObj.geometry.applyMatrix((new THREE.Matrix4).makeTranslation(t.x, t.y, t.z)),
    this.threeObj.geometry.computeBoundingBox()
}
,
CM.objects.text3d.prototype.select = function(e) {
    var t = this;
    PZ.editor.generateTitle({
        title: "3D Text"
    }).appendTo(e),
    PZ.editor.generateTextInput(t.props.text, t).appendTo(e),
    t.$customfont = PZ.editor.generateFileUpload(t.props.fupload, t).hide(),
    PZ.editor.generateFontPicker(t.props.font, t).appendTo(e),
    t.$customfont.appendTo(e),
    PZ.editor.generateDualInput(t.props.size, t).appendTo(e),
    PZ.editor.generateInput(t.props.detail, t).appendTo(e),
    PZ.editor.generateDropdown(t.props.bevel, t).appendTo(e),
    PZ.editor.generateDualInput(t.props.bevelsize, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateDropdown(t.props.center, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.rotation, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.scale, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateDropdown(t.props.appearance, t).appendTo(e),
    t.appearancePlaceholder = PZ.editor.generatePlaceholder().appendTo(e),
    CM.appearance.objects[t.appearanceObj].select(t.threeObj, t.appearancePlaceholder)
}
,
PZ.fonts.parse = function(e, t) {
    var r = new FileReader;
    r.onload = function(a) {
        try {
            var n = (new THREE.TTFLoader).parse(a.target.result);
            e.parsed = new THREE.Font(n),
            e.name = n.familyName.toLowerCase()
        } catch (a) {
            return r.onload = function(r) {
                var a = r.target.result;
                try {
                    var n = JSON.parse(a);
                    e.parsed = new THREE.Font(n),
                    e.name = n.familyName.toLowerCase()
                } catch (e) {
                    return void console.log("unsupported font")
                }
                t()
            }
            ,
            void r.readAsText(e.file)
        }
        t()
    }
    ,
    r.readAsArrayBuffer(e.file)
}
,
CM.objects.group = function() {
    this.threeObj = new THREE.Object3D,
    this.keyframeProps = {
        enabled: [{
            frame: 1,
            value: 1,
            tweenfn: 0
        }],
        position: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        rotation: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        scale: [{
            frame: 1,
            value: new THREE.Vector3(1,1,1),
            tweenfn: 257
        }]
    },
    this.keyObject = null,
    this.normalProps = {
        name: "New Group",
        reflectionVisibility: 0
    },
    this.objects = [],
    this.listObject = $("<ul>"),
    this.listObject.data("objects", this.objects),
    this.listObject.data("group", this.threeObj)
}
,
CM.objects.group.prototype.props = {
    name: {
        get: function() {
            return this.normalProps.name
        },
        set: function(e) {
            this.normalProps.name = e,
            this.$listitem.children("span").text("Group: " + e.substring(0, 25))
        }
    },
    enabled: {
        title: "Enabled",
        keyframed: !0,
        tweens: !1,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.enabled)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.enabled)
        },
        items: "off;on"
    },
    reflectionVisibility: {
        title: "Visibility",
        get: function() {
            return this.normalProps.reflectionVisibility
        },
        set: function(e) {
            this.normalProps.reflectionVisibility = e,
            this.threeObj.traverse(function(t) {
                0 === e ? t.layers.set(0) : 1 === e ? t.layers.set(10) : (t.layers.set(0),
                t.layers.enable(10))
            })
        },
        items: "normal;reflections only;scene + reflections"
    },
    position: {
        title: "Position",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.position)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.position)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    rotation: {
        title: "Rotation",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericRotation3Get(e, this.keyframeProps.rotation)
        },
        set: function(e, t) {
            return PZ.keyframes.genericRotation3Set(e, t, this.keyframeProps.rotation)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    },
    scale: {
        title: "Scale",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.scale)
        },
        set: function(e, t) {
            return PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.scale)
        },
        vmax: 1e3,
        vmin: .001,
        vstep: .1,
        dragstep: .001,
        decimals: 3
    }
},
CM.objects.group.prototype.clone = function() {
    var e = new this.constructor;
    PZ.extend(e.normalProps, this.normalProps),
    e.keyframeProps = PZ.keyframes.cloneProps(this.keyframeProps);
    for (var t = 0; t < this.objects.length; t++)
        CM.objects.addObject.call(e, this.objects[t]);
    return e
}
,
CM.objects.group.prototype.load = function(e) {
    if (void 0 !== e) {
        var t = PZ.archive.getFileString(e);
        if (void 0 !== t) {
            var r = JSON.parse(t);
            $.extend(this.normalProps, r.normalProps),
            $.extend(this.keyframeProps, r.keyframeProps),
            PZ.keyframes.toVector3(this.keyframeProps.position),
            PZ.keyframes.toVector3(this.keyframeProps.rotation),
            PZ.keyframes.toVector3(this.keyframeProps.scale, !0);
            for (var a = 0; a < r.objects.length; a++)
                CM.objects.addObject.call(this, r.objects[a], e + "_" + a)
        }
    }
    this.keyObject = this.keyframeProps,
    this.regroup(),
    this.listObject.insertAfter(this.$listitem),
    this.$listitem.children("span").text("Group: " + this.normalProps.name);
    var n = this.listObject;
    this.$listitem.children("span").before($("<a>").append(PZ.editor.generateIcon("arrow").attr("style", "fill:#ccc;width:15px;height:15px;pointer-events:none")).attr("style", "width:15px;height:15px;float:left;margin-left:2px;margin-right:7px;visibility:visible").click(function(e) {
        $(this).toggleClass("rotated"),
        n.toggle(),
        e.stopPropagation()
    }))
}
,
CM.objects.group.prototype.save = function(e) {
    for (var t = this, r = {
        normalProps: t.normalProps,
        keyframeProps: t.keyframeProps,
        objects: []
    }, a = 0; a < this.objects.length; a++)
        this.objects[a]instanceof CM.objects.shape ? r.objects.push(0) : this.objects[a]instanceof CM.objects.text3d ? r.objects.push(1) : this.objects[a]instanceof CM.objects.model ? r.objects.push(2) : this.objects[a]instanceof CM.objects.light ? r.objects.push(3) : this.objects[a]instanceof CM.objects.particles ? r.objects.push(4) : this.objects[a]instanceof CM.objects.group && r.objects.push(5),
        this.objects[a].save(e + "_" + a);
    PZ.archive.addFileString(e, JSON.stringify(r))
}
,
CM.objects.group.prototype.unload = function() {
    this.listObject.remove();
    for (var e = 0; e < this.objects.length; e++)
        this.objects[e].unload();
    this.regroup(!0)
}
,
CM.objects.group.prototype.regroup = function(e) {
    if (this.threeObj && (this.threeObj.parent && this.threeObj.parent.remove(this.threeObj),
    !e)) {
        this.$listitem.parent().data("group").add(this.threeObj),
        this.threeObj.layers.mask = this.threeObj.parent.layers.mask,
        1 === this.normalProps.reflectionVisibility ? this.threeObj.layers.set(10) : 2 === this.normalProps.reflectionVisibility && (this.threeObj.layers.set(0),
        this.threeObj.layers.enable(10));
        var t = this.threeObj.layers.mask;
        this.threeObj.traverse(function(e) {
            e.layers.mask = t
        })
    }
}
,
CM.objects.group.prototype.updateFrame = function() {
    this.threeObj && (this.threeObj.visible = 1 === TWEEN.getValue(this.keyframeProps.enabled, CM.currentFrame),
    this.threeObj.position.copy(TWEEN.getValue(this.keyframeProps.position, CM.currentFrame)),
    this.threeObj.rotation.setFromVector3(TWEEN.getValue(this.keyframeProps.rotation, CM.currentFrame)),
    this.threeObj.scale.copy(TWEEN.getValue(this.keyframeProps.scale, CM.currentFrame)));
    for (var e = 0; e < this.objects.length; e++)
        this.objects[e].updateFrame()
}
,
CM.objects.group.prototype.select = function(e) {
    var t = this;
    t.insertlocation = e,
    PZ.editor.generateTitle({
        title: "Group"
    }).appendTo(e),
    PZ.editor.generateTextInput(t.props.name, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateDropdown(t.props.enabled, t).appendTo(e),
    PZ.editor.generateDropdown(t.props.reflectionVisibility, t).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateTriInput(t.props.position, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.rotation, t).appendTo(e),
    PZ.editor.generateTriInput(t.props.scale, t).appendTo(e)
}
,
CM.layers = {
    main: null
},
CM.layers.scene3d = function() {
    PZ.layer.call(this)
}
,
CM.layers.scene3d.prototype = Object.assign(Object.create(PZ.layer.prototype), {
    constructor: CM.layers.scene3d,
    type: 0,
    load: function(e) {
        var t = this;
        t.pass = new THREE.RenderPass(CM.scene,CM.renderCamera),
        t.quad.material = CM.compositor.copyPass.material.clone(),
        t.quad.material.transparent = !0
    },
    save: function(e) {},
    unload: function() {},
    select: function(e) {},
    resize: function(e, t, r) {
        this.layerProps.size.set(e, t),
        this.layerProps.resolution.set(e, t),
        this.resizeFx(e, t, r),
        CM.compositor.updateSwapSize()
    },
    update: function() {
        var e = this.layerProps.size.x / this.layerProps.resolution.x
          , t = this.layerProps.size.y / this.layerProps.resolution.y;
        this.group.position.set(this.layerProps.position.x, this.layerProps.position.y, 0),
        this.group.rotation.set(0, 0, this.layerProps.rotation),
        this.group.scale.set(this.layerProps.size.x / this.layerProps.resolution.x, this.layerProps.size.y / this.layerProps.resolution.y, 1),
        this.quad.material.uniforms.opacity.value = this.layerProps.opacity,
        this.quad.scale.set(this.layerProps.resolution.x * e, this.layerProps.resolution.y * t, 1);
        for (var r = 1; r < this.group.children.length; r++)
            this.group.children[r].scale.set(this.sdf.width * e, this.sdf.height * t, 1),
            this.group.children[r].material.uniforms.tSDF.value = this.sdf.texture
    }
}),
CM.fx = {
    objects: [],
    selected: null,
    listObject: null,
    selectLocation: null,
    drag: {},
    list: [{
        name: "COLOR",
        category: !0
    }, {
        name: "Negative",
        desc: "Inverts colors.",
        src: "negative"
    }, {
        name: "Grayscale",
        desc: "Desaturates colors.",
        src: "grayscale"
    }, {
        name: "Color Correction",
        desc: "Add, multiply, and exponentiate colors to adjust appearance.",
        src: "colorcorrection"
    }, {
        name: "Colorize",
        desc: "Changes the hue of the image.",
        src: "colorize"
    }, {
        name: "Posterize",
        desc: "Reduces the number of colors.",
        src: "posterize"
    }, {
        name: "ENHANCE",
        category: !0
    }, {
        name: "Antialiasing",
        desc: "Softens jagged, sharp edges.",
        src: "fxaa"
    }, {
        name: "Bloom",
        desc: "Adds a glowing effect to bright areas.",
        src: "bloom"
    }, {
        name: "Anamorphic Lens Flare",
        desc: "Creates horizontal flares from bright areas.",
        src: "anamorphicflare"
    }, {
        name: "DISTORT",
        category: !0
    }, {
        name: "RGB Shift",
        desc: "Shifts color channels apart.",
        src: "rgbshift"
    }, {
        name: "Fisheye",
        desc: "Simulates a fisheye lens.",
        src: "fisheye"
    }, {
        name: "Pulse",
        desc: "Distorts radially outward in a ripple pattern.",
        src: "pulse"
    }, {
        name: "Wavy",
        desc: "Distorts vertically in a wavy pattern.",
        src: "wavy"
    }, {
        name: "Pixelated",
        desc: "Reduces image resolution with large pixels.",
        src: "pixelated"
    }, {
        name: "Swirl",
        desc: "Distorts in a spiral pattern.",
        src: "swirl"
    }, {
        name: "Box Blur",
        desc: "Blurs the image using a fast blur technique.",
        src: "boxblur"
    }, {
        name: "Gaussian Blur",
        desc: "Blurs the image using a higher quality blur technique.",
        src: "gaussianblur"
    }, {
        name: "Radial Blur",
        desc: "Blurs radially from a specified point.",
        src: "radialblur"
    }, {
        name: "Static",
        desc: "Creates grainy, noisy distortion.",
        src: "static"
    }, {
        name: "Glitch",
        desc: "Simulates glitches by displacing potions of the image.",
        src: "glitch"
    }, {
        name: "FRAMING",
        category: !0
    }, {
        name: "Shutter",
        desc: "Simulates a camera shutter for cover and fade effects.",
        src: "shutter"
    }, {
        name: "Duplicate",
        desc: "Creates a grid of image copies.",
        src: "duplicate"
    }, {
        name: "Mirror",
        desc: "Uses reflection to create a symmetrical image.",
        src: "mirror"
    }, {
        name: "Overlay",
        desc: "Adds a full screen image overlay.",
        src: "overlay"
    }, {
        name: "Flip",
        desc: "Flips the image in the specified directions.",
        src: "flip"
    }]
},
CM.fx.createUI = function() {
    this.listObject = PZ.editor.generateList({}),
    this.listObject.css("height", .25 * $("#panecontainer").height())
}
,
CM.fx.load = function() {
    var e = PZ.archive.getFileString("fx");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        this.deleteAll(),
        CM.layers.main.fx = CM.fx.objects;
        for (var r = 0; r < t.length; r++)
            this.addObject(t[r], "fx" + r)
    }
}
,
CM.fx.save = function() {
    for (var e = [], t = 0; t < this.objects.length; t++)
        e.push(this.objects[t].src),
        this.objects[t].save("fx" + t);
    PZ.archive.addFileString("fx", JSON.stringify(e))
}
,
CM.fx.select = function(e) {
    e.css({
        height: "100%",
        width: "100%"
    }),
    PZ.editor.generateDropdownAdd({
        title: "Add Effect",
        items: this.list,
        addfn: function(e) {
            this.addObject(this.list[e].src)
        }
    }, this).appendTo(e),
    this.listObject.appendTo(e),
    this.$resizehandle = $("<div>", {
        style: "width:100%;height:5px;position:absolute;cursor:ns-resize;"
    }).drag("start", function(e, t) {
        t.startHeight = CM.fx.listObject.height(),
        t.top = CM.fx.listObject.position().top
    }).drag(function(e, t) {
        var r = Math.max(Math.min(t.startHeight + t.deltaY, 550), 100);
        CM.fx.listObject.css("height", r),
        $(this).css("top", t.top + r),
        CM.fx.selectLocation.css("top", t.top + r + 6)
    }).css("top", this.listObject.position().top + this.listObject.height()).appendTo(e),
    this.selectLocation = PZ.editor.generatePlaceholder().attr("style", "overflow-y:auto;position:absolute;bottom:0;left:0;right:0;").css("top", this.listObject.position().top + this.listObject.height() + 6).appendTo(e)
}
,
CM.fx.getName = function(e) {
    for (var t = 0; t < this.list.length; t++)
        if (this.list[t].src === e)
            return this.list[t].name
}
,
CM.fx.add = function(e, t, r, a) {
    var n = PZ.editor.generateListItem({
        selectfn: CM.fx.itemSelect,
        deletefn: CM.fx.itemDelete,
        clonefn: CM.fx.itemClone
    }).drag("start", CM.fx.itemDragStart).drag(CM.fx.itemDrag, {
        click: !0,
        distance: 2
    }).drag("end", CM.fx.itemDragEnd);
    n.children("span").text(this.getName(t)),
    void 0 !== a ? this.listObject.children("li").eq(a).after(n) : this.listObject.append(n),
    e.src = t,
    e.load(r),
    e.resize(CM.frameWidth, CM.frameHeight, CM.ratio)
}
,
CM.fx.addObject = function(e, t) {
    var r;
    if ("string" == typeof e ? (r = new PZ.loadingObject,
    $.ajax({
        url: "modules/fx/" + e + ".js?v=2.0.191",
        dataType: "text",
        cache: !0,
        async: !0,
        success: function(a) {
            for (var n = new Function(a), i = CM.fx.selected === r, s = 0; s < CM.fx.objects.length; s++)
                if (CM.fx.objects[s] === r) {
                    var o = CM.fx.listObject.children("li").eq(s);
                    CM.fx.objects[s] = new n,
                    CM.fx.add(CM.fx.objects[s], e, t, s),
                    o.remove(),
                    i && (CM.fx.selectObject(CM.fx.objects[s]),
                    CM.fx.listObject.children("li").eq(s).addClass("pz-listitem-selected"));
                    break
                }
        }
    })) : r = e.clone(),
    this.objects.push(r),
    r instanceof PZ.loadingObject) {
        var a = PZ.editor.generateListItem({
            selectfn: CM.fx.itemSelect,
            deletefn: CM.fx.itemDelete
        });
        r.$listitem = a,
        a.children("span").text("Loading..."),
        a.appendTo(this.listObject)
    } else
        CM.fx.add(r, e.src, e)
}
,
CM.fx.selectObject = function(e) {
    this.selected !== e && (this.selected = e,
    this.selectLocation.empty(),
    CM.timeline.keyObject = null,
    null !== e && (e.select(this.selectLocation),
    CM.timeline.keyObject = e.keyframeProps),
    CM.timeline.update())
}
,
CM.fx.deleteObject = function(e) {
    this.selected === e && this.selectObject(null),
    e.unload()
}
,
CM.fx.deleteAll = function() {
    null !== this.selected && this.selectObject(null),
    this.listObject.children().remove();
    for (var e = 0; e < this.objects.length; e++)
        this.objects[e].unload();
    this.objects = []
}
,
CM.fx.cloneObject = function(e) {
    this.addObject(e)
}
,
CM.fx.itemSelect = function() {
    var e = $(this);
    e.hasClass("pz-listitem-selected") ? (e.removeClass("pz-listitem-selected"),
    CM.fx.selectObject(null)) : (CM.fx.listObject.find(".pz-listitem-selected").removeClass("pz-listitem-selected"),
    e.addClass("pz-listitem-selected"),
    CM.fx.selectObject(CM.fx.objects[e.prevAll("li").length]))
}
,
CM.fx.itemDelete = function(e) {
    var t = $(this).parent();
    CM.fx.deleteObject(CM.fx.objects.splice(t.prevAll("li").length, 1)[0]),
    t.remove(),
    e.stopPropagation()
}
,
CM.fx.itemClone = function(e) {
    var t = $(this).parent();
    CM.fx.cloneObject(CM.fx.objects[t.prevAll("li").length]),
    e.stopPropagation()
}
,
CM.fx.itemDragStart = function(e, t) {
    CM.fx.drag.height = CM.fx.listObject.find("li").first().outerHeight(),
    CM.fx.drag.drag = t.drag,
    CM.fx.drag.timer = setInterval(CM.fx.itemDropCheck, 20)
}
,
CM.fx.itemDrag = function(e, t) {
    CM.fx.drag.pageY = e.pageY
}
,
CM.fx.itemDropCheck = function() {
    var e, t = CM.fx.listObject.find("li"), r = CM.fx.drag.pageY, a = CM.fx.drag.height;
    return t.attr("style", ""),
    t.each(function(t, n) {
        if (n !== CM.fx.drag.drag) {
            var i = $(n)
              , s = i.offset();
            if (r >= s.top && r < s.top + a) {
                if (r < s.top + .5 * a && i.prev()[0] !== CM.fx.drag.drag)
                    i.attr("style", "border-top: 1px dashed #aaa");
                else {
                    if (!(r > .5 * a + s.top && i.next()[0] !== CM.fx.drag.drag))
                        return !0;
                    i.attr("style", "border-bottom: 1px dashed #aaa")
                }
                return e = i,
                !1
            }
        }
    }),
    e
}
,
CM.fx.itemDragEnd = function(e, t) {
    CM.fx.drag.timer = clearInterval(CM.fx.drag.timer);
    var r = CM.fx.itemDropCheck();
    if (void 0 !== r) {
        var a = r.attr("style");
        r.attr("style", "");
        var n = $(t.drag);
        if (r[0] !== n[0]) {
            var i = n.prevAll("li").length
              , s = CM.fx.objects.splice(i, 1)[0];
            n.detach();
            var o = r.prevAll("li").length;
            a.startsWith("border-top") ? (CM.fx.objects.splice(o, 0, s),
            n.insertBefore(r)) : a.startsWith("border-bottom") && (CM.fx.objects.splice(o + 1, 0, s),
            n.insertAfter(r))
        }
    }
}
,
CM.camsequence = {
    projectionMode: 0,
    movementMode: 0,
    rotationMode: 0,
    shakeMode: 0,
    defaultShakeSettings: {
        x: {
            amplitude: 12,
            scale: .6,
            phase: 0,
            noise: .9,
            smooth: !0
        },
        y: {
            amplitude: 12,
            scale: .8,
            phase: 11,
            noise: .9,
            smooth: !0
        },
        z: {
            amplitude: 40,
            scale: .7,
            phase: 20,
            noise: .9,
            smooth: !0
        },
        tilt: {
            amplitude: 20,
            scale: .9,
            phase: 31,
            noise: .55,
            smooth: !0
        }
    },
    shakeSettings: null,
    keyframeProps: {
        position: [{
            frame: 1,
            value: new THREE.Vector3(0,0,80),
            tweenfn: 257
        }],
        rotation: [{
            frame: 1,
            value: new THREE.Vector3(0,0,0),
            tweenfn: 257
        }],
        shake: [{
            frame: 1,
            value: 0,
            tweenfn: 0
        }],
        shakespeed: [{
            frame: 1,
            value: 30,
            tweenfn: 0
        }]
    }
},
CM.camsequence.shakeSettings = $.extend({}, CM.camsequence.defaultShakeSettings),
CM.camsequence.load = function() {
    var e = PZ.archive.getFileString("camsequence");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        this.movementMode = t.movementMode,
        this.rotationMode = t.rotationMode,
        this.projectionMode = t.projectionMode || 0,
        this.shakeMode = t.shakeMode || 0,
        $.extend(this.keyframeProps, t.keyframeProps),
        $.extend(this.shakeSettings, this.defaultShakeSettings),
        $.extend(this.shakeSettings, t.shakeSettings),
        PZ.keyframes.toVector3(this.keyframeProps.position),
        PZ.keyframes.toVector3(this.keyframeProps.rotation),
        this.updateCamera()
    }
}
,
CM.camsequence.save = function() {
    var e = {
        movementMode: this.movementMode,
        rotationMode: this.rotationMode,
        projectionMode: this.projectionMode,
        shakeMode: this.shakeMode,
        shakeSettings: this.shakeSettings,
        keyframeProps: this.keyframeProps
    };
    PZ.archive.addFileString("camsequence", JSON.stringify(e))
}
,
CM.camsequence.select = function(e) {
    PZ.editor.generateTitle({
        title: "Camera animation"
    }).appendTo(e),
    PZ.editor.generateDropdown({
        title: "Projection mode",
        items: "perspective (3d);orthographic (2d)",
        get: function() {
            return this.projectionMode
        },
        set: function(e) {
            this.projectionMode = e,
            this.updateCamera()
        }
    }, this).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateButton({
        title: "Use current",
        clickfn: function() {
            var t;
            void 0 === (t = PZ.keyframes.get(this.keyframeProps.position)) && (PZ.keyframes.add(this.keyframeProps.position),
            t = PZ.keyframes.get(this.keyframeProps.position)),
            t.value.copy(CM.camera.position),
            void 0 === (t = PZ.keyframes.get(this.keyframeProps.rotation)) && (PZ.keyframes.add(this.keyframeProps.rotation),
            t = PZ.keyframes.get(this.keyframeProps.rotation)),
            t.value.copy(CM.camera.rotation),
            e.children().each(function() {
                $(this).triggerHandler("update")
            })
        }
    }, this).appendTo(e),
    PZ.editor.generateTriInput({
        title: "Position",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericVector3Get(e, this.keyframeProps.position)
        },
        set: function(e, t) {
            PZ.keyframes.genericVector3Set(e, t, this.keyframeProps.position)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    }, this).appendTo(e),
    PZ.editor.generateTriInput({
        title: "Rotation",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericRotation3Get(e, this.keyframeProps.rotation)
        },
        set: function(e, t) {
            PZ.keyframes.genericRotation3Set(e, t, this.keyframeProps.rotation)
        },
        vmax: 1e4,
        vmin: -1e4,
        vstep: 1,
        dragstep: .1,
        decimals: 2
    }, this).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateInput({
        title: "Shake",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.shake)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.shake)
        },
        vmax: 1,
        vmin: 0,
        vstep: .01,
        decimals: 3,
        dragstep: 1e-4
    }, this).appendTo(e),
    PZ.editor.generateInput({
        title: "Shake speed",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.shakespeed)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.shakespeed)
        },
        vmax: 200,
        vmin: 0,
        vstep: .01,
        decimals: 2,
        dragstep: .05
    }, this).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e);
    var t = PZ.editor.generatePlaceholder().hide();
    PZ.editor.generateDropdown({
        title: "Advanced shake settings",
        items: "hide;show",
        get: function() {
            return 0
        },
        set: function(e) {
            1 === e ? t.attr("style", "") : t.hide()
        }
    }, this).appendTo(e),
    PZ.editor.generateSpacer().appendTo(t),
    PZ.editor.generateDropdown({
        title: "Shake mode x/y",
        items: "rotate;move",
        get: function() {
            return this.shakeMode
        },
        set: function(e) {
            this.shakeMode = e
        }
    }, this).appendTo(t);
    for (var r in this.shakeSettings)
        PZ.editor.generateSpacer().appendTo(t),
        PZ.editor.generateInput({
            title: r.charAt(0).toUpperCase() + r.slice(1) + " amplitude",
            get: function() {
                return this.amplitude
            },
            set: function(e) {
                this.amplitude = e
            },
            vmax: 1e4,
            vmin: 0,
            vstep: 1,
            decimals: 1,
            dragstep: .05
        }, this.shakeSettings[r]).appendTo(t),
        PZ.editor.generateInput({
            title: r.charAt(0).toUpperCase() + r.slice(1) + " frequency",
            get: function() {
                return this.scale
            },
            set: function(e) {
                this.scale = e
            },
            vmax: 1e4,
            vmin: 0,
            vstep: .1,
            decimals: 2,
            dragstep: .005
        }, this.shakeSettings[r]).appendTo(t),
        PZ.editor.generateInput({
            title: r.charAt(0).toUpperCase() + r.slice(1) + " phase",
            get: function() {
                return this.phase
            },
            set: function(e) {
                this.phase = e
            },
            vmax: 1e4,
            vmin: 0,
            vstep: 1,
            decimals: 1,
            dragstep: .05
        }, this.shakeSettings[r]).appendTo(t),
        PZ.editor.generateInput({
            title: r.charAt(0).toUpperCase() + r.slice(1) + " noise",
            get: function() {
                return this.noise
            },
            set: function(e) {
                this.noise = e
            },
            vmax: 4,
            vmin: 0,
            vstep: .1,
            decimals: 2,
            dragstep: .01
        }, this.shakeSettings[r]).appendTo(t),
        PZ.editor.generateDropdown({
            title: r.charAt(0).toUpperCase() + r.slice(1) + " interpolation",
            items: "linear;smooth",
            get: function() {
                return this.smooth ? 1 : 0
            },
            set: function(e) {
                this.smooth = 1 === e
            }
        }, this.shakeSettings[r]).appendTo(t);
    t.appendTo(e)
}
,
CM.camsequence.updateCamera = function() {
    CM.renderCamera.parent.remove(CM.renderCamera),
    CM.camsequence.helper.parent.remove(CM.camsequence.helper),
    0 === this.projectionMode ? CM.renderCamera = new THREE.PerspectiveCamera(60,CM.aspect,.1,5e3) : CM.renderCamera = new THREE.OrthographicCamera(-.05 * CM.frameWidth,.05 * CM.frameWidth,.05 * CM.frameHeight,-.05 * CM.frameHeight,.1,5e3),
    CM.scene.add(CM.renderCamera),
    CM.camsequence.helper = new THREE.CameraHelper(CM.renderCamera),
    CM.camsequence.helper.layers.set(3),
    CM.scene.add(CM.camsequence.helper),
    CM.layers.main.pass.camera = CM.renderCamera
}
,
CM.camsequence.shake = function(e, t, r) {
    function a(e) {
        return 2 * (1 & e) - 1
    }
    function n(e) {
        var t = 1e4 * Math.sin(e);
        return t - Math.floor(t) - .5
    }
    var i = CM.currentFrame * t * r.scale + r.phase
      , s = Math.floor(i)
      , o = s + 1
      , l = i - s;
    r.smooth && (l = l * l * (3 - 2 * l));
    var c = a(s) + r.noise * n(s)
      , p = a(o) + r.noise * n(o);
    return e * r.amplitude * function(e, t, r) {
        return e * (1 - r) + t * r
    }(c, p, l)
}
,
CM.camsequence.updateFrame = function() {
    CM.renderCamera.position.copy(TWEEN.getValue(this.keyframeProps.position, CM.currentFrame)),
    CM.renderCamera.rotation.setFromVector3(TWEEN.getValue(this.keyframeProps.rotation, CM.currentFrame));
    var e = TWEEN.getValue(this.keyframeProps.shake, CM.currentFrame)
      , t = TWEEN.getValue(this.keyframeProps.shakespeed, CM.currentFrame) / CM.frameRate;
    0 === this.shakeMode ? (CM.renderCamera.rotateX(.1 * this.shake(e, t, this.shakeSettings.x)),
    CM.renderCamera.rotateY(.1 * this.shake(e, t, this.shakeSettings.y))) : (CM.renderCamera.translateX(this.shake(e, t, this.shakeSettings.x)),
    CM.renderCamera.translateY(this.shake(e, t, this.shakeSettings.y))),
    CM.renderCamera.translateZ(this.shake(e, t, this.shakeSettings.z)),
    CM.renderCamera.rotateZ(.1 * this.shake(e, t, this.shakeSettings.tilt))
}
,
CM.audio = {
    enablePreview: !0,
    ctx: null,
    elt: null,
    buffer: null,
    source: null,
    startOffset: 0,
    volumeMode: 0,
    fadeIn: 0,
    fadeOut: 3,
    keyframeProps: {
        volume: [{
            frame: 1,
            value: 100,
            tweenfn: 1
        }],
        pan: [{
            frame: 1,
            value: 0,
            tweenfn: 1
        }]
    }
},
CM.audio.init = function() {
    window.AudioContext && (this.ctx = new AudioContext,
    this.gainNode = this.ctx.createGain(),
    this.pannerNode = this.ctx.createStereoPanner(),
    this.gainNode.connect(this.pannerNode),
    this.pannerNode.connect(this.ctx.destination))
}
,
CM.audio.updateFrame = function() {
    this.gainNode.gain.value = CM.audio.getVolume(CM.currentFrame),
    this.pannerNode.pan.value = TWEEN.getValue(this.keyframeProps.pan, CM.currentFrame)
}
,
CM.audio.getVolume = function(e) {
    if (0 === this.volumeMode) {
        var t = e / CM.frameRate
          , r = this.fadeIn > 0 ? t / this.fadeIn : 1
          , a = this.fadeOut > 0 ? (CM.totalTime - t) / this.fadeOut : 1;
        return Math.min(1, r) * Math.min(1, a)
    }
    return TWEEN.getValue(this.keyframeProps.volume, e) / 100
}
,
CM.audio.play = function() {
    "suspended" === this.ctx.state && this.ctx.resume(),
    null !== this.buffer && !1 !== this.enablePreview && (this.source = this.ctx.createBufferSource(),
    this.source.buffer = this.buffer,
    this.source.playbackRate.value = CM.playSpeed,
    this.source.connect(this.gainNode),
    this.source.start(0, this.startOffset + (CM.currentFrame - 1) / CM.frameRate))
}
,
CM.audio.stop = function() {
    null !== this.source && (this.source.stop(),
    this.source = null)
}
,
CM.audio.toggleMute = function() {
    this.enablePreview = !this.enablePreview,
    !0 === CM.enablePlayFrames && this.play(),
    !1 === this.enablePreview && this.stop()
}
,
CM.audio.setPlaybackRate = function() {
    null !== CM.audio.source && (CM.audio.source.playbackRate.value = CM.playSpeed,
    CM.audio.updateFade())
}
,
CM.audio.decodeAudio = function(e) {
    var t = new FileReader;
    t.onload = function(r) {
        CM.audio.ctx.decodeAudioData(r.target.result, function(e) {
            CM.audio.buffer = e,
            CM.timeline.redraw(),
            CM.enablePlayFrames && CM.audio.play()
        }, function(r) {
            t.onload = function(e) {
                PZ.av.decode(e.target.result, function(e, t) {
                    if (e && t) {
                        var r = new Float32Array(e)
                          , a = new Float32Array(t);
                        CM.audio.buffer = CM.audio.ctx.createBuffer(2, r.length, 48e3),
                        CM.audio.buffer.copyToChannel(r, 0),
                        CM.audio.buffer.copyToChannel(a, 1),
                        CM.timeline.redraw(),
                        CM.enablePlayFrames && CM.audio.play()
                    }
                })
            }
            ,
            t.readAsArrayBuffer(e)
        })
    }
    ,
    t.readAsArrayBuffer(e)
}
,
CM.audio.load = function() {
    CM.audio.buffer = null;
    var e = PZ.archive.getFileStringUTF8("audio");
    if (void 0 !== e) {
        var t = JSON.parse(e);
        delete this.trackName,
        $.extend(this.keyframeProps, t.properties.keyframeProps),
        delete t.properties.keyframeProps,
        $.extend(this, t.properties),
        void 0 === (e = PZ.archive.getFileBlob("audio_file", {
            type: "audio/*"
        })) && (e = PZ.archive.getFileBlob("audio_mp3", {
            type: "audio/*"
        })),
        void 0 !== e && this.decodeAudio(e)
    }
}
,
CM.audio.save = function() {
    var e = {
        properties: {
            fadeIn: this.fadeIn,
            fadeOut: this.fadeOut,
            startOffset: 0,
            volumeMode: this.volumeMode,
            keyframeProps: this.keyframeProps
        }
    };
    if (PZ.archive.addFileString("audio", JSON.stringify(e)),
    null !== this.buffer) {
        CM.templates.saveWaiting++;
        var t = {
            filename: "ogg",
            haveVideo: 0,
            haveAudio: 1,
            frameWidth: 0,
            frameHeight: 0,
            audioBitrate: 64e3,
            frameRate: CM.frameRate / CM.download.multiplyRate,
            totalFrames: CM.totalFrames / CM.download.multiplyRate,
            startFrame: 1
        };
        PZ.av.encode(t, function(e, t) {
            t(0)
        }, CM.download.getAudioSamples.bind(CM.download, !1), this.encodeFinished)
    }
}
,
CM.audio.encodeFinished = function(e) {
    if (e) {
        var t = new Uint8Array(e);
        PZ.archive.addFile("audio_file", t)
    }
    CM.templates.saveWaiting--,
    CM.templates.saveComplete()
}
,
CM.audio.generateWaveform = function(e, t, r) {
    if (null !== this.buffer) {
        var a = document.createElement("canvas");
        a.width = e,
        a.height = t;
        var n = a.getContext("2d")
          , i = CM.totalFrames / CM.frameRate
          , s = Math.floor(i * this.buffer.sampleRate)
          , o = Math.min(Math.floor(this.startOffset * this.buffer.sampleRate), this.buffer.length)
          , l = Math.min(o + Math.floor(i * this.buffer.sampleRate), this.buffer.length) - o
          , c = new ArrayBuffer(4 * l)
          , p = new Float32Array(c);
        l > 0 && this.buffer.copyFromChannel(p, 0, o);
        n.fillStyle = "rgb(102, 102, 102)",
        n.fillRect(0, 0, e, t),
        n.strokeStyle = "rgb(20, 20, 20)",
        n.translate(0, t / 2);
        for (var h = 0; h < p.length; h += 24) {
            var u = Math.floor(e * h / s)
              , d = p[h] * t / 2;
            n.beginPath(),
            n.moveTo(u, 0),
            n.lineTo(u + 1, d),
            n.stroke()
        }
        PZ.canvasToBlob(a, function(e) {
            r(URL.createObjectURL(e))
        })
    }
}
,
CM.audio.select = function(e) {
    var t;
    PZ.editor.generateTitle({
        title: "Audio track"
    }).appendTo(e),
    PZ.editor.generateFileUpload({
        title: "Audio file",
        accept: "audio/*",
        set: function(e) {
            e.files && e.files[0] && (t && (t.remove(),
            t = null),
            this.decodeAudio(e.files[0]))
        },
        remove: function() {
            this.audiofile = null,
            t && (t.remove(),
            t = null)
        }
    }, this).appendTo(e),
    void 0 !== this.trackName && (t = PZ.editor.generateDescription({
        content: '<a target="_blank" href="' + this.trackURL + '">' + this.trackName + "</a> by " + this.artistName
    }).css({
        backgroundColor: "rgb(45, 45, 45)",
        flexDirection: "row-reverse"
    }).appendTo(e)),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateInput({
        title: "Start offset (seconds)",
        get: function() {
            return this.startOffset
        },
        set: function(e) {
            this.startOffset = e,
            CM.timeline.scheduleRedraw()
        },
        vmax: 1e3,
        vmin: 0,
        vstep: 1,
        decimals: 2,
        dragstep: .01
    }, this).appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    this.$fadeIn = PZ.editor.generateInput({
        title: "Fade in (seconds)",
        get: function() {
            return this.fadeIn
        },
        set: function(e) {
            this.fadeIn = e
        },
        vmax: 1e3,
        vmin: 0,
        vstep: 1,
        decimals: 2,
        dragstep: .01
    }, this).hide(),
    this.$fadeOut = PZ.editor.generateInput({
        title: "Fade out (seconds)",
        get: function() {
            return this.fadeOut
        },
        set: function(e) {
            this.fadeOut = e
        },
        vmax: 1e3,
        vmin: 0,
        vstep: 1,
        decimals: 2,
        dragstep: .01
    }, this).hide(),
    this.$customVolume = PZ.editor.generateInput({
        title: "Volume",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.volume)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.volume)
        },
        vmax: 5e3,
        vmin: 0,
        vstep: 1
    }, this).hide(),
    PZ.editor.generateDropdown({
        title: "Volume mode",
        items: "fade in/out;custom",
        get: function() {
            return this.volumeMode > 0 ? (this.$fadeIn.hide(),
            this.$fadeOut.hide(),
            this.$customVolume.attr("style", "")) : (this.$fadeIn.attr("style", ""),
            this.$fadeOut.attr("style", ""),
            this.$customVolume.hide()),
            this.volumeMode
        },
        set: function(e) {
            this.volumeMode = e,
            e > 0 ? (this.$fadeIn.hide(),
            this.$fadeOut.hide(),
            this.$customVolume.attr("style", "")) : (this.$fadeIn.attr("style", ""),
            this.$fadeOut.attr("style", ""),
            this.$customVolume.hide())
        }
    }, this).appendTo(e),
    this.$fadeIn.appendTo(e),
    this.$fadeOut.appendTo(e),
    this.$customVolume.appendTo(e),
    PZ.editor.generateSpacer().appendTo(e),
    PZ.editor.generateInput({
        title: "Pan",
        keyframed: !0,
        tweens: !0,
        get: function(e) {
            return PZ.keyframes.genericValueGet(e, this.keyframeProps.pan)
        },
        set: function(e, t) {
            return PZ.keyframes.genericValueSet(e, t, this.keyframeProps.pan)
        },
        vmax: 1,
        vmin: -1,
        decimals: 2,
        vstep: .1,
        dragstep: .01
    }, this).appendTo(e)
}
,
CM.download = {
    mode: {
        bitrate: 1,
        crf: 10,
        speed: 4,
        deadline: 1,
        lag: 0,
        abr: 1
    },
    profile: 1,
    profiles: [{
        bitrate: 1,
        crf: 12,
        speed: 8,
        deadline: 2,
        lag: 0,
        abr: 1
    }, {
        bitrate: 1,
        crf: 10,
        speed: 4,
        deadline: 1,
        lag: 0,
        abr: 1
    }, {
        bitrate: 1,
        crf: 8,
        speed: 1,
        deadline: 1,
        lag: 0,
        abr: 1
    }, {
        bitrate: 1,
        crf: 4,
        speed: 0,
        deadline: 0,
        lag: 0,
        abr: 1.5
    }],
    format: 0,
    multiplyRate: 1,
    waitingPrepare: 0,
    currentAudioSample: 0,
    endAudioSample: 0,
    $description: null,
    $progress: null,
    $start: null,
    $rendering: null,
    $finish: null
},
CM.download.select = function(e) {
    PZ.editor.generateTitle({
        title: "Download your video"
    }).appendTo(e),
    this.$start = PZ.editor.generatePlaceholder().appendTo(e),
    PZ.editor.generateDropdown({
        title: "Mode",
        items: "fastest render;balanced;good quality;extreme quality (slow)",
        get: function() {
            return this.profile
        },
        set: function(e) {
            this.profile = e,
            this.mode = this.profiles[this.profile]
        }
    }, this).appendTo(this.$start),
    PZ.editor.generateDropdown({
        title: "Format",
        items: ".mkv (vp8/opus);.webm (vp8/opus)",
        get: function() {
            return this.format
        },
        set: function(e) {
            this.format = e
        }
    }, this).appendTo(this.$start),
    PZ.editor.generateSpacer().appendTo(this.$start),
    PZ.editor.generateButton({
        title: "Start video render",
        clickfn: function() {
            this.$start.hide(),
            this.$rendering.show(),
            PZ.file.getQuota(this.start.bind(this))
        }
    }, this).appendTo(this.$start),
    this.$rendering = PZ.editor.generatePlaceholder().appendTo(e).hide(),
    this.$description = PZ.editor.generateDescription({
        content: "Your video is being rendered. Please stay on this page to ensure your browser continues to process the video."
    }).appendTo(this.$rendering),
    this.$progress = PZ.editor.generateProgressbar({
        get: PZ.av.getProgress
    }, PZ.av).appendTo(this.$rendering),
    this.$timeRemaining = PZ.editor.generateDescription({
        get: PZ.av.getTimeRemaining
    }, PZ.av).css({
        backgroundColor: "rgb(45, 45, 45)",
        justifyContent: "space-between"
    }).prepend($("<span>").text("Time left:")).appendTo(this.$rendering),
    PZ.editor.generateButton({
        title: "Cancel render",
        clickfn: function() {
            PZ.av.stop(),
            this.finish(),
            this.$rendering.hide(),
            this.$start.show()
        }
    }, this).appendTo(this.$rendering),
    this.$finish = PZ.editor.generatePlaceholder().appendTo(e).hide(),
    PZ.editor.generateDescription({
        content: "Your render is finished! Click below to download."
    }).appendTo(this.$finish),
    PZ.editor.generateButton({
        title: "Download your video",
        clickfn: function() {
            window.open("/download.html")
        }
    }, this).css("cursor", "pointer").appendTo(this.$finish),
    PZ.editor.generateSpacer().appendTo(this.$finish),
    PZ.editor.generateButton({
        title: "Return to editing",
        clickfn: function() {
            this.finish(),
            this.$finish.hide(),
            this.$start.show()
        }
    }, this).appendTo(this.$finish),
    this.$error = PZ.editor.generatePlaceholder().appendTo(e).hide(),
    PZ.editor.generateDescription({
        content: "Unfortunately, your download could not be completed. The problem has been reported in order to resolve this issue. Sorry about that."
    }).appendTo(this.$error),
    PZ.editor.generateSpacer().appendTo(this.$error),
    PZ.editor.generateButton({
        title: "Return to editing",
        clickfn: function() {
            this.finish(),
            this.$error.hide(),
            this.$start.show()
        }
    }, this).appendTo(this.$error)
}
,
CM.download.start = function() {
    PZ.editor.elevator_tablock(7, !0),
    CM.timeline.disable(!0),
    CM.enableRenderLoop = !1,
    cancelAnimationFrame(CM.animFrameReq),
    CM.templates.id > 0 && PZ.api("/creations/" + CM.templates.id + "/download", "post"),
    CM.setRenderMode(!0),
    $(CM.renderCanv).detach(),
    CM.resizeViewport(CM.frameWidth, CM.frameHeight);
    var e = CM.frameWidth / 640 * (CM.frameHeight / 360);
    e *= CM.frameRate / this.multiplyRate > 30 ? 1.5 : 1,
    e *= 1e6;
    var t = {
        filename: "matroska",
        haveVideo: 1,
        haveAudio: 1,
        frameWidth: CM.frameWidth,
        frameHeight: CM.frameHeight,
        frameRate: CM.frameRate / this.multiplyRate,
        videoBitrate: e * this.mode.bitrate,
        audioBitrate: 64e3 * this.mode.abr,
        cpu_used: this.mode.speed,
        deadline: 1,
        lag_in_frames: 12 * this.mode.lag,
        lossless: 0,
        crf: this.mode.crf,
        video_codec: 0,
        totalFrames: CM.totalFrames / this.multiplyRate,
        startFrame: 1
    };
    0 === this.mode.deadline ? t.deadline = 0 : 2 === this.mode.deadline && (t.deadline = 1e6),
    PZ.av.encode(t, this.getVideoFrame, this.getAudioSamples.bind(this, !0), this.encodeFinished),
    this.$progress.trigger("update"),
    this.$timeRemaining.trigger("update")
}
,
CM.download.finish = function() {
    this.waitingPrepare = 999,
    PZ.downloadBlob = null,
    PZ.file.cleanUp(),
    CM.currentFrame = 1,
    $("#previewpane").prepend(CM.renderCanv),
    CM.resizeViewport(),
    CM.setRenderMode(CM.renderMode),
    CM.enableRenderLoop = !0,
    CM.enablePlayFrames = !1,
    CM.timeline.disable(!1),
    PZ.editor.elevator_tablock(7, !1),
    CM.render()
}
,
CM.download.encodeFinished = function(e) {
    if (void 0 === e)
        return CM.download.$rendering.hide(),
        void CM.download.$error.show();
    PZ.downloadBlob = e,
    PZ.downloadFilename = 0 === CM.download.format ? "video.mkv" : "video.webm",
    CM.download.$rendering.hide(),
    CM.download.$finish.show()
}
,
CM.download.getAudioSamples = function(e, t, r, a) {
    var n = Math.floor(48e3 * CM.totalTime)
      , i = Math.min(500 * r, n - t)
      , s = t / 48e3
      , o = new OfflineAudioContext(2,i,48e3);
    if (null !== CM.audio.buffer) {
        var l = o.createBufferSource();
        if (l.buffer = CM.audio.buffer,
        e) {
            for (var c = o.createGain(), p = o.createStereoPanner(), h = 0; h < i / 48e3; h += 1 / CM.frameRate) {
                var u = (s + h) * CM.frameRate
                  , d = CM.audio.getVolume(u)
                  , f = TWEEN.getValue(CM.audio.keyframeProps.pan, u);
                c.gain.linearRampToValueAtTime(d, h),
                p.pan.linearRampToValueAtTime(f, h)
            }
            l.connect(c),
            c.connect(p),
            p.connect(o.destination)
        } else
            l.connect(o.destination);
        l.start(0, s + CM.audio.startOffset)
    }
    o.oncomplete = function(e) {
        o.oncomplete = null,
        a(e.renderedBuffer)
    }
    ,
    o.startRendering()
}
,
CM.download.getVideoFrame = function(e, t, r) {
    CM.download.finishVideoFrame = function() {
        if (!(this.waitingPrepare > 0)) {
            CM.render(null, !0);
            var t = CM.renderer.context;
            t.readPixels(0, 0, CM.frameWidth, CM.frameHeight, t.RGBA, t.UNSIGNED_BYTE, e),
            r(1),
            CM.download.$progress.trigger("update"),
            CM.download.$timeRemaining.trigger("update")
        }
    }
    ,
    CM.currentFrame = t * CM.download.multiplyRate + .5,
    CM.download.waitingPrepare = 1,
    CM.updateScene(!0),
    CM.download.waitingPrepare--,
    CM.download.finishVideoFrame()
}
,
CM.about = function(e) {
    PZ.editor.generateTitle({
        title: "Clipmaker 2.0.191"
    }).appendTo(e),
    PZ.editor.generateDescription({
        content: 'Copyright 2017 Panzoid <br>Updated by antgame11<br><a target="_blank" href="https://panzoid.com/about/terms">Terms</a> | <a target="_blank" href="https://panzoid.com/about/privacy">Privacy</a>'
    }).appendTo(e)
}
,
CM.timeline = {
    keyObject: null,
    imgURL: "",
    zoom: .15,
    mode: 0,
    selectedKeys: []
},
CM.timeline.init = function() {
    $(document).keydown(function(e) {
        var t = e.target
          , r = e.target.tagName;
        "INPUT" === r || "SELECT" === r || "TEXTAREA" === r || t.isContentEditable || (37 === e.which ? CM.timeline.setFrame(CM.currentFrame - 1) : 39 === e.which ? CM.timeline.setFrame(CM.currentFrame + 1) : 32 === e.which && CM.setPlayPause(!CM.enablePlayFrames))
    }),
    this.$hideeditor = $("<div>", {
        class: "disabled noselect"
    }).append($("<span>").append("(pause to edit)")).hide().appendTo("#editorpane"),
    this.$hidetimeline = $("<div>", {
        class: "disabled noselect"
    }).hide().appendTo("#previewbottom"),
    this.$resizehandle = $("<div>", {
        style: "width:100%;height:3px;position:relative;top:-3px;cursor:ns-resize;"
    }).drag("start", function(e, t) {
        t.startHeight = $("#previewbottom").height()
    }).drag(function(e, t) {
        var r = Math.max(Math.min(t.startHeight - t.deltaY, 1e3), 115);
        $("#previewbottom").height(r)
    }).drag("end", function(e) {
        CM.resizeViewport(),
        CM.timeline.update(),
        CM.timeline.scheduleRedraw()
    }).appendTo("#previewbottom");
    var e = $("#previewbottom");
    e.height(149),
    this.$framescroll = $("<div>", {
        style: "position:absolute;top:0;bottom:0;right:0;left:200px;overflow:hidden;overflow-x:scroll"
    }).appendTo(e).on("mousewheel DOMMouseScroll", function(e) {
        var t = e.pageX - $(this).offset().left;
        if (!0 === e.ctrlKey)
            e.originalEvent.wheelDelta > 0 ? CM.timeline.updateZoom(1.125 * CM.timeline.zoom, t) : CM.timeline.updateZoom(CM.timeline.zoom / 1.125, t),
            e.preventDefault();
        else {
            var r = CM.timeline.$framescroll.scrollLeft();
            e.originalEvent.wheelDelta > 0 ? CM.timeline.$framescroll.scrollLeft(r - 50 * CM.timeline.zoom) : CM.timeline.$framescroll.scrollLeft(r + 50 * CM.timeline.zoom)
        }
    }),
    this.$framecontainer = $("<div>", {
        style: "position:absolute;left:0;top:0;bottom:0;transform-origin: left;background-repeat: repeat;cursor: default;"
    }).drag("init", CM.timeline.timelineDrag).drag(CM.timeline.timelineDrag, {
        click: !0
    }).on("contextmenu", function(e) {
        e.preventDefault()
    }).appendTo(this.$framescroll),
    this.$framebar = $("<div>", {
        style: "position:absolute;left:0;top:0;bottom:0;width:50px;margin-left:-25px;background-color:rgba(0,0,0,0.5);z-index:10000;pointer-events: none;"
    }).appendTo(this.$framecontainer);
    var t = "position:absolute;cursor:pointer;"
      , r = "fill:#ccc;width:25px;height:25px;pointer-events:none";
    this.$playpause = $("<a>", {
        style: t + "top:5px;left:10px;",
        title: "toggle playback"
    }).append(PZ.editor.generateIcon("play").attr("style", r)).click(function() {
        CM.setPlayPause(!CM.enablePlayFrames)
    }).appendTo(e).children().first(),
    $("<a>", {
        style: t + "top:5px;left:40px;",
        title: "toggle render preview"
    }).append(PZ.editor.generateIcon("preview").attr("style", r)).click(function() {
        $(this).children().first().toggleClass("iconactive", !CM.renderMode),
        CM.toggleRenderMode()
    }).appendTo(e),
    $("<a>", {
        style: t + "top:5px;left:70px;",
        title: "toggle audio mute"
    }).append(PZ.editor.generateIcon("mute").attr("style", r)).click(function() {
        $(this).children().first().toggleClass("iconactive", CM.audio.enablePreview),
        CM.audio.toggleMute()
    }).appendTo(e),
    $("<a>", {
        style: t + "top:5px;left:100px;",
        title: "toggle half speed"
    }).append(PZ.editor.generateIcon("slow").attr("style", r)).click(function() {
        CM.playSpeed = 1 === CM.playSpeed ? .5 : 1,
        $(this).children().first().toggleClass("iconactive", 1 !== CM.playSpeed),
        CM.audio.setPlaybackRate(CM.playSpeed)
    }).appendTo(e),
    $("<a>", {
        style: t + "top:5px;left:130px;",
        title: "toggle audio waveform"
    }).append(PZ.editor.generateIcon("wave").attr("style", r)).click(function() {
        CM.timeline.mode = 0 === CM.timeline.mode ? 1 : 0,
        $(this).children().first().toggleClass("iconactive", 0 !== CM.timeline.mode),
        CM.timeline.redraw()
    }).appendTo(e),
    $("<a>", {
        style: t + "bottom:10px;left:10px;",
        title: "zoom out"
    }).append(PZ.editor.generateIcon("zoomout").attr("style", r)).click(function() {
        var e = CM.timeline.$framebar.offset().left - CM.timeline.$framescroll.offset().left;
        CM.timeline.updateZoom(CM.timeline.zoom / 1.125, e)
    }).appendTo(e),
    $("<a>", {
        style: t + "bottom:10px;left:40px;",
        title: "zoom in"
    }).append(PZ.editor.generateIcon("zoomin").attr("style", r)).click(function() {
        var e = CM.timeline.$framebar.offset().left - CM.timeline.$framescroll.offset().left;
        CM.timeline.updateZoom(1.125 * CM.timeline.zoom, e)
    }).appendTo(e),
    this.$framelabel = $("<input>", {
        class: "pzinput",
        style: "position:absolute;top:40px;font-size:18px;"
    }),
    e.append(this.$framelabel),
    this.$framelabel.pzinput({
        change: function(e) {
            CM.timeline.setFrame(parseFloat(e))
        },
        max: 1e6,
        min: 1,
        step: 1,
        decimals: 0,
        dragstep: .075
    }),
    this.$timelabel = $("<input>", {
        class: "pzinput",
        style: "position:absolute;top:40px;left:85px;font-size:18px;"
    }),
    e.append(this.$timelabel),
    this.$timelabel.pzinput({
        change: function(e) {
            CM.timeline.setFrame(Math.floor(parseFloat(e) * CM.frameRate) + 1)
        },
        max: 5e4,
        min: 0,
        step: .5,
        decimals: 2,
        dragstep: 1 / 120
    }),
    PZ.keyframes.update = CM.timeline.updateKeys.bind(this),
    CM.timeline.updateZoom(.15, 0),
    CM.timeline.updateFrame()
}
,
CM.timeline.disable = function(e) {
    this.$hidetimeline.toggle(e)
}
,
CM.timeline.scheduleRedraw = function() {
    clearTimeout(this.redrawTimer),
    0 !== this.mode && (this.redrawTimer = setTimeout(CM.timeline.redraw, 1e3))
}
,
CM.timeline.redraw = function() {
    if (0 === CM.timeline.mode) {
        var e;
        if (null !== CM.timeline.keyObject) {
            var t = Object.keys(CM.timeline.keyObject);
            e = CM.timeline.$framecontainer.innerHeight() / t.length
        } else
            e = 2 * CM.timeline.$framecontainer.innerHeight();
        CM.timeline.$framecontainer.css("background-image", "linear-gradient(rgb(102, 102, 102) 50%, rgb(80, 80, 80) 50%)"),
        CM.timeline.$framecontainer.css("background-size", "10px " + 2 * e + "px")
    } else
        CM.audio.generateWaveform(Math.min(1e4, CM.timeline.$framecontainer.width() / 5), CM.timeline.$framecontainer.height(), function(e) {
            "" !== CM.timeline.imgURL && URL.revokeObjectURL(CM.timeline.imgURL),
            CM.timeline.imgURL = e,
            CM.timeline.$framecontainer.css("background-size", "100% 100%"),
            CM.timeline.$framecontainer.css("background-image", "url(" + e + ")")
        })
}
,
CM.timeline.update = function() {
    if (this.$framecontainer.width(50 * CM.totalFrames),
    this.$framebar.siblings().remove(),
    null !== this.keyObject) {
        var e = Object.keys(this.keyObject)
          , t = this.$framecontainer.innerHeight() / e.length;
        0 === this.mode && this.redraw(),
        $("#controls div:visible div.proprow[kf='1']").each(function(t, r) {
            $(r).children("span").css("border-bottom", "3px solid hsl(" + t * (360 / e.length) + ", 50%, 35%)")
        });
        for (var r = 0; r < e.length; r++)
            for (var a = this.keyObject[e[r]], n = "hsl(" + r * (360 / e.length) + ", 50%, 35%)", i = t * r, s = 0; s < a.length && !(a[s].frame > CM.totalFrames); s++) {
                var o = $("<div>", {
                    style: "position:absolute;width:50px"
                }).css({
                    height: t,
                    top: i,
                    left: 50 * (a[s].frame - 1),
                    backgroundColor: n
                });
                this.setupKeyframe(o, a[s]),
                o.appendTo(this.$framecontainer)
            }
    } else
        0 === this.mode && this.redraw()
}
,
CM.timeline.setupKeyframe = function(e, t) {
    e.attr("tabindex", "-1"),
    e.css("cursor", "move"),
    e.data("keyframe", t),
    e.drag(this.keyframeDrag, {
        relative: !0,
        click: !0
    }).drag("init", this.keyframeDragInit).drag("start", this.keyframeDragStart).drag("end", this.keyframeDragEnd),
    e.on("click", this.keyframeClick),
    e.on("contextmenu", this.keyframeContextmenu),
    e.on("keydown", this.keyframeKeypress)
}
,
CM.timeline.keyframeDragInit = function(e, t) {
    $(this).hasClass("keyselected") ? CM.timeline.kfOriginalState = !0 : (e.shiftKey || $(".keyselected").removeClass("keyselected"),
    CM.timeline.kfOriginalState = !1,
    $(this).addClass("keyselected")),
    this.focus(),
    CM.timeline.kfDragged = !1
}
,
CM.timeline.keyframeDragStart = function(e, t) {
    t.containerStart = CM.timeline.$framescroll.offset().left,
    t.oldFrame = $(t.drag).data("keyframe").frame
}
,
CM.timeline.keyframeDrag = function(e, t) {
    var r = CM.timeline.$framescroll[0].scrollLeft
      , a = e.pageX - t.containerStart + r
      , n = Math.floor(a / CM.timeline.zoom / 50) + 1
      , i = (n = Math.min(CM.totalFrames, Math.max(1, n))) - t.oldFrame
      , s = !1;
    !0 !== CM.timeline.kfDragged && 0 !== i && (CM.timeline.kfDragged = !0,
    e.altKey && (s = !0)),
    $(".keyselected").each(function() {
        var e = $(this).data("keyframe");
        if (s) {
            var t = $(this).clone();
            t.removeClass("keyselected"),
            t.addClass("keyadded"),
            CM.timeline.setupKeyframe(t, PZ.keyframes.clone(e)),
            t.appendTo(CM.timeline.$framecontainer)
        }
        e.frame = Math.min(CM.totalFrames, Math.max(1, e.frame + i)),
        $(this).css("left", 50 * (e.frame - 1))
    }),
    t.oldFrame = n
}
,
CM.timeline.keyframeDragEnd = function(e) {
    $("#controls .proprow[kf='1']").each(function() {
        $(this).triggerHandler("update")
    });
    var t = Object.keys(CM.timeline.keyObject);
    $(".keyadded").each(function() {
        var e = Math.round($(this).position().top / $(this).height());
        CM.timeline.keyObject[t[e]].push($(this).data("keyframe")),
        $(this).removeClass("keyadded")
    });
    for (var r = 0; r < t.length; r++)
        CM.timeline.keyObject[t[r]].sort(PZ.keyframes.sort)
}
,
CM.timeline.keyframeClick = function(e) {
    !0 !== CM.timeline.kfDragged && (e.shiftKey ? $(this).toggleClass("keyselected", !CM.timeline.kfOriginalState) : ($(".keyselected").removeClass("keyselected"),
    $(this).addClass("keyselected")),
    CM.timeline.setFrame($(this).data("keyframe").frame))
}
,
CM.timeline.keyframeContextmenu = function(e) {
    var t = Object.keys(CM.timeline.keyObject)
      , r = Math.round($(this).position().top / $(this).height())
      , a = $(this).data("keyframe").frame
      , n = CM.timeline.keyObject[t[r]];
    if (n.length > 1)
        for (r = 0; r < n.length; r++)
            if (n[r].frame === a) {
                n.splice(r, 1),
                $(this).remove();
                break
            }
    CM.timeline.setFrame(CM.currentFrame),
    e.preventDefault()
}
,
CM.timeline.keyframeKeypress = function(e) {
    var t = Object.keys(CM.timeline.keyObject);
    46 === e.which && ($(".keyselected").each(function() {
        var e = Math.round($(this).position().top / $(this).height())
          , r = $(this).data("keyframe").frame
          , a = CM.timeline.keyObject[t[e]];
        if (a.length > 1)
            for (e = 0; e < a.length; e++)
                if (a[e].frame === r) {
                    a.splice(e, 1),
                    $(this).remove();
                    break
                }
    }),
    CM.timeline.setFrame(CM.currentFrame))
}
,
CM.timeline.timelineDrag = function(e, t) {
    var r = t.deltaX + t.startX - t.originalX
      , a = Math.floor(r / CM.timeline.zoom / 50);
    CM.currentFrame !== a + 1 && CM.timeline.setFrame(a + 1)
}
,
CM.timeline.setFrame = function(e) {
    CM.currentFrame = Math.min(CM.totalFrames, Math.max(1, e)),
    CM.setPlayPause(!1),
    this.updateFrame(),
    $("#controls .proprow[kf='1']").each(function() {
        $(this).triggerHandler("update")
    })
}
,
CM.timeline.updateKeys = CM.timeline.update,
CM.timeline.updateZoom = function(e, t) {
    var r = this.zoom
      , a = this.$framescroll.scrollLeft();
    this.zoom = e,
    this.$framecontainer.css("transform", "scale(" + this.zoom + ", 1)");
    var n = (a + t) * (this.zoom / r) - t;
    this.$framescroll.scrollLeft(n)
}
,
CM.timeline.updateFrame = function() {
    this.$framebar.css({
        left: 50 * CM.currentFrame - 25
    }),
    this.$framelabel.val(Math.floor(CM.currentFrame)),
    this.$timelabel.val(((CM.currentFrame - 1) / CM.frameRate).toFixed(2));
    var e = (50 * CM.currentFrame - 25) * this.zoom;
    (e < this.$framescroll.scrollLeft() || e > this.$framescroll.scrollLeft() + this.$framescroll.width()) && this.$framescroll.scrollLeft(e)
}
;
