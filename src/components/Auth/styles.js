import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
   
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(3, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        '&>*': {
            display: 'block',
            margin: theme.spacing(2),
            '& label.Mui-focused': {
                fontSize: 20,
                paddingLeft: 10,
                paddingRight: 10,
                color: 'black',
                backgroundColor: '#fff'
            },
            '& input': {
                '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 100px #88a4ce inset', //TODO
                    WebkitTextFillColor: 'black',
                }
            }
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    SubmitButton:{
        display: 'block',
        margin: '0 auto'
    },
    submitButtonWraper: {
        position: 'relative',
    },
    submitButtonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));