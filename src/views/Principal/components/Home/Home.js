import React, { useEffect, useState } from 'react';
import "./Home.css";
import Swal from 'sweetalert2';
import { Publication } from './components/Publication';

const initialPublicationState = { description: "" };

export const Home = () => {
    const [publication, setPublication] = useState(initialPublicationState);
    const [error, setError] = useState({ bool: false, errorMessages: [] });
    const [publications, setPublications] = useState([]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem("token");

        try {
            let fetchPublicationRegister = await fetch("http://localhost:8080/api/publications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(publication)
            });

            let jsonFetchPublicationRegister = await fetchPublicationRegister.json();
            let status = jsonFetchPublicationRegister.status;

            if (status === 201) {
                setError({ ...error, bool: false });
                setPublication(initialPublicationState);
                Swal.fire({
                    text: jsonFetchPublicationRegister.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            } else {
                setError({ ...error, bool: true, errorMessages: jsonFetchPublicationRegister.errors });
            }
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    const getPublications = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetPublications = await fetch(
                `http://localhost:8080/api/publications`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetPublications = await fetchGetPublications.json();
            let status = jsonFetchGetPublications.status;

            if (status === 200) {
                setPublications(jsonFetchGetPublications.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    const handleChange = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getPublications();
    }, [])

    return (
        <>
            <div className="container-fluid gedf-wrapper p-3" style={{ background: "#9066F2" }}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="h5">@LeeCross</div>
                                <div className="h7 text-muted">Fullname : Miracles Lee Cross</div>
                                <div className="h7">Developer of web applications, JavaScript, PHP, Java, Python, Ruby, Java, Node.js,
                                    etc.
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="h6 text-muted">Seguidores</div>
                                    <div className="h5">5.2342</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="h6 text-muted">Siguiendo</div>
                                    <div className="h5">6758</div>
                                </li>
                                <li className="list-group-item">VolunteerNet</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 gedf-main">
                        <div className="card gedf-card">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="posts-tab" data-toggle="tab" role="tab" aria-controls="posts" aria-selected="true">Hacer una publicación</a>
                                    </li>
                                </ul>
                            </div>
                            <form method='POST' onSubmit={handleSubmitForm}>
                                <div className="card-body">
                                    <div className="tab-content" id="myTabContent">
                                        {error.bool && (
                                            <ul>
                                                {error.errorMessages.map(messageError => (
                                                    <li>{messageError}</li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                            <div className="form-group">
                                                <textarea className="form-control" id="description" name="description" defaultValue={publication.description} rows="3" placeholder="Que estás pensando?" onChange={handleChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-toolbar justify-content-between">
                                        <div className="btn-group">
                                            <button type="submit" className="btn mt-2 text-white" style={{ background: "#222" }}>Publicar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {publications.map(publication => (
                            <Publication publication={publication} key={publication.id} />
                        ))}
                    </div>
                    <div className="col-md-3">
                        <div className="card gedf-card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                                    card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                        <div className="card gedf-card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                                    card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}