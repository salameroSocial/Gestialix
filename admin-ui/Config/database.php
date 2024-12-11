<?php
return [
    'host' => getenv('DB_HOST') ?: '127.0.0.1', // Host de la base de datos
    'dbname' => getenv('DB_DATABASE') ?: 'gestialix', // Nombre de la base de datos
    'username' => getenv('DB_USERNAME') ?: 'root', // Usuario de la base de datos
    'password' => getenv('DB_PASSWORD') ?: '', // Contraseña de la base de datos
    'charset' => 'utf8mb4', // Codificación para soporte extendido de caracteres
];
