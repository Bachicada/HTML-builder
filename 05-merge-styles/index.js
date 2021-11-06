const fs = require('fs');
const path = require('path');

let pathFinderBundle = path.join(__dirname,'project-dist','bundle.css');

const writtenStream = fs.createWriteStream(pathFinderBundle, 'utf-8');

let pathFinder = path.join(__dirname,'styles');

fs.readdir(pathFinder, 
    { withFileTypes: true },
    (err, files) => {

    if (err){
      console.log(err);
    }
 
    else { 
      files.forEach(file => {
        let pathOfFile = path.join(pathFinder,file.name.toString());
        let extension = path.extname(pathOfFile);

        if (file.isFile() && (extension.substr(1)==='css')){
            fs.createReadStream(pathOfFile, 'utf-8').pipe(writtenStream);
      }
    }
      )
    }
}
  )
