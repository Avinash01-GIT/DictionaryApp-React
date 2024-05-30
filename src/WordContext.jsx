import { createContext, useContext, useState } from "react";

const WordContext = createContext();

export const useWord = () => useContext(WordContext);

export const WordProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

  const searchWord = () => {
    fetch(`${url}${word}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setResult(data[0]);
          setError("");
        } else {
          setError("No data found for the word.");
          setResult(null);
        }
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setResult(null);
      });
  };
  
  const playSound = () => {
    if (result && result.phonetics && result.phonetics.length > 0) {
      const audio = new Audio(result.phonetics[0].audio);
      audio.play();
    } else {
      console.error("Audio source not found.");
    }
  };

  return (
    <WordContext.Provider
      value={{ word, setWord, result, error, searchWord, playSound }}
    >
      {children}
    </WordContext.Provider>
  );
};
