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
    Schema::create('m_accounts', function (Blueprint $table) {
      $table->id('m_accounts_pkey');
      $table->dropPrimary();
    });

    Schema::table('m_accounts', function (Blueprint $table) {
      $table->bigIncrements('account_id')->unique();

      $table->string('login_id')->nullable()->comment('ログインのための識別子');
      $table->string('password')->nullable()->comment('認証時のパスワード');
      $table->string('provider_id')->nullable()->comment('ソーシャルログイン用ID');
      $table->string('provider_name')->nullable()->comment('ソーシャルプロバイダ');
      $table->timestamps();

      $table->dropPrimary();
      $table->primary('m_accounts_pkey');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('m_accounts');
  }
};
