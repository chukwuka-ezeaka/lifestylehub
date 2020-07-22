import HttpService from '../utils/API';

const _http = new HttpService();

class User{
    constructor(){
        this.getUser = this.getUser.bind(this);
    }

   getUser = async (id) => {
        const url = `account/user/get/${id}`;
       await _http.sendGet(url)
        .then(response => {
            console.log(response)
        if(response.status === 'success'){
         return response.data;
        }else{
        _http.notify(response.message);
        }
        });
    }
}

export default User;