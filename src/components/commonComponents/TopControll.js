import { Button, InputBase, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStyles } from '../content/projects/styles' //ToDo split styles to different folders
import SearchIcon from '@material-ui/icons/Search';
import useDebounce from '../../hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux';
import { search, searchResult } from '../../features/search/searchSlice';




const TopControll = ({ open, toggleOpen, context, createNewText = 'new', listText }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [searchInputValue, setSearchInputValue] = useState('')
    const searchText = useDebounce(searchInputValue, 300)

    const searchRes = useSelector(searchResult)
    console.log(searchRes)

    useEffect(() => {
        if (searchText) {
            dispatch(search(context, searchText))
        }
    }, [searchText, context, dispatch])

    const handleChange = e => {
        setSearchInputValue(e.currentTarget.value)
    }
    return (
        <>
            <Paper className={classes.topControll}>
                <Button color='primary' onClick={toggleOpen} variant='contained'
                    className={`${classes.newProjectButton} ${open ? classes.success : ''}`}>
                    {!open ? `${createNewText}` : `${listText}`}</Button>
                <div className={classes.search}>
                    <div>
                        <div className={classes.searchIcon}><SearchIcon /></div>
                        <div>
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
                            <div style={{ position: 'absolute', zIndex: 10000, backgroundColor: 'red', width: '100%' }}>
                                {searchRes && searchRes.projects && searchRes.projects.map(item => {
                                    return <h3>{item._id}</h3>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </Paper>
        </>

    )
}

export default TopControll