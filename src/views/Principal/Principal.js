import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { decodeToken } from '../../custom/decodeToken';
import { Menu } from './components/Menu/Menu';

export const Principal = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationChatCount, setNotificationChatCount] = useState(0);
    const [requestsCount, setRequestsCount] = useState(0);

    const getNotificationsGeneralCount = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetNotificationsCount = await fetch(
                `http://localhost:8080/api/notifications-count/general-count`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetNotificationsCount = await fetchGetNotificationsCount.json();
            let status = jsonFetchGetNotificationsCount.status;

            if (status === 200) {
                setNotificationCount(jsonFetchGetNotificationsCount.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const getNotificationsChatCount = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetNotificationsChatCount = await fetch(
                `http://localhost:8080/api/notifications-count/chat-count`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetNotificationsChatCount = await fetchGetNotificationsChatCount.json();
            let status = jsonFetchGetNotificationsChatCount.status;

            if (status === 200) {
                setNotificationChatCount(jsonFetchGetNotificationsChatCount.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const getRequestsCountByUser = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetRequestsCountByUser = await fetch(
                `http://localhost:8080/api/chats-members/request-by-user/count`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetRequestsCountByUser = await fetchGetRequestsCountByUser.json();
            let status = jsonFetchGetRequestsCountByUser.status;

            if (status === 200) {
                setRequestsCount(jsonFetchGetRequestsCountByUser.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const incrementNotificationChatCount = async () => {
        try {
            let token = localStorage.getItem("token");

            await fetch("http://localhost:8080/api/notifications-count/chat-count/increment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    useEffect(() => {
        getNotificationsGeneralCount();
        getNotificationsChatCount();

        if (decodeToken().roles === "GrupoVoluntario") {
            getRequestsCountByUser();
        }

        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications`, () => {
                setNotificationCount(prev => prev + 1);
            });

            stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications/chats`, () => {
                if (window.location.pathname != "/principal/chats") {
                    setNotificationChatCount(prev => prev + 1);
                    incrementNotificationChatCount();
                }
            });

            stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications/requests/confirm`, (message) => {
                if (message.body === "group") {
                    setRequestsCount(prev => prev - 1);
                } else if (message.body === "user") {
                    setNotificationCount(prev => prev + 1);
                }
            });

            if(decodeToken().roles === "GrupoVoluntario") {
                stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications/requests/join`, () => {
                    setRequestsCount(prev => prev + 1);
                });
            }
        });

        return () => {
            stompClient.disconnect();
        }
    }, [])

    return (
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column justify-content-between" style={{ backgroundColor: '#222', height: "100vh", width: "6vw", position: "fixed" }}>
                    <Menu
                        notificationCount={notificationCount}
                        setNotificationCount={setNotificationCount}
                        notificationChatCount={notificationChatCount}
                        setNotificationChatCount={setNotificationChatCount}
                        requestsCount={requestsCount} />
                </div>
                <div style={{ height: "100vh", padding: 0, width: "95vw", marginLeft: "6vw" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
