import express from 'express'
import { bugService } from './services/bug.service.js'
import cookieParser from 'cookie-parser'
import { loggerService } from './services/logger.service.js'
const app = express()

// exppress config

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// Get all bugs

app.get('/api/bug', (req, res) => {
    console.log('line16',req.query);
    const filterBy = {
        title: req.query.title || '',
        desc: req.query.desc || '', 
        minSeverity: req.query.minSeverity || 0,
        pageIdx: req.query.pageIdx || 0,
        label: req.query.label || ''
    }
    // const sortBy = req.query.sortBy
    // console.log(sortBy,filterBy);
    const sortBy = JSON.parse(req.query.sortBy)
    bugService.query(filterBy,sortBy)
        .then(bugs => {
            // console.log('line25',bugs);
            res.send(bugs)
        })
        .catch(err => {
            loggerService.error('cannot get bugs', err)
            res.status(400).send('cannot get bugs')
        })
})

// Get bug by Id

app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    const { visitedBugs = [] } = req.cookies
    if (!visitedBugs.includes(bugId)) {
        if (visitedBugs.length >= 3) return res.status(401).send('wait for a bit')
        else visitedBugs.push(bugId)
    }
    res.cookie('visitedBugs', visitedBugs, { maxAge: 1000 * 70 })
    bugService.getById(bugId)
        .then(bug => {
            res.send(bug)
        })
        .catch(err => {
            loggerService.error('cannot get bug', err)
            res.status(400).send('cannot get bug')
        })
})


// Create car

app.post('/api/bug', (req,res) => {
    const bugToSave = {
        title: req.body.title,
        description: req.body.description,
        severity: +req.body.severity
    }
    bugService.save(bugToSave) 
        .then(bug => {
            res.send(bug)
        })
        .catch((err)=> {
            loggerService.error('cannot save bug', err)
            res.status(400).send('cannot save bug')
        })
})

// Update car

app.put('/api/bug', (req, res) => {
    const bugToSave = {
        title: req.body.title,
        severity: +req.body.severity,
        description: req.body.description,
        _id: req.body._id
    }
    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.error('cannot save car', err)
            res.status(400).send('cannot save car')
        })
})

app.delete('/api/bug/:bugId', (req, res) => {
    const bugId = req.body.bugId
    bugService.remove(bugId)
        .then(() => {
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


