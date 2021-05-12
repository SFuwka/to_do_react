import { fade, makeStyles } from "@material-ui/core"
import { blueGrey, green } from "@material-ui/core/colors"

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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    projectsContainer: {
        //height: '50vh',
        marginTop: theme.spacing(2)
    },
    projects: {
        transform: 'scale(1)',
        transition: 'all .5s',
    },
    menuItem: {
        marginTop: theme.spacing(2),
    },
    projectLink: {
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            filter: 'brightness(90%)'
        }
    },
    newProject: {
        transform: 'scale(1)',
        transition: 'all .5s'
    },
    hide: {
        width: 0,
        height: 0,
        visibility: 'hidden',
        transform: 'scale(0)'
    },
    newProjectHeader: {
        '& h3': {
            textAlign: 'center',
            width: '50%',
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        },
        paddingBottom: 0,

    },
    newProjectInput: {
        marginTop: theme.spacing(1),
        width: '50%',
        '& label.Mui-focused': {
            fontSize: 16,
            paddingLeft: 20,
            paddingRight: 20,
            color: '#444040',
            backgroundColor: getContrastColor(theme)
        },
        '& input': {
            '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px #88a4ce inset', //TODO
                WebkitTextFillColor: '#444040',
            }
        }
    },
    createProjectWrapper: {
        '& button': {
            marginTop: 10,
            marginBottom: 10,
            marginLeft: theme.spacing(2)
        }
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
    },
    categorySearchResult: {
        minWidth: 200
    }
}))