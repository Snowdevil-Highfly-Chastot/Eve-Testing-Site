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
        getData((service_url + type_ids.join(",")), type_ids, order_type, order_level);
    } else {
        for (let i = 0; i < type_ids.length; i++) {
            safe_id_set.push(type_ids[i]); // Copy items into a Safe Array
            if (safe_item_index >= safe_item_limit) { //Once Full, Grab the data result
                getData((service_url + safe_id_set.join(",")), safe_id_set, order_type, order_level);
                safe_item_index = 0; //Reset the request buffer for the next set
                safe_id_set = [];
            }
            safe_item_index++;
        }
        if (safe_id_set.length > 0) { // Capture overflow buffer
            getData((service_url + safe_id_set.join(",")), safe_id_set, order_type, order_level);
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

async function getData(url: string, type_id_list: Array<string>, order_type: string, order_level: string) {
    const resp = await fetch(url);
    const data = await resp.json();
    const sellValues = type_id_list.map(function (type_id) {
        let min_sell = [data[type_id][order_type][order_level]];
        return min_sell;
    });
    createSellPriceTable(sellValues);
}

function clearTable() {
    let table = document.getElementById('result_body');
    table.innerHTML = '';
}

function createSellPriceTable(array: Array<any>): void {
    clearTable();
    document.getElementById("result_container").style.display = '';
    let table = document.getElementById('result_body');
    for (let i = 0; i < array.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < array[i].length; j++) {
            let cell = document.createElement('td');
            cell.textContent = array[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

export default jitaSell;
