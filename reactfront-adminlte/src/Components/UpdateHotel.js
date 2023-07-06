import axios from "axios";
import React, {useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";


const endpoint = 'http://localhost:8000/api/Hotel/'

const UpdateHotel = ()=>{
 
    const [NombreHotel,setNombreHotel] = useState('')
    const [Direccion,setDireccion] = useState('')
    const [Ciudad,setCiudad] = useState('')
    const [Nit,setNit] = useState(0)
    const [NumeroHabitaciones,setNumeroHabitaciones] = useState(0)
    const [idhabitacion,setidhabitacion] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()

    

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`,{
            NombreHotel:NombreHotel,
            Direccion:Direccion,
            Ciudad:Ciudad,
            Nit:Nit,
            NumeroHabitaciones:NumeroHabitaciones,
            idhabitacion:idhabitacion 
        })
        navigate('/')
    }


    useEffect(()=>{
        const getHotelById = async () => {
            const rpta = await axios.get(`${endpoint}${id}`)
            setNombreHotel(rpta.data.NombreHotel) 
            setDireccion(rpta.data.Direccion)
            setCiudad(rpta.data.Ciudad)
            setNit(rpta.data.Nit)
            setNumeroHabitaciones(rpta.data.NumeroHabitaciones)
            setidhabitacion(rpta.data.idhabitacion)
        }
        getHotelById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )
    
    return (
      <div className='container-fluid container-md'>
  
  
      <form className='row g-3' onSubmit={update}>
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
            value={idhabitacion}
            onChange={(e) => setidhabitacion(e.target.value)}
            type='number'
            className='form-control'
            id='validationDefault06'
            required
          />
        </div>



        
        <div className="modal-footer justify-content-between">
              <button type="button" class='btn btn-default' data-dismiss="modal">Close</button>
              <button type="submit" className='btn btn-primary' >Guardar</button>
        </div>
        
      </form>
    </div>
    )
  }
export default UpdateHotel