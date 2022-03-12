import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";

export const Home = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  // remove userinfo in localStorage and UserContext
  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userCtx.setUser(null);
    navigate("/login");
  };
  return (
    <div>
      <pre style={{ color: "red" }}>{userCtx.user}</pre>
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};
