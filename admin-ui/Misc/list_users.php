<?php
require_once './app/Config/db.php';

$users = $pdo->query("
    SELECT users.id, users.name, users.email, roles.name AS role_name
    FROM users
    LEFT JOIN model_has_roles ON users.id = model_has_roles.model_id
    LEFT JOIN roles ON model_has_roles.role_id = roles.id
")->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Usuarios y Roles</title>
    <link rel="stylesheet" href="css/admin.css">
</head>

<body>
    <h1>Usuarios y Roles</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td><?= htmlspecialchars($user['name']) ?></td>
                    <td><?= htmlspecialchars($user['email']) ?></td>
                    <td><?= htmlspecialchars($user['role_name'] ?? 'Sin Rol') ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>

</html>