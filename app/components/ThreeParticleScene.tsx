"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// Tarn Taran, Punjab coordinates (radians)
const PUNJAB_LAT = 31.4519 * (Math.PI / 180);
const PUNJAB_LON = 74.9218 * (Math.PI / 180);
const GLOBE_RADIUS = 2.3;

const count = 1800;

// Generate delicate points on sphere shell (static configuration to satisfy react render context purity)
const [positions, colors] = (() => {
  const arr = new Float32Array(count * 3);
  const cols = new Float32Array(count * 3);
  
  const colorZinc = new THREE.Color("#71717a"); // Zinc 400
  const colorDim = new THREE.Color("#27272a");  // Zinc 800

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = GLOBE_RADIUS;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;

    // Add variety in particle brightness
    const c = Math.random() > 0.35 ? colorZinc : colorDim;
    cols[i * 3] = c.r;
    cols[i * 3 + 1] = c.g;
    cols[i * 3 + 2] = c.b;
  }
  return [arr, cols];
})();

function PremiumGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tarn Taran Punjab coordinate beacon position
  const beaconPos = useMemo(() => {
    const r = GLOBE_RADIUS;
    const x = r * Math.cos(PUNJAB_LAT) * Math.cos(PUNJAB_LON);
    const y = r * Math.sin(PUNJAB_LAT);
    const z = r * Math.cos(PUNJAB_LAT) * Math.sin(PUNJAB_LON);
    return new THREE.Vector3(x, y, z);
  }, []);

  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    const progress = Math.min(Math.max(scrollY / 600, 0), 1);
    const time = state.clock.getElapsedTime();

    const autoRotY = time * 0.06;
    const autoRotX = time * 0.02;

    const targetRotY = -PUNJAB_LON - Math.PI / 2;
    const targetRotX = -PUNJAB_LAT;

    // Smooth transition from free spin to targeting Punjab beacon
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      autoRotY + mouse.x * 0.15,
      targetRotY,
      progress
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      autoRotX + mouse.y * 0.15,
      targetRotX,
      progress
    );

    // Zoom scale factor
    const scale = THREE.MathUtils.lerp(1.0, 15.0, progress);
    groupRef.current.scale.setScalar(scale);

    // Shift group Z position so Punjab passes through camera (z = 4.8)
    const targetZ = 4.8 - scale * GLOBE_RADIUS;
    groupRef.current.position.z = THREE.MathUtils.lerp(0.0, targetZ, progress);

    // Beacon pulsing animation
    if (beaconRef.current) {
      const pulse = 1.0 + Math.sin(time * 8) * 0.2;
      beaconRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const progress = Math.min(Math.max(scrollY / 600, 0), 1);
  const opacity = Math.max(1.0 - progress * 1.4, 0.0);

  return (
    <group ref={groupRef}>
      {/* 1. Muted Sphere Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          sizeAttenuation={true}
          vertexColors
          transparent
          opacity={opacity * 0.7}
        />
      </points>

      {/* 2. Delicate latitude / longitude rings */}
      {[0, Math.PI / 4, -Math.PI / 4].map((angle, idx) => (
        <group key={idx} rotation={[angle, 0, 0]}>
          <mesh>
            <torusGeometry args={[GLOBE_RADIUS, 0.003, 8, 64]} />
            <meshBasicMaterial
              color="#52525b"
              transparent
              opacity={opacity * 0.1}
            />
          </mesh>
        </group>
      ))}

      {/* 3. Subtle pulsing coordinate target beacon */}
      <group position={beaconPos}>
        <mesh ref={beaconRef}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={opacity} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.13, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            side={THREE.DoubleSide}
            transparent
            opacity={opacity * 0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function ThreeParticleScene() {
  return (
    <div className="w-full h-full min-h-[380px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 4.8], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <PremiumGlobe />
        <Stars
          radius={80}
          depth={40}
          count={100} // Muted background stars
          factor={2}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}
