"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const API = "http://localhost/Backendmedicamentos/api/medicamentos/postMedicamentos.php";

const Formulariomaestromedicamentos = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    principio_activo: "",
    marca: "",
    laboratorio: "",
    funcion: "",
    presentacion: "",
    descripcion: "",
    forma_empaque: "",
    cantidad_dosis: "",
    imagen: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      // Actualiza la ruta de la imagen según tu lógica
      setFormData({ ...formData, imagen: `http://localhost/Backendmedicamentos/img/${file.name}` });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error desconocido.");
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Medicamento agregado exitosamente",
        timer: 1500,
        showConfirmButton: false,
      });

      // Restablecer el formulario
      setFormData({
        nombre: "",
        principio_activo: "",
        marca: "",
        laboratorio: "",
        funcion: "",
        presentacion: "",
        descripcion: "",
        forma_empaque: "",
        cantidad_dosis: "",
        imagen: "",
      });
      setImagePreview(null);
      setErrorMessage("");

      // Navegar a la lista de medicamentos
      navigate("/listamaestromedicamentos");
      
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="container bg-light p-4 rounded shadow-lg"
        style={{ maxWidth: "700px", backdropFilter: "blur(10px)", opacity: 0.95 }}
      >
        <h2 className="text-center mb-4 text-primary">Agregar Nuevo Medicamento</h2>
        
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="row">
          {imagePreview && (
            <div className="col-md-6 mb-3 d-flex justify-content-center">
              <img src={imagePreview} alt="Previsualización" className="img-fluid" style={{ maxHeight: "200px" }} />
            </div>
          )}

          {["nombre", "principio_activo", "marca", "laboratorio", "funcion"].map((field) => (
            <div className="col-md-6 mb-3" key={field}>
              <label htmlFor={field} className="form-label">{field.replace("_", " ")}</label>
              <input
                type="text"
                name={field}
                id={field}
                className="form-control"
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={`Ingrese ${field.replace("_", " ")}`}
              />
            </div>
          ))}

          <div className="col-md-6 mb-3">
            <label htmlFor="presentacion" className="form-label">Presentación</label>
            <select
              name="presentacion"
              id="presentacion"
              className="form-control"
              value={formData.presentacion}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleccione</option>
              {["Tableta", "Comprimido", "Cápsula", "Jarabe", "Ungüento", "Inyectable", "Polvo"].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="forma_empaque" className="form-label">Forma de Empaque</label>
            <input
              type="text"
              name="forma_empaque"
              id="forma_empaque"
              className="form-control"
              value={formData.forma_empaque}
              onChange={handleChange}
              required
              placeholder="Ingrese la forma de empaque"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cantidad_dosis" className="form-label">Cantidad de Dosis</label>
            <input
              type="number"
              name="cantidad_dosis"
              id="cantidad_dosis"
              className="form-control"
              value={formData.cantidad_dosis}
              onChange={handleChange}
              required
              placeholder="Ingrese la cantidad de dosis"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="imagen" className="form-label">Imagen</label>
            <input
              type="file"
              name="imagen"
              id="imagen"
              accept=".jpg,.jpeg,.png"
              className="form-control"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Campo adicional para descripción */}
          <div className="col-md-12 mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              id="descripcion"
              className="form-control"
              value={formData.descripcion}
              onChange={handleChange}
              required
              placeholder="Ingrese una descripción del medicamento"
            />
          </div>
          
        </div>

        <button type="submit" className="btn btn-primary w-100">Agregar Medicamento</button>
      </form>
    </div>
  );
};

export default Formulariomaestromedicamentos;