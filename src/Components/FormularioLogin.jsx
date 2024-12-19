import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";
import { useAuth } from "../Components/AuthContext"; // Importa el contexto

const API = "http://localhost/backendmedicamentos/api/usuariocliente/endpointAutenticacion.php";

const FormularioLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Usar función login del contexto
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no pueden estar vacíos.",
      });
      setLoading(false);
      return;
    }

    const userData = { usuario: username, contrasena: password };

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        resetForm();
        login(); // Actualiza el estado de autenticación
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: result.message || "Inicio de sesión exitoso!",
          showConfirmButton: false,
          timer: 1900,
        });
        navigate("/controldeinventario");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.errorMessage || result.error || "Error al iniciar sesión",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en la conexión con el servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card p-5 shadow"
      style={{
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "15px",
        padding: "25px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#333", fontWeight: "bold" }}
      >
        Iniciar Sesión
      </h2>
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label"
              style={{ color: "#333" }}
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "#333" }}
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      )}
      <p className="text-center py-4">Ingrese los datos para acceder</p>
    </div>
  );
};

export default FormularioLogin;
