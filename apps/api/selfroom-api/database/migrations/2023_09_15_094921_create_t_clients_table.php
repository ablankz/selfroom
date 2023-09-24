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
        Schema::create('t_clients', function (Blueprint $table) {
            $table->id('t_clients_pkey');
            $table->dropPrimary();
        });

        // テーブル更新
        Schema::table('t_clients', function (Blueprint $table) {
            // AutoIncrement(PrimaryKey)
            $table->bigIncrements('client_id');
            
            $table->string('name')->comment('企業名');
            $table->string('address')->comment('住所');
            $table->string('mailaddress')->comment('メールアドレス');
            $table->string('site_url')->comment('ホームページ');
            $table->string('tel')->comment('TEL');
            $table->string('fax')->comment('FAX');
            $table->string('charge')->comment('担当者');
            $table->string('plan')->comment('契約者(スタンダード/プレミアム)');
            $table->string('design')->comment('ステッカーデザイン(複数あり)');
            $table->boolean('is_open')->comment('公開/非公開');
            $table->boolean('is_deleted')->default(false)->comment('論理削除用');
            $table->timestamps();

            // sequence列のPrimaryKey制約を削除
            $table->dropPrimary();
            // id列にPrimaryKey制約を再設定
            $table->primary('t_clients_pkey');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_clients');
    }
};
