import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function EditUser({ user, roles }) {
    const { data, setData, put, errors } = useForm({
        roles: user.roles.map((role) => role.name),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Roles</label>
                    {roles.map((role) => (
                        <div key={role.id}>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={role.name}
                                    checked={data.roles.includes(role.name)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData('roles', [...data.roles, role.name]);
                                        } else {
                                            setData('roles', data.roles.filter((r) => r !== role.name));
                                        }
                                    }}
                                />
                                <span>{role.name}</span>
                            </label>
                        </div>
                    ))}
                    {errors.roles && <span className="text-red-500">{errors.roles}</span>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Guardar Cambios
                </button>
                <Link
                    href="/admin/users"
                    className="ml-4 text-gray-500 hover:underline"
                >
                    Cancelar
                </Link>
            </form>
        </div>
    );
}
