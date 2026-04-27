import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import ErrorBoundary from "./ErrorBoundary";

function Laptop() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.4;
    ref.current.rotation.x = -0.15 + Math.sin(t * 0.6) * 0.05;
  });
  return (
    <group ref={ref} position={[0, -0.2, 0]}>
      <mesh position={[0, -0.05, 0.2]} castShadow>
        <boxGeometry args={[3.2, 0.12, 2.1]} />
        <meshStandardMaterial color="#0b1020" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.015, 0.2]}>
        <boxGeometry args={[3.0, 0.005, 1.9]} />
        <meshStandardMaterial color="#11172e" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.025, 0.75]}>
        <boxGeometry args={[1.2, 0.005, 0.7]} />
        <meshStandardMaterial color="#1a2244" metalness={0.5} roughness={0.4} />
      </mesh>
      <group position={[0, 0, -0.85]} rotation={[-1.65, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 2.0, 0.08]} />
          <meshStandardMaterial color="#0b1020" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[3.0, 1.85]} />
          <meshStandardMaterial color="#0047FF" emissive="#2F66FF" emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function OrbitingBlob({ position, color, scale }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial color={color} distort={0.45} speed={2} roughness={0.2} metalness={0.6} />
      </mesh>
    </Float>
  );
}

function OrbitingKnot({ position, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.5;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={0.5}>
        <torusKnotGeometry args={[0.7, 0.22, 128, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <ErrorBoundary fallback={<div className="w-full h-full grid place-items-center text-[var(--muted)] mono text-xs">3D_SCENE_OFFLINE</div>}>
    <Canvas
      camera={{ position: [0, 0.6, 5.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#2F66FF" />
      <pointLight position={[0, 1, 2]} intensity={0.6} color="#ffffff" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
          <Laptop />
        </Float>
        <OrbitingBlob position={[2.6, 1.4, -1.2]} color="#0047FF" scale={0.55} />
        <OrbitingKnot position={[-2.7, -1.1, -1]} color="#050712" />
        <OrbitingBlob position={[0, -2.2, -2]} color="#2F66FF" scale={0.35} />
        <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={8} blur={2.6} far={4} />
      </Suspense>
    </Canvas>
    </ErrorBoundary>
  );
}
