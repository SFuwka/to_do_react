import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useStyles } from './styles'

const DragAndDropList = ({ listItems, itemComponent: ItemComponent, onChange, animationDuration, animationEasing, ...rest }) => {
    const [items, setItems] = useState(listItems)
    const classes = useStyles()
    const [dragging, setDragging] = useState()
    const [willEndDragging, setWillEndDragging] = useState()
    const list = useRef()
    const touchId = useRef()
    const itemsOrder = useRef()
    const prevItems = useRef()
    const draggedItemPosition = useRef()
    const dragMoveHandler = useRef()
    const itemShiftsY = useRef()
    console.log(itemShiftsY)

    useEffect(() => {
        setItems(listItems)
    }, [listItems, itemsOrder])

    if (items !== prevItems.current) {
        prevItems.current = items
        itemsOrder.current = items.map((item, i) => i)
    }

    useEffect(() => {
        const onTouchMove = () => { }
        window.addEventListener('touchmove', onTouchMove)
        return () => {
            window.removeEventListener('touchmove', onTouchMove)
        }
    }, [])



    const onDragStart = useCallback((node, y, touch) => {
        if (dragging) {
            return
        }
        if (items.length === 1) {
            return
        }
        const item = getItem(list.current, node)
        if (!item) {
            return
        }
        const [itemNode, position] = item

        setDragging({
            touch,
            initialPosition: position,
            itemHeights: Array.prototype.map.call(list.current.childNodes, node => node.getBoundingClientRect().height),
            itemSpacing: list.current.childNodes[1].getBoundingClientRect().top - list.current.childNodes[0].getBoundingClientRect().bottom,
            itemTopOffset: itemNode.getBoundingClientRect().top - list.current.childNodes[0].getBoundingClientRect().top,
            dragStartY: y
        })

        draggedItemPosition.current = {
            previous: position,
            new: position,
            shiftY: 0
        }
        itemShiftsY.current = items.map(_ => 0)
    }, [dragging, items])

    const onTouchStart = useCallback((event) => {
        if (event.touches.length > 1) {
            return
        }
        const touch = event.changedTouches[0]
        onDragStart(event.target.closest('li'), touch.pageY, touch.identifier)
    }, [onDragStart])

    const onMouseDown = useCallback((event) => {

        if (event.button !== 0) {
            return
        }
        onDragStart(event.target.closest('li'), event.pageY)
    }, [onDragStart])

    const onDragMove = useCallback((event) => {
        if (!dragging) {
            return
        }

        let y

        if (dragging.touch !== undefined) {
            for (const touch of event.changedTouches) {
                if (touch.identifier === dragging.touch) {
                    y = touch.pageY
                    break
                }
            }
        } else {
            y = event.pageY
        }

        if (y === undefined) {
            return
        }


        event.preventDefault()
        const movedY = y - dragging.dragStartY
        const draggedItemOffsetTop = dragging.itemTopOffset + movedY

        const position = getDraggedItemPosition(
            dragging.itemHeights,
            dragging.itemSpacing,
            draggedItemOffsetTop,
            dragging.initialPosition
        )

        const draggedItemHeight = dragging.itemHeights[dragging.initialPosition]

        itemShiftsY.current = items.map((_, j) => {
            if (j < dragging.initialPosition) {
                if (j >= position) {
                    return draggedItemHeight + dragging.itemSpacing
                } else {
                    return 0
                }
            } else if (j > dragging.initialPosition) {
                if (j <= position) {
                    return -1 * (draggedItemHeight + dragging.itemSpacing)
                } else {
                    return 0
                }
            } else {
                return movedY
            }
        })

        let i = 0
        while (i < items.length) {
            if (list.current.childNodes[i]) list.current.childNodes[i].style.transform = `translateY(${itemShiftsY.current[i]}px)`
            i++
        }

        draggedItemPosition.current = {
            previous: dragging.initialPosition,
            new: position,
            shiftY: getDraggedItemPositionY(
                dragging.itemHeights,
                dragging.itemSpacing,
                dragging.initialPosition,
                position
            ) - getDraggedItemPositionY(
                dragging.itemHeights,
                dragging.itemSpacing,
                dragging.initialPosition,
                dragging.initialPosition
            )
        }

    }, [dragging, items])


    const onDragEnd = useCallback(() => {
        setDragging()
        setWillEndDragging(true)
        const newItemsOrder = getNewItemsOrder(
            itemsOrder.current,
            draggedItemPosition.current.previous,
            draggedItemPosition.current.new
        )
        setTimeout(() => {
            setWillEndDragging(false)
            itemsOrder.current = newItemsOrder
            const finalItemsOrder = (newItemsOrder.map(i => items[i]))
            setItems(finalItemsOrder)
            onChange(finalItemsOrder)
        }, animationDuration)
    }, [items, animationDuration, onChange])

    const onTouchEnd = useCallback((event) => {
        for (const touch of event.changedTouches) {
            if (touch.identifier === touchId.current) {
                onDragEnd()
                return
            }
        }
    }, [onDragEnd])

    const onMouseUp = useCallback((event) => {
        if (event.which !== 1) {
            return
        }
        onDragEnd()
    }, [onDragEnd])

    useEffect(() => {
        if (dragging) {
            dragMoveHandler.current = onDragMove
            if (dragging.touch !== undefined) {
                touchId.current = dragging.touch
                window.addEventListener('touchmove', dragMoveHandler.current, { passive: false })
                window.addEventListener('touchend', onTouchEnd)
            } else {
                window.addEventListener('mousemove', dragMoveHandler.current, { passive: false })
                window.addEventListener('mouseup', onMouseUp)
            }
        } else {
            if (touchId.current !== undefined) {
                touchId.current = undefined
                window.removeEventListener('touchmove', dragMoveHandler.current, { passive: false })
                window.removeEventListener('touchend', onTouchEnd)
            } else {
                window.removeEventListener('mousemove', dragMoveHandler.current, { passive: false })
                window.removeEventListener('mouseup', onMouseUp)
            }
            dragMoveHandler.current = undefined
        }
    }, [dragging, onMouseUp, onTouchEnd, onDragMove])

    const getNewItemsOrder = (itemsOrder, fromPosition, toPosition) => {
        if (toPosition < fromPosition) {
            return itemsOrder.slice(0, toPosition)
                .concat(itemsOrder[fromPosition])
                .concat(itemsOrder.slice(toPosition, fromPosition))
                .concat(itemsOrder.slice(fromPosition + 1))
        }
        if (toPosition > fromPosition) {
            return itemsOrder.slice(0, fromPosition)
                .concat(itemsOrder.slice(fromPosition + 1, toPosition + 1))
                .concat(itemsOrder[fromPosition])
                .concat(itemsOrder.slice(toPosition + 1))
        }
        return itemsOrder.slice()
    }

    const getDraggedItemPositionY = (itemHeights, itemSpacing, initialPosition, position) => {
        let top = 0
        let j = 0
        while (j < position) {
            if (j === initialPosition) {
                position++
            } else {
                top += itemHeights[j] + itemSpacing
            }
            j++
        }
        return top
    }

    const getDraggedItemPosition = (itemHeights, itemSpacing, draggedItemOffsetTop, initialPosition) => {
        const scanLineY = draggedItemOffsetTop + itemHeights[initialPosition] / 2 + itemSpacing / 2
        let y = 0
        let i = 0
        while (i < itemHeights.length) {
            y += itemHeights[i] + itemSpacing
            if (scanLineY <= y) {
                return i
            }
            i++
        }
        return itemHeights.length - 1
    }


    const getItem = (list, node,) => {
        let handle
        let childNode
        while (node) {
            if (node === list) {

                if (!handle) {
                    return
                }
                if (childNode) {
                    let i = 0
                    while (i < node.childNodes.length) {
                        if (node.childNodes[i] === childNode) {
                            return [childNode, i]
                        }
                        i++
                    }
                }
                break
            }
            if (node.dataset) {
                handle = node
            }
            childNode = node
            node = node.parentElement
        }
    }

    const TRANSFORM_NONE = { transform: 'none' }

    function getItemStyle(isDragged, willEndDragging, shiftY, animationDuration, animationEasing) {
        const style = {
            position: 'relative',
            transition: `all ${animationDuration}ms ${animationEasing}`
        }
        if (isDragged) {
            style.zIndex = 1
            if (!willEndDragging) {
                style.transition = undefined
            }
        } else {
            style.transform = `translateY(${shiftY}px)`
        }
        return style
    }

    useEffect(() => {
        if (willEndDragging) {
            list.current.childNodes[draggedItemPosition.current.previous].style.transform = `translateY(${draggedItemPosition.current.shiftY
                }px)`
        }
    }, [willEndDragging])


    const ListItems = (
        items.map((item, i) => {
            return <li style={(dragging || willEndDragging) ? getItemStyle(
                i === draggedItemPosition.current.previous,
                willEndDragging,
                itemShiftsY.current[i],
                animationDuration,
                animationEasing
            ) : TRANSFORM_NONE} key={item._id}>
                <ItemComponent
                    item={item}
                    {...rest} />
            </li>
        })
    )

    return (
        <ul
            ref={list}
            onTouchStart={onTouchStart}
            onMouseDown={onMouseDown}
            className={classes.itemsList}
        >
            {ListItems}
        </ul>
    )
}

export default DragAndDropList