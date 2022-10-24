import React from "react";
import SignupForm from "../components/SignupForm";
import "../style/Register.css";
import Logo from "../Image/logo.png";
import {Link} from "react-router-dom";

function Signup() {

    return (
        <div className="App">
            <div className="Register">
                <img src={Logo} alt="Groupomania" className="logo"></img>
                <SignupForm />
                <p>
                    <Link to="/Login">
                        Vous avez déjà un compte ? Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;