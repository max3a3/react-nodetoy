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
export const Vector3Node = class Vector3Node extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
    var a = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
    var s = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : ConstantOrPropertyEnum.Constant;
    super("vec3");
    e = this;

    if (null !== a) {
      e._value = new THREE_.Vector3(r, a, o);
    } else {
      if (null !== r) {
        e.value = r;
      } else {
        e._value = new THREE_.Vector3(0, 0, 0);
      }
    }

    return e;
  }

  get value() {
    return this._value;
  }

  set value(e) {
    if (_instanceOf(e, THREE_.Vector3)) {
      this._value = e;
    } else {
      if (!_instanceOf(e, Object)) {
        console.warn("[Vector3Node] invalid value: " + e);
        return;
      }

      this._value = this._value ? this._value.set(e.x, e.y, e.z) : new THREE_.Vector3(e.x, e.y, e.z);
    }

    this.markDirty();
  }

};
Vector3Node.isVector3Node = true;
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