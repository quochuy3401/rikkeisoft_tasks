import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";

import "../register/register.css";

export const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // check if username is stored in local storage
  useEffect(() => {
    const _username = localStorage.getItem("username");
    if (_username) {
      setValues({ ...values, username: _username });
    }
  }, []);

  // toggle to set visibility of password
  const togglePassword = () => {
    setVisible(!visible);
  };

  const validateForm = (data) => {
    let errs = {
      username: undefined,
      password: undefined,
    };
    if (!data.username.trim()) {
      errs.username = "*Required";
    } else if (
      !/^[A-Za-z0-9 ]+$/.test(data.username) ||
      data.username.trim().length < 5 ||
      data.username.trim().length > 20
    ) {
      errs.username =
        "*Username should be 5-20 characters and not contain special characters";
    }
    if (!data.password.trim()) {
      errs.password = "*Required";
    } else if (
      data.password.trim().length < 6 ||
      data.password.trim().length > 20
    ) {
      errs.password = "*Password should be 6-20 characters.";
    }
    setErrors(errs);
    if (errs.password == undefined && errs.username == undefined) {
      console.log("valid");
      return true;
    } else {
      console.log("invalid");
      return false;
    }
  };

  // change input value
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle remember password
  const handleOnClick = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(values)) {
      setLoading(true);
      axiosInstance
        .post("/users/authenticate", values)
        .then((res) => {
          // success
          setLoading(false);
          if (res.data.code == "200") {
            console.log(res.data.data.username);
            if (isChecked) {
              console.log(isChecked);
              localStorage.setItem("username", res.data.data.username);
            }
            navigate("/home");
          }
        })
        .catch((err) => {
          // errors
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row register-content">
          <div className="register-img col-6">
            <img src="../../../images/login-3.gif" className="" />
          </div>
          <div className="register-form col-6">
            <h2>Sign in</h2>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleOnChange}
                  value={values.username}
                />
                {errors.username && <span>{errors.username}</span>}
              </div>
              <div className="form-input" style={{ position: "relative" }}>
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleOnChange}
                  value={values.password}
                />
                {visible ? (
                  <FontAwesomeIcon icon={faEye} onClick={togglePassword} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={togglePassword} />
                )}

                {errors.password && <span>{errors.password}</span>}
              </div>
              <div className="form-input d-flex ">
                <input
                  type="checkbox"
                  id="rememberCheckbox"
                  onClick={handleOnClick}
                />
                <label htmlFor="rememberCheckbox">Remember Me</label>
              </div>
              <button type="submit">Sign in</button>
              <p className="navigate">
                Don't have an account?{" "}
                <span onClick={handleNavigate}>Register</span>
              </p>
            </form>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loading-layout">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : null}
    </div>
  );
};
