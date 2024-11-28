import { LogOut } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, Inertia } from '@inertiajs/inertia-react';


/**
 * Botón innovador con efectos de onda, partículas flotantes y borde brillante.
 *
 * @param {React.ReactNode} children Contenido del botón.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} onClick Función que se llama cuando se hace clic en el botón.
 * @returns {JSX.Element} Un botón con los efectos mencionados.
 */
export function InnovativeButton({ children, onClick }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    return (
        <button
            className="relative overflow-hidden px-6 py-3 group bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            aria-label={typeof children === 'string' ? children : 'Innovative button'}
        >
            {/* Texto del botón con efecto de elevación */}
            <span className={`relative z-10 transition-transform duration-200 ${isPressed ? 'transform translate-y-1' : ''}`}>
                {children}
            </span>

            {/* Efecto de onda al hacer clic */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className={`absolute inset-0 transform scale-0 transition-transform duration-300 ease-out ${isPressed ? 'scale-100' : ''} bg-white opacity-30`} />
            </span>

            {/* Partículas flotantes */}
            {isHovered && (
                <>
                    {[...Array(10)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </>
            )}

            {/* Borde brillante */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 animate-spin-slow" style={{ filter: 'blur(8px)' }} />
            </span>
        </button>
    );
};




/**
 * Componente de botón de perfil que despliega un menú desplegable
 * con enlaces a diferentes secciones de la aplicación.
 *
 * @returns {JSX.Element}
 */
export function ButtonProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Ref para el menú desplegable

    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => console.log('Sesión cerrada exitosamente'),
        });
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // useEffect para detectar clics fuera del menú
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false); // Cerrar el menú si se hace clic fuera de él
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <div onClick={toggleMenu} className="cursor-pointer">
                <img
                    src="/images/favicon.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
            </div>

            {isOpen && (
                <motion.div
                    ref={menuRef} // Asignar el ref al menú desplegable
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                    <ul className="py-1">
                        <li>
                            <Link
                                href="/inicio"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/user-profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/settings"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Configuración
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/logout"
                                method='post'
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Cerrar Sesión
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
}


/**
 * Renders a customizable button component with animation effects.
 *
 * @param {string} text - The default text displayed on the button.
 * @param {string} bgColor - The default background color of the button.
 * @param {string} hoverColor - The background color when the button is hovered.
 * @param {string} ringColor - The border color when the button is focused.
 * @param {string} type - The type of the button (e.g., button, submit).
 * @param {Function} onClick - Optional onClick event handler for the button.
 * @param {string} classNameProps - Additional class names for custom styling.
 */
export function ButtonForms({
    text = "Boton",       // Texto predeterminado del botón
    bgColor = "bg-green-600",   // Color de fondo predeterminado
    hoverColor = "bg-green-700", // Color al hacer hover
    ringColor = "ring-green-500", // Color del borde al hacer foco
    type = "button",             // Tipo del botón (button, submit, etc.)
    onClick,
    classNameProps                    // Evento onClick opcional
}) {
    return (
        <div className='flex justify-center'>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type={type}
                onClick={onClick}
                className={classNameProps}
            // className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${bgColor} hover:${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${ringColor}`}
            >
                {text}
            </motion.button>
        </div>
    );
}


const ButtonDos = React.forwardRef(({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
    }

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
    }

    const variantStyles = variants[variant]
    const sizeStyles = sizes[size]

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className} bg-black text-white`}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

ButtonDos.displayName = 'ButtonDos'




export function Button({ text, link, type }) {
    return (
        <a href={link} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {text}
            {text === "Cerrar sesión" && <LogOut className="h-4 w-4 mr-2 inline-block" />}
        </a>
    )
}