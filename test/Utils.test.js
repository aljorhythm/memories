var utils = require('../utils/Utils.js')

QUnit.test( "Test utils.getRange", function( assert ) {
    // console.log('range(1, 5)=> ' + range(1, 5));
    // console.log('range(5, 1)=> ' + range(5, 1));
    // console.log('range(5, 5)=> ' + range(5, 5));
    // console.log('range(-5, 5)=> ' + range(-5, 5));
    // console.log('range(-10, 5, 5)=> ' + range(-10, 5, 5));
    // console.log('range(1, 5, 1, 2)=> ' + range(1, 5, 1, 2));
    assert.deepEqual(utils.getRange(1, 5), [1, 2, 3, 4 ,5], "Direction right, no negative")
})