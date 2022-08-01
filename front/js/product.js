const productID = getProductId();

function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

const url = `http://localhost:3000/api/products/${productID}`;

/**
 * request HTTP using fetch api
 * @param { string } response
 * @return { Promise } json
 */

fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    document.getElementById("title").innerHTML = value.name;
    document.getElementById("price").innerHTML = value.price;
    document.getElementById("description").innerHTML = value.description;
    for (let color in value.colors) {
      document.getElementById("colors").innerText = color[value.colors];
    }
  })

  .catch((err) => {
    console.error("Error:", err);
  });
