import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { Box, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import * as NODES from 'three/examples/jsm/nodes/Nodes.js'

extend(NODES)

export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls />
        <Thing />
        <Environment preset="warehouse" background />
      </Suspense>
    </Canvas>
  )
}

function Thing() {
  const ref = useRef()
  const material = useRef()
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  const { scene } = useThree()
  const textureNode = useMemo(() => {
    return new NODES.TextureNode()
  }, [])
  useLayoutEffect(() => {
    textureNode.value = scene.environment
  }, [scene.environment])
  return (
    <Box ref={ref}>
      <meshStandardNodeMaterial ref={material} roughness={0.2}>
        <noise3DNode attach="color">
          <floatNode value={0.5} attach="pivot" />
          <floatNode value={0.5} attach="amplitude" />
        </noise3DNode>
        <textureCubeNode args={[textureNode]} attach="envMap" />
      </meshStandardNodeMaterial>
    </Box>
  )
}
