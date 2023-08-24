import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import "moment/locale/es";

export const Notificaction = () => {
    const [notifications, setNotifications] = useState([]);

    const getNotificationsByUser = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetNotificationsByUser = await fetch(
                `http://localhost:8080/api/users/notifications`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetNotificationsByUser = await fetchGetNotificationsByUser.json();
            let status = jsonFetchGetNotificationsByUser.status;

            if (status === 200) {
                setNotifications(jsonFetchGetNotificationsByUser.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    useEffect(() => {
        getNotificationsByUser();
    }, [])

    return (
        <div className="notification-container ps-4 pe-4" style={{ background: "#9066F2", height: "100vh" }}>
            <h2 className="text-start pt-4 pb-4 text-white">Notificaciones</h2>
            {
                (notifications.length > 0) && notifications.map(notification => (
                    <div className="card notification-card notification-invitation" key={notification.id}>
                        <div className="card-body">
                            <div className="row d-flex">
                                <div className="col-9">
                                    {
                                        notification.type === "publication" ?
                                            <NavLink to={`/principal/publicaciones/${notification.source}`} className="text-muted">
                                                <strong>{notification.message}</strong>
                                            </NavLink>
                                            : <strong>{notification.message}</strong>
                                    }
                                </div>
                                <div className="col-3">
                                    <span>{moment(notification.createdAt).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}