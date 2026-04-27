import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Vanilla three.js: metallic torus knot for the CTA panel.
export default function KnotScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const k = new THREE.DirectionalLight(0xffffff, 1.4);
    k.position.set(2, 3, 2);
    scene.add(k);
    const f = new THREE.DirectionalLight(0xffffff, 0.5);
    f.position.set(-2, -1, -2);
    scene.add(f);

    const geo = new THREE.TorusKnotGeometry(0.85, 0.26, 220, 32);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.12 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let raf;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.35;
      mesh.rotation.y = t * 0.55;
      mesh.position.y = Math.sin(t * 1.2) * 0.18;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      const ww = mount.clientWidth;
      const hh = mount.clientHeight;
      camera.aspect = ww / hh;
      camera.updateProjectionMatrix();
      renderer.setSize(ww, hh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
