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
    Schema::create('t_favorite_chat_rooms', function (Blueprint $table) {
      $table->id('t_favorite_chat_rooms_pkey');
      $table->dropPrimary();
    });

    Schema::table('t_favorite_chat_rooms', function (Blueprint $table) {
      $table->foreignUuid('user_id')->references('user_id')->on('t_users')
        ->constrained('t_users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreignUuid('chat_room_id')->nullable()->references('chat_room_id')->on('t_chat_rooms')
        ->constrained('t_chat_rooms')->onUpdate('set null')->onDelete('set null');
      $table->timestamp('added_at');

      $table->primary('t_favorite_chat_rooms_pkey');
      $table->unique(['user_id', 'chat_room_id']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('t_favorite_chat_rooms');
  }
};
