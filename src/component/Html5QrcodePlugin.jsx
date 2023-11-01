import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import '../css/customer-detail.css';
import PropTypes from 'prop-types';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    if (props.formatsToSupport !== undefined) {
        config.formatsToSupport = props.formatsToSupport;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {

    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, false);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, (error) => {
            console.warn(error)
        });

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div className='qr-box' id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;

Html5QrcodePlugin.propTypes = {
    qrCodeSuccessCallback : PropTypes.func.isRequired,
}