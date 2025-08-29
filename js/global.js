let isOpen = false;
function toggleMenu() {
  isOpen = !isOpen;
  const menu = document.getElementById("mobile-menu");
  const img = document.getElementById("menu-img");

  if (isOpen) {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    img.src = "/assets/close.svg";
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    img.src = "/assets/hamburger.svg";
  }
}

// Highlight menu berdasarkan path
const currentPath = window.location.pathname;

// Desktop menu
document.querySelectorAll(".nav-item").forEach((el) => {
  if (el.getAttribute("data-path") === currentPath) {
    el.classList.add("text-[#BAFD02]");
    el.classList.remove("text-white");
  } else {
    el.classList.add("text-white");
    el.classList.remove("text-[#BAFD02]");
  }
});

// Mobile menu
document.querySelectorAll(".mobile-nav-item").forEach((el) => {
  if (el.getAttribute("data-path") === currentPath) {
    el.classList.add("bg-[#BAFD02]", "text-black");
    el.classList.remove("text-[#BAFD02]");
  } else {
    el.classList.add("text-[#BAFD02]");
    el.classList.remove("bg-[#BAFD02]");
  }
});