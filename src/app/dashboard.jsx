import CustomMesh from "../components/customMesh";
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { useState, useRef } from "react";
import * as THREE from 'three';

const GENERATOR_URL = import.meta.env.VITE_GENERATOR_URL

function DashBoard() {

    const [image, setImage] = useState(null);
    const [imageType, setImageType] = useState('jpeg');
    const [mesh, setMesh] = useState(null);

    function handleImageChange(event) {
        let file = event.target.files[0];
        if (file) {
            setImage(file)
            setImageType(file.type)
        }
    }

    function handleClick(event) {

        const formData = new FormData()
        formData.append("image", image)
        let requestOptions = {
            method: "POST",
            body: formData
        }

        console.log(image)
        console.log(imageType)

        fetch("http://127.0.0.1:5000/meshtest", requestOptions)
            .then((response) => {
                return response.text()
            })
            .then((response) => {
                response = JSON.parse(response)
                console.log(response)
                let faces = response['faces'].flat()
                let vertices = new Float32Array(response['vertices'].flat())

                


                const geometry = new THREE.BufferGeometry();
                geometry.setIndex(faces);
                geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
                
                geometry.computeVertexNormals();
                setMesh(geometry)
            }).catch((e) => {
                console.error(e)
            })
    }

    return ( 
    <>
        <div className='w-screen h-screen max-w-full max-h-full overflow-hidden'>

            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <CustomMesh geo={mesh}/>
                {/* <Stats/> */}
                <OrbitControls/>
            </Canvas>
        </div>
            <div className="fixed top-32 left-8">
                <input className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-5 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700" type='file' accept='image/jpeg image/png'
                onChange={handleImageChange}></input>
                <button className="mr-5 py-1 px-3 border-[1px] text-xs font-medium bg-stone-5 text-stone-700 hover:cursor-pointer hover:bg-blue-50 hover:text-blue-700"
                    onClick={handleClick}
                >Generate</button>
            </div>
    </>
    );
}

export default DashBoard;