// DOM create elements

let cardLink = document.createElement("a");
document.getElementById("items").appendChild(cardLink);
cardLink.setAttribute("href", "./product.html?id=42");
cardLink.className = "card-link";
cardLink.innerHTML = "<article></article>";

let article = document.getElementsByTagName("article");
article[0].innerHTML =
  "<img src='' alt=''/>" +
  "<h3 class='productName'></h3>" +
  "<p class='productDescription'>lorem ipsum</p>";

/**
 * request HTTP using fetch api
 * @param { string } resolve
 * @return { Promise } json
 */

const url = "http://localhost:3000/api/products";

const nameValue = document.querySelector(".productName");
const descriptionValue = document.querySelector(".productDescription");
const imgValue = document.querySelector("article > img");

let request = fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    console.log(value);
    for (i = 0; i < value.length; i++) {
      //for (let product of value) {
      nameValue.innerHTML = `${value[i].name}`;
      descriptionValue.innerHTML = `${value[i].description}`;
      imgValue.setAttribute(
        `"src",${value[i].imageUrl}; "alt", ${value[i].altTxt}`
      );
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });
