import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'

const SubmitButton = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.submitButtonWraper}>
            <Button className={classes.SubmitButton} disabled={props.progress} type='submit' variant='contained' color='primary'>
                {props.buttonText}
                {props.progress && <CircularProgress size={24} className={classes.submitButtonProgress} />}
            </Button>
        </div>
    )
}

export default SubmitButton