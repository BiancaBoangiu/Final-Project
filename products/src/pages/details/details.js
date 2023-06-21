import { getProductById } from "../../api/getProductById";
import { createProductDetailsCard } from "../../components/productDetailsCard";
import { addProductToCart } from "../../utils/cart";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");
let productPrice = 0;

if (productId === null) {
  document.getElementById("details").innerHTML = "";
  document.querySelector("footer").style.display = "none";
} else
  window.addEventListener("load", async () => {
    document.querySelector("footer").style.display = "block";
    const product = await getProductById(productId);
    productPrice = +product.price;
    document.getElementById("details").innerHTML =
      createProductDetailsCard(product);
  });

document.getElementById("details").addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const product = await getProductById(productId);
    const productName = product.name;
    console.log(productName);
    const message = document.createElement("p");
    message.innerText = `Ati adaugat ${productName} in cos`;
    message.classList.add("message");
    const app = document.querySelector("#app");
    app.appendChild(message);
    const navbarLinks = document.querySelectorAll(".navbar a");
    navbarLinks.forEach((link) => {
      {
        link.style.display = "none";
      }
    });
    addProductToCart(productId, productPrice);
    setTimeout(function () {
      window.location.href = "/index.html";
    }, 2000);
  }
});
