import React from 'react';
import carrusel1 from '../assets/carrusel1.jpg';
import carrusel2 from '../assets/carrusel2.jpg';
import carrusel3 from '../assets/carrusel3.jpg';
import carrusel4 from '../assets/carrusel4.jpg';
import trabajadorseñalizar from '../assets/trabajadorseñalizar.png';
import './HeroInicio.css';
import Buttoncontacto from './Buttoncontacto';

const HeroInicio = () => {
  return (
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel" data-bs-wrap="true">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={0} className="active" aria-label="Slide 1" aria-current="true" />
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={1} aria-label="Slide 2" />
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={2} aria-label="Slide 3" />
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={3} aria-label="Slide 4" />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="img-fluid" src={carrusel1} alt="" />
          <div className="container">
            <div className="carousel-caption text-center">
              <h1 className="carousel-title">Experiencia y Soluciones Integrales Personalizadas para tu Empresa</h1>
              <p className="carousel-text">Diseñando un Futuro más Seguro y Saludable para tu Empresa.</p>
              <div className="d-flex justify-content-center">
                <a className="btn btn-primary mx-2" href="#">Ver más</a>
                <Buttoncontacto />
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img className="img-fluid" src={carrusel2} alt="" />
          <div className="container">
            <div className="carousel-caption text-center">
              <h1 className="carousel-title">Salud Ocupacional</h1>
              <p className="carousel-text">Te brindamos un servicio personalizado y ajustado a las necesidades de tu organización.</p>
              <a className="btn btn-primary" href="/gestiondeseguridad">Conoce más</a>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img className="img-fluid" src={carrusel3} alt="" />
          <div className="container">
            <div className="carousel-caption text-center">
              <h1 className="carousel-title">Higiene Ocupacional</h1>
              <p className="carousel-text">Evaluaciones de riesgos en puestos de trabajo.</p>
              <a className="btn btn-primary" href="/higieneocupacional">Conoce más</a>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img className="img-fluid" src={carrusel4} alt="" />
          <div className="container">
            <div className="carousel-caption text-center">
              <h1 className="carousel-title">Salud Ocupacional In Company</h1>
              <p className="carousel-text">Contamos con profesionales de la medicina ocupacional bajo la modalidad de outsourcing.</p>
              <a className="btn btn-primary" href="/saludocupacional">Conoce más</a>
            </div>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroInicio;
