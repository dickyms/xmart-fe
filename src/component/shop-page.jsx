import { useState } from 'react';
import Modal from './Modal';
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';
import getProductByBarcode from '../api/get-product-barcode';
import addTransactions from "../api/post-product";

const ShopPage = () => {
  const getProduct = async (barcode) => await getProductByBarcode(barcode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const onNewScanResult = async (decodedText, decodedResult) => {
        setProduct(await getProduct(decodedText));
        console.log(decodedResult);
        if (decodedText !== undefined) {
          setIsModalOpen(true)
        }
    };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [cartItems, setCartItems] = useState([]);

  const removeItemFromCart = (index) => {
    const updatedItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedItems);
  };

  const makeTransactions = async (item, index) => {
    const response = await
    addTransactions({
      barcode: item.barcode,
      qrcode: JSON.parse(localStorage.getItem("customer")).qrcode,
      price: item.price,
      quantity: item.quantity
    });
    removeItemFromCart(index);
  }

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems];
    const existingCartItemIndex = updatedCartItems.findIndex((item) => item.id === product.id);

    if (existingCartItemIndex !== -1) {
      updatedCartItems[existingCartItemIndex].quantity++;
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  const addToCart = () => {
    handleAddToCart({
      id: product.id,
      barcode: product.barcode,
      name: product.name,
      price: product.price,
    });
    setIsModalOpen(false);
  }

  if (localStorage.getItem('customer') != null) {
    return (
      <div style={{display:"flex"}}>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          formatsToSupport={[
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODE_128,
          ]}
        />
        <div>
          <div style={{margin: "30px", "border-style": "solid", paddingTop: "10px", paddingBottom: "30px", paddingLeft: "30px", paddingRight: "150px"}}>
            <h2>Shopping Cart</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={item.id}>
                  Name: {item.name} - Price: {item.price} - Quantity: {item.quantity}
                  <div style={{margin: "20px"}}>
                    <button style={{marginRight: "20px"}} onClick={() => removeItemFromCart(index)}>Delete</button>
                    <button onClick={() => makeTransactions(item, index)}>Buy</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        <Modal style={{padding: "200px"}} isOpen={isModalOpen} onClose={closeModal}>
          <h1>Detail Product</h1>
          <p>Name : {product.name}</p>
          <p>Price : {product.price}</p>
          <button onClick={addToCart}>Add To Cart</button>
        </Modal>
        <div>
      </div>
      </div>
  
    );
  } else {
    return (
      <div>
        <h1>Scan QR terlebih dahulu</h1>
        <button><a href={`/home`}>Home</a></button>
      </div>
      
    )
  }
};

export default ShopPage;