'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function AmbientBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F9F6F0');

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xE8B960, 1);
    dirLight.position.set(1, 2, 3);
    scene.add(dirLight);
    const backLight = new THREE.PointLight(0xC88A5D, 0.6);
    backLight.position.set(-3, -1, -2);
    scene.add(backLight);

    // Particles
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i*3] = (Math.random() - 0.5) * 20;
      positions[i*3+1] = (Math.random() - 0.5) * 20;
      positions[i*3+2] = (Math.random() - 0.5) * 15;
      colors[i*3] = 0xE8 / 255;
      colors[i*3+1] = 0xB9 / 255;
      colors[i*3+2] = 0x60 / 255;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      ));
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    (particles as any).userData.velocities = velocities;

    // Mouse tracking
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let frame: number;
    const animate = () => {
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;
      const vels = (particles as any).userData.velocities as THREE.Vector3[];
      const target = new THREE.Vector3(mouse.x * 8, mouse.y * 6, 0);

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const p = new THREE.Vector3(posArray[idx], posArray[idx+1], posArray[idx+2]);
        const v = vels[i];

        const dir = target.clone().sub(p).normalize().multiplyScalar(0.006);
        v.add(dir);
        v.clampLength(0, 0.05);
        p.add(v);

        if (Math.abs(p.x) > 12) p.x *= -0.9;
        if (Math.abs(p.y) > 12) p.y *= -0.9;
        if (Math.abs(p.z) > 12) p.z *= -0.9;

        posArray[idx] = p.x;
        posArray[idx+1] = p.y;
        posArray[idx+2] = p.z;
      }
      posAttr.needsUpdate = true;

      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frame);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}
