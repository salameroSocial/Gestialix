<?php
// app/Models/Role.php

require_once __DIR__ . '/../config/db.php';

class Role
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM roles");
        return $stmt->fetchAll();
    }

    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM roles WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function create($name, $guardName)
    {
        $stmt = $this->pdo->prepare("INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())");
        return $stmt->execute([$name, $guardName]);
    }

    public function update($id, $name, $guardName)
    {
        $stmt = $this->pdo->prepare("UPDATE roles SET name = ?, guard_name = ?, updated_at = NOW() WHERE id = ?");
        return $stmt->execute([$name, $guardName, $id]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM roles WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
