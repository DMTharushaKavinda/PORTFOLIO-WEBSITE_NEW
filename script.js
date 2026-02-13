// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Navbar Glass Effect on Scroll
const navbar = document.getElementById('navbar');

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-card');
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('glass-card');
        navbar.classList.remove('shadow-lg');
    }
}

window.addEventListener('scroll', () => {
    reveal();
    handleScroll();
});

// Initial check
reveal();
handleScroll();

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitBtnText = submitBtn.querySelector('span');
const loadingSpinner = document.getElementById('loading-spinner');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // UI Feedback
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending...';
        loadingSpinner.classList.remove('hidden');
        formStatus.classList.add('hidden');

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formsubmit.co/ajax/tharushakavinda161@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success === 'true' || response.ok) {
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.classList.remove('hidden', 'bg-red-500/20', 'text-red-400');
                formStatus.classList.add('bg-emerald-500/20', 'text-emerald-400');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Something went wrong. Please try again later.';
            formStatus.classList.remove('hidden', 'bg-emerald-500/20', 'text-emerald-400');
            formStatus.classList.add('bg-red-500/20', 'text-red-400');
        } finally {
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Send Message';
            loadingSpinner.classList.add('hidden');
            
            // Hide status after a few seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    });
}
