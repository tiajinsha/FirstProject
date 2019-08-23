/* 登陆成功后保存账号密码 */
var Storage={
    setLogin(key,val){
        localStorage.setItem(key,JSON.stringify(val));
    },
    getLogin(key){
        return JSON.parse(localStorage.getItem(key))
    },
    removeLogin(key){
        localStorage.removeItem(key);
    }
}
export default Storage;

/* 
    setLogin(key,val){
        localStorage.setItem(key,JSON.stringify(val));
    },
    getLogin(key){
        return JSON.parse(localStorage.getItem(key))
    },
    removeLogin(key){
        localStorage.removeItem(key);
    }
} */
/* 
    setLogin(key,val){
        sessionStorage.setItem(key,JSON.stringify(val));
    },
    getLogin(key){
        return JSON.parse(sessionStorage.getItem(key))
    },
    removeLogin(key){
        sessionStorage.removeItem(key);
    }
} */