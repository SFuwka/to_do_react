import { MenuItem, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'

function SearchResult({ searchRes }) {
    const history = useHistory()
    const handleRelocate = (e) => {
        const projectId = e.currentTarget.getAttribute('projectid')
        const taskId = e.currentTarget.getAttribute('taskid')
        history.push(`/projects/${projectId}#${taskId}`)
    }

    return (
        <div style={{ width: '100%' }}>
            {searchRes && searchRes.projects && searchRes.projects.length ? <p>Projects:</p> : null}
            {searchRes && searchRes.projects && searchRes.projects.map(item => {
                return <MenuItem projectid={item._id} onClick={handleRelocate} key={item._id}>{item.projectName}</MenuItem>
            })}
            {searchRes && searchRes.tasks && searchRes.tasks.length ? <p>Tasks:</p> : null}
            {searchRes && searchRes.tasks && searchRes.tasks.map(item => {
                return <MenuItem projectid={item.project} taskid={item._id} onClick={handleRelocate} key={item._id}>

                    <div>
                        {<Typography variant='h6' component='h3'>{item.projectName}</Typography >}
                        {item.taskName}
                    </div>

                </MenuItem>
            })}
        </div>
    )
}

export default SearchResult
