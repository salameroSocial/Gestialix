import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import Spinner from '../ui/Spinner';
import csrfFetch from '@/utils/csrfFetch';


export function Charts() {
    const [chartData, setChartData] = useState([]); // Datos del gráfico
    const [classes, setClasses] = useState([]); // Lista de clases
    const [selectedClass, setSelectedClass] = useState(null); // Clase seleccionada
    const [startDate, setStartDate] = useState(new Date()); // Fecha inicial del rango
    const [timeFilter, setTimeFilter] = useState('week'); // 'week' o 'month'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClasses = async () => {
        try {
            const response = await csrfFetch('/api/classes'); // Endpoint de clases
            if (!response.ok) throw new Error('Error fetching classes');
            const data = await response.json();
            setClasses(data);

            // Seleccionar la primera clase por defecto
            if (data.length > 0) {
                setSelectedClass(data[0].id);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const fetchChartData = async () => {
        try {
            setLoading(true);

            const { start, end } = calculateRange();

            // Construir los parámetros condicionalmente
            const params = new URLSearchParams();
            if (selectedClass) params.append('class_id', selectedClass);
            if (start && end) {
                params.append('start_date', start.toISOString().split('T')[0]);
                params.append('end_date', end.toISOString().split('T')[0]);
            }

            const response = await csrfFetch(`/api/stats/asistencias?${params}`);
            if (!response.ok) throw new Error('Error fetching attendance data');
            const data = await response.json();

            // Reformatear los datos si es necesario
            const formattedData = data.map((item) => ({
                day: item.period,
                presentes: item.presentes,
                ausentes: item.ausentes,
                desconocidos: item.desconocidos,
            }));

            setChartData(formattedData);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        fetchChartData();
    }, [selectedClass, startDate, timeFilter]);

    const calculateRange = () => {
        const today = new Date(startDate);
        let start, end;

        if (timeFilter === 'week') {
            start = new Date(today);
            start.setDate(today.getDate() - today.getDay()); // Lunes
            end = new Date(today);
            end.setDate(today.getDate() + (6 - today.getDay())); // Domingo
        } else if (timeFilter === 'month') {
            start = new Date(today.getFullYear(), today.getMonth(), 1); // Primer día del mes
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Último día del mes
        }

        return { start, end };
    };

    const { start, end } = calculateRange();

    const changeRange = (direction) => {
        setStartDate((prev) => {
            const newDate = new Date(prev);

            if (timeFilter === 'week') {
                newDate.setDate(newDate.getDate() + direction * 7); // Sumar/restar una semana
            } else if (timeFilter === 'month') {
                newDate.setMonth(newDate.getMonth() + direction); // Sumar/restar un mes
            }

            return newDate;
        });
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-green-400">
                Asistencia por {timeFilter === 'week' ? 'Semana' : 'Mes'}
            </h2>

            {/* Filtros */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="border dark:text-black rounded-lg p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="week">Semana</option>
                    <option value="month">Mes</option>
                </select>
                <select
                    value={selectedClass || ''}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="border dark:text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todas las clases</option>
                    {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                            {cls.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Controles de rango */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => changeRange(-1)}
                    className="bg-green-200 hover:bg-orange-600 p-2 dark:text-gray-800 rounded"
                >
                    {timeFilter === 'week' ? 'Semana Anterior' : 'Mes Anterior'}
                </button>
                <h3 className="text-lg font-semibold">
                    {start.toLocaleDateString()} - {end.toLocaleDateString()}
                </h3>
                <button
                    onClick={() => changeRange(1)}
                    className="bg-green-200 hover:bg-orange-600 p-2 dark:text-gray-800 rounded"
                >
                    {timeFilter === 'week' ? 'Semana Siguiente' : 'Mes Siguiente'}
                </button>
            </div>

            {/* Gráfico */}
            <div className="bg-white p-4 rounded-lg shadow">
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="presentes" stroke="#34d399" name="Presentes" />
                        <Line type="monotone" dataKey="ausentes" stroke="#f87171" name="Ausentes" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
}




export function StudentRegistrationsChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await csrfFetch('/api/stats/altasEstudiantes');
                if (!response.ok) throw new Error('Error fetching registration data');
                const data = await response.json();

                // Transformar datos para Recharts
                const formattedData = data.map((item) => ({
                    date: item.date,
                    total: item.total,
                }));

                setChartData(formattedData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-green-400 mb-4">Registros de Estudiantes</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Estudiantes"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
