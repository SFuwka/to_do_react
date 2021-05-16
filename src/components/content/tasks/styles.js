import { makeStyles } from "@material-ui/core"
import { getContrastColor } from "../projects/styles"

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative'
    },
    newTaskInput: {
        margin: 'auto 0',
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
    newTaskMenu: {
        width: '100%',
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        opacity: 1,
        transform: 'scale(1)',
        // transition: 'all .3s',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        '& .MuiGrid-container': {
            flexWrap: 'nowrap',
        }
    },
    hide: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0,
        transform: 'scale(0)',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    },
    inputWrapper: {
        display: 'flex',
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            '& input': {
                width: '100%'
            }
        }
    },
    buttonWrapper: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0
        },
    },
    settings: {
        marginTop: theme.spacing(2)
    },
    taskContainer: {
        marginTop: theme.spacing(2),
    },
    confirmDeleteModal: {
        minWidth: 160,
        '& p': {
            padding: theme.spacing(1)
        },
        '& button': {
            margin: theme.spacing(1)
        },
    },
    taskHeader: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiAvatar-root': {
            marginRight: theme.spacing(1)
        }
    },
    taskMenu: {
        '& li': {
            display: 'flex',
            justifyContent: 'space-between',
            '& svg': {
                marginLeft: theme.spacing(1)
            }
        }
    },
    editButtonGroup: {
        marginTop: theme.spacing(1),
        '& :first-child': {
            marginRight: theme.spacing(1)
        }
    }
}))