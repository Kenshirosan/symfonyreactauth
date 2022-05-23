<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\LoginFormAuthenticator;
use App\Security\TokenAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Doctrine\Persistence\ManagerRegistry;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="app_register")
     */
    public function register(ManagerRegistry $doctrine, Request $request, LoginFormAuthenticator $authenticator, TokenAuthenticator $tokenAuthenticator): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(password_hash($user . $form->get('plainPassword')->getData(), PASSWORD_DEFAULT));

            $user->setApiToken(password_hash(
                $user .
                $form->get('email')->getData() . $form->get('plainPassword')->getData(),
                PASSWORD_DEFAULT
            ));

            $entityManager = $doctrine->getManager();

            $entityManager->persist($user);

            if ($entityManager->flush() === null) {
                return new JsonResponse($user->getApiToken());
            }
            // do anything else you need here, like send an email



//            return $guardHandler->authenticateUserAndHandleSuccess(
//                $user,
//                $request,
//                $tokenAuthenticator,
//                'main' // firewall name in security.yaml
//            );
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }
}
