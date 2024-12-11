<?php
require '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $guardName = $_POST['guard_name'];

    $stmt = $pdo->prepare("INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())");
    $stmt->execute([$name, $guardName]);

    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Rol</title>
</head>

<body>
    <h1>Crear Nuevo Rol</h1>
    <form action="create.php" method="POST">
        <label for="name">Nombre del Rol:</label>
        <input type="text" id="name" name="name" required>
        <label for="guard_name">Guard Name:</label>
        <input type="text" id="guard_name" name="guard_name" required>
        <button type="submit">Crear Rol</button>
    </form>
    <a href="index.php">Volver a la Lista</a>
</body>

</html>