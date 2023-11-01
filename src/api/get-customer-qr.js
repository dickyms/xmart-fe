import spring from './spring.js';

async function getCustomerByQR(QRcode) {
    try{
        const result = await spring.get(`/customers/qr/${QRcode}`);
        return result.data
    } catch (e) {
        console.log(e);
    }
}

export default getCustomerByQR;
