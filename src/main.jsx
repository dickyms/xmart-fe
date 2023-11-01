import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import Root from "./routes/root";
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListCustomer from './component/list-customer';
import CustomerDetail from './component/customer-detail';
import ShopPage from './component/shop-page';
import ListProduct from './component/list-product';
import ListTransaction from './component/list-transaction';

import store from './store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/customers",
        element: <ListCustomer/>
      },
      {
        path: "/products",
        element: <ListProduct/>
      },
      {
        path: "/home",
        element: <CustomerDetail />
      },
      {
        path: "/transactions",
        element: <ListTransaction />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
