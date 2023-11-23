document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.carousel-slides .slide').length;

    function showSlide() {
        var slidesContainer = document.querySelector('.carousel-slides');
        slidesContainer.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    }

    function moveSlide(step) {
        currentSlide += step;
        if (currentSlide >= totalSlides) currentSlide = 0;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        showSlide();
    }

    document.querySelector('.carousel-control.left').onclick = function() {
        moveSlide(-1);
    };

    document.querySelector('.carousel-control.right').onclick = function() {
        moveSlide(1);
    };

    showSlide();
});
