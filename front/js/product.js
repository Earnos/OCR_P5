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
     * On onclick event, add to cart item's function
     * @param { event } callback
     * @return { localStorage } string
     */

    btn.addEventListener("click", function getToCart() {
      // undefined color alert function
      const colorValue = document.getElementById("colors").value;
      if (!colorValue) {
        alert("Veuillez selectionner une couleur");
        return;
      }
      // non-appropriate quantity value
      const quantity = parseInt(document.getElementById("quantity").value);
      if (quantity < 1 || quantity > 100) {
        alert("Quantité saisie incorrecte");
        return;
      }

      // localStorage push
      if (typeof storage !== undefined) {
        const storage = JSON.parse(localStorage.getItem("storage")) || [];

        //console.log(localStorage);
        alert("Produit ajouté au panier");

        // If same products id/color, display 1 with quantity++
        let foundProduct = storage.find(
          (p) => p.id === productID && colorValue === p.colors
        );
        console.log(foundProduct);
        if (foundProduct !== undefined) {
          foundProduct.quantity += quantity;
          console.log(foundProduct);
        } else if (foundProduct == null) {
          storage.push({
            id: `${productID}`,
            colors: document.getElementById("colors").value,
            quantity: parseInt(document.getElementById("quantity").value)
          });
        }
        console.log(storage);
        localStorage.setItem("storage", JSON.stringify(storage));
      } else {
        alert("Une erreur c'est produite, veuillez réessayer s'il vous plaît.");
      }
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
