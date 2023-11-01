import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';
import '../css/customer-detail.css';
import getCustomerByQR from "../api/get-customer-qr.js";
import { useState } from "react";

export default function CustomerDetail() {
    const [customer, setCustomer] = useState({});

    const deleteCustomer = () => {
        localStorage.removeItem("customer");
        setCustomer({});
    }

    const buttonLogout = (userId) => {
        return (
            <div>
                <button onClick={deleteCustomer}>
                {userId} - logout
                </button>
            </div>
        )
    }

    const onNewScanResult = async (decodedText, decodedResult) => {
        console.log(decodedResult);
        const result = await getCustomerByQR(decodedText);
        localStorage.setItem("customer", JSON.stringify(result));
        setCustomer(result);
    };

    let data;
    if (localStorage.getItem("customer") != null) {
        data = JSON.parse(localStorage.getItem("customer"));
    }
    
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
            
            <div style={{ marginLeft: "20px",}}>
                <div style={{"border-style": "solid", paddingTop: "10px", paddingBottom: "30px", paddingLeft: "30px", paddingRight: "150px"}}>
                    <h1>Customer Detail</h1>
                    <p>Name : {customer.name || ""}</p>
                    <p>Wallet: {customer.wallet || ""}</p>
                    {localStorage.getItem("customer") != null ? buttonLogout(localStorage.getItem("customer") != null ? JSON.parse(localStorage.getItem("customer")).qrcode : null) : null}
                </div>
            </div>

        </div>
    )
}