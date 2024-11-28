import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function MenuIndex() {
    const { menus } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este menú?')) {
            Inertia.delete(route('menus.destroy', id));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Menús</h1>
            <Link href={route('menus.create')} className="btn btn-primary mb-4">Añadir Menú</Link>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map(menu => (
                            <tr key={menu.id}>
                                <td>{menu.name}</td>
                                <td>{menu.description}</td>
                                <td>{menu.date}</td>
                                <td>
                                    <Link href={route('menus.edit', menu.id)} className="btn btn-secondary mr-2">Editar</Link>
                                    <button onClick={() => handleDelete(menu.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
