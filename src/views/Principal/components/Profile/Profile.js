import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { useParams } from 'react-router-dom';
import { Publication } from '../Home/components/Publication';
import { FormPublicationSave } from '../Common/FormPublicationSave';
import { decodeToken } from '../../../../custom/decodeToken';

export const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    const getUserById = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetUserById = await fetch(
                `http://localhost:8080/api/users/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetUserById = await fetchGetUserById.json();
            let status = jsonFetchGetUserById.status;

            if (status === 200) {
                setUser(jsonFetchGetUserById.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const handleSubmitUserFollow = async (e) => {
        e.preventDefault();

        let url = `http://localhost:8080/api/users/${id}/${user.follower ? "unfollow" : "follow"}`;

        let token = localStorage.getItem("token");

        try {
            let fetchUserFollow = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchUserFollow = await fetchUserFollow.json();
            let status = jsonFetchUserFollow.status;

            if (status === 200) {
                setUser({ ...user, follower: !user.follower });
            } else {
                alert("Error, vuelva a intentarlo más tarde" + status);
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    const handleUserRequestToJoinChat = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem("token");

        try {
            let fetchUserRequestToJoinChat = await fetch(`http://localhost:8080/api/users/${id}/chats-members/join`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchUserRequestToJoinChat = await fetchUserRequestToJoinChat.json();
            let status = jsonFetchUserRequestToJoinChat.status;

            if (status === 200) {
                setUser({ ...user, isMember: 1 });
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    useEffect(() => {
        getUserById();
    }, [id])

    return (
        <div className="container-fluid pt-3 pb-3" style={{ background: "#9066F2", paddingLeft: "40px", paddingRight: "50px" }}>
            <div className="profile-wrapper">
                <div className="profile-section-user me-4 mt-1">
                    <div className="profile-cover-img"><img src="https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg" alt="" /></div>
                    <div className="profile-info-brief p-3"><img className="img-fluid user-profile-avatar" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                        <div className="text-center">
                            <h5 className="text-uppercase mb-4">{user.username}</h5>
                            <p className="text-muted fz-base">{user.description}</p>
                            {
                                user.id !== decodeToken().id &&
                                <form method='POST' onSubmit={handleSubmitUserFollow} className="mb-2">
                                    <button type="submit" className="btn text-white" style={{ background: "#9066F2" }}>{(user.follower ? "Dejar de Seguir -" : "Seguir +")}</button>
                                </form>
                            }
                            {
                                (user.id !== decodeToken().id && user.isMember === 0 && user.role == "GrupoVoluntario") &&
                                <form method='POST' onSubmit={handleUserRequestToJoinChat} className="mt-2">
                                    <button type="submit" className="btn text-white" style={{ background: "#9066F2" }}>
                                        Unirme al grupo +
                                    </button>
                                </form>
                            }
                            {
                                (user.id !== decodeToken().id) &&
                                <span className="mt-4">{(user.isMember === 1) ? "¡Solicitud enviada! El grupo te responderá pronto" : (user.isMember === 2) ? "!Ya eres miembro del grupo!" : ""}</span>
                            }
                        </div>
                    </div>
                    <div className="hidden-sm-down">
                        <div className="profile-info-general p-4" style={{ background: "#fff" }}>
                            <h6 className="mb-3">Información General</h6>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><strong>CORREO:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0 ms-2">{user.email}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>SITIO WEB:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{(user.website === null ? "No registrado" : user.website)}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>ROLE:</strong></td>
                                        <td>
                                            <p className="text-muted mb-0">{user.role}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr className="m-0" />
                    </div>
                </div>
                <div className="profile-section-main">
                    {decodeToken().id === Number(id) && <FormPublicationSave confirmResetPublications={true} setUser={setUser} />}
                    {user.publications && user.publications.map(publication => (
                        <Publication publication={publication} key={publication.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}