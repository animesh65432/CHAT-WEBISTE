import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginPage, Headers, Home, UpdateCurrentUser, SignupPage } from "@/components";

const App: React.FC = () => {
  const token = useSelector((state: any) => state.auth.idtoken);
  const islogin = !!token;

  return (
    <div className="h-[100vh] font-mono fixed w-full">
      {!islogin ? (
        <>
          <Routes>
            <Route path="/" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </>
      ) : (
        <>
          <Headers />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/update_profile" element={<UpdateCurrentUser />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
};
export default App;
