const devGetJsonFromPromise = () => {
    let devElement = document.getElementById("type_id_list")
    console.log(devElement)
}



// function _getIds() {
//     let type_ids = document.getElementById("type_id_list").value.split("\n");
//     if (type_ids == "") {
//         alert("ID list must be filled out");
//         return false;
//     }
//     return type_ids;
// }

async function _getData(url: RequestInfo, type_id_list: (string | number)[], order_type: string | number, order_level: string | number) {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let result = type_id_list.map(function (type_id: string | number) { return [data[type_id][order_type][order_level]]; });
        _createTable(result);
    });
}

function _createTable(array: string | any[]) {
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