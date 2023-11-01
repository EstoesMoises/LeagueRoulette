import SpinRoulette from './StandardRoulette'; 

type Champion = {
    name: string;
    id: string;
    iconUrl: string;
  };
  
  type EliminationRouletteProps = {
    selectedChampions: Champion[];
    onEliminationResult: (result: string) => void;
    onRemoveChampion: (id: string) => void;
  };

function EliminationRoulette({
  selectedChampions,
  onEliminationResult,
  onRemoveChampion,
}: EliminationRouletteProps) {
    function handleSpinResult (eliminatedChampionId: string) {
        onRemoveChampion(eliminatedChampionId);
    
        if (selectedChampions.length === 2) {
            const remainingChampion = selectedChampions.find(
                (champ) => champ.id !== eliminatedChampionId
            );
            if (remainingChampion) {
                onEliminationResult(remainingChampion.name);
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