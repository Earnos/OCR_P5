const url = "http://localhost:3000/api/products";

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
    for (i = 0; i < value.length; i++) {
      //for (let product of value)
      const cardLink = document.createElement("a");
      const article = document.createElement("article");
      const headings = document.createElement("h3");
      const Description = document.createElement("p");
      const productImg = document.createElement("img");

      // Product card
      document.getElementById("items").appendChild(cardLink);
      cardLink.href = "./product.html?id=" + value[i]._id;

      // Product article
      cardLink.appendChild(article);

      // Products images
      productImg.src = value[i].imageUrl;
      productImg.alt = value[i].altTxt;
      article.appendChild(productImg);

      // Products Headings
      headings.innerHTML = value[i].name;
      article.appendChild(headings);

      // Product description
      Description.innerHTML = value[i].description;
      article.appendChild(Description);
    }
  })
  .catch((err) => {
    console.error("Error:", err);
    alert("L'api n'est pas disponible");
  });
