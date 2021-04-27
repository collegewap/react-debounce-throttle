import { useRef, useState } from "react";

function App() {
  const inputRef = useRef();
  const [animals, setAnimals] = useState([]);
  const timeout = useRef();

  const handleDebounceSearch = () => {
    //Clear the previous timeout.
    clearTimeout(timeout.current);

    // If there is no search term, do not make API call
    if (!inputRef.current.value.trim()) {
      setAnimals([]);
      return;
    }
    timeout.current = setTimeout(() => {
      fetch(`http://localhost:4000/animals?q=${inputRef.current.value}`)
        .then(async (response) => {
          if (!response.ok) {
            console.log("Something went wrong!");
          } else {
            const data = await response.json();
            setAnimals(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, 600);
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onChange={handleDebounceSearch}
        className="search-input"
      />
      {/* Display the result if search term is not empty and results are present */}
      {inputRef.current?.value && animals.length > 0 && (
        <ul>
          {animals.map((animal) => {
            return <li key={animal.id}>{animal.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
