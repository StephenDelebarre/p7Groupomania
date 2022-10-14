import React from "react";
import LoginForm from "../components/LoginForm"
import "../style/Register.css"
import Logo from "../Image/logo.png"
import {Link} from "react-router-dom"

function Login() {

    return (
        <div className="App">
            <div className="Register">
                <img src={Logo} alt="Groupomania" className="logo"></img>
                <LoginForm />
                <p>
                    <Link to="/Signup">
                        Vous n'avez pas encore de compte ? Inscrivez-vous
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;