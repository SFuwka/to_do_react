import React from 'react';
import { Form, Field } from 'react-final-form'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { NavLink } from 'react-router-dom';
import { authLink } from '../../commonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { login, pending } from '../../../features/auth/loginSlice';
import { composeValidators, isValidEmail, requiredEmail, requiredPassword } from '../../../features/auth/validators';
import { CheckBox, Input } from '../../form/fields';
import SubmitButton from '../SubmitButton';


const LoginForm = (props) => {
    const classes = useStyles()
    const progress = useSelector(pending)

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
                >
                </Field>
            </div>

            <div>
                <Field
                    validate={requiredPassword}
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    name='password'
                    component={Input}
                    fullWidth={true}
                >
                </Field>
            </div>
            
            <div>
                <FormControlLabel label='Remember me' control={
                    <Field
                        type='checkBox'
                        name='rememberMe'
                        component={CheckBox}
                    />
                }>
                </FormControlLabel>
            </div>
            <SubmitButton buttonText='Login' progress={progress}></SubmitButton>
        </form>


    )
}


const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        dispatch(login(values.email, values.password, values.rememberMe))
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar size='small' className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Form onSubmit={onSubmit} component={LoginForm} />
                    <Grid container>
                        <Grid item xs>
                            <NavLink style={authLink} to="/#" variant="body2">
                                Forgot password?
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

export default Login