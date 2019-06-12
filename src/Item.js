import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import * as $ from 'jquery'

const Item = ({ index, id, content, moveItem, style, setForm }) => {

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
            if (dragIndex === hoverIndex) {
                return
            }

            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const handleFocus = (e) => {
        let elem = $(e.target);
        elem.addClass('active').siblings().removeClass('active');
        setForm({
            ...style,
            active: index
        })
    }

    drag(drop(ref))
    return (
        <div onClick={handleFocus} ref={ref} style={{ opacity, ...style }} className="list-item" > {content}</div>
    )
}

export default Item
