import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { EyeOff, Eye, Facebook, Mail } from "lucide-react";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { F as Footer } from "./footer-BJKdI4B5.js";
import { L as Logo } from "./Logo-BI89IjeP.js";
import { a as ButtonForms } from "./Buttons-D9lSxtz5.js";
import "@inertiajs/inertia-react";
const SocialLoginButton = ({ href, icon: Icon, text, color }) => /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: /* @__PURE__ */ jsxs(
  "a",
  {
    href,
    className: "w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50",
    children: [
      /* @__PURE__ */ jsx(Icon, { size: 20, className: `mr-2 ${color}` }),
      text
    ]
  }
) });
function Login({ status, canResetPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center flex flex-col items-center justify-center mb-8", children: [
              /* @__PURE__ */ jsx(Logo, {}),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Inicio de sesión" })
            ] }),
            status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600", children: status }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Correo Electrónico" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "email",
                    type: "email",
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                    placeholder: "tu@ejemplo.com",
                    autoComplete: "email",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "Contraseña" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "password",
                      type: showPassword ? "text" : "password",
                      value: data.password,
                      onChange: (e) => setData("password", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                      placeholder: "Tu contraseña",
                      autoComplete: "current-password",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
                      children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 20 }) : /* @__PURE__ */ jsx(Eye, { size: 20 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "remember",
                    type: "checkbox",
                    checked: data.remember,
                    onChange: (e) => setData("remember", e.target.checked),
                    className: "h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  }
                ),
                /* @__PURE__ */ jsx("label", { htmlFor: "remember", className: "ml-2 block text-sm text-gray-900", children: "Recordarme" })
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: errors.general, className: "mt-2" }),
              /* @__PURE__ */ jsx(
                ButtonForms,
                {
                  text: "Iniciar Sesión",
                  type: "submit",
                  disabled: processing,
                  classNameProps: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-gray-300" }) }),
                /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-sm", children: /* @__PURE__ */ jsx("span", { className: "px-2 bg-white text-gray-500", children: "O continúa con" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 gap-3", children: [
                /* @__PURE__ */ jsx(
                  SocialLoginButton,
                  {
                    href: "/auth/facebook",
                    icon: Facebook,
                    text: "Facebook",
                    color: "text-blue-600"
                  }
                ),
                /* @__PURE__ */ jsx(
                  SocialLoginButton,
                  {
                    href: "/auth/google",
                    icon: Mail,
                    text: "Google",
                    color: "text-red-600"
                  }
                )
              ] })
            ] }),
            canResetPassword && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsx("a", { href: route("password.request"), className: "text-sm text-gray-600 hover:text-gray-900", children: "¿Olvidaste tu contraseña?" }) })
          ] }),
          /* @__PURE__ */ jsx(Footer, { text: "¿No tienes una cuenta? Regístrate", link: "/register", size: "text-xs" })
        ]
      }
    ) })
  ] });
}
export {
  Login as default
};
