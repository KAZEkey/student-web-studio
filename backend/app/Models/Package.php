<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends Model
{
    protected $fillable = ['service_id', 'name', 'price', 'features', 'timeline'];

    protected $casts = ['features' => 'array', 'price' => 'decimal:2'];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}