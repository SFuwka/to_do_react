import { makeStyles } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"

export const useStyles = makeStyles((theme) => ({
    colorPreview: {
        minHeight: 50,
        '& button': {
            display: 'block',
            margin: '0 auto'
        },
    },
    settingsMenu: {
        backgroundColor:
            theme.palette.type === 'light' ? blueGrey[50] : blueGrey[800]
    },
    settingsFields: {
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    },
    settingsField: {
        minWidth: 200,
        minHeight: 100,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        '& h4': {
            textAlign: 'center'
        },
        '& select': {
            marginTop: theme.spacing(2)
        }
    }
}))