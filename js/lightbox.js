
/* =========================================================
   QBS GRUP — GLOBAL PHONE LIGHTBOX
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("phoneLightbox");
    const image = document.getElementById("lightboxImage");
    const title = document.getElementById("lightboxTitle");
    const counter = document.getElementById("lightboxCounter");

    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    if (!lightbox) return;

    let images = [];
    let currentIndex = 0;
    let previousFocus = null;
    let touchStartX = 0;

    function showImage() {
        if (!images.length) return;

        const current = images[currentIndex];

        image.src = current.src;
        image.alt = current.alt || "Preview";

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;
    }

    function openLightbox(showcase, index) {

        images = Array.from(
            showcase.querySelectorAll(".phone-screen img")
        ).map(img => ({
            src: img.currentSrc || img.src,
            alt: img.alt
        }));

        if (!images.length) return;

        currentIndex = index;
        previousFocus = document.activeElement;

        const section = showcase.closest(".project-section");
        const projectName = section?.querySelector(
            ".project-content h2"
        );

        title.textContent =
            projectName?.textContent.trim() || "Preview";

        showImage();

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");

        closeBtn.focus();
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

        image.removeAttribute("src");

        previousFocus?.focus?.();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    }

    function prevImage() {
        currentIndex =
            (currentIndex - 1 + images.length) % images.length;

        showImage();
    }

    // CLICK ANY PHONE

    document.querySelectorAll(".phone-showcase").forEach(showcase => {

        const phones = Array.from(
            showcase.querySelectorAll(".phone")
        );

        const allImages = Array.from(
            showcase.querySelectorAll(".phone-screen img")
        );

        phones.forEach(phone => {

            phone.setAttribute("tabindex", "0");
            phone.setAttribute("role", "button");
            phone.setAttribute(
                "aria-label",
                "Buka preview gambar"
            );

            function open() {

                const clickedImage =
                    phone.querySelector(".phone-screen img");

                const index = allImages.indexOf(clickedImage);

                openLightbox(showcase, Math.max(index, 0));
            }

            phone.addEventListener("click", open);

            phone.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open();
                }
            });

        });

    });

    // BUTTONS

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    // CLICK OUTSIDE

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // KEYBOARD

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "ArrowLeft") prevImage();

        if (event.key === "Tab") {
            const controls = [closeBtn, prevBtn, nextBtn];
            const index = controls.indexOf(document.activeElement);

            if (event.shiftKey && index === 0) {
                event.preventDefault();
                nextBtn.focus();
            } else if (!event.shiftKey && index === 2) {
                event.preventDefault();
                closeBtn.focus();
            }
        }
    });

    // MOBILE SWIPE

    lightbox.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", event => {

        const touchEndX = event.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 50) return;

        if (distance < 0) {
            nextImage();
        } else {
            prevImage();
        }

    }, { passive: true });

});
