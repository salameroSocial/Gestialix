<?php
require_once __DIR__ . '/../Controllers/UserController.php';
require_once __DIR__ . '/../Controllers/RoleController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/admin':
    case '/admin/index':
        $userController = new UserController();
        $userController->home();
        break;

    case '/admin/users':
        $userController = new UserController();
        $userController->listUsers();
        break;

    case '/admin/roles':
        $roleController = new RoleController();
        $roleController->index();
        break;

    default:
        http_response_code(404);
        echo "Página no encontrada";
        break;
}

// require_once __DIR__ . '/../controllers/UserController.php';
// require_once __DIR__ . '/../controllers/RoleController.php';

// $userController = new UserController();
// $roleController = new RoleController();

// // Rutas de usuarios
// if ($_SERVER['REQUEST_URI'] === '/admin-ui/public/users' && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     $userController->index();
// } elseif ($_SERVER['REQUEST_URI'] === '/admin-ui/public/users/create' && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     $userController->create();
// } elseif ($_SERVER['REQUEST_URI'] === '/admin-ui/public/users/store' && $_SERVER['REQUEST_METHOD'] === 'POST') {
//     $userController->store($_POST);
// }

// // Rutas de roles
// if ($_SERVER['REQUEST_URI'] === '/admin-ui/public/roles' && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     $roleController->index();
// } elseif ($_SERVER['REQUEST_URI'] === '/admin-ui/public/roles/create' && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     $roleController->create();
// } elseif ($_SERVER['REQUEST_URI'] === '/admin-ui/public/roles/store' && $_SERVER['REQUEST_METHOD'] === 'POST') {
//     $roleController->store($_POST);
// }


// if ($_SERVER['REQUEST_URI'] === '/admin-ui/public/users' && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     $userController->index();
// } elseif ($_SERVER['REQUEST_URI'] === '/admin-ui/public/users/create' && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     $userController->create();
// } elseif ($_SERVER['REQUEST_URI'] === '/admin-ui/public/users/store' && $_SERVER['REQUEST_METHOD'] === 'POST') {
//     $userController->store($_POST);
// } elseif (strpos($_SERVER['REQUEST_URI'], '/admin-ui/public/users/edit') !== false && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $params);
//     $userController->edit($params['id']);
// } elseif (strpos($_SERVER['REQUEST_URI'], '/admin-ui/public/users/update') !== false && $_SERVER['REQUEST_METHOD'] === 'POST') {
//     parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $params);
//     $userController->update($params['id'], $_POST);
// } elseif (strpos($_SERVER['REQUEST_URI'], '/admin-ui/public/users/delete') !== false && $_SERVER['REQUEST_METHOD'] === 'GET') {
//     parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $params);
//     $userController->delete($params['id']);
// }
