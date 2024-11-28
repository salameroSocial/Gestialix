import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
function Logo({ showText = true, sizeW, sizeH }) {
  const [imageSrc, setImageSrc] = useState("/images/gestialixLargo.gif");
  const handleError = () => {
    setImageSrc("/images/logoGestialix.svg");
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imageSrc,
        alt: "Gestialix Logo",
        onError: handleError,
        className: sizeW && sizeH ? `h-${sizeH} w-${sizeW}` : "h-20 w-20"
      }
    ),
    showText && // Mostrar el texto solo si `showText` es `true`
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-gray-900 tracking-tight", children: "Gestialix" })
  ] });
}
export {
  Logo as L
};
