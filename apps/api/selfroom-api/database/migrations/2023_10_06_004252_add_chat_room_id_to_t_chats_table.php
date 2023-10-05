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
        Schema::table('t_chats', function (Blueprint $table) {
          $table->foreignUuid('chat_room_id')->references('chat_room_id')->on('t_chat_rooms')
          ->constrained('t_chat_rooms')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('t_chats', function (Blueprint $table) {
          $table->dropColumn('chat_room_id');
        });
    }
};
