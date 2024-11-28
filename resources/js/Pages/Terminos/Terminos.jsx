export default function Dashboard({ userData }) {
    return (
        <div>
            <h1>Bienvenido, {userData?.user?.name || 'Usuario'}</h1>
            <p>Roles: {userData?.roles?.join(', ') || 'Sin roles'}</p>
            <p>Permisos: {userData?.permissions?.join(', ') || 'Sin permisos'}</p>
        </div>
    );
}
