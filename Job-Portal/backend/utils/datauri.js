import DataUriParser from 'datauri/parser.js'

import path from 'path'

const getDataUri = (file) =>{
    console.log("Converting file request come in function")
    const parser = new DataUriParser();
    console.log("this is parser" )
    const extName = path.extname(file.originalname).toString();
    console.log("this is extname" )
    console.log("this is file buffer" )
    return parser.format(extName, file.buffer);    
}


export default getDataUri;