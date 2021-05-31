
const DocumentSchema = require('../schema/Document')

async function findDocument({ documentId, email }) {
    if (documentId == null || email == null) return;
    const doc = await DocumentSchema.findOne({ _id: documentId, editors: { $in: email } })

    return await DocumentSchema.findOne({ $or: [{ _id: documentId, editors: { $in: email } }] })
}

async function findMyDocuments({ id: userId, email }) {
    if (userId == null) return;
    return await DocumentSchema.find({ $or: [{ admin: userId }, { editors: { $in: email } }] }).populate("admin").sort({ createdAt: -1 })
}

async function findDocumentById(id) {
    return await DocumentSchema.findOne({ _id: id }).populate("admin")
}

module.exports = {
    findDocument,
    findMyDocuments,
    findDocumentById
}