import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditStudentModal({ isOpen, onClose, onSave, initialData, title, fields }) {
    const [formState, setFormState] = useState(initialData || {});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormState(initialData || {});
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState({
            ...formState,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formState.id) {
            toast.error('El ID del estudiante está ausente');
            return;
        }

        setIsSaving(true);

        try {
            await onSave(formState);
            toast.success('Datos del estudiante guardados correctamente');
        } catch (error) {
            toast.error(`Error al guardar los datos: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative z-10 bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
                <h4 className="text-lg font-semibold mb-4">{title || 'Editar Estudiante'}</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium">
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.type === 'checkbox' ? (
                                <input
                                    type="checkbox"
                                    name={field.name}
                                    checked={!!formState[field.name]}
                                    onChange={handleInputChange}
                                    className="mt-1"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formState[field.name] || ''}
                                    onChange={handleInputChange}
                                    placeholder={field.label}
                                    className="mt-1 p-2 border rounded w-full"
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSaving ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
