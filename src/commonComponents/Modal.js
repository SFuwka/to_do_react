import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react'
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { sideBarOpen } from '../features/theme/themeSlice';
import { useStyles } from './styles'

const modalRoot = document.getElementById('modal');

const Modal = ({ children, open, onClose }) => {
    const sideBarCollapse = useSelector(sideBarOpen)
    const clickAwayListener = (e) => {
        if (e.target.className.includes('backDrop')) {
            onClose()
        }
    }
    const classes = useStyles()
    if (!open) return null
    return ReactDOM.createPortal(
        <div onMouseDown={clickAwayListener} className={classes.backDrop}>
            <Paper className={clsx(classes.modalContainer, sideBarCollapse ? classes.sideBarOpen : classes.sideBarClose)}>
                {children}
            </Paper>
        </div>
        ,
        modalRoot
    )
}

export default Modal