import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { LoadingIndicator } from "../../share/LoadingIndicator";

export const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [show, setShow] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setVisible(!visible);
  };
  const validateForm = (data) => {
    let errs = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
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
    setErrors(errs);
    if (
      errs.firstName === null &&
      errs.lastName === null &&
      errs.email === null &&
      errs.password === null &&
      errs.username === null
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

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(values)) {
      setLoading(true);
      axiosInstance
        .post("users/register", values)
        .then((res) => {
          // success
          setLoading(false);
          if (res.data.code === 200) {
            console.log(res.data);
            setIsSuccessful(true);
            setModalBody(res.data.message);
            setShow(true);
          }
        })
        .catch((err) => {
          // errors
          console.log(err);
          setLoading(false);
          setModalBody("Registration failed!");
          setShow(true);
        });
    }
  };

  // handle modal
  const handleClose = () => {
    setShow(false);
    if (isSuccessful) {
      navigate("/login");
    }
  };

  return (
    <div className="register-login-page">
      <div className="container ">
        <div className="row register-content justify-content-center">
          <div></div>
          <div className="register-img col-xl-6 ">
            <img src="../../../images/login-3.gif" alt="image" />
          </div>
          <div className="register-form col-xl-6  col-lg-6 ">
            <h2>Sign up</h2>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleOnChange}
                  value={values.firstName}
                />
                {errors.firstName && <span>{errors.firstName}</span>}
              </div>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleOnChange}
                  value={values.lastName}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
              </div>
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleOnChange}
                  value={values.email}
                />
                {errors.email && <span>{errors.email}</span>}
              </div>
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
              <button className="btn-success" type="submit">Register</button>
              <p className="navigate">
                Already have an account?{" "}
                <span onClick={handleNavigate}>Sign in</span>
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
      {loading ? (
        <LoadingIndicator size="2x"/>
      ) : null}
    </div>
  );
};
