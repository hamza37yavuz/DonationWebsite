function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

document
  .getElementById("purpose-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    scrollToSection("informations");
  });

document
  .getElementById("our_activities-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    scrollToSection("our_activities");
  });

document
  .getElementById("connections-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    scrollToSection("connections");
  });

let currentCartIndex = 0;

function changeCart(direction) {
  const carts = document.querySelectorAll(".carts_info");
  carts[currentCartIndex].classList.remove("active");

  // Calculate the next index
  currentCartIndex =
    (currentCartIndex + direction + carts.length) % carts.length;

  carts[currentCartIndex].classList.add("active");
}
