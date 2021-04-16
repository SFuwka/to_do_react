import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import { isFetching } from '../../features/auth/authSlice'
import Login from '../Auth/login/Login'
import SignUp from '../Auth/signUp/SignUp'
import Projects from './projects/Projects'
import Users from './users/Users'
import Root from './Root'
import MyProfile from './users/MyProfile'

const ContentSwitch = () => {
    const progress = useSelector(isFetching)
    if (progress) {
        return <></>
    }
    return (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/projects' component={Projects} />
            <Route path='/home' component={MyProfile} />
            <Route path='/users' component={Users} />
            <Route exact path='/' component={Root} />
        </Switch>
    )
}

export default ContentSwitch