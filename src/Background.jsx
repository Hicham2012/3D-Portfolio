import backgroundVertexShader from './shaders/vertex.glsl'
import backgroundFragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Background()
{
  const backgroundMaterialRef = useRef()
  const BackgoundMaterial = shaderMaterial(
    {
      uTime: 0,
      uColorStart: new THREE.Color('#22FF38'),
      uColorEnd: new THREE.Color('#0C0D0D')
    },
    backgroundVertexShader,
    backgroundFragmentShader
  )
  extend({ BackgoundMaterial })

  useFrame((state, delta) =>
  {
    backgroundMaterialRef.current.uTime += delta
  })

  return <mesh
    position={[ 0, 0, -15 ]}
    scale={50}
  >
    <planeGeometry />
    {/* <meshBasicMaterial color={'#0C0D0D'} /> */}
    <backgoundMaterial
      ref={ backgroundMaterialRef }
    />
  </mesh>
}