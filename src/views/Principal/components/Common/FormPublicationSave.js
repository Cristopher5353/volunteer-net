import React, { useState } from 'react';
import Swal from 'sweetalert2';

const initialPublicationState = { description: "" };

export const FormPublicationSave = ({confirmResetPublications, resetPublications}) => {
    const [publication, setPublication] = useState(initialPublicationState);
    const [error, setError] = useState({ bool: false, errorMessages: [] });

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
                
                if(confirmResetPublications) {
                    resetPublications();
                }
            } else {
                setError({ ...error, bool: true, errorMessages: jsonFetchPublicationRegister.errors });
            }
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    const handleChange = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value });
    }

    return (
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
    )
}