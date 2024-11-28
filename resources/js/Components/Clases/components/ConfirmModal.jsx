// components/ConfirmModal.js
import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fondo oscuro semitransparente */}
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onCancel}  // Cierra el modal al hacer clic fuera
            ></div>

            {/* Contenido del modal */}
            <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-lg z-10">
                <h4 className="text-lg font-semibold mb-4">Confirmación</h4>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onCancel();  // Cierra el modal después de confirmar
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;



    // // components/ClassItem.js
    // import React, { useState } from 'react';
    // import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from 'lucide-react';
    // import StudentTable from './StudentTable';
    // import ConfirmModal from './ConfirmModal';

    // const ClassItem = ({ classData, onEdit, onDelete }) => {
    //     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    //     return (
    //         <div className="mb-4">
    //             <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
    //                 <div className="flex items-center">
    //                     <button onClick={() => onToggle(classData.id)} className="mr-2">
    //                         {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    //                     </button>
    //                     <h3 className="text-lg font-semibold">{classData.nombre}</h3>
    //                 </div>
    //                 <div className="flex space-x-2">
    //                     <button onClick={() => onEdit(classData)} className="p-1 hover:bg-gray-100 rounded-full">
    //                         <Edit className="w-5 h-5 text-blue-500" />
    //                     </button>
    //                     <button onClick={() => setIsDeleteModalOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
    //                         <Trash2 className="w-5 h-5 text-red-500" />
    //                     </button>
    //                 </div>
    //             </div>

    //             {/* Modal de Confirmación */}
    //             <ConfirmModal
    //                 isOpen={isDeleteModalOpen}
    //                 onConfirm={() => onDelete(classData.id)}
    //                 onCancel={() => setIsDeleteModalOpen(false)}
    //                 message="¿Estás seguro de que quieres eliminar esta clase?"
    //             />
    //         </div>
    //     );
    // };

    // export default ClassItem;
