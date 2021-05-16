import { Avatar, Checkbox, withStyles } from "@material-ui/core";
import { indigo, lightGreen } from "@material-ui/core/colors";

export const GreenCheckbox = withStyles({
    root: {
        '&$checked': {
            color: lightGreen['A200'],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

export const IndigoAvatar = withStyles({
    root: {
        backgroundColor: indigo[200],
    },
})((props) => <Avatar color="default" {...props} />)