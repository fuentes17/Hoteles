import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateHotel from "./CreateHotel";
import swal from 'sweetalert';
import UpdateHotel from "./UpdateHotel";

const endpoint = "http://localhost:8000/api";
const ShowHotel = () => {
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    getAllHotel();
  }, []);

  const getAllHotel = async () => {
    const rpta = await axios.get(`${endpoint}/Hoteles`);
    setHoteles(rpta.data);
  };

  const deleteHotel = async (id) => {
    swal({
      title:"Eliminar",
      text:"Esta seguro que Desea Eliminar",
      icon:"warning",
      buttons:["no","si"]
        }).then(respuesta=>{
          if(respuesta){
          swal({text:"El Archivo se ha Borrado con exito",
        icon:"success"})
        axios.delete(`${endpoint}/Hotel/${id}`);
        getAllHotel();
      }
        })
  
  };




  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Hoteles Dancarton</h1>
            </div>
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard v1</li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div class="card">
                <div className="card-header">
                  <h3 class="card-title">Hoteles</h3>
                  <div class="d-grid justify-content-md-end ">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      type="button"
                      data-toggle="modal"
                      data-target="#Modal-Create"
                    >
                      CREAR HOTEL
                    </button>
                  </div>
                </div>
                <div className="card-body table-responsive">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre Hotel</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Nit</th>
                        <th scope="col">Cantidad Habitacionies</th>
                        <th scope="col">tipo Habitacionies</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoteles.map((hotel) => (
                        <tr key={hotel.id}>
                          <th scope="row">{hotel.id}</th>
                          <td>{hotel.NombreHotel}</td>
                          <td>{hotel.Direccion}</td>
                          <td>{hotel.Ciudad}</td>
                          <td>{hotel.Nit}</td>
                          <td>{hotel.NumeroHabitaciones}</td>
                          <td>{hotel.idhabitacion}</td>
                          <td text-right py-0 align-middle>
                           <div className="btn-group btn-group-sm">
                            <button
                              type="button"     
                              className="btn btn-block btn-warning"
                              data-toggle="modal"
                              data-target="#Modal-Edit"
                            >
                             <i className="fas fa-eye"></i>
                            </button>
                            
                      
                            <button
                              type="button"
                              className="btn btn-outline-danger toastsDefaultDanger"
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
                <div class="card-footer clearfix">
                  <ul class="pagination pagination-sm m-0 float-right">
                    <li class="page-item">
                      <a class="page-link" href="#">
                        &laquo;
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        &raquo;
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
                        {/* Modal de Crear Hotel */}
            <div class="modal fade" id="Modal-Create">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Crear Hotel</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="container-fluid container-md">
                      <CreateHotel />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal De Editar Hotel */}
            <div class="modal fade" id="Modal-Edit">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Crear Hotel</h4>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className="container-fluid container-md">
                      <UpdateHotel />
                    </div>
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