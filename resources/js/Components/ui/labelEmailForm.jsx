export default function EmailLabel() {

    const [email, setEmail] = useState('');

    return (
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
            </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="tu@ejemplo.com"
                required
            />
        </div>
    );
}