// Cards <a> & <article> createElement = old method

// const cardLink = document.createElement("a");
// document.getElementById("items").appendChild(cardLink);
// cardLink.setAttribute("href", "./product.html?id=42");
// cardLink.className = "card-link";
//cardLink.innerHTML = "<article></article>";

//let article = document.getElementsByTagName("article");
//article[0].innerHTML = "<p class='productDescription'>lorem ipsum</p>";

//const nameValue = document.querySelector(".productName");
//const descriptionValue = document.querySelector(".productDescription");
//const article = document.getElementsByTagName("article");

const url = "http://localhost:3000/api/products";

/**
 * request HTTP using fetch api
 * @param { string } response
 * @return { Promise } json
 */

let request = fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((value) => {
    //console.log(value);
    for (i = 0; i < value.length; i++) {
      //for (let product of value)
      const cardLink = document.createElement("a");
      const article = document.createElement("article");
      const headings = document.createElement("h3");
      const Description = document.createElement("p");
      const productImg = document.createElement("img");

      // Product card
      document.getElementById("items").appendChild(cardLink);
      cardLink.href = "./product.html?id=42";

      // Product article
      cardLink.appendChild(article);

      // Products images
      productImg.src = value[i].imageUrl;
      productImg.alt = value[i].altTxt;
      article.appendChild(productImg);

      // Products Headings
      headings.innerHTML = value[i].name;
      article.appendChild(headings);
      //nameValue.innerHTML = value[i].name;

      // Product description
      Description.innerHTML = value[i].description;
      article.appendChild(Description);
      //descriptionValue.innerHTML = value[i].description;
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// Event redirection on product page

// document.addEventListener("click", (e) => {
//   e.preventDefault();
//   location.href = "http://127.0.0.1:5500/front/html/product.html?id=42";
// });
