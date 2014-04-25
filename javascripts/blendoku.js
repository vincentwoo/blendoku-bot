/*
God help ye, all who enter. We write better code than this, generally.
Checkout the github for the original coffeescript source.
*/
var Blendoku, example1, example2;

Blendoku = (function() {

  function Blendoku(_arg) {
    var cell, _i, _len, _ref,
      _this = this;
    this.rows = _arg.rows, this.cols = _arg.cols, this.cells = _arg.cells, this.colors = _arg.colors;
    this.grid = [];
    _.times(this.rows, function() {
      return _this.grid.push([]);
    });
    this.grid = _.map(this.grid, function() {
      var ret;
      ret = [];
      _.times(_this.cols, function() {
        return ret.push(null);
      });
      return ret;
    });
    _ref = this.cells;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cell = _ref[_i];
      this.grid[cell[0]][cell[1]] = cell[2] || false;
    }
    console.log('blendoku instantiated with grid:');
    console.log(this.grid);
  }

  Blendoku.prototype.render = function() {
    var cell, cellEl, el, row, rowEl, _i, _j, _len, _len2, _ref;
    el = $('<table/>');
    _ref = this.grid;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      rowEl = $('<tr/>');
      for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
        cell = row[_j];
        console.log(cell);
        cellEl = $("<td style=\"background: #" + cell + "\"></td>");
        if (cell === null) cellEl.css('border', 0);
        rowEl.append(cellEl);
      }
      el.prepend(rowEl);
    }
    return el;
  };

  return Blendoku;

})();

example1 = new Blendoku({
  rows: 4,
  cols: 7,
  cells: [[0, 0, 'a492c5'], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5, '4a6931'], [2, 2], [2, 3], [2, 4], [3, 3]],
  colors: []
});

$('#example-1').append(example1.render());

example2 = new Blendoku({
  rows: 4,
  cols: 7,
  cells: [[0, 0, 'a492c5'], [0, 1, '8c86a4'], [0, 2, '73758c'], [0, 3, '5a6973'], [0, 4, '425952'], [0, 5, '294d3a'], [0, 6, '103d21'], [1, 1, 'b5a6a4'], [1, 2, '9c9e84'], [1, 3, '8c926b'], [1, 4, '73864a'], [1, 5, '4a6931'], [2, 2, 'c5be84'], [2, 3, 'a4aa63'], [2, 4, '8c9e42'], [3, 3, 'd6db5b']],
  colors: []
});

$('#example-2').append(example2.render());
