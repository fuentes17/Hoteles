import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const endpoint = "http://localhost:8000/api";

const UpdateHotel = ({ hotelId, onUpdateSuccess }) => {
  // Estado para cada campo del formulario
  const [nombreHotel, setNombreHotel] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nit, setNit] = useState("");
  const [numeroHabitaciones, setNumeroHabitaciones] = useState("");

  // ==========================================================
  // PASO 1: AÑADIR ESTADO PARA IDHABITACION
  // ==========================================================
  const [idhabitacion, setIdhabitacion] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hotelId) {
      const getHotelById = async () => {
        try {
          const response = await axios.get(`${endpoint}/Hotel/${hotelId}`);
          const hotelData = response.data;

          // Log para depurar: Muestra en la consola exactamente lo que recibes de la API
          console.log("Datos recibidos para editar:", hotelData);

          // Llenamos el estado del formulario con los datos recibidos
          setNombreHotel(hotelData.NombreHotel);
          setDireccion(hotelData.Direccion);
          setCiudad(hotelData.Ciudad);
          setNit(hotelData.Nit);
          setNumeroHabitaciones(hotelData.NumeroHabitaciones);

          // ==========================================================
          // PASO 2: GUARDAR EL IDHABITACION EN EL ESTADO
          // Asegúrate que 'hotelData.idhabitacion' coincide con el nombre del campo en tu API.
          // Podría ser 'id_habitacion' o algo diferente. ¡Verifícalo con el console.log!
          // ==========================================================
          setIdhabitacion(hotelData.idhabitacion);
        } catch (error) {
          console.error("Error fetching hotel data:", error);
        }
      };
      getHotelById();
    }
  }, [hotelId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `${endpoint}/Hotel/${hotelId}`;
    const payload = {
      NombreHotel: nombreHotel,
      Direccion: direccion,
      Ciudad: ciudad,
      Nit: nit,
      NumeroHabitaciones: numeroHabitaciones,
      // ==========================================================
      // PASO 3: INCLUIR EL IDHABITACION EN LOS DATOS A ENVIAR
      // ==========================================================
      idhabitacion: idhabitacion,
    };

    console.log("Enviando actualización con payload:", payload);

    try {
      await axios.put(url, payload);
      swal("¡Actualizado!", "El hotel se actualizó correctamente.", "success");
      onUpdateSuccess();
      window.$("#modal-edit-hotel").modal("hide");
    } catch (error) {
      console.error("Error al actualizar:", error.response || error);
      swal("Error", "No se pudo actualizar el hotel.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      {/* ... otros campos del formulario ... */}
      <div className="form-group">
        <label>Nombre del Hotel</label>
        <input
          type="text"
          className="form-control"
          value={nombreHotel}
          onChange={(e) => setNombreHotel(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input
          type="text"
          className="form-control"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Ciudad</label>
        <input
          type="text"
          className="form-control"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>NIT</label>
        <input
          type="text"
          className="form-control"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Número de Habitaciones</label>
        <input
          type="number"
          className="form-control"
          value={numeroHabitaciones}
          onChange={(e) => setNumeroHabitaciones(e.target.value)}
          required
        />
      </div>

      {/* Input para el id de habitación */}
      <div className="form-group">
        <label>Tipo de Habitaciones (ID)</label>
        <input
          type="text"
          className="form-control"
          value={idhabitacion}
          onChange={(e) => setIdhabitacion(e.target.value)}
          required
        />
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          disabled={loading}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
};

export default UpdateHotel;
