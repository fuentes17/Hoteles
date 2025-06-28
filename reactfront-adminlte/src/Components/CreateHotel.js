// En tu archivo CreateHotel.js

import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

// Asegúrate de que el endpoint sea el correcto para CREAR un hotel.
// Normalmente es una petición POST a la URL de la colección (ej: /api/Hoteles)
const endpoint = "http://localhost:8000/api/Hotel";

// Recibimos la función onCreationSuccess desde el componente padre (ShowHotel)
const CreateHotel = ({ onCreationSuccess }) => {
  // 1. Estado para cada campo del formulario
  const [nombreHotel, setNombreHotel] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nit, setNit] = useState("");
  const [numeroHabitaciones, setNumeroHabitaciones] = useState("");
  const [idhabitacion, setIdhabitacion] = useState(""); // Asumiendo que esto es un ID o tipo

  const [loading, setLoading] = useState(false);

  // 2. Función que se ejecuta al enviar el formulario
  const handleStore = async (e) => {
    e.preventDefault(); // ¡Muy importante! Evita que la página se recargue
    setLoading(true);

    const payload = {
      NombreHotel: nombreHotel,
      Direccion: direccion,
      Ciudad: ciudad,
      Nit: nit,
      NumeroHabitaciones: numeroHabitaciones,
      idhabitacion: idhabitacion,
    };

    console.log("Enviando datos para crear hotel:", payload);
    console.log("A la URL:", endpoint);

    try {
      // 3. Petición POST con Axios para crear el recurso
      await axios.post(endpoint, payload);

      // 4. Si todo sale bien...
      swal("¡Éxito!", "El hotel fue creado correctamente.", "success");

      // Llamamos a la función del padre para que actualice la tabla
      onCreationSuccess();

      // Limpiamos el formulario para el siguiente registro
      setNombreHotel("");
      setDireccion("");
      setCiudad("");
      setNit("");
      setNumeroHabitaciones("");
      setIdhabitacion("");

      // Cerramos el modal de Bootstrap
      window.$("#Modal-Create").modal("hide");
    } catch (error) {
      // 5. Si algo sale mal...
      console.error("--- ERROR AL CREAR HOTEL ---");
      if (error.response) {
        // El error más común es de validación (422)
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        swal("Error de validación", error.response.data.message, "error");
      } else {
        console.error("Error:", error.message);
        swal("Error", "No se pudo conectar con el servidor.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid container-md">
      <form className="row g-3" onSubmit={handleStore}>
        <div className="col-md-4">
          <label>Nombre del Hotel</label>
          <input
            type="text"
            className="form-control"
            value={nombreHotel}
            onChange={(e) => setNombreHotel(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label>Ciudad</label>
          <input
            type="text"
            className="form-control"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label>NIT</label>
          <input
            type="text"
            className="form-control"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label>Número de Habitaciones</label>
          <input
            type="number"
            className="form-control"
            value={numeroHabitaciones}
            onChange={(e) => setNumeroHabitaciones(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label>Tipo de Habitaciones (ID)</label>
          <input
            type="text"
            className="form-control"
            value={idhabitacion}
            onChange={(e) => setIdhabitacion(e.target.value)}
            required
          />
        </div>

        <div className="modal-footer justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHotel;
