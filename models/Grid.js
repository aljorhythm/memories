if(typeof module != 'undefined'){
    Box = require('./Box.js')
    Utils = require('../utils/Utils.js')
}
/**
 * Represents a grid with same length and height
 * @param {*} rowSize number of rows for grid
 * @param {*} columnSize number of columns for grid
 */
var Grid = class {
    constructor(rowSize, columnSize){
        if(arguments.length != 2 || rowSize < 1 || columnSize < 1){
            throw "INVALID_GRID_SIZE"
        }
        this.cells = new Array(rowSize)
        for(var i = 0; i < rowSize; i++){
            this.cells[i] = new Array(columnSize)
            for(var j = 0; j < columnSize; j++){
                this.cells[i][j] = new Box()
            }
        }
    }
    get cells(){
        return this._cells
    }
    set cells(cells){
        this._cells = cells
    }
    rowSize(){
        return this.cells.length
    }
    columnSize(){
        return this.cells[0].length
    }
    numberOfCells(){
        return this.rowSize() * this.columnSize()
    }
    setCellValue(rowIndex, colIndex, value){
        if(rowIndex < 0 || colIndex < 0 || rowIndex >= this.rowSize() || colIndex >= this.columnSize()){
            throw "INVALID_CELL_INDEX"
        }
        var getValue
        if(typeof value != 'function'){
            getValue = () => value
        }
        this.cells[rowIndex][colIndex].value = getValue()
        return this
    }
    getNumberOfCellsWithValue(){
        var count = 0;
        for(var i = 0; i < this.cells.length; i++){
            var row = this.cells[i]
            for(var j = 0; j < row.length; j++){
                count += (typeof row[j].value != 'undefined' ? 1 : 0)
            }
        }
        return count
    }
    randomFill(options){
        if(!options){
            options['percentage'] = 0.2
        }
        if(options['percentage']){
            options['numberOfCells'] = options['percentage'] * this.numberOfCells
        }
        var range = Utils.getRange(0, this.numberOfCells() - 1)
        var selectedCells = Utils.getRandomSubarray(range, options['numberOfCells'])
        selectedCells.forEach((cellIndex) => {
            var rowColIndex = this.getRowColumnFromCellIndex(cellIndex)
            this.setCellValue(rowColIndex['rowIndex'], rowColIndex['columnIndex'], options['value'])
        })
    }
    toString(){
        return this.cells.map((row) =>
            '|' + row.map((box) => box.toString()).join('|') + '|'
        ).join("\n")
    }
    getRowColumnFromCellIndex(cellIndex){
        return {
            rowIndex : Math.floor(cellIndex / this.columnSize()),
            columnIndex : Math.floor(cellIndex % this.columnSize())
        }
    }
}

if(typeof module != "undefined") module.exports = Grid