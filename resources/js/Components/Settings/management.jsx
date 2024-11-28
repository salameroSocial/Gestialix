import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Input, Button, Label } from '@/Components/ui/Forms';
import { toast } from 'react-toastify';
import csrfFetch from '@/utils/csrfFetch';

export default function Settings() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        notifications_enabled: false,
        theme: 'light', // Default theme
    });
    const [loading, setLoading] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await csrfFetch('/api/user-profile/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error('Error actualizando perfil');
            const data = await response.json();
            toast.success('Perfil actualizado correctamente.');
            setForm(data); // Actualizar datos
        } catch (err) {
            toast.error('Ocurrió un error al actualizar el perfil.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Ajustes</h1>

            {/* Información del Usuario */}
            <div className="bg-white shadow sm:rounded-lg p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Información del Usuario</h2>
                <form onSubmit={updateProfile} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="notifications_enabled"
                                checked={form.notifications_enabled}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">Habilitar notificaciones</span>
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Preferencias */}
            <div className="bg-white shadow sm:rounded-lg p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Preferencias</h2>
                <div>
                    <Label htmlFor="theme">Tema</Label>
                    <select
                        id="theme"
                        name="theme"
                        value={form.theme}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                    </select>
                </div>
            </div>

            {/* Seguridad */}
            <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Seguridad</h2>
                <Button onClick={() => Inertia.visit('/password/reset')}>
                    Cambiar Contraseña
                </Button>
            </div>

            {/* Otros */}
            <div className="mt-8 text-sm text-gray-500 text-center">
                <p>
                    <a href="/privacy-policy" className="text-blue-500 hover:underline">
                        Política de Privacidad
                    </a>{' '}
                    |{' '}
                    <a href="/terms-of-service" className="text-blue-500 hover:underline">
                        Términos de Servicio
                    </a>
                </p>
            </div>
        </div>
    );
}
