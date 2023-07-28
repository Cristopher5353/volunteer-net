import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState({ bool: false, message: "" });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      let fetchLogin = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login)
      });

      let jsonFetchLogin = await fetchLogin.json();
      let status = jsonFetchLogin.status;

      if (status === 200) {
        localStorage.setItem("token", jsonFetchLogin.data);
        navigate("/principal");
      } else {
        setError({ bool: true, message: jsonFetchLogin.message });
        setLogin({ username: "", password: "" });
      }
    } catch (error) {
      alert("Error, vuelva a intentarlo más tarde" + error);
    }
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#222" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <h4 className="mb-4 text-center">Nosotros somos VolunteerNet</h4>
                    {error.bool && (
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        {error.message}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    <form method="POST" onSubmit={handleSubmitForm}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="username" placeholder="Ingresa tu correo" name="username" onChange={handleChange} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" autoComplete="false" placeholder="Ingresa tu contraseña" name="password" onChange={handleChange} />
                      </div>

                      <div className="mb-3">
                        <button className="btn text-white w-100 mt-2" type="submit" style={{ background: "#9066F2" }}>Iniciar Sesión</button>
                      </div>

                      <div className="mb-3">
                        <a className="text-muted text-center d-block" href="#!">¿Olvidaste tu contraseña?</a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4 mt-4">
                        <p className="mb-0 me-2">¿No tienes una cuenta?</p>
                        <NavLink to="/registro" className="btn btn-outline" style={{ border: "2px solid #9066F2" }}>
                          <span>Registrarme</span>
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
  );
};
