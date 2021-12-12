import EveAPI from "./EveAPI/EveAPI";


export default class Dev {
    
    esi = new EveAPI("Snowdevil-Price-Checker");

    devGetJsonFromPromise = async () => {
        let test = await this.esi.fetchHistory("10000002", 35)
        if (!test.length) {
            console.log("invalid id");
            return;
        }
        console.log(test);
    }
}
