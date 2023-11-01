import { useState } from "react";
import ChampionsList from "./ChampionsList";
import StandardRoulette from "./StandardRoulette";
import EliminationRoulette from "./EliminationRoulette";

function Roulette() {
  const [selectedChampions, setSelectedChampions] = useState<
    { name: string; id: string; iconUrl: string }[]
  >([]);
  const [rouletteResult, setRouletteResult] = useState<string>("");
  const [mode, setMode] = useState("standard");

  function handleSelectChampion(champion: {
    name: string;
    id: string;
    iconUrl: string;
  }) {
    if (!selectedChampions.some((c) => c.id === champion.id)) {
      setSelectedChampions((prev) => [...prev, champion]);
    }
  }

  function handleRemoveChampion(id: string) {
    setSelectedChampions((prev) =>
      prev.filter((champion) => champion.id !== id)
    );
  }

  function removeAllChamps() {
    setSelectedChampions([]);
  }

  return (
    <div className={mode === "elimination" ? "elimination-theme" : ""}>
      <section className="selected-champion">
        <h3>Selected Champions:</h3>
        <ul>
          {selectedChampions.map((champion, index) => (
            <li key={index}>
              <span>{champion.name}</span>
              <img src={champion.iconUrl} alt={`${champion.name} icon`} />
              <button onClick={() => handleRemoveChampion(champion.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={removeAllChamps}>Remove All</button>
        </div>
      </section>

      <section className="chooseGameMode">
        <button onClick={() => setMode("standard")}>Standard Roulette</button>
        <button onClick={() => setMode("elimination")}>
          Elimination Roulette
        </button>
      </section>

      {mode === "standard" ? (
        <StandardRoulette
          selectedChampions={selectedChampions}
          onSpinResult={setRouletteResult}
        />
      ) : (
        <EliminationRoulette
          selectedChampions={selectedChampions}
          onEliminationResult={setRouletteResult}
          onRemoveChampion={handleRemoveChampion}
        />
      )}

      {rouletteResult && <h3 className="roulette_result">Roulette Result: {rouletteResult}</h3>}

      <ChampionsList
        onSelectChampion={handleSelectChampion}
        onRemoveChampion={handleRemoveChampion}
        selectedChampions={selectedChampions.map((c) => c.name)}
      />
    </div>
  );
}

export default Roulette;
