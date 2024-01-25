import { GLSL1ParamOperatorNode, GLSLOperatorEnum } from './GLSLOperatorNode';

export const RadiansNode = class RadiansNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Radians, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const DegreesNode = class DegreesNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Degrees, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const ExpNode = class ExpNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Exp, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const Exp2Node = class Exp2Node extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Exp2, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const LogNode = class LogNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Log, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const Log2Node = class Log2Node extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Log2, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const SqrtNode = class SqrtNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Sqrt, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const RSqrtNode = class RSqrtNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Rsqrt, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const FloorNode = class FloorNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Floor, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const CeilNode = class CeilNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Ceil, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const FractNode = class FractNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Fract, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const SaturateNode = class SaturateNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Saturate, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const SinNode = class SinNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Sin, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const CosNode = class CosNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Cos, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const SinhNode = class SinhNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Sinh, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const CoshNode = class CoshNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Cosh, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const TanhNode = class TanhNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Tanh, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const ASinNode = class ASinNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.ASin, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const ACosNode = class ACosNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.ACos, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const ATanNode = class ATanNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.ATan, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const AbsNode = class AbsNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Abs, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const SignNode = class SignNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Sign, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const NegateNode = class NegateNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Negate, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const InvertNode = class InvertNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Invert, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const RoundNode = class RoundNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Round, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const FWidthNode = class FWidthNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.FWidth, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};
export const TruncNode = class TruncNode extends GLSL1ParamOperatorNode {
  constructor(e) {
    super(GLSLOperatorEnum.Trunc, e);
  }

  get value() {
    return this.getA();
  }

  set value(e) {
    this.setA(e);
  }

};