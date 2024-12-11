<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title><?= $title ?? 'Gestialix - Admin' ?></title>
    <link rel="stylesheet" href="/css/admin.css">
</head>

<body>
    <!-- Header -->
    <header>
        <h1>Gestialix - Panel de Administración</h1>
        <nav>
            <ul>
                <li><a href="/admin">Inicio</a></li>
                <li><a href="/admin/users">Usuarios</a></li>
                <li><a href="/admin/roles">Roles</a></li>
                <li><a href="/admin/logout.php">Cerrar Sesión</a></li>
            </ul>
        </nav>
    </header>

    <!-- Contenido dinámico -->
    <main>
        <?= $content ?? '' ?>
    </main>

</body>

</html>