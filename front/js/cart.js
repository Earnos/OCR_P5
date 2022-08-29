const productValues = JSON.parse(localStorage.getItem("storage"));
console.log(productValues);

let totalPrice = 0;
let totalQty = 0;

// Remove cart's item
const delCartItem = () => {
  const deleteSelection = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteSelection.length; i++) {
    const deleteItem = deleteSelection[i];
    deleteItem.addEventListener("click", () => {
      const selectId = deleteItem.closest("article").dataset.id;
      const selectColor = deleteItem.closest("article").dataset.color;
      const toRemove = productValues.findIndex(
        (element) => element.id === selectId && selectColor === element.colors
      );
      productValues.splice(toRemove, 1);
      localStorage.setItem("storage", JSON.stringify(productValues));
      window.location.reload();
    });
  }
};

// Uptdate quantity if its directly change on cart's item
const setQtyChange = () => {
  const qtyInput = document.querySelectorAll(".itemQuantity");
  const deleteSelection = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < qtyInput.length; i++) {
    const qtyChange = qtyInput[i];
    const deleteItem = deleteSelection[i];
    qtyChange.addEventListener("change", updateValue);
    function updateValue(e) {
      const selectId = deleteItem.closest("article").dataset.id;
      const selectColor = deleteItem.closest("article").dataset.color;
      const toChange = productValues.find(
        (p) => p.id === selectId && selectColor === p.colors
      );
      console.log(toChange);
      if (toChange) {
        toChange.quantity = parseInt(qtyChange.value);
        localStorage.setItem("storage", JSON.stringify(productValues));
        console.log(productValues);
        window.location.reload();
      }
    }
  }
};

// dynamic product's ID function
for (let i = 0; i < productValues.length; i++) {
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

      // for one iteration on loop
      if (i === productValues.length - 1) {
        // last iteration on loop evading multiple loop
        delCartItem();
        setQtyChange();
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

// Event input form
document.querySelector(".cart__order__form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Fetch POST request
  fetch(`http://localhost:3000/api/products/order`, {
    // Methode type
    method: "POST",
    // body or content to send
    body: JSON.stringify(contact, productValues.id),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((response) => response.json(productValues.id)) //orderId ?
    .catch((err) => console.log(err));

  // window.location.reload();

  const contact = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    adress: addressValue,
    city: cityValue,
    email: mailValue
  };
  console.log(contact);
});

// form's values
let erreur;
const firstNameValue = document.getElementById("firstName").value;
const lastNameValue = document.getElementById("lastName").value;
const addressValue = document.getElementById("address").value;
const cityValue = document.getElementById("city").value;
const mailValue = document.getElementById("email").value;
// form's inputs
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const mail = document.getElementById("email");

// form's inputs event
firstName.addEventListener("input", () => {
  console.log(firstName.value);
  if (isValidText(firstName.value)) {
    // function in condition with value in argument
    document.getElementById("firstNameErrorMsg").innerText = "";
    console.log("IsOk");
  } else {
    console.log("IsnotOk");
    document.getElementById("firstNameErrorMsg").innerText =
      "Saisie du prénom incorrecte";
  }
});

lastName.addEventListener("input", () => {
  console.log(lastName.value);
  if (isValidText(lastName.value)) {
    document.getElementById("lastNameErrorMsg").innerText = "";
    console.log("IsOk");
  } else {
    console.log("IsnotOk");
    document.getElementById("lastNameErrorMsg").innerText =
      "Saisie du nom incorrecte";
  }
});

address.addEventListener("input", () => {
  console.log(address.value);
  if (isValidAddress(address.value)) {
    document.getElementById("addressErrorMsg").innerText = "";
    console.log("IsOk");
  } else {
    console.log("IsnotOk");
    document.getElementById("addressErrorMsg").innerText =
      "Saisie de l'adresse incorrecte";
  }
});

city.addEventListener("input", () => {
  console.log(city.value);
  if (isValidCity(city.value)) {
    document.getElementById("cityErrorMsg").innerText = "";
    console.log("IsOk");
  } else {
    console.log("IsnotOk");
    document.getElementById("cityErrorMsg").innerText =
      "Saisie du nom de la ville incorrecte";
  }
});

mail.addEventListener("input", () => {
  console.log(mail.value);
  if (isValidEmail(mail.value)) {
    document.getElementById("emailErrorMsg").innerText = "";
    console.log("IsOk");
  } else {
    console.log("IsnotOk");
    document.getElementById("emailErrorMsg").innerText = "Email incorrect";
  }
});

// regex validation's test
const isValidText = (value) => {
  const re = /^([^0-9]*)$/;
  return re.test(value);
};

const isValidAddress = (value) => {
  // const re = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/;
  const re = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*$/;
  return re.test(value);
};

const isValidCity = (value) => {
  const re = /^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/;
  return re.test(value);
};

const isValidEmail = (value) => {
  const re =
    /^([a-zA-Z0-9]+(([\.\-\_]?[a-zA-Z0-9]+)+)?)\@(([a-zA-Z0-9]+[\.\-\_])+[a-zA-Z]{2,4})$/;
  return re.test(value);
};

// Regex declarations
// const nameReg = /^[a-z\d]{5,12}/i;
// const addressReg =
//   /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/i;
// const cityReg = /^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/i;
// const emailReg = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;

//Regex to validate input fields
// const patterns = {
//   username: /^[a-z\d]{5,12}/i,
//   name: /^[\p{L}\p{M} \-\.',]*$/,
//   Address:
//     /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/,
//   city: /^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/,
//   email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
// };

// error message on unvalid user's inputs
// if (!res1) {
//   errorMsg = document.getElementById("firstNameErrorMsg");
//   errorMsg.innerHTML = "Veuillez renseigner un nom";
//   // erreur = "Veuillez renseigner un nom";
// }
// if (!lastNameValue) {
//   erreur = "Veuillez renseigner un prénom";
// }
// if (erreur) {
//   e.preventDefault();
// } else {
//   alert("Votre commande a été validée");
// }

// Event for post order
// const orderInput = document.getElementById("order");
// orderInput.addEventListener("submit", () => {
//   // Fetch POST request
//   fetch(`http://localhost:3000/api/products/order`, {
//     // Methode type
//     method: "POST",
//     // body or content to send
//     body: JSON.stringify(contact, productValues.id),
//     headers: { "Content-type": "application/json; charset=UTF-8" }
//   })
//     .then((response) => response.json(productValues.id)) //orderId ?
//     .catch((err) => console.log(err));

// window.location.reload();
// });
