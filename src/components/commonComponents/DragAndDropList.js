import React from 'react'
import { useStyles } from './styles'

const DragAndDropList = ({ items, itemComponent: ItemComponent, ...rest }) => {
    const classes = useStyles()
    const ListItems = (
        items.map((item, i) => {
            return <li key={item._id}>
                <ItemComponent item={item} {...rest} />
            </li>
        })
    )

    return (
        <ul className={classes.itemsList}>
            {ListItems}
        </ul>
    )
}

export default DragAndDropList