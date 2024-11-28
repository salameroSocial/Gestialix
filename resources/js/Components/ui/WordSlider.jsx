import React, { useState, useEffect } from "react";

export default function WordSlider({ words, interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const wordInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);

        return () => clearInterval(wordInterval); // Limpia el intervalo al desmontar el componente
    }, [words, interval]);

    return (
        <div className="relative h-16 overflow-hidden text-4xl font-bold text-center text-orange-500">
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`absolute transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        transform: `translateY(${index === currentIndex ? 0 : -100}%)`,
                        position: "absolute",
                        left: "0",
                        right: "0",
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}
