if(typeof module != 'undefined'){
    Box = require('./Box.js')
    Utils = require('../utils/Utils.js')
}
/**
 * Represents a grid with same length and height
 * @param {*} rowCount number of rows for grid
 * @param {*} columnCount number of columns for grid
 */
var Grid = class {
    constructor(rowCount, columnCount){
        if(arguments.length != 2 || rowCount < 1 || columnCount < 1){
            throw "INVALID_GRID_SIZE"
        }
        this.cells = new Array(rowCount)
        for(var i = 0; i < rowCount; i++){
            this.cells[i] = new Array(columnCount)
            for(var j = 0; j < columnCount; j++){
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
    get rowCount() {
        return this.cells.length
    }
    get columnCount() {
        return this.cells[0].length
    }
    get numberOfCells() {
        return this.rowCount * this.columnCount
    }
    setCellValue(rowIndex, colIndex, value) {
        if(rowIndex < 0 || colIndex < 0 || rowIndex >= this.rowCount || colIndex >= this.columnCount){
            throw "INVALID_CELL_INDEX"
        }
        var getValue
        if(typeof value != 'function'){
            getValue = () => value
        }
        this.cells[rowIndex][colIndex].value = getValue()
        return this
    }
    get numberOfCellsWithValue(){
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
            options = {}
        }
        if(!options['numberOfCells']){
            options['percentage'] = 0.2
        }
        if(options['percentage']){
            options['numberOfCells'] = Math.floor(options['percentage'] * this.numberOfCells)
        }
        var range = Utils.getRange(0, this.numberOfCells - 1)
        var selectedCells = Utils.getRandomSubarray(range, options['numberOfCells'])
        selectedCells.forEach((cellIndex) => {
            var rowColIndex = this.getRowColumnFromCellIndex(cellIndex)
            this.setCellValue(rowColIndex['rowIndex'], rowColIndex['columnIndex'], options['value'])
        })
    }
    toString(){
        return this.cells.map((row) =>
            '|' + row.map((box) => ' ' + box.toString() + ' ').join('|') + '|'
        ).join("\n")
    }
    getRowColumnFromCellIndex(cellIndex){
        return {
            rowIndex : Math.floor(cellIndex / this.columnCount),
            columnIndex : Math.floor(cellIndex % this.columnCount)
        }
    }
}

if(typeof module != "undefined") module.exports = Grid