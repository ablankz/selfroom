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
            $table->uuid('user_id')->unique();
            
            $table->string('nickname')->comment('表示名');
            $table->string('profile_photo_url')->nullable()->comment('プロフィール画像パス');
            $table->bigInteger('follower_num')->default(0)->comment('このユーザーをフォローをしている人数');
            $table->bigInteger('follow_num')->default(0)->comment('このユーザーがフォローしている人数');
            $table->integer('favorite_room_num')->default(0)->comment('お気に入りのチャットルーム数');
            $table->softDeletes();
            $table->timestamps();

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
