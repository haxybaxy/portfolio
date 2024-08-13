import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function PropellerHat() {
  const group = useRef();
  const { nodes } = useGLTF("../public/propeller_hat-v2/propeller_hat.gltf");
  // console.log(nodes); // Uncomment to see the structure of the nodes object, seperated out in blender

  const hat = nodes.Hat__0;
  const propeller = nodes.Propeller__0;

  // Spin the propeller
  useFrame(() => {
    propeller.rotation.y += 0.1; // Adjust the speed and axis as needed
  });

  return (
    <group ref={group} scale={0.5}>
      <primitive object={hat} />
      <primitive object={propeller} position={[0, 14, 0]}/>
    </group>
  );
}

const canvasStyle = { // Move styles out into a separate file later
  display: "block",
  margin: "0 auto",
  height: "80vh",
  width: "100%",
  maxHeight: "100%",
  objectFit: "contain",
};

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default function App() { //Always add ambient light to the scene
  return (
    <div style={containerStyle}>
      <Canvas style={canvasStyle}>
        <Suspense fallback={null}>
          <PropellerHat />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
