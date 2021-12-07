function jitaSell(type_ids) {

    /*Set blank variables*/

    var type_ids = [];
    var result = [];
    var safe_id_set = [];

    /*configuration section*/

    const service_url = "https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=";
    const safe_item_limit = 200;
    const order_type = "sell";
    const order_level = "min";
    var safe_item_index = 0;
    var fuzz_price_data = "";

    /*Create data collection methods inside of an object*/

    var subFunctions = {
        getIds: function getFormListIds() {
            type_ids = document.getElementById("type_id_list").value.split("\n");
            if (type_ids == "") {
                alert("ID list must be filled out");
                return false;
            }
            return this.type_ids;
        }
        ,
        getData: function get(fuzz_price_data) {
            var Httpreq = new XMLHttpRequest(); // a new request
            Httpreq.open("GET", fuzz_price_data, false);
            Httpreq.send(null);
            return Httpreq.responseText;
        }
        ,
        createTable: function tableCreation(array) {
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
    }

    /*Collect ID's*/

    subFunctions.getIds();

    /*Return prices if under safe ID count*/

    if (type_ids.length < safe_item_limit) {
        fuzz_price_data = JSON.parse(subFunctions.getData(service_url + type_ids.join(",")));
        result = type_ids.map(function (type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; });
        console.log(result); //return
    } else {

        for (i = 0; i < type_ids.length; i++) {
            // Copy itemss into a Safe Array
            safe_id_set.push(type_ids[i]);

            //Once Full, Grab the data result
            if (safe_item_index > safe_item_limit) {
                fuzz_price_data = JSON.parse(subFunctions.getData(service_url + safe_id_set.join(",")));
                result = result.concat(safe_id_set.map(function (type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; }));

                //Reset the request buffer for the next set
                safe_item_index = 0;
                safe_id_set = [];
            }
            safe_item_index++;
        }

        // Capture overflow buffer
        if (safe_id_set.length > 0) {
            fuzz_price_data = JSON.parse(subFunctions.getData(service_url + safe_id_set.join(",")));
            result = result.concat(safe_id_set.map(function (type_id) { return [parseFloat(fuzz_price_data[type_id][order_type][order_level])]; }));
        }
        console.log(result); //return
    }

    subFunctions.createTable(result);


}
