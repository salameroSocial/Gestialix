<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Roles</title>
</head>

<body>
    <h1>Gestión de Roles</h1>
    <a href="create.php">Crear Nuevo Rol</a><br>
    <a href="../index.php">Volver al inicio</a>
    <table border="1" cellpadding="10">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Guard</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($roles as $role): ?>
                <tr>
                    <td><?= htmlspecialchars($role['id']); ?></td>
                    <td><?= htmlspecialchars($role['name']); ?></td>
                    <td><?= htmlspecialchars($role['guard_name']); ?></td>
                    <td>
                        <a href="edit.php?id=<?= $role['id']; ?>">Editar</a>
                        <a href="delete.php?id=<?= $role['id']; ?>" onclick="return confirm('¿Estás seguro de eliminar este rol?');">Eliminar</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>

</html>