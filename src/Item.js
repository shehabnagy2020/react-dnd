import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';

const Item = ({ index, id, content, moveItem }) => {

    const ref = useRef(null);
    const [{ opacity }, drag] = useDrag({
        item: { type: 'item', index, id, content },
        collect: (monitor, props) => {
            return { opacity: monitor.isDragging() ? 0 : 1 }
        }
    })
    const [, drop] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    drag(drop(ref))
    return (
        <div ref={ref} style={{ opacity }} className="list-item" >{content}</div>
    )
}

export default Item
