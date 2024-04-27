import React from "react";
import SigninPage from "./compoments/SigninPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./compoments/Login";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SigninPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
};
export default App;
