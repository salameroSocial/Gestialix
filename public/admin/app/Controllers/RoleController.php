<?php
// app/Controllers/RoleController.php

require_once __DIR__ . '/../Models/Role.php';

class RoleController
{
    private $roleModel;

    public function __construct($pdo)
    {
        $this->roleModel = new Role($pdo);
    }

    public function index()
    {
        $roles = $this->roleModel->getAll();
        require __DIR__ . '/../Views/roles/index.php';
    }

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $guardName = $_POST['guard_name'];
            $this->roleModel->create($name, $guardName);
            header('Location: /');
            exit();
        }

        require __DIR__ . '/../Views/roles/create.php';
    }

    public function edit($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $guardName = $_POST['guard_name'];
            $this->roleModel->update($id, $name, $guardName);
            header('Location: /');
            exit();
        }

        $role = $this->roleModel->getById($id);
        require __DIR__ . '/../Views/roles/edit.php';
    }

    public function delete($id)
    {
        $this->roleModel->delete($id);
        header('Location: /');
        exit();
    }
}
