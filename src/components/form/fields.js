import { Checkbox, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearError } from '../../features/auth/loginSlice'


export const Input = ({ input, meta, ...restProps }) => {
    const dispatch = useDispatch()
    const isFieldError = restProps.err ? (restProps.err.errType === input.name) : false

    useEffect(() => {
        if (restProps.err) {
            dispatch(clearError())
        }
    }, [restProps.err, dispatch])

    return (
        <>
            <TextField
                onClick={() => dispatch(clearError())}
                autoComplete={restProps.autoComplete}
                label={restProps.label}
                variant={restProps.variant || 'outlined'}
                name={input.name}
                value={input.value}
                type={input.type}
                onChange={input.onChange}
                error={(meta.error && meta.touched) || isFieldError}
                multiline={restProps.multiline}
                autoFocus={restProps.autoFocus}
                fullWidth={restProps.fullWidth}
                helperText={(meta.error && meta.touched && <span>{meta.error}</span>)
                    || (isFieldError ? <span>{restProps.err.message}</span> : undefined)}
            />
        </>
    )
}

export const CheckBox = ({ input }) => {
    return (
        <Checkbox
            value={input.value}
            name={input.name}
            onChange={input.onChange} />
    )
}