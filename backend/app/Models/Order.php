<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'order_code', 'customer_name', 'email', 'whatsapp', 'project_name',
        'description', 'budget', 'deadline', 'status',
    ];

    protected $casts = ['budget' => 'decimal:2', 'deadline' => 'date'];

    public const STATUSES = [
        'menunggu_konfirmasi',
        'konsultasi',
        'menunggu_pembayaran',
        'dalam_pengerjaan',
        'revisi',
        'selesai',
        'dibatalkan',
    ];

    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(OrderFile::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function project(): HasOne
    {
        return $this->hasOne(Project::class);
    }

    public static function generateCode(): string
    {
        do {
            $code = 'SWS-' . strtoupper(bin2hex(random_bytes(5)));
        } while (self::where('order_code', $code)->exists());

        return $code;
    }
}