document.addEventListener("DOMContentLoaded", () => {
    const headingSplit = new SplitType(".h2-container", { types: "words, lines" });
    const paragraphSplit = new SplitType(".desc-container", { types: "words, lines" });


    // Function to be called when the 'show' class is added or removed
    function handleClassChange(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const targetElement = mutation.target;
                if (targetElement.classList.contains('show')) {
                    gsap.fromTo(targetElement.querySelectorAll(".word"), {
                        opacity: 0,
                        y: "80%"
                    }, {
                        opacity: 1,
                        y: "0%",
                        delay: 0.2,
                        duration: 0.5,
                        ease: "power3.out",
                        stagger: { amount: 0.2 }
                    });
                } else {
                    // gsap.to(targetElement.querySelectorAll(".word"), {
                    //     opacity: 0,
                    //     y: "100%",
                    //     delay: 0.2,
                    //     duration: 0.5,
                    //     ease: "power3.out",
                    //     stagger: { amount: 0.2 }
                    // });
                }
            }
        }
    }

    // Function to start observing a specific element
    function observeElement(element) {
        const observer = new MutationObserver(handleClassChange);

        // Configuration for the observer
        const config = {
            attributes: true, // Observe attribute changes
            attributeFilter: ['class'], // Only observe changes to the 'class' attribute
        };

        // Start observing the target element
        observer.observe(element, config);
    }

    // if (document.querySelectorAll(".text-reveal")) {
    //     document.querySelectorAll(".text-reveal").forEach((el) => {
    //         observeElement(el);
    //     });

    // }



});