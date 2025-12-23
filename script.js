document.addEventListener('DOMContentLoaded', () => {

    /* --- Particle System --- */
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(112, 0, 255, ';
                this.alpha = Math.random() * 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            for (let i = 0; i < 50; i++) particles.push(new Particle());
        }
        initParticles();

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            // Connect lines
            particles.forEach((a, index) => {
                for (let j = index; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(255,255,255,${0.1 - dist / 1500})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* --- Typewriter Effect --- */
    const typeTarget = document.getElementById('typewriter');
    if (typeTarget) {
        const words = ["Beynini Okuyun.", "Gizli Gücünü Açın.", "Arızalarını Silin.", "Performansını Görün."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* --- 3D Tilt Effect on Hero Image --- */
    const heroContainer = document.querySelector('.hero');
    const heroImg = document.getElementById('hero-product');

    if (heroContainer && heroImg) {
        heroContainer.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroImg.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroContainer.addEventListener('mouseleave', () => {
            heroImg.style.transform = `rotateY(0deg) rotateX(0deg)`; // Reset
            heroImg.style.transition = 'all 0.5s ease';
        });

        heroContainer.addEventListener('mouseenter', () => {
            heroImg.style.transition = 'none'; // Remove transition for smooth tracking
        });
    }

    /* --- Existing Logic Below --- */

    // WhatsApp Form Handler
    const form = document.getElementById('waForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('.wa-submit-btn');
            const originalHTML = btn.innerHTML;
            const nameInput = document.getElementById('name');
            const name = nameInput.value;

            if (!name) return;

            // Seller Phone Number
            const phoneNumber = '905555555555';

            let message = `Merhaba, ELM327 Pro hakkında teknik destek ve bilgi almak istiyorum.\n`;
            message += `İsim: ${name}\n`;
            message += `Aracım için uygun mudur?`;

            // Loading Animation
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bağlanıyor...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');

                btn.innerHTML = '<i class="fas fa-check"></i> Yönlendirildi';
                btn.style.background = '#00FF94'; // Success Green
                btn.style.color = '#000';

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = ''; // Revert to CSS default
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    form.reset();
                }, 3000);
            }, 1000);
        });
    }

    // Scroll Opacity for Navbar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(11, 15, 25, 0.95)';
        } else {
            nav.style.background = 'transparent';
        }
    });

    // Scroll Animations
    const styleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-row, .app-card, .tech-card, .compare-card, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        styleObserver.observe(el);
    });

    /* --- Live Simulation Logic (Ghost Cluster) --- */
    const simRpm = document.getElementById('sim-rpm');
    const simSpeed = document.getElementById('sim-speed');
    const simTemp = document.getElementById('sim-temp');
    const simVolt = document.getElementById('sim-volt');
    const simLoad = document.getElementById('sim-load');
    const needle = document.querySelector('.tacho-needle');

    if (simRpm) {
        // Variables for smoother simulation
        let currentRpm = 2000;
        let targetRpm = 3000;

        setInterval(() => {
            // Randomly change target RPM to simulate driving behavior (idle vs acceleration)
            if (Math.random() > 0.95) {
                // Random new target between 1500 and 5500 RPM
                targetRpm = Math.floor(Math.random() * (5500 - 1500 + 1) + 1500);
            }

            // Smoothly move current RPM towards target
            // Use simple easing: move 5% of the distance each frame
            const diff = targetRpm - currentRpm;
            currentRpm += diff * 0.05;

            // Needle Rotation Calculation
            // 0 RPM = -135deg
            // 8000 RPM = 135deg
            // Total Range = 270deg
            const deg = -135 + (currentRpm / 8000) * 270;

            if (needle) {
                // Using transform directly for smoothest 60fps performance
                needle.style.transform = `translateX(-50%) rotate(${deg}deg)`;
            }

            // Update Text Elements
            simRpm.innerText = Math.floor(currentRpm);

            // Speed roughly correlated to RPM (e.g. 3rd gear ratio)
            if (simSpeed) {
                simSpeed.innerText = Math.floor(currentRpm * 0.038);
            }

            // Load fluctuates based on RPM acceleration (diff)
            if (simLoad) {
                // Base load + acceleration factor
                let load = 20 + (currentRpm / 6000) * 40;
                if (diff > 500) load += 30; // High load if accelerating hard
                simLoad.innerText = Math.min(99, Math.floor(load)) + '%';
            }

        }, 30); // ~33 FPS update loop for smoothness

        // Slower update loop for slowly changing values
        setInterval(() => {
            if (simTemp) {
                // Temperature fluctuates slightly around 90C
                simTemp.innerText = Math.floor(88 + Math.random() * 5) + '°C';
            }
            if (simVolt) {
                // Voltage fluctuates slightly around 14.0V
                simVolt.innerText = (13.6 + Math.random() * 0.6).toFixed(1) + 'V';
            }
        }, 2000);
    }
});
