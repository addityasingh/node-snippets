const express = require('express');
const stylus = require('stylus');
const debug = require('debug')('node-cookbook');
const app = express();

app.get('/some.css', (req, res) => {
    debug('request for some.css')
    const css = stylus(`
        body
            color: red
    `).render();
    // const css1 = stylus(`
    //     body
    //         color: red
    // `).render();
    // const css2 = stylus(`
    //     body
    //         color: red
    // `).render();
    // const css3 = stylus(`
    //     body
    //         color: red
    // `).render();
    // const css4 = stylus(`
    //     body
    //         color: red
    // `).render();
    res.send(css);
});

app.listen(8090);