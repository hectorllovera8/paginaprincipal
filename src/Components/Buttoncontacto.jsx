import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Buttoncontacto = () => {
  return (
    <StyledWrapper>
      <Link to="/contacto">
        <button className="button">Contáctanos</button>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Contenedor para centrar el botón */
  display: flex;
  justify-content: center;
  align-items: center;

  .button {
    --color: #00A97F;
    padding: 0.8em 1.7em;
    background-color: transparent;
    border-radius: 0.4em;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    font-weight: 400;
    font-size: 15px;
    border: 1px solid;
    font-family: inherit;
    text-transform: uppercase;
    color: var(--color);
    z-index: 1;
  }

  .button::before,
  .button::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%);
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    background-color: var(--color);
    transition: 1s ease;
  }

  .button::before {
    top: -1em;
    left: -1em;
  }

  .button::after {
    left: calc(100% + 1em);
    top: calc(100% + 1em);
  }

  .button:hover::before,
  .button:hover::after {
    height: 410px;
    width: 410px;
  }

  .button:hover {
    color: rgb(10, 25, 30);
  }

  .button:active {
    filter: brightness(0.8);
  }

  /* Responsividad para pantallas pequeñas */
  @media (max-width: 768px) {
    .button {
      font-size: 13px;
      padding: 0.6em 1.4em;
    }
  }

  /* Responsividad para pantallas extra pequeñas */
  @media (max-width: 576px) {
    .button {
      font-size: 10px;
      padding: 0.5em 1.2em;
    }
  }
`;

export default Buttoncontacto;
