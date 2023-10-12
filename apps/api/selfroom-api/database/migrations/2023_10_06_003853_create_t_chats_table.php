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
    Schema::create('t_chats', function (Blueprint $table) {
      $table->id('t_chats_pkey');
      $table->dropPrimary();
    });

    Schema::table('t_chats', function (Blueprint $table) {
      $table->ulid('chat_id')->unique();

      $table->foreignUuid('user_id')->nullable()->references('user_id')->on('t_users')
        ->constrained('t_users')->onUpdate('set null')->onDelete('set null');
      $table->string('content')->comment('コメント内容');
      $table->timestamps();

      $table->primary('t_chats_pkey');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('t_chats');
  }
};
