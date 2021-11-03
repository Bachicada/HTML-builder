// Node.js program to demonstrate the
// fs.readdir() method

// Import the filesystem module
const fs = require('fs');
const path = require('path');

let pathFinder = path.join(__dirname,'secret-folder');
// Function to get current filenames
// in directory
fs.readdir(pathFinder, (err, files) => {
if (err){
	console.log(err);
}
else {
	console.log("\nCurrent directory filenames:");
	files.forEach(file => {
	console.log(file);
	})
}
})

// Function to get current filenames
// in directory with "withFileTypes"
// set to "true"

/*
fs.readdir(pathFinder,
{ withFileTypes: true },
(err, files) => 
console.log("\nCurrent directory files:");
if (err){
	console.log(err);
}
else {
	files.forEach(file => {
        let pathOfFile = path.join(__dirname,file.name.toString());
   
	console.log(
        file.name + '-' + path.extname(pathOfFile)+'-'+fs.stat(pathOfFile,(err, files) => {
            return fs.Stats.size } )
       
	)
})
}

)
*/
fs.readdir(pathFinder, 
    { withFileTypes: true },
    (err, files) => {
    console.log("\nCurrent directory files:");
    if (err){
      console.log(err);
    }
    else {
      files.forEach(file => {
        let pathOfFile = path.join(__dirname,file.name.toString());
        let size = fs.stat(pathOfFile,(err, stats) => {
            return fs.Stats.size });
        console.log(
            file.name + '-' + path.extname(pathOfFile)+'-'+size
        );
      })
    }
  }
  )