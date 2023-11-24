document.addEventListener('DOMContentLoaded', function() {
    var password = "YourPassword"; // Replace with your desired password

    var correctPassword = false;
    while (!correctPassword) {
        var userPassword = prompt("Please enter the password to view this page:");

        if (userPassword === null) {
            window.location = "http://www.your-redirect-url.com"; // Redirect if cancel is clicked
            break;
        } else if (userPassword === password) {
            correctPassword = true;
            document.getElementById('password-protected').style.display = 'block';
        } else {
            alert("Incorrect password, try again.");
        }
    }
});
