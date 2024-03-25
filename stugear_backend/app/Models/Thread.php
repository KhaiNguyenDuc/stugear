<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'content',
        'raw_content',
        'view',
        'like',
        'dislike',
        'reply',
        'category_id',
        'user_id',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by'
    ];


    protected $hidden = [
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'deleted_at',
        'deleted_by'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function toString(){
        return $this->title . " " . $this->description . " " . $this->raw_content;
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function threadTags()
    {
        return $this->hasMany(ProductTag::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function reacts()
    {
        return $this->hasMany(React::class);
    }

    public function validation(){
        return $this->belongsTo(Validation::class);
    }
}
