const productValues = JSON.parse(localStorage.getItem("storage"));
console.log(productValues);

// Remove cart's item
const delCartItem = () => {
  const deleteSelection = document.querySelectorAll(".deleteItem");
  for (i = 0; i < deleteSelection.length; i++) {
    const deleteItem = deleteSelection[i];
    deleteItem.addEventListener("click", () => {
      const indexToRemove = productValues.findIndex(
        (element) => element === productValues
      );
      console.log("click");

      // let target = e.target;
      // value.id = e.target;
      productValues.splice(indexToRemove, 3);
      console.log(productValues.splice(indexToRemove, 3));

      // remove the cost of item from total
      // total -= itemCost[n]
    });
  }
};

let totalPrice = 0;

for (i = 0; i < productValues.length; i++) {
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

  //   //let qtySum = 0;
  //   productValues.find((color) => productValues[i].colors);
  //const concatArray = productValues.concat(productValues);
  //console.table(concatArray);
  // let sumQty = productValues[i].quantity + productValues[i].quantity;
  // sumQty = productValues[i].quantity;
  //}
  //setIncrementationColor();

  //Remove cart's item
  // const deleteSelection = document.querySelector(".deleteItem");
  // console.log(deleteSelection);
  // deleteSelection.addEventListener("click", (e) => {
  //   productValues.findIndex((id) => id === id).splice(0, 3);
  // });
  // console.log(e.target);
  // console.log("clicked");

  //  function getTotal() {
  //    let totalPrice = 0;

  //    totalPrice += value.price * productValues[i].quantity;

  //    document.getElementById("totalQuantity").innerHTML = "";
  //    document.getElementById("totalPrice").innerHTML += totalPrice;
  //  }
  //  getTotal();

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

      //console.log(e.target);

      // Totals function
      //function getTotal() {
      //let totalPrice = 0;
      //let totalArticle = 0;
      //totalArticle =

      //totalPrice = new Object();
      totalPrice += parseInt(value.price) * parseInt(cartQtyInput.value);
      //totalPrice.concat(totalPrice[0]);
      //totalPrice.push(parseInt(value.price) * parseInt(cartQtyInput.value));
      // arrSum = function(arr){  return arr.reduce(function(a,b){    return a + b  }, 0);}
      // arrSum = function (totalPrice) {
      //   return totalPrice.reduce(function (a, b) {
      //     return a + b;
      //   }, 0);
      // };
      // totalPrice.forEach((number) => {
      // let sumOfPrice = 0;
      // sumOfPrice += (number + number).valueOf();
      // sumOfPrice = parseInt(sumOfPrice, 10);
      // });
      totalQty = 0;
      totalQty = parseInt(totalQty);
      totalQty = cartQtyInput.value;

      //let SumQty = 0;
      //Object.values(totalPrice);

      //totalArray = [];
      //totalArray.push(totalPrice);
      //console.log(totalArray);

      document.getElementById("totalQuantity").innerHTML = totalQty;
      document.getElementById("totalPrice").innerHTML = totalPrice;

      console.log(totalPrice);
      console.log(totalQty);
      //}
      //getTotal();
    })
    .catch((err) => {
      console.error("Error:", err);
    });
  // if (i === productValues.length - 1) {
  //   delCartItem();
  // } // permet de recuperer la derniere itération de ma boucle pour eviter que cette fonction boucle 4 fois
  // console.log(i);
  // console.log(productValues.length);
}
