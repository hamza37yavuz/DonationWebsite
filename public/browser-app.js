const shareCount = document.getElementById("shareCount");
const loadingSpinner = document.getElementById("loadingSpinner");
const mainContent = document.getElementById("mainContent");
const loginBtn = document.getElementById("login_button");
const mail = document.getElementById("login_mail");
const password = document.getElementById("login_password");
const formDOM = document.getElementById("form");

const showShareCount = async () => {
  if (window.location.href.includes("secondPage.html")) {
    try {
      const response = await fetch("/api/donation");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      shareCount.innerHTML = data[0].quantity;

      // Show the main content after successfully fetching data
      loadingSpinner.style.display = "none";
      mainContent.style.display = "block";
    } catch (error) {
      console.error(error);
      console.log("An error occurred while fetching data.");
    }
  }
};

showShareCount();

formDOM.addEventListener("submit", async (e) => {
  const user = {
    email: mail.value,
    password: password.value,
  };
  e.preventDefault();

  console.log("heyy i am heree! 11");
  try {
    const { data } = await axios.post("api/login", user);

    localStorage.setItem("token", data.token);
  } catch (error) {
    localStorage.removeItem("token");
    console.log("fromDom erro");
  }
});

loginBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.get("api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success == true) {
      window.location.href = "admin.html";
    }
    if (data.success == false) {
      console.log("Mail veya şifre yanlış!");
    }
  } catch (error) {
    console.error("Hata.btnlogin:", error);
  }
});
