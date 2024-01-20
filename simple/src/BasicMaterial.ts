import vertex from "./shaders/basic.vertex.glsl"
import fragment from "./shaders/basic.fragment.glsl"
export const data = {
  'version': 1,
  'uniforms': [{
    'name': '_normalMatrix',
    'type': 'mat3',
    'value': { 'elements': [1, 0, 0, 0, 1, 0, 0, 0, 1] }
  }, {
    'name': '_viewMatrix',
    'type': 'mat4',
    'value': { 'elements': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
  }, {
    'name': '_worldToObjMatrix',
    'type': 'mat4',
    'value': { 'elements': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
  }, { 'name': '_viewDir', 'type': 'vec3', 'value': { 'x': 0, 'y': 0, 'z': 0 } }, {
    'name': 'nodeUniform0',
    'type': 'texture',
    'value': 'assets/c1c71e6e-ef6c-4e33-a65e-4da38f9500a5.png'
  }, { 'name': '_time', 'type': 'float', 'value': 0 }, {
    'name': '_time2',
    'type': 'float',
    'value': 0
  }, { 'name': '_time3', 'type': 'float', 'value': 0 }, {
    'name': '_time4',
    'type': 'float',
    'value': 0
  }, {
    'name': 'nodeUniform1',
    'type': 'texture',
    'value': 'assets/3336bb7c-8d27-4f4c-a7e9-ab196df0cdf4.png'
  }, {
    'name': 'nodeUniform2',
    'type': 'texture',
    'value': 'assets/9f864ed3-ae8a-4995-9f33-38c6943ff4ab.jpeg'
  }, { 'name': 'clearcoatVar', 'type': 'float', 'value': 2 }, {
    'name': 'clearcoatRoughVar',
    'type': 'float',
    'value': 0.3
  }, { 'name': 'transmissionCoeff', 'type': 'float', 'value': 1.3 }, {
    'name': 'transmissionMode',
    'type': 'int',
    'value': '0'
  }],
  vertex,
  fragment,

  'cullMode': 'back',
  'lightModel': 'physical',
  'renderType': 'transparent'
};