import { productsURL } from '../constans';

export const deleteProductById = async (id) => {
	const response = await fetch(`${productsURL}/${id}`, { method: 'DELETE' });
	const product = await response.json();
	return product;
};
