<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="app_index")
     */
    public function index() : Response
    {
        return $this->render('app/index.html.twig', [
            'user' => $this->getUser()
        ]);
    }

    /**
     * @Route("/profile", name="app_profile")
     */
    public function profile() : Response
    {
        return $this->render('app/profile.html.twig', [
            'user' => $this->getUser()
        ]);
    }
}

// RESTful

// indexAction -> un Liste d'users | GET
// showAction -> Afficher une resource | GET
// createAction -> afficher un formulaire pour créer une resource | GET
// store -> récupérer les données du form et save() | POST
// edit -> afficher un formulaire pré-rempli avec les données d'une resource à mettre à jour | GET
// update -> Sauvegarder les données de la resource a mettre a jour | PUT ou PATCH
// destroy -> Effacer une resource | DELETE


// Créer une entité Article :
// id, title, body, user_id,
// Associer Article.user_id avec User.id
// Pour générer le CRUD, trouvez la bonne ligne de commande

//
