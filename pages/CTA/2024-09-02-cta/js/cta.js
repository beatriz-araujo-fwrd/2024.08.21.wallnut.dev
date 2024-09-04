document.addEventListener("DOMContentLoaded", () => {
    let ctaButton = document.querySelector(".section_cta .button");
    let ctaCover = document.querySelector(".cta_cover");
    let ctaAnim = gsap;

    let charging = false;
    let hovering = false;
    let complete = false;

    ctaAnim.defaults({
        overwrite: true
    });

    ctaButton.addEventListener("mouseover", function () {

        if (!hovering && !charging && !complete) {
            gsap.to(ctaCover, {
                width: "20vw",
                onStart: () => {
                    hovering = true;
                    ctaCover.classList.add("hovering");
                },
                duration: 1.5,
                ease: "power2.out"
            });
        }

    });

    ctaButton.addEventListener("mousedown", function () {
        if (!charging && !complete) {

            gsap.timeline({
                onEnter: () => {
                    charging = true;
                    ctaCover.classList.add("charging");
                },
                onComplete: () => {
                    complete = true;
                    ctaCover.classList.add("full");
                }
            }).to(ctaCover, {
                width: "100vw",
                overwrite: true,
                duration: 2,
                ease: "power3.in"
            }).to(ctaButton.querySelectorAll(".cta_btn_text"), {
                y: "-360%",
                stagger: .2,
                duration: 1.4,
                ease: "power2.in"
            }, "<");
        }

        console.log(charging);

    });

    ctaButton.addEventListener("mouseup", function () {
        if (!complete) {
            if (charging && hovering) {
                charging = false;

                ctaCover.classList.remove("charging");

                ctaAnim.to(ctaCover, {
                    width: "20vw",
                    duration: 1.2,
                    ease: "power2.out"
                });
            } else if (!hovering && !charging) {
                charging = false;
                hovering = false;

                ctaCover.classList.remove("charging");
                ctaCover.classList.remove("hovering");

                ctaAnim.to(ctaCover, {
                    width: "0vw",
                    duration: 3,
                    ease: "power2.out"
                });
            }

            ctaAnim.to(ctaButton.querySelectorAll(".cta_btn_text"), {
                y: "0%",
                duration: .5,
                ease: "power2.in"
            })
        }

    });

    ctaButton.addEventListener("mouseout", function () {
        hovering = false;
        charging = false;

        ctaCover.classList.remove("hovering");
        ctaCover.classList.remove("charging");

        if (!complete) {
            ctaAnim.to(ctaCover, {
                width: "0%",
                duration: 2,
            });
        }

    });
});