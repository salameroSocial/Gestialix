import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

export default function MenuForm({ menu = {} }) {
    const [formData, setFormData] = useState({
        name: menu.name || '',
        description: menu.description || '',
        date: menu.date || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (menu.id) {
            Inertia.put(route('menus.update', menu.id), formData);
        } else {
            Inertia.post(route('menus.store'), formData);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{menu.id ? 'Editar Menú' : 'Añadir Menú'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="btn btn-primary">{menu.id ? 'Guardar Cambios' : 'Crear Menú'}</button>
            </form>
        </div>
    );
}
