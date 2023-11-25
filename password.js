document.addEventListener('DOMContentLoaded', function() {
    var password = "salmonlover135!"; // Replace with your desired password

    var correctPassword = false;
    while (!correctPassword) {
        var userPassword = prompt("What is our favorite Plum Tree roll (all lowercase one word)?:");

        if (userPassword === null) {
            window.location = "https://txreport.com/"; // Redirect if cancel is clicked
            break;
        } else if (userPassword === password) {
            correctPassword = true;
            document.getElementById('password-protected').style.display = 'block';
        } else {
            alert("Incorrect password, try again.");
        }
    }
});
