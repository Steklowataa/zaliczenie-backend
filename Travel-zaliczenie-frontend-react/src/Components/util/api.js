const api = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)        
    formData.append("rating", data.rating)
    formData.append("lat", data.lat)
    formData.append("lng", data.lng)
    if(data.img instanceof File) {
        formData.append("img", data.img)
    }
    data.category.forEach((catId) => formData.append("category", catId))
    
    console.log([...formData.entries()])

    const token = localStorage.getItem("token")
        
    const res = await fetch("http://127.0.0.1:8000/api/places/create", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
        },
        body: formData
    });
    console.log("Token being sent:", token);
    if (res.ok) {
        alert("Miejsce dodane!");
    } else {
        const errorText = await res.text();
        console.error("Błąd serwera:", errorText); 
        alert("Coś poszło nie tak");
        }
    };

export default api

