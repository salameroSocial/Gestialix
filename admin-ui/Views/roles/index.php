<h1>Roles</h1>
<a href="/admin-ui/public/roles/create">Crear nuevo rol</a>
<table>
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Acciones</th>
    </tr>
    <?php foreach ($roles as $role): ?>
    <tr>
        <td><?= $role['id'] ?></td>
        <td><?= $role['name'] ?></td>
        <td>
            <a href="/admin-ui/public/roles/edit?id=<?= $role['id'] ?>">Editar</a>
            <a href="/admin-ui/public/roles/delete?id=<?= $role['id'] ?>" onclick="return confirm('¿Estás seguro?')">Eliminar</a>
        </td>
    </tr>
    <?php endforeach; ?>
</table>
