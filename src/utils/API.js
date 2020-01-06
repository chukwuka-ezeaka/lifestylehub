// import {BASE_URL, FAKE_BASE_URL} from "../actions/types";
import axios from 'axios';
import { toast } from 'react-toastify';
//import {loadState,loadAppMode} from "../utils/localStorage";


let BASE_URL = "https://lshub.herokuapp.com/api/v1/";

const httpService = axios.create({
    baseURL: BASE_URL,
    timeout: 1000*60,
    headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem('Auth') ? `Bearer ${localStorage.getItem('Auth')}` : '' }
});

httpService.interceptors.response.use(
    res => res,
    err => {
      throw new Error(err.response.data.message);
    }
  )

const networkError = {
    message: "Please check your network connection, and reload the page"
}

class HttpService {
    constructor(){
        this.notify = this.notify.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.sendDelete = this.sendDelete.bind(this);
        this.sendPostNoAuth = this.sendPostNoAuth.bind(this);
        this.sendGet = this.sendGet.bind(this);
        this.sendPut = this.sendPut.bind(this);
    }

    notify = (message, type) => {
        switch(type){
            case "success":
                toast.success(message);
                break;
            case "warn":
                toast.warn("Error: " + message);
                break;
            default:
                toast.warn("Error: " + message);
                break;
          }
    }


  sendPost = (url, postData) => {
    return httpService.post(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.status === 200) {
           return res.data;
        } else {
            return res.data;
        }
    })
    .catch(err=> err)
    }

  sendPostNoAuth = (url, postData) => {
    return httpService.post(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.status === 200) {
           return res.data;
        } else {
            return res.data;
        }
    })
    .catch(err=> networkError)
}


  sendGet = (url) => {
    return httpService.get(`${BASE_URL}${url}`)
    .then( res => {
        if (res.status === 200) {
           return res.data;
        } else {
            return res.data;
        }
    })
    .catch(err=> networkError)
}

  sendPut = (url, postData) => {
    return httpService.put(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.status === 200) {
           return res.data;
        } else {
            return res.data;
        }
    })
    .catch(err=> networkError)
}

  sendDelete = (url, postData) => {
    return httpService.delete(`${BASE_URL}${url}`, postData)
    .then( res => {
        if (res.status === 200) {
           return res.data;
        } else {
            return res.data;
        }
    })
    .catch(err=> networkError)
};

}


export default HttpService;