###
God help ye, all who enter. We write better code than this, generally.
Checkout the github for the original coffeescript source.
###

_.mixin eachSlice: (obj, size, iterator, context) ->
  i = 0
  l = obj.length

  while i < l
    iterator.call context, obj.slice(i, i + size), i, obj
    i += size

class Blendoku

  @TEMPLATE: """
    <div class="blendoku">

      <table class="palette">
        <% _.eachSlice(palette, 7, function(row) { %>
          <tr>
            <% _.each(row, function(color) { %>
              <% if (color) { %>
                <td style="background: #<%= color %>"></td>
              <% } else { %>
                <td><span class="placeholder"></span></td>
              <% } %>
            <% }); %>
          </tr>
        <% }); %>
      </table>

      <table>
        <% _.each(grid.slice().reverse(), function(row) { %>
          <tr>
            <% _.each(row, function(cell) { %>
              <% if (cell) { %>
                <td style="
                  background: #<%= cell.color %>;
                  <%= cell.color ? 'border: 0' : '' %>
                ">
                  <% if (cell.locked) { %>
                    <span class="fui-lock"></span>
                  <% } %>
                </td>
              <% } else { %>
                <td style="border: 0"></td>
              <% } %>
            <% }); %>
          </tr>
        <% }); %>
      </table>

    </div>
  """

  constructor: ({@rows, @cols, @cells, @palette}) ->
    # grid[i][j] is the ith row, jth column from the bottom left to upper right
    @grid = _.times @rows, =>
      _.times @cols, -> null

    for cell in @cells
      @grid[cell[0]][cell[1]] = if cell[2]
        color: cell[2]
        locked: true
      else
        color: null
        locked: false

  set: (color, row, col) ->
    @palette[_.indexOf @palette, color] = null
    @grid[row][col].color = color

  render: ->
    $(_.template(@constructor.TEMPLATE, {@grid, @palette}))

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
  palette: ['8c9e42', 'c5be84', '9c9e84', '8c926b', 'a4aa63', 'b5a6a4', '5a6973', '8c86a4', '425952', '73758c', '103d21', '73864a', '294d3a', 'd6db5b']

el = example1.render()
$('#example-1').prepend el

solution = [
  ['8c86a4', 0, 1]
  ['73758c', 0, 2]
  ['5a6973', 0, 3]
  ['425952', 0, 4]
  ['294d3a', 0, 5]
  ['103d21', 0, 6]
  ['73864a', 1, 4]
  ['8c926b', 1, 3]
  ['9c9e84', 1, 2]
  ['b5a6a4', 1, 1]
  ['d6db5b', 3, 3]
  ['a4aa63', 2, 3]
  ['c5be84', 2, 2]
  ['8c9e42', 2, 4]
]

nextStep = (idx) ->
  return if idx == solution.length

  move = solution[idx]
  example1.set move[0], move[1], move[2]
  replace = example1.render()
  el.replaceWith replace
  el = replace

  setTimeout ->
    nextStep idx + 1
  , 750

setTimeout ->
  nextStep 0
, 2000
