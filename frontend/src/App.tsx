import React from "react";
import SigninPage from "./compoments/SigninPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./compoments/Login";
import { useSelector } from "react-redux";
import Headers from "./compoments/Headers";
import Home from "./compoments/Home";
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
