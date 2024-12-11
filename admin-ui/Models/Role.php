<?php
class Role
{
    private $db;

    public function __construct()
    {
        $config = require __DIR__ . '/../config/database.php';
        $this->db = new PDO(
            "mysql:host={$config['host']};dbname={$config['dbname']}",
            $config['username'],
            $config['password']
        );
    }

    public function getAllRoles()
    {
        $stmt = $this->db->query("SELECT * FROM roles");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createRole($data)
    {
        $stmt = $this->db->prepare("INSERT INTO roles (name) VALUES (:name)");
        return $stmt->execute(['name' => $data['name']]);
    }

    public function updateRole($id, $data)
    {
        $stmt = $this->db->prepare("UPDATE roles SET name = :name WHERE id = :id");
        return $stmt->execute(['name' => $data['name'], 'id' => $id]);
    }

    public function deleteRole($id)
    {
        $stmt = $this->db->prepare("DELETE FROM roles WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
