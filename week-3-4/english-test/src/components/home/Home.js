import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext} from "react";
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
    <div className="container">
      <pre>{userCtx.user}</pre>
      <button type="button" onClick={handleLogOut}>
        Log out &nbsp;
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
};
