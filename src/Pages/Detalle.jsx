import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const API ="http://localhost/backendmedicamentos/api/medicamentos/getMedicamentoporid.php?codigo="

const Detalle = () => {
    const params = useParams()
    const [datos, setDatos] = useState([]);
    const id=params.codigo;
    const getDatos = async () =>{
        let URI=API+id;
        try {
          const response = await fetch(URI);
          const data = await response.json();
          setDatos(data[0]);
          console.log(data)
        } catch (error) {
          console.error(error)
        }
      };
      useEffect(()=>{
        getDatos();
      },[]);
  return (
    <>
        <h1 className='text-center mt-2'>Detalle Medicamentos</h1>
        <div className="row">
              <div className="col-md-6" style={{ lineHeight: '1.2' }}>
                <img src={datos.imagen} alt={datos.nombre} className="img-fluid" style={{ objectFit: 'contain', maxHeight: '400px', width: '100%' }}
                />
              </div>

              <div className="col-md-6" style={{ lineHeight: '1.2' }}>
                <h5 className='py-4'><strong>Código Producto:</strong> 0{datos.codigo}</h5>
                <p><strong>Principio Activo:</strong> {datos.principio_activo}</p>
                <p><strong>Presentación:</strong> {datos.presentacion}</p>
                <p><strong>Descripción:</strong> {datos.descripcion}</p>
                <p><strong>Función:</strong> {datos.funcion}</p>
                <p><strong>Marca:</strong> {datos.marca}</p>
                <p><strong>Laboratorio:</strong> {datos.laboratorio}</p>
                <p><strong>Cantidad de Dosis:</strong> {datos.cantidad_dosis}</p>
                <p><strong>Empaque:</strong> {datos.forma_empaque}</p>
              </div>
            </div>
    </>
  )
}

export default Detalle