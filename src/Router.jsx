import React from "react";
import { Routes, Route } from "react-router";
import App from "./App";
import CompressionPage from "./Pages/CompressionPage";
import CustomCompressionPage from "./Pages/CustomCompressionPage";
import Home from "./Pages/Home";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Compress" element={<CompressionPage />}></Route>
        <Route
          path="/CustomCompress"
          element={<CustomCompressionPage />}
        ></Route>
      </Routes>
    </>
  );
};

export default Router;
