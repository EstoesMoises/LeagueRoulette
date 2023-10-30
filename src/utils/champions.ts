export async function FetchChampionsData () {
    const response = await fetch ("https://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion.json");
    const data = await response.json();
    return data
}