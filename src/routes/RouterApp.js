import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "../views/Login/Login";
import { UserRegister } from "../views/UserRegister/UserRegister";
import { Principal } from "../views/Principal/Principal";
import { Home } from "../views/Principal/components/Home/Home";
import { Chat } from "../views/Principal/components/Chat/Chat";
import { Notificaction } from "../views/Principal/components/Notification/Notification";
import { Profile } from "../views/Principal/components/Profile/Profile";
import { NotFound } from "../views/NotFound/NotFound";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route index path='/login' element={<Login />} />
        <Route index path='/registro' element={<UserRegister />} />
        <Route element={<ProtectedRoute roles={["Voluntario", "GrupoVoluntario"]} />}>
          <Route path="/principal" element={<Principal />}>
            <Route index element={<Home />} />
            <Route path="chats" element={<Chat />}/>
            <Route path="notificaciones" element={<Notificaction />} />
            <Route path="perfil/:id" element={<Profile />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;