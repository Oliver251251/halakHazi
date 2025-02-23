import React, { useEffect, useState } from "react";
import axios from "axios";

export const TopHalak = () => {
  const [halak, setHalak] = useState([]);

  useEffect(() => {
    const fetchHalak = async () => {
      try {
        const response = await axios.get("https://localhost:7067/api/Halaks/Legnagyobb"); 
        setHalak(response.data);
      } catch (error) {
        console.log("Hiba történt a halak lekérésekor.");
      } 
    };

    fetchHalak();
  }, []); 
  return (
    <div>
      <h2>A 3 legnagyobb hal</h2>
      <ul>
        {halak.map((hal, index) => (
          <li key={index}>
            <strong>Hal neve:</strong> {hal.nev} <br />
            <strong>Méret:</strong> {hal.meretCm} cm <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};