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

// Early Access Modal Functions
function openEarlyAccess() {
    document.getElementById('earlyAccessModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeEarlyAccess() {
    document.getElementById('earlyAccessModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('earlyAccessModal');
    if (event.target === modal) {
        closeEarlyAccess();
    }
    
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    if (event.target === mobileOverlay) {
        closeMobileMenu();
    }
}

// Rotating Images Data
const rotatingData = [
    {
        image: "assets/images/berry.jpg",
        title: "Premium Plant Protein",
        description: "Our carefully selected plant proteins provide all essential amino acids your body needs for optimal performance and recovery.",
        icon: "leaf"
    },
    {
        image: "assets/images/tofu.jpg",
        title: "Organic Superfoods",
        description: "Packed with nutrient-dense superfoods like chia seeds, quinoa, and spirulina to fuel your active lifestyle naturally.",
        icon: "sparkles"
    },
    {
        image: "assets/images/chechollet.jpg",
        title: "Sustainable Nutrition",
        description: "Every ingredient is sourced sustainably, ensuring our planet stays healthy while you achieve your fitness goals.",
        icon: "globe"
    },
    {
        image: "assets/images/berry.jpg",
        title: "Energy & Recovery",
        description: "Scientifically formulated to provide sustained energy before workouts and accelerated recovery afterward.",
        icon: "zap"
    },
    {
        image: "assets/images/avocado.jpg",
        title: "Clean Ingredients",
        description: "No artificial preservatives, colors, or flavors. Just pure, wholesome nutrition that your body deserves.",
        icon: "shield-check"
    }
];

let currentRotatingIndex = 0;
let lucide; // Declare the lucide variable

// Function to update rotating content
function updateRotatingContent() {
    const img = document.getElementById('rotatingImg');
    const title = document.getElementById('rotatingTitle');
    const text = document.getElementById('rotatingText');
    
    if (img && title && text) {
        // Fade out
        img.style.opacity = '0';
        title.style.opacity = '0';
        text.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            const currentData = rotatingData[currentRotatingIndex];
            img.src = currentData.image;
            title.innerHTML = `<i data-lucide="${currentData.icon}" id="rotatingIcon"></i> ${currentData.title}`;
            text.textContent = currentData.description;
            
            // Re-initialize Lucide icons for the new icon
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Fade in
            img.style.opacity = '1';
            title.style.opacity = '1';
            text.style.opacity = '1';
            
            // Move to next item
            currentRotatingIndex = (currentRotatingIndex + 1) % rotatingData.length;
        }, 250);
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize Lucide icons
    if (typeof window.lucide !== 'undefined') {
        lucide = window.lucide;
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
    
    // Start rotating images every 3 seconds
    setInterval(updateRotatingContent, 3000); // 3 seconds
    
    // Early Access Form Submission
    const earlyAccessForm = document.querySelector('.early-access-form');
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Joining...';
            submitBtn.disabled = true;
            
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            setTimeout(() => {
                alert(`Thank you! We'll send early access information to ${email}`);
                closeEarlyAccess();
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

    // Product Card Interactions
    document.querySelectorAll('.btn-product').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('img').alt;
            
            // Add visual feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i data-lucide="loader-2"></i> Loading...';
            this.style.background = '#4a7625';
            
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Show notification
            showNotification(`Loading ${productName} details...`);
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
                showNotification(`${productName} - Feature coming soon!`);
                
                // Re-initialize icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 1000);
        });
    });

    // Initialize animations
    initializeAnimations();
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

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i data-lucide="check-circle"></i> ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #5B8F2D;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    document.body.appendChild(notification);
    
    // Initialize icons for notification
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Initialize Animations
function initializeAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    const benefitsCard = document.querySelector('.benefits-card');
    if (benefitsCard) {
        benefitsCard.style.opacity = '0';
        benefitsCard.style.transform = 'translateY(30px)';
        benefitsCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            benefitsCard.style.opacity = '1';
            benefitsCard.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('earlyAccessModal');
        if (modal && modal.style.display === 'block') {
            closeEarlyAccess();
        }
        
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .notification [data-lucide] {
        color: white !important;
        width: 18px;
        height: 18px;
    }
`;
document.head.appendChild(style);

// Button Loading States
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('btn-product')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});

// Pause carousel animation on hover
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.products-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});