import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateHotel from "./CreateHotel";
import swal from "sweetalert";
import UpdateHotel from "./UpdateHotel";

const endpoint = "http://localhost:8000/api";

const ShowHotel = () => {
  const [hoteles, setHoteles] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  useEffect(() => {
    getAllHotel();
  }, []);

  const getAllHotel = async () => {
    try {
      const rpta = await axios.get(`${endpoint}/Hoteles`);
      setHoteles(rpta.data);
    } catch (error) {
      // It's good practice to provide user feedback on error
      console.error("Error fetching hotels:", error);
      swal({
        text: "Error al cargar los hoteles.",
        icon: "error",
      });
    }
  };

  const deleteHotel = async (id) => {
    swal({
      title: "Eliminar Hotel",
      text: "¿Está seguro que desea eliminar este hotel?",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${endpoint}/Hotel/${id}`)
          .then(() => {
            // Re-fetch data to update the list
            getAllHotel();
            swal({
              text: "El hotel ha sido borrado con éxito.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting hotel:", error);
            swal({
              text: "Error al borrar el hotel.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleEditClick = (id) => {
    setSelectedHotelId(id);
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Hoteles Dancarton</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Lista de Hoteles</h3>
                  <div className="card-tools">
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-toggle="modal"
                      data-target="#modal-create-hotel"
                    >
                      <i className="fas fa-plus"></i> CREAR HOTEL
                    </button>
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre Hotel</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Nit</th>
                        <th>N° Habitaciones</th>
                        <th>Tipo Habitaciones</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoteles.map((hotel) => (
                        <tr key={hotel.id}>
                          <td>{hotel.id}</td>
                          <td>{hotel.NombreHotel}</td>
                          <td>{hotel.Direccion}</td>
                          <td>{hotel.Ciudad}</td>
                          <td>{hotel.Nit}</td>
                          <td>{hotel.NumeroHabitaciones}</td>
                          <td>{hotel.idhabitacion}</td>
                          <td className="text-right py-0 align-middle">
                            <div className="btn-group btn-group-sm">
                              <button
                                type="button"
                                className="btn btn-warning"
                                data-toggle="modal"
                                data-target="#modal-edit-hotel"
                                onClick={() => handleEditClick(hotel.id)}
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteHotel(hotel.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer clearfix">
                  {/* Note: This pagination is static. For a full implementation, 
                      you would need state to manage the current page and API support for pagination. */}
                  <ul className="pagination pagination-sm m-0 float-right">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        «
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        »
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal: Crear Hotel */}
            <div className="modal fade" id="modal-create-hotel">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Crear Nuevo Hotel</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <CreateHotel onCreationSuccess={getAllHotel} />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal: Editar Hotel */}
            <div className="modal fade" id="modal-edit-hotel">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Actualizar Hotel</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {/* The UpdateHotel component only renders if a hotel has been selected */}
                    {selectedHotelId && (
                      <UpdateHotel
                        hotelId={selectedHotelId}
                        onUpdateSuccess={getAllHotel}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowHotel;
