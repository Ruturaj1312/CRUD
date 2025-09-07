import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  function loadData() {
    axios.get("http://localhost:8080/crud").then((res) => {
      setAllData(res.data.data);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleDelete(id) {
    // alert(id);
    const result = confirm("Do you want to delete this records.");
    if (result) {
      axios.delete("http://localhost:8080/crud/" + id).then((res) => {
        console.log(res.data.data);

        loadData();
      });
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <button
                      className="me-2"
                      onClick={() => navigate("/" + item._id)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}

export default Table;
