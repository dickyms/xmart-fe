import express from './express.js';

const graphqlQuery = `
    {
        getTransactions {
            qrcode,
            barcode,
            quantity,
            price,
            date,
            _id
        }
    }
`;

async function getTransactionsMongo() {
    try{
        const result = await express.post(`/graphql`, {
            query: graphqlQuery
        });
        console.log(result);
        console.log(result.data.data.getTransactions);
        return result.data.data.getTransactions;
    } catch (e) {
        console.log(e);
    }
}

getTransactionsMongo()

export default getTransactionsMongo;