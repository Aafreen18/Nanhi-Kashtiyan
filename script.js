document.addEventListener('DOMContentLoaded', function () {
    console.log("hello");
    var myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExample'), {
        interval: 2000,
        ride: 'carousel',
        wrap: true
    })
});


const time = new Date().getFullYear();
document.getElementById("footer-p").innerText = "©" + time + " Nanhi Kashtiyan | ALL RIGHTS RESERVED";

