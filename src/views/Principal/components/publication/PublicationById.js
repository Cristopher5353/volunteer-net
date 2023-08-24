import React, { useEffect, useState } from 'react';
import { Publication } from "../Common/Publication";
import { useParams } from 'react-router-dom';

export const PublicationById = () => {
    const { id } = useParams();
    const [publication, setPublication] = useState({});

    const getPublicationById = async () => {
        let token = localStorage.getItem("token");

        try {
            let fetchGetPublicationById = await fetch(
                `http://localhost:8080/api/publications/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let jsonFetchGetPublicationById = await fetchGetPublicationById.json();
            let status = jsonFetchGetPublicationById.status;

            if (status === 200) {
                setPublication(jsonFetchGetPublicationById.data);
            } else {
                alert("Error, vuelva a intentarlo más tarde");
            }

        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde");
        }
    }

    useEffect(() => {
        getPublicationById();
    }, []);

    return (
        <div className="container-fluid gedf-wrapper p-3" style={{ background: "#9066F2", minHeight: "100%" }}>
            <div className="row me-2">
                <div className="col-md-3"></div>
                <div className="col-md-6 gedf-main" style={{ minHeight: "calc(100vh - 2rem)" }}>
                    {
                        Object.keys(publication).length > 0 && <Publication publication={publication} />
                    }
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}