import React, { useEffect, useState } from 'react';
import "./Home.css";
import { Publication } from './components/Publication';
import { FormPublicationSave } from '../Common/FormPublicationSave';

export const Home = () => {
    const [publications, setPublications] = useState([]);

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
                        <FormPublicationSave />
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