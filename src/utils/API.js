// import {BASE_URL, FAKE_BASE_URL} from "../actions/types";
import axios from "axios";
import { toast } from "react-toastify";
//import {loadState,loadAppMode} from "../utils/localStorage";

let BASE_URL = "https://lshub.herokuapp.com/api/v1/";

const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60,
  headers: {
    "content-type": "application/json",
    Authorization: localStorage.getItem("Auth")
      ? `Bearer ${localStorage.getItem("Auth")}`
      : ""
  }
});

// httpService.interceptors.response.use(
//     res => res,
//     err => {
//       return err;
//     }
//   )

const networkError = error => {
  const message = { message: "Something went wrong, please try again" };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data.message === "Unauthorized Access") {
      localStorage.clear();
      window.location.reload();
    } else {
      return error.response.data;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return message;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    return message;
  }
  console.log(error.config);
  //const message = {message: "Please check your network connection, and reload the page"}
};

const statusError = error => {
  if (error.message === "Unauthorized Access") {
    localStorage.clear();
    window.location.reload();
  } else {
    return error;
  }
};

class HttpService {
  constructor() {
    this.notify = this.notify.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.sendDelete = this.sendDelete.bind(this);
    this.sendPostNoAuth = this.sendPostNoAuth.bind(this);
    this.sendGet = this.sendGet.bind(this);
    this.sendPut = this.sendPut.bind(this);
  }

  notify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warn":
        toast.warn("Error: " + message);
        break;
      default:
        toast.warn(message);
        break;
    }
  };

  sendPost = (url, postData) => {
    return httpService
      .post(`${BASE_URL}${url}`, postData)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          statusError(res);
        }
      })
      .catch(err => networkError(err));
  };

  sendPostNoAuth = (url, postData) => {
    return httpService
      .post(`${BASE_URL}${url}`, postData)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          statusError(res);
        }
      })
      .catch(err => networkError(err));
  };

  sendGet = url => {
    return httpService
      .get(`${BASE_URL}${url}`)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          statusError(res);
        }
        // if(res.status === 200) {
        //     return res.data;
        // }else{
        //     statusError(res.data)
        // }
      })
      .catch(err => networkError(err));
  };

  sendPut = (url, postData) => {
    return httpService
      .put(`${BASE_URL}${url}`, postData)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          statusError(res);
        }
      })
      .catch(err => networkError(err));
  };

  sendDelete = url => {
    return httpService
      .delete(`${BASE_URL}${url}`)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          statusError(res);
        }
      })
      .catch(err => networkError(err));
  };
}

export default HttpService;
