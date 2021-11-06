const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

let pathFinderCopy = path.join(__dirname,'files-copy');
let pathFinderOrigin = path.join(__dirname,'files');

async function copyDir(){
   
   fsPromises.mkdir(pathFinderCopy, { recursive: true });

   const filesCopied = await fsPromises.readdir(pathFinderCopy, {withFileTypes: true});
   const files = await fsPromises.readdir(pathFinderOrigin, {withFileTypes: true});

   for (let item of filesCopied){
      if(!(files.includes(item))){
         fsPromises.unlink(path.join(pathFinderCopy, item.name))
      }
   }
   
   for (let i = 0; i < files.length; i++){
      if (files[i].isFile()){
       const from = path.join(pathFinderOrigin, files[i].name);
       const to = path.join(pathFinderCopy, files[i].name);
        fsPromises.copyFile(from, to);
        }
   }
   console.log(filesCopied)

 
}
copyDir();