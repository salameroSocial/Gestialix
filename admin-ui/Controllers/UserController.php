<?php
require_once __DIR__ . '/../Models/User.php';

class UserController
{
    private $userModel;

    public function __construct()
    {
        global $pdo; // Usa la conexión global de PDO
        $this->userModel = new User($pdo);
    }

    public function home()
    {
        require_once __DIR__ . '/../Views/admin/index.php';
    }

    public function listUsers()
    {
        $users = $this->userModel->getAllUsers();
        require_once __DIR__ . '/../Views/admin/list.php';
    }
}
