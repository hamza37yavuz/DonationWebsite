const buttons = document.querySelectorAll(
  "#donation_registration .donation_type_buttons button"
);
let type = 3;
function showWellForm() {
  document.getElementById("well_quantity_input").classList.remove("hidden");
  type = 3;
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
    type = 1;
    animalQuantityInput.innerHTML =
      "<label for='quantity1'>Kaç Tane Küçükbaş Bağışlamak İstersiniz?</label>" +
      '<input type="number" id ="quantity1" required placeholder="örneğin : 3" />';
  } else if (animalType === "buyukbas") {
    type = 2;
    animalQuantityInput.innerHTML =
      "<label for='quantity2'>Kaç Tane Hisse Almak İstersiniz?</label>" +
      '<input type="number" id ="quantity2" required placeholder="örneğin : 3" />';
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

function submitForm() {
  // Formdaki verileri al
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var phoneNumber = document.getElementById("phoneNumber").value;

  // JSON formatına dönüştür
  var amount = 0;
  if (type === 1) {
    var quantity = document.getElementById("quantity1").value;
    amount = 3000 * quantity;
  } else if (type === 2) {
    var quantity = document.getElementById("quantity2").value;
    amount = 3500 * quantity;
  } else {
    var quantity = document.getElementById("quantity").value;
    amount = 100 * quantity;
  }

  var formData = {
    name: firstName,
    surname: lastName,
    telno: phoneNumber,
    donationtype: type,
    donationquantity: quantity,
    donationamount: amount,
  };
  console.log(type);
  fetch("http://localhost:3000/api/donation/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("d...");
      window.location.reload();
    })
    .catch((error) => {
      console.error("KAYIT BAŞARILI", error);
      alert("KAYIT BAŞARILI", error);
    });
  // Değişkeni konsola yazdır (test amaçlı)

  // İsterseniz bu JSON verilerini başka bir yere gönderebilir veya işleyebilirsiniz.
}
