const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    function getLabels() {
        return <ul>{
            
            bug.labels.map(label => {
                return <li key={bug._id}>{label}</li>
            })}
        </ul>
    }

    useEffect(() => {
        bugService.getById(bugId)
            .then(bug => {
                setBug(bug)
            })
            .catch(err => {
                showErrorMsg('Cannot load bug')
            })
    }, [])

    if (!bug) return <h1>loadings....</h1>
    return bug && <div>
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>Description: <span>{bug.description}</span></p>
        <p>Severity: <span>{bug.severity}</span></p>
        <h2>Labels: </h2>
        {getLabels()}
        <Link to="/bug">Back to List</Link>
    </div>

}

