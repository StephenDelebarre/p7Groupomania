import React, {useState, useContext} from "react";
import "../style/Form.css"
import axios from "axios";
import Button from "./Button"
import AuthContext from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const Context = useContext(AuthContext)

  const handleLogin = (e) => {
    
    e.preventDefault();

    const errorForm = document.querySelector(".error")

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      data: {
        email: email,
        password: password
      },
      headers: {
        Authorization: "Bearer" 
      }

    })
    .then((res) => {
      console.log(res)
      errorForm.innerHTML = ""
      Context.login(res.data.token)
      navigate("/Home")
      localStorage.setItem("userId", res.data.userId)
    })
    .catch((err) => {
      console.log(err)
      errorForm.innerHTML = "Email et/ou mot de passe incorrect"
    });
  }

  return (

      <form action="" onSubmit={handleLogin}>
          <div className="input_div">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Veuillez saisir votre adresse mail" 
              onChange={(e) => setEmail (e.target.value)} value={email}
            >
            </input>
          </div>
          <div className="input_div">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Veuillez saisir votre mot de passe" 
              onChange={(e) => setPassword (e.target.value)} value={password}>
            </input>
          </div>
          <div className="error"></div>
          <Button text="Se connecter"/>
        </form>
  )
}

export default LoginForm;