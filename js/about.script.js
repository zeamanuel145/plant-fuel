// Theme Switcher
function initTheme() {
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark-theme')) {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile Menu Functions
function openMobileMenu() {
    document.querySelector('.mobile-menu-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize Lucide icons
    const lucide = window.lucide; // Declare the lucide variable here
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Theme toggle event listeners
    document.querySelectorAll('.theme-toggle').forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    // Mobile menu event listeners
    document.querySelector('.mobile-menu-btn').addEventListener('click', openMobileMenu);
    document.querySelector('.mobile-menu-close').addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-menu .nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = this.querySelector('input[placeholder="First Name"]').value;
            const lastName = this.querySelector('input[placeholder="Last Name"]').value;
            const email = this.querySelector('input[placeholder="Email Address"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Get selected interests
            const interests = [];
            this.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Simulate form submission
            setTimeout(() => {
                let interestText = interests.length > 0 ? ` We'll keep you updated about: ${interests.join(', ')}.` : '';
                alert(`Thank you, ${firstName}! Your message has been sent.${interestText} We'll get back to you soon.`);
                this.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                
                // Re-initialize icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 1500);
        });
    }
    
    // Animate cards on scroll
    const whyCards = document.querySelectorAll('.why-card');
    if (whyCards.length) {
        whyCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backdropFilter = 'blur(10px)';
        if (document.documentElement.classList.contains('dark-theme')) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        navbar.style.backdropFilter = 'none';
        if (document.documentElement.classList.contains('dark-theme')) {
            navbar.style.background = '#1a1a1a';
        } else {
            navbar.style.background = '#ffffff';
        }
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Close mobile menu when clicking outside
window.onclick = function(event) {
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    if (event.target === mobileOverlay) {
        closeMobileMenu();
    }
}