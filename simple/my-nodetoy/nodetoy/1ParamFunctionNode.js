import { FloatNode, NodeUtils, TempNode } from './TempNode';
import { Vector3Node, Vector4Node } from './VectorNode';

export const DDXNode = class DDXNode extends TempNode {
  constructor(e, a) {
    var o;
    super("vec3");
    o = this;
    this._aDefault = new Vector3Node();
    o._a = e;
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

  getNodeType(e) {
    return this.a.getNodeType(e);
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType());
    return "dFdx(".concat(n, ")");
  }

};
export const DDYNode = class DDYNode extends TempNode {
  constructor(e, a) {
    var o;
    super("vec3");
    o = this;
    this._aDefault = new Vector3Node();
    o._a = e;
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

  getNodeType(e) {
    return this.a.getNodeType(e);
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType());
    return "dFdy(".concat(n, ")");
  }

};
export const ReciprocalNode = class ReciprocalNode extends TempNode {
  constructor(e, a) {
    var o;
    super("float");
    o = this;
    this._aDefault = new FloatNode(1);
    o._a = e;
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

  getNodeType(e) {
    return this.a.getNodeType(e);
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType());
    var r = new FloatNode(1).build(e, this.a.getNodeType());
    return "(".concat(r, "/").concat(n, ")");
  }

};
export const NormalizeNode = class NormalizeNode extends TempNode {
  constructor(e) {
    var a;
    super("vec4");
    a = this;
    this._aDefault = new Vector4Node(0, 0, 0, 0);
    a._a = e;
    return a;
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

  getNodeType(e) {
    return this.a.getNodeType(e);
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType(e));
    return "(normalize(".concat(n, "))");
  }

};
export const TanNode = class TanNode extends Node {
  constructor(e, a) {
    var o;
    super();
    o = this;
    this._aDefault = new FloatNode(0);
    o._a = e;
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

  getNodeType(e) {
    return this.a.getNodeType();
  }

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType());
    return "tan(".concat(n, ")");
  }

};
export const LengthNode = class LengthNode extends TempNode {
  constructor(e) {
    var a;
    super("float");
    a = this;
    this._aDefault = new Vector4Node(0, 0, 0, 0);
    a._a = e;
    return a;
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

  generate(e, t) {
    var n = this.a.build(e, this.a.getNodeType(e));
    return "(length(".concat(n, "))");
  }

};