import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API = "http://localhost/backendmedicamentos/api/usuariocliente/postRegistrousuariointranet.php";

const FormularioRegistroIntranet = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        usuario: '',
        contrasena: '',
        confirmarContrasena: '',
        correo: '',
        telefono: '',
        perfil_usuario: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            nombres: '',
            apellidos: '',
            usuario: '',
            contrasena: '',
            confirmarContrasena: '',
            correo: '',
            telefono: '',
            perfil_usuario: '',
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { nombres, apellidos, usuario, correo, telefono, perfil_usuario, contrasena, confirmarContrasena } = formData;

        if (!nombres || !apellidos || !usuario || !correo || !telefono || !perfil_usuario || !contrasena || !confirmarContrasena) {
            setError('Por favor complete todos los campos');
            setLoading(false);
            return;
        }

        if (contrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombres,
                    apellidos,
                    usuario,
                    correo,
                    telefono,
                    perfil_usuario,
                    contrasena,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: result.message || 'Registro exitoso',
                    showConfirmButton: false,
                    timer: 1900,
                });
                resetForm();
                navigate('/iniciosesionintranet');
            } else {
                setError(result.error || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en la conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '20px' }}>
            <div className="card p-5 shadow" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
                <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Registro de Usuario</h2>

                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombres" className="form-label">Nombres</label>
                            <input type="text" id="nombres" name="nombres" className="form-control" value={formData.nombres} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos</label>
                            <input type="text" id="apellidos" name="apellidos" className="form-control" value={formData.apellidos} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input type="text" id="usuario" name="usuario" className="form-control" value={formData.usuario} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                            <input type="email" id="correo" name="correo" className="form-control" value={formData.correo} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono</label>
                            <input type="tel" id="telefono" name="telefono" className="form-control" value={formData.telefono} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="perfil_usuario" className="form-label">Perfil</label>
                            <select id="perfil_usuario" name="perfil_usuario" className="form-select" value={formData.perfil_usuario} onChange={handleInputChange} required>
                                <option value="">Seleccione un perfil</option>
                                <option value="Gerente Médico">Gerente Médico</option>
                                <option value="Médico Ocupacional">Médico Ocupacional</option>
                                <option value="Médico General">Médico General</option>
                                <option value="Enfermera Ocupacional">Enfermera</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contrasena" className="form-label">Contraseña</label>
                            <input type="password" id="contrasena" name="contrasena" className="form-control" value={formData.contrasena} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
                            <input type="password" id="confirmarContrasena" name="confirmarContrasena" className="form-control" value={formData.confirmarContrasena} onChange={handleInputChange} required />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Registrar</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FormularioRegistroIntranet;
