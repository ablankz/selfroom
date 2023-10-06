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
    Schema::create('t_admins', function (Blueprint $table) {
      $table->id('t_admins_pkey');
      $table->dropPrimary();
    });

    Schema::table('t_admins', function (Blueprint $table) {
      $table->uuid('admin_id')->unique();

      $table->string('nickname')->comment('表示名');
      $table->string('profile_photo_url')->nullable()->comment('プロフィール画像パス');
      $table->softDeletes();
      $table->timestamps();

      $table->primary('t_admins_pkey');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('t_admins');
  }
};
