const path = require("path");
const fs = require("fs");
const { ifError } = require("assert");

//create folder function
const createfolder = (folder)=>{
    const folderpath = path.join(__dirname, folder);
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath, { recursive: true});
        
    } else {
        console.log("Folder Already Exists: ", folderpath);        
    }

}

//create a file
const createfile = (folderDir,file)=>{

    const dirPath = folderDir;
    const filepath = path.join(__dirname,folderDir, file)
    // Check if the file already exists
    if (!fs.existsSync(filepath)) {

        //Buffer.allloc(0), utf-8
        fs.writeFileSync(filepath,'',Buffer.alloc(0));    
        console.log("File Created: ", filepath);
        return;
    } else {
        console.log("File already Exists: ", filepath);
    }
}

module.exports = {createfolder, createfile};
