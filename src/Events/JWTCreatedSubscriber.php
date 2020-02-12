<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedSubscriber
{

    public function updateJwtData(JWTCreatedEvent $event)
    {

        // Récupérer l'utilisateur pour avoir son prénom (firstName) et son nom (lastName)
        $user = $event->getUser();

        // Enrichir les data pour quelles conteinnent ces données
        $data = $event->getData();
        $data['firsName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();
        
        $event->setData($data);
    }
}
