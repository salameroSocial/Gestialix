import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// Registrar el idioma español
registerLocale("es", es);

const DataSelector = ({ currentDay, changeDate, handleDayChange }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        handleDayChange(formattedDate);
        setIsCalendarOpen(false);
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // Excluir sábados y domingos
    };

    return (
        <div className="flex items-center space-x-4">
            {/* Botón para disminuir fecha */}
            <button
                onClick={() => changeDate(-1)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Selector de fecha */}
            <div className="relative">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                >
                    <Calendar className="text-blue-500 dark:text-blue-400" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                        {new Date(currentDay).toLocaleDateString('es-ES')}
                    </span>
                </div>

                {/* Calendario */}
                {isCalendarOpen && (
                    <div className="absolute mt-2 z-50">
                        <DatePicker
                            selected={new Date(currentDay)}
                            onChange={handleDateChange}
                            inline
                            filterDate={isWeekday}
                            locale="es"
                            className="react-datepicker"
                        />
                    </div>
                )}
            </div>

            {/* Botón para aumentar fecha */}
            <button
                onClick={() => changeDate(1)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
        </div>
    );
};

export default DataSelector;
