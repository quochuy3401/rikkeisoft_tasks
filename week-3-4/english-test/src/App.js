import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Register } from "./components/register/Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Login } from "./components/login/Login";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
