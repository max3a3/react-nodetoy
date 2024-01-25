// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

export const OperatorNode = class OperatorNode extends TempNode {
  constructor(e, a, o) {
    var s = arguments.length;
    var u = new Array(s > 3 ? s - 3 : 0);

    for (var c = 3; c < s; c++) {
      u[c - 3] = arguments[c];
    }

    var l;
    super();
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(0);
    this._op = "+";
    l._op = e;

    if (u.length > 0) {
      var d = o;

      for (var f = 0; f < u.length; f++) {
        d = new n(e, d, u[f]);
      }

      o = d;
    }

    l._a = a;
    l._b = o;
    return l;
  }

  getA() {
    if (this._a) {
      return this._a;
    } else {
      return this._aDefault;
    }
  }

  setA(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._a = e;
    } else {
      this._aDefault.value = e;
    }
  }

  getB() {
    if (this._b) {
      return this._b;
    } else {
      return this._bDefault;
    }
  }

  setB(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._b = e;
    } else {
      this._bDefault.value = e;
    }
  }

  isSpherical() {
    var e = this.getA();
    var t = this.getB();

    if (!e.isSpherical()) {
      return t.isSpherical();
    } else {
      return e.isSpherical();
    }
  }

  getNodeType(e, t) {
    var _op = this._op;
    var r = this.getA();
    var i = this.getB();
    var a = "texture" === r.getNodeType(e) ? "vec4" : r.getNodeType(e);
    var o = "texture" === i.getNodeType(e) ? "vec4" : i.getNodeType(e);

    if ("void" === a || "void" === o) {
      return "void";
    }

    if ("=" === _op) {
      return a;
    }

    if ("==" === _op || "&&" === _op) {
      return "bool";
    }

    if ("<=" === _op || ">" === _op || "<" === _op || ">=" === _op) {
      var s = e.getTypeLength(t);

      if (s > 1) {
        return "bvec".concat(s);
      } else {
        return "bool";
      }
    }

    if (e) {
      if ("float" === a && e.isMatrix(o)) {
        return o;
      }

      if (e.isMatrix(a) && e.isVector(o)) {
        return e.getVectorFromMatrix(a);
      }

      if (e.isVector(a) && e.isMatrix(o)) {
        return e.getVectorFromMatrix(o);
      }

      if (e.getTypeLength(o) > e.getTypeLength(a)) {
        return o;
      }
    }

    return a;
  }

  generate(_context, t) {
    var _op = this._op;
    var aParam = this.getA();
    var bParam = this.getB();
    var a = this.getNodeType(_context, t); // float,vec2, vec3 ...

    var o = null;
    var s = null;

    if ("void" !== a) {
      o = aParam.getNodeType(_context);
      s = bParam.getNodeType(_context);

      if ("=" === _op) {
        s = o;
      } else {
        if (_context.isMatrix(o) && _context.isVector(s)) {
          s = _context.getVectorFromMatrix(o);
        } else {
          o = _context.isVector(o) && _context.isMatrix(s) ? _context.getVectorFromMatrix(s) : s = a;
        }
      }
    } else {
      o = s = a;
    }

    var u = aParam.build(_context, o);
    var c = bParam.build(_context, s);

    var l = _context.getTypeLength(t);

    if ("void" !== t) {
      if ("=" === _op) {
        _context.addFlowCode("".concat(u, " ").concat(this._op, " ").concat(c));

        return u;
      } else {
        if (">" === _op && l > 1) {
          return "greaterThan( ".concat(u, ", ").concat(c, " )");
        } else {
          if ("<=" === _op && l > 1) {
            return "lessThanEqual( ".concat(u, ", ").concat(c, " )");
          } else {
            return "( ".concat(u, " ").concat(this._op, " ").concat(c, " )");
          }
        }
      }
    } else {
      if ("void" !== o) {
        return "".concat(u, " ").concat(this._op, " ").concat(c);
      } else {
        0;
        return;
      }
    }
  }

};
export const AddNode = class AddNode extends OperatorNode {
  constructor(e, r) {
    super("+", e, r);
  }

  get a() {
    return this.getA();
  }

  set a(e) {
    this.setA(e);
  }

  get b() {
    return this.getB();
  }

  set b(e) {
    this.setB(e);
  }

};
export const SubtractNode = class SubtractNode extends OperatorNode {
  constructor(e, r) {
    super("-", e, r);
  }

  get a() {
    return this.getA();
  }

  set a(e) {
    this.setA(e);
  }

  get b() {
    return this.getB();
  }

  set b(e) {
    this.setB(e);
  }

};
export const MultiplyNode = class MultiplyNode extends OperatorNode {
  constructor(e, r) {
    super("*", e, r);
  }

  get a() {
    return this.getA();
  }

  set a(e) {
    this.setA(e);
  }

  get b() {
    return this.getB();
  }

  set b(e) {
    this.setB(e);
  }

};
export const DivideNode = class DivideNode extends OperatorNode {
  constructor(e, r) {
    super("/", e, r);
  }

  get a() {
    return this.getA();
  }

  set a(e) {
    this.setA(e);
  }

  get b() {
    return this.getB();
  }

  set b(e) {
    this.setB(e);
  }

};