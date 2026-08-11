/* eslint-disable react/no-unknown-property */
import { Suspense, useCallback, useRef, useState } from "react";
import type { Group } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "../styles/propellerhat.css";

function PropellerHat({ onFirstFrame }: { onFirstFrame: () => void }) {
  const group = useRef<Group>(null);
  const drawn = useRef(false);
  const { nodes } = useGLTF("/propellerhat/propellerhat.glb");
  // console.log(nodes); // Uncomment to see the structure of the nodes object, seperated out in blender

  const hat = nodes.Hat__0;
  const propeller = nodes.Propeller__0;
  const sphere = nodes.Sphere;

  // Spin the propeller
  useFrame(() => {
    propeller.rotation.y += 0.1; // Adjust the speed and axis as needed
    if (!drawn.current) {
      drawn.current = true;
      onFirstFrame();
    }
  });

  return (
    <group ref={group} scale={0.7}>
      <primitive object={hat} rotation={[0, 0.523599, 0]} />
      <primitive object={propeller} position={[0, 14, 0]}/>
      <primitive object={sphere}  scale={[11, 11, 11]} rotation={[0.7,0.523599,-0.4]}/>
    </group>
  );
}


interface PropellerHatModelProps {
  /* The canvas stays mounted while the blog is open — it is what gives the window a
     stable natural height to grow from — so stop its render loop instead. Unmounting
     would mean a fresh WebGL context and shader compile on every return home. */
  paused?: boolean;
}

export default function PropellerHatModel({ paused = false }: PropellerHatModelProps) {
  /* Pausing is only honoured once the scene has actually drawn once. Landing straight
     on /blog would otherwise create the canvas paused, so it never compiles its shaders
     or uploads the model — and that ~400ms of first-render work then lands on the click
     that closes the blog, holding the window still before it starts collapsing. Warming
     up costs the same work at load time instead, when nothing is animating. */
  const [drawnOnce, setDrawnOnce] = useState(false);
  const handleFirstFrame = useCallback(() => setDrawnOnce(true), []);

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
      frameloop={paused && drawnOnce ? 'never' : 'always'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
        <Suspense fallback={null}>
          <PropellerHat onFirstFrame={handleFirstFrame} />
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
