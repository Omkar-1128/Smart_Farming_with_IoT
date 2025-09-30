window.addEventListener("DOMContentLoaded", () => {
  const h2 = document.querySelector("h2");
  const learnBtn = document.getElementById("learnBtn");
  const exploreBtn = document.getElementById("exploreBtn");

  // Fade in subtitle after 1 second
  setTimeout(() => {
    h2.classList.add("fade-in");
  }, 1000);

  // Change subtitle on click
  h2.addEventListener("click", () => {
    h2.textContent = "Empowering Agriculture with Smart Solutions 🌱🚜";
  });

  // Button interactions
  learnBtn.addEventListener("click", () => {
    alert("Redirecting to Learn More section...");
  });

  exploreBtn.addEventListener("click", () => {
    alert("Redirecting to Explore Features section...");
  });
});
