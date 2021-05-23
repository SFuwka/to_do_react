import { Button, InputBase, Paper } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from './styles'
import SearchIcon from '@material-ui/icons/Search';
import useDebounce from '../../hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux';
import { reset, search, searchResult } from '../../features/search/searchSlice';
import useClickAway from '../../hooks/useClickAway';
import SearchResult from './SearchResult';




const TopControll = ({ open, toggleOpen, context, createNewText = 'new', listText }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [searchInputValue, setSearchInputValue] = useState('')
    const [searchOpen, setSearchOpen] = useState(false)
    const searchText = useDebounce(searchInputValue, 300)
    const clickAwayRef = useRef(null)
    const exceptionRef = useRef(null)
    useClickAway(clickAwayRef, exceptionRef, () => {
        setSearchOpen(false)
    })

    useEffect(() => {
        return dispatch(reset())
    }, [dispatch])

    const searchRes = useSelector(searchResult)
    console.log(searchRes)

    useEffect(() => {
        if (searchText) {
            dispatch(search(context, searchText))
        }
    }, [searchText, context, dispatch])

    const handleChange = e => {
        if (e.currentTarget.value === '') dispatch(reset())
        setSearchInputValue(e.currentTarget.value)
    }

    const handleSearchOpen = (e) => {
        if (open) return
        setSearchOpen(true)
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
                                ref={exceptionRef}
                                disabled={open}
                                value={searchInputValue}
                                onChange={handleChange}
                                onClick={handleSearchOpen}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            {searchOpen && <Paper ref={clickAwayRef} className={classes.searchMenu}>
                                <SearchResult searchRes={searchRes} />
                            </Paper>}
                        </div>
                    </div>
                </div>

            </Paper>
        </>

    )
}

export default TopControll