<?php

namespace Admin\Middleware;

class AuthMiddleware
{
    public static function handle($callback)
    {
        session_start();

        if (!isset($_SESSION['user_id'])) {
            header('Location: /admin/login');
            exit;
        }

        call_user_func($callback);
    }
}
