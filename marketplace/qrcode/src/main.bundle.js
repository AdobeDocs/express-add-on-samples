/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/*
    /*! For license information please see main.bundle.js.LICENSE.txt */
!(function () {
    var t = {
        202: function () {
            !(function () {
                "use strict";
                function t(t) {
                    var e = !0,
                        o = !1,
                        i = null,
                        r = {
                            text: !0,
                            search: !0,
                            url: !0,
                            tel: !0,
                            email: !0,
                            password: !0,
                            number: !0,
                            date: !0,
                            month: !0,
                            week: !0,
                            time: !0,
                            datetime: !0,
                            "datetime-local": !0
                        };
                    function s(t) {
                        return !!(
                            t &&
                            t !== document &&
                            "HTML" !== t.nodeName &&
                            "BODY" !== t.nodeName &&
                            "classList" in t &&
                            "contains" in t.classList
                        );
                    }
                    function n(t) {
                        t.classList.contains("focus-visible") ||
                            (t.classList.add("focus-visible"),
                                t.setAttribute("data-focus-visible-added", ""));
                    }
                    function c(t) {
                        e = !1;
                    }
                    function a() {
                        document.addEventListener("mousemove", l),
                            document.addEventListener("mousedown", l),
                            document.addEventListener("mouseup", l),
                            document.addEventListener("pointermove", l),
                            document.addEventListener("pointerdown", l),
                            document.addEventListener("pointerup", l),
                            document.addEventListener("touchmove", l),
                            document.addEventListener("touchstart", l),
                            document.addEventListener("touchend", l);
                    }
                    function l(t) {
                        (t.target.nodeName &&
                            "html" === t.target.nodeName.toLowerCase()) ||
                            ((e = !1),
                                document.removeEventListener("mousemove", l),
                                document.removeEventListener("mousedown", l),
                                document.removeEventListener("mouseup", l),
                                document.removeEventListener("pointermove", l),
                                document.removeEventListener("pointerdown", l),
                                document.removeEventListener("pointerup", l),
                                document.removeEventListener("touchmove", l),
                                document.removeEventListener("touchstart", l),
                                document.removeEventListener("touchend", l));
                    }
                    document.addEventListener(
                        "keydown",
                        function (o) {
                            o.metaKey ||
                                o.altKey ||
                                o.ctrlKey ||
                                (s(t.activeElement) && n(t.activeElement),
                                    (e = !0));
                        },
                        !0
                    ),
                        document.addEventListener("mousedown", c, !0),
                        document.addEventListener("pointerdown", c, !0),
                        document.addEventListener("touchstart", c, !0),
                        document.addEventListener(
                            "visibilitychange",
                            function (t) {
                                "hidden" === document.visibilityState &&
                                    (o && (e = !0), a());
                            },
                            !0
                        ),
                        a(),
                        t.addEventListener(
                            "focus",
                            function (t) {
                                var o, i, c;
                                s(t.target) &&
                                    (e ||
                                        ((o = t.target),
                                            (i = o.type),
                                            ("INPUT" === (c = o.tagName) &&
                                                r[i] &&
                                                !o.readOnly) ||
                                            ("TEXTAREA" === c && !o.readOnly) ||
                                            o.isContentEditable)) &&
                                    n(t.target);
                            },
                            !0
                        ),
                        t.addEventListener(
                            "blur",
                            function (t) {
                                var e;
                                s(t.target) &&
                                    (t.target.classList.contains("focus-visible") ||
                                        t.target.hasAttribute(
                                            "data-focus-visible-added"
                                        )) &&
                                    ((o = !0),
                                        window.clearTimeout(i),
                                        (i = window.setTimeout(function () {
                                            o = !1;
                                        }, 100)),
                                        (e = t.target).hasAttribute(
                                            "data-focus-visible-added"
                                        ) &&
                                        (e.classList.remove("focus-visible"),
                                            e.removeAttribute(
                                                "data-focus-visible-added"
                                            )));
                            },
                            !0
                        ),
                        t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host
                            ? t.host.setAttribute("data-js-focus-visible", "")
                            : t.nodeType === Node.DOCUMENT_NODE &&
                            (document.documentElement.classList.add(
                                "js-focus-visible"
                            ),
                                document.documentElement.setAttribute(
                                    "data-js-focus-visible",
                                    ""
                                ));
                }
                if (
                    "undefined" != typeof window &&
                    "undefined" != typeof document
                ) {
                    var e;
                    window.applyFocusVisiblePolyfill = t;
                    try {
                        e = new CustomEvent("focus-visible-polyfill-ready");
                    } catch (t) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(
                            "focus-visible-polyfill-ready",
                            !1,
                            !1,
                            {}
                        );
                    }
                    window.dispatchEvent(e);
                }
                "undefined" != typeof document && t(document);
            })();
        }
    },
        e = {};
    function o(i) {
        var r = e[i];
        if (void 0 !== r) return r.exports;
        var s = (e[i] = { exports: {} });
        return t[i].call(s.exports, s, s.exports, o), s.exports;
    }
    !(function () {
        "use strict";
        function t(t, e) {
            var o = {};
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) &&
                    e.indexOf(i) < 0 &&
                    (o[i] = t[i]);
            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                var r = 0;
                for (i = Object.getOwnPropertySymbols(t); r < i.length; r++)
                    e.indexOf(i[r]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(t, i[r]) &&
                        (o[i[r]] = t[i[r]]);
            }
            return o;
        }
        function e(t, e, o, i) {
            var r,
                s = arguments.length,
                n =
                    s < 3
                        ? e
                        : null === i
                            ? (i = Object.getOwnPropertyDescriptor(e, o))
                            : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                n = Reflect.decorate(t, e, o, i);
            else
                for (var c = t.length - 1; c >= 0; c--)
                    (r = t[c]) &&
                        (n = (s < 3 ? r(n) : s > 3 ? r(e, o, n) : r(e, o)) || n);
            return s > 3 && n && Object.defineProperty(e, o, n), n;
        }
        Object.create, Object.create;
        const i =
            window.ShadowRoot &&
            (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
            "adoptedStyleSheets" in Document.prototype &&
            "replace" in CSSStyleSheet.prototype,
            r = Symbol(),
            s = new Map();
        class n {
            constructor(t, e) {
                if (((this._$cssResult$ = !0), e !== r))
                    throw Error(
                        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
                    );
                this.cssText = t;
            }
            get styleSheet() {
                let t = s.get(this.cssText);
                return (
                    i &&
                    void 0 === t &&
                    (s.set(this.cssText, (t = new CSSStyleSheet())),
                        t.replaceSync(this.cssText)),
                    t
                );
            }
            toString() {
                return this.cssText;
            }
        }
        const c = t => new n("string" == typeof t ? t : t + "", r),
            a = (t, ...e) => {
                const o =
                    1 === t.length
                        ? t[0]
                        : e.reduce(
                            (e, o, i) =>
                                e +
                                (t => {
                                    if (!0 === t._$cssResult$) return t.cssText;
                                    if ("number" == typeof t) return t;
                                    throw Error(
                                        "Value passed to 'css' function must be a 'css' function result: " +
                                        t +
                                        ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                                    );
                                })(o) +
                                t[i + 1],
                            t[0]
                        );
                return new n(o, r);
            },
            l = i
                ? t => t
                : t =>
                    t instanceof CSSStyleSheet
                        ? (t => {
                            let e = "";
                            for (const o of t.cssRules) e += o.cssText;
                            return c(e);
                        })(t)
                        : t;
        var d;
        const u = window.trustedTypes,
            p = u ? u.emptyScript : "",
            m = window.reactiveElementPolyfillSupport,
            h = {
                toAttribute(t, e) {
                    switch (e) {
                        case Boolean:
                            t = t ? p : null;
                            break;
                        case Object:
                        case Array:
                            t = null == t ? t : JSON.stringify(t);
                    }
                    return t;
                },
                fromAttribute(t, e) {
                    let o = t;
                    switch (e) {
                        case Boolean:
                            o = null !== t;
                            break;
                        case Number:
                            o = null === t ? null : Number(t);
                            break;
                        case Object:
                        case Array:
                            try {
                                o = JSON.parse(t);
                            } catch (t) {
                                o = null;
                            }
                    }
                    return o;
                }
            },
            b = (t, e) => e !== t && (e == e || t == t),
            v = {
                attribute: !0,
                type: String,
                converter: h,
                reflect: !1,
                hasChanged: b
            };
        class g extends HTMLElement {
            constructor() {
                super(),
                    (this._$Et = new Map()),
                    (this.isUpdatePending = !1),
                    (this.hasUpdated = !1),
                    (this._$Ei = null),
                    this.o();
            }
            static addInitializer(t) {
                var e;
                (null !== (e = this.l) && void 0 !== e) || (this.l = []),
                    this.l.push(t);
            }
            static get observedAttributes() {
                this.finalize();
                const t = [];
                return (
                    this.elementProperties.forEach((e, o) => {
                        const i = this._$Eh(o, e);
                        void 0 !== i && (this._$Eu.set(i, o), t.push(i));
                    }),
                    t
                );
            }
            static createProperty(t, e = v) {
                if (
                    (e.state && (e.attribute = !1),
                        this.finalize(),
                        this.elementProperties.set(t, e),
                        !e.noAccessor && !this.prototype.hasOwnProperty(t))
                ) {
                    const o = "symbol" == typeof t ? Symbol() : "__" + t,
                        i = this.getPropertyDescriptor(t, o, e);
                    void 0 !== i && Object.defineProperty(this.prototype, t, i);
                }
            }
            static getPropertyDescriptor(t, e, o) {
                return {
                    get() {
                        return this[e];
                    },
                    set(i) {
                        const r = this[t];
                        (this[e] = i), this.requestUpdate(t, r, o);
                    },
                    configurable: !0,
                    enumerable: !0
                };
            }
            static getPropertyOptions(t) {
                return this.elementProperties.get(t) || v;
            }
            static finalize() {
                if (this.hasOwnProperty("finalized")) return !1;
                this.finalized = !0;
                const t = Object.getPrototypeOf(this);
                if (
                    (t.finalize(),
                        (this.elementProperties = new Map(t.elementProperties)),
                        (this._$Eu = new Map()),
                        this.hasOwnProperty("properties"))
                ) {
                    const t = this.properties,
                        e = [
                            ...Object.getOwnPropertyNames(t),
                            ...Object.getOwnPropertySymbols(t)
                        ];
                    for (const o of e) this.createProperty(o, t[o]);
                }
                return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
            }
            static finalizeStyles(t) {
                const e = [];
                if (Array.isArray(t)) {
                    const o = new Set(t.flat(1 / 0).reverse());
                    for (const t of o) e.unshift(l(t));
                } else void 0 !== t && e.push(l(t));
                return e;
            }
            static _$Eh(t, e) {
                const o = e.attribute;
                return !1 === o
                    ? void 0
                    : "string" == typeof o
                        ? o
                        : "string" == typeof t
                            ? t.toLowerCase()
                            : void 0;
            }
            o() {
                var t;
                (this._$Ep = new Promise(t => (this.enableUpdating = t))),
                    (this._$AL = new Map()),
                    this._$Em(),
                    this.requestUpdate(),
                    null === (t = this.constructor.l) ||
                    void 0 === t ||
                    t.forEach(t => t(this));
            }
            addController(t) {
                var e, o;
                (null !== (e = this._$Eg) && void 0 !== e ? e : (this._$Eg = [])).push(
                    t
                ),
                    void 0 !== this.renderRoot &&
                    this.isConnected &&
                    (null === (o = t.hostConnected) || void 0 === o || o.call(t));
            }
            removeController(t) {
                var e;
                null === (e = this._$Eg) ||
                    void 0 === e ||
                    e.splice(this._$Eg.indexOf(t) >>> 0, 1);
            }
            _$Em() {
                this.constructor.elementProperties.forEach((t, e) => {
                    this.hasOwnProperty(e) &&
                        (this._$Et.set(e, this[e]), delete this[e]);
                });
            }
            createRenderRoot() {
                var t;
                const e =
                    null !== (t = this.shadowRoot) && void 0 !== t
                        ? t
                        : this.attachShadow(this.constructor.shadowRootOptions);
                return (
                    ((t, e) => {
                        i
                            ? (t.adoptedStyleSheets = e.map(t =>
                                t instanceof CSSStyleSheet ? t : t.styleSheet
                            ))
                            : e.forEach(e => {
                                const o = document.createElement("style"),
                                    i = window.litNonce;
                                void 0 !== i && o.setAttribute("nonce", i),
                                    (o.textContent = e.cssText),
                                    t.appendChild(o);
                            });
                    })(e, this.constructor.elementStyles),
                    e
                );
            }
            connectedCallback() {
                var t;
                void 0 === this.renderRoot &&
                    (this.renderRoot = this.createRenderRoot()),
                    this.enableUpdating(!0),
                    null === (t = this._$Eg) ||
                    void 0 === t ||
                    t.forEach(t => {
                        var e;
                        return null === (e = t.hostConnected) || void 0 === e
                            ? void 0
                            : e.call(t);
                    });
            }
            enableUpdating(t) { }
            disconnectedCallback() {
                var t;
                null === (t = this._$Eg) ||
                    void 0 === t ||
                    t.forEach(t => {
                        var e;
                        return null === (e = t.hostDisconnected) || void 0 === e
                            ? void 0
                            : e.call(t);
                    });
            }
            attributeChangedCallback(t, e, o) {
                this._$AK(t, o);
            }
            _$ES(t, e, o = v) {
                var i, r;
                const s = this.constructor._$Eh(t, o);
                if (void 0 !== s && !0 === o.reflect) {
                    const n = (
                        null !==
                            (r =
                                null === (i = o.converter) || void 0 === i
                                    ? void 0
                                    : i.toAttribute) && void 0 !== r
                            ? r
                            : h.toAttribute
                    )(e, o.type);
                    (this._$Ei = t),
                        null == n ? this.removeAttribute(s) : this.setAttribute(s, n),
                        (this._$Ei = null);
                }
            }
            _$AK(t, e) {
                var o, i, r;
                const s = this.constructor,
                    n = s._$Eu.get(t);
                if (void 0 !== n && this._$Ei !== n) {
                    const t = s.getPropertyOptions(n),
                        c = t.converter,
                        a =
                            null !==
                                (r =
                                    null !==
                                        (i =
                                            null === (o = c) || void 0 === o
                                                ? void 0
                                                : o.fromAttribute) && void 0 !== i
                                        ? i
                                        : "function" == typeof c
                                            ? c
                                            : null) && void 0 !== r
                                ? r
                                : h.fromAttribute;
                    (this._$Ei = n), (this[n] = a(e, t.type)), (this._$Ei = null);
                }
            }
            requestUpdate(t, e, o) {
                let i = !0;
                void 0 !== t &&
                    ((
                        (o = o || this.constructor.getPropertyOptions(t)).hasChanged ||
                        b
                    )(this[t], e)
                        ? (this._$AL.has(t) || this._$AL.set(t, e),
                            !0 === o.reflect &&
                            this._$Ei !== t &&
                            (void 0 === this._$E_ && (this._$E_ = new Map()),
                                this._$E_.set(t, o)))
                        : (i = !1)),
                    !this.isUpdatePending && i && (this._$Ep = this._$EC());
            }
            async _$EC() {
                this.isUpdatePending = !0;
                try {
                    await this._$Ep;
                } catch (t) {
                    Promise.reject(t);
                }
                const t = this.scheduleUpdate();
                return null != t && (await t), !this.isUpdatePending;
            }
            scheduleUpdate() {
                return this.performUpdate();
            }
            performUpdate() {
                var t;
                if (!this.isUpdatePending) return;
                this.hasUpdated,
                    this._$Et &&
                    (this._$Et.forEach((t, e) => (this[e] = t)),
                        (this._$Et = void 0));
                let e = !1;
                const o = this._$AL;
                try {
                    (e = this.shouldUpdate(o)),
                        e
                            ? (this.willUpdate(o),
                                null === (t = this._$Eg) ||
                                void 0 === t ||
                                t.forEach(t => {
                                    var e;
                                    return null === (e = t.hostUpdate) || void 0 === e
                                        ? void 0
                                        : e.call(t);
                                }),
                                this.update(o))
                            : this._$EU();
                } catch (t) {
                    throw ((e = !1), this._$EU(), t);
                }
                e && this._$AE(o);
            }
            willUpdate(t) { }
            _$AE(t) {
                var e;
                null === (e = this._$Eg) ||
                    void 0 === e ||
                    e.forEach(t => {
                        var e;
                        return null === (e = t.hostUpdated) || void 0 === e
                            ? void 0
                            : e.call(t);
                    }),
                    this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
                    this.updated(t);
            }
            _$EU() {
                (this._$AL = new Map()), (this.isUpdatePending = !1);
            }
            get updateComplete() {
                return this.getUpdateComplete();
            }
            getUpdateComplete() {
                return this._$Ep;
            }
            shouldUpdate(t) {
                return !0;
            }
            update(t) {
                void 0 !== this._$E_ &&
                    (this._$E_.forEach((t, e) => this._$ES(e, this[e], t)),
                        (this._$E_ = void 0)),
                    this._$EU();
            }
            updated(t) { }
            firstUpdated(t) { }
        }
        var f;
        (g.finalized = !0),
            (g.elementProperties = new Map()),
            (g.elementStyles = []),
            (g.shadowRootOptions = { mode: "open" }),
            null == m || m({ ReactiveElement: g }),
            (null !== (d = globalThis.reactiveElementVersions) && void 0 !== d
                ? d
                : (globalThis.reactiveElementVersions = [])
            ).push("1.2.0");
        const x = globalThis.trustedTypes,
            y = x ? x.createPolicy("lit-html", { createHTML: t => t }) : void 0,
            k = `lit$${(Math.random() + "").slice(9)}$`,
            w = "?" + k,
            z = `<${w}>`,
            A = document,
            q = (t = "") => A.createComment(t),
            B = t => null === t || ("object" != typeof t && "function" != typeof t),
            $ = Array.isArray,
            E = t => {
                var e;
                return (
                    $(t) ||
                    "function" ==
                    typeof (null === (e = t) || void 0 === e
                        ? void 0
                        : e[Symbol.iterator])
                );
            },
            _ = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
            I = /-->/g,
            C = />/g,
            U =
                />|[    \n\r](?:([^\s"'>=/]+)([    \n\r]*=[   \n\r]*(?:[^    \n\r"'`<>=]|("|')|))|$)/g,
            T = /'/g,
            S = /"/g,
            L = /^(?:script|style|textarea)$/i,
            P =
                t =>
                    (e, ...o) => ({ _$litType$: t, strings: e, values: o }),
            N = P(1),
            D = (P(2), Symbol.for("lit-noChange")),
            F = Symbol.for("lit-nothing"),
            H = new WeakMap(),
            O = A.createTreeWalker(A, 129, null, !1),
            W = (t, e) => {
                const o = t.length - 1,
                    i = [];
                let r,
                    s = 2 === e ? "<svg>" : "",
                    n = _;
                for (let e = 0; e < o; e++) {
                    const o = t[e];
                    let c,
                        a,
                        l = -1,
                        d = 0;
                    for (
                        ;
                        d < o.length &&
                        ((n.lastIndex = d), (a = n.exec(o)), null !== a);

                    )
                        (d = n.lastIndex),
                            n === _
                                ? "!--" === a[1]
                                    ? (n = I)
                                    : void 0 !== a[1]
                                        ? (n = C)
                                        : void 0 !== a[2]
                                            ? (L.test(a[2]) && (r = RegExp("</" + a[2], "g")),
                                                (n = U))
                                            : void 0 !== a[3] && (n = U)
                                : n === U
                                    ? ">" === a[0]
                                        ? ((n = null != r ? r : _), (l = -1))
                                        : void 0 === a[1]
                                            ? (l = -2)
                                            : ((l = n.lastIndex - a[2].length),
                                                (c = a[1]),
                                                (n = void 0 === a[3] ? U : '"' === a[3] ? S : T))
                                    : n === S || n === T
                                        ? (n = U)
                                        : n === I || n === C
                                            ? (n = _)
                                            : ((n = U), (r = void 0));
                    const u = n === U && t[e + 1].startsWith("/>") ? " " : "";
                    s +=
                        n === _
                            ? o + z
                            : l >= 0
                                ? (i.push(c), o.slice(0, l) + "$lit$" + o.slice(l) + k + u)
                                : o + k + (-2 === l ? (i.push(void 0), e) : u);
                }
                const c = s + (t[o] || "<?>") + (2 === e ? "</svg>" : "");
                if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
                    throw Error("invalid template strings array");
                return [void 0 !== y ? y.createHTML(c) : c, i];
            };
        class M {
            constructor({ strings: t, _$litType$: e }, o) {
                let i;
                this.parts = [];
                let r = 0,
                    s = 0;
                const n = t.length - 1,
                    c = this.parts,
                    [a, l] = W(t, e);
                if (
                    ((this.el = M.createElement(a, o)),
                        (O.currentNode = this.el.content),
                        2 === e)
                ) {
                    const t = this.el.content,
                        e = t.firstChild;
                    e.remove(), t.append(...e.childNodes);
                }
                for (; null !== (i = O.nextNode()) && c.length < n;) {
                    if (1 === i.nodeType) {
                        if (i.hasAttributes()) {
                            const t = [];
                            for (const e of i.getAttributeNames())
                                if (e.endsWith("$lit$") || e.startsWith(k)) {
                                    const o = l[s++];
                                    if ((t.push(e), void 0 !== o)) {
                                        const t = i
                                            .getAttribute(o.toLowerCase() + "$lit$")
                                            .split(k),
                                            e = /([.?@])?(.*)/.exec(o);
                                        c.push({
                                            type: 1,
                                            index: r,
                                            name: e[2],
                                            strings: t,
                                            ctor:
                                                "." === e[1]
                                                    ? G
                                                    : "?" === e[1]
                                                        ? Y
                                                        : "@" === e[1]
                                                            ? Z
                                                            : K
                                        });
                                    } else c.push({ type: 6, index: r });
                                }
                            for (const e of t) i.removeAttribute(e);
                        }
                        if (L.test(i.tagName)) {
                            const t = i.textContent.split(k),
                                e = t.length - 1;
                            if (e > 0) {
                                i.textContent = x ? x.emptyScript : "";
                                for (let o = 0; o < e; o++)
                                    i.append(t[o], q()),
                                        O.nextNode(),
                                        c.push({ type: 2, index: ++r });
                                i.append(t[e], q());
                            }
                        }
                    } else if (8 === i.nodeType)
                        if (i.data === w) c.push({ type: 2, index: r });
                        else {
                            let t = -1;
                            for (; -1 !== (t = i.data.indexOf(k, t + 1));)
                                c.push({ type: 7, index: r }), (t += k.length - 1);
                        }
                    r++;
                }
            }
            static createElement(t, e) {
                const o = A.createElement("template");
                return (o.innerHTML = t), o;
            }
        }
        function j(t, e, o = t, i) {
            var r, s, n, c;
            if (e === D) return e;
            let a =
                void 0 !== i
                    ? null === (r = o._$Cl) || void 0 === r
                        ? void 0
                        : r[i]
                    : o._$Cu;
            const l = B(e) ? void 0 : e._$litDirective$;
            return (
                (null == a ? void 0 : a.constructor) !== l &&
                (null === (s = null == a ? void 0 : a._$AO) ||
                    void 0 === s ||
                    s.call(a, !1),
                    void 0 === l ? (a = void 0) : ((a = new l(t)), a._$AT(t, o, i)),
                    void 0 !== i
                        ? ((null !== (n = (c = o)._$Cl) && void 0 !== n
                            ? n
                            : (c._$Cl = []))[i] = a)
                        : (o._$Cu = a)),
                void 0 !== a && (e = j(t, a._$AS(t, e.values), a, i)),
                e
            );
        }
        class R {
            constructor(t, e) {
                (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
            }
            get parentNode() {
                return this._$AM.parentNode;
            }
            get _$AU() {
                return this._$AM._$AU;
            }
            p(t) {
                var e;
                const {
                    el: { content: o },
                    parts: i
                } = this._$AD,
                    r = (
                        null !== (e = null == t ? void 0 : t.creationScope) &&
                            void 0 !== e
                            ? e
                            : A
                    ).importNode(o, !0);
                O.currentNode = r;
                let s = O.nextNode(),
                    n = 0,
                    c = 0,
                    a = i[0];
                for (; void 0 !== a;) {
                    if (n === a.index) {
                        let e;
                        2 === a.type
                            ? (e = new V(s, s.nextSibling, this, t))
                            : 1 === a.type
                                ? (e = new a.ctor(s, a.name, a.strings, this, t))
                                : 6 === a.type && (e = new J(s, this, t)),
                            this.v.push(e),
                            (a = i[++c]);
                    }
                    n !== (null == a ? void 0 : a.index) && ((s = O.nextNode()), n++);
                }
                return r;
            }
            m(t) {
                let e = 0;
                for (const o of this.v)
                    void 0 !== o &&
                        (void 0 !== o.strings
                            ? (o._$AI(t, o, e), (e += o.strings.length - 2))
                            : o._$AI(t[e])),
                        e++;
            }
        }
        class V {
            constructor(t, e, o, i) {
                var r;
                (this.type = 2),
                    (this._$AH = F),
                    (this._$AN = void 0),
                    (this._$AA = t),
                    (this._$AB = e),
                    (this._$AM = o),
                    (this.options = i),
                    (this._$Cg =
                        null === (r = null == i ? void 0 : i.isConnected) ||
                        void 0 === r ||
                        r);
            }
            get _$AU() {
                var t, e;
                return null !==
                    (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
                    void 0 !== e
                    ? e
                    : this._$Cg;
            }
            get parentNode() {
                let t = this._$AA.parentNode;
                const e = this._$AM;
                return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
            }
            get startNode() {
                return this._$AA;
            }
            get endNode() {
                return this._$AB;
            }
            _$AI(t, e = this) {
                (t = j(this, t, e)),
                    B(t)
                        ? t === F || null == t || "" === t
                            ? (this._$AH !== F && this._$AR(), (this._$AH = F))
                            : t !== this._$AH && t !== D && this.$(t)
                        : void 0 !== t._$litType$
                            ? this.T(t)
                            : void 0 !== t.nodeType
                                ? this.S(t)
                                : E(t)
                                    ? this.A(t)
                                    : this.$(t);
            }
            M(t, e = this._$AB) {
                return this._$AA.parentNode.insertBefore(t, e);
            }
            S(t) {
                this._$AH !== t && (this._$AR(), (this._$AH = this.M(t)));
            }
            $(t) {
                this._$AH !== F && B(this._$AH)
                    ? (this._$AA.nextSibling.data = t)
                    : this.S(A.createTextNode(t)),
                    (this._$AH = t);
            }
            T(t) {
                var e;
                const { values: o, _$litType$: i } = t,
                    r =
                        "number" == typeof i
                            ? this._$AC(t)
                            : (void 0 === i.el &&
                                (i.el = M.createElement(i.h, this.options)),
                                i);
                if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === r)
                    this._$AH.m(o);
                else {
                    const t = new R(r, this),
                        e = t.p(this.options);
                    t.m(o), this.S(e), (this._$AH = t);
                }
            }
            _$AC(t) {
                let e = H.get(t.strings);
                return void 0 === e && H.set(t.strings, (e = new M(t))), e;
            }
            A(t) {
                $(this._$AH) || ((this._$AH = []), this._$AR());
                const e = this._$AH;
                let o,
                    i = 0;
                for (const r of t)
                    i === e.length
                        ? e.push(
                            (o = new V(this.M(q()), this.M(q()), this, this.options))
                        )
                        : (o = e[i]),
                        o._$AI(r),
                        i++;
                i < e.length && (this._$AR(o && o._$AB.nextSibling, i), (e.length = i));
            }
            _$AR(t = this._$AA.nextSibling, e) {
                var o;
                for (
                    null === (o = this._$AP) || void 0 === o || o.call(this, !1, !0, e);
                    t && t !== this._$AB;

                ) {
                    const e = t.nextSibling;
                    t.remove(), (t = e);
                }
            }
            setConnected(t) {
                var e;
                void 0 === this._$AM &&
                    ((this._$Cg = t),
                        null === (e = this._$AP) || void 0 === e || e.call(this, t));
            }
        }
        class K {
            constructor(t, e, o, i, r) {
                (this.type = 1),
                    (this._$AH = F),
                    (this._$AN = void 0),
                    (this.element = t),
                    (this.name = e),
                    (this._$AM = i),
                    (this.options = r),
                    o.length > 2 || "" !== o[0] || "" !== o[1]
                        ? ((this._$AH = Array(o.length - 1).fill(new String())),
                            (this.strings = o))
                        : (this._$AH = F);
            }
            get tagName() {
                return this.element.tagName;
            }
            get _$AU() {
                return this._$AM._$AU;
            }
            _$AI(t, e = this, o, i) {
                const r = this.strings;
                let s = !1;
                if (void 0 === r)
                    (t = j(this, t, e, 0)),
                        (s = !B(t) || (t !== this._$AH && t !== D)),
                        s && (this._$AH = t);
                else {
                    const i = t;
                    let n, c;
                    for (t = r[0], n = 0; n < r.length - 1; n++)
                        (c = j(this, i[o + n], e, n)),
                            c === D && (c = this._$AH[n]),
                            s || (s = !B(c) || c !== this._$AH[n]),
                            c === F
                                ? (t = F)
                                : t !== F && (t += (null != c ? c : "") + r[n + 1]),
                            (this._$AH[n] = c);
                }
                s && !i && this.k(t);
            }
            k(t) {
                t === F
                    ? this.element.removeAttribute(this.name)
                    : this.element.setAttribute(this.name, null != t ? t : "");
            }
        }
        class G extends K {
            constructor() {
                super(...arguments), (this.type = 3);
            }
            k(t) {
                this.element[this.name] = t === F ? void 0 : t;
            }
        }
        const X = x ? x.emptyScript : "";
        class Y extends K {
            constructor() {
                super(...arguments), (this.type = 4);
            }
            k(t) {
                t && t !== F
                    ? this.element.setAttribute(this.name, X)
                    : this.element.removeAttribute(this.name);
            }
        }
        class Z extends K {
            constructor(t, e, o, i, r) {
                super(t, e, o, i, r), (this.type = 5);
            }
            _$AI(t, e = this) {
                var o;
                if ((t = null !== (o = j(this, t, e, 0)) && void 0 !== o ? o : F) === D)
                    return;
                const i = this._$AH,
                    r =
                        (t === F && i !== F) ||
                        t.capture !== i.capture ||
                        t.once !== i.once ||
                        t.passive !== i.passive,
                    s = t !== F && (i === F || r);
                r && this.element.removeEventListener(this.name, this, i),
                    s && this.element.addEventListener(this.name, this, t),
                    (this._$AH = t);
            }
            handleEvent(t) {
                var e, o;
                "function" == typeof this._$AH
                    ? this._$AH.call(
                        null !==
                            (o =
                                null === (e = this.options) || void 0 === e
                                    ? void 0
                                    : e.host) && void 0 !== o
                            ? o
                            : this.element,
                        t
                    )
                    : this._$AH.handleEvent(t);
            }
        }
        class J {
            constructor(t, e, o) {
                (this.element = t),
                    (this.type = 6),
                    (this._$AN = void 0),
                    (this._$AM = e),
                    (this.options = o);
            }
            get _$AU() {
                return this._$AM._$AU;
            }
            _$AI(t) {
                j(this, t);
            }
        }
        const Q = {
            P: "$lit$",
            V: k,
            L: w,
            I: 1,
            N: W,
            R: R,
            D: E,
            j: j,
            H: V,
            O: K,
            F: Y,
            B: Z,
            W: G,
            Z: J
        },
            tt = window.litHtmlPolyfillSupport;
        var et, ot;
        null == tt || tt(M, V),
            (null !== (f = globalThis.litHtmlVersions) && void 0 !== f
                ? f
                : (globalThis.litHtmlVersions = [])
            ).push("2.1.1");
        class it extends g {
            constructor() {
                super(...arguments),
                    (this.renderOptions = { host: this }),
                    (this._$Dt = void 0);
            }
            createRenderRoot() {
                var t, e;
                const o = super.createRenderRoot();
                return (
                    (null !== (t = (e = this.renderOptions).renderBefore) &&
                        void 0 !== t) ||
                    (e.renderBefore = o.firstChild),
                    o
                );
            }
            update(t) {
                const e = this.render();
                this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
                    super.update(t),
                    (this._$Dt = ((t, e, o) => {
                        var i, r;
                        const s =
                            null !== (i = null == o ? void 0 : o.renderBefore) &&
                                void 0 !== i
                                ? i
                                : e;
                        let n = s._$litPart$;
                        if (void 0 === n) {
                            const t =
                                null !== (r = null == o ? void 0 : o.renderBefore) &&
                                    void 0 !== r
                                    ? r
                                    : null;
                            s._$litPart$ = n = new V(
                                e.insertBefore(q(), t),
                                t,
                                void 0,
                                null != o ? o : {}
                            );
                        }
                        return n._$AI(t), n;
                    })(e, this.renderRoot, this.renderOptions));
            }
            connectedCallback() {
                var t;
                super.connectedCallback(),
                    null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
            }
            disconnectedCallback() {
                var t;
                super.disconnectedCallback(),
                    null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
            }
            render() {
                return D;
            }
        }
        (it.finalized = !0),
            (it._$litElement$ = !0),
            null === (et = globalThis.litElementHydrateSupport) ||
            void 0 === et ||
            et.call(globalThis, { LitElement: it });
        const rt = globalThis.litElementPolyfillSupport;
        null == rt || rt({ LitElement: it }),
            (null !== (ot = globalThis.litElementVersions) && void 0 !== ot
                ? ot
                : (globalThis.litElementVersions = [])
            ).push("3.1.1");
        const st = (t, e) =>
            "method" === e.kind && e.descriptor && !("value" in e.descriptor)
                ? {
                    ...e,
                    finisher(o) {
                        o.createProperty(e.key, t);
                    }
                }
                : {
                    kind: "field",
                    key: Symbol(),
                    placement: "own",
                    descriptor: {},
                    originalKey: e.key,
                    initializer() {
                        "function" == typeof e.initializer &&
                            (this[e.key] = e.initializer.call(this));
                    },
                    finisher(o) {
                        o.createProperty(e.key, t);
                    }
                };
        function nt(t) {
            return (e, o) =>
                void 0 !== o
                    ? ((t, e, o) => {
                        e.constructor.createProperty(o, t);
                    })(t, e, o)
                    : st(t, e);
        }
        const ct =
            ({ finisher: t, descriptor: e }) =>
                (o, i) => {
                    var r;
                    if (void 0 === i) {
                        const i = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
                            s =
                                null != e
                                    ? {
                                        kind: "method",
                                        placement: "prototype",
                                        key: i,
                                        descriptor: e(o.key)
                                    }
                                    : { ...o, key: i };
                        return (
                            null != t &&
                            (s.finisher = function (e) {
                                t(e, i);
                            }),
                            s
                        );
                    }
                    {
                        const r = o.constructor;
                        void 0 !== e && Object.defineProperty(o, i, e(i)),
                            null == t || t(r, i);
                    }
                };
        function at(t, e) {
            return ct({
                descriptor: o => {
                    const i = {
                        get() {
                            var e, o;
                            return null !==
                                (o =
                                    null === (e = this.renderRoot) || void 0 === e
                                        ? void 0
                                        : e.querySelector(t)) && void 0 !== o
                                ? o
                                : null;
                        },
                        enumerable: !0,
                        configurable: !0
                    };
                    if (e) {
                        const e = "symbol" == typeof o ? Symbol() : "__" + o;
                        i.get = function () {
                            var o, i;
                            return (
                                void 0 === this[e] &&
                                (this[e] =
                                    null !==
                                        (i =
                                            null === (o = this.renderRoot) ||
                                                void 0 === o
                                                ? void 0
                                                : o.querySelector(t)) &&
                                        void 0 !== i
                                        ? i
                                        : null),
                                this[e]
                            );
                        };
                    }
                    return i;
                }
            });
        }
        var lt;
        const dt =
            null !=
                (null === (lt = window.HTMLSlotElement) || void 0 === lt
                    ? void 0
                    : lt.prototype.assignedElements)
                ? (t, e) => t.assignedElements(e)
                : (t, e) =>
                    t.assignedNodes(e).filter(t => t.nodeType === Node.ELEMENT_NODE);
        function ut(t, e, o) {
            let i,
                r = t;
            return (
                "object" == typeof t ? ((r = t.slot), (i = t)) : (i = { flatten: e }),
                o
                    ? (function (t) {
                        const { slot: e, selector: o } = null != t ? t : {};
                        return ct({
                            descriptor: i => ({
                                get() {
                                    var i;
                                    const r =
                                        "slot" +
                                        (e ? `[name=${e}]` : ":not([name])"),
                                        s =
                                            null === (i = this.renderRoot) ||
                                                void 0 === i
                                                ? void 0
                                                : i.querySelector(r),
                                        n = null != s ? dt(s, t) : [];
                                    return o ? n.filter(t => t.matches(o)) : n;
                                },
                                enumerable: !0,
                                configurable: !0
                            })
                        });
                    })({ slot: r, flatten: e, selector: o })
                    : ct({
                        descriptor: t => ({
                            get() {
                                var t, e;
                                const o =
                                    "slot" + (r ? `[name=${r}]` : ":not([name])"),
                                    s =
                                        null === (t = this.renderRoot) || void 0 === t
                                            ? void 0
                                            : t.querySelector(o);
                                return null !==
                                    (e = null == s ? void 0 : s.assignedNodes(i)) &&
                                    void 0 !== e
                                    ? e
                                    : [];
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    })
            );
        }
        const { H: pt } = Q,
            mt = t => void 0 === t.strings,
            ht = {},
            bt =
                t =>
                    (...e) => ({ _$litDirective$: t, values: e });
        class vt {
            constructor(t) { }
            get _$AU() {
                return this._$AM._$AU;
            }
            _$AT(t, e, o) {
                (this._$Ct = t), (this._$AM = e), (this._$Ci = o);
            }
            _$AS(t, e) {
                return this.update(t, e);
            }
            update(t, e) {
                return this.render(...e);
            }
        }
        const gt = (t, e) => {
            var o, i;
            const r = t._$AN;
            if (void 0 === r) return !1;
            for (const t of r)
                null === (i = (o = t)._$AO) || void 0 === i || i.call(o, e, !1),
                    gt(t, e);
            return !0;
        },
            ft = t => {
                let e, o;
                do {
                    if (void 0 === (e = t._$AM)) break;
                    (o = e._$AN), o.delete(t), (t = e);
                } while (0 === (null == o ? void 0 : o.size));
            },
            xt = t => {
                for (let e; (e = t._$AM); t = e) {
                    let o = e._$AN;
                    if (void 0 === o) e._$AN = o = new Set();
                    else if (o.has(t)) break;
                    o.add(t), wt(e);
                }
            };
        function yt(t) {
            void 0 !== this._$AN
                ? (ft(this), (this._$AM = t), xt(this))
                : (this._$AM = t);
        }
        function kt(t, e = !1, o = 0) {
            const i = this._$AH,
                r = this._$AN;
            if (void 0 !== r && 0 !== r.size)
                if (e)
                    if (Array.isArray(i))
                        for (let t = o; t < i.length; t++) gt(i[t], !1), ft(i[t]);
                    else null != i && (gt(i, !1), ft(i));
                else gt(this, t);
        }
        const wt = t => {
            var e, o, i, r;
            2 == t.type &&
                ((null !== (e = (i = t)._$AP) && void 0 !== e) || (i._$AP = kt),
                    (null !== (o = (r = t)._$AQ) && void 0 !== o) || (r._$AQ = yt));
        };
        class zt extends vt {
            constructor() {
                super(...arguments), (this._$AN = void 0);
            }
            _$AT(t, e, o) {
                super._$AT(t, e, o), xt(this), (this.isConnected = t._$AU);
            }
            _$AO(t, e = !0) {
                var o, i;
                t !== this.isConnected &&
                    ((this.isConnected = t),
                        t
                            ? null === (o = this.reconnected) ||
                            void 0 === o ||
                            o.call(this)
                            : null === (i = this.disconnected) ||
                            void 0 === i ||
                            i.call(this)),
                    e && (gt(this, t), ft(this));
            }
            setValue(t) {
                if (mt(this._$Ct)) this._$Ct._$AI(t, this);
                else {
                    const e = [...this._$Ct._$AH];
                    (e[this._$Ci] = t), this._$Ct._$AI(e, this, 0);
                }
            }
            disconnected() { }
            reconnected() { }
        }
        const At = ["", () => { }],
            qt = bt(
                class extends zt {
                    constructor() {
                        super(...arguments),
                            (this.start = At),
                            (this.streamInside = At),
                            (this.end = At),
                            (this.streamOutside = At),
                            (this.state = "off"),
                            (this.handleStart = t => {
                                this.callHandler(this.start[1], t),
                                    t.defaultPrevented ||
                                    (this.removeListeners(),
                                        this.addListeners("on"));
                            }),
                            (this.handleStream = t => {
                                this.callHandler(this.streamInside[1], t);
                            }),
                            (this.handleEnd = t => {
                                this.callHandler(this.end[1], t),
                                    this.removeListeners(),
                                    this.addListeners("off");
                            }),
                            (this.handleBetween = t => {
                                this.callHandler(this.streamOutside[1], t);
                            });
                    }
                    render(t) {
                        return F;
                    }
                    update(
                        t,
                        [
                            {
                                start: e,
                                end: o,
                                streamInside: i = At,
                                streamOutside: r = At
                            }
                        ]
                    ) {
                        var s;
                        this.element !== t.element &&
                            ((this.element = t.element), this.removeListeners()),
                            (this.host =
                                (null === (s = t.options) || void 0 === s
                                    ? void 0
                                    : s.host) || this.element),
                            (this.start = e),
                            (this.end = o),
                            (this.streamInside = i),
                            (this.streamOutside = r),
                            this.addListeners();
                    }
                    addListeners(t) {
                        (this.state = t || this.state),
                            "off" === this.state
                                ? (this.addListener(
                                    this.streamOutside[0],
                                    this.handleBetween
                                ),
                                    this.addListener(this.start[0], this.handleStart))
                                : "on" === this.state &&
                                (this.addListener(
                                    this.streamInside[0],
                                    this.handleStream
                                ),
                                    this.addListener(this.end[0], this.handleEnd));
                    }
                    callHandler(t, e) {
                        "function" == typeof t
                            ? t.call(this.host, e)
                            : t.handleEvent(e);
                    }
                    addListener(t, e) {
                        Array.isArray(t)
                            ? t.map(t => {
                                this.element.addEventListener(t, e);
                            })
                            : this.element.addEventListener(t, e);
                    }
                    removeListener(t, e) {
                        Array.isArray(t)
                            ? t.map(t => {
                                this.element.removeEventListener(t, e);
                            })
                            : this.element.removeEventListener(t, e);
                    }
                    removeListeners() {
                        this.removeListener(this.start[0], this.handleStart),
                            this.removeListener(
                                this.streamInside[0],
                                this.handleStream
                            ),
                            this.removeListener(this.end[0], this.handleEnd),
                            this.removeListener(
                                this.streamOutside[0],
                                this.handleBetween
                            );
                    }
                    disconnected() {
                        this.removeListeners();
                    }
                    reconnected() {
                        this.addListeners();
                    }
                }
            );
        function Bt() {
            return (
                (Bt =
                    Object.assign ||
                    function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var o = arguments[e];
                            for (var i in o)
                                Object.prototype.hasOwnProperty.call(o, i) &&
                                    (t[i] = o[i]);
                        }
                        return t;
                    }),
                Bt.apply(this, arguments)
            );
        }
        let $t = new Map(),
            Et = !1;
        try {
            Et =
                "exceptZero" ===
                new Intl.NumberFormat("de-DE", {
                    signDisplay: "exceptZero"
                }).resolvedOptions().signDisplay;
        } catch (r) { }
        let _t = !1;
        try {
            _t =
                "unit" ===
                new Intl.NumberFormat("de-DE", {
                    style: "unit",
                    unit: "degree"
                }).resolvedOptions().style;
        } catch (r) { }
        const It = {
            degree: {
                narrow: { default: "°", "ja-JP": " 度", "zh-TW": "度", "sl-SI": " °" }
            }
        };
        class Ct {
            constructor(t, e) {
                void 0 === e && (e = {}),
                    (this.numberFormatter = void 0),
                    (this.options = void 0),
                    (this.numberFormatter = (function (t, e) {
                        void 0 === e && (e = {});
                        let { numberingSystem: o } = e;
                        if (
                            (o && -1 === t.indexOf("-u-nu-") && (t = t + "-u-nu-" + o),
                                "unit" === e.style && !_t)
                        ) {
                            var i;
                            let { unit: t, unitDisplay: o = "short" } = e;
                            if (!t)
                                throw new Error(
                                    'unit option must be provided with style: "unit"'
                                );
                            if (null == (i = It[t]) || !i[o])
                                throw new Error(
                                    "Unsupported unit " + t + " with unitDisplay = " + o
                                );
                            e = Bt({}, e, { style: "decimal" });
                        }
                        let r =
                            t +
                            (e
                                ? Object.entries(e)
                                    .sort((t, e) => (t[0] < e[0] ? -1 : 1))
                                    .join()
                                : "");
                        if ($t.has(r)) return $t.get(r);
                        let s = new Intl.NumberFormat(t, e);
                        return $t.set(r, s), s;
                    })(t, e)),
                    (this.options = e);
            }
            format(t) {
                let e = "";
                if (
                    ((e =
                        Et || null == this.options.signDisplay
                            ? this.numberFormatter.format(t)
                            : (function (t, e, o) {
                                if ("auto" === e) return t.format(o);
                                if ("never" === e) return t.format(Math.abs(o));
                                {
                                    let i = !1;
                                    if (
                                        ("always" === e
                                            ? (i = o > 0 || Object.is(o, 0))
                                            : "exceptZero" === e &&
                                            (Object.is(o, -0) || Object.is(o, 0)
                                                ? (o = Math.abs(o))
                                                : (i = o > 0)),
                                            i)
                                    ) {
                                        let e = t.format(-o),
                                            i = t.format(o),
                                            r = e
                                                .replace(i, "")
                                                .replace(/\u200e|\u061C/, "");
                                        return (
                                            1 !== [...r].length &&
                                            console.warn(
                                                "@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case"
                                            ),
                                            e
                                                .replace(i, "!!!")
                                                .replace(r, "+")
                                                .replace("!!!", i)
                                        );
                                    }
                                    return t.format(o);
                                }
                            })(this.numberFormatter, this.options.signDisplay, t)),
                        "unit" === this.options.style && !_t)
                ) {
                    var o;
                    let {
                        unit: t,
                        unitDisplay: i = "short",
                        locale: r
                    } = this.resolvedOptions(),
                        s = null == (o = It[t]) ? void 0 : o[i];
                    e += s[r] || s.default;
                }
                return e;
            }
            formatToParts(t) {
                return this.numberFormatter.formatToParts(t);
            }
            resolvedOptions() {
                let t = this.numberFormatter.resolvedOptions();
                return (
                    Et ||
                    null == this.options.signDisplay ||
                    (t = Bt({}, t, { signDisplay: this.options.signDisplay })),
                    _t ||
                    "unit" !== this.options.style ||
                    (t = Bt({}, t, {
                        style: "unit",
                        unit: this.options.unit,
                        unitDisplay: this.options.unitDisplay
                    })),
                    t
                );
            }
        }
        const Ut = new RegExp("^.*\\(.*\\).*$"),
            Tt = ["latn", "arab", "hanidec"];
        class St {
            constructor(t, e) {
                void 0 === e && (e = {}),
                    (this.locale = void 0),
                    (this.options = void 0),
                    (this.locale = t),
                    (this.options = e);
            }
            parse(t) {
                return Pt(this.locale, this.options, t).parse(t);
            }
            isValidPartialNumber(t, e, o) {
                return Pt(this.locale, this.options, t).isValidPartialNumber(t, e, o);
            }
            getNumberingSystem(t) {
                return Pt(this.locale, this.options, t).options.numberingSystem;
            }
        }
        const Lt = new Map();
        function Pt(t, e, o) {
            let i = Nt(t, e);
            if (!t.includes("-nu-") && !i.isValidPartialNumber(o))
                for (let r of Tt)
                    if (r !== i.options.numberingSystem) {
                        let i = Nt(t + (t.includes("-u-") ? "-nu-" : "-u-nu-") + r, e);
                        if (i.isValidPartialNumber(o)) return i;
                    }
            return i;
        }
        function Nt(t, e) {
            let o =
                t +
                (e
                    ? Object.entries(e)
                        .sort((t, e) => (t[0] < e[0] ? -1 : 1))
                        .join()
                    : ""),
                i = Lt.get(o);
            return i || ((i = new Dt(t, e)), Lt.set(o, i)), i;
        }
        class Dt {
            constructor(t, e) {
                void 0 === e && (e = {}),
                    (this.formatter = void 0),
                    (this.options = void 0),
                    (this.symbols = void 0),
                    (this.formatter = new Intl.NumberFormat(t, e)),
                    (this.options = this.formatter.resolvedOptions()),
                    (this.symbols = (function (t, e, o) {
                        var i, r, s, n, c;
                        let a = t.formatToParts(-10000.111),
                            l = t.formatToParts(10000.111),
                            d = t.formatToParts(1),
                            u =
                                null !=
                                    (i =
                                        null == (r = a.find(t => "minusSign" === t.type))
                                            ? void 0
                                            : r.value)
                                    ? i
                                    : "-",
                            p =
                                null == (s = l.find(t => "plusSign" === t.type))
                                    ? void 0
                                    : s.value;
                        p ||
                            ("exceptZero" !== (null == o ? void 0 : o.signDisplay) &&
                                "always" !== (null == o ? void 0 : o.signDisplay)) ||
                            (p = "+");
                        let m =
                            null == (n = a.find(t => "decimal" === t.type))
                                ? void 0
                                : n.value,
                            h =
                                null == (c = a.find(t => "group" === t.type))
                                    ? void 0
                                    : c.value,
                            b = a.filter(t => !Ft.has(t.type)).map(t => Ot(t.value)),
                            v = d.filter(t => !Ft.has(t.type)).map(t => Ot(t.value)),
                            g = [...new Set([...v, ...b])].sort(
                                (t, e) => e.length - t.length
                            ),
                            f = new RegExp(g.join("|") + "|[\\p{White_Space}]", "gu"),
                            x = [
                                ...new Intl.NumberFormat(e.locale, {
                                    useGrouping: !1
                                }).format(9876543210)
                            ].reverse(),
                            y = new Map(x.map((t, e) => [t, e]));
                        return {
                            minusSign: u,
                            plusSign: p,
                            decimal: m,
                            group: h,
                            literals: f,
                            numeral: new RegExp("[" + x.join("") + "]", "g"),
                            index: t => String(y.get(t))
                        };
                    })(this.formatter, this.options, e));
            }
            parse(t) {
                let e = this.sanitize(t);
                e = Ht(e, this.symbols.group, "")
                    .replace(this.symbols.decimal, ".")
                    .replace(this.symbols.minusSign, "-")
                    .replace(this.symbols.numeral, this.symbols.index);
                let o = e ? +e : NaN;
                return isNaN(o)
                    ? NaN
                    : ("accounting" === this.options.currencySign &&
                        Ut.test(t) &&
                        (o *= -1),
                        "percent" === this.options.style &&
                        ((o /= 100),
                            (o = +o.toFixed(
                                (null != (i = this.options.maximumFractionDigits)
                                    ? i
                                    : 0) + 2
                            ))),
                        o);
                var i;
            }
            sanitize(t) {
                return (
                    (t = (t = t.replace(this.symbols.literals, "")).replace(
                        "-",
                        this.symbols.minusSign
                    )),
                    "arab" === this.options.numberingSystem &&
                    (t = Ht(
                        (t = (t = t.replace(",", this.symbols.decimal)).replace(
                            String.fromCharCode(1548),
                            this.symbols.decimal
                        )),
                        ".",
                        this.symbols.group
                    )),
                    "fr-FR" === this.options.locale &&
                    (t = Ht(t, ".", String.fromCharCode(8239))),
                    t
                );
            }
            isValidPartialNumber(t, e, o) {
                return (
                    void 0 === e && (e = -1 / 0),
                    void 0 === o && (o = 1 / 0),
                    (t = this.sanitize(t)).startsWith(this.symbols.minusSign) && e < 0
                        ? (t = t.slice(this.symbols.minusSign.length))
                        : this.symbols.plusSign &&
                        t.startsWith(this.symbols.plusSign) &&
                        o > 0 &&
                        (t = t.slice(this.symbols.plusSign.length)),
                    !t.startsWith(this.symbols.group) &&
                    0 ===
                    (t = Ht(t, this.symbols.group, "")
                        .replace(this.symbols.numeral, "")
                        .replace(this.symbols.decimal, "")).length
                );
            }
        }
        const Ft = new Set([
            "decimal",
            "fraction",
            "integer",
            "minusSign",
            "plusSign",
            "group"
        ]);
        function Ht(t, e, o) {
            return t.replaceAll ? t.replaceAll(e, o) : t.split(e).join(o);
        }
        function Ot(t) {
            return t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        const Wt = new Set();
        new MutationObserver(() => {
            const t =
                "rtl" === document.documentElement.dir
                    ? document.documentElement.dir
                    : "ltr";
            Wt.forEach(e => {
                e.setAttribute("dir", t);
            });
        }).observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["dir"]
        });
        class Mt extends (function (t) {
            class o extends t {
                constructor() {
                    super(...arguments), (this.dir = "ltr");
                }
                get isLTR() {
                    return "ltr" === this.dir;
                }
                hasVisibleFocusInTree() {
                    const t = this.getRootNode().activeElement;
                    if (!t) return !1;
                    try {
                        return (
                            t.matches(":focus-visible") || t.matches(".focus-visible")
                        );
                    } catch (e) {
                        return t.matches(".focus-visible");
                    }
                }
                connectedCallback() {
                    if (!this.hasAttribute("dir")) {
                        let e = this.assignedSlot || this.parentNode;
                        for (
                            ;
                            e !== document.documentElement &&
                            void 0 === (t = e).startManagingContentDirection &&
                            "SP-THEME" !== t.tagName;

                        )
                            e = e.assignedSlot || e.parentNode || e.host;
                        if (
                            ((this.dir = "rtl" === e.dir ? e.dir : this.dir || "ltr"),
                                e === document.documentElement)
                        )
                            Wt.add(this);
                        else {
                            const { localName: t } = e;
                            t.search("-") > -1 && !customElements.get(t)
                                ? customElements.whenDefined(t).then(() => {
                                    e.startManagingContentDirection(this);
                                })
                                : e.startManagingContentDirection(this);
                        }
                        this._dirParent = e;
                    }
                    var t;
                    super.connectedCallback();
                }
                disconnectedCallback() {
                    super.disconnectedCallback(),
                        this._dirParent &&
                        (this._dirParent === document.documentElement
                            ? Wt.delete(this)
                            : this._dirParent.stopManagingContentDirection(this),
                            this.removeAttribute("dir"));
                }
            }
            return e([nt({ reflect: !0 })], o.prototype, "dir", void 0), o;
        })(it) { }
        var jt = a`
:host{fill:currentColor;color:inherit;display:inline-block;pointer-events:none}:host(:not(:root)){overflow:hidden}@media (forced-colors:active){.spectrum-UIIcon,:host{forced-color-adjust:auto}}:host{--spectrum-icon-size-s:var(
--spectrum-alias-workflow-icon-size-s,var(--spectrum-global-dimension-size-200)
);--spectrum-icon-size-m:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);--spectrum-icon-size-l:var(--spectrum-alias-workflow-icon-size-l);--spectrum-icon-size-xl:var(
--spectrum-alias-workflow-icon-size-xl,var(--spectrum-global-dimension-size-275)
);--spectrum-icon-size-xxl:var(--spectrum-global-dimension-size-400)}:host([size=s]){height:var(
--spectrum-icon-size-s
);width:var(--spectrum-icon-size-s)}:host([size=m]){height:var(
--spectrum-icon-size-m
);width:var(--spectrum-icon-size-m)}:host([size=l]){height:var(
--spectrum-icon-size-l
);width:var(--spectrum-icon-size-l)}:host([size=xl]){height:var(
--spectrum-icon-size-xl
);width:var(--spectrum-icon-size-xl)}:host([size=xxl]){height:var(
--spectrum-icon-size-xxl
);width:var(--spectrum-icon-size-xxl)}:host{height:var(
--spectrum-icon-tshirt-size-height,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
);width:var(
--spectrum-icon-tshirt-size-width,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
)}#container{height:100%}::slotted(*),img,svg{height:100%;vertical-align:top;width:100%}
`;
        class Rt extends Mt {
            static get styles() {
                return [jt];
            }
            render() {
                return N`
    <slot></slot>
`;
            }
        }
        let Vt;
        e([nt()], Rt.prototype, "label", void 0),
            e([nt({ reflect: !0 })], Rt.prototype, "size", void 0);
        const Kt = function (t, ...e) {
            return Vt ? Vt(t, ...e) : e.reduce((e, o, i) => e + o + t[i + 1], t[0]);
        },
            Gt = t => {
                Vt = t;
            };
        function Xt(
            t,
            {
                validSizes: o = ["s", "m", "l", "xl"],
                noDefaultSize: i,
                defaultSize: r = "m"
            } = {}
        ) {
            class s extends t {
                constructor() {
                    super(...arguments), (this._size = r);
                }
                get size() {
                    return this._size || r;
                }
                set size(t) {
                    const e = i ? null : r,
                        s = t ? t.toLocaleLowerCase() : t,
                        n = o.includes(s) ? s : e;
                    if ((n && this.setAttribute("size", n), this._size === n)) return;
                    const c = this._size;
                    (this._size = n), this.requestUpdate("size", c);
                }
                firstUpdated(t) {
                    super.firstUpdated(t),
                        this.hasAttribute("size") ||
                        i ||
                        this.setAttribute("size", this.size);
                }
            }
            return e([nt({ type: String, reflect: !0 })], s.prototype, "size", null), s;
        }
        customElements.define(
            "sp-icon-chevron75",
            class extends Rt {
                render() {
                    return (
                        Gt(N),
                        Kt`<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 10 10"
aria-hidden="true"
fill="currentColor"
>
<path
d="M7.482 4.406l-.001-.001L3.86.783a.84.84 0 00-1.188 1.188L5.702 5l-3.03 3.03A.84.84 0 003.86 9.216l3.621-3.622h.001a.84.84 0 000-1.19z"
/>
</svg>`
                    );
                }
            }
        );
        const Yt = t => (null != t ? t : F);
        o(202);
        let Zt = !0;
        try {
            document.body.querySelector(":focus-visible");
        } catch (t) {
            Zt = !1;
        }
        const Jt = t => {
            var e;
            const o = Symbol("endPolyfillCoordination");
            return (
                (e = o),
                class extends t {
                    constructor() {
                        super(...arguments), (this[e] = null);
                    }
                    connectedCallback() {
                        super.connectedCallback && super.connectedCallback(),
                            Zt ||
                            requestAnimationFrame(() => {
                                null == this[o] &&
                                    (this[o] = (t => {
                                        if (
                                            null == t.shadowRoot ||
                                            t.hasAttribute("data-js-focus-visible")
                                        )
                                            return () => { };
                                        if (!self.applyFocusVisiblePolyfill) {
                                            const e = () => {
                                                self.applyFocusVisiblePolyfill &&
                                                    t.shadowRoot &&
                                                    self.applyFocusVisiblePolyfill(
                                                        t.shadowRoot
                                                    ),
                                                    t.manageAutoFocus &&
                                                    t.manageAutoFocus();
                                            };
                                            return (
                                                self.addEventListener(
                                                    "focus-visible-polyfill-ready",
                                                    e,
                                                    { once: !0 }
                                                ),
                                                () => {
                                                    self.removeEventListener(
                                                        "focus-visible-polyfill-ready",
                                                        e
                                                    );
                                                }
                                            );
                                        }
                                        return (
                                            self.applyFocusVisiblePolyfill(
                                                t.shadowRoot
                                            ),
                                            t.manageAutoFocus &&
                                            t.manageAutoFocus(),
                                            () => { }
                                        );
                                    })(this));
                            });
                    }
                    disconnectedCallback() {
                        super.disconnectedCallback && super.disconnectedCallback(),
                            Zt ||
                            requestAnimationFrame(() => {
                                null != this[o] && (this[o](), (this[o] = null));
                            });
                    }
                }
            );
        };
        class Qt extends Jt(Mt) {
            constructor() {
                super(...arguments),
                    (this.disabled = !1),
                    (this.autofocus = !1),
                    (this._tabIndex = 0),
                    (this.manipulatingTabindex = !1);
            }
            get tabIndex() {
                if (this.focusElement === this) {
                    const t = this.hasAttribute("tabindex")
                        ? Number(this.getAttribute("tabindex"))
                        : NaN;
                    return isNaN(t) ? -1 : t;
                }
                const t = parseFloat(
                    (this.hasAttribute("tabindex") && this.getAttribute("tabindex")) ||
                    "0"
                );
                return this.disabled || t < 0
                    ? -1
                    : this.focusElement
                        ? this.focusElement.tabIndex
                        : t;
            }
            set tabIndex(t) {
                if (this.manipulatingTabindex) this.manipulatingTabindex = !1;
                else if (this.focusElement !== this) {
                    if (
                        (-1 === t
                            ? this.addEventListener(
                                "pointerdown",
                                this.onPointerdownManagementOfTabIndex
                            )
                            : ((this.manipulatingTabindex = !0),
                                this.removeEventListener(
                                    "pointerdown",
                                    this.onPointerdownManagementOfTabIndex
                                )),
                            -1 === t || this.disabled)
                    )
                        return (
                            this.setAttribute("tabindex", "-1"),
                            this.removeAttribute("focusable"),
                            void (-1 !== t && this.manageFocusElementTabindex(t))
                        );
                    this.setAttribute("focusable", ""),
                        this.hasAttribute("tabindex")
                            ? this.removeAttribute("tabindex")
                            : (this.manipulatingTabindex = !1),
                        this.manageFocusElementTabindex(t);
                } else if (t !== this.tabIndex) {
                    this._tabIndex = t;
                    const e = this.disabled ? "-1" : "" + t;
                    this.setAttribute("tabindex", e);
                }
            }
            onPointerdownManagementOfTabIndex() {
                -1 === this.tabIndex &&
                    ((this.tabIndex = 0), this.focus({ preventScroll: !0 }));
            }
            async manageFocusElementTabindex(t) {
                this.focusElement || (await this.updateComplete),
                    null === t
                        ? this.focusElement.removeAttribute("tabindex")
                        : (this.focusElement.tabIndex = t);
            }
            get focusElement() {
                throw new Error("Must implement focusElement getter!");
            }
            focus(t) {
                !this.disabled &&
                    this.focusElement &&
                    (this.focusElement !== this
                        ? this.focusElement.focus(t)
                        : HTMLElement.prototype.focus.apply(this, [t]));
            }
            blur() {
                const t = this.focusElement || this;
                t !== this ? t.blur() : HTMLElement.prototype.blur.apply(this);
            }
            click() {
                if (this.disabled) return;
                const t = this.focusElement || this;
                t !== this ? t.click() : HTMLElement.prototype.click.apply(this);
            }
            manageAutoFocus() {
                this.autofocus &&
                    (this.dispatchEvent(new KeyboardEvent("keydown", { code: "Tab" })),
                        this.focusElement.focus());
            }
            firstUpdated(t) {
                super.firstUpdated(t),
                    this.manageAutoFocus(),
                    (this.hasAttribute("tabindex") &&
                        "-1" === this.getAttribute("tabindex")) ||
                    this.setAttribute("focusable", "");
            }
            update(t) {
                t.has("disabled") &&
                    this.handleDisabledChanged(this.disabled, t.get("disabled")),
                    super.update(t);
            }
            updated(t) {
                super.updated(t), t.has("disabled") && this.disabled && this.blur();
            }
            async handleDisabledChanged(t, e) {
                const o = () =>
                    this.focusElement !== this && void 0 !== this.focusElement.disabled;
                t
                    ? ((this.manipulatingTabindex = !0),
                        this.setAttribute("tabindex", "-1"),
                        await this.updateComplete,
                        o()
                            ? (this.focusElement.disabled = !0)
                            : this.setAttribute("aria-disabled", "true"))
                    : e &&
                    ((this.manipulatingTabindex = !0),
                        this.focusElement === this
                            ? this.setAttribute("tabindex", "" + this._tabIndex)
                            : this.removeAttribute("tabindex"),
                        await this.updateComplete,
                        o()
                            ? (this.focusElement.disabled = !1)
                            : this.removeAttribute("aria-disabled"));
            }
        }
        e([nt({ type: Boolean, reflect: !0 })], Qt.prototype, "disabled", void 0),
            e([nt({ type: Boolean })], Qt.prototype, "autofocus", void 0),
            e([nt({ type: Number })], Qt.prototype, "tabIndex", null);
        const te = Symbol("slotElementObserver"),
            ee = Symbol("assignedNodes"),
            oe = Symbol("startObserving"),
            ie = Symbol("slotElementObserver"),
            re = Symbol("startObserving"),
            se = Symbol("slotContentIsPresent");
        class ne extends (function (t) {
            class o extends t {
                renderAnchor({
                    id: t,
                    className: e,
                    ariaHidden: o,
                    labelledby: i,
                    tabindex: r,
                    anchorContent: s = N`<slot></slot>`
                }) {
                    return N`<a
            id=${t}
            class=${Yt(e)}
            href=${Yt(this.href)}
            download=${Yt(this.download)}
            target=${Yt(this.target)}
            aria-label=${Yt(this.label)}
            aria-labelledby=${Yt(i)}
            aria-hidden=${Yt(o ? "true" : void 0)}
            tabindex=${Yt(r)}
            rel=${Yt(this.rel)}
        >${s}</a>`;
                }
            }
            return (
                e([nt({ reflect: !0 })], o.prototype, "download", void 0),
                e([nt()], o.prototype, "label", void 0),
                e([nt({ reflect: !0 })], o.prototype, "href", void 0),
                e([nt({ reflect: !0 })], o.prototype, "target", void 0),
                e([nt({ reflect: !0 })], o.prototype, "rel", void 0),
                o
            );
        })(
            (function (t, o) {
                var i;
                class r extends t {
                    constructor() {
                        super(...arguments), (this.slotHasContent = !1);
                    }
                    manageTextObservedSlot() {
                        if (!this[ee]) return;
                        const t = [...this[ee]].filter(
                            t =>
                                !!t.tagName || (!!t.textContent && t.textContent.trim())
                        );
                        this.slotHasContent = t.length > 0;
                    }
                    firstUpdated(t) {
                        super.firstUpdated(t), this.manageTextObservedSlot();
                    }
                    [((i = ee), oe)]() {
                        if (!this[te]) {
                            const t = t => {
                                for (const e of t)
                                    "characterData" === e.type &&
                                        this.manageTextObservedSlot();
                            };
                            this[te] = new MutationObserver(t);
                        }
                        this[te].observe(this, { characterData: !0, subtree: !0 });
                    }
                    connectedCallback() {
                        super.connectedCallback(), this[oe]();
                    }
                    disconnectedCallback() {
                        this[te] && this[te].disconnect(), super.disconnectedCallback();
                    }
                }
                return (
                    e(
                        [nt({ type: Boolean, attribute: !1 })],
                        r.prototype,
                        "slotHasContent",
                        void 0
                    ),
                    e([ut(void 0, !0)], r.prototype, i, void 0),
                    r
                );
            })(
                (function (t, e) {
                    var o;
                    const i = Array.isArray(e) ? e : [e];
                    class r extends t {
                        constructor() {
                            super(...arguments),
                                (this[o] = new Map()),
                                (this.managePresenceObservedSlot = () => {
                                    i.forEach(t => {
                                        this[se].set(t, !!this.querySelector(t));
                                    }),
                                        this.requestUpdate();
                                });
                        }
                        get slotContentIsPresent() {
                            if (1 === i.length) return this[se].get(i[0]) || !1;
                            throw new Error(
                                "Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead."
                            );
                        }
                        getSlotContentPresence(t) {
                            if (this[se].has(t)) return this[se].get(t) || !1;
                            throw new Error(
                                "The provided selector `` is not being observed."
                            );
                        }
                        [((o = se), re)]() {
                            this[ie] ||
                                (this[ie] = new MutationObserver(
                                    this.managePresenceObservedSlot
                                )),
                                this[ie].observe(this, { childList: !0, subtree: !0 }),
                                this.managePresenceObservedSlot();
                        }
                        connectedCallback() {
                            super.connectedCallback(), this[re]();
                        }
                        disconnectedCallback() {
                            this[ie].disconnect(), super.disconnectedCallback();
                        }
                    }
                    return r;
                })(Qt, '[slot="icon"]')
            )
        ) {
            constructor() {
                super(),
                    (this.active = !1),
                    (this.type = "button"),
                    (this.proxyFocus = this.proxyFocus.bind(this)),
                    this.addEventListener("click", this.handleClickCapture, {
                        capture: !0
                    });
            }
            get hasIcon() {
                return this.slotContentIsPresent;
            }
            get hasLabel() {
                return this.slotHasContent;
            }
            get focusElement() {
                return this;
            }
            get buttonContent() {
                const t = [
                    N`
        <div id="label" ?hidden=${!this.hasLabel}>
            <slot
                id="slot"
                @slotchange=${this.manageTextObservedSlot}
            ></slot>
        </div>
    `
                ];
                return (
                    this.hasIcon &&
                    t.unshift(N`
        <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
    `),
                    t
                );
            }
            click() {
                this.disabled || this.shouldProxyClick() || super.click();
            }
            handleClickCapture(t) {
                if (this.disabled)
                    return (
                        t.preventDefault(),
                        t.stopImmediatePropagation(),
                        t.stopPropagation(),
                        !1
                    );
            }
            proxyFocus() {
                this.focus();
            }
            shouldProxyClick() {
                let t = !1;
                if (this.anchorElement) this.anchorElement.click(), (t = !0);
                else if ("button" !== this.type) {
                    const e = document.createElement("button");
                    (e.type = this.type),
                        this.insertAdjacentElement("afterend", e),
                        e.click(),
                        e.remove(),
                        (t = !0);
                }
                return t;
            }
            renderAnchor() {
                return N`
    ${this.buttonContent}
    ${super.renderAnchor({
                    id: "button",
                    ariaHidden: !0,
                    className: "button anchor hidden"
                })}
`;
            }
            renderButton() {
                return N`
    ${this.buttonContent}
`;
            }
            render() {
                return this.href && this.href.length > 0
                    ? this.renderAnchor()
                    : this.renderButton();
            }
            handleKeydown(t) {
                const { code: e } = t;
                "Space" === e &&
                    (t.preventDefault(),
                        void 0 === this.href &&
                        (this.addEventListener("keyup", this.handleKeyup),
                            (this.active = !0)));
            }
            handleKeypress(t) {
                const { code: e } = t;
                switch (e) {
                    case "Enter":
                    case "NumpadEnter":
                        this.click();
                }
            }
            handleKeyup(t) {
                const { code: e } = t;
                "Space" === e &&
                    (this.removeEventListener("keyup", this.handleKeyup),
                        (this.active = !1),
                        this.click());
            }
            handleRemoveActive() {
                this.active = !1;
            }
            handlePointerdown() {
                this.active = !0;
            }
            manageAnchor() {
                this.href && this.href.length > 0
                    ? ("button" === this.getAttribute("role") &&
                        this.setAttribute("role", "link"),
                        this.removeEventListener("click", this.shouldProxyClick))
                    : ((this.hasAttribute("role") &&
                        "link" !== this.getAttribute("role")) ||
                        this.setAttribute("role", "button"),
                        this.addEventListener("click", this.shouldProxyClick));
            }
            firstUpdated(t) {
                super.firstUpdated(t),
                    this.hasAttribute("tabindex") || (this.tabIndex = 0),
                    this.manageAnchor(),
                    this.addEventListener("keydown", this.handleKeydown),
                    this.addEventListener("keypress", this.handleKeypress),
                    this.addEventListener("pointerdown", this.handlePointerdown);
            }
            updated(t) {
                super.updated(t),
                    t.has("href") && this.manageAnchor(),
                    t.has("label") && this.setAttribute("aria-label", this.label || ""),
                    t.has("active") &&
                    (this.active
                        ? (this.addEventListener(
                            "focusout",
                            this.handleRemoveActive
                        ),
                            this.addEventListener(
                                "pointerup",
                                this.handleRemoveActive
                            ),
                            this.addEventListener(
                                "pointerleave",
                                this.handleRemoveActive
                            ))
                        : (this.removeEventListener(
                            "focusout",
                            this.handleRemoveActive
                        ),
                            this.removeEventListener(
                                "pointerup",
                                this.handleRemoveActive
                            ),
                            this.removeEventListener(
                                "pointerleave",
                                this.handleRemoveActive
                            ))),
                    this.anchorElement &&
                    (this.anchorElement.addEventListener("focus", this.proxyFocus),
                        (this.anchorElement.tabIndex = -1));
            }
        }
        e([nt({ type: Boolean, reflect: !0 })], ne.prototype, "active", void 0),
            e([nt({ type: String })], ne.prototype, "type", void 0),
            e([at(".anchor")], ne.prototype, "anchorElement", void 0);
        var ce = a`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}::slotted([slot=icon]){max-height:100%}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host(.spectrum-ActionButton--staticBlack:not([quiet]):disabled){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-disabled,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):disabled[selected]){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-disabled-selected,transparent
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):disabled:not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-disabled,transparent
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled)){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-default,rgba(0,0,0,.4)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):hover){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-hover,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled)[active]){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-down,rgba(0,0,0,.7)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled).focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-key-focus,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-key-focus,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled).is-keyboardFocused){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-key-focus,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-default,transparent
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]):hover){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-hover,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected])[active]){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-down,rgba(0,0,0,.4)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]).focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-key-focus,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]):focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-key-focus,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]).is-keyboardFocused){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-key-focus,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack[quiet]:disabled){border-color:transparent}:host(.spectrum-ActionButton--staticBlack[quiet]:disabled:not([selected])){background-color:transparent}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled)){border-color:transparent}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected])){background-color:var(
--spectrum-alias-component-background-color-quiet-default,var(--spectrum-alias-background-color-transparent)
)}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]):hover){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected])[active]){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]).focus-visible){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]):focus-visible){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]).is-keyboardFocused){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack:disabled[selected]){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-disabled-selected,rgba(0,0,0,.1)
)}:host(.spectrum-ActionButton--staticBlack:disabled[selected]) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled[selected]) #label{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled[selected]) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled) #label{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled):hover){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)[active]){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled).focus-visible){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled):focus-visible){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled).is-keyboardFocused){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)) .spectrum-ActionButton-holdIcon{color:inherit}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)) #label{color:inherit}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)) ::slotted([slot=icon]){color:inherit}:host(.spectrum-ActionButton--staticBlack) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-ActionButton-static-black-color
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):hover) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):hover) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):hover) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])[active]) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])[active]) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])[active]) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).focus-visible) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):focus-visible) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).is-keyboardFocused) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).is-keyboardFocused) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])) #label{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack) #label{color:var(
--spectrum-ActionButton-static-black-color
)}:host(.spectrum-ActionButton--staticBlack) ::slotted([slot=icon]){color:var(
--spectrum-ActionButton-static-black-color
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):disabled){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-disabled,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):disabled[selected]){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-disabled-selected,transparent
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):disabled:not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-disabled,transparent
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled)){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-default,hsla(0,0%,100%,.4)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):hover){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-hover,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled)[active]){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-down,hsla(0,0%,100%,.7)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled).focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-key-focus,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-key-focus,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled).is-keyboardFocused){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-key-focus,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-default,transparent
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]):hover){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-hover,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected])[active]){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-down,hsla(0,0%,100%,.4)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]).focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-key-focus,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]):focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-key-focus,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]).is-keyboardFocused){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-key-focus,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite[quiet]:disabled){border-color:transparent}:host(.spectrum-ActionButton--staticWhite[quiet]:disabled:not([selected])){background-color:transparent}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled)){border-color:transparent}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected])){background-color:var(
--spectrum-alias-component-background-color-quiet-default,var(--spectrum-alias-background-color-transparent)
)}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]):hover){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected])[active]){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]).focus-visible){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]):focus-visible){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]).is-keyboardFocused){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite:disabled[selected]){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-disabled-selected,hsla(0,0%,100%,.1)
)}:host(.spectrum-ActionButton--staticWhite:disabled[selected]) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled[selected]) #label{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled[selected]) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled) #label{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled):hover){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)[active]){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled).focus-visible){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled):focus-visible){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled).is-keyboardFocused){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)) .spectrum-ActionButton-holdIcon{color:inherit}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)) #label{color:inherit}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)) ::slotted([slot=icon]){color:inherit}:host(.spectrum-ActionButton--staticWhite) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-ActionButton-static-white-color
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):hover) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):hover) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):hover) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])[active]) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])[active]) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])[active]) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).focus-visible) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):focus-visible) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).is-keyboardFocused) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).is-keyboardFocused) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])) #label{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite) #label{color:var(
--spectrum-ActionButton-static-white-color
)}:host(.spectrum-ActionButton--staticWhite) ::slotted([slot=icon]){color:var(
--spectrum-ActionButton-static-white-color
)}:host([size=s]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-s-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-s-texticon-padding-left,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-s-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-s-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-s-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-s-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-s-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-s-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-40)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-s-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-40)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-s-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-s-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-s-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-s-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-s-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-s-textonly-padding-right,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-s-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-s-icononly-padding-right,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-s-icononly-padding-left,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-global-dimension-size-300
)}:host([size=m]){--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-m-texticon-padding-left
);--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-m-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-m-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-m-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-m-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-m-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-m-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-m-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-m-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-m-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-m-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-m-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-m-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-m-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-m-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-m-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-m-icononly-padding-right,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-m-icononly-padding-left,var(--spectrum-global-dimension-size-85)
)}:host([size=l]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-l-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-l-texticon-padding-left,var(--spectrum-global-dimension-size-160)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-l-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-l-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-l-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-l-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-l-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-l-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-65)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-l-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-l-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-l-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-l-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-l-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-l-textonly-height,var(--spectrum-global-dimension-size-500)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-l-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-l-textonly-padding-right,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-l-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-l-icononly-padding-right,var(--spectrum-global-dimension-size-125)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-l-icononly-padding-left,var(--spectrum-global-dimension-size-125)
)}:host([size=xl]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-xl-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-xl-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-xl-texticon-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-xl-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-xl-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-xl-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-xl-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-xl-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-xl-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-75)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-xl-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-75)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-xl-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-xl-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-xl-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-xl-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-xl-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-xl-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-xl-textonly-padding-right,var(--spectrum-global-dimension-size-225)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-xl-textonly-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-xl-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-xl-icononly-padding-right,var(--spectrum-global-dimension-size-160)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-xl-icononly-padding-left,var(--spectrum-global-dimension-size-160)
)}:host{--spectrum-actionbutton-padding-left-adjusted:calc(var(--spectrum-actionbutton-texticon-padding-left) - var(--spectrum-actionbutton-texticon-border-size));--spectrum-actionbutton-textonly-padding-left-adjusted:calc(var(--spectrum-actionbutton-textonly-padding-left) - var(--spectrum-actionbutton-textonly-border-size));--spectrum-actionbutton-textonly-padding-right-adjusted:calc(var(--spectrum-actionbutton-textonly-padding-right) - var(--spectrum-actionbutton-textonly-border-size));--spectrum-actionbutton-icononly-padding-left-adjusted:calc(var(--spectrum-actionbutton-icononly-padding-left) - var(--spectrum-actionbutton-icononly-border-size));--spectrum-actionbutton-icononly-padding-right-adjusted:calc(var(--spectrum-actionbutton-icononly-padding-right) - var(--spectrum-actionbutton-icononly-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-actionbutton-textonly-padding-left-adjusted
);padding-right:var(--spectrum-actionbutton-textonly-padding-right-adjusted)}:host([dir=rtl]){padding-left:var(--spectrum-actionbutton-textonly-padding-right-adjusted);padding-right:var(
--spectrum-actionbutton-textonly-padding-left-adjusted
)}:host{border-radius:var(--spectrum-actionbutton-textonly-border-radius);border-width:var(--spectrum-actionbutton-textonly-border-size);color:inherit;font-size:var(--spectrum-actionbutton-textonly-text-size);font-weight:var(--spectrum-actionbutton-textonly-text-font-weight);height:var(--spectrum-actionbutton-textonly-height);line-height:var(--spectrum-actionbutton-textonly-text-line-height);min-width:var(--spectrum-actionbutton-textonly-min-width);position:relative}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-actionbutton-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-actionbutton-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}#hold-affordance+::slotted([slot=icon]),:host([dir]) slot[icon-only]::slotted([slot=icon]),:host([dir]) slot[icon-only] sp-icon{margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-icononly-padding-left-adjusted)));margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-right-adjusted) - var(--spectrum-actionbutton-icononly-padding-right-adjusted)))}#label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) #hold-affordance{right:var(
--spectrum-actionbutton-textonly-hold-icon-padding-right
)}:host([dir=rtl]) #hold-affordance{left:var(
--spectrum-actionbutton-textonly-hold-icon-padding-right
)}:host([dir=rtl]) #hold-affordance{transform:matrix(-1,0,0,1,0,0)}#hold-affordance{bottom:var(--spectrum-actionbutton-textonly-hold-icon-padding-bottom);position:absolute}:host([quiet]){border-radius:var(--spectrum-actionbutton-quiet-textonly-border-radius);border-width:var(
--spectrum-actionbutton-quiet-textonly-border-size
);font-size:var(--spectrum-actionbutton-quiet-textonly-text-size);font-weight:var(--spectrum-actionbutton-quiet-textonly-text-font-weight)}:host{--spectrum-actionbutton-focus-ring-gap:var(
--spectrum-alias-component-focusring-gap,var(--spectrum-global-dimension-static-size-0)
);--spectrum-actionbutton-focus-ring-size:var(
--spectrum-alias-component-focusring-size,var(--spectrum-global-dimension-static-size-10)
);--spectrum-actionbutton-focus-ring-color:var(
--spectrum-actionbutton-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host:after{border-radius:calc(var(--spectrum-actionbutton-quiet-textonly-border-radius) + var(--spectrum-actionbutton-focus-ring-gap));bottom:0;content:"";left:0;margin:calc((var(--spectrum-actionbutton-focus-ring-gap) + var(--spectrum-actionbutton-textonly-border-size))*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host(.focus-visible){box-shadow:none!important}:host(:focus-visible){box-shadow:none!important}:host(.focus-visible):after{box-shadow:0 0 0 var(--spectrum-actionbutton-focus-ring-size) var(--spectrum-actionbutton-focus-ring-color)}:host(:focus-visible):after{box-shadow:0 0 0 var(--spectrum-actionbutton-focus-ring-size) var(--spectrum-actionbutton-focus-ring-color)}.spectrum-ActionButton--staticWhite{--spectrum-actionbutton-focus-ring-color:var(
--spectrum-global-color-static-white,#fff
)}.spectrum-ActionButton--staticBlack{--spectrum-actionbutton-focus-ring-color:var(
--spectrum-global-color-static-black,#000
)}.spectrum-ActionButton--staticBlack,.spectrum-ActionButton--staticWhite,:host([emphasized][selected]){--spectrum-actionbutton-focus-ring-gap:var(
--spectrum-alias-component-focusring-gap-emphasized,var(--spectrum-global-dimension-static-size-25)
);--spectrum-actionbutton-focus-ring-size:var(
--spectrum-alias-component-focusring-size-emphasized,var(--spectrum-global-dimension-static-size-25)
)}:host{background-color:var(
--spectrum-actionbutton-m-textonly-background-color,var(--spectrum-alias-component-background-color-default)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color,var(--spectrum-alias-component-border-color-default)
);color:var(
--spectrum-actionbutton-m-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-hover,var(--spectrum-alias-component-background-color-hover)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-hover,var(--spectrum-alias-component-border-color-hover)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host(:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host(:hover) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host(.focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(.focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host(:focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host(.focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(.focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(:focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([active]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-down,var(--spectrum-alias-component-background-color-down)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-down,var(--spectrum-alias-component-border-color-down)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([active]) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host(:disabled),:host([disabled]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host(:disabled) ::slotted([slot=icon]),:host([disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host(:disabled) #hold-affordance,:host([disabled]) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([selected]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected,var(--spectrum-alias-component-background-color-selected-default)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected,var(--spectrum-alias-component-border-color-selected-default)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected,var(--spectrum-alias-component-text-color-selected-default)
)}:host([selected]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-key-focus,var(--spectrum-alias-component-background-color-selected-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-key-focus,var(--spectrum-alias-component-background-color-selected-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([selected].focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([selected]:focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([selected].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:hover){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-hover,var(--spectrum-alias-component-background-color-selected-hover)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-selected-hover)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-selected-hover)
)}:host([selected]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-hover,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected][active]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-down,var(--spectrum-alias-component-background-color-selected-down)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-selected-down)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-selected-down)
)}:host([selected][active]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-down,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:disabled),:host([selected][disabled]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([selected]:disabled) ::slotted([slot=icon]),:host([selected][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([emphasized][quiet][selected]),:host([emphasized][selected]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected,var(
--spectrum-alias-component-background-color-emphasized-selected-default
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected,var(--spectrum-alias-component-border-color-emphasized-selected-default)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected,var(--spectrum-alias-component-text-color-emphasized-selected-default)
)}:host([emphasized][quiet][selected]) ::slotted([slot=icon]),:host([emphasized][selected]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected,var(--spectrum-alias-component-icon-color-emphasized-selected-default)
)}:host([emphasized][quiet][selected].focus-visible),:host([emphasized][selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-emphasized-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus,var(
--spectrum-alias-component-border-color-emphasized-selected-key-focus
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:focus-visible),:host([emphasized][selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-emphasized-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus,var(
--spectrum-alias-component-border-color-emphasized-selected-key-focus
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected].focus-visible) ::slotted([slot=icon]),:host([emphasized][selected].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:focus-visible) ::slotted([slot=icon]),:host([emphasized][selected]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:hover),:host([emphasized][selected]:hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover,var(
--spectrum-alias-component-background-color-emphasized-selected-hover
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-emphasized-selected-hover)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([emphasized][quiet][selected]:hover) ::slotted([slot=icon]),:host([emphasized][selected]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-hover,var(--spectrum-alias-component-icon-color-emphasized-selected-hover)
)}:host([emphasized][quiet][selected][active]),:host([emphasized][selected][active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down,var(
--spectrum-alias-component-background-color-emphasized-selected-down
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-emphasized-selected-down)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-emphasized-selected-down)
)}:host([emphasized][quiet][selected][active]) ::slotted([slot=icon]),:host([emphasized][selected][active]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-down,var(--spectrum-alias-component-icon-color-emphasized-selected-down)
)}:host([emphasized][quiet][selected]:disabled),:host([emphasized][quiet][selected][disabled]),:host([emphasized][selected]:disabled),:host([emphasized][selected][disabled]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([emphasized][quiet][selected]:disabled) ::slotted([slot=icon]),:host([emphasized][quiet][selected][disabled]) ::slotted([slot=icon]),:host([emphasized][selected]:disabled) ::slotted([slot=icon]),:host([emphasized][selected][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([quiet]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color,var(--spectrum-alias-component-background-color-quiet-default)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color,var(--spectrum-alias-component-border-color-quiet-default)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([quiet]:hover){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-hover,var(--spectrum-alias-component-background-color-quiet-hover)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-hover,var(--spectrum-alias-component-border-color-quiet-hover)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([quiet].focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([quiet]:focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([quiet][active]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-down,var(--spectrum-alias-component-background-color-quiet-down)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-down,var(--spectrum-alias-component-border-color-quiet-down)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([quiet]:disabled),:host([quiet][disabled]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-quiet-disabled)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-quiet-disabled)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([quiet][selected]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected,var(--spectrum-alias-component-background-color-selected-default)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected,var(--spectrum-alias-component-border-color-quiet-selected-default)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected,var(--spectrum-alias-component-text-color-selected-default)
)}:host([quiet][selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-quiet-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-quiet-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([quiet][selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-quiet-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-quiet-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([quiet][selected]:hover){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-hover,var(--spectrum-alias-component-background-color-quiet-selected-hover)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-quiet-selected-hover)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-selected-hover)
)}:host([quiet][selected][active]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-down,var(--spectrum-alias-component-background-color-quiet-selected-down)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-quiet-selected-down)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-selected-down)
)}:host([quiet][selected]:disabled),:host([quiet][selected][disabled]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-quiet-selected-disabled)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-quiet-disabled)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}.spectrum-ActionButton--staticBlack,.spectrum-ActionButton--staticWhite{--spectrum-global-color-static-black-rgb:0,0,0;--spectrum-global-color-static-white-rgb:255,255,255;--spectrum-ActionButton-static-black-color:var(
--spectrum-global-color-static-black,#000
);--spectrum-ActionButton-static-white-color:var(
--spectrum-global-color-static-white,#fff
)}:host([selected]) .spectrum-ActionButton--staticBlack,:host([selected]) .spectrum-ActionButton--staticWhite{color:inherit!important}@media (forced-colors:active){:host{--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-quiet-textonly-border-color:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-down:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-hover:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus:Highlight;--spectrum-actionbutton-m-quiet-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-texticon-icon-color:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-disabled:GrayText;--spectrum-actionbutton-m-texticon-icon-color-hover:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-selected:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-disabled:GrayText;--spectrum-actionbutton-m-texticon-icon-color-selected-down:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-hover:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-textonly-border-color:ButtonText;--spectrum-actionbutton-m-textonly-border-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-border-color-down:ButtonText;--spectrum-actionbutton-m-textonly-border-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-border-color-key-focus:Highlight;--spectrum-actionbutton-m-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-textonly-hold-icon-color:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-hold-icon-color-down:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-textonly-text-color:ButtonText;--spectrum-actionbutton-m-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-key-focus:HighlightText;forced-color-adjust:none}:host([quiet][emphasized]:not(:disabled,[disabled]):hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover,var(
--spectrum-alias-component-background-color-emphasized-selected-hover
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover,var(
--spectrum-alias-component-border-color-emphasized-selected-hover
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([quiet][emphasized]:not(:disabled,[disabled])[active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down,var(
--spectrum-alias-component-background-color-emphasized-selected-down
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down,var(
--spectrum-alias-component-border-color-emphasized-selected-down
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-emphasized-selected-down)
)}}:host{display:inline-flex;flex-direction:row}:host([disabled]){cursor:auto;pointer-events:none}:host([dir]){-webkit-appearance:none}::slotted([slot=icon]){flex-shrink:0}#button{bottom:0;left:0;position:absolute;right:0;top:0}#label{flex-grow:var(--spectrum-actionbutton-label-flex-grow);text-align:var(--spectrum-actionbutton-label-text-align)}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`,
            ae = a`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-CornerTriangle75{height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75,var(--spectrum-global-dimension-size-65)
);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75,var(--spectrum-global-dimension-size-65)
)}.spectrum-UIIcon-CornerTriangle100{height:var(--spectrum-alias-ui-icon-cornertriangle-size-100);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}.spectrum-UIIcon-CornerTriangle200{height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200,var(--spectrum-global-dimension-size-75)
);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200,var(--spectrum-global-dimension-size-75)
)}.spectrum-UIIcon-CornerTriangle300{height:var(--spectrum-alias-ui-icon-cornertriangle-size-300);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`;
        customElements.define(
            "sp-icon-corner-triangle300",
            class extends Rt {
                render() {
                    return (
                        Gt(N),
                        Kt`<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 7 7"
aria-hidden="true"
fill="currentColor"
>
<path
d="M6.683.67a.315.315 0 00-.223.093l-5.7 5.7a.316.316 0 00.224.54h5.7A.316.316 0 007 6.687V.986A.316.316 0 006.684.67z"
/>
</svg>`
                    );
                }
            }
        );
        const le = {
            s: "spectrum-UIIcon-CornerTriangle75",
            m: "spectrum-UIIcon-CornerTriangle100",
            l: "spectrum-UIIcon-CornerTriangle200",
            xl: "spectrum-UIIcon-CornerTriangle300"
        };
        let de;
        class ue extends Xt(ne) {
            constructor() {
                super(),
                    (this.emphasized = !1),
                    (this.holdAffordance = !1),
                    (this.quiet = !1),
                    (this.role = "button"),
                    (this.selected = !1),
                    (this.toggles = !1),
                    (this._value = ""),
                    (this.onClick = () => {
                        this.toggles &&
                            ((this.selected = !this.selected),
                                this.dispatchEvent(
                                    new Event("change", { cancelable: !0 })
                                ) || (this.selected = !this.selected));
                    }),
                    this.addEventListener("click", this.onClick),
                    this.addEventListener("pointerdown", this.onPointerdown);
            }
            static get styles() {
                return [ce, ae];
            }
            get value() {
                return this._value || this.itemText;
            }
            set value(t) {
                t !== this._value &&
                    ((this._value = t || ""),
                        this._value
                            ? this.setAttribute("value", this._value)
                            : this.removeAttribute("value"));
            }
            get itemText() {
                return (this.textContent || "").trim();
            }
            onPointerdown() {
                this.addEventListener("pointerup", this.onPointerup),
                    this.addEventListener("pointercancel", this.onPointerup),
                    (de = setTimeout(() => {
                        this.dispatchEvent(
                            new CustomEvent("longpress", {
                                bubbles: !0,
                                composed: !0,
                                detail: { source: "pointer" }
                            })
                        );
                    }, 300));
            }
            onPointerup() {
                clearTimeout(de),
                    this.removeEventListener("pointerup", this.onPointerup),
                    this.removeEventListener("pointercancel", this.onPointerup);
            }
            handleKeydown(t) {
                if (!this.holdAffordance) return super.handleKeydown(t);
                const { code: e, altKey: o } = t;
                ("Space" === e || (o && "ArrowDown" === e)) &&
                    (t.preventDefault(),
                        "ArrowDown" === e &&
                        (t.stopPropagation(), t.stopImmediatePropagation()),
                        this.addEventListener("keyup", this.handleKeyup),
                        (this.active = !0));
            }
            handleKeyup(t) {
                if (!this.holdAffordance) return super.handleKeyup(t);
                const { code: e, altKey: o } = t;
                ("Space" === e || (o && "ArrowDown" === e)) &&
                    (t.stopPropagation(),
                        this.dispatchEvent(
                            new CustomEvent("longpress", {
                                bubbles: !0,
                                composed: !0,
                                detail: { source: "keyboard" }
                            })
                        ),
                        (this.active = !1));
            }
            get buttonContent() {
                const t = super.buttonContent;
                return (
                    this.holdAffordance &&
                    t.unshift(N`
        <sp-icon-corner-triangle300
            id="hold-affordance"
            class="${le[this.size]}"
        ></sp-icon-corner-triangle300>
    `),
                    t
                );
            }
            updated(t) {
                super.updated(t);
                const e = "button" === this.role && (this.selected || this.toggles);
                (t.has("selected") || t.has("role")) &&
                    (e
                        ? this.setAttribute(
                            "aria-pressed",
                            this.selected ? "true" : "false"
                        )
                        : this.removeAttribute("aria-pressed"));
            }
        }
        function pe() {
            return (
                (t = /^iPhone/),
                "undefined" != typeof window &&
                null != window.navigator &&
                t.test(window.navigator.platform)
            );
            var t;
        }
        e([nt({ type: Boolean, reflect: !0 })], ue.prototype, "emphasized", void 0),
            e(
                [nt({ type: Boolean, reflect: !0, attribute: "hold-affordance" })],
                ue.prototype,
                "holdAffordance",
                void 0
            ),
            e([nt({ type: Boolean, reflect: !0 })], ue.prototype, "quiet", void 0),
            e([nt({ reflect: !0 })], ue.prototype, "role", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ue.prototype, "selected", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ue.prototype, "toggles", void 0),
            e([nt({ type: String })], ue.prototype, "value", null),
            customElements.define("sp-action-button", ue);
        const me = bt(
            class extends vt {
                constructor(t) {
                    if ((super(t), 3 !== t.type && 1 !== t.type && 4 !== t.type))
                        throw Error(
                            "The `live` directive is not allowed on child or event bindings"
                        );
                    if (!mt(t))
                        throw Error(
                            "`live` bindings can only contain a single expression"
                        );
                }
                render(t) {
                    return t;
                }
                update(t, [e]) {
                    if (e === D || e === F) return e;
                    const o = t.element,
                        i = t.name;
                    if (3 === t.type) {
                        if (e === o[i]) return D;
                    } else if (4 === t.type) {
                        if (!!e === o.hasAttribute(i)) return D;
                    } else if (1 === t.type && o.getAttribute(i) === e + "") return D;
                    return (
                        ((t, e = ht) => {
                            t._$AH = e;
                        })(t),
                        e
                    );
                }
            }
        );
        class he {
            constructor(t, { mode: e } = { mode: "internal" }) {
                (this.hadId = !1),
                    (this.mode = "internal"),
                    (this.handleSlotchange = ({ target: t }) => {
                        this.handleHelpText(t), this.handleNegativeHelpText(t);
                    }),
                    (this.host = t),
                    (this.instanceCount = he.instanceCount++),
                    (this.id = `sp-help-text-${this.instanceCount}`),
                    (this.mode = e);
            }
            get isInternal() {
                return "internal" === this.mode;
            }
            render(t) {
                return N`
    <div id=${Yt(this.isInternal ? this.id : void 0)}>
        <slot
            name=${t
                        ? "negative-help-text"
                        : `pass-through-help-text-${this.instanceCount}`
                    }
            @slotchange=${this.handleSlotchange}
        >
            <slot name="help-text"></slot>
        </slot>
    </div>
`;
            }
            addId() {
                const t = this.helpTextElement ? this.helpTextElement.id : this.id,
                    e = this.host.getAttribute("aria-describedby"),
                    o = e ? e.split(/\s+/) : [];
                (this.hadId = o.indexOf(t) > -1),
                    this.hadId ||
                    (o.push(t),
                        this.host.setAttribute("aria-describedby", o.join(" ")),
                        this.host.hasAttribute("tabindex") &&
                        (this.previousTabindex = parseFloat(
                            this.host.getAttribute("tabindex")
                        )),
                        (this.host.tabIndex = 0));
            }
            removeId() {
                const t = this.host.getAttribute("aria-describedby");
                let e = t ? t.split(/\s+/) : [];
                if (!this.hadId) {
                    const t = this.helpTextElement ? this.helpTextElement.id : this.id;
                    e = e.filter(e => e !== t);
                }
                e.length
                    ? this.host.setAttribute("aria-describedby", e.join(" "))
                    : this.host.removeAttribute("aria-describedby"),
                    this.helpTextElement ||
                    (this.previousTabindex
                        ? (this.host.tabIndex = this.previousTabindex)
                        : this.host.removeAttribute("tabindex"));
            }
            handleHelpText(t) {
                if (this.isInternal) return;
                this.helpTextElement &&
                    this.helpTextElement.id === this.id &&
                    this.helpTextElement.removeAttribute("id"),
                    this.removeId();
                const e = t.assignedElements()[0];
                (this.helpTextElement = e),
                    e && (e.id || (e.id = this.id), this.addId());
            }
            handleNegativeHelpText(t) {
                "negative-help-text" === t.name &&
                    t.assignedElements().forEach(t => (t.variant = "negative"));
            }
        }
        let be;
        (he.instanceCount = 0),
            customElements.define(
                "sp-icon-checkmark100",
                class extends Rt {
                    render() {
                        return (
                            Gt(N),
                            Kt`<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 10 10"
aria-hidden="true"
fill="currentColor"
>
<path
d="M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"
/>
</svg>`
                        );
                    }
                }
            );
        const ve = function (t, ...e) {
            return be ? be(t, ...e) : e.reduce((e, o, i) => e + o + t[i + 1], t[0]);
        },
            ge = ({
                width: t = 24,
                height: e = 24,
                hidden: o = !1,
                title: i = "Alert"
            } = {}) => ve`<svg
xmlns="http://www.w3.org/2000/svg"
height="${e}"
viewBox="0 0 36 36"
width="${t}"
aria-hidden="${o ? "true" : "false"}"
role="img"
fill="currentColor"
aria-label="${i}"
>
<path
d="M17.127 2.579L.4 32.512A1 1 0 001.272 34h33.456a1 1 0 00.872-1.488L18.873 2.579a1 1 0 00-1.746 0zM20 29.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h3a.5.5 0 01.5.5zm0-6a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5h3a.5.5 0 01.5.5z"
/>
</svg>`;
        customElements.define(
            "sp-icon-alert",
            class extends Rt {
                render() {
                    return (
                        (t => {
                            be = t;
                        })(N),
                        ge({ hidden: !this.label, title: this.label })
                    );
                }
            }
        );
        var fe = a`
:host{--spectrum-textfield-texticon-padding-left:var(
--spectrum-textfield-m-texticon-padding-left
);--spectrum-textfield-quiet-texticon-border-bottom-size:var(
--spectrum-textfield-m-quiet-texticon-border-bottom-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-quiet-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-border-radius:var(
--spectrum-textfield-m-quiet-texticon-border-radius,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-left:var(
--spectrum-textfield-m-quiet-texticon-padding-left,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-right:var(
--spectrum-textfield-m-quiet-texticon-padding-right,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-texticon-border-size:var(
--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-texticon-text-line-height:var(
--spectrum-textfield-m-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-textfield-texticon-text-size:var(
--spectrum-textfield-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-textfield-texticon-placeholder-text-font-style:var(
--spectrum-textfield-m-texticon-placeholder-text-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-textfield-texticon-placeholder-text-font-weight:var(
--spectrum-textfield-m-texticon-placeholder-text-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-textfield-texticon-success-icon-height:var(
--spectrum-textfield-m-texticon-success-icon-height,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-width:var(
--spectrum-textfield-m-texticon-success-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-invalid-icon-height:var(
--spectrum-textfield-m-texticon-invalid-icon-height,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-width:var(
--spectrum-textfield-m-texticon-invalid-icon-width,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-min-width:var(
--spectrum-textfield-m-texticon-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-textfield-texticon-border-radius:var(
--spectrum-textfield-m-texticon-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-textfield-texticon-padding-right:var(
--spectrum-textfield-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-height:var(
--spectrum-textfield-m-texticon-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textarea-text-padding-top:var(
--spectrum-textarea-m-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-textarea-text-padding-bottom:var(
--spectrum-textarea-m-text-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-textarea-padding-left:var(
--spectrum-textarea-m-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-padding-right:var(
--spectrum-textarea-m-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-height:var(
--spectrum-textarea-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textfield-texticon-padding-top:3px;--spectrum-textfield-texticon-padding-bottom:5px;--spectrum-textfield-texticon-text-font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);--spectrum-textfield-texticon-icon-gap:var(
--spectrum-global-dimension-size-65
);--spectrum-textfield-quiet-texticon-icon-gap:var(
--spectrum-global-dimension-size-75
);--spectrum-textarea-min-height:var(--spectrum-textarea-height);--spectrum-textarea-height-adjusted:auto;--spectrum-textarea-padding-top:var(--spectrum-textarea-text-padding-top);--spectrum-textarea-padding-bottom:var(
--spectrum-textarea-text-padding-bottom
)}#textfield{display:inline-flex;min-width:var(--spectrum-textfield-texticon-min-width);position:relative;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([quiet][multiline]) #textfield .input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:after{border-color:transparent;border-radius:calc(var(--spectrum-textfield-texticon-border-radius) + var(
--spectrum-textfield-m-texticon-focus-ring-gap,
var(--spectrum-alias-input-focusring-gap)
));bottom:0;content:"";left:0;margin:calc(var(
--spectrum-textfield-m-texticon-focus-ring-gap,
var(--spectrum-alias-input-focusring-gap)
)*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([quiet]) #textfield:after{border-radius:0}.input{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);height:var(--spectrum-textfield-texticon-height);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:none;overflow:visible;padding:var(--spectrum-textfield-texticon-padding-top) var(--spectrum-textfield-texticon-padding-right) var(--spectrum-textfield-texticon-padding-bottom) calc(var(--spectrum-textfield-texticon-padding-left) + 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}.input::placeholder{font-style:var(--spectrum-textfield-texticon-placeholder-text-font-style);font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
);opacity:1;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}.input:hover::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input:disabled{opacity:1;resize:none}.input:disabled::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input::-ms-clear{height:0;width:0}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}:host([dir=ltr][valid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-success-icon-margin-left)
))}:host([dir=rtl][valid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-success-icon-margin-left)
))}:host([dir=ltr][invalid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-invalid-icon-margin-left)
))}:host([dir=rtl][invalid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-invalid-icon-margin-left)
))}:host([multiline]) .input{height:var(
--spectrum-textarea-height-adjusted
);min-height:var(--spectrum-textarea-min-height);overflow:auto;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px)}:host([dir=ltr][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=rtl][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=ltr][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([dir=rtl][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([quiet]) .input{border-bottom-width:var(
--spectrum-textfield-quiet-texticon-border-bottom-size
);border-left-width:0;border-radius:var(
--spectrum-textfield-quiet-texticon-border-radius
);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}:host([dir=ltr][invalid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=rtl][invalid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=ltr][valid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}:host([dir=rtl][valid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}.icon{pointer-events:all;position:absolute}:host([dir=ltr][quiet]) .icon{padding-right:0}:host([dir=rtl][quiet]) .icon{padding-left:0}:host([dir=ltr][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([dir=rtl][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([invalid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/2 - var(--spectrum-textfield-texticon-invalid-icon-height)/2);height:var(--spectrum-textfield-texticon-invalid-icon-height);width:var(
--spectrum-textfield-texticon-invalid-icon-width
)}:host([dir=ltr][quiet][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([dir=rtl][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([valid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/2 - var(--spectrum-textfield-texticon-success-icon-height)/2);height:var(--spectrum-textfield-texticon-success-icon-height);width:var(
--spectrum-textfield-texticon-success-icon-width
)}:host([dir=ltr][quiet][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr]) .icon-workflow{left:var(
--spectrum-textfield-texticon-padding-left
)}:host([dir=rtl]) .icon-workflow{right:var(
--spectrum-textfield-texticon-padding-left
)}.icon-workflow{display:block;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);position:absolute;top:calc(var(--spectrum-textfield-texticon-height)/2 - var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
)/2);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr][quiet]) .icon-workflow{left:0}:host([dir=rtl][quiet]) .icon-workflow{right:0}:host([dir=ltr][quiet]) .icon-workflow~.input{padding-left:calc(var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=rtl][quiet]) .icon-workflow~.input{padding-right:calc(var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=ltr]) .icon-workflow+.input{padding-left:calc(var(--spectrum-textfield-texticon-padding-left) + var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-texticon-icon-gap))}:host([dir=rtl]) .icon-workflow+.input{padding-right:calc(var(--spectrum-textfield-texticon-padding-left) + var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-texticon-icon-gap))}:host([multiline]) .icon-workflow~.input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-hover,var(--spectrum-alias-input-border-color-hover)
);box-shadow:none}#textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}#textfield:hover .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#textfield:active .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}#textfield:active .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host([valid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-valid,var(--spectrum-semantic-positive-icon-color)
)}:host([invalid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) #textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-hover,var(--spectrum-alias-input-border-color-invalid-hover)
)}:host([disabled]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid-disabled,var(--spectrum-alias-background-color-transparent)
)}:host([disabled]) #textfield .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}.icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([focused]) #textfield:after{box-shadow:0 0 0 var(
--spectrum-textfield-m-texticon-focus-ring-border-width,var(--spectrum-alias-component-focusring-size)
) var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([focused][quiet]) #textfield .input{box-shadow:none}:host([focused][quiet]) #textfield:after{border-bottom:2px solid var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);bottom:calc(-1*var(--spectrum-alias-input-quiet-focusline-gap, var(--spectrum-global-dimension-static-size-10)));box-shadow:none;margin:0}.input{background-color:var(
--spectrum-textfield-m-texticon-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-textfield-m-texticon-border-color,var(--spectrum-alias-input-border-color-default)
);color:var(
--spectrum-textfield-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}.input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color,var(--spectrum-global-color-gray-600)
)}.input:focus,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}.input.focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}.input:focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}.input :disabled,:host([disabled]) #textfield .input,:host([disabled]) #textfield:hover .input{-webkit-text-fill-color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);background-color:var(
--spectrum-textfield-m-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
);color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}.input :disabled::placeholder,:host([disabled]) #textfield .input::placeholder,:host([disabled]) #textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([quiet]) .input{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid][quiet]) #textfield .input{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([disabled][quiet]) #textfield .input,:host([disabled][quiet]) #textfield:hover .input,:host([quiet]) .input :disabled{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host{display:inline-flex;flex-direction:column;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([multiline]){resize:both}#textfield{width:100%}#textfield,textarea{resize:inherit}:host([grows]) .input{height:100%;left:0;overflow:hidden;position:absolute;resize:none;top:0}:host([grows]) #sizer{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:none;overflow:visible;overflow-wrap:break-word;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}:host([grows][quiet]) #sizer{border-bottom-width:var(--spectrum-textfield-quiet-texticon-border-size);border-left-width:0;border-radius:var(--spectrum-textfield-quiet-texticon-border-radius);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}.icon,.icon-workflow{pointer-events:none}
`,
            xe = a`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Checkmark50{height:var(--spectrum-alias-ui-icon-checkmark-size-50);width:var(
--spectrum-alias-ui-icon-checkmark-size-50
)}.spectrum-UIIcon-Checkmark75{height:var(--spectrum-alias-ui-icon-checkmark-size-75);width:var(
--spectrum-alias-ui-icon-checkmark-size-75
)}.spectrum-UIIcon-Checkmark100{height:var(--spectrum-alias-ui-icon-checkmark-size-100);width:var(
--spectrum-alias-ui-icon-checkmark-size-100
)}.spectrum-UIIcon-Checkmark200{height:var(--spectrum-alias-ui-icon-checkmark-size-200);width:var(
--spectrum-alias-ui-icon-checkmark-size-200
)}.spectrum-UIIcon-Checkmark300{height:var(--spectrum-alias-ui-icon-checkmark-size-300);width:var(
--spectrum-alias-ui-icon-checkmark-size-300
)}.spectrum-UIIcon-Checkmark400{height:var(--spectrum-alias-ui-icon-checkmark-size-400);width:var(
--spectrum-alias-ui-icon-checkmark-size-400
)}.spectrum-UIIcon-Checkmark500{height:var(--spectrum-alias-ui-icon-checkmark-size-500);width:var(
--spectrum-alias-ui-icon-checkmark-size-500
)}.spectrum-UIIcon-Checkmark600{height:var(--spectrum-alias-ui-icon-checkmark-size-600);width:var(
--spectrum-alias-ui-icon-checkmark-size-600
)}
`;
        const ye = ["text", "url", "tel", "email", "password"];
        class ke extends (function (t, { mode: e } = { mode: "internal" }) {
            return class extends t {
                constructor() {
                    super(...arguments),
                        (this.helpTextManager = new he(this, { mode: e }));
                }
                get helpTextId() {
                    return this.helpTextManager.id;
                }
                renderHelpText(t) {
                    return this.helpTextManager.render(t);
                }
            };
        })(Qt) {
            constructor() {
                super(...arguments),
                    (this.allowedKeys = ""),
                    (this.focused = !1),
                    (this.invalid = !1),
                    (this.label = ""),
                    (this.placeholder = ""),
                    (this._type = "text"),
                    (this.grows = !1),
                    (this.maxlength = -1),
                    (this.minlength = -1),
                    (this.multiline = !1),
                    (this.readonly = !1),
                    (this.valid = !1),
                    (this._value = ""),
                    (this.quiet = !1),
                    (this.required = !1);
            }
            static get styles() {
                return [fe, xe];
            }
            get type() {
                var t;
                return null !== (t = ye.find(t => t === this._type)) && void 0 !== t
                    ? t
                    : "text";
            }
            set type(t) {
                const e = this._type;
                (this._type = t), this.requestUpdate("type", e);
            }
            set value(t) {
                if (t === this.value) return;
                const e = this._value;
                (this._value = t), this.requestUpdate("value", e);
            }
            get value() {
                return this._value;
            }
            get focusElement() {
                return this.inputElement;
            }
            onInput() {
                if (
                    this.allowedKeys &&
                    this.inputElement.value &&
                    !new RegExp(`^[${this.allowedKeys}]*$`, "u").test(
                        this.inputElement.value
                    )
                ) {
                    const t = this.inputElement.selectionStart - 1;
                    return (
                        (this.inputElement.value = this.value.toString()),
                        void this.inputElement.setSelectionRange(t, t)
                    );
                }
                this.value = this.inputElement.value;
            }
            onChange() {
                this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
            }
            onFocus() {
                this.focused = !0;
            }
            onBlur() {
                this.focused = !1;
            }
            renderStateIcons() {
                return this.invalid
                    ? N`
        <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
    `
                    : this.valid
                        ? N`
        <sp-icon-checkmark100
            id="valid"
            class="icon spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
    `
                        : F;
            }
            get displayValue() {
                return this.value.toString();
            }
            select() {
                this.inputElement.select();
            }
            get renderMultiline() {
                return N`
    ${this.grows && !this.quiet
                        ? N`
              <div id="sizer">${this.value}</div>
          `
                        : F
                    }
    <!-- @ts-ignore -->
    <textarea
        aria-describedby=${this.helpTextId}
        aria-label=${this.label || this.placeholder}
        aria-invalid=${Yt(this.invalid || void 0)}
        class="input"
        maxlength=${Yt(this.maxlength > -1 ? this.maxlength : void 0)}
        minlength=${Yt(this.minlength > -1 ? this.minlength : void 0)}
        pattern=${Yt(this.pattern)}
        placeholder=${this.placeholder}
        .value=${this.displayValue}
        @change=${this.onChange}
        @input=${this.onInput}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        autocomplete=${Yt(this.autocomplete)}
    ></textarea>
`;
            }
            get renderInput() {
                return N`
    <!-- @ts-ignore -->
    <input
        type=${this.type}
        aria-describedby=${this.helpTextId}
        aria-label=${this.label || this.placeholder}
        aria-invalid=${Yt(this.invalid || void 0)}
        class="input"
        maxlength=${Yt(this.maxlength > -1 ? this.maxlength : void 0)}
        minlength=${Yt(this.minlength > -1 ? this.minlength : void 0)}
        pattern=${Yt(this.pattern)}
        placeholder=${this.placeholder}
        .value=${me(this.displayValue)}
        @change=${this.onChange}
        @input=${this.onInput}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        autocomplete=${Yt(this.autocomplete)}
    />
`;
            }
            renderField() {
                return N`
    ${this.renderStateIcons()}
    ${this.multiline ? this.renderMultiline : this.renderInput}
`;
            }
            render() {
                return N`
    <div id="textfield">${this.renderField()}</div>
    ${this.renderHelpText(this.invalid)}
`;
            }
            updated(t) {
                (t.has("value") || (t.has("required") && this.required)) &&
                    this.checkValidity();
            }
            checkValidity() {
                let t = this.inputElement.checkValidity();
                return (
                    (this.required || (this.value && this.pattern)) &&
                    ((this.disabled || this.multiline) &&
                        this.pattern &&
                        (t = new RegExp(`^${this.pattern}$`, "u").test(
                            this.value.toString()
                        )),
                        void 0 !== this.minlength &&
                        (t = t && this.value.toString().length > this.minlength),
                        (this.valid = t),
                        (this.invalid = !t)),
                    t
                );
            }
        }
        e([nt({ attribute: "allowed-keys" })], ke.prototype, "allowedKeys", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "focused", void 0),
            e([at(".input")], ke.prototype, "inputElement", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "invalid", void 0),
            e([nt()], ke.prototype, "label", void 0),
            e([nt()], ke.prototype, "placeholder", void 0),
            e([nt({ attribute: "type", reflect: !0 })], ke.prototype, "_type", void 0),
            e([nt({ state: !0 })], ke.prototype, "type", null),
            e([nt()], ke.prototype, "pattern", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "grows", void 0),
            e([nt({ type: Number })], ke.prototype, "maxlength", void 0),
            e([nt({ type: Number })], ke.prototype, "minlength", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "multiline", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "readonly", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "valid", void 0),
            e([nt({ type: String })], ke.prototype, "value", null),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "quiet", void 0),
            e([nt({ type: Boolean, reflect: !0 })], ke.prototype, "required", void 0),
            e(
                [nt({ type: String, reflect: !0 })],
                ke.prototype,
                "autocomplete",
                void 0
            );
        class we extends ke {
            constructor() {
                super(...arguments), (this._value = "");
            }
            set value(t) {
                if (t === this.value) return;
                const e = this._value;
                (this._value = t), this.requestUpdate("value", e);
            }
            get value() {
                return this._value;
            }
        }
        e([nt({ type: String })], we.prototype, "value", null);
        var ze = a`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronDown500{transform:rotate(90deg)}.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronLeft500{transform:rotate(180deg)}.spectrum-UIIcon-ChevronUp75,.spectrum-UIIcon-ChevronUp100,.spectrum-UIIcon-ChevronUp200,.spectrum-UIIcon-ChevronUp300,.spectrum-UIIcon-ChevronUp400,.spectrum-UIIcon-ChevronUp500{transform:rotate(270deg)}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronRight75,.spectrum-UIIcon-ChevronUp75{height:var(--spectrum-alias-ui-icon-chevron-size-75);width:var(
--spectrum-alias-ui-icon-chevron-size-75
)}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronRight100,.spectrum-UIIcon-ChevronUp100{height:var(--spectrum-alias-ui-icon-chevron-size-100);width:var(
--spectrum-alias-ui-icon-chevron-size-100
)}.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronRight200,.spectrum-UIIcon-ChevronUp200{height:var(--spectrum-alias-ui-icon-chevron-size-200);width:var(
--spectrum-alias-ui-icon-chevron-size-200
)}.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronRight300,.spectrum-UIIcon-ChevronUp300{height:var(--spectrum-alias-ui-icon-chevron-size-300);width:var(
--spectrum-alias-ui-icon-chevron-size-300
)}.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronRight400,.spectrum-UIIcon-ChevronUp400{height:var(--spectrum-alias-ui-icon-chevron-size-400);width:var(
--spectrum-alias-ui-icon-chevron-size-400
)}.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronRight500,.spectrum-UIIcon-ChevronUp500{height:var(--spectrum-alias-ui-icon-chevron-size-500);width:var(
--spectrum-alias-ui-icon-chevron-size-500
)}
`,
            Ae = a`
:host{--spectrum-stepper-width:var(
--spectrum-global-dimension-size-900
);--spectrum-stepper-border-size:var(
--spectrum-alias-border-size-thin,var(--spectrum-global-dimension-static-size-10)
);--spectrum-stepper-button-height:calc(var(
--spectrum-alias-single-line-height,
var(--spectrum-global-dimension-size-400)
)/2);--spectrum-stepper-button-width:calc(var(--spectrum-global-dimension-size-300) - var(--spectrum-stepper-border-size));--spectrum-stepper-button-padding:calc(var(--spectrum-global-dimension-size-150)/2);--spectrum-stepper-border-radius-reset:0;--spectrum-stepper-border-size-reset:0;--spectrum-stepper-icon-nudge-top:var(--spectrum-global-dimension-size-10);--spectrum-stepper-icon-nudge:var(--spectrum-global-dimension-size-25);--spectrum-stepper-quiet-width:var(--spectrum-global-dimension-size-600);--spectrum-stepper-button-offset:calc(var(--spectrum-stepper-button-width)/2 - var(--spectrum-alias-ui-icon-chevron-size-75)/2);--spectrum-stepper-quiet-button-width:calc(var(--spectrum-stepper-button-width) - var(--spectrum-stepper-button-offset))}#textfield{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
);display:inline-flex;flex-direction:row;flex-wrap:nowrap;line-height:0;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;width:var(--spectrum-stepper-width)}#textfield:before{content:""}:host([dir=ltr]) .buttons{border-top-left-radius:0}:host([dir=rtl]) .buttons{border-top-right-radius:0}:host([dir=ltr]) .buttons{border-top-right-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]) .buttons{border-top-left-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .buttons{border-bottom-right-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=rtl]) .buttons{border-bottom-left-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .buttons{border-bottom-left-radius:0}:host([dir=rtl]) .buttons{border-bottom-right-radius:0}.buttons{display:block;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{padding-left:var(
--spectrum-stepper-button-padding
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{padding-right:var(
--spectrum-stepper-button-padding
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{padding-right:var(
--spectrum-stepper-button-padding
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{padding-left:var(
--spectrum-stepper-button-padding
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{border-left-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{border-right-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{border-top-left-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{border-top-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=ltr]) .stepDown,:host([dir=ltr]) .stepUp{border-bottom-left-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepDown,:host([dir=rtl]) .stepUp{border-bottom-right-radius:var(
--spectrum-stepper-border-radius-reset
)}.stepDown,.stepUp{border-width:var(--spectrum-stepper-border-size);box-sizing:border-box;display:flex;height:var(--spectrum-stepper-button-height);margin:0!important;min-width:0;position:relative;width:var(--spectrum-stepper-button-width)}.stepDown .stepper-icon,.stepUp .stepper-icon{margin:0!important;opacity:1}:host([dir=ltr]) .stepUp{border-bottom-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepUp{border-bottom-left-radius:var(
--spectrum-stepper-border-radius-reset
)}.stepUp{border-bottom:none;padding-top:var(--spectrum-stepper-icon-nudge-top)}:host([dir=ltr]) .stepDown{border-top-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .stepDown{border-top-left-radius:var(
--spectrum-stepper-border-radius-reset
)}.stepDown{padding-bottom:var(
--spectrum-stepper-icon-nudge
)}.textfield{flex:1;width:auto}:host([dir=ltr]) .input{border-top-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .input{border-top-left-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=ltr]) .input{border-bottom-right-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=rtl]) .input{border-bottom-left-radius:var(
--spectrum-stepper-border-radius-reset
)}.input,.textfield{min-width:0}:host([quiet]) #textfield{border-radius:var(
--spectrum-stepper-border-radius-reset
);width:var(--spectrum-stepper-quiet-width)}:host([quiet]) .buttons{border-radius:var(
--spectrum-stepper-border-radius-reset
)}:host([dir=ltr][quiet]) .stepDown,:host([dir=ltr][quiet]) .stepUp{border-right-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=rtl][quiet]) .stepDown,:host([dir=rtl][quiet]) .stepUp{border-left-width:var(
--spectrum-stepper-border-size-reset
)}:host([dir=ltr][quiet]) .stepDown,:host([dir=ltr][quiet]) .stepUp{border-left:none}:host([dir=rtl][quiet]) .stepDown,:host([dir=rtl][quiet]) .stepUp{border-right:none}:host([dir=ltr][quiet]) .stepDown,:host([dir=ltr][quiet]) .stepUp{padding-right:0}:host([dir=rtl][quiet]) .stepDown,:host([dir=rtl][quiet]) .stepUp{padding-left:0}:host([quiet]) .stepDown,:host([quiet]) .stepUp{border-radius:var(--spectrum-stepper-border-radius-reset);border-top:none;justify-content:flex-end;min-width:0;width:var(
--spectrum-stepper-quiet-button-width
)}:host([dir=ltr][quiet]) .stepDown:after,:host([dir=ltr][quiet]) .stepUp:after{right:calc(var(--spectrum-stepper-button-offset)*-1)}:host([dir=rtl][quiet]) .stepDown:after,:host([dir=rtl][quiet]) .stepUp:after{left:calc(var(--spectrum-stepper-button-offset)*-1)}:host([quiet]) .stepDown:after,:host([quiet]) .stepUp:after{content:"";height:100%;position:absolute;width:var(--spectrum-stepper-button-offset)}:host(:not([disabled]):not([invalid]):not([focused]):not([keyboard-focused])) #textfield:hover .input,:host(:not([disabled]):not([invalid]):not([focused]):not([keyboard-focused])) #textfield:hover .stepDown,:host(:not([disabled]):not([invalid]):not([focused]):not([keyboard-focused])) #textfield:hover .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-hover,var(--spectrum-alias-input-border-color-hover)
)}:host([focused]) #textfield{border-color:var(
--spectrum-textfield-m-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused]) #textfield .stepDown,:host([focused]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
);box-shadow:none}:host([focused][invalid]) #textfield{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .stepDown,:host([focused][invalid]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([keyboard-focused]) #textfield{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused]) #textfield .input,:host([keyboard-focused]) #textfield .stepDown,:host([keyboard-focused]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([keyboard-focused][invalid]) #textfield{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([keyboard-focused][invalid]) #textfield .stepDown,:host([keyboard-focused][invalid]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([keyboard-focused][invalid]) #textfield .buttons{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([invalid]) #textfield .stepDown,:host([invalid]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([invalid][keyboard-focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([invalid][keyboard-focused]) #textfield .buttons{box-shadow:0 0 0 1px var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([disabled]) #textfield .stepDown,:host([disabled]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
)}.stepDown,.stepUp{border-color:var(
--spectrum-textfield-m-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}.stepDown:disabled,.stepUp:disabled{border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
)}:host([quiet][disabled]) #textfield .stepDown,:host([quiet][disabled]) #textfield .stepUp{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host([quiet]) .stepDown,:host([quiet]) .stepUp{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}:host([quiet]) .stepDown:disabled,:host([quiet]) .stepUp:disabled{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host([quiet]) .input{box-shadow:none}:host([quiet][invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][invalid]) #textfield .stepDown{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][focused]) #textfield,:host([quiet][keyboard-focused]) #textfield{box-shadow:none}:host([quiet][focused]) #textfield .buttons,:host([quiet][focused]) #textfield .input,:host([quiet][keyboard-focused]) #textfield .buttons,:host([quiet][keyboard-focused]) #textfield .input{box-shadow:0 1px 0 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([quiet][focused]) #textfield .stepDown,:host([quiet][keyboard-focused]) #textfield .stepDown{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([quiet][focused][invalid]) #textfield,:host([quiet][keyboard-focused][invalid]) #textfield{box-shadow:none}:host([quiet][focused][invalid]) #textfield .buttons,:host([quiet][focused][invalid]) #textfield .input,:host([quiet][keyboard-focused][invalid]) #textfield .buttons,:host([quiet][keyboard-focused][invalid]) #textfield .input{box-shadow:0 1px 0 0 var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][focused][invalid]) #textfield .input,:host([quiet][keyboard-focused][invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([quiet][focused][invalid]) #textfield .stepDown,:host([quiet][keyboard-focused][invalid]) #textfield .stepDown{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host{width:var(--spectrum-stepper-width)}#textfield{width:100%}sp-field-button{--spectrum-dropdown-height:100%;--spectrum-dropdown-padding-x:0}.input{font-feature-settings:"tnum";font-variant-numeric:tabular-nums}:host([readonly]) .buttons{pointer-events:none}:host([hide-stepper]:not([quiet])) .input{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][invalid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][invalid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][valid]:not([hide-stepper])) .icon{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][valid]:not([hide-stepper])) .icon{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet][invalid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][invalid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr][quiet][valid]:not([hide-stepper])) .icon{right:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet][valid]:not([hide-stepper])) .icon{left:var(--spectrum-stepper-button-width)}:host([dir=ltr]:not([hide-stepper])) .icon-workflow{left:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl]:not([hide-stepper])) .icon-workflow{right:calc(var(--spectrum-stepper-button-width) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=ltr][quiet]:not([hide-stepper])) .icon-workflow{left:var(--spectrum-stepper-button-width)}:host([dir=rtl][quiet]:not([hide-stepper])) .icon-workflow{right:var(--spectrum-stepper-button-width)}
`;
        class qe extends ke {
            constructor() {
                super(...arguments),
                    (this.focused = !1),
                    (this._forcedUnit = ""),
                    (this.formatOptions = {}),
                    (this.hideStepper = !1),
                    (this.indeterminate = !1),
                    (this.keyboardFocused = !1),
                    (this.resolvedLanguage =
                        document.documentElement.lang || navigator.language),
                    (this.stepperActive = !1),
                    (this.stepModifier = 10),
                    (this._value = NaN),
                    (this._trackingValue = ""),
                    (this.changeCount = 0),
                    (this.wasIndeterminate = !1);
            }
            static get styles() {
                return [...super.styles, Ae, ze];
            }
            set value(t) {
                if (t === this.value) return;
                const e = this._value;
                (this._value = t), this.requestUpdate("value", e);
            }
            get value() {
                return this._value;
            }
            get inputValue() {
                return this.indeterminate
                    ? this.formattedValue
                    : this.inputElement.value;
            }
            get valueAsString() {
                return this._value.toString();
            }
            set valueAsString(t) {
                this.value = this.numberParser.parse(t);
            }
            get formattedValue() {
                return isNaN(this.value)
                    ? ""
                    : this.numberFormatter.format(this.value) +
                    (this.focused ? "" : this._forcedUnit);
            }
            convertValueToNumber(t) {
                return this.numberParser.parse(t);
            }
            get _step() {
                var t;
                return void 0 !== this.step
                    ? this.step
                    : "percent" ===
                        (null === (t = this.formatOptions) || void 0 === t
                            ? void 0
                            : t.style)
                        ? 0.01
                        : 1;
            }
            handlePointerdown(t) {
                if (0 !== t.button) return void t.preventDefault();
                (this.stepperActive = !0), this.buttons.setPointerCapture(t.pointerId);
                const e = this.buttons.children[0].getBoundingClientRect(),
                    o = this.buttons.children[1].getBoundingClientRect();
                (this.findChange = t => {
                    t.clientX >= e.x &&
                        t.clientY >= e.y &&
                        t.clientX <= e.x + e.width &&
                        t.clientY <= e.y + e.height
                        ? (this.change = t =>
                            this.increment(t.shiftKey ? this.stepModifier : 1))
                        : t.clientX >= o.x &&
                        t.clientY >= o.y &&
                        t.clientX <= o.x + o.width &&
                        t.clientY <= o.y + o.height &&
                        (this.change = t =>
                            this.decrement(t.shiftKey ? this.stepModifier : 1));
                }),
                    this.findChange(t),
                    this.startChange(t);
            }
            startChange(t) {
                (this.changeCount = 0),
                    this.doChange(t),
                    (this.safty = setTimeout(() => {
                        this.doNextChange(t);
                    }, 400));
            }
            doChange(t) {
                this.change(t);
            }
            handlePointermove(t) {
                this.findChange(t);
            }
            handlePointerup(t) {
                this.buttons.releasePointerCapture(t.pointerId),
                    cancelAnimationFrame(this.nextChange),
                    clearTimeout(this.safty),
                    this.dispatchEvent(
                        new Event("change", { bubbles: !0, composed: !0 })
                    ),
                    (this.stepperActive = !1);
            }
            doNextChange(t) {
                return (
                    (this.changeCount += 1),
                    this.changeCount % 5 == 0 && this.doChange(t),
                    requestAnimationFrame(() => {
                        this.nextChange = this.doNextChange(t);
                    })
                );
            }
            stepBy(t) {
                if (this.disabled || this.readonly) return;
                const e = void 0 !== this.min ? this.min : 0;
                let o = this.value;
                (o += t * this._step),
                    isNaN(this.value) ? (this.value = e) : (this.value = o),
                    this.dispatchEvent(
                        new Event("input", { bubbles: !0, composed: !0 })
                    ),
                    (this.indeterminate = !1),
                    this.focus();
            }
            increment(t = 1) {
                this.stepBy(1 * t);
            }
            decrement(t = 1) {
                this.stepBy(-1 * t);
            }
            handleKeydown(t) {
                switch (t.code) {
                    case "ArrowUp":
                        t.preventDefault(),
                            this.increment(t.shiftKey ? this.stepModifier : 1),
                            this.dispatchEvent(
                                new Event("change", { bubbles: !0, composed: !0 })
                            );
                        break;
                    case "ArrowDown":
                        t.preventDefault(),
                            this.decrement(t.shiftKey ? this.stepModifier : 1),
                            this.dispatchEvent(
                                new Event("change", { bubbles: !0, composed: !0 })
                            );
                }
            }
            onScroll(t) {
                t.preventDefault();
                const e = t.shiftKey
                    ? t.deltaX / Math.abs(t.deltaX)
                    : t.deltaY / Math.abs(t.deltaY);
                0 === e ||
                    isNaN(e) ||
                    this.stepBy(e * (t.shiftKey ? this.stepModifier : 1));
            }
            onFocus() {
                super.onFocus(),
                    (this._trackingValue = this.inputValue),
                    (this.keyboardFocused = !0),
                    this.addEventListener("wheel", this.onScroll);
            }
            onBlur() {
                super.onBlur(),
                    (this.keyboardFocused = !1),
                    this.removeEventListener("wheel", this.onScroll);
            }
            handleFocusin() {
                (this.focused = !0), (this.keyboardFocused = !0);
            }
            handleFocusout() {
                (this.focused = !1), (this.keyboardFocused = !1);
            }
            onChange() {
                const t = this.convertValueToNumber(this.inputValue);
                this.wasIndeterminate &&
                    ((this.wasIndeterminate = !1),
                        (this.indeterminateValue = void 0),
                        isNaN(t))
                    ? (this.indeterminate = !0)
                    : ((this.value = t), super.onChange());
            }
            onInput() {
                this.indeterminate &&
                    ((this.wasIndeterminate = !0),
                        (this.indeterminateValue = this.value),
                        (this.inputElement.value = this.inputElement.value.replace(
                            "-",
                            ""
                        )));
                const { value: t, selectionStart: e } = this.inputElement;
                if (this.numberParser.isValidPartialNumber(t)) {
                    const e = this.convertValueToNumber(t);
                    return (
                        !t && this.indeterminateValue
                            ? ((this.indeterminate = !0),
                                (this._value = this.indeterminateValue))
                            : ((this.indeterminate = !1),
                                (this._value = this.validateInput(e))),
                        void (this._trackingValue = t)
                    );
                }
                const o = t.length,
                    i = (e || o) - (o - this._trackingValue.length);
                (this.inputElement.value = this.indeterminate
                    ? "-"
                    : this._trackingValue),
                    this.inputElement.setSelectionRange(i, i);
            }
            validateInput(t) {
                if (
                    (void 0 !== this.min && (t = Math.max(this.min, t)),
                        void 0 !== this.max && (t = Math.min(this.max, t)),
                        this.step)
                ) {
                    const e = (t - (void 0 !== this.min ? this.min : 0)) % this.step;
                    if (
                        (0 !== e &&
                            (1 === Math.round(e / this.step)
                                ? (t += this.step - e)
                                : (t -= e)),
                            void 0 !== this.max)
                    )
                        for (; t > this.max;) t -= this.step;
                }
                return t;
            }
            get displayValue() {
                const t = this.focused ? "" : "-";
                return this.indeterminate ? t : this.formattedValue;
            }
            clearNumberFormatterCache() {
                (this._numberFormatter = void 0), (this._numberParser = void 0);
            }
            get numberFormatter() {
                if (!this._numberFormatter || !this._numberFormatterFocused) {
                    const e = this.formatOptions,
                        { style: o, unit: i, unitDisplay: r } = e,
                        s = t(e, ["style", "unit", "unitDisplay"]);
                    "unit" !== o && (s.style = o),
                        (this._numberFormatterFocused = new Ct(
                            this.resolvedLanguage,
                            s
                        ));
                    try {
                        (this._numberFormatter = new Ct(
                            this.resolvedLanguage,
                            this.formatOptions
                        )),
                            (this._forcedUnit = ""),
                            this._numberFormatter.format(1);
                    } catch (t) {
                        "unit" === o && (this._forcedUnit = i),
                            (this._numberFormatter = this._numberFormatterFocused);
                    }
                }
                return this.focused
                    ? this._numberFormatterFocused
                    : this._numberFormatter;
            }
            get numberParser() {
                if (!this._numberParser || !this._numberParserFocused) {
                    const e = this.formatOptions,
                        { style: o, unit: i, unitDisplay: r } = e,
                        s = t(e, ["style", "unit", "unitDisplay"]);
                    "unit" !== o && (s.style = o),
                        (this._numberParserFocused = new St(this.resolvedLanguage, s));
                    try {
                        (this._numberParser = new St(
                            this.resolvedLanguage,
                            this.formatOptions
                        )),
                            (this._forcedUnit = ""),
                            this._numberParser.parse("0");
                    } catch (t) {
                        "unit" === o && (this._forcedUnit = i),
                            (this._numberParser = this._numberParserFocused);
                    }
                }
                return this.focused ? this._numberParserFocused : this._numberParser;
            }
            renderField() {
                return (
                    (this.autocomplete = "off"),
                    N`
    ${super.renderField()}
    ${this.hideStepper
                            ? N``
                            : N`
              <span
                  class="buttons"
                  @focusin=${this.handleFocusin}
                  @focusout=${this.handleFocusout}
                  ${qt({
                                start: ["pointerdown", this.handlePointerdown],
                                streamInside: [
                                    [
                                        "pointermove",
                                        "pointerenter",
                                        "pointerleave",
                                        "pointerover",
                                        "pointerout"
                                    ],
                                    this.handlePointermove
                                ],
                                end: [["pointerup", "pointercancel"], this.handlePointerup]
                            })}
              >
                  <sp-action-button
                      class="stepUp"
                      label="Increment"
                      tabindex="-1"
                      ?focused=${this.focused}
                      ?disabled=${this.disabled ||
                                this.readonly ||
                                (void 0 !== this.max && this.value === this.max)
                                }
                      ?quiet=${this.quiet}
                  >
                      <sp-icon-chevron75
                          slot="icon"
                          class="stepper-icon spectrum-UIIcon-ChevronUp75"
                      ></sp-icon-chevron75>
                  </sp-action-button>
                  <sp-action-button
                      class="stepDown"
                      label="Decrement"
                      tabindex="-1"
                      ?focused=${this.focused}
                      ?disabled=${this.disabled ||
                                this.readonly ||
                                (void 0 !== this.min && this.value === this.min)
                                }
                      ?quiet=${this.quiet}
                  >
                      <sp-icon-chevron75
                          slot="icon"
                          class="stepper-icon spectrum-UIIcon-ChevronDown75"
                      ></sp-icon-chevron75>
                  </sp-action-button>
              </span>
          `
                        }
`
                );
            }
            update(t) {
                (t.has("formatOptions") || t.has("resolvedLanguage")) &&
                    this.clearNumberFormatterCache(),
                    super.update(t);
            }
            firstUpdated(t) {
                super.firstUpdated(t),
                    (this.multiline = !1),
                    this.addEventListener("keydown", this.handleKeydown);
            }
            updated(t) {
                if (t.has("value") || t.has("max") || t.has("min") || t.has("min")) {
                    const t = this.numberParser.parse(
                        this.inputValue.replace(this._forcedUnit, "")
                    );
                    this.value = this.validateInput(t);
                }
                if (t.has("min") || t.has("formatOptions")) {
                    let t = "numeric";
                    const o = void 0 !== this.min && this.min < 0,
                        { maximumFractionDigits: i } = this.formatOptions,
                        r = i && i > 0;
                    pe()
                        ? o
                            ? (t = "text")
                            : r && (t = "decimal")
                        : ((e = /Android/),
                            "undefined" != typeof window &&
                            null != window.navigator &&
                            e.test(window.navigator.userAgent) &&
                            (o ? (t = "numeric") : r && (t = "decimal"))),
                        (this.inputElement.inputMode = t);
                }
                var e;
            }
            connectedCallback() {
                super.connectedCallback(), this.resolveLanguage();
            }
            disconnectedCallback() {
                this.resolveLanguage(), super.disconnectedCallback();
            }
            resolveLanguage() {
                const t = new CustomEvent("sp-language-context", {
                    bubbles: !0,
                    composed: !0,
                    detail: {
                        callback: t => {
                            this.resolvedLanguage = t;
                        }
                    },
                    cancelable: !0
                });
                this.dispatchEvent(t);
            }
        }
        e([at(".buttons")], qe.prototype, "buttons", void 0),
            e([nt({ type: Boolean, reflect: !0 })], qe.prototype, "focused", void 0),
            e(
                [nt({ type: Object, attribute: "format-options" })],
                qe.prototype,
                "formatOptions",
                void 0
            ),
            e(
                [nt({ type: Boolean, reflect: !0, attribute: "hide-stepper" })],
                qe.prototype,
                "hideStepper",
                void 0
            ),
            e(
                [nt({ type: Boolean, reflect: !0 })],
                qe.prototype,
                "indeterminate",
                void 0
            ),
            e(
                [nt({ type: Boolean, reflect: !0, attribute: "keyboard-focused" })],
                qe.prototype,
                "keyboardFocused",
                void 0
            ),
            e([nt({ type: Number })], qe.prototype, "max", void 0),
            e([nt({ type: Number })], qe.prototype, "min", void 0),
            e([nt({ attribute: !1 })], qe.prototype, "resolvedLanguage", void 0),
            e([nt({ type: Number })], qe.prototype, "step", void 0),
            e(
                [nt({ type: Number, reflect: !0, attribute: "step-modifier" })],
                qe.prototype,
                "stepModifier",
                void 0
            ),
            e([nt({ type: Number })], qe.prototype, "value", null),
            customElements.define("sp-number-field", qe),
            customElements.define(
                "sp-icon-asterisk100",
                class extends Rt {
                    render() {
                        return (
                            Gt(N),
                            Kt`<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 8 8"
aria-hidden="true"
fill="currentColor"
>
<path
d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 01.167-.036L3.5 3.148l.13-2.7a.1.1 0 01.081-.111.15.15 0 01.03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"
/>
</svg>`
                        );
                    }
                }
            );
        var Be = a`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(
--spectrum-alias-ui-icon-asterisk-size-200
)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-300
)}
`,
            $e = a`
:host([size=s]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-s-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-s-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-s-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-s-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-s-asterisk-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=m]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-m-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-m-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-m-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-m-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-m-asterisk-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=l]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-l-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-l-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-l-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-l-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-l-asterisk-gap,var(--spectrum-global-dimension-size-65)
)}:host([size=xl]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-xl-padding-top,var(--spectrum-global-dimension-size-115)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-xl-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-xl-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-xl-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-xl-asterisk-gap,var(--spectrum-global-dimension-size-65)
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;box-sizing:border-box;display:block;font-size:var(--spectrum-fieldlabel-text-size);font-weight:var(--spectrum-fieldlabel-text-font-weight);line-height:var(--spectrum-fieldlabel-text-line-height);padding-bottom:var(--spectrum-fieldlabel-padding-bottom);padding-left:0;padding-right:0;padding-top:var(--spectrum-fieldlabel-padding-top);vertical-align:top}:host([dir=ltr]) .required-icon{margin-left:var(
--spectrum-fieldlabel-asterisk-gap
);margin-right:0}:host([dir=rtl]) .required-icon{margin-left:0;margin-right:var(
--spectrum-fieldlabel-asterisk-gap
)}.required-icon{margin-bottom:0;margin-top:0}:host([dir=ltr][side-aligned=start]){padding-left:0;padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl][side-aligned=start]){padding-left:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
);padding-right:0}:host([side-aligned=start]){display:inline-block;padding-bottom:0;padding-top:var(
--spectrum-fieldlabel-m-side-padding-top,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][side-aligned=start]) .required-icon{margin-left:var(
--spectrum-fieldlabel-asterisk-gap
);margin-right:0}:host([dir=rtl][side-aligned=start]) .required-icon{margin-left:0;margin-right:var(
--spectrum-fieldlabel-asterisk-gap
)}:host([side-aligned=start]) .required-icon{margin-bottom:0;margin-top:var(
--spectrum-fieldlabel-m-side-asterisk-margin-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][side-aligned=end]){text-align:right}:host([dir=rtl][side-aligned=end]){text-align:left}:host([dir=ltr][side-aligned=end]){padding-left:0;padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl][side-aligned=end]){padding-left:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
);padding-right:0}:host([side-aligned=end]){display:inline-block;padding-bottom:0;padding-top:var(
--spectrum-fieldlabel-m-side-padding-top,var(--spectrum-global-dimension-size-100)
)}:host{color:var(
--spectrum-fieldlabel-m-text-color,var(--spectrum-alias-label-text-color)
)}:host([disabled]){color:var(
--spectrum-fieldlabel-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) .required-icon{color:var(
--spectrum-fieldlabel-m-asterisk-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.required-icon{color:var(
--spectrum-fieldlabel-m-asterisk-color,var(--spectrum-global-color-gray-600)
)}:host([side-aligned=start]) .required-icon{margin-top:0}
`;
        class Ee extends Xt(Mt) {
            constructor() {
                super(...arguments),
                    (this.disabled = !1),
                    (this.id = ""),
                    (this.for = ""),
                    (this.required = !1);
            }
            static get styles() {
                return [$e, Be];
            }
            handleClick(t) {
                if (!this.target || this.disabled || t.defaultPrevented) return;
                this.target.focus();
                const e = this.getRootNode(),
                    o = this.target,
                    i = o.getRootNode(),
                    r = i.host;
                i === e && o.forceFocusVisible
                    ? o.forceFocusVisible()
                    : r && r.forceFocusVisible && r.forceFocusVisible();
            }
            async manageFor() {
                if (!this.for) return;
                const t = this.getRootNode(),
                    e = t.querySelector(`#${this.for}`);
                return e
                    ? (e.localName.search("-") > 0 &&
                        (await customElements.whenDefined(e.localName)),
                        void 0 !== e.updateComplete && (await e.updateComplete),
                        (this.target = e.focusElement || e),
                        this.target &&
                        (this.target.getRootNode() === t
                            ? this.target.setAttribute("aria-labelledby", this.id)
                            : this.target.setAttribute("aria-label", this.labelText)),
                        Promise.resolve())
                    : void 0;
            }
            get labelText() {
                const t = this.slotEl.assignedNodes({ flatten: !0 });
                return t.length
                    ? t.map(t => (t.textContent || "").trim()).join(" ")
                    : "";
            }
            render() {
                return N`
    <label>
        <slot @slotchange=${this.manageFor}></slot>
        ${this.required
                        ? N`
                  <sp-icon-asterisk100
                      class="required-icon spectrum-UIIcon-Asterisk100"
                  ></sp-icon-asterisk100>
              `
                        : N``
                    }
    </label>
`;
            }
            firstUpdated(t) {
                super.firstUpdated(t),
                    this.hasAttribute("id") ||
                    this.setAttribute(
                        "id",
                        `${this.tagName.toLowerCase()}-${Ee.instanceCount++}`
                    ),
                    this.addEventListener("click", this.handleClick);
            }
            updated(t) {
                super.updated(t), (t.has("for") || t.has("id")) && this.manageFor();
            }
        }
        (Ee.instanceCount = 0),
            e([nt({ type: Boolean, reflect: !0 })], Ee.prototype, "disabled", void 0),
            e([nt({ type: String })], Ee.prototype, "id", void 0),
            e([nt({ type: String })], Ee.prototype, "for", void 0),
            e([nt({ type: Boolean, reflect: !0 })], Ee.prototype, "required", void 0),
            e([at("slot")], Ee.prototype, "slotEl", void 0),
            e(
                [nt({ type: String, reflect: !0, attribute: "side-aligned" })],
                Ee.prototype,
                "sideAligned",
                void 0
            ),
            customElements.define("sp-field-label", Ee),
            customElements.define("sp-textfield", we);
    })();
})();
//# sourceMappingURL=main.bundle.js.map