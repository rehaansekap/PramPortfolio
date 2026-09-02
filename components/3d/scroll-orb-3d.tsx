"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function ScrollOrb3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(180, 180);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isDark = resolvedTheme === "dark";
    const primaryColor = isDark ? 0xffffff : 0x18181b;
    const secondaryColor = isDark ? 0x71717a : 0x52525b;
    const accentColor = isDark ? 0xe4e4e7 : 0x27272a;

    // 2. 3D Orb Geometry Construction
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Outer Geodesic Sphere Wireframe
    const sphereGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const sphereWire = new THREE.WireframeGeometry(sphereGeo);
    const sphereMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
      linewidth: 1.2,
    });
    const sphereMesh = new THREE.LineSegments(sphereWire, sphereMat);
    orbGroup.add(sphereMesh);

    // Orbital Technical Rings
    const ringGeo = new THREE.TorusGeometry(1.85, 0.02, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.5 : 0.35,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    orbGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 6;
    orbGroup.add(ringMesh2);

    // Inner Technical Cryptographic Core (Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.65, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    // Mini orbiting data satellites
    const satCount = 16;
    const satGeo = new THREE.BufferGeometry();
    const satPositions = new Float32Array(satCount * 3);
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.1 + (i % 3) * 0.2;
      satPositions[i * 3] = Math.cos(angle) * radius;
      satPositions[i * 3 + 1] = Math.sin(angle) * (radius * 0.4);
      satPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    satGeo.setAttribute("position", new THREE.BufferAttribute(satPositions, 3));
    const satMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.07,
      transparent: true,
      opacity: isDark ? 0.85 : 0.6,
    });
    const satellites = new THREE.Points(satGeo, satMat);
    orbGroup.add(satellites);

    // 3. User Pointer Drag & Permanent Inertia Rotation
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let userRotation = { x: 0.2, y: 0.4 };
    let userVelocity = { x: 0, y: 0.003 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
      userVelocity = { x: 0, y: 0 };
      try {
        canvas.setPointerCapture?.(e.pointerId);
      } catch {}
      e.stopPropagation();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPointer.x;
      const dy = e.clientY - prevPointer.y;
      prevPointer = { x: e.clientX, y: e.clientY };

      userRotation.y += dx * 0.016;
      userRotation.x += dy * 0.016;
      userVelocity.y = dx * 0.016;
      userVelocity.x = dy * 0.016;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        canvas.releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // 4. Smooth Liquid Lerp State
    let currentX = 40;
    let currentY = window.innerHeight * 0.25;
    let targetX = 40;
    let targetY = window.innerHeight * 0.25;

    // Scroll Physics
    let lastScrollY = window.scrollY;
    let rollRotationX = 0;
    let rollRotationZ = 0;

    // Smoothstep easing for zero-jerk continuous transition
    const smoothStep = (t: number) => {
      const clamped = Math.min(1, Math.max(0, t));
      return clamped * clamped * (3 - 2 * clamped);
    };

    // 5. Target Trajectory Calculation
    const calculateTarget = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Content column is centered with max-width 1152px
      const contentWidth = Math.min(1152, vw - 64);
      const leftGutterWidth = Math.max(0, (vw - contentWidth) / 2);

      // EXTENDED OUTER MARGIN TRACKS (Wide breathing room away from all cards and text)
      const leftTrack =
        leftGutterWidth > 200
          ? Math.max(30, (leftGutterWidth - 180) / 2)
          : Math.max(16, leftGutterWidth - 190);

      const rightTrack =
        leftGutterWidth > 200
          ? Math.min(vw - 210, vw - (leftGutterWidth - 180) / 2 - 180)
          : Math.min(vw - 196, vw - leftGutterWidth + 10);

      // Section DOM elements
      const aboutEl = document.getElementById("about-snapshot");
      const projectsEl = document.getElementById("featured-projects");
      const achievementsEl = document.getElementById("achievements");
      const footerEl = document.querySelector("footer");

      const aboutRect = aboutEl ? aboutEl.getBoundingClientRect() : null;
      const projectsRect = projectsEl ? projectsEl.getBoundingClientRect() : null;
      const achievementsRect = achievementsEl ? achievementsEl.getBoundingClientRect() : null;
      const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

      // 1. HERO: Starts on LEFT
      if (!aboutRect || aboutRect.top > vh * 0.72) {
        targetX = leftTrack;
        targetY = vh * 0.25;
      }
      // 2. TRANSITION 1: Di ruang kosong DI ATAS Tentang Saya (LEFT -> RIGHT)
      else if (aboutRect.top > vh * 0.28) {
        const progress = (vh * 0.72 - aboutRect.top) / (vh * 0.44);
        const ease = smoothStep(progress);
        targetX = leftTrack + (rightTrack - leftTrack) * ease;
        targetY = aboutRect.top - 65; // Ruang kosong di atas heading
      }
      // 3. TENTANG SAYA + KEAHLIAN TEKNIS (2 Sections on the RIGHT!)
      else if (!projectsRect || projectsRect.top > vh * 0.72) {
        targetX = rightTrack;
        targetY = vh * 0.45;
      }
      // 4. TRANSITION 2: Di ruang kosong DI ATAS Proyek Pilihan (RIGHT -> LEFT)
      else if (projectsRect.top > vh * 0.28) {
        const progress = (vh * 0.72 - projectsRect.top) / (vh * 0.44);
        const ease = smoothStep(progress);
        targetX = rightTrack - (rightTrack - leftTrack) * ease; // Kanan ke Kiri
        targetY = projectsRect.top - 65; // Ruang kosong di atas heading
      }
      // 5. PROYEK PILIHAN + PENGALAMAN TERBARU (Di sisi KIRI)
      else if (!achievementsRect || achievementsRect.top > vh * 0.72) {
        targetX = leftTrack;
        targetY = vh * 0.45;
      }
      // 6. TRANSITION 3: Setelah Pengalaman Terbaru / ke Section 5 (LEFT -> RIGHT)
      else if (achievementsRect.top > vh * 0.28) {
        const progress = (vh * 0.72 - achievementsRect.top) / (vh * 0.44);
        const ease = smoothStep(progress);
        targetX = leftTrack + (rightTrack - leftTrack) * ease; // Kiri ke Kanan
        targetY = achievementsRect.top - 65; // Ruang kosong di atas heading
      }
      // 7. SECTION 5 (SERTIFIKASI) + KONTAK (BERAKHIR DI KANAN!)
      else {
        targetX = rightTrack; // Berakhir di KANAN!
        if (footerRect && footerRect.top < vh) {
          targetY = Math.min(vh * 0.45, footerRect.top - 240);
        } else {
          targetY = vh * 0.45;
        }
      }
    };

    calculateTarget();
    currentX = targetX;
    currentY = targetY;

    // 6. Animation Render Loop (Continuous 60 FPS Silky-Smooth Liquid Lerp)
    let animationFrameId: number;
    let isVisible = true;
    let clock = new THREE.Clock();

    const render = () => {
      if (!isVisible) return;
      const elapsed = clock.getElapsedTime();

      // Recalculate target position continuously every frame for 100% responsiveness
      calculateTarget();

      // Buttery smooth liquid lerp (damping factor 0.065)
      const lerpSpeed = 0.065;
      currentX += (targetX - currentX) * lerpSpeed;
      currentY += (targetY - currentY) * lerpSpeed;
      container.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      // Measure scroll delta for physical rolling
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      rollRotationX += scrollDelta * 0.005;

      // Realistic horizontal rolling momentum
      const horizontalDelta = targetX - currentX;
      rollRotationZ -= horizontalDelta * 0.0008;

      // Inertia damping for drag
      if (!isDragging) {
        userVelocity.x *= 0.95;
        userVelocity.y *= 0.95;
        if (Math.abs(userVelocity.y) < 0.002) {
          userVelocity.y = 0.002;
        }
        userRotation.x += userVelocity.x;
        userRotation.y += userVelocity.y;
      }

      // Combine user manual rotation + physical scroll rolling
      orbGroup.rotation.x = userRotation.x + rollRotationX;
      orbGroup.rotation.y = userRotation.y;
      orbGroup.rotation.z = rollRotationZ;

      // Counter-rotations on rings & core pulse
      ringMesh1.rotation.z += 0.006;
      ringMesh2.rotation.x -= 0.005;
      satellites.rotation.y += 0.008;

      const pulse = 1 + Math.sin(elapsed * 3.5) * 0.12;
      coreMesh.scale.set(pulse, pulse, pulse);

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
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      sphereGeo.dispose();
      sphereWire.dispose();
      sphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, [resolvedTheme]);

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-scroll-orb
      className="hidden lg:block fixed top-0 left-0 z-30 pointer-events-auto cursor-grab active:cursor-grabbing w-[180px] h-[180px] select-none touch-none will-change-transform drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_15px_30px_rgba(255,255,255,0.06)] group transition-opacity duration-200"
      title="Bola 3D Interaktif — Klik & drag untuk memutar 360°!"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Floating mini status badge */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[9px] px-2 py-0.5 rounded bg-bg-base border border-border-subtle text-text-primary whitespace-nowrap shadow-xs pointer-events-none">
        DRAG 360°
      </div>
    </div>
  );
}
