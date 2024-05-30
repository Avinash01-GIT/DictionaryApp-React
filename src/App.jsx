import './App.css';
import { FaVolumeUp } from 'react-icons/fa';
import { useWord, WordProvider } from './WordContext';

const SearchBox = () => {
  const { word, setWord, searchWord } = useWord();

  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="Type the Word here..."
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={searchWord}>Search</button>
    </div>
  );
};

const Result = () => {
  const { result, error, word, playSound } = useWord();

  return (
    <div className="result">
      {result && (
        <>
          <div className="word">
            <h3>{word}</h3>
            <button onClick={playSound}>
              <FaVolumeUp />
            </button>
          </div>
          <div className="details">
            <p>{result.meanings[0].partOfSpeech}</p>
            <p>{result.phonetic}</p>
          </div>
          <p className="word-meaning">
            {result.meanings[0].definitions[0].definition}
          </p>
          <p className="word-example">
            {result.meanings[0].definitions[0].example || ''}
          </p>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const App = () => {
  return (
    <WordProvider>
      <div className="container">
        <SearchBox />
        <Result />
      </div>
    </WordProvider>
  );
};

export default App;

