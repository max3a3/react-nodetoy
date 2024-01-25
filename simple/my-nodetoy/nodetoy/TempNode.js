import * as THREE_ from "three"
import { ConstantOrPropertyEnum, InputNode } from './Node';
export const ComponentSelectNode = class ComponentSelectNode extends Node {
  constructor(e) {
    var a;
    var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : "x";
    super();
    a = this;
    a.node = e;
    a.components = o;
    return a;
  }

  getNodeType(e) {
    if (4 === this.components.length) {
      return DataTypeEnum.Vec4;
    } else {
      if (3 === this.components.length) {
        return DataTypeEnum.Vec3;
      } else {
        if (2 === this.components.length) {
          return DataTypeEnum.Vec2;
        } else {
          return DataTypeEnum.Float;
        }
      }
    }
  }

  isSpherical() {
    if (!!this.node) {
      return this.node.isSpherical();
    }
  }

  generate(e) {
    this.node;
    var t = this.node;
    var n = t.getNodeType(e);
    var r = e.getTypeLength(n);

    if (r > 1) {
      var i = null;

      if (this.components.length >= r) {
        i = this.getNodeType(e);
      }

      var a = t.build(e, i);

      if (n === DataTypeEnum.Mat3 || n === DataTypeEnum.Mat4) {
        return "".concat(a, "[0].").concat(this.components);
      } else {
        return "".concat(a, ".").concat(this.components);
      }
    }

    return t.build(e, DataTypeEnum.Float);
  }

};
export var NodeUtils = {
  elements: ["x", "y", "z", "w"],
  select: function (e, t) {
    return new ComponentSelectNode(e, NodeUtils.elements[t]);
  },
  isNode: function (e) {
    return _instanceOf(e, Node);
  }
};
export const TempNode = class TempNode extends Node {
  constructor(e) {
    super(e);
  }

  build(e, t) {
    var r = e.getVectorType(this.getNodeType(e));

    if (false !== e.context.temp && "void " !== r && "void" !== t) {
      var i = e.getDataFromNode(this);

      if (undefined === i.snippet) {
        super.build(e, r);
        var o = e.getVarFromNode(this, r);
        var c = e.getPropertyName(o);
        e.addFlowCode("".concat(c, " = ").concat(a));
        i.snippet = a;
        i.propertyName = c;
      }

      return e.format(i.propertyName, r, t);
    }

    super.build(e, t);
  }

};
TempNode.isTempNode = true;

export const SnippedNode = class SnippedNode extends TempNode {
  constructor() {
    var e;
    var a = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : "";
    var o = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : DataTypeEnum.Void;
    super(o);
    e = this;
    e.snipped = a;
    return e;
  }

  generate(e) {
    var t = this.getNodeType(e);
    var n = this.snipped;

    if (t !== DataTypeEnum.Void) {
      return "( ".concat(n, " )");
    } else {
      e.addFlowCode(n);
      return n;
    }
  }

};
export const ArrayNode = class ArrayNode extends Node {
  constructor() {
    var e;
    var a = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : [];
    super();
    e = this;
    e.nodes = a;
    return e;
  }

  getNodeType(e) {
    return e.getTypeFromLength(this.nodes.length);
  }

  generate(e) {
    var t = this.getNodeType(e);
    var n = this.nodes;
    var r = [];

    for (var i = 0; i < n.length; i++) {
      var a = n[i].build(e, "float");
      r.push(a);
    }

    return "".concat(e.getType(t), "( ").concat(r.join(", "), " )");
  }

};
export const FloatNode = class FloatNode extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 0;
    var a = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : ConstantOrPropertyEnum.Constant;
    super("float");
    e = this;
    e._type = a;
    return e;
  }

  get value() {
    return this._value;
  }

  set value(e) {
    this._value = e;
    this.markDirty();
  }

};
FloatNode.isFloatNode = true;