"use client";

import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text, Sphere, Torus } from "@react-three/drei";
import { Skill } from "@/app/skills/page";

interface TechNodeProps {
  skill: Skill;
  position: [number, number, number];
  onClick: (skill: Skill) => void;
  active: boolean;
  setHovered: (name: string | null) => void;
}

export function TechNode({
  skill,
  position,
  onClick,
  active,
  setHovered,
}: TechNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const moonSystemRef = useRef<THREE.Group>(null);
  const [hovered, setHoveredState] = useState(false);

  // Generate simplified planet characteristics
  const planetFeatures = useMemo(() => {
    // Use name as seed for consistent randomness
    const nameSeed = skill.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Planet size variation
    const size = 0.5 + (nameSeed % 12) / 10; // Size from 0.5 to 1.7

    // Planet types
    const planetTypes = ["rocky", "gasGiant", "iceGiant", "desert", "oceanic"];
    const typeIndex = (nameSeed + skill.name.length) % planetTypes.length;
    const planetType = planetTypes[typeIndex];

    // Ring characteristics - simplified
    const hasRings = nameSeed % 4 < 1; // Reduce to 25% chance of having rings
    const ringCount = hasRings ? 1 + (nameSeed % 3) : 0; // 1-3 rings if present
    const ringSize = 1.3 + (nameSeed % 10) / 10; // More variation in ring size
    const ringThickness = 0.03 + (nameSeed % 15) / 100; // More variation in thickness

    // Simple rotation speed
    const rotationSpeed = 0.0005 + (nameSeed % 10) / 50000;

    // Moon system - simplified but varied
    const moonCount = Math.min(1 + (nameSeed % 9), 9); // 1-9 moons

    // Moon size decreases as count increases
    const moonSize = 0.1 * (1 - (moonCount - 1) / 10);

    // Colors based on planet type
    let baseColor = new THREE.Color(skill.color);

    // Adjust color based on planet type
    switch (planetType) {
      case "gasGiant":
        // Keep original color
        break;
      case "iceGiant":
        // More blue-tinted
        baseColor = new THREE.Color(skill.color).offsetHSL(0.1, -0.1, 0.1);
        break;
      case "desert":
        // More orange/tan
        baseColor = new THREE.Color(skill.color).offsetHSL(0.05, 0.2, 0.1);
        break;
      case "oceanic":
        // More blue/green
        baseColor = new THREE.Color(skill.color).offsetHSL(0.2, 0, 0);
        break;
      default: // rocky
        baseColor = new THREE.Color(skill.color).offsetHSL(0, -0.1, -0.1);
    }

    // Ring colors
    const ringColor = new THREE.Color(skill.color).offsetHSL(0.1, 0, 0.2);
    const secondRingColor = new THREE.Color(skill.color).offsetHSL(
      -0.1,
      0,
      -0.1
    );

    return {
      size,
      planetType,
      hasRings,
      ringCount,
      ringSize,
      ringThickness,
      rotationSpeed,
      moonCount,
      moonSize,
      baseColor,
      ringColor,
      secondRingColor,
    };
  }, [skill.name, skill.color]);

  // Setup the animation
  useFrame((state) => {
    if (nodeRef.current && planetRef.current) {
      // Keep the node at the specified position
      nodeRef.current.position.set(position[0], position[1], position[2]);

      // Gentle floating animation
      planetRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.2 + position[0]) * 0.05;

      // Planet rotation
      planetRef.current.rotation.y += planetFeatures.rotationSpeed;

      // Ring rotation if present
      if (ringsRef.current) {
        ringsRef.current.rotation.z += planetFeatures.rotationSpeed * 0.2;
      }

      // Moon orbit system rotation
      if (moonSystemRef.current) {
        moonSystemRef.current.rotation.y += planetFeatures.rotationSpeed * 0.5;
      }

      // Scale effect when hovered or active
      const scale = active ? 1.2 : hovered ? 1.1 : 1;
      planetRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      if (ringsRef.current) {
        ringsRef.current.scale.lerp(
          new THREE.Vector3(scale, scale, scale),
          0.1
        );
      }
    }
  });

  // Generate moons with proper spacing
  const Moons = useMemo(() => {
    const moons = [];
    for (let i = 0; i < planetFeatures.moonCount; i++) {
      const seed = i * 23;

      // Space between moons increases with moon count
      const spacingFactor = 0.3 + (planetFeatures.moonCount - 1) * 0.05;

      // Base distance from planet increases with moon count
      const baseDistance =
        planetFeatures.size * (1.8 + planetFeatures.moonCount * 0.1);
      const distance = baseDistance + i * planetFeatures.size * spacingFactor;

      // Varied orbit angles
      const angle = (seed % 360) * (Math.PI / 180);

      // Moon color - slightly different from planet
      const moonColor = new THREE.Color(planetFeatures.baseColor).offsetHSL(
        0,
        -0.2,
        -0.1
      );

      moons.push({
        size: planetFeatures.moonSize,
        distance,
        angle,
        index: i,
        color: moonColor,
      });
    }

    return moons;
  }, [planetFeatures]);

  return (
    <group
      ref={nodeRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick(skill);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredState(true);
        setHovered(skill.name);
      }}
      onPointerOut={() => {
        setHoveredState(false);
        setHovered(null);
      }}
    >
      {/* Planet with core characteristics */}
      <group ref={planetRef}>
        {/* Base planet sphere */}
        <Sphere args={[planetFeatures.size, 32, 32]}>
          <meshStandardMaterial
            color={planetFeatures.baseColor}
            metalness={planetFeatures.planetType === "gasGiant" ? 0.1 : 0.3}
            roughness={planetFeatures.planetType === "gasGiant" ? 0.7 : 0.5}
          />
        </Sphere>

        {/* First letter on planet surface */}
        <Text
          position={[0, 0, planetFeatures.size * 1.01]}
          fontSize={planetFeatures.size * 0.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name.charAt(0).toUpperCase()}
        </Text>

        {/* Rings */}
        {planetFeatures.hasRings && (
          <group
            ref={ringsRef}
            rotation={[Math.PI / 3, 0, 0]} // Tilted rings
          >
            {/* Create multiple rings if needed */}
            {[...Array(planetFeatures.ringCount)].map((_, i) => {
              const ringOffset = i * 0.15;
              const opacity = 0.7 - i * 0.15;
              const color =
                i === 0
                  ? planetFeatures.ringColor
                  : planetFeatures.secondRingColor;

              return (
                <Torus
                  key={i}
                  args={[
                    planetFeatures.size *
                      (planetFeatures.ringSize + ringOffset),
                    planetFeatures.ringThickness * (1 - i * 0.2),
                    2,
                    32,
                  ]}
                  rotation={[i * 0.1, 0, 0]}
                >
                  <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    side={THREE.DoubleSide}
                  />
                </Torus>
              );
            })}
          </group>
        )}

        {/* Moon system */}
        <group ref={moonSystemRef}>
          {Moons.map((moon) => (
            <group key={moon.index} rotation={[0, moon.angle, 0]}>
              <mesh position={[moon.distance, 0, 0]}>
                <sphereGeometry args={[moon.size, 16, 16]} />
                <meshStandardMaterial color={moon.color} roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      <Text
        position={[0, -1.5 - (planetFeatures.size - 1) * 0.5, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
    </group>
  );
}
