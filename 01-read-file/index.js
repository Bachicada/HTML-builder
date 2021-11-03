const fs = require('fs');
const path = require('path');

let pathFinder = path.join(__dirname,'text.txt');

const stream = fs.createReadStream(pathFinder, 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
