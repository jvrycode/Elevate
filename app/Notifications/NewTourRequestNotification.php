<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Appointment;

class NewTourRequestNotification extends Notification
{
    use Queueable;

    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'tour_request',
            'title' => 'New Tour Request',
            'message' => "Tour requested for {$this->appointment->property->title} on " . $this->appointment->scheduled_at->format('M j, Y'),
            'property_id' => $this->appointment->property_id,
            'appointment_id' => $this->appointment->id,
            'sender_name' => $this->appointment->user->name ?? 'A Client',
        ];
    }
}
