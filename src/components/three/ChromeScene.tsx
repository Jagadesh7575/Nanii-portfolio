import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ChromeSceneProps {
  className?: string;
}

export const ChromeScene: React.FC<ChromeSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting for Realistic Chrome Reflection
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 5, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa5b4fc, 1.2);
    dirLight2.position.set(-5, -3, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 3, 20);
    pointLight.position.set(2, 2, 5);
    scene.add(pointLight);

    // Chrome Material
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.96,
      roughness: 0.15,
    });

    const brushedRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcdfe4,
      metalness: 0.88,
      roughness: 0.28,
    });

    // Orbital Rings Group
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // Primary Chrome Orbital Ring
    const torusGeo1 = new THREE.TorusGeometry(3.6, 0.14, 32, 100);
    const ring1 = new THREE.Mesh(torusGeo1, brushedRingMaterial);
    ring1.rotation.x = Math.PI * 0.38;
    ring1.rotation.y = Math.PI * 0.15;
    orbitalGroup.add(ring1);

    // Secondary Chrome Orbital Ring
    const torusGeo2 = new THREE.TorusGeometry(4.4, 0.08, 24, 100);
    const ring2 = new THREE.Mesh(torusGeo2, brushedRingMaterial);
    ring2.rotation.x = Math.PI * 0.42;
    ring2.rotation.y = -Math.PI * 0.22;
    orbitalGroup.add(ring2);

    // Floating Chrome Spheres matching reference
    const sphereData = [
      { radius: 0.65, pos: [2.8, 1.8, 1.5], speed: 0.001 },
      { radius: 0.42, pos: [-2.2, 2.1, 0.8], speed: 0.0012 },
      { radius: 0.32, pos: [-1.4, -1.8, 1.2], speed: 0.0015 },
      { radius: 0.22, pos: [3.4, -1.2, 0.5], speed: 0.002 },
      { radius: 0.18, pos: [0.8, 3.2, -0.5], speed: 0.001 },
    ];

    const spheres: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number }[] = [];

    sphereData.forEach((data) => {
      const geo = new THREE.SphereGeometry(data.radius, 32, 32);
      const mesh = new THREE.Mesh(geo, chromeMaterial);
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      scene.add(mesh);
      spheres.push({
        mesh,
        basePos: mesh.position.clone(),
        speed: data.speed,
      });
    });

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = x * 0.2;
      targetRotX = y * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth rotation towards target
        orbitalGroup.rotation.y += (targetRotY - orbitalGroup.rotation.y) * 0.05 + 0.0008;
        orbitalGroup.rotation.x += (targetRotX - orbitalGroup.rotation.x) * 0.05;

        // Subtle ambient floating motion for spheres
        spheres.forEach((s, idx) => {
          s.mesh.position.y = s.basePos.y + Math.sin(elapsedTime * 1.5 + idx * 1.2) * 0.15;
          s.mesh.position.x = s.basePos.x + Math.cos(elapsedTime * 1.1 + idx * 0.8) * 0.08;
        });
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      torusGeo1.dispose();
      torusGeo2.dispose();
      chromeMaterial.dispose();
      brushedRingMaterial.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 pointer-events-none z-0 ${className}`} aria-hidden="true" />;
};
