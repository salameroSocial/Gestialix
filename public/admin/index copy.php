<?php
session_start();
require_once './app/Config/db.php';

// Verificar si el usuario tiene sesión activa y rol de administrador
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Panel de Administración</title>
    <link rel="stylesheet" href="css/admin.css">
</head>

<body>
    <h1>Bienvenido, <?= htmlspecialchars($_SESSION['user']['username']); ?> 👋</h1>

    <nav>
        <ul>
            <li><a href="/admin/roles/index.php">Registrar Usuario</a></li>
            <li><a href="assign_role.php">Asignar Roles</a></li>
            <li><a href="list_users.php">Listar Usuarios y Roles</a></li>
            <li><a href="manage_roles_permissions.php">Gestionar Roles y Permisos</a></li>
            <li><a href="logout.php">Cerrar Sesión</a></li>
        </ul>
    </nav>

    <p>Usa las opciones de arriba para gestionar tu plataforma. 😊</p>
</body>

</html>


<?php
// Iniciar sesión
// session_start();

// Incluir configuración de autenticación y base de datos
require_once __DIR__ . '/../../admin-ui/Config/auth.php';
require_once __DIR__ . '/../../admin-ui/Config/database.php';

// Cargar rutas
require_once __DIR__ . '/../../admin-ui/routes/web.php';