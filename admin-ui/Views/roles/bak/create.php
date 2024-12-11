<form action="?route=roles/store" method="POST">
    <label>Nombre del Rol:</label>
    <input type="text" name="name" required>

    <label>Permisos:</label>
    <?php foreach ($permissions as $permission): ?>
        <div>
            <input type="checkbox" name="permissions[]" value="<?= $permission['id'] ?>">
            <?= $permission['name'] ?>
        </div>
    <?php endforeach; ?>

    <button type="submit">Guardar</button>
</form>