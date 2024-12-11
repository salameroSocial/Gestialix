<?php

class User
{
    private $db;

    // Constructor: Conexión a la base de datos
    public function __construct()
    {
        // Cargar configuración de la base de datos
        $configPath = __DIR__ . '/../config/database.php';
        if (!file_exists($configPath)) {
            throw new Exception("Error: El archivo de configuración de la base de datos no existe.");
        }

        $config = require $configPath;

        if (!is_array($config)) {
            throw new Exception("Error: La configuración de la base de datos no se cargó correctamente.");
        }

        // Crear la conexión PDO
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
            $this->db = new PDO(
                $dsn,
                $config['username'],
                $config['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]
            );
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }


    // Obtener todos los usuarios
    public function getAllUsers()
    {
        $stmt = $this->db->query("SELECT * FROM users");
        return $stmt->fetchAll();
    }

    // Obtener un usuario por ID
    public function getUserById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    // Crear un nuevo usuario
    public function createUser($data)
    {
        $stmt = $this->db->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
        $stmt->execute([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
        ]);
        return $this->db->lastInsertId();
    }

    // Actualizar un usuario existente
    public function updateUser($id, $data)
    {
        $fields = [];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
        }
        $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $data['id'] = $id;
        return $stmt->execute($data);
    }

    // Eliminar un usuario
    public function deleteUser($id)
    {
        $stmt = $this->db->prepare("DELETE FROM users WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    // Asignar un rol a un usuario
    public function assignRole($userId, $roleId)
    {
        $stmt = $this->db->prepare("INSERT INTO model_has_roles (role_id, model_id, model_type) VALUES (:role_id, :model_id, 'App\\Models\\User')");
        return $stmt->execute(['role_id' => $roleId, 'model_id' => $userId]);
    }
}
