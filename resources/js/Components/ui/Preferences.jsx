import React, { useContext } from 'react';
import { ThemeContext } from '@/utils/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const PreferencesTab = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="p-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-lg">Tema {theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                    <button
                        onClick={toggleTheme}
                        className="flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="ml-2">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreferencesTab;
