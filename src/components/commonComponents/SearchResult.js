import { MenuItem } from '@material-ui/core'
import React from 'react'

function SearchResult({ searchRes }) {
    return (
        <div >
            {searchRes && searchRes.projects && searchRes.projects.map(item => {
                return <MenuItem key={item._id}>{item.projectName}</MenuItem>
            })}
        </div>
    )
}

export default SearchResult
