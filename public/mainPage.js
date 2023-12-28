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
