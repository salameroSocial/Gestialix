<?php

namespace Admin\Controllers;

require_once __DIR__ . '/../Models/User.php';

use Admin\Models\User;

class LoginController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    // Mostrar formulario de inicio de sesión
    public function showLoginForm()
    {
        include __DIR__ . '/../Views/auth/login.php';
    }

    // Procesar inicio de sesión
    public function login()
    {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $user = $this->userModel->findByEmail($email);

        if ($user && password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            header('Location: /admin/dashboard');
            exit;
        }

        echo "Credenciales inválidas.";
    }

    // Cerrar sesión
    public function logout()
    {
        session_start();
        session_destroy();
        header('Location: /admin/login');
        exit;
    }
}
