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
        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->binary('content')->nullable();
            $table->longText('raw_content')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('parent_id')->default(0)->nullable();
            $table->unsignedBigInteger('reply_on')->default(0)->nullable();
            $table->integer('total_like')->nullable();
            $table->integer('total_dislike')->nullable();
            $table->unsignedBigInteger('thread_id')->nullable();
            $table->foreign('thread_id')->references('id')->on('threads');
            $table->integer('created_by')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->integer('updated_by')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->integer('deleted_by')->nullable();
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};