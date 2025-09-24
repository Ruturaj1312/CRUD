import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");

  // <--------Pagination-------------->
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  function loadData() {
    axios
      .get("http://localhost:8080/crud", { params: { search, page, limit } })
      .then((res) => {
        console.log(res.data);
        setAllData(res.data.data);
        setTotalPages(res.data.totalPages);
      });
  }

  useEffect(() => {
    loadData();
  }, [search, page]);

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
          {/* <----------------Search Box-------------------> */}
          <input
            type="text"
            className="form-control my-3"
            placeholder="Serach by First Name and Last Name "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  <th scope="row">{(page - 1) * limit + i + 1}</th>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <button
                      className="me-2 btn btn-primary"
                      onClick={() => navigate("/" + item._id)}
                    >
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <----------Pagination--------------> */}
          <div className="d-flex justify-content-center my3 ">
            <button
              className="btn btn-secondary me-2"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              &laquo;
            </button>
            <div className="align-self-center ">
              Page <span className="text-primary">{page}</span> of{" "}
              <span className="text-primary">{totalPages}</span>
            </div>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              &raquo;
            </button>
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}

export default Table;
