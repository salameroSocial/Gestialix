<form action="?route=roles/update" method="POST">
    <input type="hidden" name="id" value="<?= $role['id'] ?>">

    <label>Nombre del Rol:</label>
    <input type="text" name="name" value="<?= $role['name'] ?>" required>

    <label>Permisos:</label>
    <?php foreach ($permissions as $permission): ?>
        <div>
            <input type="checkbox" name="permissions[]" value="<?= $permission['id'] ?>"
                <?= in_array($permission['id'], $rolePermissions) ? 'checked' : '' ?>>
            <?= $permission['name'] ?>
        </div>
    <?php endforeach; ?>

    <button type="submit">Actualizar</button>
</form>