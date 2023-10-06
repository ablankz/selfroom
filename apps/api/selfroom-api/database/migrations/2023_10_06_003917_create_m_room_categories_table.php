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
        Schema::create('m_room_categories', function (Blueprint $table) {
            $table->id('m_room_categories_pkey');
            $table->dropPrimary();
        });

        Schema::table('m_room_categories', function (Blueprint $table) {
            $table->bigIncrements('room_category_id')->unique();
            
            $table->string('name')->comment('カテゴリー名');

            $table->dropPrimary();
            $table->primary('m_room_categories_pkey');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_room_categories');
    }
};
