import "./style.css";

export const createProductDetailsCard = (product) => `
   <div class="card-details" >
      <img src=${product.image}>
      <div class="product-info">
         <span> ${product.name}</span>
         <p>${product.details}</p>
         <span>In stoc: ${product.stock}</span> 
      </div>
      <div class="button-product-details">
         <span>${product.price} LEI</span>
         <button class="add-to-cart-btn">Add To Cart</button>
      </div>
   </div>
`;
