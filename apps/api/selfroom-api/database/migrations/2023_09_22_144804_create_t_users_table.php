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
        Schema::create('t_users', function (Blueprint $table) {
            $table->id('t_users_pkey');
            $table->dropPrimary();
        });

        Schema::table('t_users', function (Blueprint $table) {
            $table->bigIncrements('user_id');
            
            $table->string('name')->comment('企業名');
            $table->string('ninckname')->comment('ニックネーム');
            $table->string('mailaddress')->comment('メールアドレス');
            $table->string('zip')->comment('郵便番号');
            $table->string('address')->comment('住所');
            $table->date('birthday')->comment('郵便番号');
            $table->string('tel')->comment('TEL');
            $table->string('cellular_number')->comment('TEL');
            $table->string('car_type')->comment('車種');
            $table->string('number_plate')->comment('車ナンバー');
            $table->string('license')->comment('任意：免許証');


            // $table->string('site_url')->comment('ホームページ');
            
            // $table->string('fax')->comment('FAX');
            // $table->string('charge')->comment('担当者');
            // $table->string('plan')->comment('契約者(スタンダード/プレミアム)');
            // $table->boolean('is_open')->comment('公開/非公開');
            // $table->boolean('is_deleted')->default(false)->comment('論理削除用');
            // $table->timestamps();
            // $table->boolean('is_deleted')->default(false)->comment('論理削除用');
            // $table->timestamps();

            $table->dropPrimary();
            $table->primary('t_users_pkey');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_users');
    }
};
