import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface Props {
  text: string;
  radius: number;
  height: number;
  segments: number;
}

export default function Ring({ text, radius, height, segments }: Props) {
  const ref = useRef<any>();

  // Rotation du texte
  useFrame(() => {
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.z += 0.01;
  });

  // Calcul des positions pour le texte
  const textPositions: { x: number; z: number }[] = [];
  const angleStep = (2 * Math.PI) / text.length;
  for (let i = 0; i < text.length; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    textPositions.push({ x, z });
  }

  return (
    <group ref={ref}>
      {/* Cylindre */}
      <mesh>
        <cylinderGeometry args={[radius, radius, height, segments]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
        />
      </mesh>

      {/* Texte */}
      {text.split("").map((char: string, index: number) => (
        <Text
          key={index}
          position={[textPositions[index].x, 0, textPositions[index].z]}
          rotation={[0, -angleStep * index + Math.PI / 2, 0]}
          fontSize={0.3}
          lineHeight={1}
          letterSpacing={0.02}
          color="white"
          textAlign="center"
        >
          {char}
        </Text>
      ))}
    </group>
  );
}
