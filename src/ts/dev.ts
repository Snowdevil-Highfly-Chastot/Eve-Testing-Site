import EveAPI from "./EveAPI/EveAPI";

const esi = new EveAPI();

const devGetJsonFromPromise = async () => {
    let test = await esi.fetchHistory("10000002", 35)
    for (let entry in test) {
        console.log(test[entry]);
    }
}

async function fetchHistory(region_id: string, type_id?: number) {
    const data = await fetch('')
}

export default devGetJsonFromPromise;
