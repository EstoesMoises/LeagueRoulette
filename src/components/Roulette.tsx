import { useState } from 'react';
import ChampionsList from './ChampionsList';
import StandardRoulette from './StandardRoulette';
import EliminationRoulette from './EliminationRoulette';

function ChampionRoulette() {
  const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
  const [rouletteResult, setRouletteResult] = useState<string>('');
  const [mode, setMode] = useState('standard'); // 'standard' or 'elimination'

  const handleSelectChampion = (name: string) => {
    if (!selectedChampions.includes(name)) {
      setSelectedChampions(prev => [...prev, name]);
    }
  };

  const handleRemoveChampion = (name: string) => {
    setSelectedChampions(prev => prev.filter(champion => champion !== name));
  };

  return (
    <div className={mode === 'elimination' ? 'elimination-theme' : ''}>
      <div className='selected-champion'>
      <h3>Selected Champions:</h3>
      <ul>
        {selectedChampions.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => handleRemoveChampion(name)}>Remove</button>
          </li>
        ))}
      </ul>
      </div>

      <button onClick={() => setMode('standard')}>Standard Roulette</button>
      <button onClick={() => setMode('elimination')}>Elimination Roulette</button>

      {mode === 'standard' ? (
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

      {rouletteResult && <h3>Roulette Result: {rouletteResult}</h3>}

      <ChampionsList
        onSelectChampion={handleSelectChampion}
        onRemoveChampion={handleRemoveChampion}
        selectedChampions={selectedChampions}
      />
    </div>
  );
}

export default ChampionRoulette;