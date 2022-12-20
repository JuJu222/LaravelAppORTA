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
        Schema::create('needs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('need_category_id');
            $table->foreignId('recipient_id');
            $table->bigInteger('amount');
            $table->date('due_date');
            $table->date('delivered_date')->nullable();
            $table->string('delivered_photo')->nullable();
            $table->text('delivered_message')->nullable();
            $table->timestamps();

            $table->foreign('need_category_id')
                ->references('id')->on('need_categories')
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
        Schema::dropIfExists('needs');
    }
};
