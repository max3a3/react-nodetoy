import { ConstantOrPropertyEnum, InputNode } from './Node';
import * as THREE_ from "three"

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
export const Vector4Node = class Vector4Node extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
    var a = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
    var s = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null;
    var u = arguments.length > 4 && undefined !== arguments[4] ? arguments[4] : ConstantOrPropertyEnum.Constant;
    super("vec4");
    e = this;

    if (null !== a) {
      e._value = new THREE_.Vector4(r, a, o, s);
    } else {
      if (null !== r) {
        e.value = r;
      } else {
        e._value = new THREE_.Vector4(0, 0, 0, 0);
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
    } else {
      if (!_instanceOf(e, Object)) {
        console.warn("[Vector4Node] invalid value: " + e);
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
Vector4Node.isVector4Node = true;
export const Vector2Node = class Vector2Node extends InputNode {
  constructor() {
    var e;
    var r = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : null;
    var a = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    var o = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : ConstantOrPropertyEnum.Constant;
    super("vec2");
    e = this;

    if (null !== a) {
      e._value = new THREE_.Vector2(r, a);
    } else {
      if (null !== r) {
        e.value = r;
      } else {
        e._value = new THREE_.Vector2(0, 0);
      }
    }

    return e;
  }

  get value() {
    return this._value;
  }

  set value(e) {
    if (_instanceOf(e, THREE_.Vector2)) {
      this._value = e;
    } else {
      if (!_instanceOf(e, Object)) {
        console.warn("[Vector2Node] invalid value: " + e);
        return;
      }

      this._value = this._value ? this._value.set(e.x, e.y) : new THREE_.Vector2(e.x, e.y);
    }

    this.markDirty();
  }

};
Vector2Node.isVector2Node = true;