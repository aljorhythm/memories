Grid = require('../models/Grid.js')

var grid

QUnit.test( "Test Grid constructors, getters, setters, numberOfCellsWithValue, numberOfCells and toString()", function( assert ) {
    assert.throws(() => grid = new Grid(), (e) => e == "INVALID_GRID_SIZE",  "Invalid row size and col size")
    assert.throws(() => grid = new Grid(1), (e) => e == "INVALID_GRID_SIZE", "Invalid row size and col size")

    var rowSize = 2, columnSize = 2
    grid = new Grid(rowSize, columnSize)
    assert.equal(grid.cells.length, rowSize, "Correct number of rows initiated")
    assert.equal(grid.numberOfCells, 4, "Correct number of cells initiated")
    assert.ok(grid.cells.every((row) => row.length == columnSize), "Correct number of columns initiated")

    var expectedGrid = "|  |  |\n|  |  |"
    assert.equal(grid.toString(), expectedGrid, "toString() method")

    assert.throws(() => grid.setCellValue(-1, 0, '2'), "Invalid row index")
    assert.throws(() => grid.setCellValue(rowSize + 1, 0, '2'), "Invalid row index")
    assert.equal(0, grid.numberOfCellsWithValue, "No cells with value")

    assert.equal(grid, grid.setCellValue(0, 0, '3'), "Valid row and column index")
    assert.equal(1, grid.numberOfCellsWithValue, "1 cell with value")

    var expectedGrid = "| 3 |  |\n|  |  |"
    assert.equal(grid.toString(), expectedGrid, "toString() method " + JSON.stringify(grid.cells))
})

QUnit.test( "Test Grid.getRowColumnFromCellIndex()", function( assert ) {
    grid = new Grid(5, 6)
    assert.deepEqual(grid.getRowColumnFromCellIndex(0), {rowIndex : 0, columnIndex: 0}, "get row and column indexes from cell index 1")
    assert.deepEqual(grid.getRowColumnFromCellIndex(5), {rowIndex : 0, columnIndex: 5}, "get row and column indexes from cell index 2")
    assert.deepEqual(grid.getRowColumnFromCellIndex(6), {rowIndex : 1, columnIndex: 0}, "get row and column indexes from cell index 3")
    assert.deepEqual(grid.getRowColumnFromCellIndex(29), {rowIndex : 4, columnIndex: 5}, "get row and column indexes from cell index 3")
})

QUnit.test("Test Grid.randomFill() and Grid.numberOfCellsWithValue", function( assert ) {
    // check fill
    rowSize = 6, columnSize = 8
    grid = new Grid(rowSize, columnSize)
    grid.randomFill({
        numberOfCells : '20',
        value : '1'
    })
    assert.equal(grid.numberOfCellsWithValue, 20, "20 filled cells")
})