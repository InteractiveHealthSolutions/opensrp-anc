function getURLParameter(e) {
    return decodeURI((RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, null])[1])
}
var requirejs, require, define;
if (function(global) {
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n)) break
    }

    function mixin(e, t, n, i) {
        return t && eachProp(t, function(t, r) {
            (n || !hasProp(e, r)) && (i && "string" != typeof t ? (e[r] || (e[r] = {}), mixin(e[r], t, n, i)) : e[r] = t)
        }), e
    }

    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, n, i) {
        var r = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return r.requireType = e, r.requireModules = i, n && (r.originalError = n), r
    }

    function newContext(e) {
        function t(e) {
            var t, n;
            for (t = 0; e[t]; t += 1)
                if (n = e[t], "." === n) e.splice(t, 1), t -= 1;
                else if (".." === n) {
                if (1 === t && (".." === e[2] || ".." === e[0])) break;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function n(e, n, i) {
            var r, o, a, s, l, u, c, d, h, p, f, g = n && n.split("/"),
                m = g,
                v = T.map,
                y = v && v["*"];
            if (e && "." === e.charAt(0) && (n ? (m = getOwn(T.pkgs, n) ? g = [n] : g.slice(0, g.length - 1), e = m.concat(e.split("/")), t(e), o = getOwn(T.pkgs, r = e[0]), e = e.join("/"), o && e === r + "/" + o.main && (e = r)) : 0 === e.indexOf("./") && (e = e.substring(2))), i && v && (g || y)) {
                for (s = e.split("/"), l = s.length; l > 0; l -= 1) {
                    if (c = s.slice(0, l).join("/"), g)
                        for (u = g.length; u > 0; u -= 1)
                            if (a = getOwn(v, g.slice(0, u).join("/")), a && (a = getOwn(a, c))) {
                                d = a, h = l;
                                break
                            }
                    if (d) break;
                    !p && y && getOwn(y, c) && (p = getOwn(y, c), f = l)
                }!d && p && (d = p, h = f), d && (s.splice(0, h, d), e = s.join("/"))
            }
            return e
        }

        function i(e) {
            isBrowser && each(scripts(), function(t) {
                return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === w.contextName ? (t.parentNode.removeChild(t), !0) : void 0
            })
        }

        function r(e) {
            var t = getOwn(T.paths, e);
            return t && isArray(t) && t.length > 1 ? (t.shift(), w.require.undef(e), w.require([e]), !0) : void 0
        }

        function o(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function a(e, t, i, r) {
            var a, s, l, u, c = null,
                d = t ? t.name : null,
                h = e,
                p = !0,
                f = "";
            return e || (p = !1, e = "_@r" + (M += 1)), u = o(e), c = u[0], e = u[1], c && (c = n(c, d, r), s = getOwn(S, c)), e && (c ? f = s && s.normalize ? s.normalize(e, function(e) {
                return n(e, d, r)
            }) : n(e, d, r) : (f = n(e, d, r), u = o(f), c = u[0], f = u[1], i = !0, a = w.nameToUrl(f))), l = !c || s || i ? "" : "_unnormalized" + (A += 1), {
                prefix: c,
                name: f,
                parentMap: t,
                unnormalized: !!l,
                url: a,
                originalName: h,
                isDefine: p,
                id: (c ? c + "!" + f : f) + l
            }
        }

        function s(e) {
            var t = e.id,
                n = getOwn(k, t);
            return n || (n = k[t] = new w.Module(e)), n
        }

        function l(e, t, n) {
            var i = e.id,
                r = getOwn(k, i);
            !hasProp(S, i) || r && !r.defineEmitComplete ? (r = s(e), r.error && "error" === t ? n(r.error) : r.on(t, n)) : "defined" === t && n(S[i])
        }

        function u(e, t) {
            var n = e.requireModules,
                i = !1;
            t ? t(e) : (each(n, function(t) {
                var n = getOwn(k, t);
                n && (n.error = e, n.events.error && (i = !0, n.emit("error", e)))
            }), i || req.onError(e))
        }

        function c() {
            globalDefQueue.length && (apsp.apply(C, [C.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function d(e) {
            delete k[e], delete _[e]
        }

        function h(e, t, n) {
            var i = e.map.id;
            e.error ? e.emit("error", e.error) : (t[i] = !0, each(e.depMaps, function(i, r) {
                var o = i.id,
                    a = getOwn(k, o);
                !a || e.depMatched[r] || n[o] || (getOwn(t, o) ? (e.defineDep(r, S[o]), e.check()) : h(a, t, n))
            }), n[i] = !0)
        }

        function p() {
            var e, t, n, o, a = 1e3 * T.waitSeconds,
                s = a && w.startTime + a < (new Date).getTime(),
                l = [],
                c = [],
                d = !1,
                f = !0;
            if (!y) {
                if (y = !0, eachProp(_, function(n) {
                    if (e = n.map, t = e.id, n.enabled && (e.isDefine || c.push(n), !n.error))
                        if (!n.inited && s) r(t) ? (o = !0, d = !0) : (l.push(t), i(t));
                        else if (!n.inited && n.fetched && e.isDefine && (d = !0, !e.prefix)) return f = !1
                }), s && l.length) return n = makeError("timeout", "Load timeout for modules: " + l, null, l), n.contextName = w.contextName, u(n);
                f && each(c, function(e) {
                    h(e, {}, {})
                }), s && !o || !d || !isBrowser && !isWebWorker || E || (E = setTimeout(function() {
                    E = 0, p()
                }, 50)), y = !1
            }
        }

        function f(e) {
            hasProp(S, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2])
        }

        function g(e, t, n, i) {
            e.detachEvent && !isOpera ? i && e.detachEvent(i, t) : e.removeEventListener(n, t, !1)
        }

        function m(e) {
            var t = e.currentTarget || e.srcElement;
            return g(t, w.onScriptLoad, "load", "onreadystatechange"), g(t, w.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var e;
            for (c(); C.length;) {
                if (e = C.shift(), null === e[0]) return u(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                f(e)
            }
        }
        var y, b, w, x, E, T = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            k = {},
            _ = {},
            D = {},
            C = [],
            S = {},
            N = {},
            M = 1,
            A = 1;
        return x = {
            require: function(e) {
                return e.require ? e.require : e.require = w.makeRequire(e.map)
            },
            exports: function(e) {
                return e.usingExports = !0, e.map.isDefine ? e.exports ? e.exports : e.exports = S[e.map.id] = {} : void 0
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        var t, n = getOwn(T.pkgs, e.map.id);
                        return t = n ? getOwn(T.config, e.map.id + "/" + n.main) : getOwn(T.config, e.map.id), t || {}
                    },
                    exports: S[e.map.id]
                }
            }
        }, b = function(e) {
            this.events = getOwn(D, e.id) || {}, this.map = e, this.shim = getOwn(T.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function(e, t, n, i) {
                i = i || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = i.ignore, i.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, w.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void w.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var e = this.map.url;
                N[e] || (N[e] = !0, w.load(this.map.id, e))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var e, t, n = this.map.id,
                        i = this.depExports,
                        r = this.exports,
                        o = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(o)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        r = w.execCb(n, o, i, r)
                                    } catch (a) {
                                        e = a
                                    } else r = w.execCb(n, o, i, r);
                                    if (this.map.isDefine && (t = this.module, t && void 0 !== t.exports && t.exports !== this.exports ? r = t.exports : void 0 === r && this.usingExports && (r = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", u(this.error = e)
                                } else r = o;
                                this.exports = r, this.map.isDefine && !this.ignore && (S[n] = r, req.onResourceLoad && req.onResourceLoad(w, this.map, this.depMaps)), d(n), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    i = a(e.prefix);
                this.depMaps.push(i), l(i, "defined", bind(this, function(i) {
                    var r, o, c, h = this.map.name,
                        p = this.map.parentMap ? this.map.parentMap.name : null,
                        f = w.makeRequire(e.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (i.normalize && (h = i.normalize(h, function(e) {
                        return n(e, p, !0)
                    }) || ""), o = a(e.prefix + "!" + h, this.map.parentMap), l(o, "defined", bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), c = getOwn(k, o.id), void(c && (this.depMaps.push(o), this.events.error && c.on("error", bind(this, function(e) {
                        this.emit("error", e)
                    })), c.enable()))) : (r = bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), r.error = bind(this, function(e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(k, function(e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && d(e.map.id)
                        }), u(e)
                    }), r.fromText = bind(this, function(n, i) {
                        var o = e.name,
                            l = a(o),
                            c = useInteractive;
                        i && (n = i), c && (useInteractive = !1), s(l), hasProp(T.config, t) && (T.config[o] = T.config[t]);
                        try {
                            req.exec(n)
                        } catch (d) {
                            return u(makeError("fromtexteval", "fromText eval for " + t + " failed: " + d, d, [t]))
                        }
                        c && (useInteractive = !0), this.depMaps.push(l), w.completeLoad(o), f([o], r)
                    }), void i.load(e.name, f, r, T))
                })), w.enable(i, this), this.pluginMaps[i.id] = i
            },
            enable: function() {
                _[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                    var n, i, r;
                    if ("string" == typeof e) {
                        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, r = getOwn(x, e.id)) return void(this.depExports[t] = r(this));
                        this.depCount += 1, l(e, "defined", bind(this, function(e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && l(e, "error", bind(this, this.errback))
                    }
                    n = e.id, i = k[n], hasProp(x, n) || !i || i.enabled || w.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function(e) {
                    var t = getOwn(k, e.id);
                    t && !t.enabled && w.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, w = {
            config: T,
            contextName: e,
            registry: k,
            defined: S,
            urlFetched: N,
            defQueue: C,
            Module: b,
            makeModuleMap: a,
            nextTick: req.nextTick,
            onError: u,
            configure: function(e) {
                e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                var t = T.pkgs,
                    n = T.shim,
                    i = {
                        paths: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    i[t] ? "map" === t ? (T.map || (T.map = {}), mixin(T[t], e, !0, !0)) : mixin(T[t], e, !0) : T[t] = e
                }), e.shim && (eachProp(e.shim, function(e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = w.makeShimExports(e)), n[t] = e
                }), T.shim = n), e.packages && (each(e.packages, function(e) {
                    var n;
                    e = "string" == typeof e ? {
                        name: e
                    } : e, n = e.location, t[e.name] = {
                        name: e.name,
                        location: n || e.name,
                        main: (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    }
                }), T.pkgs = t), eachProp(k, function(e, t) {
                    e.inited || e.map.unnormalized || (e.map = a(t))
                }), (e.deps || e.callback) && w.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, r) {
                function o(n, i, l) {
                    var c, d, h;
                    return r.enableBuildCallback && i && isFunction(i) && (i.__requireJsBuild = !0), "string" == typeof n ? isFunction(i) ? u(makeError("requireargs", "Invalid require call"), l) : t && hasProp(x, n) ? x[n](k[t.id]) : req.get ? req.get(w, n, t, o) : (d = a(n, t, !1, !0), c = d.id, hasProp(S, c) ? S[c] : u(makeError("notloaded", 'Module name "' + c + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), w.nextTick(function() {
                        v(), h = s(a(null, t)), h.skipMap = r.skipMap, h.init(n, i, l, {
                            enabled: !0
                        }), p()
                    }), o)
                }
                return r = r || {}, mixin(o, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var i, r = e.lastIndexOf("."),
                            o = e.split("/")[0],
                            a = "." === o || ".." === o;
                        return -1 !== r && (!a || r > 1) && (i = e.substring(r, e.length), e = e.substring(0, r)), w.nameToUrl(n(e, t && t.id, !0), i, !0)
                    },
                    defined: function(e) {
                        return hasProp(S, a(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = a(e, t, !1, !0).id, hasProp(S, e) || hasProp(k, e)
                    }
                }), t || (o.undef = function(e) {
                    c();
                    var n = a(e, t, !0),
                        r = getOwn(k, e);
                    i(e), delete S[e], delete N[n.url], delete D[e], r && (r.events.defined && (D[e] = r.events), d(e))
                }), o
            },
            enable: function(e) {
                var t = getOwn(k, e.id);
                t && s(e).enable()
            },
            completeLoad: function(e) {
                var t, n, i, o = getOwn(T.shim, e) || {},
                    a = o.exports;
                for (c(); C.length;) {
                    if (n = C.shift(), null === n[0]) {
                        if (n[0] = e, t) break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    f(n)
                }
                if (i = getOwn(k, e), !t && !hasProp(S, e) && i && !i.inited) {
                    if (!(!T.enforceDefine || a && getGlobal(a))) return r(e) ? void 0 : u(makeError("nodefine", "No define call for " + e, null, [e]));
                    f([e, o.deps || [], o.exportsFn])
                }
                p()
            },
            nameToUrl: function(e, t, n) {
                var i, r, o, a, s, l, u, c, d;
                if (req.jsExtRegExp.test(e)) c = e + (t || "");
                else {
                    for (i = T.paths, r = T.pkgs, s = e.split("/"), l = s.length; l > 0; l -= 1) {
                        if (u = s.slice(0, l).join("/"), o = getOwn(r, u), d = getOwn(i, u)) {
                            isArray(d) && (d = d[0]), s.splice(0, l, d);
                            break
                        }
                        if (o) {
                            a = e === o.name ? o.location + "/" + o.main : o.location, s.splice(0, l, a);
                            break
                        }
                    }
                    c = s.join("/"), c += t || (/^data\:|\?/.test(c) || n ? "" : ".js"), c = ("/" === c.charAt(0) || c.match(/^[\w\+\.\-]+:/) ? "" : T.baseUrl) + c
                }
                return T.urlArgs ? c + ((-1 === c.indexOf("?") ? "?" : "&") + T.urlArgs) : c
            },
            load: function(e, t) {
                req.load(w, e, t)
            },
            execCb: function(e, t, n, i) {
                return t.apply(i, n)
            },
            onScriptLoad: function(e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = m(e);
                    w.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = m(e);
                return r(t.id) ? void 0 : u(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
            }
        }, w.require = w.makeRequire(), w
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
            return "interactive" === e.readyState ? interactiveScript = e : void 0
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.9",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(e, t, n, i) {
            var r, o, a = defContextName;
            return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = i) : e = []), o && o.context && (a = o.context), r = getOwn(contexts, a), r || (r = contexts[a] = req.s.newContext(a)), o && r.configure(o), r.require(e, t, n)
        }, req.config = function(e) {
            return req(e)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(e) {
            setTimeout(e, 4)
        } : function(e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
            req[e] = function() {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e) {
            var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return t.type = e.scriptType || "text/javascript", t.charset = "utf-8", t.async = !0, t
        }, req.load = function(e, t, n) {
            var i, r = e && e.config || {};
            if (isBrowser) return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), !i.attachEvent || i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
            if (isWebWorker) try {
                importScripts(n), e.completeLoad(t)
            } catch (o) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
            return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
        }), define = function(e, t, n) {
            var i, r;
            "string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
                t.push(n)
            }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (i = currentlyAddingScript || getInteractiveScript(), i && (e || (e = i.getAttribute("data-requiremodule")), r = contexts[i.getAttribute("data-requirecontext")])), (r ? r.defQueue : globalDefQueue).push([e, t, n])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this), define("../../lib/enketo-core/lib/require.js", function() {}), XPathJS = function() {
    var e, t, n, i, r, o, a, s, l, u, c, d, h, p, f, g, m, y = [],
        b = "http://www.w3.org/XML/1998/namespace",
        x = "http://www.w3.org/2000/xmlns/",
        E = "http://www.w3.org/1999/xhtml",
        T = function(e) {
            return e.ownerDocument
        },
        k = function(e) {
            var t = [],
                n = function(e, t) {
                    var n, i, r = [];
                    for (i = 0; i < e.length; i++) n = e.item(i), !1 !== arrayIndexOf(n.nodeType, t) && r.push(n);
                    return r
                };
            switch (e.nodeType) {
                case 1:
                    t = n(e.childNodes, supportedChildNodeTypes = [1, 3, 4, 7, 8]);
                    break;
                case 9:
                    t = n(e.childNodes, supportedChildNodeTypes = [1, 7, 8]);
                    break;
                case 2:
                case 3:
                case 4:
                case 7:
                case 8:
                case 13:
                    break;
                default:
                    throw new Error("Internal Error: nodeChildren - unsupported node type: " + e.nodeType)
            }
            return t
        },
        _ = function(e) {
            var t, n, i = [];
            for (t = k(e), n = 0; n < t.length; n++) i.push(t[n]), i.push.apply(i, _(t[n]));
            return i
        },
        D = function(e) {
            var t;
            switch (e.nodeType) {
                case 1:
                case 3:
                case 4:
                case 7:
                case 8:
                case 9:
                    return e.parentNode;
                case 2:
                    return e.ownerElement ? e.ownerElement : t = nodeAttributeSearch(e.ownerDocument, !0, function(t, n) {
                        return n === e ? !0 : void 0
                    });
                case 13:
                    return e.ownerElement;
                default:
                    throw new Error("Internal Error: nodeParent - node type not supported: " + e.type)
            }
        },
        C = function(e) {
            for (var t, n = []; t = D(e);) n.push(t), e = t;
            return n
        },
        S = function(e) {
            return M(e, "nextSibling")
        },
        N = function(e) {
            return M(e, "previousSibling")
        },
        M = function(e, t) {
            for (var n, i = []; n = e[t];) {
                switch (n.nodeType) {
                    case 1:
                    case 3:
                    case 4:
                    case 7:
                    case 8:
                    case 9:
                        i.push(n)
                }
                e = n
            }
            return i
        },
        A = function(e) {
            var t, n, i, r, o = [];
            for (t = C(e), t.unshift(e), n = 0; n < t.length; n++)
                for (i = S(t[n]), r = 0; r < i.length; r++) o.push(i[r]), o.push.apply(o, _(i[r]));
            return o
        },
        P = function(e) {
            var t, n, i, r, o = [];
            for (t = C(e), t.unshift(e), n = 0; n < t.length; n++)
                for (i = N(t[n]), r = 0; r < i.length; r++) o.push.apply(o, _(i[r]).reverse()), o.push(i[r]);
            return o
        },
        T = function(e) {
            switch (e.nodeType) {
                case 9:
                    return e;
                default:
                    return e.ownerDocument
            }
        };
    return nodeAttribute = function(e) {
        var t, n = [];
        if (1 === e.nodeType)
            for (t = 0; t < e.attributes.length; t++) e.attributes[t].specified && !1 === isNamespaceAttributeNode(e.attributes[t]) && n.push(e.attributes[t]);
        return n
    }, nodeNamespace = function(e, t) {
        var n, i, r, o = t || [];
        if (1 === e.nodeType) {
            if (e.ownerDocument.documentElement === e && "object" == typeof e.ownerDocument.namespaces)
                for (n = e.ownerDocument.namespaces.length - 1; n >= 0; n--) r = e.ownerDocument.namespaces.item(n), insertNamespaceIfNotDeclared.call(this, o, r.name, r.urn, e);
            for (n = e.attributes.length - 1; n >= 0; n--) e.attributes[n].specified && !1 !== (i = isNamespaceAttributeNode(e.attributes[n])) && (1 !== i.length ? insertNamespaceIfNotDeclared.call(this, o, i[1], e.attributes[n].nodeValue, e) : insertNamespaceIfNotDeclared.call(this, o, "", e.attributes[n].nodeValue, e));
            if (nodeNamespace.call(this, e.parentNode, o), void 0 === t && (insertNamespaceIfNotDeclared.call(this, o, "xml", b, e), o[0] && "" === o[0].prefix && "" === o[0].namespaceURI && o.shift()), void 0 === t)
                for (n = 0; n < o.length; n++) o[n].ownerElement !== e && (o[n] = createNamespaceNode(o[n].prefix, o[n].nodeValue, e))
        }
        return o
    }, insertNamespaceIfNotDeclared = function(e, t, n, i) {
        var r, o;
        for (this.opts["case-sensitive"] || (t = t.toLowerCase()), r = 0; r < e.length; r++)
            if (e[r].prefix === t) return !1;
        return o = createNamespaceNode(t, n, i), "" === t && null !== n ? e.unshift(o) : e.push(o), !0
    }, isNamespaceAttributeNode = function(e) {
        var t = e.nodeName.split(":");
        return "xmlns" === t[0] ? t : !1
    }, nodeIdAttribute = function(e, t) {
        var n, i, r, o, a, s;
        if (1 === e.nodeType)
            for (r = t ? [t] : nodeAttribute(e), o = nodeNamespace.call(this, e), n = 0; n < r.length; n++) {
                for (s = r[n].nodeName.split(":"), 1 === s.length && (s[1] = s[0], s[0] = ""), a = null, i = 0; i < o.length; i++)
                    if (o[i].prefix === s[0]) {
                        a = o[i].namespaceURI;
                        break
                    }
                if (null === a && (a = ""), this.opts["unique-ids"][a] === s[1]) return r[n]
            }
        return null
    }, nodeAttributeSearch = function(e, t, n) {
        var i, r, o, a, s = [];
        for (o = e.getElementsByTagName("*"), i = 0; i < o.length; i++)
            if (a = o.item(i), 1 == a.nodeType)
                for (r = 0; r < a.attributes.length; r++)
                    if (a.attributes[r].specified && n(a, a.attributes[r]) === !0) {
                        if (t) return a;
                        s.push(a);
                        break
                    }
        return t ? null : s
    }, nodeExpandedName = function(e) {
        var t, n, i, r;
        switch (e.nodeType) {
            case 1:
                for ("undefined" != typeof e.scopeName ? r = {
                    prefix: "HTML" == e.scopeName ? "" : e.scopeName,
                    name: e.nodeName
                } : (t = e.nodeName.split(":"), r = 1 == t.length ? {
                    prefix: "",
                    name: t[0]
                } : {
                    prefix: t[0],
                    name: t[1]
                }), this.opts["case-sensitive"] || (r.prefix = r.prefix.toLowerCase(), r.name = r.name.toLowerCase()), n = nodeNamespace.call(this, e), i = 0; i < n.length; i++)
                    if (n[i].prefix === r.prefix) return r.ns = n[i].namespaceURI, r;
                if ("" === r.prefix) return r.ns = null, r;
                throw new Error('Internal Error: nodeExpandedName - Failed to expand namespace prefix "' + r.prefix + '" on element: ' + e.nodeName);
            case 2:
                if (t = e.nodeName.split(":"), 1 == t.length) return {
                    prefix: "",
                    ns: null,
                    name: t[0]
                };
                for (r = {
                    prefix: t[0],
                    name: t[1]
                }, this.opts["case-sensitive"] || (r.prefix = r.prefix.toLowerCase(), r.name = r.name.toLowerCase()), n = nodeNamespace.call(this, D(e)), i = 0; i < n.length; i++)
                    if (n[i].prefix === r.prefix) return r.ns = n[i].namespaceURI, r;
                throw new Error('Internal Error: nodeExpandedName - Failed to expand namespace prefix "' + r.prefix + '" on attribute: ' + e.nodeName);
            case 13:
                return {
                    prefix: null,
                    ns: null,
                    name: this.opts["case-sensitive"] ? e.prefix.toLowerCase() : e.prefix
                };
            case 7:
                return {
                    prefix: null,
                    ns: null,
                    name: this.opts["case-sensitive"] ? e.target.toLowerCase() : e.target
                };
            default:
                return !1
        }
    }, nodeStringValue = function(e) {
        var t, n, i = "";
        switch (e.nodeType) {
            case 9:
            case 1:
                for (n = s(new c(e, 1, 1, {}, {}, {}), {
                    type: "step",
                    args: ["descendant", {
                        type: "nodeType",
                        args: ["text", []]
                    }]
                }), n.sortDocumentOrder(), t = 0; t < n.value.length; t++) i += n.value[t].data;
                return i;
            case 2:
                return e.nodeValue;
            case 13:
                return e.namespaceURI;
            case 7:
            case 8:
            case 3:
            case 4:
                return e.data;
            default:
                throw new Error("Internal Error: nodeStringValue does not support node type: " + e.nodeType)
        }
    }, createError = function(e, t, n) {
        var i = new Error(n);
        return i.name = t, i.code = e, i
    }, arrayIndexOf = function(e, t) {
        for (var n = t.length; n--;)
            if (t[n] === e) return n;
        return !1
    }, compareOperator = function(e, t, n, i) {
        var r, o, a, s, l;
        if (e instanceof g)
            if (t instanceof g) {
                for (s = t.stringValues(), a = e.stringValues(), r = 0; r < a.length; r++)
                    for (o = 0; o < s.length; o++)
                        if (l = compareOperator(a[r], s[o], n, i), l.toBoolean()) return l
            } else if (t instanceof f) {
            for (a = e.stringValues(), r = 0; r < a.length; r++)
                if (l = compareOperator(new f(a[r].toNumber()), t, n, i), l.toBoolean()) return l
        } else if (t instanceof DateType || t instanceof p && t.isDateString()) {
            for (t instanceof p && (t = new DateType(t)), a = e.stringValues(), r = 0; r < a.length; r++)
                if (l = compareOperator(new DateType(a[r].toDate()), t, n, i), l.toBoolean()) return l
        } else {
            if (!(t instanceof p)) return compareOperator(new h(e.toBoolean()), t, n, i);
            for (a = e.stringValues(), r = 0; r < a.length; r++)
                if (l = compareOperator(a[r], t, n, i), l.toBoolean()) return l
        } else if (t instanceof g)
            if (e instanceof f) {
                for (s = t.stringValues(), r = 0; r < s.length; r++)
                    if (l = compareOperator(e, new f(s[r].toNumber()), n, i), l.toBoolean()) return l
            } else if (e instanceof DateType || e instanceof p && e.isDateString()) {
            for (e instanceof p && (e = new DateType(e)), s = t.stringValues(), r = 0; r < s.length; r++)
                if (l = compareOperator(e, new DateType(s[r].toDate()), n, i), l.toBoolean()) return l
        } else {
            if (!(e instanceof p)) return compareOperator(e, new h(t.toBoolean()), n, i);
            for (s = t.stringValues(), r = 0; r < s.length; r++)
                if (l = compareOperator(e, s[r], n, i), l.toBoolean()) return l
        } else switch (n) {
            case "=":
            case "!=":
                return new h(e instanceof h || t instanceof h ? i(e.toBoolean(), t.toBoolean()) : e instanceof f || t instanceof f ? i(e.toNumber(), t.toNumber()) : i(e.toString(), t.toString()));
            default:
                return new h(i(e.toNumber(), t.toNumber()))
        }
        return new h(!1)
    }, getComparableNode = function(e) {
        switch (e.nodeType) {
            case 2:
            case 3:
            case 4:
            case 7:
            case 8:
                return D(e);
            case 1:
            case 9:
                return e;
            case 13:
            default:
                throw new Error("Internal Error: getComparableNode - Node type not supported: " + e.nodeType)
        }
    }, compareDocumentPosition = function(e, t) {
        var n, i, r;
        if (13 == e.nodeType && 13 == t.nodeType && e.ownerElement == t.ownerElement) {
            if (e === t) return 0;
            for (i = nodeNamespace.call(m, e.ownerElement), r = 0; r < i.length; r++) {
                if (i[r] === e) {
                    n = 4;
                    break
                }
                if (i[r] === t) {
                    n = 2;
                    break
                }
            }
        } else 13 == e.nodeType && (e = e.ownerElement), 13 == t.nodeType && (t = t.ownerElement), n = compareDocumentPositionNoNamespace(e, t);
        return n
    }, compareDocumentPositionNoNamespace = function(e, t) {
        var n, i, r, o, a, s = function(e, t, n, i, r, o, a, s, l) {
            return 0 === r || (r & o) === o ? s + o : (r & a) === a ? l : r
        };
        if (e.compareDocumentPosition) return e.compareDocumentPosition(t);
        if (e === t) return 0;
        if (n = getComparableNode(e), i = getComparableNode(t), 9 === n.nodeType)
            if (9 === i.nodeType) {
                if (n !== i) return 1;
                r = 0
            } else {
                if (n !== i.ownerDocument) return 1;
                r = 20
            } else if (9 === i.nodeType) {
            if (i !== n.ownerDocument) return 1;
            r = 10
        } else {
            if (n.ownerDocument !== i.ownerDocument) return 1;
            if (!n.contains || "undefined" == typeof n.sourceIndex || !i.contains || "undefined" == typeof i.sourceIndex) throw new Error('Cannot compare elements. Neither "compareDocumentPosition" nor "contains" available.');
            r = (n != i && n.contains(i) && 16) + (n != i && i.contains(n) && 8) + (n.sourceIndex >= 0 && i.sourceIndex >= 0 ? (n.sourceIndex < i.sourceIndex && 4) + (n.sourceIndex > i.sourceIndex && 2) : 1) + 0
        } if (e === n && t === i) return r;
        if (e === n) return s(e, n, t, i, r, 16, 8, 4, 2);
        if (t === i) return s(t, i, e, n, r, 8, 16, 2, 4);
        if (16 === (16 & r)) return 4;
        if (8 === (8 & r)) return 2;
        if (0 === r) {
            for (o = 0; o < n.attributes.length; o++)
                if (a = n.attributes[o], a.specified) {
                    if (a === t) return 2;
                    if (a === e) return 4
                }
            throw new Error("Internal Error: compareDocumentPosition failed to sort attributes.")
        }
        return r
    }, nodeSupported = function(e) {
        if (!e) throw createError(9, "NOT_SUPPORTED_ERR", "Context node was not supplied.");
        if (9 != e.nodeType && 1 != e.nodeType && 2 != e.nodeType && 3 != e.nodeType && 4 != e.nodeType && 8 != e.nodeType && 7 != e.nodeType && 13 != e.nodeType) throw createError(9, "NOT_SUPPORTED_ERR", "The supplied node type is not supported. (nodeType: " + e.nodeType + ")");
        if (2 == e.nodeType && !e.specified) throw createError(9, "NOT_SUPPORTED_ERR", "The supplied node is a non-specified attribute node. Only specified attribute nodes are supported.")
    }, createNamespaceNode = function(e, t, n) {
        var i, r;
        for (i = 0; i < y.length; i++)
            if (r = y[i], r.prefix === e && r.nodeValue === t && r.ownerElement === n) return r;
        return r = new o(e, t, n), y.push(r), r
    }, d = function(e, t, n) {
        this.value = e, this.type = t, this.supports = n
    }, d.prototype = {
        value: null,
        type: null,
        supports: [],
        toBoolean: function() {
            throw new Error('Unable to convert "' + this.type + '" to "boolean".')
        },
        toString: function() {
            throw new Error('Unable to convert "' + this.type + '" to "string".')
        },
        toNumber: function() {
            throw new Error('Unable to convert "' + this.type + '" to "number".')
        },
        toNodeSet: function() {
            throw new Error('Unable to convert "' + this.type + '" to "node-set".')
        },
        toDate: function() {
            throw new Error('Unable to convert "' + this.type + '" to "date".')
        },
        canConvertTo: function(e) {
            return !1 !== arrayIndexOf(e, this.supports)
        }
    }, h = function(e) {
        d.call(this, e, "boolean", ["boolean", "string", "number", "date"])
    }, h.prototype = new d, h.constructor = h, h.prototype.toBoolean = function() {
        return this.value
    }, h.prototype.toString = function() {
        return this.value === !0 ? "true" : "false"
    }, h.prototype.toNumber = function() {
        return this.value ? 1 : 0
    }, h.prototype.toDate = function() {
        return null
    }, g = function(e, t) {
        d.call(this, e, "node-set", ["boolean", "string", "number", "node-set", "date"]), this.docOrder = t || "unsorted"
    }, g.prototype = new d, g.constructor = g, g.prototype.toBoolean = function() {
        return this.value.length > 0 ? !0 : !1
    }, g.prototype.toString = function() {
        return this.value.length < 1 ? "" : (this.sortDocumentOrder(), nodeStringValue(this.value[0]))
    }, g.prototype.toNumber = function() {
        return new p(this.toString()).toNumber()
    }, g.prototype.toNodeSet = function() {
        return this.value
    }, g.prototype.toDate = function() {
        return new p(this.toString()).toDate()
    }, g.prototype.sortDocumentOrder = function() {
        switch (this.docOrder) {
            case "document-order":
                break;
            case "reverse-document-order":
                this.value.reverse();
                break;
            default:
                this.value.sort(function(e, t) {
                    var n = compareDocumentPosition(e, t);
                    if (4 == (4 & n)) return -1;
                    if (2 == (2 & n)) return 1;
                    throw new Error("NodeSetType.sortDocumentOrder - unexpected compare result: " + n)
                })
        }
        this.docOrder = "document-order"
    }, g.prototype.sortReverseDocumentOrder = function() {
        switch (this.docOrder) {
            case "document-order":
                this.value.reverse();
                break;
            case "reverse-document-order":
                break;
            default:
                this.sortDocumentOrder(), this.value.reverse()
        }
        this.docOrder = "reverse-document-order"
    }, g.prototype.append = function(e) {
        var t, n = 0,
            i = 0;
        if (!e instanceof g) throw new Error("NodeSetType can be passed into NodeSetType.append method");
        for (this.sortDocumentOrder(), e.sortDocumentOrder(); n < this.value.length && i < e.value.length;)
            if (t = compareDocumentPosition(this.value[n], e.value[i]), 0 == t) i++;
            else if (4 == (4 & t)) n++;
        else {
            if (2 != (2 & t)) throw new Error("Internal Error: NodeSetType.append - unable to sort nodes. (result: " + t + ")");
            this.value.splice(n, 0, e.value[i]), n++, i++
        }
        for (; i < e.value.length; i++) this.value.push(e.value[i]);
        this.docOrder = "document-order"
    }, g.prototype.stringValues = function() {
        var e, t, n = [];
        for (e = 0; e < this.value.length; e++) t = new p(nodeStringValue(this.value[e])), t.isDateString() && (t = new DateType(t.value)), n.push(t);
        return n
    }, p = function(e) {
        d.call(this, e, "string", ["boolean", "string", "number", "date"])
    }, p.prototype = new d, p.constructor = p, p.prototype.toBoolean = function() {
        return this.value.length > 0 ? !0 : !1
    }, p.prototype.toString = function() {
        return this.value
    }, p.prototype.toNumber = function() {
        var e;
        return this.isDateString(this.value) ? new DateType(this.value).toNumber() : (e = this.value.match(/^[ \t\r\n]*(-?[0-9]+(?:[.][0-9]*)?)[ \t\r\n]*$/), null !== e ? parseFloat(e[1]) : (e = this.value.match(/^[ \t\r\n]*(-?[.][0-9]+)[ \t\r\n]*$/), null !== e ? parseFloat(e[1]) : Number.NaN))
    }, p.prototype.toDate = function() {
        return new Date(this.value)
    }, p.prototype.isDateString = function() {
        return isNaN(this.value) ? isNaN(Date.parse(this.value)) ? !1 : /('|")?[0-9]{4}(-|\/)[0-9]{2}(-|\/)[0-9]{2}('|")?/.test(this.value) ? (console.debug("found string value that passes check for datestringiness: " + this.value), !0) : !1 : !1
    }, f = function(e) {
        d.call(this, e, "number", ["boolean", "string", "number", "date"])
    }, f.prototype = new d, f.constructor = f, f.prototype.toBoolean = function() {
        return 0 === this.value || isNaN(this.value) ? !1 : !0
    }, f.prototype.toString = function() {
        return this.value.toString()
    }, f.prototype.toNumber = function() {
        return this.value
    }, f.prototype.toDate = function() {
        return new Date(864e5 * this.value)
    }, DateType = function(e) {
        d.call(this, e, "date", ["date", "string", "number", "boolean"])
    }, DateType.prototype = new d, DateType.constructor = DateType, DateType.prototype.toDate = function() {
        return new Date(this.value)
    }, DateType.prototype.toString = function() {
        return new Date(this.value).toUTCString()
    }, DateType.prototype.toNumber = function() {
        return new Date(this.value).getTime() / 864e5
    }, DateType.prototype.toBoolean = function() {
        return !isNaN(new Date(this.value).getTime())
    }, e = function(t, n) {
        var i;
        switch (this.code = t, this.code) {
            case e.INVALID_EXPRESSION_ERR:
                this.name = "INVALID_EXPRESSION_ERR";
                break;
            case e.TYPE_ERR:
                this.name = "TYPE_ERR";
                break;
            default:
                throw i = new Error("Unsupported XPathException code: " + this.code), i.name = "XPathExceptionInternalError", i
        }
        this.message = n || ""
    }, e.prototype.toString = function() {
        return 'XPathException: "' + this.message + '", code: "' + this.code + '", name: "' + this.name + '"'
    }, e.INVALID_EXPRESSION_ERR = 51, e.TYPE_ERR = 52, t = function(e) {
        var t, n, i;
        for (t in e) {
            i = !1;
            for (n in this.opts)
                if (t === n) {
                    this.opts[t] = e[t], i = !0;
                    break
                }
            if (!i) throw new Error("Unsupported option: " + t)
        }
        this.opts["unique-ids"][b] = "id", this.opts["unique-ids"][E] = "id"
    }, t.prototype = {
        opts: {
            "unique-ids": {},
            "case-sensitive": !1
        },
        createExpression: function(t, i) {
            var r, o, a, s, l = {};
            try {
                r = XPathJS._parser.parse(t)
            } catch (u) {
                throw o = "The expression is not a legal expression.", o += u instanceof XPathJS._parser.SyntaxError ? " (line: " + u.line + ", character: " + u.column + ")" : " (" + u.message + ")", new e(e.INVALID_EXPRESSION_ERR, o)
            }
            if (r.nsPrefixes.length > 0) {
                if ("object" != typeof i || "undefined" == typeof i.lookupNamespaceURI) throw new e(e.INVALID_EXPRESSION_ERR, "No namespace resolver provided or lookupNamespaceURI function not supported.");
                for (a = 0; a < r.nsPrefixes.length; a++)
                    if (s = r.nsPrefixes[a], l[s] = i.lookupNamespaceURI(s), null === l[s]) throw createError(14, "NAMESPACE_ERR", 'Undefined namespace prefix "' + s + '" in the context of the given resolver.')
            }
            return new n(r, l, this.opts)
        },
        createNSResolver: function(e) {
            return new i(e)
        },
        evaluate: function(e, t, n, i, r) {
            var e = this.createExpression(e, n);
            return e.evaluate(t, i, r)
        }
    }, n = function(e, t, n) {
        this.parsedExpression = e, this.namespaceMapping = t, this.opts = n || {}
    }, n.prototype = {
        parsedExpression: null,
        namespaceMapping: null,
        opts: {},
        evaluate: function(e, t) {
            var n;
            return m = this, nodeSupported(e), n = new c(e, 1, 1, {}, u, this.namespaceMapping, this.opts), r.factory(n, t, s(n, this.parsedExpression.tree))
        }
    }, c = function(e, t, n, i, r, o, a) {
        this.node = e, this.pos = t, this.size = n, this.vars = i, this.fns = r, this.nsMap = o, this.opts = a || {}
    }, c.prototype = {
        node: null,
        pos: null,
        size: null,
        vars: null,
        fns: null,
        nsMap: null,
        opts: null,
        clone: function(e, t, n) {
            return new c(e || this.node, "undefined" != typeof t ? t : this.pos, "undefined" != typeof n ? n : this.size, this.vars, this.fns, this.nsMap, this.opts)
        }
    }, i = function(e) {
        nodeSupported(e), this.node = e
    }, i.prototype = {
        node: null,
        lookupNamespaceURI: function(e) {
            var t, n, i, r = this.node;
            switch (e) {
                case "xml":
                    return b;
                case "xmlns":
                    return x;
                default:
                    switch (this.node.nodeType) {
                        case 9:
                            r = r.documentElement;
                            break;
                        case 1:
                            break;
                        default:
                            r = D(r)
                    }
                    if (null != r && 1 == r.nodeType) {
                        if ("" == e) {
                            if (n = r.getAttribute("xmlns"), null !== n) return n
                        } else if (r.ownerDocument.documentElement === r && "object" == typeof r.ownerDocument.namespaces) {
                            for (t = 0; t < r.ownerDocument.namespaces.length; t++)
                                if (n = r.ownerDocument.namespaces.item(t), n.name == e) return n.urn
                        } else
                            for (t = 0; t < r.attributes.length; t++)
                                if (r.attributes[t].specified && "xmlns:" + e == r.attributes[t].nodeName) return r.attributes[t].nodeValue; if (r.ownerDocument.documentElement !== r && r.parentNode) return i = this.node, this.node = r.parentNode, n = this.lookupNamespaceURI(e), this.node = i, n
                    }
                    return null
            }
        }
    }, l = {
        "/": function(e, t) {
            var n, i, r, o, a;
            if (null === e) i = new g([T(this.node)], "document-order");
            else if (i = s(this, e), !i instanceof g) throw new Error("Left side of path separator (/) must be of node-set type. (type: " + i.type + ")");
            if (null === t) o = i;
            else
                for (o = new g([], "document-order"), n = 0; n < i.value.length; n++) {
                    if (a = this.clone(i.value[n]), r = s(a, t), !r instanceof g) throw new Error("Right side of path separator (/) must be of node-set type. (type: " + r.type + ")");
                    o.append(r)
                }
            return o
        },
        step: function(e, t) {
            var n, i, r, o, a, l, u;
            switch (e) {
                case "child":
                    n = new g(k(this.node), "document-order");
                    break;
                case "descendant":
                    n = new g(_(this.node), "document-order");
                    break;
                case "parent":
                    r = D(this.node), n = new g(r ? [r] : [], "document-order");
                    break;
                case "ancestor":
                    n = new g(C(this.node), "reverse-document-order");
                    break;
                case "following-sibling":
                    n = new g(S(this.node), "document-order");
                    break;
                case "preceding-sibling":
                    n = new g(N(this.node), "reverse-document-order");
                    break;
                case "following":
                    n = new g(A(this.node), "document-order");
                    break;
                case "preceding":
                    n = new g(P(this.node), "reverse-document-order");
                    break;
                case "attribute":
                    n = new g(nodeAttribute(this.node), "document-order");
                    break;
                case "namespace":
                    n = new g(nodeNamespace.call(this, this.node), "document-order");
                    break;
                case "self":
                    n = new g([this.node], "document-order");
                    break;
                case "descendant-or-self":
                    o = _(this.node), o.unshift(this.node), n = new g(o, "document-order");
                    break;
                case "ancestor-or-self":
                    o = C(this.node), o.unshift(this.node), n = new g(o, "reverse-document-order");
                    break;
                default:
                    throw new Error("Axis type not supported: " + e)
            }
            switch (t.type) {
                case "nodeType":
                    if ("node" == t.args[0]) break;
                    for (i = n.value.length - 1; i >= 0; i--) switch (t.args[0]) {
                        case "text":
                            3 != n.value[i].nodeType && 4 != n.value[i].nodeType && n.value.splice(i, 1);
                            break;
                        case "comment":
                            8 != n.value[i].nodeType && n.value.splice(i, 1);
                            break;
                        case "processing-instruction":
                            (7 != n.value[i].nodeType || t.args[1].length > 0 && s(this, t.args[1][0]) != n.value[i].nodeName) && n.value.splice(i, 1)
                    }
                    break;
                case "name":
                    switch (a = s(this, t), e) {
                        case "attribute":
                            l = 2;
                            break;
                        case "namespace":
                            l = 13;
                            break;
                        default:
                            l = 1
                    }
                    for (i = n.value.length - 1; i >= 0; i--) n.value[i].nodeType == l ? (null !== a.ns || null !== a.name) && (u = nodeExpandedName.call(this, n.value[i]), u !== !1 && u.ns === a.ns ? null !== a.name && u.name.toLowerCase() != a.name.toLowerCase() && n.value.splice(i, 1) : n.value.splice(i, 1)) : n.value.splice(i, 1);
                    break;
                default:
                    throw new Error("NodeTest type not supported in step: " + t.type)
            }
            return n
        },
        predicate: function(e, t, n) {
            var i, r, o, a, l, u;
            if (i = s(this, t), !i instanceof g) throw new Error('Expected "node-set", got: ' + i.type);
            switch (e) {
                case "ancestor":
                case "ancestor-or-self":
                case "preceding":
                case "preceding-sibling":
                    i.sortReverseDocumentOrder();
                    break;
                default:
                    i.sortDocumentOrder()
            }
            for (a = 0; a < n.length; a++)
                for (r = 0, l = 1, u = i.value.length; r < i.value.length; l++) {
                    if (o = s(this.clone(i.value[r], l, u), n[a]), o instanceof f) {
                        if (o.value != l) {
                            i.value.splice(r, 1);
                            continue
                        }
                    } else if (!o.toBoolean()) {
                        i.value.splice(r, 1);
                        continue
                    }
                    r++
                }
            return i
        },
        "function": function(e, t) {
            var n, i, r, o, a = [],
                l = function(e) {
                    return (null !== e.ns ? "{" + e.ns + "}" : "{}") + e.name
                },
                u = function(e) {
                    var t, n, i = [];
                    for (t = 0; t < e.length; t++) n = void 0 === e[t].t ? "object" : e[t].t, e[t].r !== !1 ? e[t].rep === !0 && (n += "+") : n += e[t].rep === !0 ? "*" : "?", i.push(n);
                    return "(" + i.join(", ") + ")"
                },
                c = 0,
                h = [];
            if (n = s(this, e), null === n.ns && (n.ns = ""), !this.fns[n.ns] || !this.fns[n.ns][n.name]) throw new Error('Function "' + l(n) + '" does not exist.');
            for (i = this.fns[n.ns][n.name], i.args || (i.args = []), r = 0, c = 0; r < i.args.length; c++, r++) {
                if (void 0 === t[c]) {
                    if (i.args[r].r !== !1) throw new Error('Function "' + l(n) + '" expects ' + u(i.args) + ".")
                } else h.push(void 0 === i.args[r].t ? "object" : i.args[r].t); if (i.args[r].rep === !0) {
                    for (; c < t.length; c++) h.push(void 0 === i.args[r].t ? "object" : i.args[r].t);
                    break
                }
            }
            if (h.length < t.length) throw new Error('Function "' + l(n) + '" expects ' + u(i.args) + ".");
            for (r = 0; r < t.length; r++) {
                if (o = s(this, t[r]), "object" !== h[r] && !o.canConvertTo(h[r])) throw new Error('Function "' + l(n) + '" expects ' + u(i.args) + '.Cannot convert "' + o.type + '" to "' + h[r] + '".');
                a.push(o)
            }
            if (result = i.fn.apply(this, a), !result instanceof d) throw new Error('Function "' + l(n) + '" did not return a value that inherits from BaseType.');
            if ("object" !== i.ret && !result.canConvertTo(i.ret)) throw new Error('Function "' + l(n) + '" return "' + result.type + '" type that cannot be converted to "' + i.ret + '".');
            return result
        },
        "|": function(e, t) {
            if (e = s(this, e), t = s(this, t), "undefined" == typeof e || "undefined" == typeof t || !e instanceof g || !t instanceof g) throw new Error('Unable to perform union on non-"node-set" types.');
            return e.append(t), e
        },
        or: function(e, t) {
            return new h(s(this, e).toBoolean() ? !0 : s(this, t).toBoolean())
        },
        and: function(e, t) {
            return new h(s(this, e).toBoolean() ? s(this, t).toBoolean() : !1)
        },
        "=": function(e, t) {
            return compareOperator.call(this, s(this, e), s(this, t), "=", function(e, t) {
                return e == t
            })
        },
        "!=": function(e, t) {
            return compareOperator.call(this, s(this, e), s(this, t), "!=", function(e, t) {
                return e != t
            })
        },
        "<=": function(e, t) {
            return compareOperator.call(this, s(this, e), s(this, t), "<=", function(e, t) {
                return t >= e
            })
        },
        "<": function(e, t) {
            return compareOperator.call(this, s(this, e), s(this, t), "<", function(e, t) {
                return t > e
            })
        },
        ">=": function(e, t) {
            return compareOperator.call(this, s(this, e), s(this, t), ">=", function(e, t) {
                return e >= t
            })
        },
        ">": function(e, t) {
            return compareOperator.call(this, s(this, e), s(this, t), ">", function(e, t) {
                return e > t
            })
        },
        "+": function(e, t) {
            return new f(s(this, e).toNumber() + s(this, t).toNumber())
        },
        "-": function(e, t) {
            return new f(s(this, e).toNumber() - s(this, t).toNumber())
        },
        div: function(e, t) {
            return new f(s(this, e).toNumber() / s(this, t).toNumber())
        },
        mod: function(e, t) {
            return new f(s(this, e).toNumber() % s(this, t).toNumber())
        },
        "*": function(e, t) {
            return new f(s(this, e).toNumber() * s(this, t).toNumber())
        },
        string: function(e) {
            return new p(e)
        },
        number: function(e) {
            return new f(e)
        },
        $: function() {
            throw new Error("TODO: Not implemented.16")
        },
        name: function(e, t) {
            var n = null;
            if (null !== e && (n = this.nsMap[e], !n)) throw new Error('Namespace prefix "' + e + '" is not mapped to a namespace.');
            return {
                ns: n,
                name: t
            }
        }
    }, u = {
        "": {
            last: {
                fn: function() {
                    return new f(this.size)
                },
                ret: "number"
            },
            count: {
                fn: function(e) {
                    return new f(e.toNodeSet().length)
                },
                args: [{
                    t: "node-set"
                }],
                ret: "number"
            },
            id: {
                fn: function(e) {
                    var t, n, i, r = this,
                        o = [],
                        a = [],
                        s = function(e) {
                            var t, n = e.split(/[\u0020\u0009\u000D\u000A]+/);
                            for (t = n.length - 1; t >= 0; t--) 0 == n[t].length && n.splice(t, 1);
                            return n
                        };
                    if (e instanceof g)
                        for (t = 0; t < e.value.length; t++) o.push.apply(o, s(nodeStringValue(e.value[t])));
                    else e = e.toString(), o = s(e);
                    for (t = o.length - 1; t >= 0; t--)
                        for (n = t - 1; n >= 0; n--)
                            if (o[t] == o[n] && t != n) {
                                o.splice(t, 1);
                                break
                            }
                    for (t = 0; t < o.length; t++) i = T(this.node).getElementById(o[t]), i && nodeIdAttribute.call(this, i) ? a.push(i) : nodeAttributeSearch(T(this.node), !0, function(e, n) {
                        var i = nodeIdAttribute.call(r, e, n);
                        return i && i.nodeValue == o[t] ? (a.push(e), !0) : void 0
                    });
                    return new g(a)
                },
                args: [{}],
                ret: "node-set"
            },
            "local-name": {
                fn: function(e) {
                    var t, n = "";
                    return 0 == arguments.length && (e = new g([this.node])), e.toNodeSet().length > 0 && (e.sortDocumentOrder(), t = nodeExpandedName.call(this, e.value[0]), t !== !1 && (n = t.name)), new p(n)
                },
                args: [{
                    t: "node-set",
                    r: !1
                }],
                ret: "string"
            },
            "namespace-uri": {
                fn: function(e) {
                    var t, n = "";
                    return 0 == arguments.length && (e = new g([this.node])), e.toNodeSet().length > 0 && (e.sortDocumentOrder(), t = nodeExpandedName.call(this, e.value[0]), t !== !1 && null !== t.ns && (n = t.ns)), new p(n)
                },
                args: [{
                    t: "node-set",
                    r: !1
                }],
                ret: "string"
            },
            name: {
                fn: function(e) {
                    var t, n = "";
                    return 0 == arguments.length && (e = new g([this.node])), e.toNodeSet().length > 0 && (e.sortDocumentOrder(), t = nodeExpandedName.call(this, e.value[0]), t !== !1 && (n = t.prefix && t.prefix.length > 0 ? t.prefix + ":" + t.name : t.name)), new p(n)
                },
                args: [{
                    t: "node-set",
                    r: !1
                }],
                ret: "string"
            },
            string: {
                fn: function(e) {
                    return 0 == arguments.length && (e = new g([this.node], "document-order")), new p(e.toString())
                },
                args: [{
                    t: "object",
                    r: !1
                }],
                ret: "string"
            },
            "starts-with": {
                fn: function(e, t) {
                    return new h(e.toString().substr(0, (t = t.toString()).length) == t)
                },
                args: [{
                    t: "string"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            contains: {
                fn: function(e, t) {
                    return new h(-1 != e.toString().indexOf(t = t.toString()))
                },
                args: [{
                    t: "string"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            "substring-before": {
                fn: function(e, t) {
                    return e = e.toString(), t = e.indexOf(t.toString()), new p(-1 == t ? "" : e.substr(0, t))
                },
                args: [{
                    t: "string"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            "substring-after": {
                fn: function(e, t) {
                    var n;
                    return e = e.toString(), t = t.toString(), n = e.indexOf(t), new p(-1 == n ? "" : e.substr(n + t.length))
                },
                args: [{
                    t: "string"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            substring: {
                fn: function(e, t, n) {
                    return e = e.toString(), t = Math.round(t.toNumber()) - 1, new p(isNaN(t) ? "" : 2 == arguments.length ? e.substring(0 > t ? 0 : t) : e.substring(0 > t ? 0 : t, t + Math.round(n.toNumber())))
                },
                args: [{
                    t: "string"
                }, {
                    t: "number"
                }, {
                    t: "number",
                    r: !1
                }],
                ret: "string"
            },
            "string-length": {
                fn: function(e) {
                    return e = 0 == arguments.length ? nodeStringValue(this.node) : e.toString(), new f(e.length)
                },
                args: [{
                    t: "string",
                    r: !1
                }],
                ret: "number"
            },
            "normalize-space": {
                fn: function(e) {
                    return e = 0 == arguments.length ? nodeStringValue(this.node) : e.toString(), new p(e.replace(/^[\u0020\u0009\u000D\u000A]+/, "").replace(/[\u0020\u0009\u000D\u000A]+$/, "").replace(/[\u0020\u0009\u000D\u000A]+/g, " "))
                },
                args: [{
                    t: "string",
                    r: !1
                }],
                ret: "string"
            },
            translate: {
                fn: function(e, t, n) {
                    var i, r, o, a = "";
                    for (e = e.toString(), t = t.toString(), n = n.toString(), i = 0; i < e.length; i++)(-1 == (r = t.indexOf(o = e.charAt(i))) || (o = n.charAt(r))) && (a += o);
                    return new p(a)
                },
                args: [{
                    t: "string"
                }, {
                    t: "string"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            "boolean": {
                fn: function(e) {
                    return new h(e.toBoolean())
                },
                args: [{
                    r: !0
                }],
                ret: "boolean"
            },
            not: {
                fn: function(e) {
                    return new h(!e.toBoolean())
                },
                args: [{
                    t: "boolean"
                }],
                ret: "boolean"
            },
            "true": {
                fn: function() {
                    return new h(!0)
                },
                ret: "boolean"
            },
            "false": {
                fn: function() {
                    return new h(!1)
                },
                ret: "boolean"
            },
            lang: {
                fn: function(e) {
                    for (var t, n, i, r, o, a, s, l = this.node, u = e.toString().toLowerCase().split("-"); 9 != l.nodeType; l = D(l))
                        for (t = nodeAttribute(l), o = 0; o < t.length; o++)
                            if (n = t[o].nodeName.split(":"), 1 === n.length && (n[1] = n[0], n[0] = ""), "lang" == n[1]) {
                                if (i = t[o].nodeValue.toLowerCase().split("-"), i.length < u.length) continue;
                                for (s = !0, a = 0; a < u.length; a++)
                                    if (u[a] != i[a]) {
                                        s = !1;
                                        break
                                    }
                                if (s)
                                    for (r = nodeNamespace.call(this, l), a = 0; a < r.length; a++)
                                        if (r[a].prefix == n[0] && r[a].nodeValue == b) return new h(!0)
                            }
                    return new h(!1)
                },
                args: [{
                    t: "string"
                }],
                ret: "boolean"
            },
            number: {
                fn: function(e) {
                    return 0 == arguments.length && (e = new g([this.node], "document-order")), new f(e.toNumber())
                },
                args: [{
                    t: "object",
                    r: !1
                }],
                ret: "number"
            },
            sum: {
                fn: function(e) {
                    var t, n = 0;
                    for (e = e.toNodeSet(), t = 0; t < e.length; t++) n += new p(nodeStringValue(e[t])).toNumber();
                    return new f(n)
                },
                args: [{
                    t: "node-set"
                }],
                ret: "number"
            },
            floor: {
                fn: function(e) {
                    return new f(Math.floor(e))
                },
                args: [{
                    t: "number"
                }],
                ret: "number"
            },
            ceiling: {
                fn: function(e) {
                    return new f(Math.ceil(e))
                },
                args: [{
                    t: "number"
                }],
                ret: "number"
            },
            sum_jr: {
                fn: function(e) {
                    var t, n;
                    for (sum = 0, e = e.toNodeSet(), t = 0; t < e.length; t++) n = "" == nodeStringValue(e[t]) ? "0" : nodeStringValue(e[t]), sum += new p(n).toNumber();
                    return new f(sum)
                },
                args: [{
                    t: "node-set"
                }],
                ret: "number"
            },
            position: {
                fn: function(e) {
                    if (e) {
                        var t, n, i;
                        if (e = e.toNodeSet(), 1 === e.length) {
                            for (t = e[0], i = 1, n = t.tagName; t.previousElementSibling && t.previousElementSibling.tagName === n;) t = t.previousElementSibling, i++;
                            return new f(i)
                        }
                        throw new Error("nodeset provided to position() contained multiple nodes")
                    }
                    return new f(this.pos)
                },
                args: [{
                    t: "node-set",
                    r: !1
                }],
                ret: "number"
            },
            concat: {
                fn: function() {
                    var e, t, n = "";
                    for (e = 0; e < arguments.length; e++) t = arguments[e] instanceof g ? arguments[e].stringValues().join("") : arguments[e].toString(), n += t;
                    return new p(n)
                },
                args: [{
                    t: "object",
                    r: !1,
                    rep: !0
                }],
                ret: "string"
            },
            round: {
                fn: function(e, t) {
                    return t = Math.round(t) || 0, new f(Math.round(e * Math.pow(10, t)) / Math.pow(10, t))
                },
                args: [{
                    t: "number"
                }, {
                    t: "number",
                    r: !1
                }],
                ret: "number"
            },
            selected: {
                fn: function(e, t) {
                    var n;
                    return t = t.toString().trim(), n = e.toString(), new h(-1 != (" " + n + " ").indexOf(" " + t + " "))
                },
                args: [{
                    t: "object"
                }, {
                    t: "string"
                }],
                ret: "boolean"
            },
            "selected-at": {
                fn: function(e, t) {
                    var n, i, r;
                    return t = Math.round(t.toNumber()), n = e.toString(), i = n.split(" "), r = t >= 0 && t < i.length ? i[t] : "", new p(r)
                },
                args: [{
                    t: "object"
                }, {
                    t: "number"
                }],
                ret: "string"
            },
            "count-selected": {
                fn: function(e) {
                    var t = [];
                    return e = e.toNodeSet(), e.length > 0 ? (t = nodeStringValue(e[0]).trim().split(" "), new f(1 == t.length && "" === t[0] ? 0 : t.length)) : new f(0)
                },
                args: [{
                    t: "node-set"
                }],
                ret: "number"
            },
            checklist: {
                fn: function(e, t) {
                    var n, i, r = 0;
                    for (e = e.toNumber(), t = t.toNumber(), n = 2; n < arguments.length; n++)
                        if (arguments[n] instanceof g)
                            for (i = 0; i < arguments[n].stringValues().length; i++) arguments[n].stringValues()[i].toBoolean() === !0 && r++;
                        else arguments[n].toBoolean() === !0 && r++;
                    return new h((0 > e || r >= e) && (0 > t || t >= r))
                },
                args: [{
                    t: "number"
                }, {
                    t: "number"
                }, {
                    t: "object"
                }, {
                    t: "object",
                    r: !1,
                    rep: !0
                }],
                ret: "boolean"
            },
            "weighted-checklist": {
                fn: function(e, t) {
                    var n, i = [],
                        r = [],
                        o = 0;
                    for (e = e.toNumber(), t = t.toNumber(), n = 2; n < arguments.length; n += 2) v = arguments[n], w = arguments[n + 1], v && w && (v instanceof g ? i = i.concat(v.stringValues()) : i.push(v), w instanceof g ? r = r.concat(w.stringValues()) : r.push(w));
                    for (n = 0; n < i.length; n++) i[n].toBoolean() === !0 && (o += r[n].toNumber());
                    return new h((0 > e || o >= e) && (0 > t || t >= o))
                },
                args: [{
                    t: "number"
                }, {
                    t: "number"
                }, {
                    t: "object"
                }, {
                    t: "object"
                }, {
                    t: "object",
                    r: !1,
                    rep: !0
                }],
                ret: "boolean"
            },
            "boolean-from-string": {
                fn: function(e) {
                    return new h("true" === e.toString().toLowerCase() || "1" === String(e))
                },
                args: [{
                    t: "string"
                }],
                ret: "boolean"
            },
            "if": {
                fn: function(e, t, n) {
                    return e.toBoolean() ? t : n
                },
                args: [{
                    t: "object"
                }, {
                    t: "object"
                }, {
                    t: "object"
                }],
                ret: "object"
            },
            date: {
                fn: function(e) {
                    return new DateType(e.toDate())
                },
                args: [{
                    t: "object"
                }],
                ret: "string"
            },
            "date-time": {
                fn: function(e) {
                    return new DateType(e.toDate())
                },
                args: [{
                    t: "object"
                }],
                ret: "string"
            },
            today: {
                fn: function() {
                    var e = new Date;
                    return new DateType(new Date(e.getFullYear(), e.getMonth(), e.getDate()))
                },
                ret: "string"
            },
            now: {
                fn: function() {
                    return new DateType(new Date)
                },
                ret: "string"
            },
            regex: {
                fn: function(e, t) {
                    var n, i;
                    return n = e.toString(), i = new RegExp(t), new h(i.test(n))
                },
                args: [{
                    t: "object"
                }, {
                    t: "string"
                }],
                ret: "boolean"
            },
            uuid: {
                fn: function() {
                    var e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                        var t = 16 * Math.random() | 0,
                            n = "x" == e ? t : 3 & t | 8;
                        return n.toString(16)
                    });
                    return new p(e)
                },
                ret: "string"
            },
            "int": {
                fn: function(e) {
                    return new f(parseInt(e))
                },
                args: [{
                    t: "number"
                }],
                ret: "number"
            },
            substr: {
                fn: function(e, t, n) {
                    return e = e.toString(), length = e.length, t = Math.round(t.toNumber()), n = n ? Math.round(n.toNumber()) : length, new p(isNaN(t) ? "" : e.substring(0 > t ? length + t : t, 0 > n ? length + n : n))
                },
                args: [{
                    t: "string"
                }, {
                    t: "number"
                }, {
                    t: "number",
                    r: !1
                }],
                ret: "string"
            },
            random: {
                fn: function() {
                    return new f(Math.random().toFixed(15))
                },
                ret: "number"
            },
            min: {
                fn: function() {
                    var e, t, n, i;
                    for (console.log("min args", arguments), e = 0; e < arguments.length; e++)
                        if (arguments[e] instanceof g)
                            for (i = arguments[e].toNodeSet(), e = 0; e < i.length; e++) n = new p(nodeStringValue(i[e])), n && "" !== n.toString() && (t = t ? Math.min(t, n.toNumber()) : n.toNumber());
                        else n = new p(arguments[e].toString()), n && "" !== n.toString() && (t = t ? Math.min(t, n.toNumber()) : n.toNumber());
                    return new f(t)
                },
                args: [{
                    t: "object"
                }, {
                    t: "object",
                    r: !1,
                    rep: !0
                }],
                ret: "number"
            },
            max: {
                fn: function() {
                    var e, t, n, i;
                    for (e = 0; e < arguments.length; e++)
                        if (arguments[e] instanceof g)
                            for (i = arguments[e].toNodeSet(), e = 0; e < i.length; e++) n = new p(nodeStringValue(i[e])), n && "" !== n.toString() && (t = t ? Math.max(t, n.toNumber()) : n.toNumber());
                        else n = new p(arguments[e].toString()), n && "" !== n.toString() && (t = t ? Math.max(t, n.toNumber()) : n.toNumber());
                    return new f(t)
                },
                args: [{
                    t: "object"
                }, {
                    t: "object",
                    r: !1,
                    rep: !0
                }],
                ret: "number"
            },
            join: {
                fn: function(e) {
                    var t, n = [];
                    for (t = 1; t < arguments.length; t++) arguments[t] instanceof g ? n = n.concat(arguments[t].stringValues()) : n.push(arguments[t].toString());
                    for (value = n[0] || "", t = 1; t < n.length; t++) value += e.toString() + n[t];
                    return new p(value)
                },
                args: [{
                    t: "string"
                }, {
                    t: "object",
                    r: !1,
                    rep: !0
                }],
                ret: "string"
            },
            coalesce: {
                fn: function(e, t) {
                    return e.toString().length > 0 ? e : t
                },
                args: [{
                    t: "object"
                }, {
                    t: "object"
                }],
                ret: "string"
            },
            "format-date": {
                fn: function(e, t) {
                    var n, e = new DateType(e),
                        i = e.toDate(),
                        r = t.toString(),
                        o = function(e, t) {
                            var i = e.toString(),
                                r = t - i.length;
                            for (n = 0; r > n; n++) i = "0" + i;
                            return i
                        };
                    if (!e.toBoolean()) return new p(i.toString());
                    props = {
                        Y: i.getFullYear(),
                        y: i.getFullYear().toString().substring(2, 4),
                        m: o(i.getMonth() + 1, 2),
                        n: i.getMonth() + 1,
                        b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i.getMonth()],
                        d: o(i.getDate(), 2),
                        e: i.getDate(),
                        H: o(i.getHours(), 2),
                        h: i.getHours(),
                        M: o(i.getMinutes(), 2),
                        S: o(i.getSeconds(), 2),
                        3: o(i.getMilliseconds(), 3),
                        a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i.getDay()]
                    };
                    for (prop in props) r = r.replace("%" + prop, props[prop]);
                    return new p(r)
                },
                args: [{
                    t: "date"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            "format-date-time": {
                fn: function(e, t) {
                    var n, e = new DateType(e),
                        i = e.toDate(),
                        r = t.toString(),
                        o = function(e, t) {
                            var i = e.toString(),
                                r = t - i.length;
                            for (n = 0; r > n; n++) i = "0" + i;
                            return i
                        };
                    if (!e.toBoolean()) return new p(i.toString());
                    props = {
                        Y: i.getFullYear(),
                        y: i.getFullYear().toString().substring(2, 4),
                        m: o(i.getMonth() + 1, 2),
                        n: i.getMonth() + 1,
                        b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i.getMonth()],
                        d: o(i.getDate(), 2),
                        e: i.getDate(),
                        H: o(i.getHours(), 2),
                        h: i.getHours(),
                        M: o(i.getMinutes(), 2),
                        S: o(i.getSeconds(), 2),
                        3: o(i.getMilliseconds(), 3),
                        a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i.getDay()]
                    };
                    for (prop in props) r = r.replace("%" + prop, props[prop]);
                    return new p(r)
                },
                args: [{
                    t: "date"
                }, {
                    t: "string"
                }],
                ret: "string"
            },
            pow: {
                fn: function(e, t) {
                    return new f(Math.pow(e, t))
                },
                args: [{
                    t: "number"
                }, {
                    t: "number"
                }],
                ret: "number"
            },
            version: {
                fn: function() {
                    var e = "#document" === this.node.nodeName ? this.node.documentElement : this.node.ownerDocument.firstElementChild,
                        t = e.attributes.version;
                    return new p(t ? t.textContent : "")
                },
                args: [],
                ret: "string"
            }
        }
    }, s = function(e, t) {
        if ("function" != typeof l[t.type]) throw new Error("Internal Error: Expression type does not exist: " + t.type);
        return l[t.type].apply(e, t.args)
    }, r = function(t, n, i) {
        switch (n) {
            case r.NUMBER_TYPE:
                this.resultType = r.NUMBER_TYPE, this.numberValue = i.toNumber();
                break;
            case r.STRING_TYPE:
                this.resultType = r.STRING_TYPE, this.stringValue = i.toString();
                break;
            case r.BOOLEAN_TYPE:
                this.resultType = r.BOOLEAN_TYPE, this.booleanValue = i.toBoolean();
                break;
            case r.UNORDERED_NODE_ITERATOR_TYPE:
            case r.ORDERED_NODE_ITERATOR_TYPE:
            case r.UNORDERED_NODE_SNAPSHOT_TYPE:
            case r.ORDERED_NODE_SNAPSHOT_TYPE:
            case r.ANY_UNORDERED_NODE_TYPE:
            case r.FIRST_ORDERED_NODE_TYPE:
                if (!i instanceof g) throw new Error('Expected result of type "node-set", got: "' + i.type + '"');
                switch (this.resultType = n, n) {
                    case r.UNORDERED_NODE_ITERATOR_TYPE:
                    case r.UNORDERED_NODE_SNAPSHOT_TYPE:
                        this._value = i.toNodeSet(), this.snapshotLength = this._value.length;
                        break;
                    case r.ORDERED_NODE_ITERATOR_TYPE:
                    case r.ORDERED_NODE_SNAPSHOT_TYPE:
                        i.sortDocumentOrder(), this._value = i.toNodeSet(), this.snapshotLength = this._value.length;
                        break;
                    case r.ANY_UNORDERED_NODE_TYPE:
                        i = i.toNodeSet(), this.singleNodeValue = i.length ? i[0] : null;
                        break;
                    case r.FIRST_ORDERED_NODE_TYPE:
                        i.sortDocumentOrder(), i = i.toNodeSet(), this.singleNodeValue = i.length ? i[0] : null;
                        break;
                    default:
                        throw new e(e.TYPE_ERR, "XPath result type not supported. (type: " + n + ")")
                }
                break;
            default:
                throw new e(e.TYPE_ERR, "XPath result type not supported. (type: " + n + ")")
        }
    }, r.factory = function(t, n, i) {
        var o;
        if (n !== r.ANY_TYPE) return new r(t, n, i);
        if (i instanceof g) o = new r(t, r.UNORDERED_NODE_ITERATOR_TYPE, i);
        else if (i instanceof f) o = new r(t, r.NUMBER_TYPE, i);
        else if (i instanceof h) o = new r(t, r.BOOLEAN_TYPE, i);
        else {
            if (!(i instanceof p)) throw new e(e.TYPE_ERR, "Internal Error: Unsupported value type: " + typeof i);
            o = new r(t, r.STRING_TYPE, i)
        }
        return o
    }, r.prototype = {
        resultType: null,
        numberValue: null,
        stringValue: null,
        booleanValue: null,
        singleNodeValue: null,
        invalidIteratorState: null,
        snapshotLength: null,
        _iteratorIndex: 0,
        iterateNext: function() {
            if (this.resultType != r.UNORDERED_NODE_ITERATOR_TYPE && this.resultType != r.ORDERED_NODE_ITERATOR_TYPE) throw new e(e.TYPE_ERR, "iterateNext() method may only be used with results of type UNORDERED_NODE_ITERATOR_TYPE or ORDERED_NODE_ITERATOR_TYPE");
            return this._iteratorIndex < this._value.length ? this._value[this._iteratorIndex++] : null
        },
        snapshotItem: function(t) {
            if (this.resultType != r.UNORDERED_NODE_SNAPSHOT_TYPE && this.resultType != r.ORDERED_NODE_SNAPSHOT_TYPE) throw new e(e.TYPE_ERR, "snapshotItem() method may only be used with results of type UNORDERED_NODE_SNAPSHOT_TYPE or ORDERED_NODE_SNAPSHOT_TYPE");
            return this._value[t]
        }
    }, r.ANY_TYPE = 0, r.NUMBER_TYPE = 1, r.STRING_TYPE = 2, r.BOOLEAN_TYPE = 3, r.UNORDERED_NODE_ITERATOR_TYPE = 4, r.ORDERED_NODE_ITERATOR_TYPE = 5, r.UNORDERED_NODE_SNAPSHOT_TYPE = 6, r.ORDERED_NODE_SNAPSHOT_TYPE = 7, r.ANY_UNORDERED_NODE_TYPE = 8, r.FIRST_ORDERED_NODE_TYPE = 9, o = function(e, t, n) {
        if (1 != n.nodeType) throw new Error("Internal Error: XPathNamespace owner element must be an Element node.");
        this.ownerElement = n, this.ownerDocument = n.ownerDocument, this.nodeName = "#namespace", this.prefix = e, this.localName = e, this.nodeType = o.XPATH_NAMESPACE_NODE, this.namespaceURI = t, this.nodeValue = t
    }, o.XPATH_NAMESPACE_NODE = 13, a = {
        XPathException: e,
        XPathEvaluator: t,
        XPathNSResolver: i,
        XPathExpression: n,
        XPathResult: r,
        XPathNamespace: o,
        getCurrentDomLevel3XPathBindings: function() {
            return {
                window: {
                    XPathException: window.XPathException,
                    XPathExpression: window.XPathExpression,
                    XPathNSResolver: window.XPathNSResolver,
                    XPathResult: window.XPathResult,
                    XPathNamespace: window.XPathNamespace
                },
                document: {
                    createExpression: document.createExpression,
                    createNSResolver: document.createNSResolver,
                    evaluate: document.evaluate
                }
            }
        },
        createDomLevel3XPathBindings: function(a) {
            var s = new t(a);
            return {
                window: {
                    XPathException: e,
                    XPathExpression: n,
                    XPathNSResolver: i,
                    XPathResult: r,
                    XPathNamespace: o
                },
                document: {
                    createExpression: function() {
                        return s.createExpression.apply(s, arguments)
                    },
                    createNSResolver: function() {
                        return s.createNSResolver.apply(s, arguments)
                    },
                    evaluate: function() {
                        return s.evaluate.apply(s, arguments)
                    }
                }
            }
        },
        bindDomLevel3XPath: function(e, t) {
            var n, i = t || a.createDomLevel3XPathBindings(),
                r = a.getCurrentDomLevel3XPathBindings(),
                e = e || document;
            for (n in i.window) window[n] = i.window[n];
            for (n in i.document) e[n] = i.document[n];
            return r
        }
    }
}(), XPathJS._parser = function() {
    function e(e, t) {
        function n() {
            this.constructor = e
        }
        n.prototype = t.prototype, e.prototype = new n
    }

    function t(e, t, n, i, r, o) {
        this.message = e, this.expected = t, this.found = n, this.offset = i, this.line = r, this.column = o, this.name = "SyntaxError"
    }

    function n(e) {
        function n(t) {
            function n(t, n, i) {
                var r, o;
                for (r = n; i > r; r++) o = e.charAt(r), "\n" === o ? (t.seenCR || t.line++, t.column = 1, t.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (t.line++, t.column = 1, t.seenCR = !0) : (t.column++, t.seenCR = !1)
            }
            return pr !== t && (pr > t && (pr = 0, fr = {
                line: 1,
                column: 1,
                seenCR: !1
            }), n(fr, pr, t), pr = t), fr
        }

        function r(e) {
            gr > dr || (dr > gr && (gr = dr, mr = []), mr.push(e))
        }

        function o(i, r, o) {
            function a(e) {
                var t = 1;
                for (e.sort(function(e, t) {
                    return e.description < t.description ? -1 : e.description > t.description ? 1 : 0
                }); t < e.length;) e[t - 1] === e[t] ? e.splice(t, 1) : t++
            }

            function s(e, t) {
                function n(e) {
                    function t(e) {
                        return e.charCodeAt(0).toString(16).toUpperCase()
                    }
                    return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(e) {
                        return "\\x0" + t(e)
                    }).replace(/[\x10-\x1F\x80-\xFF]/g, function(e) {
                        return "\\x" + t(e)
                    }).replace(/[\u0180-\u0FFF]/g, function(e) {
                        return "\\u0" + t(e)
                    }).replace(/[\u1080-\uFFFF]/g, function(e) {
                        return "\\u" + t(e)
                    })
                }
                var i, r, o, a = new Array(e.length);
                for (o = 0; o < e.length; o++) a[o] = e[o].description;
                return i = e.length > 1 ? a.slice(0, -1).join(", ") + " or " + a[e.length - 1] : a[0], r = t ? '"' + n(t) + '"' : "end of input", "Expected " + i + " but " + r + " found."
            }
            var l = n(o),
                u = o < e.length ? e.charAt(o) : null;
            return null !== r && a(r), new t(null !== i ? i : s(r, u), r, u, o, l.line, l.column)
        }

        function a() {
            var e, t, n, i;
            return e = dr, t = V(), t !== J ? (n = y(), n !== J ? (i = V(), i !== J ? (hr = e, t = et(n), e = t) : (dr = e, e = Z)) : (dr = e, e = Z)) : (dr = e, e = Z), e
        }

        function s() {
            var e;
            return e = u(), e === J && (e = l()), e
        }

        function l() {
            var t, n, i, o, a;
            return t = g(), t === J && (t = dr, 47 === e.charCodeAt(dr) ? (n = tt, dr++) : (n = J, 0 === vr && r(nt)), n !== J ? (i = dr, o = V(), o !== J ? (a = u(), a !== J ? (o = [o, a], i = o) : (dr = i, i = Z)) : (dr = i, i = Z), i === J && (i = it), i !== J ? (hr = t, n = rt(i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)), t
        }

        function u() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = c(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (e.substr(dr, 2) === ot ? (s = ot, dr += 2) : (s = J, 0 === vr && r(at)), s === J && (47 === e.charCodeAt(dr) ? (s = tt, dr++) : (s = J, 0 === vr && r(nt))), s !== J ? (l = V(), l !== J ? (u = c(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (e.substr(dr, 2) === ot ? (s = ot, dr += 2) : (s = J, 0 === vr && r(at)), s === J && (47 === e.charCodeAt(dr) ? (s = tt, dr++) : (s = J, 0 === vr && r(nt))), s !== J ? (l = V(), l !== J ? (u = c(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = st(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function c() {
            var e, t, n, i, r, o, a, s;
            if (e = dr, t = d(), t !== J)
                if (n = V(), n !== J)
                    if (i = p(), i !== J) {
                        for (r = [], o = dr, a = V(), a !== J ? (s = f(), s !== J ? (a = [a, s], o = a) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) r.push(o), o = dr, a = V(), a !== J ? (s = f(), s !== J ? (a = [a, s], o = a) : (dr = o, o = Z)) : (dr = o, o = Z);
                        r !== J ? (hr = e, t = lt(t, i, r), e = t) : (dr = e, e = Z)
                    } else dr = e, e = Z;
            else dr = e, e = Z;
            else dr = e, e = Z;
            return e === J && (e = m()), e
        }

        function d() {
            var t, n, i, o;
            return t = dr, n = h(), n !== J ? (i = V(), i !== J ? (e.substr(dr, 2) === ut ? (o = ut, dr += 2) : (o = J, 0 === vr && r(ct)), o !== J ? (hr = t, n = dt(n), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, n = v(), n !== J && (hr = t, n = ht(n)), t = n), t
        }

        function h() {
            var t;
            return e.substr(dr, 16) === pt ? (t = pt, dr += 16) : (t = J, 0 === vr && r(ft)), t === J && (e.substr(dr, 8) === gt ? (t = gt, dr += 8) : (t = J, 0 === vr && r(mt)), t === J && (e.substr(dr, 9) === vt ? (t = vt, dr += 9) : (t = J, 0 === vr && r(yt)), t === J && (e.substr(dr, 5) === bt ? (t = bt, dr += 5) : (t = J, 0 === vr && r(wt)), t === J && (e.substr(dr, 18) === xt ? (t = xt, dr += 18) : (t = J, 0 === vr && r(Et)), t === J && (e.substr(dr, 10) === Tt ? (t = Tt, dr += 10) : (t = J, 0 === vr && r(kt)), t === J && (e.substr(dr, 17) === _t ? (t = _t, dr += 17) : (t = J, 0 === vr && r(Dt)), t === J && (e.substr(dr, 9) === Ct ? (t = Ct, dr += 9) : (t = J, 0 === vr && r(St)), t === J && (e.substr(dr, 9) === Nt ? (t = Nt, dr += 9) : (t = J, 0 === vr && r(Mt)), t === J && (e.substr(dr, 6) === At ? (t = At, dr += 6) : (t = J, 0 === vr && r(Pt)), t === J && (e.substr(dr, 17) === Ot ? (t = Ot, dr += 17) : (t = J, 0 === vr && r(Rt)), t === J && (e.substr(dr, 9) === jt ? (t = jt, dr += 9) : (t = J, 0 === vr && r(It)), t === J && (e.substr(dr, 4) === Ft ? (t = Ft, dr += 4) : (t = J, 0 === vr && r($t)))))))))))))), t
        }

        function p() {
            var t, n, i, o, a, s, l, u;
            return t = dr, n = $(), n !== J ? (i = V(), i !== J ? (40 === e.charCodeAt(dr) ? (o = qt, dr++) : (o = J, 0 === vr && r(Vt)), o !== J ? (a = V(), a !== J ? (41 === e.charCodeAt(dr) ? (s = Lt, dr++) : (s = J, 0 === vr && r(Ut)), s !== J ? (hr = t, n = Bt(n), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, e.substr(dr, 22) === Ht ? (n = Ht, dr += 22) : (n = J, 0 === vr && r(Wt)), n !== J ? (i = V(), i !== J ? (40 === e.charCodeAt(dr) ? (o = qt, dr++) : (o = J, 0 === vr && r(Vt)), o !== J ? (a = V(), a !== J ? (s = A(), s !== J ? (l = V(), l !== J ? (41 === e.charCodeAt(dr) ? (u = Lt, dr++) : (u = J, 0 === vr && r(Ut)), u !== J ? (hr = t, n = zt(n, s), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, n = F(), n !== J && (hr = t, n = Xt(n)), t = n)), t
        }

        function f() {
            var t, n, i, o, a, s;
            return t = dr, 91 === e.charCodeAt(dr) ? (n = Yt, dr++) : (n = J, 0 === vr && r(Kt)), n !== J ? (i = V(), i !== J ? (o = y(), o !== J ? (a = V(), a !== J ? (93 === e.charCodeAt(dr) ? (s = Jt, dr++) : (s = J, 0 === vr && r(Qt)), s !== J ? (hr = t, n = Gt(o), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t
        }

        function g() {
            var t, n, i, o;
            return t = dr, e.substr(dr, 2) === ot ? (n = ot, dr += 2) : (n = J, 0 === vr && r(at)), n !== J ? (i = V(), i !== J ? (o = u(), o !== J ? (hr = t, n = Zt(o), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t
        }

        function m() {
            var t, n;
            return t = dr, e.substr(dr, 2) === en ? (n = en, dr += 2) : (n = J, 0 === vr && r(tn)), n === J && (46 === e.charCodeAt(dr) ? (n = nn, dr++) : (n = J, 0 === vr && r(rn))), n !== J && (hr = t, n = on(n)), t = n
        }

        function v() {
            var t, n;
            return t = dr, 64 === e.charCodeAt(dr) ? (n = an, dr++) : (n = J, 0 === vr && r(sn)), n === J && (n = it), n !== J && (hr = t, n = ln(n)), t = n
        }

        function y() {
            var e, t;
            return e = dr, t = k(), t !== J && (hr = e, t = Gt(t)), e = t
        }

        function b() {
            var t, n, i, o, a, s;
            return t = dr, n = I(), n !== J && (hr = t, n = un(n)), t = n, t === J && (t = dr, 40 === e.charCodeAt(dr) ? (n = qt, dr++) : (n = J, 0 === vr && r(Vt)), n !== J ? (i = V(), i !== J ? (o = y(), o !== J ? (a = V(), a !== J ? (41 === e.charCodeAt(dr) ? (s = Lt, dr++) : (s = J, 0 === vr && r(Ut)), s !== J ? (hr = t, n = Gt(o), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, n = A(), n !== J && (hr = t, n = cn(n)), t = n, t === J && (t = dr, n = P(), n !== J && (hr = t, n = dn(n)), t = n, t === J && (t = w())))), t
        }

        function w() {
            var t, n, i, o, a, s, l, u, c, d, h, p, f;
            if (t = dr, n = j(), n !== J)
                if (i = V(), i !== J)
                    if (40 === e.charCodeAt(dr) ? (o = qt, dr++) : (o = J, 0 === vr && r(Vt)), o !== J) {
                        if (a = dr, s = V(), s !== J)
                            if (l = y(), l !== J) {
                                for (u = [], c = dr, d = V(), d !== J ? (44 === e.charCodeAt(dr) ? (h = hn, dr++) : (h = J, 0 === vr && r(pn)), h !== J ? (p = V(), p !== J ? (f = y(), f !== J ? (d = [d, h, p, f], c = d) : (dr = c, c = Z)) : (dr = c, c = Z)) : (dr = c, c = Z)) : (dr = c, c = Z); c !== J;) u.push(c), c = dr, d = V(), d !== J ? (44 === e.charCodeAt(dr) ? (h = hn, dr++) : (h = J, 0 === vr && r(pn)), h !== J ? (p = V(), p !== J ? (f = y(), f !== J ? (d = [d, h, p, f], c = d) : (dr = c, c = Z)) : (dr = c, c = Z)) : (dr = c, c = Z)) : (dr = c, c = Z);
                                u !== J ? (s = [s, l, u], a = s) : (dr = a, a = Z)
                            } else dr = a, a = Z;
                        else dr = a, a = Z;
                        a === J && (a = it), a !== J ? (s = V(), s !== J ? (41 === e.charCodeAt(dr) ? (l = Lt, dr++) : (l = J, 0 === vr && r(Ut)), l !== J ? (hr = t, n = fn(n, a), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)
                    } else dr = t, t = Z;
            else dr = t, t = Z;
            else dr = t, t = Z;
            return t
        }

        function x() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = E(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (124 === e.charCodeAt(dr) ? (s = gn, dr++) : (s = J, 0 === vr && r(mn)), s !== J ? (l = V(), l !== J ? (u = E(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (124 === e.charCodeAt(dr) ? (s = gn, dr++) : (s = J, 0 === vr && r(mn)), s !== J ? (l = V(), l !== J ? (u = E(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function E() {
            var t, n, i, o, a, l, c;
            return t = dr, n = T(), n !== J ? (i = dr, o = V(), o !== J ? (e.substr(dr, 2) === ot ? (a = ot, dr += 2) : (a = J, 0 === vr && r(at)), a === J && (47 === e.charCodeAt(dr) ? (a = tt, dr++) : (a = J, 0 === vr && r(nt))), a !== J ? (l = V(), l !== J ? (c = u(), c !== J ? (o = [o, a, l, c], i = o) : (dr = i, i = Z)) : (dr = i, i = Z)) : (dr = i, i = Z)) : (dr = i, i = Z), i === J && (i = it), i !== J ? (hr = t, n = yn(n, i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, n = s(), n !== J && (hr = t, n = bn(n)), t = n), t
        }

        function T() {
            var e, t, n, i, r, o;
            if (e = dr, t = b(), t !== J) {
                for (n = [], i = dr, r = V(), r !== J ? (o = f(), o !== J ? (r = [r, o], i = r) : (dr = i, i = Z)) : (dr = i, i = Z); i !== J;) n.push(i), i = dr, r = V(), r !== J ? (o = f(), o !== J ? (r = [r, o], i = r) : (dr = i, i = Z)) : (dr = i, i = Z);
                n !== J ? (hr = e, t = wn(t, n), e = t) : (dr = e, e = Z)
            } else dr = e, e = Z;
            return e
        }

        function k() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = _(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (e.substr(dr, 2) === xn ? (s = xn, dr += 2) : (s = J, 0 === vr && r(En)), s !== J ? (l = V(), l !== J ? (u = _(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (e.substr(dr, 2) === xn ? (s = xn, dr += 2) : (s = J, 0 === vr && r(En)), s !== J ? (l = V(), l !== J ? (u = _(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function _() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = D(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (e.substr(dr, 3) === Tn ? (s = Tn, dr += 3) : (s = J, 0 === vr && r(kn)), s !== J ? (l = V(), l !== J ? (u = D(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (e.substr(dr, 3) === Tn ? (s = Tn, dr += 3) : (s = J, 0 === vr && r(kn)), s !== J ? (l = V(), l !== J ? (u = D(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function D() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = C(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (61 === e.charCodeAt(dr) ? (s = _n, dr++) : (s = J, 0 === vr && r(Dn)), s === J && (e.substr(dr, 2) === Cn ? (s = Cn, dr += 2) : (s = J, 0 === vr && r(Sn))), s !== J ? (l = V(), l !== J ? (u = C(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (61 === e.charCodeAt(dr) ? (s = _n, dr++) : (s = J, 0 === vr && r(Dn)), s === J && (e.substr(dr, 2) === Cn ? (s = Cn, dr += 2) : (s = J, 0 === vr && r(Sn))), s !== J ? (l = V(), l !== J ? (u = C(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function C() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = S(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (e.substr(dr, 2) === Nn ? (s = Nn, dr += 2) : (s = J, 0 === vr && r(Mn)), s === J && (60 === e.charCodeAt(dr) ? (s = An, dr++) : (s = J, 0 === vr && r(Pn)), s === J && (e.substr(dr, 2) === On ? (s = On, dr += 2) : (s = J, 0 === vr && r(Rn)), s === J && (62 === e.charCodeAt(dr) ? (s = jn, dr++) : (s = J, 0 === vr && r(In))))), s !== J ? (l = V(), l !== J ? (u = S(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (e.substr(dr, 2) === Nn ? (s = Nn, dr += 2) : (s = J, 0 === vr && r(Mn)), s === J && (60 === e.charCodeAt(dr) ? (s = An, dr++) : (s = J, 0 === vr && r(Pn)), s === J && (e.substr(dr, 2) === On ? (s = On, dr += 2) : (s = J, 0 === vr && r(Rn)), s === J && (62 === e.charCodeAt(dr) ? (s = jn, dr++) : (s = J, 0 === vr && r(In))))), s !== J ? (l = V(), l !== J ? (u = S(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function S() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = N(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (43 === e.charCodeAt(dr) ? (s = Fn, dr++) : (s = J, 0 === vr && r($n)), s === J && (45 === e.charCodeAt(dr) ? (s = qn, dr++) : (s = J, 0 === vr && r(Vn))), s !== J ? (l = V(), l !== J ? (u = N(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (43 === e.charCodeAt(dr) ? (s = Fn, dr++) : (s = J, 0 === vr && r($n)), s === J && (45 === e.charCodeAt(dr) ? (s = qn, dr++) : (s = J, 0 === vr && r(Vn))), s !== J ? (l = V(), l !== J ? (u = N(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function N() {
            var t, n, i, o, a, s, l, u;
            if (t = dr, n = M(), n !== J) {
                for (i = [], o = dr, a = V(), a !== J ? (s = R(), s === J && (e.substr(dr, 3) === Ln ? (s = Ln, dr += 3) : (s = J, 0 === vr && r(Un)), s === J && (e.substr(dr, 3) === Bn ? (s = Bn, dr += 3) : (s = J, 0 === vr && r(Hn)))), s !== J ? (l = V(), l !== J ? (u = M(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z); o !== J;) i.push(o), o = dr, a = V(), a !== J ? (s = R(), s === J && (e.substr(dr, 3) === Ln ? (s = Ln, dr += 3) : (s = J, 0 === vr && r(Un)), s === J && (e.substr(dr, 3) === Bn ? (s = Bn, dr += 3) : (s = J, 0 === vr && r(Hn)))), s !== J ? (l = V(), l !== J ? (u = M(), u !== J ? (a = [a, s, l, u], o = a) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z)) : (dr = o, o = Z);
                i !== J ? (hr = t, n = vn(n, i), t = n) : (dr = t, t = Z)
            } else dr = t, t = Z;
            return t
        }

        function M() {
            var t, n, i, o;
            return t = dr, n = x(), n !== J && (hr = t, n = Gt(n)), t = n, t === J && (t = dr, 45 === e.charCodeAt(dr) ? (n = qn, dr++) : (n = J, 0 === vr && r(Vn)), n !== J ? (i = V(), i !== J ? (o = M(), o !== J ? (hr = t, n = Wn(o), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z)), t
        }

        function A() {
            var t, n, i, o;
            if (t = dr, 34 === e.charCodeAt(dr) ? (n = zn, dr++) : (n = J, 0 === vr && r(Xn)), n !== J) {
                for (i = [], Yn.test(e.charAt(dr)) ? (o = e.charAt(dr), dr++) : (o = J, 0 === vr && r(Kn)); o !== J;) i.push(o), Yn.test(e.charAt(dr)) ? (o = e.charAt(dr), dr++) : (o = J, 0 === vr && r(Kn));
                i !== J ? (34 === e.charCodeAt(dr) ? (o = zn, dr++) : (o = J, 0 === vr && r(Xn)), o !== J ? (hr = t, n = Jn(i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)
            } else dr = t, t = Z; if (t === J)
                if (t = dr, 39 === e.charCodeAt(dr) ? (n = Qn, dr++) : (n = J, 0 === vr && r(Gn)), n !== J) {
                    for (i = [], Zn.test(e.charAt(dr)) ? (o = e.charAt(dr), dr++) : (o = J, 0 === vr && r(ei)); o !== J;) i.push(o), Zn.test(e.charAt(dr)) ? (o = e.charAt(dr), dr++) : (o = J, 0 === vr && r(ei));
                    i !== J ? (39 === e.charCodeAt(dr) ? (o = Qn, dr++) : (o = J, 0 === vr && r(Gn)), o !== J ? (hr = t, n = Jn(i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)
                } else dr = t, t = Z;
            return t
        }

        function P() {
            var t, n, i, o, a;
            return t = dr, n = O(), n !== J ? (i = dr, 46 === e.charCodeAt(dr) ? (o = nn, dr++) : (o = J, 0 === vr && r(rn)), o !== J ? (a = O(), a === J && (a = it), a !== J ? (o = [o, a], i = o) : (dr = i, i = Z)) : (dr = i, i = Z), i === J && (i = it), i !== J ? (hr = t, n = ti(n, i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, 46 === e.charCodeAt(dr) ? (n = nn, dr++) : (n = J, 0 === vr && r(rn)), n !== J ? (i = O(), i !== J ? (hr = t, n = ni(i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)), t
        }

        function O() {
            var t, n, i;
            if (t = dr, n = [], ii.test(e.charAt(dr)) ? (i = e.charAt(dr), dr++) : (i = J, 0 === vr && r(ri)), i !== J)
                for (; i !== J;) n.push(i), ii.test(e.charAt(dr)) ? (i = e.charAt(dr), dr++) : (i = J, 0 === vr && r(ri));
            else n = Z;
            return n !== J && (hr = t, n = oi(n)), t = n
        }

        function R() {
            var t;
            return 42 === e.charCodeAt(dr) ? (t = ai, dr++) : (t = J, 0 === vr && r(si)), t
        }

        function j() {
            var e, t, n;
            return e = dr, t = L(), t !== J ? (hr = dr, n = li(t), n = n ? ui : Z, n !== J ? (hr = e, t = ci(t), e = t) : (dr = e, e = Z)) : (dr = e, e = Z), e
        }

        function I() {
            var t, n, i;
            return t = dr, 36 === e.charCodeAt(dr) ? (n = di, dr++) : (n = J, 0 === vr && r(hi)), n !== J ? (i = L(), i !== J ? (hr = t, n = pi(i), t = n) : (dr = t, t = Z)) : (dr = t, t = Z), t
        }

        function F() {
            var t, n, i, o;
            return t = dr, 42 === e.charCodeAt(dr) ? (n = ai, dr++) : (n = J, 0 === vr && r(si)), n !== J && (hr = t, n = fi()), t = n, t === J && (t = dr, n = H(), n !== J ? (58 === e.charCodeAt(dr) ? (i = gi, dr++) : (i = J, 0 === vr && r(mi)), i !== J ? (42 === e.charCodeAt(dr) ? (o = ai, dr++) : (o = J, 0 === vr && r(si)), o !== J ? (hr = t, n = vi(n), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t === J && (t = dr, n = L(), n !== J && (hr = t, n = yi(n)), t = n)), t
        }

        function $() {
            var t;
            return e.substr(dr, 7) === bi ? (t = bi, dr += 7) : (t = J, 0 === vr && r(wi)), t === J && (e.substr(dr, 4) === xi ? (t = xi, dr += 4) : (t = J, 0 === vr && r(Ei)), t === J && (e.substr(dr, 22) === Ht ? (t = Ht, dr += 22) : (t = J, 0 === vr && r(Wt)), t === J && (e.substr(dr, 4) === Ti ? (t = Ti, dr += 4) : (t = J, 0 === vr && r(ki))))), t
        }

        function q() {
            var t, n;
            if (t = [], _i.test(e.charAt(dr)) ? (n = e.charAt(dr), dr++) : (n = J, 0 === vr && r(Di)), n !== J)
                for (; n !== J;) t.push(n), _i.test(e.charAt(dr)) ? (n = e.charAt(dr), dr++) : (n = J, 0 === vr && r(Di));
            else t = Z;
            return t
        }

        function V() {
            var e;
            return e = q(), e === J && (e = it), e
        }

        function L() {
            var e, t;
            return e = dr, t = U(), t === J && (t = B()), t !== J && (hr = e, t = Ci(t)), e = t
        }

        function U() {
            var t, n, i, o;
            return t = dr, n = H(), n !== J ? (58 === e.charCodeAt(dr) ? (i = gi, dr++) : (i = J, 0 === vr && r(mi)), i !== J ? (o = H(), o !== J ? (hr = t, n = Si(n, o), t = n) : (dr = t, t = Z)) : (dr = t, t = Z)) : (dr = t, t = Z), t
        }

        function B() {
            var e, t;
            return e = dr, t = H(), t !== J && (hr = e, t = Ni(t)), e = t
        }

        function H() {
            var e;
            return e = X()
        }

        function W() {
            var t;
            return Mi.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Ai)), t === J && (95 === e.charCodeAt(dr) ? (t = Pi, dr++) : (t = J, 0 === vr && r(Oi)), t === J && (Ri.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(ji)), t === J && (Ii.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Fi)), t === J && ($i.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(qi)), t === J && (Vi.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Li)), t === J && (Ui.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Bi)), t === J && (Hi.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Wi)), t === J && (zi.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Xi)), t === J && (Yi.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Ki)), t === J && (Ji.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Qi)), t === J && (Gi.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(Zi)), t === J && (er.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(tr)), t === J && (nr.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(ir))))))))))))))), t
        }

        function z() {
            var t;
            return t = W(), t === J && (45 === e.charCodeAt(dr) ? (t = qn, dr++) : (t = J, 0 === vr && r(Vn)), t === J && (46 === e.charCodeAt(dr) ? (t = nn, dr++) : (t = J, 0 === vr && r(rn)), t === J && (ii.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(ri)), t === J && (rr.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(or)), t === J && (ar.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(sr)), t === J && (lr.test(e.charAt(dr)) ? (t = e.charAt(dr), dr++) : (t = J, 0 === vr && r(ur)))))))), t
        }

        function X() {
            var e, t, n, i;
            if (e = dr, t = W(), t !== J) {
                for (n = [], i = z(); i !== J;) n.push(i), i = z();
                n !== J ? (hr = e, t = cr(t, n), e = t) : (dr = e, e = Z)
            } else dr = e, e = Z;
            return e
        }
        var Y, K = arguments.length > 1 ? arguments[1] : {},
            J = {},
            Q = {
                XPath: a
            },
            G = a,
            Z = J,
            et = function(e) {
                return {
                    tree: e,
                    nsPrefixes: xr
                }
            },
            tt = "/",
            nt = {
                type: "literal",
                value: "/",
                description: '"/"'
            },
            it = null,
            rt = function(e) {
                return {
                    type: "/",
                    args: [null, e ? e[1] : null]
                }
            },
            ot = "//",
            at = {
                type: "literal",
                value: "//",
                description: '"//"'
            },
            st = function(e, t) {
                var n;
                for (n = 0; n < t.length; n++) e = kr(t[n][1], e, t[n][3]);
                return e
            },
            lt = function(e, t, n) {
                return wr({
                    type: "step",
                    args: [e, t]
                }, e, n, 1)
            },
            ut = "::",
            ct = {
                type: "literal",
                value: "::",
                description: '"::"'
            },
            dt = function(e) {
                return e
            },
            ht = function(e) {
                return e.length ? e : "child"
            },
            pt = "ancestor-or-self",
            ft = {
                type: "literal",
                value: "ancestor-or-self",
                description: '"ancestor-or-self"'
            },
            gt = "ancestor",
            mt = {
                type: "literal",
                value: "ancestor",
                description: '"ancestor"'
            },
            vt = "attribute",
            yt = {
                type: "literal",
                value: "attribute",
                description: '"attribute"'
            },
            bt = "child",
            wt = {
                type: "literal",
                value: "child",
                description: '"child"'
            },
            xt = "descendant-or-self",
            Et = {
                type: "literal",
                value: "descendant-or-self",
                description: '"descendant-or-self"'
            },
            Tt = "descendant",
            kt = {
                type: "literal",
                value: "descendant",
                description: '"descendant"'
            },
            _t = "following-sibling",
            Dt = {
                type: "literal",
                value: "following-sibling",
                description: '"following-sibling"'
            },
            Ct = "following",
            St = {
                type: "literal",
                value: "following",
                description: '"following"'
            },
            Nt = "namespace",
            Mt = {
                type: "literal",
                value: "namespace",
                description: '"namespace"'
            },
            At = "parent",
            Pt = {
                type: "literal",
                value: "parent",
                description: '"parent"'
            },
            Ot = "preceding-sibling",
            Rt = {
                type: "literal",
                value: "preceding-sibling",
                description: '"preceding-sibling"'
            },
            jt = "preceding",
            It = {
                type: "literal",
                value: "preceding",
                description: '"preceding"'
            },
            Ft = "self",
            $t = {
                type: "literal",
                value: "self",
                description: '"self"'
            },
            qt = "(",
            Vt = {
                type: "literal",
                value: "(",
                description: '"("'
            },
            Lt = ")",
            Ut = {
                type: "literal",
                value: ")",
                description: '")"'
            },
            Bt = function(e) {
                return {
                    type: "nodeType",
                    args: [e, []]
                }
            },
            Ht = "processing-instruction",
            Wt = {
                type: "literal",
                value: "processing-instruction",
                description: '"processing-instruction"'
            },
            zt = function(e, t) {
                return {
                    type: "nodeType",
                    args: [e, [t]]
                }
            },
            Xt = function(e) {
                return e
            },
            Yt = "[",
            Kt = {
                type: "literal",
                value: "[",
                description: '"["'
            },
            Jt = "]",
            Qt = {
                type: "literal",
                value: "]",
                description: '"]"'
            },
            Gt = function(e) {
                return e
            },
            Zt = function(e) {
                return kr("//", null, e)
            },
            en = "..",
            tn = {
                type: "literal",
                value: "..",
                description: '".."'
            },
            nn = ".",
            rn = {
                type: "literal",
                value: ".",
                description: '"."'
            },
            on = function(e) {
                var t = {
                    type: "step",
                    args: ["self", {
                        type: "nodeType",
                        args: ["node", []]
                    }]
                };
                return ".." == e && (t.args[0] = "parent"), t
            },
            an = "@",
            sn = {
                type: "literal",
                value: "@",
                description: '"@"'
            },
            ln = function(e) {
                return e ? "attribute" : ""
            },
            un = function(e) {
                return e
            },
            cn = function(e) {
                return e
            },
            dn = function(e) {
                return e
            },
            hn = ",",
            pn = {
                type: "literal",
                value: ",",
                description: '","'
            },
            fn = function(e, t) {
                var n, i = [];
                if (t)
                    for (i.push(t[1]), n = 0; n < t[2].length; n++) i.push(t[2][n][3]);
                return {
                    type: "function",
                    args: [e, i]
                }
            },
            gn = "|",
            mn = {
                type: "literal",
                value: "|",
                description: '"|"'
            },
            vn = function(e, t) {
                return br(e, t, 1, 3)
            },
            yn = function(e, t) {
                return t ? kr(t[1], e, t[3]) : e
            },
            bn = function(e) {
                return e
            },
            wn = function(e, t) {
                return wr(e, "child", t, 1)
            },
            xn = "or",
            En = {
                type: "literal",
                value: "or",
                description: '"or"'
            },
            Tn = "and",
            kn = {
                type: "literal",
                value: "and",
                description: '"and"'
            },
            _n = "=",
            Dn = {
                type: "literal",
                value: "=",
                description: '"="'
            },
            Cn = "!=",
            Sn = {
                type: "literal",
                value: "!=",
                description: '"!="'
            },
            Nn = "<=",
            Mn = {
                type: "literal",
                value: "<=",
                description: '"<="'
            },
            An = "<",
            Pn = {
                type: "literal",
                value: "<",
                description: '"<"'
            },
            On = ">=",
            Rn = {
                type: "literal",
                value: ">=",
                description: '">="'
            },
            jn = ">",
            In = {
                type: "literal",
                value: ">",
                description: '">"'
            },
            Fn = "+",
            $n = {
                type: "literal",
                value: "+",
                description: '"+"'
            },
            qn = "-",
            Vn = {
                type: "literal",
                value: "-",
                description: '"-"'
            },
            Ln = "div",
            Un = {
                type: "literal",
                value: "div",
                description: '"div"'
            },
            Bn = "mod",
            Hn = {
                type: "literal",
                value: "mod",
                description: '"mod"'
            },
            Wn = function(e) {
                return {
                    type: "*",
                    args: [{
                            type: "number",
                            args: [-1]
                        },
                        e
                    ]
                }
            },
            zn = '"',
            Xn = {
                type: "literal",
                value: '"',
                description: '"\\""'
            },
            Yn = /^[^"]/,
            Kn = {
                type: "class",
                value: '[^"]',
                description: '[^"]'
            },
            Jn = function(e) {
                return {
                    type: "string",
                    args: [e.join("")]
                }
            },
            Qn = "'",
            Gn = {
                type: "literal",
                value: "'",
                description: '"\'"'
            },
            Zn = /^[^']/,
            ei = {
                type: "class",
                value: "[^']",
                description: "[^']"
            },
            ti = function(e, t) {
                return {
                    type: "number",
                    args: [t ? parseFloat(e + "." + t[1]) : parseInt(e)]
                }
            },
            ni = function(e) {
                return {
                    type: "number",
                    args: [parseFloat("." + e)]
                }
            },
            ii = /^[0-9]/,
            ri = {
                type: "class",
                value: "[0-9]",
                description: "[0-9]"
            },
            oi = function(e) {
                return e.join("")
            },
            ai = "*",
            si = {
                type: "literal",
                value: "*",
                description: '"*"'
            },
            li = function() {
                var e;
                if (null === yr.args[0])
                    for (e = 0; e < Tr.length; e++)
                        if (yr.args[1] == Tr[e]) return !1;
                return !0
            },
            ui = void 0,
            ci = function(e) {
                return "" === e.args[0] ? e = {
                    type: e.type,
                    args: [null, e.args[1]]
                } : Er(e.args[0]), e
            },
            di = "$",
            hi = {
                type: "literal",
                value: "$",
                description: '"$"'
            },
            pi = function(e) {
                return Er(e.args[0]), {
                    type: "$",
                    args: [e]
                }
            },
            fi = function() {
                return {
                    type: "name",
                    args: [null, null]
                }
            },
            gi = ":",
            mi = {
                type: "literal",
                value: ":",
                description: '":"'
            },
            vi = function(e) {
                return Er(e), {
                    type: "name",
                    args: [e, null]
                }
            },
            yi = function(e) {
                return Er(e.args[0]), e
            },
            bi = "comment",
            wi = {
                type: "literal",
                value: "comment",
                description: '"comment"'
            },
            xi = "text",
            Ei = {
                type: "literal",
                value: "text",
                description: '"text"'
            },
            Ti = "node",
            ki = {
                type: "literal",
                value: "node",
                description: '"node"'
            },
            _i = /^[ \t\r\n]/,
            Di = {
                type: "class",
                value: "[ \\t\\r\\n]",
                description: "[ \\t\\r\\n]"
            },
            Ci = function(e) {
                return yr = e, e
            },
            Si = function(e, t) {
                return {
                    type: "name",
                    args: [e, t]
                }
            },
            Ni = function(e) {
                return {
                    type: "name",
                    args: [null, e]
                }
            },
            Mi = /^[A-Z]/,
            Ai = {
                type: "class",
                value: "[A-Z]",
                description: "[A-Z]"
            },
            Pi = "_",
            Oi = {
                type: "literal",
                value: "_",
                description: '"_"'
            },
            Ri = /^[a-z]/,
            ji = {
                type: "class",
                value: "[a-z]",
                description: "[a-z]"
            },
            Ii = /^[\xC0-\xD6]/,
            Fi = {
                type: "class",
                value: "[\\xC0-\\xD6]",
                description: "[\\xC0-\\xD6]"
            },
            $i = /^[\xD8-\xF6]/,
            qi = {
                type: "class",
                value: "[\\xD8-\\xF6]",
                description: "[\\xD8-\\xF6]"
            },
            Vi = /^[\xF8-\u02FF]/,
            Li = {
                type: "class",
                value: "[\\xF8-\\u02FF]",
                description: "[\\xF8-\\u02FF]"
            },
            Ui = /^[\u0370-\u037D]/,
            Bi = {
                type: "class",
                value: "[\\u0370-\\u037D]",
                description: "[\\u0370-\\u037D]"
            },
            Hi = /^[\u037F-\u1FFF]/,
            Wi = {
                type: "class",
                value: "[\\u037F-\\u1FFF]",
                description: "[\\u037F-\\u1FFF]"
            },
            zi = /^[\u200C-\u200D]/,
            Xi = {
                type: "class",
                value: "[\\u200C-\\u200D]",
                description: "[\\u200C-\\u200D]"
            },
            Yi = /^[\u2070-\u218F]/,
            Ki = {
                type: "class",
                value: "[\\u2070-\\u218F]",
                description: "[\\u2070-\\u218F]"
            },
            Ji = /^[\u2C00-\u2FEF]/,
            Qi = {
                type: "class",
                value: "[\\u2C00-\\u2FEF]",
                description: "[\\u2C00-\\u2FEF]"
            },
            Gi = /^[\u3001-\uD7FF]/,
            Zi = {
                type: "class",
                value: "[\\u3001-\\uD7FF]",
                description: "[\\u3001-\\uD7FF]"
            },
            er = /^[\uF900-\uFDCF]/,
            tr = {
                type: "class",
                value: "[\\uF900-\\uFDCF]",
                description: "[\\uF900-\\uFDCF]"
            },
            nr = /^[\uFDF0-\uFFFD]/,
            ir = {
                type: "class",
                value: "[\\uFDF0-\\uFFFD]",
                description: "[\\uFDF0-\\uFFFD]"
            },
            rr = /^[\xB7]/,
            or = {
                type: "class",
                value: "[\\xB7]",
                description: "[\\xB7]"
            },
            ar = /^[\u0300-\u036F]/,
            sr = {
                type: "class",
                value: "[\\u0300-\\u036F]",
                description: "[\\u0300-\\u036F]"
            },
            lr = /^[\u203F-\u2040]/,
            ur = {
                type: "class",
                value: "[\\u203F-\\u2040]",
                description: "[\\u203F-\\u2040]"
            },
            cr = function(e, t) {
                return e + t.join("")
            },
            dr = 0,
            hr = 0,
            pr = 0,
            fr = {
                line: 1,
                column: 1,
                seenCR: !1
            },
            gr = 0,
            mr = [],
            vr = 0;
        if ("startRule" in K) {
            if (!(K.startRule in Q)) throw new Error("Can't start parsing from rule \"" + K.startRule + '".');
            G = Q[K.startRule]
        }
        var yr, br = function(e, t, n, i) {
                var r, o, a = {
                    type: "",
                    args: []
                };
                for (a.args.push(e), r = 0; r < t.length; r++) {
                    switch (typeof n) {
                        case "string":
                            a.type = n;
                            break;
                        case "object":
                            for (a.type = t[r][n[0]], o = 1; o < n.length; o++) a.type = a.type[n[o]];
                            break;
                        default:
                            a.type = t[r][n]
                    }
                    a.args.push("undefined" == typeof i ? t[r] : t[r][i]), a = {
                        type: "",
                        args: [a]
                    }
                }
                return a.args[0]
            },
            wr = function(e, t, n, r) {
                var o = [];
                if (n.length < 1) return e;
                for (i = 0; i < n.length; i++) o.push(n[i][r]);
                return {
                    type: "predicate",
                    args: [t, e, o]
                }
            },
            xr = [],
            Er = function(e) {
                var t, n = !1;
                if (null !== e) {
                    for (t = 0; t < xr.length; t++)
                        if (xr[t] === e) {
                            n = !0;
                            break
                        }
                    n || xr.push(e)
                }
            },
            Tr = ["comment", "text", "processing-instruction", "node"],
            kr = function(e, t, n) {
                return "/" == e ? {
                    type: "/",
                    args: [t, n]
                } : {
                    type: "/",
                    args: [{
                            type: "/",
                            args: [t, {
                                type: "step",
                                args: ["descendant-or-self", {
                                    type: "nodeType",
                                    args: ["node", []]
                                }]
                            }]
                        },
                        n
                    ]
                }
            };
        if (Y = G(), Y !== J && dr === e.length) return Y;
        throw Y !== J && dr < e.length && r({
            type: "end",
            description: "end of input"
        }), o(null, mr, gr)
    }
    return e(t, Error), {
        SyntaxError: t,
        parse: n
    }
}(), define("xpath", function(e) {
    return function() {
        var t;
        return t || e.XPathJS
    }
}(this)), function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = e.length,
            n = et.type(e);
        return "function" === n || et.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function i(e, t, n) {
        if (et.isFunction(t)) return et.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return et.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (st.test(t)) return et.filter(t, e, n);
            t = et.filter(t, e)
        }
        return et.grep(e, function(e) {
            return z.call(t, e) >= 0 !== n
        })
    }

    function r(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function o(e) {
        var t = ft[e] = {};
        return et.each(e.match(pt) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        G.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), et.ready()
    }

    function s() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = et.expando + Math.random()
    }

    function l(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (i = "data-" + t.replace(wt, "-$1").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : bt.test(n) ? et.parseJSON(n) : n
                } catch (r) {}
                yt.set(e, t, n)
            } else n = void 0;
        return n
    }

    function u() {
        return !0
    }

    function c() {
        return !1
    }

    function d() {
        try {
            return G.activeElement
        } catch (e) {}
    }

    function h(e, t) {
        return et.nodeName(e, "table") && et.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function p(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function f(e) {
        var t = It.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function g(e, t) {
        for (var n = 0, i = e.length; i > n; n++) vt.set(e[n], "globalEval", !t || vt.get(t[n], "globalEval"))
    }

    function m(e, t) {
        var n, i, r, o, a, s, l, u;
        if (1 === t.nodeType) {
            if (vt.hasData(e) && (o = vt.access(e), a = vt.set(t, o), u = o.events)) {
                delete a.handle, a.events = {};
                for (r in u)
                    for (n = 0, i = u[r].length; i > n; n++) et.event.add(t, r, u[r][n])
            }
            yt.hasData(e) && (s = yt.access(e), l = et.extend({}, s), yt.set(t, l))
        }
    }

    function v(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && et.nodeName(e, t) ? et.merge([e], n) : n
    }

    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && kt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function b(t, n) {
        var i = et(n.createElement(t)).appendTo(n.body),
            r = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(i[0]).display : et.css(i[0], "display");
        return i.detach(), r
    }

    function w(e) {
        var t = G,
            n = Vt[e];
        return n || (n = b(e, t), "none" !== n && n || (qt = (qt || et("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = qt[0].contentDocument, t.write(), t.close(), n = b(e, t), qt.detach()), Vt[e] = n), n
    }

    function x(e, t, n) {
        var i, r, o, a, s = e.style;
        return n = n || Bt(e), n && (a = n.getPropertyValue(t) || n[t]), n && ("" !== a || et.contains(e.ownerDocument, e) || (a = et.style(e, t)), Ut.test(a) && Lt.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function E(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function T(e, t) {
        if (t in e) return t;
        for (var n = t[0].toUpperCase() + t.slice(1), i = t, r = Kt.length; r--;)
            if (t = Kt[r] + n, t in e) return t;
        return i
    }

    function k(e, t, n) {
        var i = Wt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function _(e, t, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += et.css(e, n + Et[o], !0, r)), i ? ("content" === n && (a -= et.css(e, "padding" + Et[o], !0, r)), "margin" !== n && (a -= et.css(e, "border" + Et[o] + "Width", !0, r))) : (a += et.css(e, "padding" + Et[o], !0, r), "padding" !== n && (a += et.css(e, "border" + Et[o] + "Width", !0, r)));
        return a
    }

    function D(e, t, n) {
        var i = !0,
            r = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = Bt(e),
            a = "border-box" === et.css(e, "boxSizing", !1, o);
        if (0 >= r || null == r) {
            if (r = x(e, t, o), (0 > r || null == r) && (r = e.style[t]), Ut.test(r)) return r;
            i = a && (Q.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + _(e, t, n || (a ? "border" : "content"), i, o) + "px"
    }

    function C(e, t) {
        for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = vt.get(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Tt(i) && (o[a] = vt.access(i, "olddisplay", w(i.nodeName)))) : o[a] || (r = Tt(i), (n && "none" !== n || !r) && vt.set(i, "olddisplay", r ? n : et.css(i, "display"))));
        for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function S(e, t, n, i, r) {
        return new S.prototype.init(e, t, n, i, r)
    }

    function N() {
        return setTimeout(function() {
            Jt = void 0
        }), Jt = et.now()
    }

    function M(e, t) {
        var n, i = 0,
            r = {
                height: e
            };
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Et[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function A(e, t, n) {
        for (var i, r = (nn[t] || []).concat(nn["*"]), o = 0, a = r.length; a > o; o++)
            if (i = r[o].call(n, t, e)) return i
    }

    function P(e, t, n) {
        var i, r, o, a, s, l, u, c = this,
            d = {},
            h = e.style,
            p = e.nodeType && Tt(e),
            f = vt.get(e, "fxshow");
        n.queue || (s = et._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
            s.unqueued || l()
        }), s.unqueued++, c.always(function() {
            c.always(function() {
                s.unqueued--, et.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], u = et.css(e, "display"), "none" === u && (u = w(e.nodeName)), "inline" === u && "none" === et.css(e, "float") && (h.display = "inline-block")), n.overflow && (h.overflow = "hidden", c.always(function() {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (r = t[i], Gt.exec(r)) {
                if (delete t[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                    if ("show" !== r || !f || void 0 === f[i]) continue;
                    p = !0
                }
                d[i] = f && f[i] || et.style(e, i)
            }
        if (!et.isEmptyObject(d)) {
            f ? "hidden" in f && (p = f.hidden) : f = vt.access(e, "fxshow", {}), o && (f.hidden = !p), p ? et(e).show() : c.done(function() {
                et(e).hide()
            }), c.done(function() {
                var t;
                vt.remove(e, "fxshow");
                for (t in d) et.style(e, t, d[t])
            });
            for (i in d) a = A(p ? f[i] : 0, i, c), i in f || (f[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function O(e, t) {
        var n, i, r, o, a;
        for (n in e)
            if (i = et.camelCase(n), r = t[i], o = e[n], et.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = et.cssHooks[i], a && "expand" in a) {
                o = a.expand(o), delete e[i];
                for (n in o) n in e || (e[n] = o[n], t[n] = r)
            } else t[i] = r
    }

    function R(e, t, n) {
        var i, r, o = 0,
            a = tn.length,
            s = et.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var t = Jt || N(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(o);
                return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
            },
            u = s.promise({
                elem: e,
                props: et.extend({}, t),
                opts: et.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Jt || N(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = et.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? u.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; i > n; n++) u.tweens[n].run(1);
                    return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
                }
            }),
            c = u.props;
        for (O(c, u.opts.specialEasing); a > o; o++)
            if (i = tn[o].call(u, e, c, u.opts)) return i;
        return et.map(c, A, u), et.isFunction(u.opts.start) && u.opts.start.call(e, u), et.fx.timer(et.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function j(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, r = 0,
                o = t.toLowerCase().match(pt) || [];
            if (et.isFunction(n))
                for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function I(e, t, n, i) {
        function r(s) {
            var l;
            return o[s] = !0, et.each(e[s] || [], function(e, s) {
                var u = s(t, n, i);
                return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }
        var o = {},
            a = e === En;
        return r(t.dataTypes[0]) || !o["*"] && r("*")
    }

    function F(e, t) {
        var n, i, r = et.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
        return i && et.extend(!0, e, i), e
    }

    function $(e, t, n) {
        for (var i, r, o, a, s = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (r in s)
                if (s[r] && s[r].test(i)) {
                    l.unshift(r);
                    break
                }
        if (l[0] in n) o = l[0];
        else {
            for (r in n) {
                if (!l[0] || e.converters[r + " " + l[0]]) {
                    o = r;
                    break
                }
                a || (a = r)
            }
            o = o || a
        }
        return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
    }

    function q(e, t, n, i) {
        var r, o, a, s, l, u = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                if ("*" === o) o = l;
                else if ("*" !== l && l !== o) {
            if (a = u[l + " " + o] || u["* " + o], !a)
                for (r in u)
                    if (s = r.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                        a === !0 ? a = u[r] : u[r] !== !0 && (o = s[0], c.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: a ? d : "No conversion from " + l + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function V(e, t, n, i) {
        var r;
        if (et.isArray(t)) et.each(t, function(t, r) {
            n || Dn.test(e) ? i(e, r) : V(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
        });
        else if (n || "object" !== et.type(t)) i(e, t);
        else
            for (r in t) V(e + "[" + r + "]", t[r], n, i)
    }

    function L(e) {
        return et.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var U = [],
        B = U.slice,
        H = U.concat,
        W = U.push,
        z = U.indexOf,
        X = {},
        Y = X.toString,
        K = X.hasOwnProperty,
        J = "".trim,
        Q = {},
        G = e.document,
        Z = "2.1.0",
        et = function(e, t) {
            return new et.fn.init(e, t)
        },
        tt = /^-ms-/,
        nt = /-([\da-z])/gi,
        it = function(e, t) {
            return t.toUpperCase()
        };
    et.fn = et.prototype = {
        jquery: Z,
        constructor: et,
        selector: "",
        length: 0,
        toArray: function() {
            return B.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : B.call(this)
        },
        pushStack: function(e) {
            var t = et.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return et.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(et.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(B.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: W,
        sort: U.sort,
        splice: U.splice
    }, et.extend = et.fn.extend = function() {
        var e, t, n, i, r, o, a = arguments[0] || {},
            s = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || et.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], i = e[t], a !== i && (u && i && (et.isPlainObject(i) || (r = et.isArray(i))) ? (r ? (r = !1, o = n && et.isArray(n) ? n : []) : o = n && et.isPlainObject(n) ? n : {}, a[t] = et.extend(u, o, i)) : void 0 !== i && (a[t] = i));
        return a
    }, et.extend({
        expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === et.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return e - parseFloat(e) >= 0
        },
        isPlainObject: function(e) {
            if ("object" !== et.type(e) || e.nodeType || et.isWindow(e)) return !1;
            try {
                if (e.constructor && !K.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            return !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? X[Y.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var t, n = eval;
            e = et.trim(e), e && (1 === e.indexOf("use strict") ? (t = G.createElement("script"), t.text = e, G.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(tt, "ms-").replace(nt, it)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, i) {
            var r, o = 0,
                a = e.length,
                s = n(e);
            if (i) {
                if (s)
                    for (; a > o && (r = t.apply(e[o], i), r !== !1); o++);
                else
                    for (o in e)
                        if (r = t.apply(e[o], i), r === !1) break
            } else if (s)
                for (; a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++);
            else
                for (o in e)
                    if (r = t.call(e[o], o, e[o]), r === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : J.call(e)
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? et.merge(i, "string" == typeof e ? [e] : e) : W.call(i, e)), i
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : z.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, r = e.length; n > i; i++) e[r++] = t[i];
            return e.length = r, e
        },
        grep: function(e, t, n) {
            for (var i, r = [], o = 0, a = e.length, s = !n; a > o; o++) i = !t(e[o], o), i !== s && r.push(e[o]);
            return r
        },
        map: function(e, t, i) {
            var r, o = 0,
                a = e.length,
                s = n(e),
                l = [];
            if (s)
                for (; a > o; o++) r = t(e[o], o, i), null != r && l.push(r);
            else
                for (o in e) r = t(e[o], o, i), null != r && l.push(r);
            return H.apply([], l)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, r;
            return "string" == typeof t && (n = e[t], t = e, e = n), et.isFunction(e) ? (i = B.call(arguments, 2), r = function() {
                return e.apply(t || this, i.concat(B.call(arguments)))
            }, r.guid = e.guid = e.guid || et.guid++, r) : void 0
        },
        now: Date.now,
        support: Q
    }), et.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        X["[object " + t + "]"] = t.toLowerCase()
    });
    var rt = function(e) {
        function t(e, t, n, i) {
            var r, o, a, s, l, u, d, f, g, m;
            if ((t ? t.ownerDocument || t : V) !== P && A(t), t = t || P, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (s = t.nodeType) && 9 !== s) return [];
            if (R && !i) {
                if (r = yt.exec(e))
                    if (a = r[1]) {
                        if (9 === s) {
                            if (o = t.getElementById(a), !o || !o.parentNode) return n;
                            if (o.id === a) return n.push(o), n
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && $(t, o) && o.id === a) return n.push(o), n
                    } else {
                        if (r[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = r[3]) && T.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(a)), n
                    }
                if (T.qsa && (!j || !j.test(e))) {
                    if (f = d = q, g = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (u = h(e), (d = t.getAttribute("id")) ? f = d.replace(wt, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = u.length; l--;) u[l] = f + p(u[l]);
                        g = bt.test(e) && c(t.parentNode) || t, m = u.join(",")
                    }
                    if (m) try {
                        return Z.apply(n, g.querySelectorAll(m)), n
                    } catch (v) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return x(e.replace(lt, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[q] = !0, e
        }

        function r(e) {
            var t = P.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), i = e.length; i--;) k.attrHandle[n[i]] = t
        }

        function a(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }

        function c(e) {
            return e && typeof e.getElementsByTagName !== X && e
        }

        function d() {}

        function h(e, n) {
            var i, r, o, a, s, l, u, c = H[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, l = [], u = k.preFilter; s;) {
                (!i || (r = ut.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = ct.exec(s)) && (i = r.shift(), o.push({
                    value: i,
                    type: r[0].replace(lt, " ")
                }), s = s.slice(i.length));
                for (a in k.filter) !(r = ft[a].exec(s)) || u[a] && !(r = u[a](r)) || (i = r.shift(), o.push({
                    value: i,
                    type: a,
                    matches: r
                }), s = s.slice(i.length));
                if (!i) break
            }
            return n ? s.length : s ? t.error(e) : H(e, l).slice(0)
        }

        function p(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir,
                r = n && "parentNode" === i,
                o = U++;
            return t.first ? function(t, n, o) {
                for (; t = t[i];)
                    if (1 === t.nodeType || r) return e(t, n, o)
            } : function(t, n, a) {
                var s, l, u = [L, o];
                if (a) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || r) && e(t, n, a)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || r) {
                            if (l = t[q] || (t[q] = {}), (s = l[i]) && s[0] === L && s[1] === o) return u[2] = s[2];
                            if (l[i] = u, u[2] = e(t, n, a)) return !0
                        }
            }
        }

        function g(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var r = e.length; r--;)
                    if (!e[r](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function m(e, t, n, i, r) {
            for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), u && t.push(s));
            return a
        }

        function v(e, t, n, r, o, a) {
            return r && !r[q] && (r = v(r)), o && !o[q] && (o = v(o, a)), i(function(i, a, s, l) {
                var u, c, d, h = [],
                    p = [],
                    f = a.length,
                    g = i || w(t || "*", s.nodeType ? [s] : s, []),
                    v = !e || !i && t ? g : m(g, h, e, s, l),
                    y = n ? o || (i ? e : f || r) ? [] : a : v;
                if (n && n(v, y, s, l), r)
                    for (u = m(y, p), r(u, [], s, l), c = u.length; c--;)(d = u[c]) && (y[p[c]] = !(v[p[c]] = d));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = y.length; c--;)(d = y[c]) && u.push(v[c] = d);
                            o(null, y = [], u, l)
                        }
                        for (c = y.length; c--;)(d = y[c]) && (u = o ? tt.call(i, d) : h[c]) > -1 && (i[u] = !(a[u] = d))
                    }
                } else y = m(y === a ? y.splice(f, y.length) : y), o ? o(null, a, y, l) : Z.apply(a, y)
            })
        }

        function y(e) {
            for (var t, n, i, r = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, l = f(function(e) {
                return e === t
            }, a, !0), u = f(function(e) {
                return tt.call(t, e) > -1
            }, a, !0), c = [
                function(e, n, i) {
                    return !o && (i || n !== S) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i))
                }
            ]; r > s; s++)
                if (n = k.relative[e[s].type]) c = [f(g(c), n)];
                else {
                    if (n = k.filter[e[s].type].apply(null, e[s].matches), n[q]) {
                        for (i = ++s; r > i && !k.relative[e[i].type]; i++);
                        return v(s > 1 && g(c), s > 1 && p(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(lt, "$1"), n, i > s && y(e.slice(s, i)), r > i && y(e = e.slice(i)), r > i && p(e))
                    }
                    c.push(n)
                }
            return g(c)
        }

        function b(e, n) {
            var r = n.length > 0,
                o = e.length > 0,
                a = function(i, a, s, l, u) {
                    var c, d, h, p = 0,
                        f = "0",
                        g = i && [],
                        v = [],
                        y = S,
                        b = i || o && k.find.TAG("*", u),
                        w = L += null == y ? 1 : Math.random() || .1,
                        x = b.length;
                    for (u && (S = a !== P && a); f !== x && null != (c = b[f]); f++) {
                        if (o && c) {
                            for (d = 0; h = e[d++];)
                                if (h(c, a, s)) {
                                    l.push(c);
                                    break
                                }
                            u && (L = w)
                        }
                        r && ((c = !h && c) && p--, i && g.push(c))
                    }
                    if (p += f, r && f !== p) {
                        for (d = 0; h = n[d++];) h(g, v, a, s);
                        if (i) {
                            if (p > 0)
                                for (; f--;) g[f] || v[f] || (v[f] = Q.call(l));
                            v = m(v)
                        }
                        Z.apply(l, v), u && !i && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                    }
                    return u && (L = w, S = y), g
                };
            return r ? i(a) : a
        }

        function w(e, n, i) {
            for (var r = 0, o = n.length; o > r; r++) t(e, n[r], i);
            return i
        }

        function x(e, t, n, i) {
            var r, o, a, s, l, u = h(e);
            if (!i && 1 === u.length) {
                if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && T.getById && 9 === t.nodeType && R && k.relative[o[1].type]) {
                    if (t = (k.find.ID(a.matches[0].replace(xt, Et), t) || [])[0], !t) return n;
                    e = e.slice(o.shift().value.length)
                }
                for (r = ft.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !k.relative[s = a.type]);)
                    if ((l = k.find[s]) && (i = l(a.matches[0].replace(xt, Et), bt.test(o[0].type) && c(t.parentNode) || t))) {
                        if (o.splice(r, 1), e = i.length && p(o), !e) return Z.apply(n, i), n;
                        break
                    }
            }
            return C(e, u)(i, t, !R, n, bt.test(e) && c(t.parentNode) || t), n
        }
        var E, T, k, _, D, C, S, N, M, A, P, O, R, j, I, F, $, q = "sizzle" + -new Date,
            V = e.document,
            L = 0,
            U = 0,
            B = n(),
            H = n(),
            W = n(),
            z = function(e, t) {
                return e === t && (M = !0), 0
            },
            X = "undefined",
            Y = 1 << 31,
            K = {}.hasOwnProperty,
            J = [],
            Q = J.pop,
            G = J.push,
            Z = J.push,
            et = J.slice,
            tt = J.indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t] === e) return t;
                return -1
            },
            nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            it = "[\\x20\\t\\r\\n\\f]",
            rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ot = rt.replace("w", "w#"),
            at = "\\[" + it + "*(" + rt + ")" + it + "*(?:([*^$|!~]?=)" + it + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ot + ")|)|)" + it + "*\\]",
            st = ":(" + rt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + at.replace(3, 8) + ")*)|.*)\\)|)",
            lt = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
            ut = new RegExp("^" + it + "*," + it + "*"),
            ct = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
            dt = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"),
            ht = new RegExp(st),
            pt = new RegExp("^" + ot + "$"),
            ft = {
                ID: new RegExp("^#(" + rt + ")"),
                CLASS: new RegExp("^\\.(" + rt + ")"),
                TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + at),
                PSEUDO: new RegExp("^" + st),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + nt + ")$", "i"),
                needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
            },
            gt = /^(?:input|select|textarea|button)$/i,
            mt = /^h\d$/i,
            vt = /^[^{]+\{\s*\[native \w/,
            yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            bt = /[+~]/,
            wt = /'|\\/g,
            xt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
            Et = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            };
        try {
            Z.apply(J = et.call(V.childNodes), V.childNodes), J[V.childNodes.length].nodeType
        } catch (Tt) {
            Z = {
                apply: J.length ? function(e, t) {
                    G.apply(e, et.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        T = t.support = {}, D = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, A = t.setDocument = function(e) {
            var t, n = e ? e.ownerDocument || e : V,
                i = n.defaultView;
            return n !== P && 9 === n.nodeType && n.documentElement ? (P = n, O = n.documentElement, R = !D(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
                A()
            }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
                A()
            })), T.attributes = r(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), T.getElementsByTagName = r(function(e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), T.getElementsByClassName = vt.test(n.getElementsByClassName) && r(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), T.getById = r(function(e) {
                return O.appendChild(e).id = q, !n.getElementsByName || !n.getElementsByName(q).length
            }), T.getById ? (k.find.ID = function(e, t) {
                if (typeof t.getElementById !== X && R) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, k.filter.ID = function(e) {
                var t = e.replace(xt, Et);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete k.find.ID, k.filter.ID = function(e) {
                var t = e.replace(xt, Et);
                return function(e) {
                    var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), k.find.TAG = T.getElementsByTagName ? function(e, t) {
                return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) : void 0
            } : function(e, t) {
                var n, i = [],
                    r = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return o
            }, k.find.CLASS = T.getElementsByClassName && function(e, t) {
                return typeof t.getElementsByClassName !== X && R ? t.getElementsByClassName(e) : void 0
            }, I = [], j = [], (T.qsa = vt.test(n.querySelectorAll)) && (r(function(e) {
                e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && j.push("[*^$]=" + it + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || j.push("\\[" + it + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || j.push(":checked")
            }), r(function(e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && j.push("name" + it + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || j.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), j.push(",.*:")
            })), (T.matchesSelector = vt.test(F = O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && r(function(e) {
                T.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), I.push("!=", st)
            }), j = j.length && new RegExp(j.join("|")), I = I.length && new RegExp(I.join("|")), t = vt.test(O.compareDocumentPosition), $ = t || vt.test(O.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, z = t ? function(e, t) {
                if (e === t) return M = !0, 0;
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !T.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === V && $(V, e) ? -1 : t === n || t.ownerDocument === V && $(V, t) ? 1 : N ? tt.call(N, e) - tt.call(N, t) : 0 : 4 & i ? -1 : 1)
            } : function(e, t) {
                if (e === t) return M = !0, 0;
                var i, r = 0,
                    o = e.parentNode,
                    s = t.parentNode,
                    l = [e],
                    u = [t];
                if (!o || !s) return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : N ? tt.call(N, e) - tt.call(N, t) : 0;
                if (o === s) return a(e, t);
                for (i = e; i = i.parentNode;) l.unshift(i);
                for (i = t; i = i.parentNode;) u.unshift(i);
                for (; l[r] === u[r];) r++;
                return r ? a(l[r], u[r]) : l[r] === V ? -1 : u[r] === V ? 1 : 0
            }, n) : P
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== P && A(e), n = n.replace(dt, "='$1']"), !(!T.matchesSelector || !R || I && I.test(n) || j && j.test(n))) try {
                var i = F.call(e, n);
                if (i || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (r) {}
            return t(n, P, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== P && A(e), $(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== P && A(e);
            var n = k.attrHandle[t.toLowerCase()],
                i = n && K.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !R) : void 0;
            return void 0 !== i ? i : T.attributes || !R ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                r = 0;
            if (M = !T.detectDuplicates, N = !T.sortStable && e.slice(0), e.sort(z), M) {
                for (; t = e[r++];) t === e[r] && (i = n.push(r));
                for (; i--;) e.splice(n[i], 1)
            }
            return N = null, e
        }, _ = t.getText = function(e) {
            var t, n = "",
                i = 0,
                r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += _(e)
                } else if (3 === r || 4 === r) return e.nodeValue
            } else
                for (; t = e[i++];) n += _(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ft,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xt, Et), e[3] = (e[4] || e[5] || "").replace(xt, Et), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[5] && e[2];
                    return ft.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && ht.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xt, Et).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && B(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(r) {
                        var o = t.attr(r, e);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, i, r) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === i && 0 === r ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var u, c, d, h, p, f, g = o !== a ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            y = !l && !s;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (d = t; d = d[g];)
                                        if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                    f = g = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [a ? m.firstChild : m.lastChild], a && y) {
                                for (c = m[q] || (m[q] = {}), u = c[e] || [], p = u[0] === L && u[1], h = u[0] === L && u[2], d = p && m.childNodes[p]; d = ++p && d && d[g] || (h = p = 0) || f.pop();)
                                    if (1 === d.nodeType && ++h && d === t) {
                                        c[e] = [L, p, h];
                                        break
                                    }
                            } else if (y && (u = (t[q] || (t[q] = {}))[e]) && u[0] === L) h = u[1];
                            else
                                for (;
                                    (d = ++p && d && d[g] || (h = p = 0) || f.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++h || (y && ((d[q] || (d[q] = {}))[e] = [L, h]), d !== t)););
                            return h -= r, h === i || h % i === 0 && h / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var r, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[q] ? o(n) : o.length > 1 ? (r = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, r = o(e, n), a = r.length; a--;) i = tt.call(e, r[a]), e[i] = !(t[i] = r[a])
                    }) : function(e) {
                        return o(e, 0, r)
                    }) : o
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        r = C(e.replace(lt, "$1"));
                    return r[q] ? i(function(e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || _(t)).indexOf(e) > -1
                    }
                }),
                lang: i(function(e) {
                    return pt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xt, Et).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = R ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === O
                },
                focus: function(e) {
                    return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !k.pseudos.empty(e)
                },
                header: function(e) {
                    return mt.test(e.nodeName)
                },
                input: function(e) {
                    return gt.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (E in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) k.pseudos[E] = s(E);
        for (E in {
            submit: !0,
            reset: !0
        }) k.pseudos[E] = l(E);
        return d.prototype = k.filters = k.pseudos, k.setFilters = new d, C = t.compile = function(e, t) {
            var n, i = [],
                r = [],
                o = W[e + " "];
            if (!o) {
                for (t || (t = h(e)), n = t.length; n--;) o = y(t[n]), o[q] ? i.push(o) : r.push(o);
                o = W(e, b(r, i))
            }
            return o
        }, T.sortStable = q.split("").sort(z).join("") === q, T.detectDuplicates = !!M, A(), T.sortDetached = r(function(e) {
            return 1 & e.compareDocumentPosition(P.createElement("div"))
        }), r(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), T.attributes && r(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), r(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(nt, function(e, t, n) {
            var i;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    et.find = rt, et.expr = rt.selectors, et.expr[":"] = et.expr.pseudos, et.unique = rt.uniqueSort, et.text = rt.getText, et.isXMLDoc = rt.isXML, et.contains = rt.contains;
    var ot = et.expr.match.needsContext,
        at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        st = /^.[^:#\[\.,]*$/;
    et.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? et.find.matchesSelector(i, e) ? [i] : [] : et.find.matches(e, et.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, et.fn.extend({
        find: function(e) {
            var t, n = this.length,
                i = [],
                r = this;
            if ("string" != typeof e) return this.pushStack(et(e).filter(function() {
                for (t = 0; n > t; t++)
                    if (et.contains(r[t], this)) return !0
            }));
            for (t = 0; n > t; t++) et.find(e, r[t], i);
            return i = this.pushStack(n > 1 ? et.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && ot.test(e) ? et(e) : e || [], !1).length
        }
    });
    var lt, ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ct = et.fn.init = function(e, t) {
            var n, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ut.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || lt).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (t = t instanceof et ? t[0] : t, et.merge(this, et.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : G, !0)), at.test(n[1]) && et.isPlainObject(t))
                        for (n in t) et.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this
                }
                return i = G.getElementById(n[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = G, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : et.isFunction(e) ? "undefined" != typeof lt.ready ? lt.ready(e) : e(et) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), et.makeArray(e, this))
        };
    ct.prototype = et.fn, lt = et(G);
    var dt = /^(?:parents|prev(?:Until|All))/,
        ht = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    et.extend({
        dir: function(e, t, n) {
            for (var i = [], r = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (r && et(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), et.fn.extend({
        has: function(e) {
            var t = et(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (et.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, r = this.length, o = [], a = ot.test(e) || "string" != typeof e ? et(e, t || this.context) : 0; r > i; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && et.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? et.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? z.call(et(e), this[0]) : z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(et.unique(et.merge(this.get(), et(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), et.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return et.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return et.dir(e, "parentNode", n)
        },
        next: function(e) {
            return r(e, "nextSibling")
        },
        prev: function(e) {
            return r(e, "previousSibling")
        },
        nextAll: function(e) {
            return et.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return et.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return et.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return et.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return et.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return et.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || et.merge([], e.childNodes)
        }
    }, function(e, t) {
        et.fn[e] = function(n, i) {
            var r = et.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = et.filter(i, r)), this.length > 1 && (ht[e] || et.unique(r), dt.test(e) && r.reverse()), this.pushStack(r)
        }
    });
    var pt = /\S+/g,
        ft = {};
    et.Callbacks = function(e) {
        e = "string" == typeof e ? ft[e] || o(e) : et.extend({}, e);
        var t, n, i, r, a, s, l = [],
            u = !e.once && [],
            c = function(o) {
                for (t = e.memory && o, n = !0, s = r || 0, r = 0, a = l.length, i = !0; l && a > s; s++)
                    if (l[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                i = !1, l && (u ? u.length && c(u.shift()) : t ? l = [] : d.disable())
            },
            d = {
                add: function() {
                    if (l) {
                        var n = l.length;
                        ! function o(t) {
                            et.each(t, function(t, n) {
                                var i = et.type(n);
                                "function" === i ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && o(n)
                            })
                        }(arguments), i ? a = l.length : t && (r = n, c(t))
                    }
                    return this
                },
                remove: function() {
                    return l && et.each(arguments, function(e, t) {
                        for (var n;
                            (n = et.inArray(t, l, n)) > -1;) l.splice(n, 1), i && (a >= n && a--, s >= n && s--)
                    }), this
                },
                has: function(e) {
                    return e ? et.inArray(e, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], a = 0, this
                },
                disable: function() {
                    return l = u = t = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return u = void 0, t || d.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return !l || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], i ? u.push(t) : c(t)), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return d
    }, et.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", et.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", et.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", et.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return et.Deferred(function(n) {
                            et.each(t, function(t, o) {
                                var a = et.isFunction(e[t]) && e[t];
                                r[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && et.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? et.extend(e, i) : i
                    }
                },
                r = {};
            return i.pipe = i.then, et.each(t, function(e, o) {
                var a = o[2],
                    s = o[3];
                i[o[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
                    return r[o[0] + "With"](this === r ? i : this, arguments), this
                }, r[o[0] + "With"] = a.fireWith
            }), i.promise(r), e && e.call(r, r), r
        },
        when: function(e) {
            var t, n, i, r = 0,
                o = B.call(arguments),
                a = o.length,
                s = 1 !== a || e && et.isFunction(e.promise) ? a : 0,
                l = 1 === s ? e : et.Deferred(),
                u = function(e, n, i) {
                    return function(r) {
                        n[e] = this, i[e] = arguments.length > 1 ? B.call(arguments) : r, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                    }
                };
            if (a > 1)
                for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && et.isFunction(o[r].promise) ? o[r].promise().done(u(r, i, o)).fail(l.reject).progress(u(r, n, t)) : --s;
            return s || l.resolveWith(i, o), l.promise()
        }
    });
    var gt;
    et.fn.ready = function(e) {
        return et.ready.promise().done(e), this
    }, et.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? et.readyWait++ : et.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --et.readyWait : et.isReady) || (et.isReady = !0, e !== !0 && --et.readyWait > 0 || (gt.resolveWith(G, [et]), et.fn.trigger && et(G).trigger("ready").off("ready")))
        }
    }), et.ready.promise = function(t) {
        return gt || (gt = et.Deferred(), "complete" === G.readyState ? setTimeout(et.ready) : (G.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), gt.promise(t)
    }, et.ready.promise();
    var mt = et.access = function(e, t, n, i, r, o, a) {
        var s = 0,
            l = e.length,
            u = null == n;
        if ("object" === et.type(n)) {
            r = !0;
            for (s in n) et.access(e, t, s, n[s], !0, o, a)
        } else if (void 0 !== i && (r = !0, et.isFunction(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function(e, t, n) {
            return u.call(et(e), n)
        })), t))
            for (; l > s; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
        return r ? e : u ? t.call(e) : l ? t(e[0], n) : o
    };
    et.acceptData = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }, s.uid = 1, s.accepts = et.acceptData, s.prototype = {
        key: function(e) {
            if (!s.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = s.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (i) {
                    t[this.expando] = n, et.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var i, r = this.key(e),
                o = this.cache[r];
            if ("string" == typeof t) o[t] = n;
            else if (et.isEmptyObject(o)) et.extend(this.cache[r], t);
            else
                for (i in t) o[i] = t[i];
            return o
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return void 0 === t ? n : n[t]
        },
        access: function(e, t, n) {
            var i;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, et.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, i, r, o = this.key(e),
                a = this.cache[o];
            if (void 0 === t) this.cache[o] = {};
            else {
                et.isArray(t) ? i = t.concat(t.map(et.camelCase)) : (r = et.camelCase(t), t in a ? i = [t, r] : (i = r, i = i in a ? [i] : i.match(pt) || [])), n = i.length;
                for (; n--;) delete a[i[n]]
            }
        },
        hasData: function(e) {
            return !et.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var vt = new s,
        yt = new s,
        bt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        wt = /([A-Z])/g;
    et.extend({
        hasData: function(e) {
            return yt.hasData(e) || vt.hasData(e)
        },
        data: function(e, t, n) {
            return yt.access(e, t, n)
        },
        removeData: function(e, t) {
            yt.remove(e, t)
        },
        _data: function(e, t, n) {
            return vt.access(e, t, n)
        },
        _removeData: function(e, t) {
            vt.remove(e, t)
        }
    }), et.fn.extend({
        data: function(e, t) {
            var n, i, r, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (r = yt.get(o), 1 === o.nodeType && !vt.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--;) i = a[n].name, 0 === i.indexOf("data-") && (i = et.camelCase(i.slice(5)), l(o, i, r[i]));
                    vt.set(o, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function() {
                yt.set(this, e)
            }) : mt(this, function(t) {
                var n, i = et.camelCase(e);
                if (o && void 0 === t) {
                    if (n = yt.get(o, e), void 0 !== n) return n;
                    if (n = yt.get(o, i), void 0 !== n) return n;
                    if (n = l(o, i, void 0), void 0 !== n) return n
                } else this.each(function() {
                    var n = yt.get(this, i);
                    yt.set(this, i, t), -1 !== e.indexOf("-") && void 0 !== n && yt.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                yt.remove(this, e)
            })
        }
    }), et.extend({
        queue: function(e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = vt.get(e, t), n && (!i || et.isArray(n) ? i = vt.access(e, t, et.makeArray(n)) : i.push(n)), i || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = et.queue(e, t),
                i = n.length,
                r = n.shift(),
                o = et._queueHooks(e, t),
                a = function() {
                    et.dequeue(e, t)
                };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return vt.get(e, n) || vt.access(e, n, {
                empty: et.Callbacks("once memory").add(function() {
                    vt.remove(e, [t + "queue", n])
                })
            })
        }
    }), et.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? et.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = et.queue(this, e, t);
                et._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && et.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                et.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
                r = et.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --i || r.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = vt.get(o[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
            return s(), r.promise(t)
        }
    });
    var xt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Et = ["Top", "Right", "Bottom", "Left"],
        Tt = function(e, t) {
            return e = t || e, "none" === et.css(e, "display") || !et.contains(e.ownerDocument, e)
        },
        kt = /^(?:checkbox|radio)$/i;
    ! function() {
        var e = G.createDocumentFragment(),
            t = e.appendChild(G.createElement("div"));
        t.innerHTML = "<input type='radio' checked='checked' name='t'/>", Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var _t = "undefined";
    Q.focusinBubbles = "onfocusin" in e;
    var Dt = /^key/,
        Ct = /^(?:mouse|contextmenu)|click/,
        St = /^(?:focusinfocus|focusoutblur)$/,
        Nt = /^([^.]*)(?:\.(.+)|)$/;
    et.event = {
        global: {},
        add: function(e, t, n, i, r) {
            var o, a, s, l, u, c, d, h, p, f, g, m = vt.get(e);
            if (m)
                for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = et.guid++), (l = m.events) || (l = m.events = {}), (a = m.handle) || (a = m.handle = function(t) {
                    return typeof et !== _t && et.event.triggered !== t.type ? et.event.dispatch.apply(e, arguments) : void 0
                }), t = (t || "").match(pt) || [""], u = t.length; u--;) s = Nt.exec(t[u]) || [], p = g = s[1], f = (s[2] || "").split(".").sort(), p && (d = et.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, d = et.event.special[p] || {}, c = et.extend({
                    type: p,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && et.expr.match.needsContext.test(r),
                    namespace: f.join(".")
                }, o), (h = l[p]) || (h = l[p] = [], h.delegateCount = 0, d.setup && d.setup.call(e, i, f, a) !== !1 || e.addEventListener && e.addEventListener(p, a, !1)), d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, c) : h.push(c), et.event.global[p] = !0)
        },
        remove: function(e, t, n, i, r) {
            var o, a, s, l, u, c, d, h, p, f, g, m = vt.hasData(e) && vt.get(e);
            if (m && (l = m.events)) {
                for (t = (t || "").match(pt) || [""], u = t.length; u--;)
                    if (s = Nt.exec(t[u]) || [], p = g = s[1], f = (s[2] || "").split(".").sort(), p) {
                        for (d = et.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, h = l[p] || [], s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length; o--;) c = h[o], !r && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (h.splice(o, 1), c.selector && h.delegateCount--, d.remove && d.remove.call(e, c));
                        a && !h.length && (d.teardown && d.teardown.call(e, f, m.handle) !== !1 || et.removeEvent(e, p, m.handle), delete l[p])
                    } else
                        for (p in l) et.event.remove(e, p + t[u], n, i, !0);
                et.isEmptyObject(l) && (delete m.handle, vt.remove(e, "events"))
            }
        },
        trigger: function(t, n, i, r) {
            var o, a, s, l, u, c, d, h = [i || G],
                p = K.call(t, "type") ? t.type : t,
                f = K.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !St.test(p + et.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), u = p.indexOf(":") < 0 && "on" + p, t = t[et.expando] ? t : new et.Event(p, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : et.makeArray(n, [t]), d = et.event.special[p] || {}, r || !d.trigger || d.trigger.apply(i, n) !== !1)) {
                if (!r && !d.noBubble && !et.isWindow(i)) {
                    for (l = d.delegateType || p, St.test(l + p) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                    s === (i.ownerDocument || G) && h.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0;
                    (a = h[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? l : d.bindType || p, c = (vt.get(a, "events") || {})[t.type] && vt.get(a, "handle"), c && c.apply(a, n), c = u && a[u], c && c.apply && et.acceptData(a) && (t.result = c.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = p, r || t.isDefaultPrevented() || d._default && d._default.apply(h.pop(), n) !== !1 || !et.acceptData(i) || u && et.isFunction(i[p]) && !et.isWindow(i) && (s = i[u], s && (i[u] = null), et.event.triggered = p, i[p](), et.event.triggered = void 0, s && (i[u] = s)), t.result
            }
        },
        dispatch: function(e) {
            e = et.event.fix(e);
            var t, n, i, r, o, a = [],
                s = B.call(arguments),
                l = (vt.get(this, "events") || {})[e.type] || [],
                u = et.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (a = et.event.handlers.call(this, e, l), t = 0;
                    (r = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = r.elem, n = 0;
                        (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, i = ((et.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, i, r, o, a = [],
                s = t.delegateCount,
                l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))
                for (; l !== this; l = l.parentNode || this)
                    if (l.disabled !== !0 || "click" !== e.type) {
                        for (i = [], n = 0; s > n; n++) o = t[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? et(r, this).index(l) >= 0 : et.find(r, this, null, [l]).length), i[r] && i.push(o);
                        i.length && a.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }), a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, r, o = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || G, i = n.documentElement, r = n.body, e.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[et.expando]) return e;
            var t, n, i, r = e.type,
                o = e,
                a = this.fixHooks[r];
            for (a || (this.fixHooks[r] = a = Ct.test(r) ? this.mouseHooks : Dt.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new et.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
            return e.target || (e.target = G), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== d() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === d() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && et.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return et.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, i) {
            var r = et.extend(new et.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? et.event.trigger(r, null, t) : et.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
        }
    }, et.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, et.Event = function(e, t) {
        return this instanceof et.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.getPreventDefault && e.getPreventDefault() ? u : c) : this.type = e, t && et.extend(this, t), this.timeStamp = e && e.timeStamp || et.now(), void(this[et.expando] = !0)) : new et.Event(e, t)
    }, et.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = u, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = u, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = u, this.stopPropagation()
        }
    }, et.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        et.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    r = e.relatedTarget,
                    o = e.handleObj;
                return (!r || r !== i && !et.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), Q.focusinBubbles || et.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            et.event.simulate(t, e.target, et.event.fix(e), !0)
        };
        et.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    r = vt.access(i, t);
                r || i.addEventListener(e, n, !0), vt.access(i, t, (r || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    r = vt.access(i, t) - 1;
                r ? vt.access(i, t, r) : (i.removeEventListener(e, n, !0), vt.remove(i, t))
            }
        }
    }), et.fn.extend({
        on: function(e, t, n, i, r) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (a in e) this.on(a, t, n, e[a], r);
                return this
            }
            if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = c;
            else if (!i) return this;
            return 1 === r && (o = i, i = function(e) {
                return et().off(e), o.apply(this, arguments)
            }, i.guid = o.guid || (o.guid = et.guid++)), this.each(function() {
                et.event.add(this, e, i, n, t)
            })
        },
        one: function(e, t, n, i) {
            return this.on(e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, et(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (r in e) this.off(r, t, e[r]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function() {
                et.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                et.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? et.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Mt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        At = /<([\w:]+)/,
        Pt = /<|&#?\w+;/,
        Ot = /<(?:script|style|link)/i,
        Rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        jt = /^$|\/(?:java|ecma)script/i,
        It = /^true\/(.*)/,
        Ft = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        $t = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    $t.optgroup = $t.option, $t.tbody = $t.tfoot = $t.colgroup = $t.caption = $t.thead, $t.th = $t.td, et.extend({
        clone: function(e, t, n) {
            var i, r, o, a, s = e.cloneNode(!0),
                l = et.contains(e.ownerDocument, e);
            if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || et.isXMLDoc(e)))
                for (a = v(s), o = v(e), i = 0, r = o.length; r > i; i++) y(o[i], a[i]);
            if (t)
                if (n)
                    for (o = o || v(e), a = a || v(s), i = 0, r = o.length; r > i; i++) m(o[i], a[i]);
                else m(e, s);
            return a = v(s, "script"), a.length > 0 && g(a, !l && v(e, "script")), s
        },
        buildFragment: function(e, t, n, i) {
            for (var r, o, a, s, l, u, c = t.createDocumentFragment(), d = [], h = 0, p = e.length; p > h; h++)
                if (r = e[h], r || 0 === r)
                    if ("object" === et.type(r)) et.merge(d, r.nodeType ? [r] : r);
                    else if (Pt.test(r)) {
                for (o = o || c.appendChild(t.createElement("div")), a = (At.exec(r) || ["", ""])[1].toLowerCase(), s = $t[a] || $t._default, o.innerHTML = s[1] + r.replace(Mt, "<$1></$2>") + s[2], u = s[0]; u--;) o = o.lastChild;
                et.merge(d, o.childNodes), o = c.firstChild, o.textContent = ""
            } else d.push(t.createTextNode(r));
            for (c.textContent = "", h = 0; r = d[h++];)
                if ((!i || -1 === et.inArray(r, i)) && (l = et.contains(r.ownerDocument, r), o = v(c.appendChild(r), "script"), l && g(o), n))
                    for (u = 0; r = o[u++];) jt.test(r.type || "") && n.push(r);
            return c
        },
        cleanData: function(e) {
            for (var t, n, i, r, o, a, s = et.event.special, l = 0; void 0 !== (n = e[l]); l++) {
                if (et.acceptData(n) && (o = n[vt.expando], o && (t = vt.cache[o]))) {
                    if (i = Object.keys(t.events || {}), i.length)
                        for (a = 0; void 0 !== (r = i[a]); a++) s[r] ? et.event.remove(n, r) : et.removeEvent(n, r, t.handle);
                    vt.cache[o] && delete vt.cache[o]
                }
                delete yt.cache[n[yt.expando]]
            }
        }
    }), et.fn.extend({
        text: function(e) {
            return mt(this, function(e) {
                return void 0 === e ? et.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, i = e ? et.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || et.cleanData(v(n)), n.parentNode && (t && et.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (et.cleanData(v(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return et.clone(this, e, t)
            })
        },
        html: function(e) {
            return mt(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Ot.test(e) && !$t[(At.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Mt, "<$1></$2>");
                    try {
                        for (; i > n; n++) t = this[n] || {}, 1 === t.nodeType && (et.cleanData(v(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (r) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, et.cleanData(v(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = H.apply([], e);
            var n, i, r, o, a, s, l = 0,
                u = this.length,
                c = this,
                d = u - 1,
                h = e[0],
                g = et.isFunction(h);
            if (g || u > 1 && "string" == typeof h && !Q.checkClone && Rt.test(h)) return this.each(function(n) {
                var i = c.eq(n);
                g && (e[0] = h.call(this, n, i.html())), i.domManip(e, t)
            });
            if (u && (n = et.buildFragment(e, this[0].ownerDocument, !1, this), i = n.firstChild, 1 === n.childNodes.length && (n = i), i)) {
                for (r = et.map(v(n, "script"), p), o = r.length; u > l; l++) a = n, l !== d && (a = et.clone(a, !0, !0), o && et.merge(r, v(a, "script"))), t.call(this[l], a, l);
                if (o)
                    for (s = r[r.length - 1].ownerDocument, et.map(r, f), l = 0; o > l; l++) a = r[l], jt.test(a.type || "") && !vt.access(a, "globalEval") && et.contains(s, a) && (a.src ? et._evalUrl && et._evalUrl(a.src) : et.globalEval(a.textContent.replace(Ft, "")))
            }
            return this
        }
    }), et.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        et.fn[e] = function(e) {
            for (var n, i = [], r = et(e), o = r.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), et(r[a])[t](n), W.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var qt, Vt = {},
        Lt = /^margin/,
        Ut = new RegExp("^(" + xt + ")(?!px)[a-z%]+$", "i"),
        Bt = function(e) {
            return e.ownerDocument.defaultView.getComputedStyle(e, null)
        };
    ! function() {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", o.appendChild(a);
            var t = e.getComputedStyle(s, null);
            n = "1%" !== t.top, i = "4px" === t.width, o.removeChild(a)
        }
        var n, i, r = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
            o = G.documentElement,
            a = G.createElement("div"),
            s = G.createElement("div");
        s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(s), e.getComputedStyle && et.extend(Q, {
            pixelPosition: function() {
                return t(), n
            },
            boxSizingReliable: function() {
                return null == i && t(), i
            },
            reliableMarginRight: function() {
                var t, n = s.appendChild(G.createElement("div"));
                return n.style.cssText = s.style.cssText = r, n.style.marginRight = n.style.width = "0", s.style.width = "1px", o.appendChild(a), t = !parseFloat(e.getComputedStyle(n, null).marginRight), o.removeChild(a), s.innerHTML = "", t
            }
        })
    }(), et.swap = function(e, t, n, i) {
        var r, o, a = {};
        for (o in t) a[o] = e.style[o], e.style[o] = t[o];
        r = n.apply(e, i || []);
        for (o in t) e.style[o] = a[o];
        return r
    };
    var Ht = /^(none|table(?!-c[ea]).+)/,
        Wt = new RegExp("^(" + xt + ")(.*)$", "i"),
        zt = new RegExp("^([+-])=(" + xt + ")", "i"),
        Xt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Yt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Kt = ["Webkit", "O", "Moz", "ms"];
    et.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = x(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, o, a, s = et.camelCase(t),
                    l = e.style;
                return t = et.cssProps[s] || (et.cssProps[s] = T(l, s)), a = et.cssHooks[t] || et.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : l[t] : (o = typeof n, "string" === o && (r = zt.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(et.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || et.cssNumber[s] || (n += "px"), Q.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l[t] = "", l[t] = n)), void 0)
            }
        },
        css: function(e, t, n, i) {
            var r, o, a, s = et.camelCase(t);
            return t = et.cssProps[s] || (et.cssProps[s] = T(e.style, s)), a = et.cssHooks[t] || et.cssHooks[s], a && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = x(e, t, i)), "normal" === r && t in Yt && (r = Yt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || et.isNumeric(o) ? o || 0 : r) : r
        }
    }), et.each(["height", "width"], function(e, t) {
        et.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? 0 === e.offsetWidth && Ht.test(et.css(e, "display")) ? et.swap(e, Xt, function() {
                    return D(e, t, i)
                }) : D(e, t, i) : void 0
            },
            set: function(e, n, i) {
                var r = i && Bt(e);
                return k(e, n, i ? _(e, t, i, "border-box" === et.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }), et.cssHooks.marginRight = E(Q.reliableMarginRight, function(e, t) {
        return t ? et.swap(e, {
            display: "inline-block"
        }, x, [e, "marginRight"]) : void 0
    }), et.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        et.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + Et[i] + t] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, Lt.test(e) || (et.cssHooks[e + t].set = k)
    }), et.fn.extend({
        css: function(e, t) {
            return mt(this, function(e, t, n) {
                var i, r, o = {},
                    a = 0;
                if (et.isArray(t)) {
                    for (i = Bt(e), r = t.length; r > a; a++) o[t[a]] = et.css(e, t[a], !1, i);
                    return o
                }
                return void 0 !== n ? et.style(e, t, n) : et.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return C(this, !0)
        },
        hide: function() {
            return C(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Tt(this) ? et(this).show() : et(this).hide()
            })
        }
    }), et.Tween = S, S.prototype = {
        constructor: S,
        init: function(e, t, n, i, r, o) {
            this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (et.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = S.propHooks[this.prop];
            return e && e.get ? e.get(this) : S.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = S.propHooks[this.prop];
            return this.pos = t = this.options.duration ? et.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : S.propHooks._default.set(this), this
        }
    }, S.prototype.init.prototype = S.prototype, S.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = et.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                et.fx.step[e.prop] ? et.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[et.cssProps[e.prop]] || et.cssHooks[e.prop]) ? et.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, S.propHooks.scrollTop = S.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, et.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, et.fx = S.prototype.init, et.fx.step = {};
    var Jt, Qt, Gt = /^(?:toggle|show|hide)$/,
        Zt = new RegExp("^(?:([+-])=|)(" + xt + ")([a-z%]*)$", "i"),
        en = /queueHooks$/,
        tn = [P],
        nn = {
            "*": [
                function(e, t) {
                    var n = this.createTween(e, t),
                        i = n.cur(),
                        r = Zt.exec(t),
                        o = r && r[3] || (et.cssNumber[e] ? "" : "px"),
                        a = (et.cssNumber[e] || "px" !== o && +i) && Zt.exec(et.css(n.elem, e)),
                        s = 1,
                        l = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], r = r || [], a = +i || 1;
                        do s = s || ".5", a /= s, et.style(n.elem, e, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --l)
                    }
                    return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
                }
            ]
        };
    et.Animation = et.extend(R, {
            tweener: function(e, t) {
                et.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var n, i = 0, r = e.length; r > i; i++) n = e[i], nn[n] = nn[n] || [], nn[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? tn.unshift(e) : tn.push(e)
            }
        }), et.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? et.extend({}, e) : {
                complete: n || !n && t || et.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !et.isFunction(t) && t
            };
            return i.duration = et.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in et.fx.speeds ? et.fx.speeds[i.duration] : et.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                et.isFunction(i.old) && i.old.call(this), i.queue && et.dequeue(this, i.queue)
            }, i
        }, et.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(Tt).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var r = et.isEmptyObject(e),
                    o = et.speed(t, n, i),
                    a = function() {
                        var t = R(this, et.extend({}, e), o);
                        (r || vt.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        r = null != e && e + "queueHooks",
                        o = et.timers,
                        a = vt.get(this);
                    if (r) a[r] && a[r].stop && i(a[r]);
                    else
                        for (r in a) a[r] && a[r].stop && en.test(r) && i(a[r]);
                    for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                    (t || !n) && et.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = vt.get(this),
                        i = n[e + "queue"],
                        r = n[e + "queueHooks"],
                        o = et.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, et.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), et.each(["toggle", "show", "hide"], function(e, t) {
            var n = et.fn[t];
            et.fn[t] = function(e, i, r) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(M(t, !0), e, i, r)
            }
        }), et.each({
            slideDown: M("show"),
            slideUp: M("hide"),
            slideToggle: M("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            et.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), et.timers = [], et.fx.tick = function() {
            var e, t = 0,
                n = et.timers;
            for (Jt = et.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || et.fx.stop(), Jt = void 0
        }, et.fx.timer = function(e) {
            et.timers.push(e), e() ? et.fx.start() : et.timers.pop()
        }, et.fx.interval = 13, et.fx.start = function() {
            Qt || (Qt = setInterval(et.fx.tick, et.fx.interval))
        }, et.fx.stop = function() {
            clearInterval(Qt), Qt = null
        }, et.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, et.fn.delay = function(e, t) {
            return e = et.fx ? et.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var i = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        function() {
            var e = G.createElement("input"),
                t = G.createElement("select"),
                n = t.appendChild(G.createElement("option"));
            e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = n.selected, t.disabled = !0, Q.optDisabled = !n.disabled, e = G.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value
        }();
    var rn, on, an = et.expr.attrHandle;
    et.fn.extend({
        attr: function(e, t) {
            return mt(this, et.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                et.removeAttr(this, e)
            })
        }
    }), et.extend({
        attr: function(e, t, n) {
            var i, r, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return typeof e.getAttribute === _t ? et.prop(e, t, n) : (1 === o && et.isXMLDoc(e) || (t = t.toLowerCase(), i = et.attrHooks[t] || (et.expr.match.bool.test(t) ? on : rn)), void 0 === n ? i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = et.find.attr(e, t), null == r ? void 0 : r) : null !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : void et.removeAttr(e, t))
        },
        removeAttr: function(e, t) {
            var n, i, r = 0,
                o = t && t.match(pt);
            if (o && 1 === e.nodeType)
                for (; n = o[r++];) i = et.propFix[n] || n, et.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!Q.radioValue && "radio" === t && et.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), on = {
        set: function(e, t, n) {
            return t === !1 ? et.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, et.each(et.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = an[t] || et.find.attr;
        an[t] = function(e, t, i) {
            var r, o;
            return i || (o = an[t], an[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, an[t] = o), r
        }
    });
    var sn = /^(?:input|select|textarea|button)$/i;
    et.fn.extend({
        prop: function(e, t) {
            return mt(this, et.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[et.propFix[e] || e]
            })
        }
    }), et.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var i, r, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !et.isXMLDoc(e), o && (t = et.propFix[t] || t, r = et.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || sn.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), Q.optSelected || (et.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), et.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        et.propFix[this.toLowerCase()] = this
    });
    var ln = /[\t\r\n\f]/g;
    et.fn.extend({
        addClass: function(e) {
            var t, n, i, r, o, a, s = "string" == typeof e && e,
                l = 0,
                u = this.length;
            if (et.isFunction(e)) return this.each(function(t) {
                et(this).addClass(e.call(this, t, this.className))
            });
            if (s)
                for (t = (e || "").match(pt) || []; u > l; l++)
                    if (n = this[l], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(ln, " ") : " ")) {
                        for (o = 0; r = t[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        a = et.trim(i), n.className !== a && (n.className = a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, r, o, a, s = 0 === arguments.length || "string" == typeof e && e,
                l = 0,
                u = this.length;
            if (et.isFunction(e)) return this.each(function(t) {
                et(this).removeClass(e.call(this, t, this.className))
            });
            if (s)
                for (t = (e || "").match(pt) || []; u > l; l++)
                    if (n = this[l], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(ln, " ") : "")) {
                        for (o = 0; r = t[o++];)
                            for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                        a = e ? et.trim(i) : "", n.className !== a && (n.className = a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(et.isFunction(e) ? function(n) {
                et(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function() {
                if ("string" === n)
                    for (var t, i = 0, r = et(this), o = e.match(pt) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else(n === _t || "boolean" === n) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : vt.get(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(ln, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    });
    var un = /\r/g;
    et.fn.extend({
        val: function(e) {
            var t, n, i, r = this[0]; {
                if (arguments.length) return i = et.isFunction(e), this.each(function(n) {
                    var r;
                    1 === this.nodeType && (r = i ? e.call(this, n, et(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : et.isArray(r) && (r = et.map(r, function(e) {
                        return null == e ? "" : e + ""
                    })), t = et.valHooks[this.type] || et.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                });
                if (r) return t = et.valHooks[r.type] || et.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(un, "") : null == n ? "" : n)
            }
        }
    }), et.extend({
        valHooks: {
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, l = 0 > r ? s : o ? r : 0; s > l; l++)
                        if (n = i[l], !(!n.selected && l !== r || (Q.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && et.nodeName(n.parentNode, "optgroup"))) {
                            if (t = et(n).val(), o) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, i, r = e.options, o = et.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = et.inArray(et(i).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), et.each(["radio", "checkbox"], function() {
        et.valHooks[this] = {
            set: function(e, t) {
                return et.isArray(t) ? e.checked = et.inArray(et(e).val(), t) >= 0 : void 0
            }
        }, Q.checkOn || (et.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), et.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        et.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), et.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var cn = et.now(),
        dn = /\?/;
    et.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, et.parseXML = function(e) {
        var t, n;
        if (!e || "string" != typeof e) return null;
        try {
            n = new DOMParser, t = n.parseFromString(e, "text/xml")
        } catch (i) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && et.error("Invalid XML: " + e), t
    };
    var hn, pn, fn = /#.*$/,
        gn = /([?&])_=[^&]*/,
        mn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        vn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        yn = /^(?:GET|HEAD)$/,
        bn = /^\/\//,
        wn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        xn = {},
        En = {},
        Tn = "*/".concat("*");
    try {
        pn = location.href
    } catch (kn) {
        pn = G.createElement("a"), pn.href = "", pn = pn.href
    }
    hn = wn.exec(pn.toLowerCase()) || [], et.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: pn,
            type: "GET",
            isLocal: vn.test(hn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Tn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": et.parseJSON,
                "text xml": et.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? F(F(e, et.ajaxSettings), t) : F(et.ajaxSettings, e)
        },
        ajaxPrefilter: j(xn),
        ajaxTransport: j(En),
        ajax: function(e, t) {
            function n(e, t, n, a) {
                var l, c, v, y, w, E = t;
                2 !== b && (b = 2, s && clearTimeout(s), i = void 0, o = a || "", x.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, n && (y = $(d, x, n)), y = q(d, y, x, l), l ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (et.lastModified[r] = w), w = x.getResponseHeader("etag"), w && (et.etag[r] = w)), 204 === e || "HEAD" === d.type ? E = "nocontent" : 304 === e ? E = "notmodified" : (E = y.state, c = y.data, v = y.error, l = !v)) : (v = E, (e || !E) && (E = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || E) + "", l ? f.resolveWith(h, [c, E, x]) : f.rejectWith(h, [x, E, v]), x.statusCode(m), m = void 0, u && p.trigger(l ? "ajaxSuccess" : "ajaxError", [x, d, l ? c : v]), g.fireWith(h, [x, E]), u && (p.trigger("ajaxComplete", [x, d]), --et.active || et.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var i, r, o, a, s, l, u, c, d = et.ajaxSetup({}, t),
                h = d.context || d,
                p = d.context && (h.nodeType || h.jquery) ? et(h) : et.event,
                f = et.Deferred(),
                g = et.Callbacks("once memory"),
                m = d.statusCode || {},
                v = {},
                y = {},
                b = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === b) {
                            if (!a)
                                for (a = {}; t = mn.exec(o);) a[t[1].toLowerCase()] = t[2];
                            t = a[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? o : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, v[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return b || (d.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > b)
                                for (t in e) m[t] = [m[t], e[t]];
                            else x.always(e[x.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || w;
                        return i && i.abort(t), n(0, t), this
                    }
                };
            if (f.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((e || d.url || pn) + "").replace(fn, "").replace(bn, hn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = et.trim(d.dataType || "*").toLowerCase().match(pt) || [""], null == d.crossDomain && (l = wn.exec(d.url.toLowerCase()), d.crossDomain = !(!l || l[1] === hn[1] && l[2] === hn[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (hn[3] || ("http:" === hn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = et.param(d.data, d.traditional)), I(xn, d, t, x), 2 === b) return x;
            u = d.global, u && 0 === et.active++ && et.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !yn.test(d.type), r = d.url, d.hasContent || (d.data && (r = d.url += (dn.test(r) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = gn.test(r) ? r.replace(gn, "$1_=" + cn++) : r + (dn.test(r) ? "&" : "?") + "_=" + cn++)), d.ifModified && (et.lastModified[r] && x.setRequestHeader("If-Modified-Since", et.lastModified[r]), et.etag[r] && x.setRequestHeader("If-None-Match", et.etag[r])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Tn + "; q=0.01" : "") : d.accepts["*"]);
            for (c in d.headers) x.setRequestHeader(c, d.headers[c]);
            if (d.beforeSend && (d.beforeSend.call(h, x, d) === !1 || 2 === b)) return x.abort();
            w = "abort";
            for (c in {
                success: 1,
                error: 1,
                complete: 1
            }) x[c](d[c]);
            if (i = I(En, d, t, x)) {
                x.readyState = 1, u && p.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (s = setTimeout(function() {
                    x.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, i.send(v, n)
                } catch (E) {
                    if (!(2 > b)) throw E;
                    n(-1, E)
                }
            } else n(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return et.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return et.get(e, void 0, t, "script")
        }
    }), et.each(["get", "post"], function(e, t) {
        et[t] = function(e, n, i, r) {
            return et.isFunction(n) && (r = r || i, i = n, n = void 0), et.ajax({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            })
        }
    }), et.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        et.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), et._evalUrl = function(e) {
        return et.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, et.fn.extend({
        wrapAll: function(e) {
            var t;
            return et.isFunction(e) ? this.each(function(t) {
                et(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = et(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return this.each(et.isFunction(e) ? function(t) {
                et(this).wrapInner(e.call(this, t))
            } : function() {
                var t = et(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = et.isFunction(e);
            return this.each(function(n) {
                et(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                et.nodeName(this, "body") || et(this).replaceWith(this.childNodes)
            }).end()
        }
    }), et.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, et.expr.filters.visible = function(e) {
        return !et.expr.filters.hidden(e)
    };
    var _n = /%20/g,
        Dn = /\[\]$/,
        Cn = /\r?\n/g,
        Sn = /^(?:submit|button|image|reset|file)$/i,
        Nn = /^(?:input|select|textarea|keygen)/i;
    et.param = function(e, t) {
        var n, i = [],
            r = function(e, t) {
                t = et.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = et.ajaxSettings && et.ajaxSettings.traditional), et.isArray(e) || e.jquery && !et.isPlainObject(e)) et.each(e, function() {
            r(this.name, this.value)
        });
        else
            for (n in e) V(n, e[n], t, r);
        return i.join("&").replace(_n, "+")
    }, et.fn.extend({
        serialize: function() {
            return et.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = et.prop(this, "elements");
                return e ? et.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !et(this).is(":disabled") && Nn.test(this.nodeName) && !Sn.test(e) && (this.checked || !kt.test(e))
            }).map(function(e, t) {
                var n = et(this).val();
                return null == n ? null : et.isArray(n) ? et.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Cn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Cn, "\r\n")
                }
            }).get()
        }
    }), et.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var Mn = 0,
        An = {},
        Pn = {
            0: 200,
            1223: 204
        },
        On = et.ajaxSettings.xhr();
    e.ActiveXObject && et(e).on("unload", function() {
        for (var e in An) An[e]()
    }), Q.cors = !!On && "withCredentials" in On, Q.ajax = On = !!On, et.ajaxTransport(function(e) {
        var t;
        return Q.cors || On && !e.crossDomain ? {
            send: function(n, i) {
                var r, o = e.xhr(),
                    a = ++Mn;
                if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (r in e.xhrFields) o[r] = e.xhrFields[r];
                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (r in n) o.setRequestHeader(r, n[r]);
                t = function(e) {
                    return function() {
                        t && (delete An[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? i(o.status, o.statusText) : i(Pn[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                            text: o.responseText
                        } : void 0, o.getAllResponseHeaders()))
                    }
                }, o.onload = t(), o.onerror = t("error"), t = An[a] = t("abort"), o.send(e.hasContent && e.data || null)
            },
            abort: function() {
                t && t()
            }
        } : void 0
    }), et.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return et.globalEval(e), e
            }
        }
    }), et.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), et.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, r) {
                    t = et("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                    }), G.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Rn = [],
        jn = /(=)\?(?=&|$)|\?\?/;
    et.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Rn.pop() || et.expando + "_" + cn++;
            return this[e] = !0, e
        }
    }), et.ajaxPrefilter("json jsonp", function(t, n, i) {
        var r, o, a, s = t.jsonp !== !1 && (jn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && jn.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = et.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(jn, "$1" + r) : t.jsonp !== !1 && (t.url += (dn.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
            return a || et.error(r + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[r], e[r] = function() {
            a = arguments
        }, i.always(function() {
            e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Rn.push(r)), a && et.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), et.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || G;
        var i = at.exec(e),
            r = !n && [];
        return i ? [t.createElement(i[1])] : (i = et.buildFragment([e], t, r), r && r.length && et(r).remove(), et.merge([], i.childNodes))
    };
    var In = et.fn.load;
    et.fn.load = function(e, t, n) {
        if ("string" != typeof e && In) return In.apply(this, arguments);
        var i, r, o, a = this,
            s = e.indexOf(" ");
        return s >= 0 && (i = e.slice(s), e = e.slice(0, s)), et.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && et.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(i ? et("<div>").append(et.parseHTML(e)).find(i) : e)
        }).complete(n && function(e, t) {
            a.each(n, o || [e.responseText, t, e])
        }), this
    }, et.expr.filters.animated = function(e) {
        return et.grep(et.timers, function(t) {
            return e === t.elem
        }).length
    };
    var Fn = e.document.documentElement;
    et.offset = {
        setOffset: function(e, t, n) {
            var i, r, o, a, s, l, u, c = et.css(e, "position"),
                d = et(e),
                h = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), o = et.css(e, "top"), l = et.css(e, "left"), u = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, u ? (i = d.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), et.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (h.top = t.top - s.top + a), null != t.left && (h.left = t.left - s.left + r), "using" in t ? t.using.call(e, h) : d.css(h)
        }
    }, et.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                et.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0],
                r = {
                    top: 0,
                    left: 0
                },
                o = i && i.ownerDocument;
            if (o) return t = o.documentElement, et.contains(t, i) ? (typeof i.getBoundingClientRect !== _t && (r = i.getBoundingClientRect()), n = L(o), {
                top: r.top + n.pageYOffset - t.clientTop,
                left: r.left + n.pageXOffset - t.clientLeft
            }) : r
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === et.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), et.nodeName(e[0], "html") || (i = e.offset()), i.top += et.css(e[0], "borderTopWidth", !0), i.left += et.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - et.css(n, "marginTop", !0),
                    left: t.left - i.left - et.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Fn; e && !et.nodeName(e, "html") && "static" === et.css(e, "position");) e = e.offsetParent;
                return e || Fn
            })
        }
    }), et.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var i = "pageYOffset" === n;
        et.fn[t] = function(r) {
            return mt(this, function(t, r, o) {
                var a = L(t);
                return void 0 === o ? a ? a[n] : t[r] : void(a ? a.scrollTo(i ? e.pageXOffset : o, i ? o : e.pageYOffset) : t[r] = o)
            }, t, r, arguments.length, null)
        }
    }), et.each(["top", "left"], function(e, t) {
        et.cssHooks[t] = E(Q.pixelPosition, function(e, n) {
            return n ? (n = x(e, t), Ut.test(n) ? et(e).position()[t] + "px" : n) : void 0
        })
    }), et.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        et.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            et.fn[i] = function(i, r) {
                var o = arguments.length && (n || "boolean" != typeof i),
                    a = n || (i === !0 || r === !0 ? "margin" : "border");
                return mt(this, function(t, n, i) {
                    var r;
                    return et.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? et.css(t, n, a) : et.style(t, n, i, a)
                }, t, o ? i : void 0, o, null)
            }
        })
    }), et.fn.size = function() {
        return this.length
    }, et.fn.andSelf = et.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return et
    });
    var $n = e.jQuery,
        qn = e.$;
    return et.noConflict = function(t) {
        return e.$ === et && (e.$ = qn), t && e.jQuery === et && (e.jQuery = $n), et
    }, typeof t === _t && (e.jQuery = e.$ = et), et
}), define("enketo-js/plugins", ["jquery"], function(e) {
    e.fn.numberRepeats = function() {
        return this.each(function() {
            e(this).find(".or-repeat").each(function() {
                var t, n, i;
                0 === e(this).prev(".or-repeat").length && (t = e(this).siblings(".or-repeat"), n = t.length + 1, n > 1 ? (e(this).find(".repeat-number").text("1"), i = 2, t.each(function() {
                    e(this).find(".repeat-number").text(i), i++
                })) : e(this).find(".repeat-number").empty())
            })
        })
    }, e.fn.clearInputs = function(t) {
        return t = t || "edit", this.each(function() {
            e(this).find(".file-preview").remove(), e(this).find("input, select, textarea").each(function() {
                var n = e(this).attr("type");
                switch ("SELECT" === e(this).prop("nodeName").toUpperCase() && (n = "select"), "TEXTAREA" === e(this).prop("nodeName").toUpperCase() && (n = "textarea"), n) {
                    case "date":
                    case "datetime":
                    case "time":
                    case "number":
                    case "search":
                    case "color":
                    case "range":
                    case "url":
                    case "email":
                    case "password":
                    case "text":
                    case "file":
                        e(this).removeAttr("data-previous-file-name data-loaded-file-name");
                    case "hidden":
                    case "textarea":
                        "" !== e(this).val() && e(this).val("").trigger(t);
                        break;
                    case "radio":
                    case "checkbox":
                        e(this).prop("checked") && (e(this).prop("checked", !1), e(this).trigger(t));
                        break;
                    case "select":
                        e(this)[0].selectedIndex >= 0 && (e(this)[0].selectedIndex = -1, e(this).trigger(t));
                        break;
                    default:
                        console.error("Unrecognized input type found when trying to reset: " + n), console.error(e(this))
                }
            })
        })
    }, e.fn.markdownToHtml = function() {
        return this.each(function() {
            var t, n = e("<div/>");
            e(this).children(":not(input, select, textarea)").each(function(t) {
                var i = "$$$" + t;
                e(this).clone().markdownToHtml().appendTo(n), e(this).replaceWith(i)
            }), t = e(this).html(), t = t.replace(/__([^\s][^_]*[^\s])__/gm, "<strong>$1</strong>"), t = t.replace(/\*\*([^\s][^\*]*[^\s])\*\*/gm, "<strong>$1</strong>"), t = t.replace(/_([^\s][^_]*[^\s])_/gm, "<em>$1</em>"), t = t.replace(/\*([^\s][^\*]*[^\s])\*/gm, "<em>$1</em>"), t = t.replace(/\[(.*)\]\(([^\)]+)\)/gm, '<a href="$2" target="_blank">$1</a>'), t = t.replace(/\n/gm, "<br />"), n.children().each(function(n) {
                var i = new RegExp("\\$\\$\\$" + n);
                t = t.replace(i, e(this)[0].outerHTML)
            }), e(this).text("").append(t)
        })
    }, e.fn.reverse = [].reverse
}), define("enketo-js/extend", ["require"], function() {
    String.prototype.pad = function(e) {
        for (var t = this; t.length < e;) t = "0" + t;
        return t
    }, Date.prototype.toISOLocalString = function() {
        var e = {},
            t = function(e) {
                return 10 > e ? "0" + e : e
            };
        return "Invalid Date" == this.toString() ? this.toString() : (e.minstotal = this.getTimezoneOffset(), e.direction = e.minstotal < 0 ? "+" : "-", e.hrspart = t(Math.abs(Math.floor(e.minstotal / 60))), e.minspart = t(Math.abs(Math.floor(e.minstotal % 60))), new Date(this.getTime() - 60 * e.minstotal * 1e3).toISOString().replace("Z", e.direction + e.hrspart + ":" + e.minspart))
    }
}), function(e) {
    "function" == typeof define && define.amd ? define("jquery.xpath", ["jquery"], e) : e(jQuery)
}(function(e) {
    e.fn.getXPath = function(e, t) {
        var n, i = [],
            r = "",
            o = this.first(),
            a = o.prop("nodeName"),
            s = o.parent(),
            l = s.prop("nodeName");
        for (e = e || "#document", t = t || !1, t && (n = o.siblings(a).addBack(), r = n.length > 1 ? "[" + (n.index(o) + 1) + "]" : ""), i.push(a + r); 1 == s.length && l !== e && "#document" !== l;) t && (n = s.siblings(l).addBack(), r = n.length > 1 ? "[" + (n.index(s) + 1) + "]" : ""), i.push(l + r), s = s.parent(), l = s.prop("nodeName");
        return "/" + i.reverse().join("/")
    }, e.fn.xfind = function(e) {
        var t, n, i;
        if (e = e.replace(/\/\//g, " "), e = e.replace(/^\//, ""), e = e.replace(/\/\.$/, ""), e = e.replace(/\//g, ">"), e = e.replace(/\[([^@].*?)\]/g, function(e, t) {
            return ":has(" + t + ")"
        }), e.indexOf(">..") >= 0) {
            for (t = e.split(/>\.\.>?/g), n = jQuery(t[0], this), i = 1; i < t.length; i++) n = n.parent(t[i]);
            return n.get()
        }
        return e = e.replace(/\./gi, "\\."), this.find(e)
    }
}), define("enketo-js/FormModel", ["xpath", "jquery", "enketo-js/plugins", "enketo-js/extend", "jquery.xpath"], function(e, t) {
    function n(e) {
        function i(e, t, n) {
            var i = "*";
            if (this.originalSelector = e, this.selector = "string" == typeof e && e.length > 0 ? e : i, n = "undefined" != typeof n && null !== n ? n : {}, this.filter = n, this.filter.noTemplate = "undefined" != typeof n.noTemplate ? n.noTemplate : !0, this.filter.onlyLeaf = "undefined" != typeof n.onlyLeaf ? n.onlyLeaf : !1, this.filter.onlyTemplate = "undefined" != typeof n.onlyTemplate ? n.onlyTemplate : !1, this.filter.noEmpty = "undefined" != typeof n.noEmpty ? n.noEmpty : !1, this.index = t, r.find("model>instance").length > 0) {
                if (this.selector !== i && 0 !== this.selector.indexOf("/") && o.INSTANCE.test(this.selector)) return void(this.selector = this.selector.replace(o.INSTANCE, "model > instance#$1"));
                this.selector = "model > instance:eq(0) " + this.selector
            }
        }
        var r, o = this;
        this.loadErrors = [], this.INSTANCE = /instance\([\'|\"]([^\/:\s]+)[\'|\"]\)/g, this.OPENROSA = /(decimal-date-time\(|pow\(|indexed-repeat\(|format-date\(|coalesce\(|join\(|max\(|min\(|random\(|substr\(|int\(|uuid\(|regex\(|now\(|today\(|date\(|if\(|boolean-from-string\(|checklist\(|selected\(|selected-at\(|round\()/, e = e.replace(/xmlns\=\"[a-zA-Z0-9\:\/\.]*\"/g, "");
        try {
            this.xml = t.parseXML(e)
        } catch (a) {
            console.error(a), this.loadErrors.push("Error trying to parse XML model/instance.")
        }
        r = t(this.xml), this.$ = r, n.prototype.init = function() {
            var e;
            return this.node(null, null, {
                noEmpty: !0,
                noTemplate: !1
            }).get().each(function() {
                e = t(this).text(), t(this).text(t.trim(e))
            }), this.cloneAllTemplates(), this.loadErrors
        }, this.node = function(e, t, n) {
            return new i(e, t, n)
        }, i.prototype.get = function() {
            var e, n;
            return e = this.filter.onlyTemplate === !0 ? r.xfind(this.selector).filter("[template]") : this.filter.noTemplate === !0 ? r.xfind(this.selector).not("[template], [template] *") : r.xfind(this.selector), this.filter.noEmpty === !0 ? e = e.filter(function() {
                return n = t(this).text(), 0 === t(this).children().length && t.trim(n).length > 0
            }) : this.filter.onlyLeaf === !0 && (e = e.filter(function() {
                return 0 === t(this).children().length
            })), e = "undefined" != typeof this.index && null !== this.index ? e.eq(this.index) : e
        }, i.prototype.setVal = function(e, n, i) {
            var o, a, s, l, u;
            return a = this.getVal()[0], s = "undefined" != typeof e && null !== e ? t.isArray(e) ? e.join(" ") : e.toString() : "", s = this.convert(s, i), o = this.get(), 1 === o.length && t.trim(s.toString()) !== t.trim(a.toString()) ? (o.text(s), l = this.validate(n, i), u = this.getClosestRepeat(), u.nodes = [o.prop("nodeName")], r.trigger("dataupdate", u), "binary" === i && (s.length > 0 ? o.attr("type", "file") : o.removeAttr("type")), l) : o.length > 1 ? (console.error("nodeset.setVal expected nodeset with one node, but received multiple"), null) : 0 === o.length ? (console.error("Data node: " + this.selector + " with null-based index: " + this.index + " not found!"), null) : null
        }, i.prototype.getVal = function() {
            var e = [];
            return this.get().each(function() {
                e.push(t(this).text())
            }), e
        }, i.prototype.getIndex = function(e) {
            var n, i, o, a;
            return e = e || this.get(), 1 === e.length ? (n = e.prop("nodeName"), i = e.getXPath("instance"), a = r.find(n).filter(function() {
                return o = t(this), !o.is("[template]") && 0 === o.find("template").length && i === o.getXPath("instance")
            }), 1 === a.length ? null : a.index(e)) : (console.error("no node, or multiple nodes, provided to nodeset.getIndex"), -1)
        }, i.prototype.getClosestRepeat = function() {
            for (var e = this.get(), t = e.prop("nodeName"); 0 === e.siblings(t + ":not([template])").length && "instance" !== t;) e = e.parent(), t = e.prop("nodeName");
            return "instance" === t ? {} : {
                repeatPath: e.getXPath("instance"),
                repeatIndex: this.getIndex(e)
            }
        }, i.prototype.clone = function(e) {
            var n, i, o, a;
            n = this.get(), e = e || n, 1 === n.length && 1 === e.length ? (a = n.clone(), a.insertAfter(e).find("[template]").addBack().removeAttr("template"), i = [n.prop("nodeName")], n.find("*").each(function() {
                o = t(this), i.push(o.prop("nodeName"))
            }), r.trigger("dataupdate", {
                nodes: i,
                repeatPath: n.getXPath("instance"),
                repeatIndex: this.getIndex(a)
            })) : console.error("node.clone() function did not receive origin and target nodes")
        }, i.prototype.remove = function() {
            var e, n, i, o, a;
            e = this.get(), e.length > 0 ? (n = [e.prop("nodeName")], e.find("*").each(function() {
                i = t(this), n.push(i.prop("nodeName"))
            }), o = e.getXPath("instance"), a = this.getIndex(e), e.remove(), r.trigger("dataupdate", {
                updatedNodes: n,
                repeatPath: o,
                repeatIndex: a
            })) : console.error("could not find node " + this.selector + " with index " + this.index + " to remove ")
        }, i.prototype.convert = function(e, t) {
            return "" === e.toString() ? e : "undefined" != typeof t && null !== t && "undefined" != typeof this.types[t.toLowerCase()] && "undefined" != typeof this.types[t.toLowerCase()].convert ? this.types[t.toLowerCase()].convert(e) : e
        }, i.prototype.validate = function(e, t) {
            var n, i, r = this.getVal()[0];
            return "" === r.toString() ? !0 : (("undefined" == typeof t || null === t || "undefined" == typeof this.types[t.toLowerCase()]) && (t = "string"), n = this.types[t.toLowerCase()].validate(r), i = "undefined" != typeof e && null !== e && e.length > 0 ? o.evaluate(e, "boolean", this.originalSelector, this.index) : !0, n && i)
        }, i.prototype.types = {
            string: {
                validate: function() {
                    return !0
                }
            },
            select: {
                validate: function() {
                    return !0
                }
            },
            select1: {
                validate: function() {
                    return !0
                }
            },
            decimal: {
                validate: function(e) {
                    return isNaN(e - 0) || null === e ? !1 : !0
                }
            },
            "int": {
                validate: function(e) {
                    return isNaN(e - 0) || null === e || Math.round(e) != e ? !1 : !0
                }
            },
            date: {
                validate: function(e) {
                    var t = /([0-9]{4})([\-]|[\/])([0-9]{2})([\-]|[\/])([0-9]{2})/,
                        n = t.exec(e);
                    return n && 6 === n.length ? "Invalid Date" !== new Date(Number(n[1]), Number(n[3]) - 1, Number(n[5])).toString() : !1
                },
                convert: function(e) {
                    var t = /([0-9]{4})([\-]|[\/])([0-9]{2})([\-]|[\/])([0-9]{2})/,
                        n = t.exec(e),
                        i = new Date(e);
                    return "Invalid Date" == new Date(e).toString() && n && Number(n[1]) > 0 && Number(n[3]) >= 0 && Number(n[3]) < 12 && Number(n[5]) < 32 && (i = new Date(Number(n[1]), Number(n[3]) - 1, Number(n[5]))), i.getUTCFullYear().toString().pad(4) + "-" + (i.getUTCMonth() + 1).toString().pad(2) + "-" + i.getUTCDate().toString().pad(2)
                }
            },
            datetime: {
                validate: function(e) {
                    return "Invalid Date" !== new Date(e.toString()).toString() || "Invalid Date" !== new Date(this.convert(e.toString())).toString()
                },
                convert: function(e) {
                    var t, n = /([0-9]{4}\-[0-9]{2}\-[0-9]{2})([T]|[\s])([0-9]){2}:([0-9]){2}([0-9:.]*)(\+|\-)([0-9]{2}):([0-9]{2})$/,
                        i = /([0-9]{4}\-[0-9]{2}\-[0-9]{2})([T]|[\s])([0-9]){2}:([0-9]){2}([0-9:.]*)(\+|\-)([0-9]{2})$/;
                    return "Invalid Date" !== new Date(e).toString() && n.test(e) ? e : "Invalid Date" == new Date(e).toString() && i.test(e) ? e + ":00" : (t = new Date(e), "Invalid Date" !== t.toString() ? t.toISOLocalString() : t.toString())
                }
            },
            time: {
                validate: function(e) {
                    var t = new Date,
                        n = e.toString().split(":");
                    return n.length < 2 ? !1 : (n[2] = n[2] ? Number(n[2].toString().split(".")[0]) : 0, n[0] < 24 && n[0] >= 0 && n[1] < 60 && n[1] >= 0 && n[2] < 60 && n[2] >= 0 && "Invalid Date" !== t.toString())
                },
                convert: function(e) {
                    var n = e.toString().split(":");
                    return t.each(n, function(e, t) {
                        n[e] = t.toString().pad(2)
                    }), n.join(":")
                }
            },
            barcode: {
                validate: function() {
                    return !0
                }
            },
            geopoint: {
                validate: function(e) {
                    var t = e.toString().trim().split(" ");
                    return "" !== t[0] && t[0] >= -90 && t[0] <= 90 && "" !== t[1] && t[1] >= -180 && t[1] <= 180 && ("undefined" == typeof t[2] || !isNaN(t[2])) && ("undefined" == typeof t[3] || !isNaN(t[3]) && t[3] >= 0)
                },
                convert: function(e) {
                    return t.trim(e.toString())
                }
            },
            geotrace: {
                validate: function(e) {
                    var t = e.toString().split(";");
                    return t.length >= 2 && t.every(function(e) {
                        return (new i).types.geopoint.validate(e)
                    })
                },
                convert: function(e) {
                    return e.toString().trim()
                }
            },
            geoshape: {
                validate: function(e) {
                    var t = e.toString().split(";");
                    return t.length >= 4 && t[0] === t[t.length - 1] && t.every(function(e) {
                        return (new i).types.geopoint.validate(e)
                    })
                },
                convert: function(e) {
                    return e.toString().trim()
                }
            },
            binary: {
                validate: function() {
                    return !0
                }
            }
        }
    }
    return n.prototype.getInstanceID = function() {
        return this.node(":first>meta>instanceID").getVal()[0]
    }, n.prototype.cloneTemplate = function(e, t) {
        var n, i, r = this.node(e, 0, {
            onlyTemplate: !0
        });
        r = 0 === r.get().length ? this.node(e, 0) : r, i = r.get().prop("nodeName"), n = this.node(e, t).get(), 1 === r.get().length && 1 === n.length && n.next().prop("nodeName") !== i ? r.clone(n) : n.next().prop("nodeName") !== i && console.error("Could not find template node and/or node to insert the clone after")
    }, n.prototype.cloneAllTemplates = function() {
        this.$.find("model > instance:eq(0) [template]").reverse().each(function() {
            0 === t(this).parent().closest("[template]").length && 0 === t(this).siblings(t(this).prop("nodeName")).not("[template]").length && t(this).clone().insertAfter(t(this)).find("*").addBack().removeAttr("template")
        })
    }, n.prototype.get = function() {
        return this.$ || null
    }, n.prototype.getXML = function() {
        return this.xml || null
    }, n.prototype.getStr = function(e, t, n) {
        var i;
        return i = (new XMLSerializer).serializeToString(this.getInstanceClone(e, t, n)[0]), i = i.replace(/\t/g, "")
    }, n.prototype.getInstanceClone = function(e, t, n) {
        var i = n ? this.$.find(":first").clone() : this.node("> *:first").get().clone();
        return e ? i : i.find("[template]").remove().end()
    }, n.prototype.makeBugCompliant = function(e, t, n) {
        var i, r, o, a, s, l, u, c;
        for (a = this.node(t, n).get(), c = a.parents().add(a), i = c.length - 1; i >= 0; i--) s = c.eq(i), l = s.prop("nodeName").replace(/\./g, "\\."), u = s.siblings(l).not("[template]"), "instance" !== l.toLowerCase() && "model" !== l.toLowerCase() && u.length > 0 && (r = s.getXPath("instance"), o = u.add(s).index(s), e = e.replace(new RegExp(r, "g"), r + "[" + (o + 1) + "]"));
        return e
    }, n.prototype.evaluate = function(i, r, o, a, s) {
        var l, u, c, d, h, p, f, g, m, v, y, b, w;
        if (s = s || !1, r = r || "any", a = a || 0, i = i.trim(), h = new n(this.getStr(!1, !1)).$, p = h[0], this.INSTANCE.test(i))
            for (f = i.match(this.INSTANCE), l = 0; l < f.length; l++) g = f[l].match(/[\'|\"]([^\'']+)[\'|\"]/)[1], i = i.replace(f[l], '/node()/instance[@id="' + g + '"]'), this.$.find(":first>instance#" + g).clone().appendTo(h.find(":first"));
        "undefined" != typeof o && null !== o ? (d = h.xfind(o).eq(a)[0], b = this.node(o).get(), b.length > 1 && (i = this.makeBugCompliant(i, o, a))) : d = p, v = {
            0: ["any", "ANY_TYPE"],
            1: ["number", "NUMBER_TYPE", "numberValue"],
            2: ["string", "STRING_TYPE", "stringValue"],
            3: ["boolean", "BOOLEAN_TYPE", "booleanValue"],
            7: ["nodes", "ORDERED_NODE_SNAPSHOT_TYPE"],
            9: ["node", "FIRST_ORDERED_NODE_TYPE"]
        };
        for (m in v) {
            if (m = Number(m), v[m][0] == r) break;
            m = 0
        }
        if (i = i.replace(/&lt;/g, "<"), i = i.replace(/&gt;/g, ">"), i = i.replace(/&quot;/g, '"'), s && "undefined" != typeof p.evaluate && !this.OPENROSA.test(i)) try {
            y = p.evaluate(i, d, null, m, null)
        } catch (x) {
            console.log("%cWell native XPath evaluation that did not work... No worries, worth a shot, the expression probably contained unknown OpenRosa functions or errors:", "color:orange", i)
        }
        if (!y) try {
            e.bindDomLevel3XPath(p), y = p.evaluate(i, d, null, m, null)
        } catch (x) {
            return c = "Error occurred trying to evaluate: " + i + ", message: " + x.message, console.error(c), t(document).trigger("xpatherror", c), this.loadErrors.push(c), null
        }
        if (y) {
            if (0 === m) {
                for (m in v)
                    if (m = Number(m), m == Number(y.resultType) && m > 0 && 4 > m) {
                        w = y[v[m][2]];
                        break
                    }
                console.error("Expression: " + i + " did not return any boolean, string or number value as expected")
            } else if (7 === m)
                for (w = [], u = 0; u < y.snapshotLength; u++) w.push(y.snapshotItem(u));
            else w = y[v[m][2]];
            return w
        }
    }, n
}), define("text", ["module"], function(e) {
    var t, n, i, r, o, a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        u = "undefined" != typeof location && location.href,
        c = u && location.protocol && location.protocol.replace(/\:/, ""),
        d = u && location.hostname,
        h = u && (location.port || void 0),
        p = {},
        f = e.config && e.config() || {};
    return t = {
        version: "2.0.10",
        strip: function(e) {
            if (e) {
                e = e.replace(s, "");
                var t = e.match(l);
                t && (e = t[1])
            } else e = "";
            return e
        },
        jsEscape: function(e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        },
        createXhr: f.createXhr || function() {
            var e, t, n;
            if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
            if ("undefined" != typeof ActiveXObject)
                for (t = 0; 3 > t; t += 1) {
                    n = a[t];
                    try {
                        e = new ActiveXObject(n)
                    } catch (i) {}
                    if (e) {
                        a = [n];
                        break
                    }
                }
            return e
        },
        parseName: function(e) {
            var t, n, i, r = !1,
                o = e.indexOf("."),
                a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
            return -1 !== o && (!a || o > 1) ? (t = e.substring(0, o), n = e.substring(o + 1, e.length)) : t = e, i = n || t, o = i.indexOf("!"), -1 !== o && (r = "strip" === i.substring(o + 1), i = i.substring(0, o), n ? n = i : t = i), {
                moduleName: t,
                ext: n,
                strip: r
            }
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function(e, n, i, r) {
            var o, a, s, l = t.xdRegExp.exec(e);
            return l ? (o = l[2], a = l[3], a = a.split(":"), s = a[1], a = a[0], !(o && o !== n || a && a.toLowerCase() !== i.toLowerCase() || (s || a) && s !== r)) : !0
        },
        finishLoad: function(e, n, i, r) {
            i = n ? t.strip(i) : i, f.isBuild && (p[e] = i), r(i)
        },
        load: function(e, n, i, r) {
            if (r.isBuild && !r.inlineText) return void i();
            f.isBuild = r.isBuild;
            var o = t.parseName(e),
                a = o.moduleName + (o.ext ? "." + o.ext : ""),
                s = n.toUrl(a),
                l = f.useXhr || t.useXhr;
            return 0 === s.indexOf("empty:") ? void i() : void(!u || l(s, c, d, h) ? t.get(s, function(n) {
                t.finishLoad(e, o.strip, n, i)
            }, function(e) {
                i.error && i.error(e)
            }) : n([a], function(e) {
                t.finishLoad(o.moduleName + "." + o.ext, o.strip, e, i)
            }))
        },
        write: function(e, n, i) {
            if (p.hasOwnProperty(n)) {
                var r = t.jsEscape(p[n]);
                i.asModule(e + "!" + n, "define(function () { return '" + r + "';});\n")
            }
        },
        writeFile: function(e, n, i, r, o) {
            var a = t.parseName(n),
                s = a.ext ? "." + a.ext : "",
                l = a.moduleName + s,
                u = i.toUrl(a.moduleName + s) + ".js";
            t.load(l, i, function() {
                var n = function(e) {
                    return r(u, e)
                };
                n.asModule = function(e, t) {
                    return r.asModule(e, u, t)
                }, t.write(e, l, n, o)
            }, o)
        }
    }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (n = require.nodeRequire("fs"), t.get = function(e, t, i) {
        try {
            var r = n.readFileSync(e, "utf8");
            0 === r.indexOf("???") && (r = r.substring(1)), t(r)
        } catch (o) {
            i(o)
        }
    }) : "xhr" === f.env || !f.env && t.createXhr() ? t.get = function(e, n, i, r) {
        var o, a = t.createXhr();
        if (a.open("GET", e, !0), r)
            for (o in r) r.hasOwnProperty(o) && a.setRequestHeader(o.toLowerCase(), r[o]);
        f.onXhr && f.onXhr(a, e), a.onreadystatechange = function() {
            var t, r;
            4 === a.readyState && (t = a.status, t > 399 && 600 > t ? (r = new Error(e + " HTTP status: " + t), r.xhr = a, i(r)) : n(a.responseText), f.onXhrComplete && f.onXhrComplete(a, e))
        }, a.send(null)
    } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? t.get = function(e, t) {
        var n, i, r = "utf-8",
            o = new java.io.File(e),
            a = java.lang.System.getProperty("line.separator"),
            s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o), r)),
            l = "";
        try {
            for (n = new java.lang.StringBuffer, i = s.readLine(), i && i.length() && 65279 === i.charAt(0) && (i = i.substring(1)), null !== i && n.append(i); null !== (i = s.readLine());) n.append(a), n.append(i);
            l = String(n.toString())
        } finally {
            s.close()
        }
        t(l)
    } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (i = Components.classes, r = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), o = "@mozilla.org/windows-registry-key;1" in i, t.get = function(e, t) {
        var n, a, s, l = {};
        o && (e = e.replace(/\//g, "\\")), s = new FileUtils.File(e);
        try {
            n = i["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream), n.init(s, 1, 0, !1), a = i["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream), a.init(n, "utf-8", n.available(), r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), a.readString(n.available(), l), a.close(), n.close(), t(l.value)
        } catch (u) {
            throw new Error((s && s.path || "") + ": " + u)
        }
    }), t
}), define("text!enketo-config", [], function() {
    return '{\n    "widgets": [\n        "enketo-widget/note/notewidget",\n        "enketo-widget/select-mobile/selectpicker",\n        "enketo-widget/table/tablewidget",\n        "enketo-widget/radio/radiopicker",\n        "enketo-widget/time/timepicker-extended",\n        "enketo-widget/date/datepicker-extended",\n        "enketo-widget/datetime/datetimepicker-extended",\n        "enketo-widget/mediagrid/mediagridpicker",\n        "enketo-widget/select-likert/likertitem"\n    ],\n    "gmapsStaticApiKey": "",\n    "gmapsDynamicApiKey": "",\n    "environment": "android"\n}\n'
}), window.Modernizr = function(e, t, n) {
    function i(e) {
        b.cssText = e
    }

    function r(e, t) {
        return i(T.join(e + ";") + (t || ""))
    }

    function o(e, t) {
        return typeof e === t
    }

    function a(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function s(e, t) {
        for (var i in e) {
            var r = e[i];
            if (!a(r, "-") && b[r] !== n) return "pfx" == t ? r : !0
        }
        return !1
    }

    function l(e, t, i) {
        for (var r in e) {
            var a = t[e[r]];
            if (a !== n) return i === !1 ? e[r] : o(a, "function") ? a.bind(i || t) : a
        }
        return !1
    }

    function u(e, t, n) {
        var i = e.charAt(0).toUpperCase() + e.slice(1),
            r = (e + " " + _.join(i + " ") + i).split(" ");
        return o(t, "string") || o(t, "undefined") ? s(r, t) : (r = (e + " " + D.join(i + " ") + i).split(" "), l(r, t, n))
    }

    function c() {
        f.input = function(n) {
            for (var i = 0, r = n.length; r > i; i++) M[n[i]] = !!(n[i] in w);
            return M.list && (M.list = !(!t.createElement("datalist") || !e.HTMLDataListElement)), M
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), f.inputtypes = function(e) {
            for (var i, r, o, a = 0, s = e.length; s > a; a++) w.setAttribute("type", r = e[a]), i = "text" !== w.type, i && (w.value = x, w.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(r) && w.style.WebkitAppearance !== n ? (m.appendChild(w), o = t.defaultView, i = o.getComputedStyle && "textfield" !== o.getComputedStyle(w, null).WebkitAppearance && 0 !== w.offsetHeight, m.removeChild(w)) : /^(search|tel)$/.test(r) || (i = /^(url|email)$/.test(r) ? w.checkValidity && w.checkValidity() === !1 : w.value != x)), N[e[a]] = !!i;
            return N
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var d, h, p = "2.7.1",
        f = {},
        g = !0,
        m = t.documentElement,
        v = "modernizr",
        y = t.createElement(v),
        b = y.style,
        w = t.createElement("input"),
        x = ":)",
        E = {}.toString,
        T = " -webkit- -moz- -o- -ms- ".split(" "),
        k = "Webkit Moz O ms",
        _ = k.split(" "),
        D = k.toLowerCase().split(" "),
        C = {
            svg: "http://www.w3.org/2000/svg"
        },
        S = {},
        N = {},
        M = {},
        A = [],
        P = A.slice,
        O = function(e, n, i, r) {
            var o, a, s, l, u = t.createElement("div"),
                c = t.body,
                d = c || t.createElement("body");
            if (parseInt(i, 10))
                for (; i--;) s = t.createElement("div"), s.id = r ? r[i] : v + (i + 1), u.appendChild(s);
            return o = ["&#173;", '<style id="s', v, '">', e, "</style>"].join(""), u.id = v, (c ? u : d).innerHTML += o, d.appendChild(u), c || (d.style.background = "", d.style.overflow = "hidden", l = m.style.overflow, m.style.overflow = "hidden", m.appendChild(d)), a = n(u, e), c ? u.parentNode.removeChild(u) : (d.parentNode.removeChild(d), m.style.overflow = l), !!a
        },
        R = function(t) {
            var n = e.matchMedia || e.msMatchMedia;
            if (n) return n(t).matches;
            var i;
            return O("@media " + t + " { #" + v + " { position: absolute; } }", function(t) {
                i = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
            }), i
        },
        j = function() {
            function e(e, r) {
                r = r || t.createElement(i[e] || "div"), e = "on" + e;
                var a = e in r;
                return a || (r.setAttribute || (r = t.createElement("div")), r.setAttribute && r.removeAttribute && (r.setAttribute(e, ""), a = o(r[e], "function"), o(r[e], "undefined") || (r[e] = n), r.removeAttribute(e))), r = null, a
            }
            var i = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return e
        }(),
        I = {}.hasOwnProperty;
    h = o(I, "undefined") || o(I.call, "undefined") ? function(e, t) {
        return t in e && o(e.constructor.prototype[t], "undefined")
    } : function(e, t) {
        return I.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = P.call(arguments, 1),
            i = function() {
                if (this instanceof i) {
                    var r = function() {};
                    r.prototype = t.prototype;
                    var o = new r,
                        a = t.apply(o, n.concat(P.call(arguments)));
                    return Object(a) === a ? a : o
                }
                return t.apply(e, n.concat(P.call(arguments)))
            };
        return i
    }), S.flexbox = function() {
        return u("flexWrap")
    }, S.canvas = function() {
        var e = t.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    }, S.canvastext = function() {
        return !(!f.canvas || !o(t.createElement("canvas").getContext("2d").fillText, "function"))
    }, S.webgl = function() {
        return !!e.WebGLRenderingContext
    }, S.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : O(["@media (", T.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
            n = 9 === e.offsetTop
        }), n
    }, S.geolocation = function() {
        return "geolocation" in navigator
    }, S.postmessage = function() {
        return !!e.postMessage
    }, S.websqldatabase = function() {
        return !!e.openDatabase
    }, S.hashchange = function() {
        return j("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, S.history = function() {
        return !(!e.history || !history.pushState)
    }, S.draganddrop = function() {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, S.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e
    }, S.rgba = function() {
        return i("background-color:rgba(150,255,150,.5)"), a(b.backgroundColor, "rgba")
    }, S.hsla = function() {
        return i("background-color:hsla(120,40%,100%,.5)"), a(b.backgroundColor, "rgba") || a(b.backgroundColor, "hsla")
    }, S.multiplebgs = function() {
        return i("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(b.background)
    }, S.backgroundsize = function() {
        return u("backgroundSize")
    }, S.borderimage = function() {
        return u("borderImage")
    }, S.borderradius = function() {
        return u("borderRadius")
    }, S.boxshadow = function() {
        return u("boxShadow")
    }, S.textshadow = function() {
        return "" === t.createElement("div").style.textShadow
    }, S.opacity = function() {
        return r("opacity:.55"), /^0.55$/.test(b.opacity)
    }, S.cssanimations = function() {
        return u("animationName")
    }, S.csscolumns = function() {
        return u("columnCount")
    }, S.cssgradients = function() {
        var e = "background-image:",
            t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            n = "linear-gradient(left top,#9f9, white);";
        return i((e + "-webkit- ".split(" ").join(t + e) + T.join(n + e)).slice(0, -e.length)), a(b.backgroundImage, "gradient")
    }, S.cssreflections = function() {
        return u("boxReflect")
    }, S.csstransforms = function() {
        return !!u("transform")
    }, S.csstransforms3d = function() {
        var e = !!u("perspective");
        return e && "webkitPerspective" in m.style && O("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight
        }), e
    }, S.csstransitions = function() {
        return u("transition")
    }, S.fontface = function() {
        var e;
        return O('@font-face {font-family:"font";src:url("https://")}', function(n, i) {
            var r = t.getElementById("smodernizr"),
                o = r.sheet || r.styleSheet,
                a = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "";
            e = /src/i.test(a) && 0 === a.indexOf(i.split(" ")[0])
        }), e
    }, S.generatedcontent = function() {
        var e;
        return O(["#", v, "{font:0/0 a}#", v, ':after{content:"', x, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
            e = t.offsetHeight >= 3
        }), e
    }, S.video = function() {
        var e = t.createElement("video"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (i) {}
        return n
    }, S.audio = function() {
        var e = t.createElement("audio"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (i) {}
        return n
    }, S.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0
        } catch (e) {
            return !1
        }
    }, S.sessionstorage = function() {
        try {
            return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), !0
        } catch (e) {
            return !1
        }
    }, S.webworkers = function() {
        return !!e.Worker
    }, S.applicationcache = function() {
        return !!e.applicationCache
    }, S.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(C.svg, "svg").createSVGRect
    }, S.inlinesvg = function() {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == C.svg
    }, S.smil = function() {
        return !!t.createElementNS && /SVGAnimate/.test(E.call(t.createElementNS(C.svg, "animate")))
    }, S.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(E.call(t.createElementNS(C.svg, "clipPath")))
    };
    for (var F in S) h(S, F) && (d = F.toLowerCase(), f[d] = S[F](), A.push((f[d] ? "" : "no-") + d));
    return f.input || c(), f.addTest = function(e, t) {
        if ("object" == typeof e)
            for (var i in e) h(e, i) && f.addTest(i, e[i]);
        else {
            if (e = e.toLowerCase(), f[e] !== n) return f;
            t = "function" == typeof t ? t() : t, "undefined" != typeof g && g && (m.className += " " + (t ? "" : "no-") + e), f[e] = t
        }
        return f
    }, i(""), y = w = null, f._version = p, f._prefixes = T, f._domPrefixes = D, f._cssomPrefixes = _, f.mq = R, f.hasEvent = j, f.testProp = function(e) {
        return s([e])
    }, f.testAllProps = u, f.testStyles = O, f.prefixed = function(e, t, n) {
        return t ? u(e, t, n) : u(e, "pfx")
    }, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (g ? " js " + A.join(" ") : ""), f
}(this, this.document), function(e, t) {
    function n(e, t) {
        var n = e.createElement("p"),
            i = e.getElementsByTagName("head")[0] || e.documentElement;
        return n.innerHTML = "x<style>" + t + "</style>", i.insertBefore(n.lastChild, i.firstChild)
    }

    function i() {
        var e = E.elements;
        return "string" == typeof e ? e.split(" ") : e
    }

    function r(e) {
        var t = x[e[b]];
        return t || (t = {}, w++, e[b] = w, x[w] = t), t
    }

    function o(e, n, i) {
        if (n || (n = t), g) return n.createElement(e);
        i || (i = r(n));
        var o;
        return o = i.cache[e] ? i.cache[e].cloneNode() : y.test(e) ? (i.cache[e] = i.createElem(e)).cloneNode() : i.createElem(e), o.canHaveChildren && !v.test(e) ? i.frag.appendChild(o) : o
    }

    function a(e, n) {
        if (e || (e = t), g) return e.createDocumentFragment();
        n = n || r(e);
        for (var o = n.frag.cloneNode(), a = 0, s = i(), l = s.length; l > a; a++) o.createElement(s[a]);
        return o
    }

    function s(e, t) {
        t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
            return E.shivMethods ? o(n, e, t) : t.createElem(n)
        }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function(e) {
            return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
        }) + ");return n}")(E, t.frag)
    }

    function l(e) {
        e || (e = t);
        var i = r(e);
        return !E.shivCSS || f || i.hasCSS || (i.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), g || s(e, i), e
    }

    function u(e) {
        for (var t, n = e.getElementsByTagName("*"), r = n.length, o = RegExp("^(?:" + i().join("|") + ")$", "i"), a = []; r--;) t = n[r], o.test(t.nodeName) && a.push(t.applyElement(c(t)));
        return a
    }

    function c(e) {
        for (var t, n = e.attributes, i = n.length, r = e.ownerDocument.createElement(k + ":" + e.nodeName); i--;) t = n[i], t.specified && r.setAttribute(t.nodeName, t.nodeValue);
        return r.style.cssText = e.style.cssText, r
    }

    function d(e) {
        for (var t, n = e.split("{"), r = n.length, o = RegExp("(^|[\\s,>+~])(" + i().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), a = "$1" + k + "\\:$2"; r--;) t = n[r] = n[r].split("}"), t[t.length - 1] = t[t.length - 1].replace(o, a), n[r] = t.join("}");
        return n.join("{")
    }

    function h(e) {
        for (var t = e.length; t--;) e[t].removeNode()
    }

    function p(e) {
        function t() {
            clearTimeout(a._removeSheetTimer), i && i.removeNode(!0), i = null
        }
        var i, o, a = r(e),
            s = e.namespaces,
            l = e.parentWindow;
        return !_ || e.printShived ? e : ("undefined" == typeof s[k] && s.add(k), l.attachEvent("onbeforeprint", function() {
            t();
            for (var r, a, s, l = e.styleSheets, c = [], h = l.length, p = Array(h); h--;) p[h] = l[h];
            for (; s = p.pop();)
                if (!s.disabled && T.test(s.media)) {
                    try {
                        r = s.imports, a = r.length
                    } catch (f) {
                        a = 0
                    }
                    for (h = 0; a > h; h++) p.push(r[h]);
                    try {
                        c.push(s.cssText)
                    } catch (f) {}
                }
            c = d(c.reverse().join("")), o = u(e), i = n(e, c)
        }), l.attachEvent("onafterprint", function() {
            h(o), clearTimeout(a._removeSheetTimer), a._removeSheetTimer = setTimeout(t, 500)
        }), e.printShived = !0, e)
    }
    var f, g, m = e.html5 || {},
        v = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        y = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,
        b = "_html5shiv",
        w = 0,
        x = {};
    ! function() {
        try {
            var e = t.createElement("a");
            e.innerHTML = "<xyz></xyz>", f = "hidden" in e, g = 1 == e.childNodes.length || function() {
                t.createElement("a");
                var e = t.createDocumentFragment();
                return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
            }()
        } catch (n) {
            f = !0, g = !0
        }
    }();
    var E = {
        elements: m.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: m.shivCSS !== !1,
        supportsUnknownElements: g,
        shivMethods: m.shivMethods !== !1,
        type: "default",
        shivDocument: l,
        createElement: o,
        createDocumentFragment: a
    };
    e.html5 = E, l(t);
    var T = /^$|\b(?:all|print)\b/,
        k = "html5shiv",
        _ = !g && function() {
            var n = t.documentElement;
            return !("undefined" == typeof t.namespaces || "undefined" == typeof t.parentWindow || "undefined" == typeof n.applyElement || "undefined" == typeof n.removeNode || "undefined" == typeof e.attachEvent)
        }();
    E.type += " print", E.shivPrint = p, p(t)
}(this, document), Modernizr.addTest("json", !!window.JSON && !!JSON.parse), Modernizr.addTest("cors", !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest)), define("Modernizr", function(e) {
    return function() {
        var t;
        return t || e.Modernizr
    }
}(this)), define("enketo-js/widgets", ["text!enketo-config", "Modernizr", "jquery"], function(e, t, n) {
    function i(e) {
        h = n("form.or"), e = e || h, f ? u(e) : r(function() {
            u(e)
        })
    }

    function r(e) {
        require(g.widgets, function() {
            for (var t, n = [], i = 0; i < g.widgets.length; i++) t = "text!" + g.widgets[i].substr(0, g.widgets[i].lastIndexOf("/") + 1) + "config.json", n.push(t);
            require(n, function() {
                for (var t = 0; t < arguments.length; t++) p.push(JSON.parse(arguments[t]));
                f = !0, e()
            })
        })
    }

    function o(e, t) {
        return t ? e.find(t) : h
    }

    function a(e) {
        for (var t, n, i = 0; i < p.length; i++) t = p[i], t.name && (n = o(e, t.selector), n[t.name]("enable"))
    }

    function s(e) {
        for (var t, n, i = 0; i < p.length; i++) t = p[i], t.name && (n = o(e, t.selector), n[t.name]("disable"))
    }

    function l(e) {
        for (var t, n, i = 0; i < p.length; i++) t = p[i], t.name && (n = o(e, t.selector), n[t.name]("destroy"))
    }

    function u(e) {
        for (var n, i, r = 0; r < p.length; r++) n = p[r], n.options = n.options || {}, n.options.touch = t.touch, n.name && (n.selector || null === n.selector ? (i = o(e, n.selector), i[n.name](n.options), c(n, i), d(n, i)) : console.error("widget configuration has no acceptable selector property", n))
    }

    function c(e, t) {
        t.length > 0 && h.on("changelanguage", function() {
            t[e.name]("update")
        })
    }

    function d(e, t) {
        t.length > 0 && "select" === t.prop("nodeName").toLowerCase() && h.on("changeoption", "select", function() {
            n(this)[e.name]("update")
        })
    }
    var h, p = [],
        f = !1,
        g = JSON.parse(e);
    return {
        init: i,
        enable: a,
        disable: s,
        destroy: l
    }
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(e) {
    function t() {
        var e = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (void 0 !== e.style[n]) return {
                end: t[n]
            };
        return !1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n = !1,
            i = this;
        e(this).one(e.support.transition.end, function() {
            n = !0
        });
        var r = function() {
            n || e(i).trigger(e.support.transition.end)
        };
        return setTimeout(r, t), this
    }, e(function() {
        e.support.transition = t()
    })
}(jQuery), + function(e) {
    var t = '[data-dismiss="alert"]',
        n = function(n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function(t) {
        function n() {
            o.trigger("closed.bs.alert").remove()
        }
        var i = e(this),
            r = i.attr("data-target");
        r || (r = i.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        var o = e(r);
        t && t.preventDefault(), o.length || (o = i.hasClass("alert") ? i : i.parent()), o.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (o.removeClass("in"), e.support.transition && o.hasClass("fade") ? o.one(e.support.transition.end, n).emulateTransitionEnd(150) : n())
    };
    var i = e.fn.alert;
    e.fn.alert = function(t) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.alert");
            r || i.data("bs.alert", r = new n(this)), "string" == typeof t && r[t].call(i)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
        return e.fn.alert = i, this
    }, e(document).on("click.bs.alert.data-api", t, n.prototype.close)
}(jQuery), + function(e) {
    var t = function(n, i) {
        this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, i), this.isLoading = !1
    };
    t.DEFAULTS = {
        loadingText: "loading..."
    }, t.prototype.setState = function(t) {
        var n = "disabled",
            i = this.$element,
            r = i.is("input") ? "val" : "html",
            o = i.data();
        t += "Text", o.resetText || i.data("resetText", i[r]()), i[r](o[t] || this.options[t]), setTimeout(e.proxy(function() {
            "loadingText" == t ? (this.isLoading = !0, i.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n))
        }, this), 0)
    }, t.prototype.toggle = function() {
        var e = !0,
            t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? e = !1 : t.find(".active").removeClass("active")), e && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        e && this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.button"),
                o = "object" == typeof n && n;
            r || i.data("bs.button", r = new t(this, o)), "toggle" == n ? r.toggle() : n && r.setState(n)
        })
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
        return e.fn.button = n, this
    }, e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), t.preventDefault()
    })
}(jQuery), + function(e) {
    var t = function(t, n) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, t.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, t.prototype.to = function(t) {
        var n = this,
            i = this.getActiveIndex();
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            n.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(this.$items[t]))
    }, t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, t.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, t.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, t.prototype.slide = function(t, n) {
        var i = this.$element.find(".item.active"),
            r = n || i[t](),
            o = this.interval,
            a = "next" == t ? "left" : "right",
            s = "next" == t ? "first" : "last",
            l = this;
        if (!r.length) {
            if (!this.options.wrap) return;
            r = this.$element.find(".item")[s]()
        }
        if (r.hasClass("active")) return this.sliding = !1;
        var u = e.Event("slide.bs.carousel", {
            relatedTarget: r[0],
            direction: a
        });
        return this.$element.trigger(u), u.isDefaultPrevented() ? void 0 : (this.sliding = !0, o && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
            var t = e(l.$indicators.children()[l.getActiveIndex()]);
            t && t.addClass("active")
        })), e.support.transition && this.$element.hasClass("slide") ? (r.addClass(t), r[0].offsetWidth, i.addClass(a), r.addClass(a), i.one(e.support.transition.end, function() {
            r.removeClass([t, a].join(" ")).addClass("active"), i.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                l.$element.trigger("slid.bs.carousel")
            }, 0)
        }).emulateTransitionEnd(1e3 * i.css("transition-duration").slice(0, -1))) : (i.removeClass("active"), r.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), o && this.cycle(), this)
    };
    var n = e.fn.carousel;
    e.fn.carousel = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.carousel"),
                o = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n),
                a = "string" == typeof n ? n : o.slide;
            r || i.data("bs.carousel", r = new t(this, o)), "number" == typeof n ? r.to(n) : a ? r[a]() : o.interval && r.pause().cycle()
        })
    }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
        return e.fn.carousel = n, this
    }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
        var n, i = e(this),
            r = e(i.attr("data-target") || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
            o = e.extend({}, r.data(), i.data()),
            a = i.attr("data-slide-to");
        a && (o.interval = !1), r.carousel(o), (a = i.attr("data-slide-to")) && r.data("bs.carousel").to(a), t.preventDefault()
    }), e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var t = e(this);
            t.carousel(t.data())
        })
    })
}(jQuery), + function(e) {
    var t = function(n, i) {
        this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, i), this.transitioning = null, this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.DEFAULTS = {
        toggle: !0
    }, t.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }, t.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t = e.Event("show.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.$parent && this.$parent.find("> .panel > .in");
                if (n && n.length) {
                    var i = n.data("bs.collapse");
                    if (i && i.transitioning) return;
                    n.collapse("hide"), i || n.data("bs.collapse", null)
                }
                var r = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[r](0), this.transitioning = 1;
                var o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[r]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!e.support.transition) return o.call(this);
                var a = e.camelCase(["scroll", r].join("-"));
                this.$element.one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350)[r](this.$element[0][a])
            }
        }
    }, t.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return e.support.transition ? void this.$element[n](0).one(e.support.transition.end, e.proxy(i, this)).emulateTransitionEnd(350) : i.call(this)
            }
        }
    }, t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.collapse"),
                o = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n);
            !r && o.toggle && "show" == n && (n = !n), r || i.data("bs.collapse", r = new t(this, o)), "string" == typeof n && r[n]()
        })
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n, this
    }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n, i = e(this),
            r = i.attr("data-target") || t.preventDefault() || (n = i.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
            o = e(r),
            a = o.data("bs.collapse"),
            s = a ? "toggle" : i.data(),
            l = i.attr("data-parent"),
            u = l && e(l);
        a && a.transitioning || (u && u.find('[data-toggle=collapse][data-parent="' + l + '"]').not(i).addClass("collapsed"), i[o.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), o.collapse(s)
    })
}(jQuery), + function(e) {
    function t(t) {
        e(i).remove(), e(r).each(function() {
            var i = n(e(this)),
                r = {
                    relatedTarget: this
                };
            i.hasClass("open") && (i.trigger(t = e.Event("hide.bs.dropdown", r)), t.isDefaultPrevented() || i.removeClass("open").trigger("hidden.bs.dropdown", r))
        })
    }

    function n(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && e(n);
        return i && i.length ? i : t.parent()
    }
    var i = ".dropdown-backdrop",
        r = "[data-toggle=dropdown]",
        o = function(t) {
            e(t).on("click.bs.dropdown", this.toggle)
        };
    o.prototype.toggle = function(i) {
        var r = e(this);
        if (!r.is(".disabled, :disabled")) {
            var o = n(r),
                a = o.hasClass("open");
            if (t(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t);
                var s = {
                    relatedTarget: this
                };
                if (o.trigger(i = e.Event("show.bs.dropdown", s)), i.isDefaultPrevented()) return;
                o.toggleClass("open").trigger("shown.bs.dropdown", s), r.focus()
            }
            return !1
        }
    }, o.prototype.keydown = function(t) {
        if (/(38|40|27)/.test(t.keyCode)) {
            var i = e(this);
            if (t.preventDefault(), t.stopPropagation(), !i.is(".disabled, :disabled")) {
                var o = n(i),
                    a = o.hasClass("open");
                if (!a || a && 27 == t.keyCode) return 27 == t.which && o.find(r).focus(), i.click();
                var s = " li:not(.divider):visible a",
                    l = o.find("[role=menu]" + s + ", [role=listbox]" + s);
                if (l.length) {
                    var u = l.index(l.filter(":focus"));
                    38 == t.keyCode && u > 0 && u--, 40 == t.keyCode && u < l.length - 1 && u++, ~u || (u = 0), l.eq(u).focus()
                }
            }
        }
    };
    var a = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var n = e(this),
                i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new o(this)), "string" == typeof t && i[t].call(n)
        })
    }, e.fn.dropdown.Constructor = o, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = a, this
    }, e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", r, o.prototype.toggle).on("keydown.bs.dropdown.data-api", r + ", [role=menu], [role=listbox]", o.prototype.keydown)
}(jQuery), + function(e) {
    var t = function(t, n) {
        this.options = n, this.$element = e(t), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, t.prototype.toggle = function(e) {
        return this[this.isShown ? "hide" : "show"](e)
    }, t.prototype.show = function(t) {
        var n = this,
            i = e.Event("show.bs.modal", {
                relatedTarget: t
            });
        this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.backdrop(function() {
            var i = e.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show().scrollTop(0), i && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var r = e.Event("shown.bs.modal", {
                relatedTarget: t
            });
            i ? n.$element.find(".modal-dialog").one(e.support.transition.end, function() {
                n.$element.focus().trigger(r)
            }).emulateTransitionEnd(300) : n.$element.focus().trigger(r)
        }))
    }, t.prototype.hide = function(t) {
        t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, t.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus()
        }, this))
    }, t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, t.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop(function() {
            e.removeBackdrop(), e.$element.trigger("hidden.bs.modal")
        })
    }, t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, t.prototype.backdrop = function(t) {
        var n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = e.support.transition && n;
            if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", e.proxy(function(e) {
                e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
            i ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t()
    };
    var n = e.fn.modal;
    e.fn.modal = function(n, i) {
        return this.each(function() {
            var r = e(this),
                o = r.data("bs.modal"),
                a = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n);
            o || r.data("bs.modal", o = new t(this, a)), "string" == typeof n ? o[n](i) : a.show && o.show(i)
        })
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
        return e.fn.modal = n, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this),
            i = n.attr("href"),
            r = e(n.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
            o = r.data("bs.modal") ? "toggle" : e.extend({
                remote: !/#/.test(i) && i
            }, r.data(), n.data());
        n.is("a") && t.preventDefault(), r.modal(o, this).one("hide", function() {
            n.is(":visible") && n.focus()
        })
    }), e(document).on("show.bs.modal", ".modal", function() {
        e(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        e(document.body).removeClass("modal-open")
    })
}(jQuery), + function(e) {
    var t = function(e, t) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", e, t)
    };
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, t.prototype.init = function(t, n, i) {
        this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(i);
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var a = r[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != a) {
                var s = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.getOptions = function(t) {
        return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, t.prototype.getDelegateOptions = function() {
        var t = {},
            n = this.getDefaults();
        return this._options && e.each(this._options, function(e, i) {
            n[e] != i && (t[e] = i)
        }), t
    }, t.prototype.enter = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show()
    }, t.prototype.leave = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, t.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(t), t.isDefaultPrevented()) return;
            var n = this,
                i = this.tip();
            this.setContent(), this.options.animation && i.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
                o = /\s?auto?\s?/i,
                a = o.test(r);
            a && (r = r.replace(o, "") || "top"), i.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
            var s = this.getPosition(),
                l = i[0].offsetWidth,
                u = i[0].offsetHeight;
            if (a) {
                var c = this.$element.parent(),
                    d = r,
                    h = document.documentElement.scrollTop || document.body.scrollTop,
                    p = "body" == this.options.container ? window.innerWidth : c.outerWidth(),
                    f = "body" == this.options.container ? window.innerHeight : c.outerHeight(),
                    g = "body" == this.options.container ? 0 : c.offset().left;
                r = "bottom" == r && s.top + s.height + u - h > f ? "top" : "top" == r && s.top - h - u < 0 ? "bottom" : "right" == r && s.right + l > p ? "left" : "left" == r && s.left - l < g ? "right" : r, i.removeClass(d).addClass(r)
            }
            var m = this.getCalculatedOffset(r, s, l, u);
            this.applyPlacement(m, r), this.hoverState = null;
            var v = function() {
                n.$element.trigger("shown.bs." + n.type)
            };
            e.support.transition && this.$tip.hasClass("fade") ? i.one(e.support.transition.end, v).emulateTransitionEnd(150) : v()
        }
    }, t.prototype.applyPlacement = function(t, n) {
        var i, r = this.tip(),
            o = r[0].offsetWidth,
            a = r[0].offsetHeight,
            s = parseInt(r.css("margin-top"), 10),
            l = parseInt(r.css("margin-left"), 10);
        isNaN(s) && (s = 0), isNaN(l) && (l = 0), t.top = t.top + s, t.left = t.left + l, e.offset.setOffset(r[0], e.extend({
            using: function(e) {
                r.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }, t), 0), r.addClass("in");
        var u = r[0].offsetWidth,
            c = r[0].offsetHeight;
        if ("top" == n && c != a && (i = !0, t.top = t.top + a - c), /bottom|top/.test(n)) {
            var d = 0;
            t.left < 0 && (d = -2 * t.left, t.left = 0, r.offset(t), u = r[0].offsetWidth, c = r[0].offsetHeight), this.replaceArrow(d - o + u, u, "left")
        } else this.replaceArrow(c - a, c, "top");
        i && r.offset(t)
    }, t.prototype.replaceArrow = function(e, t, n) {
        this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
    }, t.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, t.prototype.hide = function() {
        function t() {
            "in" != n.hoverState && i.detach(), n.$element.trigger("hidden.bs." + n.type)
        }
        var n = this,
            i = this.tip(),
            r = e.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (i.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? i.one(e.support.transition.end, t).emulateTransitionEnd(150) : t(), this.hoverState = null, this)
    }, t.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, t.prototype.hasContent = function() {
        return this.getTitle()
    }, t.prototype.getPosition = function() {
        var t = this.$element[0];
        return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
            width: t.offsetWidth,
            height: t.offsetHeight
        }, this.$element.offset())
    }, t.prototype.getCalculatedOffset = function(e, t, n, i) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : "top" == e ? {
            top: t.top - i,
            left: t.left + t.width / 2 - n / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - i / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - i / 2,
            left: t.left + t.width
        }
    }, t.prototype.getTitle = function() {
        var e, t = this.$element,
            n = this.options;
        return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    }, t.prototype.tip = function() {
        return this.$tip = this.$tip || e(this.options.template)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, t.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, t.prototype.enable = function() {
        this.enabled = !0
    }, t.prototype.disable = function() {
        this.enabled = !1
    }, t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, t.prototype.toggle = function(t) {
        var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, t.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.tooltip"),
                o = "object" == typeof n && n;
            (r || "destroy" != n) && (r || i.data("bs.tooltip", r = new t(this, o)), "string" == typeof n && r[n]())
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n, this
    }
}(jQuery), + function(e) {
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.setContent = function() {
        var e = this.tip(),
            t = this.getTitle(),
            n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, t.prototype.getContent = function() {
        var e = this.$element,
            t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, t.prototype.tip = function() {
        return this.$tip || (this.$tip = e(this.options.template)), this.$tip
    };
    var n = e.fn.popover;
    e.fn.popover = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.popover"),
                o = "object" == typeof n && n;
            (r || "destroy" != n) && (r || i.data("bs.popover", r = new t(this, o)), "string" == typeof n && r[n]())
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
        return e.fn.popover = n, this
    }
}(jQuery), + function(e) {
    function t(n, i) {
        var r, o = e.proxy(this.process, this);
        this.$element = e(e(n).is("body") ? window : n), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", o), this.options = e.extend({}, t.DEFAULTS, i), this.selector = (this.options.target || (r = e(n).attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = e([]), this.targets = e([]), this.activeTarget = null, this.refresh(), this.process()
    }
    t.DEFAULTS = {
        offset: 10
    }, t.prototype.refresh = function() {
        var t = this.$element[0] == window ? "offset" : "position";
        this.offsets = e([]), this.targets = e([]); {
            var n = this;
            this.$body.find(this.selector).map(function() {
                var i = e(this),
                    r = i.data("target") || i.attr("href"),
                    o = /^#./.test(r) && e(r);
                return o && o.length && o.is(":visible") && [
                    [o[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), r]
                ] || null
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).each(function() {
                n.offsets.push(this[0]), n.targets.push(this[1])
            })
        }
    }, t.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            i = n - this.$scrollElement.height(),
            r = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (t >= i) return a != (e = o.last()[0]) && this.activate(e);
        if (a && t <= r[0]) return a != (e = o[0]) && this.activate(e);
        for (e = r.length; e--;) a != o[e] && t >= r[e] && (!r[e + 1] || t <= r[e + 1]) && this.activate(o[e])
    }, t.prototype.activate = function(t) {
        this.activeTarget = t, e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = e(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.scrollspy"),
                o = "object" == typeof n && n;
            r || i.data("bs.scrollspy", r = new t(this, o)), "string" == typeof n && r[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(jQuery), + function(e) {
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype.show = function() {
        var t = this.element,
            n = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target");
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = n.find(".active:last a")[0],
                o = e.Event("show.bs.tab", {
                    relatedTarget: r
                });
            if (t.trigger(o), !o.isDefaultPrevented()) {
                var a = e(i);
                this.activate(t.parent("li"), n), this.activate(a, a.parent(), function() {
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r
                    })
                })
            }
        }
    }, t.prototype.activate = function(t, n, i) {
        function r() {
            o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), i && i()
        }
        var o = n.find("> .active"),
            a = i && e.support.transition && o.hasClass("fade");
        a ? o.one(e.support.transition.end, r).emulateTransitionEnd(150) : r(), o.removeClass("in")
    };
    var n = e.fn.tab;
    e.fn.tab = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.tab");
            r || i.data("bs.tab", r = new t(this)), "string" == typeof n && r[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
        return e.fn.tab = n, this
    }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), e(this).tab("show")
    })
}(jQuery), + function(e) {
    var t = function(n, i) {
        this.options = e.extend({}, t.DEFAULTS, i), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(n), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
        offset: 0
    }, t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var e = this.$window.scrollTop(),
            n = this.$element.offset();
        return this.pinnedOffset = n.top - e
    }, t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, t.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var n = e(document).height(),
                i = this.$window.scrollTop(),
                r = this.$element.offset(),
                o = this.options.offset,
                a = o.top,
                s = o.bottom;
            "top" == this.affixed && (r.top += i), "object" != typeof o && (s = a = o), "function" == typeof a && (a = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var l = null != this.unpin && i + this.unpin <= r.top ? !1 : null != s && r.top + this.$element.height() >= n - s ? "bottom" : null != a && a >= i ? "top" : !1;
            if (this.affixed !== l) {
                this.unpin && this.$element.css("top", "");
                var u = "affix" + (l ? "-" + l : ""),
                    c = e.Event(u + ".bs.affix");
                this.$element.trigger(c), c.isDefaultPrevented() || (this.affixed = l, this.unpin = "bottom" == l ? this.getPinnedOffset() : null, this.$element.removeClass(t.RESET).addClass(u).trigger(e.Event(u.replace("affix", "affixed"))), "bottom" == l && this.$element.offset({
                    top: n - s - this.$element.height()
                }))
            }
        }
    };
    var n = e.fn.affix;
    e.fn.affix = function(n) {
        return this.each(function() {
            var i = e(this),
                r = i.data("bs.affix"),
                o = "object" == typeof n && n;
            r || i.data("bs.affix", r = new t(this, o)), "string" == typeof n && r[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.noConflict = function() {
        return e.fn.affix = n, this
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this),
                n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(jQuery), define("bootstrap", ["jquery"], function(e) {
        return function() {
            var t;
            return t || e.jQuery.fn.popover
        }
    }(this)),
    function(e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define("jquery.touchswipe", ["jquery"], e) : e(jQuery)
    }(function(e) {
        function t(t) {
            return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = u), void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function() {
                var i = e(this),
                    r = i.data(_);
                r || (r = new n(this, t), i.data(_, r))
            })
        }

        function n(t, n) {
            function D(t) {
                if (!(st() || e(t.target).closest(n.excludedElements, Ut).length > 0)) {
                    var i, r = t.originalEvent ? t.originalEvent : t,
                        o = k ? r.touches[0] : r;
                    return Bt = w, k ? Ht = r.touches.length : t.preventDefault(), Ot = 0, Rt = null, Vt = null, jt = 0, It = 0, Ft = 0, $t = 1, qt = 0, Wt = ht(), Lt = gt(), ot(), !k || Ht === n.fingers || n.fingers === y || L() ? (ut(0, o), zt = kt(), 2 == Ht && (ut(1, r.touches[1]), It = Ft = yt(Wt[0].start, Wt[1].start)), (n.swipeStatus || n.pinchStatus) && (i = O(r, Bt))) : i = !1, i === !1 ? (Bt = T, O(r, Bt), i) : (lt(!0), null)
                }
            }

            function C(e) {
                var t = e.originalEvent ? e.originalEvent : e;
                if (Bt !== E && Bt !== T && !at()) {
                    var i, r = k ? t.touches[0] : t,
                        o = ct(r);
                    if (Xt = kt(), k && (Ht = t.touches.length), Bt = x, 2 == Ht && (0 == It ? (ut(1, t.touches[1]), It = Ft = yt(Wt[0].start, Wt[1].start)) : (ct(t.touches[1]), Ft = yt(Wt[0].end, Wt[1].end), Vt = wt(Wt[0].end, Wt[1].end)), $t = bt(It, Ft), qt = Math.abs(It - Ft)), Ht === n.fingers || n.fingers === y || !k || L()) {
                        if (Rt = Tt(o.start, o.end), q(e, Rt), Ot = xt(o.start, o.end), jt = vt(), pt(Rt, Ot), (n.swipeStatus || n.pinchStatus) && (i = O(t, Bt)), !n.triggerOnTouchEnd || n.triggerOnTouchLeave) {
                            var a = !0;
                            if (n.triggerOnTouchLeave) {
                                var s = _t(this);
                                a = Dt(o.end, s)
                            }!n.triggerOnTouchEnd && a ? Bt = P(x) : n.triggerOnTouchLeave && !a && (Bt = P(E)), (Bt == T || Bt == E) && O(t, Bt)
                        }
                    } else Bt = T, O(t, Bt);
                    i === !1 && (Bt = T, O(t, Bt))
                }
            }

            function S(e) {
                var t = e.originalEvent;
                return k && t.touches.length > 0 ? (rt(), !0) : (at() && (Ht = Kt), e.preventDefault(), Xt = kt(), jt = vt(), I() ? (Bt = T, O(t, Bt)) : n.triggerOnTouchEnd || 0 == n.triggerOnTouchEnd && Bt === x ? (Bt = E, O(t, Bt)) : !n.triggerOnTouchEnd && Y() ? (Bt = E, R(t, Bt, p)) : Bt === x && (Bt = T, O(t, Bt)), lt(!1), null)
            }

            function N() {
                Ht = 0, Xt = 0, zt = 0, It = 0, Ft = 0, $t = 1, ot(), lt(!1)
            }

            function M(e) {
                var t = e.originalEvent;
                n.triggerOnTouchLeave && (Bt = P(E), O(t, Bt))
            }

            function A() {
                Ut.unbind(St, D), Ut.unbind(Pt, N), Ut.unbind(Nt, C), Ut.unbind(Mt, S), At && Ut.unbind(At, M), lt(!1)
            }

            function P(e) {
                var t = e,
                    i = $(),
                    r = j(),
                    o = I();
                return !i || o ? t = T : !r || e != x || n.triggerOnTouchEnd && !n.triggerOnTouchLeave ? !r && e == E && n.triggerOnTouchLeave && (t = T) : t = E, t
            }

            function O(e, t) {
                var n = void 0;
                return W() || H() ? n = R(e, t, d) : (U() || L()) && n !== !1 && (n = R(e, t, h)), nt() && n !== !1 ? n = R(e, t, f) : it() && n !== !1 ? n = R(e, t, g) : tt() && n !== !1 && (n = R(e, t, p)), t === T && N(e), t === E && (k ? 0 == e.touches.length && N(e) : N(e)), n
            }

            function R(t, u, c) {
                var m = void 0;
                if (c == d) {
                    if (Ut.trigger("swipeStatus", [u, Rt || null, Ot || 0, jt || 0, Ht]), n.swipeStatus && (m = n.swipeStatus.call(Ut, t, u, Rt || null, Ot || 0, jt || 0, Ht), m === !1)) return !1;
                    if (u == E && B()) {
                        if (Ut.trigger("swipe", [Rt, Ot, jt, Ht]), n.swipe && (m = n.swipe.call(Ut, t, Rt, Ot, jt, Ht), m === !1)) return !1;
                        switch (Rt) {
                            case i:
                                Ut.trigger("swipeLeft", [Rt, Ot, jt, Ht]), n.swipeLeft && (m = n.swipeLeft.call(Ut, t, Rt, Ot, jt, Ht));
                                break;
                            case r:
                                Ut.trigger("swipeRight", [Rt, Ot, jt, Ht]), n.swipeRight && (m = n.swipeRight.call(Ut, t, Rt, Ot, jt, Ht));
                                break;
                            case o:
                                Ut.trigger("swipeUp", [Rt, Ot, jt, Ht]), n.swipeUp && (m = n.swipeUp.call(Ut, t, Rt, Ot, jt, Ht));
                                break;
                            case a:
                                Ut.trigger("swipeDown", [Rt, Ot, jt, Ht]), n.swipeDown && (m = n.swipeDown.call(Ut, t, Rt, Ot, jt, Ht))
                        }
                    }
                }
                if (c == h) {
                    if (Ut.trigger("pinchStatus", [u, Vt || null, qt || 0, jt || 0, Ht, $t]), n.pinchStatus && (m = n.pinchStatus.call(Ut, t, u, Vt || null, qt || 0, jt || 0, Ht, $t), m === !1)) return !1;
                    if (u == E && V()) switch (Vt) {
                        case s:
                            Ut.trigger("pinchIn", [Vt || null, qt || 0, jt || 0, Ht, $t]), n.pinchIn && (m = n.pinchIn.call(Ut, t, Vt || null, qt || 0, jt || 0, Ht, $t));
                            break;
                        case l:
                            Ut.trigger("pinchOut", [Vt || null, qt || 0, jt || 0, Ht, $t]), n.pinchOut && (m = n.pinchOut.call(Ut, t, Vt || null, qt || 0, jt || 0, Ht, $t))
                    }
                }
                return c == p ? (u === T || u === E) && (clearTimeout(Qt), K() && !G() ? (Jt = kt(), Qt = setTimeout(e.proxy(function() {
                    Jt = null, Ut.trigger("tap", [t.target]), n.tap && (m = n.tap.call(Ut, t, t.target))
                }, this), n.doubleTapThreshold)) : (Jt = null, Ut.trigger("tap", [t.target]), n.tap && (m = n.tap.call(Ut, t, t.target)))) : c == f ? (u === T || u === E) && (clearTimeout(Qt), Jt = null, Ut.trigger("doubletap", [t.target]), n.doubleTap && (m = n.doubleTap.call(Ut, t, t.target))) : c == g && (u === T || u === E) && (clearTimeout(Qt), Jt = null, Ut.trigger("longtap", [t.target]), n.longTap && (m = n.longTap.call(Ut, t, t.target))), m
            }

            function j() {
                var e = !0;
                return null !== n.threshold && (e = Ot >= n.threshold), e
            }

            function I() {
                var e = !1;
                return null !== n.cancelThreshold && null !== Rt && (e = ft(Rt) - Ot >= n.cancelThreshold), e
            }

            function F() {
                return null !== n.pinchThreshold ? qt >= n.pinchThreshold : !0
            }

            function $() {
                var e;
                return e = n.maxTimeThreshold ? jt >= n.maxTimeThreshold ? !1 : !0 : !0
            }

            function q(e, t) {
                if (n.allowPageScroll === u || L()) e.preventDefault();
                else {
                    var s = n.allowPageScroll === c;
                    switch (t) {
                        case i:
                            (n.swipeLeft && s || !s && n.allowPageScroll != m) && e.preventDefault();
                            break;
                        case r:
                            (n.swipeRight && s || !s && n.allowPageScroll != m) && e.preventDefault();
                            break;
                        case o:
                            (n.swipeUp && s || !s && n.allowPageScroll != v) && e.preventDefault();
                            break;
                        case a:
                            (n.swipeDown && s || !s && n.allowPageScroll != v) && e.preventDefault()
                    }
                }
            }

            function V() {
                var e = z(),
                    t = X(),
                    n = F();
                return e && t && n
            }

            function L() {
                return !!(n.pinchStatus || n.pinchIn || n.pinchOut)
            }

            function U() {
                return !(!V() || !L())
            }

            function B() {
                var e = $(),
                    t = j(),
                    n = z(),
                    i = X(),
                    r = I(),
                    o = !r && i && n && t && e;
                return o
            }

            function H() {
                return !!(n.swipe || n.swipeStatus || n.swipeLeft || n.swipeRight || n.swipeUp || n.swipeDown)
            }

            function W() {
                return !(!B() || !H())
            }

            function z() {
                return Ht === n.fingers || n.fingers === y || !k
            }

            function X() {
                return 0 !== Wt[0].end.x
            }

            function Y() {
                return !!n.tap
            }

            function K() {
                return !!n.doubleTap
            }

            function J() {
                return !!n.longTap
            }

            function Q() {
                if (null == Jt) return !1;
                var e = kt();
                return K() && e - Jt <= n.doubleTapThreshold
            }

            function G() {
                return Q()
            }

            function Z() {
                return !(1 !== Ht && k || !isNaN(Ot) && 0 !== Ot)
            }

            function et() {
                return jt > n.longTapThreshold && b > Ot
            }

            function tt() {
                return !(!Z() || !Y())
            }

            function nt() {
                return !(!Q() || !K())
            }

            function it() {
                return !(!et() || !J())
            }

            function rt() {
                Yt = kt(), Kt = event.touches.length + 1
            }

            function ot() {
                Yt = 0, Kt = 0
            }

            function at() {
                var e = !1;
                if (Yt) {
                    var t = kt() - Yt;
                    t <= n.fingerReleaseThreshold && (e = !0)
                }
                return e
            }

            function st() {
                return !(Ut.data(_ + "_intouch") !== !0)
            }

            function lt(e) {
                e === !0 ? (Ut.bind(Nt, C), Ut.bind(Mt, S), At && Ut.bind(At, M)) : (Ut.unbind(Nt, C, !1), Ut.unbind(Mt, S, !1), At && Ut.unbind(At, M, !1)), Ut.data(_ + "_intouch", e === !0)
            }

            function ut(e, t) {
                var n = void 0 !== t.identifier ? t.identifier : 0;
                return Wt[e].identifier = n, Wt[e].start.x = Wt[e].end.x = t.pageX || t.clientX, Wt[e].start.y = Wt[e].end.y = t.pageY || t.clientY, Wt[e]
            }

            function ct(e) {
                var t = void 0 !== e.identifier ? e.identifier : 0,
                    n = dt(t);
                return n.end.x = e.pageX || e.clientX, n.end.y = e.pageY || e.clientY, n
            }

            function dt(e) {
                for (var t = 0; t < Wt.length; t++)
                    if (Wt[t].identifier == e) return Wt[t]
            }

            function ht() {
                for (var e = [], t = 0; 5 >= t; t++) e.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
                return e
            }

            function pt(e, t) {
                t = Math.max(t, ft(e)), Lt[e].distance = t
            }

            function ft(e) {
                return Lt[e] ? Lt[e].distance : void 0
            }

            function gt() {
                var e = {};
                return e[i] = mt(i), e[r] = mt(r), e[o] = mt(o), e[a] = mt(a), e
            }

            function mt(e) {
                return {
                    direction: e,
                    distance: 0
                }
            }

            function vt() {
                return Xt - zt
            }

            function yt(e, t) {
                var n = Math.abs(e.x - t.x),
                    i = Math.abs(e.y - t.y);
                return Math.round(Math.sqrt(n * n + i * i))
            }

            function bt(e, t) {
                var n = t / e * 1;
                return n.toFixed(2)
            }

            function wt() {
                return 1 > $t ? l : s
            }

            function xt(e, t) {
                return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
            }

            function Et(e, t) {
                var n = e.x - t.x,
                    i = t.y - e.y,
                    r = Math.atan2(i, n),
                    o = Math.round(180 * r / Math.PI);
                return 0 > o && (o = 360 - Math.abs(o)), o
            }

            function Tt(e, t) {
                var n = Et(e, t);
                return 45 >= n && n >= 0 ? i : 360 >= n && n >= 315 ? i : n >= 135 && 225 >= n ? r : n > 45 && 135 > n ? a : o
            }

            function kt() {
                var e = new Date;
                return e.getTime()
            }

            function _t(t) {
                t = e(t);
                var n = t.offset(),
                    i = {
                        left: n.left,
                        right: n.left + t.outerWidth(),
                        top: n.top,
                        bottom: n.top + t.outerHeight()
                    };
                return i
            }

            function Dt(e, t) {
                return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
            }
            var Ct = k || !n.fallbackToMouseEvents,
                St = Ct ? "touchstart" : "mousedown",
                Nt = Ct ? "touchmove" : "mousemove",
                Mt = Ct ? "touchend" : "mouseup",
                At = Ct ? null : "mouseleave",
                Pt = "touchcancel",
                Ot = 0,
                Rt = null,
                jt = 0,
                It = 0,
                Ft = 0,
                $t = 1,
                qt = 0,
                Vt = 0,
                Lt = null,
                Ut = e(t),
                Bt = "start",
                Ht = 0,
                Wt = null,
                zt = 0,
                Xt = 0,
                Yt = 0,
                Kt = 0,
                Jt = 0,
                Qt = null;
            try {
                Ut.bind(St, D), Ut.bind(Pt, N)
            } catch (Gt) {
                e.error("events not supported " + St + "," + Pt + " on jQuery.swipe")
            }
            this.enable = function() {
                return Ut.bind(St, D), Ut.bind(Pt, N), Ut
            }, this.disable = function() {
                return A(), Ut
            }, this.destroy = function() {
                return A(), Ut.data(_, null), Ut
            }, this.option = function(t, i) {
                if (void 0 !== n[t]) {
                    if (void 0 === i) return n[t];
                    n[t] = i
                } else e.error("Option " + t + " does not exist on jQuery.swipe.options");
                return null
            }
        }
        var i = "left",
            r = "right",
            o = "up",
            a = "down",
            s = "in",
            l = "out",
            u = "none",
            c = "auto",
            d = "swipe",
            h = "pinch",
            p = "tap",
            f = "doubletap",
            g = "longtap",
            m = "horizontal",
            v = "vertical",
            y = "all",
            b = 10,
            w = "start",
            x = "move",
            E = "end",
            T = "cancel",
            k = "ontouchstart" in window,
            _ = "TouchSwipe",
            D = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: "label, button, input, select, textarea, a, .noSwipe"
            };
        e.fn.swipe = function(n) {
            var i = e(this),
                r = i.data(_);
            if (r && "string" == typeof n) {
                if (r[n]) return r[n].apply(this, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + n + " does not exist on jQuery.swipe")
            } else if (!(r || "object" != typeof n && n)) return t.apply(this, arguments);
            return i
        }, e.fn.swipe.defaults = D, e.fn.swipe.phases = {
            PHASE_START: w,
            PHASE_MOVE: x,
            PHASE_END: E,
            PHASE_CANCEL: T
        }, e.fn.swipe.directions = {
            LEFT: i,
            RIGHT: r,
            UP: o,
            DOWN: a,
            IN: s,
            OUT: l
        }, e.fn.swipe.pageScroll = {
            NONE: u,
            HORIZONTAL: m,
            VERTICAL: v,
            AUTO: c
        }, e.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            ALL: y
        }
    }), define("enketo-js/Form", ["enketo-js/FormModel", "enketo-js/widgets", "jquery", "enketo-js/plugins", "enketo-js/extend", "bootstrap", "jquery.touchswipe"], function(e, t, n) {
        function i(i, r, o, a) {
            function s(e) {
                h = n(e), this.$ = h, this.$nonRepeats = {}
            }
            var l, u, c, d, h, p, f, g, m = [];
            this.init = function() {
                return p = n(i).clone().appendTo("<original></original>"), l = new e(r), d = new s(i), m = m.concat(l.init()), "undefined" != typeof o && o && o.length > 0 && (u = new e(o), m = m.concat(u.init()), this.load(u)), f = n(i).find(".or-repeat").length > 0, d.init(), m.length > 0 && console.error("loadErrors: ", m), window.scrollTo && window.scrollTo(0, 0), m
            }, this.ex = function(e, t, n, i) {
                return l.evaluate(e, t, n, i)
            }, this.getModel = function() {
                return l
            }, this.getInstanceID = function() {
                return l.getInstanceID()
            }, this.getView = function() {
                return d
            }, this.getEncryptionKey = function() {
                return d.$.data("base64rsapublickey")
            }, this.getDataStr = function(e, t, n) {
                return l.getStr(e, t, n)
            }, this.getRecordName = function() {
                return d.recordName.get()
            }, this.setRecordName = function(e) {
                return d.recordName.set(e)
            }, this.setEditStatus = function(e) {
                return d.editStatus.set(e)
            }, this.getEditStatus = function() {
                return d.editStatus.get()
            }, this.getSurveyName = function() {
                return h.find("#form-title").text()
            }, this.resetView = function() {
                n("#form-languages").remove(), h.replaceWith(p)
            }, this.resetHTML = this.resetView, this.validate = function() {
                return d.validateAll()
            }, this.isValid = function() {
                return d.isValid()
            }, this.load = function(e) {
                var t, i, r, o, s, u, c, p, f, g, v, y = {
                    noTemplate: !0,
                    noEmpty: !0
                };
                if (t = e.node(null, null, y).get(), l.node(null, null, y).get().each(function() {
                    n(this).text("")
                }), t.each(function() {
                    var t, a = n(this).prop("nodeName");
                    o = n(this).getXPath("instance"), i = e.node(o).get().index(n(this)), s = n(this).text(), c = h.find('[name="' + o + '"]').eq(0), r = c.length > 0 ? d.input.getXmlType(c) : "string", u = l.node(o, i);
                    try {
                        p = u.get()
                    } catch (g) {
                        return console.error(g), t = g.message || "unknown error", void m.push(t + " when retrieving " + o)
                    }
                    if (p.length > 1) console.error("Found multiple nodes with path: " + o + " and index: " + i);
                    else if (1 === p.length) u.setVal(s, null, r);
                    else if (l.node(o, 0, {
                        noTemplate: !1
                    }).get().closest("[template]").length > 0) {
                        f = l.node(o, 0, {
                            noTemplate: !1
                        }).get().closest("[template]");
                        for (var v = 0; i > v; v++) l.cloneTemplate(f.getXPath("instance"), v);
                        u = l.node(o, i), 1 === u.get().length ? u.setVal(s, null, r) : (g = "Error occured trying to clone template node to set the repeat value of the instance to be edited.", console.error(g), m.push(g))
                    } else 1 === n(this).parent("meta").length && 1 === l.node(n(this).parent("meta").getXPath("instance"), 0).get().length ? 0 === l.node(":first > meta > " + a, 0).get().length ? n(this).clone().appendTo(l.node(":first > meta").get()) : (g = "Found duplicate meta node (" + a + ")!", console.error(g), m.push(g)) : (g = "Did not find form element with path: " + o + " and index: " + i + " so failed to load model.", console.error(g), m.push(g))
                }), g = l.node("*>meta>instanceID"), 1 !== g.get().length) return v = "InstanceID node in default instance error (found " + g.get().length + " instanceID nodes)", console.error(v), void m.push(v);
                if (!a) {
                    if (1 !== l.node("*>meta>deprecatedID").get().length) {
                        var b = n.parseXML("<deprecatedID/>").documentElement;
                        document.adoptNode(b), n(b).appendTo(l.node("*>meta").get())
                    }
                    l.node("*>meta>deprecatedID").setVal(g.getVal()[0], null, "string"), g.setVal("", null, "string")
                }
            }, g = function(e, t, i, r, o) {
                var a, s, u, c = "",
                    d = e.match(/jr:choice-name\(([^,]+),\s?'(.*?)'\)/);
                return d ? (a = l.evaluate(d[1], t, i, r, o), s = d[2].trim(), u = h.find('[name="' + s + '"]'), u.length > 0 && "select" === u.prop("nodeName").toLowerCase() ? c = u.find('[value="' + a + '"]').text() : u.length > 0 && "input" === u.prop("nodeName").toLowerCase() && (c = u.filter(function() {
                    return n(this).attr("value") === a
                }).siblings(".option-label.active").text()), e.replace(d[0], "'" + c + "'")) : e
            }, s.prototype.init = function() {
                return "undefined" != typeof l && l instanceof e ? (this.preloads.init(this), this.grosslyViolateStandardComplianceByIgnoringCertainCalcs(), this.calcUpdate(), this.langs.init(), this.repeat.init(this), this.itemsetUpdate(), this.setAllVals(), t.init(), this.bootstrapify(), this.branchUpdate(), this.pages.init(), this.outputUpdate(), this.setEventHandlers(), void this.editStatus.set(!1)) : console.error("variable data needs to be defined as instance of FormModel")
            }, s.prototype.pages = {
                active: !1,
                $current: [],
                $activePages: n(),
                init: function() {
                    if (h.hasClass("pages")) {
                        var e = h.find(".note, .question, .trigger, .or-appearance-field-list").filter(function() {
                            return 0 === n(this).parent().closest(".or-appearance-field-list").length
                        }).attr("role", "page");
                        this.setToCurrent(e.first(":not(.disabled)")), (e.length > 1 || e.eq(0).hasClass("or-repeat")) && (this.$formFooter = n(".form-footer"), this.$btnFirst = this.$formFooter.find(".first-page"), this.$btnPrev = this.$formFooter.find(".previous-page"), this.$btnNext = this.$formFooter.find(".next-page"), this.$btnLast = this.$formFooter.find(".last-page"), this.updateAllActive(e), this.toggleButtons(0), this.setButtonHandlers(), this.setRepeatHandlers(), this.setBranchHandlers(), this.setSwipeHandlers(), this.active = !0), h.show()
                    }
                },
                setButtonHandlers: function() {
                    var e = this;
                    this.$btnFirst.click(function() {
                        return e.flipToFirst(), !1
                    }), this.$btnPrev.click(function() {
                        return e.prev(), !1
                    }), this.$btnNext.click(function() {
                        return console.log("next!"), e.next(), !1
                    }), this.$btnLast.click(function() {
                        return e.flipToLast(), !1
                    })
                },
                setSwipeHandlers: function() {
                    var e = this;
                    n(document).swipe({
                        allowPageScroll: "vertical",
                        threshold: 50,
                        swipeLeft: function() {
                            e.next()
                        },
                        swipeRight: function() {
                            console.log("swipe left!"), e.prev()
                        }
                    })
                },
                setRepeatHandlers: function() {
                    var e = this;
                    h.on("addrepeat", function(t) {
                        e.updateAllActive(), n(t.target).removeClass("current contains-current").find(".current").removeClass("current"), e.flipToPageContaining(n(t.target))
                    }), h.on("removerepeat", function(t) {
                        console.log("handling repeat removal in page object", t.target), 0 === e.$current.closest("html").length && (e.updateAllActive(), e.flipToPageContaining(n(t.target)))
                    })
                },
                setBranchHandlers: function() {
                    var e = this;
                    h.on("showbranch hidebranch", function() {
                        e.updateAllActive(), e.toggleButtons()
                    })
                },
                getCurrent: function() {
                    return this.$current
                },
                updateAllActive: function(e) {
                    e = e || n('.or [role="page"]'), this.$activePages = e.filter(function() {
                        return 0 === n(this).closest(".disabled").length
                    })
                },
                getAllActive: function() {
                    return this.$activePages
                },
                getPrev: function(e) {
                    return this.$activePages[e - 1]
                },
                getNext: function(e) {
                    return this.$activePages[e + 1]
                },
                getCurrentIndex: function() {
                    return this.$activePages.index(this.$current)
                },
                next: function() {
                    var e, t;
                    this.updateAllActive(), t = this.getCurrentIndex(), e = this.getNext(t), e ? this.flipTo(e, t + 1) : console.log("no page present to flip forward to!")
                },
                prev: function() {
                    var e, t;
                    this.updateAllActive(), t = this.getCurrentIndex(), e = this.getPrev(t), e ? this.flipTo(e, t - 1) : console.log("no page present to flip backward to")
                },
                setToCurrent: function(e) {
                    var t = n(e);
                    t.addClass("current hidden"), this.$current = t.removeClass("hidden").parentsUntil(".or", ".or-group, .or-group-data, .or-repeat").addClass("contains-current").end()
                },
                flipTo: function(e, t) {
                    this.$current.length > 0 && 1 === this.$current.closest("html").length ? this.$current[0] !== e && (this.$current.removeClass("current fade-out").parentsUntil(".or", ".or-group, .or-group-data, .or-repeat").removeClass("contains-current"), this.setToCurrent(e), this.focusOnFirstQuestion(e), this.toggleButtons(t)) : (this.setToCurrent(e), this.focusOnFirstQuestion(e), this.toggleButtons(t)), window.scrollTo && window.scrollTo(0, 0)
                },
                flipToFirst: function() {
                    this.updateAllActive(), this.flipTo(this.$activePages[0])
                },
                flipToLast: function() {
                    this.updateAllActive(), this.flipTo(this.$activePages.last()[0])
                },
                flipToPageContaining: function(e) {
                    var t;
                    t = e.closest('[role="page"]'), t = 0 === t.length ? e.find('[role="page"]') : t, this.flipTo(t[0])
                },
                focusOnFirstQuestion: function(e) {
                    n(e).find(".question:not(.disabled)").filter(function() {
                        return 0 === n(this).parents(".disabled").length
                    }).eq(0).find("input, select, textarea").eq(0).trigger("fakefocus")
                },
                toggleButtons: function(e) {
                    var t = e || this.getCurrentIndex(),
                        n = this.getNext(t),
                        i = this.getPrev(t);
                    this.$btnNext.add(this.$btnLast).toggleClass("disabled", !n), this.$btnPrev.add(this.$btnFirst).toggleClass("disabled", !i), this.$formFooter.toggleClass("end", !n)
                }
            }, s.prototype.input = {
                getWrapNodes: function(e) {
                    var t = this.getInputType(e.eq(0));
                    return "fieldset" == t ? e : e.closest(".question, .note")
                },
                getProps: function(e) {
                    return 1 !== e.length ? console.error("getProps(): no input node provided or multiple") : {
                        path: this.getName(e),
                        ind: this.getIndex(e),
                        inputType: this.getInputType(e),
                        xmlType: this.getXmlType(e),
                        constraint: e.attr("data-constraint"),
                        relevant: e.attr("data-relevant"),
                        val: this.getVal(e),
                        required: void 0 !== e.attr("required") && 0 === e.parents(".or-appearance-label").length ? !0 : !1,
                        enabled: this.isEnabled(e),
                        multiple: this.isMultiple(e)
                    }
                },
                getInputType: function(e) {
                    var t;
                    return 1 !== e.length ? "" : (t = e.prop("nodeName").toLowerCase(), "input" == t ? e.attr("type").length > 0 ? e.attr("type").toLowerCase() : console.error("<input> node has no type") : "select" == t ? "select" : "textarea" == t ? "textarea" : "fieldset" == t || "section" == t ? "fieldset" : console.error("unexpected input node type provided"))
                },
                getXmlType: function(e) {
                    return 1 !== e.length ? console.error("getXMLType(): no input node provided or multiple") : e.attr("data-type-xml")
                },
                getName: function(e) {
                    var t;
                    return 1 !== e.length ? console.error("getName(): no input node provided or multiple") : (t = e.attr("data-name") || e.attr("name"), t || console.error("input node has no name"))
                },
                getIndex: function(e) {
                    var t, n, i, r;
                    return 1 !== e.length ? console.error("getIndex(): no input node provided or multiple") : (t = this.getInputType(e), n = this.getName(e), i = this.getWrapNodes(e), r = this.getWrapNodes("radio" === t && n !== e.attr("name") ? h.find('[data-name="' + n + '"]') : "fieldset" === t && e.hasClass("or-repeat") ? h.find('.or-repeat[name="' + n + '"]') : "fieldset" === t && e.hasClass("or-group") ? h.find('.or-group[name="' + n + '"]') : h.find('[name="' + n + '"]')), r.index(i))
                },
                isMultiple: function(e) {
                    return "checkbox" == this.getInputType(e) || void 0 !== e.attr("multiple") ? !0 : !1
                },
                isEnabled: function(e) {
                    return !(e.prop("disabled") || e.parents(".disabled").length > 0)
                },
                getVal: function(e) {
                    var t, i, r = [];
                    return 1 !== e.length ? console.error("getVal(): no inputNode provided or multiple") : (t = this.getInputType(e), i = this.getName(e), "radio" === t ? this.getWrapNodes(e).find("input:checked").val() || "" : "checkbox" === t ? (this.getWrapNodes(e).find('input[name="' + i + '"]:checked').each(function() {
                        r.push(n(this).val())
                    }), r) : e.val() ? n.isArray(e.val()) ? e.val().join(" ").trim() : e.val().trim() : "")
                },
                setVal: function(e, t, n) {
                    var i, r, o;
                    return t = t || 0, "radio" == this.getInputType(h.find('[data-name="' + e + '"]').eq(0)) ? (o = this.getWrapNodes(h.find('[data-name="' + e + '"]')).eq(t).find('input[value="' + n + '"]'), void o.prop("checked", !0)) : (i = this.getWrapNodes(h.find('[name="' + e + '"]').eq(t)).find("input, select, textarea"), r = this.getInputType(i.eq(0)), "file" === r ? (i.eq(0).attr("data-loaded-file-name", n), !1) : (("date" === r || "datetime" === r) && (n = l.node().convert(n, r)), this.isMultiple(i.eq(0)) === !0 && (n = n.split(" ")), i.is("[readonly]") && i.toggleClass("has-value", !!n), void i.val(n)))
                }
            }, s.prototype.setAllVals = function() {
                var e, t, i, r = this;
                l.node(null, null, {
                    noEmpty: !0
                }).get().each(function() {
                    try {
                        i = n(this).text(), t = n(this).getXPath("instance"), e = l.node(t).get().index(n(this)), r.input.setVal(t, e, i)
                    } catch (o) {
                        console.error(o), m.push("Could not load input field value with name: " + t + " and value: " + i)
                    }
                })
            }, s.prototype.langs = {
                init: function() {
                    var e, t = this,
                        i = h.find("#form-languages").attr("data-default-lang"),
                        r = n(".form-language-selector");
                    n("#form-languages").detach().appendTo(r), i && "" !== i || (i = n("#form-languages option").eq(0).attr("value")), n("#form-languages").val(i), n("#form-languages option").length < 2 || (r.removeClass("hide"), n("#form-languages").change(function(i) {
                        e = n(this).val(), i.preventDefault(), t.setAll(e)
                    }))
                },
                setAll: function(e) {
                    var t = this;
                    n("#form-languages option").removeClass("active"), n(this).addClass("active"), h.find("[lang]").removeClass("active").filter('[lang="' + e + '"], [lang=""]').addClass("active"), h.find("select").each(function() {
                        t.setSelect(n(this))
                    }), h.trigger("changelanguage")
                },
                setSelect: function(e) {
                    var t, i, r;
                    e.children("option").not('[value=""]').each(function() {
                        i = n(this).text(), t = n(this).attr("value"), r = n(this).parent("select").siblings(".or-option-translations").children('.active[data-option-value="' + t + '"]').text().trim(), r = "undefined" != typeof r && r.length > 0 ? r : i, n(this).text(r)
                    })
                }
            }, s.prototype.editStatus = {
                set: function(e) {
                    h.attr("data-edited", Boolean(e)), h.trigger("edit", e)
                },
                get: function() {
                    return console.log("form element", h), "true" === h.attr("data-edited") ? !0 : !1
                }
            }, s.prototype.recordName = {
                set: function(e) {
                    h.attr("name", e)
                },
                get: function() {
                    return h.attr("name")
                }
            }, s.prototype.getNodesToUpdate = function(e, t, i) {
                var r, o = null,
                    a = [];
                return i = i || {}, t = t || "", this.$nonRepeats[e] || (this.$nonRepeats[e] = h.find(t + "[" + e + "]").closest(".calculation, .question, .note, .trigger").filter(function() {
                    return 0 === n(this).closest(".or-repeat").length
                })), "undefined" != typeof i.repeatPath && i.repeatIndex >= 0 && (o = h.find('.or-repeat[name="' + i.repeatPath + '"]').eq(i.repeatIndex)), r = o ? this.$nonRepeats[e].add(o) : h, i.nodes && 0 !== i.nodes.length ? i.nodes.forEach(function(n) {
                    a.push(t + "[" + e + '*="/' + n + ' "]'), a.push(t + "[" + e + '*="/' + n + ')"]'), a.push(t + "[" + e + '*="/' + n + ',"]'), a.push(t + "[" + e + '$="/' + n + '"]'), a.push(t + "[" + e + '*="/' + n + ']"]')
                }) : a = [t + "[" + e + "]"], r.find(a.join())
            }, s.prototype.branchUpdate = function(e) {
                function i(e, t, n) {
                    var i = l.evaluate(e, "boolean", t, n);
                    return i
                }

                function r(e, t) {
                    t === !0 ? a(e) : s(e)
                }

                function o(e) {
                    return !e.hasClass("disabled") && !e.hasClass("pre-init")
                }

                function a(e) {
                    var n;
                    o(e) || (e.removeClass("disabled pre-init").trigger("showbranch"), t.enable(e), n = e.prop("nodeName").toLowerCase(), "label" === n ? e.children("input:not(.force-disabled), select, textarea").prop("disabled", !1) : "fieldset" === n ? (e.prop("disabled", !1), e.find('*:not(.or-branch) input[type="file"]:not(.force-disabled, [data-relevant])').prop("disabled", !0).prop("disabled", !1)) : e.find("fieldset, input, select, textarea").prop("disabled", !1))
                }

                function s(e) {
                    var i = e.prop("nodeName").toLowerCase(),
                        r = e.hasClass("pre-init");
                    (o(e) || r) && (e.addClass("disabled").trigger("hidebranch"), r ? e.removeClass("pre-init") : (e.clearInputs("change"), t.disable(e), e.find(".invalid-required, .invalid-constraint").find("input, select, textarea").each(function() {
                        x.setValid(n(this))
                    })), "label" === i ? e.children("input, select, textarea").prop("disabled", !0) : "fieldset" === i ? e.prop("disabled", !0) : e.find("fieldset, input, select, textarea").prop("disabled", !0))
                }
                var u, c, d, p, g, m, v, y, b = {},
                    w = [],
                    x = this,
                    E = 0;
                v = this.getNodesToUpdate("data-relevant", "", e), y = f && h.find(".or-repeat.clone").length > 0 ? !0 : !1, v.each(function() {
                    if (-1 === n.inArray(n(this).attr("name"), w)) {
                        if (u = {}, m = null, u.relevant = n(this).attr("data-relevant"), u.path = x.input.getName(n(this)), c = n(this).closest(".or-branch"), 1 !== c.length) return void(0 === n(this).parents("#or-calculated-items").length && console.error("could not find branch node for ", n(this)));
                        p = y && c.closest(".or-repeat").length > 0 ? !0 : !1, g = y && c.closest(".or-repeat.clone").length > 0 ? !0 : !1, u.ind = g ? x.input.getIndex(n(this)) : 0, -1 === u.relevant.indexOf("..") && (m = p ? u.relevant + "__" + u.path.substring(0, u.path.lastIndexOf("/")) + "__" + u.ind : u.relevant), m && "undefined" != typeof b[m] ? d = b[m] : (d = i(u.relevant, u.path, u.ind), E++, b[m] = d), p || w.push(n(this).attr("name")), r(c, d)
                    }
                })
            }, s.prototype.itemsetUpdate = function(e) {
                var t, i, r, o, a = this,
                    s = {};
                o = this.getNodesToUpdate("data-items-path", ".itemset-template", e), t = f && h.find(".or-repeat.clone").length > 0 ? !0 : !1, o.each(function() {
                    var e, o, u, c, d, h, p = n(this),
                        f = {},
                        g = p.data(),
                        m = n(this).prop("nodeName").toLowerCase(),
                        v = "label" === m ? n(this).children("input").eq(0) : n(this).parent("select"),
                        y = p.closest("label, select").siblings(".itemset-labels"),
                        b = p.attr("data-items-path"),
                        w = y.attr("data-label-type"),
                        x = y.attr("data-label-ref"),
                        E = y.attr("data-value-ref");
                    if (h = a.input.getName(v), i = t && v.closest(".or-repeat").length > 0 ? !0 : !1, r = t && v.closest(".or-repeat.clone").length > 0 ? !0 : !1, d = r ? a.input.getIndex(v) : 0, "undefined" != typeof s[b]) c = s[b];
                    else {
                        var T = !0;
                        c = n(l.evaluate(b, "nodes", h, d, T)), i || (s[b] = c)
                    }
                    f.length = c.length, f.text = c.text(), (f.length !== g.length || f.text !== g.text) && (p.data(f), n(this).closest(".question").clearInputs("change").find(m).not(p).remove(), n(this).parent("select").siblings(".or-option-translations").empty(), c.each(function() {
                        e = n("<root/>"), p.clone().appendTo(e).removeClass("itemset-template").addClass("itemset").removeAttr("data-items-path"), o = "itext" === w ? y.find('[data-itext-id="' + n(this).children(x).text() + '"]').clone() : n('<span class="active" lang="">' + n(this).children(x).text() + "</span>"), u = n(this).children(E).text(), e.find("[value]").attr("value", u), "label" === m ? (e.find("input").after(o), y.before(e.find(":first"))) : "option" === m && (1 === o.length && e.find("option").text(o.text()), o.attr("data-option-value", u).attr("data-itext-id", "").appendTo(y.siblings(".or-option-translations")), p.siblings().addBack().last().after(e.find(":first")))
                    }), "select" === v.prop("nodeName").toLowerCase() && (a.langs.setSelect(v), v.trigger("changeoption")))
                })
            }, s.prototype.outputUpdate = function(e) {
                var t, i, r, o, a, s, u, c, d = {},
                    p = "",
                    g = this;
                c = this.getNodesToUpdate("data-value", ".or-output", e), i = f && h.find(".or-repeat.clone").length > 0 ? !0 : !1, c.each(function() {
                    t = n(this).attr("data-value"), a = 1 === n(this).parent("span").parent("label").find("[name]").eq(0).length ? n(this).parent().parent().find("[name]").eq(0) : 1 === n(this).parent("span").parent("legend").parent("fieldset").find("[name]").eq(0).length ? n(this).parent().parent().parent().find("[name]").eq(0) : n(this).closest("[name]"), s = g.input.getName(a), r = i && n(this).closest(".or-repeat").length > 0, o = i && n(this).closest(".or-repeat.clone").length > 0, u = o ? g.input.getIndex(a) : 0, "undefined" != typeof d[t] ? p = d[t] : (p = l.evaluate(t, "string", s, u), r || (d[t] = p)), n(this).text !== p && n(this).text(p)
                })
            }, s.prototype.grosslyViolateStandardComplianceByIgnoringCertainCalcs = function() {
                var e = h.find('[name$="/meta/instanceID"][data-calculate]');
                e.length > 0 && e.removeAttr("data-calculate")
            }, s.prototype.calcUpdate = function(e) {
                var t, i = this;
                e = e || {}, t = this.getNodesToUpdate("data-calculate", "", e), t = t.add(this.getNodesToUpdate("data-relevant", "[data-calculate]", e)), t.each(function() {
                    var t, r, o, a, s, u = n(this),
                        c = u.attr("name"),
                        d = -1 !== c.lastIndexOf("/") ? c.substring(c.lastIndexOf("/") + 1) : c,
                        h = u.attr("data-calculate"),
                        p = u.attr("data-type-xml"),
                        f = u.attr("data-constraint"),
                        m = u.attr("data-relevant"),
                        v = m ? l.evaluate(m, "boolean", c) : !0;
                    if (o = l.node(c).get(), o.length > 1 && e.repeatPath && -1 !== c.indexOf(e.repeatPath)) a = l.node(e.repeatPath, e.repeatIndex).get().find(d), s = o.index(a);
                    else {
                        if (1 !== o.length) return void console.error("Potential issue: Multiple data nodes with same path found. Cannot deal with this and will just ignore them. ", o);
                        s = 0
                    }
                    h = g(h, "string", c, s), t = v && h ? l.evaluate(h, "string", c, s) : "", r = l.node(c, s).setVal(t, f, p), i.input.setVal(c, s, t)
                })
            }, s.prototype.bootstrapify = function() {
                h.addClass("clearfix").find("label, legend").each(function() {
                    var e = n(this);
                    0 !== e.parent(".option-wrapper").length || 0 !== e.parent("#or-calculated-items, #or-preload-items").length || 0 !== e.find(".or-constraint-msg").length || "legend" != e.prop("nodeName").toLowerCase() && e.children("input.ignore").length === e.children("input").length && e.children("select.ignore").length === e.children("select").length && e.children("textarea.ignore").length === e.children("textarea").length || e.prepend('<span class="or-constraint-msg active" lang="">Value not allowed</span>')
                }), h.find(".or-constraint-msg").each(function() {
                    var e = n(this).closest(".question").not(".or-appearance-label"),
                        t = n(this).detach(),
                        i = e.find("[required]").length > 0,
                        r = e.find(".or-required-msg").length > 0;
                    e.append(t), !r && i && t.after('<span class="or-required-msg active" lang="">This field is required</span>')
                }), h.find(".or-appearance-horizontal .option-wrapper").each(function() {
                    var e = n(this),
                        t = e.find("label");
                    t.length % 3 === 2 && e.append('<label class="filler"></label>')
                })
            }, s.prototype.preloads = {
                init: function(e) {
                    var t, i, r, o, a, s, u, c, d, p = this;
                    h.find("#or-preload-items input").each(function() {
                        c = e.input.getProps(n(this)), t = n(this).attr("data-preload").toLowerCase(), i = n(this).attr("data-preload-params").toLowerCase(), "undefined" != typeof p[t] ? (u = l.node(c.path, c.index), o = u.getVal()[0], a = p[t]({
                            param: i,
                            curVal: o,
                            dataNode: u
                        }), u.setVal(a, null, c.xmlType)) : console.error('Preload "' + t + '"" not supported. May or may not be a big deal.')
                    }), s = l.node("*>meta>*"), s.get().each(function() {
                        if (t = null, r = n(this).prop("nodeName"), u = l.node("*>meta>" + r), o = u.getVal()[0], 0 === h.find('#or-preload-items input[name$="/meta/' + r + '"][data-preload]').length) switch (r) {
                            case "instanceID":
                                t = "instance", d = "string", i = "";
                                break;
                            case "timeStart":
                                t = "timestamp", d = "datetime", i = "start";
                                break;
                            case "timeEnd":
                                t = "timestamp", d = "datetime", i = "end";
                                break;
                            case "deviceID":
                                t = "property", d = "string", i = "deviceid";
                                break;
                            case "userID":
                                t = "property", d = "string", i = "username"
                        }
                        t && u.setVal(p[t]({
                            param: i,
                            curVal: o,
                            dataNode: u
                        }), null, d)
                    })
                },
                timestamp: function(e) {
                    var t;
                    return "start" == e.param ? e.curVal.length > 0 ? e.curVal : l.evaluate("now()", "string") : "end" == e.param ? (h.on("beforesave", function() {
                        t = l.evaluate("now()", "string"), e.dataNode.setVal(t, null, "datetime")
                    }), l.evaluate("now()", "string")) : "error - unknown timestamp parameter"
                },
                date: function(e) {
                    var t, n, i, r;
                    return 0 === e.curVal.length ? (t = new Date(l.evaluate("today()", "string")), n = t.getFullYear().toString().pad(4), i = (t.getMonth() + 1).toString().pad(2), r = t.getDate().toString().pad(2), n + "-" + i + "-" + r) : e.curVal
                },
                property: function(e) {
                    var t, n, i;
                    if (t = function(e, t, n, i) {
                        if (c) return c[e];
                        for (t = document.cookie.split("; "), c = {}, i = t.length - 1; i >= 0; i--) n = t[i].split("="), c[n[0]] = decodeURIComponent(n[1]);
                        return c[e]
                    }, 0 === e.curVal.length) {
                        switch (n = "no " + e.param + " property in enketo", e.param) {
                            case "deviceid":
                                i = t("__enketo_meta_deviceid") || "Error: could not determine deviceID";
                                break;
                            case "username":
                                i = t("__enketo_meta_uid");
                                break;
                            default:
                                i = n
                        }
                        return i
                    }
                    return e.curVal
                },
                context: function(e) {
                    return 0 === e.curVal.length ? "application" == e.param ? "enketo" : e.param + " not supported in enketo" : e.curVal
                },
                patient: function(e) {
                    return 0 === e.curVal.length ? "patient preload not supported in enketo" : e.curVal
                },
                user: function(e) {
                    return 0 === e.curVal.length ? "user preload item not supported in enketo yet" : e.curVal
                },
                uid: function(e) {
                    return 0 === e.curVal.length ? "no uid yet in enketo" : e.curVal
                },
                browser: function() {},
                os: function(e) {
                    return 0 === e.curVal.length ? "not known" : e.curVal
                },
                instance: function(e) {
                    var t = e.curVal.length > 0 ? e.curVal : l.evaluate("concat('uuid:', uuid())", "string");
                    return h.data({
                        instanceID: t
                    }), t
                }
            }, s.prototype.repeat = {
                init: function(e) {
                    var t, i, r, o, a, s, u, c, d, p = this;
                    this.formO = e, h.find(".or-repeat").prepend('<span class="repeat-number"></span>'), h.find(".or-repeat:not([data-repeat-fixed])").append('<div class="repeat-buttons"><button type="button" class="btn btn-default repeat"><i class="glyphicon glyphicon-plus"> </i></button><button type="button" disabled class="btn btn-default remove"><i class="glyphicon glyphicon-minus"> </i></button></div>'), h.on("click", "button.repeat:enabled", function() {
                        return p.clone(n(this).closest(".or-repeat")), !1
                    }), h.on("click", "button.remove:enabled", function() {
                        return p.remove(n(this).closest(".or-repeat.clone")), !1
                    }), s = function(e) {
                        for (u++, r = e.attr("data-repeat-count") || "", i = r.length > 0 ? parseInt(l.node(r).getVal()[0], 10) : 0, d = h.find('.or-repeat[name="' + e.attr("name") + '"]').index(e), c = l.node(e.attr("name"), d).get(), o = c.siblings(c.prop("nodeName") + ":not([template])").addBack().length, a = i > o ? i : o, t = 1; a > t; t++) p.clone(e.siblings().addBack().last(), !1);
                        e.siblings(".or-repeat").addBack().find(".or-repeat").filter(function() {
                            return n(this).parents(".or-repeat").length === u
                        }).each(function() {
                            s(n(this))
                        })
                    }, h.find(".or-repeat").filter(function() {
                        return 0 === n(this).parents(".or-repeat").length
                    }).each(function() {
                        u = 0, s(n(this))
                    })
                },
                clone: function(e, i) {
                    var r, o, a, s, u, c, d, p, f, g = this;
                    if (f = i === !1 ? 0 : 400, 1 !== e.length) return console.error("Nothing to clone"), !1;
                    for (a = e.parent(".or-group, .or-group-data"), r = a.children(".or-repeat:not(.clone)").eq(0), o = r.clone(!0, !0), o.addClass("clone").find(".clone").remove(), o.find(".invalid-required, .invalid-constraint").find("input, select, textarea").each(function() {
                        g.formO.setValid(n(this))
                    }), o.insertAfter(e).parent(".or-group").numberRepeats(), o.clearInputs(""), s = h.find('.or-repeat[name="' + e.attr("name") + '"]').index(e), u = [], o.find('input[type="radio"]').each(function() {
                        -1 === n.inArray(n(this).attr("data-name"), u) && u.push(n(this).attr("data-name"))
                    }), c = 0; c < u.length; c++) p = (new Date).getTime().toString() + "_" + Math.floor(1e4 * Math.random() + 1), o.find('input[type="radio"][data-name="' + u[c] + '"]').attr("name", p);
                    return this.toggleButtons(r.parent()), d = r.attr("name"), d.length > 0 && s >= 0 && l.cloneTemplate(d, s), o.trigger("addrepeat", s + 1), t.destroy(o), t.init(o), !0
                },
                remove: function(e) {
                    var t = 600,
                        n = this,
                        i = e.prev(".or-repeat"),
                        r = e.attr("name"),
                        o = h.find('.or-repeat[name="' + r + '"]').index(e),
                        a = e.parent(".or-group");
                    e.hide(t, function() {
                        e.remove(), a.numberRepeats(), n.toggleButtons(a), i.trigger("removerepeat"), l.node(r, o).remove()
                    })
                },
                toggleButtons: function(e) {
                    e = "undefined" != typeof e && 0 !== e.length && e ? e : e = h, e.find("button.repeat, button.remove").prop("disabled", !0), e.find(".or-repeat:last-child > .repeat-buttons button.repeat").prop("disabled", !1), e.find("button.remove").not(":eq(0)").prop("disabled", !1)
                }
            }, s.prototype.setEventHandlers = function() {
                var e = this;
                h.attr("onsubmit", "return false;"), h.on("blur", 'input:not([type="text"], [type="radio"], [type="checkbox"])', function() {
                    "undefined" != typeof n(this).prop("validity").badInput && n(this).prop("validity").badInput && n(this).val("")
                }), h.on("change.file validate", "input:not(.ignore), select:not(.ignore), textarea:not(.ignore)", function(t) {
                    var i, r, o = e.input.getProps(n(this));
                    o.val.length > 0 && "file" === o.inputType && n(this)[0].files[0] && n(this)[0].files[0].size > 0 && (o.val = n(this)[0].files[0].name), "validate" === t.type ? i = o.enabled && "hidden" !== o.inputType ? l.node(o.path, o.ind).validate(o.constraint, o.xmlType) : !0 : (i = l.node(o.path, o.ind).setVal(o.val, o.constraint, o.xmlType), i = i !== !1 || "geotrace" !== o.xmlType && "geoshape" !== o.xmlType ? i : null), r = o.enabled && "hidden" !== o.inputType && o.required && l.node(o.path, o.ind).getVal()[0].length < 1 ? !1 : !0, r === !1 ? (e.setValid(n(this), "constraint"), "validate" === t.type && e.setInvalid(n(this), "required")) : (e.setValid(n(this), "required"), "undefined" != typeof i && i === !1 ? e.setInvalid(n(this), "constraint") : null !== i && e.setValid(n(this), "constraint"))
                }), h.on("focus fakefocus", "input:not(.ignore), select:not(.ignore), textarea:not(.ignore)", function(t) {
                    e.progress.update(t.target)
                }), h.on("focus blur fakefocus fakeblur", "input:not(.ignore), select:not(.ignore), textarea:not(.ignore)", function(t) {
                    var i = e.input.getProps(n(this)),
                        r = n(this).attr("required"),
                        o = n(this).closest(".question"),
                        a = o.find("legend").eq(0),
                        s = o.hasClass("invalid-required") || o.hasClass("invalid-constraint"),
                        l = n(this).closest(".or-appearance-list-nolabel").length > 0,
                        u = o.find(".required-subtle"),
                        c = n('<span class="required-subtle" style="color: transparent;">Required</span>');
                    "focusin" === t.type || "fakefocus" === t.type ? (o.addClass("focus"), r && 0 === u.length && !l && (u = n(c), a.length > 0 ? a.append(u) : u.insertBefore(this), s || u.show(function() {
                        n(this).removeAttr("style")
                    }))) : ("focusout" === t.type || "fakeblur" === t.type) && (o.removeClass("focus"), r && i.val.length > 0 ? u.remove() : s || u.removeAttr("style"))
                }), l.$.on("dataupdate", function(t, n) {
                    e.calcUpdate(n), e.branchUpdate(n), e.outputUpdate(n), e.itemsetUpdate(n)
                }), h.on("change addrepeat removerepeat", function() {
                    e.editStatus.set(!0)
                }), h.on("addrepeat", function(t, i) {
                    var r = n(t.target);
                    e.setAllVals(r), e.calcUpdate({
                        repeatPath: r.attr("name"),
                        repeatIndex: i
                    })
                }), h.on("changelanguage", function() {
                    e.outputUpdate()
                })
            }, s.prototype.setValid = function(e, t) {
                var n = t ? "invalid-" + t : "invalid-constraint invalid-required";
                this.input.getWrapNodes(e).removeClass(n)
            }, s.prototype.setInvalid = function(e, t) {
                t = t || "constraint", this.input.getWrapNodes(e).addClass("invalid-" + t).find(".required-subtle").attr("style", "color: transparent;")
            }, s.prototype.validateAll = function() {
                var e, t = this;
                return h.find("fieldset:disabled input, fieldset:disabled select, fieldset:disabled textarea, input:disabled, select:disabled, textarea:disabled").each(function() {
                    t.setValid(n(this))
                }), h.find("input, select, textarea").not(".ignore").trigger("validate"), e = h.find(".invalid-required, .invalid-constraint").eq(0), e.length > 0 && window.scrollTo && (this.pages.active && this.pages.flipToPageContaining(e), window.scrollTo(0, e.offset().top - 50)), 0 === e.length
            }, s.prototype.progress = {
                status: 0,
                lastChanged: null,
                update: function(e) {
                    var t, i = h.find(".question").not(".disabled").filter(function() {
                        return 0 === n(this).closest(".disabled").length
                    });
                    this.lastChanged = e || this.lastChanged, t = Math.round(100 * (i.index(n(this.lastChanged).closest(".question")) + 1) / i.length), t !== this.status && (this.status = t, h.trigger("progressupdate", t))
                },
                get: function() {
                    return this.status
                }
            }, s.prototype.isValid = function() {
                return h.find(".invalid-required, .invalid-constraint").length > 0 ? !1 : !0
            }, s.prototype.addPageBreaks = function() {}
        }
        return i
    }), define("ziggy/EntityRelationshipLoader", [], function() {
        return {
            load: function() {
                return JSON.parse(ziggyFileLoader.loadAppData("entity_relationship.json"))
            }
        }
    }), define("ziggy/FormDefinitionLoader", [], function() {
        return {
            load: function(e) {
                return JSON.parse(ziggyFileLoader.loadAppData(e + "/form_definition.json"))
            }
        }
    }), define("ziggy/FormDataRepository", [], function() {
        var e;
        return "undefined" != typeof formDataRepositoryContext && (e = formDataRepositoryContext), {
            getFormInstanceByFormTypeAndId: function() {
                return null
            },
            queryUniqueResult: function(t) {
                return e.queryUniqueResult(t)
            },
            queryList: function(t) {
                return e.queryList(t)
            },
            saveFormSubmission: function(t, n, i) {
                return e.saveFormSubmission(JSON.stringify(t), JSON.stringify(n), i)
            },
            saveEntity: function(t, n) {
                return e.saveEntity(t, JSON.stringify(n))
            }
        }
    }), define("ziggy/RelationKind", [], function() {
        var e = {
            one_to_one: {
                type: "one_to_one"
            },
            one_to_many: {
                type: "one_to_many"
            },
            many_to_one: {
                type: "many_to_one"
            }
        };
        return e.one_to_one.inverse = e.one_to_one, e.one_to_many.inverse = e.many_to_one, e.many_to_one.inverse = e.one_to_many, e
    }), define("ziggy/Util", [], function() {
        return String.prototype.format || (String.prototype.format = function() {
            var e = arguments;
            return this.replace(/{(\d+)}/g, function(t, n) {
                return "undefined" != typeof e[n] ? e[n] : t
            })
        }), {
            hasValue: function(e) {
                return !("undefined" == typeof e || !e)
            }
        }
    }), define("ziggy/SqlQueryBuilder", ["ziggy/FormDataRepository", "ziggy/RelationKind", "ziggy/Util"], function(e, t, n) {
        var i = function(e, t, o, a) {
                var s = e.findEntityDefinitionByType(a.type),
                    l = a.from.split(".")[1],
                    u = "select * from " + a.type + " where " + a.to + " = '" + t[l] + "'",
                    c = JSON.parse(r(a)(u));
                return n.hasValue(c) ? n.hasValue(s.relations) && 0 !== s.relations.length ? (s.relations.forEach(function(t) {
                    if (t.type !== o) {
                        var r = i(e, c, s.type, t);
                        n.hasValue(r) && (c[t.type] = r)
                    }
                }), c) : c : null
            },
            r = function(n) {
                return t[n.kind] === t.one_to_many ? e.queryList : e.queryUniqueResult
            };
        return {
            loadEntityHierarchy: function(t, r, o) {
                var a = t.findEntityDefinitionByType(r),
                    s = "select * from " + r + " where id = '" + o + "'",
                    l = JSON.parse(e.queryUniqueResult(s));
                if (!n.hasValue(a.relations) || 0 === a.relations.length) {
                    var u = {};
                    return u[r] = l, u
                }
                a.relations.forEach(function(e) {
                    l[e.type] = i(t, l, r, e)
                });
                var c = {};
                return c[r] = l, c
            }
        }
    }), define("ziggy/IdFactoryBridge", [], function() {
        var e;
        return "undefined" != typeof formDataRepositoryContext && (e = formDataRepositoryContext), {
            generateIdFor: function(t) {
                return e.generateIdFor(t)
            }
        }
    }), define("ziggy/IdFactory", ["ziggy/IdFactoryBridge"], function(e) {
        return {
            generateIdFor: function(t) {
                return e.generateIdFor(t)
            }
        }
    }), define("ziggy/Entities", ["ziggy/Util"], function(e) {
        var t = function() {
            var t = this;
            t.entities = [], t.add = function(e) {
                return t.entities.push(e), t
            }, t.addAll = function(e) {
                return t.entities = t.entities.concat(e.entities), t
            }, t.forEach = function(e) {
                return t.entities.forEach(e)
            }, t.findEntityByType = function(e) {
                for (var n = 0; n < t.entities.length; n++)
                    if (t.entities[n].type === e) return t.entities[n];
                return null
            }, t.findEntityByTypeAndId = function(e) {
                for (var n = 0; n < t.entities.length; n++)
                    if (t.entities[n].type === e.type && t.entities[n].getFieldByPersistenceName("id").value === e.getFieldByPersistenceName("id").value) return t.entities[n];
                return null
            }, t.findEntitiesByType = function(e) {
                return t.entities.filter(function(t) {
                    return t.type === e
                })
            }, t.contains = function(n) {
                return e.hasValue(t.findEntityByTypeAndId(n))
            }
        };
        return {
            newInstance: function() {
                return new t
            }
        }
    }), define("ziggy/FormModelMapper", ["ziggy/FormDataRepository", "ziggy/SqlQueryBuilder", "ziggy/IdFactory", "ziggy/Util", "ziggy/RelationKind", "ziggy/Entities"], function(e, t, n, i, r, o) {
        var a = function(e, t, n) {
                return i.hasValue(e) && t.contains(e) && !n.contains(e)
            },
            s = function(e, t, n, i) {
                var r = e.to.split(".")[1],
                    o = t.findEntityByTypeAndId(i);
                o.createField(o.source + "." + r, o.source + "." + r, r, n)
            },
            l = function(e, t) {
                var n = e.form.fields.filter(function(e) {
                    return e.source === t.source
                })[0];
                i.hasValue(n) ? i.hasValue(n.value) || (n.value = t.value) : e.form.fields.push(t)
            },
            u = function(e, t) {
                e.forEach(function(e) {
                    var n = d(e);
                    l(t, n)
                })
            },
            c = function(e, t) {
                var n = d(e);
                t.id = n.value
            },
            d = function(e) {
                var t = e.getFieldByPersistenceName("id");
                return i.hasValue(t) ? i.hasValue(t.value) || (t.value = n.generateIdFor(e.type)) : (t = {
                    name: e.source + ".id",
                    source: e.source + ".id",
                    persistenceName: "id",
                    value: n.generateIdFor(e.type)
                }, e.addField(t)), t
            },
            h = function(e, t, n, i, r) {
                a(e, t, n) && (s(r, t, i, e), p(e, t, n))
            },
            p = function(t, n, i) {
                var o = t.findParents();
                o.forEach(function(e) {
                    var t = n.findEntityByType(e.type);
                    a(t, n, i) && p(t, n, i)
                });
                var s;
                if (a(t, n, i)) {
                    var l = {};
                    t.forEachField(function(e) {
                        l[e.persistenceName] = e.value
                    }), e.saveEntity(t.type, l), s = t.getFieldByPersistenceName("id").value, i.add(t)
                }
                var u = t.findChildren();
                u.forEach(function(e) {
                    if (e.kind === r.one_to_many.type) {
                        var t = n.findEntitiesByType(e.type);
                        t.forEach(function(t) {
                            h(t, n, i, s, e)
                        })
                    } else {
                        var o = n.findEntityByType(e.type);
                        h(o, n, i, s, e)
                    }
                })
            },
            f = function(e, t) {
                for (var n = e, r = 0; r < t.length; r++) {
                    var o = t[r];
                    if (!i.hasValue(n[o])) {
                        n = void 0;
                        break
                    }
                    n = n[o]
                }
                return n
            },
            g = function(e, t) {
                return e.filter(function(e) {
                    return e.name === t ? e : void 0
                })[0]
            },
            m = function(e, t) {
                e.form.fields.forEach(function(e) {
                    if (e.shouldLoadValue) {
                        var n = e.source.split("."),
                            r = f(t, n);
                        i.hasValue(r) && (e.value = r)
                    }
                })
            },
            v = function(e, t, n) {
                i.hasValue(e.form.sub_forms) && e.form.sub_forms.forEach(function(r) {
                    var o = t.findPathToBaseEntityFromSubEntity(e.form.bind_type, r.bind_type),
                        a = f(n, o);
                    a.forEach(function(e) {
                        var t = null;
                        r.fields.forEach(function(n) {
                            if (n.shouldLoadValue) {
                                var r = f(e, n.source.split(".").slice(-1));
                                i.hasValue(r) && (t = t || {}, t[n.name] = r)
                            }
                        }), i.hasValue(t) && r.instances.push(t)
                    })
                })
            },
            y = function(e, t) {
                if (i.hasValue(t)) {
                    var n = decodeURIComponent(decodeURIComponent(t)),
                        r = JSON.parse(n);
                    for (var o in r)
                        if (r.hasOwnProperty(o)) {
                            var a = g(e.form.fields, o);
                            i.hasValue(a) && (a.value = r[o])
                        }
                }
            },
            b = function(e, t) {
                e.forEach(function(e) {
                    i.hasValue(e.source) || (e.source = t + "." + e.name)
                })
            },
            w = function(e) {
                i.hasValue(e.form.sub_forms) && e.form.sub_forms.forEach(function(e) {
                    b(e.fields, e.bind_type), e.instances = []
                })
            };
        return {
            mapToFormModel: function(n, r, o) {
                var a = e.getFormInstanceByFormTypeAndId(o.id, o.formName);
                if (i.hasValue(a)) {
                    var s = JSON.parse(a);
                    if (i.hasValue(s)) return s
                }
                if (!i.hasValue(n)) return r;
                if (b(r.form.fields, r.form.bind_type), w(r), !i.hasValue(o.entityId)) return r;
                var l = t.loadEntityHierarchy(n, r.form.bind_type, o.entityId);
                return m(r, l), y(r, o.fieldOverrides), v(r, n, l), r
            },
            mapToEntityAndSave: function(e, t) {
                var n = o.newInstance();
                t.form.fields.forEach(function(t) {
                    var r = t.source.split("."),
                        o = r[r.length - 2],
                        a = n.findEntityByType(o);
                    i.hasValue(a) || (a = e.findEntityDefinitionByType(o).createInstance(), a.source = t.source.substring(0, t.source.lastIndexOf(".")), n.add(a)), a.createField(t.name, t.source, r[r.length - 1], t.value)
                });
                var r = o.newInstance();
                i.hasValue(t.form.sub_forms) && t.form.sub_forms.forEach(function(t) {
                    t.instances.forEach(function(n) {
                        var i = e.findEntityDefinitionByType(t.bind_type).createInstance();
                        t.fields.forEach(function(e) {
                            var t = e.source.split(".");
                            i.createField(e.name, e.source, t[t.length - 1], n[e.name])
                        }), i.source = t.bind_type, c(i, n), r.add(i)
                    })
                }), u(n, t), n.addAll(r);
                var a = o.newInstance(),
                    s = n.findEntityByType(t.form.bind_type);
                p(s, n, a)
            }
        }
    }), define("ziggy/FormSubmissionRouter", [], function() {
        var e;
        return "undefined" != typeof formSubmissionRouter && (e = formSubmissionRouter), {
            route: function(t) {
                return e.route(t)
            }
        }
    }), define("ziggy/Entity", [], function() {
        var e = function(e) {
            var t = this,
                n = function(e) {
                    return t.relations.filter(function(t) {
                        return t.as === e
                    })
                };
            t.type = e, t.relations = [], t.fields = [], t.addField = function(e) {
                return t.fields.push(e), t
            }, t.createField = function(e, n, i, r) {
                return t.fields.push({
                    name: e,
                    source: n,
                    persistenceName: i,
                    value: r
                }), t
            }, t.findParents = function() {
                return n("child")
            }, t.findChildren = function() {
                return n("parent")
            }, t.getFieldByPersistenceName = function(e) {
                return t.fields.filter(function(t) {
                    return t.persistenceName === e
                })[0]
            }, t.forEachField = function(e) {
                return t.fields.forEach(e)
            }
        };
        return {
            newInstance: function(t) {
                return new e(t)
            }
        }
    }), define("ziggy/EntityDef", ["ziggy/Entity"], function(e) {
        var t = function(t) {
            var n = this;
            n.type = t, n.relations = [], n.fields = [], n.addRelation = function(e) {
                return n.relations.push(e), n
            }, n.removeAllRelations = function() {
                n.relations = []
            }, n.createInstance = function() {
                var t = e.newInstance(n.type);
                return n.relations.forEach(function(e) {
                    t.relations.push(e.createInstance())
                }), t
            }, n.findRelationByType = function(e) {
                return n.relations.filter(function(t) {
                    return t.type === e
                })[0]
            }
        };
        return {
            newInstance: function(e) {
                return new t(e)
            }
        }
    }), define("ziggy/EntityDefinitions", ["ziggy/Util"], function(e) {
        var t = function() {
            var t = this;
            t.entityDefinitions = [], t.add = function(e) {
                return t.entityDefinitions.push(e), t
            }, t.findEntityDefinitionByType = function(e) {
                for (var n = 0; n < t.entityDefinitions.length; n++)
                    if (t.entityDefinitions[n].type === e) return t.entityDefinitions[n];
                return null
            }, t.hasEntityDefinitions = function() {
                return 0 !== t.entityDefinitions.length
            }, t.findPathToBaseEntityFromSubEntity = function(n, i) {
                var r = t.findEntityDefinitionByType(i),
                    o = r.findRelationByType(n);
                if (e.hasValue(o)) return [o.type, i];
                for (var a = 0; a < r.relations.length; a++) {
                    var s = t.findPathToBaseEntityFromSubEntity(n, r.relations[a].type);
                    if (e.hasValue(s)) return s.push(i), s
                }
                return null
            }
        };
        return {
            newInstance: function() {
                return new t
            }
        }
    }), define("ziggy/Relation", [], function() {
        var e = function(e, t, n, i, r) {
            var o = this;
            o.type = e, o.kind = t, o.as = n, o.from = i, o.to = r
        };
        return {
            newInstance: function(t, n, i, r, o) {
                return new e(t, n, i, r, o)
            }
        }
    }), define("ziggy/RelationDef", ["ziggy/Relation"], function(e) {
        var t = function(t, n, i, r, o) {
            var a = this;
            a.type = t, a.kind = n, a.as = i, a.from = r, a.to = o, a.createInstance = function() {
                return e.newInstance(a.type, a.kind, a.as, a.from, a.to)
            }
        };
        return {
            newInstance: function(e, n, i, r, o) {
                return new t(e, n, i, r, o)
            }
        }
    }), define("ziggy/EntityRelationships", ["ziggy/EntityDef", "ziggy/EntityDefinitions", "ziggy/RelationDef", "ziggy/RelationKind", "ziggy/Util"], function(e, t, n, i, r) {
        var o = function(n, i) {
            var o = t.newInstance();
            return r.hasValue(n) && n.forEach(function(t) {
                var n = o.findEntityDefinitionByType(t.parent);
                r.hasValue(n) || o.add(e.newInstance(t.parent)), n = o.findEntityDefinitionByType(t.child), r.hasValue(n) || o.add(e.newInstance(t.child))
            }), r.hasValue(i.form.bind_type) && !r.hasValue(o.findEntityDefinitionByType(i.form.bind_type)) && o.add(e.newInstance(i.form.bind_type)), o
        };
        return {
            determineEntitiesAndRelations: function(e, t) {
                var a = o(e, t);
                return r.hasValue(e) ? (e.forEach(function(e) {
                    var t = a.findEntityDefinitionByType(e.parent);
                    r.hasValue(t.relations) || t.removeAllRelations(), t.addRelation(n.newInstance(e.child, e.kind, "parent", e.from, e.to));
                    var o = a.findEntityDefinitionByType(e.child);
                    r.hasValue(o.relations) || o.removeAllRelations(), o.addRelation(n.newInstance(e.parent, i[e.kind].inverse.type, "child", e.to, e.from))
                }), a) : a
            }
        }
    }), define("ziggy/FormDataController", ["ziggy/EntityRelationshipLoader", "ziggy/FormDefinitionLoader", "ziggy/FormModelMapper", "ziggy/FormDataRepository", "ziggy/FormSubmissionRouter", "ziggy/EntityRelationships", "ziggy/Util"], function(e, t, n, i, r, o, a) {
        var s, l, u, c = "1",
            d = function(n) {
                a.hasValue(s) || (s = e.load()), a.hasValue(l) || (l = t.load(n.formName)), a.hasValue(u) || (u = o.determineEntitiesAndRelations(s, l))
            },
            h = function(e, t) {
                if (d(e), u.hasEntityDefinitions()) {
                    n.mapToEntityAndSave(u, t);
                    var i = t.form.fields.filter(function(e) {
                        return e.source === t.form.bind_type + ".id"
                    })[0];
                    e.entityId = i.value
                }
                return e
            };
        return {
            get: function(e) {
                return d(e), n.mapToFormModel(u, l, e)
            },
            save: function(e, t) {
                "object" != typeof e && (e = JSON.parse(e)), "object" != typeof t && (t = JSON.parse(t)), e = h(e, t);
                var n = i.saveFormSubmission(e, t, t.form_data_definition_version || c);
                a.hasValue(n) && r.route(e.instanceId)
            },
            createOrUpdateEntity: function(e, t) {
                "object" != typeof e && (e = JSON.parse(e)), "object" != typeof t && (t = JSON.parse(t)), e = h(e, t), r.route(e.instanceId)
            },
            deleteFormSubmission: function(e) {
                d(e)
            }
        }
    });
var mockInstances = {
    a: {
        form: {
            bind_type: "eligible_couple",
            default_bind_path: "/model/instance/EC_Registration_EngKan/",
            fields: [{
                name: "uuid",
                bind: "/model/instance/EC_Registration_EngKan/formhub/uuid"
            }, {
                name: "today"
            }, {
                name: "phc",
                bind: "/model/instance/EC_Registration_EngKan/phc"
            }, {
                name: "sc",
                bind: "/model/instance/EC_Registration_EngKan/sub_center",
                source: "eligible_couple.subCenter",
                value: "bherya_a"
            }, {
                name: "household_number",
                bind: "/model/instance/EC_Registration_EngKan/house_number"
            }, {
                name: "head_of_household",
                bind: "/model/instance/EC_Registration_EngKan/hh_head",
                source: "eligible_couple.headOfHousehold",
                value: "Suresh"
            }, {
                name: "ec_number",
                source: "eligible_couple.ecNumber",
                value: "11"
            }, {
                name: "woman_name",
                source: "eligible_couple.woman_name",
                value: "Kavitha"
            }, {
                name: "woman_age"
            }, {
                name: "woman_dob",
                bind: "/model/instance/EC_Registration_EngKan/woman_age"
            }, {
                name: "husband_name",
                source: "eligible_couple.husband_name",
                value: "Suresh"
            }, {
                name: "economic_status",
                source: "eligible_couple.economic_status",
                value: "apl"
            }, {
                name: "number_of_pregnancies",
                bind: "/model/instance/EC_Registration_EngKan/num_pregnancies",
                source: "eligible_couple.pregnancies",
                value: "1"
            }, {
                name: "number_of_abortions",
                bind: "/model/instance/EC_Registration_EngKan/noofabortion"
            }, {
                name: "number_of_stillbirths",
                bind: "/model/instance/EC_Registration_EngKan/noofstillbirth"
            }, {
                name: "number_of_living_children",
                bind: "/model/instance/EC_Registration_EngKan/nooflivingchildren"
            }, {
                name: "youngest_childs_dob",
                bind: "/model/instance/EC_Registration_EngKan/youngest_child_age"
            }, {
                name: "fp_method",
                bind: "/model/instance/EC_Registration_EngKan/familyplanning_method_1",
                source: "eligible_couple.currentMethod",
                value: "none"
            }, {
                name: "fp_start_date",
                bind: "/model/instance/EC_Registration_EngKan/date_familyplanningstart",
                source: "eligible_couple.familyPlanningMethodChangeDate",
                value: "---"
            }, {
                name: "message"
            }, {
                name: "instanceID",
                bind: "/model/instance/EC_Registration_EngKan/meta/instanceID",
                value: "a"
            }, {
                name: "deprecatedID",
                bind: "/model/instance/EC_Registration_EngKan/meta/deprecatedID"
            }]
        }
    },
    b: {
        form: {
            bind_type: "whatever",
            default_bind_path: "/model/instance/thedata/",
            fields: [{
                name: "nodeA"
            }, {
                name: "nodeB"
            }, {
                name: "nodeF"
            }, {
                name: "instanceID",
                bind: "/model/instance/thedata/meta/instanceID",
                value: "b"
            }, {
                name: "A",
                bind: "/model/instance/thedata/somenodes/A"
            }, {
                name: "B",
                bind: "/model/instance/thedata/somenodes/B"
            }, {
                name: "C",
                bind: "/model/instance/thedata/somenodes/C"
            }, {
                name: "w1",
                bind: "/model/instance/thedata/someweights/w1",
                value: "2"
            }, {
                name: "w2",
                bind: "/model/instance/thedata/someweights/w2"
            }, {
                name: "w.3",
                bind: "/model/instance/thedata/someweights/w.3"
            }, {
                name: "deprecatedID",
                bind: "/model/instance/thedata/meta/deprecatedID"
            }],
            sub_forms: [{
                bind_type: "repeatGroup",
                default_bind_path: "/model/instance/thedata/repeatGroup/",
                meta_fields: [],
                fields: [{
                    name: "nodeC"
                }],
                instances: [{
                    nodeC: "first value"
                }, {
                    nodeC: "second value"
                }, {
                    id: "c397fdcd-f8dd-4d32-89a9-37030c01b40b",
                    nodeC: "third value"
                }, {
                    nodeC: "fourth value"
                }]
            }]
        }
    },
    c: {
        form: {
            bind_type: "mother",
            default_bind_path: "/model/instance/PNC_Visit_EngKan/",
            fields: [{
                name: "pncVisitNumber",
                bind: "/model/instance/PNC_Visit_EngKan/case_pnc_number",
                source: "mother.pncVisitNumber"
            }, {
                name: "pncVisitNumber",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_number",
                source: "mother.pncVisitNumber"
            }, {
                name: "wifeName",
                bind: "/model/instance/PNC_Visit_EngKan/case_woman_name",
                source: "mother.eligible_couple.wifeName",
                value: "test"
            }, {
                name: "wifeName",
                bind: "/model/instance/PNC_Visit_EngKan/woman_name",
                source: "mother.eligible_couple.wifeName",
                value: "test"
            }, {
                name: "deliveryOutcome",
                bind: "/model/instance/PNC_Visit_EngKan/case_delivery_outcome",
                source: "mother.deliveryOutcome",
                value: "live_birth"
            }, {
                name: "didWomanSurvive",
                bind: "/model/instance/PNC_Visit_EngKan/still_birth_group/woman_survived",
                source: "mother.didWomanSurvive"
            }, {
                name: "didMotherSurvive",
                bind: "/model/instance/PNC_Visit_EngKan/still_birth_group/mother_survived",
                source: "mother.didMotherSurvive"
            }, {
                name: "deliveryPlace",
                bind: "/model/instance/PNC_Visit_EngKan/case_place_delivery",
                source: "mother.deliveryPlace",
                value: "phc"
            }, {
                name: "dischargeDate",
                bind: "/model/instance/PNC_Visit_EngKan/case_discharge_date",
                source: "mother.dischargeDate"
            }, {
                name: "deliveryType",
                bind: "/model/instance/PNC_Visit_EngKan/type_delivery",
                source: "mother.deliveryType"
            }, {
                name: "referenceDate",
                bind: "/model/instance/PNC_Visit_EngKan/case_delivery_date",
                source: "mother.referenceDate",
                value: "2013-05-06"
            }, {
                name: "dischargeDate",
                bind: "/model/instance/PNC_Visit_EngKan/discharge_date",
                source: "mother.dischargeDate"
            }, {
                name: "pncVisitDate",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_visit_date",
                source: "mother.pncVisitDate"
            }, {
                name: "pncVisitDay",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_visit_day",
                source: "mother.pncVisitDay"
            }, {
                name: "pncVisitPlace",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_visit_place",
                source: "mother.pncVisitPlace"
            }, {
                name: "pncVisitPerson",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_visit_person",
                source: "mother.pncVisitPerson"
            }, {
                name: "jsyPaymentStatus",
                bind: "/model/instance/PNC_Visit_EngKan/case_jsy",
                source: "mother.jsyPaymentStatus"
            }, {
                name: "jsyPaymentStatus",
                bind: "/model/instance/PNC_Visit_EngKan/jsy_payment",
                source: "mother.jsyPaymentStatus"
            }, {
                name: "jsyPaymentDate",
                bind: "/model/instance/PNC_Visit_EngKan/jsy_date",
                source: "mother.jsyPaymentDate"
            }, {
                name: "madiluKitStatus",
                bind: "/model/instance/PNC_Visit_EngKan/case_madilu",
                source: "mother.madiluKitStatus"
            }, {
                name: "madiluKitStatus",
                bind: "/model/instance/PNC_Visit_EngKan/madilu_kit",
                source: "mother.madiluKitStatus"
            }, {
                name: "madiluKitDate",
                bind: "/model/instance/PNC_Visit_EngKan/madilu_date",
                source: "mother.madiluKitDate"
            }, {
                name: "prasootiPayment2",
                bind: "/model/instance/PNC_Visit_EngKan/case_prasooti_payment2",
                source: "mother.prasootiPayment2"
            }, {
                name: "prasootiPayment2",
                bind: "/model/instance/PNC_Visit_EngKan/prasooti_payment2",
                source: "mother.prasootiPayment2"
            }, {
                name: "prasooti2Date",
                bind: "/model/instance/PNC_Visit_EngKan/prasooti2_date",
                source: "mother.prasooti2Date"
            }, {
                name: "pncMotherDifficulties1",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_difficulties1",
                source: "mother.pncMotherDifficulties1"
            }, {
                name: "pncMotherAbdominalProblems",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_abdominal_problems",
                source: "mother.pncMotherAbdominalProblems"
            }, {
                name: "pncMotherVaginalProblems",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_vaginal_problems",
                source: "mother.pncMotherVaginalProblems"
            }, {
                name: "pncMotherDifficulties2",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_difficulties2",
                source: "mother.pncMotherDifficulties2"
            }, {
                name: "pncMotherBreastProblems",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_breast_problems",
                source: "mother.pncMotherBreastProblems"
            }, {
                name: "pncMotherOtherProblems",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_other_problems",
                source: "mother.pncMotherOtherProblems"
            }, {
                name: "cesareanIncisionArea",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/cesarean_incision_area",
                source: "mother.cesareanIncisionArea"
            }, {
                name: "pncMotherHasFeverSymptoms",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_has_fever_symptoms",
                source: "mother.pncMotherHasFeverSymptoms"
            }, {
                name: "temperature",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/temperature",
                source: "mother.temperature"
            }, {
                name: "pncMotherHasFever",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_has_fever",
                source: "mother.pncMotherHasFever"
            }, {
                name: "pulseRate",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pulse_rate",
                source: "mother.pulseRate"
            }, {
                name: "bpSystolic",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/bp_systolic",
                source: "mother.bpSystolic"
            }, {
                name: "bpDiastolic",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/bp_diastolic",
                source: "mother.bpDiastolic"
            }, {
                name: "pncMotherHasBFDifficulties",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_bf_difficulties",
                source: "mother.pncMotherHasBFDifficulties"
            }, {
                name: "pncMotherExclusiveBF",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pnc_mother_exclusive_bf",
                source: "mother.pncMotherExclusiveBF"
            }, {
                name: "hbLevel",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/hb_level",
                source: "mother.hbLevel"
            }, {
                name: "numberOfIFATabletsGiven",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/ifa_tablets_given",
                source: "mother.numberOfIFATabletsGiven"
            }, {
                name: "ifaTabletsDate",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/ifa_tablets_date",
                source: "mother.ifaTabletsDate"
            }, {
                name: "currentMethod",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/case_pp_fp_method",
                source: "mother.currentMethod"
            }, {
                name: "immediateReferral",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/immediate_referral",
                source: "mother.immediateReferral"
            }, {
                name: "immediateReferralReason",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/immediate_referral_reason",
                source: "mother.immediateReferralReason"
            }, {
                name: "anaemicStatus",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/case_anaemic_status",
                source: "mother.anaemicStatus"
            }, {
                name: "pih",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/case_pih",
                source: "mother.pih"
            }, {
                name: "pih",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pih",
                source: "mother.pih"
            }, {
                name: "preEclampsia",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/case_pre_eclampsia",
                source: "mother.preEclampsia"
            }, {
                name: "preEclampsia",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pre_eclampsia",
                source: "mother.preEclampsia"
            }, {
                name: "preEclampsia",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/pre_eclampsia",
                source: "mother.preEclampsia"
            }, {
                name: "highRiskReason",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/high_risk_reason",
                source: "mother.highRiskReason",
                value: "Tobacco_use Medical_History_TB Medical_History_Hypertension"
            }, {
                name: "is_high_risk",
                bind: "/model/instance/PNC_Visit_EngKan/pnc_mother_group/is_high_risk",
                source: "mother.is_high_risk"
            }, {
                name: "submissionDate",
                bind: "/model/instance/PNC_Visit_EngKan/today",
                source: "mother.submissionDate",
                value: "2013-06-06"
            }],
            sub_forms: [{
                bind_type: "child",
                default_bind_path: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/",
                fields: [{
                    name: "id",
                    source: "child.id"
                }, {
                    name: "gender",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/case_sex_child",
                    source: "child.gender"
                }, {
                    name: "weight",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/case_birthweight",
                    source: "child.weight"
                }, {
                    name: "immunizationsGiven",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/case_immunizations_atbirth",
                    source: "child.immunizationsGiven"
                }, {
                    name: "urineStoolProblems",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_urine_stool_problems",
                    source: "child.urineStoolProblems"
                }, {
                    name: "daysOfDiarrhea",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/days_of_diarrhea",
                    source: "child.daysOfDiarrhea"
                }, {
                    name: "bloodInStool",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/blood_in_stool",
                    source: "child.bloodInStool"
                }, {
                    name: "activityProblems",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_activity_problems",
                    source: "child.activityProblems"
                }, {
                    name: "breathingProblems",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_breathing_problems",
                    source: "child.breathingProblems"
                }, {
                    name: "respirationRate",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_respiration_rate",
                    source: "child.respirationRate"
                }, {
                    name: "skinProblems",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_skin_problems",
                    source: "child.skinProblems"
                }, {
                    name: "otherProblems",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_other_problems",
                    source: "child.otherProblems"
                }, {
                    name: "hasFeverSymptoms",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_has_fever_symptoms",
                    source: "child.hasFeverSymptoms"
                }, {
                    name: "temperature",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/pnc_child_temperature",
                    source: "child.temperature"
                }, {
                    name: "immediateReferral",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/immediate_referral_baby",
                    source: "child.immediateReferral"
                }, {
                    name: "immediateReferralReason",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/immediate_referral_reason_baby",
                    source: "child.immediateReferralReason"
                }, {
                    name: "isHighRisk",
                    bind: "/model/instance/PNC_Visit_EngKan/pnc_child_repeat/is_high_risk_baby",
                    source: "child.isHighRisk"
                }],
                instances: [{
                    id: "906c715d-1272-40e6-8656-5bbef3fdaa1b",
                    gender: "male",
                    weight: "3",
                    immunizationsGiven: "bcg"
                }, {
                    id: "ca2c774e-1bb6-4497-ace2-6b07aa85bda9",
                    gender: "female",
                    weight: "4",
                    immunizationsGiven: "opv_0"
                }, {
                    id: "f418700d-2b89-4835-9681-896cbf7b72b6",
                    gender: "male",
                    weight: "3.5",
                    immunizationsGiven: "opv_0 hepb_0"
                }]
            }]
        }
    }
};
define("mockInstances", function(e) {
        return function() {
            var t;
            return t || e.mockInstances
        }
    }(this)), define("FormDataController", ["ziggy/FormDataController", "mockInstances"], function(e, t) {
        function n(n) {
            n = n || {};
            var i = window.androidContext;
            this.get = function() {
                return i ? e.get(n) || null : t[n.instanceId] || null
            }, this.save = function(t, r) {
                i ? (e.save(n, r), i.goBack()) : console.log("saving...", r)
            }, this.remove = function() {}
        }
        return n
    }), define("enketo-json/FormModelJSON", ["jquery", "jquery.xpath"], function(e) {
        function t(t) {
            function n(t, n, i) {
                var r = e.grep(n, function(e) {
                    return "undefined" == typeof e.bind && i + e.name === t || "undefined" != typeof e.bind && e.bind === t
                });
                return r.length > 1 ? (a("Multiple fields found (multiple nodes with path: " + t + " found in JSON format."), null) : 0 === r.length ? (a("Field not found (node with path: " + t + " was missing from JSON format)."), null) : (console.debug("found field with path " + t + " in JSON Form Data"), r[0])
            }

            function i(e) {
                var t = e.getXPath("model"),
                    n = -1 === t.indexOf("/model/instance") ? "/model/instance" + t : t;
                return {
                    nodeName: e.prop("nodeName"),
                    value: e.text(),
                    path: n
                }
            }

            function r(t, n, i, r) {
                var o, a, s = t.find("root"),
                    l = n.substring(1).split("/"),
                    u = r || {};
                for (o = 0; o < l.length; o++) {
                    if (0 === s.children(l[o]).length || u.name && u.index && l[o] === u.name && 0 === s.children(l[o]).eq(u.index).length) {
                        var c = e.parseXML("<" + l[o] + "/>").documentElement;
                        document.adoptNode(c), a = e(c), s.append(a), s = a
                    } else s = u.index && l[o] === u.name ? s.children(l[o]).eq(u.index) : s.children(l[o]);
                    o === l.length - 1 && s.text(i)
                }
                return t
            }

            function o(e) {
                return e.lastIndexOf("/") !== e.length - 1 ? e + "/" : e
            }

            function a(e) {
                "undefined" == typeof t.errors && (t.errors = []), t.errors.push(e), console.error(e)
            }
            t || a("No instance query parameter provided!");
            var s = ["id"];
            this.toXML = function() {
                var n, i, l, u, c, d, h, p, f, g, m = e(e.parseXML("<root />"));
                if ("object" != typeof t) return a("error: no JSON object provided during instantiation"), null;
                for (n = 0; n < t.form.fields.length; n++) f = o(t.form.default_bind_path), u = t.form.fields[n], "undefined" != typeof u.value && (c = "undefined" == typeof u.bind ? f + u.name : u.bind, d = u.value, r(m, c, d));
                if (t.form.sub_forms)
                    for (n = 0; n < t.form.sub_forms.length; n++)
                        if (h = t.form.sub_forms[n], f = o(h.default_bind_path), g = f.match(/.*\/([^\/]*)\/$/)[1], h.bind_type)
                            for (i = 0; i < h.instances.length; i++)
                                for (p = h.instances[i], l = 0; l < h.fields.length; l++) u = h.fields[l], "undefined" != typeof p[u.name] && -1 == s.indexOf(u.name) && (c = "undefined" == typeof u.bind ? f + u.name : u.bind, d = p[u.name], r(m, c, d, {
                                    name: g,
                                    index: i
                                }), console.log("added path: " + c + ' with value: "' + d + '", repeat NodeName: ' + g + " and repeat index: " + i));
                        else a("Repeat (subform) is missing bind_type.");
                return (new XMLSerializer).serializeToString(m.find("instance>*:first")[0])
            }, this.get = function(r) {
                var o, l, u = [],
                    c = this.getInstanceXML(r, !1).find("*").filter(function() {
                        return 0 === e(this).children().length
                    }),
                    d = this.getInstanceXML(r, !0).find("[template]").siblings().filter(function() {
                        var t = e(this).prop("nodeName");
                        return e(this).siblings(t + "[template]").length > 0
                    });
                return d.each(function() {
                    var r, d, h, p, f, g = [],
                        m = {},
                        v = e(this);
                    if (h = "/model/instance" + v.getXPath(), t.form.sub_forms && (g = e.grep(t.form.sub_forms, function(e) {
                        return e.default_bind_path === h || e.default_bind_path === h + "/"
                    })), 0 === g.length) a('Repeat definition not found (no subform with default_bind_path: "' + h + '" in JSON format)');
                    else if (g.length > 1) a('Multiple repeat definititions found (multiple subforms with default_bind_path: "' + h + '" in JSON format)');
                    else
                        for (p = g[0], -1 === e.inArray(h, u) && (u.push(h), l = jQuery.extend(!0, {}, p.instances), p.instances = []), o = v.find("*").filter(function() {
                            return 0 === e(this).children().length
                        }), c = c.takeOut(o), o.each(function() {
                            var t = i(e(this)),
                                r = n(t.path, p.fields, p.default_bind_path);
                            r && (m[r.name] = t.value)
                        }), p.instances.push(m), f = p.instances.indexOf(m), r = 0; r < s.length; r++) d = s[r], l[f] && "undefined" != typeof l[f][d] && (m[d] = l[f][d])
                }), c.each(function() {
                    var r = i(e(this)),
                        o = n(r.path, t.form.fields, t.form.default_bind_path);
                    o && (o.value || r.value.length > 0) && (o.value = r.value)
                }), t
            }, this.getInstanceXML = function(t, n) {
                return e(e.parseXML(t.getDataStr(n)))
            }
        }
        return function(e) {
            e.fn.takeOut = function(t) {
                return this.filter(function() {
                    for (var n = 0; n < t.length; n++)
                        if (e(this).getXPath() === t.eq(n).getXPath()) return !1;
                    return !0
                })
            }
        }(jQuery), t
    }), define("gui", ["jquery", "bootstrap"], function(e) {
        function t(t, n, i, r) {
            var o, a, s = e("#dialog-alert");
            if (n = n || "Alert", i = i || "danger", o = "normal" === i ? "" : "alert alert-" + i, s.find(".modal-header h3").text(n), s.find(".modal-body p").removeClass().addClass(o).html(t), s.modal({
                keyboard: !0,
                show: !0
            }), s.on("hidden.bs.modal", function() {
                s.find(".modal-header h3, .modal-body p").html(""), clearInterval(a)
            }), "number" == typeof r) {
                var l = r;
                s.find(".self-destruct-timer").text(l), a = setInterval(function() {
                    l--, s.find(".self-destruct-timer").text(l)
                }, 1e3), setTimeout(function() {
                    clearInterval(a), s.find(".close").click()
                }, 1e3 * r)
            }
        }
        return {
            alert: t
        }
    }), define("util", [], function() {
        function e() {
            for (var e, t, n = window.location.search.substring(1), i = n.split("&"), r = {}, o = 0; o < i.length; o++) {
                var a = i[o].split("=");
                a[0].length > 0 && (e = decodeURIComponent(a[1]), t = "true" === e ? !0 : "false" === e ? !1 : e, r[a[0]] = t)
            }
            return r
        }
        return {
            getAllQueryParams: e
        }
    }), define("androidContext", ["mockForms"], function(e) {
        return {
            formName: getURLParameter("formName"),
            getForm: function() {
                return window.androidContext ? window.androidContext.getForm() : e[this.formName].html_form
            },
            getModel: function() {
                return window.androidContext ? window.androidContext.getModel() : e[this.formName].xml_model
            },
            goBack: function() {
                window.androidContext && window.androidContext.goBack()
            }
        }
    }), String.prototype.format = function(e, t, n) {
        return e + t + n
    }, define("plugins", ["jquery"], function(e) {
        e.fn.btnBusyState = function(t) {
            var n, i;
            return this.each(function() {
                n = e(this), i = n.data("btnContent"), t && !i ? (i = n.html(), n.data("btnContent", i), n.empty().append("<progress></progress>").attr("disabled", !0)) : !t && i && (n.data("btnContent", null), n.empty().append(i).removeAttr("disabled"))
            })
        }
    }), requirejs.config({
        baseUrl: "../../src/js/",
        paths: {
            "enketo-js": "../../lib/enketo-core/src/js",
            "enketo-widget": "../../lib/enketo-core/src/widget",
            "enketo-config": "../../config.json",
            "enketo-json": "../../lib/enketo-json/src",
            "jquery.xpath": "../../lib/enketo-core/lib/jquery-xpath/jquery.xpath",
            "jquery.touchswipe": "../../lib/enketo-core/lib/jquery-touchswipe/jquery.touchSwipe",
            text: "../../lib/enketo-core/lib/text/text",
            xpath: "../../lib/enketo-core/lib/xpath/build/xpathjs_javarosa",
            gmaps: "http://maps.google.com/maps/api/js?v=3.exp&sensor=false&libraries=places&callback=gmapsLoaded",
            jquery: "../../lib/enketo-core/lib/jquery",
            bootstrap: "../../lib/enketo-core/lib/bootstrap",
            Modernizr: "../../lib/enketo-core/lib/Modernizr",
            leaflet: "../../lib/enketo-core/lib/leaflet/leaflet",
            "bootstrap-slider": "../../lib/enketo-core/lib/bootstrap-slider/js/bootstrap-slider",
            androidContext: "../../build/mock/androidcontext.mock",
            mockForms: "../../build/mock/transforms.mock",
            mockInstances: "../../build/mock/instances.mock",
            ziggy: "../../lib/ziggy/ziggy/src"
        },
        shim: {
            xpath: {
                exports: "XPathJS"
            },
            bootstrap: {
                deps: ["jquery"],
                exports: "jQuery.fn.popover"
            },
            "widget/date/bootstrap3-datepicker/js/bootstrap-datepicker": {
                deps: ["jquery"],
                exports: "jQuery.fn.datepicker"
            },
            "widget/time/bootstrap3-timepicker/js/bootstrap-timepicker": {
                deps: ["jquery"],
                exports: "jQuery.fn.timepicker"
            },
            Modernizr: {
                exports: "Modernizr"
            },
            mockForms: {
                exports: "mockForms"
            },
            mockInstances: {
                exports: "mockInstances"
            }
        }
    }), window.androidContext && define("mockForms", null), requirejs(["enketo-js/Form", "FormDataController", "enketo-json/FormModelJSON", "gui", "util", "androidContext", "jquery", "plugins"], function(e, t, n, i, r, o, a) {
        var s, l, u, c, d, h, p, f = r.getAllQueryParams(),
            g = new t(f);
        return window.onerror = function(e, t, n) {
            return console.error("Javascript Error: , msg: {0}, url: {1}, line: {2}".format(e, t, n)), !0
        }, a("form.or").replaceWith(o.getForm()), (l = g.get()) ? (s = o.getModel(), d = new n(l), u = d.toXML(), h = new e("form.or:eq(0)", s, u), c = h.init(), console.log("load errors", c), void a(document).on("click", "button#submit-form:not(:disabled)", function() {
            var e, t, n = a(this);
            a(this).btnBusyState(!0), setTimeout(function() {
                if ("undefined" != typeof h) {
                    if (!h.validate()) return i.alert("Form contains errors <br/>(please see fields marked in red)"), void n.btnBusyState(!1);
                    e = d.get(h), delete e.errors, t = g.save(h.getInstanceID(), e), n.btnBusyState(!1)
                }
            }, 100)
        })) : (a("form.or").remove(), p = f.instanceId || void 0, i.alert('JSON Instance with id "' + p + '" could not be found.'))
    }), define("../../main", function() {}), define("enketo-js/Widget", ["jquery"], function(e) {
        var t = function(e, t, n) {
            this.element = e, this.options = t || {}, this.namespace = this.namespace || "somewidget", this.options.touch = "undefined" != typeof this.options.touch ? this.options.touch : !1, this.event = n || null
        };
        return t.prototype = {
            destroy: function(t) {
                e(t).removeData(this.namespace).off("." + this.namespace).show().next(".widget").remove()
            },
            disable: function() {},
            enable: function() {},
            update: function() {}
        }, t
    }), define("enketo-widget/note/notewidget", ["enketo-js/Widget", "jquery", "enketo-js/plugins"], function(e, t) {
        function n(t, n) {
            this.namespace = i, e.call(this, t, n), this._init()
        }
        var i = "notewidget";
        n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype._init = function() {
            var e = t(this.element);
            e.find(".question-label").markdownToHtml().end().find("[readonly]").addClass("ignore"), e.is(".note") && !e.next().is(".note") && e.addClass("last-of-class")
        }, t.fn[i] = function(e, r) {
            return this.each(function() {
                var o = t(this),
                    a = o.data(i);
                e = e || {}, a || "object" != typeof e ? a && "string" == typeof e && a[e](this) : o.data(i, a = new n(this, e, r))
            })
        }
    }), define("enketo-widget/select-mobile/selectpicker", ["jquery", "enketo-js/Widget"], function(e, t) {
        function n(e, n) {
            this.namespace = i, t.call(this, e, n), this._init()
        }
        var i = "mobileSelectpicker";
        n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.prototype._init = function() {
            var t = this;
            e(this.element).on("change." + i, function() {
                return t._showSelectedValues(), !0
            }), this._showSelectedValues()
        }, n.prototype._showSelectedValues = function() {
            var t, n = [],
                i = '<span class="widget mobileselect"></span>',
                r = e(this.element),
                o = r.next(".widget").length > 0 ? r.next(".widget") : e(i).insertAfter(r),
                a = e.isArray(r.val()) ? r.val() : [r.val()];
            for (t = 0; t < a.length; t++) n.push(e(this).find('option[value="' + a[t] + '"]').text());
            o.text(a.join(", "))
        }, e.fn[i] = function(t, r) {
            return t = t || {}, this.each(function() {
                var o = e(this),
                    a = o.data(i);
                !a && "object" == typeof t && t.touch && o.data(i, a = new n(this, t, r)), a && "string" == typeof t && a[t](this)
            })
        }
    }), define("enketo-widget/table/tablewidget", ["enketo-js/Widget", "jquery", "enketo-js/plugins"], function(e, t) {
        function n(t, n) {
            this.namespace = i, e.call(this, t, n), this.init()
        }
        var i = "tablewidget";
        n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype.init = function() {
            this.fixXlsFormShortcutMarkup()
        }, n.prototype.fixXlsFormShortcutMarkup = function() {
            var e, n, i;
            t(this.element).parent().parent().find(".or-appearance-field-list .or-appearance-label").prev(".note").each(function() {
                i = t(this), e = i.find(".question-label"), n = i.find(".or-hint"), t("<h4></h4>").insertAfter(i).append(e).append(n), i.remove()
            })
        }, n.prototype.destroy = function() {
            console.debug(i, "destroy called")
        }, t.fn[i] = function(e, r) {
            return e = e || {}, this.each(function() {
                var o = t(this),
                    a = o.data(i);
                a || "object" != typeof e ? a && "string" == typeof e && a[e](this) : o.data(i, a = new n(this, e, r))
            })
        }
    }), define("enketo-widget/radio/radiopicker", ["enketo-js/Widget", "jquery", "enketo-js/plugins"], function(e, t) {
        function n(t, n) {
            this.namespace = r, e.call(this, t, n), this._init()
        }
        var i = null,
            r = "radiopicker";
        n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype._init = function() {
            this._setDelegatedHandlers()
        }, n.prototype._setDelegatedHandlers = function() {
            var e, n = t(this.element);
            n.on("click", 'input[type="radio"]:checked', function() {
                t(this).parent("label").siblings().removeAttr("data-checked").end().attr("data-checked", "true")
            }), n.on("click", 'input[type="checkbox"]', function() {
                e = t(this).parent("label"), t(this).is(":checked") ? e.attr("data-checked", "true") : e.removeAttr("data-checked")
            }), n.on("click", 'input[type="radio"], input[type="checkbox"]', function() {
                i && i.trigger("fakeblur"), i = t(this).trigger("fakefocus")
            }), n.on("focusin fakefocus", 'input:not([type="radio"], [type="checkbox"]), textarea, select', function() {
                i && i.trigger("fakeblur"), i = null
            }), n.find('input[type="radio"]:checked, input[type="checkbox"]:checked').parent("label").attr("data-checked", "true"), n.on("click", '[data-checked]>input[type="radio"]', function() {
                t(this).prop("checked", !1).trigger("change").parent().removeAttr("data-checked")
            })
        }, n.prototype.destroy = function() {
            console.debug(r, "destroy called")
        }, t.fn[r] = function(e, i) {
            var o = t(this),
                a = o.data(r);
            return e = e || {}, a || "object" != typeof e ? a && "string" == typeof e && a[e](this) : o.data(r, a = new n(o[0], e, i)), this
        }
    }),
    function(e, t, n) {
        var i = function(t, n) {
            this.widget = "", this.$element = e(t), this.defaultTime = n.defaultTime, this.disableFocus = n.disableFocus, this.disableMousewheel = n.disableMousewheel, this.isOpen = n.isOpen, this.minuteStep = n.minuteStep, this.modalBackdrop = n.modalBackdrop, this.orientation = n.orientation, this.secondStep = n.secondStep, this.showInputs = n.showInputs, this.showMeridian = n.showMeridian, this.showSeconds = n.showSeconds, this.template = n.template, this.appendWidgetTo = n.appendWidgetTo, this.showWidgetOnAddonClick = n.showWidgetOnAddonClick, this._init()
        };
        i.prototype = {
            constructor: i,
            _init: function() {
                var t = this;
                this.showWidgetOnAddonClick && (this.$element.parent().hasClass("input-append") || this.$element.parent().hasClass("input-prepend")) ? (this.$element.parent(".input-append, .input-prepend").find(".add-on").on({
                    "click.timepicker": e.proxy(this.showWidget, this)
                }), this.$element.on({
                    "focus.timepicker": e.proxy(this.highlightUnit, this),
                    "click.timepicker": e.proxy(this.highlightUnit, this),
                    "keydown.timepicker": e.proxy(this.elementKeydown, this),
                    "blur.timepicker": e.proxy(this.blurElement, this),
                    "mousewheel.timepicker DOMMouseScroll.timepicker": e.proxy(this.mousewheel, this)
                })) : this.$element.on(this.template ? {
                    "focus.timepicker": e.proxy(this.showWidget, this),
                    "click.timepicker": e.proxy(this.showWidget, this),
                    "blur.timepicker": e.proxy(this.blurElement, this),
                    "mousewheel.timepicker DOMMouseScroll.timepicker": e.proxy(this.mousewheel, this)
                } : {
                    "focus.timepicker": e.proxy(this.highlightUnit, this),
                    "click.timepicker": e.proxy(this.highlightUnit, this),
                    "keydown.timepicker": e.proxy(this.elementKeydown, this),
                    "blur.timepicker": e.proxy(this.blurElement, this),
                    "mousewheel.timepicker DOMMouseScroll.timepicker": e.proxy(this.mousewheel, this)
                }), this.$widget = this.template !== !1 ? e(this.getTemplate()).on("click", e.proxy(this.widgetClick, this)) : !1, this.showInputs && this.$widget !== !1 && this.$widget.find("input").each(function() {
                    e(this).on({
                        "click.timepicker": function() {
                            e(this).select()
                        },
                        "keydown.timepicker": e.proxy(t.widgetKeydown, t),
                        "keyup.timepicker": e.proxy(t.widgetKeyup, t)
                    })
                }), this.setDefaultTime(this.defaultTime)
            },
            blurElement: function() {
                this.highlightedUnit = null, this.updateFromElementVal()
            },
            clear: function() {
                this.hour = "", this.minute = "", this.second = "", this.meridian = "", this.$element.val("")
            },
            decrementHour: function() {
                if (this.showMeridian)
                    if (1 === this.hour) this.hour = 12;
                    else {
                        if (12 === this.hour) return this.hour--, this.toggleMeridian();
                        if (0 === this.hour) return this.hour = 11, this.toggleMeridian();
                        this.hour--
                    } else this.hour <= 0 ? this.hour = 23 : this.hour--
            },
            decrementMinute: function(e) {
                var t;
                t = e ? this.minute - e : this.minute - this.minuteStep, 0 > t ? (this.decrementHour(), this.minute = t + 60) : this.minute = t
            },
            decrementSecond: function() {
                var e = this.second - this.secondStep;
                0 > e ? (this.decrementMinute(!0), this.second = e + 60) : this.second = e
            },
            elementKeydown: function(e) {
                switch (e.keyCode) {
                    case 9:
                    case 27:
                        this.updateFromElementVal();
                        break;
                    case 37:
                        e.preventDefault(), this.highlightPrevUnit();
                        break;
                    case 38:
                        switch (e.preventDefault(), this.highlightedUnit) {
                            case "hour":
                                this.incrementHour(), this.highlightHour();
                                break;
                            case "minute":
                                this.incrementMinute(), this.highlightMinute();
                                break;
                            case "second":
                                this.incrementSecond(), this.highlightSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian(), this.highlightMeridian()
                        }
                        this.update();
                        break;
                    case 39:
                        e.preventDefault(), this.highlightNextUnit();
                        break;
                    case 40:
                        switch (e.preventDefault(), this.highlightedUnit) {
                            case "hour":
                                this.decrementHour(), this.highlightHour();
                                break;
                            case "minute":
                                this.decrementMinute(), this.highlightMinute();
                                break;
                            case "second":
                                this.decrementSecond(), this.highlightSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian(), this.highlightMeridian()
                        }
                        this.update()
                }
            },
            getCursorPosition: function() {
                var e = this.$element.get(0);
                if ("selectionStart" in e) return e.selectionStart;
                if (n.selection) {
                    e.focus();
                    var t = n.selection.createRange(),
                        i = n.selection.createRange().text.length;
                    return t.moveStart("character", -e.value.length), t.text.length - i
                }
            },
            getTemplate: function() {
                var e, t, n, i, r, o;
                switch (this.showInputs ? (t = '<input type="text" class="bootstrap-timepicker-hour form-control" maxlength="2"/>', n = '<input type="text" class="bootstrap-timepicker-minute form-control" maxlength="2"/>', i = '<input type="text" class="bootstrap-timepicker-second form-control" maxlength="2"/>', r = '<input type="text" class="bootstrap-timepicker-meridian form-control" maxlength="2"/>') : (t = '<span class="bootstrap-timepicker-hour"></span>', n = '<span class="bootstrap-timepicker-minute"></span>', i = '<span class="bootstrap-timepicker-second"></span>', r = '<span class="bootstrap-timepicker-meridian"></span>'), o = '<table><tr><td><a href="#" data-action="incrementHour"><i class="glyphicon glyphicon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' : "") + "</tr><tr><td>" + t + '</td> <td class="separator">:</td><td>' + n + "</td> " + (this.showSeconds ? '<td class="separator">:</td><td>' + i + "</td>" : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td>' + r + "</td>" : "") + '</tr><tr><td><a href="#" data-action="decrementHour"><i class="glyphicon glyphicon-chevron-down"></i></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' : "") + "</tr></table>", this.template) {
                    case "modal":
                        e = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="' + (this.modalBackdrop ? "true" : "false") + '"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">??</a><h3>Pick a Time</h3></div><div class="modal-content">' + o + '</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';
                        break;
                    case "dropdown":
                        e = '<div class="bootstrap-timepicker-widget dropdown-menu">' + o + "</div>"
                }
                return e
            },
            getTime: function() {
                return "" === this.hour ? "" : this.hour + ":" + (1 === this.minute.toString().length ? "0" + this.minute : this.minute) + (this.showSeconds ? ":" + (1 === this.second.toString().length ? "0" + this.second : this.second) : "") + (this.showMeridian ? " " + this.meridian : "")
            },
            hideWidget: function() {
                this.isOpen !== !1 && (this.$element.trigger({
                    type: "hide.timepicker",
                    time: {
                        value: this.getTime(),
                        hours: this.hour,
                        minutes: this.minute,
                        seconds: this.second,
                        meridian: this.meridian
                    }
                }), "modal" === this.template && this.$widget.modal ? this.$widget.modal("hide") : this.$widget.removeClass("open"), e(n).off("mousedown.timepicker, touchend.timepicker"), this.isOpen = !1, this.$widget.detach())
            },
            highlightUnit: function() {
                this.position = this.getCursorPosition(), this.position >= 0 && this.position <= 2 ? this.highlightHour() : this.position >= 3 && this.position <= 5 ? this.highlightMinute() : this.position >= 6 && this.position <= 8 ? this.showSeconds ? this.highlightSecond() : this.highlightMeridian() : this.position >= 9 && this.position <= 11 && this.highlightMeridian()
            },
            highlightNextUnit: function() {
                switch (this.highlightedUnit) {
                    case "hour":
                        this.highlightMinute();
                        break;
                    case "minute":
                        this.showSeconds ? this.highlightSecond() : this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                        break;
                    case "second":
                        this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                        break;
                    case "meridian":
                        this.highlightHour()
                }
            },
            highlightPrevUnit: function() {
                switch (this.highlightedUnit) {
                    case "hour":
                        this.showMeridian ? this.highlightMeridian() : this.showSeconds ? this.highlightSecond() : this.highlightMinute();
                        break;
                    case "minute":
                        this.highlightHour();
                        break;
                    case "second":
                        this.highlightMinute();
                        break;
                    case "meridian":
                        this.showSeconds ? this.highlightSecond() : this.highlightMinute()
                }
            },
            highlightHour: function() {
                var e = this.$element.get(0),
                    t = this;
                this.highlightedUnit = "hour", e.setSelectionRange && setTimeout(function() {
                    t.hour < 10 ? e.setSelectionRange(0, 1) : e.setSelectionRange(0, 2)
                }, 0)
            },
            highlightMinute: function() {
                var e = this.$element.get(0),
                    t = this;
                this.highlightedUnit = "minute", e.setSelectionRange && setTimeout(function() {
                    t.hour < 10 ? e.setSelectionRange(2, 4) : e.setSelectionRange(3, 5)
                }, 0)
            },
            highlightSecond: function() {
                var e = this.$element.get(0),
                    t = this;
                this.highlightedUnit = "second", e.setSelectionRange && setTimeout(function() {
                    t.hour < 10 ? e.setSelectionRange(5, 7) : e.setSelectionRange(6, 8)
                }, 0)
            },
            highlightMeridian: function() {
                var e = this.$element.get(0),
                    t = this;
                this.highlightedUnit = "meridian", e.setSelectionRange && (this.showSeconds ? setTimeout(function() {
                    t.hour < 10 ? e.setSelectionRange(8, 10) : e.setSelectionRange(9, 11)
                }, 0) : setTimeout(function() {
                    t.hour < 10 ? e.setSelectionRange(5, 7) : e.setSelectionRange(6, 8)
                }, 0))
            },
            incrementHour: function() {
                if (this.showMeridian) {
                    if (11 === this.hour) return this.hour++, this.toggleMeridian();
                    12 === this.hour && (this.hour = 0)
                }
                return 23 === this.hour ? void(this.hour = 0) : void this.hour++
            },
            incrementMinute: function(e) {
                var t;
                t = e ? this.minute + e : this.minute + this.minuteStep - this.minute % this.minuteStep, t > 59 ? (this.incrementHour(), this.minute = t - 60) : this.minute = t
            },
            incrementSecond: function() {
                var e = this.second + this.secondStep - this.second % this.secondStep;
                e > 59 ? (this.incrementMinute(!0), this.second = e - 60) : this.second = e
            },
            mousewheel: function(t) {
                if (!this.disableMousewheel) {
                    t.preventDefault(), t.stopPropagation();
                    var n = t.originalEvent.wheelDelta || -t.originalEvent.detail,
                        i = null;
                    switch ("mousewheel" === t.type ? i = -1 * t.originalEvent.wheelDelta : "DOMMouseScroll" === t.type && (i = 40 * t.originalEvent.detail), i && (t.preventDefault(), e(this).scrollTop(i + e(this).scrollTop())), this.highlightedUnit) {
                        case "minute":
                            n > 0 ? this.incrementMinute() : this.decrementMinute(), this.highlightMinute();
                            break;
                        case "second":
                            n > 0 ? this.incrementSecond() : this.decrementSecond(), this.highlightSecond();
                            break;
                        case "meridian":
                            this.toggleMeridian(), this.highlightMeridian();
                            break;
                        default:
                            n > 0 ? this.incrementHour() : this.decrementHour(), this.highlightHour()
                    }
                    return !1
                }
            },
            place: function() {
                if (!this.isInline) {
                    var n = this.$widget.outerWidth(),
                        i = this.$widget.outerHeight(),
                        r = 10,
                        o = e(t).width(),
                        a = e(t).height(),
                        s = e(t).scrollTop(),
                        l = parseInt(this.$element.parents().filter(function() {}).first().css("z-index"), 10) + 10,
                        u = this.component ? this.component.parent().offset() : this.$element.offset(),
                        c = this.component ? this.component.outerHeight(!0) : this.$element.outerHeight(!1),
                        d = this.component ? this.component.outerWidth(!0) : this.$element.outerWidth(!1),
                        h = u.left,
                        p = u.top;
                    this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left"), "auto" !== this.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.orientation.x), "right" === this.orientation.x && (h -= n - d)) : (this.$widget.addClass("timepicker-orient-left"), u.left < 0 ? h -= u.left - r : u.left + n > o && (h = o - n - r));
                    var f, g, m = this.orientation.y;
                    "auto" === m && (f = -s + u.top - i, g = s + a - (u.top + c + i), m = Math.max(f, g) === g ? "top" : "bottom"), this.$widget.addClass("timepicker-orient-" + m), "top" === m ? p += c : p -= i + parseInt(this.$widget.css("padding-top"), 10), this.$widget.css({
                        top: p,
                        left: h,
                        zIndex: l
                    })
                }
            },
            remove: function() {
                e("document").off(".timepicker"), this.$widget && this.$widget.remove(), delete this.$element.data().timepicker
            },
            setDefaultTime: function(e) {
                if (this.$element.val()) this.updateFromElementVal();
                else if ("current" === e) {
                    var t = new Date,
                        n = t.getHours(),
                        i = t.getMinutes(),
                        r = t.getSeconds(),
                        o = "AM";
                    0 !== r && (r = Math.ceil(t.getSeconds() / this.secondStep) * this.secondStep, 60 === r && (i += 1, r = 0)), 0 !== i && (i = Math.ceil(t.getMinutes() / this.minuteStep) * this.minuteStep, 60 === i && (n += 1, i = 0)), this.showMeridian && (0 === n ? n = 12 : n >= 12 ? (n > 12 && (n -= 12), o = "PM") : o = "AM"), this.hour = n, this.minute = i, this.second = r, this.meridian = o, this.update()
                } else e === !1 ? (this.hour = 0, this.minute = 0, this.second = 0, this.meridian = "AM") : this.setTime(e)
            },
            setTime: function(e, t) {
                if (!e) return void this.clear();
                var n, i, r, o, a;
                "object" == typeof e && e.getMonth ? (i = e.getHours(), r = e.getMinutes(), o = e.getSeconds(), this.showMeridian && (a = "AM", i > 12 && (a = "PM", i %= 12), 12 === i && (a = "PM"))) : (a = null !== e.match(/p/i) ? "PM" : "AM", e = e.replace(/[^0-9\:]/g, ""), n = e.split(":"), i = n[0] ? n[0].toString() : n.toString(), r = n[1] ? n[1].toString() : "", o = n[2] ? n[2].toString() : "", i.length > 4 && (o = i.substr(4, 2)), i.length > 2 && (r = i.substr(2, 2), i = i.substr(0, 2)), r.length > 2 && (o = r.substr(2, 2), r = r.substr(0, 2)), o.length > 2 && (o = o.substr(2, 2)), i = parseInt(i, 10), r = parseInt(r, 10), o = parseInt(o, 10), isNaN(i) && (i = 0), isNaN(r) && (r = 0), isNaN(o) && (o = 0), this.showMeridian ? 1 > i ? i = 1 : i > 12 && (i = 12) : (i >= 24 ? i = 23 : 0 > i && (i = 0), 13 > i && "PM" === a && (i += 12)), 0 > r ? r = 0 : r >= 60 && (r = 59), this.showSeconds && (isNaN(o) ? o = 0 : 0 > o ? o = 0 : o >= 60 && (o = 59))), this.hour = i, this.minute = r, this.second = o, this.meridian = a, this.update(t)
            },
            showWidget: function() {
                if (!this.isOpen && !this.$element.is(":disabled")) {
                    this.$widget.appendTo(this.appendWidgetTo);
                    var t = this;
                    e(n).on("mousedown.timepicker, touchend.timepicker", function(e) {
                        t.$element.parent().find(e.target).length || t.$widget.is(e.target) || t.$widget.find(e.target).length || t.hideWidget()
                    }), this.$element.trigger({
                        type: "show.timepicker",
                        time: {
                            value: this.getTime(),
                            hours: this.hour,
                            minutes: this.minute,
                            seconds: this.second,
                            meridian: this.meridian
                        }
                    }), this.place(), this.disableFocus && this.$element.blur(), "" === this.hour && (this.defaultTime ? this.setDefaultTime(this.defaultTime) : this.setTime("0:0:0")), "modal" === this.template && this.$widget.modal ? this.$widget.modal("show").on("hidden", e.proxy(this.hideWidget, this)) : this.isOpen === !1 && this.$widget.addClass("open"), this.isOpen = !0
                }
            },
            toggleMeridian: function() {
                this.meridian = "AM" === this.meridian ? "PM" : "AM"
            },
            update: function(e) {
                this.updateElement(), e || this.updateWidget(), this.$element.trigger({
                    type: "changeTime.timepicker",
                    time: {
                        value: this.getTime(),
                        hours: this.hour,
                        minutes: this.minute,
                        seconds: this.second,
                        meridian: this.meridian
                    }
                })
            },
            updateElement: function() {
                this.$element.val(this.getTime()).change()
            },
            updateFromElementVal: function() {
                this.setTime(this.$element.val())
            },
            updateWidget: function() {
                if (this.$widget !== !1) {
                    var e = this.hour,
                        t = 1 === this.minute.toString().length ? "0" + this.minute : this.minute,
                        n = 1 === this.second.toString().length ? "0" + this.second : this.second;
                    this.showInputs ? (this.$widget.find("input.bootstrap-timepicker-hour").val(e), this.$widget.find("input.bootstrap-timepicker-minute").val(t), this.showSeconds && this.$widget.find("input.bootstrap-timepicker-second").val(n), this.showMeridian && this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)) : (this.$widget.find("span.bootstrap-timepicker-hour").text(e), this.$widget.find("span.bootstrap-timepicker-minute").text(t), this.showSeconds && this.$widget.find("span.bootstrap-timepicker-second").text(n), this.showMeridian && this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))
                }
            },
            updateFromWidgetInputs: function() {
                if (this.$widget !== !1) {
                    var e = this.$widget.find("input.bootstrap-timepicker-hour").val() + ":" + this.$widget.find("input.bootstrap-timepicker-minute").val() + (this.showSeconds ? ":" + this.$widget.find("input.bootstrap-timepicker-second").val() : "") + (this.showMeridian ? this.$widget.find("input.bootstrap-timepicker-meridian").val() : "");
                    this.setTime(e, !0)
                }
            },
            widgetClick: function(t) {
                t.stopPropagation(), t.preventDefault();
                var n = e(t.target),
                    i = n.closest("a").data("action");
                i && this[i](), this.update(), n.is("input") && n.get(0).setSelectionRange(0, 2)
            },
            widgetKeydown: function(t) {
                var n = e(t.target),
                    i = n.attr("class").replace("bootstrap-timepicker-", "");
                switch (t.keyCode) {
                    case 9:
                        if (this.showMeridian && "meridian" === i || this.showSeconds && "second" === i || !this.showMeridian && !this.showSeconds && "minute" === i) return this.hideWidget();
                        break;
                    case 27:
                        this.hideWidget();
                        break;
                    case 38:
                        switch (t.preventDefault(), i) {
                            case "hour":
                                this.incrementHour();
                                break;
                            case "minute":
                                this.incrementMinute();
                                break;
                            case "second":
                                this.incrementSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian()
                        }
                        this.setTime(this.getTime()), n.get(0).setSelectionRange(0, 2);
                        break;
                    case 40:
                        switch (t.preventDefault(), i) {
                            case "hour":
                                this.decrementHour();
                                break;
                            case "minute":
                                this.decrementMinute();
                                break;
                            case "second":
                                this.decrementSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian()
                        }
                        this.setTime(this.getTime()), n.get(0).setSelectionRange(0, 2)
                }
            },
            widgetKeyup: function(e) {
                (65 === e.keyCode || 77 === e.keyCode || 80 === e.keyCode || 46 === e.keyCode || 8 === e.keyCode || e.keyCode >= 46 && e.keyCode <= 57) && this.updateFromWidgetInputs()
            }
        }, e.fn.timepicker = function(t) {
            var n = Array.apply(null, arguments);
            return n.shift(), this.each(function() {
                var r = e(this),
                    o = r.data("timepicker"),
                    a = "object" == typeof t && t;
                o || r.data("timepicker", o = new i(this, e.extend({}, e.fn.timepicker.defaults, a, e(this).data()))), "string" == typeof t && o[t].apply(o, n)
            })
        }, e.fn.timepicker.defaults = {
            defaultTime: "current",
            disableFocus: !1,
            disableMousewheel: !1,
            isOpen: !1,
            minuteStep: 15,
            modalBackdrop: !1,
            orientation: {
                x: "auto",
                y: "auto"
            },
            secondStep: 15,
            showSeconds: !1,
            showInputs: !0,
            showMeridian: !0,
            template: "dropdown",
            appendWidgetTo: "body",
            showWidgetOnAddonClick: !0
        }, e.fn.timepicker.Constructor = i
    }(jQuery, window, document), define("enketo-widget/time/bootstrap3-timepicker/js/bootstrap-timepicker", function() {}), define("enketo-widget/time/timepicker-extended", ["enketo-js/Widget", "Modernizr", "jquery", "enketo-widget/time/bootstrap3-timepicker/js/bootstrap-timepicker"], function(e, t, n) {
        function i(t, n) {
            this.namespace = r, e.call(this, t, n), this._init()
        }
        var r = "timepickerExtended";
        i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.prototype._init = function() {
            var e = n(this.element),
                t = (n(this).parent("label"), n(this.element).val()),
                i = n('<div class="widget bootstrap-timepicker"><input class="ignore timepicker-default input-small" readonly="readonly" type="text" value="' + t + '" placeholder="hh:mm" /><button class="btn-reset"><i class="glyphicon glyphicon-refresh"> </i></button></div>'),
                r = i.find(".btn-reset"),
                o = i.find("input");
            e.next(".widget.bootstrap-timepicker-component").remove(), e.hide().after(i), o.timepicker({
                defaultTime: t.length > 0 ? t : "current",
                showMeridian: !1
            }).val(t).closest(".widget").find("input").addClass("ignore"), o.on("change", function() {
                var t = n(this),
                    i = /^[0-9]:/.test(t.val()) ? "0" + t.val() : t.val();
                return i = /^[0-9]{2}:$/.test(i) ? i + "00" : i, console.debug("time val to be entered: ", i), e.val(i).trigger("change").blur(), !1
            }), r.on("click", function() {
                o.val("").trigger("change")
            }), o.on("focus blur", function(t) {
                e.trigger("fake" + t.type)
            })
        }, n.fn[r] = function(e, o) {
            return e = e || {}, this.each(function() {
                var a = n(this),
                    s = a.data(r);
                s || "object" != typeof e || e.touch && t.inputtypes.time ? s && "string" == typeof e && s[e](this) : a.data(r, s = new i(this, e, o))
            })
        }
    }),
    function(e, t) {
        function n() {
            return new Date(Date.UTC.apply(Date, arguments))
        }

        function i() {
            var e = new Date;
            return n(e.getFullYear(), e.getMonth(), e.getDate())
        }

        function r(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }

        function o(t, n) {
            var i, r = e(t).data(),
                o = {},
                a = new RegExp("^" + n.toLowerCase() + "([A-Z])"),
                n = new RegExp("^" + n.toLowerCase());
            for (var s in r) n.test(s) && (i = s.replace(a, function(e, t) {
                return t.toLowerCase()
            }), o[i] = r[s]);
            return o
        }

        function a(t) {
            var n = {};
            if (f[t] || (t = t.split("-")[0], f[t])) {
                var i = f[t];
                return e.each(p, function(e, t) {
                    t in i && (n[t] = i[t])
                }), n
            }
        }
        var s = e(window),
            l = function() {
                var t = {
                    get: function(e) {
                        return this.slice(e)[0]
                    },
                    contains: function(e) {
                        for (var t = e && e.valueOf(), n = 0, i = this.length; i > n; n++)
                            if (this[n].valueOf() === t) return n;
                        return -1
                    },
                    remove: function(e) {
                        this.splice(e, 1)
                    },
                    replace: function(t) {
                        t && (e.isArray(t) || (t = [t]), this.clear(), this.push.apply(this, t))
                    },
                    clear: function() {
                        this.splice(0)
                    },
                    copy: function() {
                        var e = new l;
                        return e.replace(this), e
                    }
                };
                return function() {
                    var n = [];
                    return n.push.apply(n, arguments), e.extend(n, t), n
                }
            }(),
            u = function(t, n) {
                this.dates = new l, this.viewDate = i(), this.focusDate = null, this._process_options(n), this.element = e(t), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = e(g.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function(e, t) {
                    return parseInt(t) + 1
                }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
            };
        u.prototype = {
            constructor: u,
            _process_options: function(t) {
                this._o = e.extend({}, this._o, t);
                var n = this.o = e.extend({}, this._o),
                    i = n.language;
                switch (f[i] || (i = i.split("-")[0], f[i] || (i = h.language)), n.language = i, n.startView) {
                    case 2:
                    case "decade":
                        n.startView = 2;
                        break;
                    case 1:
                    case "year":
                        n.startView = 1;
                        break;
                    default:
                        n.startView = 0
                }
                switch (n.minViewMode) {
                    case 1:
                    case "months":
                        n.minViewMode = 1;
                        break;
                    case 2:
                    case "years":
                        n.minViewMode = 2;
                        break;
                    default:
                        n.minViewMode = 0
                }
                n.startView = Math.max(n.startView, n.minViewMode), n.multidate !== !0 && (n.multidate = Number(n.multidate) || !1, n.multidate = n.multidate !== !1 ? Math.max(0, n.multidate) : 1), n.multidateSeparator = String(n.multidateSeparator), n.weekStart %= 7, n.weekEnd = (n.weekStart + 6) % 7;
                var r = g.parseFormat(n.format);
                n.startDate !== -1 / 0 && (n.startDate = n.startDate ? n.startDate instanceof Date ? this._local_to_utc(this._zero_time(n.startDate)) : g.parseDate(n.startDate, r, n.language) : -1 / 0), 1 / 0 !== n.endDate && (n.endDate = n.endDate ? n.endDate instanceof Date ? this._local_to_utc(this._zero_time(n.endDate)) : g.parseDate(n.endDate, r, n.language) : 1 / 0), n.daysOfWeekDisabled = n.daysOfWeekDisabled || [], e.isArray(n.daysOfWeekDisabled) || (n.daysOfWeekDisabled = n.daysOfWeekDisabled.split(/[,\s]*/)), n.daysOfWeekDisabled = e.map(n.daysOfWeekDisabled, function(e) {
                    return parseInt(e, 10)
                });
                var o = String(n.orientation).toLowerCase().split(/\s+/g),
                    a = n.orientation.toLowerCase();
                if (o = e.grep(o, function(e) {
                    return /^auto|left|right|top|bottom$/.test(e)
                }), n.orientation = {
                    x: "auto",
                    y: "auto"
                }, a && "auto" !== a)
                    if (1 === o.length) switch (o[0]) {
                        case "top":
                        case "bottom":
                            n.orientation.y = o[0];
                            break;
                        case "left":
                        case "right":
                            n.orientation.x = o[0]
                    } else a = e.grep(o, function(e) {
                        return /^left|right$/.test(e)
                    }), n.orientation.x = a[0] || "auto", a = e.grep(o, function(e) {
                        return /^top|bottom$/.test(e)
                    }), n.orientation.y = a[0] || "auto";
                    else;
            },
            _events: [],
            _secondaryEvents: [],
            _applyEvents: function(e) {
                for (var n, i, r, o = 0; o < e.length; o++) n = e[o][0], 2 == e[o].length ? (i = t, r = e[o][1]) : 3 == e[o].length && (i = e[o][1], r = e[o][2]), n.on(r, i)
            },
            _unapplyEvents: function(e) {
                for (var n, i, r = 0; r < e.length; r++) n = e[r][0], 2 == e[r].length ? (ch = t, i = e[r][1]) : 3 == e[r].length && (ch = e[r][1], i = e[r][2]), n.off(i, ch)
            },
            _buildEvents: function() {
                this.isInput ? this._events = [
                    [this.element, {
                        focus: e.proxy(this.show, this),
                        keyup: e.proxy(function(t) {
                            -1 === e.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                        }, this),
                        keydown: e.proxy(this.keydown, this)
                    }]
                ] : this.component && this.hasInput ? this._events = [
                    [this.element.find("input"), {
                        focus: e.proxy(this.show, this),
                        keyup: e.proxy(function(t) {
                            -1 === e.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                        }, this),
                        keydown: e.proxy(this.keydown, this)
                    }],
                    [this.component, {
                        click: e.proxy(this.show, this)
                    }]
                ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                    [this.element, {
                        click: e.proxy(this.show, this)
                    }]
                ], this._events.push([this.element, "*", {
                    blur: e.proxy(function(e) {
                        this._focused_from = e.target
                    }, this)
                }], [this.element, {
                    blur: e.proxy(function(e) {
                        this._focused_from = e.target
                    }, this)
                }]), this._secondaryEvents = [
                    [this.picker, {
                        click: e.proxy(this.click, this)
                    }],
                    [e(window), {
                        resize: e.proxy(this.place, this)
                    }],
                    [e(document), {
                        "mousedown touchstart": e.proxy(function(e) {
                            this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.hide()
                        }, this)
                    }]
                ]
            },
            _attachEvents: function() {
                this._detachEvents(), this._applyEvents(this._events)
            },
            _detachEvents: function() {
                this._unapplyEvents(this._events)
            },
            _attachSecondaryEvents: function() {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
            },
            _detachSecondaryEvents: function() {
                this._unapplyEvents(this._secondaryEvents)
            },
            _trigger: function(t, n) {
                var i = n || this.dates.get(-1),
                    r = this._utc_to_local(i);
                this.element.trigger({
                    type: t,
                    date: r,
                    dates: e.map(this.dates, this._utc_to_local),
                    format: e.proxy(function(e, t) {
                        0 === arguments.length ? (e = this.dates.length - 1, t = this.o.format) : "string" == typeof e && (t = e, e = this.dates.length - 1), t = t || this.o.format;
                        var n = this.dates.get(e);
                        return g.formatDate(n, t, this.o.language)
                    }, this)
                })
            },
            show: function() {
                this.isInline || this.picker.appendTo("body"), this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), this._attachSecondaryEvents(), this._trigger("show")
            },
            hide: function() {
                this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
            },
            remove: function() {
                this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
            },
            _utc_to_local: function(e) {
                return e && new Date(e.getTime() + 6e4 * e.getTimezoneOffset())
            },
            _local_to_utc: function(e) {
                return e && new Date(e.getTime() - 6e4 * e.getTimezoneOffset())
            },
            _zero_time: function(e) {
                return e && new Date(e.getFullYear(), e.getMonth(), e.getDate())
            },
            _zero_utc_time: function(e) {
                return e && new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()))
            },
            getDates: function() {
                return e.map(this.dates, this._utc_to_local)
            },
            getUTCDates: function() {
                return e.map(this.dates, function(e) {
                    return new Date(e)
                })
            },
            getDate: function() {
                return this._utc_to_local(this.getUTCDate())
            },
            getUTCDate: function() {
                return new Date(this.dates.get(-1))
            },
            setDates: function() {
                this.update.apply(this, arguments), this._trigger("changeDate"), this.setValue()
            },
            setUTCDates: function() {
                this.update.apply(this, e.map(arguments, this._utc_to_local)), this._trigger("changeDate"), this.setValue()
            },
            setDate: r("setDates"),
            setUTCDate: r("setUTCDates"),
            setValue: function() {
                var e = this.getFormattedDate();
                this.isInput ? this.element.val(e).change() : this.component && this.element.find("input").val(e).change()
            },
            getFormattedDate: function(n) {
                n === t && (n = this.o.format);
                var i = this.o.language;
                return e.map(this.dates, function(e) {
                    return g.formatDate(e, n, i)
                }).join(this.o.multidateSeparator)
            },
            setStartDate: function(e) {
                this._process_options({
                    startDate: e
                }), this.update(), this.updateNavArrows()
            },
            setEndDate: function(e) {
                this._process_options({
                    endDate: e
                }), this.update(), this.updateNavArrows()
            },
            setDaysOfWeekDisabled: function(e) {
                this._process_options({
                    daysOfWeekDisabled: e
                }), this.update(), this.updateNavArrows()
            },
            place: function() {
                if (!this.isInline) {
                    var t = this.picker.outerWidth(),
                        n = this.picker.outerHeight(),
                        i = 10,
                        r = s.width(),
                        o = s.height(),
                        a = s.scrollTop(),
                        l = parseInt(this.element.parents().filter(function() {
                            return "auto" != e(this).css("z-index")
                        }).first().css("z-index")) + 10,
                        u = this.component ? this.component.parent().offset() : this.element.offset(),
                        c = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                        d = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                        h = u.left,
                        p = u.top;
                    this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (h -= t - d)) : (this.picker.addClass("datepicker-orient-left"), u.left < 0 ? h -= u.left - i : u.left + t > r && (h = r - t - i));
                    var f, g, m = this.o.orientation.y;
                    "auto" === m && (f = -a + u.top - n, g = a + o - (u.top + c + n), m = Math.max(f, g) === g ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + m), "top" === m ? p += c : p -= n + parseInt(this.picker.css("padding-top")), this.picker.css({
                        top: p,
                        left: h,
                        zIndex: l
                    })
                }
            },
            _allow_update: !0,
            update: function() {
                if (this._allow_update) {
                    var t = this.dates.copy(),
                        n = [],
                        i = !1;
                    arguments.length ? (e.each(arguments, e.proxy(function(e, t) {
                        t instanceof Date && (t = this._local_to_utc(t)), n.push(t)
                    }, this)), i = !0) : (n = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), n = n && this.o.multidate ? n.split(this.o.multidateSeparator) : [n], delete this.element.data().date), n = e.map(n, e.proxy(function(e) {
                        return g.parseDate(e, this.o.format, this.o.language)
                    }, this)), n = e.grep(n, e.proxy(function(e) {
                        return e < this.o.startDate || e > this.o.endDate || !e
                    }, this), !0), this.dates.replace(n), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), i ? this.setValue() : n.length && String(t) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && t.length && this._trigger("clearDate"), this.fill()
                }
            },
            fillDow: function() {
                var e = this.o.weekStart,
                    t = "<tr>";
                if (this.o.calendarWeeks) {
                    var n = '<th class="cw">&nbsp;</th>';
                    t += n, this.picker.find(".datepicker-days thead tr:first-child").prepend(n)
                }
                for (; e < this.o.weekStart + 7;) t += '<th class="dow">' + f[this.o.language].daysMin[e++ % 7] + "</th>";
                t += "</tr>", this.picker.find(".datepicker-days thead").append(t)
            },
            fillMonths: function() {
                for (var e = "", t = 0; 12 > t;) e += '<span class="month">' + f[this.o.language].monthsShort[t++] + "</span>";
                this.picker.find(".datepicker-months td").html(e)
            },
            setRange: function(t) {
                t && t.length ? this.range = e.map(t, function(e) {
                    return e.valueOf()
                }) : delete this.range, this.fill()
            },
            getClassNames: function(t) {
                var n = [],
                    i = this.viewDate.getUTCFullYear(),
                    r = this.viewDate.getUTCMonth(),
                    o = new Date;
                return t.getUTCFullYear() < i || t.getUTCFullYear() == i && t.getUTCMonth() < r ? n.push("old") : (t.getUTCFullYear() > i || t.getUTCFullYear() == i && t.getUTCMonth() > r) && n.push("new"), this.focusDate && t.valueOf() === this.focusDate.valueOf() && n.push("focused"), this.o.todayHighlight && t.getUTCFullYear() == o.getFullYear() && t.getUTCMonth() == o.getMonth() && t.getUTCDate() == o.getDate() && n.push("today"), -1 !== this.dates.contains(t) && n.push("active"), (t.valueOf() < this.o.startDate || t.valueOf() > this.o.endDate || -1 !== e.inArray(t.getUTCDay(), this.o.daysOfWeekDisabled)) && n.push("disabled"), this.range && (t > this.range[0] && t < this.range[this.range.length - 1] && n.push("range"), -1 != e.inArray(t.valueOf(), this.range) && n.push("selected")), n
            },
            fill: function() {
                var i, r = new Date(this.viewDate),
                    o = r.getUTCFullYear(),
                    a = r.getUTCMonth(),
                    s = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                    l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                    u = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    c = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0;
                this.picker.find(".datepicker-days thead th.datepicker-switch").text(f[this.o.language].months[a] + " " + o), this.picker.find("tfoot th.today").text(f[this.o.language].today).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(f[this.o.language].clear).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
                var d = n(o, a - 1, 28),
                    h = g.getDaysInMonth(d.getUTCFullYear(), d.getUTCMonth());
                d.setUTCDate(h), d.setUTCDate(h - (d.getUTCDay() - this.o.weekStart + 7) % 7);
                var p = new Date(d);
                p.setUTCDate(p.getUTCDate() + 42), p = p.valueOf();
                for (var m, v = []; d.valueOf() < p;) {
                    if (d.getUTCDay() == this.o.weekStart && (v.push("<tr>"), this.o.calendarWeeks)) {
                        var y = new Date(+d + (this.o.weekStart - d.getUTCDay() - 7) % 7 * 864e5),
                            b = new Date(+y + (11 - y.getUTCDay()) % 7 * 864e5),
                            w = new Date(+(w = n(b.getUTCFullYear(), 0, 1)) + (11 - w.getUTCDay()) % 7 * 864e5),
                            x = (b - w) / 864e5 / 7 + 1;
                        v.push('<td class="cw">' + x + "</td>")
                    }
                    if (m = this.getClassNames(d), m.push("day"), this.o.beforeShowDay !== e.noop) {
                        var E = this.o.beforeShowDay(this._utc_to_local(d));
                        E === t ? E = {} : "boolean" == typeof E ? E = {
                            enabled: E
                        } : "string" == typeof E && (E = {
                            classes: E
                        }), E.enabled === !1 && m.push("disabled"), E.classes && (m = m.concat(E.classes.split(/\s+/))), E.tooltip && (i = E.tooltip)
                    }
                    m = e.unique(m), v.push('<td class="' + m.join(" ") + '"' + (i ? ' title="' + i + '"' : "") + ">" + d.getUTCDate() + "</td>"), d.getUTCDay() == this.o.weekEnd && v.push("</tr>"), d.setUTCDate(d.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(v.join(""));
                var T = this.picker.find(".datepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");
                e.each(this.dates, function(e, t) {
                    t.getUTCFullYear() == o && T.eq(t.getUTCMonth()).addClass("active")
                }), (s > o || o > u) && T.addClass("disabled"), o == s && T.slice(0, l).addClass("disabled"), o == u && T.slice(c + 1).addClass("disabled"), v = "", o = 10 * parseInt(o / 10, 10);
                var k = this.picker.find(".datepicker-years").find("th:eq(1)").text(o + "-" + (o + 9)).end().find("td");
                o -= 1;
                for (var _, D = e.map(this.dates, function(e) {
                    return e.getUTCFullYear()
                }), C = -1; 11 > C; C++) _ = ["year"], -1 === C ? _.push("old") : 10 === C && _.push("new"), -1 !== e.inArray(o, D) && _.push("active"), (s > o || o > u) && _.push("disabled"), v += '<span class="' + _.join(" ") + '">' + o + "</span>", o += 1;
                k.html(v)
            },
            updateNavArrows: function() {
                if (this._allow_update) {
                    var e = new Date(this.viewDate),
                        t = e.getUTCFullYear(),
                        n = e.getUTCMonth();
                    switch (this.viewMode) {
                        case 0:
                            this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && t <= this.o.startDate.getUTCFullYear() && n <= this.o.startDate.getUTCMonth() ? {
                                visibility: "hidden"
                            } : {
                                visibility: "visible"
                            }), this.picker.find(".next").css(1 / 0 !== this.o.endDate && t >= this.o.endDate.getUTCFullYear() && n >= this.o.endDate.getUTCMonth() ? {
                                visibility: "hidden"
                            } : {
                                visibility: "visible"
                            });
                            break;
                        case 1:
                        case 2:
                            this.picker.find(".prev").css(this.o.startDate !== -1 / 0 && t <= this.o.startDate.getUTCFullYear() ? {
                                visibility: "hidden"
                            } : {
                                visibility: "visible"
                            }), this.picker.find(".next").css(1 / 0 !== this.o.endDate && t >= this.o.endDate.getUTCFullYear() ? {
                                visibility: "hidden"
                            } : {
                                visibility: "visible"
                            })
                    }
                }
            },
            click: function(t) {
                t.preventDefault();
                var i, r, o, a = e(t.target).closest("span, td, th");
                if (1 == a.length) switch (a[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (a[0].className) {
                            case "datepicker-switch":
                                this.showMode(1);
                                break;
                            case "prev":
                            case "next":
                                var s = g.modes[this.viewMode].navStep * ("prev" == a[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, s), this._trigger("changeMonth", this.viewDate);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, s), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                                }
                                this.fill();
                                break;
                            case "today":
                                var l = new Date;
                                l = n(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0), this.showMode(-2);
                                var u = "linked" == this.o.todayBtn ? null : "view";
                                this._setDate(l, u);
                                break;
                            case "clear":
                                var c;
                                this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && c.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
                        }
                        break;
                    case "span":
                        a.is(".disabled") || (this.viewDate.setUTCDate(1), a.is(".month") ? (o = 1, r = a.parent().find("span").index(a), i = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(r), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(n(i, r, o))) : (o = 1, r = 0, i = parseInt(a.text(), 10) || 0, this.viewDate.setUTCFullYear(i), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(n(i, r, o))), this.showMode(-1), this.fill());
                        break;
                    case "td":
                        a.is(".day") && !a.is(".disabled") && (o = parseInt(a.text(), 10) || 1, i = this.viewDate.getUTCFullYear(), r = this.viewDate.getUTCMonth(), a.is(".old") ? 0 === r ? (r = 11, i -= 1) : r -= 1 : a.is(".new") && (11 == r ? (r = 0, i += 1) : r += 1), this._setDate(n(i, r, o)))
                }
                this.picker.is(":visible") && this._focused_from && e(this._focused_from).focus(), delete this._focused_from
            },
            _toggle_multidate: function(e) {
                var t = this.dates.contains(e);
                if (e ? -1 !== t ? this.dates.remove(t) : this.dates.push(e) : this.dates.clear(), "number" == typeof this.o.multidate)
                    for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
            },
            _setDate: function(e, t) {
                t && "date" != t || this._toggle_multidate(e && new Date(e)), t && "view" != t || (this.viewDate = e && new Date(e)), this.fill(), this.setValue(), this._trigger("changeDate");
                var n;
                this.isInput ? n = this.element : this.component && (n = this.element.find("input")), n && n.change(), !this.o.autoclose || t && "date" != t || this.hide()
            },
            moveMonth: function(e, n) {
                if (!e) return t;
                if (!n) return e;
                var i, r, o = new Date(e.valueOf()),
                    a = o.getUTCDate(),
                    s = o.getUTCMonth(),
                    l = Math.abs(n);
                if (n = n > 0 ? 1 : -1, 1 == l) r = -1 == n ? function() {
                    return o.getUTCMonth() == s
                } : function() {
                    return o.getUTCMonth() != i
                }, i = s + n, o.setUTCMonth(i), (0 > i || i > 11) && (i = (i + 12) % 12);
                else {
                    for (var u = 0; l > u; u++) o = this.moveMonth(o, n);
                    i = o.getUTCMonth(), o.setUTCDate(a), r = function() {
                        return i != o.getUTCMonth()
                    }
                }
                for (; r();) o.setUTCDate(--a), o.setUTCMonth(i);
                return o
            },
            moveYear: function(e, t) {
                return this.moveMonth(e, 12 * t)
            },
            dateWithinRange: function(e) {
                return e >= this.o.startDate && e <= this.o.endDate
            },
            keydown: function(e) {
                if (this.picker.is(":not(:visible)")) return void(27 == e.keyCode && this.show());
                var t, n, r, o = !1,
                    a = this.focusDate || this.viewDate;
                switch (e.keyCode) {
                    case 27:
                        this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), e.preventDefault();
                        break;
                    case 37:
                    case 39:
                        if (!this.o.keyboardNavigation) break;
                        t = 37 == e.keyCode ? -1 : 1, e.ctrlKey ? (n = this.moveYear(this.dates.get(-1) || i(), t), r = this.moveYear(a, t), this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (n = this.moveMonth(this.dates.get(-1) || i(), t), r = this.moveMonth(a, t), this._trigger("changeMonth", this.viewDate)) : (n = new Date(this.dates.get(-1) || i()), n.setUTCDate(n.getUTCDate() + t), r = new Date(a), r.setUTCDate(a.getUTCDate() + t)), this.dateWithinRange(n) && (this.focusDate = this.viewDate = r, this.setValue(), this.fill(), e.preventDefault());
                        break;
                    case 38:
                    case 40:
                        if (!this.o.keyboardNavigation) break;
                        t = 38 == e.keyCode ? -1 : 1, e.ctrlKey ? (n = this.moveYear(this.dates.get(-1) || i(), t), r = this.moveYear(a, t), this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (n = this.moveMonth(this.dates.get(-1) || i(), t), r = this.moveMonth(a, t), this._trigger("changeMonth", this.viewDate)) : (n = new Date(this.dates.get(-1) || i()), n.setUTCDate(n.getUTCDate() + 7 * t), r = new Date(a), r.setUTCDate(a.getUTCDate() + 7 * t)), this.dateWithinRange(n) && (this.focusDate = this.viewDate = r, this.setValue(), this.fill(), e.preventDefault());
                        break;
                    case 32:
                        a = this.focusDate || this.dates.get(-1) || this.viewDate, this._toggle_multidate(a), o = !0, this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), e.preventDefault();
                        break;
                    case 13:
                        this.focusDate && (this._toggle_multidate(this.focusDate), o = !0, this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill()), this.hide(), e.preventDefault();
                        break;
                    case 9:
                        this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                }
                if (o) {
                    this._trigger(this.dates.length ? "changeDate" : "clearDate");
                    var s;
                    this.isInput ? s = this.element : this.component && (s = this.element.find("input")), s && s.change()
                }
            },
            showMode: function(e) {
                e && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + e))), this.picker.find(">div").hide().filter(".datepicker-" + g.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
            }
        };
        var c = function(t, n) {
            this.element = e(t), this.inputs = e.map(n.inputs, function(e) {
                return e.jquery ? e[0] : e
            }), delete n.inputs, e(this.inputs).datepicker(n).bind("changeDate", e.proxy(this.dateUpdated, this)), this.pickers = e.map(this.inputs, function(t) {
                return e(t).data("datepicker")
            }), this.updateDates()
        };
        c.prototype = {
            updateDates: function() {
                this.dates = e.map(this.pickers, function(e) {
                    return e.getUTCDate()
                }), this.updateRanges()
            },
            updateRanges: function() {
                var t = e.map(this.dates, function(e) {
                    return e.valueOf()
                });
                e.each(this.pickers, function(e, n) {
                    n.setRange(t)
                })
            },
            dateUpdated: function(t) {
                if (!this.updating) {
                    this.updating = !0;
                    var n = e(t.target).data("datepicker"),
                        i = n.getUTCDate(),
                        r = e.inArray(t.target, this.inputs),
                        o = this.inputs.length;
                    if (-1 != r) {
                        if (e.each(this.pickers, function(e, t) {
                            t.getUTCDate() || t.setUTCDate(i)
                        }), i < this.dates[r])
                            for (; r >= 0 && i < this.dates[r];) this.pickers[r--].setUTCDate(i);
                        else if (i > this.dates[r])
                            for (; o > r && i > this.dates[r];) this.pickers[r++].setUTCDate(i);
                        this.updateDates(), delete this.updating
                    }
                }
            },
            remove: function() {
                e.map(this.pickers, function(e) {
                    e.remove()
                }), delete this.element.data().datepicker
            }
        };
        var d = e.fn.datepicker;
        e.fn.datepicker = function(n) {
            var i = Array.apply(null, arguments);
            i.shift();
            var r;
            return this.each(function() {
                var s = e(this),
                    l = s.data("datepicker"),
                    d = "object" == typeof n && n;
                if (!l) {
                    var p = o(this, "date"),
                        f = e.extend({}, h, p, d),
                        g = a(f.language),
                        m = e.extend({}, h, g, p, d);
                    if (s.is(".input-daterange") || m.inputs) {
                        var v = {
                            inputs: m.inputs || s.find("input").toArray()
                        };
                        s.data("datepicker", l = new c(this, e.extend(m, v)))
                    } else s.data("datepicker", l = new u(this, m))
                }
                return "string" == typeof n && "function" == typeof l[n] && (r = l[n].apply(l, i), r !== t) ? !1 : void 0
            }), r !== t ? r : this
        };
        var h = e.fn.datepicker.defaults = {
                autoclose: !1,
                beforeShowDay: e.noop,
                calendarWeeks: !1,
                clearBtn: !1,
                daysOfWeekDisabled: [],
                endDate: 1 / 0,
                forceParse: !0,
                format: "mm/dd/yyyy",
                keyboardNavigation: !0,
                language: "en",
                minViewMode: 0,
                multidate: !1,
                multidateSeparator: ",",
                orientation: "auto",
                rtl: !1,
                startDate: -1 / 0,
                startView: 0,
                todayBtn: !1,
                todayHighlight: !1,
                weekStart: 0
            },
            p = e.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
        e.fn.datepicker.Constructor = u;
        var f = e.fn.datepicker.dates = {
                en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    today: "Today",
                    clear: "Clear"
                }
            },
            g = {
                modes: [{
                    clsName: "days",
                    navFnc: "Month",
                    navStep: 1
                }, {
                    clsName: "months",
                    navFnc: "FullYear",
                    navStep: 1
                }, {
                    clsName: "years",
                    navFnc: "FullYear",
                    navStep: 10
                }],
                isLeapYear: function(e) {
                    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
                },
                getDaysInMonth: function(e, t) {
                    return [31, g.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
                },
                validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
                parseFormat: function(e) {
                    var t = e.replace(this.validParts, "\x00").split("\x00"),
                        n = e.match(this.validParts);
                    if (!t || !t.length || !n || 0 === n.length) throw new Error("Invalid date format.");
                    return {
                        separators: t,
                        parts: n
                    }
                },
                parseDate: function(i, r, o) {
                    if (!i) return t;
                    if (i instanceof Date) return i;
                    if ("string" == typeof r && (r = g.parseFormat(r)), /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(i)) {
                        var a, s, l = /([\-+]\d+)([dmwy])/,
                            c = i.match(/([\-+]\d+)([dmwy])/g);
                        i = new Date;
                        for (var d = 0; d < c.length; d++) switch (a = l.exec(c[d]), s = parseInt(a[1]), a[2]) {
                            case "d":
                                i.setUTCDate(i.getUTCDate() + s);
                                break;
                            case "m":
                                i = u.prototype.moveMonth.call(u.prototype, i, s);
                                break;
                            case "w":
                                i.setUTCDate(i.getUTCDate() + 7 * s);
                                break;
                            case "y":
                                i = u.prototype.moveYear.call(u.prototype, i, s)
                        }
                        return n(i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate(), 0, 0, 0)
                    }
                    var h, p, a, c = i && i.match(this.nonpunctuation) || [],
                        i = new Date,
                        m = {},
                        v = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                        y = {
                            yyyy: function(e, t) {
                                return e.setUTCFullYear(t)
                            },
                            yy: function(e, t) {
                                return e.setUTCFullYear(2e3 + t)
                            },
                            m: function(e, t) {
                                if (isNaN(e)) return e;
                                for (t -= 1; 0 > t;) t += 12;
                                for (t %= 12, e.setUTCMonth(t); e.getUTCMonth() != t;) e.setUTCDate(e.getUTCDate() - 1);
                                return e
                            },
                            d: function(e, t) {
                                return e.setUTCDate(t)
                            }
                        };
                    y.M = y.MM = y.mm = y.m, y.dd = y.d, i = n(i.getFullYear(), i.getMonth(), i.getDate(), 0, 0, 0);
                    var b = r.parts.slice();
                    if (c.length != b.length && (b = e(b).filter(function(t, n) {
                        return -1 !== e.inArray(n, v)
                    }).toArray()), c.length == b.length) {
                        for (var d = 0, w = b.length; w > d; d++) {
                            if (h = parseInt(c[d], 10), a = b[d], isNaN(h)) switch (a) {
                                case "MM":
                                    p = e(f[o].months).filter(function() {
                                        var e = this.slice(0, c[d].length),
                                            t = c[d].slice(0, e.length);
                                        return e == t
                                    }), h = e.inArray(p[0], f[o].months) + 1;
                                    break;
                                case "M":
                                    p = e(f[o].monthsShort).filter(function() {
                                        var e = this.slice(0, c[d].length),
                                            t = c[d].slice(0, e.length);
                                        return e == t
                                    }), h = e.inArray(p[0], f[o].monthsShort) + 1
                            }
                            m[a] = h
                        }
                        for (var x, E, d = 0; d < v.length; d++) E = v[d], E in m && !isNaN(m[E]) && (x = new Date(i), y[E](x, m[E]), isNaN(x) || (i = x))
                    }
                    return i
                },
                formatDate: function(t, n, i) {
                    if (!t) return "";
                    "string" == typeof n && (n = g.parseFormat(n));
                    var r = {
                        d: t.getUTCDate(),
                        D: f[i].daysShort[t.getUTCDay()],
                        DD: f[i].days[t.getUTCDay()],
                        m: t.getUTCMonth() + 1,
                        M: f[i].monthsShort[t.getUTCMonth()],
                        MM: f[i].months[t.getUTCMonth()],
                        yy: t.getUTCFullYear().toString().substring(2),
                        yyyy: t.getUTCFullYear()
                    };
                    r.dd = (r.d < 10 ? "0" : "") + r.d, r.mm = (r.m < 10 ? "0" : "") + r.m;
                    for (var t = [], o = e.extend([], n.separators), a = 0, s = n.parts.length; s >= a; a++) o.length && t.push(o.shift()), t.push(r[n.parts[a]]);
                    return t.join("")
                },
                headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
                contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
            };
        g.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + g.headTemplate + "<tbody></tbody>" + g.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + g.headTemplate + g.contTemplate + g.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + g.headTemplate + g.contTemplate + g.footTemplate + "</table></div></div>", e.fn.datepicker.DPGlobal = g, e.fn.datepicker.noConflict = function() {
            return e.fn.datepicker = d, this
        }, e(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(t) {
            var n = e(this);
            n.data("datepicker") || (t.preventDefault(), n.datepicker("show"))
        }), e(function() {
            e('[data-provide="datepicker-inline"]').datepicker()
        })
    }(window.jQuery), define("enketo-widget/date/bootstrap3-datepicker/js/bootstrap-datepicker", function() {}), define("enketo-widget/date/datepicker-extended", ["enketo-js/Widget", "Modernizr", "jquery", "enketo-widget/date/bootstrap3-datepicker/js/bootstrap-datepicker"], function(e, t, n) {
        function i(t, n) {
            this.namespace = r, e.call(this, t, n), this._init()
        }
        var r = "datepickerExtended";
        i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.prototype._init = function() {
            var e = this,
                t = n(this.element).parent("label"),
                i = t.hasClass("or-appearance-year") ? {
                    format: "yyyy",
                    startView: "decade",
                    minViewMode: "years"
                } : t.hasClass("or-appearance-month-year") ? {
                    format: "yyyy-mm",
                    startView: "year",
                    minViewMode: "months"
                } : {
                    format: "yyyy-mm-dd",
                    startView: "month",
                    minViewMode: "day"
                },
                r = this._createFakeDateInput(i.format);
            this._setManualHandler(r), this._setFocusHandler(r), this._setResetHandler(r), console.log("setting picker with settings:", i), r.datepicker({
                format: i.format,
                autoclose: !0,
                todayHighlight: !0,
                startView: i.startView,
                minViewMode: i.minViewMode,
                orientation: "top"
            }).on("changeDate", function() {
                var t = n(this).val();
                console.log("unchanged value", t), "decade" === i.startView && 4 === t.length ? t += "-01-01" : "year" === i.startView && t.length < 8 && (t += "-01"), console.log("datepicker date changed to", t), n(e.element).val(t).trigger("change").blur()
            })
        }, i.prototype._createFakeDateInput = function(e) {
            var t = n(this.element),
                i = n('<div class="widget date"><input class="ignore input-small" readonly="readonly" type="text" value="' + t.val() + '" placeholder="' + e + '" /><button class="btn-reset"><i class="glyphicon glyphicon-refresh"> </i></button></div>'),
                r = i.find("input");
            return t.hide().after(i), r
        }, i.prototype._setManualHandler = function() {}, i.prototype._setResetHandler = function(e) {
            e.next(".btn-reset").on("click", function() {
                e.val("").trigger("changeDate").datepicker("update")
            })
        }, i.prototype._setFocusHandler = function(e) {
            var t = this;
            e.on("focus blur", function(e) {
                n(t.element).trigger("fake" + e.type)
            })
        }, n.fn[r] = function(e, o) {
            return e = e || {}, this.each(function() {
                var a = n(this),
                    s = a.data(r),
                    l = /GT-P31[0-9]{2}.+AppleWebKit\/534\.30/;
                s || "object" != typeof e || e.touch && t.inputtypes.date && !l.test(navigator.userAgent) ? s && "string" == typeof e && s[e](this) : a.data(r, s = new i(this, e, o))
            })
        }
    }), define("enketo-widget/datetime/datetimepicker-extended", ["enketo-js/Widget", "Modernizr", "jquery", "enketo-js/extend", "enketo-widget/date/bootstrap3-datepicker/js/bootstrap-datepicker", "enketo-widget/time/bootstrap3-timepicker/js/bootstrap-timepicker"], function(e, t, n) {
        function i(t, n) {
            this.namespace = r, e.call(this, t, n), this._init()
        }
        var r = "datetimepickerExtended";
        i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.prototype._init = function() {
            function e() {
                if (s.val().length > 0 && l.val().length > 0) {
                    var e = s.val().split("-"),
                        n = l.val().split(":");
                    t.val(new Date(e[0], e[1] - 1, e[2], n[0], n[1]).toISOLocalString()).trigger("change").blur()
                } else t.val("").trigger("change").blur()
            }
            var t = n(this.element),
                i = t.val().length > 0 ? new Date(t.val()).toISOLocalString() : "",
                r = i.split("T"),
                o = r[0],
                a = r[1] && r[1].length > 4 ? r[1].substring(0, 5) : "",
                s = this._createFakeDateInput(o),
                l = this._createFakeTimeInput(a);
            t.hide().after('<div class="datetimepicker widget" />'), t.siblings(".datetimepicker").append(s.closest(".date")).append(l.closest(".bootstrap-timepicker")), s.datepicker({
                format: "yyyy-mm-dd",
                autoclose: !0,
                todayHighlight: !0
            }), l.timepicker({
                defaultTime: a.length > 0 ? "value" : "current",
                showMeridian: !1
            }).val(a).closest(".widget").find("input").addClass("ignore"), this._setManualHandler(s), this._setFocusHandler(s.add(l)), s.on("change changeDate", function() {
                return e(), !1
            }), l.on("change", function() {
                return e(), !1
            }), l.next(".btn-reset").on("click", function() {
                s.val("").trigger("change").datepicker("update"), l.val("").trigger("change")
            })
        }, i.prototype._createFakeDateInput = function(e) {
            var t = (n(this.element), n('<div class="date"><input class="ignore input-small" type="text" readonly="readonly" value="' + e + '" placeholder="yyyy-mm-dd"/></div>')),
                i = t.find("input");
            return i
        }, i.prototype._createFakeTimeInput = function(e) {
            var t = (n(this.element), n('<div class="bootstrap-timepicker"><input class="ignore timepicker-default input-small" readonly="readonly" type="text" value="' + e + '" placeholder="hh:mm"/><button class="btn-reset"><i class="glyphicon glyphicon-refresh"> </i></button></div>')),
                i = t.find("input");
            return i
        }, i.prototype._setManualHandler = function() {}, i.prototype._setFocusHandler = function(e) {
            var t = this;
            e.on("focus blur", function(e) {
                n(t.element).trigger("fake" + e.type)
            })
        }, n.fn[r] = function(e, o) {
            return e = e || {}, this.each(function() {
                var a = n(this),
                    s = a.data(r),
                    l = /GT-P31[0-9]{2}.+AppleWebKit\/534\.30/;
                s || "object" != typeof e || e.touch && t.inputtypes.datetime && !l.test(navigator.userAgent) ? s && "string" == typeof e && s[e](this) : a.data(r, s = new i(this, e, o))
            })
        }
    }), define("enketo-widget/mediagrid/mediagridpicker", function() {}), define("enketo-widget/select-likert/likertitem", function() {}), define("text!enketo-widget/note/config.json", [], function() {
        return '{\n    "name": "notewidget",\n    "stylesheet": "note.scss",\n    "selector": ".note, .trigger",\n    "options": {}\n}\n'
    }), define("text!enketo-widget/select-mobile/config.json", [], function() {
        return '{\n	"name": "mobileSelectpicker",\n	"stylesheet": "selectpicker.scss",\n	"selector": "select[multiple]",\n	"options": {}\n}'
    }), define("text!enketo-widget/table/config.json", [], function() {
        return '{\n	"name": "tablewidget",\n	"stylesheet": "tablewidget.scss",\n	"selector": "*:first",\n	"options": {}\n}'
    }), define("text!enketo-widget/radio/config.json", [], function() {
        return '{\n	"name": "radiopicker",\n	"stylesheet": "radiopicker.scss",\n	"selector": null,\n	"options": {}\n}'
    }), define("text!enketo-widget/time/config.json", [], function() {
        return '{\n    "name": "timepickerExtended",\n    "stylesheet": "timepicker-extended.scss",\n    "selector": "input[type=\\"time\\"]:not([readonly])",\n    "options": {}\n}\n'
    }), define("text!enketo-widget/date/config.json", [], function() {
        return '{\n    "name": "datepickerExtended",\n    "stylesheet": "datepicker-extended.scss",\n    "selector": "input[type=\\"date\\"]:not([readonly])",\n    "options": {}\n}\n'
    }), define("text!enketo-widget/datetime/config.json", [], function() {
        return '{\n    "name": "datetimepickerExtended",\n    "stylesheet": "datetimepicker-extended.scss",\n    "selector": "input[type=\\"datetime\\"]:not([readonly])",\n    "options": {}\n}\n'
    }), define("text!enketo-widget/mediagrid/config.json", [], function() {
        return '{\n    "name": null,\n    "stylesheet": "mediagridpicker.scss",\n    "selector": null,\n    "options": {}\n}\n'
    }), define("text!enketo-widget/select-likert/config.json", [], function() {
        return '{\n    "name": null,\n    "stylesheet": "likertitem.scss",\n    "selector": null,\n    "options": {}\n}\n'
    });