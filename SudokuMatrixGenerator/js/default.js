window.matrix = create_9_by_9_matrix();

function create_9_by_9_matrix() {
    var n = 9;
    var rtn = [];
    for (var i = 0; i < n; ++i){
        rtn[i] = [];
        for (var j = 0; j < n; ++j){
            rtn[i][j] = "0";
        }
    }
    return rtn;
}

function to_string() {
    rtn = "";
    var n = 9;
    for (var i = 0; i < n; ++i){
        for (var j = 0; j < n; ++j){
            rtn += window.matrix[i][j] + " ";
        }
        rtn += "\n";
    }
    return rtn;
}

    function create_number_picker() {
        var table = document.createElement("table");
        table.className = "NumberPicker";
        for (var i = 0; i < 3; ++i) {
            var trnode = document.createElement("tr");
            table.appendChild(trnode);
            for (var j = 0; j < 3; ++j) {
                var tdnode = document.createElement("td");
                tdnode.className = "NumberPickerUnit";
                trnode.appendChild(tdnode);
                tdnode.innerText = i * 3 + j + 1;
                tdnode.onclick = function () {
                    var table_parent = table.parentElement;
                    if (table_parent != null) {
                        var label = document.createElement("label");
                        label.className = "NumberBoard";
                        label.innerText = this.innerText;
                        window.matrix[table.x][table.y] = this.innerText;
                        while (table_parent.childNodes.length > 0) {
                            table_parent.removeChild(table_parent.childNodes[0]);
                        }
                        table_parent.appendChild(label);
                        label.ondblclick = function () {
                            while (table_parent.childNodes.length > 0) {
                                table_parent.removeChild(table_parent.childNodes[0]);
                            }
                            table_parent.appendChild(create_number_picker());
                            window.matrix[table.x][table.y] = "0";
                        }
                    }
                    var result_box = document.getElementById("result_box");
                    result_box.innerHTML = to_string();
                }
            }
        }
        return table;
    }

    function create_nine_by_nine_table() {
        var nine_by_nine_table = document.createElement("table");
        nine_by_nine_table.className = "ThreeByThreeTable";
        for (var i = 0; i < 9; ++i) {
            var trnode = document.createElement("tr");
            nine_by_nine_table.appendChild(trnode);
            for (var j = 0; j < 9; ++j) {
                var tdnode = document.createElement("td");
                trnode.appendChild(tdnode);
                var temp = create_number_picker();
                temp.x = i;
                temp.y = j;
                tdnode.appendChild(temp);
            }
        }
        return nine_by_nine_table;
    }
	
    window.onload = function () {
        var sudoku_table = document.getElementById("SudokuTable");
        sudoku_table.appendChild(create_nine_by_nine_table());
    };
