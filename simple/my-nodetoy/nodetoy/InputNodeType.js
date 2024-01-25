import * as THREE_ from "three"

import { ConstantOrPropertyEnum, InputNode } from './Node';

export const IntNode = class IntNode extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 0;
    var a = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : ConstantOrPropertyEnum.Constant;
    super("int");
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
IntNode.isIntNode = true;
export const Matrix3Node = class Matrix3Node extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : new THREE_.Matrix3();
    super("mat3");
    e = this;
    e._type = ConstantOrPropertyEnum.Property;
    return e;
  }

  get value() {
    return this._value;
  }

  set value(e) {
    _instanceOf(e, THREE_.Matrix3);

    this._value = e;
    this.markDirty();
  }

  get elements() {
    return this._value.elements;
  }

  set elements(e) {
    this._value.elements = e;
  }

};
Matrix3Node.isMatrix3Node = true;
export const Matrix4Node = class Matrix4Node extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : new THREE_.Matrix4();
    super("mat4");
    e = this;
    e._type = ConstantOrPropertyEnum.Property;
    return e;
  }

  get value() {
    return this._value;
  }

  set value(e) {
    this._value = e;
    this.markDirty();
  }

  get elements() {
    return this._value.elements;
  }

  set elements(e) {
    this._value.elements = e;
  }

};
Matrix4Node.isMatrix4Node = true;