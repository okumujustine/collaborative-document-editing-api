const DocumentSchema = require('../schema/Document')

async function addDocumentEditor(editorDetails) {
    const updateDocument = await DocumentSchema.updateOne({
        admin: editorDetails.adminId
        , _id: editorDetails.documentId
    },
        {
            $push: { editors: editorDetails.editorEmail }
        })

    return updateDocument
}


module.exports = {
    addDocumentEditor
}