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
    const [championIcon, setChampionIcon] = useState("");

    function updateDisplay(currentIndex: number, speed: number) {
        setDisplayedChampion(selectedChampions[currentIndex].name);
        setChampionIcon(selectedChampions[currentIndex].iconUrl);
        const nextIndex = (currentIndex + 1) % selectedChampions.length;
        const nextSpeed = speed * (1.0 + 0.02 * selectedChampions.length); // Gradually increase the speed depending on the number of champions selected

        if (nextSpeed < 600) { // Keep updating until the speed reaches 600 milliseconds
            setTimeout(() => updateDisplay(nextIndex, nextSpeed), nextSpeed);
        } else {
            // Select the final champion
            const randomIndex = Math.floor(Math.random() * selectedChampions.length);
            const selectedChampion = selectedChampions[randomIndex];
            onSpinResult(selectedChampion.name);
            setDisplayedChampion(selectedChampion.name);
            setChampionIcon(selectedChampion.iconUrl);
            setIsSpinning(false);
        }
    }

    function spinRoulette() {
        if (selectedChampions.length > 1) {
            setIsSpinning(true);
            const initialSpeed = Math.max(20, 50 - selectedChampions.length); // Adjust initial speed based on the number of champions
            updateDisplay(0, initialSpeed);
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
