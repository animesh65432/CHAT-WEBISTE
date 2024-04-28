import React from "react";
import SigninPage from "./compoments/SigninPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./compoments/Login";
import { useSelector } from "react-redux";
import Chat from "./compoments/chat/Chat";

const App: React.FC = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const islogin = !!token;

  return (
    <>
      <Routes>
        {!islogin ? (
          <>
            <Route path="/" element={<SigninPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Chat />}></Route>
          </>
        )}
      </Routes>
    </>
  );
};
export default App;
