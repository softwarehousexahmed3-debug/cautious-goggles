// Award-level JavaScript implementation for Sobia's Hijama Therapy website
// Optimized for performance, accessibility, and modern web standards

class HijamaWebsite {
    constructor() {
        this.isInitialized = false;
        this.animations = new Map();
        this.observers = new Map();
        this.eventListeners = new Map();
        this.init();
    }

    async init() {
        if (this.isInitialized) return;
        
        // Wait for DOM and libraries to be ready
        await this.waitForDependencies();
        
        // Initialize all components
        this.initPreloader();
        this.initGSAP();
        this.initThreeJS();
        this.initCursor();
        this.initHeader();
        this.initAnimations();
        this.initContactForm();
        this.initChatbot();
        this.initTestimonialCarousel();
        this.initFAQ();
        this.initScrollProgress();
        this.initThemeToggler();
        this.initMiscellaneous();
        this.initLoadingProgress();
        
        this.isInitialized = true;
        console.log('🎉 Hijama Website initialized successfully');
    }

    async waitForDependencies() {
        const checkDependencies = () => {
            return window.gsap && 
                   window.ScrollTrigger && 
                   window.THREE && 
                   document.readyState === 'complete';
        };

        if (checkDependencies()) return;

        return new Promise((resolve) => {
            const check = () => {
                if (checkDependencies()) {
                    resolve();
                } else {
                    requestAnimationFrame(check);
                }
            };
            check();
        });
    }

