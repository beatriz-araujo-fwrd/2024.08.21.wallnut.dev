gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("Doc Loaded");

    let cardContainer, cardContainerWidth, amountToScroll, timelineBarScroll;
    fetchSizes();

    // var tween = gsap.to(cardContainer, {
    //     x: -amountToScroll,
    //     duration: 3,
    //     ease: "none"
    // });

    // ScrollTrigger.create({
    //     trigger: ".section-timeline",
    //     start: "top top",
    //     end: "+=" + amountToScroll,
    //     pin: true,
    //     animation: tween,
    //     markers: true,
    //     scrub: 1 //markers: true
    // });

    function fetchSizes() {
        cardContainer = document.querySelector(".cards-list");
        cardContainerWidth = cardContainer.offsetWidth;
        amountToScroll = cardContainerWidth + parseFloat(getComputedStyle(document.querySelector(".timeline-container")).paddingLeft) - window.innerWidth;
        timelineBarScroll = window.innerWidth - 3 * parseFloat(getComputedStyle(document.querySelector(".timeline-container")).paddingLeft);

        console.log("updating scroll element values");
    }

    const h2Containers = document.querySelectorAll('.h2-container');
    const hTotalContainers = h2Containers.length;

    const pContainers = document.querySelectorAll('.desc-container');
    const pTotalContainers = pContainers.length;

    const hRevealAmount = 1 / hTotalContainers; // Each container reveals at 10%
    const pRevealAmount = 1 / pTotalContainers;

    let timelineScroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-timeline",
            start: "top top",
            end: "+=" + amountToScroll,
            toggleActions: "play play reverse reverse",
            duration: 3,
            pin: true,
            markers: true,
            onUpdate: () => {
                // if(timelineScroll.progress() >.45) {
                //     document.querySelector(".timeline-text-container").classList.add("reverse");
                // } else {
                //     document.querySelector(".timeline-text-container").classList.remove("reverse");
                // }
                console.log("progress: " + timelineScroll.progress());
            },
            // onToggle: ()=> {
            //     fetchSizes();
            //     timelineScroll.scrollTrigger.refresh();
            // },
            scrub: 1 //markers: true
        }
    }).to(cardContainer, {
        x: -amountToScroll,
        duration: 3
    }).to(".timeline-el", {
        x: timelineBarScroll,
        duration: 3
    }, "<").to(".timeline-text-container", {
        className: "timeline-text-container reverse"
    }, "-=1.2");

    // loop through each h2-container, add 'show' class and add each animation to the timeline
    // remove 'show' class when animation completes (must account for reverse scrolling animations)
    h2Containers.forEach((container, index) => {

        // each h2 animation lasts for [timeline animation total] / [total number of h2] seconds
        let animDuration = 3 / hTotalContainers;

        timelineScroll.to(container, {
            className: "h2-container text-reveal show",
            duration: animDuration,
            onStart: () => {
                // textEnterAnimation(container);
            },
            onComplete: () => {
                // last h2 must remain visible
                if (index < hTotalContainers - 1) {
                    container.classList.remove("show");
                    // textLeaveAnimation(container);
                }
            },
            onReverseComplete: () => {
                // first h2 must remain visible
                if (index > 0) {
                    container.classList.remove("show");
                    // textLeaveAnimation(container);
                }
            },
        }, index * hRevealAmount * 3 - animDuration / 2); // each animation position in timeline, assuming the total animation time to be 3 
    });

    function textEnterAnimation(el) {
        gsap.fromTo(el.querySelectorAll(".word"), {
            opacity: 0,
            y: "80%"
        }, {
            opacity: 1,
            y: "0%",
            delay: 0.5,
            duration: 0.5,
            ease: "power3.out",
            stagger: { amount: 0.15 }
        });
    }

    function textLeaveAnimation(el) {
        gsap.fromTo(el.querySelectorAll(".word"), {
            opacity: 1,
            y: "0%"
        },{
            opacity: 0,
            y: "-80%",
            duration: 0.4,
            ease: "power3.out",
            onComplete: ()=> {
                el.classList.remove("show");
            },
            stagger: { amount: 0.15 }
        });
    }

    pContainers.forEach((container, index) => {

        // each h2 animation lasts for [timeline animation total] / [total number of h2] seconds
        let animDuration = 3 / pTotalContainers;

        timelineScroll.to(container, {
            className: "desc-container text-reveal show",
            duration: animDuration,
            onComplete: () => {
                // last h2 must remain visible
                if (index < pTotalContainers - 1) {
                    container.classList.remove("show");
                }
                console.log(animDuration);
            },
            onReverseComplete: () => {
                // first h2 must remain visible
                if (index > 0) {
                    container.classList.remove("show");
                }
            },
        }, index * pRevealAmount * 3 - animDuration / 2); // each animation position in timeline, assuming the total animation time to be 3 
    });

    window.addEventListener("resize", () => {
        fetchSizes();
        timelineScroll.scrollTrigger.refresh();
    });

});