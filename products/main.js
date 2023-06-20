import './style.css';
import { getProducts } from './src/api/getProducts';
import { createProductCard } from './src/components/productCard';

window.addEventListener('DOMContentLoaded', () => {
	let isLoading = true;

	const spinnerHTML = `<div style="padding-left:40vw">
		<img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
		</div>
		`;

	const productsContainer = document.getElementById('products');

	getProducts().then((products) => {
		isLoading = false;
		const productHTML = products
			.map((product) => createProductCard(product))
			.join('');
		productsContainer.innerHTML = productHTML;
	});

	if (isLoading) {
		productsContainer.innerHTML = spinnerHTML;
	}
});
