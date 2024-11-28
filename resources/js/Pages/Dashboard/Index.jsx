import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar, Users, Utensils, DollarSign, LogOut } from 'lucide-react'
import { Inertia } from '@inertiajs/inertia'
import { Button } from '@/Components/ui/Buttons'
import { Charts, StudentRegistrationsChart } from '@/Components/Dashboard/Charts'
import AppLayout from '@/Layouts/AppLayout'

// Datos de ejemplo para el gráfico de asistencia
const menuData = [
    { day: 'Lunes', students: 120 },
    { day: 'Martes', students: 150 },
    { day: 'Miércoles', students: 200 },
    { day: 'Jueves', students: 180 },
    { day: 'Viernes', students: 190 },
]

// Componente Card
const Card = ({ title, value, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
        <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Icon className="h-8 w-8 text-blue-500" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
)

// Componente Button
// const Button = ({ children, onClick, className }) => (
//     <button
//         className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
//         onClick={onClick}
//     >
//         {children}
//     </button>
// )

export default function Dashboard() {
    const [currentDate] = useState(new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

    const handleLogout = () => {
        console.log('Cerrando sesión...');
        Inertia.post('/logout') // Usar Inertia para cerrar sesión
    }

    return (
        <AppLayout >
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-400">


                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 md:text-center">
                    <div className="px-4 py-6 sm:px-0 text-center">
                        <h2 className='text-4xl font-semibold text-gray-700 dark:text-gray-200'>Menu Principal</h2><br />
                        {/* <Button link={route("inicio")} text={"Inicio"} className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"> */}
                        {/* </Button> */}
                    </div>
                    <hr className='my-6' />
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <Card title="Estudiantes Hoy" value="180" icon={Users} />
                            <Card title="Menús Servidos" value="175" icon={Utensils} />
                            <Card title="Ingresos Hoy" value="€540" icon={DollarSign} />
                            <Card title="Próximo Evento" value="15 Mayo" icon={Calendar} />
                        </div>

                        {/* Gráfico de Asistencia */}
                        <StudentRegistrationsChart menuData={menuData} />
                        <hr className='my-6' />
                        <Charts menuData={menuData} />
                        <hr className='my-6' />

                        {/* Menú y Próximos Eventos */}
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Menú de Hoy</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <Utensils className="h-5 w-5 text-blue-500 mr-2" />
                                        <span>Ensalada César</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Utensils className="h-5 w-5 text-blue-500 mr-2" />
                                        <span>Pollo al Horno con Patatas</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Utensils className="h-5 w-5 text-blue-500 mr-2" />
                                        <span>Fruta de Temporada</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Próximos Eventos</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                        <span>15 Mayo - Día de la Nutrición</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                        <span>22 Mayo - Menú Internacional</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                        <span>1 Junio - Inicio Menú de Verano</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    )
}
