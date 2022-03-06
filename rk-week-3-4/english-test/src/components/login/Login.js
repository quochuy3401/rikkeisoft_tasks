import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import "../register/register.css"

export const Login =() => {
    const [values, setValues] = useState({
        username: "",
        password: "",
      });
      const [errors, setErrors] = useState({});
      const [visible, setVisible] = useState(false);
      const [loading, setLoading] = useState(false);
    
      const togglePassword = () => {
        setVisible(!visible);
      };
      const validateForm = (data) => {
        let errs = {
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          username: undefined,
          password: undefined,
        };
        if (!data.firstName.trim()) {
          errs.firstName = "*Required";
        } else if (
          !/^([^0-9]*)$/.test(data.firstName) ||
          data.firstName.trim().length <= 2
        ) {
          errs.firstName =
            "*First name should be more than 2 characters and not contain number";
        }
        if (!data.lastName.trim()) {
          errs.lastName = "*Required";
        } else if (
          !/^([^0-9]*)$/.test(data.lastName) ||
          data.lastName.trim().length <= 2
        ) {
          errs.lastName =
            "*First name should be more than 2 characters and not contain number";
        }
        if (!data.email.trim()) {
          errs.email = "*Required";
        } else if (
          !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            data.email
          )
        ) {
          errs.email = "*Email address is invalid";
        }
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
        if (
          errs.password == undefined &&
          errs.username == undefined
        ) {
          console.log("valid");
          return true;
        } else {
          console.log("invalid");
          return false;
        }
      };
    
      const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

      };
    return (
        <div>
      <div className="container">
        <div className="row register-content">
          <div className="register-img col-6">
            <img src="../../../images/login-3.gif" className="" />
          </div>
          <div className="register-form col-6">
            <h2>Sign up</h2>
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
              <button type="submit">Register</button>
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
    )

}