/*
God help ye, all who enter. We write better code than this, generally.
Checkout the github for the original coffeescript source.
*/
var Blendoku, el, example1;

_.mixin({
  eachSlice: function(obj, size, iterator, context) {
    var i, l, _results;
    i = 0;
    l = obj.length;
    _results = [];
    while (i < l) {
      iterator.call(context, obj.slice(i, i + size), i, obj);
      _results.push(i += size);
    }
    return _results;
  }
});

Blendoku = (function() {

  Blendoku.TEMPLATE = "<div class=\"blendoku\">\n\n  <table class=\"palette\">\n    <% _.eachSlice(palette, 7, function(row) { %>\n      <tr>\n        <% _.each(row, function(color) { %>\n          <td style=\"background: #<%= color %>\"></td>\n        <% }); %>\n      </tr>\n    <% }); %>\n  </table>\n\n  <table>\n    <% _.each(grid.slice().reverse(), function(row) { %>\n      <tr>\n        <% _.each(row, function(cell) { %>\n          <% if (cell) { %>\n            <td style=\"\n              background: #<%= cell.color %>;\n              <%= cell.color ? 'border: 0' : '' %>\n            \">\n              <% if (cell.locked) { %>\n                <span class=\"fui-lock\"></span>\n              <% } %>\n            </td>\n          <% } else { %>\n            <td style=\"border: 0\"></td>\n          <% } %>\n        <% }); %>\n      </tr>\n    <% }); %>\n  </table>\n\n</div>";

  function Blendoku(_arg) {
    var cell, _i, _len, _ref,
      _this = this;
    this.rows = _arg.rows, this.cols = _arg.cols, this.cells = _arg.cells, this.palette = _arg.palette;
    this.grid = _.times(this.rows, function() {
      return _.times(_this.cols, function() {
        return null;
      });
    });
    _ref = this.cells;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cell = _ref[_i];
      this.grid[cell[0]][cell[1]] = cell[2] ? {
        color: cell[2],
        locked: true
      } : {
        color: null,
        locked: false
      };
    }
  }

  Blendoku.prototype.render = function() {
    console.log(this.grid);
    return $(_.template(this.constructor.TEMPLATE, {
      grid: this.grid,
      palette: this.palette
    }));
  };

  return Blendoku;

})();

example1 = new Blendoku({
  rows: 4,
  cols: 7,
  cells: [[0, 0, 'a492c5'], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5, '4a6931'], [2, 2], [2, 3], [2, 4], [3, 3]],
  palette: ['8c9e42', 'c5be84', '9c9e84', '8c926b', 'a4aa63', 'b5a6a4', '5a6973', '8c86a4', '425952', '73758c', '103d21', '73864a', '294d3a', 'd6db5b']
});

el = example1.render();

$('#example-1').prepend(el);

/*
[0, 0, 'a492c5']
[0, 1, '8c86a4']
[0, 2, '73758c']
[0, 3, '5a6973']
[0, 4, '425952']
[0, 5, '294d3a']
[0, 6, '103d21']
[1, 1, 'b5a6a4']
[1, 2, '9c9e84']
[1, 3, '8c926b']
[1, 4, '73864a']
[1, 5, '4a6931']
[2, 2, 'c5be84']
[2, 3, 'a4aa63']
[2, 4, '8c9e42']
[3, 3, 'd6db5b']
*/
