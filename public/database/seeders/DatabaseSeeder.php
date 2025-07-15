<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Добавляем все нужные сидеры
        $this->call([
//            RoleSeeder::class,
            SettingSeeder::class,
            RubricSeeder::class,
            SectionSeeder::class,
            ArticleSeeder::class,
            TagSeeder::class,
            ArticleImageSeeder::class,
            PluginsSeeder::class,
            // CommentsSeeder::class,
            AthleteSeeder::class,
            TournamentSeeder::class,
            // CategorySeeder::class,
            // Добавьте сюда другие сидеры по мере необходимости
        ]);
    }
}
