import {createContext, useState} from "react";

const autorisation = {
    token: "",
    login: () => {}
}

export const AuthContext = createContext(autorisation);


export const AuthProvider = (props) => {

    const tokenLocalStorage = localStorage.getItem("token")

    const [token, setToken] = useState(tokenLocalStorage);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token)
    }

    const logoutHanlder = () => {
        setToken(null)
        localStorage.clear()
    }

    const context ={
        token: token,
        login: loginHandler,
        logout: logoutHanlder
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;