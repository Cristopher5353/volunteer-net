import React, { useEffect, useRef, useState } from 'react';
import { decodeToken } from '../../../../custom/decodeToken';
import { Stomp } from '@stomp/stompjs';
import { Message } from './components/Message';
import { Default } from './components/Default';
import SockJS from 'sockjs-client';
import "./Chat.css";

export const Chat = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const currentChatIdRef = useRef(0);

    const getChatsByUser = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetChatsByUser = await fetch(
                `http://localhost:8080/api/users/chats`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetChatsByUser = await fetchGetChatsByUser.json();
            let status = jsonFetchGetChatsByUser.status;

            if (status === 200) {
                setChats(jsonFetchGetChatsByUser.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const disconnectUserFromChat = async (chatIdPrev, token) => {
        try {
            await fetch(`http://localhost:8080/api/chats/${chatIdPrev}/disconnect`, {
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

    const getMessagesByChat = async (chatId) => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetMessagesByChat = await fetch(
                `http://localhost:8080/api/chats/${chatId}/messages`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetMessagesByChat = await fetchGetMessagesByChat.json();
            let status = jsonFetchGetMessagesByChat.status;

            if (status === 200) {
                setMessages(jsonFetchGetMessagesByChat.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const handleResetUnreadCountChat = async (chatId) => {
        let token = localStorage.getItem("token");

        try {
            let fetchResetUnreadCountChatNotification = await fetch("http://localhost:8080/api/chats-notifications/reset-unread-count", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ chatId: chatId })
            });

            let jsonFetchResetUnreadCountChatNotification = await fetchResetUnreadCountChatNotification.json();
            let status = jsonFetchResetUnreadCountChatNotification.status;

            if (status === 200) {
                setChats(prev => {
                    return prev.map(chat => {
                        if (chat.chatId == chatId) {
                            return { ...chat, unreadCount: 0 };
                        } else {
                            return chat;
                        }
                    })
                });
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    const handleClickChat = (chatId) => {
        if (currentChatIdRef != 0) {
            disconnectUserFromChat(currentChatIdRef.current, localStorage.getItem("token"));
        }

        currentChatIdRef.current = chatId;
        getMessagesByChat(chatId);
        handleResetUnreadCountChat(chatId);
    }

    useEffect(() => {
        getChatsByUser();

        const socket = new SockJS('http://localhost:8080/ws');

        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe(`/user/${decodeToken().id}/queue/notifications/chats/all`, (message) => {
                if (currentChatIdRef.current != JSON.parse(message.body).chatId) {
                    setChats(prev => {
                        return prev.map(chat => {
                            if (chat.chatId == JSON.parse(message.body).chatId) {
                                return { ...chat, unreadCount: chat.unreadCount + 1 };
                            } else {
                                return chat;
                            }
                        })
                    });
                } else {
                    setMessages((prev) => [...prev, JSON.parse(message.body).messageResponseDto]);
                }
            });
        });

        return () => {
            if(localStorage.getItem("token_out") != null && currentChatIdRef.current != 0) {
                disconnectUserFromChat(currentChatIdRef.current, localStorage.getItem("token_out"));
                localStorage.removeItem("token_out");
            }
            stompClient.disconnect();
        }
    }, [])

    return (
        <section style={{ backgroundColor: '#9066F2', height: "100vh" }} >
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                                        <div className="p-3" style={{ overflowX: "auto" }}>
                                            <div className="input-group rounded mb-3">
                                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                                    aria-describedby="search-addon" />
                                                <span className="input-group-text border-0" id="search-addon">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                            </div>
                                            <div data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
                                                <ul className="list-unstyled mb-0">
                                                    {
                                                        (chats.length > 0) && chats.map(chat => (
                                                            <li className="p-2 border-bottom" key={chat.chatId} onClick={() => handleClickChat(chat.chatId)} style={{ cursor: "pointer" }}>
                                                                <a className="d-flex justify-content-between">
                                                                    <div className="d-flex flex-row">
                                                                        <div>
                                                                            <img
                                                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                                alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                                                            <span className="badge bg-success badge-dot"></span>
                                                                        </div>
                                                                        <div className="pt-1">
                                                                            <p className="fw-bold mb-0">{chat.username}</p>
                                                                            <p className="small text-muted">Hello, Are you there?</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="small text-muted mb-1">Just now</p>
                                                                        {(chat.unreadCount > 0) && <span className="badge bg-danger rounded-pill float-end">{chat.unreadCount}</span>}
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        (currentChatIdRef.current == 0 ? <Default /> : <Message messages={messages} setMessages={setMessages} currentChatId={currentChatIdRef.current} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}