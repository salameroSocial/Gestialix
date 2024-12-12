<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitar una Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out;
        }
    </style>
</head>

<body class="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-red-500 flex items-center justify-center p-4">
    <div class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full animate-fadeInUp">
        <h1 class="text-3xl font-bold text-white text-center mb-6">Solicita una Demo</h1>
        <p class="text-white text-center mb-8">Descubre cómo nuestra plataforma puede impulsar tu negocio.</p>

        <form action="/send-demo-request" method="POST" class="space-y-6">
            <div>
                <label for="name" class="block text-white text-sm font-medium mb-2">Nombre Completo</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Tu nombre completo"
                    required>
            </div>

            <div>
                <label for="email" class="block text-white text-sm font-medium mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Tu correo electrónico"
                    required>
            </div>

            <div>
                <label for="message" class="block text-white text-sm font-medium mb-2">Mensaje</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    class="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Cuéntanos más sobre tus necesidades"
                    required></textarea>
            </div>

            <button
                type="submit"
                class="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition duration-300 transform hover:scale-105 active:scale-95">
                Solicitar Demo
            </button>
        </form>

        <div class="mt-8 text-center">
            <a href="/" class="text-white hover:underline">Volver al Inicio</a>
        </div>
    </div>
</body>

</html>