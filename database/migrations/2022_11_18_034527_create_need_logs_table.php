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
        Schema::create('need_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('need_id');
            $table->foreignId('status_id');
            $table->date('status_date');
            $table->timestamps();

            $table->foreign('need_id')
                ->references('id')->on('needs')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('status_id')
                ->references('id')->on('status')
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
        Schema::dropIfExists('need_logs');
    }
};
