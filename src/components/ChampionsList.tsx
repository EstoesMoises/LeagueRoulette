import { useState, useEffect } from "react";
import { FetchChampionsData } from "../utils/champions";
import ChampionCard from "./ChampionCard";

type Champion = {
  name: string;
  id: string;
  title: string;
};

type ChampionListProps = {
  onSelectChampion: (champion: { name: string; id: string }) => void;
  onRemoveChampion: (name: string) => void;
  selectedChampions: string[];
}

function ChampionsList({onSelectChampion, selectedChampions}: ChampionListProps) {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, isLoading] = useState(true);
  const [CDNerror, setCDNerror] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
  
  const filteredChampions = champions.filter((champion) =>
  champion.name.toLowerCase().includes(searchTerm.toLowerCase())
);


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
        <section className="searchBar">
          <input
            type="text"
            placeholder="Search champion..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </section>
        
        <section>
          {filteredChampions.map((champion) => {
            if (!selectedChampions?.includes(champion.name)) {
              const iconUrl = `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${champion.id}.png`;
              return (
                <ChampionCard
                  key={champion.id}
                  name={champion.name}
                  title={champion.title}
                  onSelect={() => onSelectChampion({name: champion.name, id: champion.id})}
                  iconUrl={iconUrl}
                />
              );
            }
            return null;
          })}
        </section>
      </>
    );
}}


export default ChampionsList;
