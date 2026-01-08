// ======================
// Portfolio JavaScript
// ======================

// Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeParticles();
    initializeScrollAnimations();
    initializeNavigation();
    initializeProjectInteractions();
    initializeTypingEffect();
    initializePerformanceOptimizations();
    initializeAccessibility();
    initializeEasterEgg();
    initializeContactEnhancements();
});

// ======================
// Particle Animation System
// ======================
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = getParticleCount();
    const particles = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        particles.push(particle);
        particlesContainer.appendChild(particle);
    }

    // Animate particles with RAF for better performance
    animateParticles(particles);
}

function getParticleCount() {
    // Adjust particle count based on device performance
    const isMobile = window.innerWidth <= 768;
    const isLowPerformance = navigator.hardwareConcurrency <= 4;
    
    if (isMobile) return 30;
    if (isLowPerformance) return 40;
    return 60;
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and properties
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 4 + 4;
    
    // Apply styles
    particle.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    return particle;
}

function animateParticles(particles) {
    let lastTime = 0;
    
    function animate(currentTime) {
        if (currentTime - lastTime >= 16) { // ~60fps
            particles.forEach((particle, index) => {
                if (Math.random() > 0.995) { // Occasional twinkle effect
                    particle.style.opacity = Math.random() * 0.8 + 0.2;
                }
            });
            lastTime = currentTime;
        }
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

// ======================
// Smooth Scrolling & Navigation
// ======================
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const navbar = document.getElementById('navbar');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Dynamic navbar styling on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    function updateNavbar() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderColor = 'rgba(138, 43, 226, 0.5)';
            navbar.style.boxShadow = '0 12px 40px rgba(138, 43, 226, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.borderColor = 'rgba(138, 43, 226, 0.3)';
            navbar.style.boxShadow = '0 8px 32px rgba(138, 43, 226, 0.1)';
        }
        
        ticking = false;
    }
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Add active state feedback
        this.style.color = '#ff69b4';
        setTimeout(() => {
            this.style.color = '';
        }, 300);
    }
}

// ======================
// Scroll Animations (Intersection Observer)
// ======================
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero section
    initializeParallaxEffect();
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.skill, .project-card, .achievement-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.transform = 'translateY(0)';
                    child.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}

function initializeParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled <= heroHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        ticking = false;
    }
}

// ======================
// Project Card Interactions
// ======================
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', handleProjectHover);
        card.addEventListener('mouseleave', handleProjectLeave);
        
        // Touch support for mobile
        card.addEventListener('touchstart', handleProjectTouch, { passive: true });
    });
    
    // Tech tag interactions
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', handleTagHover);
        tag.addEventListener('mouseleave', handleTagLeave);
    });
}

function handleProjectHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create subtle glow effect based on mouse position
    card.style.transform = 'translateY(-15px) scale(1.02)';
    card.style.boxShadow = `
        0 25px 50px rgba(138, 43, 226, 0.3),
        ${x/10}px ${y/10}px 20px rgba(255, 105, 180, 0.2)
    `;
    
    // Animate project icon
    const icon = card.querySelector('.project-icon');
    if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    }
}

function handleProjectLeave(e) {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.boxShadow = '';
    
    const icon = card.querySelector('.project-icon');
    if (icon) {
        icon.style.transform = '';
    }
}

function handleProjectTouch(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-10px) scale(1.01)';
    
    setTimeout(() => {
        card.style.transform = '';
    }, 200);
}

function handleTagHover(e) {
    const tag = e.currentTarget;
    tag.style.transform = 'scale(1.1) translateY(-2px)';
    tag.style.boxShadow = '0 5px 15px rgba(138, 43, 226, 0.3)';
}

function handleTagLeave(e) {
    const tag = e.currentTarget;
    tag.style.transform = '';
    tag.style.boxShadow = '';
}

// ======================
// Typing Effect for Hero Subtitle
// ======================
function initializeTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    const typingSpeed = 80;
    const startDelay = 1500;
    
    // Clear text initially
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid #8a2be2';
    
    setTimeout(() => {
        typeText(subtitle, originalText, typingSpeed);
    }, startDelay);
}

function typeText(element, text, speed) {
    let i = 0;
    const cursor = '|';
    
    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1) + cursor;
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor and add breathing animation
            element.textContent = text;
            element.style.borderRight = 'none';
            element.style.animation = 'pulse 2s ease-in-out infinite';
        }
    }
    
    type();
}

// ======================
// Performance Optimizations
// ======================
function initializePerformanceOptimizations() {
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Throttled scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleOptimizedScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });
    
    // Preload critical images
    preloadCriticalAssets();
    
    // Initialize lazy loading for non-critical elements
    initializeLazyLoading();
}

function handleResize() {
    // Recalculate particle count on resize
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && Math.random() > 0.7) { // Only occasionally to avoid performance hit
        particlesContainer.innerHTML = '';
        initializeParticles();
    }
}

function handleOptimizedScroll() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Hide/show navigation based on scroll direction
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (scrolled > windowHeight * 0.5) {
            navbar.style.opacity = scrolled > (navbar.lastScrollTop || 0) ? '0.7' : '1';
        } else {
            navbar.style.opacity = '1';
        }
        navbar.lastScrollTop = scrolled;
    }
}

function preloadCriticalAssets() {
    // Preload any critical fonts or images that might be needed
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
}

function initializeLazyLoading() {
    // Implement lazy loading for achievement cards and other non-critical content
    const lazyElements = document.querySelectorAll('.achievement-card, .contact-item');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    lazyElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        lazyObserver.observe(el);
    });
}

// ======================
// Contact Form Enhancement
// ======================
function initializeContactEnhancements() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Add click feedback
            item.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
            
            // Track contact interactions (for analytics if implemented)
            const contactType = item.querySelector('.contact-label')?.textContent;
            console.log(`Contact interaction: ${contactType}`);
        });
    });
}

// ======================
// Accessibility Enhancements
// ======================
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #8a2be2 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// ======================
// Easter Egg - Konami Code
// ======================
function initializeEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create a fun particle explosion
    const particles = document.getElementById('particles');
    if (particles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #8a2be2, #ff69b4, #00bfff, #ffd700);
                border-radius: 50%;
                pointer-events: none;
                animation: explode ${Math.random() * 2 + 1}s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            particles.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }
        
        // Add explosion keyframes
        if (!document.getElementById('explosion-styles')) {
            const style = document.createElement('style');
            style.id = 'explosion-styles';
            style.textContent = `
                @keyframes explode {
                    to {
                        transform: translate(
                            ${Math.random() * 400 - 200}px,
                            ${Math.random() * 400 - 200}px
                        ) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Show easter egg message
    const message = document.createElement('div');
    message.textContent = '🚀 Developer Mode Activated! Thanks for exploring! 🚀';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(138, 43, 226, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        animation: fadeInOut 3s ease-in-out forwards;
    `;
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// ======================
// Utility Functions
// ======================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential testing or external use
window.PortfolioApp = {
    initializeParticles,
    initializeScrollAnimations,
    initializeNavigation,
    debounce,
    throttle
};
