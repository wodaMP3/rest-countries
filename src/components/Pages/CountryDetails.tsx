import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../index.css';

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

    const navigate = useNavigate();

    const handleBackBtn = () => {
        navigate('/');
    }

    return (
        <section className="flex flex-col items-center p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:-translate-y-2">
            {country.map((item) => (
                <div key={item.population} className="flex flex-col items-center w-full mb-10 animate-fadeIn md:flex-row md:items-start">
                    <div className="flex flex-col items-center w-full max-w-md md:mr-8">
                        <img 
                            src={item.flags.svg} 
                            alt={item.name.common} 
                            className="w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                        />
                        <button
                            className="font-bold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4 py-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:scale-105 mt-4"
                            onClick={handleBackBtn}
                        >
                            Back
                        </button>
                    </div>

                    <article className="text-center md:text-left mt-6 md:mt-0">
                        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide mb-4 md:text-4xl">
                            {item.name.official}
                        </h1>
                        <p className="text-lg text-gray-600 mb-4 md:text-xl">
                            Population: {item.population.toLocaleString()}
                        </p>
                    </article>
                </div>
            ))}
        </section> 
    );
}

export default CountryDetails;
