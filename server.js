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

    }
 })

 app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    bugService.getById(bugId)
       .then(bug => {
            res.send(bug)
       })
       .catch(err => {
        loggerService.error('cannot get bug', err)
        res.status(400).send('cannot get bug')
    })
  })





app.get('/api/bug/:bugId/remove', (req, res) => { })

const port = 3030
app.listen(port, () => 
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)


