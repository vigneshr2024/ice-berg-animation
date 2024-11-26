let canvas = document.getElementById("hero-lightpass");
let context = canvas.getContext("2d");

// Set frameCount based on device type
let frameCount = window.innerWidth <= 768 ? 116 : 140; // 116 images for mobile, 140 for desktop
let images = [];
let defaultImage = new Image(); // Create a new Image object for the default image
defaultImage.src = "../assets/img/desktop-images/1.webp"; // Set the path to your default image
let bottomText = document.querySelector(".bottom-text");
let middleText = document.querySelector(".middle-text");

let imagesLoaded = 0;

// Function to get current frame image based on device type
function currentFrame(index) {
    const isMobile = window.innerWidth <= 768; // Check if the device is mobile
    const basePath = isMobile
        ? "../assets/img/mobile-images/" // Mobile path
        : "../assets/img/desktop-images/"; // Desktop path
    return `${basePath}${(index + 1)}.webp`;
}

// Preload your images based on the correct frameCount
for (let i = 0; i < frameCount; i++) {
    let img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
            render(); // Render when all images are loaded
        }
    };
    images.push(img);
    if (i > 90) {
        bottomText.style.opacity = 1;
        middleText.style.opacity = 1;
    } else {
        bottomText.style.opacity = 0;
        middleText.style.opacity = 0;
    }
}

let airpods = {
    frame: 0
};

function resizeCanvas() {
    // canvas.width = canvas.offsetWidth;
    // canvas.height = (canvas.width * 770) / 1158; // Maintain aspect ratio
    canvas.width = window.innerWidth + 10; // Set canvas width to window width
    canvas.height = window.innerHeight + 10; // Set canvas height to window height
    render();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (images[airpods.frame]) {
        context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
    } else {
        // If no images are loaded, draw the default image
        context.drawImage(defaultImage, 0, 0, canvas.width, canvas.height);
    }
}

// Scroll trigger setup (if you still want to use it)
gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        trigger: ".canvas-container",
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 0.5,
    },
    onUpdate: render,
});

// Initial resize
resizeCanvas();
window.addEventListener("resize", () => {
    // Reset scroll position
    window.scrollTo(0, 0); // Scroll to top
    resizeCanvas(); // Resize the canvas
    render(); // Render the default image
});

let lastDeviceType = window.innerWidth <= 768 ? "mobile" : "desktop";

window.addEventListener("resize", () => {
    const currentDeviceType = window.innerWidth <= 768 ? "mobile" : "desktop";

    if (lastDeviceType !== currentDeviceType) {
        location.reload(); // Refresh the page
    }

    lastDeviceType = currentDeviceType; // Update the device type
});
