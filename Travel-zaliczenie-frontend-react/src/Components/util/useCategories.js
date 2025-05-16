import { useState, useEffect } from "react";

const useCategories = () => {
    const [category, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();  
                setCategories(data);  
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false);  
            }
        };

        fetchCategories(); 

    }, []); 

    return { category, loading, error };  
};

export default useCategories;
