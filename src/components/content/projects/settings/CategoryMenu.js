import { List, ListItem, ListItemText, Paper, Popper, TextField } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import useClickAway from '../../../../hooks/useClickAway'
import { useStyles } from '../styles'

const categoryTest = ['IT', 'Guide', 'toDo list', 'time management', 'DIY', 'cleaning', 'cars', 'test1', 'test2', 'test3', 'test4', 'tes']

const checkString = (expression, str) => {
    const pattern = str.split("").map((x) => {
        return `(?=.*${x})`
    }).join("");
    const regex = new RegExp(`${pattern}`, "gi")
    return expression.match(regex);
}


const CategoryMenu = ({ state, dispatch }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [filteredCategories, setFilteredCategories] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const classes = useStyles()
    const clickAwayRef = useRef(null)
    const list = useRef(null)
    useClickAway(clickAwayRef, (() => {
        setAnchorEl(null)
    }))

    useEffect(
        () => {
            const filtered = categoryTest.filter(category => {
                return category.toLowerCase().includes(searchText) || checkString(category, searchText)
            })
            setFilteredCategories(filtered)
        }, [searchText]
    )

    useEffect(
        () => {
            dispatch({ type: 'set_category', category: searchText })
        }, [searchText, dispatch]
    )

    const handleClick = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget)
        setSelectedIndex(null)
    }

    const handleKeyboardEvent = (e) => {
        if (!list.current) return
        const listLength = list.current.childElementCount
        if (!listLength) return
        if (selectedIndex === null) {
            return setSelectedIndex(0)
        }
        switch (e.key) {
            case 'ArrowDown':
                return setSelectedIndex((prev) => {
                    if ((prev + 1) >= listLength) return 0
                    return prev + 1
                })

            case 'ArrowUp':
                return setSelectedIndex((prev) => {
                    if ((prev) <= 0) return listLength - 1
                    return prev - 1
                })
            case 'Enter':
                setSearchText(list.current.childNodes[selectedIndex].getAttribute('category'))
                setAnchorEl(null)
                return
            default:
                return
        }
    }

    const chooseCategory = (e) => {
        const category = e.currentTarget.getAttribute('category')
        setSearchText(category)
        setAnchorEl(null)
    }

    const searchCategory = (e) => {
        setAnchorEl(e.currentTarget)
        setSearchText(e.target.value)
    }
    return (
        <>
            <TextField onKeyDown={handleKeyboardEvent} value={state.category || searchText} onChange={searchCategory} onClick={handleClick}></TextField>
            <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement={'bottom-start'}>
                <Paper ref={clickAwayRef} className={classes.categorySearchResult}>
                    <List ref={list}>
                        {filteredCategories.map((category, i) => {
                            if (i > 3) return null
                            return (
                                <ListItem selected={selectedIndex === i} category={category} onClick={chooseCategory} key={i} button>
                                    <ListItemText key={i} primary={category} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Popper>

        </>
    )
}

export default CategoryMenu