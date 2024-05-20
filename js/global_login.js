// Function to get the value of a specific cookie
function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        // Remove whitespace at the beginning of the cookie name and compare it with the given string
        if(name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

// Check if cookies exist
let username = getCookie("username");
let user_id = getCookie("user_id");
let isAuthenticated = getCookie("isAuthenticated");

if (username && user_id && isAuthenticated) {
    // User is authenticated
    console.log("User is logged in.");
} else {
    // User is not authenticated, redirect to login page
    window.location.href = "login.html";
}
