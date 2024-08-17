import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "../styles/propellerhat.css";

function PropellerHat() {
  const group = useRef();
  const { nodes } = useGLTF("../../public/propeller_hat-v3/propellerhat.gltf");
  console.log(nodes); // Uncomment to see the structure of the nodes object, seperated out in blender

  const hat = nodes.Hat__0;
  const propeller = nodes.Propeller__0;
  const sphere = nodes.Sphere;

  // Spin the propeller
  useFrame(() => {
    propeller.rotation.y += 0.1; // Adjust the speed and axis as needed
  });

  return (
    <group ref={group} scale={0.7}>
      <primitive object={hat} rotation={[0, 0.523599, 0]} />
      <primitive object={propeller} position={[0, 14, 0]}/>
      <primitive object={sphere}  scale={[11, 11, 11]} rotation={[0.7,0.523599,-0.4]}/>
    </group>
  );
}


export default function PropellerHatModel() {

  const handleMouseEnter = () => {
    const spinMeText = document.querySelector(".spinMe");
    if (spinMeText) {
      spinMeText.classList.add("visible");
    }
  };

  const handleMouseLeave = () => {
    const spinMeText = document.querySelector(".spinMe");
    if (spinMeText) {
      spinMeText.classList.remove("visible");
    }
  };

  return (
    <div className="propellerHat">
    <div className="containerStyle">
      <Canvas
      className="canvasStyle"
      camera={{ position: [2, 10, 20] }} // Camera position
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <Suspense fallback={null}>
          <PropellerHat />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
    <p className="spinMe">&#x293B; Spin Me!</p>
    </div>
  );
}
