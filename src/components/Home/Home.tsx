import { useEffect, useState } from "react"
import { Country, fetchCountries } from "../Service/Service"
import './Home.css';
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../scrollBtn/scrollBtn";
import ThemeSwitcher from "../Theme/Theme";


const Home: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchItem, setSeatchItem] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    const navigate = useNavigate();

    const handleCardClick = (name: string) => {
        navigate(`${name}`);
    };

    useEffect(() => {
        const getCountries = async () => {
            const countriesData = await fetchCountries();
            setCountries(countriesData);
            setFilteredCountries(countriesData);
        }
        getCountries()
    }, []);

    useEffect(() => {
        const results = countries.filter((country) => 
          country.name.common.toLowerCase().includes(searchItem.toLowerCase())  
        );
        setFilteredCountries(results);
    }, [searchItem, countries]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeatchItem(e.target.value);
    }

    return (
        <div className="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
            <ThemeSwitcher />
            <input 
                type="text"
                value={searchItem} 
                onChange={handleSearchChange}
                placeholder="Search for a country..."
                className="w-full p-2 mb-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <ScrollToTopButton />
            
            <div className="container">
                {filteredCountries.map(country => (
                    <div 
                        className="card p-4 mb-4 border border-gray-200 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300"
                        key={country.name.common}
                        onClick={() => {handleCardClick(country.name.common)}}
                    >
                        <h2 className="text-xl font-semibold mb-2 dark:text-white">{country.name.common}</h2>
                        <img src={country.flags.png} alt={`${country.name.common} flag`} className="rounded-md mb-2" />
                        <p className="text-gray-700 dark:text-gray-300">Capital: {country.capital}</p>
                        <p className="text-gray-700 dark:text-gray-300">Region: {country.region}</p>
                        <p className="text-gray-700 dark:text-gray-300">Population: {country.population}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;