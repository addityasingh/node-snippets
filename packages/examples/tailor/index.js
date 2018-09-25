const path = require('path');
const express = require('express')
const Tailor = require('node-tailor')


const tailorApp = express();
const fragment = express();
const tailor = new Tailor({
    templatesPath: path.join(__dirname, '/templates')
});

// Tailor server
tailorApp.get('/', (req, res) => {
    tailor.requestHandler(req, res);
})
tailorApp.listen(8080, () => console.log('Tailor server listening on port 8080'))

// Fragment server
fragment.get('/', (req, res) => {
    res.header('Content-Type', 'text/html')
    res.send('<div>Fragment 1</div>')
})
fragment.listen(8081, () => console.log('Fragment Server listening on port 8081'))