// Syncrony Landing Page JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupMobileMenu();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupNavbarScrollEffect();
    setupPartnerLogos();
    setupFormValidation();
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Scroll animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.stagger');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Navbar scroll effect
function setupNavbarScrollEffect() {
    let ticking = false;
    
    function updateNavbar() {
        const navbar = document.querySelector('nav');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/95', 'shadow-lg');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.add('bg-white/90');
            navbar.classList.remove('bg-white/95', 'shadow-lg');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Partner logos hover effects
function setupPartnerLogos() {
    const logoContainer = document.querySelector('.logo-scroll');
    if (!logoContainer) return;
    
    const logos = logoContainer.querySelectorAll('> div');
    
    logos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            logoContainer.style.animationPlayState = 'paused';
            logo.classList.add('hover-lift');
        });
        
        logo.addEventListener('mouseleave', () => {
            logoContainer.style.animationPlayState = 'running';
            logo.classList.remove('hover-lift');
        });
    });
}

// Form validation (if forms are added later)
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                submitForm(data);
            } else {
                showFormError('Please fill in all required fields.');
            }
        });
    });
}

// Form validation helper
function validateForm(data) {
    // Add validation logic here
    for (const [key, value] of Object.entries(data)) {
        if (!value.trim()) {
            return false;
        }
    }
    return true;
}

// Form submission
function submitForm(data) {
    // Add form submission logic here
    console.log('Form submitted:', data);
    showFormSuccess('Thank you for your submission!');
}

// Show form error
function showFormError(message) {
    console.error('Form error:', message);
    // Add UI feedback here
}

// Show form success
function showFormSuccess(message) {
    console.log('Form success:', message);
    // Add UI feedback here
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
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
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics event:', eventName, eventData);
    
    // Add analytics tracking here (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Performance monitoring
function monitorPerformance() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // Add web vitals monitoring
    }
    
    // Log performance metrics
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    });
}

// Initialize performance monitoring
monitorPerformance();

// Export functions for external use
window.SyncronyApp = {
    utils,
    trackEvent,
    scrollToElement: utils.scrollToElement
};
