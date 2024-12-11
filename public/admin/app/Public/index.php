<?php
require __DIR__ . '/../Controllers/RoleController.php';
require __DIR__ . '/../Config/db.php';

$controller = new RoleController($pdo);

$action = $_GET['action'] ?? 'index';
$id = $_GET['id'] ?? null;

switch ($action) {
    case 'create':
        $controller->create();
        break;
    case 'edit':
        $controller->edit($id);
        break;
    case 'delete':
        $controller->delete($id);
        break;
    case 'index':
    default:
        $controller->index();
        break;
}
