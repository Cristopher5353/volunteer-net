import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

export const Chat = () => {
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const getMessagesByChat = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetMessagesByChat = await fetch(
                `http://localhost:8080/api/chats/${id}/messages`,
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
                console.log(jsonFetchGetMessagesByChat);
            } else {
                navigate("/principal");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const handleSendMessage = async () => {
        let token = localStorage.getItem("token");
        try {
            let fetchSendMessage = await fetch(
                `http://localhost:8080/api/chats/${id}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({message : message})
                }
            );

            let jsonFetchSendMessage = await fetchSendMessage.json();
            let status = jsonFetchSendMessage.status;

            if (status === 200) {
                console.log(jsonFetchSendMessage);
            } else {
                navigate("/principal");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    useEffect(() => {
        getMessagesByChat();

        /*const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe(`/topic/${id}`, (response) => {
                const messageResponse = JSON.parse(response.body);
                console.log(messageResponse);
            })
        })

        return () => {
            stompClient.disconnect();
        };*/
    }, []);

    return (
        <div>
            <input type='text' value={message} onChange={handleChange} placeholder='Ingresa el mensaje'></input>
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
}