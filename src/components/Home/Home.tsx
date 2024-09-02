import { useEffect, useState } from "react"
import { Country, fetchCountries } from "../Service/Service"
import './Home.css';
import { useNavigate } from "react-router-dom";
import CountryDetails from "../Pages/CountryDetails";


const Home: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const navigate = useNavigate();

    const handleCardClick = (name: string) => {
        navigate(`${name}`);
    };

    useEffect(() => {
        const getCountries = async () => {
            const countriesData = await fetchCountries();
            setCountries(countriesData);
        }
        getCountries()
    }, []);

    return (
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
    );

}

export default Home;