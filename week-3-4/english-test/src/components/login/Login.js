import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
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
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");

  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  // check if username is stored in localStorage
  useEffect(() => {
    const _username = localStorage.getItem("username");

    if (_username) {
      setValues({ ...values, username: _username });
    }
  }, []);

  const togglePassword = () => {
    setVisible(!visible);
  };

  const validateForm = (data) => {
    let errs = {
      username: null,
      password: null,
    };
    if (!data.username.trim()) {
      errs.username = "*Required";
    }
    if (!data.password.trim()) {
      errs.password = "*Required";
    }
    setErrors(errs);
    if (errs.password === null && errs.username === null) {
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

  // remember me
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
          if (res.data.code === 200) {
            console.log(res);
            // store username in localStorage if remember me is checked
            if (isChecked) {
              console.log(isChecked);
              localStorage.setItem("username", res.data.data.username);
            }

            localStorage.setItem("userinfo", JSON.stringify(res.data.data));
            userCtx.setUser(res.data.data); 
            // JSON.stringify(res.data.data)
            setLoading(false);
            navigate("/");
          }
        })
        .catch((err) => {
          // errors
          setLoading(false);
          console.log(err.response.data);
          if (err.response.status === 400) {
            setModalBody(err.response.data.message)
            setShow(true)
          }
        });
    }
  };

  // handle modal
  const handleClose = () => setShow(false);

  return (
    <div className="register-login-page">
      <div className="container">
        <div className="row register-content justify-content-center">
          <div className="register-img col-xl-6">
            <img src="../../../images/login-3.gif" alt="image" />
          </div>
          <div className="register-form col-xl-6  col-lg-6">
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
              <div className="form-input d-flex align-items-center">
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
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* spin loading */}
      {loading ? (
        <div className="loading-layout">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : null}
    </div>
  );
};
