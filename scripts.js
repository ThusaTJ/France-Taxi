// ====================================
// NAVIGATION SCROLL EFFECT
// ====================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore empty hash links
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            // Smooth scroll to target
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// BOOKING FORM VALIDATION & SUBMISSION
// ====================================

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const pickup = document.getElementById('pickupLocation').value;
        const dropoff = document.getElementById('dropoffLocation').value;
        const date = document.getElementById('pickupDate').value;
        const time = document.getElementById('pickupTime').value;
        
        // Simple validation
        if (!pickup || !dropoff || !date || !time) {
            alert('Please fill in all fields to check the price.');
            return;
        }
        
        // Simulate price check (in real implementation, this would be an API call)
        console.log('Booking details:', { pickup, dropoff, date, time });
        alert(`Thank you! We're checking prices for your trip from ${pickup} to ${dropoff} on ${date} at ${time}.\n\nA confirmation will be sent to your email shortly.`);
        
        // Reset form
        bookingForm.reset();
    });
}

// Set minimum date to today for date picker
const pickupDateInput = document.getElementById('pickupDate');
if (pickupDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);
}

// ====================================
// TESTIMONIALS CAROUSEL
// ====================================
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
function showTestimonial(index) {
// Remove active class from all testimonials
testimonials.forEach(testimonial => {
testimonial.classList.remove('active');
});
// Add active class to current testimonial
if (testimonials[index]) {
    testimonials[index].classList.add('active');
}
}
// Previous button
const prevBtn = document.getElementById('prevTestimonial');
if (prevBtn) {
prevBtn.addEventListener('click', function() {
currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
showTestimonial(currentTestimonial);
});
}
// Next button
const nextBtn = document.getElementById('nextTestimonial');
if (nextBtn) {
nextBtn.addEventListener('click', function() {
currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
showTestimonial(currentTestimonial);
});
}
// Auto-rotate testimonials every 5 seconds
let testimonialInterval = setInterval(function() {
currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
showTestimonial(currentTestimonial);
}, 5000);
// Pause auto-rotation on hover
const testimonialsSection = document.querySelector('.testimonials-carousel');
if (testimonialsSection) {
testimonialsSection.addEventListener('mouseenter', function() {
clearInterval(testimonialInterval);
});
testimonialsSection.addEventListener('mouseleave', function() {
    testimonialInterval = setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 5000);
});
}
// ====================================
// FLEET CARD HOVER EFFECTS
// ====================================
const fleetCards = document.querySelectorAll('.fleet-card');
fleetCards.forEach(card => {
card.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-10px)';
});
card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});
});
// ====================================
// LOCATION CARD INTERACTIVE EFFECTS
// ====================================
const locationCards = document.querySelectorAll('.location-card');
locationCards.forEach(card => {
const bookBtn = card.querySelector('.btn');
if (bookBtn) {
    bookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const locationName = card.querySelector('.location-name').textContent;
        alert(`Booking transfer to ${locationName}. Redirecting to booking form...`);
        
        // Scroll to booking form
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
});
// ====================================
// SCROLL ANIMATIONS (Fade in on scroll)
// ====================================
function isElementInViewport(el) {
const rect = el.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
}
function checkScroll() {
const elements = document.querySelectorAll('.fleet-card, .service-card, .privilege-card, .location-card');
elements.forEach(element => {
    if (isElementInViewport(element)) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
});
}
// Initial setup for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
const elements = document.querySelectorAll('.fleet-card, .service-card, .privilege-card, .location-card');
elements.forEach(element => {
element.style.opacity = '0';
element.style.transform = 'translateY(30px)';
element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
checkScroll();
});
window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);
// ====================================
// MOBILE MENU CLOSE ON CLICK OUTSIDE
// ====================================
document.addEventListener('click', function(event) {
const navbar = document.querySelector('.navbar');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    if (!navbar.contains(event.target)) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }
}
});
// ====================================
// FORM INPUT FOCUS EFFECTS
// ====================================
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
input.addEventListener('focus', function() {
this.parentElement.classList.add('focused');
});
input.addEventListener('blur', function() {
    if (!this.value) {
        this.parentElement.classList.remove('focused');
    }
});
});
// ====================================
// CONSOLE WELCOME MESSAGE
// ====================================
console.log('%cWelcome to Groupe Blue Van Paris', 'color: #D1AE6C; font-size: 20px; font-weight: bold;');
console.log('%cPremium Transfer Services in Paris', 'color: #666; font-size: 14px;');