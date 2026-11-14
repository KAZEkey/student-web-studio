<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = ['order_id', 'progress', 'current_stage', 'notes'];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function updates(): HasMany
    {
        return $this->hasMany(ProjectUpdate::class)->latest();
    }
}