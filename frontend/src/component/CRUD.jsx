import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

function CRUD() {
  return (
    <div>
      <center className="mt-3">
        <h1>CRUD</h1>
      </center>
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
                    `nav-link ${isActive ? "active text-white" : "text-white"}`
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
                    `nav-link ${isActive ? "active text-white" : "text-white"}`
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
  );
}

export default CRUD;
