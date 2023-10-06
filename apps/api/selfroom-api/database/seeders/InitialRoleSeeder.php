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
    foreach (get_all_roles() as $role) {
      \App\Models\Role::create(
        [
          'name' => $role,
        ]
      );
    }
  }
}
