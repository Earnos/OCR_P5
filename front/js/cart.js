// function getAllItems() {
//   for (i = 0; i < storage.length; i++)
//     //storage = JSON.parse(localStorage.getItem("localStorage")) || [];
//     localStorage.getItem(storage, JSON.stringify(storage[i]));
//   console.log(storage);
// }
/**
 * @params { object } array
 */
function getAllItems() {
  const productValues = JSON.parse(localStorage.getItem("storage"));
  console.log(productValues);
}
getAllItems();
