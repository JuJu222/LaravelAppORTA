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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donor_id');
            $table->foreignId('need_id');
            $table->bigInteger('amount');
            $table->string('bank_account');
            $table->date('transfer_date');
            $table->string('transfer_receipt');
            $table->date('accepted_date');
            $table->foreignId('accepted_by_admin_id')->nullable();
            $table->timestamps();

            $table->foreign('donor_id')
                ->references('id')->on('donors')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('need_id')
                ->references('id')->on('needs')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('accepted_by_admin_id')
                ->references('id')->on('admins')
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
        Schema::dropIfExists('donations');
    }
};
