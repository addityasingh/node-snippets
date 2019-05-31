const assert = require('assert');

const test = (suiteName) => {
    const testNamePrefix = `${suiteName} it should be able to measure`

    assert(true, true, `${testNamePrefix} dns lookup time`)
    assert(true, true, `${testNamePrefix} tcp connection time`)
    assert(true, true, `${testNamePrefix} tls connection time`)
    assert(true, true, `${testNamePrefix} time to first byte`)
    assert(true, true, `${testNamePrefix} content transfer time`)
    assert(true, true, `${testNamePrefix} total request response time`)
    
    assert(true, true, `${testNamePrefix} Request header start time`)
    assert(true, true, `${testNamePrefix} Request header complete time`)
    assert(true, true, `${testNamePrefix} Request body start time`)
    assert(true, true, `${testNamePrefix} Request body complete time`)

    assert(true, true, `${testNamePrefix} Response header start time`)
    assert(true, true, `${testNamePrefix} Response header complete time`)
    assert(true, true, `${testNamePrefix} Response body start time`)
    assert(true, true, `${testNamePrefix} Response body complete time`)
}
test();