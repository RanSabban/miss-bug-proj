import express from 'express'
import { bugService } from './services/bug.service.js'
import cookieParser from 'cookie-parser'
import { loggerService } from './services/logger.service.js'
const app = express()

// exppress config

app.use(express.static('public'))
app.use(cookieParser())


// app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => {
            res.send(bugs)
        })
        .catch(err => {
            loggerService.error('cannot get bugs', err)
            res.status(400).send('cannot get bugs')
        })
})

app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        title: req.query.title,
        severity: req.query.severity,
        description: req.query.description,
        _id: req.query._id
    }
    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.error('cannot save car',err)
            res.status(400).send('cannot save car')
        })
})

app.get('/api/bug/:bugId', (req, res) => {
    const bugId = req.params.bugId
    bugService.getById(bugId)
        .then(bug => {
            res.send(bug)
        })
        .catch(err => {
            loggerService.error('cannot get bug', err)
            res.status(400).send('cannot get bug')
        })
})





app.get('/api/bug/:bugId/remove', (req, res) => {
    const bugId = req.params.bugId
    bugService.remove(bugId)
        .then(bug => {
            res.send(bug)
        })
        .catch(err => {
            loggerService.error('cannot remove bug', err)
            res.status(400).send('cannot remove bug')
        })

})

const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)


