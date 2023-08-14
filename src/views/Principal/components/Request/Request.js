import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Request = () => {
    const [requests, setRequests] = useState([]);

    const getAllRequestsByUser = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetAllRequestsByUser = await fetch(
                `http://localhost:8080/api/chats-members/requests-by-user`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetAllRequestsByUser = await fetchGetAllRequestsByUser.json();
            let status = jsonFetchGetAllRequestsByUser.status;

            if (status === 200) {
                setRequests(jsonFetchGetAllRequestsByUser.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const handleConfirmUserJoin = async (chatMemberId) => {
        let token = localStorage.getItem("token");

        try {
            let fetchConfirmUserJoin = await fetch(`http://localhost:8080/api/chats-members/${chatMemberId}/confirm-join`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            let jsonFetchConfirmUserJoin = await fetchConfirmUserJoin.json();
            let status = jsonFetchConfirmUserJoin.status;

            if (status === 200) {
                Swal.fire({
                    text: jsonFetchConfirmUserJoin.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setRequests(prev => prev.filter(request => request.id !== chatMemberId));
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    useEffect(() => {
        getAllRequestsByUser();
    }, []);

    return (
        <div className="notification-container ps-4 pe-4" style={{background : "#9066F2", height : "100vh"}}>
            <h2 className="text-start pt-4 pb-4 text-white">Solicitudes</h2>
            {
                (requests.length > 0) && requests.map(request => (
                    <div className="card notification-card notification-invitation" key={request.id}>
                        <div className="card-body">
                            <div className="row d-flex">
                                <div className="col-9">
                                    <NavLink to={`/principal/perfil/${request.userId}`} className="text-muted">
                                        {request.user}
                                    </NavLink>
                                </div>
                                <div className="col-3">
                                    <button type="submit" className="btn text-white" style={{ background: "#222" }} onClick={() => handleConfirmUserJoin(request.id)}>Confirmar Solicitud</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}