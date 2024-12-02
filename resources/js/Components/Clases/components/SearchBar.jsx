import React from 'react';

export default function SearchBar({ searchInput, setSearchInput, filterOption, setFilterOption }) {
    return (
        <div className="flex items-center space-x-4 mb-4">
            {/* Input de búsqueda */}
            <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Buscar clases..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* Selector de filtro */}
            <select
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
            >
                <option value="nombre">Por Nombre</option>
                <option value="apellido">Por Apellido</option>
            </select>
        </div>
    );
}
