import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import useCategories from "./util/useCategories";
import InputField from "./InputField";
import SelectCategory from "./SelectCategory";
import LocationPicker from "./LocationPicker";
import useFormHandler from "./hooks/useFormHandler";
import api from "./util/api";
import RatingStar from "./RatingStar";
import Hero from "./Header";

const AddComponent = () => {
    const { data, setData, handleChange, handleCategory, handleImage, handleRating } = useFormHandler({
        name: "",
        lat: "",
        lng: "",
        description: "",
        rating: 3,
        img: null,
        category: [],
    });

    const { category, loading: categoriesLoading, error: categoriesError } = useCategories(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        api(data);
    };

    return (
        <>
           <div className="relative flex justify-center items-start px-4 py-8">
  <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
    
    {/* Lewa kolumna */}
    <div className="flex flex-col gap-4 flex-1">
      <InputField
        type="text"
        name="name"
        placeholder="Text the name"
        value={data.name}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="description"
        placeholder="Text the description"
        value={data.description}
        onChange={handleChange}
      />

    <SelectCategory
      category={category}
      selectedCategories={data.category}
      onChange={handleCategory}
    />
      <InputField type="file" accept="image/*" onChange={handleImage} className="bg-orange" />

        <RatingStar value={data.rating} onChange={(newRating) => setData((prev) => ({...prev, rating: newRating}))}/>


      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Dodaj miejsce
      </button>
    </div>

    {/* Prawa kolumna: mapa */}
    <div className="flex-1 min-w-[300px] h-[300px]">
      <LocationPicker
        lat={data.lat}
        lng={data.lng}
        onLocationSelect={(lat, lng) => setData({ ...data, lat, lng })}
      />
    </div>
  </form>
</div>

        </>
    );
};

export default AddComponent;
