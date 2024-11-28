import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

export default function TwoFactorAuthentication({ enabled, qrCodeUrl, recoveryCodes }) {
    const enableTwoFactor = () => {
        axios.post('/user/two-factor-authentication');
    };

    const disableTwoFactor = () => {
        axios.delete('/user/two-factor-authentication');
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold">Autenticación de Dos Factores</h1>
            {enabled ? (
                <div>
                    <p className="text-green-600 mt-4">Autenticación de dos factores activada.</p>
                    {qrCodeUrl && (
                        <div className="mt-6">
                            <p className="font-semibold">Escanea este código QR con Google Authenticator o Authy:</p>
                            <QRCodeCanvas value={qrCodeUrl} size={200} className="mt-4" />
                        </div>
                    )}

                    {recoveryCodes && (
                        <div className="mt-6">
                            <p className="font-semibold">Códigos de recuperación:</p>
                            <ul className="list-disc ml-5">
                                {recoveryCodes.map((code, index) => (
                                    <li key={index} className="text-gray-700">{code}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <button
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={disableTwoFactor}
                    >
                        Desactivar 2FA
                    </button>
                </div>
            ) : (
                <div>
                    <p className="mt-2">Habilita la autenticación de dos factores para proteger tu cuenta.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={enableTwoFactor}
                    >
                        Activar 2FA
                    </button>
                </div>
            )}
        </div>
    );
}
