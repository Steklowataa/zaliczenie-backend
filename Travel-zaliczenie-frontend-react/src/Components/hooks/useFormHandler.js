import { useState } from "react";
import Rating from "react-rating-stars-component";

const useFormHandler = (initialState) => {
    const [data, setData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategory = (e) => {
        const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
        setData((prevData) => ({
            ...prevData,
            category: selectedCategories.map(Number),
        }));
    };

    const handleImage = (e) => {
        setData((prevData) => ({
            ...prevData,
            img: e.target.files[0],
        }));
    };

    const handleRating = (newRating) => {
        setData((prevData) => ({
            ...prevData,
            rating: newRating
        }));
    };

    return { data, setData, handleChange, handleCategory, handleImage, handleRating };
};

export default useFormHandler;
