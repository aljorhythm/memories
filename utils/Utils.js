var Utils = class{
    /**
     * http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
     */
    static getRange(start, end, step, offset) {
        var len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1
        var direction = start < end ? 1 : -1
        var startingPoint = start - (direction * (offset || 0))
        var stepSize = direction * (step || 1)
        
        return Array(len).fill(0).map(function(_, index) {
            return startingPoint + (stepSize * index)
        })
    }
    /**
     * http://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
     */
    static getRandomSubarray(arr, size) {
        var shuffled = arr.slice(0), i = arr.length, temp, index
        while (i--) {
            index = Math.floor((i + 1) * Math.random())
            temp = shuffled[index]
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
        }
        return shuffled.slice(0, size)
    }
    //http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
    static pad(pad, str, toPadLeft) {
        if (typeof str === 'undefined') 
            return pad;
        if (toPadLeft) {
            return (pad + str).slice(-pad.length);
        } else {
            return (str + pad).substring(0, pad.length);
        }
    }
}

if(typeof module != "undefined") module.exports = Utils