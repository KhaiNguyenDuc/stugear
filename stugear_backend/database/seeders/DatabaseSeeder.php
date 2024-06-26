<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            TransactionSeeder::class,
            ProductSeeder::class,
            ContactDetailSeeder::class,
            ImageSeeder::class,
            RatingSeeder::class,
            CommentSeeder::class,
            OrderSeeder::class,
            ThreadSeeder::class,
            TagSeeder::class,
            ReplySeeder::class,
            ConfigurationSeeder::class,
        ]);
    }
}
