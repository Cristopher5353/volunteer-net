import React from 'react';
import "./Menu.css";
import { NavLink, useNavigate } from 'react-router-dom';

export const Menu = () => {
    const navigate = useNavigate();

    const handleClickLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <div>
                <i className="fa-solid fa-handshake-simple text-white text-center d-block icon-menu"></i>
            </div>
            <div>
                <NavLink to="/principal" className="text-muted">
                    <i className="fa-solid fa-house text-white text-center d-block icon-menu"></i>
                </NavLink>
                <NavLink to="/principal/chats" className="text-muted">
                    <i className="fa-solid fa-comment text-white text-center d-block icon-menu"></i>
                </NavLink>
                <NavLink to="/principal/notificaciones" className="text-muted">
                    <i className="fa-solid fa-bell text-white text-center d-block icon-menu"></i>
                </NavLink>
            </div>
            <div>
                <NavLink to="/principal/perfil" className="text-muted">
                    <i className="fa-solid fa-gear text-white text-center d-block icon-menu"></i>
                </NavLink>
                <i className="fa-solid fa-right-from-bracket text-white text-center d-block icon-menu" onClick={handleClickLogout}></i>
                <p className="text-white text-center">Imagen usuario</p>
            </div>
        </>
    )
}