"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TechNode } from "./TechNode";
import { Skill } from "@/app/skills/page";

interface SceneProps {
  skills: Skill[];
  onNodeClick: (skill: Skill) => void;
  activeSkill: Skill | null;
}

interface PointsProps {
  count?: number;
}

function Points({ count = 1000 }: PointsProps) {
  const points = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
      points.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          args={[particlesPosition, 3]}
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export function Scene({ skills, onNodeClick, activeSkill }: SceneProps) {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hovered, setHovered] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const positions = useRef<[number, number, number][]>([]);

  useEffect(() => {
    const radius = 6;
    const layers = Math.ceil(skills.length / 8);
    const newPositions: [number, number, number][] = [];

    skills.forEach((skill, i) => {
      const layerIdx = Math.floor(i / 8);
      const itemsInLayer = Math.min(8, skills.length - layerIdx * 8);
      const angleInLayer = (i % 8) * ((Math.PI * 2) / itemsInLayer);

      const layerRadius = radius - layerIdx * 1.5;
      const layerHeight = layerIdx * 2 - layers + 1;

      newPositions.push([
        layerRadius * Math.sin(angleInLayer),
        layerHeight,
        layerRadius * Math.cos(angleInLayer),
      ]);
    });

    positions.current = newPositions;
  }, [skills]);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.autoRotate = !activeSkill;

    if (activeSkill) {
      const index = skills.findIndex((s) => s.name === activeSkill.name);
      if (index !== -1) {
        const pos = positions.current[index];

        const startPosition = camera.position.clone();
        const targetPosition = new THREE.Vector3(
          pos[0] * 1.5,
          pos[1] * 1.5 + 0.5,
          pos[2] * 1.5
        );

        const startTime = Date.now();
        const duration = 800; // ms

        function animateCamera() {
          const elapsed = Date.now() - startTime;
          if (elapsed < duration) {
            const progress = elapsed / duration;
            const t = 1 - Math.pow(1 - progress, 3);

            camera.position.lerpVectors(startPosition, targetPosition, t);
            requestAnimationFrame(animateCamera);
          }
        }

        animateCamera();
      }
    }
  }, [activeSkill, camera, skills]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#6495ED" />

      <hemisphereLight
        args={["#b1e1ff", "#102030", 0.6]}
        position={[0, 50, 0]}
      />

      <Points count={600} />

      {skills.map((skill, i) => (
        <TechNode
          key={skill.name}
          skill={skill}
          position={positions.current[i] || [0, 0, 0]}
          onClick={onNodeClick}
          active={activeSkill?.name === skill.name}
          setHovered={setHovered}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4}
        maxDistance={20}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.7}
        autoRotate={!activeSkill}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  );
}
