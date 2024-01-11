function displaySelectedPhoto(personNumber) {
  var fileInput = document.getElementById("fileInput" + personNumber);
  var currentPhoto = document.getElementById("currentPhoto" + personNumber);

  // Seçilen dosyanın yolunu al
  var selectedFile = fileInput.files[0];

  if (selectedFile) {
    if (selectedFile.type.startsWith("image/")) {
      var reader = new FileReader();
      reader.onload = function (e) {
        currentPhoto.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Lütfen bir resim dosyası seçin.");
    }
  }
}

async function show() {
  try {
    const response = await fetch("/api/donators");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    var tableBody = document
      .getElementById("myTable")
      .getElementsByTagName("tbody")[0];

    for (var i = 0; i < data.length; i++) {
      var row = tableBody.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);

      if (data[i].donationtype == 1) {
        cell4.innerHTML = "Kuyu";
      } else if (data[i].donationtype == 2) {
        cell4.innerHTML = "Küçükbaş";
      } else {
        cell4.innerHTML = "Büyükbaş";
      }
      cell1.innerHTML = data[i].name;
      cell2.innerHTML = data[i].surname;
      cell3.innerHTML = data[i].telno;
      cell5.innerHTML = data[i].donationquantity;
      cell6.innerHTML = data[i].donationamount;
    }
  } catch (error) {
    console.error(error);
    console.log("An error occurred while fetching data.");
  }
  // });
}

show();

function showSection(sectionId) {
  var allSections = document.querySelectorAll("section");
  allSections.forEach(function (section) {
    section.style.display = "none";
  });

  var selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "block";
  }
}
