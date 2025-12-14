<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kavling_id')
                  ->constrained('kavlings')
                  ->onDelete('cascade'); 
            
            $table->string('customer_name');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->text('notes')->nullable();
            
           
            $table->enum('status', ['pending', 'processing', 'ready', 'completed'])->default('pending');
            
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};