

export function BugPreview({bug}) {

    function getLabels(){
        return bug.labels.map(label => {
            return <span key={bug.id}>{label} </span>
        })
    }

    return <article>
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Labels: <span>{getLabels()}</span></p>
    </article>
}