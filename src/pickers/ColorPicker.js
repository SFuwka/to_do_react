
import React, { useEffect, useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import useDebounce from '../hooks/useDebounce'

const ColorPicker = ({ state, dispatch }) => {
    const [color, setColor] = useState(state.color)
    const pickedColor = useDebounce(color, 200)
    
    useEffect(
        () => {
            dispatch({ type: 'set_color', color: pickedColor })
        }, [pickedColor, dispatch]
    )

    const handleChange = (color) => {
        setColor(color)
    }
    return (
        <>
            <div style={{ width: 200, height: 100, backgroundColor: color }}></div>
            <HexColorInput style={{ width: 200 }} color={color} onChange={handleChange} />
            <HexColorPicker color={color} onChange={handleChange} />
        </>
    )
}

export default ColorPicker