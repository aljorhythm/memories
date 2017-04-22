/**
 * Tests Box.js
 */
Box = require('../models/Box.js')

QUnit.test( "Test Box constructors, getters and setters", function( assert ) {
    var box = new Box()
    assert.ok(box.value == null, "Box default value is null")
    assert.ok(box.toString() == " ", "toString() returns ' ' if value is not string")
    box.value = '1'
    assert.ok(box.value == '1', "Box set value 1 get value 1")
    assert.equal(box.toString(), "1", "toString() is returning '" + box.toString() + "' instead of '1'")
})