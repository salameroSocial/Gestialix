import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "@inertiajs/inertia-react";
function InnovativeButton({ children, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "relative overflow-hidden px-6 py-3 group bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50",
      onClick,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsPressed(false);
      },
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      "aria-label": typeof children === "string" ? children : "Innovative button",
      children: [
        /* @__PURE__ */ jsx("span", { className: `relative z-10 transition-transform duration-200 ${isPressed ? "transform translate-y-1" : ""}`, children }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 overflow-hidden rounded-full", children: /* @__PURE__ */ jsx("span", { className: `absolute inset-0 transform scale-0 transition-transform duration-300 ease-out ${isPressed ? "scale-100" : ""} bg-white opacity-30` }) }),
        isHovered && /* @__PURE__ */ jsx(Fragment, { children: [...Array(10)].map((_, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute w-1 h-1 bg-white rounded-full opacity-70 animate-float",
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 animate-spin-slow", style: { filter: "blur(8px)" } }) })
      ]
    }
  );
}
function ButtonForms({
  text = "Boton",
  // Texto predeterminado del botón
  bgColor = "bg-green-600",
  // Color de fondo predeterminado
  hoverColor = "bg-green-700",
  // Color al hacer hover
  ringColor = "ring-green-500",
  // Color del borde al hacer foco
  type = "button",
  // Tipo del botón (button, submit, etc.)
  onClick,
  classNameProps
  // Evento onClick opcional
}) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
    motion.button,
    {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      type,
      onClick,
      className: classNameProps,
      children: text
    }
  ) });
}
const ButtonDos = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `${baseStyles} ${variantStyles} ${sizeStyles} ${className} bg-black text-white`,
      ref,
      ...props,
      children
    }
  );
});
ButtonDos.displayName = "ButtonDos";
function Button({ text, link, type }) {
  return /* @__PURE__ */ jsxs("a", { href: link, className: "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", type: "submit", children: [
    text,
    text === "Cerrar sesión" && /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2 inline-block" })
  ] });
}
export {
  Button as B,
  InnovativeButton as I,
  ButtonForms as a
};
