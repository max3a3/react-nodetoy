import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { NodeToyMaterial, NodeToyTick } from './ReactNodeToy'
import fragment from "./shaders/test.fragment.glsl"
import vertex from "./shaders/test.vertex.glsl"
import { Global, Loading, Page, DemoPanel, Dot, Error, Title, DotContent } from './styles'
import React from 'react';

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
  return (
    <>
      <Global />

      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <NodeToyMaterial data={data} />
      </mesh>
      <NodeToyTick />
      <OrbitControls />
    </Canvas>
    </>
  )
}
