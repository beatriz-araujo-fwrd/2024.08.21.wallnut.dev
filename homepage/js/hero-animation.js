document.addEventListener("DOMContentLoaded", () => {

    let heroReveal = gsap.timeline().from(".hero-row .divider", {
        delay: 1,
        duration: 1,
        width: "0vw",
        ease: "power2.out"
    })
    .from(".hero-row-background-container img", {
        yPercent: -45,
        duration: 1.5,
        stagger: .15,
        ease: "power2.out"
    }, "<")
    .to(".loader-logo-wrapper", {
        delay: .2,
        yPercent: -100,
        duration: .5,
        ease: "power2.out",
        onComplete: ()=> {
            document.querySelector(".loader-logo-container").remove();
        }
    }, "<")
    .to(".hero-row-cover", {
        delay: .5,
        width: "0vw",
        stagger: .2,
        duration: 1.25,
        ease: "power2.out"
    }, "<").from(".hero-row h1", {
        delay: .05,
        duration: 1.25,
        stagger: .2,
        yPercent: 100,
        ease: "power2.out"
    }, "<").from(".hero-row h2", {
        delay: .05,
        duration: 1,
        stagger: .2,
        yPercent: -120,
        ease: "power2.out"
    }, "<");

});