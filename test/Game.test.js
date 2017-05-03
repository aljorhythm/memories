Game = require('../models/Game.js')

QUnit.test("Test Game.reset", function(assert) {
    var game = new Game()
    var settings = {
        rowCount : 2,
        columnCount : 2,
        
    }
    game.reset(settings)
    assert.ok(game.grid != null, "Grid is not initiated")
    assert.equal(game.grid.numberOfCells, 4, "cannot get number of cells")

    settings.columnCount = 4
    game.reset(settings)
    assert.equal(game.grid.numberOfCells, 8, "cannot get number of cells")
})