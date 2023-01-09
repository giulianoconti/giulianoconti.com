import React from "react";
import PropTypes from "prop-types";

export const AboutScreen = ({ setPage }) => {
  const getAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const goToProjects = () => {
    setPage(2);
  };

  return (
    <>
      <div className="height-for-absolutes" />
      <div className="card-about-container">
        <h1 className="card-about-title">Sobre Mí</h1>
        <p className="card-about-subtitle">
          Soy de Resistencia, Argentina. Tengo {getAge("2001-03-07")} años.
        </p>
        <p className="card-about-subtitle">Creé proyectos pequeños con arduino usando C++.</p>
        <p className="card-about-subtitle">
          En el año 2022 me enfoqué principalmente en el desarrollo Front-End utilizando React.
        </p>
        <p className="card-about-subtitle">
          Me gusta programar, diseñar planos 3D en SketchUp, juntarme con amigos, los videojuegos,
          jugar padel y andar en bici.
        </p>
        <button className="card-about-btn" onClick={goToProjects}>
          Siguiente
        </button>
      </div>
    </>
  );
};

AboutScreen.propTypes = {
  setPage: PropTypes.func.isRequired,
};
