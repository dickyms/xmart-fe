import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000',  // Set the base URL for the requests
    timeout: 5000,  // Set a timeout of 5 seconds for requests
    headers: {
      'Content-Type': 'application/json',  // Set default headers for all requests
    },
  });
  
  export default instance;