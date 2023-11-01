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
    function handleSpinResult (selectedChampionName: string) {
        if (selectedChampions.length > 1) {
            const championToEliminate = selectedChampions.find(
                (champ) => champ.name !== selectedChampionName
            );
            if (championToEliminate) {
                onRemoveChampion(championToEliminate.id);
            }
        }

        if (selectedChampions.length === 2) {
            // Now only the winner is left
            const winnerChampion = selectedChampions.find(
                (champ) => champ.name === selectedChampionName
            );
            if (winnerChampion) {
                onEliminationResult(winnerChampion.name);
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
