import React from "react";
import { useNavigate } from "react-router-dom";

export const Home =() =>{
    const navigate = useNavigate();
    const handleLogOut =() =>{
        localStorage.removeItem("username")
        navigate("/login");
    }
    return (
        <div>
            <button type="button" onClick={handleLogOut}>Log out</button>
        </div>
    )
}