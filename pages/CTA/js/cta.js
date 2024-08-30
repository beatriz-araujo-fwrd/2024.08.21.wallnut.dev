document.addEventListener("DOMContentLoaded", () => {
    let ctaButton = document.querySelector(".cta_button");
    let ctaCover = document.querySelector(".cta-cover");
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
                duration: .5
            });
        }

    });

    ctaButton.addEventListener("mousedown", function () {
        if (!charging && hovering) {
            charging = true;

            ctaCover.classList.add("charging");

            ctaAnim.to(ctaCover, {
                width: "100%",
                duration: 1.5
            });
        }

    });

    ctaButton.addEventListener("mouseup", function () {
        if (charging && hovering) {
            charging = false;

            ctaCover.classList.remove("charging");

            ctaAnim.to(ctaCover, {
                width: "20%",
                duration: .1
            });
        } else if (!hovering) {
            ctaCover.classList.remove("charging");
            ctaCover.classList.remove("hovering");

            ctaAnim.to(ctaCover, {
                width: "0%",
                duration: .1
            });
        }

    });

    ctaButton.addEventListener("mouseout", function () {
        hovering = false;
        charging = false;

        ctaCover.classList.remove("hovering");

        ctaAnim.to(ctaCover, {
            width: "0%",
            duration: .1,
        });

    });
});