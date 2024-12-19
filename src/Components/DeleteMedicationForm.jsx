import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const DeleteMedicationForm = () => {
    const [codigo, setCodigo] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Mostrar SweetAlert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: "Estas seguro que quieres eliminar este medicamento?",
            text: "Una vez eliminado no podrás revertirlo!",
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
                    setMessage(data.message); // Mensaje de éxito
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El medicamento fue eliminado correctamente.",
                        icon: "success"
                    }).then(() => {
                        window.location.reload(); // Refresca la página
                    });
                } else {
                    setMessage(data.error); // Mensaje de error
                }
            } catch (error) {
                setMessage('Error al conectar con el servidor');
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Eliminar Medicamento</h2>
            <form onSubmit={handleDelete}>
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Código del Medicamento</label>
                    <input
                        type="text"
                        id="codigo"
                        className="form-control"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger">Eliminar Medicamento</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default DeleteMedicationForm;