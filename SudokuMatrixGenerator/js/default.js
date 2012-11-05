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
                        while (table_parent.childNodes.length > 0) {
                            table_parent.removeChild(table_parent.childNodes[0]);
                        }
                        table_parent.appendChild(label);
                        label.ondblclick = function () {
                            while (table_parent.childNodes.length > 0) {
                                table_parent.removeChild(table_parent.childNodes[0]);
                            }
                            table_parent.appendChild(create_number_picker());
                        }
                    }
                }
            }
        }
        return table;
    }

    function create_three_by_three_table() {
        var three_by_three_table = document.createElement("table");
        three_by_three_table.className = "ThreeByThreeTable";
        for (var i = 0; i < 3; ++i) {
            var trnode = document.createElement("tr");
            three_by_three_table.appendChild(trnode);
            for (var j = 0; j < 3; ++j) {
                var tdnode = document.createElement("td");
                trnode.appendChild(tdnode);
                tdnode.appendChild(create_number_picker());
            }
        }
        return three_by_three_table;
    }
	
    window.onloaded = function (args) {
        var sudoku_table = document.getElementById("SudokuTable");
        for (var i = 0; i < 3; ++i) {
            var trnode = document.createElement("tr");
            sudoku_table.appendChild(trnode);
            for (var j = 0; j < 3; ++j) {
                var tdnode = document.createElement("td");
                trnode.appendChild(tdnode);
                tdnode.appendChild(create_three_by_three_table());
            }
        }
		document.write("页面载入完成");
    };
