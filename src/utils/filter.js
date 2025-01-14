function f(o, t, e) {
  return (
    (t = (function (s) {
      var i = (function (r, n) {
        if (typeof r != 'object' || !r) return r
        var a = r[Symbol.toPrimitive]
        if (a !== void 0) {
          var h = a.call(r, n || 'default')
          if (typeof h != 'object') return h
          throw new TypeError('@@toPrimitive must return a primitive value.')
        }
        return (n === 'string' ? String : Number)(r)
      })(s, 'string')
      return typeof i == 'symbol' ? i : i + ''
    })(t)) in o
      ? Object.defineProperty(o, t, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (o[t] = e),
    o
  )
}
function yr(o, t) {
  var e = Object.keys(o)
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(o)
    t &&
      (s = s.filter(function (i) {
        return Object.getOwnPropertyDescriptor(o, i).enumerable
      })),
      e.push.apply(e, s)
  }
  return e
}
function m(o) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? yr(Object(e), !0).forEach(function (s) {
          f(o, s, e[s])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e))
      : yr(Object(e)).forEach(function (s) {
          Object.defineProperty(o, s, Object.getOwnPropertyDescriptor(e, s))
        })
  }
  return o
}
function W(o, t) {
  if (o == null) return {}
  var e,
    s,
    i = (function (n, a) {
      if (n == null) return {}
      var h = {}
      for (var c in n)
        if ({}.hasOwnProperty.call(n, c)) {
          if (a.indexOf(c) >= 0) continue
          h[c] = n[c]
        }
      return h
    })(o, t)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o)
    for (s = 0; s < r.length; s++)
      (e = r[s]), t.indexOf(e) >= 0 || ({}.propertyIsEnumerable.call(o, e) && (i[e] = o[e]))
  }
  return i
}
function se(o, t) {
  return (
    t || (t = o.slice(0)),
    Object.freeze(
      Object.defineProperties(o, {
        raw: {
          value: Object.freeze(t)
        }
      })
    )
  )
}
class _r {
  constructor() {
    f(this, 'browserShadowBlurConstant', 1),
      f(this, 'DPI', 96),
      f(this, 'devicePixelRatio', typeof window < 'u' ? window.devicePixelRatio : 1),
      f(this, 'perfLimitSizeTotal', 2097152),
      f(this, 'maxCacheSideLimit', 4096),
      f(this, 'minCacheSideLimit', 256),
      f(this, 'disableStyleCopyPaste', !1),
      f(this, 'enableGLFiltering', !0),
      f(this, 'textureSize', 4096),
      f(this, 'forceGLPutImageData', !1),
      f(this, 'cachesBoundsOfCurve', !1),
      f(this, 'fontPaths', {}),
      f(this, 'NUM_FRACTION_DIGITS', 4)
  }
}
const E = new (class extends _r {
    constructor(o) {
      super(), this.configure(o)
    }
    configure() {
      let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      Object.assign(this, o)
    }
    addFonts() {
      let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      this.fontPaths = m(m({}, this.fontPaths), o)
    }
    removeFonts() {
      ;(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((o) => {
        delete this.fontPaths[o]
      })
    }
    clearFonts() {
      this.fontPaths = {}
    }
    restoreDefaults(o) {
      const t = new _r(),
        e = o?.reduce((s, i) => ((s[i] = t[i]), s), {}) || t
      this.configure(e)
    }
  })(),
  Vt = function (o) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s]
    return console[o]('fabric', ...e)
  }
class jt extends Error {
  constructor(t, e) {
    super('fabric: '.concat(t), e)
  }
}
class Gi extends jt {
  constructor(t) {
    super(''.concat(t, " 'options.signal' is in 'aborted' state"))
  }
}
class Yo {}
class Wo extends Yo {
  testPrecision(t, e) {
    const s = 'precision '.concat(
        e,
        ` float;
void main(){}`
      ),
      i = t.createShader(t.FRAGMENT_SHADER)
    return !!i && (t.shaderSource(i, s), t.compileShader(i), !!t.getShaderParameter(i, t.COMPILE_STATUS))
  }
  queryWebGL(t) {
    const e = t.getContext('webgl')
    e &&
      ((this.maxTextureSize = e.getParameter(e.MAX_TEXTURE_SIZE)),
      (this.GLPrecision = ['highp', 'mediump', 'lowp'].find((s) => this.testPrecision(e, s))),
      e.getExtension('WEBGL_lose_context').loseContext(),
      Vt('log', 'WebGL: max texture size '.concat(this.maxTextureSize)))
  }
  isSupported(t) {
    return !!this.maxTextureSize && this.maxTextureSize >= t
  }
}
const Vo = {}
let bi
const Go = (o) => {
    bi = o
  },
  Ot = () =>
    bi ||
    (bi = {
      document,
      window,
      isTouchSupported:
        'ontouchstart' in window ||
        'ontouchstart' in document ||
        (window && window.navigator && window.navigator.maxTouchPoints > 0),
      WebGLProbe: new Wo(),
      dispose() {},
      copyPasteData: Vo
    }),
  fe = () => Ot().document,
  Ft = () => Ot().window,
  Zr = () => {
    var o
    return Math.max((o = E.devicePixelRatio) !== null && o !== void 0 ? o : Ft().devicePixelRatio, 1)
  },
  we = new (class {
    constructor() {
      f(this, 'charWidthsCache', {}), f(this, 'boundsOfCurveCache', {})
    }
    getFontCache(o) {
      let { fontFamily: t, fontStyle: e, fontWeight: s } = o
      ;(t = t.toLowerCase()), this.charWidthsCache[t] || (this.charWidthsCache[t] = {})
      const i = this.charWidthsCache[t],
        r = ''.concat(e.toLowerCase(), '_').concat((s + '').toLowerCase())
      return i[r] || (i[r] = {}), i[r]
    }
    clearFontCache(o) {
      ;(o = (o || '').toLowerCase())
        ? this.charWidthsCache[o] && delete this.charWidthsCache[o]
        : (this.charWidthsCache = {})
    }
    limitDimsByArea(o) {
      const { perfLimitSizeTotal: t } = E,
        e = Math.sqrt(t * o)
      return [Math.floor(e), Math.floor(t / e)]
    }
  })(),
  Fs = '6.5.3'
function ue() {}
const $t = Math.PI / 2,
  Gt = 2 * Math.PI,
  zi = Math.PI / 180,
  $ = Object.freeze([1, 0, 0, 1, 0, 0]),
  Hi = 16,
  Ut = 0.4477152502,
  k = 'center',
  L = 'left',
  ct = 'top',
  wi = 'bottom',
  H = 'right',
  rt = 'none',
  Ni = /\r?\n/,
  $r = 'moving',
  Ks = 'scaling',
  tn = 'rotating',
  Ui = 'rotate',
  en = 'skewing',
  as = 'resizing',
  sn = 'modifyPoly',
  zo = 'modifyPath',
  Ls = 'changed',
  Js = 'scale',
  ot = 'scaleX',
  ft = 'scaleY',
  Pe = 'skewX',
  Ee = 'skewY',
  U = 'fill',
  nt = 'stroke',
  Rs = 'modified',
  ye = 'json',
  li = 'svg',
  w = new (class {
    constructor() {
      ;(this[ye] = new Map()), (this[li] = new Map())
    }
    has(o) {
      return this[ye].has(o)
    }
    getClass(o) {
      const t = this[ye].get(o)
      if (!t) throw new jt('No class registered for '.concat(o))
      return t
    }
    setClass(o, t) {
      t ? this[ye].set(t, o) : (this[ye].set(o.type, o), this[ye].set(o.type.toLowerCase(), o))
    }
    getSVGClass(o) {
      return this[li].get(o)
    }
    setSVGClass(o, t) {
      this[li].set(t ?? o.type.toLowerCase(), o)
    }
  })(),
  hs = new (class extends Array {
    remove(o) {
      const t = this.indexOf(o)
      t > -1 && this.splice(t, 1)
    }
    cancelAll() {
      const o = this.splice(0)
      return o.forEach((t) => t.abort()), o
    }
    cancelByCanvas(o) {
      if (!o) return []
      const t = this.filter((e) => {
        var s
        return (
          e.target === o ||
          (typeof e.target == 'object' && ((s = e.target) === null || s === void 0 ? void 0 : s.canvas) === o)
        )
      })
      return t.forEach((e) => e.abort()), t
    }
    cancelByTarget(o) {
      if (!o) return []
      const t = this.filter((e) => e.target === o)
      return t.forEach((e) => e.abort()), t
    }
  })()
class rn {
  constructor() {
    f(this, '__eventListeners', {})
  }
  on(t, e) {
    if ((this.__eventListeners || (this.__eventListeners = {}), typeof t == 'object'))
      return (
        Object.entries(t).forEach((s) => {
          let [i, r] = s
          this.on(i, r)
        }),
        () => this.off(t)
      )
    if (e) {
      const s = t
      return (
        this.__eventListeners[s] || (this.__eventListeners[s] = []),
        this.__eventListeners[s].push(e),
        () => this.off(s, e)
      )
    }
    return () => !1
  }
  once(t, e) {
    if (typeof t == 'object') {
      const s = []
      return (
        Object.entries(t).forEach((i) => {
          let [r, n] = i
          s.push(this.once(r, n))
        }),
        () => s.forEach((i) => i())
      )
    }
    if (e) {
      const s = this.on(t, function () {
        for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++) r[n] = arguments[n]
        e.call(this, ...r), s()
      })
      return s
    }
    return () => !1
  }
  _removeEventListener(t, e) {
    if (this.__eventListeners[t])
      if (e) {
        const s = this.__eventListeners[t],
          i = s.indexOf(e)
        i > -1 && s.splice(i, 1)
      } else this.__eventListeners[t] = []
  }
  off(t, e) {
    if (this.__eventListeners)
      if (t === void 0) for (const s in this.__eventListeners) this._removeEventListener(s)
      else
        typeof t == 'object'
          ? Object.entries(t).forEach((s) => {
              let [i, r] = s
              this._removeEventListener(i, r)
            })
          : this._removeEventListener(t, e)
  }
  fire(t, e) {
    var s
    if (!this.__eventListeners) return
    const i = (s = this.__eventListeners[t]) === null || s === void 0 ? void 0 : s.concat()
    if (i) for (let r = 0; r < i.length; r++) i[r].call(this, e || {})
  }
}
const oe = (o, t) => {
    const e = o.indexOf(t)
    return e !== -1 && o.splice(e, 1), o
  },
  kt = (o) => {
    if (o === 0) return 1
    switch (Math.abs(o) / $t) {
      case 1:
      case 3:
        return 0
      case 2:
        return -1
    }
    return Math.cos(o)
  },
  Dt = (o) => {
    if (o === 0) return 0
    const t = o / $t,
      e = Math.sign(o)
    switch (t) {
      case 1:
        return e
      case 2:
        return 0
      case 3:
        return -e
    }
    return Math.sin(o)
  }
class y {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
      e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    typeof t == 'object' ? ((this.x = t.x), (this.y = t.y)) : ((this.x = t), (this.y = e))
  }
  add(t) {
    return new y(this.x + t.x, this.y + t.y)
  }
  addEquals(t) {
    return (this.x += t.x), (this.y += t.y), this
  }
  scalarAdd(t) {
    return new y(this.x + t, this.y + t)
  }
  scalarAddEquals(t) {
    return (this.x += t), (this.y += t), this
  }
  subtract(t) {
    return new y(this.x - t.x, this.y - t.y)
  }
  subtractEquals(t) {
    return (this.x -= t.x), (this.y -= t.y), this
  }
  scalarSubtract(t) {
    return new y(this.x - t, this.y - t)
  }
  scalarSubtractEquals(t) {
    return (this.x -= t), (this.y -= t), this
  }
  multiply(t) {
    return new y(this.x * t.x, this.y * t.y)
  }
  scalarMultiply(t) {
    return new y(this.x * t, this.y * t)
  }
  scalarMultiplyEquals(t) {
    return (this.x *= t), (this.y *= t), this
  }
  divide(t) {
    return new y(this.x / t.x, this.y / t.y)
  }
  scalarDivide(t) {
    return new y(this.x / t, this.y / t)
  }
  scalarDivideEquals(t) {
    return (this.x /= t), (this.y /= t), this
  }
  eq(t) {
    return this.x === t.x && this.y === t.y
  }
  lt(t) {
    return this.x < t.x && this.y < t.y
  }
  lte(t) {
    return this.x <= t.x && this.y <= t.y
  }
  gt(t) {
    return this.x > t.x && this.y > t.y
  }
  gte(t) {
    return this.x >= t.x && this.y >= t.y
  }
  lerp(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5
    return (e = Math.max(Math.min(1, e), 0)), new y(this.x + (t.x - this.x) * e, this.y + (t.y - this.y) * e)
  }
  distanceFrom(t) {
    const e = this.x - t.x,
      s = this.y - t.y
    return Math.sqrt(e * e + s * s)
  }
  midPointFrom(t) {
    return this.lerp(t)
  }
  min(t) {
    return new y(Math.min(this.x, t.x), Math.min(this.y, t.y))
  }
  max(t) {
    return new y(Math.max(this.x, t.x), Math.max(this.y, t.y))
  }
  toString() {
    return ''.concat(this.x, ',').concat(this.y)
  }
  setXY(t, e) {
    return (this.x = t), (this.y = e), this
  }
  setX(t) {
    return (this.x = t), this
  }
  setY(t) {
    return (this.y = t), this
  }
  setFromPoint(t) {
    return (this.x = t.x), (this.y = t.y), this
  }
  swap(t) {
    const e = this.x,
      s = this.y
    ;(this.x = t.x), (this.y = t.y), (t.x = e), (t.y = s)
  }
  clone() {
    return new y(this.x, this.y)
  }
  rotate(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : qi
    const s = Dt(t),
      i = kt(t),
      r = this.subtract(e)
    return new y(r.x * i - r.y * s, r.x * s + r.y * i).add(e)
  }
  transform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1]
    return new y(t[0] * this.x + t[2] * this.y + (e ? 0 : t[4]), t[1] * this.x + t[3] * this.y + (e ? 0 : t[5]))
  }
}
const qi = new y(0, 0),
  Ds = (o) => !!o && Array.isArray(o._objects)
function Ki(o) {
  class t extends o {
    constructor() {
      super(...arguments), f(this, '_objects', [])
    }
    _onObjectAdded(s) {}
    _onObjectRemoved(s) {}
    _onStackOrderChanged(s) {}
    add() {
      for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r]
      const n = this._objects.push(...i)
      return i.forEach((a) => this._onObjectAdded(a)), n
    }
    insertAt(s) {
      for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) r[n - 1] = arguments[n]
      return this._objects.splice(s, 0, ...r), r.forEach((a) => this._onObjectAdded(a)), this._objects.length
    }
    remove() {
      const s = this._objects,
        i = []
      for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++) n[a] = arguments[a]
      return (
        n.forEach((h) => {
          const c = s.indexOf(h)
          c !== -1 && (s.splice(c, 1), i.push(h), this._onObjectRemoved(h))
        }),
        i
      )
    }
    forEachObject(s) {
      this.getObjects().forEach((i, r, n) => s(i, r, n))
    }
    getObjects() {
      for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r]
      return i.length === 0 ? [...this._objects] : this._objects.filter((n) => n.isType(...i))
    }
    item(s) {
      return this._objects[s]
    }
    isEmpty() {
      return this._objects.length === 0
    }
    size() {
      return this._objects.length
    }
    contains(s, i) {
      return !!this._objects.includes(s) || (!!i && this._objects.some((r) => r instanceof t && r.contains(s, !0)))
    }
    complexity() {
      return this._objects.reduce((s, i) => (s += i.complexity ? i.complexity() : 0), 0)
    }
    sendObjectToBack(s) {
      return (
        !(!s || s === this._objects[0]) &&
        (oe(this._objects, s), this._objects.unshift(s), this._onStackOrderChanged(s), !0)
      )
    }
    bringObjectToFront(s) {
      return (
        !(!s || s === this._objects[this._objects.length - 1]) &&
        (oe(this._objects, s), this._objects.push(s), this._onStackOrderChanged(s), !0)
      )
    }
    sendObjectBackwards(s, i) {
      if (!s) return !1
      const r = this._objects.indexOf(s)
      if (r !== 0) {
        const n = this.findNewLowerIndex(s, r, i)
        return oe(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), !0
      }
      return !1
    }
    bringObjectForward(s, i) {
      if (!s) return !1
      const r = this._objects.indexOf(s)
      if (r !== this._objects.length - 1) {
        const n = this.findNewUpperIndex(s, r, i)
        return oe(this._objects, s), this._objects.splice(n, 0, s), this._onStackOrderChanged(s), !0
      }
      return !1
    }
    moveObjectTo(s, i) {
      return (
        s !== this._objects[i] &&
        (oe(this._objects, s), this._objects.splice(i, 0, s), this._onStackOrderChanged(s), !0)
      )
    }
    findNewLowerIndex(s, i, r) {
      let n
      if (r) {
        n = i
        for (let a = i - 1; a >= 0; --a)
          if (s.isOverlapping(this._objects[a])) {
            n = a
            break
          }
      } else n = i - 1
      return n
    }
    findNewUpperIndex(s, i, r) {
      let n
      if (r) {
        n = i
        for (let a = i + 1; a < this._objects.length; ++a)
          if (s.isOverlapping(this._objects[a])) {
            n = a
            break
          }
      } else n = i + 1
      return n
    }
    collectObjects(s) {
      let { left: i, top: r, width: n, height: a } = s,
        { includeIntersecting: h = !0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
      const c = [],
        l = new y(i, r),
        u = l.add(new y(n, a))
      for (let g = this._objects.length - 1; g >= 0; g--) {
        const d = this._objects[g]
        d.selectable &&
          d.visible &&
          ((h && d.intersectsWithRect(l, u)) ||
            d.isContainedWithinRect(l, u) ||
            (h && d.containsPoint(l)) ||
            (h && d.containsPoint(u))) &&
          c.push(d)
      }
      return c
    }
  }
  return t
}
class nn extends rn {
  _setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    for (const e in t) this.set(e, t[e])
  }
  _setObject(t) {
    for (const e in t) this._set(e, t[e])
  }
  set(t, e) {
    return typeof t == 'object' ? this._setObject(t) : this._set(t, e), this
  }
  _set(t, e) {
    this[t] = e
  }
  toggle(t) {
    const e = this.get(t)
    return typeof e == 'boolean' && this.set(t, !e), this
  }
  get(t) {
    return this[t]
  }
}
function ss(o) {
  return Ft().requestAnimationFrame(o)
}
function on(o) {
  return Ft().cancelAnimationFrame(o)
}
let Ho = 0
const te = () => Ho++,
  lt = () => {
    const o = fe().createElement('canvas')
    if (!o || o.getContext === void 0) throw new jt('Failed to create `canvas` element')
    return o
  },
  an = () => fe().createElement('img'),
  _t = (o) => {
    const t = lt()
    return (t.width = o.width), (t.height = o.height), t
  },
  Ji = (o, t, e) => o.toDataURL('image/'.concat(t), e),
  z = (o) => o * zi,
  ee = (o) => o / zi,
  hn = (o) => o.every((t, e) => t === $[e]),
  Z = (o, t, e) => new y(o).transform(t, e),
  ht = (o) => {
    const t = 1 / (o[0] * o[3] - o[1] * o[2]),
      e = [t * o[3], -t * o[1], -t * o[2], t * o[0], 0, 0],
      { x: s, y: i } = new y(o[4], o[5]).transform(e, !0)
    return (e[4] = -s), (e[5] = -i), e
  },
  V = (o, t, e) => [
    o[0] * t[0] + o[2] * t[1],
    o[1] * t[0] + o[3] * t[1],
    o[0] * t[2] + o[2] * t[3],
    o[1] * t[2] + o[3] * t[3],
    e ? 0 : o[0] * t[4] + o[2] * t[5] + o[4],
    e ? 0 : o[1] * t[4] + o[3] * t[5] + o[5]
  ],
  Qs = (o, t) => o.reduceRight((e, s) => (s && e ? V(s, e, t) : s || e), void 0) || $.concat(),
  cn = (o) => {
    let [t, e] = o
    return Math.atan2(e, t)
  },
  ge = (o) => {
    const t = cn(o),
      e = Math.pow(o[0], 2) + Math.pow(o[1], 2),
      s = Math.sqrt(e),
      i = (o[0] * o[3] - o[2] * o[1]) / s,
      r = Math.atan2(o[0] * o[2] + o[1] * o[3], e)
    return {
      angle: ee(t),
      scaleX: s,
      scaleY: i,
      skewX: ee(r),
      skewY: 0,
      translateX: o[4] || 0,
      translateY: o[5] || 0
    }
  },
  Ae = function (o) {
    return [1, 0, 0, 1, o, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0]
  }
function je() {
  let { angle: o = 0 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    { x: t = 0, y: e = 0 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const s = z(o),
    i = kt(s),
    r = Dt(s)
  return [i, r, -r, i, t ? t - (i * t - r * e) : 0, e ? e - (r * t + i * e) : 0]
}
const Zs = function (o) {
    return [o, 0, 0, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : o, 0, 0]
  },
  ln = (o) => Math.tan(z(o)),
  Qi = (o) => [1, 0, ln(o), 1, 0, 0],
  Zi = (o) => [1, ln(o), 0, 1, 0, 0],
  fs = (o) => {
    let { scaleX: t = 1, scaleY: e = 1, flipX: s = !1, flipY: i = !1, skewX: r = 0, skewY: n = 0 } = o,
      a = Zs(s ? -t : t, i ? -e : e)
    return r && (a = V(a, Qi(r), !0)), n && (a = V(a, Zi(n), !0)), a
  },
  un = (o) => {
    const { translateX: t = 0, translateY: e = 0, angle: s = 0 } = o
    let i = Ae(t, e)
    s &&
      (i = V(
        i,
        je({
          angle: s
        })
      ))
    const r = fs(o)
    return hn(r) || (i = V(i, r)), i
  },
  is = function (o) {
    let { signal: t, crossOrigin: e = null } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return new Promise(function (s, i) {
      if (t && t.aborted) return i(new Gi('loadImage'))
      const r = an()
      let n
      t &&
        ((n = function (h) {
          ;(r.src = ''), i(h)
        }),
        t.addEventListener('abort', n, {
          once: !0
        }))
      const a = function () {
        ;(r.onload = r.onerror = null), n && t?.removeEventListener('abort', n), s(r)
      }
      o
        ? ((r.onload = a),
          (r.onerror = function () {
            n && t?.removeEventListener('abort', n), i(new jt('Error loading '.concat(r.src)))
          }),
          e && (r.crossOrigin = e),
          (r.src = o))
        : a()
    })
  },
  Oe = function (o) {
    let { signal: t, reviver: e = ue } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return new Promise((s, i) => {
      const r = []
      t &&
        t.addEventListener('abort', i, {
          once: !0
        }),
        Promise.all(
          o.map((n) =>
            w
              .getClass(n.type)
              .fromObject(n, {
                signal: t
              })
              .then((a) => (e(n, a), r.push(a), a))
          )
        )
          .then(s)
          .catch((n) => {
            r.forEach((a) => {
              a.dispose && a.dispose()
            }),
              i(n)
          })
          .finally(() => {
            t && t.removeEventListener('abort', i)
          })
    })
  },
  ps = function (o) {
    let { signal: t } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return new Promise((e, s) => {
      const i = []
      t &&
        t.addEventListener('abort', s, {
          once: !0
        })
      const r = Object.values(o).map((a) =>
          a && a.type && w.has(a.type)
            ? Oe([a], {
                signal: t
              }).then((h) => {
                let [c] = h
                return i.push(c), c
              })
            : a
        ),
        n = Object.keys(o)
      Promise.all(r)
        .then((a) => a.reduce((h, c, l) => ((h[n[l]] = c), h), {}))
        .then(e)
        .catch((a) => {
          i.forEach((h) => {
            h.dispose && h.dispose()
          }),
            s(a)
        })
        .finally(() => {
          t && t.removeEventListener('abort', s)
        })
    })
  },
  pe = function (o) {
    return (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []).reduce(
      (t, e) => (e in o && (t[e] = o[e]), t),
      {}
    )
  },
  $i = (o, t) => Object.keys(o).reduce((e, s) => (t(o[s], s, o) && (e[s] = o[s]), e), {}),
  xr = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#0FF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000',
    blanchedalmond: '#FFEBCD',
    blue: '#00F',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#0FF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgrey: '#A9A9A9',
    darkgreen: '#006400',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    fuchsia: '#F0F',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#ADFF2F',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgray: '#D3D3D3',
    lightgrey: '#D3D3D3',
    lightgreen: '#90EE90',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslategray: '#789',
    lightslategrey: '#789',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    lime: '#0F0',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#F0F',
    maroon: '#800000',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    navy: '#000080',
    oldlace: '#FDF5E6',
    olive: '#808000',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#DB7093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    purple: '#800080',
    rebeccapurple: '#639',
    red: '#F00',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    silver: '#C0C0C0',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    teal: '#008080',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    wheat: '#F5DEB3',
    white: '#FFF',
    whitesmoke: '#F5F5F5',
    yellow: '#FF0',
    yellowgreen: '#9ACD32'
  },
  ui = (o, t, e) => (
    e < 0 && (e += 1),
    e > 1 && (e -= 1),
    e < 1 / 6 ? o + 6 * (t - o) * e : e < 0.5 ? t : e < 2 / 3 ? o + (t - o) * (2 / 3 - e) * 6 : o
  ),
  Cr = (o, t, e, s) => {
    ;(o /= 255), (t /= 255), (e /= 255)
    const i = Math.max(o, t, e),
      r = Math.min(o, t, e)
    let n, a
    const h = (i + r) / 2
    if (i === r) n = a = 0
    else {
      const c = i - r
      switch (((a = h > 0.5 ? c / (2 - i - r) : c / (i + r)), i)) {
        case o:
          n = (t - e) / c + (t < e ? 6 : 0)
          break
        case t:
          n = (e - o) / c + 2
          break
        case e:
          n = (o - t) / c + 4
      }
      n /= 6
    }
    return [Math.round(360 * n), Math.round(100 * a), Math.round(100 * h), s]
  },
  br = function () {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '1'
    return parseFloat(o) / (o.endsWith('%') ? 100 : 1)
  },
  Cs = (o) => Math.min(Math.round(o), 255).toString(16).toUpperCase().padStart(2, '0'),
  wr = (o) => {
    let [t, e, s, i = 1] = o
    const r = Math.round(0.3 * t + 0.59 * e + 0.11 * s)
    return [r, r, r, i]
  }
class j {
  constructor(t) {
    if ((f(this, 'isUnrecognised', !1), t))
      if (t instanceof j) this.setSource([...t._source])
      else if (Array.isArray(t)) {
        const [e, s, i, r = 1] = t
        this.setSource([e, s, i, r])
      } else this.setSource(this._tryParsingColor(t))
    else this.setSource([0, 0, 0, 1])
  }
  _tryParsingColor(t) {
    return (
      (t = t.toLowerCase()) in xr && (t = xr[t]),
      t === 'transparent'
        ? [255, 255, 255, 0]
        : j.sourceFromHex(t) || j.sourceFromRgb(t) || j.sourceFromHsl(t) || ((this.isUnrecognised = !0) && [0, 0, 0, 1])
    )
  }
  getSource() {
    return this._source
  }
  setSource(t) {
    this._source = t
  }
  toRgb() {
    const [t, e, s] = this.getSource()
    return 'rgb('.concat(t, ',').concat(e, ',').concat(s, ')')
  }
  toRgba() {
    return 'rgba('.concat(this.getSource().join(','), ')')
  }
  toHsl() {
    const [t, e, s] = Cr(...this.getSource())
    return 'hsl('.concat(t, ',').concat(e, '%,').concat(s, '%)')
  }
  toHsla() {
    const [t, e, s, i] = Cr(...this.getSource())
    return 'hsla('.concat(t, ',').concat(e, '%,').concat(s, '%,').concat(i, ')')
  }
  toHex() {
    return this.toHexa().slice(0, 6)
  }
  toHexa() {
    const [t, e, s, i] = this.getSource()
    return ''
      .concat(Cs(t))
      .concat(Cs(e))
      .concat(Cs(s))
      .concat(Cs(Math.round(255 * i)))
  }
  getAlpha() {
    return this.getSource()[3]
  }
  setAlpha(t) {
    return (this._source[3] = t), this
  }
  toGrayscale() {
    return this.setSource(wr(this.getSource())), this
  }
  toBlackWhite(t) {
    const [e, , , s] = wr(this.getSource()),
      i = e < (t || 127) ? 0 : 255
    return this.setSource([i, i, i, s]), this
  }
  overlayWith(t) {
    t instanceof j || (t = new j(t))
    const e = this.getSource(),
      s = t.getSource(),
      [i, r, n] = e.map((a, h) => Math.round(0.5 * a + 0.5 * s[h]))
    return this.setSource([i, r, n, e[3]]), this
  }
  static fromRgb(t) {
    return j.fromRgba(t)
  }
  static fromRgba(t) {
    return new j(j.sourceFromRgb(t))
  }
  static sourceFromRgb(t) {
    const e = t.match(
      /^rgba?\(\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d{0,3}(?:\.\d+)?%?)\s*)?\)$/i
    )
    if (e) {
      const [s, i, r] = e.slice(1, 4).map((n) => {
        const a = parseFloat(n)
        return n.endsWith('%') ? Math.round(2.55 * a) : a
      })
      return [s, i, r, br(e[4])]
    }
  }
  static fromHsl(t) {
    return j.fromHsla(t)
  }
  static fromHsla(t) {
    return new j(j.sourceFromHsl(t))
  }
  static sourceFromHsl(t) {
    const e = t.match(
      /^hsla?\(\s*([+-]?\d{0,3}(?:\.\d+)?(?:deg|turn|rad)?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d*(?:\.\d+)?%?)\s*)?\)$/i
    )
    if (!e) return
    const s = (((j.parseAngletoDegrees(e[1]) % 360) + 360) % 360) / 360,
      i = parseFloat(e[2]) / 100,
      r = parseFloat(e[3]) / 100
    let n, a, h
    if (i === 0) n = a = h = r
    else {
      const c = r <= 0.5 ? r * (i + 1) : r + i - r * i,
        l = 2 * r - c
      ;(n = ui(l, c, s + 1 / 3)), (a = ui(l, c, s)), (h = ui(l, c, s - 1 / 3))
    }
    return [Math.round(255 * n), Math.round(255 * a), Math.round(255 * h), br(e[4])]
  }
  static fromHex(t) {
    return new j(j.sourceFromHex(t))
  }
  static sourceFromHex(t) {
    if (t.match(/^#?(([0-9a-f]){3,4}|([0-9a-f]{2}){3,4})$/i)) {
      const e = t.slice(t.indexOf('#') + 1)
      let s
      s = e.length <= 4 ? e.split('').map((h) => h + h) : e.match(/.{2}/g)
      const [i, r, n, a = 255] = s.map((h) => parseInt(h, 16))
      return [i, r, n, a / 255]
    }
  }
  static parseAngletoDegrees(t) {
    const e = t.toLowerCase(),
      s = parseFloat(e)
    return e.includes('rad') ? ee(s) : e.includes('turn') ? 360 * s : s
  }
}
const Y = (o, t) => parseFloat(Number(o).toFixed(t)),
  et = function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Hi
    const e = /\D{0,2}$/.exec(o),
      s = parseFloat(o),
      i = E.DPI
    switch (e?.[0]) {
      case 'mm':
        return (s * i) / 25.4
      case 'cm':
        return (s * i) / 2.54
      case 'in':
        return s * i
      case 'pt':
        return (s * i) / 72
      case 'pc':
        return ((s * i) / 72) * 12
      case 'em':
        return s * t
      default:
        return s
    }
  },
  tr = (o) => {
    const [t, e] = o.trim().split(' '),
      [s, i] = (r = t) && r !== rt ? [r.slice(1, 4), r.slice(5, 8)] : r === rt ? [r, r] : ['Mid', 'Mid']
    var r
    return {
      meetOrSlice: e || 'meet',
      alignX: s,
      alignY: i
    }
  },
  cs = (o) => 'matrix(' + o.map((t) => Y(t, E.NUM_FRACTION_DIGITS)).join(' ') + ')',
  ls = function (o, t) {
    let e,
      s,
      i = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2]
    if (t)
      if (t.toLive) e = 'url(#SVGID_'.concat(t.id, ')')
      else {
        const r = new j(t),
          n = r.getAlpha()
        ;(e = r.toRgb()), n !== 1 && (s = n.toString())
      }
    else e = 'none'
    return i
      ? ''
          .concat(o, ': ')
          .concat(e, '; ')
          .concat(s ? ''.concat(o, '-opacity: ').concat(s, '; ') : '')
      : ''
          .concat(o, '="')
          .concat(e, '" ')
          .concat(s ? ''.concat(o, '-opacity="').concat(s, '" ') : '')
  },
  yt = (o) => !!o && o.toLive !== void 0,
  Sr = (o) => !!o && typeof o.toObject == 'function',
  Tr = (o) => !!o && o.offsetX !== void 0 && 'source' in o,
  ae = (o) => !!o && 'multiSelectionStacking' in o
function gn(o) {
  const t = o && wt(o)
  let e = 0,
    s = 0
  if (!o || !t)
    return {
      left: e,
      top: s
    }
  let i = o
  const r = t.documentElement,
    n = t.body || {
      scrollLeft: 0,
      scrollTop: 0
    }
  for (
    ;
    i &&
    (i.parentNode || i.host) &&
    ((i = i.parentNode || i.host),
    i === t
      ? ((e = n.scrollLeft || r.scrollLeft || 0), (s = n.scrollTop || r.scrollTop || 0))
      : ((e += i.scrollLeft || 0), (s += i.scrollTop || 0)),
    i.nodeType !== 1 || i.style.position !== 'fixed');

  );
  return {
    left: e,
    top: s
  }
}
const wt = (o) => o.ownerDocument || null,
  dn = (o) => {
    var t
    return ((t = o.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView) || null
  },
  fn = function (o, t, e) {
    let { width: s, height: i } = e,
      r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1
    ;(o.width = s),
      (o.height = i),
      r > 1 &&
        (o.setAttribute('width', (s * r).toString()), o.setAttribute('height', (i * r).toString()), t.scale(r, r))
  },
  Si = (o, t) => {
    let { width: e, height: s } = t
    e && (o.style.width = typeof e == 'number' ? ''.concat(e, 'px') : e),
      s && (o.style.height = typeof s == 'number' ? ''.concat(s, 'px') : s)
  }
function Or(o) {
  return o.onselectstart !== void 0 && (o.onselectstart = () => !1), (o.style.userSelect = rt), o
}
class er {
  constructor(t) {
    f(this, '_originalCanvasStyle', void 0), f(this, 'lower', void 0)
    const e = this.createLowerCanvas(t)
    this.lower = {
      el: e,
      ctx: e.getContext('2d')
    }
  }
  createLowerCanvas(t) {
    const e = (s = t) && s.getContext !== void 0 ? t : (t && fe().getElementById(t)) || lt()
    var s
    if (e.hasAttribute('data-fabric'))
      throw new jt(
        'Trying to initialize a canvas that has already been initialized. Did you forget to dispose the canvas?'
      )
    return (
      (this._originalCanvasStyle = e.style.cssText),
      e.setAttribute('data-fabric', 'main'),
      e.classList.add('lower-canvas'),
      e
    )
  }
  cleanupDOM(t) {
    let { width: e, height: s } = t
    const { el: i } = this.lower
    i.classList.remove('lower-canvas'),
      i.removeAttribute('data-fabric'),
      i.setAttribute('width', ''.concat(e)),
      i.setAttribute('height', ''.concat(s)),
      (i.style.cssText = this._originalCanvasStyle || ''),
      (this._originalCanvasStyle = void 0)
  }
  setDimensions(t, e) {
    const { el: s, ctx: i } = this.lower
    fn(s, i, t, e)
  }
  setCSSDimensions(t) {
    Si(this.lower.el, t)
  }
  calcOffset() {
    return (function (t) {
      var e
      const s = t && wt(t),
        i = {
          left: 0,
          top: 0
        }
      if (!s) return i
      const r = ((e = dn(t)) === null || e === void 0 ? void 0 : e.getComputedStyle(t, null)) || {}
      ;(i.left += parseInt(r.borderLeftWidth, 10) || 0),
        (i.top += parseInt(r.borderTopWidth, 10) || 0),
        (i.left += parseInt(r.paddingLeft, 10) || 0),
        (i.top += parseInt(r.paddingTop, 10) || 0)
      let n = {
        left: 0,
        top: 0
      }
      const a = s.documentElement
      t.getBoundingClientRect !== void 0 && (n = t.getBoundingClientRect())
      const h = gn(t)
      return {
        left: n.left + h.left - (a.clientLeft || 0) + i.left,
        top: n.top + h.top - (a.clientTop || 0) + i.top
      }
    })(this.lower.el)
  }
  dispose() {
    Ot().dispose(this.lower.el), delete this.lower
  }
}
const No = {
  backgroundVpt: !0,
  backgroundColor: '',
  overlayVpt: !0,
  overlayColor: '',
  includeDefaultValues: !0,
  svgViewportTransformation: !0,
  renderOnAddRemove: !0,
  skipOffscreen: !0,
  enableRetinaScaling: !0,
  imageSmoothingEnabled: !0,
  controlsAboveOverlay: !1,
  allowTouchScrolling: !1,
  viewportTransform: [...$]
}
class Fe extends Ki(nn) {
  get lowerCanvasEl() {
    var t
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.el
  }
  get contextContainer() {
    var t
    return (t = this.elements.lower) === null || t === void 0 ? void 0 : t.ctx
  }
  static getDefaults() {
    return Fe.ownDefaults
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(),
      Object.assign(this, this.constructor.getDefaults()),
      this.set(e),
      this.initElements(t),
      this._setDimensionsImpl({
        width: this.width || this.elements.lower.el.width || 0,
        height: this.height || this.elements.lower.el.height || 0
      }),
      (this.skipControlsDrawing = !1),
      (this.viewportTransform = [...this.viewportTransform]),
      this.calcViewportBoundaries()
  }
  initElements(t) {
    this.elements = new er(t)
  }
  add() {
    const t = super.add(...arguments)
    return arguments.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) s[i - 1] = arguments[i]
    const r = super.insertAt(t, ...s)
    return s.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), r
  }
  remove() {
    const t = super.remove(...arguments)
    return t.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t
  }
  _onObjectAdded(t) {
    t.canvas &&
      t.canvas !== this &&
      (Vt(
        'warn',
        `Canvas is trying to add an object that belongs to a different canvas.
Resulting to default behavior: removing object from previous canvas and adding to new canvas`
      ),
      t.canvas.remove(t)),
      t._set('canvas', this),
      t.setCoords(),
      this.fire('object:added', {
        target: t
      }),
      t.fire('added', {
        target: this
      })
  }
  _onObjectRemoved(t) {
    t._set('canvas', void 0),
      this.fire('object:removed', {
        target: t
      }),
      t.fire('removed', {
        target: this
      })
  }
  _onStackOrderChanged() {
    this.renderOnAddRemove && this.requestRenderAll()
  }
  getRetinaScaling() {
    return this.enableRetinaScaling ? Zr() : 1
  }
  calcOffset() {
    return (this._offset = this.elements.calcOffset())
  }
  getWidth() {
    return this.width
  }
  getHeight() {
    return this.height
  }
  setWidth(t, e) {
    return this.setDimensions(
      {
        width: t
      },
      e
    )
  }
  setHeight(t, e) {
    return this.setDimensions(
      {
        height: t
      },
      e
    )
  }
  _setDimensionsImpl(t) {
    let { cssOnly: e = !1, backstoreOnly: s = !1 } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (!e) {
      const i = m(
        {
          width: this.width,
          height: this.height
        },
        t
      )
      this.elements.setDimensions(i, this.getRetinaScaling()),
        (this.hasLostContext = !0),
        (this.width = i.width),
        (this.height = i.height)
    }
    s || this.elements.setCSSDimensions(t), this.calcOffset()
  }
  setDimensions(t, e) {
    this._setDimensionsImpl(t, e), (e && e.cssOnly) || this.requestRenderAll()
  }
  getZoom() {
    return this.viewportTransform[0]
  }
  setViewportTransform(t) {
    ;(this.viewportTransform = t), this.calcViewportBoundaries(), this.renderOnAddRemove && this.requestRenderAll()
  }
  zoomToPoint(t, e) {
    const s = t,
      i = [...this.viewportTransform],
      r = Z(t, ht(i))
    ;(i[0] = e), (i[3] = e)
    const n = Z(r, i)
    ;(i[4] += s.x - n.x), (i[5] += s.y - n.y), this.setViewportTransform(i)
  }
  setZoom(t) {
    this.zoomToPoint(new y(0, 0), t)
  }
  absolutePan(t) {
    const e = [...this.viewportTransform]
    return (e[4] = -t.x), (e[5] = -t.y), this.setViewportTransform(e)
  }
  relativePan(t) {
    return this.absolutePan(new y(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]))
  }
  getElement() {
    return this.elements.lower.el
  }
  clearContext(t) {
    t.clearRect(0, 0, this.width, this.height)
  }
  getContext() {
    return this.elements.lower.ctx
  }
  clear() {
    this.remove(...this.getObjects()),
      (this.backgroundImage = void 0),
      (this.overlayImage = void 0),
      (this.backgroundColor = ''),
      (this.overlayColor = ''),
      this.clearContext(this.getContext()),
      this.fire('canvas:cleared'),
      this.renderOnAddRemove && this.requestRenderAll()
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || this.renderCanvas(this.getContext(), this._objects)
  }
  renderAndReset() {
    ;(this.nextRenderHandle = 0), this.renderAll()
  }
  requestRenderAll() {
    this.nextRenderHandle ||
      this.disposed ||
      this.destroyed ||
      (this.nextRenderHandle = ss(() => this.renderAndReset()))
  }
  calcViewportBoundaries() {
    const t = this.width,
      e = this.height,
      s = ht(this.viewportTransform),
      i = Z(
        {
          x: 0,
          y: 0
        },
        s
      ),
      r = Z(
        {
          x: t,
          y: e
        },
        s
      ),
      n = i.min(r),
      a = i.max(r)
    return (this.vptCoords = {
      tl: n,
      tr: new y(a.x, n.y),
      bl: new y(n.x, a.y),
      br: a
    })
  }
  cancelRequestedRender() {
    this.nextRenderHandle && (on(this.nextRenderHandle), (this.nextRenderHandle = 0))
  }
  drawControls(t) {}
  renderCanvas(t, e) {
    if (this.destroyed) return
    const s = this.viewportTransform,
      i = this.clipPath
    this.calcViewportBoundaries(),
      this.clearContext(t),
      (t.imageSmoothingEnabled = this.imageSmoothingEnabled),
      (t.patternQuality = 'best'),
      this.fire('before:render', {
        ctx: t
      }),
      this._renderBackground(t),
      t.save(),
      t.transform(s[0], s[1], s[2], s[3], s[4], s[5]),
      this._renderObjects(t, e),
      t.restore(),
      this.controlsAboveOverlay || this.skipControlsDrawing || this.drawControls(t),
      i &&
        (i._set('canvas', this),
        i.shouldCache(),
        (i._transformDone = !0),
        i.renderCache({
          forClipping: !0
        }),
        this.drawClipPathOnCanvas(t, i)),
      this._renderOverlay(t),
      this.controlsAboveOverlay && !this.skipControlsDrawing && this.drawControls(t),
      this.fire('after:render', {
        ctx: t
      }),
      this.__cleanupTask && (this.__cleanupTask(), (this.__cleanupTask = void 0))
  }
  drawClipPathOnCanvas(t, e) {
    const s = this.viewportTransform
    t.save(),
      t.transform(...s),
      (t.globalCompositeOperation = 'destination-in'),
      e.transform(t),
      t.scale(1 / e.zoomX, 1 / e.zoomY),
      t.drawImage(e._cacheCanvas, -e.cacheTranslationX, -e.cacheTranslationY),
      t.restore()
  }
  _renderObjects(t, e) {
    for (let s = 0, i = e.length; s < i; ++s) e[s] && e[s].render(t)
  }
  _renderBackgroundOrOverlay(t, e) {
    const s = this[''.concat(e, 'Color')],
      i = this[''.concat(e, 'Image')],
      r = this.viewportTransform,
      n = this[''.concat(e, 'Vpt')]
    if (!s && !i) return
    const a = yt(s)
    if (s) {
      if (
        (t.save(),
        t.beginPath(),
        t.moveTo(0, 0),
        t.lineTo(this.width, 0),
        t.lineTo(this.width, this.height),
        t.lineTo(0, this.height),
        t.closePath(),
        (t.fillStyle = a ? s.toLive(t) : s),
        n && t.transform(...r),
        a)
      ) {
        t.transform(1, 0, 0, 1, s.offsetX || 0, s.offsetY || 0)
        const h = s.gradientTransform || s.patternTransform
        h && t.transform(...h)
      }
      t.fill(), t.restore()
    }
    if (i) {
      t.save()
      const { skipOffscreen: h } = this
      ;(this.skipOffscreen = n), n && t.transform(...r), i.render(t), (this.skipOffscreen = h), t.restore()
    }
  }
  _renderBackground(t) {
    this._renderBackgroundOrOverlay(t, 'background')
  }
  _renderOverlay(t) {
    this._renderBackgroundOrOverlay(t, 'overlay')
  }
  getCenter() {
    return {
      top: this.height / 2,
      left: this.width / 2
    }
  }
  getCenterPoint() {
    return new y(this.width / 2, this.height / 2)
  }
  centerObjectH(t) {
    return this._centerObject(t, new y(this.getCenterPoint().x, t.getCenterPoint().y))
  }
  centerObjectV(t) {
    return this._centerObject(t, new y(t.getCenterPoint().x, this.getCenterPoint().y))
  }
  centerObject(t) {
    return this._centerObject(t, this.getCenterPoint())
  }
  viewportCenterObject(t) {
    return this._centerObject(t, this.getVpCenter())
  }
  viewportCenterObjectH(t) {
    return this._centerObject(t, new y(this.getVpCenter().x, t.getCenterPoint().y))
  }
  viewportCenterObjectV(t) {
    return this._centerObject(t, new y(t.getCenterPoint().x, this.getVpCenter().y))
  }
  getVpCenter() {
    return Z(this.getCenterPoint(), ht(this.viewportTransform))
  }
  _centerObject(t, e) {
    t.setXY(e, k, k), t.setCoords(), this.renderOnAddRemove && this.requestRenderAll()
  }
  toDatalessJSON(t) {
    return this.toDatalessObject(t)
  }
  toObject(t) {
    return this._toObjectMethod('toObject', t)
  }
  toJSON() {
    return this.toObject()
  }
  toDatalessObject(t) {
    return this._toObjectMethod('toDatalessObject', t)
  }
  _toObjectMethod(t, e) {
    const s = this.clipPath,
      i = s && !s.excludeFromExport ? this._toObject(s, t, e) : null
    return m(
      m(
        m(
          {
            version: Fs
          },
          pe(this, e)
        ),
        {},
        {
          objects: this._objects.filter((r) => !r.excludeFromExport).map((r) => this._toObject(r, t, e))
        },
        this.__serializeBgOverlay(t, e)
      ),
      i
        ? {
            clipPath: i
          }
        : null
    )
  }
  _toObject(t, e, s) {
    let i
    this.includeDefaultValues || ((i = t.includeDefaultValues), (t.includeDefaultValues = !1))
    const r = t[e](s)
    return this.includeDefaultValues || (t.includeDefaultValues = !!i), r
  }
  __serializeBgOverlay(t, e) {
    const s = {},
      i = this.backgroundImage,
      r = this.overlayImage,
      n = this.backgroundColor,
      a = this.overlayColor
    return (
      yt(n) ? n.excludeFromExport || (s.background = n.toObject(e)) : n && (s.background = n),
      yt(a) ? a.excludeFromExport || (s.overlay = a.toObject(e)) : a && (s.overlay = a),
      i && !i.excludeFromExport && (s.backgroundImage = this._toObject(i, t, e)),
      r && !r.excludeFromExport && (s.overlayImage = this._toObject(r, t, e)),
      s
    )
  }
  toSVG() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      e = arguments.length > 1 ? arguments[1] : void 0
    t.reviver = e
    const s = []
    return (
      this._setSVGPreamble(s, t),
      this._setSVGHeader(s, t),
      this.clipPath &&
        s.push(
          '<g clip-path="url(#'.concat(
            this.clipPath.clipPathId,
            `)" >
`
          )
        ),
      this._setSVGBgOverlayColor(s, 'background'),
      this._setSVGBgOverlayImage(s, 'backgroundImage', e),
      this._setSVGObjects(s, e),
      this.clipPath &&
        s.push(`</g>
`),
      this._setSVGBgOverlayColor(s, 'overlay'),
      this._setSVGBgOverlayImage(s, 'overlayImage', e),
      s.push('</svg>'),
      s.join('')
    )
  }
  _setSVGPreamble(t, e) {
    e.suppressPreamble ||
      t.push(
        '<?xml version="1.0" encoding="',
        e.encoding || 'UTF-8',
        `" standalone="no" ?>
`,
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ',
        `"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
`
      )
  }
  _setSVGHeader(t, e) {
    const s = e.width || ''.concat(this.width),
      i = e.height || ''.concat(this.height),
      r = E.NUM_FRACTION_DIGITS,
      n = e.viewBox
    let a
    if (n) a = 'viewBox="'.concat(n.x, ' ').concat(n.y, ' ').concat(n.width, ' ').concat(n.height, '" ')
    else if (this.svgViewportTransformation) {
      const h = this.viewportTransform
      a = 'viewBox="'
        .concat(Y(-h[4] / h[0], r), ' ')
        .concat(Y(-h[5] / h[3], r), ' ')
        .concat(Y(this.width / h[0], r), ' ')
        .concat(Y(this.height / h[3], r), '" ')
    } else a = 'viewBox="0 0 '.concat(this.width, ' ').concat(this.height, '" ')
    t.push(
      '<svg ',
      'xmlns="http://www.w3.org/2000/svg" ',
      'xmlns:xlink="http://www.w3.org/1999/xlink" ',
      'version="1.1" ',
      'width="',
      s,
      '" ',
      'height="',
      i,
      '" ',
      a,
      `xml:space="preserve">
`,
      '<desc>Created with Fabric.js ',
      Fs,
      `</desc>
`,
      `<defs>
`,
      this.createSVGFontFacesMarkup(),
      this.createSVGRefElementsMarkup(),
      this.createSVGClipPathMarkup(e),
      `</defs>
`
    )
  }
  createSVGClipPathMarkup(t) {
    const e = this.clipPath
    return e
      ? ((e.clipPathId = 'CLIPPATH_'.concat(te())),
        '<clipPath id="'
          .concat(
            e.clipPathId,
            `" >
`
          )
          .concat(
            e.toClipPathSVG(t.reviver),
            `</clipPath>
`
          ))
      : ''
  }
  createSVGRefElementsMarkup() {
    return ['background', 'overlay']
      .map((t) => {
        const e = this[''.concat(t, 'Color')]
        if (yt(e)) {
          const s = this[''.concat(t, 'Vpt')],
            i = this.viewportTransform,
            r = {
              isType: () => !1,
              width: this.width / (s ? i[0] : 1),
              height: this.height / (s ? i[3] : 1)
            }
          return e.toSVG(r, {
            additionalTransform: s ? cs(i) : ''
          })
        }
      })
      .join('')
  }
  createSVGFontFacesMarkup() {
    const t = [],
      e = {},
      s = E.fontPaths
    this._objects.forEach(function r(n) {
      t.push(n), Ds(n) && n._objects.forEach(r)
    }),
      t.forEach((r) => {
        if (!(n = r) || typeof n._renderText != 'function') return
        var n
        const { styles: a, fontFamily: h } = r
        !e[h] &&
          s[h] &&
          ((e[h] = !0),
          a &&
            Object.values(a).forEach((c) => {
              Object.values(c).forEach((l) => {
                let { fontFamily: u = '' } = l
                !e[u] && s[u] && (e[u] = !0)
              })
            }))
      })
    const i = Object.keys(e)
      .map((r) =>
        `		@font-face {
			font-family: '`
          .concat(
            r,
            `';
			src: url('`
          )
          .concat(
            s[r],
            `');
		}
`
          )
      )
      .join('')
    return i
      ? `	<style type="text/css"><![CDATA[
`.concat(
          i,
          `]]></style>
`
        )
      : ''
  }
  _setSVGObjects(t, e) {
    this.forEachObject((s) => {
      s.excludeFromExport || this._setSVGObject(t, s, e)
    })
  }
  _setSVGObject(t, e, s) {
    t.push(e.toSVG(s))
  }
  _setSVGBgOverlayImage(t, e, s) {
    const i = this[e]
    i && !i.excludeFromExport && i.toSVG && t.push(i.toSVG(s))
  }
  _setSVGBgOverlayColor(t, e) {
    const s = this[''.concat(e, 'Color')]
    if (s)
      if (yt(s)) {
        const i = s.repeat || '',
          r = this.width,
          n = this.height,
          a = this[''.concat(e, 'Vpt')] ? cs(ht(this.viewportTransform)) : ''
        t.push(
          '<rect transform="'
            .concat(a, ' translate(')
            .concat(r / 2, ',')
            .concat(n / 2, ')" x="')
            .concat(s.offsetX - r / 2, '" y="')
            .concat(s.offsetY - n / 2, '" width="')
            .concat((i !== 'repeat-y' && i !== 'no-repeat') || !Tr(s) ? r : s.source.width, '" height="')
            .concat((i !== 'repeat-x' && i !== 'no-repeat') || !Tr(s) ? n : s.source.height, '" fill="url(#SVGID_')
            .concat(
              s.id,
              `)"></rect>
`
            )
        )
      } else
        t.push(
          '<rect x="0" y="0" width="100%" height="100%" ',
          'fill="',
          s,
          '"',
          `></rect>
`
        )
  }
  loadFromJSON(t, e) {
    let { signal: s } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    if (!t) return Promise.reject(new jt('`json` is undefined'))
    const i = typeof t == 'string' ? JSON.parse(t) : t,
      { objects: r = [], backgroundImage: n, background: a, overlayImage: h, overlay: c, clipPath: l } = i,
      u = this.renderOnAddRemove
    return (
      (this.renderOnAddRemove = !1),
      Promise.all([
        Oe(r, {
          reviver: e,
          signal: s
        }),
        ps(
          {
            backgroundImage: n,
            backgroundColor: a,
            overlayImage: h,
            overlayColor: c,
            clipPath: l
          },
          {
            signal: s
          }
        )
      ]).then((g) => {
        let [d, p] = g
        return this.clear(), this.add(...d), this.set(i), this.set(p), (this.renderOnAddRemove = u), this
      })
    )
  }
  clone(t) {
    const e = this.toObject(t)
    return this.cloneWithoutData().loadFromJSON(e)
  }
  cloneWithoutData() {
    const t = _t(this)
    return new this.constructor(t)
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    const { format: e = 'png', quality: s = 1, multiplier: i = 1, enableRetinaScaling: r = !1 } = t,
      n = i * (r ? this.getRetinaScaling() : 1)
    return Ji(this.toCanvasElement(n, t), e, s)
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1,
      {
        width: e,
        height: s,
        left: i,
        top: r,
        filter: n
      } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const a = (e || this.width) * t,
      h = (s || this.height) * t,
      c = this.getZoom(),
      l = this.width,
      u = this.height,
      g = this.skipControlsDrawing,
      d = c * t,
      p = this.viewportTransform,
      v = [d, 0, 0, d, (p[4] - (i || 0)) * t, (p[5] - (r || 0)) * t],
      _ = this.enableRetinaScaling,
      x = _t({
        width: a,
        height: h
      }),
      C = n ? this._objects.filter((b) => n(b)) : this._objects
    return (
      (this.enableRetinaScaling = !1),
      (this.viewportTransform = v),
      (this.width = a),
      (this.height = h),
      (this.skipControlsDrawing = !0),
      this.calcViewportBoundaries(),
      this.renderCanvas(x.getContext('2d'), C),
      (this.viewportTransform = p),
      (this.width = l),
      (this.height = u),
      this.calcViewportBoundaries(),
      (this.enableRetinaScaling = _),
      (this.skipControlsDrawing = g),
      x
    )
  }
  dispose() {
    return (
      !this.disposed &&
        this.elements.cleanupDOM({
          width: this.width,
          height: this.height
        }),
      hs.cancelByCanvas(this),
      (this.disposed = !0),
      new Promise((t, e) => {
        const s = () => {
          this.destroy(), t(!0)
        }
        ;(s.kill = e),
          this.__cleanupTask && this.__cleanupTask.kill('aborted'),
          this.destroyed ? t(!1) : this.nextRenderHandle ? (this.__cleanupTask = s) : s()
      })
    )
  }
  destroy() {
    ;(this.destroyed = !0),
      this.cancelRequestedRender(),
      this.forEachObject((t) => t.dispose()),
      (this._objects = []),
      this.backgroundImage && this.backgroundImage.dispose(),
      (this.backgroundImage = void 0),
      this.overlayImage && this.overlayImage.dispose(),
      (this.overlayImage = void 0),
      this.elements.dispose()
  }
  toString() {
    return '#<Canvas ('.concat(this.complexity(), '): { objects: ').concat(this._objects.length, ' }>')
  }
}
f(Fe, 'ownDefaults', No)
const Uo = ['touchstart', 'touchmove', 'touchend'],
  pn = (o) => {
    const t = gn(o.target),
      e = (function (s) {
        const i = s.changedTouches
        return i && i[0] ? i[0] : s
      })(o)
    return new y(e.clientX + t.left, e.clientY + t.top)
  },
  Is = (o) => Uo.includes(o.type) || o.pointerType === 'touch',
  Ti = (o) => {
    o.preventDefault(), o.stopPropagation()
  },
  Rt = (o) => {
    let t = 0,
      e = 0,
      s = 0,
      i = 0
    for (let r = 0, n = o.length; r < n; r++) {
      const { x: a, y: h } = o[r]
      ;(a > s || !r) && (s = a), (a < t || !r) && (t = a), (h > i || !r) && (i = h), (h < e || !r) && (e = h)
    }
    return {
      left: t,
      top: e,
      width: s - t,
      height: i - e
    }
  },
  qo = ['translateX', 'translateY', 'scaleX', 'scaleY'],
  mn = (o, t) => ke(o, V(t, o.calcOwnMatrix())),
  ke = (o, t) => {
    const e = ge(t),
      { translateX: s, translateY: i, scaleX: r, scaleY: n } = e,
      a = W(e, qo),
      h = new y(s, i)
    ;(o.flipX = !1),
      (o.flipY = !1),
      Object.assign(o, a),
      o.set({
        scaleX: r,
        scaleY: n
      }),
      o.setPositionByOrigin(h, k, k)
  },
  vn = (o) => {
    ;(o.scaleX = 1), (o.scaleY = 1), (o.skewX = 0), (o.skewY = 0), (o.flipX = !1), (o.flipY = !1), o.rotate(0)
  },
  sr = (o) => ({
    scaleX: o.scaleX,
    scaleY: o.scaleY,
    skewX: o.skewX,
    skewY: o.skewY,
    angle: o.angle,
    left: o.left,
    flipX: o.flipX,
    flipY: o.flipY,
    top: o.top
  }),
  $s = (o, t, e) => {
    const s = o / 2,
      i = t / 2,
      r = [new y(-s, -i), new y(s, -i), new y(-s, i), new y(s, i)].map((a) => a.transform(e)),
      n = Rt(r)
    return new y(n.width, n.height)
  },
  ms = function () {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : $
    return V(ht(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $), o)
  },
  Wt = function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $,
      e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $
    return o.transform(ms(t, e))
  },
  yn = function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $,
      e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $
    return o.transform(ms(t, e), !0)
  },
  Oi = (o, t, e) => {
    const s = ms(t, e)
    return ke(o, V(s, o.calcOwnMatrix())), s
  },
  ir = (o, t) => {
    var e
    const {
      transform: { target: s }
    } = t
    ;(e = s.canvas) === null ||
      e === void 0 ||
      e.fire(
        'object:'.concat(o),
        m(
          m({}, t),
          {},
          {
            target: s
          }
        )
      ),
      s.fire(o, t)
  },
  Ko = {
    left: -0.5,
    top: -0.5,
    center: 0,
    bottom: 0.5,
    right: 0.5
  },
  N = (o) => (typeof o == 'string' ? Ko[o] : o - 0.5),
  Bs = 'not-allowed'
function _n(o) {
  return N(o.originX) === N(k) && N(o.originY) === N(k)
}
function kr(o) {
  return 0.5 - N(o)
}
const Tt = (o, t) => o[t],
  rr = (o, t, e, s) => ({
    e: o,
    transform: t,
    pointer: new y(e, s)
  })
function xn(o, t) {
  const e = o.getTotalAngle() + ee(Math.atan2(t.y, t.x)) + 360
  return Math.round((e % 360) / 45)
}
function ti(o, t, e, s, i) {
  var r
  let { target: n, corner: a } = o
  const h = n.controls[a],
    c = ((r = n.canvas) === null || r === void 0 ? void 0 : r.getZoom()) || 1,
    l = n.padding / c,
    u = (function (g, d, p, v) {
      const _ = g.getRelativeCenterPoint(),
        x = p !== void 0 && v !== void 0 ? g.translateToGivenOrigin(_, k, k, p, v) : new y(g.left, g.top)
      return (g.angle ? d.rotate(-z(g.angle), _) : d).subtract(x)
    })(n, new y(s, i), t, e)
  return (
    u.x >= l && (u.x -= l),
    u.x <= -l && (u.x += l),
    u.y >= l && (u.y -= l),
    u.y <= l && (u.y += l),
    (u.x -= h.offsetX),
    (u.y -= h.offsetY),
    u
  )
}
const Cn = (o, t, e, s) => {
  const { target: i, offsetX: r, offsetY: n } = t,
    a = e - r,
    h = s - n,
    c = !Tt(i, 'lockMovementX') && i.left !== a,
    l = !Tt(i, 'lockMovementY') && i.top !== h
  return c && i.set(L, a), l && i.set(ct, h), (c || l) && ir($r, rr(o, t, e, s)), c || l
}
class bn {
  getSvgStyles(t) {
    const e = this.fillRule ? this.fillRule : 'nonzero',
      s = this.strokeWidth ? this.strokeWidth : '0',
      i = this.strokeDashArray ? this.strokeDashArray.join(' ') : rt,
      r = this.strokeDashOffset ? this.strokeDashOffset : '0',
      n = this.strokeLineCap ? this.strokeLineCap : 'butt',
      a = this.strokeLineJoin ? this.strokeLineJoin : 'miter',
      h = this.strokeMiterLimit ? this.strokeMiterLimit : '4',
      c = this.opacity !== void 0 ? this.opacity : '1',
      l = this.visible ? '' : ' visibility: hidden;',
      u = t ? '' : this.getSvgFilter(),
      g = ls(U, this.fill)
    return [
      ls(nt, this.stroke),
      'stroke-width: ',
      s,
      '; ',
      'stroke-dasharray: ',
      i,
      '; ',
      'stroke-linecap: ',
      n,
      '; ',
      'stroke-dashoffset: ',
      r,
      '; ',
      'stroke-linejoin: ',
      a,
      '; ',
      'stroke-miterlimit: ',
      h,
      '; ',
      g,
      'fill-rule: ',
      e,
      '; ',
      'opacity: ',
      c,
      ';',
      u,
      l
    ].join('')
  }
  getSvgFilter() {
    return this.shadow ? 'filter: url(#SVGID_'.concat(this.shadow.id, ');') : ''
  }
  getSvgCommons() {
    return [
      this.id ? 'id="'.concat(this.id, '" ') : '',
      this.clipPath ? 'clip-path="url(#'.concat(this.clipPath.clipPathId, ')" ') : ''
    ].join('')
  }
  getSvgTransform(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    const s = t ? this.calcTransformMatrix() : this.calcOwnMatrix(),
      i = 'transform="'.concat(cs(s))
    return ''.concat(i).concat(e, '" ')
  }
  _toSVG(t) {
    return ['']
  }
  toSVG(t) {
    return this._createBaseSVGMarkup(this._toSVG(t), {
      reviver: t
    })
  }
  toClipPathSVG(t) {
    return (
      '	' +
      this._createBaseClipPathSVGMarkup(this._toSVG(t), {
        reviver: t
      })
    )
  }
  _createBaseClipPathSVGMarkup(t) {
    let { reviver: e, additionalTransform: s = '' } =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const i = [this.getSvgTransform(!0, s), this.getSvgCommons()].join(''),
      r = t.indexOf('COMMON_PARTS')
    return (t[r] = i), e ? e(t.join('')) : t.join('')
  }
  _createBaseSVGMarkup(t) {
    let {
      noStyle: e,
      reviver: s,
      withShadow: i,
      additionalTransform: r
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const n = e ? '' : 'style="'.concat(this.getSvgStyles(), '" '),
      a = i ? 'style="'.concat(this.getSvgFilter(), '" ') : '',
      h = this.clipPath,
      c = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : '',
      l = h && h.absolutePositioned,
      u = this.stroke,
      g = this.fill,
      d = this.shadow,
      p = [],
      v = t.indexOf('COMMON_PARTS')
    let _
    h &&
      ((h.clipPathId = 'CLIPPATH_'.concat(te())),
      (_ = '<clipPath id="'
        .concat(
          h.clipPathId,
          `" >
`
        )
        .concat(
          h.toClipPathSVG(s),
          `</clipPath>
`
        ))),
      l &&
        p.push(
          '<g ',
          a,
          this.getSvgCommons(),
          ` >
`
        ),
      p.push(
        '<g ',
        this.getSvgTransform(!1),
        l ? '' : a + this.getSvgCommons(),
        ` >
`
      )
    const x = [n, c, e ? '' : this.addPaintOrder(), ' ', r ? 'transform="'.concat(r, '" ') : ''].join('')
    return (
      (t[v] = x),
      yt(g) && p.push(g.toSVG(this)),
      yt(u) && p.push(u.toSVG(this)),
      d && p.push(d.toSVG(this)),
      h && p.push(_),
      p.push(t.join('')),
      p.push(`</g>
`),
      l &&
        p.push(`</g>
`),
      s ? s(p.join('')) : p.join('')
    )
  }
  addPaintOrder() {
    return this.paintFirst !== U ? ' paint-order="'.concat(this.paintFirst, '" ') : ''
  }
}
function ei(o) {
  return new RegExp('^(' + o.join('|') + ')\\b', 'i')
}
var Dr
const St = String.raw(
    Dr ||
      (Dr = se(['(?:[-+]?(?:d*.d+|d+.?)(?:[eE][-+]?d+)?)'], ['(?:[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?)']))
  ),
  ki = 'http://www.w3.org/2000/svg',
  Jo = new RegExp(
    '(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(' +
      St +
      '(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|' +
      St +
      '))?\\s+(.*)'
  ),
  Qo = {
    cx: L,
    x: L,
    r: 'radius',
    cy: ct,
    y: ct,
    display: 'visible',
    visibility: 'visible',
    transform: 'transformMatrix',
    'fill-opacity': 'fillOpacity',
    'fill-rule': 'fillRule',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-style': 'fontStyle',
    'font-weight': 'fontWeight',
    'letter-spacing': 'charSpacing',
    'paint-order': 'paintFirst',
    'stroke-dasharray': 'strokeDashArray',
    'stroke-dashoffset': 'strokeDashOffset',
    'stroke-linecap': 'strokeLineCap',
    'stroke-linejoin': 'strokeLineJoin',
    'stroke-miterlimit': 'strokeMiterLimit',
    'stroke-opacity': 'strokeOpacity',
    'stroke-width': 'strokeWidth',
    'text-decoration': 'textDecoration',
    'text-anchor': 'textAnchor',
    opacity: 'opacity',
    'clip-path': 'clipPath',
    'clip-rule': 'clipRule',
    'vector-effect': 'strokeUniform',
    'image-rendering': 'imageSmoothing'
  },
  gi = 'font-size',
  di = 'clip-path',
  Zo = ei(['path', 'circle', 'polygon', 'polyline', 'ellipse', 'rect', 'line', 'image', 'text']),
  $o = ei(['symbol', 'image', 'marker', 'pattern', 'view', 'svg']),
  Mr = ei(['symbol', 'g', 'a', 'svg', 'clipPath', 'defs']),
  Pr = new RegExp('^\\s*(' + St + '+)\\s*,?\\s*(' + St + '+)\\s*,?\\s*(' + St + '+)\\s*,?\\s*(' + St + '+)\\s*$'),
  ta = new y(1, 0),
  wn = new y(),
  nr = (o, t) => o.rotate(t),
  Xs = (o, t) => new y(t).subtract(o),
  Ys = (o) => o.distanceFrom(wn),
  Ws = (o, t) => Math.atan2(Se(o, t), Tn(o, t)),
  Sn = (o) => Ws(ta, o),
  si = (o) => (o.eq(wn) ? o : o.scalarDivide(Ys(o))),
  or = function (o) {
    let t = !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1]
    return si(new y(-o.y, o.x).scalarMultiply(t ? 1 : -1))
  },
  Se = (o, t) => o.x * t.y - o.y * t.x,
  Tn = (o, t) => o.x * t.x + o.y * t.y,
  Di = (o, t, e) => {
    if (o.eq(t) || o.eq(e)) return !0
    const s = Se(t, e),
      i = Se(t, o),
      r = Se(e, o)
    return s >= 0 ? i >= 0 && r <= 0 : !(i <= 0 && r >= 0)
  },
  Er = '(-?\\d+(?:\\.\\d*)?(?:px)?(?:\\s?|$))?',
  Ar = new RegExp('(?:\\s|^)' + Er + Er + '(' + St + '?(?:px)?)?(?:\\s?|$)(?:$|\\s)')
class gt {
  constructor(t) {
    const e = typeof t == 'string' ? gt.parseShadow(t) : t
    Object.assign(this, gt.ownDefaults, e), (this.id = te())
  }
  static parseShadow(t) {
    const e = t.trim(),
      [, s = 0, i = 0, r = 0] = (Ar.exec(e) || []).map((n) => parseFloat(n) || 0)
    return {
      color: (e.replace(Ar, '') || 'rgb(0,0,0)').trim(),
      offsetX: s,
      offsetY: i,
      blur: r
    }
  }
  toString() {
    return [this.offsetX, this.offsetY, this.blur, this.color].join('px ')
  }
  toSVG(t) {
    const e = nr(new y(this.offsetX, this.offsetY), z(-t.angle)),
      s = new j(this.color)
    let i = 40,
      r = 40
    return (
      t.width &&
        t.height &&
        ((i = 100 * Y((Math.abs(e.x) + this.blur) / t.width, E.NUM_FRACTION_DIGITS) + 20),
        (r = 100 * Y((Math.abs(e.y) + this.blur) / t.height, E.NUM_FRACTION_DIGITS) + 20)),
      t.flipX && (e.x *= -1),
      t.flipY && (e.y *= -1),
      '<filter id="SVGID_'
        .concat(this.id, '" y="-')
        .concat(r, '%" height="')
        .concat(100 + 2 * r, '%" x="-')
        .concat(i, '%" width="')
        .concat(
          100 + 2 * i,
          `%" >
	<feGaussianBlur in="SourceAlpha" stdDeviation="`
        )
        .concat(
          Y(this.blur ? this.blur / 2 : 0, E.NUM_FRACTION_DIGITS),
          `"></feGaussianBlur>
	<feOffset dx="`
        )
        .concat(Y(e.x, E.NUM_FRACTION_DIGITS), '" dy="')
        .concat(
          Y(e.y, E.NUM_FRACTION_DIGITS),
          `" result="oBlur" ></feOffset>
	<feFlood flood-color="`
        )
        .concat(s.toRgb(), '" flood-opacity="')
        .concat(
          s.getAlpha(),
          `"/>
	<feComposite in2="oBlur" operator="in" />
	<feMerge>
		<feMergeNode></feMergeNode>
		<feMergeNode in="SourceGraphic"></feMergeNode>
	</feMerge>
</filter>
`
        )
    )
  }
  toObject() {
    const t = {
        color: this.color,
        blur: this.blur,
        offsetX: this.offsetX,
        offsetY: this.offsetY,
        affectStroke: this.affectStroke,
        nonScaling: this.nonScaling,
        type: this.constructor.type
      },
      e = gt.ownDefaults
    return this.includeDefaultValues ? t : $i(t, (s, i) => s !== e[i])
  }
  static async fromObject(t) {
    return new this(t)
  }
}
f(gt, 'ownDefaults', {
  color: 'rgb(0,0,0)',
  blur: 0,
  offsetX: 0,
  offsetY: 0,
  affectStroke: !1,
  includeDefaultValues: !0,
  nonScaling: !1
}),
  f(gt, 'type', 'shadow'),
  w.setClass(gt, 'shadow')
const de = (o, t, e) => Math.max(o, Math.min(t, e)),
  ea = [
    ct,
    L,
    ot,
    ft,
    'flipX',
    'flipY',
    'originX',
    'originY',
    'angle',
    'opacity',
    'globalCompositeOperation',
    'shadow',
    'visible',
    Pe,
    Ee
  ],
  zt = [
    U,
    nt,
    'strokeWidth',
    'strokeDashArray',
    'width',
    'height',
    'paintFirst',
    'strokeUniform',
    'strokeLineCap',
    'strokeDashOffset',
    'strokeLineJoin',
    'strokeMiterLimit',
    'backgroundColor',
    'clipPath'
  ],
  sa = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    angle: 0,
    flipX: !1,
    flipY: !1,
    scaleX: 1,
    scaleY: 1,
    minScaleLimit: 0,
    skewX: 0,
    skewY: 0,
    originX: L,
    originY: ct,
    strokeWidth: 1,
    strokeUniform: !1,
    padding: 0,
    opacity: 1,
    paintFirst: U,
    fill: 'rgb(0,0,0)',
    fillRule: 'nonzero',
    stroke: null,
    strokeDashArray: null,
    strokeDashOffset: 0,
    strokeLineCap: 'butt',
    strokeLineJoin: 'miter',
    strokeMiterLimit: 4,
    globalCompositeOperation: 'source-over',
    backgroundColor: '',
    shadow: null,
    visible: !0,
    includeDefaultValues: !0,
    excludeFromExport: !1,
    objectCaching: !0,
    clipPath: void 0,
    inverted: !1,
    absolutePositioned: !1,
    centeredRotation: !0,
    centeredScaling: !1,
    dirty: !0
  },
  fi = (o, t, e, s) => (
    o < Math.abs(t)
      ? ((o = t), (s = e / 4))
      : (s = t === 0 && o === 0 ? (e / Gt) * Math.asin(1) : (e / Gt) * Math.asin(t / o)),
    {
      a: o,
      c: t,
      p: e,
      s
    }
  ),
  jr = (o, t, e, s, i) => o * Math.pow(2, 10 * (s -= 1)) * Math.sin(((s * i - t) * Gt) / e),
  On = (o, t, e, s) => -e * Math.cos((o / s) * $t) + e + t,
  Mi = (o, t, e, s) =>
    (o /= s) < 1 / 2.75
      ? e * (7.5625 * o * o) + t
      : o < 2 / 2.75
      ? e * (7.5625 * (o -= 1.5 / 2.75) * o + 0.75) + t
      : o < 2.5 / 2.75
      ? e * (7.5625 * (o -= 2.25 / 2.75) * o + 0.9375) + t
      : e * (7.5625 * (o -= 2.625 / 2.75) * o + 0.984375) + t,
  Fr = (o, t, e, s) => e - Mi(s - o, 0, e, s) + t
var ia = Object.freeze({
  __proto__: null,
  defaultEasing: On,
  easeInBack: function (o, t, e, s) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1.70158
    return e * (o /= s) * o * ((i + 1) * o - i) + t
  },
  easeInBounce: Fr,
  easeInCirc: (o, t, e, s) => -e * (Math.sqrt(1 - (o /= s) * o) - 1) + t,
  easeInCubic: (o, t, e, s) => e * (o / s) ** 3 + t,
  easeInElastic: (o, t, e, s) => {
    const i = e
    let r = 0
    if (o === 0) return t
    if ((o /= s) === 1) return t + e
    r || (r = 0.3 * s)
    const { a: n, s: a, p: h } = fi(i, e, r, 1.70158)
    return -jr(n, a, h, o, s) + t
  },
  easeInExpo: (o, t, e, s) => (o === 0 ? t : e * 2 ** (10 * (o / s - 1)) + t),
  easeInOutBack: function (o, t, e, s) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1.70158
    return (o /= s / 2) < 1
      ? (e / 2) * (o * o * ((1 + (i *= 1.525)) * o - i)) + t
      : (e / 2) * ((o -= 2) * o * ((1 + (i *= 1.525)) * o + i) + 2) + t
  },
  easeInOutBounce: (o, t, e, s) =>
    o < s / 2 ? 0.5 * Fr(2 * o, 0, e, s) + t : 0.5 * Mi(2 * o - s, 0, e, s) + 0.5 * e + t,
  easeInOutCirc: (o, t, e, s) =>
    (o /= s / 2) < 1 ? (-e / 2) * (Math.sqrt(1 - o ** 2) - 1) + t : (e / 2) * (Math.sqrt(1 - (o -= 2) * o) + 1) + t,
  easeInOutCubic: (o, t, e, s) => ((o /= s / 2) < 1 ? (e / 2) * o ** 3 + t : (e / 2) * ((o - 2) ** 3 + 2) + t),
  easeInOutElastic: (o, t, e, s) => {
    const i = e
    let r = 0
    if (o === 0) return t
    if ((o /= s / 2) === 2) return t + e
    r || (r = s * (0.3 * 1.5))
    const { a: n, s: a, p: h, c } = fi(i, e, r, 1.70158)
    return o < 1
      ? -0.5 * jr(n, a, h, o, s) + t
      : n * Math.pow(2, -10 * (o -= 1)) * Math.sin(((o * s - a) * Gt) / h) * 0.5 + c + t
  },
  easeInOutExpo: (o, t, e, s) =>
    o === 0
      ? t
      : o === s
      ? t + e
      : (o /= s / 2) < 1
      ? (e / 2) * 2 ** (10 * (o - 1)) + t
      : (e / 2) * -(2 ** (-10 * --o) + 2) + t,
  easeInOutQuad: (o, t, e, s) => ((o /= s / 2) < 1 ? (e / 2) * o ** 2 + t : (-e / 2) * (--o * (o - 2) - 1) + t),
  easeInOutQuart: (o, t, e, s) => ((o /= s / 2) < 1 ? (e / 2) * o ** 4 + t : (-e / 2) * ((o -= 2) * o ** 3 - 2) + t),
  easeInOutQuint: (o, t, e, s) => ((o /= s / 2) < 1 ? (e / 2) * o ** 5 + t : (e / 2) * ((o - 2) ** 5 + 2) + t),
  easeInOutSine: (o, t, e, s) => (-e / 2) * (Math.cos((Math.PI * o) / s) - 1) + t,
  easeInQuad: (o, t, e, s) => e * (o /= s) * o + t,
  easeInQuart: (o, t, e, s) => e * (o /= s) * o ** 3 + t,
  easeInQuint: (o, t, e, s) => e * (o / s) ** 5 + t,
  easeInSine: (o, t, e, s) => -e * Math.cos((o / s) * $t) + e + t,
  easeOutBack: function (o, t, e, s) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1.70158
    return e * ((o = o / s - 1) * o * ((i + 1) * o + i) + 1) + t
  },
  easeOutBounce: Mi,
  easeOutCirc: (o, t, e, s) => e * Math.sqrt(1 - (o = o / s - 1) * o) + t,
  easeOutCubic: (o, t, e, s) => e * ((o / s - 1) ** 3 + 1) + t,
  easeOutElastic: (o, t, e, s) => {
    const i = e
    let r = 0
    if (o === 0) return t
    if ((o /= s) === 1) return t + e
    r || (r = 0.3 * s)
    const { a: n, s: a, p: h, c } = fi(i, e, r, 1.70158)
    return n * 2 ** (-10 * o) * Math.sin(((o * s - a) * Gt) / h) + c + t
  },
  easeOutExpo: (o, t, e, s) => (o === s ? t + e : e * -(2 ** ((-10 * o) / s) + 1) + t),
  easeOutQuad: (o, t, e, s) => -e * (o /= s) * (o - 2) + t,
  easeOutQuart: (o, t, e, s) => -e * ((o = o / s - 1) * o ** 3 - 1) + t,
  easeOutQuint: (o, t, e, s) => e * ((o / s - 1) ** 5 + 1) + t,
  easeOutSine: (o, t, e, s) => e * Math.sin((o / s) * $t) + t
})
const ra = () => !1
class ar {
  constructor(t) {
    let {
      startValue: e,
      byValue: s,
      duration: i = 500,
      delay: r = 0,
      easing: n = On,
      onStart: a = ue,
      onChange: h = ue,
      onComplete: c = ue,
      abort: l = ra,
      target: u
    } = t
    f(this, '_state', 'pending'),
      f(this, 'durationProgress', 0),
      f(this, 'valueProgress', 0),
      (this.tick = this.tick.bind(this)),
      (this.duration = i),
      (this.delay = r),
      (this.easing = n),
      (this._onStart = a),
      (this._onChange = h),
      (this._onComplete = c),
      (this._abort = l),
      (this.target = u),
      (this.startValue = e),
      (this.byValue = s),
      (this.value = this.startValue),
      (this.endValue = Object.freeze(this.calculate(this.duration).value))
  }
  get state() {
    return this._state
  }
  isDone() {
    return this._state === 'aborted' || this._state === 'completed'
  }
  start() {
    const t = (e) => {
      this._state === 'pending' &&
        ((this.startTime = e || +new Date()), (this._state = 'running'), this._onStart(), this.tick(this.startTime))
    }
    this.register(), this.delay > 0 ? setTimeout(() => ss(t), this.delay) : ss(t)
  }
  tick(t) {
    const e = (t || +new Date()) - this.startTime,
      s = Math.min(e, this.duration)
    this.durationProgress = s / this.duration
    const { value: i, valueProgress: r } = this.calculate(s)
    ;(this.value = Object.freeze(i)),
      (this.valueProgress = r),
      this._state !== 'aborted' &&
        (this._abort(this.value, this.valueProgress, this.durationProgress)
          ? ((this._state = 'aborted'), this.unregister())
          : e >= this.duration
          ? ((this.durationProgress = this.valueProgress = 1),
            this._onChange(this.endValue, this.valueProgress, this.durationProgress),
            (this._state = 'completed'),
            this._onComplete(this.endValue, this.valueProgress, this.durationProgress),
            this.unregister())
          : (this._onChange(this.value, this.valueProgress, this.durationProgress), ss(this.tick)))
  }
  register() {
    hs.push(this)
  }
  unregister() {
    hs.remove(this)
  }
  abort() {
    ;(this._state = 'aborted'), this.unregister()
  }
}
const na = ['startValue', 'endValue']
class oa extends ar {
  constructor(t) {
    let { startValue: e = 0, endValue: s = 100 } = t
    super(
      m(
        m({}, W(t, na)),
        {},
        {
          startValue: e,
          byValue: s - e
        }
      )
    )
  }
  calculate(t) {
    const e = this.easing(t, this.startValue, this.byValue, this.duration)
    return {
      value: e,
      valueProgress: Math.abs((e - this.startValue) / this.byValue)
    }
  }
}
const aa = ['startValue', 'endValue']
class ha extends ar {
  constructor(t) {
    let { startValue: e = [0], endValue: s = [100] } = t
    super(
      m(
        m({}, W(t, aa)),
        {},
        {
          startValue: e,
          byValue: s.map((i, r) => i - e[r])
        }
      )
    )
  }
  calculate(t) {
    const e = this.startValue.map((s, i) => this.easing(t, s, this.byValue[i], this.duration, i))
    return {
      value: e,
      valueProgress: Math.abs((e[0] - this.startValue[0]) / this.byValue[0])
    }
  }
}
const ca = ['startValue', 'endValue', 'easing', 'onChange', 'onComplete', 'abort'],
  la = (o, t, e, s) => t + e * (1 - Math.cos((o / s) * $t)),
  pi = (o) => o && ((t, e, s) => o(new j(t).toRgba(), e, s))
class ua extends ar {
  constructor(t) {
    let { startValue: e, endValue: s, easing: i = la, onChange: r, onComplete: n, abort: a } = t,
      h = W(t, ca)
    const c = new j(e).getSource(),
      l = new j(s).getSource()
    super(
      m(
        m({}, h),
        {},
        {
          startValue: c,
          byValue: l.map((u, g) => u - c[g]),
          easing: i,
          onChange: pi(r),
          onComplete: pi(n),
          abort: pi(a)
        }
      )
    )
  }
  calculate(t) {
    const [e, s, i, r] = this.startValue.map((a, h) => this.easing(t, a, this.byValue[h], this.duration, h)),
      n = [...[e, s, i].map(Math.round), de(0, r, 1)]
    return {
      value: n,
      valueProgress:
        n
          .map((a, h) => (this.byValue[h] !== 0 ? Math.abs((a - this.startValue[h]) / this.byValue[h]) : 0))
          .find((a) => a !== 0) || 0
    }
  }
}
function hr(o) {
  const t = ((e) => Array.isArray(e.startValue) || Array.isArray(e.endValue))(o) ? new ha(o) : new oa(o)
  return t.start(), t
}
function kn(o) {
  const t = new ua(o)
  return t.start(), t
}
class X {
  constructor(t) {
    ;(this.status = t), (this.points = [])
  }
  includes(t) {
    return this.points.some((e) => e.eq(t))
  }
  append() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s]
    return (this.points = this.points.concat(e.filter((i) => !this.includes(i)))), this
  }
  static isPointContained(t, e, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 && arguments[3]
    if (e.eq(s)) return t.eq(e)
    if (e.x === s.x) return t.x === e.x && (i || (t.y >= Math.min(e.y, s.y) && t.y <= Math.max(e.y, s.y)))
    if (e.y === s.y) return t.y === e.y && (i || (t.x >= Math.min(e.x, s.x) && t.x <= Math.max(e.x, s.x)))
    {
      const r = Xs(e, s),
        n = Xs(e, t).divide(r)
      return i ? Math.abs(n.x) === Math.abs(n.y) : n.x === n.y && n.x >= 0 && n.x <= 1
    }
  }
  static isPointInPolygon(t, e) {
    const s = new y(t).setX(Math.min(t.x - 1, ...e.map((r) => r.x)))
    let i = 0
    for (let r = 0; r < e.length; r++) {
      const n = this.intersectSegmentSegment(e[r], e[(r + 1) % e.length], t, s)
      if (n.includes(t)) return !0
      i += +(n.status === 'Intersection')
    }
    return i % 2 == 1
  }
  static intersectLineLine(t, e, s, i) {
    let r = !(arguments.length > 4 && arguments[4] !== void 0) || arguments[4],
      n = !(arguments.length > 5 && arguments[5] !== void 0) || arguments[5]
    const a = e.x - t.x,
      h = e.y - t.y,
      c = i.x - s.x,
      l = i.y - s.y,
      u = t.x - s.x,
      g = t.y - s.y,
      d = c * g - l * u,
      p = a * g - h * u,
      v = l * a - c * h
    if (v !== 0) {
      const _ = d / v,
        x = p / v
      return (r || (0 <= _ && _ <= 1)) && (n || (0 <= x && x <= 1))
        ? new X('Intersection').append(new y(t.x + _ * a, t.y + _ * h))
        : new X()
    }
    if (d === 0 || p === 0) {
      const _ =
        r ||
        n ||
        X.isPointContained(t, s, i) ||
        X.isPointContained(e, s, i) ||
        X.isPointContained(s, t, e) ||
        X.isPointContained(i, t, e)
      return new X(_ ? 'Coincident' : void 0)
    }
    return new X('Parallel')
  }
  static intersectSegmentLine(t, e, s, i) {
    return X.intersectLineLine(t, e, s, i, !1, !0)
  }
  static intersectSegmentSegment(t, e, s, i) {
    return X.intersectLineLine(t, e, s, i, !1, !1)
  }
  static intersectLinePolygon(t, e, s) {
    let i = !(arguments.length > 3 && arguments[3] !== void 0) || arguments[3]
    const r = new X(),
      n = s.length
    for (let a, h, c, l = 0; l < n; l++) {
      if (((a = s[l]), (h = s[(l + 1) % n]), (c = X.intersectLineLine(t, e, a, h, i, !1)), c.status === 'Coincident'))
        return c
      r.append(...c.points)
    }
    return r.points.length > 0 && (r.status = 'Intersection'), r
  }
  static intersectSegmentPolygon(t, e, s) {
    return X.intersectLinePolygon(t, e, s, !1)
  }
  static intersectPolygonPolygon(t, e) {
    const s = new X(),
      i = t.length,
      r = []
    for (let n = 0; n < i; n++) {
      const a = t[n],
        h = t[(n + 1) % i],
        c = X.intersectSegmentPolygon(a, h, e)
      c.status === 'Coincident' ? (r.push(c), s.append(a, h)) : s.append(...c.points)
    }
    return r.length > 0 && r.length === t.length
      ? new X('Coincident')
      : (s.points.length > 0 && (s.status = 'Intersection'), s)
  }
  static intersectPolygonRectangle(t, e, s) {
    const i = e.min(s),
      r = e.max(s),
      n = new y(r.x, i.y),
      a = new y(i.x, r.y)
    return X.intersectPolygonPolygon(t, [i, n, r, a])
  }
}
class ga extends nn {
  getX() {
    return this.getXY().x
  }
  setX(t) {
    this.setXY(this.getXY().setX(t))
  }
  getY() {
    return this.getXY().y
  }
  setY(t) {
    this.setXY(this.getXY().setY(t))
  }
  getRelativeX() {
    return this.left
  }
  setRelativeX(t) {
    this.left = t
  }
  getRelativeY() {
    return this.top
  }
  setRelativeY(t) {
    this.top = t
  }
  getXY() {
    const t = this.getRelativeXY()
    return this.group ? Z(t, this.group.calcTransformMatrix()) : t
  }
  setXY(t, e, s) {
    this.group && (t = Z(t, ht(this.group.calcTransformMatrix()))), this.setRelativeXY(t, e, s)
  }
  getRelativeXY() {
    return new y(this.left, this.top)
  }
  setRelativeXY(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.originX,
      s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.originY
    this.setPositionByOrigin(t, e, s)
  }
  isStrokeAccountedForInDimensions() {
    return !1
  }
  getCoords() {
    const { tl: t, tr: e, br: s, bl: i } = this.aCoords || (this.aCoords = this.calcACoords()),
      r = [t, e, s, i]
    if (this.group) {
      const n = this.group.calcTransformMatrix()
      return r.map((a) => Z(a, n))
    }
    return r
  }
  intersectsWithRect(t, e) {
    return X.intersectPolygonRectangle(this.getCoords(), t, e).status === 'Intersection'
  }
  intersectsWithObject(t) {
    const e = X.intersectPolygonPolygon(this.getCoords(), t.getCoords())
    return (
      e.status === 'Intersection' ||
      e.status === 'Coincident' ||
      t.isContainedWithinObject(this) ||
      this.isContainedWithinObject(t)
    )
  }
  isContainedWithinObject(t) {
    return this.getCoords().every((e) => t.containsPoint(e))
  }
  isContainedWithinRect(t, e) {
    const { left: s, top: i, width: r, height: n } = this.getBoundingRect()
    return s >= t.x && s + r <= e.x && i >= t.y && i + n <= e.y
  }
  isOverlapping(t) {
    return this.intersectsWithObject(t) || this.isContainedWithinObject(t) || t.isContainedWithinObject(this)
  }
  containsPoint(t) {
    return X.isPointInPolygon(t, this.getCoords())
  }
  isOnScreen() {
    if (!this.canvas) return !1
    const { tl: t, br: e } = this.canvas.vptCoords
    return (
      !!this.getCoords().some((s) => s.x <= e.x && s.x >= t.x && s.y <= e.y && s.y >= t.y) ||
      !!this.intersectsWithRect(t, e) ||
      this.containsPoint(t.midPointFrom(e))
    )
  }
  isPartiallyOnScreen() {
    if (!this.canvas) return !1
    const { tl: t, br: e } = this.canvas.vptCoords
    return this.intersectsWithRect(t, e)
      ? !0
      : this.getCoords().every((s) => (s.x >= e.x || s.x <= t.x) && (s.y >= e.y || s.y <= t.y)) &&
          this.containsPoint(t.midPointFrom(e))
  }
  getBoundingRect() {
    return Rt(this.getCoords())
  }
  getScaledWidth() {
    return this._getTransformedDimensions().x
  }
  getScaledHeight() {
    return this._getTransformedDimensions().y
  }
  scale(t) {
    this._set(ot, t), this._set(ft, t), this.setCoords()
  }
  scaleToWidth(t) {
    const e = this.getBoundingRect().width / this.getScaledWidth()
    return this.scale(t / this.width / e)
  }
  scaleToHeight(t) {
    const e = this.getBoundingRect().height / this.getScaledHeight()
    return this.scale(t / this.height / e)
  }
  getCanvasRetinaScaling() {
    var t
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.getRetinaScaling()) || 1
  }
  getTotalAngle() {
    return this.group ? ee(cn(this.calcTransformMatrix())) : this.angle
  }
  getViewportTransform() {
    var t
    return ((t = this.canvas) === null || t === void 0 ? void 0 : t.viewportTransform) || $.concat()
  }
  calcACoords() {
    const t = je({
        angle: this.angle
      }),
      { x: e, y: s } = this.getRelativeCenterPoint(),
      i = Ae(e, s),
      r = V(i, t),
      n = this._getTransformedDimensions(),
      a = n.x / 2,
      h = n.y / 2
    return {
      tl: Z(
        {
          x: -a,
          y: -h
        },
        r
      ),
      tr: Z(
        {
          x: a,
          y: -h
        },
        r
      ),
      bl: Z(
        {
          x: -a,
          y: h
        },
        r
      ),
      br: Z(
        {
          x: a,
          y: h
        },
        r
      )
    }
  }
  setCoords() {
    this.aCoords = this.calcACoords()
  }
  transformMatrixKey() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0],
      e = []
    return (
      !t && this.group && (e = this.group.transformMatrixKey(t)),
      e.push(
        this.top,
        this.left,
        this.width,
        this.height,
        this.scaleX,
        this.scaleY,
        this.angle,
        this.strokeWidth,
        this.skewX,
        this.skewY,
        +this.flipX,
        +this.flipY,
        N(this.originX),
        N(this.originY)
      ),
      e
    )
  }
  calcTransformMatrix() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0],
      e = this.calcOwnMatrix()
    if (t || !this.group) return e
    const s = this.transformMatrixKey(t),
      i = this.matrixCache
    return i && i.key.every((r, n) => r === s[n])
      ? i.value
      : (this.group && (e = V(this.group.calcTransformMatrix(!1), e)),
        (this.matrixCache = {
          key: s,
          value: e
        }),
        e)
  }
  calcOwnMatrix() {
    const t = this.transformMatrixKey(!0),
      e = this.ownMatrixCache
    if (e && e.key === t) return e.value
    const s = this.getRelativeCenterPoint(),
      i = {
        angle: this.angle,
        translateX: s.x,
        translateY: s.y,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        skewX: this.skewX,
        skewY: this.skewY,
        flipX: this.flipX,
        flipY: this.flipY
      },
      r = un(i)
    return (
      (this.ownMatrixCache = {
        key: t,
        value: r
      }),
      r
    )
  }
  _getNonTransformedDimensions() {
    return new y(this.width, this.height).scalarAdd(this.strokeWidth)
  }
  _calculateCurrentDimensions(t) {
    return this._getTransformedDimensions(t)
      .transform(this.getViewportTransform(), !0)
      .scalarAdd(2 * this.padding)
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    const e = m(
        {
          scaleX: this.scaleX,
          scaleY: this.scaleY,
          skewX: this.skewX,
          skewY: this.skewY,
          width: this.width,
          height: this.height,
          strokeWidth: this.strokeWidth
        },
        t
      ),
      s = e.strokeWidth
    let i = s,
      r = 0
    this.strokeUniform && ((i = 0), (r = s))
    const n = e.width + i,
      a = e.height + i
    let h
    return (h = e.skewX === 0 && e.skewY === 0 ? new y(n * e.scaleX, a * e.scaleY) : $s(n, a, fs(e))), h.scalarAdd(r)
  }
  translateToGivenOrigin(t, e, s, i, r) {
    let n = t.x,
      a = t.y
    const h = N(i) - N(e),
      c = N(r) - N(s)
    if (h || c) {
      const l = this._getTransformedDimensions()
      ;(n += h * l.x), (a += c * l.y)
    }
    return new y(n, a)
  }
  translateToCenterPoint(t, e, s) {
    if (e === k && s === k) return t
    const i = this.translateToGivenOrigin(t, e, s, k, k)
    return this.angle ? i.rotate(z(this.angle), t) : i
  }
  translateToOriginPoint(t, e, s) {
    const i = this.translateToGivenOrigin(t, k, k, e, s)
    return this.angle ? i.rotate(z(this.angle), t) : i
  }
  getCenterPoint() {
    const t = this.getRelativeCenterPoint()
    return this.group ? Z(t, this.group.calcTransformMatrix()) : t
  }
  getRelativeCenterPoint() {
    return this.translateToCenterPoint(new y(this.left, this.top), this.originX, this.originY)
  }
  getPointByOrigin(t, e) {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), t, e)
  }
  setPositionByOrigin(t, e, s) {
    const i = this.translateToCenterPoint(t, e, s),
      r = this.translateToOriginPoint(i, this.originX, this.originY)
    this.set({
      left: r.x,
      top: r.y
    })
  }
  _getLeftTopCoords() {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), L, ct)
  }
}
const da = ['type'],
  fa = ['extraParam']
let Pt = class Ms extends ga {
  static getDefaults() {
    return Ms.ownDefaults
  }
  get type() {
    const t = this.constructor.type
    return t === 'FabricObject' ? 'object' : t.toLowerCase()
  }
  set type(t) {
    Vt('warn', 'Setting type has no effect', t)
  }
  constructor(t) {
    super(), f(this, '_cacheContext', null), Object.assign(this, Ms.ownDefaults), this.setOptions(t)
  }
  _createCacheCanvas() {
    ;(this._cacheCanvas = lt()),
      (this._cacheContext = this._cacheCanvas.getContext('2d')),
      this._updateCacheCanvas(),
      (this.dirty = !0)
  }
  _limitCacheSize(t) {
    const e = t.width,
      s = t.height,
      i = E.maxCacheSideLimit,
      r = E.minCacheSideLimit
    if (e <= i && s <= i && e * s <= E.perfLimitSizeTotal) return e < r && (t.width = r), s < r && (t.height = r), t
    const n = e / s,
      [a, h] = we.limitDimsByArea(n),
      c = de(r, a, i),
      l = de(r, h, i)
    return (
      e > c && ((t.zoomX /= e / c), (t.width = c), (t.capped = !0)),
      s > l && ((t.zoomY /= s / l), (t.height = l), (t.capped = !0)),
      t
    )
  }
  _getCacheCanvasDimensions() {
    const t = this.getTotalObjectScaling(),
      e = this._getTransformedDimensions({
        skewX: 0,
        skewY: 0
      }),
      s = (e.x * t.x) / this.scaleX,
      i = (e.y * t.y) / this.scaleY
    return {
      width: Math.ceil(s + 2),
      height: Math.ceil(i + 2),
      zoomX: t.x,
      zoomY: t.y,
      x: s,
      y: i
    }
  }
  _updateCacheCanvas() {
    const t = this._cacheCanvas,
      e = this._cacheContext,
      { width: s, height: i, zoomX: r, zoomY: n, x: a, y: h } = this._limitCacheSize(this._getCacheCanvasDimensions()),
      c = s !== t.width || i !== t.height,
      l = this.zoomX !== r || this.zoomY !== n
    if (!t || !e) return !1
    if (c || l) {
      s !== t.width || i !== t.height
        ? ((t.width = s), (t.height = i))
        : (e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height))
      const u = a / 2,
        g = h / 2
      return (
        (this.cacheTranslationX = Math.round(t.width / 2 - u) + u),
        (this.cacheTranslationY = Math.round(t.height / 2 - g) + g),
        e.translate(this.cacheTranslationX, this.cacheTranslationY),
        e.scale(r, n),
        (this.zoomX = r),
        (this.zoomY = n),
        !0
      )
    }
    return !1
  }
  setOptions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    this._setOptions(t)
  }
  transform(t) {
    const e = (this.group && !this.group._transformDone) || (this.group && this.canvas && t === this.canvas.contextTop),
      s = this.calcTransformMatrix(!e)
    t.transform(s[0], s[1], s[2], s[3], s[4], s[5])
  }
  getObjectScaling() {
    if (!this.group) return new y(Math.abs(this.scaleX), Math.abs(this.scaleY))
    const t = ge(this.calcTransformMatrix())
    return new y(Math.abs(t.scaleX), Math.abs(t.scaleY))
  }
  getTotalObjectScaling() {
    const t = this.getObjectScaling()
    if (this.canvas) {
      const e = this.canvas.getZoom(),
        s = this.getCanvasRetinaScaling()
      return t.scalarMultiply(e * s)
    }
    return t
  }
  getObjectOpacity() {
    let t = this.opacity
    return this.group && (t *= this.group.getObjectOpacity()), t
  }
  _constrainScale(t) {
    return Math.abs(t) < this.minScaleLimit ? (t < 0 ? -this.minScaleLimit : this.minScaleLimit) : t === 0 ? 1e-4 : t
  }
  _set(t, e) {
    ;(t !== ot && t !== ft) || (e = this._constrainScale(e)),
      t === ot && e < 0
        ? ((this.flipX = !this.flipX), (e *= -1))
        : t === 'scaleY' && e < 0
        ? ((this.flipY = !this.flipY), (e *= -1))
        : t !== 'shadow' || !e || e instanceof gt || (e = new gt(e))
    const s = this[t] !== e
    return (
      (this[t] = e),
      s && this.constructor.cacheProperties.includes(t) && (this.dirty = !0),
      this.parent &&
        (this.dirty || (s && this.constructor.stateProperties.includes(t))) &&
        this.parent._set('dirty', !0),
      this
    )
  }
  isNotVisible() {
    return this.opacity === 0 || (!this.width && !this.height && this.strokeWidth === 0) || !this.visible
  }
  render(t) {
    this.isNotVisible() ||
      (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) ||
      (t.save(),
      this._setupCompositeOperation(t),
      this.drawSelectionBackground(t),
      this.transform(t),
      this._setOpacity(t),
      this._setShadow(t),
      this.shouldCache()
        ? (this.renderCache(), this.drawCacheOnCanvas(t))
        : (this._removeCacheCanvas(), this.drawObject(t, !1, {}), (this.dirty = !1)),
      t.restore())
  }
  drawSelectionBackground(t) {}
  renderCache(t) {
    if (
      ((t = t || {}),
      (this._cacheCanvas && this._cacheContext) || this._createCacheCanvas(),
      this.isCacheDirty() && this._cacheContext)
    ) {
      const { zoomX: e, zoomY: s, cacheTranslationX: i, cacheTranslationY: r } = this,
        { width: n, height: a } = this._cacheCanvas
      this.drawObject(this._cacheContext, t.forClipping, {
        zoomX: e,
        zoomY: s,
        cacheTranslationX: i,
        cacheTranslationY: r,
        width: n,
        height: a,
        parentClipPaths: []
      }),
        (this.dirty = !1)
    }
  }
  _removeCacheCanvas() {
    ;(this._cacheCanvas = void 0), (this._cacheContext = null)
  }
  hasStroke() {
    return this.stroke && this.stroke !== 'transparent' && this.strokeWidth !== 0
  }
  hasFill() {
    return this.fill && this.fill !== 'transparent'
  }
  needsItsOwnCache() {
    return !!(this.paintFirst === nt && this.hasFill() && this.hasStroke() && this.shadow) || !!this.clipPath
  }
  shouldCache() {
    return (
      (this.ownCaching =
        this.needsItsOwnCache() || (this.objectCaching && (!this.parent || !this.parent.isOnACache()))),
      this.ownCaching
    )
  }
  willDrawShadow() {
    return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0)
  }
  drawClipPathOnCache(t, e, s) {
    t.save(),
      e.inverted ? (t.globalCompositeOperation = 'destination-out') : (t.globalCompositeOperation = 'destination-in'),
      t.setTransform(1, 0, 0, 1, 0, 0),
      t.drawImage(s, 0, 0),
      t.restore()
  }
  drawObject(t, e, s) {
    const i = this.fill,
      r = this.stroke
    e ? ((this.fill = 'black'), (this.stroke = ''), this._setClippingProperties(t)) : this._renderBackground(t),
      this._render(t),
      this._drawClipPath(t, this.clipPath, s),
      (this.fill = i),
      (this.stroke = r)
  }
  createClipPathLayer(t, e) {
    const s = _t(e),
      i = s.getContext('2d')
    if (
      (i.translate(e.cacheTranslationX, e.cacheTranslationY),
      i.scale(e.zoomX, e.zoomY),
      (t._cacheCanvas = s),
      e.parentClipPaths.forEach((r) => {
        r.transform(i)
      }),
      e.parentClipPaths.push(t),
      t.absolutePositioned)
    ) {
      const r = ht(this.calcTransformMatrix())
      i.transform(r[0], r[1], r[2], r[3], r[4], r[5])
    }
    return t.transform(i), t.drawObject(i, !0, e), s
  }
  _drawClipPath(t, e, s) {
    if (!e) return
    e._transformDone = !0
    const i = this.createClipPathLayer(e, s)
    this.drawClipPathOnCache(t, e, i)
  }
  drawCacheOnCanvas(t) {
    t.scale(1 / this.zoomX, 1 / this.zoomY),
      t.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY)
  }
  isCacheDirty() {
    let t = arguments.length > 0 && arguments[0] !== void 0 && arguments[0]
    if (this.isNotVisible()) return !1
    const e = this._cacheCanvas,
      s = this._cacheContext
    return (
      !(!e || !s || t || !this._updateCacheCanvas()) ||
      (!!(this.dirty || (this.clipPath && this.clipPath.absolutePositioned)) &&
        (e &&
          s &&
          !t &&
          (s.save(), s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, e.width, e.height), s.restore()),
        !0))
    )
  }
  _renderBackground(t) {
    if (!this.backgroundColor) return
    const e = this._getNonTransformedDimensions()
    ;(t.fillStyle = this.backgroundColor), t.fillRect(-e.x / 2, -e.y / 2, e.x, e.y), this._removeShadow(t)
  }
  _setOpacity(t) {
    this.group && !this.group._transformDone
      ? (t.globalAlpha = this.getObjectOpacity())
      : (t.globalAlpha *= this.opacity)
  }
  _setStrokeStyles(t, e) {
    const s = e.stroke
    s &&
      ((t.lineWidth = e.strokeWidth),
      (t.lineCap = e.strokeLineCap),
      (t.lineDashOffset = e.strokeDashOffset),
      (t.lineJoin = e.strokeLineJoin),
      (t.miterLimit = e.strokeMiterLimit),
      yt(s)
        ? s.gradientUnits === 'percentage' || s.gradientTransform || s.patternTransform
          ? this._applyPatternForTransformedGradient(t, s)
          : ((t.strokeStyle = s.toLive(t)), this._applyPatternGradientTransform(t, s))
        : (t.strokeStyle = e.stroke))
  }
  _setFillStyles(t, e) {
    let { fill: s } = e
    s && (yt(s) ? ((t.fillStyle = s.toLive(t)), this._applyPatternGradientTransform(t, s)) : (t.fillStyle = s))
  }
  _setClippingProperties(t) {
    ;(t.globalAlpha = 1), (t.strokeStyle = 'transparent'), (t.fillStyle = '#000000')
  }
  _setLineDash(t, e) {
    e && e.length !== 0 && t.setLineDash(e)
  }
  _setShadow(t) {
    if (!this.shadow) return
    const e = this.shadow,
      s = this.canvas,
      i = this.getCanvasRetinaScaling(),
      [r, , , n] = s?.viewportTransform || $,
      a = r * i,
      h = n * i,
      c = e.nonScaling ? new y(1, 1) : this.getObjectScaling()
    ;(t.shadowColor = e.color),
      (t.shadowBlur = (e.blur * E.browserShadowBlurConstant * (a + h) * (c.x + c.y)) / 4),
      (t.shadowOffsetX = e.offsetX * a * c.x),
      (t.shadowOffsetY = e.offsetY * h * c.y)
  }
  _removeShadow(t) {
    this.shadow && ((t.shadowColor = ''), (t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0))
  }
  _applyPatternGradientTransform(t, e) {
    if (!yt(e))
      return {
        offsetX: 0,
        offsetY: 0
      }
    const s = e.gradientTransform || e.patternTransform,
      i = -this.width / 2 + e.offsetX || 0,
      r = -this.height / 2 + e.offsetY || 0
    return (
      e.gradientUnits === 'percentage'
        ? t.transform(this.width, 0, 0, this.height, i, r)
        : t.transform(1, 0, 0, 1, i, r),
      s && t.transform(s[0], s[1], s[2], s[3], s[4], s[5]),
      {
        offsetX: i,
        offsetY: r
      }
    )
  }
  _renderPaintInOrder(t) {
    this.paintFirst === nt ? (this._renderStroke(t), this._renderFill(t)) : (this._renderFill(t), this._renderStroke(t))
  }
  _render(t) {}
  _renderFill(t) {
    this.fill &&
      (t.save(), this._setFillStyles(t, this), this.fillRule === 'evenodd' ? t.fill('evenodd') : t.fill(), t.restore())
  }
  _renderStroke(t) {
    if (this.stroke && this.strokeWidth !== 0) {
      if ((this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this.strokeUniform)) {
        const e = this.getObjectScaling()
        t.scale(1 / e.x, 1 / e.y)
      }
      this._setLineDash(t, this.strokeDashArray), this._setStrokeStyles(t, this), t.stroke(), t.restore()
    }
  }
  _applyPatternForTransformedGradient(t, e) {
    var s
    const i = this._limitCacheSize(this._getCacheCanvasDimensions()),
      r = this.getCanvasRetinaScaling(),
      n = i.x / this.scaleX / r,
      a = i.y / this.scaleY / r,
      h = _t({
        width: Math.ceil(n),
        height: Math.ceil(a)
      }),
      c = h.getContext('2d')
    c &&
      (c.beginPath(),
      c.moveTo(0, 0),
      c.lineTo(n, 0),
      c.lineTo(n, a),
      c.lineTo(0, a),
      c.closePath(),
      c.translate(n / 2, a / 2),
      c.scale(i.zoomX / this.scaleX / r, i.zoomY / this.scaleY / r),
      this._applyPatternGradientTransform(c, e),
      (c.fillStyle = e.toLive(t)),
      c.fill(),
      t.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2),
      t.scale((r * this.scaleX) / i.zoomX, (r * this.scaleY) / i.zoomY),
      (t.strokeStyle = (s = c.createPattern(h, 'no-repeat')) !== null && s !== void 0 ? s : ''))
  }
  _findCenterFromElement() {
    return new y(this.left + this.width / 2, this.top + this.height / 2)
  }
  clone(t) {
    const e = this.toObject(t)
    return this.constructor.fromObject(e)
  }
  cloneAsImage(t) {
    const e = this.toCanvasElement(t)
    return new (w.getClass('image'))(e)
  }
  toCanvasElement() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    const e = sr(this),
      s = this.group,
      i = this.shadow,
      r = Math.abs,
      n = t.enableRetinaScaling ? Zr() : 1,
      a = (t.multiplier || 1) * n,
      h =
        t.canvasProvider ||
        ((C) =>
          new Fe(C, {
            enableRetinaScaling: !1,
            renderOnAddRemove: !1,
            skipOffscreen: !1
          }))
    delete this.group,
      t.withoutTransform && vn(this),
      t.withoutShadow && (this.shadow = null),
      t.viewportTransform && Oi(this, this.getViewportTransform()),
      this.setCoords()
    const c = lt(),
      l = this.getBoundingRect(),
      u = this.shadow,
      g = new y()
    if (u) {
      const C = u.blur,
        b = u.nonScaling ? new y(1, 1) : this.getObjectScaling()
      ;(g.x = 2 * Math.round(r(u.offsetX) + C) * r(b.x)), (g.y = 2 * Math.round(r(u.offsetY) + C) * r(b.y))
    }
    const d = l.width + g.x,
      p = l.height + g.y
    ;(c.width = Math.ceil(d)), (c.height = Math.ceil(p))
    const v = h(c)
    t.format === 'jpeg' && (v.backgroundColor = '#fff'),
      this.setPositionByOrigin(new y(v.width / 2, v.height / 2), k, k)
    const _ = this.canvas
    ;(v._objects = [this]), this.set('canvas', v), this.setCoords()
    const x = v.toCanvasElement(a || 1, t)
    return (
      this.set('canvas', _),
      (this.shadow = i),
      s && (this.group = s),
      this.set(e),
      this.setCoords(),
      (v._objects = []),
      v.destroy(),
      x
    )
  }
  toDataURL() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    return Ji(this.toCanvasElement(t), t.format || 'png', t.quality || 1)
  }
  isType() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s]
    return e.includes(this.constructor.type) || e.includes(this.type)
  }
  complexity() {
    return 1
  }
  toJSON() {
    return this.toObject()
  }
  rotate(t) {
    const { centeredRotation: e, originX: s, originY: i } = this
    if (e) {
      const { x: r, y: n } = this.getRelativeCenterPoint()
      ;(this.originX = k), (this.originY = k), (this.left = r), (this.top = n)
    }
    if ((this.set('angle', t), e)) {
      const { x: r, y: n } = this.translateToOriginPoint(this.getRelativeCenterPoint(), s, i)
      ;(this.left = r), (this.top = n), (this.originX = s), (this.originY = i)
    }
  }
  setOnGroup() {}
  _setupCompositeOperation(t) {
    this.globalCompositeOperation && (t.globalCompositeOperation = this.globalCompositeOperation)
  }
  dispose() {
    hs.cancelByTarget(this),
      this.off(),
      this._set('canvas', void 0),
      this._cacheCanvas && Ot().dispose(this._cacheCanvas),
      (this._cacheCanvas = void 0),
      (this._cacheContext = null)
  }
  animate(t, e) {
    return Object.entries(t).reduce((s, i) => {
      let [r, n] = i
      return (s[r] = this._animate(r, n, e)), s
    }, {})
  }
  _animate(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const i = t.split('.'),
      r = this.constructor.colorProperties.includes(i[i.length - 1]),
      { abort: n, startValue: a, onChange: h, onComplete: c } = s,
      l = m(
        m({}, s),
        {},
        {
          target: this,
          startValue: a ?? i.reduce((u, g) => u[g], this),
          endValue: e,
          abort: n?.bind(this),
          onChange: (u, g, d) => {
            i.reduce((p, v, _) => (_ === i.length - 1 && (p[v] = u), p[v]), this), h && h(u, g, d)
          },
          onComplete: (u, g, d) => {
            this.setCoords(), c && c(u, g, d)
          }
        }
      )
    return r ? kn(l) : hr(l)
  }
  isDescendantOf(t) {
    const { parent: e, group: s } = this
    return e === t || s === t || (!!e && e.isDescendantOf(t)) || (!!s && s !== e && s.isDescendantOf(t))
  }
  getAncestors() {
    const t = []
    let e = this
    do (e = e.parent), e && t.push(e)
    while (e)
    return t
  }
  findCommonAncestors(t) {
    if (this === t)
      return {
        fork: [],
        otherFork: [],
        common: [this, ...this.getAncestors()]
      }
    const e = this.getAncestors(),
      s = t.getAncestors()
    if (e.length === 0 && s.length > 0 && this === s[s.length - 1])
      return {
        fork: [],
        otherFork: [t, ...s.slice(0, s.length - 1)],
        common: [this]
      }
    for (let i, r = 0; r < e.length; r++) {
      if (((i = e[r]), i === t))
        return {
          fork: [this, ...e.slice(0, r)],
          otherFork: [],
          common: e.slice(r)
        }
      for (let n = 0; n < s.length; n++) {
        if (this === s[n])
          return {
            fork: [],
            otherFork: [t, ...s.slice(0, n)],
            common: [this, ...e]
          }
        if (i === s[n])
          return {
            fork: [this, ...e.slice(0, r)],
            otherFork: [t, ...s.slice(0, n)],
            common: e.slice(r)
          }
      }
    }
    return {
      fork: [this, ...e],
      otherFork: [t, ...s],
      common: []
    }
  }
  hasCommonAncestors(t) {
    const e = this.findCommonAncestors(t)
    return e && !!e.common.length
  }
  isInFrontOf(t) {
    if (this === t) return
    const e = this.findCommonAncestors(t)
    if (e.fork.includes(t)) return !0
    if (e.otherFork.includes(this)) return !1
    const s = e.common[0] || this.canvas
    if (!s) return
    const i = e.fork.pop(),
      r = e.otherFork.pop(),
      n = s._objects.indexOf(i),
      a = s._objects.indexOf(r)
    return n > -1 && n > a
  }
  toObject() {
    const t = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).concat(
      Ms.customProperties,
      this.constructor.customProperties || []
    )
    let e
    const s = E.NUM_FRACTION_DIGITS,
      {
        clipPath: i,
        fill: r,
        stroke: n,
        shadow: a,
        strokeDashArray: h,
        left: c,
        top: l,
        originX: u,
        originY: g,
        width: d,
        height: p,
        strokeWidth: v,
        strokeLineCap: _,
        strokeDashOffset: x,
        strokeLineJoin: C,
        strokeUniform: b,
        strokeMiterLimit: S,
        scaleX: T,
        scaleY: D,
        angle: P,
        flipX: O,
        flipY: M,
        opacity: A,
        visible: B,
        backgroundColor: R,
        fillRule: F,
        paintFirst: I,
        globalCompositeOperation: tt,
        skewX: Q,
        skewY: xt
      } = this
    i && !i.excludeFromExport && (e = i.toObject(t.concat('inverted', 'absolutePositioned')))
    const G = (Bt) => Y(Bt, s),
      Mt = m(
        m({}, pe(this, t)),
        {},
        {
          type: this.constructor.type,
          version: Fs,
          originX: u,
          originY: g,
          left: G(c),
          top: G(l),
          width: G(d),
          height: G(p),
          fill: Sr(r) ? r.toObject() : r,
          stroke: Sr(n) ? n.toObject() : n,
          strokeWidth: G(v),
          strokeDashArray: h && h.concat(),
          strokeLineCap: _,
          strokeDashOffset: x,
          strokeLineJoin: C,
          strokeUniform: b,
          strokeMiterLimit: G(S),
          scaleX: G(T),
          scaleY: G(D),
          angle: G(P),
          flipX: O,
          flipY: M,
          opacity: G(A),
          shadow: a && a.toObject(),
          visible: B,
          backgroundColor: R,
          fillRule: F,
          paintFirst: I,
          globalCompositeOperation: tt,
          skewX: G(Q),
          skewY: G(xt)
        },
        e
          ? {
              clipPath: e
            }
          : null
      )
    return this.includeDefaultValues ? Mt : this._removeDefaultValues(Mt)
  }
  toDatalessObject(t) {
    return this.toObject(t)
  }
  _removeDefaultValues(t) {
    const e = this.constructor.getDefaults(),
      s = Object.keys(e).length > 0 ? e : Object.getPrototypeOf(this)
    return $i(t, (i, r) => {
      if (r === L || r === ct || r === 'type') return !0
      const n = s[r]
      return i !== n && !(Array.isArray(i) && Array.isArray(n) && i.length === 0 && n.length === 0)
    })
  }
  toString() {
    return '#<'.concat(this.constructor.type, '>')
  }
  static _fromObject(t) {
    let e = W(t, da),
      s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      { extraParam: i } = s,
      r = W(s, fa)
    return ps(e, r).then((n) => (i ? (delete n[i], new this(e[i], n)) : new this(n)))
  }
  static fromObject(t, e) {
    return this._fromObject(t, e)
  }
}
f(Pt, 'stateProperties', ea),
  f(Pt, 'cacheProperties', zt),
  f(Pt, 'ownDefaults', sa),
  f(Pt, 'type', 'FabricObject'),
  f(Pt, 'colorProperties', [U, nt, 'backgroundColor']),
  f(Pt, 'customProperties', []),
  w.setClass(Pt),
  w.setClass(Pt, 'object')
const ie = (o, t, e) => (s, i, r, n) => {
  const a = t(s, i, r, n)
  return a && ir(o, m(m({}, rr(s, i, r, n)), e)), a
}
function me(o) {
  return (t, e, s, i) => {
    const { target: r, originX: n, originY: a } = e,
      h = r.getRelativeCenterPoint(),
      c = r.translateToOriginPoint(h, n, a),
      l = o(t, e, s, i)
    return r.setPositionByOrigin(c, e.originX, e.originY), l
  }
}
const Pi = ie(
  as,
  me((o, t, e, s) => {
    const i = ti(t, t.originX, t.originY, e, s)
    if (N(t.originX) === N(k) || (N(t.originX) === N(H) && i.x < 0) || (N(t.originX) === N(L) && i.x > 0)) {
      const { target: r } = t,
        n = r.strokeWidth / (r.strokeUniform ? r.scaleX : 1),
        a = _n(t) ? 2 : 1,
        h = r.width,
        c = Math.abs((i.x * a) / r.scaleX) - n
      return r.set('width', Math.max(c, 1)), h !== r.width
    }
    return !1
  })
)
function Dn(o, t, e, s, i) {
  s = s || {}
  const r = this.sizeX || s.cornerSize || i.cornerSize,
    n = this.sizeY || s.cornerSize || i.cornerSize,
    a = s.transparentCorners !== void 0 ? s.transparentCorners : i.transparentCorners,
    h = a ? nt : U,
    c = !a && (s.cornerStrokeColor || i.cornerStrokeColor)
  let l,
    u = t,
    g = e
  o.save(),
    (o.fillStyle = s.cornerColor || i.cornerColor || ''),
    (o.strokeStyle = s.cornerStrokeColor || i.cornerStrokeColor || ''),
    r > n
      ? ((l = r), o.scale(1, n / r), (g = (e * r) / n))
      : n > r
      ? ((l = n), o.scale(r / n, 1), (u = (t * n) / r))
      : (l = r),
    o.beginPath(),
    o.arc(u, g, l / 2, 0, Gt, !1),
    o[h](),
    c && o.stroke(),
    o.restore()
}
function Mn(o, t, e, s, i) {
  s = s || {}
  const r = this.sizeX || s.cornerSize || i.cornerSize,
    n = this.sizeY || s.cornerSize || i.cornerSize,
    a = s.transparentCorners !== void 0 ? s.transparentCorners : i.transparentCorners,
    h = a ? nt : U,
    c = !a && (s.cornerStrokeColor || i.cornerStrokeColor),
    l = r / 2,
    u = n / 2
  o.save(),
    (o.fillStyle = s.cornerColor || i.cornerColor || ''),
    (o.strokeStyle = s.cornerStrokeColor || i.cornerStrokeColor || ''),
    o.translate(t, e)
  const g = i.getTotalAngle()
  o.rotate(z(g)), o[''.concat(h, 'Rect')](-l, -u, r, n), c && o.strokeRect(-l, -u, r, n), o.restore()
}
class at {
  constructor(t) {
    f(this, 'visible', !0),
      f(this, 'actionName', Js),
      f(this, 'angle', 0),
      f(this, 'x', 0),
      f(this, 'y', 0),
      f(this, 'offsetX', 0),
      f(this, 'offsetY', 0),
      f(this, 'sizeX', 0),
      f(this, 'sizeY', 0),
      f(this, 'touchSizeX', 0),
      f(this, 'touchSizeY', 0),
      f(this, 'cursorStyle', 'crosshair'),
      f(this, 'withConnection', !1),
      Object.assign(this, t)
  }
  shouldActivate(t, e, s, i) {
    var r
    let { tl: n, tr: a, br: h, bl: c } = i
    return (
      ((r = e.canvas) === null || r === void 0 ? void 0 : r.getActiveObject()) === e &&
      e.isControlVisible(t) &&
      X.isPointInPolygon(s, [n, a, h, c])
    )
  }
  getActionHandler(t, e, s) {
    return this.actionHandler
  }
  getMouseDownHandler(t, e, s) {
    return this.mouseDownHandler
  }
  getMouseUpHandler(t, e, s) {
    return this.mouseUpHandler
  }
  cursorStyleHandler(t, e, s) {
    return e.cursorStyle
  }
  getActionName(t, e, s) {
    return e.actionName
  }
  getVisibility(t, e) {
    var s, i
    return (s = (i = t._controlsVisibility) === null || i === void 0 ? void 0 : i[e]) !== null && s !== void 0
      ? s
      : this.visible
  }
  setVisibility(t, e, s) {
    this.visible = t
  }
  positionHandler(t, e, s, i) {
    return new y(this.x * t.x + this.offsetX, this.y * t.y + this.offsetY).transform(e)
  }
  calcCornerCoords(t, e, s, i, r, n) {
    const a = Qs([
      Ae(s, i),
      je({
        angle: t
      }),
      Zs((r ? this.touchSizeX : this.sizeX) || e, (r ? this.touchSizeY : this.sizeY) || e)
    ])
    return {
      tl: new y(-0.5, -0.5).transform(a),
      tr: new y(0.5, -0.5).transform(a),
      br: new y(0.5, 0.5).transform(a),
      bl: new y(-0.5, 0.5).transform(a)
    }
  }
  render(t, e, s, i, r) {
    ;((i = i || {}).cornerStyle || r.cornerStyle) === 'circle'
      ? Dn.call(this, t, e, s, i, r)
      : Mn.call(this, t, e, s, i, r)
  }
}
const Pn = (o, t, e) => (e.lockRotation ? Bs : t.cursorStyle),
  En = ie(
    tn,
    me((o, t, e, s) => {
      let { target: i, ex: r, ey: n, theta: a, originX: h, originY: c } = t
      const l = i.translateToOriginPoint(i.getRelativeCenterPoint(), h, c)
      if (Tt(i, 'lockRotation')) return !1
      const u = Math.atan2(n - l.y, r - l.x),
        g = Math.atan2(s - l.y, e - l.x)
      let d = ee(g - u + a)
      if (i.snapAngle && i.snapAngle > 0) {
        const v = i.snapAngle,
          _ = i.snapThreshold || v,
          x = Math.ceil(d / v) * v,
          C = Math.floor(d / v) * v
        Math.abs(d - C) < _ ? (d = C) : Math.abs(d - x) < _ && (d = x)
      }
      d < 0 && (d = 360 + d), (d %= 360)
      const p = i.angle !== d
      return (i.angle = d), p
    })
  )
function An(o, t) {
  const e = t.canvas,
    s = o[e.uniScaleKey]
  return (e.uniformScaling && !s) || (!e.uniformScaling && s)
}
function jn(o, t, e) {
  const s = Tt(o, 'lockScalingX'),
    i = Tt(o, 'lockScalingY')
  if ((s && i) || (!t && (s || i) && e) || (s && t === 'x') || (i && t === 'y')) return !0
  const { width: r, height: n, strokeWidth: a } = o
  return (r === 0 && a === 0 && t !== 'y') || (n === 0 && a === 0 && t !== 'x')
}
const pa = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne', 'e'],
  xe = (o, t, e) => {
    const s = An(o, e)
    if (jn(e, t.x !== 0 && t.y === 0 ? 'x' : t.x === 0 && t.y !== 0 ? 'y' : '', s)) return Bs
    const i = xn(e, t)
    return ''.concat(pa[i], '-resize')
  }
function cr(o, t, e, s) {
  let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {}
  const r = t.target,
    n = i.by,
    a = An(o, r)
  let h, c, l, u, g, d
  if (jn(r, n, a)) return !1
  if (t.gestureScale) (c = t.scaleX * t.gestureScale), (l = t.scaleY * t.gestureScale)
  else {
    if (
      ((h = ti(t, t.originX, t.originY, e, s)),
      (g = n !== 'y' ? Math.sign(h.x || t.signX || 1) : 1),
      (d = n !== 'x' ? Math.sign(h.y || t.signY || 1) : 1),
      t.signX || (t.signX = g),
      t.signY || (t.signY = d),
      Tt(r, 'lockScalingFlip') && (t.signX !== g || t.signY !== d))
    )
      return !1
    if (((u = r._getTransformedDimensions()), a && !n)) {
      const _ = Math.abs(h.x) + Math.abs(h.y),
        { original: x } = t,
        C = _ / (Math.abs((u.x * x.scaleX) / r.scaleX) + Math.abs((u.y * x.scaleY) / r.scaleY))
      ;(c = x.scaleX * C), (l = x.scaleY * C)
    } else (c = Math.abs((h.x * r.scaleX) / u.x)), (l = Math.abs((h.y * r.scaleY) / u.y))
    _n(t) && ((c *= 2), (l *= 2)),
      t.signX !== g && n !== 'y' && ((t.originX = kr(t.originX)), (c *= -1), (t.signX = g)),
      t.signY !== d && n !== 'x' && ((t.originY = kr(t.originY)), (l *= -1), (t.signY = d))
  }
  const p = r.scaleX,
    v = r.scaleY
  return (
    n
      ? (n === 'x' && r.set(ot, c), n === 'y' && r.set(ft, l))
      : (!Tt(r, 'lockScalingX') && r.set(ot, c), !Tt(r, 'lockScalingY') && r.set(ft, l)),
    p !== r.scaleX || v !== r.scaleY
  )
}
const Be = ie(
    Ks,
    me((o, t, e, s) => cr(o, t, e, s))
  ),
  Fn = ie(
    Ks,
    me((o, t, e, s) =>
      cr(o, t, e, s, {
        by: 'x'
      })
    )
  ),
  Ln = ie(
    Ks,
    me((o, t, e, s) =>
      cr(o, t, e, s, {
        by: 'y'
      })
    )
  ),
  ma = ['target', 'ex', 'ey', 'skewingSide'],
  mi = {
    x: {
      counterAxis: 'y',
      scale: ot,
      skew: Pe,
      lockSkewing: 'lockSkewingX',
      origin: 'originX',
      flip: 'flipX'
    },
    y: {
      counterAxis: 'x',
      scale: ft,
      skew: Ee,
      lockSkewing: 'lockSkewingY',
      origin: 'originY',
      flip: 'flipY'
    }
  },
  va = ['ns', 'nesw', 'ew', 'nwse'],
  Rn = (o, t, e) => {
    if ((t.x !== 0 && Tt(e, 'lockSkewingY')) || (t.y !== 0 && Tt(e, 'lockSkewingX'))) return Bs
    const s = xn(e, t) % 4
    return ''.concat(va[s], '-resize')
  }
function In(o, t, e, s, i) {
  const { target: r } = e,
    { counterAxis: n, origin: a, lockSkewing: h, skew: c, flip: l } = mi[o]
  if (Tt(r, h)) return !1
  const { origin: u, flip: g } = mi[n],
    d = N(e[u]) * (r[g] ? -1 : 1),
    p = -Math.sign(d) * (r[l] ? -1 : 1),
    v = 0.5 * -(((r[c] === 0 && ti(e, k, k, s, i)[o] > 0) || r[c] > 0 ? 1 : -1) * p) + 0.5
  return ie(
    en,
    me((x, C, b, S) =>
      (function (T, D, P) {
        let { target: O, ex: M, ey: A, skewingSide: B } = D,
          R = W(D, ma)
        const { skew: F } = mi[T],
          I = P.subtract(new y(M, A)).divide(new y(O.scaleX, O.scaleY))[T],
          tt = O[F],
          Q = R[F],
          xt = Math.tan(z(Q)),
          G =
            T === 'y'
              ? O._getTransformedDimensions({
                  scaleX: 1,
                  scaleY: 1,
                  skewX: 0
                }).x
              : O._getTransformedDimensions({
                  scaleX: 1,
                  scaleY: 1
                }).y,
          Mt = (2 * I * B) / Math.max(G, 1) + xt,
          Bt = ee(Math.atan(Mt))
        O.set(F, Bt)
        const _s = tt !== O[F]
        if (_s && T === 'y') {
          const { skewX: hi, scaleX: Le } = O,
            Ht = O._getTransformedDimensions({
              skewY: tt
            }),
            xs = O._getTransformedDimensions(),
            ne = hi !== 0 ? Ht.x / xs.x : 1
          ne !== 1 && O.set(ot, ne * Le)
        }
        return _s
      })(o, C, new y(b, S))
    )
  )(
    t,
    m(
      m({}, e),
      {},
      {
        [a]: v,
        skewingSide: p
      }
    ),
    s,
    i
  )
}
const Bn = (o, t, e, s) => In('x', o, t, e, s),
  Xn = (o, t, e, s) => In('y', o, t, e, s)
function ii(o, t) {
  return o[t.canvas.altActionKey]
}
const Xe = (o, t, e) => {
    const s = ii(o, e)
    return t.x === 0 ? (s ? Pe : ft) : t.y === 0 ? (s ? Ee : ot) : ''
  },
  he = (o, t, e) => (ii(o, e) ? Rn(0, t, e) : xe(o, t, e)),
  Ei = (o, t, e, s) => (ii(o, t.target) ? Xn(o, t, e, s) : Fn(o, t, e, s)),
  Ai = (o, t, e, s) => (ii(o, t.target) ? Bn(o, t, e, s) : Ln(o, t, e, s)),
  lr = () => ({
    ml: new at({
      x: -0.5,
      y: 0,
      cursorStyleHandler: he,
      actionHandler: Ei,
      getActionName: Xe
    }),
    mr: new at({
      x: 0.5,
      y: 0,
      cursorStyleHandler: he,
      actionHandler: Ei,
      getActionName: Xe
    }),
    mb: new at({
      x: 0,
      y: 0.5,
      cursorStyleHandler: he,
      actionHandler: Ai,
      getActionName: Xe
    }),
    mt: new at({
      x: 0,
      y: -0.5,
      cursorStyleHandler: he,
      actionHandler: Ai,
      getActionName: Xe
    }),
    tl: new at({
      x: -0.5,
      y: -0.5,
      cursorStyleHandler: xe,
      actionHandler: Be
    }),
    tr: new at({
      x: 0.5,
      y: -0.5,
      cursorStyleHandler: xe,
      actionHandler: Be
    }),
    bl: new at({
      x: -0.5,
      y: 0.5,
      cursorStyleHandler: xe,
      actionHandler: Be
    }),
    br: new at({
      x: 0.5,
      y: 0.5,
      cursorStyleHandler: xe,
      actionHandler: Be
    }),
    mtr: new at({
      x: 0,
      y: -0.5,
      actionHandler: En,
      cursorStyleHandler: Pn,
      offsetY: -40,
      withConnection: !0,
      actionName: Ui
    })
  }),
  Yn = () => ({
    mr: new at({
      x: 0.5,
      y: 0,
      actionHandler: Pi,
      cursorStyleHandler: he,
      actionName: as
    }),
    ml: new at({
      x: -0.5,
      y: 0,
      actionHandler: Pi,
      cursorStyleHandler: he,
      actionName: as
    })
  }),
  Wn = () => m(m({}, lr()), Yn())
class De extends Pt {
  static getDefaults() {
    return m(m({}, super.getDefaults()), De.ownDefaults)
  }
  constructor(t) {
    super(), Object.assign(this, this.constructor.createControls(), De.ownDefaults), this.setOptions(t)
  }
  static createControls() {
    return {
      controls: lr()
    }
  }
  _updateCacheCanvas() {
    const t = this.canvas
    if (this.noScaleCache && t && t._currentTransform) {
      const e = t._currentTransform,
        s = e.target,
        i = e.action
      if (this === s && i && i.startsWith(Js)) return !1
    }
    return super._updateCacheCanvas()
  }
  getActiveControl() {
    const t = this.__corner
    return t
      ? {
          key: t,
          control: this.controls[t],
          coord: this.oCoords[t]
        }
      : void 0
  }
  findControl(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1]
    if (!this.hasControls || !this.canvas) return
    this.__corner = void 0
    const s = Object.entries(this.oCoords)
    for (let i = s.length - 1; i >= 0; i--) {
      const [r, n] = s[i],
        a = this.controls[r]
      if (a.shouldActivate(r, this, t, e ? n.touchCorner : n.corner))
        return (
          (this.__corner = r),
          {
            key: r,
            control: a,
            coord: this.oCoords[r]
          }
        )
    }
  }
  calcOCoords() {
    const t = this.getViewportTransform(),
      e = this.getCenterPoint(),
      s = Ae(e.x, e.y),
      i = je({
        angle: this.getTotalAngle() - (this.group && this.flipX ? 180 : 0)
      }),
      r = V(s, i),
      n = V(t, r),
      a = V(n, [1 / t[0], 0, 0, 1 / t[3], 0, 0]),
      h = this.group ? ge(this.calcTransformMatrix()) : void 0
    h && ((h.scaleX = Math.abs(h.scaleX)), (h.scaleY = Math.abs(h.scaleY)))
    const c = this._calculateCurrentDimensions(h),
      l = {}
    return (
      this.forEachControl((u, g) => {
        const d = u.positionHandler(c, a, this, u)
        l[g] = Object.assign(d, this._calcCornerCoords(u, d))
      }),
      l
    )
  }
  _calcCornerCoords(t, e) {
    const s = this.getTotalAngle()
    return {
      corner: t.calcCornerCoords(s, this.cornerSize, e.x, e.y, !1, this),
      touchCorner: t.calcCornerCoords(s, this.touchCornerSize, e.x, e.y, !0, this)
    }
  }
  setCoords() {
    super.setCoords(), this.canvas && (this.oCoords = this.calcOCoords())
  }
  forEachControl(t) {
    for (const e in this.controls) t(this.controls[e], e, this)
  }
  drawSelectionBackground(t) {
    if (!this.selectionBackgroundColor || (this.canvas && this.canvas._activeObject !== this)) return
    t.save()
    const e = this.getRelativeCenterPoint(),
      s = this._calculateCurrentDimensions(),
      i = this.getViewportTransform()
    t.translate(e.x, e.y),
      t.scale(1 / i[0], 1 / i[3]),
      t.rotate(z(this.angle)),
      (t.fillStyle = this.selectionBackgroundColor),
      t.fillRect(-s.x / 2, -s.y / 2, s.x, s.y),
      t.restore()
  }
  strokeBorders(t, e) {
    t.strokeRect(-e.x / 2, -e.y / 2, e.x, e.y)
  }
  _drawBorders(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const i = m(
      {
        hasControls: this.hasControls,
        borderColor: this.borderColor,
        borderDashArray: this.borderDashArray
      },
      s
    )
    t.save(),
      (t.strokeStyle = i.borderColor),
      this._setLineDash(t, i.borderDashArray),
      this.strokeBorders(t, e),
      i.hasControls && this.drawControlsConnectingLines(t, e),
      t.restore()
  }
  _renderControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const { hasBorders: s, hasControls: i } = this,
      r = m(
        {
          hasBorders: s,
          hasControls: i
        },
        e
      ),
      n = this.getViewportTransform(),
      a = r.hasBorders,
      h = r.hasControls,
      c = V(n, this.calcTransformMatrix()),
      l = ge(c)
    t.save(),
      t.translate(l.translateX, l.translateY),
      (t.lineWidth = this.borderScaleFactor),
      this.group === this.parent && (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1),
      this.flipX && (l.angle -= 180),
      t.rotate(z(this.group ? l.angle : this.angle)),
      a && this.drawBorders(t, l, e),
      h && this.drawControls(t, e),
      t.restore()
  }
  drawBorders(t, e, s) {
    let i
    if ((s && s.forActiveSelection) || this.group) {
      const r = $s(this.width, this.height, fs(e)),
        n = this.isStrokeAccountedForInDimensions()
          ? qi
          : (this.strokeUniform
              ? new y().scalarAdd(this.canvas ? this.canvas.getZoom() : 1)
              : new y(e.scaleX, e.scaleY)
            ).scalarMultiply(this.strokeWidth)
      i = r
        .add(n)
        .scalarAdd(this.borderScaleFactor)
        .scalarAdd(2 * this.padding)
    } else i = this._calculateCurrentDimensions().scalarAdd(this.borderScaleFactor)
    this._drawBorders(t, i, s)
  }
  drawControlsConnectingLines(t, e) {
    let s = !1
    t.beginPath(),
      this.forEachControl((i, r) => {
        i.withConnection &&
          i.getVisibility(this, r) &&
          ((s = !0), t.moveTo(i.x * e.x, i.y * e.y), t.lineTo(i.x * e.x + i.offsetX, i.y * e.y + i.offsetY))
      }),
      s && t.stroke()
  }
  drawControls(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    t.save()
    const s = this.getCanvasRetinaScaling(),
      { cornerStrokeColor: i, cornerDashArray: r, cornerColor: n } = this,
      a = m(
        {
          cornerStrokeColor: i,
          cornerDashArray: r,
          cornerColor: n
        },
        e
      )
    t.setTransform(s, 0, 0, s, 0, 0),
      (t.strokeStyle = t.fillStyle = a.cornerColor),
      this.transparentCorners || (t.strokeStyle = a.cornerStrokeColor),
      this._setLineDash(t, a.cornerDashArray),
      this.forEachControl((h, c) => {
        if (h.getVisibility(this, c)) {
          const l = this.oCoords[c]
          h.render(t, l.x, l.y, a, this)
        }
      }),
      t.restore()
  }
  isControlVisible(t) {
    return this.controls[t] && this.controls[t].getVisibility(this, t)
  }
  setControlVisible(t, e) {
    this._controlsVisibility || (this._controlsVisibility = {}), (this._controlsVisibility[t] = e)
  }
  setControlsVisibility() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    Object.entries(t).forEach((e) => {
      let [s, i] = e
      return this.setControlVisible(s, i)
    })
  }
  clearContextTop(t) {
    if (!this.canvas) return
    const e = this.canvas.contextTop
    if (!e) return
    const s = this.canvas.viewportTransform
    e.save(), e.transform(s[0], s[1], s[2], s[3], s[4], s[5]), this.transform(e)
    const i = this.width + 4,
      r = this.height + 4
    return e.clearRect(-i / 2, -r / 2, i, r), t || e.restore(), e
  }
  onDeselect(t) {
    return !1
  }
  onSelect(t) {
    return !1
  }
  shouldStartDragging(t) {
    return !1
  }
  onDragStart(t) {
    return !1
  }
  canDrop(t) {
    return !1
  }
  renderDragSourceEffect(t) {}
  renderDropTargetEffect(t) {}
}
function Vn(o, t) {
  return (
    t.forEach((e) => {
      Object.getOwnPropertyNames(e.prototype).forEach((s) => {
        s !== 'constructor' &&
          Object.defineProperty(o.prototype, s, Object.getOwnPropertyDescriptor(e.prototype, s) || Object.create(null))
      })
    }),
    o
  )
}
f(De, 'ownDefaults', {
  noScaleCache: !0,
  lockMovementX: !1,
  lockMovementY: !1,
  lockRotation: !1,
  lockScalingX: !1,
  lockScalingY: !1,
  lockSkewingX: !1,
  lockSkewingY: !1,
  lockScalingFlip: !1,
  cornerSize: 13,
  touchCornerSize: 24,
  transparentCorners: !0,
  cornerColor: 'rgb(178,204,255)',
  cornerStrokeColor: '',
  cornerStyle: 'rect',
  cornerDashArray: null,
  hasControls: !0,
  borderColor: 'rgb(178,204,255)',
  borderDashArray: null,
  borderOpacityWhenMoving: 0.4,
  borderScaleFactor: 1,
  hasBorders: !0,
  selectionBackgroundColor: '',
  selectable: !0,
  evented: !0,
  perPixelTargetFind: !1,
  activeOn: 'down',
  hoverCursor: null,
  moveCursor: null
})
class K extends De {}
Vn(K, [bn]), w.setClass(K), w.setClass(K, 'object')
const Gn = (o, t, e, s) => {
  const i = 2 * (s = Math.round(s)) + 1,
    { data: r } = o.getImageData(t - s, e - s, i, i)
  for (let n = 3; n < r.length; n += 4) if (r[n] > 0) return !1
  return !0
}
class zn {
  constructor(t) {
    ;(this.options = t),
      (this.strokeProjectionMagnitude = this.options.strokeWidth / 2),
      (this.scale = new y(this.options.scaleX, this.options.scaleY)),
      (this.strokeUniformScalar = this.options.strokeUniform
        ? new y(1 / this.options.scaleX, 1 / this.options.scaleY)
        : new y(1, 1))
  }
  createSideVector(t, e) {
    const s = Xs(t, e)
    return this.options.strokeUniform ? s.multiply(this.scale) : s
  }
  projectOrthogonally(t, e, s) {
    return this.applySkew(t.add(this.calcOrthogonalProjection(t, e, s)))
  }
  isSkewed() {
    return this.options.skewX !== 0 || this.options.skewY !== 0
  }
  applySkew(t) {
    const e = new y(t)
    return (e.y += e.x * Math.tan(z(this.options.skewY))), (e.x += e.y * Math.tan(z(this.options.skewX))), e
  }
  scaleUnitVector(t, e) {
    return t.multiply(this.strokeUniformScalar).scalarMultiply(e)
  }
}
const ya = new y()
class Te extends zn {
  static getOrthogonalRotationFactor(t, e) {
    const s = e ? Ws(t, e) : Sn(t)
    return Math.abs(s) < $t ? -1 : 1
  }
  constructor(t, e, s, i) {
    super(i),
      f(this, 'AB', void 0),
      f(this, 'AC', void 0),
      f(this, 'alpha', void 0),
      f(this, 'bisector', void 0),
      (this.A = new y(t)),
      (this.B = new y(e)),
      (this.C = new y(s)),
      (this.AB = this.createSideVector(this.A, this.B)),
      (this.AC = this.createSideVector(this.A, this.C)),
      (this.alpha = Ws(this.AB, this.AC)),
      (this.bisector = si(nr(this.AB.eq(ya) ? this.AC : this.AB, this.alpha / 2)))
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude
    const i = this.createSideVector(t, e),
      r = or(i),
      n = Te.getOrthogonalRotationFactor(r, this.bisector)
    return this.scaleUnitVector(r, s * n)
  }
  projectBevel() {
    const t = []
    return (
      (this.alpha % Gt == 0 ? [this.B] : [this.B, this.C]).forEach((e) => {
        t.push(this.projectOrthogonally(this.A, e)),
          t.push(this.projectOrthogonally(this.A, e, -this.strokeProjectionMagnitude))
      }),
      t
    )
  }
  projectMiter() {
    const t = [],
      e = Math.abs(this.alpha),
      s = 1 / Math.sin(e / 2),
      i = this.scaleUnitVector(this.bisector, -this.strokeProjectionMagnitude * s),
      r = this.options.strokeUniform
        ? Ys(this.scaleUnitVector(this.bisector, this.options.strokeMiterLimit))
        : this.options.strokeMiterLimit
    return (
      Ys(i) / this.strokeProjectionMagnitude <= r && t.push(this.applySkew(this.A.add(i))),
      t.push(...this.projectBevel()),
      t
    )
  }
  projectRoundNoSkew(t, e) {
    const s = [],
      i = new y(
        Te.getOrthogonalRotationFactor(this.bisector),
        Te.getOrthogonalRotationFactor(new y(this.bisector.y, this.bisector.x))
      )
    return (
      [
        new y(1, 0).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(i),
        new y(0, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(i)
      ].forEach((r) => {
        Di(r, t, e) && s.push(this.A.add(r))
      }),
      s
    )
  }
  projectRoundWithSkew(t, e) {
    const s = [],
      { skewX: i, skewY: r, scaleX: n, scaleY: a, strokeUniform: h } = this.options,
      c = new y(Math.tan(z(i)), Math.tan(z(r))),
      l = this.strokeProjectionMagnitude,
      u = h ? l / a / Math.sqrt(1 / a ** 2 + (1 / n ** 2) * c.y ** 2) : l / Math.sqrt(1 + c.y ** 2),
      g = new y(Math.sqrt(Math.max(l ** 2 - u ** 2, 0)), u),
      d = h
        ? l / Math.sqrt(1 + (c.x ** 2 * (1 / a) ** 2) / (1 / n + (1 / n) * c.x * c.y) ** 2)
        : l / Math.sqrt(1 + c.x ** 2 / (1 + c.x * c.y) ** 2),
      p = new y(d, Math.sqrt(Math.max(l ** 2 - d ** 2, 0)))
    return (
      [p, p.scalarMultiply(-1), g, g.scalarMultiply(-1)]
        .map((v) => this.applySkew(h ? v.multiply(this.strokeUniformScalar) : v))
        .forEach((v) => {
          Di(v, t, e) && s.push(this.applySkew(this.A).add(v))
        }),
      s
    )
  }
  projectRound() {
    const t = []
    t.push(...this.projectBevel())
    const e = this.alpha % Gt == 0,
      s = this.applySkew(this.A),
      i = t[e ? 0 : 2].subtract(s),
      r = t[e ? 1 : 0].subtract(s),
      n = e
        ? this.applySkew(this.AB.scalarMultiply(-1))
        : this.applySkew(this.bisector.multiply(this.strokeUniformScalar).scalarMultiply(-1)),
      a = Se(i, n) > 0,
      h = a ? i : r,
      c = a ? r : i
    return this.isSkewed() ? t.push(...this.projectRoundWithSkew(h, c)) : t.push(...this.projectRoundNoSkew(h, c)), t
  }
  projectPoints() {
    switch (this.options.strokeLineJoin) {
      case 'miter':
        return this.projectMiter()
      case 'round':
        return this.projectRound()
      default:
        return this.projectBevel()
    }
  }
  project() {
    return this.projectPoints().map((t) => ({
      originPoint: this.A,
      projectedPoint: t,
      angle: this.alpha,
      bisector: this.bisector
    }))
  }
}
class Lr extends zn {
  constructor(t, e, s) {
    super(s), (this.A = new y(t)), (this.T = new y(e))
  }
  calcOrthogonalProjection(t, e) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.strokeProjectionMagnitude
    const i = this.createSideVector(t, e)
    return this.scaleUnitVector(or(i), s)
  }
  projectButt() {
    return [
      this.projectOrthogonally(this.A, this.T, this.strokeProjectionMagnitude),
      this.projectOrthogonally(this.A, this.T, -this.strokeProjectionMagnitude)
    ]
  }
  projectRound() {
    const t = []
    if (!this.isSkewed() && this.A.eq(this.T)) {
      const e = new y(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar)
      t.push(this.applySkew(this.A.add(e)), this.applySkew(this.A.subtract(e)))
    } else t.push(...new Te(this.A, this.T, this.T, this.options).projectRound())
    return t
  }
  projectSquare() {
    const t = []
    if (this.A.eq(this.T)) {
      const e = new y(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar)
      t.push(this.A.add(e), this.A.subtract(e))
    } else {
      const e = this.calcOrthogonalProjection(this.A, this.T, this.strokeProjectionMagnitude),
        s = this.scaleUnitVector(si(this.createSideVector(this.A, this.T)), -this.strokeProjectionMagnitude),
        i = this.A.add(s)
      t.push(i.add(e), i.subtract(e))
    }
    return t.map((e) => this.applySkew(e))
  }
  projectPoints() {
    switch (this.options.strokeLineCap) {
      case 'round':
        return this.projectRound()
      case 'square':
        return this.projectSquare()
      default:
        return this.projectButt()
    }
  }
  project() {
    return this.projectPoints().map((t) => ({
      originPoint: this.A,
      projectedPoint: t
    }))
  }
}
const Hn = function (o, t) {
    let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2]
    const s = []
    if (o.length === 0) return s
    const i = o.reduce((r, n) => (r[r.length - 1].eq(n) || r.push(new y(n)), r), [new y(o[0])])
    if (i.length === 1) e = !0
    else if (!e) {
      const r = i[0],
        n = ((a, h) => {
          for (let c = a.length - 1; c >= 0; c--) if (h(a[c], c, a)) return c
          return -1
        })(i, (a) => !a.eq(r))
      i.splice(n + 1)
    }
    return (
      i.forEach((r, n, a) => {
        let h, c
        n === 0
          ? ((c = a[1]), (h = e ? r : a[a.length - 1]))
          : n === a.length - 1
          ? ((h = a[n - 1]), (c = e ? r : a[0]))
          : ((h = a[n - 1]), (c = a[n + 1])),
          e && a.length === 1
            ? s.push(...new Lr(r, r, t).project())
            : !e || (n !== 0 && n !== a.length - 1)
            ? s.push(...new Te(r, h, c, t).project())
            : s.push(...new Lr(r, n === 0 ? c : h, t).project())
      }),
      s
    )
  },
  ur = (o) => {
    const t = {}
    return (
      Object.keys(o).forEach((e) => {
        ;(t[e] = {}),
          Object.keys(o[e]).forEach((s) => {
            t[e][s] = m({}, o[e][s])
          })
      }),
      t
    )
  },
  Nn = (o) =>
    o
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'),
  ri = (o) => {
    const t = []
    for (let e, s = 0; s < o.length; s++) (e = _a(o, s)) !== !1 && t.push(e)
    return t
  },
  _a = (o, t) => {
    const e = o.charCodeAt(t)
    if (isNaN(e)) return ''
    if (e < 55296 || e > 57343) return o.charAt(t)
    if (55296 <= e && e <= 56319) {
      if (o.length <= t + 1) throw 'High surrogate without following low surrogate'
      const i = o.charCodeAt(t + 1)
      if (56320 > i || i > 57343) throw 'High surrogate without following low surrogate'
      return o.charAt(t) + o.charAt(t + 1)
    }
    if (t === 0) throw 'Low surrogate without preceding high surrogate'
    const s = o.charCodeAt(t - 1)
    if (55296 > s || s > 56319) throw 'Low surrogate without preceding high surrogate'
    return !1
  }
var xa = Object.freeze({
  __proto__: null,
  capitalize: function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1]
    return ''.concat(o.charAt(0).toUpperCase()).concat(t ? o.slice(1) : o.slice(1).toLowerCase())
  },
  escapeXml: Nn,
  graphemeSplit: ri
})
const ni = function (o, t) {
    let e = arguments.length > 2 && arguments[2] !== void 0 && arguments[2]
    return (
      o.fill !== t.fill ||
      o.stroke !== t.stroke ||
      o.strokeWidth !== t.strokeWidth ||
      o.fontSize !== t.fontSize ||
      o.fontFamily !== t.fontFamily ||
      o.fontWeight !== t.fontWeight ||
      o.fontStyle !== t.fontStyle ||
      o.textBackgroundColor !== t.textBackgroundColor ||
      o.deltaY !== t.deltaY ||
      (e && (o.overline !== t.overline || o.underline !== t.underline || o.linethrough !== t.linethrough))
    )
  },
  Un = (o, t) => {
    const e = t.split(`
`),
      s = []
    let i = -1,
      r = {}
    o = ur(o)
    for (let n = 0; n < e.length; n++) {
      const a = ri(e[n])
      if (o[n])
        for (let h = 0; h < a.length; h++) {
          i++
          const c = o[n][h]
          c &&
            Object.keys(c).length > 0 &&
            (ni(r, c, !0)
              ? s.push({
                  start: i,
                  end: i + 1,
                  style: c
                })
              : s[s.length - 1].end++),
            (r = c || {})
        }
      else (i += a.length), (r = {})
    }
    return s
  },
  qn = (o, t) => {
    if (!Array.isArray(o)) return ur(o)
    const e = t.split(Ni),
      s = {}
    let i = -1,
      r = 0
    for (let n = 0; n < e.length; n++) {
      const a = ri(e[n])
      for (let h = 0; h < a.length; h++)
        i++,
          o[r] &&
            o[r].start <= i &&
            i < o[r].end &&
            ((s[n] = s[n] || {}), (s[n][h] = m({}, o[r].style)), i === o[r].end - 1 && r++)
    }
    return s
  },
  re = [
    'display',
    'transform',
    U,
    'fill-opacity',
    'fill-rule',
    'opacity',
    nt,
    'stroke-dasharray',
    'stroke-linecap',
    'stroke-dashoffset',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'id',
    'paint-order',
    'vector-effect',
    'instantiated_by_use',
    'clip-path'
  ]
function Rr(o, t) {
  const e = o.nodeName,
    s = o.getAttribute('class'),
    i = o.getAttribute('id'),
    r = '(?![a-zA-Z\\-]+)'
  let n
  if (
    ((n = new RegExp('^' + e, 'i')),
    (t = t.replace(n, '')),
    i && t.length && ((n = new RegExp('#' + i + r, 'i')), (t = t.replace(n, ''))),
    s && t.length)
  ) {
    const a = s.split(' ')
    for (let h = a.length; h--; ) (n = new RegExp('\\.' + a[h] + r, 'i')), (t = t.replace(n, ''))
  }
  return t.length === 0
}
function Ca(o, t) {
  let e = !0
  const s = Rr(o, t.pop())
  return (
    s &&
      t.length &&
      (e = (function (i, r) {
        let n,
          a = !0
        for (; i.parentElement && i.parentElement.nodeType === 1 && r.length; )
          a && (n = r.pop()), (a = Rr((i = i.parentElement), n))
        return r.length === 0
      })(o, t)),
    s && e && t.length === 0
  )
}
const ba = (o) => {
    var t
    return (t = Qo[o]) !== null && t !== void 0 ? t : o
  },
  wa = new RegExp('('.concat(St, ')'), 'gi'),
  Sa = (o) => o.replace(wa, ' $1 ').replace(/,/gi, ' ').replace(/\s+/gi, ' ')
var Ir, Br, Xr, Yr, Wr, Vr, Gr
const it = '('.concat(St, ')'),
  Ta = String.raw(Ir || (Ir = se(['(skewX)(', ')'], ['(skewX)\\(', '\\)'])), it),
  Oa = String.raw(Br || (Br = se(['(skewY)(', ')'], ['(skewY)\\(', '\\)'])), it),
  ka = String.raw(
    Xr || (Xr = se(['(rotate)(', '(?: ', ' ', ')?)'], ['(rotate)\\(', '(?: ', ' ', ')?\\)'])),
    it,
    it,
    it
  ),
  Da = String.raw(Yr || (Yr = se(['(scale)(', '(?: ', ')?)'], ['(scale)\\(', '(?: ', ')?\\)'])), it, it),
  Ma = String.raw(Wr || (Wr = se(['(translate)(', '(?: ', ')?)'], ['(translate)\\(', '(?: ', ')?\\)'])), it, it),
  Pa = String.raw(
    Vr || (Vr = se(['(matrix)(', ' ', ' ', ' ', ' ', ' ', ')'], ['(matrix)\\(', ' ', ' ', ' ', ' ', ' ', '\\)'])),
    it,
    it,
    it,
    it,
    it,
    it
  ),
  gr = '(?:'.concat(Pa, '|').concat(Ma, '|').concat(ka, '|').concat(Da, '|').concat(Ta, '|').concat(Oa, ')'),
  Ea = '(?:'.concat(gr, '*)'),
  Aa = String.raw(Gr || (Gr = se(['^s*(?:', '?)s*$'], ['^\\s*(?:', '?)\\s*$'])), Ea),
  ja = new RegExp(Aa),
  Fa = new RegExp(gr),
  La = new RegExp(gr, 'g')
function us(o) {
  const t = []
  if (!(o = Sa(o).replace(/\s*([()])\s*/gi, '$1')) || (o && !ja.test(o))) return [...$]
  for (const e of o.matchAll(La)) {
    const s = Fa.exec(e[0])
    if (!s) continue
    let i = $
    const r = s.filter((p) => !!p),
      [, n, ...a] = r,
      [h, c, l, u, g, d] = a.map((p) => parseFloat(p))
    switch (n) {
      case 'translate':
        i = Ae(h, c)
        break
      case Ui:
        i = je(
          {
            angle: h
          },
          {
            x: c,
            y: l
          }
        )
        break
      case Js:
        i = Zs(h, c)
        break
      case Pe:
        i = Qi(h)
        break
      case Ee:
        i = Zi(h)
        break
      case 'matrix':
        i = [h, c, l, u, g, d]
    }
    t.push(i)
  }
  return Qs(t)
}
function Ra(o, t, e, s) {
  const i = Array.isArray(t)
  let r,
    n = t
  if ((o !== U && o !== nt) || t !== rt) {
    if (o === 'strokeUniform') return t === 'non-scaling-stroke'
    if (o === 'strokeDashArray') n = t === rt ? null : t.replace(/,/g, ' ').split(/\s+/).map(parseFloat)
    else if (o === 'transformMatrix') n = e && e.transformMatrix ? V(e.transformMatrix, us(t)) : us(t)
    else if (o === 'visible') (n = t !== rt && t !== 'hidden'), e && e.visible === !1 && (n = !1)
    else if (o === 'opacity') (n = parseFloat(t)), e && e.opacity !== void 0 && (n *= e.opacity)
    else if (o === 'textAnchor') n = t === 'start' ? L : t === 'end' ? H : k
    else if (o === 'charSpacing') r = (et(t, s) / s) * 1e3
    else if (o === 'paintFirst') {
      const a = t.indexOf(U),
        h = t.indexOf(nt)
      ;(n = U), ((a > -1 && h > -1 && h < a) || (a === -1 && h > -1)) && (n = nt)
    } else {
      if (o === 'href' || o === 'xlink:href' || o === 'font' || o === 'id') return t
      if (o === 'imageSmoothing') return t === 'optimizeQuality'
      r = i ? t.map(et) : et(t, s)
    }
  } else n = ''
  return !i && isNaN(r) ? n : r
}
function Kn(o, t) {
  const e = o.match(Jo)
  if (!e) return
  const s = e[1],
    i = e[3],
    r = e[4],
    n = e[5],
    a = e[6]
  s && (t.fontStyle = s),
    i && (t.fontWeight = isNaN(parseFloat(i)) ? i : parseFloat(i)),
    r && (t.fontSize = et(r)),
    a && (t.fontFamily = a),
    n && (t.lineHeight = n === 'normal' ? 1 : n)
}
function ji(o, t) {
  o.replace(/;\s*$/, '')
    .split(';')
    .forEach((e) => {
      if (!e) return
      const [s, i] = e.split(':')
      t[s.trim().toLowerCase()] = i.trim()
    })
}
function Jn(o) {
  const t = {},
    e = o.getAttribute('style')
  return (
    e &&
      (typeof e == 'string'
        ? ji(e, t)
        : (function (s, i) {
            Object.entries(s).forEach((r) => {
              let [n, a] = r
              a !== void 0 && (i[n.toLowerCase()] = a)
            })
          })(e, t)),
    t
  )
}
const Ia = {
  stroke: 'strokeOpacity',
  fill: 'fillOpacity'
}
function It(o, t, e) {
  if (!o) return {}
  let s,
    i = {},
    r = Hi
  o.parentNode &&
    Mr.test(o.parentNode.nodeName) &&
    ((i = It(o.parentElement, t, e)), i.fontSize && (s = r = et(i.fontSize)))
  const n = m(
    m(
      m(
        {},
        t.reduce((c, l) => {
          const u = o.getAttribute(l)
          return u && (c[l] = u), c
        }, {})
      ),
      (function (c) {
        let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          u = {}
        for (const g in l) Ca(c, g.split(' ')) && (u = m(m({}, u), l[g]))
        return u
      })(o, e)
    ),
    Jn(o)
  )
  n[di] && o.setAttribute(di, n[di]), n[gi] && ((s = et(n[gi], r)), (n[gi] = ''.concat(s)))
  const a = {}
  for (const c in n) {
    const l = ba(c),
      u = Ra(l, n[c], i, s)
    a[l] = u
  }
  a && a.font && Kn(a.font, a)
  const h = m(m({}, i), a)
  return Mr.test(o.nodeName)
    ? h
    : (function (c) {
        const l = K.getDefaults()
        return (
          Object.entries(Ia).forEach((u) => {
            let [g, d] = u
            if (c[d] === void 0 || c[g] === '') return
            if (c[g] === void 0) {
              if (!l[g]) return
              c[g] = l[g]
            }
            if (c[g].indexOf('url(') === 0) return
            const p = new j(c[g])
            c[g] = p.setAlpha(Y(p.getAlpha() * c[d], 2)).toRgba()
          }),
          c
        )
      })(h)
}
const Ba = ['left', 'top', 'width', 'height', 'visible'],
  Qn = ['rx', 'ry']
class vt extends K {
  static getDefaults() {
    return m(m({}, super.getDefaults()), vt.ownDefaults)
  }
  constructor(t) {
    super(), Object.assign(this, vt.ownDefaults), this.setOptions(t), this._initRxRy()
  }
  _initRxRy() {
    const { rx: t, ry: e } = this
    t && !e ? (this.ry = t) : e && !t && (this.rx = e)
  }
  _render(t) {
    const { width: e, height: s } = this,
      i = -e / 2,
      r = -s / 2,
      n = this.rx ? Math.min(this.rx, e / 2) : 0,
      a = this.ry ? Math.min(this.ry, s / 2) : 0,
      h = n !== 0 || a !== 0
    t.beginPath(),
      t.moveTo(i + n, r),
      t.lineTo(i + e - n, r),
      h && t.bezierCurveTo(i + e - Ut * n, r, i + e, r + Ut * a, i + e, r + a),
      t.lineTo(i + e, r + s - a),
      h && t.bezierCurveTo(i + e, r + s - Ut * a, i + e - Ut * n, r + s, i + e - n, r + s),
      t.lineTo(i + n, r + s),
      h && t.bezierCurveTo(i + Ut * n, r + s, i, r + s - Ut * a, i, r + s - a),
      t.lineTo(i, r + a),
      h && t.bezierCurveTo(i, r + Ut * a, i + Ut * n, r, i + n, r),
      t.closePath(),
      this._renderPaintInOrder(t)
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return super.toObject([...Qn, ...t])
  }
  _toSVG() {
    const { width: t, height: e, rx: s, ry: i } = this
    return [
      '<rect ',
      'COMMON_PARTS',
      'x="'
        .concat(-t / 2, '" y="')
        .concat(-e / 2, '" rx="')
        .concat(s, '" ry="')
        .concat(i, '" width="')
        .concat(t, '" height="')
        .concat(
          e,
          `" />
`
        )
    ]
  }
  static async fromElement(t, e, s) {
    const i = It(t, this.ATTRIBUTE_NAMES, s),
      { left: r = 0, top: n = 0, width: a = 0, height: h = 0, visible: c = !0 } = i,
      l = W(i, Ba)
    return new this(
      m(
        m(m({}, e), l),
        {},
        {
          left: r,
          top: n,
          width: a,
          height: h,
          visible: !!(c && a && h)
        }
      )
    )
  }
}
f(vt, 'type', 'Rect'),
  f(vt, 'cacheProperties', [...zt, ...Qn]),
  f(vt, 'ownDefaults', {
    rx: 0,
    ry: 0
  }),
  f(vt, 'ATTRIBUTE_NAMES', [...re, 'x', 'y', 'rx', 'ry', 'width', 'height']),
  w.setClass(vt),
  w.setSVGClass(vt)
const Yt = 'initialization',
  Vs = 'added',
  dr = 'removed',
  Gs = 'imperative',
  Zn = (o, t) => {
    const { strokeUniform: e, strokeWidth: s, width: i, height: r, group: n } = t,
      a = n && n !== o ? ms(n.calcTransformMatrix(), o.calcTransformMatrix()) : null,
      h = a ? t.getRelativeCenterPoint().transform(a) : t.getRelativeCenterPoint(),
      c = !t.isStrokeAccountedForInDimensions(),
      l = e && c ? yn(new y(s, s), void 0, o.calcTransformMatrix()) : qi,
      u = !e && c ? s : 0,
      g = $s(i + u, r + u, Qs([a, t.calcOwnMatrix()], !0))
        .add(l)
        .scalarDivide(2)
    return [h.subtract(g), h.add(g)]
  }
class vs {
  calcLayoutResult(t, e) {
    if (this.shouldPerformLayout(t)) return this.calcBoundingBox(e, t)
  }
  shouldPerformLayout(t) {
    let { type: e, prevStrategy: s, strategy: i } = t
    return e === Yt || e === Gs || (!!s && i !== s)
  }
  shouldLayoutClipPath(t) {
    let {
      type: e,
      target: { clipPath: s }
    } = t
    return e !== Yt && s && !s.absolutePositioned
  }
  getInitialSize(t, e) {
    return e.size
  }
  calcBoundingBox(t, e) {
    const { type: s, target: i } = e
    if (s === Gs && e.overrides) return e.overrides
    if (t.length === 0) return
    const { left: r, top: n, width: a, height: h } = Rt(t.map((u) => Zn(i, u)).reduce((u, g) => u.concat(g), [])),
      c = new y(a, h),
      l = new y(r, n).add(c.scalarDivide(2))
    if (s === Yt) {
      const u = this.getInitialSize(e, {
        size: c,
        center: l
      })
      return {
        center: l,
        relativeCorrection: new y(0, 0),
        size: u
      }
    }
    return {
      center: l.transform(i.calcOwnMatrix()),
      size: c
    }
  }
}
f(vs, 'type', 'strategy')
class zs extends vs {
  shouldPerformLayout(t) {
    return !0
  }
}
f(zs, 'type', 'fit-content'), w.setClass(zs)
const Xa = ['strategy'],
  Ya = ['target', 'strategy', 'bubbles', 'prevStrategy'],
  $n = 'layoutManager'
class Me {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new zs()
    f(this, 'strategy', void 0), (this.strategy = t), (this._subscriptions = new Map())
  }
  performLayout(t) {
    const e = m(
      m(
        {
          bubbles: !0,
          strategy: this.strategy
        },
        t
      ),
      {},
      {
        prevStrategy: this._prevLayoutStrategy,
        stopPropagation() {
          this.bubbles = !1
        }
      }
    )
    this.onBeforeLayout(e)
    const s = this.getLayoutResult(e)
    s && this.commitLayout(e, s), this.onAfterLayout(e, s), (this._prevLayoutStrategy = e.strategy)
  }
  attachHandlers(t, e) {
    const { target: s } = e
    return [Rs, $r, as, tn, Ks, en, Ls, sn, zo].map((i) =>
      t.on(i, (r) =>
        this.performLayout(
          i === Rs
            ? {
                type: 'object_modified',
                trigger: i,
                e: r,
                target: s
              }
            : {
                type: 'object_modifying',
                trigger: i,
                e: r,
                target: s
              }
        )
      )
    )
  }
  subscribe(t, e) {
    this.unsubscribe(t, e)
    const s = this.attachHandlers(t, e)
    this._subscriptions.set(t, s)
  }
  unsubscribe(t, e) {
    ;(this._subscriptions.get(t) || []).forEach((s) => s()), this._subscriptions.delete(t)
  }
  unsubscribeTargets(t) {
    t.targets.forEach((e) => this.unsubscribe(e, t))
  }
  subscribeTargets(t) {
    t.targets.forEach((e) => this.subscribe(e, t))
  }
  onBeforeLayout(t) {
    const { target: e, type: s } = t,
      { canvas: i } = e
    if (
      (s === Yt || s === Vs ? this.subscribeTargets(t) : s === dr && this.unsubscribeTargets(t),
      e.fire('layout:before', {
        context: t
      }),
      i &&
        i.fire('object:layout:before', {
          target: e,
          context: t
        }),
      s === Gs && t.deep)
    ) {
      const r = W(t, Xa)
      e.forEachObject(
        (n) =>
          n.layoutManager &&
          n.layoutManager.performLayout(
            m(
              m({}, r),
              {},
              {
                bubbles: !1,
                target: n
              }
            )
          )
      )
    }
  }
  getLayoutResult(t) {
    const { target: e, strategy: s, type: i } = t,
      r = s.calcLayoutResult(t, e.getObjects())
    if (!r) return
    const n = i === Yt ? new y() : e.getRelativeCenterPoint(),
      { center: a, correction: h = new y(), relativeCorrection: c = new y() } = r,
      l = n
        .subtract(a)
        .add(h)
        .transform(i === Yt ? $ : ht(e.calcOwnMatrix()), !0)
        .add(c)
    return {
      result: r,
      prevCenter: n,
      nextCenter: a,
      offset: l
    }
  }
  commitLayout(t, e) {
    const { target: s } = t,
      {
        result: { size: i },
        nextCenter: r
      } = e
    var n, a
    s.set({
      width: i.x,
      height: i.y
    }),
      this.layoutObjects(t, e),
      t.type === Yt
        ? s.set({
            left: (n = t.x) !== null && n !== void 0 ? n : r.x + i.x * N(s.originX),
            top: (a = t.y) !== null && a !== void 0 ? a : r.y + i.y * N(s.originY)
          })
        : (s.setPositionByOrigin(r, k, k), s.setCoords(), s.set('dirty', !0))
  }
  layoutObjects(t, e) {
    const { target: s } = t
    s.forEachObject((i) => {
      i.group === s && this.layoutObject(t, e, i)
    }),
      t.strategy.shouldLayoutClipPath(t) && this.layoutObject(t, e, s.clipPath)
  }
  layoutObject(t, e, s) {
    let { offset: i } = e
    s.set({
      left: s.left + i.x,
      top: s.top + i.y
    })
  }
  onAfterLayout(t, e) {
    const { target: s, strategy: i, bubbles: r, prevStrategy: n } = t,
      a = W(t, Ya),
      { canvas: h } = s
    s.fire('layout:after', {
      context: t,
      result: e
    }),
      h &&
        h.fire('object:layout:after', {
          context: t,
          result: e,
          target: s
        })
    const c = s.parent
    r &&
      c != null &&
      c.layoutManager &&
      ((a.path || (a.path = [])).push(s),
      c.layoutManager.performLayout(
        m(
          m({}, a),
          {},
          {
            target: c
          }
        )
      )),
      s.set('dirty', !0)
  }
  dispose() {
    const { _subscriptions: t } = this
    t.forEach((e) => e.forEach((s) => s())), t.clear()
  }
  toObject() {
    return {
      type: $n,
      strategy: this.strategy.constructor.type
    }
  }
  toJSON() {
    return this.toObject()
  }
}
w.setClass(Me, $n)
const Wa = ['type', 'objects', 'layoutManager']
class Va extends Me {
  performLayout() {}
}
class dt extends Ki(K) {
  static getDefaults() {
    return m(m({}, super.getDefaults()), dt.ownDefaults)
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(),
      f(this, '_activeObjects', []),
      f(this, '__objectSelectionTracker', void 0),
      f(this, '__objectSelectionDisposer', void 0),
      Object.assign(this, dt.ownDefaults),
      this.setOptions(e),
      this.groupInit(t, e)
  }
  groupInit(t, e) {
    var s
    ;(this._objects = [...t]),
      (this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, !0)),
      (this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, !1)),
      this.forEachObject((i) => {
        this.enterGroup(i, !1)
      }),
      (this.layoutManager = (s = e.layoutManager) !== null && s !== void 0 ? s : new Me()),
      this.layoutManager.performLayout({
        type: Yt,
        target: this,
        targets: [...t],
        x: e.left,
        y: e.top
      })
  }
  canEnterGroup(t) {
    return t === this || this.isDescendantOf(t)
      ? (Vt('error', 'Group: circular object trees are not supported, this call has no effect'), !1)
      : this._objects.indexOf(t) === -1 ||
          (Vt('error', 'Group: duplicate objects are not supported inside group, this call has no effect'), !1)
  }
  _filterObjectsBeforeEnteringGroup(t) {
    return t.filter((e, s, i) => this.canEnterGroup(e) && i.indexOf(e) === s)
  }
  add() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s]
    const i = this._filterObjectsBeforeEnteringGroup(e),
      r = super.add(...i)
    return this._onAfterObjectsChange(Vs, i), r
  }
  insertAt(t) {
    for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) s[i - 1] = arguments[i]
    const r = this._filterObjectsBeforeEnteringGroup(s),
      n = super.insertAt(t, ...r)
    return this._onAfterObjectsChange(Vs, r), n
  }
  remove() {
    const t = super.remove(...arguments)
    return this._onAfterObjectsChange(dr, t), t
  }
  _onObjectAdded(t) {
    this.enterGroup(t, !0),
      this.fire('object:added', {
        target: t
      }),
      t.fire('added', {
        target: this
      })
  }
  _onObjectRemoved(t, e) {
    this.exitGroup(t, e),
      this.fire('object:removed', {
        target: t
      }),
      t.fire('removed', {
        target: this
      })
  }
  _onAfterObjectsChange(t, e) {
    this.layoutManager.performLayout({
      type: t,
      targets: e,
      target: this
    })
  }
  _onStackOrderChanged() {
    this._set('dirty', !0)
  }
  _set(t, e) {
    const s = this[t]
    return (
      super._set(t, e),
      t === 'canvas' &&
        s !== e &&
        (this._objects || []).forEach((i) => {
          i._set(t, e)
        }),
      this
    )
  }
  _shouldSetNestedCoords() {
    return this.subTargetCheck
  }
  removeAll() {
    return (this._activeObjects = []), this.remove(...this._objects)
  }
  __objectSelectionMonitor(t, e) {
    let { target: s } = e
    const i = this._activeObjects
    if (t) i.push(s), this._set('dirty', !0)
    else if (i.length > 0) {
      const r = i.indexOf(s)
      r > -1 && (i.splice(r, 1), this._set('dirty', !0))
    }
  }
  _watchObject(t, e) {
    t && this._watchObject(!1, e),
      t
        ? (e.on('selected', this.__objectSelectionTracker), e.on('deselected', this.__objectSelectionDisposer))
        : (e.off('selected', this.__objectSelectionTracker), e.off('deselected', this.__objectSelectionDisposer))
  }
  enterGroup(t, e) {
    t.group && t.group.remove(t), t._set('parent', this), this._enterGroup(t, e)
  }
  _enterGroup(t, e) {
    e && ke(t, V(ht(this.calcTransformMatrix()), t.calcTransformMatrix())),
      this._shouldSetNestedCoords() && t.setCoords(),
      t._set('group', this),
      t._set('canvas', this.canvas),
      this._watchObject(!0, t)
    const s = this.canvas && this.canvas.getActiveObject && this.canvas.getActiveObject()
    s && (s === t || t.isDescendantOf(s)) && this._activeObjects.push(t)
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t._set('parent', void 0), t._set('canvas', void 0)
  }
  _exitGroup(t, e) {
    t._set('group', void 0),
      e || (ke(t, V(this.calcTransformMatrix(), t.calcTransformMatrix())), t.setCoords()),
      this._watchObject(!1, t)
    const s = this._activeObjects.length > 0 ? this._activeObjects.indexOf(t) : -1
    s > -1 && this._activeObjects.splice(s, 1)
  }
  shouldCache() {
    const t = K.prototype.shouldCache.call(this)
    if (t) {
      for (let e = 0; e < this._objects.length; e++)
        if (this._objects[e].willDrawShadow()) return (this.ownCaching = !1), !1
    }
    return t
  }
  willDrawShadow() {
    if (super.willDrawShadow()) return !0
    for (let t = 0; t < this._objects.length; t++) if (this._objects[t].willDrawShadow()) return !0
    return !1
  }
  isOnACache() {
    return this.ownCaching || (!!this.parent && this.parent.isOnACache())
  }
  drawObject(t, e, s) {
    this._renderBackground(t)
    for (let r = 0; r < this._objects.length; r++) {
      var i
      const n = this._objects[r]
      ;(i = this.canvas) !== null && i !== void 0 && i.preserveObjectStacking && n.group !== this
        ? (t.save(), t.transform(...ht(this.calcTransformMatrix())), n.render(t), t.restore())
        : n.group === this && n.render(t)
    }
    this._drawClipPath(t, this.clipPath, s)
  }
  setCoords() {
    super.setCoords(), this._shouldSetNestedCoords() && this.forEachObject((t) => t.setCoords())
  }
  triggerLayout() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    this.layoutManager.performLayout(
      m(
        {
          target: this,
          type: Gs
        },
        t
      )
    )
  }
  render(t) {
    ;(this._transformDone = !0), super.render(t), (this._transformDone = !1)
  }
  __serializeObjects(t, e) {
    const s = this.includeDefaultValues
    return this._objects
      .filter(function (i) {
        return !i.excludeFromExport
      })
      .map(function (i) {
        const r = i.includeDefaultValues
        i.includeDefaultValues = s
        const n = i[t || 'toObject'](e)
        return (i.includeDefaultValues = r), n
      })
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    const e = this.layoutManager.toObject()
    return m(
      m(
        m({}, super.toObject(['subTargetCheck', 'interactive', ...t])),
        e.strategy !== 'fit-content' || this.includeDefaultValues
          ? {
              layoutManager: e
            }
          : {}
      ),
      {},
      {
        objects: this.__serializeObjects('toObject', t)
      }
    )
  }
  toString() {
    return '#<Group: ('.concat(this.complexity(), ')>')
  }
  dispose() {
    this.layoutManager.unsubscribeTargets({
      targets: this.getObjects(),
      target: this
    }),
      (this._activeObjects = []),
      this.forEachObject((t) => {
        this._watchObject(!1, t), t.dispose()
      }),
      super.dispose()
  }
  _createSVGBgRect(t) {
    if (!this.backgroundColor) return ''
    const e = vt.prototype._toSVG.call(this),
      s = e.indexOf('COMMON_PARTS')
    e[s] = 'for="group" '
    const i = e.join('')
    return t ? t(i) : i
  }
  _toSVG(t) {
    const e = [
        '<g ',
        'COMMON_PARTS',
        ` >
`
      ],
      s = this._createSVGBgRect(t)
    s && e.push('		', s)
    for (let i = 0; i < this._objects.length; i++) e.push('		', this._objects[i].toSVG(t))
    return (
      e.push(`</g>
`),
      e
    )
  }
  getSvgStyles() {
    const t = this.opacity !== void 0 && this.opacity !== 1 ? 'opacity: '.concat(this.opacity, ';') : '',
      e = this.visible ? '' : ' visibility: hidden;'
    return [t, this.getSvgFilter(), e].join('')
  }
  toClipPathSVG(t) {
    const e = [],
      s = this._createSVGBgRect(t)
    s && e.push('	', s)
    for (let i = 0; i < this._objects.length; i++) e.push('	', this._objects[i].toClipPathSVG(t))
    return this._createBaseClipPathSVGMarkup(e, {
      reviver: t
    })
  }
  static fromObject(t, e) {
    let { type: s, objects: i = [], layoutManager: r } = t,
      n = W(t, Wa)
    return Promise.all([Oe(i, e), ps(n, e)]).then((a) => {
      let [h, c] = a
      const l = new this(
        h,
        m(
          m(m({}, n), c),
          {},
          {
            layoutManager: new Va()
          }
        )
      )
      if (r) {
        const u = w.getClass(r.type),
          g = w.getClass(r.strategy)
        l.layoutManager = new u(new g())
      } else l.layoutManager = new Me()
      return (
        l.layoutManager.subscribeTargets({
          type: Yt,
          target: l,
          targets: l.getObjects()
        }),
        l.setCoords(),
        l
      )
    })
  }
}
f(dt, 'type', 'Group'),
  f(dt, 'ownDefaults', {
    strokeWidth: 0,
    subTargetCheck: !1,
    interactive: !1
  }),
  w.setClass(dt)
const to = (o, t) => Math.min(t.width / o.width, t.height / o.height),
  eo = (o, t) => Math.max(t.width / o.width, t.height / o.height),
  Fi = '\\s*,?\\s*',
  Ie = ''.concat(Fi, '(').concat(St, ')'),
  Ga = ''.concat(Ie).concat(Ie).concat(Ie).concat(Fi, '([01])').concat(Fi, '([01])').concat(Ie).concat(Ie),
  za = {
    m: 'l',
    M: 'L'
  },
  Ha = (o, t, e, s, i, r, n, a, h, c, l) => {
    const u = kt(o),
      g = Dt(o),
      d = kt(t),
      p = Dt(t),
      v = e * i * d - s * r * p + n,
      _ = s * i * d + e * r * p + a
    return [
      'C',
      c + h * (-e * i * g - s * r * u),
      l + h * (-s * i * g + e * r * u),
      v + h * (e * i * p + s * r * d),
      _ + h * (s * i * p - e * r * d),
      v,
      _
    ]
  },
  zr = (o, t, e, s) => {
    const i = Math.atan2(t, o),
      r = Math.atan2(s, e)
    return r >= i ? r - i : 2 * Math.PI - (i - r)
  }
function Li(o, t, e, s, i, r, n, a) {
  let h
  if (E.cachesBoundsOfCurve && ((h = [...arguments].join()), we.boundsOfCurveCache[h])) return we.boundsOfCurveCache[h]
  const c = Math.sqrt,
    l = Math.abs,
    u = [],
    g = [
      [0, 0],
      [0, 0]
    ]
  let d = 6 * o - 12 * e + 6 * i,
    p = -3 * o + 9 * e - 9 * i + 3 * n,
    v = 3 * e - 3 * o
  for (let S = 0; S < 2; ++S) {
    if (
      (S > 0 && ((d = 6 * t - 12 * s + 6 * r), (p = -3 * t + 9 * s - 9 * r + 3 * a), (v = 3 * s - 3 * t)), l(p) < 1e-12)
    ) {
      if (l(d) < 1e-12) continue
      const M = -v / d
      0 < M && M < 1 && u.push(M)
      continue
    }
    const T = d * d - 4 * v * p
    if (T < 0) continue
    const D = c(T),
      P = (-d + D) / (2 * p)
    0 < P && P < 1 && u.push(P)
    const O = (-d - D) / (2 * p)
    0 < O && O < 1 && u.push(O)
  }
  let _ = u.length
  const x = _,
    C = io(o, t, e, s, i, r, n, a)
  for (; _--; ) {
    const { x: S, y: T } = C(u[_])
    ;(g[0][_] = S), (g[1][_] = T)
  }
  ;(g[0][x] = o), (g[1][x] = t), (g[0][x + 1] = n), (g[1][x + 1] = a)
  const b = [new y(Math.min(...g[0]), Math.min(...g[1])), new y(Math.max(...g[0]), Math.max(...g[1]))]
  return E.cachesBoundsOfCurve && (we.boundsOfCurveCache[h] = b), b
}
const Na = (o, t, e) => {
    let [s, i, r, n, a, h, c, l] = e
    const u = ((g, d, p, v, _, x, C) => {
      if (p === 0 || v === 0) return []
      let b = 0,
        S = 0,
        T = 0
      const D = Math.PI,
        P = C * zi,
        O = Dt(P),
        M = kt(P),
        A = 0.5 * (-M * g - O * d),
        B = 0.5 * (-M * d + O * g),
        R = p ** 2,
        F = v ** 2,
        I = B ** 2,
        tt = A ** 2,
        Q = R * F - R * I - F * tt
      let xt = Math.abs(p),
        G = Math.abs(v)
      if (Q < 0) {
        const Nt = Math.sqrt(1 - Q / (R * F))
        ;(xt *= Nt), (G *= Nt)
      } else T = (_ === x ? -1 : 1) * Math.sqrt(Q / (R * I + F * tt))
      const Mt = (T * xt * B) / G,
        Bt = (-T * G * A) / xt,
        _s = M * Mt - O * Bt + 0.5 * g,
        hi = O * Mt + M * Bt + 0.5 * d
      let Le = zr(1, 0, (A - Mt) / xt, (B - Bt) / G),
        Ht = zr((A - Mt) / xt, (B - Bt) / G, (-A - Mt) / xt, (-B - Bt) / G)
      x === 0 && Ht > 0 ? (Ht -= 2 * D) : x === 1 && Ht < 0 && (Ht += 2 * D)
      const xs = Math.ceil(Math.abs((Ht / D) * 2)),
        ne = [],
        Re = Ht / xs,
        Xo = ((8 / 3) * Math.sin(Re / 4) * Math.sin(Re / 4)) / Math.sin(Re / 2)
      let ci = Le + Re
      for (let Nt = 0; Nt < xs; Nt++)
        (ne[Nt] = Ha(Le, ci, M, O, xt, G, _s, hi, Xo, b, S)), (b = ne[Nt][5]), (S = ne[Nt][6]), (Le = ci), (ci += Re)
      return ne
    })(c - o, l - t, i, r, a, h, n)
    for (let g = 0, d = u.length; g < d; g++)
      (u[g][1] += o), (u[g][2] += t), (u[g][3] += o), (u[g][4] += t), (u[g][5] += o), (u[g][6] += t)
    return u
  },
  so = (o) => {
    let t = 0,
      e = 0,
      s = 0,
      i = 0
    const r = []
    let n,
      a = 0,
      h = 0
    for (const c of o) {
      const l = [...c]
      let u
      switch (l[0]) {
        case 'l':
          ;(l[1] += t), (l[2] += e)
        case 'L':
          ;(t = l[1]), (e = l[2]), (u = ['L', t, e])
          break
        case 'h':
          l[1] += t
        case 'H':
          ;(t = l[1]), (u = ['L', t, e])
          break
        case 'v':
          l[1] += e
        case 'V':
          ;(e = l[1]), (u = ['L', t, e])
          break
        case 'm':
          ;(l[1] += t), (l[2] += e)
        case 'M':
          ;(t = l[1]), (e = l[2]), (s = l[1]), (i = l[2]), (u = ['M', t, e])
          break
        case 'c':
          ;(l[1] += t), (l[2] += e), (l[3] += t), (l[4] += e), (l[5] += t), (l[6] += e)
        case 'C':
          ;(a = l[3]), (h = l[4]), (t = l[5]), (e = l[6]), (u = ['C', l[1], l[2], a, h, t, e])
          break
        case 's':
          ;(l[1] += t), (l[2] += e), (l[3] += t), (l[4] += e)
        case 'S':
          n === 'C' ? ((a = 2 * t - a), (h = 2 * e - h)) : ((a = t), (h = e)),
            (t = l[3]),
            (e = l[4]),
            (u = ['C', a, h, l[1], l[2], t, e]),
            (a = u[3]),
            (h = u[4])
          break
        case 'q':
          ;(l[1] += t), (l[2] += e), (l[3] += t), (l[4] += e)
        case 'Q':
          ;(a = l[1]), (h = l[2]), (t = l[3]), (e = l[4]), (u = ['Q', a, h, t, e])
          break
        case 't':
          ;(l[1] += t), (l[2] += e)
        case 'T':
          n === 'Q' ? ((a = 2 * t - a), (h = 2 * e - h)) : ((a = t), (h = e)),
            (t = l[1]),
            (e = l[2]),
            (u = ['Q', a, h, t, e])
          break
        case 'a':
          ;(l[6] += t), (l[7] += e)
        case 'A':
          Na(t, e, l).forEach((g) => r.push(g)), (t = l[6]), (e = l[7])
          break
        case 'z':
        case 'Z':
          ;(t = s), (e = i), (u = ['Z'])
      }
      u ? (r.push(u), (n = u[0])) : (n = '')
    }
    return r
  },
  Hs = (o, t, e, s) => Math.sqrt((e - o) ** 2 + (s - t) ** 2),
  io = (o, t, e, s, i, r, n, a) => (h) => {
    const c = h ** 3,
      l = ((d) => 3 * d ** 2 * (1 - d))(h),
      u = ((d) => 3 * d * (1 - d) ** 2)(h),
      g = ((d) => (1 - d) ** 3)(h)
    return new y(n * c + i * l + e * u + o * g, a * c + r * l + s * u + t * g)
  },
  ro = (o) => o ** 2,
  no = (o) => 2 * o * (1 - o),
  oo = (o) => (1 - o) ** 2,
  Ua = (o, t, e, s, i, r, n, a) => (h) => {
    const c = ro(h),
      l = no(h),
      u = oo(h),
      g = 3 * (u * (e - o) + l * (i - e) + c * (n - i)),
      d = 3 * (u * (s - t) + l * (r - s) + c * (a - r))
    return Math.atan2(d, g)
  },
  qa = (o, t, e, s, i, r) => (n) => {
    const a = ro(n),
      h = no(n),
      c = oo(n)
    return new y(i * a + e * h + o * c, r * a + s * h + t * c)
  },
  Ka = (o, t, e, s, i, r) => (n) => {
    const a = 1 - n,
      h = 2 * (a * (e - o) + n * (i - e)),
      c = 2 * (a * (s - t) + n * (r - s))
    return Math.atan2(c, h)
  },
  Hr = (o, t, e) => {
    let s = new y(t, e),
      i = 0
    for (let r = 1; r <= 100; r += 1) {
      const n = o(r / 100)
      ;(i += Hs(s.x, s.y, n.x, n.y)), (s = n)
    }
    return i
  },
  Ja = (o, t) => {
    let e,
      s = 0,
      i = 0,
      r = {
        x: o.x,
        y: o.y
      },
      n = m({}, r),
      a = 0.01,
      h = 0
    const c = o.iterator,
      l = o.angleFinder
    for (; i < t && a > 1e-4; )
      (n = c(s)),
        (h = s),
        (e = Hs(r.x, r.y, n.x, n.y)),
        e + i > t ? ((s -= a), (a /= 2)) : ((r = n), (s += a), (i += e))
    return m(
      m({}, n),
      {},
      {
        angle: l(h)
      }
    )
  },
  fr = (o) => {
    let t,
      e,
      s = 0,
      i = 0,
      r = 0,
      n = 0,
      a = 0
    const h = []
    for (const c of o) {
      const l = {
        x: i,
        y: r,
        command: c[0],
        length: 0
      }
      switch (c[0]) {
        case 'M':
          ;(e = l), (e.x = n = i = c[1]), (e.y = a = r = c[2])
          break
        case 'L':
          ;(e = l), (e.length = Hs(i, r, c[1], c[2])), (i = c[1]), (r = c[2])
          break
        case 'C':
          ;(t = io(i, r, c[1], c[2], c[3], c[4], c[5], c[6])),
            (e = l),
            (e.iterator = t),
            (e.angleFinder = Ua(i, r, c[1], c[2], c[3], c[4], c[5], c[6])),
            (e.length = Hr(t, i, r)),
            (i = c[5]),
            (r = c[6])
          break
        case 'Q':
          ;(t = qa(i, r, c[1], c[2], c[3], c[4])),
            (e = l),
            (e.iterator = t),
            (e.angleFinder = Ka(i, r, c[1], c[2], c[3], c[4])),
            (e.length = Hr(t, i, r)),
            (i = c[3]),
            (r = c[4])
          break
        case 'Z':
          ;(e = l), (e.destX = n), (e.destY = a), (e.length = Hs(i, r, n, a)), (i = n), (r = a)
      }
      ;(s += e.length), h.push(e)
    }
    return (
      h.push({
        length: s,
        x: i,
        y: r
      }),
      h
    )
  },
  ao = function (o, t) {
    let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fr(o),
      s = 0
    for (; t - e[s].length > 0 && s < e.length - 2; ) (t -= e[s].length), s++
    const i = e[s],
      r = t / i.length,
      n = o[s]
    switch (i.command) {
      case 'M':
        return {
          x: i.x,
          y: i.y,
          angle: 0
        }
      case 'Z':
        return m(
          m({}, new y(i.x, i.y).lerp(new y(i.destX, i.destY), r)),
          {},
          {
            angle: Math.atan2(i.destY - i.y, i.destX - i.x)
          }
        )
      case 'L':
        return m(
          m({}, new y(i.x, i.y).lerp(new y(n[1], n[2]), r)),
          {},
          {
            angle: Math.atan2(n[2] - i.y, n[1] - i.x)
          }
        )
      case 'C':
      case 'Q':
        return Ja(i, t)
    }
  },
  Qa = new RegExp('[mzlhvcsqta][^mzlhvcsqta]*', 'gi'),
  Nr = new RegExp(Ga, 'g'),
  Za = new RegExp(St, 'gi'),
  $a = {
    m: 2,
    l: 2,
    h: 1,
    v: 1,
    c: 6,
    s: 4,
    q: 4,
    t: 2,
    a: 7
  },
  ho = (o) => {
    var t
    const e = [],
      s = (t = o.match(Qa)) !== null && t !== void 0 ? t : []
    for (const i of s) {
      const r = i[0]
      if (r === 'z' || r === 'Z') {
        e.push([r])
        continue
      }
      const n = $a[r.toLowerCase()]
      let a = []
      if (r === 'a' || r === 'A') {
        Nr.lastIndex = 0
        for (let h = null; (h = Nr.exec(i)); ) a.push(...h.slice(1))
      } else a = i.match(Za) || []
      for (let h = 0; h < a.length; h += n) {
        const c = new Array(n),
          l = za[r]
        c[0] = h > 0 && l ? l : r
        for (let u = 0; u < n; u++) c[u + 1] = parseFloat(a[h + u])
        e.push(c)
      }
    }
    return e
  },
  co = function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      e = new y(o[0]),
      s = new y(o[1]),
      i = 1,
      r = 0
    const n = [],
      a = o.length,
      h = a > 2
    let c
    for (
      h && ((i = o[2].x < s.x ? -1 : o[2].x === s.x ? 0 : 1), (r = o[2].y < s.y ? -1 : o[2].y === s.y ? 0 : 1)),
        n.push(['M', e.x - i * t, e.y - r * t]),
        c = 1;
      c < a;
      c++
    ) {
      if (!e.eq(s)) {
        const l = e.midPointFrom(s)
        n.push(['Q', e.x, e.y, l.x, l.y])
      }
      ;(e = o[c]), c + 1 < o.length && (s = o[c + 1])
    }
    return (
      h &&
        ((i = e.x > o[c - 2].x ? 1 : e.x === o[c - 2].x ? 0 : -1),
        (r = e.y > o[c - 2].y ? 1 : e.y === o[c - 2].y ? 0 : -1)),
      n.push(['L', e.x + i * t, e.y + r * t]),
      n
    )
  },
  pr = (o, t) => o.map((e) => e.map((s, i) => (i === 0 || t === void 0 ? s : Y(s, t))).join(' ')).join(' ')
function Ns(o, t) {
  const e = o.style
  e &&
    t &&
    (typeof t == 'string'
      ? (e.cssText += ';' + t)
      : Object.entries(t).forEach((s) => {
          let [i, r] = s
          return e.setProperty(i, r)
        }))
}
const ce = (o, t) => Math.floor(Math.random() * (t - o + 1)) + o
function lo(o) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const e = t.onComplete || ue,
    s = new (Ft().XMLHttpRequest)(),
    i = t.signal,
    r = function () {
      s.abort()
    },
    n = function () {
      i && i.removeEventListener('abort', r), (s.onerror = s.ontimeout = ue)
    }
  if (i && i.aborted) throw new Gi('request')
  return (
    i &&
      i.addEventListener('abort', r, {
        once: !0
      }),
    (s.onreadystatechange = function () {
      s.readyState === 4 && (n(), e(s), (s.onreadystatechange = ue))
    }),
    (s.onerror = s.ontimeout = n),
    s.open('get', o, !0),
    s.send(),
    s
  )
}
const Ps = (o, t) => {
  let e = o._findCenterFromElement()
  o.transformMatrix &&
    (((s) => {
      if (s.transformMatrix) {
        const { scaleX: i, scaleY: r, angle: n, skewX: a } = ge(s.transformMatrix)
        ;(s.flipX = !1), (s.flipY = !1), s.set(ot, i), s.set(ft, r), (s.angle = n), (s.skewX = a), (s.skewY = 0)
      }
    })(o),
    (e = e.transform(o.transformMatrix))),
    delete o.transformMatrix,
    t &&
      ((o.scaleX *= t.scaleX),
      (o.scaleY *= t.scaleY),
      (o.cropX = t.cropX),
      (o.cropY = t.cropY),
      (e.x += t.offsetLeft),
      (e.y += t.offsetTop),
      (o.width = t.width),
      (o.height = t.height)),
    o.setPositionByOrigin(e, k, k)
}
var th = Object.freeze({
  __proto__: null,
  addTransformToObject: mn,
  animate: hr,
  animateColor: kn,
  applyTransformToObject: ke,
  calcAngleBetweenVectors: Ws,
  calcDimensionsMatrix: fs,
  calcPlaneChangeMatrix: ms,
  calcVectorRotation: Sn,
  cancelAnimFrame: on,
  capValue: de,
  composeMatrix: un,
  copyCanvasElement: (o) => {
    var t
    const e = _t(o)
    return (t = e.getContext('2d')) === null || t === void 0 || t.drawImage(o, 0, 0), e
  },
  cos: kt,
  createCanvasElement: lt,
  createImage: an,
  createRotateMatrix: je,
  createScaleMatrix: Zs,
  createSkewXMatrix: Qi,
  createSkewYMatrix: Zi,
  createTranslateMatrix: Ae,
  createVector: Xs,
  crossProduct: Se,
  degreesToRadians: z,
  dotProduct: Tn,
  ease: ia,
  enlivenObjectEnlivables: ps,
  enlivenObjects: Oe,
  findScaleToCover: eo,
  findScaleToFit: to,
  getBoundsOfCurve: Li,
  getOrthonormalVector: or,
  getPathSegmentsInfo: fr,
  getPointOnPath: ao,
  getPointer: pn,
  getRandomInt: ce,
  getRegularPolygonPath: (o, t) => {
    const e = (2 * Math.PI) / o
    let s = -$t
    o % 2 == 0 && (s += e / 2)
    const i = new Array(o + 1)
    for (let r = 0; r < o; r++) {
      const n = r * e + s,
        { x: a, y: h } = new y(kt(n), Dt(n)).scalarMultiply(t)
      i[r] = [r === 0 ? 'M' : 'L', a, h]
    }
    return (i[o] = ['Z']), i
  },
  getSmoothPathFromPoints: co,
  getSvgAttributes: (o) => {
    const t = ['instantiated_by_use', 'style', 'id', 'class']
    switch (o) {
      case 'linearGradient':
        return t.concat(['x1', 'y1', 'x2', 'y2', 'gradientUnits', 'gradientTransform'])
      case 'radialGradient':
        return t.concat(['gradientUnits', 'gradientTransform', 'cx', 'cy', 'r', 'fx', 'fy', 'fr'])
      case 'stop':
        return t.concat(['offset', 'stop-color', 'stop-opacity'])
    }
    return t
  },
  getUnitVector: si,
  groupSVGElements: (o, t) => (o && o.length === 1 ? o[0] : new dt(o, t)),
  hasStyleChanged: ni,
  invertTransform: ht,
  isBetweenVectors: Di,
  isIdentityMatrix: hn,
  isTouchEvent: Is,
  isTransparent: Gn,
  joinPath: pr,
  loadImage: is,
  magnitude: Ys,
  makeBoundingBoxFromPoints: Rt,
  makePathSimpler: so,
  matrixToSVG: cs,
  mergeClipPaths: (o, t) => {
    var e
    let s = o,
      i = t
    s.inverted && !i.inverted && ((s = t), (i = o)),
      Oi(i, (e = i.group) === null || e === void 0 ? void 0 : e.calcTransformMatrix(), s.calcTransformMatrix())
    const r = s.inverted && i.inverted
    return (
      r && (s.inverted = i.inverted = !1),
      new dt([s], {
        clipPath: i,
        inverted: r
      })
    )
  },
  multiplyTransformMatrices: V,
  multiplyTransformMatrixArray: Qs,
  parsePath: ho,
  parsePreserveAspectRatioAttribute: tr,
  parseUnit: et,
  pick: pe,
  projectStrokeOnPoints: Hn,
  qrDecompose: ge,
  radiansToDegrees: ee,
  removeFromArray: oe,
  removeTransformFromObject: (o, t) => {
    const e = ht(t),
      s = V(e, o.calcOwnMatrix())
    ke(o, s)
  },
  removeTransformMatrixForSvgParsing: Ps,
  request: lo,
  requestAnimFrame: ss,
  resetObjectTransform: vn,
  rotatePoint: (o, t, e) => o.rotate(e, t),
  rotateVector: nr,
  saveObjectTransform: sr,
  sendObjectToPlane: Oi,
  sendPointToPlane: Wt,
  sendVectorToPlane: yn,
  setStyle: Ns,
  sin: Dt,
  sizeAfterTransform: $s,
  string: xa,
  stylesFromArray: qn,
  stylesToArray: Un,
  toDataURL: Ji,
  toFixed: Y,
  transformPath: (o, t, e) => (
    e && (t = V(t, [1, 0, 0, 1, -e.x, -e.y])),
    o.map((s) => {
      const i = [...s]
      for (let r = 1; r < s.length - 1; r += 2) {
        const { x: n, y: a } = Z(
          {
            x: s[r],
            y: s[r + 1]
          },
          t
        )
        ;(i[r] = n), (i[r + 1] = a)
      }
      return i
    })
  ),
  transformPoint: Z
})
class uo extends er {
  constructor(t) {
    let { allowTouchScrolling: e = !1, containerClass: s = '' } =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(t), f(this, 'upper', void 0), f(this, 'container', void 0)
    const { el: i } = this.lower,
      r = this.createUpperCanvas()
    ;(this.upper = {
      el: r,
      ctx: r.getContext('2d')
    }),
      this.applyCanvasStyle(i, {
        allowTouchScrolling: e
      }),
      this.applyCanvasStyle(r, {
        allowTouchScrolling: e,
        styles: {
          position: 'absolute',
          left: '0',
          top: '0'
        }
      })
    const n = this.createContainerElement()
    n.classList.add(s), i.parentNode && i.parentNode.replaceChild(n, i), n.append(i, r), (this.container = n)
  }
  createUpperCanvas() {
    const { el: t } = this.lower,
      e = lt()
    return (
      (e.className = t.className),
      e.classList.remove('lower-canvas'),
      e.classList.add('upper-canvas'),
      e.setAttribute('data-fabric', 'top'),
      (e.style.cssText = t.style.cssText),
      e.setAttribute('draggable', 'true'),
      e
    )
  }
  createContainerElement() {
    const t = fe().createElement('div')
    return (
      t.setAttribute('data-fabric', 'wrapper'),
      Ns(t, {
        position: 'relative'
      }),
      Or(t),
      t
    )
  }
  applyCanvasStyle(t, e) {
    const { styles: s, allowTouchScrolling: i } = e
    Ns(
      t,
      m(
        m({}, s),
        {},
        {
          'touch-action': i ? 'manipulation' : rt
        }
      )
    ),
      Or(t)
  }
  setDimensions(t, e) {
    super.setDimensions(t, e)
    const { el: s, ctx: i } = this.upper
    fn(s, i, t, e)
  }
  setCSSDimensions(t) {
    super.setCSSDimensions(t), Si(this.upper.el, t), Si(this.container, t)
  }
  cleanupDOM(t) {
    const e = this.container,
      { el: s } = this.lower,
      { el: i } = this.upper
    super.cleanupDOM(t), e.removeChild(i), e.removeChild(s), e.parentNode && e.parentNode.replaceChild(s, e)
  }
  dispose() {
    super.dispose(), Ot().dispose(this.upper.el), delete this.upper, delete this.container
  }
}
class oi extends Fe {
  constructor() {
    super(...arguments),
      f(this, 'targets', []),
      f(this, '_hoveredTargets', []),
      f(this, '_objectsToRender', void 0),
      f(this, '_currentTransform', null),
      f(this, '_groupSelector', null),
      f(this, 'contextTopDirty', !1)
  }
  static getDefaults() {
    return m(m({}, super.getDefaults()), oi.ownDefaults)
  }
  get upperCanvasEl() {
    var t
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.el
  }
  get contextTop() {
    var t
    return (t = this.elements.upper) === null || t === void 0 ? void 0 : t.ctx
  }
  get wrapperEl() {
    return this.elements.container
  }
  initElements(t) {
    ;(this.elements = new uo(t, {
      allowTouchScrolling: this.allowTouchScrolling,
      containerClass: this.containerClass
    })),
      this._createCacheCanvas()
  }
  _onObjectAdded(t) {
    ;(this._objectsToRender = void 0), super._onObjectAdded(t)
  }
  _onObjectRemoved(t) {
    ;(this._objectsToRender = void 0),
      t === this._activeObject &&
        (this.fire('before:selection:cleared', {
          deselected: [t]
        }),
        this._discardActiveObject(),
        this.fire('selection:cleared', {
          deselected: [t]
        }),
        t.fire('deselected', {
          target: t
        })),
      t === this._hoveredTarget && ((this._hoveredTarget = void 0), (this._hoveredTargets = [])),
      super._onObjectRemoved(t)
  }
  _onStackOrderChanged() {
    ;(this._objectsToRender = void 0), super._onStackOrderChanged()
  }
  _chooseObjectsToRender() {
    const t = this._activeObject
    return !this.preserveObjectStacking && t
      ? this._objects.filter((e) => !e.group && e !== t).concat(t)
      : this._objects
  }
  renderAll() {
    this.cancelRequestedRender(),
      this.destroyed ||
        (!this.contextTopDirty ||
          this._groupSelector ||
          this.isDrawingMode ||
          (this.clearContext(this.contextTop), (this.contextTopDirty = !1)),
        this.hasLostContext && (this.renderTopLayer(this.contextTop), (this.hasLostContext = !1)),
        !this._objectsToRender && (this._objectsToRender = this._chooseObjectsToRender()),
        this.renderCanvas(this.getContext(), this._objectsToRender))
  }
  renderTopLayer(t) {
    t.save(),
      this.isDrawingMode &&
        this._isCurrentlyDrawing &&
        (this.freeDrawingBrush && this.freeDrawingBrush._render(), (this.contextTopDirty = !0)),
      this.selection && this._groupSelector && (this._drawSelection(t), (this.contextTopDirty = !0)),
      t.restore()
  }
  renderTop() {
    const t = this.contextTop
    this.clearContext(t),
      this.renderTopLayer(t),
      this.fire('after:render', {
        ctx: t
      })
  }
  setTargetFindTolerance(t) {
    ;(t = Math.round(t)), (this.targetFindTolerance = t)
    const e = this.getRetinaScaling(),
      s = Math.ceil((2 * t + 1) * e)
    ;(this.pixelFindCanvasEl.width = this.pixelFindCanvasEl.height = s), this.pixelFindContext.scale(e, e)
  }
  isTargetTransparent(t, e, s) {
    const i = this.targetFindTolerance,
      r = this.pixelFindContext
    this.clearContext(r), r.save(), r.translate(-e + i, -s + i), r.transform(...this.viewportTransform)
    const n = t.selectionBackgroundColor
    ;(t.selectionBackgroundColor = ''), t.render(r), (t.selectionBackgroundColor = n), r.restore()
    const a = Math.round(i * this.getRetinaScaling())
    return Gn(r, a, a, a)
  }
  _isSelectionKeyPressed(t) {
    const e = this.selectionKey
    return !!e && (Array.isArray(e) ? !!e.find((s) => !!s && t[s] === !0) : t[e])
  }
  _shouldClearSelection(t, e) {
    const s = this.getActiveObjects(),
      i = this._activeObject
    return !!(
      !e ||
      (e && i && s.length > 1 && s.indexOf(e) === -1 && i !== e && !this._isSelectionKeyPressed(t)) ||
      (e && !e.evented) ||
      (e && !e.selectable && i && i !== e)
    )
  }
  _shouldCenterTransform(t, e, s) {
    if (!t) return
    let i
    return (
      e === Js || e === ot || e === ft || e === as
        ? (i = this.centeredScaling || t.centeredScaling)
        : e === Ui && (i = this.centeredRotation || t.centeredRotation),
      i ? !s : s
    )
  }
  _getOriginFromCorner(t, e) {
    const s = {
      x: t.originX,
      y: t.originY
    }
    return (
      e &&
        (['ml', 'tl', 'bl'].includes(e) ? (s.x = H) : ['mr', 'tr', 'br'].includes(e) && (s.x = L),
        ['tl', 'mt', 'tr'].includes(e) ? (s.y = wi) : ['bl', 'mb', 'br'].includes(e) && (s.y = ct)),
      s
    )
  }
  _setupCurrentTransform(t, e, s) {
    var i
    const r = e.group ? Wt(this.getScenePoint(t), void 0, e.group.calcTransformMatrix()) : this.getScenePoint(t),
      { key: n = '', control: a } = e.getActiveControl() || {},
      h = s && a ? ((i = a.getActionHandler(t, e, a)) === null || i === void 0 ? void 0 : i.bind(a)) : Cn,
      c = ((d, p, v, _) => {
        if (!p || !d) return 'drag'
        const x = _.controls[p]
        return x.getActionName(v, x, _)
      })(s, n, t, e),
      l = t[this.centeredKey],
      u = this._shouldCenterTransform(e, c, l)
        ? {
            x: k,
            y: k
          }
        : this._getOriginFromCorner(e, n),
      g = {
        target: e,
        action: c,
        actionHandler: h,
        actionPerformed: !1,
        corner: n,
        scaleX: e.scaleX,
        scaleY: e.scaleY,
        skewX: e.skewX,
        skewY: e.skewY,
        offsetX: r.x - e.left,
        offsetY: r.y - e.top,
        originX: u.x,
        originY: u.y,
        ex: r.x,
        ey: r.y,
        lastX: r.x,
        lastY: r.y,
        theta: z(e.angle),
        width: e.width,
        height: e.height,
        shiftKey: t.shiftKey,
        altKey: l,
        original: m(
          m({}, sr(e)),
          {},
          {
            originX: u.x,
            originY: u.y
          }
        )
      }
    ;(this._currentTransform = g),
      this.fire('before:transform', {
        e: t,
        transform: g
      })
  }
  setCursor(t) {
    this.upperCanvasEl.style.cursor = t
  }
  _drawSelection(t) {
    const { x: e, y: s, deltaX: i, deltaY: r } = this._groupSelector,
      n = new y(e, s).transform(this.viewportTransform),
      a = new y(e + i, s + r).transform(this.viewportTransform),
      h = this.selectionLineWidth / 2
    let c = Math.min(n.x, a.x),
      l = Math.min(n.y, a.y),
      u = Math.max(n.x, a.x),
      g = Math.max(n.y, a.y)
    this.selectionColor && ((t.fillStyle = this.selectionColor), t.fillRect(c, l, u - c, g - l)),
      this.selectionLineWidth &&
        this.selectionBorderColor &&
        ((t.lineWidth = this.selectionLineWidth),
        (t.strokeStyle = this.selectionBorderColor),
        (c += h),
        (l += h),
        (u -= h),
        (g -= h),
        K.prototype._setLineDash.call(this, t, this.selectionDashArray),
        t.strokeRect(c, l, u - c, g - l))
  }
  findTarget(t) {
    if (this.skipTargetFind) return
    const e = this.getViewportPoint(t),
      s = this._activeObject,
      i = this.getActiveObjects()
    if (((this.targets = []), s && i.length >= 1)) {
      if (s.findControl(e, Is(t)) || (i.length > 1 && this.searchPossibleTargets([s], e))) return s
      if (s === this.searchPossibleTargets([s], e)) {
        if (this.preserveObjectStacking) {
          const r = this.targets
          this.targets = []
          const n = this.searchPossibleTargets(this._objects, e)
          return t[this.altSelectionKey] && n && n !== s ? ((this.targets = r), s) : n
        }
        return s
      }
    }
    return this.searchPossibleTargets(this._objects, e)
  }
  _pointIsInObjectSelectionArea(t, e) {
    let s = t.getCoords()
    const i = this.getZoom(),
      r = t.padding / i
    if (r) {
      const [n, a, h, c] = s,
        l = Math.atan2(a.y - n.y, a.x - n.x),
        u = kt(l) * r,
        g = Dt(l) * r,
        d = u + g,
        p = u - g
      s = [new y(n.x - p, n.y - d), new y(a.x + d, a.y - p), new y(h.x + p, h.y + d), new y(c.x - d, c.y + p)]
    }
    return X.isPointInPolygon(e, s)
  }
  _checkTarget(t, e) {
    return !!(
      t &&
      t.visible &&
      t.evented &&
      this._pointIsInObjectSelectionArea(t, Wt(e, void 0, this.viewportTransform)) &&
      ((!this.perPixelTargetFind && !t.perPixelTargetFind) || t.isEditing || !this.isTargetTransparent(t, e.x, e.y))
    )
  }
  _searchPossibleTargets(t, e) {
    let s = t.length
    for (; s--; ) {
      const i = t[s]
      if (this._checkTarget(i, e)) {
        if (Ds(i) && i.subTargetCheck) {
          const r = this._searchPossibleTargets(i._objects, e)
          r && this.targets.push(r)
        }
        return i
      }
    }
  }
  searchPossibleTargets(t, e) {
    const s = this._searchPossibleTargets(t, e)
    if (s && Ds(s) && s.interactive && this.targets[0]) {
      const i = this.targets
      for (let r = i.length - 1; r > 0; r--) {
        const n = i[r]
        if (!Ds(n) || !n.interactive) return n
      }
      return i[0]
    }
    return s
  }
  getViewportPoint(t) {
    return this._pointer ? this._pointer : this.getPointer(t, !0)
  }
  getScenePoint(t) {
    return this._absolutePointer ? this._absolutePointer : this.getPointer(t)
  }
  getPointer(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 && arguments[1]
    const s = this.upperCanvasEl,
      i = s.getBoundingClientRect()
    let r = pn(t),
      n = i.width || 0,
      a = i.height || 0
    ;(n && a) ||
      (ct in i && wi in i && (a = Math.abs(i.top - i.bottom)), H in i && L in i && (n = Math.abs(i.right - i.left))),
      this.calcOffset(),
      (r.x = r.x - this._offset.left),
      (r.y = r.y - this._offset.top),
      e || (r = Wt(r, void 0, this.viewportTransform))
    const h = this.getRetinaScaling()
    h !== 1 && ((r.x /= h), (r.y /= h))
    const c = n === 0 || a === 0 ? new y(1, 1) : new y(s.width / n, s.height / a)
    return r.multiply(c)
  }
  _setDimensionsImpl(t, e) {
    this._resetTransformEventData(),
      super._setDimensionsImpl(t, e),
      this._isCurrentlyDrawing && this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop)
  }
  _createCacheCanvas() {
    ;(this.pixelFindCanvasEl = lt()),
      (this.pixelFindContext = this.pixelFindCanvasEl.getContext('2d', {
        willReadFrequently: !0
      })),
      this.setTargetFindTolerance(this.targetFindTolerance)
  }
  getTopContext() {
    return this.elements.upper.ctx
  }
  getSelectionContext() {
    return this.elements.upper.ctx
  }
  getSelectionElement() {
    return this.elements.upper.el
  }
  getActiveObject() {
    return this._activeObject
  }
  getActiveObjects() {
    const t = this._activeObject
    return ae(t) ? t.getObjects() : t ? [t] : []
  }
  _fireSelectionEvents(t, e) {
    let s = !1,
      i = !1
    const r = this.getActiveObjects(),
      n = [],
      a = []
    t.forEach((h) => {
      r.includes(h) ||
        ((s = !0),
        h.fire('deselected', {
          e,
          target: h
        }),
        a.push(h))
    }),
      r.forEach((h) => {
        t.includes(h) ||
          ((s = !0),
          h.fire('selected', {
            e,
            target: h
          }),
          n.push(h))
      }),
      t.length > 0 && r.length > 0
        ? ((i = !0),
          s &&
            this.fire('selection:updated', {
              e,
              selected: n,
              deselected: a
            }))
        : r.length > 0
        ? ((i = !0),
          this.fire('selection:created', {
            e,
            selected: n
          }))
        : t.length > 0 &&
          ((i = !0),
          this.fire('selection:cleared', {
            e,
            deselected: a
          })),
      i && (this._objectsToRender = void 0)
  }
  setActiveObject(t, e) {
    const s = this.getActiveObjects(),
      i = this._setActiveObject(t, e)
    return this._fireSelectionEvents(s, e), i
  }
  _setActiveObject(t, e) {
    const s = this._activeObject
    return (
      s !== t &&
      !(!this._discardActiveObject(e, t) && this._activeObject) &&
      !t.onSelect({
        e
      }) &&
      ((this._activeObject = t), ae(t) && s !== t && t.set('canvas', this), t.setCoords(), !0)
    )
  }
  _discardActiveObject(t, e) {
    const s = this._activeObject
    return (
      !!s &&
      !s.onDeselect({
        e: t,
        object: e
      }) &&
      (this._currentTransform && this._currentTransform.target === s && this.endCurrentTransform(t),
      ae(s) && s === this._hoveredTarget && (this._hoveredTarget = void 0),
      (this._activeObject = void 0),
      !0)
    )
  }
  discardActiveObject(t) {
    const e = this.getActiveObjects(),
      s = this.getActiveObject()
    e.length &&
      this.fire('before:selection:cleared', {
        e: t,
        deselected: [s]
      })
    const i = this._discardActiveObject(t)
    return this._fireSelectionEvents(e, t), i
  }
  endCurrentTransform(t) {
    const e = this._currentTransform
    this._finalizeCurrentTransform(t), e && e.target && (e.target.isMoving = !1), (this._currentTransform = null)
  }
  _finalizeCurrentTransform(t) {
    const e = this._currentTransform,
      s = e.target,
      i = {
        e: t,
        target: s,
        transform: e,
        action: e.action
      }
    s._scaling && (s._scaling = !1),
      s.setCoords(),
      e.actionPerformed && (this.fire('object:modified', i), s.fire(Rs, i))
  }
  setViewportTransform(t) {
    super.setViewportTransform(t)
    const e = this._activeObject
    e && e.setCoords()
  }
  destroy() {
    const t = this._activeObject
    ae(t) && (t.removeAll(), t.dispose()),
      delete this._activeObject,
      super.destroy(),
      (this.pixelFindContext = null),
      (this.pixelFindCanvasEl = void 0)
  }
  clear() {
    this.discardActiveObject(), (this._activeObject = void 0), this.clearContext(this.contextTop), super.clear()
  }
  drawControls(t) {
    const e = this._activeObject
    e && e._renderControls(t)
  }
  _toObject(t, e, s) {
    const i = this._realizeGroupTransformOnObject(t),
      r = super._toObject(t, e, s)
    return t.set(i), r
  }
  _realizeGroupTransformOnObject(t) {
    const { group: e } = t
    if (e && ae(e) && this._activeObject === e) {
      const s = pe(t, ['angle', 'flipX', 'flipY', L, ot, ft, Pe, Ee, ct])
      return mn(t, e.calcOwnMatrix()), s
    }
    return {}
  }
  _setSVGObject(t, e, s) {
    const i = this._realizeGroupTransformOnObject(e)
    super._setSVGObject(t, e, s), e.set(i)
  }
}
f(oi, 'ownDefaults', {
  uniformScaling: !0,
  uniScaleKey: 'shiftKey',
  centeredScaling: !1,
  centeredRotation: !1,
  centeredKey: 'altKey',
  altActionKey: 'shiftKey',
  selection: !0,
  selectionKey: 'shiftKey',
  selectionColor: 'rgba(100, 100, 255, 0.3)',
  selectionDashArray: [],
  selectionBorderColor: 'rgba(255, 255, 255, 0.3)',
  selectionLineWidth: 1,
  selectionFullyContained: !1,
  hoverCursor: 'move',
  moveCursor: 'move',
  defaultCursor: 'default',
  freeDrawingCursor: 'crosshair',
  notAllowedCursor: 'not-allowed',
  perPixelTargetFind: !1,
  targetFindTolerance: 0,
  skipTargetFind: !1,
  stopContextMenu: !1,
  fireRightClick: !1,
  fireMiddleClick: !1,
  enablePointerEvents: !1,
  containerClass: 'canvas-container',
  preserveObjectStacking: !1
})
class eh {
  constructor(t) {
    f(this, 'targets', []), f(this, '__disposer', void 0)
    const e = () => {
        const { hiddenTextarea: i } = t.getActiveObject() || {}
        i && i.focus()
      },
      s = t.upperCanvasEl
    s.addEventListener('click', e), (this.__disposer = () => s.removeEventListener('click', e))
  }
  exitTextEditing() {
    ;(this.target = void 0),
      this.targets.forEach((t) => {
        t.isEditing && t.exitEditing()
      })
  }
  add(t) {
    this.targets.push(t)
  }
  remove(t) {
    this.unregister(t), oe(this.targets, t)
  }
  register(t) {
    this.target = t
  }
  unregister(t) {
    t === this.target && (this.target = void 0)
  }
  onMouseMove(t) {
    var e
    !((e = this.target) === null || e === void 0) && e.isEditing && this.target.updateSelectionOnMouseMove(t)
  }
  clear() {
    ;(this.targets = []), (this.target = void 0)
  }
  dispose() {
    this.clear(), this.__disposer(), delete this.__disposer
  }
}
const sh = ['target', 'oldTarget', 'fireCanvas', 'e'],
  ut = {
    passive: !1
  },
  _e = (o, t) => {
    const e = o.getViewportPoint(t),
      s = o.getScenePoint(t)
    return {
      viewportPoint: e,
      scenePoint: s,
      pointer: e,
      absolutePointer: s
    }
  },
  qt = function (o) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s]
    return o.addEventListener(...e)
  },
  pt = function (o) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) e[s - 1] = arguments[s]
    return o.removeEventListener(...e)
  },
  ih = {
    mouse: {
      in: 'over',
      out: 'out',
      targetIn: 'mouseover',
      targetOut: 'mouseout',
      canvasIn: 'mouse:over',
      canvasOut: 'mouse:out'
    },
    drag: {
      in: 'enter',
      out: 'leave',
      targetIn: 'dragenter',
      targetOut: 'dragleave',
      canvasIn: 'drag:enter',
      canvasOut: 'drag:leave'
    }
  }
class Ri extends oi {
  constructor(t) {
    super(t, arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}),
      f(this, '_isClick', void 0),
      f(this, 'textEditingManager', new eh(this)),
      [
        '_onMouseDown',
        '_onTouchStart',
        '_onMouseMove',
        '_onMouseUp',
        '_onTouchEnd',
        '_onResize',
        '_onMouseWheel',
        '_onMouseOut',
        '_onMouseEnter',
        '_onContextMenu',
        '_onDoubleClick',
        '_onDragStart',
        '_onDragEnd',
        '_onDragProgress',
        '_onDragOver',
        '_onDragEnter',
        '_onDragLeave',
        '_onDrop'
      ].forEach((e) => {
        this[e] = this[e].bind(this)
      }),
      this.addOrRemove(qt, 'add')
  }
  _getEventPrefix() {
    return this.enablePointerEvents ? 'pointer' : 'mouse'
  }
  addOrRemove(t, e) {
    const s = this.upperCanvasEl,
      i = this._getEventPrefix()
    t(dn(s), 'resize', this._onResize),
      t(s, i + 'down', this._onMouseDown),
      t(s, ''.concat(i, 'move'), this._onMouseMove, ut),
      t(s, ''.concat(i, 'out'), this._onMouseOut),
      t(s, ''.concat(i, 'enter'), this._onMouseEnter),
      t(s, 'wheel', this._onMouseWheel),
      t(s, 'contextmenu', this._onContextMenu),
      t(s, 'dblclick', this._onDoubleClick),
      t(s, 'dragstart', this._onDragStart),
      t(s, 'dragend', this._onDragEnd),
      t(s, 'dragover', this._onDragOver),
      t(s, 'dragenter', this._onDragEnter),
      t(s, 'dragleave', this._onDragLeave),
      t(s, 'drop', this._onDrop),
      this.enablePointerEvents || t(s, 'touchstart', this._onTouchStart, ut)
  }
  removeListeners() {
    this.addOrRemove(pt, 'remove')
    const t = this._getEventPrefix(),
      e = wt(this.upperCanvasEl)
    pt(e, ''.concat(t, 'up'), this._onMouseUp),
      pt(e, 'touchend', this._onTouchEnd, ut),
      pt(e, ''.concat(t, 'move'), this._onMouseMove, ut),
      pt(e, 'touchmove', this._onMouseMove, ut),
      clearTimeout(this._willAddMouseDown)
  }
  _onMouseWheel(t) {
    this.__onMouseWheel(t)
  }
  _onMouseOut(t) {
    const e = this._hoveredTarget,
      s = m(
        {
          e: t
        },
        _e(this, t)
      )
    this.fire(
      'mouse:out',
      m(
        m({}, s),
        {},
        {
          target: e
        }
      )
    ),
      (this._hoveredTarget = void 0),
      e && e.fire('mouseout', m({}, s)),
      this._hoveredTargets.forEach((i) => {
        this.fire(
          'mouse:out',
          m(
            m({}, s),
            {},
            {
              target: i
            }
          )
        ),
          i && i.fire('mouseout', m({}, s))
      }),
      (this._hoveredTargets = [])
  }
  _onMouseEnter(t) {
    this._currentTransform ||
      this.findTarget(t) ||
      (this.fire(
        'mouse:over',
        m(
          {
            e: t
          },
          _e(this, t)
        )
      ),
      (this._hoveredTarget = void 0),
      (this._hoveredTargets = []))
  }
  _onDragStart(t) {
    this._isClick = !1
    const e = this.getActiveObject()
    if (e && e.onDragStart(t)) {
      this._dragSource = e
      const s = {
        e: t,
        target: e
      }
      return (
        this.fire('dragstart', s), e.fire('dragstart', s), void qt(this.upperCanvasEl, 'drag', this._onDragProgress)
      )
    }
    Ti(t)
  }
  _renderDragEffects(t, e, s) {
    let i = !1
    const r = this._dropTarget
    r && r !== e && r !== s && (r.clearContextTop(), (i = !0)), e?.clearContextTop(), s !== e && s?.clearContextTop()
    const n = this.contextTop
    n.save(),
      n.transform(...this.viewportTransform),
      e && (n.save(), e.transform(n), e.renderDragSourceEffect(t), n.restore(), (i = !0)),
      s && (n.save(), s.transform(n), s.renderDropTargetEffect(t), n.restore(), (i = !0)),
      n.restore(),
      i && (this.contextTopDirty = !0)
  }
  _onDragEnd(t) {
    const e = !!t.dataTransfer && t.dataTransfer.dropEffect !== rt,
      s = e ? this._activeObject : void 0,
      i = {
        e: t,
        target: this._dragSource,
        subTargets: this.targets,
        dragSource: this._dragSource,
        didDrop: e,
        dropTarget: s
      }
    pt(this.upperCanvasEl, 'drag', this._onDragProgress),
      this.fire('dragend', i),
      this._dragSource && this._dragSource.fire('dragend', i),
      delete this._dragSource,
      this._onMouseUp(t)
  }
  _onDragProgress(t) {
    const e = {
      e: t,
      target: this._dragSource,
      dragSource: this._dragSource,
      dropTarget: this._draggedoverTarget
    }
    this.fire('drag', e), this._dragSource && this._dragSource.fire('drag', e)
  }
  findDragTargets(t) {
    return (
      (this.targets = []),
      {
        target: this._searchPossibleTargets(this._objects, this.getViewportPoint(t)),
        targets: [...this.targets]
      }
    )
  }
  _onDragOver(t) {
    const e = 'dragover',
      { target: s, targets: i } = this.findDragTargets(t),
      r = this._dragSource,
      n = {
        e: t,
        target: s,
        subTargets: i,
        dragSource: r,
        canDrop: !1,
        dropTarget: void 0
      }
    let a
    this.fire(e, n), this._fireEnterLeaveEvents(s, n), s && (s.canDrop(t) && (a = s), s.fire(e, n))
    for (let h = 0; h < i.length; h++) {
      const c = i[h]
      c.canDrop(t) && (a = c), c.fire(e, n)
    }
    this._renderDragEffects(t, r, a), (this._dropTarget = a)
  }
  _onDragEnter(t) {
    const { target: e, targets: s } = this.findDragTargets(t),
      i = {
        e: t,
        target: e,
        subTargets: s,
        dragSource: this._dragSource
      }
    this.fire('dragenter', i), this._fireEnterLeaveEvents(e, i)
  }
  _onDragLeave(t) {
    const e = {
      e: t,
      target: this._draggedoverTarget,
      subTargets: this.targets,
      dragSource: this._dragSource
    }
    this.fire('dragleave', e),
      this._fireEnterLeaveEvents(void 0, e),
      this._renderDragEffects(t, this._dragSource),
      (this._dropTarget = void 0),
      (this.targets = []),
      (this._hoveredTargets = [])
  }
  _onDrop(t) {
    const { target: e, targets: s } = this.findDragTargets(t),
      i = this._basicEventHandler(
        'drop:before',
        m(
          {
            e: t,
            target: e,
            subTargets: s,
            dragSource: this._dragSource
          },
          _e(this, t)
        )
      )
    ;(i.didDrop = !1), (i.dropTarget = void 0), this._basicEventHandler('drop', i), this.fire('drop:after', i)
  }
  _onContextMenu(t) {
    const e = this.findTarget(t),
      s = this.targets || [],
      i = this._basicEventHandler('contextmenu:before', {
        e: t,
        target: e,
        subTargets: s
      })
    return this.stopContextMenu && Ti(t), this._basicEventHandler('contextmenu', i), !1
  }
  _onDoubleClick(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, 'dblclick'), this._resetTransformEventData()
  }
  getPointerId(t) {
    const e = t.changedTouches
    return e ? e[0] && e[0].identifier : this.enablePointerEvents ? t.pointerId : -1
  }
  _isMainEvent(t) {
    return (
      t.isPrimary === !0 ||
      (t.isPrimary !== !1 &&
        ((t.type === 'touchend' && t.touches.length === 0) ||
          !t.changedTouches ||
          t.changedTouches[0].identifier === this.mainTouchId))
    )
  }
  _onTouchStart(t) {
    let e = !this.allowTouchScrolling
    const s = this._activeObject
    this.mainTouchId === void 0 && (this.mainTouchId = this.getPointerId(t)),
      this.__onMouseDown(t),
      (this.isDrawingMode || (s && this._target === s)) && (e = !0),
      e && t.preventDefault(),
      this._resetTransformEventData()
    const i = this.upperCanvasEl,
      r = this._getEventPrefix(),
      n = wt(i)
    qt(n, 'touchend', this._onTouchEnd, ut),
      e && qt(n, 'touchmove', this._onMouseMove, ut),
      pt(i, ''.concat(r, 'down'), this._onMouseDown)
  }
  _onMouseDown(t) {
    this.__onMouseDown(t), this._resetTransformEventData()
    const e = this.upperCanvasEl,
      s = this._getEventPrefix()
    pt(e, ''.concat(s, 'move'), this._onMouseMove, ut)
    const i = wt(e)
    qt(i, ''.concat(s, 'up'), this._onMouseUp), qt(i, ''.concat(s, 'move'), this._onMouseMove, ut)
  }
  _onTouchEnd(t) {
    if (t.touches.length > 0) return
    this.__onMouseUp(t), this._resetTransformEventData(), delete this.mainTouchId
    const e = this._getEventPrefix(),
      s = wt(this.upperCanvasEl)
    pt(s, 'touchend', this._onTouchEnd, ut),
      pt(s, 'touchmove', this._onMouseMove, ut),
      this._willAddMouseDown && clearTimeout(this._willAddMouseDown),
      (this._willAddMouseDown = setTimeout(() => {
        qt(this.upperCanvasEl, ''.concat(e, 'down'), this._onMouseDown), (this._willAddMouseDown = 0)
      }, 400))
  }
  _onMouseUp(t) {
    this.__onMouseUp(t), this._resetTransformEventData()
    const e = this.upperCanvasEl,
      s = this._getEventPrefix()
    if (this._isMainEvent(t)) {
      const i = wt(this.upperCanvasEl)
      pt(i, ''.concat(s, 'up'), this._onMouseUp),
        pt(i, ''.concat(s, 'move'), this._onMouseMove, ut),
        qt(e, ''.concat(s, 'move'), this._onMouseMove, ut)
    }
  }
  _onMouseMove(t) {
    const e = this.getActiveObject()
    !this.allowTouchScrolling && (!e || !e.shouldStartDragging(t)) && t.preventDefault && t.preventDefault(),
      this.__onMouseMove(t)
  }
  _onResize() {
    this.calcOffset(), this._resetTransformEventData()
  }
  _shouldRender(t) {
    const e = this.getActiveObject()
    return !!e != !!t || (e && t && e !== t)
  }
  __onMouseUp(t) {
    var e
    this._cacheTransformEventData(t), this._handleEvent(t, 'up:before')
    const s = this._currentTransform,
      i = this._isClick,
      r = this._target,
      { button: n } = t
    if (n)
      return (
        ((this.fireMiddleClick && n === 1) || (this.fireRightClick && n === 2)) && this._handleEvent(t, 'up'),
        void this._resetTransformEventData()
      )
    if (this.isDrawingMode && this._isCurrentlyDrawing) return void this._onMouseUpInDrawingMode(t)
    if (!this._isMainEvent(t)) return
    let a,
      h,
      c = !1
    if ((s && (this._finalizeCurrentTransform(t), (c = s.actionPerformed)), !i)) {
      const l = r === this._activeObject
      this.handleSelection(t), c || (c = this._shouldRender(r) || (!l && r === this._activeObject))
    }
    if (r) {
      const l = r.findControl(this.getViewportPoint(t), Is(t)),
        { key: u, control: g } = l || {}
      if (((h = u), r.selectable && r !== this._activeObject && r.activeOn === 'up'))
        this.setActiveObject(r, t), (c = !0)
      else if (g) {
        const d = g.getMouseUpHandler(t, r, g)
        d && ((a = this.getScenePoint(t)), d.call(g, t, s, a.x, a.y))
      }
      r.isMoving = !1
    }
    if (s && (s.target !== r || s.corner !== h)) {
      const l = s.target && s.target.controls[s.corner],
        u = l && l.getMouseUpHandler(t, s.target, l)
      ;(a = a || this.getScenePoint(t)), u && u.call(l, t, s, a.x, a.y)
    }
    this._setCursorFromEvent(t, r),
      this._handleEvent(t, 'up'),
      (this._groupSelector = null),
      (this._currentTransform = null),
      r && (r.__corner = void 0),
      c
        ? this.requestRenderAll()
        : i || ((e = this._activeObject) !== null && e !== void 0 && e.isEditing) || this.renderTop()
  }
  _basicEventHandler(t, e) {
    const { target: s, subTargets: i = [] } = e
    this.fire(t, e), s && s.fire(t, e)
    for (let r = 0; r < i.length; r++) i[r] !== s && i[r].fire(t, e)
    return e
  }
  _handleEvent(t, e) {
    const s = this._target,
      i = this.targets || [],
      r = m(
        m(
          {
            e: t,
            target: s,
            subTargets: i
          },
          _e(this, t)
        ),
        {},
        {
          transform: this._currentTransform
        },
        e === 'up:before' || e === 'up'
          ? {
              isClick: this._isClick,
              currentTarget: this.findTarget(t),
              currentSubTargets: this.targets
            }
          : {}
      )
    this.fire('mouse:'.concat(e), r), s && s.fire('mouse'.concat(e), r)
    for (let n = 0; n < i.length; n++) i[n] !== s && i[n].fire('mouse'.concat(e), r)
  }
  _onMouseDownInDrawingMode(t) {
    ;(this._isCurrentlyDrawing = !0), this.getActiveObject() && (this.discardActiveObject(t), this.requestRenderAll())
    const e = this.getScenePoint(t)
    this.freeDrawingBrush &&
      this.freeDrawingBrush.onMouseDown(e, {
        e: t,
        pointer: e
      }),
      this._handleEvent(t, 'down')
  }
  _onMouseMoveInDrawingMode(t) {
    if (this._isCurrentlyDrawing) {
      const e = this.getScenePoint(t)
      this.freeDrawingBrush &&
        this.freeDrawingBrush.onMouseMove(e, {
          e: t,
          pointer: e
        })
    }
    this.setCursor(this.freeDrawingCursor), this._handleEvent(t, 'move')
  }
  _onMouseUpInDrawingMode(t) {
    const e = this.getScenePoint(t)
    this.freeDrawingBrush
      ? (this._isCurrentlyDrawing = !!this.freeDrawingBrush.onMouseUp({
          e: t,
          pointer: e
        }))
      : (this._isCurrentlyDrawing = !1),
      this._handleEvent(t, 'up')
  }
  __onMouseDown(t) {
    ;(this._isClick = !0), this._cacheTransformEventData(t), this._handleEvent(t, 'down:before')
    let e = this._target
    const { button: s } = t
    if (s)
      return (
        ((this.fireMiddleClick && s === 1) || (this.fireRightClick && s === 2)) && this._handleEvent(t, 'down'),
        void this._resetTransformEventData()
      )
    if (this.isDrawingMode) return void this._onMouseDownInDrawingMode(t)
    if (!this._isMainEvent(t) || this._currentTransform) return
    let i = this._shouldRender(e),
      r = !1
    if (
      (this.handleMultiSelection(t, e)
        ? ((e = this._activeObject), (r = !0), (i = !0))
        : this._shouldClearSelection(t, e) && this.discardActiveObject(t),
      this.selection && (!e || (!e.selectable && !e.isEditing && e !== this._activeObject)))
    ) {
      const n = this.getScenePoint(t)
      this._groupSelector = {
        x: n.x,
        y: n.y,
        deltaY: 0,
        deltaX: 0
      }
    }
    if (e) {
      const n = e === this._activeObject
      e.selectable && e.activeOn === 'down' && this.setActiveObject(e, t)
      const a = e.findControl(this.getViewportPoint(t), Is(t))
      if (e === this._activeObject && (a || !r)) {
        this._setupCurrentTransform(t, e, n)
        const h = a ? a.control : void 0,
          c = this.getScenePoint(t),
          l = h && h.getMouseDownHandler(t, e, h)
        l && l.call(h, t, this._currentTransform, c.x, c.y)
      }
    }
    i && (this._objectsToRender = void 0), this._handleEvent(t, 'down'), i && this.requestRenderAll()
  }
  _resetTransformEventData() {
    this._target = this._pointer = this._absolutePointer = void 0
  }
  _cacheTransformEventData(t) {
    this._resetTransformEventData(),
      (this._pointer = this.getViewportPoint(t)),
      (this._absolutePointer = Wt(this._pointer, void 0, this.viewportTransform)),
      (this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(t))
  }
  __onMouseMove(t) {
    if (
      ((this._isClick = !1), this._cacheTransformEventData(t), this._handleEvent(t, 'move:before'), this.isDrawingMode)
    )
      return void this._onMouseMoveInDrawingMode(t)
    if (!this._isMainEvent(t)) return
    const e = this._groupSelector
    if (e) {
      const s = this.getScenePoint(t)
      ;(e.deltaX = s.x - e.x), (e.deltaY = s.y - e.y), this.renderTop()
    } else if (this._currentTransform) this._transformObject(t)
    else {
      const s = this.findTarget(t)
      this._setCursorFromEvent(t, s), this._fireOverOutEvents(t, s)
    }
    this.textEditingManager.onMouseMove(t), this._handleEvent(t, 'move'), this._resetTransformEventData()
  }
  _fireOverOutEvents(t, e) {
    const s = this._hoveredTarget,
      i = this._hoveredTargets,
      r = this.targets,
      n = Math.max(i.length, r.length)
    this.fireSyntheticInOutEvents('mouse', {
      e: t,
      target: e,
      oldTarget: s,
      fireCanvas: !0
    })
    for (let a = 0; a < n; a++)
      this.fireSyntheticInOutEvents('mouse', {
        e: t,
        target: r[a],
        oldTarget: i[a]
      })
    ;(this._hoveredTarget = e), (this._hoveredTargets = this.targets.concat())
  }
  _fireEnterLeaveEvents(t, e) {
    const s = this._draggedoverTarget,
      i = this._hoveredTargets,
      r = this.targets,
      n = Math.max(i.length, r.length)
    this.fireSyntheticInOutEvents(
      'drag',
      m(
        m({}, e),
        {},
        {
          target: t,
          oldTarget: s,
          fireCanvas: !0
        }
      )
    )
    for (let a = 0; a < n; a++)
      this.fireSyntheticInOutEvents(
        'drag',
        m(
          m({}, e),
          {},
          {
            target: r[a],
            oldTarget: i[a]
          }
        )
      )
    this._draggedoverTarget = t
  }
  fireSyntheticInOutEvents(t, e) {
    let { target: s, oldTarget: i, fireCanvas: r, e: n } = e,
      a = W(e, sh)
    const { targetIn: h, targetOut: c, canvasIn: l, canvasOut: u } = ih[t],
      g = i !== s
    if (i && g) {
      const d = m(
        m({}, a),
        {},
        {
          e: n,
          target: i,
          nextTarget: s
        },
        _e(this, n)
      )
      r && this.fire(u, d), i.fire(c, d)
    }
    if (s && g) {
      const d = m(
        m({}, a),
        {},
        {
          e: n,
          target: s,
          previousTarget: i
        },
        _e(this, n)
      )
      r && this.fire(l, d), s.fire(h, d)
    }
  }
  __onMouseWheel(t) {
    this._cacheTransformEventData(t), this._handleEvent(t, 'wheel'), this._resetTransformEventData()
  }
  _transformObject(t) {
    const e = this.getScenePoint(t),
      s = this._currentTransform,
      i = s.target,
      r = i.group ? Wt(e, void 0, i.group.calcTransformMatrix()) : e
    ;(s.shiftKey = t.shiftKey),
      (s.altKey = !!this.centeredKey && t[this.centeredKey]),
      this._performTransformAction(t, s, r),
      s.actionPerformed && this.requestRenderAll()
  }
  _performTransformAction(t, e, s) {
    const { action: i, actionHandler: r, target: n } = e,
      a = !!r && r(t, e, s.x, s.y)
    a && n.setCoords(),
      i === 'drag' && a && ((e.target.isMoving = !0), this.setCursor(e.target.moveCursor || this.moveCursor)),
      (e.actionPerformed = e.actionPerformed || a)
  }
  _setCursorFromEvent(t, e) {
    if (!e) return void this.setCursor(this.defaultCursor)
    let s = e.hoverCursor || this.hoverCursor
    const i = ae(this._activeObject) ? this._activeObject : null,
      r = (!i || e.group !== i) && e.findControl(this.getViewportPoint(t))
    if (r) {
      const n = r.control
      this.setCursor(n.cursorStyleHandler(t, n, e))
    } else
      e.subTargetCheck &&
        this.targets
          .concat()
          .reverse()
          .map((n) => {
            s = n.hoverCursor || s
          }),
        this.setCursor(s)
  }
  handleMultiSelection(t, e) {
    const s = this._activeObject,
      i = ae(s)
    if (
      s &&
      this._isSelectionKeyPressed(t) &&
      this.selection &&
      e &&
      e.selectable &&
      (s !== e || i) &&
      (i || (!e.isDescendantOf(s) && !s.isDescendantOf(e))) &&
      !e.onSelect({
        e: t
      }) &&
      !s.getActiveControl()
    ) {
      if (i) {
        const r = s.getObjects()
        if (e === s) {
          const n = this.getViewportPoint(t)
          if (!(e = this.searchPossibleTargets(r, n) || this.searchPossibleTargets(this._objects, n)) || !e.selectable)
            return !1
        }
        e.group === s
          ? (s.remove(e),
            (this._hoveredTarget = e),
            (this._hoveredTargets = [...this.targets]),
            s.size() === 1 && this._setActiveObject(s.item(0), t))
          : (s.multiSelectAdd(e), (this._hoveredTarget = s), (this._hoveredTargets = [...this.targets])),
          this._fireSelectionEvents(r, t)
      } else {
        s.isEditing && s.exitEditing()
        const r = new (w.getClass('ActiveSelection'))([], {
          canvas: this
        })
        r.multiSelectAdd(s, e),
          (this._hoveredTarget = r),
          this._setActiveObject(r, t),
          this._fireSelectionEvents([s], t)
      }
      return !0
    }
    return !1
  }
  handleSelection(t) {
    if (!this.selection || !this._groupSelector) return !1
    const { x: e, y: s, deltaX: i, deltaY: r } = this._groupSelector,
      n = new y(e, s),
      a = n.add(new y(i, r)),
      h = n.min(a),
      c = n.max(a).subtract(h),
      l = this.collectObjects(
        {
          left: h.x,
          top: h.y,
          width: c.x,
          height: c.y
        },
        {
          includeIntersecting: !this.selectionFullyContained
        }
      ),
      u = n.eq(a)
        ? l[0]
          ? [l[0]]
          : []
        : l.length > 1
        ? l
            .filter(
              (g) =>
                !g.onSelect({
                  e: t
                })
            )
            .reverse()
        : l
    if (u.length === 1) this.setActiveObject(u[0], t)
    else if (u.length > 1) {
      const g = w.getClass('ActiveSelection')
      this.setActiveObject(
        new g(u, {
          canvas: this
        }),
        t
      )
    }
    return (this._groupSelector = null), !0
  }
  clear() {
    this.textEditingManager.clear(), super.clear()
  }
  destroy() {
    this.removeListeners(), this.textEditingManager.dispose(), super.destroy()
  }
}
const go = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  },
  rh = m(
    m({}, go),
    {},
    {
      r1: 0,
      r2: 0
    }
  ),
  Ce = (o, t) => (isNaN(o) && typeof t == 'number' ? t : o),
  nh = /^(\d+\.\d+)%|(\d+)%$/
function fo(o) {
  return o && nh.test(o)
}
function po(o, t) {
  const e = typeof o == 'number' ? o : typeof o == 'string' ? parseFloat(o) / (fo(o) ? 100 : 1) : NaN
  return de(0, Ce(e, t), 1)
}
const oh = /\s*;\s*/,
  ah = /\s*:\s*/
function hh(o, t) {
  let e, s
  const i = o.getAttribute('style')
  if (i) {
    const n = i.split(oh)
    n[n.length - 1] === '' && n.pop()
    for (let a = n.length; a--; ) {
      const [h, c] = n[a].split(ah).map((l) => l.trim())
      h === 'stop-color' ? (e = c) : h === 'stop-opacity' && (s = c)
    }
  }
  const r = new j(e || o.getAttribute('stop-color') || 'rgb(0,0,0)')
  return {
    offset: po(o.getAttribute('offset'), 0),
    color: r.toRgb(),
    opacity: Ce(parseFloat(s || o.getAttribute('stop-opacity') || ''), 1) * r.getAlpha() * t
  }
}
function ch(o, t) {
  const e = [],
    s = o.getElementsByTagName('stop'),
    i = po(t, 1)
  for (let r = s.length; r--; ) e.push(hh(s[r], i))
  return e
}
function mo(o) {
  return o.nodeName === 'linearGradient' || o.nodeName === 'LINEARGRADIENT' ? 'linear' : 'radial'
}
function vo(o) {
  return o.getAttribute('gradientUnits') === 'userSpaceOnUse' ? 'pixels' : 'percentage'
}
function Ct(o, t) {
  return o.getAttribute(t)
}
function lh(o, t) {
  return (function (e, s) {
    let i,
      { width: r, height: n, gradientUnits: a } = s
    return Object.keys(e).reduce((h, c) => {
      const l = e[c]
      return (
        l === 'Infinity'
          ? (i = 1)
          : l === '-Infinity'
          ? (i = 0)
          : ((i = typeof l == 'string' ? parseFloat(l) : l),
            typeof l == 'string' &&
              fo(l) &&
              ((i *= 0.01),
              a === 'pixels' &&
                ((c !== 'x1' && c !== 'x2' && c !== 'r2') || (i *= r), (c !== 'y1' && c !== 'y2') || (i *= n)))),
        (h[c] = i),
        h
      )
    }, {})
  })(
    mo(o) === 'linear'
      ? (function (e) {
          return {
            x1: Ct(e, 'x1') || 0,
            y1: Ct(e, 'y1') || 0,
            x2: Ct(e, 'x2') || '100%',
            y2: Ct(e, 'y2') || 0
          }
        })(o)
      : (function (e) {
          return {
            x1: Ct(e, 'fx') || Ct(e, 'cx') || '50%',
            y1: Ct(e, 'fy') || Ct(e, 'cy') || '50%',
            r1: 0,
            x2: Ct(e, 'cx') || '50%',
            y2: Ct(e, 'cy') || '50%',
            r2: Ct(e, 'r') || '50%'
          }
        })(o),
    m(
      m({}, t),
      {},
      {
        gradientUnits: vo(o)
      }
    )
  )
}
class be {
  constructor(t) {
    const {
      type: e = 'linear',
      gradientUnits: s = 'pixels',
      coords: i = {},
      colorStops: r = [],
      offsetX: n = 0,
      offsetY: a = 0,
      gradientTransform: h,
      id: c
    } = t || {}
    Object.assign(this, {
      type: e,
      gradientUnits: s,
      coords: m(m({}, e === 'radial' ? rh : go), i),
      colorStops: r,
      offsetX: n,
      offsetY: a,
      gradientTransform: h,
      id: c ? ''.concat(c, '_').concat(te()) : te()
    })
  }
  addColorStop(t) {
    for (const e in t) {
      const s = new j(t[e])
      this.colorStops.push({
        offset: parseFloat(e),
        color: s.toRgb(),
        opacity: s.getAlpha()
      })
    }
    return this
  }
  toObject(t) {
    return m(
      m({}, pe(this, t)),
      {},
      {
        type: this.type,
        coords: m({}, this.coords),
        colorStops: this.colorStops.map((e) => m({}, e)),
        offsetX: this.offsetX,
        offsetY: this.offsetY,
        gradientUnits: this.gradientUnits,
        gradientTransform: this.gradientTransform ? [...this.gradientTransform] : void 0
      }
    )
  }
  toSVG(t) {
    let { additionalTransform: e } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const s = [],
      i = this.gradientTransform ? this.gradientTransform.concat() : $.concat(),
      r = this.gradientUnits === 'pixels' ? 'userSpaceOnUse' : 'objectBoundingBox',
      n = this.colorStops.map((u) => m({}, u)).sort((u, g) => u.offset - g.offset)
    let a = -this.offsetX,
      h = -this.offsetY
    var c
    r === 'objectBoundingBox' ? ((a /= t.width), (h /= t.height)) : ((a += t.width / 2), (h += t.height / 2)),
      (c = t) &&
        typeof c._renderPathCommands == 'function' &&
        this.gradientUnits !== 'percentage' &&
        ((a -= t.pathOffset.x), (h -= t.pathOffset.y)),
      (i[4] -= a),
      (i[5] -= h)
    const l = [
      'id="SVGID_'.concat(this.id, '"'),
      'gradientUnits="'.concat(r, '"'),
      'gradientTransform="'.concat(e ? e + ' ' : '').concat(cs(i), '"'),
      ''
    ].join(' ')
    if (this.type === 'linear') {
      const { x1: u, y1: g, x2: d, y2: p } = this.coords
      s.push(
        '<linearGradient ',
        l,
        ' x1="',
        u,
        '" y1="',
        g,
        '" x2="',
        d,
        '" y2="',
        p,
        `">
`
      )
    } else if (this.type === 'radial') {
      const { x1: u, y1: g, x2: d, y2: p, r1: v, r2: _ } = this.coords,
        x = v > _
      s.push(
        '<radialGradient ',
        l,
        ' cx="',
        x ? u : d,
        '" cy="',
        x ? g : p,
        '" r="',
        x ? v : _,
        '" fx="',
        x ? d : u,
        '" fy="',
        x ? p : g,
        `">
`
      ),
        x &&
          (n.reverse(),
          n.forEach((b) => {
            b.offset = 1 - b.offset
          }))
      const C = Math.min(v, _)
      if (C > 0) {
        const b = C / Math.max(v, _)
        n.forEach((S) => {
          S.offset += b * (1 - S.offset)
        })
      }
    }
    return (
      n.forEach((u) => {
        let { color: g, offset: d, opacity: p } = u
        s.push(
          '<stop ',
          'offset="',
          100 * d + '%',
          '" style="stop-color:',
          g,
          p !== void 0 ? ';stop-opacity: ' + p : ';',
          `"/>
`
        )
      }),
      s.push(
        this.type === 'linear' ? '</linearGradient>' : '</radialGradient>',
        `
`
      ),
      s.join('')
    )
  }
  toLive(t) {
    const { x1: e, y1: s, x2: i, y2: r, r1: n, r2: a } = this.coords,
      h = this.type === 'linear' ? t.createLinearGradient(e, s, i, r) : t.createRadialGradient(e, s, n, i, r, a)
    return (
      this.colorStops.forEach((c) => {
        let { color: l, opacity: u, offset: g } = c
        h.addColorStop(g, u !== void 0 ? new j(l).setAlpha(u).toRgba() : l)
      }),
      h
    )
  }
  static async fromObject(t) {
    const { colorStops: e, gradientTransform: s } = t
    return new this(
      m(
        m({}, t),
        {},
        {
          colorStops: e ? e.map((i) => m({}, i)) : void 0,
          gradientTransform: s ? [...s] : void 0
        }
      )
    )
  }
  static fromElement(t, e, s) {
    const i = vo(t),
      r = e._findCenterFromElement()
    return new this(
      m(
        {
          id: t.getAttribute('id') || void 0,
          type: mo(t),
          coords: lh(t, {
            width: s.viewBoxWidth || s.width,
            height: s.viewBoxHeight || s.height
          }),
          colorStops: ch(t, s.opacity),
          gradientUnits: i,
          gradientTransform: us(t.getAttribute('gradientTransform') || '')
        },
        i === 'pixels'
          ? {
              offsetX: e.width / 2 - r.x,
              offsetY: e.height / 2 - r.y
            }
          : {
              offsetX: 0,
              offsetY: 0
            }
      )
    )
  }
}
f(be, 'type', 'Gradient'), w.setClass(be, 'gradient'), w.setClass(be, 'linear'), w.setClass(be, 'radial')
const uh = ['type', 'source', 'patternTransform']
class rs {
  get type() {
    return 'pattern'
  }
  set type(t) {
    Vt('warn', 'Setting type has no effect', t)
  }
  constructor(t) {
    f(this, 'repeat', 'repeat'),
      f(this, 'offsetX', 0),
      f(this, 'offsetY', 0),
      f(this, 'crossOrigin', ''),
      (this.id = te()),
      Object.assign(this, t)
  }
  isImageSource() {
    return !!this.source && typeof this.source.src == 'string'
  }
  isCanvasSource() {
    return !!this.source && !!this.source.toDataURL
  }
  sourceToString() {
    return this.isImageSource() ? this.source.src : this.isCanvasSource() ? this.source.toDataURL() : ''
  }
  toLive(t) {
    return this.source &&
      (!this.isImageSource() ||
        (this.source.complete && this.source.naturalWidth !== 0 && this.source.naturalHeight !== 0))
      ? t.createPattern(this.source, this.repeat)
      : null
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    const { repeat: e, crossOrigin: s } = this
    return m(
      m({}, pe(this, t)),
      {},
      {
        type: 'pattern',
        source: this.sourceToString(),
        repeat: e,
        crossOrigin: s,
        offsetX: Y(this.offsetX, E.NUM_FRACTION_DIGITS),
        offsetY: Y(this.offsetY, E.NUM_FRACTION_DIGITS),
        patternTransform: this.patternTransform ? [...this.patternTransform] : null
      }
    )
  }
  toSVG(t) {
    let { width: e, height: s } = t
    const { source: i, repeat: r, id: n } = this,
      a = Ce(this.offsetX / e, 0),
      h = Ce(this.offsetY / s, 0),
      c = r === 'repeat-y' || r === 'no-repeat' ? 1 + Math.abs(a || 0) : Ce(i.width / e, 0),
      l = r === 'repeat-x' || r === 'no-repeat' ? 1 + Math.abs(h || 0) : Ce(i.height / s, 0)
    return [
      '<pattern id="SVGID_'
        .concat(n, '" x="')
        .concat(a, '" y="')
        .concat(h, '" width="')
        .concat(c, '" height="')
        .concat(l, '">'),
      '<image x="0" y="0" width="'
        .concat(i.width, '" height="')
        .concat(i.height, '" xlink:href="')
        .concat(this.sourceToString(), '"></image>'),
      '</pattern>',
      ''
    ].join(`
`)
  }
  static async fromObject(t, e) {
    let { type: s, source: i, patternTransform: r } = t,
      n = W(t, uh)
    const a = await is(
      i,
      m(
        m({}, e),
        {},
        {
          crossOrigin: n.crossOrigin
        }
      )
    )
    return new this(
      m(
        m({}, n),
        {},
        {
          patternTransform: r && r.slice(0),
          source: a
        }
      )
    )
  }
}
f(rs, 'type', 'Pattern'), w.setClass(rs), w.setClass(rs, 'pattern')
class ai {
  constructor(t) {
    f(this, 'color', 'rgb(0, 0, 0)'),
      f(this, 'width', 1),
      f(this, 'shadow', null),
      f(this, 'strokeLineCap', 'round'),
      f(this, 'strokeLineJoin', 'round'),
      f(this, 'strokeMiterLimit', 10),
      f(this, 'strokeDashArray', null),
      f(this, 'limitedToCanvasSize', !1),
      (this.canvas = t)
  }
  _setBrushStyles(t) {
    ;(t.strokeStyle = this.color),
      (t.lineWidth = this.width),
      (t.lineCap = this.strokeLineCap),
      (t.miterLimit = this.strokeMiterLimit),
      (t.lineJoin = this.strokeLineJoin),
      t.setLineDash(this.strokeDashArray || [])
  }
  _saveAndTransform(t) {
    const e = this.canvas.viewportTransform
    t.save(), t.transform(e[0], e[1], e[2], e[3], e[4], e[5])
  }
  needsFullRender() {
    return new j(this.color).getAlpha() < 1 || !!this.shadow
  }
  _setShadow() {
    if (!this.shadow || !this.canvas) return
    const t = this.canvas,
      e = this.shadow,
      s = t.contextTop,
      i = t.getZoom() * t.getRetinaScaling()
    ;(s.shadowColor = e.color),
      (s.shadowBlur = e.blur * i),
      (s.shadowOffsetX = e.offsetX * i),
      (s.shadowOffsetY = e.offsetY * i)
  }
  _resetShadow() {
    const t = this.canvas.contextTop
    ;(t.shadowColor = ''), (t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0)
  }
  _isOutSideCanvas(t) {
    return t.x < 0 || t.x > this.canvas.getWidth() || t.y < 0 || t.y > this.canvas.getHeight()
  }
}
const gh = ['path', 'left', 'top'],
  dh = ['d']
class Xt extends K {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      { path: s, left: i, top: r } = e,
      n = W(e, gh)
    super(),
      Object.assign(this, Xt.ownDefaults),
      this.setOptions(n),
      this._setPath(t || [], !0),
      typeof i == 'number' && this.set(L, i),
      typeof r == 'number' && this.set(ct, r)
  }
  _setPath(t, e) {
    ;(this.path = so(Array.isArray(t) ? t : ho(t))), this.setBoundingBox(e)
  }
  _findCenterFromElement() {
    const t = this._calcBoundsFromPath()
    return new y(t.left + t.width / 2, t.top + t.height / 2)
  }
  _renderPathCommands(t) {
    const e = -this.pathOffset.x,
      s = -this.pathOffset.y
    t.beginPath()
    for (const i of this.path)
      switch (i[0]) {
        case 'L':
          t.lineTo(i[1] + e, i[2] + s)
          break
        case 'M':
          t.moveTo(i[1] + e, i[2] + s)
          break
        case 'C':
          t.bezierCurveTo(i[1] + e, i[2] + s, i[3] + e, i[4] + s, i[5] + e, i[6] + s)
          break
        case 'Q':
          t.quadraticCurveTo(i[1] + e, i[2] + s, i[3] + e, i[4] + s)
          break
        case 'Z':
          t.closePath()
      }
  }
  _render(t) {
    this._renderPathCommands(t), this._renderPaintInOrder(t)
  }
  toString() {
    return '#<Path ('.concat(this.complexity(), '): { "top": ').concat(this.top, ', "left": ').concat(this.left, ' }>')
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return m(
      m({}, super.toObject(t)),
      {},
      {
        path: this.path.map((e) => e.slice())
      }
    )
  }
  toDatalessObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    const e = this.toObject(t)
    return this.sourcePath && (delete e.path, (e.sourcePath = this.sourcePath)), e
  }
  _toSVG() {
    const t = pr(this.path, E.NUM_FRACTION_DIGITS)
    return [
      '<path ',
      'COMMON_PARTS',
      'd="'.concat(
        t,
        `" stroke-linecap="round" />
`
      )
    ]
  }
  _getOffsetTransform() {
    const t = E.NUM_FRACTION_DIGITS
    return ' translate('.concat(Y(-this.pathOffset.x, t), ', ').concat(Y(-this.pathOffset.y, t), ')')
  }
  toClipPathSVG(t) {
    const e = this._getOffsetTransform()
    return (
      '	' +
      this._createBaseClipPathSVGMarkup(this._toSVG(), {
        reviver: t,
        additionalTransform: e
      })
    )
  }
  toSVG(t) {
    const e = this._getOffsetTransform()
    return this._createBaseSVGMarkup(this._toSVG(), {
      reviver: t,
      additionalTransform: e
    })
  }
  complexity() {
    return this.path.length
  }
  setDimensions() {
    this.setBoundingBox()
  }
  setBoundingBox(t) {
    const { width: e, height: s, pathOffset: i } = this._calcDimensions()
    this.set({
      width: e,
      height: s,
      pathOffset: i
    }),
      t && this.setPositionByOrigin(i, k, k)
  }
  _calcBoundsFromPath() {
    const t = []
    let e = 0,
      s = 0,
      i = 0,
      r = 0
    for (const n of this.path)
      switch (n[0]) {
        case 'L':
          ;(i = n[1]),
            (r = n[2]),
            t.push(
              {
                x: e,
                y: s
              },
              {
                x: i,
                y: r
              }
            )
          break
        case 'M':
          ;(i = n[1]), (r = n[2]), (e = i), (s = r)
          break
        case 'C':
          t.push(...Li(i, r, n[1], n[2], n[3], n[4], n[5], n[6])), (i = n[5]), (r = n[6])
          break
        case 'Q':
          t.push(...Li(i, r, n[1], n[2], n[1], n[2], n[3], n[4])), (i = n[3]), (r = n[4])
          break
        case 'Z':
          ;(i = e), (r = s)
      }
    return Rt(t)
  }
  _calcDimensions() {
    const t = this._calcBoundsFromPath()
    return m(
      m({}, t),
      {},
      {
        pathOffset: new y(t.left + t.width / 2, t.top + t.height / 2)
      }
    )
  }
  static fromObject(t) {
    return this._fromObject(t, {
      extraParam: 'path'
    })
  }
  static async fromElement(t, e, s) {
    const i = It(t, this.ATTRIBUTE_NAMES, s),
      { d: r } = i
    return new this(
      r,
      m(
        m(m({}, W(i, dh)), e),
        {},
        {
          left: void 0,
          top: void 0
        }
      )
    )
  }
}
f(Xt, 'type', 'Path'),
  f(Xt, 'cacheProperties', [...zt, 'path', 'fillRule']),
  f(Xt, 'ATTRIBUTE_NAMES', [...re, 'd']),
  w.setClass(Xt),
  w.setSVGClass(Xt)
class gs extends ai {
  constructor(t) {
    super(t),
      f(this, 'decimate', 0.4),
      f(this, 'drawStraightLine', !1),
      f(this, 'straightLineKey', 'shiftKey'),
      (this._points = []),
      (this._hasStraightLine = !1)
  }
  needsFullRender() {
    return super.needsFullRender() || this._hasStraightLine
  }
  static drawSegment(t, e, s) {
    const i = e.midPointFrom(s)
    return t.quadraticCurveTo(e.x, e.y, i.x, i.y), i
  }
  onMouseDown(t, e) {
    let { e: s } = e
    this.canvas._isMainEvent(s) &&
      ((this.drawStraightLine = !!this.straightLineKey && s[this.straightLineKey]),
      this._prepareForDrawing(t),
      this._addPoint(t),
      this._render())
  }
  onMouseMove(t, e) {
    let { e: s } = e
    if (
      this.canvas._isMainEvent(s) &&
      ((this.drawStraightLine = !!this.straightLineKey && s[this.straightLineKey]),
      (this.limitedToCanvasSize !== !0 || !this._isOutSideCanvas(t)) && this._addPoint(t) && this._points.length > 1)
    )
      if (this.needsFullRender()) this.canvas.clearContext(this.canvas.contextTop), this._render()
      else {
        const i = this._points,
          r = i.length,
          n = this.canvas.contextTop
        this._saveAndTransform(n),
          this.oldEnd && (n.beginPath(), n.moveTo(this.oldEnd.x, this.oldEnd.y)),
          (this.oldEnd = gs.drawSegment(n, i[r - 2], i[r - 1])),
          n.stroke(),
          n.restore()
      }
  }
  onMouseUp(t) {
    let { e } = t
    return (
      !this.canvas._isMainEvent(e) ||
      ((this.drawStraightLine = !1), (this.oldEnd = void 0), this._finalizeAndAddPath(), !1)
    )
  }
  _prepareForDrawing(t) {
    this._reset(), this._addPoint(t), this.canvas.contextTop.moveTo(t.x, t.y)
  }
  _addPoint(t) {
    return (
      !(this._points.length > 1 && t.eq(this._points[this._points.length - 1])) &&
      (this.drawStraightLine && this._points.length > 1 && ((this._hasStraightLine = !0), this._points.pop()),
      this._points.push(t),
      !0)
    )
  }
  _reset() {
    ;(this._points = []), this._setBrushStyles(this.canvas.contextTop), this._setShadow(), (this._hasStraightLine = !1)
  }
  _render() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.canvas.contextTop,
      e = this._points[0],
      s = this._points[1]
    if ((this._saveAndTransform(t), t.beginPath(), this._points.length === 2 && e.x === s.x && e.y === s.y)) {
      const i = this.width / 1e3
      ;(e.x -= i), (s.x += i)
    }
    t.moveTo(e.x, e.y)
    for (let i = 1; i < this._points.length; i++)
      gs.drawSegment(t, e, s), (e = this._points[i]), (s = this._points[i + 1])
    t.lineTo(e.x, e.y), t.stroke(), t.restore()
  }
  convertPointsToSVGPath(t) {
    const e = this.width / 1e3
    return co(t, e)
  }
  createPath(t) {
    const e = new Xt(t, {
      fill: null,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: this.strokeLineCap,
      strokeMiterLimit: this.strokeMiterLimit,
      strokeLineJoin: this.strokeLineJoin,
      strokeDashArray: this.strokeDashArray
    })
    return this.shadow && ((this.shadow.affectStroke = !0), (e.shadow = new gt(this.shadow))), e
  }
  decimatePoints(t, e) {
    if (t.length <= 2) return t
    let s,
      i = t[0]
    const r = this.canvas.getZoom(),
      n = Math.pow(e / r, 2),
      a = t.length - 1,
      h = [i]
    for (let c = 1; c < a - 1; c++)
      (s = Math.pow(i.x - t[c].x, 2) + Math.pow(i.y - t[c].y, 2)), s >= n && ((i = t[c]), h.push(i))
    return h.push(t[a]), h
  }
  _finalizeAndAddPath() {
    this.canvas.contextTop.closePath(),
      this.decimate && (this._points = this.decimatePoints(this._points, this.decimate))
    const t = this.convertPointsToSVGPath(this._points)
    if (
      (function (s) {
        return pr(s) === 'M 0 0 Q 0 0 0 0 L 0 0'
      })(t)
    )
      return void this.canvas.requestRenderAll()
    const e = this.createPath(t)
    this.canvas.clearContext(this.canvas.contextTop),
      this.canvas.fire('before:path:created', {
        path: e
      }),
      this.canvas.add(e),
      this.canvas.requestRenderAll(),
      e.setCoords(),
      this._resetShadow(),
      this.canvas.fire('path:created', {
        path: e
      })
  }
}
const fh = ['left', 'top', 'radius'],
  yo = ['radius', 'startAngle', 'endAngle', 'counterClockwise']
class bt extends K {
  static getDefaults() {
    return m(m({}, super.getDefaults()), bt.ownDefaults)
  }
  constructor(t) {
    super(), Object.assign(this, bt.ownDefaults), this.setOptions(t)
  }
  _set(t, e) {
    return super._set(t, e), t === 'radius' && this.setRadius(e), this
  }
  _render(t) {
    t.beginPath(),
      t.arc(0, 0, this.radius, z(this.startAngle), z(this.endAngle), this.counterClockwise),
      this._renderPaintInOrder(t)
  }
  getRadiusX() {
    return this.get('radius') * this.get(ot)
  }
  getRadiusY() {
    return this.get('radius') * this.get(ft)
  }
  setRadius(t) {
    ;(this.radius = t),
      this.set({
        width: 2 * t,
        height: 2 * t
      })
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return super.toObject([...yo, ...t])
  }
  _toSVG() {
    const t = (this.endAngle - this.startAngle) % 360
    if (t === 0)
      return [
        '<circle ',
        'COMMON_PARTS',
        'cx="0" cy="0" ',
        'r="',
        ''.concat(this.radius),
        `" />
`
      ]
    {
      const { radius: e } = this,
        s = z(this.startAngle),
        i = z(this.endAngle),
        r = kt(s) * e,
        n = Dt(s) * e,
        a = kt(i) * e,
        h = Dt(i) * e,
        c = t > 180 ? 1 : 0,
        l = this.counterClockwise ? 0 : 1
      return [
        '<path d="M '
          .concat(r, ' ')
          .concat(n, ' A ')
          .concat(e, ' ')
          .concat(e, ' 0 ')
          .concat(c, ' ')
          .concat(l, ' ')
          .concat(a, ' ')
          .concat(h, '" '),
        'COMMON_PARTS',
        ` />
`
      ]
    }
  }
  static async fromElement(t, e, s) {
    const i = It(t, this.ATTRIBUTE_NAMES, s),
      { left: r = 0, top: n = 0, radius: a = 0 } = i
    return new this(
      m(
        m({}, W(i, fh)),
        {},
        {
          radius: a,
          left: r - a,
          top: n - a
        }
      )
    )
  }
  static fromObject(t) {
    return super._fromObject(t)
  }
}
f(bt, 'type', 'Circle'),
  f(bt, 'cacheProperties', [...zt, ...yo]),
  f(bt, 'ownDefaults', {
    radius: 0,
    startAngle: 0,
    endAngle: 360,
    counterClockwise: !1
  }),
  f(bt, 'ATTRIBUTE_NAMES', ['cx', 'cy', 'r', ...re]),
  w.setClass(bt),
  w.setSVGClass(bt)
class ph extends ai {
  constructor(t) {
    super(t), f(this, 'width', 10), (this.points = [])
  }
  drawDot(t) {
    const e = this.addPoint(t),
      s = this.canvas.contextTop
    this._saveAndTransform(s), this.dot(s, e), s.restore()
  }
  dot(t, e) {
    ;(t.fillStyle = e.fill), t.beginPath(), t.arc(e.x, e.y, e.radius, 0, 2 * Math.PI, !1), t.closePath(), t.fill()
  }
  onMouseDown(t) {
    ;(this.points = []), this.canvas.clearContext(this.canvas.contextTop), this._setShadow(), this.drawDot(t)
  }
  _render() {
    const t = this.canvas.contextTop,
      e = this.points
    this._saveAndTransform(t)
    for (let s = 0; s < e.length; s++) this.dot(t, e[s])
    t.restore()
  }
  onMouseMove(t) {
    ;(this.limitedToCanvasSize === !0 && this._isOutSideCanvas(t)) ||
      (this.needsFullRender()
        ? (this.canvas.clearContext(this.canvas.contextTop), this.addPoint(t), this._render())
        : this.drawDot(t))
  }
  onMouseUp() {
    const t = this.canvas.renderOnAddRemove
    this.canvas.renderOnAddRemove = !1
    const e = []
    for (let i = 0; i < this.points.length; i++) {
      const r = this.points[i],
        n = new bt({
          radius: r.radius,
          left: r.x,
          top: r.y,
          originX: k,
          originY: k,
          fill: r.fill
        })
      this.shadow && (n.shadow = new gt(this.shadow)), e.push(n)
    }
    const s = new dt(e, {
      canvas: this.canvas
    })
    this.canvas.fire('before:path:created', {
      path: s
    }),
      this.canvas.add(s),
      this.canvas.fire('path:created', {
        path: s
      }),
      this.canvas.clearContext(this.canvas.contextTop),
      this._resetShadow(),
      (this.canvas.renderOnAddRemove = t),
      this.canvas.requestRenderAll()
  }
  addPoint(t) {
    let { x: e, y: s } = t
    const i = {
      x: e,
      y: s,
      radius: ce(Math.max(0, this.width - 20), this.width + 20) / 2,
      fill: new j(this.color).setAlpha(ce(0, 100) / 100).toRgba()
    }
    return this.points.push(i), i
  }
}
class mh extends ai {
  constructor(t) {
    super(t),
      f(this, 'width', 10),
      f(this, 'density', 20),
      f(this, 'dotWidth', 1),
      f(this, 'dotWidthVariance', 1),
      f(this, 'randomOpacity', !1),
      f(this, 'optimizeOverlapping', !0),
      (this.sprayChunks = []),
      (this.sprayChunk = [])
  }
  onMouseDown(t) {
    ;(this.sprayChunks = []),
      this.canvas.clearContext(this.canvas.contextTop),
      this._setShadow(),
      this.addSprayChunk(t),
      this.renderChunck(this.sprayChunk)
  }
  onMouseMove(t) {
    ;(this.limitedToCanvasSize === !0 && this._isOutSideCanvas(t)) ||
      (this.addSprayChunk(t), this.renderChunck(this.sprayChunk))
  }
  onMouseUp() {
    const t = this.canvas.renderOnAddRemove
    this.canvas.renderOnAddRemove = !1
    const e = []
    for (let i = 0; i < this.sprayChunks.length; i++) {
      const r = this.sprayChunks[i]
      for (let n = 0; n < r.length; n++) {
        const a = r[n],
          h = new vt({
            width: a.width,
            height: a.width,
            left: a.x + 1,
            top: a.y + 1,
            originX: k,
            originY: k,
            fill: this.color
          })
        e.push(h)
      }
    }
    const s = new dt(
      this.optimizeOverlapping
        ? (function (i) {
            const r = {},
              n = []
            for (let a, h = 0; h < i.length; h++)
              (a = ''.concat(i[h].left).concat(i[h].top)), r[a] || ((r[a] = !0), n.push(i[h]))
            return n
          })(e)
        : e,
      {
        objectCaching: !0,
        subTargetCheck: !1,
        interactive: !1
      }
    )
    this.shadow && s.set('shadow', new gt(this.shadow)),
      this.canvas.fire('before:path:created', {
        path: s
      }),
      this.canvas.add(s),
      this.canvas.fire('path:created', {
        path: s
      }),
      this.canvas.clearContext(this.canvas.contextTop),
      this._resetShadow(),
      (this.canvas.renderOnAddRemove = t),
      this.canvas.requestRenderAll()
  }
  renderChunck(t) {
    const e = this.canvas.contextTop
    ;(e.fillStyle = this.color), this._saveAndTransform(e)
    for (let s = 0; s < t.length; s++) {
      const i = t[s]
      ;(e.globalAlpha = i.opacity), e.fillRect(i.x, i.y, i.width, i.width)
    }
    e.restore()
  }
  _render() {
    const t = this.canvas.contextTop
    ;(t.fillStyle = this.color), this._saveAndTransform(t)
    for (let e = 0; e < this.sprayChunks.length; e++) this.renderChunck(this.sprayChunks[e])
    t.restore()
  }
  addSprayChunk(t) {
    this.sprayChunk = []
    const e = this.width / 2
    for (let s = 0; s < this.density; s++)
      this.sprayChunk.push({
        x: ce(t.x - e, t.x + e),
        y: ce(t.y - e, t.y + e),
        width: this.dotWidthVariance
          ? ce(Math.max(1, this.dotWidth - this.dotWidthVariance), this.dotWidth + this.dotWidthVariance)
          : this.dotWidth,
        opacity: this.randomOpacity ? ce(0, 100) / 100 : 1
      })
    this.sprayChunks.push(this.sprayChunk)
  }
}
class vh extends gs {
  constructor(t) {
    super(t)
  }
  getPatternSrc() {
    const t = lt(),
      e = t.getContext('2d')
    return (
      (t.width = t.height = 25),
      e && ((e.fillStyle = this.color), e.beginPath(), e.arc(10, 10, 10, 0, 2 * Math.PI, !1), e.closePath(), e.fill()),
      t
    )
  }
  getPattern(t) {
    return t.createPattern(this.source || this.getPatternSrc(), 'repeat')
  }
  _setBrushStyles(t) {
    super._setBrushStyles(t)
    const e = this.getPattern(t)
    e && (t.strokeStyle = e)
  }
  createPath(t) {
    const e = super.createPath(t),
      s = e._getLeftTopCoords().scalarAdd(e.strokeWidth / 2)
    return (
      (e.stroke = new rs({
        source: this.source || this.getPatternSrc(),
        offsetX: -s.x,
        offsetY: -s.y
      })),
      e
    )
  }
}
const yh = ['x1', 'y1', 'x2', 'y2'],
  _h = ['x1', 'y1', 'x2', 'y2'],
  Ii = ['x1', 'x2', 'y1', 'y2']
class Kt extends K {
  constructor() {
    let [t, e, s, i] = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [0, 0, 0, 0],
      r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(),
      Object.assign(this, Kt.ownDefaults),
      this.setOptions(r),
      (this.x1 = t),
      (this.x2 = s),
      (this.y1 = e),
      (this.y2 = i),
      this._setWidthHeight()
    const { left: n, top: a } = r
    typeof n == 'number' && this.set(L, n), typeof a == 'number' && this.set(ct, a)
  }
  _setWidthHeight() {
    const { x1: t, y1: e, x2: s, y2: i } = this
    ;(this.width = Math.abs(s - t)), (this.height = Math.abs(i - e))
    const {
        left: r,
        top: n,
        width: a,
        height: h
      } = Rt([
        {
          x: t,
          y: e
        },
        {
          x: s,
          y: i
        }
      ]),
      c = new y(r + a / 2, n + h / 2)
    this.setPositionByOrigin(c, k, k)
  }
  _set(t, e) {
    return super._set(t, e), Ii.includes(t) && this._setWidthHeight(), this
  }
  _render(t) {
    t.beginPath()
    const e = this.calcLinePoints()
    t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2), (t.lineWidth = this.strokeWidth)
    const s = t.strokeStyle
    var i
    yt(this.stroke)
      ? (t.strokeStyle = this.stroke.toLive(t))
      : (t.strokeStyle = (i = this.stroke) !== null && i !== void 0 ? i : t.fillStyle),
      this.stroke && this._renderStroke(t),
      (t.strokeStyle = s)
  }
  _findCenterFromElement() {
    return new y((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2)
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return m(m({}, super.toObject(t)), this.calcLinePoints())
  }
  _getNonTransformedDimensions() {
    const t = super._getNonTransformedDimensions()
    return (
      this.strokeLineCap === 'butt' &&
        (this.width === 0 && (t.y -= this.strokeWidth), this.height === 0 && (t.x -= this.strokeWidth)),
      t
    )
  }
  calcLinePoints() {
    const { x1: t, x2: e, y1: s, y2: i, width: r, height: n } = this,
      a = t <= e ? -1 : 1,
      h = s <= i ? -1 : 1
    return {
      x1: (a * r) / 2,
      x2: (a * -r) / 2,
      y1: (h * n) / 2,
      y2: (h * -n) / 2
    }
  }
  _toSVG() {
    const { x1: t, x2: e, y1: s, y2: i } = this.calcLinePoints()
    return [
      '<line ',
      'COMMON_PARTS',
      'x1="'
        .concat(t, '" y1="')
        .concat(s, '" x2="')
        .concat(e, '" y2="')
        .concat(
          i,
          `" />
`
        )
    ]
  }
  static async fromElement(t, e, s) {
    const i = It(t, this.ATTRIBUTE_NAMES, s),
      { x1: r = 0, y1: n = 0, x2: a = 0, y2: h = 0 } = i
    return new this([r, n, a, h], W(i, yh))
  }
  static fromObject(t) {
    let { x1: e, y1: s, x2: i, y2: r } = t,
      n = W(t, _h)
    return this._fromObject(
      m(
        m({}, n),
        {},
        {
          points: [e, s, i, r]
        }
      ),
      {
        extraParam: 'points'
      }
    )
  }
}
f(Kt, 'type', 'Line'),
  f(Kt, 'cacheProperties', [...zt, ...Ii]),
  f(Kt, 'ATTRIBUTE_NAMES', re.concat(Ii)),
  w.setClass(Kt),
  w.setSVGClass(Kt)
class Jt extends K {
  static getDefaults() {
    return m(m({}, super.getDefaults()), Jt.ownDefaults)
  }
  constructor(t) {
    super(), Object.assign(this, Jt.ownDefaults), this.setOptions(t)
  }
  _render(t) {
    const e = this.width / 2,
      s = this.height / 2
    t.beginPath(), t.moveTo(-e, s), t.lineTo(0, -s), t.lineTo(e, s), t.closePath(), this._renderPaintInOrder(t)
  }
  _toSVG() {
    const t = this.width / 2,
      e = this.height / 2
    return [
      '<polygon ',
      'COMMON_PARTS',
      'points="',
      ''.concat(-t, ' ').concat(e, ',0 ').concat(-e, ',').concat(t, ' ').concat(e),
      '" />'
    ]
  }
}
f(Jt, 'type', 'Triangle'),
  f(Jt, 'ownDefaults', {
    width: 100,
    height: 100
  }),
  w.setClass(Jt),
  w.setSVGClass(Jt)
const _o = ['rx', 'ry']
class Et extends K {
  static getDefaults() {
    return m(m({}, super.getDefaults()), Et.ownDefaults)
  }
  constructor(t) {
    super(), Object.assign(this, Et.ownDefaults), this.setOptions(t)
  }
  _set(t, e) {
    switch ((super._set(t, e), t)) {
      case 'rx':
        ;(this.rx = e), this.set('width', 2 * e)
        break
      case 'ry':
        ;(this.ry = e), this.set('height', 2 * e)
    }
    return this
  }
  getRx() {
    return this.get('rx') * this.get(ot)
  }
  getRy() {
    return this.get('ry') * this.get(ft)
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return super.toObject([..._o, ...t])
  }
  _toSVG() {
    return [
      '<ellipse ',
      'COMMON_PARTS',
      'cx="0" cy="0" rx="'.concat(this.rx, '" ry="').concat(
        this.ry,
        `" />
`
      )
    ]
  }
  _render(t) {
    t.beginPath(),
      t.save(),
      t.transform(1, 0, 0, this.ry / this.rx, 0, 0),
      t.arc(0, 0, this.rx, 0, Gt, !1),
      t.restore(),
      this._renderPaintInOrder(t)
  }
  static async fromElement(t, e, s) {
    const i = It(t, this.ATTRIBUTE_NAMES, s)
    return (i.left = (i.left || 0) - i.rx), (i.top = (i.top || 0) - i.ry), new this(i)
  }
}
function xo(o) {
  if (!o) return []
  const t = o.replace(/,/g, ' ').trim().split(/\s+/),
    e = []
  for (let s = 0; s < t.length; s += 2)
    e.push({
      x: parseFloat(t[s]),
      y: parseFloat(t[s + 1])
    })
  return e
}
f(Et, 'type', 'Ellipse'),
  f(Et, 'cacheProperties', [...zt, ..._o]),
  f(Et, 'ownDefaults', {
    rx: 0,
    ry: 0
  }),
  f(Et, 'ATTRIBUTE_NAMES', [...re, 'cx', 'cy', 'rx', 'ry']),
  w.setClass(Et),
  w.setSVGClass(Et)
const xh = ['left', 'top'],
  Co = {
    exactBoundingBox: !1
  }
class mt extends K {
  static getDefaults() {
    return m(m({}, super.getDefaults()), mt.ownDefaults)
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(), f(this, 'strokeDiff', void 0), Object.assign(this, mt.ownDefaults), this.setOptions(e), (this.points = t)
    const { left: s, top: i } = e
    ;(this.initialized = !0),
      this.setBoundingBox(!0),
      typeof s == 'number' && this.set(L, s),
      typeof i == 'number' && this.set(ct, i)
  }
  isOpen() {
    return !0
  }
  _projectStrokeOnPoints(t) {
    return Hn(this.points, t, this.isOpen())
  }
  _calcDimensions(t) {
    t = m(
      {
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        skewX: this.skewX,
        skewY: this.skewY,
        strokeLineCap: this.strokeLineCap,
        strokeLineJoin: this.strokeLineJoin,
        strokeMiterLimit: this.strokeMiterLimit,
        strokeUniform: this.strokeUniform,
        strokeWidth: this.strokeWidth
      },
      t || {}
    )
    const e = this.exactBoundingBox ? this._projectStrokeOnPoints(t).map((c) => c.projectedPoint) : this.points
    if (e.length === 0)
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        pathOffset: new y(),
        strokeOffset: new y(),
        strokeDiff: new y()
      }
    const s = Rt(e),
      i = fs(
        m(
          m({}, t),
          {},
          {
            scaleX: 1,
            scaleY: 1
          }
        )
      ),
      r = Rt(this.points.map((c) => Z(c, i, !0))),
      n = new y(this.scaleX, this.scaleY)
    let a = s.left + s.width / 2,
      h = s.top + s.height / 2
    return (
      this.exactBoundingBox && ((a -= h * Math.tan(z(this.skewX))), (h -= a * Math.tan(z(this.skewY)))),
      m(
        m({}, s),
        {},
        {
          pathOffset: new y(a, h),
          strokeOffset: new y(r.left, r.top).subtract(new y(s.left, s.top)).multiply(n),
          strokeDiff: new y(s.width, s.height).subtract(new y(r.width, r.height)).multiply(n)
        }
      )
    )
  }
  _findCenterFromElement() {
    const t = Rt(this.points)
    return new y(t.left + t.width / 2, t.top + t.height / 2)
  }
  setDimensions() {
    this.setBoundingBox()
  }
  setBoundingBox(t) {
    const {
      left: e,
      top: s,
      width: i,
      height: r,
      pathOffset: n,
      strokeOffset: a,
      strokeDiff: h
    } = this._calcDimensions()
    this.set({
      width: i,
      height: r,
      pathOffset: n,
      strokeOffset: a,
      strokeDiff: h
    }),
      t && this.setPositionByOrigin(new y(e + i / 2, s + r / 2), k, k)
  }
  isStrokeAccountedForInDimensions() {
    return this.exactBoundingBox
  }
  _getNonTransformedDimensions() {
    return this.exactBoundingBox ? new y(this.width, this.height) : super._getNonTransformedDimensions()
  }
  _getTransformedDimensions() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    if (this.exactBoundingBox) {
      let n
      if (Object.keys(t).some((a) => this.strokeUniform || this.constructor.layoutProperties.includes(a))) {
        var e, s
        const { width: a, height: h } = this._calcDimensions(t)
        n = new y((e = t.width) !== null && e !== void 0 ? e : a, (s = t.height) !== null && s !== void 0 ? s : h)
      } else {
        var i, r
        n = new y(
          (i = t.width) !== null && i !== void 0 ? i : this.width,
          (r = t.height) !== null && r !== void 0 ? r : this.height
        )
      }
      return n.multiply(new y(t.scaleX || this.scaleX, t.scaleY || this.scaleY))
    }
    return super._getTransformedDimensions(t)
  }
  _set(t, e) {
    const s = this.initialized && this[t] !== e,
      i = super._set(t, e)
    return (
      this.exactBoundingBox &&
        s &&
        (((t === ot || t === ft) &&
          this.strokeUniform &&
          this.constructor.layoutProperties.includes('strokeUniform')) ||
          this.constructor.layoutProperties.includes(t)) &&
        this.setDimensions(),
      i
    )
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return m(
      m({}, super.toObject(t)),
      {},
      {
        points: this.points.map((e) => {
          let { x: s, y: i } = e
          return {
            x: s,
            y: i
          }
        })
      }
    )
  }
  _toSVG() {
    const t = [],
      e = this.pathOffset.x,
      s = this.pathOffset.y,
      i = E.NUM_FRACTION_DIGITS
    for (let r = 0, n = this.points.length; r < n; r++)
      t.push(Y(this.points[r].x - e, i), ',', Y(this.points[r].y - s, i), ' ')
    return [
      '<'.concat(this.constructor.type.toLowerCase(), ' '),
      'COMMON_PARTS',
      'points="'.concat(
        t.join(''),
        `" />
`
      )
    ]
  }
  _render(t) {
    const e = this.points.length,
      s = this.pathOffset.x,
      i = this.pathOffset.y
    if (e && !isNaN(this.points[e - 1].y)) {
      t.beginPath(), t.moveTo(this.points[0].x - s, this.points[0].y - i)
      for (let r = 0; r < e; r++) {
        const n = this.points[r]
        t.lineTo(n.x - s, n.y - i)
      }
      !this.isOpen() && t.closePath(), this._renderPaintInOrder(t)
    }
  }
  complexity() {
    return this.points.length
  }
  static async fromElement(t, e, s) {
    return new this(xo(t.getAttribute('points')), m(m({}, W(It(t, this.ATTRIBUTE_NAMES, s), xh)), e))
  }
  static fromObject(t) {
    return this._fromObject(t, {
      extraParam: 'points'
    })
  }
}
f(mt, 'ownDefaults', Co),
  f(mt, 'type', 'Polyline'),
  f(mt, 'layoutProperties', [
    Pe,
    Ee,
    'strokeLineCap',
    'strokeLineJoin',
    'strokeMiterLimit',
    'strokeWidth',
    'strokeUniform',
    'points'
  ]),
  f(mt, 'cacheProperties', [...zt, 'points']),
  f(mt, 'ATTRIBUTE_NAMES', [...re]),
  w.setClass(mt),
  w.setSVGClass(mt)
class Ye extends mt {
  isOpen() {
    return !1
  }
}
f(Ye, 'ownDefaults', Co), f(Ye, 'type', 'Polygon'), w.setClass(Ye), w.setSVGClass(Ye)
const bo = ['fontSize', 'fontWeight', 'fontFamily', 'fontStyle'],
  wo = ['underline', 'overline', 'linethrough'],
  So = [
    ...bo,
    'lineHeight',
    'text',
    'charSpacing',
    'textAlign',
    'styles',
    'path',
    'pathStartOffset',
    'pathSide',
    'pathAlign'
  ],
  To = [...So, ...wo, 'textBackgroundColor', 'direction'],
  Ch = [...bo, ...wo, nt, 'strokeWidth', U, 'deltaY', 'textBackgroundColor'],
  bh = {
    _reNewline: Ni,
    _reSpacesAndTabs: /[ \t\r]/g,
    _reSpaceAndTab: /[ \t\r]/,
    _reWords: /\S+/g,
    fontSize: 40,
    fontWeight: 'normal',
    fontFamily: 'Times New Roman',
    underline: !1,
    overline: !1,
    linethrough: !1,
    textAlign: L,
    fontStyle: 'normal',
    lineHeight: 1.16,
    superscript: {
      size: 0.6,
      baseline: -0.35
    },
    subscript: {
      size: 0.6,
      baseline: 0.11
    },
    textBackgroundColor: '',
    stroke: null,
    shadow: null,
    path: void 0,
    pathStartOffset: 0,
    pathSide: L,
    pathAlign: 'baseline',
    _fontSizeFraction: 0.222,
    offsets: {
      underline: 0.1,
      linethrough: -0.315,
      overline: -0.88
    },
    _fontSizeMult: 1.13,
    charSpacing: 0,
    deltaY: 0,
    direction: 'ltr',
    CACHE_FONT_SIZE: 400,
    MIN_TEXT_WIDTH: 2
  },
  At = 'justify',
  Us = 'justify-left',
  ns = 'justify-right',
  os = 'justify-center'
class Oo extends K {
  isEmptyStyles(t) {
    if (!this.styles || (t !== void 0 && !this.styles[t])) return !0
    const e =
      t === void 0
        ? this.styles
        : {
            line: this.styles[t]
          }
    for (const s in e) for (const i in e[s]) for (const r in e[s][i]) return !1
    return !0
  }
  styleHas(t, e) {
    if (!this.styles || (e !== void 0 && !this.styles[e])) return !1
    const s =
      e === void 0
        ? this.styles
        : {
            0: this.styles[e]
          }
    for (const i in s) for (const r in s[i]) if (s[i][r][t] !== void 0) return !0
    return !1
  }
  cleanStyle(t) {
    if (!this.styles) return !1
    const e = this.styles
    let s,
      i,
      r = 0,
      n = !0,
      a = 0
    for (const h in e) {
      s = 0
      for (const c in e[h]) {
        const l = e[h][c] || {}
        r++,
          l[t] !== void 0 ? (i ? l[t] !== i && (n = !1) : (i = l[t]), l[t] === this[t] && delete l[t]) : (n = !1),
          Object.keys(l).length !== 0 ? s++ : delete e[h][c]
      }
      s === 0 && delete e[h]
    }
    for (let h = 0; h < this._textLines.length; h++) a += this._textLines[h].length
    n && r === a && ((this[t] = i), this.removeStyle(t))
  }
  removeStyle(t) {
    if (!this.styles) return
    const e = this.styles
    let s, i, r
    for (i in e) {
      for (r in ((s = e[i]), s)) delete s[r][t], Object.keys(s[r]).length === 0 && delete s[r]
      Object.keys(s).length === 0 && delete e[i]
    }
  }
  _extendStyles(t, e) {
    const { lineIndex: s, charIndex: i } = this.get2DCursorLocation(t)
    this._getLineStyle(s) || this._setLineStyle(s)
    const r = $i(m(m({}, this._getStyleDeclaration(s, i)), e), (n) => n !== void 0)
    this._setStyleDeclaration(s, i, r)
  }
  getSelectionStyles(t, e, s) {
    const i = []
    for (let r = t; r < (e || t); r++) i.push(this.getStyleAtPosition(r, s))
    return i
  }
  getStyleAtPosition(t, e) {
    const { lineIndex: s, charIndex: i } = this.get2DCursorLocation(t)
    return e ? this.getCompleteStyleDeclaration(s, i) : this._getStyleDeclaration(s, i)
  }
  setSelectionStyles(t, e, s) {
    for (let i = e; i < (s || e); i++) this._extendStyles(i, t)
    this._forceClearCache = !0
  }
  _getStyleDeclaration(t, e) {
    var s
    const i = this.styles && this.styles[t]
    return i && (s = i[e]) !== null && s !== void 0 ? s : {}
  }
  getCompleteStyleDeclaration(t, e) {
    return m(m({}, pe(this, this.constructor._styleProperties)), this._getStyleDeclaration(t, e))
  }
  _setStyleDeclaration(t, e, s) {
    this.styles[t][e] = s
  }
  _deleteStyleDeclaration(t, e) {
    delete this.styles[t][e]
  }
  _getLineStyle(t) {
    return !!this.styles[t]
  }
  _setLineStyle(t) {
    this.styles[t] = {}
  }
  _deleteLineStyle(t) {
    delete this.styles[t]
  }
}
f(Oo, '_styleProperties', Ch)
const wh = /  +/g,
  Sh = /"/g
function vi(o, t, e, s, i) {
  return '		'.concat(
    (function (r, n) {
      let { left: a, top: h, width: c, height: l } = n,
        u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : E.NUM_FRACTION_DIGITS
      const g = ls(U, r, !1),
        [d, p, v, _] = [a, h, c, l].map((x) => Y(x, u))
      return '<rect '
        .concat(g, ' x="')
        .concat(d, '" y="')
        .concat(p, '" width="')
        .concat(v, '" height="')
        .concat(_, '"></rect>')
    })(o, {
      left: t,
      top: e,
      width: s,
      height: i
    }),
    `
`
  )
}
const Th = ['textAnchor', 'textDecoration', 'dx', 'dy', 'top', 'left', 'fontSize', 'strokeWidth']
let yi
class J extends Oo {
  static getDefaults() {
    return m(m({}, super.getDefaults()), J.ownDefaults)
  }
  constructor(t, e) {
    super(),
      f(this, '__charBounds', []),
      Object.assign(this, J.ownDefaults),
      this.setOptions(e),
      this.styles || (this.styles = {}),
      (this.text = t),
      (this.initialized = !0),
      this.path && this.setPathInfo(),
      this.initDimensions(),
      this.setCoords()
  }
  setPathInfo() {
    const t = this.path
    t && (t.segmentsInfo = fr(t.path))
  }
  _splitText() {
    const t = this._splitTextIntoLines(this.text)
    return (
      (this.textLines = t.lines),
      (this._textLines = t.graphemeLines),
      (this._unwrappedTextLines = t._unwrappedLines),
      (this._text = t.graphemeText),
      t
    )
  }
  initDimensions() {
    this._splitText(),
      this._clearCache(),
      (this.dirty = !0),
      this.path
        ? ((this.width = this.path.width), (this.height = this.path.height))
        : ((this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH),
          (this.height = this.calcTextHeight())),
      this.textAlign.includes(At) && this.enlargeSpaces()
  }
  enlargeSpaces() {
    let t, e, s, i, r, n, a
    for (let h = 0, c = this._textLines.length; h < c; h++)
      if (
        (this.textAlign === At || (h !== c - 1 && !this.isEndOfWrapping(h))) &&
        ((i = 0),
        (r = this._textLines[h]),
        (e = this.getLineWidth(h)),
        e < this.width && (a = this.textLines[h].match(this._reSpacesAndTabs)))
      ) {
        ;(s = a.length), (t = (this.width - e) / s)
        for (let l = 0; l <= r.length; l++)
          (n = this.__charBounds[h][l]),
            this._reSpaceAndTab.test(r[l])
              ? ((n.width += t), (n.kernedWidth += t), (n.left += i), (i += t))
              : (n.left += i)
      }
  }
  isEndOfWrapping(t) {
    return t === this._textLines.length - 1
  }
  missingNewlineOffset(t) {
    return 1
  }
  get2DCursorLocation(t, e) {
    const s = e ? this._unwrappedTextLines : this._textLines
    let i
    for (i = 0; i < s.length; i++) {
      if (t <= s[i].length)
        return {
          lineIndex: i,
          charIndex: t
        }
      t -= s[i].length + this.missingNewlineOffset(i, e)
    }
    return {
      lineIndex: i - 1,
      charIndex: s[i - 1].length < t ? s[i - 1].length : t
    }
  }
  toString() {
    return '#<Text ('
      .concat(this.complexity(), '): { "text": "')
      .concat(this.text, '", "fontFamily": "')
      .concat(this.fontFamily, '" }>')
  }
  _getCacheCanvasDimensions() {
    const t = super._getCacheCanvasDimensions(),
      e = this.fontSize
    return (t.width += e * t.zoomX), (t.height += e * t.zoomY), t
  }
  _render(t) {
    const e = this.path
    e && !e.isNotVisible() && e._render(t),
      this._setTextStyles(t),
      this._renderTextLinesBackground(t),
      this._renderTextDecoration(t, 'underline'),
      this._renderText(t),
      this._renderTextDecoration(t, 'overline'),
      this._renderTextDecoration(t, 'linethrough')
  }
  _renderText(t) {
    this.paintFirst === nt
      ? (this._renderTextStroke(t), this._renderTextFill(t))
      : (this._renderTextFill(t), this._renderTextStroke(t))
  }
  _setTextStyles(t, e, s) {
    if (((t.textBaseline = 'alphabetic'), this.path))
      switch (this.pathAlign) {
        case k:
          t.textBaseline = 'middle'
          break
        case 'ascender':
          t.textBaseline = ct
          break
        case 'descender':
          t.textBaseline = wi
      }
    t.font = this._getFontDeclaration(e, s)
  }
  calcTextWidth() {
    let t = this.getLineWidth(0)
    for (let e = 1, s = this._textLines.length; e < s; e++) {
      const i = this.getLineWidth(e)
      i > t && (t = i)
    }
    return t
  }
  _renderTextLine(t, e, s, i, r, n) {
    this._renderChars(t, e, s, i, r, n)
  }
  _renderTextLinesBackground(t) {
    if (!this.textBackgroundColor && !this.styleHas('textBackgroundColor')) return
    const e = t.fillStyle,
      s = this._getLeftOffset()
    let i = this._getTopOffset()
    for (let r = 0, n = this._textLines.length; r < n; r++) {
      const a = this.getHeightOfLine(r)
      if (!this.textBackgroundColor && !this.styleHas('textBackgroundColor', r)) {
        i += a
        continue
      }
      const h = this._textLines[r].length,
        c = this._getLineLeftOffset(r)
      let l,
        u,
        g = 0,
        d = 0,
        p = this.getValueOfPropertyAt(r, 0, 'textBackgroundColor')
      for (let v = 0; v < h; v++) {
        const _ = this.__charBounds[r][v]
        ;(u = this.getValueOfPropertyAt(r, v, 'textBackgroundColor')),
          this.path
            ? (t.save(),
              t.translate(_.renderLeft, _.renderTop),
              t.rotate(_.angle),
              (t.fillStyle = u),
              u &&
                t.fillRect(
                  -_.width / 2,
                  (-a / this.lineHeight) * (1 - this._fontSizeFraction),
                  _.width,
                  a / this.lineHeight
                ),
              t.restore())
            : u !== p
            ? ((l = s + c + d),
              this.direction === 'rtl' && (l = this.width - l - g),
              (t.fillStyle = p),
              p && t.fillRect(l, i, g, a / this.lineHeight),
              (d = _.left),
              (g = _.width),
              (p = u))
            : (g += _.kernedWidth)
      }
      u &&
        !this.path &&
        ((l = s + c + d),
        this.direction === 'rtl' && (l = this.width - l - g),
        (t.fillStyle = u),
        t.fillRect(l, i, g, a / this.lineHeight)),
        (i += a)
    }
    ;(t.fillStyle = e), this._removeShadow(t)
  }
  _measureChar(t, e, s, i) {
    const r = we.getFontCache(e),
      n = this._getFontDeclaration(e),
      a = s + t,
      h = s && n === this._getFontDeclaration(i),
      c = e.fontSize / this.CACHE_FONT_SIZE
    let l, u, g, d
    if (
      (s && r[s] !== void 0 && (g = r[s]),
      r[t] !== void 0 && (d = l = r[t]),
      h && r[a] !== void 0 && ((u = r[a]), (d = u - g)),
      l === void 0 || g === void 0 || u === void 0)
    ) {
      const p = (function () {
        return (
          yi ||
            (yi = _t({
              width: 0,
              height: 0
            }).getContext('2d')),
          yi
        )
      })()
      this._setTextStyles(p, e, !0),
        l === void 0 && ((d = l = p.measureText(t).width), (r[t] = l)),
        g === void 0 && h && s && ((g = p.measureText(s).width), (r[s] = g)),
        h && u === void 0 && ((u = p.measureText(a).width), (r[a] = u), (d = u - g))
    }
    return {
      width: l * c,
      kernedWidth: d * c
    }
  }
  getHeightOfChar(t, e) {
    return this.getValueOfPropertyAt(t, e, 'fontSize')
  }
  measureLine(t) {
    const e = this._measureLine(t)
    return this.charSpacing !== 0 && (e.width -= this._getWidthOfCharSpacing()), e.width < 0 && (e.width = 0), e
  }
  _measureLine(t) {
    let e,
      s,
      i = 0
    const r = this.pathSide === H,
      n = this.path,
      a = this._textLines[t],
      h = a.length,
      c = new Array(h)
    this.__charBounds[t] = c
    for (let l = 0; l < h; l++) {
      const u = a[l]
      ;(s = this._getGraphemeBox(u, t, l, e)), (c[l] = s), (i += s.kernedWidth), (e = u)
    }
    if (
      ((c[h] = {
        left: s ? s.left + s.width : 0,
        width: 0,
        kernedWidth: 0,
        height: this.fontSize,
        deltaY: 0
      }),
      n && n.segmentsInfo)
    ) {
      let l = 0
      const u = n.segmentsInfo[n.segmentsInfo.length - 1].length
      switch (this.textAlign) {
        case L:
          l = r ? u - i : 0
          break
        case k:
          l = (u - i) / 2
          break
        case H:
          l = r ? 0 : u - i
      }
      l += this.pathStartOffset * (r ? -1 : 1)
      for (let g = r ? h - 1 : 0; r ? g >= 0 : g < h; r ? g-- : g++)
        (s = c[g]), l > u ? (l %= u) : l < 0 && (l += u), this._setGraphemeOnPath(l, s), (l += s.kernedWidth)
    }
    return {
      width: i,
      numOfSpaces: 0
    }
  }
  _setGraphemeOnPath(t, e) {
    const s = t + e.kernedWidth / 2,
      i = this.path,
      r = ao(i.path, s, i.segmentsInfo)
    ;(e.renderLeft = r.x - i.pathOffset.x),
      (e.renderTop = r.y - i.pathOffset.y),
      (e.angle = r.angle + (this.pathSide === H ? Math.PI : 0))
  }
  _getGraphemeBox(t, e, s, i, r) {
    const n = this.getCompleteStyleDeclaration(e, s),
      a = i ? this.getCompleteStyleDeclaration(e, s - 1) : {},
      h = this._measureChar(t, n, i, a)
    let c,
      l = h.kernedWidth,
      u = h.width
    this.charSpacing !== 0 && ((c = this._getWidthOfCharSpacing()), (u += c), (l += c))
    const g = {
      width: u,
      left: 0,
      height: n.fontSize,
      kernedWidth: l,
      deltaY: n.deltaY
    }
    if (s > 0 && !r) {
      const d = this.__charBounds[e][s - 1]
      g.left = d.left + d.width + h.kernedWidth - h.width
    }
    return g
  }
  getHeightOfLine(t) {
    if (this.__lineHeights[t]) return this.__lineHeights[t]
    let e = this.getHeightOfChar(t, 0)
    for (let s = 1, i = this._textLines[t].length; s < i; s++) e = Math.max(this.getHeightOfChar(t, s), e)
    return (this.__lineHeights[t] = e * this.lineHeight * this._fontSizeMult)
  }
  calcTextHeight() {
    let t,
      e = 0
    for (let s = 0, i = this._textLines.length; s < i; s++)
      (t = this.getHeightOfLine(s)), (e += s === i - 1 ? t / this.lineHeight : t)
    return e
  }
  _getLeftOffset() {
    return this.direction === 'ltr' ? -this.width / 2 : this.width / 2
  }
  _getTopOffset() {
    return -this.height / 2
  }
  _renderTextCommon(t, e) {
    t.save()
    let s = 0
    const i = this._getLeftOffset(),
      r = this._getTopOffset()
    for (let n = 0, a = this._textLines.length; n < a; n++) {
      const h = this.getHeightOfLine(n),
        c = h / this.lineHeight,
        l = this._getLineLeftOffset(n)
      this._renderTextLine(e, t, this._textLines[n], i + l, r + s + c, n), (s += h)
    }
    t.restore()
  }
  _renderTextFill(t) {
    ;(this.fill || this.styleHas(U)) && this._renderTextCommon(t, 'fillText')
  }
  _renderTextStroke(t) {
    ;((this.stroke && this.strokeWidth !== 0) || !this.isEmptyStyles()) &&
      (this.shadow && !this.shadow.affectStroke && this._removeShadow(t),
      t.save(),
      this._setLineDash(t, this.strokeDashArray),
      t.beginPath(),
      this._renderTextCommon(t, 'strokeText'),
      t.closePath(),
      t.restore())
  }
  _renderChars(t, e, s, i, r, n) {
    const a = this.getHeightOfLine(n),
      h = this.textAlign.includes(At),
      c = this.path,
      l = !h && this.charSpacing === 0 && this.isEmptyStyles(n) && !c,
      u = this.direction === 'ltr',
      g = this.direction === 'ltr' ? 1 : -1,
      d = e.direction
    let p,
      v,
      _,
      x,
      C,
      b = '',
      S = 0
    if (
      (e.save(),
      d !== this.direction &&
        (e.canvas.setAttribute('dir', u ? 'ltr' : 'rtl'), (e.direction = u ? 'ltr' : 'rtl'), (e.textAlign = u ? L : H)),
      (r -= (a * this._fontSizeFraction) / this.lineHeight),
      l)
    )
      return this._renderChar(t, e, n, 0, s.join(''), i, r), void e.restore()
    for (let T = 0, D = s.length - 1; T <= D; T++)
      (x = T === D || this.charSpacing || c),
        (b += s[T]),
        (_ = this.__charBounds[n][T]),
        S === 0 ? ((i += g * (_.kernedWidth - _.width)), (S += _.width)) : (S += _.kernedWidth),
        h && !x && this._reSpaceAndTab.test(s[T]) && (x = !0),
        x ||
          ((p = p || this.getCompleteStyleDeclaration(n, T)),
          (v = this.getCompleteStyleDeclaration(n, T + 1)),
          (x = ni(p, v, !1))),
        x &&
          (c
            ? (e.save(),
              e.translate(_.renderLeft, _.renderTop),
              e.rotate(_.angle),
              this._renderChar(t, e, n, T, b, -S / 2, 0),
              e.restore())
            : ((C = i), this._renderChar(t, e, n, T, b, C, r)),
          (b = ''),
          (p = v),
          (i += g * S),
          (S = 0))
    e.restore()
  }
  _applyPatternGradientTransformText(t) {
    const e = this.width + this.strokeWidth,
      s = this.height + this.strokeWidth,
      i = _t({
        width: e,
        height: s
      }),
      r = i.getContext('2d')
    return (
      (i.width = e),
      (i.height = s),
      r.beginPath(),
      r.moveTo(0, 0),
      r.lineTo(e, 0),
      r.lineTo(e, s),
      r.lineTo(0, s),
      r.closePath(),
      r.translate(e / 2, s / 2),
      (r.fillStyle = t.toLive(r)),
      this._applyPatternGradientTransform(r, t),
      r.fill(),
      r.createPattern(i, 'no-repeat')
    )
  }
  handleFiller(t, e, s) {
    let i, r
    return yt(s)
      ? s.gradientUnits === 'percentage' || s.gradientTransform || s.patternTransform
        ? ((i = -this.width / 2),
          (r = -this.height / 2),
          t.translate(i, r),
          (t[e] = this._applyPatternGradientTransformText(s)),
          {
            offsetX: i,
            offsetY: r
          })
        : ((t[e] = s.toLive(t)), this._applyPatternGradientTransform(t, s))
      : ((t[e] = s),
        {
          offsetX: 0,
          offsetY: 0
        })
  }
  _setStrokeStyles(t, e) {
    let { stroke: s, strokeWidth: i } = e
    return (
      (t.lineWidth = i),
      (t.lineCap = this.strokeLineCap),
      (t.lineDashOffset = this.strokeDashOffset),
      (t.lineJoin = this.strokeLineJoin),
      (t.miterLimit = this.strokeMiterLimit),
      this.handleFiller(t, 'strokeStyle', s)
    )
  }
  _setFillStyles(t, e) {
    let { fill: s } = e
    return this.handleFiller(t, 'fillStyle', s)
  }
  _renderChar(t, e, s, i, r, n, a) {
    const h = this._getStyleDeclaration(s, i),
      c = this.getCompleteStyleDeclaration(s, i),
      l = t === 'fillText' && c.fill,
      u = t === 'strokeText' && c.stroke && c.strokeWidth
    if (u || l) {
      if (
        (e.save(),
        (e.font = this._getFontDeclaration(c)),
        h.textBackgroundColor && this._removeShadow(e),
        h.deltaY && (a += h.deltaY),
        l)
      ) {
        const g = this._setFillStyles(e, c)
        e.fillText(r, n - g.offsetX, a - g.offsetY)
      }
      if (u) {
        const g = this._setStrokeStyles(e, c)
        e.strokeText(r, n - g.offsetX, a - g.offsetY)
      }
      e.restore()
    }
  }
  setSuperscript(t, e) {
    this._setScript(t, e, this.superscript)
  }
  setSubscript(t, e) {
    this._setScript(t, e, this.subscript)
  }
  _setScript(t, e, s) {
    const i = this.get2DCursorLocation(t, !0),
      r = this.getValueOfPropertyAt(i.lineIndex, i.charIndex, 'fontSize'),
      n = this.getValueOfPropertyAt(i.lineIndex, i.charIndex, 'deltaY'),
      a = {
        fontSize: r * s.size,
        deltaY: n + r * s.baseline
      }
    this.setSelectionStyles(a, t, e)
  }
  _getLineLeftOffset(t) {
    const e = this.getLineWidth(t),
      s = this.width - e,
      i = this.textAlign,
      r = this.direction,
      n = this.isEndOfWrapping(t)
    let a = 0
    return i === At || (i === os && !n) || (i === ns && !n) || (i === Us && !n)
      ? 0
      : (i === k && (a = s / 2),
        i === H && (a = s),
        i === os && (a = s / 2),
        i === ns && (a = s),
        r === 'rtl' &&
          (i === H || i === At || i === ns
            ? (a = 0)
            : i === L || i === Us
            ? (a = -s)
            : (i !== k && i !== os) || (a = -s / 2)),
        a)
  }
  _clearCache() {
    ;(this._forceClearCache = !1), (this.__lineWidths = []), (this.__lineHeights = []), (this.__charBounds = [])
  }
  getLineWidth(t) {
    if (this.__lineWidths[t] !== void 0) return this.__lineWidths[t]
    const { width: e } = this.measureLine(t)
    return (this.__lineWidths[t] = e), e
  }
  _getWidthOfCharSpacing() {
    return this.charSpacing !== 0 ? (this.fontSize * this.charSpacing) / 1e3 : 0
  }
  getValueOfPropertyAt(t, e, s) {
    var i
    return (i = this._getStyleDeclaration(t, e)[s]) !== null && i !== void 0 ? i : this[s]
  }
  _renderTextDecoration(t, e) {
    if (!this[e] && !this.styleHas(e)) return
    let s = this._getTopOffset()
    const i = this._getLeftOffset(),
      r = this.path,
      n = this._getWidthOfCharSpacing(),
      a = this.offsets[e]
    for (let h = 0, c = this._textLines.length; h < c; h++) {
      const l = this.getHeightOfLine(h)
      if (!this[e] && !this.styleHas(e, h)) {
        s += l
        continue
      }
      const u = this._textLines[h],
        g = l / this.lineHeight,
        d = this._getLineLeftOffset(h)
      let p,
        v,
        _ = 0,
        x = 0,
        C = this.getValueOfPropertyAt(h, 0, e),
        b = this.getValueOfPropertyAt(h, 0, U)
      const S = s + g * (1 - this._fontSizeFraction)
      let T = this.getHeightOfChar(h, 0),
        D = this.getValueOfPropertyAt(h, 0, 'deltaY')
      for (let O = 0, M = u.length; O < M; O++) {
        const A = this.__charBounds[h][O]
        ;(p = this.getValueOfPropertyAt(h, O, e)), (v = this.getValueOfPropertyAt(h, O, U))
        const B = this.getHeightOfChar(h, O),
          R = this.getValueOfPropertyAt(h, O, 'deltaY')
        if (r && p && v)
          t.save(),
            (t.fillStyle = b),
            t.translate(A.renderLeft, A.renderTop),
            t.rotate(A.angle),
            t.fillRect(-A.kernedWidth / 2, a * B + R, A.kernedWidth, this.fontSize / 15),
            t.restore()
        else if ((p !== C || v !== b || B !== T || R !== D) && x > 0) {
          let F = i + d + _
          this.direction === 'rtl' && (F = this.width - F - x),
            C && b && ((t.fillStyle = b), t.fillRect(F, S + a * T + D, x, this.fontSize / 15)),
            (_ = A.left),
            (x = A.width),
            (C = p),
            (b = v),
            (T = B),
            (D = R)
        } else x += A.kernedWidth
      }
      let P = i + d + _
      this.direction === 'rtl' && (P = this.width - P - x),
        (t.fillStyle = v),
        p && v && t.fillRect(P, S + a * T + D, x - n, this.fontSize / 15),
        (s += l)
    }
    this._removeShadow(t)
  }
  _getFontDeclaration() {
    let {
        fontFamily: t = this.fontFamily,
        fontStyle: e = this.fontStyle,
        fontWeight: s = this.fontWeight,
        fontSize: i = this.fontSize
      } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = arguments.length > 1 ? arguments[1] : void 0
    const n =
      t.includes("'") || t.includes('"') || t.includes(',') || J.genericFonts.includes(t.toLowerCase())
        ? t
        : '"'.concat(t, '"')
    return [e, s, ''.concat(r ? this.CACHE_FONT_SIZE : i, 'px'), n].join(' ')
  }
  render(t) {
    this.visible &&
      ((this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) ||
        (this._forceClearCache && this.initDimensions(), super.render(t)))
  }
  graphemeSplit(t) {
    return ri(t)
  }
  _splitTextIntoLines(t) {
    const e = t.split(this._reNewline),
      s = new Array(e.length),
      i = [
        `
`
      ]
    let r = []
    for (let n = 0; n < e.length; n++) (s[n] = this.graphemeSplit(e[n])), (r = r.concat(s[n], i))
    return (
      r.pop(),
      {
        _unwrappedLines: s,
        lines: e,
        graphemeText: r,
        graphemeLines: s
      }
    )
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return m(
      m({}, super.toObject([...To, ...t])),
      {},
      {
        styles: Un(this.styles, this.text)
      },
      this.path
        ? {
            path: this.path.toObject()
          }
        : {}
    )
  }
  set(t, e) {
    const { textLayoutProperties: s } = this.constructor
    super.set(t, e)
    let i = !1,
      r = !1
    if (typeof t == 'object')
      for (const n in t) n === 'path' && this.setPathInfo(), (i = i || s.includes(n)), (r = r || n === 'path')
    else (i = s.includes(t)), (r = t === 'path')
    return r && this.setPathInfo(), i && this.initialized && (this.initDimensions(), this.setCoords()), this
  }
  complexity() {
    return 1
  }
  static async fromElement(t, e, s) {
    const i = It(t, J.ATTRIBUTE_NAMES, s),
      r = m(m({}, e), i),
      {
        textAnchor: n = L,
        textDecoration: a = '',
        dx: h = 0,
        dy: c = 0,
        top: l = 0,
        left: u = 0,
        fontSize: g = Hi,
        strokeWidth: d = 1
      } = r,
      p = W(r, Th),
      v = new this(
        (t.textContent || '').replace(/^\s+|\s+$|\n+/g, '').replace(/\s+/g, ' '),
        m(
          {
            left: u + h,
            top: l + c,
            underline: a.includes('underline'),
            overline: a.includes('overline'),
            linethrough: a.includes('line-through'),
            strokeWidth: 0,
            fontSize: g
          },
          p
        )
      ),
      _ = v.getScaledHeight() / v.height,
      x = ((v.height + v.strokeWidth) * v.lineHeight - v.height) * _,
      C = v.getScaledHeight() + x
    let b = 0
    return (
      n === k && (b = v.getScaledWidth() / 2),
      n === H && (b = v.getScaledWidth()),
      v.set({
        left: v.left - b,
        top: v.top - (C - v.fontSize * (0.07 + v._fontSizeFraction)) / v.lineHeight,
        strokeWidth: d
      }),
      v
    )
  }
  static fromObject(t) {
    return this._fromObject(
      m(
        m({}, t),
        {},
        {
          styles: qn(t.styles || {}, t.text)
        }
      ),
      {
        extraParam: 'text'
      }
    )
  }
}
f(J, 'textLayoutProperties', So),
  f(J, 'cacheProperties', [...zt, ...To]),
  f(J, 'ownDefaults', bh),
  f(J, 'type', 'Text'),
  f(J, 'genericFonts', [
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy',
    'system-ui',
    'ui-serif',
    'ui-sans-serif',
    'ui-monospace',
    'ui-rounded',
    'math',
    'emoji',
    'fangsong'
  ]),
  f(
    J,
    'ATTRIBUTE_NAMES',
    re.concat(
      'x',
      'y',
      'dx',
      'dy',
      'font-family',
      'font-style',
      'font-weight',
      'font-size',
      'letter-spacing',
      'text-decoration',
      'text-anchor'
    )
  ),
  Vn(J, [
    class extends bn {
      _toSVG() {
        const o = this._getSVGLeftTopOffsets(),
          t = this._getSVGTextAndBg(o.textTop, o.textLeft)
        return this._wrapSVGTextAndBg(t)
      }
      toSVG(o) {
        return this._createBaseSVGMarkup(this._toSVG(), {
          reviver: o,
          noStyle: !0,
          withShadow: !0
        })
      }
      _getSVGLeftTopOffsets() {
        return {
          textLeft: -this.width / 2,
          textTop: -this.height / 2,
          lineTop: this.getHeightOfLine(0)
        }
      }
      _wrapSVGTextAndBg(o) {
        let { textBgRects: t, textSpans: e } = o
        const s = this.getSvgTextDecoration(this)
        return [
          t.join(''),
          '		<text xml:space="preserve" ',
          this.fontFamily ? 'font-family="'.concat(this.fontFamily.replace(Sh, "'"), '" ') : '',
          this.fontSize ? 'font-size="'.concat(this.fontSize, '" ') : '',
          this.fontStyle ? 'font-style="'.concat(this.fontStyle, '" ') : '',
          this.fontWeight ? 'font-weight="'.concat(this.fontWeight, '" ') : '',
          s ? 'text-decoration="'.concat(s, '" ') : '',
          this.direction === 'rtl' ? 'direction="'.concat(this.direction, '" ') : '',
          'style="',
          this.getSvgStyles(!0),
          '"',
          this.addPaintOrder(),
          ' >',
          e.join(''),
          `</text>
`
        ]
      }
      _getSVGTextAndBg(o, t) {
        const e = [],
          s = []
        let i,
          r = o
        this.backgroundColor &&
          s.push(...vi(this.backgroundColor, -this.width / 2, -this.height / 2, this.width, this.height))
        for (let n = 0, a = this._textLines.length; n < a; n++)
          (i = this._getLineLeftOffset(n)),
            this.direction === 'rtl' && (i += this.width),
            (this.textBackgroundColor || this.styleHas('textBackgroundColor', n)) &&
              this._setSVGTextLineBg(s, n, t + i, r),
            this._setSVGTextLineText(e, n, t + i, r),
            (r += this.getHeightOfLine(n))
        return {
          textSpans: e,
          textBgRects: s
        }
      }
      _createTextCharSpan(o, t, e, s) {
        const i = this.getSvgSpanStyles(t, o !== o.trim() || !!o.match(wh)),
          r = i ? 'style="'.concat(i, '"') : '',
          n = t.deltaY,
          a = n ? ' dy="'.concat(Y(n, E.NUM_FRACTION_DIGITS), '" ') : ''
        return '<tspan x="'
          .concat(Y(e, E.NUM_FRACTION_DIGITS), '" y="')
          .concat(Y(s, E.NUM_FRACTION_DIGITS), '" ')
          .concat(a)
          .concat(r, '>')
          .concat(Nn(o), '</tspan>')
      }
      _setSVGTextLineText(o, t, e, s) {
        const i = this.getHeightOfLine(t),
          r = this.textAlign.includes(At),
          n = this._textLines[t]
        let a,
          h,
          c,
          l,
          u,
          g = '',
          d = 0
        s += (i * (1 - this._fontSizeFraction)) / this.lineHeight
        for (let p = 0, v = n.length - 1; p <= v; p++)
          (u = p === v || this.charSpacing),
            (g += n[p]),
            (c = this.__charBounds[t][p]),
            d === 0 ? ((e += c.kernedWidth - c.width), (d += c.width)) : (d += c.kernedWidth),
            r && !u && this._reSpaceAndTab.test(n[p]) && (u = !0),
            u ||
              ((a = a || this.getCompleteStyleDeclaration(t, p)),
              (h = this.getCompleteStyleDeclaration(t, p + 1)),
              (u = ni(a, h, !0))),
            u &&
              ((l = this._getStyleDeclaration(t, p)),
              o.push(this._createTextCharSpan(g, l, e, s)),
              (g = ''),
              (a = h),
              this.direction === 'rtl' ? (e -= d) : (e += d),
              (d = 0))
      }
      _setSVGTextLineBg(o, t, e, s) {
        const i = this._textLines[t],
          r = this.getHeightOfLine(t) / this.lineHeight
        let n,
          a = 0,
          h = 0,
          c = this.getValueOfPropertyAt(t, 0, 'textBackgroundColor')
        for (let l = 0; l < i.length; l++) {
          const { left: u, width: g, kernedWidth: d } = this.__charBounds[t][l]
          ;(n = this.getValueOfPropertyAt(t, l, 'textBackgroundColor')),
            n !== c ? (c && o.push(...vi(c, e + h, s, a, r)), (h = u), (a = g), (c = n)) : (a += d)
        }
        n && o.push(...vi(c, e + h, s, a, r))
      }
      _getSVGLineTopOffset(o) {
        let t,
          e = 0
        for (t = 0; t < o; t++) e += this.getHeightOfLine(t)
        const s = this.getHeightOfLine(t)
        return {
          lineTop: e,
          offset: ((this._fontSizeMult - this._fontSizeFraction) * s) / (this.lineHeight * this._fontSizeMult)
        }
      }
      getSvgStyles(o) {
        return ''.concat(super.getSvgStyles(o), ' white-space: pre;')
      }
      getSvgSpanStyles(o, t) {
        const {
            fontFamily: e,
            strokeWidth: s,
            stroke: i,
            fill: r,
            fontSize: n,
            fontStyle: a,
            fontWeight: h,
            deltaY: c
          } = o,
          l = this.getSvgTextDecoration(o)
        return [
          i ? ls(nt, i) : '',
          s ? 'stroke-width: '.concat(s, '; ') : '',
          e ? 'font-family: '.concat(e.includes("'") || e.includes('"') ? e : "'".concat(e, "'"), '; ') : '',
          n ? 'font-size: '.concat(n, 'px; ') : '',
          a ? 'font-style: '.concat(a, '; ') : '',
          h ? 'font-weight: '.concat(h, '; ') : '',
          l && 'text-decoration: '.concat(l, '; '),
          r ? ls(U, r) : '',
          c ? 'baseline-shift: '.concat(-c, '; ') : '',
          t ? 'white-space: pre; ' : ''
        ].join('')
      }
      getSvgTextDecoration(o) {
        return ['overline', 'underline', 'line-through'].filter((t) => o[t.replace('-', '')]).join(' ')
      }
    }
  ]),
  w.setClass(J),
  w.setSVGClass(J)
class Oh {
  constructor(t) {
    f(this, 'target', void 0),
      f(this, '__mouseDownInPlace', !1),
      f(this, '__dragStartFired', !1),
      f(this, '__isDraggingOver', !1),
      f(this, '__dragStartSelection', void 0),
      f(this, '__dragImageDisposer', void 0),
      f(this, '_dispose', void 0),
      (this.target = t)
    const e = [
      this.target.on('dragenter', this.dragEnterHandler.bind(this)),
      this.target.on('dragover', this.dragOverHandler.bind(this)),
      this.target.on('dragleave', this.dragLeaveHandler.bind(this)),
      this.target.on('dragend', this.dragEndHandler.bind(this)),
      this.target.on('drop', this.dropHandler.bind(this))
    ]
    this._dispose = () => {
      e.forEach((s) => s()), (this._dispose = void 0)
    }
  }
  isPointerOverSelection(t) {
    const e = this.target,
      s = e.getSelectionStartFromPointer(t)
    return e.isEditing && s >= e.selectionStart && s <= e.selectionEnd && e.selectionStart < e.selectionEnd
  }
  start(t) {
    return (this.__mouseDownInPlace = this.isPointerOverSelection(t))
  }
  isActive() {
    return this.__mouseDownInPlace
  }
  end(t) {
    const e = this.isActive()
    return (
      e && !this.__dragStartFired && (this.target.setCursorByClick(t), this.target.initDelayedCursor(!0)),
      (this.__mouseDownInPlace = !1),
      (this.__dragStartFired = !1),
      (this.__isDraggingOver = !1),
      e
    )
  }
  getDragStartSelection() {
    return this.__dragStartSelection
  }
  setDragImage(t, e) {
    var s
    let { selectionStart: i, selectionEnd: r } = e
    const n = this.target,
      a = n.canvas,
      h = new y(n.flipX ? -1 : 1, n.flipY ? -1 : 1),
      c = n._getCursorBoundaries(i),
      l = new y(c.left + c.leftOffset, c.top + c.topOffset).multiply(h).transform(n.calcTransformMatrix()),
      u = a.getScenePoint(t).subtract(l),
      g = n.getCanvasRetinaScaling(),
      d = n.getBoundingRect(),
      p = l.subtract(new y(d.left, d.top)),
      v = a.viewportTransform,
      _ = p.add(u).transform(v, !0),
      x = n.backgroundColor,
      C = ur(n.styles)
    n.backgroundColor = ''
    const b = {
      stroke: 'transparent',
      fill: 'transparent',
      textBackgroundColor: 'transparent'
    }
    n.setSelectionStyles(b, 0, i), n.setSelectionStyles(b, r, n.text.length), (n.dirty = !0)
    const S = n.toCanvasElement({
      enableRetinaScaling: a.enableRetinaScaling,
      viewportTransform: !0
    })
    ;(n.backgroundColor = x),
      (n.styles = C),
      (n.dirty = !0),
      Ns(S, {
        position: 'fixed',
        left: ''.concat(-S.width, 'px'),
        border: rt,
        width: ''.concat(S.width / g, 'px'),
        height: ''.concat(S.height / g, 'px')
      }),
      this.__dragImageDisposer && this.__dragImageDisposer(),
      (this.__dragImageDisposer = () => {
        S.remove()
      }),
      wt(t.target || this.target.hiddenTextarea).body.appendChild(S),
      (s = t.dataTransfer) === null || s === void 0 || s.setDragImage(S, _.x, _.y)
  }
  onDragStart(t) {
    this.__dragStartFired = !0
    const e = this.target,
      s = this.isActive()
    if (s && t.dataTransfer) {
      const i = (this.__dragStartSelection = {
          selectionStart: e.selectionStart,
          selectionEnd: e.selectionEnd
        }),
        r = e._text.slice(i.selectionStart, i.selectionEnd).join(''),
        n = m(
          {
            text: e.text,
            value: r
          },
          i
        )
      t.dataTransfer.setData('text/plain', r),
        t.dataTransfer.setData(
          'application/fabric',
          JSON.stringify({
            value: r,
            styles: e.getSelectionStyles(i.selectionStart, i.selectionEnd, !0)
          })
        ),
        (t.dataTransfer.effectAllowed = 'copyMove'),
        this.setDragImage(t, n)
    }
    return e.abortCursorAnimation(), s
  }
  canDrop(t) {
    if (this.target.editable && !this.target.getActiveControl() && !t.defaultPrevented) {
      if (this.isActive() && this.__dragStartSelection) {
        const e = this.target.getSelectionStartFromPointer(t),
          s = this.__dragStartSelection
        return e < s.selectionStart || e > s.selectionEnd
      }
      return !0
    }
    return !1
  }
  targetCanDrop(t) {
    return this.target.canDrop(t)
  }
  dragEnterHandler(t) {
    let { e } = t
    const s = this.targetCanDrop(e)
    !this.__isDraggingOver && s && (this.__isDraggingOver = !0)
  }
  dragOverHandler(t) {
    const { e } = t,
      s = this.targetCanDrop(e)
    !this.__isDraggingOver && s
      ? (this.__isDraggingOver = !0)
      : this.__isDraggingOver && !s && (this.__isDraggingOver = !1),
      this.__isDraggingOver && (e.preventDefault(), (t.canDrop = !0), (t.dropTarget = this.target))
  }
  dragLeaveHandler() {
    ;(this.__isDraggingOver || this.isActive()) && (this.__isDraggingOver = !1)
  }
  dropHandler(t) {
    var e
    const { e: s } = t,
      i = s.defaultPrevented
    ;(this.__isDraggingOver = !1), s.preventDefault()
    let r = (e = s.dataTransfer) === null || e === void 0 ? void 0 : e.getData('text/plain')
    if (r && !i) {
      const n = this.target,
        a = n.canvas
      let h = n.getSelectionStartFromPointer(s)
      const { styles: c } = s.dataTransfer.types.includes('application/fabric')
          ? JSON.parse(s.dataTransfer.getData('application/fabric'))
          : {},
        l = r[Math.max(0, r.length - 1)],
        u = 0
      if (this.__dragStartSelection) {
        const g = this.__dragStartSelection.selectionStart,
          d = this.__dragStartSelection.selectionEnd
        h > g && h <= d ? (h = g) : h > d && (h -= d - g), n.removeChars(g, d), delete this.__dragStartSelection
      }
      n._reNewline.test(l) && (n._reNewline.test(n._text[h]) || h === n._text.length) && (r = r.trimEnd()),
        (t.didDrop = !0),
        (t.dropTarget = n),
        n.insertChars(r, c, h),
        a.setActiveObject(n),
        n.enterEditing(s),
        (n.selectionStart = Math.min(h + u, n._text.length)),
        (n.selectionEnd = Math.min(n.selectionStart + r.length, n._text.length)),
        (n.hiddenTextarea.value = n.text),
        n._updateTextarea(),
        n.hiddenTextarea.focus(),
        n.fire(Ls, {
          index: h + u,
          action: 'drop'
        }),
        a.fire('text:changed', {
          target: n
        }),
        (a.contextTopDirty = !0),
        a.requestRenderAll()
    }
  }
  dragEndHandler(t) {
    let { e } = t
    if (this.isActive() && this.__dragStartFired && this.__dragStartSelection) {
      var s
      const i = this.target,
        r = this.target.canvas,
        { selectionStart: n, selectionEnd: a } = this.__dragStartSelection,
        h = ((s = e.dataTransfer) === null || s === void 0 ? void 0 : s.dropEffect) || rt
      h === rt
        ? ((i.selectionStart = n), (i.selectionEnd = a), i._updateTextarea(), i.hiddenTextarea.focus())
        : (i.clearContextTop(),
          h === 'move' &&
            (i.removeChars(n, a),
            (i.selectionStart = i.selectionEnd = n),
            i.hiddenTextarea && (i.hiddenTextarea.value = i.text),
            i._updateTextarea(),
            i.fire(Ls, {
              index: n,
              action: 'dragend'
            }),
            r.fire('text:changed', {
              target: i
            }),
            r.requestRenderAll()),
          i.exitEditing())
    }
    this.__dragImageDisposer && this.__dragImageDisposer(),
      delete this.__dragImageDisposer,
      delete this.__dragStartSelection,
      (this.__isDraggingOver = !1)
  }
  dispose() {
    this._dispose && this._dispose()
  }
}
const Ur = /[ \n\.,;!\?\-]/
class kh extends J {
  constructor() {
    super(...arguments), f(this, '_currentCursorOpacity', 1)
  }
  initBehavior() {
    ;(this._tick = this._tick.bind(this)),
      (this._onTickComplete = this._onTickComplete.bind(this)),
      (this.updateSelectionOnMouseMove = this.updateSelectionOnMouseMove.bind(this))
  }
  onDeselect(t) {
    return this.isEditing && this.exitEditing(), (this.selected = !1), super.onDeselect(t)
  }
  _animateCursor(t) {
    let { toValue: e, duration: s, delay: i, onComplete: r } = t
    return hr({
      startValue: this._currentCursorOpacity,
      endValue: e,
      duration: s,
      delay: i,
      onComplete: r,
      abort: () => !this.canvas || this.selectionStart !== this.selectionEnd,
      onChange: (n) => {
        ;(this._currentCursorOpacity = n), this.renderCursorOrSelection()
      }
    })
  }
  _tick(t) {
    this._currentTickState = this._animateCursor({
      toValue: 0,
      duration: this.cursorDuration / 2,
      delay: Math.max(t || 0, 100),
      onComplete: this._onTickComplete
    })
  }
  _onTickComplete() {
    var t
    ;(t = this._currentTickCompleteState) === null || t === void 0 || t.abort(),
      (this._currentTickCompleteState = this._animateCursor({
        toValue: 1,
        duration: this.cursorDuration,
        onComplete: this._tick
      }))
  }
  initDelayedCursor(t) {
    this.abortCursorAnimation(), this._tick(t ? 0 : this.cursorDelay)
  }
  abortCursorAnimation() {
    let t = !1
    ;[this._currentTickState, this._currentTickCompleteState].forEach((e) => {
      e && !e.isDone() && ((t = !0), e.abort())
    }),
      (this._currentCursorOpacity = 1),
      t && this.clearContextTop()
  }
  restartCursorIfNeeded() {
    ;[this._currentTickState, this._currentTickCompleteState].some((t) => !t || t.isDone()) && this.initDelayedCursor()
  }
  selectAll() {
    return (
      (this.selectionStart = 0),
      (this.selectionEnd = this._text.length),
      this._fireSelectionChanged(),
      this._updateTextarea(),
      this
    )
  }
  getSelectedText() {
    return this._text.slice(this.selectionStart, this.selectionEnd).join('')
  }
  findWordBoundaryLeft(t) {
    let e = 0,
      s = t - 1
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s--
    for (; /\S/.test(this._text[s]) && s > -1; ) e++, s--
    return t - e
  }
  findWordBoundaryRight(t) {
    let e = 0,
      s = t
    if (this._reSpace.test(this._text[s])) for (; this._reSpace.test(this._text[s]); ) e++, s++
    for (; /\S/.test(this._text[s]) && s < this._text.length; ) e++, s++
    return t + e
  }
  findLineBoundaryLeft(t) {
    let e = 0,
      s = t - 1
    for (; !/\n/.test(this._text[s]) && s > -1; ) e++, s--
    return t - e
  }
  findLineBoundaryRight(t) {
    let e = 0,
      s = t
    for (; !/\n/.test(this._text[s]) && s < this._text.length; ) e++, s++
    return t + e
  }
  searchWordBoundary(t, e) {
    const s = this._text
    let i = t > 0 && this._reSpace.test(s[t]) && (e === -1 || !Ni.test(s[t - 1])) ? t - 1 : t,
      r = s[i]
    for (; i > 0 && i < s.length && !Ur.test(r); ) (i += e), (r = s[i])
    return e === -1 && Ur.test(r) && i++, i
  }
  selectWord(t) {
    t = t || this.selectionStart
    const e = this.searchWordBoundary(t, -1),
      s = Math.max(e, this.searchWordBoundary(t, 1))
    ;(this.selectionStart = e),
      (this.selectionEnd = s),
      this._fireSelectionChanged(),
      this._updateTextarea(),
      this.renderCursorOrSelection()
  }
  selectLine(t) {
    t = t || this.selectionStart
    const e = this.findLineBoundaryLeft(t),
      s = this.findLineBoundaryRight(t)
    return (
      (this.selectionStart = e), (this.selectionEnd = s), this._fireSelectionChanged(), this._updateTextarea(), this
    )
  }
  enterEditing(t) {
    !this.isEditing &&
      this.editable &&
      (this.enterEditingImpl(),
      this.fire(
        'editing:entered',
        t
          ? {
              e: t
            }
          : void 0
      ),
      this._fireSelectionChanged(),
      this.canvas &&
        (this.canvas.fire('text:editing:entered', {
          target: this,
          e: t
        }),
        this.canvas.requestRenderAll()))
  }
  enterEditingImpl() {
    this.canvas && (this.canvas.calcOffset(), this.canvas.textEditingManager.exitTextEditing()),
      (this.isEditing = !0),
      this.initHiddenTextarea(),
      this.hiddenTextarea.focus(),
      (this.hiddenTextarea.value = this.text),
      this._updateTextarea(),
      this._saveEditingProps(),
      this._setEditingProps(),
      (this._textBeforeEdit = this.text),
      this._tick()
  }
  updateSelectionOnMouseMove(t) {
    if (this.getActiveControl()) return
    const e = this.hiddenTextarea
    wt(e).activeElement !== e && e.focus()
    const s = this.getSelectionStartFromPointer(t),
      i = this.selectionStart,
      r = this.selectionEnd
    ;((s === this.__selectionStartOnMouseDown && i !== r) || (i !== s && r !== s)) &&
      (s > this.__selectionStartOnMouseDown
        ? ((this.selectionStart = this.__selectionStartOnMouseDown), (this.selectionEnd = s))
        : ((this.selectionStart = s), (this.selectionEnd = this.__selectionStartOnMouseDown)),
      (this.selectionStart === i && this.selectionEnd === r) ||
        (this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()))
  }
  _setEditingProps() {
    ;(this.hoverCursor = 'text'),
      this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = 'text'),
      (this.borderColor = this.editingBorderColor),
      (this.hasControls = this.selectable = !1),
      (this.lockMovementX = this.lockMovementY = !0)
  }
  fromStringToGraphemeSelection(t, e, s) {
    const i = s.slice(0, t),
      r = this.graphemeSplit(i).length
    if (t === e)
      return {
        selectionStart: r,
        selectionEnd: r
      }
    const n = s.slice(t, e)
    return {
      selectionStart: r,
      selectionEnd: r + this.graphemeSplit(n).length
    }
  }
  fromGraphemeToStringSelection(t, e, s) {
    const i = s.slice(0, t).join('').length
    return t === e
      ? {
          selectionStart: i,
          selectionEnd: i
        }
      : {
          selectionStart: i,
          selectionEnd: i + s.slice(t, e).join('').length
        }
  }
  _updateTextarea() {
    if (((this.cursorOffsetCache = {}), this.hiddenTextarea)) {
      if (!this.inCompositionMode) {
        const t = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text)
        ;(this.hiddenTextarea.selectionStart = t.selectionStart), (this.hiddenTextarea.selectionEnd = t.selectionEnd)
      }
      this.updateTextareaPosition()
    }
  }
  updateFromTextArea() {
    if (!this.hiddenTextarea) return
    this.cursorOffsetCache = {}
    const t = this.hiddenTextarea
    ;(this.text = t.value), this.set('dirty', !0), this.initDimensions(), this.setCoords()
    const e = this.fromStringToGraphemeSelection(t.selectionStart, t.selectionEnd, t.value)
    ;(this.selectionEnd = this.selectionStart = e.selectionEnd),
      this.inCompositionMode || (this.selectionStart = e.selectionStart),
      this.updateTextareaPosition()
  }
  updateTextareaPosition() {
    if (this.selectionStart === this.selectionEnd) {
      const t = this._calcTextareaPosition()
      ;(this.hiddenTextarea.style.left = t.left), (this.hiddenTextarea.style.top = t.top)
    }
  }
  _calcTextareaPosition() {
    if (!this.canvas)
      return {
        left: '1px',
        top: '1px'
      }
    const t = this.inCompositionMode ? this.compositionStart : this.selectionStart,
      e = this._getCursorBoundaries(t),
      s = this.get2DCursorLocation(t),
      i = s.lineIndex,
      r = s.charIndex,
      n = this.getValueOfPropertyAt(i, r, 'fontSize') * this.lineHeight,
      a = e.leftOffset,
      h = this.getCanvasRetinaScaling(),
      c = this.canvas.upperCanvasEl,
      l = c.width / h,
      u = c.height / h,
      g = l - n,
      d = u - n,
      p = new y(e.left + a, e.top + e.topOffset + n)
        .transform(this.calcTransformMatrix())
        .transform(this.canvas.viewportTransform)
        .multiply(new y(c.clientWidth / l, c.clientHeight / u))
    return (
      p.x < 0 && (p.x = 0),
      p.x > g && (p.x = g),
      p.y < 0 && (p.y = 0),
      p.y > d && (p.y = d),
      (p.x += this.canvas._offset.left),
      (p.y += this.canvas._offset.top),
      {
        left: ''.concat(p.x, 'px'),
        top: ''.concat(p.y, 'px'),
        fontSize: ''.concat(n, 'px'),
        charHeight: n
      }
    )
  }
  _saveEditingProps() {
    this._savedProps = {
      hasControls: this.hasControls,
      borderColor: this.borderColor,
      lockMovementX: this.lockMovementX,
      lockMovementY: this.lockMovementY,
      hoverCursor: this.hoverCursor,
      selectable: this.selectable,
      defaultCursor: this.canvas && this.canvas.defaultCursor,
      moveCursor: this.canvas && this.canvas.moveCursor
    }
  }
  _restoreEditingProps() {
    this._savedProps &&
      ((this.hoverCursor = this._savedProps.hoverCursor),
      (this.hasControls = this._savedProps.hasControls),
      (this.borderColor = this._savedProps.borderColor),
      (this.selectable = this._savedProps.selectable),
      (this.lockMovementX = this._savedProps.lockMovementX),
      (this.lockMovementY = this._savedProps.lockMovementY),
      this.canvas &&
        ((this.canvas.defaultCursor = this._savedProps.defaultCursor || this.canvas.defaultCursor),
        (this.canvas.moveCursor = this._savedProps.moveCursor || this.canvas.moveCursor)),
      delete this._savedProps)
  }
  _exitEditing() {
    const t = this.hiddenTextarea
    ;(this.selected = !1),
      (this.isEditing = !1),
      t && (t.blur && t.blur(), t.parentNode && t.parentNode.removeChild(t)),
      (this.hiddenTextarea = null),
      this.abortCursorAnimation(),
      this.selectionStart !== this.selectionEnd && this.clearContextTop()
  }
  exitEditingImpl() {
    this._exitEditing(),
      (this.selectionEnd = this.selectionStart),
      this._restoreEditingProps(),
      this._forceClearCache && (this.initDimensions(), this.setCoords())
  }
  exitEditing() {
    const t = this._textBeforeEdit !== this.text
    return (
      this.exitEditingImpl(),
      this.fire('editing:exited'),
      t && this.fire(Rs),
      this.canvas &&
        (this.canvas.fire('text:editing:exited', {
          target: this
        }),
        t &&
          this.canvas.fire('object:modified', {
            target: this
          })),
      this
    )
  }
  _removeExtraneousStyles() {
    for (const t in this.styles) this._textLines[t] || delete this.styles[t]
  }
  removeStyleFromTo(t, e) {
    const { lineIndex: s, charIndex: i } = this.get2DCursorLocation(t, !0),
      { lineIndex: r, charIndex: n } = this.get2DCursorLocation(e, !0)
    if (s !== r) {
      if (this.styles[s]) for (let a = i; a < this._unwrappedTextLines[s].length; a++) delete this.styles[s][a]
      if (this.styles[r])
        for (let a = n; a < this._unwrappedTextLines[r].length; a++) {
          const h = this.styles[r][a]
          h && (this.styles[s] || (this.styles[s] = {}), (this.styles[s][i + a - n] = h))
        }
      for (let a = s + 1; a <= r; a++) delete this.styles[a]
      this.shiftLineStyles(r, s - r)
    } else if (this.styles[s]) {
      const a = this.styles[s],
        h = n - i
      for (let c = i; c < n; c++) delete a[c]
      for (const c in this.styles[s]) {
        const l = parseInt(c, 10)
        l >= n && ((a[l - h] = a[c]), delete a[c])
      }
    }
  }
  shiftLineStyles(t, e) {
    const s = Object.assign({}, this.styles)
    for (const i in this.styles) {
      const r = parseInt(i, 10)
      r > t && ((this.styles[r + e] = s[r]), s[r - e] || delete this.styles[r])
    }
  }
  insertNewlineStyleObject(t, e, s, i) {
    const r = {},
      n = this._unwrappedTextLines[t].length,
      a = n === e
    let h = !1
    s || (s = 1), this.shiftLineStyles(t, s)
    const c = this.styles[t] ? this.styles[t][e === 0 ? e : e - 1] : void 0
    for (const u in this.styles[t]) {
      const g = parseInt(u, 10)
      g >= e && ((h = !0), (r[g - e] = this.styles[t][u]), (a && e === 0) || delete this.styles[t][u])
    }
    let l = !1
    for (h && !a && ((this.styles[t + s] = r), (l = !0)), (l || n > e) && s--; s > 0; )
      i && i[s - 1]
        ? (this.styles[t + s] = {
            0: m({}, i[s - 1])
          })
        : c
        ? (this.styles[t + s] = {
            0: m({}, c)
          })
        : delete this.styles[t + s],
        s--
    this._forceClearCache = !0
  }
  insertCharStyleObject(t, e, s, i) {
    this.styles || (this.styles = {})
    const r = this.styles[t],
      n = r ? m({}, r) : {}
    s || (s = 1)
    for (const h in n) {
      const c = parseInt(h, 10)
      c >= e && ((r[c + s] = n[c]), n[c - s] || delete r[c])
    }
    if (((this._forceClearCache = !0), i)) {
      for (; s--; )
        Object.keys(i[s]).length && (this.styles[t] || (this.styles[t] = {}), (this.styles[t][e + s] = m({}, i[s])))
      return
    }
    if (!r) return
    const a = r[e ? e - 1 : 1]
    for (; a && s--; ) this.styles[t][e + s] = m({}, a)
  }
  insertNewStyleBlock(t, e, s) {
    const i = this.get2DCursorLocation(e, !0),
      r = [0]
    let n,
      a = 0
    for (let h = 0; h < t.length; h++)
      t[h] ===
      `
`
        ? (a++, (r[a] = 0))
        : r[a]++
    for (
      r[0] > 0 && (this.insertCharStyleObject(i.lineIndex, i.charIndex, r[0], s), (s = s && s.slice(r[0] + 1))),
        a && this.insertNewlineStyleObject(i.lineIndex, i.charIndex + r[0], a),
        n = 1;
      n < a;
      n++
    )
      r[n] > 0
        ? this.insertCharStyleObject(i.lineIndex + n, 0, r[n], s)
        : s && this.styles[i.lineIndex + n] && s[0] && (this.styles[i.lineIndex + n][0] = s[0]),
        (s = s && s.slice(r[n] + 1))
    r[n] > 0 && this.insertCharStyleObject(i.lineIndex + n, 0, r[n], s)
  }
  removeChars(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t + 1
    this.removeStyleFromTo(t, e),
      this._text.splice(t, e - t),
      (this.text = this._text.join('')),
      this.set('dirty', !0),
      this.initDimensions(),
      this.setCoords(),
      this._removeExtraneousStyles()
  }
  insertChars(t, e, s) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : s
    i > s && this.removeStyleFromTo(s, i)
    const r = this.graphemeSplit(t)
    this.insertNewStyleBlock(r, s, e),
      (this._text = [...this._text.slice(0, s), ...r, ...this._text.slice(i)]),
      (this.text = this._text.join('')),
      this.set('dirty', !0),
      this.initDimensions(),
      this.setCoords(),
      this._removeExtraneousStyles()
  }
  setSelectionStartEndWithShift(t, e, s) {
    s <= t
      ? (e === t
          ? (this._selectionDirection = L)
          : this._selectionDirection === H && ((this._selectionDirection = L), (this.selectionEnd = t)),
        (this.selectionStart = s))
      : s > t && s < e
      ? this._selectionDirection === H
        ? (this.selectionEnd = s)
        : (this.selectionStart = s)
      : (e === t
          ? (this._selectionDirection = H)
          : this._selectionDirection === L && ((this._selectionDirection = H), (this.selectionStart = e)),
        (this.selectionEnd = s))
  }
}
class Dh extends kh {
  initHiddenTextarea() {
    const t = (this.canvas && wt(this.canvas.getElement())) || fe(),
      e = t.createElement('textarea')
    Object.entries({
      autocapitalize: 'off',
      autocorrect: 'off',
      autocomplete: 'off',
      spellcheck: 'false',
      'data-fabric': 'textarea',
      wrap: 'off'
    }).map((n) => {
      let [a, h] = n
      return e.setAttribute(a, h)
    })
    const { top: s, left: i, fontSize: r } = this._calcTextareaPosition()
    ;(e.style.cssText = 'position: absolute; top: '
      .concat(s, '; left: ')
      .concat(i, '; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: ')
      .concat(r, ';')),
      (this.hiddenTextareaContainer || t.body).appendChild(e),
      Object.entries({
        blur: 'blur',
        keydown: 'onKeyDown',
        keyup: 'onKeyUp',
        input: 'onInput',
        copy: 'copy',
        cut: 'copy',
        paste: 'paste',
        compositionstart: 'onCompositionStart',
        compositionupdate: 'onCompositionUpdate',
        compositionend: 'onCompositionEnd'
      }).map((n) => {
        let [a, h] = n
        return e.addEventListener(a, this[h].bind(this))
      }),
      (this.hiddenTextarea = e)
  }
  blur() {
    this.abortCursorAnimation()
  }
  onKeyDown(t) {
    if (!this.isEditing) return
    const e = this.direction === 'rtl' ? this.keysMapRtl : this.keysMap
    if (t.keyCode in e) this[e[t.keyCode]](t)
    else {
      if (!(t.keyCode in this.ctrlKeysMapDown) || (!t.ctrlKey && !t.metaKey)) return
      this[this.ctrlKeysMapDown[t.keyCode]](t)
    }
    t.stopImmediatePropagation(),
      t.preventDefault(),
      t.keyCode >= 33 && t.keyCode <= 40
        ? ((this.inCompositionMode = !1), this.clearContextTop(), this.renderCursorOrSelection())
        : this.canvas && this.canvas.requestRenderAll()
  }
  onKeyUp(t) {
    !this.isEditing || this._copyDone || this.inCompositionMode
      ? (this._copyDone = !1)
      : t.keyCode in this.ctrlKeysMapUp &&
        (t.ctrlKey || t.metaKey) &&
        (this[this.ctrlKeysMapUp[t.keyCode]](t),
        t.stopImmediatePropagation(),
        t.preventDefault(),
        this.canvas && this.canvas.requestRenderAll())
  }
  onInput(t) {
    const e = this.fromPaste
    if (((this.fromPaste = !1), t && t.stopPropagation(), !this.isEditing)) return
    const s = () => {
      this.updateFromTextArea(),
        this.fire(Ls),
        this.canvas &&
          (this.canvas.fire('text:changed', {
            target: this
          }),
          this.canvas.requestRenderAll())
    }
    if (this.hiddenTextarea.value === '') return (this.styles = {}), void s()
    const i = this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText,
      r = this._text.length,
      n = i.length,
      a = this.selectionStart,
      h = this.selectionEnd,
      c = a !== h
    let l,
      u,
      g,
      d,
      p = n - r
    const v = this.fromStringToGraphemeSelection(
        this.hiddenTextarea.selectionStart,
        this.hiddenTextarea.selectionEnd,
        this.hiddenTextarea.value
      ),
      _ = a > v.selectionStart
    c
      ? ((u = this._text.slice(a, h)), (p += h - a))
      : n < r && (u = _ ? this._text.slice(h + p, h) : this._text.slice(a, a - p))
    const x = i.slice(v.selectionEnd - p, v.selectionEnd)
    if (
      (u &&
        u.length &&
        (x.length && ((l = this.getSelectionStyles(a, a + 1, !1)), (l = x.map(() => l[0]))),
        c ? ((g = a), (d = h)) : _ ? ((g = h - u.length), (d = h)) : ((g = h), (d = h + u.length)),
        this.removeStyleFromTo(g, d)),
      x.length)
    ) {
      const { copyPasteData: C } = Ot()
      e && x.join('') === C.copiedText && !E.disableStyleCopyPaste && (l = C.copiedTextStyle),
        this.insertNewStyleBlock(x, a, l)
    }
    s()
  }
  onCompositionStart() {
    this.inCompositionMode = !0
  }
  onCompositionEnd() {
    this.inCompositionMode = !1
  }
  onCompositionUpdate(t) {
    let { target: e } = t
    const { selectionStart: s, selectionEnd: i } = e
    ;(this.compositionStart = s), (this.compositionEnd = i), this.updateTextareaPosition()
  }
  copy() {
    if (this.selectionStart === this.selectionEnd) return
    const { copyPasteData: t } = Ot()
    ;(t.copiedText = this.getSelectedText()),
      E.disableStyleCopyPaste
        ? (t.copiedTextStyle = void 0)
        : (t.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, !0)),
      (this._copyDone = !0)
  }
  paste() {
    this.fromPaste = !0
  }
  _getWidthBeforeCursor(t, e) {
    let s,
      i = this._getLineLeftOffset(t)
    return e > 0 && ((s = this.__charBounds[t][e - 1]), (i += s.left + s.width)), i
  }
  getDownCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e),
      i = this.get2DCursorLocation(s),
      r = i.lineIndex
    if (r === this._textLines.length - 1 || t.metaKey || t.keyCode === 34) return this._text.length - s
    const n = i.charIndex,
      a = this._getWidthBeforeCursor(r, n),
      h = this._getIndexOnLine(r + 1, a)
    return this._textLines[r].slice(n).length + h + 1 + this.missingNewlineOffset(r)
  }
  _getSelectionForOffset(t, e) {
    return t.shiftKey && this.selectionStart !== this.selectionEnd && e ? this.selectionEnd : this.selectionStart
  }
  getUpCursorOffset(t, e) {
    const s = this._getSelectionForOffset(t, e),
      i = this.get2DCursorLocation(s),
      r = i.lineIndex
    if (r === 0 || t.metaKey || t.keyCode === 33) return -s
    const n = i.charIndex,
      a = this._getWidthBeforeCursor(r, n),
      h = this._getIndexOnLine(r - 1, a),
      c = this._textLines[r].slice(0, n),
      l = this.missingNewlineOffset(r - 1)
    return -this._textLines[r - 1].length + h - c.length + (1 - l)
  }
  _getIndexOnLine(t, e) {
    const s = this._textLines[t]
    let i,
      r,
      n = this._getLineLeftOffset(t),
      a = 0
    for (let h = 0, c = s.length; h < c; h++)
      if (((i = this.__charBounds[t][h].width), (n += i), n > e)) {
        r = !0
        const l = n - i,
          u = n,
          g = Math.abs(l - e)
        a = Math.abs(u - e) < g ? h : h - 1
        break
      }
    return r || (a = s.length - 1), a
  }
  moveCursorDown(t) {
    ;(this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length) ||
      this._moveCursorUpOrDown('Down', t)
  }
  moveCursorUp(t) {
    ;(this.selectionStart === 0 && this.selectionEnd === 0) || this._moveCursorUpOrDown('Up', t)
  }
  _moveCursorUpOrDown(t, e) {
    const s = this['get'.concat(t, 'CursorOffset')](e, this._selectionDirection === H)
    if ((e.shiftKey ? this.moveCursorWithShift(s) : this.moveCursorWithoutShift(s), s !== 0)) {
      const i = this.text.length
      ;(this.selectionStart = de(0, this.selectionStart, i)),
        (this.selectionEnd = de(0, this.selectionEnd, i)),
        this.abortCursorAnimation(),
        this.initDelayedCursor(),
        this._fireSelectionChanged(),
        this._updateTextarea()
    }
  }
  moveCursorWithShift(t) {
    const e = this._selectionDirection === L ? this.selectionStart + t : this.selectionEnd + t
    return this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, e), t !== 0
  }
  moveCursorWithoutShift(t) {
    return (
      t < 0
        ? ((this.selectionStart += t), (this.selectionEnd = this.selectionStart))
        : ((this.selectionEnd += t), (this.selectionStart = this.selectionEnd)),
      t !== 0
    )
  }
  moveCursorLeft(t) {
    ;(this.selectionStart === 0 && this.selectionEnd === 0) || this._moveCursorLeftOrRight('Left', t)
  }
  _move(t, e, s) {
    let i
    if (t.altKey) i = this['findWordBoundary'.concat(s)](this[e])
    else {
      if (!t.metaKey && t.keyCode !== 35 && t.keyCode !== 36) return (this[e] += s === 'Left' ? -1 : 1), !0
      i = this['findLineBoundary'.concat(s)](this[e])
    }
    return i !== void 0 && this[e] !== i && ((this[e] = i), !0)
  }
  _moveLeft(t, e) {
    return this._move(t, e, 'Left')
  }
  _moveRight(t, e) {
    return this._move(t, e, 'Right')
  }
  moveCursorLeftWithoutShift(t) {
    let e = !0
    return (
      (this._selectionDirection = L),
      this.selectionEnd === this.selectionStart &&
        this.selectionStart !== 0 &&
        (e = this._moveLeft(t, 'selectionStart')),
      (this.selectionEnd = this.selectionStart),
      e
    )
  }
  moveCursorLeftWithShift(t) {
    return this._selectionDirection === H && this.selectionStart !== this.selectionEnd
      ? this._moveLeft(t, 'selectionEnd')
      : this.selectionStart !== 0
      ? ((this._selectionDirection = L), this._moveLeft(t, 'selectionStart'))
      : void 0
  }
  moveCursorRight(t) {
    ;(this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length) ||
      this._moveCursorLeftOrRight('Right', t)
  }
  _moveCursorLeftOrRight(t, e) {
    const s = 'moveCursor'.concat(t).concat(e.shiftKey ? 'WithShift' : 'WithoutShift')
    ;(this._currentCursorOpacity = 1),
      this[s](e) &&
        (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea())
  }
  moveCursorRightWithShift(t) {
    return this._selectionDirection === L && this.selectionStart !== this.selectionEnd
      ? this._moveRight(t, 'selectionStart')
      : this.selectionEnd !== this._text.length
      ? ((this._selectionDirection = H), this._moveRight(t, 'selectionEnd'))
      : void 0
  }
  moveCursorRightWithoutShift(t) {
    let e = !0
    return (
      (this._selectionDirection = H),
      this.selectionStart === this.selectionEnd
        ? ((e = this._moveRight(t, 'selectionStart')), (this.selectionEnd = this.selectionStart))
        : (this.selectionStart = this.selectionEnd),
      e
    )
  }
}
const _i = (o) => !!o.button
class Mh extends Dh {
  constructor() {
    super(...arguments), f(this, 'draggableTextDelegate', void 0)
  }
  initBehavior() {
    this.on('mousedown', this._mouseDownHandler),
      this.on('mousedown:before', this._mouseDownHandlerBefore),
      this.on('mouseup', this.mouseUpHandler),
      this.on('mousedblclick', this.doubleClickHandler),
      this.on('tripleclick', this.tripleClickHandler),
      (this.__lastClickTime = +new Date()),
      (this.__lastLastClickTime = +new Date()),
      (this.__lastPointer = {}),
      this.on('mousedown', this.onMouseDown),
      (this.draggableTextDelegate = new Oh(this)),
      super.initBehavior()
  }
  shouldStartDragging() {
    return this.draggableTextDelegate.isActive()
  }
  onDragStart(t) {
    return this.draggableTextDelegate.onDragStart(t)
  }
  canDrop(t) {
    return this.draggableTextDelegate.canDrop(t)
  }
  onMouseDown(t) {
    if (!this.canvas) return
    this.__newClickTime = +new Date()
    const e = t.pointer
    this.isTripleClick(e) && (this.fire('tripleclick', t), Ti(t.e)),
      (this.__lastLastClickTime = this.__lastClickTime),
      (this.__lastClickTime = this.__newClickTime),
      (this.__lastPointer = e),
      (this.__lastSelected = this.selected && !this.getActiveControl())
  }
  isTripleClick(t) {
    return (
      this.__newClickTime - this.__lastClickTime < 500 &&
      this.__lastClickTime - this.__lastLastClickTime < 500 &&
      this.__lastPointer.x === t.x &&
      this.__lastPointer.y === t.y
    )
  }
  doubleClickHandler(t) {
    this.isEditing && this.selectWord(this.getSelectionStartFromPointer(t.e))
  }
  tripleClickHandler(t) {
    this.isEditing && this.selectLine(this.getSelectionStartFromPointer(t.e))
  }
  _mouseDownHandler(t) {
    let { e } = t
    this.canvas &&
      this.editable &&
      !_i(e) &&
      !this.getActiveControl() &&
      (this.draggableTextDelegate.start(e) ||
        (this.canvas.textEditingManager.register(this),
        this.selected && ((this.inCompositionMode = !1), this.setCursorByClick(e)),
        this.isEditing &&
          ((this.__selectionStartOnMouseDown = this.selectionStart),
          this.selectionStart === this.selectionEnd && this.abortCursorAnimation(),
          this.renderCursorOrSelection())))
  }
  _mouseDownHandlerBefore(t) {
    let { e } = t
    this.canvas && this.editable && !_i(e) && (this.selected = this === this.canvas._activeObject)
  }
  mouseUpHandler(t) {
    let { e, transform: s } = t
    const i = this.draggableTextDelegate.end(e)
    if (this.canvas) {
      this.canvas.textEditingManager.unregister(this)
      const r = this.canvas._activeObject
      if (r && r !== this) return
    }
    !this.editable ||
      (this.group && !this.group.interactive) ||
      (s && s.actionPerformed) ||
      _i(e) ||
      i ||
      (this.__lastSelected && !this.getActiveControl()
        ? ((this.selected = !1),
          (this.__lastSelected = !1),
          this.enterEditing(e),
          this.selectionStart === this.selectionEnd ? this.initDelayedCursor(!0) : this.renderCursorOrSelection())
        : (this.selected = !0))
  }
  setCursorByClick(t) {
    const e = this.getSelectionStartFromPointer(t),
      s = this.selectionStart,
      i = this.selectionEnd
    t.shiftKey ? this.setSelectionStartEndWithShift(s, i, e) : ((this.selectionStart = e), (this.selectionEnd = e)),
      this.isEditing && (this._fireSelectionChanged(), this._updateTextarea())
  }
  getSelectionStartFromPointer(t) {
    const e = this.canvas
      .getScenePoint(t)
      .transform(ht(this.calcTransformMatrix()))
      .add(new y(-this._getLeftOffset(), -this._getTopOffset()))
    let s = 0,
      i = 0,
      r = 0
    for (let c = 0; c < this._textLines.length && s <= e.y; c++)
      (s += this.getHeightOfLine(c)),
        (r = c),
        c > 0 && (i += this._textLines[c - 1].length + this.missingNewlineOffset(c - 1))
    let n = Math.abs(this._getLineLeftOffset(r))
    const a = this._textLines[r].length,
      h = this.__charBounds[r]
    for (let c = 0; c < a; c++) {
      const l = n + h[c].kernedWidth
      if (e.x <= l) {
        Math.abs(e.x - l) <= Math.abs(e.x - n) && i++
        break
      }
      ;(n = l), i++
    }
    return Math.min(this.flipX ? a - i : i, this._text.length)
  }
}
const bs = 'moveCursorUp',
  ws = 'moveCursorDown',
  Ss = 'moveCursorLeft',
  Ts = 'moveCursorRight',
  Os = 'exitEditing',
  Ph = m(
    {
      selectionStart: 0,
      selectionEnd: 0,
      selectionColor: 'rgba(17,119,255,0.3)',
      isEditing: !1,
      editable: !0,
      editingBorderColor: 'rgba(102,153,255,0.25)',
      cursorWidth: 2,
      cursorColor: '',
      cursorDelay: 1e3,
      cursorDuration: 600,
      caching: !0,
      hiddenTextareaContainer: null,
      keysMap: {
        9: Os,
        27: Os,
        33: bs,
        34: ws,
        35: Ts,
        36: Ss,
        37: Ss,
        38: bs,
        39: Ts,
        40: ws
      },
      keysMapRtl: {
        9: Os,
        27: Os,
        33: bs,
        34: ws,
        35: Ss,
        36: Ts,
        37: Ts,
        38: bs,
        39: Ss,
        40: ws
      },
      ctrlKeysMapDown: {
        65: 'selectAll'
      },
      ctrlKeysMapUp: {
        67: 'copy',
        88: 'cut'
      }
    },
    {
      _selectionDirection: null,
      _reSpace: /\s|\r?\n/,
      inCompositionMode: !1
    }
  )
class Lt extends Mh {
  static getDefaults() {
    return m(m({}, super.getDefaults()), Lt.ownDefaults)
  }
  get type() {
    const t = super.type
    return t === 'itext' ? 'i-text' : t
  }
  constructor(t, e) {
    super(t, m(m({}, Lt.ownDefaults), e)), this.initBehavior()
  }
  _set(t, e) {
    return this.isEditing && this._savedProps && t in this._savedProps
      ? ((this._savedProps[t] = e), this)
      : (t === 'canvas' &&
          (this.canvas instanceof Ri && this.canvas.textEditingManager.remove(this),
          e instanceof Ri && e.textEditingManager.add(this)),
        super._set(t, e))
  }
  setSelectionStart(t) {
    ;(t = Math.max(t, 0)), this._updateAndFire('selectionStart', t)
  }
  setSelectionEnd(t) {
    ;(t = Math.min(t, this.text.length)), this._updateAndFire('selectionEnd', t)
  }
  _updateAndFire(t, e) {
    this[t] !== e && (this._fireSelectionChanged(), (this[t] = e)), this._updateTextarea()
  }
  _fireSelectionChanged() {
    this.fire('selection:changed'),
      this.canvas &&
        this.canvas.fire('text:selection:changed', {
          target: this
        })
  }
  initDimensions() {
    this.isEditing && this.initDelayedCursor(), super.initDimensions()
  }
  getSelectionStyles() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart || 0,
      e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionEnd,
      s = arguments.length > 2 ? arguments[2] : void 0
    return super.getSelectionStyles(t, e, s)
  }
  setSelectionStyles(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.selectionStart || 0,
      s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.selectionEnd
    return super.setSelectionStyles(t, e, s)
  }
  get2DCursorLocation() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart,
      e = arguments.length > 1 ? arguments[1] : void 0
    return super.get2DCursorLocation(t, e)
  }
  render(t) {
    super.render(t), (this.cursorOffsetCache = {}), this.renderCursorOrSelection()
  }
  toCanvasElement(t) {
    const e = this.isEditing
    this.isEditing = !1
    const s = super.toCanvasElement(t)
    return (this.isEditing = e), s
  }
  renderCursorOrSelection() {
    if (!this.isEditing) return
    const t = this.clearContextTop(!0)
    if (!t) return
    const e = this._getCursorBoundaries()
    this.selectionStart !== this.selectionEnd || this.inCompositionMode
      ? this.renderSelection(t, e)
      : this.renderCursor(t, e),
      (this.canvas.contextTopDirty = !0),
      t.restore()
  }
  _getCursorBoundaries() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart,
      e = arguments.length > 1 ? arguments[1] : void 0
    const s = this._getLeftOffset(),
      i = this._getTopOffset(),
      r = this._getCursorBoundariesOffsets(t, e)
    return {
      left: s,
      top: i,
      leftOffset: r.left,
      topOffset: r.top
    }
  }
  _getCursorBoundariesOffsets(t, e) {
    return e
      ? this.__getCursorBoundariesOffsets(t)
      : this.cursorOffsetCache && 'top' in this.cursorOffsetCache
      ? this.cursorOffsetCache
      : (this.cursorOffsetCache = this.__getCursorBoundariesOffsets(t))
  }
  __getCursorBoundariesOffsets(t) {
    let e = 0,
      s = 0
    const { charIndex: i, lineIndex: r } = this.get2DCursorLocation(t)
    for (let c = 0; c < r; c++) e += this.getHeightOfLine(c)
    const n = this._getLineLeftOffset(r),
      a = this.__charBounds[r][i]
    a && (s = a.left), this.charSpacing !== 0 && i === this._textLines[r].length && (s -= this._getWidthOfCharSpacing())
    const h = {
      top: e,
      left: n + (s > 0 ? s : 0)
    }
    return (
      this.direction === 'rtl' &&
        (this.textAlign === H || this.textAlign === At || this.textAlign === ns
          ? (h.left *= -1)
          : this.textAlign === L || this.textAlign === Us
          ? (h.left = n - (s > 0 ? s : 0))
          : (this.textAlign !== k && this.textAlign !== os) || (h.left = n - (s > 0 ? s : 0))),
      h
    )
  }
  renderCursorAt(t) {
    this._renderCursor(this.canvas.contextTop, this._getCursorBoundaries(t, !0), t)
  }
  renderCursor(t, e) {
    this._renderCursor(t, e, this.selectionStart)
  }
  getCursorRenderingData() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.selectionStart,
      e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._getCursorBoundaries(t)
    const s = this.get2DCursorLocation(t),
      i = s.lineIndex,
      r = s.charIndex > 0 ? s.charIndex - 1 : 0,
      n = this.getValueOfPropertyAt(i, r, 'fontSize'),
      a = this.getObjectScaling().x * this.canvas.getZoom(),
      h = this.cursorWidth / a,
      c = this.getValueOfPropertyAt(i, r, 'deltaY'),
      l =
        e.topOffset +
        ((1 - this._fontSizeFraction) * this.getHeightOfLine(i)) / this.lineHeight -
        n * (1 - this._fontSizeFraction)
    return {
      color: this.cursorColor || this.getValueOfPropertyAt(i, r, 'fill'),
      opacity: this._currentCursorOpacity,
      left: e.left + e.leftOffset - h / 2,
      top: l + e.top + c,
      width: h,
      height: n
    }
  }
  _renderCursor(t, e, s) {
    const { color: i, opacity: r, left: n, top: a, width: h, height: c } = this.getCursorRenderingData(s, e)
    ;(t.fillStyle = i), (t.globalAlpha = r), t.fillRect(n, a, h, c)
  }
  renderSelection(t, e) {
    const s = {
      selectionStart: this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart,
      selectionEnd: this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd
    }
    this._renderSelection(t, s, e)
  }
  renderDragSourceEffect() {
    const t = this.draggableTextDelegate.getDragStartSelection()
    this._renderSelection(this.canvas.contextTop, t, this._getCursorBoundaries(t.selectionStart, !0))
  }
  renderDropTargetEffect(t) {
    const e = this.getSelectionStartFromPointer(t)
    this.renderCursorAt(e)
  }
  _renderSelection(t, e, s) {
    const i = e.selectionStart,
      r = e.selectionEnd,
      n = this.textAlign.includes(At),
      a = this.get2DCursorLocation(i),
      h = this.get2DCursorLocation(r),
      c = a.lineIndex,
      l = h.lineIndex,
      u = a.charIndex < 0 ? 0 : a.charIndex,
      g = h.charIndex < 0 ? 0 : h.charIndex
    for (let d = c; d <= l; d++) {
      const p = this._getLineLeftOffset(d) || 0
      let v = this.getHeightOfLine(d),
        _ = 0,
        x = 0,
        C = 0
      if ((d === c && (x = this.__charBounds[c][u].left), d >= c && d < l))
        C = n && !this.isEndOfWrapping(d) ? this.width : this.getLineWidth(d) || 5
      else if (d === l)
        if (g === 0) C = this.__charBounds[l][g].left
        else {
          const P = this._getWidthOfCharSpacing()
          C = this.__charBounds[l][g - 1].left + this.__charBounds[l][g - 1].width - P
        }
      ;(_ = v), (this.lineHeight < 1 || (d === l && this.lineHeight > 1)) && (v /= this.lineHeight)
      let b = s.left + p + x,
        S = v,
        T = 0
      const D = C - x
      this.inCompositionMode
        ? ((t.fillStyle = this.compositionColor || 'black'), (S = 1), (T = v))
        : (t.fillStyle = this.selectionColor),
        this.direction === 'rtl' &&
          (this.textAlign === H || this.textAlign === At || this.textAlign === ns
            ? (b = this.width - b - D)
            : this.textAlign === L || this.textAlign === Us
            ? (b = s.left + p - C)
            : (this.textAlign !== k && this.textAlign !== os) || (b = s.left + p - C)),
        t.fillRect(b, s.top + s.topOffset + T, D, S),
        (s.topOffset += _)
    }
  }
  getCurrentCharFontSize() {
    const t = this._getCurrentCharIndex()
    return this.getValueOfPropertyAt(t.l, t.c, 'fontSize')
  }
  getCurrentCharColor() {
    const t = this._getCurrentCharIndex()
    return this.getValueOfPropertyAt(t.l, t.c, U)
  }
  _getCurrentCharIndex() {
    const t = this.get2DCursorLocation(this.selectionStart, !0),
      e = t.charIndex > 0 ? t.charIndex - 1 : 0
    return {
      l: t.lineIndex,
      c: e
    }
  }
  dispose() {
    this.exitEditingImpl(), this.draggableTextDelegate.dispose(), super.dispose()
  }
}
f(Lt, 'ownDefaults', Ph), f(Lt, 'type', 'IText'), w.setClass(Lt), w.setClass(Lt, 'i-text')
class Qt extends Lt {
  static getDefaults() {
    return m(m({}, super.getDefaults()), Qt.ownDefaults)
  }
  constructor(t, e) {
    super(t, m(m({}, Qt.ownDefaults), e))
  }
  static createControls() {
    return {
      controls: Wn()
    }
  }
  initDimensions() {
    this.initialized &&
      (this.isEditing && this.initDelayedCursor(),
      this._clearCache(),
      (this.dynamicMinWidth = 0),
      (this._styleMap = this._generateStyleMap(this._splitText())),
      this.dynamicMinWidth > this.width && this._set('width', this.dynamicMinWidth),
      this.textAlign.includes(At) && this.enlargeSpaces(),
      (this.height = this.calcTextHeight()))
  }
  _generateStyleMap(t) {
    let e = 0,
      s = 0,
      i = 0
    const r = {}
    for (let n = 0; n < t.graphemeLines.length; n++)
      t.graphemeText[i] ===
        `
` && n > 0
        ? ((s = 0), i++, e++)
        : !this.splitByGrapheme && this._reSpaceAndTab.test(t.graphemeText[i]) && n > 0 && (s++, i++),
        (r[n] = {
          line: e,
          offset: s
        }),
        (i += t.graphemeLines[n].length),
        (s += t.graphemeLines[n].length)
    return r
  }
  styleHas(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[e]
      s && (e = s.line)
    }
    return super.styleHas(t, e)
  }
  isEmptyStyles(t) {
    if (!this.styles) return !0
    let e,
      s = 0,
      i = t + 1,
      r = !1
    const n = this._styleMap[t],
      a = this._styleMap[t + 1]
    n && ((t = n.line), (s = n.offset)), a && ((i = a.line), (r = i === t), (e = a.offset))
    const h =
      t === void 0
        ? this.styles
        : {
            line: this.styles[t]
          }
    for (const c in h)
      for (const l in h[c]) {
        const u = parseInt(l, 10)
        if (u >= s && (!r || u < e)) for (const g in h[c][l]) return !1
      }
    return !0
  }
  _getStyleDeclaration(t, e) {
    if (this._styleMap && !this.isWrapping) {
      const s = this._styleMap[t]
      if (!s) return {}
      ;(t = s.line), (e = s.offset + e)
    }
    return super._getStyleDeclaration(t, e)
  }
  _setStyleDeclaration(t, e, s) {
    const i = this._styleMap[t]
    super._setStyleDeclaration(i.line, i.offset + e, s)
  }
  _deleteStyleDeclaration(t, e) {
    const s = this._styleMap[t]
    super._deleteStyleDeclaration(s.line, s.offset + e)
  }
  _getLineStyle(t) {
    const e = this._styleMap[t]
    return !!this.styles[e.line]
  }
  _setLineStyle(t) {
    const e = this._styleMap[t]
    super._setLineStyle(e.line)
  }
  _wrapText(t, e) {
    this.isWrapping = !0
    const s = this.getGraphemeDataForRender(t),
      i = []
    for (let r = 0; r < s.wordsData.length; r++) i.push(...this._wrapLine(r, e, s))
    return (this.isWrapping = !1), i
  }
  getGraphemeDataForRender(t) {
    const e = this.splitByGrapheme,
      s = e ? '' : ' '
    let i = 0
    return {
      wordsData: t.map((r, n) => {
        let a = 0
        const h = e ? this.graphemeSplit(r) : this.wordSplit(r)
        return h.length === 0
          ? [
              {
                word: [],
                width: 0
              }
            ]
          : h.map((c) => {
              const l = e ? [c] : this.graphemeSplit(c),
                u = this._measureWord(l, n, a)
              return (
                (i = Math.max(u, i)),
                (a += l.length + s.length),
                {
                  word: l,
                  width: u
                }
              )
            })
      }),
      largestWordWidth: i
    }
  }
  _measureWord(t, e) {
    let s,
      i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      r = 0
    for (let n = 0, a = t.length; n < a; n++) (r += this._getGraphemeBox(t[n], e, n + i, s, !0).kernedWidth), (s = t[n])
    return r
  }
  wordSplit(t) {
    return t.split(this._wordJoiners)
  }
  _wrapLine(t, e, s) {
    let { largestWordWidth: i, wordsData: r } = s,
      n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0
    const a = this._getWidthOfCharSpacing(),
      h = this.splitByGrapheme,
      c = [],
      l = h ? '' : ' '
    let u = 0,
      g = [],
      d = 0,
      p = 0,
      v = !0
    e -= n
    const _ = Math.max(e, i, this.dynamicMinWidth),
      x = r[t]
    let C
    for (d = 0, C = 0; C < x.length; C++) {
      const { word: b, width: S } = x[C]
      ;(d += b.length),
        (u += p + S - a),
        u > _ && !v ? (c.push(g), (g = []), (u = S), (v = !0)) : (u += a),
        v || h || g.push(l),
        (g = g.concat(b)),
        (p = h ? 0 : this._measureWord([l], t, d)),
        d++,
        (v = !1)
    }
    return C && c.push(g), i + n > this.dynamicMinWidth && (this.dynamicMinWidth = i - a + n), c
  }
  isEndOfWrapping(t) {
    return !this._styleMap[t + 1] || this._styleMap[t + 1].line !== this._styleMap[t].line
  }
  missingNewlineOffset(t, e) {
    return this.splitByGrapheme && !e ? (this.isEndOfWrapping(t) ? 1 : 0) : 1
  }
  _splitTextIntoLines(t) {
    const e = super._splitTextIntoLines(t),
      s = this._wrapText(e.lines, this.width),
      i = new Array(s.length)
    for (let r = 0; r < s.length; r++) i[r] = s[r].join('')
    return (e.lines = i), (e.graphemeLines = s), e
  }
  getMinWidth() {
    return Math.max(this.minWidth, this.dynamicMinWidth)
  }
  _removeExtraneousStyles() {
    const t = new Map()
    for (const e in this._styleMap) {
      const s = parseInt(e, 10)
      if (this._textLines[s]) {
        const i = this._styleMap[e].line
        t.set(''.concat(i), !0)
      }
    }
    for (const e in this.styles) t.has(e) || delete this.styles[e]
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return super.toObject(['minWidth', 'splitByGrapheme', ...t])
  }
}
f(Qt, 'type', 'Textbox'),
  f(Qt, 'textLayoutProperties', [...Lt.textLayoutProperties, 'width']),
  f(Qt, 'ownDefaults', {
    minWidth: 20,
    dynamicMinWidth: 2,
    lockScalingFlip: !0,
    noScaleCache: !1,
    _wordJoiners: /[ \t\r]/,
    splitByGrapheme: !1
  }),
  w.setClass(Qt)
class Bi extends vs {
  shouldPerformLayout(t) {
    return !!t.target.clipPath && super.shouldPerformLayout(t)
  }
  shouldLayoutClipPath() {
    return !1
  }
  calcLayoutResult(t, e) {
    const { target: s } = t,
      { clipPath: i, group: r } = s
    if (!i || !this.shouldPerformLayout(t)) return
    const { width: n, height: a } = Rt(Zn(s, i)),
      h = new y(n, a)
    if (i.absolutePositioned)
      return {
        center: Wt(i.getRelativeCenterPoint(), void 0, r ? r.calcTransformMatrix() : void 0),
        size: h
      }
    {
      const c = i.getRelativeCenterPoint().transform(s.calcOwnMatrix(), !0)
      if (this.shouldPerformLayout(t)) {
        const { center: l = new y(), correction: u = new y() } = this.calcBoundingBox(e, t) || {}
        return {
          center: l.add(c),
          correction: u.subtract(c),
          size: h
        }
      }
      return {
        center: s.getRelativeCenterPoint().add(c),
        size: h
      }
    }
  }
}
f(Bi, 'type', 'clip-path'), w.setClass(Bi)
class Xi extends vs {
  getInitialSize(t, e) {
    let { target: s } = t,
      { size: i } = e
    return new y(s.width || i.x, s.height || i.y)
  }
}
f(Xi, 'type', 'fixed'), w.setClass(Xi)
class Eh extends Me {
  subscribeTargets(t) {
    const e = t.target
    t.targets
      .reduce((s, i) => (i.parent && s.add(i.parent), s), new Set())
      .forEach((s) => {
        s.layoutManager.subscribeTargets({
          target: s,
          targets: [e]
        })
      })
  }
  unsubscribeTargets(t) {
    const e = t.target,
      s = e.getObjects()
    t.targets
      .reduce((i, r) => (r.parent && i.add(r.parent), i), new Set())
      .forEach((i) => {
        !s.some((r) => r.parent === i) &&
          i.layoutManager.unsubscribeTargets({
            target: i,
            targets: [e]
          })
      })
  }
}
class Zt extends dt {
  static getDefaults() {
    return m(m({}, super.getDefaults()), Zt.ownDefaults)
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(), Object.assign(this, Zt.ownDefaults), this.setOptions(e)
    const { left: s, top: i, layoutManager: r } = e
    this.groupInit(t, {
      left: s,
      top: i,
      layoutManager: r ?? new Eh()
    })
  }
  _shouldSetNestedCoords() {
    return !0
  }
  __objectSelectionMonitor() {}
  multiSelectAdd() {
    for (var t = arguments.length, e = new Array(t), s = 0; s < t; s++) e[s] = arguments[s]
    this.multiSelectionStacking === 'selection-order'
      ? this.add(...e)
      : e.forEach((i) => {
          const r = this._objects.findIndex((a) => a.isInFrontOf(i)),
            n = r === -1 ? this.size() : r
          this.insertAt(n, i)
        })
  }
  canEnterGroup(t) {
    return this.getObjects().some((e) => e.isDescendantOf(t) || t.isDescendantOf(e))
      ? (Vt('error', 'ActiveSelection: circular object trees are not supported, this call has no effect'), !1)
      : super.canEnterGroup(t)
  }
  enterGroup(t, e) {
    t.parent && t.parent === t.group ? t.parent._exitGroup(t) : t.group && t.parent !== t.group && t.group.remove(t),
      this._enterGroup(t, e)
  }
  exitGroup(t, e) {
    this._exitGroup(t, e), t.parent && t.parent._enterGroup(t, !0)
  }
  _onAfterObjectsChange(t, e) {
    super._onAfterObjectsChange(t, e)
    const s = new Set()
    e.forEach((i) => {
      const { parent: r } = i
      r && s.add(r)
    }),
      t === dr
        ? s.forEach((i) => {
            i._onAfterObjectsChange(Vs, e)
          })
        : s.forEach((i) => {
            i._set('dirty', !0)
          })
  }
  onDeselect() {
    return this.removeAll(), !1
  }
  toString() {
    return '#<ActiveSelection: ('.concat(this.complexity(), ')>')
  }
  shouldCache() {
    return !1
  }
  isOnACache() {
    return !1
  }
  _renderControls(t, e, s) {
    t.save(), (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1)
    const i = m(
      m(
        {
          hasControls: !1
        },
        s
      ),
      {},
      {
        forActiveSelection: !0
      }
    )
    for (let r = 0; r < this._objects.length; r++) this._objects[r]._renderControls(t, i)
    super._renderControls(t, e), t.restore()
  }
}
f(Zt, 'type', 'ActiveSelection'),
  f(Zt, 'ownDefaults', {
    multiSelectionStacking: 'canvas-stacking'
  }),
  w.setClass(Zt),
  w.setClass(Zt, 'activeSelection')
class ko {
  constructor() {
    f(this, 'resources', {})
  }
  applyFilters(t, e, s, i, r) {
    const n = r.getContext('2d')
    if (!n) return
    n.drawImage(e, 0, 0, s, i)
    const a = {
      sourceWidth: s,
      sourceHeight: i,
      imageData: n.getImageData(0, 0, s, i),
      originalEl: e,
      originalImageData: n.getImageData(0, 0, s, i),
      canvasEl: r,
      ctx: n,
      filterBackend: this
    }
    t.forEach((c) => {
      c.applyTo(a)
    })
    const { imageData: h } = a
    return (h.width === s && h.height === i) || ((r.width = h.width), (r.height = h.height)), n.putImageData(h, 0, 0), a
  }
}
class ds {
  constructor() {
    let { tileSize: t = E.textureSize } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    f(this, 'aPosition', new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])),
      f(this, 'resources', {}),
      (this.tileSize = t),
      this.setupGLContext(t, t),
      this.captureGPUInfo()
  }
  setupGLContext(t, e) {
    this.dispose(), this.createWebGLCanvas(t, e)
  }
  createWebGLCanvas(t, e) {
    const s = _t({
        width: t,
        height: e
      }),
      i = s.getContext('webgl', {
        alpha: !0,
        premultipliedAlpha: !1,
        depth: !1,
        stencil: !1,
        antialias: !1
      })
    i && (i.clearColor(0, 0, 0, 0), (this.canvas = s), (this.gl = i))
  }
  applyFilters(t, e, s, i, r, n) {
    const a = this.gl,
      h = r.getContext('2d')
    if (!a || !h) return
    let c
    n && (c = this.getCachedTexture(n, e))
    const l = {
        originalWidth: e.width || e.naturalWidth || 0,
        originalHeight: e.height || e.naturalHeight || 0,
        sourceWidth: s,
        sourceHeight: i,
        destinationWidth: s,
        destinationHeight: i,
        context: a,
        sourceTexture: this.createTexture(a, s, i, c ? void 0 : e),
        targetTexture: this.createTexture(a, s, i),
        originalTexture: c || this.createTexture(a, s, i, c ? void 0 : e),
        passes: t.length,
        webgl: !0,
        aPosition: this.aPosition,
        programCache: this.programCache,
        pass: 0,
        filterBackend: this,
        targetCanvas: r
      },
      u = a.createFramebuffer()
    return (
      a.bindFramebuffer(a.FRAMEBUFFER, u),
      t.forEach((g) => {
        g && g.applyTo(l)
      }),
      (function (g) {
        const d = g.targetCanvas,
          p = d.width,
          v = d.height,
          _ = g.destinationWidth,
          x = g.destinationHeight
        ;(p === _ && v === x) || ((d.width = _), (d.height = x))
      })(l),
      this.copyGLTo2D(a, l),
      a.bindTexture(a.TEXTURE_2D, null),
      a.deleteTexture(l.sourceTexture),
      a.deleteTexture(l.targetTexture),
      a.deleteFramebuffer(u),
      h.setTransform(1, 0, 0, 1, 0, 0),
      l
    )
  }
  dispose() {
    this.canvas && ((this.canvas = null), (this.gl = null)), this.clearWebGLCaches()
  }
  clearWebGLCaches() {
    ;(this.programCache = {}), (this.textureCache = {})
  }
  createTexture(t, e, s, i, r) {
    const {
        NEAREST: n,
        TEXTURE_2D: a,
        RGBA: h,
        UNSIGNED_BYTE: c,
        CLAMP_TO_EDGE: l,
        TEXTURE_MAG_FILTER: u,
        TEXTURE_MIN_FILTER: g,
        TEXTURE_WRAP_S: d,
        TEXTURE_WRAP_T: p
      } = t,
      v = t.createTexture()
    return (
      t.bindTexture(a, v),
      t.texParameteri(a, u, r || n),
      t.texParameteri(a, g, r || n),
      t.texParameteri(a, d, l),
      t.texParameteri(a, p, l),
      i ? t.texImage2D(a, 0, h, h, c, i) : t.texImage2D(a, 0, h, e, s, 0, h, c, null),
      v
    )
  }
  getCachedTexture(t, e, s) {
    const { textureCache: i } = this
    if (i[t]) return i[t]
    {
      const r = this.createTexture(this.gl, e.width, e.height, e, s)
      return r && (i[t] = r), r
    }
  }
  evictCachesForKey(t) {
    this.textureCache[t] && (this.gl.deleteTexture(this.textureCache[t]), delete this.textureCache[t])
  }
  copyGLTo2D(t, e) {
    const s = t.canvas,
      i = e.targetCanvas,
      r = i.getContext('2d')
    if (!r) return
    r.translate(0, i.height), r.scale(1, -1)
    const n = s.height - i.height
    r.drawImage(s, 0, n, i.width, i.height, 0, 0, i.width, i.height)
  }
  copyGLTo2DPutImageData(t, e) {
    const s = e.targetCanvas.getContext('2d'),
      i = e.destinationWidth,
      r = e.destinationHeight,
      n = i * r * 4
    if (!s) return
    const a = new Uint8Array(this.imageBuffer, 0, n),
      h = new Uint8ClampedArray(this.imageBuffer, 0, n)
    t.readPixels(0, 0, i, r, t.RGBA, t.UNSIGNED_BYTE, a)
    const c = new ImageData(h, i, r)
    s.putImageData(c, 0, 0)
  }
  captureGPUInfo() {
    if (this.gpuInfo) return this.gpuInfo
    const t = this.gl,
      e = {
        renderer: '',
        vendor: ''
      }
    if (!t) return e
    const s = t.getExtension('WEBGL_debug_renderer_info')
    if (s) {
      const i = t.getParameter(s.UNMASKED_RENDERER_WEBGL),
        r = t.getParameter(s.UNMASKED_VENDOR_WEBGL)
      i && (e.renderer = i.toLowerCase()), r && (e.vendor = r.toLowerCase())
    }
    return (this.gpuInfo = e), e
  }
}
let Es
function Do() {
  const { WebGLProbe: o } = Ot()
  return (
    o.queryWebGL(lt()),
    E.enableGLFiltering && o.isSupported(E.textureSize)
      ? new ds({
          tileSize: E.textureSize
        })
      : new ko()
  )
}
function As() {
  return !Es && (!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0]) && (Es = Do()), Es
}
function Ah(o) {
  Es = o
}
const jh = ['filters', 'resizeFilter', 'src', 'crossOrigin', 'type'],
  Mo = ['cropX', 'cropY']
class st extends K {
  static getDefaults() {
    return m(m({}, super.getDefaults()), st.ownDefaults)
  }
  constructor(t, e) {
    super(),
      f(this, '_lastScaleX', 1),
      f(this, '_lastScaleY', 1),
      f(this, '_filterScalingX', 1),
      f(this, '_filterScalingY', 1),
      (this.filters = []),
      Object.assign(this, st.ownDefaults),
      this.setOptions(e),
      (this.cacheKey = 'texture'.concat(te())),
      this.setElement(
        typeof t == 'string' ? ((this.canvas && wt(this.canvas.getElement())) || fe()).getElementById(t) : t,
        e
      )
  }
  getElement() {
    return this._element
  }
  setElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    this.removeTexture(this.cacheKey),
      this.removeTexture(''.concat(this.cacheKey, '_filtered')),
      (this._element = t),
      (this._originalElement = t),
      this._setWidthHeight(e),
      t.classList.add(st.CSS_CANVAS),
      this.filters.length !== 0 && this.applyFilters(),
      this.resizeFilter && this.applyResizeFilters()
  }
  removeTexture(t) {
    const e = As(!1)
    e instanceof ds && e.evictCachesForKey(t)
  }
  dispose() {
    super.dispose(),
      this.removeTexture(this.cacheKey),
      this.removeTexture(''.concat(this.cacheKey, '_filtered')),
      (this._cacheContext = null),
      ['_originalElement', '_element', '_filteredEl', '_cacheCanvas'].forEach((t) => {
        const e = this[t]
        e && Ot().dispose(e), (this[t] = void 0)
      })
  }
  getCrossOrigin() {
    return this._originalElement && (this._originalElement.crossOrigin || null)
  }
  getOriginalSize() {
    const t = this.getElement()
    return t
      ? {
          width: t.naturalWidth || t.width,
          height: t.naturalHeight || t.height
        }
      : {
          width: 0,
          height: 0
        }
  }
  _stroke(t) {
    if (!this.stroke || this.strokeWidth === 0) return
    const e = this.width / 2,
      s = this.height / 2
    t.beginPath(), t.moveTo(-e, -s), t.lineTo(e, -s), t.lineTo(e, s), t.lineTo(-e, s), t.lineTo(-e, -s), t.closePath()
  }
  toObject() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    const e = []
    return (
      this.filters.forEach((s) => {
        s && e.push(s.toObject())
      }),
      m(
        m({}, super.toObject([...Mo, ...t])),
        {},
        {
          src: this.getSrc(),
          crossOrigin: this.getCrossOrigin(),
          filters: e
        },
        this.resizeFilter
          ? {
              resizeFilter: this.resizeFilter.toObject()
            }
          : {}
      )
    )
  }
  hasCrop() {
    return !!this.cropX || !!this.cropY || this.width < this._element.width || this.height < this._element.height
  }
  _toSVG() {
    const t = [],
      e = this._element,
      s = -this.width / 2,
      i = -this.height / 2
    let r = [],
      n = [],
      a = '',
      h = ''
    if (!e) return []
    if (this.hasCrop()) {
      const c = te()
      r.push(
        '<clipPath id="imageCrop_' +
          c +
          `">
`,
        '	<rect x="' +
          s +
          '" y="' +
          i +
          '" width="' +
          this.width +
          '" height="' +
          this.height +
          `" />
`,
        `</clipPath>
`
      ),
        (a = ' clip-path="url(#imageCrop_' + c + ')" ')
    }
    if (
      (this.imageSmoothing || (h = ' image-rendering="optimizeSpeed"'),
      t.push(
        '	<image ',
        'COMMON_PARTS',
        'xlink:href="'
          .concat(this.getSvgSrc(!0), '" x="')
          .concat(s - this.cropX, '" y="')
          .concat(i - this.cropY, '" width="')
          .concat(e.width || e.naturalWidth, '" height="')
          .concat(e.height || e.naturalHeight, '"')
          .concat(h)
          .concat(
            a,
            `></image>
`
          )
      ),
      this.stroke || this.strokeDashArray)
    ) {
      const c = this.fill
      ;(this.fill = null),
        (n = [
          '	<rect x="'
            .concat(s, '" y="')
            .concat(i, '" width="')
            .concat(this.width, '" height="')
            .concat(this.height, '" style="')
            .concat(
              this.getSvgStyles(),
              `" />
`
            )
        ]),
        (this.fill = c)
    }
    return (r = this.paintFirst !== U ? r.concat(n, t) : r.concat(t, n)), r
  }
  getSrc(t) {
    const e = t ? this._element : this._originalElement
    return e
      ? e.toDataURL
        ? e.toDataURL()
        : this.srcFromAttribute
        ? e.getAttribute('src') || ''
        : e.src
      : this.src || ''
  }
  getSvgSrc(t) {
    return this.getSrc(t)
  }
  setSrc(t) {
    let { crossOrigin: e, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return is(t, {
      crossOrigin: e,
      signal: s
    }).then((i) => {
      e !== void 0 &&
        this.set({
          crossOrigin: e
        }),
        this.setElement(i)
    })
  }
  toString() {
    return '#<Image: { src: "'.concat(this.getSrc(), '" }>')
  }
  applyResizeFilters() {
    const t = this.resizeFilter,
      e = this.minimumScaleTrigger,
      s = this.getTotalObjectScaling(),
      i = s.x,
      r = s.y,
      n = this._filteredEl || this._originalElement
    if ((this.group && this.set('dirty', !0), !t || (i > e && r > e)))
      return (
        (this._element = n),
        (this._filterScalingX = 1),
        (this._filterScalingY = 1),
        (this._lastScaleX = i),
        void (this._lastScaleY = r)
      )
    const a = _t(n),
      { width: h, height: c } = n
    ;(this._element = a),
      (this._lastScaleX = t.scaleX = i),
      (this._lastScaleY = t.scaleY = r),
      As().applyFilters([t], n, h, c, this._element),
      (this._filterScalingX = a.width / this._originalElement.width),
      (this._filterScalingY = a.height / this._originalElement.height)
  }
  applyFilters() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.filters || []
    if (
      ((t = t.filter((r) => r && !r.isNeutralState())),
      this.set('dirty', !0),
      this.removeTexture(''.concat(this.cacheKey, '_filtered')),
      t.length === 0)
    )
      return (
        (this._element = this._originalElement),
        (this._filteredEl = void 0),
        (this._filterScalingX = 1),
        void (this._filterScalingY = 1)
      )
    const e = this._originalElement,
      s = e.naturalWidth || e.width,
      i = e.naturalHeight || e.height
    if (this._element === this._originalElement) {
      const r = _t({
        width: s,
        height: i
      })
      ;(this._element = r), (this._filteredEl = r)
    } else
      this._filteredEl &&
        ((this._element = this._filteredEl),
        this._filteredEl.getContext('2d').clearRect(0, 0, s, i),
        (this._lastScaleX = 1),
        (this._lastScaleY = 1))
    As().applyFilters(t, this._originalElement, s, i, this._element),
      (this._originalElement.width === this._element.width && this._originalElement.height === this._element.height) ||
        ((this._filterScalingX = this._element.width / this._originalElement.width),
        (this._filterScalingY = this._element.height / this._originalElement.height))
  }
  _render(t) {
    ;(t.imageSmoothingEnabled = this.imageSmoothing),
      this.isMoving !== !0 && this.resizeFilter && this._needsResize() && this.applyResizeFilters(),
      this._stroke(t),
      this._renderPaintInOrder(t)
  }
  drawCacheOnCanvas(t) {
    ;(t.imageSmoothingEnabled = this.imageSmoothing), super.drawCacheOnCanvas(t)
  }
  shouldCache() {
    return this.needsItsOwnCache()
  }
  _renderFill(t) {
    const e = this._element
    if (!e) return
    const s = this._filterScalingX,
      i = this._filterScalingY,
      r = this.width,
      n = this.height,
      a = Math.max(this.cropX, 0),
      h = Math.max(this.cropY, 0),
      c = e.naturalWidth || e.width,
      l = e.naturalHeight || e.height,
      u = a * s,
      g = h * i,
      d = Math.min(r * s, c - u),
      p = Math.min(n * i, l - g),
      v = -r / 2,
      _ = -n / 2,
      x = Math.min(r, c / s - a),
      C = Math.min(n, l / i - h)
    e && t.drawImage(e, u, g, d, p, v, _, x, C)
  }
  _needsResize() {
    const t = this.getTotalObjectScaling()
    return t.x !== this._lastScaleX || t.y !== this._lastScaleY
  }
  _resetWidthHeight() {
    this.set(this.getOriginalSize())
  }
  _setWidthHeight() {
    let { width: t, height: e } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    const s = this.getOriginalSize()
    ;(this.width = t || s.width), (this.height = e || s.height)
  }
  parsePreserveAspectRatioAttribute() {
    const t = tr(this.preserveAspectRatio || ''),
      e = this.width,
      s = this.height,
      i = {
        width: e,
        height: s
      }
    let r,
      n = this._element.width,
      a = this._element.height,
      h = 1,
      c = 1,
      l = 0,
      u = 0,
      g = 0,
      d = 0
    return (
      !t || (t.alignX === rt && t.alignY === rt)
        ? ((h = e / n), (c = s / a))
        : (t.meetOrSlice === 'meet' &&
            ((h = c = to(this._element, i)),
            (r = (e - n * h) / 2),
            t.alignX === 'Min' && (l = -r),
            t.alignX === 'Max' && (l = r),
            (r = (s - a * c) / 2),
            t.alignY === 'Min' && (u = -r),
            t.alignY === 'Max' && (u = r)),
          t.meetOrSlice === 'slice' &&
            ((h = c = eo(this._element, i)),
            (r = n - e / h),
            t.alignX === 'Mid' && (g = r / 2),
            t.alignX === 'Max' && (g = r),
            (r = a - s / c),
            t.alignY === 'Mid' && (d = r / 2),
            t.alignY === 'Max' && (d = r),
            (n = e / h),
            (a = s / c))),
      {
        width: n,
        height: a,
        scaleX: h,
        scaleY: c,
        offsetLeft: l,
        offsetTop: u,
        cropX: g,
        cropY: d
      }
    )
  }
  static fromObject(t, e) {
    let { filters: s, resizeFilter: i, src: r, crossOrigin: n, type: a } = t,
      h = W(t, jh)
    return Promise.all([
      is(
        r,
        m(
          m({}, e),
          {},
          {
            crossOrigin: n
          }
        )
      ),
      s && Oe(s, e),
      i && Oe([i], e),
      ps(h, e)
    ]).then((c) => {
      let [l, u = [], [g] = [], d = {}] = c
      return new this(
        l,
        m(
          m({}, h),
          {},
          {
            src: r,
            filters: u,
            resizeFilter: g
          },
          d
        )
      )
    })
  }
  static fromURL(t) {
    let { crossOrigin: e = null, signal: s } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      i = arguments.length > 2 ? arguments[2] : void 0
    return is(t, {
      crossOrigin: e,
      signal: s
    }).then((r) => new this(r, i))
  }
  static async fromElement(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      s = arguments.length > 2 ? arguments[2] : void 0
    const i = It(t, this.ATTRIBUTE_NAMES, s)
    return this.fromURL(i['xlink:href'], e, i).catch((r) => (Vt('log', 'Unable to parse Image', r), null))
  }
}
function xi(o) {
  if (!$o.test(o.nodeName)) return {}
  const t = o.getAttribute('viewBox')
  let e,
    s,
    i = 1,
    r = 1,
    n = 0,
    a = 0
  const h = o.getAttribute('width'),
    c = o.getAttribute('height'),
    l = o.getAttribute('x') || 0,
    u = o.getAttribute('y') || 0,
    g = !(t && Pr.test(t)),
    d = !h || !c || h === '100%' || c === '100%'
  let p = '',
    v = 0,
    _ = 0
  if (
    (g &&
      (l || u) &&
      o.parentNode &&
      o.parentNode.nodeName !== '#document' &&
      ((p = ' translate(' + et(l || '0') + ' ' + et(u || '0') + ') '),
      (e = (o.getAttribute('transform') || '') + p),
      o.setAttribute('transform', e),
      o.removeAttribute('x'),
      o.removeAttribute('y')),
    g && d)
  )
    return {
      width: 0,
      height: 0
    }
  const x = {
    width: 0,
    height: 0
  }
  if (g) return (x.width = et(h)), (x.height = et(c)), x
  const C = t.match(Pr)
  ;(n = -parseFloat(C[1])), (a = -parseFloat(C[2]))
  const b = parseFloat(C[3]),
    S = parseFloat(C[4])
  ;(x.minX = n),
    (x.minY = a),
    (x.viewBoxWidth = b),
    (x.viewBoxHeight = S),
    d ? ((x.width = b), (x.height = S)) : ((x.width = et(h)), (x.height = et(c)), (i = x.width / b), (r = x.height / S))
  const T = tr(o.getAttribute('preserveAspectRatio') || '')
  if (
    (T.alignX !== rt &&
      (T.meetOrSlice === 'meet' && (r = i = i > r ? r : i),
      T.meetOrSlice === 'slice' && (r = i = i > r ? i : r),
      (v = x.width - b * i),
      (_ = x.height - S * i),
      T.alignX === 'Mid' && (v /= 2),
      T.alignY === 'Mid' && (_ /= 2),
      T.alignX === 'Min' && (v = 0),
      T.alignY === 'Min' && (_ = 0)),
    i === 1 && r === 1 && n === 0 && a === 0 && l === 0 && u === 0)
  )
    return x
  if (
    ((l || u) &&
      o.parentNode.nodeName !== '#document' &&
      (p = ' translate(' + et(l || '0') + ' ' + et(u || '0') + ') '),
    (e = p + ' matrix(' + i + ' 0 0 ' + r + ' ' + (n * i + v) + ' ' + (a * r + _) + ') '),
    o.nodeName === 'svg')
  ) {
    for (s = o.ownerDocument.createElementNS(ki, 'g'); o.firstChild; ) s.appendChild(o.firstChild)
    o.appendChild(s)
  } else (s = o), s.removeAttribute('x'), s.removeAttribute('y'), (e = s.getAttribute('transform') + e)
  return s.setAttribute('transform', e), x
}
f(st, 'type', 'Image'),
  f(st, 'cacheProperties', [...zt, ...Mo]),
  f(st, 'ownDefaults', {
    strokeWidth: 0,
    srcFromAttribute: !1,
    minimumScaleTrigger: 0.5,
    cropX: 0,
    cropY: 0,
    imageSmoothing: !0
  }),
  f(st, 'CSS_CANVAS', 'canvas-img'),
  f(st, 'ATTRIBUTE_NAMES', [
    ...re,
    'x',
    'y',
    'width',
    'height',
    'preserveAspectRatio',
    'xlink:href',
    'crossOrigin',
    'image-rendering'
  ]),
  w.setClass(st),
  w.setSVGClass(st)
const qs = (o) => o.tagName.replace('svg:', ''),
  Fh = ei(['pattern', 'defs', 'symbol', 'metadata', 'clipPath', 'mask', 'desc'])
function Po(o, t) {
  let e,
    s,
    i,
    r,
    n = []
  for (i = 0, r = t.length; i < r; i++)
    (e = t[i]), (s = o.getElementsByTagNameNS('http://www.w3.org/2000/svg', e)), (n = n.concat(Array.from(s)))
  return n
}
const Lh = ['gradientTransform', 'x1', 'x2', 'y1', 'y2', 'gradientUnits', 'cx', 'cy', 'r', 'fx', 'fy'],
  Ci = 'xlink:href'
function Eo(o, t) {
  var e
  const s = ((e = t.getAttribute(Ci)) === null || e === void 0 ? void 0 : e.slice(1)) || '',
    i = o.getElementById(s)
  if (
    (i && i.getAttribute(Ci) && Eo(o, i),
    i &&
      (Lh.forEach((r) => {
        const n = i.getAttribute(r)
        !t.hasAttribute(r) && n && t.setAttribute(r, n)
      }),
      !t.children.length))
  ) {
    const r = i.cloneNode(!0)
    for (; r.firstChild; ) t.appendChild(r.firstChild)
  }
  t.removeAttribute(Ci)
}
const Rh = ['linearGradient', 'radialGradient', 'svg:linearGradient', 'svg:radialGradient']
function Ao(o) {
  const t = o.getElementsByTagName('style')
  let e, s
  const i = {}
  for (e = 0, s = t.length; e < s; e++) {
    const r = (t[e].textContent || '').replace(/\/\*[\s\S]*?\*\//g, '')
    r.trim() !== '' &&
      r
        .split('}')
        .filter((n, a, h) => h.length > 1 && n.trim())
        .forEach((n) => {
          if ((n.match(/{/g) || []).length > 1 && n.trim().startsWith('@')) return
          const a = n.split('{'),
            h = {},
            c = a[1]
              .trim()
              .split(';')
              .filter(function (l) {
                return l.trim()
              })
          for (e = 0, s = c.length; e < s; e++) {
            const l = c[e].split(':'),
              u = l[0].trim(),
              g = l[1].trim()
            h[u] = g
          }
          ;(n = a[0].trim()).split(',').forEach((l) => {
            ;(l = l.replace(/^svg/i, '').trim()) !== '' && (i[l] = m(m({}, i[l] || {}), h))
          })
        })
  }
  return i
}
const qr = (o) => w.getSVGClass(qs(o).toLowerCase())
class Ih {
  constructor(t, e, s, i, r) {
    ;(this.elements = t),
      (this.options = e),
      (this.reviver = s),
      (this.regexUrl = /^url\(['"]?#([^'"]+)['"]?\)/g),
      (this.doc = i),
      (this.clipPaths = r),
      (this.gradientDefs = (function (n) {
        const a = Po(n, Rh),
          h = {}
        let c = a.length
        for (; c--; ) {
          const l = a[c]
          l.getAttribute('xlink:href') && Eo(n, l)
          const u = l.getAttribute('id')
          u && (h[u] = l)
        }
        return h
      })(i)),
      (this.cssRules = Ao(i))
  }
  parse() {
    return Promise.all(this.elements.map((t) => this.createObject(t)))
  }
  async createObject(t) {
    const e = qr(t)
    if (e) {
      const s = await e.fromElement(t, this.options, this.cssRules)
      return (
        this.resolveGradient(s, t, U),
        this.resolveGradient(s, t, nt),
        s instanceof st && s._originalElement ? Ps(s, s.parsePreserveAspectRatioAttribute()) : Ps(s),
        await this.resolveClipPath(s, t),
        this.reviver && this.reviver(t, s),
        s
      )
    }
    return null
  }
  extractPropertyDefinition(t, e, s) {
    const i = t[e],
      r = this.regexUrl
    if (!r.test(i)) return
    r.lastIndex = 0
    const n = r.exec(i)[1]
    return (r.lastIndex = 0), s[n]
  }
  resolveGradient(t, e, s) {
    const i = this.extractPropertyDefinition(t, s, this.gradientDefs)
    if (i) {
      const r = e.getAttribute(s + '-opacity'),
        n = be.fromElement(
          i,
          t,
          m(
            m({}, this.options),
            {},
            {
              opacity: r
            }
          )
        )
      t.set(s, n)
    }
  }
  async resolveClipPath(t, e, s) {
    const i = this.extractPropertyDefinition(t, 'clipPath', this.clipPaths)
    if (i) {
      const r = ht(t.calcTransformMatrix()),
        n = i[0].parentElement
      let a = e
      for (; !s && a.parentElement && a.getAttribute('clip-path') !== t.clipPath; ) a = a.parentElement
      a.parentElement.appendChild(n)
      const h = us(''.concat(a.getAttribute('transform') || '', ' ').concat(n.getAttribute('originalTransform') || ''))
      n.setAttribute('transform', 'matrix('.concat(h.join(','), ')'))
      const c = await Promise.all(
          i.map((C) =>
            qr(C)
              .fromElement(C, this.options, this.cssRules)
              .then((b) => (Ps(b), (b.fillRule = b.clipRule), delete b.clipRule, b))
          )
        ),
        l = c.length === 1 ? c[0] : new dt(c),
        u = V(r, l.calcTransformMatrix())
      l.clipPath && (await this.resolveClipPath(l, a, n.getAttribute('clip-path') ? a : void 0))
      const { scaleX: g, scaleY: d, angle: p, skewX: v, translateX: _, translateY: x } = ge(u)
      l.set({
        flipX: !1,
        flipY: !1
      }),
        l.set({
          scaleX: g,
          scaleY: d,
          angle: p,
          skewX: v,
          skewY: 0
        }),
        l.setPositionByOrigin(new y(_, x), k, k),
        (t.clipPath = l)
    } else delete t.clipPath
  }
}
const Kr = (o) => Zo.test(qs(o)),
  Yi = () => ({
    objects: [],
    elements: [],
    options: {},
    allElements: []
  })
async function mr(o, t) {
  let { crossOrigin: e, signal: s } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
  if (s && s.aborted) return Vt('log', new Gi('parseSVGDocument')), Yi()
  const i = o.documentElement
  ;(function (l) {
    const u = Po(l, ['use', 'svg:use']),
      g = ['x', 'y', 'xlink:href', 'href', 'transform']
    for (const d of u) {
      const p = d.attributes,
        v = {}
      for (const M of p) M.value && (v[M.name] = M.value)
      const _ = (v['xlink:href'] || v.href || '').slice(1)
      if (_ === '') return
      const x = l.getElementById(_)
      if (x === null) return
      let C = x.cloneNode(!0)
      const b = C.attributes,
        S = {}
      for (const M of b) M.value && (S[M.name] = M.value)
      const { x: T = 0, y: D = 0, transform: P = '' } = v,
        O = ''
          .concat(P, ' ')
          .concat(S.transform || '', ' translate(')
          .concat(T, ', ')
          .concat(D, ')')
      if ((xi(C), /^svg$/i.test(C.nodeName))) {
        const M = C.ownerDocument.createElementNS(ki, 'g')
        Object.entries(S).forEach((A) => {
          let [B, R] = A
          return M.setAttributeNS(ki, B, R)
        }),
          M.append(...C.childNodes),
          (C = M)
      }
      for (const M of p) {
        if (!M) continue
        const { name: A, value: B } = M
        if (!g.includes(A))
          if (A === 'style') {
            const R = {}
            ji(B, R),
              Object.entries(S).forEach((I) => {
                let [tt, Q] = I
                R[tt] = Q
              }),
              ji(S.style || '', R)
            const F = Object.entries(R)
              .map((I) => I.join(':'))
              .join(';')
            C.setAttribute(A, F)
          } else !S[A] && C.setAttribute(A, B)
      }
      C.setAttribute('transform', O),
        C.setAttribute('instantiated_by_use', '1'),
        C.removeAttribute('id'),
        d.parentNode.replaceChild(C, d)
    }
  })(o)
  const r = Array.from(i.getElementsByTagName('*')),
    n = m(
      m({}, xi(i)),
      {},
      {
        crossOrigin: e,
        signal: s
      }
    ),
    a = r.filter(
      (l) => (
        xi(l),
        Kr(l) &&
          !(function (u) {
            let g = u
            for (; g && (g = g.parentElement); )
              if (g && g.nodeName && Fh.test(qs(g)) && !g.getAttribute('instantiated_by_use')) return !0
            return !1
          })(l)
      )
    )
  if (!a || (a && !a.length))
    return m(
      m({}, Yi()),
      {},
      {
        options: n,
        allElements: r
      }
    )
  const h = {}
  return (
    r
      .filter((l) => qs(l) === 'clipPath')
      .forEach((l) => {
        l.setAttribute('originalTransform', l.getAttribute('transform') || '')
        const u = l.getAttribute('id')
        h[u] = Array.from(l.getElementsByTagName('*')).filter((g) => Kr(g))
      }),
    {
      objects: await new Ih(a, n, t, o, h).parse(),
      elements: a,
      options: n,
      allElements: r
    }
  )
}
function Bh(o, t, e) {
  return mr(new (Ft().DOMParser)().parseFromString(o.trim(), 'text/xml'), t, e)
}
function Xh(o, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
  return new Promise((s, i) => {
    lo(o.replace(/^\n\s*/, '').trim(), {
      onComplete: (r) => {
        const n = r.responseXML
        n && s(n), i()
      },
      signal: e.signal
    })
  })
    .then((s) => mr(s, t, e))
    .catch(() => Yi())
}
const jo = sn,
  Jr = (o) =>
    function (t, e, s) {
      const { points: i, pathOffset: r } = s
      return new y(i[o]).subtract(r).transform(V(s.getViewportTransform(), s.calcTransformMatrix()))
    },
  Fo = (o, t, e, s) => {
    const { target: i, pointIndex: r } = t,
      n = i,
      a = Wt(new y(e, s), void 0, n.calcOwnMatrix())
    return (n.points[r] = a.add(n.pathOffset)), n.setDimensions(), !0
  },
  Lo = (o, t) =>
    function (e, s, i, r) {
      const n = s.target,
        a = new y(n.points[(o > 0 ? o : n.points.length) - 1]),
        h = a.subtract(n.pathOffset).transform(n.calcOwnMatrix()),
        c = t(
          e,
          m(
            m({}, s),
            {},
            {
              pointIndex: o
            }
          ),
          i,
          r
        ),
        l = a.subtract(n.pathOffset).transform(n.calcOwnMatrix()).subtract(h)
      return (n.left -= l.x), (n.top -= l.y), c
    },
  Qr = (o) => ie(jo, Lo(o, Fo)),
  Wi = (o, t, e) => {
    const { path: s, pathOffset: i } = o,
      r = s[t]
    return new y(r[e] - i.x, r[e + 1] - i.y).transform(V(o.getViewportTransform(), o.calcTransformMatrix()))
  }
function Yh(o, t, e) {
  const { commandIndex: s, pointIndex: i } = this
  return Wi(e, s, i)
}
function Wh(o, t, e, s) {
  const { target: i } = t,
    { commandIndex: r, pointIndex: n } = this,
    a = ((h, c, l, u, g) => {
      const { path: d, pathOffset: p } = h,
        v = d[(u > 0 ? u : d.length) - 1],
        _ = new y(v[g], v[g + 1]),
        x = _.subtract(p).transform(h.calcOwnMatrix()),
        C = Wt(new y(c, l), void 0, h.calcOwnMatrix())
      ;(d[u][g] = C.x + p.x), (d[u][g + 1] = C.y + p.y), h.setDimensions()
      const b = _.subtract(h.pathOffset).transform(h.calcOwnMatrix()).subtract(x)
      return (h.left -= b.x), (h.top -= b.y), h.set('dirty', !0), !0
    })(i, e, s, r, n)
  return (
    ir(
      this.actionName,
      m(
        m({}, rr(o, t, e, s)),
        {},
        {
          commandIndex: r,
          pointIndex: n
        }
      )
    ),
    a
  )
}
class Ro extends at {
  constructor(t) {
    super(t)
  }
  render(t, e, s, i, r) {
    const n = m(
      m({}, i),
      {},
      {
        cornerColor: this.controlFill,
        cornerStrokeColor: this.controlStroke,
        transparentCorners: !this.controlFill
      }
    )
    super.render(t, e, s, n, r)
  }
}
class Vh extends Ro {
  constructor(t) {
    super(t)
  }
  render(t, e, s, i, r) {
    const { path: n } = r,
      { commandIndex: a, pointIndex: h, connectToCommandIndex: c, connectToPointIndex: l } = this
    t.save(), (t.strokeStyle = this.controlStroke), this.connectionDashArray && t.setLineDash(this.connectionDashArray)
    const [u] = n[a],
      g = Wi(r, c, l)
    if (u === 'Q') {
      const d = Wi(r, a, h + 2)
      t.moveTo(d.x, d.y), t.lineTo(e, s)
    } else t.moveTo(e, s)
    t.lineTo(g.x, g.y), t.stroke(), t.restore(), super.render(t, e, s, i, r)
  }
}
const ks = (o, t, e, s, i, r) =>
  new (e ? Vh : Ro)(
    m(
      m(
        {
          commandIndex: o,
          pointIndex: t,
          actionName: 'modifyPath',
          positionHandler: Yh,
          actionHandler: Wh,
          connectToCommandIndex: i,
          connectToPointIndex: r
        },
        s
      ),
      e ? s.controlPointStyle : s.pointStyle
    )
  )
var Gh = Object.freeze({
  __proto__: null,
  changeWidth: Pi,
  createObjectDefaultControls: lr,
  createPathControls: function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const e = {}
    let s = 'M'
    return (
      o.path.forEach((i, r) => {
        const n = i[0]
        switch ((n !== 'Z' && (e['c_'.concat(r, '_').concat(n)] = ks(r, i.length - 2, !1, t)), n)) {
          case 'C':
            ;(e['c_'.concat(r, '_C_CP_1')] = ks(r, 1, !0, t, r - 1, ((a) => (a === 'C' ? 5 : a === 'Q' ? 3 : 1))(s))),
              (e['c_'.concat(r, '_C_CP_2')] = ks(r, 3, !0, t, r, 5))
            break
          case 'Q':
            e['c_'.concat(r, '_Q_CP_1')] = ks(r, 1, !0, t, r, 3)
        }
        s = n
      }),
      e
    )
  },
  createPolyActionHandler: Qr,
  createPolyControls: function (o) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const e = {}
    for (let s = 0; s < (typeof o == 'number' ? o : o.points.length); s++)
      e['p'.concat(s)] = new at(
        m(
          {
            actionName: jo,
            positionHandler: Jr(s),
            actionHandler: Qr(s)
          },
          t
        )
      )
    return e
  },
  createPolyPositionHandler: Jr,
  createResizeControls: Yn,
  createTextboxDefaultControls: Wn,
  dragHandler: Cn,
  factoryPolyActionHandler: Lo,
  getLocalPoint: ti,
  polyActionHandler: Fo,
  renderCircleControl: Dn,
  renderSquareControl: Mn,
  rotationStyleHandler: Pn,
  rotationWithSnapping: En,
  scaleCursorStyleHandler: xe,
  scaleOrSkewActionName: Xe,
  scaleSkewCursorStyleHandler: he,
  scalingEqually: Be,
  scalingX: Fn,
  scalingXOrSkewingY: Ei,
  scalingY: Ln,
  scalingYOrSkewingX: Ai,
  skewCursorStyleHandler: Rn,
  skewHandlerX: Bn,
  skewHandlerY: Xn,
  wrapWithFireEvent: ie,
  wrapWithFixedAnchor: me
})
const ys = (o) => o.webgl !== void 0,
  zh = (o, t) => {
    const e = _t({
        width: o,
        height: t
      }),
      s = lt().getContext('webgl'),
      i = {
        imageBuffer: new ArrayBuffer(o * t * 4)
      },
      r = {
        destinationWidth: o,
        destinationHeight: t,
        targetCanvas: e
      }
    let n
    ;(n = Ft().performance.now()), ds.prototype.copyGLTo2D.call(i, s, r)
    const a = Ft().performance.now() - n
    return (
      (n = Ft().performance.now()), ds.prototype.copyGLTo2DPutImageData.call(i, s, r), a > Ft().performance.now() - n
    )
  },
  vr = 'precision highp float',
  Hh = `
    `.concat(
    vr,
    `;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vTexCoord);
    }`
  ),
  Nh = ['type'],
  Uh = ['type'],
  qh = new RegExp(vr, 'g')
class q {
  get type() {
    return this.constructor.type
  }
  constructor() {
    let t = W(arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, Nh)
    Object.assign(this, this.constructor.defaults, t)
  }
  getFragmentSource() {
    return Hh
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aPosition;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }`
  }
  createProgram(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getFragmentSource(),
      s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.getVertexSource()
    const {
      WebGLProbe: { GLPrecision: i = 'highp' }
    } = Ot()
    i !== 'highp' && (e = e.replace(qh, vr.replace('highp', i)))
    const r = t.createShader(t.VERTEX_SHADER),
      n = t.createShader(t.FRAGMENT_SHADER),
      a = t.createProgram()
    if (!r || !n || !a) throw new jt('Vertex, fragment shader or program creation error')
    if ((t.shaderSource(r, s), t.compileShader(r), !t.getShaderParameter(r, t.COMPILE_STATUS)))
      throw new jt('Vertex shader compile error for '.concat(this.type, ': ').concat(t.getShaderInfoLog(r)))
    if ((t.shaderSource(n, e), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)))
      throw new jt('Fragment shader compile error for '.concat(this.type, ': ').concat(t.getShaderInfoLog(n)))
    if ((t.attachShader(a, r), t.attachShader(a, n), t.linkProgram(a), !t.getProgramParameter(a, t.LINK_STATUS)))
      throw new jt('Shader link error for "'.concat(this.type, '" ').concat(t.getProgramInfoLog(a)))
    const h = this.getUniformLocations(t, a) || {}
    return (
      (h.uStepW = t.getUniformLocation(a, 'uStepW')),
      (h.uStepH = t.getUniformLocation(a, 'uStepH')),
      {
        program: a,
        attributeLocations: this.getAttributeLocations(t, a),
        uniformLocations: h
      }
    )
  }
  getAttributeLocations(t, e) {
    return {
      aPosition: t.getAttribLocation(e, 'aPosition')
    }
  }
  getUniformLocations(t, e) {
    const s = this.constructor.uniformLocations,
      i = {}
    for (let r = 0; r < s.length; r++) i[s[r]] = t.getUniformLocation(e, s[r])
    return i
  }
  sendAttributeData(t, e, s) {
    const i = e.aPosition,
      r = t.createBuffer()
    t.bindBuffer(t.ARRAY_BUFFER, r),
      t.enableVertexAttribArray(i),
      t.vertexAttribPointer(i, 2, t.FLOAT, !1, 0, 0),
      t.bufferData(t.ARRAY_BUFFER, s, t.STATIC_DRAW)
  }
  _setupFrameBuffer(t) {
    const e = t.context
    if (t.passes > 1) {
      const s = t.destinationWidth,
        i = t.destinationHeight
      ;(t.sourceWidth === s && t.sourceHeight === i) ||
        (e.deleteTexture(t.targetTexture), (t.targetTexture = t.filterBackend.createTexture(e, s, i))),
        e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.targetTexture, 0)
    } else e.bindFramebuffer(e.FRAMEBUFFER, null), e.finish()
  }
  _swapTextures(t) {
    t.passes--, t.pass++
    const e = t.targetTexture
    ;(t.targetTexture = t.sourceTexture), (t.sourceTexture = e)
  }
  isNeutralState(t) {
    return !1
  }
  applyTo(t) {
    ys(t) ? (this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t)
  }
  applyTo2d(t) {}
  getCacheKey() {
    return this.type
  }
  retrieveShader(t) {
    const e = this.getCacheKey()
    return t.programCache[e] || (t.programCache[e] = this.createProgram(t.context)), t.programCache[e]
  }
  applyToWebGL(t) {
    const e = t.context,
      s = this.retrieveShader(t)
    t.pass === 0 && t.originalTexture
      ? e.bindTexture(e.TEXTURE_2D, t.originalTexture)
      : e.bindTexture(e.TEXTURE_2D, t.sourceTexture),
      e.useProgram(s.program),
      this.sendAttributeData(e, s.attributeLocations, t.aPosition),
      e.uniform1f(s.uniformLocations.uStepW, 1 / t.sourceWidth),
      e.uniform1f(s.uniformLocations.uStepH, 1 / t.sourceHeight),
      this.sendUniformData(e, s.uniformLocations),
      e.viewport(0, 0, t.destinationWidth, t.destinationHeight),
      e.drawArrays(e.TRIANGLE_STRIP, 0, 4)
  }
  bindAdditionalTexture(t, e, s) {
    t.activeTexture(s), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE0)
  }
  unbindAdditionalTexture(t, e) {
    t.activeTexture(e), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE0)
  }
  sendUniformData(t, e) {}
  createHelpLayer(t) {
    if (!t.helpLayer) {
      const { sourceWidth: e, sourceHeight: s } = t,
        i = _t({
          width: e,
          height: s
        })
      t.helpLayer = i
    }
  }
  toObject() {
    const t = Object.keys(this.constructor.defaults || {})
    return m(
      {
        type: this.type
      },
      t.reduce((e, s) => ((e[s] = this[s]), e), {})
    )
  }
  toJSON() {
    return this.toObject()
  }
  static async fromObject(t, e) {
    return new this(W(t, Uh))
  }
}
f(q, 'type', 'BaseFilter'), f(q, 'uniformLocations', [])
const Kh = {
  multiply: `gl_FragColor.rgb *= uColor.rgb;
`,
  screen: `gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);
`,
  add: `gl_FragColor.rgb += uColor.rgb;
`,
  difference: `gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);
`,
  subtract: `gl_FragColor.rgb -= uColor.rgb;
`,
  lighten: `gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);
`,
  darken: `gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);
`,
  exclusion: `gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);
`,
  overlay: `
    if (uColor.r < 0.5) {
      gl_FragColor.r *= 2.0 * uColor.r;
    } else {
      gl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);
    }
    if (uColor.g < 0.5) {
      gl_FragColor.g *= 2.0 * uColor.g;
    } else {
      gl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);
    }
    if (uColor.b < 0.5) {
      gl_FragColor.b *= 2.0 * uColor.b;
    } else {
      gl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);
    }
    `,
  tint: `
    gl_FragColor.rgb *= (1.0 - uColor.a);
    gl_FragColor.rgb += uColor.rgb;
    `
}
class We extends q {
  getCacheKey() {
    return ''.concat(this.type, '_').concat(this.mode)
  }
  getFragmentSource() {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec4 uColor;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        gl_FragColor = color;
        if (color.a > 0.0) {
          `.concat(
      Kh[this.mode],
      `
        }
      }
      `
    )
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = new j(this.color).getSource(),
      i = this.alpha,
      r = s[0] * i,
      n = s[1] * i,
      a = s[2] * i,
      h = 1 - i
    for (let c = 0; c < e.length; c += 4) {
      const l = e[c],
        u = e[c + 1],
        g = e[c + 2]
      let d, p, v
      switch (this.mode) {
        case 'multiply':
          ;(d = (l * r) / 255), (p = (u * n) / 255), (v = (g * a) / 255)
          break
        case 'screen':
          ;(d = 255 - ((255 - l) * (255 - r)) / 255),
            (p = 255 - ((255 - u) * (255 - n)) / 255),
            (v = 255 - ((255 - g) * (255 - a)) / 255)
          break
        case 'add':
          ;(d = l + r), (p = u + n), (v = g + a)
          break
        case 'difference':
          ;(d = Math.abs(l - r)), (p = Math.abs(u - n)), (v = Math.abs(g - a))
          break
        case 'subtract':
          ;(d = l - r), (p = u - n), (v = g - a)
          break
        case 'darken':
          ;(d = Math.min(l, r)), (p = Math.min(u, n)), (v = Math.min(g, a))
          break
        case 'lighten':
          ;(d = Math.max(l, r)), (p = Math.max(u, n)), (v = Math.max(g, a))
          break
        case 'overlay':
          ;(d = r < 128 ? (2 * l * r) / 255 : 255 - (2 * (255 - l) * (255 - r)) / 255),
            (p = n < 128 ? (2 * u * n) / 255 : 255 - (2 * (255 - u) * (255 - n)) / 255),
            (v = a < 128 ? (2 * g * a) / 255 : 255 - (2 * (255 - g) * (255 - a)) / 255)
          break
        case 'exclusion':
          ;(d = r + l - (2 * r * l) / 255), (p = n + u - (2 * n * u) / 255), (v = a + g - (2 * a * g) / 255)
          break
        case 'tint':
          ;(d = r + l * h), (p = n + u * h), (v = a + g * h)
      }
      ;(e[c] = d), (e[c + 1] = p), (e[c + 2] = v)
    }
  }
  sendUniformData(t, e) {
    const s = new j(this.color).getSource()
    ;(s[0] = (this.alpha * s[0]) / 255),
      (s[1] = (this.alpha * s[1]) / 255),
      (s[2] = (this.alpha * s[2]) / 255),
      (s[3] = this.alpha),
      t.uniform4fv(e.uColor, s)
  }
}
f(We, 'defaults', {
  color: '#F95C63',
  mode: 'multiply',
  alpha: 1
}),
  f(We, 'type', 'BlendColor'),
  f(We, 'uniformLocations', ['uColor']),
  w.setClass(We)
const Jh = {
    multiply: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.rgba *= color2.rgba;
      gl_FragColor = color;
    }
    `,
    mask: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.a = color2.a;
      gl_FragColor = color;
    }
    `
  },
  Qh = ['type', 'image']
class Ve extends q {
  getCacheKey() {
    return ''.concat(this.type, '_').concat(this.mode)
  }
  getFragmentSource() {
    return Jh[this.mode]
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    uniform mat3 uTransformMatrix;
    void main() {
      vTexCoord = aPosition;
      vTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }
    `
  }
  applyToWebGL(t) {
    const e = t.context,
      s = this.createTexture(t.filterBackend, this.image)
    this.bindAdditionalTexture(e, s, e.TEXTURE1), super.applyToWebGL(t), this.unbindAdditionalTexture(e, e.TEXTURE1)
  }
  createTexture(t, e) {
    return t.getCachedTexture(e.cacheKey, e.getElement())
  }
  calculateMatrix() {
    const t = this.image,
      { width: e, height: s } = t.getElement()
    return [1 / t.scaleX, 0, 0, 0, 1 / t.scaleY, 0, -t.left / e, -t.top / s, 1]
  }
  applyTo2d(t) {
    let {
      imageData: { data: e, width: s, height: i },
      filterBackend: { resources: r }
    } = t
    const n = this.image
    r.blendImage || (r.blendImage = lt())
    const a = r.blendImage,
      h = a.getContext('2d')
    a.width !== s || a.height !== i ? ((a.width = s), (a.height = i)) : h.clearRect(0, 0, s, i),
      h.setTransform(n.scaleX, 0, 0, n.scaleY, n.left, n.top),
      h.drawImage(n.getElement(), 0, 0, s, i)
    const c = h.getImageData(0, 0, s, i).data
    for (let l = 0; l < e.length; l += 4) {
      const u = e[l],
        g = e[l + 1],
        d = e[l + 2],
        p = e[l + 3],
        v = c[l],
        _ = c[l + 1],
        x = c[l + 2],
        C = c[l + 3]
      switch (this.mode) {
        case 'multiply':
          ;(e[l] = (u * v) / 255), (e[l + 1] = (g * _) / 255), (e[l + 2] = (d * x) / 255), (e[l + 3] = (p * C) / 255)
          break
        case 'mask':
          e[l + 3] = C
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.calculateMatrix()
    t.uniform1i(e.uImage, 1), t.uniformMatrix3fv(e.uTransformMatrix, !1, s)
  }
  toObject() {
    return m(
      m({}, super.toObject()),
      {},
      {
        image: this.image && this.image.toObject()
      }
    )
  }
  static async fromObject(t, e) {
    let { type: s, image: i } = t,
      r = W(t, Qh)
    return st.fromObject(i, e).then(
      (n) =>
        new this(
          m(
            m({}, r),
            {},
            {
              image: n
            }
          )
        )
    )
  }
}
f(Ve, 'type', 'BlendImage'),
  f(Ve, 'defaults', {
    mode: 'multiply',
    alpha: 1
  }),
  f(Ve, 'uniformLocations', ['uTransformMatrix', 'uImage']),
  w.setClass(Ve)
class Ge extends q {
  getFragmentSource() {
    return `
    precision highp float;
    uniform sampler2D uTexture;
    uniform vec2 uDelta;
    varying vec2 vTexCoord;
    const float nSamples = 15.0;
    vec3 v3offset = vec3(12.9898, 78.233, 151.7182);
    float random(vec3 scale) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);
    }
    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;
      float offset = random(v3offset);
      for (float t = -nSamples; t <= nSamples; t++) {
        float percent = (t + offset - 0.5) / nSamples;
        float weight = 1.0 - abs(percent);
        color += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;
        total += weight;
      }
      gl_FragColor = color / total;
    }
  `
  }
  applyTo(t) {
    ys(t)
      ? ((this.aspectRatio = t.sourceWidth / t.sourceHeight),
        t.passes++,
        this._setupFrameBuffer(t),
        (this.horizontal = !0),
        this.applyToWebGL(t),
        this._swapTextures(t),
        this._setupFrameBuffer(t),
        (this.horizontal = !1),
        this.applyToWebGL(t),
        this._swapTextures(t))
      : this.applyTo2d(t)
  }
  applyTo2d(t) {
    t.imageData = this.simpleBlur(t)
  }
  simpleBlur(t) {
    let {
      ctx: e,
      imageData: s,
      filterBackend: { resources: i }
    } = t
    const { width: r, height: n } = s
    i.blurLayer1 || ((i.blurLayer1 = lt()), (i.blurLayer2 = lt()))
    const a = i.blurLayer1,
      h = i.blurLayer2
    ;(a.width === r && a.height === n) || ((h.width = a.width = r), (h.height = a.height = n))
    const c = a.getContext('2d'),
      l = h.getContext('2d'),
      u = 15,
      g = 0.06 * this.blur * 0.5
    let d, p, v, _
    for (c.putImageData(s, 0, 0), l.clearRect(0, 0, r, n), _ = -15; _ <= u; _++)
      (d = (Math.random() - 0.5) / 4),
        (p = _ / u),
        (v = g * p * r + d),
        (l.globalAlpha = 1 - Math.abs(p)),
        l.drawImage(a, v, d),
        c.drawImage(h, 0, 0),
        (l.globalAlpha = 1),
        l.clearRect(0, 0, h.width, h.height)
    for (_ = -15; _ <= u; _++)
      (d = (Math.random() - 0.5) / 4),
        (p = _ / u),
        (v = g * p * n + d),
        (l.globalAlpha = 1 - Math.abs(p)),
        l.drawImage(a, d, v),
        c.drawImage(h, 0, 0),
        (l.globalAlpha = 1),
        l.clearRect(0, 0, h.width, h.height)
    e.drawImage(a, 0, 0)
    const x = e.getImageData(0, 0, a.width, a.height)
    return (c.globalAlpha = 1), c.clearRect(0, 0, a.width, a.height), x
  }
  sendUniformData(t, e) {
    const s = this.chooseRightDelta()
    t.uniform2fv(e.uDelta, s)
  }
  isNeutralState() {
    return this.blur === 0
  }
  chooseRightDelta() {
    let t = 1
    const e = [0, 0]
    this.horizontal
      ? this.aspectRatio > 1 && (t = 1 / this.aspectRatio)
      : this.aspectRatio < 1 && (t = this.aspectRatio)
    const s = t * this.blur * 0.12
    return this.horizontal ? (e[0] = s) : (e[1] = s), e
  }
}
f(Ge, 'type', 'Blur'),
  f(Ge, 'defaults', {
    blur: 0
  }),
  f(Ge, 'uniformLocations', ['uDelta']),
  w.setClass(Ge)
class ze extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBrightness;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += uBrightness;
    gl_FragColor = color;
  }
`
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = Math.round(255 * this.brightness)
    for (let i = 0; i < e.length; i += 4) (e[i] += s), (e[i + 1] += s), (e[i + 2] += s)
  }
  isNeutralState() {
    return this.brightness === 0
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBrightness, this.brightness)
  }
}
f(ze, 'type', 'Brightness'),
  f(ze, 'defaults', {
    brightness: 0
  }),
  f(ze, 'uniformLocations', ['uBrightness']),
  w.setClass(ze)
const Io = {
  matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  colorsOnly: !0
}
class le extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vTexCoord;
  uniform mat4 uColorMatrix;
  uniform vec4 uConstants;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color *= uColorMatrix;
    color += uConstants;
    gl_FragColor = color;
  }`
  }
  applyTo2d(t) {
    const e = t.imageData.data,
      s = this.matrix,
      i = this.colorsOnly
    for (let r = 0; r < e.length; r += 4) {
      const n = e[r],
        a = e[r + 1],
        h = e[r + 2]
      if (
        ((e[r] = n * s[0] + a * s[1] + h * s[2] + 255 * s[4]),
        (e[r + 1] = n * s[5] + a * s[6] + h * s[7] + 255 * s[9]),
        (e[r + 2] = n * s[10] + a * s[11] + h * s[12] + 255 * s[14]),
        !i)
      ) {
        const c = e[r + 3]
        ;(e[r] += c * s[3]),
          (e[r + 1] += c * s[8]),
          (e[r + 2] += c * s[13]),
          (e[r + 3] = n * s[15] + a * s[16] + h * s[17] + c * s[18] + 255 * s[19])
      }
    }
  }
  sendUniformData(t, e) {
    const s = this.matrix,
      i = [s[0], s[1], s[2], s[3], s[5], s[6], s[7], s[8], s[10], s[11], s[12], s[13], s[15], s[16], s[17], s[18]],
      r = [s[4], s[9], s[14], s[19]]
    t.uniformMatrix4fv(e.uColorMatrix, !1, i), t.uniform4fv(e.uConstants, r)
  }
  toObject() {
    return m(
      m({}, super.toObject()),
      {},
      {
        matrix: [...this.matrix]
      }
    )
  }
}
function ve(o, t) {
  var e
  const s =
    (f(
      (e = class extends le {
        toObject() {
          return {
            type: this.type,
            colorsOnly: this.colorsOnly
          }
        }
      }),
      'type',
      o
    ),
    f(e, 'defaults', {
      colorsOnly: !1,
      matrix: t
    }),
    e)
  return w.setClass(s, o), s
}
f(le, 'type', 'ColorMatrix'),
  f(le, 'defaults', Io),
  f(le, 'uniformLocations', ['uColorMatrix', 'uConstants']),
  w.setClass(le)
const Zh = ve(
    'Brownie',
    [
      0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095, 0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0,
      -0.02965, 0, 0, 0, 1, 0
    ]
  ),
  $h = ve(
    'Vintage',
    [
      0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411, 0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0,
      0.02023, 0, 0, 0, 1, 0
    ]
  ),
  tc = ve(
    'Kodachrome',
    [
      1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352, -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0,
      0.13972, 0, 0, 0, 1, 0
    ]
  ),
  ec = ve(
    'Technicolor',
    [
      1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589, -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0,
      0.12137, 0, 0, 0, 1, 0
    ]
  ),
  sc = ve(
    'Polaroid',
    [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]
  ),
  ic = ve('Sepia', [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0]),
  rc = ve('BlackWhite', [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0])
class Vi extends q {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    super(t), (this.subFilters = t.subFilters || [])
  }
  applyTo(t) {
    ys(t) && (t.passes += this.subFilters.length - 1),
      this.subFilters.forEach((e) => {
        e.applyTo(t)
      })
  }
  toObject() {
    return {
      type: this.type,
      subFilters: this.subFilters.map((t) => t.toObject())
    }
  }
  isNeutralState() {
    return !this.subFilters.some((t) => !t.isNeutralState())
  }
  static fromObject(t, e) {
    return Promise.all((t.subFilters || []).map((s) => w.getClass(s.type).fromObject(s, e))).then(
      (s) =>
        new this({
          subFilters: s
        })
    )
  }
}
f(Vi, 'type', 'Composed'), w.setClass(Vi)
class He extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uContrast;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));
    color.rgb = contrastF * (color.rgb - 0.5) + 0.5;
    gl_FragColor = color;
  }`
  }
  isNeutralState() {
    return this.contrast === 0
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = Math.floor(255 * this.contrast),
      i = (259 * (s + 255)) / (255 * (259 - s))
    for (let r = 0; r < e.length; r += 4)
      (e[r] = i * (e[r] - 128) + 128), (e[r + 1] = i * (e[r + 1] - 128) + 128), (e[r + 2] = i * (e[r + 2] - 128) + 128)
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uContrast, this.contrast)
  }
}
f(He, 'type', 'Contrast'),
  f(He, 'defaults', {
    contrast: 0
  }),
  f(He, 'uniformLocations', ['uContrast']),
  w.setClass(He)
const nc = {
  Convolute_3_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `,
  Convolute_3_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `,
  Convolute_5_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `,
  Convolute_5_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `,
  Convolute_7_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `,
  Convolute_7_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `,
  Convolute_9_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `,
  Convolute_9_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `
}
class Ne extends q {
  getCacheKey() {
    return ''
      .concat(this.type, '_')
      .concat(Math.sqrt(this.matrix.length), '_')
      .concat(this.opaque ? 1 : 0)
  }
  getFragmentSource() {
    return nc[this.getCacheKey()]
  }
  applyTo2d(t) {
    const e = t.imageData,
      s = e.data,
      i = this.matrix,
      r = Math.round(Math.sqrt(i.length)),
      n = Math.floor(r / 2),
      a = e.width,
      h = e.height,
      c = t.ctx.createImageData(a, h),
      l = c.data,
      u = this.opaque ? 1 : 0
    let g, d, p, v, _, x, C, b, S, T, D, P, O
    for (D = 0; D < h; D++)
      for (T = 0; T < a; T++) {
        for (_ = 4 * (D * a + T), g = 0, d = 0, p = 0, v = 0, O = 0; O < r; O++)
          for (P = 0; P < r; P++)
            (C = D + O - n),
              (x = T + P - n),
              C < 0 ||
                C >= h ||
                x < 0 ||
                x >= a ||
                ((b = 4 * (C * a + x)),
                (S = i[O * r + P]),
                (g += s[b] * S),
                (d += s[b + 1] * S),
                (p += s[b + 2] * S),
                u || (v += s[b + 3] * S))
        ;(l[_] = g), (l[_ + 1] = d), (l[_ + 2] = p), (l[_ + 3] = u ? s[_ + 3] : v)
      }
    t.imageData = c
  }
  sendUniformData(t, e) {
    t.uniform1fv(e.uMatrix, this.matrix)
  }
  toObject() {
    return m(
      m({}, super.toObject()),
      {},
      {
        opaque: this.opaque,
        matrix: [...this.matrix]
      }
    )
  }
}
f(Ne, 'type', 'Convolute'),
  f(Ne, 'defaults', {
    opaque: !1,
    matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0]
  }),
  f(Ne, 'uniformLocations', ['uMatrix', 'uOpaque', 'uHalfSize', 'uSize']),
  w.setClass(Ne)
const Bo = 'Gamma'
class Ue extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec3 uGamma;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    vec3 correction = (1.0 / uGamma);
    color.r = pow(color.r, correction.r);
    color.g = pow(color.g, correction.g);
    color.b = pow(color.b, correction.b);
    gl_FragColor = color;
    gl_FragColor.rgb *= color.a;
  }
`
  }
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    super(t), (this.gamma = t.gamma || this.constructor.defaults.gamma.concat())
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = this.gamma,
      i = 1 / s[0],
      r = 1 / s[1],
      n = 1 / s[2]
    this.rgbValues ||
      (this.rgbValues = {
        r: new Uint8Array(256),
        g: new Uint8Array(256),
        b: new Uint8Array(256)
      })
    const a = this.rgbValues
    for (let h = 0; h < 256; h++)
      (a.r[h] = 255 * Math.pow(h / 255, i)),
        (a.g[h] = 255 * Math.pow(h / 255, r)),
        (a.b[h] = 255 * Math.pow(h / 255, n))
    for (let h = 0; h < e.length; h += 4) (e[h] = a.r[e[h]]), (e[h + 1] = a.g[e[h + 1]]), (e[h + 2] = a.b[e[h + 2]])
  }
  sendUniformData(t, e) {
    t.uniform3fv(e.uGamma, this.gamma)
  }
  isNeutralState() {
    const { gamma: t } = this
    return t[0] === 1 && t[1] === 1 && t[2] === 1
  }
  toObject() {
    return {
      type: Bo,
      gamma: this.gamma.concat()
    }
  }
}
f(Ue, 'type', Bo),
  f(Ue, 'defaults', {
    gamma: [1, 1, 1]
  }),
  f(Ue, 'uniformLocations', ['uGamma']),
  w.setClass(Ue)
const oc = {
  average: `
    precision highp float;
    uniform sampler2D uTexture;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      float average = (color.r + color.b + color.g) / 3.0;
      gl_FragColor = vec4(average, average, average, color.a);
    }
    `,
  lightness: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    `,
  luminosity: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    `
}
class qe extends q {
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    for (let s, i = 0; i < e.length; i += 4) {
      const r = e[i],
        n = e[i + 1],
        a = e[i + 2]
      switch (this.mode) {
        case 'average':
          s = (r + n + a) / 3
          break
        case 'lightness':
          s = (Math.min(r, n, a) + Math.max(r, n, a)) / 2
          break
        case 'luminosity':
          s = 0.21 * r + 0.72 * n + 0.07 * a
      }
      e[i + 2] = e[i + 1] = e[i] = s
    }
  }
  getCacheKey() {
    return ''.concat(this.type, '_').concat(this.mode)
  }
  getFragmentSource() {
    return oc[this.mode]
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uMode, 1)
  }
  isNeutralState() {
    return !1
  }
}
f(qe, 'type', 'Grayscale'),
  f(qe, 'defaults', {
    mode: 'average'
  }),
  f(qe, 'uniformLocations', ['uMode']),
  w.setClass(qe)
const ac = m(
  m({}, Io),
  {},
  {
    rotation: 0
  }
)
class js extends le {
  calculateMatrix() {
    const t = this.rotation * Math.PI,
      e = kt(t),
      s = Dt(t),
      i = 1 / 3,
      r = Math.sqrt(i) * s,
      n = 1 - e
    this.matrix = [
      e + n / 3,
      i * n - r,
      i * n + r,
      0,
      0,
      i * n + r,
      e + i * n,
      i * n - r,
      0,
      0,
      i * n - r,
      i * n + r,
      e + i * n,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]
  }
  isNeutralState() {
    return this.rotation === 0
  }
  applyTo(t) {
    this.calculateMatrix(), super.applyTo(t)
  }
  toObject() {
    return {
      type: this.type,
      rotation: this.rotation
    }
  }
}
f(js, 'type', 'HueRotation'), f(js, 'defaults', ac), w.setClass(js)
class Ke extends q {
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    for (let s = 0; s < e.length; s += 4)
      (e[s] = 255 - e[s]),
        (e[s + 1] = 255 - e[s + 1]),
        (e[s + 2] = 255 - e[s + 2]),
        this.alpha && (e[s + 3] = 255 - e[s + 3])
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform int uInvert;
  uniform int uAlpha;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    if (uInvert == 1) {
      if (uAlpha == 1) {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,1.0 -color.a);
      } else {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);
      }
    } else {
      gl_FragColor = color;
    }
  }
`
  }
  isNeutralState() {
    return !this.invert
  }
  sendUniformData(t, e) {
    t.uniform1i(e.uInvert, Number(this.invert)), t.uniform1i(e.uAlpha, Number(this.alpha))
  }
}
f(Ke, 'type', 'Invert'),
  f(Ke, 'defaults', {
    alpha: !1,
    invert: !0
  }),
  f(Ke, 'uniformLocations', ['uInvert', 'uAlpha']),
  w.setClass(Ke)
class Je extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uStepH;
  uniform float uNoise;
  uniform float uSeed;
  varying vec2 vTexCoord;
  float rand(vec2 co, float seed, float vScale) {
    return fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);
  }
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;
    gl_FragColor = color;
  }
`
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = this.noise
    for (let i = 0; i < e.length; i += 4) {
      const r = (0.5 - Math.random()) * s
      ;(e[i] += r), (e[i + 1] += r), (e[i + 2] += r)
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uNoise, this.noise / 255), t.uniform1f(e.uSeed, Math.random())
  }
  isNeutralState() {
    return this.noise === 0
  }
}
f(Je, 'type', 'Noise'),
  f(Je, 'defaults', {
    noise: 0
  }),
  f(Je, 'uniformLocations', ['uNoise', 'uSeed']),
  w.setClass(Je)
class Qe extends q {
  applyTo2d(t) {
    let {
      imageData: { data: e, width: s, height: i }
    } = t
    for (let r = 0; r < i; r += this.blocksize)
      for (let n = 0; n < s; n += this.blocksize) {
        const a = 4 * r * s + 4 * n,
          h = e[a],
          c = e[a + 1],
          l = e[a + 2],
          u = e[a + 3]
        for (let g = r; g < Math.min(r + this.blocksize, i); g++)
          for (let d = n; d < Math.min(n + this.blocksize, s); d++) {
            const p = 4 * g * s + 4 * d
            ;(e[p] = h), (e[p + 1] = c), (e[p + 2] = l), (e[p + 3] = u)
          }
      }
  }
  isNeutralState() {
    return this.blocksize === 1
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBlocksize;
  uniform float uStepW;
  uniform float uStepH;
  varying vec2 vTexCoord;
  void main() {
    float blockW = uBlocksize * uStepW;
    float blockH = uBlocksize * uStepH;
    int posX = int(vTexCoord.x / blockW);
    int posY = int(vTexCoord.y / blockH);
    float fposX = float(posX);
    float fposY = float(posY);
    vec2 squareCoords = vec2(fposX * blockW, fposY * blockH);
    vec4 color = texture2D(uTexture, squareCoords);
    gl_FragColor = color;
  }
`
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uBlocksize, this.blocksize)
  }
}
f(Qe, 'type', 'Pixelate'),
  f(Qe, 'defaults', {
    blocksize: 4
  }),
  f(Qe, 'uniformLocations', ['uBlocksize']),
  w.setClass(Qe)
class Ze extends q {
  getFragmentSource() {
    return `
precision highp float;
uniform sampler2D uTexture;
uniform vec4 uLow;
uniform vec4 uHigh;
varying vec2 vTexCoord;
void main() {
  gl_FragColor = texture2D(uTexture, vTexCoord);
  if(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {
    gl_FragColor.a = 0.0;
  }
}
`
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = 255 * this.distance,
      i = new j(this.color).getSource(),
      r = [i[0] - s, i[1] - s, i[2] - s],
      n = [i[0] + s, i[1] + s, i[2] + s]
    for (let a = 0; a < e.length; a += 4) {
      const h = e[a],
        c = e[a + 1],
        l = e[a + 2]
      h > r[0] && c > r[1] && l > r[2] && h < n[0] && c < n[1] && l < n[2] && (e[a + 3] = 0)
    }
  }
  sendUniformData(t, e) {
    const s = new j(this.color).getSource(),
      i = this.distance,
      r = [0 + s[0] / 255 - i, 0 + s[1] / 255 - i, 0 + s[2] / 255 - i, 1],
      n = [s[0] / 255 + i, s[1] / 255 + i, s[2] / 255 + i, 1]
    t.uniform4fv(e.uLow, r), t.uniform4fv(e.uHigh, n)
  }
}
f(Ze, 'type', 'RemoveColor'),
  f(Ze, 'defaults', {
    color: '#FFFFFF',
    distance: 0.02,
    useAlpha: !1
  }),
  f(Ze, 'uniformLocations', ['uLow', 'uHigh']),
  w.setClass(Ze)
class $e extends q {
  sendUniformData(t, e) {
    t.uniform2fv(e.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]),
      t.uniform1fv(e.uTaps, this.taps)
  }
  getFilterWindow() {
    const t = this.tempScale
    return Math.ceil(this.lanczosLobes / t)
  }
  getCacheKey() {
    const t = this.getFilterWindow()
    return ''.concat(this.type, '_').concat(t)
  }
  getFragmentSource() {
    const t = this.getFilterWindow()
    return this.generateShader(t)
  }
  getTaps() {
    const t = this.lanczosCreate(this.lanczosLobes),
      e = this.tempScale,
      s = this.getFilterWindow(),
      i = new Array(s)
    for (let r = 1; r <= s; r++) i[r - 1] = t(r * e)
    return i
  }
  generateShader(t) {
    const e = new Array(t)
    for (let s = 1; s <= t; s++) e[s - 1] = ''.concat(s, '.0 * uDelta')
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uDelta;
      varying vec2 vTexCoord;
      uniform float uTaps[`
      .concat(
        t,
        `];
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        float sum = 1.0;
        `
      )
      .concat(
        e.map((s, i) =>
          `
              color += texture2D(uTexture, vTexCoord + `
            .concat(s, ') * uTaps[')
            .concat(i, '] + texture2D(uTexture, vTexCoord - ')
            .concat(s, ') * uTaps[')
            .concat(
              i,
              `];
              sum += 2.0 * uTaps[`
            )
            .concat(
              i,
              `];
            `
            )
        ).join(`
`),
        `
        gl_FragColor = color / sum;
      }
    `
      )
  }
  applyToForWebgl(t) {
    t.passes++,
      (this.width = t.sourceWidth),
      (this.horizontal = !0),
      (this.dW = Math.round(this.width * this.scaleX)),
      (this.dH = t.sourceHeight),
      (this.tempScale = this.dW / this.width),
      (this.taps = this.getTaps()),
      (t.destinationWidth = this.dW),
      super.applyTo(t),
      (t.sourceWidth = t.destinationWidth),
      (this.height = t.sourceHeight),
      (this.horizontal = !1),
      (this.dH = Math.round(this.height * this.scaleY)),
      (this.tempScale = this.dH / this.height),
      (this.taps = this.getTaps()),
      (t.destinationHeight = this.dH),
      super.applyTo(t),
      (t.sourceHeight = t.destinationHeight)
  }
  applyTo(t) {
    ys(t) ? this.applyToForWebgl(t) : this.applyTo2d(t)
  }
  isNeutralState() {
    return this.scaleX === 1 && this.scaleY === 1
  }
  lanczosCreate(t) {
    return (e) => {
      if (e >= t || e <= -t) return 0
      if (e < 11920929e-14 && e > -11920929e-14) return 1
      const s = (e *= Math.PI) / t
      return ((Math.sin(e) / e) * Math.sin(s)) / s
    }
  }
  applyTo2d(t) {
    const e = t.imageData,
      s = this.scaleX,
      i = this.scaleY
    ;(this.rcpScaleX = 1 / s), (this.rcpScaleY = 1 / i)
    const r = e.width,
      n = e.height,
      a = Math.round(r * s),
      h = Math.round(n * i)
    let c
    ;(c =
      this.resizeType === 'sliceHack'
        ? this.sliceByTwo(t, r, n, a, h)
        : this.resizeType === 'hermite'
        ? this.hermiteFastResize(t, r, n, a, h)
        : this.resizeType === 'bilinear'
        ? this.bilinearFiltering(t, r, n, a, h)
        : this.resizeType === 'lanczos'
        ? this.lanczosResize(t, r, n, a, h)
        : new ImageData(a, h)),
      (t.imageData = c)
  }
  sliceByTwo(t, e, s, i, r) {
    const n = t.imageData,
      a = 0.5
    let h = !1,
      c = !1,
      l = e * a,
      u = s * a
    const g = t.filterBackend.resources
    let d = 0,
      p = 0
    const v = e
    let _ = 0
    g.sliceByTwo || (g.sliceByTwo = lt())
    const x = g.sliceByTwo
    ;(x.width < 1.5 * e || x.height < s) && ((x.width = 1.5 * e), (x.height = s))
    const C = x.getContext('2d')
    for (C.clearRect(0, 0, 1.5 * e, s), C.putImageData(n, 0, 0), i = Math.floor(i), r = Math.floor(r); !h || !c; )
      (e = l),
        (s = u),
        i < Math.floor(l * a) ? (l = Math.floor(l * a)) : ((l = i), (h = !0)),
        r < Math.floor(u * a) ? (u = Math.floor(u * a)) : ((u = r), (c = !0)),
        C.drawImage(x, d, p, e, s, v, _, l, u),
        (d = v),
        (p = _),
        (_ += u)
    return C.getImageData(d, p, i, r)
  }
  lanczosResize(t, e, s, i, r) {
    const n = t.imageData.data,
      a = t.ctx.createImageData(i, r),
      h = a.data,
      c = this.lanczosCreate(this.lanczosLobes),
      l = this.rcpScaleX,
      u = this.rcpScaleY,
      g = 2 / this.rcpScaleX,
      d = 2 / this.rcpScaleY,
      p = Math.ceil((l * this.lanczosLobes) / 2),
      v = Math.ceil((u * this.lanczosLobes) / 2),
      _ = {},
      x = {
        x: 0,
        y: 0
      },
      C = {
        x: 0,
        y: 0
      }
    return (function b(S) {
      let T, D, P, O, M, A, B, R, F, I, tt
      for (x.x = (S + 0.5) * l, C.x = Math.floor(x.x), T = 0; T < r; T++) {
        for (
          x.y = (T + 0.5) * u, C.y = Math.floor(x.y), M = 0, A = 0, B = 0, R = 0, F = 0, D = C.x - p;
          D <= C.x + p;
          D++
        )
          if (!(D < 0 || D >= e)) {
            ;(I = Math.floor(1e3 * Math.abs(D - x.x))), _[I] || (_[I] = {})
            for (let Q = C.y - v; Q <= C.y + v; Q++)
              Q < 0 ||
                Q >= s ||
                ((tt = Math.floor(1e3 * Math.abs(Q - x.y))),
                _[I][tt] || (_[I][tt] = c(Math.sqrt(Math.pow(I * g, 2) + Math.pow(tt * d, 2)) / 1e3)),
                (P = _[I][tt]),
                P > 0 &&
                  ((O = 4 * (Q * e + D)),
                  (M += P),
                  (A += P * n[O]),
                  (B += P * n[O + 1]),
                  (R += P * n[O + 2]),
                  (F += P * n[O + 3])))
          }
        ;(O = 4 * (T * i + S)), (h[O] = A / M), (h[O + 1] = B / M), (h[O + 2] = R / M), (h[O + 3] = F / M)
      }
      return ++S < i ? b(S) : a
    })(0)
  }
  bilinearFiltering(t, e, s, i, r) {
    let n,
      a,
      h,
      c,
      l,
      u,
      g,
      d,
      p,
      v,
      _,
      x,
      C,
      b = 0
    const S = this.rcpScaleX,
      T = this.rcpScaleY,
      D = 4 * (e - 1),
      P = t.imageData.data,
      O = t.ctx.createImageData(i, r),
      M = O.data
    for (g = 0; g < r; g++)
      for (d = 0; d < i; d++)
        for (
          l = Math.floor(S * d), u = Math.floor(T * g), p = S * d - l, v = T * g - u, C = 4 * (u * e + l), _ = 0;
          _ < 4;
          _++
        )
          (n = P[C + _]),
            (a = P[C + 4 + _]),
            (h = P[C + D + _]),
            (c = P[C + D + 4 + _]),
            (x = n * (1 - p) * (1 - v) + a * p * (1 - v) + h * v * (1 - p) + c * p * v),
            (M[b++] = x)
    return O
  }
  hermiteFastResize(t, e, s, i, r) {
    const n = this.rcpScaleX,
      a = this.rcpScaleY,
      h = Math.ceil(n / 2),
      c = Math.ceil(a / 2),
      l = t.imageData.data,
      u = t.ctx.createImageData(i, r),
      g = u.data
    for (let d = 0; d < r; d++)
      for (let p = 0; p < i; p++) {
        const v = 4 * (p + d * i)
        let _ = 0,
          x = 0,
          C = 0,
          b = 0,
          S = 0,
          T = 0,
          D = 0
        const P = (d + 0.5) * a
        for (let O = Math.floor(d * a); O < (d + 1) * a; O++) {
          const M = Math.abs(P - (O + 0.5)) / c,
            A = (p + 0.5) * n,
            B = M * M
          for (let R = Math.floor(p * n); R < (p + 1) * n; R++) {
            let F = Math.abs(A - (R + 0.5)) / h
            const I = Math.sqrt(B + F * F)
            ;(I > 1 && I < -1) ||
              ((_ = 2 * I * I * I - 3 * I * I + 1),
              _ > 0 &&
                ((F = 4 * (R + O * e)),
                (D += _ * l[F + 3]),
                (C += _),
                l[F + 3] < 255 && (_ = (_ * l[F + 3]) / 250),
                (b += _ * l[F]),
                (S += _ * l[F + 1]),
                (T += _ * l[F + 2]),
                (x += _)))
          }
        }
        ;(g[v] = b / x), (g[v + 1] = S / x), (g[v + 2] = T / x), (g[v + 3] = D / C)
      }
    return u
  }
}
f($e, 'type', 'Resize'),
  f($e, 'defaults', {
    resizeType: 'hermite',
    scaleX: 1,
    scaleY: 1,
    lanczosLobes: 3
  }),
  f($e, 'uniformLocations', ['uDelta', 'uTaps']),
  w.setClass($e)
class ts extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uSaturation;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float rgMax = max(color.r, color.g);
    float rgbMax = max(rgMax, color.b);
    color.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;
    color.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;
    color.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;
    gl_FragColor = color;
  }
`
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = -this.saturation
    for (let i = 0; i < e.length; i += 4) {
      const r = e[i],
        n = e[i + 1],
        a = e[i + 2],
        h = Math.max(r, n, a)
      ;(e[i] += h !== r ? (h - r) * s : 0),
        (e[i + 1] += h !== n ? (h - n) * s : 0),
        (e[i + 2] += h !== a ? (h - a) * s : 0)
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uSaturation, -this.saturation)
  }
  isNeutralState() {
    return this.saturation === 0
  }
}
f(ts, 'type', 'Saturation'),
  f(ts, 'defaults', {
    saturation: 0
  }),
  f(ts, 'uniformLocations', ['uSaturation']),
  w.setClass(ts)
class es extends q {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVibrance;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float max = max(color.r, max(color.g, color.b));
    float avg = (color.r + color.g + color.b) / 3.0;
    float amt = (abs(max - avg) * 2.0) * uVibrance;
    color.r += max != color.r ? (max - color.r) * amt : 0.00;
    color.g += max != color.g ? (max - color.g) * amt : 0.00;
    color.b += max != color.b ? (max - color.b) * amt : 0.00;
    gl_FragColor = color;
  }
`
  }
  applyTo2d(t) {
    let {
      imageData: { data: e }
    } = t
    const s = -this.vibrance
    for (let i = 0; i < e.length; i += 4) {
      const r = e[i],
        n = e[i + 1],
        a = e[i + 2],
        h = Math.max(r, n, a),
        c = (r + n + a) / 3,
        l = ((2 * Math.abs(h - c)) / 255) * s
      ;(e[i] += h !== r ? (h - r) * l : 0),
        (e[i + 1] += h !== n ? (h - n) * l : 0),
        (e[i + 2] += h !== a ? (h - a) * l : 0)
    }
  }
  sendUniformData(t, e) {
    t.uniform1f(e.uVibrance, -this.vibrance)
  }
  isNeutralState() {
    return this.vibrance === 0
  }
}
f(es, 'type', 'Vibrance'),
  f(es, 'defaults', {
    vibrance: 0
  }),
  f(es, 'uniformLocations', ['uVibrance']),
  w.setClass(es)
var hc = Object.freeze({
  __proto__: null,
  BaseFilter: q,
  BlackWhite: rc,
  BlendColor: We,
  BlendImage: Ve,
  Blur: Ge,
  Brightness: ze,
  Brownie: Zh,
  ColorMatrix: le,
  Composed: Vi,
  Contrast: He,
  Convolute: Ne,
  Gamma: Ue,
  Grayscale: qe,
  HueRotation: js,
  Invert: Ke,
  Kodachrome: tc,
  Noise: Je,
  Pixelate: Qe,
  Polaroid: sc,
  RemoveColor: Ze,
  Resize: $e,
  Saturation: ts,
  Sepia: ic,
  Technicolor: ec,
  Vibrance: es,
  Vintage: $h
})
const cc = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      ActiveSelection: Zt,
      BaseBrush: ai,
      BaseFabricObject: Pt,
      Canvas: Ri,
      Canvas2dFilterBackend: ko,
      CanvasDOMManager: uo,
      Circle: bt,
      CircleBrush: ph,
      ClipPathLayout: Bi,
      Color: j,
      Control: at,
      Ellipse: Et,
      FabricImage: st,
      FabricObject: K,
      FabricText: J,
      FitContentLayout: zs,
      FixedLayout: Xi,
      Gradient: be,
      Group: dt,
      IText: Lt,
      Image: st,
      InteractiveFabricObject: De,
      Intersection: X,
      LayoutManager: Me,
      LayoutStrategy: vs,
      Line: Kt,
      Object: K,
      Observable: rn,
      Path: Xt,
      Pattern: rs,
      PatternBrush: vh,
      PencilBrush: gs,
      Point: y,
      Polygon: Ye,
      Polyline: mt,
      Rect: vt,
      Shadow: gt,
      SprayBrush: mh,
      StaticCanvas: Fe,
      StaticCanvasDOMManager: er,
      Text: J,
      Textbox: Qt,
      Triangle: Jt,
      WebGLFilterBackend: ds,
      cache: we,
      classRegistry: w,
      config: E,
      controlsUtils: Gh,
      createCollectionMixin: Ki,
      filters: hc,
      getCSSRules: Ao,
      getEnv: Ot,
      getFabricDocument: fe,
      getFabricWindow: Ft,
      getFilterBackend: As,
      iMatrix: $,
      initFilterBackend: Do,
      isPutImageFaster: zh,
      isWebGLPipelineState: ys,
      loadSVGFromString: Bh,
      loadSVGFromURL: Xh,
      parseAttributes: It,
      parseFontDeclaration: Kn,
      parsePointsAttribute: xo,
      parseSVGDocument: mr,
      parseStyleAttribute: Jn,
      parseTransformAttribute: us,
      runningAnimations: hs,
      setEnv: Go,
      setFilterBackend: Ah,
      util: th,
      version: Fs
    },
    Symbol.toStringTag,
    {
      value: 'Module'
    }
  )
)
export {
  Qt as B,
  dt as D,
  bt as G,
  st as Q,
  J as S,
  j as U,
  gs as V,
  vt as a,
  cc as b,
  hc as f,
  Xh as g,
  th as l,
  Ot as p,
  w as t,
  Ri as x,
  K as y
}
