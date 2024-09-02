import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Country, fetchCountries } from "../Service/Service";

const CountryDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [country, setCountry] = useState<Country | null>(null);

    useEffect(() => {
        const getCountryData = async () => {
            const countriesData = await fetchCountries();
            const selectedCountry = countriesData.find(
                (country) => country.name.common.toLowerCase() === name?.toLowerCase()

            );
            setCountry(selectedCountry || null);
        };
        getCountryData();
    }, [name]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
            <p>Official Name: {country.name.official}</p>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area} km²</p>
            <p>Timezones: {country.timezones.join(', ')}</p>
        </div>
    );

}

export default CountryDetails;