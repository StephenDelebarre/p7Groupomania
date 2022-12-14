import React, {useState} from "react";
import "../style/Form.css";
import axios from "axios";

function SignupForm () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const errorForm = document.getElementsByClassName("error");

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
      };
      console.log(email)
      console.log(password)
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    });
  };

  return (

      <form onSubmit={handleSignup}>
          <div className="input_div">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="Veuillez saisir votre adresse mail" 
              onChange={(e) => setEmail (e.target.value)} value={email}>
            </input>
          </div>
          <div className="input_div">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" name="password" 
              placeholder="Veuillez saisir votre mot de passe" 
              onChange={(e) => setPassword (e.target.value)} value={password}>
            </input>
          </div>
          <div className="error"></div>
          <button className="btn" type="submit">S'inscrire</button>
        </form>
  );
};

export default SignupForm;