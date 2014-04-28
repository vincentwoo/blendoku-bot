$ ->
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

  $('#example-1').prepend example1.render()

  setTimeout ->
    example1.animateSolution [
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
  , 2000

  blender = new Blender $('#blender'), 'ff0000', '00ff00'
