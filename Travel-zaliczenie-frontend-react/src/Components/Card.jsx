import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAddressFromCoords from "./util/getAdres";
import "../index.css";

const Card = () => {
  const [place, setPlace] = useState(null);
  const [address, setAddress] = useState("");
  const [imageError, setImageError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/places/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        setPlace(data);
      })
      .catch((err) => console.error("Error fetching", err));
  }, [id]);

  useEffect(() => {
    if (place) {
      getAddressFromCoords(place.lat, place.lng).then((addr) => {
        setAddress(addr);
      });
    }
  }, [place]);

  if (!place) return <h1 className="text-center text-xl font-semibold">Loading data...</h1>;
  const formatImageUrl = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith('http')) {
      return imgPath;
    }
    if (imgPath.startsWith('/media')) {
      return `http://127.0.0.1:8000${imgPath}`;
    }
    if (!imgPath.includes('/media')) {
      if (imgPath.startsWith('images/')) {
        return `http://127.0.0.1:8000/media/${imgPath}`;
      } else {
        return `http://127.0.0.1:8000/media/images/${imgPath}`;
      }
    }
    
    // Fallback - just prepend the domain
    return `http://127.0.0.1:8000${imgPath}`;
  };

  // Determine the image URL and alternate URLs to try
  const primaryImageUrl = formatImageUrl(place.img);
  const alternateImageUrl1 = place.img ? `http://127.0.0.1:8000/media/${place.img.replace(/^\//, '')}` : null;
  const alternateImageUrl2 = place.img ? `http://127.0.0.1:8000${place.img}` : null;

  return (
    <div className="min-h-screen bg-[#fdf1e6] p-10 flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
        <div className="flex gap-4 mb-4">
          {place.category.map((cat) => (
            <span key={cat.id} className="bg-[#e6c7a1] text-black py-2 px-4 rounded-full font-medium">
              {cat.name}
            </span>
          ))}
        </div>
        <div className="bg-[#52715b] text-white p-6 rounded-lg shadow-md leading-relaxed text-sm">
          {place.description}
        </div>
      </div>
      <div className="flex-1 bg-[#ecd4bd] p-6 rounded-lg shadow-md flex flex-col items-center">
        {place.img && (
          <>
            {!imageError ? (
              <img 
                src={primaryImageUrl} 
                alt={place.name} 
                className="w-[300px] h-[300px] object-cover rounded-md mb-4"
                onError={(e) => {
                  console.error("Primary image failed to load:", primaryImageUrl);
                  if (alternateImageUrl1) {
                    console.log("Trying alternate URL:", alternateImageUrl1);
                    e.target.src = alternateImageUrl1;
                    e.target.onerror = (e2) => {
                      console.error("Alternate image 1 failed to load:", alternateImageUrl1);
                      if (alternateImageUrl2) {
                        console.log("Trying second alternate URL:", alternateImageUrl2);
                        e2.target.src = alternateImageUrl2;
                        e2.target.onerror = () => {
                          console.error("All image attempts failed");
                          setImageError(true);
                        };
                      } else {
                        setImageError(true);
                      }
                    };
                  } else {
                    setImageError(true);
                  }
                }}
              />
            ) : (
              <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center rounded-md mb-4">
                <p className="text-gray-500">Image not found</p>
              </div>
            )}
            {/* <div className="text-xs text-gray-500 mb-4">
              <p>Original path: {place.img}</p>
              <p>Trying: {primaryImageUrl}</p>
              {alternateImageUrl1 && <p>Alt 1: {alternateImageUrl1}</p>}
              {alternateImageUrl2 && <p>Alt 2: {alternateImageUrl2}</p>}
            </div> */}
          </>
        )}
        
        <h2 className="text-lg font-medium mb-2">{place.name}</h2>
        <div className="flex items-center gap-2 text-yellow-500 mb-2">
        <img src="/icon-star.png" alt="icon-star" className="w-[30px] h-[30px]" />
        <div>{place.rating}</div>
        </div>

        <div className="flex items-center text-sm text-yellow mb-2">
          <span className="mr-2">📍</span>
          {address || `${place.lat}, ${place.lng}`}
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <span className="text-sm">{place.user}</span>
          {place.user.name}
          <span className="text-xs text-gray-500 ml-2">
            {new Date(place.created_at).toLocaleDateString([], {
              year: "2-digit",
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;