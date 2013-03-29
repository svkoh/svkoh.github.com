window.matrix = create_9_by_9_matrix();
window.views = create_views();
window.pickers = create_pickers();

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

function create_views() {
    var n = 9;
    var rtn = [];
    for (var i = 0; i < n; ++i){
        rtn[i] = [];
        for (var j = 0; j < n; ++j){
            var view = document.createElement("div");
            view.i = i;
            view.j = j;
            view.id = "view_" + i + "_" + j;
            view.className = "view";
            var span = document.createElement("span");
            view.appendChild(span);
            view.update = function() {
                this.childNodes[0].innerText = window.matrix[this.i][this.j];
            }
            view.update();
            rtn[i][j] = view;
        }
    }
    return rtn;
}

function create_picker() {
    var picker = document.createElement("div");
    picker.className = "picker";

    var n = 3;
    for (var i = 0; i < n; ++i){
        var line = document.createElement("div");
        line.className = "picker-line";
        for (var j = 0; j < n; ++j){
            var unit = document.createElement("div");
            unit.className = "picker-unit";
            unit.innerText = i * 3 + j + 1;
            unit.picker = picker;
            line.appendChild(unit);
        }
        picker.appendChild(line);
    }
    return picker;
}

function create_pickers() {
    var n = 9;
    var rtn = [];
    for (var i = 0; i < n; ++i){
        rtn[i] = [];
        for (var j = 0; j < n; ++j){
            var picker = create_picker();
            picker.i = i;
            picker.j = j;
            picker.id = "picker_" + i + "_" + j;
            picker.className = "picker";
            rtn[i][j] = picker;
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

function draw_table(canvas) {
    var width = 422;
    var height = width;
    canvas.width = width;
    canvas.height = height;
    var line_thickness = 3;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();

    var base = 1;
    for (var i = 0; i < 3; ++i) {
        ctx.moveTo(0, base);
        ctx.lineTo(width, base);
        ctx.lineWidth = line_thickness;
        ctx.stroke();
        ctx.beginPath();

        for (var j = 0; j < 2; ++j) {
            ctx.moveTo(0, base + line_thickness + 45 * (j + 1) + j * 1);
            ctx.lineTo(width, base + line_thickness + 45 * (j + 1) + j * 1);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
        }

        ctx.moveTo(base, 0);
        ctx.lineTo(base, height);
        ctx.lineWidth = line_thickness;
        ctx.stroke();
        ctx.beginPath();

        for (var j = 0; j < 2; ++j) {
            ctx.moveTo(base + line_thickness + 45 * (j + 1) + j * 1, 0);
            ctx.lineTo(base + line_thickness + 45 * (j + 1) + j * 1, height);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
        }
        base += line_thickness + 137;
    }
    ctx.moveTo(0, base);
    ctx.lineTo(width, base);
    ctx.moveTo(base, 0);
    ctx.lineTo(base, height);
    ctx.lineWidth = line_thickness;
    ctx.stroke();
    ctx.beginPath();

    return canvas;
}

function create_sudoku_table() {
    var sudoku_table = document.createElement("div");
    sudoku_table.id = "sudoku_table";
    var canvas = document.createElement("canvas");
    canvas.id = "sudoku_canvas";
    draw_table(canvas);
    sudoku_table.appendChild(canvas);

    var base = 2;
    var offset_x = 0;
    var offset_y = 0;
    for (var i = 0; i < 9; ++i) {
        for (var j = 0; j < 9; ++j) {
            sudoku_table.appendChild(window.views[i][j]);
            $(window.views[i][j]).css({ left: base + offset_x, top: base + offset_y});
            sudoku_table.appendChild(window.pickers[i][j]);
            $(window.pickers[i][j]).css({ left: base + offset_x, top: base + offset_y});
            if ((j + 1) % 3 == 0) {
                offset_x += 48;
            } else {
                offset_x += 46;
            }
        }
        offset_x = 0;
        if ((i + 1) % 3 == 0) {
            offset_y += 48;
        } else {
            offset_y += 46;
        }
    }
    return sudoku_table;
}


function make_editable() {
    for (var i = 0; i < 9; ++i){
        for (var j = 0; j < 9; ++j){
            if (window.matrix[i][j] == 0) {
                $("#view_" + i + "_" + j).hide();
                $("#picker_" + i + "_" + j).show();
            } else {
                $("#view_" + i + "_" + j).show();
                $("#picker_" + i + "_" + j).hide();
            }
        }
    }
    $(".picker-unit").click(function () {
        var picker = this.picker;
        window.matrix[picker.i][picker.j] = this.innerText;
        $(picker).hide();
        $("#view_" + picker.i + "_" + picker.j)[0].update();
        $("#view_" + picker.i + "_" + picker.j).show();
        result_box.innerHTML = to_string();
    });
    $(".view").click(function () {
        window.matrix[this.i][this.j] = 0;
        $(this).hide();
        $("#picker_" + this.i + "_" + this.j).show();
        result_box.innerHTML = to_string();
    });   
}
	
window.onload = function () {
    var sudoku_panel = document.getElementById("sudoku_panel");
    sudoku_panel.appendChild(create_sudoku_table());
    make_editable();
};
