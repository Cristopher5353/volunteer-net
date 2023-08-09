import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

const initialUserState = {
    email: "",
    description: "",
    username: "",
    password: "",
    role: 0
};

export const UserRegister = () => {
    const [user, setUser] = useState(initialUserState);
    const [error, setError] = useState({ bool: false, errorMessages: [] });

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            let fetchUserRegister = await fetch("http://localhost:8080/api/users/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            let jsonFetchUserRegister = await fetchUserRegister.json();
            let status = jsonFetchUserRegister.status;

            if (status === 201) {
                setError({ ...error, bool: false });
                setUser(initialUserState);
                Swal.fire({
                    text: jsonFetchUserRegister.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            } else {
                setError({ ...error, bool: true, errorMessages: jsonFetchUserRegister.errors });
                setUser({...user, password: ""});
            }
        } catch (error) {
            alert("Error, vuelva a intentarlo más tarde" + error);
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <section className="h-100 py-5" style={{ backgroundColor: "#222" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <h4 className="mb-4 text-center">Regístrate aquí</h4>
                                        {error.bool && (
                                            <ul>
                                                {error.errorMessages.map(messageError => (
                                                    <li>{messageError}</li>
                                                ))}
                                            </ul>
                                        )}
                                        <form method="POST" onSubmit={handleSubmitForm}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Correo</label>
                                                <input type="email" value={user.email} className="form-control" id="email" placeholder="Ingresa un correo válido" name="email" onChange={handleChange} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">Descripción</label>
                                                <textarea type="text" defaultValue={user.description} className="form-control" id="description" rows={5} placeholder="¿Por qué quieres unirte a la comunidad?..." name="description" onChange={handleChange}></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                                                <input type="text" value={user.username} className="form-control" id="username" placeholder="Este nombre se mostrará en tu perfil" name="username" onChange={handleChange} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="role" className="form-label">Rol</label>
                                                <select className="form-select" defaultValue={user.role} name="role" id="role" onChange={handleChange}>
                                                    <option value="0">---Selecciona---</option>
                                                    <option value="1">Voluntario</option>
                                                    <option value="2">Grupo Voluntario</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Contraseña</label>
                                                <input type="password" value={user.password} className="form-control" id="password" autoComplete="false" placeholder="Ingresa una contraseña" name="password" onChange={handleChange} />
                                            </div>

                                            <div className="mb-3">
                                                <button className="btn text-white w-100 mt-2" type="submit" style={{ background: "#9066F2" }}>Registrarme</button>
                                            </div>

                                            <div className="mb-3">
                                                <NavLink to="/login" className="text-muted text-center d-block">
                                                    <span>Regresar a inicio de sesión</span>
                                                </NavLink>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center" style={{ background: "#9066F2", borderRadius: "10px" }}>
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">"Somos más que una plataforma, somos una comunidad comprometida con el cambio."</h4>
                                        <p className="small mb-0">¡Bienvenido a "VolunteerNet"! Somos una red social comprometida con el cambio positivo.
                                            Conéctate con voluntarios de todo el mundo y grupos voluntarios que comparten tus mismos valores y pasiones.
                                            Únete a nuestra comunidad solidaria y juntos hagamos del mundo un lugar mejor.
                                            ¡Sé parte del movimiento del voluntariado en VolunteerNet!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}