"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function SpaceCosmos() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isDark = resolvedTheme === "dark";
    const starColor = isDark ? 0xffffff : 0x222226;

    // Starfield Particle Geometry
    const starCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1600;
      velocities[i] = Math.random() * 0.4 + 0.1; // forward drift speed
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      color: starColor,
      size: isDark ? 2.0 : 1.8,
      transparent: true,
      opacity: isDark ? 0.65 : 0.4,
      sizeAttenuation: true,
    });

    const starfield = new THREE.Points(geometry, material);
    scene.add(starfield);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;

      // Mouse camera parallax interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      // Star drift motion
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < starCount; i++) {
        posArray[i * 3 + 2] += velocities[i];

        // Wrap around when star passes camera
        if (posArray[i * 3 + 2] > 700) {
          posArray[i * 3 + 2] = -900;
          posArray[i * 3] = (Math.random() - 0.5) * 1600;
          posArray[i * 3 + 1] = (Math.random() - 0.5) * 1600;
        }
      }
      posAttr.needsUpdate = true;

      // Subtle slow cosmic rotation
      starfield.rotation.y += 0.0003;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 w-full h-full"
    />
  );
}
