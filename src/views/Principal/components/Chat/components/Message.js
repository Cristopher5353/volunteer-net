import React, { useEffect, useRef, useState } from 'react';

const initialMessageState = { message: "" };

export const Message = ({ messages, setMessages, currentChatId }) => {
    const [message, setMessage] = useState(initialMessageState);
    const chatContainerRef = useRef(null);

    const handleSubmitSendMessage = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem("token");

        try {
            let fetchSendMessage = await fetch(`http://localhost:8080/api/chats/${currentChatId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(message)
            });

            let jsonFetchSendMessage = await fetchSendMessage.json();
            let status = jsonFetchSendMessage.status;

            if (status === 201) {
                setMessages((prev) => [...prev, jsonFetchSendMessage.data]);
                setMessage(initialMessageState);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    const handleChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    return (
        <div className="col-md-6 col-lg-7 col-xl-8">
            <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                style={{ position: 'relative', height: '400px', overflowX: "auto" }} ref={chatContainerRef}>
                {
                    (messages.length > 0) && messages.map(message => (
                        <div className={`d-flex flex-row justify-content-${(message.myMessage ? "end" : "start")}`}>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                            <div>
                                <p className={`small ms-3 mb-0 rounded-3 text-muted`}>{message.user}</p>
                                <p className={`small p-2 ms-3 mb-1 rounded-3 ${message.myMessage ? "bg-primary text-white" : ""}`} style={{ backgroundColor: '#f5f6f7' }}>
                                    {message.message}</p>
                                <p className={`small ms-3 mb-3 rounded-3 text-muted ${message.myMessage ? "" : "float-end"}`}>12:00 PM | Aug 13</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <form method='POST' onSubmit={handleSubmitSendMessage}>
                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 3" style={{ width: '40px', height: '100%' }}
                    />
                    <input type="text" className="form-control form-control-lg" id="exampleFormControlInput2"
                        placeholder="Type message" onChange={handleChange} name="message" value={message.message} />
                    <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                    <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                    <button style={{ border: "none", background: "#fff", marginLeft: "10px" }} type='submit'><a><i className="fas fa-paper-plane"></i></a></button>
                </div>
            </form>
        </div>
    )
}