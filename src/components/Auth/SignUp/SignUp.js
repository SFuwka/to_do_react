import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { NavLink, Redirect } from 'react-router-dom';
import { authLink } from '../../commonStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
    composeValidators, isValidEmail, passwordConfirmation, passwordLength,
    paswordContainNumbersAndLetters, required, requiredEmail, requiredPassword
} from '../../form/validators';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import { Input } from '../../form/fields';
import SubmitButton from '../SubmitButton';
import { clearError, error, progress, signUp, signUpSuccess } from '../../../features/auth/signUpSlice';
import { isAuthorized } from '../../../features/auth/authSlice';
import { Box } from '@material-ui/core';


const SignUpForm = (props) => {
    const classes = useStyles()
    const pending = useSelector(progress)
    const serverError = useSelector(error)
    const dispatch = useDispatch()


    const clearErr = () => {
        dispatch(clearError())
    }
    return (
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div>
                <Field
                    autoFocus={true}
                    validate={required}
                    label='Name'
                    type='name'
                    autoComplete='given-name'
                    name='name'
                    component={Input}
                    fullWidth={true}
                >
                </Field>
            </div>
            <div>
                <Field
                    validate={required}
                    label='Surname'
                    autoComplete='family-name'
                    name='surname'
                    component={Input}
                    fullWidth={true}
                >
                </Field>
            </div>
            <div>
                <Field
                    validate={required}
                    label='Alias'
                    autoComplete='alias'
                    name='alias'
                    component={Input}
                    fullWidth={true}
                    err={serverError}
                    clearError={clearErr}
                >
                </Field>
            </div>
            <div>
                <Field
                    validate={composeValidators(requiredEmail, isValidEmail)}
                    label='Email'
                    autoComplete='email'
                    name='email'
                    component={Input}
                    fullWidth={true}
                    err={serverError}
                    clearError={clearErr}
                >
                </Field>
            </div>
            <div>
                <Field
                    validate={composeValidators(requiredPassword, passwordLength, paswordContainNumbersAndLetters)}
                    label='Password'
                    type='password'
                    autoComplete='new-password'
                    name='password'
                    component={Input}
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
            <SubmitButton buttonText='Sign up' progress={pending}></SubmitButton>
        </form>


    )
}


const SignUp = () => {
    const isAuth = useSelector(isAuthorized)
    const classes = useStyles();
    const dispatch = useDispatch()
    const isAccountCreated = useSelector(signUpSuccess)

    const onSubmit = (values) => {
        dispatch(signUp(values.name, values.surname, values.alias, values.email, values.password))
    }

    useEffect(() => {
        return dispatch(clearError())
    })

    if (isAccountCreated) {
        return <Redirect to='/login' />
    }

    if (isAuth) {
        return <Redirect to='/' />
    }



    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar size='small' className={classes.avatar}>
                        <DonutSmallIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>

                    <Form validate={passwordConfirmation} onSubmit={onSubmit} component={SignUpForm} />

                    <Box>
                        Have an account? <NavLink style={authLink} to="/login">Log in now</NavLink>
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignUp