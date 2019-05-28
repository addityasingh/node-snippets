const assert = require('assert');

const {
    calculateFrequency,
    calculatePercentile,
    getValueAtPercentile,
} = require('./hdr-histogram');

const frequencyDistribution = require('./mocks/frequency-distribution')
const percentileDistribution = require('./mocks/percentile-distribution')
const percentileResult = require('./mocks/percentile-result')

const test = () => {
    // test data setup
    const series = Array.from({length: 99}).map(() => 100);
    series.push(1012);

    // test createFrequency
    const resultFrequency = series.reduce(calculateFrequency, []);
    assert.deepEqual(resultFrequency, frequencyDistribution, "Frequency distribution is wrong")

    // test calculatePercentile
    const resultPercentileDistribution = resultFrequency.reduce(
        calculatePercentile(series), {cumulativeFrequency: 0, percentiles: []}
    )
    assert.deepEqual(resultPercentileDistribution, percentileDistribution, "Percentile Distribution is wrong")

    // test getValueAtPercentile
    const resultPercentile = getValueAtPercentile(0.92, resultPercentileDistribution.percentiles);
    assert.deepEqual(resultPercentile, percentileResult, "Percentile value is wrong")
};
test();