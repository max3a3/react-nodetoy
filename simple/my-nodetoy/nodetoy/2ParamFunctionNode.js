import { GLSL2ParamOperatorNode, GLSLOperatorEnum } from './GLSLOperatorNode';
import { FloatNode, NodeUtils, TempNode } from './TempNode';
import { Vector3Node, Vector4Node } from './VectorNode';

export const MinNode = class MinNode extends GLSL2ParamOperatorNode {
  constructor(e, r) {
    super(GLSLOperatorEnum.Min, e, r);
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
export const MaxNode = class MaxNode extends GLSL2ParamOperatorNode {
  constructor(e, r) {
    super(GLSLOperatorEnum.Max, e, r);
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
export const RemainderNode = class RemainderNode extends GLSL2ParamOperatorNode {
  constructor(e, r) {
    super(GLSLOperatorEnum.Remainder, e, r);
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
export const ATan2Node = class ATan2Node extends GLSL2ParamOperatorNode {
  constructor(e, r) {
    super(GLSLOperatorEnum.ATan2, e, r);
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
export const StepNode = class StepNode extends GLSL2ParamOperatorNode {
  constructor(e, r) {
    super(GLSLOperatorEnum.Step, e, r);
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
export const ReflectNode = class ReflectNode extends TempNode {
  constructor(e, a) {
    var o;
    super("vec3");
    o = this;
    this._aDefault = new Vector3Node(0, 0, 0);
    this._bDefault = new Vector3Node(0, 0, 0);
    o._a = e;
    o._b = a;
    return o;
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

  getNodeType(e) {
    return this.a.getNodeType();
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType());
    var r = this.b.build(e, this.a.getNodeType());
    return "(reflect(".concat(n, ",").concat(r, "))");
  }

};
export const DistanceNode = class DistanceNode extends TempNode {
  constructor(e, a) {
    var o;
    super("float");
    o = this;
    this._aDefault = new Vector4Node(0, 0, 0, 0);
    this._bDefault = new Vector4Node(0, 0, 0, 0);
    o._a = e;
    o._b = a;
    return o;
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

  generate(e, t) {
    var n = this.getNodeLength(this.a, e);
    var r = this.getNodeLength(this.b, e);
    var i = this.a.getNodeType(e);

    if (n < r) {
      i = this.b.getNodeType(e);
    }

    var a = this.a.build(e, i);
    var o = this.b.build(e, i);
    return "(distance(".concat(a, ",").concat(o, "))");
  }

};
export const DotNode = class DotNode extends TempNode {
  constructor(e, a) {
    var o;
    super("float");
    o = this;
    this._aDefault = new Vector4Node(0, 0, 0, 0);
    this._bDefault = new Vector4Node(0, 0, 0, 0);
    o._a = e;
    o._b = a;
    return o;
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

  generate(e, t) {
    var n = this.getNodeLength(this.a, e);
    var r = this.getNodeLength(this.b, e);
    var i = this.a.getNodeType(e);

    if (n < r) {
      i = this.b.getNodeType(e);
    }

    var a = this.a.build(e, i);
    var o = this.b.build(e, i);
    return "(dot(".concat(a, ",").concat(o, "))");
  }

};
export const CrossNode = class CrossNode extends TempNode {
  constructor(e, a) {
    var o;
    super("vec3");
    o = this;
    this._aDefault = new Vector3Node();
    this._bDefault = new Vector3Node();
    o._a = e;
    o._b = a;
    return o;
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

  generate(e, t) {
    var n = this.a.build(e, t);
    var r = this.b.build(e, t);
    return "(cross(".concat(n, ",").concat(r, "))");
  }

};
export const PowNode = class PowNode extends TempNode {
  constructor(e, a) {
    var o;
    super("vec3");
    o = this;
    this._aDefault = new FloatNode(0);
    this._bDefault = new FloatNode(1);
    o._a = e;
    o._b = a;
    return o;
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

  getNodeType(e) {
    var t = this.a.getNodeType(e);

    if ("texture" !== t) {
      return t;
    } else {
      return "vec4";
    }
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType(e));
    var r = this.b.build(e, this.a.getNodeType(e));
    return "(pow(".concat(n, ",").concat(r, "))");
  }

};
export const GLSLTransformDirectionNode = class GLSLTransformDirectionNode extends GLSL2ParamOperatorNode {
  constructor(e, r) {
    var a;
    super(GLSLOperatorEnum.TransformDirection, e, r);
    a = this;
    a._b = r || a._bDefault;
    return a;
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