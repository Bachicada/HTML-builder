const fs = require('fs');
const path = require('path');

const templPath = path.join(__dirname,'template.html');
const projectPath = path.join(__dirname,'project-dist');
const indexPath = path.join(__dirname,'project-dist','index.html');
const compPath = path.join(__dirname,'components');

fs.mkdir(projectPath, { recursive: true },(err) => {
    if (err) throw err;
    });

fs.readFile(templPath, 'utf8', function (err,data) {
  if (err) {
    console.log(err);
  }
  /*let readStream = fs.createReadStream(path.join(compPath))*/
  let regExp = /\{\{[A-z]\}\}/g;
  
  fs.readdir(compPath,{ withFileTypes: true },(err, files) => {
    if (err){
      console.log(err);
    }
    else { 
      files.forEach(file => {
        if (file.isFile()){
        let pathOfFile = path.join(compPath,file.name);
        let readStream = fs.createReadStream(pathOfFile,'utf-8');
        }

    }
}
  let result = data.replace(regExp, `$`) ;

  fs.writeFile(indexPath, result, 'utf8', function (err) {
     if (err) console.log(err);
  });
});