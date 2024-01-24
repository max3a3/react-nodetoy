// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
// noinspection JSUnusedLocalSymbols

import * as THREE_ from "three"
import {Keywords, NodeAttribute, NodeCode, NodeUniform, NodeVar, NodeVary} from "./NodeUtilClasses";
import {UpdateTypeEnum} from "./Node";

export var SlotTypeEnum = function (e) {
  e.Fragment = "fragment";
  e.Vertex = "vertex";
  return e;
}(SlotTypeEnum || {});
var P = ["fragment", "vertex"];
export var InvalidUniformName = ["_sinTime", "_cosTime", "_objectScale", "_time", "_deltaTime", "_objectSpaceViewDir", "_cameraPosition", "_worldSpaceCameraPosition", "_worldSpaceLightPosition", "_worldToObject", "_worldToObjMatrix", "_worldToCameraMatrix", "_viewProjectionMatrix", "_viewMatrix", "_transposeModelViewMatrix", "_inverseTransposeModelViewMatrix", "_projectionMatrix", "_projectionParams", "_inverseProjectionMatrix", "_objectToWorldMatrix", "_modelViewProjectionMatrix", "_modelViewMatrix", "_inverseModelViewMatrix", "_modelMatrix", "_normalMatrix", "_inverseViewMatrix", "_cameraToWorldMatrix", "_worldSpaceLightDir", "_lightColor", "_screenSize", "_viewDir", "_pointerPosition", "_pointerPositionNormalized", "_pointerDown", "_pointerUp", "_pointerDownPrimary", "_pointerDownAuxiliary", "_pointerDownSecondary"];
export var DataTypeEnum = function (e) {
  e.Int = "int";
  e.Float = "float";
  e.Bool = "bool";
  e.Vec2 = "vec2";
  e.Vec3 = "vec3";
  e.Vec4 = "vec4";
  e.Color = "color";
  e.Mat3 = "mat3";
  e.Mat4 = "mat4";
  e.Texture = "texture";
  e.Sampler2D = "sampler2D";
  e.Void = "void";
  e.Function = "Function";
  e.Custom = "Custom";
  return e;
}(DataTypeEnum || {});
export const NodeBuilder = class NodeBuilder {
  constructor(t, n, r) {
    this.object = t;
    this.material = t ? t.material : null;
    this.renderer = n;
    this.parser = r;
    this.nodes = [];
    this.updateNodes = [];
    this.hashNodes = {};
    this.vertexShader = null;
    this.fragmentShader = null;
    this.flowNodes = {
      vertex: [],
      fragment: []
    };
    this.flowCode = {
      vertex: "",
      fragment: ""
    };
    this.uniforms = {
      vertex: [],
      fragment: [],
      index: 0
    };
    this.codes = {
      vertex: [],
      fragment: []
    };
    this.attributes = [];
    this.varys = [];
    this.variables = {};
    this.vars = {
      vertex: [],
      fragment: []
    };
    this.globalVars = {
      vertex: [],
      fragment: []
    };
    this.flow = {
      code: ""
    };
    this.stack = [];
    this.context = {
      keywords: new Keywords(),
      material: t ? t.material : null
    };
    this.nodesData = new WeakMap();
    this.flowsData = new WeakMap();
    this.shaderStage = null;
    this.node = null;
  }

  addStack(e) {
    this.stack.push(e);
  }

  removeStack(e) {
    if (this.stack.pop() !== e) {
      throw new Error("NodeBuilder: Invalid node stack!");
    }
  }

  addNode(e) {
    if (-1 === this.nodes.indexOf(e)) {
      if (e.getUpdateType(this) !== UpdateTypeEnum.None) {
        this.updateNodes.push(e);
      }

      this.nodes.push(e);
      this.hashNodes[e.getHash(this)] = e;
    }
  }

  setContext(e) {
    this.context = e;
  }

  getContext() {
    return this.context;
  }

  getMethod(e) {
    return e;
  }

  getNodeFromHash(e) {
    return this.hashNodes[e];
  }

  getTexture(e, t) {
    console.warn("Abstract function.");
  }

  getCubeTexture(e, t) {
    console.warn("Abstract function.");
  }

  getConst(e, t) {
    if ("int" === e) {
      return t;
    }

    if ("float" === e) {
      return t + (t % 1 ? "" : ".0");
    }

    if ("vec2" === e) {
      return "".concat(this.getType("vec2"), "( ").concat(t.x, ", ").concat(t.y, " )");
    }

    if ("vec3" === e) {
      return "".concat(this.getType("vec3"), "( ").concat(t.x, ", ").concat(t.y, ", ").concat(t.z, " )");
    }

    if ("vec4" === e) {
      return "".concat(this.getType("vec4"), "( ").concat(t.x, ", ").concat(t.y, ", ").concat(t.z, ", ").concat(t.w, " )");
    }

    if ("color" === e) {
      return "".concat(this.getType("vec3"), "( ").concat(t.r, ", ").concat(t.g, ", ").concat(t.b, " )");
    }

    if ("mat3" === e) {
      return "".concat(this.getType("mat3"), " ( ").concat(t[0], ", ").concat(t[1], ", ").concat(t[2], ", ").concat(t[3], ", ").concat(t[4], ", ").concat(t[5], ", ").concat(t[6], ", ").concat(t[7], ", ").concat(t[8], " )");
    }

    if ("mat4" === e) {
      return "".concat(this.getType("mat4"), " ( ").concat(t[0], ", ").concat(t[1], ", ").concat(t[2], ", ").concat(t[3], ", ").concat(t[4], ", ").concat(t[5], ", ").concat(t[6], ", ").concat(t[7], ", ").concat(t[8], ", ").concat(t[9], ", ").concat(t[10], ", ").concat(t[11], ", ").concat(t[12], ", ").concat(t[13], ", ").concat(t[14], ", ").concat(t[15], " )");
    }

    throw new Error("NodeBuilder: Type '".concat(e, "' not found in generate constant attempt."));
  }

  getType(e) {
    return e;
  }

  getAttribute(e, t) {
    var n = this.attributes;
    var r = true;
    var i = false;
    var a = undefined;

    try {
      var o;

      for (var s = n[Symbol.iterator](); !(r = (o = s.next()).done); r = true) {
        var u = o.value;

        if (u.name === e) {
          return u;
        }
      }
    } catch (l) {
      i = true;
      a = l;
    } finally {
      try {
        if (!(r || null == s.return)) {
          s.return();
        }
      } finally {
        if (i) {
          throw a;
        }
      }
    }

    var c = new NodeAttribute(e, t);
    n.push(c);
    return c;
  }

  getPropertyName(e) {
    return e.name;
  }

  isVector(e) {
    return "vec2" === e || "vec3" === e || "vec4" === e;
  }

  isMatrix(e) {
    if (!("mat3" === e)) {
      return "mat4" === e;
    } else {
      return "mat3" === e;
    }
  }

  isShaderStage(e) {
    return this.shaderStage === e;
  }

  getTextureEncodingFromMap(e) {
    if (e && e.isTexture) {
      return e.encoding;
    } else {
      if (e && e.isWebGLRenderTarget) {
        return e.texture.encoding;
      } else {
        return THREE_.LinearEncoding;
      }
    }
  }

  getVectorType(e) {
    if ("color" === e) {
      return "vec3";
    } else {
      if ("texture" === e) {
        return "vec4";
      } else {
        return e;
      }
    }
  }

  getTypeFromLength(e) {
    if (1 === e) {
      return "float";
    } else {
      if (2 === e) {
        return "vec2";
      } else {
        if (3 === e) {
          return "vec3";
        } else {
          if (4 === e) {
            return "vec4";
          } else {
            if (9 === e) {
              return "mat3";
            } else {
              if (12 === e) {
                return "mat4";
              } else {
                return null;
              }
            }
          }
        }
      }
    }
  }

  getTypeLength(e) {
    if ("int" === e || "float" === e || "bool" === e) {
      return 1;
    } else {
      if ("vec2" === e) {
        return 2;
      } else {
        if ("vec3" === e) {
          return 3;
        } else {
          if ("vec4" === e) {
            return 4;
          } else {
            if ("color" === e) {
              return 3;
            } else {
              if ("texture" === e) {
                return 4;
              } else {
                if ("mat3" === e) {
                  return 9;
                } else {
                  if ("mat4" === e) {
                    return 12;
                  } else {
                    return 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  getVectorFromMatrix(e) {
    return "vec".concat(e.substring(3));
  }

  getDataFromNode(e) {
    var t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : this.shaderStage;
    var n = this.nodesData.get(e);

    if (undefined === n) {
      n = {
        vertex: {},
        fragment: {}
      };
      this.nodesData.set(e, n);
    }

    if (null !== t) {
      return n[t];
    } else {
      return n;
    }
  }

  getUniformFromNode(e, t, n) {
    var r = this.getDataFromNode(e, t);
    var i = r.uniform;

    if (undefined === i) {
      var a = this.uniforms.index++;
      i = new NodeUniform("nodeUniform" + a, n, e);
      this.uniforms[t].push(i);
      r.uniform = i;
    }

    return i;
  }

  doesUniformNameExists(e, t) {
    var n = this.uniforms[e];

    for (var r = 0; r < n.length; r++) {
      if (n[r].name === t) {
        return true;
      }
    }

    return false;
  }

  getUniformByName(e, t) {
    var n = this.uniforms[e];

    for (var r = 0; r < n.length; r++) {
      if (n[r].name === t) {
        return n[r];
      }
    }

    return null;
  }

  getUniformFromNodeWithName(e, t, n, r) {
    var i = this.getDataFromNode(e, t);
    var a = i.uniform;

    if (undefined === a) {
      var o = r;
      var s = this.getUniformByName(t, o);

      if (s && -1 !== InvalidUniformName.indexOf(o)) {
        return s;
      }

      for (var u = 1; this.doesUniformNameExists(t, o);) {
        o = r + ++u;
      }

      a = new NodeUniform(o, n, e);
      this.uniforms[t].push(a);
      i.uniform = a;
    }

    return a;
  }

  getVarFromNode(e, t) {
    var n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : this.shaderStage;
    var r = this.getDataFromNode(e, n);
    var i = r.variable;

    if (undefined === i) {
      var a = this.vars[n];
      var o = a.length;
      i = new NodeVar("nodeVar" + o, t);
      a.push(i);
      r.variable = i;
    }

    return i;
  }

  getVaryFromNode(e, t) {
    var n = this.getDataFromNode(e, null);
    var r = n.vary;

    if (undefined === r) {
      var i = this.varys;
      var a = i.length;
      r = new NodeVary("nodeVary" + a, t);
      i.push(r);
      n.vary = r;
    }

    return r;
  }

  getCodeFromNode(e, t) {
    var n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : this.shaderStage;
    var r = this.getDataFromNode(e);
    var i = r.code;

    if (undefined === i) {
      var a = this.codes[n];
      var o = a.length;
      i = new NodeCode("nodeCode" + o, t);
      a.push(i);
      r.code = i;
    }

    return i;
  }

  addFlow(e, t) {
    this.flowNodes[e].push(t);
    return t;
  }

  addFlowCode(e) {
    this.flow.code += e;
  }

  getFlowData(e, t) {
    return this.flowsData.get(t);
  }

  flowNode(e, t) {
    this.node = e;
    var n = e.getNodeType(this);
    var r = this.flowChildNode(e, n);
    this.flowsData.set(e, r);
    this.node = null;
    return r;
  }

  flowChildNode(e) {
    var t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : null;
    var n = this.flow;
    var r = {
      code: "",
      result: null
    };
    this.flow = r;
    r.result = e.build(this, t);
    this.flow = n;
    return r;
  }

  flowNodeFromShaderStage(e, t) {
    var n = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
    var r = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : null;
    var i = this.shaderStage;
    this.setShaderStage(e);
    var a = this.flowChildNode(t, n);

    if (null !== r) {
      a.code += "".concat(r, " = ").concat(a.result, ";\n\t");
    }

    this.flowCode[e] = this.flowCode[e] + a.code;
    this.setShaderStage(i);
    return a;
  }

  getAttributes(e) {
    var t = "";

    if ("vertex" === e) {
      var n = this.attributes;

      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        t += "layout(location = ".concat(r, ") in ").concat(i.type, " ").concat(i.name, "; ");
      }
    }

    return t;
  }

  getVarys(e) {
    console.warn("Abstract function.");
  }

  getVars(e) {
    var t = "";
    var n = this.vars[e];

    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      t += "".concat(i.type, " ").concat(i.name, "; ");
    }

    return t;
  }

  getUniforms(e) {
    console.warn("Abstract function.");
  }

  getCodes(e) {
    var t = "";
    var n = [];
    var r = this.codes[e];
    var i = true;
    var a = false;
    var o = undefined;

    try {
      var s;

      for (var u = r[Symbol.iterator](); !(i = (s = u.next()).done); i = true) {
        var c = s.value;

        if (!n.includes(c.name)) {
          t += c.code + "\n";
        }

        n += [c.code];
      }
    } catch (l) {
      a = true;
      o = l;
    } finally {
      try {
        if (!(i || null == u.return)) {
          u.return();
        }
      } finally {
        if (a) {
          throw o;
        }
      }
    }

    return t;
  }

  getHash() {
    return this.vertexShader + this.fragmentShader;
  }

  getShaderStage() {
    return this.shaderStage;
  }

  setShaderStage(e) {
    this.shaderStage = e;
  }

  buildCode() {}

  build() {
    if (this.context.vertex && this.context.vertex.isNode) {
      this.flowNodeFromShaderStage("vertex", this.context.vertex);
    }

    var e = true;
    var t = false;
    var n = undefined;

    try {
      var r;

      for (var i = P[Symbol.iterator](); !(e = (r = i.next()).done); e = true) {
        var a = r.value;
        this.setShaderStage(a);
        var o = this.flowNodes[a];
        var s = true;
        var u = false;
        var c = undefined;

        try {
          var l;

          for (var d = o[Symbol.iterator](); !(s = (l = d.next()).done); s = true) {
            var f = l.value;
            this.flowNode(f, a);
          }
        } catch (h) {
          u = true;
          c = h;
        } finally {
          try {
            if (!(s || null == d.return)) {
              d.return();
            }
          } finally {
            if (u) {
              throw c;
            }
          }
        }
      }
    } catch (p) {
      t = true;
      n = p;
    } finally {
      try {
        if (!(e || null == i.return)) {
          i.return();
        }
      } finally {
        if (t) {
          throw n;
        }
      }
    }

    this.setShaderStage(null);
    this.buildCode();
    return this;
  }

  format(e, t, n) {
    switch (t = this.getVectorType(t), n = this.getVectorType(n), "".concat(t, " to ").concat(n)) {
      case "int to float":
        return "".concat(this.getType("float"), "( ").concat(e, " )");

      case "int to vec2":
        return "".concat(this.getType("vec2"), "( ").concat(this.getType("float"), "( ").concat(e, " ) )");

      case "int to vec3":
        return "".concat(this.getType("vec3"), "( ").concat(this.getType("float"), "( ").concat(e, " ) )");

      case "int to vec4":
        return "".concat(this.getType("vec4"), "( ").concat(this.getType("vec3"), "( ").concat(this.getType("float"), "( ").concat(e, " ) ), 1.0 )");

      case "float to int":
        return "".concat(this.getType("int"), "( ").concat(e, " )");

      case "float to vec2":
        return "".concat(this.getType("vec2"), "( ").concat(e, " )");

      case "float to vec3":
        return "".concat(this.getType("vec3"), "( ").concat(e, " )");

      case "float to vec4":
        return "".concat(this.getType("vec4"), "( ").concat(this.getType("vec3"), "( ").concat(e, " ), 1.0 )");

      case "vec2 to int":
      case "vec3 to int":
      case "vec4 to int":
        return "".concat(this.getType("int"), "( ").concat(e, ".x )");

      case "vec2 to float":
      case "vec3 to float":
      case "vec4 to float":
        return "".concat(e, ".x");

      case "vec2 to vec3":
        return "".concat(this.getType("vec3"), "( ").concat(e, ", 0.0 )");

      case "vec2 to vec4":
        return "".concat(this.getType("vec4"), "( ").concat(e, ".xy, 0.0, 1.0 )");

      case "vec3 to vec2":
      case "vec4 to vec2":
        return "".concat(e, ".xy");

      case "vec3 to vec4":
        return "".concat(this.getType("vec4"), "( ").concat(e, ", 1.0 )");

      case "vec4 to vec3":
        return "".concat(e, ".xyz");

      case "mat3 to int":
        return "".concat(this.getType("int"), "( ").concat(e, " * ").concat(this.getType("vec3"), "( 1.0 ) ).x");

      case "mat3 to float":
        return "( ".concat(e, " * ").concat(this.getType("vec3"), "( 1.0 ) ).x");

      case "mat3 to vec2":
        return "( ".concat(e, " * ").concat(this.getType("vec3"), "( 1.0 ) ).xy");

      case "mat3 to vec3":
        return "( ".concat(e, " * ").concat(this.getType("vec3"), "( 1.0 ) ).xyz");

      case "mat3 to vec4":
        return "".concat(this.getType("vec4"), "( ").concat(e, " * ").concat(this.getType("vec3"), "( 1.0 ), 1.0 )");

      case "mat4 to int":
        return "".concat(this.getType("int"), "( ").concat(e, " * ").concat(this.getType("vec4"), "( 1.0 ) ).x");

      case "mat4 to float":
        return "( ".concat(e, " * ").concat(this.getType("vec4"), "( 1.0 ) ).x");

      case "mat4 to vec2":
        return "( ".concat(e, " * ").concat(this.getType("vec4"), "( 1.0 ) ).xy");

      case "mat4 to vec3":
        return "( ".concat(e, " * ").concat(this.getType("vec4"), "( 1.0 ) ).xyz");

      case "mat4 to vec4":
        return "( ".concat(e, " * ").concat(this.getType("vec4"), "( 1.0 ) )");
    }

    return e;
  }

  getSignature() {
    return "// Created with NodeToy | Three.js r".concat(THREE_.REVISION, "\n");
  }

};