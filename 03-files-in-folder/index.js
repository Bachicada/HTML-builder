
const fs = require('fs');
const path = require('path');


let pathFinder = path.join(__dirname,'secret-folder');

fs.readdir(pathFinder, 
    { withFileTypes: true },
    (err, files) => {
    console.log("\nCurrent directory files:");
    if (err){
      console.log(err);
    }
 
    else { 
      files.forEach(file => {
        if (file.isFile()){
        let pathOfFile = path.join(pathFinder,file.name.toString());
        let name = file.name;
        let extension = path.extname(pathOfFile);
        fs.stat(pathOfFile,(err, stats)=>{
          size = stats.size;
        console.log(
            name.slice(0,name.lastIndexOf('.')) + ' - ' + extension.substr(1)+' - '+ (size/1024)+' kb'
        );
      
      })
    }
    }
      )
  }
  }
  )