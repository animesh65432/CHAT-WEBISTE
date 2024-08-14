import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { SigninPage, LoginPage, Headers, Home } from "./compoments";

const App: React.FC = () => {
  const token = useSelector((state: any) => state.auth.idtoken);
  const islogin = !!token;

  return (
    <>
      {!islogin ? (
        <>
          <Routes>
            <Route path="/" element={<SigninPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </>
      ) : (
        <>
          <Headers />
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </>
      )}
    </>
  );
};
export default App;
