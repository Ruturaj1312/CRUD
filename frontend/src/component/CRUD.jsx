import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, Link, NavLink, Outlet, useNavigate } from "react-router-dom";

function CRUD() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");
  const nav = useNavigate();
  const fetchData = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:8080/user/profile", {}, header)
      .then((res) => {
        console.log("User data fetch", res);
        setLoader(false);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("Error while fetching data", err);
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleLogout() {
    const resute = confirm("Are you sure you want to logout?");
    if (resute) {
      localStorage.removeItem("token");
      nav("/login");
    }
  }
  return (
    <>
      <center className="mt-3">
        <h1>CRUD</h1>
      </center>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="ms-3">
            Welcome <b className="text-primary">{data.name}</b>
          </h3>

          <button
            className="btn btn-danger me-3"
            onClick={handleLogout}
            style={{ alignItems: "end" }}
          >
            Log Out
          </button>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-lg-3">
            <div
              class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100"
              style={{ width: "280px;" }}
            >
              {" "}
              <a
                href="/"
                class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                {" "}
                <svg
                  class="bi pe-none me-2"
                  width="40"
                  height="32"
                  aria-hidden="true"
                >
                  <use xlink:href="#bootstrap"></use>
                </svg>{" "}
                <span class="fs-4">CRUD </span>
              </a>{" "}
              <hr />{" "}
              <ul class="nav nav-pills flex-column mb-auto">
                {" "}
                <li class="nav-item">
                  {" "}
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive ? "active text-white" : "text-white"
                      }`
                    }
                    aria-current="page"
                  >
                    {" "}
                    <svg
                      class="bi pe-none me-2"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use xlink:href="#home"></use>
                    </svg>
                    Form
                  </NavLink>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <NavLink
                    to={"/table"}
                    className={({ isActive }) =>
                      `nav-link ${
                        isActive ? "active text-white" : "text-white"
                      }`
                    }
                  >
                    {" "}
                    <svg
                      class="bi pe-none me-2"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <use xlink:href="#speedometer2"></use>
                    </svg>
                    Table
                  </NavLink>{" "}
                </li>{" "}
              </ul>{" "}
              <hr />
            </div>
          </div>
          <div className="col-lg-9">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default CRUD;
