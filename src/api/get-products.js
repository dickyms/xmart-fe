import spring from './spring.js';

async function getProducts() {
    try{
        const result = await spring.get(`/products`);
        console.log(result.data);
        return result.data
    } catch (e) {
        console.log(e);
    }
}

export default getProducts;