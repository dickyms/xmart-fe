import { useState } from 'react'
import '../css/list-product.css'
import getProducts from '../api/get-products';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const fetch = async () => {
      const response = await getProducts();
      if (response) {
        setProducts(response);
      }
    }
    fetch();
    return (
    <div>
      <h1>List Product</h1>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
    )
}