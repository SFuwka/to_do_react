import { Paper } from '@material-ui/core';
import React from 'react'
import ReactDOM from 'react-dom';
import { useStyles } from './styles'

const modalRoot = document.getElementById('modal');



const Modal = ({ children, open, onClose }) => {
    const clickAwayListener = (e) => {
        if (e.target.className.includes('backDrop')) {
            onClose()
        }
    }
    const classes = useStyles()
    if (!open) return null
    return ReactDOM.createPortal(
        <div onMouseDown={clickAwayListener} className={classes.backDrop}>
            <Paper className={classes.modalContainer}>
                {children}
            </Paper>
        </div>
        ,
        modalRoot
    )
}

export default Modal