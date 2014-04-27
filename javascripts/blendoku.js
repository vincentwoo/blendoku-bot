/*
God help ye, all who enter. We write better code than this, generally.
Checkout the github for the original coffeescript source.
*/
var Blendoku, example1,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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

  Blendoku.TEMPLATE = "<div class=\"blendoku\">\n\n  <table class=\"palette\">\n    <% _.eachSlice(palette, 7, function(row) { %>\n      <tr>\n        <% _.each(row, function(color) { %>\n          <% if (color) { %>\n            <td style=\"background: #<%= color %>\"></td>\n          <% } else { %>\n            <td><span class=\"placeholder\"></span></td>\n          <% } %>\n        <% }); %>\n      </tr>\n    <% }); %>\n  </table>\n\n  <table>\n    <% _.each(grid.slice().reverse(), function(row) { %>\n      <tr>\n        <% _.each(row, function(cell) { %>\n          <% if (cell) { %>\n            <td style=\"\n              background: #<%= cell.color %>;\n              <%= cell.color ? 'border: 0' : '' %>\n            \">\n              <% if (cell.locked) { %>\n                <span class=\"fui-lock\"></span>\n              <% } %>\n            </td>\n          <% } else { %>\n            <td style=\"border: 0\"></td>\n          <% } %>\n        <% }); %>\n      </tr>\n    <% }); %>\n  </table>\n\n</div>";

  function Blendoku(_arg) {
    var cell, _i, _len, _ref,
      _this = this;
    this.rows = _arg.rows, this.cols = _arg.cols, this.cells = _arg.cells, this.palette = _arg.palette;
    this.animateSolution = __bind(this.animateSolution, this);
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

  Blendoku.prototype.set = function(color, row, col) {
    this.palette[_.indexOf(this.palette, color)] = null;
    return this.grid[row][col].color = color;
  };

  Blendoku.prototype.reset = function() {
    var cell, color, row, _i, _j, _len, _len2, _ref;
    this.palette = [];
    _ref = this.grid;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
        cell = row[_j];
        if (!cell || cell.locked) continue;
        color = cell.color;
        cell.color = null;
        this.palette.push(color);
      }
    }
    return this.palette = _.shuffle(this.palette);
  };

  Blendoku.prototype.render = function() {
    var replace;
    replace = $(_.template(this.constructor.TEMPLATE, {
      grid: this.grid,
      palette: this.palette
    }));
    if (this.$el) this.$el.replaceWith(replace);
    return this.$el = replace;
  };

  Blendoku.prototype.animateSolution = function(solution, repeat) {
    var nextStep,
      _this = this;
    if (repeat == null) repeat = true;
    nextStep = function(idx) {
      var move;
      if (idx == null) idx = 0;
      if (idx === solution.length) {
        if (repeat) {
          setTimeout(function() {
            _this.reset();
            return _this.render();
          }, 3000);
          setTimeout(nextStep, 5000);
        }
        return;
      }
      move = solution[idx];
      _this.set(move[0], move[1], move[2]);
      _this.render();
      return setTimeout(function() {
        return nextStep(idx + 1);
      }, 750);
    };
    return nextStep(0);
  };

  return Blendoku;

})();

example1 = new Blendoku({
  rows: 4,
  cols: 7,
  cells: [[0, 0, 'a492c5'], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5, '4a6931'], [2, 2], [2, 3], [2, 4], [3, 3]],
  palette: ['8c9e42', 'c5be84', '9c9e84', '8c926b', 'a4aa63', 'b5a6a4', '5a6973', '8c86a4', '425952', '73758c', '103d21', '73864a', '294d3a', 'd6db5b']
});

$('#example-1').prepend(example1.render());

setTimeout(function() {
  return example1.animateSolution([['8c86a4', 0, 1], ['73758c', 0, 2], ['5a6973', 0, 3], ['425952', 0, 4], ['294d3a', 0, 5], ['103d21', 0, 6], ['73864a', 1, 4], ['8c926b', 1, 3], ['9c9e84', 1, 2], ['b5a6a4', 1, 1], ['d6db5b', 3, 3], ['a4aa63', 2, 3], ['c5be84', 2, 2], ['8c9e42', 2, 4]]);
}, 2000);
