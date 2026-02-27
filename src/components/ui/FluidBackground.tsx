"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface FluidBackgroundProps {
    className?: string;
    density?: number;
}

export const FluidBackground: React.FC<FluidBackgroundProps> = ({
    className,
    density = 60
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

        /* ── Physics / Animation params ──────────────────────────────────── */
        const ATTRACT_R = 300;
        const REPEL_R = 100;
        const ATTRACT_STR = 0.01;
        const REPEL_STR = 0.08;
        const SPRING = 0.03;
        const DAMP = 0.88;

        /* ── Particle Setup ─────────────────────────────────────────────── */
        const count = 1200; // Increased for starfield density
        const origins: THREE.Vector3[] = [];
        const points: THREE.Vector3[] = [];
        const velocities: THREE.Vector3[] = [];
        const colors: number[] = [];

        const rangeX = 2000;
        const rangeY = 1200;
        const rangeZ = 400;

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * rangeX;
            const y = (Math.random() - 0.5) * rangeY;
            const z = (Math.random() - 0.5) * rangeZ;

            const v = new THREE.Vector3(x, y, z);
            origins.push(v.clone());
            points.push(v.clone());
            velocities.push(new THREE.Vector3());
            colors.push(0.5, 0.5, 0.5);
        }

        /* ── Points Geometry ────────────────────────────────────────────── */
        const posArr = new Float32Array(count * 3);
        const colArr = new Float32Array(count * 3);
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

            const time = Date.now() * 0.001;

            if (isHovering) {
                mouseWorld.set(ndcMouse.x, ndcMouse.y, 0.5).unproject(camera);
                const dir = mouseWorld.clone().sub(camera.position).normalize();
                const distance = -camera.position.z / dir.z;
                mouseWorld.copy(camera.position).add(dir.multiplyScalar(distance));
            }

            const isDark = document.documentElement.classList.contains('dark');
            const baseIntensity = isDark ? 0.3 : 0.4;
            const highlightIntensity = isDark ? 0.9 : 0.7;

            // Ported Sphere Displacement Logic
            // In the sphere: noise was (p.x * 0.5 + time) * 2
            // and offset was Math.sin(noise) * distortAmount * 15;

            const distortBase = 0.5 + Math.sin(time * 0.5) * 0.2;

            for (let i = 0; i < count; i++) {
                const p = points[i];
                const o = origins[i];
                const v = velocities[i];

                const dToMouse = p.distanceTo(mouseWorld);
                const influence = isHovering ? Math.max(0, 1 - dToMouse / 400) : 0;
                const distortAmount = distortBase + influence * 2.5;

                // Origin displacement (The "Fluid" look)
                const noise = (o.x * 0.005 + time) * 3;
                const waveOffset = Math.sin(noise + o.y * 0.005) * distortAmount * 15;

                // Target position based on waves
                const targetX = o.x;
                const targetY = o.y;
                const targetZ = o.z + waveOffset;

                // Elastic return to target (which is wavy)
                v.x += (targetX - p.x) * SPRING;
                v.y += (targetY - p.y) * SPRING;
                v.z += (targetZ - p.z) * SPRING;

                // Mouse Physics: Pull & Disperse
                if (isHovering) {
                    const dx = mouseWorld.x - p.x;
                    const dy = mouseWorld.y - p.y;
                    const dz = mouseWorld.z - p.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;

                    if (dist < ATTRACT_R && dist > REPEL_R) {
                        const t = 1 - dist / ATTRACT_R;
                        const force = t * t * ATTRACT_STR;
                        v.x += (dx / dist) * force * 15;
                        v.y += (dy / dist) * force * 15;
                        v.z += (dz / dist) * force * 15;
                    }

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

                // Subtle Color
                let c = baseIntensity;
                if (isHovering) {
                    const t = Math.max(0, 1 - dToMouse / 400);
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
    }, [density]);

    return (
        <div ref={containerRef} className={`fixed inset-0 pointer-events-none -z-10 ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full outline-none opacity-40 dark:opacity-20" />
        </div>
    );
};
