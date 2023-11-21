// Simulate loading by incrementing the progress every 100ms.
let progress = 0;
const progressBar = document.getElementById("progress");
const getStartedButton = document.getElementById("get-started-button");

function updateProgressBar() {
  if (progress <= 100) {
    progressBar.style.width = progress + "%";
    progress += 1;
    setTimeout(updateProgressBar, 10); // Adjust the delay as needed.
  } else {
    // Loading completed, show the "Get Started" button and the logo.
    getStartedButton.classList.remove("hidden");
    document.getElementById("loadingtext").textContent = "Complete"
  }
}

// Start loading when the page loads.
window.addEventListener("load", () => {
  updateProgressBar();
});



document.addEventListener("DOMContentLoaded", function() {
    const getStartedButton = document.getElementById("get-started-button");
    
    getStartedButton.addEventListener("click", function() {
        // Redirect to lesson.html
        window.location.href = "./asset/connect.html";
    });
});
