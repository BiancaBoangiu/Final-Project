import { getProductById } from "../../api/getProductById";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  getProductQuantityFromLocalStorage,
  isProductAlreadyInCart,
  calculateUpdatedSum,
} from "../../utils/cart";

const showProducts = async () => {
  const cart = localStorage.getItem("cart");
  const products = JSON.parse(cart);
  document.getElementById("cart").innerHTML = "";
  let sum = 0;

  for (const product of products) {
    const productInfo = await getProductById(product.id);
    document.getElementById(
      "cart"
    ).innerHTML += `<div id="p${product.id}" class='product-details'>
      <img src=${productInfo.image} />
      <a href='../details/details.html?id=${product.id}' class="product-name">${productInfo.name}</a>
      <span>${productInfo.price} LEI</span>
      <div class="buttons">
        <button id=${product.id} class="decrement-quantity">-</button>
        <span class="quantity">${product.quantity}</span>
        <button id=${product.id} class="increment-quantity">+</button>
      </div>
      <button id=${product.id} class="delete-product">X</button>
    </div>`;

    const sumProduct = +product.quantity * +productInfo.price;
    sum += +sumProduct;
  }
  document.getElementById("sum").innerHTML = `Total: ${sum} LEI`;
};

window.addEventListener("load", showProducts);

document.getElementById("cart").addEventListener("click", async (e) => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  const productId = e.target.id;

  if (e.target.classList.contains("decrement-quantity")) {
    decrementProductQuantity(productId, cartArray);
    calculateUpdatedSum(cartArray);
  } else if (e.target.classList.contains("increment-quantity")) {
    incrementProductQuantity(productId, cartArray);
    calculateUpdatedSum(cartArray);
  } else if (e.target.classList.contains("delete-product")) {
    const productElement = e.target.parentElement;
    productElement.remove();
    const index = cartArray.findIndex((obj) => obj.id === productId);
    if (index !== -1) {
      cartArray.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));

  if (isProductAlreadyInCart(productId, cartArray)) {
    document
      .getElementById("cart")
      .querySelector("#p" + productId)
      .querySelector(".quantity").innerHTML =
      getProductQuantityFromLocalStorage(productId, cartArray);
  }
});
