import { useEffect, useState } from "react"
import { Country, fetchCountries } from "../Service/Service"
import './Home.css';
import { useFetcher, useNavigate } from "react-router-dom";


const Home: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchItem, setSeatchItem] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    useEffect(() => {

    })
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
        <div className="p-6">
            <input 
            type="text"
            value={searchItem} 
            onChange={handleSearchChange}
            placeholder="Search for a country..."
            className="w-full p-2 mb-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
        <div className="container">
            {countries.map(country => (
                <div className="card" key={country.name.common}
                onClick={() => {handleCardClick(country.name.common)}}>
                    <h2>{country.name.common}</h2>
                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                    <p>Capital: {country.capital}</p>
                    <p>Region: {country.region}</p>
                    <p>Population: {country.population}</p>
                </div>
            ))}
        </div>
    </div>
    );

}

export default Home;