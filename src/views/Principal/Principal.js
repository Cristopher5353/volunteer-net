import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { decodeToken } from '../../custom/decodeToken';
import { Menu } from './components/Menu/Menu';

export const Principal = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationChatCount, setNotificationChatCount] = useState(0);

    const getNotificationsCount = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetNotificationsCount = await fetch(
                `http://localhost:8080/api/notificationscount`,
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
                `http://localhost:8080/api/notificationschatcount`,
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

    const incrementNotificationChatCount = async () => {
        try {
            let token = localStorage.getItem("token");
  
            await fetch("http://localhost:8080/api/incrementnotificationchatcount", {
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
        getNotificationsCount();
        getNotificationsChatCount();

        const socket = new SockJS('http://localhost:8080/ws');
        const socketTwo = new SockJS('http://localhost:8080/ws');

        const stompClient = Stomp.over(socket);
        const stompClientTwo = Stomp.over(socketTwo);

        stompClient.connect({}, () => {
            stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications`, () => {
                setNotificationCount(prev => prev + 1);
            });
        });

        stompClientTwo.connect({}, () => {
            stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications/chats`, () => {
                if(window.location.pathname != "/principal/chats") {
                    setNotificationChatCount(prev => prev + 1);
                    incrementNotificationChatCount();
                }
            });
        });

        return () => {
            stompClient.disconnect();
            stompClientTwo.disconnect();
        }
    }, [])

    return (
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column justify-content-between" style={{ backgroundColor: '#222', height: "100vh", width: "6vw", position: "fixed" }}>
                    <Menu notificationCount={notificationCount} setNotificationCount={setNotificationCount} notificationChatCount={notificationChatCount} setNotificationChatCount={setNotificationChatCount} />
                </div>
                <div style={{ height: "100vh", padding: 0, width: "95vw", marginLeft: "6vw" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
