import { makeAutoObservable } from 'mobx';
import { loginUser, postUser } from '../services/userService';

class UserStore {
    isAuth = false;
    username = '';
    token = '';
    constructor() {
        makeAutoObservable(this);
    }
    logoutUser() {
        this.isAuth = false;
        this.username = '';
        this.token = '';
    }

    addUser(userInfo) {
        postUser(userInfo)
    }

    authUser(userInfo){
        loginUser(userInfo).then((reponse) => {if(reponse) {
            this.username = reponse.username;
            this.isAuth = true;
            this.token = reponse.token
        }})
        console.log(this.token)
    }
}

const userStore = new UserStore();
export default userStore;