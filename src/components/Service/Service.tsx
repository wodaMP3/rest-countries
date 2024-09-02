import axios from "axios";

export interface CountryProps {
    name: string;
    capital: string;
    region: string;
    population: string;
    flags: {
        png: string;
        svg: string;
    };
}

export const fetchCountries = async (): Promise<Country[]> => {
    const response = await axios.get('https://restcountries.com/v3.1/all')
    return response.data;
}