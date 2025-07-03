// Mobile menu toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    navLinks.setAttribute('aria-hidden', isExpanded); // Toggle aria-hidden
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll with debouncing
let throttleTimer;
const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => {
        callback();
        throttleTimer = null;
    }, time);
};

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .movie-card, .category-card');

    elements.forEach(element => {
        // Get delay from data attribute, default to 0
        const delay = parseFloat(element.dataset.animationDelay || 0) * 1000;
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2; // Trigger when 80% of element is visible

        if (elementPosition < screenPosition && element.style.opacity !== '1') { // Check if not already animated
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
};

window.addEventListener('scroll', () => throttle(animateOnScroll, 100)); // Debounce to 100ms
window.addEventListener('load', animateOnScroll); // Run once on load to animate visible elements

// Movie carousel scroll buttons
const setupCarouselNav = (carouselId) => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const wrapper = carousel.closest('.movie-carousel-wrapper');
    const leftBtn = wrapper.querySelector('.movie-carousel-nav .left');
    const rightBtn = wrapper.querySelector('.movie-carousel-nav .right');
    const scrollAmount = carousel.offsetWidth * 0.7; // Scroll by about 70% of carousel width

    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
};

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    setupCarouselNav('trending-carousel');
    setupCarouselNav('new-releases-carousel');
});


