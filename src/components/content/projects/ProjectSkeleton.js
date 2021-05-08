import { Card, CardHeader, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

const ProjectSkeleton = () => {
    return (
        <Card>
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