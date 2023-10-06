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
    Schema::table('m_accounts', function (Blueprint $table) {
      $table->foreignUuid('user_id')->nullable()->references('user_id')->on('t_users')
        ->constrained('t_users')->onUpdate('set null')->onDelete('set null');
      $table->foreignUuid('admin_id')->nullable()->references('admin_id')->on('t_admins')
        ->constrained('t_admins')->onUpdate('set null')->onDelete('set null');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('m_accounts', function (Blueprint $table) {
      $table->dropColumn('user_id');
      $table->dropColumn('admin_id');
    });
  }
};
