"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface InteractiveSphereProps {
    className?: string;
}

export const InteractiveSphere: React.FC<InteractiveSphereProps> = ({ className }) => {
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
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 3.4;

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener('resize', resize);

        /* ── Grid params ─────────────────────────────────────────────────── */
        const SPHERE_R = 1.0;
        const LAT_RINGS = 18;
        const LON_SEGS = 28;
        const REPEL_R = 0.82;
        const REPEL_STR = 0.095;
        const SPRING = 0.014;
        const DAMP = 0.68;

        /* ── Build lat/lon dot grid ──────────────────────────────────────── */
        const origins: THREE.Vector3[] = [];
        origins.push(new THREE.Vector3(0, SPHERE_R, 0));

        for (let lat = 1; lat < LAT_RINGS; lat++) {
            const phi = (lat / LAT_RINGS) * Math.PI;
            const y = SPHERE_R * Math.cos(phi);
            const r = SPHERE_R * Math.sin(phi);
            const dotsOnRing = Math.max(6, Math.round(LON_SEGS * Math.sin(phi)));

            for (let lon = 0; lon < dotsOnRing; lon++) {
                const theta = (lon / dotsOnRing) * Math.PI * 2;
                origins.push(new THREE.Vector3(r * Math.sin(theta), y, r * Math.cos(theta)));
            }
        }
        origins.push(new THREE.Vector3(0, -SPHERE_R, 0));

        const COUNT = origins.length;
        const positions = origins.map(v => v.clone());
        const velocities = origins.map(() => new THREE.Vector3());

        /* ── Points geometry ─────────────────────────────────────────────── */
        const posArr = new Float32Array(COUNT * 3);
        const colArr = new Float32Array(COUNT * 3);
        const ptGeo = new THREE.BufferGeometry();
        ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
        ptGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

        const ptMat = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.028,
            sizeAttenuation: true,
            transparent: true,
            opacity: 1,
            depthWrite: false,
        });
        const ptMesh = new THREE.Points(ptGeo, ptMat);

        /* ── Invisible pick sphere ───────────────────────────────────────── */
        const pickMesh = new THREE.Mesh(
            new THREE.SphereGeometry(SPHERE_R, 48, 48),
            new THREE.MeshBasicMaterial({ visible: false, side: THREE.FrontSide })
        );

        /* ── Group ───────────────────────────────────────────────────────── */
        const group = new THREE.Group();
        group.add(ptMesh, pickMesh);
        scene.add(group);

        /* ── Drag rotation ───────────────────────────────────────────────── */
        let rotX = 0.2, rotY = 0, dragVX = 0, dragVY = 0, isDragging = false;
        let prevMX = 0, prevMY = 0, autoSpin = 0;

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true;
            dragVX = dragVY = 0;
            prevMX = e.clientX;
            prevMY = e.clientY;
        };
        const onMouseUp = () => { isDragging = false; };
        const onMouseMoveGlobal = (e: MouseEvent) => {
            if (!isDragging) return;
            dragVY = (e.clientX - prevMX) * 0.007;
            dragVX = (e.clientY - prevMY) * 0.007;
            rotY += dragVY; rotX += dragVX;
            rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
            prevMX = e.clientX; prevMY = e.clientY;
        };

        canvas.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMoveGlobal);

        /* ── Hover raycasting ────────────────────────────────────────────── */
        const raycaster = new THREE.Raycaster();
        const ndcMouse = new THREE.Vector2(-99, -99);
        const mouseLocal = new THREE.Vector3();
        let isHovering = false;

        const onMouseEnter = () => {
            isHovering = true;
        };
        const onMouseLeave = () => {
            isHovering = false;
            ndcMouse.set(-99, -99);
        };
        const onMouseMoveCanvas = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            ndcMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            ndcMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        canvas.addEventListener('mouseenter', onMouseEnter);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('mousemove', onMouseMoveCanvas);

        /* ── Scroll zoom ─────────────────────────────────────────────────── */
        let targetZ = 3.4;
        const onWheel = (e: WheelEvent) => {
            if (isHovering) {
                e.preventDefault();
                targetZ = Math.max(2.0, Math.min(6.0, targetZ + e.deltaY * 0.005));
            }
        };
        canvas.addEventListener('wheel', onWheel, { passive: false });

        /* ── Animate ─────────────────────────────────────────────────────── */
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            /* Zoom */
            camera.position.z += (targetZ - camera.position.z) * 0.07;

            /* Rotation */
            if (!isDragging) {
                dragVX *= 0.93;
                dragVY *= 0.93;
                rotY += dragVY;
                rotX += dragVX;
            }
            autoSpin += 0.0014;
            group.rotation.set(rotX, rotY + autoSpin, 0);

            /* Raycast mouse onto sphere */
            let hitLocal: THREE.Vector3 | null = null;
            if (isHovering) {
                raycaster.setFromCamera(ndcMouse, camera);
                const hits = raycaster.intersectObject(pickMesh);
                if (hits.length > 0) {
                    mouseLocal.copy(hits[0].point);
                    group.worldToLocal(mouseLocal);
                    hitLocal = mouseLocal;
                }
            }

            const isDark = document.documentElement.classList.contains('dark');
            const baseIntensity = isDark ? 0.3 : 0.4;
            const highlightIntensity = isDark ? 1.0 : 0.8;

            /* Physics per dot */
            for (let i = 0; i < COUNT; i++) {
                const p = positions[i];
                const o = origins[i];
                const v = velocities[i];

                v.x += (o.x - p.x) * SPRING;
                v.y += (o.y - p.y) * SPRING;
                v.z += (o.z - p.z) * SPRING;

                if (hitLocal) {
                    const dx = p.x - hitLocal.x;
                    const dy = p.y - hitLocal.y;
                    const dz = p.z - hitLocal.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;
                    if (dist < REPEL_R) {
                        const t = 1 - dist / REPEL_R;
                        const force = t * t * REPEL_STR;
                        v.x += (dx / dist) * force;
                        v.y += (dy / dist) * force;
                        v.z += (dz / dist) * force;
                    }
                }

                v.multiplyScalar(DAMP);
                p.add(v);

                const len = p.length() || 0.0001;
                p.multiplyScalar(SPHERE_R / len);

                posArr[i * 3] = p.x;
                posArr[i * 3 + 1] = p.y;
                posArr[i * 3 + 2] = p.z;

                /* Color adaptation */
                let c = baseIntensity;
                if (hitLocal) {
                    const dx = p.x - hitLocal.x, dy = p.y - hitLocal.y, dz = p.z - hitLocal.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    const t = Math.max(0, 1 - dist / (REPEL_R * 1.8));
                    c = baseIntensity + t * t * (highlightIntensity - baseIntensity);
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
            canvas.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMoveGlobal);
            canvas.removeEventListener('mouseenter', onMouseEnter);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('mousemove', onMouseMoveCanvas);
            canvas.removeEventListener('wheel', onWheel);
            renderer.dispose();
            ptGeo.dispose();
            ptMat.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className={`relative group/sphere ${className}`}>
            <canvas
                ref={canvasRef}
                className="block w-full h-full outline-none cursor-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iNCIgZmlsbD0iIzAwZDQmZiIgLz48L3N2Zz4=')_OC_OCxhdXRv]"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-text-muted/40 opacity-0 group-hover/sphere:opacity-100 transition-opacity duration-500 text-center px-4">
                Hover to distort · Drag to rotate · Scroll to zoom
            </div>
        </div>
    );
};
