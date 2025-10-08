import { useState } from "react";
import "./Navbar.scss";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Navbar()

{
    const [open,setopen] = useState(false);

    const {currentUser} = useContext(AuthContext)
    
    return(
        <nav>
            <div className="left">
            <a href="/" className="logo">
                <img src="./logo.png" alt="" />
                <span>Estate Connect</span>
            </a>
            <a href="/list">Listings</a>
            {/*<a href="/">About</a>
            <a href="/">Contact</a>
            <a href="/">Agents</a> */}
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="user">
                    <img src= {currentUser.avatar || "/noavatar.jpg"} 
                    alt="" 
                    />
                    <span>{currentUser.username}</span>
                    <Link to ="/profile" className="profile">
                    <div className="notification"></div>
                    <span>Profile</span>
                    </Link>
                    </div>
                ) : (
                <>
                <a href="/login">Sign in</a>
                <a href="/register" className="register">
                    Sign up
                </a>
                </>
                )}
                <div className="menuicon">
                    <img src="menu.png" alt="" onClick={()=>setopen((prev)=>!prev)}/>
                </div>
                <div className= {open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                    <a href="/">Agents</a>
                    <a href="/">Sign in</a>
                    <a href="/">Sign up</a>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;