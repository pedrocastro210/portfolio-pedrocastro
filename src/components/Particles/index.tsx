import React, { useEffect, useRef, useState } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

import './Particles.css';

interface ParticlesProps {
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    className?: string;
}

const defaultColors: string[] = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string): [number, number, number] => {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
        hex = hex.split("").map((c) => c + c).join("");
    }
    const int = parseInt(hex, 16);
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;
    return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    float distance = length(mvPos.xyz);
    gl_PointSize = max(1.0, (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / distance);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor, 1.0);
    } else {
      float circle = smoothstep(0.5, 0.3, d) * 0.9;
      gl_FragColor = vec4(vColor, circle);
    }
  }
`;

const Particles: React.FC<ParticlesProps> = ({
    particleCount = 200,
    particleSpread = 10,
    speed = 0.1,
    particleColors,
    moveParticlesOnHover = false,
    particleHoverFactor = 1,
    alphaParticles = false,
    particleBaseSize = 100,
    sizeRandomness = 1,
    cameraDistance = 20,
    disableRotation = false,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Função para calcular a altura do elemento pai (ProjectsArea)
        const updateHeight = () => {
            const parentElement = container.parentElement;
            if (parentElement) {
                // Usa getBoundingClientRect para obter as dimensões reais
                const rect = parentElement.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(parentElement);
                const paddingTop = parseFloat(computedStyle.paddingTop);
                const paddingBottom = parseFloat(computedStyle.paddingBottom);
                
                // Calcula a altura total incluindo padding
                const totalHeight = rect.height + paddingTop + paddingBottom;
                setContainerHeight(totalHeight);
            }
        };

        // Atualiza a altura inicialmente
        updateHeight();
        
        // Adiciona listener para redimensionamento
        window.addEventListener('resize', updateHeight);
        
        // Usa ResizeObserver para detectar mudanças no elemento pai
        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
            resize(); // Chama resize quando o container muda de tamanho
        });
        if (container.parentElement) {
            resizeObserver.observe(container.parentElement);
        }

        const renderer = new Renderer({ 
            depth: false, 
            alpha: true,
            preserveDrawingBuffer: false,
            antialias: true
        });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);
        gl.clearColor(0, 0, 0, 0);

        const camera = new Camera(gl, { fov: 15 });
        camera.position.set(0, 0, cameraDistance);

        const resize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.perspective({ aspect: width / height });
        };
        window.addEventListener("resize", resize, false);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            mouseRef.current = { x, y };
        };

        if (moveParticlesOnHover) {
            // Adiciona o evento de mouse na área pai (ProjectsArea) para melhor responsividade
            const parentElement = container.parentElement;
            if (parentElement) {
                parentElement.addEventListener("mousemove", handleMouseMove);
                // Garante que o elemento pai tenha position relative
                if (getComputedStyle(parentElement).position === 'static') {
                    parentElement.style.position = "relative";
                }
            } else {
                container.addEventListener("mousemove", handleMouseMove);
            }
                        
            // Também adiciona o evento no próprio container como fallback
            container.addEventListener("mousemove", handleMouseMove);
        }

        const count = particleCount;
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 4);
        const colors = new Float32Array(count * 3);
        const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

        for (let i = 0; i < count; i++) {
            let x: number, y: number, z: number, len: number;
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                len = x * x + y * y + z * z;
            } while (len > 1 || len === 0);
            const r = Math.cbrt(Math.random());
            positions.set([x * r, y * r, z * r], i * 3);
            randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
            const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
            colors.set(col, i * 3);
        }

        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            random: { size: 4, data: randoms },
            color: { size: 3, data: colors },
        });

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uSpread: { value: particleSpread },
                uBaseSize: { value: particleBaseSize },
                uSizeRandomness: { value: sizeRandomness },
                uAlphaParticles: { value: alphaParticles ? 1 : 0 },
            },
            transparent: true,
            depthTest: false,
        });

        const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

        let animationFrameId: number;
        let lastTime = performance.now();
        let elapsed = 0;

        const update = (t: number) => {
            animationFrameId = requestAnimationFrame(update);
            const delta = t - lastTime;
            lastTime = t;
            elapsed += delta * speed;

            program.uniforms.uTime.value = elapsed * 0.001;

            if (moveParticlesOnHover) {
                particles.position.x = -mouseRef.current.x * particleHoverFactor;
                particles.position.y = -mouseRef.current.y * particleHoverFactor;
            } else {
                particles.position.x = 0;
                particles.position.y = 0;
            }

            if (!disableRotation) {
                particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
                particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
                particles.rotation.z += 0.01 * speed;
            }

            renderer.render({ scene: particles, camera });
        };

        animationFrameId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("resize", updateHeight);
            resizeObserver.disconnect();
            if (moveParticlesOnHover) {
                const parentElement = container.parentElement;
                if (parentElement) {
                    parentElement.removeEventListener("mousemove", handleMouseMove);
                }
                container.removeEventListener("mousemove", handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
            if (container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
            // Limpa o canvas do DOM se ainda estiver lá
            if (gl.canvas.parentNode) {
                gl.canvas.parentNode.removeChild(gl.canvas);
            }
        };
    }, [
        particleCount,
        particleSpread,
        speed,
        moveParticlesOnHover,
        particleHoverFactor,
        alphaParticles,
        particleBaseSize,
        sizeRandomness,
        cameraDistance,
        disableRotation,
    ]);

    // Efeito separado para atualizar a altura quando o componente montar
    useEffect(() => {
        const updateHeight = () => {
            const container = containerRef.current;
            if (container && container.parentElement) {
                const rect = container.parentElement.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(container.parentElement);
                const paddingTop = parseFloat(computedStyle.paddingTop);
                const paddingBottom = parseFloat(computedStyle.paddingBottom);
                const totalHeight = rect.height + paddingTop + paddingBottom;
                setContainerHeight(totalHeight);
            }
        };

        // Aguarda um pouco para garantir que o DOM esteja pronto
        const timer = setTimeout(updateHeight, 100);
        window.addEventListener('resize', updateHeight);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateHeight);
        };
    }, []);    

    return (
        <div
            ref={containerRef}
            className={`particles-container ${className}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: containerHeight > 0 ? `${containerHeight}px` : '100%',
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden'
            }}
        />
    );
};

export default Particles;
