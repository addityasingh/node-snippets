/**
 * Calculate the frequency of the data points in the series
 * @param {Object} acc 
 * @param {Number} s 
 */
function calculateFrequency(acc, s) {
    const index = acc.findIndex((a = {}) => a.value === s);

    if(index > -1 && acc[index]) {
        acc[index].frequency++
    } else {
        const element = {};
        element.frequency = 1
        element.value = s;
        acc.push(element);
    }

    return acc;
};

/**
 * Calculate the percentile and cumulative frequency
 * @param {*List of data points} series 
 */
function calculatePercentile(seriesLength) {
    return (acc, f) => {
        // [{value: 100, frequency: 99}, {value: 1012, frequency: 1}]
        if(f.value) {
            const result = {
                value: f.value,
                cumulativeFrequency: (f.frequency + acc.cumulativeFrequency),
                percentile: ((f.frequency + acc.cumulativeFrequency) / seriesLength)
            };
    
            acc.percentiles.push(result);
            acc.cumulativeFrequency += f.frequency;
        }
        
        return acc;
    }
}

/**
 * Find value at percentile
 * @param {*Number} percentile 
 * @param {*Array} percentiles 
 */
function getValueAtPercentile(percentile, percentiles) {
    const result = percentiles.find(p => {
        p.percentile > percentile
    }) || percentiles[percentiles.length - 1];
    return result
}


module.exports = {
    calculateFrequency,
    calculatePercentile,
    getValueAtPercentile,
}