import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function PropellerHat() {
  const { scene } = useGLTF("../public/propeller_hat-v2/propeller_hat.gltf");
  return <primitive object={scene} scale={0.5} />;
}

const canvasStyle = {
  display: "block",
  margin: "0 auto",
  height: "80vh",
  width: "100%",
  maxHeight: "100%",
  objectFit: "contain",
};


export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PropellerHat />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
