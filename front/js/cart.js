const productValues = JSON.parse(localStorage.getItem("storage"));
console.log(productValues);

let totalPrice = 0;
let totalQty = 0;

// Remove cart's item
const delCartItem = () => {
  const deleteSelection = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteSelection.length; i++) {
    const deleteItem = deleteSelection[i]; // Permet de stocker la ou les valeurs de mon array dans une variable et on obtien un objet.
    deleteItem.addEventListener("click", () => {
      const selectId = deleteItem.closest("[data-id]").dataset.id;
      const selectColor = deleteItem.closest("[data-color]").dataset.color;
      console.log(selectId);
      console.log(selectColor);

      const toRemove = productValues.find(
        (element) => element === selectId || selectColor
        // element === deleteItem.closest("[data-id]").dataset.id &&
        // deleteItem.closest("[data-color]").dataset.color
      );
      console.log(toRemove);
      console.log(deleteItem);
      // let dataColor = document.querySelectorAll("[data-color]");
      // let dataId = document.querySelectorAll("[data-id]");
      // if (deleteItem === toRemove) {
      // let index = productValues.indexOf(i);
      // productValues.splice(index, 1);
      productValues.splice(toRemove, 3);
      console.log(productValues.splice(toRemove, 3));
      //localStorage.setItem("products", JSON.stringify(productValues));
      //cartArticle.removeChild(article);

      //}
      // data.datasets.splice(removalIndex, 1);
      //   data.datasets.find((dataset, index) => {
      //     if (dataset.id === 'myId') {
      //        data.datasets.splice(index, 1);
      //        return true; // stop searching
      //     }
      // });
      // myChart.update();
      // console.log(selectId);
      // console.log(selectColor);

      //window.location.reload();
    });

    // remove the cost of item from total
    // total -= itemCost[n]
  }
};

for (let i = 0; i < productValues.length; i++) {
  // dynamic product's ID function
  const articleID = getProductId();
  function getProductId() {
    return productValues[i].id;
  }

  // data-color & data-id
  const cartArticle = document.createElement("article");
  cartArticle.setAttribute("data-id", productValues[i].id); // <-----------dynamic value
  cartArticle.setAttribute("data-color", productValues[i].colors); // <-----------dynamic value

  // LocalStorage values creation&display
  const descriptionTextColor = document.createElement("p");
  descriptionTextColor.innerHTML = productValues[i].colors; // <-----------dynamic value
  const cartQtyInput = document.createElement("input");
  cartQtyInput.value = productValues[i].quantity; // <-----------dynamic value

  // function incrementation quantity for same color selection
  // function setIncrementationColor() {
  //   const checkColor = productValues.find(
  //     (Colors) => productValues[i].colors == productValues[i].colors
  //   );
  //   console.log(checkColor);
  //   return;
  // }

  //   );
  //   console.log(checkColor);
  //   //if (checkColor !== -1)
  //   if (checkColor) {
  //     productValues[i].quantity++;
  //     cartQtyInput.value++;
  // productValues.find(() => productValues.colors === productValues.colors);
  // if (productValues[i].colors === productValues[i].colors) {
  //   productValues.quantity + productValues.quantity == cartQtyInput.value;

  // fecth request API in Loop
  const url = `http://localhost:3000/api/products/${articleID}`;
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((value) => {
      // create HTML structure
      const cartItems = document.getElementById("cart__items");
      const articleImgTag = document.createElement("div");
      const articleImg = document.createElement("img");
      const cardContent = document.createElement("div");
      const cardDescription = document.createElement("div");
      const descriptionTitle = document.createElement("h2");
      const descriptionTextPrice = document.createElement("p");
      const cartSettings = document.createElement("div");
      const cartQtySettings = document.createElement("div");
      const cartDelete = document.createElement("div");
      const cartQtyText = document.createElement("p");
      const cartDeleteText = document.createElement("p");

      cartArticle.className = "cart__item";
      cartItems.appendChild(cartArticle);

      // image Tag article
      cartArticle.appendChild(articleImgTag);
      articleImgTag.className = "cart__item__img";
      articleImgTag.appendChild(articleImg);
      articleImg.src = value.imageUrl; // <-----------dynamic value
      articleImg.alt = value.altTxt; // <-----------dynamic value

      // div tag cart item content
      cartArticle.appendChild(cardContent);
      cardContent.className = "cart__item__content";

      // div tag cart item description
      cardContent.appendChild(cardDescription);
      cardDescription.className = "cart__item__content__description";
      cardDescription.appendChild(descriptionTitle);
      cardDescription.appendChild(descriptionTextColor);
      cardDescription.appendChild(descriptionTextPrice);
      descriptionTitle.innerHTML = value.name; // <-----------dynamic value
      descriptionTextPrice.innerHTML = `${value.price}` + "€"; // <-----------dynamic value

      // div tag cart item settings
      cardContent.appendChild(cartSettings);
      cartSettings.className = "cart__item__content__settings";

      // settings quantity
      cartSettings.appendChild(cartQtySettings);
      cartQtySettings.className = "cart__item__content__settings__quantity";
      cartQtySettings.appendChild(cartQtyText);
      cartQtyText.innerHTML = "Quantité :";

      // settings delete
      cartSettings.appendChild(cartDelete);
      cartDelete.className = "cart__item__content__settings__delete";
      cartDelete.appendChild(cartDeleteText);
      cartDeleteText.className = "deleteItem";
      cartDeleteText.innerHTML = "Supprimer";

      // settings quantity input
      cartQtySettings.appendChild(cartQtyInput);
      cartQtyInput.type = "number";
      cartQtyInput.className = "itemQuantity";
      cartQtyInput.name = "itemQuantity";
      cartQtyInput.min = "1";
      cartQtyInput.max = "100";

      // Totals quantities & prices
      totalPrice += parseInt(value.price) * parseInt(cartQtyInput.value);
      totalQty += parseInt(cartQtyInput.value);
      document.getElementById("totalQuantity").innerHTML = totalQty;
      document.getElementById("totalPrice").innerHTML = totalPrice;
      console.log(totalPrice);
      console.log(totalQty);

      // for one iteration on loop i
      if (i === productValues.length - 1) {
        // permet de recuperer sur la derniere itération de ma boucle pour eviter que cette fonction boucle 4 fois
        delCartItem();
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
