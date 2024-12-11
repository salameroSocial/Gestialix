<?php

namespace App\Controllers;

use App\Models\Permission;

class PermissionController
{
    public function index()
    {
        $permissions = (new Permission())->getAll();
        return $this->render('permissions/list', ['permissions' => $permissions]);
    }

    public function create()
    {
        return $this->render('permissions/create');
    }

    public function edit()
    {
        $id = $_GET['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            return "ID no proporcionado.";
        }

        $permission = (new Permission())->findById($id);

        return $this->render('permissions/edit', ['permission' => $permission]);
    }

    private function render($view, $data = [])
    {
        extract($data);
        ob_start();
        require "../app/Views/$view.php";
        return ob_get_clean();
    }
}
