import { useRouter } from 'next/router';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { useRef } from 'react';

function Box() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  );
}

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="w-screen h-screen relative">
      <Canvas style={{ background: 'black' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-6">Welcome</h1>
          <p className="text-white text-lg mb-8">Login to proceed</p>
          <div className="flex justify-center">
            <button
              className="bg-white text-sky-500 hover:bg-sky-600 text-lg font-medium py-3 px-6 rounded-md mr-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
