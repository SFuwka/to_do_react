import { IconButton, Typography } from '@material-ui/core'
import PaletteIcon from '@material-ui/icons/Palette';
import React, { useState } from 'react'
import Modal from '../../../commonComponents/Modal';
import ColorPicker from '../../../pickers/ColorPicker';
import { getContrastColor } from '../../../pickers/contrastColor';
import { useStyles } from './styles';

const BackGroundColorPicker = ({ state, dispatch }) => {
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    const classes = useStyles()
    const handleOpen = () => setColorPickerOpen(true)
    const handleClose = () => setColorPickerOpen(false)
    return (
        <>
            <Typography variant='subtitle1' component='h4'>Background color:</Typography>
            <div className={classes.colorPreview} style={{ backgroundColor: state.color }}>
                <IconButton style={{ color: getContrastColor(state.color) }} onClick={handleOpen}>
                    <PaletteIcon />
                </IconButton>
                <Modal open={colorPickerOpen} onClose={handleClose}>
                    <ColorPicker state={state} dispatch={dispatch} />
                </Modal>
            </div>
        </>
    )
}

export default BackGroundColorPicker