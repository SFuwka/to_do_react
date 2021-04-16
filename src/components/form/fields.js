import { Checkbox, TextField } from '@material-ui/core'
import React from 'react'




export const Input = ({ input, meta, ...restProps }) => {

    const isFieldError = restProps.err ? (restProps.err.errType === input.name) : false


    return (
        <>
            <TextField
                onClick={restProps.clearError}
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
            name={input.name}
            onChange={input.onChange} />
    )
}