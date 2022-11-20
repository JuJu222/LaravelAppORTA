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
        Schema::create('recipients_parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipient_id');
            $table->foreignId('parent_id');
            $table->foreignId('relationship_id');
            $table->timestamps();

            $table->foreign('recipient_id')
                ->references('id')->on('recipients')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('parent_id')
                ->references('id')->on('parents')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('relationship_id')
                ->references('id')->on('relationships')
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
        Schema::dropIfExists('recipients_parents');
    }
};
