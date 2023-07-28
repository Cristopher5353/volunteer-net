import React from 'react';
import "./Menu.css";

export const Menu = () => {
    return (
        <>
            <div>
                <i className="fa-solid fa-handshake-simple text-white text-center d-block icon-menu"></i>
            </div>
            <div>
                <i className="fa-solid fa-house text-white text-center d-block icon-menu"></i>
                <i className="fa-solid fa-comment text-white text-center d-block icon-menu"></i>
                <i className="fa-solid fa-bell text-white text-center d-block icon-menu"></i>
            </div>
            <div>
                <i className="fa-solid fa-gear text-white text-center d-block icon-menu"></i>
                <p className="text-white text-center">Imagen usuario</p>
            </div>
        </>
    )
}