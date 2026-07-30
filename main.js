/**
 * TURFWORLD & BRICKSCAPES — Master Interactive Script
 * Lawn Turf, Topsoil & Landscaping Supplies
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobToggle = document.getElementById('tw-mob-toggle');
    const drawer = document.getElementById('tw-drawer');
    const drawerOverlay = document.getElementById('tw-drawer-overlay');
    const drawerClose = document.getElementById('tw-drawer-close');
    const drawerLinks = document.querySelectorAll('.tw-drawer-link');

    function openDrawer() {
        if (drawer) drawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (drawer) drawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobToggle) mobToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    /* ==========================================================================
       2. INTERACTIVE TURF & SOIL CALCULATOR LOGIC
       ========================================================================== */
    const calcLength = document.getElementById('calc-length');
    const calcWidth = document.getElementById('calc-width');
    const calcWaste = document.getElementById('calc-waste');

    const valLength = document.getElementById('val-length');
    const valWidth = document.getElementById('val-width');

    const resArea = document.getElementById('res-area');
    const resRolls = document.getElementById('res-rolls');
    const resSoil = document.getElementById('res-soil');
    const resPrice = document.getElementById('res-price');
    const orderBtn = document.getElementById('calc-order-btn');

    // Turf roll price = £6.00 / m²
    const TURF_PRICE_PER_M2 = 6.00;

    function calculateTurf() {
        if (!calcLength || !calcWidth) return;

        const length = parseInt(calcLength.value, 10);
        const width = parseInt(calcWidth.value, 10);
        const includeWaste = calcWaste ? calcWaste.checked : true;

        if (valLength) valLength.textContent = `${length} m`;
        if (valWidth) valWidth.textContent = `${width} m`;

        let rawArea = length * width;
        let totalRolls = rawArea;

        if (includeWaste) {
            totalRolls = Math.ceil(rawArea * 1.10); // +10% waste allowance
        }

        // Each roll = 1m²
        const soilBags = totalRolls; // 1 25kg bag per m² for 25mm depth
        const totalPrice = (totalRolls * TURF_PRICE_PER_M2).toFixed(2);

        if (resArea) resArea.textContent = `${rawArea} m²`;
        if (resRolls) resRolls.textContent = `${totalRolls} Rolls`;
        if (resSoil) resSoil.textContent = `${soilBags} Bags (25kg)`;
        if (resPrice) resPrice.textContent = `£${totalPrice}`;

        if (orderBtn) {
            const msg = encodeURIComponent(
                `Hi Joe! I calculated my lawn order on TurfWorld:\n` +
                `• Lawn Size: ${length}m x ${width}m (${rawArea} m²)\n` +
                `• Turf Rolls Needed: ${totalRolls} Rolls\n` +
                `• Topsoil Bags Needed: ${soilBags} Bags\n` +
                `• Estimated Price: £${totalPrice}\n` +
                `I would like to place an order / schedule delivery.`
            );
            orderBtn.href = `https://wa.me/447884248274?text=${msg}`;
        }
    }

    if (calcLength) calcLength.addEventListener('input', calculateTurf);
    if (calcWidth) calcWidth.addEventListener('input', calculateTurf);
    if (calcWaste) calcWaste.addEventListener('change', calculateTurf);

    // Initial calculation
    calculateTurf();

    /* ==========================================================================
       3. FILTERABLE GALLERY & LIGHTBOX MODAL
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.tw-filter-btn');
    const galItems = document.querySelectorAll('.tw-gal-item');
    const lightbox = document.getElementById('tw-lightbox');
    const lbImg = document.getElementById('tw-lb-img');
    const lbCap = document.getElementById('tw-lb-cap');
    const lbClose = document.getElementById('tw-lb-close');
    const lbOverlay = document.getElementById('tw-lb-overlay');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');

            galItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                if (filterVal === 'all' || cat === filterVal) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    galItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const cap = img ? img.getAttribute('alt') : '';

            if (lightbox && lbImg && img) {
                lbImg.src = img.src;
                lbImg.style.display = 'block';
                if (lbCap) lbCap.innerText = cap;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            if (lbImg) {
                lbImg.style.display = 'none';
                lbImg.src = '';
            }
            document.body.style.overflow = '';
        }
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbOverlay) lbOverlay.addEventListener('click', closeLightbox);

    /* Review Proof Screenshot Lightbox */
    const proofBtns = document.querySelectorAll('.tw-rev-proof-btn');
    proofBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const proofSrc = btn.getAttribute('data-proof');
            const reviewCard = btn.closest('.tw-review-card');
            const reviewerName = reviewCard ? (reviewCard.querySelector('.tw-rev-name')?.innerText || 'Google Review') : 'Google Review';

            if (lightbox && lbImg && proofSrc) {
                lbImg.src = proofSrc;
                lbImg.style.display = 'block';
                if (lbCap) lbCap.innerText = `Verified Original Google Review Screenshot — ${reviewerName}`;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    /* ==========================================================================
       4. FORM SUBMISSION
       ========================================================================== */
    // Handle Form Submissions with Web3Forms & WhatsApp redirect
    const forms = document.querySelectorAll('.tw-form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            }

            const formData = new FormData(form);
            if (!formData.has('access_key')) {
                formData.append('access_key', '502e4e4d-cd85-40e3-929f-db8e41012b34');
            }

            const name = formData.get('name') || '';
            const phone = formData.get('phone') || '';
            const postcode = formData.get('postcode') || '';
            const service = formData.get('service') || '';
            const details = formData.get('details') || '';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log('Web3Forms lead submitted successfully:', data);
            })
            .catch(err => {
                console.error('Web3Forms lead error:', err);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }

                const toast = form.parentElement.querySelector('.tw-toast') || document.getElementById('tw-toast');
                if (toast) {
                    toast.classList.add('active');
                    setTimeout(() => toast.classList.remove('active'), 6000);
                }

                form.reset();

                // Also trigger WhatsApp lead notification
                const waMsg = encodeURIComponent(
                    `Hi Joe! Brickscapes New Quote Request:\n` +
                    `• Name: ${name}\n` +
                    `• Phone: ${phone}\n` +
                    `• Postcode: ${postcode}\n` +
                    `• Service: ${service}\n` +
                    `• Details: ${details}`
                );
                window.open(`https://wa.me/447884248274?text=${waMsg}`, '_blank');
            });
        });
    });

});
