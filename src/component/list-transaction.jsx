import { useState } from "react"
import getTransactions from "../api/get-transactions";
import getTransactionsMongo from "../api/get-transactions-mongo";
import PropTypes from 'prop-types';

const Table = ({ transactions }) => {
  return(
    <div style={{"overflow-y": "auto", "height": "500px"}}>
      <table>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>User ID</th>
          <th>Barcode</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id || transaction._id}</td>
            <td>{transaction.qrcode}</td>
            <td>{transaction.barcode}</td>
            <td>{transaction.price}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
export default function ListTransaction() {
    const [trx, setTrx] = useState([]);
    const transactionsPostgres = async () => {
      const result = await getTransactions();
      if(result) {
        setTrx(result);
      } else {
        setTrx([]);
      }
    }
    const transactionsMongo = async () => {
      const result = await getTransactionsMongo();
      if(result) {
        setTrx(result);
      } else {
        setTrx([]);
      }
    }
    return (
    <div>
      <h1>List Transaction</h1>
      <p>Choose Database</p>
      <div style={{display: "flex"}}>
        <button style={{margin: "10px"}} onClick={transactionsMongo}>MongoDB</button>
        <button style={{margin: "10px"}} onClick={transactionsPostgres}>PostgreSQl</button>
      </div>
      <Table transactions={trx}/>
    </div>
    )
}

Table.propTypes = {
  transactions : PropTypes.array
}