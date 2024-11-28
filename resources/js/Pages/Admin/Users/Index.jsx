import React from 'react';
import { Link } from '@inertiajs/react';

export default function UserIndex({ users }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
            <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Roles</th>
                        <th className="p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.roles.map((role) => role.name).join(', ')}</td>
                            <td className="p-3">
                                <Link
                                    href={`/admin/users/${user.id}/edit`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
