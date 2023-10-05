<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('t_users', function (Blueprint $table) {
          $table->foreignUuid('current_chat_room_id')->nullable()->references('chat_room_id')->on('t_chat_rooms')
          ->constrained('t_chat_rooms')->onUpdate('set null')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_users', function (Blueprint $table) {
          $table->dropColumn('current_chat_room_id');
        });
    }
};
