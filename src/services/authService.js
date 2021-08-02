
class AuthService {
    tokenKey = '';
    id = "0";
    name ="";
    isAuth = false;


    getToken() {
        return localStorage.getItem(this.tokenKey);

    }

    getName (){
        return localStorage.getItem(this.name);
    }

    getId ()  {
        return localStorage.getItem(this.id);

    }


    saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    saveId(id){
        localStorage.setItem(this.id, id);
    }

    saveName(name) {
        localStorage.setItem(this.name, name);

    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    removeId(){
        localStorage.removeItem(this.id);

    }

    isAuthenticated() {
        const token = this.getToken();

        return token;
    }
}

export default new AuthService();