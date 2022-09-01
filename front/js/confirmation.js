// recuperation orderId command informations
sessionStorage.getItem(order);
// display the order Id
const orderID = URLSearchParams.get(orderId);
document.getElementById("orderId").innerHTML = `${orderID}`;
