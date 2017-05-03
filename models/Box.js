/**
 * Represents a Box object
 * @param {*} value initial value of box
 */
var Box = class {
    constructor(value) {
        this.value = value
    }
    get value() {
        return this._value
    }
    set value(value) {
        this._value = value
    }
    toString() {
        return typeof this.value == 'string' ? this.value : ''
    }
}

if(typeof module != "undefined") module.exports = Box