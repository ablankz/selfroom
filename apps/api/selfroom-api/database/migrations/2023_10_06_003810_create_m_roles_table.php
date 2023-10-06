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
        Schema::create('m_roles', function (Blueprint $table) {
            $table->id('m_roles_pkey');
            $table->dropPrimary();
        });

        Schema::table('m_roles', function (Blueprint $table) {
            $table->bigIncrements('role_id')->unique();
            
            $table->string('name');

            $table->dropPrimary();
            $table->primary('m_roles_pkey');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_roles');
    }
};
