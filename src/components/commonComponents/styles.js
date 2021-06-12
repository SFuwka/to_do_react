import { fade, makeStyles } from "@material-ui/core"
import { green } from "@material-ui/core/colors"


export const getContrastColor = (theme) => {
    if (theme.palette.type === 'dark') {
        return '#9eb0ba'
    }
    return '#C7E5FC'
}

export const useStyles = makeStyles((theme) => ({
    topControll: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.info.main, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.info.main, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchMenu: {
        right: 0,
        position: 'absolute',
        zIndex: 1,

    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    newProjectButton: {
        minWidth: 96,
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
            padding: '6px 10px'
        }
    },
    success: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        }
    },
    itemsList: {
        padding: 0,
        margin: 0,
        listStyle: 'none'
    }
}))