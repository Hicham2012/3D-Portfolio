import {  Environment, Html, PresentationControls, Sparkles, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Background from './Background';

export default function Experience()
{
    const [ width, setWidth ] = useState()
    const [ isOpen, setIsOpen ] = useState(false)
    const HtmlRef = useRef()

    const macbook = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    const camera = useThree((state) => state.camera)
    // macbook.scene.rotation.set(0, 3, 0)
    // macbook initial setup
    let x, b, c;
    macbook.scene.children.forEach((mesh) =>
    {
        const Top = mesh.children[15]
        const Bottom = mesh.children[7]
        const FrontCameraRing = mesh.children[8]
        const Keyboard = mesh.children[9]
        const Side = mesh.children[0]
        const Backend = mesh.children[12]

        // FrontCameraRing.position.set(-0.15479595959186554, 19.57140350341797, -16.150962829589844)
        FrontCameraRing.position.set(-0.15479595959186554, -0.27140350341797, 9.550962829589844)

        // screenHing.position.set(1, 2, 1)
        Top.rotation.set(3.14, 0, 0)
        // Top.rotation.set(1.3105023838474816, 0, 0)
        x = Top.rotation;
        b = Top.children[4].geometry
        c = Top.children[4].material

        Top.children[5].material.color.set('#22FF38')
        Top.children[0].material.color.set('#0C0D0D')
        Top.children[3].material.color.set('#0C0D0D')

        Bottom.children[0].material.color.set('#0C0D0D')
        Bottom.children[1].material.color.set('#0C0D0D')

        Keyboard.children[0].material.color.set('#0C0D0D')
        Keyboard.children[1].material.color.set('#22FF38')
        Keyboard.children[2].material.color.set('#0C0D0D')

        Side.material.color.set('#0C0D0D')

        Backend.children[0].material.color.set('#0C0D0D')
        Backend.children[1].material.color.set('#0C0D0D')

        // Top.ration
        // setIsOpen(Top.rotation.x)
        return x, b, c
    })

    // animation timeline
    let animation = gsap.timeline()

    // Open the macbook
    function open()
    {
        if (!isOpen)
        {
            setIsOpen(true)
            animation.to(macbook.scene.rotation, {x: 0, y: Math.PI * 2, z: 0, duration: 2, ease: 'power1.inOut'})
            animation.to(x, {x: 1.3105023838474816, y: 0, z: 0, duration: 3, ease: 'power3.inOut'}, 1)
            animation.to('.htmlScreen iframe', {visibility: 'visible'})
            animation.to(camera.position, {x: 0, y: 1.7, z: 1.2, duration: 2, ease: 'power3.inOut'}, "+=1")
            animation.to(camera.rotation, {x: 0.02, y: 0, z: 0, duration: 2, ease: 'power3.inOut'}, "-=2")
        }
    }

    useLayoutEffect(() =>
    {
        if (HtmlRef.current)
        const ctx = gsap.context(() =>
            {
                const hideAnimation = gsap.to('.htmlScreen iframe', {visibility: 'hidden'})   
            })

        return () =>
            {
                ctx.revert()
            }
    }, [])

    // Display websites depending on
    // the window's width size
    useEffect(() =>
    {
        window.addEventListener('resize', () =>
        {
            setWidth(window.innerWidth)
        })


        if(window.innerWidth < 800)
            window.location.replace('https://hicham-zaadla.vercel.app/');
    }, [width])

    return <>
        <Background />
        <Environment preset='city' blur={1} />
        <Sparkles
            size={7}
            scale={[ 9, 8, 4 ]}
            noise={2}
            color={'#22FF38'}
            speed={0.5}
            count={50}
        />
        <PresentationControls
            rotation={[0.13, 0, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.2, 0.2]}
            config={{mass: 2, tension: 400}}
        >
            {!isOpen && <Html
                wrapperClass='tap'
                position={[0, 0.7, 0]}
            >
                Tap
            </Html>}
                <rectAreaLight
                    width={2.5}
                    height={1.55}
                    intensity={70}
                    color={'#0C0D0D'}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />
                <primitive
                    object={macbook.scene}
                    position-y={-0.39}
                    scale={1.25}
                    onClick={open}
                    onMouseOut={() => console.log('entered')}
                />
                <Html
                    ref={HtmlRef}
                    transform
                    wrapperClass='htmlScreen'
                    distanceFactor={1.17}
                    position={[0, 1.54, -1.85]}
                    rotation-x={-0.255}
                >
                    <iframe
                        src='https://hicham-zaadla.vercel.app/'
                    />
                </Html>
        </PresentationControls>
    </>
}
