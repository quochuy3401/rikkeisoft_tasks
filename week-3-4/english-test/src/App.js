import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Quiz } from "./components/quiz/Quiz";
import { UserContext } from "../src/context/user";
import { ExamContext } from "../src/context/exam";
import { useEffect, useState } from "react";
import { Result } from "./components/result/Result";
import { Home } from "./components/home/Home";

function App() {
  const [user, setUser] = useState(null);
  const [exam, setExam] = useState(null);
  const [signingIn, setSigningIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userinfo = localStorage.getItem("userinfo");
    if (!userinfo) {
      setSigningIn(false);
      navigate("/login");
    } else {
      setSigningIn(false);
      setUser(JSON.parse(userinfo));
      navigate("/home");
    }
    // eslint-disable-next-line 
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <ExamContext.Provider value={{ exam, setExam }}>
          {signingIn ? null : (
            <>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/quiz/:id" element={<Quiz />} />
                <Route path="/result" element={<Result />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </>
          )}
        </ExamContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
