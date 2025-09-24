import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();

  function handleSubmit(e) {
    setLoader(false);
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
    };
    // console.log(payload);
    axios
      .post("http://localhost:8080/user/register", payload)
      .then((res) => {
        console.log("User register", res.data);
        toast.success("Register Successfull..");
        setLoader(false);
        resetData();
        setTimeout(() => {
          nav("/login")
        }, 3000);
      })
      .catch((err) => {
        console.log("Error while registration", err);
        toast.error("Register faild..");
        setLoader(false);
      });
  }
  function resetData() {
    setName("");
    setEmail("");
    setPassword("");
  }
  return (
    <div>
      <div className="container">
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">
                        Create an Account
                      </h5>
                      <p class="text-center small">
                        Enter your personal details to create account
                      </p>
                    </div>

                    <form class="row g-3 needs-validation" novalidate>
                      <div class="col-12">
                        <label for="yourName" class="form-label">
                          Your Name
                        </label>
                        <input
                          value={name}
                          type="text"
                          name="name"
                          class="form-control"
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <div class="invalid-feedback">
                          Please, enter your name!
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="yourEmail" class="form-label">
                          Your Email
                        </label>
                        <input
                          value={email}
                          type="email"
                          name="email"
                          class="form-control"
                          id="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div class="invalid-feedback">
                          Please enter a valid Email adddress!
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="yourPassword" class="form-label">
                          Password
                        </label>
                        <input
                          value={password}
                          type="password"
                          name="password"
                          class="form-control"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div class="invalid-feedback">
                          Please enter your password!
                        </div>
                      </div>

                      <div class="col-12">
                        <button
                          disabled={loader}
                          class="btn btn-primary w-100 "
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {loader ? "Account Created" : "Create Account"}
                        </button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">
                          Already have an account?{" "}
                          <Link to={"/login"}>Log in</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signin;
