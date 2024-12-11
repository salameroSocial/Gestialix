<h1>Asignar Rol</h1>
<form action="/admin/roles/assign" method="POST">
    <input type="hidden" name="user_id" value="<?= $userId ?>">
    <label for="role_id">Seleccionar Rol:</label>
    <select name="role_id" id="role_id">
        <?php foreach ($roles as $role): ?>
            <option value="<?= $role['id'] ?>" <?= in_array($role, $userRoles) ? 'selected' : '' ?>>
                <?= htmlspecialchars($role['name']) ?>
            </option>
        <?php endforeach; ?>
    </select>
    <button type="submit">Asignar</button>
</form>