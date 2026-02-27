"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface InteractiveBackgroundParticlesProps {
    className?: string;
    count?: number;
}

export const InteractiveBackgroundParticles: React.FC<InteractiveBackgroundParticlesProps> = ({
    className,
    count = 250
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;

        /* ── Renderer ────────────────────────────────────────────────────── */
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
        camera.position.z = 800;

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener('resize', resize);

        /* ── Physics params ─────────────────────────────────────────────── */
        const DOT_COUNT = count;
        const ATTRACT_R = 400; // Radius for pulling
        const REPEL_R = 120;   // Radius for dispersing
        const ATTRACT_STR = 0.015;
        const REPEL_STR = 0.12;
        const SPRING = 0.025;
        const DAMP = 0.85;

        /* ── Particle Setup ─────────────────────────────────────────────── */
        const origins: THREE.Vector3[] = [];
        const positions: THREE.Vector3[] = [];
        const velocities: THREE.Vector3[] = [];

        // Randomly scatter in a large workspace area
        const width = 1600;
        const height = 1000;
        for (let i = 0; i < DOT_COUNT; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            const z = (Math.random() - 0.5) * 400;
            const v = new THREE.Vector3(x, y, z);
            origins.push(v.clone());
            positions.push(v.clone());
            velocities.push(new THREE.Vector3());
        }

        /* ── Points Geometry ────────────────────────────────────────────── */
        const posArr = new Float32Array(DOT_COUNT * 3);
        const colArr = new Float32Array(DOT_COUNT * 3);
        const ptGeo = new THREE.BufferGeometry();
        ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
        ptGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

        const ptMat = new THREE.PointsMaterial({
            vertexColors: true,
            size: 4,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
        });
        const ptMesh = new THREE.Points(ptGeo, ptMat);
        scene.add(ptMesh);

        /* ── Mouse Interaction ───────────────────────────────────────────── */
        const ndcMouse = new THREE.Vector2(-99, -99);
        const mouseWorld = new THREE.Vector3();
        let isHovering = false;

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            ndcMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            ndcMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            isHovering = true;
        };
        const onMouseLeave = () => {
            isHovering = false;
            ndcMouse.set(-99, -99);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        /* ── Animate ─────────────────────────────────────────────────────── */
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (isHovering) {
                mouseWorld.set(ndcMouse.x, ndcMouse.y, 0.5).unproject(camera);
                const dir = mouseWorld.clone().sub(camera.position).normalize();
                const distance = -camera.position.z / dir.z;
                mouseWorld.copy(camera.position).add(dir.multiplyScalar(distance));
            }

            const isDark = document.documentElement.classList.contains('dark');
            const baseIntensity = isDark ? 0.2 : 0.4;
            const highlightIntensity = isDark ? 0.8 : 0.6;

            for (let i = 0; i < DOT_COUNT; i++) {
                const p = positions[i];
                const o = origins[i];
                const v = velocities[i];

                // Spring back to origin
                v.x += (o.x - p.x) * SPRING;
                v.y += (o.y - p.y) * SPRING;
                v.z += (o.z - p.z) * SPRING;

                if (isHovering) {
                    const dx = mouseWorld.x - p.x;
                    const dy = mouseWorld.y - p.y;
                    const dz = mouseWorld.z - p.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;

                    // Pull towards cursor (Attract)
                    if (dist < ATTRACT_R && dist > REPEL_R) {
                        const t = 1 - dist / ATTRACT_R;
                        const force = t * t * ATTRACT_STR;
                        v.x += (dx / dist) * force * 15;
                        v.y += (dy / dist) * force * 15;
                        v.z += (dz / dist) * force * 15;
                    }

                    // Disperse/Repel (if too close)
                    if (dist < REPEL_R) {
                        const t = 1 - dist / REPEL_R;
                        const force = t * t * REPEL_STR;
                        v.x -= (dx / dist) * force * 20;
                        v.y -= (dy / dist) * force * 20;
                        v.z -= (dz / dist) * force * 20;
                    }
                }

                v.multiplyScalar(DAMP);
                p.add(v);

                posArr[i * 3] = p.x;
                posArr[i * 3 + 1] = p.y;
                posArr[i * 3 + 2] = p.z;

                // Color based on activity
                let c = baseIntensity;
                if (isHovering) {
                    const d = p.distanceTo(mouseWorld);
                    const t = Math.max(0, 1 - d / 500);
                    c = baseIntensity + t * (highlightIntensity - baseIntensity);
                }
                colArr[i * 3] = c;
                colArr[i * 3 + 1] = c;
                colArr[i * 3 + 2] = c;
            }

            ptGeo.attributes.position.needsUpdate = true;
            ptGeo.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseleave', onMouseLeave);
            renderer.dispose();
            ptGeo.dispose();
            ptMat.dispose();
        };
    }, [count]);

    return (
        <div ref={containerRef} className={`absolute inset-0 pointer-events-none -z-10 ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full outline-none opacity-50 dark:opacity-20" />
        </div>
    );
};
