import React from "react";
import CRUD from "./component/CRUD";
import Form from "./component/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./component/Table";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CRUD />}>
            <Route path="/" element={<Form></Form>} />
            <Route path="/:id" element={<Form></Form>} />
            <Route path="/table" element={<Table />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
