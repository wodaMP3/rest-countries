import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  flags: {
    svg: string;
  };
}

const CountryDetails: React.FC = () => {
    const [country, setCountry] = useState<Country[]>([]); 
    const { name } = useParams<{ name: string }>();

    useEffect(() => {
        const getCountry = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
                const data = await res.json();
                setCountry(data);
            } catch (error) {
                console.error(error);
            }
        };
        getCountry();
    }, [name]);

    return (
        <>
            <section>
                {country.map((item) => (
                    <div key={item.population}>
                        <article>
                            <img src={item.flags.svg} alt={item.name.common} />
                        </article>

                        <article>
                            <h1>{item.name.official}</h1>
                        </article>
                    </div>
                ))}
            </section>
        </>
    );
}

export default CountryDetails;
