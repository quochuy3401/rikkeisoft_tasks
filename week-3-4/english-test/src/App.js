import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Home } from "./components/home/Home";
import { UserContext } from "../src/context/user";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [user, setUser] = useState(null);
  const [signingIn, setSigningIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const userinfo = localStorage.getItem("userinfo");
    console.log(userinfo);
    if (!userinfo) {
      setSigningIn(false);
      navigate("/login");
    } else {
      setSigningIn(false);
      setUser(userinfo);
      navigate("/");
    }
  }, []);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        {signingIn ? null : (
          <>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
