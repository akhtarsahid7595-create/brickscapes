(function () {
    'use strict';

    // 1. Hero Subtle Zoom Animation Trigger
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => hero.classList.add('loaded'), 100);
    }

    // 2. Navigation Scroll Effect
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = '';
            header.style.background = '#fff';
        }
    });

    // 3. Mobile Navigation Drawer Toggling
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent main page scrolling
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = ''; // Restore main page scrolling
    }

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
    
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 4. Smooth Scrolling for Navigation Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const targetElement = document.querySelector(id);
            if (targetElement) {
                e.preventDefault();
                const headerH = document.getElementById('site-header')?.offsetHeight || 88;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerH;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealTargets = document.querySelectorAll(
        '.svc-card, .tcard, .g-item, .builders-content, .about-text, .about-img, .areas-inner, .gallery-header, .ba-header, .ba-card, .risk-card, .risks-header'
    );

    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealTargets.forEach((el, index) => {
        // Initial hidden states
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${(index % 4) * 0.08}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${(index % 4) * 0.08}s`;
        revealObserver.observe(el);
    });

    // 6. Gallery Lightbox Functionality
    const galleryItems = document.querySelectorAll('.g-item');
    
    // Create lightbox elements dynamically
    const lbContainer = document.createElement('div');
    lbContainer.id = 'custom-lightbox';
    lbContainer.innerHTML = `
        <div class="lb-backdrop"></div>
        <div class="lb-content-wrapper">
            <button class="lb-close-btn" aria-label="Close Lightbox">&times;</button>
            <img class="lb-active-img" src="" alt="">
            <div class="lb-caption-text"></div>
        </div>
    `;
    document.body.appendChild(lbContainer);

    // Inject styles for lightbox
    const lbStyle = document.createElement('style');
    lbStyle.textContent = `
        #custom-lightbox {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }
        #custom-lightbox.open {
            display: flex;
        }
        .lb-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(10, 15, 8, 0.94);
            cursor: pointer;
        }
        .lb-content-wrapper {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 90vw;
        }
        .lb-active-img {
            max-height: 82vh;
            max-width: 100%;
            object-fit: contain;
            border-radius: 4px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            display: block;
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .lb-active-img.loaded {
            opacity: 1;
            transform: scale(1);
        }
        .lb-close-btn {
            position: absolute;
            top: -48px;
            right: 0;
            background: none;
            border: none;
            color: #fff;
            font-size: 2.8rem;
            cursor: pointer;
            line-height: 1;
            opacity: 0.75;
            transition: opacity 0.2s, transform 0.2s;
        }
        .lb-close-btn:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        .lb-caption-text {
            color: rgba(255, 255, 255, 0.85);
            font-family: var(--serif);
            font-size: 1.1rem;
            margin-top: 14px;
            text-align: center;
            letter-spacing: 0.02em;
        }
    `;
    document.head.appendChild(lbStyle);

    const lbBackdrop = lbContainer.querySelector('.lb-backdrop');
    const lbCloseBtn = lbContainer.querySelector('.lb-close-btn');
    const lbImg = lbContainer.querySelector('.lb-active-img');
    const lbCaption = lbContainer.querySelector('.lb-caption-text');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const originalImg = item.querySelector('img');
            const captionContent = item.querySelector('.gi-caption')?.textContent || originalImg.alt;
            
            lbImg.src = originalImg.src;
            lbImg.alt = originalImg.alt;
            lbCaption.textContent = captionContent;
            
            lbContainer.classList.add('open');
            document.body.style.overflow = 'hidden';

            // Subtle fade/zoom transition for active image
            setTimeout(() => {
                lbImg.classList.add('loaded');
            }, 50);
        });
    });

    function closeLightbox() {
        lbImg.classList.remove('loaded');
        setTimeout(() => {
            lbContainer.classList.remove('open');
            document.body.style.overflow = '';
        }, 200);
    }

    lbBackdrop.addEventListener('click', closeLightbox);
    lbCloseBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });

})();
