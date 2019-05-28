const assert = require("assert");

const {
    calculateFrequency,
    calculatePercentile,
    getValueAtPercentile,
} = require('./hdr-histogram');

const histogramMockData = require('./mocks/histogram-data');

const build = () => {
    let reservoir = [];

    return {
        reset: () => {
            reservoir = []
        },
        recordValue: (value) => {
            reservoir.push(value);
        },
        add: (snapshot)=> {
            reservoir.concat(snapshot);
        },
        getValueAtPercentile: (percentile) => {
            // sort the reservoir
            // calculate the frequency
            // calculate the cumulative frequency
            // calculate the rounded off percentile
            // calculate the percentile index
            const resultPercentiles = reservoir
            .sort((a, b) => a < b)
            .reduce(calculateFrequency, [{}])
            .sort((a, b) => a.value > b.value)
            .reduce(calculatePercentile(reservoir.length), {cumulativeFrequency: 0, percentiles: []});

            const result = resultPercentiles.percentiles
            .find(p => {
                return p.percentile >= percentile
            });

            //TODO: Remove this intermediate structure
            const percentileIndex = result 
              ? result 
              : percentile < resultPercentiles.percentiles[0]
                ? resultPercentiles.percentiles[0]
                : resultPercentiles.percentiles[resultPercentiles.percentiles.length - 1]

            return (percentileIndex || {}).value
        }
    }
}

const test = () => {
  const histogram = build();
  const series = Array.from({length: 99}).map(() => 100);
  series.push(1012);
  series.forEach(s => histogram.recordValue(s));
  
  assert.deepEqual(histogramMockData, {
    median: histogram.getValueAtPercentile(0.5),
    p90: histogram.getValueAtPercentile(0.90),
    p99: histogram.getValueAtPercentile(0.99),
    p999: histogram.getValueAtPercentile(0.999),
  }, "Histogram percentile calculation is incorrect")
};
test();
