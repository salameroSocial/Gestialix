<?php include '../app/Views/layouts/header.php'; ?>

<h1>Gestión de Usuarios</h1>
<a href="?route=users/create">Añadir Usuario</a>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($users as $user): ?>
            <tr>
                <td><?= $user['id'] ?></td>
                <td><?= $user['name'] ?></td>
                <td><?= $user['email'] ?></td>
                <td>
                    <a href="?route=users/edit&id=<?= $user['id'] ?>">Editar</a>
                    <a href="?route=users/delete&id=<?= $user['id'] ?>">Borrar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<?php include '../app/Views/layouts/footer.php'; ?>