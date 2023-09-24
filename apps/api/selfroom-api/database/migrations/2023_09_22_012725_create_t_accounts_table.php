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
        // テーブル作成
        Schema::create('t_accounts', function (Blueprint $table) {
          $table->id('t_accounts_pkey');
          $table->dropPrimary();
        });

      // テーブル更新
      Schema::table('t_accounts', function (Blueprint $table) {
          // AutoIncrement(PrimaryKey)
          $table->bigIncrements('user_id');
          
          $table->string('login_id')->nullable()->comment('ログインのための識別子');
          $table->string('password')->nullable()->comment('認証時のパスワード');
          $table->string('provider_id')->nullable()->comment('ソーシャルログイン用ID');
          $table->string('provider_name')->nullable()->comment('ソーシャルプロバイダ');
          $table->boolean('is_active')->comment('稼働/非稼働');
          $table->boolean('is_deleted')->default(false)->comment('論理削除用');
          $table->timestamps();

          // sequence列のPrimaryKey制約を削除
          $table->dropPrimary();
          // id列にPrimaryKey制約を再設定
          $table->primary('t_accounts_pkey');
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_accounts');
    }
};
