import React, {useContext} from "react";
import Logo from "../Image/logo_blanc.png"
import "../style/Home.css"
import AuthContext from "../services/AuthContext"
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import Feed from "../components/Feed"


function Home() {

    const Context = useContext(AuthContext)
    const navigate = useNavigate()
    
    const handleLogout = () => {
        Context.logout()
        navigate("/Login")
    }
    
    return (
        <div className="container">
            <div className="navbar">
                <img className="nav_logo" src={Logo} alt="Groupomania" />
                <ul className="nav_list">
                    <li className="navLink"><a href="#post"><i class="fa-solid fa-bars"></i></a></li>
                </ul>
                <div className="logout_div" onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
            </div>
            <PostForm />

            <Feed />

        </div>
    )
}

export default Home;