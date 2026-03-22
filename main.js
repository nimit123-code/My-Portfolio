/**
 * NIMIT GOEL - PORTFOLIO JS
 * Features: Three.js background, GSAP scroll animations, Custom Cursor, 3D tilt effects
 */

document.addEventListener("DOMContentLoaded", () => {

    // --- 0. RESUME PDF URL (GitHub Pages project sites) ---
    // PDF is at repo root: resume.pdf (upload only this file next to index.html).
    // Relative "resume.pdf" can break without trailing slash on project URL; fix path on github.io.
    const resumeLink = document.getElementById("resume-pdf-link");
    if (resumeLink) {
        const host = window.location.hostname || "";
        if (host.endsWith("github.io")) {
            const parts = window.location.pathname.split("/").filter(Boolean);
            const repo = parts[0];
            if (repo) {
                resumeLink.setAttribute("href", `/${repo}/resume.pdf`);
            }
        }
    }
    
    // --- 1. CUSTOM CURSOR & HOVER EFFECTS ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Simple subtle lag for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, {
                duration: 500,
                fill: "forwards"
            });
        });

        // Hover effect for interactive elements
        const iterables = document.querySelectorAll('a, button, .tilt-card');
        iterables.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
                cursorDot.style.backgroundColor = '#7f8cff'; // accent color
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                cursorDot.style.backgroundColor = '#f5f5f7';
            });
        });
    }

    // --- 2. NAVBAR SCROLL & MOBILE MENU ---
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Add required third span if not exists
        if(hamburger.children.length === 2) {
            let span = document.createElement('span');
            hamburger.appendChild(span);
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 3. GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Stagger
    gsap.from(".stagger-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5
    });

    // Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // --- 4. 3D TILT EFFECT ON CARDS ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if(!isMobile) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate tilt limits
                const tiltX = ((y - centerY) / centerY) * -10;
                const tiltY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Adjust glow position
                const glow = card.querySelector('.project-glow');
                if(glow) {
                    glow.style.top = `${y}px`;
                    glow.style.left = `${x}px`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // --- 5. GLOBAL WHITE PARTICLE FIELD (FULL SITE) ---
    initGlobalCursorParticles();

    // --- 6. THREE.JS 3D BACKGROUND PARTICLES ---
    initThreeJsBackground();

    function initGlobalCursorParticles() {
        const container = document.getElementById('global-particles');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.z = 32;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const particlesCount = window.innerWidth < 768 ? 700 : 1800;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const basePositions = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const x = (Math.random() - 0.5) * 120;
            const y = (Math.random() - 0.5) * 120;
            const z = (Math.random() - 0.5) * 40;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            basePositions[i3] = x;
            basePositions[i3 + 1] = y;
            basePositions[i3 + 2] = z;

            sizes[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.12,
            transparent: true,
            opacity: 0.62,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        });

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            targetX += ((mouseX / windowHalfX) * 8 - targetX) * 0.035;
            targetY += ((-mouseY / windowHalfY) * 5 - targetY) * 0.035;

            particles.position.x += (targetX - particles.position.x) * 0.08;
            particles.position.y += (targetY - particles.position.y) * 0.08;
            particles.rotation.y = t * 0.006;
            particles.rotation.x = t * 0.003;

            const pos = geometry.attributes.position.array;
            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                const drift = (sizes[i] + 0.15) * 0.08;

                pos[i3 + 1] = basePositions[i3 + 1] + Math.sin(t * 0.5 + i * 0.03) * drift;
                pos[i3] = basePositions[i3] + Math.cos(t * 0.4 + i * 0.02) * drift;
            }
            geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function initThreeJsBackground() {
        const container = document.getElementById('canvas-container');
        if(!container) return;

        const scene = new THREE.Scene();
        
        // Setup Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Setup Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle System
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 400 : 1500;
        
        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        const color1 = new THREE.Color('#7f8cff'); // soft indigo
        const color2 = new THREE.Color('#6f82c6'); // slate blue
        const color3 = new THREE.Color('#4f9d96'); // muted teal

        for(let i = 0; i < particlesCount * 3; i+=3) {
            // Distribute particles in a wide space
            posArray[i] = (Math.random() - 0.5) * 100;     // x
            posArray[i+1] = (Math.random() - 0.5) * 100;   // y
            posArray[i+2] = (Math.random() - 0.5) * 50;    // z

            // Randomize colors
            const mixRatio = Math.random();
            const particleColor = new THREE.Color().copy(color1).lerp(
                Math.random() > 0.5 ? color2 : color3, 
                mixRatio
            );
            
            colorsArray[i] = particleColor.r;
            colorsArray[i+1] = particleColor.g;
            colorsArray[i+2] = particleColor.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        // Create material with circular shape using alpha map or simple points
        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.52,
            blending: THREE.NormalBlending
        });

        // Add subtle larger floating orbs
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Grid/Wireframe globe (optional, adds to the "$100k" tech feel)
        const globeGeometry = new THREE.IcosahedronGeometry(15, 2);
        const globeMaterial = new THREE.MeshBasicMaterial({
            color: 0x7f8cff,
            wireframe: true,
            transparent: true,
            opacity: 0.035
        });
        const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
        globeMesh.position.x = 15;
        scene.add(globeMesh);

        // Mouse interaction for ThreeJS
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        // Animation Loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Slowly rotate the entire particle system
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            
            // Rotate the globe
            globeMesh.rotation.y = elapsedTime * 0.05;
            globeMesh.rotation.x = elapsedTime * 0.02;

            // Ease rotation towards mouse position
            particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

            renderer.render(scene, camera);
        }

        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});