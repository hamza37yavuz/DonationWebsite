function displaySelectedPhoto(personNumber) {
    var fileInput = document.getElementById("fileInput" + personNumber);
    var currentPhoto = document.getElementById(
      "currentPhoto" + personNumber
    );

    // Seçilen dosyanın yolunu al
    var selectedFile = fileInput.files[0];

    if (selectedFile) {
      // Dosya tipini kontrol et (sadece resim dosyalarına izin ver)
      if (selectedFile.type.startsWith("image/")) {
        // Seçilen dosyayı görüntüle
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

  // Bu kısımda genel bilgileri güncelleyen bir JavaScript kodu ekleyebilirsiniz.
  // Gerçek bir proje için, sunucu tarafında bu bilgileri getirecek bir API kullanmalısınız.

  // Örnek veri (gerçek bir projede sunucu tarafından getirilir)
  var totalWellDonors = 50;
  var totalQurbanDonors = 30;

  // HTML içindeki span elementlerini güncelle
  document.getElementById("totalWellDonors").innerText = totalWellDonors;
  document.getElementById("totalQurbanDonors").innerText =
    totalQurbanDonors;

  function showSection(sectionId) {
    // Tüm bölümleri gizle
    var allSections = document.querySelectorAll("section");
    allSections.forEach(function (section) {
      section.style.display = "none";
    });

    // Belirli bölümü göster
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.style.display = "block";
    }
  }