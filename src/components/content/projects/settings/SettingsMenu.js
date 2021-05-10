import { Select, Typography } from '@material-ui/core'
import React from 'react'
import CategoryMenu from './CategoryMenu';
import BackGroundColorPicker from '../../../commonComponents/settings/BackGroundColorPicker';
import SettingsWrapper from '../../../commonComponents/settings/SettingsWrapper'




const SettingsMenu = ({ state, dispatch }) => {
    const setPrivacySettings = (e) => {
        dispatch({ type: 'set_privacy_settings', privacySettings: e.target.value })
    }

    return (
        <SettingsWrapper>
            <>
                <Typography variant='subtitle1' component='h4'>Who can see my project?</Typography>
                <Select native value={state.privacySettings} onChange={setPrivacySettings}>
                    <option value='public'>Public</option>
                    <option value='publicReg'>Public-registered</option>
                    <option value='private'>Private</option>
                    <option disabled>Certain people</option>
                </Select>
            </>
            <BackGroundColorPicker state={state} dispatch={dispatch} />
            <>
                <Typography variant='subtitle1' component='h4'>Category:</Typography>
                <CategoryMenu state={state} dispatch={dispatch} />
            </>


        </SettingsWrapper>

    )
}

export default SettingsMenu