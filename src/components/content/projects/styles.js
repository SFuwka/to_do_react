import { makeStyles } from "@material-ui/core"
import { blueGrey } from "@material-ui/core/colors"

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
    projectMenu: {
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            '& svg': {
                marginLeft: theme.spacing(1)
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
    },
    editButtonGroup: {
        marginTop: theme.spacing(1),
        '& :first-child': {
            marginRight: theme.spacing(1)
        }
    }
}))