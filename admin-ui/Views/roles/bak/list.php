<?php include '../app/Views/layouts/header.php'; ?>

<h1>Gestión de Roles</h1>
<a href="?route=roles/create">Añadir Rol</a>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($roles as $role): ?>
            <tr>
                <td><?= $role['id'] ?></td>
                <td><?= $role['name'] ?></td>
                <td>
                    <a href="?route=roles/edit&id=<?= $role['id'] ?>">Editar</a>
                    <a href="?route=roles/delete&id=<?= $role['id'] ?>">Eliminar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<?php include '../app/Views/layouts/footer.php'; ?>