import React from 'react';
import { Form, Field } from 'react-final-form'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import { authLink } from '../../commonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { composeValidators, paswordContainNumbersAndLetters, passwordLength, requiredPassword, passwordConfirmation } from '../../form/validators';
import { Input } from '../../form/fields';
import SubmitButton from '../SubmitButton';
import { isAuthorized } from '../../../features/auth/authSlice';
import { passwordChanged, progress, resetPassword } from '../../../features/auth/forgotPasswordSlice';



const ResetPasswordForm = (props) => {
    const classes = useStyles()
    const pending = useSelector(progress)


    return (
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div>
                <Field
                    validate={composeValidators(requiredPassword, paswordContainNumbersAndLetters, passwordLength)}
                    label='New password'
                    name='password'
                    type='password'
                    autoComplete='new-password'
                    component={Input}
                    autoFocus={true}
                    fullWidth={true}
                >
                </Field>
            </div>
            <div>
                <Field
                    validate={requiredPassword}
                    autoComplete='new-password'
                    label='Confirm password'
                    type='password'
                    name='passwordConfirmation'
                    component={Input}
                    fullWidth={true}
                >
                </Field>
            </div>
            <SubmitButton buttonText='Send' progress={pending}></SubmitButton>
        </form >


    )
}


const ResetPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthorized)
    const location = useLocation()
    const resetCode = location.pathname.split('/')[2]
    const isPasswordChanged = useSelector(passwordChanged)

    if (!resetCode) return <Redirect to='/login' />
    if (isPasswordChanged) return <Redirect to='/login' />
    if (isAuth) {
        return <Redirect to='/' />
    }

    const onSubmit = (values) => {
        dispatch(resetPassword(values.password, resetCode))
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
                        Reset password
                    </Typography>
                    <Form validate={passwordConfirmation} onSubmit={onSubmit} component={ResetPasswordForm} />
                    <Grid container>
                        <Grid item xs>
                            <NavLink style={authLink} to="/login" variant="body2">
                                Login
                             </NavLink>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}

export default ResetPassword