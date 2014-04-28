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

  reset: ->
    @palette = []
    for row in @grid
      for cell in row
        continue if !cell || cell.locked
        color = cell.color
        cell.color = null
        @palette.push color
    @palette = _.shuffle @palette

  render: ->
    replace = $(_.template(@constructor.TEMPLATE, {@grid, @palette}))
    @$el.replaceWith(replace) if @$el
    @$el = replace

  animateSolution: (solution, repeat = true) =>
    nextStep = (idx = 0) =>
      if idx == solution.length
        if repeat
          setTimeout =>
            @reset()
            @render()
          , 3000
          setTimeout nextStep, 5000
        return

      move = solution[idx]
      @set move[0], move[1], move[2]
      @render()

      setTimeout ->
        nextStep idx + 1
      , 750

    nextStep 0
