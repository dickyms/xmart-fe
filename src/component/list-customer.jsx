import { useState } from "react";
import getCustomers from "../api/get-customers";

export default function ListCustomer () {
    const [customers, setCustomer] = useState([]);
    const getData = async () => {
        const response = await getCustomers();
        if (response !== undefined) {
            setCustomer(response);
        }
    }
    getData();
    return (
        <div>
            <h1>List Customer</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Wallet</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.wallet}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}