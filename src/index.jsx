import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render(
    <>
    <Canvas
        flat
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            // position: [ 0, 2, 1 ],
            // rotation: [-0.1, 0, 0]
            position: [0, 1, 7]
        } }
    >
        <Suspense fullback={null}>
        <Experience />
        </Suspense>
    </Canvas>
    <Loader />
    </>
)