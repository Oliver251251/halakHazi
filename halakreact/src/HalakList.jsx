import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const HalakList = () => {
  const [halak, setHalak] = useState([]);
  const [locations, setLocations] = useState({}); // Store locations in an object
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    loadHalak();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedImage(file);

        
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    }
};

  const loadHalak = async () => {
    try {
      const response = await axios.get("https://localhost:7067/api/Halaks");
      setHalak(response.data);
      // Fetch locations for all fish
      response.data.forEach((hal) => fetchLocation(hal.toId));
    } catch (error) {
      console.error("Hiba a halak lekérdezésekor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7067/api/Halaks/${id}`);
      loadHalak();
    } catch (error) {
      console.error("Hiba a hal törlésekor:", error);
    }
  };

  const fetchLocation = async (toid) => {
    // Avoid unnecessary API calls
    if (!locations[toid]) {
      try {
        const { data } = await axios.get(`https://localhost:7067/api/Tavaks/${toid}`);
        setLocations((prev) => ({ ...prev, [toid]: data.nev })); // Store location name
      } catch (error) {
        console.error("Hiba a helyszínek betöltésében:", error);
      }
    }
  };

  return (
    <div>
      <h2>Halak listája</h2>
      <ul>
        {halak.map((hal) => (
          <li key={hal.id}>
             {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Selected preview"
                                className="img-fluid rounded shadow-sm"
                                style={{ width: "250px", height: "auto", objectFit: "cover" }}
                            />
                        ) : (
                            hal.kep && (
                                <img
                                    src={`data:image/jpeg;base64,${hal.kep}`}
                                    alt="Fish"
                                    className="img-fluid rounded shadow-sm"
                                    style={{ width: "250px", height: "auto", objectFit: "cover" }}
                                />
                            )
                        )}
            {hal.nev} - {hal.faj} - {hal.meretCm} cm - {locations[hal.toId] || "Betöltés..."}
            <Link to={`/Halmod/${hal.id}`} >Modosit</Link>&nbsp;&nbsp;&nbsp;
            <button onClick={() => handleDelete(hal.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
