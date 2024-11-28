import React from "react"
import { ArrowLeft } from "lucide-react"
import { InnovativeButton } from "@/Components/ui/Buttons"
import { Inertia } from '@inertiajs/inertia';

// Button component
const Button = React.forwardRef(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${variant === "default"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : ""
                    }
        ${variant === "outline"
                        ? "border border-input hover:bg-accent hover:text-accent-foreground"
                        : ""
                    }
        ${className}`}
                ref={ref}
                {...props}
                href={props.href}
            />
        )
    }
)
Button.displayName = "Button"

// Card components
const Card = ({ className, ...props }) => (
    <div
        className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
        {...props}
    />
)
Card.displayName = "Card"

const CardHeader = ({ className, ...props }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={`text-sm text-muted-foreground ${className}`}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = ({ className, ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter = ({ className, ...props }) => (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
)
CardFooter.displayName = "CardFooter"

// Separator component
const Separator = ({ className, ...props }) => (
    <div
        className={`shrink-0 bg-border h-[1px] w-full ${className}`}
        {...props}
    />
)
Separator.displayName = "Separator"

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
            <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
                <InnovativeButton onClick={() => Inertia.visit('/inicio')}>
                    Volver al inicio
                </InnovativeButton>
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Términos de Servicio</h1>

                    <p className="text-gray-600 mb-4">
                        Estos términos de servicio describen las reglas y regulaciones para el uso de nuestra aplicación y servicios.
                        Al acceder o utilizar el servicio, aceptas estar sujeto a estos términos.
                    </p>

                    <hr className="my-6" />

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Condiciones Generales</h2>
                        <p className="text-gray-600">
                            Al utilizar nuestros servicios, declaras que tienes al menos la mayoría de edad en tu jurisdicción o
                            que cuentas con el consentimiento de un tutor legal.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Está prohibido utilizar nuestros servicios para actividades ilegales, violar derechos de terceros
                            o distribuir contenido dañino.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso del Servicio</h2>
                        <p className="text-gray-600">
                            No puedes utilizar este servicio para cualquier propósito no autorizado. Esto incluye, entre otros,
                            el acceso no autorizado a nuestros sistemas o la distribución de contenido no permitido.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Propiedad Intelectual</h2>
                        <p className="text-gray-600">
                            Todo el contenido disponible en nuestra aplicación, incluidos textos, imágenes, logotipos y código,
                            es propiedad exclusiva de nuestra empresa o de nuestros socios, y está protegido por las leyes de derechos de autor.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cancelación y Terminación</h2>
                        <p className="text-gray-600">
                            Nos reservamos el derecho de suspender o cancelar tu acceso al servicio si violas estos términos.
                            En caso de cancelación, perderás el acceso a cualquier contenido o información asociada con tu cuenta.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitación de Responsabilidad</h2>
                        <p className="text-gray-600">
                            En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso
                            o la imposibilidad de usar nuestros servicios.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cambios en los Términos</h2>
                        <p className="text-gray-600">
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será
                            notificado a través de la aplicación o por correo electrónico. Es tu responsabilidad revisar estos términos periódicamente.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contacto</h2>
                        <p className="text-gray-600">
                            Si tienes alguna pregunta sobre estos términos, puedes contactarnos en <a href="mailto:soporte@gestialix.com" className="text-blue-500 hover:underline">soporte@gestialix.com</a>.
                        </p>
                    </section>

                    <hr className="my-6" />

                    <div className="text-sm text-gray-500 text-center">
                        <p>&copy; {new Date().getFullYear()} Gestialix. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
