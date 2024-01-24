// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
import * as THREE_ from "three"

export const NodeUniform = class NodeUniform {
  constructor(t, n, r) {
    var a = arguments.length > 3 && undefined !== arguments[3] ? arguments[3] : undefined;
    this.name = t;
    this.type = n;
    this.node = r;
    this.needsUpdate = a;
  }

  get value() {
    return this.node.value;
  }

  set value(e) {
    this.node.value = e;
  }

};
NodeUniform.isNodeUniform = true;
export var NodeAttribute = function e(t, n) {
  this.name = t;
  this.type = n;
};
NodeAttribute.isNodeAttribute = true;
export var NodeVary = function e(t, n) {
  this.name = t;
  this.type = n;
};
NodeVary.isNodeVary = true;
export var NodeVar = function e(t, n) {
  this.name = t;
  this.type = n;
};
NodeVar.isNodeVar = true;
export var NodeCode = function e(t, n) {
  var r = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : "";
  this.name = t;
  this.type = n;
  this.code = r;
  Object.defineProperty(this, "isNodeCode", {
    value: true
  });
};
export const Keywords = class Keywords {
  constructor() {
    this.keywords = [];
    this.nodes = [];
    this.keywordsCallback = {};
  }

  getNode(e) {
    var t = this.nodes[e];

    if (undefined === t && undefined !== this.keywordsCallback[e]) {
      t = this.keywordsCallback[e](e);
      this.nodes[e] = t;
    }

    return t;
  }

  addKeyword(e, t) {
    this.keywords.push(e);
    this.keywordsCallback[e] = t;
    return this;
  }

  parse(e) {
    var t = this.keywords;
    var n = new RegExp("\\b".concat(t.join("\\b|\\b"), "\\b"), "g");
    var r = e.match(n);
    var i = [];

    if (null !== r) {
      var a = true;
      var o = false;
      var s = undefined;

      try {
        var u;

        for (var c = r[Symbol.iterator](); !(a = (u = c.next()).done); a = true) {
          var l = u.value;
          var d = this.getNode(l);

          if (undefined !== d && -1 === i.indexOf(d)) {
            i.push(d);
          }
        }
      } catch (f) {
        o = true;
        s = f;
      } finally {
        try {
          if (!(a || null == c.return)) {
            c.return();
          }
        } finally {
          if (o) {
            throw s;
          }
        }
      }
    }

    return i;
  }

  include(e, t) {
    var n = this.parse(t);
    var r = true;
    var i = false;
    var a = undefined;

    try {
      var o;

      for (var s = n[Symbol.iterator](); !(r = (o = s.next()).done); r = true) {
        o.value.build(e);
      }
    } catch (u) {
      i = true;
      a = u;
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
  }

};