document.addEventListener("DOMContentLoaded", () => {
    let ctaButton = document.querySelector(".section_cta .button");
    let ctaCover = document.querySelector(".cta_cover");
    let ctaAnim = gsap;

    let charging = false;
    let hovering = false;

    ctaAnim.defaults({
        overwrite: true
    });

    ctaButton.addEventListener("mouseover", function () {

        if (!hovering) {
            hovering = true;
            ctaCover.classList.add("hovering");

            ctaAnim.to(ctaCover, {
                width: "20%",
                duration: 1.5,
                ease: "power2.out"
            });
        }

    });

    ctaButton.addEventListener("mousedown", function () {
        if (!charging) {
            ctaCover.classList.add("charging");

            ctaAnim.timeline().to(ctaCover, {
                onStart: ()=> {
                    charging = true;
                },
                width: "100%",
                duration: 2,
                ease: "power3.in"
            }).to(ctaButton.querySelectorAll("span"), {
                y: "-300%",
                stagger: .25,
                duration: 2,
                ease: "power2.in"
            }, "<");
        }

        console.log(charging);

    });

    ctaButton.addEventListener("mouseup", function () {
        if (charging) {
            charging = false;

            ctaCover.classList.remove("charging");

            ctaAnim.to(ctaCover, {
                width: "20%",
                duration: 1.2,
                ease: "power2.out"
            });
        } if (!hovering) {
            charging = false;
            hovering = false;

            ctaCover.classList.remove("charging");
            ctaCover.classList.remove("hovering");

            ctaAnim.to(ctaCover, {
                width: "0%",
                duration: 3,
                ease: "power2.out"
            });
        }

    });

    ctaButton.addEventListener("mouseout", function () {
        hovering = false;
        charging = false;

        ctaCover.classList.remove("hovering");
        ctaCover.classList.remove("charging");

        ctaAnim.to(ctaCover, {
            width: "0%",
            duration: 2,
        });

    });
});