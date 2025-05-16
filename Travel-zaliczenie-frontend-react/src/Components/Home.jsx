import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/places/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-16">
      {places.map((place, index) => (
        <Link
          key={index}
          to={`/places/${place.id}`}
          className="bg-lightOrange flex flex-col border-[2px] border-borderColor rounded-2xl p-4 w-full hover:shadow-md hover:bg-orange-100 transition"
        >
          <h2 className="text-lg font-semibold mb-2">{place.name}</h2>
          <p className="text-sm line-clamp-3 flex-1">{place.description}</p>
          <div className="flex justify-between items-end mt-8 text-sm text-gray-700">
            <p><strong>By:</strong> {place.user}</p>
            <p>
              {new Date(place.created_at).toLocaleDateString([], {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
    </>
   
  );
}
