const mongoose = require('mongoose')
const express = require('express');
const {
    port,
    mongoDBURL,
    socketOrigin
} = require('./src/constants')

const app = express();
const http = require('http').Server(app);
const cors = require('cors')
const io = require('socket.io')(http, {
    cors: {
        origin: socketOrigin,
        method: ['GET', 'POST']
    }
})

const DocumentSchema = require('./src/document/schema/Document')
const { findDocument, findMyDocuments, findDocumentById } = require('./src/document/operations/find')
const { findOrCreateUser } = require('./src/user/operations/find')
const { createDocument } = require('./src/document/operations/create')
const { addDocumentEditor } = require('./src/document/operations/update')

app.use(express.json());
app.use(cors())


mongoose.connect(mongoDBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("connected to database"))
    .catch(err => console.log("failed to connect to database", err))


io.on("connection", socket => {
    socket.on('get-document', async ({ documentId, email }) => {

        const document = await findDocument({ documentId, email })

        socket.join(documentId)

        socket.emit('load-document', document.data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on('save-document', async data => {
            await DocumentSchema.findByIdAndUpdate(documentId, { data })
        })

    })
})

app.post('/test-availability', async function (req, res) {
    res.status(200).send({ available })
})

app.post('/auth', async function (req, res) {
    const user = await findOrCreateUser(req.body.user)
    res.status(200).send({ user })
})

app.post('/find-document', async function (req, res) {
    const { documentId, email } = req.body
    const document = await findDocument({ documentId, email })

    if (!document) return res.status(400).send({ data: "Failed to find document" })
    return res.status(200).send({ document })
})

app.post('/my-documents', async function (req, res) {
    const documents = await findMyDocuments(req.body)
    if (!documents) return res.status(400).send({ data: "Failed to find your documents" })
    return res.status(200).send({ documents: documents })
})

app.post('/add-document', async function (req, res) {
    const newDoc = await createDocument(req.body)
    const document = await findDocumentById(newDoc._id)
    return res.status(200).send({ document })
})

app.post('/add-editor', async function (req, res) {
    const editorDetails = req.body
    await addDocumentEditor(editorDetails)
    updatedDocument = await findDocumentById(editorDetails?.documentId)
    return res.status(200).send({ document: updatedDocument })
})

http.listen(port, function () {
    console.log('listening on *:3001');
});
