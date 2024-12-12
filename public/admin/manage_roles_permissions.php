<?php
require_once './app/Config/db.php';

$error = null;
$success = null;

// Obtener roles y permisos para mostrarlos
$roles = $pdo->query("SELECT * FROM roles")->fetchAll();
$permissions = $pdo->query("SELECT * FROM permissions")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['create_role'])) {
        // Crear un nuevo rol
        $roleName = $_POST['role_name'];
        try {
            $stmt = $pdo->prepare("INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES (?, 'web', NOW(), NOW())");
            $stmt->execute([$roleName]);
            $success = "Rol creado con éxito.";
        } catch (PDOException $e) {
            $error = "Error al crear el rol: " . $e->getMessage();
        }
    } elseif (isset($_POST['create_permission'])) {
        // Crear un nuevo permiso
        $permissionName = $_POST['permission_name'];
        try {
            $stmt = $pdo->prepare("INSERT INTO permissions (name, guard_name, created_at, updated_at) VALUES (?, 'web', NOW(), NOW())");
            $stmt->execute([$permissionName]);
            $success = "Permiso creado con éxito.";
        } catch (PDOException $e) {
            $error = "Error al crear el permiso: " . $e->getMessage();
        }
    } elseif (isset($_POST['assign_permission'])) {
        // Asignar un permiso a un rol
        $roleId = $_POST['role_id'];
        $permissionId = $_POST['permission_id'];
        try {
            $stmt = $pdo->prepare("INSERT INTO role_has_permissions (role_id, permission_id) VALUES (?, ?)");
            $stmt->execute([$roleId, $permissionId]);
            $success = "Permiso asignado al rol con éxito.";
        } catch (PDOException $e) {
            $error = "Error al asignar el permiso: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Gestionar Roles y Permisos</title>
    <link rel="stylesheet" href="css/admin.css">
</head>

<body>
    <h1>Gestionar Roles y Permisos</h1>

    <?php if ($error): ?>
        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <?php if ($success): ?>
        <p style="color: green;"><?= htmlspecialchars($success) ?></p>
    <?php endif; ?>

    <!-- Crear un nuevo rol -->
    <form action="manage_roles_permissions.php" method="POST">
        <h2>Crear Rol</h2>
        <label for="role_name">Nombre del Rol:</label>
        <input type="text" id="role_name" name="role_name" required>
        <button type="submit" name="create_role">Crear Rol</button>
    </form>

    <!-- Crear un nuevo permiso -->
    <form action="manage_roles_permissions.php" method="POST">
        <h2>Crear Permiso</h2>
        <label for="permission_name">Nombre del Permiso:</label>
        <input type="text" id="permission_name" name="permission_name" required>
        <button type="submit" name="create_permission">Crear Permiso</button>
    </form>

    <!-- Asignar un permiso a un rol -->
    <form action="manage_roles_permissions.php" method="POST">
        <h2>Asignar Permiso a Rol</h2>
        <label for="role_id">Rol:</label>
        <select id="role_id" name="role_id" required>
            <option value="">Seleccione un rol</option>
            <?php foreach ($roles as $role): ?>
                <option value="<?= $role['id'] ?>"><?= htmlspecialchars($role['name']) ?></option>
            <?php endforeach; ?>
        </select>

        <label for="permission_id">Permiso:</label>
        <select id="permission_id" name="permission_id" required>
            <option value="">Seleccione un permiso</option>
            <?php foreach ($permissions as $permission): ?>
                <option value="<?= $permission['id'] ?>"><?= htmlspecialchars($permission['name']) ?></option>
            <?php endforeach; ?>
        </select>

        <button type="submit" name="assign_permission">Asignar Permiso</button>
    </form>
    <a href="index.php">Volver al inicio</a>
</body>

</html>