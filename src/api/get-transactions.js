import spring from './spring.js';

async function getTransactions() {
    try{
        const result = await spring.get(`/transactions`);
        console.log(result);
        return result.data
    } catch (e) {
        console.log(e);
    }
}

export default getTransactions;