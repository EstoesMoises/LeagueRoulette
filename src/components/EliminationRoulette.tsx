import SpinRoulette from './StandardRoulette'; 

type EliminationRouletteProps = {
  selectedChampions: string[];
  onEliminationResult: (result: string) => void;
  onRemoveChampion: (name: string) => void;
};

function EliminationRoulette({
  selectedChampions,
  onEliminationResult,
  onRemoveChampion,
}: EliminationRouletteProps) {
  const handleSpinResult = (eliminatedChampion: string) => {
    onRemoveChampion(eliminatedChampion);

    if (selectedChampions.length === 2) {
      const remainingChampion = selectedChampions.find(
        (champ) => champ !== eliminatedChampion
      );
      if (remainingChampion) {
        onEliminationResult(remainingChampion);
      }
    }
  };

  return (
    <div className="roulette-container">
      <SpinRoulette selectedChampions={selectedChampions} onSpinResult={handleSpinResult} />
      <p>Eliminate champs randomly until only one is left.</p>
    </div>
  );
};

export default EliminationRoulette;