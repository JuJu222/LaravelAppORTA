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
        Schema::create('disabilities_parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id');
            $table->foreignId('disability_id');
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('parent_id')
                ->references('id')->on('parents')
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
        Schema::dropIfExists('disabilities_parents');
    }
};
