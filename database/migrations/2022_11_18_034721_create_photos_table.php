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
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('photo_url');
            $table->foreignId('photo_type_id');
            $table->foreignId('recipient_id');
            $table->timestamps();

            $table->foreign('photo_type_id')
                ->references('id')->on('photo_types')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('recipient_id')
                ->references('id')->on('recipients')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photos');
    }
};
