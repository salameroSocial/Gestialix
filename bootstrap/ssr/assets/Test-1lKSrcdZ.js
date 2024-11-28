import { jsxs, jsx } from "react/jsx-runtime";
import "react";
const Test = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white shadow-md", children: /* @__PURE__ */ jsx("nav", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Logo, { showText: false, sizeW: 10, sizeH: 10 }),
        /* @__PURE__ */ jsx("h1", { className: "ml-4 text-2xl sm:text-3xl font-bold text-gray-700", children: "Gestialix" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 sm:space-x-6", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "text-base font-medium text-gray-500 hover:text-gray-900",
            children: "Iniciar sesión"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            link: "/register",
            text: "Regístrate",
            className: "px-5 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative bg-gradient-to-r from-green-600 to-blue-500 py-16 sm:py-24 text-white text-center",
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1 },
          children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-extrabold", children: [
              "Simplifica la Gestión de tu",
              " ",
              /* @__PURE__ */ jsx(
                WordSlider,
                {
                  words: ["Colegio", "Instituto", "Universidad", "Comedor"],
                  interval: 3e3
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg sm:text-xl max-w-2xl mx-auto", children: "Una plataforma intuitiva y eficiente para organizar clases, gestionar estudiantes y generar informes para optimizar los recursos de tu comedor." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center space-x-4", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  link: "tel:662907258",
                  text: "Solicita una demo",
                  className: "px-6 py-3 text-lg bg-green-600 hover:bg-green-700 rounded-md"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  text: "Ver Más",
                  variant: "outline",
                  className: "px-6 py-3 text-lg text-green-600 border border-green-600 hover:bg-green-100 rounded-md"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-gray-900", children: "Todo lo que necesitas para tu comedor" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Desde el control de asistencia hasta la planificación de menús, Gestialix tiene todo cubierto." }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: [
          {
            icon: Users,
            title: "Control de Estudiantes",
            description: "Administra fácilmente la información de tus estudiantes y sus necesidades específicas."
          },
          {
            icon: Utensils,
            title: "Planificación de Menús",
            description: "Consulta menús balanceados considerando intolerancias y preferencias alimenticias."
          },
          {
            icon: Check,
            title: "Generación de Informes",
            description: "Obtén reportes mensuales detallados listos para enviar a las autoridades educativas."
          }
        ].map((feature, index) => /* @__PURE__ */ jsx(
          FeatureCard,
          {
            icon: feature.icon,
            title: feature.title,
            description: feature.description
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-green-700 to-green-500 py-16 text-center text-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "¿Listo para transformar la gestión de tu comedor?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg sm:text-xl max-w-2xl mx-auto", children: "Comienza a usar Gestialix hoy mismo y simplifica tus operaciones como nunca antes." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center space-x-4", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              text: "Solicita una demo",
              className: "px-6 py-3 text-lg bg-white text-green-600 border border-white hover:bg-green-100 rounded-md"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              text: "Contáctanos",
              variant: "outline",
              className: "px-6 py-3 text-lg text-white border border-white hover:bg-green-800 rounded-md"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Test as default
};
