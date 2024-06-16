let slideIndex = 0;
const slides = document.getElementsByClassName('slide');

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

showSlides();


const time = new Date().getFullYear();
document.getElementById("footer-p").innerText = "©" + time + " Nanhi Kashtiyan | ALL RIGHTS RESERVED";

