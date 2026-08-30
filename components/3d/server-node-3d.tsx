"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { Loader2, RotateCw } from "lucide-react";

export function ServerNode3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [interactiveNotice, setInteractiveNotice] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isDark = resolvedTheme === "dark";
    const primaryWireColor = isDark ? 0xffffff : 0x111827;
    const secondaryWireColor = isDark ? 0x888888 : 0x6b7280;
    const coreColor = isDark ? 0xffffff : 0x000000;

    // 3. 3D Server Node Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer Wireframe Cage (Icosahedron)
    const cageGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const cageWireGeo = new THREE.WireframeGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: secondaryWireColor,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const cageMesh = new THREE.LineSegments(cageWireGeo, cageMat);
    mainGroup.add(cageMesh);

    // Inner Server Node Cubes (Stacked 3-tier Server Architecture)
    const tierGroup = new THREE.Group();
    mainGroup.add(tierGroup);

    const boxGeo = new THREE.BoxGeometry(1.4, 0.35, 1.4);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);

    const tiers: THREE.LineSegments[] = [];
    const tierMaterials: THREE.LineBasicMaterial[] = [];

    const tierYOffsets = [-0.65, 0, 0.65];
    tierYOffsets.forEach((y) => {
      const mat = new THREE.LineBasicMaterial({
        color: primaryWireColor,
        linewidth: 1.5,
      });
      tierMaterials.push(mat);
      const tier = new THREE.LineSegments(boxEdges, mat);
      tier.position.y = y;
      tierGroup.add(tier);
      tiers.push(tier);
    });

    // Central Data Core (Glowing Pulsating Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.45, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Ambient Orbiting Data Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.6 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: primaryWireColor,
      size: 0.05,
      transparent: true,
      opacity: isDark ? 0.6 : 0.4,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // 4. Mouse Drag & Inertia Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.002, y: 0.004 };
    let targetRotation = { x: 0.3, y: 0.5 };
    let currentMouse = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      setInteractiveNotice(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      // Mouse parallax coordinates (-1 to 1)
      currentMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      currentMouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        rotationVelocity.y = deltaX * 0.005;
        rotationVelocity.x = deltaY * 0.005;

        targetRotation.y += rotationVelocity.y;
        targetRotation.x += rotationVelocity.x;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 5. Resize Listener
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // 6. Animation Render Loop
    let animationFrameId: number;
    let isVisible = true;
    let clock = new THREE.Clock();

    const render = () => {
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Inertia damping
      if (!isDragging) {
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
        targetRotation.x += rotationVelocity.x + 0.002;
        targetRotation.y += rotationVelocity.y + 0.004;
      }

      // Smooth interpolation (lerp)
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.08;
      mainGroup.rotation.y += (targetRotation.y - mainGroup.rotation.y) * 0.08;

      // Mouse Parallax tilt
      mainGroup.position.x += (currentMouse.x * 0.2 - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (currentMouse.y * 0.2 - mainGroup.position.y) * 0.05;

      // Subtle pulse and counter rotations
      cageMesh.rotation.y -= 0.002;
      coreMesh.rotation.x += 0.015;
      coreMesh.rotation.z += 0.015;
      const pulseScale = 1 + Math.sin(elapsedTime * 3) * 0.12;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

      tiers.forEach((t, idx) => {
        t.rotation.y = Math.sin(elapsedTime * 1.5 + idx) * 0.08;
      });

      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    animationFrameId = requestAnimationFrame(render);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      // Dispose Three.js objects
      cageGeo.dispose();
      cageWireGeo.dispose();
      cageMat.dispose();
      boxGeo.dispose();
      boxEdges.dispose();
      tierMaterials.forEach((m) => m.dispose());
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing select-none group"
      title="Klik & geser untuk memutar 3D Server Node"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Subtle HUD Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-wider px-2.5 py-1 rounded bg-bg-base/85 border border-border-subtle text-text-secondary backdrop-blur-sm pointer-events-none flex items-center gap-1.5 shadow-xs opacity-70 group-hover:opacity-100 transition-opacity">
        <RotateCw className="w-3 h-3 animate-spin-slow" />
        <span>3D SERVER ARCHITECTURE • DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
