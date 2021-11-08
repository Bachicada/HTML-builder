const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const templPath = path.join(__dirname,'template.html');
const projectPath = path.join(__dirname,'project-dist');
const indexPath = path.join(__dirname,'project-dist','index.html');
const compPath = path.join(__dirname,'components');


fs.mkdir(projectPath, { recursive: true },(err) => {
    if (err) throw err;
    });

async function createHTML(){

const tempIndex = await fsPromises.readFile(templPath, 'utf-8');
await fsPromises.writeFile(indexPath, tempIndex);
let myIndex = await fsPromises.readFile(indexPath, 'utf-8');

let rExp = /\{\{(.*?)\}\}/g;
const matchList = tempIndex.match(rExp);
const tagList = matchList.map(function(item){
  return item = item.slice(2, (item.length-2))
})

for (let tag of tagList){
  const tagText = await fsPromises.readFile(path.join(compPath, `${tag}.html`), 'utf8');
  myIndex= myIndex.replace(`{{${tag}}}`, tagText);
  
  await fsPromises.writeFile(indexPath,myIndex,'utf8');
}
//styles
let pathStyle= path.join(__dirname,'project-dist','style.css');

const writtenStream = fs.createWriteStream(pathStyle, 'utf-8');

let pathFinderStyles = path.join(__dirname,'styles');

fs.readdir(pathFinderStyles, 
    { withFileTypes: true },
    (err, files) => {

    if (err){
      console.log(err);
    }
 
    else { 
      files.forEach(file => {
        let pathOfFile = path.join(pathFinderStyles,file.name.toString());
        let extension = path.extname(pathOfFile);

        if (file.isFile() && (extension.substr(1)==='css')){
            fs.createReadStream(pathOfFile, 'utf-8').pipe(writtenStream);
      }
    });
    }
})

// assets
let pathFinderCopy = path.join(__dirname,'project-dist','assets');
let pathFinderOrigin= path.join(__dirname,'assets');

async function copyDir(){

    const files = await fsPromises.readdir(pathFinderOrigin, {withFileTypes: true});
    await fsPromises.mkdir(pathFinderCopy, { recursive: true });

    for(let file of files) {
        const fromPath = path.join(pathFinderOrigin, file.name);
        const toPath = path.join(pathFinderCopy, file.name);
        if(file.isDirectory()) {
            await copyDir();
        } else {
            await fsPromises.copyFile();
        }
    }
}

}
createHTML();


// assets
let pathFinderCopy = path.join(__dirname,'project-dist','assets');
let pathFinderOrigin= path.join(__dirname,'assets');

async function copyDir(){
  
await fsPromises.mkdir(pathFinderCopy, { 'recursive': true });
const copiedAs = await fsPromises.readdir(pathFinderCopy);
const folders = await fsPromises.readdir(pathFinderOrigin);

for (let item of copiedAs){
  if(!(folders.includes(item))){
     fsPromises.rmdir(path.join(pathFinderCopy, item))
  }
}

for (let folder of folders) {
  
  await fsPromises.mkdir(path.join(pathFinderCopy, folder), { 'recursive': true });
  
  const filesCopied = await fsPromises.readdir(path.join(pathFinderCopy, folder));
  const files = await fsPromises.readdir(path.join(pathFinderOrigin, folder));

  for (let item of filesCopied){
    if(!(files.includes(item))){
       fsPromises.unlink(path.join(pathFinderCopy,folder.toString(), item))
    }
 }

  files.forEach(file => {
    const from = path.join(pathFinderOrigin,folder.toString(), file);
    const to = path.join(pathFinderCopy, folder.toString(), file);
    fsPromises.copyFile(from, to);
  });
}
}

copyDir();


