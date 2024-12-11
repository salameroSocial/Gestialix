<?php
require_once './app/Config/db.php';

$error = null;
$success = null;

// Obtener usuarios y roles
$users = $pdo->query("SELECT id, name FROM users")->fetchAll();
$roles = $pdo->query("SELECT id, name FROM roles")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['user_id'];
    $roleId = $_POST['role_id'];

    try {
        // Asignar el rol al usuario
        $stmt = $pdo->prepare("INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES (?, 'App\\Models\\User', ?)");
        $stmt->execute([$roleId, $userId]);
        $success = "Rol asignado con éxito.";
    } catch (PDOException $e) {
        $error = "Error al asignar el rol: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Asignar Rol</title>
    <link rel="stylesheet" href="css/admin.css">
</head>

<body>
    <h1>Asignar Rol</h1>

    <?php if ($error): ?>
        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <?php if ($success): ?>
        <p style="color: green;"><?= htmlspecialchars($success) ?></p>
    <?php endif; ?>

    <form action="assign_role.php" method="POST">
        <label for="user_id">Usuario:</label>
        <select id="user_id" name="user_id" required>
            <option value="">Seleccione un usuario</option>
            <?php foreach ($users as $user): ?>
                <option value="<?= $user['id'] ?>"><?= htmlspecialchars($user['name']) ?></option>
            <?php endforeach; ?>
        </select>

        <label for="role_id">Rol:</label>
        <select id="role_id" name="role_id" required>
            <option value="">Seleccione un rol</option>
            <?php foreach ($roles as $role): ?>
                <option value="<?= $role['id'] ?>"><?= htmlspecialchars($role['name']) ?></option>
            <?php endforeach; ?>
        </select>

        <button type="submit">Asignar Rol</button>
    </form>
    <a href="index.php">Volver al inisio</a>
</body>

</html>