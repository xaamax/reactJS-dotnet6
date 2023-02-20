/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Book from "../pages/Books";
import NewBook from "../pages/NewBook";

export default () => {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/books" element={<Book />} />
          <Route path="/book" element={<NewBook />} />
          <Route path="/book/:bookID" exact element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  );
}