import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import { NodeToyMaterial, NodeToyTick } from './ReactNodeToy'
import fragment from "./shaders/test.fragment.glsl"
import vertex from "./shaders/test.vertex.glsl"
import { Global, Loading, Page, DemoPanel, Dot, Error, Title, DotContent } from './styles'
import React, { useRef } from 'react';
import * as NODES from 'three/examples/jsm/nodes/Nodes.js'

extend(NODES)

// import { data } from './shaderData.ts';
export const data = {
  "version": 1,
  "uniforms": [],
  vertex,
fragment,
  "cullMode": "back",
  "lightModel": "unlit",
  "renderType": "opaque"
};
export default function App() {
  const material = useRef()
  return (
    <>
      <Global />

      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardNodeMaterial ref={material} roughness={0.2}>
          <noise3DNode attach="color">
            <floatNode value={0.5} attach="pivot" />
            <floatNode value={0.5} attach="amplitude" />
          </noise3DNode>
        </meshStandardNodeMaterial>

      </mesh>
      <NodeToyTick />
      <OrbitControls />
    </Canvas>
    </>
  )
}
