import React, { useState } from 'react';

export default function Logo({ showText = true, sizeW, sizeH }) { // Prop `showText` con valor predeterminado `true`
    const [imageSrc, setImageSrc] = useState("/images/gestialixLargo.gif");

    const handleError = () => {
        setImageSrc("/images/logoGestialix.svg"); // Imagen estática de respaldo
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <img
                src={imageSrc}
                alt="Gestialix Logo"
                onError={handleError}
                className={sizeW && sizeH ? `h-${sizeH} w-${sizeW}` : "h-20 w-20"} // Ajuste de tamaño
            />
            {showText && ( // Mostrar el texto solo si `showText` es `true`
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Gestialix
                </h1>
            )}
        </div>
    );
}
