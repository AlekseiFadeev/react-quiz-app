import Axios from "axios";
import {AUTH_SUCCESS, AUTH_LOGOUT} from "./actionTypes"

export function auth(email, password, isLogin) {
    return async dispath => {

        const authData= {
          email, password,
          returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCS7WjVtJ3_hhEGplStmf3p9uPtajx00Lw'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCS7WjVtJ3_hhEGplStmf3p9uPtajx00Lw';
        }

        const response = await Axios.post(url, authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userid', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispath(authSuccess(data.idToken))
        dispath(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time) {
    return dispath => {
        setTimeout(() => {
            dispath(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispath => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispath(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()) {
                dispath(logout())
            } else {
                dispath(authSuccess(token))
                dispath(autoLogout(expirationDate.getTime() - new Date().getTime() / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}