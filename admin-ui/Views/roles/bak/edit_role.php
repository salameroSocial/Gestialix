<h1>Editar Rol</h1>
<form action="/admin/roles/update/<?= $role['id'] ?>" method="POST">
    <label for="name">Nombre del Rol:</label>
    <input type="text" id="name" name="name" value="<?= htmlspecialchars($role['name']) ?>" required>
    <button type="submit">Actualizar</button>
</form>