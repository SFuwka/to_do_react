export const requiredEmail = (value) => {
    return value ? undefined : 'Email is required'
}

export const required = (value) => {
    return value ? undefined : 'field is required'
}

export const isValidEmail = (value) => {
    const reg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ 
    return value.match(reg) ? undefined : 'Invalid email'
}

export const requiredPassword = (value) => {
    return value ? undefined : 'Password is required'
}

export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)