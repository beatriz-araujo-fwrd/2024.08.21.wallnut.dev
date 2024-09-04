document.addEventListener("DOMContentLoaded", () => {

    let currentSlideIndex, innerText, textContainer;
    let slidesList = document.querySelectorAll(".swiper_text_overlay_wrapper");

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            type: "progressbar",
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hide: true
        },

        // And if we need scrollbar
        scrollbar: {
            // el: '.swiper-scrollbar',
            hide: true
        },

        on: {
            afterInit: function () {
                currentSlideIndex = document.querySelector(".swiper-slide-active").getAttribute("data-swiper-slide-index");
                // innerText = currentSlide.querySelector(".swiper-text-overlay-wrapper").cloneNode();
                // textContainer = document.querySelector(".swiper-text-overlay-container");

            },
            transitionStart: function () {
                let activeSlideIndex = document.querySelector(".swiper-slide-active").getAttribute("data-swiper-slide-index");

                // hide previously active slide
                slidesList[currentSlideIndex].classList.remove("show");

                // sometimes this callback is triggered twice (once before transition and again afterwards), 
                // making the activeSlide the previous one on the first call
                // to avoid storing the previous slide as the current one, we compare it with the last stored 'current' slide
                if (activeSlideIndex != currentSlideIndex) {
                    currentSlideIndex = activeSlideIndex;
                    
                    slidesList[currentSlideIndex].classList.add("show");

                }
            }
        },
    });
});