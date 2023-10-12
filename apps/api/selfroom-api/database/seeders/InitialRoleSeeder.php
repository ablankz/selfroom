<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class InitialRoleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    foreach (get_all_role_names() as $role) {
      \App\Models\Role::create(
        [
          'name' => $role,
        ]
      );
    }
  }
}
