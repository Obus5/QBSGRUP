// =========================================================
// QBS GRUP — MAIN JAVASCRIPT
// =========================================================


// =========================================================
// YEAR
// =========================================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================================================
// NAVBAR SCROLL
// =========================================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    const handleNavbarScroll = () => {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    // Jalankan saat halaman pertama kali dibuka
    handleNavbarScroll();

    // Jalankan ketika halaman di-scroll
    window.addEventListener("scroll", handleNavbarScroll);

}


// =========================================================
// MOBILE MENU
// =========================================================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    // Buka / tutup menu
    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuButton.classList.toggle("active");

    });


    // Tutup menu setelah link navbar diklik
    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuButton.classList.remove("active");

        });

    });


    // Tutup menu jika klik di luar navbar
    document.addEventListener("click", event => {

        const clickedInsideNav = navMenu.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedMenuButton &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");
            menuButton.classList.remove("active");

        }

    });


    // Tutup menu jika layar kembali ke desktop
    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            navMenu.classList.remove("active");
            menuButton.classList.remove("active");

        }

    });

}


// =========================================================
// SMOOTH SCROLL
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        // Abaikan href="#"
        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        const navbarHeight = navbar
            ? navbar.offsetHeight
            : 0;

        const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Fallback browser lama
    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


// =========================================================
// VIDEO
// =========================================================

const projectVideos =
    document.querySelectorAll(
        ".video-content video"
    );

projectVideos.forEach(video => {

    const videoContainer =
        video.parentElement;

    const placeholder =
        videoContainer
            ? videoContainer.querySelector(
                ".video-placeholder"
            )
            : null;


    // Hilangkan placeholder setelah video siap
    video.addEventListener(
        "loadeddata",
        () => {

            if (placeholder) {
                placeholder.style.display = "none";
            }

        }
    );


    // Coba autoplay
    const tryPlayVideo = () => {

        const playPromise = video.play();

        if (
            playPromise !== undefined
        ) {

            playPromise.catch(() => {

                // Browser mungkin memblokir autoplay.
                // Video tetap bisa tampil melalui poster.

            });

        }

    };


    if (video.readyState >= 2) {

        tryPlayVideo();

    } else {

        video.addEventListener(
            "loadeddata",
            tryPlayVideo,
            {
                once: true
            }
        );

    }

});


// =========================================================
// PAUSE VIDEO WHEN OUTSIDE VIEWPORT
// =========================================================

if (
    "IntersectionObserver" in window &&
    projectVideos.length > 0
) {

    const videoObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    const video = entry.target;

                    if (entry.isIntersecting) {

                        const playPromise =
                            video.play();

                        if (
                            playPromise !== undefined
                        ) {

                            playPromise.catch(() => {
                                // Autoplay diblokir browser
                            });

                        }

                    } else {

                        video.pause();

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    projectVideos.forEach(video => {

        videoObserver.observe(video);

    });

}


// =========================================================
// EXTERNAL LINKS
// =========================================================

// Link project seperti:
// - sakuQ
// - SmartMoney
// - GrowVest
// - Instagram BullBear.ID
// - TikTok BullBear.ID
// - QBS CHANNEL
//
// Tidak perlu event JavaScript khusus.
// Semua tujuan link mengikuti href yang ada
// di index.html.
//
// Jadi tombol "Download APK" yang diarahkan
// ke website project juga akan tetap membuka
// website sesuai href masing-masing.


// =========================================================
// IMAGE ERROR HANDLING
// =========================================================

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        // Tandai gambar yang gagal dimuat
        // tanpa menghentikan JavaScript website.

        image.classList.add("image-error");

    });

});


// =========================================================
// PAGE READY
// =========================================================

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});