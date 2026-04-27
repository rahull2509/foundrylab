import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Vanilla three.js: glossy distorted icosahedron sphere for "Why Us" section.
export default function BlobScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const k = new THREE.DirectionalLight(0xffffff, 1.4);
    k.position.set(3, 3, 2);
    scene.add(k);
    const r2 = new THREE.DirectionalLight(0x0047ff, 0.9);
    r2.position.set(-3, -2, -2);
    scene.add(r2);

    const geo = new THREE.IcosahedronGeometry(1.4, 32);
    const mat = new THREE.MeshStandardMaterial({ color: 0x0047ff, metalness: 0.75, roughness: 0.12 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const orig = geo.attributes.position.array.slice();
    const v = new THREE.Vector3();
    let raf;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.2;
      mesh.rotation.y = t * 0.3;
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const ix = i * 3;
        v.set(orig[ix], orig[ix + 1], orig[ix + 2]);
        const n =
          Math.sin(v.x * 1.2 + t * 1.2) * 0.12 +
          Math.cos(v.y * 1.4 + t * 1.4) * 0.1 +
          Math.sin(v.z * 1.1 + t * 1.0) * 0.1;
        const len = 1 + n;
        p.array[ix] = orig[ix] * len;
        p.array[ix + 1] = orig[ix + 1] * len;
        p.array[ix + 2] = orig[ix + 2] * len;
      }
      p.needsUpdate = true;
      geo.computeVertexNormals();
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
