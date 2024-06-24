/**
 * Function that checks the highest id in the received param and returns one higher
 * @param {Array} items - Array of items
 * @returns {Number} highest id in the array
 */
function getHighestId(items) {
    return Math.max(...items.map(item => item.id));
}

module.exports = getHighestId;