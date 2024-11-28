export function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" {...props} />
        </div>
    );
}

export function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" {...props} />
        </div>
    );
}

export function Button({ children, ...props }) {
    return (
        <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            {...props}
        >
            {children}
        </button>
    );
}

export function Label({ children, ...props }) {
    return (
        <label className="block text-sm font-medium text-gray-700 mb-1" {...props}>
            {children}
        </label>
    );
}