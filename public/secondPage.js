const buttons = document.querySelectorAll(
  "#donation_registration .donation_type_buttons button"
);
let type = 0
function showWellForm() {
  document.getElementById("well_quantity_input").classList.remove("hidden");
  type = 3
  document.getElementById("sacrificial_type_input").classList.add("hidden");
  document.getElementById("animal_quantity_input").classList.add("hidden");
}

function showSacrificialForm() {
  document.getElementById("well_quantity_input").classList.add("hidden");
  document.getElementById("sacrificial_type_input").classList.remove("hidden");
  showAnimalQuantityInput();
}

function showAnimalQuantityInput() {
  var animalType = document.getElementById("animal_type").value;
  var animalQuantityInput = document.getElementById("animal_quantity_input");

  if (animalType === "kucukbas") {
    type = 1
    animalQuantityInput.innerHTML =
      "<label>Kaç Tane Küçükbaş Bağışlamak İstersiniz?</label>" +
      '<input type="number" required placeholder="örneğin : 3" />';
  } else if (animalType === "buyukbas") {
    type = 2
    animalQuantityInput.innerHTML =
      "<label>Kaç Tane Hisse Almak İstersiniz?</label>" +
      '<input type="number" required placeholder="örneğin : 3" />';
  }
  animalQuantityInput.classList.remove("hidden");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("selected")) {
      return;
    }

    buttons.forEach((otherButton) => {
      otherButton.classList.remove("selected");
    });

    button.classList.add("selected");
  });
});
