document.getElementById('envelope').onclick = function() {
    openModal(0); // Open the modal with the first page of the letter
};

document.getElementById('open-text').onclick = function() {
    openModal(0); // Same as above
};

var currentSlide = 0;
var slides = ["LetterPart1.png", "LetterPart2.png", "LetterPart3.png"]; // Replace with the paths to your letter images

function openModal(n) {
    document.getElementById('letterModal').style.display = "block";
    showSlides(currentSlide = n);
}

function changeSlide(n) {
    showSlides(currentSlide += n);
}

function showSlides(n) {
    var i;
    var modalImg = document.getElementById("letterImg");
    if (n >= slides.length) { currentSlide = 0 }
    if (n < 0) { currentSlide = slides.length - 1 }
    modalImg.src = slides[currentSlide];
}

// Close Modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    document.getElementById('letterModal').style.display = "none";
};
