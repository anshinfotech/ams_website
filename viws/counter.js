function animateCounter(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 20); 
    let timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.innerText = Math.floor(current).toLocaleString();
    }, 10);
}

document.addEventListener("DOMContentLoaded", () => {
    let counters = [
        { selector: "#counter div:nth-child(2) h1", end: 10000 },
        { selector: "#counter div:nth-child(3) h1", end: 2000 },
        { selector: "#counter div:nth-child(4) h1", end: 200 }
    ];

    counters.forEach(counter => {
        let element = document.querySelector(counter.selector);
        if (element) {
            animateCounter(element, 0, counter.end, 2000);
        }
    });
});
