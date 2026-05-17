<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Inquiry;

class NewInquiryNotification extends Notification
{
    use Queueable;

    public $inquiry;

    public function __construct(Inquiry $inquiry)
    {
        $this->inquiry = $inquiry;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'inquiry',
            'title' => 'New Property Inquiry',
            'message' => "{$this->inquiry->name} inquired about {$this->inquiry->property->title}.",
            'property_id' => $this->inquiry->property_id,
            'inquiry_id' => $this->inquiry->id,
            'sender_name' => $this->inquiry->name,
        ];
    }
}
