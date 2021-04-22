import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    backDrop: {
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: 1300,
    },
    modalContainer: {
        padding: theme.spacing(2),
        top: '50%',
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%,-50%)',
    }
}))