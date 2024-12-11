<?php
session_start();

// Verificar si el usuario tiene sesión activa
if (!isset($_SESSION['user'])) {
    header('Location: /admin/login.php');
    exit();
}

// Verificar si el usuario tiene el rol requerido
function requireRole($role)
{
    if ($_SESSION['user']['role'] !== $role) {
        header('Location: /admin/unauthorized.php');
        exit();
    }
}
