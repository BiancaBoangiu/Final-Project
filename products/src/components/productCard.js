import "./style.css";

export const createProductCard = (product) => `
   <div class="card-home">
      <p>${product.name}</p>
      <img src=${product.image} />
      <p>${product.price} LEI</p>
      <a href="src/pages/details/details.html?id=${product.id}">Details</a>
   </div>
`;
