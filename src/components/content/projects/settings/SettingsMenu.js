import { Card, CardContent, Divider, IconButton, Paper, Select, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PaletteIcon from '@material-ui/icons/Palette';
import ColorPicker from '../../../../pickers/ColorPicker';
import { useStyles } from '../styles';
import Modal from '../../../../commonComponents/Modal';
import CategoryMenu from './CategoryMenu';
import { getContrastColor } from '../../../../pickers/contrastColor';



const SettingsMenu = ({ state, dispatch }) => {
    const classes = useStyles()
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    const setPrivacySettings = (e) => {
        dispatch({ type: 'set_privacy_settings', privacySettings: e.target.value })
    }

    const handleOpen = () => setColorPickerOpen(true)
    const handleClose = () => setColorPickerOpen(false)

    return (
        <Card>
            <CardContent className={classes.settingsMenu}>
                <Typography align='right' variant='h6' component='h3'>Settings</Typography>
                <Divider />
                <div className={classes.settingsFields}>
                    <Paper className={classes.settingsField}>
                        <Typography variant='subtitle1' component='h4'>Who can see my project?</Typography>
                        <Select native value={state.privacySettings} onChange={setPrivacySettings}>
                            <option value='public'>Public</option>
                            <option value='publicReg'>Public-registered</option>
                            <option value='private'>Private</option>
                            <option disabled>Certain people</option>
                        </Select>
                    </Paper>
                    <Paper className={classes.settingsField}>
                        <Typography variant='subtitle1' component='h4'>Background color:</Typography>
                        <div className={classes.colorPreview} style={{ backgroundColor: state.color }}>
                            <IconButton style={{ color: getContrastColor(state.color) }} onClick={handleOpen}>
                                <PaletteIcon />
                            </IconButton>
                            <Modal open={colorPickerOpen} onClose={handleClose}>
                                <ColorPicker state={state} dispatch={dispatch} />
                            </Modal>
                        </div>
                    </Paper>
                    <Paper className={classes.settingsField}>
                        <Typography variant='subtitle1' component='h4'>Category:</Typography>
                        <CategoryMenu state={state} dispatch={dispatch} />
                    </Paper>
                </div>
            </CardContent>
        </Card>
    )
}

export default SettingsMenu