<?php
require '../db.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    header('Location: index.php');
    exit();
}

// Obtener el rol actual
$stmt = $pdo->prepare("SELECT * FROM roles WHERE id = ?");
$stmt->execute([$id]);
$role = $stmt->fetch();

if (!$role) {
    header('Location: index.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $guardName = $_POST['guard_name'];

    $stmt = $pdo->prepare("UPDATE roles SET name = ?, guard_name = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$name, $guardName, $id]);

    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Rol</title>
</head>
<body>
    <h1>Editar Rol</h1>
    <form action="edit.php?id=<?= $role['id']; ?>" method="POST">
        <label for="name">Nombre del Rol:</label>
        <input type="text" id="name" name="name" value="<?= htmlspecialchars($role['name']); ?>" required>
        <label for="guard_name">Guard Name:</label>
        <input type="text" id="guard_name" name="guard_name" value="<?= htmlspecialchars($role['guard_name']); ?>" required>
        <button type="submit">Guardar Cambios</button>
    </form>
    <a href="index.php">Volver a la Lista</a>
</body>
</html>
