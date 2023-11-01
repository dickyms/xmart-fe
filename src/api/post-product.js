import express from './express.js';

const graphqlQuery = `
  query($qrcode: String!, $barcode: String!, $price: Float!, $quantity: Int!) {
    postTransaction(qrcode: $qrcode, barcode: $barcode, price: $price, quantity: $quantity) {
      qrcode,
      barcode,
      quantity,
      price,
      _id
    }
  }
`;

const addTransactions = async (product) => {
    try {
        const variables = {
            qrcode: product.qrcode,
            barcode: product.barcode,
            price: product.price,
            quantity: product.quantity
        };
        const response = await express.post('/graphql', 
        {
            query: graphqlQuery,
            variables: variables
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.request);
    }
}

export default addTransactions;