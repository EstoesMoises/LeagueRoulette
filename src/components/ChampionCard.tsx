type ChampionCardProps =  {
    name: string;
    title: string;
}

function ChampionCard({name, title}: ChampionCardProps) {
  return (
    <div>
    <h1>{name}</h1>
    <p>{title}</p>
    </div>
  )
}

export default ChampionCard