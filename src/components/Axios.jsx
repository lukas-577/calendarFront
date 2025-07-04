import axios from 'axios'

const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
        "Content-Type":"application/json",
        accept: "application/json"
    }
});

export default Axios