import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Vanilla three.js hero scene: rotating laptop + orbiting glossy blobs.
 * Bypasses R3F entirely (avoids visual-edits JSX prop injection issue).
 * Performance-tuned: capped DPR, single render loop, disposed on unmount.
 */
export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 6.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(4, 5, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x2f66ff, 0.7);
    rim.position.set(-4, 2, -2);
    scene.add(rim);
    const fillLight = new THREE.PointLight(0xffffff, 0.6, 20);
    fillLight.position.set(0, 1, 2);
    scene.add(fillLight);

    // === Laptop ===
    const laptop = new THREE.Group();
    const inkMat = new THREE.MeshStandardMaterial({ color: 0x0b1020, metalness: 0.85, roughness: 0.22 });
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x11172e, metalness: 0.7, roughness: 0.35 });
    const padMat = new THREE.MeshStandardMaterial({ color: 0x1a2244, metalness: 0.5, roughness: 0.4 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 2.1), inkMat);
    base.position.set(0, -0.05, 0.2);
    laptop.add(base);
    const tray = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.005, 1.9), trayMat);
    tray.position.set(0, 0.015, 0.2);
    laptop.add(tray);
    const trackpad = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.005, 0.7), padMat);
    trackpad.position.set(0, 0.025, 0.75);
    laptop.add(trackpad);

    // Screen group (hinged)
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.04, -0.85);
    screenGroup.rotation.x = -1.35;

    const screenBack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.0, 0.08), inkMat);
    screenGroup.add(screenBack);

    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 1.85),
      new THREE.MeshStandardMaterial({
        color: 0x0047ff,
        emissive: 0x2f66ff,
        emissiveIntensity: 0.95,
        toneMapped: false,
      })
    );
    screenDisplay.position.z = 0.045;
    screenGroup.add(screenDisplay);

    // UI bars on screen (white & light-blue rectangles)
    const barWhite = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const barAccent = new THREE.MeshBasicMaterial({ color: 0x9cb6ff, toneMapped: false });
    const bars = [
      { x: -1.1, y: 0.65, w: 1.4, h: 0.08, mat: barWhite },
      { x: -1.1, y: 0.42, w: 0.9, h: 0.05, mat: barAccent },
      { x: -1.1, y: 0.28, w: 1.1, h: 0.05, mat: barAccent },
      { x: -1.1, y: 0.05, w: 0.7, h: 0.05, mat: barWhite },
      { x: -1.1, y: -0.1, w: 1.0, h: 0.05, mat: barAccent },
      { x: -1.1, y: -0.32, w: 0.6, h: 0.05, mat: barAccent },
    ];
    bars.forEach((b) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(b.w, b.h), b.mat);
      m.position.set(b.x + b.w / 2, b.y, 0.05);
      screenGroup.add(m);
    });
    // Card on right side of screen
    const cardOnScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.3),
      new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false, transparent: true, opacity: 0.92 })
    );
    cardOnScreen.position.set(0.85, 0.05, 0.05);
    screenGroup.add(cardOnScreen);

    laptop.add(screenGroup);
    laptop.position.y = -0.8;
    laptop.scale.setScalar(0.85);
    scene.add(laptop);

    // === Floating blob (icosahedron with vertex displacement via shader-lite) ===
    const blobGeo = new THREE.IcosahedronGeometry(0.5, 8);
    const blobMat = new THREE.MeshStandardMaterial({
      color: 0x0047ff,
      metalness: 0.7,
      roughness: 0.18,
    });
    const blob = new THREE.Mesh(blobGeo, blobMat);
    blob.position.set(2.2, 1.4, 0.2);
    scene.add(blob);

    // Pre-compute original positions for distortion
    const origPositions = blobGeo.attributes.position.array.slice();
    const tmpVec = new THREE.Vector3();

    // === Torus knot ===
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.36, 0.12, 128, 16),
      new THREE.MeshStandardMaterial({ color: 0x050712, metalness: 0.85, roughness: 0.18 })
    );
    knot.position.set(-2.4, 1.0, 0.2);
    scene.add(knot);

    // === Small accent sphere ===
    const accentBlob = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.22, 4),
      new THREE.MeshStandardMaterial({ color: 0x2f66ff, metalness: 0.6, roughness: 0.25 })
    );
    accentBlob.position.set(1.8, -1.6, 0.5);
    scene.add(accentBlob);

    // === Contact shadow plane (subtle) ===
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.14 });
    const shadowMesh = new THREE.Mesh(new THREE.CircleGeometry(2.0, 64), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.85;
    scene.add(shadowMesh);

    // Mouse parallax
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    mount.addEventListener("mousemove", onMove);

    let raf;
    const clock = new THREE.Clock();
    let cam = { x: 0, y: 1.4 };

    const tick = () => {
      const t = clock.getElapsedTime();
      // Laptop subtle motion
      laptop.rotation.y = Math.sin(t * 0.4) * 0.4;
      laptop.rotation.x = -0.15 + Math.sin(t * 0.6) * 0.05;
      laptop.position.y = -0.8 + Math.sin(t * 0.8) * 0.04;

      // Blob spin & distortion
      blob.rotation.x = t * 0.3;
      blob.rotation.y = t * 0.4;
      blob.position.y = 1.4 + Math.sin(t * 1.2) * 0.12;
      const positions = blobGeo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const ix = i * 3;
        tmpVec.set(origPositions[ix], origPositions[ix + 1], origPositions[ix + 2]);
        const n = Math.sin(tmpVec.x * 3 + t * 1.4) * 0.05 + Math.cos(tmpVec.y * 3 + t * 1.6) * 0.04 + Math.sin(tmpVec.z * 3 + t * 1.2) * 0.04;
        const len = 1 + n;
        positions.array[ix] = origPositions[ix] * len;
        positions.array[ix + 1] = origPositions[ix + 1] * len;
        positions.array[ix + 2] = origPositions[ix + 2] * len;
      }
      positions.needsUpdate = true;
      blobGeo.computeVertexNormals();

      // Knot
      knot.rotation.x = t * 0.5;
      knot.rotation.y = t * 0.3;
      knot.position.y = 1.0 + Math.sin(t * 1.1 + 1) * 0.1;

      accentBlob.rotation.y = t * 0.6;
      accentBlob.position.x = 1.8 + Math.sin(t * 0.9) * 0.25;

      // Camera parallax
      cam.x += (target.x - cam.x) * 0.06;
      cam.y += (target.y + 1.4 - cam.y) * 0.06;
      camera.position.x = cam.x;
      camera.position.y = cam.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      renderer.dispose();
      blobGeo.dispose();
      [inkMat, trayMat, padMat, blobMat, barWhite, barAccent, shadowMat].forEach((m) => m.dispose());
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
