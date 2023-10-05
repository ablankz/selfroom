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
    Schema::create('t_chat_room_tags', function (Blueprint $table) {
      $table->id('t_chat_room_tags_pkey');
      $table->dropPrimary();
    });

    Schema::table('t_chat_room_tags', function (Blueprint $table) {

      $table->foreignUuid('chat_room_id')->references('chat_room_id')->on('t_chat_rooms')
        ->constrained('t_chat_rooms')->onUpdate('cascade')->onDelete('cascade');
      $table->foreignId('room_category_id')->references('room_category_id')->on('t_room_categories')
        ->constrained('t_room_categories')->onUpdate('cascade')->onDelete('cascade');

      $table->primary('t_chat_room_tags_pkey');
      $table->unique(['chat_room_id', 'room_category_id']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('t_chat_room_tags');
  }
};
