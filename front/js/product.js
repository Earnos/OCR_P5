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
    const img = document.createElement("img");
    document.querySelector(".item__img").appendChild(img);
    img.src = value.imageUrl;
    img.alt = value.altTxt;

    document.getElementById("title").innerHTML = value.name;
    document.getElementById("price").innerHTML = value.price;
    document.getElementById("description").innerHTML = value.description;

    // Colors option selection
    for (let color in value.colors) {
      const select = document.getElementById("colors");
      const optionColors = document.createElement("option");

      select.appendChild(optionColors).value = value.colors[color];
      optionColors.innerHTML = value.colors[color];
    }
    // Add to cart's button
    const btn = document.getElementById("addToCart");
    btn.type = "button";

    /**
     * request HTTP using fetch api
     * @param { event } callback
     * @return { localStorage } string
     */

    btn.addEventListener("click", function getToCart() {
      if (typeof storage !== undefined) {
        //const valueObj = {};
        const storage = [];
        storage.push({ id: `${productID}` });
        storage.push({ colors: document.getElementById("colors").value });
        storage.push({ quantity: document.getElementById("quantity").value });
        console.log(storage);
        // JSON.parse(localStorage.setItem("colors", value.colors)) || [];
        // document.getElementById("colors").value = currentColors;
        // storage.push(JSON.parse(localStorage.setItem("currentColors")));
        // console.log(storage);
        // storage.localStorage.setItem("colors", value.colors[color]);

        localStorage.setItem("storage", JSON.stringify(storage));

        // localStorage.setItem("id", `${productID}`);
        // localStorage.setItem("colors", document.getElementById("colors").value);
        // localStorage.setItem("qty", document.getElementById("quantity").value);
        console.log(localStorage);

        // undefined color alert function
        // getColorValue();
        // non appropriate quantity value
        //getQtyValue();
        alert("Produit ajouté au panier");
      } else {
        alert("Une erreur c'est produite, veuillez réessayer s'il vous plaît.");
      }
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });

/**
 * undefined color value
 * @param { string } colors
 * @return { string } alert
 */
function getColorValue() {
  const select = document.getElementById("colors");
  const colorValue = document.getElementById("colors").value;
  if (typeof colorValue !== select);
  alert("Veuillez selectionner une couleur");
}

/**
 * innapropriate quantity value
 * @param { number } quantity
 * @return { string } alert
 */
function getQtyValue() {
  const quantity = document.getElementById("quantity").value;
  if (quantity < 1 && quantity > 100);
  alert("Quantité saisie incorrecte");
}
// Add to cart button
// const btn = document.getElementById("addToCart");
// btn.type = "button";

// btn.addEventListener("click", function getToCart() {
//   localStorage.getItem[(`${value.name}`, "description", "price", "colors")];
// });

//function getToCart() {}

// function invalidColor() {
//   if (optionColors != true)
//   return alert("Veuillez sélectioner une couleur")
// }
