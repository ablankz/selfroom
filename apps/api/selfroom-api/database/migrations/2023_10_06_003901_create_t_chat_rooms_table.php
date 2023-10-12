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
        Schema::create('t_chat_rooms', function (Blueprint $table) {
            $table->id('t_chat_rooms_pkey');
            $table->dropPrimary();
        });

        Schema::table('t_chat_rooms', function (Blueprint $table) {
            $table->uuid('chat_room_id')->unique();
            
            $table->string('name')->comment('チャットルーム名');
            $table->string('cover_photo_url')->nullable()->comment('写真のパス');
            $table->integer('user_num')->default(0)->comment('現在ユーザーが何人いるか');
            $table->integer('favor_num')->default(0)->comment('お気に入りユーザー数');
            $table->string('room_key')->nullable()->comment('ルームキー');
            $table->timestamps();

            $table->primary('t_chat_rooms_pkey');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_chat_rooms');
    }
};
