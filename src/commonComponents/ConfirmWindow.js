import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'

const ConfirmWindow = ({ onConfirm, onClose }) => {
    const classes = useStyles()
    return (
        <div className={classes.confirmDeleteModal}>
            <div><Typography align='center'>Are you sure?</Typography></div>
            <div>
                <Button variant='contained' color='primary' onClick={onConfirm}>yes</Button>
                <Button variant='contained' color='secondary' onClick={onClose}>no</Button>
            </div>
        </div>
    )
}

export default ConfirmWindow