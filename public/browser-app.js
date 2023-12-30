const shareCount = document.getElementById("shareCount");

const showShareCount = async () => {
  try {
    const response = await fetch("/api/donation");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // console.log(data, "3");
    shareCount.innerHTML = data[0].quantity;
  } catch (error) {
    console.error(error);
    console.log("hata oldu showda");
  }
};

showShareCount();
