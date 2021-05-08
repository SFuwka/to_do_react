import { Button, InputBase, Paper } from '@material-ui/core'
import React from 'react'
import { useStyles } from '../content/projects/styles' //ToDo split styles to different folders
import SearchIcon from '@material-ui/icons/Search';


const TopControll = ({ open, toggleOpen, createNewText = 'new', listText }) => {
    const classes = useStyles()
    return (
        <Paper className={classes.topControll}>
            <Button color='primary' onClick={toggleOpen} variant='contained'
                className={`${classes.newProjectButton} ${open ? classes.success : ''}`}>
                {!open ? `${createNewText}` : `${listText}`}</Button>
            <div className={classes.search}>
                <div>
                    <div className={classes.searchIcon}><SearchIcon /></div>
                    <InputBase
                        disabled={open}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default TopControll