// Get the order Id of URL
const orderId = new URL(location.href).searchParams.get("orderId");
// display the order Id
document.getElementById("orderId").innerHTML = `${orderId}`;
// clear cart
localStorage.clear();
