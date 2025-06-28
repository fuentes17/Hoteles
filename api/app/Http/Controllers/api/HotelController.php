<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\acomodacion;
use App\Models\hoteles;
use App\Models\habitaciones;
use Illuminate\Http\Request;


class HotelController extends Controller
{
    
    /**
     * Funcion para mostrar Todos los hoteles
     */
    public function index()
    {
   
          $hotel = hoteles::orderBy('id', 'desc')->get();
        return $hotel;
    }

    /**
     * Funcion para mostrar en select todos los tipos de Habitaciones
     */
   public function Habitacion()
   {
       $TipoHabitacion=habitaciones::all();
       return $TipoHabitacion;
   }

    /**
     * Funcion para mostrar En select las acomodaciones
     */
   public function Acomodacion()
   {
       $Acomodacion=Acomodacion::all();
       return $Acomodacion;
   }

    /**
     * Funcion para Guardar Un Hotel
     */
    public function store(Request $request)
    {
        $hotel=new hoteles();
        $hotel->NombreHotel=$request->NombreHotel;
        $hotel->Direccion=$request->Direccion;
        $hotel->Ciudad=$request->Ciudad;
        $hotel->Nit=$request->Nit;
        $hotel->NumeroHabitaciones=$request->NumeroHabitaciones;
        $hotel->idhabitacion=$request->idhabitacion;
        $hotel->save();
    }

    /**
     * Funcion para mostrar un hotel
     */
    public function show($id)
    {
        $hotel = hoteles::find($id);
        return $hotel;
    }

    /**
     * funcion para actualizar un hotel
     */                                                                                                                                             
    public function update(Request $request, $id)
    {
        $hotel = hoteles::findOrFail($request->id);
        $hotel->NombreHotel=$request->NombreHotel;
        $hotel->Direccion=$request->Direccion;
        $hotel->Ciudad=$request->Ciudad;
        $hotel->Nit=$request->Nit;
        $hotel->NumeroHabitaciones=$request->NumeroHabitaciones;
        $hotel->idhabitacion=$request->idhabitacion;
        $hotel->save();
        return $hotel;
    }

    /**
     * Funcion Eliminar un Hotel
     */
    public function destroy($id)
    {
        $hotel = hoteles::destroy($id);
        return $hotel;
    }


}
