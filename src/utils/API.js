// import {BASE_URL, FAKE_BASE_URL} from "../actions/types";
import axios from 'axios';
import { toast } from 'react-toastify';
//import {loadState,loadAppMode} from "../utils/localStorage";


let BASE_URL = "https://lshub.herokuapp.com/api/v1/";

class ValidationError extends Error {
    constructor(message) {
        super(message); 
        this.status = "VALIDATION ERROR";
    }
}


const httpService = axios.create({
    baseURL: BASE_URL,
    timeout: 1000*60,
    headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem('Auth') ? `Bearer ${localStorage.getItem('Auth')}` : '' }
});



class HttpService {
    constructor(){
        this.sendPost = this.sendPost.bind(this);
        this.sendDelete = this.sendDelete.bind(this);
        this.sendPostNoAuth = this.sendPostNoAuth.bind(this);
        this.sendGet = this.sendGet.bind(this);
        this.sendPut = this.sendPut.bind(this);
    }


  sendPost = (url, postData) => {
    return httpService.post(`${BASE_URL}${url}`, postData)
        .then( res => {
            if (res.data.status === "success") {
                
               return res.data;
            } else {
                
                throw new Error(res.data.message);
            }
        })
        .catch(error=>{
            throw new Error(error.response.data.message);
        })
    }

  sendPostNoAuth = (url, postData) => {
    return httpService.post(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.data.status === "success") {
           return res.data;
        } else {
            
            throw new Error(res.data.message);
        }
    })
    .catch(error=>{
        throw new Error(error.response.data.message);
    })
}


  sendGet = (url) => {

    return httpService.get(`${BASE_URL}${url}`)
    .then( res => {
        
        if (res.status === 200) {
            console.log(res);
           return res.data;
        } else {
            
            throw new Error(res.data.message);
        }
    })
    .catch(error=>{
        throw new Error(error.response.data.message);
    })
}

  sendPut = (url, postData) => {
    return httpService.put(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.data.status === "success") {
            
           return res.data;
        } else {
            
            throw new Error(res.data.message);
        }
    })
    .catch(error=>{
        throw new Error(error.response.data.message);
    })
}

  sendDelete = (url, postData) => {
    return httpService.delete(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.data.status === "success") {
            
           return res.data;
        } else {
            
            throw new Error(res.data.message);
        }
    })
    .catch(error=>{
        throw new Error(error.response.data.message);
    })
};

}


export default HttpService;