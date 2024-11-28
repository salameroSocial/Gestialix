import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
function TwoFactorAuthentication({ enabled, qrCodeUrl, recoveryCodes }) {
  const enableTwoFactor = () => {
    axios.post("/user/two-factor-authentication");
  };
  const disableTwoFactor = () => {
    axios.delete("/user/two-factor-authentication");
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold", children: "Autenticación de Dos Factores" }),
    enabled ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-green-600 mt-4", children: "Autenticación de dos factores activada." }),
      qrCodeUrl && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Escanea este código QR con Google Authenticator o Authy:" }),
        /* @__PURE__ */ jsx(QRCodeCanvas, { value: qrCodeUrl, size: 200, className: "mt-4" })
      ] }),
      recoveryCodes && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Códigos de recuperación:" }),
        /* @__PURE__ */ jsx("ul", { className: "list-disc ml-5", children: recoveryCodes.map((code, index) => /* @__PURE__ */ jsx("li", { className: "text-gray-700", children: code }, index)) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600",
          onClick: disableTwoFactor,
          children: "Desactivar 2FA"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mt-2", children: "Habilita la autenticación de dos factores para proteger tu cuenta." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
          onClick: enableTwoFactor,
          children: "Activar 2FA"
        }
      )
    ] })
  ] });
}
export {
  TwoFactorAuthentication as default
};
