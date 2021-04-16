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

export const passwordLength = (value) => {
    return value.length > 7 ? undefined : 'Password lenght must be at least 8 characters'
}

export const paswordContainNumbersAndLetters = (value) => {
    let numbersCount = 0
    let lettersCount = 0
    for (let i = 0; i < value.length; i++) {
        if (isNaN(parseInt(value[i]))) {
            lettersCount++
        } else {
            numbersCount++
        }
    }

    if (numbersCount === 0) {
        return 'Password must contain at least 1 number'
    }
    if (lettersCount === 0) {
        return 'Password must contain at least 1 letter'
    }



}

export const passwordConfirmation = (values) => {
    let errors = {}
    if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'Passwords not match'
    }
    return errors
}

export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)