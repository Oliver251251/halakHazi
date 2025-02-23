import React, { useEffect, useState } from "react";
import axios from "axios";

export const Fogas = () => {
  const [fogasok, setFogasok] = useState([]);
  
  useEffect(() => {
    const fetchFogasok = async () => {
      try {
        const response = await axios.get("https://localhost:7067/api/Fogasoks");
        setFogasok(response.data);
      } catch (error) {
        console.log("Hiba történt a fogások lekérésekor");
      }
    };

    fetchFogasok();
  }, []);

  console.log(fogasok);
  

  return (
    <div>
      <h2>Fogások listája</h2>
      <ul>
        {fogasok.map((fogas, index) => (
          <li key={index}>
            <strong>Horgász:</strong> {fogas.horgaszNeve} <br />
            <strong>Hal:</strong> {fogas.halNeve} ({fogas.halFaj}) <br />
            <strong>Dátum:</strong> {new Date(fogas.datum).toLocaleDateString()} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};