import { useEffect, useState } from "react"
import { Country, fetchCountries } from "../Service/Service"


const Home: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const getCountries = async () => {
            const countriesData = await fetchCountries();
            setCountries(countriesData);
        }
        getCountries()
    }, []);

    return (
        <div>
            {countries.map(country => (
                <div className="card" key={country.name.common}>
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