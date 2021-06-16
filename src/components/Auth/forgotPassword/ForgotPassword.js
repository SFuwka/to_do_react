import React from 'react';
import { Form, Field } from 'react-final-form'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { NavLink, Redirect } from 'react-router-dom';
import { authLink } from '../../commonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { composeValidators, isValidEmail, requiredEmail } from '../../form/validators';
import { Input } from '../../form/fields';
import SubmitButton from '../SubmitButton';
import { isAuthorized } from '../../../features/auth/authSlice';
import { forgotPasswordHandler, clearError, error, progress } from '../../../features/auth/forgotPasswordSlice';



const ForgotPasswordForm = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const pending = useSelector(progress)
    const serverError = useSelector(error)

    const clearErr = () => {
        dispatch(clearError())
    }
    return (
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div>
                <Field
                    validate={composeValidators(requiredEmail, isValidEmail)}
                    label='Email'
                    autoComplete='email'
                    name='email'
                    component={Input}
                    autoFocus={true}
                    fullWidth={true}
                    err={serverError}
                    clearError={clearErr}
                >
                </Field>
            </div>
            <SubmitButton buttonText='Send' progress={pending}></SubmitButton>
        </form>


    )
}


const ForgotPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthorized)

    if (isAuth) {
        return <Redirect to='/' />
    }

    const onSubmit = (values) => {
        dispatch(forgotPasswordHandler(values.email))
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar size='small' className={classes.avatar}>
                        <AssignmentLateIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot password
                    </Typography>
                    <Form onSubmit={onSubmit} component={ForgotPasswordForm} />
                    <Grid container>
                        <Grid item xs>
                            <NavLink style={authLink} to="/login" variant="body2">
                                Login
                             </NavLink>
                        </Grid>
                        <Grid item>
                            Don't have an account? <NavLink style={authLink} to="/signup">Sign Up</NavLink>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}

export default ForgotPassword