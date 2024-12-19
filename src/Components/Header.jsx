import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInactive, setIsInactive] = useState(false);
  let inactivityTimer;

  const controlNavbar = () => {
    setIsInactive(false);
    clearTimeout(inactivityTimer);

    if (window.scrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setLastScrollY(window.scrollY);

    inactivityTimer = setTimeout(() => {
      setIsInactive(true);
    }, 1000);
  };

  const handleMouseMove = () => {
    setIsInactive(false);
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      setIsInactive(true);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(inactivityTimer);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${showHeader ? 'show' : 'hide'} ${showHeader && !isInactive ? 'navbar-background' : ''}`} data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Inicio">
          <img src={logo} alt="" width={180} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/inicio"} className="nav-link active nav-link-green" aria-current="page">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to={"/nosotros"} className="nav-link active nav-link-green" aria-current="page">Nosotros</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle nav-link-green" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Servicios
              </a>
              <ul className="dropdown-menu">
                <li><Link to={"/gestiondeseguridad"} className="dropdown-item">Gestión de Seguridad</Link></li>
                <li><Link to={"/higieneocupacional"} className="dropdown-item">Higiene Ocupacional</Link></li>
                <li><Link to={"/saludocupacional"} className="dropdown-item">Salud Ocupacional</Link></li>
                <li><Link to={"/educacionyformacion"} className="dropdown-item">Educación y Formación</Link></li>
                <li><Link to={"/legales"} className="dropdown-item">Legales</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to={"/contacto"} className="nav-link active nav-link-green" aria-current="page">Contacto</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle nav-link-green" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sistema de Inventario
              </a>
              <ul className="dropdown-menu">
                <li><Link to={"/registrarnuevomedicamento"} className="dropdown-item">Registrar Nuevo Medicamento</Link></li>
                <li><Link to={"/controldeinventario"} className="dropdown-item">Inventario de Medicamentos Registrados</Link></li>
                <li><Link to={"/listamaestromedicamentos"} className="dropdown-item">Tabla de Medicamentos</Link></li>
                <li><Link to={"/entradamedicamentos"} className="dropdown-item">Reportes de Entrada</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle nav-link-green" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Área Cliente
              </a>
              <ul className="dropdown-menu">
                <li><Link to={"/iniciosesionintranet"} className="dropdown-item">Iniciar Sesión</Link></li>
                <li><Link to={"/registrousuariointranet"} className="dropdown-item">Registrarse</Link></li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-light me-2">Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
