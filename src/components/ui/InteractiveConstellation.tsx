"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface InteractiveConstellationProps {
    className?: string;
    count?: number;
}

export const InteractiveConstellation: React.FC<InteractiveConstellationProps> = ({
    className,
    count = 150
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
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 400;

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener('resize', resize);

        /* ── Particles & Interaction params ──────────────────────────────── */
        const DOT_COUNT = count;
        const CONNECT_DIST = 140;
        const REPEL_R = 180;
        const REPEL_STR = 0.8;
        const SPRING = 0.02;
        const DAMP = 0.88;

        /* ── Particle Setup ─────────────────────────────────────────────── */
        const origins: THREE.Vector3[] = [];
        const positions: THREE.Vector3[] = [];
        const velocities: THREE.Vector3[] = [];

        // Randomly scatter in a large box
        const range = 1000;
        for (let i = 0; i < DOT_COUNT; i++) {
            const x = (Math.random() - 0.5) * range;
            const y = (Math.random() - 0.5) * range;
            const z = (Math.random() - 0.5) * range * 0.5;
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
            size: 3,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
        });
        const ptMesh = new THREE.Points(ptGeo, ptMat);
        scene.add(ptMesh);

        /* ── Lines Geometry (Dynamic) ───────────────────────────────────── */
        const lineGeo = new THREE.BufferGeometry();
        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.2,
            depthWrite: false,
        });
        const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(lineMesh);

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

            // Unproject mouse to world space at z=0 (approx)
            if (isHovering) {
                mouseWorld.set(ndcMouse.x, ndcMouse.y, 0.5).unproject(camera);
                const dir = mouseWorld.clone().sub(camera.position).normalize();
                const distance = -camera.position.z / dir.z;
                mouseWorld.copy(camera.position).add(dir.multiplyScalar(distance));
            }

            /* Update Particles */
            const isDark = document.documentElement.classList.contains('dark');
            const baseIntensity = isDark ? 0.3 : 0.5;
            const highlightIntensity = isDark ? 0.9 : 0.7;

            for (let i = 0; i < DOT_COUNT; i++) {
                const p = positions[i];
                const o = origins[i];
                const v = velocities[i];

                // Return to origin spring
                v.x += (o.x - p.x) * SPRING;
                v.y += (o.y - p.y) * SPRING;
                v.z += (o.z - p.z) * SPRING;

                // Interaction (Pull/Attract)
                if (isHovering) {
                    const dx = mouseWorld.x - p.x;
                    const dy = mouseWorld.y - p.y;
                    const dz = mouseWorld.z - p.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;

                    if (dist < REPEL_R) {
                        const t = 1 - dist / REPEL_R;
                        // Attraction force
                        const force = t * t * REPEL_STR;
                        v.x += (dx / dist) * force * 10;
                        v.y += (dy / dist) * force * 10;
                        v.z += (dz / dist) * force * 10;
                    }
                }

                v.multiplyScalar(DAMP);
                p.add(v);

                posArr[i * 3] = p.x;
                posArr[i * 3 + 1] = p.y;
                posArr[i * 3 + 2] = p.z;

                // Subtle color based on interaction
                let c = baseIntensity;
                if (isHovering) {
                    const dx = mouseWorld.x - p.x, dy = mouseWorld.y - p.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    const t = Math.max(0, 1 - d / 400);
                    c = baseIntensity + t * (highlightIntensity - baseIntensity);
                }
                colArr[i * 3] = c;
                colArr[i * 3 + 1] = c;
                colArr[i * 3 + 2] = c;
            }

            ptGeo.attributes.position.needsUpdate = true;
            ptGeo.attributes.color.needsUpdate = true;

            /* Update Lines */
            const linePositions: number[] = [];
            const lineColors: number[] = [];

            for (let i = 0; i < DOT_COUNT; i++) {
                for (let j = i + 1; j < DOT_COUNT; j++) {
                    const p1 = positions[i];
                    const p2 = positions[j];
                    const dist = p1.distanceTo(p2);

                    if (dist < CONNECT_DIST) {
                        linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

                        // Fade lines based on distance
                        const alpha = (1 - dist / CONNECT_DIST) * 0.4;
                        const c1 = colArr[i * 3] * alpha;
                        const c2 = colArr[j * 3] * alpha;

                        lineColors.push(c1, c1, c1, c2, c2, c2);
                    }
                }
            }

            lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

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
            lineGeo.dispose();
            lineMat.dispose();
        };
    }, [count]);

    return (
        <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full outline-none opacity-40 dark:opacity-20" />
        </div>
    );
};
