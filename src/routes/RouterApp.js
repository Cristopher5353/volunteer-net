import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../views/Login/Login";
import { Principal } from "../views/Principal/Principal";
import { Main } from "../views/Principal/components/Main";
import { Chat } from "../views/Chat/Chat";
import { NotFound } from "../views/NotFound/NotFound";
import { UserRegister } from "../views/UserRegister/UserRegister";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route index path='/login' element={<Login />} />
        <Route index path='/registro' element={<UserRegister />} />
        <Route element={<ProtectedRoute roles={["Voluntario", "GrupoVoluntario"]} />}>
          <Route path="/principal" element={<Principal />}>
            <Route index element={<Main />} />
            <Route path='chat/:id' element={<Chat />}></Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;