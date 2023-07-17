import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';


const endpoint = 'http://localhost:8000/api/Hotel';


export default function CreateHotel({ getAllHotel,ActualizarPagina }) {
  const [NombreHotel, setNombreHotel] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Ciudad, setCiudad] = useState('');
  const [Nit, setNit] = useState();
  const [NumeroHabitaciones, setNumeroHabitaciones] = useState();
  const [idhabitaciones, setidHabitaciones] = useState();





 

  const store = async (e) => {
    e.preventDefault();
    await axios.post(endpoint, {
      NombreHotel: NombreHotel,
      Direccion: Direccion,
      Ciudad: Ciudad,
      Nit: Nit,
      NumeroHabitaciones: NumeroHabitaciones,
      idhabitacion: idhabitaciones,
    })
      .then(() => {
        getAllHotel();
        swal({
          text: "Hotel Guardado con éxito",
          icon: "success"
        });
      })
      .catch((error) => {
        console.error(error);
        swal({
          text: "Error al Guardar Hotel",
          icon: "error"
        });
      });


     
  };
 
  return (
    <div className='container-fluid container-md'>
  
 
      <form className='row g-3'  onSubmit={store} >
        <div className='col-md-6'>
          <label for='validationDefault01' className='form-label'>
            Nombre Hotel
          </label>
          <input
            value={NombreHotel}
            onChange={(e) => setNombreHotel(e.target.value)}
            type='text'
            className='form-control'
            id='validationDefault01'
            required
          />
        </div>

        <div className='col-md-6'>
          <label for='validationDefault02' className='form-label'>
            Direccion
          </label>
          <input
            value={Direccion}
            onChange={(e) => setDireccion(e.target.value)}
            type='text'
            className='form-control'
            id='validationDefault02'
            required
          />
        </div>

        <div className='col-md-6'>
          <label for='validationDefault03' className='form-label'>
            Ciudad
          </label>
          <input
            value={Ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            type='text'
            className='form-control'
            id='validationDefault03'
            required
          />
        </div>

        <div className='col-md-6'>
          <label for='validationDefault04' className='form-label'>
            Nit
          </label>
          <input
            value={Nit}
            onChange={(e) => setNit(e.target.value)}
            type='number'
            className='form-control'
            id='validationDefault04'
            required
          />
        </div>

        <div className='col-md-6'>
          <label for='validationDefault05' className='form-label'>
            Numero de Habitaciones
          </label>
          <input
            value={NumeroHabitaciones}
            onChange={(e) => setNumeroHabitaciones(e.target.value)}
            type='number'
            className='form-control'
            id='validationDefault05'
            required
          />
        </div>

        <div className='col-md-6'>
          <label for='validationDefault05' className='form-label'>
           id HAbitacion
          </label>
          <input
            value={idhabitaciones}
            onChange={(e) => setidHabitaciones(e.target.value)}
            type='number'
            className='form-control'
            id='validationDefault06'
            required
          />
        </div>



        
        <div className="modal-footer justify-content-between">
              <button type="button" className='btn btn-default' data-dismiss="modal">Close</button>
              <button type="submit"  className='btn btn-primary' >Guardar</button>
        </div>
        
      </form>
    </div>
  );

};



