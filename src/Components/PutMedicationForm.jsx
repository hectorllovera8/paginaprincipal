"use client";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const API_GET = "http://localhost/backendmedicamentos/api/medicamentos/getMedicamentos.php";
const API_PUT = "http://localhost/backendmedicamentos/api/medicamentos/putMedicamentos.php";

const PutMedicationForm = () => {
    const navigate = useNavigate();
    const [datos, setDatos] = useState([]);
    const [codigoBuscado, setCodigoBuscado] = useState('');
    const [medicamento, setMedicamento] = useState({
        codigo: '',
        nombre: '',
        principio_activo: '',
        marca: '',
        laboratorio: '',
        funcion: '',
        presentacion: '',
        descripcion: '',
        forma_empaque: '',
        cantidad_dosis: '',
        imagen: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const getDatos = async () => {
        try {
            const response = await fetch(API_GET);
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al cargar los datos');
        }
    };

    const buscarMedicamento = () => {
        const resultado = datos.find(med => med.codigo === codigoBuscado);
        if (resultado) {
            resultado.imagen = `http://localhost/Backendmedicamentos/img/${resultado.imagen}`;
            setMedicamento(resultado);
            setErrorMessage('');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Medicamento no encontrado'
            });
            setMedicamento({
                codigo: '',
                nombre: '',
                principio_activo: '',
                marca: '',
                laboratorio: '',
                funcion: '',
                presentacion: '',
                descripcion: '',
                forma_empaque: '',
                cantidad_dosis: '',
                imagen: ''
            });
            setErrorMessage('Medicamento no encontrado');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicamento(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Asignar la nueva imagen al estado
            setMedicamento(prevState => ({
                ...prevState,
                imagen: `http://localhost/Backendmedicamentos/img/${file.name}` // Actualiza la ruta
            }));
            // Aquí puedes agregar lógica para subir el archivo si es necesario
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_PUT, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medicamento)
            });
            if (!response.ok) throw new Error('Error al actualizar el medicamento');

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Los datos del medicamento han sido actualizados exitosamente',
                showConfirmButton: false,
                timer: 1800
            });

            // Resetear el formulario
            setMedicamento({
                codigo: '',
                nombre: '',
                principio_activo: '',
                marca: '',
                laboratorio: '',
                funcion: '',
                presentacion: '',
                descripcion: '',
                forma_empaque: '',
                cantidad_dosis: '',
                imagen: ''
            });
            navigate('/listamaestromedicamentos');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };

    useEffect(() => { getDatos(); }, []);

    return (
        <div className="container mt-4">
            <h1 className='text-center py-2'>Buscar Medicamento</h1>
            <div className='mb-3' style={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
                <div className="input-group">
                    <input type='text' placeholder='Código' value={codigoBuscado} onChange={(e) => setCodigoBuscado(e.target.value)} className='form-control' style={{ width: '40%' }} />
                    <button onClick={buscarMedicamento} type='button' className='btn btn-primary'>Buscar</button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-lg" style={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
                <h2 className="text-center mb-4 text-primary">Modificar Medicamento</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="codigo" className="form-label">Código</label>
                        <input type="text" name="codigo" id="codigo" className="form-control" value={medicamento.codigo} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" name="nombre" id="nombre" className="form-control" value={medicamento.nombre} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="principio_activo" className="form-label">Principio Activo</label>
                        <input type="text" name="principio_activo" id="principio_activo" className="form-control" value={medicamento.principio_activo} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="marca" className="form-label">Marca</label>
                        <input type="text" name="marca" id="marca" className="form-control" value={medicamento.marca} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="laboratorio" className="form-label">Laboratorio</label>
                        <input type="text" name="laboratorio" id="laboratorio" className="form-control" value={medicamento.laboratorio} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="funcion" className="form-label">Función</label>
                        <input type="text" name="funcion" id="funcion" className="form-control" value={medicamento.funcion} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="presentacion" className="form-label">Presentación</label>
                        <select name="presentacion" id="presentacion" className="form-control" value={medicamento.presentacion} onChange={handleChange} required>
                            <option value="" disabled>Seleccione la presentación</option>
                            {["Tableta", "Comprimido", "Cápsula", "Jarabe", "Ungüento", "Inyectable", "Polvo"].map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label htmlFor='forma_empaque' className='form-label'>Forma de Empaque</label>
                        <input type='text' name='forma_empaque' id='forma_empaque' className='form-control' value={medicamento.forma_empaque} onChange={handleChange} required />
                    </div>
                    <div className='col-md-6 mb-3'>
                        <label htmlFor='cantidad_dosis' className='form-label'>Cantidad de Dosis</label>
                        <input type='number' name='cantidad_dosis' id='cantidad_dosis' className='form-control' value={medicamento.cantidad_dosis} onChange={handleChange} required />
                    </div>
                    <div className='col-md-12 mb-3'>
                        <label htmlFor='descripcion' className='form-label'>Descripción</label>
                        <textarea name='descripcion' id='descripcion' rows='3' className='form-control' value={medicamento.descripcion} onChange={handleChange} required></textarea>
                    </div>

                    {/* Campo para cargar nueva imagen */}
                    <div className='col-md-6 mb-3'>
                        <label htmlFor='imagen' className='form-label'>Imagen</label>
                        <input type='file' name='imagen' id='imagen' accept=".jpg,.jpeg,.png,.gif" onChange={handleFileChange} />
                    </div>

                    {medicamento.imagen && (
                        <>
                            <div className='col-md-12 mb-3 d-flex justify-content-center'>
                                <img src={medicamento.imagen} alt={medicamento.nombre} style={{ maxHeight: '100px', maxWidth: '100px', objectFit: 'contain' }} />
                            </div>
                            <p><strong>Imagen actual</strong></p>
                        </>
                    )}
                    
                </div>

                <button type='submit' className='btn btn-success w-100'>Agregar Cambios Realizados</button>
            </form>

            <div style={{ height: '50px' }}></div>
        </div>
    );
};

export default PutMedicationForm;