import React from 'react';
import FormularioLogin from '../Components/FormularioLogin';
import FONDO from '../assets/FONDO.jpg';

const InicioSesionIntranet = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${FONDO})`,
          backgroundSize: 'cover', // Asegura que la imagen cubra todo el contenedor
          backgroundPosition: 'center', // Centra la imagen
          backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
          minHeight: '100vh', // Asegura que el contenedor ocupe al menos toda la altura de la ventana
          display: 'flex',
          flexDirection: 'column', // Alinea los elementos en columna
          justifyContent: 'flex-start', // Alinea hacia arriba
          alignItems: 'center', // Centra horizontalmente
          paddingTop: '200px', // Espaciado superior para el título
        }}
      >
        <h2 style={{ 
            textAlign: 'center', 
            color: '#fff', 
           
            borderRadius: '5px',
            marginBottom: '10px' // Espacio entre el título y el formulario
            
          }}>
          Ingresa Como Usuario en la Intranet
        </h2>
        <FormularioLogin />
      </div>
    </>
  );
}

export default InicioSesionIntranet;