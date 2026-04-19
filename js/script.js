const starsContainer = document.getElementById("starsContainer");
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");

let currentRating = 0; // The locked rating set by a click
let hoverRating = 0; // The temporary rating based on mouse movement

// Updates the visual appearance of the stars
function renderStars(rating) {
  stars.forEach((star, index) => {
    const starValue = index + 1;

    // Reset classes
    star.classList.remove("full", "half");

    // Apply appropriate class based on the rating
    if (rating >= starValue) {
      star.classList.add("full");
    } else if (rating === starValue - 0.5) {
      star.classList.add("half");
    }
  });
}

// Determines the text message based on the rating score
function getRatingMessage(rating) {
  if (rating === 0) return "Rate this!";
  if (rating > 0 && rating <= 1.5) return "Poor";
  if (rating > 1.5 && rating <= 3.5) return "Good";
  if (rating > 3.5 && rating <= 5) return "Excellent";
}

// Attach events to each individual star
stars.forEach((star) => {
  star.addEventListener("mousemove", (e) => {
    // Hard Mode: Calculate mouse position inside the star
    const rect = star.getBoundingClientRect();
    const xPos = e.clientX - rect.left; // X-coordinate of the click within the star
    const starIndex = parseInt(star.getAttribute("data-index"));

    // If mouse is on the left half of the star, it's a half rating
    if (xPos < rect.width / 2) {
      hoverRating = starIndex - 0.5;
    } else {
      hoverRating = starIndex;
    }

    renderStars(hoverRating);
  });

  // Lock in the rating on click
  star.addEventListener("click", () => {
    currentRating = hoverRating;
    ratingText.textContent = getRatingMessage(currentRating);
  });
});

// Revert visuals back to the locked rating when the mouse leaves the whole container
starsContainer.addEventListener("mouseleave", () => {
  renderStars(currentRating);
});
