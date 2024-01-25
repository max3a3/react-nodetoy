import { FloatNode, NodeUtils, TempNode } from './TempNode';
import { Vector2Node, Vector4Node } from './VectorNode';
import { GLSL3ParamOperatorNode, GLSLOperatorEnum } from './GLSLOperatorNode';

export const LerpNode = class LerpNode extends TempNode {
  constructor(e, a, o) {
    var s;
    super("float");
    s = this;
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(0);
    this._etaDefault = new FloatNode(0);
    s._a = e;
    s._b = a;
    s._eta = o;
    return s;
  }

  get a() {
    if (this._a) {
      return this._a;
    } else {
      return this._aDefault;
    }
  }

  set a(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._a = e;
    } else {
      this._aDefault.value = e;
    }
  }

  get b() {
    if (this._b) {
      return this._b;
    } else {
      return this._bDefault;
    }
  }

  set b(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._b = e;
    } else {
      this._bDefault.value = e;
    }
  }

  get eta() {
    if (this._eta) {
      return this._eta;
    } else {
      return this._etaDefault;
    }
  }

  set eta(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._eta = e;
    } else {
      this._etaDefault.value = e;
    }
  }

  getNodeLength(e, t) {
    var n = e.getNodeType(t);

    if ("int" === n || "float" === n) {
      return 1;
    } else {
      if ("vec2" === n) {
        return 2;
      } else {
        if ("vec4" === n || "color" === n || "texture" === n) {
          return 4;
        } else {
          return 3;
        }
      }
    }
  }

  getNodeType(e) {
    if (this.getNodeLength(this.a, e) < this.getNodeLength(this.b, e)) {
      return this.b.getNodeType(e);
    } else {
      return this.a.getNodeType(e);
    }
  }

  generate(e, t) {
    var n = this.a.build(e, t);
    var r = this.b.build(e, t);
    var i = this.eta.build(e, t);
    return "(mix(".concat(n, ", ").concat(r, ", ").concat(i, "));\n\t\t");
  }

};
export const InverseLerpNode = class InverseLerpNode extends TempNode {
  constructor(e, a, o) {
    var s;
    super("float");
    s = this;
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(0);
    this._etaDefault = new FloatNode(0);
    s._a = e;
    s._b = a;
    s._eta = o;
    return s;
  }

  get a() {
    if (this._a) {
      return this._a;
    } else {
      return this._aDefault;
    }
  }

  set a(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._a = e;
    } else {
      this._aDefault.value = e;
    }
  }

  get b() {
    if (this._b) {
      return this._b;
    } else {
      return this._bDefault;
    }
  }

  set b(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._b = e;
    } else {
      this._bDefault.value = e;
    }
  }

  get eta() {
    if (this._eta) {
      return this._eta;
    } else {
      return this._etaDefault;
    }
  }

  set eta(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._eta = e;
    } else {
      this._etaDefault.value = e;
    }
  }

  getNodeLength(e, t) {
    var n = e.getNodeType(t);

    if ("int" === n || "float" === n) {
      return 1;
    } else {
      if ("vec2" === n) {
        return 2;
      } else {
        if ("vec4" === n || "color" === n || "texture" === n) {
          return 4;
        } else {
          return 3;
        }
      }
    }
  }

  getNodeType(e) {
    if (this.getNodeLength(this.a, e) < this.getNodeLength(this.b, e)) {
      return this.b.getNodeType(e);
    } else {
      return this.a.getNodeType(e);
    }
  }

  generate(e, t) {
    var n = this.a.build(e, t);
    var r = this.b.build(e, t);
    var i = this.eta.build(e, t);
    return "((".concat(i, " - ").concat(n, ") / (").concat(r, " - ").concat(n, "));\n\t\t");
  }

};
export const RandomRangeNode = class RandomRangeNode extends TempNode {
  constructor(e, a, o) {
    var s;
    super("float");
    s = this;
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(1);
    this._etaDefault = new Vector2Node(0, 0);
    s._a = e;
    s._b = a;
    s._eta = o;
    return s;
  }

  get a() {
    if (this._a) {
      return this._a;
    } else {
      return this._aDefault;
    }
  }

  set a(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._a = e;
    } else {
      this._aDefault.value = e;
    }
  }

  get b() {
    if (this._b) {
      return this._b;
    } else {
      return this._bDefault;
    }
  }

  set b(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._b = e;
    } else {
      this._bDefault.value = e;
    }
  }

  get eta() {
    if (this._eta) {
      return this._eta;
    } else {
      return this._etaDefault;
    }
  }

  set eta(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._eta = e;
    } else {
      this._etaDefault.value = e;
    }
  }

  generate(e, t) {
    var n = this.a.build(e, t);
    var r = this.b.build(e, t);
    var i = this.eta.build(e, "vec2");
    return "(mix(".concat(n, ", ").concat(r, ", fract(sin(dot(").concat(i, ", vec2(12.9898, 78.233)))*43758.5453)));\n\t\t");
  }

};
export const ClampNode = class ClampNode extends GLSL3ParamOperatorNode {
  constructor(e, r, a) {
    var o;
    super(GLSLOperatorEnum.Clamp, e, r, a);
    o = this;
    o._c = a || o._cDefault;
    return o;
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

  get min() {
    return this.getB();
  }

  set min(e) {
    this.setB(e);
  }

  get max() {
    return this.getC();
  }

  set max(e) {
    this.setC(e);
  }

};
export const RefractNode = class RefractNode extends TempNode {
  constructor(e, a, o) {
    var s;
    super("vec4");
    s = this;
    this._aDefault = new Vector4Node(0, 0, 0, 0);
    this._bDefault = new Vector4Node(0, 0, 0, 0);
    this._etaDefault = new FloatNode(0);
    s._a = e;
    s._b = a;
    s._eta = o;
    return s;
  }

  get a() {
    if (this._a) {
      return this._a;
    } else {
      return this._aDefault;
    }
  }

  set a(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._a = e;
    } else {
      this._aDefault.value = e;
    }
  }

  get b() {
    if (this._b) {
      return this._b;
    } else {
      return this._bDefault;
    }
  }

  set b(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._b = e;
    } else {
      this._bDefault.value = e;
    }
  }

  get eta() {
    if (this._eta) {
      return this._eta;
    } else {
      return this._etaDefault;
    }
  }

  set eta(e) {
    if (null === e || NodeUtils.isNode(e)) {
      this._eta = e;
    } else {
      this._etaDefault.value = e;
    }
  }

  getNodeLength(e, t) {
    var n = e.getNodeType(t);

    if ("int" === n || "float" === n) {
      return 1;
    } else {
      if ("vec2" === n) {
        return 2;
      } else {
        if ("vec4" === n || "color" === n || "texture" === n) {
          return 4;
        } else {
          return 3;
        }
      }
    }
  }

  getNodeType(e) {
    if (this.getNodeLength(this.a, e) < this.getNodeLength(this.b, e)) {
      return this.b.getNodeType(e);
    } else {
      return this.a.getNodeType(e);
    }
  }

  generate(e, t) {
    var n = this.a.build(e, t);
    var r = this.b.build(e, t);
    var i = this.eta.build(e, "float");
    return "(refract(".concat(n, ",").concat(r, ",").concat(i, "))");
  }

};
export const SmoothstepNode = class SmoothstepNode extends GLSL3ParamOperatorNode {
  constructor(e, r, a) {
    var o;
    super(GLSLOperatorEnum.Smoothstep, e, r, a);
    o = this;
    o._b = a || o._bDefault;
    return o;
  }

  get min() {
    return this.getA();
  }

  set min(e) {
    this.setA(e);
  }

  get max() {
    return this.getB();
  }

  set max(e) {
    this.setB(e);
  }

  get value() {
    return this.getC();
  }

  set value(e) {
    this.setC(e);
  }

};
export const FaceforwardNode = class FaceforwardNode extends GLSL3ParamOperatorNode {
  constructor(e, r, a) {
    super(GLSLOperatorEnum.Faceforward, e, r, a);
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

  get alpha() {
    return this.getC();
  }

  set alpha(e) {
    this.setC(e);
  }

};