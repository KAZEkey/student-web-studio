<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code', 32)->unique();
            $table->string('customer_name');
            $table->string('email');
            $table->string('whatsapp');
            $table->string('project_name');
            $table->text('description')->nullable();
            $table->decimal('budget', 12, 2)->nullable();
            $table->date('deadline')->nullable();
            $table->string('status')->default('menunggu_konfirmasi');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};