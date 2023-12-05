function showWellForm() {
  document.getElementById("well_quantity_input").classList.remove("hidden");
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
    animalQuantityInput.innerHTML =
      "<label>Kaç Tane Küçükbaş Bağışlamak İstersiniz?</label>" +
      '<input type="number" required placeholder="örneğin : 3" />';
  } else if (animalType === "buyukbas") {
    animalQuantityInput.innerHTML =
      "<label>Kaç Tane Hisse Almak İstersiniz?</label>" +
      '<input type="number" required placeholder="örneğin : 3" />';
  }
  animalQuantityInput.classList.remove("hidden");
}
