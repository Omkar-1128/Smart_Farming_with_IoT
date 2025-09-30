// script.js

window.addEventListener("DOMContentLoaded", () => {
  const h2 = document.querySelector("h2");

  // Fade-in animation after 1 second
  setTimeout(() => {
    h2.classList.add("fade-in");
  }, 1000);

  // Change text on click
  h2.addEventListener("click", () => {
    h2.textContent = "Empowering Agriculture with Technology 🌾🚜";
  });
});
