<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PluginsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plugins = [
            [
                'sort' => 1,
                'icon' => '
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current text-blue-400" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"></path>
                        <path class="fill-current text-blue-700" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"></path>
                        <path class="fill-current text-blue-600" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"></path>
                    </svg>',
                'name' => 'SamplePlugin',
                'version' => '1.0.0',
                'code' => '',
                'options' => '',
                'description' => 'демо плагин',
                'readme' => 'демо плагин',
                'templates' => 'Default',
                'activity' => true,
            ],
            // Добавьте остальные модули движка
        ];

        DB::table('plugins')->insert($plugins);
    }
}
