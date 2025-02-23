import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const HalMod = () => {
    const params = useParams();
    const id = params.halid;
    const navigate = useNavigate();
    
    const [hal, sethal] = useState({
        nev: '',
        faj: '',
        meretCm: 0,
        toId: '',
        kep: '' 
    });

    const [locations, setLocations] = useState([]);  
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null);

    
    useEffect(() => {
        const fetchHal = async () => {
            try {
                const { data } = await axios.get(`https://localhost:7067/api/Halaks/${id}`);
                sethal(data);
                setSelectedLocation(data.toId);
            } catch (error) {
                console.error("Hiba a fetch-elésben:", error);
            }
        };
        fetchHal();
    }, [id]);

    
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await axios.get("https://localhost:7067/api/Tavaks");  
                setLocations(data);
            } catch (error) {
                console.error("Hiba a helyszínek betöltésében:", error);
            }
        };
        fetchLocations();
    }, []);

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        sethal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleDropdownChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);

            
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formDataObject = {
            id: hal.id,
            nev: hal.nev,
            faj: hal.faj,
            meretCm: hal.meretCm,
            toId: selectedLocation,
            kep: hal.kep,
        };
        
        
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                
                formDataObject.kep = reader.result.split(",")[1]; 
                
                axios.put(`https://localhost:7067/api/Halaks/${id}`, formDataObject, {
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })
                    .then(() => {
                        navigate("/"); 
                    })
                    .catch(error => {
                        console.log("Hiba van!\n", error);
                    });
            };
            reader.readAsDataURL(selectedImage);
        } else {
            
            axios.put(`https://localhost:7067/api/Halaks/${id}`, formDataObject, {
                headers: {
                    'Content-Type': 'application/json'}

            })
                .then(() => {
                    navigate("/"); 
                })
                .catch(error => {
                    console.log("Hiba van!\n", error);
                });
        }
        
    };

    return (
        <div className="p-5 conent bg-whitesmoke text-center">
            <h2>Hal modosítása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="nev"
                            className="form-control"
                            value={hal.nev}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal faja:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="faj"
                            className="form-control"
                            value={hal.faj}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal mérete(cm):</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="meretcm"
                            className="form-control"
                            step="0.01" 
                            value={hal.meretCm}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Helyszín:</label>
                    <div className="col-sm-9">
                        <select
                            name="helyszin"
                            className="form-control"
                            value={selectedLocation}
                            onChange={handleDropdownChange}
                        >
                            <option value="">Válassz egy helyszínt</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.nev} - {location.helyszin}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Kép:</label>
                    <div className="col-sm-9">
                        
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
                    </div>
                </div>

                
                <div className="form-group row pb-5">
                    <div className="col-sm-9 offset-sm-3">
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Küldés</button>
            </form>
        </div>
    );
};