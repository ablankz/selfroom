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
    Schema::create('t_follows', function (Blueprint $table) {
      $table->id('t_follows_pkey');
      $table->dropPrimary();
    });

    Schema::table('t_follows', function (Blueprint $table) {
      $table->foreignUuid('follower_id')->comment('フォローする側')->references('user_id')->on('t_users')
        ->constrained('t_users')->onUpdate('cascade')->onDelete('cascade');
      $table->foreignUuid('followee_id')->nullable()->comment('フォローされる側')->references('user_id')->on('t_users')
        ->constrained('t_users')->onUpdate('set null')->onDelete('set null');
      $table->timestamp('followed_at');


      $table->primary('t_follows_pkey');
      $table->unique(['follower_id', 'followee_id']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('t_follows');
  }
};
