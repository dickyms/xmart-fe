import spring from './spring.js';

async function getProductByBarcode(barcode) {
    try{
        const result = await spring.get(`/products/barcode/${barcode}`);
        console.log(result.data);
        return result.data
    } catch (e) {
        console.log(e);
    }
}

export default getProductByBarcode;