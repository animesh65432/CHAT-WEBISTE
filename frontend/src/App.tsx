import React from "react";
import SigninPage from "./compoments/SigninPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./compoments/Login";
import { useSelector } from "react-redux";
import Chat from "./compoments/chat/Chat";
import Groups from "./Groups/Groups";
import Headers from "./compoments/Headers";

const App: React.FC = () => {
  const token = useSelector((state) => state.auth.idtoken);
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
            <Route path="/" element={<Chat />}></Route>
            <Route path="/Groups" element={<Groups />}></Route>
          </Routes>
        </>
      )}
    </>
  );
};
export default App;
