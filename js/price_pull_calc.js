function jitaSell(type_ids) {

    /*Set blank variables*/

    var type_ids = [];
    var result = [];
    var safe_id_set = [];

    /*Configuration section*/

    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=";
    const safe_item_limit = 200;
    const order_type = "sell";
    const order_level = "min";
    var safe_item_index = 0;
    var fuzz_price_data = "";

    /*Create data collection/distribution methods*/

    function getIds() {
        type_ids = document.getElementById("type_id_list").value.split("\n");
        if (type_ids == "") {
            alert("ID list must be filled out");
            return false;
        }
        return this.type_ids;
    }

    function getData(url) {
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", url, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }

    function createTable(array) {
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

    function getSellPrices(type_id_set) {
        fuzz_price_data = JSON.parse(getData(service_url + type_id_set.join(",")));
        result = type_id_set.map(function (type_id) { return [fuzz_price_data[type_id][order_type][order_level]]; });
        return result;
    }

    /*Collect ID's*/

    getIds();

    /*Return prices if under safe ID count*/

    if (type_ids.length < safe_item_limit) {

        result = getSellPrices(type_ids);
        createTable(result);

    } else {
        for (i = 0; i < type_ids.length; i++) {
            
            safe_id_set.push(type_ids[i]); // Copy items into a Safe Array

            if (safe_item_index > safe_item_limit) { //Once Full, Grab the data result
                
                result = result.concat(getSellPrices(safe_id_set)); 
                safe_item_index = 0; //Reset the request buffer for the next set
                safe_id_set = [];

            }
            safe_item_index++;
        }

        if (safe_id_set.length > 0) { // Capture overflow buffer
            result = result.concat(getSellPrices(safe_id_set));
        }
        createTable(result);
    }
}
