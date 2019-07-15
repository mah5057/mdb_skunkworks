import React from 'react'

const Results = (props) => {
    const options = props.results.map(r => (
        <li key={r.userId}>
            {r.title}
        </li>
    ))
    return <ul>{options}</ul>
}

export default Results