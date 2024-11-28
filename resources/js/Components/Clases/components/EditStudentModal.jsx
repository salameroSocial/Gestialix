import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function EditStudentModal({ isOpen, onClose, onSave, initialData, title, fields }) {
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






import Select from 'react-select';

// Opciones para el campo de selección múltiple
const intoleranciaOptions = [
    { value: 'no_carne', label: 'No Carne' },
    { value: 'no_cerdo', label: 'No Cerdo' },
    { value: 'celiaco', label: 'Celíaco' },
    { value: 'lactosa', label: 'Intolerante a la Lactosa' },
];

const EditModal = ({ isOpen, onClose, onSave, title, initialData, fields }) => {
    const [formData, setFormData] = useState(initialData);

    // Sincronizar estado del formulario con datos iniciales
    useEffect(() => {
        setFormData(initialData || {}); // Aseguramos que `formData` nunca sea null o undefined
    }, [initialData]);

    // Manejador para cambios en campos de texto o checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Manejador para cambios en el campo de selección múltiple
    const handleSelectChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            intolerancia_religion: selectedOptions.map((option) => option.value),
        }));
    };

    // Enviar datos al guardar
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{title}</h3>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.name === 'intolerancia_religion' ? (
                                // Campo de selección múltiple
                                <Select
                                    isMulti
                                    name="intolerancia_religion"
                                    options={intoleranciaOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={intoleranciaOptions.filter((option) =>
                                        formData?.intolerancia_religion?.includes(option.value)
                                    )}
                                    onChange={handleSelectChange}
                                />
                            ) : field.type === 'checkbox' ? (
                                // Campo de checkbox
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    name={field.name}
                                    checked={formData[field.name] || false}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                            ) : (
                                // Campo de texto
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            )}
                        </div>
                    ))}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;











