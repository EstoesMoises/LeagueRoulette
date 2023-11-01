import { useState } from "react";

type Champion = {
    name: string;
    id: string;
    iconUrl: string;
  };
  
  type Props = {
    selectedChampions: Champion[];
    onSpinResult: (result: string) => void;
  };

function SpinRoulette ({ selectedChampions, onSpinResult }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedChampion, setDisplayedChampion] = useState("");
  const [championIcon, setChampionIcon] = useState("")

  function spinRoulette () {
    if (selectedChampions.length > 1) {
      setIsSpinning(true);
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        setDisplayedChampion(selectedChampions[currentIndex].name);
        setChampionIcon(selectedChampions[currentIndex].iconUrl);
        currentIndex = (currentIndex + 1) % selectedChampions.length;
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * selectedChampions.length);
        const selectedChampion = selectedChampions[randomIndex];
        onSpinResult(selectedChampion.name);
        setDisplayedChampion(selectedChampion.name);
        setChampionIcon(selectedChampion.iconUrl);
        setIsSpinning(false);
      }, 4000);
    } else {
      alert("Please select at least two champions!");
    }
  };

  return (
    <div>
      {displayedChampion && (
        <div className="champion-card">
          <img src={championIcon} alt={displayedChampion} className="champion-image" />
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