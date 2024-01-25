import { ArrayNode, ComponentSelectNode, FloatNode, NodeUtils, SnippedNode, TempNode } from './TempNode';
import { OperatorNode } from './MathNodes';

export var GLSLOperatorEnum = function (e) {
  e.Radians = "radians";
  e.Degrees = "degrees";
  e.Exp = "exp";
  e.Exp2 = "exp2";
  e.Log = "log";
  e.Log2 = "log2";
  e.Sqrt = "sqrt";
  e.Rsqrt = "inversesqrt";
  e.Floor = "floor";
  e.Ceil = "ceil";
  e.Normalize = "normalize";
  e.Fract = "fract";
  e.Saturate = "saturate";
  e.Sin = "sin";
  e.Cos = "cos";
  e.Tan = "tan";
  e.Sinh = "sinh";
  e.Cosh = "cosh";
  e.Tanh = "tanh";
  e.ASin = "asin";
  e.ACos = "acos";
  e.ATan = "atan";
  e.Abs = "abs";
  e.Sign = "sign";
  e.Length = "length";
  e.Negate = "negate";
  e.Invert = "invert";
  e.Round = "round";
  e.DDX = "dFdx";
  e.DDY = "dFdy";
  e.FWidth = "fwidth";
  e.Trunc = "trunc";
  e.Min = "min";
  e.Max = "max";
  e.Remainder = "mod";
  e.Step = "step";
  e.Reflect = "reflect";
  e.Distance = "distance";
  e.Dot = "dot";
  e.Cross = "cross";
  e.Pow = "pow";
  e.TransformDirection = "transformDirection";
  e.ATan2 = "atan";
  e.Lerp = "mix";
  e.Clamp = "clamp";
  e.Refract = "refract";
  e.Smoothstep = "smoothstep";
  e.Faceforward = "faceforward";
  e.Determinant = "determinant";
  e.Inverse = "inverse";
  e.Transpose = "transpose";
  return e;
}(GLSLOperatorEnum || {});

