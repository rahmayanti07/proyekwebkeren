document.addEventListener('DOMContentLoaded', function() {
    
    const htmlElement = document.documentElement;
    const toggleButton = document.getElementById('dark-mode-toggle');
    const ctaButton = document.getElementById('cta-button');

    // --- 1. DARK MODE LOGIC ---
    
    function setDarkMode(isDark) {
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    // Cek Preferensi Pengguna/Sistem
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // Event Listener Tombol Toggle
    toggleButton.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        setDarkMode(currentTheme === 'light');
    });

    // --- 2. CTA Button Sederhana ---
    ctaButton.addEventListener('click', function() {
        alert('Tombol Demo Ditekan! Silakan gulir ke bawah untuk melihat fitur lainnya.');
    });

    // --- 3. Smooth Scrolling untuk Navigasi ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            // Cek apakah target ada sebelum mencoba scroll
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' 
                });
            }
        });
    });

    // --- 4. ANIMASI REVEAL ON SCROLL (Intersection Observer) ---

    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 // Trigger saat 20% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Mulai mengamati semua elemen 'reveal' (termasuk kartu dan form)
    revealElements.forEach(el => {
        observer.observe(el);
    });

});