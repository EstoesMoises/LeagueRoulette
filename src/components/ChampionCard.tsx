type ChampionCardProps =  {
    name: string;
    title: string;
    iconUrl: string;
    onSelect?: (name: string) => void;
}

function ChampionCard({name, title, onSelect}: ChampionCardProps) {

  function handleSelect () {
    if (onSelect) {
      onSelect(name);
    }
  }

  return (
    <div>
    <h1>{name}</h1>
    <p>{title}</p>
    <button onClick={handleSelect}>Select</button>
    </div>
  )
}

export default ChampionCard