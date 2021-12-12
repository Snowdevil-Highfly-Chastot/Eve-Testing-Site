import HistoryItem from "./obj/history_item";

class EveAPI {

    /** @readonly */
    esiBaseUrl: string = "https://esi.evetech.net/latest";
    userAgent: string;

    /**
     * @param {string} userAgent - A string to identify the program to the API.
     */
    constructor(userAgent: string) {
        this.userAgent = userAgent;
    }

    /**
     * 
     * @param region_id ID number for a region in New Eden.
     * @param type_id Type ID for an item in Eve Online.
     * @returns An array of {HistoryItem}s.
     */
    async fetchHistory(region_id: string, type_id: number): Promise<HistoryItem[]> {
        const endpoint = `/markets/${region_id}/history/`
        const query = (type_id) ? `?datasource=tranquility&type_id=${type_id}` : "?datasource=tranquility";
        const url = this.esiBaseUrl + endpoint + query;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": this.userAgent
            }
        });
        const data: Array<HistoryItem> = await response.json();
        return data;
    }
}

export default EveAPI;