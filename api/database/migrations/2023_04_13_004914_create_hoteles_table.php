<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hoteles', function (Blueprint $table) {
            $table->id();
            $table->string('NombreHotel');
            $table->string('Direccion');
            $table->string('Ciudad');
            $table->integer('Nit');
            $table->integer('NumeroHabitaciones');
            $table->foreignId('idhabitacion')
                ->nullable()
                ->constrained('habitaciones')
                ->cascadeOnUpdate()
                ->nullOnDelete();
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hoteles');
    }
};
