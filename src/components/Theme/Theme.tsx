import React, { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <button
        onClick={toggleTheme}
        className="font-bold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4 py-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:scale-105 mb-2"
        >
            {isDarkMode ? 'Switch to Light Mode': 'Switch to Dark Mode'}
        </button>
    )
}

export default ThemeSwitcher;