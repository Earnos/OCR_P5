// function getAllItems() {
//   for (i = 0; i < storage.length; i++)
//     //storage = JSON.parse(localStorage.getItem("localStorage")) || [];
//     localStorage.getItem(storage, JSON.stringify(storage[i]));
//   console.log(storage);
// }

const productValues = JSON.parse(localStorage.getItem("storage"));
console.log(productValues);

const url = `http://localhost:3000/api/products/${productValues.at(0).id}`;

// Product Cart Article
const cartItems = document.getElementById("cart__items");
const cartArticle = document.createElement("article");
const articleImgTag = document.createElement("div");
const articleImg = document.createElement("img");
const cardContent = document.createElement("div");
const cardDescription = document.createElement("div");
const descriptionTitle = document.createElement("h2");
const descriptionTextColor = document.createElement("p");
const descriptionTextPrice = document.createElement("p");
const cartSettings = document.createElement("div");
const cartQtySettings = document.createElement("div");
const cartDelete = document.createElement("div");
const cartQtyText = document.createElement("p");
const cartQtyInput = document.createElement("input");
const cartDeleteText = document.createElement("p");
// const articleAttr = document.createAttribute("data-id");
// articleAttr.value = `${productValues[0]}`;
// let id = productValues.find(
//   (identification) => productValues.id === `${productID}`
// );

cartArticle.className = "cart__item";
cartArticle.setAttribute("data-id", productValues.at(0).id); // <-----------valeur dynamique
cartArticle.setAttribute("data-color", productValues.at(1).colors); // <-----------valeur dynamique
cartItems.appendChild(cartArticle);

// image Tag article
cartArticle.appendChild(articleImgTag);
articleImgTag.className = "cart__item__img";
articleImgTag.appendChild(articleImg);
articleImg.src = "#"; // <-----------valeur dynamique
articleImg.alt = ""; // <-----------valeur dynamique

// div tag cart item content
cartArticle.appendChild(cardContent);
cardContent.className = "cart__item__content";

// div tag cart item description
cardContent.appendChild(cardDescription);
cardDescription.className = "cart__item__content__description";
cardDescription.appendChild(descriptionTitle);
cardDescription.appendChild(descriptionTextColor);
cardDescription.appendChild(descriptionTextPrice);

// div tag cart item settings
cardContent.appendChild(cartSettings);
cartSettings.className = "cart__item__content__settings";
// settings quantity
cartSettings.appendChild(cartQtySettings);
cartQtySettings.className = "cart__item__content__settings__quantity";
cartQtySettings.appendChild(cartQtyText);
cartQtyText.innerHTML = "Quantité :"; // <-----------valeur dynamique

// settings quantity input
cartQtySettings.appendChild(cartQtyInput);
cartQtyInput.type = "number";
cartQtyInput.className = "itemQuantity";
cartQtyInput.name = "itemQuantity";
cartQtyInput.min = "1";
cartQtyInput.max = "100";
cartQtyInput.value = productValues.at(2).quantity; // <-----------valeur dynamique

// settings delete
cartSettings.appendChild(cartDelete);
cartDelete.className = "cart__item__content__settings__delete";
cartDelete.appendChild(cartDeleteText);
cartDeleteText.className = "deleteItem";
cartDeleteText.innerHTML = "Supprimer";
