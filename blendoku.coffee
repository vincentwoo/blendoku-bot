###
God help ye, all who enter. We write better code than this, generally.
Checkout the github for the original coffeescript source.
###

class Blendoku

  constructor: ({@rows, @cols, @cells, @colors}) ->
    @grid = [] # grid[i][j] is the ith row, jth column from the bottom left to upper right
    _.times @rows, => @grid.push []
    @grid = _.map @grid, () =>
      ret = []
      _.times @cols, -> ret.push null
      ret
    for cell in @cells
      @grid[cell[0]][cell[1]] = cell[2] || false
    console.log 'blendoku instantiated with grid:'
    console.log @grid

  render: ->
    el = $('<table/>')
    for row in @grid
      rowEl = $('<tr/>')
      for cell in row
        console.log cell
        cellEl = $("<td style=\"background: ##{cell}\"></td>")
        cellEl.css('border', 0) if cell == null
        rowEl.append cellEl
      el.prepend rowEl
    el

example1 = new Blendoku
  rows: 4
  cols: 7
  cells: [
    [0, 0, 'a492c5']
    [0, 1]
    [0, 2]
    [0, 3]
    [0, 4]
    [0, 5]
    [0, 6]
    [1, 1]
    [1, 2]
    [1, 3]
    [1, 4]
    [1, 5, '4a6931']
    [2, 2]
    [2, 3]
    [2, 4]
    [3, 3]
  ]
  colors: []

$('#example-1').append example1.render()

example2 = new Blendoku
  rows: 4
  cols: 7
  cells: [
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
  ]
  colors: []

$('#example-2').append example2.render()