    initPreloader() {
        const loaderWrapper = document.getElementById('loader-wrapper');
        const numberElement = document.getElementById('counter-number');
        const numberFluidLightElement = document.getElementById('counter-number-fluid-light');
        const numberFluidDarkElement = document.getElementById('counter-number-fluid-dark');
        const wavePathLight = document.getElementById('wave-path-light');
        const wavePathDark = document.getElementById('wave-path-dark');

        if (!loaderWrapper || !numberElement) return;

        let animationFrameId;
        let startTime = null;
        const duration = 2500;

        const updateWaves = (progress) => {
            const time = Date.now() / 1200;
            const maxAmplitude = 0.20;
            const minAmplitude = 0.01;
            const amplitude = minAmplitude + (maxAmplitude - minAmplitude) * (1 - progress);
            const foamBaseHeight = (1 - progress) + amplitude;
            const frequency = 1.6;
            const slosh = 0.4;

            const x1 = 0.5 - slosh * Math.sin(time * frequency);
            const y1 = foamBaseHeight + amplitude * Math.cos(time * frequency * 1.1);
            const x2 = 0.5 + slosh * Math.cos(time * frequency);
            const y2 = foamBaseHeight - amplitude * Math.sin(time * frequency * 1.2);

            const lightPath = `M -0.2,${foamBaseHeight} C ${x1},${y1} ${x2},${y2} 1.2,${foamBaseHeight} L 1.2,1 L -0.2,1 Z`;
            wavePathLight?.setAttribute('d', lightPath);

            const bandThickness = 0.12;
            const darkBaseHeight = foamBaseHeight - bandThickness;
            const dark_y1 = y1 - bandThickness;
            const dark_y2 = y2 - bandThickness;

            const darkPath = `M -0.2,${darkBaseHeight} C ${x1},${dark_y1} ${x2},${dark_y2} 1.2,${darkBaseHeight} L 1.2,1 L -0.2,1 Z`;
            wavePathDark?.setAttribute('d', darkPath);
        };

        const updateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(progress * 100);

            numberElement.textContent = currentValue;
            numberFluidLightElement.textContent = currentValue;
            numberFluidDarkElement.textContent = currentValue;
            
            updateWaves(progress);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateCounter);
            } else {
                this.completePreloader(loaderWrapper, animationFrameId);
            }
        };

        animationFrameId = requestAnimationFrame(updateCounter);
    }

    completePreloader(loaderWrapper, animationFrameId) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        setTimeout(() => {
            gsap.to(loaderWrapper, {
                opacity: 0,
                scale: 1.1,
                duration: 0.75,
                ease: 'power2.inOut',
                onComplete: () => {
                    loaderWrapper.style.display = 'none';
                    document.body.classList.remove('preloader-active');
                    this.startMainAnimations();
                }
            });
        }, 800);
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Set default ease
        gsap.defaults({ ease: 'power3.out' });
        
        // Optimize ScrollTrigger
        ScrollTrigger.config({
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
            ignoreMobileResize: true
        });
    }

    startMainAnimations() {
        // Hero animations
        const tl = gsap.timeline();
        
        tl.from('.hero-content h1', { 
            duration: 1.2, 
            y: 80, 
            opacity: 0, 
            ease: 'power3.out' 
        })
        .from('.hero-content p', { 
            duration: 1, 
            y: 60, 
            opacity: 0, 
            ease: 'power3.out' 
        }, '-=0.6')
        .from('.hero-content .btn-primary, .hero-content .btn-secondary', { 
            duration: 0.8, 
            y: 40, 
            opacity: 0, 
            stagger: 0.2, 
            ease: 'back.out(1.7)' 
        }, '-=0.4');

        // Section animations
        this.initSectionAnimations();
    }

    initSectionAnimations() {
        // Section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Fade in elements
        gsap.utils.toArray('.fade-in').forEach((elem, index) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Service cards with enhanced animation
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50, rotationX: 15 },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Section reveals
        gsap.utils.toArray('.section-reveal').forEach(section => {
            gsap.fromTo(section,
                { opacity: 0.8, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    initThreeJS() {
        const container = document.getElementById('three-bg');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create particles
        const particleCount = window.innerWidth < 768 ? 1000 : 2000;
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.009,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        
        const particles = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particles);
        camera.position.z = 5;

        // Mouse tracking
        const mouse = { x: 0, y: 0 };
        
        const updateMouse = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        
        document.addEventListener('mousemove', updateMouse);
        this.eventListeners.set('mousemove', updateMouse);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            particles.rotation.y += 0.0005;
            
            if (mouse.x > 0) {
                particles.rotation.y += (mouse.x - window.innerWidth / 2) * 0.000005;
                particles.rotation.x += -(mouse.y - window.innerHeight / 2) * 0.000005;
            }
            
            renderer.render(scene, camera);
        };

        // Resize handler
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', onWindowResize);
        this.eventListeners.set('resize', onWindowResize);

        animate();
    }

    initCursor() {
        // Only initialize cursor on desktop devices
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const cursorOuter = document.querySelector('.cursor-outer');
        const cursorInner = document.querySelector('.cursor-inner');
        
        if (!cursorOuter || !cursorInner) return;

        let mouseX = 0, mouseY = 0;
        let outerX = 0, outerY = 0;
        
        const updateCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        
        document.addEventListener('mousemove', updateCursor);
        this.eventListeners.set('cursor-mousemove', updateCursor);
        
        // Smooth cursor animation
        gsap.ticker.add(() => {
            outerX += (mouseX - outerX) * 0.1;
            outerY += (mouseY - outerY) * 0.1;
            
            gsap.set(cursorOuter, { x: outerX, y: outerY });
            gsap.set(cursorInner, { x: mouseX, y: mouseY });
        });

        // Cursor interactions
        const interactiveElements = 'a, button, .service-card, .testimonial-card, .faq-question';
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target instanceof Element && e.target.matches(interactiveElements)) {
                gsap.to(cursorOuter, { scale: 1.5, duration: 0.3 });
                gsap.to(cursorInner, { scale: 0.5, duration: 0.3 });
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target instanceof Element && e.target.matches(interactiveElements)) {
                gsap.to(cursorOuter, { scale: 1, duration: 0.3 });
                gsap.to(cursorInner, { scale: 1, duration: 0.3 });
            }
        }, true);
    }

    initHeader() {
        const header = document.querySelector('.glass-header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
                header.style.background = 'rgba(128, 0, 0, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'rgba(128, 0, 0, 0.1)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = 'none';
            }

            // Hide/show header on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                gsap.to(header, { y: -100, duration: 0.3 });
            } else {
                gsap.to(header, { y: 0, duration: 0.3 });
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        this.eventListeners.set('header-scroll', onScroll);

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            const clickHandler = (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: target, offsetY: 80 },
                        ease: 'power3.inOut'
                    });
                }
            };
            
            anchor.addEventListener('click', clickHandler);
            this.eventListeners.set(`nav-${anchor.href}`, clickHandler);
        });
    }

    initAnimations() {
        // Magic UI headline animation
        const headlineElement = document.getElementById('magic-ui-headline');
        if (headlineElement) {
            const texts = [
                "Revitalize Your Health",
                "Naturally",
                "Experience Healing",
                "With Sobia's Hijama Therapy"
            ];
            let textIndex = 0;

            const animateHeadlineText = () => {
                gsap.to(headlineElement, {
                    opacity: 0,
                    y: -30,
                    duration: 0.6,
                    ease: 'power2.in',
                    onComplete: () => {
                        headlineElement.textContent = texts[textIndex];
                        textIndex = (textIndex + 1) % texts.length;
                        gsap.to(headlineElement, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        });
                    }
                });
            };

            // Start animation after preloader
            setTimeout(() => {
                setInterval(animateHeadlineText, 4000);
            }, 3000);
        }

        // Service card hover animations
        this.initServiceCardAnimations();
        
        // Rough notation highlighters
        this.initHighlighters();
    }

    initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const mouseEnterHandler = () => {
                gsap.to(card, {
                    rotationX: -8,
                    rotationY: 8,
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(128, 0, 0, 0.25)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            };

            const mouseLeaveHandler = () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            };

            card.addEventListener('mouseenter', mouseEnterHandler);
            card.addEventListener('mouseleave', mouseLeaveHandler);
            
            this.eventListeners.set(`service-card-${card.dataset.id || Math.random()}`, {
                mouseenter: mouseEnterHandler,
                mouseleave: mouseLeaveHandler
            });
        });
    }

    async initHighlighters() {
        try {
            const { annotate } = await import('https://unpkg.com/rough-notation@0.5.1/lib/rough-notation.esm.js');
            
            const highlighters = document.querySelectorAll('.highlighter');
            highlighters.forEach(el => {
                const annotation = annotate(el, {
                    type: 'highlight',
                    color: 'rgba(193, 154, 107, 0.3)',
                    animationDuration: 1000
                });
                
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 80%',
                    onEnter: () => annotation.show()
                });
            });
        } catch (error) {
            console.warn('Rough notation failed to load:', error);
        }
    }

    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        // Set minimum date to today
        const preferredDateInput = document.getElementById('preferred-date');
        if (preferredDateInput) {
            const today = new Date().toISOString().split('T')[0];
            preferredDateInput.min = today;
        }

        // Form validation
        const validators = {
            name: (value) => value.trim().length > 0,
            phone: (value) => this.normalizePakistanMobile(value) !== null,
            email: (value) => !value.trim() || /\S+@\S+\.\S+/.test(value)
        };

        // Real-time validation
        Object.keys(validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            if (field && errorElement) {
                const validateField = () => {
                    const isValid = validators[fieldName](field.value);
                    
                    field.classList.toggle('invalid', !isValid);
                    field.classList.toggle('valid', isValid && field.value.trim());
                    errorElement.classList.toggle('show-error', !isValid);
                };
                
                field.addEventListener('input', validateField);
                field.addEventListener('blur', validateField);
            }
        });

        // Service selection animation
        const serviceOptions = document.querySelectorAll('.service-option');
        serviceOptions.forEach(option => {
            const checkbox = option.querySelector('input[type="checkbox"]');
            
            const changeHandler = () => {
                if (checkbox.checked) {
                    option.classList.add('selected');
                    gsap.fromTo(option, 
                        { scale: 0.98 }, 
                        { scale: 1.03, duration: 0.2, ease: 'back.out(1.7)' }
                    );
                } else {
                    option.classList.remove('selected');
                    gsap.to(option, { scale: 1, duration: 0.2 });
                }
            };
            
            checkbox.addEventListener('change', changeHandler);
        });

        // Form submission
        const submitHandler = (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!validators.name(data.name) || !validators.phone(data.phone) || !validators.email(data.email)) {
                this.showFormErrors();
                return;
            }

            this.generateWhatsAppMessage(data);
        };

        contactForm.addEventListener('submit', submitHandler);

        // Copy button functionality
        const copyButton = document.getElementById('copyButton');
        if (copyButton) {
            const copyHandler = async () => {
                const whatsappMessage = document.getElementById('whatsappMessage');
                try {
                    await navigator.clipboard.writeText(whatsappMessage.value);
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy Message';
                    }, 2000);
                } catch (error) {
                    console.warn('Copy failed:', error);
                    whatsappMessage.select();
                    copyButton.textContent = 'Text selected - Press Ctrl+C';
                }
            };
            
            copyButton.addEventListener('click', copyHandler);
        }
    }

    normalizePakistanMobile(raw) {
        if (!raw) return null;
        let digits = raw.replace(/[^0-9]/g, '');
        
        if (digits.startsWith('00')) digits = digits.slice(2);
        if (digits.startsWith('92')) {
            // Already in international format
        } else if (digits.startsWith('0') && digits.length === 11 && digits[1] === '3') {
            digits = '92' + digits.slice(1);
        } else if (digits.length === 10 && digits[0] === '3') {
            digits = '92' + digits;
        }
        
        return /^92(3\d{9})$/.test(digits) ? digits : null;
    }

    showFormErrors() {
        const requiredFields = ['name', 'phone'];
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            if (field && !field.value.trim()) {
                field.classList.add('invalid');
                errorElement?.classList.add('show-error');
            }
        });
    }

    generateWhatsAppMessage(data) {
        const selectedServices = Array.from(document.querySelectorAll('.form-checkbox:checked'))
            .map(cb => cb.value);
        
        const servicesText = selectedServices.length > 0 
            ? `I am interested in the following services: ${selectedServices.join(', ')}.`
            : "I'm interested in learning more about Hijama.";
        
        const preferredDate = data['preferred-date'] 
            ? `\nPreferred date: ${data['preferred-date']}`
            : '';
        
        const additionalMessage = data.message?.trim() 
            ? `\nAdditional message: ${data.message.trim()}`
            : '';
        
        const emailText = data.email?.trim() 
            ? `\nMy email is ${data.email}.`
            : '';

        const message = `Assalam-o-Alaikum Sobia,

My name is ${data.name}.
My phone number is ${data.phone}.${emailText}

${servicesText}${preferredDate}${additionalMessage}

Please let me know about your availability for a session.

JazakAllah Khair.`;

        // Display the message
        const messageOutput = document.getElementById('messageOutput');
        const whatsappMessage = document.getElementById('whatsappMessage');
        const whatsappLink = document.getElementById('whatsappLink');
        
        whatsappMessage.value = message;
        messageOutput.classList.remove('hidden');
        
        const whatsappNumber = '923170122099';
        whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Smooth scroll to message
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: messageOutput, offsetY: 100 },
            ease: 'power3.inOut'
        });
    }

    initChatbot() {
        const chatbotToggler = document.querySelector('.chatbot-toggler');
        const chatbot = document.querySelector('.chatbot');
        const chatInput = document.querySelector('.chat-input textarea');
        const sendChatBtn = document.querySelector('#send-btn');
        const chatbox = document.querySelector('.chatbox');
        const chatOptionsContainer = document.querySelector('.chat-options');

        if (!chatbotToggler || !chatbot) return;

        const initialOptions = [
            { text: "Services?", query: "services" },
            { text: "Pricing?", query: "pricing" },
            { text: "How to Book?", query: "book" },
            { text: "Timings?", query: "hours" }
        ];

        const createChatLi = (message, className) => {
            const chatLi = document.createElement('li');
            chatLi.classList.add('chat', className);
            
            if (className === 'outgoing') {
                const p = document.createElement('p');
                p.textContent = message;
                chatLi.appendChild(p);
            } else {
                const icon = document.createElement('span');
                icon.className = 'icon';
                icon.innerHTML = '<i class="fas fa-robot"></i>';
                chatLi.appendChild(icon);
                
                if (message === 'thinking') {
                    const typingDiv = document.createElement('div');
                    typingDiv.className = 'typing-indicator';
                    typingDiv.innerHTML = '<span></span><span></span><span></span>';
                    chatLi.appendChild(typingDiv);
                } else {
                    const p = document.createElement('p');
                    if (message.includes('<a href=')) {
                        p.innerHTML = message;
                    } else {
                        p.textContent = message;
                    }
                    chatLi.appendChild(p);
                }
            }
            
            gsap.from(chatLi, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
            return chatLi;
        };

        const displayInitialOptions = () => {
            chatOptionsContainer.innerHTML = '';
            initialOptions.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.text;
                button.addEventListener('click', () => handleChat(option.query, option.text));
                chatOptionsContainer.appendChild(button);
            });
        };

        const generateResponse = (thinkingLi, userMessage) => {
            const responses = {
                salam: "Wa'alaikum assalam! How can I assist you today? You can ask about my services, prices, or how to book an appointment.",
                service: "I offer a range of Hijama therapies including General Body, Sunnah Points, Pain Relief, Cosmetic, Head/Migraine, and Fertility/Hormonal balance. You can see more details in the <a href='#services' style='color: var(--secondary); text-decoration: underline;'>Services Section</a>.",
                price: "Our sessions start from PKR 3,000. The final price depends on the type of therapy and the number of cups used. For a detailed quote, please fill out the contact form or call us.",
                book: "You can book an appointment by filling out the <a href='#contact' style='color: var(--secondary); text-decoration: underline;'>contact form</a> on our website or by calling me directly at +92 317 0122099.",
                hour: "Our clinic is open from 11 AM to 7 PM, Monday to Saturday. We recommend booking an appointment in advance to ensure availability.",
                hijama: "Hijama (cupping therapy) is an ancient healing practice that involves placing cups on the skin to create suction. It's known to help with pain, inflammation, blood flow, relaxation, and overall well-being."
            };

            const lowerCaseMessage = userMessage.toLowerCase();
            let response = "I'm sorry, I didn't quite understand that. You can ask me about services, pricing, or how to book an appointment. Or, you can call us directly at +92 317 0122099 for more specific questions.";

            for (const [key, value] of Object.entries(responses)) {
                if (lowerCaseMessage.includes(key)) {
                    response = value;
                    break;
                }
            }

            // Replace thinking indicator with response
            thinkingLi.innerHTML = '';
            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.innerHTML = '<i class="fas fa-robot"></i>';
            thinkingLi.appendChild(icon);
            
            const p = document.createElement('p');
            if (response.includes('<a href=')) {
                p.innerHTML = response;
            } else {
                p.textContent = response;
            }
            thinkingLi.appendChild(p);
            
            chatbox.scrollTo(0, chatbox.scrollHeight);
        };

        const handleChat = (query, displayText) => {
            const userMessage = query.trim();
            if (!userMessage) return;

            const messageToDisplay = displayText || userMessage;
            chatbox.appendChild(createChatLi(messageToDisplay, 'outgoing'));
            chatbox.scrollTo(0, chatbox.scrollHeight);
            
            if (chatInput) {
                chatInput.value = '';
                chatInput.dispatchEvent(new Event('input'));
            }
            
            chatOptionsContainer.innerHTML = '';

            setTimeout(() => {
                const thinkingLi = createChatLi('thinking', 'incoming');
                chatbox.appendChild(thinkingLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                
                setTimeout(() => {
                    generateResponse(thinkingLi, userMessage);
                    displayInitialOptions();
                }, 1000);
            }, 500);
        };

        // Event listeners
        if (chatInput && sendChatBtn) {
            chatInput.addEventListener('input', () => {
                sendChatBtn.style.visibility = chatInput.value.trim() ? 'visible' : 'hidden';
            });

            sendChatBtn.addEventListener('click', () => handleChat(chatInput.value));
            
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleChat(chatInput.value);
                }
            });
        }

        chatbotToggler.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.toggle('show-chatbot');
            document.body.classList.toggle('chatbot-open');
        });

        chatbot.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('show-chatbot') && !chatbot.contains(e.target)) {
                document.body.classList.remove('show-chatbot');
                document.body.classList.remove('chatbot-open');
            }
        });

        displayInitialOptions();
    }

    initTestimonialCarousel() {
        const carousel = document.getElementById('testimonial-carousel');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        
        if (!carousel || !prevBtn || !nextBtn) return;

        const testimonialItems = Array.from(carousel.children);
        let currentIndex = 0;
        let visibleCards = 1;
        let maxIndex = testimonialItems.length - 1;

        const setupCarousel = () => {
            if (window.innerWidth >= 1024) {
                visibleCards = 3;
            } else if (window.innerWidth >= 768) {
                visibleCards = 2;
            } else {
                visibleCards = 1;
            }
            
            maxIndex = Math.max(0, testimonialItems.length - visibleCards);
            
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            updateCarouselPosition();
        };

        const updateCarouselPosition = () => {
            let scrollAmount = 0;
            
            if (testimonialItems.length > 0 && currentIndex >= 0 && currentIndex < testimonialItems.length) {
                const currentItem = testimonialItems[currentIndex];
                if (currentItem && currentItem.offsetParent !== null) {
                    scrollAmount = currentItem.offsetLeft;
                }
            }
            
            gsap.to(carousel, {
                x: -scrollAmount,
                duration: 0.6,
                ease: 'power3.inOut'
            });

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === maxIndex;
            
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        };

        const handleNext = () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarouselPosition();
            }
        };

        const handlePrev = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
            }
        };

        nextBtn.addEventListener('click', handleNext);
        prevBtn.addEventListener('click', handlePrev);

        // Keyboard navigation
        carousel.setAttribute('tabindex', '0');
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-label', 'Testimonials carousel');
        
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        });

        const resizeHandler = () => setupCarousel();
        window.addEventListener('resize', resizeHandler);
        this.eventListeners.set('carousel-resize', resizeHandler);

        setupCarousel();
    }

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;

            const clickHandler = () => {
                const currentlyActive = document.querySelector('.faq-item.active');
                
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                    const activeAnswer = currentlyActive.querySelector('.faq-answer');
                    gsap.to(activeAnswer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
                }
                
                const isActive = item.classList.contains('active');
                item.classList.toggle('active');
                
                if (isActive) {
                    gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
                } else {
                    gsap.set(answer, { height: 'auto' });
                    gsap.from(answer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
                }
            };
            
            question.addEventListener('click', clickHandler);
        });
    }

    initScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (!scrollProgress) return;

        let ticking = false;

        const updateProgress = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            
            scrollProgress.style.width = `${Math.min(progress, 100)}%`;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        this.eventListeners.set('scroll-progress', onScroll);
    }

    initThemeToggler() {
        const themeToggler = document.getElementById('theme-toggler');
        if (!themeToggler) return;

        const toggleTheme = () => {
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    document.documentElement.classList.toggle('dark');
                });
            } else {
                document.documentElement.classList.toggle('dark');
            }
        };

        themeToggler.addEventListener('click', toggleTheme);
    }

    initMiscellaneous() {
        // Update year in footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
            });
            
            button.addEventListener('mousedown', () => {
                gsap.to(button, { scale: 0.95, duration: 0.1 });
            });
            
            button.addEventListener('mouseup', () => {
                gsap.to(button, { scale: 1.05, duration: 0.1 });
            });
        });

        // Intersection Observer for section reveals
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('section:not(.hero-section)').forEach(section => {
            section.classList.add('section-reveal');
            sectionObserver.observe(section);
        });

        this.observers.set('section-reveal', sectionObserver);
    }

    initLoadingProgress() {
        const loadingProgress = document.getElementById('loading-progress');
        if (!loadingProgress) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loadingProgress.style.width = '0%';
                }, 500);
            }
            loadingProgress.style.width = `${progress}%`;
        }, 200);
    }

    // Cleanup method for proper resource management
    destroy() {
        // Clear all event listeners
        this.eventListeners.forEach((handler, key) => {
            if (typeof handler === 'function') {
                // Remove specific event listeners
                const [element, event] = key.split('-');
                document.removeEventListener(event, handler);
            }
        });

        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });

        // Kill GSAP animations
        gsap.killTweensOf('*');
        ScrollTrigger.killAll();

        this.isInitialized = false;
    }
}

// Initialize the website when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hijamaWebsite = new HijamaWebsite();
    });
} else {
    window.hijamaWebsite = new HijamaWebsite();
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HijamaWebsite;
}