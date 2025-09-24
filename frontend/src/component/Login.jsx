import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();

  function handleSubmit(e) {
    setLoader(true);
    e.preventDefault();
    const payload = { email, password };
    // console.log(payload);
    axios
      .post("http://localhost:8080/user/login", payload)
      .then((res) => {
        setLoader(false);
        console.log(res);
        toast.success("Login successfully..");
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setTimeout(() => {
          nav("/");
        }, 3000);
        resetData();
      })
      .catch((err) => {
        toast.error("Login faild..");
        console.log("Error while login", err);
        setLoader(false);
      });
  }

  function resetData() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div class="container">
        <div className="container">
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <center><h1 className="text-warning">CRUD OPERATION</h1></center>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p class="text-center small">
                        Enter your username & password to login
                      </p>
                    </div>

                    <form class="row g-3 needs-validation" novalidate>
                      <div class="col-12">
                        <label for="yourUsername" class="form-label">
                          Username
                        </label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                          <input
                            type="text"
                            class="form-control"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            value={email}
                          />
                          <div class="invalid-feedback">
                            Please enter your username.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          class="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          value={password}
                        />
                      </div>

                      <div class="col-12">
                        <button
                          class="btn btn-primary w-100"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {loader ? "Submitting" : "Login"}
                        </button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">
                          Don't have account?{" "}
                          <Link to={"/sigin"}>Create an account</Link>
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
    </>
  );
}

export default Login;
