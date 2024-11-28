import { usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const NavBar = () => {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between">
                    <InertiaLink href="/" className="text-white">Inicio</InertiaLink>
                    <div className="flex space-x-4">
                        {auth.user?.can_access_dashboard && (
                            <InertiaLink href="/dashboard" className="text-white">Dashboard</InertiaLink>
                        )}
                        <InertiaLink href="/profile" className="text-white">Perfil</InertiaLink>
                        <InertiaLink href="/settings" className="text-white">Ajustes</InertiaLink>
                        <InertiaLink href="/logout" method="post" as="button" className="text-white">Cerrar Sesión</InertiaLink>
                    </div>
                </div>
            </nav>
        </ AppLayout >
    );
};
