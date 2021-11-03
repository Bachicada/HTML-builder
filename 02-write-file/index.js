const fs = require('fs');
const path = require('path');
const rl = require('readline');
const { stdin, stdout } = process;

const RLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pathFinder = path.join(__dirname,'notes.txt');

const writtenStream = fs.createWriteStream(pathFinder, 'utf-8');

RLine.write('Напишите что-нибудь:\n');
RLine.on('line', (input) => {
 /* writtenStream.write(`${input}\n`);*/
  if (input ==='exit'){
    RLine.close();
  }
  else{
    writtenStream.write(`${input}` + '\n');
  }
});
RLine.on('close',()=>stdout.write('Удачи Вам, любви и терпения!Пока!'));

