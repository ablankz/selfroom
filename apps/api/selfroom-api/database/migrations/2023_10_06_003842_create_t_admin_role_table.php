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
    Schema::create('t_admin_role', function (Blueprint $table) {
      $table->id('t_admin_role_pkey');
      $table->dropPrimary();
    });

    Schema::table('t_admin_role', function (Blueprint $table) {
      $table->foreignUuid('admin_id')->references('admin_id')->on('t_admins')
        ->constrained('t_admins')->onUpdate('cascade')->onDelete('cascade');
      $table->foreignId('role_id')->references('role_id')->on('m_roles')
        ->constrained('m_roles')->onUpdate('cascade')->onDelete('cascade');
      $table->foreignUuid('granted_by')->nullable()->references('admin_id')->on('t_admins')
        ->constrained('t_admins')->onUpdate('set null')->onDelete('set null');
      $table->timestamp('granted_at');

      $table->primary('t_admin_role_pkey');
      $table->unique(['admin_id', 'role_id']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('t_admin_role');
  }
};
