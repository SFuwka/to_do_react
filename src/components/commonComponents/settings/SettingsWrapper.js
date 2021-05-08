import { Card, CardContent, Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'

const SettingsWrapper = ({ children }) => {
    const classes = useStyles()
    return (
        <Card>
            <CardContent className={classes.settingsMenu}>
                <Typography align='right' variant='h6' component='h3'>Settings</Typography>
                <Divider />
                <div className={classes.settingsFields}>
                    {children.length ? children.map((child, i) => {
                        return (
                            < Paper key={i} className={classes.settingsField} >{child}</Paper >
                        )
                    }) : <Paper className={classes.settingsField}>{children}</Paper>}
                </div>
            </CardContent>
        </Card >
    )
}

export default SettingsWrapper