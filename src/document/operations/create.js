const { v4: uuidv4 } = require('uuid');

const DocumentSchema = require('../schema/Document')

 async function createDocument (document) {
    if(document == null) return;
    
    const newDocument = await DocumentSchema.create({
        _id: uuidv4(),
        admin: document.id,
        title: document.title,
        editors: [document.email],
        isReady: false,
        data: ""
    })
  
    return newDocument
}

module.exports = {
    createDocument
}