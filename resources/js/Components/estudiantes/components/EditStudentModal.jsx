import React, { useState, useEffect } from "react";

export default function EditStudentModal({ isOpen, onClose, student, onSave }) {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        intolerancia_religion: "",
        beca: false,
    });

    // Cargar la información del estudiante cuando el modal se abra
    useEffect(() => {
        if (student) {
            setFormData({
                nombre: student.nombre || "",
                apellidos: student.apellidos || "",
                intolerancia_religion: student.intolerancia_religion || "",
                beca: student.beca || false,
            });
        }
    }, [student]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llama la función para guardar los cambios
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fondo oscuro */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Contenido del modal */}
            <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
                <h4 className="text-lg font-semibold mb-4">Editar Estudiante</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Apellidos</label>
                        <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Intolerancia/Religión
                        </label>
                        <input
                            type="text"
                            name="intolerancia_religion"
                            value={formData.intolerancia_religion}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="beca"
                                checked={formData.beca}
                                onChange={handleInputChange}
                            />
                            <span>Beca</span>
                        </label>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded bg-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
