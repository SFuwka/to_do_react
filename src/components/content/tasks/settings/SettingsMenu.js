import React from 'react'
import BackGroundColorPicker from '../../../commonComponents/settings/BackGroundColorPicker'
import SettingsWrapper from '../../../commonComponents/settings/SettingsWrapper'

const SettingsMenu = ({ state, dispatch }) => {
    return (
        <SettingsWrapper>
            <BackGroundColorPicker state={state} dispatch={dispatch} />
        </SettingsWrapper>
    )
}

export default SettingsMenu