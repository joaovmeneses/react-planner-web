import React, { useState } from 'react';

interface ModalProps {
    onClose: () => void;
    onSubmit: (horasObjetivo: number) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit }) => {
    const [horasObjetivo, setHorasObjetivo] = useState<number>(0);

    const handleSubmit = () => {
        onSubmit(horasObjetivo);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Adicionar Horas Objetivo</h2>
                <input
                    type="number"
                    value={horasObjetivo}
                    onChange={(e) => setHorasObjetivo(Number(e.target.value))}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
