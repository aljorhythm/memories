var app = angular.module('memories', [])
app.controller('gridController', function($scope) {
    var grid = new Grid(4, 6)
    grid.randomFill({
        numberOfCells : '10',
        value : '1'
    })
    console.log(grid.toString())
    $scope.grid = grid
})