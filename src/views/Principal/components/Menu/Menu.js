import React from 'react';
import "./Menu.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { decodeToken } from '../../../../custom/decodeToken';

export const Menu = ({ notificationCount, setNotificationCount, notificationChatCount, setNotificationChatCount }) => {
    const navigate = useNavigate();

    const handleClickLogout = async () => {
        let token = localStorage.getItem("token");

        if(window.location.pathname == "/principal/chats") {
            localStorage.setItem("token_out", localStorage.getItem("token"));
        }

        try {
            await fetch("http://localhost:8080/api/users/disconnect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }

        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleResetNotificationCount = async () => {
        if (notificationCount > 0) {
            let token = localStorage.getItem("token");

            try {
                let fetchResetNotificationCount = await fetch("http://localhost:8080/api/resetnotificationcount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                let jsonFetchResetNotificationCount = await fetchResetNotificationCount.json();
                let status = jsonFetchResetNotificationCount.status;

                if (status === 200) {
                    setNotificationCount(0);
                } else {
                    alert("vuelva a intentarlo más tarde");
                }

            } catch (error) {
                alert("Error, vuelva a intentarlo más tarde");
            }
        }
    }

    const handleResetNotificationChatCount = async () => {
        if (notificationChatCount > 0) {
            let token = localStorage.getItem("token");

            try {
                let fetchResetNotificationChatCount = await fetch("http://localhost:8080/api/resetnotificationchatcount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                let jsonFetchResetNotificationChatCount = await fetchResetNotificationChatCount.json();
                let status = jsonFetchResetNotificationChatCount.status;

                if (status === 200) {
                    setNotificationChatCount(0);
                } else {
                    alert("vuelva a intentarlo más tarde");
                }

            } catch (error) {
                alert("Error, vuelva a intentarlo más tarde");
            }
        }
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
                <NavLink to="/principal/chats" className="text-muted" onClick={handleResetNotificationChatCount}>
                    <i className="fa-solid fa-comment text-white text-center d-block icon-menu position-relative">
                        {notificationChatCount > 0 && <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" id="notification" style={{ fontSize: "13px", left: "0", marginLeft: "30px" }}>
                            {notificationChatCount}+
                        </span>}
                    </i>
                </NavLink>
                <NavLink to="/principal/notificaciones" className="text-muted" onClick={handleResetNotificationCount}>
                    <i className="fa-solid fa-bell text-white text-center d-block icon-menu position-relative">
                        {notificationCount > 0 && <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" id="notification" style={{ fontSize: "13px", left: "0", marginLeft: "30px" }}>
                            {notificationCount}+
                        </span>}
                    </i>
                </NavLink>
            </div>
            <div>
                <NavLink to={`/principal/perfil/${decodeToken().id}`} className="text-muted">
                    <i className="fa-solid fa-gear text-white text-center d-block icon-menu"></i>
                </NavLink>
                <i className="fa-solid fa-right-from-bracket text-white text-center d-block icon-menu" onClick={handleClickLogout}></i>
                <p className="text-white text-center">Imagen usuario</p>
            </div>
        </>
    )
}