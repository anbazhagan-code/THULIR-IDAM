// Animations and Effects JavaScript

// GSAP Animation Library
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    } else {
        // Load GSAP from CDN
        loadGSAP();
    }
});

// Load GSAP from CDN
function loadGSAP() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
    script.onload = function() {
        // Load ScrollTrigger plugin
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
        scrollTriggerScript.onload = initGSAPAnimations;
        document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);
}

// Initialize GSAP Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        animateHeroSection();
        
        // Service cards animation
        animateServiceCards();
        
        // Stats counter animation
        animateStats();
        
        // Stagger animations for elements
        animateStaggerElements();
        
        // Parallax effects
        initParallax();
    }
}

// Hero Section Animations
function animateHeroSection() {
    // Animate hero elements with stagger
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-title', {
        duration: 1.2,
        y: 40,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-tagline', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1.2,
        ease: 'power3.out'
    });
}

// Service Cards Animation
function animateServiceCards() {
    gsap.utils.toArray('.service-preview-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: i * 0.1,
            ease: 'power3.out'
        });
        
        // Hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                animateCounter(stat, target);
            }
        });
    });
}

// Animate Counter Function
function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Stagger Animations
function animateStaggerElements() {
    // Animate program cards with stagger
    gsap.utils.toArray('.program-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Animate testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            scale: 0.9,
            opacity: 0,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });
}

// Parallax Effects
function initParallax() {
    // Create parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 50,
            ease: 'none'
        });
    }
}

// Floating Elements Animation
function initFloatingElements() {
    // Create floating background elements
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        // Create floating circles
        for (let i = 0; i < 5; i++) {
            const circle = document.createElement('div');
            circle.className = 'floating-circle';
            
            // Random properties
            const size = Math.random() * 100 + 50;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            // Apply styles
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.left = `${x}%`;
            circle.style.top = `${y}%`;
            circle.style.backgroundColor = i % 2 === 0 ? 'rgba(93, 95, 239, 0.1)' : 'rgba(245, 158, 11, 0.1)';
            
            // Add to hero section
            heroSection.appendChild(circle);
            
            // Animate with GSAP
            gsap.to(circle, {
                y: '+=100',
                rotation: Math.random() * 360,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: delay
            });
        }
    }
}

// Page Load Animation
function pageLoadAnimation() {
    // Create loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <i class="fas fa-spa"></i>
                <span>THULIR.IDAM</span>
            </div>
            <div class="loading-spinner"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                loader.style.display = 'none';
            }
        });
    });
}

// Initialize floating elements and page load animation
document.addEventListener('DOMContentLoaded', function() {
    initFloatingElements();
    pageLoadAnimation();
});

// Hover Effects for Buttons
function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const buttonRect = this.getBoundingClientRect();
            const x = e.clientX - buttonRect.left;
            const y = e.clientY - buttonRect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize button effects
initButtonHoverEffects();

// Text Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typewriter-text');
    
    if (typingElement) {
        const texts = typingElement.getAttribute('data-texts').split('|');
        let currentIndex = 0;
        
        function typeText(text, element, callback) {
            element.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(callback, 1500);
                }
            }
            
            type();
        }
        
        function deleteText(element, callback) {
            const text = element.textContent;
            let i = text.length;
            
            function deleteChar() {
                if (i > 0) {
                    element.textContent = text.substring(0, i - 1);
                    i--;
                    setTimeout(deleteChar, 50);
                } else {
                    setTimeout(callback, 500);
                }
            }
            
            deleteChar();
        }
        
        function typingLoop() {
            typeText(texts[currentIndex], typingElement, function() {
                deleteText(typingElement, function() {
                    currentIndex = (currentIndex + 1) % texts.length;
                    typingLoop();
                });
            });
        }
        
        typingLoop();
    }
}

// Initialize typing animation if element exists
const typingElement = document.querySelector('.typewriter-text');
if (typingElement) {
    initTypingAnimation();
}