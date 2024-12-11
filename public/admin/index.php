<?php
// Iniciar sesión
// session_start();

// Incluir configuración de autenticación y base de datos
require_once __DIR__ . '/../../admin-ui/Config/auth.php';
require_once __DIR__ . '/../../admin-ui/Config/database.php';

// Cargar rutas
require_once __DIR__ . '/../../admin-ui/routes/web.php';
