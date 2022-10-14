import React from "react";
import "../style/Button.css";

function Button({text}) {
    return (
        <input className="btn" type="submit" value={text}></input>
    )
}

export default Button;