import { useState, useEffect } from "react";
import { FetchChampionsData } from "../utils/champions";
import ChampionCard from "./ChampionCard";

type Champion = {
  name: string;
  id: string;
  title: string;
};

function ChampionsList() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, isLoading] = useState(true);
  const [CDNerror, setCDNerror] = useState(false);

  useEffect(() => {
    setChampionsData();
    async function setChampionsData() {
      try {
        const data = await FetchChampionsData();
        setChampions(Object.values(data.data));
        isLoading(false);
      } catch (error) {
        setCDNerror(true);
        isLoading(false);
        console.error(`Error fetching riot's API data, the error is: ${error}`);
      }
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else if (CDNerror) {
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
