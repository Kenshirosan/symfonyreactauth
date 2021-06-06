<?php


namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class TokenAuthenticator extends AbstractGuardAuthenticator
{
    public const LOGIN_ROUTE = 'app_login';
    private $em;
    private $urlGenerator;
    public $user;

    public function __construct(EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator)
    {
        $this->em = $em;
        $this->urlGenerator = $urlGenerator;
    }

    public function start(Request $request, AuthenticationException $authException = null): JsonResponse
    {
        $data = [
            // you might translate this message
            'message' => 'Authentication Required'
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function supports(Request $request): bool
    {
        $ok = false;

        if ($request->headers->has('X-AUTH-TOKEN')) {
            $ok = true;
        }

        if ($request->isMethod('POST') &&
            self::LOGIN_ROUTE === $request->attributes->get('_route') &&
            $request->isXmlHttpRequest()) {
            $ok = true;
        }
        return $ok;
    }

    public function getCredentials(Request $request)
    {
        if($request->headers->has('X-AUTH-TOKEN')) {
            return $request->headers->get('X-AUTH-TOKEN');
        }

        return [
            "email" => $request->request->get('email'),
            "password" => $request->request->get('password'),
            "csrf_token" => $request->request->get('_csrf_token')
        ];
    }

    public function getUser($credentials, UserProviderInterface $userProvider): ?UserInterface
    {
        if (gettype($credentials) !== 'array') {
            return $this->em->getRepository(User::class)->findOneBy(['apiToken' => $credentials]);
        }

        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $credentials['email']]);


        if (!$user) {
            throw new CustomUserMessageAuthenticationException('Nooooooooo!!!!!!');
        }

        $id = $user->getId();

        $this->user = $this->em->createQueryBuilder()->select('u')
            ->from(User::class, 'u')
            ->addSelect('a')
            ->where("u.id  = {$id}")
            ->leftJoin('u.articles', 'a')
            ->getQuery()
            ->getArrayResult()[0];


        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user): bool
    {
        $ok = false;

        if ($credentials === $user->getApiToken()) {
            $ok = true;
        }

        return $ok;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
    {
        $data = ['message' => 'something went wrong'];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
    {
        if($request->isXmlHttpRequest()) {
            $user = [
                'id' => $token->getUser()->getId(),
                'email' => $token->getUser()->getUsername(),
                'roles' => $token->getUser()->getRoles(),
                'articles' => $token->getUser()->getArticles()
            ];

            return new JsonResponse($user);
        }

        return new RedirectResponse($this->urlGenerator->generate('app_index'));
    }

    public function supportsRememberMe(): bool
    {
        return false;
    }
}
