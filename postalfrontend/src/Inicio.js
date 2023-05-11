import React, { useState } from "react";
import "./Inicio.css";

const Inicio = () => {
  const [paises, setPaises] = useState([]);
  const [initialChange, setInitialChange] = useState(false);

  async function getInfo() {
    const postalCode = document.getElementById("postalCode");
    const postalCodeValue = postalCode.value;
    const response = await fetch(`http://localhost:5000/${postalCodeValue}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setPaises(data);
    setInitialChange(true);
  }

  function reset() {
    setPaises([]);
    setInitialChange(false);
    const postalCode = document.getElementById("postalCode");
    postalCode.value = "";
  }

  return (
    <div className="container-fluid p-5">
      <div className="container">
        <h1 className="text-center fw-bolder">
          Validación de códigos postales
        </h1>
        <p className="p-3 fw-bolder fs-4" style={{ textAlign: "center" }}>
          Ingresa un código postal y te diremos a que país pertenece ese código.
        </p>
      </div>
      <div className="d-flex align-items-center justify-content-center  animate__animated animate__fadeInUp">
        <div className="searchbar">
          <input
            className="search_input"
            type="text"
            id="postalCode"
            placeholder="Codigo Postal..."
          />
          <a href="/#" className="search_icon" onClick={() => getInfo()}>
            <i className="bi bi-search"></i>
          </a>
        </div>
      </div>
      {paises.length > 0 ? (
        <div className="container mt-4 p-3 text-center">
          {paises.map(({ pais, ISO }) => (
            <div className="container">
              <div className="row align-items-center">
                <div className="col-4 text-center">
                  <img
                    src={`https://flagsapi.com/${ISO}/shiny/64.png`}
                    alt="flag"
                  />
                </div>
                <div className="col-6">
                  <p
                    className="fs-5 mt-2 fw-bolder"
                    style={{ textAlign: "initial" }}
                    key={pais}
                  >
                    El país al que pertenece el código postal ingresado es{" "}
                    {pais}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-dark mt-4"
            onClick={() => reset()}
          >
            Borrar resultados
          </button>
        </div>
      ) : (
        <>
          {initialChange && (
            <>
              <div className="container mt-4 p-3 text-center">
                <p className="fs-4 mt-2">
                  El código ingresado no pertenece a ningún país.
                </p>
                <button
                  type="button"
                  className="btn btn-dark mt-4"
                  onClick={() => reset()}
                >
                  Borrar resultados
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Inicio;
