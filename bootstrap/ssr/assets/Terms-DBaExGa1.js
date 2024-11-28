import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { I as InnovativeButton } from "./Buttons-D9lSxtz5.js";
import { Inertia } from "@inertiajs/inertia";
import "lucide-react";
import "framer-motion";
import "@inertiajs/inertia-react";
const Button = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background
        ${variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
        ${variant === "outline" ? "border border-input hover:bg-accent hover:text-accent-foreground" : ""}
        ${className}`,
        ref,
        ...props,
        href: props.href
      }
    );
  }
);
Button.displayName = "Button";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: `text-2xl font-semibold leading-none tracking-tight ${className}`,
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: `text-sm text-muted-foreground ${className}`,
    ...props
  }
));
CardDescription.displayName = "CardDescription";
function PrivacyPolicy() {
  (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(InnovativeButton, { onClick: () => Inertia.visit("/inicio"), children: "Volver al inicio" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-6", children: "Términos de Servicio" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Estos términos de servicio describen las reglas y regulaciones para el uso de nuestra aplicación y servicios. Al acceder o utilizar el servicio, aceptas estar sujeto a estos términos." }),
      /* @__PURE__ */ jsx("hr", { className: "my-6" }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "1. Condiciones Generales" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Al utilizar nuestros servicios, declaras que tienes al menos la mayoría de edad en tu jurisdicción o que cuentas con el consentimiento de un tutor legal." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Está prohibido utilizar nuestros servicios para actividades ilegales, violar derechos de terceros o distribuir contenido dañino." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "2. Uso del Servicio" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "No puedes utilizar este servicio para cualquier propósito no autorizado. Esto incluye, entre otros, el acceso no autorizado a nuestros sistemas o la distribución de contenido no permitido." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "3. Propiedad Intelectual" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Todo el contenido disponible en nuestra aplicación, incluidos textos, imágenes, logotipos y código, es propiedad exclusiva de nuestra empresa o de nuestros socios, y está protegido por las leyes de derechos de autor." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "4. Cancelación y Terminación" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nos reservamos el derecho de suspender o cancelar tu acceso al servicio si violas estos términos. En caso de cancelación, perderás el acceso a cualquier contenido o información asociada con tu cuenta." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "5. Limitación de Responsabilidad" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de usar nuestros servicios." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "6. Cambios en los Términos" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será notificado a través de la aplicación o por correo electrónico. Es tu responsabilidad revisar estos términos periódicamente." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-4", children: "7. Contacto" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
          "Si tienes alguna pregunta sobre estos términos, puedes contactarnos en ",
          /* @__PURE__ */ jsx("a", { href: "mailto:soporte@gestialix.com", className: "text-blue-500 hover:underline", children: "soporte@gestialix.com" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "my-6" }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Gestialix. Todos los derechos reservados."
      ] }) })
    ] })
  ] }) });
}
export {
  PrivacyPolicy as default
};
