var app = angular.module('memories', [])

app.factory('UserService', function() {
    var User = class {
        constructor (name){
            this._name = name
        }
        get exists(){
            return (this.name) ? true : false;
        }
        set name(name){
            this._name = name
        }
        get name(){
            return this._name
        }
    }
    var user = null;
    return {
        User : User,
        userExists : () => user ? true : false,
        setUser : (_user) => user = _user
    }
})

app.factory('GameService', function() {
    var game = new Game()

    var defaultRandomFillSettings = { 
        percentage : 0.2,
        value : 'blue'
    }

    game.reset({ 
        rowCount: 4, 
        columnCount: 6, 
        randomFillSettings : defaultRandomFillSettings 
    })

    return {
        game : game,
        reset : (rowCount, columnCount, randomFillSettings) => {
            game.reset({ 
                rowCount: rowCount, 
                columnCount: columnCount, 
                randomFillSettings : randomFillSettings 
            })
        }
    }
})

app.controller('splashController', ['$scope', 'UserService', function($scope, userService) {
    $scope.service = userService
    var User = userService.User
    $scope.newUser = () => {
        userService.setUser(new User($scope.username))
    }
}])

app.controller('gridController', ['$scope', 'GameService', 'UserService', function($scope, gameService, userService) {
    $scope.userExists = userService.userExists

    var setScopeVariables = () => {
        var grid = gameService.game.grid
        $scope.game = gameService.game
        $scope.grid = grid
        $scope.rowCount = grid.rowCount
        $scope.columnCount = grid.columnCount
        $scope.numberOfCellsWithValue = grid.numberOfCellsWithValue
    }

    setScopeVariables()

    var GAME_STATES = {
        'NEW_GAME_SETTINGS' : 0
    }
    $scope.GAME_STATES = GAME_STATES
    $scope.gameState = GAME_STATES['NEW_GAME_SETTINGS']

    $scope.resetGame = () => { 
        gameService.reset($scope.rowCount, 
            $scope.columnCount,
            { 
                numberOfCells : $scope.numberOfCellsWithValue,
                value : 'blue'
            }
        )
        setScopeVariables()
    }

}])