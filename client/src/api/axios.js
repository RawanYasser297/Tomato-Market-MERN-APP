import axios  from 'axios'
const BASE_URL = "https://tomato-market-mern-app-server.onrender.com"
export  default axios.create({
    baseURL: BASE_URL,
})






export  const axiosPrivet =axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials:true,
    }
)
