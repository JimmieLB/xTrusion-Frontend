import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect} from 'react'
import { Box3, Vector3 } from 'three'
function CustomMesh(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state

  useEffect(()=> {
    if (props.geo) {
      meshRef.current.geometry=props.geo
      const boundingBox = new Box3().setFromObject(meshRef.current);
      const size = new Vector3();
      boundingBox.getSize(size);
      
      const width = size.x;
      meshRef.current.rotation.z = Math.PI
      meshRef.current.position.x = 0;
      meshRef.current.position.y = 0; 
      meshRef.current.position.z = 0;

      meshRef.current.rotation.z = Math.PI;
      
      meshRef.current.position.x = size.x/2;
      meshRef.current.position.y = size.y/2;
      meshRef.current.position.z = -200;

      props.updateCamera(new Vector3(0,0,meshRef.current.position.z));
    }
  },[props.geo])
  return (
    <mesh
      {...props}
      ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      {/* <sphereGeometry args={[0,0,0]} /> */}
      <meshNormalMaterial/>
    </mesh>
  )
}


export default CustomMesh;