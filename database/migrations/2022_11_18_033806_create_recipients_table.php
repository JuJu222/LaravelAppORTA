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
        Schema::create('recipients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nik');
            $table->enum('gender', ['laki-laki', 'perempuan']);
            $table->string('birthplace');
            $table->date('birthdate');
            $table->string('school');
            $table->string('class');
            $table->integer('siblings');
            $table->integer('child_no');
            $table->text('address');
            $table->string('city');
            $table->string('phone');
            $table->string('birth_certificate')->nullable();
            $table->string('kartu_keluarga')->nullable();
            $table->text('note');
            $table->boolean('is_active');
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
        Schema::dropIfExists('recipients');
    }
};
