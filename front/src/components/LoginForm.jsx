import React, {useState, useContext} from "react";
import "../style/Form.css";
import axios from "axios";
import AuthContext from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

// formulaire de connexion

function LoginForm () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const Context = useContext(AuthContext);

  const handleLogin = (e) => {
    
    e.preventDefault();

    const errorForm = document.querySelector(".error");

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
      localStorage.setItem("admin", res.data.isAdmin)
    })
    .catch((err) => {
      console.log(err)
      errorForm.innerHTML = "Email et/ou mot de passe incorrect"
    });
  };

  return (

      <form onSubmit={handleLogin}>
          <div className="input_div">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Veuillez saisir votre mot de passe" 
              onChange={(e) => setPassword (e.target.value)} value={password}>
            </input>
          </div>
          <div className="error"></div>
          <button className="btn" type="submit">Se connecter</button>
        </form>
  );
};

export default LoginForm;