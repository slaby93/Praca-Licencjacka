if (function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        for (;(cur = cur[dir]) && 1 !== cur.nodeType; ) ;
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), 
        jQuery.ready();
    }
    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = jQuery.expando + Data.uid++;
    }
    function dataAttr(elem, key, data) {
        var name;
        if (void 0 === data && 1 === elem.nodeType) if (name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase(), 
        data = elem.getAttribute(name), "string" == typeof data) {
            try {
                data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
            } catch (e) {}
            data_user.set(elem, key, data);
        } else data = void 0;
        return data;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var i = 0, l = elems.length; l > i; i++) data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (1 === dest.nodeType) {
            if (data_priv.hasData(src) && (pdataOld = data_priv.access(src), pdataCur = data_priv.set(dest, pdataOld), 
            events = pdataOld.events)) {
                delete pdataCur.handle, pdataCur.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            data_user.hasData(src) && (udataOld = data_user.access(src), udataCur = jQuery.extend({}, udataOld), 
            data_user.set(dest, udataCur));
        }
    }
    function getAll(context, tag) {
        var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), 
        iframe.detach()), elemdisplay[nodeName] = display), display;
    }
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), computed && (ret = computed.getPropertyValue(name) || computed[name]), 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 !== ret ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name[0].toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = data_priv.get(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        "none" === display && hidden || data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = data_priv.access(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                data_priv.remove(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView;
    }
    var arr = [], slice = arr.slice, concat = arr.concat, push = arr.push, indexOf = arr.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, document = window.document, version = "2.1.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray,
        isWindow: function(obj) {
            return null != obj && obj === obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isPlainObject: function(obj) {
            return "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj) ? !1 : obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ? !1 : !0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), 
            script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code));
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; j++) first[i++] = second[j];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], nodeType = context.nodeType, 
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, parent = doc.defaultView, parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            documentIsHTML = !isXML(doc), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
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
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, len = this.length, ret = [], self = this;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, 
            this[0] = elem), this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem);
            }
            return matched;
        },
        sibling: function(n, elem) {
            for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
            return matched;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
                for (var i = 0; l > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return elem.contentDocument || jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), 
            this.length > 1 && (guaranteedUnique[name] || jQuery.unique(matched), rparentsprev.test(name) && matched.reverse()), 
            this.pushStack(matched);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))));
        }
    }), jQuery.ready.promise = function(obj) {
        return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1))), readyList.promise(obj);
    }, jQuery.ready.promise();
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;len > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    };
    jQuery.acceptData = function(owner) {
        return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType;
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(owner) {
            if (!Data.accepts(owner)) return 0;
            var descriptor = {}, unlock = owner[this.expando];
            if (!unlock) {
                unlock = Data.uid++;
                try {
                    descriptor[this.expando] = {
                        value: unlock
                    }, Object.defineProperties(owner, descriptor);
                } catch (e) {
                    descriptor[this.expando] = unlock, jQuery.extend(owner, descriptor);
                }
            }
            return this.cache[unlock] || (this.cache[unlock] = {}), unlock;
        },
        set: function(owner, data, value) {
            var prop, unlock = this.key(owner), cache = this.cache[unlock];
            if ("string" == typeof data) cache[data] = value; else if (jQuery.isEmptyObject(cache)) jQuery.extend(this.cache[unlock], data); else for (prop in data) cache[prop] = data[prop];
            return cache;
        },
        get: function(owner, key) {
            var cache = this.cache[this.key(owner)];
            return void 0 === key ? cache : cache[key];
        },
        access: function(owner, key, value) {
            var stored;
            return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), 
            void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), 
            void 0 !== value ? value : key);
        },
        remove: function(owner, key) {
            var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
            if (void 0 === key) this.cache[unlock] = {}; else {
                jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), 
                key in cache ? name = [ key, camel ] : (name = camel, name = name in cache ? [ name ] : name.match(rnotwhite) || [])), 
                i = name.length;
                for (;i--; ) delete cache[name[i]];
            }
        },
        hasData: function(owner) {
            return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
        },
        discard: function(owner) {
            owner[this.expando] && delete this.cache[owner[this.expando]];
        }
    };
    var data_priv = new Data(), data_user = new Data(), rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(elem) {
            return data_user.hasData(elem) || data_priv.hasData(elem);
        },
        data: function(elem, name, data) {
            return data_user.access(elem, name, data);
        },
        removeData: function(elem, name) {
            data_user.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return data_priv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            data_priv.remove(elem, name);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = data_user.get(elem), 1 === elem.nodeType && !data_priv.get(elem, "hasDataAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    data_priv.set(elem, "hasDataAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                data_user.set(this, key);
            }) : access(this, function(value) {
                var data, camelKey = jQuery.camelCase(key);
                if (elem && void 0 === value) {
                    if (data = data_user.get(elem, key), void 0 !== data) return data;
                    if (data = data_user.get(elem, camelKey), void 0 !== data) return data;
                    if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data;
                } else this.each(function() {
                    var data = data_user.get(this, camelKey);
                    data_user.set(this, camelKey, value), -1 !== key.indexOf("-") && void 0 !== data && data_user.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, !0);
        },
        removeData: function(key) {
            return this.each(function() {
                data_user.remove(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = data_priv.get(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = data_priv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return data_priv.get(elem, key) || data_priv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(elem, [ type + "queue", key ]);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = data_priv.get(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), 
        div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue;
    }();
    var strundefined = "undefined";
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
            if (elemData) for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, 
            selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), 
            (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            }), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
            type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
            type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
            }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
            special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle, !1)), 
            special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
            selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
            jQuery.event.global[type] = !0);
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, data_priv.remove(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !jQuery.acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], 
                tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, 
                tmp && (elem[ontype] = tmp)), event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (data_priv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur !== this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== safeActiveElement() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && jQuery.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), data_priv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = data_priv.access(doc, fix) - 1;
                attaches ? data_priv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                data_priv.remove(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(!0), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0, l = srcElements.length; l > i; i++) fixInput(srcElements[i], destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0, l = srcElements.length; l > i; i++) cloneCopyEvent(srcElements[i], destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = "";
            } else nodes.push(context.createTextNode(elem));
            for (fragment.textContent = "", i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return fragment;
        },
        cleanData: function(elems) {
            for (var data, elem, type, key, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++) {
                if (jQuery.acceptData(elem) && (key = elem[data_priv.expando], key && (data = data_priv.cache[key]))) {
                    if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    data_priv.cache[key] && delete data_priv.cache[key];
                }
                delete data_user.cache[elem[data_user.expando]];
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = value);
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
            elem.textContent = "");
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")));
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {}, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
    };
    !function() {
        function computePixelPositionAndBoxSizingReliable() {
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            div.innerHTML = "", docElem.appendChild(container);
            var divStyle = window.getComputedStyle(div, null);
            pixelPositionVal = "1%" !== divStyle.top, boxSizingReliableVal = "4px" === divStyle.width, 
            docElem.removeChild(container);
        }
        var pixelPositionVal, boxSizingReliableVal, docElem = document.documentElement, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
        container.appendChild(div), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return computePixelPositionAndBoxSizingReliable(), pixelPositionVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computePixelPositionAndBoxSizingReliable(), 
                boxSizingReliableVal;
            },
            reliableMarginRight: function() {
                var ret, marginDiv = div.appendChild(document.createElement("div"));
                return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
                docElem.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight), 
                docElem.removeChild(container), div.removeChild(marginDiv), ret;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
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
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, 
                "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), 
                void 0);
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || data_priv.get(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = data_priv.get(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = data_priv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.value = "t", input.type = "radio", support.radioValue = "t" === input.value;
    }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.parentNode && parent.parentNode.selectedIndex, null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, proceed = 0 === arguments.length || "string" == typeof value && value, i = 0, len = this.length;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && data_priv.set(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : data_priv.get(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(option.value, values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/;
    jQuery.parseJSON = function(data) {
        return JSON.parse(data + "");
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml");
        } catch (e) {
            xml = void 0;
        }
        return (!xml || xml.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), ajaxLocation = window.location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
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
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), 
            wrap.map(function() {
                for (var elem = this; elem.firstElementChild; ) elem = elem.firstElementChild;
                return elem;
            }).append(this)), this);
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var xhrId = 0, xhrCallbacks = {}, xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key]();
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, 
    jQuery.ajaxTransport(function(options) {
        var callback;
        return support.cors || xhrSupported && !options.crossDomain ? {
            send: function(headers, complete) {
                var i, xhr = options.xhr(), id = ++xhrId;
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function(type) {
                    return function() {
                        callback && (delete xhrCallbacks[id], callback = xhr.onload = xhr.onerror = null, 
                        "abort" === type ? xhr.abort() : "error" === type ? complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "string" == typeof xhr.responseText ? {
                            text: xhr.responseText
                        } : void 0, xhr.getAllResponseHeaders()));
                    };
                }, xhr.onload = callback(), xhr.onerror = callback("error"), callback = xhrCallbacks[id] = callback("abort");
                try {
                    xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                    if (callback) throw e;
                }
            },
            abort: function() {
                callback && callback();
            }
        } : void 0;
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET");
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        async: !0,
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type);
                    }), document.head.appendChild(script[0]);
                },
                abort: function() {
                    callback && callback();
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, elem = this[0], box = {
                top: 0,
                left: 0
            }, doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? window.pageXOffset : val, top ? val : window.pageYOffset) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function(S, X, u) {
    "use strict";
    function G(a) {
        return function() {
            var d, b = arguments[0];
            for (d = "[" + (a ? a + ":" : "") + b + "] http://errors.angularjs.org/1.4.8/" + (a ? a + "/" : "") + b, 
            b = 1; b < arguments.length; b++) {
                d = d + (1 == b ? "?" : "&") + "p" + (b - 1) + "=";
                var e, c = encodeURIComponent;
                e = arguments[b], e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e, 
                d += c(e);
            }
            return Error(d);
        };
    }
    function za(a) {
        if (null == a || Xa(a)) return !1;
        if (I(a) || E(a) || B && a instanceof B) return !0;
        var b = "length" in Object(a) && a.length;
        return Q(b) && (b >= 0 && b - 1 in a || "function" == typeof a.item);
    }
    function n(a, b, d) {
        var c, e;
        if (a) if (z(a)) for (c in a) "prototype" == c || "length" == c || "name" == c || a.hasOwnProperty && !a.hasOwnProperty(c) || b.call(d, a[c], c, a); else if (I(a) || za(a)) {
            var f = "object" != typeof a;
            for (c = 0, e = a.length; e > c; c++) (f || c in a) && b.call(d, a[c], c, a);
        } else if (a.forEach && a.forEach !== n) a.forEach(b, d, a); else if (nc(a)) for (c in a) b.call(d, a[c], c, a); else if ("function" == typeof a.hasOwnProperty) for (c in a) a.hasOwnProperty(c) && b.call(d, a[c], c, a); else for (c in a) qa.call(a, c) && b.call(d, a[c], c, a);
        return a;
    }
    function oc(a, b, d) {
        for (var c = Object.keys(a).sort(), e = 0; e < c.length; e++) b.call(d, a[c[e]], c[e]);
        return c;
    }
    function pc(a) {
        return function(b, d) {
            a(d, b);
        };
    }
    function Td() {
        return ++nb;
    }
    function Mb(a, b, d) {
        for (var c = a.$$hashKey, e = 0, f = b.length; f > e; ++e) {
            var g = b[e];
            if (H(g) || z(g)) for (var h = Object.keys(g), k = 0, l = h.length; l > k; k++) {
                var m = h[k], r = g[m];
                d && H(r) ? da(r) ? a[m] = new Date(r.valueOf()) : Ma(r) ? a[m] = new RegExp(r) : r.nodeName ? a[m] = r.cloneNode(!0) : Nb(r) ? a[m] = r.clone() : (H(a[m]) || (a[m] = I(r) ? [] : {}), 
                Mb(a[m], [ r ], !0)) : a[m] = r;
            }
        }
        return c ? a.$$hashKey = c : delete a.$$hashKey, a;
    }
    function M(a) {
        return Mb(a, ra.call(arguments, 1), !1);
    }
    function Ud(a) {
        return Mb(a, ra.call(arguments, 1), !0);
    }
    function ea(a) {
        return parseInt(a, 10);
    }
    function Ob(a, b) {
        return M(Object.create(a), b);
    }
    function x() {}
    function Ya(a) {
        return a;
    }
    function na(a) {
        return function() {
            return a;
        };
    }
    function qc(a) {
        return z(a.toString) && a.toString !== sa;
    }
    function q(a) {
        return "undefined" == typeof a;
    }
    function y(a) {
        return "undefined" != typeof a;
    }
    function H(a) {
        return null !== a && "object" == typeof a;
    }
    function nc(a) {
        return null !== a && "object" == typeof a && !rc(a);
    }
    function E(a) {
        return "string" == typeof a;
    }
    function Q(a) {
        return "number" == typeof a;
    }
    function da(a) {
        return "[object Date]" === sa.call(a);
    }
    function z(a) {
        return "function" == typeof a;
    }
    function Ma(a) {
        return "[object RegExp]" === sa.call(a);
    }
    function Xa(a) {
        return a && a.window === a;
    }
    function Za(a) {
        return a && a.$evalAsync && a.$watch;
    }
    function $a(a) {
        return "boolean" == typeof a;
    }
    function sc(a) {
        return a && Q(a.length) && Vd.test(sa.call(a));
    }
    function Nb(a) {
        return !(!a || !(a.nodeName || a.prop && a.attr && a.find));
    }
    function Wd(a) {
        var b = {};
        a = a.split(",");
        var d;
        for (d = 0; d < a.length; d++) b[a[d]] = !0;
        return b;
    }
    function ta(a) {
        return F(a.nodeName || a[0] && a[0].nodeName);
    }
    function ab(a, b) {
        var d = a.indexOf(b);
        return d >= 0 && a.splice(d, 1), d;
    }
    function bb(a, b) {
        function d(a, b) {
            var e, d = b.$$hashKey;
            if (I(a)) {
                e = 0;
                for (var f = a.length; f > e; e++) b.push(c(a[e]));
            } else if (nc(a)) for (e in a) b[e] = c(a[e]); else if (a && "function" == typeof a.hasOwnProperty) for (e in a) a.hasOwnProperty(e) && (b[e] = c(a[e])); else for (e in a) qa.call(a, e) && (b[e] = c(a[e]));
            return d ? b.$$hashKey = d : delete b.$$hashKey, b;
        }
        function c(a) {
            if (!H(a)) return a;
            var b = e.indexOf(a);
            if (-1 !== b) return f[b];
            if (Xa(a) || Za(a)) throw Aa("cpws");
            var c, b = !1;
            return I(a) ? (c = [], b = !0) : sc(a) ? c = new a.constructor(a) : da(a) ? c = new Date(a.getTime()) : Ma(a) ? (c = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), 
            c.lastIndex = a.lastIndex) : z(a.cloneNode) ? c = a.cloneNode(!0) : (c = Object.create(rc(a)), 
            b = !0), e.push(a), f.push(c), b ? d(a, c) : c;
        }
        var e = [], f = [];
        if (b) {
            if (sc(b)) throw Aa("cpta");
            if (a === b) throw Aa("cpi");
            return I(b) ? b.length = 0 : n(b, function(a, c) {
                "$$hashKey" !== c && delete b[c];
            }), e.push(a), f.push(b), d(a, b);
        }
        return c(a);
    }
    function ia(a, b) {
        if (I(a)) {
            b = b || [];
            for (var d = 0, c = a.length; c > d; d++) b[d] = a[d];
        } else if (H(a)) for (d in b = b || {}, a) ("$" !== d.charAt(0) || "$" !== d.charAt(1)) && (b[d] = a[d]);
        return b || a;
    }
    function ma(a, b) {
        if (a === b) return !0;
        if (null === a || null === b) return !1;
        if (a !== a && b !== b) return !0;
        var c, d = typeof a;
        if (d == typeof b && "object" == d) {
            if (!I(a)) {
                if (da(a)) return da(b) ? ma(a.getTime(), b.getTime()) : !1;
                if (Ma(a)) return Ma(b) ? a.toString() == b.toString() : !1;
                if (Za(a) || Za(b) || Xa(a) || Xa(b) || I(b) || da(b) || Ma(b)) return !1;
                d = $();
                for (c in a) if ("$" !== c.charAt(0) && !z(a[c])) {
                    if (!ma(a[c], b[c])) return !1;
                    d[c] = !0;
                }
                for (c in b) if (!(c in d) && "$" !== c.charAt(0) && y(b[c]) && !z(b[c])) return !1;
                return !0;
            }
            if (!I(b)) return !1;
            if ((d = a.length) == b.length) {
                for (c = 0; d > c; c++) if (!ma(a[c], b[c])) return !1;
                return !0;
            }
        }
        return !1;
    }
    function cb(a, b, d) {
        return a.concat(ra.call(b, d));
    }
    function tc(a, b) {
        var d = 2 < arguments.length ? ra.call(arguments, 2) : [];
        return !z(b) || b instanceof RegExp ? b : d.length ? function() {
            return arguments.length ? b.apply(a, cb(d, arguments, 0)) : b.apply(a, d);
        } : function() {
            return arguments.length ? b.apply(a, arguments) : b.call(a);
        };
    }
    function Xd(a, b) {
        var d = b;
        return "string" == typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? d = u : Xa(b) ? d = "$WINDOW" : b && X === b ? d = "$DOCUMENT" : Za(b) && (d = "$SCOPE"), 
        d;
    }
    function db(a, b) {
        return "undefined" == typeof a ? u : (Q(b) || (b = b ? 2 : null), JSON.stringify(a, Xd, b));
    }
    function uc(a) {
        return E(a) ? JSON.parse(a) : a;
    }
    function vc(a, b) {
        var d = Date.parse("Jan 01, 1970 00:00:00 " + a) / 6e4;
        return isNaN(d) ? b : d;
    }
    function Pb(a, b, d) {
        d = d ? -1 : 1;
        var c = vc(b, a.getTimezoneOffset());
        return b = a, a = d * (c - a.getTimezoneOffset()), b = new Date(b.getTime()), b.setMinutes(b.getMinutes() + a), 
        b;
    }
    function ua(a) {
        a = B(a).clone();
        try {
            a.empty();
        } catch (b) {}
        var d = B("<div>").append(a).html();
        try {
            return a[0].nodeType === Na ? F(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + F(b);
            });
        } catch (c) {
            return F(d);
        }
    }
    function wc(a) {
        try {
            return decodeURIComponent(a);
        } catch (b) {}
    }
    function xc(a) {
        var b = {};
        return n((a || "").split("&"), function(a) {
            var c, e, f;
            a && (e = a = a.replace(/\+/g, "%20"), c = a.indexOf("="), -1 !== c && (e = a.substring(0, c), 
            f = a.substring(c + 1)), e = wc(e), y(e) && (f = y(f) ? wc(f) : !0, qa.call(b, e) ? I(b[e]) ? b[e].push(f) : b[e] = [ b[e], f ] : b[e] = f));
        }), b;
    }
    function Qb(a) {
        var b = [];
        return n(a, function(a, c) {
            I(a) ? n(a, function(a) {
                b.push(ja(c, !0) + (!0 === a ? "" : "=" + ja(a, !0)));
            }) : b.push(ja(c, !0) + (!0 === a ? "" : "=" + ja(a, !0)));
        }), b.length ? b.join("&") : "";
    }
    function ob(a) {
        return ja(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
    }
    function ja(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+");
    }
    function Yd(a, b) {
        var d, c, e = Oa.length;
        for (c = 0; e > c; ++c) if (d = Oa[c] + b, E(d = a.getAttribute(d))) return d;
        return null;
    }
    function Zd(a, b) {
        var d, c, e = {};
        n(Oa, function(b) {
            b += "app", !d && a.hasAttribute && a.hasAttribute(b) && (d = a, c = a.getAttribute(b));
        }), n(Oa, function(b) {
            b += "app";
            var e;
            !d && (e = a.querySelector("[" + b.replace(":", "\\:") + "]")) && (d = e, c = e.getAttribute(b));
        }), d && (e.strictDi = null !== Yd(d, "strict-di"), b(d, c ? [ c ] : [], e));
    }
    function yc(a, b, d) {
        H(d) || (d = {}), d = M({
            strictDi: !1
        }, d);
        var c = function() {
            if (a = B(a), a.injector()) {
                var c = a[0] === X ? "document" : ua(a);
                throw Aa("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;"));
            }
            return b = b || [], b.unshift([ "$provide", function(b) {
                b.value("$rootElement", a);
            } ]), d.debugInfoEnabled && b.push([ "$compileProvider", function(a) {
                a.debugInfoEnabled(!0);
            } ]), b.unshift("ng"), c = eb(b, d.strictDi), c.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                a.$apply(function() {
                    b.data("$injector", d), c(b)(a);
                });
            } ]), c;
        }, e = /^NG_ENABLE_DEBUG_INFO!/, f = /^NG_DEFER_BOOTSTRAP!/;
        return S && e.test(S.name) && (d.debugInfoEnabled = !0, S.name = S.name.replace(e, "")), 
        S && !f.test(S.name) ? c() : (S.name = S.name.replace(f, ""), fa.resumeBootstrap = function(a) {
            return n(a, function(a) {
                b.push(a);
            }), c();
        }, void (z(fa.resumeDeferredBootstrap) && fa.resumeDeferredBootstrap()));
    }
    function $d() {
        S.name = "NG_ENABLE_DEBUG_INFO!" + S.name, S.location.reload();
    }
    function ae(a) {
        if (a = fa.element(a).injector(), !a) throw Aa("test");
        return a.get("$$testability");
    }
    function zc(a, b) {
        return b = b || "_", a.replace(be, function(a, c) {
            return (c ? b : "") + a.toLowerCase();
        });
    }
    function ce() {
        var a;
        if (!Ac) {
            var b = pb();
            (oa = q(b) ? S.jQuery : b ? S[b] : u) && oa.fn.on ? (B = oa, M(oa.fn, {
                scope: Pa.scope,
                isolateScope: Pa.isolateScope,
                controller: Pa.controller,
                injector: Pa.injector,
                inheritedData: Pa.inheritedData
            }), a = oa.cleanData, oa.cleanData = function(b) {
                var c;
                if (Rb) Rb = !1; else for (var f, e = 0; null != (f = b[e]); e++) (c = oa._data(f, "events")) && c.$destroy && oa(f).triggerHandler("$destroy");
                a(b);
            }) : B = N, fa.element = B, Ac = !0;
        }
    }
    function qb(a, b, d) {
        if (!a) throw Aa("areq", b || "?", d || "required");
        return a;
    }
    function Qa(a, b, d) {
        return d && I(a) && (a = a[a.length - 1]), qb(z(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), 
        a;
    }
    function Ra(a, b) {
        if ("hasOwnProperty" === a) throw Aa("badname", b);
    }
    function Bc(a, b, d) {
        if (!b) return a;
        b = b.split(".");
        for (var c, e = a, f = b.length, g = 0; f > g; g++) c = b[g], a && (a = (e = a)[c]);
        return !d && z(a) ? tc(e, a) : a;
    }
    function rb(a) {
        for (var c, b = a[0], d = a[a.length - 1], e = 1; b !== d && (b = b.nextSibling); e++) (c || a[e] !== b) && (c || (c = B(ra.call(a, 0, e))), 
        c.push(b));
        return c || a;
    }
    function $() {
        return Object.create(null);
    }
    function de(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c());
        }
        var d = G("$injector"), c = G("ng");
        return a = b(a, "angular", Object), a.$$minErr = a.$$minErr || G, b(a, "module", function() {
            var a = {};
            return function(f, g, h) {
                if ("hasOwnProperty" === f) throw c("badname", "module");
                return g && a.hasOwnProperty(f) && (a[f] = null), b(a, f, function() {
                    function a(b, d, e, f) {
                        return f || (f = c), function() {
                            return f[e || "push"]([ b, d, arguments ]), v;
                        };
                    }
                    function b(a, d) {
                        return function(b, e) {
                            return e && z(e) && (e.$$moduleName = f), c.push([ a, d, arguments ]), v;
                        };
                    }
                    if (!g) throw d("nomod", f);
                    var c = [], e = [], t = [], A = a("$injector", "invoke", "push", e), v = {
                        _invokeQueue: c,
                        _configBlocks: e,
                        _runBlocks: t,
                        requires: g,
                        name: f,
                        provider: b("$provide", "provider"),
                        factory: b("$provide", "factory"),
                        service: b("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        decorator: b("$provide", "decorator"),
                        animation: b("$animateProvider", "register"),
                        filter: b("$filterProvider", "register"),
                        controller: b("$controllerProvider", "register"),
                        directive: b("$compileProvider", "directive"),
                        config: A,
                        run: function(a) {
                            return t.push(a), this;
                        }
                    };
                    return h && A(h), v;
                });
            };
        });
    }
    function ee(a) {
        M(a, {
            bootstrap: yc,
            copy: bb,
            extend: M,
            merge: Ud,
            equals: ma,
            element: B,
            forEach: n,
            injector: eb,
            noop: x,
            bind: tc,
            toJson: db,
            fromJson: uc,
            identity: Ya,
            isUndefined: q,
            isDefined: y,
            isString: E,
            isFunction: z,
            isObject: H,
            isNumber: Q,
            isElement: Nb,
            isArray: I,
            version: fe,
            isDate: da,
            lowercase: F,
            uppercase: sb,
            callbacks: {
                counter: 0
            },
            getTestability: ae,
            $$minErr: G,
            $$csp: Ba,
            reloadWithDebugInfo: $d
        }), (Sb = de(S))("ng", [ "ngLocale" ], [ "$provide", function(a) {
            a.provider({
                $$sanitizeUri: ge
            }), a.provider("$compile", Cc).directive({
                a: he,
                input: Dc,
                textarea: Dc,
                form: ie,
                script: je,
                select: ke,
                style: le,
                option: me,
                ngBind: ne,
                ngBindHtml: oe,
                ngBindTemplate: pe,
                ngClass: qe,
                ngClassEven: re,
                ngClassOdd: se,
                ngCloak: te,
                ngController: ue,
                ngForm: ve,
                ngHide: we,
                ngIf: xe,
                ngInclude: ye,
                ngInit: ze,
                ngNonBindable: Ae,
                ngPluralize: Be,
                ngRepeat: Ce,
                ngShow: De,
                ngStyle: Ee,
                ngSwitch: Fe,
                ngSwitchWhen: Ge,
                ngSwitchDefault: He,
                ngOptions: Ie,
                ngTransclude: Je,
                ngModel: Ke,
                ngList: Le,
                ngChange: Me,
                pattern: Ec,
                ngPattern: Ec,
                required: Fc,
                ngRequired: Fc,
                minlength: Gc,
                ngMinlength: Gc,
                maxlength: Hc,
                ngMaxlength: Hc,
                ngValue: Ne,
                ngModelOptions: Oe
            }).directive({
                ngInclude: Pe
            }).directive(tb).directive(Ic), a.provider({
                $anchorScroll: Qe,
                $animate: Re,
                $animateCss: Se,
                $$animateQueue: Te,
                $$AnimateRunner: Ue,
                $browser: Ve,
                $cacheFactory: We,
                $controller: Xe,
                $document: Ye,
                $exceptionHandler: Ze,
                $filter: Jc,
                $$forceReflow: $e,
                $interpolate: af,
                $interval: bf,
                $http: cf,
                $httpParamSerializer: df,
                $httpParamSerializerJQLike: ef,
                $httpBackend: ff,
                $xhrFactory: gf,
                $location: hf,
                $log: jf,
                $parse: kf,
                $rootScope: lf,
                $q: mf,
                $$q: nf,
                $sce: of,
                $sceDelegate: pf,
                $sniffer: qf,
                $templateCache: rf,
                $templateRequest: sf,
                $$testability: tf,
                $timeout: uf,
                $window: vf,
                $$rAF: wf,
                $$jqLite: xf,
                $$HashMap: yf,
                $$cookieReader: zf
            });
        } ]);
    }
    function fb(a) {
        return a.replace(Af, function(a, d, c, e) {
            return e ? c.toUpperCase() : c;
        }).replace(Bf, "Moz$1");
    }
    function Kc(a) {
        return a = a.nodeType, 1 === a || !a || 9 === a;
    }
    function Lc(a, b) {
        var d, c, e = b.createDocumentFragment(), f = [];
        if (Tb.test(a)) {
            for (d = d || e.appendChild(b.createElement("div")), c = (Cf.exec(a) || [ "", "" ])[1].toLowerCase(), 
            c = ka[c] || ka._default, d.innerHTML = c[1] + a.replace(Df, "<$1></$2>") + c[2], 
            c = c[0]; c--; ) d = d.lastChild;
            f = cb(f, d.childNodes), d = e.firstChild, d.textContent = "";
        } else f.push(b.createTextNode(a));
        return e.textContent = "", e.innerHTML = "", n(f, function(a) {
            e.appendChild(a);
        }), e;
    }
    function N(a) {
        if (a instanceof N) return a;
        var b;
        if (E(a) && (a = U(a), b = !0), !(this instanceof N)) {
            if (b && "<" != a.charAt(0)) throw Ub("nosel");
            return new N(a);
        }
        if (b) {
            b = X;
            var d;
            a = (d = Ef.exec(a)) ? [ b.createElement(d[1]) ] : (d = Lc(a, b)) ? d.childNodes : [];
        }
        Mc(this, a);
    }
    function Vb(a) {
        return a.cloneNode(!0);
    }
    function ub(a, b) {
        if (b || vb(a), a.querySelectorAll) for (var d = a.querySelectorAll("*"), c = 0, e = d.length; e > c; c++) vb(d[c]);
    }
    function Nc(a, b, d, c) {
        if (y(c)) throw Ub("offargs");
        var e = (c = wb(a)) && c.events, f = c && c.handle;
        if (f) if (b) {
            var g = function(b) {
                var c = e[b];
                y(d) && ab(c || [], d), y(d) && c && 0 < c.length || (a.removeEventListener(b, f, !1), 
                delete e[b]);
            };
            n(b.split(" "), function(a) {
                g(a), xb[a] && g(xb[a]);
            });
        } else for (b in e) "$destroy" !== b && a.removeEventListener(b, f, !1), delete e[b];
    }
    function vb(a, b) {
        var d = a.ng339, c = d && gb[d];
        c && (b ? delete c.data[b] : (c.handle && (c.events.$destroy && c.handle({}, "$destroy"), 
        Nc(a)), delete gb[d], a.ng339 = u));
    }
    function wb(a, b) {
        var d = a.ng339, d = d && gb[d];
        return b && !d && (a.ng339 = d = ++Ff, d = gb[d] = {
            events: {},
            data: {},
            handle: u
        }), d;
    }
    function Wb(a, b, d) {
        if (Kc(a)) {
            var c = y(d), e = !c && b && !H(b), f = !b;
            if (a = (a = wb(a, !e)) && a.data, c) a[b] = d; else {
                if (f) return a;
                if (e) return a && a[b];
                M(a, b);
            }
        }
    }
    function yb(a, b) {
        return a.getAttribute ? -1 < (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") : !1;
    }
    function zb(a, b) {
        b && a.setAttribute && n(b.split(" "), function(b) {
            a.setAttribute("class", U((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + U(b) + " ", " ")));
        });
    }
    function Ab(a, b) {
        if (b && a.setAttribute) {
            var d = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            n(b.split(" "), function(a) {
                a = U(a), -1 === d.indexOf(" " + a + " ") && (d += a + " ");
            }), a.setAttribute("class", U(d));
        }
    }
    function Mc(a, b) {
        if (b) if (b.nodeType) a[a.length++] = b; else {
            var d = b.length;
            if ("number" == typeof d && b.window !== b) {
                if (d) for (var c = 0; d > c; c++) a[a.length++] = b[c];
            } else a[a.length++] = b;
        }
    }
    function Oc(a, b) {
        return Bb(a, "$" + (b || "ngController") + "Controller");
    }
    function Bb(a, b, d) {
        for (9 == a.nodeType && (a = a.documentElement), b = I(b) ? b : [ b ]; a; ) {
            for (var c = 0, e = b.length; e > c; c++) if (y(d = B.data(a, b[c]))) return d;
            a = a.parentNode || 11 === a.nodeType && a.host;
        }
    }
    function Pc(a) {
        for (ub(a, !0); a.firstChild; ) a.removeChild(a.firstChild);
    }
    function Xb(a, b) {
        b || ub(a);
        var d = a.parentNode;
        d && d.removeChild(a);
    }
    function Gf(a, b) {
        b = b || S, "complete" === b.document.readyState ? b.setTimeout(a) : B(b).on("load", a);
    }
    function Qc(a, b) {
        var d = Cb[b.toLowerCase()];
        return d && Rc[ta(a)] && d;
    }
    function Hf(a, b) {
        var d = function(c, d) {
            c.isDefaultPrevented = function() {
                return c.defaultPrevented;
            };
            var f = b[d || c.type], g = f ? f.length : 0;
            if (g) {
                if (q(c.immediatePropagationStopped)) {
                    var h = c.stopImmediatePropagation;
                    c.stopImmediatePropagation = function() {
                        c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), h && h.call(c);
                    };
                }
                c.isImmediatePropagationStopped = function() {
                    return !0 === c.immediatePropagationStopped;
                };
                var k = f.specialHandlerWrapper || If;
                g > 1 && (f = ia(f));
                for (var l = 0; g > l; l++) c.isImmediatePropagationStopped() || k(a, c, f[l]);
            }
        };
        return d.elem = a, d;
    }
    function If(a, b, d) {
        d.call(a, b);
    }
    function Jf(a, b, d) {
        var c = b.relatedTarget;
        c && (c === a || Kf.call(a, c)) || d.call(a, b);
    }
    function xf() {
        this.$get = function() {
            return M(N, {
                hasClass: function(a, b) {
                    return a.attr && (a = a[0]), yb(a, b);
                },
                addClass: function(a, b) {
                    return a.attr && (a = a[0]), Ab(a, b);
                },
                removeClass: function(a, b) {
                    return a.attr && (a = a[0]), zb(a, b);
                }
            });
        };
    }
    function Ca(a, b) {
        var d = a && a.$$hashKey;
        return d ? ("function" == typeof d && (d = a.$$hashKey()), d) : (d = typeof a, d = "function" == d || "object" == d && null !== a ? a.$$hashKey = d + ":" + (b || Td)() : d + ":" + a);
    }
    function Sa(a, b) {
        if (b) {
            var d = 0;
            this.nextUid = function() {
                return ++d;
            };
        }
        n(a, this.put, this);
    }
    function Lf(a) {
        return (a = a.toString().replace(Sc, "").match(Tc)) ? "function(" + (a[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
    }
    function eb(a, b) {
        function d(a) {
            return function(b, c) {
                return H(b) ? void n(b, pc(a)) : a(b, c);
            };
        }
        function c(a, b) {
            if (Ra(a, "service"), (z(b) || I(b)) && (b = t.instantiate(b)), !b.$get) throw Da("pget", a);
            return r[a + "Provider"] = b;
        }
        function e(a, b) {
            return function() {
                var c = v.invoke(b, this);
                if (q(c)) throw Da("undef", a);
                return c;
            };
        }
        function f(a, b, d) {
            return c(a, {
                $get: !1 !== d ? e(a, b) : b
            });
        }
        function g(a) {
            qb(q(a) || I(a), "modulesToLoad", "not an array");
            var c, b = [];
            return n(a, function(a) {
                function d(a) {
                    var b, c;
                    for (b = 0, c = a.length; c > b; b++) {
                        var e = a[b], f = t.get(e[0]);
                        f[e[1]].apply(f, e[2]);
                    }
                }
                if (!m.get(a)) {
                    m.put(a, !0);
                    try {
                        E(a) ? (c = Sb(a), b = b.concat(g(c.requires)).concat(c._runBlocks), d(c._invokeQueue), 
                        d(c._configBlocks)) : z(a) ? b.push(t.invoke(a)) : I(a) ? b.push(t.invoke(a)) : Qa(a, "module");
                    } catch (e) {
                        throw I(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), 
                        Da("modulerr", a, e.stack || e.message || e);
                    }
                }
            }), b;
        }
        function h(a, c) {
            function d(b, e) {
                if (a.hasOwnProperty(b)) {
                    if (a[b] === k) throw Da("cdep", b + " <- " + l.join(" <- "));
                    return a[b];
                }
                try {
                    return l.unshift(b), a[b] = k, a[b] = c(b, e);
                } catch (f) {
                    throw a[b] === k && delete a[b], f;
                } finally {
                    l.shift();
                }
            }
            function e(a, c, f, g) {
                "string" == typeof f && (g = f, f = null);
                var l, m, t, h = [], k = eb.$$annotate(a, b, g);
                for (m = 0, l = k.length; l > m; m++) {
                    if (t = k[m], "string" != typeof t) throw Da("itkn", t);
                    h.push(f && f.hasOwnProperty(t) ? f[t] : d(t, g));
                }
                return I(a) && (a = a[l]), a.apply(c, h);
            }
            return {
                invoke: e,
                instantiate: function(a, b, c) {
                    var d = Object.create((I(a) ? a[a.length - 1] : a).prototype || null);
                    return a = e(a, d, b, c), H(a) || z(a) ? a : d;
                },
                get: d,
                annotate: eb.$$annotate,
                has: function(b) {
                    return r.hasOwnProperty(b + "Provider") || a.hasOwnProperty(b);
                }
            };
        }
        b = !0 === b;
        var k = {}, l = [], m = new Sa([], !0), r = {
            $provide: {
                provider: d(c),
                factory: d(f),
                service: d(function(a, b) {
                    return f(a, [ "$injector", function(a) {
                        return a.instantiate(b);
                    } ]);
                }),
                value: d(function(a, b) {
                    return f(a, na(b), !1);
                }),
                constant: d(function(a, b) {
                    Ra(a, "constant"), r[a] = b, A[a] = b;
                }),
                decorator: function(a, b) {
                    var c = t.get(a + "Provider"), d = c.$get;
                    c.$get = function() {
                        var a = v.invoke(d, c);
                        return v.invoke(b, null, {
                            $delegate: a
                        });
                    };
                }
            }
        }, t = r.$injector = h(r, function(a, b) {
            throw fa.isString(b) && l.push(b), Da("unpr", l.join(" <- "));
        }), A = {}, v = A.$injector = h(A, function(a, b) {
            var c = t.get(a + "Provider", b);
            return v.invoke(c.$get, c, u, a);
        });
        return n(g(a), function(a) {
            a && v.invoke(a);
        }), v;
    }
    function Qe() {
        var a = !0;
        this.disableAutoScrolling = function() {
            a = !1;
        }, this.$get = [ "$window", "$location", "$rootScope", function(b, d, c) {
            function e(a) {
                var b = null;
                return Array.prototype.some.call(a, function(a) {
                    return "a" === ta(a) ? (b = a, !0) : void 0;
                }), b;
            }
            function f(a) {
                if (a) {
                    a.scrollIntoView();
                    var c;
                    c = g.yOffset, z(c) ? c = c() : Nb(c) ? (c = c[0], c = "fixed" !== b.getComputedStyle(c).position ? 0 : c.getBoundingClientRect().bottom) : Q(c) || (c = 0), 
                    c && (a = a.getBoundingClientRect().top, b.scrollBy(0, a - c));
                } else b.scrollTo(0, 0);
            }
            function g(a) {
                a = E(a) ? a : d.hash();
                var b;
                a ? (b = h.getElementById(a)) ? f(b) : (b = e(h.getElementsByName(a))) ? f(b) : "top" === a && f(null) : f(null);
            }
            var h = b.document;
            return a && c.$watch(function() {
                return d.hash();
            }, function(a, b) {
                a === b && "" === a || Gf(function() {
                    c.$evalAsync(g);
                });
            }), g;
        } ];
    }
    function hb(a, b) {
        return a || b ? a ? b ? (I(a) && (a = a.join(" ")), I(b) && (b = b.join(" ")), a + " " + b) : a : b : "";
    }
    function Mf(a) {
        E(a) && (a = a.split(" "));
        var b = $();
        return n(a, function(a) {
            a.length && (b[a] = !0);
        }), b;
    }
    function Ea(a) {
        return H(a) ? a : {};
    }
    function Nf(a, b, d, c) {
        function e(a) {
            try {
                a.apply(null, ra.call(arguments, 1));
            } finally {
                if (v--, 0 === v) for (;T.length; ) try {
                    T.pop()();
                } catch (b) {
                    d.error(b);
                }
            }
        }
        function f() {
            L = null, g(), h();
        }
        function g() {
            a: {
                try {
                    p = m.state;
                    break a;
                } catch (a) {}
                p = void 0;
            }
            p = q(p) ? null : p, ma(p, J) && (p = J), J = p;
        }
        function h() {
            (w !== k.url() || C !== p) && (w = k.url(), C = p, n(aa, function(a) {
                a(k.url(), p);
            }));
        }
        var k = this, l = a.location, m = a.history, r = a.setTimeout, t = a.clearTimeout, A = {};
        k.isMock = !1;
        var v = 0, T = [];
        k.$$completeOutstandingRequest = e, k.$$incOutstandingRequestCount = function() {
            v++;
        }, k.notifyWhenNoOutstandingRequests = function(a) {
            0 === v ? a() : T.push(a);
        };
        var p, C, w = l.href, ga = b.find("base"), L = null;
        g(), C = p, k.url = function(b, d, e) {
            if (q(e) && (e = null), l !== a.location && (l = a.location), m !== a.history && (m = a.history), 
            b) {
                var f = C === e;
                if (w === b && (!c.history || f)) return k;
                var h = w && Fa(w) === Fa(b);
                return w = b, C = e, !c.history || h && f ? ((!h || L) && (L = b), d ? l.replace(b) : h ? (d = l, 
                e = b.indexOf("#"), e = -1 === e ? "" : b.substr(e), d.hash = e) : l.href = b, l.href !== b && (L = b)) : (m[d ? "replaceState" : "pushState"](e, "", b), 
                g(), C = p), k;
            }
            return L || l.href.replace(/%27/g, "'");
        }, k.state = function() {
            return p;
        };
        var aa = [], D = !1, J = null;
        k.onUrlChange = function(b) {
            return D || (c.history && B(a).on("popstate", f), B(a).on("hashchange", f), D = !0), 
            aa.push(b), b;
        }, k.$$applicationDestroyed = function() {
            B(a).off("hashchange popstate", f);
        }, k.$$checkUrlChange = h, k.baseHref = function() {
            var a = ga.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
        }, k.defer = function(a, b) {
            var c;
            return v++, c = r(function() {
                delete A[c], e(a);
            }, b || 0), A[c] = !0, c;
        }, k.defer.cancel = function(a) {
            return A[a] ? (delete A[a], t(a), e(x), !0) : !1;
        };
    }
    function Ve() {
        this.$get = [ "$window", "$log", "$sniffer", "$document", function(a, b, d, c) {
            return new Nf(a, c, b, d);
        } ];
    }
    function We() {
        this.$get = function() {
            function a(a, c) {
                function e(a) {
                    a != r && (t ? t == a && (t = a.n) : t = a, f(a.n, a.p), f(a, r), r = a, r.n = null);
                }
                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a));
                }
                if (a in b) throw G("$cacheFactory")("iid", a);
                var g = 0, h = M({}, c, {
                    id: a
                }), k = $(), l = c && c.capacity || Number.MAX_VALUE, m = $(), r = null, t = null;
                return b[a] = {
                    put: function(a, b) {
                        if (!q(b)) {
                            if (l < Number.MAX_VALUE) {
                                var c = m[a] || (m[a] = {
                                    key: a
                                });
                                e(c);
                            }
                            return a in k || g++, k[a] = b, g > l && this.remove(t.key), b;
                        }
                    },
                    get: function(a) {
                        if (l < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            e(b);
                        }
                        return k[a];
                    },
                    remove: function(a) {
                        if (l < Number.MAX_VALUE) {
                            var b = m[a];
                            if (!b) return;
                            b == r && (r = b.p), b == t && (t = b.n), f(b.n, b.p), delete m[a];
                        }
                        a in k && (delete k[a], g--);
                    },
                    removeAll: function() {
                        k = $(), g = 0, m = $(), r = t = null;
                    },
                    destroy: function() {
                        m = h = k = null, delete b[a];
                    },
                    info: function() {
                        return M({}, h, {
                            size: g
                        });
                    }
                };
            }
            var b = {};
            return a.info = function() {
                var a = {};
                return n(b, function(b, e) {
                    a[e] = b.info();
                }), a;
            }, a.get = function(a) {
                return b[a];
            }, a;
        };
    }
    function rf() {
        this.$get = [ "$cacheFactory", function(a) {
            return a("templates");
        } ];
    }
    function Cc(a, b) {
        function d(a, b, c) {
            var d = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, e = {};
            return n(a, function(a, f) {
                var g = a.match(d);
                if (!g) throw ha("iscp", b, f, a, c ? "controller bindings definition" : "isolate scope definition");
                e[f] = {
                    mode: g[1][0],
                    collection: "*" === g[2],
                    optional: "?" === g[3],
                    attrName: g[4] || f
                };
            }), e;
        }
        function c(a) {
            var b = a.charAt(0);
            if (!b || b !== F(b)) throw ha("baddir", a);
            if (a !== a.trim()) throw ha("baddir", a);
        }
        var e = {}, f = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, g = /(([\w\-]+)(?:\:([^;]+))?;?)/, h = Wd("ngSrc,ngSrcset,src,srcset"), k = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, l = /^(on[a-z]+|formaction)$/;
        this.directive = function t(b, f) {
            return Ra(b, "directive"), E(b) ? (c(b), qb(f, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], 
            a.factory(b + "Directive", [ "$injector", "$exceptionHandler", function(a, c) {
                var f = [];
                return n(e[b], function(e, g) {
                    try {
                        var h = a.invoke(e);
                        z(h) ? h = {
                            compile: na(h)
                        } : !h.compile && h.link && (h.compile = na(h.link)), h.priority = h.priority || 0, 
                        h.index = g, h.name = h.name || b, h.require = h.require || h.controller && h.name, 
                        h.restrict = h.restrict || "EA";
                        var k = h, l = h, m = h.name, t = {
                            isolateScope: null,
                            bindToController: null
                        };
                        if (H(l.scope) && (!0 === l.bindToController ? (t.bindToController = d(l.scope, m, !0), 
                        t.isolateScope = {}) : t.isolateScope = d(l.scope, m, !1)), H(l.bindToController) && (t.bindToController = d(l.bindToController, m, !0)), 
                        H(t.bindToController)) {
                            var v = l.controller, R = l.controllerAs;
                            if (!v) throw ha("noctrl", m);
                            var V;
                            a: if (R && E(R)) V = R; else {
                                if (E(v)) {
                                    var n = Uc.exec(v);
                                    if (n) {
                                        V = n[3];
                                        break a;
                                    }
                                }
                                V = void 0;
                            }
                            if (!V) throw ha("noident", m);
                        }
                        var s = k.$$bindings = t;
                        H(s.isolateScope) && (h.$$isolateBindings = s.isolateScope), h.$$moduleName = e.$$moduleName, 
                        f.push(h);
                    } catch (u) {
                        c(u);
                    }
                }), f;
            } ])), e[b].push(f)) : n(b, pc(t)), this;
        }, this.aHrefSanitizationWhitelist = function(a) {
            return y(a) ? (b.aHrefSanitizationWhitelist(a), this) : b.aHrefSanitizationWhitelist();
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return y(a) ? (b.imgSrcSanitizationWhitelist(a), this) : b.imgSrcSanitizationWhitelist();
        };
        var m = !0;
        this.debugInfoEnabled = function(a) {
            return y(a) ? (m = a, this) : m;
        }, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, c, d, p, C, w, ga, L, aa, D) {
            function J(a, b) {
                try {
                    a.addClass(b);
                } catch (c) {}
            }
            function K(a, b, c, d, e) {
                a instanceof B || (a = B(a)), n(a, function(b, c) {
                    b.nodeType == Na && b.nodeValue.match(/\S+/) && (a[c] = B(b).wrap("<span></span>").parent()[0]);
                });
                var f = O(a, b, a, c, d, e);
                K.$$addScopeClass(a);
                var g = null;
                return function(b, c, d) {
                    qb(b, "scope"), e && e.needsNewScope && (b = b.$parent.$new()), d = d || {};
                    var h = d.parentBoundTranscludeFn, k = d.transcludeControllers;
                    if (d = d.futureParentElement, h && h.$$boundTransclude && (h = h.$$boundTransclude), 
                    g || (g = (d = d && d[0]) && "foreignobject" !== ta(d) && d.toString().match(/SVG/) ? "svg" : "html"), 
                    d = "html" !== g ? B(Yb(g, B("<div>").append(a).html())) : c ? Pa.clone.call(a) : a, 
                    k) for (var l in k) d.data("$" + l + "Controller", k[l].instance);
                    return K.$$addScopeInfo(d, b), c && c(d, b), f && f(b, d, d, h), d;
                };
            }
            function O(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, k, l, m, t, w, D;
                    if (p) for (D = Array(c.length), m = 0; m < h.length; m += 3) f = h[m], D[f] = c[f]; else D = c;
                    for (m = 0, t = h.length; t > m; ) k = D[h[m++]], c = h[m++], f = h[m++], c ? (c.scope ? (l = a.$new(), 
                    K.$$addScopeInfo(B(k), l)) : l = a, w = c.transcludeOnThisElement ? R(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? R(a, b) : null, 
                    c(f, l, k, d, w)) : f && f(a, k.childNodes, u, e);
                }
                for (var k, l, m, t, p, h = [], w = 0; w < a.length; w++) k = new fa(), l = V(a[w], [], k, 0 === w ? d : u, e), 
                (f = l.length ? Z(l, a[w], k, b, c, null, [], [], f) : null) && f.scope && K.$$addScopeClass(k.$$element), 
                k = f && f.terminal || !(m = a[w].childNodes) || !m.length ? null : O(m, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), 
                (f || k) && (h.push(w, f, k), t = !0, p = p || f), f = null;
                return t ? g : null;
            }
            function R(a, b, c) {
                return function(d, e, f, g, h) {
                    return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, {
                        parentBoundTranscludeFn: c,
                        transcludeControllers: f,
                        futureParentElement: g
                    });
                };
            }
            function V(a, b, c, d, e) {
                var k, h = c.$attr;
                switch (a.nodeType) {
                  case 1:
                    P(b, va(ta(a)), "E", d, e);
                    for (var l, m, t, p = a.attributes, w = 0, D = p && p.length; D > w; w++) {
                        var K = !1, A = !1;
                        l = p[w], k = l.name, m = U(l.value), l = va(k), (t = ka.test(l)) && (k = k.replace(Vc, "").substr(8).replace(/_(.)/g, function(a, b) {
                            return b.toUpperCase();
                        })), (l = l.match(la)) && G(l[1]) && (K = k, A = k.substr(0, k.length - 5) + "end", 
                        k = k.substr(0, k.length - 6)), l = va(k.toLowerCase()), h[l] = k, (t || !c.hasOwnProperty(l)) && (c[l] = m, 
                        Qc(a, l) && (c[l] = !0)), W(a, b, m, l, t), P(b, l, "A", d, e, K, A);
                    }
                    if (a = a.className, H(a) && (a = a.animVal), E(a) && "" !== a) for (;k = g.exec(a); ) l = va(k[2]), 
                    P(b, l, "C", d, e) && (c[l] = U(k[3])), a = a.substr(k.index + k[0].length);
                    break;

                  case Na:
                    if (11 === Ha) for (;a.parentNode && a.nextSibling && a.nextSibling.nodeType === Na; ) a.nodeValue += a.nextSibling.nodeValue, 
                    a.parentNode.removeChild(a.nextSibling);
                    N(b, a.nodeValue);
                    break;

                  case 8:
                    try {
                        (k = f.exec(a.nodeValue)) && (l = va(k[1]), P(b, l, "M", d, e) && (c[l] = U(k[2])));
                    } catch (R) {}
                }
                return b.sort(Ia), b;
            }
            function Ta(a, b, c) {
                var d = [], e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw ha("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), 
                        a = a.nextSibling;
                    } while (e > 0);
                } else d.push(a);
                return B(d);
            }
            function s(a, b, c) {
                return function(d, e, f, g, h) {
                    return e = Ta(e[0], b, c), a(d, e, f, g, h);
                };
            }
            function Z(a, b, d, e, f, g, h, l, m) {
                function t(a, b, c, d) {
                    a && (c && (a = s(a, c, d)), a.require = q.require, a.directiveName = x, (O === q || q.$$isolateScope) && (a = ca(a, {
                        isolateScope: !0
                    })), h.push(a)), b && (c && (b = s(b, c, d)), b.require = q.require, b.directiveName = x, 
                    (O === q || q.$$isolateScope) && (b = ca(b, {
                        isolateScope: !0
                    })), l.push(b));
                }
                function p(a, b, c, d) {
                    var e;
                    if (E(b)) {
                        var f = b.match(k);
                        b = b.substring(f[0].length);
                        var g = f[1] || f[3], f = "?" === f[2];
                        if ("^^" === g ? c = c.parent() : e = (e = d && d[b]) && e.instance, e || (d = "$" + b + "Controller", 
                        e = g ? c.inheritedData(d) : c.data(d)), !e && !f) throw ha("ctreq", b, a);
                    } else if (I(b)) for (e = [], g = 0, f = b.length; f > g; g++) e[g] = p(a, b[g], c, d);
                    return e || null;
                }
                function w(a, b, c, d, e, f) {
                    var h, g = $();
                    for (h in d) {
                        var k = d[h], l = {
                            $scope: k === O || k.$$isolateScope ? e : f,
                            $element: a,
                            $attrs: b,
                            $transclude: c
                        }, m = k.controller;
                        "@" == m && (m = b[k.name]), l = C(m, l, !0, k.controllerAs), g[k.name] = l, aa || a.data("$" + k.name + "Controller", l.instance);
                    }
                    return g;
                }
                function D(a, c, e, f, g) {
                    function k(a, b, c) {
                        var d;
                        return Za(a) || (c = b, b = a, a = u), aa && (d = v), c || (c = aa ? V.parent() : V), 
                        g(a, b, d, c, Ta);
                    }
                    var m, t, A, v, C, V, Ga;
                    b === e ? (f = d, V = d.$$element) : (V = B(e), f = new fa(V, d)), A = c, O ? t = c.$new(!0) : R && (A = c.$parent), 
                    g && (C = k, C.$$boundTransclude = g), T && (v = w(V, f, C, T, t, c)), O && (K.$$addScopeInfo(V, t, !0, !(J && (J === O || J === O.$$originalDirective))), 
                    K.$$addScopeClass(V, !0), t.$$isolateBindings = O.$$isolateBindings, (Ga = ba(c, f, t, t.$$isolateBindings, O)) && t.$on("$destroy", Ga));
                    for (var n in v) {
                        Ga = T[n];
                        var ga = v[n], L = Ga.$$bindings.bindToController;
                        ga.identifier && L && (m = ba(A, f, ga.instance, L, Ga));
                        var q = ga();
                        q !== ga.instance && (ga.instance = q, V.data("$" + Ga.name + "Controller", q), 
                        m && m(), m = ba(A, f, ga.instance, L, Ga));
                    }
                    for (F = 0, M = h.length; M > F; F++) m = h[F], ea(m, m.isolateScope ? t : c, V, f, m.require && p(m.directiveName, m.require, V, v), C);
                    var Ta = c;
                    for (O && (O.template || null === O.templateUrl) && (Ta = t), a && a(Ta, e.childNodes, u, g), 
                    F = l.length - 1; F >= 0; F--) m = l[F], ea(m, m.isolateScope ? t : c, V, f, m.require && p(m.directiveName, m.require, V, v), C);
                }
                m = m || {};
                for (var q, x, P, G, A = -Number.MAX_VALUE, R = m.newScopeDirective, T = m.controllerDirectives, O = m.newIsolateScopeDirective, J = m.templateDirective, n = m.nonTlbTranscludeDirective, ga = !1, L = !1, aa = m.hasElementTranscludeDirective, Z = d.$$element = B(b), Ia = e, F = 0, M = a.length; M > F; F++) {
                    q = a[F];
                    var N = q.$$start, Q = q.$$end;
                    if (N && (Z = Ta(b, N, Q)), P = u, A > q.priority) break;
                    if ((P = q.scope) && (q.templateUrl || (H(P) ? (Ua("new/isolated scope", O || R, q, Z), 
                    O = q) : Ua("new/isolated scope", O, q, Z)), R = R || q), x = q.name, !q.templateUrl && q.controller && (P = q.controller, 
                    T = T || $(), Ua("'" + x + "' controller", T[x], q, Z), T[x] = q), (P = q.transclude) && (ga = !0, 
                    q.$$tlb || (Ua("transclusion", n, q, Z), n = q), "element" == P ? (aa = !0, A = q.priority, 
                    P = Z, Z = d.$$element = B(X.createComment(" " + x + ": " + d[x] + " ")), b = Z[0], 
                    Y(f, ra.call(P, 0), b), Ia = K(P, e, A, g && g.name, {
                        nonTlbTranscludeDirective: n
                    })) : (P = B(Vb(b)).contents(), Z.empty(), Ia = K(P, e, u, u, {
                        needsNewScope: q.$$isolateScope || q.$$newScope
                    }))), q.template) if (L = !0, Ua("template", J, q, Z), J = q, P = z(q.template) ? q.template(Z, d) : q.template, 
                    P = ja(P), q.replace) {
                        if (g = q, P = Tb.test(P) ? Xc(Yb(q.templateNamespace, U(P))) : [], b = P[0], 1 != P.length || 1 !== b.nodeType) throw ha("tplrt", x, "");
                        Y(f, Z, b), P = {
                            $attr: {}
                        };
                        var Wc = V(b, [], P), W = a.splice(F + 1, a.length - (F + 1));
                        (O || R) && y(Wc, O, R), a = a.concat(Wc).concat(W), S(d, P), M = a.length;
                    } else Z.html(P);
                    if (q.templateUrl) L = !0, Ua("template", J, q, Z), J = q, q.replace && (g = q), 
                    D = Of(a.splice(F, a.length - F), Z, d, f, ga && Ia, h, l, {
                        controllerDirectives: T,
                        newScopeDirective: R !== q && R,
                        newIsolateScopeDirective: O,
                        templateDirective: J,
                        nonTlbTranscludeDirective: n
                    }), M = a.length; else if (q.compile) try {
                        G = q.compile(Z, d, Ia), z(G) ? t(null, G, N, Q) : G && t(G.pre, G.post, N, Q);
                    } catch (da) {
                        c(da, ua(Z));
                    }
                    q.terminal && (D.terminal = !0, A = Math.max(A, q.priority));
                }
                return D.scope = R && !0 === R.scope, D.transcludeOnThisElement = ga, D.templateOnThisElement = L, 
                D.transclude = Ia, m.hasElementTranscludeDirective = aa, D;
            }
            function y(a, b, c) {
                for (var d = 0, e = a.length; e > d; d++) a[d] = Ob(a[d], {
                    $$isolateScope: b,
                    $$newScope: c
                });
            }
            function P(b, d, f, g, h, k, l) {
                if (d === h) return null;
                if (h = null, e.hasOwnProperty(d)) {
                    var m;
                    d = a.get(d + "Directive");
                    for (var p = 0, w = d.length; w > p; p++) try {
                        m = d[p], (q(g) || g > m.priority) && -1 != m.restrict.indexOf(f) && (k && (m = Ob(m, {
                            $$start: k,
                            $$end: l
                        })), b.push(m), h = m);
                    } catch (D) {
                        c(D);
                    }
                }
                return h;
            }
            function G(b) {
                if (e.hasOwnProperty(b)) for (var c = a.get(b + "Directive"), d = 0, f = c.length; f > d; d++) if (b = c[d], 
                b.multiElement) return !0;
                return !1;
            }
            function S(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                n(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), 
                    a.$set(e, d, !0, c[e]));
                }), n(b, function(b, f) {
                    "class" == f ? (J(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), 
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, 
                    d[f] = c[f]);
                });
            }
            function Of(a, b, c, e, f, g, h, k) {
                var m, t, l = [], p = b[0], w = a.shift(), D = Ob(w, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: w
                }), A = z(w.templateUrl) ? w.templateUrl(b, c) : w.templateUrl, K = w.templateNamespace;
                return b.empty(), d(A).then(function(d) {
                    var T, v;
                    if (d = ja(d), w.replace) {
                        if (d = Tb.test(d) ? Xc(Yb(K, U(d))) : [], T = d[0], 1 != d.length || 1 !== T.nodeType) throw ha("tplrt", w.name, A);
                        d = {
                            $attr: {}
                        }, Y(e, b, T);
                        var C = V(T, [], d);
                        H(w.scope) && y(C, !0), a = C.concat(a), S(c, d);
                    } else T = p, b.html(d);
                    for (a.unshift(D), m = Z(a, T, c, f, b, w, g, h, k), n(e, function(a, c) {
                        a == T && (e[c] = b[0]);
                    }), t = O(b[0].childNodes, f); l.length; ) {
                        d = l.shift(), v = l.shift();
                        var ga = l.shift(), L = l.shift(), C = b[0];
                        if (!d.$$destroyed) {
                            if (v !== p) {
                                var q = v.className;
                                k.hasElementTranscludeDirective && w.replace || (C = Vb(T)), Y(ga, B(v), C), J(B(C), q);
                            }
                            v = m.transcludeOnThisElement ? R(d, m.transclude, L) : L, m(t, d, C, e, v);
                        }
                    }
                    l = null;
                }), function(a, b, c, d, e) {
                    a = e, b.$$destroyed || (l ? l.push(b, c, d, a) : (m.transcludeOnThisElement && (a = R(b, m.transclude, e)), 
                    m(t, b, c, d, a)));
                };
            }
            function Ia(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
            }
            function Ua(a, b, c, d) {
                function e(a) {
                    return a ? " (module: " + a + ")" : "";
                }
                if (b) throw ha("multidir", b.name, e(b.$$moduleName), c.name, e(c.$$moduleName), a, ua(d));
            }
            function N(a, c) {
                var d = b(c, !0);
                d && a.push({
                    priority: 0,
                    compile: function(a) {
                        a = a.parent();
                        var b = !!a.length;
                        return b && K.$$addBindingClass(a), function(a, c) {
                            var e = c.parent();
                            b || K.$$addBindingClass(e), K.$$addBindingInfo(e, d.expressions), a.$watch(d, function(a) {
                                c[0].nodeValue = a;
                            });
                        };
                    }
                });
            }
            function Yb(a, b) {
                switch (a = F(a || "html")) {
                  case "svg":
                  case "math":
                    var c = X.createElement("div");
                    return c.innerHTML = "<" + a + ">" + b + "</" + a + ">", c.childNodes[0].childNodes;

                  default:
                    return b;
                }
            }
            function Q(a, b) {
                if ("srcdoc" == b) return L.HTML;
                var c = ta(a);
                return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? L.RESOURCE_URL : void 0;
            }
            function W(a, c, d, e, f) {
                var g = Q(a, e);
                f = h[e] || f;
                var k = b(d, !0, g, f);
                if (k) {
                    if ("multiple" === e && "select" === ta(a)) throw ha("selmulti", ua(a));
                    c.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(a, c, h) {
                                    if (c = h.$$observers || (h.$$observers = $()), l.test(e)) throw ha("nodomevents");
                                    var m = h[e];
                                    m !== d && (k = m && b(m, !0, g, f), d = m), k && (h[e] = k(a), (c[e] || (c[e] = [])).$$inter = !0, 
                                    (h.$$observers && h.$$observers[e].$$scope || a).$watch(k, function(a, b) {
                                        "class" === e && a != b ? h.$updateClass(a, b) : h.$set(e, a);
                                    }));
                                }
                            };
                        }
                    });
                }
            }
            function Y(a, b, c) {
                var g, h, d = b[0], e = b.length, f = d.parentNode;
                if (a) for (g = 0, h = a.length; h > g; g++) if (a[g] == d) {
                    a[g++] = c, h = g + e - 1;
                    for (var k = a.length; k > g; g++, h++) k > h ? a[g] = a[h] : delete a[g];
                    a.length -= e - 1, a.context === d && (a.context = c);
                    break;
                }
                for (f && f.replaceChild(c, d), a = X.createDocumentFragment(), a.appendChild(d), 
                B.hasData(d) && (B.data(c, B.data(d)), oa ? (Rb = !0, oa.cleanData([ d ])) : delete B.cache[d[B.expando]]), 
                d = 1, e = b.length; e > d; d++) f = b[d], B(f).remove(), a.appendChild(f), delete b[d];
                b[0] = c, b.length = 1;
            }
            function ca(a, b) {
                return M(function() {
                    return a.apply(null, arguments);
                }, a, b);
            }
            function ea(a, b, d, e, f, g) {
                try {
                    a(b, d, e, f, g);
                } catch (h) {
                    c(h, ua(d));
                }
            }
            function ba(a, c, d, e, f) {
                var g = [];
                return n(e, function(e, h) {
                    var m, t, w, D, k = e.attrName, l = e.optional;
                    switch (e.mode) {
                      case "@":
                        l || qa.call(c, k) || (d[h] = c[k] = void 0), c.$observe(k, function(a) {
                            E(a) && (d[h] = a);
                        }), c.$$observers[k].$$scope = a, E(c[k]) && (d[h] = b(c[k])(a));
                        break;

                      case "=":
                        if (!qa.call(c, k)) {
                            if (l) break;
                            c[k] = void 0;
                        }
                        if (l && !c[k]) break;
                        t = p(c[k]), D = t.literal ? ma : function(a, b) {
                            return a === b || a !== a && b !== b;
                        }, w = t.assign || function() {
                            throw m = d[h] = t(a), ha("nonassign", c[k], f.name);
                        }, m = d[h] = t(a), l = function(b) {
                            return D(b, d[h]) || (D(b, m) ? w(a, b = d[h]) : d[h] = b), m = b;
                        }, l.$stateful = !0, l = e.collection ? a.$watchCollection(c[k], l) : a.$watch(p(c[k], l), null, t.literal), 
                        g.push(l);
                        break;

                      case "&":
                        if (t = c.hasOwnProperty(k) ? p(c[k]) : x, t === x && l) break;
                        d[h] = function(b) {
                            return t(a, b);
                        };
                    }
                }), g.length && function() {
                    for (var a = 0, b = g.length; b > a; ++a) g[a]();
                };
            }
            var fa = function(a, b) {
                if (b) {
                    var d, e, f, c = Object.keys(b);
                    for (d = 0, e = c.length; e > d; d++) f = c[d], this[f] = b[f];
                } else this.$attr = {};
                this.$$element = a;
            };
            fa.prototype = {
                $normalize: va,
                $addClass: function(a) {
                    a && 0 < a.length && aa.addClass(this.$$element, a);
                },
                $removeClass: function(a) {
                    a && 0 < a.length && aa.removeClass(this.$$element, a);
                },
                $updateClass: function(a, b) {
                    var c = Yc(a, b);
                    c && c.length && aa.addClass(this.$$element, c), (c = Yc(b, a)) && c.length && aa.removeClass(this.$$element, c);
                },
                $set: function(a, b, d, e) {
                    var f = Qc(this.$$element[0], a), g = Zc[a], h = a;
                    if (f ? (this.$$element.prop(a, b), e = f) : g && (this[g] = b, h = g), this[a] = b, 
                    e ? this.$attr[a] = e : (e = this.$attr[a]) || (this.$attr[a] = e = zc(a, "-")), 
                    f = ta(this.$$element), "a" === f && "href" === a || "img" === f && "src" === a) this[a] = b = D(b, "src" === a); else if ("img" === f && "srcset" === a) {
                        for (var f = "", g = U(b), k = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, k = /\s/.test(g) ? k : /(,)/, g = g.split(k), k = Math.floor(g.length / 2), l = 0; k > l; l++) var m = 2 * l, f = f + D(U(g[m]), !0), f = f + (" " + U(g[m + 1]));
                        g = U(g[2 * l]).split(/\s/), f += D(U(g[0]), !0), 2 === g.length && (f += " " + U(g[1])), 
                        this[a] = b = f;
                    }
                    !1 !== d && (null === b || q(b) ? this.$$element.removeAttr(e) : this.$$element.attr(e, b)), 
                    (a = this.$$observers) && n(a[h], function(a) {
                        try {
                            a(b);
                        } catch (d) {
                            c(d);
                        }
                    });
                },
                $observe: function(a, b) {
                    var c = this, d = c.$$observers || (c.$$observers = $()), e = d[a] || (d[a] = []);
                    return e.push(b), w.$evalAsync(function() {
                        e.$$inter || !c.hasOwnProperty(a) || q(c[a]) || b(c[a]);
                    }), function() {
                        ab(e, b);
                    };
                }
            };
            var da = b.startSymbol(), ia = b.endSymbol(), ja = "{{" == da || "}}" == ia ? Ya : function(a) {
                return a.replace(/\{\{/g, da).replace(/}}/g, ia);
            }, ka = /^ngAttr[A-Z]/, la = /^(.+)Start$/;
            return K.$$addBindingInfo = m ? function(a, b) {
                var c = a.data("$binding") || [];
                I(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c);
            } : x, K.$$addBindingClass = m ? function(a) {
                J(a, "ng-binding");
            } : x, K.$$addScopeInfo = m ? function(a, b, c, d) {
                a.data(c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope", b);
            } : x, K.$$addScopeClass = m ? function(a, b) {
                J(a, b ? "ng-isolate-scope" : "ng-scope");
            } : x, K;
        } ];
    }
    function va(a) {
        return fb(a.replace(Vc, ""));
    }
    function Yc(a, b) {
        var d = "", c = a.split(/\s+/), e = b.split(/\s+/), f = 0;
        a: for (;f < c.length; f++) {
            for (var g = c[f], h = 0; h < e.length; h++) if (g == e[h]) continue a;
            d += (0 < d.length ? " " : "") + g;
        }
        return d;
    }
    function Xc(a) {
        a = B(a);
        var b = a.length;
        if (1 >= b) return a;
        for (;b--; ) 8 === a[b].nodeType && Pf.call(a, b, 1);
        return a;
    }
    function Xe() {
        var a = {}, b = !1;
        this.register = function(b, c) {
            Ra(b, "controller"), H(b) ? M(a, b) : a[b] = c;
        }, this.allowGlobals = function() {
            b = !0;
        }, this.$get = [ "$injector", "$window", function(d, c) {
            function e(a, b, c, d) {
                if (!a || !H(a.$scope)) throw G("$controller")("noscp", d, b);
                a.$scope[b] = c;
            }
            return function(f, g, h, k) {
                var l, m, r;
                if (h = !0 === h, k && E(k) && (r = k), E(f)) {
                    if (k = f.match(Uc), !k) throw Qf("ctrlfmt", f);
                    m = k[1], r = r || k[3], f = a.hasOwnProperty(m) ? a[m] : Bc(g.$scope, m, !0) || (b ? Bc(c, m, !0) : u), 
                    Qa(f, m, !0);
                }
                return h ? (h = (I(f) ? f[f.length - 1] : f).prototype, l = Object.create(h || null), 
                r && e(g, r, l, m || f.name), M(function() {
                    var a = d.invoke(f, l, g, m);
                    return a !== l && (H(a) || z(a)) && (l = a, r && e(g, r, l, m || f.name)), l;
                }, {
                    instance: l,
                    identifier: r
                })) : (l = d.instantiate(f, g, m), r && e(g, r, l, m || f.name), l);
            };
        } ];
    }
    function Ye() {
        this.$get = [ "$window", function(a) {
            return B(a.document);
        } ];
    }
    function Ze() {
        this.$get = [ "$log", function(a) {
            return function(b, d) {
                a.error.apply(a, arguments);
            };
        } ];
    }
    function Zb(a) {
        return H(a) ? da(a) ? a.toISOString() : db(a) : a;
    }
    function df() {
        this.$get = function() {
            return function(a) {
                if (!a) return "";
                var b = [];
                return oc(a, function(a, c) {
                    null === a || q(a) || (I(a) ? n(a, function(a, d) {
                        b.push(ja(c) + "=" + ja(Zb(a)));
                    }) : b.push(ja(c) + "=" + ja(Zb(a))));
                }), b.join("&");
            };
        };
    }
    function ef() {
        this.$get = function() {
            return function(a) {
                function b(a, e, f) {
                    null === a || q(a) || (I(a) ? n(a, function(a, c) {
                        b(a, e + "[" + (H(a) ? c : "") + "]");
                    }) : H(a) && !da(a) ? oc(a, function(a, c) {
                        b(a, e + (f ? "" : "[") + c + (f ? "" : "]"));
                    }) : d.push(ja(e) + "=" + ja(Zb(a))));
                }
                if (!a) return "";
                var d = [];
                return b(a, "", !0), d.join("&");
            };
        };
    }
    function $b(a, b) {
        if (E(a)) {
            var d = a.replace(Rf, "").trim();
            if (d) {
                var c = b("Content-Type");
                (c = c && 0 === c.indexOf($c)) || (c = (c = d.match(Sf)) && Tf[c[0]].test(d)), c && (a = uc(d));
            }
        }
        return a;
    }
    function ad(a) {
        var d, b = $();
        return E(a) ? n(a.split("\n"), function(a) {
            d = a.indexOf(":");
            var e = F(U(a.substr(0, d)));
            a = U(a.substr(d + 1)), e && (b[e] = b[e] ? b[e] + ", " + a : a);
        }) : H(a) && n(a, function(a, d) {
            var f = F(d), g = U(a);
            f && (b[f] = b[f] ? b[f] + ", " + g : g);
        }), b;
    }
    function bd(a) {
        var b;
        return function(d) {
            return b || (b = ad(a)), d ? (d = b[F(d)], void 0 === d && (d = null), d) : b;
        };
    }
    function cd(a, b, d, c) {
        return z(c) ? c(a, b, d) : (n(c, function(c) {
            a = c(a, b, d);
        }), a);
    }
    function cf() {
        var a = this.defaults = {
            transformResponse: [ $b ],
            transformRequest: [ function(a) {
                return H(a) && "[object File]" !== sa.call(a) && "[object Blob]" !== sa.call(a) && "[object FormData]" !== sa.call(a) ? db(a) : a;
            } ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: ia(ac),
                put: ia(ac),
                patch: ia(ac)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            paramSerializer: "$httpParamSerializer"
        }, b = !1;
        this.useApplyAsync = function(a) {
            return y(a) ? (b = !!a, this) : b;
        };
        var d = !0;
        this.useLegacyPromiseExtensions = function(a) {
            return y(a) ? (d = !!a, this) : d;
        };
        var c = this.interceptors = [];
        this.$get = [ "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(e, f, g, h, k, l) {
            function m(b) {
                function c(a) {
                    var b = M({}, a);
                    return b.data = cd(a.data, a.headers, a.status, f.transformResponse), a = a.status, 
                    a >= 200 && 300 > a ? b : k.reject(b);
                }
                function e(a, b) {
                    var c, d = {};
                    return n(a, function(a, e) {
                        z(a) ? (c = a(b), null != c && (d[e] = c)) : d[e] = a;
                    }), d;
                }
                if (!fa.isObject(b)) throw G("$http")("badreq", b);
                var f = M({
                    method: "get",
                    transformRequest: a.transformRequest,
                    transformResponse: a.transformResponse,
                    paramSerializer: a.paramSerializer
                }, b);
                f.headers = function(b) {
                    var f, g, h, c = a.headers, d = M({}, b.headers), c = M({}, c.common, c[F(b.method)]);
                    a: for (f in c) {
                        g = F(f);
                        for (h in d) if (F(h) === g) continue a;
                        d[f] = c[f];
                    }
                    return e(d, ia(b));
                }(b), f.method = sb(f.method), f.paramSerializer = E(f.paramSerializer) ? l.get(f.paramSerializer) : f.paramSerializer;
                var g = [ function(b) {
                    var d = b.headers, e = cd(b.data, bd(d), u, b.transformRequest);
                    return q(e) && n(d, function(a, b) {
                        "content-type" === F(b) && delete d[b];
                    }), q(b.withCredentials) && !q(a.withCredentials) && (b.withCredentials = a.withCredentials), 
                    r(b, e).then(c, c);
                }, u ], h = k.when(f);
                for (n(v, function(a) {
                    (a.request || a.requestError) && g.unshift(a.request, a.requestError), (a.response || a.responseError) && g.push(a.response, a.responseError);
                }); g.length; ) {
                    b = g.shift();
                    var m = g.shift(), h = h.then(b, m);
                }
                return d ? (h.success = function(a) {
                    return Qa(a, "fn"), h.then(function(b) {
                        a(b.data, b.status, b.headers, f);
                    }), h;
                }, h.error = function(a) {
                    return Qa(a, "fn"), h.then(null, function(b) {
                        a(b.data, b.status, b.headers, f);
                    }), h;
                }) : (h.success = dd("success"), h.error = dd("error")), h;
            }
            function r(c, d) {
                function g(a, c, d, e) {
                    function f() {
                        l(c, a, d, e);
                    }
                    J && (a >= 200 && 300 > a ? J.put(R, [ a, c, ad(d), e ]) : J.remove(R)), b ? h.$applyAsync(f) : (f(), 
                    h.$$phase || h.$apply());
                }
                function l(a, b, d, e) {
                    b = b >= -1 ? b : 0, (b >= 200 && 300 > b ? n.resolve : n.reject)({
                        data: a,
                        status: b,
                        headers: bd(d),
                        config: c,
                        statusText: e
                    });
                }
                function r(a) {
                    l(a.data, a.status, ia(a.headers()), a.statusText);
                }
                function v() {
                    var a = m.pendingRequests.indexOf(c);
                    -1 !== a && m.pendingRequests.splice(a, 1);
                }
                var J, K, n = k.defer(), D = n.promise, O = c.headers, R = t(c.url, c.paramSerializer(c.params));
                return m.pendingRequests.push(c), D.then(v, v), !c.cache && !a.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (J = H(c.cache) ? c.cache : H(a.cache) ? a.cache : A), 
                J && (K = J.get(R), y(K) ? K && z(K.then) ? K.then(r, r) : I(K) ? l(K[1], K[0], ia(K[2]), K[3]) : l(K, 200, {}, "OK") : J.put(R, D)), 
                q(K) && ((K = ed(c.url) ? f()[c.xsrfCookieName || a.xsrfCookieName] : u) && (O[c.xsrfHeaderName || a.xsrfHeaderName] = K), 
                e(c.method, R, d, g, O, c.timeout, c.withCredentials, c.responseType)), D;
            }
            function t(a, b) {
                return 0 < b.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + b), a;
            }
            var A = g("$http");
            a.paramSerializer = E(a.paramSerializer) ? l.get(a.paramSerializer) : a.paramSerializer;
            var v = [];
            return n(c, function(a) {
                v.unshift(E(a) ? l.get(a) : l.invoke(a));
            }), m.pendingRequests = [], function(a) {
                n(arguments, function(a) {
                    m[a] = function(b, c) {
                        return m(M({}, c || {}, {
                            method: a,
                            url: b
                        }));
                    };
                });
            }("get", "delete", "head", "jsonp"), function(a) {
                n(arguments, function(a) {
                    m[a] = function(b, c, d) {
                        return m(M({}, d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }));
                    };
                });
            }("post", "put", "patch"), m.defaults = a, m;
        } ];
    }
    function gf() {
        this.$get = function() {
            return function() {
                return new S.XMLHttpRequest();
            };
        };
    }
    function ff() {
        this.$get = [ "$browser", "$window", "$document", "$xhrFactory", function(a, b, d, c) {
            return Uf(a, c, a.defer, b.angular.callbacks, d[0]);
        } ];
    }
    function Uf(a, b, d, c, e) {
        function f(a, b, d) {
            var f = e.createElement("script"), m = null;
            return f.type = "text/javascript", f.src = a, f.async = !0, m = function(a) {
                f.removeEventListener("load", m, !1), f.removeEventListener("error", m, !1), e.body.removeChild(f), 
                f = null;
                var g = -1, A = "unknown";
                a && ("load" !== a.type || c[b].called || (a = {
                    type: "error"
                }), A = a.type, g = "error" === a.type ? 404 : 200), d && d(g, A);
            }, f.addEventListener("load", m, !1), f.addEventListener("error", m, !1), e.body.appendChild(f), 
            m;
        }
        return function(e, h, k, l, m, r, t, A) {
            function v() {
                C && C(), w && w.abort();
            }
            function T(b, c, e, f, g) {
                y(L) && d.cancel(L), C = w = null, b(c, e, f, g), a.$$completeOutstandingRequest(x);
            }
            if (a.$$incOutstandingRequestCount(), h = h || a.url(), "jsonp" == F(e)) {
                var p = "_" + (c.counter++).toString(36);
                c[p] = function(a) {
                    c[p].data = a, c[p].called = !0;
                };
                var C = f(h.replace("JSON_CALLBACK", "angular.callbacks." + p), p, function(a, b) {
                    T(l, a, c[p].data, "", b), c[p] = x;
                });
            } else {
                var w = b(e, h);
                if (w.open(e, h, !0), n(m, function(a, b) {
                    y(a) && w.setRequestHeader(b, a);
                }), w.onload = function() {
                    var a = w.statusText || "", b = "response" in w ? w.response : w.responseText, c = 1223 === w.status ? 204 : w.status;
                    0 === c && (c = b ? 200 : "file" == wa(h).protocol ? 404 : 0), T(l, c, b, w.getAllResponseHeaders(), a);
                }, e = function() {
                    T(l, -1, null, null, "");
                }, w.onerror = e, w.onabort = e, t && (w.withCredentials = !0), A) try {
                    w.responseType = A;
                } catch (ga) {
                    if ("json" !== A) throw ga;
                }
                w.send(q(k) ? null : k);
            }
            if (r > 0) var L = d(v, r); else r && z(r.then) && r.then(v);
        };
    }
    function af() {
        var a = "{{", b = "}}";
        this.startSymbol = function(b) {
            return b ? (a = b, this) : a;
        }, this.endSymbol = function(a) {
            return a ? (b = a, this) : b;
        }, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(d, c, e) {
            function f(a) {
                return "\\\\\\" + a;
            }
            function g(c) {
                return c.replace(m, a).replace(r, b);
            }
            function h(f, h, m, r) {
                function p(a) {
                    try {
                        var b = a;
                        a = m ? e.getTrusted(m, b) : e.valueOf(b);
                        var d;
                        if (r && !y(a)) d = a; else if (null == a) d = ""; else {
                            switch (typeof a) {
                              case "string":
                                break;

                              case "number":
                                a = "" + a;
                                break;

                              default:
                                a = db(a);
                            }
                            d = a;
                        }
                        return d;
                    } catch (g) {
                        c(Ja.interr(f, g));
                    }
                }
                r = !!r;
                for (var C, w, n = 0, L = [], s = [], D = f.length, J = [], K = []; D > n; ) {
                    if (-1 == (C = f.indexOf(a, n)) || -1 == (w = f.indexOf(b, C + k))) {
                        n !== D && J.push(g(f.substring(n)));
                        break;
                    }
                    n !== C && J.push(g(f.substring(n, C))), n = f.substring(C + k, w), L.push(n), s.push(d(n, p)), 
                    n = w + l, K.push(J.length), J.push("");
                }
                if (m && 1 < J.length && Ja.throwNoconcat(f), !h || L.length) {
                    var O = function(a) {
                        for (var b = 0, c = L.length; c > b; b++) {
                            if (r && q(a[b])) return;
                            J[K[b]] = a[b];
                        }
                        return J.join("");
                    };
                    return M(function(a) {
                        var b = 0, d = L.length, e = Array(d);
                        try {
                            for (;d > b; b++) e[b] = s[b](a);
                            return O(e);
                        } catch (g) {
                            c(Ja.interr(f, g));
                        }
                    }, {
                        exp: f,
                        expressions: L,
                        $$watchDelegate: function(a, b) {
                            var c;
                            return a.$watchGroup(s, function(d, e) {
                                var f = O(d);
                                z(b) && b.call(this, f, d !== e ? c : f, a), c = f;
                            });
                        }
                    });
                }
            }
            var k = a.length, l = b.length, m = new RegExp(a.replace(/./g, f), "g"), r = new RegExp(b.replace(/./g, f), "g");
            return h.startSymbol = function() {
                return a;
            }, h.endSymbol = function() {
                return b;
            }, h;
        } ];
    }
    function bf() {
        this.$get = [ "$rootScope", "$window", "$q", "$$q", function(a, b, d, c) {
            function e(e, h, k, l) {
                var m = 4 < arguments.length, r = m ? ra.call(arguments, 4) : [], t = b.setInterval, A = b.clearInterval, v = 0, n = y(l) && !l, p = (n ? c : d).defer(), C = p.promise;
                return k = y(k) ? k : 0, C.then(null, null, m ? function() {
                    e.apply(null, r);
                } : e), C.$$intervalId = t(function() {
                    p.notify(v++), k > 0 && v >= k && (p.resolve(v), A(C.$$intervalId), delete f[C.$$intervalId]), 
                    n || a.$apply();
                }, h), f[C.$$intervalId] = p, C;
            }
            var f = {};
            return e.cancel = function(a) {
                return a && a.$$intervalId in f ? (f[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), 
                delete f[a.$$intervalId], !0) : !1;
            }, e;
        } ];
    }
    function bc(a) {
        a = a.split("/");
        for (var b = a.length; b--; ) a[b] = ob(a[b]);
        return a.join("/");
    }
    function fd(a, b) {
        var d = wa(a);
        b.$$protocol = d.protocol, b.$$host = d.hostname, b.$$port = ea(d.port) || Vf[d.protocol] || null;
    }
    function gd(a, b) {
        var d = "/" !== a.charAt(0);
        d && (a = "/" + a);
        var c = wa(a);
        b.$$path = decodeURIComponent(d && "/" === c.pathname.charAt(0) ? c.pathname.substring(1) : c.pathname), 
        b.$$search = xc(c.search), b.$$hash = decodeURIComponent(c.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path);
    }
    function pa(a, b) {
        return 0 === b.indexOf(a) ? b.substr(a.length) : void 0;
    }
    function Fa(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b);
    }
    function ib(a) {
        return a.replace(/(#.+)|#$/, "$1");
    }
    function cc(a, b, d) {
        this.$$html5 = !0, d = d || "", fd(a, this), this.$$parse = function(a) {
            var d = pa(b, a);
            if (!E(d)) throw Db("ipthprfx", a, b);
            gd(d, this), this.$$path || (this.$$path = "/"), this.$$compose();
        }, this.$$compose = function() {
            var a = Qb(this.$$search), d = this.$$hash ? "#" + ob(this.$$hash) : "";
            this.$$url = bc(this.$$path) + (a ? "?" + a : "") + d, this.$$absUrl = b + this.$$url.substr(1);
        }, this.$$parseLinkUrl = function(c, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            return y(f = pa(a, c)) ? (g = f, g = y(f = pa(d, f)) ? b + (pa("/", f) || f) : a + g) : y(f = pa(b, c)) ? g = b + f : b == c + "/" && (g = b), 
            g && this.$$parse(g), !!g;
        };
    }
    function dc(a, b, d) {
        fd(a, this), this.$$parse = function(c) {
            var f, e = pa(a, c) || pa(b, c);
            q(e) || "#" !== e.charAt(0) ? this.$$html5 ? f = e : (f = "", q(e) && (a = c, this.replace())) : (f = pa(d, e), 
            q(f) && (f = e)), gd(f, this), c = this.$$path;
            var e = a, g = /^\/[A-Z]:(\/.*)/;
            0 === f.indexOf(e) && (f = f.replace(e, "")), g.exec(f) || (c = (f = g.exec(c)) ? f[1] : c), 
            this.$$path = c, this.$$compose();
        }, this.$$compose = function() {
            var b = Qb(this.$$search), e = this.$$hash ? "#" + ob(this.$$hash) : "";
            this.$$url = bc(this.$$path) + (b ? "?" + b : "") + e, this.$$absUrl = a + (this.$$url ? d + this.$$url : "");
        }, this.$$parseLinkUrl = function(b, d) {
            return Fa(a) == Fa(b) ? (this.$$parse(b), !0) : !1;
        };
    }
    function hd(a, b, d) {
        this.$$html5 = !0, dc.apply(this, arguments), this.$$parseLinkUrl = function(c, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            return a == Fa(c) ? f = c : (g = pa(b, c)) ? f = a + d + g : b === c + "/" && (f = b), 
            f && this.$$parse(f), !!f;
        }, this.$$compose = function() {
            var b = Qb(this.$$search), e = this.$$hash ? "#" + ob(this.$$hash) : "";
            this.$$url = bc(this.$$path) + (b ? "?" + b : "") + e, this.$$absUrl = a + d + this.$$url;
        };
    }
    function Eb(a) {
        return function() {
            return this[a];
        };
    }
    function id(a, b) {
        return function(d) {
            return q(d) ? this[a] : (this[a] = b(d), this.$$compose(), this);
        };
    }
    function hf() {
        var a = "", b = {
            enabled: !1,
            requireBase: !0,
            rewriteLinks: !0
        };
        this.hashPrefix = function(b) {
            return y(b) ? (a = b, this) : a;
        }, this.html5Mode = function(a) {
            return $a(a) ? (b.enabled = a, this) : H(a) ? ($a(a.enabled) && (b.enabled = a.enabled), 
            $a(a.requireBase) && (b.requireBase = a.requireBase), $a(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), 
            this) : b;
        }, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(d, c, e, f, g) {
            function h(a, b, d) {
                var e = l.url(), f = l.$$state;
                try {
                    c.url(a, b, d), l.$$state = c.state();
                } catch (g) {
                    throw l.url(e), l.$$state = f, g;
                }
            }
            function k(a, b) {
                d.$broadcast("$locationChangeSuccess", l.absUrl(), a, l.$$state, b);
            }
            var l, m;
            m = c.baseHref();
            var t, r = c.url();
            if (b.enabled) {
                if (!m && b.requireBase) throw Db("nobase");
                t = r.substring(0, r.indexOf("/", r.indexOf("//") + 2)) + (m || "/"), m = e.history ? cc : hd;
            } else t = Fa(r), m = dc;
            var A = t.substr(0, Fa(t).lastIndexOf("/") + 1);
            l = new m(t, A, "#" + a), l.$$parseLinkUrl(r, r), l.$$state = c.state();
            var v = /^\s*(javascript|mailto):/i;
            f.on("click", function(a) {
                if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
                    for (var e = B(a.target); "a" !== ta(e[0]); ) if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href"), k = e.attr("href") || e.attr("xlink:href");
                    H(h) && "[object SVGAnimatedString]" === h.toString() && (h = wa(h.animVal).href), 
                    v.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || !l.$$parseLinkUrl(h, k) || (a.preventDefault(), 
                    l.absUrl() != c.url() && (d.$apply(), g.angular["ff-684208-preventDefault"] = !0));
                }
            }), ib(l.absUrl()) != ib(r) && c.url(l.absUrl(), !0);
            var n = !0;
            return c.onUrlChange(function(a, b) {
                q(pa(A, a)) ? g.location.href = a : (d.$evalAsync(function() {
                    var f, c = l.absUrl(), e = l.$$state;
                    a = ib(a), l.$$parse(a), l.$$state = b, f = d.$broadcast("$locationChangeStart", a, c, b, e).defaultPrevented, 
                    l.absUrl() === a && (f ? (l.$$parse(c), l.$$state = e, h(c, !1, e)) : (n = !1, k(c, e)));
                }), d.$$phase || d.$digest());
            }), d.$watch(function() {
                var a = ib(c.url()), b = ib(l.absUrl()), f = c.state(), g = l.$$replace, m = a !== b || l.$$html5 && e.history && f !== l.$$state;
                (n || m) && (n = !1, d.$evalAsync(function() {
                    var b = l.absUrl(), c = d.$broadcast("$locationChangeStart", b, a, l.$$state, f).defaultPrevented;
                    l.absUrl() === b && (c ? (l.$$parse(a), l.$$state = f) : (m && h(b, g, f === l.$$state ? null : l.$$state), 
                    k(a, f)));
                })), l.$$replace = !1;
            }), l;
        } ];
    }
    function jf() {
        var a = !0, b = this;
        this.debugEnabled = function(b) {
            return y(b) ? (a = b, this) : a;
        }, this.$get = [ "$window", function(d) {
            function c(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), 
                a;
            }
            function e(a) {
                var b = d.console || {}, e = b[a] || b.log || x;
                a = !1;
                try {
                    a = !!e.apply;
                } catch (k) {}
                return a ? function() {
                    var a = [];
                    return n(arguments, function(b) {
                        a.push(c(b));
                    }), e.apply(b, a);
                } : function(a, b) {
                    e(a, null == b ? "" : b);
                };
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        a && c.apply(b, arguments);
                    };
                }()
            };
        } ];
    }
    function Va(a, b) {
        if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ba("isecfld", b);
        return a;
    }
    function jd(a, b) {
        if (a += "", !E(a)) throw ba("iseccst", b);
        return a;
    }
    function xa(a, b) {
        if (a) {
            if (a.constructor === a) throw ba("isecfn", b);
            if (a.window === a) throw ba("isecwindow", b);
            if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw ba("isecdom", b);
            if (a === Object) throw ba("isecobj", b);
        }
        return a;
    }
    function kd(a, b) {
        if (a) {
            if (a.constructor === a) throw ba("isecfn", b);
            if (a === Wf || a === Xf || a === Yf) throw ba("isecff", b);
        }
    }
    function ld(a, b) {
        if (a && (a === 0..constructor || a === (!1).constructor || a === "".constructor || a === {}.constructor || a === [].constructor || a === Function.constructor)) throw ba("isecaf", b);
    }
    function Zf(a, b) {
        return "undefined" != typeof a ? a : b;
    }
    function md(a, b) {
        return "undefined" == typeof a ? b : "undefined" == typeof b ? a : a + b;
    }
    function W(a, b) {
        var d, c;
        switch (a.type) {
          case s.Program:
            d = !0, n(a.body, function(a) {
                W(a.expression, b), d = d && a.expression.constant;
            }), a.constant = d;
            break;

          case s.Literal:
            a.constant = !0, a.toWatch = [];
            break;

          case s.UnaryExpression:
            W(a.argument, b), a.constant = a.argument.constant, a.toWatch = a.argument.toWatch;
            break;

          case s.BinaryExpression:
            W(a.left, b), W(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = a.left.toWatch.concat(a.right.toWatch);
            break;

          case s.LogicalExpression:
            W(a.left, b), W(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = a.constant ? [] : [ a ];
            break;

          case s.ConditionalExpression:
            W(a.test, b), W(a.alternate, b), W(a.consequent, b), a.constant = a.test.constant && a.alternate.constant && a.consequent.constant, 
            a.toWatch = a.constant ? [] : [ a ];
            break;

          case s.Identifier:
            a.constant = !1, a.toWatch = [ a ];
            break;

          case s.MemberExpression:
            W(a.object, b), a.computed && W(a.property, b), a.constant = a.object.constant && (!a.computed || a.property.constant), 
            a.toWatch = [ a ];
            break;

          case s.CallExpression:
            d = a.filter ? !b(a.callee.name).$stateful : !1, c = [], n(a.arguments, function(a) {
                W(a, b), d = d && a.constant, a.constant || c.push.apply(c, a.toWatch);
            }), a.constant = d, a.toWatch = a.filter && !b(a.callee.name).$stateful ? c : [ a ];
            break;

          case s.AssignmentExpression:
            W(a.left, b), W(a.right, b), a.constant = a.left.constant && a.right.constant, a.toWatch = [ a ];
            break;

          case s.ArrayExpression:
            d = !0, c = [], n(a.elements, function(a) {
                W(a, b), d = d && a.constant, a.constant || c.push.apply(c, a.toWatch);
            }), a.constant = d, a.toWatch = c;
            break;

          case s.ObjectExpression:
            d = !0, c = [], n(a.properties, function(a) {
                W(a.value, b), d = d && a.value.constant, a.value.constant || c.push.apply(c, a.value.toWatch);
            }), a.constant = d, a.toWatch = c;
            break;

          case s.ThisExpression:
            a.constant = !1, a.toWatch = [];
        }
    }
    function nd(a) {
        if (1 == a.length) {
            a = a[0].expression;
            var b = a.toWatch;
            return 1 !== b.length ? b : b[0] !== a ? b : u;
        }
    }
    function od(a) {
        return a.type === s.Identifier || a.type === s.MemberExpression;
    }
    function pd(a) {
        return 1 === a.body.length && od(a.body[0].expression) ? {
            type: s.AssignmentExpression,
            left: a.body[0].expression,
            right: {
                type: s.NGValueParameter
            },
            operator: "="
        } : void 0;
    }
    function qd(a) {
        return 0 === a.body.length || 1 === a.body.length && (a.body[0].expression.type === s.Literal || a.body[0].expression.type === s.ArrayExpression || a.body[0].expression.type === s.ObjectExpression);
    }
    function rd(a, b) {
        this.astBuilder = a, this.$filter = b;
    }
    function sd(a, b) {
        this.astBuilder = a, this.$filter = b;
    }
    function Fb(a) {
        return "constructor" == a;
    }
    function ec(a) {
        return z(a.valueOf) ? a.valueOf() : $f.call(a);
    }
    function kf() {
        var a = $(), b = $();
        this.$get = [ "$filter", function(d) {
            function c(a, b) {
                return null == a || null == b ? a === b : "object" == typeof a && (a = ec(a), "object" == typeof a) ? !1 : a === b || a !== a && b !== b;
            }
            function e(a, b, d, e, f) {
                var h, g = e.inputs;
                if (1 === g.length) {
                    var k = c, g = g[0];
                    return a.$watch(function(a) {
                        var b = g(a);
                        return c(b, k) || (h = e(a, u, u, [ b ]), k = b && ec(b)), h;
                    }, b, d, f);
                }
                for (var l = [], m = [], r = 0, n = g.length; n > r; r++) l[r] = c, m[r] = null;
                return a.$watch(function(a) {
                    for (var b = !1, d = 0, f = g.length; f > d; d++) {
                        var k = g[d](a);
                        (b || (b = !c(k, l[d]))) && (m[d] = k, l[d] = k && ec(k));
                    }
                    return b && (h = e(a, u, u, m)), h;
                }, b, d, f);
            }
            function f(a, b, c, d) {
                var e, f;
                return e = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    f = a, z(b) && b.apply(this, arguments), y(a) && d.$$postDigest(function() {
                        y(f) && e();
                    });
                }, c);
            }
            function g(a, b, c, d) {
                function e(a) {
                    var b = !0;
                    return n(a, function(a) {
                        y(a) || (b = !1);
                    }), b;
                }
                var f, g;
                return f = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    g = a, z(b) && b.call(this, a, c, d), e(a) && d.$$postDigest(function() {
                        e(g) && f();
                    });
                }, c);
            }
            function h(a, b, c, d) {
                var e;
                return e = a.$watch(function(a) {
                    return d(a);
                }, function(a, c, d) {
                    z(b) && b.apply(this, arguments), e();
                }, c);
            }
            function k(a, b) {
                if (!b) return a;
                var c = a.$$watchDelegate, d = !1, c = c !== g && c !== f ? function(c, e, f, g) {
                    return f = d && g ? g[0] : a(c, e, f, g), b(f, c, e);
                } : function(c, d, e, f) {
                    return e = a(c, d, e, f), c = b(e, c, d), y(e) ? c : e;
                };
                return a.$$watchDelegate && a.$$watchDelegate !== e ? c.$$watchDelegate = a.$$watchDelegate : b.$stateful || (c.$$watchDelegate = e, 
                d = !a.inputs, c.inputs = a.inputs ? a.inputs : [ a ]), c;
            }
            var l = Ba().noUnsafeEval, m = {
                csp: l,
                expensiveChecks: !1
            }, r = {
                csp: l,
                expensiveChecks: !0
            };
            return function(c, l, v) {
                var n, p, q;
                switch (typeof c) {
                  case "string":
                    q = c = c.trim();
                    var w = v ? b : a;
                    return n = w[q], n || (":" === c.charAt(0) && ":" === c.charAt(1) && (p = !0, c = c.substring(2)), 
                    v = v ? r : m, n = new fc(v), n = new gc(n, d, v).parse(c), n.constant ? n.$$watchDelegate = h : p ? n.$$watchDelegate = n.literal ? g : f : n.inputs && (n.$$watchDelegate = e), 
                    w[q] = n), k(n, l);

                  case "function":
                    return k(c, l);

                  default:
                    return x;
                }
            };
        } ];
    }
    function mf() {
        this.$get = [ "$rootScope", "$exceptionHandler", function(a, b) {
            return td(function(b) {
                a.$evalAsync(b);
            }, b);
        } ];
    }
    function nf() {
        this.$get = [ "$browser", "$exceptionHandler", function(a, b) {
            return td(function(b) {
                a.defer(b);
            }, b);
        } ];
    }
    function td(a, b) {
        function d(a, b, c) {
            function d(b) {
                return function(c) {
                    e || (e = !0, b.call(a, c));
                };
            }
            var e = !1;
            return [ d(b), d(c) ];
        }
        function c() {
            this.$$state = {
                status: 0
            };
        }
        function e(a, b) {
            return function(c) {
                b.call(a, c);
            };
        }
        function f(c) {
            !c.processScheduled && c.pending && (c.processScheduled = !0, a(function() {
                var a, d, e;
                e = c.pending, c.processScheduled = !1, c.pending = u;
                for (var f = 0, g = e.length; g > f; ++f) {
                    d = e[f][0], a = e[f][c.status];
                    try {
                        z(a) ? d.resolve(a(c.value)) : 1 === c.status ? d.resolve(c.value) : d.reject(c.value);
                    } catch (h) {
                        d.reject(h), b(h);
                    }
                }
            }));
        }
        function g() {
            this.promise = new c(), this.resolve = e(this, this.resolve), this.reject = e(this, this.reject), 
            this.notify = e(this, this.notify);
        }
        var h = G("$q", TypeError);
        M(c.prototype, {
            then: function(a, b, c) {
                if (q(a) && q(b) && q(c)) return this;
                var d = new g();
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ d, a, b, c ]), 
                0 < this.$$state.status && f(this.$$state), d.promise;
            },
            "catch": function(a) {
                return this.then(null, a);
            },
            "finally": function(a, b) {
                return this.then(function(b) {
                    return l(b, !0, a);
                }, function(b) {
                    return l(b, !1, a);
                }, b);
            }
        }), M(g.prototype, {
            resolve: function(a) {
                this.promise.$$state.status || (a === this.promise ? this.$$reject(h("qcycle", a)) : this.$$resolve(a));
            },
            $$resolve: function(a) {
                var c, e;
                e = d(this, this.$$resolve, this.$$reject);
                try {
                    (H(a) || z(a)) && (c = a && a.then), z(c) ? (this.promise.$$state.status = -1, c.call(a, e[0], e[1], this.notify)) : (this.promise.$$state.value = a, 
                    this.promise.$$state.status = 1, f(this.promise.$$state));
                } catch (g) {
                    e[1](g), b(g);
                }
            },
            reject: function(a) {
                this.promise.$$state.status || this.$$reject(a);
            },
            $$reject: function(a) {
                this.promise.$$state.value = a, this.promise.$$state.status = 2, f(this.promise.$$state);
            },
            notify: function(c) {
                var d = this.promise.$$state.pending;
                0 >= this.promise.$$state.status && d && d.length && a(function() {
                    for (var a, e, f = 0, g = d.length; g > f; f++) {
                        e = d[f][0], a = d[f][3];
                        try {
                            e.notify(z(a) ? a(c) : c);
                        } catch (h) {
                            b(h);
                        }
                    }
                });
            }
        });
        var k = function(a, b) {
            var c = new g();
            return b ? c.resolve(a) : c.reject(a), c.promise;
        }, l = function(a, b, c) {
            var d = null;
            try {
                z(c) && (d = c());
            } catch (e) {
                return k(e, !1);
            }
            return d && z(d.then) ? d.then(function() {
                return k(a, b);
            }, function(a) {
                return k(a, !1);
            }) : k(a, b);
        }, m = function(a, b, c, d) {
            var e = new g();
            return e.resolve(a), e.promise.then(b, c, d);
        }, r = function A(a) {
            if (!z(a)) throw h("norslvr", a);
            if (!(this instanceof A)) return new A(a);
            var b = new g();
            return a(function(a) {
                b.resolve(a);
            }, function(a) {
                b.reject(a);
            }), b.promise;
        };
        return r.defer = function() {
            return new g();
        }, r.reject = function(a) {
            var b = new g();
            return b.reject(a), b.promise;
        }, r.when = m, r.resolve = m, r.all = function(a) {
            var b = new g(), c = 0, d = I(a) ? [] : {};
            return n(a, function(a, e) {
                c++, m(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
                }, function(a) {
                    d.hasOwnProperty(e) || b.reject(a);
                });
            }), 0 === c && b.resolve(d), b.promise;
        }, r;
    }
    function wf() {
        this.$get = [ "$window", "$timeout", function(a, b) {
            var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame, c = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame, e = !!d, f = e ? function(a) {
                var b = d(a);
                return function() {
                    c(b);
                };
            } : function(a) {
                var c = b(a, 16.66, !1);
                return function() {
                    b.cancel(c);
                };
            };
            return f.supported = e, f;
        } ];
    }
    function lf() {
        function a(a) {
            function b() {
                this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
                this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = ++nb, 
                this.$$ChildScope = null;
            }
            return b.prototype = a, b;
        }
        var b = 10, d = G("$rootScope"), c = null, e = null;
        this.digestTtl = function(a) {
            return arguments.length && (b = a), b;
        }, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(f, g, h, k) {
            function l(a) {
                a.currentScope.$$destroyed = !0;
            }
            function m(a) {
                9 === Ha && (a.$$childHead && m(a.$$childHead), a.$$nextSibling && m(a.$$nextSibling)), 
                a.$parent = a.$$nextSibling = a.$$prevSibling = a.$$childHead = a.$$childTail = a.$root = a.$$watchers = null;
            }
            function r() {
                this.$id = ++nb, this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
                this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
                this.$$watchersCount = 0, this.$$isolateBindings = null;
            }
            function t(a) {
                if (w.$$phase) throw d("inprog", w.$$phase);
                w.$$phase = a;
            }
            function A(a, b) {
                do a.$$watchersCount += b; while (a = a.$parent);
            }
            function v(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent);
            }
            function s() {}
            function p() {
                for (;aa.length; ) try {
                    aa.shift()();
                } catch (a) {
                    g(a);
                }
                e = null;
            }
            function C() {
                null === e && (e = k.defer(function() {
                    w.$apply(p);
                }));
            }
            r.prototype = {
                constructor: r,
                $new: function(b, c) {
                    var d;
                    return c = c || this, b ? (d = new r(), d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = a(this)), 
                    d = new this.$$ChildScope()), d.$parent = c, d.$$prevSibling = c.$$childTail, c.$$childHead ? (c.$$childTail.$$nextSibling = d, 
                    c.$$childTail = d) : c.$$childHead = c.$$childTail = d, (b || c != this) && d.$on("$destroy", l), 
                    d;
                },
                $watch: function(a, b, d, e) {
                    var f = h(a);
                    if (f.$$watchDelegate) return f.$$watchDelegate(this, b, d, f, a);
                    var g = this, k = g.$$watchers, l = {
                        fn: b,
                        last: s,
                        get: f,
                        exp: e || a,
                        eq: !!d
                    };
                    return c = null, z(b) || (l.fn = x), k || (k = g.$$watchers = []), k.unshift(l), 
                    A(this, 1), function() {
                        0 <= ab(k, l) && A(g, -1), c = null;
                    };
                },
                $watchGroup: function(a, b) {
                    function c() {
                        h = !1, k ? (k = !1, b(e, e, g)) : b(e, d, g);
                    }
                    var d = Array(a.length), e = Array(a.length), f = [], g = this, h = !1, k = !0;
                    if (!a.length) {
                        var l = !0;
                        return g.$evalAsync(function() {
                            l && b(e, e, g);
                        }), function() {
                            l = !1;
                        };
                    }
                    return 1 === a.length ? this.$watch(a[0], function(a, c, f) {
                        e[0] = a, d[0] = c, b(e, a === c ? e : d, f);
                    }) : (n(a, function(a, b) {
                        var k = g.$watch(a, function(a, f) {
                            e[b] = a, d[b] = f, h || (h = !0, g.$evalAsync(c));
                        });
                        f.push(k);
                    }), function() {
                        for (;f.length; ) f.shift()();
                    });
                },
                $watchCollection: function(a, b) {
                    function c(a) {
                        e = a;
                        var b, d, g, h;
                        if (!q(e)) {
                            if (H(e)) if (za(e)) for (f !== r && (f = r, n = f.length = 0, l++), a = e.length, 
                            n !== a && (l++, f.length = n = a), b = 0; a > b; b++) h = f[b], g = e[b], d = h !== h && g !== g, 
                            d || h === g || (l++, f[b] = g); else {
                                f !== t && (f = t = {}, n = 0, l++), a = 0;
                                for (b in e) qa.call(e, b) && (a++, g = e[b], h = f[b], b in f ? (d = h !== h && g !== g, 
                                d || h === g || (l++, f[b] = g)) : (n++, f[b] = g, l++));
                                if (n > a) for (b in l++, f) qa.call(e, b) || (n--, delete f[b]);
                            } else f !== e && (f = e, l++);
                            return l;
                        }
                    }
                    c.$stateful = !0;
                    var e, f, g, d = this, k = 1 < b.length, l = 0, m = h(a, c), r = [], t = {}, p = !0, n = 0;
                    return this.$watch(m, function() {
                        if (p ? (p = !1, b(e, e, d)) : b(e, g, d), k) if (H(e)) if (za(e)) {
                            g = Array(e.length);
                            for (var a = 0; a < e.length; a++) g[a] = e[a];
                        } else for (a in g = {}, e) qa.call(e, a) && (g[a] = e[a]); else g = e;
                    });
                },
                $digest: function() {
                    var a, f, h, l, m, r, A, v, C, n = b, q = [];
                    t("$digest"), k.$$checkUrlChange(), this === w && null !== e && (k.defer.cancel(e), 
                    p()), c = null;
                    do {
                        for (r = !1, A = this; u.length; ) {
                            try {
                                C = u.shift(), C.scope.$eval(C.expression, C.locals);
                            } catch (aa) {
                                g(aa);
                            }
                            c = null;
                        }
                        a: do {
                            if (l = A.$$watchers) for (m = l.length; m--; ) try {
                                if (a = l[m]) if ((f = a.get(A)) === (h = a.last) || (a.eq ? ma(f, h) : "number" == typeof f && "number" == typeof h && isNaN(f) && isNaN(h))) {
                                    if (a === c) {
                                        r = !1;
                                        break a;
                                    }
                                } else r = !0, c = a, a.last = a.eq ? bb(f, null) : f, a.fn(f, h === s ? f : h, A), 
                                5 > n && (v = 4 - n, q[v] || (q[v] = []), q[v].push({
                                    msg: z(a.exp) ? "fn: " + (a.exp.name || a.exp.toString()) : a.exp,
                                    newVal: f,
                                    oldVal: h
                                }));
                            } catch (y) {
                                g(y);
                            }
                            if (!(l = A.$$watchersCount && A.$$childHead || A !== this && A.$$nextSibling)) for (;A !== this && !(l = A.$$nextSibling); ) A = A.$parent;
                        } while (A = l);
                        if ((r || u.length) && !n--) throw w.$$phase = null, d("infdig", b, q);
                    } while (r || u.length);
                    for (w.$$phase = null; L.length; ) try {
                        L.shift()();
                    } catch (x) {
                        g(x);
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this === w && k.$$applicationDestroyed(), 
                        A(this, -this.$$watchersCount);
                        for (var b in this.$$listenerCount) v(this, this.$$listenerCount[b], b);
                        a && a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a && a.$$childTail == this && (a.$$childTail = this.$$prevSibling), 
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
                        this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = x, 
                        this.$on = this.$watch = this.$watchGroup = function() {
                            return x;
                        }, this.$$listeners = {}, this.$$nextSibling = null, m(this);
                    }
                },
                $eval: function(a, b) {
                    return h(a)(this, b);
                },
                $evalAsync: function(a, b) {
                    w.$$phase || u.length || k.defer(function() {
                        u.length && w.$digest();
                    }), u.push({
                        scope: this,
                        expression: a,
                        locals: b
                    });
                },
                $$postDigest: function(a) {
                    L.push(a);
                },
                $apply: function(a) {
                    try {
                        t("$apply");
                        try {
                            return this.$eval(a);
                        } finally {
                            w.$$phase = null;
                        }
                    } catch (b) {
                        g(b);
                    } finally {
                        try {
                            w.$digest();
                        } catch (c) {
                            throw g(c), c;
                        }
                    }
                },
                $applyAsync: function(a) {
                    function b() {
                        c.$eval(a);
                    }
                    var c = this;
                    a && aa.push(b), C();
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        var d = c.indexOf(b);
                        -1 !== d && (c[d] = null, v(e, 1, a));
                    };
                },
                $emit: function(a, b) {
                    var d, l, m, c = [], e = this, f = !1, h = {
                        name: a,
                        targetScope: e,
                        stopPropagation: function() {
                            f = !0;
                        },
                        preventDefault: function() {
                            h.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    }, k = cb([ h ], arguments, 1);
                    do {
                        for (d = e.$$listeners[a] || c, h.currentScope = e, l = 0, m = d.length; m > l; l++) if (d[l]) try {
                            d[l].apply(null, k);
                        } catch (r) {
                            g(r);
                        } else d.splice(l, 1), l--, m--;
                        if (f) return h.currentScope = null, h;
                        e = e.$parent;
                    } while (e);
                    return h.currentScope = null, h;
                },
                $broadcast: function(a, b) {
                    var c = this, d = this, e = {
                        name: a,
                        targetScope: this,
                        preventDefault: function() {
                            e.defaultPrevented = !0;
                        },
                        defaultPrevented: !1
                    };
                    if (!this.$$listenerCount[a]) return e;
                    for (var h, k, f = cb([ e ], arguments, 1); c = d; ) {
                        for (e.currentScope = c, d = c.$$listeners[a] || [], h = 0, k = d.length; k > h; h++) if (d[h]) try {
                            d[h].apply(null, f);
                        } catch (l) {
                            g(l);
                        } else d.splice(h, 1), h--, k--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling)) for (;c !== this && !(d = c.$$nextSibling); ) c = c.$parent;
                    }
                    return e.currentScope = null, e;
                }
            };
            var w = new r(), u = w.$$asyncQueue = [], L = w.$$postDigestQueue = [], aa = w.$$applyAsyncQueue = [];
            return w;
        } ];
    }
    function ge() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/, b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(b) {
            return y(b) ? (a = b, this) : a;
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return y(a) ? (b = a, this) : b;
        }, this.$get = function() {
            return function(d, c) {
                var f, e = c ? b : a;
                return f = wa(d).href, "" === f || f.match(e) ? d : "unsafe:" + f;
            };
        };
    }
    function ag(a) {
        if ("self" === a) return a;
        if (E(a)) {
            if (-1 < a.indexOf("***")) throw ya("iwcard", a);
            return a = ud(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$");
        }
        if (Ma(a)) return new RegExp("^" + a.source + "$");
        throw ya("imatcher");
    }
    function vd(a) {
        var b = [];
        return y(a) && n(a, function(a) {
            b.push(ag(a));
        }), b;
    }
    function pf() {
        this.SCE_CONTEXTS = la;
        var a = [ "self" ], b = [];
        this.resourceUrlWhitelist = function(b) {
            return arguments.length && (a = vd(b)), a;
        }, this.resourceUrlBlacklist = function(a) {
            return arguments.length && (b = vd(a)), b;
        }, this.$get = [ "$injector", function(d) {
            function c(a, b) {
                return "self" === a ? ed(b) : !!a.exec(b.href);
            }
            function e(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a;
                    };
                };
                return a && (b.prototype = new a()), b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue();
                }, b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString();
                }, b;
            }
            var f = function(a) {
                throw ya("unsafe");
            };
            d.has("$sanitize") && (f = d.get("$sanitize"));
            var g = e(), h = {};
            return h[la.HTML] = e(g), h[la.CSS] = e(g), h[la.URL] = e(g), h[la.JS] = e(g), h[la.RESOURCE_URL] = e(h[la.URL]), 
            {
                trustAs: function(a, b) {
                    var c = h.hasOwnProperty(a) ? h[a] : null;
                    if (!c) throw ya("icontext", a, b);
                    if (null === b || q(b) || "" === b) return b;
                    if ("string" != typeof b) throw ya("itype", a);
                    return new c(b);
                },
                getTrusted: function(d, e) {
                    if (null === e || q(e) || "" === e) return e;
                    var g = h.hasOwnProperty(d) ? h[d] : null;
                    if (g && e instanceof g) return e.$$unwrapTrustedValue();
                    if (d === la.RESOURCE_URL) {
                        var r, t, g = wa(e.toString()), n = !1;
                        for (r = 0, t = a.length; t > r; r++) if (c(a[r], g)) {
                            n = !0;
                            break;
                        }
                        if (n) for (r = 0, t = b.length; t > r; r++) if (c(b[r], g)) {
                            n = !1;
                            break;
                        }
                        if (n) return e;
                        throw ya("insecurl", e.toString());
                    }
                    if (d === la.HTML) return f(e);
                    throw ya("unsafe");
                },
                valueOf: function(a) {
                    return a instanceof g ? a.$$unwrapTrustedValue() : a;
                }
            };
        } ];
    }
    function of() {
        var a = !0;
        this.enabled = function(b) {
            return arguments.length && (a = !!b), a;
        }, this.$get = [ "$parse", "$sceDelegate", function(b, d) {
            if (a && 8 > Ha) throw ya("iequirks");
            var c = ia(la);
            c.isEnabled = function() {
                return a;
            }, c.trustAs = d.trustAs, c.getTrusted = d.getTrusted, c.valueOf = d.valueOf, a || (c.trustAs = c.getTrusted = function(a, b) {
                return b;
            }, c.valueOf = Ya), c.parseAs = function(a, d) {
                var e = b(d);
                return e.literal && e.constant ? e : b(d, function(b) {
                    return c.getTrusted(a, b);
                });
            };
            var e = c.parseAs, f = c.getTrusted, g = c.trustAs;
            return n(la, function(a, b) {
                var d = F(b);
                c[fb("parse_as_" + d)] = function(b) {
                    return e(a, b);
                }, c[fb("get_trusted_" + d)] = function(b) {
                    return f(a, b);
                }, c[fb("trust_as_" + d)] = function(b) {
                    return g(a, b);
                };
            }), c;
        } ];
    }
    function qf() {
        this.$get = [ "$window", "$document", function(a, b) {
            var g, d = {}, c = ea((/android (\d+)/.exec(F((a.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((a.navigator || {}).userAgent), f = b[0] || {}, h = /^(Moz|webkit|ms)(?=[A-Z])/, k = f.body && f.body.style, l = !1, m = !1;
            if (k) {
                for (var r in k) if (l = h.exec(r)) {
                    g = l[0], g = g.substr(0, 1).toUpperCase() + g.substr(1);
                    break;
                }
                g || (g = "WebkitOpacity" in k && "webkit"), l = !!("transition" in k || g + "Transition" in k), 
                m = !!("animation" in k || g + "Animation" in k), !c || l && m || (l = E(k.webkitTransition), 
                m = E(k.webkitAnimation));
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > c || e),
                hasEvent: function(a) {
                    if ("input" === a && 11 >= Ha) return !1;
                    if (q(d[a])) {
                        var b = f.createElement("div");
                        d[a] = "on" + a in b;
                    }
                    return d[a];
                },
                csp: Ba(),
                vendorPrefix: g,
                transitions: l,
                animations: m,
                android: c
            };
        } ];
    }
    function sf() {
        this.$get = [ "$templateCache", "$http", "$q", "$sce", function(a, b, d, c) {
            function e(f, g) {
                e.totalPendingRequests++, E(f) && a.get(f) || (f = c.getTrustedResourceUrl(f));
                var h = b.defaults && b.defaults.transformResponse;
                return I(h) ? h = h.filter(function(a) {
                    return a !== $b;
                }) : h === $b && (h = null), b.get(f, {
                    cache: a,
                    transformResponse: h
                })["finally"](function() {
                    e.totalPendingRequests--;
                }).then(function(b) {
                    return a.put(f, b.data), b.data;
                }, function(a) {
                    if (!g) throw ha("tpload", f, a.status, a.statusText);
                    return d.reject(a);
                });
            }
            return e.totalPendingRequests = 0, e;
        } ];
    }
    function tf() {
        this.$get = [ "$rootScope", "$browser", "$location", function(a, b, d) {
            return {
                findBindings: function(a, b, d) {
                    a = a.getElementsByClassName("ng-binding");
                    var g = [];
                    return n(a, function(a) {
                        var c = fa.element(a).data("$binding");
                        c && n(c, function(c) {
                            d ? new RegExp("(^|\\s)" + ud(b) + "(\\s|\\||$)").test(c) && g.push(a) : -1 != c.indexOf(b) && g.push(a);
                        });
                    }), g;
                },
                findModels: function(a, b, d) {
                    for (var g = [ "ng-", "data-ng-", "ng\\:" ], h = 0; h < g.length; ++h) {
                        var k = a.querySelectorAll("[" + g[h] + "model" + (d ? "=" : "*=") + '"' + b + '"]');
                        if (k.length) return k;
                    }
                },
                getLocation: function() {
                    return d.url();
                },
                setLocation: function(b) {
                    b !== d.url() && (d.url(b), a.$digest());
                },
                whenStable: function(a) {
                    b.notifyWhenNoOutstandingRequests(a);
                }
            };
        } ];
    }
    function uf() {
        this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, d, c, e) {
            function f(f, k, l) {
                z(f) || (l = k, k = f, f = x);
                var q, m = ra.call(arguments, 3), r = y(l) && !l, t = (r ? c : d).defer(), n = t.promise;
                return q = b.defer(function() {
                    try {
                        t.resolve(f.apply(null, m));
                    } catch (b) {
                        t.reject(b), e(b);
                    } finally {
                        delete g[n.$$timeoutId];
                    }
                    r || a.$apply();
                }, k), n.$$timeoutId = q, g[q] = t, n;
            }
            var g = {};
            return f.cancel = function(a) {
                return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], 
                b.defer.cancel(a.$$timeoutId)) : !1;
            }, f;
        } ];
    }
    function wa(a) {
        return Ha && (Y.setAttribute("href", a), a = Y.href), Y.setAttribute("href", a), 
        {
            href: Y.href,
            protocol: Y.protocol ? Y.protocol.replace(/:$/, "") : "",
            host: Y.host,
            search: Y.search ? Y.search.replace(/^\?/, "") : "",
            hash: Y.hash ? Y.hash.replace(/^#/, "") : "",
            hostname: Y.hostname,
            port: Y.port,
            pathname: "/" === Y.pathname.charAt(0) ? Y.pathname : "/" + Y.pathname
        };
    }
    function ed(a) {
        return a = E(a) ? wa(a) : a, a.protocol === wd.protocol && a.host === wd.host;
    }
    function vf() {
        this.$get = na(S);
    }
    function xd(a) {
        function b(a) {
            try {
                return decodeURIComponent(a);
            } catch (b) {
                return a;
            }
        }
        var d = a[0] || {}, c = {}, e = "";
        return function() {
            var a, g, h, k, l;
            if (a = d.cookie || "", a !== e) for (e = a, a = e.split("; "), c = {}, h = 0; h < a.length; h++) g = a[h], 
            k = g.indexOf("="), k > 0 && (l = b(g.substring(0, k)), q(c[l]) && (c[l] = b(g.substring(k + 1))));
            return c;
        };
    }
    function zf() {
        this.$get = xd;
    }
    function Jc(a) {
        function b(d, c) {
            if (H(d)) {
                var e = {};
                return n(d, function(a, c) {
                    e[c] = b(c, a);
                }), e;
            }
            return a.factory(d + "Filter", c);
        }
        this.register = b, this.$get = [ "$injector", function(a) {
            return function(b) {
                return a.get(b + "Filter");
            };
        } ], b("currency", yd), b("date", zd), b("filter", bg), b("json", cg), b("limitTo", dg), 
        b("lowercase", eg), b("number", Ad), b("orderBy", Bd), b("uppercase", fg);
    }
    function bg() {
        return function(a, b, d) {
            if (!za(a)) {
                if (null == a) return a;
                throw G("filter")("notarray", a);
            }
            var c;
            switch (hc(b)) {
              case "function":
                break;

              case "boolean":
              case "null":
              case "number":
              case "string":
                c = !0;

              case "object":
                b = gg(b, d, c);
                break;

              default:
                return a;
            }
            return Array.prototype.filter.call(a, b);
        };
    }
    function gg(a, b, d) {
        var c = H(a) && "$" in a;
        return !0 === b ? b = ma : z(b) || (b = function(a, b) {
            return q(a) ? !1 : null === a || null === b ? a === b : H(b) || H(a) && !qc(a) ? !1 : (a = F("" + a), 
            b = F("" + b), -1 !== a.indexOf(b));
        }), function(e) {
            return c && !H(e) ? Ka(e, a.$, b, !1) : Ka(e, a, b, d);
        };
    }
    function Ka(a, b, d, c, e) {
        var f = hc(a), g = hc(b);
        if ("string" === g && "!" === b.charAt(0)) return !Ka(a, b.substring(1), d, c);
        if (I(a)) return a.some(function(a) {
            return Ka(a, b, d, c);
        });
        switch (f) {
          case "object":
            var h;
            if (c) {
                for (h in a) if ("$" !== h.charAt(0) && Ka(a[h], b, d, !0)) return !0;
                return e ? !1 : Ka(a, b, d, !1);
            }
            if ("object" === g) {
                for (h in b) if (e = b[h], !z(e) && !q(e) && (f = "$" === h, !Ka(f ? a : a[h], e, d, f, f))) return !1;
                return !0;
            }
            return d(a, b);

          case "function":
            return !1;

          default:
            return d(a, b);
        }
    }
    function hc(a) {
        return null === a ? "null" : typeof a;
    }
    function yd(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c, e) {
            return q(c) && (c = b.CURRENCY_SYM), q(e) && (e = b.PATTERNS[1].maxFrac), null == a ? a : Cd(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, e).replace(/\u00A4/g, c);
        };
    }
    function Ad(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return null == a ? a : Cd(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c);
        };
    }
    function Cd(a, b, d, c, e) {
        if (H(a)) return "";
        var f = 0 > a;
        a = Math.abs(a);
        var g = 1 / 0 === a;
        if (!g && !isFinite(a)) return "";
        var h = a + "", k = "", l = !1, m = [];
        if (g && (k = "∞"), !g && -1 !== h.indexOf("e")) {
            var r = h.match(/([\d\.]+)e(-?)(\d+)/);
            r && "-" == r[2] && r[3] > e + 1 ? a = 0 : (k = h, l = !0);
        }
        if (g || l) e > 0 && 1 > a && (k = a.toFixed(e), a = parseFloat(k), k = k.replace(ic, c)); else {
            g = (h.split(ic)[1] || "").length, q(e) && (e = Math.min(Math.max(b.minFrac, g), b.maxFrac)), 
            a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e);
            var g = ("" + a).split(ic), h = g[0], g = g[1] || "", r = 0, t = b.lgSize, n = b.gSize;
            if (h.length >= t + n) for (r = h.length - t, l = 0; r > l; l++) 0 === (r - l) % n && 0 !== l && (k += d), 
            k += h.charAt(l);
            for (l = r; l < h.length; l++) 0 === (h.length - l) % t && 0 !== l && (k += d), 
            k += h.charAt(l);
            for (;g.length < e; ) g += "0";
            e && "0" !== e && (k += c + g.substr(0, e));
        }
        return 0 === a && (f = !1), m.push(f ? b.negPre : b.posPre, k, f ? b.negSuf : b.posSuf), 
        m.join("");
    }
    function Gb(a, b, d) {
        var c = "";
        for (0 > a && (c = "-", a = -a), a = "" + a; a.length < b; ) a = "0" + a;
        return d && (a = a.substr(a.length - b)), c + a;
    }
    function ca(a, b, d, c) {
        return d = d || 0, function(e) {
            return e = e["get" + a](), (d > 0 || e > -d) && (e += d), 0 === e && -12 == d && (e = 12), 
            Gb(e, b, c);
        };
    }
    function Hb(a, b) {
        return function(d, c) {
            var e = d["get" + a](), f = sb(b ? "SHORT" + a : a);
            return c[f][e];
        };
    }
    function Dd(a) {
        var b = new Date(a, 0, 1).getDay();
        return new Date(a, 0, (4 >= b ? 5 : 12) - b);
    }
    function Ed(a) {
        return function(b) {
            var d = Dd(b.getFullYear());
            return b = +new Date(b.getFullYear(), b.getMonth(), b.getDate() + (4 - b.getDay())) - +d, 
            b = 1 + Math.round(b / 6048e5), Gb(b, a);
        };
    }
    function jc(a, b) {
        return 0 >= a.getFullYear() ? b.ERAS[0] : b.ERAS[1];
    }
    function zd(a) {
        function b(a) {
            var b;
            if (b = a.match(d)) {
                a = new Date(0);
                var f = 0, g = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, k = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (f = ea(b[9] + b[10]), g = ea(b[9] + b[11])), h.call(a, ea(b[1]), ea(b[2]) - 1, ea(b[3])), 
                f = ea(b[4] || 0) - f, g = ea(b[5] || 0) - g, h = ea(b[6] || 0), b = Math.round(1e3 * parseFloat("0." + (b[7] || 0))), 
                k.call(a, f, g, h, b);
            }
            return a;
        }
        var d = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, d, f) {
            var k, l, g = "", h = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, E(c) && (c = hg.test(c) ? ea(c) : b(c)), 
            Q(c) && (c = new Date(c)), !da(c) || !isFinite(c.getTime())) return c;
            for (;d; ) (l = ig.exec(d)) ? (h = cb(h, l, 1), d = h.pop()) : (h.push(d), d = null);
            var m = c.getTimezoneOffset();
            return f && (m = vc(f, c.getTimezoneOffset()), c = Pb(c, f, !0)), n(h, function(b) {
                k = jg[b], g += k ? k(c, a.DATETIME_FORMATS, m) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'");
            }), g;
        };
    }
    function cg() {
        return function(a, b) {
            return q(b) && (b = 2), db(a, b);
        };
    }
    function dg() {
        return function(a, b, d) {
            return b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : ea(b), isNaN(b) ? a : (Q(a) && (a = a.toString()), 
            I(a) || E(a) ? (d = !d || isNaN(d) ? 0 : ea(d), d = 0 > d ? Math.max(0, a.length + d) : d, 
            b >= 0 ? a.slice(d, d + b) : 0 === d ? a.slice(b, a.length) : a.slice(Math.max(0, d + b), d)) : a);
        };
    }
    function Bd(a) {
        function b(b, d) {
            return d = d ? -1 : 1, b.map(function(b) {
                var c = 1, h = Ya;
                if (z(b)) h = b; else if (E(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0) ? -1 : 1, 
                b = b.substring(1)), "" !== b && (h = a(b), h.constant))) var k = h(), h = function(a) {
                    return a[k];
                };
                return {
                    get: h,
                    descending: c * d
                };
            });
        }
        function d(a) {
            switch (typeof a) {
              case "number":
              case "boolean":
              case "string":
                return !0;

              default:
                return !1;
            }
        }
        return function(a, e, f) {
            if (!za(a)) return a;
            I(e) || (e = [ e ]), 0 === e.length && (e = [ "+" ]);
            var g = b(e, f);
            return g.push({
                get: function() {
                    return {};
                },
                descending: f ? -1 : 1
            }), a = Array.prototype.map.call(a, function(a, b) {
                return {
                    value: a,
                    predicateValues: g.map(function(c) {
                        var e = c.get(a);
                        return c = typeof e, null === e ? (c = "string", e = "null") : "string" === c ? e = e.toLowerCase() : "object" === c && ("function" == typeof e.valueOf && (e = e.valueOf(), 
                        d(e)) || qc(e) && (e = e.toString(), d(e)) || (e = b)), {
                            value: e,
                            type: c
                        };
                    })
                };
            }), a.sort(function(a, b) {
                for (var c = 0, d = 0, e = g.length; e > d; ++d) {
                    var c = a.predicateValues[d], f = b.predicateValues[d], n = 0;
                    if (c.type === f.type ? c.value !== f.value && (n = c.value < f.value ? -1 : 1) : n = c.type < f.type ? -1 : 1, 
                    c = n * g[d].descending) break;
                }
                return c;
            }), a = a.map(function(a) {
                return a.value;
            });
        };
    }
    function La(a) {
        return z(a) && (a = {
            link: a
        }), a.restrict = a.restrict || "AC", na(a);
    }
    function Fd(a, b, d, c, e) {
        var f = this, g = [];
        f.$error = {}, f.$$success = {}, f.$pending = u, f.$name = e(b.name || b.ngForm || "")(d), 
        f.$dirty = !1, f.$pristine = !0, f.$valid = !0, f.$invalid = !1, f.$submitted = !1, 
        f.$$parentForm = Ib, f.$rollbackViewValue = function() {
            n(g, function(a) {
                a.$rollbackViewValue();
            });
        }, f.$commitViewValue = function() {
            n(g, function(a) {
                a.$commitViewValue();
            });
        }, f.$addControl = function(a) {
            Ra(a.$name, "input"), g.push(a), a.$name && (f[a.$name] = a), a.$$parentForm = f;
        }, f.$$renameControl = function(a, b) {
            var c = a.$name;
            f[c] === a && delete f[c], f[b] = a, a.$name = b;
        }, f.$removeControl = function(a) {
            a.$name && f[a.$name] === a && delete f[a.$name], n(f.$pending, function(b, c) {
                f.$setValidity(c, null, a);
            }), n(f.$error, function(b, c) {
                f.$setValidity(c, null, a);
            }), n(f.$$success, function(b, c) {
                f.$setValidity(c, null, a);
            }), ab(g, a), a.$$parentForm = Ib;
        }, Gd({
            ctrl: this,
            $element: a,
            set: function(a, b, c) {
                var d = a[b];
                d ? -1 === d.indexOf(c) && d.push(c) : a[b] = [ c ];
            },
            unset: function(a, b, c) {
                var d = a[b];
                d && (ab(d, c), 0 === d.length && delete a[b]);
            },
            $animate: c
        }), f.$setDirty = function() {
            c.removeClass(a, Wa), c.addClass(a, Jb), f.$dirty = !0, f.$pristine = !1, f.$$parentForm.$setDirty();
        }, f.$setPristine = function() {
            c.setClass(a, Wa, Jb + " ng-submitted"), f.$dirty = !1, f.$pristine = !0, f.$submitted = !1, 
            n(g, function(a) {
                a.$setPristine();
            });
        }, f.$setUntouched = function() {
            n(g, function(a) {
                a.$setUntouched();
            });
        }, f.$setSubmitted = function() {
            c.addClass(a, "ng-submitted"), f.$submitted = !0, f.$$parentForm.$setSubmitted();
        };
    }
    function kc(a) {
        a.$formatters.push(function(b) {
            return a.$isEmpty(b) ? b : b.toString();
        });
    }
    function jb(a, b, d, c, e, f) {
        var g = F(b[0].type);
        if (!e.android) {
            var h = !1;
            b.on("compositionstart", function(a) {
                h = !0;
            }), b.on("compositionend", function() {
                h = !1, k();
            });
        }
        var k = function(a) {
            if (l && (f.defer.cancel(l), l = null), !h) {
                var e = b.val();
                a = a && a.type, "password" === g || d.ngTrim && "false" === d.ngTrim || (e = U(e)), 
                (c.$viewValue !== e || "" === e && c.$$hasNativeValidators) && c.$setViewValue(e, a);
            }
        };
        if (e.hasEvent("input")) b.on("input", k); else {
            var l, m = function(a, b, c) {
                l || (l = f.defer(function() {
                    l = null, b && b.value === c || k(a);
                }));
            };
            b.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || m(a, this, this.value);
            }), e.hasEvent("paste") && b.on("paste cut", m);
        }
        b.on("change", k), c.$render = function() {
            var a = c.$isEmpty(c.$viewValue) ? "" : c.$viewValue;
            b.val() !== a && b.val(a);
        };
    }
    function Kb(a, b) {
        return function(d, c) {
            var e, f;
            if (da(d)) return d;
            if (E(d)) {
                if ('"' == d.charAt(0) && '"' == d.charAt(d.length - 1) && (d = d.substring(1, d.length - 1)), 
                kg.test(d)) return new Date(d);
                if (a.lastIndex = 0, e = a.exec(d)) return e.shift(), f = c ? {
                    yyyy: c.getFullYear(),
                    MM: c.getMonth() + 1,
                    dd: c.getDate(),
                    HH: c.getHours(),
                    mm: c.getMinutes(),
                    ss: c.getSeconds(),
                    sss: c.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, n(e, function(a, c) {
                    c < b.length && (f[b[c]] = +a);
                }), new Date(f.yyyy, f.MM - 1, f.dd, f.HH, f.mm, f.ss || 0, 1e3 * f.sss || 0);
            }
            return NaN;
        };
    }
    function kb(a, b, d, c) {
        return function(e, f, g, h, k, l, m) {
            function r(a) {
                return a && !(a.getTime && a.getTime() !== a.getTime());
            }
            function n(a) {
                return y(a) && !da(a) ? d(a) || u : a;
            }
            Hd(e, f, g, h), jb(e, f, g, h, k, l);
            var v, A = h && h.$options && h.$options.timezone;
            if (h.$$parserName = a, h.$parsers.push(function(a) {
                return h.$isEmpty(a) ? null : b.test(a) ? (a = d(a, v), A && (a = Pb(a, A)), a) : u;
            }), h.$formatters.push(function(a) {
                if (a && !da(a)) throw lb("datefmt", a);
                return r(a) ? ((v = a) && A && (v = Pb(v, A, !0)), m("date")(a, c, A)) : (v = null, 
                "");
            }), y(g.min) || g.ngMin) {
                var s;
                h.$validators.min = function(a) {
                    return !r(a) || q(s) || d(a) >= s;
                }, g.$observe("min", function(a) {
                    s = n(a), h.$validate();
                });
            }
            if (y(g.max) || g.ngMax) {
                var p;
                h.$validators.max = function(a) {
                    return !r(a) || q(p) || d(a) <= p;
                }, g.$observe("max", function(a) {
                    p = n(a), h.$validate();
                });
            }
        };
    }
    function Hd(a, b, d, c) {
        (c.$$hasNativeValidators = H(b[0].validity)) && c.$parsers.push(function(a) {
            var c = b.prop("validity") || {};
            return c.badInput && !c.typeMismatch ? u : a;
        });
    }
    function Id(a, b, d, c, e) {
        if (y(c)) {
            if (a = a(c), !a.constant) throw lb("constexpr", d, c);
            return a(b);
        }
        return e;
    }
    function lc(a, b) {
        return a = "ngClass" + a, [ "$animate", function(d) {
            function c(a, b) {
                var c = [], d = 0;
                a: for (;d < a.length; d++) {
                    for (var e = a[d], m = 0; m < b.length; m++) if (e == b[m]) continue a;
                    c.push(e);
                }
                return c;
            }
            function e(a) {
                var b = [];
                return I(a) ? (n(a, function(a) {
                    b = b.concat(e(a));
                }), b) : E(a) ? a.split(" ") : H(a) ? (n(a, function(a, c) {
                    a && (b = b.concat(c.split(" ")));
                }), b) : a;
            }
            return {
                restrict: "AC",
                link: function(f, g, h) {
                    function k(a, b) {
                        var c = g.data("$classCounts") || $(), d = [];
                        return n(a, function(a) {
                            (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a));
                        }), g.data("$classCounts", c), d.join(" ");
                    }
                    function l(a) {
                        if (!0 === b || f.$index % 2 === b) {
                            var l = e(a || []);
                            if (m) {
                                if (!ma(a, m)) {
                                    var q = e(m), n = c(l, q), l = c(q, l), n = k(n, 1), l = k(l, -1);
                                    n && n.length && d.addClass(g, n), l && l.length && d.removeClass(g, l);
                                }
                            } else {
                                var n = k(l, 1);
                                h.$addClass(n);
                            }
                        }
                        m = ia(a);
                    }
                    var m;
                    f.$watch(h[a], l, !0), h.$observe("class", function(b) {
                        l(f.$eval(h[a]));
                    }), "ngClass" !== a && f.$watch("$index", function(c, d) {
                        var g = 1 & c;
                        if (g !== (1 & d)) {
                            var l = e(f.$eval(h[a]));
                            g === b ? (g = k(l, 1), h.$addClass(g)) : (g = k(l, -1), h.$removeClass(g));
                        }
                    });
                }
            };
        } ];
    }
    function Gd(a) {
        function b(a, b) {
            b && !f[a] ? (k.addClass(e, a), f[a] = !0) : !b && f[a] && (k.removeClass(e, a), 
            f[a] = !1);
        }
        function d(a, c) {
            a = a ? "-" + zc(a, "-") : "", b(mb + a, !0 === c), b(Jd + a, !1 === c);
        }
        var c = a.ctrl, e = a.$element, f = {}, g = a.set, h = a.unset, k = a.$animate;
        f[Jd] = !(f[mb] = e.hasClass(mb)), c.$setValidity = function(a, e, f) {
            q(e) ? (c.$pending || (c.$pending = {}), g(c.$pending, a, f)) : (c.$pending && h(c.$pending, a, f), 
            Kd(c.$pending) && (c.$pending = u)), $a(e) ? e ? (h(c.$error, a, f), g(c.$$success, a, f)) : (g(c.$error, a, f), 
            h(c.$$success, a, f)) : (h(c.$error, a, f), h(c.$$success, a, f)), c.$pending ? (b(Ld, !0), 
            c.$valid = c.$invalid = u, d("", null)) : (b(Ld, !1), c.$valid = Kd(c.$error), c.$invalid = !c.$valid, 
            d("", c.$valid)), e = c.$pending && c.$pending[a] ? u : c.$error[a] ? !1 : c.$$success[a] ? !0 : null, 
            d(a, e), c.$$parentForm.$setValidity(a, e, c);
        };
    }
    function Kd(a) {
        if (a) for (var b in a) if (a.hasOwnProperty(b)) return !1;
        return !0;
    }
    var Ha, B, oa, Sb, lg = /^\/(.+)\/([a-z]*)$/, F = function(a) {
        return E(a) ? a.toLowerCase() : a;
    }, qa = Object.prototype.hasOwnProperty, sb = function(a) {
        return E(a) ? a.toUpperCase() : a;
    }, ra = [].slice, Pf = [].splice, mg = [].push, sa = Object.prototype.toString, rc = Object.getPrototypeOf, Aa = G("ng"), fa = S.angular || (S.angular = {}), nb = 0;
    Ha = X.documentMode, x.$inject = [], Ya.$inject = [];
    var Rb, I = Array.isArray, Vd = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/, U = function(a) {
        return E(a) ? a.trim() : a;
    }, ud = function(a) {
        return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }, Ba = function() {
        if (!y(Ba.rules)) {
            var a = X.querySelector("[ng-csp]") || X.querySelector("[data-ng-csp]");
            if (a) {
                var b = a.getAttribute("ng-csp") || a.getAttribute("data-ng-csp");
                Ba.rules = {
                    noUnsafeEval: !b || -1 !== b.indexOf("no-unsafe-eval"),
                    noInlineStyle: !b || -1 !== b.indexOf("no-inline-style")
                };
            } else {
                a = Ba;
                try {
                    new Function(""), b = !1;
                } catch (d) {
                    b = !0;
                }
                a.rules = {
                    noUnsafeEval: b,
                    noInlineStyle: !1
                };
            }
        }
        return Ba.rules;
    }, pb = function() {
        if (y(pb.name_)) return pb.name_;
        var a, b, c, e, d = Oa.length;
        for (b = 0; d > b; ++b) if (c = Oa[b], a = X.querySelector("[" + c.replace(":", "\\:") + "jq]")) {
            e = a.getAttribute(c + "jq");
            break;
        }
        return pb.name_ = e;
    }, Oa = [ "ng-", "data-ng-", "ng:", "x-ng-" ], be = /[A-Z]/g, Ac = !1, Na = 3, fe = {
        full: "1.4.8",
        major: 1,
        minor: 4,
        dot: 8,
        codeName: "ice-manipulation"
    };
    N.expando = "ng339";
    var gb = N.cache = {}, Ff = 1;
    N._data = function(a) {
        return this.cache[a[this.expando]] || {};
    };
    var Af = /([\:\-\_]+(.))/g, Bf = /^moz([A-Z])/, xb = {
        mouseleave: "mouseout",
        mouseenter: "mouseover"
    }, Ub = G("jqLite"), Ef = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Tb = /<|&#?\w+;/, Cf = /<([\w:-]+)/, Df = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, ka = {
        option: [ 1, '<select multiple="multiple">', "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    ka.optgroup = ka.option, ka.tbody = ka.tfoot = ka.colgroup = ka.caption = ka.thead, 
    ka.th = ka.td;
    var Kf = Node.prototype.contains || function(a) {
        return !!(16 & this.compareDocumentPosition(a));
    }, Pa = N.prototype = {
        ready: function(a) {
            function b() {
                d || (d = !0, a());
            }
            var d = !1;
            "complete" === X.readyState ? setTimeout(b) : (this.on("DOMContentLoaded", b), N(S).on("load", b));
        },
        toString: function() {
            var a = [];
            return n(this, function(b) {
                a.push("" + b);
            }), "[" + a.join(", ") + "]";
        },
        eq: function(a) {
            return B(a >= 0 ? this[a] : this[this.length + a]);
        },
        length: 0,
        push: mg,
        sort: [].sort,
        splice: [].splice
    }, Cb = {};
    n("multiple selected checked disabled readOnly required open".split(" "), function(a) {
        Cb[F(a)] = a;
    });
    var Rc = {};
    n("input select option textarea button form details".split(" "), function(a) {
        Rc[a] = !0;
    });
    var Zc = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    n({
        data: Wb,
        removeData: vb,
        hasData: function(a) {
            for (var b in gb[a.ng339]) return !0;
            return !1;
        }
    }, function(a, b) {
        N[b] = a;
    }), n({
        data: Wb,
        inheritedData: Bb,
        scope: function(a) {
            return B.data(a, "$scope") || Bb(a.parentNode || a, [ "$isolateScope", "$scope" ]);
        },
        isolateScope: function(a) {
            return B.data(a, "$isolateScope") || B.data(a, "$isolateScopeNoTemplate");
        },
        controller: Oc,
        injector: function(a) {
            return Bb(a, "$injector");
        },
        removeAttr: function(a, b) {
            a.removeAttribute(b);
        },
        hasClass: yb,
        css: function(a, b, d) {
            return b = fb(b), y(d) ? void (a.style[b] = d) : a.style[b];
        },
        attr: function(a, b, d) {
            var c = a.nodeType;
            if (c !== Na && 2 !== c && 8 !== c) if (c = F(b), Cb[c]) {
                if (!y(d)) return a[b] || (a.attributes.getNamedItem(b) || x).specified ? c : u;
                d ? (a[b] = !0, a.setAttribute(b, c)) : (a[b] = !1, a.removeAttribute(c));
            } else if (y(d)) a.setAttribute(b, d); else if (a.getAttribute) return a = a.getAttribute(b, 2), 
            null === a ? u : a;
        },
        prop: function(a, b, d) {
            return y(d) ? void (a[b] = d) : a[b];
        },
        text: function() {
            function a(a, d) {
                if (q(d)) {
                    var c = a.nodeType;
                    return 1 === c || c === Na ? a.textContent : "";
                }
                a.textContent = d;
            }
            return a.$dv = "", a;
        }(),
        val: function(a, b) {
            if (q(b)) {
                if (a.multiple && "select" === ta(a)) {
                    var d = [];
                    return n(a.options, function(a) {
                        a.selected && d.push(a.value || a.text);
                    }), 0 === d.length ? null : d;
                }
                return a.value;
            }
            a.value = b;
        },
        html: function(a, b) {
            return q(b) ? a.innerHTML : (ub(a, !0), void (a.innerHTML = b));
        },
        empty: Pc
    }, function(a, b) {
        N.prototype[b] = function(b, c) {
            var e, f, g = this.length;
            if (a !== Pc && q(2 == a.length && a !== yb && a !== Oc ? b : c)) {
                if (H(b)) {
                    for (e = 0; g > e; e++) if (a === Wb) a(this[e], b); else for (f in b) a(this[e], f, b[f]);
                    return this;
                }
                for (e = a.$dv, g = q(e) ? Math.min(g, 1) : g, f = 0; g > f; f++) {
                    var h = a(this[f], b, c);
                    e = e ? e + h : h;
                }
                return e;
            }
            for (e = 0; g > e; e++) a(this[e], b, c);
            return this;
        };
    }), n({
        removeData: vb,
        on: function(a, b, d, c) {
            if (y(c)) throw Ub("onargs");
            if (Kc(a)) {
                c = wb(a, !0);
                var e = c.events, f = c.handle;
                f || (f = c.handle = Hf(a, e)), c = 0 <= b.indexOf(" ") ? b.split(" ") : [ b ];
                for (var g = c.length, h = function(b, c, g) {
                    var h = e[b];
                    h || (h = e[b] = [], h.specialHandlerWrapper = c, "$destroy" === b || g || a.addEventListener(b, f, !1)), 
                    h.push(d);
                }; g--; ) b = c[g], xb[b] ? (h(xb[b], Jf), h(b, u, !0)) : h(b);
            }
        },
        off: Nc,
        one: function(a, b, d) {
            a = B(a), a.on(b, function e() {
                a.off(b, d), a.off(b, e);
            }), a.on(b, d);
        },
        replaceWith: function(a, b) {
            var d, c = a.parentNode;
            ub(a), n(new N(b), function(b) {
                d ? c.insertBefore(b, d.nextSibling) : c.replaceChild(b, a), d = b;
            });
        },
        children: function(a) {
            var b = [];
            return n(a.childNodes, function(a) {
                1 === a.nodeType && b.push(a);
            }), b;
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || [];
        },
        append: function(a, b) {
            var d = a.nodeType;
            if (1 === d || 11 === d) {
                b = new N(b);
                for (var d = 0, c = b.length; c > d; d++) a.appendChild(b[d]);
            }
        },
        prepend: function(a, b) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                n(new N(b), function(b) {
                    a.insertBefore(b, d);
                });
            }
        },
        wrap: function(a, b) {
            b = B(b).eq(0).clone()[0];
            var d = a.parentNode;
            d && d.replaceChild(b, a), b.appendChild(a);
        },
        remove: Xb,
        detach: function(a) {
            Xb(a, !0);
        },
        after: function(a, b) {
            var d = a, c = a.parentNode;
            b = new N(b);
            for (var e = 0, f = b.length; f > e; e++) {
                var g = b[e];
                c.insertBefore(g, d.nextSibling), d = g;
            }
        },
        addClass: Ab,
        removeClass: zb,
        toggleClass: function(a, b, d) {
            b && n(b.split(" "), function(b) {
                var e = d;
                q(e) && (e = !yb(a, b)), (e ? Ab : zb)(a, b);
            });
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        },
        next: function(a) {
            return a.nextElementSibling;
        },
        find: function(a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : [];
        },
        clone: Vb,
        triggerHandler: function(a, b, d) {
            var c, e, f = b.type || b, g = wb(a);
            (g = (g = g && g.events) && g[f]) && (c = {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented;
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0;
                },
                isImmediatePropagationStopped: function() {
                    return !0 === this.immediatePropagationStopped;
                },
                stopPropagation: x,
                type: f,
                target: a
            }, b.type && (c = M(c, b)), b = ia(g), e = d ? [ c ].concat(d) : [ c ], n(b, function(b) {
                c.isImmediatePropagationStopped() || b.apply(a, e);
            }));
        }
    }, function(a, b) {
        N.prototype[b] = function(b, c, e) {
            for (var f, g = 0, h = this.length; h > g; g++) q(f) ? (f = a(this[g], b, c, e), 
            y(f) && (f = B(f))) : Mc(f, a(this[g], b, c, e));
            return y(f) ? f : this;
        }, N.prototype.bind = N.prototype.on, N.prototype.unbind = N.prototype.off;
    }), Sa.prototype = {
        put: function(a, b) {
            this[Ca(a, this.nextUid)] = b;
        },
        get: function(a) {
            return this[Ca(a, this.nextUid)];
        },
        remove: function(a) {
            var b = this[a = Ca(a, this.nextUid)];
            return delete this[a], b;
        }
    };
    var yf = [ function() {
        this.$get = [ function() {
            return Sa;
        } ];
    } ], Tc = /^[^\(]*\(\s*([^\)]*)\)/m, ng = /,/, og = /^\s*(_?)(\S+?)\1\s*$/, Sc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Da = G("$injector");
    eb.$$annotate = function(a, b, d) {
        var c;
        if ("function" == typeof a) {
            if (!(c = a.$inject)) {
                if (c = [], a.length) {
                    if (b) throw E(d) && d || (d = a.name || Lf(a)), Da("strictdi", d);
                    b = a.toString().replace(Sc, ""), b = b.match(Tc), n(b[1].split(ng), function(a) {
                        a.replace(og, function(a, b, d) {
                            c.push(d);
                        });
                    });
                }
                a.$inject = c;
            }
        } else I(a) ? (b = a.length - 1, Qa(a[b], "fn"), c = a.slice(0, b)) : Qa(a, "fn", !0);
        return c;
    };
    var Md = G("$animate"), Ue = function() {
        this.$get = [ "$q", "$$rAF", function(a, b) {
            function d() {}
            return d.all = x, d.chain = x, d.prototype = {
                end: x,
                cancel: x,
                resume: x,
                pause: x,
                complete: x,
                then: function(c, d) {
                    return a(function(a) {
                        b(function() {
                            a();
                        });
                    }).then(c, d);
                }
            }, d;
        } ];
    }, Te = function() {
        var a = new Sa(), b = [];
        this.$get = [ "$$AnimateRunner", "$rootScope", function(d, c) {
            function e(a, b, c) {
                var d = !1;
                return b && (b = E(b) ? b.split(" ") : I(b) ? b : [], n(b, function(b) {
                    b && (d = !0, a[b] = c);
                })), d;
            }
            function f() {
                n(b, function(b) {
                    var c = a.get(b);
                    if (c) {
                        var d = Mf(b.attr("class")), e = "", f = "";
                        n(c, function(a, b) {
                            a !== !!d[b] && (a ? e += (e.length ? " " : "") + b : f += (f.length ? " " : "") + b);
                        }), n(b, function(a) {
                            e && Ab(a, e), f && zb(a, f);
                        }), a.remove(b);
                    }
                }), b.length = 0;
            }
            return {
                enabled: x,
                on: x,
                off: x,
                pin: x,
                push: function(g, h, k, l) {
                    return l && l(), k = k || {}, k.from && g.css(k.from), k.to && g.css(k.to), (k.addClass || k.removeClass) && (h = k.addClass, 
                    l = k.removeClass, k = a.get(g) || {}, h = e(k, h, !0), l = e(k, l, !1), (h || l) && (a.put(g, k), 
                    b.push(g), 1 === b.length && c.$$postDigest(f))), new d();
                }
            };
        } ];
    }, Re = [ "$provide", function(a) {
        var b = this;
        this.$$registeredAnimations = Object.create(null), this.register = function(d, c) {
            if (d && "." !== d.charAt(0)) throw Md("notcsel", d);
            var e = d + "-animation";
            b.$$registeredAnimations[d.substr(1)] = e, a.factory(e, c);
        }, this.classNameFilter = function(a) {
            if (1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null) && /(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString())) throw Md("nongcls", "ng-animate");
            return this.$$classNameFilter;
        }, this.$get = [ "$$animateQueue", function(a) {
            function b(a, c, d) {
                if (d) {
                    var h;
                    a: {
                        for (h = 0; h < d.length; h++) {
                            var k = d[h];
                            if (1 === k.nodeType) {
                                h = k;
                                break a;
                            }
                        }
                        h = void 0;
                    }
                    !h || h.parentNode || h.previousElementSibling || (d = null);
                }
                d ? d.after(a) : c.prepend(a);
            }
            return {
                on: a.on,
                off: a.off,
                pin: a.pin,
                enabled: a.enabled,
                cancel: function(a) {
                    a.end && a.end();
                },
                enter: function(e, f, g, h) {
                    return f = f && B(f), g = g && B(g), f = f || g.parent(), b(e, f, g), a.push(e, "enter", Ea(h));
                },
                move: function(e, f, g, h) {
                    return f = f && B(f), g = g && B(g), f = f || g.parent(), b(e, f, g), a.push(e, "move", Ea(h));
                },
                leave: function(b, c) {
                    return a.push(b, "leave", Ea(c), function() {
                        b.remove();
                    });
                },
                addClass: function(b, c, g) {
                    return g = Ea(g), g.addClass = hb(g.addclass, c), a.push(b, "addClass", g);
                },
                removeClass: function(b, c, g) {
                    return g = Ea(g), g.removeClass = hb(g.removeClass, c), a.push(b, "removeClass", g);
                },
                setClass: function(b, c, g, h) {
                    return h = Ea(h), h.addClass = hb(h.addClass, c), h.removeClass = hb(h.removeClass, g), 
                    a.push(b, "setClass", h);
                },
                animate: function(b, c, g, h, k) {
                    return k = Ea(k), k.from = k.from ? M(k.from, c) : c, k.to = k.to ? M(k.to, g) : g, 
                    k.tempClasses = hb(k.tempClasses, h || "ng-inline-animate"), a.push(b, "animate", k);
                }
            };
        } ];
    } ], Se = function() {
        this.$get = [ "$$rAF", "$q", function(a, b) {
            var d = function() {};
            return d.prototype = {
                done: function(a) {
                    this.defer && this.defer[!0 === a ? "reject" : "resolve"]();
                },
                end: function() {
                    this.done();
                },
                cancel: function() {
                    this.done(!0);
                },
                getPromise: function() {
                    return this.defer || (this.defer = b.defer()), this.defer.promise;
                },
                then: function(a, b) {
                    return this.getPromise().then(a, b);
                },
                "catch": function(a) {
                    return this.getPromise()["catch"](a);
                },
                "finally": function(a) {
                    return this.getPromise()["finally"](a);
                }
            }, function(b, e) {
                function f() {
                    return a(function() {
                        e.addClass && (b.addClass(e.addClass), e.addClass = null), e.removeClass && (b.removeClass(e.removeClass), 
                        e.removeClass = null), e.to && (b.css(e.to), e.to = null), g || h.done(), g = !0;
                    }), h;
                }
                e.cleanupStyles && (e.from = e.to = null), e.from && (b.css(e.from), e.from = null);
                var g, h = new d();
                return {
                    start: f,
                    end: f
                };
            };
        } ];
    }, ha = G("$compile");
    Cc.$inject = [ "$provide", "$$sanitizeUriProvider" ];
    var Vc = /^((?:x|data)[\:\-_])/i, Qf = G("$controller"), Uc = /^(\S+)(\s+as\s+(\w+))?$/, $e = function() {
        this.$get = [ "$document", function(a) {
            return function(b) {
                return b ? !b.nodeType && b instanceof B && (b = b[0]) : b = a[0].body, b.offsetWidth + 1;
            };
        } ];
    }, $c = "application/json", ac = {
        "Content-Type": $c + ";charset=utf-8"
    }, Sf = /^\[|^\{(?!\{)/, Tf = {
        "[": /]$/,
        "{": /}$/
    }, Rf = /^\)\]\}',?\n/, pg = G("$http"), dd = function(a) {
        return function() {
            throw pg("legacy", a);
        };
    }, Ja = fa.$interpolateMinErr = G("$interpolate");
    Ja.throwNoconcat = function(a) {
        throw Ja("noconcat", a);
    }, Ja.interr = function(a, b) {
        return Ja("interr", a, b.toString());
    };
    var qg = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Vf = {
        http: 80,
        https: 443,
        ftp: 21
    }, Db = G("$location"), rg = {
        $$html5: !1,
        $$replace: !1,
        absUrl: Eb("$$absUrl"),
        url: function(a) {
            if (q(a)) return this.$$url;
            var b = qg.exec(a);
            return (b[1] || "" === a) && this.path(decodeURIComponent(b[1])), (b[2] || b[1] || "" === a) && this.search(b[3] || ""), 
            this.hash(b[5] || ""), this;
        },
        protocol: Eb("$$protocol"),
        host: Eb("$$host"),
        port: Eb("$$port"),
        path: id("$$path", function(a) {
            return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a;
        }),
        search: function(a, b) {
            switch (arguments.length) {
              case 0:
                return this.$$search;

              case 1:
                if (E(a) || Q(a)) a = a.toString(), this.$$search = xc(a); else {
                    if (!H(a)) throw Db("isrcharg");
                    a = bb(a, {}), n(a, function(b, c) {
                        null == b && delete a[c];
                    }), this.$$search = a;
                }
                break;

              default:
                q(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b;
            }
            return this.$$compose(), this;
        },
        hash: id("$$hash", function(a) {
            return null !== a ? a.toString() : "";
        }),
        replace: function() {
            return this.$$replace = !0, this;
        }
    };
    n([ hd, dc, cc ], function(a) {
        a.prototype = Object.create(rg), a.prototype.state = function(b) {
            if (!arguments.length) return this.$$state;
            if (a !== cc || !this.$$html5) throw Db("nostate");
            return this.$$state = q(b) ? null : b, this;
        };
    });
    var ba = G("$parse"), Wf = Function.prototype.call, Xf = Function.prototype.apply, Yf = Function.prototype.bind, Lb = $();
    n("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(a) {
        Lb[a] = !0;
    });
    var sg = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, fc = function(a) {
        this.options = a;
    };
    fc.prototype = {
        constructor: fc,
        lex: function(a) {
            for (this.text = a, this.index = 0, this.tokens = []; this.index < this.text.length; ) if (a = this.text.charAt(this.index), 
            '"' === a || "'" === a) this.readString(a); else if (this.isNumber(a) || "." === a && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(a)) this.readIdent(); else if (this.is(a, "(){}[].,;:?")) this.tokens.push({
                index: this.index,
                text: a
            }), this.index++; else if (this.isWhitespace(a)) this.index++; else {
                var b = a + this.peek(), d = b + this.peek(2), c = Lb[b], e = Lb[d];
                Lb[a] || c || e ? (a = e ? d : c ? b : a, this.tokens.push({
                    index: this.index,
                    text: a,
                    operator: !0
                }), this.index += a.length) : this.throwError("Unexpected next character ", this.index, this.index + 1);
            }
            return this.tokens;
        },
        is: function(a, b) {
            return -1 !== b.indexOf(a);
        },
        peek: function(a) {
            return a = a || 1, this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
        },
        isNumber: function(a) {
            return a >= "0" && "9" >= a && "string" == typeof a;
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a;
        },
        isIdent: function(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a;
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a);
        },
        throwError: function(a, b, d) {
            throw d = d || this.index, b = y(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, d) + "]" : " " + d, 
            ba("lexerr", a, b, this.text);
        },
        readNumber: function() {
            for (var a = "", b = this.index; this.index < this.text.length; ) {
                var d = F(this.text.charAt(this.index));
                if ("." == d || this.isNumber(d)) a += d; else {
                    var c = this.peek();
                    if ("e" == d && this.isExpOperator(c)) a += d; else if (this.isExpOperator(d) && c && this.isNumber(c) && "e" == a.charAt(a.length - 1)) a += d; else {
                        if (!this.isExpOperator(d) || c && this.isNumber(c) || "e" != a.charAt(a.length - 1)) break;
                        this.throwError("Invalid exponent");
                    }
                }
                this.index++;
            }
            this.tokens.push({
                index: b,
                text: a,
                constant: !0,
                value: Number(a)
            });
        },
        readIdent: function() {
            for (var a = this.index; this.index < this.text.length; ) {
                var b = this.text.charAt(this.index);
                if (!this.isIdent(b) && !this.isNumber(b)) break;
                this.index++;
            }
            this.tokens.push({
                index: a,
                text: this.text.slice(a, this.index),
                identifier: !0
            });
        },
        readString: function(a) {
            var b = this.index;
            this.index++;
            for (var d = "", c = a, e = !1; this.index < this.text.length; ) {
                var f = this.text.charAt(this.index), c = c + f;
                if (e) "u" === f ? (e = this.text.substring(this.index + 1, this.index + 5), e.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + e + "]"), 
                this.index += 4, d += String.fromCharCode(parseInt(e, 16))) : d += sg[f] || f, e = !1; else if ("\\" === f) e = !0; else {
                    if (f === a) return this.index++, void this.tokens.push({
                        index: b,
                        text: c,
                        constant: !0,
                        value: d
                    });
                    d += f;
                }
                this.index++;
            }
            this.throwError("Unterminated quote", b);
        }
    };
    var s = function(a, b) {
        this.lexer = a, this.options = b;
    };
    s.Program = "Program", s.ExpressionStatement = "ExpressionStatement", s.AssignmentExpression = "AssignmentExpression", 
    s.ConditionalExpression = "ConditionalExpression", s.LogicalExpression = "LogicalExpression", 
    s.BinaryExpression = "BinaryExpression", s.UnaryExpression = "UnaryExpression", 
    s.CallExpression = "CallExpression", s.MemberExpression = "MemberExpression", s.Identifier = "Identifier", 
    s.Literal = "Literal", s.ArrayExpression = "ArrayExpression", s.Property = "Property", 
    s.ObjectExpression = "ObjectExpression", s.ThisExpression = "ThisExpression", s.NGValueParameter = "NGValueParameter", 
    s.prototype = {
        ast: function(a) {
            return this.text = a, this.tokens = this.lexer.lex(a), a = this.program(), 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
            a;
        },
        program: function() {
            for (var a = []; ;) if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.expressionStatement()), 
            !this.expect(";")) return {
                type: s.Program,
                body: a
            };
        },
        expressionStatement: function() {
            return {
                type: s.ExpressionStatement,
                expression: this.filterChain()
            };
        },
        filterChain: function() {
            for (var a = this.expression(); this.expect("|"); ) a = this.filter(a);
            return a;
        },
        expression: function() {
            return this.assignment();
        },
        assignment: function() {
            var a = this.ternary();
            return this.expect("=") && (a = {
                type: s.AssignmentExpression,
                left: a,
                right: this.assignment(),
                operator: "="
            }), a;
        },
        ternary: function() {
            var b, d, a = this.logicalOR();
            return this.expect("?") && (b = this.expression(), this.consume(":")) ? (d = this.expression(), 
            {
                type: s.ConditionalExpression,
                test: a,
                alternate: b,
                consequent: d
            }) : a;
        },
        logicalOR: function() {
            for (var a = this.logicalAND(); this.expect("||"); ) a = {
                type: s.LogicalExpression,
                operator: "||",
                left: a,
                right: this.logicalAND()
            };
            return a;
        },
        logicalAND: function() {
            for (var a = this.equality(); this.expect("&&"); ) a = {
                type: s.LogicalExpression,
                operator: "&&",
                left: a,
                right: this.equality()
            };
            return a;
        },
        equality: function() {
            for (var b, a = this.relational(); b = this.expect("==", "!=", "===", "!=="); ) a = {
                type: s.BinaryExpression,
                operator: b.text,
                left: a,
                right: this.relational()
            };
            return a;
        },
        relational: function() {
            for (var b, a = this.additive(); b = this.expect("<", ">", "<=", ">="); ) a = {
                type: s.BinaryExpression,
                operator: b.text,
                left: a,
                right: this.additive()
            };
            return a;
        },
        additive: function() {
            for (var b, a = this.multiplicative(); b = this.expect("+", "-"); ) a = {
                type: s.BinaryExpression,
                operator: b.text,
                left: a,
                right: this.multiplicative()
            };
            return a;
        },
        multiplicative: function() {
            for (var b, a = this.unary(); b = this.expect("*", "/", "%"); ) a = {
                type: s.BinaryExpression,
                operator: b.text,
                left: a,
                right: this.unary()
            };
            return a;
        },
        unary: function() {
            var a;
            return (a = this.expect("+", "-", "!")) ? {
                type: s.UnaryExpression,
                operator: a.text,
                prefix: !0,
                argument: this.unary()
            } : this.primary();
        },
        primary: function() {
            var a;
            this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.constants.hasOwnProperty(this.peek().text) ? a = bb(this.constants[this.consume().text]) : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var b; b = this.expect("(", "[", "."); ) "(" === b.text ? (a = {
                type: s.CallExpression,
                callee: a,
                arguments: this.parseArguments()
            }, this.consume(")")) : "[" === b.text ? (a = {
                type: s.MemberExpression,
                object: a,
                property: this.expression(),
                computed: !0
            }, this.consume("]")) : "." === b.text ? a = {
                type: s.MemberExpression,
                object: a,
                property: this.identifier(),
                computed: !1
            } : this.throwError("IMPOSSIBLE");
            return a;
        },
        filter: function(a) {
            a = [ a ];
            for (var b = {
                type: s.CallExpression,
                callee: this.identifier(),
                arguments: a,
                filter: !0
            }; this.expect(":"); ) a.push(this.expression());
            return b;
        },
        parseArguments: function() {
            var a = [];
            if (")" !== this.peekToken().text) do a.push(this.expression()); while (this.expect(","));
            return a;
        },
        identifier: function() {
            var a = this.consume();
            return a.identifier || this.throwError("is not a valid identifier", a), {
                type: s.Identifier,
                name: a.text
            };
        },
        constant: function() {
            return {
                type: s.Literal,
                value: this.consume().value
            };
        },
        arrayDeclaration: function() {
            var a = [];
            if ("]" !== this.peekToken().text) do {
                if (this.peek("]")) break;
                a.push(this.expression());
            } while (this.expect(","));
            return this.consume("]"), {
                type: s.ArrayExpression,
                elements: a
            };
        },
        object: function() {
            var b, a = [];
            if ("}" !== this.peekToken().text) do {
                if (this.peek("}")) break;
                b = {
                    type: s.Property,
                    kind: "init"
                }, this.peek().constant ? b.key = this.constant() : this.peek().identifier ? b.key = this.identifier() : this.throwError("invalid key", this.peek()), 
                this.consume(":"), b.value = this.expression(), a.push(b);
            } while (this.expect(","));
            return this.consume("}"), {
                type: s.ObjectExpression,
                properties: a
            };
        },
        throwError: function(a, b) {
            throw ba("syntax", b.text, a, b.index + 1, this.text, this.text.substring(b.index));
        },
        consume: function(a) {
            if (0 === this.tokens.length) throw ba("ueoe", this.text);
            var b = this.expect(a);
            return b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()), 
            b;
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw ba("ueoe", this.text);
            return this.tokens[0];
        },
        peek: function(a, b, d, c) {
            return this.peekAhead(0, a, b, d, c);
        },
        peekAhead: function(a, b, d, c, e) {
            if (this.tokens.length > a) {
                a = this.tokens[a];
                var f = a.text;
                if (f === b || f === d || f === c || f === e || !(b || d || c || e)) return a;
            }
            return !1;
        },
        expect: function(a, b, d, c) {
            return (a = this.peek(a, b, d, c)) ? (this.tokens.shift(), a) : !1;
        },
        constants: {
            "true": {
                type: s.Literal,
                value: !0
            },
            "false": {
                type: s.Literal,
                value: !1
            },
            "null": {
                type: s.Literal,
                value: null
            },
            undefined: {
                type: s.Literal,
                value: u
            },
            "this": {
                type: s.ThisExpression
            }
        }
    }, rd.prototype = {
        compile: function(a, b) {
            var d = this, c = this.astBuilder.ast(a);
            this.state = {
                nextId: 0,
                filters: {},
                expensiveChecks: b,
                fn: {
                    vars: [],
                    body: [],
                    own: {}
                },
                assign: {
                    vars: [],
                    body: [],
                    own: {}
                },
                inputs: []
            }, W(c, d.$filter);
            var f, e = "";
            return this.stage = "assign", (f = pd(c)) && (this.state.computing = "assign", e = this.nextId(), 
            this.recurse(f, e), this.return_(e), e = "fn.assign=" + this.generateFunction("assign", "s,v,l")), 
            f = nd(c.body), d.stage = "inputs", n(f, function(a, b) {
                var c = "fn" + b;
                d.state[c] = {
                    vars: [],
                    body: [],
                    own: {}
                }, d.state.computing = c;
                var e = d.nextId();
                d.recurse(a, e), d.return_(e), d.state.inputs.push(c), a.watchId = b;
            }), this.state.computing = "fn", this.stage = "main", this.recurse(c), e = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + e + this.watchFns() + "return fn;", 
            e = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", e)(this.$filter, Va, xa, kd, jd, ld, Zf, md, a), 
            this.state = this.stage = u, e.literal = qd(c), e.constant = c.constant, e;
        },
        USE: "use",
        STRICT: "strict",
        watchFns: function() {
            var a = [], b = this.state.inputs, d = this;
            return n(b, function(b) {
                a.push("var " + b + "=" + d.generateFunction(b, "s"));
            }), b.length && a.push("fn.inputs=[" + b.join(",") + "];"), a.join("");
        },
        generateFunction: function(a, b) {
            return "function(" + b + "){" + this.varsPrefix(a) + this.body(a) + "};";
        },
        filterPrefix: function() {
            var a = [], b = this;
            return n(this.state.filters, function(d, c) {
                a.push(d + "=$filter(" + b.escape(c) + ")");
            }), a.length ? "var " + a.join(",") + ";" : "";
        },
        varsPrefix: function(a) {
            return this.state[a].vars.length ? "var " + this.state[a].vars.join(",") + ";" : "";
        },
        body: function(a) {
            return this.state[a].body.join("");
        },
        recurse: function(a, b, d, c, e, f) {
            var g, h, l, m, k = this;
            if (c = c || x, !f && y(a.watchId)) b = b || this.nextId(), this.if_("i", this.lazyAssign(b, this.computedMember("i", a.watchId)), this.lazyRecurse(a, b, d, c, e, !0)); else switch (a.type) {
              case s.Program:
                n(a.body, function(b, c) {
                    k.recurse(b.expression, u, u, function(a) {
                        h = a;
                    }), c !== a.body.length - 1 ? k.current().body.push(h, ";") : k.return_(h);
                });
                break;

              case s.Literal:
                m = this.escape(a.value), this.assign(b, m), c(m);
                break;

              case s.UnaryExpression:
                this.recurse(a.argument, u, u, function(a) {
                    h = a;
                }), m = a.operator + "(" + this.ifDefined(h, 0) + ")", this.assign(b, m), c(m);
                break;

              case s.BinaryExpression:
                this.recurse(a.left, u, u, function(a) {
                    g = a;
                }), this.recurse(a.right, u, u, function(a) {
                    h = a;
                }), m = "+" === a.operator ? this.plus(g, h) : "-" === a.operator ? this.ifDefined(g, 0) + a.operator + this.ifDefined(h, 0) : "(" + g + ")" + a.operator + "(" + h + ")", 
                this.assign(b, m), c(m);
                break;

              case s.LogicalExpression:
                b = b || this.nextId(), k.recurse(a.left, b), k.if_("&&" === a.operator ? b : k.not(b), k.lazyRecurse(a.right, b)), 
                c(b);
                break;

              case s.ConditionalExpression:
                b = b || this.nextId(), k.recurse(a.test, b), k.if_(b, k.lazyRecurse(a.alternate, b), k.lazyRecurse(a.consequent, b)), 
                c(b);
                break;

              case s.Identifier:
                b = b || this.nextId(), d && (d.context = "inputs" === k.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", a.name) + "?l:s"), 
                d.computed = !1, d.name = a.name), Va(a.name), k.if_("inputs" === k.stage || k.not(k.getHasOwnProperty("l", a.name)), function() {
                    k.if_("inputs" === k.stage || "s", function() {
                        e && 1 !== e && k.if_(k.not(k.nonComputedMember("s", a.name)), k.lazyAssign(k.nonComputedMember("s", a.name), "{}")), 
                        k.assign(b, k.nonComputedMember("s", a.name));
                    });
                }, b && k.lazyAssign(b, k.nonComputedMember("l", a.name))), (k.state.expensiveChecks || Fb(a.name)) && k.addEnsureSafeObject(b), 
                c(b);
                break;

              case s.MemberExpression:
                g = d && (d.context = this.nextId()) || this.nextId(), b = b || this.nextId(), k.recurse(a.object, g, u, function() {
                    k.if_(k.notNull(g), function() {
                        a.computed ? (h = k.nextId(), k.recurse(a.property, h), k.getStringValue(h), k.addEnsureSafeMemberName(h), 
                        e && 1 !== e && k.if_(k.not(k.computedMember(g, h)), k.lazyAssign(k.computedMember(g, h), "{}")), 
                        m = k.ensureSafeObject(k.computedMember(g, h)), k.assign(b, m), d && (d.computed = !0, 
                        d.name = h)) : (Va(a.property.name), e && 1 !== e && k.if_(k.not(k.nonComputedMember(g, a.property.name)), k.lazyAssign(k.nonComputedMember(g, a.property.name), "{}")), 
                        m = k.nonComputedMember(g, a.property.name), (k.state.expensiveChecks || Fb(a.property.name)) && (m = k.ensureSafeObject(m)), 
                        k.assign(b, m), d && (d.computed = !1, d.name = a.property.name));
                    }, function() {
                        k.assign(b, "undefined");
                    }), c(b);
                }, !!e);
                break;

              case s.CallExpression:
                b = b || this.nextId(), a.filter ? (h = k.filter(a.callee.name), l = [], n(a.arguments, function(a) {
                    var b = k.nextId();
                    k.recurse(a, b), l.push(b);
                }), m = h + "(" + l.join(",") + ")", k.assign(b, m), c(b)) : (h = k.nextId(), g = {}, 
                l = [], k.recurse(a.callee, h, g, function() {
                    k.if_(k.notNull(h), function() {
                        k.addEnsureSafeFunction(h), n(a.arguments, function(a) {
                            k.recurse(a, k.nextId(), u, function(a) {
                                l.push(k.ensureSafeObject(a));
                            });
                        }), g.name ? (k.state.expensiveChecks || k.addEnsureSafeObject(g.context), m = k.member(g.context, g.name, g.computed) + "(" + l.join(",") + ")") : m = h + "(" + l.join(",") + ")", 
                        m = k.ensureSafeObject(m), k.assign(b, m);
                    }, function() {
                        k.assign(b, "undefined");
                    }), c(b);
                }));
                break;

              case s.AssignmentExpression:
                if (h = this.nextId(), g = {}, !od(a.left)) throw ba("lval");
                this.recurse(a.left, u, g, function() {
                    k.if_(k.notNull(g.context), function() {
                        k.recurse(a.right, h), k.addEnsureSafeObject(k.member(g.context, g.name, g.computed)), 
                        k.addEnsureSafeAssignContext(g.context), m = k.member(g.context, g.name, g.computed) + a.operator + h, 
                        k.assign(b, m), c(b || m);
                    });
                }, 1);
                break;

              case s.ArrayExpression:
                l = [], n(a.elements, function(a) {
                    k.recurse(a, k.nextId(), u, function(a) {
                        l.push(a);
                    });
                }), m = "[" + l.join(",") + "]", this.assign(b, m), c(m);
                break;

              case s.ObjectExpression:
                l = [], n(a.properties, function(a) {
                    k.recurse(a.value, k.nextId(), u, function(b) {
                        l.push(k.escape(a.key.type === s.Identifier ? a.key.name : "" + a.key.value) + ":" + b);
                    });
                }), m = "{" + l.join(",") + "}", this.assign(b, m), c(m);
                break;

              case s.ThisExpression:
                this.assign(b, "s"), c("s");
                break;

              case s.NGValueParameter:
                this.assign(b, "v"), c("v");
            }
        },
        getHasOwnProperty: function(a, b) {
            var d = a + "." + b, c = this.current().own;
            return c.hasOwnProperty(d) || (c[d] = this.nextId(!1, a + "&&(" + this.escape(b) + " in " + a + ")")), 
            c[d];
        },
        assign: function(a, b) {
            return a ? (this.current().body.push(a, "=", b, ";"), a) : void 0;
        },
        filter: function(a) {
            return this.state.filters.hasOwnProperty(a) || (this.state.filters[a] = this.nextId(!0)), 
            this.state.filters[a];
        },
        ifDefined: function(a, b) {
            return "ifDefined(" + a + "," + this.escape(b) + ")";
        },
        plus: function(a, b) {
            return "plus(" + a + "," + b + ")";
        },
        return_: function(a) {
            this.current().body.push("return ", a, ";");
        },
        if_: function(a, b, d) {
            if (!0 === a) b(); else {
                var c = this.current().body;
                c.push("if(", a, "){"), b(), c.push("}"), d && (c.push("else{"), d(), c.push("}"));
            }
        },
        not: function(a) {
            return "!(" + a + ")";
        },
        notNull: function(a) {
            return a + "!=null";
        },
        nonComputedMember: function(a, b) {
            return a + "." + b;
        },
        computedMember: function(a, b) {
            return a + "[" + b + "]";
        },
        member: function(a, b, d) {
            return d ? this.computedMember(a, b) : this.nonComputedMember(a, b);
        },
        addEnsureSafeObject: function(a) {
            this.current().body.push(this.ensureSafeObject(a), ";");
        },
        addEnsureSafeMemberName: function(a) {
            this.current().body.push(this.ensureSafeMemberName(a), ";");
        },
        addEnsureSafeFunction: function(a) {
            this.current().body.push(this.ensureSafeFunction(a), ";");
        },
        addEnsureSafeAssignContext: function(a) {
            this.current().body.push(this.ensureSafeAssignContext(a), ";");
        },
        ensureSafeObject: function(a) {
            return "ensureSafeObject(" + a + ",text)";
        },
        ensureSafeMemberName: function(a) {
            return "ensureSafeMemberName(" + a + ",text)";
        },
        ensureSafeFunction: function(a) {
            return "ensureSafeFunction(" + a + ",text)";
        },
        getStringValue: function(a) {
            this.assign(a, "getStringValue(" + a + ",text)");
        },
        ensureSafeAssignContext: function(a) {
            return "ensureSafeAssignContext(" + a + ",text)";
        },
        lazyRecurse: function(a, b, d, c, e, f) {
            var g = this;
            return function() {
                g.recurse(a, b, d, c, e, f);
            };
        },
        lazyAssign: function(a, b) {
            var d = this;
            return function() {
                d.assign(a, b);
            };
        },
        stringEscapeRegex: /[^ a-zA-Z0-9]/g,
        stringEscapeFn: function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        },
        escape: function(a) {
            if (E(a)) return "'" + a.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
            if (Q(a)) return a.toString();
            if (!0 === a) return "true";
            if (!1 === a) return "false";
            if (null === a) return "null";
            if ("undefined" == typeof a) return "undefined";
            throw ba("esc");
        },
        nextId: function(a, b) {
            var d = "v" + this.state.nextId++;
            return a || this.current().vars.push(d + (b ? "=" + b : "")), d;
        },
        current: function() {
            return this.state[this.state.computing];
        }
    }, sd.prototype = {
        compile: function(a, b) {
            var d = this, c = this.astBuilder.ast(a);
            this.expression = a, this.expensiveChecks = b, W(c, d.$filter);
            var e, f;
            (e = pd(c)) && (f = this.recurse(e)), e = nd(c.body);
            var g;
            e && (g = [], n(e, function(a, b) {
                var c = d.recurse(a);
                a.input = c, g.push(c), a.watchId = b;
            }));
            var h = [];
            return n(c.body, function(a) {
                h.push(d.recurse(a.expression));
            }), e = 0 === c.body.length ? function() {} : 1 === c.body.length ? h[0] : function(a, b) {
                var c;
                return n(h, function(d) {
                    c = d(a, b);
                }), c;
            }, f && (e.assign = function(a, b, c) {
                return f(a, c, b);
            }), g && (e.inputs = g), e.literal = qd(c), e.constant = c.constant, e;
        },
        recurse: function(a, b, d) {
            var c, e, g, f = this;
            if (a.input) return this.inputs(a.input, a.watchId);
            switch (a.type) {
              case s.Literal:
                return this.value(a.value, b);

              case s.UnaryExpression:
                return e = this.recurse(a.argument), this["unary" + a.operator](e, b);

              case s.BinaryExpression:
                return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b);

              case s.LogicalExpression:
                return c = this.recurse(a.left), e = this.recurse(a.right), this["binary" + a.operator](c, e, b);

              case s.ConditionalExpression:
                return this["ternary?:"](this.recurse(a.test), this.recurse(a.alternate), this.recurse(a.consequent), b);

              case s.Identifier:
                return Va(a.name, f.expression), f.identifier(a.name, f.expensiveChecks || Fb(a.name), b, d, f.expression);

              case s.MemberExpression:
                return c = this.recurse(a.object, !1, !!d), a.computed || (Va(a.property.name, f.expression), 
                e = a.property.name), a.computed && (e = this.recurse(a.property)), a.computed ? this.computedMember(c, e, b, d, f.expression) : this.nonComputedMember(c, e, f.expensiveChecks, b, d, f.expression);

              case s.CallExpression:
                return g = [], n(a.arguments, function(a) {
                    g.push(f.recurse(a));
                }), a.filter && (e = this.$filter(a.callee.name)), a.filter || (e = this.recurse(a.callee, !0)), 
                a.filter ? function(a, c, d, f) {
                    for (var r = [], n = 0; n < g.length; ++n) r.push(g[n](a, c, d, f));
                    return a = e.apply(u, r, f), b ? {
                        context: u,
                        name: u,
                        value: a
                    } : a;
                } : function(a, c, d, m) {
                    var n, r = e(a, c, d, m);
                    if (null != r.value) {
                        xa(r.context, f.expression), kd(r.value, f.expression), n = [];
                        for (var q = 0; q < g.length; ++q) n.push(xa(g[q](a, c, d, m), f.expression));
                        n = xa(r.value.apply(r.context, n), f.expression);
                    }
                    return b ? {
                        value: n
                    } : n;
                };

              case s.AssignmentExpression:
                return c = this.recurse(a.left, !0, 1), e = this.recurse(a.right), function(a, d, g, m) {
                    var n = c(a, d, g, m);
                    return a = e(a, d, g, m), xa(n.value, f.expression), ld(n.context), n.context[n.name] = a, 
                    b ? {
                        value: a
                    } : a;
                };

              case s.ArrayExpression:
                return g = [], n(a.elements, function(a) {
                    g.push(f.recurse(a));
                }), function(a, c, d, e) {
                    for (var f = [], n = 0; n < g.length; ++n) f.push(g[n](a, c, d, e));
                    return b ? {
                        value: f
                    } : f;
                };

              case s.ObjectExpression:
                return g = [], n(a.properties, function(a) {
                    g.push({
                        key: a.key.type === s.Identifier ? a.key.name : "" + a.key.value,
                        value: f.recurse(a.value)
                    });
                }), function(a, c, d, e) {
                    for (var f = {}, n = 0; n < g.length; ++n) f[g[n].key] = g[n].value(a, c, d, e);
                    return b ? {
                        value: f
                    } : f;
                };

              case s.ThisExpression:
                return function(a) {
                    return b ? {
                        value: a
                    } : a;
                };

              case s.NGValueParameter:
                return function(a, c, d, e) {
                    return b ? {
                        value: d
                    } : d;
                };
            }
        },
        "unary+": function(a, b) {
            return function(d, c, e, f) {
                return d = a(d, c, e, f), d = y(d) ? +d : 0, b ? {
                    value: d
                } : d;
            };
        },
        "unary-": function(a, b) {
            return function(d, c, e, f) {
                return d = a(d, c, e, f), d = y(d) ? -d : 0, b ? {
                    value: d
                } : d;
            };
        },
        "unary!": function(a, b) {
            return function(d, c, e, f) {
                return d = !a(d, c, e, f), b ? {
                    value: d
                } : d;
            };
        },
        "binary+": function(a, b, d) {
            return function(c, e, f, g) {
                var h = a(c, e, f, g);
                return c = b(c, e, f, g), h = md(h, c), d ? {
                    value: h
                } : h;
            };
        },
        "binary-": function(a, b, d) {
            return function(c, e, f, g) {
                var h = a(c, e, f, g);
                return c = b(c, e, f, g), h = (y(h) ? h : 0) - (y(c) ? c : 0), d ? {
                    value: h
                } : h;
            };
        },
        "binary*": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) * b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary/": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) / b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary%": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) % b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary===": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) === b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary!==": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) !== b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary==": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) == b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary!=": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) != b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary<": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) < b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary>": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) > b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary<=": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) <= b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary>=": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) >= b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary&&": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) && b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "binary||": function(a, b, d) {
            return function(c, e, f, g) {
                return c = a(c, e, f, g) || b(c, e, f, g), d ? {
                    value: c
                } : c;
            };
        },
        "ternary?:": function(a, b, d, c) {
            return function(e, f, g, h) {
                return e = a(e, f, g, h) ? b(e, f, g, h) : d(e, f, g, h), c ? {
                    value: e
                } : e;
            };
        },
        value: function(a, b) {
            return function() {
                return b ? {
                    context: u,
                    name: u,
                    value: a
                } : a;
            };
        },
        identifier: function(a, b, d, c, e) {
            return function(f, g, h, k) {
                return f = g && a in g ? g : f, c && 1 !== c && f && !f[a] && (f[a] = {}), g = f ? f[a] : u, 
                b && xa(g, e), d ? {
                    context: f,
                    name: a,
                    value: g
                } : g;
            };
        },
        computedMember: function(a, b, d, c, e) {
            return function(f, g, h, k) {
                var m, n, l = a(f, g, h, k);
                return null != l && (m = b(f, g, h, k), m = jd(m), Va(m, e), c && 1 !== c && l && !l[m] && (l[m] = {}), 
                n = l[m], xa(n, e)), d ? {
                    context: l,
                    name: m,
                    value: n
                } : n;
            };
        },
        nonComputedMember: function(a, b, d, c, e, f) {
            return function(g, h, k, l) {
                return g = a(g, h, k, l), e && 1 !== e && g && !g[b] && (g[b] = {}), h = null != g ? g[b] : u, 
                (d || Fb(b)) && xa(h, f), c ? {
                    context: g,
                    name: b,
                    value: h
                } : h;
            };
        },
        inputs: function(a, b) {
            return function(d, c, e, f) {
                return f ? f[b] : a(d, c, e);
            };
        }
    };
    var gc = function(a, b, d) {
        this.lexer = a, this.$filter = b, this.options = d, this.ast = new s(this.lexer), 
        this.astCompiler = d.csp ? new sd(this.ast, b) : new rd(this.ast, b);
    };
    gc.prototype = {
        constructor: gc,
        parse: function(a) {
            return this.astCompiler.compile(a, this.options.expensiveChecks);
        }
    }, $(), $();
    var $f = Object.prototype.valueOf, ya = G("$sce"), la = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, ha = G("$compile"), Y = X.createElement("a"), wd = wa(S.location.href);
    xd.$inject = [ "$document" ], Jc.$inject = [ "$provide" ], yd.$inject = [ "$locale" ], 
    Ad.$inject = [ "$locale" ];
    var ic = ".", jg = {
        yyyy: ca("FullYear", 4),
        yy: ca("FullYear", 2, 0, !0),
        y: ca("FullYear", 1),
        MMMM: Hb("Month"),
        MMM: Hb("Month", !0),
        MM: ca("Month", 2, 1),
        M: ca("Month", 1, 1),
        dd: ca("Date", 2),
        d: ca("Date", 1),
        HH: ca("Hours", 2),
        H: ca("Hours", 1),
        hh: ca("Hours", 2, -12),
        h: ca("Hours", 1, -12),
        mm: ca("Minutes", 2),
        m: ca("Minutes", 1),
        ss: ca("Seconds", 2),
        s: ca("Seconds", 1),
        sss: ca("Milliseconds", 3),
        EEEE: Hb("Day"),
        EEE: Hb("Day", !0),
        a: function(a, b) {
            return 12 > a.getHours() ? b.AMPMS[0] : b.AMPMS[1];
        },
        Z: function(a, b, d) {
            return a = -1 * d, a = (a >= 0 ? "+" : "") + (Gb(Math[a > 0 ? "floor" : "ceil"](a / 60), 2) + Gb(Math.abs(a % 60), 2));
        },
        ww: Ed(2),
        w: Ed(1),
        G: jc,
        GG: jc,
        GGG: jc,
        GGGG: function(a, b) {
            return 0 >= a.getFullYear() ? b.ERANAMES[0] : b.ERANAMES[1];
        }
    }, ig = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, hg = /^\-?\d+$/;
    zd.$inject = [ "$locale" ];
    var eg = na(F), fg = na(sb);
    Bd.$inject = [ "$parse" ];
    var he = na({
        restrict: "E",
        compile: function(a, b) {
            return b.href || b.xlinkHref ? void 0 : function(a, b) {
                if ("a" === b[0].nodeName.toLowerCase()) {
                    var e = "[object SVGAnimatedString]" === sa.call(b.prop("href")) ? "xlink:href" : "href";
                    b.on("click", function(a) {
                        b.attr(e) || a.preventDefault();
                    });
                }
            };
        }
    }), tb = {};
    n(Cb, function(a, b) {
        function d(a, d, e) {
            a.$watch(e[c], function(a) {
                e.$set(b, !!a);
            });
        }
        if ("multiple" != a) {
            var c = va("ng-" + b), e = d;
            "checked" === a && (e = function(a, b, e) {
                e.ngModel !== e[c] && d(a, b, e);
            }), tb[c] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: e
                };
            };
        }
    }), n(Zc, function(a, b) {
        tb[b] = function() {
            return {
                priority: 100,
                link: function(a, c, e) {
                    return "ngPattern" === b && "/" == e.ngPattern.charAt(0) && (c = e.ngPattern.match(lg)) ? void e.$set("ngPattern", new RegExp(c[1], c[2])) : void a.$watch(e[b], function(a) {
                        e.$set(b, a);
                    });
                }
            };
        };
    }), n([ "src", "srcset", "href" ], function(a) {
        var b = va("ng-" + a);
        tb[b] = function() {
            return {
                priority: 99,
                link: function(d, c, e) {
                    var f = a, g = a;
                    "href" === a && "[object SVGAnimatedString]" === sa.call(c.prop("href")) && (g = "xlinkHref", 
                    e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(b) {
                        b ? (e.$set(g, b), Ha && f && c.prop(f, e[g])) : "href" === a && e.$set(g, null);
                    });
                }
            };
        };
    });
    var Ib = {
        $addControl: x,
        $$renameControl: function(a, b) {
            a.$name = b;
        },
        $removeControl: x,
        $setValidity: x,
        $setDirty: x,
        $setPristine: x,
        $setSubmitted: x
    };
    Fd.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
    var Nd = function(a) {
        return [ "$timeout", "$parse", function(b, d) {
            function c(a) {
                return "" === a ? d('this[""]').assign : d(a).assign || x;
            }
            return {
                name: "form",
                restrict: a ? "EAC" : "E",
                require: [ "form", "^^?form" ],
                controller: Fd,
                compile: function(d, f) {
                    d.addClass(Wa).addClass(mb);
                    var g = f.name ? "name" : a && f.ngForm ? "ngForm" : !1;
                    return {
                        pre: function(a, d, e, f) {
                            var n = f[0];
                            if (!("action" in e)) {
                                var q = function(b) {
                                    a.$apply(function() {
                                        n.$commitViewValue(), n.$setSubmitted();
                                    }), b.preventDefault();
                                };
                                d[0].addEventListener("submit", q, !1), d.on("$destroy", function() {
                                    b(function() {
                                        d[0].removeEventListener("submit", q, !1);
                                    }, 0, !1);
                                });
                            }
                            (f[1] || n.$$parentForm).$addControl(n);
                            var s = g ? c(n.$name) : x;
                            g && (s(a, n), e.$observe(g, function(b) {
                                n.$name !== b && (s(a, u), n.$$parentForm.$$renameControl(n, b), (s = c(n.$name))(a, n));
                            })), d.on("$destroy", function() {
                                n.$$parentForm.$removeControl(n), s(a, u), M(n, Ib);
                            });
                        }
                    };
                }
            };
        } ];
    }, ie = Nd(), ve = Nd(!0), kg = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, tg = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/, ug = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, vg = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, Od = /^(\d{4})-(\d{2})-(\d{2})$/, Pd = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, mc = /^(\d{4})-W(\d\d)$/, Qd = /^(\d{4})-(\d\d)$/, Rd = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Sd = {
        text: function(a, b, d, c, e, f) {
            jb(a, b, d, c, e, f), kc(c);
        },
        date: kb("date", Od, Kb(Od, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
        "datetime-local": kb("datetimelocal", Pd, Kb(Pd, "yyyy MM dd HH mm ss sss".split(" ")), "yyyy-MM-ddTHH:mm:ss.sss"),
        time: kb("time", Rd, Kb(Rd, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
        week: kb("week", mc, function(a, b) {
            if (da(a)) return a;
            if (E(a)) {
                mc.lastIndex = 0;
                var d = mc.exec(a);
                if (d) {
                    var c = +d[1], e = +d[2], f = d = 0, g = 0, h = 0, k = Dd(c), e = 7 * (e - 1);
                    return b && (d = b.getHours(), f = b.getMinutes(), g = b.getSeconds(), h = b.getMilliseconds()), 
                    new Date(c, 0, k.getDate() + e, d, f, g, h);
                }
            }
            return NaN;
        }, "yyyy-Www"),
        month: kb("month", Qd, Kb(Qd, [ "yyyy", "MM" ]), "yyyy-MM"),
        number: function(a, b, d, c, e, f) {
            if (Hd(a, b, d, c), jb(a, b, d, c, e, f), c.$$parserName = "number", c.$parsers.push(function(a) {
                return c.$isEmpty(a) ? null : vg.test(a) ? parseFloat(a) : u;
            }), c.$formatters.push(function(a) {
                if (!c.$isEmpty(a)) {
                    if (!Q(a)) throw lb("numfmt", a);
                    a = a.toString();
                }
                return a;
            }), y(d.min) || d.ngMin) {
                var g;
                c.$validators.min = function(a) {
                    return c.$isEmpty(a) || q(g) || a >= g;
                }, d.$observe("min", function(a) {
                    y(a) && !Q(a) && (a = parseFloat(a, 10)), g = Q(a) && !isNaN(a) ? a : u, c.$validate();
                });
            }
            if (y(d.max) || d.ngMax) {
                var h;
                c.$validators.max = function(a) {
                    return c.$isEmpty(a) || q(h) || h >= a;
                }, d.$observe("max", function(a) {
                    y(a) && !Q(a) && (a = parseFloat(a, 10)), h = Q(a) && !isNaN(a) ? a : u, c.$validate();
                });
            }
        },
        url: function(a, b, d, c, e, f) {
            jb(a, b, d, c, e, f), kc(c), c.$$parserName = "url", c.$validators.url = function(a, b) {
                var d = a || b;
                return c.$isEmpty(d) || tg.test(d);
            };
        },
        email: function(a, b, d, c, e, f) {
            jb(a, b, d, c, e, f), kc(c), c.$$parserName = "email", c.$validators.email = function(a, b) {
                var d = a || b;
                return c.$isEmpty(d) || ug.test(d);
            };
        },
        radio: function(a, b, d, c) {
            q(d.name) && b.attr("name", ++nb), b.on("click", function(a) {
                b[0].checked && c.$setViewValue(d.value, a && a.type);
            }), c.$render = function() {
                b[0].checked = d.value == c.$viewValue;
            }, d.$observe("value", c.$render);
        },
        checkbox: function(a, b, d, c, e, f, g, h) {
            var k = Id(h, a, "ngTrueValue", d.ngTrueValue, !0), l = Id(h, a, "ngFalseValue", d.ngFalseValue, !1);
            b.on("click", function(a) {
                c.$setViewValue(b[0].checked, a && a.type);
            }), c.$render = function() {
                b[0].checked = c.$viewValue;
            }, c.$isEmpty = function(a) {
                return !1 === a;
            }, c.$formatters.push(function(a) {
                return ma(a, k);
            }), c.$parsers.push(function(a) {
                return a ? k : l;
            });
        },
        hidden: x,
        button: x,
        submit: x,
        reset: x,
        file: x
    }, Dc = [ "$browser", "$sniffer", "$filter", "$parse", function(a, b, d, c) {
        return {
            restrict: "E",
            require: [ "?ngModel" ],
            link: {
                pre: function(e, f, g, h) {
                    h[0] && (Sd[F(g.type)] || Sd.text)(e, f, g, h[0], b, a, d, c);
                }
            }
        };
    } ], wg = /^(true|false|\d+)$/, Ne = function() {
        return {
            restrict: "A",
            priority: 100,
            compile: function(a, b) {
                return wg.test(b.ngValue) ? function(a, b, e) {
                    e.$set("value", a.$eval(e.ngValue));
                } : function(a, b, e) {
                    a.$watch(e.ngValue, function(a) {
                        e.$set("value", a);
                    });
                };
            }
        };
    }, ne = [ "$compile", function(a) {
        return {
            restrict: "AC",
            compile: function(b) {
                return a.$$addBindingClass(b), function(b, c, e) {
                    a.$$addBindingInfo(c, e.ngBind), c = c[0], b.$watch(e.ngBind, function(a) {
                        c.textContent = q(a) ? "" : a;
                    });
                };
            }
        };
    } ], pe = [ "$interpolate", "$compile", function(a, b) {
        return {
            compile: function(d) {
                return b.$$addBindingClass(d), function(c, d, f) {
                    c = a(d.attr(f.$attr.ngBindTemplate)), b.$$addBindingInfo(d, c.expressions), d = d[0], 
                    f.$observe("ngBindTemplate", function(a) {
                        d.textContent = q(a) ? "" : a;
                    });
                };
            }
        };
    } ], oe = [ "$sce", "$parse", "$compile", function(a, b, d) {
        return {
            restrict: "A",
            compile: function(c, e) {
                var f = b(e.ngBindHtml), g = b(e.ngBindHtml, function(a) {
                    return (a || "").toString();
                });
                return d.$$addBindingClass(c), function(b, c, e) {
                    d.$$addBindingInfo(c, e.ngBindHtml), b.$watch(g, function() {
                        c.html(a.getTrustedHtml(f(b)) || "");
                    });
                };
            }
        };
    } ], Me = na({
        restrict: "A",
        require: "ngModel",
        link: function(a, b, d, c) {
            c.$viewChangeListeners.push(function() {
                a.$eval(d.ngChange);
            });
        }
    }), qe = lc("", !0), se = lc("Odd", 0), re = lc("Even", 1), te = La({
        compile: function(a, b) {
            b.$set("ngCloak", u), a.removeClass("ng-cloak");
        }
    }), ue = [ function() {
        return {
            restrict: "A",
            scope: !0,
            controller: "@",
            priority: 500
        };
    } ], Ic = {}, xg = {
        blur: !0,
        focus: !0
    };
    n("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var b = va("ng-" + a);
        Ic[b] = [ "$parse", "$rootScope", function(d, c) {
            return {
                restrict: "A",
                compile: function(e, f) {
                    var g = d(f[b], null, !0);
                    return function(b, d) {
                        d.on(a, function(d) {
                            var e = function() {
                                g(b, {
                                    $event: d
                                });
                            };
                            xg[a] && c.$$phase ? b.$evalAsync(e) : b.$apply(e);
                        });
                    };
                }
            };
        } ];
    });
    var xe = [ "$animate", function(a) {
        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(b, d, c, e, f) {
                var g, h, k;
                b.$watch(c.ngIf, function(b) {
                    b ? h || f(function(b, e) {
                        h = e, b[b.length++] = X.createComment(" end ngIf: " + c.ngIf + " "), g = {
                            clone: b
                        }, a.enter(b, d.parent(), d);
                    }) : (k && (k.remove(), k = null), h && (h.$destroy(), h = null), g && (k = rb(g.clone), 
                    a.leave(k).then(function() {
                        k = null;
                    }), g = null));
                });
            }
        };
    } ], ye = [ "$templateRequest", "$anchorScroll", "$animate", function(a, b, d) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: fa.noop,
            compile: function(c, e) {
                var f = e.ngInclude || e.src, g = e.onload || "", h = e.autoscroll;
                return function(c, e, m, n, q) {
                    var v, u, p, s = 0, C = function() {
                        u && (u.remove(), u = null), v && (v.$destroy(), v = null), p && (d.leave(p).then(function() {
                            u = null;
                        }), u = p, p = null);
                    };
                    c.$watch(f, function(f) {
                        var m = function() {
                            !y(h) || h && !c.$eval(h) || b();
                        }, u = ++s;
                        f ? (a(f, !0).then(function(a) {
                            if (u === s) {
                                var b = c.$new();
                                n.template = a, a = q(b, function(a) {
                                    C(), d.enter(a, null, e).then(m);
                                }), v = b, p = a, v.$emit("$includeContentLoaded", f), c.$eval(g);
                            }
                        }, function() {
                            u === s && (C(), c.$emit("$includeContentError", f));
                        }), c.$emit("$includeContentRequested", f)) : (C(), n.template = null);
                    });
                };
            }
        };
    } ], Pe = [ "$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(b, d, c, e) {
                /SVG/.test(d[0].toString()) ? (d.empty(), a(Lc(e.template, X).childNodes)(b, function(a) {
                    d.append(a);
                }, {
                    futureParentElement: d
                })) : (d.html(e.template), a(d.contents())(b));
            }
        };
    } ], ze = La({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, b, d) {
                    a.$eval(d.ngInit);
                }
            };
        }
    }), Le = function() {
        return {
            restrict: "A",
            priority: 100,
            require: "ngModel",
            link: function(a, b, d, c) {
                var e = b.attr(d.$attr.ngList) || ", ", f = "false" !== d.ngTrim, g = f ? U(e) : e;
                c.$parsers.push(function(a) {
                    if (!q(a)) {
                        var b = [];
                        return a && n(a.split(g), function(a) {
                            a && b.push(f ? U(a) : a);
                        }), b;
                    }
                }), c.$formatters.push(function(a) {
                    return I(a) ? a.join(e) : u;
                }), c.$isEmpty = function(a) {
                    return !a || !a.length;
                };
            }
        };
    }, mb = "ng-valid", Jd = "ng-invalid", Wa = "ng-pristine", Jb = "ng-dirty", Ld = "ng-pending", lb = G("ngModel"), yg = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, b, d, c, e, f, g, h, k, l) {
        this.$modelValue = this.$viewValue = Number.NaN, this.$$rawModelValue = u, this.$validators = {}, 
        this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], 
        this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, 
        this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = u, 
        this.$name = l(d.name || "", !1)(a), this.$$parentForm = Ib;
        var B, m = e(d.ngModel), r = m.assign, t = m, s = r, v = null, p = this;
        this.$$setOptions = function(a) {
            if ((p.$options = a) && a.getterSetter) {
                var b = e(d.ngModel + "()"), f = e(d.ngModel + "($$$p)");
                t = function(a) {
                    var c = m(a);
                    return z(c) && (c = b(a)), c;
                }, s = function(a, b) {
                    z(m(a)) ? f(a, {
                        $$$p: p.$modelValue
                    }) : r(a, p.$modelValue);
                };
            } else if (!m.assign) throw lb("nonassign", d.ngModel, ua(c));
        }, this.$render = x, this.$isEmpty = function(a) {
            return q(a) || "" === a || null === a || a !== a;
        };
        var C = 0;
        Gd({
            ctrl: this,
            $element: c,
            set: function(a, b) {
                a[b] = !0;
            },
            unset: function(a, b) {
                delete a[b];
            },
            $animate: f
        }), this.$setPristine = function() {
            p.$dirty = !1, p.$pristine = !0, f.removeClass(c, Jb), f.addClass(c, Wa);
        }, this.$setDirty = function() {
            p.$dirty = !0, p.$pristine = !1, f.removeClass(c, Wa), f.addClass(c, Jb), p.$$parentForm.$setDirty();
        }, this.$setUntouched = function() {
            p.$touched = !1, p.$untouched = !0, f.setClass(c, "ng-untouched", "ng-touched");
        }, this.$setTouched = function() {
            p.$touched = !0, p.$untouched = !1, f.setClass(c, "ng-touched", "ng-untouched");
        }, this.$rollbackViewValue = function() {
            g.cancel(v), p.$viewValue = p.$$lastCommittedViewValue, p.$render();
        }, this.$validate = function() {
            if (!Q(p.$modelValue) || !isNaN(p.$modelValue)) {
                var a = p.$$rawModelValue, b = p.$valid, c = p.$modelValue, d = p.$options && p.$options.allowInvalid;
                p.$$runValidators(a, p.$$lastCommittedViewValue, function(e) {
                    d || b === e || (p.$modelValue = e ? a : u, p.$modelValue !== c && p.$$writeModelToScope());
                });
            }
        }, this.$$runValidators = function(a, b, c) {
            function d() {
                var c = !0;
                return n(p.$validators, function(d, e) {
                    var g = d(a, b);
                    c = c && g, f(e, g);
                }), c ? !0 : (n(p.$asyncValidators, function(a, b) {
                    f(b, null);
                }), !1);
            }
            function e() {
                var c = [], d = !0;
                n(p.$asyncValidators, function(e, g) {
                    var h = e(a, b);
                    if (!h || !z(h.then)) throw lb("$asyncValidators", h);
                    f(g, u), c.push(h.then(function() {
                        f(g, !0);
                    }, function(a) {
                        d = !1, f(g, !1);
                    }));
                }), c.length ? k.all(c).then(function() {
                    g(d);
                }, x) : g(!0);
            }
            function f(a, b) {
                h === C && p.$setValidity(a, b);
            }
            function g(a) {
                h === C && c(a);
            }
            C++;
            var h = C;
            (function() {
                var a = p.$$parserName || "parse";
                return q(B) ? (f(a, null), !0) : (B || (n(p.$validators, function(a, b) {
                    f(b, null);
                }), n(p.$asyncValidators, function(a, b) {
                    f(b, null);
                })), f(a, B), B);
            })() && d() ? e() : g(!1);
        }, this.$commitViewValue = function() {
            var a = p.$viewValue;
            g.cancel(v), (p.$$lastCommittedViewValue !== a || "" === a && p.$$hasNativeValidators) && (p.$$lastCommittedViewValue = a, 
            p.$pristine && this.$setDirty(), this.$$parseAndValidate());
        }, this.$$parseAndValidate = function() {
            var b = p.$$lastCommittedViewValue;
            if (B = q(b) ? u : !0) for (var c = 0; c < p.$parsers.length; c++) if (b = p.$parsers[c](b), 
            q(b)) {
                B = !1;
                break;
            }
            Q(p.$modelValue) && isNaN(p.$modelValue) && (p.$modelValue = t(a));
            var d = p.$modelValue, e = p.$options && p.$options.allowInvalid;
            p.$$rawModelValue = b, e && (p.$modelValue = b, p.$modelValue !== d && p.$$writeModelToScope()), 
            p.$$runValidators(b, p.$$lastCommittedViewValue, function(a) {
                e || (p.$modelValue = a ? b : u, p.$modelValue !== d && p.$$writeModelToScope());
            });
        }, this.$$writeModelToScope = function() {
            s(a, p.$modelValue), n(p.$viewChangeListeners, function(a) {
                try {
                    a();
                } catch (c) {
                    b(c);
                }
            });
        }, this.$setViewValue = function(a, b) {
            p.$viewValue = a, p.$options && !p.$options.updateOnDefault || p.$$debounceViewValueCommit(b);
        }, this.$$debounceViewValueCommit = function(b) {
            var c = 0, d = p.$options;
            d && y(d.debounce) && (d = d.debounce, Q(d) ? c = d : Q(d[b]) ? c = d[b] : Q(d["default"]) && (c = d["default"])), 
            g.cancel(v), c ? v = g(function() {
                p.$commitViewValue();
            }, c) : h.$$phase ? p.$commitViewValue() : a.$apply(function() {
                p.$commitViewValue();
            });
        }, a.$watch(function() {
            var b = t(a);
            if (b !== p.$modelValue && (p.$modelValue === p.$modelValue || b === b)) {
                p.$modelValue = p.$$rawModelValue = b, B = u;
                for (var c = p.$formatters, d = c.length, e = b; d--; ) e = c[d](e);
                p.$viewValue !== e && (p.$viewValue = p.$$lastCommittedViewValue = e, p.$render(), 
                p.$$runValidators(b, e, x));
            }
            return b;
        });
    } ], Ke = [ "$rootScope", function(a) {
        return {
            restrict: "A",
            require: [ "ngModel", "^?form", "^?ngModelOptions" ],
            controller: yg,
            priority: 1,
            compile: function(b) {
                return b.addClass(Wa).addClass("ng-untouched").addClass(mb), {
                    pre: function(a, b, e, f) {
                        var g = f[0];
                        b = f[1] || g.$$parentForm, g.$$setOptions(f[2] && f[2].$options), b.$addControl(g), 
                        e.$observe("name", function(a) {
                            g.$name !== a && g.$$parentForm.$$renameControl(g, a);
                        }), a.$on("$destroy", function() {
                            g.$$parentForm.$removeControl(g);
                        });
                    },
                    post: function(b, c, e, f) {
                        var g = f[0];
                        g.$options && g.$options.updateOn && c.on(g.$options.updateOn, function(a) {
                            g.$$debounceViewValueCommit(a && a.type);
                        }), c.on("blur", function(c) {
                            g.$touched || (a.$$phase ? b.$evalAsync(g.$setTouched) : b.$apply(g.$setTouched));
                        });
                    }
                };
            }
        };
    } ], zg = /(\s+|^)default(\s+|$)/, Oe = function() {
        return {
            restrict: "A",
            controller: [ "$scope", "$attrs", function(a, b) {
                var d = this;
                this.$options = bb(a.$eval(b.ngModelOptions)), y(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, 
                this.$options.updateOn = U(this.$options.updateOn.replace(zg, function() {
                    return d.$options.updateOnDefault = !0, " ";
                }))) : this.$options.updateOnDefault = !0;
            } ]
        };
    }, Ae = La({
        terminal: !0,
        priority: 1e3
    }), Ag = G("ngOptions"), Bg = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, Ie = [ "$compile", "$parse", function(a, b) {
        function d(a, c, d) {
            function e(a, b, c, d, f) {
                this.selectValue = a, this.viewValue = b, this.label = c, this.group = d, this.disabled = f;
            }
            function l(a) {
                var b;
                if (!q && za(a)) b = a; else {
                    b = [];
                    for (var c in a) a.hasOwnProperty(c) && "$" !== c.charAt(0) && b.push(c);
                }
                return b;
            }
            var m = a.match(Bg);
            if (!m) throw Ag("iexp", a, ua(c));
            var n = m[5] || m[7], q = m[6];
            a = / as /.test(m[0]) && m[1];
            var s = m[9];
            c = b(m[2] ? m[1] : n);
            var v = a && b(a) || c, u = s && b(s), p = s ? function(a, b) {
                return u(d, b);
            } : function(a) {
                return Ca(a);
            }, C = function(a, b) {
                return p(a, z(a, b));
            }, w = b(m[2] || m[1]), y = b(m[3] || ""), B = b(m[4] || ""), x = b(m[8]), D = {}, z = q ? function(a, b) {
                return D[q] = b, D[n] = a, D;
            } : function(a) {
                return D[n] = a, D;
            };
            return {
                trackBy: s,
                getTrackByValue: C,
                getWatchables: b(x, function(a) {
                    var b = [];
                    a = a || [];
                    for (var c = l(a), e = c.length, f = 0; e > f; f++) {
                        var g = a === c ? f : c[f], k = z(a[g], g), g = p(a[g], k);
                        b.push(g), (m[2] || m[1]) && (g = w(d, k), b.push(g)), m[4] && (k = B(d, k), b.push(k));
                    }
                    return b;
                }),
                getOptions: function() {
                    for (var a = [], b = {}, c = x(d) || [], f = l(c), g = f.length, m = 0; g > m; m++) {
                        var n = c === f ? m : f[m], r = z(c[n], n), q = v(d, r), n = p(q, r), t = w(d, r), u = y(d, r), r = B(d, r), q = new e(n, q, t, u, r);
                        a.push(q), b[n] = q;
                    }
                    return {
                        items: a,
                        selectValueMap: b,
                        getOptionFromViewValue: function(a) {
                            return b[C(a)];
                        },
                        getViewValueFromOption: function(a) {
                            return s ? fa.copy(a.viewValue) : a.viewValue;
                        }
                    };
                }
            };
        }
        var c = X.createElement("option"), e = X.createElement("optgroup");
        return {
            restrict: "A",
            terminal: !0,
            require: [ "select", "?ngModel" ],
            link: {
                pre: function(a, b, c, d) {
                    d[0].registerOption = x;
                },
                post: function(b, g, h, k) {
                    function l(a, b) {
                        a.element = b, b.disabled = a.disabled, a.label !== b.label && (b.label = a.label, 
                        b.textContent = a.label), a.value !== b.value && (b.value = a.selectValue);
                    }
                    function m(a, b, c, d) {
                        return b && F(b.nodeName) === c ? c = b : (c = d.cloneNode(!1), b ? a.insertBefore(c, b) : a.appendChild(c)), 
                        c;
                    }
                    function r(a) {
                        for (var b; a; ) b = a.nextSibling, Xb(a), a = b;
                    }
                    function q(a) {
                        var b = p && p[0], c = z && z[0];
                        if (b || c) for (;a && (a === b || a === c || 8 === a.nodeType || "" === a.value); ) a = a.nextSibling;
                        return a;
                    }
                    function s() {
                        var a = D && u.readValue();
                        D = E.getOptions();
                        var b = {}, d = g[0].firstChild;
                        if (x && g.prepend(p), d = q(d), D.items.forEach(function(a) {
                            var f, h;
                            a.group ? (f = b[a.group], f || (f = m(g[0], d, "optgroup", e), d = f.nextSibling, 
                            f.label = a.group, f = b[a.group] = {
                                groupElement: f,
                                currentOptionElement: f.firstChild
                            }), h = m(f.groupElement, f.currentOptionElement, "option", c), l(a, h), f.currentOptionElement = h.nextSibling) : (h = m(g[0], d, "option", c), 
                            l(a, h), d = h.nextSibling);
                        }), Object.keys(b).forEach(function(a) {
                            r(b[a].currentOptionElement);
                        }), r(d), v.$render(), !v.$isEmpty(a)) {
                            var f = u.readValue();
                            (E.trackBy ? ma(a, f) : a === f) || (v.$setViewValue(f), v.$render());
                        }
                    }
                    var v = k[1];
                    if (v) {
                        var u = k[0];
                        k = h.multiple;
                        for (var p, C = 0, w = g.children(), y = w.length; y > C; C++) if ("" === w[C].value) {
                            p = w.eq(C);
                            break;
                        }
                        var x = !!p, z = B(c.cloneNode(!1));
                        z.val("?");
                        var D, E = d(h.ngOptions, g, b);
                        k ? (v.$isEmpty = function(a) {
                            return !a || 0 === a.length;
                        }, u.writeValue = function(a) {
                            D.items.forEach(function(a) {
                                a.element.selected = !1;
                            }), a && a.forEach(function(a) {
                                (a = D.getOptionFromViewValue(a)) && !a.disabled && (a.element.selected = !0);
                            });
                        }, u.readValue = function() {
                            var a = g.val() || [], b = [];
                            return n(a, function(a) {
                                (a = D.selectValueMap[a]) && !a.disabled && b.push(D.getViewValueFromOption(a));
                            }), b;
                        }, E.trackBy && b.$watchCollection(function() {
                            return I(v.$viewValue) ? v.$viewValue.map(function(a) {
                                return E.getTrackByValue(a);
                            }) : void 0;
                        }, function() {
                            v.$render();
                        })) : (u.writeValue = function(a) {
                            var b = D.getOptionFromViewValue(a);
                            b && !b.disabled ? g[0].value !== b.selectValue && (z.remove(), x || p.remove(), 
                            g[0].value = b.selectValue, b.element.selected = !0, b.element.setAttribute("selected", "selected")) : null === a || x ? (z.remove(), 
                            x || g.prepend(p), g.val(""), p.prop("selected", !0), p.attr("selected", !0)) : (x || p.remove(), 
                            g.prepend(z), g.val("?"), z.prop("selected", !0), z.attr("selected", !0));
                        }, u.readValue = function() {
                            var a = D.selectValueMap[g.val()];
                            return a && !a.disabled ? (x || p.remove(), z.remove(), D.getViewValueFromOption(a)) : null;
                        }, E.trackBy && b.$watch(function() {
                            return E.getTrackByValue(v.$viewValue);
                        }, function() {
                            v.$render();
                        })), x ? (p.remove(), a(p)(b), p.removeClass("ng-scope")) : p = B(c.cloneNode(!1)), 
                        s(), b.$watchCollection(E.getWatchables, s);
                    }
                }
            }
        };
    } ], Be = [ "$locale", "$interpolate", "$log", function(a, b, d) {
        var c = /{}/g, e = /^when(Minus)?(.+)$/;
        return {
            link: function(f, g, h) {
                function k(a) {
                    g.text(a || "");
                }
                var w, l = h.count, m = h.$attr.when && g.attr(h.$attr.when), r = h.offset || 0, s = f.$eval(m) || {}, u = {}, v = b.startSymbol(), y = b.endSymbol(), p = v + l + "-" + r + y, C = fa.noop;
                n(h, function(a, b) {
                    var c = e.exec(b);
                    c && (c = (c[1] ? "-" : "") + F(c[2]), s[c] = g.attr(h.$attr[b]));
                }), n(s, function(a, d) {
                    u[d] = b(a.replace(c, p));
                }), f.$watch(l, function(b) {
                    var c = parseFloat(b), e = isNaN(c);
                    e || c in s || (c = a.pluralCat(c - r)), c === w || e && Q(w) && isNaN(w) || (C(), 
                    e = u[c], q(e) ? (null != b && d.debug("ngPluralize: no rule defined for '" + c + "' in " + m), 
                    C = x, k()) : C = f.$watch(e, k), w = c);
                });
            }
        };
    } ], Ce = [ "$parse", "$animate", function(a, b) {
        var d = G("ngRepeat"), c = function(a, b, c, d, k, l, m) {
            a[c] = d, k && (a[k] = l), a.$index = b, a.$first = 0 === b, a.$last = b === m - 1, 
            a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b));
        };
        return {
            restrict: "A",
            multiElement: !0,
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            compile: function(e, f) {
                var g = f.ngRepeat, h = X.createComment(" end ngRepeat: " + g + " "), k = g.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                if (!k) throw d("iexp", g);
                var l = k[1], m = k[2], r = k[3], q = k[4], k = l.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
                if (!k) throw d("iidexp", l);
                var s = k[3] || k[1], v = k[2];
                if (r && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r))) throw d("badident", r);
                var x, p, y, w, z = {
                    $id: Ca
                };
                return q ? x = a(q) : (y = function(a, b) {
                    return Ca(b);
                }, w = function(a) {
                    return a;
                }), function(a, e, f, k, l) {
                    x && (p = function(b, c, d) {
                        return v && (z[v] = b), z[s] = c, z.$index = d, x(a, z);
                    });
                    var q = $();
                    a.$watchCollection(m, function(f) {
                        var k, m, x, D, E, H, F, I, G, J, t = e[0], z = $();
                        if (r && (a[r] = f), za(f)) I = f, m = p || y; else for (J in m = p || w, I = [], 
                        f) qa.call(f, J) && "$" !== J.charAt(0) && I.push(J);
                        for (D = I.length, J = Array(D), k = 0; D > k; k++) if (E = f === I ? k : I[k], 
                        H = f[E], F = m(E, H, k), q[F]) G = q[F], delete q[F], z[F] = G, J[k] = G; else {
                            if (z[F]) throw n(J, function(a) {
                                a && a.scope && (q[a.id] = a);
                            }), d("dupes", g, F, H);
                            J[k] = {
                                id: F,
                                scope: u,
                                clone: u
                            }, z[F] = !0;
                        }
                        for (x in q) {
                            if (G = q[x], F = rb(G.clone), b.leave(F), F[0].parentNode) for (k = 0, m = F.length; m > k; k++) F[k].$$NG_REMOVED = !0;
                            G.scope.$destroy();
                        }
                        for (k = 0; D > k; k++) if (E = f === I ? k : I[k], H = f[E], G = J[k], G.scope) {
                            x = t;
                            do x = x.nextSibling; while (x && x.$$NG_REMOVED);
                            G.clone[0] != x && b.move(rb(G.clone), null, B(t)), t = G.clone[G.clone.length - 1], 
                            c(G.scope, k, s, H, v, E, D);
                        } else l(function(a, d) {
                            G.scope = d;
                            var e = h.cloneNode(!1);
                            a[a.length++] = e, b.enter(a, null, B(t)), t = e, G.clone = a, z[G.id] = G, c(G.scope, k, s, H, v, E, D);
                        });
                        q = z;
                    });
                };
            }
        };
    } ], De = [ "$animate", function(a) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(b, d, c) {
                b.$watch(c.ngShow, function(b) {
                    a[b ? "removeClass" : "addClass"](d, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], we = [ "$animate", function(a) {
        return {
            restrict: "A",
            multiElement: !0,
            link: function(b, d, c) {
                b.$watch(c.ngHide, function(b) {
                    a[b ? "addClass" : "removeClass"](d, "ng-hide", {
                        tempClasses: "ng-hide-animate"
                    });
                });
            }
        };
    } ], Ee = La(function(a, b, d) {
        a.$watch(d.ngStyle, function(a, d) {
            d && a !== d && n(d, function(a, c) {
                b.css(c, "");
            }), a && b.css(a);
        }, !0);
    }), Fe = [ "$animate", function(a) {
        return {
            require: "ngSwitch",
            controller: [ "$scope", function() {
                this.cases = {};
            } ],
            link: function(b, d, c, e) {
                var f = [], g = [], h = [], k = [], l = function(a, b) {
                    return function() {
                        a.splice(b, 1);
                    };
                };
                b.$watch(c.ngSwitch || c.on, function(b) {
                    var c, d;
                    for (c = 0, d = h.length; d > c; ++c) a.cancel(h[c]);
                    for (c = h.length = 0, d = k.length; d > c; ++c) {
                        var q = rb(g[c].clone);
                        k[c].$destroy(), (h[c] = a.leave(q)).then(l(h, c));
                    }
                    g.length = 0, k.length = 0, (f = e.cases["!" + b] || e.cases["?"]) && n(f, function(b) {
                        b.transclude(function(c, d) {
                            k.push(d);
                            var e = b.element;
                            c[c.length++] = X.createComment(" end ngSwitchWhen: "), g.push({
                                clone: c
                            }), a.enter(c, e.parent(), e);
                        });
                    });
                });
            }
        };
    } ], Ge = La({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, b, d, c, e) {
            c.cases["!" + d.ngSwitchWhen] = c.cases["!" + d.ngSwitchWhen] || [], c.cases["!" + d.ngSwitchWhen].push({
                transclude: e,
                element: b
            });
        }
    }), He = La({
        transclude: "element",
        priority: 1200,
        require: "^ngSwitch",
        multiElement: !0,
        link: function(a, b, d, c, e) {
            c.cases["?"] = c.cases["?"] || [], c.cases["?"].push({
                transclude: e,
                element: b
            });
        }
    }), Je = La({
        restrict: "EAC",
        link: function(a, b, d, c, e) {
            if (!e) throw G("ngTransclude")("orphan", ua(b));
            e(function(a) {
                b.empty(), b.append(a);
            });
        }
    }), je = [ "$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(b, d) {
                "text/ng-template" == d.type && a.put(d.id, b[0].text);
            }
        };
    } ], Cg = {
        $setViewValue: x,
        $render: x
    }, Dg = [ "$element", "$scope", "$attrs", function(a, b, d) {
        var c = this, e = new Sa();
        c.ngModelCtrl = Cg, c.unknownOption = B(X.createElement("option")), c.renderUnknownOption = function(b) {
            b = "? " + Ca(b) + " ?", c.unknownOption.val(b), a.prepend(c.unknownOption), a.val(b);
        }, b.$on("$destroy", function() {
            c.renderUnknownOption = x;
        }), c.removeUnknownOption = function() {
            c.unknownOption.parent() && c.unknownOption.remove();
        }, c.readValue = function() {
            return c.removeUnknownOption(), a.val();
        }, c.writeValue = function(b) {
            c.hasOption(b) ? (c.removeUnknownOption(), a.val(b), "" === b && c.emptyOption.prop("selected", !0)) : null == b && c.emptyOption ? (c.removeUnknownOption(), 
            a.val("")) : c.renderUnknownOption(b);
        }, c.addOption = function(a, b) {
            Ra(a, '"option value"'), "" === a && (c.emptyOption = b);
            var d = e.get(a) || 0;
            e.put(a, d + 1), c.ngModelCtrl.$render(), b[0].hasAttribute("selected") && (b[0].selected = !0);
        }, c.removeOption = function(a) {
            var b = e.get(a);
            b && (1 === b ? (e.remove(a), "" === a && (c.emptyOption = u)) : e.put(a, b - 1));
        }, c.hasOption = function(a) {
            return !!e.get(a);
        }, c.registerOption = function(a, b, d, e, l) {
            if (e) {
                var m;
                d.$observe("value", function(a) {
                    y(m) && c.removeOption(m), m = a, c.addOption(a, b);
                });
            } else l ? a.$watch(l, function(a, e) {
                d.$set("value", a), e !== a && c.removeOption(e), c.addOption(a, b);
            }) : c.addOption(d.value, b);
            b.on("$destroy", function() {
                c.removeOption(d.value), c.ngModelCtrl.$render();
            });
        };
    } ], ke = function() {
        return {
            restrict: "E",
            require: [ "select", "?ngModel" ],
            controller: Dg,
            priority: 1,
            link: {
                pre: function(a, b, d, c) {
                    var e = c[1];
                    if (e) {
                        var f = c[0];
                        if (f.ngModelCtrl = e, e.$render = function() {
                            f.writeValue(e.$viewValue);
                        }, b.on("change", function() {
                            a.$apply(function() {
                                e.$setViewValue(f.readValue());
                            });
                        }), d.multiple) {
                            f.readValue = function() {
                                var a = [];
                                return n(b.find("option"), function(b) {
                                    b.selected && a.push(b.value);
                                }), a;
                            }, f.writeValue = function(a) {
                                var c = new Sa(a);
                                n(b.find("option"), function(a) {
                                    a.selected = y(c.get(a.value));
                                });
                            };
                            var g, h = NaN;
                            a.$watch(function() {
                                h !== e.$viewValue || ma(g, e.$viewValue) || (g = ia(e.$viewValue), e.$render()), 
                                h = e.$viewValue;
                            }), e.$isEmpty = function(a) {
                                return !a || 0 === a.length;
                            };
                        }
                    }
                }
            }
        };
    }, me = [ "$interpolate", function(a) {
        return {
            restrict: "E",
            priority: 100,
            compile: function(b, d) {
                if (y(d.value)) var c = a(d.value, !0); else {
                    var e = a(b.text(), !0);
                    e || d.$set("value", b.text());
                }
                return function(a, b, d) {
                    var k = b.parent();
                    (k = k.data("$selectController") || k.parent().data("$selectController")) && k.registerOption(a, b, d, c, e);
                };
            }
        };
    } ], le = na({
        restrict: "E",
        terminal: !1
    }), Fc = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, d, c) {
                c && (d.required = !0, c.$validators.required = function(a, b) {
                    return !d.required || !c.$isEmpty(b);
                }, d.$observe("required", function() {
                    c.$validate();
                }));
            }
        };
    }, Ec = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, d, c) {
                if (c) {
                    var e, f = d.ngPattern || d.pattern;
                    d.$observe("pattern", function(a) {
                        if (E(a) && 0 < a.length && (a = new RegExp("^" + a + "$")), a && !a.test) throw G("ngPattern")("noregexp", f, a, ua(b));
                        e = a || u, c.$validate();
                    }), c.$validators.pattern = function(a, b) {
                        return c.$isEmpty(b) || q(e) || e.test(b);
                    };
                }
            }
        };
    }, Hc = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, d, c) {
                if (c) {
                    var e = -1;
                    d.$observe("maxlength", function(a) {
                        a = ea(a), e = isNaN(a) ? -1 : a, c.$validate();
                    }), c.$validators.maxlength = function(a, b) {
                        return 0 > e || c.$isEmpty(b) || b.length <= e;
                    };
                }
            }
        };
    }, Gc = function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(a, b, d, c) {
                if (c) {
                    var e = 0;
                    d.$observe("minlength", function(a) {
                        e = ea(a) || 0, c.$validate();
                    }), c.$validators.minlength = function(a, b) {
                        return c.$isEmpty(b) || b.length >= e;
                    };
                }
            }
        };
    };
    S.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : (ce(), 
    ee(fa), fa.module("ngLocale", [], [ "$provide", function(a) {
        function b(a) {
            a += "";
            var b = a.indexOf(".");
            return -1 == b ? 0 : a.length - b - 1;
        }
        a.value("$locale", {
            DATETIME_FORMATS: {
                AMPMS: [ "AM", "PM" ],
                DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                ERANAMES: [ "Before Christ", "Anno Domini" ],
                ERAS: [ "BC", "AD" ],
                FIRSTDAYOFWEEK: 6,
                MONTH: "January February March April May June July August September October November December".split(" "),
                SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                WEEKENDRANGE: [ 5, 6 ],
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                medium: "MMM d, y h:mm:ss a",
                mediumDate: "MMM d, y",
                mediumTime: "h:mm:ss a",
                "short": "M/d/yy h:mm a",
                shortDate: "M/d/yy",
                shortTime: "h:mm a"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "$",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [ {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                }, {
                    gSize: 3,
                    lgSize: 3,
                    maxFrac: 2,
                    minFrac: 2,
                    minInt: 1,
                    negPre: "-¤",
                    negSuf: "",
                    posPre: "¤",
                    posSuf: ""
                } ]
            },
            id: "en-us",
            pluralCat: function(a, c) {
                var e = 0 | a, f = c;
                return u === f && (f = Math.min(b(a), 3)), Math.pow(10, f), 1 == e && 0 == f ? "one" : "other";
            }
        });
    } ]), B(X).ready(function() {
        Zd(X, yc);
    }));
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), 
function(window, angular, undefined) {
    "use strict";
    function jsonStringToDate(string) {
        var match;
        if (match = string.match(R_ISO8061_STR)) {
            var date = new Date(0), tzHour = 0, tzMin = 0;
            return match[9] && (tzHour = toInt(match[9] + match[10]), tzMin = toInt(match[9] + match[11])), 
            date.setUTCFullYear(toInt(match[1]), toInt(match[2]) - 1, toInt(match[3])), date.setUTCHours(toInt(match[4] || 0) - tzHour, toInt(match[5] || 0) - tzMin, toInt(match[6] || 0), toInt(match[7] || 0)), 
            date;
        }
        return string;
    }
    function toInt(str) {
        return parseInt(str, 10);
    }
    function padNumber(num, digits, trim) {
        var neg = "";
        for (0 > num && (neg = "-", num = -num), num = "" + num; num.length < digits; ) num = "0" + num;
        return trim && (num = num.substr(num.length - digits)), neg + num;
    }
    function createHttpBackendMock($rootScope, $timeout, $delegate, $browser) {
        function createResponse(status, data, headers, statusText) {
            return angular.isFunction(status) ? status : function() {
                return angular.isNumber(status) ? [ status, data, headers, statusText ] : [ 200, status, data, headers ];
            };
        }
        function $httpBackend(method, url, data, callback, headers, timeout, withCredentials) {
            function prettyPrint(data) {
                return angular.isString(data) || angular.isFunction(data) || data instanceof RegExp ? data : angular.toJson(data);
            }
            function wrapResponse(wrapped) {
                function handleResponse() {
                    var response = wrapped.response(method, url, data, headers);
                    xhr.$$respHeaders = response[2], callback(copy(response[0]), copy(response[1]), xhr.getAllResponseHeaders(), copy(response[3] || ""));
                }
                function handleTimeout() {
                    for (var i = 0, ii = responses.length; ii > i; i++) if (responses[i] === handleResponse) {
                        responses.splice(i, 1), callback(-1, undefined, "");
                        break;
                    }
                }
                return !$browser && timeout && (timeout.then ? timeout.then(handleTimeout) : $timeout(handleTimeout, timeout)), 
                handleResponse;
            }
            var xhr = new MockXhr(), expectation = expectations[0], wasExpected = !1;
            if (expectation && expectation.match(method, url)) {
                if (!expectation.matchData(data)) throw new Error("Expected " + expectation + " with different data\nEXPECTED: " + prettyPrint(expectation.data) + "\nGOT:      " + data);
                if (!expectation.matchHeaders(headers)) throw new Error("Expected " + expectation + " with different headers\nEXPECTED: " + prettyPrint(expectation.headers) + "\nGOT:      " + prettyPrint(headers));
                if (expectations.shift(), expectation.response) return void responses.push(wrapResponse(expectation));
                wasExpected = !0;
            }
            for (var definition, i = -1; definition = definitions[++i]; ) if (definition.match(method, url, data, headers || {})) {
                if (definition.response) ($browser ? $browser.defer : responsesPush)(wrapResponse(definition)); else {
                    if (!definition.passThrough) throw new Error("No response defined !");
                    $delegate(method, url, data, callback, headers, timeout, withCredentials);
                }
                return;
            }
            throw wasExpected ? new Error("No response defined !") : new Error("Unexpected request: " + method + " " + url + "\n" + (expectation ? "Expected " + expectation : "No more request expected"));
        }
        function createShortMethods(prefix) {
            angular.forEach([ "GET", "DELETE", "JSONP", "HEAD" ], function(method) {
                $httpBackend[prefix + method] = function(url, headers) {
                    return $httpBackend[prefix](method, url, undefined, headers);
                };
            }), angular.forEach([ "PUT", "POST", "PATCH" ], function(method) {
                $httpBackend[prefix + method] = function(url, data, headers) {
                    return $httpBackend[prefix](method, url, data, headers);
                };
            });
        }
        var definitions = [], expectations = [], responses = [], responsesPush = angular.bind(responses, responses.push), copy = angular.copy;
        return $httpBackend.when = function(method, url, data, headers) {
            var definition = new MockHttpExpectation(method, url, data, headers), chain = {
                respond: function(status, data, headers, statusText) {
                    return definition.passThrough = undefined, definition.response = createResponse(status, data, headers, statusText), 
                    chain;
                }
            };
            return $browser && (chain.passThrough = function() {
                return definition.response = undefined, definition.passThrough = !0, chain;
            }), definitions.push(definition), chain;
        }, createShortMethods("when"), $httpBackend.expect = function(method, url, data, headers) {
            var expectation = new MockHttpExpectation(method, url, data, headers), chain = {
                respond: function(status, data, headers, statusText) {
                    return expectation.response = createResponse(status, data, headers, statusText), 
                    chain;
                }
            };
            return expectations.push(expectation), chain;
        }, createShortMethods("expect"), $httpBackend.flush = function(count, digest) {
            if (digest !== !1 && $rootScope.$digest(), !responses.length) throw new Error("No pending request to flush !");
            if (angular.isDefined(count) && null !== count) for (;count--; ) {
                if (!responses.length) throw new Error("No more pending request to flush !");
                responses.shift()();
            } else for (;responses.length; ) responses.shift()();
            $httpBackend.verifyNoOutstandingExpectation(digest);
        }, $httpBackend.verifyNoOutstandingExpectation = function(digest) {
            if (digest !== !1 && $rootScope.$digest(), expectations.length) throw new Error("Unsatisfied requests: " + expectations.join(", "));
        }, $httpBackend.verifyNoOutstandingRequest = function() {
            if (responses.length) throw new Error("Unflushed requests: " + responses.length);
        }, $httpBackend.resetExpectations = function() {
            expectations.length = 0, responses.length = 0;
        }, $httpBackend;
    }
    function MockHttpExpectation(method, url, data, headers) {
        this.data = data, this.headers = headers, this.match = function(m, u, d, h) {
            return method != m ? !1 : this.matchUrl(u) ? angular.isDefined(d) && !this.matchData(d) ? !1 : angular.isDefined(h) && !this.matchHeaders(h) ? !1 : !0 : !1;
        }, this.matchUrl = function(u) {
            return url ? angular.isFunction(url.test) ? url.test(u) : angular.isFunction(url) ? url(u) : url == u : !0;
        }, this.matchHeaders = function(h) {
            return angular.isUndefined(headers) ? !0 : angular.isFunction(headers) ? headers(h) : angular.equals(headers, h);
        }, this.matchData = function(d) {
            return angular.isUndefined(data) ? !0 : data && angular.isFunction(data.test) ? data.test(d) : data && angular.isFunction(data) ? data(d) : data && !angular.isString(data) ? angular.equals(angular.fromJson(angular.toJson(data)), angular.fromJson(d)) : data == d;
        }, this.toString = function() {
            return method + " " + url;
        };
    }
    function MockXhr() {
        MockXhr.$$lastInstance = this, this.open = function(method, url, async) {
            this.$$method = method, this.$$url = url, this.$$async = async, this.$$reqHeaders = {}, 
            this.$$respHeaders = {};
        }, this.send = function(data) {
            this.$$data = data;
        }, this.setRequestHeader = function(key, value) {
            this.$$reqHeaders[key] = value;
        }, this.getResponseHeader = function(name) {
            var header = this.$$respHeaders[name];
            return header ? header : (name = angular.lowercase(name), (header = this.$$respHeaders[name]) ? header : (header = undefined, 
            angular.forEach(this.$$respHeaders, function(headerVal, headerName) {
                header || angular.lowercase(headerName) != name || (header = headerVal);
            }), header));
        }, this.getAllResponseHeaders = function() {
            var lines = [];
            return angular.forEach(this.$$respHeaders, function(value, key) {
                lines.push(key + ": " + value);
            }), lines.join("\n");
        }, this.abort = angular.noop;
    }
    angular.mock = {}, angular.mock.$BrowserProvider = function() {
        this.$get = function() {
            return new angular.mock.$Browser();
        };
    }, angular.mock.$Browser = function() {
        var self = this;
        this.isMock = !0, self.$$url = "http://server/", self.$$lastUrl = self.$$url, self.pollFns = [], 
        self.$$completeOutstandingRequest = angular.noop, self.$$incOutstandingRequestCount = angular.noop, 
        self.onUrlChange = function(listener) {
            return self.pollFns.push(function() {
                (self.$$lastUrl !== self.$$url || self.$$state !== self.$$lastState) && (self.$$lastUrl = self.$$url, 
                self.$$lastState = self.$$state, listener(self.$$url, self.$$state));
            }), listener;
        }, self.$$applicationDestroyed = angular.noop, self.$$checkUrlChange = angular.noop, 
        self.deferredFns = [], self.deferredNextId = 0, self.defer = function(fn, delay) {
            return delay = delay || 0, self.deferredFns.push({
                time: self.defer.now + delay,
                fn: fn,
                id: self.deferredNextId
            }), self.deferredFns.sort(function(a, b) {
                return a.time - b.time;
            }), self.deferredNextId++;
        }, self.defer.now = 0, self.defer.cancel = function(deferId) {
            var fnIndex;
            return angular.forEach(self.deferredFns, function(fn, index) {
                fn.id === deferId && (fnIndex = index);
            }), angular.isDefined(fnIndex) ? (self.deferredFns.splice(fnIndex, 1), !0) : !1;
        }, self.defer.flush = function(delay) {
            if (angular.isDefined(delay)) self.defer.now += delay; else {
                if (!self.deferredFns.length) throw new Error("No deferred tasks to be flushed");
                self.defer.now = self.deferredFns[self.deferredFns.length - 1].time;
            }
            for (;self.deferredFns.length && self.deferredFns[0].time <= self.defer.now; ) self.deferredFns.shift().fn();
        }, self.$$baseHref = "/", self.baseHref = function() {
            return this.$$baseHref;
        };
    }, angular.mock.$Browser.prototype = {
        poll: function() {
            angular.forEach(this.pollFns, function(pollFn) {
                pollFn();
            });
        },
        url: function(url, replace, state) {
            return angular.isUndefined(state) && (state = null), url ? (this.$$url = url, this.$$state = angular.copy(state), 
            this) : this.$$url;
        },
        state: function() {
            return this.$$state;
        },
        notifyWhenNoOutstandingRequests: function(fn) {
            fn();
        }
    }, angular.mock.$ExceptionHandlerProvider = function() {
        var handler;
        this.mode = function(mode) {
            switch (mode) {
              case "log":
              case "rethrow":
                var errors = [];
                handler = function(e) {
                    if (1 == arguments.length ? errors.push(e) : errors.push([].slice.call(arguments, 0)), 
                    "rethrow" === mode) throw e;
                }, handler.errors = errors;
                break;

              default:
                throw new Error("Unknown mode '" + mode + "', only 'log'/'rethrow' modes are allowed!");
            }
        }, this.$get = function() {
            return handler;
        }, this.mode("rethrow");
    }, angular.mock.$LogProvider = function() {
        function concat(array1, array2, index) {
            return array1.concat(Array.prototype.slice.call(array2, index));
        }
        var debug = !0;
        this.debugEnabled = function(flag) {
            return angular.isDefined(flag) ? (debug = flag, this) : debug;
        }, this.$get = function() {
            var $log = {
                log: function() {
                    $log.log.logs.push(concat([], arguments, 0));
                },
                warn: function() {
                    $log.warn.logs.push(concat([], arguments, 0));
                },
                info: function() {
                    $log.info.logs.push(concat([], arguments, 0));
                },
                error: function() {
                    $log.error.logs.push(concat([], arguments, 0));
                },
                debug: function() {
                    debug && $log.debug.logs.push(concat([], arguments, 0));
                }
            };
            return $log.reset = function() {
                $log.log.logs = [], $log.info.logs = [], $log.warn.logs = [], $log.error.logs = [], 
                $log.debug.logs = [];
            }, $log.assertEmpty = function() {
                var errors = [];
                if (angular.forEach([ "error", "warn", "info", "log", "debug" ], function(logLevel) {
                    angular.forEach($log[logLevel].logs, function(log) {
                        angular.forEach(log, function(logItem) {
                            errors.push("MOCK $log (" + logLevel + "): " + String(logItem) + "\n" + (logItem.stack || ""));
                        });
                    });
                }), errors.length) throw errors.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"), 
                errors.push(""), new Error(errors.join("\n---------\n"));
            }, $log.reset(), $log;
        };
    }, angular.mock.$IntervalProvider = function() {
        this.$get = [ "$browser", "$rootScope", "$q", "$$q", function($browser, $rootScope, $q, $$q) {
            var repeatFns = [], nextRepeatId = 0, now = 0, $interval = function(fn, delay, count, invokeApply) {
                function tick() {
                    if (deferred.notify(iteration++), count > 0 && iteration >= count) {
                        var fnIndex;
                        deferred.resolve(iteration), angular.forEach(repeatFns, function(fn, index) {
                            fn.id === promise.$$intervalId && (fnIndex = index);
                        }), angular.isDefined(fnIndex) && repeatFns.splice(fnIndex, 1);
                    }
                    skipApply ? $browser.defer.flush() : $rootScope.$apply();
                }
                var hasParams = arguments.length > 4, args = hasParams ? Array.prototype.slice.call(arguments, 4) : [], iteration = 0, skipApply = angular.isDefined(invokeApply) && !invokeApply, deferred = (skipApply ? $$q : $q).defer(), promise = deferred.promise;
                return count = angular.isDefined(count) ? count : 0, promise.then(null, null, hasParams ? function() {
                    fn.apply(null, args);
                } : fn), promise.$$intervalId = nextRepeatId, repeatFns.push({
                    nextTime: now + delay,
                    delay: delay,
                    fn: tick,
                    id: nextRepeatId,
                    deferred: deferred
                }), repeatFns.sort(function(a, b) {
                    return a.nextTime - b.nextTime;
                }), nextRepeatId++, promise;
            };
            return $interval.cancel = function(promise) {
                if (!promise) return !1;
                var fnIndex;
                return angular.forEach(repeatFns, function(fn, index) {
                    fn.id === promise.$$intervalId && (fnIndex = index);
                }), angular.isDefined(fnIndex) ? (repeatFns[fnIndex].deferred.reject("canceled"), 
                repeatFns.splice(fnIndex, 1), !0) : !1;
            }, $interval.flush = function(millis) {
                for (now += millis; repeatFns.length && repeatFns[0].nextTime <= now; ) {
                    var task = repeatFns[0];
                    task.fn(), task.nextTime += task.delay, repeatFns.sort(function(a, b) {
                        return a.nextTime - b.nextTime;
                    });
                }
                return millis;
            }, $interval;
        } ];
    };
    var R_ISO8061_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;
    if (angular.mock.TzDate = function(offset, timestamp) {
        var self = new Date(0);
        if (angular.isString(timestamp)) {
            var tsStr = timestamp;
            if (self.origDate = jsonStringToDate(timestamp), timestamp = self.origDate.getTime(), 
            isNaN(timestamp)) throw {
                name: "Illegal Argument",
                message: "Arg '" + tsStr + "' passed into TzDate constructor is not a valid date string"
            };
        } else self.origDate = new Date(timestamp);
        var localOffset = new Date(timestamp).getTimezoneOffset();
        self.offsetDiff = 60 * localOffset * 1e3 - 1e3 * offset * 60 * 60, self.date = new Date(timestamp + self.offsetDiff), 
        self.getTime = function() {
            return self.date.getTime() - self.offsetDiff;
        }, self.toLocaleDateString = function() {
            return self.date.toLocaleDateString();
        }, self.getFullYear = function() {
            return self.date.getFullYear();
        }, self.getMonth = function() {
            return self.date.getMonth();
        }, self.getDate = function() {
            return self.date.getDate();
        }, self.getHours = function() {
            return self.date.getHours();
        }, self.getMinutes = function() {
            return self.date.getMinutes();
        }, self.getSeconds = function() {
            return self.date.getSeconds();
        }, self.getMilliseconds = function() {
            return self.date.getMilliseconds();
        }, self.getTimezoneOffset = function() {
            return 60 * offset;
        }, self.getUTCFullYear = function() {
            return self.origDate.getUTCFullYear();
        }, self.getUTCMonth = function() {
            return self.origDate.getUTCMonth();
        }, self.getUTCDate = function() {
            return self.origDate.getUTCDate();
        }, self.getUTCHours = function() {
            return self.origDate.getUTCHours();
        }, self.getUTCMinutes = function() {
            return self.origDate.getUTCMinutes();
        }, self.getUTCSeconds = function() {
            return self.origDate.getUTCSeconds();
        }, self.getUTCMilliseconds = function() {
            return self.origDate.getUTCMilliseconds();
        }, self.getDay = function() {
            return self.date.getDay();
        }, self.toISOString && (self.toISOString = function() {
            return padNumber(self.origDate.getUTCFullYear(), 4) + "-" + padNumber(self.origDate.getUTCMonth() + 1, 2) + "-" + padNumber(self.origDate.getUTCDate(), 2) + "T" + padNumber(self.origDate.getUTCHours(), 2) + ":" + padNumber(self.origDate.getUTCMinutes(), 2) + ":" + padNumber(self.origDate.getUTCSeconds(), 2) + "." + padNumber(self.origDate.getUTCMilliseconds(), 3) + "Z";
        });
        var unimplementedMethods = [ "getUTCDay", "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "toDateString", "toGMTString", "toJSON", "toLocaleFormat", "toLocaleString", "toLocaleTimeString", "toSource", "toString", "toTimeString", "toUTCString", "valueOf" ];
        return angular.forEach(unimplementedMethods, function(methodName) {
            self[methodName] = function() {
                throw new Error("Method '" + methodName + "' is not implemented in the TzDate mock");
            };
        }), self;
    }, angular.mock.TzDate.prototype = Date.prototype, angular.mock.animate = angular.module("ngAnimateMock", [ "ng" ]).config([ "$provide", function($provide) {
        $provide.factory("$$forceReflow", function() {
            function reflowFn() {
                reflowFn.totalReflows++;
            }
            return reflowFn.totalReflows = 0, reflowFn;
        }), $provide.factory("$$animateAsyncRun", function() {
            var queue = [], queueFn = function() {
                return function(fn) {
                    queue.push(fn);
                };
            };
            return queueFn.flush = function() {
                if (0 === queue.length) return !1;
                for (var i = 0; i < queue.length; i++) queue[i]();
                return queue = [], !0;
            }, queueFn;
        }), $provide.decorator("$animate", [ "$delegate", "$timeout", "$browser", "$$rAF", "$$forceReflow", "$$animateAsyncRun", "$rootScope", function($delegate, $timeout, $browser, $$rAF, $$forceReflow, $$animateAsyncRun, $rootScope) {
            var animate = {
                queue: [],
                cancel: $delegate.cancel,
                on: $delegate.on,
                off: $delegate.off,
                pin: $delegate.pin,
                get reflows() {
                    return $$forceReflow.totalReflows;
                },
                enabled: $delegate.enabled,
                flush: function() {
                    $rootScope.$digest();
                    var doNextRun, somethingFlushed = !1;
                    do doNextRun = !1, $$rAF.queue.length && ($$rAF.flush(), doNextRun = somethingFlushed = !0), 
                    $$animateAsyncRun.flush() && (doNextRun = somethingFlushed = !0); while (doNextRun);
                    if (!somethingFlushed) throw new Error("No pending animations ready to be closed or flushed");
                    $rootScope.$digest();
                }
            };
            return angular.forEach([ "animate", "enter", "leave", "move", "addClass", "removeClass", "setClass" ], function(method) {
                animate[method] = function() {
                    return animate.queue.push({
                        event: method,
                        element: arguments[0],
                        options: arguments[arguments.length - 1],
                        args: arguments
                    }), $delegate[method].apply($delegate, arguments);
                };
            }), animate;
        } ]);
    } ]), angular.mock.dump = function(object) {
        function serialize(object) {
            var out;
            return angular.isElement(object) ? (object = angular.element(object), out = angular.element("<div></div>"), 
            angular.forEach(object, function(element) {
                out.append(angular.element(element).clone());
            }), out = out.html()) : angular.isArray(object) ? (out = [], angular.forEach(object, function(o) {
                out.push(serialize(o));
            }), out = "[ " + out.join(", ") + " ]") : out = angular.isObject(object) ? angular.isFunction(object.$eval) && angular.isFunction(object.$apply) ? serializeScope(object) : object instanceof Error ? object.stack || "" + object.name + ": " + object.message : angular.toJson(object, !0) : String(object), 
            out;
        }
        function serializeScope(scope, offset) {
            offset = offset || "  ";
            var log = [ offset + "Scope(" + scope.$id + "): {" ];
            for (var key in scope) Object.prototype.hasOwnProperty.call(scope, key) && !key.match(/^(\$|this)/) && log.push("  " + key + ": " + angular.toJson(scope[key]));
            for (var child = scope.$$childHead; child; ) log.push(serializeScope(child, offset + "  ")), 
            child = child.$$nextSibling;
            return log.push("}"), log.join("\n" + offset);
        }
        return serialize(object);
    }, angular.mock.$HttpBackendProvider = function() {
        this.$get = [ "$rootScope", "$timeout", createHttpBackendMock ];
    }, angular.mock.$TimeoutDecorator = [ "$delegate", "$browser", function($delegate, $browser) {
        function formatPendingTasksAsString(tasks) {
            var result = [];
            return angular.forEach(tasks, function(task) {
                result.push("{id: " + task.id + ", time: " + task.time + "}");
            }), result.join(", ");
        }
        return $delegate.flush = function(delay) {
            $browser.defer.flush(delay);
        }, $delegate.verifyNoPendingTasks = function() {
            if ($browser.deferredFns.length) throw new Error("Deferred tasks to flush (" + $browser.deferredFns.length + "): " + formatPendingTasksAsString($browser.deferredFns));
        }, $delegate;
    } ], angular.mock.$RAFDecorator = [ "$delegate", function($delegate) {
        var rafFn = function(fn) {
            var index = rafFn.queue.length;
            return rafFn.queue.push(fn), function() {
                rafFn.queue.splice(index, 1);
            };
        };
        return rafFn.queue = [], rafFn.supported = $delegate.supported, rafFn.flush = function() {
            if (0 === rafFn.queue.length) throw new Error("No rAF callbacks present");
            for (var length = rafFn.queue.length, i = 0; length > i; i++) rafFn.queue[i]();
            rafFn.queue = rafFn.queue.slice(i);
        }, rafFn;
    } ], angular.mock.$RootElementProvider = function() {
        this.$get = function() {
            return angular.element("<div ng-app></div>");
        };
    }, angular.mock.$ControllerDecorator = [ "$delegate", function($delegate) {
        return function(expression, locals, later, ident) {
            if (later && "object" == typeof later) {
                var create = $delegate(expression, locals, !0, ident);
                return angular.extend(create.instance, later), create();
            }
            return $delegate(expression, locals, later, ident);
        };
    } ], angular.module("ngMock", [ "ng" ]).provider({
        $browser: angular.mock.$BrowserProvider,
        $exceptionHandler: angular.mock.$ExceptionHandlerProvider,
        $log: angular.mock.$LogProvider,
        $interval: angular.mock.$IntervalProvider,
        $httpBackend: angular.mock.$HttpBackendProvider,
        $rootElement: angular.mock.$RootElementProvider
    }).config([ "$provide", function($provide) {
        $provide.decorator("$timeout", angular.mock.$TimeoutDecorator), $provide.decorator("$$rAF", angular.mock.$RAFDecorator), 
        $provide.decorator("$rootScope", angular.mock.$RootScopeDecorator), $provide.decorator("$controller", angular.mock.$ControllerDecorator);
    } ]), angular.module("ngMockE2E", [ "ng" ]).config([ "$provide", function($provide) {
        $provide.decorator("$httpBackend", angular.mock.e2e.$httpBackendDecorator);
    } ]), angular.mock.e2e = {}, angular.mock.e2e.$httpBackendDecorator = [ "$rootScope", "$timeout", "$delegate", "$browser", createHttpBackendMock ], 
    angular.mock.$RootScopeDecorator = [ "$delegate", function($delegate) {
        function countChildScopes() {
            for (var currentScope, count = 0, pendingChildHeads = [ this.$$childHead ]; pendingChildHeads.length; ) for (currentScope = pendingChildHeads.shift(); currentScope; ) count += 1, 
            pendingChildHeads.push(currentScope.$$childHead), currentScope = currentScope.$$nextSibling;
            return count;
        }
        function countWatchers() {
            for (var currentScope, count = this.$$watchers ? this.$$watchers.length : 0, pendingChildHeads = [ this.$$childHead ]; pendingChildHeads.length; ) for (currentScope = pendingChildHeads.shift(); currentScope; ) count += currentScope.$$watchers ? currentScope.$$watchers.length : 0, 
            pendingChildHeads.push(currentScope.$$childHead), currentScope = currentScope.$$nextSibling;
            return count;
        }
        var $rootScopePrototype = Object.getPrototypeOf($delegate);
        return $rootScopePrototype.$countChildScopes = countChildScopes, $rootScopePrototype.$countWatchers = countWatchers, 
        $delegate;
    } ], window.jasmine || window.mocha) {
        var currentSpec = null, annotatedFunctions = [], isSpecRunning = function() {
            return !!currentSpec;
        };
        angular.mock.$$annotate = angular.injector.$$annotate, angular.injector.$$annotate = function(fn) {
            return "function" != typeof fn || fn.$inject || annotatedFunctions.push(fn), angular.mock.$$annotate.apply(this, arguments);
        }, (window.beforeEach || window.setup)(function() {
            annotatedFunctions = [], currentSpec = this;
        }), (window.afterEach || window.teardown)(function() {
            var injector = currentSpec.$injector;
            annotatedFunctions.forEach(function(fn) {
                delete fn.$inject;
            }), angular.forEach(currentSpec.$modules, function(module) {
                module && module.$$hashKey && (module.$$hashKey = undefined);
            }), currentSpec.$injector = null, currentSpec.$modules = null, currentSpec = null, 
            injector && injector.get("$rootElement").off(), angular.forEach(angular.element.fragments, function(val, key) {
                delete angular.element.fragments[key];
            }), MockXhr.$$lastInstance = null, angular.forEach(angular.callbacks, function(val, key) {
                delete angular.callbacks[key];
            }), angular.callbacks.counter = 0;
        }), window.module = angular.mock.module = function() {
            function workFn() {
                if (currentSpec.$injector) throw new Error("Injector already created, can not register a module!");
                var modules = currentSpec.$modules || (currentSpec.$modules = []);
                angular.forEach(moduleFns, function(module) {
                    angular.isObject(module) && !angular.isArray(module) ? modules.push(function($provide) {
                        angular.forEach(module, function(value, key) {
                            $provide.value(key, value);
                        });
                    }) : modules.push(module);
                });
            }
            var moduleFns = Array.prototype.slice.call(arguments, 0);
            return isSpecRunning() ? workFn() : workFn;
        };
        var ErrorAddingDeclarationLocationStack = function(e, errorForStack) {
            this.message = e.message, this.name = e.name, e.line && (this.line = e.line), e.sourceId && (this.sourceId = e.sourceId), 
            e.stack && errorForStack && (this.stack = e.stack + "\n" + errorForStack.stack), 
            e.stackArray && (this.stackArray = e.stackArray);
        };
        ErrorAddingDeclarationLocationStack.prototype.toString = Error.prototype.toString, 
        window.inject = angular.mock.inject = function() {
            function workFn() {
                var modules = currentSpec.$modules || [], strictDi = !!currentSpec.$injectorStrict;
                modules.unshift("ngMock"), modules.unshift("ng");
                var injector = currentSpec.$injector;
                injector || (strictDi && angular.forEach(modules, function(moduleFn) {
                    "function" == typeof moduleFn && angular.injector.$$annotate(moduleFn);
                }), injector = currentSpec.$injector = angular.injector(modules, strictDi), currentSpec.$injectorStrict = strictDi);
                for (var i = 0, ii = blockFns.length; ii > i; i++) {
                    currentSpec.$injectorStrict && injector.annotate(blockFns[i]);
                    try {
                        injector.invoke(blockFns[i] || angular.noop, this);
                    } catch (e) {
                        if (e.stack && errorForStack) throw new ErrorAddingDeclarationLocationStack(e, errorForStack);
                        throw e;
                    } finally {
                        errorForStack = null;
                    }
                }
            }
            var blockFns = Array.prototype.slice.call(arguments, 0), errorForStack = new Error("Declaration Location");
            return isSpecRunning() ? workFn.call(currentSpec) : workFn;
        }, angular.mock.inject.strictDi = function(value) {
            function workFn() {
                if (value !== currentSpec.$injectorStrict) {
                    if (currentSpec.$injector) throw new Error("Injector already created, can not modify strict annotations");
                    currentSpec.$injectorStrict = value;
                }
            }
            return value = arguments.length ? !!value : !0, isSpecRunning() ? workFn() : workFn;
        };
    }
}(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), 
function(a, b, c) {
    "use strict";
    function d(a, b) {
        return N(new (N(function() {}, {
            prototype: a
        }))(), b);
    }
    function e(a) {
        return M(arguments, function(b) {
            b !== a && M(b, function(b, c) {
                a.hasOwnProperty(c) || (a[c] = b);
            });
        }), a;
    }
    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d]) break;
            c.push(a.path[d]);
        }
        return c;
    }
    function g(a) {
        if (Object.keys) return Object.keys(a);
        var b = [];
        return M(a, function(a, c) {
            b.push(c);
        }), b;
    }
    function h(a, b) {
        if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++) if (d in a && a[d] === b) return d;
        return -1;
    }
    function i(a, b, c, d) {
        var e, i = f(c, d), j = {}, k = [];
        for (var l in i) if (i[l].params && (e = g(i[l].params), e.length)) for (var m in e) h(k, e[m]) >= 0 || (k.push(e[m]), 
        j[e[m]] = a[e[m]]);
        return N({}, j, b);
    }
    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a) c.push(d);
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f]) return !1;
        }
        return !0;
    }
    function k(a, b) {
        var c = {};
        return M(a, function(a) {
            c[a] = b[a];
        }), c;
    }
    function l(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        return M(c, function(c) {
            c in a && (b[c] = a[c]);
        }), b;
    }
    function m(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var d in a) -1 == h(c, d) && (b[d] = a[d]);
        return b;
    }
    function n(a, b) {
        var c = L(a), d = c ? [] : {};
        return M(a, function(a, e) {
            b(a, e) && (d[c ? d.length : e] = a);
        }), d;
    }
    function o(a, b) {
        var c = L(a) ? [] : {};
        return M(a, function(a, d) {
            c[d] = b(a, d);
        }), c;
    }
    function p(a, b) {
        var d = 1, f = 2, i = {}, j = [], k = i, l = N(a.when(i), {
            $$promises: i,
            $$values: i
        });
        this.study = function(i) {
            function n(a, c) {
                if (s[c] !== f) {
                    if (r.push(c), s[c] === d) throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));
                    if (s[c] = d, J(a)) q.push(c, [ function() {
                        return b.get(a);
                    } ], j); else {
                        var e = b.annotate(a);
                        M(e, function(a) {
                            a !== c && i.hasOwnProperty(a) && n(i[a], a);
                        }), q.push(c, a, e);
                    }
                    r.pop(), s[c] = f;
                }
            }
            function o(a) {
                return K(a) && a.then && a.$$promises;
            }
            if (!K(i)) throw new Error("'invocables' must be an object");
            var p = g(i || {}), q = [], r = [], s = {};
            return M(i, n), i = r = s = null, function(d, f, g) {
                function h() {
                    --u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, 
                    delete r.$$inheritedValues, n.resolve(t));
                }
                function i(a) {
                    r.$$failure = a, n.reject(a);
                }
                function j(c, e, f) {
                    function j(a) {
                        l.reject(a), i(a);
                    }
                    function k() {
                        if (!H(r.$$failure)) try {
                            l.resolve(b.invoke(e, g, t)), l.promise.then(function(a) {
                                t[c] = a, h();
                            }, j);
                        } catch (a) {
                            j(a);
                        }
                    }
                    var l = a.defer(), m = 0;
                    M(f, function(a) {
                        s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function(b) {
                            t[a] = b, --m || k();
                        }, j));
                    }), m || k(), s[c] = l.promise;
                }
                if (o(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!K(d)) throw new Error("'locals' must be an object");
                } else d = k;
                if (f) {
                    if (!o(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()");
                } else f = l;
                var n = a.defer(), r = n.promise, s = r.$$promises = {}, t = N({}, d), u = 1 + q.length / 3, v = !1;
                if (H(f.$$failure)) return i(f.$$failure), r;
                f.$$inheritedValues && e(t, m(f.$$inheritedValues, p)), N(s, f.$$promises), f.$$values ? (v = e(t, m(f.$$values, p)), 
                r.$$inheritedValues = m(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = m(f.$$inheritedValues, p)), 
                f.then(h, i));
                for (var w = 0, x = q.length; x > w; w += 3) d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
                return r;
            };
        }, this.resolve = function(a, b, c, d) {
            return this.study(a)(b, c, d);
        };
    }
    function q(a, b, c) {
        this.fromConfig = function(a, b, c) {
            return H(a.template) ? this.fromString(a.template, b) : H(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : H(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null;
        }, this.fromString = function(a, b) {
            return I(a) ? a(b) : a;
        }, this.fromUrl = function(c, d) {
            return I(c) && (c = c(d)), null == c ? null : a.get(c, {
                cache: b,
                headers: {
                    Accept: "text/html"
                }
            }).then(function(a) {
                return a.data;
            });
        }, this.fromProvider = function(a, b, d) {
            return c.invoke(a, null, d || {
                params: b
            });
        };
    }
    function r(a, b, e) {
        function f(b, c, d, e) {
            if (q.push(b), o[b]) return o[b];
            if (!/^\w+(-+\w+)*(?:\[\])?$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (p[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            return p[b] = new P.Param(b, c, d, e), p[b];
        }
        function g(a, b, c, d) {
            var e = [ "", "" ], f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!b) return f;
            switch (c) {
              case !1:
                e = [ "(", ")" + (d ? "?" : "") ];
                break;

              case !0:
                e = [ "?(", ")?" ];
                break;

              default:
                e = [ "(" + c + "|", ")?" ];
            }
            return f + e[0] + b + e[1];
        }
        function h(e, f) {
            var g, h, i, j, k;
            return g = e[2] || e[3], k = b.params[g], i = a.substring(m, e.index), h = f ? e[4] : e[4] || ("*" == e[1] ? ".*" : null), 
            j = P.type(h || "string") || d(P.type("string"), {
                pattern: new RegExp(h, b.caseInsensitive ? "i" : c)
            }), {
                id: g,
                regexp: h,
                segment: i,
                type: j,
                cfg: k
            };
        }
        b = N({
            params: {}
        }, K(b) ? b : {});
        var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, k = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, l = "^", m = 0, n = this.segments = [], o = e ? e.params : {}, p = this.params = e ? e.params.$$new() : new P.ParamSet(), q = [];
        this.source = a;
        for (var r, s, t; (i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0)); ) s = f(r.id, r.type, r.cfg, "path"), 
        l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional), n.push(r.segment), 
        m = j.lastIndex;
        t = a.substring(m);
        var u = t.indexOf("?");
        if (u >= 0) {
            var v = this.sourceSearch = t.substring(u);
            if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0) for (m = 0; i = k.exec(v); ) r = h(i, !0), 
            s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex;
        } else this.sourcePath = a, this.sourceSearch = "";
        l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), 
        this.prefix = n[0], this.$$paramNames = q;
    }
    function s(a) {
        N(this, a);
    }
    function t() {
        function a(a) {
            return null != a ? a.toString().replace(/\//g, "%2F") : a;
        }
        function e(a) {
            return null != a ? a.toString().replace(/%2F/g, "/") : a;
        }
        function f() {
            return {
                strict: p,
                caseInsensitive: m
            };
        }
        function i(a) {
            return I(a) || L(a) && I(a[a.length - 1]);
        }
        function j() {
            for (;w.length; ) {
                var a = w.shift();
                if (a.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                b.extend(u[a.name], l.invoke(a.def));
            }
        }
        function k(a) {
            N(this, a || {});
        }
        P = this;
        var l, m = !1, p = !0, q = !1, u = {}, v = !0, w = [], x = {
            string: {
                encode: a,
                decode: e,
                is: function(a) {
                    return null == a || !H(a) || "string" == typeof a;
                },
                pattern: /[^/]*/
            },
            "int": {
                encode: a,
                decode: function(a) {
                    return parseInt(a, 10);
                },
                is: function(a) {
                    return H(a) && this.decode(a.toString()) === a;
                },
                pattern: /\d+/
            },
            bool: {
                encode: function(a) {
                    return a ? 1 : 0;
                },
                decode: function(a) {
                    return 0 !== parseInt(a, 10);
                },
                is: function(a) {
                    return a === !0 || a === !1;
                },
                pattern: /0|1/
            },
            date: {
                encode: function(a) {
                    return this.is(a) ? [ a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2) ].join("-") : c;
                },
                decode: function(a) {
                    if (this.is(a)) return a;
                    var b = this.capture.exec(a);
                    return b ? new Date(b[1], b[2] - 1, b[3]) : c;
                },
                is: function(a) {
                    return a instanceof Date && !isNaN(a.valueOf());
                },
                equals: function(a, b) {
                    return this.is(a) && this.is(b) && a.toISOString() === b.toISOString();
                },
                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            },
            json: {
                encode: b.toJson,
                decode: b.fromJson,
                is: b.isObject,
                equals: b.equals,
                pattern: /[^/]*/
            },
            any: {
                encode: b.identity,
                decode: b.identity,
                equals: b.equals,
                pattern: /.*/
            }
        };
        t.$$getDefaultValue = function(a) {
            if (!i(a.value)) return a.value;
            if (!l) throw new Error("Injectable functions cannot be called at configuration time");
            return l.invoke(a.value);
        }, this.caseInsensitive = function(a) {
            return H(a) && (m = a), m;
        }, this.strictMode = function(a) {
            return H(a) && (p = a), p;
        }, this.defaultSquashPolicy = function(a) {
            if (!H(a)) return q;
            if (a !== !0 && a !== !1 && !J(a)) throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");
            return q = a, a;
        }, this.compile = function(a, b) {
            return new r(a, N(f(), b));
        }, this.isMatcher = function(a) {
            if (!K(a)) return !1;
            var b = !0;
            return M(r.prototype, function(c, d) {
                I(c) && (b = b && H(a[d]) && I(a[d]));
            }), b;
        }, this.type = function(a, b, c) {
            if (!H(b)) return u[a];
            if (u.hasOwnProperty(a)) throw new Error("A type named '" + a + "' has already been defined.");
            return u[a] = new s(N({
                name: a
            }, b)), c && (w.push({
                name: a,
                def: c
            }), v || j()), this;
        }, M(x, function(a, b) {
            u[b] = new s(N({
                name: b
            }, a));
        }), u = d(u, {}), this.$get = [ "$injector", function(a) {
            return l = a, v = !1, j(), M(x, function(a, b) {
                u[b] || (u[b] = new s(a));
            }), this;
        } ], this.Param = function(a, b, d, e) {
            function f(a) {
                var b = K(a) ? g(a) : [], c = -1 === h(b, "value") && -1 === h(b, "type") && -1 === h(b, "squash") && -1 === h(b, "array");
                return c && (a = {
                    value: a
                }), a.$$fn = i(a.value) ? a.value : function() {
                    return a.value;
                }, a;
            }
            function j(b, c, d) {
                if (b.type && c) throw new Error("Param '" + a + "' has two type configurations.");
                return c ? c : b.type ? b.type instanceof s ? b.type : new s(b.type) : "config" === d ? u.any : u.string;
            }
            function k() {
                var b = {
                    array: "search" === e ? "auto" : !1
                }, c = a.match(/\[\]$/) ? {
                    array: !0
                } : {};
                return N(b, c, d).array;
            }
            function m(a, b) {
                var c = a.squash;
                if (!b || c === !1) return !1;
                if (!H(c) || null == c) return q;
                if (c === !0 || J(c)) return c;
                throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string");
            }
            function p(a, b, d, e) {
                var f, g, i = [ {
                    from: "",
                    to: d || b ? c : ""
                }, {
                    from: null,
                    to: d || b ? c : ""
                } ];
                return f = L(a.replace) ? a.replace : [], J(e) && f.push({
                    from: e,
                    to: c
                }), g = o(f, function(a) {
                    return a.from;
                }), n(i, function(a) {
                    return -1 === h(g, a.from);
                }).concat(f);
            }
            function r() {
                if (!l) throw new Error("Injectable functions cannot be called at configuration time");
                var a = l.invoke(d.$$fn);
                if (null !== a && a !== c && !w.type.is(a)) throw new Error("Default value (" + a + ") for parameter '" + w.id + "' is not an instance of Type (" + w.type.name + ")");
                return a;
            }
            function t(a) {
                function b(a) {
                    return function(b) {
                        return b.from === a;
                    };
                }
                function c(a) {
                    var c = o(n(w.replace, b(a)), function(a) {
                        return a.to;
                    });
                    return c.length ? c[0] : a;
                }
                return a = c(a), H(a) ? w.type.$normalize(a) : r();
            }
            function v() {
                return "{Param:" + a + " " + b + " squash: '" + z + "' optional: " + y + "}";
            }
            var w = this;
            d = f(d), b = j(d, b, e);
            var x = k();
            b = x ? b.$asArray(x, "search" === e) : b, "string" !== b.name || x || "path" !== e || d.value !== c || (d.value = "");
            var y = d.value !== c, z = m(d, y), A = p(d, x, y, z);
            N(this, {
                id: a,
                type: b,
                location: e,
                array: x,
                squash: z,
                replace: A,
                isOptional: y,
                value: t,
                dynamic: c,
                config: d,
                toString: v
            });
        }, k.prototype = {
            $$new: function() {
                return d(this, N(new k(), {
                    $$parent: this
                }));
            },
            $$keys: function() {
                for (var a = [], b = [], c = this, d = g(k.prototype); c; ) b.push(c), c = c.$$parent;
                return b.reverse(), M(b, function(b) {
                    M(g(b), function(b) {
                        -1 === h(a, b) && -1 === h(d, b) && a.push(b);
                    });
                }), a;
            },
            $$values: function(a) {
                var b = {}, c = this;
                return M(c.$$keys(), function(d) {
                    b[d] = c[d].value(a && a[d]);
                }), b;
            },
            $$equals: function(a, b) {
                var c = !0, d = this;
                return M(d.$$keys(), function(e) {
                    var f = a && a[e], g = b && b[e];
                    d[e].type.equals(f, g) || (c = !1);
                }), c;
            },
            $$validates: function(a) {
                var d, e, f, g, h, i = this.$$keys();
                for (d = 0; d < i.length && (e = this[i[d]], f = a[i[d]], f !== c && null !== f || !e.isOptional); d++) {
                    if (g = e.type.$normalize(f), !e.type.is(g)) return !1;
                    if (h = e.type.encode(g), b.isString(h) && !e.type.pattern.exec(h)) return !1;
                }
                return !0;
            },
            $$parent: c
        }, this.ParamSet = k;
    }
    function u(a, d) {
        function e(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : "";
        }
        function f(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
                return b["$" === c ? 0 : Number(c)];
            });
        }
        function g(a, b, c) {
            if (!c) return !1;
            var d = a.invoke(b, b, {
                $match: c
            });
            return H(d) ? d : !0;
        }
        function h(d, e, f, g) {
            function h(a, b, c) {
                return "/" === p ? a : b ? p.slice(0, -1) + a : c ? p.slice(1) + a : a;
            }
            function m(a) {
                function b(a) {
                    var b = a(f, d);
                    return b ? (J(b) && d.replace().url(b), !0) : !1;
                }
                if (!a || !a.defaultPrevented) {
                    o && d.url() === o, o = c;
                    var e, g = j.length;
                    for (e = 0; g > e; e++) if (b(j[e])) return;
                    k && b(k);
                }
            }
            function n() {
                return i = i || e.$on("$locationChangeSuccess", m);
            }
            var o, p = g.baseHref(), q = d.url();
            return l || n(), {
                sync: function() {
                    m();
                },
                listen: function() {
                    return n();
                },
                update: function(a) {
                    return a ? void (q = d.url()) : void (d.url() !== q && (d.url(q), d.replace()));
                },
                push: function(a, b, e) {
                    var f = a.format(b || {});
                    null !== f && b && b["#"] && (f += "#" + b["#"]), d.url(f), o = e && e.$$avoidResync ? d.url() : c, 
                    e && e.replace && d.replace();
                },
                href: function(c, e, f) {
                    if (!c.validates(e)) return null;
                    var g = a.html5Mode();
                    b.isObject(g) && (g = g.enabled);
                    var i = c.format(e);
                    if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), null !== i && e && e["#"] && (i += "#" + e["#"]), 
                    i = h(i, g, f.absolute), !f.absolute || !i) return i;
                    var j = !g && i ? "/" : "", k = d.port();
                    return k = 80 === k || 443 === k ? "" : ":" + k, [ d.protocol(), "://", d.host(), k, j, i ].join("");
                }
            };
        }
        var i, j = [], k = null, l = !1;
        this.rule = function(a) {
            if (!I(a)) throw new Error("'rule' must be a function");
            return j.push(a), this;
        }, this.otherwise = function(a) {
            if (J(a)) {
                var b = a;
                a = function() {
                    return b;
                };
            } else if (!I(a)) throw new Error("'rule' must be a function");
            return k = a, this;
        }, this.when = function(a, b) {
            var c, h = J(b);
            if (J(a) && (a = d.compile(a)), !h && !I(b) && !L(b)) throw new Error("invalid 'handler' in when()");
            var i = {
                matcher: function(a, b) {
                    return h && (c = d.compile(b), b = [ "$match", function(a) {
                        return c.format(a);
                    } ]), N(function(c, d) {
                        return g(c, b, a.exec(d.path(), d.search()));
                    }, {
                        prefix: J(a.prefix) ? a.prefix : ""
                    });
                },
                regex: function(a, b) {
                    if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
                    return h && (c = b, b = [ "$match", function(a) {
                        return f(c, a);
                    } ]), N(function(c, d) {
                        return g(c, b, a.exec(d.path()));
                    }, {
                        prefix: e(a)
                    });
                }
            }, j = {
                matcher: d.isMatcher(a),
                regex: a instanceof RegExp
            };
            for (var k in j) if (j[k]) return this.rule(i[k](a, b));
            throw new Error("invalid 'what' in when()");
        }, this.deferIntercept = function(a) {
            a === c && (a = !0), l = a;
        }, this.$get = h, h.$inject = [ "$location", "$rootScope", "$injector", "$browser" ];
    }
    function v(a, e) {
        function f(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^");
        }
        function m(a, b) {
            if (!a) return c;
            var d = J(a), e = d ? a : a.name, g = f(e);
            if (g) {
                if (!b) throw new Error("No reference point given for path '" + e + "'");
                b = m(b);
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++) if ("" !== h[i] || 0 !== i) {
                    if ("^" !== h[i]) break;
                    if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                    k = k.parent;
                } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h;
            }
            var l = z[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l;
        }
        function n(a, b) {
            A[a] || (A[a] = []), A[a].push(b);
        }
        function p(a) {
            for (var b = A[a] || []; b.length; ) q(b.shift());
        }
        function q(b) {
            b = d(b, {
                self: b,
                resolve: b.resolve || {},
                toString: function() {
                    return this.name;
                }
            });
            var c = b.name;
            if (!J(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
            if (z.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : J(b.parent) ? b.parent : K(b.parent) && J(b.parent.name) ? b.parent.name : "";
            if (e && !z[e]) return n(e, b.self);
            for (var f in C) I(C[f]) && (b[f] = C[f](b, C.$delegates[f]));
            return z[c] = b, !b[B] && b.url && a.when(b.url, [ "$match", "$stateParams", function(a, c) {
                y.$current.navigable == b && j(a, c) || y.transitionTo(b, a, {
                    inherit: !0,
                    location: !1
                });
            } ]), p(c), b;
        }
        function r(a) {
            return a.indexOf("*") > -1;
        }
        function s(a) {
            for (var b = a.split("."), c = y.$current.name.split("."), d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
            return "**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), 
            c.push("**")), b.length != c.length ? !1 : c.join("") === b.join("");
        }
        function t(a, b) {
            return J(a) && !H(b) ? C[a] : I(b) && J(a) ? (C[a] && !C.$delegates[a] && (C.$delegates[a] = C[a]), 
            C[a] = b, this) : this;
        }
        function u(a, b) {
            return K(a) ? b = a : b.name = a, q(b), this;
        }
        function v(a, e, f, h, l, n, p, q, t) {
            function u(b, c, d, f) {
                var g = a.$broadcast("$stateNotFound", b, c, d);
                if (g.defaultPrevented) return p.update(), D;
                if (!g.retry) return null;
                if (f.$retry) return p.update(), E;
                var h = y.transition = e.when(g.retry);
                return h.then(function() {
                    return h !== y.transition ? A : (b.options.$retry = !0, y.transitionTo(b.to, b.toParams, b.options));
                }, function() {
                    return D;
                }), p.update(), h;
            }
            function v(a, c, d, g, i, j) {
                function m() {
                    var c = [];
                    return M(a.views, function(d, e) {
                        var g = d.resolve && d.resolve !== a.resolve ? d.resolve : {};
                        g.$template = [ function() {
                            return f.load(e, {
                                view: d,
                                locals: i.globals,
                                params: n,
                                notify: j.notify
                            }) || "";
                        } ], c.push(l.resolve(g, i.globals, i.resolve, a).then(function(c) {
                            if (I(d.controllerProvider) || L(d.controllerProvider)) {
                                var f = b.extend({}, g, i.globals);
                                c.$$controller = h.invoke(d.controllerProvider, null, f);
                            } else c.$$controller = d.controller;
                            c.$$state = a, c.$$controllerAs = d.controllerAs, i[e] = c;
                        }));
                    }), e.all(c).then(function() {
                        return i.globals;
                    });
                }
                var n = d ? c : k(a.params.$$keys(), c), o = {
                    $stateParams: n
                };
                i.resolve = l.resolve(a.resolve, o, i.resolve, a);
                var p = [ i.resolve.then(function(a) {
                    i.globals = a;
                }) ];
                return g && p.push(g), e.all(p).then(m).then(function(a) {
                    return i;
                });
            }
            var A = e.reject(new Error("transition superseded")), C = e.reject(new Error("transition prevented")), D = e.reject(new Error("transition aborted")), E = e.reject(new Error("transition failed"));
            return x.locals = {
                resolve: null,
                globals: {
                    $stateParams: {}
                }
            }, y = {
                params: {},
                current: x.self,
                $current: x,
                transition: null
            }, y.reload = function(a) {
                return y.transitionTo(y.current, n, {
                    reload: a || !0,
                    inherit: !1,
                    notify: !0
                });
            }, y.go = function(a, b, c) {
                return y.transitionTo(a, b, N({
                    inherit: !0,
                    relative: y.$current
                }, c));
            }, y.transitionTo = function(b, c, f) {
                c = c || {}, f = N({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var g, j = y.$current, l = y.params, o = j.path, q = m(b, f.relative), r = c["#"];
                if (!H(q)) {
                    var s = {
                        to: b,
                        toParams: c,
                        options: f
                    }, t = u(s, j.self, l, f);
                    if (t) return t;
                    if (b = s.to, c = s.toParams, f = s.options, q = m(b, f.relative), !H(q)) {
                        if (!f.relative) throw new Error("No such state '" + b + "'");
                        throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'");
                    }
                }
                if (q[B]) throw new Error("Cannot transition to abstract state '" + b + "'");
                if (f.inherit && (c = i(n, c || {}, y.$current, q)), !q.params.$$validates(c)) return E;
                c = q.params.$$values(c), b = q;
                var z = b.path, D = 0, F = z[D], G = x.locals, I = [];
                if (f.reload) {
                    if (J(f.reload) || K(f.reload)) {
                        if (K(f.reload) && !f.reload.name) throw new Error("Invalid reload state object");
                        var L = f.reload === !0 ? o[0] : m(f.reload);
                        if (f.reload && !L) throw new Error("No such reload state '" + (J(f.reload) ? f.reload : f.reload.name) + "'");
                        for (;F && F === o[D] && F !== L; ) G = I[D] = F.locals, D++, F = z[D];
                    }
                } else for (;F && F === o[D] && F.ownParams.$$equals(c, l); ) G = I[D] = F.locals, 
                D++, F = z[D];
                if (w(b, c, j, l, G, f)) return r && (c["#"] = r), y.params = c, O(y.params, n), 
                f.location && b.navigable && b.navigable.url && (p.push(b.navigable.url, c, {
                    $$avoidResync: !0,
                    replace: "replace" === f.location
                }), p.update(!0)), y.transition = null, e.when(y.current);
                if (c = k(b.params.$$keys(), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, l).defaultPrevented) return a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), 
                p.update(), C;
                for (var M = e.when(G), P = D; P < z.length; P++, F = z[P]) G = I[P] = d(G), M = v(F, c, F === b, M, G, f);
                var Q = y.transition = M.then(function() {
                    var d, e, g;
                    if (y.transition !== Q) return A;
                    for (d = o.length - 1; d >= D; d--) g = o[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), 
                    g.locals = null;
                    for (d = D; d < z.length; d++) e = z[d], e.locals = I[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
                    return r && (c["#"] = r), y.transition !== Q ? A : (y.$current = b, y.current = b.self, 
                    y.params = c, O(y.params, n), y.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
                        $$avoidResync: !0,
                        replace: "replace" === f.location
                    }), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, l), p.update(!0), 
                    y.current);
                }, function(d) {
                    return y.transition !== Q ? A : (y.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, l, d), 
                    g.defaultPrevented || p.update(), e.reject(d));
                });
                return Q;
            }, y.is = function(a, b, d) {
                d = N({
                    relative: y.$current
                }, d || {});
                var e = m(a, d.relative);
                return H(e) ? y.$current !== e ? !1 : b ? j(e.params.$$values(b), n) : !0 : c;
            }, y.includes = function(a, b, d) {
                if (d = N({
                    relative: y.$current
                }, d || {}), J(a) && r(a)) {
                    if (!s(a)) return !1;
                    a = y.$current.name;
                }
                var e = m(a, d.relative);
                return H(e) ? H(y.$current.includes[e.name]) ? b ? j(e.params.$$values(b), n, g(b)) : !0 : !1 : c;
            }, y.href = function(a, b, d) {
                d = N({
                    lossy: !0,
                    inherit: !0,
                    absolute: !1,
                    relative: y.$current
                }, d || {});
                var e = m(a, d.relative);
                if (!H(e)) return null;
                d.inherit && (b = i(n, b || {}, y.$current, e));
                var f = e && d.lossy ? e.navigable : e;
                return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys().concat("#"), b || {}), {
                    absolute: d.absolute
                }) : null;
            }, y.get = function(a, b) {
                if (0 === arguments.length) return o(g(z), function(a) {
                    return z[a].self;
                });
                var c = m(a, b || y.$current);
                return c && c.self ? c.self : null;
            }, y;
        }
        function w(a, b, c, d, e, f) {
            function g(a, b, c) {
                function d(b) {
                    return "search" != a.params[b].location;
                }
                var e = a.params.$$keys().filter(d), f = l.apply({}, [ a.params ].concat(e)), g = new P.ParamSet(f);
                return g.$$equals(b, c);
            }
            return !f.reload && a === c && (e === c.locals || a.self.reloadOnSearch === !1 && g(c, d, b)) ? !0 : void 0;
        }
        var x, y, z = {}, A = {}, B = "abstract", C = {
            parent: function(a) {
                if (H(a.parent) && a.parent) return m(a.parent);
                var b = /^(.+)\.[^.]+$/.exec(a.name);
                return b ? m(b[1]) : x;
            },
            data: function(a) {
                return a.parent && a.parent.data && (a.data = a.self.data = N({}, a.parent.data, a.data)), 
                a.data;
            },
            url: function(a) {
                var b = a.url, c = {
                    params: a.params || {}
                };
                if (J(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || x).url.concat(b, c);
                if (!b || e.isMatcher(b)) return b;
                throw new Error("Invalid url '" + b + "' in state '" + a + "'");
            },
            navigable: function(a) {
                return a.url ? a : a.parent ? a.parent.navigable : null;
            },
            ownParams: function(a) {
                var b = a.url && a.url.params || new P.ParamSet();
                return M(a.params || {}, function(a, c) {
                    b[c] || (b[c] = new P.Param(c, null, a, "config"));
                }), b;
            },
            params: function(a) {
                return a.parent && a.parent.params ? N(a.parent.params.$$new(), a.ownParams) : new P.ParamSet();
            },
            views: function(a) {
                var b = {};
                return M(H(a.views) ? a.views : {
                    "": a
                }, function(c, d) {
                    d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c;
                }), b;
            },
            path: function(a) {
                return a.parent ? a.parent.path.concat(a) : [];
            },
            includes: function(a) {
                var b = a.parent ? N({}, a.parent.includes) : {};
                return b[a.name] = !0, b;
            },
            $delegates: {}
        };
        x = q({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), x.navigable = null, this.decorator = t, this.state = u, this.$get = v, v.$inject = [ "$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory" ];
    }
    function w() {
        function a(a, b) {
            return {
                load: function(c, d) {
                    var e, f = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return d = N(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), 
                    e;
                }
            };
        }
        this.$get = a, a.$inject = [ "$rootScope", "$templateFactory" ];
    }
    function x() {
        var a = !1;
        this.useAnchorScroll = function() {
            a = !0;
        }, this.$get = [ "$anchorScroll", "$timeout", function(b, c) {
            return a ? b : function(a) {
                return c(function() {
                    a[0].scrollIntoView();
                }, 0, !1);
            };
        } ];
    }
    function y(a, c, d, e) {
        function f() {
            return c.has ? function(a) {
                return c.has(a) ? c.get(a) : null;
            } : function(a) {
                try {
                    return c.get(a);
                } catch (b) {
                    return null;
                }
            };
        }
        function g(a, b) {
            var c = function() {
                return {
                    enter: function(a, b, c) {
                        b.after(a), c();
                    },
                    leave: function(a, b) {
                        a.remove(), b();
                    }
                };
            };
            if (j) return {
                enter: function(a, b, c) {
                    var d = j.enter(a, null, b, c);
                    d && d.then && d.then(c);
                },
                leave: function(a, b) {
                    var c = j.leave(a, b);
                    c && c.then && c.then(b);
                }
            };
            if (i) {
                var d = i && i(b, a);
                return {
                    enter: function(a, b, c) {
                        d.enter(a, null, b), c();
                    },
                    leave: function(a, b) {
                        d.leave(a), b();
                    }
                };
            }
            return c();
        }
        var h = f(), i = h("$animator"), j = h("$animate"), k = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function(c, f, h) {
                return function(c, f, i) {
                    function j() {
                        l && (l.remove(), l = null), n && (n.$destroy(), n = null), m && (r.leave(m, function() {
                            l = null;
                        }), l = m, m = null);
                    }
                    function k(g) {
                        var k, l = A(c, i, f, e), s = l && a.$current && a.$current.locals[l];
                        if (g || s !== o) {
                            k = c.$new(), o = a.$current.locals[l];
                            var t = h(k, function(a) {
                                r.enter(a, f, function() {
                                    n && n.$emit("$viewContentAnimationEnded"), (b.isDefined(q) && !q || c.$eval(q)) && d(a);
                                }), j();
                            });
                            m = t, n = k, n.$emit("$viewContentLoaded"), n.$eval(p);
                        }
                    }
                    var l, m, n, o, p = i.onload || "", q = i.autoscroll, r = g(i, c);
                    c.$on("$stateChangeSuccess", function() {
                        k(!1);
                    }), c.$on("$viewContentLoading", function() {
                        k(!1);
                    }), k(!0);
                };
            }
        };
        return k;
    }
    function z(a, b, c, d) {
        return {
            restrict: "ECA",
            priority: -400,
            compile: function(e) {
                var f = e.html();
                return function(e, g, h) {
                    var i = c.$current, j = A(e, h, g, d), k = i && i.locals[j];
                    if (k) {
                        g.data("$uiView", {
                            name: j,
                            state: k.$$state
                        }), g.html(k.$template ? k.$template : f);
                        var l = a(g.contents());
                        if (k.$$controller) {
                            k.$scope = e, k.$element = g;
                            var m = b(k.$$controller, k);
                            k.$$controllerAs && (e[k.$$controllerAs] = m), g.data("$ngControllerController", m), 
                            g.children().data("$ngControllerController", m);
                        }
                        l(e);
                    }
                };
            }
        };
    }
    function A(a, b, c, d) {
        var e = d(b.uiView || b.name || "")(a), f = c.inheritedData("$uiView");
        return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "");
    }
    function B(a, b) {
        var c, d = a.match(/^\s*({[^}]*})\s*$/);
        if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), 
        !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");
        return {
            state: c[1],
            paramExpr: c[3] || null
        };
    }
    function C(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0;
    }
    function D(a, c) {
        var d = [ "location", "inherit", "reload", "absolute" ];
        return {
            restrict: "A",
            require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
            link: function(e, f, g, h) {
                var i = B(g.uiSref, a.current.name), j = null, k = C(f) || a.$current, l = "[object SVGAnimatedString]" === Object.prototype.toString.call(f.prop("href")) ? "xlink:href" : "href", m = null, n = "A" === f.prop("tagName").toUpperCase(), o = "FORM" === f[0].nodeName, p = o ? "action" : l, q = !0, r = {
                    relative: k,
                    inherit: !0
                }, s = e.$eval(g.uiSrefOpts) || {};
                b.forEach(d, function(a) {
                    a in s && (r[a] = s[a]);
                });
                var t = function(c) {
                    if (c && (j = b.copy(c)), q) {
                        m = a.href(i.state, j, r);
                        var d = h[1] || h[0];
                        return d && d.$$addStateInfo(i.state, j), null === m ? (q = !1, !1) : void g.$set(p, m);
                    }
                };
                i.paramExpr && (e.$watch(i.paramExpr, function(a, b) {
                    a !== j && t(a);
                }, !0), j = b.copy(e.$eval(i.paramExpr))), t(), o || f.bind("click", function(b) {
                    var d = b.which || b.button;
                    if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
                        var e = c(function() {
                            a.go(i.state, j, r);
                        });
                        b.preventDefault();
                        var g = n && !m ? 1 : 0;
                        b.preventDefault = function() {
                            g-- <= 0 && c.cancel(e);
                        };
                    }
                });
            }
        };
    }
    function E(a, b, c) {
        return {
            restrict: "A",
            controller: [ "$scope", "$element", "$attrs", function(b, d, e) {
                function f() {
                    g() ? d.addClass(i) : d.removeClass(i);
                }
                function g() {
                    for (var a = 0; a < j.length; a++) if (h(j[a].state, j[a].params)) return !0;
                    return !1;
                }
                function h(b, c) {
                    return "undefined" != typeof e.uiSrefActiveEq ? a.is(b.name, c) : a.includes(b.name, c);
                }
                var i, j = [];
                i = c(e.uiSrefActiveEq || e.uiSrefActive || "", !1)(b), this.$$addStateInfo = function(b, c) {
                    var e = a.get(b, C(d));
                    j.push({
                        state: e || {
                            name: b
                        },
                        params: c
                    }), f();
                }, b.$on("$stateChangeSuccess", f);
            } ]
        };
    }
    function F(a) {
        var b = function(b) {
            return a.is(b);
        };
        return b.$stateful = !0, b;
    }
    function G(a) {
        var b = function(b) {
            return a.includes(b);
        };
        return b.$stateful = !0, b;
    }
    var H = b.isDefined, I = b.isFunction, J = b.isString, K = b.isObject, L = b.isArray, M = b.forEach, N = b.extend, O = b.copy;
    b.module("ui.router.util", [ "ng" ]), b.module("ui.router.router", [ "ui.router.util" ]), 
    b.module("ui.router.state", [ "ui.router.router", "ui.router.util" ]), b.module("ui.router", [ "ui.router.state" ]), 
    b.module("ui.router.compat", [ "ui.router" ]), p.$inject = [ "$q", "$injector" ], 
    b.module("ui.router.util").service("$resolve", p), q.$inject = [ "$http", "$templateCache", "$injector" ], 
    b.module("ui.router.util").service("$templateFactory", q);
    var P;
    r.prototype.concat = function(a, b) {
        var c = {
            caseInsensitive: P.caseInsensitive(),
            strict: P.strictMode(),
            squash: P.defaultSquashPolicy()
        };
        return new r(this.sourcePath + a + this.sourceSearch, N(c, b), this);
    }, r.prototype.toString = function() {
        return this.source;
    }, r.prototype.exec = function(a, b) {
        function c(a) {
            function b(a) {
                return a.split("").reverse().join("");
            }
            function c(a) {
                return a.replace(/\\-/g, "-");
            }
            var d = b(a).split(/-(?!\\)/), e = o(d, b);
            return o(e, c).reverse();
        }
        var d = this.regexp.exec(a);
        if (!d) return null;
        b = b || {};
        var e, f, g, h = this.parameters(), i = h.length, j = this.segments.length - 1, k = {};
        if (j !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (e = 0; j > e; e++) {
            g = h[e];
            var l = this.params[g], m = d[e + 1];
            for (f = 0; f < l.replace; f++) l.replace[f].from === m && (m = l.replace[f].to);
            m && l.array === !0 && (m = c(m)), k[g] = l.value(m);
        }
        for (;i > e; e++) g = h[e], k[g] = this.params[g].value(b[g]);
        return k;
    }, r.prototype.parameters = function(a) {
        return H(a) ? this.params[a] || null : this.$$paramNames;
    }, r.prototype.validates = function(a) {
        return this.params.$$validates(a);
    }, r.prototype.format = function(a) {
        function b(a) {
            return encodeURIComponent(a).replace(/-/g, function(a) {
                return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase();
            });
        }
        a = a || {};
        var c = this.segments, d = this.parameters(), e = this.params;
        if (!this.validates(a)) return null;
        var f, g = !1, h = c.length - 1, i = d.length, j = c[0];
        for (f = 0; i > f; f++) {
            var k = h > f, l = d[f], m = e[l], n = m.value(a[l]), p = m.isOptional && m.type.equals(m.value(), n), q = p ? m.squash : !1, r = m.type.encode(n);
            if (k) {
                var s = c[f + 1];
                if (q === !1) null != r && (j += L(r) ? o(r, b).join("-") : encodeURIComponent(r)), 
                j += s; else if (q === !0) {
                    var t = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                    j += s.match(t)[1];
                } else J(q) && (j += q + s);
            } else {
                if (null == r || p && q !== !1) continue;
                L(r) || (r = [ r ]), r = o(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), 
                g = !0;
            }
        }
        return j;
    }, s.prototype.is = function(a, b) {
        return !0;
    }, s.prototype.encode = function(a, b) {
        return a;
    }, s.prototype.decode = function(a, b) {
        return a;
    }, s.prototype.equals = function(a, b) {
        return a == b;
    }, s.prototype.$subPattern = function() {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2);
    }, s.prototype.pattern = /.*/, s.prototype.toString = function() {
        return "{Type:" + this.name + "}";
    }, s.prototype.$normalize = function(a) {
        return this.is(a) ? a : this.decode(a);
    }, s.prototype.$asArray = function(a, b) {
        function d(a, b) {
            function d(a, b) {
                return function() {
                    return a[b].apply(a, arguments);
                };
            }
            function e(a) {
                return L(a) ? a : H(a) ? [ a ] : [];
            }
            function f(a) {
                switch (a.length) {
                  case 0:
                    return c;

                  case 1:
                    return "auto" === b ? a[0] : a;

                  default:
                    return a;
                }
            }
            function g(a) {
                return !a;
            }
            function h(a, b) {
                return function(c) {
                    c = e(c);
                    var d = o(c, a);
                    return b === !0 ? 0 === n(d, g).length : f(d);
                };
            }
            function i(a) {
                return function(b, c) {
                    var d = e(b), f = e(c);
                    if (d.length !== f.length) return !1;
                    for (var g = 0; g < d.length; g++) if (!a(d[g], f[g])) return !1;
                    return !0;
                };
            }
            this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), 
            this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$normalize = h(d(a, "$normalize")), 
            this.name = a.name, this.$arrayMode = b;
        }
        if (!a) return this;
        if ("auto" === a && !b) throw new Error("'auto' array mode is for query parameters only");
        return new d(this, a);
    }, b.module("ui.router.util").provider("$urlMatcherFactory", t), b.module("ui.router.util").run([ "$urlMatcherFactory", function(a) {} ]), 
    u.$inject = [ "$locationProvider", "$urlMatcherFactoryProvider" ], b.module("ui.router.router").provider("$urlRouter", u), 
    v.$inject = [ "$urlRouterProvider", "$urlMatcherFactoryProvider" ], b.module("ui.router.state").value("$stateParams", {}).provider("$state", v), 
    w.$inject = [], b.module("ui.router.state").provider("$view", w), b.module("ui.router.state").provider("$uiViewScroll", x), 
    y.$inject = [ "$state", "$injector", "$uiViewScroll", "$interpolate" ], z.$inject = [ "$compile", "$controller", "$state", "$interpolate" ], 
    b.module("ui.router.state").directive("uiView", y), b.module("ui.router.state").directive("uiView", z), 
    D.$inject = [ "$state", "$timeout" ], E.$inject = [ "$state", "$stateParams", "$interpolate" ], 
    b.module("ui.router.state").directive("uiSref", D).directive("uiSrefActive", E).directive("uiSrefActiveEq", E), 
    F.$inject = [ "$state" ], G.$inject = [ "$state" ], b.module("ui.router.state").filter("isState", F).filter("includedByState", G);
}(window, window.angular), function() {
    function w() {
        function z(b) {
            if ("undefined" != typeof module && module && module.exports) try {
                return require("crypto").randomBytes(b);
            } catch (a) {}
            try {
                var c;
                return (self.crypto || self.msCrypto).getRandomValues(c = new Uint32Array(b)), Array.prototype.slice.call(c);
            } catch (d) {}
            if (!u) throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
            return u(b);
        }
        function A(b, a) {
            for (var c = 0, d = 0, f = 0, g = b.length; g > f; ++f) b.charCodeAt(f) === a.charCodeAt(f) ? ++c : ++d;
            return 0 > c ? !1 : 0 === d;
        }
        function F(b) {
            var a = [], c = 0;
            return G.f(function() {
                return c >= b.length ? null : b.charCodeAt(c++);
            }, function(c) {
                a.push(c);
            }), a;
        }
        function v(b, a) {
            var f, g, c = 0, d = [];
            if (0 >= a || a > b.length) throw Error("Illegal len: " + a);
            for (;a > c; ) {
                if (f = 255 & b[c++], d.push(r[f >> 2 & 63]), f = (3 & f) << 4, c >= a) {
                    d.push(r[63 & f]);
                    break;
                }
                if (g = 255 & b[c++], f |= g >> 4 & 15, d.push(r[63 & f]), f = (15 & g) << 2, c >= a) {
                    d.push(r[63 & f]);
                    break;
                }
                g = 255 & b[c++], f |= g >> 6 & 3, d.push(r[63 & f]), d.push(r[63 & g]);
            }
            return d.join("");
        }
        function B(b, a) {
            var h, k, e, c = 0, d = b.length, f = 0, g = [];
            if (0 >= a) throw Error("Illegal len: " + a);
            for (;d - 1 > c && a > f && (e = b.charCodeAt(c++), h = e < p.length ? p[e] : -1, 
            e = b.charCodeAt(c++), k = e < p.length ? p[e] : -1, -1 != h && -1 != k) && (e = h << 2 >>> 0, 
            e |= (48 & k) >> 4, g.push(x(e)), !(++f >= a || c >= d)) && (e = b.charCodeAt(c++), 
            h = e < p.length ? p[e] : -1, -1 != h) && (e = (15 & k) << 4 >>> 0, e |= (60 & h) >> 2, 
            g.push(x(e)), !(++f >= a || c >= d)); ) e = b.charCodeAt(c++), k = e < p.length ? p[e] : -1, 
            e = (3 & h) << 6 >>> 0, e |= k, g.push(x(e)), ++f;
            for (d = [], c = 0; f > c; c++) d.push(g[c].charCodeAt(0));
            return d;
        }
        function t(b, a, c, d) {
            for (var f, g = b[a], h = b[a + 1], g = g ^ c[0], k = 0; 14 >= k; ) f = d[g >> 24 & 255], 
            f += d[256 | g >> 16 & 255], f ^= d[512 | g >> 8 & 255], f += d[768 | 255 & g], 
            h = h ^ f ^ c[++k], f = d[h >> 24 & 255], f += d[256 | h >> 16 & 255], f ^= d[512 | h >> 8 & 255], 
            f += d[768 | 255 & h], g = g ^ f ^ c[++k];
            return b[a] = h ^ c[17], b[a + 1] = g, b;
        }
        function s(b, a) {
            for (var c = 0, d = 0; 4 > c; ++c) d = d << 8 | 255 & b[a], a = (a + 1) % b.length;
            return {
                key: d,
                a: a
            };
        }
        function C(b, a, c) {
            for (var k, d = 0, f = [ 0, 0 ], g = a.length, h = c.length, e = 0; g > e; e++) k = s(b, d), 
            d = k.a, a[e] ^= k.key;
            for (e = 0; g > e; e += 2) f = t(f, 0, a, c), a[e] = f[0], a[e + 1] = f[1];
            for (e = 0; h > e; e += 2) f = t(f, 0, a, c), c[e] = f[0], c[e + 1] = f[1];
        }
        function H(b, a, c, d) {
            for (var e, f = 0, g = [ 0, 0 ], h = c.length, k = d.length, m = 0; h > m; m++) e = s(a, f), 
            f = e.a, c[m] ^= e.key;
            for (m = f = 0; h > m; m += 2) e = s(b, f), f = e.a, g[0] ^= e.key, e = s(b, f), 
            f = e.a, g[1] ^= e.key, g = t(g, 0, c, d), c[m] = g[0], c[m + 1] = g[1];
            for (m = 0; k > m; m += 2) e = s(b, f), f = e.a, g[0] ^= e.key, e = s(b, f), f = e.a, 
            g[1] ^= e.key, g = t(g, 0, c, d), d[m] = g[0], d[m + 1] = g[1];
        }
        function D(b, a, c, d, f) {
            function g() {
                if (f && f(n / c), !(c > n)) {
                    for (n = 0; 64 > n; n++) for (p = 0; k >> 1 > p; p++) t(h, p << 1, m, l);
                    for (e = [], n = 0; k > n; n++) e.push((h[n] >> 24 & 255) >>> 0), e.push((h[n] >> 16 & 255) >>> 0), 
                    e.push((h[n] >> 8 & 255) >>> 0), e.push((255 & h[n]) >>> 0);
                    return d ? void d(null, e) : e;
                }
                for (var e = Date.now(); c > n && (n += 1, C(b, m, l), C(a, m, l), !(100 < Date.now() - e)); ) ;
                d && q(g);
            }
            var e, h = E.slice(), k = h.length;
            if (4 > c || c > 31) {
                if (e = Error("Illegal number of rounds (4-31): " + c), d) return void q(d.bind(this, e));
                throw e;
            }
            if (16 !== a.length) {
                if (e = Error("Illegal salt length: " + a.length + " != 16"), d) return void q(d.bind(this, e));
                throw e;
            }
            c = 1 << c >>> 0;
            var p, m = I.slice(), l = J.slice(), n = 0;
            if (H(a, b, m, l), "undefined" != typeof d) g(); else for (;;) if ("undefined" != typeof (e = g())) return e || [];
        }
        function y(b, a, c, d) {
            function f(c) {
                var a = [];
                return a.push("$2"), g >= "a" && a.push(g), a.push("$"), 10 > k && a.push("0"), 
                a.push(k.toString()), a.push("$"), a.push(v(e, e.length)), a.push(v(c, 4 * E.length - 1)), 
                a.join("");
            }
            if ("string" != typeof b || "string" != typeof a) {
                if (d = Error("Invalid string / salt: Not a string"), c) return void q(c.bind(this, d));
                throw d;
            }
            var g, h;
            if ("$" !== a.charAt(0) || "2" !== a.charAt(1)) {
                if (d = Error("Invalid salt version: " + a.substring(0, 2)), c) return void q(c.bind(this, d));
                throw d;
            }
            if ("$" === a.charAt(2)) g = String.fromCharCode(0), h = 3; else {
                if (g = a.charAt(2), "a" !== g && "b" !== g && "y" !== g || "$" !== a.charAt(3)) {
                    if (d = Error("Invalid salt revision: " + a.substring(2, 4)), c) return void q(c.bind(this, d));
                    throw d;
                }
                h = 4;
            }
            if ("$" < a.charAt(h + 2)) {
                if (d = Error("Missing salt rounds"), c) return void q(c.bind(this, d));
                throw d;
            }
            var k = 10 * parseInt(a.substring(h, h + 1), 10) + parseInt(a.substring(h + 1, h + 2), 10);
            a = a.substring(h + 3, h + 25), b = F(b + (g >= "a" ? "\x00" : ""));
            var e = B(a, 16);
            return "undefined" == typeof c ? f(D(b, e, k)) : void D(b, e, k, function(a, d) {
                a ? c(a, null) : c(null, f(d));
            }, d);
        }
        var l = {}, u = null;
        try {
            z(1);
        } catch (K) {}
        u = null, l.l = function(b) {
            u = b;
        }, l.genSaltSync = function(b, a) {
            if (b = b || 10, "number" != typeof b) throw Error("Illegal arguments: " + typeof b + ", " + typeof a);
            4 > b ? b = 4 : b > 31 && (b = 31);
            var c = [];
            return c.push("$2a$"), 10 > b && c.push("0"), c.push(b.toString()), c.push("$"), 
            c.push(v(z(16), 16)), c.join("");
        }, l.genSalt = function(b, a, c) {
            if ("function" == typeof a && (c = a, a = void 0), "function" == typeof b && (c = b, 
            b = 10), "function" != typeof c) throw Error("Illegal callback: " + typeof c);
            q("number" != typeof b ? c.bind(this, Error("Illegal arguments: " + typeof b)) : function() {
                try {
                    c(null, l.genSaltSync(b));
                } catch (a) {
                    c(a);
                }
            });
        }, l.hashSync = function(b, a) {
            if ("undefined" == typeof a && (a = 10), "number" == typeof a && (a = l.genSaltSync(a)), 
            "string" != typeof b || "string" != typeof a) throw Error("Illegal arguments: " + typeof b + ", " + typeof a);
            return y(b, a);
        }, l.hash = function(b, a, c, d) {
            if ("function" != typeof c) throw Error("Illegal callback: " + typeof c);
            "string" == typeof b && "number" == typeof a ? l.genSalt(a, function(a, g) {
                y(b, g, c, d);
            }) : "string" == typeof b && "string" == typeof a ? y(b, a, c, d) : q(c.bind(this, Error("Illegal arguments: " + typeof b + ", " + typeof a)));
        }, l.compareSync = function(b, a) {
            if ("string" != typeof b || "string" != typeof a) throw Error("Illegal arguments: " + typeof b + ", " + typeof a);
            return 60 !== a.length ? !1 : A(l.hashSync(b, a.substr(0, a.length - 31)), a);
        }, l.compare = function(b, a, c, d) {
            if ("function" != typeof c) throw Error("Illegal callback: " + typeof c);
            "string" != typeof b || "string" != typeof a ? q(c.bind(this, Error("Illegal arguments: " + typeof b + ", " + typeof a))) : 60 !== a.length ? q(c.bind(this, null, !1)) : l.hash(b, a.substr(0, 29), function(d, b) {
                d ? c(d) : c(null, A(b, a));
            }, d);
        }, l.getRounds = function(b) {
            if ("string" != typeof b) throw Error("Illegal arguments: " + typeof b);
            return parseInt(b.split("$")[2], 10);
        }, l.getSalt = function(b) {
            if ("string" != typeof b) throw Error("Illegal arguments: " + typeof b);
            if (60 !== b.length) throw Error("Illegal hash length: " + b.length + " != 60");
            return b.substring(0, 29);
        };
        var q = "undefined" != typeof process && process && "function" == typeof process.nextTick ? "function" == typeof setImmediate ? setImmediate : process.nextTick : setTimeout, r = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), p = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1 ], x = String.fromCharCode, G = function() {
            var b = {
                h: 1114111,
                g: function(a, c) {
                    var d = null;
                    for ("number" == typeof a && (d = a, a = function() {
                        return null;
                    }); null !== d || null !== (d = a()); ) 128 > d ? c(127 & d) : (2048 > d ? c(d >> 6 & 31 | 192) : (65536 > d ? c(d >> 12 & 15 | 224) : (c(d >> 18 & 7 | 240), 
                    c(d >> 12 & 63 | 128)), c(d >> 6 & 63 | 128)), c(63 & d | 128)), d = null;
                },
                e: function(a, c) {
                    function d(a) {
                        a = a.slice(0, a.indexOf(null));
                        var c = Error(a.toString());
                        throw c.name = "TruncatedError", c.bytes = a, c;
                    }
                    for (var b, g, h, k; null !== (b = a()); ) if (0 === (128 & b)) c(b); else if (192 === (224 & b)) null === (g = a()) && d([ b, g ]), 
                    c((31 & b) << 6 | 63 & g); else if (224 === (240 & b)) null !== (g = a()) && null !== (h = a()) || d([ b, g, h ]), 
                    c((15 & b) << 12 | (63 & g) << 6 | 63 & h); else {
                        if (240 !== (248 & b)) throw RangeError("Illegal starting byte: " + b);
                        null !== (g = a()) && null !== (h = a()) && null !== (k = a()) || d([ b, g, h, k ]), 
                        c((7 & b) << 18 | (63 & g) << 12 | (63 & h) << 6 | 63 & k);
                    }
                },
                b: function(a, c) {
                    for (var d, b = null; null !== (d = null !== b ? b : a()); ) d >= 55296 && 57343 >= d && null !== (b = a()) && b >= 56320 && 57343 >= b ? (c(1024 * (d - 55296) + b - 56320 + 65536), 
                    b = null) : c(d);
                    null !== b && c(b);
                },
                d: function(a, c) {
                    var b = null;
                    for ("number" == typeof a && (b = a, a = function() {
                        return null;
                    }); null !== b || null !== (b = a()); ) 65535 >= b ? c(b) : (b -= 65536, c((b >> 10) + 55296), 
                    c(b % 1024 + 56320)), b = null;
                },
                f: function(a, c) {
                    b.b(a, function(a) {
                        b.g(a, c);
                    });
                },
                k: function(a, c) {
                    b.e(a, function(a) {
                        b.d(a, c);
                    });
                },
                c: function(a) {
                    return 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4;
                },
                j: function(a) {
                    for (var c, d = 0; null !== (c = a()); ) d += b.c(c);
                    return d;
                },
                i: function(a) {
                    var c = 0, d = 0;
                    return b.b(a, function(a) {
                        ++c, d += b.c(a);
                    }), [ c, d ];
                }
            };
            return b;
        }();
        Date.now = Date.now || function() {
            return +new Date();
        };
        var I = [ 608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731 ], J = [ 3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946, 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055, 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504, 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462 ], E = [ 1332899944, 1700884034, 1701343084, 1684370003, 1668446532, 1869963892 ];
        return l.encodeBase64 = v, l.decodeBase64 = B, l;
    }
    "function" == typeof define && define.amd ? define([], w) : "function" == typeof require && "object" == typeof module && module && module.exports ? module.exports = w() : (this.dcodeIO = this.dcodeIO || {}).bcrypt = w();
}(), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
}(jQuery), +function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {
            end: b[c]
        };
        return !1;
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0;
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
        });
    }
    var c = '[data-dismiss="alert"]', d = function(b) {
        a(b).on("click", c, this.close);
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove();
        }
        var e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), 
        b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
        });
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };
    c.VERSION = "3.3.6", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, 
            d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
        }, this), 0);
    }, c.prototype.toggle = function() {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), 
            this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), 
            a && c.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b), g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = c, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            a.preventDefault();
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), 
        this;
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b), d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1, f = (c + e) % this.$items.length;
        return this.$items.eq(f);
    }, c.prototype.to = function(a) {
        var b = this, c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a);
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"), f = d || this.getItemForDirection(b, e), g = this.interval, h = "next" == b ? "left" : "right", i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0], k = a.Event("slide.bs.carousel", {
            relatedTarget: j,
            direction: h
        });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active");
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), 
            f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([ b, h ].join(" ")).addClass("active"), e.removeClass([ "active", h ].join(" ")), 
                i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m);
                }, 0);
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), 
            this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this;
    };
    var e = function(c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), 
    a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d);
    }
    function c(b) {
        return this.each(function() {
            var c = a(this), e = c.data("bs.collapse"), f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), 
            "string" == typeof b && e[b]();
        });
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, 
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase([ "scroll", g ].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e);
        }, this)).end();
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e), g = f.data("bs.collapse"), h = g ? "toggle" : e.data();
        c.call(f, h);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this), e = b(d), f = {
                relatedTarget: this
            };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), 
            c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
        }));
    }
    function d(b) {
        return this.each(function() {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
        });
    }
    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    g.VERSION = "3.3.6", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e), g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
            }
            return !1;
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d), g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), 
                d.trigger("click");
                var h = " li:not(.disabled):visible a", i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), 
                    i.eq(j).trigger("focus");
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function(a) {
    "use strict";
    function b(b, d) {
        return this.each(function() {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
        });
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), 
        this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, 
        this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, 
    c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function(b) {
        var d = this, e = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), 
            d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f);
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
        }));
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), 
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
        }, this));
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
        });
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function(b) {
        var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b();
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
        } else b && b();
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        });
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")), g = f.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(e) && e
        }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus");
            });
        }), b.call(f, g, this);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), 
            "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), 
        this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), 
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, c.prototype.getDelegateOptions = function() {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), 
        c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), 
        c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show());
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState) if (this.inState[a]) return !0;
        return !1;
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), 
        c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide());
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this, f = this.tip(), g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement, i = /\s?auto?\s?/i, j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(), l = f[0].offsetWidth, m = f[0].offsetHeight;
            if (j) {
                var n = h, o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, 
                f.removeClass(n).addClass(h);
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                });
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c), m = l ? 2 * k.left - e + i : 2 * k.top - f + j, n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l);
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), 
            b && b();
        }
        var e = this, f = a(this.$tip), g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), 
        a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), 
        this.hoverState = null, this);
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function() {
        return this.getTitle();
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName, e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
            top: 0,
            left: 0
        } : b.offset(), g = {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        }, h = d ? {
            width: a(window).width(),
            height: a(window).height()
        } : null;
        return a.extend({}, e, g, h, f);
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
        }
        return e;
    }, c.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a;
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.enable = function() {
        this.enabled = !0;
    }, c.prototype.disable = function() {
        this.enabled = !1;
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), 
        a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, 
        c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), 
            a.$tip = null, a.$arrow = null, a.$viewport = null;
        });
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), 
            "string" == typeof b && e[b]());
        });
    }
    var c = function(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, 
    c.prototype.getDefaults = function() {
        return c.DEFAULTS;
    }, c.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), 
        a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), 
        this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function c(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }
    b.VERSION = "3.3.6", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function() {
        var b = this, c = "offset", d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var b = a(this), e = b.data("target") || b.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [ [ f[c]().top + d, e ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1]);
        });
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--; ) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), 
        d.trigger("activate.bs.scrollspy");
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b) {
        this.element = a(b);
    };
    c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"), f = a.Event("hide.bs.tab", {
                relatedTarget: b[0]
            }), g = a.Event("show.bs.tab", {
                relatedTarget: e[0]
            });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    });
                });
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, 
            b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            e && e();
        }
        var g = d.find("> .active"), h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), 
        g.removeClass("in");
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this;
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show");
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(), f = this.$element.offset(), g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed, i = h ? e : f.top, j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(), d = this.options.offset, e = d.top, f = d.bottom, g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), 
            "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""), j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            });
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this;
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), 
            null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
        });
    });
}(jQuery), function(root, factory) {
    "object" == typeof exports ? module.exports = exports = factory() : "function" == typeof define && define.amd ? define([], factory) : root.CryptoJS = factory();
}(this, function() {
    var CryptoJS = CryptoJS || function(Math, undefined) {
        var C = {}, C_lib = C.lib = {}, Base = C_lib.Base = function() {
            function F() {}
            return {
                extend: function(overrides) {
                    F.prototype = this;
                    var subtype = new F();
                    return overrides && subtype.mixIn(overrides), subtype.hasOwnProperty("init") || (subtype.init = function() {
                        subtype.$super.init.apply(this, arguments);
                    }), subtype.init.prototype = subtype, subtype.$super = this, subtype;
                },
                create: function() {
                    var instance = this.extend();
                    return instance.init.apply(instance, arguments), instance;
                },
                init: function() {},
                mixIn: function(properties) {
                    for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);
                    properties.hasOwnProperty("toString") && (this.toString = properties.toString);
                },
                clone: function() {
                    return this.init.prototype.extend(this);
                }
            };
        }(), WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [], sigBytes != undefined ? this.sigBytes = sigBytes : this.sigBytes = 4 * words.length;
            },
            toString: function(encoder) {
                return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
                var thisWords = this.words, thatWords = wordArray.words, thisSigBytes = this.sigBytes, thatSigBytes = wordArray.sigBytes;
                if (this.clamp(), thisSigBytes % 4) for (var i = 0; thatSigBytes > i; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                } else for (var i = 0; thatSigBytes > i; i += 4) thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
                return this.sigBytes += thatSigBytes, this;
            },
            clamp: function() {
                var words = this.words, sigBytes = this.sigBytes;
                words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8, words.length = Math.ceil(sigBytes / 4);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                return clone.words = this.words.slice(0), clone;
            },
            random: function(nBytes) {
                for (var rcache, words = [], r = function(m_w) {
                    var m_w = m_w, m_z = 987654321, mask = 4294967295;
                    return function() {
                        m_z = 36969 * (65535 & m_z) + (m_z >> 16) & mask, m_w = 18e3 * (65535 & m_w) + (m_w >> 16) & mask;
                        var result = (m_z << 16) + m_w & mask;
                        return result /= 4294967296, result += .5, result * (Math.random() > .5 ? 1 : -1);
                    };
                }, i = 0; nBytes > i; i += 4) {
                    var _r = r(4294967296 * (rcache || Math.random()));
                    rcache = 987654071 * _r(), words.push(4294967296 * _r() | 0);
                }
                return new WordArray.init(words, nBytes);
            }
        }), C_enc = C.enc = {}, Hex = C_enc.Hex = {
            stringify: function(wordArray) {
                for (var words = wordArray.words, sigBytes = wordArray.sigBytes, hexChars = [], i = 0; sigBytes > i; i++) {
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    hexChars.push((bite >>> 4).toString(16)), hexChars.push((15 & bite).toString(16));
                }
                return hexChars.join("");
            },
            parse: function(hexStr) {
                for (var hexStrLength = hexStr.length, words = [], i = 0; hexStrLength > i; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new WordArray.init(words, hexStrLength / 2);
            }
        }, Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
                for (var words = wordArray.words, sigBytes = wordArray.sigBytes, latin1Chars = [], i = 0; sigBytes > i; i++) {
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join("");
            },
            parse: function(latin1Str) {
                for (var latin1StrLength = latin1Str.length, words = [], i = 0; latin1StrLength > i; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;
                return new WordArray.init(words, latin1StrLength);
            }
        }, Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        }, BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
                this._data = new WordArray.init(), this._nDataBytes = 0;
            },
            _append: function(data) {
                "string" == typeof data && (data = Utf8.parse(data)), this._data.concat(data), this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
                var data = this._data, dataWords = data.words, dataSigBytes = data.sigBytes, blockSize = this.blockSize, blockSizeBytes = 4 * blockSize, nBlocksReady = dataSigBytes / blockSizeBytes;
                nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0);
                var nWordsReady = nBlocksReady * blockSize, nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);
                if (nWordsReady) {
                    for (var offset = 0; nWordsReady > offset; offset += blockSize) this._doProcessBlock(dataWords, offset);
                    var processedWords = dataWords.splice(0, nWordsReady);
                    data.sigBytes -= nBytesReady;
                }
                return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
                var clone = Base.clone.call(this);
                return clone._data = this._data.clone(), clone;
            },
            _minBufferSize: 0
        }), C_algo = (C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg), this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this), this._doReset();
            },
            update: function(messageUpdate) {
                return this._append(messageUpdate), this._process(), this;
            },
            finalize: function(messageUpdate) {
                messageUpdate && this._append(messageUpdate);
                var hash = this._doFinalize();
                return hash;
            },
            blockSize: 16,
            _createHelper: function(hasher) {
                return function(message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },
            _createHmacHelper: function(hasher) {
                return function(message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        }), C.algo = {});
        return C;
    }(Math);
    return function() {
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, C_enc = C.enc;
        C_enc.Base64 = {
            stringify: function(wordArray) {
                var words = wordArray.words, sigBytes = wordArray.sigBytes, map = this._map;
                wordArray.clamp();
                for (var base64Chars = [], i = 0; sigBytes > i; i += 3) for (var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255, byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255, byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, triplet = byte1 << 16 | byte2 << 8 | byte3, j = 0; 4 > j && sigBytes > i + .75 * j; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                var paddingChar = map.charAt(64);
                if (paddingChar) for (;base64Chars.length % 4; ) base64Chars.push(paddingChar);
                return base64Chars.join("");
            },
            parse: function(base64Str) {
                var base64StrLength = base64Str.length, map = this._map, paddingChar = map.charAt(64);
                if (paddingChar) {
                    var paddingIndex = base64Str.indexOf(paddingChar);
                    -1 != paddingIndex && (base64StrLength = paddingIndex);
                }
                for (var words = [], nBytes = 0, i = 0; base64StrLength > i; i++) if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << i % 4 * 2, bits2 = map.indexOf(base64Str.charAt(i)) >>> 6 - i % 4 * 2;
                    words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8, nBytes++;
                }
                return WordArray.create(words, nBytes);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    }(), function(Math) {
        function FF(a, b, c, d, x, s, t) {
            var n = a + (b & c | ~b & d) + x + t;
            return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
            var n = a + (b & d | c & ~d) + x + t;
            return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
            var n = a + (b ^ c ^ d) + x + t;
            return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
            var n = a + (c ^ (b | ~d)) + x + t;
            return (n << s | n >>> 32 - s) + b;
        }
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, Hasher = C_lib.Hasher, C_algo = C.algo, T = [];
        !function() {
            for (var i = 0; 64 > i; i++) T[i] = 4294967296 * Math.abs(Math.sin(i + 1)) | 0;
        }();
        var MD5 = C_algo.MD5 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
            },
            _doProcessBlock: function(M, offset) {
                for (var i = 0; 16 > i; i++) {
                    var offset_i = offset + i, M_offset_i = M[offset_i];
                    M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
                }
                var H = this._hash.words, M_offset_0 = M[offset + 0], M_offset_1 = M[offset + 1], M_offset_2 = M[offset + 2], M_offset_3 = M[offset + 3], M_offset_4 = M[offset + 4], M_offset_5 = M[offset + 5], M_offset_6 = M[offset + 6], M_offset_7 = M[offset + 7], M_offset_8 = M[offset + 8], M_offset_9 = M[offset + 9], M_offset_10 = M[offset + 10], M_offset_11 = M[offset + 11], M_offset_12 = M[offset + 12], M_offset_13 = M[offset + 13], M_offset_14 = M[offset + 14], M_offset_15 = M[offset + 15], a = H[0], b = H[1], c = H[2], d = H[3];
                a = FF(a, b, c, d, M_offset_0, 7, T[0]), d = FF(d, a, b, c, M_offset_1, 12, T[1]), 
                c = FF(c, d, a, b, M_offset_2, 17, T[2]), b = FF(b, c, d, a, M_offset_3, 22, T[3]), 
                a = FF(a, b, c, d, M_offset_4, 7, T[4]), d = FF(d, a, b, c, M_offset_5, 12, T[5]), 
                c = FF(c, d, a, b, M_offset_6, 17, T[6]), b = FF(b, c, d, a, M_offset_7, 22, T[7]), 
                a = FF(a, b, c, d, M_offset_8, 7, T[8]), d = FF(d, a, b, c, M_offset_9, 12, T[9]), 
                c = FF(c, d, a, b, M_offset_10, 17, T[10]), b = FF(b, c, d, a, M_offset_11, 22, T[11]), 
                a = FF(a, b, c, d, M_offset_12, 7, T[12]), d = FF(d, a, b, c, M_offset_13, 12, T[13]), 
                c = FF(c, d, a, b, M_offset_14, 17, T[14]), b = FF(b, c, d, a, M_offset_15, 22, T[15]), 
                a = GG(a, b, c, d, M_offset_1, 5, T[16]), d = GG(d, a, b, c, M_offset_6, 9, T[17]), 
                c = GG(c, d, a, b, M_offset_11, 14, T[18]), b = GG(b, c, d, a, M_offset_0, 20, T[19]), 
                a = GG(a, b, c, d, M_offset_5, 5, T[20]), d = GG(d, a, b, c, M_offset_10, 9, T[21]), 
                c = GG(c, d, a, b, M_offset_15, 14, T[22]), b = GG(b, c, d, a, M_offset_4, 20, T[23]), 
                a = GG(a, b, c, d, M_offset_9, 5, T[24]), d = GG(d, a, b, c, M_offset_14, 9, T[25]), 
                c = GG(c, d, a, b, M_offset_3, 14, T[26]), b = GG(b, c, d, a, M_offset_8, 20, T[27]), 
                a = GG(a, b, c, d, M_offset_13, 5, T[28]), d = GG(d, a, b, c, M_offset_2, 9, T[29]), 
                c = GG(c, d, a, b, M_offset_7, 14, T[30]), b = GG(b, c, d, a, M_offset_12, 20, T[31]), 
                a = HH(a, b, c, d, M_offset_5, 4, T[32]), d = HH(d, a, b, c, M_offset_8, 11, T[33]), 
                c = HH(c, d, a, b, M_offset_11, 16, T[34]), b = HH(b, c, d, a, M_offset_14, 23, T[35]), 
                a = HH(a, b, c, d, M_offset_1, 4, T[36]), d = HH(d, a, b, c, M_offset_4, 11, T[37]), 
                c = HH(c, d, a, b, M_offset_7, 16, T[38]), b = HH(b, c, d, a, M_offset_10, 23, T[39]), 
                a = HH(a, b, c, d, M_offset_13, 4, T[40]), d = HH(d, a, b, c, M_offset_0, 11, T[41]), 
                c = HH(c, d, a, b, M_offset_3, 16, T[42]), b = HH(b, c, d, a, M_offset_6, 23, T[43]), 
                a = HH(a, b, c, d, M_offset_9, 4, T[44]), d = HH(d, a, b, c, M_offset_12, 11, T[45]), 
                c = HH(c, d, a, b, M_offset_15, 16, T[46]), b = HH(b, c, d, a, M_offset_2, 23, T[47]), 
                a = II(a, b, c, d, M_offset_0, 6, T[48]), d = II(d, a, b, c, M_offset_7, 10, T[49]), 
                c = II(c, d, a, b, M_offset_14, 15, T[50]), b = II(b, c, d, a, M_offset_5, 21, T[51]), 
                a = II(a, b, c, d, M_offset_12, 6, T[52]), d = II(d, a, b, c, M_offset_3, 10, T[53]), 
                c = II(c, d, a, b, M_offset_10, 15, T[54]), b = II(b, c, d, a, M_offset_1, 21, T[55]), 
                a = II(a, b, c, d, M_offset_8, 6, T[56]), d = II(d, a, b, c, M_offset_15, 10, T[57]), 
                c = II(c, d, a, b, M_offset_6, 15, T[58]), b = II(b, c, d, a, M_offset_13, 21, T[59]), 
                a = II(a, b, c, d, M_offset_4, 6, T[60]), d = II(d, a, b, c, M_offset_11, 10, T[61]), 
                c = II(c, d, a, b, M_offset_2, 15, T[62]), b = II(b, c, d, a, M_offset_9, 21, T[63]), 
                H[0] = H[0] + a | 0, H[1] = H[1] + b | 0, H[2] = H[2] + c | 0, H[3] = H[3] + d | 0;
            },
            _doFinalize: function() {
                var data = this._data, dataWords = data.words, nBitsTotal = 8 * this._nDataBytes, nBitsLeft = 8 * data.sigBytes;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
                var nBitsTotalH = Math.floor(nBitsTotal / 4294967296), nBitsTotalL = nBitsTotal;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = 16711935 & (nBitsTotalH << 8 | nBitsTotalH >>> 24) | 4278255360 & (nBitsTotalH << 24 | nBitsTotalH >>> 8), 
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = 16711935 & (nBitsTotalL << 8 | nBitsTotalL >>> 24) | 4278255360 & (nBitsTotalL << 24 | nBitsTotalL >>> 8), 
                data.sigBytes = 4 * (dataWords.length + 1), this._process();
                for (var hash = this._hash, H = hash.words, i = 0; 4 > i; i++) {
                    var H_i = H[i];
                    H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
                }
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                return clone._hash = this._hash.clone(), clone;
            }
        });
        C.MD5 = Hasher._createHelper(MD5), C.HmacMD5 = Hasher._createHmacHelper(MD5);
    }(Math), function() {
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, Hasher = C_lib.Hasher, C_algo = C.algo, W = [], SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(M, offset) {
                for (var H = this._hash.words, a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], i = 0; 80 > i; i++) {
                    if (16 > i) W[i] = 0 | M[offset + i]; else {
                        var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                        W[i] = n << 1 | n >>> 31;
                    }
                    var t = (a << 5 | a >>> 27) + e + W[i];
                    t += 20 > i ? (b & c | ~b & d) + 1518500249 : 40 > i ? (b ^ c ^ d) + 1859775393 : 60 > i ? (b & c | b & d | c & d) - 1894007588 : (b ^ c ^ d) - 899497514, 
                    e = d, d = c, c = b << 30 | b >>> 2, b = a, a = t;
                }
                H[0] = H[0] + a | 0, H[1] = H[1] + b | 0, H[2] = H[2] + c | 0, H[3] = H[3] + d | 0, 
                H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
                var data = this._data, dataWords = data.words, nBitsTotal = 8 * this._nDataBytes, nBitsLeft = 8 * data.sigBytes;
                return dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32, dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296), 
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal, data.sigBytes = 4 * dataWords.length, 
                this._process(), this._hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                return clone._hash = this._hash.clone(), clone;
            }
        });
        C.SHA1 = Hasher._createHelper(SHA1), C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    }(), function(Math) {
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, Hasher = C_lib.Hasher, C_algo = C.algo, H = [], K = [];
        !function() {
            function isPrime(n) {
                for (var sqrtN = Math.sqrt(n), factor = 2; sqrtN >= factor; factor++) if (!(n % factor)) return !1;
                return !0;
            }
            function getFractionalBits(n) {
                return 4294967296 * (n - (0 | n)) | 0;
            }
            for (var n = 2, nPrime = 0; 64 > nPrime; ) isPrime(n) && (8 > nPrime && (H[nPrime] = getFractionalBits(Math.pow(n, .5))), 
            K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3)), nPrime++), n++;
        }();
        var W = [], SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
                for (var H = this._hash.words, a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7], i = 0; 64 > i; i++) {
                    if (16 > i) W[i] = 0 | M[offset + i]; else {
                        var gamma0x = W[i - 15], gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3, gamma1x = W[i - 2], gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                    }
                    var ch = e & f ^ ~e & g, maj = a & b ^ a & c ^ b & c, sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22), sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25), t1 = h + sigma1 + ch + K[i] + W[i], t2 = sigma0 + maj;
                    h = g, g = f, f = e, e = d + t1 | 0, d = c, c = b, b = a, a = t1 + t2 | 0;
                }
                H[0] = H[0] + a | 0, H[1] = H[1] + b | 0, H[2] = H[2] + c | 0, H[3] = H[3] + d | 0, 
                H[4] = H[4] + e | 0, H[5] = H[5] + f | 0, H[6] = H[6] + g | 0, H[7] = H[7] + h | 0;
            },
            _doFinalize: function() {
                var data = this._data, dataWords = data.words, nBitsTotal = 8 * this._nDataBytes, nBitsLeft = 8 * data.sigBytes;
                return dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32, dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296), 
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal, data.sigBytes = 4 * dataWords.length, 
                this._process(), this._hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                return clone._hash = this._hash.clone(), clone;
            }
        });
        C.SHA256 = Hasher._createHelper(SHA256), C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
    }(Math), function() {
        function swapEndian(word) {
            return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, C_enc = C.enc;
        C_enc.Utf16 = C_enc.Utf16BE = {
            stringify: function(wordArray) {
                for (var words = wordArray.words, sigBytes = wordArray.sigBytes, utf16Chars = [], i = 0; sigBytes > i; i += 2) {
                    var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
                    utf16Chars.push(String.fromCharCode(codePoint));
                }
                return utf16Chars.join("");
            },
            parse: function(utf16Str) {
                for (var utf16StrLength = utf16Str.length, words = [], i = 0; utf16StrLength > i; i++) words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
                return WordArray.create(words, 2 * utf16StrLength);
            }
        };
        C_enc.Utf16LE = {
            stringify: function(wordArray) {
                for (var words = wordArray.words, sigBytes = wordArray.sigBytes, utf16Chars = [], i = 0; sigBytes > i; i += 2) {
                    var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
                    utf16Chars.push(String.fromCharCode(codePoint));
                }
                return utf16Chars.join("");
            },
            parse: function(utf16Str) {
                for (var utf16StrLength = utf16Str.length, words = [], i = 0; utf16StrLength > i; i++) words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
                return WordArray.create(words, 2 * utf16StrLength);
            }
        };
    }(), function() {
        if ("function" == typeof ArrayBuffer) {
            var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, superInit = WordArray.init, subInit = WordArray.init = function(typedArray) {
                if (typedArray instanceof ArrayBuffer && (typedArray = new Uint8Array(typedArray)), 
                (typedArray instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) && (typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength)), 
                typedArray instanceof Uint8Array) {
                    for (var typedArrayByteLength = typedArray.byteLength, words = [], i = 0; typedArrayByteLength > i; i++) words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
                    superInit.call(this, words, typedArrayByteLength);
                } else superInit.apply(this, arguments);
            };
            subInit.prototype = WordArray;
        }
    }(), function(Math) {
        function f1(x, y, z) {
            return x ^ y ^ z;
        }
        function f2(x, y, z) {
            return x & y | ~x & z;
        }
        function f3(x, y, z) {
            return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
            return x & z | y & ~z;
        }
        function f5(x, y, z) {
            return x ^ (y | ~z);
        }
        function rotl(x, n) {
            return x << n | x >>> 32 - n;
        }
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, Hasher = C_lib.Hasher, C_algo = C.algo, _zl = WordArray.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]), _zr = WordArray.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]), _sl = WordArray.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]), _sr = WordArray.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]), _hl = WordArray.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]), _hr = WordArray.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]), RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
            _doReset: function() {
                this._hash = WordArray.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
            },
            _doProcessBlock: function(M, offset) {
                for (var i = 0; 16 > i; i++) {
                    var offset_i = offset + i, M_offset_i = M[offset_i];
                    M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
                }
                var al, bl, cl, dl, el, ar, br, cr, dr, er, H = this._hash.words, hl = _hl.words, hr = _hr.words, zl = _zl.words, zr = _zr.words, sl = _sl.words, sr = _sr.words;
                ar = al = H[0], br = bl = H[1], cr = cl = H[2], dr = dl = H[3], er = el = H[4];
                for (var t, i = 0; 80 > i; i += 1) t = al + M[offset + zl[i]] | 0, t += 16 > i ? f1(bl, cl, dl) + hl[0] : 32 > i ? f2(bl, cl, dl) + hl[1] : 48 > i ? f3(bl, cl, dl) + hl[2] : 64 > i ? f4(bl, cl, dl) + hl[3] : f5(bl, cl, dl) + hl[4], 
                t = 0 | t, t = rotl(t, sl[i]), t = t + el | 0, al = el, el = dl, dl = rotl(cl, 10), 
                cl = bl, bl = t, t = ar + M[offset + zr[i]] | 0, t += 16 > i ? f5(br, cr, dr) + hr[0] : 32 > i ? f4(br, cr, dr) + hr[1] : 48 > i ? f3(br, cr, dr) + hr[2] : 64 > i ? f2(br, cr, dr) + hr[3] : f1(br, cr, dr) + hr[4], 
                t = 0 | t, t = rotl(t, sr[i]), t = t + er | 0, ar = er, er = dr, dr = rotl(cr, 10), 
                cr = br, br = t;
                t = H[1] + cl + dr | 0, H[1] = H[2] + dl + er | 0, H[2] = H[3] + el + ar | 0, H[3] = H[4] + al + br | 0, 
                H[4] = H[0] + bl + cr | 0, H[0] = t;
            },
            _doFinalize: function() {
                var data = this._data, dataWords = data.words, nBitsTotal = 8 * this._nDataBytes, nBitsLeft = 8 * data.sigBytes;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32, dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = 16711935 & (nBitsTotal << 8 | nBitsTotal >>> 24) | 4278255360 & (nBitsTotal << 24 | nBitsTotal >>> 8), 
                data.sigBytes = 4 * (dataWords.length + 1), this._process();
                for (var hash = this._hash, H = hash.words, i = 0; 5 > i; i++) {
                    var H_i = H[i];
                    H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
                }
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                return clone._hash = this._hash.clone(), clone;
            }
        });
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160), C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
    }(Math), function() {
        var C = CryptoJS, C_lib = C.lib, Base = C_lib.Base, C_enc = C.enc, Utf8 = C_enc.Utf8, C_algo = C.algo;
        C_algo.HMAC = Base.extend({
            init: function(hasher, key) {
                hasher = this._hasher = new hasher.init(), "string" == typeof key && (key = Utf8.parse(key));
                var hasherBlockSize = hasher.blockSize, hasherBlockSizeBytes = 4 * hasherBlockSize;
                key.sigBytes > hasherBlockSizeBytes && (key = hasher.finalize(key)), key.clamp();
                for (var oKey = this._oKey = key.clone(), iKey = this._iKey = key.clone(), oKeyWords = oKey.words, iKeyWords = iKey.words, i = 0; hasherBlockSize > i; i++) oKeyWords[i] ^= 1549556828, 
                iKeyWords[i] ^= 909522486;
                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes, this.reset();
            },
            reset: function() {
                var hasher = this._hasher;
                hasher.reset(), hasher.update(this._iKey);
            },
            update: function(messageUpdate) {
                return this._hasher.update(messageUpdate), this;
            },
            finalize: function(messageUpdate) {
                var hasher = this._hasher, innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
                return hmac;
            }
        });
    }(), function() {
        var C = CryptoJS, C_lib = C.lib, Base = C_lib.Base, WordArray = C_lib.WordArray, C_algo = C.algo, SHA1 = C_algo.SHA1, HMAC = C_algo.HMAC, PBKDF2 = C_algo.PBKDF2 = Base.extend({
            cfg: Base.extend({
                keySize: 4,
                hasher: SHA1,
                iterations: 1
            }),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
                for (var cfg = this.cfg, hmac = HMAC.create(cfg.hasher, password), derivedKey = WordArray.create(), blockIndex = WordArray.create([ 1 ]), derivedKeyWords = derivedKey.words, blockIndexWords = blockIndex.words, keySize = cfg.keySize, iterations = cfg.iterations; derivedKeyWords.length < keySize; ) {
                    var block = hmac.update(salt).finalize(blockIndex);
                    hmac.reset();
                    for (var blockWords = block.words, blockWordsLength = blockWords.length, intermediate = block, i = 1; iterations > i; i++) {
                        intermediate = hmac.finalize(intermediate), hmac.reset();
                        for (var intermediateWords = intermediate.words, j = 0; blockWordsLength > j; j++) blockWords[j] ^= intermediateWords[j];
                    }
                    derivedKey.concat(block), blockIndexWords[0]++;
                }
                return derivedKey.sigBytes = 4 * keySize, derivedKey;
            }
        });
        C.PBKDF2 = function(password, salt, cfg) {
            return PBKDF2.create(cfg).compute(password, salt);
        };
    }(), function() {
        var C = CryptoJS, C_lib = C.lib, Base = C_lib.Base, WordArray = C_lib.WordArray, C_algo = C.algo, MD5 = C_algo.MD5, EvpKDF = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
                keySize: 4,
                hasher: MD5,
                iterations: 1
            }),
            init: function(cfg) {
                this.cfg = this.cfg.extend(cfg);
            },
            compute: function(password, salt) {
                for (var cfg = this.cfg, hasher = cfg.hasher.create(), derivedKey = WordArray.create(), derivedKeyWords = derivedKey.words, keySize = cfg.keySize, iterations = cfg.iterations; derivedKeyWords.length < keySize; ) {
                    block && hasher.update(block);
                    var block = hasher.update(password).finalize(salt);
                    hasher.reset();
                    for (var i = 1; iterations > i; i++) block = hasher.finalize(block), hasher.reset();
                    derivedKey.concat(block);
                }
                return derivedKey.sigBytes = 4 * keySize, derivedKey;
            }
        });
        C.EvpKDF = function(password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
        };
    }(), function() {
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, C_algo = C.algo, SHA256 = C_algo.SHA256, SHA224 = C_algo.SHA224 = SHA256.extend({
            _doReset: function() {
                this._hash = new WordArray.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
            },
            _doFinalize: function() {
                var hash = SHA256._doFinalize.call(this);
                return hash.sigBytes -= 4, hash;
            }
        });
        C.SHA224 = SHA256._createHelper(SHA224), C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
    }(), function(undefined) {
        var C = CryptoJS, C_lib = C.lib, Base = C_lib.Base, X32WordArray = C_lib.WordArray, C_x64 = C.x64 = {};
        C_x64.Word = Base.extend({
            init: function(high, low) {
                this.high = high, this.low = low;
            }
        }), C_x64.WordArray = Base.extend({
            init: function(words, sigBytes) {
                words = this.words = words || [], sigBytes != undefined ? this.sigBytes = sigBytes : this.sigBytes = 8 * words.length;
            },
            toX32: function() {
                for (var x64Words = this.words, x64WordsLength = x64Words.length, x32Words = [], i = 0; x64WordsLength > i; i++) {
                    var x64Word = x64Words[i];
                    x32Words.push(x64Word.high), x32Words.push(x64Word.low);
                }
                return X32WordArray.create(x32Words, this.sigBytes);
            },
            clone: function() {
                for (var clone = Base.clone.call(this), words = clone.words = this.words.slice(0), wordsLength = words.length, i = 0; wordsLength > i; i++) words[i] = words[i].clone();
                return clone;
            }
        });
    }(), function(Math) {
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, Hasher = C_lib.Hasher, C_x64 = C.x64, X64Word = C_x64.Word, C_algo = C.algo, RHO_OFFSETS = [], PI_INDEXES = [], ROUND_CONSTANTS = [];
        !function() {
            for (var x = 1, y = 0, t = 0; 24 > t; t++) {
                RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
                var newX = y % 5, newY = (2 * x + 3 * y) % 5;
                x = newX, y = newY;
            }
            for (var x = 0; 5 > x; x++) for (var y = 0; 5 > y; y++) PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
            for (var LFSR = 1, i = 0; 24 > i; i++) {
                for (var roundConstantMsw = 0, roundConstantLsw = 0, j = 0; 7 > j; j++) {
                    if (1 & LFSR) {
                        var bitPosition = (1 << j) - 1;
                        32 > bitPosition ? roundConstantLsw ^= 1 << bitPosition : roundConstantMsw ^= 1 << bitPosition - 32;
                    }
                    128 & LFSR ? LFSR = LFSR << 1 ^ 113 : LFSR <<= 1;
                }
                ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
            }
        }();
        var T = [];
        !function() {
            for (var i = 0; 25 > i; i++) T[i] = X64Word.create();
        }();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
            cfg: Hasher.cfg.extend({
                outputLength: 512
            }),
            _doReset: function() {
                for (var state = this._state = [], i = 0; 25 > i; i++) state[i] = new X64Word.init();
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
            },
            _doProcessBlock: function(M, offset) {
                for (var state = this._state, nBlockSizeLanes = this.blockSize / 2, i = 0; nBlockSizeLanes > i; i++) {
                    var M2i = M[offset + 2 * i], M2i1 = M[offset + 2 * i + 1];
                    M2i = 16711935 & (M2i << 8 | M2i >>> 24) | 4278255360 & (M2i << 24 | M2i >>> 8), 
                    M2i1 = 16711935 & (M2i1 << 8 | M2i1 >>> 24) | 4278255360 & (M2i1 << 24 | M2i1 >>> 8);
                    var lane = state[i];
                    lane.high ^= M2i1, lane.low ^= M2i;
                }
                for (var round = 0; 24 > round; round++) {
                    for (var x = 0; 5 > x; x++) {
                        for (var tMsw = 0, tLsw = 0, y = 0; 5 > y; y++) {
                            var lane = state[x + 5 * y];
                            tMsw ^= lane.high, tLsw ^= lane.low;
                        }
                        var Tx = T[x];
                        Tx.high = tMsw, Tx.low = tLsw;
                    }
                    for (var x = 0; 5 > x; x++) for (var Tx4 = T[(x + 4) % 5], Tx1 = T[(x + 1) % 5], Tx1Msw = Tx1.high, Tx1Lsw = Tx1.low, tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31), tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31), y = 0; 5 > y; y++) {
                        var lane = state[x + 5 * y];
                        lane.high ^= tMsw, lane.low ^= tLsw;
                    }
                    for (var laneIndex = 1; 25 > laneIndex; laneIndex++) {
                        var lane = state[laneIndex], laneMsw = lane.high, laneLsw = lane.low, rhoOffset = RHO_OFFSETS[laneIndex];
                        if (32 > rhoOffset) var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset, tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset; else var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset, tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                        var TPiLane = T[PI_INDEXES[laneIndex]];
                        TPiLane.high = tMsw, TPiLane.low = tLsw;
                    }
                    var T0 = T[0], state0 = state[0];
                    T0.high = state0.high, T0.low = state0.low;
                    for (var x = 0; 5 > x; x++) for (var y = 0; 5 > y; y++) {
                        var laneIndex = x + 5 * y, lane = state[laneIndex], TLane = T[laneIndex], Tx1Lane = T[(x + 1) % 5 + 5 * y], Tx2Lane = T[(x + 2) % 5 + 5 * y];
                        lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high, lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
                    }
                    var lane = state[0], roundConstant = ROUND_CONSTANTS[round];
                    lane.high ^= roundConstant.high, lane.low ^= roundConstant.low;
                }
            },
            _doFinalize: function() {
                var data = this._data, dataWords = data.words, nBitsLeft = (8 * this._nDataBytes, 
                8 * data.sigBytes), blockSizeBits = 32 * this.blockSize;
                dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32, dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128, 
                data.sigBytes = 4 * dataWords.length, this._process();
                for (var state = this._state, outputLengthBytes = this.cfg.outputLength / 8, outputLengthLanes = outputLengthBytes / 8, hashWords = [], i = 0; outputLengthLanes > i; i++) {
                    var lane = state[i], laneMsw = lane.high, laneLsw = lane.low;
                    laneMsw = 16711935 & (laneMsw << 8 | laneMsw >>> 24) | 4278255360 & (laneMsw << 24 | laneMsw >>> 8), 
                    laneLsw = 16711935 & (laneLsw << 8 | laneLsw >>> 24) | 4278255360 & (laneLsw << 24 | laneLsw >>> 8), 
                    hashWords.push(laneLsw), hashWords.push(laneMsw);
                }
                return new WordArray.init(hashWords, outputLengthBytes);
            },
            clone: function() {
                for (var clone = Hasher.clone.call(this), state = clone._state = this._state.slice(0), i = 0; 25 > i; i++) state[i] = state[i].clone();
                return clone;
            }
        });
        C.SHA3 = Hasher._createHelper(SHA3), C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
    }(Math), function() {
        function X64Word_create() {
            return X64Word.create.apply(X64Word, arguments);
        }
        var C = CryptoJS, C_lib = C.lib, Hasher = C_lib.Hasher, C_x64 = C.x64, X64Word = C_x64.Word, X64WordArray = C_x64.WordArray, C_algo = C.algo, K = [ X64Word_create(1116352408, 3609767458), X64Word_create(1899447441, 602891725), X64Word_create(3049323471, 3964484399), X64Word_create(3921009573, 2173295548), X64Word_create(961987163, 4081628472), X64Word_create(1508970993, 3053834265), X64Word_create(2453635748, 2937671579), X64Word_create(2870763221, 3664609560), X64Word_create(3624381080, 2734883394), X64Word_create(310598401, 1164996542), X64Word_create(607225278, 1323610764), X64Word_create(1426881987, 3590304994), X64Word_create(1925078388, 4068182383), X64Word_create(2162078206, 991336113), X64Word_create(2614888103, 633803317), X64Word_create(3248222580, 3479774868), X64Word_create(3835390401, 2666613458), X64Word_create(4022224774, 944711139), X64Word_create(264347078, 2341262773), X64Word_create(604807628, 2007800933), X64Word_create(770255983, 1495990901), X64Word_create(1249150122, 1856431235), X64Word_create(1555081692, 3175218132), X64Word_create(1996064986, 2198950837), X64Word_create(2554220882, 3999719339), X64Word_create(2821834349, 766784016), X64Word_create(2952996808, 2566594879), X64Word_create(3210313671, 3203337956), X64Word_create(3336571891, 1034457026), X64Word_create(3584528711, 2466948901), X64Word_create(113926993, 3758326383), X64Word_create(338241895, 168717936), X64Word_create(666307205, 1188179964), X64Word_create(773529912, 1546045734), X64Word_create(1294757372, 1522805485), X64Word_create(1396182291, 2643833823), X64Word_create(1695183700, 2343527390), X64Word_create(1986661051, 1014477480), X64Word_create(2177026350, 1206759142), X64Word_create(2456956037, 344077627), X64Word_create(2730485921, 1290863460), X64Word_create(2820302411, 3158454273), X64Word_create(3259730800, 3505952657), X64Word_create(3345764771, 106217008), X64Word_create(3516065817, 3606008344), X64Word_create(3600352804, 1432725776), X64Word_create(4094571909, 1467031594), X64Word_create(275423344, 851169720), X64Word_create(430227734, 3100823752), X64Word_create(506948616, 1363258195), X64Word_create(659060556, 3750685593), X64Word_create(883997877, 3785050280), X64Word_create(958139571, 3318307427), X64Word_create(1322822218, 3812723403), X64Word_create(1537002063, 2003034995), X64Word_create(1747873779, 3602036899), X64Word_create(1955562222, 1575990012), X64Word_create(2024104815, 1125592928), X64Word_create(2227730452, 2716904306), X64Word_create(2361852424, 442776044), X64Word_create(2428436474, 593698344), X64Word_create(2756734187, 3733110249), X64Word_create(3204031479, 2999351573), X64Word_create(3329325298, 3815920427), X64Word_create(3391569614, 3928383900), X64Word_create(3515267271, 566280711), X64Word_create(3940187606, 3454069534), X64Word_create(4118630271, 4000239992), X64Word_create(116418474, 1914138554), X64Word_create(174292421, 2731055270), X64Word_create(289380356, 3203993006), X64Word_create(460393269, 320620315), X64Word_create(685471733, 587496836), X64Word_create(852142971, 1086792851), X64Word_create(1017036298, 365543100), X64Word_create(1126000580, 2618297676), X64Word_create(1288033470, 3409855158), X64Word_create(1501505948, 4234509866), X64Word_create(1607167915, 987167468), X64Word_create(1816402316, 1246189591) ], W = [];
        !function() {
            for (var i = 0; 80 > i; i++) W[i] = X64Word_create();
        }();
        var SHA512 = C_algo.SHA512 = Hasher.extend({
            _doReset: function() {
                this._hash = new X64WordArray.init([ new X64Word.init(1779033703, 4089235720), new X64Word.init(3144134277, 2227873595), new X64Word.init(1013904242, 4271175723), new X64Word.init(2773480762, 1595750129), new X64Word.init(1359893119, 2917565137), new X64Word.init(2600822924, 725511199), new X64Word.init(528734635, 4215389547), new X64Word.init(1541459225, 327033209) ]);
            },
            _doProcessBlock: function(M, offset) {
                for (var H = this._hash.words, H0 = H[0], H1 = H[1], H2 = H[2], H3 = H[3], H4 = H[4], H5 = H[5], H6 = H[6], H7 = H[7], H0h = H0.high, H0l = H0.low, H1h = H1.high, H1l = H1.low, H2h = H2.high, H2l = H2.low, H3h = H3.high, H3l = H3.low, H4h = H4.high, H4l = H4.low, H5h = H5.high, H5l = H5.low, H6h = H6.high, H6l = H6.low, H7h = H7.high, H7l = H7.low, ah = H0h, al = H0l, bh = H1h, bl = H1l, ch = H2h, cl = H2l, dh = H3h, dl = H3l, eh = H4h, el = H4l, fh = H5h, fl = H5l, gh = H6h, gl = H6l, hh = H7h, hl = H7l, i = 0; 80 > i; i++) {
                    var Wi = W[i];
                    if (16 > i) var Wih = Wi.high = 0 | M[offset + 2 * i], Wil = Wi.low = 0 | M[offset + 2 * i + 1]; else {
                        var gamma0x = W[i - 15], gamma0xh = gamma0x.high, gamma0xl = gamma0x.low, gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7, gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25), gamma1x = W[i - 2], gamma1xh = gamma1x.high, gamma1xl = gamma1x.low, gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6, gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26), Wi7 = W[i - 7], Wi7h = Wi7.high, Wi7l = Wi7.low, Wi16 = W[i - 16], Wi16h = Wi16.high, Wi16l = Wi16.low, Wil = gamma0l + Wi7l, Wih = gamma0h + Wi7h + (gamma0l >>> 0 > Wil >>> 0 ? 1 : 0), Wil = Wil + gamma1l, Wih = Wih + gamma1h + (gamma1l >>> 0 > Wil >>> 0 ? 1 : 0), Wil = Wil + Wi16l, Wih = Wih + Wi16h + (Wi16l >>> 0 > Wil >>> 0 ? 1 : 0);
                        Wi.high = Wih, Wi.low = Wil;
                    }
                    var chh = eh & fh ^ ~eh & gh, chl = el & fl ^ ~el & gl, majh = ah & bh ^ ah & ch ^ bh & ch, majl = al & bl ^ al & cl ^ bl & cl, sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7), sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7), sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9), sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9), Ki = K[i], Kih = Ki.high, Kil = Ki.low, t1l = hl + sigma1l, t1h = hh + sigma1h + (hl >>> 0 > t1l >>> 0 ? 1 : 0), t1l = t1l + chl, t1h = t1h + chh + (chl >>> 0 > t1l >>> 0 ? 1 : 0), t1l = t1l + Kil, t1h = t1h + Kih + (Kil >>> 0 > t1l >>> 0 ? 1 : 0), t1l = t1l + Wil, t1h = t1h + Wih + (Wil >>> 0 > t1l >>> 0 ? 1 : 0), t2l = sigma0l + majl, t2h = sigma0h + majh + (sigma0l >>> 0 > t2l >>> 0 ? 1 : 0);
                    hh = gh, hl = gl, gh = fh, gl = fl, fh = eh, fl = el, el = dl + t1l | 0, eh = dh + t1h + (dl >>> 0 > el >>> 0 ? 1 : 0) | 0, 
                    dh = ch, dl = cl, ch = bh, cl = bl, bh = ah, bl = al, al = t1l + t2l | 0, ah = t1h + t2h + (t1l >>> 0 > al >>> 0 ? 1 : 0) | 0;
                }
                H0l = H0.low = H0l + al, H0.high = H0h + ah + (al >>> 0 > H0l >>> 0 ? 1 : 0), H1l = H1.low = H1l + bl, 
                H1.high = H1h + bh + (bl >>> 0 > H1l >>> 0 ? 1 : 0), H2l = H2.low = H2l + cl, H2.high = H2h + ch + (cl >>> 0 > H2l >>> 0 ? 1 : 0), 
                H3l = H3.low = H3l + dl, H3.high = H3h + dh + (dl >>> 0 > H3l >>> 0 ? 1 : 0), H4l = H4.low = H4l + el, 
                H4.high = H4h + eh + (el >>> 0 > H4l >>> 0 ? 1 : 0), H5l = H5.low = H5l + fl, H5.high = H5h + fh + (fl >>> 0 > H5l >>> 0 ? 1 : 0), 
                H6l = H6.low = H6l + gl, H6.high = H6h + gh + (gl >>> 0 > H6l >>> 0 ? 1 : 0), H7l = H7.low = H7l + hl, 
                H7.high = H7h + hh + (hl >>> 0 > H7l >>> 0 ? 1 : 0);
            },
            _doFinalize: function() {
                var data = this._data, dataWords = data.words, nBitsTotal = 8 * this._nDataBytes, nBitsLeft = 8 * data.sigBytes;
                dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32, dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296), 
                dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal, data.sigBytes = 4 * dataWords.length, 
                this._process();
                var hash = this._hash.toX32();
                return hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                return clone._hash = this._hash.clone(), clone;
            },
            blockSize: 32
        });
        C.SHA512 = Hasher._createHelper(SHA512), C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
    }(), function() {
        var C = CryptoJS, C_x64 = C.x64, X64Word = C_x64.Word, X64WordArray = C_x64.WordArray, C_algo = C.algo, SHA512 = C_algo.SHA512, SHA384 = C_algo.SHA384 = SHA512.extend({
            _doReset: function() {
                this._hash = new X64WordArray.init([ new X64Word.init(3418070365, 3238371032), new X64Word.init(1654270250, 914150663), new X64Word.init(2438529370, 812702999), new X64Word.init(355462360, 4144912697), new X64Word.init(1731405415, 4290775857), new X64Word.init(2394180231, 1750603025), new X64Word.init(3675008525, 1694076839), new X64Word.init(1203062813, 3204075428) ]);
            },
            _doFinalize: function() {
                var hash = SHA512._doFinalize.call(this);
                return hash.sigBytes -= 16, hash;
            }
        });
        C.SHA384 = SHA512._createHelper(SHA384), C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
    }(), CryptoJS.lib.Cipher || function(undefined) {
        var C = CryptoJS, C_lib = C.lib, Base = C_lib.Base, WordArray = C_lib.WordArray, BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm, C_enc = C.enc, Base64 = (C_enc.Utf8, 
        C_enc.Base64), C_algo = C.algo, EvpKDF = C_algo.EvpKDF, Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            createEncryptor: function(key, cfg) {
                return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            createDecryptor: function(key, cfg) {
                return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            init: function(xformMode, key, cfg) {
                this.cfg = this.cfg.extend(cfg), this._xformMode = xformMode, this._key = key, this.reset();
            },
            reset: function() {
                BufferedBlockAlgorithm.reset.call(this), this._doReset();
            },
            process: function(dataUpdate) {
                return this._append(dataUpdate), this._process();
            },
            finalize: function(dataUpdate) {
                dataUpdate && this._append(dataUpdate);
                var finalProcessedData = this._doFinalize();
                return finalProcessedData;
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function() {
                function selectCipherStrategy(key) {
                    return "string" == typeof key ? PasswordBasedCipher : SerializableCipher;
                }
                return function(cipher) {
                    return {
                        encrypt: function(message, key, cfg) {
                            return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                        },
                        decrypt: function(ciphertext, key, cfg) {
                            return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                        }
                    };
                };
            }()
        }), C_mode = (C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function() {
                var finalProcessedBlocks = this._process(!0);
                return finalProcessedBlocks;
            },
            blockSize: 1
        }), C.mode = {}), BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            createEncryptor: function(cipher, iv) {
                return this.Encryptor.create(cipher, iv);
            },
            createDecryptor: function(cipher, iv) {
                return this.Decryptor.create(cipher, iv);
            },
            init: function(cipher, iv) {
                this._cipher = cipher, this._iv = iv;
            }
        }), CBC = C_mode.CBC = function() {
            function xorBlock(words, offset, blockSize) {
                var iv = this._iv;
                if (iv) {
                    var block = iv;
                    this._iv = undefined;
                } else var block = this._prevBlock;
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= block[i];
            }
            var CBC = BlockCipherMode.extend();
            return CBC.Encryptor = CBC.extend({
                processBlock: function(words, offset) {
                    var cipher = this._cipher, blockSize = cipher.blockSize;
                    xorBlock.call(this, words, offset, blockSize), cipher.encryptBlock(words, offset), 
                    this._prevBlock = words.slice(offset, offset + blockSize);
                }
            }), CBC.Decryptor = CBC.extend({
                processBlock: function(words, offset) {
                    var cipher = this._cipher, blockSize = cipher.blockSize, thisBlock = words.slice(offset, offset + blockSize);
                    cipher.decryptBlock(words, offset), xorBlock.call(this, words, offset, blockSize), 
                    this._prevBlock = thisBlock;
                }
            }), CBC;
        }(), C_pad = C.pad = {}, Pkcs7 = C_pad.Pkcs7 = {
            pad: function(data, blockSize) {
                for (var blockSizeBytes = 4 * blockSize, nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes, paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes, paddingWords = [], i = 0; nPaddingBytes > i; i += 4) paddingWords.push(paddingWord);
                var padding = WordArray.create(paddingWords, nPaddingBytes);
                data.concat(padding);
            },
            unpad: function(data) {
                var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
                data.sigBytes -= nPaddingBytes;
            }
        }, CipherParams = (C_lib.BlockCipher = Cipher.extend({
            cfg: Cipher.cfg.extend({
                mode: CBC,
                padding: Pkcs7
            }),
            reset: function() {
                Cipher.reset.call(this);
                var cfg = this.cfg, iv = cfg.iv, mode = cfg.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) var modeCreator = mode.createEncryptor; else {
                    var modeCreator = mode.createDecryptor;
                    this._minBufferSize = 1;
                }
                this._mode = modeCreator.call(mode, this, iv && iv.words);
            },
            _doProcessBlock: function(words, offset) {
                this._mode.processBlock(words, offset);
            },
            _doFinalize: function() {
                var padding = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    padding.pad(this._data, this.blockSize);
                    var finalProcessedBlocks = this._process(!0);
                } else {
                    var finalProcessedBlocks = this._process(!0);
                    padding.unpad(finalProcessedBlocks);
                }
                return finalProcessedBlocks;
            },
            blockSize: 4
        }), C_lib.CipherParams = Base.extend({
            init: function(cipherParams) {
                this.mixIn(cipherParams);
            },
            toString: function(formatter) {
                return (formatter || this.formatter).stringify(this);
            }
        })), C_format = C.format = {}, OpenSSLFormatter = C_format.OpenSSL = {
            stringify: function(cipherParams) {
                var ciphertext = cipherParams.ciphertext, salt = cipherParams.salt;
                if (salt) var wordArray = WordArray.create([ 1398893684, 1701076831 ]).concat(salt).concat(ciphertext); else var wordArray = ciphertext;
                return wordArray.toString(Base64);
            },
            parse: function(openSSLStr) {
                var ciphertext = Base64.parse(openSSLStr), ciphertextWords = ciphertext.words;
                if (1398893684 == ciphertextWords[0] && 1701076831 == ciphertextWords[1]) {
                    var salt = WordArray.create(ciphertextWords.slice(2, 4));
                    ciphertextWords.splice(0, 4), ciphertext.sigBytes -= 16;
                }
                return CipherParams.create({
                    ciphertext: ciphertext,
                    salt: salt
                });
            }
        }, SerializableCipher = C_lib.SerializableCipher = Base.extend({
            cfg: Base.extend({
                format: OpenSSLFormatter
            }),
            encrypt: function(cipher, message, key, cfg) {
                cfg = this.cfg.extend(cfg);
                var encryptor = cipher.createEncryptor(key, cfg), ciphertext = encryptor.finalize(message), cipherCfg = encryptor.cfg;
                return CipherParams.create({
                    ciphertext: ciphertext,
                    key: key,
                    iv: cipherCfg.iv,
                    algorithm: cipher,
                    mode: cipherCfg.mode,
                    padding: cipherCfg.padding,
                    blockSize: cipher.blockSize,
                    formatter: cfg.format
                });
            },
            decrypt: function(cipher, ciphertext, key, cfg) {
                cfg = this.cfg.extend(cfg), ciphertext = this._parse(ciphertext, cfg.format);
                var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
                return plaintext;
            },
            _parse: function(ciphertext, format) {
                return "string" == typeof ciphertext ? format.parse(ciphertext, this) : ciphertext;
            }
        }), C_kdf = C.kdf = {}, OpenSSLKdf = C_kdf.OpenSSL = {
            execute: function(password, keySize, ivSize, salt) {
                salt || (salt = WordArray.random(8));
                var key = EvpKDF.create({
                    keySize: keySize + ivSize
                }).compute(password, salt), iv = WordArray.create(key.words.slice(keySize), 4 * ivSize);
                return key.sigBytes = 4 * keySize, CipherParams.create({
                    key: key,
                    iv: iv,
                    salt: salt
                });
            }
        }, PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            cfg: SerializableCipher.cfg.extend({
                kdf: OpenSSLKdf
            }),
            encrypt: function(cipher, message, password, cfg) {
                cfg = this.cfg.extend(cfg);
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
                cfg.iv = derivedParams.iv;
                var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
                return ciphertext.mixIn(derivedParams), ciphertext;
            },
            decrypt: function(cipher, ciphertext, password, cfg) {
                cfg = this.cfg.extend(cfg), ciphertext = this._parse(ciphertext, cfg.format);
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
                cfg.iv = derivedParams.iv;
                var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
                return plaintext;
            }
        });
    }(), CryptoJS.mode.CFB = function() {
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
            var iv = this._iv;
            if (iv) {
                var keystream = iv.slice(0);
                this._iv = void 0;
            } else var keystream = this._prevBlock;
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
        }
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        return CFB.Encryptor = CFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher, blockSize = cipher.blockSize;
                generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher), this._prevBlock = words.slice(offset, offset + blockSize);
            }
        }), CFB.Decryptor = CFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher, blockSize = cipher.blockSize, thisBlock = words.slice(offset, offset + blockSize);
                generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher), this._prevBlock = thisBlock;
            }
        }), CFB;
    }(), CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        return ECB.Encryptor = ECB.extend({
            processBlock: function(words, offset) {
                this._cipher.encryptBlock(words, offset);
            }
        }), ECB.Decryptor = ECB.extend({
            processBlock: function(words, offset) {
                this._cipher.decryptBlock(words, offset);
            }
        }), ECB;
    }(), CryptoJS.pad.AnsiX923 = {
        pad: function(data, blockSize) {
            var dataSigBytes = data.sigBytes, blockSizeBytes = 4 * blockSize, nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes, lastBytePos = dataSigBytes + nPaddingBytes - 1;
            data.clamp(), data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8, 
            data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
            var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
            data.sigBytes -= nPaddingBytes;
        }
    }, CryptoJS.pad.Iso10126 = {
        pad: function(data, blockSize) {
            var blockSizeBytes = 4 * blockSize, nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([ nPaddingBytes << 24 ], 1));
        },
        unpad: function(data) {
            var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
            data.sigBytes -= nPaddingBytes;
        }
    }, CryptoJS.pad.Iso97971 = {
        pad: function(data, blockSize) {
            data.concat(CryptoJS.lib.WordArray.create([ 2147483648 ], 1)), CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
            CryptoJS.pad.ZeroPadding.unpad(data), data.sigBytes--;
        }
    }, CryptoJS.mode.OFB = function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend(), Encryptor = OFB.Encryptor = OFB.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher, blockSize = cipher.blockSize, iv = this._iv, keystream = this._keystream;
                iv && (keystream = this._keystream = iv.slice(0), this._iv = void 0), cipher.encryptBlock(keystream, 0);
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
            }
        });
        return OFB.Decryptor = Encryptor, OFB;
    }(), CryptoJS.pad.NoPadding = {
        pad: function() {},
        unpad: function() {}
    }, function(undefined) {
        var C = CryptoJS, C_lib = C.lib, CipherParams = C_lib.CipherParams, C_enc = C.enc, Hex = C_enc.Hex, C_format = C.format;
        C_format.Hex = {
            stringify: function(cipherParams) {
                return cipherParams.ciphertext.toString(Hex);
            },
            parse: function(input) {
                var ciphertext = Hex.parse(input);
                return CipherParams.create({
                    ciphertext: ciphertext
                });
            }
        };
    }(), function() {
        var C = CryptoJS, C_lib = C.lib, BlockCipher = C_lib.BlockCipher, C_algo = C.algo, SBOX = [], INV_SBOX = [], SUB_MIX_0 = [], SUB_MIX_1 = [], SUB_MIX_2 = [], SUB_MIX_3 = [], INV_SUB_MIX_0 = [], INV_SUB_MIX_1 = [], INV_SUB_MIX_2 = [], INV_SUB_MIX_3 = [];
        !function() {
            for (var d = [], i = 0; 256 > i; i++) 128 > i ? d[i] = i << 1 : d[i] = i << 1 ^ 283;
            for (var x = 0, xi = 0, i = 0; 256 > i; i++) {
                var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
                sx = sx >>> 8 ^ 255 & sx ^ 99, SBOX[x] = sx, INV_SBOX[sx] = x;
                var x2 = d[x], x4 = d[x2], x8 = d[x4], t = 257 * d[sx] ^ 16843008 * sx;
                SUB_MIX_0[x] = t << 24 | t >>> 8, SUB_MIX_1[x] = t << 16 | t >>> 16, SUB_MIX_2[x] = t << 8 | t >>> 24, 
                SUB_MIX_3[x] = t;
                var t = 16843009 * x8 ^ 65537 * x4 ^ 257 * x2 ^ 16843008 * x;
                INV_SUB_MIX_0[sx] = t << 24 | t >>> 8, INV_SUB_MIX_1[sx] = t << 16 | t >>> 16, INV_SUB_MIX_2[sx] = t << 8 | t >>> 24, 
                INV_SUB_MIX_3[sx] = t, x ? (x = x2 ^ d[d[d[x8 ^ x2]]], xi ^= d[d[xi]]) : x = xi = 1;
            }
        }();
        var RCON = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], AES = C_algo.AES = BlockCipher.extend({
            _doReset: function() {
                for (var key = this._key, keyWords = key.words, keySize = key.sigBytes / 4, nRounds = this._nRounds = keySize + 6, ksRows = 4 * (nRounds + 1), keySchedule = this._keySchedule = [], ksRow = 0; ksRows > ksRow; ksRow++) if (keySize > ksRow) keySchedule[ksRow] = keyWords[ksRow]; else {
                    var t = keySchedule[ksRow - 1];
                    ksRow % keySize ? keySize > 6 && ksRow % keySize == 4 && (t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t]) : (t = t << 8 | t >>> 24, 
                    t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t], 
                    t ^= RCON[ksRow / keySize | 0] << 24), keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                }
                for (var invKeySchedule = this._invKeySchedule = [], invKsRow = 0; ksRows > invKsRow; invKsRow++) {
                    var ksRow = ksRows - invKsRow;
                    if (invKsRow % 4) var t = keySchedule[ksRow]; else var t = keySchedule[ksRow - 4];
                    4 > invKsRow || 4 >= ksRow ? invKeySchedule[invKsRow] = t : invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[255 & t]];
                }
            },
            encryptBlock: function(M, offset) {
                this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },
            decryptBlock: function(M, offset) {
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3], M[offset + 3] = t, this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3], M[offset + 3] = t;
            },
            _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
                for (var nRounds = this._nRounds, s0 = M[offset] ^ keySchedule[0], s1 = M[offset + 1] ^ keySchedule[1], s2 = M[offset + 2] ^ keySchedule[2], s3 = M[offset + 3] ^ keySchedule[3], ksRow = 4, round = 1; nRounds > round; round++) {
                    var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[255 & s3] ^ keySchedule[ksRow++], t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[255 & s0] ^ keySchedule[ksRow++], t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[255 & s1] ^ keySchedule[ksRow++], t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[255 & s2] ^ keySchedule[ksRow++];
                    s0 = t0, s1 = t1, s2 = t2, s3 = t3;
                }
                var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[255 & s3]) ^ keySchedule[ksRow++], t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[255 & s0]) ^ keySchedule[ksRow++], t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[255 & s1]) ^ keySchedule[ksRow++], t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[255 & s2]) ^ keySchedule[ksRow++];
                M[offset] = t0, M[offset + 1] = t1, M[offset + 2] = t2, M[offset + 3] = t3;
            },
            keySize: 8
        });
        C.AES = BlockCipher._createHelper(AES);
    }(), function() {
        function exchangeLR(offset, mask) {
            var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
            this._rBlock ^= t, this._lBlock ^= t << offset;
        }
        function exchangeRL(offset, mask) {
            var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
            this._lBlock ^= t, this._rBlock ^= t << offset;
        }
        var C = CryptoJS, C_lib = C.lib, WordArray = C_lib.WordArray, BlockCipher = C_lib.BlockCipher, C_algo = C.algo, PC1 = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ], PC2 = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ], BIT_SHIFTS = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ], SBOX_P = [ {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
        }, {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
        }, {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
        }, {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
        }, {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
        }, {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
        }, {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
        }, {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
        } ], SBOX_MASK = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ], DES = C_algo.DES = BlockCipher.extend({
            _doReset: function() {
                for (var key = this._key, keyWords = key.words, keyBits = [], i = 0; 56 > i; i++) {
                    var keyBitPos = PC1[i] - 1;
                    keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
                }
                for (var subKeys = this._subKeys = [], nSubKey = 0; 16 > nSubKey; nSubKey++) {
                    for (var subKey = subKeys[nSubKey] = [], bitShift = BIT_SHIFTS[nSubKey], i = 0; 24 > i; i++) subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6, 
                    subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
                    subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
                    for (var i = 1; 7 > i; i++) subKey[i] = subKey[i] >>> 4 * (i - 1) + 3;
                    subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
                }
                for (var invSubKeys = this._invSubKeys = [], i = 0; 16 > i; i++) invSubKeys[i] = subKeys[15 - i];
            },
            encryptBlock: function(M, offset) {
                this._doCryptBlock(M, offset, this._subKeys);
            },
            decryptBlock: function(M, offset) {
                this._doCryptBlock(M, offset, this._invSubKeys);
            },
            _doCryptBlock: function(M, offset, subKeys) {
                this._lBlock = M[offset], this._rBlock = M[offset + 1], exchangeLR.call(this, 4, 252645135), 
                exchangeLR.call(this, 16, 65535), exchangeRL.call(this, 2, 858993459), exchangeRL.call(this, 8, 16711935), 
                exchangeLR.call(this, 1, 1431655765);
                for (var round = 0; 16 > round; round++) {
                    for (var subKey = subKeys[round], lBlock = this._lBlock, rBlock = this._rBlock, f = 0, i = 0; 8 > i; i++) f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
                    this._lBlock = rBlock, this._rBlock = lBlock ^ f;
                }
                var t = this._lBlock;
                this._lBlock = this._rBlock, this._rBlock = t, exchangeLR.call(this, 1, 1431655765), 
                exchangeRL.call(this, 8, 16711935), exchangeRL.call(this, 2, 858993459), exchangeLR.call(this, 16, 65535), 
                exchangeLR.call(this, 4, 252645135), M[offset] = this._lBlock, M[offset + 1] = this._rBlock;
            },
            keySize: 2,
            ivSize: 2,
            blockSize: 2
        });
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
            _doReset: function() {
                var key = this._key, keyWords = key.words;
                this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2))), this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4))), 
                this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
            },
            encryptBlock: function(M, offset) {
                this._des1.encryptBlock(M, offset), this._des2.decryptBlock(M, offset), this._des3.encryptBlock(M, offset);
            },
            decryptBlock: function(M, offset) {
                this._des3.decryptBlock(M, offset), this._des2.encryptBlock(M, offset), this._des1.decryptBlock(M, offset);
            },
            keySize: 6,
            ivSize: 2,
            blockSize: 2
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
    }(), function() {
        function generateKeystreamWord() {
            for (var S = this._S, i = this._i, j = this._j, keystreamWord = 0, n = 0; 4 > n; n++) {
                i = (i + 1) % 256, j = (j + S[i]) % 256;
                var t = S[i];
                S[i] = S[j], S[j] = t, keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - 8 * n;
            }
            return this._i = i, this._j = j, keystreamWord;
        }
        var C = CryptoJS, C_lib = C.lib, StreamCipher = C_lib.StreamCipher, C_algo = C.algo, RC4 = C_algo.RC4 = StreamCipher.extend({
            _doReset: function() {
                for (var key = this._key, keyWords = key.words, keySigBytes = key.sigBytes, S = this._S = [], i = 0; 256 > i; i++) S[i] = i;
                for (var i = 0, j = 0; 256 > i; i++) {
                    var keyByteIndex = i % keySigBytes, keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
                    j = (j + S[i] + keyByte) % 256;
                    var t = S[i];
                    S[i] = S[j], S[j] = t;
                }
                this._i = this._j = 0;
            },
            _doProcessBlock: function(M, offset) {
                M[offset] ^= generateKeystreamWord.call(this);
            },
            keySize: 8,
            ivSize: 0
        });
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
            cfg: RC4.cfg.extend({
                drop: 192
            }),
            _doReset: function() {
                RC4._doReset.call(this);
                for (var i = this.cfg.drop; i > 0; i--) generateKeystreamWord.call(this);
            }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
    }(), CryptoJS.mode.CTRGladman = function() {
        function incWord(word) {
            if (255 === (word >> 24 & 255)) {
                var b1 = word >> 16 & 255, b2 = word >> 8 & 255, b3 = 255 & word;
                255 === b1 ? (b1 = 0, 255 === b2 ? (b2 = 0, 255 === b3 ? b3 = 0 : ++b3) : ++b2) : ++b1, 
                word = 0, word += b1 << 16, word += b2 << 8, word += b3;
            } else word += 1 << 24;
            return word;
        }
        function incCounter(counter) {
            return 0 === (counter[0] = incWord(counter[0])) && (counter[1] = incWord(counter[1])), 
            counter;
        }
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend(), Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher, blockSize = cipher.blockSize, iv = this._iv, counter = this._counter;
                iv && (counter = this._counter = iv.slice(0), this._iv = void 0), incCounter(counter);
                var keystream = counter.slice(0);
                cipher.encryptBlock(keystream, 0);
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
            }
        });
        return CTRGladman.Decryptor = Encryptor, CTRGladman;
    }(), function() {
        function nextState() {
            for (var X = this._X, C = this._C, i = 0; 8 > i; i++) C_[i] = C[i];
            C[0] = C[0] + 1295307597 + this._b | 0, C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0, 
            C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0, C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0, 
            C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0, C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0, 
            C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0, C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0, 
            this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; 8 > i; i++) {
                var gx = X[i] + C[i], ga = 65535 & gx, gb = gx >>> 16, gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb, gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
                G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0, X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0, 
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0, X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0, 
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0, X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0, 
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0, X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        var C = CryptoJS, C_lib = C.lib, StreamCipher = C_lib.StreamCipher, C_algo = C.algo, S = [], C_ = [], G = [], Rabbit = C_algo.Rabbit = StreamCipher.extend({
            _doReset: function() {
                for (var K = this._key.words, iv = this.cfg.iv, i = 0; 4 > i; i++) K[i] = 16711935 & (K[i] << 8 | K[i] >>> 24) | 4278255360 & (K[i] << 24 | K[i] >>> 8);
                var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ], C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
                this._b = 0;
                for (var i = 0; 4 > i; i++) nextState.call(this);
                for (var i = 0; 8 > i; i++) C[i] ^= X[i + 4 & 7];
                if (iv) {
                    var IV = iv.words, IV_0 = IV[0], IV_1 = IV[1], i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8), i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8), i1 = i0 >>> 16 | 4294901760 & i2, i3 = i2 << 16 | 65535 & i0;
                    C[0] ^= i0, C[1] ^= i1, C[2] ^= i2, C[3] ^= i3, C[4] ^= i0, C[5] ^= i1, C[6] ^= i2, 
                    C[7] ^= i3;
                    for (var i = 0; 4 > i; i++) nextState.call(this);
                }
            },
            _doProcessBlock: function(M, offset) {
                var X = this._X;
                nextState.call(this), S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16, S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16, 
                S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16, S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
                for (var i = 0; 4 > i; i++) S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8), 
                M[offset + i] ^= S[i];
            },
            blockSize: 4,
            ivSize: 2
        });
        C.Rabbit = StreamCipher._createHelper(Rabbit);
    }(), CryptoJS.mode.CTR = function() {
        var CTR = CryptoJS.lib.BlockCipherMode.extend(), Encryptor = CTR.Encryptor = CTR.extend({
            processBlock: function(words, offset) {
                var cipher = this._cipher, blockSize = cipher.blockSize, iv = this._iv, counter = this._counter;
                iv && (counter = this._counter = iv.slice(0), this._iv = void 0);
                var keystream = counter.slice(0);
                cipher.encryptBlock(keystream, 0), counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
                for (var i = 0; blockSize > i; i++) words[offset + i] ^= keystream[i];
            }
        });
        return CTR.Decryptor = Encryptor, CTR;
    }(), function() {
        function nextState() {
            for (var X = this._X, C = this._C, i = 0; 8 > i; i++) C_[i] = C[i];
            C[0] = C[0] + 1295307597 + this._b | 0, C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0, 
            C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0, C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0, 
            C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0, C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0, 
            C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0, C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0, 
            this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
            for (var i = 0; 8 > i; i++) {
                var gx = X[i] + C[i], ga = 65535 & gx, gb = gx >>> 16, gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb, gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
                G[i] = gh ^ gl;
            }
            X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0, X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0, 
            X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0, X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0, 
            X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0, X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0, 
            X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0, X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        var C = CryptoJS, C_lib = C.lib, StreamCipher = C_lib.StreamCipher, C_algo = C.algo, S = [], C_ = [], G = [], RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
            _doReset: function() {
                var K = this._key.words, iv = this.cfg.iv, X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ], C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
                this._b = 0;
                for (var i = 0; 4 > i; i++) nextState.call(this);
                for (var i = 0; 8 > i; i++) C[i] ^= X[i + 4 & 7];
                if (iv) {
                    var IV = iv.words, IV_0 = IV[0], IV_1 = IV[1], i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8), i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8), i1 = i0 >>> 16 | 4294901760 & i2, i3 = i2 << 16 | 65535 & i0;
                    C[0] ^= i0, C[1] ^= i1, C[2] ^= i2, C[3] ^= i3, C[4] ^= i0, C[5] ^= i1, C[6] ^= i2, 
                    C[7] ^= i3;
                    for (var i = 0; 4 > i; i++) nextState.call(this);
                }
            },
            _doProcessBlock: function(M, offset) {
                var X = this._X;
                nextState.call(this), S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16, S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16, 
                S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16, S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
                for (var i = 0; 4 > i; i++) S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8), 
                M[offset + i] ^= S[i];
            },
            blockSize: 4,
            ivSize: 2
        });
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
    }(), CryptoJS.pad.ZeroPadding = {
        pad: function(data, blockSize) {
            var blockSizeBytes = 4 * blockSize;
            data.clamp(), data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function(data) {
            for (var dataWords = data.words, i = data.sigBytes - 1; !(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255); ) i--;
            data.sigBytes = i + 1;
        }
    }, CryptoJS;
}), !function(e, n) {
    "use strict";
    var r = [ "ng", "oc.lazyLoad" ], o = {}, t = [], i = [], a = [], s = [], u = e.noop, c = {}, l = [], d = e.module("oc.lazyLoad", [ "ng" ]);
    d.provider("$ocLazyLoad", [ "$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$injector", "$animateProvider", function(d, f, p, m, v, y) {
        function L(n, o, t) {
            if (o) {
                var i, s, d, f = [];
                for (i = o.length - 1; i >= 0; i--) if (s = o[i], e.isString(s) || (s = E(s)), s && -1 === l.indexOf(s) && (!w[s] || -1 !== a.indexOf(s))) {
                    var h = -1 === r.indexOf(s);
                    if (d = g(s), h && (r.push(s), L(n, d.requires, t)), d._runBlocks.length > 0) for (c[s] = []; d._runBlocks.length > 0; ) c[s].push(d._runBlocks.shift());
                    e.isDefined(c[s]) && (h || t.rerun) && (f = f.concat(c[s])), j(n, d._invokeQueue, s, t.reconfig), 
                    j(n, d._configBlocks, s, t.reconfig), u(h ? "ocLazyLoad.moduleLoaded" : "ocLazyLoad.moduleReloaded", s), 
                    o.pop(), l.push(s);
                }
                var p = n.getInstanceInjector();
                e.forEach(f, function(e) {
                    p.invoke(e);
                });
            }
        }
        function $(n, r) {
            function t(n, r) {
                var o, t = !0;
                return r.length && (o = i(n), e.forEach(r, function(e) {
                    t = t && i(e) !== o;
                })), t;
            }
            function i(n) {
                return e.isArray(n) ? M(n.toString()) : e.isObject(n) ? M(S(n)) : e.isDefined(n) && null !== n ? M(n.toString()) : n;
            }
            var a = n[2][0], s = n[1], c = !1;
            e.isUndefined(o[r]) && (o[r] = {}), e.isUndefined(o[r][s]) && (o[r][s] = {});
            var l = function(e, n) {
                o[r][s].hasOwnProperty(e) || (o[r][s][e] = []), t(n, o[r][s][e]) && (c = !0, o[r][s][e].push(n), 
                u("ocLazyLoad.componentLoaded", [ r, s, e ]));
            };
            if (e.isString(a)) l(a, n[2][1]); else {
                if (!e.isObject(a)) return !1;
                e.forEach(a, function(n, r) {
                    e.isString(n) ? l(n, a[1]) : l(r, n);
                });
            }
            return c;
        }
        function j(n, r, o, i) {
            if (r) {
                var a, s, u, c;
                for (a = 0, s = r.length; s > a; a++) if (u = r[a], e.isArray(u)) {
                    if (null !== n) {
                        if (!n.hasOwnProperty(u[0])) throw new Error("unsupported provider " + u[0]);
                        c = n[u[0]];
                    }
                    var l = $(u, o);
                    if ("invoke" !== u[1]) l && e.isDefined(c) && c[u[1]].apply(c, u[2]); else {
                        var d = function(n) {
                            var r = t.indexOf(o + "-" + n);
                            (-1 === r || i) && (-1 === r && t.push(o + "-" + n), e.isDefined(c) && c[u[1]].apply(c, u[2]));
                        };
                        if (e.isFunction(u[2][0])) d(u[2][0]); else if (e.isArray(u[2][0])) for (var f = 0, h = u[2][0].length; h > f; f++) e.isFunction(u[2][0][f]) && d(u[2][0][f]);
                    }
                }
            }
        }
        function E(n) {
            var r = null;
            return e.isString(n) ? r = n : e.isObject(n) && n.hasOwnProperty("name") && e.isString(n.name) && (r = n.name), 
            r;
        }
        function _(n) {
            if (!e.isString(n)) return !1;
            try {
                return g(n);
            } catch (r) {
                if (/No module/.test(r) || r.message.indexOf("$injector:nomod") > -1) return !1;
            }
        }
        var w = {}, O = {
            $controllerProvider: d,
            $compileProvider: p,
            $filterProvider: m,
            $provide: f,
            $injector: v,
            $animateProvider: y
        }, x = !1, b = !1, z = [], D = {};
        z.push = function(e) {
            -1 === this.indexOf(e) && Array.prototype.push.apply(this, arguments);
        }, this.config = function(n) {
            e.isDefined(n.modules) && (e.isArray(n.modules) ? e.forEach(n.modules, function(e) {
                w[e.name] = e;
            }) : w[n.modules.name] = n.modules), e.isDefined(n.debug) && (x = n.debug), e.isDefined(n.events) && (b = n.events);
        }, this._init = function(o) {
            if (0 === i.length) {
                var t = [ o ], a = [ "ng:app", "ng-app", "x-ng-app", "data-ng-app" ], u = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/, c = function(e) {
                    return e && t.push(e);
                };
                e.forEach(a, function(n) {
                    a[n] = !0, c(document.getElementById(n)), n = n.replace(":", "\\:"), "undefined" != typeof o[0] && o[0].querySelectorAll && (e.forEach(o[0].querySelectorAll("." + n), c), 
                    e.forEach(o[0].querySelectorAll("." + n + "\\:"), c), e.forEach(o[0].querySelectorAll("[" + n + "]"), c));
                }), e.forEach(t, function(n) {
                    if (0 === i.length) {
                        var r = " " + o.className + " ", t = u.exec(r);
                        t ? i.push((t[2] || "").replace(/\s+/g, ",")) : e.forEach(n.attributes, function(e) {
                            0 === i.length && a[e.name] && i.push(e.value);
                        });
                    }
                });
            }
            0 !== i.length || (n.jasmine || n.mocha) && e.isDefined(e.mock) || console.error("No module found during bootstrap, unable to init ocLazyLoad. You should always use the ng-app directive or angular.boostrap when you use ocLazyLoad.");
            var l = function d(n) {
                if (-1 === r.indexOf(n)) {
                    r.push(n);
                    var o = e.module(n);
                    j(null, o._invokeQueue, n), j(null, o._configBlocks, n), e.forEach(o.requires, d);
                }
            };
            e.forEach(i, function(e) {
                l(e);
            }), i = [], s.pop();
        };
        var S = function(n) {
            try {
                return JSON.stringify(n);
            } catch (r) {
                var o = [];
                return JSON.stringify(n, function(n, r) {
                    if (e.isObject(r) && null !== r) {
                        if (-1 !== o.indexOf(r)) return;
                        o.push(r);
                    }
                    return r;
                });
            }
        }, M = function(e) {
            var n, r, o, t = 0;
            if (0 == e.length) return t;
            for (n = 0, o = e.length; o > n; n++) r = e.charCodeAt(n), t = (t << 5) - t + r, 
            t |= 0;
            return t;
        };
        this.$get = [ "$log", "$rootElement", "$rootScope", "$cacheFactory", "$q", function(n, t, a, c, d) {
            function f(e) {
                var r = d.defer();
                return n.error(e.message), r.reject(e), r.promise;
            }
            var p, m = c("ocLazyLoad");
            return x || (n = {}, n.error = e.noop, n.warn = e.noop, n.info = e.noop), O.getInstanceInjector = function() {
                return p ? p : p = t.data("$injector") || e.injector();
            }, u = function(e, r) {
                b && a.$broadcast(e, r), x && n.info(e, r);
            }, {
                _broadcast: u,
                _$log: n,
                _getFilesCache: function() {
                    return m;
                },
                toggleWatch: function(e) {
                    e ? s.push(!0) : s.pop();
                },
                getModuleConfig: function(n) {
                    if (!e.isString(n)) throw new Error("You need to give the name of the module to get");
                    return w[n] ? e.copy(w[n]) : null;
                },
                setModuleConfig: function(n) {
                    if (!e.isObject(n)) throw new Error("You need to give the module config object to set");
                    return w[n.name] = n, n;
                },
                getModules: function() {
                    return r;
                },
                isLoaded: function(n) {
                    var o = function(e) {
                        var n = r.indexOf(e) > -1;
                        return n || (n = !!_(e)), n;
                    };
                    if (e.isString(n) && (n = [ n ]), e.isArray(n)) {
                        var t, i;
                        for (t = 0, i = n.length; i > t; t++) if (!o(n[t])) return !1;
                        return !0;
                    }
                    throw new Error("You need to define the module(s) name(s)");
                },
                _getModuleName: E,
                _getModule: function(e) {
                    try {
                        return g(e);
                    } catch (n) {
                        throw (/No module/.test(n) || n.message.indexOf("$injector:nomod") > -1) && (n.message = 'The module "' + S(e) + '" that you are trying to load does not exist. ' + n.message), 
                        n;
                    }
                },
                moduleExists: _,
                _loadDependencies: function(n, r) {
                    var o, t, i, a = [], s = this;
                    if (n = s._getModuleName(n), null === n) return d.when();
                    try {
                        o = s._getModule(n);
                    } catch (u) {
                        return f(u);
                    }
                    return t = s.getRequires(o), e.forEach(t, function(o) {
                        if (e.isString(o)) {
                            var t = s.getModuleConfig(o);
                            if (null === t) return void z.push(o);
                            o = t, t.name = void 0;
                        }
                        if (s.moduleExists(o.name)) return i = o.files.filter(function(e) {
                            return s.getModuleConfig(o.name).files.indexOf(e) < 0;
                        }), 0 !== i.length && s._$log.warn('Module "', n, '" attempted to redefine configuration for dependency. "', o.name, '"\n Additional Files Loaded:', i), 
                        e.isDefined(s.filesLoader) ? void a.push(s.filesLoader(o, r).then(function() {
                            return s._loadDependencies(o);
                        })) : f(new Error("Error: New dependencies need to be loaded from external files (" + o.files + "), but no loader has been defined."));
                        if (e.isArray(o)) {
                            var u = [];
                            e.forEach(o, function(e) {
                                var n = s.getModuleConfig(e);
                                null === n ? u.push(e) : n.files && (u = u.concat(n.files));
                            }), u.length > 0 && (o = {
                                files: u
                            });
                        } else e.isObject(o) && o.hasOwnProperty("name") && o.name && (s.setModuleConfig(o), 
                        z.push(o.name));
                        if (e.isDefined(o.files) && 0 !== o.files.length) {
                            if (!e.isDefined(s.filesLoader)) return f(new Error('Error: the module "' + o.name + '" is defined in external files (' + o.files + "), but no loader has been defined."));
                            a.push(s.filesLoader(o, r).then(function() {
                                return s._loadDependencies(o);
                            }));
                        }
                    }), d.all(a);
                },
                inject: function(n) {
                    var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], t = this, a = d.defer();
                    if (e.isDefined(n) && null !== n) {
                        if (e.isArray(n)) {
                            var s = [];
                            return e.forEach(n, function(e) {
                                s.push(t.inject(e, r, o));
                            }), d.all(s);
                        }
                        t._addToLoadList(t._getModuleName(n), !0, o);
                    }
                    if (i.length > 0) {
                        var u = i.slice(), c = function f(e) {
                            z.push(e), D[e] = a.promise, t._loadDependencies(e, r).then(function() {
                                try {
                                    l = [], L(O, z, r);
                                } catch (e) {
                                    return t._$log.error(e.message), void a.reject(e);
                                }
                                i.length > 0 ? f(i.shift()) : a.resolve(u);
                            }, function(e) {
                                a.reject(e);
                            });
                        };
                        c(i.shift());
                    } else {
                        if (r && r.name && D[r.name]) return D[r.name];
                        a.resolve();
                    }
                    return a.promise;
                },
                getRequires: function(n) {
                    var o = [];
                    return e.forEach(n.requires, function(e) {
                        -1 === r.indexOf(e) && o.push(e);
                    }), o;
                },
                _invokeQueue: j,
                _registerInvokeList: $,
                _register: L,
                _addToLoadList: h,
                _unregister: function(n) {
                    e.isDefined(n) && e.isArray(n) && e.forEach(n, function(e) {
                        o[e] = void 0;
                    });
                }
            };
        } ], this._init(e.element(n.document));
    } ]);
    var f = e.bootstrap;
    e.bootstrap = function(n, r, o) {
        return e.forEach(r.slice(), function(e) {
            h(e, !0, !0);
        }), f(n, r, o);
    };
    var h = function(n, r, o) {
        (s.length > 0 || r) && e.isString(n) && -1 === i.indexOf(n) && (i.push(n), o && a.push(n));
    }, g = e.module;
    e.module = function(e, n, r) {
        return h(e, !1, !0), g(e, n, r);
    }, "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "oc.lazyLoad");
}(angular, window), function(e) {
    "use strict";
    e.module("oc.lazyLoad").directive("ocLazyLoad", [ "$ocLazyLoad", "$compile", "$animate", "$parse", "$timeout", function(n, r, o, t, i) {
        return {
            restrict: "A",
            terminal: !0,
            priority: 1e3,
            compile: function(i, a) {
                var s = i[0].innerHTML;
                return i.html(""), function(i, a, u) {
                    var c = t(u.ocLazyLoad);
                    i.$watch(function() {
                        return c(i) || u.ocLazyLoad;
                    }, function(t) {
                        e.isDefined(t) && n.load(t).then(function() {
                            o.enter(s, a), r(a.contents())(i);
                        });
                    }, !0);
                };
            }
        };
    } ]);
}(angular), function(e) {
    "use strict";
    e.module("oc.lazyLoad").config([ "$provide", function(n) {
        n.decorator("$ocLazyLoad", [ "$delegate", "$q", "$window", "$interval", function(n, r, o, t) {
            var i = !1, a = !1, s = o.document.getElementsByTagName("head")[0] || o.document.getElementsByTagName("body")[0];
            return n.buildElement = function(u, c, l) {
                var d, f, h = r.defer(), g = n._getFilesCache(), p = function(e) {
                    var n = new Date().getTime();
                    return e.indexOf("?") >= 0 ? "&" === e.substring(0, e.length - 1) ? e + "_dc=" + n : e + "&_dc=" + n : e + "?_dc=" + n;
                };
                switch (e.isUndefined(g.get(c)) && g.put(c, h.promise), u) {
                  case "css":
                    d = o.document.createElement("link"), d.type = "text/css", d.rel = "stylesheet", 
                    d.href = l.cache === !1 ? p(c) : c;
                    break;

                  case "js":
                    d = o.document.createElement("script"), d.src = l.cache === !1 ? p(c) : c;
                    break;

                  default:
                    g.remove(c), h.reject(new Error('Requested type "' + u + '" is not known. Could not inject "' + c + '"'));
                }
                d.onload = d.onreadystatechange = function(e) {
                    d.readyState && !/^c|loade/.test(d.readyState) || f || (d.onload = d.onreadystatechange = null, 
                    f = 1, n._broadcast("ocLazyLoad.fileLoaded", c), h.resolve());
                }, d.onerror = function() {
                    g.remove(c), h.reject(new Error("Unable to load " + c));
                }, d.async = l.serie ? 0 : 1;
                var m = s.lastChild;
                if (l.insertBefore) {
                    var v = e.element(e.isDefined(window.jQuery) ? l.insertBefore : document.querySelector(l.insertBefore));
                    v && v.length > 0 && (m = v[0]);
                }
                if (m.parentNode.insertBefore(d, m), "css" == u) {
                    if (!i) {
                        var y = o.navigator.userAgent.toLowerCase();
                        if (/iP(hone|od|ad)/.test(o.navigator.platform)) {
                            var L = o.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), $ = parseFloat([ parseInt(L[1], 10), parseInt(L[2], 10), parseInt(L[3] || 0, 10) ].join("."));
                            a = 6 > $;
                        } else if (y.indexOf("android") > -1) {
                            var j = parseFloat(y.slice(y.indexOf("android") + 8));
                            a = 4.4 > j;
                        } else if (y.indexOf("safari") > -1) {
                            var E = y.match(/version\/([\.\d]+)/i);
                            a = E && E[1] && parseFloat(E[1]) < 6;
                        }
                    }
                    if (a) var _ = 1e3, w = t(function() {
                        try {
                            d.sheet.cssRules, t.cancel(w), d.onload();
                        } catch (e) {
                            --_ <= 0 && d.onerror();
                        }
                    }, 20);
                }
                return h.promise;
            }, n;
        } ]);
    } ]);
}(angular), function(e) {
    "use strict";
    e.module("oc.lazyLoad").config([ "$provide", function(n) {
        n.decorator("$ocLazyLoad", [ "$delegate", "$q", function(n, r) {
            return n.filesLoader = function(o) {
                var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], i = [], a = [], s = [], u = [], c = null, l = n._getFilesCache();
                n.toggleWatch(!0), e.extend(t, o);
                var d = function(r) {
                    var o, d = null;
                    if (e.isObject(r) && (d = r.type, r = r.path), c = l.get(r), e.isUndefined(c) || t.cache === !1) {
                        if (null !== (o = /^(css|less|html|htm|js)?(?=!)/.exec(r)) && (d = o[1], r = r.substr(o[1].length + 1, r.length)), 
                        !d) if (null !== (o = /[.](css|less|html|htm|js)?((\?|#).*)?$/.exec(r))) d = o[1]; else {
                            if (n.jsLoader.hasOwnProperty("ocLazyLoadLoader") || !n.jsLoader.hasOwnProperty("requirejs")) return void n._$log.error("File type could not be determined. " + r);
                            d = "js";
                        }
                        "css" !== d && "less" !== d || -1 !== i.indexOf(r) ? "html" !== d && "htm" !== d || -1 !== a.indexOf(r) ? "js" === d || -1 === s.indexOf(r) ? s.push(r) : n._$log.error("File type is not valid. " + r) : a.push(r) : i.push(r);
                    } else c && u.push(c);
                };
                if (t.serie ? d(t.files.shift()) : e.forEach(t.files, function(e) {
                    d(e);
                }), i.length > 0) {
                    var f = r.defer();
                    n.cssLoader(i, function(r) {
                        e.isDefined(r) && n.cssLoader.hasOwnProperty("ocLazyLoadLoader") ? (n._$log.error(r), 
                        f.reject(r)) : f.resolve();
                    }, t), u.push(f.promise);
                }
                if (a.length > 0) {
                    var h = r.defer();
                    n.templatesLoader(a, function(r) {
                        e.isDefined(r) && n.templatesLoader.hasOwnProperty("ocLazyLoadLoader") ? (n._$log.error(r), 
                        h.reject(r)) : h.resolve();
                    }, t), u.push(h.promise);
                }
                if (s.length > 0) {
                    var g = r.defer();
                    n.jsLoader(s, function(r) {
                        e.isDefined(r) && (n.jsLoader.hasOwnProperty("ocLazyLoadLoader") || n.jsLoader.hasOwnProperty("requirejs")) ? (n._$log.error(r), 
                        g.reject(r)) : g.resolve();
                    }, t), u.push(g.promise);
                }
                if (0 === u.length) {
                    var p = r.defer(), m = "Error: no file to load has been found, if you're trying to load an existing module you should use the 'inject' method instead of 'load'.";
                    return n._$log.error(m), p.reject(m), p.promise;
                }
                return t.serie && t.files.length > 0 ? r.all(u).then(function() {
                    return n.filesLoader(o, t);
                }) : r.all(u)["finally"](function(e) {
                    return n.toggleWatch(!1), e;
                });
            }, n.load = function(o) {
                var t, i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], a = this, s = null, u = [], c = r.defer(), l = e.copy(o), d = e.copy(i);
                if (e.isArray(l)) return e.forEach(l, function(e) {
                    u.push(a.load(e, d));
                }), r.all(u).then(function(e) {
                    c.resolve(e);
                }, function(e) {
                    c.reject(e);
                }), c.promise;
                if (e.isString(l) ? (s = a.getModuleConfig(l), s || (s = {
                    files: [ l ]
                })) : e.isObject(l) && (s = e.isDefined(l.path) && e.isDefined(l.type) ? {
                    files: [ l ]
                } : a.setModuleConfig(l)), null === s) {
                    var f = a._getModuleName(l);
                    return t = 'Module "' + (f || "unknown") + '" is not configured, cannot load.', 
                    n._$log.error(t), c.reject(new Error(t)), c.promise;
                }
                e.isDefined(s.template) && (e.isUndefined(s.files) && (s.files = []), e.isString(s.template) ? s.files.push(s.template) : e.isArray(s.template) && s.files.concat(s.template));
                var h = e.extend({}, d, s);
                return e.isUndefined(s.files) && e.isDefined(s.name) && n.moduleExists(s.name) ? n.inject(s.name, h, !0) : (n.filesLoader(s, h).then(function() {
                    n.inject(null, h).then(function(e) {
                        c.resolve(e);
                    }, function(e) {
                        c.reject(e);
                    });
                }, function(e) {
                    c.reject(e);
                }), c.promise);
            }, n;
        } ]);
    } ]);
}(angular), function(e) {
    "use strict";
    e.module("oc.lazyLoad").config([ "$provide", function(n) {
        n.decorator("$ocLazyLoad", [ "$delegate", "$q", function(n, r) {
            return n.cssLoader = function(o, t, i) {
                var a = [];
                e.forEach(o, function(e) {
                    a.push(n.buildElement("css", e, i));
                }), r.all(a).then(function() {
                    t();
                }, function(e) {
                    t(e);
                });
            }, n.cssLoader.ocLazyLoadLoader = !0, n;
        } ]);
    } ]);
}(angular), function(e) {
    "use strict";
    e.module("oc.lazyLoad").config([ "$provide", function(n) {
        n.decorator("$ocLazyLoad", [ "$delegate", "$q", function(n, r) {
            return n.jsLoader = function(o, t, i) {
                var a = [];
                e.forEach(o, function(e) {
                    a.push(n.buildElement("js", e, i));
                }), r.all(a).then(function() {
                    t();
                }, function(e) {
                    t(e);
                });
            }, n.jsLoader.ocLazyLoadLoader = !0, n;
        } ]);
    } ]);
}(angular), function(e) {
    "use strict";
    e.module("oc.lazyLoad").config([ "$provide", function(n) {
        n.decorator("$ocLazyLoad", [ "$delegate", "$templateCache", "$q", "$http", function(n, r, o, t) {
            return n.templatesLoader = function(i, a, s) {
                var u = [], c = n._getFilesCache();
                return e.forEach(i, function(n) {
                    var i = o.defer();
                    u.push(i.promise), t.get(n, s).success(function(o) {
                        e.isString(o) && o.length > 0 && e.forEach(e.element(o), function(e) {
                            "SCRIPT" === e.nodeName && "text/ng-template" === e.type && r.put(e.id, e.innerHTML);
                        }), e.isUndefined(c.get(n)) && c.put(n, !0), i.resolve();
                    }).error(function(e) {
                        i.reject(new Error('Unable to load template file "' + n + '": ' + e));
                    });
                }), o.all(u).then(function() {
                    a();
                }, function(e) {
                    a(e);
                });
            }, n.templatesLoader.ocLazyLoadLoader = !0, n;
        } ]);
    } ]);
}(angular), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, n) {
    var r;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var o = Object(this), t = o.length >>> 0;
    if (0 === t) return -1;
    var i = +n || 0;
    if (Math.abs(i) === 1 / 0 && (i = 0), i >= t) return -1;
    for (r = Math.max(i >= 0 ? i : t - Math.abs(i), 0); t > r; ) {
        if (r in o && o[r] === e) return r;
        r++;
    }
    return -1;
}), function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports["angular-file-upload"] = factory() : root["angular-file-upload"] = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: !1
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, CONFIG = _interopRequire(__webpack_require__(1)), options = _interopRequire(__webpack_require__(2)), serviceFileUploader = _interopRequire(__webpack_require__(3)), serviceFileLikeObject = _interopRequire(__webpack_require__(4)), serviceFileItem = _interopRequire(__webpack_require__(5)), serviceFileDirective = _interopRequire(__webpack_require__(6)), serviceFileSelect = _interopRequire(__webpack_require__(7)), serviceFileDrop = _interopRequire(__webpack_require__(8)), serviceFileOver = _interopRequire(__webpack_require__(9)), directiveFileSelect = _interopRequire(__webpack_require__(10)), directiveFileDrop = _interopRequire(__webpack_require__(11)), directiveFileOver = _interopRequire(__webpack_require__(12));
        angular.module(CONFIG.name, []).value("fileUploaderOptions", options).factory("FileUploader", serviceFileUploader).factory("FileLikeObject", serviceFileLikeObject).factory("FileItem", serviceFileItem).factory("FileDirective", serviceFileDirective).factory("FileSelect", serviceFileSelect).factory("FileDrop", serviceFileDrop).factory("FileOver", serviceFileOver).directive("nvFileSelect", directiveFileSelect).directive("nvFileDrop", directiveFileDrop).directive("nvFileOver", directiveFileOver).run([ "FileUploader", "FileLikeObject", "FileItem", "FileDirective", "FileSelect", "FileDrop", "FileOver", function(FileUploader, FileLikeObject, FileItem, FileDirective, FileSelect, FileDrop, FileOver) {
            FileUploader.FileLikeObject = FileLikeObject, FileUploader.FileItem = FileItem, 
            FileUploader.FileDirective = FileDirective, FileUploader.FileSelect = FileSelect, 
            FileUploader.FileDrop = FileDrop, FileUploader.FileOver = FileOver;
        } ]);
    }, function(module, exports) {
        module.exports = {
            name: "angularFileUpload"
        };
    }, function(module, exports) {
        "use strict";
        module.exports = {
            url: "/",
            alias: "file",
            headers: {},
            queue: [],
            progress: 0,
            autoUpload: !1,
            removeAfterUpload: !1,
            method: "POST",
            filters: [],
            formData: [],
            queueLimit: Number.MAX_VALUE,
            withCredentials: !1
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, copy = (_interopRequire(__webpack_require__(1)), angular.copy), extend = angular.extend, forEach = angular.forEach, isObject = angular.isObject, isNumber = angular.isNumber, isDefined = angular.isDefined, isArray = angular.isArray, element = angular.element;
        module.exports = function(fileUploaderOptions, $rootScope, $http, $window, FileLikeObject, FileItem) {
            var File = $window.File, FormData = $window.FormData, FileUploader = function() {
                function FileUploader(options) {
                    _classCallCheck(this, FileUploader);
                    var settings = copy(fileUploaderOptions);
                    extend(this, settings, options, {
                        isUploading: !1,
                        _nextIndex: 0,
                        _failFilterIndex: -1,
                        _directives: {
                            select: [],
                            drop: [],
                            over: []
                        }
                    }), this.filters.unshift({
                        name: "queueLimit",
                        fn: this._queueLimitFilter
                    }), this.filters.unshift({
                        name: "folder",
                        fn: this._folderFilter
                    });
                }
                return _createClass(FileUploader, {
                    addToQueue: {
                        value: function(files, options, filters) {
                            var _this = this, list = this.isArrayLikeObject(files) ? files : [ files ], arrayOfFilters = this._getFilters(filters), count = this.queue.length, addedFileItems = [];
                            forEach(list, function(some) {
                                var temp = new FileLikeObject(some);
                                if (_this._isValidFile(temp, arrayOfFilters, options)) {
                                    var fileItem = new FileItem(_this, some, options);
                                    addedFileItems.push(fileItem), _this.queue.push(fileItem), _this._onAfterAddingFile(fileItem);
                                } else {
                                    var filter = arrayOfFilters[_this._failFilterIndex];
                                    _this._onWhenAddingFileFailed(temp, filter, options);
                                }
                            }), this.queue.length !== count && (this._onAfterAddingAll(addedFileItems), this.progress = this._getTotalProgress()), 
                            this._render(), this.autoUpload && this.uploadAll();
                        }
                    },
                    removeFromQueue: {
                        value: function(value) {
                            var index = this.getIndexOfItem(value), item = this.queue[index];
                            item.isUploading && item.cancel(), this.queue.splice(index, 1), item._destroy(), 
                            this.progress = this._getTotalProgress();
                        }
                    },
                    clearQueue: {
                        value: function() {
                            for (;this.queue.length; ) this.queue[0].remove();
                            this.progress = 0;
                        }
                    },
                    uploadItem: {
                        value: function(value) {
                            var index = this.getIndexOfItem(value), item = this.queue[index], transport = this.isHTML5 ? "_xhrTransport" : "_iframeTransport";
                            item._prepareToUploading(), this.isUploading || (this.isUploading = !0, this[transport](item));
                        }
                    },
                    cancelItem: {
                        value: function(value) {
                            var index = this.getIndexOfItem(value), item = this.queue[index], prop = this.isHTML5 ? "_xhr" : "_form";
                            item && item.isUploading && item[prop].abort();
                        }
                    },
                    uploadAll: {
                        value: function() {
                            var items = this.getNotUploadedItems().filter(function(item) {
                                return !item.isUploading;
                            });
                            items.length && (forEach(items, function(item) {
                                return item._prepareToUploading();
                            }), items[0].upload());
                        }
                    },
                    cancelAll: {
                        value: function() {
                            var items = this.getNotUploadedItems();
                            forEach(items, function(item) {
                                return item.cancel();
                            });
                        }
                    },
                    isFile: {
                        value: function(value) {
                            return this.constructor.isFile(value);
                        }
                    },
                    isFileLikeObject: {
                        value: function(value) {
                            return this.constructor.isFileLikeObject(value);
                        }
                    },
                    isArrayLikeObject: {
                        value: function(value) {
                            return this.constructor.isArrayLikeObject(value);
                        }
                    },
                    getIndexOfItem: {
                        value: function(value) {
                            return isNumber(value) ? value : this.queue.indexOf(value);
                        }
                    },
                    getNotUploadedItems: {
                        value: function() {
                            return this.queue.filter(function(item) {
                                return !item.isUploaded;
                            });
                        }
                    },
                    getReadyItems: {
                        value: function() {
                            return this.queue.filter(function(item) {
                                return item.isReady && !item.isUploading;
                            }).sort(function(item1, item2) {
                                return item1.index - item2.index;
                            });
                        }
                    },
                    destroy: {
                        value: function() {
                            var _this = this;
                            forEach(this._directives, function(key) {
                                forEach(_this._directives[key], function(object) {
                                    object.destroy();
                                });
                            });
                        }
                    },
                    onAfterAddingAll: {
                        value: function(fileItems) {}
                    },
                    onAfterAddingFile: {
                        value: function(fileItem) {}
                    },
                    onWhenAddingFileFailed: {
                        value: function(item, filter, options) {}
                    },
                    onBeforeUploadItem: {
                        value: function(fileItem) {}
                    },
                    onProgressItem: {
                        value: function(fileItem, progress) {}
                    },
                    onProgressAll: {
                        value: function(progress) {}
                    },
                    onSuccessItem: {
                        value: function(item, response, status, headers) {}
                    },
                    onErrorItem: {
                        value: function(item, response, status, headers) {}
                    },
                    onCancelItem: {
                        value: function(item, response, status, headers) {}
                    },
                    onCompleteItem: {
                        value: function(item, response, status, headers) {}
                    },
                    onCompleteAll: {
                        value: function() {}
                    },
                    _getTotalProgress: {
                        value: function(value) {
                            if (this.removeAfterUpload) return value || 0;
                            var notUploaded = this.getNotUploadedItems().length, uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length, ratio = 100 / this.queue.length, current = (value || 0) * ratio / 100;
                            return Math.round(uploaded * ratio + current);
                        }
                    },
                    _getFilters: {
                        value: function(filters) {
                            if (!filters) return this.filters;
                            if (isArray(filters)) return filters;
                            var names = filters.match(/[^\s,]+/g);
                            return this.filters.filter(function(filter) {
                                return -1 !== names.indexOf(filter.name);
                            });
                        }
                    },
                    _render: {
                        value: function() {
                            $rootScope.$$phase || $rootScope.$apply();
                        }
                    },
                    _folderFilter: {
                        value: function(item) {
                            return !(!item.size && !item.type);
                        }
                    },
                    _queueLimitFilter: {
                        value: function() {
                            return this.queue.length < this.queueLimit;
                        }
                    },
                    _isValidFile: {
                        value: function(file, filters, options) {
                            var _this = this;
                            return this._failFilterIndex = -1, filters.length ? filters.every(function(filter) {
                                return _this._failFilterIndex++, filter.fn.call(_this, file, options);
                            }) : !0;
                        }
                    },
                    _isSuccessCode: {
                        value: function(status) {
                            return status >= 200 && 300 > status || 304 === status;
                        }
                    },
                    _transformResponse: {
                        value: function(response, headers) {
                            var headersGetter = this._headersGetter(headers);
                            return forEach($http.defaults.transformResponse, function(transformFn) {
                                response = transformFn(response, headersGetter);
                            }), response;
                        }
                    },
                    _parseHeaders: {
                        value: function(headers) {
                            var key, val, i, parsed = {};
                            return headers ? (forEach(headers.split("\n"), function(line) {
                                i = line.indexOf(":"), key = line.slice(0, i).trim().toLowerCase(), val = line.slice(i + 1).trim(), 
                                key && (parsed[key] = parsed[key] ? parsed[key] + ", " + val : val);
                            }), parsed) : parsed;
                        }
                    },
                    _headersGetter: {
                        value: function(parsedHeaders) {
                            return function(name) {
                                return name ? parsedHeaders[name.toLowerCase()] || null : parsedHeaders;
                            };
                        }
                    },
                    _xhrTransport: {
                        value: function(item) {
                            var _this = this, xhr = item._xhr = new XMLHttpRequest(), form = new FormData();
                            if (this._onBeforeUploadItem(item), forEach(item.formData, function(obj) {
                                forEach(obj, function(value, key) {
                                    form.append(key, value);
                                });
                            }), "number" != typeof item._file.size) throw new TypeError("The file specified is no longer valid");
                            form.append(item.alias, item._file, item.file.name), xhr.upload.onprogress = function(event) {
                                var progress = Math.round(event.lengthComputable ? 100 * event.loaded / event.total : 0);
                                _this._onProgressItem(item, progress);
                            }, xhr.onload = function() {
                                var headers = _this._parseHeaders(xhr.getAllResponseHeaders()), response = _this._transformResponse(xhr.response, headers), gist = _this._isSuccessCode(xhr.status) ? "Success" : "Error", method = "_on" + gist + "Item";
                                _this[method](item, response, xhr.status, headers), _this._onCompleteItem(item, response, xhr.status, headers);
                            }, xhr.onerror = function() {
                                var headers = _this._parseHeaders(xhr.getAllResponseHeaders()), response = _this._transformResponse(xhr.response, headers);
                                _this._onErrorItem(item, response, xhr.status, headers), _this._onCompleteItem(item, response, xhr.status, headers);
                            }, xhr.onabort = function() {
                                var headers = _this._parseHeaders(xhr.getAllResponseHeaders()), response = _this._transformResponse(xhr.response, headers);
                                _this._onCancelItem(item, response, xhr.status, headers), _this._onCompleteItem(item, response, xhr.status, headers);
                            }, xhr.open(item.method, item.url, !0), xhr.withCredentials = item.withCredentials, 
                            forEach(item.headers, function(value, name) {
                                xhr.setRequestHeader(name, value);
                            }), xhr.send(form), this._render();
                        }
                    },
                    _iframeTransport: {
                        value: function(item) {
                            var _this = this, form = element('<form style="display: none;" />'), iframe = element('<iframe name="iframeTransport' + Date.now() + '">'), input = item._input;
                            item._form && item._form.replaceWith(input), item._form = form, this._onBeforeUploadItem(item), 
                            input.prop("name", item.alias), forEach(item.formData, function(obj) {
                                forEach(obj, function(value, key) {
                                    var element_ = element('<input type="hidden" name="' + key + '" />');
                                    element_.val(value), form.append(element_);
                                });
                            }), form.prop({
                                action: item.url,
                                method: "POST",
                                target: iframe.prop("name"),
                                enctype: "multipart/form-data",
                                encoding: "multipart/form-data"
                            }), iframe.bind("load", function() {
                                var html = "", status = 200;
                                try {
                                    html = iframe[0].contentDocument.body.innerHTML;
                                } catch (e) {
                                    status = 500;
                                }
                                var xhr = {
                                    response: html,
                                    status: status,
                                    dummy: !0
                                }, headers = {}, response = _this._transformResponse(xhr.response, headers);
                                _this._onSuccessItem(item, response, xhr.status, headers), _this._onCompleteItem(item, response, xhr.status, headers);
                            }), form.abort = function() {
                                var response, xhr = {
                                    status: 0,
                                    dummy: !0
                                }, headers = {};
                                iframe.unbind("load").prop("src", "javascript:false;"), form.replaceWith(input), 
                                _this._onCancelItem(item, response, xhr.status, headers), _this._onCompleteItem(item, response, xhr.status, headers);
                            }, input.after(form), form.append(input).append(iframe), form[0].submit(), this._render();
                        }
                    },
                    _onWhenAddingFileFailed: {
                        value: function(item, filter, options) {
                            this.onWhenAddingFileFailed(item, filter, options);
                        }
                    },
                    _onAfterAddingFile: {
                        value: function(item) {
                            this.onAfterAddingFile(item);
                        }
                    },
                    _onAfterAddingAll: {
                        value: function(items) {
                            this.onAfterAddingAll(items);
                        }
                    },
                    _onBeforeUploadItem: {
                        value: function(item) {
                            item._onBeforeUpload(), this.onBeforeUploadItem(item);
                        }
                    },
                    _onProgressItem: {
                        value: function(item, progress) {
                            var total = this._getTotalProgress(progress);
                            this.progress = total, item._onProgress(progress), this.onProgressItem(item, progress), 
                            this.onProgressAll(total), this._render();
                        }
                    },
                    _onSuccessItem: {
                        value: function(item, response, status, headers) {
                            item._onSuccess(response, status, headers), this.onSuccessItem(item, response, status, headers);
                        }
                    },
                    _onErrorItem: {
                        value: function(item, response, status, headers) {
                            item._onError(response, status, headers), this.onErrorItem(item, response, status, headers);
                        }
                    },
                    _onCancelItem: {
                        value: function(item, response, status, headers) {
                            item._onCancel(response, status, headers), this.onCancelItem(item, response, status, headers);
                        }
                    },
                    _onCompleteItem: {
                        value: function(item, response, status, headers) {
                            item._onComplete(response, status, headers), this.onCompleteItem(item, response, status, headers);
                            var nextItem = this.getReadyItems()[0];
                            return this.isUploading = !1, isDefined(nextItem) ? void nextItem.upload() : (this.onCompleteAll(), 
                            this.progress = this._getTotalProgress(), void this._render());
                        }
                    }
                }, {
                    isFile: {
                        value: function(value) {
                            return File && value instanceof File;
                        }
                    },
                    isFileLikeObject: {
                        value: function(value) {
                            return value instanceof FileLikeObject;
                        }
                    },
                    isArrayLikeObject: {
                        value: function(value) {
                            return isObject(value) && "length" in value;
                        }
                    },
                    inherit: {
                        value: function(target, source) {
                            target.prototype = Object.create(source.prototype), target.prototype.constructor = target, 
                            target.super_ = source;
                        }
                    }
                }), FileUploader;
            }();
            return FileUploader.prototype.isHTML5 = !(!File || !FormData), FileUploader.isHTML5 = FileUploader.prototype.isHTML5, 
            FileUploader;
        }, module.exports.$inject = [ "fileUploaderOptions", "$rootScope", "$http", "$window", "FileLikeObject", "FileItem" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, copy = (_interopRequire(__webpack_require__(1)), angular.copy), isElement = angular.isElement, isString = angular.isString;
        module.exports = function() {
            var FileLikeObject = function() {
                function FileLikeObject(fileOrInput) {
                    _classCallCheck(this, FileLikeObject);
                    var isInput = isElement(fileOrInput), fakePathOrObject = isInput ? fileOrInput.value : fileOrInput, postfix = isString(fakePathOrObject) ? "FakePath" : "Object", method = "_createFrom" + postfix;
                    this[method](fakePathOrObject);
                }
                return _createClass(FileLikeObject, {
                    _createFromFakePath: {
                        value: function(path) {
                            this.lastModifiedDate = null, this.size = null, this.type = "like/" + path.slice(path.lastIndexOf(".") + 1).toLowerCase(), 
                            this.name = path.slice(path.lastIndexOf("/") + path.lastIndexOf("\\") + 2);
                        }
                    },
                    _createFromObject: {
                        value: function(object) {
                            this.lastModifiedDate = copy(object.lastModifiedDate), this.size = object.size, 
                            this.type = object.type, this.name = object.name;
                        }
                    }
                }), FileLikeObject;
            }();
            return FileLikeObject;
        }, module.exports.$inject = [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, copy = (_interopRequire(__webpack_require__(1)), angular.copy), extend = angular.extend, element = angular.element, isElement = angular.isElement;
        module.exports = function($compile, FileLikeObject) {
            var FileItem = function() {
                function FileItem(uploader, some, options) {
                    _classCallCheck(this, FileItem);
                    var isInput = isElement(some), input = isInput ? element(some) : null, file = isInput ? null : some;
                    extend(this, {
                        url: uploader.url,
                        alias: uploader.alias,
                        headers: copy(uploader.headers),
                        formData: copy(uploader.formData),
                        removeAfterUpload: uploader.removeAfterUpload,
                        withCredentials: uploader.withCredentials,
                        method: uploader.method
                    }, options, {
                        uploader: uploader,
                        file: new FileLikeObject(some),
                        isReady: !1,
                        isUploading: !1,
                        isUploaded: !1,
                        isSuccess: !1,
                        isCancel: !1,
                        isError: !1,
                        progress: 0,
                        index: null,
                        _file: file,
                        _input: input
                    }), input && this._replaceNode(input);
                }
                return _createClass(FileItem, {
                    upload: {
                        value: function() {
                            try {
                                this.uploader.uploadItem(this);
                            } catch (e) {
                                this.uploader._onCompleteItem(this, "", 0, []), this.uploader._onErrorItem(this, "", 0, []);
                            }
                        }
                    },
                    cancel: {
                        value: function() {
                            this.uploader.cancelItem(this);
                        }
                    },
                    remove: {
                        value: function() {
                            this.uploader.removeFromQueue(this);
                        }
                    },
                    onBeforeUpload: {
                        value: function() {}
                    },
                    onProgress: {
                        value: function(progress) {}
                    },
                    onSuccess: {
                        value: function(response, status, headers) {}
                    },
                    onError: {
                        value: function(response, status, headers) {}
                    },
                    onCancel: {
                        value: function(response, status, headers) {}
                    },
                    onComplete: {
                        value: function(response, status, headers) {}
                    },
                    _onBeforeUpload: {
                        value: function() {
                            this.isReady = !0, this.isUploading = !0, this.isUploaded = !1, this.isSuccess = !1, 
                            this.isCancel = !1, this.isError = !1, this.progress = 0, this.onBeforeUpload();
                        }
                    },
                    _onProgress: {
                        value: function(progress) {
                            this.progress = progress, this.onProgress(progress);
                        }
                    },
                    _onSuccess: {
                        value: function(response, status, headers) {
                            this.isReady = !1, this.isUploading = !1, this.isUploaded = !0, this.isSuccess = !0, 
                            this.isCancel = !1, this.isError = !1, this.progress = 100, this.index = null, this.onSuccess(response, status, headers);
                        }
                    },
                    _onError: {
                        value: function(response, status, headers) {
                            this.isReady = !1, this.isUploading = !1, this.isUploaded = !0, this.isSuccess = !1, 
                            this.isCancel = !1, this.isError = !0, this.progress = 0, this.index = null, this.onError(response, status, headers);
                        }
                    },
                    _onCancel: {
                        value: function(response, status, headers) {
                            this.isReady = !1, this.isUploading = !1, this.isUploaded = !1, this.isSuccess = !1, 
                            this.isCancel = !0, this.isError = !1, this.progress = 0, this.index = null, this.onCancel(response, status, headers);
                        }
                    },
                    _onComplete: {
                        value: function(response, status, headers) {
                            this.onComplete(response, status, headers), this.removeAfterUpload && this.remove();
                        }
                    },
                    _destroy: {
                        value: function() {
                            this._input && this._input.remove(), this._form && this._form.remove(), delete this._form, 
                            delete this._input;
                        }
                    },
                    _prepareToUploading: {
                        value: function() {
                            this.index = this.index || ++this.uploader._nextIndex, this.isReady = !0;
                        }
                    },
                    _replaceNode: {
                        value: function(input) {
                            var clone = $compile(input.clone())(input.scope());
                            clone.prop("value", null), input.css("display", "none"), input.after(clone);
                        }
                    }
                }), FileItem;
            }();
            return FileItem;
        }, module.exports.$inject = [ "$compile", "FileLikeObject" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, extend = (_interopRequire(__webpack_require__(1)), angular.extend);
        module.exports = function() {
            var FileDirective = function() {
                function FileDirective(options) {
                    _classCallCheck(this, FileDirective), extend(this, options), this.uploader._directives[this.prop].push(this), 
                    this._saveLinks(), this.bind();
                }
                return _createClass(FileDirective, {
                    bind: {
                        value: function() {
                            for (var key in this.events) {
                                var prop = this.events[key];
                                this.element.bind(key, this[prop]);
                            }
                        }
                    },
                    unbind: {
                        value: function() {
                            for (var key in this.events) this.element.unbind(key, this.events[key]);
                        }
                    },
                    destroy: {
                        value: function() {
                            var index = this.uploader._directives[this.prop].indexOf(this);
                            this.uploader._directives[this.prop].splice(index, 1), this.unbind();
                        }
                    },
                    _saveLinks: {
                        value: function() {
                            for (var key in this.events) {
                                var prop = this.events[key];
                                this[prop] = this[prop].bind(this);
                            }
                        }
                    }
                }), FileDirective;
            }();
            return FileDirective.prototype.events = {}, FileDirective;
        }, module.exports.$inject = [];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _get = function get(object, property, receiver) {
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc && desc.writable) return desc.value;
            var getter = desc.get;
            return void 0 === getter ? void 0 : getter.call(receiver);
        }, _inherits = function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (subClass.__proto__ = superClass);
        }, _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, extend = (_interopRequire(__webpack_require__(1)), angular.extend);
        module.exports = function(FileDirective) {
            var FileSelect = function(_FileDirective) {
                function FileSelect(options) {
                    _classCallCheck(this, FileSelect);
                    var extendedOptions = extend(options, {
                        events: {
                            $destroy: "destroy",
                            change: "onChange"
                        },
                        prop: "select"
                    });
                    _get(Object.getPrototypeOf(FileSelect.prototype), "constructor", this).call(this, extendedOptions), 
                    this.uploader.isHTML5 || this.element.removeAttr("multiple"), this.element.prop("value", null);
                }
                return _inherits(FileSelect, _FileDirective), _createClass(FileSelect, {
                    getOptions: {
                        value: function() {}
                    },
                    getFilters: {
                        value: function() {}
                    },
                    isEmptyAfterSelection: {
                        value: function() {
                            return !!this.element.attr("multiple");
                        }
                    },
                    onChange: {
                        value: function() {
                            var files = this.uploader.isHTML5 ? this.element[0].files : this.element[0], options = this.getOptions(), filters = this.getFilters();
                            this.uploader.isHTML5 || this.destroy(), this.uploader.addToQueue(files, options, filters), 
                            this.isEmptyAfterSelection() && (this.element.prop("value", null), this.element.replaceWith(this.element = this.element.clone(!0)));
                        }
                    }
                }), FileSelect;
            }(FileDirective);
            return FileSelect;
        }, module.exports.$inject = [ "FileDirective" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _get = function get(object, property, receiver) {
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc && desc.writable) return desc.value;
            var getter = desc.get;
            return void 0 === getter ? void 0 : getter.call(receiver);
        }, _inherits = function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (subClass.__proto__ = superClass);
        }, _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, extend = (_interopRequire(__webpack_require__(1)), angular.extend), forEach = angular.forEach;
        module.exports = function(FileDirective) {
            var FileDrop = function(_FileDirective) {
                function FileDrop(options) {
                    _classCallCheck(this, FileDrop);
                    var extendedOptions = extend(options, {
                        events: {
                            $destroy: "destroy",
                            drop: "onDrop",
                            dragover: "onDragOver",
                            dragleave: "onDragLeave"
                        },
                        prop: "drop"
                    });
                    _get(Object.getPrototypeOf(FileDrop.prototype), "constructor", this).call(this, extendedOptions);
                }
                return _inherits(FileDrop, _FileDirective), _createClass(FileDrop, {
                    getOptions: {
                        value: function() {}
                    },
                    getFilters: {
                        value: function() {}
                    },
                    onDrop: {
                        value: function(event) {
                            var transfer = this._getTransfer(event);
                            if (transfer) {
                                var options = this.getOptions(), filters = this.getFilters();
                                this._preventAndStop(event), forEach(this.uploader._directives.over, this._removeOverClass, this), 
                                this.uploader.addToQueue(transfer.files, options, filters);
                            }
                        }
                    },
                    onDragOver: {
                        value: function(event) {
                            var transfer = this._getTransfer(event);
                            this._haveFiles(transfer.types) && (transfer.dropEffect = "copy", this._preventAndStop(event), 
                            forEach(this.uploader._directives.over, this._addOverClass, this));
                        }
                    },
                    onDragLeave: {
                        value: function(event) {
                            event.currentTarget !== this.element[0] && (this._preventAndStop(event), forEach(this.uploader._directives.over, this._removeOverClass, this));
                        }
                    },
                    _getTransfer: {
                        value: function(event) {
                            return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
                        }
                    },
                    _preventAndStop: {
                        value: function(event) {
                            event.preventDefault(), event.stopPropagation();
                        }
                    },
                    _haveFiles: {
                        value: function(types) {
                            return types ? types.indexOf ? -1 !== types.indexOf("Files") : types.contains ? types.contains("Files") : !1 : !1;
                        }
                    },
                    _addOverClass: {
                        value: function(item) {
                            item.addOverClass();
                        }
                    },
                    _removeOverClass: {
                        value: function(item) {
                            item.removeOverClass();
                        }
                    }
                }), FileDrop;
            }(FileDirective);
            return FileDrop;
        }, module.exports.$inject = [ "FileDirective" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var key in props) {
                    var prop = props[key];
                    prop.configurable = !0, prop.value && (prop.writable = !0);
                }
                Object.defineProperties(target, props);
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _get = function get(object, property, receiver) {
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc && desc.writable) return desc.value;
            var getter = desc.get;
            return void 0 === getter ? void 0 : getter.call(receiver);
        }, _inherits = function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (subClass.__proto__ = superClass);
        }, _classCallCheck = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }, extend = (_interopRequire(__webpack_require__(1)), angular.extend);
        module.exports = function(FileDirective) {
            var FileOver = function(_FileDirective) {
                function FileOver(options) {
                    _classCallCheck(this, FileOver);
                    var extendedOptions = extend(options, {
                        events: {
                            $destroy: "destroy"
                        },
                        prop: "over",
                        overClass: "nv-file-over"
                    });
                    _get(Object.getPrototypeOf(FileOver.prototype), "constructor", this).call(this, extendedOptions);
                }
                return _inherits(FileOver, _FileDirective), _createClass(FileOver, {
                    addOverClass: {
                        value: function() {
                            this.element.addClass(this.getOverClass());
                        }
                    },
                    removeOverClass: {
                        value: function() {
                            this.element.removeClass(this.getOverClass());
                        }
                    },
                    getOverClass: {
                        value: function() {
                            return this.overClass;
                        }
                    }
                }), FileOver;
            }(FileDirective);
            return FileOver;
        }, module.exports.$inject = [ "FileDirective" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        };
        _interopRequire(__webpack_require__(1));
        module.exports = function($parse, FileUploader, FileSelect) {
            return {
                link: function(scope, element, attributes) {
                    var uploader = scope.$eval(attributes.uploader);
                    if (!(uploader instanceof FileUploader)) throw new TypeError('"Uploader" must be an instance of FileUploader');
                    var object = new FileSelect({
                        uploader: uploader,
                        element: element
                    });
                    object.getOptions = $parse(attributes.options).bind(object, scope), object.getFilters = function() {
                        return attributes.filters;
                    };
                }
            };
        }, module.exports.$inject = [ "$parse", "FileUploader", "FileSelect" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        };
        _interopRequire(__webpack_require__(1));
        module.exports = function($parse, FileUploader, FileDrop) {
            return {
                link: function(scope, element, attributes) {
                    var uploader = scope.$eval(attributes.uploader);
                    if (!(uploader instanceof FileUploader)) throw new TypeError('"Uploader" must be an instance of FileUploader');
                    if (uploader.isHTML5) {
                        var object = new FileDrop({
                            uploader: uploader,
                            element: element
                        });
                        object.getOptions = $parse(attributes.options).bind(object, scope), object.getFilters = function() {
                            return attributes.filters;
                        };
                    }
                }
            };
        }, module.exports.$inject = [ "$parse", "FileUploader", "FileDrop" ];
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _interopRequire = function(obj) {
            return obj && obj.__esModule ? obj["default"] : obj;
        };
        _interopRequire(__webpack_require__(1));
        module.exports = function(FileUploader, FileOver) {
            return {
                link: function(scope, element, attributes) {
                    var uploader = scope.$eval(attributes.uploader);
                    if (!(uploader instanceof FileUploader)) throw new TypeError('"Uploader" must be an instance of FileUploader');
                    var object = new FileOver({
                        uploader: uploader,
                        element: element
                    });
                    object.getOverClass = function() {
                        return attributes.overClass || object.overClass;
                    };
                }
            };
        }, module.exports.$inject = [ "FileUploader", "FileOver" ];
    } ]);
}), !function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.io = e();
    }
}(function() {
    var define;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'");
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, f, f.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(_dereq_, module, exports) {
            module.exports = _dereq_("./lib/");
        }, {
            "./lib/": 2
        } ],
        2: [ function(_dereq_, module, exports) {
            function lookup(uri, opts) {
                "object" == typeof uri && (opts = uri, uri = void 0), opts = opts || {};
                var io, parsed = url(uri), source = parsed.source, id = parsed.id;
                return opts.forceNew || opts["force new connection"] || !1 === opts.multiplex ? (debug("ignoring socket cache for %s", source), 
                io = Manager(source, opts)) : (cache[id] || (debug("new io instance for %s", source), 
                cache[id] = Manager(source, opts)), io = cache[id]), io.socket(parsed.path);
            }
            var url = _dereq_("./url"), parser = _dereq_("socket.io-parser"), Manager = _dereq_("./manager"), debug = _dereq_("debug")("socket.io-client");
            module.exports = exports = lookup;
            var cache = exports.managers = {};
            exports.protocol = parser.protocol, exports.connect = lookup, exports.Manager = _dereq_("./manager"), 
            exports.Socket = _dereq_("./socket");
        }, {
            "./manager": 3,
            "./socket": 5,
            "./url": 6,
            debug: 10,
            "socket.io-parser": 44
        } ],
        3: [ function(_dereq_, module, exports) {
            function Manager(uri, opts) {
                return this instanceof Manager ? (uri && "object" == typeof uri && (opts = uri, 
                uri = void 0), opts = opts || {}, opts.path = opts.path || "/socket.io", this.nsps = {}, 
                this.subs = [], this.opts = opts, this.reconnection(opts.reconnection !== !1), this.reconnectionAttempts(opts.reconnectionAttempts || 1 / 0), 
                this.reconnectionDelay(opts.reconnectionDelay || 1e3), this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3), 
                this.randomizationFactor(opts.randomizationFactor || .5), this.backoff = new Backoff({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == opts.timeout ? 2e4 : opts.timeout), this.readyState = "closed", 
                this.uri = uri, this.connected = [], this.encoding = !1, this.packetBuffer = [], 
                this.encoder = new parser.Encoder(), this.decoder = new parser.Decoder(), this.autoConnect = opts.autoConnect !== !1, 
                void (this.autoConnect && this.open())) : new Manager(uri, opts);
            }
            var eio = (_dereq_("./url"), _dereq_("engine.io-client")), Socket = _dereq_("./socket"), Emitter = _dereq_("component-emitter"), parser = _dereq_("socket.io-parser"), on = _dereq_("./on"), bind = _dereq_("component-bind"), debug = (_dereq_("object-component"), 
            _dereq_("debug")("socket.io-client:manager")), indexOf = _dereq_("indexof"), Backoff = _dereq_("backo2");
            module.exports = Manager, Manager.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var nsp in this.nsps) this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
            }, Manager.prototype.updateSocketIds = function() {
                for (var nsp in this.nsps) this.nsps[nsp].id = this.engine.id;
            }, Emitter(Manager.prototype), Manager.prototype.reconnection = function(v) {
                return arguments.length ? (this._reconnection = !!v, this) : this._reconnection;
            }, Manager.prototype.reconnectionAttempts = function(v) {
                return arguments.length ? (this._reconnectionAttempts = v, this) : this._reconnectionAttempts;
            }, Manager.prototype.reconnectionDelay = function(v) {
                return arguments.length ? (this._reconnectionDelay = v, this.backoff && this.backoff.setMin(v), 
                this) : this._reconnectionDelay;
            }, Manager.prototype.randomizationFactor = function(v) {
                return arguments.length ? (this._randomizationFactor = v, this.backoff && this.backoff.setJitter(v), 
                this) : this._randomizationFactor;
            }, Manager.prototype.reconnectionDelayMax = function(v) {
                return arguments.length ? (this._reconnectionDelayMax = v, this.backoff && this.backoff.setMax(v), 
                this) : this._reconnectionDelayMax;
            }, Manager.prototype.timeout = function(v) {
                return arguments.length ? (this._timeout = v, this) : this._timeout;
            }, Manager.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
            }, Manager.prototype.open = Manager.prototype.connect = function(fn) {
                if (debug("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                debug("opening %s", this.uri), this.engine = eio(this.uri, this.opts);
                var socket = this.engine, self = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var openSub = on(socket, "open", function() {
                    self.onopen(), fn && fn();
                }), errorSub = on(socket, "error", function(data) {
                    if (debug("connect_error"), self.cleanup(), self.readyState = "closed", self.emitAll("connect_error", data), 
                    fn) {
                        var err = new Error("Connection error");
                        err.data = data, fn(err);
                    } else self.maybeReconnectOnOpen();
                });
                if (!1 !== this._timeout) {
                    var timeout = this._timeout;
                    debug("connect attempt will timeout after %d", timeout);
                    var timer = setTimeout(function() {
                        debug("connect attempt timed out after %d", timeout), openSub.destroy(), socket.close(), 
                        socket.emit("error", "timeout"), self.emitAll("connect_timeout", timeout);
                    }, timeout);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(timer);
                        }
                    });
                }
                return this.subs.push(openSub), this.subs.push(errorSub), this;
            }, Manager.prototype.onopen = function() {
                debug("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var socket = this.engine;
                this.subs.push(on(socket, "data", bind(this, "ondata"))), this.subs.push(on(this.decoder, "decoded", bind(this, "ondecoded"))), 
                this.subs.push(on(socket, "error", bind(this, "onerror"))), this.subs.push(on(socket, "close", bind(this, "onclose")));
            }, Manager.prototype.ondata = function(data) {
                this.decoder.add(data);
            }, Manager.prototype.ondecoded = function(packet) {
                this.emit("packet", packet);
            }, Manager.prototype.onerror = function(err) {
                debug("error", err), this.emitAll("error", err);
            }, Manager.prototype.socket = function(nsp) {
                var socket = this.nsps[nsp];
                if (!socket) {
                    socket = new Socket(this, nsp), this.nsps[nsp] = socket;
                    var self = this;
                    socket.on("connect", function() {
                        socket.id = self.engine.id, ~indexOf(self.connected, socket) || self.connected.push(socket);
                    });
                }
                return socket;
            }, Manager.prototype.destroy = function(socket) {
                var index = indexOf(this.connected, socket);
                ~index && this.connected.splice(index, 1), this.connected.length || this.close();
            }, Manager.prototype.packet = function(packet) {
                debug("writing packet %j", packet);
                var self = this;
                self.encoding ? self.packetBuffer.push(packet) : (self.encoding = !0, this.encoder.encode(packet, function(encodedPackets) {
                    for (var i = 0; i < encodedPackets.length; i++) self.engine.write(encodedPackets[i]);
                    self.encoding = !1, self.processPacketQueue();
                }));
            }, Manager.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var pack = this.packetBuffer.shift();
                    this.packet(pack);
                }
            }, Manager.prototype.cleanup = function() {
                for (var sub; sub = this.subs.shift(); ) sub.destroy();
                this.packetBuffer = [], this.encoding = !1, this.decoder.destroy();
            }, Manager.prototype.close = Manager.prototype.disconnect = function() {
                this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
            }, Manager.prototype.onclose = function(reason) {
                debug("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", 
                this.emit("close", reason), this._reconnection && !this.skipReconnect && this.reconnect();
            }, Manager.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect) return this;
                var self = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) debug("reconnect failed"), 
                this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                    var delay = this.backoff.duration();
                    debug("will wait %dms before reconnect attempt", delay), this.reconnecting = !0;
                    var timer = setTimeout(function() {
                        self.skipReconnect || (debug("attempting reconnect"), self.emitAll("reconnect_attempt", self.backoff.attempts), 
                        self.emitAll("reconnecting", self.backoff.attempts), self.skipReconnect || self.open(function(err) {
                            err ? (debug("reconnect attempt error"), self.reconnecting = !1, self.reconnect(), 
                            self.emitAll("reconnect_error", err.data)) : (debug("reconnect success"), self.onreconnect());
                        }));
                    }, delay);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(timer);
                        }
                    });
                }
            }, Manager.prototype.onreconnect = function() {
                var attempt = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", attempt);
            };
        }, {
            "./on": 4,
            "./socket": 5,
            "./url": 6,
            backo2: 7,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "engine.io-client": 11,
            indexof: 40,
            "object-component": 41,
            "socket.io-parser": 44
        } ],
        4: [ function(_dereq_, module, exports) {
            function on(obj, ev, fn) {
                return obj.on(ev, fn), {
                    destroy: function() {
                        obj.removeListener(ev, fn);
                    }
                };
            }
            module.exports = on;
        }, {} ],
        5: [ function(_dereq_, module, exports) {
            function Socket(io, nsp) {
                this.io = io, this.nsp = nsp, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), 
                this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0;
            }
            var parser = _dereq_("socket.io-parser"), Emitter = _dereq_("component-emitter"), toArray = _dereq_("to-array"), on = _dereq_("./on"), bind = _dereq_("component-bind"), debug = _dereq_("debug")("socket.io-client:socket"), hasBin = _dereq_("has-binary");
            module.exports = exports = Socket;
            var events = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1
            }, emit = Emitter.prototype.emit;
            Emitter(Socket.prototype), Socket.prototype.subEvents = function() {
                if (!this.subs) {
                    var io = this.io;
                    this.subs = [ on(io, "open", bind(this, "onopen")), on(io, "packet", bind(this, "onpacket")), on(io, "close", bind(this, "onclose")) ];
                }
            }, Socket.prototype.open = Socket.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), 
                this);
            }, Socket.prototype.send = function() {
                var args = toArray(arguments);
                return args.unshift("message"), this.emit.apply(this, args), this;
            }, Socket.prototype.emit = function(ev) {
                if (events.hasOwnProperty(ev)) return emit.apply(this, arguments), this;
                var args = toArray(arguments), parserType = parser.EVENT;
                hasBin(args) && (parserType = parser.BINARY_EVENT);
                var packet = {
                    type: parserType,
                    data: args
                };
                return "function" == typeof args[args.length - 1] && (debug("emitting packet with ack id %d", this.ids), 
                this.acks[this.ids] = args.pop(), packet.id = this.ids++), this.connected ? this.packet(packet) : this.sendBuffer.push(packet), 
                this;
            }, Socket.prototype.packet = function(packet) {
                packet.nsp = this.nsp, this.io.packet(packet);
            }, Socket.prototype.onopen = function() {
                debug("transport is open - connecting"), "/" != this.nsp && this.packet({
                    type: parser.CONNECT
                });
            }, Socket.prototype.onclose = function(reason) {
                debug("close (%s)", reason), this.connected = !1, this.disconnected = !0, delete this.id, 
                this.emit("disconnect", reason);
            }, Socket.prototype.onpacket = function(packet) {
                if (packet.nsp == this.nsp) switch (packet.type) {
                  case parser.CONNECT:
                    this.onconnect();
                    break;

                  case parser.EVENT:
                    this.onevent(packet);
                    break;

                  case parser.BINARY_EVENT:
                    this.onevent(packet);
                    break;

                  case parser.ACK:
                    this.onack(packet);
                    break;

                  case parser.BINARY_ACK:
                    this.onack(packet);
                    break;

                  case parser.DISCONNECT:
                    this.ondisconnect();
                    break;

                  case parser.ERROR:
                    this.emit("error", packet.data);
                }
            }, Socket.prototype.onevent = function(packet) {
                var args = packet.data || [];
                debug("emitting event %j", args), null != packet.id && (debug("attaching ack callback to event"), 
                args.push(this.ack(packet.id))), this.connected ? emit.apply(this, args) : this.receiveBuffer.push(args);
            }, Socket.prototype.ack = function(id) {
                var self = this, sent = !1;
                return function() {
                    if (!sent) {
                        sent = !0;
                        var args = toArray(arguments);
                        debug("sending ack %j", args);
                        var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
                        self.packet({
                            type: type,
                            id: id,
                            data: args
                        });
                    }
                };
            }, Socket.prototype.onack = function(packet) {
                debug("calling ack %s with %j", packet.id, packet.data);
                var fn = this.acks[packet.id];
                fn.apply(this, packet.data), delete this.acks[packet.id];
            }, Socket.prototype.onconnect = function() {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
            }, Socket.prototype.emitBuffered = function() {
                var i;
                for (i = 0; i < this.receiveBuffer.length; i++) emit.apply(this, this.receiveBuffer[i]);
                for (this.receiveBuffer = [], i = 0; i < this.sendBuffer.length; i++) this.packet(this.sendBuffer[i]);
                this.sendBuffer = [];
            }, Socket.prototype.ondisconnect = function() {
                debug("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
            }, Socket.prototype.destroy = function() {
                if (this.subs) {
                    for (var i = 0; i < this.subs.length; i++) this.subs[i].destroy();
                    this.subs = null;
                }
                this.io.destroy(this);
            }, Socket.prototype.close = Socket.prototype.disconnect = function() {
                return this.connected && (debug("performing disconnect (%s)", this.nsp), this.packet({
                    type: parser.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
            };
        }, {
            "./on": 4,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "has-binary": 36,
            "socket.io-parser": 44,
            "to-array": 48
        } ],
        6: [ function(_dereq_, module, exports) {
            (function(global) {
                function url(uri, loc) {
                    var obj = uri, loc = loc || global.location;
                    return null == uri && (uri = loc.protocol + "//" + loc.host), "string" == typeof uri && ("/" == uri.charAt(0) && (uri = "/" == uri.charAt(1) ? loc.protocol + uri : loc.hostname + uri), 
                    /^(https?|wss?):\/\//.test(uri) || (debug("protocol-less url %s", uri), uri = "undefined" != typeof loc ? loc.protocol + "//" + uri : "https://" + uri), 
                    debug("parse %s", uri), obj = parseuri(uri)), obj.port || (/^(http|ws)$/.test(obj.protocol) ? obj.port = "80" : /^(http|ws)s$/.test(obj.protocol) && (obj.port = "443")), 
                    obj.path = obj.path || "/", obj.id = obj.protocol + "://" + obj.host + ":" + obj.port, 
                    obj.href = obj.protocol + "://" + obj.host + (loc && loc.port == obj.port ? "" : ":" + obj.port), 
                    obj;
                }
                var parseuri = _dereq_("parseuri"), debug = _dereq_("debug")("socket.io-client:url");
                module.exports = url;
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            debug: 10,
            parseuri: 42
        } ],
        7: [ function(_dereq_, module, exports) {
            function Backoff(opts) {
                opts = opts || {}, this.ms = opts.min || 100, this.max = opts.max || 1e4, this.factor = opts.factor || 2, 
                this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0, this.attempts = 0;
            }
            module.exports = Backoff, Backoff.prototype.duration = function() {
                var ms = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var rand = Math.random(), deviation = Math.floor(rand * this.jitter * ms);
                    ms = 0 == (1 & Math.floor(10 * rand)) ? ms - deviation : ms + deviation;
                }
                return 0 | Math.min(ms, this.max);
            }, Backoff.prototype.reset = function() {
                this.attempts = 0;
            }, Backoff.prototype.setMin = function(min) {
                this.ms = min;
            }, Backoff.prototype.setMax = function(max) {
                this.max = max;
            }, Backoff.prototype.setJitter = function(jitter) {
                this.jitter = jitter;
            };
        }, {} ],
        8: [ function(_dereq_, module, exports) {
            var slice = [].slice;
            module.exports = function(obj, fn) {
                if ("string" == typeof fn && (fn = obj[fn]), "function" != typeof fn) throw new Error("bind() requires a function");
                var args = slice.call(arguments, 2);
                return function() {
                    return fn.apply(obj, args.concat(slice.call(arguments)));
                };
            };
        }, {} ],
        9: [ function(_dereq_, module, exports) {
            function Emitter(obj) {
                return obj ? mixin(obj) : void 0;
            }
            function mixin(obj) {
                for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
                return obj;
            }
            module.exports = Emitter, Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[event] = this._callbacks[event] || []).push(fn), 
                this;
            }, Emitter.prototype.once = function(event, fn) {
                function on() {
                    self.off(event, on), fn.apply(this, arguments);
                }
                var self = this;
                return this._callbacks = this._callbacks || {}, on.fn = fn, this.on(event, on), 
                this;
            }, Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
                this;
                var callbacks = this._callbacks[event];
                if (!callbacks) return this;
                if (1 == arguments.length) return delete this._callbacks[event], this;
                for (var cb, i = 0; i < callbacks.length; i++) if (cb = callbacks[i], cb === fn || cb.fn === fn) {
                    callbacks.splice(i, 1);
                    break;
                }
                return this;
            }, Emitter.prototype.emit = function(event) {
                this._callbacks = this._callbacks || {};
                var args = [].slice.call(arguments, 1), callbacks = this._callbacks[event];
                if (callbacks) {
                    callbacks = callbacks.slice(0);
                    for (var i = 0, len = callbacks.length; len > i; ++i) callbacks[i].apply(this, args);
                }
                return this;
            }, Emitter.prototype.listeners = function(event) {
                return this._callbacks = this._callbacks || {}, this._callbacks[event] || [];
            }, Emitter.prototype.hasListeners = function(event) {
                return !!this.listeners(event).length;
            };
        }, {} ],
        10: [ function(_dereq_, module, exports) {
            function debug(name) {
                return debug.enabled(name) ? function(fmt) {
                    fmt = coerce(fmt);
                    var curr = new Date(), ms = curr - (debug[name] || curr);
                    debug[name] = curr, fmt = name + " " + fmt + " +" + debug.humanize(ms), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments);
                } : function() {};
            }
            function coerce(val) {
                return val instanceof Error ? val.stack || val.message : val;
            }
            module.exports = debug, debug.names = [], debug.skips = [], debug.enable = function(name) {
                try {
                    localStorage.debug = name;
                } catch (e) {}
                for (var split = (name || "").split(/[\s,]+/), len = split.length, i = 0; len > i; i++) name = split[i].replace("*", ".*?"), 
                "-" === name[0] ? debug.skips.push(new RegExp("^" + name.substr(1) + "$")) : debug.names.push(new RegExp("^" + name + "$"));
            }, debug.disable = function() {
                debug.enable("");
            }, debug.humanize = function(ms) {
                var sec = 1e3, min = 6e4, hour = 60 * min;
                return ms >= hour ? (ms / hour).toFixed(1) + "h" : ms >= min ? (ms / min).toFixed(1) + "m" : ms >= sec ? (ms / sec | 0) + "s" : ms + "ms";
            }, debug.enabled = function(name) {
                for (var i = 0, len = debug.skips.length; len > i; i++) if (debug.skips[i].test(name)) return !1;
                for (var i = 0, len = debug.names.length; len > i; i++) if (debug.names[i].test(name)) return !0;
                return !1;
            };
            try {
                window.localStorage && debug.enable(localStorage.debug);
            } catch (e) {}
        }, {} ],
        11: [ function(_dereq_, module, exports) {
            module.exports = _dereq_("./lib/");
        }, {
            "./lib/": 12
        } ],
        12: [ function(_dereq_, module, exports) {
            module.exports = _dereq_("./socket"), module.exports.parser = _dereq_("engine.io-parser");
        }, {
            "./socket": 13,
            "engine.io-parser": 25
        } ],
        13: [ function(_dereq_, module, exports) {
            (function(global) {
                function Socket(uri, opts) {
                    if (!(this instanceof Socket)) return new Socket(uri, opts);
                    if (opts = opts || {}, uri && "object" == typeof uri && (opts = uri, uri = null), 
                    uri && (uri = parseuri(uri), opts.host = uri.host, opts.secure = "https" == uri.protocol || "wss" == uri.protocol, 
                    opts.port = uri.port, uri.query && (opts.query = uri.query)), this.secure = null != opts.secure ? opts.secure : global.location && "https:" == location.protocol, 
                    opts.host) {
                        var pieces = opts.host.split(":");
                        opts.hostname = pieces.shift(), pieces.length ? opts.port = pieces.pop() : opts.port || (opts.port = this.secure ? "443" : "80");
                    }
                    this.agent = opts.agent || !1, this.hostname = opts.hostname || (global.location ? location.hostname : "localhost"), 
                    this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80), 
                    this.query = opts.query || {}, "string" == typeof this.query && (this.query = parseqs.decode(this.query)), 
                    this.upgrade = !1 !== opts.upgrade, this.path = (opts.path || "/engine.io").replace(/\/$/, "") + "/", 
                    this.forceJSONP = !!opts.forceJSONP, this.jsonp = !1 !== opts.jsonp, this.forceBase64 = !!opts.forceBase64, 
                    this.enablesXDR = !!opts.enablesXDR, this.timestampParam = opts.timestampParam || "t", 
                    this.timestampRequests = opts.timestampRequests, this.transports = opts.transports || [ "polling", "websocket" ], 
                    this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = opts.policyPort || 843, 
                    this.rememberUpgrade = opts.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades, 
                    this.pfx = opts.pfx || null, this.key = opts.key || null, this.passphrase = opts.passphrase || null, 
                    this.cert = opts.cert || null, this.ca = opts.ca || null, this.ciphers = opts.ciphers || null, 
                    this.rejectUnauthorized = opts.rejectUnauthorized || null, this.open();
                }
                function clone(obj) {
                    var o = {};
                    for (var i in obj) obj.hasOwnProperty(i) && (o[i] = obj[i]);
                    return o;
                }
                var transports = _dereq_("./transports"), Emitter = _dereq_("component-emitter"), debug = _dereq_("debug")("engine.io-client:socket"), index = _dereq_("indexof"), parser = _dereq_("engine.io-parser"), parseuri = _dereq_("parseuri"), parsejson = _dereq_("parsejson"), parseqs = _dereq_("parseqs");
                module.exports = Socket, Socket.priorWebsocketSuccess = !1, Emitter(Socket.prototype), 
                Socket.protocol = parser.protocol, Socket.Socket = Socket, Socket.Transport = _dereq_("./transport"), 
                Socket.transports = _dereq_("./transports"), Socket.parser = _dereq_("engine.io-parser"), 
                Socket.prototype.createTransport = function(name) {
                    debug('creating transport "%s"', name);
                    var query = clone(this.query);
                    query.EIO = parser.protocol, query.transport = name, this.id && (query.sid = this.id);
                    var transport = new transports[name]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: query,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized
                    });
                    return transport;
                }, Socket.prototype.open = function() {
                    var transport;
                    if (this.rememberUpgrade && Socket.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) transport = "websocket"; else {
                        if (0 == this.transports.length) {
                            var self = this;
                            return void setTimeout(function() {
                                self.emit("error", "No transports available");
                            }, 0);
                        }
                        transport = this.transports[0];
                    }
                    this.readyState = "opening";
                    var transport;
                    try {
                        transport = this.createTransport(transport);
                    } catch (e) {
                        return this.transports.shift(), void this.open();
                    }
                    transport.open(), this.setTransport(transport);
                }, Socket.prototype.setTransport = function(transport) {
                    debug("setting transport %s", transport.name);
                    var self = this;
                    this.transport && (debug("clearing existing transport %s", this.transport.name), 
                    this.transport.removeAllListeners()), this.transport = transport, transport.on("drain", function() {
                        self.onDrain();
                    }).on("packet", function(packet) {
                        self.onPacket(packet);
                    }).on("error", function(e) {
                        self.onError(e);
                    }).on("close", function() {
                        self.onClose("transport close");
                    });
                }, Socket.prototype.probe = function(name) {
                    function onTransportOpen() {
                        if (self.onlyBinaryUpgrades) {
                            var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                            failed = failed || upgradeLosesBinary;
                        }
                        failed || (debug('probe transport "%s" opened', name), transport.send([ {
                            type: "ping",
                            data: "probe"
                        } ]), transport.once("packet", function(msg) {
                            if (!failed) if ("pong" == msg.type && "probe" == msg.data) {
                                if (debug('probe transport "%s" pong', name), self.upgrading = !0, self.emit("upgrading", transport), 
                                !transport) return;
                                Socket.priorWebsocketSuccess = "websocket" == transport.name, debug('pausing current transport "%s"', self.transport.name), 
                                self.transport.pause(function() {
                                    failed || "closed" != self.readyState && (debug("changing transport and sending upgrade packet"), 
                                    cleanup(), self.setTransport(transport), transport.send([ {
                                        type: "upgrade"
                                    } ]), self.emit("upgrade", transport), transport = null, self.upgrading = !1, self.flush());
                                });
                            } else {
                                debug('probe transport "%s" failed', name);
                                var err = new Error("probe error");
                                err.transport = transport.name, self.emit("upgradeError", err);
                            }
                        }));
                    }
                    function freezeTransport() {
                        failed || (failed = !0, cleanup(), transport.close(), transport = null);
                    }
                    function onerror(err) {
                        var error = new Error("probe error: " + err);
                        error.transport = transport.name, freezeTransport(), debug('probe transport "%s" failed because of error: %s', name, err), 
                        self.emit("upgradeError", error);
                    }
                    function onTransportClose() {
                        onerror("transport closed");
                    }
                    function onclose() {
                        onerror("socket closed");
                    }
                    function onupgrade(to) {
                        transport && to.name != transport.name && (debug('"%s" works - aborting "%s"', to.name, transport.name), 
                        freezeTransport());
                    }
                    function cleanup() {
                        transport.removeListener("open", onTransportOpen), transport.removeListener("error", onerror), 
                        transport.removeListener("close", onTransportClose), self.removeListener("close", onclose), 
                        self.removeListener("upgrading", onupgrade);
                    }
                    debug('probing transport "%s"', name);
                    var transport = this.createTransport(name, {
                        probe: 1
                    }), failed = !1, self = this;
                    Socket.priorWebsocketSuccess = !1, transport.once("open", onTransportOpen), transport.once("error", onerror), 
                    transport.once("close", onTransportClose), this.once("close", onclose), this.once("upgrading", onupgrade), 
                    transport.open();
                }, Socket.prototype.onOpen = function() {
                    if (debug("socket open"), this.readyState = "open", Socket.priorWebsocketSuccess = "websocket" == this.transport.name, 
                    this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        debug("starting upgrade probes");
                        for (var i = 0, l = this.upgrades.length; l > i; i++) this.probe(this.upgrades[i]);
                    }
                }, Socket.prototype.onPacket = function(packet) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (debug('socket receive: type "%s", data "%s"', packet.type, packet.data), 
                    this.emit("packet", packet), this.emit("heartbeat"), packet.type) {
                      case "open":
                        this.onHandshake(parsejson(packet.data));
                        break;

                      case "pong":
                        this.setPing();
                        break;

                      case "error":
                        var err = new Error("server error");
                        err.code = packet.data, this.emit("error", err);
                        break;

                      case "message":
                        this.emit("data", packet.data), this.emit("message", packet.data);
                    } else debug('packet received with socket readyState "%s"', this.readyState);
                }, Socket.prototype.onHandshake = function(data) {
                    this.emit("handshake", data), this.id = data.sid, this.transport.query.sid = data.sid, 
                    this.upgrades = this.filterUpgrades(data.upgrades), this.pingInterval = data.pingInterval, 
                    this.pingTimeout = data.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), 
                    this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));
                }, Socket.prototype.onHeartbeat = function(timeout) {
                    clearTimeout(this.pingTimeoutTimer);
                    var self = this;
                    self.pingTimeoutTimer = setTimeout(function() {
                        "closed" != self.readyState && self.onClose("ping timeout");
                    }, timeout || self.pingInterval + self.pingTimeout);
                }, Socket.prototype.setPing = function() {
                    var self = this;
                    clearTimeout(self.pingIntervalTimer), self.pingIntervalTimer = setTimeout(function() {
                        debug("writing ping packet - expecting pong within %sms", self.pingTimeout), self.ping(), 
                        self.onHeartbeat(self.pingTimeout);
                    }, self.pingInterval);
                }, Socket.prototype.ping = function() {
                    this.sendPacket("ping");
                }, Socket.prototype.onDrain = function() {
                    for (var i = 0; i < this.prevBufferLen; i++) this.callbackBuffer[i] && this.callbackBuffer[i]();
                    this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), 
                    this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush();
                }, Socket.prototype.flush = function() {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (debug("flushing %d packets in socket", this.writeBuffer.length), 
                    this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, 
                    this.emit("flush"));
                }, Socket.prototype.write = Socket.prototype.send = function(msg, fn) {
                    return this.sendPacket("message", msg, fn), this;
                }, Socket.prototype.sendPacket = function(type, data, fn) {
                    if ("closing" != this.readyState && "closed" != this.readyState) {
                        var packet = {
                            type: type,
                            data: data
                        };
                        this.emit("packetCreate", packet), this.writeBuffer.push(packet), this.callbackBuffer.push(fn), 
                        this.flush();
                    }
                }, Socket.prototype.close = function() {
                    function close() {
                        self.onClose("forced close"), debug("socket closing - telling transport to close"), 
                        self.transport.close();
                    }
                    function cleanupAndClose() {
                        self.removeListener("upgrade", cleanupAndClose), self.removeListener("upgradeError", cleanupAndClose), 
                        close();
                    }
                    function waitForUpgrade() {
                        self.once("upgrade", cleanupAndClose), self.once("upgradeError", cleanupAndClose);
                    }
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var self = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? waitForUpgrade() : close();
                        }) : this.upgrading ? waitForUpgrade() : close();
                    }
                    return this;
                }, Socket.prototype.onError = function(err) {
                    debug("socket error %j", err), Socket.priorWebsocketSuccess = !1, this.emit("error", err), 
                    this.onClose("transport error", err);
                }, Socket.prototype.onClose = function(reason, desc) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        debug('socket close with reason: "%s"', reason);
                        var self = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function() {
                            self.writeBuffer = [], self.callbackBuffer = [], self.prevBufferLen = 0;
                        }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), 
                        this.readyState = "closed", this.id = null, this.emit("close", reason, desc);
                    }
                }, Socket.prototype.filterUpgrades = function(upgrades) {
                    for (var filteredUpgrades = [], i = 0, j = upgrades.length; j > i; i++) ~index(this.transports, upgrades[i]) && filteredUpgrades.push(upgrades[i]);
                    return filteredUpgrades;
                };
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./transport": 14,
            "./transports": 15,
            "component-emitter": 9,
            debug: 22,
            "engine.io-parser": 25,
            indexof: 40,
            parsejson: 32,
            parseqs: 33,
            parseuri: 34
        } ],
        14: [ function(_dereq_, module, exports) {
            function Transport(opts) {
                this.path = opts.path, this.hostname = opts.hostname, this.port = opts.port, this.secure = opts.secure, 
                this.query = opts.query, this.timestampParam = opts.timestampParam, this.timestampRequests = opts.timestampRequests, 
                this.readyState = "", this.agent = opts.agent || !1, this.socket = opts.socket, 
                this.enablesXDR = opts.enablesXDR, this.pfx = opts.pfx, this.key = opts.key, this.passphrase = opts.passphrase, 
                this.cert = opts.cert, this.ca = opts.ca, this.ciphers = opts.ciphers, this.rejectUnauthorized = opts.rejectUnauthorized;
            }
            var parser = _dereq_("engine.io-parser"), Emitter = _dereq_("component-emitter");
            module.exports = Transport, Emitter(Transport.prototype), Transport.timestamps = 0, 
            Transport.prototype.onError = function(msg, desc) {
                var err = new Error(msg);
                return err.type = "TransportError", err.description = desc, this.emit("error", err), 
                this;
            }, Transport.prototype.open = function() {
                return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening", 
                this.doOpen()), this;
            }, Transport.prototype.close = function() {
                return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), 
                this.onClose()), this;
            }, Transport.prototype.send = function(packets) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(packets);
            }, Transport.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open");
            }, Transport.prototype.onData = function(data) {
                var packet = parser.decodePacket(data, this.socket.binaryType);
                this.onPacket(packet);
            }, Transport.prototype.onPacket = function(packet) {
                this.emit("packet", packet);
            }, Transport.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close");
            };
        }, {
            "component-emitter": 9,
            "engine.io-parser": 25
        } ],
        15: [ function(_dereq_, module, exports) {
            (function(global) {
                function polling(opts) {
                    var xhr, xd = !1, xs = !1, jsonp = !1 !== opts.jsonp;
                    if (global.location) {
                        var isSSL = "https:" == location.protocol, port = location.port;
                        port || (port = isSSL ? 443 : 80), xd = opts.hostname != location.hostname || port != opts.port, 
                        xs = opts.secure != isSSL;
                    }
                    if (opts.xdomain = xd, opts.xscheme = xs, xhr = new XMLHttpRequest(opts), "open" in xhr && !opts.forceJSONP) return new XHR(opts);
                    if (!jsonp) throw new Error("JSONP disabled");
                    return new JSONP(opts);
                }
                var XMLHttpRequest = _dereq_("xmlhttprequest"), XHR = _dereq_("./polling-xhr"), JSONP = _dereq_("./polling-jsonp"), websocket = _dereq_("./websocket");
                exports.polling = polling, exports.websocket = websocket;
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./polling-jsonp": 16,
            "./polling-xhr": 17,
            "./websocket": 19,
            xmlhttprequest: 20
        } ],
        16: [ function(_dereq_, module, exports) {
            (function(global) {
                function empty() {}
                function JSONPPolling(opts) {
                    Polling.call(this, opts), this.query = this.query || {}, callbacks || (global.___eio || (global.___eio = []), 
                    callbacks = global.___eio), this.index = callbacks.length;
                    var self = this;
                    callbacks.push(function(msg) {
                        self.onData(msg);
                    }), this.query.j = this.index, global.document && global.addEventListener && global.addEventListener("beforeunload", function() {
                        self.script && (self.script.onerror = empty);
                    }, !1);
                }
                var Polling = _dereq_("./polling"), inherit = _dereq_("component-inherit");
                module.exports = JSONPPolling;
                var callbacks, rNewline = /\n/g, rEscapedNewline = /\\n/g;
                inherit(JSONPPolling, Polling), JSONPPolling.prototype.supportsBinary = !1, JSONPPolling.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
                    this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), 
                    Polling.prototype.doClose.call(this);
                }, JSONPPolling.prototype.doPoll = function() {
                    var self = this, script = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
                    script.async = !0, script.src = this.uri(), script.onerror = function(e) {
                        self.onError("jsonp poll error", e);
                    };
                    var insertAt = document.getElementsByTagName("script")[0];
                    insertAt.parentNode.insertBefore(script, insertAt), this.script = script;
                    var isUAgecko = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    isUAgecko && setTimeout(function() {
                        var iframe = document.createElement("iframe");
                        document.body.appendChild(iframe), document.body.removeChild(iframe);
                    }, 100);
                }, JSONPPolling.prototype.doWrite = function(data, fn) {
                    function complete() {
                        initIframe(), fn();
                    }
                    function initIframe() {
                        if (self.iframe) try {
                            self.form.removeChild(self.iframe);
                        } catch (e) {
                            self.onError("jsonp polling iframe removal error", e);
                        }
                        try {
                            var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                            iframe = document.createElement(html);
                        } catch (e) {
                            iframe = document.createElement("iframe"), iframe.name = self.iframeId, iframe.src = "javascript:0";
                        }
                        iframe.id = self.iframeId, self.form.appendChild(iframe), self.iframe = iframe;
                    }
                    var self = this;
                    if (!this.form) {
                        var iframe, form = document.createElement("form"), area = document.createElement("textarea"), id = this.iframeId = "eio_iframe_" + this.index;
                        form.className = "socketio", form.style.position = "absolute", form.style.top = "-1000px", 
                        form.style.left = "-1000px", form.target = id, form.method = "POST", form.setAttribute("accept-charset", "utf-8"), 
                        area.name = "d", form.appendChild(area), document.body.appendChild(form), this.form = form, 
                        this.area = area;
                    }
                    this.form.action = this.uri(), initIframe(), data = data.replace(rEscapedNewline, "\\\n"), 
                    this.area.value = data.replace(rNewline, "\\n");
                    try {
                        this.form.submit();
                    } catch (e) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" == self.iframe.readyState && complete();
                    } : this.iframe.onload = complete;
                };
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./polling": 18,
            "component-inherit": 21
        } ],
        17: [ function(_dereq_, module, exports) {
            (function(global) {
                function empty() {}
                function XHR(opts) {
                    if (Polling.call(this, opts), global.location) {
                        var isSSL = "https:" == location.protocol, port = location.port;
                        port || (port = isSSL ? 443 : 80), this.xd = opts.hostname != global.location.hostname || port != opts.port, 
                        this.xs = opts.secure != isSSL;
                    }
                }
                function Request(opts) {
                    this.method = opts.method || "GET", this.uri = opts.uri, this.xd = !!opts.xd, this.xs = !!opts.xs, 
                    this.async = !1 !== opts.async, this.data = void 0 != opts.data ? opts.data : null, 
                    this.agent = opts.agent, this.isBinary = opts.isBinary, this.supportsBinary = opts.supportsBinary, 
                    this.enablesXDR = opts.enablesXDR, this.pfx = opts.pfx, this.key = opts.key, this.passphrase = opts.passphrase, 
                    this.cert = opts.cert, this.ca = opts.ca, this.ciphers = opts.ciphers, this.rejectUnauthorized = opts.rejectUnauthorized, 
                    this.create();
                }
                function unloadHandler() {
                    for (var i in Request.requests) Request.requests.hasOwnProperty(i) && Request.requests[i].abort();
                }
                var XMLHttpRequest = _dereq_("xmlhttprequest"), Polling = _dereq_("./polling"), Emitter = _dereq_("component-emitter"), inherit = _dereq_("component-inherit"), debug = _dereq_("debug")("engine.io-client:polling-xhr");
                module.exports = XHR, module.exports.Request = Request, inherit(XHR, Polling), XHR.prototype.supportsBinary = !0, 
                XHR.prototype.request = function(opts) {
                    return opts = opts || {}, opts.uri = this.uri(), opts.xd = this.xd, opts.xs = this.xs, 
                    opts.agent = this.agent || !1, opts.supportsBinary = this.supportsBinary, opts.enablesXDR = this.enablesXDR, 
                    opts.pfx = this.pfx, opts.key = this.key, opts.passphrase = this.passphrase, opts.cert = this.cert, 
                    opts.ca = this.ca, opts.ciphers = this.ciphers, opts.rejectUnauthorized = this.rejectUnauthorized, 
                    new Request(opts);
                }, XHR.prototype.doWrite = function(data, fn) {
                    var isBinary = "string" != typeof data && void 0 !== data, req = this.request({
                        method: "POST",
                        data: data,
                        isBinary: isBinary
                    }), self = this;
                    req.on("success", fn), req.on("error", function(err) {
                        self.onError("xhr post error", err);
                    }), this.sendXhr = req;
                }, XHR.prototype.doPoll = function() {
                    debug("xhr poll");
                    var req = this.request(), self = this;
                    req.on("data", function(data) {
                        self.onData(data);
                    }), req.on("error", function(err) {
                        self.onError("xhr poll error", err);
                    }), this.pollXhr = req;
                }, Emitter(Request.prototype), Request.prototype.create = function() {
                    var opts = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    opts.pfx = this.pfx, opts.key = this.key, opts.passphrase = this.passphrase, opts.cert = this.cert, 
                    opts.ca = this.ca, opts.ciphers = this.ciphers, opts.rejectUnauthorized = this.rejectUnauthorized;
                    var xhr = this.xhr = new XMLHttpRequest(opts), self = this;
                    try {
                        if (debug("xhr open %s: %s", this.method, this.uri), xhr.open(this.method, this.uri, this.async), 
                        this.supportsBinary && (xhr.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? xhr.setRequestHeader("Content-type", "application/octet-stream") : xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                        } catch (e) {}
                        "withCredentials" in xhr && (xhr.withCredentials = !0), this.hasXDR() ? (xhr.onload = function() {
                            self.onLoad();
                        }, xhr.onerror = function() {
                            self.onError(xhr.responseText);
                        }) : xhr.onreadystatechange = function() {
                            4 == xhr.readyState && (200 == xhr.status || 1223 == xhr.status ? self.onLoad() : setTimeout(function() {
                                self.onError(xhr.status);
                            }, 0));
                        }, debug("xhr data %s", this.data), xhr.send(this.data);
                    } catch (e) {
                        return void setTimeout(function() {
                            self.onError(e);
                        }, 0);
                    }
                    global.document && (this.index = Request.requestsCount++, Request.requests[this.index] = this);
                }, Request.prototype.onSuccess = function() {
                    this.emit("success"), this.cleanup();
                }, Request.prototype.onData = function(data) {
                    this.emit("data", data), this.onSuccess();
                }, Request.prototype.onError = function(err) {
                    this.emit("error", err), this.cleanup(!0);
                }, Request.prototype.cleanup = function(fromError) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = empty : this.xhr.onreadystatechange = empty, 
                        fromError) try {
                            this.xhr.abort();
                        } catch (e) {}
                        global.document && delete Request.requests[this.index], this.xhr = null;
                    }
                }, Request.prototype.onLoad = function() {
                    var data;
                    try {
                        var contentType;
                        try {
                            contentType = this.xhr.getResponseHeader("Content-Type").split(";")[0];
                        } catch (e) {}
                        data = "application/octet-stream" === contentType ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText;
                    } catch (e) {
                        this.onError(e);
                    }
                    null != data && this.onData(data);
                }, Request.prototype.hasXDR = function() {
                    return "undefined" != typeof global.XDomainRequest && !this.xs && this.enablesXDR;
                }, Request.prototype.abort = function() {
                    this.cleanup();
                }, global.document && (Request.requestsCount = 0, Request.requests = {}, global.attachEvent ? global.attachEvent("onunload", unloadHandler) : global.addEventListener && global.addEventListener("beforeunload", unloadHandler, !1));
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./polling": 18,
            "component-emitter": 9,
            "component-inherit": 21,
            debug: 22,
            xmlhttprequest: 20
        } ],
        18: [ function(_dereq_, module, exports) {
            function Polling(opts) {
                var forceBase64 = opts && opts.forceBase64;
                (!hasXHR2 || forceBase64) && (this.supportsBinary = !1), Transport.call(this, opts);
            }
            var Transport = _dereq_("../transport"), parseqs = _dereq_("parseqs"), parser = _dereq_("engine.io-parser"), inherit = _dereq_("component-inherit"), debug = _dereq_("debug")("engine.io-client:polling");
            module.exports = Polling;
            var hasXHR2 = function() {
                var XMLHttpRequest = _dereq_("xmlhttprequest"), xhr = new XMLHttpRequest({
                    xdomain: !1
                });
                return null != xhr.responseType;
            }();
            inherit(Polling, Transport), Polling.prototype.name = "polling", Polling.prototype.doOpen = function() {
                this.poll();
            }, Polling.prototype.pause = function(onPause) {
                function pause() {
                    debug("paused"), self.readyState = "paused", onPause();
                }
                var self = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var total = 0;
                    this.polling && (debug("we are currently polling - waiting to pause"), total++, 
                    this.once("pollComplete", function() {
                        debug("pre-pause polling complete"), --total || pause();
                    })), this.writable || (debug("we are currently writing - waiting to pause"), total++, 
                    this.once("drain", function() {
                        debug("pre-pause writing complete"), --total || pause();
                    }));
                } else pause();
            }, Polling.prototype.poll = function() {
                debug("polling"), this.polling = !0, this.doPoll(), this.emit("poll");
            }, Polling.prototype.onData = function(data) {
                var self = this;
                debug("polling got data %s", data);
                var callback = function(packet, index, total) {
                    return "opening" == self.readyState && self.onOpen(), "close" == packet.type ? (self.onClose(), 
                    !1) : void self.onPacket(packet);
                };
                parser.decodePayload(data, this.socket.binaryType, callback), "closed" != this.readyState && (this.polling = !1, 
                this.emit("pollComplete"), "open" == this.readyState ? this.poll() : debug('ignoring poll - transport state "%s"', this.readyState));
            }, Polling.prototype.doClose = function() {
                function close() {
                    debug("writing close packet"), self.write([ {
                        type: "close"
                    } ]);
                }
                var self = this;
                "open" == this.readyState ? (debug("transport open - closing"), close()) : (debug("transport not open - deferring close"), 
                this.once("open", close));
            }, Polling.prototype.write = function(packets) {
                var self = this;
                this.writable = !1;
                var callbackfn = function() {
                    self.writable = !0, self.emit("drain");
                }, self = this;
                parser.encodePayload(packets, this.supportsBinary, function(data) {
                    self.doWrite(data, callbackfn);
                });
            }, Polling.prototype.uri = function() {
                var query = this.query || {}, schema = this.secure ? "https" : "http", port = "";
                return !1 !== this.timestampRequests && (query[this.timestampParam] = +new Date() + "-" + Transport.timestamps++), 
                this.supportsBinary || query.sid || (query.b64 = 1), query = parseqs.encode(query), 
                this.port && ("https" == schema && 443 != this.port || "http" == schema && 80 != this.port) && (port = ":" + this.port), 
                query.length && (query = "?" + query), schema + "://" + this.hostname + port + this.path + query;
            };
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 33,
            xmlhttprequest: 20
        } ],
        19: [ function(_dereq_, module, exports) {
            function WS(opts) {
                var forceBase64 = opts && opts.forceBase64;
                forceBase64 && (this.supportsBinary = !1), Transport.call(this, opts);
            }
            var Transport = _dereq_("../transport"), parser = _dereq_("engine.io-parser"), parseqs = _dereq_("parseqs"), inherit = _dereq_("component-inherit"), debug = _dereq_("debug")("engine.io-client:websocket"), WebSocket = _dereq_("ws");
            module.exports = WS, inherit(WS, Transport), WS.prototype.name = "websocket", WS.prototype.supportsBinary = !0, 
            WS.prototype.doOpen = function() {
                if (this.check()) {
                    var uri = this.uri(), protocols = void 0, opts = {
                        agent: this.agent
                    };
                    opts.pfx = this.pfx, opts.key = this.key, opts.passphrase = this.passphrase, opts.cert = this.cert, 
                    opts.ca = this.ca, opts.ciphers = this.ciphers, opts.rejectUnauthorized = this.rejectUnauthorized, 
                    this.ws = new WebSocket(uri, protocols, opts), void 0 === this.ws.binaryType && (this.supportsBinary = !1), 
                    this.ws.binaryType = "arraybuffer", this.addEventListeners();
                }
            }, WS.prototype.addEventListeners = function() {
                var self = this;
                this.ws.onopen = function() {
                    self.onOpen();
                }, this.ws.onclose = function() {
                    self.onClose();
                }, this.ws.onmessage = function(ev) {
                    self.onData(ev.data);
                }, this.ws.onerror = function(e) {
                    self.onError("websocket error", e);
                };
            }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (WS.prototype.onData = function(data) {
                var self = this;
                setTimeout(function() {
                    Transport.prototype.onData.call(self, data);
                }, 0);
            }), WS.prototype.write = function(packets) {
                function ondrain() {
                    self.writable = !0, self.emit("drain");
                }
                var self = this;
                this.writable = !1;
                for (var i = 0, l = packets.length; l > i; i++) parser.encodePacket(packets[i], this.supportsBinary, function(data) {
                    try {
                        self.ws.send(data);
                    } catch (e) {
                        debug("websocket closed before onclose event");
                    }
                });
                setTimeout(ondrain, 0);
            }, WS.prototype.onClose = function() {
                Transport.prototype.onClose.call(this);
            }, WS.prototype.doClose = function() {
                "undefined" != typeof this.ws && this.ws.close();
            }, WS.prototype.uri = function() {
                var query = this.query || {}, schema = this.secure ? "wss" : "ws", port = "";
                return this.port && ("wss" == schema && 443 != this.port || "ws" == schema && 80 != this.port) && (port = ":" + this.port), 
                this.timestampRequests && (query[this.timestampParam] = +new Date()), this.supportsBinary || (query.b64 = 1), 
                query = parseqs.encode(query), query.length && (query = "?" + query), schema + "://" + this.hostname + port + this.path + query;
            }, WS.prototype.check = function() {
                return !(!WebSocket || "__initialize" in WebSocket && this.name === WS.prototype.name);
            };
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 33,
            ws: 35
        } ],
        20: [ function(_dereq_, module, exports) {
            var hasCORS = _dereq_("has-cors");
            module.exports = function(opts) {
                var xdomain = opts.xdomain, xscheme = opts.xscheme, enablesXDR = opts.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!xdomain || hasCORS)) return new XMLHttpRequest();
                } catch (e) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !xscheme && enablesXDR) return new XDomainRequest();
                } catch (e) {}
                if (!xdomain) try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            };
        }, {
            "has-cors": 38
        } ],
        21: [ function(_dereq_, module, exports) {
            module.exports = function(a, b) {
                var fn = function() {};
                fn.prototype = b.prototype, a.prototype = new fn(), a.prototype.constructor = a;
            };
        }, {} ],
        22: [ function(_dereq_, module, exports) {
            function useColors() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
            }
            function formatArgs() {
                var args = arguments, useColors = this.useColors;
                if (args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff), 
                !useColors) return args;
                var c = "color: " + this.color;
                args = [ args[0], c, "color: inherit" ].concat(Array.prototype.slice.call(args, 1));
                var index = 0, lastC = 0;
                return args[0].replace(/%[a-z%]/g, function(match) {
                    "%%" !== match && (index++, "%c" === match && (lastC = index));
                }), args.splice(lastC, 0, c), args;
            }
            function log() {
                return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments);
            }
            function save(namespaces) {
                try {
                    null == namespaces ? localStorage.removeItem("debug") : localStorage.debug = namespaces;
                } catch (e) {}
            }
            function load() {
                var r;
                try {
                    r = localStorage.debug;
                } catch (e) {}
                return r;
            }
            exports = module.exports = _dereq_("./debug"), exports.log = log, exports.formatArgs = formatArgs, 
            exports.save = save, exports.load = load, exports.useColors = useColors, exports.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ], 
            exports.formatters.j = function(v) {
                return JSON.stringify(v);
            }, exports.enable(load());
        }, {
            "./debug": 23
        } ],
        23: [ function(_dereq_, module, exports) {
            function selectColor() {
                return exports.colors[prevColor++ % exports.colors.length];
            }
            function debug(namespace) {
                function disabled() {}
                function enabled() {
                    var self = enabled, curr = +new Date(), ms = curr - (prevTime || curr);
                    self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, null == self.useColors && (self.useColors = exports.useColors()), 
                    null == self.color && self.useColors && (self.color = selectColor());
                    var args = Array.prototype.slice.call(arguments);
                    args[0] = exports.coerce(args[0]), "string" != typeof args[0] && (args = [ "%o" ].concat(args));
                    var index = 0;
                    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
                        if ("%%" === match) return match;
                        index++;
                        var formatter = exports.formatters[format];
                        if ("function" == typeof formatter) {
                            var val = args[index];
                            match = formatter.call(self, val), args.splice(index, 1), index--;
                        }
                        return match;
                    }), "function" == typeof exports.formatArgs && (args = exports.formatArgs.apply(self, args));
                    var logFn = enabled.log || exports.log || console.log.bind(console);
                    logFn.apply(self, args);
                }
                disabled.enabled = !1, enabled.enabled = !0;
                var fn = exports.enabled(namespace) ? enabled : disabled;
                return fn.namespace = namespace, fn;
            }
            function enable(namespaces) {
                exports.save(namespaces);
                for (var split = (namespaces || "").split(/[\s,]+/), len = split.length, i = 0; len > i; i++) split[i] && (namespaces = split[i].replace(/\*/g, ".*?"), 
                "-" === namespaces[0] ? exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$")) : exports.names.push(new RegExp("^" + namespaces + "$")));
            }
            function disable() {
                exports.enable("");
            }
            function enabled(name) {
                var i, len;
                for (i = 0, len = exports.skips.length; len > i; i++) if (exports.skips[i].test(name)) return !1;
                for (i = 0, len = exports.names.length; len > i; i++) if (exports.names[i].test(name)) return !0;
                return !1;
            }
            function coerce(val) {
                return val instanceof Error ? val.stack || val.message : val;
            }
            exports = module.exports = debug, exports.coerce = coerce, exports.disable = disable, 
            exports.enable = enable, exports.enabled = enabled, exports.humanize = _dereq_("ms"), 
            exports.names = [], exports.skips = [], exports.formatters = {};
            var prevTime, prevColor = 0;
        }, {
            ms: 24
        } ],
        24: [ function(_dereq_, module, exports) {
            function parse(str) {
                var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
                if (match) {
                    var n = parseFloat(match[1]), type = (match[2] || "ms").toLowerCase();
                    switch (type) {
                      case "years":
                      case "year":
                      case "y":
                        return n * y;

                      case "days":
                      case "day":
                      case "d":
                        return n * d;

                      case "hours":
                      case "hour":
                      case "h":
                        return n * h;

                      case "minutes":
                      case "minute":
                      case "m":
                        return n * m;

                      case "seconds":
                      case "second":
                      case "s":
                        return n * s;

                      case "ms":
                        return n;
                    }
                }
            }
            function short(ms) {
                return ms >= d ? Math.round(ms / d) + "d" : ms >= h ? Math.round(ms / h) + "h" : ms >= m ? Math.round(ms / m) + "m" : ms >= s ? Math.round(ms / s) + "s" : ms + "ms";
            }
            function long(ms) {
                return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
            }
            function plural(ms, n, name) {
                return n > ms ? void 0 : 1.5 * n > ms ? Math.floor(ms / n) + " " + name : Math.ceil(ms / n) + " " + name + "s";
            }
            var s = 1e3, m = 60 * s, h = 60 * m, d = 24 * h, y = 365.25 * d;
            module.exports = function(val, options) {
                return options = options || {}, "string" == typeof val ? parse(val) : options["long"] ? long(val) : short(val);
            };
        }, {} ],
        25: [ function(_dereq_, module, exports) {
            (function(global) {
                function encodeBase64Object(packet, callback) {
                    var message = "b" + exports.packets[packet.type] + packet.data.data;
                    return callback(message);
                }
                function encodeArrayBuffer(packet, supportsBinary, callback) {
                    if (!supportsBinary) return exports.encodeBase64Packet(packet, callback);
                    var data = packet.data, contentArray = new Uint8Array(data), resultBuffer = new Uint8Array(1 + data.byteLength);
                    resultBuffer[0] = packets[packet.type];
                    for (var i = 0; i < contentArray.length; i++) resultBuffer[i + 1] = contentArray[i];
                    return callback(resultBuffer.buffer);
                }
                function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
                    if (!supportsBinary) return exports.encodeBase64Packet(packet, callback);
                    var fr = new FileReader();
                    return fr.onload = function() {
                        packet.data = fr.result, exports.encodePacket(packet, supportsBinary, !0, callback);
                    }, fr.readAsArrayBuffer(packet.data);
                }
                function encodeBlob(packet, supportsBinary, callback) {
                    if (!supportsBinary) return exports.encodeBase64Packet(packet, callback);
                    if (dontSendBlobs) return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
                    var length = new Uint8Array(1);
                    length[0] = packets[packet.type];
                    var blob = new Blob([ length.buffer, packet.data ]);
                    return callback(blob);
                }
                function map(ary, each, done) {
                    for (var result = new Array(ary.length), next = after(ary.length, done), eachWithIndex = function(i, el, cb) {
                        each(el, function(error, msg) {
                            result[i] = msg, cb(error, result);
                        });
                    }, i = 0; i < ary.length; i++) eachWithIndex(i, ary[i], next);
                }
                var keys = _dereq_("./keys"), hasBinary = _dereq_("has-binary"), sliceBuffer = _dereq_("arraybuffer.slice"), base64encoder = _dereq_("base64-arraybuffer"), after = _dereq_("after"), utf8 = _dereq_("utf8"), isAndroid = navigator.userAgent.match(/Android/i), isPhantomJS = /PhantomJS/i.test(navigator.userAgent), dontSendBlobs = isAndroid || isPhantomJS;
                exports.protocol = 3;
                var packets = exports.packets = {
                    open: 0,
                    close: 1,
                    ping: 2,
                    pong: 3,
                    message: 4,
                    upgrade: 5,
                    noop: 6
                }, packetslist = keys(packets), err = {
                    type: "error",
                    data: "parser error"
                }, Blob = _dereq_("blob");
                exports.encodePacket = function(packet, supportsBinary, utf8encode, callback) {
                    "function" == typeof supportsBinary && (callback = supportsBinary, supportsBinary = !1), 
                    "function" == typeof utf8encode && (callback = utf8encode, utf8encode = null);
                    var data = void 0 === packet.data ? void 0 : packet.data.buffer || packet.data;
                    if (global.ArrayBuffer && data instanceof ArrayBuffer) return encodeArrayBuffer(packet, supportsBinary, callback);
                    if (Blob && data instanceof global.Blob) return encodeBlob(packet, supportsBinary, callback);
                    if (data && data.base64) return encodeBase64Object(packet, callback);
                    var encoded = packets[packet.type];
                    return void 0 !== packet.data && (encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data)), 
                    callback("" + encoded);
                }, exports.encodeBase64Packet = function(packet, callback) {
                    var message = "b" + exports.packets[packet.type];
                    if (Blob && packet.data instanceof Blob) {
                        var fr = new FileReader();
                        return fr.onload = function() {
                            var b64 = fr.result.split(",")[1];
                            callback(message + b64);
                        }, fr.readAsDataURL(packet.data);
                    }
                    var b64data;
                    try {
                        b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
                    } catch (e) {
                        for (var typed = new Uint8Array(packet.data), basic = new Array(typed.length), i = 0; i < typed.length; i++) basic[i] = typed[i];
                        b64data = String.fromCharCode.apply(null, basic);
                    }
                    return message += global.btoa(b64data), callback(message);
                }, exports.decodePacket = function(data, binaryType, utf8decode) {
                    if ("string" == typeof data || void 0 === data) {
                        if ("b" == data.charAt(0)) return exports.decodeBase64Packet(data.substr(1), binaryType);
                        if (utf8decode) try {
                            data = utf8.decode(data);
                        } catch (e) {
                            return err;
                        }
                        var type = data.charAt(0);
                        return Number(type) == type && packetslist[type] ? data.length > 1 ? {
                            type: packetslist[type],
                            data: data.substring(1)
                        } : {
                            type: packetslist[type]
                        } : err;
                    }
                    var asArray = new Uint8Array(data), type = asArray[0], rest = sliceBuffer(data, 1);
                    return Blob && "blob" === binaryType && (rest = new Blob([ rest ])), {
                        type: packetslist[type],
                        data: rest
                    };
                }, exports.decodeBase64Packet = function(msg, binaryType) {
                    var type = packetslist[msg.charAt(0)];
                    if (!global.ArrayBuffer) return {
                        type: type,
                        data: {
                            base64: !0,
                            data: msg.substr(1)
                        }
                    };
                    var data = base64encoder.decode(msg.substr(1));
                    return "blob" === binaryType && Blob && (data = new Blob([ data ])), {
                        type: type,
                        data: data
                    };
                }, exports.encodePayload = function(packets, supportsBinary, callback) {
                    function setLengthHeader(message) {
                        return message.length + ":" + message;
                    }
                    function encodeOne(packet, doneCallback) {
                        exports.encodePacket(packet, isBinary ? supportsBinary : !1, !0, function(message) {
                            doneCallback(null, setLengthHeader(message));
                        });
                    }
                    "function" == typeof supportsBinary && (callback = supportsBinary, supportsBinary = null);
                    var isBinary = hasBinary(packets);
                    return supportsBinary && isBinary ? Blob && !dontSendBlobs ? exports.encodePayloadAsBlob(packets, callback) : exports.encodePayloadAsArrayBuffer(packets, callback) : packets.length ? void map(packets, encodeOne, function(err, results) {
                        return callback(results.join(""));
                    }) : callback("0:");
                }, exports.decodePayload = function(data, binaryType, callback) {
                    if ("string" != typeof data) return exports.decodePayloadAsBinary(data, binaryType, callback);
                    "function" == typeof binaryType && (callback = binaryType, binaryType = null);
                    var packet;
                    if ("" == data) return callback(err, 0, 1);
                    for (var n, msg, length = "", i = 0, l = data.length; l > i; i++) {
                        var chr = data.charAt(i);
                        if (":" != chr) length += chr; else {
                            if ("" == length || length != (n = Number(length))) return callback(err, 0, 1);
                            if (msg = data.substr(i + 1, n), length != msg.length) return callback(err, 0, 1);
                            if (msg.length) {
                                if (packet = exports.decodePacket(msg, binaryType, !0), err.type == packet.type && err.data == packet.data) return callback(err, 0, 1);
                                var ret = callback(packet, i + n, l);
                                if (!1 === ret) return;
                            }
                            i += n, length = "";
                        }
                    }
                    return "" != length ? callback(err, 0, 1) : void 0;
                }, exports.encodePayloadAsArrayBuffer = function(packets, callback) {
                    function encodeOne(packet, doneCallback) {
                        exports.encodePacket(packet, !0, !0, function(data) {
                            return doneCallback(null, data);
                        });
                    }
                    return packets.length ? void map(packets, encodeOne, function(err, encodedPackets) {
                        var totalLength = encodedPackets.reduce(function(acc, p) {
                            var len;
                            return len = "string" == typeof p ? p.length : p.byteLength, acc + len.toString().length + len + 2;
                        }, 0), resultArray = new Uint8Array(totalLength), bufferIndex = 0;
                        return encodedPackets.forEach(function(p) {
                            var isString = "string" == typeof p, ab = p;
                            if (isString) {
                                for (var view = new Uint8Array(p.length), i = 0; i < p.length; i++) view[i] = p.charCodeAt(i);
                                ab = view.buffer;
                            }
                            isString ? resultArray[bufferIndex++] = 0 : resultArray[bufferIndex++] = 1;
                            for (var lenStr = ab.byteLength.toString(), i = 0; i < lenStr.length; i++) resultArray[bufferIndex++] = parseInt(lenStr[i]);
                            resultArray[bufferIndex++] = 255;
                            for (var view = new Uint8Array(ab), i = 0; i < view.length; i++) resultArray[bufferIndex++] = view[i];
                        }), callback(resultArray.buffer);
                    }) : callback(new ArrayBuffer(0));
                }, exports.encodePayloadAsBlob = function(packets, callback) {
                    function encodeOne(packet, doneCallback) {
                        exports.encodePacket(packet, !0, !0, function(encoded) {
                            var binaryIdentifier = new Uint8Array(1);
                            if (binaryIdentifier[0] = 1, "string" == typeof encoded) {
                                for (var view = new Uint8Array(encoded.length), i = 0; i < encoded.length; i++) view[i] = encoded.charCodeAt(i);
                                encoded = view.buffer, binaryIdentifier[0] = 0;
                            }
                            for (var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size, lenStr = len.toString(), lengthAry = new Uint8Array(lenStr.length + 1), i = 0; i < lenStr.length; i++) lengthAry[i] = parseInt(lenStr[i]);
                            if (lengthAry[lenStr.length] = 255, Blob) {
                                var blob = new Blob([ binaryIdentifier.buffer, lengthAry.buffer, encoded ]);
                                doneCallback(null, blob);
                            }
                        });
                    }
                    map(packets, encodeOne, function(err, results) {
                        return callback(new Blob(results));
                    });
                }, exports.decodePayloadAsBinary = function(data, binaryType, callback) {
                    "function" == typeof binaryType && (callback = binaryType, binaryType = null);
                    for (var bufferTail = data, buffers = [], numberTooLong = !1; bufferTail.byteLength > 0; ) {
                        for (var tailArray = new Uint8Array(bufferTail), isString = 0 === tailArray[0], msgLength = "", i = 1; 255 != tailArray[i]; i++) {
                            if (msgLength.length > 310) {
                                numberTooLong = !0;
                                break;
                            }
                            msgLength += tailArray[i];
                        }
                        if (numberTooLong) return callback(err, 0, 1);
                        bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length), msgLength = parseInt(msgLength);
                        var msg = sliceBuffer(bufferTail, 0, msgLength);
                        if (isString) try {
                            msg = String.fromCharCode.apply(null, new Uint8Array(msg));
                        } catch (e) {
                            var typed = new Uint8Array(msg);
                            msg = "";
                            for (var i = 0; i < typed.length; i++) msg += String.fromCharCode(typed[i]);
                        }
                        buffers.push(msg), bufferTail = sliceBuffer(bufferTail, msgLength);
                    }
                    var total = buffers.length;
                    buffers.forEach(function(buffer, i) {
                        callback(exports.decodePacket(buffer, binaryType, !0), i, total);
                    });
                };
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./keys": 26,
            after: 27,
            "arraybuffer.slice": 28,
            "base64-arraybuffer": 29,
            blob: 30,
            "has-binary": 36,
            utf8: 31
        } ],
        26: [ function(_dereq_, module, exports) {
            module.exports = Object.keys || function(obj) {
                var arr = [], has = Object.prototype.hasOwnProperty;
                for (var i in obj) has.call(obj, i) && arr.push(i);
                return arr;
            };
        }, {} ],
        27: [ function(_dereq_, module, exports) {
            function after(count, callback, err_cb) {
                function proxy(err, result) {
                    if (proxy.count <= 0) throw new Error("after called too many times");
                    --proxy.count, err ? (bail = !0, callback(err), callback = err_cb) : 0 !== proxy.count || bail || callback(null, result);
                }
                var bail = !1;
                return err_cb = err_cb || noop, proxy.count = count, 0 === count ? callback() : proxy;
            }
            function noop() {}
            module.exports = after;
        }, {} ],
        28: [ function(_dereq_, module, exports) {
            module.exports = function(arraybuffer, start, end) {
                var bytes = arraybuffer.byteLength;
                if (start = start || 0, end = end || bytes, arraybuffer.slice) return arraybuffer.slice(start, end);
                if (0 > start && (start += bytes), 0 > end && (end += bytes), end > bytes && (end = bytes), 
                start >= bytes || start >= end || 0 === bytes) return new ArrayBuffer(0);
                for (var abv = new Uint8Array(arraybuffer), result = new Uint8Array(end - start), i = start, ii = 0; end > i; i++, 
                ii++) result[ii] = abv[i];
                return result.buffer;
            };
        }, {} ],
        29: [ function(_dereq_, module, exports) {
            !function(chars) {
                "use strict";
                exports.encode = function(arraybuffer) {
                    var i, bytes = new Uint8Array(arraybuffer), len = bytes.length, base64 = "";
                    for (i = 0; len > i; i += 3) base64 += chars[bytes[i] >> 2], base64 += chars[(3 & bytes[i]) << 4 | bytes[i + 1] >> 4], 
                    base64 += chars[(15 & bytes[i + 1]) << 2 | bytes[i + 2] >> 6], base64 += chars[63 & bytes[i + 2]];
                    return len % 3 === 2 ? base64 = base64.substring(0, base64.length - 1) + "=" : len % 3 === 1 && (base64 = base64.substring(0, base64.length - 2) + "=="), 
                    base64;
                }, exports.decode = function(base64) {
                    var i, encoded1, encoded2, encoded3, encoded4, bufferLength = .75 * base64.length, len = base64.length, p = 0;
                    "=" === base64[base64.length - 1] && (bufferLength--, "=" === base64[base64.length - 2] && bufferLength--);
                    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
                    for (i = 0; len > i; i += 4) encoded1 = chars.indexOf(base64[i]), encoded2 = chars.indexOf(base64[i + 1]), 
                    encoded3 = chars.indexOf(base64[i + 2]), encoded4 = chars.indexOf(base64[i + 3]), 
                    bytes[p++] = encoded1 << 2 | encoded2 >> 4, bytes[p++] = (15 & encoded2) << 4 | encoded3 >> 2, 
                    bytes[p++] = (3 & encoded3) << 6 | 63 & encoded4;
                    return arraybuffer;
                };
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
        }, {} ],
        30: [ function(_dereq_, module, exports) {
            (function(global) {
                function mapArrayBufferViews(ary) {
                    for (var i = 0; i < ary.length; i++) {
                        var chunk = ary[i];
                        if (chunk.buffer instanceof ArrayBuffer) {
                            var buf = chunk.buffer;
                            if (chunk.byteLength !== buf.byteLength) {
                                var copy = new Uint8Array(chunk.byteLength);
                                copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength)), buf = copy.buffer;
                            }
                            ary[i] = buf;
                        }
                    }
                }
                function BlobBuilderConstructor(ary, options) {
                    options = options || {};
                    var bb = new BlobBuilder();
                    mapArrayBufferViews(ary);
                    for (var i = 0; i < ary.length; i++) bb.append(ary[i]);
                    return options.type ? bb.getBlob(options.type) : bb.getBlob();
                }
                function BlobConstructor(ary, options) {
                    return mapArrayBufferViews(ary), new Blob(ary, options || {});
                }
                var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder, blobSupported = function() {
                    try {
                        var a = new Blob([ "hi" ]);
                        return 2 === a.size;
                    } catch (e) {
                        return !1;
                    }
                }(), blobSupportsArrayBufferView = blobSupported && function() {
                    try {
                        var b = new Blob([ new Uint8Array([ 1, 2 ]) ]);
                        return 2 === b.size;
                    } catch (e) {
                        return !1;
                    }
                }(), blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
                module.exports = function() {
                    return blobSupported ? blobSupportsArrayBufferView ? global.Blob : BlobConstructor : blobBuilderSupported ? BlobBuilderConstructor : void 0;
                }();
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        31: [ function(_dereq_, module, exports) {
            (function(global) {
                !function(root) {
                    function ucs2decode(string) {
                        for (var value, extra, output = [], counter = 0, length = string.length; length > counter; ) value = string.charCodeAt(counter++), 
                        value >= 55296 && 56319 >= value && length > counter ? (extra = string.charCodeAt(counter++), 
                        56320 == (64512 & extra) ? output.push(((1023 & value) << 10) + (1023 & extra) + 65536) : (output.push(value), 
                        counter--)) : output.push(value);
                        return output;
                    }
                    function ucs2encode(array) {
                        for (var value, length = array.length, index = -1, output = ""; ++index < length; ) value = array[index], 
                        value > 65535 && (value -= 65536, output += stringFromCharCode(value >>> 10 & 1023 | 55296), 
                        value = 56320 | 1023 & value), output += stringFromCharCode(value);
                        return output;
                    }
                    function checkScalarValue(codePoint) {
                        if (codePoint >= 55296 && 57343 >= codePoint) throw Error("Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value");
                    }
                    function createByte(codePoint, shift) {
                        return stringFromCharCode(codePoint >> shift & 63 | 128);
                    }
                    function encodeCodePoint(codePoint) {
                        if (0 == (4294967168 & codePoint)) return stringFromCharCode(codePoint);
                        var symbol = "";
                        return 0 == (4294965248 & codePoint) ? symbol = stringFromCharCode(codePoint >> 6 & 31 | 192) : 0 == (4294901760 & codePoint) ? (checkScalarValue(codePoint), 
                        symbol = stringFromCharCode(codePoint >> 12 & 15 | 224), symbol += createByte(codePoint, 6)) : 0 == (4292870144 & codePoint) && (symbol = stringFromCharCode(codePoint >> 18 & 7 | 240), 
                        symbol += createByte(codePoint, 12), symbol += createByte(codePoint, 6)), symbol += stringFromCharCode(63 & codePoint | 128);
                    }
                    function utf8encode(string) {
                        for (var codePoint, codePoints = ucs2decode(string), length = codePoints.length, index = -1, byteString = ""; ++index < length; ) codePoint = codePoints[index], 
                        byteString += encodeCodePoint(codePoint);
                        return byteString;
                    }
                    function readContinuationByte() {
                        if (byteIndex >= byteCount) throw Error("Invalid byte index");
                        var continuationByte = 255 & byteArray[byteIndex];
                        if (byteIndex++, 128 == (192 & continuationByte)) return 63 & continuationByte;
                        throw Error("Invalid continuation byte");
                    }
                    function decodeSymbol() {
                        var byte1, byte2, byte3, byte4, codePoint;
                        if (byteIndex > byteCount) throw Error("Invalid byte index");
                        if (byteIndex == byteCount) return !1;
                        if (byte1 = 255 & byteArray[byteIndex], byteIndex++, 0 == (128 & byte1)) return byte1;
                        if (192 == (224 & byte1)) {
                            var byte2 = readContinuationByte();
                            if (codePoint = (31 & byte1) << 6 | byte2, codePoint >= 128) return codePoint;
                            throw Error("Invalid continuation byte");
                        }
                        if (224 == (240 & byte1)) {
                            if (byte2 = readContinuationByte(), byte3 = readContinuationByte(), codePoint = (15 & byte1) << 12 | byte2 << 6 | byte3, 
                            codePoint >= 2048) return checkScalarValue(codePoint), codePoint;
                            throw Error("Invalid continuation byte");
                        }
                        if (240 == (248 & byte1) && (byte2 = readContinuationByte(), byte3 = readContinuationByte(), 
                        byte4 = readContinuationByte(), codePoint = (15 & byte1) << 18 | byte2 << 12 | byte3 << 6 | byte4, 
                        codePoint >= 65536 && 1114111 >= codePoint)) return codePoint;
                        throw Error("Invalid UTF-8 detected");
                    }
                    function utf8decode(byteString) {
                        byteArray = ucs2decode(byteString), byteCount = byteArray.length, byteIndex = 0;
                        for (var tmp, codePoints = []; (tmp = decodeSymbol()) !== !1; ) codePoints.push(tmp);
                        return ucs2encode(codePoints);
                    }
                    var freeExports = "object" == typeof exports && exports, freeModule = "object" == typeof module && module && module.exports == freeExports && module, freeGlobal = "object" == typeof global && global;
                    (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) && (root = freeGlobal);
                    var byteArray, byteCount, byteIndex, stringFromCharCode = String.fromCharCode, utf8 = {
                        version: "2.0.0",
                        encode: utf8encode,
                        decode: utf8decode
                    };
                    if ("function" == typeof define && "object" == typeof define.amd && define.amd) define(function() {
                        return utf8;
                    }); else if (freeExports && !freeExports.nodeType) if (freeModule) freeModule.exports = utf8; else {
                        var object = {}, hasOwnProperty = object.hasOwnProperty;
                        for (var key in utf8) hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
                    } else root.utf8 = utf8;
                }(this);
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        32: [ function(_dereq_, module, exports) {
            (function(global) {
                var rvalidchars = /^[\],:{}\s]*$/, rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rtrimLeft = /^\s+/, rtrimRight = /\s+$/;
                module.exports = function(data) {
                    return "string" == typeof data && data ? (data = data.replace(rtrimLeft, "").replace(rtrimRight, ""), 
                    global.JSON && JSON.parse ? JSON.parse(data) : rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")) ? new Function("return " + data)() : void 0) : null;
                };
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        33: [ function(_dereq_, module, exports) {
            exports.encode = function(obj) {
                var str = "";
                for (var i in obj) obj.hasOwnProperty(i) && (str.length && (str += "&"), str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                return str;
            }, exports.decode = function(qs) {
                for (var qry = {}, pairs = qs.split("&"), i = 0, l = pairs.length; l > i; i++) {
                    var pair = pairs[i].split("=");
                    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                }
                return qry;
            };
        }, {} ],
        34: [ function(_dereq_, module, exports) {
            var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, parts = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
            module.exports = function(str) {
                var src = str, b = str.indexOf("["), e = str.indexOf("]");
                -1 != b && -1 != e && (str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length));
                for (var m = re.exec(str || ""), uri = {}, i = 14; i--; ) uri[parts[i]] = m[i] || "";
                return -1 != b && -1 != e && (uri.source = src, uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":"), 
                uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
                uri.ipv6uri = !0), uri;
            };
        }, {} ],
        35: [ function(_dereq_, module, exports) {
            function ws(uri, protocols, opts) {
                var instance;
                return instance = protocols ? new WebSocket(uri, protocols) : new WebSocket(uri);
            }
            var global = function() {
                return this;
            }(), WebSocket = global.WebSocket || global.MozWebSocket;
            module.exports = WebSocket ? ws : null, WebSocket && (ws.prototype = WebSocket.prototype);
        }, {} ],
        36: [ function(_dereq_, module, exports) {
            (function(global) {
                function hasBinary(data) {
                    function _hasBinary(obj) {
                        if (!obj) return !1;
                        if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) return !0;
                        if (isArray(obj)) {
                            for (var i = 0; i < obj.length; i++) if (_hasBinary(obj[i])) return !0;
                        } else if (obj && "object" == typeof obj) {
                            obj.toJSON && (obj = obj.toJSON());
                            for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) return !0;
                        }
                        return !1;
                    }
                    return _hasBinary(data);
                }
                var isArray = _dereq_("isarray");
                module.exports = hasBinary;
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            isarray: 37
        } ],
        37: [ function(_dereq_, module, exports) {
            module.exports = Array.isArray || function(arr) {
                return "[object Array]" == Object.prototype.toString.call(arr);
            };
        }, {} ],
        38: [ function(_dereq_, module, exports) {
            var global = _dereq_("global");
            try {
                module.exports = "XMLHttpRequest" in global && "withCredentials" in new global.XMLHttpRequest();
            } catch (err) {
                module.exports = !1;
            }
        }, {
            global: 39
        } ],
        39: [ function(_dereq_, module, exports) {
            module.exports = function() {
                return this;
            }();
        }, {} ],
        40: [ function(_dereq_, module, exports) {
            var indexOf = [].indexOf;
            module.exports = function(arr, obj) {
                if (indexOf) return arr.indexOf(obj);
                for (var i = 0; i < arr.length; ++i) if (arr[i] === obj) return i;
                return -1;
            };
        }, {} ],
        41: [ function(_dereq_, module, exports) {
            var has = Object.prototype.hasOwnProperty;
            exports.keys = Object.keys || function(obj) {
                var keys = [];
                for (var key in obj) has.call(obj, key) && keys.push(key);
                return keys;
            }, exports.values = function(obj) {
                var vals = [];
                for (var key in obj) has.call(obj, key) && vals.push(obj[key]);
                return vals;
            }, exports.merge = function(a, b) {
                for (var key in b) has.call(b, key) && (a[key] = b[key]);
                return a;
            }, exports.length = function(obj) {
                return exports.keys(obj).length;
            }, exports.isEmpty = function(obj) {
                return 0 == exports.length(obj);
            };
        }, {} ],
        42: [ function(_dereq_, module, exports) {
            var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, parts = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
            module.exports = function(str) {
                for (var m = re.exec(str || ""), uri = {}, i = 14; i--; ) uri[parts[i]] = m[i] || "";
                return uri;
            };
        }, {} ],
        43: [ function(_dereq_, module, exports) {
            (function(global) {
                var isArray = _dereq_("isarray"), isBuf = _dereq_("./is-buffer");
                exports.deconstructPacket = function(packet) {
                    function _deconstructPacket(data) {
                        if (!data) return data;
                        if (isBuf(data)) {
                            var placeholder = {
                                _placeholder: !0,
                                num: buffers.length
                            };
                            return buffers.push(data), placeholder;
                        }
                        if (isArray(data)) {
                            for (var newData = new Array(data.length), i = 0; i < data.length; i++) newData[i] = _deconstructPacket(data[i]);
                            return newData;
                        }
                        if ("object" == typeof data && !(data instanceof Date)) {
                            var newData = {};
                            for (var key in data) newData[key] = _deconstructPacket(data[key]);
                            return newData;
                        }
                        return data;
                    }
                    var buffers = [], packetData = packet.data, pack = packet;
                    return pack.data = _deconstructPacket(packetData), pack.attachments = buffers.length, 
                    {
                        packet: pack,
                        buffers: buffers
                    };
                }, exports.reconstructPacket = function(packet, buffers) {
                    function _reconstructPacket(data) {
                        if (data && data._placeholder) {
                            var buf = buffers[data.num];
                            return buf;
                        }
                        if (isArray(data)) {
                            for (var i = 0; i < data.length; i++) data[i] = _reconstructPacket(data[i]);
                            return data;
                        }
                        if (data && "object" == typeof data) {
                            for (var key in data) data[key] = _reconstructPacket(data[key]);
                            return data;
                        }
                        return data;
                    }
                    return packet.data = _reconstructPacket(packet.data), packet.attachments = void 0, 
                    packet;
                }, exports.removeBlobs = function(data, callback) {
                    function _removeBlobs(obj, curKey, containingObject) {
                        if (!obj) return obj;
                        if (global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                            pendingBlobs++;
                            var fileReader = new FileReader();
                            fileReader.onload = function() {
                                containingObject ? containingObject[curKey] = this.result : bloblessData = this.result, 
                                --pendingBlobs || callback(bloblessData);
                            }, fileReader.readAsArrayBuffer(obj);
                        } else if (isArray(obj)) for (var i = 0; i < obj.length; i++) _removeBlobs(obj[i], i, obj); else if (obj && "object" == typeof obj && !isBuf(obj)) for (var key in obj) _removeBlobs(obj[key], key, obj);
                    }
                    var pendingBlobs = 0, bloblessData = data;
                    _removeBlobs(bloblessData), pendingBlobs || callback(bloblessData);
                };
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            "./is-buffer": 45,
            isarray: 46
        } ],
        44: [ function(_dereq_, module, exports) {
            function Encoder() {}
            function encodeAsString(obj) {
                var str = "", nsp = !1;
                return str += obj.type, (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) && (str += obj.attachments, 
                str += "-"), obj.nsp && "/" != obj.nsp && (nsp = !0, str += obj.nsp), null != obj.id && (nsp && (str += ",", 
                nsp = !1), str += obj.id), null != obj.data && (nsp && (str += ","), str += json.stringify(obj.data)), 
                debug("encoded %j as %s", obj, str), str;
            }
            function encodeAsBinary(obj, callback) {
                function writeEncoding(bloblessData) {
                    var deconstruction = binary.deconstructPacket(bloblessData), pack = encodeAsString(deconstruction.packet), buffers = deconstruction.buffers;
                    buffers.unshift(pack), callback(buffers);
                }
                binary.removeBlobs(obj, writeEncoding);
            }
            function Decoder() {
                this.reconstructor = null;
            }
            function decodeString(str) {
                var p = {}, i = 0;
                if (p.type = Number(str.charAt(0)), null == exports.types[p.type]) return error();
                if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
                    for (var buf = ""; "-" != str.charAt(++i) && (buf += str.charAt(i), i != str.length); ) ;
                    if (buf != Number(buf) || "-" != str.charAt(i)) throw new Error("Illegal attachments");
                    p.attachments = Number(buf);
                }
                if ("/" == str.charAt(i + 1)) for (p.nsp = ""; ++i; ) {
                    var c = str.charAt(i);
                    if ("," == c) break;
                    if (p.nsp += c, i == str.length) break;
                } else p.nsp = "/";
                var next = str.charAt(i + 1);
                if ("" !== next && Number(next) == next) {
                    for (p.id = ""; ++i; ) {
                        var c = str.charAt(i);
                        if (null == c || Number(c) != c) {
                            --i;
                            break;
                        }
                        if (p.id += str.charAt(i), i == str.length) break;
                    }
                    p.id = Number(p.id);
                }
                if (str.charAt(++i)) try {
                    p.data = json.parse(str.substr(i));
                } catch (e) {
                    return error();
                }
                return debug("decoded %s as %j", str, p), p;
            }
            function BinaryReconstructor(packet) {
                this.reconPack = packet, this.buffers = [];
            }
            function error(data) {
                return {
                    type: exports.ERROR,
                    data: "parser error"
                };
            }
            var debug = _dereq_("debug")("socket.io-parser"), json = _dereq_("json3"), Emitter = (_dereq_("isarray"), 
            _dereq_("component-emitter")), binary = _dereq_("./binary"), isBuf = _dereq_("./is-buffer");
            exports.protocol = 4, exports.types = [ "CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR" ], 
            exports.CONNECT = 0, exports.DISCONNECT = 1, exports.EVENT = 2, exports.ACK = 3, 
            exports.ERROR = 4, exports.BINARY_EVENT = 5, exports.BINARY_ACK = 6, exports.Encoder = Encoder, 
            exports.Decoder = Decoder, Encoder.prototype.encode = function(obj, callback) {
                if (debug("encoding packet %j", obj), exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) encodeAsBinary(obj, callback); else {
                    var encoding = encodeAsString(obj);
                    callback([ encoding ]);
                }
            }, Emitter(Decoder.prototype), Decoder.prototype.add = function(obj) {
                var packet;
                if ("string" == typeof obj) packet = decodeString(obj), exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type ? (this.reconstructor = new BinaryReconstructor(packet), 
                0 === this.reconstructor.reconPack.attachments && this.emit("decoded", packet)) : this.emit("decoded", packet); else {
                    if (!isBuf(obj) && !obj.base64) throw new Error("Unknown type: " + obj);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    packet = this.reconstructor.takeBinaryData(obj), packet && (this.reconstructor = null, 
                    this.emit("decoded", packet));
                }
            }, Decoder.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction();
            }, BinaryReconstructor.prototype.takeBinaryData = function(binData) {
                if (this.buffers.push(binData), this.buffers.length == this.reconPack.attachments) {
                    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), packet;
                }
                return null;
            }, BinaryReconstructor.prototype.finishedReconstruction = function() {
                this.reconPack = null, this.buffers = [];
            };
        }, {
            "./binary": 43,
            "./is-buffer": 45,
            "component-emitter": 9,
            debug: 10,
            isarray: 46,
            json3: 47
        } ],
        45: [ function(_dereq_, module, exports) {
            (function(global) {
                function isBuf(obj) {
                    return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer;
                }
                module.exports = isBuf;
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        46: [ function(_dereq_, module, exports) {
            module.exports = _dereq_(37);
        }, {} ],
        47: [ function(_dereq_, module, exports) {
            !function(window) {
                function has(name) {
                    if (has[name] !== undef) return has[name];
                    var isSupported;
                    if ("bug-string-char-index" == name) isSupported = "a" != "a"[0]; else if ("json" == name) isSupported = has("json-stringify") && has("json-parse"); else {
                        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        if ("json-stringify" == name) {
                            var stringify = JSON3.stringify, stringifySupported = "function" == typeof stringify && isExtended;
                            if (stringifySupported) {
                                (value = function() {
                                    return 1;
                                }).toJSON = value;
                                try {
                                    stringifySupported = "0" === stringify(0) && "0" === stringify(new Number()) && '""' == stringify(new String()) && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && "1" === stringify(value) && "[1]" == stringify([ value ]) && "[null]" == stringify([ undef ]) && "null" == stringify(null) && "[null,null,null]" == stringify([ undef, getClass, null ]) && stringify({
                                        a: [ value, !0, !1, null, "\x00\b\n\f\r	" ]
                                    }) == serialized && "1" === stringify(null, value) && "[\n 1,\n 2\n]" == stringify([ 1, 2 ], null, 1) && '"-271821-04-20T00:00:00.000Z"' == stringify(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == stringify(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == stringify(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == stringify(new Date(-1));
                                } catch (exception) {
                                    stringifySupported = !1;
                                }
                            }
                            isSupported = stringifySupported;
                        }
                        if ("json-parse" == name) {
                            var parse = JSON3.parse;
                            if ("function" == typeof parse) try {
                                if (0 === parse("0") && !parse(!1)) {
                                    value = parse(serialized);
                                    var parseSupported = 5 == value.a.length && 1 === value.a[0];
                                    if (parseSupported) {
                                        try {
                                            parseSupported = !parse('"	"');
                                        } catch (exception) {}
                                        if (parseSupported) try {
                                            parseSupported = 1 !== parse("01");
                                        } catch (exception) {}
                                        if (parseSupported) try {
                                            parseSupported = 1 !== parse("1.");
                                        } catch (exception) {}
                                    }
                                }
                            } catch (exception) {
                                parseSupported = !1;
                            }
                            isSupported = parseSupported;
                        }
                    }
                    return has[name] = !!isSupported;
                }
                var isProperty, forEach, undef, getClass = {}.toString, isLoader = "function" == typeof define && define.amd, nativeJSON = "object" == typeof JSON && JSON, JSON3 = "object" == typeof exports && exports && !exports.nodeType && exports;
                JSON3 && nativeJSON ? (JSON3.stringify = nativeJSON.stringify, JSON3.parse = nativeJSON.parse) : JSON3 = window.JSON = nativeJSON || {};
                var isExtended = new Date(-0xc782b5b800cec);
                try {
                    isExtended = -109252 == isExtended.getUTCFullYear() && 0 === isExtended.getUTCMonth() && 1 === isExtended.getUTCDate() && 10 == isExtended.getUTCHours() && 37 == isExtended.getUTCMinutes() && 6 == isExtended.getUTCSeconds() && 708 == isExtended.getUTCMilliseconds();
                } catch (exception) {}
                if (!has("json")) {
                    var functionClass = "[object Function]", dateClass = "[object Date]", numberClass = "[object Number]", stringClass = "[object String]", arrayClass = "[object Array]", booleanClass = "[object Boolean]", charIndexBuggy = has("bug-string-char-index");
                    if (!isExtended) var floor = Math.floor, Months = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], getDay = function(year, month) {
                        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                    };
                    (isProperty = {}.hasOwnProperty) || (isProperty = function(property) {
                        var constructor, members = {};
                        return (members.__proto__ = null, members.__proto__ = {
                            toString: 1
                        }, members).toString != getClass ? isProperty = function(property) {
                            var original = this.__proto__, result = property in (this.__proto__ = null, this);
                            return this.__proto__ = original, result;
                        } : (constructor = members.constructor, isProperty = function(property) {
                            var parent = (this.constructor || constructor).prototype;
                            return property in this && !(property in parent && this[property] === parent[property]);
                        }), members = null, isProperty.call(this, property);
                    });
                    var PrimitiveTypes = {
                        "boolean": 1,
                        number: 1,
                        string: 1,
                        undefined: 1
                    }, isHostType = function(object, property) {
                        var type = typeof object[property];
                        return "object" == type ? !!object[property] : !PrimitiveTypes[type];
                    };
                    if (forEach = function(object, callback) {
                        var Properties, members, property, size = 0;
                        (Properties = function() {
                            this.valueOf = 0;
                        }).prototype.valueOf = 0, members = new Properties();
                        for (property in members) isProperty.call(members, property) && size++;
                        return Properties = members = null, size ? forEach = 2 == size ? function(object, callback) {
                            var property, members = {}, isFunction = getClass.call(object) == functionClass;
                            for (property in object) isFunction && "prototype" == property || isProperty.call(members, property) || !(members[property] = 1) || !isProperty.call(object, property) || callback(property);
                        } : function(object, callback) {
                            var property, isConstructor, isFunction = getClass.call(object) == functionClass;
                            for (property in object) isFunction && "prototype" == property || !isProperty.call(object, property) || (isConstructor = "constructor" === property) || callback(property);
                            (isConstructor || isProperty.call(object, property = "constructor")) && callback(property);
                        } : (members = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ], 
                        forEach = function(object, callback) {
                            var property, length, isFunction = getClass.call(object) == functionClass, hasProperty = !isFunction && "function" != typeof object.constructor && isHostType(object, "hasOwnProperty") ? object.hasOwnProperty : isProperty;
                            for (property in object) isFunction && "prototype" == property || !hasProperty.call(object, property) || callback(property);
                            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) ;
                        }), forEach(object, callback);
                    }, !has("json-stringify")) {
                        var Escapes = {
                            92: "\\\\",
                            34: '\\"',
                            8: "\\b",
                            12: "\\f",
                            10: "\\n",
                            13: "\\r",
                            9: "\\t"
                        }, leadingZeroes = "000000", toPaddedString = function(width, value) {
                            return (leadingZeroes + (value || 0)).slice(-width);
                        }, unicodePrefix = "\\u00", quote = function(value) {
                            var symbols, result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy;
                            for (isLarge && (symbols = value.split("")); length > index; index++) {
                                var charCode = value.charCodeAt(index);
                                switch (charCode) {
                                  case 8:
                                  case 9:
                                  case 10:
                                  case 12:
                                  case 13:
                                  case 34:
                                  case 92:
                                    result += Escapes[charCode];
                                    break;

                                  default:
                                    if (32 > charCode) {
                                        result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                                        break;
                                    }
                                    result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
                                }
                            }
                            return result + '"';
                        }, serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
                            var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
                            try {
                                value = object[property];
                            } catch (exception) {}
                            if ("object" == typeof value && value) if (className = getClass.call(value), className != dateClass || isProperty.call(value, "toJSON")) "function" == typeof value.toJSON && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value, "toJSON")) && (value = value.toJSON(property)); else if (value > -1 / 0 && 1 / 0 > value) {
                                if (getDay) {
                                    for (date = floor(value / 864e5), year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) ;
                                    for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) ;
                                    date = 1 + date - getDay(year, month), time = (value % 864e5 + 864e5) % 864e5, hours = floor(time / 36e5) % 24, 
                                    minutes = floor(time / 6e4) % 60, seconds = floor(time / 1e3) % 60, milliseconds = time % 1e3;
                                } else year = value.getUTCFullYear(), month = value.getUTCMonth(), date = value.getUTCDate(), 
                                hours = value.getUTCHours(), minutes = value.getUTCMinutes(), seconds = value.getUTCSeconds(), 
                                milliseconds = value.getUTCMilliseconds();
                                value = (0 >= year || year >= 1e4 ? (0 > year ? "-" : "+") + toPaddedString(6, 0 > year ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + "." + toPaddedString(3, milliseconds) + "Z";
                            } else value = null;
                            if (callback && (value = callback.call(object, property, value)), null === value) return "null";
                            if (className = getClass.call(value), className == booleanClass) return "" + value;
                            if (className == numberClass) return value > -1 / 0 && 1 / 0 > value ? "" + value : "null";
                            if (className == stringClass) return quote("" + value);
                            if ("object" == typeof value) {
                                for (length = stack.length; length--; ) if (stack[length] === value) throw TypeError();
                                if (stack.push(value), results = [], prefix = indentation, indentation += whitespace, 
                                className == arrayClass) {
                                    for (index = 0, length = value.length; length > index; index++) element = serialize(index, value, callback, properties, whitespace, indentation, stack), 
                                    results.push(element === undef ? "null" : element);
                                    result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                                } else forEach(properties || value, function(property) {
                                    var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                                    element !== undef && results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                                }), result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                                return stack.pop(), result;
                            }
                        };
                        JSON3.stringify = function(source, filter, width) {
                            var whitespace, callback, properties, className;
                            if ("function" == typeof filter || "object" == typeof filter && filter) if ((className = getClass.call(filter)) == functionClass) callback = filter; else if (className == arrayClass) {
                                properties = {};
                                for (var value, index = 0, length = filter.length; length > index; value = filter[index++], 
                                className = getClass.call(value), (className == stringClass || className == numberClass) && (properties[value] = 1)) ;
                            }
                            if (width) if ((className = getClass.call(width)) == numberClass) {
                                if ((width -= width % 1) > 0) for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") ;
                            } else className == stringClass && (whitespace = width.length <= 10 ? width : width.slice(0, 10));
                            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                        };
                    }
                    if (!has("json-parse")) {
                        var Index, Source, fromCharCode = String.fromCharCode, Unescapes = {
                            92: "\\",
                            34: '"',
                            47: "/",
                            98: "\b",
                            116: "	",
                            110: "\n",
                            102: "\f",
                            114: "\r"
                        }, abort = function() {
                            throw Index = Source = null, SyntaxError();
                        }, lex = function() {
                            for (var value, begin, position, isSigned, charCode, source = Source, length = source.length; length > Index; ) switch (charCode = source.charCodeAt(Index)) {
                              case 9:
                              case 10:
                              case 13:
                              case 32:
                                Index++;
                                break;

                              case 123:
                              case 125:
                              case 91:
                              case 93:
                              case 58:
                              case 44:
                                return value = charIndexBuggy ? source.charAt(Index) : source[Index], Index++, value;

                              case 34:
                                for (value = "@", Index++; length > Index; ) if (charCode = source.charCodeAt(Index), 
                                32 > charCode) abort(); else if (92 == charCode) switch (charCode = source.charCodeAt(++Index)) {
                                  case 92:
                                  case 34:
                                  case 47:
                                  case 98:
                                  case 116:
                                  case 110:
                                  case 102:
                                  case 114:
                                    value += Unescapes[charCode], Index++;
                                    break;

                                  case 117:
                                    for (begin = ++Index, position = Index + 4; position > Index; Index++) charCode = source.charCodeAt(Index), 
                                    charCode >= 48 && 57 >= charCode || charCode >= 97 && 102 >= charCode || charCode >= 65 && 70 >= charCode || abort();
                                    value += fromCharCode("0x" + source.slice(begin, Index));
                                    break;

                                  default:
                                    abort();
                                } else {
                                    if (34 == charCode) break;
                                    for (charCode = source.charCodeAt(Index), begin = Index; charCode >= 32 && 92 != charCode && 34 != charCode; ) charCode = source.charCodeAt(++Index);
                                    value += source.slice(begin, Index);
                                }
                                if (34 == source.charCodeAt(Index)) return Index++, value;
                                abort();

                              default:
                                if (begin = Index, 45 == charCode && (isSigned = !0, charCode = source.charCodeAt(++Index)), 
                                charCode >= 48 && 57 >= charCode) {
                                    for (48 == charCode && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && 57 >= charCode) && abort(), 
                                    isSigned = !1; length > Index && (charCode = source.charCodeAt(Index), charCode >= 48 && 57 >= charCode); Index++) ;
                                    if (46 == source.charCodeAt(Index)) {
                                        for (position = ++Index; length > position && (charCode = source.charCodeAt(position), 
                                        charCode >= 48 && 57 >= charCode); position++) ;
                                        position == Index && abort(), Index = position;
                                    }
                                    if (charCode = source.charCodeAt(Index), 101 == charCode || 69 == charCode) {
                                        for (charCode = source.charCodeAt(++Index), (43 == charCode || 45 == charCode) && Index++, 
                                        position = Index; length > position && (charCode = source.charCodeAt(position), 
                                        charCode >= 48 && 57 >= charCode); position++) ;
                                        position == Index && abort(), Index = position;
                                    }
                                    return +source.slice(begin, Index);
                                }
                                if (isSigned && abort(), "true" == source.slice(Index, Index + 4)) return Index += 4, 
                                !0;
                                if ("false" == source.slice(Index, Index + 5)) return Index += 5, !1;
                                if ("null" == source.slice(Index, Index + 4)) return Index += 4, null;
                                abort();
                            }
                            return "$";
                        }, get = function(value) {
                            var results, hasMembers;
                            if ("$" == value && abort(), "string" == typeof value) {
                                if ("@" == (charIndexBuggy ? value.charAt(0) : value[0])) return value.slice(1);
                                if ("[" == value) {
                                    for (results = []; value = lex(), "]" != value; hasMembers || (hasMembers = !0)) hasMembers && ("," == value ? (value = lex(), 
                                    "]" == value && abort()) : abort()), "," == value && abort(), results.push(get(value));
                                    return results;
                                }
                                if ("{" == value) {
                                    for (results = {}; value = lex(), "}" != value; hasMembers || (hasMembers = !0)) hasMembers && ("," == value ? (value = lex(), 
                                    "}" == value && abort()) : abort()), ("," == value || "string" != typeof value || "@" != (charIndexBuggy ? value.charAt(0) : value[0]) || ":" != lex()) && abort(), 
                                    results[value.slice(1)] = get(lex());
                                    return results;
                                }
                                abort();
                            }
                            return value;
                        }, update = function(source, property, callback) {
                            var element = walk(source, property, callback);
                            element === undef ? delete source[property] : source[property] = element;
                        }, walk = function(source, property, callback) {
                            var length, value = source[property];
                            if ("object" == typeof value && value) if (getClass.call(value) == arrayClass) for (length = value.length; length--; ) update(value, length, callback); else forEach(value, function(property) {
                                update(value, property, callback);
                            });
                            return callback.call(source, property, value);
                        };
                        JSON3.parse = function(source, callback) {
                            var result, value;
                            return Index = 0, Source = "" + source, result = get(lex()), "$" != lex() && abort(), 
                            Index = Source = null, callback && getClass.call(callback) == functionClass ? walk((value = {}, 
                            value[""] = result, value), "", callback) : result;
                        };
                    }
                }
                isLoader && define(function() {
                    return JSON3;
                });
            }(this);
        }, {} ],
        48: [ function(_dereq_, module, exports) {
            function toArray(list, index) {
                var array = [];
                index = index || 0;
                for (var i = index || 0; i < list.length; i++) array[i - index] = list[i];
                return array;
            }
            module.exports = toArray;
        }, {} ]
    }, {}, [ 1 ])(1);
}), function(window, document, undefined) {
    "use strict";
    !function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, l, l.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(require, module, exports) {
            var _interopRequireWildcard = function(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var previousWindowKeyDown, lastFocusedButton, sweetAlert, swal, _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = require("./modules/handle-dom"), _extend$hexToRgb$isIE8$logStr$colorLuminance = require("./modules/utils"), _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = require("./modules/handle-swal-dom"), _handleButton$handleConfirm$handleCancel = require("./modules/handle-click"), _handleKeyDown = require("./modules/handle-key"), _handleKeyDown2 = _interopRequireWildcard(_handleKeyDown), _defaultParams = require("./modules/default-params"), _defaultParams2 = _interopRequireWildcard(_defaultParams), _setParameters = require("./modules/set-params"), _setParameters2 = _interopRequireWildcard(_setParameters);
            exports["default"] = sweetAlert = swal = function() {
                function argumentOrDefault(key) {
                    var args = customizations;
                    return args[key] === undefined ? _defaultParams2["default"][key] : args[key];
                }
                var customizations = arguments[0];
                if (_hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, "stop-scrolling"), 
                _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput(), 
                customizations === undefined) return _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr("SweetAlert expects at least 1 attribute!"), 
                !1;
                var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2["default"]);
                switch (typeof customizations) {
                  case "string":
                    params.title = customizations, params.text = arguments[1] || "", params.type = arguments[2] || "";
                    break;

                  case "object":
                    if (customizations.title === undefined) return _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!'), 
                    !1;
                    params.title = customizations.title;
                    for (var customName in _defaultParams2["default"]) params[customName] = argumentOrDefault(customName);
                    params.confirmButtonText = params.showCancelButton ? "Confirm" : _defaultParams2["default"].confirmButtonText, 
                    params.confirmButtonText = argumentOrDefault("confirmButtonText"), params.doneFunction = arguments[1] || null;
                    break;

                  default:
                    return _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations), 
                    !1;
                }
                _setParameters2["default"](params), _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition(), 
                _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal(arguments[1]);
                for (var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal(), $buttons = modal.querySelectorAll("button"), buttonEvents = [ "onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus" ], onButtonEvent = function(e) {
                    return _handleButton$handleConfirm$handleCancel.handleButton(e, params, modal);
                }, btnIndex = 0; btnIndex < $buttons.length; btnIndex++) for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
                    var btnEvt = buttonEvents[evtIndex];
                    $buttons[btnIndex][btnEvt] = onButtonEvent;
                }
                _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent, 
                previousWindowKeyDown = window.onkeydown;
                var onKeyEvent = function(e) {
                    return _handleKeyDown2["default"](e, params, modal);
                };
                window.onkeydown = onKeyEvent, window.onfocus = function() {
                    setTimeout(function() {
                        lastFocusedButton !== undefined && (lastFocusedButton.focus(), lastFocusedButton = undefined);
                    }, 0);
                }, swal.enableButtons();
            }, sweetAlert.setDefaults = swal.setDefaults = function(userParams) {
                if (!userParams) throw new Error("userParams is required");
                if ("object" != typeof userParams) throw new Error("userParams has to be a object");
                _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2["default"], userParams);
            }, sweetAlert.close = swal.close = function() {
                var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, "showSweetAlert"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, "hideSweetAlert"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, "visible");
                var $successIcon = modal.querySelector(".sa-icon.sa-success");
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, "animate"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector(".sa-tip"), "animateSuccessTip"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector(".sa-long"), "animateSuccessLong");
                var $errorIcon = modal.querySelector(".sa-icon.sa-error");
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, "animateErrorIcon"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector(".sa-x-mark"), "animateXMark");
                var $warningIcon = modal.querySelector(".sa-icon.sa-warning");
                return _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, "pulseWarning"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector(".sa-body"), "pulseWarningIns"), 
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector(".sa-dot"), "pulseWarningIns"), 
                setTimeout(function() {
                    var customClass = modal.getAttribute("data-custom-class");
                    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, customClass);
                }, 300), _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, "stop-scrolling"), 
                window.onkeydown = previousWindowKeyDown, window.previousActiveElement && window.previousActiveElement.focus(), 
                lastFocusedButton = undefined, clearTimeout(modal.timeout), !0;
            }, sweetAlert.showInputError = swal.showInputError = function(errorMessage) {
                var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal(), $errorIcon = modal.querySelector(".sa-input-error");
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, "show");
                var $errorContainer = modal.querySelector(".sa-error-container");
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, "show"), 
                $errorContainer.querySelector("p").innerHTML = errorMessage, setTimeout(function() {
                    sweetAlert.enableButtons();
                }, 1), modal.querySelector("input").focus();
            }, sweetAlert.resetInputError = swal.resetInputError = function(event) {
                if (event && 13 === event.keyCode) return !1;
                var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal(), $errorIcon = $modal.querySelector(".sa-input-error");
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, "show");
                var $errorContainer = $modal.querySelector(".sa-error-container");
                _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, "show");
            }, sweetAlert.disableButtons = swal.disableButtons = function(event) {
                var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal(), $confirmButton = modal.querySelector("button.confirm"), $cancelButton = modal.querySelector("button.cancel");
                $confirmButton.disabled = !0, $cancelButton.disabled = !0;
            }, sweetAlert.enableButtons = swal.enableButtons = function(event) {
                var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal(), $confirmButton = modal.querySelector("button.confirm"), $cancelButton = modal.querySelector("button.cancel");
                $confirmButton.disabled = !1, $cancelButton.disabled = !1;
            }, "undefined" != typeof window ? window.sweetAlert = window.swal = sweetAlert : _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr("SweetAlert is a frontend module!"), 
            module.exports = exports["default"];
        }, {
            "./modules/default-params": 2,
            "./modules/handle-click": 3,
            "./modules/handle-dom": 4,
            "./modules/handle-key": 5,
            "./modules/handle-swal-dom": 6,
            "./modules/set-params": 8,
            "./modules/utils": 9
        } ],
        2: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var defaultParams = {
                title: "",
                text: "",
                type: null,
                allowOutsideClick: !1,
                showConfirmButton: !0,
                showCancelButton: !1,
                closeOnConfirm: !0,
                closeOnCancel: !0,
                confirmButtonText: "OK",
                confirmButtonColor: "#8CD4F5",
                cancelButtonText: "Cancel",
                imageUrl: null,
                imageSize: null,
                timer: null,
                customClass: "",
                html: !1,
                animation: !0,
                allowEscapeKey: !0,
                inputType: "text",
                inputPlaceholder: "",
                inputValue: "",
                showLoaderOnConfirm: !1
            };
            exports["default"] = defaultParams, module.exports = exports["default"];
        }, {} ],
        3: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _colorLuminance = require("./utils"), _hasClass$isDescendant = (require("./handle-swal-dom"), 
            require("./handle-dom")), handleButton = function(event, params, modal) {
                function shouldSetConfirmButtonColor(color) {
                    targetedConfirm && params.confirmButtonColor && (target.style.backgroundColor = color);
                }
                var normalColor, hoverColor, activeColor, e = event || window.event, target = e.target || e.srcElement, targetedConfirm = -1 !== target.className.indexOf("confirm"), targetedOverlay = -1 !== target.className.indexOf("sweet-overlay"), modalIsVisible = _hasClass$isDescendant.hasClass(modal, "visible"), doneFunctionExists = params.doneFunction && "true" === modal.getAttribute("data-has-done-function");
                switch (targetedConfirm && params.confirmButtonColor && (normalColor = params.confirmButtonColor, 
                hoverColor = _colorLuminance.colorLuminance(normalColor, -.04), activeColor = _colorLuminance.colorLuminance(normalColor, -.14)), 
                e.type) {
                  case "mouseover":
                    shouldSetConfirmButtonColor(hoverColor);
                    break;

                  case "mouseout":
                    shouldSetConfirmButtonColor(normalColor);
                    break;

                  case "mousedown":
                    shouldSetConfirmButtonColor(activeColor);
                    break;

                  case "mouseup":
                    shouldSetConfirmButtonColor(hoverColor);
                    break;

                  case "focus":
                    var $confirmButton = modal.querySelector("button.confirm"), $cancelButton = modal.querySelector("button.cancel");
                    targetedConfirm ? $cancelButton.style.boxShadow = "none" : $confirmButton.style.boxShadow = "none";
                    break;

                  case "click":
                    var clickedOnModal = modal === target, clickedOnModalChild = _hasClass$isDescendant.isDescendant(modal, target);
                    if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) break;
                    targetedConfirm && doneFunctionExists && modalIsVisible ? handleConfirm(modal, params) : doneFunctionExists && modalIsVisible || targetedOverlay ? handleCancel(modal, params) : _hasClass$isDescendant.isDescendant(modal, target) && "BUTTON" === target.tagName && sweetAlert.close();
                }
            }, handleConfirm = function(modal, params) {
                var callbackValue = !0;
                _hasClass$isDescendant.hasClass(modal, "show-input") && (callbackValue = modal.querySelector("input").value, 
                callbackValue || (callbackValue = "")), params.doneFunction(callbackValue), params.closeOnConfirm && sweetAlert.close(), 
                params.showLoaderOnConfirm && sweetAlert.disableButtons();
            }, handleCancel = function(modal, params) {
                var functionAsStr = String(params.doneFunction).replace(/\s/g, ""), functionHandlesCancel = "function(" === functionAsStr.substring(0, 9) && ")" !== functionAsStr.substring(9, 10);
                functionHandlesCancel && params.doneFunction(!1), params.closeOnCancel && sweetAlert.close();
            };
            exports["default"] = {
                handleButton: handleButton,
                handleConfirm: handleConfirm,
                handleCancel: handleCancel
            }, module.exports = exports["default"];
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6,
            "./utils": 9
        } ],
        4: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var hasClass = function(elem, className) {
                return new RegExp(" " + className + " ").test(" " + elem.className + " ");
            }, addClass = function(elem, className) {
                hasClass(elem, className) || (elem.className += " " + className);
            }, removeClass = function(elem, className) {
                var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
                if (hasClass(elem, className)) {
                    for (;newClass.indexOf(" " + className + " ") >= 0; ) newClass = newClass.replace(" " + className + " ", " ");
                    elem.className = newClass.replace(/^\s+|\s+$/g, "");
                }
            }, escapeHtml = function(str) {
                var div = document.createElement("div");
                return div.appendChild(document.createTextNode(str)), div.innerHTML;
            }, _show = function(elem) {
                elem.style.opacity = "", elem.style.display = "block";
            }, show = function(elems) {
                if (elems && !elems.length) return _show(elems);
                for (var i = 0; i < elems.length; ++i) _show(elems[i]);
            }, _hide = function(elem) {
                elem.style.opacity = "", elem.style.display = "none";
            }, hide = function(elems) {
                if (elems && !elems.length) return _hide(elems);
                for (var i = 0; i < elems.length; ++i) _hide(elems[i]);
            }, isDescendant = function(parent, child) {
                for (var node = child.parentNode; null !== node; ) {
                    if (node === parent) return !0;
                    node = node.parentNode;
                }
                return !1;
            }, getTopMargin = function(elem) {
                elem.style.left = "-9999px", elem.style.display = "block";
                var padding, height = elem.clientHeight;
                return padding = "undefined" != typeof getComputedStyle ? parseInt(getComputedStyle(elem).getPropertyValue("padding-top"), 10) : parseInt(elem.currentStyle.padding), 
                elem.style.left = "", elem.style.display = "none", "-" + parseInt((height + padding) / 2) + "px";
            }, fadeIn = function(elem, interval) {
                if (+elem.style.opacity < 1) {
                    interval = interval || 16, elem.style.opacity = 0, elem.style.display = "block";
                    var last = +new Date(), tick = function(_tick) {
                        function tick() {
                            return _tick.apply(this, arguments);
                        }
                        return tick.toString = function() {
                            return _tick.toString();
                        }, tick;
                    }(function() {
                        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100, last = +new Date(), 
                        +elem.style.opacity < 1 && setTimeout(tick, interval);
                    });
                    tick();
                }
                elem.style.display = "block";
            }, fadeOut = function(elem, interval) {
                interval = interval || 16, elem.style.opacity = 1;
                var last = +new Date(), tick = function(_tick2) {
                    function tick() {
                        return _tick2.apply(this, arguments);
                    }
                    return tick.toString = function() {
                        return _tick2.toString();
                    }, tick;
                }(function() {
                    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100, last = +new Date(), 
                    +elem.style.opacity > 0 ? setTimeout(tick, interval) : elem.style.display = "none";
                });
                tick();
            }, fireClick = function(node) {
                if ("function" == typeof MouseEvent) {
                    var mevt = new MouseEvent("click", {
                        view: window,
                        bubbles: !1,
                        cancelable: !0
                    });
                    node.dispatchEvent(mevt);
                } else if (document.createEvent) {
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", !1, !1), node.dispatchEvent(evt);
                } else document.createEventObject ? node.fireEvent("onclick") : "function" == typeof node.onclick && node.onclick();
            }, stopEventPropagation = function(e) {
                "function" == typeof e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : window.event && window.event.hasOwnProperty("cancelBubble") && (window.event.cancelBubble = !0);
            };
            exports.hasClass = hasClass, exports.addClass = addClass, exports.removeClass = removeClass, 
            exports.escapeHtml = escapeHtml, exports._show = _show, exports.show = show, exports._hide = _hide, 
            exports.hide = hide, exports.isDescendant = isDescendant, exports.getTopMargin = getTopMargin, 
            exports.fadeIn = fadeIn, exports.fadeOut = fadeOut, exports.fireClick = fireClick, 
            exports.stopEventPropagation = stopEventPropagation;
        }, {} ],
        5: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _stopEventPropagation$fireClick = require("./handle-dom"), _setFocusStyle = require("./handle-swal-dom"), handleKeyDown = function(event, params, modal) {
                var e = event || window.event, keyCode = e.keyCode || e.which, $okButton = modal.querySelector("button.confirm"), $cancelButton = modal.querySelector("button.cancel"), $modalButtons = modal.querySelectorAll("button[tabindex]");
                if (-1 !== [ 9, 13, 32, 27 ].indexOf(keyCode)) {
                    for (var $targetElement = e.target || e.srcElement, btnIndex = -1, i = 0; i < $modalButtons.length; i++) if ($targetElement === $modalButtons[i]) {
                        btnIndex = i;
                        break;
                    }
                    9 === keyCode ? ($targetElement = -1 === btnIndex ? $okButton : btnIndex === $modalButtons.length - 1 ? $modalButtons[0] : $modalButtons[btnIndex + 1], 
                    _stopEventPropagation$fireClick.stopEventPropagation(e), $targetElement.focus(), 
                    params.confirmButtonColor && _setFocusStyle.setFocusStyle($targetElement, params.confirmButtonColor)) : 13 === keyCode ? ("INPUT" === $targetElement.tagName && ($targetElement = $okButton, 
                    $okButton.focus()), $targetElement = -1 === btnIndex ? $okButton : undefined) : 27 === keyCode && params.allowEscapeKey === !0 ? ($targetElement = $cancelButton, 
                    _stopEventPropagation$fireClick.fireClick($targetElement, e)) : $targetElement = undefined;
                }
            };
            exports["default"] = handleKeyDown, module.exports = exports["default"];
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6
        } ],
        6: [ function(require, module, exports) {
            var _interopRequireWildcard = function(obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            };
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _hexToRgb = require("./utils"), _removeClass$getTopMargin$fadeIn$show$addClass = require("./handle-dom"), _defaultParams = require("./default-params"), _defaultParams2 = _interopRequireWildcard(_defaultParams), _injectedHTML = require("./injected-html"), _injectedHTML2 = _interopRequireWildcard(_injectedHTML), modalClass = ".sweet-alert", overlayClass = ".sweet-overlay", sweetAlertInitialize = function() {
                var sweetWrap = document.createElement("div");
                for (sweetWrap.innerHTML = _injectedHTML2["default"]; sweetWrap.firstChild; ) document.body.appendChild(sweetWrap.firstChild);
            }, getModal = function(_getModal) {
                function getModal() {
                    return _getModal.apply(this, arguments);
                }
                return getModal.toString = function() {
                    return _getModal.toString();
                }, getModal;
            }(function() {
                var $modal = document.querySelector(modalClass);
                return $modal || (sweetAlertInitialize(), $modal = getModal()), $modal;
            }), getInput = function() {
                var $modal = getModal();
                return $modal ? $modal.querySelector("input") : void 0;
            }, getOverlay = function() {
                return document.querySelector(overlayClass);
            }, setFocusStyle = function($button, bgColor) {
                var rgbColor = _hexToRgb.hexToRgb(bgColor);
                $button.style.boxShadow = "0 0 2px rgba(" + rgbColor + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)";
            }, openModal = function(callback) {
                var $modal = getModal();
                _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10), _removeClass$getTopMargin$fadeIn$show$addClass.show($modal), 
                _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, "showSweetAlert"), 
                _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, "hideSweetAlert"), 
                window.previousActiveElement = document.activeElement;
                var $okButton = $modal.querySelector("button.confirm");
                $okButton.focus(), setTimeout(function() {
                    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, "visible");
                }, 500);
                var timer = $modal.getAttribute("data-timer");
                if ("null" !== timer && "" !== timer) {
                    var timerCallback = callback;
                    $modal.timeout = setTimeout(function() {
                        var doneFunctionExists = (timerCallback || null) && "true" === $modal.getAttribute("data-has-done-function");
                        doneFunctionExists ? timerCallback(null) : sweetAlert.close();
                    }, timer);
                }
            }, resetInput = function() {
                var $modal = getModal(), $input = getInput();
                _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, "show-input"), 
                $input.value = _defaultParams2["default"].inputValue, $input.setAttribute("type", _defaultParams2["default"].inputType), 
                $input.setAttribute("placeholder", _defaultParams2["default"].inputPlaceholder), 
                resetInputError();
            }, resetInputError = function(event) {
                if (event && 13 === event.keyCode) return !1;
                var $modal = getModal(), $errorIcon = $modal.querySelector(".sa-input-error");
                _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, "show");
                var $errorContainer = $modal.querySelector(".sa-error-container");
                _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, "show");
            }, fixVerticalPosition = function() {
                var $modal = getModal();
                $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
            };
            exports.sweetAlertInitialize = sweetAlertInitialize, exports.getModal = getModal, 
            exports.getOverlay = getOverlay, exports.getInput = getInput, exports.setFocusStyle = setFocusStyle, 
            exports.openModal = openModal, exports.resetInput = resetInput, exports.resetInputError = resetInputError, 
            exports.fixVerticalPosition = fixVerticalPosition;
        }, {
            "./default-params": 2,
            "./handle-dom": 4,
            "./injected-html": 7,
            "./utils": 9
        } ],
        7: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var injectedHTML = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';
            exports["default"] = injectedHTML, module.exports = exports["default"];
        }, {} ],
        8: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _isIE8 = require("./utils"), _getModal$getInput$setFocusStyle = require("./handle-swal-dom"), _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = require("./handle-dom"), alertTypes = [ "error", "warning", "info", "success", "input", "prompt" ], setParameters = function(params) {
                var modal = _getModal$getInput$setFocusStyle.getModal(), $title = modal.querySelector("h2"), $text = modal.querySelector("p"), $cancelBtn = modal.querySelector("button.cancel"), $confirmBtn = modal.querySelector("button.confirm");
                if ($title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split("\n").join("<br>"), 
                $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || "").split("\n").join("<br>"), 
                params.text && _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text), 
                params.customClass) _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass), 
                modal.setAttribute("data-custom-class", params.customClass); else {
                    var customClass = modal.getAttribute("data-custom-class");
                    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass), 
                    modal.setAttribute("data-custom-class", "");
                }
                if (_hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll(".sa-icon")), 
                params.type && !_isIE8.isIE8()) {
                    var _ret = function() {
                        for (var validType = !1, i = 0; i < alertTypes.length; i++) if (params.type === alertTypes[i]) {
                            validType = !0;
                            break;
                        }
                        if (!validType) return logStr("Unknown alert type: " + params.type), {
                            v: !1
                        };
                        var typesWithIcons = [ "success", "error", "warning", "info" ], $icon = undefined;
                        -1 !== typesWithIcons.indexOf(params.type) && ($icon = modal.querySelector(".sa-icon.sa-" + params.type), 
                        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon));
                        var $input = _getModal$getInput$setFocusStyle.getInput();
                        switch (params.type) {
                          case "success":
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, "animate"), 
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector(".sa-tip"), "animateSuccessTip"), 
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector(".sa-long"), "animateSuccessLong");
                            break;

                          case "error":
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, "animateErrorIcon"), 
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector(".sa-x-mark"), "animateXMark");
                            break;

                          case "warning":
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, "pulseWarning"), 
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector(".sa-body"), "pulseWarningIns"), 
                            _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector(".sa-dot"), "pulseWarningIns");
                            break;

                          case "input":
                          case "prompt":
                            $input.setAttribute("type", params.inputType), $input.value = params.inputValue, 
                            $input.setAttribute("placeholder", params.inputPlaceholder), _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, "show-input"), 
                            setTimeout(function() {
                                $input.focus(), $input.addEventListener("keyup", swal.resetInputError);
                            }, 400);
                        }
                    }();
                    if ("object" == typeof _ret) return _ret.v;
                }
                if (params.imageUrl) {
                    var $customIcon = modal.querySelector(".sa-icon.sa-custom");
                    $customIcon.style.backgroundImage = "url(" + params.imageUrl + ")", _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);
                    var _imgWidth = 80, _imgHeight = 80;
                    if (params.imageSize) {
                        var dimensions = params.imageSize.toString().split("x"), imgWidth = dimensions[0], imgHeight = dimensions[1];
                        imgWidth && imgHeight ? (_imgWidth = imgWidth, _imgHeight = imgHeight) : logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + params.imageSize);
                    }
                    $customIcon.setAttribute("style", $customIcon.getAttribute("style") + "width:" + _imgWidth + "px; height:" + _imgHeight + "px");
                }
                modal.setAttribute("data-has-cancel-button", params.showCancelButton), params.showCancelButton ? $cancelBtn.style.display = "inline-block" : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn), 
                modal.setAttribute("data-has-confirm-button", params.showConfirmButton), params.showConfirmButton ? $confirmBtn.style.display = "inline-block" : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn), 
                params.cancelButtonText && ($cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText)), 
                params.confirmButtonText && ($confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText)), 
                params.confirmButtonColor && ($confirmBtn.style.backgroundColor = params.confirmButtonColor, 
                $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor, $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor, 
                _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor)), 
                modal.setAttribute("data-allow-outside-click", params.allowOutsideClick);
                var hasDoneFunction = params.doneFunction ? !0 : !1;
                modal.setAttribute("data-has-done-function", hasDoneFunction), params.animation ? "string" == typeof params.animation ? modal.setAttribute("data-animation", params.animation) : modal.setAttribute("data-animation", "pop") : modal.setAttribute("data-animation", "none"), 
                modal.setAttribute("data-timer", params.timer);
            };
            exports["default"] = setParameters, module.exports = exports["default"];
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6,
            "./utils": 9
        } ],
        9: [ function(require, module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var extend = function(a, b) {
                for (var key in b) b.hasOwnProperty(key) && (a[key] = b[key]);
                return a;
            }, hexToRgb = function(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) : null;
            }, isIE8 = function() {
                return window.attachEvent && !window.addEventListener;
            }, logStr = function(string) {
                window.console && window.console.log("SweetAlert: " + string);
            }, colorLuminance = function(hex, lum) {
                hex = String(hex).replace(/[^0-9a-f]/gi, ""), hex.length < 6 && (hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]), 
                lum = lum || 0;
                var c, i, rgb = "#";
                for (i = 0; 3 > i; i++) c = parseInt(hex.substr(2 * i, 2), 16), c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16), 
                rgb += ("00" + c).substr(c.length);
                return rgb;
            };
            exports.extend = extend, exports.hexToRgb = hexToRgb, exports.isIE8 = isIE8, exports.logStr = logStr, 
            exports.colorLuminance = colorLuminance;
        }, {} ]
    }, {}, [ 1 ]), "function" == typeof define && define.amd ? define(function() {
        return sweetAlert;
    }) : "undefined" != typeof module && module.exports && (module.exports = sweetAlert);
}(window, document), !function(a, b, c) {
    "use strict";
    var d = b.isDefined, e = b.isUndefined, f = b.isNumber, g = b.isObject, h = b.isArray, i = b.extend, j = b.toJson, k = b.module("LocalStorageModule", []);
    k.provider("localStorageService", function() {
        this.prefix = "ls", this.storageType = "localStorage", this.cookie = {
            expiry: 30,
            path: "/"
        }, this.notify = {
            setItem: !0,
            removeItem: !1
        }, this.setPrefix = function(a) {
            return this.prefix = a, this;
        }, this.setStorageType = function(a) {
            return this.storageType = a, this;
        }, this.setStorageCookie = function(a, b) {
            return this.cookie.expiry = a, this.cookie.path = b, this;
        }, this.setStorageCookieDomain = function(a) {
            return this.cookie.domain = a, this;
        }, this.setNotify = function(a, b) {
            return this.notify = {
                setItem: a,
                removeItem: b
            }, this;
        }, this.$get = [ "$rootScope", "$window", "$document", "$parse", function(a, b, c, k) {
            var l, m = this, n = m.prefix, o = m.cookie, p = m.notify, q = m.storageType;
            c ? c[0] && (c = c[0]) : c = document, "." !== n.substr(-1) && (n = n ? n + "." : "");
            var r = function(a) {
                return n + a;
            }, s = function() {
                try {
                    var c = q in b && null !== b[q], d = r("__" + Math.round(1e7 * Math.random()));
                    return c && (l = b[q], l.setItem(d, ""), l.removeItem(d)), c;
                } catch (e) {
                    return q = "cookie", a.$broadcast("LocalStorageModule.notification.error", e.message), 
                    !1;
                }
            }(), t = function(b, c) {
                if (c = e(c) ? null : j(c), !s || "cookie" === m.storageType) return s || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), 
                p.setItem && a.$broadcast("LocalStorageModule.notification.setitem", {
                    key: b,
                    newvalue: c,
                    storageType: "cookie"
                }), z(b, c);
                try {
                    l && l.setItem(r(b), c), p.setItem && a.$broadcast("LocalStorageModule.notification.setitem", {
                        key: b,
                        newvalue: c,
                        storageType: m.storageType
                    });
                } catch (d) {
                    return a.$broadcast("LocalStorageModule.notification.error", d.message), z(b, c);
                }
                return !0;
            }, u = function(b) {
                if (!s || "cookie" === m.storageType) return s || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), 
                A(b);
                var c = l ? l.getItem(r(b)) : null;
                if (!c || "null" === c) return null;
                try {
                    return JSON.parse(c);
                } catch (d) {
                    return c;
                }
            }, v = function() {
                var b, c;
                for (b = 0; b < arguments.length; b++) if (c = arguments[b], s && "cookie" !== m.storageType) try {
                    l.removeItem(r(c)), p.removeItem && a.$broadcast("LocalStorageModule.notification.removeitem", {
                        key: c,
                        storageType: m.storageType
                    });
                } catch (d) {
                    a.$broadcast("LocalStorageModule.notification.error", d.message), B(c);
                } else s || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), 
                p.removeItem && a.$broadcast("LocalStorageModule.notification.removeitem", {
                    key: c,
                    storageType: "cookie"
                }), B(c);
            }, w = function() {
                if (!s) return a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), 
                !1;
                var b = n.length, c = [];
                for (var d in l) if (d.substr(0, b) === n) try {
                    c.push(d.substr(b));
                } catch (e) {
                    return a.$broadcast("LocalStorageModule.notification.error", e.Description), [];
                }
                return c;
            }, x = function(b) {
                var c = n ? new RegExp("^" + n) : new RegExp(), d = b ? new RegExp(b) : new RegExp();
                if (!s || "cookie" === m.storageType) return s || a.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"), 
                C();
                var e = n.length;
                for (var f in l) if (c.test(f) && d.test(f.substr(e))) try {
                    v(f.substr(e));
                } catch (g) {
                    return a.$broadcast("LocalStorageModule.notification.error", g.message), C();
                }
                return !0;
            }, y = function() {
                try {
                    return b.navigator.cookieEnabled || "cookie" in c && (c.cookie.length > 0 || (c.cookie = "test").indexOf.call(c.cookie, "test") > -1);
                } catch (d) {
                    return a.$broadcast("LocalStorageModule.notification.error", d.message), !1;
                }
            }(), z = function(b, d, i) {
                if (e(d)) return !1;
                if ((h(d) || g(d)) && (d = j(d)), !y) return a.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), 
                !1;
                try {
                    var k = "", l = new Date(), m = "";
                    if (null === d ? (l.setTime(l.getTime() + -864e5), k = "; expires=" + l.toGMTString(), 
                    d = "") : f(i) && 0 !== i ? (l.setTime(l.getTime() + 24 * i * 60 * 60 * 1e3), k = "; expires=" + l.toGMTString()) : 0 !== o.expiry && (l.setTime(l.getTime() + 24 * o.expiry * 60 * 60 * 1e3), 
                    k = "; expires=" + l.toGMTString()), b) {
                        var n = "; path=" + o.path;
                        o.domain && (m = "; domain=" + o.domain), c.cookie = r(b) + "=" + encodeURIComponent(d) + k + n + m;
                    }
                } catch (p) {
                    return a.$broadcast("LocalStorageModule.notification.error", p.message), !1;
                }
                return !0;
            }, A = function(b) {
                if (!y) return a.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"), 
                !1;
                for (var d = c.cookie && c.cookie.split(";") || [], e = 0; e < d.length; e++) {
                    for (var f = d[e]; " " === f.charAt(0); ) f = f.substring(1, f.length);
                    if (0 === f.indexOf(r(b) + "=")) {
                        var g = decodeURIComponent(f.substring(n.length + b.length + 1, f.length));
                        try {
                            return JSON.parse(g);
                        } catch (h) {
                            return g;
                        }
                    }
                }
                return null;
            }, B = function(a) {
                z(a, null);
            }, C = function() {
                for (var a = null, b = n.length, d = c.cookie.split(";"), e = 0; e < d.length; e++) {
                    for (a = d[e]; " " === a.charAt(0); ) a = a.substring(1, a.length);
                    var f = a.substring(b, a.indexOf("="));
                    B(f);
                }
            }, D = function() {
                return q;
            }, E = function(a, b, c, e) {
                e = e || b;
                var f = u(e);
                return null === f && d(c) ? f = c : g(f) && g(c) && (f = i(c, f)), k(b).assign(a, f), 
                a.$watch(b, function(a) {
                    t(e, a);
                }, g(a[b]));
            }, F = function() {
                for (var a = 0, c = b[q], d = 0; d < c.length; d++) 0 === c.key(d).indexOf(n) && a++;
                return a;
            };
            return {
                isSupported: s,
                getStorageType: D,
                set: t,
                add: t,
                get: u,
                keys: w,
                remove: v,
                clearAll: x,
                bind: E,
                deriveKey: r,
                length: F,
                cookie: {
                    isSupported: y,
                    set: z,
                    add: z,
                    get: A,
                    remove: B,
                    clearAll: C
                }
            };
        } ];
    });
}(window, window.angular);