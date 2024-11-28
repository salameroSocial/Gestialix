import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Utensils, Users } from 'lucide-react';
import { Button } from '@/Components/ui/Buttons';
import Footer from '@/Components/ui/footer';
import Logo from '@/Components/ui/Logo';
import WordSlider from '@/Components/ui/WordSlider';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Logo showText={false} sizeW={10} sizeH={10} />
                            <h1 className="ml-4 text-2xl sm:text-3xl font-bold text-gray-700">
                                Gestialix
                            </h1>
                        </div>

                        {/* Links */}
                        <div className="flex items-center space-x-4 sm:space-x-6">
                            <a
                                href="/login"
                                className="text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Iniciar sesión
                            </a>
                            <Button
                                link="/register"
                                text="Regístrate"
                                className="px-5 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                            />
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <motion.div
                    className="relative bg-gradient-to-r from-green-600 to-blue-500 py-16 sm:py-24 text-white text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl sm:text-5xl sm:p-0 p-2 md:text-6xl font-extrabold">
                        Simplifica la Gestión de tu{" "}
                        <WordSlider
                            words={["Colegio", "Instituto", "Universidad", "Comedor"]}
                            interval={3000}
                        />
                    </h1>
                    <p className="mt-4 text-lg p-2 sm:p-0 sm:text-xl max-w-2xl mx-auto">
                        Una plataforma intuitiva y eficiente para organizar clases, gestionar
                        estudiantes y generar informes para optimizar los recursos de tu
                        comedor.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Button
                            link="tel:662907258"
                            text="Solicita una demo"
                            className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 rounded-md"
                        />
                        <Button
                            text="Ver Más"
                            variant="outline"
                            className="px-6 py-3 text-lg text-green-600 border border-green-600 hover:bg-green-100 rounded-md"
                        />
                    </div>
                </motion.div>

                {/* Features Section */}
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Todo lo que necesitas para tu comedor
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Desde el control de asistencia hasta la planificación de menús, Gestialix tiene todo cubierto.
                        </p>

                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Users,
                                    title: "Control de Estudiantes",
                                    description:
                                        "Administra fácilmente la información de tus estudiantes y sus necesidades específicas.",
                                },
                                {
                                    icon: Utensils,
                                    title: "Planificación de Menús",
                                    description:
                                        "Consulta menús balanceados considerando intolerancias y preferencias alimenticias.",
                                },
                                {
                                    icon: Check,
                                    title: "Generación de Informes",
                                    description:
                                        "Obtén reportes mensuales detallados listos para enviar a las autoridades educativas.",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-50 rounded-lg shadow flex flex-col items-center text-center"
                                >
                                    <div className="flex justify-center items-center h-12 w-12 bg-green-500 text-white rounded-full">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                                    <p className="mt-2 text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-green-700 to-green-500 py-16 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        ¿Listo para transformar la gestión de tu comedor?
                    </h2>
                    <p className="mt-4 text-lg p-2 sm:p-0 sm:text-xl max-w-2xl mx-auto">
                        Comienza a usar Gestialix hoy mismo y simplifica tus operaciones como nunca antes.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Button
                            text={"Solicita una demo"}
                            className="px-6 py-3 text-lg bg-white text-green-600 border border-white hover:bg-green-100 rounded-md"
                        />
                        <Button
                            text={"Contáctanos"}
                            variant="outline"
                            className="px-6 py-3 text-lg text-white border border-white hover:bg-green-800 rounded-md"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}




