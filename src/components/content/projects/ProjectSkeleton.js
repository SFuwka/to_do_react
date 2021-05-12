import { Card, CardHeader, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useStyles } from './styles'

const ProjectSkeleton = () => {
    const classes = useStyles()
    return (
        <Card className={classes.menuItem}>
            <CardHeader
                title={
                    <Typography >
                        <Skeleton />
                    </Typography>
                }
                subheader={
                    <Typography>
                        <Skeleton />
                    </Typography>
                }
            />
        </Card>
    )
}

export default ProjectSkeleton