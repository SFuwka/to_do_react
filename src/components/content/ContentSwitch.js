import React from 'react'
import { Route, Switch } from 'react-router'
import SignIn from '../Auth/login/Login'

const ContentSwitch = () => {
    return(
        <Switch>
            <Route path='/login' component={SignIn}/>
            <Route/>
            <Route/>
            <Route/>
        </Switch>
    )
}

export default ContentSwitch