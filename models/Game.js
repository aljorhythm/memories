if(typeof module != "undefined") {
    Grid = require('./Grid.js')
}

var Game = class {
    constructor() {

    }
    get grid(){
        return this._grid
    }
    set grid(grid){
        this._grid = grid
    }
    reset(options) {
        var rowCount = options.rowCount
        var columnCount = options.columnCount
        this._grid = new Grid(rowCount, columnCount)
        if(options['randomFillSettings']){
            this._grid.randomFill(options['randomFillSettings'])
        }
        this._hiddenGrid = new Grid(rowCount, columnCount)
    }
    get minNumberOfCellsWithValue(){
        return Math.floor(this.grid.rowCount * this.grid.columnCount * 0.2)
    }
    
    get maxNumberOfCellsWithValue(){
        return Math.floor(this.grid.rowCount * this.grid.columnCount * 0.8)
    }
}

if(typeof module != "undefined") {
    module.exports = Game
}