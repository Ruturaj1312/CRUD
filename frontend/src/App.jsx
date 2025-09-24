import React from "react";
import CRUD from "./component/CRUD";
import Form from "./component/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./component/Table";
import Signin from "./component/Signin";
import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sigin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<CRUD />}>
              <Route path="/" element={<Form />} />
              <Route path="/:id" element={<Form />} />
              <Route path="/table" element={<Table />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
