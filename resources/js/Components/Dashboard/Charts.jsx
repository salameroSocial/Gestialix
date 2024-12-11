import React, { useEffect, useState, useRef } from "react";
import csrfFetch from "@/utils/csrfFetch";
import Spinner from "../ui/Spinner";
import Chart from "chart.js/auto";

export function StudentRegistrationsChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chartRef = useRef(null); // Referencia al canvas
    let chartInstance = useRef(null); // Instancia del gráfico

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await csrfFetch("/api/stats/altasEstudiantes");
                if (!response.ok) throw new Error("Error fetching registration data");

                const data = await response.json();

                // Formatear los datos
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

    useEffect(() => {
        if (chartData.length > 0) {
            renderChart();
        }
    }, [chartData]);

    const renderChart = () => {
        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destruir el gráfico existente
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.map((item) => item.date),
                datasets: [
                    {
                        label: "Estudiantes Registrados",
                        data: chartData.map((item) => item.total),
                        borderColor: "rgba(59, 130, 246, 1)",
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Registros de Estudiantes",
                    },
                },
            },
        });
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-green-400 mb-4">Registros de Estudiantes</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}





export function Charts() {
    const [chartData, setChartData] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [timeFilter, setTimeFilter] = useState("week");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const chartRef = useRef(null); // Referencia al canvas para Chart.js
    let chartInstance = useRef(null); // Instancia del gráfico

    const fetchClasses = async () => {
        try {
            const response = await csrfFetch("/api/classes");
            if (!response.ok) throw new Error("Error fetching classes");
            const data = await response.json();
            setClasses(data);

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
            const params = new URLSearchParams();

            if (selectedClass) params.append("class_id", selectedClass);
            if (start && end) {
                params.append("start_date", start.toISOString().split("T")[0]);
                params.append("end_date", end.toISOString().split("T")[0]);
            }

            const response = await csrfFetch(`/api/stats/asistencias?${params}`);
            if (!response.ok) throw new Error("Error fetching attendance data");

            const data = await response.json();
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

    const renderChart = () => {
        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destruir el gráfico existente
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.map((item) => item.day),
                datasets: [
                    {
                        label: "Presentes",
                        data: chartData.map((item) => item.presentes),
                        borderColor: "rgba(52, 211, 153, 1)",
                        backgroundColor: "rgba(52, 211, 153, 0.2)",
                        tension: 0.4,
                    },
                    {
                        label: "Ausentes",
                        data: chartData.map((item) => item.ausentes),
                        borderColor: "rgba(248, 113, 113, 1)",
                        backgroundColor: "rgba(248, 113, 113, 0.2)",
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Asistencia por Día",
                    },
                },
            },
        });
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        fetchChartData();
    }, [selectedClass, startDate, timeFilter]);

    useEffect(() => {
        if (chartData.length > 0) {
            renderChart();
        }
    }, [chartData]);

    const calculateRange = () => {
        const today = new Date(startDate);
        let start, end;

        if (timeFilter === "week") {
            start = new Date(today);
            start.setDate(today.getDate() - today.getDay());
            end = new Date(today);
            end.setDate(today.getDate() + (6 - today.getDay()));
        } else if (timeFilter === "month") {
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        }

        return { start, end };
    };

    const changeRange = (direction) => {
        setStartDate((prev) => {
            const newDate = new Date(prev);

            if (timeFilter === "week") {
                newDate.setDate(newDate.getDate() + direction * 7);
            } else if (timeFilter === "month") {
                newDate.setMonth(newDate.getMonth() + direction);
            }

            return newDate;
        });
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    const { start, end } = calculateRange();

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-green-400">
                Asistencia por {timeFilter === "week" ? "Semana" : "Mes"}
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
                    value={selectedClass || ""}
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
                    {timeFilter === "week" ? "Semana Anterior" : "Mes Anterior"}
                </button>
                <h3 className="text-lg font-semibold">
                    {start.toLocaleDateString()} - {end.toLocaleDateString()}
                </h3>
                <button
                    onClick={() => changeRange(1)}
                    className="bg-green-200 hover:bg-orange-600 p-2 dark:text-gray-800 rounded"
                >
                    {timeFilter === "week" ? "Semana Siguiente" : "Mes Siguiente"}
                </button>
            </div>

            {/* Gráfico */}
            <div className="bg-white p-4 rounded-lg shadow">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}
