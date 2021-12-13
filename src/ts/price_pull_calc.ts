import FuzzyData from "./EveAPI/obj/fuzzy_data";
import FuzzyItem from "./EveAPI/obj/fuzzy_item";

function jitaSell() {
    console.log("jitaSell ran");
    let type_ids: string[] = getIds();
    let safe_id_set = [];

    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=";
    const safe_item_limit = 200;
    const order_type = "sell";
    const order_level = "min";
    let safe_item_index = 0;

    if (!type_ids) { return; }

    /*Return prices if under safe ID count*/

    if (type_ids.length < safe_item_limit) {
        fetchAndDisplayData((service_url + type_ids.join(",")), type_ids, order_type, order_level);
    } else {
        for (let i = 0; i < type_ids.length; i++) {
            safe_id_set.push(type_ids[i]); // Copy items into a Safe Array
            if (safe_item_index >= safe_item_limit) { //Once Full, Grab the data result
                fetchAndDisplayData((service_url + safe_id_set.join(",")), safe_id_set, order_type, order_level);
                safe_item_index = 0; //Reset the request buffer for the next set
                safe_id_set = [];
            }
            safe_item_index++;
        }
        if (safe_id_set.length > 0) { // Capture overflow buffer
            fetchAndDisplayData((service_url + safe_id_set.join(",")), safe_id_set, order_type, order_level);
        }
    }
}


/*Create data collection/distribution methods*/

function getIds(): string[] {
    let type_ids = (document.getElementById("type_id_list") as HTMLInputElement).value
        .split("\n")
        .filter(val => {
            let value = val.trim();
            if (val !== '') { return true; }
        });
    if (!type_ids || !type_ids.length) {
        alert("ID list must be filled out");
        return null;
    }
    return type_ids;
}

async function fetchAndDisplayData(url: string, type_id_list: Array<string>, order_type: string, order_level: string) {
    const resp = await fetch(url);
    const data: Array<FuzzyItem> = await resp.json();
    console.log(data)
    for (let item in data) {
        console.log(data[item].sell.min)
    }
    createSellPriceTable(data);
}

function clearTable() {
    let table = document.getElementById('result_table');
    table.innerHTML = '';

}  

function createSellPriceTable(data: Array<FuzzyItem>): void {
    clearTable();
    document.getElementById("result_container").style.display = '';
    let table = document.getElementById('result_table');

    const headers = [
        "ID",
        "Min",
        "Avg",
        "Max"
    ];

    let table_header = document.createElement('thead');
    table_header.id = 'result_header';
    let header_row = document.createElement('tr');

    for (let col in headers) {
        let cell = document.createElement('th');
        cell.textContent = headers[col];
        header_row.appendChild(cell);
    }

    table_header.appendChild(header_row);
    table.appendChild(table_header);

    let table_body = document.createElement('tbody');
    table_body.id = 'result_body';

    for (const item in data) {
        const body_row = document.createElement('tr');
        const id_cell = document.createElement('td');
        id_cell.textContent = item;
        body_row.appendChild(id_cell);

        const sell_data = data[item].sell;
        const valuesOfInterest = [
            "min",
            "weightedAverage",
            "max"
        ]

        for (let value in valuesOfInterest) {
            const val = valuesOfInterest[value] as keyof FuzzyData;
            let cell = document.createElement('td');
            cell.textContent = (sell_data[val] as unknown) as string;
            body_row.appendChild(cell);
        }

        console.log(sell_data);
        table_body.appendChild(body_row);
    }

    table.appendChild(table_body);
}

export default jitaSell;
