<?php
require_once __DIR__ . '/../models/Role.php';

class RoleController
{
    private $role;

    public function __construct()
    {
        $this->role = new Role();
    }

    public function index()
    {
        $roles = $this->role->getAllRoles();
        require __DIR__ . '/../views/roles/index.php';
    }

    public function create()
    {
        require __DIR__ . '/../views/roles/create.php';
    }

    public function store($data)
    {
        $this->role->createRole($data);
        header('Location: /admin-ui/public/roles');
    }

    public function edit($id)
    {
        $role = $this->role->getAllRoles($id);
        require __DIR__ . '/../views/roles/edit.php';
    }

    public function update($id, $data)
    {
        $this->role->updateRole($id, $data);
        header('Location: /admin-ui/public/roles');
    }

    public function delete($id)
    {
        $this->role->deleteRole($id);
        header('Location: /admin-ui/public/roles');
    }
    public function listRoles()
    {
        $roles = $this->role->all();
        include __DIR__ . '/../Views/roles/list_roles.php';
    }
}


// namespace Admin\Controllers;

// require_once __DIR__ . '/../Models/Role.php';
// require_once __DIR__ . '/../Models/User.php';

// use Admin\Models\Role;

// class RoleController
// {
//     private $roleModel;

//     public function __construct()
//     {
//         $this->roleModel = new Role();
//     }

//     // Listar roles
//     public function listRoles()
//     {
//         $roles = $this->roleModel->all();
//         include __DIR__ . '/../Views/roles/list_roles.php';
//     }

//     // Mostrar formulario para crear un rol
//     public function showCreateForm()
//     {
//         include __DIR__ . '/../Views/roles/create_role.php';
//     }

//     // Crear un nuevo rol
//     public function create()
//     {
//         $name = $_POST['name'];
//         $this->roleModel->create($name);

//         header('Location: /admin/roles');
//         exit;
//     }

//     // Mostrar formulario para editar un rol
//     public function showEditForm($id)
//     {
//         $role = $this->roleModel->findById($id);
//         include __DIR__ . '/../Views/roles/edit_role.php';
//     }

//     // Actualizar un rol
//     public function update($id)
//     {
//         $name = $_POST['name'];
//         $this->roleModel->update($id, $name);

//         header('Location: /admin/roles');
//         exit;
//     }

//     // Eliminar un rol
//     public function delete($id)
//     {
//         $this->roleModel->delete($id);

//         header('Location: /admin/roles');
//         exit;
//     }

//     // Mostrar formulario para asignar roles a un usuario
//     public function showAssignForm($userId)
//     {
//         $roles = $this->roleModel->all();
//         $userRoles = $this->roleModel->getUserRoles($userId);

//         include __DIR__ . '/../Views/roles/assign_role.php';
//     }

//     // Asignar rol a un usuario
//     public function assignRole()
//     {
//         $userId = $_POST['user_id'];
//         $roleId = $_POST['role_id'];
//         $this->roleModel->assignRoleToUser($userId, $roleId);

//         header('Location: /admin/users/' . $userId . '/roles');
//         exit;
//     }

//     // Desasignar rol de un usuario
//     public function removeRole()
//     {
//         $userId = $_POST['user_id'];
//         $roleId = $_POST['role_id'];
//         $this->roleModel->removeRoleFromUser($userId, $roleId);

//         header('Location: /admin/users/' . $userId . '/roles');
//         exit;
//     }
// }
