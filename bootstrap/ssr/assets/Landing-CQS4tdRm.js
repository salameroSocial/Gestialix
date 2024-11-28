import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Users, Carrot, DollarSign, ArrowRight } from "lucide-react";
import { L as Logo } from "./Logo-BI89IjeP.js";
function LandingPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white shadow-sm", children: /* @__PURE__ */ jsx("nav", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-6 md:justify-start md:space-x-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-start lg:w-0 lg:flex-1", children: /* @__PURE__ */ jsx(Logo, { showText: false, sizeW: 32, sizeH: 32 }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:flex items-center justify-end md:flex-1 lg:w-0", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900", children: "Iniciar sesión" }),
        /* @__PURE__ */ jsx(Button, { className: "ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700", children: "Registrarse" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative shadow-xl sm:rounded-2xl sm:overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-full w-full object-cover",
                src: "/placeholder.svg?height=600&width=1200",
                alt: "Niños comiendo en el comedor escolar"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-green-800 to-blue-700 mix-blend-multiply" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-white", children: "Gestión inteligente" }),
              /* @__PURE__ */ jsx("span", { className: "block text-green-200", children: "para comedores escolares" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl", children: "Simplifica la administración de tu comedor escolar, mejora la nutrición de los estudiantes y optimiza tus recursos con ComeDirect." }),
            /* @__PURE__ */ jsx("div", { className: "mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5", children: [
              /* @__PURE__ */ jsx(Button, { className: "flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 sm:px-8", children: "Empezar ahora" }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 sm:px-8", children: "Saber más" })
            ] }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "py-16 bg-white overflow-hidden lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl", children: "Una solución completa para tu comedor escolar" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500", children: "ComeDirect ofrece todas las herramientas que necesitas para gestionar eficientemente tu comedor escolar, desde la planificación de menús hasta el control de costos." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl", children: "Gestión simplificada" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg text-gray-500", children: "Nuestra plataforma intuitiva te permite manejar todos los aspectos de tu comedor escolar desde un solo lugar, ahorrándote tiempo y reduciendo errores." }),
            /* @__PURE__ */ jsx("dl", { className: "mt-10 space-y-10", children: [
              {
                icon: Users,
                title: "Control de asistencia",
                description: "Registra fácilmente la asistencia diaria y genera informes detallados."
              },
              {
                icon: Carrot,
                title: "Planificación de menús",
                description: "Crea menús equilibrados y gestiona las alergias e intolerancias alimentarias."
              },
              {
                icon: DollarSign,
                title: "Control de costos",
                description: "Optimiza tus gastos y reduce el desperdicio de alimentos con nuestras herramientas de análisis."
              }
            ].map((feature) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs("dt", { children: [
                /* @__PURE__ */ jsx("div", { className: "absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white", children: /* @__PURE__ */ jsx(feature.icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsx("p", { className: "ml-16 text-lg leading-6 font-medium text-gray-900", children: feature.title })
              ] }),
              /* @__PURE__ */ jsx("dd", { className: "mt-2 ml-16 text-base text-gray-500", children: feature.description })
            ] }, feature.title)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-10 -mx-4 relative lg:mt-0", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "relative mx-auto",
              width: 490,
              src: "/placeholder.svg?height=490&width=490",
              alt: "Dashboard de ComeDirect"
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-green-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "¿Listo para mejorar tu comedor escolar?" }),
          /* @__PURE__ */ jsx("span", { className: "block text-green-600", children: "Comienza tu prueba gratuita hoy." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex lg:mt-0 lg:flex-shrink-0", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-md shadow", children: /* @__PURE__ */ jsxs(Button, { className: "inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700", children: [
            "Empezar ahora",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-3 -mr-1 h-5 w-5", "aria-hidden": "true" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "ml-3 inline-flex rounded-md shadow", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50", children: "Saber más" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-6 md:order-2", children: ["Facebook", "Instagram", "Twitter"].map((item) => /* @__PURE__ */ jsxs("a", { href: "#", className: "text-gray-400 hover:text-gray-500", children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: item }),
        /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }) })
      ] }, item)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 md:mt-0 md:order-1", children: /* @__PURE__ */ jsx("p", { className: "text-center text-base text-gray-400", children: "© 2023 ComeDirect. Todos los derechos reservados." }) })
    ] }) })
  ] });
}
export {
  LandingPage as default
};
