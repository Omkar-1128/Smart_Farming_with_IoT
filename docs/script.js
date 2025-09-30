// script.js

window.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const h2 = document.querySelector("h2");

  // Show h1 and h2 with animations
  setTimeout(() => {
    h1.style.opacity = 1;
  }, 200);

  setTimeout(() => {
    h2.classList.add("fade-in");
  }, 1000);

  // Change text on click
  h2.addEventListener("click", () => {
    h2.textContent = "Empowering Agriculture with Technology 🌾🚜";
  });
});
