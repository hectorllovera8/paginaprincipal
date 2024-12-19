import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import Detalle from './Detalle';

const TablaMaestroMedicamentos = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Cambiado a 10 para mostrar 10 elementos por página

    // Calcular el índice de los elementos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Función para manejar la eliminación
    const handleDelete = async (codigo) => {
        // Mostrar SweetAlert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: "¿Estás seguro que quieres eliminar este medicamento?",
            text: "¡Una vez eliminado no podrás revertirlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('http://localhost/backendmedicamentos/api/medicamentos/deleteMedicamentos.php', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ codigo }), // Enviar el código como JSON
                });

                const data = await response.json();
                if (response.ok) {
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El medicamento fue eliminado correctamente.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload(); // Refresca la página
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.error,
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: 'Error al conectar con el servidor',
                    icon: "error"
                });
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="table-responsive" style={{ maxWidth: '90%', margin: '20px auto' }}>
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-primary text-center">
                        <tr>
                            <th className="text-center align-middle p-2">Código</th>
                            <th className="text-center align-middle p-2">Imagen</th>
                            <th className="text-center align-middle p-2">Nombre</th>
                            <th className="text-center align-middle p-2">Principio Activo</th>
                            <th className="text-center align-middle p-2">Marca</th>
                            <th className="text-center align-middle p-2">Laboratorio</th>
                            <th className="text-center align-middle p-2">Función</th>
                            <th className="text-center align-middle p-2">Presentación</th>
                            <th className="text-center align-middle p-2">Descripción</th>
                            <th className="text-center align-middle p-2">Forma de Empaque</th>
                            <th className="text-center align-middle p-2">Cantidad de Dosis</th>
                            <th className="text-center align-middle p-2">Ver Detalle</th>
                            <th className="text-center align-middle p-2">Editar</th>
                            <th className="text-center align-middle p-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.codigo}>
                                <td className="text-center align-middle p-2">{item.codigo}</td>
                                <td className="text-center align-middle p-2">
                                    <img
                                        src={item.imagen}
                                        alt={item.nombre}
                                        className="img-fluid"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td className="text-center align-middle p-2">{item.nombre}</td>
                                <td className="text-center align-middle p-2">{item.principio_activo}</td>
                                <td className="text-center align-middle p-2">{item.marca}</td>
                                <td className="text-center align-middle p-2">{item.laboratorio}</td>
                                <td className="text-center align-middle p-2">{item.funcion}</td>
                                <td className="text-center align-middle p-2">{item.presentacion}</td>
                                <td className="text-center align-middle p-2">{item.descripcion}</td>
                                <td className="text-center align-middle p-2">{item.forma_empaque}</td>
                                <td className="text-center align-middle p-2">{item.cantidad_dosis}</td>
                                <td className="text-center align-middle p-2">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#modal-${item.codigo}`}
                                        style={{ width: '100%' }}
                                    >
                                        Ver
                                    </button>
                                </td>
                                <td className="text-center align-middle p-2">
                                    <button
                                        onClick={() => handlePut(item.codigo)} // Llama a la función de eliminación
                                        className="btn btn-success btn-sm"
                                        style={{ width: '100%' }}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td className="text-center align-middle p-2">
                                    <button
                                        onClick={() => handleDelete(item.codigo)} // Llama a la función de eliminación
                                        className="btn btn-danger btn-sm"
                                        style={{ width: '100%' }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                <Detalle item={item} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    );
}

export default TablaMaestroMedicamentos;