// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
        }
    });
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonials Slider
const testimonials = [
    {
        content: "The service was exceptional! The maid was professional and thorough. I highly recommend Urban Clean.",
        author: "K.Praveena",
        role: "Homeowner",
        image: "images/c1.png"
    },
    {
        content: "Best cleaning service I've ever used. They're reliable, efficient, and the results are always amazing.",
        author: "G.Jaya Dev",
        role: "Business Owner",
        image: "images/c3.png"
    },
    {
        content: "I love how easy it is to book and manage my cleaning schedule. The team is always friendly and professional.",
        author: "N.Rama Rao",
        role: "Working Parent",
        image: "images/c2.png"
    }
];

let currentTestimonial = 0;
const testimonialCard = document.querySelector('.testimonial-card');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const content = testimonialCard.querySelector('.testimonial-content p');
    const author = testimonialCard.querySelector('.testimonial-author h4');
    const role = testimonialCard.querySelector('.testimonial-author p');
    const image = testimonialCard.querySelector('.testimonial-author img');
    
    content.textContent = testimonial.content;
    author.textContent = testimonial.author;
    role.textContent = testimonial.role;
    image.src = testimonial.image;
}

// Previous and Next buttons for testimonials
document.querySelector('.prev-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
});

document.querySelector('.next-testimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 5000);

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch('http://localhost:3016/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            formMessage.textContent = result.message;
            formMessage.className = 'form-message success';
            contactForm.reset();
        } else {
            formMessage.textContent = result.message;
            formMessage.className = 'form-message error';
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = 'An error occurred. Please try again later.';
        formMessage.className = 'form-message error';
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Search Functionality
const searchForm = document.querySelector('.search-container');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const service = searchForm.querySelector('select').value;
    const location = searchForm.querySelector('input[type="text"]').value;
    
    if (!location) {
        alert('Please enter your location');
        return;
    }
    
    // Here you would typically handle the search functionality
    alert(`Searching for ${service} services in ${location}`);
});

// Tooltip System
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}); 