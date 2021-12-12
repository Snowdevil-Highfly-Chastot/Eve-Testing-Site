function jitaSell() {
    console.log("jitaSell ran");
    let type_ids: string[] = getIds();
    let result = [];
    let safe_id_set = [];

    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=";
    const safe_item_limit = 200;
    const order_type = "sell";
    const order_level = "min";
    let safe_item_index = 0;

    // const 

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
    let type_ids = (document.getElementById("type_id_list") as HTMLInputElement).value.split("\n");
    if (type_ids == []) {
        alert("ID list must be filled out");
        return;
    }
    return type_ids;
}

async function getData(url: string, type_id_list: Array<string | number>, order_type: string, order_level: string) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let result = type_id_list.map(function (type_id) { return [data[type_id][order_type][order_level]]; });
            createTable(result);
        });
}

function createTable(array: Array<any>) {
    document.getElementById("result_container").style.display = '';
    var table = document.getElementById('results');
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < array[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = array[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

export default jitaSell;
