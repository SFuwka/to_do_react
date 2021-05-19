import { Button, InputBase, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStyles } from '../content/projects/styles' //ToDo split styles to different folders
import SearchIcon from '@material-ui/icons/Search';
import useDebounce from '../../hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../features/search/searchSlice';
import { patternCreator } from '../../utils/patternCreator';
import { findProjectByName } from '../../features/project/projectSlice';



const TopControll = ({ open, toggleOpen, context, createNewText = 'new', listText }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [searchInputValue, setSearchInputValue] = useState('')
    const searchText = useDebounce(searchInputValue, 300)

    const findedProjects = useSelector(findProjectByName(patternCreator(searchText)))


    useEffect(() => {
        if (searchText && findedProjects.lenght < 5) {
            dispatch(search(context, searchText))
        }
    }, [searchText, context, dispatch, findedProjects.lenght])

    const handleChange = e => {
        setSearchInputValue(e.currentTarget.value)
    }
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
                        value={searchInputValue}
                        onChange={handleChange}
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