<?php


namespace App\Tests\unit;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TestView extends WebTestCase
{
    /** @test */
    public function homePage()
    {
        $client = static::createClient();

        $response = $client->request('GET', '/');

        $this->assertResponseStatusCodeSame(302);

        $this->assertResponseRedirects('/login');
    }

    public function testCantPostEmptyForm()
    {
        $client = static::createClient();

        $response = $client->request('POST', '/login');

        $this->assertResponseStatusCodeSame(302);

        $this->assertResponseRedirects('/login');
    }

    public function testUserCanLoginIfRegistered()
    {
        $client = static::createClient();
        $userRepository = static::$container->get(UserRepository::class);

        $user = $userRepository->findOneByEmail('l.neveux@icloud.com');


        $client->loginUser($user);

        $client->request('GET', '/home');

        $this->assertResponseStatusCodeSame(200);

    }

    /**
     * TODO : Get csrf_token and manual login
     */

}