export const GLSL1ParamOperatorNode = class GLSL1ParamOperatorNode extends TempNode {
  constructor(e, a) {
    var o;
    super();
    o = this;
    this._aDefault = new FloatNode(0);
    o._type = e;
    o._a = a || o._aDefault;
    return o;
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

  getInputType(e) {
    return (this._a ? this._a : this._aDefault).getNodeType(e);
  }

  getNodeType(e) {
    if ("length" === this._type) {
      return "float";
    } else {
      return this.getInputType(e);
    }
  }

  isSpherical() {
    return this.getA().isSpherical();
  }

  generate(e, t) {
    var r = this._type;
    var i = this.getInputType(e);
    var a = this._a ? this._a : this._aDefault;

    if (true !== e.renderer.isWebGLRenderer || "dFdx" !== r && "dFdy" !== r || "vec3" !== t) {
      if ("saturate" === r) {
        return "clamp( ".concat(a.build(e, i), ", 0.0, 1.0 )");
      }

      if ("negate" === r) {
        return "( -(" + a.build(e, i) + ") )";
      }

      if ("invert" === r) {
        return "( 1.0 - " + a.build(e, i) + " )";
      }

      var o = [];
      o.push(a.build(e, i));
      return "".concat(e.getMethod(r), "( ").concat(o.join(", "), " )");
    }

    return new ArrayNode([new GLSL1ParamOperatorNode(r, new ComponentSelectNode(a, "x")), new GLSL1ParamOperatorNode(r, new ComponentSelectNode(a, "y")), new GLSL1ParamOperatorNode(r, new ComponentSelectNode(a, "z"))]).build(e);
  }

};
export const GLSL2ParamOperatorNode = class GLSL2ParamOperatorNode extends TempNode {
  constructor(e, a) {
    var o;
    var s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
    super();
    o = this;
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(0);
    o._type = e;
    o._a = a || o._aDefault;
    o._b = s || o._bDefault;
    return o;
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

  getInputType(e) {
    var t = this._a ? this._a : this._aDefault;
    var n = this._b ? this._b : this._bDefault;
    var r = t.getNodeType(e);
    var i = n ? n.getNodeType(e) : null;
    var a = e.getTypeLength(r);
    var o = e.getTypeLength(i);

    if (a > o) {
      return r;
    } else {
      if (o > a) {
        return i;
      } else {
        return r;
      }
    }
  }

  getNodeType(e) {
    var t = this._type;

    if ("distance" === t || "dot" === t) {
      return "float";
    } else {
      if ("cross" === t || "transformDirection" === t) {
        return "vec3";
      } else {
        if ("pow" === t) {
          return (this._a ? this._a : this._aDefault).getNodeType(e);
        } else {
          return this.getInputType(e);
        }
      }
    }
  }

  isSpherical() {
    if (!this.getA().isSpherical()) {
      return this.getB().isSpherical();
    } else {
      return this.getA().isSpherical();
    }
  }

  generate(e, t) {
    var n = this._type;
    var r = this.getNodeType(e);
    var i = this.getInputType(e);
    var a = this._a ? this._a : this._aDefault;
    var o = this._b ? this._b : this._bDefault;

    if ("transformDirection" === n) {
      var s = a;
      var u = o;

      if (e.isMatrix(s.getNodeType(e))) {
        u = new SnippedNode("".concat(e.getType(DataTypeEnum.Vec4), "( ").concat(u.build(e, DataTypeEnum.Vec3), ", 0.0 )"), DataTypeEnum.Vec4);
      } else {
        s = new SnippedNode("".concat(e.getType(DataTypeEnum.Vec4), "( ").concat(s.build(e, DataTypeEnum.Vec3), ", 0.0 )"), DataTypeEnum.Vec4);
      }

      var c = new ComponentSelectNode(new OperatorNode("*", s, u), "xyz");
      return new GLSL1ParamOperatorNode("normalize", c).build(e);
    }

    var l = [];

    if ("cross" === n) {
      l.push(a.build(e, r), o.build(e, r));
    } else {
      if ("step" === n) {
        l.push(a.build(e, 1 === e.getTypeLength(a.getNodeType(e)) ? DataTypeEnum.Float : i), o.build(e, i));
      } else {
        if ("min" === n || "max" === n || "mod" === n) {
          l.push(a.build(e, i), o.build(e, 1 === e.getTypeLength(o.getNodeType(e)) ? DataTypeEnum.Float : i));
        } else {
          l.push(a.build(e, i));

          if (null !== o) {
            l.push(o.build(e, i));
          }
        }
      }
    }

    return "".concat(e.getMethod(n), "( ").concat(l.join(", "), " )");
  }

};
export const GLSL3ParamOperatorNode = class GLSL3ParamOperatorNode extends TempNode {
  constructor(e, a) {
    var o;
    var s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
    var u = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null;
    super();
    o = this;
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(0);
    this._cDefault = new FloatNode(0);
    o._type = e;
    o._a = a || o._aDefault;
    o._b = s || o._bDefault;
    o._c = u || o._cDefault;
    return o;
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

  getC() {
    if (this._c) {
      return this._c;
    } else {
      return this._cDefault;
    }
  }

  setC(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._c = e;
    } else {
      this._cDefault.value = e;
    }
  }

  getInputType(e) {
    var t = this._a ? this._a : this._aDefault;
    var n = this._b ? this._b : this._bDefault;
    var r = this._c ? this._c : this._cDefault;
    var i = t.getNodeType(e);
    var a = n ? n.getNodeType(e) : null;
    var o = r ? r.getNodeType(e) : null;
    var s = e.getTypeLength(i);
    var u = e.getTypeLength(a);
    var c = e.getTypeLength(o);

    if (s > u && s > c) {
      return i;
    } else {
      if (u > c) {
        return a;
      } else {
        if (c > s) {
          return o;
        } else {
          return i;
        }
      }
    }
  }

  getNodeType(e) {
    var t = this._type;

    if ("length" === t || "distance" === t || "dot" === t) {
      return "float";
    } else {
      if ("cross" === t) {
        return "vec3";
      } else {
        return this.getInputType(e);
      }
    }
  }

  isSpherical() {
    return this.getA().isSpherical() || this.getB().isSpherical() || this.getC().isSpherical();
  }

  generate(e, t) {
    var n = this._type;
    var r = this.getNodeType(e);
    var i = this.getInputType(e);
    var a = this._a ? this._a : this._aDefault;
    var o = this._b ? this._b : this._bDefault;
    var s = this._c ? this._c : this._cDefault;

    if (true !== e.renderer.isWebGLRenderer || "dFdx" !== n && "dFdy" !== n || "vec3" !== t) {
      if ("transformDirection" === n) {
        var u = a;
        var c = o;

        if (e.isMatrix(u.getNodeType(e))) {
          c = new SnippedNode("".concat(e.getType("vec4"), "( ").concat(c.build(e, "vec3"), ", 0.0 )"), DataTypeEnum.Vec4);
        } else {
          u = new SnippedNode("".concat(e.getType("vec4"), "( ").concat(u.build(e, "vec3"), ", 0.0 )"), DataTypeEnum.Vec4);
        }

        var l = new ComponentSelectNode(new OperatorNode("*", u, c), "xyz");
        return new GLSL1ParamOperatorNode("normalize", l).build(e);
      }

      if ("saturate" === n) {
        return "clamp( ".concat(a.build(e, i), ", 0.0, 1.0 )");
      }

      if ("negate" === n) {
        return "( -" + a.build(e, i) + " )";
      }

      if ("invert" === n) {
        return "( 1.0 - " + a.build(e, i) + " )";
      }

      var d = [];

      if ("cross" === n) {
        d.push(a.build(e, r), o.build(e, r));
      } else {
        if ("step" === n) {
          d.push(o.build(e, 1 === e.getTypeLength(a.getNodeType(e)) ? "float" : i), o.build(e, i));
        } else {
          if ("min" === n || "max" === n || "mod" === n) {
            d.push(a.build(e, i), o.build(e, 1 === e.getTypeLength(o.getNodeType(e)) ? "float" : i));
          } else {
            if ("refract" === n) {
              d.push(a.build(e, i), o.build(e, i), s.build(e, "float"));
            } else {
              if ("mix" === n) {
                d.push(a.build(e, i), o.build(e, i), s.build(e, 1 === e.getTypeLength(s.getNodeType(e)) ? "float" : i));
              } else {
                d.push(a.build(e, i));

                if (null !== s) {
                  d.push(o.build(e, i), s.build(e, i));
                } else {
                  if (null !== o) {
                    d.push(o.build(e, i));
                  }
                }
              }
            }
          }
        }
      }

      return "".concat(e.getMethod(n), "( ").concat(d.join(", "), " )");
    }

    return new ArrayNode([new GLSL1ParamOperatorNode(n, new ComponentSelectNode(a, "x")), new GLSL1ParamOperatorNode(n, new ComponentSelectNode(a, "y")), new GLSL1ParamOperatorNode(n, new ComponentSelectNode(a, "z"))]).build(e);
  }

};