// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
// noinspection JSUnusedGlobalSymbols

import * as THREE_ from "three"

export var VERTEX_STAGE = "vertex";
export var UpdateTypeEnum = function (e) {
  e.None = "none";
  e.Frame = "frame";
  e.Object = "object";
  return e;
}(UpdateTypeEnum || {});
export var floatConst = "float";
export const Node = class Node {
  constructor() {
    var t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
    this.isNode = true;
    this.nodeType = t;
    this.updateType = UpdateTypeEnum.None;
    this.uuid = THREE_.MathUtils.generateUUID();
  }

  get name() {
    return this._name;
  }

  set name(e) {
    this._name = e;
  }

  markDirty() {
    this.uuid = THREE_.MathUtils.generateUUID();
  }

  get lowLevelType() {
    return this.constructor.name;
  }

  getHash(e) {
    return this.uuid;
  }

  getUpdateType(e) {
    return this.updateType;
  }

  getNodeType(e) {
    return this.nodeType;
  }

  update(e) {
    console.warn("Abstract function.", this);
  }

  generate(e, t) {
    console.warn("Abstract function.");
    return null;
  }

  isSpherical() {
    return false;
  }

  build(e) {
    var t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    return this.rawBuild(e, t);
  }

  rawBuild(e) {
    var t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    var n = this.getHash(e);
    var r = e.getNodeFromHash(n);

    if (undefined !== r && this !== r) {
      return r.build(e, t);
    }

    e.addNode(this);
    e.addStack(this);
    var i = 1 === this.generate.length;
    var a = null;

    if (i) {
      var o = this.getNodeType(e);
      var s = e.getDataFromNode(this);

      if (undefined === (a = s.snippet)) {
        a = this.generate(e) || "";
        s.snippet = a;
      }

      a = e.format(a, o, t);
    } else {
      a = this.generate(e, t) || "";
    }

    e.removeStack(this);
    return a;
  }

};
export var ConstantOrPropertyEnum = function (e) {
  e[e.Constant = 0] = "Constant";
  e[e.Property = 1] = "Property";
  return e;
}(ConstantOrPropertyEnum || {});


export const InputNode = class InputNode extends Node {
  constructor(e) {
    var a;
    super(e);
    a = this;
    a.inputType = e;
    a._type = 0;
    return a;
  }

  get name() {
    return this._name;
  }

  set name(e) {
    this._name = e.replace(/\s/g, "");
    this.markDirty();
  }

  get type() {
    return this._type;
  }

  set type(e) {
    this._type = e;
    this.markDirty();
  }

  getInputType(e) {
    return this.inputType;
  }

  generateConst(e) {
    return e.getConst(this.getNodeType(e), this._value);
  }

  generate(e, t) {
    var n = this.getNodeType(e);

    if (0 === this._type) {
      return e.format(this.generateConst(e), n, t);
    }

    var r = this.getInputType(e);
    var i = this._name ? e.getUniformFromNodeWithName(this, e.shaderStage, r, this._name) : e.getUniformFromNode(this, e.shaderStage, r);
    var a = e.getPropertyName(i);
    return e.format(a, n, t);
  }

};
InputNode.isInputNode = true;
export const ColorNode = class ColorNode extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
    var a = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
    var s = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null;
    super("vec4");
    e = this;

    if (null !== a) {
      e._value = new THREE_.Vector4(r, a, o, s);
    } else {
      if (null !== r) {
        e.value = r;
      } else {
        e._value = new THREE_.Vector4(1, 1, 1, 1);
      }
    }

    return e;
  }

  get value() {
    return this._value;
  }

  set value(e) {
    if (_instanceOf(e, THREE_.Vector4)) {
      this._value = e;
    } else if ("string" === typeof e || _instanceOf(e, String)) {
      var t = new THREE_.Color(e);
      this._value = this._value ? this._value.set(t.r, t.g, t.b, 1) : new THREE_.Vector4(t.r, t.g, t.b, 1);
    } else if (_instanceOf(e, THREE_.Color)) {
      this._value = this._value ? this._value.set(e.r, e.g, e.b, 1) : new THREE_.Vector4(e.r, e.g, e.b, 1);
    } else {
      if (!_instanceOf(e, Object)) {
        console.warn("[ColorNode] invalid value: " + e);
        return;
      }

      if ("x" in e) {
        this._value = this._value ? this._value.set(e.x, e.y, e.z, e.w) : new THREE_.Vector4(e.x, e.y, e.z, e.w);
      } else {
        if ("r" in e) {
          this._value = this._value ? this._value.set(e.r, e.g, e.b, e.a) : new THREE_.Vector4(e.r, e.g, e.b, e.a);
        }
      }
    }

    this.markDirty();
  }

};
ColorNode.isColorNode = true;