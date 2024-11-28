import React from 'react';
import Logo from '@/Components/ui/Logo';
import ButtonProfile from '@/Components/ui/ButtonProfile';

export default function NavbarLayout({ children, title }) {
    const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const handleLogout = () => {
        console.log("Cerrar sesión");
    };

    return (
        <div className="bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Logo sizeW={10} sizeH={10} showText={false} />
                            <h1 className="ml-2 text-xl font-semibold text-gray-800">
                                {title}
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <p className="text-sm text-gray-500 mr-4">{currentDate}</p>
                            <ButtonProfile />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido */}
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
