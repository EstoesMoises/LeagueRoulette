import { useState, useEffect } from "react";
import { FetchChampionsData } from "../utils/champions";
import ChampionCard from "./ChampionCard";
import { Suspense } from "react";

type Champion = {
  name: string;
  id: string;
  title: string;
};

function ChampionsList() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setChampionsData();

    async function setChampionsData() {
      const data = await FetchChampionsData();
      setChampions(Object.values(data.data));
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return (
      <p>
        There was an error fetching the data from Riot's API, try again or
        contact the dev.
      </p>
    );
  } else {
    return (
      <>
        {champions.map((champion) => (
          <ChampionCard
            key={champion.id}
            name={champion.name}
            title={champion.title}
          />
        ))}
      </>
    );
  }
}

export default ChampionsList;
