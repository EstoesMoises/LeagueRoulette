import { useState } from "react";

type Props = {
  selectedChampions: string[];
  onSpinResult: (result: string) => void;
};

function SpinRoulette ({ selectedChampions, onSpinResult }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedChampion, setDisplayedChampion] = useState("");

  function spinRoulette () {
    if (selectedChampions.length > 0) {
      setIsSpinning(true);
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        setDisplayedChampion(selectedChampions[currentIndex]);
        currentIndex = (currentIndex + 1) % selectedChampions.length;
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * selectedChampions.length);
        const selectedChampion = selectedChampions[randomIndex];
        onSpinResult(selectedChampion);
        setDisplayedChampion(selectedChampion);
        setIsSpinning(false);
      }, 4000);
    } else {
      alert("Please select at least one champion!");
    }
  };

  return (
    <div>
      {displayedChampion && (
        <div className="champion-card">
          <img src={`https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${displayedChampion}.png`} alt={displayedChampion} className="champion-image" />
          <h3 className="champion-name">{displayedChampion}</h3>
        </div>
      )}
      <button onClick={spinRoulette} disabled={isSpinning}>
        {isSpinning ? "Spinning..." : "Spin Roulette"}
      </button>
    </div>
  );
};

export default SpinRoulette;