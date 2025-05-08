// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading spinner
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Hide loading spinner after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingSpinner.classList.add('hidden');
        }, 500);
    });

    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('light-theme');
        
        // Toggle icon
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
        
        // Save preference to localStorage
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Typing animation for hero section
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate current dot
        testimonialSlides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // Animated counter for stats
    function animateCounter(elementId, target, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let start = 0;
        const increment = Math.ceil(target / (duration / 16));
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.min(start, target);
            
            if (start >= target) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 16);
    }
    
    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter('projects-completed', 3, 1000);
                    animateCounter('happy-clients', 10, 1500);
                    animateCounter('coffee-cups', 247, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Form validation
    const form = document.getElementById('contact-form');
    if (form) {
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const subjectInput = form.querySelector('#subject');
        const messageInput = form.querySelector('#message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        const successMsg = document.getElementById('success-msg');
        
        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            if (subjectError) subjectError.textContent = '';
            messageError.textContent = '';
            successMsg.textContent = '';
            
            let valid = true;
            
            // Name validation
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Silahkan masukkan nama Anda.';
                valid = false;
                nameInput.focus();
            }
            
            // Email validation
            if (!validateEmail(emailInput.value.trim())) {
                emailError.textContent = 'Silahkan masukkan email yang valid.';
                valid = false;
                if (nameInput.value.trim() !== '') {
                    emailInput.focus();
                }
            }
            
            // Subject validation (if exists)
            if (subjectInput && subjectInput.value.trim() === '') {
                subjectError.textContent = 'Silahkan masukkan subject pesan.';
                valid = false;
                if (nameInput.value.trim() !== '' && validateEmail(emailInput.value.trim())) {
                    subjectInput.focus();
                }
            }

            // Message validation
            if (messageInput && messageInput.value.trim() === '') {
                messageError.textContent = 'Silahkan masukkan pesan Anda.';
                valid = false;
                if (nameInput.value.trim() !== '' && validateEmail(emailInput.value.trim()) && subjectInput.value.trim() !== '') {
                    messageInput.focus();
                }
            }

            if (valid) {
                successMsg.textContent = 'Formulir berhasil dikirim!';
                form.reset(); // Reset form after successful submission
            }
        });
    }
});
