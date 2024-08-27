gsap.registerPlugin(ScrollTrigger);
gsap.config({
    nullTargetWarn: false,
    autoSleep: 60
});

let headingSplit, paragraphSplit;

let h2Containers, hTotalContainers, pContainers, pTotalContainers, timelineTextContainers, timelineTextTotalContainers;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Doc Loaded");

    // apply .line and .word wrappers to each heading and paragraph elements
    headingSplit = new SplitType(".h2-container h2", { types: "words, lines" });
    paragraphSplit = new SplitType(".desc-container p", { types: "words, lines" });

    let cardContainer, cardContainerWidth, amountToScroll, timelineBarScroll;
    fetchSizes();

    function fetchSizes() {
        cardContainer = document.querySelector(".cards-list");
        cardContainerWidth = cardContainer.offsetWidth;
        amountToScroll = cardContainerWidth + parseFloat(getComputedStyle(document.querySelector(".timeline-container")).paddingLeft) - window.innerWidth;
        timelineBarScroll = window.innerWidth - 3 * parseFloat(getComputedStyle(document.querySelector(".timeline-container")).paddingLeft);

        h2Containers = document.querySelectorAll('.h2-container');
        hTotalContainers = h2Containers.length;

        pContainers = document.querySelectorAll('.desc-container');
        pTotalContainers = pContainers.length;

        timelineTextContainers = document.querySelectorAll('.timeline-text');
        timelineTextTotalContainers = timelineTextContainers.length;

        

        // console.log("----------------");
        // console.log("updating scroll element values");
        // console.log("cardContainerWidth: " + cardContainerWidth);
        // console.log("amountToScroll: " + amountToScroll);
        // console.log("timelineBarScroll: " + timelineBarScroll);
    }

    let timelineScroll = gsap.timeline({
        scrollTrigger: {
            trigger: document.querySelector(".section-timeline"),
            start: "top top",
            end: "+=" + amountToScroll,
            toggleActions: "play none none none",
            duration: 3,
            pin: true,
            invalidateOnRefresh: true,
            // onToggle: ()=> {
            //     fetchSizes();
            //     timelineScroll.scrollTrigger.refresh();
            // },
            scrub: 1
        }
    }).to(cardContainer, {
        x: -amountToScroll,
        onStart: ()=> {
            console.log("THIS " + cardContainer.offsetWidth);
        },
        duration: 3
    }).to(".timeline-el", {
        x: timelineBarScroll,
        duration: 3
    }, "<").to(".timeline-text-container", {
        className: "timeline-text-container reverse"
    }, "-=1.2");


    // loop through each h2-container, apply scrolltrigger to each text container 
    // (trigger is always parent container with varying start/end points)
    h2Containers.forEach((container, index) => {

        let animStart = document.querySelector(".timeline-container").offsetWidth / hTotalContainers;

        gsap.to(container.querySelectorAll(".word"), {
            opacity: 1,
            y: "0%",
            duration: .4,
            delay: .25,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                invalidateOnRefresh: true,
                trigger: container,
                start: 'top+=' + animStart * index + 'px 10%',
                end: '+=' + animStart + 'px',
                toggleActions: 'play reverse restart reverse',
                markers: false,
                overwrite: true,
                // onLeave: ()=> {
                //     gsap.to(container.querySelectorAll(".word"), {
                //         opacity: 0,
                //         y: "-50%",
                //         duration: .25,
                //         ease: "power3.out",
                //         stagger: 0.05
                //     });
                // },
                // onEnterBack: ()=> {
                //     gsap.to(container.querySelectorAll(".word"), {
                //         opacity: 0,
                //         y: "-50%",
                //         duration: .25,
                //         ease: "power3.out",
                //         stagger: 0.05
                //     });
                // }
            }
        });
    });

    pContainers.forEach((container, index) => {

        let animStart = document.querySelector(".timeline-container").offsetWidth / pTotalContainers;

        gsap.to(container.querySelectorAll(".word"), {
            opacity: 1,
            y: "0%",
            duration: .6,
            delay: .45,
            ease: "power3.out",
            stagger: 0.02,
            scrollTrigger: {
                invalidateOnRefresh: true,
                trigger: container,
                start: 'top+=' + animStart * index + 'px 10%',
                end: '+=' + animStart + 'px',
                toggleActions: 'play reverse restart reverse',
                markers: true,
                overwrite: true
                // onEnter: () => {
                //     // trigger the hide animation for the previous container if it exists
                //     if (index > 0) {
                //         gsap.to(pContainers[index - 1].querySelectorAll(".word"), {
                //             opacity: 0,
                //             y: "-50%",
                //             duration: .25,
                //             ease: "power2.out",
                //             stagger: 0.01
                //         });
                //     }
                // }
            }
        });
    });

    timelineTextContainers.forEach((container, index) => {

        let animStart = document.querySelector(".timeline-container").offsetWidth / timelineTextTotalContainers;

        gsap.timeline({
            scrollTrigger: {
                invalidateOnRefresh: true,
                trigger: document.querySelector(".timeline-container"),
                start: 'top+=' + animStart * index + 'px 10%',
                end: '+=' + animStart + 'px',
                toggleActions: 'play reverse restart reverse',
                markers: true,
                overwrite: true
            }
        }).to(container, {
            opacity: 1,
            duration: .4
        }).to(container, {
            y: "0%",
            delay: .1,
            duration: .25,
            ease: "power3.out"
        }, "<");
    });

    window.addEventListener("resize", () => {
        fetchSizes();
        //ScrollTrigger.refresh();
    });

    // ScrollTrigger.addEventListener("refresh", function () {
    //     // this code will run AFTER all ScrollTriggers refreshed.
    //     console.log("SCROLLTRIGGER HAS BEEN REFRESHED");
    // });

    // ScrollTrigger.addEventListener("refreshInit", function () {
    //     // this code will run BEFORE the refresh
    //     console.log("UPDATING VARS");
    //     fetchSizes();
    // });

});