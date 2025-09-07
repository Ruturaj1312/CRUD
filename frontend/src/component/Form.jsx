import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });

  function handleChange(e) {
    // console.log(e.target.value);
    setData({ ...data, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(data);
    if (data.firstname.trim() === "") {
      alert("Please fiels the all field");
      return;
    } else {
      if (!id) {
        axios.post("http://localhost:8080/crud", data).then((res) => {
          //   console.log(res.data);
          setData({
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
          });
          navigate("/table");
        });
      } else {
        axios.put("http://localhost:8080/crud/" + id, data).then((res) => {
          setData({
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
          });
          navigate("/table");
        });
      }
    }
  }

  useEffect(() => {
    if (id) {
      axios.get("http://localhost:8080/crud/" + id).then((res) => {
        const { firstname, lastname, email, mobile } = res.data.data;
        setData({
          firstname,
          lastname,
          email,
          mobile,
        });
      });
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <form>
            <div class="mb-3">
              <label class="form-label">First Name</label>
              <input
                value={data.firstname}
                type="text"
                class="form-control"
                id="firstname"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Last Name</label>
              <input
                value={data.lastname}
                type="text"
                class="form-control"
                id="lastname"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                value={data.email}
                type="email"
                class="form-control"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Mobile</label>
              <input
                value={data.mobile}
                type="number"
                class="form-control"
                id="mobile"
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                class="btn btn-success"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </>
  );
}

export default Form;
