const fs = require('fs');

const saveToJSONFile = result =>{
    let jsonData= JSON.stringify(result);
    fs.writeFile("resultset.json",jsonData, error=>{
        if(error){
            console.log("ERROR! :", error);
        }else{
            console.log("File is successfully saved.");
        }
    })
}

module.exports={
    saveFile: saveToJSONFile
}