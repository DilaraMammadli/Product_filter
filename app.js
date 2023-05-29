// const section = document.getElementById("demo");
// const newElement = document.createElement("div");
// newElement.textContent = "New Element";
// section.append(newElement);
// const list = document.querySelector("#list");
// const todos = [
//   "Play chess",
//   "Learn new openings",
//   "Reading new endgame books",
//   "Watching new games",
// ];
// todos.map((todo) => {
//   const li = document.createElement("li");
//   li.textContent = todo;
//   list.append(li);
//   list.prepend(li);
// });
// const heading = document.querySelector("#heading_1");
// heading.classList.add("demo");
// heading.classList.remove("demo");
// heading.addEventListener("click", () => {
//   if (heading.classList.contains("demo")) {
//     heading.classList.remove("demo");
//   } else {
//     heading.classList.add("demo");
//   }
//   heading.classList.toggle("demo");
// });
const products = document.querySelector(".products");
const search = document.getElementById("search");
const minPrice = document.getElementById("min_price");
let data = [];
const showData = () => {
  products.innerHTML = "";
  data.sort((a, b) => b.price - a.price);
  let filteredProducts = data.filter((a) =>
    a.title.toLowerCase().startsWith(search.value.toLowerCase())
  );
  if (+minPrice.value) {
    filteredProducts = filteredProducts.filter(
      (a) => a.price <= +minPrice.value
    );
  }
  if (!filteredProducts.length) {
    let notFound = document.createElement("h1");
    notFound.classList.add("not__found");
    notFound.textContent = `${search.value} axtarışında heç nə tapılmadı..`;
    products.append(notFound);
    return;
  }
  filteredProducts.map((a) => {
    console.log(a);
    const product = document.createElement("div");
    product.classList.add("product");
    const productImage = document.createElement("div");
    productImage.classList.add("product__image");
    const photo = document.createElement("img");
    photo.src = a.image;
    productImage.append(photo);
    const productDetails = document.createElement("div");
    productDetails.classList.add("product__details");
    const name = document.createElement("h3");
    name.textContent = a.title.slice(0, 25) + "...";
    const price = document.createElement("h1");
    price.textContent = `$${a.price}`;
    productDetails.append(name, price);
    product.append(productImage, productDetails);
    products.append(product);
  });
};
search.addEventListener("input", showData);
minPrice.addEventListener("input", showData);
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((responseData) => {
    data = responseData;
    showData();
    search.disabled = false;
    minPrice.disabled = false;
  });
