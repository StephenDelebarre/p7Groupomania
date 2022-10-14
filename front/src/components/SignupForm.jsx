import React, {useState} from "react";
import "../style/Form.css"
import axios from "axios";
import Button from "./Button"

function SignupForm () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    console.log("coucou")
    console.log(password)

    const errorForm = document.getElementsByClassName("error")

    axios({
      method: "post",
      url: "http://localhost:5000/api/auth/signup",
      data: {
        email: email,
        password: password
      }
    })
    .then((res) => {
      if (res.data.error) {
        errorForm.innerHTML = res.data.error
      } else {
        window.location("/")
      }
    })
    .catch((err) => {
      console.log(err)
    });
  }

  return (

      <form onSubmit={handleSignup}>
          <div className="input_div">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Veuillez saisir votre adresse mail" 
              onChange={(e) => setEmail (e.target.value)} value={email}>
            </input>
          </div>
          <div className="input_div">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" name="password" 
              placeholder="Veuillez saisir votre mot de passe" 
              onChange={(e) => setPassword (e.target.value)} value={password}>
            </input>
          </div>
          <div className="error"></div>
          <Button text="S'incrire"/>
        </form>
  )
}

export default SignupForm;