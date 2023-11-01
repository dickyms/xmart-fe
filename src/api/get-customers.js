import spring from './spring.js';

async function getCustomers() {
    try{
        const result = await spring.get(`/customers`);
        return result.data
    } catch (e) {
        console.log(e);
    }
}

export default getCustomers;
