import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UjHal = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const formDataObject = {
            id: 0,
            nev: event.target.nev.value,
            faj: event.target.faj.value,
            meretCm: event.target.meretcm.value,
            toId: event.target.toId.value,
            kep: "asd",
        };
    console.log(formDataObject);
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formDataObject.kep = reader.result.split(",")[1]; 
    
                setIsLoading(true); 
    
                axios.post('https://localhost:7067/api/Halaks', formDataObject, {
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(() => {
                        setIsLoading(false);
                        navigate('/');
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.log("Error uploading data:", error);
                    });
            };
    
            reader.readAsDataURL(selectedImage);
        } else {
            
            setIsLoading(true); 
    
            axios.post('https://localhost:7067/api/Halaks', formDataObject, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then(() => {
                    setIsLoading(false);
                    navigate('/');
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log("Error uploading data:", error);
                });
        }
    };
    

    return (
        <div className="p-5 conent bg-whitesmoke text-center">
            <h2>Új hal</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="nev" className="form-control" />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal faja:</label>
                    <div className="col-sm-9">
                        <input type="text" name="faj" className="form-control" />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Hal mérete (cm):</label>
                    <div className="col-sm-9">
                        <input type="number" name="meretcm" className="form-control" />
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Tó id:</label>
                    <div className="col-sm-9">
                        <input type="number" name="toId" className="form-control" />
                    </div>
                </div>

                
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Válassz képet:</label>
                    <div className="col-sm-9">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                    </div>
                </div>

                <button type="submit" className="btn btn-success" disabled={isLoading}>
                    {isLoading ? 'Küldés folyamatban...' : 'Küldés'}
                </button>
            </form>
        </div>
    );
};