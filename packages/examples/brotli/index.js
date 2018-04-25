const brotli = require('brotli');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const path = require('path');


init();

function compress(fileName, options) {
    // encode some data with options (default options shown) 
    const folderPath = path.join(__dirname, '..', 'brotli', 'testdata');
    const filePath = path.join(folderPath, fileName);

    const buffer = brotli.compress(fs.readFileSync(filePath), options);

    // Cleanup
    if (fs.exists(path.join(folderPath, `${fileName}.br`))) {
        fs.unlinkSync(path.join(folderPath, `${fileName}.br`));
        fs.unlinkSync(path.join(folderPath, `uncompressed-${fileName}`));
    }
    fs.writeFileSync(path.join(folderPath, `${fileName}.br`), buffer);
}

function compressGzip(fileName, options) {
    // encode some data with options (default options shown) 
    const folderPath = path.join(__dirname, '..', 'brotli', 'testdata');
    const filePath = path.join(folderPath, fileName);
    const inp = fs.createReadStream(filePath);
    const out = fs.createWriteStream(path.join(folderPath, `${fileName}.gz`));

    // Cleanup
    if (fs.exists(path.join(folderPath, `${fileName}.gz`))) {
        fs.unlinkSync(path.join(folderPath, `${fileName}.gz`));
    }

    inp.pipe(gzip).pipe(out);
}

function decompress(fileName) {
    const folderPath = path.join(__dirname, '..', 'brotli', 'testdata');
    const filePath = path.join(folderPath, fileName);

    // Cleanup
    if (fs.exists(path.join(folderPath, `uncompressed-${fileName}`))) {
        fs.unlinkSync(path.join(folderPath, `uncompressed-${fileName}`));
    }

    const decompressedBuffer = brotli.decompress(
        fs.readFileSync(path.join(folderPath, `${fileName}.br`))
    );

    fs.writeFileSync(path.join(folderPath, `uncompressed-${fileName}`), decompressedBuffer, 'UTF-8');
}

function decompressGzip(fileName) {
    const folderPath = path.join(__dirname, '..', 'brotli', 'testdata');
    const filePath = path.join(folderPath, fileName);

    // Cleanup
    if (fs.exists(path.join(folderPath, `unzipped-${fileName}`))) {
        fs.unlinkSync(path.join(folderPath, `unzipped-${fileName}`));
    }

    zlib.unzip(
        fs.readFileSync(path.join(folderPath, `${fileName}.br`)),
        (err, decompressedBuffer) => {
            if (!err) {
                fs.writeFileSync(
                    path.join(folderPath, `unzipped-${fileName}`), 
                    decompressedBuffer, 
                    'UTF-8'
                );
            }
        }
    );

}

function init() {
    const fileType = process.argv[2] || 'text';
    const fileName = process.argv[3];
    const mode = parseInt(process.argv[4], 10) || 1;
    const quality = parseInt(process.argv[5], 10) || 4;
    const lgwin = 22;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('>>>>>>>>>>>>>Compress<<<<<<<<<<<<');
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(`>>>>>File type: ${fileType}>>>>>>`);

    compressGzip(fileName, {
        mode, quality, lgwin
    });

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('>>>>>>>>>>>>>Decompress<<<<<<<<<<');
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    decompressGzip(fileName);
}
