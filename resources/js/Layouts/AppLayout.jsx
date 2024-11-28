import React, { useState, useEffect } from 'react';
import SidebarMenu from './SideBar';
import { fetchUserData } from '../api/userService';
import Spinner from '@/Components/ui/Spinner';

export default function AppLayout({ children }) {
    const [userData, setUserData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data); // Guarda los datos del usuario
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
                // Si hay un error, redirigir al login o manejarlo según tus necesidades
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (loading) {
        return <Spinner></Spinner>;
    }

    return (
        <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-300">
            <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userData={userData} />
            <div
                className={`transition-all duration-300 w-full ${isSidebarOpen ? 'sm:ml-64 md:ml-20 ml-0' : 'sm:ml-20 ml-0'
                    }`}
            >
                <header className="p-4 bg-white shadow-md">
                    {/* <h1 className="text-xl font-bold">Bienvenido, {userData.user.name}</h1> */}
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
}
