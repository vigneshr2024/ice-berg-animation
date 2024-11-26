const imageContainer = document.getElementById('iceberg-images');

// Array of image URLs
const images = [
    '1.webp', '2.webp', '3.webp', '4.webp', '5.webp',
    '6.webp', '7.webp', '8.webp', '9.webp', '10.webp',
    '11.webp', '12.webp', '13.webp', '14.webp', '15.webp',
    '16.webp', '17.webp', '18.webp', '19.webp', '20.webp',
    '21.webp', '22.webp', '23.webp', '24.webp', '25.webp',
    '26.webp', '27.webp', '28.webp', '29.webp', '30.webp',
];

const numImages = images.length;
const imageHeight = window.innerHeight; // Height of each image

// Create and append image elements to the container
images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('iceberg-image');
    imageContainer.appendChild(img);
});

// Set the height of the body to allow scrolling
document.body.style.height = `${imageHeight * numImages}px`;

function updateScroll() {
    const scrollPosition = window.scrollY;
    const scrollPercent = scrollPosition / (document.body.scrollHeight - window.innerHeight);

    // Calculate current and next image index
    const currentIndex = Math.floor(scrollPercent * (numImages - 1));
    const nextIndex = Math.min(currentIndex + 1, numImages - 1);
    const progress = (scrollPercent * (numImages - 1)) - currentIndex;

    // Update image opacity for smooth transition
    document.querySelectorAll('.iceberg-image').forEach((img, index) => {
        if (index === currentIndex) {
            img.style.opacity = 1 - progress;
        } else if (index === nextIndex) {
            img.style.opacity = progress;
        } else {
            img.style.opacity = 0;
        }
    });
}

// Initial call to adjust the image opacity based on the initial scroll position
updateScroll();

window.addEventListener('scroll', updateScroll);
