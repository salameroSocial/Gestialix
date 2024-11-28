export default function Label({ type, text, name, value, placeholder }) {
    return (
        <label className="block text-sm font-medium text-gray-700 mb-1" type={type} name={name} value={value} placeholder={placeholder}>{text}</label>
    )
}