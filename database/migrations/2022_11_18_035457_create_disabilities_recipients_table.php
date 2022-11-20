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
        Schema::create('disabilities_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipient_id');
            $table->foreignId('disability_id');
            $table->text('note');
            $table->timestamps();

            $table->foreign('recipient_id')
                ->references('id')->on('recipients')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('disability_id')
                ->references('id')->on('disabilities')
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
        Schema::dropIfExists('disabilities_recipients');
    }
};
